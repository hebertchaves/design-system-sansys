# DssSlider — Documentação Normativa DSS v2.2

**Versão**: 1.0.0 | **Status**: Pending Audit | **Fase**: 1

---

## 1. Identidade e Papel Semântico

O `DssSlider` é um **Action Control interativo** do tipo campo de intervalo numérico. Representa uma faixa contínua ou discreta entre valores mínimo e máximo, permitindo ao usuário selecionar um valor numérico por arrasto ou navegação por teclado.

**Categoria**: Form Control — Range Input
**Papel semântico**: `role="slider"` (implícito no QSlider / `<input type="range">`)
**Implementação**: Wrapper do `QSlider` do Quasar Framework

### O que este componente faz

- Permite seleção de um valor numérico em uma faixa contínua ou por passos
- Exibe visualmente a posição relativa do valor na escala
- Suporta tooltip de label durante arrasto (ou permanentemente via `labelAlways`)
- Exibe marcadores visuais de passo opcionais
- Integra estado de erro com `errorMessage` e hint
- Responde a brand tokens via `[data-brand]` no contexto ou via prop `brand`

### O que este componente NÃO faz

- Não suporta seleção de intervalo (range min–max) → use DssRangeSlider (Fase 2)
- Não fornece label flutuante (não é QField) → use label HTML externo
- Não valida o valor numérico — validação é responsabilidade do formulário pai
- Não expõe prop `color` — cor governada exclusivamente por tokens DSS

---

## 2. Golden Component

### Golden Reference: DssToggle

`DssToggle` é o **Golden Reference** da categoria de controles com track e thumb. Fornece o padrão para:

- Uso de tokens de motion (`--dss-duration-200`, `--dss-easing-standard`) para transições
- Uso de `border-radius: 9999px` como exceção para pill shape
- Padrão de hover/active com `brightness(0.95/0.90)` e dark mode `brightness(1.10/1.20)`
- Padrão de disabled state via `--dss-opacity-disabled` + `pointer-events: none`
- Estrutura de `_states.scss` com media queries em ordem: dark → contrast → reduced-motion → print → forced-colors

### Golden Context: DssInput

`DssInput` (selado Jan 2026) é o **Golden Context** de auditoria para controles de formulário interativos. Estabelece:

- Touch Target Option A: `min-height: var(--dss-touch-target-md)` na área interativa (44px WCAG 2.5.5)
- Dense mode reduz para `--dss-touch-target-sm` (36px) — uso contextual explicitamente documentado
- Padrão de hint/error messages abaixo do controle
- Error state com token semântico de feedback
- Padrão de `disabled` via opacidade + `pointer-events: none`

---

## 3. Touch Target

**Estratégia**: Opção A — controle interativo com área de toque explícita

**Implementação**:
```scss
.dss-slider .q-slider__track-container {
  min-height: var(--dss-touch-target-md); /* 44px — WCAG 2.5.5 SC 2.5.5 */
}
```

O `QSlider` usa o `.q-slider__track-container` como sua área de interação principal. Ao garantir `min-height: 44px` neste elemento, satisfazemos o requisito WCAG 2.5.5 sem sobrepor a lógica interna do Quasar de posicionamento do thumb.

**Dense mode**: `min-height: var(--dss-touch-target-sm)` (36px) — uso contextual explicitamente documentado para contextos de alta densidade visual (painéis de configuração, dashboards).

**`::before`**: Não utilizado — o `q-slider__track-container` é o próprio touch target. Pseudo-elemento não é necessário. Decisão consistente com DssInput e DssSelect (Jan/Mar 2026).

---

## 4. Implementação como Wrapper QSlider

### Decisão Arquitetural

O `DssSlider` usa um **wrapper externo** (`<div class="dss-slider">`) ao invés de fazer o QSlider ser o elemento raiz (como DssSelect faz com QSelect). Isso é necessário porque:

1. **QSlider não é QField** — não suporta hint, error, label flutuante nativamente
2. **Hint e errorMessage** precisam ser renderizados **abaixo** do controle
3. O `data-brand` e as classes DSS precisam de um container para abranger o controle e suas mensagens

