# DssKnob — Documentação Normativa (Template 13.1)

## 1. Visão Geral e Classificação

**O que é:** `DssKnob` é um controle rotativo interativo que permite ao usuário selecionar um valor numérico dentro de um intervalo, arrastando o dial circular com mouse ou toque, ou navegando por teclado. Renderiza um arco SVG de progresso sobre uma trilha circular, com um centro exibindo o valor atual ou conteúdo customizado via slot.

**Quando usar:**
- Ajuste de intensidade/volume com representação visual compacta (audio, brilho, velocidade)
- Controles de parâmetros numéricos em dashboards (temperatura, percentual, ângulo)
- Alternativa compacta a DssSlider quando o espaço horizontal é limitado
- Formulários com campos numéricos de intervalo onde o caráter rotativo é semanticamente relevante

**Quando NÃO usar:**
- Valores com progresso determinístico não interativo — use `DssCircularProgress`
- Faixas de valores (dois thumbs) — use `DssRange`
- Sliders horizontais com espaço adequado — use `DssSlider` (mais familiar)
- Inputs numéricos precisos onde digitação direta é preferível — use `DssInput` com `type="number"`
- Valores com mais de 3 dígitos — o slot central limita o espaço de exibição

**Classificação DSS:**
- **Tipo:** Interativo — Compact Control
- **Categoria:** Input Especializado
- **Fase:** 2 — Nível 1
- **Família:** Inputs Especializados
- **Interativo:** Sim
- **Quasar Base:** `QKnob`
- **Golden Reference:** `DssChip`
- **Golden Context:** `DssSlider`

---

## 2. API Surface

### Props principais

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `model-value` | `Number` | *obrigatório* | Valor atual (v-model) |
| `min` | `Number` | `0` | Valor mínimo |
| `max` | `Number` | `100` | Valor máximo |
| `inner-min` | `Number` | — | Mínimo interno (restringe modelo dentro da trilha) |
| `inner-max` | `Number` | — | Máximo interno (restringe modelo dentro da trilha) |
| `step` | `Number` | `1` | Incremento por interação |
| `reverse` | `Boolean` | `false` | Inverte direção do progresso |
| `instant-feedback` | `Boolean` | `false` | Desativa animação do arco ao mudar valor |
| `readonly` | `Boolean` | `false` | Somente leitura (sem alteração visual) |
| `disable` | `Boolean` | `false` | Desabilitado (opacidade reduzida + sem interação) |
| `thickness` | `Number` | `0.2` | Espessura do arco (razão 0–1 do raio) |
| `angle` | `Number` | — | Ângulo inicial do arco em graus |
| `rounded` | `Boolean` | `false` | Terminações arredondadas no arco |
| `tabindex` | `Number\|String` | `0` | Índice de tabulação |
| `size` | `String` | — | Tamanho visual (CSS string, ex: `'48px'`) |
| `name` | `String` | — | Nome do campo para formulários nativos |
| `show-value` | `Boolean` | `true` | Exibe conteúdo do slot no centro |
| `brand` | `KnobBrand` | — | Contexto de brand Sansys |

### Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `color` | Cor do arco governada via CSS (`stroke: var(--dss-action-primary)`). DSS não usa Quasar color names. Substituído por `brand`. |
| `track-color` | Cor da trilha governada via CSS (`stroke: var(--dss-surface-muted)`). Fixo internamente como `grey-3` para garantir renderização do SVG circle. |
| `center-color` | Fundo central governado via CSS (`fill: var(--dss-surface-default)`). Fixo internamente como `white`. |
| `font-size` | Tipografia central governada via tokens CSS DSS. Não passar a prop evita inline style do QKnob. |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo no centro do knob. Default: `{{ modelValue }}` (valor numérico). |

### Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `@update:model-value` | `Number` | Emitido ao mudar o valor (para v-model) |
| `@change` | `Number` | Emitido ao finalizar interação (mouse/touch release) |
| `@drag-value` | `Number` | Emitido continuamente durante drag com valor em tempo real |

*API completa em [DSSKNOB_API.md](./DSSKNOB_API.md)*

---

## 3. Comportamento e Estados

### Estados Aplicáveis

