# Pré-prompt: DssRating

## 1. CLASSIFICAÇÃO E CONTEXTO

*   **Fase**: 2 — Nível 1 (Independente — sem dependências internas DSS)
*   **Família**: Inputs Especializados
*   **Golden Reference**: DssChip (controle interativo compacto — baseline global de categoria)
*   **Golden Context**: DssKnob (controle de valor numérico interativo, QKnob como root element, brand via dual-selector, tokens idênticos hub-600/water-500/waste-600)
*   **Quasar Base**: `QRating`
*   **Justificativa**: Padronizar a exibição e interação de sistemas de avaliação, garantindo consistência visual e funcional em toda a aplicação, além de facilitar a coleta de feedback do usuário de forma padronizada.
*   **Impacto no Sistema**: A padronização deste componente reduzirá a carga cognitiva do usuário ao fornecer uma interface familiar para avaliações em diferentes módulos do sistema.
*   **Diretrizes de Uso**: Deve ser utilizado sempre que houver necessidade de quantificar a satisfação ou qualidade de um item de forma visual e rápida.

## 2. RISCOS ARQUITETURAIS E GATES

### Grande Risco Arquitetural: Governança de Cores via CSS (EX-Color-01)

O risco central do DssRating é a tentação de passar as props `color`, `color-selected` e `color-half` do QRating ao DSS. **Isso é incorreto** — diferente do DssKnob (que usa EXC-Gate-02 porque o SVG precisa de valores fixos no DOM), o QRating **não adiciona classe `text-*` quando `color=undefined`**, portanto o CSS DSS controla ícones diretamente via cascade sem necessidade de props.

❌ **INCORRETO** — Passar prop `color` ao QRating:
```vue
<!-- NUNCA fazer: DSS perderia governança; consumer poderia sobrescrever -->
<QRating :color="brandColor" color-selected="primary" />
```

✅ **CORRETO** — Governança 100% via CSS cascade (sem EXC-Gate-02):
```vue
<!-- QRating sem prop color → nenhuma classe text-* adicionada → CSS DSS controla via cascade -->
<QRating v-bind="$attrs" :class="rootClasses" ... />
```
```scss
// CSS controla: não-selecionados = --dss-surface-muted, selecionados = --dss-action-primary
.dss-rating .q-rating__icon { color: var(--dss-surface-muted); }
.dss-rating .q-rating__icon--active { color: var(--dss-action-primary); }
```

**Precedente**: DssCircularProgress (prop `color` não passada — governança 100% CSS DSS).

### Gate: EXC-Gate-01 — QRating como root element

QRating gerencia internamente: navegação por teclado (ArrowLeft/Right, Home/End), drag por touch e mouse, ARIA (`role=slider`, `aria-valuemin/max/now`), e renderização de ícones via QIcon. Wrapper div seria redundante e quebraria acessibilidade.

**Precedente**: DssKnob (EXC-Gate-01), DssAjaxBar (EXC-Gate-01), DssInfiniteScroll (EXC-Gate-01).

### Outros Riscos

*   **Customização de ícones**: Consumer pode passar `icon`, `icon-selected`, `icon-half` — forwarded via `$attrs`. DSS não restringe o ícone usado, apenas a cor.
*   **Touch target**: QRating não tem mecanismo de touch target próprio. Consumer deve usar prop `size` para garantir WCAG 2.5.5 (≥ 44px). Documentado em `compositionRecommendations`.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O DssRating será construído com base no componente `QRating` do Quasar, adaptando suas propriedades e eventos para a API do DSS.

