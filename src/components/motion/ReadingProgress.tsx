import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { SCROLL_SPRING } from '@/lib/motion'

/**
 * Barra de progresso de leitura da página inteira. Fica em y=0, por baixo do
 * painel flutuante do Nav — que tem padding no topo e nunca encosta em 0, logo
 * não há disputa de z-index entre os dois.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const progresso = useSpring(scrollYProgress, SCROLL_SPRING)
  const reduce = useReducedMotion()

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: progresso }}
      className="fixed inset-x-0 top-0 z-[70] h-[2.5px] origin-left bg-brand-red"
    />
  )
}
