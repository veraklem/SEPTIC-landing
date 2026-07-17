import { Package, FileCheck2, Image as ImageIcon } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { SoftGlassCard } from '../ui/SoftGlassCard'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/FadeIn'
import { mailtoHref } from '../../content/site'
import { b2bBlock } from '../../content/sections'

const icons = { Package, FileCheck2, Image: ImageIcon }

/**
 * «Для бизнеса» (#b2b) - компактная секция, одна широкая SoftGlassCard.
 * 3 пункта с иконками, кнопка mailto с темой «Опт ИНБИО-СЕПТ». См. SPEC.md §4 «B2BBlock».
 */
export function B2BBlock() {
  return (
    <section id="b2b" aria-labelledby="b2b-title" className="bg-milk py-10 md:py-14">
      <Container>
        <FadeIn>
          <SoftGlassCard className="p-8 md:p-12" hover={false}>
            <SectionLabel>{b2bBlock.label}</SectionLabel>
            <h2 id="b2b-title" className="mt-3 text-h2 text-ink">
              {b2bBlock.title}
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">{b2bBlock.text}</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {b2bBlock.points.map((point, i) => {
                const Icon = icons[point.icon as keyof typeof icons]
                // Бренд-трио tinted-плашек.
                const tint = [
                  { bg: 'bg-sky-50', ic: 'text-sky-600' },
                  { bg: 'bg-grass-50', ic: 'text-grass-600' },
                  { bg: 'bg-lilac-50', ic: 'text-lilac-600' },
                ][i % 3]
                return (
                  <li
                    key={point.text}
                    className={`flex items-center gap-3 ${tint.bg} px-4 py-4`}
                  >
                    <span className={`flex shrink-0 items-center justify-center ${tint.ic}`}>
                      {Icon && <Icon size={24} strokeWidth={1.6} aria-hidden="true" />}
                    </span>
                    <span className="text-sm font-medium text-ink">{point.text}</span>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8">
              <Button href={mailtoHref(b2bBlock.mailSubject)} variant="secondary">
                {b2bBlock.ctaLabel}
              </Button>
            </div>
          </SoftGlassCard>
        </FadeIn>
      </Container>
    </section>
  )
}
