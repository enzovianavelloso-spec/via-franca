import type { Transition } from 'framer-motion'

/**
 * Vocabulário de movimento da página. Regra que governa tudo aqui: nada com
 * overshoot. A fluidez vem de uma curva de saída longa, não de mola solta —
 * quique lê como brinquedo, e o registro desta marca é institucional.
 */

/** expo-out. Padrão de qualquer entrada de conteúdo. */
export const FLUID = [0.16, 1, 0.3, 1] as const

/** Mais contida, para hover e microinteração. */
export const LUX = [0.22, 0.61, 0.36, 1] as const

/**
 * Todo valor ligado a scroll passa por aqui. Ler `scrollY` cru prende a
 * animação ao passo de rolagem do sistema operacional — é exatamente o que faz
 * parallax parecer travado no grid de pixels. `restDelta` corta a conta quando
 * o movimento deixa de ser perceptível.
 */
export const SCROLL_SPRING = {
  stiffness: 70,
  damping: 22,
  mass: 0.55,
  restDelta: 0.004,
} as const

/** Mola do ponteiro: mais mole e mais lenta, para virar deriva e não tremor. */
export const POINTER_SPRING = {
  stiffness: 34,
  damping: 18,
  mass: 0.9,
  restDelta: 0.0008,
} as const

/** Mola de hover — resposta rápida, zero quique. */
export const HOVER_SPRING: Transition = {
  type: 'spring',
  stiffness: 220,
  damping: 30,
  mass: 0.7,
}

export const enter = (duration = 0.95, delay = 0): Transition => ({
  duration,
  delay,
  ease: FLUID,
})
