# DssRating

Controle de avaliação por ícones — escala visual interativa baseada em estrelas ou ícones customizados.

## Quick Start

```vue
<script setup>
import { ref } from 'vue'
import { DssRating } from '@dss/components'

const nota = ref(3)
</script>

<template>
  <!-- Básico com v-model -->
  <DssRating v-model="nota" brand="hub" />

  <!-- Readonly (exibição de avaliações existentes) -->
  <DssRating v-model="nota" brand="water" readonly />

  <!-- Meia avaliação -->
  <DssRating v-model="nota" brand="waste" icon-half="star_half" />
</template>
```

> **Requisito**: Fornecer `v-model` (ou `:model-value` + `@update:model-value`) para ligação do valor.

## Brand

```vue
<DssRating v-model="val" brand="hub" />
<DssRating v-model="val" brand="water" />
<DssRating v-model="val" brand="waste" />

<!-- Brand via contexto ancestral -->
<div data-brand="hub">
  <DssRating v-model="val" />  <!-- Herda cor hub automaticamente -->
</div>
```

## Configuração da Escala

```vue
<!-- 10 estrelas, passo decimal -->
<DssRating v-model="val" :max="10" brand="hub" />

<!-- Ícones customizados -->
<DssRating v-model="val" icon="favorite" icon-selected="favorite" brand="water" />

<!-- Meia avaliação (modelValue com decimal: 3.5) -->
<DssRating v-model="val" icon="star_border" icon-selected="star" icon-half="star_half" brand="hub" />
```

## Readonly e Disabled

```vue
<DssRating v-model="val" readonly />
<DssRating v-model="val" disable />
```

## Tamanho (WCAG 2.5.5)

```vue
<!-- Default (~24px) — adequado para desktop -->
<DssRating v-model="val" brand="hub" />

<!-- 44px mínimo para touch (WCAG 2.5.5) -->
<DssRating v-model="val" size="44px" brand="hub" />
```

## Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `Tab` | Foca o componente |
| `ArrowRight` / `ArrowUp` | Incrementa 1 |
| `ArrowLeft` / `ArrowDown` | Decrementa 1 |
| `Home` | Define para 0 |
| `End` | Define para `max` |

## Links

- [Documentação completa](./DssRating.md)
- [API Reference](./DSSRATING_API.md)
- [Exemplos](./DssRating.example.vue)
