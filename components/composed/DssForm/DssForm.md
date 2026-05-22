# DssForm — Documentação Normativa DSS v2.2

**Versão do Componente:** 1.0.0  
**Fase:** 2 — Nível 2 (Composed)  
**Status:** Ready for Audit  
**Motor Quasar:** QForm  
**Golden Reference:** DssChip  
**Golden Context:** DssDialog  
**Data:** 2026-05-22  

---

## 1. Visão Geral e Classificação

`DssForm` é o container de formulário governado do Design System Sansys. Encapsula o `QForm` do Quasar, adicionando conformidade com os padrões DSS: tokens semânticos, CSS global com seletor composto, API imperativa via `defineExpose` e restrição de props que violam a governança de temas.

**Classificação:**
- **Tipo:** Container Estrutural Interativo
- **Família:** Inputs e Formulários (Fase 2 — Nível 2)
- **Motor Quasar:** `QForm` (renderiza como `<form>` HTML nativo)
- **Nível de Composição:** 2 — Composed (recebe conteúdo via slot, não tem filhos fixos)

**Quando usar:**
- Agrupar campos de entrada que precisam de validação coordenada
- Implementar fluxos de submissão com feedback de validação
- Formular em qualquer contexto: página, diálogo, stepper, wizard

**Quando NÃO usar:**
- Como container genérico sem semântica de formulário — use `DssCard` ou `<div>`
- Para agrupamento visual sem campos de entrada

---

## 2. Golden Reference e Golden Context

### Golden Reference: DssChip

DssChip é o Golden Reference interativo global do DSS. DssForm é auditado por paridade com:
- `defineOptions({ name, inheritAttrs: false })`
- `v-bind="$attrs"` no componente raiz
- Composable de classes (`useFormClasses`)
- Interfaces TypeScript em `types/form.types.ts`
- Barrel de composables em `composables/index.ts`
- Arquitetura de 4 camadas SCSS completa
- Entry Point Wrapper obrigatório

### Golden Context: DssDialog

DssDialog é o Golden Context mais próximo para DssForm por paridade estrutural:

| Característica | DssDialog | DssForm |
|---------------|-----------|---------|
| Motor Quasar | QDialog | QForm |
| EXC-Gate-01 (motor como root) | ✅ | ✅ |
| EXC-Expose-01 (defineExpose) | ✅ (show/hide/toggle) | ✅ (validate/resetValidation/submit/reset) |
| `inheritAttrs: false` + `v-bind="$attrs"` | ✅ | ✅ |
| CSS global (não scoped) | ✅ (teleport) | ✅ (formulários aninhados) |
| Container com slot default | ✅ | ✅ |
| Props bloqueadas (`dark`) | ✅ | ✅ |

---

## 3. Arquitetura de 4 Camadas

### Layer 1 — Structure (`1-structure/DssForm.ts.vue`)
Implementação canônica Vue 3 + TypeScript com `<script setup>`. Define props, emits, slots, composables e `defineExpose`.

### Layer 2 — Composition (`2-composition/_base.scss`)
Estilos base mínimos. Único CSS relevante: `display: flex; flex-direction: column; gap: var(--dss-form-gap)` no seletor composto `.q-form.dss-form`.

### Layer 3 — Variants (`3-variants/`)
Vazio intencional — DssForm não possui variantes visuais. Layouts alternativos (row, grid) são responsabilidade do consumidor via classes utilitárias Quasar.

### Layer 4 — Output (`4-output/`)
- `_brands.scss`: Vazio — brand via filhos (DssInput, DssButton, etc.)
- `_states.scss`: Apenas `@media print` com `gap: 0`

---

## 4. API Completa

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `autofocus` | `Boolean` | — | Foca o primeiro campo interativo na montagem |
| `greedy` | `Boolean` | — | Valida todos os campos mesmo após o primeiro erro |
| `noErrorFocus` | `Boolean` | — | Não move foco para campo com erro após validação |

### Props Bloqueadas

| Prop | Motivo |
|------|--------|
| `dark` | Tema via `[data-theme="dark"]` — prop QForm bloqueada |

### Emits

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `submit` | `SubmitEvent` | Formulário enviado |
| `reset` | `Event` | Formulário resetado |
| `validationError` | `(el, tabIndex, index)` | Falha de validação |
| `validationSuccess` | — | Validação bem-sucedida |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Campos e ações do formulário — responsabilidade do consumidor |

