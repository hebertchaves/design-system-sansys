# DSSTOOLBAR_API — Referência Técnica Completa

> Versão: 1.0.0 | Componente: DssToolbar | Nível Quasar: Nível 1 Independente (QToolbar)

---

## Sumário

- [Props DSS](#props-dss)
- [Props Bloqueadas](#props-bloqueadas)
- [Props Pass-through](#props-pass-through)
- [Slots](#slots)
- [Eventos](#eventos)
- [Classes CSS Geradas](#classes-css-geradas)
- [Atributo data-brand](#atributo-data-brand)
- [Estrutura do DOM](#estrutura-do-dom)
- [Tokens por Camada](#tokens-por-camada)
- [Paridade com DssCard (Golden Reference)](#paridade-com-dsscard-golden-reference)
- [TypeScript](#typescript)

---

## Props DSS

### `inset`

```typescript
inset?: boolean  // padrão: false
```

Adiciona recuo extra à esquerda da toolbar.

| Estado | `padding-inline-start` | Token |
|--------|----------------------|-------|
| `false` (padrão) | 16px | `--dss-spacing-4` |
| `true` | 24px | `--dss-spacing-6` |

**Uso:**
```vue
<!-- Alinhado com menu lateral ou drawer -->
<DssToolbar inset>
  <span class="text-subtitle1">Seção Indentada</span>
</DssToolbar>
```

---

### `brand`

```typescript
brand?: 'hub' | 'water' | 'waste'  // padrão: undefined
```

Aplica cor de fundo de uma das brands DSS. Quando definido:
1. Adiciona classe `.dss-toolbar--brand-{brand}` ao elemento
2. Adiciona atributo `data-brand="{brand}"` ao elemento
3. Muda cor de texto para `--dss-text-inverse` (branco)
4. Habilita herança de brand pelos componentes filhos

| Valor | Fundo | Token | Contraste (texto branco) | WCAG |
|-------|-------|-------|--------------------------|------|
| `'hub'` | Laranja | `--dss-hub-600` | ~2.8:1 | AA texto grande* |
| `'water'` | Azul | `--dss-water-600` | ~7.0:1 | AA + AAA |
| `'waste'` | Verde | `--dss-waste-600` | ~5.0:1 | AA |

*EXC-02: Hub requer texto grande (≥18pt) ou bold (≥14pt) para conformidade WCAG AA.

**Uso:**
```vue
<DssToolbar brand="hub">
  <DssButton flat round icon="menu" />
  <span class="text-subtitle1 q-ml-sm">Sansys Hub</span>
  <q-space />
  <DssButton flat round icon="account_circle" />
</DssToolbar>
```

---

## Props Bloqueadas

Estas props do QToolbar **não estão disponíveis** no DssToolbar:

| Prop Quasar | Tipo QToolbar | Motivo do Bloqueio |
|-------------|--------------|-------------------|
| `dark` | `boolean` | Modo escuro governado globalmente por `[data-theme="dark"]` via tokens DSS |
| `glossy` | `boolean` | Efeito visual não utilizado no DSS |
| `color` | `string` | Cor de fundo governada por tokens DSS + prop `brand` |
| `text-color` | `string` | Cor de texto governada por `--dss-text-body` / `--dss-text-inverse` |

Usar estas props no DssToolbar resultará em comportamento indefinido — elas **não são repropagadas** ao QToolbar.

---

## Props Pass-through

Atributos não declarados como props DSS são encaminhados ao `<q-toolbar>` interno via `v-bind="$attrs"` (com `inheritAttrs: false`).

### `dense`

```vue
<DssToolbar :dense="true">...</DssToolbar>
<!-- Resultado: <q-toolbar class="dss-toolbar q-toolbar--dense"> -->
```

O QToolbar aplica `.q-toolbar--dense` quando recebe `dense`. O DssToolbar reage via `3-variants/_dense.scss`:

| Propriedade | Normal | Dense |
|-------------|--------|-------|
| `min-height` | 56px (`--dss-spacing-14`) | 40px (`--dss-spacing-10`) |
| `padding-inline` | 16px (`--dss-spacing-4`) | 12px (`--dss-spacing-3`) |
| `padding-inline-start` (inset) | 24px (`--dss-spacing-6`) | 16px (`--dss-spacing-4`) |

### `aria-label`

```vue
<DssToolbar aria-label="Barra de navegação principal">
```

**Recomendado** para acessibilidade. Aplicado ao elemento raiz com `role="toolbar"`.

### Outros atributos HTML

Qualquer atributo HTML válido (`id`, `data-*`, `style`, etc.) é encaminhado ao `<q-toolbar>`.

---

## Slots

### `default`

O slot principal. Aceita qualquer conteúdo. Composição é responsabilidade do consumidor.

```vue
<DssToolbar>
  <!-- Qualquer conteúdo aqui -->
  <DssButton flat round icon="menu" />
  <span class="text-subtitle1">Título</span>
  <q-space />
  <DssButton flat round icon="search" />
</DssToolbar>
```

**Composição recomendada:**

```
[ação-esquerda] [título] [espaçador] [ações-direita]
```

| Elemento | Componente Recomendado |
|----------|----------------------|
| Ação (ícone) | `DssButton` flat + round |
| Título | `<span>` com classe tipográfica |
| Espaçador | `DssSpace` ou `q-space` |
| Separador | `DssSeparator` (vertical) |
| Ícone decorativo | `DssIcon` |

---

## Eventos

**Nenhum.** DssToolbar não emite eventos. Todos os eventos são responsabilidade dos componentes filhos.

---

## Classes CSS Geradas

```typescript
// Geradas por useToolbarClasses(props)
```

| Classe | Condição | Descrição |
|--------|---------|-----------|
| `dss-toolbar` | Sempre | Classe base — aplicada em todos os estados |
| `dss-toolbar--inset` | `inset === true` | Padding-inline-start ampliado |
| `dss-toolbar--brand-hub` | `brand === 'hub'` | Fundo laranja Hub |
| `dss-toolbar--brand-water` | `brand === 'water'` | Fundo azul Water |
| `dss-toolbar--brand-waste` | `brand === 'waste'` | Fundo verde Waste |

**Classes Quasar coexistentes** (aplicadas pelo QToolbar internamente):

| Classe | Condição | Fonte |
|--------|---------|-------|
| `q-toolbar` | Sempre | QToolbar nativo |
| `q-toolbar--dense` | `dense` via `$attrs` | QToolbar nativo (via pass-through) |

---

## Atributo `data-brand`

Quando `brand` está definido, o DssToolbar adiciona automaticamente `data-brand="{brand}"` ao elemento raiz.

Este atributo é o mecanismo de herança de brand do DSS: componentes filhos que usam o seletor CSS `[data-brand="hub"] .dss-component` recebem automaticamente as cores da brand ativa sem configuração explícita.

```html
<!-- template: brand="hub" -->
<div class="q-toolbar dss-toolbar dss-toolbar--brand-hub" data-brand="hub" role="toolbar">
  <!-- DssButton aqui usa cores hub automaticamente -->
  <!-- DssIcon aqui usa cores hub automaticamente -->
</div>
```

**Sem brand:**
```html
<!-- template: sem brand -->
<div class="q-toolbar dss-toolbar" role="toolbar">
  <!-- Filhos usam suas cores padrão -->
</div>
```

---

## Estrutura do DOM

```html
<!-- DssToolbar brand="water" aria-label="Barra principal" -->
<div
  role="toolbar"
  class="q-toolbar dss-toolbar dss-toolbar--brand-water"
  data-brand="water"
  aria-label="Barra principal"
>
  <!-- slot default: conteúdo do consumidor -->
</div>

<!-- DssToolbar :dense="true" -->
<div
  role="toolbar"
  class="q-toolbar q-toolbar--dense dss-toolbar"
>
  <!-- slot default -->
</div>

<!-- DssToolbar inset -->
<div
  role="toolbar"
  class="q-toolbar dss-toolbar dss-toolbar--inset"
>
  <!-- slot default -->
</div>
```

---

## Tokens por Camada

### Layer 2 — Composição Base (`2-composition/_base.scss`)

| Token | Propriedade | Valor |
|-------|------------|-------|
| `--dss-spacing-14` | `min-height` | 56px |
| `--dss-spacing-4` | `padding-inline` | 16px |
| `--dss-spacing-6` | `padding-inline-start` (inset) | 24px |
| `--dss-text-body` | `color` (padrão) | — |

### Layer 3 — Variantes (`3-variants/_dense.scss`)

| Token | Propriedade | Valor |
|-------|------------|-------|
| `--dss-spacing-10` | `min-height` (dense) | 40px |
| `--dss-spacing-3` | `padding-inline` (dense) | 12px |
| `--dss-spacing-4` | `padding-inline-start` (dense + inset) | 16px |

### Layer 4 — Brands (`4-output/_brands.scss`)

| Token | Propriedade | Condição |
|-------|------------|---------|
| `--dss-hub-600` | `background-color` | `brand="hub"` |
| `--dss-water-600` | `background-color` | `brand="water"` |
| `--dss-waste-600` | `background-color` | `brand="waste"` |
| `--dss-text-inverse` | `color` | Qualquer brand |

### Layer 4 — States (`4-output/_states.scss`)

| Token | Propriedade | Condição |
|-------|------------|---------|
| `--dss-text-body` | `color` | Dark mode |
| `--dss-border-width-thin` | `outline` | High contrast |

**Valores hardcoded excepcionais (documentados):**

| Valor | Propriedade | Contexto | Exceção |
|-------|------------|---------|---------|
| `ButtonFace` | `background-color` | forced-colors | EXC-03 |
| `ButtonText` | `color` | forced-colors | EXC-03 |
| `#000 !important` | `color` | print | EXC-04 |
| `transparent !important` | `background-color` | print | EXC-04 |

---

## Paridade com DssCard (Golden Reference)

| Característica | DssCard | DssToolbar | Divergência |
|----------------|---------|------------|-------------|
| Wrapper Quasar | QCard | QToolbar | Intencional — diferentes primitivos |
| Brandabilidade | `[data-brand]` + `.dss-card--brand-*` | `[data-brand]` + `.dss-toolbar--brand-*` | Idêntico padrão |
| Touch target | Não implementado | Não implementado | Idêntico |
| Estados interativos | Nenhum | Nenhum | Idêntico |
| Dual seletor brands | Sim | Sim | Idêntico |
| Sub-componentes DSS | DssCardSection, DssCardActions | Nenhum (futuro) | Divergência de fase |
| Orientação layout | Vertical | Horizontal | Intencional |
| Tokens de dimensão | `--dss-radius-*`, padding | `--dss-spacing-14`, padding | Diferentes por natureza |

---

## TypeScript

### Tipos Exportados

```typescript
// Importação
import type { ToolbarProps, ToolbarSlots, ToolbarBrand } from '@dss/components/DssToolbar'
```

### `ToolbarBrand`

```typescript
type ToolbarBrand = 'hub' | 'water' | 'waste'
```

### `ToolbarProps`

```typescript
interface ToolbarProps {
  /** Recuo extra à esquerda (padding-inline-start: 24px vs 16px padrão) */
  inset?: boolean

  /**
   * Cor de fundo da brand. Ativa [data-brand] no elemento.
   * - hub: #ef7a11 (laranja)
   * - water: #026cc7 (azul)
   * - waste: #0b8154 (verde)
   */
  brand?: ToolbarBrand
}
```

### `ToolbarSlots`

```typescript
interface ToolbarSlots {
  /** Conteúdo da toolbar (DssButton, texto, DssIcon, q-space) */
  default(): unknown
}
```

### Composable Exportado

```typescript
import { useToolbarClasses } from '@dss/components/DssToolbar'

// Uso interno (para extensão)
const { toolbarClasses } = useToolbarClasses(props)
// toolbarClasses: ComputedRef<string[]>
```

### Exemplo com TypeScript

```vue
<script setup lang="ts">
import { DssToolbar } from '@dss/components'
import type { ToolbarBrand } from '@dss/components/DssToolbar'

const activeBrand: ToolbarBrand = 'hub'
</script>

<template>
  <DssToolbar :brand="activeBrand" aria-label="Barra principal">
    <slot />
  </DssToolbar>
</template>
```
