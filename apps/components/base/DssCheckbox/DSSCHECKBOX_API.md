# DssCheckbox API - Documentação Completa

## Visao Geral

O `DssCheckbox` é um componente de checkbox do Design System Sansys baseado em `<input type="checkbox">` nativo, com **API pública governada pelo DSS**. Compact Control interativo com suporte a acessibilidade WCAG 2.1 AA e brandabilidade multi-marca.

---

## Props Completas

### **Valor / Model**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `boolean \| null \| any[]` | `false` | Valor atual do checkbox |
| `val` | `any` | — | Valor no modo grupo (array model) |
| `trueValue` | `any` | `true` | Valor customizado para estado marcado |
| `falseValue` | `any` | `false` | Valor customizado para estado desmarcado |
| `indeterminateValue` | `any` | `null` | Valor customizado para estado indeterminate |
| `toggleIndeterminate` | `boolean` | `false` | Habilita ciclo de 3 estados |

**Exemplo:**
```vue
<!-- Toggle simples -->
<DssCheckbox v-model="accepted" label="Accept" />

<!-- Valores customizados -->
<DssCheckbox v-model="answer" true-value="yes" false-value="no" label="Custom" />

<!-- Modo grupo (array) -->
<DssCheckbox v-model="fruits" val="apple" label="Apple" />
<DssCheckbox v-model="fruits" val="banana" label="Banana" />

<!-- Ciclo de 3 estados -->
<DssCheckbox v-model="tri" toggle-indeterminate label="Three-state" />
```

---

### **Conteúdo**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `label` | `string` | `''` | Texto do label |
| `leftLabel` | `boolean` | `false` | Posiciona label à esquerda do indicador |

**Exemplo:**
```vue
<DssCheckbox v-model="val" label="Label on right (default)" />
<DssCheckbox v-model="val" left-label label="Label on left" />
```

---

### **Visual**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `color` | `CheckboxColor` | `'primary'` | Cores semânticas conforme tipo `CheckboxColor` | Cor semântica do checkbox |
| `size` | `CheckboxSize` | `'md'` | `xs`, `sm`, `md`, `lg` | Tamanho do checkbox |

**Especificações por Size:**

| Size | Min-Height (root) | Control (caixa) | Font Size (ícone) | Font Size (label) | Gap |
|------|--------------------|-----------------|--------------------|--------------------|-----|
| `xs` | 20px | 16px | 12px | 12px | 4px |
| `sm` | 24px | 20px | 12px | 12px | 6px |
| `md` | 28px | 20px | 14px | 14px | 8px |
| `lg` | 32px | 24px | 16px | 16px | 12px |

**Exemplo:**
```vue
<DssCheckbox v-model="val" size="xs" label="Extra Small" />
<DssCheckbox v-model="val" size="sm" label="Small" />
<DssCheckbox v-model="val" size="md" label="Medium (default)" />
<DssCheckbox v-model="val" size="lg" label="Large" />
```

---

### **Estados**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `disable` | `boolean` | `false` | Desabilita todas as interações |
| `dense` | `boolean` | `false` | Modo compacto (reduz gap e min-height para valores de `sm`) |

**Exemplo:**
```vue
<!-- Disabled -->
<DssCheckbox :model-value="false" disable label="Disabled (unchecked)" />
<DssCheckbox :model-value="true" disable label="Disabled (checked)" />
<DssCheckbox :model-value="null" disable label="Disabled (indeterminate)" />

<!-- Dense -->
<DssCheckbox v-model="val" dense label="Dense mode" />
```

---

### **Brandabilidade (Exclusivo DSS)**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | `CheckboxBrand \| null` | `null` | `hub`, `water`, `waste` | Tema de marca Sansys |

**Exemplo:**
```vue
<!-- Brand via prop -->
<DssCheckbox :model-value="true" brand="hub" color="primary" label="Hub Primary" />
<DssCheckbox :model-value="true" brand="water" color="secondary" label="Water Secondary" />
<DssCheckbox :model-value="true" brand="waste" color="accent" label="Waste Accent" />

<!-- Brand via contexto (ancestral) -->
<div data-brand="hub">
  <DssCheckbox :model-value="true" color="primary" label="Hub (context)" />
</div>
```

**Cores suportadas com brand:** Com brand ativo, apenas `primary`, `secondary` e `accent` possuem mapeamento em `_brands.scss`. As cores `tertiary`, `positive`, `negative`, `warning` e `info` nao aplicam cor ao control com brand ativo.

---

### **Acessibilidade**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `tabindex` | `number \| string \| null` | `null` | Tabindex do input nativo. Default efetivo: `0`. Disabled: `-1` |
| `ariaLabel` | `string` | — | Label ARIA aplicado ao input nativo |

**Exemplo:**
```vue
<!-- Aria-label para checkbox sem label visual -->
<DssCheckbox v-model="val" aria-label="Enable notifications" />

<!-- Tabindex customizado -->
<DssCheckbox v-model="val" :tabindex="5" label="Custom tabindex" />
```

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `boolean \| null \| any[]` | Emitido ao alterar estado. Não emitido se `disable` é `true` |

**Payload por modo de operação:**

| Modo | Payload emitido |
|------|-----------------|
| Toggle simples | `trueValue` ou `falseValue` (default: `true` / `false`) |
| Ciclo de 3 estados | `trueValue`, `indeterminateValue` ou `falseValue` (default: `true`, `null`, `false`) |
| Grupo (array) | Nova cópia do array com `val` adicionado ou removido |

