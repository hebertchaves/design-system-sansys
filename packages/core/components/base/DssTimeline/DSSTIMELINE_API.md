# DSSTIMELINE_API.md — DssTimeline API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `layout` | `'dense' \| 'comfortable' \| 'loose'` | `undefined` | Espaçamento entre itens da timeline. Mapeia para `QTimeline.layout`. |
| `side` | `'left' \| 'right'` | `undefined` | Lado padrão dos itens em relação à linha central. Mapeia para `QTimeline.side`. |
| `dark` | `Boolean` | `false` | Ativa modo escuro interno do QTimeline. Prefira cascade `[data-theme="dark"]`. |

**Props NÃO expostas (DSS governa via CSS):**
- `color` — governa via `--dss-timeline-line-color` e `--dss-timeline-dot-color`

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Slot principal — aceita `DssTimelineEntry` como filhos |

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| — | — | Nenhum evento emitido |

## CSS Classes

| Classe | Condição | Descrição |
|--------|----------|-----------|
| `.dss-timeline` | Sempre | Classe raiz |
| `.dss-timeline--dense` | `layout="dense"` | Layout compacto |
| `.dss-timeline--comfortable` | `layout="comfortable"` ou sem layout | Layout equilibrado (padrão) |
| `.dss-timeline--loose` | `layout="loose"` | Layout espaçoso |
| `.dss-timeline--side-left` | `side="left"` | Itens à esquerda |
| `.dss-timeline--side-right` | `side="right"` | Itens à direita |
| `.dss-timeline--brand-hub` | Standalone | Brand Hub sem data-brand no DOM |
| `.dss-timeline--brand-water` | Standalone | Brand Water sem data-brand no DOM |
| `.dss-timeline--brand-waste` | Standalone | Brand Waste sem data-brand no DOM |

## CSS Custom Properties

| Propriedade | Padrão | Uso |
|-------------|--------|-----|
| `--dss-timeline-line-color` | `var(--dss-gray-300)` | Cor da linha conectora |
| `--dss-timeline-dot-color` | `var(--dss-gray-400)` | Cor do marcador/ponto |

## Tokens Utilizados

| Token | Valor Resolvido | Uso |
|-------|-----------------|-----|
| `--dss-gray-300` | #d4d4d4 | Linha conectora — neutro |
| `--dss-gray-400` | #a3a3a3 | Marcador — neutro |
| `--dss-hub-600` | #ef7a11 | Linha e marcador — brand Hub |
| `--dss-water-500` | #0e88e4 | Linha e marcador — brand Water |
| `--dss-waste-600` | #0b8154 | Linha e marcador — brand Waste |
| `--dss-text-body` | var(--dss-dark) | Texto principal |
| `--dss-text-subtle` | var(--dss-dark-light) | Subtítulo/data |
| `--dss-text-inverse` | — | Texto sobre marcador |
| `--dss-font-family-sans` | — | Família tipográfica |
| `--dss-font-size-md` | 1rem | Fonte padrão |
| `--dss-font-size-sm` | 0.875rem | Fonte de subtítulo |
| `--dss-font-weight-normal` | 400 | Peso padrão |
| `--dss-font-weight-semibold` | 600 | Peso de título |
| `--dss-line-height-md` | — | Altura de linha |
| `--dss-spacing-1` | 4px | Margin bottom título |
| `--dss-spacing-2` | 8px | Margin bottom subtítulo |
| `--dss-spacing-3` | 12px | Padding bottom — dense |
| `--dss-spacing-6` | 24px | Padding bottom — comfortable |
| `--dss-spacing-8` | 32px | Padding bottom — loose |
| `--dss-border-width-thin` | 1px | Print fallback |
