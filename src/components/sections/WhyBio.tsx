import { Fragment } from 'react'
import { Minus, CheckCircle2 } from 'lucide-react'
import { Container } from '../ui/Container'
import { FadeIn } from '../ui/FadeIn'
import { whyBio } from '../../content/sections'

/**
 * «Почему не просто химия» - 4 строки-сравнения в двух колонках
 * («Агрессивная химия обычно…» / «ИНБИО-СЕПТ…»), нейтрально. См. SPEC.md §4.
 */
export function WhyBio() {
  return (
    <section aria-labelledby="whybio-title" className="relative overflow-hidden bg-milk py-10 md:py-14">
      <Container className="relative">
        <FadeIn>
          <h2 id="whybio-title" className="text-h2 text-ink">
            {whyBio.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{whyBio.lead}</p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-7 overflow-hidden border border-sky-100 shadow-glass-card">
          <div className="grid grid-cols-1 gap-px bg-sky-100/70 sm:grid-cols-2">
            <div key="header-chemistry" className="bg-white px-5 py-4 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft/70">
                {whyBio.columnLabels.chemistry}
              </p>
            </div>
            <div key="header-inbiaccept" className="bg-grass-50 px-5 py-4 sm:px-6">
              <p className="text-xs font-semibold tracking-[0.1em] text-grass-700">
                {whyBio.columnLabels.inbiaccept}
              </p>
            </div>

            {whyBio.rows.map((row) => (
              <Fragment key={row.chemistry}>
                <div key="chem" className="flex items-start gap-3 bg-white px-5 py-5 sm:px-6">
                  <Minus size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-ink-soft/50" aria-hidden="true" />
                  <p className="text-sm text-ink-soft">{row.chemistry}</p>
                </div>
                <div key="inbi" className="flex items-start gap-3 bg-grass-50 px-5 py-5 sm:px-6">
                  <CheckCircle2 size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-grass-600" aria-hidden="true" />
                  <p className="text-sm font-medium text-ink">{row.inbiaccept}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </FadeIn>

        <p className="mt-6 max-w-2xl text-xs text-ink-soft/80">{whyBio.disclaimer}</p>
      </Container>
    </section>
  )
}
