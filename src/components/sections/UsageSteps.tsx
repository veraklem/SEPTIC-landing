import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { usageSteps } from '../../content/sections'

const EASE = [0.22, 1, 0.36, 1] as const

const DESKTOP_VIDEO = '/videos/instruction/drop-desktop.mp4'
const DESKTOP_POSTER = '/posters/instruction/drop-desktop.jpg'
const MOBILE_VIDEO = '/videos/instruction/drop-mobile.mp4'
const MOBILE_POSTER = '/posters/instruction/drop-mobile.jpg'

/** Капля на mobile-кадре смещена в верхнюю половину - держим её там, оставляя
 * низ секции (стек шагов/карточек) на чистом светлом градиенте фона. */
const MOBILE_OBJECT_POSITION: CSSProperties = { objectPosition: '50% 24%' }

/**
 * fade-up + лёгкий blur-in, gentle stagger - локальный аналог паттерна FadeIn
 * (см. FadeIn.tsx), но с blur, как в CtaFooter.tsx. FadeIn.tsx не трогаем
 * (вне границ задачи), поэтому реализация локальная.
 */
function reveal(delay: number, reduceMotion: boolean, y = 22) {
  return {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(6px)' },
    whileInView: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-80px' },
    transition: {
      duration: reduceMotion ? 0 : 0.6,
      delay: reduceMotion ? 0 : delay,
      ease: EASE,
    },
  } as const
}

interface CrossfadeLoopVideoProps {
  src: string
  poster: string
  className: string
  style?: CSSProperties
}

/**
 * Два <video> с одним и тем же src, играющие со сдвигом: когда до конца
 * активного ролика остаётся ~0.55s, второй экземпляр стартует с начала и
 * плавно (opacity, 500ms) выходит поверх - шов петли маскируется кросс-фейдом.
 * Нативный loop включён на обоих экземплярах - подстраховка на случай, если
 * JS-переключение не успеет сработать (не будет краша, просто виден шов).
 */
function CrossfadeLoopVideo({ src, poster, className, style }: CrossfadeLoopVideoProps) {
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const [aOnTop, setAOnTop] = useState(true)

  useEffect(() => {
    const a = videoARef.current
    const b = videoBRef.current
    if (!a || !b) return

    let swapping = false
    let resetTimeout: number | undefined

    function handleTimeUpdate(this: HTMLVideoElement) {
      if (swapping) return
      const duration = this.duration
      if (!Number.isFinite(duration)) return
      if (duration - this.currentTime > 0.55) return

      swapping = true
      const isA = this === a
      const next = isA ? b : a
      if (next) {
        next.currentTime = 0
        void next.play().catch(() => {})
      }
      setAOnTop(!isA)

      resetTimeout = window.setTimeout(() => {
        swapping = false
      }, 700)
    }

    a.addEventListener('timeupdate', handleTimeUpdate)
    b.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      a.removeEventListener('timeupdate', handleTimeUpdate)
      b.removeEventListener('timeupdate', handleTimeUpdate)
      if (resetTimeout !== undefined) window.clearTimeout(resetTimeout)
    }
  }, [src])

  return (
    <>
      <video
        ref={videoARef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={style}
        className={`${className} transition-opacity duration-500 ease-out ${aOnTop ? 'opacity-100' : 'opacity-0'}`}
      />
      <video
        ref={videoBRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={style}
        className={`${className} transition-opacity duration-500 ease-out ${aOnTop ? 'opacity-0' : 'opacity-100'}`}
      />
    </>
  )
}

/**
 * «Инструкция» (#usage): светлый видео-фон (стеклянная капля, кросс-фейд
 * петли) + light-glass карточки поверх - 4 шага, чип про выгребную яму и
 * компактный подблок «Что происходит после внесения». Формы острые по всему
 * блоку (radius 4/6px). См. SPEC.md §4.
 */
export function UsageSteps() {
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <section id="usage" aria-labelledby="usage-title" className="relative overflow-hidden bg-milk py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {reduceMotion ? (
          <>
            <img
              src={DESKTOP_POSTER}
              alt=""
              className="absolute inset-0 hidden h-full w-full object-cover lg:block"
            />
            <img
              src={MOBILE_POSTER}
              alt=""
              className="absolute inset-0 h-full w-full object-cover lg:hidden"
              style={MOBILE_OBJECT_POSITION}
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 hidden lg:block">
              <CrossfadeLoopVideo
                src={DESKTOP_VIDEO}
                poster={DESKTOP_POSTER}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 lg:hidden">
              <CrossfadeLoopVideo
                src={MOBILE_VIDEO}
                poster={MOBILE_POSTER}
                className="absolute inset-0 h-full w-full object-cover"
                style={MOBILE_OBJECT_POSITION}
              />
            </div>
          </>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(245,249,255,0.72) 0%, rgba(234,240,254,0.55) 45%, rgba(245,249,255,0.78) 100%)',
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div {...reveal(0, reduceMotion)}>
          <SectionLabel>{usageSteps.label}</SectionLabel>
          <h2 id="usage-title" className="mt-3 text-h1 text-ink">
            {usageSteps.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">{usageSteps.subtitle}</p>
        </motion.div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <ol className="grid gap-4">
              {usageSteps.steps.map((step, i) => (
                <motion.li
                  key={step.number}
                  {...reveal(0.08 + i * 0.07, reduceMotion)}
                  className="flex gap-5 rounded-[8px] border border-white/70 bg-white/60 p-4 backdrop-blur-md md:p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-sky-600 text-lg font-bold text-white">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{step.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <motion.p
              {...reveal(0.4, reduceMotion)}
              className="mt-6 inline-flex items-center gap-3 rounded-[8px] border border-grass-100 bg-grass-50/90 px-5 py-3.5 text-sm text-ink-soft"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-grass-500" aria-hidden="true" />
              {usageSteps.cesspitNote}
            </motion.p>
          </div>

          <motion.div
            {...reveal(0.22, reduceMotion)}
            className="rounded-[8px] border border-white/70 bg-white/65 p-6 backdrop-blur-md md:p-7"
          >
            <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-ink-soft">
              {usageSteps.afterTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{usageSteps.afterLead}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {usageSteps.afterCards.map((card, i) => (
                <motion.div
                  key={card.time}
                  {...reveal(0.32 + i * 0.06, reduceMotion)}
                  className="rounded-[8px] border border-sky-100 bg-white/80 p-4"
                >
                  <p className="text-base font-bold text-sky-700">{card.time}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{card.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
