# DssPopupProxy — Documentação Normativa DSS v2.2

**Versão:** 1.0.0 | **Fase:** 2 | **Status:** Pronto para auditoria

---

## 1. Classificação

| Atributo | Valor |
|----------|-------|
| **Componente** | DssPopupProxy |
| **Categoria** | Overlay Responsivo — Proxy de Popup |
| **Fase** | 2 — Componentes Compostos / Alta Complexidade |
| **Golden Reference** | DssChip |
| **Golden Context** | DssMenu |
| **Motor Quasar** | QPopupProxy (EXC-Gate-01) |
| **Nível de Composição** | Nível 2 — Composed |

---

## 2. Escopo Funcional

### O que FAZ
- Atua como proxy de popup responsivo: renderiza `QMenu` em viewports ≥ `breakpoint` e `QDialog` em viewports < `breakpoint`.
- Encapsula a lógica de decisão responsiva do Quasar com governança DSS.
- Aplica tokens de superfície, elevação e tipografia ao painel popup criado internamente.
- Suporta v-model para controle programático da visibilidade.
- Expõe métodos imperativos (`show`, `hide`, `toggle`, `currentComponent`).
- Repassa `$attrs` ao motor interno para extensibilidade via forwarding.

### O que NÃO faz
- NÃO cria um elemento DOM próprio (EXC-Gate-01 — QPopupProxy é o root).
- NÃO estiliza o conteúdo interno do slot (responsabilidade dos DSS components usados).
- NÃO gerencia foco manualmente (delegado ao QMenu/QDialog nativamente).
- NÃO aplica brand/cor ao painel (brand é responsabilidade dos filhos via slot).
- NÃO inclui lógica de formulário, validação ou dados.
- NÃO é um substituto de `DssMenu` (para popups não-responsivos, usar `DssMenu` diretamente).
- NÃO é um substituto de `DssDialog` (para dialogs sempre fullscreen, usar `DssDialog`).

---

## 3. Comportamento responsivo

O comportamento central do DssPopupProxy é a alternância automática entre dois modos:

| Condição | Modo | Motor | Comportamento |
|----------|------|-------|---------------|
| `viewport.width ≥ breakpoint` | Menu | QMenu | Dropdown ancorado ao `target`, posicionado via `anchor`/`self`/`offset` |
| `viewport.width < breakpoint` | Dialog | QDialog | Fullscreen ou bottom-sheet mobile (sem âncora) |

**Timing da troca:** O tipo é determinado no momento de abertura. Se o viewport muda enquanto o popup está aberto, o tipo não muda — aguarda o fechamento para recalcular.

**Valor padrão de `breakpoint`:** 450px (alinhado ao padrão Quasar).

---

## 4. Arquitetura

### 4.1 Estrutura de Arquivos

```
components/composed/DssPopupProxy/
├── 1-structure/
│   └── DssPopupProxy.ts.vue          ← Layer 1: Implementação canônica
├── 2-composition/
│   └── _base.scss                    ← Layer 2: Estilos base (menu e dialog mode)
├── 3-variants/
│   ├── _variant.scss                 ← Layer 3: Vazio (sem variantes CSS)
│   └── index.scss                    ← Orchestrador L3
├── 4-output/
│   ├── _states.scss                  ← Layer 4: Dark, contrast, forced-colors, print
│   ├── _brands.scss                  ← Layer 4: Brand (delegado aos filhos)
│   └── index.scss                    ← Orchestrador L4
├── composables/
│   └── usePopupProxyClasses.ts       ← Retorna classe base dss-popup-proxy
├── types/
│   └── popupproxy.types.ts           ← TypeScript interfaces (Props, Emits, Slots)
├── DssPopupProxy.md                  ← Esta documentação
├── DssPopupProxy.module.scss         ← Orchestrador principal SCSS
├── DssPopupProxy.example.vue         ← 4 exemplos interativos
├── DssPopupProxy.vue                 ← Entry Point Wrapper (re-export puro)
├── DssPopupProxy.test.js             ← Testes unitários
├── DSSPOPUPPROXY_API.md              ← Referência técnica de API
├── dss.meta.json                     ← Metadados DSS
├── README.md                         ← Quick start
└── index.js                          ← Barrel export
```

### 4.2 Fluxo de Renderização

