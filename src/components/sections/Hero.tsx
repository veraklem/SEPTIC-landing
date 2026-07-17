import { Fragment, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarCheck, Recycle, Sprout, Wind, type LucideIcon } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'
import { hero } from '../../content/sections'

const EASE = [0.16, 1, 0.3, 1] as const

const PANEL_ICONS: Record<string, LucideIcon> = {
  Wind,
  Recycle,
  Sprout,
  CalendarCheck,
}

/**
 * Hero: слева заголовок с word-by-word reveal + подзаголовок + CTA, справа -
 * цельный кадр водной сцены с флаконом. Вся сцена залита нежно-голубым
 * (aqua-100) - цветное поле держит и текст, и фото, поэтому отдельная плашка
 * под фото не нужна. Ниже - лента из трёх панелей, приваренная к сцене.
 *
 * Именно aqua, а не sky: sky в этом проекте - бренд-перивинкл (#789CFC), и
 * даже светлые его ступени читаются лиловыми. Голубое поле выбрано под кадр:
 * сама сцена сине-белая (вода, стекло, блики), поэтому её края уходят в фон
 * почти незаметно; на лиловом фото читалось наклеенным прямоугольником.
 *
 * Кадр намеренно цельный. Вариант со слоями (широкий фон + вырезка флакона
 * сверху) отклонён: флакон 675x900 на 2x-экране растягивался выше исходного
 * разрешения и мылил, а на границах контента сцены за вырезкой проступали
 * вертикальные полосы. Один кадр - ни стыков, ни пересжатия.
 *
 * Фото показано целиком (object-contain), без обреза. Это ещё и вопрос
 * резкости: исходник 1000x1249, а при object-cover он растягивался на всю
 * ширину бокса (~662 CSS-px = 1324px на 2x-экране) - выше собственного
 * разрешения, отсюда мыло. Вписанный кадр выводится уже, чем исходник, и
 * остаётся чётким.
 *
 * Текст распределён по всей высоте сцены (justify-between), а не собран в
 * центре: фото держит колонку во всю высоту, и центрированный блок оставлял
 * пустые поля сверху и снизу.
 *
 * Глобальная навигация живёт в отдельном <Navbar>, здесь не дублируется.
 */
