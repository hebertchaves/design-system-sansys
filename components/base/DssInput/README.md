# DssInput - Arquitetura em 4 Camadas

**Componente de Input** baseado no Quasar q-input, implementado com a nova arquitetura DSS em 4 camadas.

---

## 📁 Estrutura de Arquivos

```
DssInput/
├── 1-structure/              # LAYER 1: Estrutura Vue
│   └── DssInput.vue          (template + props + lógica)
│
├── 2-composition/            # LAYER 2: Composição Base
│   └── _base.scss            (estilos fundamentais)
│
├── 3-variants/               # LAYER 3: Variantes
│   ├── _filled.scss          (fundo sólido)
│   ├── _outlined.scss        (borda completa - padrão)
│   ├── _standout.scss        (alto contraste)
│   ├── _borderless.scss      (sem bordas)
│   └── index.scss            (orquestrador)
│
├── 4-output/                 # LAYER 4: Output Final
│   ├── _states.scss          (dark mode, focus, a11y)
│   ├── _brands.scss          (Hub, Water, Waste)
│   └── index.scss            (orquestrador)
│
├── DssInput.module.scss      # Importa todas as camadas (~50 linhas)
├── DssInput.example.vue      # 18 exemplos de uso
├── index.js                  # Exports
└── README.md                 # Esta documentação
```

---

## 🎯 Filosofia das 4 Camadas

### **LAYER 1: Structure (Estrutura)**
**Responsabilidade:** Template HTML + Props + Lógica Vue

**Características:**
- ✅ Template, props, computed, methods
- ✅ Lógica de estado (focus, blur, clear)
- ✅ Slots bem definidos
- ✅ v-model implementation
- ❌ Zero lógica de estilos

**Props Principais:**
```vue
{
  modelValue: String | Number,
  variant: 'outlined' | 'filled' | 'standout' | 'borderless',
  label: String,
  stackLabel: Boolean,
  placeholder: String,
  type: String,
  error: Boolean,
  errorMessage: String,
  hint: String,
  dense: Boolean,
  clearable: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  loading: Boolean,
  brand: 'hub' | 'water' | 'waste'
}
```

---

### **LAYER 2: Composition (Composição Base)**
**Responsabilidade:** Estilos fundamentais usando APENAS tokens genéricos

**Características:**
- ✅ Layout base (flexbox, positioning)
- ✅ ZERO valores hardcoded
- ✅ Usa tokens: `var(--dss-spacing-*)`, `var(--dss-radius-*)`
- ✅ Mixins: `@include dss-transition()`

**Exemplo:**
```scss
.dss-input__field {
  min-height: var(--dss-spacing-14); // 56px touch target
  padding: var(--dss-spacing-4);
  border-radius: var(--dss-radius-md);
  @include dss-transition(all, 'normal');
}

.dss-input__native {
  font-size: var(--dss-font-size-md);
  color: var(--dss-text-primary);
}
```

---

### **LAYER 3: Variants (Variantes)**
**Responsabilidade:** Variações visuais do componente

**Características:**
- ✅ 1 arquivo = 1 variante (~40 linhas)
- ✅ Fácil debug (problema no outlined? → `_outlined.scss`)
- ✅ Reutilizável

**Variantes Disponíveis:**
- `outlined` - Borda completa (padrão Quasar)
- `filled` - Fundo sólido
- `standout` - Alto contraste (ideal para toolbars)
- `borderless` - Sem bordas

**Exemplo - Outlined:**
```scss
.dss-input--outlined {
  .dss-input__field {
    background-color: transparent;
    border: var(--dss-border-width-thin) solid var(--dss-gray-400);
  }

  &.dss-input--focused .dss-input__field {
    border-color: var(--dss-action-primary);
    box-shadow: 0 0 0 1px var(--dss-action-primary);
  }
}
```

---

### **LAYER 4: Output (Saída Final)**
**Responsabilidade:** Estados especiais e orquestração final

**Características:**
- ✅ Dark mode
- ✅ Brandability (Hub, Water, Waste)
- ✅ Estados (focus, error, disabled, readonly)
- ✅ Accessibility (high contrast, reduced motion)

