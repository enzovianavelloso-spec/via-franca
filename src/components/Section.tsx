import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Casca de seção. Antes cada seção repetia à mão o seu próprio
 * `scroll-mt-24 pb-24 pt-16 md:pb-32 md:pt-20`, e os valores tinham divergido
 * entre elas — o ritmo vertical da página não era um sistema, era um acaso.
 * Agora todo mundo respira pelo mesmo `.section-pad`.
 */
export function Section({
  children,
  id,
  className,
  containerClassName,
  /** Marca a subárvore como sobre a faixa vinho: foco, filete e rótulos viram claros. */
  sobreVinho = false,
}: {
  children: ReactNode
  id?: string
  className?: string
  containerClassName?: string
  sobreVinho?: boolean
}) {
  return (
    <section
      id={id}
      className={cn('section-pad scroll-anchor relative', sobreVinho && 'on-wine', className)}
    >
      <div className={cn('container relative', containerClassName)}>{children}</div>
    </section>
  )
}
