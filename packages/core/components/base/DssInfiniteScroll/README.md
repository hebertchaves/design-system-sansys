# DssInfiniteScroll

Container comportamental para carregamento incremental de dados por scroll.

## Quando usar

- Feeds, timelines e listas longas com carregamento sob demanda
- Chats com modo `reverse` (mensagens mais antigas ao rolar para o topo)
- Qualquer lista onde carregar tudo de uma vez prejudicaria a performance

## Quando NÃO usar

- Listas finitas e pequenas → use paginação explícita (`DssPagination`)
- Quando o usuário precisa navegar diretamente a uma posição → use paginação
- Listas > 10k itens → combine com `DssVirtualScroll`

## Instalação

```js
import { DssInfiniteScroll } from '@dss/components'
```

## Uso básico

```vue
<template>
  <div id="scroll-area" style="height: 400px; overflow-y: auto;">
    <DssInfiniteScroll
      :offset="100"
      scroll-target="#scroll-area"
      @load="onLoad"
    >
      <div v-for="item in items" :key="item.id">{{ item.label }}</div>
    </DssInfiniteScroll>
  </div>
</template>

<script setup>
const items = ref([])

async function onLoad(index, done) {
  const newItems = await fetchPage(index)
  items.value.push(...newItems)
  done(newItems.length === 0) // done(true) para encerrar o ciclo
}
</script>
```

## Modo reverse (chat)

```vue
<DssInfiniteScroll :reverse="true" scroll-target="#chat" @load="loadOlderMessages">
  <div v-for="msg in messages" :key="msg.id">{{ msg.text }}</div>
</DssInfiniteScroll>
```

## Controle programático

```vue
<DssInfiniteScroll ref="scrollRef" @load="onLoad">...</DssInfiniteScroll>

<script setup>
const scrollRef = ref(null)

// Forçar carregamento
scrollRef.value?.trigger()

// Pausar / retomar
scrollRef.value?.stop()
scrollRef.value?.resume()

// Reiniciar paginação
scrollRef.value?.reset()

// Verificar estado
console.log(scrollRef.value?.isLoading) // Ref<boolean>
console.log(scrollRef.value?.noMore)    // Ref<boolean>
</script>
```

## Slot de loading customizado

```vue
<DssInfiniteScroll @load="onLoad">
  <div v-for="item in items" :key="item.id">{{ item.label }}</div>

  <template #loading>
    <div class="meu-loading">Carregando...</div>
  </template>
</DssInfiniteScroll>
```

## Tratamento de erro

```vue
<script setup>
async function onLoad(index, done) {
  try {
    const data = await fetchItems(index)
    items.value.push(...data)
    done(data.length === 0)
  } catch (e) {
    hasError.value = true
    done() // Sempre chamar done() — nunca deixar o ciclo em aberto
  }
}
</script>
```

## Modos disponíveis

| Modo | Prop | Descrição |
|------|------|-----------|
| Padrão | — | Carrega ao atingir o fundo |
| Reverso | `reverse` | Carrega ao atingir o topo (chats) |
| Desabilitado | `disable` | Para detecção de scroll |

## Links

- [Documentação completa](./DssInfiniteScroll.md)
- [API Reference](./DSSINFINITESCROLL_API.md)
- [Exemplos](./DssInfiniteScroll.example.vue)
