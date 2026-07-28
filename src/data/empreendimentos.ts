import estanciaReal from '@/assets/estancia-real.webp'
import reservaReal from '@/assets/reserva-real.webp'
import condominiosDeCasas from '@/assets/condominios-de-casas.webp'
import diamond from '@/assets/diamond.webp'
import valeDosIpes from '@/assets/vale-dos-ipes.webp'
import fazendaParaisoEntregue from '@/assets/fazenda-paraiso-entregue.webp'
import fazendaParaisoFuturo from '@/assets/fazenda-paraiso-futuro.webp'
import arandu from '@/assets/arandu-real.webp'
import loteamentoSaoPaulo from '@/assets/loteamento-sao-paulo.webp'
import condominioFranciscoSa from '@/assets/condominio-francisco-sa.webp'
import condominioLagosBetim from '@/assets/condominio-lagos-betim.webp'

export type StatusId = 'entregues' | 'execucao' | 'futuros'

/**
 * Empreendimento entregue por etapas. Quando presente, a ficha do card troca a
 * linha única de unidades por uma linha por etapa, cada uma com sua situação —
 * é a única forma de mostrar que parte do projeto já foi entregue sem duplicá-lo
 * na aba Entregues e inflar a contagem do portfólio.
 */
export type Fase = {
  rotulo: string
  situacao: 'entregue' | 'execucao'
  unidades: string
}

export type Empreendimento = {
  id: string
  nome: string
  tipo: string
  local: string
  areaTotal: string
  unidades: string
  areaUnidade: string
  prazoRotulo: string
  prazo: string
  descricao: string
  imagem: string
  /** Texto alternativo da foto. */
  alt: string
  /** Ressalva editorial exibida como nota de rodapé do card. */
  nota?: string
  /** Etapas do projeto. Substitui a linha `unidades` quando definida. */
  fases?: Fase[]
  /**
   * Quantos empreendimentos reais este card representa na contagem da Atuação
   * (ex.: "Condomínios de Casas" agrupa 4 vilas em 1 card). Padrão: 1.
   */
  conta?: number
}

export const STATUS: { id: StatusId; rotulo: string }[] = [
  { id: 'entregues', rotulo: 'Entregues' },
  { id: 'execucao', rotulo: 'Em execução' },
  { id: 'futuros', rotulo: 'Futuros' },
]

const A_DEFINIR = 'a definir'

