import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/Eyebrow'
import { FLUID, POINTER_SPRING, SCROLL_SPRING } from '@/lib/motion'
import heroTorre from '@/assets/hero-torre.webp'

const FATOS = ['Montes Claros / MG', 'Atuação em MG · SP · BA', 'Mais de 16 anos de mercado']

const TITULO = ['Transformando', 'suas', 'ideias', 'em', 'empreendimentos']

/**
 * Uma camada de profundidade. O deslocamento de scroll é em `%` e o de ponteiro
 * em `px`; misturar as duas unidades no mesmo elemento faz uma anular a outra em
 * viewports diferentes, então cada uma vive no seu próprio `motion.div`.
 */
function Camada({
  children,
  className,
  scrollY,
  ponteiroX,
  ponteiroY,
}: {
  children: ReactNode
  className?: string
  scrollY?: MotionValue<string>
  ponteiroX?: MotionValue<number>
  ponteiroY?: MotionValue<number>
}) {
  return (
    <div className={className} aria-hidden="true">
      <motion.div className="size-full" style={scrollY ? { y: scrollY } : undefined}>
        <motion.div
          className="size-full"
          style={ponteiroX && ponteiroY ? { x: ponteiroX, y: ponteiroY } : undefined}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

export function Hero() {
  const secao = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress: progressoBruto } = useScroll({
    target: secao,
    offset: ['start start', 'end start'],
  })
  /**
   * O Fraunces carrega async (`font-display: swap`) e troca a métrica do texto
   * abaixo do hero, mudando a altura do documento no meio do scroll. Sem mola,
   * `scrollYProgress` pula instantaneamente quando isso acontece — e como a
   * marca-d'água é a única camada colorida do grupo, o pulo aparecia como um
   * lampejo vermelho. A mola absorve o salto em vez de teleportar.
   */
  const scrollYProgress = useSpring(progressoBruto, SCROLL_SPRING)

  /**
   * A torre desce mais devagar que a página e cresce — quem rola se afasta da
   * base do prédio. A neblina, que já está na foto, adensa até engolir a torre:
   * o hero não termina numa borda, dissolve na seção seguinte. Essa dissolução
   * é a assinatura da página e sobrevive ao rebrand; só o destino mudou de
   * branco frio para o bone do papel novo.
   */
  const torreY = useTransform(scrollYProgress, [0, 1], ['-7%', '9%'])
  const torreEscala = useTransform(scrollYProgress, [0, 1], [1.04, 1.18])
  const neblina = useTransform(scrollYProgress, [0, 0.45, 0.85], [0, 0.45, 1])
  const conteudoY = useTransform(scrollYProgress, [0, 1], ['0%', '-34%'])
  const conteudoOpacidade = useTransform(scrollYProgress, [0, 0.62], [1, 0])

  // Deriva de ponteiro. Sem mola vira tremor; a mola daqui é mole e lenta de
  // propósito.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const mx = useSpring(px, POINTER_SPRING)
  const my = useSpring(py, POINTER_SPRING)

  useEffect(() => {
    if (reduce) return
    // Sem isto, um aparelho híbrido dispara um mousemove sintético, nunca dispara
    // mouseleave, e as camadas ficam deslocadas para sempre.
    if (!window.matchMedia('(pointer: fine)').matches) return

    const el = secao.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      px.set((e.clientX - r.left) / r.width - 0.5)
      py.set((e.clientY - r.top) / r.height - 0.5)
    }
    const onLeave = () => {
      px.set(0)
      py.set(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [px, py, reduce])

  // Amplitudes por camada. A foto anda com o ponteiro; a lâmina e o conteúdo
  // andam contra, e é a diferença de sinal que produz profundidade.
  const fotoX = useTransform(mx, (v) => v * 20)
  const fotoY = useTransform(my, (v) => v * 14)
  const conteudoX = useTransform(mx, (v) => v * -12)
  const conteudoPY = useTransform(my, (v) => v * -8)

  const palavra = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18, clipPath: 'inset(0 100% 0 0)' },
          animate: { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' },
          transition: {
            duration: 1.1,
            // Passo menor: as palavras chegam como uma frase, não uma fila.
            delay: 0.35 + i * 0.06,
            ease: FLUID,
            opacity: { duration: 0.7, delay: 0.35 + i * 0.06, ease: 'easeOut' },
          },
        }

  const entrada = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: FLUID },
        }

  return (
    <section
      ref={secao}
      id="topo"
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden rounded-b-panel bg-paper"
    >
      {/* Foto */}
      <Camada
        className="absolute inset-x-0 top-[-14%] -z-[60] h-[128%] will-change-transform"
        scrollY={reduce ? undefined : torreY}
        ponteiroX={reduce ? undefined : fotoX}
        ponteiroY={reduce ? undefined : fotoY}
      >
        <motion.img
          src={heroTorre}
          alt="Torre corporativa envolta em neblina, vista de baixo para cima."
          width={1600}
          height={2000}
          className="size-full object-cover object-[62%_35%] contrast-[1.12] saturate-[0.92]"
          style={reduce ? undefined : { scale: torreEscala }}
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          fetchPriority="high"
          decoding="async"
        />
      </Camada>

      {/* Duotone quente: `color` preserva o desenho tonal da foto e troca só a
          matiz. `multiply` mataria a imagem. Fraco de propósito — o que se quer
          é um viés quente, não uma foto vermelha. */}
      <div
        className="absolute inset-0 -z-50 bg-brand-red opacity-[0.14] mix-blend-color"
        aria-hidden="true"
      />

      {/* Véus de bone. O peso fica todo do lado do texto: à esquerda no
          desktop, embaixo no mobile. O lado da torre fica limpo — véu demais
          apaga a foto, e sem foto o hero não tem o que ancorar. */}
      <div
        /* No mobile o texto cai em cima da foto, não ao lado dela: o véu
           precisa cobrir a faixa do meio, onde o h1 assenta sobre as janelas
           escuras da torre. No desktop o peso migra para a esquerda e o lado
           da torre fica limpo. */
        className="absolute inset-0 -z-40 bg-gradient-to-b from-paper/70 via-paper/55 to-paper md:bg-gradient-to-r md:from-paper md:via-paper/55 md:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-40 h-[38%] bg-gradient-to-t from-paper via-paper/55 to-transparent"
        aria-hidden="true"
      />
      {/* Faixa clara sob o painel do cabeçalho: garante o contraste dos links
          mesmo onde a foto é mais escura. */}
      <div
        className="absolute inset-x-0 top-0 -z-40 h-36 bg-gradient-to-b from-paper/90 via-paper/45 to-transparent"
        aria-hidden="true"
      />

      <div className="grain pointer-events-none absolute inset-0 -z-30 opacity-[0.035]" aria-hidden="true" />

      {/* Neblina de saída: adensa com o scroll até entregar a página em bone. */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 bg-paper"
        style={reduce ? { opacity: 0 } : { opacity: neblina }}
        aria-hidden="true"
      />

      <motion.div
        className="container relative pb-14 pt-36 md:pb-24"
        style={reduce ? undefined : { y: conteudoY, opacity: conteudoOpacidade }}
      >
        {/* Contrapeso: o conteúdo anda na direção oposta às camadas do fundo. */}
        <motion.div style={reduce ? undefined : { x: conteudoX, y: conteudoPY }}>
          <motion.div {...entrada(0.15)}>
            <Eyebrow>Via França Empreendimentos</Eyebrow>
          </motion.div>

          <h1 className="type-hero mt-6 max-w-[16ch] text-[clamp(2.4rem,7.2vw,5.25rem)] font-normal leading-[0.98] tracking-[-0.025em] text-ink md:max-w-[14ch]">
            {TITULO.map((p, i) => (
              <motion.span key={p} {...palavra(i)} className="inline-block">
                {p}
                {' '}
              </motion.span>
            ))}
            <motion.span {...palavra(TITULO.length)} className="inline-block text-brand-red">
              únicos.
            </motion.span>
          </h1>

          <motion.ul
            {...entrada(0.35 + TITULO.length * 0.1)}
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
      </motion.div>
    </section>
  )
}
