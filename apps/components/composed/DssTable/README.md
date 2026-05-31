# DssTable

Wrapper DSS governado sobre QTable do Quasar. Tabela interativa com ordenação, paginação, filtro e seleção de linhas.

## Quando usar

- Exibição de dados tabulares com ordenação ou filtro
- Tabelas com paginação (muitas linhas)
- Seleção de uma ou múltiplas linhas
- Tabelas com ações por linha via slots

## Quando NÃO usar

- Tabelas estáticas simples sem interatividade → usar `DssMarkupTable`
- Tabelas HTML com estrutura manual → usar `DssMarkupTable`

## Instalação

```js
import { DssTable } from '@dss/components'
```

## Uso Básico

```vue
<DssTable
  :rows="rows"
  :columns="columns"
  row-key="id"
/>
```

## Como funciona

`DssTable` usa `QTable` do Quasar internamente:
- Motor: `QTable` (ordenação, filtro, paginação, seleção)
- Densidade: `density="compact|standard|comfortable"` (prop DSS)
- Seleção via `selection="single|multiple"`
- Server-side via evento `@request`

```vue
<!-- Com seleção múltipla -->
<DssTable
  v-model="selectedRows"
  :rows="rows"
  :columns="columns"
  selection="multiple"
/>

<!-- Paginação server-side -->
<DssTable
  v-model:pagination="pagination"
  :rows="rows"
  :columns="columns"
  @request="onRequest"
/>

<!-- Com filtro customizado no top-right slot -->
<DssTable :rows="rows" :columns="columns">
  <template #top-right>
    <DssInput v-model="filter" label="Filtrar" />
  </template>
</DssTable>
```

## Links

- [Documentação completa](./DssTable.md)
- [API Reference](./DSSTABLE_API.md)
- [Exemplos](./DssTable.example.vue)
