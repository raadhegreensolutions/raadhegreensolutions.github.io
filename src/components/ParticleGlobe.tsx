import { useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery'

function ParticleSphere({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const grey = new THREE.Color('#6b7280')
    const green = new THREE.Color('#2E7D32')
    const blue = new THREE.Color('#0B3D91')

    for (let i = 0; i < count; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const r = 1.55 + (Math.random() - 0.5) * 0.12

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const mix = Math.random()
      const c = grey.clone().lerp(mix > 0.55 ? green : blue, mix)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    return { positions, colors }
  }, [count])

  useFrame((state) => {
    const pts = pointsRef.current
    if (!pts) return
    pts.rotation.y = state.clock.elapsedTime * 0.12
    pts.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.12

    if (materialRef.current) {
      const t = (Math.sin(state.clock.elapsedTime * 0.4) + 1) / 2
      materialRef.current.opacity = 0.55 + t * 0.35
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.028}
        vertexColors
        transparent
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function InnerOrbits() {
  const ring = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (ring.current) {
      ring.current.rotation.z = s.clock.elapsedTime * 0.25
      ring.current.rotation.x = Math.PI / 3
    }
  })
  return (
    <mesh ref={ring}>
      <torusGeometry args={[1.95, 0.008, 8, 100]} />
      <meshBasicMaterial color="#2E7D32" transparent opacity={0.45} />
    </mesh>
  )
}

function Scene({ count }: { count: number }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <ParticleSphere count={count} />
      <InnerOrbits />
    </>
  )
}

export function ParticleGlobe({ className }: { className?: string }) {
  const isMobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const count = isMobile ? 900 : 2800

  if (reduced) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(46,125,50,0.35), transparent 60%)',
        }}
      />
    )
  }

  return (
    <div className={className} aria-hidden>
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, isMobile ? 1.5 : 2]}
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene count={count} />
        </Canvas>
      </Suspense>
    </div>
  )
}
