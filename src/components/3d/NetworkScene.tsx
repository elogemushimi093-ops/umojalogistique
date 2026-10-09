import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import Globe from './Globe'
import SceneFallback from './SceneFallback'

export default function NetworkScene() {
  const host = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const element = host.current
    if (!element || !('IntersectionObserver' in window)) {
      setActive(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={host} className="network-scene" aria-label="Interactive global network visualization">
      <Canvas
        camera={{ position: [0, 0.1, 5], fov: 44 }}
        dpr={[1, 1.4]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        fallback={<SceneFallback />}
      >
        <color attach="background" args={['#071c39']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3.5, 4]} intensity={2} color="#d6efff" />
        <pointLight position={[-2.4, -1.5, 2]} intensity={1} color="#f0a027" />
        <Globe paused={!active} showFuture />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.07}
          rotateSpeed={0.46}
          minPolarAngle={Math.PI * 0.35}
          maxPolarAngle={Math.PI * 0.66}
        />
      </Canvas>
      <div className="scene-vignette" aria-hidden="true" />
    </div>
  )
}
