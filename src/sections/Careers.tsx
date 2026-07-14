import { ArrowRight, Briefcase } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'

export function Careers() {
  return (
    <section id="careers" className="relative bg-charcoal py-16 md:py-24">
      <div className="section-pad container-max">
        <Reveal>
          <div className="careers-gradient relative overflow-hidden rounded-[2rem] px-8 py-14 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_45%)]" />
            <div className="relative">
              <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                <Briefcase size={22} />
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                Build the circular economy with us
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/75 md:text-lg">
                Join engineers, operators, and sustainability strategists shaping
                how India recovers value from waste.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                  as="a"
                  href="#contact"
                  variant="secondary"
                  className="!border-white/30 !bg-white !text-forest hover:!bg-white/90"
                >
                  Explore Open Roles
                  <ArrowRight size={16} />
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
