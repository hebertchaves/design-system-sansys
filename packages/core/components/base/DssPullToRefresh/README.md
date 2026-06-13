# DssPullToRefresh

Wrapper DSS governado sobre `QPullToRefresh` do Quasar. Permite aos usuários atualizar o conteúdo puxando a tela para baixo, com feedback visual via indicador circular e suporte completo a brandabilidade DSS.

## Instalação

```js
import { DssPullToRefresh } from '@dss/components'
```

## Uso básico

```vue
<template>
  <div data-brand="hub" style="height: 400px; overflow-y: auto;">
    <DssPullToRefresh @refresh="onRefresh">
      <div v-for="item in items" :key="item.id">{{ item.label }}</div>
    </DssPullToRefresh>
  </div>
</template>

<script setup>
import { DssPullToRefresh } from '@dss/components'

function onRefresh(done) {
  fetchData().then(() => done())
}
</script>
```

> **IMPORTANTE:** Sempre chame `done()` ao final da atualização. Não chamar `done()` deixa o spinner girando indefinidamente.

## Modos de marca

```vue
<div data-brand="hub">   <DssPullToRefresh>...</DssPullToRefresh> </div>
<div data-brand="water"> <DssPullToRefresh>...</DssPullToRefresh> </div>
<div data-brand="waste"> <DssPullToRefresh>...</DssPullToRefresh> </div>
```

## Tamanhos

```vue
<DssPullToRefresh size="sm">...</DssPullToRefresh>  <!-- 36px handler -->
<DssPullToRefresh size="md">...</DssPullToRefresh>  <!-- 40px handler (padrão) -->
<DssPullToRefresh size="lg">...</DssPullToRefresh>  <!-- 56px handler -->
```

## Ativação programática

```vue
<DssPullToRefresh ref="ptr" @refresh="onRefresh">...</DssPullToRefresh>
...
ptr.value.trigger() // dispara refresh programaticamente
```

## Links

- [Documentação completa](./DssPullToRefresh.md)
- [API Reference](./DSSPULLTOREFRESH_API.md)
- [Exemplos interativos](./DssPullToRefresh.example.vue)
