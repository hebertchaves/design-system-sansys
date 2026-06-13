# DssBottomSheet

Overlay que desliza da parte inferior da tela, apresentando conteúdo contextual ou ações relacionadas à tarefa atual sem navegar para uma nova tela.

## Instalação

```js
import { DssBottomSheet } from '@dss/components'
```

## Uso Básico

```vue
<template>
  <DssButton label="Abrir" @click="open = true" />

  <DssBottomSheet v-model:open="open">
    <p>Conteúdo do bottom sheet</p>
    <DssButton label="Fechar" flat @click="open = false" />
  </DssBottomSheet>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>
```

## Com Header e Ações

```vue
<DssBottomSheet v-model:open="open">
  <template #header>
    <span class="text-subtitle1">Selecione uma ação</span>
    <DssButton icon="close" flat round dense @click="open = false" />
  </template>

  <DssList>
    <DssItem clickable @click="handleAction('share')">
      <DssItemSection avatar><DssIcon name="share" /></DssItemSection>
      <DssItemSection><DssItemLabel>Compartilhar</DssItemLabel></DssItemSection>
    </DssItem>
  </DssList>
</DssBottomSheet>
```

## Modos

| Modo | Prop | Descrição |
|------|------|-----------|
| Padrão | — | Handle visual + conteúdo, altura automática (max 85vh) |
| Persistente | `persistent` | Fechamento apenas por botão explícito |
| Maximizado | `maximized` | Altura total da tela |
| Cantos quadrados | `square` | Remove arredondamento dos cantos superiores |

## Brands

Passe `data-brand` no ancestral para ativar a identidade visual:

```vue
<div data-brand="hub">
  <DssBottomSheet v-model:open="open">...</DssBottomSheet>
</div>
```

## Links

- [Documentação completa](./DssBottomSheet.md)
- [API Reference](./DSSBOTTOMSHEET_API.md)
- [Exemplos](./DssBottomSheet.example.vue)
