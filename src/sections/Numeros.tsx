import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/Reveal'
import { Swoosh } from '@/components/Swoosh'
import { NUMEROS } from '@/data/empreendimentos'

/**
 * Os quatro números do portfólio lidos como um extrato: figura à esquerda,
 * a frase que a qualifica à direita, um fio separando cada linha.
 */
export function Numeros() {
  return (
    <section id="numeros" className="relative scroll-mt-24 overflow-hidden bg-brand-red py-24 text-white md:py-32">
      <Swoosh
        mono
        stretch={2.4}
        trimTop={20}
        className="pointer-events-none absolute -bottom-6 left-0 w-[150%] text-white opacity-[0.13] md:-bottom-10 md:w-full"
      />

      <div className="container relative">
        <Reveal>
          <Eyebrow invertido>Nossos números</Eyebrow>
        </Reveal>

        <dl className="mt-12 md:mt-16">
          {NUMEROS.map((item, i) => (
            <Reveal key={item.rotulo} delay={i * 0.07}>
              <div className="flex flex-col gap-y-1 border-t border-white/25 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-8 md:py-8">
                <dt className="vf-figures font-display text-[clamp(2.75rem,8vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em]">
                  {item.figura}
                  {item.complemento && (
                    <span className="ml-3 font-sans text-[clamp(0.9rem,1.6vw,1.25rem)] font-light tracking-normal text-white/80">
                      {item.complemento}
                    </span>
                  )}
                </dt>
                <dd className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-white/75 sm:text-right">
                  {item.rotulo}
                </dd>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-white/25" />
        </dl>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-measure text-[0.9375rem] leading-relaxed text-white/80">
            Com empreendimentos em três estados, nossos números refletem o nosso compromisso de
            sempre construir empreendimentos com diferencial de mercado.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
