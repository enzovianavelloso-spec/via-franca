import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#quem-somos', rotulo: 'Quem Somos' },
  { href: '#numeros', rotulo: 'Números' },
  { href: '#empreendimentos', rotulo: 'Empreendimentos' },
  { href: '#contato', rotulo: 'Contato' },
]

export function Nav() {
  const [aberto, setAberto] = useState(false)
  const [ativo, setAtivo] = useState('')
  const [rolou, setRolou] = useState(false)
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const secoes = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    )
    const observer = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visivel) setAtivo(`#${visivel.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    secoes.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        rolou || aberto ? 'bg-white' : 'bg-transparent',
      )}
    >
      <div className="container flex h-[5.25rem] items-center justify-between">
        <a href="#topo" aria-label="Via França Empreendimentos — início">
          <Logo compact />
        </a>

        <nav aria-label="Seções do site" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={ativo === link.href ? 'true' : undefined}
                  className={cn(
                    'font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-colors',
                    ativo === link.href ? 'text-brand-red' : 'text-ink/70 hover:text-ink',
                  )}
                >
                  {link.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-ink md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
        >
          <span className="sr-only">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
          {aberto ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Progresso de leitura da página */}
      <motion.div
        className="h-px origin-left bg-brand-red"
        style={{ scaleX: reduceMotion ? 0 : scrollYProgress }}
        aria-hidden="true"
      />

      {aberto && (
        <div id="menu-mobile" className="border-t border-border bg-white md:hidden">
          <ul className="container flex flex-col py-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setAberto(false)}
                  className="block border-b border-border/70 py-4 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-ink last:border-0"
                >
                  {link.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
