import { Mail, MapPin, Phone } from 'lucide-react'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { CONTATO } from '@/data/empreendimentos'

export function Contato() {
  return (
    <section id="contato" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="container">
        <h2 className="sr-only">Contato</h2>

        <Reveal>
          <Eyebrow>Contato</Eyebrow>
        </Reveal>

        <div className="mt-10 grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <Reveal>
            <a
              href={CONTATO.telefoneHref}
              className="vf-figures block font-display text-[clamp(2.5rem,7vw,4.75rem)] font-light leading-none tracking-[-0.03em] text-ink transition-colors hover:text-brand-red"
            >
              {CONTATO.telefone}
            </a>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href={CONTATO.whatsappHref} target="_blank" rel="noreferrer noopener">
                <Button className="w-full sm:w-auto">Falar no WhatsApp</Button>
              </a>
              <a href={CONTATO.telefoneHref}>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Phone aria-hidden="true" />
                  Ligar agora
                </Button>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-7">
              <li className="flex gap-4 border-t border-border pt-6">
                <Mail className="mt-1 size-4 shrink-0 text-brand-navy" aria-hidden="true" />
                <div>
                  <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-neutral">
                    E-mail
                  </p>
                  <a
                    href={`mailto:${CONTATO.email}`}
                    className="mt-1 block break-all text-ink transition-colors hover:text-brand-red"
                  >
                    {CONTATO.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 border-t border-border pt-6">
                <MapPin className="mt-1 size-4 shrink-0 text-brand-navy" aria-hidden="true" />
                <div>
                  <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-neutral">
                    Endereço
                  </p>
                  <address className="mt-1 not-italic text-ink">
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
