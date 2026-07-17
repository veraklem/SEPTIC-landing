import { useState } from 'react'
import { ArrowRight, Mail, MessageCircle, Send } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { LightGlassCard } from '../ui/LightGlassCard'
import { FooterLinks } from './FooterLinks'
import { PrivacyPolicyModal } from '../PrivacyPolicyModal'
import { TermsModal } from '../TermsModal'
import { LawModal } from '../LawModal'
import { mailtoHref } from '../../content/site'
import { contactSection } from '../../content/sections'

const EASE = [0.22, 1, 0.36, 1] as const

const DIRECT_CHANNELS = [
  {
    icon: Send,
    label: 'Написать в Telegram',
    href: 'https://t.me/Inbiolabbot',
    external: true,
  },
  {
    icon: Mail,
    label: 'Написать на почту',
    href: mailtoHref(),
    external: false,
  },
  {
    icon: MessageCircle,
    label: 'Telegram-канал',
    href: 'https://t.me/inbiolab',
    external: true,
  },
]

/**
 * Финальный блок: CTA + панель прямых контактов на фоновом изображении
 * (водяной цветок) + светлый footer. Заменяет FinalCTA и Footer. Формы
 * обратной связи на сайте нет - переход по ссылкам ведёт во внешние
 * каналы (Telegram, почта) и не создаёт обработки персональных данных
 * на стороне сайта.
 */
export function CtaFooter() {
  const reduceMotion = useReducedMotion()
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [lawOpen, setLawOpen] = useState(false)

  const cardTransition = (delay: number, duration = 0.6) => ({
    initial: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 24, filter: 'blur(8px)' },
    whileInView: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: EASE },
  })

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-milk pb-28 pt-10 lg:pb-20 lg:pt-14"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/water-flower-bg.webp"
          alt=""
          aria-hidden="true"
          width={2000}
          height={1116}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(245,249,255,0.18) 45%, rgba(255,255,255,0.6) 100%)',
          }}
        />
      </div>

      <Container className="relative">
        <motion.div {...cardTransition(0, 0.7)}>
          <LightGlassCard className="grid gap-10 p-8 md:grid-cols-2 md:gap-14 md:p-12">
            <div className="flex flex-col justify-center text-center md:text-left">
              <motion.h2
                id="contact-title"
                className="text-h2 text-ink"
                {...cardTransition(0.08)}
              >
                {contactSection.title}
              </motion.h2>

              <motion.p className="mt-3 max-w-md text-ink-soft md:mx-0" {...cardTransition(0.12)}>
                {contactSection.subtitle}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-start"
                {...cardTransition(0.15)}
              >
                <Button
                  href={contactSection.ctaSecondary.href}
                  variant="primary"
                  className="group w-full sm:w-auto"
                >
                  {contactSection.ctaSecondary.label}
                  <ArrowRight
                    size={18}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </motion.div>
            </div>

            <motion.div
              {...cardTransition(0.25)}
              className="flex flex-col justify-center gap-5 border border-sky-100 bg-white/70 p-6 md:p-8"
            >
              <div>
                <h3 className="text-lg font-semibold text-ink">Прямая связь</h3>
                <p className="mt-1.5 text-sm text-ink-soft">
                  Напишите нам напрямую - ответим в Telegram или на почту.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {DIRECT_CHANNELS.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex items-center gap-3 rounded-[12px] border border-sky-100 bg-white px-5 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-sky-300 hover:bg-sky-50"
                  >
                    <channel.icon size={18} strokeWidth={1.5} className="shrink-0 text-sky-600" aria-hidden="true" />
                    {channel.label}
                  </a>
                ))}
              </div>

              <p className="text-xs text-ink-soft">
                Переход по ссылке открывает внешний канал (Telegram, почту) и не создаёт обработки персональных
                данных на нашей стороне.
              </p>
            </motion.div>
          </LightGlassCard>
        </motion.div>

        <FooterLinks
          onOpenPrivacy={() => setPrivacyOpen(true)}
          onOpenTerms={() => setTermsOpen(true)}
          onOpenLaw={() => setLawOpen(true)}
        />
      </Container>

      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
      <LawModal open={lawOpen} onClose={() => setLawOpen(false)} />
    </section>
  )
}
