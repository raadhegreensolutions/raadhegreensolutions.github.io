import { industries } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Industries() {
  const doubled = [...industries, ...industries]

  return (
    <section id="industries" className="relative overflow-hidden bg-charcoal py-20 md:py-28">
      <div className="section-pad container-max mb-10">
        <SectionHeading
          eyebrow="Industries Served"
          title="Trusted across sectors"
          description="From city governments to industrial parks — we design waste systems that fit the context."
          className="mb-0"
        />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-charcoal to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-charcoal to-transparent sm:w-28" />

        <div className="flex w-max animate-marquee gap-4 py-2 hover:[animation-play-state:paused]">
          {doubled.map((ind, i) => {
            const Icon = ind.icon
            return (
              <div
                key={`${ind.name}-${i}`}
                className="glass flex min-w-[200px] items-center gap-3 rounded-2xl px-5 py-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary-light">
                  <Icon size={18} />
                </span>
                <span className="whitespace-nowrap text-sm font-medium text-white/85">
                  {ind.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
