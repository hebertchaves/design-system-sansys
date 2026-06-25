# DssForm — API Reference

**Versão DSS:** 2.2  
**Versão do Componente:** 1.0.0  
**Motor Quasar:** QForm  
**Golden Reference:** DssChip  
**Golden Context:** DssDialog  

---

## Props

| Prop | Tipo | Padrão | Descrição | QForm Original |
|------|------|--------|-----------|---------------|
| `autofocus` | `Boolean` | `undefined` | Foca automaticamente o primeiro campo interativo do formulário na montagem | `autofocus` ✓ |
| `greedy` | `Boolean` | `undefined` | Quando `true`, valida **todos** os campos ao submeter, mesmo após encontrar o primeiro inválido. Padrão Quasar: para na primeira falha. | `greedy` ✓ |
| `noErrorFocus` | `Boolean` | `undefined` | Desabilita o comportamento padrão de mover o foco para o primeiro campo com erro após falha de validação. | `no-error-focus` ✓ |

### Props Bloqueadas (não repassadas ao QForm)

| Prop | Motivo |
|------|--------|
| `dark` | Modo escuro governado globalmente via `[data-theme="dark"]`. Prop `dark` do QForm é bloqueada para garantir consistência. |

### Attrs Forwarding

Todos os demais atributos (`id`, `aria-label`, `aria-describedby`, `class`, `style`, `data-*`, etc.) são repassados ao elemento `<form>` via `v-bind="$attrs"`.

```vue
<!-- id, aria-label e class são repassados ao <form> -->
<DssForm id="contact-form" aria-label="Formulário de contato" class="full-width">
```

---

## Emits

| Evento | Assinatura | Descrição |
|--------|-----------|-----------|
| `submit` | `(event: SubmitEvent) => void` | Disparado quando o formulário é submetido. O comportamento padrão de submit do browser **não** é cancelado — use `@submit.prevent` se necessário. |
| `reset` | `() => void` | Disparado quando o formulário é resetado (via botão `type="reset"` ou chamada imperativa de `reset()`). O QForm não fornece payload. |
| `validationError` | `(ref: Component) => void` | Disparado quando a validação falha. O QForm fornece apenas a referência do componente de campo inválido (sem tabIndex/index). |
| `validationSuccess` | `() => void` | Disparado quando todos os campos passam na validação. |

---

## Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `() => unknown` | Conteúdo do formulário — campos (DssInput, DssSelect, etc.) e ações (DssButton). Responsabilidade integralmente do consumidor. |

---

## API Imperativa (expose)

Acessível via `ref` no template pai. Todos os métodos delegam ao `QForm` interno.

| Método | Assinatura | Descrição |
|--------|-----------|-----------|
| `validate` | `(shouldFocus?: boolean) => Promise<boolean>` | Valida todos os campos do formulário. Retorna `true` se válido. `shouldFocus` controla se o foco vai para o campo inválido (padrão: `true`). |
| `resetValidation` | `() => void` | Reseta apenas o estado de validação (limpa os erros exibidos). **Não** altera os valores dos campos. |
| `submit` | `(event?: Event) => void` | Dispara a submissão do formulário programaticamente, equivalente a clicar em `<button type="submit">`. |
| `reset` | `() => void` | Reseta **valores e validação** para o estado inicial. Equivalente a clicar em `<button type="reset">`. |

```vue
<DssForm ref="formRef">...</DssForm>

<script setup>
const formRef = ref()

// Validar sem mover foco
const isValid = await formRef.value.validate(false)

// Resetar apenas os erros, mantendo os valores
formRef.value.resetValidation()

// Submeter programaticamente
formRef.value.submit()

// Resetar tudo
formRef.value.reset()
</script>
```

---

## Tokens CSS

| Token | Origem | Valor | Uso |
|-------|--------|-------|-----|
| `--dss-form-gap` | `tokens/semantic/_spacing.scss` | `var(--dss-spacing-4)` = 16px | Gap vertical entre campos do formulário |

---

## Paridade com Golden Context (DssDialog)

| Característica | DssDialog | DssForm |
|---------------|-----------|---------|
| Motor Quasar | QDialog | QForm |
| EXC-Gate-01 | ✅ QDialog como root | ✅ QForm como root |
| EXC-Expose-01 | ✅ defineExpose (show/hide/toggle) | ✅ defineExpose (validate/resetValidation/submit/reset) |
| `inheritAttrs: false` | ✅ | ✅ |
| `v-bind="$attrs"` no motor | ✅ | ✅ |
| CSS global (não scoped) | ✅ (teleport para body) | ✅ (formulários aninhados) |
| Slots estruturais | ✅ (header, default, footer) | ✅ (default) |
| Props bloqueadas | `dark`, `square` | `dark` |

---

## Paridade com Golden Reference (DssChip)

| Característica | DssChip | DssForm |
|---------------|---------|---------|
| `defineOptions({ name, inheritAttrs: false })` | ✅ | ✅ |
| `v-bind="$attrs"` no root | ✅ | ✅ |
| Composable de classes | ✅ `useChipClasses` | ✅ `useFormClasses` |
| `types/*.types.ts` | ✅ | ✅ |
| `composables/index.ts` (barrel) | ✅ | ✅ |
| 4 camadas SCSS | ✅ | ✅ |
| Entry Point Wrapper | ✅ | ✅ |

---

## Estados Aplicáveis

| Estado | Aplicável | Responsabilidade |
|--------|-----------|-----------------|
| `default` | ✅ | DssForm |
| `submitting` | — | Consumidor (via `DssButton loading`) |
| `valid` | — | QForm interno (via validação de campos) |
| `invalid` | — | QForm interno + campos (DssInput error-message) |
| `disabled` | — | Campos individuais (`DssInput disable`) |
| `hover` | ❌ N/A | DssForm é container, não controle interativo |
| `focus` | ❌ N/A | Pertence aos campos filhos |
| `active` | ❌ N/A | Pertence aos campos filhos |
| `loading` | ❌ N/A | Gerenciado via DssButton (prop `loading`) |

---

## Exceções aos Gates v2.4

| ID | Descrição | Local | Decisão Arquitetural |
|----|-----------|-------|---------------------|
| EXC-Gate-01 | QForm como root — sem wrapper DOM próprio DSS | `1-structure/DssForm.ts.vue` | Aprovado — QForm é o motor irrenunciável; wrapper externo quebraria semântica HTML de `<form>`. Precedente: DssDialog (QDialog), DssMenu (QMenu). |
| EXC-Expose-01 | `defineExpose` com validate/resetValidation/submit/reset | `1-structure/DssForm.ts.vue` | Aprovado — API imperativa necessária para stepper, wizard, botão externo. Precedente: DssDialog, DssInfiniteScroll, DssScrollArea. |
