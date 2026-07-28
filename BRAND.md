# Via França — guia de marca

Documento de trabalho para quem for mexer no site. Descreve as decisões que
sustentam a identidade e, principalmente, o que não fazer com ela.

## Registro

**Luxo claro.** A referência não é hotel escuro com dourado; é catálogo impresso
de alto padrão. A página é uma folha de papel quente e luminosa, com duas faixas
vermelhas cheias ancorando o ritmo. O peso vem de qualidade de papel, filete,
raio, sombra tingida e cadência — não de contraste dramático.

Consequência prática: em direção clara não há para onde fugir. Um espaçamento
errado ou uma sombra cinza aparecem imediatamente. É por isso que espaçamento,
raio e sombra são todos derivados de token e não devem ser cravados à mão.

## Cor

| Token | Valor | Onde usar | Onde **não** usar |
|---|---|---|---|
| `paper` | `#FAF8F5` | fundo padrão da página | — |
| `surface` | `#FFFFFF` | só cartões elevados | como fundo de seção — mata a profundidade |
| `brand-red` | `#B31D22` | acento, CTAs, colchete do eyebrow, topo das faixas | texto corrido |
| `brand-wine` | `#7A1418` | base das faixas cheias | texto sobre claro |
| `red-on-dark` | `#E2555A` | texto de display sobre a faixa vinho | sobre fundo claro — reprova contraste |
| `brand-navy` | `#38366A` | traços: lâminas azuis, ícones, marca de canto inferior | como cor de fundo |
| `ink` | `#000C1D` | corpo | — |
| `neutral` | `#5C6672` | texto secundário, rótulos | não clarear: `#6B7280` reprova AA sobre bone (4.39:1) |
| `line-warm` / `line-cool` | — | filete sobre bone / sobre cartão branco | trocar os dois de lugar |

O azul é **traço**, não área. Ele existe em duas das quatro lâminas do traçado,
nos ícones e na marca de canto inferior. Nunca vira fundo de seção.

Nenhuma cor nova entra no sistema sem passar por `src/index.css`. Não existe hex
solto em componente.

## O traçado (swoosh)

O elemento de assinatura. Aparece em quatro escalas, sempre estrutural, nunca
decorativo:

1. **Lockup** — `Logo`, tamanhos `sm` / `md` / `lg`. `md` é o piso, inclusive no
   mobile.
2. **Divisor** — `SwooshRule`, esticado 3.2× e desenhado da esquerda para a
   direita quando entra em tela.
3. **Marca-d'água** — o traçado inteiro, grande, atrás do hero e das faixas.
4. **Marca de canto** — `.blade-marks`, dois cantos apenas.

### Regras

- **Engrossar, não só ampliar.** As lâminas são pares de curvas quadráticas com
  corpo de ~18 unidades numa grade de 160. Reduzidas, viram fio. A prop
  `espessura` do `Swoosh` afasta as curvas em torno do eixo; usar `1.35`–`1.4` em
  lockup, `1.15` no divisor esticado, `1.8`–`2.8` em marca-d'água.
- **Uma lâmina sozinha em escala grande não funciona.** Vira faixa e lê como
  defeito de impressão. Marca-d'água grande usa sempre o traçado completo; o
  `BladeMark` isolado só serve em pedaço pequeno ou muito velado.
- **Marca de canto usa dois cantos, nunca quatro.** Quatro viram moldura.
- **O traçado nunca é redesenhado.** A geometria em `BLADES`
  ([Swoosh.tsx](src/components/Swoosh.tsx)) é a marca oficial. `favicon.svg`
  repete os mesmos caminhos com espessura 1.4 e precisa ser atualizado à mão se
  `BLADES` mudar.

## Tipografia

**Fraunces** (display) + **Work Sans** (corpo). Uma família variável servindo de
três faces, via eixos:

| Classe | Eixos | Papel |
|---|---|---|
| `.font-display` | `opsz 144, SOFT 0, WONK 1` | títulos — o único lugar expressivo |
| `.type-figure` | `opsz 144, SOFT 0, WONK 0` + `tnum lnum` | números; sem WONK e com largura travada para o contador não tremer |
| `.type-lede` | itálico, `opsz 24, SOFT 40, WONK 0` | a linha persuasiva de cada seção |

Ritmo de tracking: negativo no display grande (`-0.02em`), fortemente positivo na
caixa alta pequena (`0.16`–`0.22em`). É esse contraste que carrega a
personalidade — não trocar as fontes tira a identidade inteira.

## Movimento

Regra que governa tudo: **nada com overshoot.** A fluidez vem da curva de saída
longa, não de mola solta. Vocabulário em [motion.ts](src/lib/motion.ts).

- `ease-fluid` = `cubic-bezier(0.16, 1, 0.3, 1)` para toda entrada.
- `ease-lux` = `cubic-bezier(0.22, 0.61, 0.36, 1)` para hover.
- Entrada com **opacidade de 0.7s dentro de transform de 1.05s**. É essa
  defasagem que faz o bloco assentar em vez de pipocar. Não igualar as duas.
- Três molas por papel: `SCROLL_SPRING`, `POINTER_SPRING`, `HOVER_SPRING`. Não
  reaproveitar uma no papel da outra.
- Hover: física (mola) para o movimento, curva longa de 700ms para o material
  (cor, borda, sombra). Separado, em elementos diferentes.

## Não fazer

- Sombra cinza. Toda sombra é tingida de ink ou de vermelho.
- Animar `filter: blur`, `width`, `height`, `top`, `left`. Só `transform` e
  `opacity`. Profundidade de campo se faz com véu de opacidade.
- Espalhar `will-change`. No máximo dois elementos, só os do hero.
- Ler `scrollY` cru. Todo valor ligado a scroll passa por `useSpring`.
- Reveal sem `once: true`.
- Reveal que devolve animação zerada sob `prefers-reduced-motion`. Tem que
  devolver markup estático, senão o conteúdo pode ficar preso em `opacity: 0`.
- Elemento interativo dentro de elemento interativo (`<button>` dentro de `<a>`):
  dobra a parada de tab. Link com cara de botão usa `buttonVariants`.
- Cor sozinha carregando informação. O selo de fase traz a palavra "Entregue" /
  "Em execução" junto do tom.
- Inventar número ou claim. Toda copy vem do material do cliente; divergência
  vira pendência no [README](README.md), não conciliação por conta própria.

## Voz

Português institucional, factual, sem superlativo. Sem exclamação, sem "transforme
seu futuro". A headline do hero é frase real do sumário do portfólio. Rótulo diz o
que a coisa é; nada faz papel duplo.
