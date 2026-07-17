import { Send } from 'lucide-react'

/**
 * Sticky mobile CTA - тонкая фиксированная панель внизу экрана с единственной
 * рабочей кнопкой «Написать в Telegram» (реальный next step, т.к. ссылок на
 * Ozon пока нет). Видна только на мобильных/планшетах (lg:hidden), z-index
 * ниже Navbar/мобильного меню и ниже модалок (z-[100]). Без анимации - не
 * нужен prefers-reduced-motion спецкейс. Нижний зазор под ней добавлен в
 * CtaFooter (pb), чтобы панель не перекрывала футер.
 */
export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sky-100 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <a
        href="https://t.me/Inbiolabbot"
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-gradient-to-b from-grass-500 to-grass-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(0,168,72,0.28)] transition-colors duration-300 hover:from-grass-600 hover:to-grass-700 active:scale-[0.98]"
      >
        <Send size={18} strokeWidth={1.8} aria-hidden="true" />
        Написать в Telegram
      </a>
    </div>
  )
}
