# DssSectionTitle

Título de seção com o traço da marca embaixo.

```vue
<DssSectionTitle label="Verificações" :level="2" size="lg" />
```

Aparece **8×** nas duas telas Sansys de referência, sempre com o mesmo CSS copiado — e é por
isso que virou componente.

## A distância do traço é mínima, e o mínimo foi medido

Não é um valor escolhido no olho. A distância **ótica** — do fim da tinta do descendente ao
topo do traço — foi medida nos três tamanhos, na fonte real, com a linha de base obtida por
um marcador inline de altura zero:

| `size` | fonte | `padding: 0` | `padding: 2px` (o token) |
|---|---|---|---|
| `sm` | 14px | **0,5px** | 2,5px |
| `md` | 16px | 1,0px | 3,0px |
| `lg` | 18px | 1,5px | 3,5px |

Com `padding: 0` o traço **não encosta** — mas em `sm` sobra meio pixel, que na prática é
colisão de subpixel. E a folga que resta vem só da meia-entrelinha: ela encolhe junto com a
fonte, então quanto menor o título, mais apertado.

Daí `--dss-section-title-rule-gap` = **2px**: devolve 2,5–3,5px em todos os tamanhos. Mínimo
e estável.

> As telas atuais usam 4px, que rende 4,5–5,5px — cerca do dobro do necessário.

**`line-height: tight` é parte da conta.** Entrelinha maior empurraria o traço por
meia-entrelinha, e o respiro deixaria de ser governado pelo token.

## Nível e tamanho são eixos separados

| Prop | Decide | Por quê |
|---|---|---|
| `level` | a **tag** (`<h1>`…`<h4>`) | estrutura do documento |
| `size` | a **aparência** | estética da tela |

Juntar os dois numa prop só parece econômico e não é: quem precisa de um `<h3>` grande acaba
escrevendo `<h1>` para conseguir o tamanho, e a navegação por cabeçalhos do leitor de tela
quebra (WCAG 1.3.1 · 2.4.6).

```vue
<!-- um h3 que parece grande — estrutura certa, aparência certa -->
<DssSectionTitle :level="3" size="lg" label="Histórico" />
```

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `label` | `string` | — | Texto. O slot default tem precedência |
| `level` | `1 \| 2 \| 3 \| 4` | `2` | Nível semântico → a tag |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho visual |
| `accent` | `'brand' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'brand'` | Cor do traço |
| `brand` | `'hub' \| 'water' \| 'waste'` | — | Marca local. Remapeia o token, não pinta a borda |

## O traço segue a marca

`accent="brand"` — o padrão — consome `--dss-action-primary`, que `[data-brand]` já remapeia.
Numa página Sansys o traço fica na cor do produto **sem ninguém passar nada**.

As demais cores são a exceção nomeada: uma seção que fala de um estado (bloco de alerta,
resultado reprovado) pode querer o traço na cor desse estado. Elas **não são brandeáveis** —
erro é vermelho em Water, Hub e Waste. Significado não muda com a marca.

> **Decisão de produto, set/2026:** nas telas Sansys o traço fica na **marca**. O âmbar que
> as telas de referência traziam (`--dss-feedback-warning`) foi descartado — ele é
> `accent="warning"`, que significa *"esta seção fala de um alerta"*, e gastá-lo como
> identidade visual queimaria a cor de estado em títulos que não falam de estado nenhum.
> Detalhe em [DssSectionTitle.md §4](./DssSectionTitle.md).

> **A prop `brand` remapeia o token; não pinta a borda.** É o §K5 do checklist, e custou um
> defeito medido: o `DssLinearProgress` pintava o elemento do Quasar direto e vencia a própria
> regra de cor por especificidade. Dentro de qualquer `[data-brand]` a prop `color` virava
> inerte — `color="error"` renderizava azul.

## O traço tem a largura do texto

`inline-size: fit-content`. É o que diferencia um **acento de marca** de uma régua divisória
de seção. Um traço que atravessa o container inteiro é outra coisa — para isso existe o
`DssSeparator`.

## Acessibilidade

- O título é um cabeçalho **real** (`<h1>`…`<h4>`), e participa da navegação por cabeçalhos
- `level` fora de 1–4 cai em `h2` em vez de gerar tag inválida
- Em `forced-colors` o traço vira `CanvasText`: a cor do token deixa de valer, e preservar a
  marca contra a escolha de contraste do usuário é o que a WCAG não quer
- Em `@media print` o traço vai para `--dss-text-body`: colorido vira cinza quase invisível
  na impressão monocromática

## Tokens

| Token | Camada | Uso |
|---|---|---|
| `--dss-section-title-rule-gap` | L2 | Distância texto↔traço (2px, medido) |
| `--dss-border-width-md` | L2 | Espessura do traço (2px) |
| `--dss-action-primary` | L2 | Cor do traço em `accent="brand"` |
| `--dss-feedback-*` | L3 | Cor do traço nas cores de estado |
| `--dss-line-height-tight` | L2 | Entrelinha — **é parte da conta do respiro** |
| `--dss-font-size-sm/md/lg` | L3 | Tamanhos |
| `--dss-hub-600` / `--dss-water-500` / `--dss-waste-600` | L4 | Remapeamento por `brand` |