```
DssPopupProxy (wrapper DSS)
  ↓ v-bind="$attrs" + props explícitas + class="dss-popup-proxy"
QPopupProxy (motor Quasar — EXC-Gate-01)
  ↓ decision: viewport < breakpoint ?
  ├── QMenu (modo desktop) — teleporta para <body>
  │   DOM: <div class="q-menu dss-popup-proxy ...">
  │   CSS: .dss-popup-proxy.q-menu { background, elevation, radius }
  └── QDialog (modo mobile) — teleporta para <body>
      DOM: <div class="q-dialog dss-popup-proxy ...">
           └── <div class="q-dialog__inner ...">
      CSS: .dss-popup-proxy.q-dialog .q-dialog__inner { background, radius }
```

### 4.3 CSS — Compound Selectors (EXC-Gate-02)

Dado que QPopupProxy não renderiza um elemento DOM próprio, o CSS usa compound selectors para atingir o elemento renderizado pelo motor interno:

```scss
// Modo menu (viewport >= breakpoint)
.dss-popup-proxy.q-menu {
  background-color: var(--dss-surface-default) !important; // EXC-01
  box-shadow: var(--dss-elevation-3) !important;            // EXC-01
  border-radius: var(--dss-radius-md);
  overflow: hidden;
  font-family: var(--dss-font-family-sans);
  color: var(--dss-text-body);
}

// Modo dialog (viewport < breakpoint)
.dss-popup-proxy.q-dialog .q-dialog__inner {
  background-color: var(--dss-surface-default);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
  font-family: var(--dss-font-family-sans);
  color: var(--dss-text-body);
}
```

---

## 5. Props

