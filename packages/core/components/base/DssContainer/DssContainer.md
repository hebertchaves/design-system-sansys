# DssContainer

Trilho de conteúdo da página: largura máxima, respiro, centragem e ritmo vertical.

## Quando usar

- Como o **trilho principal** de uma tela (`tag="main"`), dando o teto de largura.
- Como **faixa interna** (`tag="section"`), agrupando blocos com respiro constante.
- Sempre que a página fosse escrever `max-width` + `margin: 0 auto` + `padding` à mão.

## Quando NÃO usar

- **Para grade de colunas** — isso é `DssGrid`. Container é a caixa, não o arranjo.
- **Como superfície** — ele não pinta fundo nem borda. Quem pinta é `DssCard`.
- **Dentro de um pai que já limita a largura** sem passar `size="fluid"`: dois tetos
  produzem margem dupla.

## Por que existe

Foi adiado em abr/2026 (`PLANO_ACAO_GRID_LAYOUT` §12.6) com a justificativa
*"classes CSS suficientes"*. A decisão foi reaberta em set/2026 com uma medida que
não existia então: duas telas reais montadas sobre o DSS carregavam **970 linhas de
CSS de página** — 43% dos arquivos — e o trilho estava reimplementado nas duas, com
nomes diferentes (`.cn-main`, `.gm-content`, `.gm-board`) e valores divergentes.

Classe utilitária resolve para quem já sabe qual token usar. Não impede a terceira
tela de inventar a quarta largura.

## Colisão de nome, resolvida

`.dss-container` **já existia** como classe utilitária em `utils/_layout-helpers.scss`,
com teto que acompanha o breakpoint — é a "classe CSS suficiente" que motivou o
adiamento deste componente. Dois donos para um nome é defeito.

A resolução foi **absorver, não competir**: `size="responsive"` reproduz exatamente o
comportamento da utilitária, tornando-a redundante. A utilitária **não foi removida** —
este monorepo não é o único consumidor do DSS, e apagar classe pública sem medir uso nos
repositórios de produto seria quebrar às cegas. Ficou marcada como superseded.

Migração: `<div class="dss-container">` → `<DssContainer size="responsive">`.

## API

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `size` | `sm \| md \| lg \| xl \| fluid \| responsive` | `lg` | Teto de largura, de `--dss-container-*` (608 · 960 · 1280 · 1600px). `responsive` acompanha o breakpoint |
| `padding` | `none \| xs \| sm \| md \| lg \| xl` | `md` | Respiro interno, de `--dss-gutter-*` (8 · 16 · 24 · 32 · 40px) |
| `gap` | `none \| sm \| md \| lg \| xl` | `none` | Ritmo vertical entre filhos, de `--dss-grid-gap-*`. Acima de `none` o container vira coluna flex |
| `centered` | `boolean` | `true` | `margin-inline: auto` |
| `tag` | `string` | `'div'` | Elemento renderizado — existe para semântica |
| `brand` | `hub \| water \| waste \| null` | `null` | Emite `data-brand` no root, remapeando os tokens de marca na subárvore |

**Slots:** `default` — o conteúdo do trilho.
**Eventos:** nenhum. Container é estrutura, não controle.

## Estados

Não tem hover, focus, active nem disabled — não é interativo. O que existe é
resposta ao meio: em **impressão** o teto de largura sai (a folha já é o limite);
**abaixo de 640px** os dois degraus maiores de respiro caem para 16px, para o
conteúdo não ser espremido.

## Tokens

`--dss-container-{sm,md,lg,xl}` · `--dss-gutter-{xs,sm,md,lg,xl}` ·
`--dss-grid-gap-{sm,md,lg,xl}` · `--dss-spacing-0`

## Acessibilidade

- **WCAG 1.4.10 (Reflow, AA):** o trilho encolhe com o pai e o respiro diminui em
  tela estreita — não exige rolagem horizontal.
- **WCAG 1.3.1 (Info and Relationships, A):** a prop `tag` deixa a estrutura do
  documento com o consumidor, em vez de impor uma `div`.

## Exemplo

```vue
<DssContainer tag="main" size="lg" padding="md" gap="md">
  <DssCard variant="outlined">…</DssCard>
  <DssCard variant="outlined">…</DssCard>
</DssContainer>
```