export const EMPREENDIMENTOS: Record<StatusId, Empreendimento[]> = {
  entregues: [
    {
      id: 'estancia-real',
      nome: 'Estância Real',
      tipo: 'Condomínio de chácaras',
      local: 'Montes Claros/MG',
      areaTotal: '+250.000 m²',
      unidades: '98 chácaras',
      areaUnidade: '+2.000 m²',
      prazoRotulo: 'Entrega',
      prazo: 'meados de 2013',
      descricao:
        'O condomínio desenvolvido para quem sempre sonhou em ter um espaço maior para curtir a família e a natureza, sem precisar abrir mão da segurança e da proximidade com a cidade.',
      imagem: estanciaReal,
      alt: 'Área de lazer arborizada do condomínio Estância Real, com playground de madeira e quadra ao fundo.',
    },
    {
      id: 'reserva-real',
      nome: 'Reserva Real',
      tipo: 'Loteamento',
      local: 'Montes Claros/MG',
      areaTotal: '+160.000 m²',
      unidades: '423 lotes',
      areaUnidade: '+200 m²',
      prazoRotulo: 'Entrega',
      prazo: 'meados de 2015',
      descricao:
        'Bairro planejado de classe média localizado em região de amplo crescimento na cidade de Montes Claros.',
      imagem: reservaReal,
      alt: 'Vista aérea do loteamento Reserva Real, com ruas arborizadas e casas em diferentes estágios de construção.',
    },
    {
      id: 'condominios-de-casas',
      nome: 'Condomínios de Casas',
      tipo: 'Condomínio',
      local: 'Montes Claros/MG',
      areaTotal: '+20.000 m²',
      unidades: '120 casas',
      areaUnidade: '132 m²',
      prazoRotulo: 'Entrega',
      prazo: 'meados de 2022',
      descricao:
        'Foram vendidas 120 casas divididas em 4 empreendimentos: Vila Norte Mineira (28 casas), Vila dos Hibiscos (30 casas), Vila dos Girassóis (32 casas) e Vila dos Lagos (30 casas).',
      imagem: condominiosDeCasas,
      alt: 'Vista aérea de uma rua interna de condomínio de casas térreas em Montes Claros.',
      conta: 4,
    },
    {
      id: 'diamond',
      nome: 'Diamond',
      tipo: 'Condomínio de lotes',
      local: 'Montes Claros/MG',
      areaTotal: '+55.000 m²',
      unidades: '110 lotes',
      areaUnidade: '+300 m²',
      prazoRotulo: 'Entrega',
      prazo: 'meados de 2023',
      descricao: 'Condomínio de alto padrão em região nobre da cidade de Montes Claros.',
      imagem: diamond,
      alt: 'Portaria do condomínio Diamond, com pilares brancos e acobreados contra o céu azul.',
      fases: [
        { rotulo: '1ª fase', situacao: 'entregue', unidades: '37 lotes' },
        { rotulo: '2ª fase', situacao: 'entregue', unidades: '37 lotes' },
        { rotulo: '3ª fase', situacao: 'entregue', unidades: '36 lotes' },
      ],
      conta: 3,
    },
    {
      id: 'vale-dos-ipes',
      nome: 'Vale dos Ipês',
      tipo: 'Loteamento',
      local: 'Montes Claros/MG',
      areaTotal: '+36.000 m²',
      unidades: '87 lotes',
      areaUnidade: '+200 m²',
      prazoRotulo: 'Entrega',
      prazo: 'out/2024',
      descricao:
        'Loteamento com foco em ser um bairro planejado próximo às faculdades na cidade de Montes Claros.',
      imagem: valeDosIpes,
      alt: 'Imagem aérea de satélite do terreno do Vale dos Ipês, com o perímetro do loteamento demarcado.',
    },
    {
      id: 'fazenda-paraiso-1a-fase',
      nome: 'Fazenda Paraíso — 1ª fase',
      tipo: 'Condomínio Rural',
      local: 'Juquiá/SP',
      areaTotal: '+8.000.000 m²',
      unidades: '87 lotes',
      areaUnidade: '+2.000 m²',
      prazoRotulo: 'Entrega',
      prazo: A_DEFINIR,
      descricao:
        'Condomínio de chácara para público de classe média alta de São Paulo. Primeira fase entregue, com 87 lotes.',
      imagem: fazendaParaisoEntregue,
      alt: 'Piscina do condomínio Fazenda Paraíso, cercada de palmeiras imperiais e paisagismo tropical.',
      nota: 'Números da etapa conforme atualização do cliente — total a confirmar.',
    },
  ],
  execucao: [
    {
      id: 'arandu',
      nome: 'Arandu',
      tipo: 'Condomínio na praia',
      local: 'Mogiquiçaba/BA',
      areaTotal: '+150.000 m²',
      unidades: '132 lotes',
      areaUnidade: '+600 m²',
      prazoRotulo: 'Previsão',
      prazo: '2026',
      descricao:
        'O condomínio Arandu está localizado no vetor de crescimento da Costa do Descobrimento, próximo a vários condomínios de luxo, além de praias exclusivas e restaurantes premiados.',
      imagem: arandu,
      alt: 'Vista aérea do condomínio Arandu, com extenso coqueiral e estrutura de apoio entre a vegetação.',
      nota: 'Denominação em atualização.',
    },
  ],
  futuros: [
    {
      id: 'fazenda-paraiso-2a-fase',
      nome: 'Fazenda Paraíso — 2ª fase',
      tipo: 'Condomínio Rural',
      local: 'Juquiá/SP',
      areaTotal: '+8.000.000 m²',
      unidades: '336 lotes',
      areaUnidade: '+2.000 m²',
      prazoRotulo: 'Previsão',
      prazo: A_DEFINIR,
      descricao:
        'Segunda fase do condomínio de chácara Fazenda Paraíso, com 336 lotes, para público de classe média alta de São Paulo.',
      imagem: fazendaParaisoFuturo,
      alt: 'Pôr do sol visto de barco no rio que margeia a Fazenda Paraíso.',
      nota: 'Números da etapa conforme atualização do cliente — total a confirmar.',
    },
    {
      id: 'loteamento-sao-paulo',
      nome: 'Loteamento São Paulo',
      tipo: 'Loteamento',
      local: 'São Paulo Capital, Guarapiranga, Parelheiros/SP',
      areaTotal: '+250.000 m²',
      unidades: A_DEFINIR,
      areaUnidade: A_DEFINIR,
      prazoRotulo: 'Previsão',
      prazo: A_DEFINIR,
      descricao: 'Loteamento popular próximo à lagoa de Guarapiranga.',
      imagem: loteamentoSaoPaulo,
      alt: 'Vista aérea da represa de Guarapiranga, com margens arborizadas e a cidade ao fundo.',
      nota: 'Imagem ilustrativa — fonte: Jornal Zona Sul.',
    },
    {
      id: 'condominio-francisco-sa',
      nome: 'Parque dos Namorados',
      tipo: 'Condomínio',
      local: 'Francisco Sá/MG',
      areaTotal: '+33.000 m²',
      unidades: A_DEFINIR,
      areaUnidade: A_DEFINIR,
      prazoRotulo: 'Previsão',
      prazo: A_DEFINIR,
      descricao: 'Condomínio fechado de lotes.',
      imagem: condominioFranciscoSa,
      alt: 'Vista aérea da malha urbana de Francisco Sá, em Minas Gerais.',
      nota: 'Imagem ilustrativa — fonte: Pinterest.',
    },
    {
      id: 'condominio-02-lagos',
      nome: 'Condomínio 02 Lagos',
      tipo: 'Condomínio',
      local: 'Betim/MG',
      areaTotal: A_DEFINIR,
      unidades: A_DEFINIR,
      areaUnidade: A_DEFINIR,
      prazoRotulo: 'Previsão',
      prazo: A_DEFINIR,
      descricao: 'Condomínio fechado de lotes, próximo aos bairros Marimbá, Califórnia e Santo Afonso.',
      imagem: condominioLagosBetim,
      alt: 'Masterplan aéreo do Condomínio 02 Lagos, em Betim, com malha viária radial e duas lagoas centrais.',
      nota: 'Imagem ilustrativa — render do masterplan.',
    },
  ],
}

