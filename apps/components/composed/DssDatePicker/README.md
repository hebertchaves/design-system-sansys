# DssDatePicker

Seletor de data interativo do Design System Sansys (DSS), baseado no `QDate` do Quasar Framework.

## Instalação

```js
import { DssDatePicker } from '@dss/components'
```

## Uso Básico

```vue
<!-- Data única -->
<DssDatePicker v-model="date" />

<!-- Intervalo de datas -->
<DssDatePicker v-model="dateRange" range />

<!-- Múltiplas datas -->
<DssDatePicker v-model="dates" multiple />
```

## Modos de Seleção

| Modo | Prop | Tipo de modelValue |
|------|------|--------------------|
| Data única (padrão) | — | `String` (`YYYY/MM/DD`) |
| Intervalo | `range` | `{ from: String, to: String }` |
| Múltiplas datas | `multiple` | `String[]` |

## Restrição de Datas

```vue
<!-- Somente dias úteis -->
<DssDatePicker
  v-model="date"
  :options="(d) => new Date(d.replace(/\//g,'-')).getDay() % 6 !== 0"
/>

<!-- Limitar navegação -->
<DssDatePicker
  v-model="date"
  navigation-min-year-month="2026/01"
  navigation-max-year-month="2026/12"
/>
```

## Com Botão "Hoje"

```vue
<DssDatePicker v-model="date" today-btn />
```

## Estados

```vue
<DssDatePicker v-model="date" disable />
<DssDatePicker v-model="date" readonly />
```

## Composição Recomendada

```vue
<!-- Com DssDialog para picker com trigger -->
<DssButton label="Selecionar data" @click="showPicker = true" />
<DssDialog v-model="showPicker">
  <DssDatePicker v-model="date" />
  <DssButton label="Confirmar" @click="showPicker = false" />
</DssDialog>
```

## Brandabilidade

```html
<div data-brand="hub">
  <DssDatePicker v-model="date" />
</div>
```

## Links

- [Documentação completa](./DssDatePicker.md)
- [API Reference](./DSSDATEPICKER_API.md)
- [Exemplos](./DssDatePicker.example.vue)
