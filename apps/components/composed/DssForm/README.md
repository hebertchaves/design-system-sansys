# DssForm

Container de formulário governado pelo DSS. Wrapper sobre `QForm` do Quasar que fornece estrutura semântica HTML, gap entre campos e API imperativa para validação e submissão.

---

## Quando usar

- Agrupar campos de entrada (DssInput, DssSelect, DssCheckbox, etc.) em um formulário
- Precisar de validação centralizada e submissão controlada
- Implementar formulários em qualquer contexto: página, DssDialog, DssStepper

## Quando NÃO usar

- Como container genérico sem campos de formulário — use `<div>` ou `DssCard`
- Para agrupamento visual sem semântica de formulário

---

## Quick Start

```vue
<DssForm @submit.prevent="handleSubmit">
  <DssInput v-model="email" label="E-mail" type="email" :rules="emailRules" />
  <DssInput v-model="password" label="Senha" type="password" :rules="passwordRules" />
  <DssButton type="submit" label="Entrar" color="primary" />
</DssForm>
```

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `autofocus` | `Boolean` | `false` | Foca automaticamente o primeiro campo na montagem |
| `greedy` | `Boolean` | `false` | Valida todos os campos mesmo após o primeiro erro |
| `noErrorFocus` | `Boolean` | `false` | Não move o foco para o campo com erro após validação |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Campos e controles do formulário (DssInput, DssButton, etc.) |

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `submit` | `SubmitEvent` | Formulário enviado e válido |
| `reset` | `Event` | Formulário resetado |
| `validationError` | `(el, tabIndex, index)` | Falha de validação |
| `validationSuccess` | — | Validação bem-sucedida |

---

## API Imperativa (via ref)

```vue
<DssForm ref="formRef" @submit.prevent="handleSubmit">
  <!-- campos -->
</DssForm>

<script setup>
const formRef = ref()

// Validar todos os campos
const isValid = await formRef.value.validate()

// Resetar apenas erros de validação (mantém valores)
formRef.value.resetValidation()

// Submeter programaticamente
formRef.value.submit()

// Resetar valores e validação
formRef.value.reset()
</script>
```

---

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-form-gap` | `var(--dss-spacing-4)` (16px) | Gap entre campos do formulário |

---

## Exemplos

### 1. Formulário básico com validação

```vue
<DssForm @submit.prevent="submit" autofocus>
  <DssInput
    v-model="name"
    label="Nome"
    :rules="[v => !!v || 'Obrigatório']"
    lazy-rules
  />
  <DssButton type="submit" label="Enviar" color="primary" />
  <DssButton type="reset" label="Limpar" flat />
</DssForm>
```

### 2. Validação greedy (todos os erros de uma vez)

```vue
<DssForm greedy @submit.prevent="submit">
  <DssInput v-model="email" label="E-mail" :rules="emailRules" />
  <DssInput v-model="phone" label="Telefone" :rules="phoneRules" />
  <!-- Ambos os campos serão validados ao clicar em Enviar -->
  <DssButton type="submit" label="Enviar" />
</DssForm>
```

### 3. Controle via ref (botão externo ao formulário)

```vue
<DssForm ref="formRef" @submit.prevent="handleSubmit">
  <DssInput v-model="message" label="Mensagem" :rules="msgRules" />
</DssForm>

<!-- Botão fora do <form> -->
<DssButton label="Enviar" @click="formRef.submit()" />
```

### 4. Em DssDialog com controle de saída

```vue
<DssDialog v-model:open="open" persistent>
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

## Acessibilidade

- Renderiza `<form>` HTML nativo — suporte completo a tecnologias assistivas
- Navegação por `Tab`/`Shift+Tab` entre campos é comportamento nativo do browser
- Submissão por `Enter` em campos de texto é comportamento nativo
- Adicione `aria-label` para identificar o formulário: `<DssForm aria-label="Cadastro de usuário">`
- Mensagens de erro são responsabilidade dos campos internos (DssInput, DssSelect)

---

## Anti-patterns

```vue
<!-- ❌ Aplicar margin nos campos — use o gap do DssForm -->
<DssForm>
  <DssInput style="margin-bottom: 16px" />
</DssForm>

<!-- ✅ Gap automático -->
<DssForm>
  <DssInput />
  <DssInput />
</DssForm>

<!-- ❌ HTML nativo sem wrapper DSS -->
<DssForm>
  <input type="text" />
</DssForm>

<!-- ✅ Usar componentes DSS -->
<DssForm>
  <DssInput />
</DssForm>

<!-- ❌ Aninhar DssForm -->
<DssForm>
  <DssForm><!-- Não! --></DssForm>
</DssForm>
```
