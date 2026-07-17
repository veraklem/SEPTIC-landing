import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  /** Анимировать при загрузке (hero), а не при появлении во viewport. */
  immediate?: boolean
  /** Тег-обёртка, когда нужна семантика вне div (например <li> в списке шагов). По умолчанию 'div'. */
  as?: 'div' | 'li'
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Обёртка fade-up: whileInView, viewport={{ once: true, margin: '-80px' }},
 * y: 24→0, opacity 0→1, duration 0.6, easing [0.22, 1, 0.36, 1].
 * См. SPEC.md §1 «Анимации».
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  immediate = false,
  as = 'div',
}: FadeInProps) {
  const reduceMotion = useReducedMotion()

  const initial = { opacity: 0, y: reduceMotion ? 0 : y }
  const animateProps = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' } }
  const transition = { duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: EASE }

  if (as === 'li') {
    return (
      <motion.li className={className} initial={initial} {...animateProps} transition={transition}>
        {children}
      </motion.li>
    )
  }

  return (
    <motion.div className={className} initial={initial} {...animateProps} transition={transition}>
      {children}
    </motion.div>
  )
}
