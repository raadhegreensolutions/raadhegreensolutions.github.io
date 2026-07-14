import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Mail, Phone } from 'lucide-react'
import { contactInfo } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'
import clsx from 'clsx'

function FloatingField({
  id,
  label,
  type = 'text',
  required,
  value,
  onChange,
  rows,
}: {
  id: string
  label: string
  type?: string
  required?: boolean
  value: string
  onChange: (v: string) => void
  rows?: number
}) {
  const filled = value.length > 0
  const Tag = rows ? 'textarea' : 'input'

  return (
    <div className="relative">
      <Tag
        id={id}
        name={id}
        type={rows ? undefined : type}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          'peer w-full rounded-xl border border-white/12 bg-white/5 px-4 pt-5 pb-2 text-sm text-white outline-none transition-all',
          'focus:border-primary/60 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(46,125,50,0.2)]',
          rows && 'resize-none',
        )}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={clsx(
          'pointer-events-none absolute left-4 origin-left text-sm text-white/45 transition-all duration-200',
          filled || undefined
            ? 'top-2 scale-75 text-primary-light'
            : 'top-3.5 peer-focus:top-2 peer-focus:scale-75 peer-focus:text-primary-light peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-primary-light',
        )}
      >
        {label}
      </label>
    </div>
  )
}

function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient"
        initial={{ pathLength: 0 }}
        animate={{ scale: [0.8, 1.08, 1] }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.svg viewBox="0 0 24 24" className="h-10 w-10 text-white" fill="none">
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          />
        </motion.svg>
      </motion.div>
      <h3 className="mt-6 font-heading text-2xl font-bold text-white">Message sent</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Thanks for reaching out. Our team will respond within one business day.
      </p>
    </motion.div>
  )
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
            <div className="glass relative overflow-hidden rounded-3xl p-6 md:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessCheck />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FloatingField
                      id="name"
                      label="Full name"
                      required
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    />
                    <FloatingField
                      id="email"
                      label="Work email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    />
                    <FloatingField
                      id="company"
                      label="Organization"
                      value={form.company}
                      onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                    />
                    <FloatingField
                      id="message"
                      label="How can we help?"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                    />
                    <MagneticButton type="submit" variant="primary" className="mt-2 w-full">
                      Send Message
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col gap-6">
              <div className="glass relative min-h-[260px] flex-1 overflow-hidden rounded-3xl">
                {/* Interactive stylized map */}
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
