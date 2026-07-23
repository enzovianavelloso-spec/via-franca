import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { MouseEvent } from 'react'

/**
 * Desloca a foto alguns pixels seguindo o cursor dentro do próprio quadro —
 * mesma lógica da deriva de scroll, só que disparada pelo mouse. Mola suave
 * em vez de seguir o cursor 1:1, para não competir com o gesto do scroll.
 */
export function useTiltFoto(intensidade = 10) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const molaX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.4 })
  const molaY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.4 })

  if (reduceMotion) {
    return { x, y, onMouseMove: undefined, onMouseLeave: undefined }
  }

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px * intensidade)
    y.set(py * intensidade)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { x: molaX, y: molaY, onMouseMove, onMouseLeave }
}
