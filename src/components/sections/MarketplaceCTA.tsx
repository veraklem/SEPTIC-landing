import { ShoppingBag } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/FadeIn'
import { site } from '../../content/site'
import { marketplaceCta } from '../../content/sections'

/**
 * «Где купить» (#buy) - полноширинная фото-полоса в край вьюпорта: фон
 * работает как архитектура страницы, а не как картинка в скруглённой карточке
 * (прямые углы, без рамки и тени, границы задаёт hairline). Две кнопки ведут
 * на карточки Ozon: флакон 100 мл (primary) и набор 3+1 (secondary). Telegram
 * остаётся текстовой ссылкой для вопросов. WB/Яндекс упомянуты нейтральной
 * строкой.
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
            <Button href={marketplaceCta.ozonUrl} target="_blank" rel="noopener noreferrer" variant="primary">
              <ShoppingBag size={18} strokeWidth={1.8} aria-hidden="true" />
              {marketplaceCta.ozonLabel}
            </Button>
            <Button href={marketplaceCta.setUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
              {marketplaceCta.setLabel}
            </Button>
          </div>

          <p className="mt-6 text-sm text-ink-soft">
            {marketplaceCta.telegramNote}{' '}
            <a
              href={marketplaceCta.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-700 underline-offset-4 hover:underline"
            >
              {marketplaceCta.telegramLabel}
            </a>
          </p>

          {secondaryMarkets && (
            <p className="mt-2 text-sm text-ink-soft">
              {secondaryMarkets}: {marketplaceCta.secondaryNote}
            </p>
          )}
        </FadeIn>
      </Container>
    </section>
  )
}
