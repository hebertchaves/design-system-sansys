# DssPopupProxy

Wrapper DSS governado sobre `QPopupProxy` do Quasar.  
**Overlay Responsivo** — decide automaticamente entre `QMenu` (desktop) e `QDialog` (mobile) baseado no tamanho da viewport.

**Golden Reference:** DssChip | **Golden Context:** DssMenu | **Fase:** 2

---

## Quando usar

- Quando um popup precisa ser **responsivo**: menu dropdown em desktop, dialog fullscreen em mobile.
- Para menus de ações acionados por botões, avatares ou ícones.
- Para confirmações, tooltips expandidos ou seletores que precisam se adaptar ao viewport.

## Quando NÃO usar

- Se o popup sempre deve ser um menu (→ use `DssMenu` diretamente).
- Se o popup sempre deve ser um dialog (→ use `DssDialog` diretamente).
- Para tooltips simples (→ use `DssTooltip`).

---

## Instalação

```javascript
import { DssPopupProxy } from '@dss/components'
```

---

## Uso básico

```vue
<template>
  <DssButton ref="btnRef" label="Opções" @click="open = !open" />
  
  <DssPopupProxy v-model="open" :target="btnRef">
    <DssList>
      <DssItem clickable v-close-popup>Editar</DssItem>
      <DssItem clickable v-close-popup>Excluir</DssItem>
    </DssList>
  </DssPopupProxy>
</template>

<script setup>
import { ref } from 'vue'
const btnRef = ref(null)
const open = ref(false)
</script>
```

---

## Props principais

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `v-model` / `modelValue` | `Boolean` | — | Controla visibilidade |
| `breakpoint` | `Number` | `450` | Largura (px) abaixo da qual renderiza como QDialog |
| `target` | `String \| Element \| Boolean` | `true` | Elemento âncora para posicionamento |
| `anchor` | `String` | — | Ponto de ancoragem no target (ex: `"bottom start"`) |
| `self` | `String` | — | Ponto de ancoragem no próprio popup (ex: `"top start"`) |
| `offset` | `[Number, Number]` | — | Deslocamento `[x, y]` em pixels |
| `persistent` | `Boolean` | — | Não fecha ao clicar fora ou pressionar Esc |
| `autoClose` | `Boolean` | — | Fecha ao clicar em qualquer item interno |
| `noFocus` | `Boolean` | — | Não transfere foco ao abrir |
| `noRefocus` | `Boolean` | — | Não retorna foco ao fechar |
| `fit` | `Boolean` | — | Ajusta largura ao elemento target |
| `cover` | `Boolean` | — | Cobre completamente o elemento target |
| `maxHeight` | `String` | — | Altura máxima (ex: `"300px"`, `"50vh"`) |
| `maxWidth` | `String` | — | Largura máxima (ex: `"400px"`, `"80vw"`) |
| `transitionShow` | `String` | — | Transição de entrada |
| `transitionHide` | `String` | — | Transição de saída |
| `contextMenu` | `Boolean` | — | Ativa com clique direito (context menu) |
| `noParentEvent` | `Boolean` | — | Não escuta eventos do elemento pai |
| `scrollTarget` | `Element \| String` | — | Container de scroll monitorado |

**Props bloqueadas:** `dark` (→ usar `[data-theme="dark"]`), `square` (→ viola `--dss-radius-md`).

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `Boolean` | Mudança de visibilidade (v-model) |
| `show` | `Event` | Popup completamente visível |
| `hide` | `Event` | Popup completamente oculto |
| `beforeShow` | `Event` | Antes da transição de abertura |
| `beforeHide` | `Event` | Antes da transição de fechamento |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do popup (DssList, DssCard, etc.) |

---

## Comportamento responsivo

| Viewport | Renderiza | Comportamento |
|----------|-----------|---------------|
| `≥ breakpoint` | `QMenu` | Dropdown posicionado via anchor/self |
| `< breakpoint` | `QDialog` | Dialog fullscreen ou bottom-sheet |

---

## Exemplos

### Menu de ações
```vue
<DssPopupProxy v-model="open" :target="btnRef" anchor="bottom start" self="top start">
  <DssList>
    <DssItem clickable v-close-popup>Editar</DssItem>
    <DssItem clickable v-close-popup>Duplicar</DssItem>
    <DssSeparator />
    <DssItem clickable v-close-popup class="text-negative">Excluir</DssItem>
  </DssList>
</DssPopupProxy>
```

### Confirmação persistente
```vue
<DssPopupProxy v-model="open" :target="btnRef" persistent>
  <DssCard class="q-pa-md">
    <p>Tem certeza que deseja excluir?</p>
    <DssButton label="Cancelar" flat v-close-popup />
    <DssButton label="Excluir" color="negative" @click="confirmar" />
  </DssCard>
</DssPopupProxy>
```

### Com breakpoint customizado (768px)
```vue
<DssPopupProxy v-model="open" :target="btnRef" :breakpoint="768">
  <!-- Renderiza QMenu em tablets e desktops, QDialog em mobile -->
  <DssList>...</DssList>
</DssPopupProxy>
```

---

## Tokens utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Background do painel popup |
| `--dss-elevation-3` | Sombra do painel (modo menu) |
| `--dss-radius-md` | Border-radius do painel |
| `--dss-font-family-sans` | Tipografia |
| `--dss-text-body` | Cor de texto padrão |
| `--dss-border-width-thin` | Borda dark mode |
| `--dss-border-width-md` | Borda high-contrast |
| `--dss-gray-200` | Cor da borda dark mode |

---

## Anti-patterns

```vue
<!-- ❌ HTML nativo diretamente no slot para menus -->
<DssPopupProxy>
  <ul><li>Item</li></ul>
</DssPopupProxy>

<!-- ✅ Componentes DSS -->
<DssPopupProxy>
  <DssList><DssItem>Item</DssItem></DssList>
</DssPopupProxy>
```

---

**Status:** Pronto para auditoria DSS v2.2  
**Versão:** 1.0.0
