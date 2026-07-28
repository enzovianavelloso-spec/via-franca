import type { ElementType, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FLUID } from '@/lib/motion'

type Tag = 'div' | 'section' | 'article' | 'li' | 'span' | 'dl'

/**
 * Sob reduced-motion todos os três componentes daqui devolvem markup estático,
 * não uma animação zerada. É de propósito: sem `initial`, não existe caminho em
 * que o conteúdo fique preso em `opacity: 0` caso o observer nunca dispare.
 */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  scale = false,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  /** Zoom-out quase imperceptível — só para blocos grandes. */
  scale?: boolean
  as?: Tag
}) {
  const reduceMotion = useReducedMotion()
  const Componente = motion[as] as typeof motion.div
  const Estatico = as as ElementType

  if (reduceMotion) return <Estatico className={className}>{children}</Estatico>

  return (
    <Componente
      className={className}
      initial={{ opacity: 0, y, scale: scale ? 0.985 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -12% 0px' }}
      transition={{
        duration: 1.05,
        delay,
        ease: FLUID,
        /* A opacidade fecha antes do movimento. É essa defasagem — 0.7s dentro
           de 1.05s — que faz o bloco assentar em vez de pipocar. */
        opacity: { duration: 0.7, delay, ease: 'easeOut' },
      }}
    >
      {children}
    </Componente>
  )
}

/**
 * Contêiner de entrada em onda. O passo de 85ms contra filhos de 1.05s faz as
 * entradas se sobreporem — onda, não fila.
 */
export function Stagger({
  children,
  className,
  step = 0.085,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  step?: number
  delay?: number
  as?: Tag
}) {
  const reduceMotion = useReducedMotion()
  const Componente = motion[as] as typeof motion.div
  const Estatico = as as ElementType

  if (reduceMotion) return <Estatico className={className}>{children}</Estatico>

  return (
    <Componente
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -12% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {children}
    </Componente>
  )
}

export function StaggerItem({
  children,
  className,
  y = 22,
  x = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  y?: number
  /** Entrada lateral — para listas que representam algo chegando. */
  x?: number
  as?: Tag
}) {
  const reduceMotion = useReducedMotion()
  const Componente = motion[as] as typeof motion.div
  const Estatico = as as ElementType

  if (reduceMotion) return <Estatico className={className}>{children}</Estatico>

  return (
    <Componente
      className={className}
      variants={{
        hidden: { opacity: 0, y, x },
        show: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 1.05,
            ease: FLUID,
            opacity: { duration: 0.7, ease: 'easeOut' },
          },
        },
      }}
    >
      {children}
    </Componente>
  )
}
