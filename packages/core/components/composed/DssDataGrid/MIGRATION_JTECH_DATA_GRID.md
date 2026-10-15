# Migração `jtech-data-grid` → `DssDataGrid`

Fonte: [hebertchaves/WebComps-to-DSS](https://github.com/hebertchaves/WebComps-to-DSS) · `src/components/jtech-data-grid/JtDataGrid.vue` (296 linhas, Vue 2 + `vue-property-decorator` + Stylus).

## Props

| Jtech | Aqui | Nota |
|---|---|---|
| `fields` | `fields` | mesmo nome; ganha `visibility` funcional e `format` |
| `data` | `rows` | já filtradas pela página |
| `rowKey` | `rowKey` | — |
| `title` | `title` | vira `DssSectionTitle` no cabeçalho do bloco |
| `apiMode` | — | implícito: `rowsNumber` informado = remoto |
| `isPaginated` | `paginated` | `false` desliga de verdade (a origem punha `rowsPerPage = 9999`) |
| `singleselect` / `multiselect` / `noneselect` | `selection` | três booleanos exclusivos viram enum |
| `hideHeader` | — | ficha não tem cabeçalho de tabela; o rótulo vive em cada `<dt>` |
| `nmInterface` · `extraParams` · `defaultHttpOptions` | — | rede é do consumidor; o bloco emite `request` |
| — | `titleField` | novo: a origem fixava `row.name` |
| — | `total` · `countNoun` | novo: contagem viva |
| — | `filterLabel` | novo: chip do filtro aplicado |
| — | `columnsPerRow` | novo: a origem fixava `col-6` (2 colunas) |
| — | `error` | novo: a origem não tinha estado de falha |

## Eventos

| Jtech | Aqui |
|---|---|
| `selection` | `update:modelValue` |
| — | `update:page`, `request`, `item-click`, `clear-filter`, `retry` |

## Slots

| Jtech | Aqui |
|---|---|
| `item` (do QTable) | `item` — escopo `{ row, selected, index }` em vez de `{ props }` do Quasar |
| — | `head-start`, `head-actions`, `item-actions`, `empty` |

## Métodos

| Jtech | Aqui |
|---|---|
| `refresh()` | `request()` |
| — | `clearSelection()`, `revealAll()`, `collapseAll()` |

## Comportamentos da origem que NÃO foram portados — e por quê

1. **Carregamento automático no `mounted`.** A origem chamava `request()` ao montar e resolvia pelo `$jt.repository`. Componente de apresentação não dispara I/O.
2. **`push` no array `fields` do pai.** A origem acrescentava `{ name: 'showhide', label: 'MORE' }` ao array recebido quando havia campo oculto — mutação de prop com efeito no consumidor. Aqui o revelador é derivado de `camposOcultos`, sem tocar na prop.
3. **Reescrita dos objetos de coluna.** O getter `columns` fazia `col.name = …`, `col.field = col.name`, `col.align = …`, `col.sortable = true` nos objetos recebidos. Todos derivados agora.
4. **`Object.assign` nas linhas** (`computedServerData`) para preencher campos ausentes com `''`. O `String(bruto ?? '')` no render resolve sem tocar no dado.
5. **`jt-empty-message` com `size="10em"`.** Substituído por `DssEmptyState`, que já carrega `role="status"` e o contrato de vazio do DSS.
6. **Campo `desc` filtrado por nome** (`col.name !== 'desc'`). Regra de negócio embutida em componente de biblioteca; aqui o consumidor marca `visibility: 'hidden'`.

## Defeito encontrado na origem

O recurso `visibility: 'hidden'` **não funcionava**: o campo sintético `showhide` era empurrado em `fields`, mas nem `visibleColumns` nem o template `item` o consumiam — nada renderizava o revelador, e o campo oculto apenas desaparecia. A intenção estava declarada no modelo de dados e não chegava à tela. Esta versão a cumpre.