### Consequência de inheritAttrs

Como o wrapper `<div>` é o elemento raiz, `inheritAttrs: false` é declarado e `v-bind="$attrs"` é aplicado explicitamente ao QSlider. Isso garante que atributos HTML adicionais (como `id`, `class` externo) sejam passados ao controle, não ao div wrapper.

### Override de Cor

O QSlider usa a prop `color` internamente para aplicar classes Quasar (`.text-{color}`) no root, que propagam via `currentColor`. O DssSlider **não repassa** a prop `color` ao QSlider. Em vez disso, o SCSS sobrescreve via seletores descendentes:

```scss
.dss-slider .q-slider { color: var(--dss-action-primary); }
.dss-slider .q-slider__selection { background-color: var(--dss-action-primary); }
.dss-slider .q-slider__thumb-shape { fill: var(--dss-action-primary); }
```

Como `[data-brand="hub"]` sobrescreve `--dss-action-primary: var(--dss-hub-600)` no catálogo de tokens, a brandabilidade é **automática via cascade** — sem regras CSS adicionais para fill e thumb em `_brands.scss`.

---

## 5. Estados

| Estado | Implementação | Token |
|--------|--------------|-------|
| default | Repouso — track muted + fill primary | `--dss-surface-muted`, `--dss-action-primary` |
| hover | `brightness(0.95)` em fill e thumb | Exceção canônica DSS |
| focus | Focus ring via `.q-slider__focus-ring` | `--dss-shadow-focus` |
| active | Thumb pressionado — `brightness(0.90)` | Exceção canônica DSS |
| disabled | Opacidade reduzida + pointer-events: none | `--dss-opacity-disabled`, `--dss-gray-400` |
| readonly | pointer-events: none, cursor: default | Sem tokens adicionais |
| error | Fill + thumb + messages em --dss-feedback-error | `--dss-feedback-error` |
| loading | **NÃO aplicável** — Fase 1, valor síncrono | — |
| indeterminate | **NÃO aplicável** — slider é contínuo, não tristate | — |

---

## 6. Acessibilidade

### ARIA

- `role="slider"` — implícito no QSlider (gerenciado internamente)
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` — gerenciados pelo QSlider
- `aria-label` — prop `ariaLabel` repassada ao QSlider. **Obrigatório** quando não há label visual associado
- `aria-describedby` — associa o slider à `errorMessage` via ID único por instância quando `error=true`
- `aria-disabled` — implícito via prop `disable` no QSlider quando `disabled=true`

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| Tab | Foca o slider |
| Arrow Left / Down | Decrementa um passo |
| Arrow Right / Up | Incrementa um passo |
| Home | Define valor mínimo |
| End | Define valor máximo |
| Page Up | Incrementa múltiplos passos |
| Page Down | Decrementa múltiplos passos |

(Comportamento nativo do QSlider — gerenciado pelo Quasar)

### Focus Ring

Focus ring aplicado via `.q-slider__focus-ring` sobrescrito com `--dss-shadow-focus`. Cor de brand via `_brands.scss` (hub-600, water-500, waste-600 substituem o azul padrão).

### Acessibilidade de Mensagens

- `hint`: texto informativo, lido por screen readers via DOM (sem role especial)
- `errorMessage`: `role="alert"` + `aria-live="assertive"` — anunciado imediatamente quando `error` torna-se `true`

---

## 7. Brandabilidade

DssSlider suporta os três produtos Sansys via dois mecanismos:

### Mecanismo 1: Cascade Automático via --dss-action-primary

O principal token de cor (`--dss-action-primary`) é sobrescrito automaticamente por `[data-brand="x"]` no catálogo de tokens:
- `[data-brand="hub"]` → `--dss-action-primary: var(--dss-hub-600)` (laranja)
- `[data-brand="water"]` → `--dss-action-primary: var(--dss-water-500)` (azul)
- `[data-brand="waste"]` → `--dss-action-primary: var(--dss-waste-600)` (verde)

Isso significa que **fill da trilha, thumb e label tooltip** recebem a cor de brand **sem regras CSS adicionais** em `_brands.scss`.

### Mecanismo 2: Focus Ring Explícito (em _brands.scss)

O `--dss-shadow-focus` usa `rgba` fixo azul por padrão. O `_brands.scss` sobrescreve explicitamente o `box-shadow` do `.q-slider__focus-ring` para cada brand com o token numérico da marca.

### Aplicação

```vue
<!-- Via prop (mesmo elemento) -->
<DssSlider v-model="value" brand="hub" />

