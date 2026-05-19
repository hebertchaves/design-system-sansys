# DssRating — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssRating` é um controle interativo de avaliação por ícones, baseado no `QRating` do Quasar, que permite ao usuário selecionar um valor em uma escala visual (tipicamente estrelas). Suporta escalas personalizadas, ícones customizados, meia-avaliação e modo de exibição somente leitura.

**Quando usar:**
- Coleta de feedback do usuário sobre qualidade, satisfação ou desempenho de um item.
- Exibição de avaliações existentes em listas, cards ou feeds (modo `readonly`).
- Formulários de pesquisa que quantificam percepção em escala visual.

**Quando NÃO usar:**
- Para seleção de opções mutuamente exclusivas não numéricas → usar `DssRadio` ou `DssToggle`.
- Para deslizamento contínuo de valores sem representação discreta por ícone → usar `DssSlider`.
- Para avaliações com texto descritivo por nível → usar `DssOptionGroup`.

---

## 2. Classificação DSS

| Campo | Valor |
|-------|-------|
| **Tipo** | Compact Control — Interativo |
| **Família** | Inputs Especializados |
| **Fase** | 2 — Nível 1 |
| **Interativo** | Sim (v-model, teclado, touch, mouse) |
| **Quasar Base** | `QRating` |
| **Golden Reference** | `DssChip` |
| **Golden Context** | `DssKnob` |

---

## 3. API Resumida

> Referência completa em [DSSRATING_API.md](./DSSRATING_API.md).

### Props Principais

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `model-value` | `number` | required | Valor atual (v-model) |
| `max` | `number` | `5` | Número máximo de ícones |
| `size` | `string` | — | Tamanho CSS dos ícones |
| `icon` | `string\|string[]` | `'star'` | Ícone base |
| `icon-selected` | `string\|string[]` | — | Ícone selecionado |
| `icon-half` | `string\|string[]` | — | Ícone de meia avaliação |
| `no-reset` | `boolean` | `false` | Impede reset ao clicar no valor atual |
| `readonly` | `boolean` | `false` | Exibição sem interação |
| `disable` | `boolean` | `false` | Desabilitado com opacidade |
| `brand` | `'hub'\|'water'\|'waste'` | — | Cor dos ícones selecionados |

### Props Bloqueadas

| Prop Quasar | Substituto DSS |
|-------------|----------------|
| `color` | CSS `var(--dss-surface-muted)` para não-selecionados |
| `color-selected` | CSS `var(--dss-action-primary)` + brand tokens |
| `color-half` | CSS `var(--dss-action-primary)` |

### Eventos

| Evento | Payload | Gatilho |
|--------|---------|---------|
| `update:modelValue` | `number` | Click ou teclado |

### Slots

DssRating não expõe slots públicos. Ícones são controlados pelas props `icon`, `icon-selected`, `icon-half`.

---

## 4. Estados

| Estado | Implementado | Mecanismo | Observação |
|--------|-------------|-----------|------------|
| hover | ✅ | `filter: brightness(0.95)` no `--hovered` | Apenas quando `.q-rating--editable` |
| focus | ✅ | `outline` DSS em `:focus-visible` | `border-radius: var(--dss-radius-sm)` |
| active | ✅ | `filter: brightness(0.90)` no `--hovered` durante pressão | Apenas quando `.q-rating--editable` |
| disabled | ✅ | `opacity: var(--dss-opacity-disabled)` via `[aria-disabled="true"]` | QRating gerencia pointer-events |
| readonly | ✅ | `cursor: default` via `:not(.q-rating--editable)` | Sem opacidade (readonly ≠ disabled) |
| loading | — | QRating é síncrono — sem estado de carregamento | Fora do escopo |
| error | — | Responsabilidade do formulário pai | Usar wrapper com aria-invalid |
| print | — | Delegado ao browser | Sem display:none |

---

## 5. Brandabilidade

DssRating reage ao sistema de brand DSS via dois mecanismos:

