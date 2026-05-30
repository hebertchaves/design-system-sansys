# DssInnerLoading — API Reference

## Props

| Prop | Tipo | Default | Obrigatório | Descrição |
|------|------|---------|-------------|-----------|
| `showing` | `Boolean` | — | ✅ SIM | Controla visibilidade do overlay de loading |
| `color` | `InnerLoadingColor` | `'primary'` | — | Cor semântica do spinner e do label |
| `size` | `InnerLoadingSize` | `'md'` | — | Tamanho do spinner interno (DssSpinner) |
| `label` | `String` | — | — | Texto exibido abaixo do spinner |
| `delay` | `Number` | `0` | — | Delay (ms) antes de exibir o overlay |
| `brand` | `InnerLoadingBrand` | — | — | Contexto de brand Sansys |

### Props Bloqueadas (não expostas ao consumidor)

| Prop Quasar | Motivo do Bloqueio |
|-------------|-------------------|
| `color` (QInnerLoading) | Cor governada via CSS property cascade e tokens DSS — nunca via tokens --q-color-* do Quasar |
| `size` (QInnerLoading) | Tamanho controlado via DssSpinner interno no slot default |
| `label` (QInnerLoading) | Label renderizado no slot default com CSS DSS tokenizado, não via prop Quasar |

### Tipos

#### `InnerLoadingColor`
```typescript
type InnerLoadingColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
```

#### `InnerLoadingSize`
```typescript
type InnerLoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

| Valor | Dimensão | Token |
|-------|----------|-------|
| `xs` | 16px | `--dss-icon-size-xs` (via DssSpinner) |
| `sm` | 20px | `--dss-icon-size-sm` (via DssSpinner) |
| `md` | 24px | `--dss-icon-size-md` (via DssSpinner) |
| `lg` | 32px | `--dss-icon-size-lg` (via DssSpinner) |
| `xl` | 48px | `--dss-icon-size-xl` (via DssSpinner) |

#### `InnerLoadingBrand`
```typescript
type InnerLoadingBrand = 'hub' | 'water' | 'waste'
```

---

## Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `() => unknown` | Substitui o DssSpinner + label padrão. Consumer assume responsabilidade pela acessibilidade. |

**Conteúdo padrão do slot (quando não preenchido):**
- `DssSpinner` com `:size="size"` e `aria-hidden="true"`
- `<span class="dss-inner-loading__label">{{ label }}</span>` (apenas se `label` for passado)

---

## Events

Nenhum evento é emitido pelo `DssInnerLoading`.

O gerenciamento de estado (`showing`) é responsabilidade exclusiva do componente pai.

---

## CSS Classes

| Classe | Quando aplicada |
|--------|----------------|
| `dss-inner-loading` | Sempre (root) |
| `dss-inner-loading--color-{color}` | Sempre (color default: primary) |
| `dss-inner-loading--size-{size}` | Sempre (size default: md) |
| `dss-inner-loading--brand-{brand}` | Quando prop `brand` é passada |
| `dss-inner-loading--has-label` | Quando prop `label` é passada |
| `dss-inner-loading__label` | No span do texto do label |

---

## Composable

### `useInnerLoadingClasses(props: InnerLoadingProps)`

Gera as classes CSS reativas do componente.

```typescript
import { useInnerLoadingClasses } from '@dss/components/DssInnerLoading'

