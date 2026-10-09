import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

type TruckProps = {
  compact?: boolean
}

function Wheel({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, -0.4, z]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.19, 0.19, 0.13, 18]} />
      <meshStandardMaterial color="#091727" roughness={0.58} metalness={0.3} />
    </mesh>
  )
}

export default function Truck({ compact = false }: TruckProps) {
  const truck = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!truck.current) {
      return
    }
    const time = state.clock.getElapsedTime()
    truck.current.position.y = -0.92 + Math.sin(time * 0.55) * 0.025
  })

  return (
    <group ref={truck} position={[0.2, -0.92, 1.02]} rotation={[0.08, -0.62, 0]} scale={compact ? 0.72 : 1}>
      <mesh position={[0.37, 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.38, 0.64, 0.66]} />
        <meshStandardMaterial color="#093363" roughness={0.37} metalness={0.45} />
      </mesh>
      <mesh position={[-0.66, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.53, 0.65]} />
        <meshStandardMaterial color="#0e3b70" roughness={0.35} metalness={0.45} />
      </mesh>
      <mesh position={[-0.67, 0.12, 0]} castShadow>
        <boxGeometry args={[0.35, 0.18, 0.67]} />
        <meshStandardMaterial color="#75a5bf" roughness={0.15} metalness={0.75} transparent opacity={0.87} />
      </mesh>
      <mesh position={[0.25, 0.13, 0.337]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.78, 0.23]} />
        <meshBasicMaterial color="#ef9b24" />
      </mesh>
      <mesh position={[-0.94, -0.2, 0.03]} castShadow>
        <boxGeometry args={[0.08, 0.13, 0.71]} />
        <meshStandardMaterial color="#ef9b24" roughness={0.35} />
      </mesh>
      <mesh position={[0.16, -0.22, 0]} castShadow>
        <boxGeometry args={[1.72, 0.09, 0.7]} />
        <meshStandardMaterial color="#ef9b24" roughness={0.42} metalness={0.28} />
      </mesh>
      <Wheel x={-0.7} z={0.38} />
      <Wheel x={-0.7} z={-0.38} />
      <Wheel x={0.64} z={0.38} />
      <Wheel x={0.64} z={-0.38} />
      <pointLight position={[-1.02, -0.04, 0.23]} color="#ffd996" intensity={compact ? 0.25 : 0.5} distance={1.2} />
    </group>
  )
}
