# DssField — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssField` é o wrapper estrutural de campo de formulário do Design System Sansys. Fornece o chrome visual padronizado — label flutuante/empilhada, borda variante (outlined/filled/borderless/standout), texto de hint e mensagem de erro — para qualquer controle interno via slot.

**Quando usar:**
- Quando você precisa do chrome DSS em torno de um input nativo (`<input>`, `<textarea>`, `<select>`)
- Quando você tem um controle customizado (date picker, tag input, color picker) que precisa da aparência de campo DSS
- Quando um terceiro componente não-DSS precisa integrar visualmente com formulários DSS

**Quando NÃO usar:**
- Para inputs de texto simples → use `DssInput` (já tem label, hint, error embutidos)
- Para selects → use `DssSelect` (já tem chrome próprio)
- Para textareas → use `DssTextarea` (já tem chrome próprio)
- Não aninhe `DssInput`/`DssSelect`/`DssTextarea` DENTRO de DssField — duplo chrome

---

## 2. Classificação DSS

| Campo | Valor |
|-------|-------|
| Tipo | Superfície Estrutural / Container de Formulário |
| Família | Formulários |
| Fase | 2 — Nível 2 |
| Interativo | Parcial (delegado ao controle interno) |
| Golden Reference | DssChip |
| Golden Context | DssInput |
| Quasar Base | QField (conceitual) — implementação custom, sem dependência de QField |

---

## 3. API

*(Ver [DSSFIELD_API.md](./DSSFIELD_API.md) para referência completa)*

### Props Principais

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `variant` | `'outlined' \| 'filled' \| 'borderless' \| 'standout'` | `'outlined'` | Estilo visual |
| `size` | `'sm' \| 'md'` | `'md'` | Modo compacto |
| `brand` | `'hub' \| 'water' \| 'waste'` | — | Cor de destaque no foco |
| `label` | `String` | — | Rótulo do campo |
| `stackLabel` | `Boolean` | `false` | Label sempre empilhada |
| `hasValue` | `Boolean` | `false` | Sinaliza valor presente no controle interno |
| `hint` | `String` | — | Texto de dica |
| `error` | `Boolean` | `false` | Estado de erro |
| `errorMessage` | `String` | — | Mensagem de erro |
| `disable` | `Boolean` | `false` | Desabilitado |
| `readonly` | `Boolean` | `false` | Somente leitura |
| `loading` | `Boolean` | `false` | Indicador de carregamento |
| `fieldId` | `String` | auto | ID para `label[for]` (auto-gerado) |

### Slots

| Slot | Props | Descrição |
|------|-------|-----------|
| `default` | `{ fieldId: string }` | Controle principal |
| `prepend` | — | Ícone/botão antes do controle |
| `append` | — | Ícone/botão após o controle |
| `before` | — | Conteúdo fora da borda (esquerda) |
| `after` | — | Conteúdo fora da borda (direita) |
| `label` | — | Label personalizado |
| `hint` | — | Hint personalizado |
| `error` | — | Mensagem de erro personalizada |

### Events

DssField **não emite eventos**. É um container estrutural passivo — o controle interno gerencia seus próprios eventos.

---

## 4. Estados

| Estado | Implementado | Mecanismo |
|--------|-------------|-----------|
| hover | ✅ | border-color/background via `:hover` no wrapper |
| focus | ✅ | `.dss-field--focused` via `focusin`/`focusout` (EX-Focus-01) |
| active | ✅ | background escurece via `:active` (filled/standout) |
| error | ✅ | `.dss-field--error` + borda/label em `--dss-error-600` |
| disabled | ✅ | `.dss-field--disabled` + opacity + pointer-events: none |
| readonly | ✅ | `.dss-field--readonly` + borda atenuada + cursor: default |
| loading | ✅ | `.dss-field--loading` + spinner em `.dss-field__append` |
| print | ✅ | Remove backgrounds, normaliza borda |

---

## 5. Variantes

| Variante | Estilo | Uso recomendado |
|----------|--------|-----------------|
| `outlined` (padrão) | Borda completa, fundo transparente, label flutua | Formulários padrão |
| `filled` | Fundo sólido, borda inferior apenas, label flutua | Interfaces compactas, Mobile |
| `borderless` | Sem borda. Focus apenas borda inferior | Dentro de cards, tabelas |
| `standout` | Fundo sólido, box-shadow no focus | Campos de busca, destaque visual |

---

## 6. Acessibilidade

