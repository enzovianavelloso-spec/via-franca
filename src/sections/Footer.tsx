import { Logo } from '@/components/Logo'

const ANCORAS = [
  { href: '#quem-somos', rotulo: 'Quem Somos' },
  { href: '#numeros', rotulo: 'Números' },
  { href: '#empreendimentos', rotulo: 'Empreendimentos' },
  { href: '#contato', rotulo: 'Contato' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-white py-12">
      <div className="container flex flex-col gap-y-8 md:flex-row md:items-center md:justify-between">
        <Logo />

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {ANCORAS.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-neutral transition-colors hover:text-brand-red"
                >
                  {a.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container mt-10 border-t border-border pt-6">
        <p className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-neutral">
          © {new Date().getFullYear()} Via França Empreendimentos · Montes Claros / MG
        </p>
      </div>
    </footer>
  )
}
