# DssDatePicker — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssDatePicker` é um widget visual interativo para seleção de datas, baseado no `QDate` do Quasar Framework. Suporta três modos de seleção: data única, intervalo de datas (range) e múltiplas datas individuais.

**Quando usar:**
- Formulários que requerem entrada de data (data de nascimento, prazo, agendamento)
- Filtros de relatórios com seleção de período (range)
- Seleção de feriados, eventos ou dias específicos (multiple)
- Qualquer contexto onde o usuário precisa visualizar e navegar em um calendário

**Quando NÃO usar:**
- Para seleção de horário — use `DssTimePicker`
- Em campos de texto inline sem calendário visual — use `DssInput` com máscara de data
- Quando o range de datas precisa de lógica de negócio complexa — wrapping externo com `DssDialog`

---

## 2. Classificação DSS

- **Tipo:** Widget visual interativo de seleção de data
- **Categoria:** Seletores e Pickers
- **Fase:** 2
- **Nível:** 3 — Composição de Segundo Grau
- **Motor:** QDate (infraestrutura Quasar — EXC-Gate-01)
- **Interativo:** Sim
- **Golden Reference:** DssChip (padrão para componentes interativos — focus, hover, touch target)
- **Golden Context:** DssTimePicker (QMotor root, color="primary" fixo, --q-color-primary override)

---

## 3. Arquitetura

### Modelo Arquitetural

```
DssDatePicker (wrapper DSS governado)
└── QDate (motor de calendário — EXC-Gate-01)
    ├── Gerencia: navegação calendário, seleção única/range/múltipla
    ├── Gerencia: ARIA (role="group"), navegação por teclado
    └── Governado por: --q-color-primary via CSS DSS (EXC-Gate-02)
```

### Separação de Responsabilidades

- **DssDatePicker**: Governa tokens, brandabilidade, acessibilidade DSS, CSS
- **QDate**: Gerencia internamente o estado do calendário, animações, ARIA
- **Consumidor**: Responsável por composição (DssDialog, DssField, DssButton de ações)

### Comportamentos Implícitos

- `v-bind="$attrs"` posicionado ANTES dos attrs explícitos (`color="primary"`) para garantir que as props fixas DSS prevaleçam
- `color="primary"` é fixado internamente e nunca pode ser sobrescrito via `$attrs`
- `inheritAttrs: false` para controle explícito do forwarding

---

## 4. API

### Props

Ver [DSSDATEPICKER_API.md](./DSSDATEPICKER_API.md) para referência completa.

Resumo dos grupos de props:

| Grupo | Props |
|-------|-------|
| Valor | `modelValue` |
| Modos de seleção | `range`, `multiple` |
| Formato | `mask`, `locale`, `calendar` |
| Layout | `landscape`, `minimal` |
| Comportamento | `todayBtn`, `emitImmediately`, `noUnset`, `yearsInMonthView` |
| Vista | `defaultView`, `defaultYearMonth`, `firstDayOfWeek` |
| Restrições | `options`, `navigationMinYearMonth`, `navigationMaxYearMonth` |
| Eventos visuais | `events`, `eventColor` |
| Header | `title`, `subtitle` |
| Form | `name`, `tabindex` |
| Estado | `disable`, `readonly` |

### Slots

| Slot | Uso |
|------|-----|
| `default` | Conteúdo abaixo do calendário (botões de ação externos) |

### Eventos

| Evento | Quando |
|--------|--------|
| `update:modelValue` | Ao selecionar/alterar uma data |
| `navigation` | Ao navegar entre meses/anos |
| `range-start` | Ao iniciar a seleção de um range |
| `range-end` | Ao finalizar a seleção de um range |

---

## 5. Estados

