# DssDataCard

**Fase 3 — Componente Composto Complexo**  
**Golden Context da Fase 3** — baseline de auditoria para composições profundas.

---

## Quando usar

- Para apresentar dados tabulares ou de listagem com navegação por abas
- Quando o conteúdo tem múltiplas visualizações (resumo, detalhes, histórico)
- Quando há paginação interna de dados
- Para cards de dashboard com toolbar de ações

## Quando NÃO usar

- Para cards simples sem abas — usar `DssCard` diretamente
- Para exibir formulários — usar `DssForm` com `DssCard`
- Para listas de seleção — usar `DssSelect` ou `DssList`

---

## Instalação rápida

```vue
<DssDataCard
  title="Indicadores"
  :tabs="tabs"
  :total-items="100"
  v-model="currentPage"
  brand="hub"
>
  <template #tab-resumo>
    <p>Conteúdo da aba Resumo</p>
  </template>
</DssDataCard>
```

```ts
const tabs = [
  { name: 'resumo', label: 'Resumo', icon: 'dashboard' },
  { name: 'detalhes', label: 'Detalhes', icon: 'list' },
]
const currentPage = ref(1)
```

---

## Padrões obrigatórios da Fase 3 implementados

| # | Padrão | Como está implementado |
|---|---|---|
| 1 | `inheritAttrs: false` | `v-bind="$attrs"` aplicado no `DssCard` raiz |
| 2 | `provide/inject` tipado | `DATA_CARD_DISABLED_KEY` — `disabled` propaga sem prop drilling |
| 3 | CSS Variables | `[data-brand]` no raiz — brand propaga para filhos via cascata |
| 4 | Sem `:deep()` | Layout via classes `.dss-data-card__*` próprias |
| 5 | Slots dinâmicos | `tab-{name}` para conteúdo de cada aba |

---

## Estrutura interna

```
DssDataCard
└── DssCard (raiz — recebe v-bind="$attrs" + [data-brand])
    ├── __toolbar → DssToolbar
    │   ├── __title-group (título + subtítulo)
    │   ├── DssButton (refresh)
    │   └── slot: toolbar-actions
    ├── __tabs → DssTabs + DssTab × N (quando tabs=[...])
    ├── __skeleton (quando loading=true)
    ├── __content
    │   ├── DssTabPanels + DssTabPanel × N (com abas)
    │   │   └── slot: tab-{name}
    │   └── DssCardSection + slot: default (sem abas)
    ├── __pagination (quando totalItems > 0 e !loading)
    │   └── DssButton × N
    └── __footer (quando slot footer está preenchido)
        └── slot: footer
```

---

## Propagação de estado

### Brand (visual)
```vue
<!-- Pai define — filhos recebem via CSS cascade, sem prop -->
<DssDataCard brand="hub">
  <!-- DssToolbar e DssTabs ficam com cores hub automaticamente -->
</DssDataCard>
```

### Disabled (interativo)
```vue
<!-- disabled é fornecido ao DssDataCard -->
<DssDataCard :disabled="true">
  <!-- Todos os DssButton internos ficam desabilitados via provide/inject -->
  <!-- Não é necessário passar :disabled para cada botão individualmente -->
</DssDataCard>
```

---

## Links

- [Documentação normativa](./DssDataCard.md)
- [API Reference](./DSSDATACARD_API.md)
- [Guia de Composição Fase 3](../../../docs/governance/DSS_GUIA_COMPOSICAO_FASE3.md)