### API Imperativa (defineExpose — EXC-Expose-01)

| Método | Assinatura | Descrição |
|--------|-----------|-----------|
| `validate` | `(shouldFocus?: boolean) => Promise<boolean>` | Valida todos os campos |
| `resetValidation` | `() => void` | Reseta apenas erros de validação |
| `submit` | `(event?: Event) => void` | Submete programaticamente |
| `reset` | `() => void` | Reseta valores e validação |

---

## 5. Tokens CSS

DssForm é um container estrutural sem superfície visual. CSS é mínimo.

| Token | Origem | Valor | Uso |
|-------|--------|-------|-----|
| `--dss-form-gap` | `tokens/semantic/_spacing.scss` | `var(--dss-spacing-4)` | Gap entre campos |

### Tokens Proibidos (não usar no DssForm)

| Token Proibido | Alternativa Correta |
|---------------|---------------------|
| `--dss-action-hub` | `--dss-hub-600` (nos filhos) |
| `--dss-surface-alt` | `--dss-surface-variant` ou `--dss-gray-100` |
| `--dss-text-subtle` | `--dss-text-secondary` |
| `--dss-duration-150/200/300` | `--dss-duration-fast` ou `--dss-duration-normal` |
| Valores hardcoded (px, rem, hex) | Sempre `var(--dss-*)` |

### DssForm NÃO usa (responsabilidade dos filhos):
- Tokens de cor/superfície (`--dss-surface-default`, `--dss-hub-600`)
- Tokens de sombra ou elevation (DssForm não tem superfície elevada)
- Tokens de border-radius (DssForm não tem borda ou cantos)

---

## 6. Acessibilidade

### Semântica HTML
- DssForm renderiza `<form>` nativo via QForm — suporte completo a tecnologias assistivas
- `role="form"` implícito quando `aria-label` é fornecido (ARIA spec)

### Navegação por Teclado
- `Tab`/`Shift+Tab` entre campos: comportamento nativo do browser
- `Enter` para submeter: comportamento nativo de `<form>` HTML
- `Escape`: sem comportamento específico no DssForm (responsabilidade dos overlays)

### ARIA
- `aria-label`: Recomendado via `$attrs` — `<DssForm aria-label="Formulário de cadastro">`
- `aria-describedby`: Suportado via `$attrs`
- Erros de validação: `aria-invalid`, `aria-describedby` nos campos internos (DssInput, DssSelect)

### Touch Target
- N/A — DssForm é container estrutural, não controle interativo
- Touch targets pertencem aos filhos (DssButton, DssInput, etc.)

### WCAG 2.1 AA — Requisitos Delegados
- **1.3.1 Info and Relationships**: Campos com `<label>` — responsabilidade do DssInput
- **1.3.3 Sensory Characteristics**: Erros não indicados apenas por cor — DssInput usa ícone + texto
- **2.1.1 Keyboard**: Navegação completa — comportamento nativo + campos DSS
- **3.3.1 Error Identification**: Mensagens de erro — DssInput via `error-message`
- **3.3.2 Labels or Instructions**: Labels em todos os campos — DssInput via `label`

---

## 7. Estados

### Estados Aplicáveis ao DssForm

| Estado | Descrição | Responsabilidade |
|--------|-----------|-----------------|
| `default` | Estado inicial sem interação | DssForm |
| `submitting` | Formulário em processo de envio | Consumidor (DssButton `loading`) |
| `valid` | Todos os campos passaram na validação | QForm interno |
| `invalid` | Um ou mais campos com erro | QForm + filhos (DssInput error-message) |

### Estados NÃO Aplicáveis

| Estado | Justificativa |
|--------|---------------|
| `hover` | DssForm é container, não controle interativo |
| `focus` | Pertence aos campos filhos |
| `active` | Pertence aos campos filhos |
| `disabled` | Campos individuais gerenciam seu próprio disable |
| `loading` | Gerenciado via DssButton (`loading` prop) |
| `checked` | N/A — sem estado de seleção |
| `indeterminate` | N/A — sem estado de seleção |

---

## 8. Brandabilidade

DssForm **não** possui CSS de brand próprio. O contexto de brand é propagado pelo escopo pai via `[data-brand="hub|water|waste"]` e herdado pelos filhos:

