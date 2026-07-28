import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Eyebrow } from '@/components/Eyebrow'
import { BladeMark } from '@/components/BladeMark'
import { Reveal } from '@/components/motion/Reveal'
import { buttonVariants } from '@/components/ui/button'
import { HOVER_SPRING, POINTER_SPRING } from '@/lib/motion'
import { CONTATO } from '@/data/empreendimentos'
import { cn } from '@/lib/utils'

/**
 * Segunda faixa cheia da página, e a que fecha. O `rounded-t-panel` responde ao
 * `rounded-b-panel` do hero: o miolo claro lê como uma folha contínua que as
 * duas faixas vermelhas prendem em cima e embaixo.
 */
export function Contato() {
  const secao = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Semeado no meio-alto da faixa: o brilho existe antes de qualquer movimento
  // de mouse, inclusive em quem nunca move o mouse.
  const px = useMotionValue(50)
  const py = useMotionValue(35)
  const x = useSpring(px, POINTER_SPRING)
  const y = useSpring(py, POINTER_SPRING)

  const brilho = useMotionTemplate`radial-gradient(620px circle at ${x}% ${y}%, rgba(255,255,255,0.14), transparent 62%)`

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = secao.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      px.set(((e.clientX - r.left) / r.width) * 100)
      py.set(((e.clientY - r.top) / r.height) * 100)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [px, py, reduce])

  return (
    <section
      ref={secao}
      id="contato"
      className="on-wine scroll-anchor section-pad relative isolate overflow-hidden rounded-t-panel bg-gradient-to-b from-brand-wine via-brand-wine to-brand-red text-white"
    >
      <BladeMark
        indice={0}
        espessura={2.2}
        cor="#ffffff"
        className="pointer-events-none absolute -left-[10%] bottom-[8%] -z-10 w-[64%] opacity-[0.07] blur-[1px]"
      />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.055]" aria-hidden="true" />
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ backgroundImage: brilho }}
          className="pointer-events-none absolute inset-0 -z-10"
        />
      )}

      <div className="container relative">
        <Reveal>
          <Eyebrow invertido>Contato</Eyebrow>
          <h2 className="type-h2 mt-4 max-w-[20ch]">Fale com a Via França.</h2>
        </Reveal>

        <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <Reveal>
            <a
              href={CONTATO.telefoneHref}
              className="type-figure vf-figures block text-[clamp(2.5rem,7vw,4.75rem)] text-white transition-colors duration-700 ease-fluid hover:text-white/75"
            >
              {CONTATO.telefone}
            </a>

            {/* Os CTAs são links, e por isso levam o estilo de botão em vez de
                embrulhar um <button>: elemento interativo dentro de elemento
                interativo dobra as paradas de tab e confunde leitor de tela. */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <motion.a
                href={CONTATO.whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                whileHover={reduce ? undefined : { scale: 1.03 }}
                whileTap={reduce ? undefined : { scale: 0.985 }}
                transition={HOVER_SPRING}
                className={cn(
                  buttonVariants(),
                  'w-full bg-white text-brand-wine shadow-lift hover:bg-white/90 hover:text-brand-wine sm:w-auto',
                )}
              >
                Falar no WhatsApp
              </motion.a>
              <a
                href={CONTATO.telefoneHref}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'w-full border-white/35 text-white hover:border-white hover:text-white sm:w-auto',
                )}
              >
                <Phone aria-hidden="true" />
                Ligar agora
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-7">
              <li className="flex gap-4 border-t border-white/25 pt-6">
                <Mail className="mt-1 size-4 shrink-0 text-white/70" aria-hidden="true" />
                <div>
                  <p className="type-label">E-mail</p>
                  <a
                    href={`mailto:${CONTATO.email}`}
                    className="mt-1 block break-all text-white transition-colors duration-700 ease-fluid hover:text-white/75"
                  >
                    {CONTATO.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 border-t border-white/25 pt-6">
                <MapPin className="mt-1 size-4 shrink-0 text-white/70" aria-hidden="true" />
                <div>
                  <p className="type-label">Endereço</p>
                  <address className="mt-1 not-italic text-white/90">
                    {CONTATO.enderecoLinha1}
                    <br />
                    {CONTATO.enderecoLinha2}
                  </address>
                </div>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
