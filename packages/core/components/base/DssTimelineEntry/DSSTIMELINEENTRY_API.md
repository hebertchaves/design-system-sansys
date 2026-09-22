# DSSTIMELINEENTRY_API.md — DssTimelineEntry API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `heading` | `Boolean` | `false` | Renderiza como separador visual de período (ex.: "2026") |
| `tag` | `String` | `'li'` | Tag HTML raiz. Raramente precisa ser alterada |
| `side` | `'left' \| 'right'` | `undefined` | Sobrescreve `side` do `DssTimeline` pai para esta entrada |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'accent' \| 'positive' \| 'negative' \| 'warning' \| 'info'` | `undefined` | Cor semântica do MARCADOR. Sem valor, usa o neutro do container (ou a marca herdada). A linha conectora permanece neutra — ver nota abaixo |
| `icon` | `String` | `undefined` | Nome do ícone Material Icons no marcador |
| `avatar` | `String` | `undefined` | URL de imagem de avatar — tem precedência sobre `icon` |
| `title` | `String` | `undefined` | Título textual do evento |
| `subtitle` | `String` | `undefined` | Subtítulo — geralmente data/hora |

**Props NÃO expostas (DSS governa via CSS):**
- `color` — governa via tokens herdados do `DssTimeline` pai

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Corpo do evento — texto, componentes DSS |
| `#title` | Customização do título — markup rico (badges, ícones) |
| `#subtitle` | Customização do subtítulo — `<time>`, formatações especiais |
| `#icon` | Customização do marcador — SVG ou componente customizado |

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| — | — | Nenhum evento emitido |

## CSS Classes

| Classe | Condição | Descrição |
|--------|----------|-----------|
| `.dss-timeline-entry` | Sempre | Classe raiz |
| `.dss-timeline-entry--heading` | `heading=true` | Modo separador de período |
| `.dss-timeline-entry--side-left` | `side="left"` | Override side esquerdo |
| `.dss-timeline-entry--side-right` | `side="right"` | Override side direito |
| `.dss-timeline-entry--color-*` | `color` definido | Troca `--dss-timeline-dot-color` e `--dss-timeline-dot-fg` no escopo da entrada |
| `.dss-timeline-entry--has-icon` | `icon` definido | Indicador de ícone presente |
| `.dss-timeline-entry--has-avatar` | `avatar` definido | Indicador de avatar presente |

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-font-size-lg` | Heading — tamanho do título de período |
| `--dss-font-weight-semibold` | Heading — peso do título de período |
| `--dss-text-subtle` | Heading — cor do título de período |
| `--dss-spacing-2` | Heading — padding vertical |

> **Cores e espaçamentos de conteúdo** são herdados do `DssTimeline` pai.


## Nota — por que `color` pinta só o marcador

O ponto identifica o EVENTO; a linha é o fio que liga os eventos. Colorir o
trecho de linha por entrada faria a cor mudar no meio do fio, sugerindo uma
transição de estado que não existe — por isso a linha segue em
`--dss-timeline-line-color` (neutro, ou a marca do contexto).

A prop `color` do `QTimelineEntry` **não** é repassada: ela adiciona
`.text-<nome>`, que é `color: var(--q-<nome>) !important` dentro de
`@layer quasar` e passaria por cima da cadeia de tokens do DSS. A classe DSS
troca apenas a custom property que a camada de composição já usa para pintar, e
a ponte `--q-primary` recomputa sozinha. Por isso o vocabulário aceito é o
semântico do DSS (`positive`, `negative`, …) e não a paleta do Quasar
(`teal-10`, `red-5`, …).

Precedência: a cor explícita da entrada vence a marca ambiente do `[data-brand]`,
porque a custom property é redefinida num ancestral mais próximo do marcador.
