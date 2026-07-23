# Via França Empreendimentos — site institucional

Landing page única (one-page, sem rotas secundárias) para a Via França Empreendimentos,
holding imobiliária de Montes Claros/MG.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS 3 · shadcn/ui (Tabs, Button) · Framer Motion.
Alias `@/` aponta para `src/`. Pronto para rodar no Lovable sem ajuste de import.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Estrutura

```
src/
  assets/                 fotos extraídas dos PDFs oficiais (portfólio + deck)
  components/
    Swoosh.tsx            as quatro lâminas da logo, em SVG paramétrico
    SwooshRule.tsx        divisor de seção — o traçado esticado de ponta a ponta
    Eyebrow.tsx           rótulo tracked com o colchete vermelho do material impresso
    Logo.tsx  Nav.tsx  Reveal.tsx
    ui/                   button.tsx, tabs.tsx (shadcn/ui)
  data/empreendimentos.ts todo o conteúdo: 10 projetos, números, contato
  sections/               Hero · QuemSomos · Numeros · Empreendimentos · Contato · Footer
```

Todo o texto e todos os dados de projeto vivem em `src/data/empreendimentos.ts` — para
atualizar o portfólio não é preciso tocar em nenhum componente.

## Identidade

| Token | Hex | HSL (`src/index.css`) | Uso |
|---|---|---|---|
| `--brand-red` | `#B31D22` | `358 72% 41%` | CTAs, colchetes, bloco de números, destaques |
| `--brand-navy` | `#38366A` | `242 33% 31%` | ícones, lâminas azuis do traçado |
| `--ink` | `#000C1D` | `215 100% 6%` | texto de corpo |
| `--paper` | `#FAFAFA` | `0 0% 98%` | fundo da seção Contato |
| `--neutral` | `#6B7280` | `220 9% 46%` | texto secundário, legendas |

Tipografia: **Fraunces** (display, peso 300–400) + **Work Sans** (corpo, rótulos e dados).
Fraunces em vez de Playfair porque é serifada de alto contraste sem ser a escolha padrão;
Work Sans em vez de Inter pelo mesmo motivo e por segurar melhor o tracking alto das
etiquetas em caixa alta.

Regras respeitadas: tema claro, sem texto em gradiente, uma página só, mobile-first,
foco visível no teclado e `prefers-reduced-motion` desligando todas as animações.

## O traçado da logo como sistema

O elemento de assinatura é o *swoosh* — as quatro lâminas vermelhas e azuis da marca,
traçadas à mão em SVG (`Swoosh.tsx`) e não recortadas do PDF, para poderem ser esticadas
e recoloridas. Ele aparece em três papéis, sempre estrutural:

1. **Divisor de seção** (`SwooshRule`) — esticado de ponta a ponta da janela, desenhado da
   esquerda para a direita quando entra em tela. É a mesma trajetória atravessando a página
   inteira, seção após seção.
2. **Marca-d'água** da faixa vermelha de Nossos Números, em branco a 13%.
3. **Lockup** da logo, no cabeçalho e no rodapé.

## Decisões de estrutura sinalizadas

- **Headline do hero** — "Transformando suas ideias em empreendimentos únicos." é frase real
  do sumário do portfólio (typo `emprendimentos` corrigido), promovida a declaração de hero.
- **Nossos Números como extrato** — em vez de quatro cartões, as quatro frases do briefing
  aparecem como um extrato: figura grande à esquerda, a frase que a qualifica à direita, um
  fio separando cada linha. Nenhuma palavra foi inventada — só reorganizada tipograficamente.
- **Título de Empreendimentos** — "Entregues, em execução e futuros." é a enumeração dos três
  grupos do próprio portfólio, usada como título para não inventar copy de marketing.
- **+16 anos de mercado** — sustentado pelo corpo de Quem Somos ("há mais de 16 anos").

## Pendências para o cliente

- **Arandu × Praia de Sto André** — o card de Arandu sobe com a nota "Denominação em
  atualização". Confirmar se um substitui o outro e remover a nota em
  `src/data/empreendimentos.ts`.
- **Fotos de baixa resolução** — Loteamento São Paulo (352 px) e Condomínio Francisco Sá
  (352 px) vieram apenas como miniatura dentro da página do PDF. Ambos já sobem com a nota
  "imagem ilustrativa" que o próprio portfólio indica, mas convém substituir por originais.
- **Atribuição de fotos** — Fazenda Paraíso, Arandu e Romagnhollo Rios usam as imagens do
  deck de projetos na ordem em que aparecem lá. Vale uma conferência do cliente.
- **Vale dos Ipês** — previsão de entrega registrada como `out/2024`, conforme o portfólio.
  Provavelmente precisa de atualização.
