-- Emulsion Lift: accounts, works and artist statements.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  name text default '',
  statement text default '',
  updated_at timestamptz default now()
);

create table if not exists public.works (
  id text primary key,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  kind text not null default 'lift',
  created bigint not null,
  film text,
  surface text,
  temp int,
  flipped boolean default false,
  w int,
  h int,
  path text not null
);

alter table public.profiles enable row level security;
alter table public.works enable row level security;

-- Each person sees and changes only their own rows.
create policy "profiles: read own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles: add own" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles: edit own" on public.profiles for update to authenticated using (auth.uid() = id);

create policy "works: read own" on public.works for select to authenticated using (auth.uid() = user_id);
create policy "works: add own" on public.works for insert to authenticated with check (auth.uid() = user_id);
create policy "works: edit own" on public.works for update to authenticated using (auth.uid() = user_id);
create policy "works: remove own" on public.works for delete to authenticated using (auth.uid() = user_id);

-- Private bucket for the images; each person writes only inside a folder named after their id.
insert into storage.buckets (id, name, public) values ('works', 'works', false) on conflict (id) do nothing;

create policy "files: read own" on storage.objects for select to authenticated
  using (bucket_id = 'works' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "files: add own" on storage.objects for insert to authenticated
  with check (bucket_id = 'works' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "files: edit own" on storage.objects for update to authenticated
  using (bucket_id = 'works' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "files: remove own" on storage.objects for delete to authenticated
  using (bucket_id = 'works' and (storage.foldername(name))[1] = auth.uid()::text);
