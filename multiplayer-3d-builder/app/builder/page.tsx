'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useBuilderStore } from '@/store/builderStore'
import { WorldObject, Player } from '@/types'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Toolbar from '@/components/Toolbar'
import PlayersList from '@/components/PlayersList'

const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false })

const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e']

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

export default function BuilderPage() {
  const router = useRouter()
  const supabase = createClient()
  const { user, setUser, setIsLoading } = useAuthStore()
  const { objects, players, selectedObject, addObject, updateObject, deleteObject, setObjects, setPlayers } = useBuilderStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    const cleanup = setupRealtimeSubscriptions()
    return cleanup
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function checkUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/auth/login')
        return
      }

      setUser(user)
      await loadWorldObjects()
      await updatePresence(user.id)
      setLoading(false)
      setIsLoading(false)
    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/auth/login')
    }
  }

  async function loadWorldObjects() {
    try {
      const { data, error } = await supabase
        .from('world_objects')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      if (data) {
        setObjects(data as WorldObject[])
      }
    } catch (error) {
      console.error('Error loading objects:', error)
    }
  }

  async function updatePresence(userId: string) {
    const username = user?.user_metadata?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
    const playerColor = getRandomColor()

    try {
      const { error } = await supabase
        .from('players')
        .upsert({
          user_id: userId,
          username,
          color: playerColor,
          position: [0, 0, 0],
          last_seen: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        })

      if (error) throw error
      await loadPlayers()
    } catch (error) {
      console.error('Error updating presence:', error)
    }
  }

  async function loadPlayers() {
    try {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
      
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .gte('last_seen', fiveMinutesAgo)

      if (error) throw error
      if (data) {
        setPlayers(data as Player[])
      }
    } catch (error) {
      console.error('Error loading players:', error)
    }
  }

  function setupRealtimeSubscriptions() {
    const objectsChannel = supabase
      .channel('world_objects_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'world_objects' },
        (payload) => {
          addObject(payload.new as WorldObject)
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'world_objects' },
        (payload) => {
          const updated = payload.new as WorldObject
          updateObject(updated.id, updated)
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'world_objects' },
        (payload) => {
          deleteObject(payload.old.id)
        }
      )
      .subscribe()

    const playersChannel = supabase
      .channel('players_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'players' },
        () => {
          loadPlayers()
        }
      )
      .subscribe()

    const presenceInterval = setInterval(() => {
      if (user) {
        updatePresence(user.id)
      }
    }, 30000)

    return () => {
      objectsChannel.unsubscribe()
      playersChannel.unsubscribe()
      clearInterval(presenceInterval)
    }
  }

  async function handleAddObject(type: 'cube' | 'sphere') {
    if (!user) return

    const newObject: Omit<WorldObject, 'id'> = {
      type,
      position: [
        Math.random() * 10 - 5,
        Math.random() * 3 + 1,
        Math.random() * 10 - 5
      ],
      rotation: [0, 0, 0],
      color: getRandomColor(),
      created_by: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    try {
      const { error } = await supabase
        .from('world_objects')
        .insert([newObject])

      if (error) throw error
    } catch (error) {
      console.error('Error adding object:', error)
    }
  }

  async function handleObjectDragEnd(id: string, position: [number, number, number]) {
    try {
      const { error } = await supabase
        .from('world_objects')
        .update({ position, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error updating object:', error)
    }
  }

  async function handleDeleteSelected() {
    if (!selectedObject) return

    try {
      const { error } = await supabase
        .from('world_objects')
        .delete()
        .eq('id', selectedObject)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting object:', error)
    }
  }

  async function handleSaveScene() {
    alert(`Scene saved! ${objects.length} objects in the world.`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading 3D Builder...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen bg-gray-900">
      <Header />
      <PlayersList />
      <Toolbar
        onAddCube={() => handleAddObject('cube')}
        onAddSphere={() => handleAddObject('sphere')}
        onDeleteSelected={handleDeleteSelected}
        onSaveScene={handleSaveScene}
        selectedObject={selectedObject}
      />
      <Scene3D onObjectDragEnd={handleObjectDragEnd} />
    </div>
  )
}
