import { create } from 'zustand'
import { WorldObject, Player } from '@/types'

interface BuilderStore {
  objects: WorldObject[]
  players: Player[]
  selectedObject: string | null
  addObject: (object: WorldObject) => void
  updateObject: (id: string, updates: Partial<WorldObject>) => void
  deleteObject: (id: string) => void
  setObjects: (objects: WorldObject[]) => void
  setPlayers: (players: Player[]) => void
  selectObject: (id: string | null) => void
}

export const useBuilderStore = create<BuilderStore>((set) => ({
  objects: [],
  players: [],
  selectedObject: null,
  addObject: (object) => set((state) => ({ objects: [...state.objects, object] })),
  updateObject: (id, updates) =>
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    })),
  deleteObject: (id) =>
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
      selectedObject: state.selectedObject === id ? null : state.selectedObject,
    })),
  setObjects: (objects) => set({ objects }),
  setPlayers: (players) => set({ players }),
  selectObject: (id) => set({ selectedObject: id }),
}))
