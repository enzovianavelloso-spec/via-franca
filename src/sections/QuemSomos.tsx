import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Section } from '@/components/Section'
import { SectionHead } from '@/components/SectionHead'
import { Reveal } from '@/components/motion/Reveal'
import { useTiltFoto } from '@/hooks/useTiltFoto'
import { HOVER_SPRING, SCROLL_SPRING } from '@/lib/motion'
import quemSomosLago from '@/assets/quem-somos-lago.webp'

export function QuemSomos() {
  const quadro = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress: progressoBruto } = useScroll({
    target: quadro,
    offset: ['start end', 'end start'],
  })
  // Molado: sem isto, uma mudança de altura do documento (troca de fonte
  // async, por exemplo) faz o progresso pular em vez de deslizar.
  const scrollYProgress = useSpring(progressoBruto, SCROLL_SPRING)
  // Deriva de scroll em `%`, tilt de ponteiro em `px`: as duas unidades não se
  // anulam porque vivem em elementos diferentes.
  const deriva = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const tilt = useTiltFoto(10)

  return (
    <Section id="quem-somos">
      <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div>
          <SectionHead
            eyebrow="Quem somos"
            titulo="Via França"
            lede="Empreendimentos, incorporações, compra e venda."
            ledeClassName="text-brand-red"
          />

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

        <Reveal delay={0.15} scale className="lg:pt-4">
          <figure>
            <motion.div
              ref={quadro}
              className="blade-marks group relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-lift"
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={HOVER_SPRING}
            >
              <motion.div
                className="absolute inset-x-0 top-[-7%] h-[114%]"
                style={reduceMotion ? undefined : { y: deriva }}
              >
                <motion.img
                  src={quemSomosLago}
                  alt="Lago cercado por palmeiras e gramado em área rural da Via França."
                  width={1200}
                  height={1500}
                  className="size-full object-cover transition-transform ease-fluid [transition-duration:1100ms] group-hover:scale-[1.06]"
                  style={reduceMotion ? undefined : { x: tilt.x, y: tilt.y }}
                  loading="lazy"
                />
              </motion.div>
              {/* Véu de base: unifica a foto com o papel e evita que o canto
                  inferior brigue com a marca de canto. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,12,29,0.28),rgba(0,12,29,0.04)_46%,transparent_72%)]"
              />
            </motion.div>
            <figcaption className="type-label mt-3">
              Loteamentos e condomínios rurais e residenciais
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}