Veja a tabela completa em [DSSPOPUPPROXY_API.md](./DSSPOPUPPROXY_API.md#props).

### Props bloqueadas

| Prop | Razão |
|------|-------|
| `dark` | Modo escuro via `[data-theme="dark"]` globalmente |
| `square` | Viola `--dss-radius-md` |

---

## 6. Emits

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `Boolean` | v-model de visibilidade |
| `show` | `Event` | Popup completamente visível |
| `hide` | `Event` | Popup completamente oculto |
| `beforeShow` | `Event` | Antes da abertura |
| `beforeHide` | `Event` | Antes do fechamento |

---

## 7. Slots

| Slot | Uso recomendado |
|------|-----------------|
| `default` | `DssList` (menus), `DssCard` (confirmações/info), DSS components |

---

## 8. Acessibilidade

### Roles ARIA
- **Modo menu:** `role="menu"` herdado nativamente do QMenu
- **Modo dialog:** `role="dialog"` + `aria-modal="true"` herdados do QDialog

### Gerenciamento de foco
- **Abertura:** Foco movido automaticamente para o popup (controlável via `noFocus`)
- **Fechamento:** Foco retorna ao elemento acionador (controlável via `noRefocus`)
- **Teclado:** `Tab` navega internamente; `Esc` fecha (exceto com `persistent`)

### Touch target
- **Não aplicável ao container.** Touch targets são responsabilidade dos filhos (DssItem, DssButton) via slot.

### `aria-label`
- Recomendado via `$attrs`: `<DssPopupProxy aria-label="Menu de opções">` — forwarded ao motor interno.

---

## 9. Estados

### Estados aplicáveis

| Estado | Implementação | CSS |
|--------|--------------|-----|
| `visible` | Controlado pelo v-model / QPopupProxy | Gerenciado pelo Quasar |
| `hidden` | Controlado pelo v-model / QPopupProxy | Gerenciado pelo Quasar |

### Estados explicitamente não aplicáveis

| Estado | Justificativa |
|--------|---------------|
| `hover` | Container overlay proxy não-interativo |
| `active` | Container overlay proxy não-interativo |
| `focus` | Gerenciado pelo QMenu/QDialog nativamente |
| `disabled` | Não aplicável a proxy overlay |
| `loading` | Não aplicável — Fase 2 síncrona |
| `error` | Não aplicável a overlays |
| `checked` / `indeterminate` | Não aplicável |

---

## 10. Tokens utilizados

| Token | Uso | Local |
|-------|-----|-------|
| `--dss-surface-default` | Background do painel | `2-composition/_base.scss` |
| `--dss-elevation-3` | Sombra do painel (menu mode) | `2-composition/_base.scss` |
| `--dss-radius-md` | Border-radius do painel | `2-composition/_base.scss` |
| `--dss-font-family-sans` | Tipografia | `2-composition/_base.scss` |
| `--dss-text-body` | Cor de texto | `2-composition/_base.scss` |
| `--dss-border-width-thin` | Borda dark mode | `4-output/_states.scss` |
| `--dss-border-width-md` | Borda high contrast | `4-output/_states.scss` |
| `--dss-gray-200` | Cor da borda dark mode | `4-output/_states.scss` |

---

## 11. Comportamentos implícitos (DSS v2.4 obrigatório)

### `inheritAttrs: false`
`$attrs` é repassado explicitamente ao QPopupProxy via `v-bind="$attrs"`. Props declaradas no `defineProps` são removidas de `$attrs` e vinculadas manualmente.

### Teleport para body
QPopupProxy (via QMenu ou QDialog) teleporta o conteúdo para `<body>`. Estilos carregados globalmente via `components/index.scss`. `<style scoped>` seria ineficaz.

### Classe `dss-popup-proxy` forwarded
A classe é aplicada via `:class` no QPopupProxy. QPopupProxy a inclui nos `attrs` que repassa ao QMenu/QDialog interno. A classe aparece no DOM no elemento renderizado pelo motor (`.q-menu` ou `.q-dialog`).

### Props que NÃO pertencem ao QPopupProxy
As props `anchor`, `self`, `offset`, `persistent`, `noFocus`, `noRefocus`, `autoClose`, `transitionShow`, `transitionHide`, `maxHeight`, `maxWidth`, `scrollTarget`, `fit`, `cover` são declaradas no DssPopupProxy e passadas ao QPopupProxy. Como não são props próprias do QPopupProxy, elas ficam em seus attrs e são forwarded ao QMenu ou QDialog interno.

### `breakpoint` padrão = 450
Alinhado ao padrão do Quasar. Abaixo de 450px de largura ou altura (o menor), o popup abre como QDialog.

---

## 12. Exceções aos Gates v2.4

| ID | Descrição | Valor/Local | Justificativa | Decisão Arquitetural |
|----|-----------|-------------|---------------|----------------------|
| `EXC-Gate-01` | QPopupProxy como root — sem wrapper DOM próprio | `1-structure/DssPopupProxy.ts.vue` | Motor irrenunciável para switching responsivo entre QMenu e QDialog. Inserir um wrapper DSS externo quebraria a funcionalidade de alternância responsiva. | Aprovado — Auditoria DSS v2.5 — 2026-05-21 |
| `EXC-Gate-02` | Compound selectors `.dss-popup-proxy.q-menu` / `.dss-popup-proxy.q-dialog .q-dialog__inner` | `2-composition/_base.scss` | Elementos DOM renderizados são QMenu/QDialog nativos — CSS não pode usar apenas `.dss-popup-proxy`. Depende da estrutura interna do QDialog (`.q-dialog__inner`) — monitorar em upgrades do Quasar. | Aprovado — Auditoria DSS v2.5 — 2026-05-21 |
| `EXC-01` | `!important` em `background-color` e `box-shadow` (modo menu) | `2-composition/_base.scss` | QMenu aplica background/shadow com especificidade equivalente; `!important` necessário para que tokens DSS prevaleçam. Precedente: DssMenu (EXC-01). | Aprovado — Auditoria DSS v2.5 — 2026-05-21 |
| `EXC-02` | System color keywords em forced-colors | `4-output/_states.scss` | `Canvas`, `CanvasText`, `ButtonText` — tokens CSS são ignorados pelo navegador em forced-colors mode. Padrão canônico DSS. Precedente: DssMenu, DssCard. | Aprovado — Auditoria DSS v2.5 — 2026-05-21 |
| `EXC-03` | `display: none !important` em `@media print` | `4-output/_states.scss` | Overlays de interface interativa sem utilidade em impressão. Precedente: DssMenu, DssTooltip. | Aprovado — Auditoria DSS v2.5 — 2026-05-21 |

---

## 13. Paridade com Golden Reference (DssChip)

| Padrão DssChip | DssPopupProxy | Justificativa da Divergência |
|----------------|---------------|------------------------------|
| `defineOptions({ name, inheritAttrs })` | ✅ Igual | — |
| `inheritAttrs: false` + `v-bind="$attrs"` | ✅ Igual | — |
| `-webkit-tap-highlight-color: transparent` | ❌ N/A | Container overlay sem touch direto |
| `::before` touch target (WCAG 2.5.5) | ❌ N/A | Touch target é dos filhos (DssItem) |
| `aria-hidden` em elementos decorativos | ❌ N/A | Sem elementos decorativos próprios |
| `focus-visible` ring | ❌ N/A | Foco gerenciado pelo QMenu/QDialog nativamente |
| `dense` prop e variante | ❌ N/A | Container overlay proxy sem variante de densidade |
| `disabled` state | ❌ N/A | Não aplicável a proxy de popup |

**Conclusão:** Todas as divergências são intencionais e justificadas pela natureza de container proxy do DssPopupProxy.

---

## 14. Paridade com Golden Context (DssMenu)

| Padrão DssMenu | DssPopupProxy | Observação |
|----------------|---------------|------------|
| QMenu como root | QPopupProxy como root | Extensão: QPopupProxy engloba QMenu/QDialog |
| Classe `dss-menu` no root | Classe `dss-popup-proxy` via forwarding | Mesmo princípio, aplicação diferente |
| CSS global via `components/index.scss` | CSS global via `components/index.scss` | ✅ Igual |
| `!important` em background e shadow | ✅ Igual para menu mode | — |
| Dark mode: borda sutil | ✅ Igual para ambos os modos | — |
| Forced colors: system keywords | ✅ Igual | — |
| Print: display none | ✅ Igual | — |
| Brand delegado aos filhos | ✅ Igual | — |

---

## 15. Matriz de composição DSS

### Papel estrutural
DssPopupProxy é um **proxy responsivo de overlay** que decide qual motor de popup usar baseado no viewport. Não é um container visual — é uma camada de decisão.

### Componentes recomendados no slot

| Componente | Contexto de uso |
|------------|-----------------|
| `DssList` + `DssItem` | Menus de ações (modo desktop — QMenu) |
| `DssCard` | Confirmações, informações, formulários (ambos os modos) |
| `DssButton` | Ações dentro de DssCard |
| `DssSeparator` | Divisão de grupos em DssList |
| `DssIcon` | Ícones nos DssItemSection |

### Anti-patterns de composição

```vue
<!-- ❌ HTML nativo sem DSS components -->
<DssPopupProxy>
  <ul>
    <li @click="action1">Ação 1</li>
  </ul>
</DssPopupProxy>

<!-- ❌ QMenu/QList bruto dentro do proxy -->
<DssPopupProxy>
  <q-list>
    <q-item>Item</q-item>
  </q-list>
</DssPopupProxy>

<!-- ❌ DssPopupProxy aninhado sem necessidade -->
<DssPopupProxy>
  <DssPopupProxy> <!-- aninhamento desnecessário -->
    ...
  </DssPopupProxy>
</DssPopupProxy>

<!-- ✅ Composição correta -->
<DssPopupProxy v-model="open" :target="btnRef">
  <DssList>
    <DssItem clickable v-close-popup>
      <DssItemSection avatar>
        <DssIcon name="edit" />
      </DssItemSection>
      <DssItemSection>Editar</DssItemSection>
    </DssItem>
  </DssList>
</DssPopupProxy>
```

---

## 16. Reconciliação transversal

### SCSS ↔ Tokens documentados
✅ Todos os tokens no SCSS estão declarados em `tokensUsed` do `dss.meta.json`.

### SCSS ↔ Documentação
✅ Todos os seletores CSS documentados nas seções de arquitetura e exceções.

### Código ↔ Documentação
✅ Todos os props, emits e slots documentados no README.md e DSSPOPUPPROXY_API.md.

### Golden Context (DssMenu) ↔ Componente
✅ Mesmos tokens de superfície/elevação/radius. ✅ Mesmo padrão de CSS global. ✅ Mesmos estados de dark/forced-colors/print.

### Golden Reference (DssChip) ↔ Componente
✅ Divergências documentadas na seção 13. Todas intencionais pela natureza de overlay proxy.

---

**Componente PRONTO PARA AUDITORIA DSS v2.2**

> 🚫 Selo NÃO emitido neste estágio. Emissão via processo de auditoria oficial.
