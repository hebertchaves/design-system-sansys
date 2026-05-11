# DssDialog

Componente modal DSS — wrapper governado sobre o `QDialog` do Quasar.

## Instalação

```js
import { DssDialog } from '@dss/components'
```

## Uso Básico

```vue
<template>
  <DssButton label="Abrir Diálogo" @click="isOpen = true" />

  <DssDialog v-model:open="isOpen">
    <template #header>
      <h2>Título do Diálogo</h2>
      <DssButton icon="close" flat round dense @click="isOpen = false" />
    </template>

    <p>Conteúdo do diálogo aqui.</p>

    <template #footer>
      <DssButton label="Cancelar" flat @click="isOpen = false" />
      <DssButton label="Confirmar" color="hub" @click="handleConfirm" />
    </template>
  </DssDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
function handleConfirm() { isOpen.value = false }
</script>
```

## Diálogo de Confirmação

```vue
<DssDialog v-model:open="isOpen" persistent>
  <template #header>
    <h3>Confirmar exclusão?</h3>
  </template>

  <p>Esta ação não pode ser desfeita.</p>

  <template #footer>
    <DssButton label="Cancelar" flat @click="isOpen = false" />
    <DssButton label="Excluir" color="negative" @click="handleDelete" />
  </template>
</DssDialog>
```

## Diálogo em Tela Cheia

```vue
<DssDialog v-model:open="isOpen" maximized>
  <template #header>
    <h2>Formulário Completo</h2>
    <DssButton icon="close" flat round @click="isOpen = false" />
  </template>

  <!-- conteúdo do formulário -->

  <template #footer>
    <DssButton label="Salvar" color="hub" @click="handleSave" />
  </template>
</DssDialog>
```

## Posições

```vue
<!-- Bottom sheet style -->
<DssDialog v-model:open="isOpen" position="bottom">
  <p>Conteúdo na parte inferior</p>
</DssDialog>

<!-- Side panel style -->
<DssDialog v-model:open="isOpen" position="right" full-height>
  <p>Painel lateral</p>
</DssDialog>
```

## Props Principais

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | Boolean | `false` | v-model:open — visibilidade |
| `persistent` | Boolean | `false` | Impede fechamento por clique externo/ESC |
| `maximized` | Boolean | `false` | Tela cheia |
| `position` | String | `'standard'` | standard, top, bottom, left, right |

## Links

- [Documentação Completa](./DssDialog.md)
- [API Reference](./DSSDIALOG_API.md)
- [Exemplos Interativos](./DssDialog.example.vue)
