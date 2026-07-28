import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Section } from '@/components/Section'
import { SectionHead } from '@/components/SectionHead'
import { Reveal } from '@/components/motion/Reveal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTiltFoto } from '@/hooks/useTiltFoto'
import { FLUID, HOVER_SPRING, SCROLL_SPRING } from '@/lib/motion'
import { EMPREENDIMENTOS, STATUS, type Empreendimento, type Fase } from '@/data/empreendimentos'
import { cn } from '@/lib/utils'

function LinhaDeDado({
  rotulo,
  valor,
  selo,
}: {
  rotulo: string
  valor: string
  selo?: Fase['situacao']
}) {
  const indefinido = valor === 'a definir'
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-line-cool py-2.5">
      <dt className="type-label flex items-baseline gap-2">
        {rotulo}
        {selo && (
          /* Nunca só a cor: o selo carrega a palavra. */
          <span
            className={cn(
              'rounded-sm px-1.5 py-0.5 text-[0.5625rem] tracking-[0.12em]',
              selo === 'entregue'
                ? 'bg-brand-navy/10 text-brand-navy'
                : 'bg-brand-red/10 text-brand-red',
            )}
          >
            {selo === 'entregue' ? 'Entregue' : 'Em execução'}
          </span>
        )}
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

function Card({ item, numero, invertido }: { item: Empreendimento; numero: number; invertido: boolean }) {
  const quadro = useRef<HTMLDivElement>(null)
  /**
   * A ref da cortina fica no wrapper NÃO recortado, de propósito: um `clip-path`
   * dentro de um pai com `overflow-hidden` corrompe a medição do
   * IntersectionObserver e a foto nunca aparece.
   */
  const gatilho = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const emTela = useInView(gatilho, { once: true, amount: 0.3 })

  // A foto deriva devagar dentro do próprio quadro — a grade respira sem se mexer.
  const { scrollYProgress: progressoBruto } = useScroll({
    target: quadro,
    offset: ['start end', 'end start'],
  })
  const scrollYProgress = useSpring(progressoBruto, SCROLL_SPRING)
  const deriva = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  // Camada separada: o scroll desloca em %, o mouse desloca em px — não dá
  // para acumular os dois no mesmo eixo `y` do Framer Motion.
  const tilt = useTiltFoto(8)

  // A cortina abre na direção da leitura da coluna: da esquerda na coluna
  // esquerda, da direita na direita.
  const oculto = invertido ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
  const visivel = 'inset(0 0% 0 0%)'

  return (
    <article className="group flex flex-col">
      {/* Duas responsabilidades, dois elementos: o de fora faz a física do
          hover (mola), o de dentro faz a cortina (curva longa). Juntos, a
          duração de 1.1s da cortina vazaria para o hover e a mola vazaria para
          a cortina. */}
      <motion.div
        ref={gatilho}
        whileHover={reduceMotion ? undefined : { y: -8 }}
        transition={HOVER_SPRING}
      >
        <motion.div
          ref={quadro}
          className="blade-marks relative aspect-[3/2] overflow-hidden rounded-2xl bg-surface shadow-lift"
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          initial={reduceMotion ? undefined : { clipPath: oculto }}
          animate={reduceMotion ? undefined : { clipPath: emTela ? visivel : oculto }}
          transition={{ duration: 1.1, ease: FLUID }}
        >
          <motion.div
            className="absolute inset-x-0 top-[-6%] h-[112%]"
            style={reduceMotion ? undefined : { y: deriva }}
          >
            <motion.img
              src={item.imagem}
              alt={item.alt}
              width={1200}
              height={800}
              className="size-full object-cover transition-transform ease-fluid [transition-duration:1100ms] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              style={reduceMotion ? undefined : { x: tilt.x, y: tilt.y }}
              loading="lazy"
            />
          </motion.div>
          {/* Véu de base: unifica fotos de origens diferentes — algumas são
              aéreas de satélite, outras fotografias. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,12,29,0.3),rgba(0,12,29,0.05)_50%,transparent_76%)]"
          />
        </motion.div>
      </motion.div>

      <div className="relative mt-6">
        {/* Numeral fantasma: ordena a leitura sem competir com o nome. O índice
            é derivado da lista, então remover um projeto não deixa buraco. */}
        <span
          aria-hidden="true"
          className="type-figure pointer-events-none absolute -left-4 -top-9 select-none text-[clamp(3.75rem,6.5vw,5.75rem)] text-ink opacity-[0.045]"
        >
          {String(numero).padStart(2, '0')}
        </span>

        <h3 className="relative font-display text-[1.625rem] font-normal leading-tight tracking-[-0.01em] text-ink">
          {item.nome}
        </h3>
        <p className="type-label relative mt-1.5">
          {item.tipo} <span className="text-brand-red">·</span> {item.local}
        </p>
      </div>

      <dl className="mt-6">
        <LinhaDeDado rotulo="Área total" valor={item.areaTotal} />
        {item.fases ? (
          item.fases.map((fase) => (
            <LinhaDeDado
              key={fase.rotulo}
              rotulo={fase.rotulo}
              valor={fase.unidades}
              selo={fase.situacao}
            />
          ))
        ) : (
          <LinhaDeDado rotulo="Unidades" valor={item.unidades} />
        )}
        <LinhaDeDado rotulo="Área por unidade" valor={item.areaUnidade} />
        <LinhaDeDado rotulo={item.prazoRotulo} valor={item.prazo} />
        <div className="border-t border-line-cool" />
      </dl>

      <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink/70">{item.descricao}</p>

      {item.nota && (
        <p className="type-label mt-4 tracking-[0.14em]">{item.nota}</p>
      )}
    </article>
  )
}

export function Empreendimentos() {
  return (
    <Section id="empreendimentos">
      <SectionHead eyebrow="Empreendimentos" titulo="Entregues, em execução e futuros." />

      <Tabs defaultValue="entregues" className="mt-14">
        <Reveal>
          <TabsList
            aria-label="Estágio dos empreendimentos"
            className="w-full border-b border-line-warm"
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
            {/* A coluna da direita desce um pouco: as duas param de marchar juntas. */}
            <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 md:gap-x-16">
              {EMPREENDIMENTOS[status.id].map((item, i) => (
                <Reveal
                  key={item.id}
                  delay={(i % 2) * 0.08}
                  className={i % 2 === 1 ? 'md:mt-24' : undefined}
                >
                  <Card item={item} numero={i + 1} invertido={i % 2 === 1} />
                </Reveal>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  )
}
