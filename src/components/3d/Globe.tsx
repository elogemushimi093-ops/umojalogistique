import { Html, Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { createRoutePoints, hubs, hubPosition, type HubId } from './sceneData'

type GlobeProps = {
  interactive?: boolean
  paused?: boolean
  showFuture?: boolean
  compact?: boolean
}

const routePairs: [HubId, HubId][] = [
  ['johannesburg', 'lubumbashi'],
  ['lubumbashi', 'kinshasa'],
  ['kinshasa', 'europe'],
]

function HubMarker({
  id,
  name,
  position,
  compact,
}: {
  id: HubId
  name: string
  position: THREE.Vector3
  compact: boolean
}) {
  const [active, setActive] = useState(false)

  return (
    <group position={position}>
      <mesh
        onPointerOver={(event) => {
          event.stopPropagation()
          setActive(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setActive(false)
          document.body.style.cursor = 'auto'
        }}
        onClick={(event) => {
          event.stopPropagation()
          setActive((isActive) => !isActive)
        }}
      >
        <sphereGeometry args={[active ? 0.065 : 0.047, 18, 18]} />
        <meshBasicMaterial color={active ? '#ffe0a2' : '#ef9b24'} />
      </mesh>
      {!compact && (
        <Html
          center
          distanceFactor={8}
          style={{ pointerEvents: 'none', transform: 'translate(12px, -12px)' }}
        >
          <span className={active ? 'hub-label is-active' : 'hub-label'}>{name}</span>
        </Html>
      )}
    </group>
  )
}

export default function Globe({
  interactive = true,
  paused = false,
  showFuture = false,
  compact = false,
}: GlobeProps) {
  const globe = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const currentRoutes = useMemo(
    () =>
      routePairs.map(([startId, endId]) => {
        const start = hubs.find((hub) => hub.id === startId)
        const end = hubs.find((hub) => hub.id === endId)
        if (!start || !end) {
          return []
        }
        return createRoutePoints(start, end)
      }),
    [],
  )

  useFrame((_, delta) => {
    if (!paused && globe.current && !hovered) {
      globe.current.rotation.y += delta * (compact ? 0.08 : 0.055)
    }
  })

  return (
    <group
      ref={globe}
      rotation={[0.12, -0.74, 0]}
      onPointerOver={() => {
        if (interactive) {
          setHovered(true)
        }
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <sphereGeometry args={[1.56, compact ? 34 : 52, compact ? 34 : 52]} />
        <meshStandardMaterial color="#0a315d" metalness={0.35} roughness={0.5} />
      </mesh>
      <mesh scale={1.007}>
        <sphereGeometry args={[1.56, compact ? 18 : 32, compact ? 18 : 32]} />
        <meshBasicMaterial color="#6d9ec0" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh scale={1.032}>
        <sphereGeometry args={[1.56, compact ? 26 : 44, compact ? 26 : 44]} />
        <meshBasicMaterial color="#7ab1d6" transparent opacity={0.055} side={THREE.BackSide} />
      </mesh>
      {currentRoutes.map((points, index) => (
        <Line
          key={routePairs[index].join('-')}
          points={points}
          color="#f0a027"
          lineWidth={compact ? 0.75 : 1.15}
          transparent
          opacity={0.95}
        />
      ))}
      {showFuture && (
        <>
          <Line
            points={[
              hubPosition(hubs[2], 1.64),
              new THREE.Vector3(-0.25, 1.98, -0.55),
              new THREE.Vector3(-1.45, 0.9, -0.8),
            ]}
            color="#78a7c8"
            lineWidth={0.6}
            dashed
            dashSize={0.12}
            gapSize={0.08}
            transparent
            opacity={0.65}
          />
          <Line
            points={[
              new THREE.Vector3(-1.45, 0.9, -0.8),
              new THREE.Vector3(-1.1, 0.1, 1.5),
              new THREE.Vector3(0.95, -0.55, 1.32),
            ]}
            color="#78a7c8"
            lineWidth={0.6}
            dashed
            dashSize={0.12}
            gapSize={0.08}
            transparent
            opacity={0.65}
          />
        </>
      )}
      {hubs.map((hub) => (
        <HubMarker
          key={hub.id}
          id={hub.id}
          name={hub.name}
          position={hubPosition(hub, 1.61)}
          compact={compact}
        />
      ))}
    </group>
  )
}
