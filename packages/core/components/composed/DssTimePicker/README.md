# DssTimePicker

Widget visual de seleção de tempo (clock face) — wrapper DSS sobre QTime do Quasar.

## Instalação

```javascript
import { DssTimePicker } from '@dss/components/composed/DssTimePicker'
```

## Uso básico

```html
<DssTimePicker v-model="time" />
```

```javascript
import { ref } from 'vue'
const time = ref('14:30')
```

## Exemplos

### Formato 12h (AM/PM)

```html
<DssTimePicker v-model="time" :format24h="false" mask="hh:mm A" />
```

### Com segundos

```html
<DssTimePicker v-model="time" :with-seconds="true" mask="HH:mm:ss" />
```

### Minimal (sem header)

```html
<DssTimePicker v-model="time" :minimal="true" />
```

### Layout horizontal

```html
<DssTimePicker v-model="time" :landscape="true" />
```

### Disabled / Readonly

```html
<DssTimePicker v-model="time" :disable="true" />
<DssTimePicker v-model="time" :readonly="true" />
```

### Com restrição de horários

```html
<DssTimePicker v-model="time" :options="businessHours" />
```

```javascript
function businessHours(hr, min) {
  if (min === null) return hr >= 8 && hr <= 18
  return min % 15 === 0
}
```

### Em dialog com confirmação

```html
<DssDialog v-model="open">
  <DssTimePicker v-model="selectedTime" />
  <div class="row justify-end q-mt-md">
    <DssButton flat label="Cancelar" @click="open = false" />
    <DssButton label="Confirmar" @click="confirm" />
  </div>
</DssDialog>
```

### Com brand

```html
<div data-brand="hub">
  <DssTimePicker v-model="time" />
</div>
```

## Props principais

| Prop | Tipo | Descrição |
|------|------|-----------|
| `modelValue` | `String` | Valor v-model |
| `format24h` | `Boolean` | `true` = 24h (padrão), `false` = AM/PM |
| `withSeconds` | `Boolean` | Exibe view de segundos |
| `minimal` | `Boolean` | Sem header |
| `landscape` | `Boolean` | Layout horizontal |
| `disable` | `Boolean` | Desabilita o picker |
| `readonly` | `Boolean` | Somente leitura |
| `options` | `Function` | Restringe valores |
| `nowBtn` | `Boolean` | Botão "Agora" |

## Tokens DSS

`--dss-action-primary` · `--dss-surface-default` · `--dss-surface-hover` · `--dss-radius-md` · `--dss-text-body` · `--dss-text-secondary` · `--dss-opacity-disabled` · `--dss-focus-ring`

## Links

- [API completa](./DSSTIMEPICKER_API.md)
- [Documentação normativa](./DssTimePicker.md)
- [Exemplos](./DssTimePicker.example.vue)
