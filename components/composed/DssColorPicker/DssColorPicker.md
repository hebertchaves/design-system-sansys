# DssColorPicker — Documentação (Template 13.1)

## 1. Visão Geral

**O que é:** `DssColorPicker` é um widget visual interativo de seleção de cores, construído sobre o `QColor` do Quasar Framework. Permite ao usuário selecionar uma cor via espectro visual (spectrum), sliders de matiz/saturação/transparência (tune) ou paleta de cores pré-definidas (palette).

**Quando usar:**
- Campos de configuração de tema ou personalização visual de cor
- Seleção de cor de categoria, tag ou marcador em sistemas de gestão
- Formulários que requerem entrada de cor em formato validado (HEX, RGB, HSL)
- Seletores de cor em painéis de controle ou dashboards

**Quando NÃO usar:**
- Quando apenas um conjunto fixo de cores aprovadas deve ser selecionável (use DssSelect com DssChip visual)
- Quando o espaço na tela é muito limitado (prefer DssPopupProxy + DssColorPicker)
- Como campo inline em formulários compactos (prefer trigger + DssDialog wrapping)

---

## 2. Classificação DSS

- **Tipo:** Widget visual interativo de seleção de cor
- **Categoria:** Seletores e Pickers
- **Fase:** 2
- **Nível:** 3 (Composição de Terceiro Grau)
- **Motor:** QColor (infraestrutura Quasar)
- **Interativo:** Sim
- **Golden Reference:** DssChip
- **Golden Context:** DssDatePicker

---

## 3. Arquitetura

### Modelo Motor (EXC-Gate-01)

`DssColorPicker` usa `QColor` como root element sem wrapper adicional. Esta é uma exceção formal ao Gate de Composição v2.4.

**Justificativa:** QColor gerencia internamente a interface de espectro de cores (canvas), sliders de matiz (hue) e transparência (alpha), campos de entrada numérica para múltiplos formatos (R/G/B, H/S/L, H/S/V, HEX), paleta de cores, conversão entre formatos e navegação por teclado + ARIA. Substituir o motor por componentes DSS equivalentes não é viável sem perder funcionalidade crítica.

### Estratégia de Theming (EXC-Gate-02)

`color="primary"` é passado fixo ao QColor. A cor de destaque (indicador de aba ativa nos QTabs internos) é controlada via `--q-color-primary: var(--dss-action-primary)` na classe raiz `.dss-color-picker`.

---

## 4. API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `String` | `undefined` | Valor atual da cor selecionada |
| `defaultValue` | `String` | `undefined` | Valor padrão ao montar o componente |
| `formatModel` | `'rgb' \| 'hex' \| 'hexa' \| 'rgba' \| 'hsl' \| 'hsla' \| 'hsv' \| 'hsva'` | `undefined` | Formato de emissão e exibição da cor |
| `noHeader` | `Boolean` | `false` | Oculta o cabeçalho do picker |
| `noHeaderTabs` | `Boolean` | `false` | Remove as abas de navegação (spectrum/tune/palette) |
| `noFooter` | `Boolean` | `false` | Oculta o rodapé do picker |
| `defaultView` | `'spectrum' \| 'tune' \| 'palette'` | `'spectrum'` | Aba/view padrão ao abrir |
| `palette` | `String[]` | `undefined` | Array de cores HEX para a paleta |
| `square` | `Boolean` | `false` | Remove border-radius (cantos retos) |
| `flat` | `Boolean` | `false` | Estilo sem sombra ou borda |
| `bordered` | `Boolean` | `false` | Adiciona borda ao redor do componente |
| `disable` | `Boolean` | `false` | Desabilita o componente |
| `readonly` | `Boolean` | `false` | Modo somente leitura |
| `name` | `String` | `undefined` | Nome do campo para formulários HTML |
| `tabindex` | `String \| Number` | `undefined` | Índice de tabulação |

**Props bloqueadas (não expor ao consumer):**
- `dark` — DSS gerencia dark mode via `[data-theme="dark"]` e tokens globais
- `color` — DSS sobrescreve via `--q-color-primary` CSS; `color="primary"` é fixo internamente

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo adicional renderizado dentro do QColor (use para botões de ação internos) |

### Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `String \| null` | Emitido a cada mudança de cor (uso com v-model) |
| `change` | `String \| null` | Emitido quando o usuário termina a seleção (mouseup/keyup) |

---

## 5. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| hover | ✅ | Quadrados de paleta: `filter: brightness(0.85)` |
| focus | ✅ | Root e palette squares via `:focus-visible` |
| active | N/A | Gerenciado internamente pelo QColor (cursor do espectro, thumbs dos sliders) |
| disabled | ✅ | `aria-disabled="true"` → `opacity: var(--dss-opacity-disabled)` |
| loading | N/A | QColor é síncrono — sem estado de carregamento |
| readonly | ✅ | `.q-color-picker--readonly` → `cursor: default` |
| error | N/A | Validação é responsabilidade do consumidor (ex: DssField wrapping) |

---

## 6. Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-action-primary` | Indicador de aba ativa (via `--q-color-primary`), brands |
| `--dss-surface-default` | Fundo do container do color picker |
| `--dss-radius-md` | Border-radius do container e cabeçalho |
| `--dss-radius-sm` | Border-radius dos quadrados de paleta |
| `--dss-border-width-thin` | Borda em forced-colors e print |
| `--dss-border-width-md` | Outline de focus |
| `--dss-opacity-disabled` | Opacidade no estado disabled |
| `--dss-focus-ring` | Cor do outline de foco |
| `--dss-duration-hover` | Duração da transição de hover na paleta |
| `--dss-easing-hover` | Easing da transição de hover na paleta |
| `--dss-duration-0` | Supressão de animações (prefers-reduced-motion) |
| `--dss-hub-600` | Cor primária brand Hub |
| `--dss-water-500` | Cor primária brand Water |
| `--dss-waste-600` | Cor primária brand Waste |

