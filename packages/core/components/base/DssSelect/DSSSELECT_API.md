# DssSelect — API Reference

**Versão DSS**: 2.2.0 | **Componente**: DssSelect | **Status**: Pending Audit

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `any` | `null` | Valor selecionado (v-model). Array quando `multiple=true`. |
| `options` | `any[]` | `[]` | Lista de opções. Strings ou objetos. |
| `optionValue` | `string \| Function` | `'value'` | Chave do valor em objetos de opção. |
| `optionLabel` | `string \| Function` | `'label'` | Chave do label em objetos de opção. |
| `emitValue` | `boolean` | `false` | Emite apenas o valor extraído, não o objeto inteiro. |
| `mapOptions` | `boolean` | `false` | Mapeia valores emitidos para objetos (use com `emitValue`). |
| `variant` | `'outlined' \| 'filled' \| 'standout' \| 'borderless'` | `'outlined'` | Variante visual. |
| `dense` | `boolean` | `false` | Modo compacto (altura reduzida). |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca Sansys. |
| `label` | `string` | `''` | Label flutuante do campo. |
| `stackLabel` | `boolean` | `false` | Label sempre visível no topo. |
| `placeholder` | `string` | `''` | Placeholder quando sem valor selecionado. |
| `hint` | `string` | `''` | Texto de ajuda abaixo do campo. |
| `errorMessage` | `string` | `''` | Mensagem de erro exibida abaixo do campo. |
| `error` | `boolean` | `false` | Ativa estado de erro (cor --dss-error-600). |
| `disabled` | `boolean` | `false` | Desabilita o campo. |
| `readonly` | `boolean` | `false` | Campo somente leitura. |
| `loading` | `boolean` | `false` | Exibe spinner de carregamento. |
| `required` | `boolean` | `false` | Marca como obrigatório (aria-required). |
| `multiple` | `boolean` | `false` | Permite seleção múltipla. |
| `useChips` | `boolean` | `false` | Exibe seleções múltiplas como chips no campo. |
| `clearable` | `boolean` | `false` | Exibe botão de limpar a seleção. |
| `ariaLabel` | `string` | — | Label de acessibilidade para screen readers. |
| `tabindex` | `number \| string \| null` | `null` | Tabindex customizado. |

---

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `any` | Valor selecionado mudou (v-model). |
| `focus` | `FocusEvent` | Campo recebeu foco. |
| `blur` | `FocusEvent` | Campo perdeu foco. |
| `clear` | — | Seleção foi limpa via botão clear. |
| `popup-show` | — | Painel dropdown foi aberto. |
| `popup-hide` | — | Painel dropdown foi fechado. |

---

## Slots

| Slot | Props | Descrição |
|------|-------|-----------|
| `label` | — | Label customizado. |
| `selected-item` | `{ opt, index }` | Customiza a exibição da seleção atual. Use com `DssChip` para governança DSS completa. |
| `option` | `{ opt, index, selected, focused }` | Customiza a exibição de cada opção no dropdown. |
| `before` | — | Conteúdo antes do campo. |
| `prepend` | — | Conteúdo à esquerda dentro do campo. |
| `append` | — | Conteúdo à direita dentro do campo (além da seta). |
| `after` | — | Conteúdo após o campo. |
| `error` | — | Mensagem de erro customizada. |
| `hint` | — | Texto de ajuda customizado. |

---

## Expose (métodos públicos)

```ts
const selectRef = ref<SelectExpose>()

selectRef.value?.focus()       // Foca no campo
selectRef.value?.blur()        // Remove o foco
selectRef.value?.showPopup()   // Abre o dropdown programaticamente
selectRef.value?.hidePopup()   // Fecha o dropdown programaticamente
selectRef.value?.nativeEl      // Elemento nativo do QSelect
```

---

## Composables

| Composable | Retorno | Uso |
|------------|---------|-----|
| `useSelectState(props)` | `{ isFocused, hasValue }` | Estado reativo do select. |
| `useSelectClasses(props, state)` | `{ wrapperClasses }` | Classes dinâmicas do wrapper. |
| `useSelectActions(emit, ref, isFocused)` | `{ handleFocus, handleBlur, focus, blur, showPopup, hidePopup, getNativeEl }` | Handlers e métodos expostos. |

---

## Tokens Utilizados

**Campo (51 tokens total)**

| Categoria | Tokens |
|-----------|--------|
| Tipografia | `--dss-font-family-sans`, `--dss-font-size-md`, `--dss-font-size-sm`, `--dss-line-height-normal` |
| Dimensões | `--dss-input-height-md`, `--dss-input-height-sm`, `--dss-spacing-1`, `--dss-spacing-2`, `--dss-spacing-3`, `--dss-spacing-4` |
| Cores — texto | `--dss-text-primary`, `--dss-text-secondary`, `--dss-text-hint`, `--dss-text-disabled`, `--dss-text-inverse`, `--dss-text-inverse-hint`, `--dss-text-inverse-secondary`, `--dss-text-action` |
| Cores — gray | `--dss-gray-50`, `--dss-gray-100`, `--dss-gray-200`, `--dss-gray-300`, `--dss-gray-400`, `--dss-gray-600`, `--dss-gray-700`, `--dss-gray-800`, `--dss-gray-900` |
| Forma | `--dss-radius-md` |
| Bordas | `--dss-border-width-thin`, `--dss-border-width-md`, `--dss-border-width-thick`, `--dss-border-gray-200` |
| Ação / Feedback | `--dss-action-primary`, `--dss-error-600`, `--dss-focus-ring` |
| Superfícies | `--dss-surface-default`, `--dss-surface-hover`, `--dss-surface-selected` |
| Opacidade | `--dss-opacity-disabled` |
| Motion | `--dss-duration-200`, `--dss-easing-standard` |
| Elevação / Z | `--dss-elevation-3`, `--dss-z-index-dropdown` |
| Brand Hub | `--dss-hub-600`, `--dss-hub-700` |
| Brand Water | `--dss-water-500`, `--dss-water-600`, `--dss-water-700` |
| Brand Waste | `--dss-waste-600`, `--dss-waste-700`, `--dss-waste-800` |

---

## CSS Classes Públicas

| Classe | Condição |
|--------|----------|
| `dss-select` | Sempre presente |
| `dss-select--outlined` / `--filled` / `--standout` / `--borderless` | Conforme variante |
| `dss-select--focused` | Durante foco |
| `dss-select--error` | `error=true` |
| `dss-select--disabled` | `disabled=true` |
| `dss-select--readonly` | `readonly=true` |
| `dss-select--dense` | `dense=true` |
| `dss-select--loading` | `loading=true` |
| `dss-select--multiple` | `multiple=true` |
| `dss-select--brand-hub/water/waste` | Conforme brand |
| `dss-select__panel` | No QMenu (via popup-content-class) |
| `dss-select__panel--brand-hub/water/waste` | No QMenu com brand ativo |