**Exemplo - Brands:**
```scss
[data-brand="hub"] .dss-input--brand-hub {
  &.dss-input--focused .dss-input__field {
    border-color: var(--dss-hub-600);
    box-shadow: 0 0 0 1px var(--dss-hub-600);
  }
}
```

---

## 🚀 Uso Básico

### **Importação**

```javascript
import { DssInput } from '@/dss/components/base/DssInput'
```

### **Exemplo 1: Input Simples**

```vue
<DssInput
  v-model="username"
  variant="outlined"
  label="Username"
  placeholder="Digite seu username"
/>
```

### **Exemplo 2: Input com Validação**

```vue
<DssInput
  v-model="email"
  variant="filled"
  label="Email"
  type="email"
  :error="!isValidEmail"
  error-message="Email inválido"
  hint="exemplo@dominio.com"
/>
```

### **Exemplo 3: Input com Ícones**

```vue
<DssInput
  v-model="password"
  variant="outlined"
  label="Senha"
  :type="showPassword ? 'text' : 'password'"
>
  <template #append>
    <button @click="showPassword = !showPassword">
      {{ showPassword ? '🙈' : '👁️' }}
    </button>
  </template>
</DssInput>
```

### **Exemplo 4: Input Clearable**

```vue
<DssInput
  v-model="search"
  variant="filled"
  label="Pesquisar"
  clearable
  placeholder="Digite para pesquisar..."
/>
```

### **Exemplo 5: Input com Brand**

```vue
<DssInput
  v-model="hubInput"
  variant="outlined"
  label="Hub Input"
  brand="hub"
  hint="Accent color laranja no focus"
/>
```

### **Exemplo 6: Input Dense**

```vue
<DssInput
  v-model="code"
  variant="outlined"
  label="Código"
  dense
  placeholder="Digite o código"
/>
```

---

## 🎨 Props API

| Prop | Type | Default | Values | Description |
|------|------|---------|--------|-------------|
| `modelValue` | String\|Number | `''` | - | Valor do input (v-model) |
| `variant` | String | `'outlined'` | `outlined`, `filled`, `standout`, `borderless` | Visual variant |
| `type` | String | `'text'` | HTML input types | Tipo do input |
| `label` | String | `''` | - | Label (floating) |
| `stackLabel` | Boolean | `false` | - | Label sempre no topo |
| `placeholder` | String | `''` | - | Placeholder text |
| `hint` | String | `''` | - | Helper text |
| `error` | Boolean | `false` | - | Estado de erro |
| `errorMessage` | String | `''` | - | Mensagem de erro |
| `disabled` | Boolean | `false` | - | Desabilita input |
| `readonly` | Boolean | `false` | - | Somente leitura |
| `dense` | Boolean | `false` | - | Versão compacta |
| `clearable` | Boolean | `false` | - | Botão de limpar |
| `loading` | Boolean | `false` | - | Estado de loading |
| `brand` | String | `null` | `hub`, `water`, `waste` | Brand accent |

---

## 🔌 Slots API

| Slot | Description |
|------|-------------|
| `label` | Custom label content |
| `prepend` | Content antes do input (dentro do field) |
| `append` | Content depois do input (dentro do field) |
| `before` | Content antes do field wrapper |
| `after` | Content depois do field wrapper |
| `error` | Custom error message |
| `hint` | Custom hint message |

---

## 🎭 Estados Visuais

### **Focus**
- Border/background muda de cor
- Label flutua para cima (se não stack)
- Box-shadow para destaque

### **Error**
- Border vermelho (`--dss-error-600`)
- Mensagem de erro abaixo
- Label mantém posição

### **Disabled**
- Opacidade reduzida (0.6)
- Border dotted
- Cursor `not-allowed`
- Não interativo

### **Readonly**
- Aparência normal
- Não editável
- Border/background mais suave

### **Loading**
- Spinner no append
- Pointer events desabilitado

---

## ✅ Benefícios da Arquitetura em 4 Camadas

### **1. Separação de Responsabilidades**
Cada arquivo tem 1 responsabilidade única:
- `_outlined.scss` → APENAS variante outlined
- `_brands.scss` → APENAS brandability
- Fácil encontrar e corrigir bugs

