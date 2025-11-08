'use client'

interface ToolbarProps {
  onAddCube: () => void
  onAddSphere: () => void
  onDeleteSelected: () => void
  onSaveScene: () => void
  selectedObject: string | null
}

export default function Toolbar({
  onAddCube,
  onAddSphere,
  onDeleteSelected,
  onSaveScene,
  selectedObject,
}: ToolbarProps) {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-xl shadow-2xl p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onAddCube}
            className="group relative px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:scale-105 active:scale-95"
            title="Add Cube"
          >
            <div className="flex flex-col items-center gap-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-xs font-medium">Cube</span>
            </div>
          </button>

          <button
            onClick={onAddSphere}
            className="group relative px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all hover:scale-105 active:scale-95"
            title="Add Sphere"
          >
            <div className="flex flex-col items-center gap-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="9" strokeWidth={2} />
              </svg>
              <span className="text-xs font-medium">Sphere</span>
            </div>
          </button>

          <div className="w-px h-12 bg-gray-700"></div>

          <button
            onClick={onDeleteSelected}
            disabled={!selectedObject}
            className="group relative px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100"
            title="Delete Selected"
          >
            <div className="flex flex-col items-center gap-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="text-xs font-medium">Delete</span>
            </div>
          </button>

          <div className="w-px h-12 bg-gray-700"></div>

          <button
            onClick={onSaveScene}
            className="group relative px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all hover:scale-105 active:scale-95"
            title="Save Scene"
          >
            <div className="flex flex-col items-center gap-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span className="text-xs font-medium">Save</span>
            </div>
          </button>
        </div>

        {selectedObject && (
          <div className="mt-3 pt-3 border-t border-gray-700 text-center">
            <span className="text-xs text-gray-400">Object selected - Click to move or delete</span>
          </div>
        )}
      </div>
    </div>
  )
}
