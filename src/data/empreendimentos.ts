import estanciaReal from '@/assets/estancia-real.jpg'
import reservaReal from '@/assets/reserva-real.jpg'
import condominiosDeCasas from '@/assets/condominios-de-casas.jpg'
import diamond from '@/assets/diamond.jpg'
import valeDosIpes from '@/assets/vale-dos-ipes.jpg'
import fazendaParaiso from '@/assets/fazenda-paraiso.jpg'
import arandu from '@/assets/arandu.jpg'
import loteamentoSaoPaulo from '@/assets/loteamento-sao-paulo.jpg'
import condominioFranciscoSa from '@/assets/condominio-francisco-sa.jpg'
import romagnholloRios from '@/assets/romagnhollo-rios.jpg'

export type StatusId = 'entregues' | 'execucao' | 'futuros'

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
    },
  ],
  execucao: [
    {
      id: 'vale-dos-ipes',
      nome: 'Vale dos Ipês',
      tipo: 'Loteamento',
      local: 'Montes Claros/MG',
      areaTotal: '+36.000 m²',
      unidades: '87 lotes',
      areaUnidade: '+200 m²',
      prazoRotulo: 'Previsão',
      prazo: 'out/2024',
      descricao:
        'Loteamento com foco em ser um bairro planejado próximo às faculdades na cidade de Montes Claros.',
      imagem: valeDosIpes,
      alt: 'Imagem aérea de satélite do terreno do Vale dos Ipês, com o perímetro do loteamento demarcado.',
    },
    {
      id: 'fazenda-paraiso',
      nome: 'Fazenda Paraíso',
      tipo: 'Condomínio Rural',
      local: 'Juquiá/SP',
      areaTotal: '+8.000.000 m²',
      unidades: '336 lotes',
      areaUnidade: '+2.000 m²',
      prazoRotulo: 'Previsão',
      prazo: '1ª fase entregue meados de 2024',
      descricao:
        'Condomínio de chácara para público de classe média alta de São Paulo. Serão 258 chácaras totais, divididas em duas etapas, sendo a primeira já em comercialização, com 78 chácaras.',
      imagem: fazendaParaiso,
      alt: 'Vista aérea de extensa área de coqueiros e vegetação nativa da Fazenda Paraíso.',
    },
  ],
  futuros: [
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
      alt: 'Praia deserta ao amanhecer na Costa do Descobrimento, sul da Bahia.',
      nota: 'Denominação em atualização.',
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
      nome: 'Condomínio Francisco Sá',
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
      id: 'romagnhollo-rios',
      nome: 'Condomínio Romagnhollo Rios',
      tipo: 'Condomínio fechado',
      local: 'Araxá/MG',
      areaTotal: '+65.000 m²',
      unidades: A_DEFINIR,
      areaUnidade: A_DEFINIR,
      prazoRotulo: 'Previsão',
      prazo: A_DEFINIR,
      descricao: 'Condomínio fechado de lotes.',
      imagem: romagnholloRios,
      alt: 'Vista aérea da cidade de Araxá, em Minas Gerais.',
      nota: 'Imagem ilustrativa.',
    },
  ],
}

export const NUMEROS = [
  { figura: '+500', complemento: 'milhões', rotulo: 'de VGV' },
  { figura: '+1.500', complemento: '', rotulo: 'unidades imobiliárias' },
  { figura: '+9', complemento: 'milhões', rotulo: 'de m²' },
  { figura: '+16', complemento: '', rotulo: 'anos de mercado' },
]

export const CONTATO = {
  telefone: '(38) 99808-6450',
  telefoneHref: 'tel:+5538998086450',
  whatsappHref: 'https://wa.me/5538998086450',
  email: 'contato@viafrancaempreendimentos.com.br',
  enderecoLinha1: 'R. Santa Bernadete, 720 — Todos Os Santos',
  enderecoLinha2: 'Montes Claros - MG, 39400-138',
}
