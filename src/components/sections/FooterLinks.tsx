const YEAR = new Date().getFullYear()

const LINKS = [
  { label: 'inbiolab.ru', href: 'https://inbiolab.ru', external: true },
  { label: '@Inbiolabbot', href: 'https://t.me/Inbiolabbot', external: true },
  { label: 'Применение', href: '#usage', external: false },
  { label: 'Как работает', href: '#how', external: false },
  { label: 'FAQ', href: '#faq', external: false },
  { label: 'Контакты', href: '#contact', external: false },
]

interface FooterLinksProps {
  onOpenPrivacy: () => void
  onOpenTerms: () => void
  onOpenLaw: () => void
}

/**
 * Минимальный светлый footer-блок (не тёмный) в виде стеклянной полосы
 * поверх фонового изображения. Слева бренд-строка, справа навигация.
 * Нижняя строка - копирайт с динамическим годом + ссылки на политику
 * конфиденциальности, пользовательское соглашение и правовую информацию
 * (открывают PrivacyPolicyModal/TermsModal/LawModal, состояние в CtaFooter).
 * Рендерится как <footer> внутри секции CtaFooter.
 */
export function FooterLinks({ onOpenPrivacy, onOpenTerms, onOpenLaw }: FooterLinksProps) {
  return (
    <footer className="light-glass relative mt-8 px-6 py-8 md:px-10">
      <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <p className="text-sm font-semibold text-ink">
          <span className="mr-1.5 inline-block h-1 w-1 rounded-full bg-lilac-500 align-middle" aria-hidden="true" />
          INBIOSTORE{' '}
          <span className="mx-1 font-normal text-ink-soft">
            - потребительская линейка{' '}
            <a
              href="https://inbiolab.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink-soft transition-colors hover:text-sky-600"
            >
              INBIOLAB
            </a>
          </span>
        </p>

        <nav aria-label="Навигация по сайту">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block py-2 transition-colors hover:text-sky-600"
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
        <p className="text-xs text-ink-soft">© {YEAR} INBIOLAB. Все права защищены.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-xs font-semibold text-ink-soft underline-offset-4 transition-colors hover:text-sky-600 hover:underline"
          >
            Политика конфиденциальности
          </button>
          <button
            type="button"
            onClick={onOpenTerms}
            className="text-xs font-semibold text-ink-soft underline-offset-4 transition-colors hover:text-sky-600 hover:underline"
          >
            Пользовательское соглашение
          </button>
          <button
            type="button"
            onClick={onOpenLaw}
            className="text-xs font-semibold text-ink-soft underline-offset-4 transition-colors hover:text-sky-600 hover:underline"
          >
            Правовая информация
          </button>
        </div>
      </div>
    </footer>
  )
}