**Prop `brand`** (direta):
```vue
<DssRating v-model="val" brand="hub" />   <!-- ícones selecionados em --dss-hub-600 -->
<DssRating v-model="val" brand="water" /> <!-- ícones selecionados em --dss-water-500 -->
<DssRating v-model="val" brand="waste" /> <!-- ícones selecionados em --dss-waste-600 -->
```

**Herança via ancestral** (`[data-brand]`):
```vue
<div data-brand="hub">
  <DssRating v-model="val" /> <!-- Herda cor hub automaticamente, sem prop brand -->
</div>
```

**O que varia por brand:**
- Cor dos ícones selecionados (`.q-rating__icon--active`, `.q-rating__icon--half`, `.q-rating__icon--hovered`)
- Cor do outline de foco (`outline-color`)

**O que NÃO varia por brand:**
- Ícones não-selecionados → sempre `--dss-surface-muted`

---

## 6. Tokens Utilizados

| Token | Valor de referência | Aplicação |
|-------|---------------------|-----------|
| `--dss-action-primary` | varia | Ícones selecionados (neutro/sem brand) |
| `--dss-surface-muted` | varia | Ícones não-selecionados |
| `--dss-border-width-md` | 2px | Outline de foco |
| `--dss-border-width-thick` | 3px | Outline de foco em alto contraste |
| `--dss-focus-ring` | varia | Cor do outline de foco |
| `--dss-opacity-disabled` | 0.4 | Opacidade disabled |
| `--dss-radius-sm` | 4px | Border-radius do focus outline |
| `--dss-duration-150` | 150ms | Duração das transições |
| `--dss-easing-standard` | `cubic-bezier(0.4,0,0.2,1)` | Curva das transições |
| `--dss-hub-600` | #F57C00 aprox. | Ícones selecionados — brand hub |
| `--dss-water-500` | #1E88E5 aprox. | Ícones selecionados — brand water |
| `--dss-waste-600` | #43A047 aprox. | Ícones selecionados — brand waste |

---

## 7. Acessibilidade (WCAG 2.1 AA)

### ARIA
- `role="slider"` gerenciado pelo QRating.
- `aria-valuemin=0`, `aria-valuemax={max}`, `aria-valuenow={modelValue}` gerenciados automaticamente.
- Para rótulo: adicionar `aria-label` ou `aria-labelledby` (forwarded via `$attrs`).

### Navegação por Teclado
| Tecla | Ação |
|-------|------|
| `Tab` | Foca o componente |
| `ArrowRight` / `ArrowUp` | +1 |
| `ArrowLeft` / `ArrowDown` | −1 |
| `Home` | Define para 0 |
| `End` | Define para `max` |

### Touch Target (WCAG 2.5.5)
O tamanho mínimo de cada ícone deve ser **44×44px** em interfaces touch. O default do QRating (~24px) pode ser insuficiente. Usar `size="44px"` ou maior para contextos mobile.

```vue
<!-- Mobile: touch target adequado -->
<DssRating v-model="val" size="44px" aria-label="Avaliação" brand="hub" />
```

### Focus Visível (WCAG 2.4.11)
Anel de foco visível em `:focus-visible` com `outline: var(--dss-border-width-md) solid var(--dss-focus-ring)` e `border-radius: var(--dss-radius-sm)`.

### High Contrast Mode (WCAG 1.4.11)
Em `forced-colors: active`:
- Ícones não-selecionados: `ButtonText`
- Ícones selecionados e hover: `Highlight`
- Focus ring: `Highlight`

---

## 8. Exceções Registradas

| ID | Classificação | Resumo |
|----|---------------|--------|
| EXC-Gate-01 | Gate | QRating como root element (sem wrapper div) |
| EX-Color-01 | Color | Cores via CSS cascade puro — sem props Quasar color/color-selected/color-half |
| EX-Structural-01 | Structural | `filter: brightness(0.95/0.90)` nos ícones hovered (valores canônicos DssChip) |
| EX-States-01 | States | `prefers-reduced-motion`: transition none nos ícones |
| EX-States-02 | States | `forced-colors: active` com SystemColor keywords |
| EX-States-03 | States | `prefers-contrast: more`: `outline-width: var(--dss-border-width-thick)` |

