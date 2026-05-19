# DssRating — API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `model-value` | `number` | **required** | Valor atual da avaliação (v-model). |
| `max` | `number` | `5` | Número máximo de ícones na escala. |
| `size` | `string` | — | Tamanho CSS dos ícones (ex: `'24px'`, `'2rem'`). Default QRating ≈ 24px. |
| `icon` | `string \| string[]` | `'star'` | Ícone(s) do Material Icons para os itens não-selecionados. Array permite ícones diferentes por posição. |
| `icon-selected` | `string \| string[]` | — | Ícone(s) para itens selecionados. Se omitido, usa `icon`. |
| `icon-half` | `string \| string[]` | — | Ícone(s) para meia-avaliação (ex: `'star_half'`). Exibido quando `model-value` tem decimal. |
| `no-reset` | `boolean` | `false` | Impede reset para 0 ao clicar no ícone já selecionado. Recomendado para formulários obrigatórios. |
| `readonly` | `boolean` | `false` | Exibe o valor sem permitir interação. Sem opacidade reduzida (readonly ≠ disabled). |
| `disable` | `boolean` | `false` | Desabilita a interação + aplica opacidade reduzida. |
| `tabindex` | `number \| string` | — | Índice de tabulação do componente. |
| `name` | `string` | — | Atributo `name` para input oculto em formulários nativos. |
| `brand` | `'hub' \| 'water' \| 'waste'` | — | Cor dos ícones selecionados via sistema de marca DSS. |

### Props Bloqueadas (não expor ao consumer)

| Prop Quasar | Motivo |
|-------------|--------|
| `color` | Ícones não-selecionados governados via CSS `color: var(--dss-surface-muted)`. QRating não recebe prop color → sem classe `text-*` → CSS cascade controla diretamente. |
| `color-selected` | Ícones selecionados governados via CSS `color: var(--dss-action-primary)`. Substituído por prop `brand`. |
| `color-half` | Ícone de meia avaliação governado via CSS `color: var(--dss-action-primary)`. Mesmo token dos selecionados. |

> **Diferença de DssKnob**: DssRating NÃO precisa de EXC-Gate-02 (valores fixos internos) porque QRating só adiciona classe `text-*` quando `color` é passado explicitamente. Sem a prop, o CSS controla as cores diretamente sem conflito.

---

## Slots

DssRating não expõe slots públicos. O conteúdo dos ícones é gerenciado internamente pelo QRating via Material Icons (prop `icon`/`icon-selected`/`icon-half`).

---

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `number` | Emitido ao alterar o valor (click ou teclado). Use com `v-model`. |

```vue
<DssRating
  v-model="rating"
  @update:model-value="onRatingChange"
  brand="hub"
/>
```

---

## Composable: `useRatingClasses`

```typescript
import { useRatingClasses } from '@dss/components'

const { rootClasses } = useRatingClasses(props)
// rootClasses: ComputedRef<string[]>
// → ['dss-rating']
// → ['dss-rating', 'dss-rating--brand-hub']  (quando brand="hub")
```

---

## Tipos TypeScript

```typescript
import type { RatingBrand, RatingProps, RatingEmits, RatingSlots } from '@dss/components'

type RatingBrand = 'hub' | 'water' | 'waste'

interface RatingProps {
  modelValue: number
  max?: number
  size?: string
  icon?: string | string[]
  iconSelected?: string | string[]
  iconHalf?: string | string[]
  noReset?: boolean
  readonly?: boolean
  disable?: boolean
  tabindex?: number | string
  name?: string
  brand?: RatingBrand
}
```

---

## Tokens DSS Utilizados

| Token | Aplicação |
|-------|-----------|
| `--dss-action-primary` | Cor dos ícones selecionados (estado neutro/sem brand) |
| `--dss-surface-muted` | Cor dos ícones não-selecionados (todos os brands) |
| `--dss-border-width-md` | Espessura do outline de foco (normal) |
| `--dss-border-width-thick` | Espessura do outline de foco (alto contraste) |
| `--dss-focus-ring` | Cor do outline de foco (estado neutro) |
| `--dss-opacity-disabled` | Opacidade no estado desabilitado (0.4) |
| `--dss-radius-sm` | Border-radius do focus outline (4px) |
| `--dss-duration-150` | Duração das transições de cor e filter |
| `--dss-easing-standard` | Curva de animação das transições |
| `--dss-hub-600` | Cor dos ícones selecionados quando `brand="hub"` |
| `--dss-water-500` | Cor dos ícones selecionados quando `brand="water"` |
| `--dss-waste-600` | Cor dos ícones selecionados quando `brand="waste"` |

