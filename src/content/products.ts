export interface ProductFormat {
  id: string
  comingSoon?: false
  volume: string
  image: string
  imageAlt: string
  title: string
  fitsFor: string
  usage: string
  specs?: string[]
  /** Артикул маркетплейса (подпись в карточке). Если пусто - строка скрывается. */
  sku?: string
  /** Ссылка на карточку Ozon именно этого формата. Если пусто - берётся site.ozon.url. */
  ozonUrl?: string
  /** Подпись статус-бейджа в шапке карточки. По умолчанию «Основной формат». */
  badge?: string
  certificate: string | null
  available: boolean
  /** Формат снят, но ещё не в продаже - карточка рендерится полноценно (с фото),
   * но «упакована как в разработке»: бейдж, приглушённое изображение, note вместо
   * кнопок маркетплейсов. См. ProductFormats.tsx. */
  inDevelopment?: boolean
  /** Короткая подпись под карточкой формата в разработке. */
  note?: string
}

export interface ProductFormatComingSoon {
  id: string
  comingSoon: true
  title: string
  note: string
}

export type ProductFormatEntry = ProductFormat | ProductFormatComingSoon

export const products: ProductFormatEntry[] = [
  {
    id: 'bottle-100',
    volume: '100 мл',
    image: '/images/product-bottle.webp',
    imageAlt: 'Флакон биопрепарата ИНБИО-СЕПТ 100 мл для септиков и выгребных ям',
    title: 'ИНБИО-СЕПТ 100 мл',
    badge: 'Основной формат',
    fitsFor: 'Для септиков, выгребных ям и локальных очистных систем',
    usage: 'Дозировка по объёму системы - на этикетке',
    specs: ['Титр ≥ 1×10⁹ КОЕ/мл', 'Хранение +5…+25 °C, не замораживать', 'Срок годности - 12 месяцев'],
    sku: 'Артикул Ozon: 5736252905',
    ozonUrl: 'https://www.ozon.ru/product/inbio-sept-5736252905/?at=1ral1TfU66uof2hoXoUuIntJWL-jgNks&sh=NCR6OvDmbg',
    certificate: null, // TODO(client): ссылка на сертификат/декларацию
    available: true,
  },
  {
    id: 'set-3plus1',
    volume: '4 × 100 мл',
    image: '/images/product-set-3plus1.webp',
    imageAlt: 'Набор ИНБИО-СЕПТ 3+1: четыре флакона по 100 мл, один в подарок',
    title: 'ИНБИО-СЕПТ набор 3+1',
    badge: 'Выгодный набор',
    fitsFor: 'Запас на сезон: три флакона и один в подарок',
    usage: 'Дозировка по объёму системы - на этикетке',
    specs: ['Титр ≥ 1×10⁹ КОЕ/мл', 'Хранение +5…+25 °C, не замораживать', 'Срок годности - 12 месяцев'],
    sku: 'Артикул Ozon: 5736437050',
    ozonUrl: 'https://www.ozon.ru/product/inbio-sept-5736437050/?at=1ral1SRw6MJAKoetkJX6aaPVSFTWlqG5&sh=NCR6OvDmbg',
    certificate: null, // TODO(client): ссылка на сертификат/декларацию
    available: true,
  },
]