export function Hero() {
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-aqua-100 pt-10 md:pt-14"
    >
      {/* Сцена: текст держится сетки контейнера, фото уходит в край экрана. */}
      <div className="relative">
        <Container className="relative z-10 flex items-stretch lg:min-h-[660px]">
          {/* 56%, а не 54%: на 54% строке «для чистой работы» не хватало 4px до
              полной ширины и она рвалась на две. Правый край колонки заходит на
              ~20px в бокс фото, но там кадр уже растворён маской - стыка нет. */}
          <div className="flex w-full flex-col justify-between gap-10 py-2 lg:max-w-[56%] lg:py-10">
            <div>
              <Reveal reduceMotion={reduceMotion} delay={0.15}>
                <SectionLabel>{hero.label}</SectionLabel>
              </Reveal>

              <HeadlineReveal reduceMotion={reduceMotion} />

              {/* Подзаголовок стоит сразу под заголовком, а не в нижнем блоке
                  у кнопок: это продолжение мысли заголовка (выгода), а не
                  подпись к CTA. Заодно съедает пустоту в середине колонки.
                  Задержки 0.9/1.0 - после старта последнего слова заголовка
                  (7 слов, последнее уходит на 0.3 + 6x0.1 = 0.9s). */}
              <Reveal reduceMotion={reduceMotion} delay={0.9}>
                <p className="mt-6 max-w-lg text-xl leading-relaxed text-ink-soft">
                  {hero.subtitle}
                </p>
              </Reveal>
            </div>

            <div>
              {/* Развёрнутое описание вернулось в нижний блок, к CTA: сверху -
                  короткая выгода, снизу - что это за продукт, и сразу кнопки. */}
              <Reveal reduceMotion={reduceMotion} delay={1.0}>
                <p className="max-w-lg text-lg leading-relaxed text-ink-soft">
                  {hero.description}
                </p>
              </Reveal>

              <Reveal reduceMotion={reduceMotion} delay={1.1}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {/* TODO: заменить на финальную ссылку карточки Ozon */}
                  <Button href={hero.ctaPrimary.href} variant="primary" className="w-full sm:w-auto">
                    {hero.ctaPrimary.label}
                  </Button>
                  <Button href={hero.ctaSecondary.href} variant="secondary" className="w-full sm:w-auto">
                    {hero.ctaSecondary.label}
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>

        {/* Фото: цельный кадр со сценой и флаконом - без слоёв, поэтому нет ни
            стыков, ни пересжатия. Показан целиком (object-contain), без обреза.
            Правый край кадра выровнен по контейнеру - тем же выражением, что и
            текст ленты, - поэтому фото стоит на сетке, а не висит с произвольным
            зазором.

            Края кадра растворены маской-эллипсом: у сцены свой светлый фон, и
            без маски она читалась наклеенным прямоугольником поверх поля. Маска
            гасит только периферию (вода и блики по углам) - флакон в центре и
            его тень остаются нетронутыми. */}
        <motion.div
          className="relative mt-10 h-[62vh] max-h-[540px] w-full lg:absolute lg:bottom-0 lg:right-[max(2rem,calc((100vw-1200px)/2+2rem))] lg:top-0 lg:mt-0 lg:h-auto lg:max-h-none lg:w-[min(520px,42vw)] lg:max-w-none"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.25, ease: EASE }}
        >
          <img
            src={hero.imageSrc}
            alt={hero.imageAlt}
            width={1000}
            height={1249}
            loading="eager"
            className="relative h-full w-full object-contain object-bottom"
            // closest-side, а не проценты: радиус эллипса тогда равен половине
            // бокса, и затухание заканчивается ровно на краях кадра. С
            // процентами (74%) эллипс выходил далеко за бокс, на краях
            // оставалось ~85% непрозрачности - прямоугольник никуда не девался.
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse closest-side at 50% 50%, #000 66%, rgba(0,0,0,0) 100%)',
              maskImage:
                'radial-gradient(ellipse closest-side at 50% 50%, #000 66%, rgba(0,0,0,0) 100%)',
            }}
          />

          <HeroChips reduceMotion={reduceMotion} />
        </motion.div>
      </div>

      {/* Нижняя лента: применение / карусель сценариев / доверие. Идёт в край
          вьюпорта и приварена к сцене без зазора - хвост hero, а не отдельный
          ряд карточек. Рамок по внешнему контуру нет: каждая ячейка рисует
          только верхнюю линию (верх ленты и швы в стопке на mobile) и левую на
          md+ (швы в ряду) - нигде не удваивается. Низ ленты закрывает верхняя
          рамка следующей секции. */}
      <div className="relative">
        <div className="grid md:grid-cols-3 lg:grid-cols-[1.6fr_1.15fr_1.6fr]">
          <PanelFadeUp reduceMotion={reduceMotion} delay={0.9}>
            <ApplyPanel />
          </PanelFadeUp>
          <PanelFadeUp reduceMotion={reduceMotion} delay={1.0}>
            <CarouselPanel reduceMotion={reduceMotion} />
          </PanelFadeUp>
          <PanelFadeUp reduceMotion={reduceMotion} delay={1.1}>
            <TrustPanel />
          </PanelFadeUp>
        </div>
      </div>
    </section>
  )
}

/**
 * Плашки-факты вокруг кадра. Держатся за бокс фото, а не за сцену: так они
 * остаются рядом с флаконом на любой ширине.
 *
 * Позиции заданы поштучно: плашки должны попадать на пустые места сцены (вода
 * и фон), а не на этикетку флакона, и при этом не заходить в текстовую колонку
 * слева - заголовок набран крупно и доходит почти до кадра. Поэтому это не
 * сетка, а ручная расстановка. Скрыты до lg: на узком экране им негде
 * разойтись, и они лезут на флакон.
 */
const CHIP_POSITIONS = ['right-[6%] top-[20%]', 'left-[8%] top-[46%]', 'right-[-2%] bottom-[24%]']

