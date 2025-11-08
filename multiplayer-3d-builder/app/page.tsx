import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/builder')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
            Multiplayer 3D Builder
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create, collaborate, and build together in a shared 3D world with real-time multiplayer features
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-semibold text-white mb-2">Build Together</h3>
            <p className="text-gray-400 text-sm">Create 3D objects in real-time with your team</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="text-4xl mb-3">🌐</div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Sync</h3>
            <p className="text-gray-400 text-sm">See every change instantly across all users</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-xl font-semibold text-white mb-2">Beautiful 3D</h3>
            <p className="text-gray-400 text-sm">Immersive 3D environment with stunning visuals</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <a
            href="/auth/signup"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl font-medium transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Get Started
          </a>
          <a
            href="/auth/login"
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-lg rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  )
}
