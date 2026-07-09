-- Lanigan Builds — dedicated Supabase project setup
-- Run this once in the new project's SQL Editor (Project → SQL Editor → New query → Run).

-- 1. Site content (single JSON document, id is always 1)
create table if not exists public.lanigan_site_content (
  id integer primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.lanigan_site_content enable row level security;

create policy content_public_read on public.lanigan_site_content
  for select to anon, authenticated using (true);

create policy content_auth_write on public.lanigan_site_content
  for all to authenticated using (true) with check (true);

-- 2. Portfolio projects
create table if not exists public.lanigan_projects (
  id uuid primary key default gen_random_uuid(),
  shortcode text unique,
  title text not null default '',
  caption text default '',
  category text default 'Renovations',
  date text default '',
  type text default 'image',
  cover text default '',
  media jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  hidden boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.lanigan_projects enable row level security;

create policy projects_public_read on public.lanigan_projects
  for select to anon, authenticated using (true);

create policy projects_auth_write on public.lanigan_projects
  for all to authenticated using (true) with check (true);

-- 3. Leads / enquiries (from the contact form + CRM)
create table if not exists public.lanigan_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text,
  phone text,
  service text,
  postcode text,
  budget text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','quoted','won','lost')),
  value numeric,
  notes text,
  source text not null default 'website'
);

alter table public.lanigan_leads enable row level security;

create policy lanigan_leads_public_insert on public.lanigan_leads
  for insert to anon, authenticated with check (true);

create policy lanigan_leads_auth_select on public.lanigan_leads
  for select to authenticated using (true);

create policy lanigan_leads_auth_update on public.lanigan_leads
  for update to authenticated using (true) with check (true);

create policy lanigan_leads_auth_delete on public.lanigan_leads
  for delete to authenticated using (true);

-- 4. Storage bucket for admin-uploaded media (hero/about/service/before-after images, portfolio uploads)
insert into storage.buckets (id, name, public)
values ('lanigan-media', 'lanigan-media', true)
on conflict (id) do nothing;

create policy lanigan_media_public_read on storage.objects
  for select to anon, authenticated using (bucket_id = 'lanigan-media');

create policy lanigan_media_auth_write on storage.objects
  for insert to authenticated with check (bucket_id = 'lanigan-media');

create policy lanigan_media_auth_update on storage.objects
  for update to authenticated using (bucket_id = 'lanigan-media');

create policy lanigan_media_auth_delete on storage.objects
  for delete to authenticated using (bucket_id = 'lanigan-media');

-- 5. Admin login user — create this in Authentication → Users → Add user
--    (email/password sign-in, matching src/components/admin/AdminLogin.tsx)
--    e.g. admin@laniganbuilds.co.uk
