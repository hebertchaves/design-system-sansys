# DSSSLIDEITEM_API.md — DssSlideItem API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disable` | `Boolean` | `false` | Desabilita o gesto de swipe. O conteúdo permanece visível com opacity reduzida. |
| `leftColor` | `'error' \| 'success' \| 'warning' \| 'info'` | `undefined` (fallback: `'error'` quando slot left presente) | Cor semântica DSS da área revelada ao deslizar para a direita (slot left). |
| `rightColor` | `'error' \| 'success' \| 'warning' \| 'info'` | `undefined` (fallback: `'info'` quando slot right presente) | Cor semântica DSS da área revelada ao deslizar para a esquerda (slot right). |

**Props NÃO expostas (bloqueadas):**
- `left-color` (QSlideItem) → substituída por `leftColor` com valores semânticos DSS
- `right-color` (QSlideItem) → substituída por `rightColor` com valores semânticos DSS
- `top-color` / `bottom-color` → fora do escopo v1.0

---

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `default` | — | Conteúdo principal do item. Sempre visível. Use `DssItem` + `DssItemSection` + `DssItemLabel`. |
| `left` | `{ reset: () => void }` | Ações reveladas ao deslizar para a direita. O consumer chama `reset()` após processar a ação. |
| `right` | `{ reset: () => void }` | Ações reveladas ao deslizar para a esquerda. O consumer chama `reset()` após processar a ação. |

---

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `action` | `{ side: 'left' \| 'right' \| 'top' \| 'bottom', reset: () => void }` | Emitido quando o usuário completa o swipe (arrasta até o fim). `reset()` retorna o item à posição original. |
| `slide` | `{ side: 'left' \| 'right' \| 'top' \| 'bottom', ratio: number, isReset: boolean }` | Emitido continuamente durante o deslizamento. `ratio` ∈ [0, 1]. |

---

## Exposed Methods

| Method | Description |
|--------|-------------|
| `reset()` | Reseta o item para a posição original (sem animação de ação). Útil para cancelar swipe programaticamente. |

---

## CSS Classes

| Class | Description |
|-------|-------------|
| `.dss-slide-item` | Classe raiz do componente |
| `.dss-slide-item--disabled` | Estado desabilitado |

---

## CSS Variables (injetadas pelo componente via inline style)

| Variable | Default | Description |
|----------|---------|-------------|
| `--dss-slide-item-left-bg` | `var(--dss-feedback-error)` | Cor de fundo da área de ação esquerda |
| `--dss-slide-item-right-bg` | `var(--dss-feedback-info)` | Cor de fundo da área de ação direita |

---

## Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| `--dss-feedback-error` | var(--dss-negative) | Fundo padrão da área esquerda; leftColor='error' |
| `--dss-feedback-success` | var(--dss-positive) | Fundo quando leftColor/rightColor='success' |
| `--dss-feedback-warning` | var(--dss-warning) | Fundo quando leftColor/rightColor='warning' |
| `--dss-feedback-info` | var(--dss-info) | Fundo padrão da área direita; rightColor='info' |
| `--dss-text-inverse` | — | Cor do texto/ícones nas áreas de ação |
| `--dss-padding-4` | 16px | Padding horizontal das áreas de ação |
| `--dss-gap-2` | 8px | Gap entre ícone e texto nas áreas |
| `--dss-border-width-thin` | 1px | Borda em modo prefers-contrast: more |
