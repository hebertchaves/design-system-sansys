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
| `--dss-border-subtle` | L2 | Cor dos divisores de header/footer |
| `--dss-border-width-thin` | L2 | Espessura dos divisores |
| `--dss-font-family-sans` | L2 | Tipografia |
| `--dss-text-body` | L2 | Cor do texto |
| `--dss-action-primary` | L4 | Acento de marca na borda do header |

> **Corrigido em set/2026.** Esta tabela listava `--dss-hub-primary`,
> `--dss-water-primary` e `--dss-waste-primary` — **três tokens que não existem**. O
> `4-output/_brands.scss` foi colapsado (os três blocos por marca eram idênticos, porque
> `--dss-action-primary` já é remapeado por `[data-brand]`) e a tabela não acompanhou.
> Também listava `--dss-gray-100` para os divisores, que na verdade usam
> `--dss-border-subtle`.

## A marca do overlay é a do DOCUMENTO

O conteúdo do diálogo é **teleportado** para fora da árvore do componente. A cascata de CSS
que carrega `[data-brand]` não chega lá por herança — é o risco 2.1 do
[guia de composição de Fase 3](../../../../docs/governance/DSS_GUIA_COMPOSICAO_FASE3.md).

O `DssDialog` mitiga repassando a marca explicitamente ao nó teleportado, via o composable
`useTeleportedBrand`. Mas **a marca que ele repassa é a do documento**, resolvida em duas
etapas:

1. **Caminho normativo** — `data-brand` no `<body>` ou no `<html>`. É assim que uma
   aplicação Sansys deve declarar a marca.
2. **Fallback legado** — na falta do primeiro, o **primeiro** elemento com `[data-brand]`
   do documento inteiro.

```vue
<!-- ✅ a aplicação declara a marca no documento -->
<script setup>
document.body.dataset.brand = 'water'
</script>
```

**A armadilha, e ela é silenciosa.** O ancestral do gatilho **não manda**. Numa tela Sansys
isso nunca aparece, porque a página toda tem uma marca só. Em página de marca **mista**,
todo overlay sai com a marca do primeiro bloco do DOM — não com a do bloco que o abriu, e
sem um aviso. Se a sua tela mistura marcas, ponha a marca no `<body>` antes de abrir.

Medido (set/2026) na seção 03 da página de Playground: com `<body data-brand="water">` o nó
teleportado recebe `data-brand="water"` e o botão do footer sai `rgb(14, 136, 228)`.

## Acessibilidade

- Foco preso dentro do diálogo enquanto aberto (focus trap nativo do QDialog)
- Fechamento via ESC por padrão. `disableEsc` e `persistent` desligam isso — e passam a
  **exigir** que o footer ofereça a saída: modal do qual não se sai é armadilha de teclado
  (WCAG 2.1.2). Um overlay persistente sem cancelar no footer é defeito, não escolha
- Role `dialog` e `aria-modal` aplicados automaticamente pelo Quasar
- Header deve conter o título identificador do diálogo

## Quem é dono do scroll

Aninhar container dentro de container gera barra de rolagem dupla quando ninguém declara
quem rola — risco 2.2 do guia de Fase 3. No `DssDialog` a resposta é: **o corpo rola**. O
header e o footer ficam parados, e o filho (uma tabela, um formulário) não declara altura
própria.

Medido com 60 linhas de `DssTable` dentro: 2307px de conteúdo numa caixa de 762px, com o
corpo rolando e o overlay não.

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [DssDialog.md](./DssDialog.md) | Normativo — governança, anti-patterns, exceções de gate |
| [DSSDIALOG_API.md](./DSSDIALOG_API.md) | API Reference — props completas, eventos, tokens, mapeamento Quasar |