| Estado | Implementação | Detalhes |
|--------|--------------|---------|
| Hover | ✅ `filter: brightness(0.95)` no SVG | Feedback visual sutil no arco (EX-Structural-01) |
| Focus | ✅ `outline` em `:focus-visible` | `var(--dss-border-width-md) solid var(--dss-focus-ring)` com `border-radius:50%` (EXC-Focus-01) |
| Active | ✅ `filter: brightness(0.90)` no SVG | Durante drag ou click (EX-Structural-01) |
| Disabled | ✅ `opacity: var(--dss-opacity-disabled)` | 0.4; QKnob bloqueia interação via `.no-pointer-events` |
| prefers-contrast: more | ✅ `stroke-width: 3` nos arcos + `outline-width: 3px` | Reforça visibilidade dos arcos SVG finos |
| prefers-reduced-motion | ✅ EX-States-01 | Suprime transição do `stroke-dashoffset` e animações CSS |
| forced-colors | ✅ EX-States-02 | `Highlight`, `ButtonText`, `Canvas` |

### Estados Explicitamente Não Aplicáveis

| Estado | Razão |
|--------|-------|
| loading | QKnob é controle síncrono — valor atualizado em tempo real durante drag |
| error | QKnob não fornece mecanismo nativo de validação; responsabilidade do formulário pai |
| readonly (visual) | Gerenciado pelo QKnob via `no-pointer-events` + `cursor:default`; sem alteração de opacidade — readonly ≠ disabled semanticamente |
| print | Controle interativo SVG; sem `display:none` — valor pode ser relevante em impressão |

---

## 4. Tokens DSS

| Token | Propriedade CSS | Contexto |
|-------|----------------|----------|
| `--dss-action-primary` | `stroke` em `.q-circular-progress__circle` | Arco de progresso padrão |
| `--dss-surface-muted` | `stroke` em `.q-circular-progress__track` | Trilha de fundo |
| `--dss-surface-default` | `fill` em `.q-circular-progress__center` | Fundo central do knob |
| `--dss-font-family-sans` | `font-family` no `.q-circular-progress__text` | Fonte do valor central |
| `--dss-font-size-xs` | `font-size` no `.q-circular-progress__text` | Tamanho do valor central |
| `--dss-font-weight-medium` | `font-weight` no `.q-circular-progress__text` | Peso do valor central |
| `--dss-border-width-md` | `outline-width` em `:focus-visible` | Espessura do focus ring |
| `--dss-focus-ring` | `outline-color` em `:focus-visible` | Cor do focus ring |
| `--dss-opacity-disabled` | `opacity` em `[aria-disabled="true"]` | Opacidade quando desabilitado (0.4) |
| `--dss-hub-600` | `stroke` em `.q-circular-progress__circle` + `outline-color` | Brand hub |
| `--dss-water-500` | `stroke` em `.q-circular-progress__circle` + `outline-color` | Brand water |
| `--dss-waste-600` | `stroke` em `.q-circular-progress__circle` + `outline-color` | Brand waste |

---

## 5. Acessibilidade

- **`role="slider"` nativo do QKnob:** QKnob adiciona `role="slider"` automaticamente ao root. DssKnob não duplica nem sobrescreve.

- **ARIA dinâmico:** `aria-valuemin`, `aria-valuemax`, `aria-valuenow` são gerenciados pelo QKnob e atualizados automaticamente conforme o valor muda. DssKnob não precisa declarar esses atributos.

- **`aria-label` / `aria-labelledby`:** Responsabilidade do consumer. Passar via `v-bind="$attrs"` que são forwarded ao QKnob. Exemplo: `<DssKnob aria-label="Volume" v-model="volume" />`.

- **Navegação por teclado (nativa do QKnob):** `ArrowUp/Down/Left/Right` (±step), `PageUp/Down` (±step×10), `Home` (min), `End` (max).

- **Touch target (WCAG 2.5.5):** O knob em si é o touch target. Default do QKnob (~50px via `font-size: $knob-font-size`) já atende o mínimo de 44px. Se `size` for customizado, garantir `>= 44px`. Não aplicado via `::before` — QKnob já usa `::before` internamente (EXC-Focus-01).

- **Focus ring (EXC-Focus-01):** QKnob usa `::before + box-shadow` para foco. DSS neutraliza esse box-shadow e aplica `outline` via `:focus-visible` com `border-radius: 50%`, seguindo o padrão DssChip (Golden Reference).

