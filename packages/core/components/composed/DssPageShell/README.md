# DssPageShell

O miolo da tela Sansys: rail de módulos à esquerda, trilha de navegação e board à direita.

```
┌────┬──────────────────────────────┐
│    │  trilha de navegação          │
│rail│  ┌────────────────────────┐   │
│52px│  │  board (a superfície)  │   │
│    │  └────────────────────────┘   │
└────┴──────────────────────────────┘
```

## Quick Start

```vue
<DssLayout view="hHh lpR fFf">
  <DssAppBar brand="water" title="Solicitações" />

  <DssPageContainer>
    <DssPage>
      <DssPageShell>
        <template #rail>
          <DssPageShellRailItem icon="dashboard" label="Painel" active />
          <DssPageShellRailItem icon="description" label="Solicitações" />
          <DssPageShellRailItem icon="settings" label="Configurações" />
        </template>

        <template #breadcrumb>
          <DssBreadcrumbs separator="›" gutter="sm">
            <DssBreadcrumbsEl label="Pesquisar registro" icon="search" />
          </DssBreadcrumbs>
        </template>

        <DssSectionTitle label="Verificações" size="lg" />
        <!-- … o conteúdo da página … -->
      </DssPageShell>
    </DssPage>
  </DssPageContainer>
</DssLayout>
```

## Por que existe

O rail se repete em **toda** tela do Sansys e não existia como componente: cada tela
reimplementava a coluna, os itens e o estado ativo. É o §1.6 do guia de Fase 3 outra vez —
estrutura invariante vira composto.

## O que absorveu, e o que deixou de fora

| Absorveu (o **arranjo**) | Deixou de fora (o **conteúdo**) |
|---|---|
| coluna de 52px com o fundo da marca | quais módulos |
| fundo rebaixado da página | o que vai na trilha |
| respiro e gap da coluna de conteúdo | o que vai no board |
| a superfície do board | — |

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `board` | `boolean` | `true` | Envolve o conteúdo na superfície do board |
| `railAriaLabel` | `string` | `'Módulos do sistema'` | Nome acessível do rail |

### **DssPageShellRailItem**

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `icon` | `string` | — | **Obrigatório.** Ícone do módulo |
| `label` | `string` | — | **Obrigatório.** Nome do módulo — é o nome acessível |
| `active` | `boolean` | `false` | Módulo atual. Pinta **e** marca `aria-current="page"` |
| `disabled` | `boolean` | `false` | Desabilita |

> O contrato (`dss.contract.json`) cobre a **família**: as props do
> `DssPageShellRailItem` aparecem nele junto com as do shell. É o mesmo comportamento do
> `DssCard`, cujo contrato inclui as props do `DssCardSection` e do `DssCardActions`.

## Slots

| Slot | Para quê |
|---|---|
| `rail` | Itens do rail. Use `DssPageShellRailItem` |
| `breadcrumb` | Trilha. Use `DssBreadcrumbs` |
| `default` | O conteúdo da página — o board |

## O board é do shell

O cartão branco sobre o fundo rebaixado é o arranjo padrão das telas Sansys, e estava
duplicado como `.gm-board` em cada uma. `board={false}` devolve a coluna nua para a tela que
monta a própria superfície.

## Não usa `DssPage` nem `DssLayout`

O shell é o **miolo**, não a casca inteira. Quem monta a tela decide se ele vive dentro de um
`DssLayout` com `DssAppBar` em cima — e quase sempre vive. Absorver o layout aqui travaria o
shell num único arranjo de página e o tornaria inútil em modal, aba ou preview.

## O rail acompanha a marca sem uma regra de brand

Ele consome `--dss-action-primary-deep` (fundo), `--dss-action-primary-hover` (separador e
hover) e `--dss-action-primary` (item ativo). Os três são remapeados por `[data-brand]`, então
a Layer 4 de brands está **vazia**.

> **A tela de origem não fazia isso.** Ela cravava `--dss-border-water-700` no separador dos
> itens — prendendo o rail à marca Water —, e pior: esse token é um **shorthand completo**
> (`1px solid <cor>`), não uma cor. A declaração virava `1px solid 1px solid #0356a1`,
> inválida, e o navegador a descartava. **Medido: os separadores não existiam.**

## O tamanho do ícone é decisão do rail, não da página

`--dss-icon-size-sm` (20px) num item de 44px — **45% do item, 38% da coluna de 52px**.

