# DssPopupProxy — API Reference

**Versão:** 1.0.0 | **Fase:** 2 | **Classificação:** Overlay Responsivo — Proxy de Popup  
**Golden Reference:** DssChip | **Golden Context:** DssMenu

---

## Props

| Prop | Tipo | Default | Obrigatório | Descrição |
|------|------|---------|-------------|-----------|
| `modelValue` | `Boolean` | `undefined` | Não | Controla a visibilidade do popup (suporta `v-model`) |
| `breakpoint` | `Number` | `450` | Não | Largura de viewport (px) abaixo da qual renderiza como QDialog |
| `target` | `String \| Element \| Boolean` | `true` | Não | Elemento âncora para ancoragem e acionamento. `true` = pai DOM, `false` = sem ancoragem |
| `noParentEvent` | `Boolean` | `undefined` | Não | Não escuta eventos do elemento pai para abrir/fechar |
| `contextMenu` | `Boolean` | `undefined` | Não | Abre com clique direito / long tap mobile (context menu) |
| `persistent` | `Boolean` | `undefined` | Não | Não fecha ao clicar fora nem ao pressionar Esc |
| `noFocus` | `Boolean` | `undefined` | Não | Não move o foco para o popup ao abrir |
| `noRefocus` | `Boolean` | `undefined` | Não | Não retorna o foco ao elemento acionador ao fechar |
| `autoClose` | `Boolean` | `undefined` | Não | Fecha automaticamente ao clicar em qualquer item interno |
| `anchor` | `String` | `undefined` | Não | Ponto de ancoragem no target (ex: `"bottom start"`, `"top middle"`) — modo QMenu |
| `self` | `String` | `undefined` | Não | Ponto de ancoragem no próprio popup (ex: `"top start"`) — modo QMenu |
| `offset` | `[Number, Number]` | `undefined` | Não | Deslocamento `[x, y]` em pixels da posição calculada — modo QMenu |
| `fit` | `Boolean` | `undefined` | Não | Ajusta a largura do popup à largura do target — modo QMenu |
| `cover` | `Boolean` | `undefined` | Não | O popup cobre completamente o target — modo QMenu |
| `maxHeight` | `String` | `undefined` | Não | Altura máxima do painel (ex: `"300px"`, `"50vh"`) |
| `maxWidth` | `String` | `undefined` | Não | Largura máxima do painel (ex: `"400px"`, `"80vw"`) |
| `transitionShow` | `String` | `undefined` | Não | Animação de entrada (nome de transição Vue/Quasar) |
| `transitionHide` | `String` | `undefined` | Não | Animação de saída (nome de transição Vue/Quasar) |
| `scrollTarget` | `Element \| String` | `undefined` | Não | Container de scroll monitorado para reposicionamento |

### Props bloqueadas

| Prop Quasar | Motivo do Bloqueio |
|-------------|-------------------|
| `dark` | Modo escuro governado globalmente via `[data-theme="dark"]` |
| `square` | Cantos quadrados violam `--dss-radius-md` |

---

## Emits

| Evento | Payload | Passthrough | Descrição |
|--------|---------|-------------|-----------|
| `update:modelValue` | `Boolean` | ✅ | Mudança de visibilidade — suporta `v-model` |
| `show` | `Event` | ✅ | Popup completamente visível (transição concluída) |
| `hide` | `Event` | ✅ | Popup completamente oculto (transição concluída) |
| `beforeShow` | `Event` | ✅ | Antes da transição de abertura |
| `beforeHide` | `Event` | ✅ | Antes da transição de fechamento |

---

## Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `() => unknown` | Conteúdo renderizado dentro do popup (DssList, DssCard, etc.) |

---

## Métodos expostos

Via `defineExpose` (EXC-Expose-01):

| Método | Parâmetros | Retorno | Descrição |
|--------|-----------|---------|-----------|
| `show(evt?)` | `Event \| undefined` | `void` | Abre o popup programaticamente |
| `hide(evt?)` | `Event \| undefined` | `void` | Fecha o popup programaticamente |
| `toggle(evt?)` | `Event \| undefined` | `void` | Alterna estado aberto/fechado |
| `currentComponent` | — | `{ type: 'menu' \| 'dialog', ref: Component }` | Acessa o componente interno ativo |

> **Nota:** Os métodos `show`, `hide`, `toggle` e a prop computada `currentComponent` são expostos pelo QPopupProxy nativamente. O DSS os disponibiliza via a ref do componente.

---

## Tokens utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-surface-default` | Superfície padrão | Background do painel popup (menu e dialog) |
| `--dss-elevation-3` | Sombra nível 3 | Sombra do painel em modo menu |
| `--dss-radius-md` | 8px | Border-radius do painel |
| `--dss-font-family-sans` | Família sans-serif | Tipografia do conteúdo |
| `--dss-text-body` | Cor de texto corpo | Cor padrão do conteúdo |
| `--dss-border-width-thin` | 1px | Borda sutil em dark mode |
| `--dss-border-width-md` | 2px | Borda reforçada em high contrast |
| `--dss-gray-200` | Cinza 200 | Cor da borda em dark mode |

