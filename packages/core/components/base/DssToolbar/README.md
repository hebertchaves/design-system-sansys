# DssToolbar

Barra de ferramentas horizontal. Container estrutural não-interativo — wrapper DSS governado sobre `QToolbar` do Quasar.

## Quando usar

- Como barra principal de navegação de uma página (header)
- Como barra de ações em um card ou modal
- Como rodapé de diálogo com ações
- Sempre que precisar de um container flexbox horizontal com altura padronizada

## Quando NÃO usar

- Para navegação por abas — use `DssTab` + `DssTabs`
- Para listas de ações verticais — use `DssList` + `DssItem`
- Para menus suspensos — use `DssBtnDropdown`

## Quick Start

```vue
<template>
  <!-- Toolbar básica -->
  <DssToolbar aria-label="Barra principal">
    <span class="text-h6">Título</span>
    <q-space />
    <DssButton flat icon="more_vert" round />
  </DssToolbar>

  <!-- Toolbar com brand Hub -->
  <DssToolbar brand="hub" aria-label="Barra Hub">
    <DssButton flat icon="menu" round />
    <span class="text-subtitle1">Sansys Hub</span>
  </DssToolbar>
</template>

<script setup lang="ts">
import { DssToolbar } from '@dss/components'
</script>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `inset` | `boolean` | `false` | Adiciona recuo extra à esquerda (24px vs 16px padrão) |
| `brand` | `'hub' \| 'water' \| 'waste'` | — | Aplica cor de fundo da brand. Ativa `[data-brand]` no elemento |

## Props bloqueadas

| Prop Quasar | Motivo |
|------------|--------|
| `dark` | Modo escuro governado globalmente via `[data-theme="dark"]` |
| `glossy` | Não utilizado no DSS |
| `color` / `text-color` | Governados por tokens DSS + prop `brand` |

## Props pass-through

| Prop | Comportamento |
|------|--------------|
| `dense` | Encaminhado via `$attrs` ao QToolbar → aplica `.q-toolbar--dense` (40px vs 56px) |
| `aria-label` | Encaminhado via `$attrs` — **recomendado** para acessibilidade |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo da toolbar. Tipicamente: `DssButton`, texto, `DssIcon`, `q-space` |

## Composição recomendada

```vue
<!-- Padrão: Menu + Título + Ações -->
<DssToolbar brand="hub" aria-label="Barra principal">
  <DssButton flat round icon="menu" aria-label="Menu" />
  <span class="text-subtitle1 q-ml-sm">Sansys</span>
  <q-space />
  <DssButton flat round icon="search" aria-label="Buscar" />
  <DssButton flat round icon="account_circle" aria-label="Conta" />
</DssToolbar>
```

## Tamanho de ícone dentro da barra

A barra é contexto, e contexto dimensiona o que vive nele. Dentro de `.dss-toolbar` a escala de
ícone do sistema sobe **um degrau**, remapeada a partir da família `--dss-bar-icon-size-*`:

| `size` do `DssButton` | altura do botão | ícone fora da barra | ícone **na barra** |
|---|---|---|---|
| `xs` | 32px | 12px | 16px |
| `sm` | 36px | 16px | **20px** |
| `md` | 44px | 20px | **24px** |
| `lg` | 52px | 24px | 32px |
| `xl` | 64px | 32px | 48px |

Por que existe: numa barra de 40px só cabe o botão `sm`, e os 16px do `--dss-icon-size-xs` são
40% da barra — a referência de uma barra de aplicação é ~50%.

**A prop `size` continua decidindo.** O remap desloca a escala inteira justamente para não
colapsar degraus: a primeira versão desta regra remapeava só um token, e botão `sm` e `md`
passavam a renderizar o mesmo ícone de 20px dentro da barra.

O alcance é **qualquer** ícone da barra, não só o dos botões — chip, avatar e ícone solto numa
barra também são do tamanho da barra.

## Geometria de estado dentro da barra

A barra também dimensiona o **disco de hover** e o **anel de foco** dos botões que vivem
nela, por dois canais que o `DssButton` declara e cuja origem é o continente:

| Token | Fora da barra | Na barra | Por quê |
|---|---|---|---|
| `--dss-button-state-layer-inset` | `0` | `4px` | O disco de estado fecha em 28px em vez de 36px. O ícone passa de **56% para 71%** do disco, e a área do disco cai de 3,2× para 2,0× a do glifo |
| `--dss-button-focus-ring-offset` | `4px` | `0` | O anel do botão `sm` estendia **48px** numa barra de **40px** e era recortado. Com offset zero fecha em 40px e cabe inteiro |

**O alvo de toque não encolhe.** Ele continua a caixa do botão — 36px no `sm`. Disco de
estado e alvo de toque são caixas diferentes, e é exatamente por isso que o `::before` segue
reservado ao alvo (WCAG 2.5.5) e o `::after` ao efeito visual.

**Fora da barra nada muda:** os dois defaults são o comportamento de sempre.

## Herança de Brand

Quando `brand` é definida, o elemento recebe automaticamente `data-brand`, permitindo que filhos como `DssButton` e `DssIcon` herdem a brand via tokens CSS:

```html
<!-- Resultado no DOM -->
<div class="q-toolbar dss-toolbar dss-toolbar--brand-hub" data-brand="hub">
  <!-- DssButton aqui usa automaticamente cores hub -->
</div>
```

## Documentação completa

- [DssToolbar.md](./DssToolbar.md) — Documentação normativa
- [DSSTOOLBAR_API.md](./DSSTOOLBAR_API.md) — Referência técnica completa
