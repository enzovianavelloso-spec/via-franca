import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Rótulo de seção no padrão do material impresso da Via França:
 * caixa alta tracked, precedida de um colchete vermelho.
 */
export function Eyebrow({
  children,
  invertido = false,
  className,
}: {
  children: ReactNode
  invertido?: boolean
  className?: string
}) {
  return (
    <p
      className={cn(
        'font-sans text-[0.6875rem] font-medium uppercase tracking-[0.22em]',
        invertido ? 'text-white/70' : 'text-neutral',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('mr-[0.35em]', invertido ? 'text-white' : 'text-brand-red')}
      >
        [
      </span>
      {children}
    </p>
  )
}
