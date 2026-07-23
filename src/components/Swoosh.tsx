import { cn } from '@/lib/utils'

/**
 * As quatro lâminas curvas da logo Via França, traçadas a partir da marca oficial.
 * Cada lâmina é um par de curvas quadráticas entre os mesmos dois pontos — o que
 * produz a ponta afilada nas duas extremidades e o corpo mais cheio no meio.
 * Sistema de coordenadas base: 600 × 160.
 */
type Blade = {
  from: [number, number]
  to: [number, number]
  top: [number, number]
  bottom: [number, number]
  tone: 'red' | 'navy'
}

const BLADES: Blade[] = [
  { from: [22, 132], to: [590, 58], top: [330, 38], bottom: [330, 56], tone: 'red' },
  { from: [112, 133], to: [528, 66], top: [330, 58], bottom: [330, 72], tone: 'navy' },
  { from: [228, 50], to: [524, 40], top: [376, 26], bottom: [376, 36], tone: 'navy' },
  { from: [216, 120], to: [522, 78], top: [370, 66], bottom: [370, 78], tone: 'red' },
]

function bladePath({ from, to, top, bottom }: Blade) {
  return `M ${from[0]} ${from[1]} Q ${top[0]} ${top[1]} ${to[0]} ${to[1]} Q ${bottom[0]} ${bottom[1]} ${from[0]} ${from[1]} Z`
}

type SwooshProps = {
  className?: string
  /** Estica o traçado no eixo X sem engrossar as lâminas. */
  stretch?: number
  /** Corta o espaço vazio acima das lâminas (unidades da grade de 160). */
  trimTop?: number
  /** Corta o espaço vazio abaixo das lâminas. */
  trimBottom?: number
  /** Usa currentColor nas quatro lâminas, em vez do vermelho + azul da marca. */
  mono?: boolean
}

export function Swoosh({
  className,
  stretch = 1,
  trimTop = 0,
  trimBottom = 0,
  mono = false,
}: SwooshProps) {
  const width = 600 * stretch
  const height = 160 - trimTop - trimBottom

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn('block h-auto w-full', className)}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <g transform={`translate(0 ${-trimTop}) scale(${stretch} 1)`}>
        {BLADES.map((blade, i) => (
          <path
            key={i}
            d={bladePath(blade)}
            fill={mono ? 'currentColor' : `hsl(var(--brand-${blade.tone}))`}
          />
        ))}
      </g>
    </svg>
  )
}
