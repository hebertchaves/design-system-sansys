# DssPopupEdit

Overlay de edição inline baseado no `QPopupEdit` do Quasar. Permite editar um valor sem sair do contexto atual — o popup abre ao clicar no elemento pai hospedeiro.

## Quando usar

- Edição rápida de um campo em tabelas, listas ou cards
- Configurações inline que não justificam uma página dedicada
- Formulários contextuais com foco único (um campo ou conjunto pequeno)

## Quando NÃO usar

- Formulários longos ou com muitos campos → usar DssDialog
- Notificações ou alertas → usar DssDialog com slot customizado
- Tooltips informativos → usar DssTooltip
- Menus de ação → usar DssMenu

## Quick Start

```vue
<template>
  <td>
    {{ nome }}
    <DssPopupEdit v-model="nome" title="Editar Nome">
      <DssInput v-model="nome" autofocus />
    </DssPopupEdit>
  </td>
</template>

<script setup>
import { ref } from 'vue'
import { DssPopupEdit } from '@dss/components'
import DssInput from '@dss/components/DssInput'

const nome = ref('João Silva')
</script>
```

## Modos de Uso

### 1. Edição simples de texto

```vue
<td>
  {{ valor }}
  <DssPopupEdit v-model="valor" title="Editar campo">
    <DssInput v-model="valor" dense autofocus />
  </DssPopupEdit>
</td>
```

### 2. Seleção inline

```vue
<td>
  {{ status }}
  <DssPopupEdit v-model="status" title="Status">
    <DssSelect v-model="status" :options="statusOpts" dense />
  </DssPopupEdit>
</td>
```

### 3. Persistente (sem fechamento por clique externo)

```vue
<DssPopupEdit v-model="valor" persistent title="Edição obrigatória">
  <DssInput v-model="valor" autofocus />
</DssPopupEdit>
```

### 4. Com brand Hub

```vue
<div data-brand="hub">
  <DssPopupEdit v-model="valor" title="Editar">
    <DssInput v-model="valor" autofocus />
  </DssPopupEdit>
</div>
```

### 5. Com validação

```vue
<DssPopupEdit
  v-model="email"
  title="Email"
  :validate="(v) => v.includes('@') || 'Email inválido'"
>
  <DssInput v-model="email" type="email" autofocus />
</DssPopupEdit>
```

## Atenção: v-model = valor editado

O `v-model` do `DssPopupEdit` controla o **valor em edição** — não a visibilidade do popup.

A visibilidade é gerenciada internamente pelo Quasar via clique no elemento pai hospedeiro.

```vue
<!-- ✅ Correto: v-model bind no valor -->
<td>
  {{ texto }}
  <DssPopupEdit v-model="texto">...</DssPopupEdit>
</td>

<!-- ❌ Errado: DssPopupEdit não é usado standalone sem elemento pai -->
<DssPopupEdit v-model="texto" />  <!-- popup não terá gatilho -->
```