Está declarado na Layer 2, em `.dss-page-shell__rail-icon`, e não na prop `size` do `DssIcon`.
Não é preferência de estilo: no modo `inline` o `DssIcon` **não emite classe de tamanho**
(CCI §2.2) — ele usa `1em` e `font-size: inherit`, e quem dimensiona é a `font-size` do host.

> **O `size="sm"` que estava aqui era inerte, e escondia um vazamento.** Sem `font-size`
> declarada no item, o ícone herdava a tipografia de **quem montasse a tela**. Medido no grid
> master: **14px** — porque a página declarava `font-size: var(--dss-font-size-sm)`. Eram 32%
> de um item de 44px, e o mesmo rail renderizaria em outro tamanho em cada página.

Mesmo padrão do `DssButton`, que dimensiona o próprio `.dss-button__icon` por regra de
tamanho em vez de repassar `size` ao ícone.

## Densidade — medida em linhas de tabela

A reclamação recorrente dos usuários do Sansys é **quantidade de informação útil por tela**.
Medido no grid master a 1000px de viewport, antes desta rodada: a tabela começava em 634px, e
**153px disso eram sobrecarga fixa acima da faixa de dashboard** — respiro, não conteúdo.

Uma linha de tabela custa 49px, então a unidade da conta é essa.

| | Antes | Depois |
|---|---|---|
| Topo da trilha de navegação | 65px | **53px** |
| Topo do board | 94px | **78px** |
| Topo do card da tabela | 577px | **432px** |
| Primeira linha da tabela | ~683px | **511px** |
| Linhas visíveis antes da dobra | 6 | **10** |

| Propriedade | Antes | Depois |
|---|---|---|
| `__content` padding | 16 / 24 / 24 | **4 / 12 / 12** |
| `__content` gap | 8 | **4** |
| `__board` padding | 12 / 24 / 24 | **8 / 16 / 16** |
| `__board` gap | 20 | **12** |

O `gap` do board é o que mais pesa: ele se repete entre **todos** os cards (cinco vezes no
grid master), então um degrau a menos vale 40px — quase uma linha inteira.

> **A fronteira:** a densidade sai de `padding`, `margin` e `gap`. **Não** saiu de altura de
> campo (37px), alvo de toque (44px), entrelinha nem tamanho de fonte — nada do que a WCAG
> mede. Reduzir espaço entre elementos é ajuste de layout; reduzir o elemento é regressão de
> acessibilidade, e esta rodada não encostou nisso.

## Acessibilidade

- **O rail é um `<nav>` nomeado.** Numa página onde a trilha também é `<nav>`, dois sem nome
  viram "navegação" e "navegação" no leitor de tela
- **O nome do item não é opcional.** O rail só mostra ícones; um `<button>` cujo único
  conteúdo é um ícone decorativo é um botão **sem nome**. O `label` vira um `<span>`
  visualmente oculto e o `title`
- **`aria-current="page"` acompanha o estado visual** — pintar sem marcar deixaria a
  informação só na cor (WCAG 1.4.1)
- **Alvo de toque:** itens com 44px de altura mínima (`--dss-touch-target-md`), o piso da
  WCAG 2.5.5. A largura do rail é `--dss-touch-target-lg` (52px) — o rail **é** feito de alvos
- **Anel de foco interno** (`outline-offset` negativo): o item ocupa a largura inteira da
  coluna, e um anel externo seria cortado
- **`@media print`:** o rail sai e o fundo rebaixado vira transparente — navegação não se
  imprime, e cinza no papel gasta tinta sem informar

## Tokens

| Token | Camada | Uso |
|---|---|---|
| `--dss-touch-target-lg` | L2 | Largura do rail (52px) |
| `--dss-touch-target-md` | L2 | Altura mínima do item (44px) |
| `--dss-surface-muted` | L2 | Fundo rebaixado da página |
| `--dss-surface-default` | L3 | Superfície do board |
| `--dss-action-primary-deep` | L2 | Fundo do rail |
| `--dss-action-primary-hover` | L2, L4 | Separador e hover |
| `--dss-action-primary` | L4 | Item ativo |
| `--dss-icon-size-sm` | L2 | Ícone do item (20px) — fecha o vazamento de `font-size` da página |
| `--dss-text-inverse` | L2, L4 | Ícone do rail e anel de foco |
