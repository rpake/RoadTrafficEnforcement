-- Run in Supabase SQL Editor. Demo-only data; no official driver records.
create table if not exists public.violations (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    plate text not null check (
        char_length(plate) between 3 and 12
    ),
    driver_name text not null default '',
    licence_number text not null default '',
    location text not null check (char_length(location) > 0),
    notes text not null default '',
    fine_ids text [] not null default '{}',
    total_pgk numeric(12, 2) not null default 0 check(total_pgk >= 0),
    latitude double precision,
    longitude double precision,
    evidence_path text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create index if not exists violations_user_idx on public.violations(user_id, created_at desc);
alter table public.violations enable row level security;
create policy "Owner select" on public.violations for
select to authenticated using (
        user_id =(
            select auth.uid()
        )
    );
create policy "Owner insert" on public.violations for
insert to authenticated with check (
        user_id =(
            select auth.uid()
        )
    );
create policy "Owner update" on public.violations for
update to authenticated using (
        user_id =(
            select auth.uid()
        )
    ) with check (
        user_id =(
            select auth.uid()
        )
    );
create policy "Owner delete" on public.violations for delete to authenticated using (
    user_id =(
        select auth.uid()
    )
);
insert into storage.buckets(id, name, public)
values('evidence', 'evidence', false) on conflict(id) do nothing;
create policy "Owner evidence read" on storage.objects for
select to authenticated using (
        bucket_id = 'evidence'
        and (storage.foldername(name)) [1] =(
            select auth.uid()
        )::text
    );
create policy "Owner evidence upload" on storage.objects for
insert to authenticated with check (
        bucket_id = 'evidence'
        and (storage.foldername(name)) [1] =(
            select auth.uid()
        )::text
    );
create policy "Owner evidence delete" on storage.objects for delete to authenticated using (
    bucket_id = 'evidence'
    and (storage.foldername(name)) [1] =(
        select auth.uid()
    )::text
);