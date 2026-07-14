import { useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery'

const SUN = new THREE.Vector3(1.2, 0.35, 0.8).normalize()

const earthVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

const earthFragment = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uSpecular;
  uniform sampler2D uBump;
  uniform vec3 uSunDirection;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 normal = normalize(vWorldNormal);
    // Subtle bump from topology (grayscale height)
    float h = texture2D(uBump, vUv).r;
    float h2 = texture2D(uBump, vUv + vec2(0.002, 0.0)).r;
    float h3 = texture2D(uBump, vUv + vec2(0.0, 0.002)).r;
    normal = normalize(normal + vec3(h - h2, h - h3, 0.0) * 0.65);

    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float lambert = dot(normal, uSunDirection);
    float dayMix = smoothstep(-0.08, 0.45, lambert);

    vec3 dayColor = texture2D(uDay, vUv).rgb;
    vec3 nightColor = texture2D(uNight, vUv).rgb;

    // Boost city lights on the night side
    vec3 nightLit = nightColor * vec3(1.15, 1.05, 0.85) * 1.35;
    vec3 color = mix(nightLit, dayColor, dayMix);

    // Ocean specular highlights
    float water = texture2D(uSpecular, vUv).r;
    vec3 halfDir = normalize(uSunDirection + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 48.0);
    color += vec3(0.55, 0.7, 0.95) * spec * water * dayMix * 0.85;

    // Soft atmospheric edge on the lit limb
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.8);
    color += vec3(0.35, 0.65, 1.0) * fresnel * (0.12 + dayMix * 0.22);

    gl_FragColor = vec4(color, 1.0);
  }
`

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const atmosphereFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vView), normalize(vNormal))), 2.2);
    float intensity = fresnel * 0.85;
    vec3 glow = mix(vec3(0.15, 0.45, 1.0), vec3(0.55, 0.85, 1.0), fresnel);
    gl_FragColor = vec4(glow, intensity);
  }
`

function createCloudTexture(size = 1024) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, size, size)

  // Soft cloud blobs
  for (let i = 0; i < 2200; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = 6 + Math.random() * 48
    const a = 0.015 + Math.random() * 0.07
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, `rgba(255,255,255,${a})`)
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  // Band / storm streaks
  for (let i = 0; i < 40; i++) {
    const y = Math.random() * size
    const h = 8 + Math.random() * 28
    const grad = ctx.createLinearGradient(0, y, size, y)
    const a = 0.04 + Math.random() * 0.06
    grad.addColorStop(0, 'rgba(255,255,255,0)')
    grad.addColorStop(0.5, `rgba(255,255,255,${a})`)
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, y, size, h)
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  tex.anisotropy = 8
  return tex
}

function Earth({ reducedDetail }: { reducedDetail: boolean }) {
  const group = useRef<THREE.Group>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const earthMat = useRef<THREE.ShaderMaterial>(null)

  const base = import.meta.env.BASE_URL
  const [dayMap, nightMap, waterMap, bumpMap] = useTexture([
    `${base}earth/blue-marble.jpg`,
    `${base}earth/night.jpg`,
    `${base}earth/water.png`,
    `${base}earth/topology.png`,
  ])

  dayMap.colorSpace = THREE.SRGBColorSpace
  nightMap.colorSpace = THREE.SRGBColorSpace
  dayMap.anisotropy = 16
  nightMap.anisotropy = 8
  bumpMap.anisotropy = 8

  const cloudMap = useMemo(() => createCloudTexture(reducedDetail ? 512 : 1024), [reducedDetail])

  const earthUniforms = useMemo(
    () => ({
      uDay: { value: dayMap },
      uNight: { value: nightMap },
      uSpecular: { value: waterMap },
      uBump: { value: bumpMap },
      uSunDirection: { value: SUN.clone() },
    }),
    [dayMap, nightMap, waterMap, bumpMap],
  )

  const segments = reducedDetail ? 64 : 96

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.11
  })

  return (
    <group ref={group} rotation={[0.32, -0.6, 0.08]}>
      <mesh>
        <sphereGeometry args={[1.35, segments, segments]} />
        <shaderMaterial
          ref={earthMat}
          vertexShader={earthVertex}
          fragmentShader={earthFragment}
          uniforms={earthUniforms}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={1.018}>
        <sphereGeometry args={[1.35, segments, segments]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent
          opacity={reducedDetail ? 0.35 : 0.48}
          depthWrite={false}
          roughness={1}
          metalness={0}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Atmosphere shell */}
      <mesh scale={1.055}>
        <sphereGeometry args={[1.35, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Soft outer haze */}
      <mesh scale={1.1}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial
          color="#5aa8ff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function Scene({ reducedDetail }: { reducedDetail: boolean }) {
  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight
        position={[SUN.x * 6, SUN.y * 6, SUN.z * 6]}
        intensity={2.1}
        color="#fff4e5"
      />
      <directionalLight position={[-4, -1, -3]} intensity={0.15} color="#1a3a6e" />
      <Suspense fallback={null}>
        <Earth reducedDetail={reducedDetail} />
      </Suspense>
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
            'radial-gradient(circle at 50% 48%, rgba(90,168,255,0.4), rgba(15,43,24,0.15) 50%, transparent 70%)',
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
                'radial-gradient(circle at 50% 50%, rgba(90,168,255,0.3), transparent 60%)',
            }}
          />
        }
      >
        <Canvas
          dpr={[1, isMobile ? 1.5 : 2]}
          // Pulled back so full globe + atmosphere fit inside the canvas
          camera={{ position: [0, 0, 5.4], fov: 38 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene reducedDetail={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  )
}
