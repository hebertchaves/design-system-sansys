# DssSlider — API Reference

**Versão DSS**: 2.2.0 | **Componente**: DssSlider | **Status**: Conformant

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `number` | — | Valor atual (v-model). |
| `min` | `number` | `0` | Valor mínimo da escala. |
| `max` | `number` | `100` | Valor máximo da escala. |
| `step` | `number` | `1` | Incremento por passo. Use `0` para contínuo. |
| `snap` | `boolean` | `false` | Fixar ao passo mais próximo durante arrasto. Requer `step > 0`. |
| `markers` | `boolean \| number` | `false` | Exibe marcadores de passo. `true` = a cada step; `number` = a cada N unidades. |
| `label` | `boolean` | `false` | Exibe tooltip com valor atual durante arrasto. |
| `labelAlways` | `boolean` | `false` | Exibe tooltip permanentemente (não apenas no arrasto). |
| `labelValue` | `string \| number \| null` | `null` | Valor customizado no tooltip. Quando `null`, exibe o valor numérico. |
| `hint` | `string` | `''` | Texto de ajuda abaixo do controle (oculto quando `error=true`). |
| `errorMessage` | `string` | `''` | Mensagem de erro exibida quando `error=true`. Associada via `aria-describedby`. |
| `error` | `boolean` | `false` | Ativa estado de erro (cor `--dss-feedback-error`). |
| `disabled` | `boolean` | `false` | Desabilita o slider. |
| `readonly` | `boolean` | `false` | Slider somente leitura — exibe mas não permite interação. |
| `dense` | `boolean` | `false` | Modo compacto (touch target reduzido para 36px). |
| `vertical` | `boolean` | `false` | Orientação vertical. Requer `height` explícito no container. |
| `reverse` | `boolean` | `false` | Inverte a direção do slider. |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca Sansys. |
| `tabindex` | `number \| string \| null` | `null` | Tabindex customizado. |
| `ariaLabel` | `string` | — | Label acessível para screen readers. Fortemente recomendado quando não há label visual associado. |

---

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `number` | Valor mudou durante arrasto (tempo real). |
| `change` | `number` | Valor confirmado ao soltar o thumb (mouse-up / touch-end). |

---

## Expose (métodos públicos)

```ts
const sliderRef = ref<SliderExpose>()

sliderRef.value?.focus()   // Foca no slider
sliderRef.value?.blur()    // Remove o foco
```

---

## Tokens Utilizados

**Total: 34 tokens**

| Categoria | Tokens |
|-----------|--------|
| Tipografia | `--dss-font-family-sans`, `--dss-font-size-xs`, `--dss-font-weight-medium`, `--dss-line-height-normal` |
| Dimensões | `--dss-touch-target-md`, `--dss-touch-target-sm`, `--dss-spacing-1`, `--dss-spacing-2`, `--dss-spacing-4`, `--dss-spacing-5`, `--dss-spacing-0_5` |
| Ação / Cor principal | `--dss-action-primary` |
| Superfícies | `--dss-surface-muted`, `--dss-surface-disabled` |
| Cores — gray | `--dss-gray-300`, `--dss-gray-400`, `--dss-gray-700`, `--dss-gray-900` |
| Cores — texto | `--dss-text-secondary`, `--dss-text-hint`, `--dss-text-inverse` |
| Feedback | `--dss-feedback-error` |
| Opacidade | `--dss-opacity-disabled` |
| Sombras / Focus | `--dss-shadow-focus`, `--dss-focus-ring-width` |
| Forma | `--dss-radius-md` |
| Bordas | `--dss-border-width-thin`, `--dss-border-width-md`, `--dss-border-width-thick` |
| Motion | `--dss-duration-200`, `--dss-easing-standard` |
| Brand Hub | `--dss-hub-600` |
| Brand Water | `--dss-water-500` |
| Brand Waste | `--dss-waste-600` |

---

## CSS Classes Públicas

| Classe | Condição |
|--------|----------|
| `dss-slider` | Sempre presente (wrapper externo) |
| `dss-slider--focused` | Quando o slider está com foco |
| `dss-slider--error` | `error=true` |
| `dss-slider--disabled` | `disabled=true` |
| `dss-slider--readonly` | `readonly=true` |
| `dss-slider--dense` | `dense=true` |
| `dss-slider--vertical` | `vertical=true` |
| `dss-slider--brand-hub/water/waste` | Conforme brand |
