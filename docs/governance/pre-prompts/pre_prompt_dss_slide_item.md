# Pré-prompt: DssSlideItem

> **Corrigido retroativamente em 2026-05-20** — versão original descrevia erroneamente um item de carrossel. DssSlideItem é um wrapper do `QSlideItem`: item de lista com ações deslizáveis reveladas por swipe (ex: deletar, arquivar). Ver GAP-03 no `dss.meta.json`.

---

## 1. CLASSIFICAÇÃO E CONTEXTO

**Fase:** 2 — Nível 1 — Independente (Família: Interação Gestual)

**Golden Reference:** DssBadge (componente interativo de feedback — não tem hover próprio no container)

**Golden Context:** DssPullToRefresh — mesma família (Interação Gestual), mesmo padrão de motor Quasar gestual com EXC-Gate-01/02, defineExpose de método imperativo, prefers-reduced-motion via CSS, WARN-A11Y sobre ausência de suporte a teclado.

**O que é:** `DssSlideItem` é um wrapper DSS governado sobre o `QSlideItem` do Quasar. É um item de lista que revela ações ao ser deslizado horizontalmente — ao deslizar para a direita revela a ação esquerda (ex: deletar); ao deslizar para a esquerda revela a ação direita (ex: arquivar). Amplamente usado em interfaces mobile-first.

**Justificativa:** O QSlideItem não expõe hooks CSS para governar as cores das áreas de ação. O DssSlideItem encapsula o motor, traduz cores semânticas DSS (error, success, warning, info) para as cores Quasar correspondentes, e substitui os valores hardcoded pelo sistema de tokens de feedback.

---

## 2. RISCOS ARQUITETURAIS E GATES

**Calcanhar de Aquiles:** as áreas de ação do QSlideItem recebem cor via prop `left-color`/`right-color`, que aplica classes `bg-{color}` do Quasar. O DSS não pode usar `color` diretamente (violaria Token First). Solução canônica: injetar CSS variables por instância via `:style` binding e sobrescrever `background-color` com `!important` nos descendant selectors.

**Riscos Arquiteturais:**
- **Cores hardcoded nas áreas de ação:** O QSlideItem usa classes `bg-negative`, `bg-positive`, etc. Sem override CSS, as cores Quasar aparecem em vez dos tokens DSS. Solução: EXC-Gate-02-a (`background-color !important`) + EXC-Gate-02-b (CSS variables injetadas inline).
- **Ausência de acessibilidade por teclado:** O gesto de swipe não é acessível via teclado ou tecnologias assistivas. Toda interface DEVE fornecer alternativa. Registrar como WARN-A11Y-01.
- **Gate de Responsabilidade no disabled:** não aplicar `pointer-events: none` no conteúdo quando disabled (o QSlideItem gerencia o gesto internamente). Precedente: DssPullToRefresh NC-02.
- **Tipo não público de reset():** `QSlideItem.reset()` não é tipado publicamente — usar `as any` com comentário explicativo.

**Gates DSS:**
- **EXC-Gate-01:** QSlideItem como root (obrigatório para o comportamento de swipe)
- **EXC-Gate-02-a:** `background-color !important` nos descendant selectors `.q-slide-item__left` e `.q-slide-item__right`
- **EXC-Gate-02-b:** CSS variables `--dss-slide-item-left-bg` e `--dss-slide-item-right-bg` injetadas via `:style` no QSlideItem
- **EXC-States-01:** `animation-duration: 0.01ms !important` para prefers-reduced-motion (padrão DssPullToRefresh)
- **EXC-Expose-01:** `defineExpose({ reset })` — API imperativa necessária (padrão DssInfiniteScroll, DssScrollArea, DssPullToRefresh)

---

## 3. MAPEAMENTO DE API (QUASAR → DSS)

**Motor:** `QSlideItem`

**Props expostas pelo DSS:**

| Prop DSS | Tipo | Padrão | Prop QSlideItem | Justificativa |
|----------|------|--------|-----------------|---------------|
| `disable` | `Boolean` | `false` | `:disable` | Passthrough direto |
| `leftColor` | `'error'\|'success'\|'warning'\|'info'` | `undefined` (fallback 'error' quando slot left presente) | `:left-color` (mapeado internamente) | Governança semântica DSS sobre cor Quasar |
| `rightColor` | `'error'\|'success'\|'warning'\|'info'` | `undefined` (fallback 'info' quando slot right presente) | `:right-color` (mapeado internamente) | Governança semântica DSS sobre cor Quasar |

**Props BLOQUEADAS (não expostas):**
- `left-color`, `right-color`, `top-color`, `bottom-color` — substituídas por `leftColor`/`rightColor` com valores semânticos DSS
- `dark` — governado por cascata de tokens (dark mode global)

