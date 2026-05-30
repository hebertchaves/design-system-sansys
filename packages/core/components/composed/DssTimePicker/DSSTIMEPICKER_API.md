# DssTimePicker — API Reference

> Golden Reference: **DssChip** · Golden Context: **DssKnob**  
> Motor: `QTime` (EXC-Gate-01)

---

## Props

| Prop | Tipo | Default | Obrigatório | Descrição |
|------|------|---------|-------------|-----------|
| `modelValue` | `String` | `undefined` | Não | Valor do tempo. Formato depende de `mask` |
| `landscape` | `Boolean` | `false` | Não | Layout horizontal |
| `mask` | `String` | `'HH:mm'` | Não | Máscara de formato do valor (`'HH:mm'`, `'hh:mm A'`, `'HH:mm:ss'`) |
| `locale` | `Object` | `undefined` | Não | Objeto de locale para internacionalização |
| `format24h` | `Boolean` | `true` | Não | `true` = 24h · `false` = AM/PM |
| `defaultView` | `'Hours' \| 'Minutes' \| 'Seconds'` | `'Hours'` | Não | View inicial |
| `options` | `Function(hr, min, sec): Boolean` | `undefined` | Não | Restringe valores selecionáveis |
| `hourOptions` | `Number[]` | `undefined` | Não | Horas permitidas (substitui `options` para horas) |
| `minuteOptions` | `Number[]` | `undefined` | Não | Minutos permitidos |
| `secondOptions` | `Number[]` | `undefined` | Não | Segundos permitidos |
| `withSeconds` | `Boolean` | `false` | Não | Exibe seletor de segundos |
| `nowBtn` | `Boolean` | `false` | Não | Exibe botão "Agora" |
| `minimal` | `Boolean` | `false` | Não | Sem header — apenas clock face |
| `readonly` | `Boolean` | `false` | Não | Visível e interativo, não editável |
| `disable` | `Boolean` | `false` | Não | Desabilitado completo |
| `name` | `String` | `undefined` | Não | Nome do campo oculto para formulários nativos |
| `tabindex` | `String \| Number` | `undefined` | Não | Ordem de foco |

### Props Bloqueadas (não passadas ao QTime)

| Prop | Motivo do Bloqueio |
|------|--------------------|
| `color` | EXC-Gate-02: `color="primary"` fixo + `--q-color-primary` CSS override |
| `textColor` | Governado via descendant selectors com tokens DSS |
| `dark` | Dark mode global via `[data-theme='dark']` |
| `square` | Border-radius fixo via `--dss-radius-md` |
| `flat` | Não aplicável ao DssTimePicker |
| `bordered` | Não aplicável ao DssTimePicker |

---

## Emits

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `string` | Disparado ao selecionar hora/minuto/segundo |

---

## Slots

| Slot | Descrição | Uso |
|------|-----------|-----|
| `default` | Conteúdo adicional dentro do QTime | Avançado — raramente necessário |

---

## Attrs ($attrs)

`inheritAttrs: false` com `v-bind="$attrs"` repassado ao QTime.

```html
<DssTimePicker aria-label="Selecione o horário" />
<DssTimePicker data-testid="picker-start" />
```

---

## Tokens Utilizados

| Token | Propriedade CSS | Uso |
|-------|-----------------|-----|
| `--dss-action-primary` | `--q-color-primary` | Ponteiro, header, número ativo |
| `--dss-surface-default` | `background-color` | Background do clock face |
| `--dss-surface-hover` | `background-color` | Hover nos números |
| `--dss-radius-md` | `border-radius` | Arredondamento do container |
| `--dss-text-body` | `color` | Texto dos números |
| `--dss-text-secondary` | `color` | Texto header AM/PM |
| `--dss-border-width-thin` | `border-width` | Print border |
| `--dss-border-width-md` | `outline-width` | Focus outline |
| `--dss-opacity-disabled` | `opacity` | Estado disabled |
| `--dss-focus-ring` | `outline-color` | Focus ring color |
| `--dss-duration-hover` | `transition-duration` | Duração hover |
| `--dss-easing-hover` | `transition-timing-function` | Easing hover |
| `--dss-duration-0` | `transition-duration` | prefers-reduced-motion |
| `--dss-hub-600` | `--q-color-primary` | Brand Hub |
| `--dss-water-500` | `--q-color-primary` | Brand Water |
| `--dss-waste-600` | `--q-color-primary` | Brand Waste |

---

## Paridade Golden Context (DssKnob)

| Padrão | DssKnob | DssTimePicker |
|--------|---------|---------------|
| Motor Quasar como root | QKnob | QTime |
| color fixo + CSS override | `color="primary"` fixo | `color="primary"` fixo |
| `--q-color-primary` override | ✅ | ✅ |
| `v-bind="$attrs"` antes dos fixos | ✅ | ✅ |
| Descendant selectors | `.q-circular-progress__*` | `.q-time__header`, `.q-time__clock-position--active` |
| CSS global (não scoped) | ✅ | ✅ |
| Sem defineExpose | ✅ | ✅ |
| Props bloqueadas documentadas | ✅ | ✅ |

---

## Paridade Golden Reference (DssChip)

| Padrão | DssChip | DssTimePicker |
|--------|---------|---------------|
| `defineOptions({ name, inheritAttrs: false })` | ✅ | ✅ |
| `v-bind="$attrs"` ao motor | ✅ | ✅ |
| Composable de classes | `useChipClasses` | `useTimePickerClasses` |
| Barrel `composables/index.ts` | ✅ | ✅ |
| `dss.meta.json` com goldenReference + goldenContext | ✅ | ✅ |
