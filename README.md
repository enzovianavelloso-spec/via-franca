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
    BladeMark.tsx         uma lâmina isolada, para marca-d'água
    SwooshRule.tsx        divisor de seção — o traçado esticado de ponta a ponta
    Eyebrow.tsx           rótulo tracked com o colchete vermelho do material impresso
    Section.tsx           casca de seção: ritmo vertical e container
    SectionHead.tsx       a tríade eyebrow + título + lede
    Logo.tsx  Nav.tsx
    motion/               Reveal · Stagger · CountUp · ReadingProgress
    ui/                   button.tsx, tabs.tsx (shadcn/ui)
  lib/motion.ts           curvas, molas e durações — todo o vocabulário de movimento
  data/empreendimentos.ts todo o conteúdo: 9 projetos, números, atuação, contato
  sections/               Hero · QuemSomos · Atuacao · Numeros · Empreendimentos · Contato · Footer
og-source.html            fonte da imagem de compartilhamento (não entra no build)
```

Todo o texto e todos os dados de projeto vivem em `src/data/empreendimentos.ts` — para
atualizar o portfólio não é preciso tocar em nenhum componente. As contagens da seção
Atuação e os numerais dos cards são derivados desse array em tempo de render, então
acrescentar ou remover um empreendimento atualiza a página sozinho.

## Identidade

Direção: **luxo claro** — folha de papel quente com duas faixas vermelhas cheias
ancorando o ritmo. Guia completo em [BRAND.md](BRAND.md).

| Token | Hex | HSL (`src/index.css`) | Uso |
|---|---|---|---|
| `--brand-red` | `#B31D22` | `358 72% 41%` | CTAs, colchetes, acento, topo das faixas |
| `--brand-wine` | `#7A1418` | `356 71% 28%` | base das faixas cheias |
| `--red-on-dark` | `#E2555A` | `358 70% 61%` | único vermelho legível sobre a faixa vinho |
| `--brand-navy` | `#38366A` | `242 33% 31%` | traços: ícones, lâminas azuis, marca de canto |
| `--ink` | `#000C1D` | `215 100% 6%` | texto de corpo |
| `--paper` | `#FAF8F5` | `36 30% 97%` | fundo padrão — bone quente |
| `--surface` | `#FFFFFF` | `0 0% 100%` | reservado a cartões elevados |
| `--neutral` | `#5C6672` | `220 10% 40%` | texto secundário — `#6B7280` reprovava AA sobre bone |
| `--radius` | `18px` | — | raiz da escala de raio, derivada por `calc()` |

Tipografia: **Fraunces** (display) + **Work Sans** (corpo, rótulos e dados). Fraunces em vez
de Playfair porque é serifada de alto contraste sem ser a escolha padrão; Work Sans em vez de
Inter pelo mesmo motivo e por segurar melhor o tracking alto das etiquetas em caixa alta. Os
eixos variáveis `SOFT` e `WONK` estão ligados: a mesma família serve de título (`WONK 1`),
figura numérica (`WONK 0` + `tnum`) e lede itálico (`SOFT 40`).

Regras respeitadas: tema claro, sem texto em gradiente, uma página só, mobile-first,
foco visível no teclado e `prefers-reduced-motion` desligando todas as animações.

### Verificado nesta versão

- `tsc --noEmit` e `npm run build` limpos.
- axe-core 4.10: **zero violações** com a página inteira revelada.
- Contraste medido em **pixel composto** sobre a foto do hero (foto + duotone + véus):
  corpo 11.4:1 no desktop e 12.0:1 a 375px; o "únicos." vermelho 4.1:1 e 4.4:1, contra
  o piso de 3:1 de texto grande.
- `prefers-reduced-motion`: nenhum bloco preso invisível, contadores já nos valores
  finais, barra de progresso removida.
- Sem scroll horizontal em 375 / 768 / 1024 / 1440.
- Teclado: ordem de tabulação correta, foco visível em todas as paradas, drawer mobile
  fecha com Esc e devolve o scroll do body.

## O traçado da logo como sistema

O elemento de assinatura é o *swoosh* — as quatro lâminas vermelhas e azuis da marca,
traçadas à mão em SVG (`Swoosh.tsx`) e não recortadas do PDF, para poderem ser esticadas
e recoloridas. Ele aparece em quatro papéis, sempre estrutural:

1. **Lockup** da logo, no cabeçalho e no rodapé.
2. **Divisor de seção** (`SwooshRule`) — esticado de ponta a ponta da janela, desenhado da
   esquerda para a direita quando entra em tela. É a mesma trajetória atravessando a página
   inteira, seção após seção.
3. **Marca-d'água** — o traçado inteiro em escala arquitetônica atrás do hero, e em branco
   a 13% na faixa de Nossos Números.
4. **Marca de canto** (`.blade-marks`) — em fotos e cards, dois cantos apenas.

O traçado tem uma prop `espessura` que afasta as curvas de controle em torno do eixo da
lâmina. Existe porque a geometria oficial é fina: reduzida ao tamanho do cabeçalho ela vira
fio, e o cliente leu a marca como tímida. Ampliar sem engrossar só deixa o fio mais comprido.

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

### Abertas nesta rodada

- **Fazenda Paraíso — os números não fecham.** O cliente informou 1ª etapa entregue com
  **87 lotes** e 2ª fase em execução com **336 lotes**. A descrição anterior dizia "258
  chácaras totais, a primeira com 78", e o campo `unidades` registrava `336 lotes` como
  total. A ficha foi reescrita com os números novos (total `423 lotes`) e a frase 258/78
  removida, mas os quatro números precisam de confirmação. O card sobe com nota de ressalva.
- **Fazenda Paraíso — previsão da 2ª fase.** A 1ª etapa virou linha de fase e o campo de
  previsão ficou `a definir`.
- **`og:image` sem domínio.** `index.html` aponta para `/og.png`, caminho relativo. Trocar
  por URL absoluta quando o domínio definitivo estiver definido — alguns raspadores não
  resolvem relativo.

### Anteriores

- **Arandu × Praia de Sto André** — o card de Arandu sobe com a nota "Denominação em
  atualização". Confirmar se um substitui o outro e remover a nota em
  `src/data/empreendimentos.ts`.
- **Fotos de baixa resolução** — Loteamento São Paulo (352 px) e Condomínio Francisco Sá
  (352 px) vieram apenas como miniatura dentro da página do PDF. Ambos já sobem com a nota
  "imagem ilustrativa" que o próprio portfólio indica. Ficaram **mais expostas** com o
  rebrand: os cards agora têm superfície elevada e zoom no hover.
- **Atribuição de fotos** — Fazenda Paraíso e Arandu usam as imagens do deck de projetos na
  ordem em que aparecem lá. Vale uma conferência do cliente.
- **Vale dos Ipês** — previsão de entrega registrada como `out/2024`, conforme o portfólio.
  Provavelmente precisa de atualização.

### Resolvidas

- **Condomínio Romagnhollo Rios (Araxá/MG)** removido do portfólio a pedido do cliente — não
  será executado. Entrada, import e foto apagados; o portfólio passou de 10 para 9 projetos.
