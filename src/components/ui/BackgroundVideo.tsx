import { useEffect, useRef, useState } from 'react'
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
 *
 * Если система запретила автоплей (iOS в режиме энергосбережения, экономия
 * трафика), тоже откатываемся на постер: заблокированный <video> рисует поверх
 * себя системную кнопку play, которая на декоративном фоне выглядит поломкой.
 * Сигнал блокировки - reject промиса play(); это единственный надёжный способ,
 * заранее (по ширине экрана и т.п.) блокировку определить нельзя.
 */
export function BackgroundVideo({
  src,
  poster,
  className = '',
  reducedMotionFallback = true,
}: BackgroundVideoProps) {
  const reduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)

  const posterOnly = (reduceMotion && reducedMotionFallback) || autoplayBlocked

  useEffect(() => {
    if (posterOnly) return
    const video = videoRef.current
    if (!video) return
    const attempt = video.play()
    if (attempt) attempt.catch(() => setAutoplayBlocked(true))
  }, [posterOnly])

  if (posterOnly) {
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
      ref={videoRef}
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
