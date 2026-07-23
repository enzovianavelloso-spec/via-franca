import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Eyebrow } from '@/components/Eyebrow'
import heroTorre from '@/assets/hero-torre.jpg'

const FATOS = ['Montes Claros / MG', 'Atuação em MG · SP · BA', 'Mais de 16 anos de mercado']

const SAIDA = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const secao = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: secao,
    offset: ['start start', 'end start'],
  })

  /**
   * A torre desce mais devagar que a página e cresce — quem rola se afasta da
   * base do prédio. A neblina, que já está na foto, adensa até engolir a torre:
   * o hero não termina numa borda, dissolve na seção seguinte.
   */
  const torreY = useTransform(scrollYProgress, [0, 1], ['-7%', '9%'])
  const torreEscala = useTransform(scrollYProgress, [0, 1], [1.04, 1.18])
  const neblina = useTransform(scrollYProgress, [0, 0.45, 0.85], [0, 0.45, 1])
  const conteudoY = useTransform(scrollYProgress, [0, 1], ['0%', '-34%'])
  const conteudoOpacidade = useTransform(scrollYProgress, [0, 0.62], [1, 0])

  const entrada = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: SAIDA },
        }

  return (
    <section
      ref={secao}
      id="topo"
      className="relative flex min-h-[92svh] items-end overflow-hidden bg-white"
    >
      <div className="absolute inset-x-0 top-[-14%] h-[128%]">
        <motion.div className="size-full" style={reduceMotion ? undefined : { y: torreY }}>
          <motion.img
            src={heroTorre}
            alt="Torre corporativa envolta em neblina, vista de baixo para cima."
            className="size-full object-cover object-[62%_35%]"
            style={reduceMotion ? undefined : { scale: torreEscala }}
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            fetchPriority="high"
          />
        </motion.div>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white md:bg-gradient-to-r md:from-white md:via-white/70 md:to-transparent"
        aria-hidden="true"
      />

      {/* A base nunca termina numa linha: a torre sempre se dilui no branco. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-white via-white/70 to-transparent"
        aria-hidden="true"
      />

      {/* Neblina de saída: adensa com o scroll até entregar a página em branco. */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white"
        style={reduceMotion ? { opacity: 0 } : { opacity: neblina }}
        aria-hidden="true"
      />

      <motion.div
        className="container relative pb-14 pt-32 md:pb-20"
        style={reduceMotion ? undefined : { y: conteudoY, opacity: conteudoOpacidade }}
      >
        <motion.div {...entrada(0.05)}>
          <Eyebrow>Via França Empreendimentos</Eyebrow>
        </motion.div>

        <motion.h1
          {...entrada(0.15)}
          className="mt-6 max-w-[16ch] font-display text-[clamp(2.4rem,7.2vw,5.25rem)] font-light leading-[0.98] tracking-[-0.025em] text-ink md:max-w-[14ch]"
        >
          Transformando suas ideias em empreendimentos{' '}
          <span className="text-brand-red">únicos.</span>
        </motion.h1>

        <motion.ul
          {...entrada(0.35)}
          className="mt-10 flex flex-col gap-y-3 border-t border-ink/15 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8"
        >
          {FATOS.map((fato) => (
            <li
              key={fato}
              className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-neutral"
            >
              {fato}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
