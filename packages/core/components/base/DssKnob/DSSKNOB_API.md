# DssKnob — API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `model-value` | `number` | **required** | Valor atual do knob (v-model). |
| `min` | `number` | `0` | Valor mínimo. |
| `max` | `number` | `100` | Valor máximo. |
| `inner-min` | `number` | — | Mínimo interno (restringe arrasto sem alterar min visual). |
| `inner-max` | `number` | — | Máximo interno (restringe arrasto sem alterar max visual). |
| `step` | `number` | `1` | Incremento por passo (drag + teclado). |
| `reverse` | `boolean` | `false` | Inverte direção do arco (sentido anti-horário). |
| `instant-feedback` | `boolean` | `false` | Desativa animação de transição do arco durante drag. |
| `readonly` | `boolean` | `false` | Impede interação sem alterar aparência (pointer-events:none gerenciado pelo QKnob). |
| `disable` | `boolean` | `false` | Impede interação + aplica opacidade reduzida. |
| `thickness` | `number` | `0.2` | Espessura do arco como fração do raio (0–1). |
| `angle` | `number` | — | Deslocamento de ângulo inicial do arco (em graus). |
| `rounded` | `boolean` | `false` | Terminações arredondadas no arco de progresso. |
| `tabindex` | `number \| string` | — | Índice de tabulação do knob. |
| `size` | `string` | — | Tamanho CSS do knob (ex: `'80px'`, `'5rem'`). Default QKnob ≈ 50px. |
| `name` | `string` | — | Atributo `name` para uso em formulários nativos. |
| `show-value` | `boolean` | `true` | Exibe o valor numérico no centro do knob. |
| `brand` | `'hub' \| 'water' \| 'waste'` | — | Cor do arco via sistema de marca DSS. |

## Props Bloqueadas (não expor ao consumer)

| Prop Quasar | Motivo |
|-------------|--------|
| `color` | Arco de progresso governado via `stroke: var(--dss-action-primary)`. Valor fixo `'primary'` passado internamente para garantir renderização do SVG circle. |
| `track-color` | Trilha de fundo governada via `stroke: var(--dss-surface-muted)`. Valor fixo `'grey-3'` passado internamente. |
| `center-color` | Fundo central governado via `fill: var(--dss-surface-default)`. Valor fixo `'white'` passado internamente. |
| `font-size` | Tipografia central governada via tokens DSS (`--dss-font-family-sans`, `--dss-font-size-xs`, `--dss-font-weight-medium`). Não passar garante que o inline style do QKnob não interfira. |

> **Motivo técnico**: `QCircularProgress` só renderiza os `<circle>` SVG se a prop correspondente **não** for `undefined`/`transparent`. As props fixas garantem a presença dos elementos no DOM para os seletores CSS DSS aplicarem `stroke`/`fill`.

---

## Slots

| Slot | Padrão | Descrição |
|------|--------|-----------|
| `default` | `{{ modelValue }}` | Conteúdo do centro do knob. Sobrescreve o valor padrão. |

```vue
<!-- Slot padrão (valor numérico) -->
<DssKnob v-model="vol" brand="hub" />

<!-- Slot customizado (unidade) -->
<DssKnob v-model="temp" brand="water">
  {{ temp }}°C
</DssKnob>

<!-- Slot com ícone -->
<DssKnob v-model="vol" brand="waste">
  <q-icon name="volume_up" size="20px" />
</DssKnob>
```

---

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `number` | Emitido durante drag e ao soltar. Use com `v-model`. |
| `change` | `number` | Emitido ao finalizar interação (mouse-up / touch-end). |
| `drag-value` | `number` | Emitido continuamente durante drag (frequência alta). |

```vue
<DssKnob
  v-model="value"
  @change="onFinalValue"
  @drag-value="onDragProgress"
  brand="hub"
/>
```

---

## Composable: `useKnobClasses`

```typescript
import { useKnobClasses } from '@dss/components'

const { rootClasses } = useKnobClasses(props)
// rootClasses: ComputedRef<string[]>
// → ['dss-knob']
// → ['dss-knob', 'dss-knob--brand-hub']  (quando brand="hub")
```

Gera as classes CSS do root em formato `ComputedRef` — útil para extensões ou testes unitários.

---

## Tipos TypeScript

```typescript
import type { KnobBrand, KnobProps, KnobEmits, KnobSlots } from '@dss/components'

type KnobBrand = 'hub' | 'water' | 'waste'

interface KnobProps {
  modelValue: number
  min?: number
  max?: number
  innerMin?: number
  innerMax?: number
  step?: number
  reverse?: boolean
  instantFeedback?: boolean
  readonly?: boolean
  disable?: boolean
  thickness?: number
  angle?: number
  rounded?: boolean
  tabindex?: number | string
  size?: string
  name?: string
  showValue?: boolean
  brand?: KnobBrand
}
```

