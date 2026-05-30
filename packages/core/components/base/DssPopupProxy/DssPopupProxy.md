# DssPopupProxy — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssPopupProxy` é um overlay responsivo que decide automaticamente entre exibir um popup flutuante (`QMenu`) em viewports desktop ou um modal (`QDialog`) em viewports mobile, baseado no prop `breakpoint` (default: 450px). É o padrão DSS para overlays contextuais que precisam funcionar em ambas as telas.

**Quando usar:**
- Menus de ações (editar, duplicar, excluir) atrelados a botões ou ícones
- Popups de confirmação que precisam adaptar ao contexto de tela
- Menus de contexto (clique-direito)
- Qualquer overlay contextual que necessite funcionar igualmente em desktop (menu flutuante) e mobile (modal)

**Quando NÃO usar:**
- Quando o comportamento é sempre menu (usar `DssMenu` diretamente)
- Quando o comportamento é sempre dialog (usar `DssDialog` diretamente)
- Para tooltips informativos (usar `DssTooltip`)
- Para notificações/alertas globais (usar componente de notificação)

---

## 2. Classificação DSS

- **Tipo:** Overlay Responsivo
- **Categoria:** Overlay / Composição (Nível 2)
- **Fase:** 2 (Composição de Primeiro Grau)
- **Interativo:** Não (container — interatividade pertence aos filhos)
- **Golden Reference:** DssChip (componente interativo — touch target, pseudo-elementos)
- **Golden Context:** DssMenu (overlay QMenu — baseline específico de auditoria)
- **Motor:** QPopupProxy (Quasar) → QMenu (desktop) ou QDialog (mobile)

---

## 3. API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `Boolean` | `false` | Controla visibilidade via `v-model:open` |
| `breakpoint` | `Number\|String` | `450` | Breakpoint px: ≥ → QMenu, < → QDialog |
| `target` | `String\|Element\|Boolean\|null` | — | Elemento alvo para posicionamento |
| `noParentEvent` | `Boolean` | `false` | Impede listener no elemento pai |
| `contextMenu` | `Boolean` | `false` | Ativa em clique-direito |
| `persistent` | `Boolean` | `false` | Impede fechamento ao clicar fora / ESC |
| `noFocus` | `Boolean` | `false` | Impede captura de foco ao abrir |
| `noRefocus` | `Boolean` | `false` | Impede retorno de foco ao fechar |
| `autoClose` | `Boolean` | `false` | Fecha ao clicar em elemento interno |
| `anchor` | `PopupProxyPosition` | — | Ponto de ancoragem no trigger |
| `self` | `PopupProxyPosition` | — | Ponto de alinhamento do popup |
| `offset` | `[Number, Number]` | — | Deslocamento [x, y] em pixels |
| `fit` | `Boolean` | `false` | Ajusta largura do popup à do trigger |
| `cover` | `Boolean` | `false` | Cobre completamente o trigger |
| `maxHeight` | `String` | — | Altura máxima CSS (ex: '300px') |
| `maxWidth` | `String` | — | Largura máxima CSS (ex: '400px') |
| `transitionShow` | `String` | — | Transição de entrada |
| `transitionHide` | `String` | — | Transição de saída |
| `scrollTarget` | `String\|Element` | — | Elemento para escutar scroll |

**Props bloqueadas (não repassadas ao QPopupProxy):**
- `dark`: Modo escuro governado globalmente via `[data-theme="dark"]`
- `square`: Cantos quadrados violam o token `--dss-radius-md`

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do popup. Modo menu: `DssList > DssItem`. Modo dialog: `DssCard`. |

### Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:open` | `Boolean` | Sincronização bidirecional de `v-model:open` |
| `beforeShow` | `Event` | Emitido antes da transição de entrada |
| `show` | `Event` | Emitido após o popup estar visível |
| `beforeHide` | `Event` | Emitido antes da transição de saída |
| `hide` | `Event` | Emitido após o popup estar oculto |

### Methods (defineExpose — EXC-Expose-01)

