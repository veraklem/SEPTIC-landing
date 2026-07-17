import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { FadeIn } from '../ui/FadeIn'
import { composition } from '../../content/sections'

const BAND_IMAGE = '/images/composition/microbes-genera-band.webp'

/**
 * Шесть родов, как они расположены в исходной ленте microbes-genera-band.webp
 * (1800×440, 6 равных сегментов по 300×440, подпись рода впечатана в само
 * фото). На mobile та же лента нарезается CSS-спрайтом (background-position)
 * на grid 2×3 - без отдельных файлов и без горизонтального скролла:
 * background-size 600% 100% растягивает ленту так, что один сегмент занимает
 * ровно ширину ячейки при aspect-ratio 300/440, а background-position-x
 * i*20% (i = 0..5) сдвигает нужный сегмент в кадр.
 */
// Точные центр/диаметр каждого кружка в ленте (замерено попиксельно: цветные
// бактерии = не-белое). Кружки смещены нерегулярно, поэтому кроп у каждого
// индивидуальный - иначе остаются неровные белые поля.
const BAND_CIRCLES = [
  { name: 'Rhodopseudomonas', cx: 192, cy: 222, dia: 221 },
  { name: 'Lactobacillus', cx: 475, cy: 221, dia: 220 },
  { name: 'Azotobacter', cx: 759, cy: 222, dia: 221 },
  { name: 'Cellulomonas', cx: 1043, cy: 222, dia: 221 },
  { name: 'Pseudomonas', cx: 1332, cy: 222, dia: 221 },
  { name: 'Bacillus', cx: 1611, cy: 222, dia: 221 },
]

/**
 * «Состав»: сначала простое человеческое объяснение (лид без латыни) +
 * осторожная строка про этикетку/документацию, затем микроснимки родов как
 * мягкий визуальный акцент (не главный смысл секции - уменьшены, в рамке,
 * не full-bleed). Подпись рода впечатана в сам снимок. См. задание §2.
 */
export function Composition() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="composition"
      aria-labelledby="composition-title"
      className="relative overflow-hidden bg-milk py-10 md:py-14"
    >
      <Container className="relative">
        <FadeIn>
          <SectionLabel>{composition.label}</SectionLabel>
          <h2 id="composition-title" className="mt-3 text-h2 text-ink">
            {composition.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{composition.lead}</p>
          <p className="mt-3 max-w-2xl text-sm text-ink-soft/80">{composition.footnote}</p>
        </FadeIn>

        {/* Микроснимки. Круг здесь диктует сам исходник - это поле зрения
            микроскопа, а не декоративная маска: прямоугольный кроп дал бы белые
            углы вокруг круга. Поэтому rounded-full оправдан, но тень сведена к
            минимуму - снимок лежит на странице как препарат, а не парит
            карточкой. Каждый род вырезается из ленты microbes-genera-band.webp
            CSS-спрайтом: background-size 600% 147% + position i*20% 50% ровно
            центрирует круг сегмента в квадратном контейнере. Кружки «летают»
            независимо (своя фаза/длительность), при prefers-reduced-motion -
            без движения. Подпись рода впечатана в снимок. */}
        <FadeIn delay={0.1} className="mt-8 md:mt-10">
          <ul className="mx-auto grid max-w-4xl grid-cols-3 justify-items-center gap-x-5 gap-y-8 md:grid-cols-6 md:gap-x-6">
            {BAND_CIRCLES.map((circle, index) => {
              // Индивидуальный кроп впритык к кружку: окно чуть внутри края
              // (0.96 диаметра), центрируется на реальном центре кружка -
              // белого поля не остаётся ни у одного.
              const CROP = circle.dia * 0.96
              const sizeW = ((1800 / CROP) * 100).toFixed(1)
              const sizeH = ((440 / CROP) * 100).toFixed(1)
              const posX = (((circle.cx - CROP / 2) / (1800 - CROP)) * 100).toFixed(2)
              const posY = (((circle.cy - CROP / 2) / (440 - CROP)) * 100).toFixed(2)
              return (
                <li key={circle.name} className="w-full">
                  <motion.div
                    role="img"
                    aria-label={circle.name}
                    className="mx-auto aspect-square w-full max-w-[152px] rounded-full bg-white bg-no-repeat shadow-[0_8px_20px_rgba(40,48,80,0.08)]"
                    style={{
                      backgroundImage: `url(${BAND_IMAGE})`,
                      backgroundSize: `${sizeW}% ${sizeH}%`,
                      backgroundPosition: `${posX}% ${posY}%`,
                    }}
                    animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 3.4 + index * 0.4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.3,
                          }
                    }
                  />
                </li>
              )
            })}
          </ul>
        </FadeIn>
      </Container>
    </section>
  )
}
