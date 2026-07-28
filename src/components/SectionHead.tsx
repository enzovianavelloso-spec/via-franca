import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

/**
 * A tríade que abre toda seção: rótulo, título e a linha itálica que qualifica.
 * Vai num `Reveal` só — o título e a lede entrando separados fazem a abertura
 * parecer picotada.
 */
export function SectionHead({
  eyebrow,
  titulo,
  lede,
  className,
  ledeClassName,
  invertido = false,
}: {
  eyebrow: string
  titulo?: ReactNode
  lede?: ReactNode
  className?: string
  ledeClassName?: string
  invertido?: boolean
}) {
  return (
    <Reveal className={cn('max-w-measure', className)}>
      <Eyebrow invertido={invertido}>{eyebrow}</Eyebrow>
      {titulo && <h2 className="type-h2 mt-4">{titulo}</h2>}
      {lede && (
        <p
          className={cn(
            'type-lede mt-5 max-w-prose text-[clamp(1.05rem,0.9rem+0.5vw,1.35rem)] leading-relaxed',
            invertido ? 'text-white/80' : 'text-neutral',
            ledeClassName,
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  )
}
