# DssSkeleton — API Reference

## Props

| Prop | Tipo | Default | Obrigatório | Descrição |
|------|------|---------|-------------|-----------|
| `type` | `SkeletonType` | `'rect'` | — | Forma visual do placeholder |
| `width` | `String` | — | — | Largura explícita (ex: `'200px'`, `'50%'`) |
| `height` | `String` | — | — | Altura explícita (ex: `'20px'`) |
| `lines` | `Number` | — | — | Nº de linhas (apenas para `type='text'`; `> 1` ativa layout multi-linha) |
| `animation` | `SkeletonAnimation` | `'wave'` | — | Tipo de animação de carregamento |
| `bordered` | `Boolean` | — | — | Adiciona borda ao redor do skeleton |
| `tag` | `String` | — | — | Tag HTML raiz do QSkeleton interno (default Quasar: `'div'`) |
| `radius` | `SkeletonRadius` | — | — | Token de raio de borda DSS (`'--dss-radius-sm'` a `'--dss-radius-full'`) |
| `brand` | `SkeletonBrand` | — | — | Contexto de brand Sansys |

### Props Bloqueadas (não expostas ao consumidor)

| Prop Quasar | Motivo do Bloqueio |
|-------------|-------------------|
| `color` | Cor governada via CSS cascade com tokens DSS — nunca via Quasar color names |
| `dark` | Dark mode controlado via media query `prefers-color-scheme` + DSS tokens |
| `square` | DSS expõe `type` para controle de forma; `type='circle'` sempre usa radius-full |
| `animation-speed` | Velocidade controlada pelo Quasar padrão (1500ms); DSS não expõe como token — use `animation='none'` para desabilitar |
| `size` | Substituído por `width` + `height` separados para maior flexibilidade |

### Tipos

#### `SkeletonType`
```typescript
type SkeletonType = 'rect' | 'text' | 'circle' | 'heading' | 'avatar'
```

| Valor | Descrição | Quasar Base | Dimensões padrão DSS |
|-------|-----------|-------------|----------------------|
| `rect` | Bloco retangular | `type="rect"` | 100% × auto |
| `text` | Linha de texto | `type="text"` | 100% × auto (QSkeleton padrão) |
| `circle` | Forma circular | `type="circle"` | user-defined |
| `heading` | Barra de título | `type="rect"` | 100% × `--dss-spacing-6` (24px) |
| `avatar` | Círculo de perfil | `type="circle"` | `--dss-icon-size-xl` × `--dss-icon-size-xl` (48px) |

#### `SkeletonAnimation`
```typescript
type SkeletonAnimation = 'wave' | 'pulse' | 'none'
```

| Valor | Descrição | Quasar equivalente |
|-------|-----------|-------------------|
| `wave` | Onda horizontal | `animation="wave"` |
| `pulse` | Pulso de opacidade | `animation="pulse"` |
| `none` | Sem animação | `animation="none"` |

> Quasar também oferece `wave-reverse`, `pulse-x`, `pulse-y`, `fade`, `blink` — bloqueados no DSS para manter consistência visual.

#### `SkeletonRadius`
```typescript
type SkeletonRadius =
  | '--dss-radius-none'
  | '--dss-radius-sm'
  | '--dss-radius-md'
  | '--dss-radius-lg'
  | '--dss-radius-xl'
  | '--dss-radius-2xl'
  | '--dss-radius-3xl'
  | '--dss-radius-full'
```

> Aceita o NOME do token DSS como string. Internamente convertido para `var(--dss-radius-*)`.
> Não se aplica a `type='circle'` e `type='avatar'` (sempre `--dss-radius-full`).

#### `SkeletonBrand`
```typescript
type SkeletonBrand = 'hub' | 'water' | 'waste'
```

---

## Slots

**Nenhum slot exposto.** `DssSkeleton` é um componente de placeholder puro — não aceita conteúdo via slot.

---

## Events

**Nenhum evento emitido.** `DssSkeleton` é um componente visual não interativo.

`defineEmits` não declarado (padrão DSS para containers não-emissores — precedente: DssLinearProgress, DssCircularProgress, DssInnerLoading).

---

## CSS Classes

| Classe | Quando aplicada |
|--------|----------------|
| `dss-skeleton` | Sempre (root) |
| `dss-skeleton--type-{type}` | Sempre (type default: rect) |
| `dss-skeleton--anim-{animation}` | Sempre (animation default: wave) |
| `dss-skeleton--multi` | Quando `type='text'` e `lines > 1` |
| `dss-skeleton--brand-{brand}` | Quando prop `brand` é passada |
| `dss-skeleton__item` | No(s) QSkeleton(s) internos |

---

## Composable

### `useSkeletonClasses(props: SkeletonProps)`

Gera classes CSS reativas e dados computados do componente.

```typescript
import { useSkeletonClasses } from '@dss/components/DssSkeleton'

const {
  rootClasses,    // ComputedRef<(string | Record<string, boolean>)[]>
  rootStyle,      // ComputedRef<Record<string, string>>
  quasarType,     // ComputedRef<string> — tipo mapeado para QSkeleton
  quasarAnimation, // ComputedRef<string> — animação mapeada para QSkeleton
  skeletonItems,  // ComputedRef<{ width?: string }[]> — array de items para v-for
} = useSkeletonClasses(props)
```

