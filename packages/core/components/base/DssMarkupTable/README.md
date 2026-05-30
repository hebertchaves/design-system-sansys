# DssMarkupTable

Wrapper DSS governado sobre `QMarkupTable` para tabelas HTML semânticas estilizadas com tokens DSS, brandabilidade e conformidade WCAG 2.1 AA.

**Quando usar:** Exibição de dados tabulares estáticos — relatórios, listagens, comparações.  
**Quando NÃO usar:** Dados que precisam de ordenação, filtro ou paginação → use `DssTable`.

## Instalação

```js
import { DssMarkupTable } from '@dss/components'
```

## Uso Básico

```vue
<DssMarkupTable bordered>
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>João Silva</td>
      <td>Ativo</td>
    </tr>
  </tbody>
</DssMarkupTable>
```

## Densidade

```vue
<DssMarkupTable density="compact">...</DssMarkupTable>   <!-- espaçamento reduzido -->
<DssMarkupTable density="standard">...</DssMarkupTable>  <!-- padrão DSS (default) -->
<DssMarkupTable density="comfortable">...</DssMarkupTable> <!-- espaçamento generoso -->
```

## Separadores

```vue
<DssMarkupTable separator="horizontal">...</DssMarkupTable> <!-- default -->
<DssMarkupTable separator="vertical">...</DssMarkupTable>
<DssMarkupTable separator="cell">...</DssMarkupTable>
<DssMarkupTable separator="none">...</DssMarkupTable>
```

## Brandabilidade

```vue
<DssMarkupTable brand="hub">...</DssMarkupTable>   <!-- cabeçalho laranja -->
<DssMarkupTable brand="water">...</DssMarkupTable> <!-- cabeçalho azul -->
<DssMarkupTable brand="waste">...</DssMarkupTable> <!-- cabeçalho verde -->
```

## Acessibilidade (Consumer Responsibility)

O consumer **deve** fornecer semântica ARIA nos elementos de slot:

```html
<thead>
  <tr>
    <th scope="col">Coluna</th>       <!-- scope="col" para colunas -->
    <th scope="col">Outra Coluna</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">Linha A</th>      <!-- scope="row" quando th é linha -->
    <td>Dado</td>
  </tr>
</tbody>
```

## Links

- [Documentação completa](./DssMarkupTable.md)
- [API Reference](./DSSMARKUPTABLE_API.md)
- [Exemplos interativos](./DssMarkupTable.example.vue)
- [Quasar QMarkupTable](https://quasar.dev/vue-components/markup-table)
