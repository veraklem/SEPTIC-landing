import { useReducedMotion } from 'framer-motion'

interface BackgroundVideoProps {
  src: string
  poster: string
  className?: string
  /** При prefers-reduced-motion показывать статичный постер вместо видео. По умолчанию true. */
  reducedMotionFallback?: boolean
}

/**
 * Фоновое зацикленное видео (без звука, без контролов) для декоративных секций.
 * При prefers-reduced-motion, по умолчанию, рендерит статичный постер вместо
 * видео - движение полностью отключается. Без hls.js и внешних зависимостей.
 */
export function BackgroundVideo({
  src,
  poster,
  className = '',
  reducedMotionFallback = true,
}: BackgroundVideoProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion && reducedMotionFallback) {
    return (
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  )
}