/** Sigla do estado extraída do campo `local` — sempre o trecho após a última barra. */
function uf(local: string) {
  return local.slice(local.lastIndexOf('/') + 1).trim()
}

/**
 * Atuação por estado, derivada do portfólio em tempo de render. Contagens e
 * cidades nunca são escritas à mão: remover ou acrescentar um empreendimento
 * acima já atualiza a seção Atuação sozinho.
 */
export const ATUACAO = (() => {
  const porUf = new Map<string, { total: number; cidades: string[] }>()

  for (const lista of Object.values(EMPREENDIMENTOS)) {
    for (const emp of lista) {
      const sigla = uf(emp.local)
      const entrada = porUf.get(sigla) ?? { total: 0, cidades: [] }
      entrada.total += emp.conta ?? 1
      // `local` pode listar vários distritos ("São Paulo Capital, Guarapiranga,
      // Parelheiros/SP"); para a Atuação basta o primeiro.
      const cidade = emp.local.slice(0, emp.local.lastIndexOf('/')).split(',')[0].trim()
      if (cidade && !entrada.cidades.includes(cidade)) entrada.cidades.push(cidade)
      porUf.set(sigla, entrada)
    }
  }

  return [...porUf.entries()]
    .map(([sigla, { total, cidades }]) => ({ sigla, total, cidades }))
    .sort((a, b) => b.total - a.total)
})()

/** Total de empreendimentos no portfólio, somando as três abas. */
export const TOTAL_EMPREENDIMENTOS = Object.values(EMPREENDIMENTOS).reduce(
  (soma, lista) => soma + lista.length,
  0,
)

/**
 * Os quatro números do briefing. Guardados como valor numérico — e não como
 * string pré-formatada — para que a figura possa ser contada em tela e a régua
 * embaixo dela encher no mesmo motion value.
 */
export const NUMEROS = [
  { valor: 500, milhar: false, complemento: 'milhões', rotulo: 'de VGV' },
  { valor: 1500, milhar: true, complemento: '', rotulo: 'unidades imobiliárias' },
  { valor: 9, milhar: false, complemento: 'milhões', rotulo: 'de m²' },
  { valor: 16, milhar: false, complemento: '', rotulo: 'anos de mercado' },
]

export const CONTATO = {
  telefone: '(38) 99808-6450',
  telefoneHref: 'tel:+5538998086450',
  whatsappHref: 'https://wa.me/5538998086450',
  email: 'contato@viafrancaempreendimentos.com.br',
  enderecoLinha1: 'R. Santa Bernadete, 720 — Todos Os Santos',
  enderecoLinha2: 'Montes Claros - MG, 39400-138',
}