```vue
<!-- Hub brand aplicado no escopo pai, herdado por DssInput/DssButton internos -->
<div data-brand="hub">
  <DssForm @submit.prevent="submit">
    <DssInput v-model="value" label="Campo hub" />
    <DssButton type="submit" label="Enviar" color="primary" />
  </DssForm>
</div>
```

---

## 9. Comportamentos Implícitos Declarados

### inheritAttrs: false
`$attrs` é repassado explicitamente ao `<q-form>` via `v-bind="$attrs"`. Atributos HTML adicionais (`id`, `aria-label`, `data-*`) são gerenciados pelo QForm e repassados ao `<form>` nativo.

### QForm como Root (EXC-Gate-01)
QForm renderiza como `<form>` HTML nativo. Inserir um `<div>` externo quebraria a semântica de formulário e o comportamento de submissão nativo do browser. A classe `dss-form` é aplicada via `:class` ao `<q-form>`.

### defineExpose (EXC-Expose-01)
DssForm expõe 4 métodos imperativos delegados ao `qFormRef` interno:
- `validate()` — uso em steppers multi-passo antes de avançar
- `resetValidation()` — uso ao cancelar edição sem fechar o formulário
- `submit()` — botão de submit externo ao formulário
- `reset()` — reset completo por ação do usuário

### CSS Global (não scoped)
Estilos carregados globalmente via `components/index.scss`. Formulários podem ser aninhados dentro de `DssDialog` (teleportado para `<body>`), onde `<style scoped>` seria ineficaz.

### Prop `dark` bloqueada
Modo escuro governado globalmente via `[data-theme="dark"]`. A prop `dark` do QForm não é repassada para garantir consistência com o sistema de temas DSS.

---

## 10. Dependências

### Dependências Internas (componentes DSS)

| Componente | Tipo | Status |
|-----------|------|--------|
| `DssInput` | Campo de texto | Fase 1 — Selado |
| `DssTextarea` | Texto longo | Fase 1 — Selado |
| `DssSelect` | Seleção | Fase 1 — Selado |
| `DssCheckbox` | Seleção múltipla | Fase 1 — Selado |
| `DssRadio` | Seleção única | Fase 1 — Selado |
| `DssToggle` | Boolean | Fase 1 — Selado |
| `DssSlider` | Range numérico | Fase 1 — Selado |
| `DssFile` | Upload | Fase 1 — Selado |
| `DssButton` | Ação/submissão | Fase 1 — Selado |
| `DssSpinner` | Estado de carregamento | Fase 1 — Selado |

### Dependências NÃO Existentes no DSS

| Componente Citado | Status | Observação |
|------------------|--------|-----------|
| `DssValidationMessage` | ❌ NÃO EXISTE | Mensagens de erro são exibidas pelos próprios campos via `error-message`. Lacuna de Fase 3 se demandado. |

### Dependências Externas
- **Vue 3**: Framework principal
- **Quasar Framework**: QForm como motor

---

## 11. Composição e Anti-Patterns

### Composição Recomendada

```vue
<!-- Padrão canônico DssForm -->
<DssForm @submit.prevent="submit">
  <!-- Campos DSS — DssInput, DssSelect, etc. -->
  <DssInput v-model="name" label="Nome" :rules="nameRules" />
  <DssSelect v-model="role" label="Perfil" :options="roles" />

  <!-- Ações -->
  <div class="row q-gutter-sm">
    <DssButton type="submit" label="Salvar" color="primary" />
    <DssButton type="reset" label="Cancelar" flat />
  </div>
</DssForm>
```

### Anti-Patterns

```vue
<!-- ❌ HTML nativo sem wrapper DSS -->
<DssForm>
  <input type="text" placeholder="Nome" />
</DssForm>

<!-- ❌ Aninhar DssForm -->
<DssForm>
  <DssForm><!-- Quebra validação do QForm externo --></DssForm>
</DssForm>

<!-- ❌ Prop dark bloqueada -->
<DssForm dark><!-- Use [data-theme="dark"] no escopo pai --></DssForm>

<!-- ❌ margin-bottom nos campos -->
<DssForm>
  <DssInput style="margin-bottom: 16px" /><!-- Use o gap do DssForm -->
</DssForm>
```

---

## 12. Exceções aos Gates v2.4

