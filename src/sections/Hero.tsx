import { motion, useReducedMotion } from 'framer-motion'
import { Eyebrow } from '@/components/Eyebrow'
import heroTorre from '@/assets/hero-torre.jpg'

const FATOS = ['Montes Claros / MG', 'Atuação em MG · SP · BA', 'Mais de 16 anos de mercado']

export function Hero() {
  const reduceMotion = useReducedMotion()

  const entrada = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="topo" className="relative flex min-h-[92svh] items-end overflow-hidden bg-white">
      <img
        src={heroTorre}
        alt="Torre corporativa envolta em neblina, vista de baixo para cima."
        className="absolute inset-0 size-full object-cover object-[62%_35%]"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white md:bg-gradient-to-r md:from-white md:via-white/70 md:to-transparent"
        aria-hidden="true"
      />

      <div className="container relative pb-14 pt-32 md:pb-20">
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
      </div>
    </section>
  )
}
