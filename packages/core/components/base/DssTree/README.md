# DssTree

Wrapper DSS governado sobre QTree do Quasar. Árvore hierárquica interativa com expansão/colapso, seleção, navegação por teclado e lazy loading.

## Quando usar

- Exibição de dados hierárquicos (menus, categorias, arquivos, permissões)
- Navegação em estrutura de pastas ou categorias aninhadas
- Seleção de um item em uma hierarquia (v-model:selected)
- Seleção múltipla via checkbox (tick-strategy + v-model:ticked)
- Carregamento assíncrono de filhos (lazy loading)

## Quando NÃO usar

- Listas simples sem hierarquia → usar `DssList` + `DssItem`
- Navegação por abas → usar `DssTabs`
- Itens expansíveis sem hierarquia → usar `DssExpansionItem`

## Instalação

```js
import { DssTree } from '@dss/components'
```

## Uso Básico

```vue
<DssTree
  :nodes="nodes"
  node-key="id"
/>
```

## Como funciona

`DssTree` usa `QTree` do Quasar internamente:
- Motor: `QTree` (expansão, seleção, filtro, lazy loading, navegação por teclado)
- Seleção via `v-model:selected` (nó único) ou `v-model:ticked` (checkbox)
- Expansão via `v-model:expanded`

```vue
<!-- Seleção simples -->
<DssTree
  v-model:selected="selected"
  :nodes="nodes"
  node-key="id"
/>

<!-- Modo checkbox (tick) -->
<DssTree
  v-model:ticked="ticked"
  :nodes="nodes"
  node-key="id"
  tick-strategy="leaf"
/>

<!-- Lazy loading -->
<DssTree
  :nodes="nodes"
  node-key="id"
  @lazy-load="onLazyLoad"
/>

<!-- Filtro externo -->
<DssInput v-model="filter" label="Buscar" />
<DssTree
  :nodes="nodes"
  node-key="id"
  :filter="filter"
/>
```

## Links

- [Documentação completa](./DssTree.md)
- [API Reference](./DSSTREE_API.md)
- [Exemplos](./DssTree.example.vue)