<!-- Via contexto ancestral -->
<div data-brand="water">
  <DssSlider v-model="value" />
</div>
```

---

## 8. Anti-Patterns

1. **Usar DssSlider para seleção de intervalo (range)** → `DssRangeSlider` (Fase 2)
2. **Definir cor via prop `color`** — DssSlider não expõe prop de cor. A cor é governada por tokens DSS via SCSS
3. **Usar DssSlider sem `ariaLabel` quando não há label visual** — viola WCAG 1.3.1 (Informação e Relações)
4. **Usar `vertical=true` sem definir `height` no container pai** — o QSlider não possui altura padrão em modo vertical, resultando em componente colapsado

---

## 9. Paridade com Golden Context (DssInput)

| Critério | DssInput | DssSlider | Justificativa da Divergência |
|----------|----------|-----------|------------------------------|
| Touch Target | Opção A, `min-height` no `.q-field__control` | Opção A, `min-height` no `.q-slider__track-container` | QSlider não usa QField — a área interativa é o track-container |
| Label flutuante | Sim (`label` prop flutuante) | Não | QSlider não é QField — label deve ser HTML externo |
| Variantes visuais | outlined / filled / standout / borderless | Nenhuma (Fase 1) | Slider tem única apresentação visual — variantes por espessura de trilha são Fase 2 |
| Hint/Error abaixo | Gerenciado pelo QField | Gerenciado pelo wrapper div | QSlider não é QField — renderização própria |
| Token de erro | `--dss-error-600` | `--dss-feedback-error` | Spec do pré-prompt; `--dss-feedback-error` é semanticamente correto para feedback de formulário |
| Dense mode | Reduz `min-height` para `--dss-input-height-sm` | Reduz `min-height` para `--dss-touch-target-sm` | Usa token touch target moderno (não deprecated) |
| Brand | `[data-brand]` + override numeric tokens | `--dss-action-primary` cascade + focus ring explícito | Track/thumb via cascade automático — pattern mais elegante para este componente |

---

## 10. Exceções Documentadas

| ID | Descrição | Justificativa |
|----|-----------|---------------|
| EX-01 | `border-radius: 9999px` no track e selection | Pill shape inerente ao slider. Sem token DSS para full-round radius. Precedente: DssToggle track |
| EX-02 | `border-radius: 50%` no focus ring | Forma circular para envolver o thumb circular. Sem token DSS para circle radius. Precedente: DssToggle thumb |
| EX-03 | `brightness(0.95)` hover / `brightness(0.90)` active | Valores canônicos DSS (CLAUDE.md Princípio #8). Precedente: DssToggle, DssCheckbox |
| EX-04 | `brightness(1.10)` hover dark / `brightness(1.20)` active dark | Valores canônicos DSS para dark mode (CLAUDE.md Princípio #8) |
| EX-05 | `saturate(1.2)` em high contrast | Valor canônico DSS. Precedente: DssToggle |
| EX-06 | `2px`, `3px` em `@media (forced-colors: active)` | Tokens CSS custom properties são ignorados pelo Windows HCM. Precedente: DssTextarea, DssToggle |

---

## 11. Uso Previsto em Componentes Futuros

- **DssRangeSlider** (Fase 2): Slider de dois handles para seleção de intervalo min–max. Será implementado como componente independente baseado no QRange do Quasar, seguindo este componente como Golden Context.
- **DssForm** (Fase 2): Contexto de formulário que agrupará DssSlider com label externo, validação e layout grid.
- **DssFilterPanel** (Fase 2): Painel de filtros que usará DssSlider para filtros numéricos (preço, distância, temperatura).