| Método | Assinatura | Descrição |
|--------|-----------|-----------|
| `show` | `(evt?: Event) => void` | Abre o popup programaticamente |
| `hide` | `(evt?: Event) => void` | Fecha o popup programaticamente |
| `toggle` | `(evt?: Event) => void` | Alterna visibilidade programaticamente |
| `currentComponent` | `getter: QMenu \| QDialog \| undefined` | Componente ativo atual |

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| visible | ✅ | Controlado via v-model:open / QPopupProxy |
| hidden | ✅ | Controlado via v-model:open / QPopupProxy |
| hover | N/A | Container overlay não-interativo |
| focus | N/A | Gerenciado pelo QMenu/QDialog nativamente |
| active | N/A | Container overlay não-interativo |
| disabled | N/A | Não aplicável a overlays de layout |
| loading | N/A | Não aplicável (síncrono) |
| checked | N/A | Não aplicável |

**Justificativa estados N/A:**  
DssPopupProxy é um container overlay. Estados interativos (hover, focus, active, disabled) pertencem aos filhos (DssItem, DssButton). O componente apenas fornece o contexto de posicionamento e a decisão responsiva menu/dialog.

---

## 5. Tokens Utilizados

| Token | Valor | Aplicação |
|-------|-------|-----------|
| `--dss-surface-default` | — | Background do painel popup (menu e dialog) |
| `--dss-elevation-3` | — | Sombra do painel (posiciona acima do conteúdo) |
| `--dss-radius-md` | — | Border-radius do painel (menu e dialog) |
| `--dss-font-family-sans` | — | Fonte do conteúdo interno |
| `--dss-text-body` | — | Cor de texto padrão |
| `--dss-border-width-thin` | — | Borda dark mode |
| `--dss-gray-200` | — | Cor da borda dark mode |
| `--dss-border-width-md` | — | Borda high contrast mode |

---

## 6. Acessibilidade

- **WCAG 2.1 AA**: Conforme. Gerenciado pelo QMenu/QDialog nativamente.
- **Touch target**: N/A — DssPopupProxy é container overlay não-interativo.
- **Role ARIA**: Herdado do QMenu (`role="menu"`) ou QDialog (`role="dialog"`) automaticamente.
- **Navegação por teclado**: Gerenciada pelo Quasar (ESC fecha, Tab navega entre focáveis).
- **Foco**: Movido automaticamente para o popup ao abrir (a menos que `noFocus: true`).
- **Retorno de foco**: Ao fechar, foco retorna ao trigger (a menos que `noRefocus: true`).
- **⚠️ Cuidado com noFocus**: O uso de `noFocus: true` impacta usuários de leitores de tela — documentar quando usado.

---

## 7. Comportamentos Implícitos

### inheritAttrs: false
`$attrs` é repassado explicitamente ao `QPopupProxy` via `v-bind="$attrs"`. QPopupProxy é o elemento raiz. Evita que atributos HTML extras (`aria-*`, `data-*`) sejam aplicados em um wrapper externo inexistente.

### CSS Global (não scoped)
QPopupProxy teleporta conteúdo para `<body>`. Estilos `<style scoped>` seriam ineficazes. Todos os estilos são carregados globalmente via `components/index.scss` com `.dss-popup-proxy` como seletor de escopo.

### Decisão Responsiva (breakpoint)
O `breakpoint` (default 450px) controla quando o QPopupProxy alterna entre QMenu e QDialog:
- **viewport ≥ breakpoint**: popup flutuante posicionável (QMenu) → CSS: `.dss-popup-proxy` no `.q-menu`
- **viewport < breakpoint**: modal com backdrop (QDialog) → CSS: `.q-dialog.dss-popup-proxy .q-dialog__inner`

### Passagem de Classe ao Motor
A classe `.dss-popup-proxy` é aplicada via `:class="popupProxyClasses"` no `q-popup-proxy`. O QPopupProxy passa esta classe ao componente motor ativo (QMenu ou QDialog) como atributo de classe.

### defineExpose (EXC-Expose-01)
Os métodos `show`, `hide`, `toggle` e `currentComponent` são delegados ao `proxyRef` interno do QPopupProxy. Padrão estabelecido em DssInfiniteScroll, DssScrollArea e DssAjaxBar.

---

## 8. Paridade com Golden Context (DssMenu)

