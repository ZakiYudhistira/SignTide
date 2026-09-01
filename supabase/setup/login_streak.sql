-- Run this once in the Supabase SQL editor.
-- All time calculations use the database clock. The browser never supplies a date.

alter table public.profile
  add column if not exists last_login timestamptz;

create or replace function public.apply_login_streak()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  login_at timestamptz := statement_timestamp();
  previous_day date;
  login_day date;
begin
  -- Ignore any timestamp supplied by a client and use PostgreSQL's clock.
  new.last_login := login_at;

  if old.last_login is null then
    new.streaks := coalesce(old.streaks, 0);
    return new;
  end if;

  previous_day := (old.last_login at time zone 'Asia/Jakarta')::date;
  login_day := (login_at at time zone 'Asia/Jakarta')::date;

  if login_day = previous_day then
    new.streaks := coalesce(old.streaks, 0);
  elsif login_at > old.last_login
    and login_at - old.last_login <= interval '24 hours' then
    new.streaks := coalesce(old.streaks, 0) + 1;
  else
    new.streaks := 0;
  end if;

  return new;
end;
$$;

drop trigger if exists profile_login_streak on public.profile;

create trigger profile_login_streak
before update of last_login on public.profile
for each row
execute function public.apply_login_streak();

create or replace function public.record_login()
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  update public.profile
     set last_login = statement_timestamp()
   where "UID" = auth.uid();

  if not found then
    raise exception 'Profile row not found' using errcode = 'P0002';
  end if;
end;
$$;

revoke all on function public.record_login() from public, anon;
grant execute on function public.record_login() to authenticated;
revoke all on function public.apply_login_streak() from public, anon, authenticated;