| Estado | Implementado | Localização | Observação |
|--------|-------------|-------------|------------|
| hover | ✅ | Células do calendário e setas de navegação | `.q-date__calendar-item button:hover`, `.q-date__arrow button:hover` |
| focus | ✅ | Root via `:focus-visible` | outline com `--dss-focus-ring` (padrão DssChip) |
| active | ✅ | Dia selecionado via EXC-Gate-02b | Gerenciado pelo QDate via descendant selectors |
| disabled | ✅ | Root via `aria-disabled="true"` | `opacity: var(--dss-opacity-disabled)` |
| readonly | ✅ | Root via `.q-date--readonly` | `cursor: default` |
| loading | N/A | — | QDate é síncrono. Para loading, consumidor usa DssInnerLoading wrapping |
| error | N/A | — | DssDatePicker é widget visual; validação é responsabilidade do consumidor (DssField) |

---

## 6. Tokens Utilizados

| Token | Propriedade CSS | Localização |
|-------|----------------|-------------|
| `--dss-action-primary` | `--q-color-primary` (override) | `2-composition/_base.scss` |
| `--dss-surface-default` | `background-color` (calendário e texto sobre colorido) | `2-composition/_base.scss` |
| `--dss-surface-hover` | `background-color` (hover e range intermediário) | `2-composition/_base.scss` |
| `--dss-radius-md` | `border-radius` (calendário, header) | `2-composition/_base.scss` |
| `--dss-radius-full` | `border-radius` (células de dia) | `2-composition/_base.scss` |
| `--dss-text-body` | `color` (dias do calendário) | `2-composition/_base.scss` |
| `--dss-text-disabled` | `color` (dias fora do intervalo selecionável) | `2-composition/_base.scss` |
| `--dss-border-width-thin` | `border`, `outline` (print, prefers-contrast) | `4-output/_states.scss` |
| `--dss-border-width-md` | `outline` (focus, prefers-contrast) | `2-composition/_base.scss`, `4-output/_states.scss` |
| `--dss-opacity-disabled` | `opacity` (estado disabled) | `2-composition/_base.scss` |
| `--dss-focus-ring` | `outline-color` (focus-visible) | `2-composition/_base.scss` |
| `--dss-duration-hover` | `transition-duration` (hover das células) | `2-composition/_base.scss` |
| `--dss-duration-0` | `transition-duration` (prefers-reduced-motion) | `4-output/_states.scss` |
| `--dss-easing-hover` | `transition-timing-function` (hover) | `2-composition/_base.scss` |
| `--dss-hub-600` | `--q-color-primary`, `background-color` (brand hub) | `4-output/_brands.scss` |
| `--dss-water-500` | `--q-color-primary`, `background-color` (brand water) | `4-output/_brands.scss` |
| `--dss-waste-600` | `--q-color-primary`, `background-color` (brand waste) | `4-output/_brands.scss` |

---

## 7. Acessibilidade

- **WCAG 2.1 AA**: Conformante
- **ARIA**: Gerenciado pelo QDate — `role="group"`, `aria-label` dinâmico, `aria-disabled` para estado disabled
- **Navegação por teclado**: Gerenciada pelo QDate — setas direcionais para navegar entre dias, PageUp/PageDown para meses, Enter para selecionar
- **Focus visible**: Implementado via `:focus-visible` no root com `--dss-focus-ring` (padrão DssChip)
- **Touch target**: N/A — QDate gerencia seus próprios elementos interativos internamente; botões das células têm toque nativo adequado
- **prefers-reduced-motion**: Implementado via `transition-duration: var(--dss-duration-0)` em `4-output/_states.scss`
- **prefers-contrast: more**: Bordas adicionais via `4-output/_states.scss`
- **forced-colors: active**: SystemColor keywords via `4-output/_states.scss`

---

## 8. Composição

### Matriz de Composição DSS

| Papel | Componente DSS | Tipo |
|-------|---------------|------|
| Motor de calendário | QDate | Motor (EXC-Gate-01) |
| Trigger/modal | DssDialog, DssPopupProxy | Composição externa |
| Botões de ação | DssButton | Composição via slot default |
| Campo de input associado | DssField + DssInput | Composição externa |
| Loading overlay | DssInnerLoading | Composição externa |

### Padrões de Uso Recomendados