### ARIA
- `label[for]` aponta para `fieldId` — consumer **deve** usar `:id="fieldId"` no controle interno
- `role="alert"` + `aria-live="assertive"` na mensagem de erro → anunciada automaticamente
- `role="status"` + `aria-live="polite"` no spinner de loading
- `aria-hidden="true"` **apenas no slot `prepend`** (decorativo por convenção). Slots `append`, `before` e `after` não têm `aria-hidden` — podem hospedar conteúdo interativo
- Slot `#default` expõe `{ fieldId, ariaDescribedby }` — consumer deve bindar ambos:
  ```html
  <template #default="{ fieldId, ariaDescribedby }">
    <input :id="fieldId" :aria-describedby="ariaDescribedby" />
  </template>
  ```
  `ariaDescribedby` aponta dinamicamente para `errorId` (quando `error=true`) ou `hintId` (quando há hint)

### Navegação por Teclado
- DssField não intercepta eventos de teclado — delegado ao controle interno
- Focus tracking automático via `focusin`/`focusout` (bubbling)

### Touch Target
- `.dss-field__field` tem `min-height: var(--dss-touch-target-md)` = 44px (WCAG 2.5.5)
- DssField é um container — touch target real pertence ao controle interno
- Controles interativos dentro dos slots `prepend`/`append` devem ter sua própria área de toque

### Media Queries
- `prefers-reduced-motion: reduce` — transições suprimidas (label, borda, spinner)
- `prefers-contrast: more` — borda reforçada, outline adicional no foco
- `forced-colors: active` — SystemColor keywords (ButtonText, Highlight, LinkText, GrayText)

---

## 7. Tokens Utilizados

*(Ver [DSSFIELD_API.md](./DSSFIELD_API.md) — seção Tokens DSS Utilizados)*

Total: 39 tokens. Nenhum token específico de componente criado — 100% reutilizando tokens genéricos DSS, consistente com DssInput (Golden Context).

---

## 8. Exceções Registradas

| ID | Categoria | Resumo |
|----|-----------|--------|
| EXC-Gate-01 | Gate | Implementação custom (sem QField). Container estrutural — DssInput é custom, consistência exige mesma abordagem |
| EX-Focus-01 | Focus | focusin/focusout no wrapper raiz para tracking de foco do controle interno (bubbling DOM) |
| EX-Label-01 | Structural | hasValue prop externa para controle do estado float do label (sem v-model interno) |
| EX-Structural-01 | Structural | Sem touch target ::before — DssField não é controle compacto interativo |
| EX-States-01 | States | prefers-reduced-motion: reduce — transições suprimidas (WCAG 2.3.3) |
| EX-States-02 | States | prefers-contrast: more (NOT 'high') — borda reforçada, outline thick no foco (WCAG 1.4.11) |
| EX-States-03 | States | forced-colors: active — SystemColor keywords obrigatórios (WCAG 1.4.11) |

---

## 9. Comportamentos Implícitos

### 9.1 Forwarding e inheritAttrs
- `inheritAttrs: false` — atributos extras (`class`, `data-*`, etc.) são aplicados no `<div>` root via `v-bind="$attrs"`
- Props do controle interno devem ser passadas **diretamente** ao elemento dentro do slot

### 9.2 Sem emits
- DssField não emite eventos. Não declare `defineEmits` — container não-emissor (anti-padrão documentado em MEMORY)
- O controle interno emite seus próprios eventos

### 9.3 Propagação de foco
- `focusin` borbulha do controle interno → detectado no wrapper → `.dss-field--focused` ativo
- `focusout`: verificação `contains(e.relatedTarget)` evita falsos negativos ao navegar entre slots do mesmo campo

### 9.4 fieldId e label[for]
- DssField auto-gera um ID único (`dss-field-ctrl-{uid}`) se `fieldId` não for fornecido
- Consumer deve usar `{ fieldId }` do slot scope: `<input :id="fieldId" />`
- Sem essa associação: leitores de tela não anunciam o label ao focar o controle

### 9.5 Label flutuante vs. empilhada
- **Flutuante**: default. Label sobe ao focar, permanece acima se `hasValue=true`
- **Empilhada**: `stackLabel=true`. Label sempre no topo, sem animação
- Para controles com valor sempre visível (select nativo, multiselect): use `stackLabel` + `hasValue=true`

---

## 10. Matriz de Composição DSS (Fase 2)

### Papel Estrutural
DssField é o **chrome de campo** — fornece apenas a estrutura visual (borda, label, hint, error). O conteúdo interativo vem exclusivamente do slot `#default`.

### Componentes que podem compor DssField

