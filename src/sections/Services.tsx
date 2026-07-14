import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { services } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TiltCard } from '../components/ui/TiltCard'
import { Stagger, StaggerItem } from '../components/ui/Reveal'

export function Services() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="services" className="relative bg-charcoal py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(46,125,50,0.15), transparent)',
        }}
      />
      <div className="section-pad container-max relative">
        <SectionHeading
          eyebrow="Services"
          title="End-to-end environmental intelligence"
          description="Seven integrated capabilities — expandable for the full depth of how we operate."
        />

        <Stagger className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" stagger={0.07}>
          {services.map((service) => {
            const Icon = service.icon
            const isOpen = openId === service.id
            return (
              <StaggerItem key={service.id} className={clsx(service.span)}>
                <TiltCard className="h-full">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : service.id)}
                    className={clsx(
                      'group glass relative flex h-full w-full flex-col rounded-2xl p-6 text-left transition-all duration-400',
                      'hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]',
                      isOpen && 'border-primary/50 shadow-[var(--shadow-glow)]',
                    )}
                  >
                    <div className="mb-5 flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon size={20} />
                      </span>
                      <ChevronDown
                        size={18}
                        className={clsx(
                          'text-white/40 transition-transform duration-300',
                          isOpen && 'rotate-180 text-primary-light',
                        )}
                      />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-white md:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                            {service.sub.map((item) => (
                              <li
                                key={item}
                                className="flex items-center gap-2 text-sm text-white/70"
                              >
                                <span className="h-1 w-1 rounded-full bg-primary" />
                                {item}
                              </li>
                            ))}
                          </div>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </button>
                </TiltCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