---

## Tokens DSS Utilizados

| Token | Aplicação |
|-------|-----------|
| `--dss-action-primary` | Arco de progresso (estado neutro/sem brand) |
| `--dss-surface-muted` | Trilha de fundo do arco |
| `--dss-surface-default` | Preenchimento do círculo central |
| `--dss-font-family-sans` | Família tipográfica do valor central |
| `--dss-font-size-xs` | Tamanho de texto do valor central |
| `--dss-font-weight-medium` | Peso da fonte do valor central |
| `--dss-border-width-md` | Espessura do outline de foco |
| `--dss-focus-ring` | Cor do outline de foco (estado neutro) |
| `--dss-opacity-disabled` | Opacidade no estado desabilitado (0.4) |
| `--dss-hub-600` | Cor do arco quando `brand="hub"` |
| `--dss-water-500` | Cor do arco quando `brand="water"` |
| `--dss-waste-600` | Cor do arco quando `brand="waste"` |

---

## Seletores CSS Internos

Os seletores abaixo pertencem ao QKnob/QCircularProgress e são usados internamente pelo DSS para overrides. **Não usar diretamente em aplicações consumer.**

| Seletor | Elemento | Propriedade DSS |
|---------|----------|-----------------|
| `.q-circular-progress__circle` | Arco de progresso (SVG circle) | `stroke` |
| `.q-circular-progress__track` | Trilha de fundo (SVG circle) | `stroke` |
| `.q-circular-progress__center` | Círculo central (SVG circle) | `fill` |
| `.q-circular-progress__text` | Área de texto central | `font-family`, `font-size`, `font-weight` |
| `.q-circular-progress__svg` | Container SVG | `filter: brightness()` |
| `.q-knob--editable` | Root quando interativo | pseudo-class scope |

---

## Comportamentos Notáveis

### Cor do arco via CSS (não prop Quasar)

```
QKnob → QCircularProgress → <circle stroke="currentColor">
                                         ↑
                       CSS stroke: var(--dss-hub-600)
                       (CSS property > SVG attribute)
```

CSS `stroke`/`fill` têm maior precedência que atributos de apresentação SVG — o override não requer `!important`.

### Foco (EXC-Focus-01)

QKnob usa `::before + box-shadow` para anel de foco visual. DSS neutraliza via `box-shadow: none !important` e aplica `outline` no `:focus-visible` do root (padrão DssChip).

### Readonly vs Disabled

| Estado | Opacidade | Pointer Events | Cursor |
|--------|-----------|----------------|--------|
| `readonly` | normal | none (QKnob) | `default` (DSS) |
| `disable` | 0.4 | none (QKnob) | implícito |

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `Tab` | Foca o knob |
| `ArrowUp` / `ArrowRight` | +`step` |
| `ArrowDown` / `ArrowLeft` | −`step` |
| `PageUp` | +`step × 10` |
| `PageDown` | −`step × 10` |
| `Home` | Define para `min` |
| `End` | Define para `max` |

Teclado é gerenciado internamente pelo QKnob via ARIA `role="slider"`.

---

## Acessibilidade

- `role="slider"` e `aria-valuemin/max/now` gerenciados pelo QKnob.
- Para rótulo acessível, usar `aria-label` ou `aria-labelledby` — forwarded via `$attrs`.
- Tamanho mínimo: QKnob default ≈ 50px atende WCAG 2.5.5 (44px). Para `size` < `44px`, adicionar touch target externo.
- Foco visível: `outline` DSS ativo em `:focus-visible` (WCAG 2.4.11).

```vue
<DssKnob
  v-model="brightness"
  aria-label="Brilho da tela"
  brand="hub"
/>
```

---

## Paridade com Golden Reference e Golden Context

### DssChip (Golden Reference — componente interativo)
- Foco: `outline: var(--dss-border-width-md) solid var(--dss-focus-ring); border-radius: 50%` ✅
- Hover: `filter: brightness(0.95)` ✅
- Active: `filter: brightness(0.90)` ✅
- Disabled: `opacity: var(--dss-opacity-disabled)` = 0.4 ✅
- Brand: dual-selector (`.dss-knob--brand-{b}` + `[data-brand="{b}"] .dss-knob`) ✅

### DssSlider (Golden Context — controle de intervalo interativo)
- Valor via v-model numérico ✅
- Props min/max/step compartilhadas ✅
- Readonly/disable semântica idêntica ✅
- Navegação por teclado Arrow/Page/Home/End ✅
- ARIA role slider gerenciado pelo Quasar ✅