function HeroChips({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {hero.chips.map((chip, i) => (
        <motion.span
          key={chip.text}
          className={`absolute ${CHIP_POSITIONS[i]} whitespace-nowrap border border-white/70 bg-white/70 px-4 py-2.5 text-[0.8rem] font-semibold text-ink shadow-glass-card backdrop-blur-md`}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={
            reduceMotion
              ? { opacity: 1 }
              : // Медленный разнофазный дрейф: плашки «летают», но амплитуда
                // маленькая - на первом экране крупное движение отвлекало бы
                // от заголовка.
                { opacity: 1, y: [0, -7, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.6, delay: 0.9 + i * 0.12, ease: EASE },
                  y: {
                    duration: 5 + i,
                    delay: 0.9 + i * 0.12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }
          }
        >
          {chip.text}
        </motion.span>
      ))}
    </div>
  )
}

/** Простой fade-up контейнер (анимация на монтировании - hero над сгибом). */
function Reveal({
  children,
  reduceMotion,
  delay,
}: {
  children: ReactNode
  reduceMotion: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Сквозной индекс первого слова каждой строки заголовка = сумма слов в
 * предыдущих строках. Считается один раз на модуле: headlineLines - константа
 * контента. Раньше индекс копился мутацией счётчика прямо в рендере - это
 * ломало правило react-hooks/immutability и могло дать разъезжающиеся задержки
 * при повторном рендере.
 */
const HEADLINE_WORD_STARTS = hero.headlineLines.map((_, li) =>
  hero.headlineLines.slice(0, li).reduce((count, line) => count + line.words.length, 0),
)

/**
 * Заголовок с word-by-word reveal: каждое слово в overflow-hidden обёртке,
 * внутренний span выезжает снизу (y 100%→0) с blur 4px→0 и opacity 0→1,
 * staggered задержки от 0.3s. Strong-строки - глубокий teal, soft - мягче.
 */
function HeadlineReveal({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <h1 id="hero-title" className="mt-4 text-hero">
      {hero.headlineLines.map((line, li) => (
        <span key={li} className="block">
          {line.words.map((word, wi) => {
            const delay = 0.3 + (HEADLINE_WORD_STARTS[li] + wi) * 0.1
            return (
              <Fragment key={`${li}-${wi}`}>
                <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    className={`inline-block ${line.tone === 'soft' ? 'text-ink' : 'text-grass-600'}`}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: '100%', filter: 'blur(4px)' }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, y: '0%', filter: 'blur(0px)' }
                    }
                    transition={{
                      duration: reduceMotion ? 0 : 0.7,
                      delay: reduceMotion ? 0 : delay,
                      ease: EASE,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {/* Настоящий пробел между словами - для копирования, скринридеров и SEO. */}
                {wi < line.words.length - 1 ? ' ' : ''}
              </Fragment>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

/** Панель нижней полосы: fade-up на монтировании со своей задержкой. */
function PanelFadeUp({
  children,
  reduceMotion,
  delay,
}: {
  children: ReactNode
  reduceMotion: boolean
  delay: number
}) {
  return (
    <motion.div
      className="h-full"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function ApplyPanel() {
  const { apply } = hero.panels
  return (
    // Заливка ячейки идёт в край экрана, а текст выходит на левую границу
    // контейнера - лента полноширинная, но вертикаль страницы не ломается.
    <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden border-t border-aqua-100 bg-aqua-50 p-6 md:p-8 lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))]">
      {/* Цветы-вырезка лежат по низу ячейки: декор в кадре, а не картинка в
          рамке. Прижаты к нижнему краю и уходят за правый край - полоса
          продолжается, а не обрывается. Слой держим на z-0, а текст поднимаем
          на z-10: отрицательный z-index уводил бы декор под заливку ячейки. */}
      <img
        src="/images/hero/flowers.webp"
        alt=""
        aria-hidden="true"
        width={868}
        height={354}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -right-6 bottom-[-14%] z-0 w-[78%] max-w-[340px] select-none object-contain"
      />
      {/* Кегль крупнее базового text-sm: ячейка широкая и высокая, и на 14px
          текст в ней смотрелся разреженно. max-w снят - место под текст тут
          346px, и ограничение всё равно не срабатывало. */}
      <div className="relative z-10">
        <h2 className="text-[1.35rem] font-semibold leading-snug text-ink">{apply.title}</h2>
        <p className="mt-2.5 text-base leading-relaxed text-ink-soft">{apply.text}</p>
      </div>
      <a
        href={apply.linkHref}
        className="group relative z-10 inline-flex items-center gap-2 text-base font-semibold text-grass-700 transition-colors hover:text-grass-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grass-300 focus-visible:ring-offset-2"
      >
        {apply.linkLabel}
        <ArrowRight
          size={18}
          strokeWidth={2}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>
    </div>
  )
}

/**
 * Средняя панель - авто-карусель выгод продукта. Смена карточки каждые
 * 3500ms с fade/slide (AnimatePresence). Пауза при наведении/фокусе; при
 * prefers-reduced-motion автосмена выключена, но карточки листаются точками.
 */
function CarouselPanel({ reduceMotion }: { reduceMotion: boolean }) {
  const cards = hero.panels.carousel
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduceMotion || paused) return
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % cards.length)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [reduceMotion, paused, cards.length])

  const card = cards[active]
  const Icon = PANEL_ICONS[card.icon]

  return (
    <div
      className="flex h-full flex-col justify-between gap-5 border-t border-aqua-100 bg-white p-6 md:border-l md:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* relative + absolute-карточки, а не mode="wait": при wait старая
          карточка сначала полностью уезжает и только потом приходит новая -
          между ними ~0.4s ячейка стоит пустой, видны одни точки. Здесь обе
          карточки лежат друг на друге и честно перекрещиваются.
          Высота: карточки absolute и контейнер их не измеряет, поэтому min-h
          обязан вмещать самую высокую. Сейчас это «Чистая работа системы» -
          150px; при правке текстов карусели высоту нужно перепроверять.
          relative обязателен: без него absolute-карточка цеплялась бы за
          контейнер ленты четырьмя уровнями выше. */}
      <div className="relative min-h-[152px]">
        <AnimatePresence>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.4, ease: EASE }}
          >
            <span className="flex h-9 w-9 items-center justify-center border border-sky-200 text-sky-600">
              {Icon && <Icon size={18} strokeWidth={1.75} aria-hidden="true" />}
            </span>
            <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-1.5" role="tablist" aria-label="Что даёт ИНБИО-СЕПТ">
        {cards.map((item, index) => {
          const isActive = index === active
          return (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={item.title}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grass-300 focus-visible:ring-offset-2 ${
                isActive ? 'w-6 bg-grass-600' : 'w-1.5 bg-sky-200 hover:bg-sky-300'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}

function TrustPanel() {
  const { trust } = hero.panels
  return (
    // Симметрично ApplyPanel: правый край текста садится на границу контейнера.
    // Заливка голубая, как и в первой ячейке: лента симметрична -
    // голубая / белая / голубая - и держит один тон со сценой (aqua).
    <div className="relative flex h-full flex-col justify-center gap-2 overflow-hidden border-t border-aqua-100 bg-aqua-50 p-6 md:border-l md:p-8 lg:pr-[max(2rem,calc((100vw-1200px)/2+2rem))]">
      {/* Листики-вырезка по низу ячейки - зеркально цветам в первой ячейке:
          лента начинается и заканчивается живым декором. Зелень на бледном
          лиловом читается сильнее, чем белые цветы на голубом, поэтому здесь
          слой приглушён - иначе края ленты выглядели бы неравноценно. */}
      <img
        src="/images/hero/leaves.webp"
        alt=""
        aria-hidden="true"
        width={900}
        height={398}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -left-6 bottom-[-16%] z-0 w-[78%] max-w-[340px] select-none object-contain opacity-70"
      />
      {/* Кегль подтянут к первой ячейке - панели парные и должны звучать в
          один голос. Подпись остаётся сиреневой: это бренд-акцент eyebrow'ов
          по всему сайту, и на голубой заливке он читается только лучше. */}
      <span className="relative z-10 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-lilac-600">
        {trust.label}
      </span>
      <h2 className="relative z-10 text-[1.35rem] font-semibold leading-snug text-ink">
        {trust.title}
      </h2>
      <p className="relative z-10 mt-1.5 text-base leading-relaxed text-ink-soft">{trust.text}</p>
    </div>
  )
}
