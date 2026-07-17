import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { FadeIn } from '../ui/FadeIn'
import { usageSystems } from '../../content/sections'

const IMAGES: Record<string, { src: string; alt: string }> = {
  Droplets: { src: '/images/systems/septic-eco.jpg', alt: 'Контур септика на чистом водном фоне - локальная очистная система' },
  Toilet: { src: '/images/systems/biotoilet-eco.jpg', alt: 'Контур биотуалета на чистом водном фоне - приёмный резервуар' },
  Waves: { src: '/images/systems/cesspit-eco.jpg', alt: 'Контур накопительной ёмкости на чистом водном фоне - выгребная яма' },
}

/**
 * «Подходит для любой локальной очистной системы»: editorial-триптих из трёх
 * крупных портретных кадров (4:5) - на desktop 3 колонки, на mobile 1. Кадры
 * прямоугольные: без масок, скруглений, рамок и теней - фото держит колонку
 * само, как разворот в журнале. Подпись отделена от кадра hairline-линией, а
 * не карточкой; индекс 01/02/03 - типографский, без градиентных плашек.
 * Hover - только медленный zoom внутри неподвижного кадра. См. SPEC.md §4.
 */
export function ProblemScenarios() {
  return (
    <section aria-labelledby="problems-title" className="relative overflow-hidden bg-milk py-10 md:py-14">
      <Container className="relative">
        <SectionLabel>{usageSystems.label}</SectionLabel>
        <h2 id="problems-title" className="mt-3 text-h2 text-ink">
          {usageSystems.title}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">{usageSystems.subtitle}</p>

        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
          {usageSystems.items.map((item, index) => {
            const image = IMAGES[item.icon]
            return (
              <FadeIn key={item.title} delay={index * 0.08}>
                <figure className="group">
                  {/* Кадр 4:5: object-cover срезает поля по бокам квадратного
                      исходника, силуэт системы остаётся в центре и не тянется.
                      Базовый scale-[1.1] подтягивает кадр - вокруг силуэта не
                      остаётся лишнего воздуха; hover уводит зум чуть глубже. */}
                  <div className="aspect-[4/5] overflow-hidden bg-white">
                    {image && (
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={900}
                        height={900}
                        loading="lazy"
                        className="h-full w-full scale-[1.1] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.16]"
                      />
                    )}
                  </div>
                  <figcaption>
                    <div className="mt-5 flex items-baseline gap-3 border-t border-ink/10 pt-4">
                      <span className="text-xs font-semibold tabular-nums tracking-[0.14em] text-sky-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-semibold text-ink">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                  </figcaption>
                </figure>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