---

## Tabela de Tokens DSS

| Token | Propriedade CSS | Contexto |
|-------|----------------|----------|
| `--dss-surface-muted` | `background-color` | Fundo padrão do skeleton (EXC-Gate-01) |
| `--dss-radius-sm` | `border-radius` | Raio padrão rect/text/heading (fallback) |
| `--dss-radius-full` | `border-radius` | Raio circle/avatar |
| `--dss-gray-200` | `border-color` | Borda quando `bordered=true` (EXC-Gate-03) |
| `--dss-icon-size-xl` | `width`, `height` | Dimensões padrão do `type='avatar'` |
| `--dss-spacing-2` | `gap` | Gap entre linhas no layout multi-linha |
| `--dss-spacing-6` | `height` | Altura padrão do `type='heading'` |
| `--dss-hub-100` | `background-color` | Brand hub |
| `--dss-water-100` | `background-color` | Brand water |
| `--dss-waste-100` | `background-color` | Brand waste |
| `--dss-hub-200` | `border-color` | Brand hub + bordered |
| `--dss-water-200` | `border-color` | Brand water + bordered |
| `--dss-waste-200` | `border-color` | Brand waste + bordered |

**Valores Estruturais (não tokenizados — documentados como exceções):**
- `0.01ms` e `1` — valores canônicos em prefers-reduced-motion (EX-States-01)
- `Canvas`, `CanvasText` — SystemColor keywords em forced-colors (EX-States-03)
- `1px` — espessura estrutural de borda em forced-colors (EX-States-03)
- `70%` — largura da última linha em multi-linha text (valor estrutural canônico de simulação)

---

## Comportamentos Implícitos

1. **`aria-hidden="true"` no root**: DssSkeleton é um placeholder visual puro. Consumidores de tecnologia assistiva não devem interagir com o skeleton. O controle de `aria-busy` é responsabilidade do container pai (`aria-busy="true"` enquanto carrega; `aria-busy="false"` quando pronto).

2. **Multi-linha: última linha com 70% de largura**: Quando `type='text'` e `lines > 1`, a última linha renderiza com `width="70%"` para simular realismo de parágrafo — linhas de texto raramente terminam alinhadas. Linhas anteriores usam a `width` explícita (ou 100% do container se não especificada).

3. **QSkeleton wave animation usa `::after`**: A animação de onda do QSkeleton é um overlay branco semi-transparente via `::after`. Funciona visualmente sobre qualquer cor de fundo clara. Em dark mode (`--dss-surface-muted` = #737373), o overlay branco ainda gera um efeito visível.

4. **`radius` prop sobrescreve CSS default via CSS custom property**: O prop `radius` injeta `--dss-skeleton-radius: var(--dss-radius-*)` no root via inline style. A SCSS usa `border-radius: var(--dss-skeleton-radius, var(--dss-radius-sm))`. Não se aplica a `type='circle'` e `type='avatar'` (sempre radius-full).

5. **`width` e `height` explícitos sobrescrevem defaults de CSS**: QSkeleton injeta inline styles quando `width`/`height` são passados. Para `type='heading'` (CSS default height: `--dss-spacing-6`) e `type='avatar'` (CSS default: `--dss-icon-size-xl`), os props explícitos têm prioridade sobre os defaults de CSS.

6. **`bordered` delegado ao QSkeleton**: A prop `bordered` é passada diretamente ao QSkeleton, que adiciona classe interna `q-skeleton--bordered`. DssSkeleton hooks into `.q-skeleton.q-skeleton--bordered` para sobrescrever a border-color com `--dss-gray-200` (EXC-Gate-03).

7. **`tag` prop**: Controla a tag HTML raiz de cada QSkeleton interno. Útil para renderização semântica em listas (`<li>`) ou tabelas (`<td>`). Default Quasar: `'div'`.

8. **defineOptions `inheritAttrs: false` + `v-bind="$attrs"`**: Atributos extras do consumer (aria-label, aria-describedby, etc.) são forwarded ao root `<div>`. `aria-hidden="true"` é o default mas pode ser sobrescrito via `$attrs`.

---

## Paridade Golden Reference (DssBadge) e Golden Context (DssInnerLoading)

| Aspecto | DssBadge (Ref) | DssInnerLoading (Context) | DssSkeleton |
|---------|---------------|--------------------------|-------------|
| Interatividade | ❌ Não interativo | ❌ Não interativo | ❌ Não interativo |
| Touch Target | N/A (Opção B) | N/A (Opção B) | N/A — não interativo |
| `defineEmits` | Omitido | Omitido | Omitido |
| `aria-hidden` | — | DssSpinner interno | ✅ Root div (placeholder visual) |
| Brand dual-selector | ✅ | ✅ | ✅ |
| Quasar como root | ❌ (div wrapper) | ✅ EXC-Gate-01 | ❌ (div wrapper) |
| prefers-contrast: more | ✅ `border currentColor` | ✅ `font-weight bold` | ✅ `border 1px currentColor` |
| prefers-reduced-motion | ✅ | ✅ EX-States-01 | ✅ EX-States-01 |
| forced-colors | ✅ | ✅ EX-States-03 | ✅ EX-States-03 |
| print hidden | ✅ | ✅ EX-States-02 | ✅ EX-States-02 |