**Exemplo:**
```vue
<DssCheckbox
  v-model="accepted"
  label="Accept terms"
  @update:modelValue="onValueChange"
/>

<script setup>
import { ref } from 'vue'

const accepted = ref(false)

function onValueChange(newValue) {
  console.log('New value:', newValue)
}
</script>
```

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo customizado do label. Sobrescreve prop `label` quando presente |

**Exemplo:**
```vue
<!-- Slot default com HTML -->
<DssCheckbox v-model="val">
  <strong>Bold label</strong> with <em>emphasis</em>
</DssCheckbox>

<!-- Slot sobrescreve prop label -->
<DssCheckbox v-model="val" label="This is ignored">
  Slot content wins
</DssCheckbox>
```

---

## Sistema de Cores

### Sem Brand (classes utilitárias)

Quando nenhum `brand` está definido, o composable `useCheckboxClasses` aplica classes utilitárias Quasar ao `.dss-checkbox__control` quando checked ou indeterminate:

| Estado | Classes no Control |
|--------|--------------------|
| Unchecked | (nenhuma classe de cor) |
| Checked | `bg-{color} text-white` |
| Indeterminate | `bg-{color} text-white` |

### Com Brand (CSS matching)

Quando `brand` está definido, a classe `dss-checkbox--{color}` é aplicada ao root `<label>`. O CSS em `_brands.scss` usa seletores como:

```css
[data-brand='hub'] .dss-checkbox.dss-checkbox--primary .dss-checkbox__control--checked {
  background-color: var(--dss-hub-primary);
  border-color: var(--dss-hub-primary);
  color: var(--dss-hub-on-primary);
}
```

**Prioridade:** Se ambos `brand` prop e `data-brand` ancestral estiverem presentes, a prop `brand` tem prioridade (renderiza `data-brand` no próprio elemento, com maior especificidade CSS).

---

## Comportamento de v-model

### Modo 1: Toggle Simples (boolean)

```vue
<DssCheckbox v-model="val" label="Simple toggle" />
```

| Estado atual | Após change | Emite |
|-------------|-------------|-------|
| `false` | `true` | `true` |
| `true` | `false` | `false` |

### Modo 2: Ciclo de 3 Estados

```vue
<DssCheckbox v-model="val" toggle-indeterminate label="Three-state" />
```

| Estado atual | Após change | Emite |
|-------------|-------------|-------|
| `false` (unchecked) | `true` (checked) | `true` |
| `true` (checked) | `null` (indeterminate) | `null` |
| `null` (indeterminate) | `false` (unchecked) | `false` |

### Modo 3: Grupo (Array)

```vue
<DssCheckbox v-model="arr" val="x" label="Item X" />
```

| Estado atual | Condição | Após change | Emite |
|-------------|----------|-------------|-------|
| `['a', 'b']` | `val="c"` (não presente) | — | `['a', 'b', 'c']` |
| `['a', 'b', 'c']` | `val="b"` (presente) | — | `['a', 'c']` |

### Modo 4: Valores Customizados

```vue
<DssCheckbox v-model="val" true-value="yes" false-value="no" label="Custom" />
```

| Estado atual | Após change | Emite |
|-------------|-------------|-------|
| `'no'` | `'yes'` | `'yes'` |
| `'yes'` | `'no'` | `'no'` |

---

## Governança da API

### Props Governadas pelo DSS

O DssCheckbox implementa uma API governada pelo Design System Sansys:

- **Cores**: Cores semânticas conforme tipo `CheckboxColor` (definido em `types/checkbox.types.ts`)
- **Tamanhos**: 4 sizes com tokens genéricos de compact control
- **Brands**: Hub, Water, Waste com tokens de marca
- **Acessibilidade**: `tabindex`, `ariaLabel` com comportamento padronizado

### Tipos TypeScript

```typescript
type CheckboxColor = 'primary' | 'secondary' | 'tertiary' | 'accent'
                   | 'positive' | 'negative' | 'warning' | 'info'

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg'

type CheckboxBrand = 'hub' | 'water' | 'waste'
```

### Regras de Governança

- Cores são aplicadas via classes utilitárias no Vue (sem brand) ou via tokens de marca (com brand), NUNCA em SCSS direto
- Tokens de acessibilidade (`--dss-focus-*`) não devem ser sobrescritos
- Extensões de props devem seguir processo de governança DSS
- Novas cores semânticas requerem RFC e aprovação

---

## Versão

**DSS v2.2.0** - Implementação do DssCheckbox
**Baseado em**: `<input type="checkbox">` nativo com extensões DSS
**Governança**: Design System Sansys

**Última atualização:** Janeiro 2026
**Changelog:**
- Implementação inicial seguindo arquitetura DSS de 4 camadas
- 4 tamanhos (xs, sm, md, lg) via tokens genéricos de compact control
- 3 modos de operação (toggle, 3 estados, grupo array)
- Suporte a brands (Hub, Water, Waste)
- Acessibilidade WCAG 2.1 AA (touch target, focus ring, ARIA, high contrast, forced colors, reduced motion)
- Estados: checked, indeterminate, disabled, hover, active, focus, dense

---

## Recursos

- [DssCheckbox.md](./DssCheckbox.md) - Documentação Template 13.1
- [README.md](./README.md) - Quick reference
- [DssCheckbox.example.vue](./DssCheckbox.example.vue) - Showcase visual
- [DSS_TOKEN_REFERENCE.md](../../../docs/reference/DSS_TOKEN_REFERENCE.md) - Catálogo de tokens
