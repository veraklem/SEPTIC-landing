interface SectionLabelProps {
  children: string
  className?: string
}

/**
 * Маленький uppercase-лейбл над H2 секции, с точкой-буллетом.
 * См. SPEC.md → «Дизайн-система» → «Типографика».
 */
export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-lilac-600 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-lilac-500" aria-hidden="true" />
      {children}
    </span>
  )
}