- **WCAG 2.3.3 (Animação sob Solicitação — Nível AAA):** `prefers-reduced-motion: reduce` suprime animações do arco SVG e transições CSS (EX-States-01).

- **WCAG 1.4.11 (Contraste Não-Textual — Nível AA):** `forced-colors: active` aplica `Highlight` no arco, `ButtonText` na trilha, `Canvas` no centro (EX-States-02).

- **`prefers-contrast: more`:** `stroke-width: 3` nos arcos SVG e `outline-width: 3px` no focus ring para visibilidade em alto contraste (EX-States-03).

---

## 6. Comportamentos Implícitos

1. **QKnob como root element (EXC-Gate-01)** — O elemento renderizado é simultaneamente `.q-circular-progress`, `.q-knob`, e `.dss-knob`. Não há wrapper externo.

2. **Círculos SVG exigem props para renderizar** — QCircularProgress (interno ao QKnob) só renderiza `.q-circular-progress__circle`, `.q-circular-progress__track`, `.q-circular-progress__center` se as props correspondentes (`color`, `track-color`, `center-color`) NÃO forem `undefined`/`transparent`. DssKnob passa valores fixos (`'primary'`, `'grey-3'`, `'white'`) para garantir renderização, e sobrescreve as cores via CSS (EXC-Gate-02).

3. **CSS tem precedência sobre SVG attributes** — QCircularProgress define `stroke="currentColor"` e `fill="currentColor"` como atributos SVG. Propriedades CSS `stroke` e `fill` têm prioridade sobre atributos de apresentação SVG — garantindo que os tokens DSS prevaleçam.

4. **`show-value` e o slot** — Quando `show-value=false` (ou não passado como `true`), QCircularProgress não renderiza o container `.q-circular-progress__text`, e o slot default não é exibido. Default de DssKnob é `show-value=true`.

5. **Slot default e valor numérico** — Quando nenhum slot é fornecido, o template exibe `{{ modelValue }}` como fallback automático.

6. **`font-size` prop não exposta** — `font-size` do QKnob não é declarada em DssKnob. Isso evita que inline style sobrescreva os tokens CSS de tipografia DSS no `.q-circular-progress__text`.

7. **`v-bind="$attrs"` + bindings explícitos** — Em Vue 3, bindings explícitos após `v-bind="$attrs"` têm precedência para a mesma prop. Garante que `color="primary"`, `track-color="grey-3"`, `center-color="white"` sempre prevaleçam.

8. **`defineOptions({ inheritAttrs: false })`** — Atributos não declarados como props em DssKnob (ex: `aria-label`, `data-testid`) são forwarded via `v-bind="$attrs"` ao QKnob.

---

## 7. Paridade Golden Reference / Golden Context

| Aspecto | DssChip (Ref) | DssSlider (Context) | DssKnob | Status |
|---------|--------------|---------------------|---------|--------|
| Interatividade | ✅ | ✅ | ✅ | ✅ Paridade |
| Touch Target | ✅ `::before` | ✅ min-height | ✅ tamanho do root | ✅ Paridade (mecanismo diferente) |
| focus-visible outline | ✅ `--dss-border-width-md + --dss-focus-ring` | ✅ box-shadow | ✅ EXC-Focus-01 outline | ✅ Paridade com Ref |
| Hover visual | ✅ brightness(0.95) | ✅ brightness() | ✅ brightness(0.95) no SVG | ✅ Paridade |
| Active visual | ✅ brightness(0.90) | ✅ | ✅ brightness(0.90) no SVG | ✅ Paridade |
| Disabled opacity | ✅ `--dss-opacity-disabled` | ✅ | ✅ | ✅ Paridade |
| Brand dual-selector | ✅ | ✅ | ✅ | ✅ Paridade |
| prefers-contrast: more | ✅ | ✅ | ✅ EX-States-03 | ✅ Paridade |
| prefers-reduced-motion | ✅ | ✅ | ✅ EX-States-01 | ✅ Paridade |
| forced-colors | ✅ | ✅ | ✅ EX-States-02 | ✅ Paridade |
| defineEmits | ✅ | ✅ | ✅ (3 events) | ✅ Paridade |
| inheritAttrs: false | ✅ | ✅ | ✅ | ✅ Paridade |
| Quasar como root | ❌ | ❌ | ✅ EXC-Gate-01 | ✅ Divergência justificada |
| CSS arc override | — | ❌ | ✅ EXC-Gate-02 | ✅ Divergência justificada |

