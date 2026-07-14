import { useEffect, useRef, useState } from 'react'
import { impactMetrics } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Stagger, StaggerItem } from '../components/ui/Reveal'

function ProgressRing({
  value,
  label,
  unit,
  id,
}: {
  value: number
  label: string
  unit: string
  id: string
}) {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const gradId = `ringGrad-${id}`

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setProgress(value)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  const offset = circumference - (progress / 100) * circumference

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)' }}
          />
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="128" y2="128">
              <stop stopColor="#2E7D32" />
              <stop offset="1" stopColor="#0B3D91" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-2xl font-bold text-white">
            {Math.round(progress)}
            <span className="text-sm text-primary-light">{unit === '%' ? '%' : ''}</span>
          </span>
          {unit !== '%' && <span className="text-xs text-muted">{unit}</span>}
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-white/80">{label}</p>
    </div>
  )
}

function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 17) % 100}%`,
    top: `${(i * 23 + 10) % 90}%`,
    size: 3 + (i % 4),
    delay: `${(i % 6) * 0.7}s`,
    duration: `${5 + (i % 4)}s`,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="float-particle absolute rounded-full bg-primary/40"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}

export function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden bg-forest py-24 md:py-32">
      <FloatingParticles />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 80% 20%, rgba(11,61,145,0.25), transparent)',
        }}
      />
      <div className="section-pad container-max relative">
        <SectionHeading
          eyebrow="Sustainability Impact"
          title="Numbers that prove circularity"
          description="Measurable diversion, emissions avoidance, and resource recovery — updated continuously from our operations."
        />

        <Stagger className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8" stagger={0.1}>
          {impactMetrics.map((m) => (
            <StaggerItem key={m.label}>
              <ProgressRing {...m} id={m.label} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
