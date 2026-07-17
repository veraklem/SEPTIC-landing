import type { Marketplace } from '../../content/site'

interface MarketplaceButtonProps {
  marketplace: Marketplace
  /** Мини-вариант для карточек форматов (ProductFormats). */
  size?: 'default' | 'compact'
  className?: string
}

/**
 * Активная кнопка-ссылка (пилюля) на маркетплейс или другой CTA-переход.
 * Внутренние якоря (url начинается с "#") открываются в той же вкладке,
 * внешние ссылки на маркетплейсы - в новой (_blank, noopener). См. SPEC.md §3.
 */
export function MarketplaceButton({ marketplace, size = 'default', className = '' }: MarketplaceButtonProps) {
  const padding = size === 'compact' ? 'px-4 py-2 text-sm' : 'px-6 py-3.5'
  const isInternal = marketplace.url.startsWith('#')

  const base = `inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold transition-all duration-300 ${padding}`

  return (
    <a
      href={marketplace.url}
      {...(isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      className={`${base} border border-sky-100 bg-white text-ink shadow-glass-card hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 ${className}`}
    >
      {marketplace.name}
    </a>
  )
}
