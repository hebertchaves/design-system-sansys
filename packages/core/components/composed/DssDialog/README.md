# DssDialog

Wrapper DSS governado sobre `QDialog` do Quasar. Modal com suporte a cabeçalho, corpo e rodapé, posicionamento flexível e controle de fechamento.

## Quick Start

```vue
<template>
  <DssButton label="Abrir Diálogo" @click="isOpen = true" />

  <DssDialog v-model:open="isOpen">
    <template #header>
      <h2>Título do Diálogo</h2>
      <DssButton icon="close" flat round dense @click="isOpen = false" />
    </template>

    <p>Conteúdo do diálogo aqui.</p>

    <template #footer>
      <DssButton label="Cancelar" flat @click="isOpen = false" />
      <DssButton label="Confirmar" color="hub" @click="handleConfirm" />
    </template>
  </DssDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
function handleConfirm() { isOpen.value = false }
</script>
```

## Quando usar

- Confirmações de ação destrutiva (excluir, sair, cancelar)
- Formulários modais que requerem foco do usuário
- Detalhes expandidos de um item sem navegar para nova tela
- Painéis laterais ou bottom sheets (via prop `position`)

## Quando NÃO usar

- Para mensagens de sistema não-blocantes → usar `DssTooltip` ou notificação inline
- Para menus e seletores simples → usar `DssMenu` ou `DssPopupProxy`
- Para confirmações mínimas de 1 clique → usar `DssPopupEdit`

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `open` | `Boolean` | `false` | `v-model:open` — controla visibilidade |
| `persistent` | `Boolean` | `false` | Impede fechamento por clique externo ou ESC |
| `seamless` | `Boolean` | `false` | Remove backdrop; permite interação com o fundo |
| `maximized` | `Boolean` | `false` | Exibe em tela cheia (100vw × 100vh) |
| `fullWidth` | `Boolean` | `false` | Ocupa 100% da largura disponível |
| `fullHeight` | `Boolean` | `false` | Ocupa 100% da altura disponível |
| `position` | `'standard' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'standard'` | Posição na tela |
| `transitionEnter` | `String` | `'scale'` | Animação de entrada (ex: `'fade'`, `'slide-up'`) |
| `transitionLeave` | `String` | `'scale'` | Animação de saída |
| `disableEsc` | `Boolean` | `false` | Desabilita fechamento via tecla ESC |
| `disableBackdropClick` | `Boolean` | `false` | Desabilita fechamento via clique no backdrop |

## Slots

| Slot | Obrigatório | Descrição |
|------|------------|-----------|
| `default` | Sim | Conteúdo principal do diálogo |
| `#header` | Não | Cabeçalho — recomendado: título + botão fechar |
| `#footer` | Não | Rodapé — recomendado: botões de ação |

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:open` | `Boolean` | Emitido para atualizar o `v-model:open` |
| `open` | — | Emitido após animação de entrada completar |
| `close` | — | Emitido após animação de saída completar |
| `before-open` | — | Emitido antes da animação de entrada iniciar |
| `before-close` | — | Emitido antes da animação de saída iniciar |

## Estados Visuais

| Estado | Comportamento |
|--------|---------------|
| **aberto** | Exibido com backdrop e foco preso dentro do diálogo |
| **fechado** | Desmontado do DOM após animação de saída |
| **persistent** | Agita o diálogo ao clicar fora (feedback visual de bloqueio) |
| **maximized** | Ocupa 100vw × 100vh, sem bordas arredondadas |
| **seamless** | Sem backdrop; não bloqueia interação com o fundo |
| **posicionado** | Diálogo ancorando em borda específica (top/bottom/left/right) |

## Exemplos

### Confirmação destrutiva

```vue
<DssDialog v-model:open="isOpen" persistent>
  <template #header>
    <h3>Confirmar exclusão?</h3>
  </template>
  <p>Esta ação não pode ser desfeita.</p>
  <template #footer>
    <DssButton label="Cancelar" flat @click="isOpen = false" />
    <DssButton label="Excluir" color="negative" @click="handleDelete" />
  </template>
</DssDialog>
```

### Painel lateral

```vue
<DssDialog v-model:open="isOpen" position="right" full-height>
  <template #header>
    <h2>Filtros</h2>
    <DssButton icon="close" flat round @click="isOpen = false" />
  </template>
  <!-- filtros aqui -->
</DssDialog>
```

### Tela cheia (mobile)

```vue
<DssDialog v-model:open="isOpen" maximized>
  <template #header>
    <h2>Formulário Completo</h2>
    <DssButton icon="close" flat round @click="isOpen = false" />
  </template>
  <!-- formulário -->
  <template #footer>
    <DssButton label="Salvar" color="hub" block @click="handleSave" />
  </template>
</DssDialog>
```

## Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-surface-default` | L2 | Background do diálogo |
| `--dss-shadow-modal` | L2 | Elevação (box-shadow) |
| `--dss-radius-lg` | L2, L3 | Border radius |
| `--dss-padding-4` | L2 | Padding header/footer |
| `--dss-padding-6` | L2 | Padding body |
| `--dss-spacing-2` | L2 | Gap entre botões do footer |
| `--dss-gray-100` | L2 | Divisores header/footer |
| `--dss-font-family-sans` | L2 | Tipografia |
| `--dss-text-body` | L2 | Cor do texto |
| `--dss-hub-primary` | L4 | Borda brand Hub |
| `--dss-water-primary` | L4 | Borda brand Water |
| `--dss-waste-primary` | L4 | Borda brand Waste |

## Acessibilidade

- Foco preso dentro do diálogo enquanto aberto (focus trap nativo do QDialog)
- Fechamento via ESC por padrão (desabilitar apenas quando necessário com `disableEsc`)
- Role `dialog` e `aria-modal` aplicados automaticamente pelo Quasar
- Header deve conter o título identificador do diálogo

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [DssDialog.md](./DssDialog.md) | Normativo — governança, anti-patterns, exceções de gate |
| [DSSDIALOG_API.md](./DSSDIALOG_API.md) | API Reference — props completas, eventos, tokens, mapeamento Quasar |
