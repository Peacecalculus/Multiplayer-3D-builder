'use client'

import { useRef, useState } from 'react'
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber'
import { Mesh, Raycaster, Vector3, Plane } from 'three'
import { WorldObject } from '@/types'

interface SceneObjectProps {
  object: WorldObject
  isSelected: boolean
  onSelect: () => void
  onDragEnd: (position: [number, number, number]) => void
}

export function SceneObject({ object, isSelected, onSelect, onDragEnd }: SceneObjectProps) {
  const meshRef = useRef<Mesh>(null!)
  const [isDragging, setIsDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { camera, pointer } = useThree()
  const plane = useRef(new Plane(new Vector3(0, 1, 0), 0))
  const raycaster = useRef(new Raycaster())
  const intersection = useRef(new Vector3())

  useFrame((state, delta) => {
    if (meshRef.current && !isDragging) {
      meshRef.current.rotation.y += delta * 0.5
    }

    // Handle dragging with raycasting
    if (isDragging && meshRef.current) {
      raycaster.current.setFromCamera(pointer, camera)
      raycaster.current.ray.intersectPlane(plane.current, intersection.current)
      if (intersection.current) {
        meshRef.current.position.x = intersection.current.x
        meshRef.current.position.z = intersection.current.z
      }
    }
  })

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    onSelect()
    setIsDragging(true)
    
    // Set plane height to object's Y position for smooth dragging
    if (meshRef.current) {
      plane.current.constant = -meshRef.current.position.y
    }
  }

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    if (isDragging && meshRef.current) {
      const pos = meshRef.current.position
      onDragEnd([pos.x, pos.y, pos.z])
      setIsDragging(false)
    }
  }

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isDragging) {
      e.stopPropagation()
    }
  }

  return (
    <>
      {object.type === 'cube' ? (
        <mesh
          ref={meshRef}
          position={object.position}
          rotation={object.rotation}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          scale={isSelected ? 1.1 : hovered ? 1.05 : 1}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={object.color}
            emissive={isSelected ? object.color : hovered ? '#444' : '#000'}
            emissiveIntensity={isSelected ? 0.3 : hovered ? 0.1 : 0}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
      ) : (
        <mesh
          ref={meshRef}
          position={object.position}
          rotation={object.rotation}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          scale={isSelected ? 1.1 : hovered ? 1.05 : 1}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={object.color}
            emissive={isSelected ? object.color : hovered ? '#444' : '#000'}
            emissiveIntensity={isSelected ? 0.3 : hovered ? 0.1 : 0}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
      )}
    </>
  )
}
