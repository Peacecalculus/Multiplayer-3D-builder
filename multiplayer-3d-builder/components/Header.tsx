'use client'

import { useAuthStore } from '@/store/authStore'
import { useBuilderStore } from '@/store/builderStore'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user } = useAuthStore()
  const { players } = useBuilderStore()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const displayName = user?.user_metadata?.name || user?.user_metadata?.full_name || user?.email || 'User'

  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-white">3D Builder</h1>
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">{players.length} online</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-300">
            Welcome, <span className="font-medium text-white">{displayName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
