import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery'

function Earth({ reducedDetail }: { reducedDetail: boolean }) {
  const group = useRef<THREE.Group>(null)
  const clouds = useRef<THREE.Mesh>(null)

  const [colorMap, bumpMap] = useTexture([
    `${import.meta.env.BASE_URL}earth/day.jpg`,
    `${import.meta.env.BASE_URL}earth/topology.png`,
  ])

  colorMap.colorSpace = THREE.SRGBColorSpace
  colorMap.anisotropy = 8

  const segments = reducedDetail ? 48 : 64

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.12
    if (clouds.current) {
      clouds.current.rotation.y += delta * 0.045
    }
  })

  return (
    <group ref={group} rotation={[0.25, 0.4, 0]}>
      {/* Planet */}
      <mesh>
        <sphereGeometry args={[1.55, segments, segments]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.045}
          roughness={0.72}
          metalness={0.08}
        />
      </mesh>

      {/* Soft cloud / haze shell */}
      <mesh ref={clouds} scale={1.015}>
        <sphereGeometry args={[1.55, segments, segments]} />
        <meshStandardMaterial
          color="#cfe8ff"
          transparent
          opacity={0.08}
          depthWrite={false}
          roughness={1}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={1.08}>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial
          color="#4ea8ff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Outer green rim for brand accent */}
      <mesh scale={1.12}>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial
          color="#2E7D32"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function OrbitRing() {
  const ring = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!ring.current) return
    ring.current.rotation.z = s.clock.elapsedTime * 0.18
    ring.current.rotation.x = Math.PI / 2.6
  })
  return (
    <mesh ref={ring}>
      <torusGeometry args={[2.05, 0.006, 8, 120]} />
      <meshBasicMaterial color="#2E7D32" transparent opacity={0.5} />
    </mesh>
  )
}

function Scene({ reducedDetail }: { reducedDetail: boolean }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 2, 5]} intensity={1.55} color="#fff6e8" />
      <directionalLight position={[-3, -1, -2]} intensity={0.35} color="#0B3D91" />
      <Suspense fallback={null}>
        <Earth reducedDetail={reducedDetail} />
      </Suspense>
      <OrbitRing />
    </>
  )
}

export function ParticleGlobe({ className }: { className?: string }) {
  const isMobile = useIsMobile()
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(78,168,255,0.35), rgba(46,125,50,0.2) 45%, transparent 68%)',
        }}
      />
    )
  }

  return (
    <div className={className} aria-hidden>
      <Suspense
        fallback={
          <div
            className="h-full w-full"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(78,168,255,0.28), transparent 60%)',
            }}
          />
        }
      >
        <Canvas
          dpr={[1, isMobile ? 1.5 : 2]}
          camera={{ position: [0, 0, 4.4], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene reducedDetail={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  )
}
