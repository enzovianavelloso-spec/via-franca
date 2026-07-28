import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg font-sans text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-[background-color,border-color,color,box-shadow] duration-700 ease-fluid disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        /* A sombra é tingida de vermelho: lê como brilho da própria cor, não
           como sombra projetada. */
        default: 'bg-brand-red text-white shadow-glow hover:bg-brand-wine hover:shadow-glow-lg',
        outline:
          'border border-ink/20 bg-transparent text-ink hover:border-brand-red hover:text-brand-red',
        ghost: 'text-ink hover:text-brand-red',
        link: 'rounded-none text-brand-red underline-offset-4 hover:underline',
      },
      size: {
        /* Nenhum tamanho abaixo de 44px de altura: é o piso de alvo de toque. */
        default: 'h-12 px-7',
        sm: 'h-11 px-5',
        lg: 'h-14 px-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
)
Button.displayName = 'Button'

export { Button, buttonVariants }
