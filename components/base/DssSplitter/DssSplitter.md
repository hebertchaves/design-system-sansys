# DssSplitter — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssSplitter` é um container de layout interativo que permite ao usuário redimensionar dinamicamente o espaço entre dois painéis adjacentes via arrasto do separador ou teclado. Substitui o uso direto do `QSplitter` do Quasar, fornecendo governança de tokens DSS, brandabilidade e acessibilidade WCAG 2.1 AA.

**Quando usar:**
- Quando dois painéis de conteúdo devem ter tamanhos ajustáveis pelo usuário (painéis de código/preview, editor/outline, mapa/detalhes)
- Em interfaces de desenvolvimento, dashboards com widgets redimensionáveis, ou visualizações side-by-side
- Quando o usuário precisa controlar a proporção de espaço entre dois contextos distintos

**Quando NÃO usar:**
- Para layout de página fixo sem necessidade de redimensionamento pelo usuário (use grid/flexbox no CSS)
- Para conteúdo que colapsa/expande via toggle (use `DssExpansionItem`)
- Para separadores visuais estáticos sem interação (use `DssSeparator`)
- Para aninhamento excessivo (> 2 níveis de splitters): risco de UX confusa e performance degradada

---

## 2. Classificação DSS

- **Tipo:** Divisor redimensionável entre dois painéis de layout
- **Categoria:** Layout Auxiliar
- **Fase:** 2 — Nível 1 (Independente)
- **Família:** Layout Auxiliar
- **Interativo:** Sim (separador é arrastável e navegável por teclado)
- **Quasar Base:** `QSplitter`

---

## 3. API

*(ver [DSSSPLITTER_API.md](./DSSSPLITTER_API.md) para referência completa)*

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `Number` | `50` | Posição do separador (compatível com `v-model`) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientação do layout |
| `limits` | `[Number, Number]` | `[0, 100]` | Limites `[min, max]` do separador |
| `reverse` | `Boolean` | `false` | Inverte a ordem visual dos painéis |
| `disabled` | `Boolean` | `false` | Desativa o separador |
| `emitImmediately` | `Boolean` | `false` | Emite durante o arrasto (vs. apenas no final) |
| `unit` | `'%' \| 'px'` | `'%'` | Unidade do modelValue |

### Slots

| Slot | Descrição |
|------|-----------|
| `before` | Primeiro painel (esquerdo em horizontal, superior em vertical) |
| `after` | Segundo painel (direito em horizontal, inferior em vertical) |
| `separator` | Conteúdo personalizado do separador (opcional) |

### Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `Number` | Nova posição do separador |

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Separador com cor neutra `--dss-gray-200` |
| hover | ✅ | Separador destaca com `--dss-gray-400`; brand usa `--dss-action-{brand}` |
| active | ✅ | Separador destaca com `--dss-gray-600` durante o arrasto (`:active` CSS) |
| focus | ✅ | Focus ring via `--dss-focus-shadow-primary` (WCAG 2.4.7) |
| disabled | ✅ | `opacity: var(--dss-opacity-disabled)`, `pointer-events: none` |
| loading | — | Responsabilidade do conteúdo interno dos painéis |
| error | — | Responsabilidade do conteúdo interno; não se aplica ao container de layout |

---

## 5. Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-gray-200` | — | Cor padrão do separador |
| `--dss-gray-400` | — | Separador em hover (light) / active em dark |
| `--dss-gray-500` | — | Separador hover em dark mode |
| `--dss-gray-600` | — | Separador em active/drag |
| `--dss-gray-700` | — | Separador default em dark mode |
| `--dss-gray-800` | — | Separador hover em prefers-contrast: more |
| `--dss-gray-900` | — | Separador active em prefers-contrast: more |
| `--dss-duration-250` | 250ms | Duração da transição de cor |
| `--dss-easing-ease-out` | — | Curva de animação |
| `--dss-touch-target-md` | 44px | Área mínima de toque — `::before` no separador |
| `--dss-opacity-disabled` | 0.4 | Opacidade no estado disabled |
| `--dss-focus-shadow-primary` | — | Shadow de foco (WCAG 2.4.7) |
| `--dss-action-hub` | — | Separador hover/active em brand="hub" |
| `--dss-action-water` | — | Separador hover/active em brand="water" |
| `--dss-action-waste` | — | Separador hover/active em brand="waste" |

---

## 6. Acessibilidade

- **WCAG 2.1 AA:** Componente interativo — conformidade garantida pelo QSplitter e pelos tokens DSS de foco/contraste.
- **Touch target (WCAG 2.5.5):** Opção B — `::before` no `.q-splitter__separator` expande área de toque para `var(--dss-touch-target-md)` (44×44px) sem afetar o layout visual.
- **ARIA:**
  - QSplitter renderiza nativamente `role="separator"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-orientation` no separador — DSS preserva todos.
  - Os valores ARIA refletem `modelValue` e `limits` em tempo real durante o drag.
- **Navegação por teclado:**
  - `Tab` — foca o separador
  - `←` / `→` — ajusta posição (horizontal)
  - `↑` / `↓` — ajusta posição (vertical)
  - `Home` / `End` — move para os limites
  - Gerenciado nativamente pelo QSplitter — DSS não interfere.
- **Contraste:** Separador usa `--dss-gray-200` em light (pode ser baixo em fundos claros). Em `prefers-contrast: more`, upgraded para `--dss-gray-600` com `border: 1px solid currentColor`.
- **Modo forçado de cores:** Separador usa `ButtonText` (SystemColor keyword — WCAG 1.4.11). Focus ring usa `Highlight`.
- **Movimento reduzido:** Transições do separador removidas via `@media (prefers-reduced-motion: reduce)`.

---

## 7. Comportamentos Implícitos

