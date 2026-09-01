-- Run this once in the Supabase SQL editor.
-- Progression and XP are changed atomically, so concurrent/replayed submissions
-- cannot award XP more than once for the same level.
create or replace function public.complete_level_and_award_xp(
  p_section_id text,
  p_level_id text
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  current_progression jsonb;
  level_xp integer;
begin
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  -- XP values are controlled by the database, not by browser input.
  level_xp := case
    when p_section_id = 'section-1' and p_level_id = 'section-1-lvl-1' then 10
    when p_section_id = 'section-1' and p_level_id = 'section-1-lvl-2' then 10
    when p_section_id = 'section-1' and p_level_id = 'section-1-lvl-3' then 10
    when p_section_id = 'section-1' and p_level_id = 'section-1-lvl-4' then 10
    when p_section_id = 'section-1' and p_level_id = 'section-1-lvl-5' then 10
    else null
  end;

  if level_xp is null then
    raise exception 'Unknown level' using errcode = '22023';
  end if;

  -- Serialize completion requests per user, including users without a row yet.
  perform pg_advisory_xact_lock(hashtextextended(current_user_id::text, 0));

  select progression
    into current_progression
    from public.progress
   where id = current_user_id
   for update;

  current_progression := coalesce(current_progression, '{}'::jsonb);

  if coalesce(
    (current_progression #>> array[p_section_id, p_level_id])::boolean,
    false
  ) then
    return 0;
  end if;

  -- Enforce the canonical prerequisite for every level after the first.
  if p_section_id = 'section-1'
     and p_level_id <> 'section-1-lvl-1'
     and not coalesce(
       (current_progression #>> array[
         p_section_id,
         'section-1-lvl-' || (split_part(p_level_id, '-lvl-', 2)::integer - 1)::text
       ])::boolean,
       false
     ) then
    raise exception 'Previous level is not complete' using errcode = '42501';
  end if;

  -- jsonb_set requires the parent object to exist before setting a nested key.
  current_progression := jsonb_set(
    current_progression,
    array[p_section_id],
    coalesce(current_progression -> p_section_id, '{}'::jsonb),
    true
  );

  insert into public.progress (id, progression)
  values (
    current_user_id,
    jsonb_set(
      current_progression,
      array[p_section_id, p_level_id],
      'true'::jsonb,
      true
    )
  )
  on conflict (id) do update
    set progression = excluded.progression;

  update public.profile
     set xp = coalesce(xp, 0) + level_xp
   where "UID" = current_user_id;

  if not found then
    raise exception 'Profile row not found' using errcode = 'P0002';
  end if;

  return level_xp;
end;
$$;

revoke all on function public.complete_level_and_award_xp(text, text)
  from public, anon, authenticated;
grant execute on function public.complete_level_and_award_xp(text, text)
  to authenticated;