| Propriedade Quasar | Propriedade DSS | Tipo | Descrição | Notas |
| :----------------- | :-------------- | :--- | :-------- | :---- |
| `v-model`          | `v-model`       | Number | Valor da avaliação (0-5) | Obrigatório |
| `max`              | `max`           | Number | Número máximo de itens | Padrão: 5 |
| `size`             | `size`          | String | Tamanho dos ícones | `sm`, `md`, `lg` |
| `color`            | `color`         | String | Cor dos ícones | `hub`, `water`, `waste`, etc. |
| `icon`             | `icon`          | String | Ícone a ser usado | Padrão: `star` |
| `icon-half`        | `iconHalf`      | String | Ícone para metade da avaliação | Opcional |
| `icon-selected`    | `iconSelected`  | String | Ícone para avaliação selecionada | Opcional |
| `readonly`         | `readonly`      | Boolean | Componente somente leitura | Padrão: `false` |
| `disable`          | `disabled`      | Boolean | Componente desabilitado | Padrão: `false` |
| `@input`           | `@update:modelValue` | Event | Emitido ao alterar o valor | |

*   **Notas Adicionais sobre a API**:
    *   A propriedade `color` deve aceitar apenas os valores definidos na paleta de cores do DSS (`hub`, `water`, `waste`, etc.).
    *   A propriedade `size` deve mapear para os tamanhos padronizados do DSS, garantindo consistência com outros componentes como botões e ícones.

## 4. GOVERNANÇA DE TOKENS E CSS

O DssRating utiliza exclusivamente tokens do catálogo DSS. Os tokens abaixo são os **12 tokens reais** usados na implementação — não usar outros.

| Token DSS | Aplicação |
|-----------|-----------|
| `--dss-action-primary` | Cor dos ícones selecionados (neutro/sem brand) e ícone de meia avaliação |
| `--dss-surface-muted` | Cor dos ícones não-selecionados |
| `--dss-border-width-md` | Espessura do outline de foco (estado normal) |
| `--dss-border-width-thick` | Espessura do outline de foco (prefers-contrast: more) |
| `--dss-focus-ring` | Cor do outline de foco (neutro/sem brand) |
| `--dss-opacity-disabled` | Opacidade no estado disabled (0.4) |
| `--dss-radius-sm` | border-radius do outline de foco |
| `--dss-duration-150` | Duração da transição de cor e filter |
| `--dss-easing-standard` | Easing da transição |
| `--dss-hub-600` | Ícones selecionados + foco (brand hub) |
| `--dss-water-500` | Ícones selecionados + foco (brand water) |
| `--dss-waste-600` | Ícones selecionados + foco (brand waste) |

**Tokens NÃO existentes (nunca usar)**: `--dss-action-hub`, `--dss-action-water`, `--dss-color-negative`, `--dss-color-surface-default`, `--dss-color-on-surface`, `--dss-spacing-4`, `--dss-duration-200`.

**Restrições**: Nenhum valor hardcoded (`#hex`, `px` arbitrário, `0.95` sem precedente canônico). Valores de `brightness()` permitidos: 0.85, 0.90, 0.92, 0.95 (CLAUDE.md Princípio 8).

## 5. ACESSIBILIDADE E ESTADOS

### Touch Target

**Opção B — Delegado ao consumer via prop `size`**. O QRating não possui mecanismo de touch target próprio que o DSS possa interceptar via `::before`. O DSS documenta em `compositionRecommendations` que o consumer deve usar `size="44px"` ou maior em contextos touch para atender WCAG 2.5.5 (Touch Target Size). Sem `::before` DSS necessário.

### ARIA e Navegação por Teclado

*   **ARIA**: QRating gerencia internamente `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-disabled`. Consumer deve fornecer `aria-label` ou `aria-labelledby` via `$attrs`.
*   **Navegação por teclado**: QRating gerencia internamente ArrowLeft/Right, Home/End, drag por touch e mouse.
*   **Foco**: `outline: var(--dss-border-width-md) solid var(--dss-focus-ring)` em `:focus-visible` (apenas em `.q-rating--editable`). `border-radius: var(--dss-radius-sm)`.

### Estados Aplicáveis

| Estado | Mecanismo | Token |
|--------|-----------|-------|
| hover | `filter: brightness(0.95)` em `.q-rating__icon--hovered` (apenas editable) | `--dss-duration-150`, `--dss-easing-standard` |
| focus | `outline` em `:focus-visible` (apenas editable) | `--dss-border-width-md`, `--dss-focus-ring`, `--dss-radius-sm` |
| active | `filter: brightness(0.90)` durante pressão | — |
| disabled | `opacity: var(--dss-opacity-disabled)` via `[aria-disabled="true"]` | `--dss-opacity-disabled` |
| readonly | `cursor: default` — QRating remove `.q-rating--editable` | — |

