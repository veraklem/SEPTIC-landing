interface ProductMockupProps {
  /** Путь к реальному фото флакона (из products.ts). */
  src?: string
  alt: string
  /**
   * Явный выбор режима. По умолчанию: 'image', если передан src, иначе
   * 'illustration' - стилизованный CSS/SVG флакон-заглушка. Компонент
   * специально поддерживает оба режима: когда клиент даст чистый рендер,
   * он подставится через products.ts без правки кода. См. SPEC.md §2, §6.
   */
  variant?: 'image' | 'illustration'
  /** true для hero (loading="eager"), иначе изображение лениво подгружается. */
  priority?: boolean
  className?: string
}

export function ProductMockup({ src, alt, variant, priority = false, className = '' }: ProductMockupProps) {
  const mode = variant ?? (src ? 'image' : 'illustration')

  if (mode === 'image' && src) {
    return (
      <img
        src={src}
        alt={alt}
        width={360}
        height={480}
        loading={priority ? 'eager' : 'lazy'}
        className={`h-auto w-full max-w-[360px] object-contain drop-shadow-[0_18px_34px_rgba(40,48,80,0.16)] ${className}`}
      />
    )
  }

  return <IllustrationBottle alt={alt} className={className} />
}

function IllustrationBottle({ alt, className = '' }: { alt: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 240 400"
      role="img"
      aria-label={alt}
      className={`h-auto w-full max-w-[280px] drop-shadow-[0_30px_60px_rgba(40,48,80,0.18)] ${className}`}
    >
      <title>{alt}</title>

      {/* тень под флаконом */}
      <ellipse cx="120" cy="384" rx="62" ry="10" fill="#5B82F5" opacity="0.12" />

      {/* тело флакона - янтарное стекло */}
      <path
        d="M62 140
           C62 110 68 96 84 84
           L84 56
           C84 50 88 46 94 46
           L146 46
           C152 46 156 50 156 56
           L156 84
           C172 96 178 110 178 140
           L178 350
           C178 364 168 374 154 374
           L86 374
           C72 374 62 364 62 350
           Z"
        fill="#9A5A22"
      />
      <path
        d="M62 140 C62 110 68 96 84 84 L84 56 C84 50 88 46 94 46 L146 46 C152 46 156 50 156 56 L156 84 C172 96 178 110 178 140 L178 200 L62 200 Z"
        fill="#B06B2A"
        opacity="0.55"
      />

      {/* крышка - тёмная */}
      <rect x="88" y="20" width="64" height="34" rx="6" fill="#2A1B14" />
      <rect x="88" y="30" width="64" height="4" fill="#3A281E" />
      <rect x="88" y="38" width="64" height="4" fill="#3A281E" />

      {/* этикетка - белая */}
      <rect x="72" y="176" width="96" height="150" rx="14" fill="#FBFAF7" />

      <text
        x="120"
        y="206"
        textAnchor="middle"
        fontFamily="Manrope Variable, Manrope, system-ui, sans-serif"
        fontWeight="800"
        fontSize="17"
        fill="#17262F"
        letterSpacing="0.5"
      >
        INBIOLAB
      </text>

      <text
        x="120"
        y="236"
        textAnchor="middle"
        fontFamily="Manrope Variable, Manrope, system-ui, sans-serif"
        fontWeight="700"
        fontSize="15"
        letterSpacing="0.2"
        fill="#789CFC"
      >
        ИНБИО-СЕПТ
      </text>

      <line x1="88" y1="256" x2="152" y2="256" stroke="#D5EEF5" strokeWidth="1.5" />

      <text
        x="120"
        y="278"
        textAnchor="middle"
        fontFamily="Manrope Variable, Manrope, system-ui, sans-serif"
        fontWeight="500"
        fontSize="9.5"
        fill="#4C6472"
      >
        живые бактерии
      </text>
      <text
        x="120"
        y="294"
        textAnchor="middle"
        fontFamily="Manrope Variable, Manrope, system-ui, sans-serif"
        fontWeight="500"
        fontSize="9.5"
        fill="#4C6472"
      >
        для септиков
      </text>
      <text
        x="120"
        y="309"
        textAnchor="middle"
        fontFamily="Manrope Variable, Manrope, system-ui, sans-serif"
        fontWeight="500"
        fontSize="9.5"
        fill="#4C6472"
      >
        и выгребных ям
      </text>

      {/* блик на стекле */}
      <path d="M70 150 C70 130 76 116 88 106 L92 106 C82 118 78 132 78 150 L78 330 L70 330 Z" fill="#FFFFFF" opacity="0.18" />
    </svg>
  )
}
