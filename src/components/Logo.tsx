import { Swoosh } from '@/components/Swoosh'
import { cn } from '@/lib/utils'

/**
 * Lockup da marca: o traçado da logo assentado sobre o nome, na largura do
 * bloco de texto — é assim que ele fica legível em tamanho pequeno.
 */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex flex-col items-start', className)}>
      <Swoosh
        trimTop={24}
        trimBottom={26}
        className={compact ? 'w-[7.25rem]' : 'w-[8.5rem]'}
      />
      <span className={cn('mt-1 flex flex-col leading-none', compact ? 'mt-1' : 'mt-1.5')}>
        <span
          className={cn(
            'font-display font-normal tracking-[0.01em] text-ink',
            compact ? 'text-[1.0625rem]' : 'text-xl',
          )}
        >
          Via França
        </span>
        <span
          className={cn(
            'mt-[0.35em] font-sans font-medium uppercase text-neutral',
            compact ? 'text-[0.5rem] tracking-[0.28em]' : 'text-[0.5625rem] tracking-[0.3em]',
          )}
        >
          Empreendimentos
        </span>
      </span>
    </span>
  )
}
