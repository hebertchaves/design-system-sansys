# Pré-prompt: DssColorPicker

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
DssChip (componente interativo)

### Golden Context
**DssDatePicker** — widget visual de data construído sobre QDate, com a mesma estratégia arquitetural: motor Quasar como root (EXC-Gate-01), `color="primary"` fixo + `--q-color-primary` CSS override (EXC-Gate-02), `v-bind="$attrs"` antes dos fixos, e `defineOptions({ inheritAttrs: false })`.

O DssColorPicker segue o padrão EXC-Gate-01/02 estabelecido por DssDatePicker (QDate) e DssTimePicker (QTime), aplicado aqui ao QColor.

### Fase e Nível
- **Fase:** 2
- **Nível:** 3 (Composição de Terceiro Grau)
- **Família:** Seletores e Pickers

### Justificativa
O DssColorPicker padroniza a experiência de seleção de cores em todas as aplicações do Design System, garantindo consistência visual, funcionalidade robusta e acessibilidade. Centraliza lógica que evitaria a proliferação de seletores de terceiros com comportamentos inconsistentes.

## 2. ARQUITETURA — EXCEÇÕES FORMAIS

### EXC-Gate-01: Motor Insubstituível
`DssColorPicker` usa `QColor` como **root element sem wrapper adicional**. Esta é uma exceção formal ao Gate de Composição v2.4.

**Justificativa:** QColor gerencia internamente: canvas do espectro de cores, sliders de matiz (hue) e transparência (alpha), campos de entrada numérica para múltiplos formatos (R/G/B, H/S/L, H/S/V, HEX), paleta de cores, conversão entre formatos e navegação por teclado + ARIA. Substituir por componentes DSS equivalentes não é viável sem perder funcionalidade crítica.

**Padrão:** idêntico a DssDatePicker (QDate) e DssTimePicker (QTime).

### EXC-Gate-02: Theming via CSS Custom Property
`color="primary"` é passado fixo ao QColor. A cor de destaque (indicador de aba ativa nos QTabs internos) é controlada via `--q-color-primary: var(--dss-action-primary)` na classe raiz `.dss-color-picker`.

### EXC-Gate-02b: Descendant Selectors
`.q-color-picker__palette-square` e `.q-color-picker__header` são estilizados via seletores descendentes porque QColor não fornece CSS hooks nativos para partes internas.

**Padrão:** idêntico a DssTimePicker (clock positions) e DssDatePicker (calendar items).

### EX-Structural-01: Valor Visual Não-Tokenizado
`filter: brightness(0.85)` — DSS não possui token de brightness. Valor canônico da tabela DSS para hover light. Análogo ao DssCarousel EX-Structural-01.

## 3. MAPEAMENTO DE API (QUASAR QColor → DSS)

A tabela abaixo mapeia as props do QColor para a interface pública do DssColorPicker.
Props com nome idêntico ao Quasar mantêm o mesmo nome no DSS (padrão DSS).

| Prop QColor       | Prop DssColorPicker | Tipo                                             | Padrão      |
| :---------------- | :------------------ | :----------------------------------------------- | :---------- |
| `model-value`     | `modelValue`        | `String`                                         | `undefined` |
| `default-value`   | `defaultValue`      | `String`                                         | `undefined` |
| `format-model`    | `formatModel`       | `'rgb'\|'hex'\|'hexa'\|'rgba'\|'hsl'\|'hsla'\|'hsv'\|'hsva'` | `undefined` |
| `no-header`       | `noHeader`          | `Boolean`                                        | `false`     |
| `no-header-tabs`  | `noHeaderTabs`      | `Boolean`                                        | `false`     |
| `no-footer`       | `noFooter`          | `Boolean`                                        | `false`     |
| `default-view`    | `defaultView`       | `'spectrum'\|'tune'\|'palette'`                  | `'spectrum'`|
| `palette`         | `palette`           | `String[]`                                       | `undefined` |
| `square`          | `square`            | `Boolean`                                        | `false`     |
| `flat`            | `flat`              | `Boolean`                                        | `false`     |
| `bordered`        | `bordered`          | `Boolean`                                        | `false`     |
| `disable`         | `disable`           | `Boolean`                                        | `false`     |
| `readonly`        | `readonly`          | `Boolean`                                        | `false`     |
| `name`            | `name`              | `String`                                         | `undefined` |
| `tabindex`        | `tabindex`          | `String \| Number`                               | `undefined` |

### Props Bloqueadas (não expor ao consumer)

| Prop QColor | Motivo do Bloqueio |
| :---------- | :----------------- |
| `dark`      | DSS gerencia dark mode via `[data-theme="dark"]` e tokens globais. |
| `color`     | DSS controla via `--q-color-primary: var(--dss-action-primary)` CSS. `color="primary"` é fixo internamente. |

### Eventos

| Evento QColor          | Evento DssColorPicker    | Descrição |
| :--------------------- | :----------------------- | :-------- |
| `@update:model-value`  | `update:modelValue`      | A cada mudança de cor. |
| `@change`              | `change`                 | Quando a interação termina (mouseup/keyup). |

## 4. GOVERNANÇA DE TOKENS E CSS

### Tokens a Utilizar (confirmados no catálogo DSS)

