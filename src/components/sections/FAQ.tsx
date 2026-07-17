import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Container } from '../ui/Container'
import { FadeIn } from '../ui/FadeIn'
import { faq } from '../../content/faq'
import { faqSection } from '../../content/sections'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * «Вопросы и ответы» (#faq) - доступный аккордеон: button + aria-expanded +
 * aria-controls, первый пункт открыт по умолчанию, плавная анимация высоты,
 * chevron поворачивается. См. SPEC.md §4 «FAQ».
 */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden bg-foam py-10 md:py-14">
      <Container className="relative">
        <FadeIn>
          <h2 id="faq-title" className="text-h2 text-ink">
            {faqSection.title}
          </h2>
        </FadeIn>

        <div className="mt-7 divide-y divide-ink-soft/10 overflow-hidden border border-sky-100 bg-white shadow-glass-card">
          {faq.map((item, i) => {
            const isOpen = openIndex === i
            const buttonId = `faq-trigger-${i}`
            const panelId = `faq-panel-${i}`

            return (
              <FadeIn key={item.question} delay={Math.min(i, 4) * 0.05}>
                <div>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-medium text-ink transition-colors hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 md:px-7"
                    >
                      {item.question}
                      <ChevronDown
                        size={22}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className={`shrink-0 text-sky-500 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-ink-soft md:px-7">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
