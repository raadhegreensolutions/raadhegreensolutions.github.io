import { MapPin, Mail, Phone } from 'lucide-react'
import { contactInfo } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSemtorHe1AfbHNxDs7-T7vJ9ugiemUO17nMUOX-atRQui3o1Q/viewform?embedded=true'

export function Contact() {
  return (
    <section id="contact" className="relative bg-charcoal py-24 md:py-32">
      <div className="section-pad container-max">
        <SectionHeading
          eyebrow="Contact"
          title="Let's design your circular system"
          description="Tell us about your waste streams, ESG goals, or facility challenges — we'll craft a proposal."
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <div className="glass overflow-hidden rounded-3xl p-2 sm:p-3 md:p-4">
              <iframe
                title="Contact Raadhe Green Solutions"
                src={GOOGLE_FORM_URL}
                className="h-[720px] w-full rounded-2xl bg-white sm:h-[780px] md:h-[826px]"
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col gap-6">
              <div className="glass relative min-h-[260px] flex-1 overflow-hidden rounded-3xl">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 48% 52%, rgba(46,125,50,0.35), transparent 40%), linear-gradient(145deg, #0F2B18, #0B0F0C 60%, #0B3D91)',
                  }}
                />
                <svg
                  className="absolute inset-0 h-full w-full opacity-30"
                  viewBox="0 0 400 300"
                  aria-hidden
                >
                  <path
                    d="M40 80 L120 60 L180 100 L260 70 L340 110 L360 180 L280 220 L160 240 L80 190 Z"
                    fill="none"
                    stroke="#2E7D32"
                    strokeWidth="1.5"
                  />
                  <circle cx="195" cy="145" r="8" fill="#2E7D32" className="animate-pulse" />
                  <circle cx="195" cy="145" r="18" fill="none" stroke="#2E7D32" strokeOpacity="0.4" />
                  <circle cx="195" cy="145" r="28" fill="none" stroke="#0B3D91" strokeOpacity="0.3" />
                </svg>
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-charcoal/70 p-4 backdrop-blur-md">
                  <p className="flex items-start gap-2 text-sm text-white/85">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-primary-light" />
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="glass flex items-center gap-3 rounded-2xl p-4 transition-colors hover:border-primary/40"
                >
                  <Mail size={18} className="text-primary-light" />
                  <span className="truncate text-sm text-white/80">{contactInfo.email}</span>
                </a>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="glass flex items-center gap-3 rounded-2xl p-4 transition-colors hover:border-primary/40"
                >
                  <Phone size={18} className="text-primary-light" />
                  <span className="text-sm text-white/80">{contactInfo.phone}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
