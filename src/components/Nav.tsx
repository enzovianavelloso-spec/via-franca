import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { SCROLL_SPRING } from '@/lib/motion'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#quem-somos', rotulo: 'Quem Somos' },
  { href: '#atuacao', rotulo: 'Atuação' },
  { href: '#numeros', rotulo: 'Números' },
  { href: '#empreendimentos', rotulo: 'Empreendimentos' },
  { href: '#contato', rotulo: 'Contato' },
]

export function Nav() {
  const [aberto, setAberto] = useState(false)
  const [ativo, setAtivo] = useState('')
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()

  /**
   * O painel nunca muda de tamanho nem de lugar — só o material aparece. Um
   * cabeçalho que encolhe ao rolar chama atenção para si; este só ganha vidro.
   * O progresso é amolecido pela mola porque `scrollY` cru faz a transição
   * andar no passo de rolagem do sistema, e o vidro pisca.
   */
  const bruto = useTransform(scrollY, [0, 150], [0, 1], { clamp: true })
  const p = useSpring(bruto, SCROLL_SPRING)

  const fundo = useTransform(p, [0, 1], ['rgba(250,248,245,0)', 'rgba(250,248,245,0.88)'])
  const borda = useTransform(p, [0, 1], ['rgba(0,12,29,0)', 'rgba(0,12,29,0.08)'])
  const filtro = useTransform(p, (v) => `blur(${20 * v}px) saturate(${100 + 80 * v}%)`)
  const sombra = useTransform(
    p,
    (v) =>
      `0 ${18 * v}px ${50 * v}px -${30 * v}px rgba(0,12,29,${0.28 * v}), inset 0 1px 0 rgba(255,255,255,${0.7 * v})`,
  )

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

  useEffect(() => {
    if (!aberto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberto])

  // Sem movimento, o painel já nasce sólido: sobre a foto do hero, links
  // transparentes sem o vidro atrás seriam ilegíveis.
  const estatico = reduceMotion || aberto

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-[clamp(10px,1.6vw,22px)] pt-[clamp(10px,1.4vw,18px)]">
      <motion.div
        style={
          estatico
            ? undefined
            : {
                backgroundColor: fundo,
                borderColor: borda,
                backdropFilter: filtro,
                WebkitBackdropFilter: filtro,
                boxShadow: sombra,
              }
        }
        className={cn(
          'mx-auto flex h-[5.75rem] max-w-[1280px] items-center justify-between gap-5 rounded-2xl border px-[clamp(16px,2.4vw,34px)]',
          estatico && 'border-line-warm bg-paper/95 shadow-glass backdrop-blur-xl',
        )}
      >
        {/* O hero é claro por desenho — véus de bone sobre a foto — então o
            lockup é sempre o escuro. Nada de inverter a marca no meio do
            caminho: ela já vinha sendo lida como tímida. */}
        <a
          href="#topo"
          aria-label="Via França Empreendimentos — início"
          className="-my-2 flex items-center py-2"
        >
          <Logo tamanho="md" />
        </a>

        <nav aria-label="Seções do site" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => {
              const selecionado = ativo === link.href
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={selecionado ? 'true' : undefined}
                    className={cn(
                      'relative py-2 font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-colors',
                      'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-brand-red after:transition-transform after:duration-500 after:ease-fluid',
                      'hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100',
                      selecionado
                        ? 'text-brand-red after:origin-left after:scale-x-100'
                        : 'text-ink/70 hover:text-ink',
                    )}
                  >
                    {link.rotulo}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-md text-ink md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
        >
          <span className="sr-only">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
          {aberto ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </motion.div>

      {aberto && (
        <div
          id="menu-mobile"
          className="glass mx-auto mt-2 max-w-[1280px] overflow-hidden rounded-2xl border border-line-warm bg-paper/95 shadow-glass md:hidden"
        >
          <ul className="flex flex-col p-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setAberto(false)}
                  className="block rounded-md px-4 py-4 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-white"
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
