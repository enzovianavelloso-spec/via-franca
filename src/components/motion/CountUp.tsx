import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { FLUID } from '@/lib/motion'
import { cn } from '@/lib/utils'

/** Separador de milhar pt-BR: ponto. */
function formatar(valor: number, milhar: boolean) {
  const inteiro = Math.round(valor).toString()
  return milhar ? inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : inteiro
}

/**
 * Conta de 0 até `para` quando a figura entra em tela. Devolve também
 * `progresso` (0→1) para que a régua embaixo do número seja dirigida pelo
 * mesmo motion value — barra e número pousam no mesmo quadro, não em quadros
 * próximos.
 */
export function useCountUp({
  para,
  milhar = false,
  duracao = 2.1,
  atraso = 0,
}: {
  para: number
  milhar?: boolean
  duracao?: number
  atraso?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const emTela = useInView(ref, { once: true, amount: 0.35 })

  // Sob reduced-motion o valor já nasce no número final: nada de contador
  // parado em zero se a animação nunca rodar.
  const valor = useMotionValue(reduce ? para : 0)
  const texto = useTransform(valor, (v) => formatar(v, milhar))
  const progresso = useTransform(valor, [0, para || 1], [0, 1])

  useEffect(() => {
    if (reduce || !emTela) return
    const controls = animate(valor, para, { duration: duracao, delay: atraso, ease: FLUID })
    return () => controls.stop()
  }, [emTela, para, duracao, atraso, reduce, valor])

  return { ref, texto, progresso, emTela }
}

/**
 * Figura contada. `prefixo` sai dimensionado em relação ao número (0.38em) para
 * não competir com ele.
 */
export function Figura({
  para,
  milhar = false,
  duracao,
  atraso,
  prefixo,
  sufixo,
  className,
  rotuloAcessivel,
}: {
  para: number
  milhar?: boolean
  duracao?: number
  atraso?: number
  prefixo?: string
  sufixo?: string
  className?: string
  /** Texto lido por leitor de tela no lugar do número em movimento. */
  rotuloAcessivel: string
}) {
  const { ref, texto } = useCountUp({ para, milhar, duracao, atraso })

  return (
    <span ref={ref} className={cn('type-figure vf-figures', className)}>
      {/* O número animado é decorativo para a tecnologia assistiva; o valor
          final vive no rótulo abaixo, sempre estável. */}
      <span aria-hidden="true">
        {prefixo && <span className="text-[0.38em] align-super">{prefixo}</span>}
        <motion.span>{texto}</motion.span>
        {sufixo && <span className="text-[0.38em] align-super">{sufixo}</span>}
      </span>
      <span className="sr-only">{rotuloAcessivel}</span>
    </span>
  )
}

/** Régua que enche junto com a contagem, dirigida pelo mesmo motion value. */
export function ReguaContagem({
  progresso,
  className,
}: {
  progresso: ReturnType<typeof useCountUp>['progresso']
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('block h-px w-full overflow-hidden bg-current/15', className)}
    >
      <motion.span className="block h-full origin-left bg-current" style={{ scaleX: progresso }} />
    </span>
  )
}