---

## 9. Comportamentos Implícitos

### Forwarding e inheritAttrs

- `inheritAttrs: false` declarado em `defineOptions`. Todos os atributos HTML não reconhecidos (ex: `aria-label`, `aria-labelledby`, `data-*`, `tabindex`) são forwarded via `v-bind="$attrs"` diretamente ao `QRating` root.
- Resultado: `<DssRating aria-label="Avaliação" />` aplica `aria-label` no elemento Quasar correto (o `role="slider"`), não em um wrapper intermediário.

### Sem Slots

- `QRating` não expõe slots públicos — o conteúdo dos ícones é controlado via props `icon`, `icon-selected`, `icon-half`.
- Consumidores não devem tentar passar conteúdo via slot default (ignorado silenciosamente pelo Quasar).

### Estados Não Aplicáveis (Declarados Explicitamente)

| Estado | Motivo de N/A |
|--------|---------------|
| loading | QRating é síncrono — não há operação assíncrona |
| error | Responsabilidade do formulário pai (DssField, wrapper com aria-invalid) |
| print | Delegado ao browser — ícones podem ser relevantes em documentos impressos |

### Props Bloqueadas — Comportamento Implícito

As props `color`, `color-selected` e `color-half` do QRating são bloqueadas no DssRating (não expostas). Tentar passá-las via `$attrs` não terá efeito pois o QRating apenas exibe cores via `text-*` classes Quasar, e sem a prop, essas classes não são geradas. O CSS DSS controla diretamente via cascade.

---

## 9.1 Matriz de Composição DSS

### Papel Estrutural

`DssRating` é um **componente atômico interativo** (Compact Control). Não instancia filhos DSS automaticamente — é folha na hierarquia de composição.

### Componentes DSS — Classificação de Uso

| Componente DSS | Classificação | Papel na Composição |
|----------------|---------------|---------------------|
| `DssTooltip` | 🟢 Existente | Wrap externo para descrever cada nível de avaliação (ex: "1 = Péssimo") |
| `DssCard` | 🟢 Existente | Container para exibição de avaliações de produtos/serviços |
| `DssForm` | 🟡 Planejado | Wrapper para coleta de avaliação com validação |
| `DssField` | 🟡 Planejado | Fornece label, hint, error-message para o rating em formulários |
| `DssLabel` | ⚪ Inexistente | Rótulo associado para contexto da avaliação |

### Declaração de Impacto

- **Existentes**: DssTooltip, DssCard
- **Planejados**: DssForm, DssField
- **Inexistentes**: DssLabel

**Risco se DssLabel não existir**: Baixo — consumidor usa HTML nativo `<label>` ou `aria-labelledby` forwarded via `$attrs`.
**Impacto arquitetural**: Mínimo — DssRating funciona de forma autônoma, acessibilidade garantida via ARIA forwarding.
**Recomendação**: DssLabel pode ser desenvolvido como utilitário futuro; não é bloqueante.

### Limites de Responsabilidade

- ✅ **DssRating faz**: Exibe escala visual de ícones, gerencia interação e valor, aplica brandabilidade, garante acessibilidade ARIA.
- ❌ **DssRating NÃO faz**: Validação de formulário, exibição de mensagens de erro, rótulo textual associado, agrupamento de múltiplas avaliações.

### Governança de Extensão

- Para adicionar validação: encapsular com DssField (quando disponível) ou wrapper com `aria-invalid`.
- Para múltiplos ratings em lista: repetir o componente individualmente com `readonly`.
- Para rating com texto por nível: combinar com DssTooltip via `[data-tooltip]` por posição.

### Anti-Patterns de Composição

