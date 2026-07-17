import { Send } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/FadeIn'
import { site } from '../../content/site'
import { marketplaceCta } from '../../content/sections'

/**
 * «Где купить» (#buy) - полноширинная фото-полоса в край вьюпорта: фон
 * работает как архитектура страницы, а не как картинка в скруглённой карточке
 * (прямые углы, без рамки и тени, границы задаёт hairline). Ссылок на карточку
 * Ozon пока нет, поэтому главная РАБОЧАЯ кнопка - «Написать в Telegram»
 * (реальный next step прямо сейчас). «Ozon» показан рядом как обозначение
 * канала со статусом «канал открывается» - без фейкового перехода в никуда.
 * WB/Яндекс упомянуты нейтральной строкой.
 */
export function MarketplaceCTA() {
  const secondaryMarkets = site.marketplaces
    .filter((mp) => mp.id !== 'ozon')
    .map((mp) => mp.name)
    .join(' и ')

  return (
    <section
      id="buy"
      aria-labelledby="buy-title"
      className="relative overflow-hidden border-y border-sky-100 bg-milk"
    >
      <img
        src="/images/backgrounds/buy-bg.webp"
        alt=""
        aria-hidden="true"
        width={1800}
        height={1013}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '50% 30%' }}
      />
      {/* Световая подложка вместо карточки: кадр держит светлую дымку в центре,
          где лежит текст, и отпускает пейзаж к краям полосы. Тёмный текст
          читается за счёт света, а не за счёт плашки под ним. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(245,249,255,0.58) 0%, rgba(245,249,255,0.82) 46%, rgba(245,249,255,0.82) 58%, rgba(245,249,255,0.58) 100%)',
        }}
      />

      <Container className="relative z-10 py-20 text-center md:py-28">
        <FadeIn>
          <h2 id="buy-title" className="mx-auto max-w-xl text-h2 text-ink">
            {marketplaceCta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-soft">{marketplaceCta.subtitle}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={marketplaceCta.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              <Send size={18} strokeWidth={1.8} aria-hidden="true" />
              {marketplaceCta.telegramLabel}
            </Button>

            {/* TODO: заменить на кнопку с финальной ссылкой карточки Ozon, когда продажи откроются */}
            <span className="inline-flex items-center gap-2 rounded-[12px] border border-sky-600/30 bg-white/80 px-6 py-3.5 text-[0.95rem] font-semibold text-sky-700 backdrop-blur-sm">
              {marketplaceCta.ozonStatusLabel}
              <span className="font-normal text-ink-soft">- {marketplaceCta.ozonStatusNote}</span>
            </span>
          </div>

          {secondaryMarkets && (
            <p className="mt-6 text-sm text-ink-soft">
              {secondaryMarkets}: {marketplaceCta.secondaryNote}
            </p>
          )}
        </FadeIn>
      </Container>
    </section>
  )
}
