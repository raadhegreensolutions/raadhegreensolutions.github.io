import { contactInfo, navLinks } from '../data/content'
import { BrandLogo } from './BrandLogo'

export function Footer() {
  return (
    <footer className="relative bg-charcoal">
      <div className="footer-border" />
      <div className="section-pad container-max py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#hero" className="mb-4 inline-flex items-center">
              <BrandLogo className="h-20 w-auto rounded-xl sm:h-24" />
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
              <li>{contactInfo.address}</li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary-light">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="hover:text-primary-light"
                >
                  {contactInfo.phone}
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