| Componente | Status | Papel no DssField | Notas |
|------------|--------|-------------------|-------|
| Input nativo `<input>` | 🟢 Sempre disponível | Controle principal (default slot) | Mais flexível |
| `<textarea>` nativo | 🟢 Sempre disponível | Área de texto multilinha | Usar com `stackLabel` |
| `<select>` nativo | 🟢 Sempre disponível | Seleção nativa | Usar com `stackLabel + hasValue` |
| DssIcon | 🟢 Selado (Fase 1) | Prepend/Append slot | Decorativo — aria-hidden herdado |
| DssBtn | 🟢 Selado (Fase 1) | Append slot | Ação interna (visibilidade senha, etc.) |
| DssTooltip | 🟢 Selado (Fase 1) | Qualquer slot | Para hints expandidos |
| DssSkeleton | 🟢 Selado (Fase 2) | Default slot | Estado loading de campo |
| Custom date pickers | ⚪ Externos | Default slot | Principal caso de uso do DssField |
| Custom tag inputs | ⚪ Externos | Default slot | Multivalue sem DssSelect |

### Componentes que NÃO devem ser aninhados

| Componente | Motivo |
|------------|--------|
| DssInput | Já tem chrome próprio (label, border, hint, error) — duplo chrome |
| DssSelect | Já tem chrome próprio via QSelect/QField |
| DssTextarea | Já tem chrome próprio via QInput |
| DssSlider | Chrome próprio — track visual incompatível com o campo |

### Limites de Responsabilidade

| Responsabilidade | DssField | Controle Interno |
|-----------------|----------|-----------------|
| Label e hint | ✅ | ❌ |
| Borda e variante visual | ✅ | ❌ |
| Mensagem de erro | ✅ (display) | ✅ (determina quando há erro) |
| v-model e valor | ❌ | ✅ |
| Validação | ❌ | ✅ |
| Acessibilidade do controle (ARIA) | ❌ | ✅ |
| Touch target do controle | ❌ | ✅ |

### Anti-patterns

```vue
<!-- ❌ Duplo chrome — NÃO faça -->
<DssField label="Nome">
  <DssInput v-model="nome" label="Nome" />
</DssField>

<!-- ❌ Sem fieldId no controle — label não associado -->
<DssField label="Pesquisa">
  <input v-model="pesquisa" />  <!-- falta :id="fieldId" -->
</DssField>

<!-- ❌ Lógica de negócio no DssField -->
<DssField :error="!isValidEmail(email)">  <!-- cálculo de validação aqui -->
  <input :id="fieldId" v-model="email" />
</DssField>

<!-- ✅ Correto: validação no componente pai, estado passado via props -->
<DssField :error="emailError" :error-message="emailErrorMsg">
  <template #default="{ fieldId }">
    <input :id="fieldId" v-model="email" @blur="validateEmail" />
  </template>
</DssField>
```

---

## 11. Paridade com Golden Context (DssInput)

| Aspecto | DssInput | DssField | Justificativa da divergência |
|---------|----------|----------|------------------------------|
| Root element | `<div class="dss-input">` | `<div class="dss-field">` | — (idêntico em estrutura) |
| Label flutuante | Auto-detectado via modelValue | Via prop `hasValue` externa | DssField sem v-model (EX-Label-01) |
| Focus tracking | `@focus`/`@blur` no `<input>` | `@focusin`/`@focusout` no wrapper | DssField não tem controle nativo (EX-Focus-01) |
| v-model | ✅ String/Number | ❌ Não tem | DssField é container estrutural |
| Validação (rules) | ❌ Não tem | ❌ Não tem | Ambos delegam ao formulário pai |
| Touch target | `min-height: --dss-input-height-md` | `min-height: --dss-touch-target-md` | DssInput usa token deprecated; DssField usa token canônico |
| Variantes | outlined, filled, borderless, standout | outlined, filled, borderless, standout | Idênticos |
| Tokens de brand | hub-600, water-500, waste-600 + 700/800 | hub-600, water-500, waste-600 + 700/800 | Idênticos |
| prefers-contrast | `high` (INCORRETO — bug do DssInput) | `more` (CORRETO) | DssField usa valor canônico DSS |

---

## 12. Changelog

| Versão | Data | Descrição |
|--------|------|-----------|
| 2.2 | 2026-05-19 | SELADO — Auditoria v2.5 (1 ciclo). 3 NCs corrigidas: token gray-800 declarado, import FieldEmits removido, documentação aria-hidden corrigida. GAP-01 resolvido: slot scope expandido com ariaDescribedby. Pré-prompt reescrito. |
| 2.1 | 2026-05-18 | Criação inicial — Fase 2 Nível 2. Implementação custom (sem QField) seguindo padrão DssInput. |
