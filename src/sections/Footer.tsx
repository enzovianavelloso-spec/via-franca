import { Logo } from '@/components/Logo'
import { Reveal } from '@/components/motion/Reveal'

const ANCORAS = [
  { href: '#quem-somos', rotulo: 'Quem Somos' },
  { href: '#atuacao', rotulo: 'Atuação' },
  { href: '#numeros', rotulo: 'Números' },
  { href: '#empreendimentos', rotulo: 'Empreendimentos' },
  { href: '#contato', rotulo: 'Contato' },
]

/**
 * O rodapé é onde espaço é de graça, então é onde o lockup aparece grande — a
 * única vez na página em que a marca é lida em tamanho de assinatura.
 */
export function Footer() {
  return (
    <footer className="relative bg-brand-red pb-12 pt-16 text-white">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />

      <div className="container relative flex flex-col gap-y-10 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Logo tamanho="lg" invertido />
        </Reveal>

        <Reveal delay={0.08}>
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {ANCORAS.map((a) => (
                <li key={a.href}>
                  <a
                    href={a.href}
                    className="relative inline-block py-1 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/75 transition-colors duration-500 ease-fluid hover:text-white after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-white after:transition-transform after:duration-500 after:ease-fluid hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100"
                  >
                    {a.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </div>

      <div className="container relative mt-12 border-t border-white/25 pt-6">
        <p className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-white/70">
          © {new Date().getFullYear()} Via França Empreendimentos · Montes Claros / MG
        </p>
      </div>
    </footer>
  )
}
