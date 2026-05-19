# Pré-prompt: DssField
*(Atualizado 19 Mai 2026 — pós-auditoria v2.5, 1 ciclo)*

---

## 1. CLASSIFICAÇÃO E CONTEXTO

| Campo | Valor |
|-------|-------|
| **Fase** | 2 — Nível 2 (Composição de Primeiro Grau) |
| **Família** | Formulários |
| **Golden Reference** | DssChip |
| **Golden Context** | DssInput |
| **Quasar Base** | QField (conceitual — implementação custom, sem dependência de QField) |

**Justificativa de Fase 2:** DssField é um wrapper estrutural de campo — fornece apenas o chrome visual (label, borda, hint, error) sem controlar o valor. Não depende de componentes DSS internos, mas seu padrão visual deve ser idêntico ao DssInput (Golden Context selado em Fase 1). A implementação custom (sem QField) é mandatória para compartilhar o mesmo sistema de tokens e CSS classes do DssInput.

**Papel no sistema:** Chrome de campo de formulário para controles nativos (`<input>`, `<textarea>`, `<select>`) ou componentes customizados que precisam da aparência DSS de campo.

**Quando NÃO usar DssField:**
- Para inputs de texto → use `DssInput` (já tem chrome próprio)
- Para selects → use `DssSelect`
- Para textareas → use `DssTextarea`
- Nunca aninhe `DssInput`/`DssSelect`/`DssTextarea` dentro de `DssField` — duplo chrome

---

## 2. RISCOS ARQUITETURAIS E GATES

### Risco Principal — EXC-Gate-01: Implementação custom (sem QField)

❌ **INCORRETO:**
```vue
<!-- QField não é usado — DssField não pode ser wrapper de QField -->
<q-field v-bind="$attrs" :label="label" :error="error">
  <slot />
</q-field>
```

✅ **CORRETO:**
```vue
<!-- Container div custom — padrão idêntico ao DssInput (Golden Context) -->
<div v-bind="$attrs" :class="rootClasses" @focusin="onFocusIn" @focusout="onFocusOut">
  <div class="dss-field__field">
    <!-- label, slots, hint, error -->
  </div>
</div>
```

**Por quê:** DssInput (Golden Context) é 100% custom (não usa QInput). DssField deve compartilhar o mesmo sistema de tokens e classes CSS — só possível com implementação própria. QField foi descartado porque: (1) DssInput já é custom; (2) sem v-model nativo, clearable/validation do QField não funcionariam.

---

### Risco Crítico — EX-Focus-01: Focus tracking sem input nativo

❌ **INCORRETO:**
```vue
<!-- @focus/@blur NÃO borbulham de controles filhos nativos -->
<div @focus="onFocus" @blur="onBlur">
  <slot />
</div>
```

✅ **CORRETO:**
```vue
<!-- focusin/focusout borbulham DOM — capturam foco do controle interno -->
<div @focusin="onFocusIn" @focusout="onFocusOut">
  <slot />
</div>
```

```typescript
function onFocusOut(e: FocusEvent) {
  const wrapper = e.currentTarget as HTMLElement
  // contains(relatedTarget) evita falso-negativo ao navegar entre slots do mesmo campo
  if (!wrapper.contains(e.relatedTarget as Node)) {
    isFocused.value = false
  }
}
```

**Por quê:** DssField não tem input próprio. `focusin`/`focusout` borbulham do controle interno (qualquer filho) para o wrapper raiz. A verificação `contains(relatedTarget)` é obrigatória para evitar que o foco seja perdido ao mover entre os slots do mesmo campo (ex: label → append).

---

### Risco Arquitetural — EX-Label-01: Label flutuante sem v-model

❌ **INCORRETO:**
```typescript
// DssField não tem v-model — não pode detectar valor automaticamente
const hasValue = computed(() => !!modelValue.value) // impossível
```

✅ **CORRETO:**
```typescript
// Consumer sinaliza externamente
// <DssField :has-value="!!nome">
const labelShouldFloat = computed(
  () => !props.stackLabel && (isFocused.value || props.hasValue)
)
```