| ID | Descrição | Local | Decisão Arquitetural |
|----|-----------|-------|---------------------|
| EXC-Gate-01 | QForm como root — sem wrapper DOM próprio DSS | `1-structure/DssForm.ts.vue` | Aprovado — QForm é o motor irrenunciável; `<form>` HTML nativo não pode ter wrapper externo sem quebrar semântica. Precedente: DssDialog (QDialog), DssMenu (QMenu), DssPopupProxy (QPopupProxy). |
| EXC-Expose-01 | `defineExpose` com validate/resetValidation/submit/reset | `1-structure/DssForm.ts.vue` | Aprovado — API imperativa necessária para stepper multi-passo, wizard, botão externo ao formulário. Delegação ao `qFormRef` interno. Precedente: DssDialog, DssInfiniteScroll, DssScrollArea. |

---

## 13. Exemplos de Uso

### 13.1. Formulário de Login

```vue
<DssForm autofocus @submit.prevent="login" @validation-error="onError">
  <DssInput v-model="email" label="E-mail" type="email"
    :rules="[v => !!v || 'Obrigatório', v => /.+@.+/.test(v) || 'E-mail inválido']"
    lazy-rules />
  <DssInput v-model="password" label="Senha" type="password"
    :rules="[v => !!v || 'Obrigatório']" lazy-rules />
  <DssButton type="submit" label="Entrar" color="primary" :loading="loading" />
</DssForm>
```

### 13.2. Validação Greedy (todos os erros)

```vue
<DssForm greedy @submit.prevent="submit">
  <DssInput v-model="name" label="Nome" :rules="nameRules" />
  <DssInput v-model="email" label="E-mail" :rules="emailRules" />
  <DssInput v-model="phone" label="Telefone" :rules="phoneRules" />
  <DssButton type="submit" label="Enviar" />
</DssForm>
```

### 13.3. Stepper Multi-Passo (controle imperativo)

```vue
<DssForm ref="stepFormRef">
  <DssInput v-model="step1.name" label="Nome" :rules="nameRules" />
</DssForm>

<DssButton label="Próximo" @click="goToNextStep" />

<script setup>
const stepFormRef = ref()

async function goToNextStep() {
  const isValid = await stepFormRef.value?.validate()
  if (isValid) currentStep.value++
}
</script>
```

### 13.4. Em DssDialog

```vue
<DssDialog v-model:open="open">
  <div class="q-pa-md">
    <DssForm ref="dialogFormRef" @submit.prevent="save">
      <DssInput v-model="value" label="Valor" :rules="rules" />
    </DssForm>
  </div>
  <template #footer>
    <DssButton label="Salvar" @click="dialogFormRef?.submit()" />
    <DssButton label="Cancelar" flat @click="open = false" />
  </template>
</DssDialog>
```

---

## 14. Delegação de Estados

DssForm delega estados para os filhos. Não gerencia visualmente estados de campo.

| Estado | Delegado Para | Mecanismo |
|--------|--------------|-----------|
| Erro de campo | DssInput/DssSelect | Prop `error` + `error-message` |
| Loading/Submitting | DssButton | Prop `loading` |
| Disabled de campo | Campos individuais | Prop `disable` |
| Validação | QForm interno | Método `validate()` |
| Foco | Campo específico | `qFormRef.value?.validate()` move foco |

---

## 15. Integração com Gerenciamento de Estado

DssForm não possui integração própria com Pinia/Vuex. A integração é responsabilidade do consumidor:

```vue
<DssForm @submit.prevent="store.submitForm">
  <DssInput v-model="store.formData.email" label="E-mail" />
  <DssButton type="submit" label="Enviar" :loading="store.isSubmitting" />
</DssForm>
```

---

## 16. Roadmap e Limitações Conhecidas

### Fase 3 — Evoluções Planejadas (fora do escopo atual)

| Recurso | Descrição | Prioridade |
|---------|-----------|-----------|
| `DssValidationMessage` | Componente centralizado de mensagem de erro (hoje: campo individual) | Baixa |
| Validação assíncrona nativa | API para validações que dependem de chamada de API | Média |
| Integração automática com Pinia | Hook `useFormState` para sincronização automática | Baixa |

### Limitações Atuais

- Validação assíncrona: suportada via QForm `rules` com funções async, mas sem feedback centralizado no DssForm
- Formulários multi-passo: DssForm é building block fundamental; o stepper (DssStepper) é responsável pela orquestração entre passos
- Campos condicionais: o consumidor deve gerenciar visibilidade via `v-if`/`v-show` nos campos
