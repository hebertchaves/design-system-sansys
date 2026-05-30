# DssAjaxBar

Barra de progresso global para requisições assíncronas — indica carregamento de dados via XHR/Fetch no viewport da aplicação.

## Quick Start

```vue
<script setup>
import { DssAjaxBar } from '@dss/components'
</script>

<template>
  <!-- Instanciar UMA vez no layout raiz -->
  <DssAjaxBar position="top" brand="hub" />
</template>
```

> **Requisito**: Instanciar apenas uma instância por aplicação, no layout raiz (App.vue ou DssLayout).

## Posições Disponíveis

| Prop `position` | Descrição |
|-----------------|-----------|
| `top` (padrão) | Barra fixa no topo do viewport |
| `bottom` | Barra fixa na parte inferior |
| `left` | Barra fixa na lateral esquerda (vertical) |
| `right` | Barra fixa na lateral direita (vertical) |

## Brand

```vue
<!-- Via prop -->
<DssAjaxBar brand="hub" />
<DssAjaxBar brand="water" />
<DssAjaxBar brand="waste" />

<!-- Via contexto ancestral -->
<div data-brand="hub">
  <DssAjaxBar />  <!-- Herda cor hub automaticamente -->
</div>
```

## Controle Manual

```vue
<script setup>
const ajaxBar = ref(null)
</script>

<template>
  <DssAjaxBar ref="ajaxBar" :skip-hijack="true" brand="hub" />
</template>

<!-- Controlar via ref -->
<script>
ajaxBar.value?.start()      // inicia
ajaxBar.value?.stop()       // para
ajaxBar.value?.increment(10) // incrementa 10 unidades
ajaxBar.value?.setProgress(75) // define para 75%
</script>
```

## Links

- [Documentação completa](./DssAjaxBar.md)
- [API Reference](./DSSAJAXBAR_API.md)
- [Exemplos](./DssAjaxBar.example.vue)
