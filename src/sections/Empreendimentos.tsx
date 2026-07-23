import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/Reveal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EMPREENDIMENTOS, STATUS, type Empreendimento } from '@/data/empreendimentos'

function LinhaDeDado({ rotulo, valor }: { rotulo: string; valor: string }) {
  const indefinido = valor === 'a definir'
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-border py-2.5">
      <dt className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-neutral">
        {rotulo}
      </dt>
      <dd
        className={
          indefinido
            ? 'font-sans text-[0.8125rem] italic text-neutral'
            : 'vf-figures font-sans text-[0.9375rem] font-medium text-ink'
        }
      >
        {valor}
      </dd>
    </div>
  )
}

function Card({ item }: { item: Empreendimento }) {
  return (
    <article className="group flex flex-col">
      <div className="overflow-hidden bg-paper">
        <img
          src={item.imagem}
          alt={item.alt}
          className="aspect-[3/2] w-full object-cover transition-transform ease-out [transition-duration:900ms] will-change-transform group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          loading="lazy"
        />
      </div>

      <h3 className="mt-6 font-display text-[1.625rem] font-normal leading-tight tracking-[-0.01em] text-ink">
        {item.nome}
      </h3>
      <p className="mt-1.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-neutral">
        {item.tipo} <span className="text-brand-red">·</span> {item.local}
      </p>

      <dl className="mt-6">
        <LinhaDeDado rotulo="Área total" valor={item.areaTotal} />
        <LinhaDeDado rotulo="Unidades" valor={item.unidades} />
        <LinhaDeDado rotulo="Área por unidade" valor={item.areaUnidade} />
        <LinhaDeDado rotulo={item.prazoRotulo} valor={item.prazo} />
        <div className="border-t border-border" />
      </dl>

      <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink/70">{item.descricao}</p>

      {item.nota && (
        <p className="mt-4 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-neutral">
          {item.nota}
        </p>
      )}
    </article>
  )
}

export function Empreendimentos() {
  return (
    <section id="empreendimentos" className="scroll-mt-24 pb-24 pt-16 md:pb-32 md:pt-20">
      <div className="container">
        <Reveal>
          <Eyebrow>Empreendimentos</Eyebrow>
          <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink">
            Entregues, em execução e futuros.
          </h2>
        </Reveal>

        <Tabs defaultValue="entregues" className="mt-14">
          <Reveal>
            <TabsList
              aria-label="Estágio dos empreendimentos"
              className="w-full border-b border-border"
            >
              {STATUS.map((status) => (
                <TabsTrigger key={status.id} value={status.id}>
                  {status.rotulo}
                  <span className="vf-figures ml-1.5 text-[0.5625rem] text-neutral sm:ml-2 sm:text-[0.625rem]">
                    {EMPREENDIMENTOS[status.id].length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Reveal>

          {STATUS.map((status) => (
            <TabsContent key={status.id} value={status.id} className="mt-12">
              <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
                {EMPREENDIMENTOS[status.id].map((item, i) => (
                  <Reveal key={item.id} delay={(i % 2) * 0.08}>
                    <Card item={item} />
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
