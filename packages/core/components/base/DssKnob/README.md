# DssKnob

Controle rotativo para seleção de valores numéricos — dial interativo com representação circular SVG.

## Quick Start

```vue
<script setup>
import { ref } from 'vue'
import { DssKnob } from '@dss/components'

const volume = ref(50)
</script>

<template>
  <!-- Básico com v-model -->
  <DssKnob v-model="volume" brand="hub" />

  <!-- Com conteúdo customizado no centro -->
  <DssKnob v-model="volume" brand="water">
    {{ volume }}%
  </DssKnob>
</template>
```

> **Requisito**: Fornecer `v-model` (ou `:model-value` + `@update:model-value`) para ligação do valor.

## Posicionamento e Brand

```vue
<!-- Brand via prop -->
<DssKnob v-model="val" brand="hub" />
<DssKnob v-model="val" brand="water" />
<DssKnob v-model="val" brand="waste" />

<!-- Brand via contexto ancestral -->
<div data-brand="hub">
  <DssKnob v-model="val" />  <!-- Herda cor hub automaticamente -->
</div>
```

## Intervalo e Passo

```vue
<DssKnob v-model="val" :min="0" :max="360" :step="5">
  {{ val }}°
</DssKnob>
```

## Readonly e Disabled

```vue
<DssKnob v-model="val" readonly />
<DssKnob v-model="val" disable />
```

## Personalização Visual

```vue
<!-- Arco mais espesso -->
<DssKnob v-model="val" :thickness="0.4" brand="hub" />

<!-- Terminações arredondadas -->
<DssKnob v-model="val" :rounded="true" brand="water" />

<!-- Direção reversa -->
<DssKnob v-model="val" :reverse="true" brand="waste" />

<!-- Tamanho customizado -->
<DssKnob v-model="val" size="80px" brand="hub" />
```

## Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `Tab` | Foca o knob |
| `ArrowUp` / `ArrowRight` | Incrementa `step` |
| `ArrowDown` / `ArrowLeft` | Decrementa `step` |
| `PageUp` | Incrementa `step × 10` |
| `PageDown` | Decrementa `step × 10` |
| `Home` | Define valor para `min` |
| `End` | Define valor para `max` |

## Links

- [Documentação completa](./DssKnob.md)
- [API Reference](./DSSKNOB_API.md)
- [Exemplos](./DssKnob.example.vue)