### inheritAttrs: false + forwarding
`DssSplitter` declara `inheritAttrs: false`. Todos os `$attrs` (id, class extra, style, data-*) são encaminhados ao elemento root `q-splitter` via `v-bind="$attrs"`.

### Mapeamento de `orientation`
| DSS | Quasar QSplitter `:horizontal` | Layout resultante |
|-----|-------------------------------|-------------------|
| `'horizontal'` (default) | `false` | Painéis lado a lado, separador vertical |
| `'vertical'` | `true` | Painéis empilhados, separador horizontal |

### Dimensionamento
`DssSplitter` aplica `width: 100%; height: 100%` no root. É responsabilidade do consumidor definir a altura do container (via `style="height: 400px"` ou contexto de layout pai). Sem altura explícita no modo `orientation='vertical'`, o QSplitter pode não exibir ambos os painéis.

### Props bloqueadas
`separator-class`, `separator-style`, `dark`, `before-class` e `after-class` do QSplitter não são expostas. A aparência do separador é governada exclusivamente pelos tokens DSS em `2-composition/_base.scss` e `4-output/`.

### `unit='px'` e `limits`
Quando `unit='px'`, os `limits` também devem estar em pixels. Use para fixar o painel `before` em um tamanho absoluto (ex: sidebar de 240px fixo com `modelValue=240`, `unit='px'`, `limits=[120, 400]`).

---

## 8. Paridade com Golden Components

### Golden Reference: DssChip
| Aspecto | DssChip | DssSplitter | Justificativa |
|---------|---------|-------------|---------------|
| `defineOptions` | ✅ `name` | ✅ `name`, `inheritAttrs: false` | Mesma estrutura; `inheritAttrs: false` adicional para forwarding |
| `inheritAttrs + forwarding` | N/A | ✅ `v-bind="$attrs"` no root | Container precisa encaminhar attrs ao root |
| Touch target `::before` | ✅ no root | ✅ no `.q-splitter__separator` | Touch target no elemento INTERATIVO (separador), não no container |
| Focus ring | ✅ via mixin | ✅ `box-shadow: var(--dss-focus-shadow-primary)` direto | Elemento-alvo é descendente interno do Quasar; mixin não aplicável diretamente |
| Hover state | ✅ `::after` visual | ✅ `background-color` no separator | Separador é o elemento hover-alvo |
| Active state | ✅ `:active` | ✅ `:active` | Consistente |
| Disabled state | ✅ opacity + events | ✅ opacity + pointer-events: none | Consistente |

### Golden Context: DssSlider
| Aspecto | DssSlider | DssSplitter | Justificativa |
|---------|-----------|-------------|---------------|
| Quasar root | Wrapper div + QSlider | QSplitter como root | DssSplitter usa EXC-Gate-01 (sem wrapper); DssSlider usa wrapper por precisar de hint/error externos |
| EXC-Gate-02 | ✅ `.q-slider__*` | ✅ `.q-splitter__separator` | Mesmo padrão de descendant selectors |
| Brand theming | `--dss-action-{brand}` via cascade | `--dss-action-{brand}` em brands.scss | Mesmo padrão |
| Disabled | `opacity: var(--dss-opacity-disabled)` | `opacity: var(--dss-opacity-disabled)` | Idêntico |
| Touch target | Opção A (min-height na track container) | Opção B (`::before` no separator) | DssSlider usa o elemento pai da área interativa; DssSplitter usa `::before` diretamente no elemento interativo |
| Focus ring | `box-shadow: var(--dss-shadow-focus)` | `box-shadow: var(--dss-focus-shadow-primary)` | Token ligeiramente diferente (DssSlider usa token legado) |

---

## 9. Anti-patterns de Composição

- ❌ Usar `DssSplitter` sem definir `height` explícita no contexto pai (especialmente em `orientation='vertical'`)
- ❌ Aninhar mais de 2 níveis de `DssSplitter` — risco de UX confusa e performance
- ❌ Passar `separator-class` ou `separator-style` — governado por CSS DSS
- ❌ Usar `DssSplitter` para separador estático (sem necessidade de drag) — use `DssSeparator`
- ❌ Definir `limits=[0, 100]` com conteúdo que não se adapta ao colapso total de um painel

---

## 10. Matriz de Composição DSS

| Componente | Relação | Uso típico |
|------------|---------|------------|
| `DssCard` | Filho recomendado | Container estruturado para o conteúdo de cada painel |
| `DssScrollArea` | Filho recomendado | Para conteúdo longo dentro dos painéis |
| `DssSeparator` | Alternativa estática | Quando não há necessidade de drag/redimensionamento |
| `DssLayout` | Container pai recomendado | DssSplitter com `height: 100%` dentro de DssLayout |
| `DssExpansionItem` | Alternativa colapsável | Quando o painel deve abrir/fechar via toggle (não drag) |

---

## 11. Exceções Registradas

| ID | Regra Violada | Justificativa | Local |
|----|---------------|---------------|-------|
| EXC-Gate-01 | Gate de Composição v2.4 — Quasar como root | QSplitter como root direto; sem wrapper. Evita DOM desnecessário. Precedente: DssScrollArea, DssInfiniteScroll. | `1-structure/DssSplitter.ts.vue` |
| EXC-Gate-02 | Seletores internos Quasar | `.q-splitter__separator` sem CSS hooks públicos; estilização via descendant selectors em CSS global | `2-composition/_base.scss`, `4-output/` |
| EXC-States-01 | Dark mode focus ring | `--dss-focus-shadow-primary-dark` não existe; usa `outline: 2px solid white` hardcoded. Precedente: DssToggle, DssSlider. | `4-output/_states.scss` |

---

## 12. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-19 | Claude (DSS Agent) | Criação inicial — wrapper sobre QSplitter |
