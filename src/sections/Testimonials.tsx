import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5500)
    return () => window.clearInterval(id)
  }, [])

  const t = testimonials[index]!

  return (
    <section id="testimonials" className="relative bg-offwhite py-24 md:py-32">
      <div className="section-pad container-max">
        <SectionHeading
          light
          eyebrow="Testimonials"
          title="Trusted by sustainability leaders"
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-primary/20">
            <Quote size={64} />
          </div>

          <div className="relative min-h-[220px] overflow-hidden rounded-3xl border border-forest/8 bg-white px-8 py-12 shadow-[0_24px_80px_rgba(15,43,24,0.07)] md:px-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="font-heading text-xl font-medium leading-relaxed text-forest md:text-2xl">
                  “{t.quote}”
                </p>
                <div className="mt-8">
                  <p className="text-sm font-semibold text-forest">{t.name}</p>
                  <p className="mt-1 text-sm text-forest/50">{t.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-primary' : 'w-2 bg-forest/20 hover:bg-forest/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
