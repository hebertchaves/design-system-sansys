# DssAppBar

A barra de aplicação do Sansys. Fixa a estrutura que **não muda** entre Water, Hub e Waste:

```
menu → logo → divisor → título do módulo → espaço → ações
```

## Quick Start

```vue
<DssLayout>
  <DssAppBar brand="water" title="Nome do Módulo" @menu="abrirMenu">
    <template #actions>
      <DssButton variant="flat" round size="md" icon="help_outline" aria-label="Ajuda" />
      <DssButton variant="flat" round size="md" icon="notifications" aria-label="Notificações" />
      <DssButton variant="flat" round size="md" icon="apps" aria-label="Aplicativos" />
      <DssButton variant="flat" round size="md" icon="account_circle" aria-label="Minha conta" />
    </template>
  </DssAppBar>
</DssLayout>
```

> **Exige um `DssLayout` ancestral.** O `DssHeader` que esta barra compõe não renderiza fora
> de um `QLayout` — é uma não-use documentada dele, e o sintoma é mudo: a barra simplesmente
> não aparece.

## Uma prop, dois efeitos

`brand` vai ao `DssToolbar`, e de lá saem **duas** coisas sem ninguém repassar nada:

1. a **pele** — o toolbar pinta o fundo e remapeia `--dss-action-primary` para os filhos;
2. o **logo certo** — o toolbar propaga `[data-brand]` no próprio root, e o `DssBrandLogo`
   lá dentro resolve a marca pelo ancestral mais próximo.

É o padrão §1.3 do guia de Fase 3: contexto visual por `data-*` e cascata de CSS var, não
por `provide/inject`.

## Por que um composto, e não props no `DssHeader`

O **eixo de variação** decide (§1.6 do guia). Entre os três produtos Sansys:

| O que varia | Mecanismo |
|---|---|
| **Pele** (cor) | token, via `brand` |
| **Conteúdo** (qual logo, quais ícones) | dados e slot |
| **Estrutura** (a ordem das cinco peças) | **composto** — é o que não varia |

Expressar a estrutura como props do `DssHeader` (`burgerIcon`, `logoSrc`, `actions[]`) seria
reimplementar slots, mal. O `DssHeader` continua o primitivo: não ganhou prop de conteúdo
nenhuma.

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `brand` | `'water' \| 'hub' \| 'waste'` | — | Marca: pinta a barra e resolve o logo |
| `title` | `string` | — | Nome do módulo. Ausente, o divisor também some |
| `density` | `'compact' \| 'standard'` | `'compact'` | 48px ou 64px |
| `menu` | `boolean` | `true` | Mostra o botão de menu |
| `menuAriaLabel` | `string` | `'Abrir menu principal'` | Nome acessível do botão de menu |
| `elevated` | `boolean` | `true` | Sombra sob a barra |

## Events

| Evento | Quando |
|---|---|
| `menu` | Clique no botão de menu. A barra não sabe o que abrir — quem monta a tela sabe |

## Slots

| Slot | Para quê |
|---|---|
| `brand` | Substitui o logo. Raro |
| `title` | Título que não é texto simples |
| `actions` | As ações da direita. Na prática, 4 `DssButton` de ícone |

## Altura

| `density` | Altura | Origem |
|---|---|---|
| `compact` | 48px | O menor degrau que comporta o alvo de toque mínimo |
| `standard` | 64px | `--dss-layout-header-height` |

`compact` é o padrão porque é a barra real do Sansys.

### Por que 48px, se o Figma mede 40

Nasceu com 40px — **medida**, não escolhida: é a altura do grid master em produção
(Figma 1813:1328). Mas numa barra de 40px só cabe o botão `sm`, de **36×36**, e o
`DssButton` **não estende o alvo de toque por pseudo-elemento** — o tamanho visual *é* a área
de clique. 36px reprova a **WCAG 2.5.5**, que pede 44×44.

48px é o menor degrau que resolve: comporta o botão `md` (44px, o alvo mínimo) e ainda os 2px
de anel de foco de cada lado — 44 + 2×2 = 48, exato. **Decisão de produto (set/2026): a
fidelidade ao Figma cedeu à norma**, e não o contrário.

Medido depois: barra 48px · alvo 44×44 ✅ · ícone 24px (55% do alvo) · anel de foco 48px,
cabendo inteiro.

É `min-height`, não `height`: a barra cresce se o consumidor puser algo mais alto nas ações.
Travar cortaria o conteúdo em silêncio.

## O divisor não é um `DssSeparator`

E a escolha é deliberada. A regra R3 do `ui-rules` não admite `DssSeparator` dentro de
`DssToolbar` — com razão: aqui o traço é **decoração de barra**, não separação semântica
entre grupos. Ele sai da árvore de acessibilidade com `aria-hidden`.

Em `forced-colors` ele troca de `currentColor` + opacidade para `CanvasText` opaco: opacidade
não sobrevive ao alto contraste, e o traço sumiria contra o fundo do sistema.

## O logo é `decorative` por padrão

Nesta barra o nome do produto já é anunciado — pelo título do módulo ao lado e pelo `<title>`
da página. Um logo informativo aqui faria o leitor de tela **ler a marca duas vezes**.

Quem precisa do logo nomeado (ele é link para a home, por exemplo) usa o slot `brand`:

```vue
<template #brand>
  <a href="/" aria-label="Página inicial do Sansys Water">
    <DssBrandLogo size="lg" decorative />
  </a>
</template>
```

## Acessibilidade

- O nome do módulo é `<h1>` — é o título da tela
- O botão de menu **exige nome**; `menuAriaLabel` tem padrão para o caso de ninguém pensar nisso
- O divisor sai da árvore (`aria-hidden`)
- Tab percorre menu → ações, que é a ordem de leitura da barra
- `@media print` esconde a barra inteira: navegação não se imprime

## Tokens

| Token | Camada | Uso |
|---|---|---|
| `--dss-layout-header-height-compact` | L3 | Altura `compact` (48px) |
| `--dss-layout-header-height` | L3 | Altura `standard` (64px) |
| `--dss-spacing-3` / `-4` / `-5` / `-6` | L2, L3 | Respiros e gaps |
| `--dss-border-width-thin` | L2 | Espessura do divisor |
| `--dss-opacity-brand-medium` | L2 | Opacidade do divisor |
| `--dss-font-size-lg` | L2 | Título do módulo (18px) |
| `--dss-font-weight-medium` | L2 | Peso do título |
| `--dss-line-height-snug` | L2 | Entrelinha do título |
