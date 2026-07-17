import { CheckCircle2, FileCheck2, FlaskConical } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { SoftGlassCard } from '../ui/SoftGlassCard'
import { FadeIn } from '../ui/FadeIn'
import { MarketplaceButton } from '../ui/MarketplaceButton'
import { ProductMockup } from '../ui/ProductMockup'
import { products } from '../../content/products'
import { site } from '../../content/site'
import { productFormats } from '../../content/sections'

/**
 * «Форматы» (#formats): сетка из двух карточек форматов (products.ts) на всю
 * ширину - статус-бейдж, изображение на foam-подложке, характеристики строками
 * (fitsFor / usage / specs), CTA-кнопка; sku/сертификат выводятся внизу только
 * когда заданы. Карточка inDevelopment - строгая рамка (не пунктир),
 * приглушённое изображение, note вместо кнопки покупки. См. SPEC.md §4.
 */
export function ProductFormats() {
  return (
    <section id="formats" aria-labelledby="formats-title" className="relative overflow-hidden bg-milk py-10 md:py-14">
      <Container className="relative">
        <FadeIn>
          <SectionLabel>{productFormats.label}</SectionLabel>
          <h2 id="formats-title" className="mt-3 text-h2 text-ink">
            {productFormats.title}
          </h2>
        </FadeIn>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
          {products.map((product, i) =>
              product.comingSoon ? (
                <FadeIn key={product.id} delay={0.1 + i * 0.08}>
                  <div className="flex h-full flex-col items-center justify-center border border-ink-soft/20 p-8 text-center opacity-70">
                    <h3 className="font-semibold text-ink">{product.title}</h3>
                    <p className="mt-2 max-w-xs text-sm text-ink-soft">{product.note}</p>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn key={product.id} delay={0.1 + i * 0.08}>
                  <SoftGlassCard
                    className={`flex h-full flex-col overflow-hidden ${
                      product.inDevelopment ? '!border-ink-soft/20' : '!border-sky-100'
                    }`}
                    hover={false}
                  >
                    <div className="flex items-center justify-between gap-3 bg-sky-50/60 px-5 py-3 md:px-6">
                      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-700">
                        {product.title}
                      </span>
                      {product.inDevelopment ? (
                        <span className="inline-flex items-center gap-1.5 border border-ink-soft/30 bg-white px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-ink-soft">
                          <FlaskConical size={12} strokeWidth={1.8} aria-hidden="true" />В разработке
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-[8px] bg-grass-600 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-white">
                          Основной формат
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      {/* Флакон стоит прямо на поверхности карточки: без
                          тонированной плашки и рамки - от фона его отделяет
                          собственная тень продукта. Кадр крупный, вокруг нет
                          лишнего воздуха; пропорции держит object-contain. */}
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="flex h-52 w-full shrink-0 items-center justify-center sm:h-44 sm:w-36 sm:justify-start">
                          <ProductMockup
                            src={product.image}
                            alt={product.imageAlt}
                            className={`!h-full !w-auto !max-w-none object-contain ${
                              product.inDevelopment ? 'opacity-80 grayscale-[20%]' : ''
                            }`}
                          />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-ink">{product.volume}</p>
                          <p className="mt-1 text-sm text-ink-soft">{product.fitsFor}</p>
                        </div>
                      </div>

                      <ul className="mt-5 space-y-1.5 border-t border-ink/5 pt-4 text-sm text-ink-soft">
                        <li className="flex gap-2">
                          <CheckCircle2 size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-sky-600" aria-hidden="true" />
                          {product.usage}
                        </li>
                        {product.specs?.map((spec) => (
                          <li key={spec} className="flex gap-2">
                            <CheckCircle2
                              size={16}
                              strokeWidth={1.8}
                              className="mt-0.5 shrink-0 text-sky-600"
                              aria-hidden="true"
                            />
                            {spec}
                          </li>
                        ))}
                      </ul>

                      {product.inDevelopment ? (
                        <div className="mt-auto pt-4">
                          <p className="text-sm text-ink-soft">{product.note}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {/* TODO: заменить на финальную ссылку карточки Ozon */}
                            <MarketplaceButton
                              marketplace={{ id: 'ozon', name: 'Уточнить наличие', url: site.ozon.url, available: true }}
                              size="compact"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="mt-auto flex flex-wrap gap-2 pt-4">
                          {/* TODO: заменить на финальную ссылку карточки Ozon */}
                          <MarketplaceButton
                            marketplace={{ id: 'ozon', name: site.ozon.label, url: site.ozon.url, available: true }}
                            size="compact"
                          />
                        </div>
                      )}

                      {(product.sku || product.certificate) && (
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                          {product.sku && <p className="text-xs text-ink-soft">{product.sku}</p>}
                          {product.certificate && (
                            <a
                              href={product.certificate}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700"
                            >
                              <FileCheck2 size={16} strokeWidth={1.8} aria-hidden="true" />
                              Сертификат
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </SoftGlassCard>
                </FadeIn>
              ),
            )}
        </div>
      </Container>
    </section>
  )
}
