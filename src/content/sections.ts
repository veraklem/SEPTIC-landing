// Редактируемый контент секций лендинга. Тексты перенесены дословно из SPEC.md.
// Иконки указаны как имена компонентов lucide-react (см. раздел 1 SPEC - «Иконки»),
// секции-компоненты сами резолвят имя в конкретный <Icon />.

/** Строка заголовка hero: набор слов + тон окраски (для word-by-word reveal). */
export interface HeroHeadlineLine {
  words: string[]
  tone: 'strong' | 'soft'
}

export interface HeroPanelCard {
  icon: string
  title: string
  text: string
}

export interface HeroContent {
  label: string
  productName: string
  /** Заголовок построчно; каждое слово анимируется отдельно (reveal). */
  headlineLines: HeroHeadlineLine[]
  /** Короткая выгода сразу под заголовком. */
  subtitle: string
  /** Развёрнутое описание продукта в нижнем блоке, над CTA. */
  description: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  /**
   * Цельный кадр: флакон уже стоит в водной сцене. Собирать hero из слоёв
   * (плоский фон + вырезка флакона) пробовали - флакон пересжимался и мылил,
   * а на стыках сцены и вырезки лезли вертикальные полосы.
   */
  imageSrc: string
  imageAlt: string
  /**
   * Плашки-факты, летающие вокруг кадра. Только паспортные величины - плашка
   * поверх фото читается как подпись к продукту, поэтому выдумывать сюда
   * маркетинговые формулировки нельзя.
   */
  chips: { text: string }[]
  panels: {
    apply: { title: string; text: string; linkLabel: string; linkHref: string }
    carousel: HeroPanelCard[]
    trust: { label: string; title: string; text: string }
  }
}

export const hero: HeroContent = {
  label: 'Биопрепарат от INBIOLAB',
  productName: 'ИНБИО-СЕПТ',
  headlineLines: [
    { words: ['Живые', 'бактерии'], tone: 'strong' },
    { words: ['для', 'чистой', 'работы'], tone: 'soft' },
    { words: ['септиков', 'и', 'выгребных', 'ям'], tone: 'soft' },
  ],
  subtitle: 'Меньше запаха и откачек благодаря работе живых бактерий.',
  description:
    'ИНБИО-СЕПТ помогает поддерживать микрофлору внутри системы, перерабатывать органику и снижать неприятный запах при регулярном применении.',
  // TODO(client): заменить #buy на финальную ссылку карточки Ozon
  ctaPrimary: { label: 'Купить на Ozon', href: '#buy' },
  ctaSecondary: { label: 'Как применять', href: '#usage' },
  imageSrc: '/images/hero/hero-product-scene.jpg',
  imageAlt:
    'Флакон биопрепарата ИНБИО-СЕПТ 500 мл в чистой водной сцене - живые бактерии для септиков и выгребных ям',
  chips: [{ text: '1×10⁹ КОЕ/мл' }, { text: '500 мл' }, { text: 'Без кислот и щелочей' }],
  panels: {
    apply: {
      title: 'Просто внесите в систему',
      text: 'Вылейте средство в унитаз, раковину или резервуар и смойте водой.',
      linkLabel: 'Инструкция',
      linkHref: '#usage',
    },
    carousel: [
      {
        icon: 'Wind',
        title: 'Меньше запаха',
        text: 'Перерабатывает органику - источник запаха, а не маскирует его отдушкой.',
      },
      {
        icon: 'Recycle',
        title: 'Чистая работа системы',
        text: 'Осадок и жировая корка образуются медленнее, поэтому септик дольше работает без перегрузки.',
      },
      {
        icon: 'Sprout',
        title: 'Живые бактерии',
        text: 'Пополняют полезную микрофлору.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Простой уход',
        text: 'Регулярное применение помогает поддерживать септик в рабочем состоянии.',
      },
    ],
    trust: {
      label: 'Живые микроорганизмы',
      title: 'Работают внутри системы',
      text: 'Полезные бактерии перерабатывают органические отложения и поддерживают микрофлору.',
    },
  },
}

export interface UsageSystemCard {
  icon: string
  title: string
  text: string
}

export const usageSystems: {
  label: string
  title: string
  subtitle: string
  items: UsageSystemCard[]
} = {
  label: 'Применение',
  title: 'Подходит для любой локальной очистной системы',
  subtitle:
    'ИНБИО-СЕПТ можно использовать для септиков, биотуалетов и выгребных ям. Способ внесения зависит от типа системы.',
  items: [
    {
      icon: 'Droplets',
      title: 'Для септика',
      text: 'Вылейте средство в унитаз или раковину и смойте водой.',
    },
    {
      icon: 'Toilet',
      title: 'Для биотуалета',
      text: 'Вылейте концентрат прямо в приёмный резервуар.',
    },
    {
      icon: 'Waves',
      title: 'Для выгребной ямы',
      text: 'Растворите флакон в 10 литрах тёплой воды и влейте в яму.',
    },
  ],
}

