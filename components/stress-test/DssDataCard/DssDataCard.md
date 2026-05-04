# DssDataCard — Stress Test Fase 3

**Status:** `stress-test` — Componente experimental. Não usar em produção.  
**Objetivo:** Revelar gargalos de CSS, prop drilling e conflitos de `inheritAttrs` em composições profundas antes da Fase 3.

---

## Composição

```
DssDataCard
└── DssCard (raiz — recebe v-bind="$attrs")
    ├── DssToolbar (brand via [data-brand])
    │   ├── DssButton (refresh)
    │   └── slot: toolbar-actions
    ├── DssTabs (brand via [data-brand])
    │   └── DssTab × N
    ├── DssTabPanels
    │   └── DssTabPanel × N
    │       └── slot: tab-{name}
    ├── Paginação interna
    │   └── DssButton × N (disabled via provide/inject)
    └── slot: footer
```

---

## Padrões Validados

| Padrão | Implementação | Risco Mitigado |
|---|---|---|
| `inheritAttrs: false` | `v-bind="$attrs"` no `DssCard` raiz | Atributos no nó errado |
| `provide/inject` tipado | `DATA_CARD_DISABLED_KEY` | Prop drilling de `disabled` |
| CSS Variables | `[data-brand]` no raiz | Prop drilling de `brand` |
| Sem `:deep()` | Layout via classes próprias | CSS acoplado entre componentes |
| Slots dinâmicos | `tab-{name}` | Conteúdo de abas tipado |

---

## API

### Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `title` | `string` | — | Título na toolbar |
| `subtitle` | `string` | — | Subtítulo na toolbar |
| `variant` | `CardVariant` | `'elevated'` | Variante visual do DssCard |
| `brand` | `DataCardBrand \| null` | `null` | Marca Sansys |
| `tabs` | `DataCardTab[]` | `[]` | Configuração das abas |
| `totalItems` | `number` | `0` | Total para paginação |
| `itemsPerPage` | `number` | `10` | Itens por página |
| `modelValue` | `number` | `1` | Página atual (v-model) |
| `disabled` | `boolean` | `false` | Desabilita toda interação |
| `loading` | `boolean` | `false` | Exibe skeleton |
| `tabsAriaLabel` | `string` | — | aria-label do DssTabs |

### Slots

| Slot | Descrição |
|---|---|
| `toolbar-actions` | Ações adicionais na toolbar (direita) |
| `tab-{name}` | Conteúdo de cada aba (dinâmico) |
| `default` | Conteúdo quando não há abas |
| `footer` | Rodapé abaixo da paginação |

---

## Riscos Conhecidos

**RISCO-01:** `DssTabPanels` pode conflitar com o `overflow` do `DssCard` em conteúdos muito altos. Monitorar comportamento com `max-height` definido.

**RISCO-02:** Botões de paginação com `size="sm"` podem ter touch target abaixo de 44px. Avaliar se a paginação deve usar `size="md"` em mobile.

**RISCO-03:** A animação de shimmer do skeleton usa `opacity` e pode causar reflow em listas longas. Avaliar uso de `will-change: opacity`.