### Media Queries de Acessibilidade

*   **`prefers-reduced-motion: reduce`** (EX-States-01): `transition/animation: none !important` no root e em `.q-rating__icon` — QRating anima mudança de ícone no hover via transition, suprimido para WCAG 2.3.3.
*   **`forced-colors: active`** (EX-States-02): `ButtonText` para ícones não-selecionados, `Highlight` para selecionados/hovered. WCAG 1.4.11.
*   **`prefers-contrast: more`** (EX-States-03): `outline-width: var(--dss-border-width-thick)` no foco.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

*   **Dependências**: `QRating` (Quasar), `QIcon` (Quasar).
*   **Composição**: O DssRating é um componente atômico. Pode ser composto em componentes mais complexos como DssCard (para exibir avaliações de produtos) ou DssForm (para coletar feedback).
*   **Integração com outros componentes**:
    *   Pode ser utilizado em conjunto com `DssTooltip` para fornecer informações adicionais sobre o significado de cada nível de avaliação.
    *   Pode ser agrupado com `DssLabel` para fornecer um contexto claro sobre o que está sendo avaliado.

## 7. EXCEÇÕES PREVISTAS

*   **Valores inválidos**: Entrada de `v-model` fora do range `0` a `max` deve ser tratada (e.g., clamp para o valor mais próximo).
*   **Ícones personalizados**: Permitir a substituição dos ícones padrão por SVGs ou outros componentes de ícone, garantindo que a acessibilidade seja mantida.
*   **Temas**: Garantir que o componente se adapte corretamente a diferentes temas (claro/escuro) através do uso de tokens de cor.
*   **Comportamento em formulários**: Quando utilizado dentro de um formulário, o componente deve integrar-se corretamente com a validação do formulário, exibindo mensagens de erro apropriadas se a avaliação for obrigatória e não for fornecida.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios

*   **`v-model`**: Slider numérico de 0 a 5.
*   **`max`**: Selector numérico (3, 5, 10).
*   **`size`**: Dropdown (`sm`, `md`, `lg`).
*   **`color`**: Dropdown de cores do DSS (`hub`, `water`, `waste`, `positive`, `warning`, `info`, `dark`, `grey-7`).
*   **`icon`**: Input de texto para nome do ícone (e.g., `star`, `favorite`, `thumb_up`).
*   **`iconHalf`**: Input de texto para nome do ícone de metade (e.g., `star_half`).
*   **`iconSelected`**: Input de texto para nome do ícone selecionado (e.g., `star`).
*   **`readonly`**: Checkbox.
*   **`disabled`**: Checkbox.

### Composite Logic

*   **Exemplo 1 (Avaliação de Produto)**: Exibir DssRating dentro de um DssCard para um produto, mostrando a avaliação média e permitindo que o usuário altere sua própria avaliação. O componente deve reagir a mudanças de estado e atualizar a interface de acordo.
*   **Exemplo 2 (Formulário de Feedback)**: Integrar DssRating em um DssForm para coletar feedback de satisfação do usuário após uma interação. O componente deve ser validado antes do envio do formulário.
*   **Exemplo 3 (Lista de Avaliações)**: Exibir múltiplos componentes DssRating em uma lista de comentários, todos em modo `readonly`, para mostrar as avaliações dadas por diferentes usuários.

### Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `v-model` | Exibir o valor numérico atual da avaliação. | Number | — |
| `isHovering` | Indicar se o mouse está sobre o componente. | Boolean | Mouse over |
| `isFocused` | Indicar se o componente está focado. | Boolean | Navegação por teclado (Tab) |
| `isValid` | Indicar se o valor da avaliação está dentro dos limites válidos. | Boolean | — |
| `isDirty` | Indicar se o valor foi alterado pelo usuário. | Boolean | — |
