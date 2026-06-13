# Pré-prompt: DssTimePicker

## 1. CLASSIFICAÇÃO E CONTEXTO

- **Golden Reference:** DssChip
  **Justificativa:** DssChip é o Golden Reference interativo global do DSS. DssTimePicker é um componente interativo que exige conformidade com os padrões de defineOptions, inheritAttrs, v-bind="$attrs" e composable de classes.

- **Golden Context:** DssKnob
  **Justificativa:** DssKnob é o Golden Context mais próximo para DssTimePicker:
  - Ambos usam um componente Quasar como root direto (EXC-Gate-01 — QKnob e QTime respectivamente)
  - Ambos passam `color="primary"` fixo internamente e sobrescrevem via CSS `--q-color-primary: var(--dss-action-primary)` (EXC-Gate-02)
  - Ambos são widgets visuais interativos não-field (não são QInput wrappers)
  - Ambos usam `v-bind="$attrs"` antes dos attrs explícitos para garantir precedência das props fixas
  - Ambos usam seletores descendentes para colorir elementos SVG/internos do Quasar (EXC-Gate-02b)
  - Ambos usam CSS global (não scoped) — necessário para descendant selectors funcionarem
  - A diferença central é que DssTimePicker renderiza um clock face enquanto DssKnob renderiza um arco circular SVG.

## 2. RISCOS ARQUITETURAIS E GATES

- **Motor único:** QTime como único motor (EXC-Gate-01). DssTimePicker NÃO usa QInput + QPopupProxy + QTime. O componente é o widget QTime diretamente, sem campo de texto — é um seletor visual de tempo (clock face), não um input de texto com popup.
- **EXC-Gate-02:** `color="primary"` fixo passado ao QTime + CSS `--q-color-primary: var(--dss-action-primary)` override via `.dss-time-picker`. QTime usa `--q-color-primary` para colorir os controles ativos (hora/minuto selecionado, ponteiro do relógio). Padrão idêntico ao DssPagination, DssAjaxBar e DssCarousel.
- **EXC-Gate-02b:** Descendant selectors necessários para `.q-time__header`, `.q-time__clock-position--active`, `.q-time__clock-pointer`. QTime não fornece CSS custom property hooks nativos para estas partes internas.
- **Sem defineExpose:** QTime não expõe API imperativa relevante para consumidores DSS.
- **Props bloqueadas:** `color`, `textColor`, `dark`, `square`, `flat`, `bordered` — governadas pelo DSS via tokens e `[data-theme]`.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

Props expostas (QTime API real):
- `v-model` / `modelValue` (String) — valor no formato 'HH:mm' ou 'HH:mm:ss'
- `landscape` (Boolean) — layout horizontal (relógio ao lado do header)
- `mask` (String) — máscara de formato (default QTime: 'HH:mm')
- `locale` (Object) — objeto de locale para internacionalização
- `format24h` (Boolean) — formato 24h vs AM/PM
- `defaultView` ('Hours' | 'Minutes' | 'Seconds') — view inicial ao abrir
- `options` (Function) — restringe horas/minutos/segundos selecionáveis
- `hourOptions` (Array\<Number\>) — lista de horas permitidas
- `minuteOptions` (Array\<Number\>) — lista de minutos permitidos
- `secondOptions` (Array\<Number\>) — lista de segundos permitidos
- `withSeconds` (Boolean) — exibe seletor de segundos
- `nowBtn` (Boolean) — exibe botão "Agora"
- `minimal` (Boolean) — sem header, apenas o clock face
- `readonly` (Boolean) — visual interativo, não editável
- `disable` (Boolean) — desabilitado completo
- `name` (String) — para formulários nativos (hidden input)
- `tabindex` (String | Number) — ordem de foco por teclado

Props bloqueadas (não passadas ao QTime):
- `color` — DSS usa `color="primary"` fixo + CSS override (EXC-Gate-02)
- `textColor` — DSS usa tokens via CSS descendant selectors
- `dark` — modo escuro governado globalmente via `[data-theme='dark']`
- `square` — bordas governadas via `--dss-radius-md`
- `flat` — elevação/shadow não aplicada ao DssTimePicker
- `bordered` — borda não aplicada ao DssTimePicker

Emits expostos:
- `update:modelValue` (value: string) — v-model padrão

## 4. GOVERNANÇA DE TOKENS E CSS

**Tokens reais do catálogo DSS:**

Cor primária (EXC-Gate-02 override):
- `--dss-action-primary` — via `--q-color-primary` (hora/minuto ativo, ponteiro do relógio)

Superfície:
- `--dss-surface-default` — background do clock face
- `--dss-surface-hover` — hover nos números do relógio

Bordas e raio:
- `--dss-radius-md` — border-radius do container `.q-time`
- `--dss-border-width-thin` — border em `@media print`

Tipografia:
- `--dss-text-body` — texto dos números no clock face
- `--dss-text-secondary` — texto do header AM/PM

Focus:
- `--dss-focus-ring` — cor do outline de foco
- `--dss-border-width-md` — espessura do outline de foco

Estados:
- `--dss-opacity-disabled` — opacidade quando disabled (0.4)
- `--dss-duration-hover`, `--dss-easing-hover` — transições de hover
- `--dss-duration-0` — prefers-reduced-motion (duração zero)

Brands:
- `--dss-hub-600` — cor primária do produto Hub
- `--dss-water-500` — cor primária do produto Water
- `--dss-waste-600` — cor primária do produto Waste

Print:
- `--dss-gap-0` — reset de gap em print (se aplicável)

