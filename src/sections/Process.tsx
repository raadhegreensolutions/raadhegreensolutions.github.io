import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { processSteps } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { useIsMobile } from '../hooks/useMediaQuery'

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.45'],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="process" className="relative bg-offwhite py-24 md:py-32">
      <div className="section-pad container-max">
        <SectionHeading
          light
          eyebrow="Our Process"
          title="From waste stream to resource stream"
          description="A four-stage loop engineered for maximum recovery and minimum residual."
        />

        <div ref={ref} className="relative mx-auto max-w-5xl">
          {/* Desktop SVG path */}
          {!isMobile && (
            <svg
              className="pointer-events-none absolute left-0 top-10 hidden h-24 w-full md:block"
              viewBox="0 0 1000 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M40 40 H960"
                stroke="rgba(15,43,24,0.12)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <motion.path
                d="M40 40 H960"
                stroke="url(#processGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="processGrad" x1="0" y1="0" x2="1000" y2="0">
                  <stop stopColor="#2E7D32" />
                  <stop offset="1" stopColor="#0B3D91" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Mobile vertical path */}
          {isMobile && (
            <svg
              className="pointer-events-none absolute left-6 top-0 h-full w-8"
              viewBox="0 0 24 800"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M12 20 V780" stroke="rgba(15,43,24,0.12)" strokeWidth="3" />
              <motion.path
                d="M12 20 V780"
                stroke="url(#processGradV)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="processGradV" x1="0" y1="0" x2="0" y2="800">
                  <stop stopColor="#2E7D32" />
                  <stop offset="1" stopColor="#0B3D91" />
                </linearGradient>
              </defs>
            </svg>
          )}

          <div className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} className="pl-14 md:pl-0 md:pt-28">
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient font-heading text-lg font-bold text-white shadow-[var(--shadow-glow)] md:absolute md:-top-[4.75rem] md:left-1/2 md:-translate-x-1/2">
                    {i + 1}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-forest">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest/60">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
