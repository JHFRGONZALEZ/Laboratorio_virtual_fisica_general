create table if not exists public.experiment_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  practice_id text not null check (practice_id in ('mru', 'mruv', 'caida-libre', 'tiro-parabolico', 'pendulo', 'newton', 'hooke')),
  title text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.experiment_history
  drop constraint if exists experiment_history_practice_id_check;

alter table public.experiment_history
  add constraint experiment_history_practice_id_check
  check (practice_id in ('mru', 'mruv', 'caida-libre', 'tiro-parabolico', 'pendulo', 'newton', 'hooke'));

create index if not exists experiment_history_user_created_idx
  on public.experiment_history(user_id, created_at desc);

alter table public.experiment_history enable row level security;

drop policy if exists "Students can read their own experiments"
  on public.experiment_history;

drop policy if exists "Students can create their own experiments"
  on public.experiment_history;

create policy "Students can read their own experiments"
  on public.experiment_history for select
  using (auth.uid() = user_id);

create policy "Students can create their own experiments"
  on public.experiment_history for insert
  with check (auth.uid() = user_id);
