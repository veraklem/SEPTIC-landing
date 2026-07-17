import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { site } from '../../content/site'

const EASE = [0.22, 1, 0.36, 1] as const

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Navbar: прозрачный сверху → glass при скролле, mobile-бургер со светлой
// выезжающей панелью. См. SPEC.md §4 «Navbar».
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey) {
        if (active === first || !panel.contains(active)) {
          event.preventDefault()
          last.focus()
        }
      } else if (active === last || !panel.contains(active)) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : original
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  // Фокус в панель при открытии, возврат на бургер при закрытии;
  // <main> становится инертным (+ aria-hidden как фолбэк), пока меню открыто.
  useEffect(() => {
    const main = document.querySelector('main')

    if (open) {
      if (main) {
        main.setAttribute('inert', '')
        main.setAttribute('aria-hidden', 'true')
      }
      const panel = panelRef.current
      const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      firstFocusable?.focus()
    } else {
      if (main) {
        main.removeAttribute('inert')
        main.removeAttribute('aria-hidden')
      }
    }

    return () => {
      if (main) {
        main.removeAttribute('inert')
        main.removeAttribute('aria-hidden')
      }
    }
  }, [open])

  function closeMenu() {
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    // Наверху шапка сливается с hero, поэтому её фон повторяет заливку секции
    // (aqua-100). Прозрачный фон здесь не подходит: сквозь него просвечивал бы
    // молочный фон body и над цветной секцией шла бы светлая полоса.
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-white/70 bg-white/70 backdrop-blur-md'
          : 'border-b border-transparent bg-aqua-100'
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        {/* Бренд-локап: продукт ИНБИО-СЕПТ - линейка внутри INBIOLAB. */}
        <div className="flex items-baseline gap-2.5">
          <a href="/" className="text-lg font-extrabold tracking-tight text-ink">
            {site.product}
          </a>
          <a
            href="https://inbiolab.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-xs font-semibold text-lilac-600 transition-colors hover:text-lilac-700 sm:inline"
          >
            by INBIOLAB
          </a>
        </div>

        <nav aria-label="Основная навигация" className="hidden gap-6 lg:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button href="#buy" variant="primary" className="hidden rounded-[12px] px-6 text-sm lg:inline-flex">
          Купить
        </Button>

        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] text-ink transition-colors hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grass-300 focus-visible:ring-offset-2 lg:hidden"
        >
          {open ? <X size={22} strokeWidth={1.8} aria-hidden="true" /> : <Menu size={22} strokeWidth={1.8} aria-hidden="true" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav-backdrop"
            className="fixed inset-0 top-20 z-40 bg-ink/20 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            ref={panelRef}
            id="mobile-nav-panel"
            aria-label="Мобильная навигация"
            className="fixed inset-x-4 top-24 z-40 rounded-[8px] border border-white/80 bg-white/95 p-5 shadow-glass-card-hover backdrop-blur-md lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <ul className="flex flex-col gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-[8px] px-3 py-3 text-base text-ink transition-colors hover:bg-sky-50"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href="#buy" variant="primary" className="mt-3 w-full" onClick={closeMenu}>
              Купить
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