const { rootClasses } = useInnerLoadingClasses(props)
// rootClasses: ComputedRef<(string | Record<string, boolean>)[]>
```

---

## Tabela de Tokens DSS

| Token | Propriedade CSS | Contexto |
|-------|----------------|----------|
| `--dss-surface-default` | `background-color` | Fundo do overlay (EX-Overlay-01) |
| `--dss-font-size-sm` | `font-size` | Label de texto |
| `--dss-font-weight-medium` | `font-weight` | Label de texto |
| `--dss-font-weight-bold` | `font-weight` | Label em prefers-contrast:more |
| `--dss-spacing-2` | `gap` | Espaçamento spinner ↔ label |
| `--dss-line-height-xs` | `line-height` | Proporção tipográfica do label |
| `--dss-action-primary` | `color` | Color variant: primary |
| `--dss-action-secondary` | `color` | Color variant: secondary |
| `--dss-feedback-error` | `color` | Color variant: error |
| `--dss-feedback-success` | `color` | Color variant: success |
| `--dss-feedback-warning` | `color` | Color variant: warning |
| `--dss-feedback-info` | `color` | Color variant: info |
| `--dss-hub-600` | `color` | Brand hub (light mode) |
| `--dss-hub-500` | `color` | Brand hub (dark mode) |
| `--dss-water-500` | `color` | Brand water (light mode) |
| `--dss-water-400` | `color` | Brand water (dark mode) |
| `--dss-waste-600` | `color` | Brand waste (light mode) |
| `--dss-waste-500` | `color` | Brand waste (dark mode) |

**Valores Estruturais (não tokenizados — documentados como exceções):**
- `border-radius: inherit` — EX-Structural-01: herda bordas do container pai
- `pointer-events: all` — bloqueia interação com o conteúdo abaixo do overlay
- `line-height: 1.4` — proporção tipográfica estrutural do label
- `0.01ms` e `1` — valores canônicos em prefers-reduced-motion (EX-States-01)
- `Canvas`, `CanvasText`, `ButtonText` — SystemColor keywords em forced-colors (EX-States-03)

---

## Comportamentos Implícitos

1. **Container pai requer `position: relative`**: QInnerLoading usa `position: absolute` internamente. Sem `position: relative` no pai, o overlay vazará para fora da área desejada. Documentado explicitamente no README.md.

2. **Fade transition automática**: QInnerLoading aplica `q-transition--fade` (Vue `<Transition>` CSS) ao alternar `showing`. Em `prefers-reduced-motion: reduce`, a transição é suprimida pelo EX-States-01.

3. **DssSpinner herda cor via currentColor**: A prop `color` de DssInnerLoading seta a propriedade CSS `color` no root. DssSpinner interno (sem prop `color` explícita) herda via `currentColor` do ancestral, garantindo sincronização automática de cor.

4. **DssSpinner com `aria-hidden="true"` no slot default**: O root de DssInnerLoading tem `role="status"` + `aria-live="polite"`, sendo o responsável primário pelo anúncio de loading. DssSpinner interno é puramente visual dentro deste contexto.

5. **Slot customizado desativa DssSpinner e label internos**: Ao fornecer conteúdo no slot default, o consumer obtém controle total — DssSpinner e label não são renderizados. Consumer assume responsabilidade pela acessibilidade.

6. **Prop `delay` delegada diretamente ao QInnerLoading**: A prop de delay é a implementação nativa do Quasar para evitar flash de loading. Valores `undefined` são tratados como `0ms` pelo Quasar.

---

## Paridade Golden Reference (DssBadge) e Golden Context (DssCircularProgress)

| Aspecto | DssBadge (Ref) | DssCircularProgress (Context) | DssInnerLoading |
|---------|---------------|------------------------------|----------------|
| Interatividade | ❌ Não interativo | ❌ Não interativo | ❌ Não interativo |
| Touch Target | N/A (Opção B) | N/A (Opção B) | N/A (Opção B) — overlay não interativo |
| `defineEmits` | Omitido | Omitido | Omitido |
| Cores via CSS | ✅ | ✅ (stroke/color) | ✅ (color cascade) |
| Brand dual-selector | ✅ | ✅ | ✅ |
| Acessibilidade | aria-* | role="progressbar" | role="status" + aria-live="polite" |
| Quasar como root | ❌ (div wrapper) | ❌ (div wrapper) | ✅ EXC-Gate-01 |
| prefers-reduced-motion | ✅ | ✅ EX-States-01 | ✅ EX-States-01 |
| forced-colors | ✅ | ✅ EX-States-03 | ✅ EX-States-03 |
