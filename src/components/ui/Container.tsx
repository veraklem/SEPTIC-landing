import type { ElementType, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

/**
 * Стандартный контейнер секции: max-w-[1200px], адаптивные горизонтальные отступы.
 * См. SPEC.md → «Дизайн-система» → «Поверхности».
 */
export function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-[1200px] px-5 md:px-8 ${className}`}>{children}</Tag>
}
