import { CalendarCheck, RefreshCw, Users, Waves, Wind, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { BackgroundVideo } from '../ui/BackgroundVideo'
import { scenarios } from '../../content/sections'

const EASE = [0.22, 1, 0.36, 1] as const

const ICONS: Record<string, LucideIcon> = { Wind, Waves, RefreshCw, Users, CalendarCheck }

// Бренд-трио для tinted icon-бейджей сценариев (по кругу).
const TINTS = [
  { bg: 'bg-sky-50', ic: 'text-sky-600' },
  { bg: 'bg-grass-50', ic: 'text-grass-600' },
  { bg: 'bg-lilac-50', ic: 'text-lilac-600' },
]

/**
 * «Когда пригодится» (#when) - блок узнавания («боль») поверх анимированного
 * loop-видео с движущимися бактериями/молекулами. Видео - полноширинная полоса
 * в край вьюпорта (прямые углы, без рамки и тени): фон секции, а не картинка в
 * карточке. Границы полосы задают hairline сверху/снизу. Поверх - заголовок
 * «Знакомая ситуация?» и список ситуаций во frosted-плашках (это UI поверх
 * фона, поэтому умеренный радиус здесь оправдан).
 */
export function Scenarios() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="when"
      aria-labelledby="when-title"
      className="relative overflow-hidden border-y border-sky-100 bg-milk py-14 md:py-20"
    >
      {/* Анимированный фон: движущиеся бактерии/молекулы + светлые overlay. */}
      <div className="absolute inset-0" aria-hidden="true">
        <BackgroundVideo
          src="/videos/molecules-loop.mp4"
          poster="/posters/molecules-loop.jpg"
          className="scale-[1.12] origin-top-left"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.74) 0%, rgba(245,249,255,0.58) 42%, rgba(255,255,255,0.84) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 22% 18%, rgba(255,255,255,0.85), transparent 45%)',
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
        >
          <SectionLabel>{scenarios.label}</SectionLabel>
          <h2 id="when-title" className="mt-3 text-h2 text-ink">
            {scenarios.title}
          </h2>
          <p className="mt-3 text-lg text-ink-soft">{scenarios.subtitle}</p>
        </motion.div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
          {scenarios.items.map((item, i) => {
            const Icon = ICONS[item.icon]
            const tint = TINTS[i % TINTS.length]
            return (
              <motion.li
                key={item.title}
                className="flex items-start gap-4 rounded-[8px] border border-white/70 bg-white/80 p-4 backdrop-blur-sm md:p-5"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.06 * i, ease: EASE }}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] ${tint.bg} ${tint.ic}`}
                >
                  {Icon && <Icon size={22} strokeWidth={1.7} aria-hidden="true" />}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
