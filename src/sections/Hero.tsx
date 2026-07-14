import { useRef, Suspense, lazy } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Recycle, Leaf, Sparkles } from 'lucide-react'
import { MagneticButton } from '../components/ui/MagneticButton'
import { useIsMobile } from '../hooks/useMediaQuery'

const ParticleGlobe = lazy(() =>
  import('../components/ParticleGlobe').then((m) => ({ default: m.ParticleGlobe })),
)

const floatingIcons = [
  { Icon: Recycle, x: '12%', y: '28%', delay: 0.2 },
  { Icon: Leaf, x: '78%', y: '22%', delay: 0.45 },
  { Icon: Sparkles, x: '85%', y: '62%', delay: 0.65 },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 60, damping: 18 })
  const springY = useSpring(my, { stiffness: 60, damping: 18 })
  const parallaxX = useTransform(springX, [-1, 1], [-18, 18])
  const parallaxY = useTransform(springY, [-1, 1], [-14, 14])

  const onMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(46,125,50,0.22), transparent 55%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(11,61,145,0.18), transparent 50%), linear-gradient(160deg, #0B0F0C 0%, #0F2B18 55%, #0B0F0C 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <motion.div
        className="pointer-events-none absolute right-[-4%] top-1/2 aspect-square h-[min(88vmin,720px)] w-[min(88vmin,720px)] -translate-y-1/2 opacity-95 md:right-[0%] lg:right-[2%]"
        style={isMobile ? undefined : { x: parallaxX, y: parallaxY }}
      >
        <Suspense
          fallback={
            <div
              className="h-full w-full"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(46,125,50,0.3), transparent 60%)',
              }}
            />
          }
        >
          <ParticleGlobe className="h-full w-full" />
        </Suspense>
      </motion.div>

      {!isMobile &&
        floatingIcons.map(({ Icon, x, y, delay }) => (
          <motion.div
            key={x + y}
            className="pointer-events-none absolute z-10 hidden h-12 w-12 items-center justify-center rounded-2xl glass text-primary-light md:flex"
            style={{ left: x, top: y, x: parallaxX, y: parallaxY }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { delay: delay + 0.6, duration: 0.6 },
              scale: { delay: delay + 0.6, duration: 0.6 },
              y: { delay: delay + 1.2, duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <Icon size={20} />
          </motion.div>
        ))}

      <div className="section-pad container-max relative z-20 w-full pt-28 pb-20">
        <div className="max-w-2xl">
          <motion.p
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-light backdrop-blur"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Raadhe Green Solutions
          </motion.p>

          <motion.h1
            className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            Transforming Waste into <span className="text-gradient">Sustainable Value</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            Integrated environmental & waste management — from collection and MRF to recycling,
            composting, and corporate ESG strategy.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton as="a" href="#contact" variant="primary">
              Request a Quote
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton as="a" href="#services" variant="secondary">
              Explore Services
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          className="h-8 w-px bg-gradient-to-b from-primary to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
