# DssTabPanels

Container pai dos `DssTabPanel`. Wrapper DSS sobre `QTabPanels` — gerencia qual painel está visível via `v-model`.

## Instalação

```js
import { DssTabPanels } from '@dss/components'
```

## Uso Básico

```vue
<template>
  <DssTabs v-model="activeTab">
    <DssTab name="tab1" label="Aba 1" />
    <DssTab name="tab2" label="Aba 2" />
  </DssTabs>

  <DssTabPanels v-model="activeTab">
    <DssTabPanel name="tab1">Conteúdo da Aba 1</DssTabPanel>
    <DssTabPanel name="tab2">Conteúdo da Aba 2</DssTabPanel>
  </DssTabPanels>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeTab = ref('tab1')
</script>
```

## Com Animação

```vue
<DssTabPanels v-model="activeTab" animated>
  <DssTabPanel name="tab1">...</DssTabPanel>
  <DssTabPanel name="tab2">...</DssTabPanel>
</DssTabPanels>
```

Fade governado pelo DSS: `--dss-duration-200` + `--dss-easing-standard`.
Desabilitado automaticamente em `prefers-reduced-motion: reduce`.

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `string \| number` | — | Painel ativo (v-model) |
| `animated` | `boolean` | `false` | Fade DSS entre painéis |
| `swipeable` | `boolean` | `false` | Navegação por swipe (mobile) |
| `infinite` | `boolean` | `false` | Navegação cíclica |
| `keepAlive` | `boolean` | `false` | Preserva estado dos painéis inativos |

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `string \| number` | Painel ativo alterado |

## Gate de Composição

O slot de `DssTabPanels` aceita **exclusivamente** componentes `DssTabPanel`.

```vue
<!-- ✅ Correto -->
<DssTabPanels v-model="tab">
  <DssTabPanel name="tab1">...</DssTabPanel>
</DssTabPanels>

<!-- ❌ Incorreto — use DssTabPanel -->
<DssTabPanels v-model="tab">
  <q-tab-panel name="tab1">...</q-tab-panel>
</DssTabPanels>
```

## Links

- [Documentação Normativa](./DssTabPanels.md)
- [API Reference](./DSSTABPANELS_API.md)
- [Exemplos](./DssTabPanels.example.vue)
- [DssTabPanel](../DssTabPanel/README.md)
- [DssTabs](../DssTabs/README.md)
