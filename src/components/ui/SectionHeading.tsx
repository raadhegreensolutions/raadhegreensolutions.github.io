import clsx from 'clsx'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  light?: boolean
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={clsx(
        'mb-12 md:mb-16',
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-left',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={clsx(
            'mb-3 text-xs font-semibold uppercase tracking-[0.22em]',
            light ? 'text-primary' : 'text-primary-light',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          'text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl',
          light ? 'text-forest' : 'text-white',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            'mt-4 text-base leading-relaxed md:text-lg',
            light ? 'text-forest/65' : 'text-muted',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
