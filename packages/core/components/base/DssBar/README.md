# DssBar

Barra de sistema para título de janela (desktop/Electron) ou barra superior de aplicação mobile. Wrapper do componente `QBar` do Quasar com tokens DSS e brandabilidade.

## Instalação

```js
import { DssBar } from '@dss/components'
```

## Uso Básico

```vue
<DssBar>
  <span>Título da Aplicação</span>
  <q-space />
  <DssButton flat round icon="close" />
</DssBar>
```

## Modos

```vue
<!-- Compacto -->
<DssBar dense>...</DssBar>

<!-- Elevado -->
<DssBar elevated>...</DssBar>
```

## Brandabilidade

```vue
<div data-brand="hub">
  <DssBar elevated>
    <span>Sansys Hub</span>
  </DssBar>
</div>
```

## Links

- [Documentação completa](./DssBar.md)
- [API Reference](./DSSBAR_API.md)
- [Exemplos interativos](./DssBar.example.vue)
