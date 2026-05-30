# DssSlideItem — Documentação (Template 13.1)

## 1. Visão Geral

**O que é:** `DssSlideItem` é um item de lista com ações deslizáveis reveladas por gesto de swipe (deslizamento horizontal). Ao deslizar para a direita, revela ações do lado esquerdo; ao deslizar para a esquerda, revela ações do lado direito.

**Quando usar:**
- Listas em que cada item possui ações rápidas (deletar, arquivar, marcar como lido)
- Interfaces mobile-first onde gestos de swipe são naturais
- Substituição de menus de contexto longos por ações diretas

**Quando NÃO usar:**
- Em interfaces sem suporte a toque (desktops sem touchscreen) sem alternativa acessível
- Quando as ações são complexas e requerem confirmação (prefira Dialog)
- Em listas com mais de 2 ações por item (usar menus contextuais)
- Como substituto de checkbox ou toggle (usar DssCheckbox, DssToggle)

---

## 2. Classificação DSS

- **Tipo:** Interativo — Wrapper de Interação Gestual
- **Categoria:** Interação Gestual
- **Família:** Interação Gestual (DssPullToRefresh, DssSlideItem)
- **Fase:** 2 — Nível 1 — Independente
- **Motor:** QSlideItem (EXC-Gate-01)
- **Interativo:** Sim (gesto de swipe)

---

## 3. API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `disable` | `Boolean` | `false` | Desabilita o gesto de swipe |
| `leftColor` | `'error' \| 'success' \| 'warning' \| 'info'` | `undefined` (comporta-se como `'error'` quando slot `left` está presente) | Cor semântica da área esquerda (revelada ao deslizar →) |
| `rightColor` | `'error' \| 'success' \| 'warning' \| 'info'` | `undefined` (comporta-se como `'info'` quando slot `right` está presente) | Cor semântica da área direita (revelada ao deslizar ←) |

**Nota:** Props `left-color` e `right-color` do QSlideItem não são expostas — a governança de cores é feita via tokens DSS.

### Slots

| Slot | Escopo | Descrição |
|------|--------|-----------|
| `default` | — | Conteúdo principal do item (sempre visível) |
| `left` | `{ reset: () => void }` | Ações reveladas ao deslizar para a direita |
| `right` | `{ reset: () => void }` | Ações reveladas ao deslizar para a esquerda |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `action` | `{ side: 'left'\|'right', reset: () => void }` | Emitido quando o usuário completa o swipe e ativa a ação |
| `slide` | `{ side: 'left'\|'right', ratio: number, isReset: boolean }` | Emitido durante o deslizamento (ratio: 0–1) |

### Métodos expostos (defineExpose)

| Método | Descrição |
|--------|-----------|
| `reset()` | Reseta o item para a posição original programaticamente |

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| idle | ✅ | Estado padrão sem swipe |
| sliding | ✅ | Durante o gesto (via evento `slide`) |
| action-revealed | ✅ | Ação completamente revelada |
| action-triggered | ✅ | Ação ativada (via evento `action`) |
| disabled | ✅ | Swipe bloqueado, conteúdo com opacity reduzida |
| hover | N/A | Gesto gestual — sem estado hover CSS próprio |
| focus | N/A | O foco é nos elementos internos (slot default), não no container |
| loading | N/A | Sem indicador de carregamento interno |

---

## 5. Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-feedback-error` | Cor padrão da área de ação esquerda (leftColor default) |
| `--dss-feedback-success` | Cor da área quando leftColor/rightColor='success' |
| `--dss-feedback-warning` | Cor da área quando leftColor/rightColor='warning' |
| `--dss-feedback-info` | Cor padrão da área de ação direita (rightColor default) |
| `--dss-text-inverse` | Cor do texto e ícones nas áreas de ação |
| `--dss-padding-4` | Padding horizontal das áreas de ação (16px) |
| `--dss-gap-2` | Gap entre ícone e texto nas áreas de ação (8px) |
| `--dss-border-width-thin` | Borda no modo prefers-contrast: more |

---

## 6. Acessibilidade

- **WCAG 2.1 AA:** O gesto de swipe não é acessível via teclado. Toda interface com `DssSlideItem` **DEVE** fornecer alternativas acessíveis (botões, menus contextuais) para cada ação.
- **Touch target:** O conteúdo do slot `left` e `right` deve ter touch target mínimo de 48px (WCAG 2.5.5). Use `DssButton` ou adicione padding adequado.
- **ARIA:** O `DssSlideItem` deve ser filho de `<q-list>` com `role="list"` implícito. As ações reveladas devem ter texto descritivo visível ou `aria-label`.
- **Navegação por teclado:** Não disponível no motor QSlideItem. Alternativa obrigatória no consumer.
- **Leitores de tela:** O conteúdo das áreas de ação (slots `left`/`right`) é lido quando revelado.

**⚠️ WARN-A11Y-01:** O gesto de swipe não é acessível via teclado. Toda interface com DssSlideItem DEVE fornecer um mecanismo alternativo (ex: botão de ação, menu contextual) para usuários sem acesso a touch.

