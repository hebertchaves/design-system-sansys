# Migração `jtech-data-table` → `DssDataTable - Claude Code`

Fonte: [hebertchaves/WebComps-to-DSS](https://github.com/hebertchaves/WebComps-to-DSS) · `src/components/jtech-data-table/`.

## Mapa de props

| Jtech | Aqui | Nota |
|---|---|---|
| `fields` | `columns` | mesma forma `{ name, label, field, align, sortable, format }` |
| `data` | `rows` | **já filtradas** pela página |
| `rowKey` | `rowKey` | — |
| `title` | `title` | passa a ser `DssSectionTitle` no cabeçalho do bloco |
| `apiMode` | `mode: 'local' \| 'remote'` | booleano vira enum legível |
| `isPaginated` | — | paginação é sempre ligada (ver contrato normativo) |
| `singleselect` / `multiselect` / `noneselect` | `selection` | três booleanos mutuamente exclusivos viram um enum |
| `buttons` | `actions` | `nmIcon` → `icon`; `mode` **preservado** em minúsculas |
| `rowButtons` | `rowActions` | booleano vira a própria lista |
| `buttonsFilter` | slot `head-actions` / `row-actions` | função de filtro vira composição |
| `rowsPerPageInitial` | `pagination.rowsPerPage` | — |
| `rowsPerPageOptions` | `rowsPerPageOptions` | sem a opção `0` (ver scroll) |
| `preSelectedKeys` | `modelValue` | seleção é v-model, não semente |
| `messageDataEmpty` | `emptyTitle` / `emptyDescription` | vazio ganha ação |
| `virtualScroll` | — | fora do escopo desta versão |
| `nmInterface`, `extraParams`, `defaultHttpOptions` | — | rede pertence ao consumidor; o bloco emite `request` |
| `columnEdit` | — | edição inline exige contrato próprio |
| `imageColumnNotFound` | — | coluna de imagem fora do escopo |
| `selectionForce` | — | seleção é controlada pelo consumidor |

## Mapa de eventos

| Jtech | Aqui |
|---|---|
| `selection` | `update:modelValue` |
| `action-button` | `action` (`{ action, rows, row? }`) |
| `click-row` | `row-click` |
| `show-message` | — (o aviso "selecione um item" vira botão desabilitado: o estado é visível antes do clique, não depois) |
| `update:data` | — (o bloco não muta os dados do consumidor) |

## Mapa de slots

| Jtech | Aqui |
|---|---|
| `custom-expand-content` | `expanded-row` |
| `top` | `head-start` / `head-actions` |
| `bottom` | — (paginação do `DssTable` ocupa a área) |

## Subcomponentes que não viraram arquivo

`JtDataTableHeader`, `JtDataTableRow`, `JtDataTableHiddenRow`, `JtDataTableButtons` e `JtDataTableInput` eram peças de um composto montado por `provide/inject` de estado mutável. Aqui o cabeçalho e a linha são responsabilidade do `DssTable`, os botões são `DssButton` no template e o `provide` carrega apenas contexto **somente leitura** (`disabled`, `loading`, `selected`) — não o estado da tabela.