| Aspecto | DssMenu | DssPopupProxy | Divergência |
|---------|---------|---------------|-------------|
| Motor Quasar | QMenu | QPopupProxy (→ QMenu/QDialog) | Intencional — responsivo |
| inheritAttrs | `false` | `false` | Igual |
| Classe CSS | `.dss-menu` | `.dss-popup-proxy` | Diferente (nome) |
| CSS Global | ✅ | ✅ | Igual |
| EXC-01 !important | ✅ bg + shadow | ✅ bg + shadow (modo menu) | Igual |
| Dark mode border | ✅ | ✅ | Igual |
| High contrast border | ✅ | ✅ | Igual |
| Forced colors | ✅ Canvas/CanvasText | ✅ Canvas/CanvasText | Igual |
| Print: display:none | ✅ | ✅ | Igual |
| Brand delegado | ✅ filhos | ✅ filhos | Igual |
| defineExpose | ❌ | ✅ show/hide/toggle/currentComponent | Intencional — API imperativa |
| Modo dialog | ❌ | ✅ `.q-dialog.dss-popup-proxy .q-dialog__inner` | Intencional — EXC-Gate-01 |
| v-model prop name | `modelValue` | `open` | Intencional — semântica mais clara |

---

## 9. Matriz de Composição DSS

### Papel Estrutural
DssPopupProxy é um container overlay responsivo. Fornece o contexto de posicionamento e a decisão responsiva (menu/dialog). Não instancia filhos automaticamente — o conteúdo é sempre via slot.

### Componentes DSS Recomendados

**Modo menu (desktop):**
- `DssList` + `DssItem` (padrão básico — lista de ações)
- `DssSeparator` (divisão entre grupos)
- `DssItem` + `DssItemSection` (com ícones)

**Modo dialog (mobile):**
- `DssCard` (container visual com padding)
- `DssButton` (ações de confirmação/cancelamento)

### Padrões de Layout

```vue
<!-- Padrão básico: menu de ações -->
<DssButton label="Ações">
  <DssPopupProxy v-model:open="show">
    <DssList>
      <DssItem label="Editar" clickable v-close-popup />
      <DssItem label="Excluir" clickable v-close-popup />
    </DssList>
  </DssPopupProxy>
</DssButton>

<!-- Padrão confirmação: persistent -->
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

### Limites de Responsabilidade
- DssPopupProxy **NÃO define** brand/cor dos itens → responsabilidade dos filhos
- DssPopupProxy **NÃO estiliza** filhos via CSS próprio
- Conteúdo em modo menu deve ser encapsulado em `DssList`
- Conteúdo em modo dialog pode ser qualquer conteúdo Vue válido

### Anti-Patterns de Composição

| Anti-Pattern | Correto |
|-------------|---------|
| `<DssPopupProxy>texto solto</DssPopupProxy>` | `<DssPopupProxy><DssList>...</DssList></DssPopupProxy>` |
| Usar `<ul><li>` dentro do slot | Usar `DssList` + `DssItem` |
| Sobrescrever z-index do QPopupProxy/QMenu | Nunca alterar z-index de overlays DSS |
| Usar prop `dark` (bloqueada) | Usar `[data-theme="dark"]` globalmente |
| Usar prop `square` (bloqueada) | Não disponível — violaria `--dss-radius-md` |

---

## 10. Exceções Registradas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `!important` em `background-color` e `box-shadow` | `2-composition/_base.scss` | QMenu aplica via `.q-menu` com especificidade equivalente. Precedente: DssMenu. |
| EXC-Gate-01 | Seletores descendentes `.q-dialog.dss-popup-proxy .q-dialog__inner` | `2-composition/_base.scss`, `4-output/_states.scss` | QDialog não expõe hook CSS direto no painel interno. Precedente: DssDialog. |
| EXC-02 | `Canvas`, `CanvasText`, `ButtonText` em forced-colors | `4-output/_states.scss` | Tokens CSS ignorados em Windows HCM. Padrão canônico DSS. |
| EXC-Expose-01 | `show`, `hide`, `toggle`, `currentComponent` via defineExpose | `1-structure/DssPopupProxy.ts.vue` | API imperativa necessária para controle programático. Padrão: DssScrollArea, DssAjaxBar. |

---

## 11. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-22 | DSS | Criação inicial — Fase 2 Nível 2 |
