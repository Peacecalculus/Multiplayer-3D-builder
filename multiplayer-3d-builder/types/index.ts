import type { User as SupabaseUser } from '@supabase/supabase-js'

export interface WorldObject {
  id: string
  type: 'cube' | 'sphere'
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface Player {
  id: string
  user_id: string
  username: string
  color: string
  position: [number, number, number]
  last_seen: string
}

export type User = SupabaseUser