**Por quê:** DssField é um container estrutural sem `v-model`. O consumer controla se o controle interno tem valor via prop `hasValue`. Para controles que sempre exibem algo (select, date picker), usar `stackLabel=true` (sem flutuação).

---

## 3. MAPEAMENTO DE API (QUASAR → DSS)

### Props Expostas

| Prop Quasar (QField) | Prop DSS (DssField) | Tipo | Default |
|----------------------|---------------------|------|---------|
| `outlined`/`filled`/etc. | `variant` | `'outlined' \| 'filled' \| 'borderless' \| 'standout'` | `'outlined'` |
| `dense` | `size` | `'sm' \| 'md'` | `'md'` |
| — (DSS-specific) | `brand` | `'hub' \| 'water' \| 'waste'` | — |
| `label` | `label` | `String` | — |
| `stack-label` | `stackLabel` | `Boolean` | `false` |
| — (DSS-specific) | `hasValue` | `Boolean` | `false` |
| `hint` | `hint` | `String` | — |
| `error` | `error` | `Boolean` | `false` |
| `error-message` | `errorMessage` | `String` | — |
| `prefix` | `prefix` | `String` | — |
| `suffix` | `suffix` | `String` | — |
| `disable` | `disable` | `Boolean` | `false` |
| `readonly` | `readonly` | `Boolean` | `false` |
| `loading` | `loading` | `Boolean` | `false` |
| — | `fieldId` | `String` | auto-gerado |

### Props Bloqueadas (justificativa obrigatória no meta.json)

| Prop QField | Motivo do Bloqueio |
|-------------|-------------------|
| `rules` | DssField sem v-model — validação é do controle interno ou formulário pai |
| `clearable` | Requer v-model no QField |
| `counter / maxlength` | Depende do valor do controle interno |
| `color` | Substituído por `brand` (sistema DSS dual-selector) |
| `type / placeholder / autogrow` | Props do controle interno (fora do escopo do chrome) |
| `square / rounded` | DssField usa `--dss-radius-md` fixo — sem variação de raio |

---

## 4. GOVERNANÇA DE TOKENS E CSS

### Tokens reais utilizados (39 tokens)

| Token | Aplicação |
|-------|-----------|
| `--dss-font-family-sans` | Família tipográfica |
| `--dss-font-size-md` | Label no estado base, prefix/suffix |
| `--dss-font-size-sm` | Label flutuante, hint, error |
| `--dss-line-height-normal` | Bottom area (hint/error) |
| `--dss-text-secondary` | Cor do label, hint, prepend/append |
| `--dss-error-600` | Borda de erro, label de erro, mensagem de erro |
| `--dss-surface-default` | Fundo do notch do label (outlined) |
| `--dss-gray-50` | Fundo disabled (outlined) |
| `--dss-gray-100` | Fundo filled/standout |
| `--dss-gray-200` | Hover filled/standout; Disabled filled |
| `--dss-gray-300` | Borda readonly (outlined); Borda spinner |
| `--dss-gray-400` | Borda default |
| `--dss-gray-600` | Borda hover outlined; Dark mode outlined |
| `--dss-gray-700` | Borda active outlined; Dark mode filled border |
| `--dss-gray-800` | Dark mode filled+focused background |
| `--dss-gray-900` | Dark mode filled background; Dark mode standout |
| `--dss-action-primary` | Borda/shadow focus neutro; Label focus; Spinner |
| `--dss-border-width-thin` | Borda padrão; Inner shadow focus |
| `--dss-border-width-md` | Borda focus/error; prefers-contrast |
| `--dss-border-width-thick` | Outline prefers-contrast: more |
| `--dss-radius-md` | Border-radius outlined/standout |
| `--dss-radius-full` | Border-radius spinner |
| `--dss-spacing-1` | Offset outline; Padding label notch |
| `--dss-spacing-2` | Gap interno; Padding label float |
| `--dss-spacing-3` | Padding prepend/append/prefix/suffix denso |
| `--dss-spacing-4` | Padding control; Left do label |
| `--dss-spacing-5` | min-height bottom area |
| `--dss-spacing-8` | max-width cálculo do label |
| `--dss-touch-target-md` | min-height da área de campo (WCAG 2.5.5) |
| `--dss-duration-200` | Duração transições label/borda |
| `--dss-duration-500` | Duração animação spinner |
| `--dss-easing-standard` | Easing das transições |
| `--dss-opacity-disabled` | Opacidade disabled (0.4) |
| `--dss-hub-600` | Focus border/shadow brand hub |
| `--dss-hub-700` | Label focus + hint brand hub |
| `--dss-water-500` | Focus border/shadow brand water |
| `--dss-water-600` | Label focus brand water |
| `--dss-water-700` | Hint brand water |
| `--dss-waste-600` | Focus border/shadow brand waste |
| `--dss-waste-700` | Label focus brand waste |
| `--dss-waste-800` | Hint brand waste |

