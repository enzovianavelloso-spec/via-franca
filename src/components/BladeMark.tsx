import { BLADES, bladePath, engrossar } from '@/components/Swoosh'
import { cn } from '@/lib/utils'

/**
 * Uma lâmina isolada do traçado da marca. É o mesmo desenho oficial do Swoosh,
 * recortado — usado em escala grande como marca-d'água atrás das faixas e do
 * hero. Nenhum asset novo: o motivo da página é literalmente a logo, ampliada.
 *
 * A lâmina 0 é a mais longa e a que melhor lê sozinha; as outras existem para
 * variação quando duas marcas-d'água aparecem perto uma da outra.
 */
export function BladeMark({
  className,
  indice = 0,
  espessura = 1.6,
  espelhado = false,
  cor,
}: {
  className?: string
  indice?: 0 | 1 | 2 | 3
  espessura?: number
  espelhado?: boolean
  /** Qualquer cor CSS. Sem isto, usa o tom oficial da lâmina escolhida. */
  cor?: string
}) {
  const blade = engrossar(BLADES[indice], espessura)
  const { from, to, top, bottom } = blade

  // Caixa justa em torno da lâmina, para que a marca-d'água não carregue
  // centenas de unidades de vazio e possa ser posicionada com precisão.
  const xs = [from[0], to[0], top[0], bottom[0]]
  const ys = [from[1], to[1], top[1], bottom[1]]
  const x = Math.min(...xs) - 6
  const y = Math.min(...ys) - 6
  const w = Math.max(...xs) - x + 6
  const h = Math.max(...ys) - y + 6

  return (
    <svg
      viewBox={`${x} ${y} ${w} ${h}`}
      className={cn('block h-auto w-full', espelhado && 'scale-x-[-1]', className)}
      role="presentation"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <path d={bladePath(blade)} fill={cor ?? `hsl(var(--brand-${BLADES[indice].tone}))`} />
    </svg>
  )
}
