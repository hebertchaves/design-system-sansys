# DssVirtualScroll

Componente DSS para renderização virtualizada de listas e tabelas de grande volume. Wrapper governado sobre `QVirtualScroll` do Quasar.

## Quando usar

- Listas com > 100 itens
- Feeds e streams de dados
- Tabelas de alto volume (com `type="table"`)

## Instalação

```js
import { DssVirtualScroll } from '@dss/components'
```

## Uso Básico

```vue
<DssVirtualScroll :items="myItems" :item-size="48">
  <template #default="{ item, index, ariaSetsize, ariaPosinset }">
    <div
      role="listitem"
      :aria-setsize="ariaSetsize"
      :aria-posinset="ariaPosinset"
      class="my-item"
    >
      {{ item.label }}
    </div>
  </template>
</DssVirtualScroll>
```

## Com DssItem (recomendado)

```vue
<DssVirtualScroll :items="users" :item-size="56">
  <template #default="{ item, index, ariaSetsize, ariaPosinset }">
    <DssItem
      role="listitem"
      :aria-setsize="ariaSetsize"
      :aria-posinset="ariaPosinset"
    >
      <DssItemSection>{{ item.name }}</DssItemSection>
    </DssItem>
  </template>
</DssVirtualScroll>
```

## Estado de Loading

```vue
<DssVirtualScroll :items="items" :loading="isLoading">
  <template #default="{ item }">
    <div>{{ item }}</div>
  </template>
</DssVirtualScroll>
```

## Estado Vazio Customizado

```vue
<DssVirtualScroll :items="[]">
  <template #default="{ item }">...</template>
  <template #empty>
    <div>Nenhum resultado encontrado para sua busca.</div>
  </template>
</DssVirtualScroll>
```

## Tabela Virtualizada

Com `type="table"`, o `QVirtualScroll` interno gera a estrutura `<table>`/`<tbody>` automaticamente. O slot recebe `<tr>` diretamente. Use `#prepend` para cabeçalho fixo.

```vue
<DssVirtualScroll type="table" :items="rows" :item-size="40">
  <template #prepend>
    <div style="display: grid; grid-template-columns: 80px 1fr 1fr;">
      <span>ID</span><span>Nome</span><span>E-mail</span>
    </div>
  </template>
  <template #default="{ item, ariaSetsize, ariaPosinset }">
    <tr
      role="row"
      :aria-setsize="ariaSetsize"
      :aria-posinset="ariaPosinset"
    >
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.email }}</td>
    </tr>
  </template>
</DssVirtualScroll>
```

> **Limitação:** `DssVirtualScroll` sempre renderiza `<div>` como root. A prop `tag` do QVirtualScroll não é exposta. Para listas dentro de `<table>`, use `type="table"` e deixe o QVirtualScroll gerenciar a estrutura interna.

## Modos Disponíveis

| Prop | Valores | Default |
|------|---------|---------|
| `type` | `'list'`, `'table'` | `'list'` |
| `horizontal` | `Boolean` | `false` |
| `loading` | `Boolean` | `false` |
| `disable` | `Boolean` | `false` |

## Links

- [Documentação completa](./DssVirtualScroll.md)
- [API Reference](./DSSVIRTUALSCROLL_API.md)
- [Exemplos](./DssVirtualScroll.example.vue)
