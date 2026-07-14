import { whyUs } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Stagger, StaggerItem } from '../components/ui/Reveal'
import { TiltCard } from '../components/ui/TiltCard'

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative bg-offwhite py-24 md:py-32">
      <div className="section-pad container-max">
        <SectionHeading
          light
          eyebrow="Why Choose Us"
          title="The Raadhe Green difference"
          description="Premium execution, regulatory confidence, and circular outcomes that hold up under audit."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {whyUs.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.title}>
                <TiltCard intensity={8}>
                  <div className="group h-full rounded-2xl border border-forest/8 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(15,43,24,0.1)] md:p-7">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-forest">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-forest/60">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
