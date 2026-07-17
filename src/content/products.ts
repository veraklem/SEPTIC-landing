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
  /** Артикул маркетплейса. Пока не присвоен - строка в карточке скрывается. */
  sku?: string
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
    id: 'bottle-500',
    volume: '500 мл',
    image: '/images/product-bottle.webp', // TODO(client): заменить на рендер ИНБИО-СЕПТ
    imageAlt: 'Флакон биопрепарата ИНБИО-СЕПТ для септиков и выгребных ям',
    title: 'ИНБИО-СЕПТ 500 мл',
    fitsFor: 'Для септиков, выгребных ям и локальных очистных систем',
    usage: 'Дозировка по объёму системы - на этикетке',
    specs: ['Титр ≥ 1×10⁹ КОЕ/мл', 'Хранение +5…+25 °C, не замораживать', 'Срок годности - 12 месяцев'],
    // TODO(client): добавить артикул маркетплейса (sku) при старте продаж
    certificate: null, // TODO(client): ссылка на сертификат/декларацию
    available: false,
  },
  {
    id: 'canister-1l',
    volume: '1 л',
    image: '/images/product-canister-1l.webp',
    imageAlt: 'Канистра биопрепарата ИНБИО-СЕПТ 1 литр - формат в разработке',
    title: 'ИНБИО-СЕПТ 1 л',
    fitsFor: 'Для больших септиков, ЛОС и интенсивной нагрузки',
    usage: 'Дозировка по объёму системы - будет указана на этикетке',
    // TODO(client): добавить артикул маркетплейса (sku) при старте продаж
    certificate: null, // TODO(client): ссылка на сертификат/декларацию
    available: false,
    inDevelopment: true,
    note: 'Готовим формат к выпуску: он появится здесь и на маркетплейсах.',
  },
]