### **2. Arquivos Pequenos**
```
ANTES (monolítico):
- DssInput.module.scss → 1000+ linhas

DEPOIS (4 camadas):
- _base.scss → ~200 linhas
- _filled.scss → ~40 linhas
- _outlined.scss → ~45 linhas
- _standout.scss → ~50 linhas
- _borderless.scss → ~40 linhas
- _states.scss → ~100 linhas
- _brands.scss → ~120 linhas
- DssInput.module.scss → ~50 linhas (orquestrador)

Total: ~645 linhas (melhor organizadas)
```

### **3. Reutilização**
Variantes podem ser compartilhadas:
```scss
// Futuro: shared/variants/_outlined.scss
// Usado por: DssInput, DssSelect, DssTextarea, etc.
```

### **4. Testabilidade**
```javascript
// Testar APENAS variante standout
import standoutStyles from './3-variants/_standout.scss'

test('standout has dark background', () => {
  // test isolated
})
```

### **5. Manutenção**
```
Bug no hover do outlined focused?
→ Ir direto: 3-variants/_outlined.scss linha 12

vs ANTES:
→ DssInput.module.scss linha ??? (procurar em 1000+ linhas)
```

---

## 🔧 Tokens Utilizados

**ZERO tokens component-specific!** Apenas tokens genéricos reutilizáveis:

### **Spacing**
- `--dss-spacing-1` a `--dss-spacing-14` (padding, gaps, heights)

### **Border Radius**
- `--dss-radius-md` (field corners)
- `--dss-radius-full` (clear button)

### **Borders**
- `--dss-border-width-thin` (outlined)
- `--dss-border-width-md` (focus, standout)
- `--dss-border-width-thick` (high contrast)

### **Colors**
- `--dss-text-primary`, `--dss-text-secondary`, `--dss-text-hint`
- `--dss-text-disabled`, `--dss-text-inverse`
- `--dss-gray-50` to `--dss-gray-900` (backgrounds, borders)
- `--dss-action-primary` (focus state)
- `--dss-error-600`, `--dss-error-900` (error states)
- `--dss-focus-ring` (accessibility)

### **Typography**
- `--dss-font-family-sans`
- `--dss-font-size-sm`, `--dss-font-size-md`, `--dss-font-size-xl`
- `--dss-line-height-normal`

### **Brand**
- `--dss-hub-600`, `--dss-hub-700`
- `--dss-water-500`, `--dss-water-600`
- `--dss-waste-600`, `--dss-waste-700`

---

## 📝 Notas de Migração do Quasar

### **Props Compatíveis**
✅ `filled` → `variant="filled"`
✅ `outlined` → `variant="outlined"`
✅ `standout` → `variant="standout"`
✅ `borderless` → `variant="borderless"`
✅ `dense` → `dense`
✅ `stack-label` → `stackLabel`
✅ `clearable` → `clearable`
✅ `disable` → `disabled`
✅ `readonly` → `readonly`

### **Slots Compatíveis**
✅ `prepend`, `append`, `before`, `after`
✅ `error`, `hint`
✅ `label`

### **Diferenças**
⚠️ `brand` é específico do DSS (Hub, Water, Waste)
⚠️ Máscaras de input não implementadas (usar diretiva externa)
⚠️ Regras de validação não built-in (implementar externamente)

---

## 🎯 Próximos Passos

### **Melhorias Futuras**
- [ ] Shared variants (`shared/variants/_outlined.scss`)
- [ ] Input mask support (diretiva)
- [ ] Validation rules system
- [ ] Autogrow (textarea mode)
- [ ] Prefix/suffix text support

### **Testes**
- [ ] Unit tests (variantes, estados)
- [ ] Integration tests (slots, v-model)
- [ ] Visual regression tests
- [ ] Accessibility tests (WCAG 2.1 AA)
- [ ] Keyboard navigation tests

---

**Criado:** 18 de Dezembro de 2025
**Arquitetura:** 4 Camadas DSS v2.0
**Filosofia:** Tokens = Provedores, Componentes = Consumidores
**Baseado em:** Quasar q-input API oficial
