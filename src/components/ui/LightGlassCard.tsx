import type { ElementType, HTMLAttributes, ReactNode } from 'react'

interface LightGlassCardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
  as?: ElementType
  hover?: boolean
}

/**
 * Light-glass карточка поверх видеофона: сильный blur, тёплый белый фон,
 * тонкий внутренний блик через ::before (.light-glass в src/index.css).
 * Hover (десктоп): подъём -translate-y-0.5 + тень чуть глубже, 300ms.
 */
export function LightGlassCard({
  children,
  className = '',
  as: Tag = 'div',
  hover = false,
  ...rest
}: LightGlassCardProps) {
  return (
    <Tag
      className={`light-glass relative transition-all duration-300 ${
        hover ? 'hover:-translate-y-0.5 hover:shadow-[0_28px_88px_rgba(40,48,80,0.1)]' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
