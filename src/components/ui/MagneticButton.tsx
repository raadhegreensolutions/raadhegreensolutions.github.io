import { useRef, type MouseEvent, type ReactNode, type ButtonHTMLAttributes } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import clsx from 'clsx'

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  as?: 'button' | 'a'
  href?: string
  className?: string
}

export function MagneticButton({
  children,
  variant = 'primary',
  as = 'button',
  href,
  className,
  onClick,
  type = 'button',
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 20 })
  const springY = useSpring(y, { stiffness: 280, damping: 20 })

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.28)
    y.set(dy * 0.28)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const styles = clsx(
    'btn-ripple relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-shadow duration-300',
    variant === 'primary' &&
      'bg-brand-gradient text-white shadow-[var(--shadow-glow)] hover:shadow-[0_0_50px_rgba(46,125,50,0.55)]',
    variant === 'secondary' &&
      'border border-white/25 bg-white/5 text-white backdrop-blur-md hover:border-primary/60 hover:bg-primary/15',
    variant === 'ghost' && 'text-white/90 hover:text-white',
    className,
  )

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    whileTap: { scale: 0.97 },
  }

  if (as === 'a' && href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={styles}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={styles}
      onClick={onClick}
      {...motionProps}
      {...(rest as object)}
    >
      {children}
    </motion.button>
  )
}