---

## Comportamento responsivo

| Condição | Motor interno | CSS aplicado |
|----------|--------------|--------------|
| `viewport ≥ breakpoint` | `QMenu` | `.q-menu.dss-popup-proxy` |
| `viewport < breakpoint` | `QDialog` | `.q-dialog.dss-popup-proxy .q-dialog__inner` |

### Valores de `anchor` e `self`

Formato: `"{vertical} {horizontal}"`  
Opções: `top`, `center`, `bottom` × `left`, `middle`, `right`, `start`, `end`

Exemplos:
- `"bottom start"` — âncora no canto inferior esquerdo
- `"top middle"` — âncora no centro superior
- `"bottom right"` — âncora no canto inferior direito

---

## Exceções arquiteturais

| ID | Descrição | Local |
|----|-----------|-------|
| `EXC-Gate-01` | QPopupProxy como root — sem wrapper DOM próprio | `1-structure/DssPopupProxy.ts.vue` |
| `EXC-Gate-02` | Compound selectors `.q-menu.dss-popup-proxy` / `.q-dialog.dss-popup-proxy` | `2-composition/_base.scss` |
| `EXC-01` | `!important` em background-color e box-shadow (modo menu) | `2-composition/_base.scss` |
| `EXC-02` | System color keywords em forced-colors mode | `4-output/_states.scss` |
| `EXC-03` | `display: none !important` em print | `4-output/_states.scss` |

---

## Paridade com Golden Reference (DssChip)

| Padrão | DssChip | DssPopupProxy | Justificativa da Divergência |
|--------|---------|---------------|------------------------------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | — |
| `inheritAttrs: false` + `v-bind="$attrs"` | ✅ | ✅ | — |
| `-webkit-tap-highlight-color: transparent` | ✅ | N/A | Container overlay sem touch direto |
| `::before` exclusivo para touch target | ✅ | N/A | Sem touch target próprio (overlay proxy) |
| `aria-hidden` em elementos decorativos | ✅ | N/A | Sem elementos decorativos próprios |
| `focus-visible` ring | ✅ | N/A | Foco gerenciado pelo QMenu/QDialog nativamente |
| `dense` variant | ✅ | N/A | Sem variantes de densidade (overlay proxy) |
| `disabled` state | ✅ | N/A | Não aplicável a proxy de popup |
| `error` state | N/A | N/A | Não aplicável a overlays |

---

## Estados

| Estado | Aplicável | Implementação | Justificativa |
|--------|-----------|---------------|---------------|
| `visible` | ✅ | Via `v-model` / QPopupProxy interno | — |
| `hidden` | ✅ | Via `v-model` / QPopupProxy interno | — |
| `hover` | ❌ | — | Container proxy não-interativo |
| `active` | ❌ | — | Container proxy não-interativo |
| `focus` | ❌ | — | Gerenciado pelo QMenu/QDialog nativamente |
| `disabled` | ❌ | — | Não aplicável a proxy overlay |
| `loading` | ❌ | — | Não aplicável — Fase 2 síncrona |
| `error` | ❌ | — | Não aplicável a overlays |
| `checked` | ❌ | — | Não aplicável |
| `indeterminate` | ❌ | — | Não aplicável |

---

## Padrões de composição

### Padrão 1: Menu de ações (mais comum)
```vue
<DssButton ref="btnRef" label="Ações" @click="open = !open" />
<DssPopupProxy v-model="open" :target="btnRef" anchor="bottom start" self="top start">
  <DssList>
    <DssItem clickable v-close-popup>Editar</DssItem>
    <DssItem clickable v-close-popup>Duplicar</DssItem>
    <DssSeparator />
    <DssItem clickable v-close-popup class="text-negative">Excluir</DssItem>
  </DssList>
</DssPopupProxy>
```

### Padrão 2: Confirmação persistente
```vue
<DssPopupProxy v-model="open" :target="btnRef" persistent anchor="bottom left" self="top left">
  <DssCard class="q-pa-md" style="max-width: 320px">
    <p class="text-body1">Tem certeza?</p>
    <div class="row q-gutter-sm justify-end">
      <DssButton label="Cancelar" flat v-close-popup @click="open = false" />
      <DssButton label="Confirmar" color="hub" @click="onConfirm" />
    </div>
  </DssCard>
</DssPopupProxy>
```

### Padrão 3: Controle programático via ref
```vue
<DssPopupProxy ref="proxyRef" :target="btnRef">
  <DssList>...</DssList>
</DssPopupProxy>

<script setup>
const proxyRef = ref(null)
// Abrir programaticamente
proxyRef.value.show()
// Verificar modo ativo
console.log(proxyRef.value.currentComponent.type) // 'menu' ou 'dialog'
</script>
```
