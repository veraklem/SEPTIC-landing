import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

const base =
  'inline-flex items-center justify-center gap-2 rounded-[12px] px-7 py-3.5 font-semibold text-[0.95rem] transition-[color,background-color,border-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grass-300 focus-visible:ring-offset-2 focus-visible:ring-offset-milk active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

// CTA INBIOLAB: главный - зелёный (действие/позитив), вторичный - белый с
// перивинкл-обводкой.
const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-grass-500 to-grass-600 text-white shadow-[0_10px_26px_rgba(0,168,72,0.28)] hover:from-grass-600 hover:to-grass-700',
  secondary:
    'bg-white text-ink border border-sky-200 hover:border-sky-400 hover:bg-sky-50',
}

interface CommonProps {
  variant?: Variant
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

/**
 * Primary / secondary кнопка. Рендерится как <a>, если передан href
 * (переход/якорь), иначе как <button> (действие). См. SPEC.md → раздел 6.
 */
export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonRest } = rest as ButtonAsButton
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
