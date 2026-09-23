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


## Slots e props do QTimelineEntry FORA da API DSS

| item | motivo |
|---|---|
| slot `#icon` | **Não existe no QTimelineEntry.** Os slots do motor são `default`, `title` e `subtitle` (`dist/api/QTimelineEntry.json`). O DSS declarava e repassava esse slot, e o conteúdo desaparecia — medido: o glifo não saía nem no marcador nem no corpo. Para ícone no marcador use a prop `icon`; para imagem, `avatar`. |
| prop `body` | Alternativa do Quasar ao slot default ("Use this prop or the default slot"). O DSS já oferece o slot, que aceita markup e componentes — duas portas para a mesma coisa só criam dúvida sobre qual vence. |

## `side` — o que ele governa de verdade

Só vale no layout **`loose`**. É o contrato do Quasar, não uma limitação do DSS:

- `dense` e `comfortable` → o lado é decidido pelo **container** (`DssTimeline.side`);
- `loose` → o lado é decidido por **cada entrada**, e o default dela é `'right'` —
  é por isso que, no `loose`, mudar o `side` do container não muda nada.


## Como trocar o marcador (ícone / avatar)

São duas props na ENTRADA, e não existe slot:

```vue
<DssTimelineEntry icon="check" title="Aprovado" />          <!-- glifo Material -->
<DssTimelineEntry :avatar="urlOuDataUri" title="Comentou" /> <!-- imagem -->
<DssTimelineEntry title="Sem marcador especial" />           <!-- ponto sólido -->
```

Precedência do próprio motor: `icon` vence `avatar`; sem nenhum dos dois, fica o
ponto sólido. A cor vem de `color` (ver acima).

### EXC-ICON-01 — por que aqui o ícone NÃO é `DssIcon`, e por que não há slot

O `DSS_ICON_COMPOSITION_CONTRACT.md` (§3.1/§3.2) manda que todo prop de ícone
renderize `<DssIcon inline decorative>` e que exista slot com precedência sobre o
prop. **O `DssTimelineEntry` não consegue cumprir nenhum dos dois**, e a razão é
estrutural, não preguiça:

o `QTimelineEntry` monta o conteúdo do marcador a partir das PROPS, em código:

```js
// node_modules/quasar/src/components/timeline/QTimelineEntry.js
if (props.icon !== void 0)        dot = [ h(QIcon, { name: props.icon }) ]
else if (props.avatar !== void 0) dot = [ h('img', { class: 'q-timeline__dot-img', src: props.avatar }) ]
h('div', { class: dotClass.value }, dot)
```

Não há slot nem ponto de injeção: o `<div>` do dot é criado pelo motor com esses
filhos. Para pôr um `DssIcon` ali seria preciso substituir o `QTimelineEntry`
inteiro — escopo de reescrita, não de adequação. (Foi exatamente por isso que o
slot `#icon` que existia aqui não funcionava: o DSS o declarava, o Quasar o
ignorava, e o conteúdo sumia.)

**O que o DSS garante mesmo assim:**

- o glifo sai `aria-hidden="true"` (o QIcon já faz) — §3.3 do contrato atendido;
- o AVATAR recebe `alt=""` + `aria-hidden` pelo wrapper, porque o Quasar renderiza
  o `<img>` sem `alt` e um `<img>` sem alt é anunciado pela URL. A imagem é
  ornamento: quem carrega o significado é o título da entrada;
- o tamanho e a centragem do glifo vêm de token (`--dss-icon-size-sm` numa caixa
  de `--dss-icon-size-lg`), não do default do Material Icons.

`DssTimelineEntry` não estava na matriz §4 do contrato de ícone (piloto da Fase 2:
Avatar, Button, Chip, Checkbox). Esta é a primeira vez que o caso é examinado.
