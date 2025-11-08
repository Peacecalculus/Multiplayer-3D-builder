'use client'

import { useBuilderStore } from '@/store/builderStore'

export default function PlayersList() {
  const { players, objects } = useBuilderStore()

  return (
    <div className="absolute top-20 right-4 z-10 w-64">
      <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-xl shadow-2xl p-4">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Online Players ({players.length})
        </h3>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {players.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-4">
              Waiting for players to join...
            </div>
          ) : (
            players.map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-lg"
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: player.color }}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">
                    {player.username}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(player.last_seen).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="text-xs text-gray-400">
            <div className="flex justify-between mb-1">
              <span>Total Objects:</span>
              <span className="text-white font-medium">{objects.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
