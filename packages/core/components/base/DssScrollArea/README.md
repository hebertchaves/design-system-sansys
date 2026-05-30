# DssScrollArea

Container de conteúdo rolável com scrollbar customizada por tokens DSS. Wrapper governado sobre `QScrollArea` do Quasar.

## Instalação

```js
import { DssScrollArea } from '@dss/components'
```

## Uso Básico

```vue
<!-- Scroll vertical com altura fixa -->
<DssScrollArea style="height: 300px;" label="Lista de itens">
  <!-- Seu conteúdo aqui -->
</DssScrollArea>
```

## Modos

### Visibilidade da scrollbar

```vue
<!-- Auto-hide (padrão) -->
<DssScrollArea visible="auto" style="height: 300px;">...</DssScrollArea>

<!-- Sempre visível -->
<DssScrollArea visible="always" style="height: 300px;">...</DssScrollArea>

<!-- Sempre oculta (scroll funciona via teclado/touch) -->
<DssScrollArea visible="never" style="height: 300px;">...</DssScrollArea>
```

### Scroll horizontal

```vue
<DssScrollArea horizontal style="width: 400px;">
  <div style="display: flex; gap: 16px; width: max-content;">
    <!-- conteúdo largo -->
  </div>
</DssScrollArea>
```

### Controle programático

```vue
<template>
  <DssScrollArea ref="areaRef" style="height: 300px;">
    <!-- conteúdo -->
  </DssScrollArea>
  <button @click="scrollToTop">Voltar ao topo</button>
</template>

<script setup>
const areaRef = ref(null)
function scrollToTop() {
  areaRef.value?.scrollTo(0, 300)
}
</script>
```

### Evento de scroll

```vue
<DssScrollArea @scroll="onScroll" style="height: 300px;">
  <!-- conteúdo -->
</DssScrollArea>

<script setup>
function onScroll({ position, direction }) {
  console.log('Scroll para:', position, 'Direção:', direction)
}
</script>
```

### Brand theming

```vue
<!-- A scrollbar assume a cor do brand ativo -->
<div data-brand="hub">
  <DssScrollArea style="height: 300px;">...</DssScrollArea>
</div>
```

## Links

- [Documentação completa](./DssScrollArea.md)
- [API Reference](./DSSSCROLLAREA_API.md)
- [Exemplos interativos](./DssScrollArea.example.vue)
