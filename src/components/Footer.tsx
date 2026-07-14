import { Leaf } from 'lucide-react'
import { navLinks } from '../data/content'

export function Footer() {
  return (
    <footer className="relative bg-charcoal">
      <div className="footer-border" />
      <div className="section-pad container-max py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#hero" className="mb-4 inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient">
                <Leaf className="h-4 w-4 text-white" />
              </span>
              <span className="font-heading text-base font-bold text-white">
                Raadhe Green Solutions
              </span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Transforming waste into sustainable value through integrated
              environmental management, material recovery, and ESG strategy.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Navigate
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-primary-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Company
            </p>
            <ul className="space-y-2 text-sm text-white/65">
              <li>Raadhe Green Solutions Pvt. Ltd.</li>
              <li>Ahmedabad, Gujarat</li>
              <li>
                <a href="mailto:hello@raadhegreensolutions.com" className="hover:text-primary-light">
                  hello@raadhegreensolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/8 pt-6 text-xs text-white/35 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Raadhe Green Solutions Pvt. Ltd. All rights reserved.</p>
          <p>Environmental · Circular · Sustainable</p>
        </div>
      </div>
    </footer>
  )
}
