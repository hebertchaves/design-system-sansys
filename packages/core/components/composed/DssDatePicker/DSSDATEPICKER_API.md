# DSSDATEPICKER_API.md — DssDatePicker API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `String \| { from: String, to: String } \| String[]` | `undefined` | Valor controlado. String para data única (`YYYY/MM/DD`), objeto `{ from, to }` para range, array para múltiplas datas |
| `multiple` | `Boolean` | `false` | Habilita seleção de múltiplas datas individuais. Incompatível com `range` |
| `range` | `Boolean` | `false` | Habilita seleção de intervalo (período). Incompatível com `multiple` |
| `mask` | `String` | `'YYYY/MM/DD'` | Máscara de formatação da data |
| `locale` | `Object` | `undefined` | Locale para internacionalização (dias da semana, meses) |
| `calendar` | `'gregorian' \| 'persian'` | `'gregorian'` | Tipo de calendário |
| `landscape` | `Boolean` | `false` | Layout horizontal (paisagem) |
| `minimal` | `Boolean` | `false` | Modo sem header (apenas calendário) |
| `todayBtn` | `Boolean` | `false` | Exibe botão de atalho para hoje |
| `emitImmediately` | `Boolean` | `false` | Emite valor imediatamente ao selecionar (sem aguardar duplo clique em range) |
| `defaultView` | `'Calendar' \| 'Months' \| 'Years'` | `'Calendar'` | Vista padrão ao abrir |
| `defaultYearMonth` | `String` | `undefined` | Ano/mês padrão ao abrir (formato `YYYY/MM`) |
| `yearsInMonthView` | `Boolean` | `false` | Exibe anos na vista de meses |
| `options` | `String[] \| (date: String) => Boolean` | `undefined` | Define quais datas são selecionáveis |
| `events` | `String[] \| (date: String) => Boolean` | `undefined` | Datas marcadas com indicador visual (ponto) |
| `eventColor` | `String \| (date: String) => String` | `undefined` | Cor do indicador de evento |
| `navigationMinYearMonth` | `String` | `undefined` | Limita navegação mínima (`YYYY/MM`) |
| `navigationMaxYearMonth` | `String` | `undefined` | Limita navegação máxima (`YYYY/MM`) |
| `noUnset` | `Boolean` | `false` | Impede deselecionar a data já selecionada |
| `firstDayOfWeek` | `String \| Number` | `undefined` | Primeiro dia da semana (0=dom, 1=seg, ..., 6=sab) |
| `title` | `String` | `undefined` | Título personalizado no header |
| `subtitle` | `String` | `undefined` | Subtítulo personalizado no header |
| `name` | `String` | `undefined` | Atributo `name` para forms |
| `tabindex` | `String \| Number` | `undefined` | Índice de tabulação |
| `disable` | `Boolean` | `false` | Desabilita o componente |
| `readonly` | `Boolean` | `false` | Somente leitura |

### Props Bloqueadas

As seguintes props do QDate são **bloqueadas** e não devem ser passadas via `$attrs`:

| Prop Bloqueada | Justificativa |
|----------------|---------------|
| `color` | Fixado em `"primary"` internamente (EXC-Gate-02) — DSS governa via `--q-color-primary` |
| `textColor` | DSS controla tipografia via tokens |
| `dark` | Dark mode governado globalmente via `[data-theme="dark"]` e tokens DSS |
| `square` | DSS usa `border-radius` via tokens |
| `flat` | Variação visual não prevista no DSS |
| `bordered` | Variação visual não prevista no DSS |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo adicional exibido abaixo do calendário (ex: botões de ação "Confirmar"/"Cancelar") |

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `String \| { from: String, to: String } \| String[]` | Emitido ao selecionar/alterar uma data |
| `navigation` | `{ year: Number, month: Number }` | Emitido ao navegar entre meses/anos |
| `range-start` | `String` | Emitido ao iniciar a seleção de um range (primeiro clique) |
| `range-end` | `String` | Emitido ao finalizar a seleção de um range (segundo clique) |

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-action-primary` | Cor primária via `--q-color-primary` (header, dia selecionado, range endpoints, botão Hoje) |
| `--dss-surface-default` | Fundo do calendário e texto sobre fundo colorido |
| `--dss-surface-hover` | Fundo de hover nos dias e dentro do range |
| `--dss-radius-md` | Border-radius do calendário e do header |
| `--dss-radius-full` | Border-radius das células de dia (círculo) |
| `--dss-text-body` | Cor do texto dos dias |
| `--dss-text-disabled` | Cor dos dias fora do intervalo selecionável |
| `--dss-border-width-thin` | Borda em prefers-contrast e print |
| `--dss-border-width-md` | Anel de foco e borda em prefers-contrast |
| `--dss-opacity-disabled` | Opacidade do componente desabilitado |
| `--dss-focus-ring` | Cor do anel de foco |
| `--dss-duration-hover` | Duração das transições de hover |
| `--dss-duration-0` | Duration zero para prefers-reduced-motion |
| `--dss-easing-hover` | Easing das transições de hover |
| `--dss-hub-600` | Brand Hub — cor do calendário |
| `--dss-water-500` | Brand Water — cor do calendário |
| `--dss-waste-600` | Brand Waste — cor do calendário |

## Classes CSS

| Classe | Descrição |
|--------|-----------|
| `.dss-date-picker` | Classe raiz do componente (aplicada ao `QDate`) |
| `.q-date.dss-date-picker` | Seletor composto para garantir especificidade nos overrides |

## Exceções Documentadas

| ID | Tipo | Justificativa |
|----|------|---------------|
| `EXC-Gate-01` | Gate de Composição v2.4 | QDate como root element — gerencia internamente navegação, ARIA, seleção e transições |
| `EXC-Gate-02` | CSS Custom Property Override | `--q-color-primary` override para governança da cor do calendário |
| `EXC-Gate-02b` | Gate de Composição v2.4 — Descendant Selector | Descendant selectors para partes internas do QDate sem CSS hook nativo |
| `EX-Structural-01` | Valor Visual Não-Tokenizado | `opacity: 0.7` para subtítulo inativo do header (sem token DSS correspondente) |
