import { FlaskConical, Leaf, Waves, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../ui/Container'
import { FadeIn } from '../ui/FadeIn'
import { platform } from '../../content/sections'

const CARD_ICONS: LucideIcon[] = [FlaskConical, Leaf, Waves]
const CARD_TINTS = [
  { bg: 'bg-sky-50', ic: 'text-sky-600' },
  { bg: 'bg-grass-50', ic: 'text-grass-600' },
  { bg: 'bg-lilac-50', ic: 'text-lilac-600' },
]

/**
 * «Платформа за продуктом» - полноширинная светлая полоса (мягкий cool-градиент,
 * hairline сверху/снизу) вместо большой скруглённой карточки с тенью: секция
 * читается как часть архитектуры страницы. Справа «консорциум»: 3D-кольцо из
 * цветных сфер (перекличка с лого INBIOLAB) - без масок, рамок и краёв, просто
 * лежит на светлом фоне и медленно вращается. Слева тёмный текст, ниже 3
 * компактные UI-карточки с tinted-иконками (умеренный радиус здесь уместен).
 */
export function TrustBlock() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      aria-labelledby="platform-title"
      className="border-y border-sky-100 bg-gradient-to-br from-white via-sky-50 to-white py-14 md:py-20"
    >
      <Container>
        <FadeIn>
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-lilac-600">
                <span className="h-1.5 w-1.5 rounded-full bg-lilac-500" aria-hidden="true" />
                {platform.kicker}
              </span>
              <h2 id="platform-title" className="mt-3 text-h2 text-ink">
                {platform.title}
              </h2>
              <p className="mt-5 text-ink-soft">{platform.subtitle}</p>
            </div>

            {/* Логотип-консорциум INBIOLAB (прозрачный фон) - просто медленно
                вращается на фоне полосы, без масок, фигур и краёв. */}
            <div className="relative mx-auto w-full max-w-[400px]">
              <motion.img
                src="/images/consortium-ring.webp"
                alt="Логотип INBIOLAB - кольцо-консорциум микроорганизмов"
                width={720}
                height={720}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-contain"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={
                  reduceMotion ? undefined : { duration: 90, repeat: Infinity, ease: 'linear' }
                }
              />
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-3 md:mt-12">
          {platform.cards.map((card, i) => {
            const Icon = CARD_ICONS[i % CARD_ICONS.length]
            const tint = CARD_TINTS[i % CARD_TINTS.length]
            return (
              <FadeIn key={card.title} delay={i * 0.08}>
                <div className="h-full border border-sky-100 bg-white p-6">
                  <span
                    className={`flex h-11 w-11 items-center justify-center ${tint.bg} ${tint.ic}`}
                  >
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-ink">{card.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.text}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
