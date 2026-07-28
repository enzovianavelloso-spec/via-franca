import { Swoosh } from '@/components/Swoosh'
import { cn } from '@/lib/utils'

type Tamanho = 'sm' | 'md' | 'lg'

/**
 * Lockup da marca: o traçado assentado sobre o nome, na largura do bloco de
 * texto.
 *
 * O corte antigo (trimTop 24 / trimBottom 26 a 7.25rem de largura) espremia o
 * traçado até virar fio e o cliente leu a marca como tímida. Aqui o traçado é
 * maior, mais grosso e menos cortado em todos os tamanhos — `md` é o piso, e é
 * o que o cabeçalho usa inclusive no mobile.
 */
const ESCALA: Record<
  Tamanho,
  { swoosh: string; espessura: number; nome: string; sub: string; trackingSub: string }
> = {
  sm: {
    swoosh: 'w-[8rem]',
    espessura: 1.3,
    nome: 'text-[1.0625rem]',
    sub: 'text-[0.5rem]',
    trackingSub: 'tracking-[0.28em]',
  },
  md: {
    swoosh: 'w-[9.75rem]',
    espessura: 1.35,
    nome: 'text-[1.35rem]',
    sub: 'text-[0.625rem]',
    trackingSub: 'tracking-[0.3em]',
  },
  lg: {
    swoosh: 'w-[14rem]',
    espessura: 1.4,
    nome: 'text-[1.95rem]',
    sub: 'text-[0.75rem]',
    trackingSub: 'tracking-[0.32em]',
  },
}

export function Logo({
  className,
  tamanho = 'md',
  /** Pinta o lockup inteiro de branco, para uso sobre foto ou faixa vinho. */
  invertido = false,
}: {
  className?: string
  tamanho?: Tamanho
  invertido?: boolean
}) {
  const e = ESCALA[tamanho]

  return (
    <span className={cn('inline-flex flex-col items-start', className)}>
      <Swoosh
        trimTop={16}
        trimBottom={18}
        espessura={e.espessura}
        mono={invertido}
        className={cn(e.swoosh, invertido && 'text-white')}
      />
      <span className="mt-1.5 flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-normal tracking-[0.01em]',
            e.nome,
            invertido ? 'text-white' : 'text-ink',
          )}
        >
          Via França
        </span>
        <span
          className={cn(
            'mt-[0.35em] font-sans font-medium uppercase',
            e.sub,
            e.trackingSub,
            invertido ? 'text-white/70' : 'text-neutral',
          )}
        >
          Empreendimentos
        </span>
      </span>
    </span>
  )
}