---

## 7. Acessibilidade

- **WCAG 2.1 AA:** Conformidade via QColor (ARIA role, keyboard navigation)
- **Touch target:** N/A — DssColorPicker é widget completo, não compact control
- **ARIA:** Herdado do QColor: `role="group"`, `aria-disabled` para estado desabilitado
- **Navegação por teclado:** Herdada do QColor — Tab para focar; Arrow keys no espectro/sliders; Enter/Space na paleta
- **prefers-reduced-motion:** Todas as transições são suprimidas via `--dss-duration-0`
- **prefers-contrast: more:** Outline visível adicionado ao container e palette squares
- **forced-colors:** SystemColor keywords (`ButtonText`, `Highlight`, `HighlightText`)

---

## 8. Exceções Registradas

| ID | Tipo | Local | Valor | Justificativa |
|----|------|-------|-------|---------------|
| EXC-Gate-01 | Gate de Composição v2.4 | `1-structure/DssColorPicker.ts.vue` | QColor como root | Motor insubstituível — gerencia canvas, sliders, inputs, conversão de formato e ARIA internamente |
| EXC-Gate-02 | CSS Custom Property Override | `2-composition/_base.scss` | `--q-color-primary: var(--dss-action-primary)` | QColor usa --q-color-primary para o indicador da aba ativa. Padrão DssPagination/DssCarousel/DssTimePicker/DssDatePicker |
| EXC-Gate-02b | Descendant Selector | `2-composition/_base.scss` | `.q-color-picker__palette-square`, `.q-color-picker__header` | QColor não fornece CSS hooks nativos para partes internas. Padrão DssTimePicker (clock positions) e DssDatePicker (calendar items) |
| EX-Structural-01 | Valor Visual Não-Tokenizado | `2-composition/_base.scss`, `4-output/_brands.scss` | `filter: brightness(0.85)` | DSS não possui token de brightness. Valor canônico da tabela DSS para hover light. Análogo ao DssCarousel EX-Structural-01 |

---

## 9. Composição e Padrões de Uso

### Padrão: Color Input com Preview

```vue
<template>
  <div class="color-field">
    <DssColorPicker v-model="selectedColor" format-model="hex" />
    <DssInput :model-value="selectedColor" label="Cor selecionada" readonly />
  </div>
</template>
```

### Padrão: Color Picker em Overlay

```vue
<template>
  <DssPopupProxy>
    <template #trigger>
      <DssButton>Selecionar cor</DssButton>
    </template>
    <DssColorPicker v-model="selectedColor" />
  </DssPopupProxy>
</template>
```

### Padrão: Paleta de Cores da Marca

```vue
<template>
  <DssColorPicker
    v-model="brandColor"
    :palette="['#E65100', '#F57C00', '#0277BD', '#01579B', '#2E7D32', '#1B5E20']"
    default-view="palette"
  />
</template>
```

### Anti-patterns

```vue
<!-- ❌ ERRADO: forçar dark mode via prop -->
<DssColorPicker dark />

<!-- ✅ CORRETO: dark mode via [data-theme="dark"] no ancestral -->
<div data-theme="dark">
  <DssColorPicker />
</div>

<!-- ❌ ERRADO: sobrescrever cor via prop color -->
<DssColorPicker color="secondary" />

<!-- ✅ CORRETO: cor é governada pelo DSS (--q-color-primary via CSS) -->
<DssColorPicker />
```

---

## 10. Paridade com Golden Context (DssDatePicker)

| Aspecto | DssDatePicker | DssColorPicker | Justificativa de Divergência |
|---------|---------------|----------------|------------------------------|
| Root element sem wrapper | ✅ QDate | ✅ QColor | Ambos são motores visuais |
| `color="primary"` fixo | ✅ | ✅ | Mesmo padrão EXC-Gate-02 |
| `--q-color-primary` override | ✅ | ✅ | Mesmo padrão EXC-Gate-02 |
| `v-bind="$attrs"` antes dos fixos | ✅ | ✅ | Mesmo padrão |
| `defineOptions({ inheritAttrs: false })` | ✅ | ✅ | Mesmo padrão |
| Descendant selectors (EXC-Gate-02b) | ✅ | ✅ | Ambos necessitam |
| Prop `dark` bloqueada | ✅ | ✅ | Mesmo padrão |
| `prefers-reduced-motion` | ✅ | ✅ | Mesmo padrão |
| `prefers-contrast: more` | ✅ | ✅ | Mesmo padrão |
| `forced-colors` | ✅ | ✅ | Mesmo padrão |
| `@print` | ✅ | ✅ | Mesmo padrão |
| Slots `default` | ✅ | ✅ | Mesmo padrão |
| Hover em itens internos | Dias do calendário | Palette squares | ✅ Contexto diferente, estratégia similar |
| `EX-Structural-01` opacity | `opacity: 0.7` (header link inativo) | `filter: brightness(0.85)` (palette hover) | ✅ Contexto diferente — palette squares usam brightness |

---

## 11. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-22 | DSS | Criação inicial — Fase 2 Nível 3 |