**⚠️ Feedback visual de disabled:** Quando `disable=true`, o QSlideItem bloqueia o gesto internamente sem alterar o visual do container. O `DssSlideItem` não aplica estilo de disabled ao conteúdo (Gate de Responsabilidade). O consumer é responsável por aplicar o feedback visual de disabled nos elementos do slot `default` (ex: `<DssItem disable />`).

---

## 7. Comportamentos Implícitos

### Forwarding de atributos
`inheritAttrs: false` + `v-bind="$attrs"` garante que atributos como `data-testid`, `aria-label` e classes extras passem ao `QSlideItem` root.

### Slots condicionais
Os slots `#left` e `#right` são condicionalmente renderizados via `v-if="$slots.left"` e `v-if="$slots.right"`. Sem conteúdo no slot, a área correspondente não é renderizada.

### Cor padrão das áreas
Quando o consumer fornece slot `left` mas não define `leftColor`, a área usa `error` como padrão (semântica de ação destrutiva). Para slot `right` sem `rightColor`, usa `info` (ação neutra).

### reset() no slot scope
O escopo dos slots `left` e `right` expõe `{ reset }`, que permite ao consumer resetar o item imediatamente após processar a ação (ex: após confirmar um dialog).

---

## 8. Paridade com Golden Component (DssBadge)

| Aspecto | DssBadge | DssSlideItem | Justificativa |
|---------|----------|-------------|---------------|
| defineOptions({ name, inheritAttrs }) | ✅ | ✅ | Aplicado |
| inheritAttrs: false + v-bind="$attrs" | ✅ | ✅ | Aplicado |
| -webkit-tap-highlight-color | N/A (não interativo) | ✅ | Componente gestual |
| aria-hidden em decorativos | ✅ | ✅ | Ícones nos slots devem ter aria-hidden no consumer |
| Token First (sem px/hex/rgb) | ✅ | ✅ | Aplicado |
| 4 camadas SCSS | ✅ | ✅ | Aplicado |

---

## 9. Exceções Registradas

| ID | Tipo | Descrição | Justificativa |
|----|------|-----------|---------------|
| EXC-Gate-01 | Gate Exception | QSlideItem como elemento root | Motor necessário para o comportamento de swipe |
| EXC-Gate-02-a | Gate Exception | `background-color !important` nas áreas de ação | O QSlideItem aplica `bg-{color}` (classe Quasar) nas áreas; sem `!important` a especificidade é insuficiente |
| EXC-Gate-02-b | Gate Exception | CSS variables `--dss-slide-item-left-bg` e `--dss-slide-item-right-bg` injetadas via inline style | Única forma de governar a cor por instância sem criar tokens específicos de componente |
| EXC-States-01 | States Exception | `animation-duration: 0.01ms !important` para reduced-motion | Animação de swipe CSS-based (padrão DssPullToRefresh) |
| EXC-Expose-01 | Expose Exception | defineExpose do método `reset()` | API imperativa necessária para resetar item programaticamente (ex: após confirmação de dialog) |

---

## 10. Matriz de Composição DSS

### Papel estrutural
`DssSlideItem` é um container de interação gestual. Não instancia outros componentes DSS automaticamente — fornece slots para o consumer compor.

### Componentes DSS recomendados para uso interno

| Componente | Papel | Status |
|-----------|-------|--------|
| `DssButton` (icon) | Botão dentro das áreas de ação | ✅ Existente |
| `DssIcon` | Ícone nas áreas de ação | ✅ Existente |
| `DssItem` | Conteúdo principal (slot default) | ✅ Existente |
| `DssItemSection` | Seções do item principal | ✅ Existente |
| `DssItemLabel` | Labels do item principal | ✅ Existente |

### Anti-patterns de composição
- ❌ Usar `DssSlideItem` sem fornecer alternativa acessível por teclado
- ❌ Adicionar mais de 2 ações por lado (prejudica UX de swipe)
- ❌ Usar ações que requerem confirmação sem interceptar via dialog
- ❌ Aninhar `DssSlideItem` dentro de outro `DssSlideItem`
- ❌ Usar como substituto de checkbox (estado binário)

---

## 11. Decisões Arquiteturais

### Por que não expor leftColor/rightColor como passthrough direto ao Quasar?
As props `left-color` e `right-color` do QSlideItem aceitam qualquer cor Quasar, mas o DSS governa cores via tokens. Expor strings Quasar quebraria o Token First. A solução: aceitar valores semânticos DSS ('error', 'success', etc.) e mapear internamente.

### Por que a cor das áreas não responde ao data-brand?
As cores de feedback (error, success, warning, info) comunicam a semântica da ação (destrutiva, positiva, etc.) e têm precedência sobre identidade de marca. Um item "deletar" deve sempre ser vermelho (error), independentemente do produto.

### Por que não usar slot top/bottom?
O pré-prompt original focou em left/right (os casos de uso mais comuns). Top/bottom estão disponíveis no QSlideItem mas não são expostos na v1.0 para manter a API simples. Podem ser adicionados em versão futura.

---

## 12. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-20 | DSS | Criação inicial — Fase 2, Família Interação Gestual |
