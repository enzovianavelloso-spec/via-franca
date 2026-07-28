import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Eyebrow } from '@/components/Eyebrow'
import { BladeMark } from '@/components/BladeMark'
import { Reveal } from '@/components/motion/Reveal'
import { ReguaContagem, useCountUp } from '@/components/motion/CountUp'
import { Swoosh } from '@/components/Swoosh'
import { NUMEROS } from '@/data/empreendimentos'
import { cn } from '@/lib/utils'

type Numero = (typeof NUMEROS)[number]

/**
 * Cada linha desenha o próprio fio da esquerda para a direita antes de entregar
 * a figura — o mesmo gesto do divisor de seção, aplicado ao extrato. Lê como
 * algo sendo escrito, não estampado. Agora a figura também conta, e a régua
 * embaixo dela é dirigida pelo mesmo motion value: barra e número pousam no
 * mesmo quadro.
 */
function LinhaNumero({ item, indice }: { item: Numero; indice: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const emTela = useInView(ref, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const visivel = reduceMotion || emTela

  const contagem = useCountUp({
    para: item.valor,
    milhar: item.milhar,
    duracao: 1.9,
    atraso: 0.24 + indice * 0.08,
  })

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
      <dt className="min-w-0">
        <span
          ref={contagem.ref}
          className="type-figure vf-figures block text-[clamp(2.75rem,8vw,5.5rem)] text-white"
        >
          <span aria-hidden="true">
            <span className="align-super text-[0.38em]">+</span>
            <motion.span>{contagem.texto}</motion.span>
            {item.complemento && (
              <span className="ml-3 font-sans text-[clamp(0.9rem,1.6vw,1.25rem)] font-light tracking-normal text-white/80">
                {item.complemento}
              </span>
            )}
          </span>
          {/* A figura em movimento é decorativa para a tecnologia assistiva; o
              valor final e o rótulo vivem aqui, numa frase estável. */}
          <span className="sr-only">
            {['Mais de', item.valor.toLocaleString('pt-BR'), item.complemento, item.rotulo]
              .filter(Boolean)
              .join(' ')}
          </span>
        </span>
        <ReguaContagem
          progresso={contagem.progresso}
          className="mt-4 max-w-[9rem] text-white sm:max-w-[12rem]"
        />
      </dt>
      <dd
        className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-white/75 transition-[opacity,transform] ease-out [transition-duration:800ms] motion-reduce:transition-none sm:text-right"
        style={{
          opacity: visivel ? 1 : 0,
          transform: visivel ? 'none' : 'translateY(0.5rem)',
          transitionDelay: visivel ? `${360 + indice * 40}ms` : '0ms',
        }}
        aria-hidden="true"
      >
        {item.rotulo}
      </dd>
    </div>
  )
}

/**
 * Primeira das duas faixas cheias da página. Os quatro números do portfólio
 * lidos como um extrato: figura à esquerda, a frase que a qualifica à direita,
 * um fio separando cada linha.
 */
export function Numeros() {
  return (
    <section
      id="numeros"
      className="on-wine scroll-anchor section-pad relative isolate overflow-hidden rounded-panel bg-gradient-to-b from-brand-red via-brand-red to-brand-wine text-white"
    >
      {/* Marca-d'água em duas escalas: o traçado inteiro deitado na base e uma
          lâmina solta no alto, que quebra a simetria. */}
      <Swoosh
        mono
        stretch={2.4}
        trimTop={20}
        espessura={1.2}
        className="pointer-events-none absolute -bottom-6 left-0 -z-10 w-[150%] text-white opacity-[0.13] md:-bottom-10 md:w-full"
      />
      <BladeMark
        indice={2}
        espessura={2.8}
        espelhado
        cor="#ffffff"
        className="pointer-events-none absolute -top-[6%] right-[-8%] -z-10 w-[46%] opacity-[0.07] blur-[1px]"
      />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.055]" aria-hidden="true" />

      <div className="container relative">
        <Reveal>
          <Eyebrow invertido>Nossos números</Eyebrow>
          <h2 className="type-h2 mt-4 max-w-[18ch]">O que 16 anos somam.</h2>
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
