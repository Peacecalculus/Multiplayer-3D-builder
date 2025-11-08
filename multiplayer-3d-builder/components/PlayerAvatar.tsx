'use client'

import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Player } from '@/types'

interface PlayerAvatarProps {
  player: Player
}

export function PlayerAvatar({ player }: PlayerAvatarProps) {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = player.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={player.position}>
      <mesh ref={meshRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={player.color} emissive={player.color} emissiveIntensity={0.5} />
      </mesh>
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000"
      >
        {player.username}
      </Text>
    </group>
  )
}
