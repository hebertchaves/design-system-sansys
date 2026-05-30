# DSSPOPUPPROXY_API.md — DssPopupProxy API Reference

## Identificação

| Campo | Valor |
|-------|-------|
| Componente | `DssPopupProxy` |
| Versão DSS | 2.2 |
| Fase | 2 — Overlay Responsivo (Nível 2) |
| Motor Quasar | QPopupProxy → QMenu (desktop) / QDialog (mobile) |
| Golden Reference | DssChip |
| Golden Context | DssMenu |

---

## Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `open` | `Boolean` | `false` | Não | Controla visibilidade via `v-model:open` |
| `breakpoint` | `Number\|String` | `450` | Não | Breakpoint px — ≥: QMenu, <: QDialog |
| `target` | `String\|Element\|Boolean\|null` | — | Não | Elemento alvo para posicionamento |
| `noParentEvent` | `Boolean` | `false` | Não | Impede listener no elemento pai |
| `contextMenu` | `Boolean` | `false` | Não | Ativa popup em clique-direito |
| `persistent` | `Boolean` | `false` | Não | Impede fechamento ao clicar fora / ESC |
| `noFocus` | `Boolean` | `false` | Não | Impede captura de foco ao abrir |
| `noRefocus` | `Boolean` | `false` | Não | Impede retorno de foco ao trigger ao fechar |
| `autoClose` | `Boolean` | `false` | Não | Fecha ao clicar em elemento interno |
| `anchor` | `PopupProxyPosition` | — | Não | Ponto de ancoragem no trigger |
| `self` | `PopupProxyPosition` | — | Não | Ponto de alinhamento do popup |
| `offset` | `[Number, Number]` | — | Não | Deslocamento [x, y] em pixels |
| `fit` | `Boolean` | `false` | Não | Ajusta largura do popup à do trigger |
| `cover` | `Boolean` | `false` | Não | Cobre completamente o trigger |
| `maxHeight` | `String` | — | Não | Altura máxima CSS (ex: `'300px'`, `'50vh'`) |
| `maxWidth` | `String` | — | Não | Largura máxima CSS (ex: `'400px'`, `'80vw'`) |
| `transitionShow` | `String` | — | Não | Nome da transição de entrada |
| `transitionHide` | `String` | — | Não | Nome da transição de saída |
| `scrollTarget` | `String\|Element` | — | Não | Elemento para escutar eventos de scroll |

### Props Bloqueadas

| Prop | Motivo |
|------|--------|
| `dark` | Modo escuro governado globalmente via `[data-theme="dark"]` |
| `square` | Cantos quadrados violam o token `--dss-radius-md` |

---

## Slots

| Slot | Descrição | Recomendação |
|------|-----------|-------------|
| `default` | Conteúdo do popup | Modo menu: `DssList > DssItem`. Modo dialog: `DssCard`. |

---

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:open` | `Boolean` | Sincronização de `v-model:open` |
| `beforeShow` | `Event` | Antes da transição de entrada |
| `show` | `Event` | Após popup estar visível |
| `beforeHide` | `Event` | Antes da transição de saída |
| `hide` | `Event` | Após popup estar oculto |

---

## Methods (defineExpose — EXC-Expose-01)

| Método | Assinatura | Descrição |
|--------|-----------|-----------|
| `show` | `(evt?: Event) => void` | Abre o popup programaticamente |
| `hide` | `(evt?: Event) => void` | Fecha o popup programaticamente |
| `toggle` | `(evt?: Event) => void` | Alterna visibilidade |
| `currentComponent` | `getter: QMenu \| QDialog \| undefined` | Componente ativo atual (motor renderizado) |

```vue
<script setup>
const popupRef = ref()

// Uso programático
popupRef.value?.show()
popupRef.value?.hide()
popupRef.value?.toggle()
console.log(popupRef.value?.currentComponent) // QMenu ou QDialog
</script>
<template>
  <DssPopupProxy ref="popupRef" v-model:open="show">
    ...
  </DssPopupProxy>
</template>
```

---

## Type: PopupProxyPosition

```typescript
type PopupProxyPosition =
  | 'top left' | 'top middle' | 'top right' | 'top start' | 'top end'
  | 'center left' | 'center middle' | 'center right' | 'center start' | 'center end'
  | 'bottom left' | 'bottom middle' | 'bottom right' | 'bottom start' | 'bottom end'
```

---

## Tokens Utilizados

| Token | Aplicação |
|-------|-----------|
| `--dss-surface-default` | Background do painel popup (menu e dialog) |
| `--dss-elevation-3` | Sombra do painel |
| `--dss-radius-md` | Border-radius do painel |
| `--dss-font-family-sans` | Fonte do conteúdo interno |
| `--dss-text-body` | Cor de texto padrão |
| `--dss-border-width-thin` | Borda em dark mode |
| `--dss-gray-200` | Cor da borda em dark mode |
| `--dss-border-width-md` | Borda em high contrast mode |

---

## CSS Classes

| Classe | Descrição |
|--------|-----------|
| `.dss-popup-proxy` | Hook de escopo DSS — aplicada ao QMenu (desktop) ou QDialog (mobile) |

---

## Exemplos de Uso

### Básico — Menu de ações
```vue
<DssButton label="Opções">
  <DssPopupProxy v-model:open="show">
    <DssList>
      <DssItem label="Editar" clickable v-close-popup />
      <DssItem label="Excluir" clickable v-close-popup />
    </DssList>
  </DssPopupProxy>
</DssButton>
```

### Popup de confirmação (persistent)
```vue
<DssButton label="Excluir">
  <DssPopupProxy v-model:open="show" persistent>
    <DssCard class="q-pa-md">
      <p>Confirmar exclusão?</p>
      <DssButton flat label="Cancelar" v-close-popup />
      <DssButton label="Confirmar" v-close-popup @click="excluir" />
    </DssCard>
  </DssPopupProxy>
</DssButton>
```

### Context menu
```vue
<div>
  Área com context menu
  <DssPopupProxy v-model:open="show" context-menu>
    <DssList>
      <DssItem label="Copiar" clickable v-close-popup />
      <DssItem label="Colar" clickable v-close-popup />
    </DssList>
  </DssPopupProxy>
</div>
```

### Controle programático
```vue
<DssPopupProxy ref="proxyRef" v-model:open="show">
  ...
</DssPopupProxy>

<script setup>
const proxyRef = ref()
// Abrir programaticamente (ex: após validação)
function abrirPopup() {
  proxyRef.value?.show()
}
</script>
```
