# DssDataTable — API

## Props

`rows`, `columns`, `rowKey`, `title`, `ariaLabel`, `mode`, `selection`, `modelValue`, `filter`, `pagination`, `loading`, `error`, `density`, `rowsPerPageOptions`, `actions`, `rowActions`, `expandable`, `expandedKeys`, `disabled`, `brand`, `noDataLabel`, `noResultsLabel`.

## Eventos

- `update:modelValue`
- `update:filter`
- `update:pagination`
- `update:expandedKeys`
- `request`
- `action`
- `expand-request`
- `row-click`

## Slots

- `top-left({ selected })`
- `top-right({ filter })`
- `row-actions({ row, disabled })`
- `expanded-row({ row, key })`
- `no-data({ filtered })`

## API imperativa

`request()`, `clearSelection()` e `sort(column)`.