| Token | Uso |
| :---- | :-- |
| `--dss-action-primary` | Indicador de aba ativa via `--q-color-primary` |
| `--dss-surface-default` | Fundo do container do color picker |
| `--dss-radius-md` | Border-radius do container e cabeçalho (8px) |
| `--dss-radius-sm` | Border-radius dos palette squares (4px) |
| `--dss-border-width-thin` | Borda em forced-colors e print (1px) |
| `--dss-border-width-md` | Outline de foco (2px) |
| `--dss-opacity-disabled` | Opacidade no estado disabled (0.4) |
| `--dss-focus-ring` | Cor do outline de foco |
| `--dss-duration-hover` | Duração da transição de hover na paleta |
| `--dss-easing-hover` | Easing da transição de hover |
| `--dss-duration-0` | Supressão de animações (prefers-reduced-motion) |
| `--dss-hub-600` | Brand Hub (`--q-color-primary` override) |
| `--dss-water-500` | Brand Water (`--q-color-primary` override) |
| `--dss-waste-600` | Brand Waste (`--q-color-primary` override) |

### Tokens Proibidos (não existem no catálogo DSS)

- ❌ `--dss-spacing-4` / `--dss-spacing-8` → usar `--dss-padding-4` / `--dss-gap-*`
- ❌ `--dss-surface-variant` → usar `--dss-surface-default`
- ❌ `--dss-border-default` → usar `--dss-gray-100` / `--dss-gray-200`
- ❌ `--dss-text-hub` / `--dss-text-subtle` → usar `--dss-text-body` / `--dss-gray-*`
- ❌ `--dss-action-hub` / `--dss-action-hub-surface` → usar `--dss-hub-600`
- ❌ `--dss-duration-250` / `--dss-duration-base` → usar `--dss-duration-hover` / `--dss-duration-0`
- ❌ `--dss-shadow-1` → usar `--dss-shadow-md`

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
- Navegação por teclado herdada do QColor (Tab, Arrow keys no espectro/sliders, Enter/Space na paleta)
- ARIA: `role="group"`, `aria-disabled` para estado desabilitado — herdados do QColor
- `prefers-reduced-motion`: suprimir transições via `--dss-duration-0`
- `prefers-contrast: more`: outline visível no container e palette squares
- `forced-colors`: SystemColor keywords (`ButtonText`, `Highlight`, `HighlightText`)

### Estados

| Estado | Implementado | Observação |
| :----- | :----------- | :--------- |
| hover | ✅ | Palette squares: `filter: brightness(0.85)` (EX-Structural-01) |
| focus | ✅ | Root e palette squares via `:focus-visible` |
| active | N/A | Gerenciado internamente pelo QColor |
| disabled | ✅ | `aria-disabled="true"` → `opacity: var(--dss-opacity-disabled)` |
| loading | N/A | QColor é síncrono |
| readonly | ✅ | `.q-color-picker--readonly` → `cursor: default` |
| error | N/A | Validação é responsabilidade do consumidor (ex: DssField wrapping) |
| success | N/A | Não aplicável ao QColor |

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências
- `QColor` do Quasar (motor, EXC-Gate-01)
- Fase 1: DssInput, DssSlider (usados em composições, não internamente)

### Padrões de Composição

```vue
<!-- Padrão: Color Picker em Overlay -->
<DssPopupProxy>
  <template #trigger>
    <DssButton>Selecionar cor</DssButton>
  </template>
  <DssColorPicker v-model="color" />
</DssPopupProxy>

<!-- Padrão: Paleta de cores da marca -->
<DssColorPicker
  v-model="brandColor"
  :palette="['#E65100', '#F57C00', '#0277BD', '#01579B', '#2E7D32', '#1B5E20']"
  default-view="palette"
/>
```

## 7. ESTRUTURA DE ARQUIVOS ESPERADA

```
DSS/components/composed/DssColorPicker/
├── 1-structure/DssColorPicker.ts.vue     ← QColor como root, EXC-Gate-01
├── 2-composition/_base.scss             ← CSS com EXC-Gate-02 + EXC-Gate-02b
├── 3-variants/_variant.scss             ← Vazio (QColor sem prop dense)
├── 3-variants/index.scss
├── 4-output/_states.scss                ← reduced-motion, contrast, forced-colors, print
├── 4-output/_brands.scss                ← Apenas --q-color-primary por brand
├── 4-output/index.scss
├── composables/useColorPickerClasses.ts ← { 'dss-color-picker': true }
├── composables/index.ts
├── types/color-picker.types.ts
├── DssColorPicker.module.scss
├── DssColorPicker.vue                   ← Entry point wrapper (re-export puro)
├── DssColorPicker.example.vue           ← Mínimo 10 cenários (3 brands)
├── DssColorPicker.test.js
├── DssColorPicker.md
├── DSSCOLORPICKER_API.md
├── README.md
├── dss.meta.json
└── index.js
```

## 8. NOTAS DE IMPLEMENTAÇÃO

1. `v-bind="$attrs"` ANTES de `color="primary"` — o fixo sobrescreve qualquer `color` passado via attrs
2. `defineOptions({ inheritAttrs: false })` obrigatório
3. `defineEmits` declarado (DssColorPicker emite `update:modelValue` e `change`)
4. `_brands.scss` deve conter APENAS `--q-color-primary` override — sem redeclarar estilos de `_base.scss`
5. Classe raiz: `.q-color-picker.dss-color-picker` (compound selector, ambas necessárias para especificidade)
