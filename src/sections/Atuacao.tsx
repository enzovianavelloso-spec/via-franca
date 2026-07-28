import { Section } from '@/components/Section'
import { SectionHead } from '@/components/SectionHead'
import { Figura } from '@/components/motion/CountUp'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { ATUACAO, TOTAL_EMPREENDIMENTOS } from '@/data/empreendimentos'

const NOME_UF: Record<string, string> = {
  MG: 'Minas Gerais',
  SP: 'São Paulo',
  BA: 'Bahia',
}

/**
 * Onde a Via França opera hoje. Sem mapa: um mapa embutido aqui não acrescenta
 * nenhuma informação que a lista já não dê, e cobraria todo o ônus de
 * acessibilidade de um widget geográfico. Contagens e cidades saem do próprio
 * portfólio — acrescentar ou remover um empreendimento atualiza esta seção
 * sozinho.
 */
export function Atuacao() {
  return (
    <Section id="atuacao" className="overflow-hidden">
      <SectionHead
        eyebrow="Onde atuamos"
        titulo="Três estados, um mesmo padrão."
        lede={`${TOTAL_EMPREENDIMENTOS} empreendimentos entre entregues, em execução e futuros.`}
      />

      {/* O único elemento que escapa do container: o fio corre a janela inteira
          e sustenta as três colunas como um horizonte. */}
      <div className="relative mt-14 md:mt-20">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-brand-red/40"
        />

        <Stagger as="dl" className="grid gap-x-10 gap-y-12 pt-10 sm:grid-cols-3">
          {ATUACAO.map((estado, i) => (
            <StaggerItem key={estado.sigla} x={48} y={8}>
              <dt className="flex items-baseline gap-3">
                <span className="font-display text-[clamp(1.75rem,1.2rem+1.4vw,2.35rem)] font-light leading-none tracking-[-0.02em] text-ink">
                  {estado.sigla}
                </span>
                <span className="type-label">{NOME_UF[estado.sigla] ?? estado.sigla}</span>
              </dt>

              <dd className="mt-5">
                <Figura
                  para={estado.total}
                  atraso={0.15 + i * 0.08}
                  duracao={1.4}
                  className="text-[clamp(2.5rem,1.6rem+2.6vw,3.75rem)] text-brand-red"
                  rotuloAcessivel={`${estado.total} ${
                    estado.total === 1 ? 'empreendimento' : 'empreendimentos'
                  }`}
                />
                {/* A frase completa já vive no rótulo acessível da figura; aqui
                    o texto é só o eco visual dela. */}
                <p className="type-label mt-2" aria-hidden="true">
                  {estado.total === 1 ? 'empreendimento' : 'empreendimentos'}
                </p>

                <ul className="mt-6 space-y-1.5 border-t border-line-warm pt-5 text-[0.9375rem] text-ink/70">
                  {estado.cidades.map((cidade) => (
                    <li key={cidade}>{cidade}</li>
                  ))}
                </ul>
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
