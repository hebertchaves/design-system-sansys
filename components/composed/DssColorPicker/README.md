# DssColorPicker

Widget visual interativo de seleção de cores — Fase 2, Nível 3.

## Instalação

```js
import { DssColorPicker } from '@dss/components'
```

## Uso Básico

```vue
<DssColorPicker v-model="color" format-model="hex" />
```

## Com Paleta da Marca

```vue
<DssColorPicker
  v-model="brandColor"
  :palette="['#E65100', '#F57C00', '#0277BD', '#01579B', '#2E7D32', '#1B5E20']"
  default-view="palette"
/>
```

## Em Overlay

```vue
<DssPopupProxy>
  <template #trigger>
    <DssButton>Selecionar cor</DssButton>
  </template>
  <DssColorPicker v-model="color" />
</DssPopupProxy>
```

## Links

- [Documentação Completa](./DssColorPicker.md)
- [API Reference](./DSSCOLORPICKER_API.md)
- [Exemplos Interativos](./DssColorPicker.example.vue)
