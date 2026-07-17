import type { ElementType, HTMLAttributes, ReactNode } from 'react'

interface SoftGlassCardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
  as?: ElementType
  hover?: boolean
}

/**
 * Light-glass карточка. См. SPEC.md → «Дизайн-система» → «Поверхности».
 * bg-white/65 backdrop-blur-md border border-white/80 + мягкая тень.
 * hover: подъём -translate-y-1 + тень чуть глубже.
 * Углы прямые: это крупная структурная поверхность, а не мелкий UI-элемент -
 * скругление возвращало бы страницу к виду «набор одинаковых карточек».
 */
export function SoftGlassCard({
  children,
  className = '',
  as: Tag = 'div',
  hover = true,
  ...rest
}: SoftGlassCardProps) {
  return (
    <Tag
      className={`border border-white/80 bg-white/65 shadow-glass-card backdrop-blur-md transition-[transform,box-shadow] duration-300 ${
        hover ? 'hover:-translate-y-1 hover:shadow-glass-card-hover' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
