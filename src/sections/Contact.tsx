import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Mail, Phone } from 'lucide-react'
import { contactInfo, whatsappLink } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'
import clsx from 'clsx'

/** Google Form entries — submissions still land in the same Form responses */
const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSemtorHe1AfbHNxDs7-T7vJ9ugiemUO17nMUOX-atRQui3o1Q/formResponse'

const ENTRIES = {
  name: 'entry.1327881983',
  email: 'entry.329568120',
  organization: 'entry.19303736',
  message: 'entry.1672243354',
} as const

function Field({
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
  const Tag = rows ? 'textarea' : 'input'

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/70">
        {label}
        {required && <span className="text-primary-light"> *</span>}
      </span>
      <Tag
        id={id}
        name={id}
        type={rows ? undefined : type}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          'w-full rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition-all',
          'placeholder:text-white/30 focus:border-primary/60 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(46,125,50,0.2)]',
          rows && 'resize-none',
        )}
        placeholder={label}
      />
    </label>
  )
}

function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center py-10 text-center"
    >
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient"
        animate={{ scale: [0.8, 1.08, 1] }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none">
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
      <h3 className="mt-5 font-heading text-xl font-bold text-white">Message sent</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Thanks for reaching out. We&apos;ll get back to you soon.
      </p>
    </motion.div>
  )
}

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)

    const body = new FormData()
    body.append(ENTRIES.name, form.name)
    body.append(ENTRIES.email, form.email)
    body.append(ENTRIES.organization, form.organization)
    body.append(ENTRIES.message, form.message)

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body,
      })
      setSubmitted(true)
    } catch {
      // Fallback: open prefilled Google Form in a new tab
      const params = new URLSearchParams({
        [ENTRIES.name]: form.name,
        [ENTRIES.email]: form.email,
        [ENTRIES.organization]: form.organization,
        [ENTRIES.message]: form.message,
      })
      window.open(
        `https://docs.google.com/forms/d/e/1FAIpQLSemtorHe1AfbHNxDs7-T7vJ9ugiemUO17nMUOX-atRQui3o1Q/viewform?${params}`,
        '_blank',
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative bg-charcoal py-24 md:py-32">
      <div className="section-pad container-max">
        <SectionHeading
          eyebrow="Contact"
          title="Let's design your circular system"
          description="Tell us about your waste streams, ESG goals, or facility challenges — we'll craft a proposal."
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <Reveal>
            <div className="glass rounded-3xl p-5 md:p-6">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessCheck />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    className="space-y-3.5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <Field
                      id="name"
                      label="Full Name"
                      required
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    />
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    />
                    <Field
                      id="organization"
                      label="Organization"
                      value={form.organization}
                      onChange={(v) => setForm((f) => ({ ...f, organization: v }))}
                    />
                    <Field
                      id="message"
                      label="How can we help?"
                      required
                      rows={3}
                      value={form.message}
                      onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                    />
                    <MagneticButton
                      type="submit"
                      variant="primary"
                      className="mt-1 w-full"
                      disabled={sending}
                    >
                      {sending ? 'Sending…' : 'Submit'}
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-col gap-5">
              <div className="glass relative h-[220px] shrink-0 overflow-hidden rounded-3xl sm:h-[260px] md:h-[280px]">
                <iframe
                  title="Raadhe Green Solutions — Nashik location"
                  src={contactInfo.mapEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  href={contactInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/10 bg-charcoal/80 p-3 backdrop-blur-md transition-colors hover:border-primary/40"
                >
                  <p className="flex items-start gap-2 text-sm text-white/85">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-primary-light" />
                    {contactInfo.address}
                  </p>
                </a>
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
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-3 rounded-2xl p-4 transition-colors hover:border-[#25D366]/50 sm:col-span-2"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.520.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.925 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  <span className="text-sm text-white/80">
                    WhatsApp · {contactInfo.phone}
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
