export interface Marketplace {
  id: 'ozon' | 'wildberries' | 'yandex'
  name: string
  url: string
  available: boolean
}

export interface OzonCta {
  label: string
  url: string
}

export interface SiteConfig {
  brand: string
  brandTagline: string
  product: string
  retailBrand: string
  /** Главный активный Ozon-CTA, используется по всему сайту (Hero, #buy, форматы). */
  ozon: OzonCta
  marketplaces: Marketplace[]
  contacts: {
    email: string
    phone: string
    telegram: string
    website: string
  }
  nav: { label: string; href: string }[]
}

export const site: SiteConfig = {
  brand: 'INBIOLAB',
  brandTagline: 'разработано INBIOLAB',
  product: 'ИНБИО-СЕПТ',
  retailBrand: 'INBIOSTORE',
  ozon: {
    label: 'Купить на Ozon',
    url: '#buy', // TODO(client): заменить на финальную ссылку карточки Ozon
  },
  marketplaces: [
    { id: 'ozon', name: 'Ozon', url: '#', available: false }, // TODO(client): финальная ссылка карточки
    { id: 'wildberries', name: 'Wildberries', url: '#', available: false }, // TODO(client)
    { id: 'yandex', name: 'Яндекс Маркет', url: '#', available: false }, // TODO(client)
  ],
  contacts: {
    email: 'info@inbiolab.ru',
    phone: '', // TODO(client)
    telegram: 'https://t.me/inbiolabbot',
    website: 'inbiolab.ru',
  },
  nav: [
    { label: 'Состав', href: '#composition' },
    { label: 'Применение', href: '#usage' },
    { label: 'Форматы', href: '#formats' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Для бизнеса', href: '#b2b' },
  ],
}

export function mailtoHref(subject?: string): string {
  const base = `mailto:${site.contacts.email}`
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base
}
