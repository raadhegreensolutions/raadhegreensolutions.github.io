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
    float h = texture2D(uBump, vUv).r;
    float h2 = texture2D(uBump, vUv + vec2(0.002, 0.0)).r;
    float h3 = texture2D(uBump, vUv + vec2(0.0, 0.002)).r;
    normal = normalize(normal + vec3(h - h2, h - h3, 0.0) * 0.45);

    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float lambert = dot(normal, uSunDirection);
    // Soft terminator — keep the dark side readable, not black
    float dayMix = smoothstep(-0.35, 0.55, lambert);

    vec3 dayColor = texture2D(uDay, vUv).rgb * 1.38;
    // Lift oceans toward a fresher light blue
    dayColor = mix(dayColor, vec3(0.45, 0.72, 0.98), 0.14);
    vec3 nightTex = texture2D(uNight, vUv).rgb;
    vec3 nightSide = dayColor * 0.55 + nightTex * vec3(1.3, 1.15, 0.95) * 0.4;
    vec3 color = mix(nightSide, dayColor, dayMix);

    color += dayColor * 0.3;
    color *= vec3(0.92, 1.02, 1.12); // gentle cool/light-blue grade

    float water = texture2D(uSpecular, vUv).r;
    vec3 halfDir = normalize(uSunDirection + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 28.0);
    color += vec3(0.75, 0.9, 1.0) * spec * water * dayMix * 0.32;

    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);
    color += vec3(0.55, 0.78, 1.0) * fresnel * 0.22;

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
    vec3 glow = mix(vec3(0.35, 0.65, 1.0), vec3(0.7, 0.9, 1.0), fresnel);
    gl_FragColor = vec4(glow, intensity);
  }
`

function Earth({ reducedDetail }: { reducedDetail: boolean }) {
  const group = useRef<THREE.Group>(null)
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

      <mesh scale={1.1}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial
          color="#7ec4ff"
          transparent
          opacity={0.08}
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
      <ambientLight intensity={0.78} />
      <directionalLight
        position={[SUN.x * 6, SUN.y * 6, SUN.z * 6]}
        intensity={2.85}
        color="#ffffff"
      />
      <directionalLight position={[-3, 1, -2]} intensity={0.85} color="#b8d8ff" />
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
            toneMappingExposure: 1.65,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene reducedDetail={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  )
}
