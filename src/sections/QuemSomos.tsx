import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/Reveal'
import { useTiltFoto } from '@/hooks/useTiltFoto'
import quemSomosLago from '@/assets/quem-somos-lago.webp'

export function QuemSomos() {
  const quadro = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: quadro,
    offset: ['start end', 'end start'],
  })
  const deriva = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const tilt = useTiltFoto(10)

  return (
    <section id="quem-somos" className="scroll-mt-24 pb-24 pt-16 md:pb-32 md:pt-20">
      <div className="container grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div>
          <Reveal>
            <Eyebrow>Quem somos</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink">
              Via França
            </h2>
            <p className="mt-4 font-display text-[clamp(1.125rem,2vw,1.5rem)] font-normal italic text-brand-red">
              Empreendimentos, incorporações, compra e venda.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 max-w-measure space-y-6 text-ink/75">
              <p>
                Com surgimento na cidade de Montes Claros, a Via França Empreendimentos atua no
                mercado imobiliário há mais de 16 anos, onde construiu sua reputação a partir da
                elaboração e lançamento de diversos empreendimentos.
              </p>
              <p>
                Atualmente a Via França tem foco principal em loteamentos e condomínios rurais e
                residenciais. Nossa empresa possui hoje atuação em três estados — São Paulo, Bahia e
                Minas Gerais — planejando expandir ainda mais.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:pt-4">
          <figure>
            <div
              ref={quadro}
              className="relative aspect-[4/5] overflow-hidden bg-paper"
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
            >
              <motion.div
                className="absolute inset-x-0 top-[-7%] h-[114%]"
                style={reduceMotion ? undefined : { y: deriva }}
              >
                <motion.img
                  src={quemSomosLago}
                  alt="Lago cercado por palmeiras e gramado em área rural da Via França."
                  className="size-full object-cover"
                  style={reduceMotion ? undefined : { x: tilt.x, y: tilt.y }}
                  loading="lazy"
                />
              </motion.div>
            </div>
            <figcaption className="mt-3 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-neutral">
              Loteamentos e condomínios rurais e residenciais
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