- ❌ Usar `::v-deep` para sobrescrever ícones internos do QRating — usar props `icon`/`icon-selected`.
- ❌ Passar `color`, `color-selected` via `$attrs` — props bloqueadas.
- ❌ Usar `disable` para exibição de avaliações existentes — usar `readonly`.
- ❌ Não fornecer `aria-label` ou `aria-labelledby` — leitores de tela ficam sem contexto.
- ❌ Usar `size` < `44px` em interfaces touch — viola WCAG 2.5.5.

---

## 10. Composição e Integração (Recomendações de Uso)

### Recomendações de Composição

- Usar `v-model` para ligação bidirecional do valor.
- Adicionar `aria-label` ou `aria-labelledby` para rótulo acessível.
- Garantir `size >= '44px'` em contextos touch (WCAG 2.5.5).
- Combinar com `DssTooltip` para descrever cada nível de avaliação.
- Usar `readonly` (não `disable`) para exibição de avaliações existentes.
- `icon-half` requer `modelValue` decimal (ex: `3.5`).
- `noReset=true` é recomendado em formulários com avaliação obrigatória.

### Anti-Patterns

- ❌ Usar `disable` para modo de exibição — use `readonly`.
- ❌ Não fornecer `aria-label` — leitores de tela ficam sem contexto.
- ❌ Usar `size` abaixo de `44px` em interfaces touch (WCAG 2.5.5).
- ❌ Usar `color` ou `color-selected` via `$attrs` — props bloqueadas intencionalmente.

---

## 11. Paridade com Golden Reference e Golden Context

### DssChip (Golden Reference — Interativo)

| Critério | DssChip | DssRating | Resultado |
|----------|---------|-----------|-----------|
| Focus outline | `var(--dss-border-width-md) solid var(--dss-focus-ring)` | idêntico | ✅ Igual |
| Focus border-radius | `--dss-radius-full` (chip oval) | `--dss-radius-sm` (rating retangular) | ⚠️ Diferente — justificado: rating não é oval |
| Hover filter | `brightness(0.95)` | `brightness(0.95)` nos ícones hovered | ✅ Igual |
| Active filter | `brightness(0.90)` | `brightness(0.90)` nos ícones pressed | ✅ Igual |
| Disabled opacity | `var(--dss-opacity-disabled)` = 0.4 | idêntico | ✅ Igual |
| Brand dual-selector | `.dss-chip--brand-{b}` + `[data-brand="{b}"] .dss-chip` | idêntico padrão | ✅ Igual |
| `-webkit-tap-highlight-color` | `transparent` | `transparent` | ✅ Igual |
| `prefers-reduced-motion` | transition none | idêntico | ✅ Igual |
| `forced-colors` | SystemColor keywords | idêntico | ✅ Igual |

### DssKnob (Golden Context — Controle Numérico Interativo)

| Critério | DssKnob | DssRating | Resultado |
|----------|---------|-----------|-----------|
| Root element Quasar | QKnob (EXC-Gate-01) | QRating (EXC-Gate-01) | ✅ Igual |
| ARIA gerenciada por Quasar | `role="slider"` via QKnob | `role="slider"` via QRating | ✅ Igual |
| v-model numérico | ✅ | ✅ | ✅ Igual |
| readonly/disable semântica | idêntica | idêntica | ✅ Igual |
| Brand dual-selector | ✅ | ✅ | ✅ Igual |
| EXC-Gate-02 (cores fixas) | ✅ (necessário para SVG) | ❌ (não necessário) | ⚠️ Diferente — DssRating usa EX-Color-01 porque QRating não precisa de prop para renderizar ícones |
| `::before` box-shadow (focus) | EXC-Focus-01 (QKnob usa ::before) | Não aplicável | ⚠️ N/A — QRating não usa ::before para foco |

---

## 12. Changelog

| Versão | Data | Descrição |
|--------|------|-----------|
| 2.2 | 2026-05-18 | Criação inicial — Fase 2 Nível 1 |
| 2.2 | 2026-05-18 | Adição de Comportamentos Implícitos (Seção 9) e Matriz de Composição DSS (Seção 9.1) — obrigatórias Fase 2 |