**Divergências intencionais:**
- QKnob como root (EXC-Gate-01): DssChip e DssSlider usam wrappers. Não aplicável para QKnob — gerencia SVG circular, drag, ARIA internamente. Padrão DssInfiniteScroll/DssAjaxBar.
- CSS arc color override (EXC-Gate-02): DssSlider usa cor via `currentColor` no track fill. DssKnob usa `stroke: var(--dss-action-primary)` diretamente nos arcos SVG — mecanismo diferente, resultado equivalente.
- EXC-Focus-01: QKnob usa `::before + box-shadow`; DssChip usa `outline` direto. DssKnob combina os dois: neutraliza o box-shadow, aplica outline.

---

## 8. Composição e Integração

### Uso básico com v-model

```vue
<script setup>
import { ref } from 'vue'
const volume = ref(60)
</script>

<template>
  <DssKnob v-model="volume" brand="hub">
    {{ volume }}%
  </DssKnob>
</template>
```

### Controle de temperatura com feedback visual

```vue
<script setup>
import { ref, computed } from 'vue'
const temp = ref(20)
const tempBrand = computed(() => temp.value > 30 ? 'waste' : 'water')
</script>

<template>
  <DssKnob v-model="temp" :min="0" :max="40" :step="0.5" :brand="tempBrand">
    {{ temp }}°C
  </DssKnob>
</template>
```

### Com aria-label acessível

```vue
<DssKnob
  v-model="brightness"
  brand="hub"
  aria-label="Brilho da tela"
  :min="0"
  :max="100"
>
  {{ brightness }}%
</DssKnob>
```

### Readonly e Disabled

```vue
<!-- Readonly: exibe valor, não editável, sem indicação visual de inatividade -->
<DssKnob v-model="savedValue" readonly brand="hub" />

<!-- Disabled: opacidade reduzida, sem interação -->
<DssKnob v-model="savedValue" disable brand="hub" />
```

### Anti-patterns de composição

- ❌ **Sem v-model** — `model-value` sem handler `@update:model-value` resulta em valor não controlado
- ❌ **Para progresso não interativo** — use `DssCircularProgress`
- ❌ **Para faixas de dois valores** — use `DssRange`
- ❌ **Sem aria-label em contextos de formulário** — adicionar rótulo acessível obrigatório

---

## 9. Exceções Registradas

| ID | Tipo | Local | Valor | Justificativa |
|----|------|-------|-------|---------------|
| EXC-Gate-01 | Gate Estrutural | `1-structure/DssKnob.ts.vue` | QKnob como root | QKnob gerencia SVG circular, drag/touch, ARIA slider, navegação por teclado. Wrapper seria redundante. |
| EXC-Gate-02 | Gate Estrutural | `1-structure/DssKnob.ts.vue` + `2-composition/_base.scss` | color/track-color/center-color fixos | Garante renderização dos SVG circles; CSS sobrescreve com tokens DSS. |
| EXC-Focus-01 | Focus | `2-composition/_base.scss` | `::before box-shadow` neutralizado + `outline` em `:focus-visible` | QKnob usa `::before` para focus visual; DSS reserva `::before` para touch target. |
| EX-Structural-01 | Estrutural | `2-composition/_base.scss` | `brightness(0.95/0.90)` para hover/active | Valores canônicos DSS da tabela de brightness (0.95/0.90). |
| EX-States-01 | Estado | `4-output/_states.scss` | `* { transition: none; animation: none; 0.01ms; 1 }` | prefers-reduced-motion suprime animação do stroke-dashoffset do arco SVG. |
| EX-States-02 | Estado | `4-output/_states.scss` | `Highlight`, `ButtonText`, `Canvas` | forced-colors SystemColor keywords. `forced-color-adjust` NÃO declarado. |
| EX-States-03 | Estado | `4-output/_states.scss` | `stroke-width: 3`, `outline-width: 3px` | prefers-contrast: more — valores canônicos para arcos SVG sem token DSS. |

---

## 10. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-18 | Claude (DSS Agent) | Criação inicial. Fase 2 Nível 1 — Família Inputs Especializados. |
