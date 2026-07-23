import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/Reveal'
import { Swoosh } from '@/components/Swoosh'
import { NUMEROS } from '@/data/empreendimentos'
import { cn } from '@/lib/utils'

type Numero = (typeof NUMEROS)[number]

/**
 * Cada linha desenha o próprio fio da esquerda para a direita antes de entregar
 * a figura — o mesmo gesto do divisor de seção, aplicado ao extrato. Lê como
 * algo sendo escrito, não estampado.
 */
function LinhaNumero({ item, indice }: { item: Numero; indice: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const emTela = useInView(ref, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const visivel = reduceMotion || emTela

  return (
    <div
      ref={ref}
      data-visivel={visivel}
      className={cn(
        'relative flex flex-col gap-y-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-8 md:py-8',
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:origin-left before:scale-x-0 before:bg-white/25 before:transition-transform before:ease-out before:content-[''] before:[transition-duration:1000ms]",
        'data-[visivel=true]:before:scale-x-100 motion-reduce:before:transition-none',
      )}
    >
      <dt
        className="vf-figures font-display text-[clamp(2.75rem,8vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em] transition-[opacity,transform] ease-out [transition-duration:800ms] motion-reduce:transition-none"
        style={{
          opacity: visivel ? 1 : 0,
          transform: visivel ? 'none' : 'translateY(0.75rem)',
          transitionDelay: visivel ? `${240 + indice * 40}ms` : '0ms',
        }}
      >
        {item.figura}
        {item.complemento && (
          <span className="ml-3 font-sans text-[clamp(0.9rem,1.6vw,1.25rem)] font-light tracking-normal text-white/80">
            {item.complemento}
          </span>
        )}
      </dt>
      <dd
        className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-white/75 transition-[opacity,transform] ease-out [transition-duration:800ms] motion-reduce:transition-none sm:text-right"
        style={{
          opacity: visivel ? 1 : 0,
          transform: visivel ? 'none' : 'translateY(0.5rem)',
          transitionDelay: visivel ? `${360 + indice * 40}ms` : '0ms',
        }}
      >
        {item.rotulo}
      </dd>
    </div>
  )
}

/**
 * Os quatro números do portfólio lidos como um extrato: figura à esquerda,
 * a frase que a qualifica à direita, um fio separando cada linha.
 */
export function Numeros() {
  return (
    <section
      id="numeros"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-brand-red via-brand-red to-[hsl(358_72%_34%)] py-24 text-white md:py-32"
    >
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

        <dl className="mt-12 border-b border-white/25 md:mt-16">
          {NUMEROS.map((item, i) => (
            <LinhaNumero key={item.rotulo} item={item} indice={i} />
          ))}
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
