'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Grid } from '@react-three/drei'
import { SceneObject } from './SceneObject'
import { PlayerAvatar } from './PlayerAvatar'
import { useBuilderStore } from '@/store/builderStore'
import { Suspense } from 'react'

interface Scene3DProps {
  onObjectDragEnd: (id: string, position: [number, number, number]) => void
}

export default function Scene3D({ onObjectDragEnd }: Scene3DProps) {
  const { objects, players, selectedObject, selectObject } = useBuilderStore()

  return (
    <Canvas
      camera={{ position: [10, 10, 10], fov: 50 }}
      shadows
      className="w-full h-full"
    >
      <Suspense fallback={null}>
        <Sky sunPosition={[100, 20, 100]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a90e2" />
        <pointLight position={[10, -10, 10]} intensity={0.5} color="#e24a90" />

        <Grid
          args={[30, 30]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6b7280"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#3b82f6"
          fadeDistance={50}
          fadeStrength={1}
          position={[0, -0.01, 0]}
        />

        {objects.map((object) => (
          <SceneObject
            key={object.id}
            object={object}
            isSelected={selectedObject === object.id}
            onSelect={() => selectObject(object.id)}
            onDragEnd={(position) => onObjectDragEnd(object.id, position)}
          />
        ))}

        {players.map((player) => (
          <PlayerAvatar key={player.id} player={player} />
        ))}

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  )
}
