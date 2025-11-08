# Supabase Database Schema

This document contains the SQL schema required for the Multiplayer 3D Builder application.

## Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the SQL below
5. Execute the query

## SQL Schema

```sql
-- Enable Realtime for tables
alter publication supabase_realtime add table world_objects;
alter publication supabase_realtime add table players;

-- Create world_objects table
create table if not exists public.world_objects (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('cube', 'sphere')),
  position float8[] not null default '{0,0,0}'::float8[],
  rotation float8[] not null default '{0,0,0}'::float8[],
  color text not null,
  created_by uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create players table for presence tracking
create table if not exists public.players (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade unique not null,
  username text not null,
  color text not null,
  position float8[] not null default '{0,0,0}'::float8[],
  last_seen timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better query performance
create index if not exists world_objects_created_by_idx on public.world_objects(created_by);
create index if not exists world_objects_created_at_idx on public.world_objects(created_at);
create index if not exists players_user_id_idx on public.players(user_id);
create index if not exists players_last_seen_idx on public.players(last_seen);

-- Enable Row Level Security (RLS)
alter table public.world_objects enable row level security;
alter table public.players enable row level security;

-- RLS Policies for world_objects
-- Allow authenticated users to read all objects
create policy "Anyone can view objects"
  on public.world_objects for select
  to authenticated
  using (true);

-- Allow authenticated users to create objects
create policy "Authenticated users can create objects"
  on public.world_objects for insert
  to authenticated
  with check (auth.uid() = created_by);

-- Allow users to update any object (for collaborative building)
create policy "Authenticated users can update objects"
  on public.world_objects for update
  to authenticated
  using (true);

-- Allow users to delete any object (for collaborative building)
create policy "Authenticated users can delete objects"
  on public.world_objects for delete
  to authenticated
  using (true);

-- RLS Policies for players
-- Allow authenticated users to read all players
create policy "Anyone can view players"
  on public.players for select
  to authenticated
  using (true);

-- Allow users to upsert their own presence
create policy "Users can upsert their own presence"
  on public.players for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own presence"
  on public.players for update
  to authenticated
  using (auth.uid() = user_id);

-- Allow users to delete their own presence
create policy "Users can delete their own presence"
  on public.players for delete
  to authenticated
  using (auth.uid() = user_id);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for world_objects updated_at
create trigger set_updated_at
  before update on public.world_objects
  for each row
  execute procedure public.handle_updated_at();
```

## Realtime Configuration

After creating the tables, make sure Realtime is enabled:

1. Go to Database → Replication in your Supabase dashboard
2. Ensure both `world_objects` and `players` tables are enabled for replication
3. If not visible, you may need to enable them manually:
   - Click on the table
   - Enable "Realtime" toggle

## Testing the Schema

After running the SQL, you can test if everything is set up correctly:

1. Go to the Table Editor
2. You should see `world_objects` and `players` tables
3. Try inserting test data to verify the structure

## Authentication Setup

For Google OAuth to work:

1. Go to Authentication → Providers in Supabase dashboard
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Add authorized redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://your-domain.com/auth/callback` (production)
