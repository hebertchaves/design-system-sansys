# DssInnerLoading

Overlay de loading posicionado absolutamente dentro de um container específico. Bloqueia interações enquanto uma operação assíncrona está em andamento.

## ⚠️ Requisito do Container Pai

```html
<!-- O container pai DEVE ter position: relative -->
<div style="position: relative;">
  <DssInnerLoading :showing="isLoading" />
  <!-- conteúdo que será coberto pelo overlay -->
</div>
```

Sem `position: relative` no pai, o overlay de QInnerLoading pode vazar para fora da área desejada.

## Quick Start

```vue
<script setup>
import { ref } from 'vue'
import { DssInnerLoading } from '@dss/components'

const isLoading = ref(false)

async function loadData() {
  isLoading.value = true
  await fetchData()
  isLoading.value = false
}
</script>

<template>
  <DssCard style="position: relative; min-height: 200px;">
    <DssInnerLoading :showing="isLoading" label="Carregando dados..." />
    <!-- conteúdo do card -->
  </DssCard>
</template>
```

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `showing` | `Boolean` | — (required) | Controla visibilidade do overlay |
| `color` | `InnerLoadingColor` | `'primary'` | Cor do spinner e label |
| `size` | `InnerLoadingSize` | `'md'` | Tamanho do spinner interno |
| `label` | `String` | — | Texto exibido abaixo do spinner |
| `delay` | `Number` | `0` | Delay (ms) antes de exibir (evita flash) |
| `brand` | `InnerLoadingBrand` | — | Contexto de brand Sansys |

## Variações de Cor

```vue
<DssInnerLoading :showing="true" color="primary" />
<DssInnerLoading :showing="true" color="secondary" />
<DssInnerLoading :showing="true" color="error" />
<DssInnerLoading :showing="true" color="success" />
<DssInnerLoading :showing="true" color="warning" />
<DssInnerLoading :showing="true" color="info" />
```

## Variações de Tamanho

```vue
<DssInnerLoading :showing="true" size="xs" />
<DssInnerLoading :showing="true" size="sm" />
<DssInnerLoading :showing="true" size="md" />
<DssInnerLoading :showing="true" size="lg" />
<DssInnerLoading :showing="true" size="xl" />
```

## Com Label

```vue
<DssInnerLoading :showing="true" label="Salvando alterações..." />
```

## Com Delay (evita flash em operações rápidas)

```vue
<DssInnerLoading :showing="true" :delay="300" />
```

## Slot Customizado

```vue
<DssInnerLoading :showing="true">
  <DssCircularProgress :value="uploadProgress" />
  <span>Enviando arquivo... {{ uploadProgress }}%</span>
</DssInnerLoading>
```

## Brand Context

```vue
<!-- Via prop -->
<DssInnerLoading :showing="true" brand="hub" />

<!-- Via ancestor (cascade automático) -->
<div data-brand="hub">
  <DssInnerLoading :showing="true" />
</div>
```

## Tokens Utilizados

- `--dss-surface-default` — fundo do overlay
- `--dss-font-size-sm` — tamanho do texto do label
- `--dss-font-weight-medium` — peso do texto do label
- `--dss-spacing-2` — espaçamento entre spinner e label
- `--dss-action-primary/secondary` — cores semânticas padrão
- `--dss-feedback-error/success/warning/info` — cores de feedback
- `--dss-hub-600`, `--dss-water-500`, `--dss-waste-600` — cores de brand
