import { aboutStats } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { useCountUp } from '../hooks/useCountUp'

function StatItem({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number
  suffix: string
  label: string
  decimals?: number
}) {
  const { value: display, ref } = useCountUp({ end: value, decimals })
  return (
    <div className="text-center sm:text-left">
      <p className="font-heading text-3xl font-bold tracking-tight text-forest sm:text-4xl">
        <span ref={ref}>{decimals > 0 ? display.toFixed(decimals) : display}</span>
        {suffix}
      </p>
      <p className="mt-1 text-sm text-forest/55">{label}</p>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="relative bg-offwhite py-24 md:py-32">
      <div className="section-pad container-max">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              light
              align="left"
              eyebrow="About Us"
              title="Engineering a circular future"
              description="Raadhe Green Solutions Pvt. Ltd. is an integrated environmental & waste management company helping cities, campuses, and industries convert waste into recoverable value — sustainably, transparently, and at scale."
              className="mb-8 md:mb-10"
            />
            <Reveal delay={0.15}>
              <p className="max-w-xl text-sm leading-relaxed text-forest/60 md:text-base">
                From solid waste logistics and material recovery facilities to organic
                composting, C&D processing, and ESG consulting, we design systems that
                divert landfill waste, cut emissions, and deliver audit-ready impact data.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-forest/8 bg-white p-8 shadow-[0_24px_80px_rgba(15,43,24,0.08)] md:p-10">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-trust/10 blur-3xl" />
              <div className="relative grid grid-cols-2 gap-8">
                {aboutStats.map((stat) => (
                  <StatItem key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