**NUNCA usar:** `--dss-spacing-16` (não existe), `--dss-duration-250` (não existe), `--dss-surface-hover/active` (não existem), `--dss-border-default/error` (não existem), `--dss-text-error` (→ `--dss-error-600`), `--dss-input-height-md` (deprecated → usar `--dss-touch-target-md`).

---

## 5. ACESSIBILIDADE E ESTADOS

### Touch Target
**Opção N/A — DssField não é controle compacto interativo.**
`min-height: var(--dss-touch-target-md)` no `.dss-field__field` (WCAG 2.5.5 delegado ao controle interno). `::before` reservado exclusivamente para controles compactos (CLAUDE.md Princípio 7) — não aplicável ao DssField.

### ARIA

| Elemento | ARIA | Observação |
|----------|------|------------|
| `<label>` | `for="fieldId"` | Associação semântica com o controle interno |
| Error div | `role="alert"` + `aria-live="assertive"` | Anúncio automático de erros |
| Loading span | `role="status"` + `aria-live="polite"` | Spinner acessível |
| Spinner inner | `aria-hidden="true"` | Decorativo |
| Prepend wrapper | `aria-hidden="true"` | Decorativo por convenção |
| Slot #default | expõe `{ fieldId, ariaDescribedby }` | Consumer binda nos dois atributos |

**Padrão de uso recomendado:**
```vue
<DssField label="Email" :error="err" error-message="Email inválido" :has-value="!!email">
  <template #default="{ fieldId, ariaDescribedby }">
    <input
      :id="fieldId"
      :aria-describedby="ariaDescribedby"
      v-model="email"
      type="email"
    />
  </template>
</DssField>
```

### Estados

| Estado | Implementação | Nota |
|--------|--------------|------|
| `hover` | `:hover` no wrapper (blocked por disabled/readonly/focused) | Todas as variantes |
| `focus` | `.dss-field--focused` via `focusin`/`focusout` | EX-Focus-01 |
| `active` | `:active` no wrapper (filled/standout escurecem bg) | Outlined muda borda |
| `disabled` | `opacity: --dss-opacity-disabled` + `pointer-events: none` | EXC-Gate-01 |
| `readonly` | `cursor: default` + borda atenuada | Sem hover visual |
| `loading` | Spinner em `.dss-field__append` | Sobrepõe-se ao slot append |
| `error` | `.dss-field--error` + borda/label em `--dss-error-600` | `role="alert"` |
| `print` | Remove backgrounds + loading spinner | `@media print` |

### Media Queries

| Media | Comportamento |
|-------|--------------|
| `prefers-reduced-motion: reduce` | `transition: none; animation: none` — suprime label/borda/spinner |
| `prefers-contrast: more` | `border-width: --dss-border-width-md`; outline thick no focus |
| `forced-colors: active` | ButtonText/Highlight/LinkText/GrayText SystemColors |

**⚠️ CRÍTICO:** `prefers-contrast: more` (NUNCA `high` — `high` é inválido e nunca dispara no browser).
