import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import Globe from './Globe'
import SceneFallback from './SceneFallback'
import Truck from './Truck'

function useSceneActivity() {
  const container = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const element = container.current
    if (!element || !('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.08 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { container, active }
}

function useSceneQuality() {
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high')

  useEffect(() => {
    const updateQuality = () => {
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
      const threads = navigator.hardwareConcurrency ?? 8
      setQuality(window.innerWidth < 720 || memory <= 4 || threads <= 4 ? 'low' : window.innerWidth < 1280 ? 'medium' : 'high')
    }
    updateQuality()
    window.addEventListener('resize', updateQuality, { passive: true })
    return () => window.removeEventListener('resize', updateQuality)
  }, [])

  return quality
}

export default function HeroScene() {
  const { container, active } = useSceneActivity()
  const quality = useSceneQuality()
  const dpr = quality === 'high' ? 1.7 : quality === 'medium' ? 1.35 : 1

  return (
    <div ref={container} className="hero-scene" aria-label="Interactive Umoja logistics network globe">
      <Canvas
        camera={{ position: [0, 0.2, 5.2], fov: 42 }}
        dpr={[1, dpr]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: quality !== 'low', alpha: true, powerPreference: 'high-performance' }}
        fallback={<SceneFallback />}
      >
        <color attach="background" args={['#062653']} />
        <fog attach="fog" args={['#062653', 5.2, 10.5]} />
        <ambientLight intensity={0.62} />
        <directionalLight position={[3.5, 4.5, 4]} intensity={2.25} color="#d6efff" castShadow={quality === 'high'} />
        <pointLight position={[-3.5, -1.5, 2]} intensity={1.25} color="#f0a027" />
        <Globe paused={!active} compact={quality === 'low'} />
        <Truck compact={quality === 'low'} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.45}
          minPolarAngle={Math.PI * 0.35}
          maxPolarAngle={Math.PI * 0.66}
        />
      </Canvas>
      <div className="scene-vignette" aria-hidden="true" />
    </div>
  )
}
