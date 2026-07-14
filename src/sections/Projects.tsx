import { useRef, useState, type PointerEvent } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'
import { useIsMobile } from '../hooks/useMediaQuery'
import clsx from 'clsx'

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [dragging, setDragging] = useState(false)
  const dragState = useRef({ startX: 0, scrollLeft: 0 })

  const onPointerDown = (e: PointerEvent) => {
    if (!trackRef.current) return
    setDragging(true)
    dragState.current = {
      startX: e.clientX,
      scrollLeft: trackRef.current.scrollLeft,
    }
    trackRef.current.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging || !trackRef.current) return
    const dx = e.clientX - dragState.current.startX
    trackRef.current.scrollLeft = dragState.current.scrollLeft - dx
  }

  const endDrag = () => setDragging(false)

  return (
    <section id="projects" className="relative bg-charcoal py-24 md:py-32">
      <div className="section-pad container-max">
        <SectionHeading
          eyebrow="Projects & Case Studies"
          title="Impact delivered on the ground"
          description={
            isMobile
              ? 'Swipe through flagship engagements across India.'
              : 'Drag to explore flagship engagements across India.'
          }
        />
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={clsx(
          'flex gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12 xl:px-20',
          'scrollbar-none snap-x snap-mandatory',
          dragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            className="group relative h-72 w-[85vw] shrink-0 snap-center overflow-hidden rounded-3xl sm:w-[380px] md:h-80 md:w-[420px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: Math.min(i * 0.08, 0.32), duration: 0.6 }}
          >
            <div
              className={clsx(
                'absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110',
                project.gradient,
              )}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_50%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />

            {/* Parallax-like reveal strip */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1/3 bg-white/5 backdrop-blur-[2px]"
              initial={{ x: '40%', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
              <span className="mb-2 w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                {project.tag}
              </span>
              <h3 className="font-heading text-xl font-bold text-white md:text-2xl">
                {project.title}
              </h3>
              <div className="mt-2 flex items-center justify-between text-sm text-white/65">
                <span>{project.location}</span>
                <span className="font-medium text-primary-light">{project.result}</span>
              </div>
            </div>
          </motion.article>
        ))}
        <div className="w-4 shrink-0" aria-hidden />
      </div>
    </section>
  )
}
