import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { privacy } from '../content/privacy'

interface PrivacyPolicyModalProps {
  open: boolean
  onClose: () => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Доступная модалка с текстом политики конфиденциальности (см. src/content/privacy.ts).
 * a11y: role="dialog" + aria-modal, Escape закрывает, клик по подложке закрывает,
 * фокус уходит на кнопку закрытия при открытии и возвращается на вызвавший элемент
 * при закрытии, body overflow заблокирован пока открыта, фокус-трап через Tab.
 */
export function PrivacyPolicyModal({ open, onClose }: PrivacyPolicyModalProps) {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const titleId = 'privacy-policy-title'

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const node = dialogRef.current
      if (!node) return

      const focusable = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null,
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey) {
        if (active === first || !node.contains(active)) {
          event.preventDefault()
          last.focus()
        }
      } else if (active === last || !node.contains(active)) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
      previouslyFocused.current?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-[8px] border border-white/80 bg-milk shadow-glass-card-hover"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-sky-100 px-6 py-5 md:px-8">
              <div>
                <h2 id={titleId} className="text-xl font-bold text-ink md:text-2xl">
                  {privacy.title}
                </h2>
                <p className="mt-1 text-xs text-ink-soft">Обновлено: {privacy.updatedAt}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Закрыть политику конфиденциальности"
                className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[8px] text-ink-soft transition-colors hover:bg-sky-50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
              >
                <X size={20} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 md:px-8">
              <p className="text-sm text-ink-soft">{privacy.intro}</p>

              <div className="mt-6 flex flex-col gap-6">
                {privacy.sections.map((section) => (
                  <section key={section.heading}>
                    <h3 className="text-base font-semibold text-ink">{section.heading}</h3>
                    <div className="mt-2 flex flex-col gap-2">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-relaxed text-ink-soft">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