---

## Seletores CSS Internos (QRating)

Os seletores abaixo pertencem ao QRating e são usados internamente pelo DSS para overrides. **Não usar diretamente em aplicações consumer.**

| Seletor | Elemento | Propriedade DSS |
|---------|----------|-----------------|
| `.q-rating__icon` | Cada ícone (base) | `color` |
| `.q-rating__icon--active` | Ícones selecionados | `color` |
| `.q-rating__icon--half` | Ícone de meia avaliação | `color` |
| `.q-rating__icon--hovered` | Ícones sob hover | `color`, `filter` |
| `.q-rating--editable` | Root quando interativo | pseudo-class scope |

---

## Comportamentos Notáveis

### Mecanismo de Cores (EX-Color-01)

```
QRating sem prop color → sem classe text-* no DOM
  → CSS .q-rating__icon { color: var(--dss-surface-muted) }   (não-selecionado)
  → CSS .q-rating__icon--active { color: var(--dss-action-primary) }  (selecionado)
  → CSS cascade: --active declarado APÓS icon → vence por order
```

**Diferença de DssKnob**: DssKnob precisa de valores fixos (EXC-Gate-02) porque QCircularProgress só renderiza `<circle>` SVG se a prop não for `undefined`. QRating sempre renderiza seus ícones independentemente da prop `color`, então basta omitir a prop.

### Readonly vs Disabled

| Estado | Opacidade | Pointer Events | Cursor | `.q-rating--editable` |
|--------|-----------|----------------|--------|----------------------|
| `readonly` | normal | none (QRating) | `default` (DSS) | ausente |
| `disable` | 0.4 | none (QRating) | implícito | ausente |

### icon-half

Para exibir ícone de meia avaliação:
1. Passar `icon-half` (ex: `'star_half'`)
2. O `model-value` deve conter decimal (ex: `3.5`)
3. A meia avaliação usa a mesma cor que ícones totalmente selecionados (`--dss-action-primary` / brand)

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `Tab` | Foca o componente |
| `ArrowRight` / `ArrowUp` | +1 |
| `ArrowLeft` / `ArrowDown` | −1 |
| `Home` | Define para 0 |
| `End` | Define para `max` |

Teclado é gerenciado internamente pelo QRating via ARIA `role="slider"`.

---

## Acessibilidade

- `role="slider"`, `aria-valuemin=0`, `aria-valuemax={max}`, `aria-valuenow={value}` gerenciados pelo QRating.
- Para rótulo acessível: `aria-label` ou `aria-labelledby` — forwarded via `$attrs`.
- **WCAG 2.5.5**: Tamanho mínimo de alvo interativo = 44×44px. O default do QRating (~24px por ícone) pode ser insuficiente para uso touch. Usar `size="44px"` em interfaces móveis.
- Foco visível: `outline` DSS ativo em `:focus-visible` (WCAG 2.4.11).

```vue
<DssRating
  v-model="satisfacao"
  aria-label="Nível de satisfação (1 a 5 estrelas)"
  size="44px"
  brand="hub"
/>
```

---

## Paridade com Golden Reference e Golden Context

### DssChip (Golden Reference — componente interativo)
- Foco: `outline: var(--dss-border-width-md) solid var(--dss-focus-ring)` ✅
- Hover: `filter: brightness(0.95)` ✅
- Active: `filter: brightness(0.90)` ✅
- Disabled: `opacity: var(--dss-opacity-disabled)` = 0.4 ✅
- Brand: dual-selector (`.dss-rating--brand-{b}` + `[data-brand="{b}"] .dss-rating`) ✅

### DssKnob (Golden Context — controle de valor numérico interativo)
- Valor numérico via v-model ✅
- `readonly`/`disable` semântica idêntica ✅
- QComponent como root (EXC-Gate-01) ✅
- ARIA role gerenciado pelo Quasar ✅
- Brand dual-selector ✅
- Diferença intencional: DssKnob usa EXC-Gate-02 (props fixas para renderização SVG); DssRating usa EX-Color-01 (sem props Quasar → CSS cascade puro) — QRating não tem dependência de props para renderização dos ícones