```vue
<!-- Padrão 1: Picker standalone (embutido no layout) -->
<DssDatePicker v-model="date" />

<!-- Padrão 2: Picker com botões de ação via slot default -->
<DssDatePicker v-model="date">
  <div class="row q-gutter-sm q-pa-sm">
    <DssButton label="Cancelar" flat @click="cancel" />
    <DssButton label="Confirmar" @click="confirm" />
  </div>
</DssDatePicker>

<!-- Padrão 3: Picker dentro de DssDialog com trigger -->
<DssButton label="Selecionar data" @click="showPicker = true" />
<DssDialog v-model="showPicker" title="Selecionar data">
  <DssDatePicker v-model="date" />
</DssDialog>
```

### Anti-Patterns

- ❌ Passar `color`, `textColor`, `dark`, `square`, `flat` ou `bordered` diretamente (props bloqueadas)
- ❌ Usar `:deep()` ou `::v-deep` para sobrescrever estilos internos do QDate fora do componente
- ❌ Usar `multiple` e `range` simultaneamente
- ❌ Esperar que o componente gerencie validação — responsabilidade do DssField/consumidor

---

## 9. Brandabilidade

```html
<!-- Hub -->
<div data-brand="hub">
  <DssDatePicker v-model="date" />
</div>

<!-- Water -->
<div data-brand="water">
  <DssDatePicker v-model="date" />
</div>

<!-- Waste -->
<div data-brand="waste">
  <DssDatePicker v-model="date" />
</div>
```

**Estratégia de brand:** Substituição de `--q-color-primary` pelo token de brand correspondente (`--dss-hub-600`, `--dss-water-500`, `--dss-waste-600`) e override dos descendant selectors afetados.

---

## 10. Exceções Registradas

| ID | Tipo | Local | Justificativa |
|----|------|-------|---------------|
| `EXC-Gate-01` | Gate de Composição v2.4 | `1-structure/DssDatePicker.ts.vue` | QDate como root — gerencia calendário, ARIA, seleção e transições internamente |
| `EXC-Gate-02` | CSS Custom Property Override | `2-composition/_base.scss` | `--q-color-primary` override para governança da cor do calendário via token DSS |
| `EXC-Gate-02b` | Gate de Composição v2.4 — Descendant Selector | `2-composition/_base.scss` | Descendant selectors para partes internas sem CSS hook nativo no QDate |
| `EX-Structural-01` | Valor Visual Não-Tokenizado | `2-composition/_base.scss` | `opacity: 0.7` para `.q-date__header-link:not(.q-date__header-link--active)` — link inativo do header (análogo ao DssTimePicker) |

---

## 11. Paridade com Golden Context (DssTimePicker)

| Aspecto | DssTimePicker | DssDatePicker | Justificativa da Divergência |
|---------|--------------|---------------|------------------------------|
| Motor Quasar como root | ✅ QTime | ✅ QDate | Mesmo padrão EXC-Gate-01 |
| `color="primary"` fixo | ✅ | ✅ | Mesmo padrão EXC-Gate-02 |
| `--q-color-primary` override | ✅ | ✅ | Mesmo padrão |
| Descendant selectors header | ✅ | ✅ | Mesmo padrão EXC-Gate-02b |
| `v-bind="$attrs"` antes dos explícitos | ✅ | ✅ | Mesma posição |
| `defineOptions` + `inheritAttrs: false` | ✅ | ✅ | Mesmo padrão |
| Focus via `:focus-visible` | ✅ | ✅ | Mesmo token `--dss-focus-ring` |
| Disabled via `aria-disabled` | ✅ | ✅ | Mesmo token `--dss-opacity-disabled` |
| `EX-Structural-01: opacity: 0.7` | ✅ (AM/PM inativo via `.q-time__header-ampm`) | ✅ (link inativo via `.q-date__header-link:not(--active)`) | Mesma justificativa, elemento análogo |
| `prefers-reduced-motion` | ✅ | ✅ | Mesmo padrão `--dss-duration-0` |
| `forced-colors` | ✅ | ✅ | SystemColor keywords |
| Brands via `--q-color-primary` | ✅ | ✅ | Mesmo padrão |
| Emits adicionais | ❌ | ✅ `navigation`, `range-start`, `range-end` | QDate expõe mais eventos que QTime — todos mapeados |

---

## 12. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-22 | Claude Code | Criação inicial — Fase 2, Nível 3 |
