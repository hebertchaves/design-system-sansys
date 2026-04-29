# DssTestPageComplexity

**Componente:** Página de dados composta — Fase 3 Stress Test  
**Categoria:** Composed  
**Fase DSS:** 3  
**Status:** Review  

---

## O que é

`DssTestPageComplexity` é uma página de dados complexa que orquestra múltiplos componentes DSS e Quasar para exibir ordens de serviço com filtros, múltiplas visualizações (dashboard/mapa/agenda) e paginação. É o **stress test oficial de Fase 3** da arquitetura DSS.

## Quando usar

- Listagem de ordens de serviço com status, filtros e tabela paginada
- Como referência de composição de página Fase 3
- Para validar tokens de feedback, surface e layout em contexto real

## Quando NÃO usar

- Como componente genérico de listagem — é um template de página específico
- Dentro de outro layout de página (não aninhe páginas)
- Sem dados estruturados: exige `tableRows`, `statusCounts` e `breadcrumbs`

---

## Quick Start

```vue
<template>
  <DssTestPageComplexity
    brand="hub"
    page-title="Ordens de Serviço"
    page-subtitle="Dashboard"
    :breadcrumbs="[{ number: 1, label: 'Início' }, { number: 2, label: 'OS' }]"
    :status-counts="{ onTime: 42, expiring: 8, expired: 3 }"
    :table-rows="rows"
    :total-items="53"
    :current-page="1"
    :items-per-page="10"
    @update:current-page="handlePage"
    @row:view="handleRowView"
  />
</template>

<script setup>
import DssTestPageComplexity from '@/components/composed/DssTestPageComplexity'
</script>
```

---

## Props principais

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `brand` | `'hub' \| 'water' \| 'waste'` | — | Marca Sansys (propaga via `data-brand`) |
| `disabled` | `boolean` | `false` | Desabilita todas as interações |
| `loading` | `boolean` | `false` | Exibe skeletons de carregamento |
| `pageTitle` | `string` | — | Título do módulo |
| `pageSubtitle` | `string` | — | Subtítulo/view atual |
| `breadcrumbs` | `BreadcrumbItem[]` | `[]` | Itens do breadcrumb |
| `activeView` | `'dashboard' \| 'map' \| 'schedule'` | `'dashboard'` | View ativa no toggle |
| `statusCounts` | `StatusCount` | — | Contadores `{ onTime, expiring, expired }` |
| `tableRows` | `ServiceOrderRow[]` | `[]` | Linhas da tabela |
| `totalItems` | `number` | `0` | Total para paginação |
| `currentPage` | `number` | `1` | Página atual (v-model) |
| `itemsPerPage` | `number` | `10` | Itens por página |
| `activeFilters` | `FilterChip[]` | `[]` | Chips de filtros ativos |

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:activeView` | `TestPageView` | Mudança de view |
| `update:currentPage` | `number` | Mudança de página |
| `filter:remove` | `string` (filterId) | Remoção de chip de filtro |
| `filter:search` | — | Clique em Pesquisar |
| `row:view` | `ServiceOrderRow` | Clique em linha da tabela |

## Slots

| Slot | Descrição |
|------|-----------|
| `filter-actions` | Ações extras no cabeçalho da seção de filtros |
| `table-footer` | Ações extras no rodapé da tabela |
| `tab-orders` | Conteúdo alternativo para views mapa/agenda |

## Modos

### Loading
Exibe skeletons em todas as áreas de dados enquanto `loading: true`.

### Disabled
Propaga `disabled` via `provide/inject` (`PAGE_COMPLEXITY_DISABLED_KEY`) para todos os componentes DSS filhos. Aplica `opacity: var(--dss-opacity-disabled)` na raiz.

### Brand
Propaga via `data-brand="hub|water|waste"` no elemento raiz — todos os filhos DSS respondem automaticamente.

---

## Tokens utilizados (46)

`--dss-surface-muted`, `--dss-surface-default`, `--dss-surface-subtle`, `--dss-surface-hover`, `--dss-surface-selected`, `--dss-text-primary`, `--dss-text-secondary`, `--dss-text-on-primary`, `--dss-action-primary`, `--dss-border-default`, `--dss-gray-200`, `--dss-gray-300`, `--dss-feedback-success`, `--dss-feedback-success-surface`, `--dss-feedback-success-light`, `--dss-feedback-warning`, `--dss-feedback-warning-surface`, `--dss-feedback-warning-light`, `--dss-feedback-error`, `--dss-feedback-error-surface`, `--dss-feedback-error-light`, `--dss-font-size-4xl`, `--dss-font-size-lg`, `--dss-font-size-sm`, `--dss-font-size-base`, `--dss-font-weight-bold`, `--dss-font-weight-semibold`, `--dss-font-weight-medium`, `--dss-font-weight-normal`, `--dss-radius-lg`, `--dss-radius-md`, `--dss-radius-sm`, `--dss-spacing-1`, `--dss-spacing-3`, `--dss-spacing-4`, `--dss-spacing-6`, `--dss-spacing-8`, `--dss-spacing-10`, `--dss-spacing-32`, `--dss-spacing-40`, `--dss-opacity-disabled`, `--dss-duration-150`, `--dss-duration-1000`, `--dss-easing-standard`, `--dss-hub-primary`, `--dss-water-primary`, `--dss-waste-primary`

---

## Links

- [Documentação normativa](./DssTestPageComplexity.md)
- [API Reference](./DSSTESTPAGECOMPLEXITY_API.md)
- [Playground](./DssTestPageComplexity.example.vue)
- [Metadados](./dss.meta.json)
