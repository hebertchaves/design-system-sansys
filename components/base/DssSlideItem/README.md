# DssSlideItem

Item de lista com ações deslizáveis reveladas por gesto de swipe. Deslize para a direita para revelar a ação esquerda; deslize para a esquerda para revelar a ação direita.

## Instalação

```js
import { DssSlideItem } from '@dss/components'
```

## Uso básico

```vue
<q-list bordered separator>
  <DssSlideItem
    left-color="error"
    right-color="info"
    @action="handleAction"
  >
    <template #left="{ reset }">
      <q-icon name="delete" aria-hidden="true" />
      <span>Deletar</span>
    </template>
    <template #right="{ reset }">
      <q-icon name="archive" aria-hidden="true" />
      <span>Arquivar</span>
    </template>

    <q-item>
      <q-item-section>
        <q-item-label>Notificação importante</q-item-label>
        <q-item-label caption>Detalhes da notificação</q-item-label>
      </q-item-section>
    </q-item>
  </DssSlideItem>
</q-list>
```

## Tratando ações

```vue
<script setup>
function handleAction({ side, reset }) {
  if (side === 'left') {
    // Deletar item
    deleteItem()
    // Não precisa chamar reset() — o item foi removido
  } else if (side === 'right') {
    // Arquivar item (operação assíncrona)
    await archiveItem()
    reset() // Retorna o item à posição original após arquivar
  }
}
</script>
```

## Resetar programaticamente

```vue
<script setup>
const slideItemRef = ref(null)

function cancelAction() {
  slideItemRef.value?.reset()
}
</script>

<template>
  <DssSlideItem ref="slideItemRef" ...>...</DssSlideItem>
</template>
```

## ⚠️ Acessibilidade obrigatória

O gesto de swipe **não é acessível via teclado**. Forneça sempre uma alternativa:

```vue
<q-item>
  <!-- Conteúdo do item -->
  <q-item-section side>
    <!-- Alternativa acessível por teclado -->
    <DssButton icon="delete" flat @click="deleteItem" aria-label="Deletar item" />
  </q-item-section>
</q-item>
```

## Links

- [Documentação completa](./DssSlideItem.md)
- [API Reference](./DSSSLIDEITEM_API.md)
- [Exemplos](./DssSlideItem.example.vue)