**Tokens proibidos (NÃO USAR):**
- ❌ `--dss-action-hub`, `--dss-action-hub-surface` — não existem no catálogo DSS
- ❌ `--dss-text-subtle` — não existe (usar `--dss-text-secondary`)
- ❌ `--dss-surface-disabled` — não existe (usar `opacity: var(--dss-opacity-disabled)`)
- ❌ `--dss-duration-250` — não existe (usar `--dss-duration-hover` ou `--dss-duration-base`)
- ❌ `outline: 2px solid white` hardcoded — usar `var(--dss-focus-ring)` + `var(--dss-border-width-md)`
- ❌ `--dss-spacing-2`, `--dss-spacing-4` como padding do DssTimePicker — QTime gerencia padding internamente

## 5. ACESSIBILIDADE E ESTADOS

**Acessibilidade:**
- QTime implementa internamente: `role="group"`, navegação por teclado (setas para ajustar hora/minuto), e ARIA labels nos botões de hora/minuto/segundo.
- `aria-label` suportado via `$attrs` forwarding ao QTime.
- Touch target: QTime gerencia internamente — os elementos de hora/minuto têm dimensões suficientes.

**Estados aplicáveis:**

| Estado | Localização | Implementação |
|--------|-------------|---------------|
| `hover` | Números do clock face | CSS via `.q-time__clock-position:hover` |
| `focus` | Root do QTime | `:focus-visible` outline via CSS DSS |
| `disabled` | Root | `opacity: var(--dss-opacity-disabled)` |
| `readonly` | Root | `cursor: default` via `.q-time--readonly` |

**Estados não aplicáveis:**
- `loading` — QTime é síncrono, sem estado de carregamento
- `error` — DssTimePicker é widget visual; validação é responsabilidade do consumidor (ex: DssField wrapping)
- `active` — QTime gerencia internamente o estado ativo dos números selecionados

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

**Motor único:** `QTime` (EXC-Gate-01) — infraestrutura insubstituível de clock face, animações de ponteiro, navegação por teclado e ARIA.

**NÃO usa:**
- ❌ QInput — DssTimePicker é um widget visual, não um campo de texto
- ❌ QPopupProxy — o componente é o clock face em si, não um popup
- ❌ DssIcon — sem ícone de relógio no componente (consumidor pode combinar com DssInput + DssTimePicker externamente)

**Composição recomendada pelo consumidor:**
- Combinar externamente com DssField + DssInput para criar um "time input field com picker"
- Usar dentro de DssDialog ou DssPopupProxy para criar um picker com trigger
- Combinar com DssButton para ações "Confirmar" / "Cancelar" externas

## 7. EXCEÇÕES PREVISTAS E DOCUMENTADAS

| ID | Tipo | Local | Valor | Justificativa |
|----|------|-------|-------|---------------|
| EXC-Gate-01 | Gate de Composição v2.4 | `1-structure/DssTimePicker.ts.vue` | QTime como root element | QTime gerencia internamente: clock face visual, animação do ponteiro, navegação por teclado (ArrowUp/Down para ajustar valores), ARIA (role="group"), gestão de horas/minutos/segundos e transições. Sem alternativa em componentes DSS básicos. |
| EXC-Gate-02 | CSS Custom Property Override | `2-composition/_base.scss` | `--q-color-primary: var(--dss-action-primary)` via `.dss-time-picker` | QTime usa `--q-color-primary` (via `color="primary"` fixo) para colorir os controles ativos (número selecionado, ponteiro do relógio, botão "now"). Override idêntico ao padrão DssPagination, DssAjaxBar e DssCarousel. |
| EXC-Gate-02b | Gate de Composição v2.4 — Descendant Selector | `2-composition/_base.scss` | `.dss-time-picker .q-time__header`, `.q-time__clock-position--active`, `.q-time__clock-pointer` | QTime não fornece CSS custom property hooks nativos para estas partes internas (header, ponteiro, posição ativa). Descendant selectors são o único mecanismo de override CSS disponível. |

## 8. SUPERFÍCIE DE PLAYGROUND

**Cenários obrigatórios no DssTimePicker.example.vue:**

1. **Default** — clock face padrão com v-model
2. **Format 12h** — `format24h=false`, AM/PM visível
3. **Com segundos** — `withSeconds=true`, 3 views
4. **Minimal** — `minimal=true`, sem header
5. **Readonly** — `readonly=true`
6. **Disabled** — `disable=true`
7. **Com brands** — hub / water / waste via `[data-brand]`
8. **With options** — restricting hours via `options` function

**Props de controle na superfície:**
- `modelValue` (Input de texto)
- `format24h` (Toggle)
- `withSeconds` (Toggle)
- `minimal` (Toggle)
- `landscape` (Toggle)
- `nowBtn` (Toggle)
- `readonly` (Toggle)
- `disable` (Toggle)

## 9. ESTRUTURA DE ARQUIVOS (19 arquivos)

```
DSS/components/composed/DssTimePicker/
├── 1-structure/DssTimePicker.ts.vue        ← v-bind $attrs antes dos attrs fixos
├── 2-composition/_base.scss                ← --q-color-primary override + surface
├── 3-variants/_variant.scss                ← minimal variant
├── 3-variants/index.scss
├── 4-output/_states.scss                   ← dark, contrast, forced-colors, print, a11y
├── 4-output/_brands.scss                   ← hub-600, water-500, waste-600
├── 4-output/index.scss
├── composables/useTimePickerClasses.ts
├── composables/index.ts
├── types/time-picker.types.ts
├── DssTimePicker.md
├── DssTimePicker.module.scss
├── DssTimePicker.example.vue
├── DssTimePicker.vue
├── DSSTIMEPICKER_API.md
├── DssTimePicker.test.js
├── dss.meta.json
├── README.md
└── index.js
```
