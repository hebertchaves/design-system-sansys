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
