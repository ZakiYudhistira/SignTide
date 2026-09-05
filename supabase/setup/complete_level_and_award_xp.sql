-- Run this in the Supabase SQL editor after adding public.progress.items jsonb.
-- Progression and XP are changed atomically, so concurrent/replayed submissions
-- cannot award XP or a reward more than once for the same level.
drop function if exists public.complete_level_and_award_xp(text, text);
drop function if exists public.complete_level_and_award_xp(text, text, text);

create function public.complete_level_and_award_xp(
  p_section_id text,
  p_level_id text,
  p_reward_item text
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  current_progression jsonb;
  current_items jsonb;
  level_xp integer;
  expected_reward_item text;
  previous_section_id text;
  previous_level_id text;
  already_completed boolean;
begin
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  -- This catalog mirrors app/data/learning/act-one.ts through act-five.ts.
  -- Keep each row in canonical play order: section, level, XP, reward,
  -- prerequisite section, prerequisite level.
  select
    catalog.level_xp,
    catalog.reward_item,
    catalog.previous_section_id,
    catalog.previous_level_id
  into
    level_xp,
    expected_reward_item,
    previous_section_id,
    previous_level_id
  from (
    values
      ('section-1'::text, 'section-1-lvl-1'::text, 10, 'bread'::text,    null::text, null::text),
      ('section-1',       'section-1-lvl-2',       10, null,             'section-1', 'section-1-lvl-1'),
      ('section-1',       'section-1-lvl-3',       10, 'veggies',        'section-1', 'section-1-lvl-2'),
      ('section-1',       'section-1-lvl-4',       10, null,             'section-1', 'section-1-lvl-3'),
      ('section-1',       'section-1-lvl-5',       10, null,             'section-1', 'section-1-lvl-4'),
      ('section-1',       'section-1-lvl-6',       10, 'meat',           'section-1', 'section-1-lvl-5'),

      ('section-2',       'section-2-lvl-1',       10, null,             'section-1', 'section-1-lvl-6'),
      ('section-2',       'section-2-lvl-2',       10, null,             'section-2', 'section-2-lvl-1'),
      ('section-2',       'section-2-lvl-3',       10, 'yoghurt',        'section-2', 'section-2-lvl-2'),
      ('section-2',       'section-2-lvl-4',       10, null,             'section-2', 'section-2-lvl-3'),
      ('section-2',       'section-2-lvl-5',       10, null,             'section-2', 'section-2-lvl-4'),

      ('section-3',       'section-3-lvl-1',       10, null,             'section-2', 'section-2-lvl-5'),
      ('section-3',       'section-3-lvl-2',       10, null,             'section-3', 'section-3-lvl-1'),
      ('section-3',       'section-3-lvl-3',       10, null,             'section-3', 'section-3-lvl-2'),
      ('section-3',       'section-3-lvl-4',       10, 'blueberry',      'section-3', 'section-3-lvl-3'),

      ('section-4',       'section-4-lvl-1',       10, null,             'section-3', 'section-3-lvl-4'),
      ('section-4',       'section-4-lvl-2',       10, null,             'section-4', 'section-4-lvl-1'),
      ('section-4',       'section-4-lvl-3',       10, 'banana',         'section-4', 'section-4-lvl-2'),

      ('section-5',       'section-5-lvl-1',       10, null,             'section-4', 'section-4-lvl-3'),
      ('section-5',       'section-5-lvl-2',       10, null,             'section-5', 'section-5-lvl-1'),
      ('section-5',       'section-5-lvl-3',       10, null,             'section-5', 'section-5-lvl-2'),
      ('section-5',       'section-5-lvl-4',       10, null,             'section-5', 'section-5-lvl-3')
  ) as catalog(
    section_id,
    level_id,
    level_xp,
    reward_item,
    previous_section_id,
    previous_level_id
  )
  where catalog.section_id = p_section_id
    and catalog.level_id = p_level_id;

  if not found then
    raise exception 'Unknown level' using errcode = '22023';
  end if;

  -- Reject reward names forged by direct RPC calls.
  if p_reward_item is distinct from expected_reward_item then
    raise exception 'Invalid reward for level' using errcode = '22023';
  end if;

  -- Serialize completion requests per user, including users without a row yet.
  perform pg_advisory_xact_lock(hashtextextended(current_user_id::text, 0));

  select progression, items
    into current_progression, current_items
    from public.progress
   where id = current_user_id
   for update;

  current_progression := coalesce(current_progression, '{}'::jsonb);
  current_items := coalesce(current_items, '[]'::jsonb);

  if jsonb_typeof(current_items) <> 'array' then
    raise exception 'progress.items must be a JSON array' using errcode = '22023';
  end if;

  already_completed := coalesce(
    (current_progression #>> array[p_section_id, p_level_id])::boolean,
    false
  );

  -- Enforce canonical lesson order, including transitions between sections.
  if not already_completed
     and previous_section_id is not null
     and previous_level_id is not null
     and not coalesce(
       (current_progression #>> array[previous_section_id, previous_level_id])::boolean,
       false
     ) then
    raise exception 'Previous level is not complete' using errcode = '42501';
  end if;

  -- jsonb_set requires the parent object to exist before setting a nested key.
  if not already_completed then
    current_progression := jsonb_set(
      current_progression,
      array[p_section_id],
      coalesce(current_progression -> p_section_id, '{}'::jsonb),
      true
    );

    current_progression := jsonb_set(
      current_progression,
      array[p_section_id, p_level_id],
      'true'::jsonb,
      true
    );
  end if;

  if expected_reward_item is not null
     and not (current_items @> jsonb_build_array(expected_reward_item)) then
    current_items := current_items || jsonb_build_array(expected_reward_item);
  end if;

  insert into public.progress (id, progression, items)
  values (
    current_user_id,
    current_progression,
    current_items
  )
  on conflict (id) do update
    set progression = excluded.progression,
        items = excluded.items;

  if already_completed then
    return 0;
  end if;

  update public.profile
     set xp = coalesce(xp, 0) + level_xp
   where "UID" = current_user_id;

  if not found then
    raise exception 'Profile row not found' using errcode = 'P0002';
  end if;

  return level_xp;
end;
$$;

revoke all on function public.complete_level_and_award_xp(text, text, text)
  from public, anon, authenticated;
grant execute on function public.complete_level_and_award_xp(text, text, text)
  to authenticated;