export const scenarios: {
  label: string
  title: string
  subtitle: string
  items: { icon: string; title: string; text: string }[]
} = {
  label: 'Когда пригодится',
  title: 'Знакомая ситуация?',
  subtitle:
    'Если что-то из этого про вас - ИНБИО-СЕПТ помогает системе работать стабильнее и меньше напоминать о себе.',
  items: [
    { icon: 'Wind', title: 'Запах в жару', text: 'В тёплую погоду органика бродит активнее, и запах усиливается.' },
    {
      icon: 'Waves',
      title: 'Система быстро наполняется',
      text: 'Осадок копится, откачку необходимо вызывать чаще.',
    },
    {
      icon: 'RefreshCw',
      title: 'Дача после простоя',
      text: 'После зимы или долгого отъезда систему нужно «перезапустить».',
    },
    { icon: 'Users', title: 'Наплыв гостей', text: 'Выходные и праздники - резкая нагрузка на септик.' },
    {
      icon: 'CalendarCheck',
      title: 'Регулярная профилактика',
      text: 'Плановая биоподдержка системы вместо устранения последствий.',
    },
  ],
}

export const composition: {
  label: string
  title: string
  lead: string
  footnote: string
  imageAlt: string
} = {
  label: 'Состав',
  title: 'Живые бактерии, подобранные под задачу',
  lead: 'В основе ИНБИО-СЕПТ - живые полезные бактерии. В зависимости от назначения подбираются разные сообщества микроорганизмов, которые перерабатывают органику и поддерживают микрофлору системы.',
  footnote: 'Точный состав и дозировка указаны на этикетке и в документации продукта.',
  imageAlt:
    'Микроскопные снимки шести родов бактерий в составе ИНБИО-СЕПТ: Rhodopseudomonas, Lactobacillus, Azotobacter, Cellulomonas, Pseudomonas, Bacillus',
}

export interface UsageStep {
  number: number
  title: string
  text: string
}

export interface UsageAfterCard {
  time: string
  text: string
}

export const usageSteps: {
  label: string
  title: string
  subtitle: string
  steps: UsageStep[]
  cesspitNote: string
  afterTitle: string
  afterLead: string
  afterCards: UsageAfterCard[]
} = {
  label: 'Инструкция',
  title: 'Три минуты - и готово',
  subtitle: 'Добавьте ИНБИО-СЕПТ в систему, смойте водой и дайте бактериям время на работу.',
  steps: [
    {
      number: 1,
      title: 'Встряхните флакон',
      text: 'Хорошо встряхните средство перед применением.',
    },
    {
      number: 2,
      title: 'Внесите препарат',
      text: 'Вылейте нужную дозу в унитаз, раковину или резервуар.',
    },
    {
      number: 3,
      title: 'Смойте водой',
      text: 'Вода помогает доставить бактерии в рабочую зону системы.',
    },
    {
      number: 4,
      title: 'Дайте время',
      text: 'Первые изменения обычно заметны через несколько дней.',
    },
  ],
  cesspitNote: 'Для выгребной ямы: растворите флакон в 10 литрах тёплой воды.',
  afterTitle: 'Что происходит после внесения - это нормально',
  afterLead:
    'Первые дни система перестраивается: запах может ненадолго усилиться, а ил - подняться. Это рабочие этапы запуска биопроцесса, а не поломка.',
  afterCards: [
    {
      time: '6-8 часов',
      text: 'Бактерии начинают активироваться. В первые часы лучше снизить интенсивный слив воды.',
    },
    {
      time: '1-3 день',
      text: 'При переработке старых отложений запах может временно усилиться.',
    },
    {
      time: '3-7 день',
      text: 'Пузырьки газа могут поднимать ил и жировую корку наверх.',
    },
    {
      time: '7-14 день',
      text: 'Отложения постепенно разжижаются, корка уменьшается, система работает стабильнее.',
    },
  ],
}

export interface HowMechanismStep {
  number: number
  icon: string
  title: string
  text: string
}

export const howMechanism: {
  kicker: string
  title: string
  subtitle: string
  steps: HowMechanismStep[]
} = {
  kicker: 'Как это работает',
  title: 'Как работает ИНБИО-СЕПТ',
  subtitle: 'Простая биология: полезные бактерии делают свою работу внутри системы.',
  steps: [
    {
      number: 1,
      icon: 'Droplets',
      title: 'Внесение',
      text: 'Вы добавляете препарат в септик, яму или биотуалет вместе с водой.',
    },
    {
      number: 2,
      icon: 'Zap',
      title: 'Активация',
      text: 'Микроорганизмы попадают в систему и начинают работать.',
    },
    {
      number: 3,
      icon: 'Recycle',
      title: 'Переработка',
      text: 'Бактерии перерабатывают органические загрязнения.',
    },
    {
      number: 4,
      icon: 'Wind',
      title: 'Меньше запаха',
      text: 'При регулярном применении запах становится менее выраженным.',
    },
    {
      number: 5,
      icon: 'ShieldCheck',
      title: 'Поддержка',
      text: 'Микрофлора системы поддерживается, работа становится ровнее.',
    },
  ],
}