**Slots:**

| Slot DSS | Scope | Slot QSlideItem | Descrição |
|----------|-------|-----------------|-----------|
| `default` | — | `default` | Conteúdo principal (sempre visível) |
| `left` | `{ reset: () => void }` | `#left` | Ações reveladas ao deslizar direita |
| `right` | `{ reset: () => void }` | `#right` | Ações reveladas ao deslizar esquerda |

**Slots fora do escopo v1.0:** `top`, `bottom` (QSlideItem suporta, DSS não expõe para manter API simples)

**Eventos:**

| Evento DSS | Payload | Evento QSlideItem |
|-----------|---------|-------------------|
| `action` | `{ side: 'left'\|'right'\|'top'\|'bottom', reset: () => void }` | `@action` (passthrough) |
| `slide` | `{ side, ratio: number, isReset: boolean }` | `@slide` (passthrough) |

**Método exposto:**
- `reset()` — via `defineExpose`. Reseta o item para a posição original programaticamente.

---

## 4. GOVERNANÇA DE TOKENS E ESTILIZAÇÃO

**Token First obrigatório.** Nenhum px, hex, rgb ou valor numérico de cor hardcoded.

**Tokens utilizados:**

| Token DSS | Uso |
|-----------|-----|
| `--dss-feedback-error` | Background da área de ação esquerda (default) |
| `--dss-feedback-success` | Background quando leftColor/rightColor='success' |
| `--dss-feedback-warning` | Background quando leftColor/rightColor='warning' |
| `--dss-feedback-info` | Background da área de ação direita (default) |
| `--dss-text-inverse` | Cor do texto e ícones nas áreas de ação |
| `--dss-padding-4` | Padding horizontal das áreas (16px) |
| `--dss-gap-2` | Gap entre ícone e texto nas áreas (8px) |
| `--dss-border-width-thin` | Borda em prefers-contrast: more |

**Tokens NÃO usados nas áreas de ação (decisão intencional):**
- Tokens de brand (`--dss-hub-*`, `--dss-water-*`, `--dss-waste-*`) — a semântica de feedback (deletar=error) tem precedência sobre identidade de marca. `_brands.scss` existe mas está vazio intencionalmente.

**Implementação CSS:**
```scss
// EXC-Gate-02-a: !important necessário para sobrescrever bg-{color} do Quasar
.dss-slide-item .q-slide-item__left {
  background-color: var(--dss-slide-item-left-bg, var(--dss-feedback-error)) !important;
  color: var(--dss-text-inverse);
  padding: 0 var(--dss-padding-4);
  gap: var(--dss-gap-2);
}
```

---

## 5. ACESSIBILIDADE E ESTADOS

**WARN-A11Y-01 (CRÍTICO):** O gesto de swipe não é acessível via teclado. Toda interface com DssSlideItem DEVE fornecer alternativa acessível (ex: `DssButton` com `aria-label` para cada ação). Documentar no DSSSLIDEITEM_API.md e README.

**Decisão de touch target:** Delegada ao consumer. O conteúdo dos slots `left`/`right` deve respeitar touch target ≥ 48px (WCAG 2.5.5) via `DssButton` ou padding adequado.

**Role ARIA:** O `DssSlideItem` não adiciona ARIA próprio. O consumer deve garantir que o item esteja dentro de `q-list` (role='list' implícito do QSlideItem). O conteúdo dos slots de ação deve ter texto descritivo visível ou `aria-label`.

**Estados aplicáveis:**
- `idle`, `sliding`, `action-revealed`, `action-triggered`, `disabled`

**Estados N/A (justificados):**
- `hover` — gesto gestual; container sem estado hover próprio
- `focus` — foco gerenciado pelos elementos internos (slot default)
- `loading` — sem indicador interno; consumer gerencia estado de processamento
- `active` — `sliding`/`action-triggered` são os equivalentes

**Feedback visual de disabled:** O QSlideItem bloqueia o gesto internamente (sem override CSS no container). O consumer é responsável por aplicar visual de disabled no conteúdo do `slot default` (ex: `<DssItem disable />`).

**Estados CSS obrigatórios na Layer 4:**
- `prefers-reduced-motion: reduce` → `animation-duration: 0.01ms !important` nas áreas de ação e conteúdo
- `prefers-contrast: more` → `border: var(--dss-border-width-thin) solid currentColor` nas áreas
- `forced-colors: active` → SystemColor keywords (`Highlight`, `HighlightText`, `ButtonText`) com `forced-color-adjust: none`
- `@media print` → `display: none !important` nas áreas de ação
