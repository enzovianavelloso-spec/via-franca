import { useEffect, useRef, useState } from 'react'
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

  /**
   * O primeiro divisor fica logo abaixo do hero (92svh): em telas mais baixas
   * ele já está 35% em tela no load, e `emTela` vira `true` sem o usuário
   * rolar nada. Um atraso por tempo não resolve — só empurra o problema pra
   * um segundo depois. A trava certa é: só revela depois que a página
   * realmente rolou uma vez, não importa quanto tempo passou.
   */
  const [rolou, setRolou] = useState(false)
  useEffect(() => {
    if (rolou) return
    const onScroll = () => setRolou(true)
    window.addEventListener('scroll', onScroll, { passive: true, once: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [rolou])

  const revelado = reduceMotion || (emTela && rolou)

  return (
    <div ref={ref} className={cn('pointer-events-none overflow-hidden', className)} aria-hidden="true">
      <div
        className="transition-[clip-path] ease-out [transition-duration:1200ms] motion-reduce:transition-none"
        style={{ clipPath: revelado ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
      >
        {/* Compensação pequena no desktop: esticado 3.2× o traçado afina, mas
            passar disto transforma o divisor numa fita. No mobile o mesmo
            stretch encurta demais a altura (largura menor, mesma proporção) —
            lê como um fio quase invisível. Versão própria, menos esticada e
            mais grossa, mantém o traçado legível na tela estreita. */}
        <Swoosh
          stretch={1.7}
          trimTop={20}
          trimBottom={20}
          espessura={1.5}
          className="md:hidden"
        />
        <Swoosh
          stretch={3.2}
          trimTop={24}
          trimBottom={24}
          espessura={1.15}
          className="hidden md:block"
        />
      </div>
    </div>
  )
}
