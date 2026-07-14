import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { navLinks } from '../data/content'
import { MagneticButton } from './ui/MagneticButton'
import { BrandLogo } from './BrandLogo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = navLinks.map((l) => l.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) {
          setActive(`#${id}`)
          break
        }
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/8 bg-charcoal/75 py-3 backdrop-blur-xl'
          : 'bg-transparent py-5',
      )}
    >
      <div className="section-pad container-max flex items-center justify-between">
        <a href="#hero" className="group flex shrink-0 items-center">
          <BrandLogo
            priority
            className="h-10 w-auto rounded-lg shadow-[0_0_24px_rgba(212,175,55,0.18)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-12 md:h-14"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={clsx(
                'relative px-3 py-2 text-sm font-medium transition-colors',
                active === link.href ? 'text-white' : 'text-white/60 hover:text-white',
              )}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton as="a" href="#contact" variant="primary" className="!px-5 !py-2.5 !text-xs">
            Request a Quote
          </MagneticButton>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute inset-x-0 top-full border-b border-white/10 bg-charcoal/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="section-pad flex flex-col gap-1 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <MagneticButton
                as="a"
                href="#contact"
                variant="primary"
                className="mt-3 w-full"
                onClick={() => setOpen(false)}
              >
                Request a Quote
              </MagneticButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
