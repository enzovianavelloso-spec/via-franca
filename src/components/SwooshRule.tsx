import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Swoosh } from '@/components/Swoosh'
import { cn } from '@/lib/utils'

/**
 * Divisor de seção: o traçado da logo esticado de ponta a ponta da página.
 * Ele é "desenhado" da esquerda para a direita quando entra em tela — a mesma
 * trajetória atravessando o site inteiro, seção após seção.
 */
export function SwooshRule({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const emTela = useInView(ref, { once: true, amount: 0.35 })
  const reduceMotion = useReducedMotion()
  const revelado = reduceMotion || emTela

  return (
    <div ref={ref} className={cn('pointer-events-none overflow-hidden', className)} aria-hidden="true">
      <div
        className="transition-[clip-path] ease-out [transition-duration:1200ms] motion-reduce:transition-none"
        style={{ clipPath: revelado ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
      >
        <Swoosh stretch={3.2} trimTop={24} trimBottom={24} />
      </div>
    </div>
  )
}