export const productFormats: { label: string; title: string } = {
  label: 'Форматы',
  title: 'Выберите свой объём',
}

export interface PlatformCard {
  title: string
  text: string
}

export const platform: {
  kicker: string
  title: string
  subtitle: string
  cards: PlatformCard[]
  imageAlt: string
} = {
  kicker: 'INBIOLAB',
  title: 'Платформа за продуктом',
  subtitle:
    'INBIOLAB больше 25 лет работает с микробными консорциумами для сельского хозяйства. ИНБИО-СЕПТ - те же штаммы и та же лаборатория, собранные в бытовой флакон для септика.',
  cards: [
    {
      title: 'Живые культуры',
      text: 'В основе - консорциум живых непатогенных бактерий.',
    },
    {
      title: 'Подбор под задачу',
      text: 'Штаммы подобраны под работу септиков и выгребных ям.',
    },
    {
      title: 'Стабильная работа системы',
      text: 'Регулярная поддержка помогает системе работать ровнее.',
    },
  ],
  imageAlt: 'Полезные микроорганизмы под микроскопом - основа биопрепаратов платформы INBIOLAB',
}

export interface WhyBioRow {
  chemistry: string
  inbiaccept: string
}

export const whyBio: {
  title: string
  lead: string
  columnLabels: { chemistry: string; inbiaccept: string }
  rows: WhyBioRow[]
  disclaimer: string
} = {
  title: 'Почему биопрепарат, а не агрессивная химия',
  lead: 'Средство работает не запахом-маской, а живыми бактериями: они разбираются с самой органикой и поддерживают микрофлору системы.',
  columnLabels: {
    chemistry: 'Агрессивная химия обычно…',
    inbiaccept: 'ИНБИО-СЕПТ…',
  },
  rows: [
    {
      chemistry: 'Маскирует запах отдушкой',
      inbiaccept: 'Помогает перерабатывать причину запаха - органику.',
    },
    {
      chemistry: 'Может подавлять микрофлору, на которой держится септик',
      inbiaccept: 'Пополняет эту микрофлору.',
    },
    {
      chemistry: 'Разовое решение «когда уже случилось»',
      inbiaccept: 'Рассчитан на регулярную поддержку системы.',
    },
    {
      chemistry: 'Содержит кислоты и щёлочи, которые повреждают материалы',
      inbiaccept: 'Не содержит кислот и щелочей - не разъедает пластик, металл и бетон.',
    },
  ],
  disclaimer:
    'Сравнение описывает типичные различия подходов, а не конкретные продукты других производителей.',
}

export const marketplaceCta: {
  title: string
  subtitle: string
  telegramLabel: string
  telegramUrl: string
  ozonStatusLabel: string
  ozonStatusNote: string
  secondaryNote: string
} = {
  title: 'Где купить ИНБИО-СЕПТ',
  subtitle:
    'Чтобы заказать сейчас или узнать первым о старте на Ozon - напишите нам в Telegram. Ответим и оформим.',
  telegramLabel: 'Написать в Telegram',
  telegramUrl: 'https://t.me/Inbiolabbot',
  ozonStatusLabel: 'Ozon',
  ozonStatusNote: 'скоро в продаже',
  secondaryNote: 'подключим по мере старта продаж',
}

export const b2bBlock: {
  label: string
  title: string
  text: string
  points: { icon: string; text: string }[]
  ctaLabel: string
  mailSubject: string
} = {
  label: 'Партнёрам',
  title: 'Опт и сотрудничество',
  text: 'Поставляем ИНБИО-СЕПТ дачным и хозяйственным магазинам, сетям и селлерам маркетплейсов. Отгрузки от коробки, документы для торговли, поддержка по продукту.', // TODO(client): подтвердить условия
  points: [
    { icon: 'Package', text: 'Оптовые отгрузки' },
    { icon: 'FileCheck2', text: 'Документы и сертификаты' },
    { icon: 'Image', text: 'Материалы для витрины' },
  ],
  ctaLabel: 'Написать нам',
  mailSubject: 'Опт ИНБИО-СЕПТ',
}

export const faqSection: { title: string } = {
  title: 'Вопросы и ответы',
}

export const contactSection: {
  title: string
  subtitle: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
} = {
  title: 'Остались вопросы по применению?',
  subtitle:
    'Уточнить дозировку, условия использования или формат покупки можно напрямую - ответим в Telegram или на почту.',
  ctaPrimary: { label: 'Написать в Telegram', href: 'https://t.me/Inbiolabbot' },
  ctaSecondary: { label: 'Купить на Ozon', href: '#buy' },
}
