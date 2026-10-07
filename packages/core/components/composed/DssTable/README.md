# DssTable

Wrapper DSS governado sobre `QTable` do Quasar. Tabela interativa com ordenação, paginação, filtro, seleção de linhas e density.

## Quick Start

```vue
<template>
  <DssTable
    :rows="rows"
    :columns="columns"
    row-key="id"
  />
</template>

<script setup>
import { DssTable } from '@sansys/design-system'

const columns = [
  { name: 'name', label: 'Nome', field: 'name', sortable: true },
  { name: 'age',  label: 'Idade', field: 'age', sortable: true },
]
const rows = [
  { id: 1, name: 'Ana Silva', age: 30 },
  { id: 2, name: 'Bruno Costa', age: 25 },
]
</script>
```

## Quando usar

- Dados tabulares que precisam de ordenação, filtro ou paginação
- Seleção de uma ou múltiplas linhas com ação posterior
- Tabelas com ações por linha (via slot `body-cell`)
- Dados server-side paginados (via evento `@request`)

## Quando NÃO usar

- Tabelas estáticas simples sem interatividade → usar `DssMarkupTable`
- Layouts de grade/matriz → usar CSS Grid com tokens DSS

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `rows` | `object[]` | **(obrigatório)** | Array de objetos com os dados das linhas |
| `columns` | `DssTableColumn[]` | `undefined` | Definição das colunas (nome, label, field, sortable) |
| `row-key` | `string \| Function` | `'id'` | Campo que identifica cada linha unicamente |
| `title` | `string` | `undefined` | Título exibido no cabeçalho da tabela |
| `loading` | `boolean` | `undefined` | Exibe overlay de loading sobre a tabela |
| `filter` | `string \| object` | `undefined` | Filtro client-side |
| `selection` | `'single' \| 'multiple' \| 'none'` | `'none'` | Modo de seleção de linhas |
| `v-model` | `object[]` | `[]` | Linhas selecionadas (bind bidirecional) |
| `v-model:pagination` | `DssTablePagination` | `undefined` | Objeto de paginação (bind bidirecional) |
| `density` | `'compact' \| 'standard' \| 'comfortable'` | `'standard'` | Densidade visual |
| `bordered` | `boolean` | `undefined` | Adiciona borda ao redor da tabela |
| `flat` | `boolean` | `undefined` | Remove sombra |
| `wrap-cells` | `boolean` | `undefined` | Permite quebra de linha nas células |
| `separator` | `'horizontal' \| 'vertical' \| 'cell' \| 'none'` | `'horizontal'` | Tipo de separador |
| `virtual-scroll` | `boolean` | `undefined` | Renderização virtual para grandes datasets |
| `no-data-label` | `string` | `'Nenhum dado disponível'` | Mensagem para tabela vazia |
| `no-results-label` | `string` | `'Nenhum resultado encontrado...'` | Mensagem quando o filtro não retorna resultados |
| `hide-bottom` | `boolean` | `undefined` | Oculta a barra inferior (paginação) |
| `hide-header` | `boolean` | `undefined` | Oculta o cabeçalho da tabela |
| `rows-per-page-options` | `number[]` | `[10, 25, 50]` | Opções de itens por página |

## Slots Principais

| Slot | Descrição |
|------|-----------|
| `top-right` | Área superior direita — ideal para campo de filtro/busca |
| `top-left` | Área superior esquerda — padrão: título |
| `body-cell` | Substituição de cada célula `<td>` — scoped: `{ row, col, value }` |
| `body-row` | Substituição do `<tr>` inteiro — scoped: `{ row, cols }` |
| `header-cell` | Substituição de cada `<th>` — scoped: `{ col }` |
| `no-data` | Conteúdo quando não há dados — scoped: `{ message }` |
| `loading` | Overlay de carregamento customizado |
| `pagination` | Área de paginação customizada |

Os slots são repassados **dinamicamente**: o `DssTable` reenvia ao QTable todo slot que
receber, inclusive os de nome derivado (`body-cell-[coluna]`, `header-cell-[coluna]`). Não há
lista fixa — se o QTable aceita, o `DssTable` repassa.

É por eles que componente DSS entra na tabela:

```vue
<DssTable :rows="linhas" :columns="colunas" row-key="protocolo" density="compact">
  <!-- barra de ferramentas -->
  <template #top-right>
    <DssInput v-model="filtro" dense label="Filtrar" clearable />
  </template>

  <!-- uma coluna vira chip; o resto da linha segue igual -->
  <template #body-cell-situacao="props">
    <td class="text-center">
      <DssChip :color="props.row.situacao === 'Ativo' ? 'positive' : 'negative'" size="xs" dense
               :label="props.row.situacao" />
    </td>
  </template>
</DssTable>
```

### O `<td>` é seu, e a classe de alinhamento também

Repare nos dois detalhes do exemplo acima — os dois são **contrato do QTable**, não descuido:

**1. O slot entrega o `<td>`, não o conteúdo dele.** `body-cell-*` **substitui a célula
inteira**. Quem usa o slot é obrigado a fornecer o `<td>`; sem ele, a linha quebra.

**2. `class="text-center"` é obrigatória, não decorativa.** O `align` declarado na coluna só
alcança o `<td>` que o **QTable** desenha. No `<td>` do slot, não — medido:

| | `text-align` resultante |
|---|---|
| `<td class="text-right">` | `right` |
| `<td>` sem classe | **`start`** |

Então a coluna com `align: 'right'` e uma célula via slot **sem** a classe saem desalinhadas
entre si. Repita o alinhamento da coluna na classe do `<td>`.

> **Lacuna conhecida.** `text-left` / `text-center` / `text-right` são classes utilitárias do
> **Quasar**, não do DSS — é vendor vazando para a página do consumidor. Um `DssTableCell` que
> lesse o `align` da coluna fecharia isso; a avaliação de esforço está em
> `DEBITO_ABERTO.md`, e a recomendação hoje é **não** criar o componente: são 9 ocorrências em
> 2 arquivos, e criar componente para essa base é o anti-padrão do `IconButton`.

## Altura de linha: o que custa pôr um componente na célula

A altura da linha **não é declarada** — não existe `height` em `td` nenhum. Ela é o padding da
densidade mais o que for **mais alto** dentro da célula. Medido em set/2026:

| Densidade | Só texto | Com `DssChip` + `DssButton` | Custo |
|---|---|---|---|
| `compact` | 38px | 46px | **+8px** |
| `standard` | 50px | 58px | **+8px** |
| `comfortable` | 58px | 66px | **+8px** |

Decomposto no `compact`: 6px de padding + 24px de *line-height* + 6px + 1px de borda = 37,5px.
Troque o texto por um `DssButton` e os 24px do *line-height* dão lugar aos 32px do botão — daí
os +8px. **O custo é o mesmo nas três densidades**, porque o que muda entre elas é o padding, e
não o teto do conteúdo.

**Não é defeito.** Encolher o botão para caber quebraria o alvo de toque (WCAG 2.5.5), e a
linha crescer é o comportamento certo. Mas é uma decisão de layout, não uma descoberta: o grid
master do Sansys Water pede linha de 36px, e uma coluna de ações não cabe nisso. Quem monta a
tela escolhe entre a coluna de ações e a altura da linha — o componente não escolhe por ela.

Medição ao vivo na seção 08 da página de Playground (`apps/sandbox/src/TestTable.vue`).

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `object[]` | Seleção de linhas mudou |
| `update:pagination` | `DssTablePagination` | Paginação mudou |
| `request` | `{ pagination, filter }` | Server-side: sort/filtro/paginação solicitados |
| `selection` | `{ rows, added, keys }` | Linhas selecionadas/desmarcadas |
| `row-click` | `(evt, row, index)` | Clique em uma linha |
| `row-dblclick` | `(evt, row, index)` | Duplo clique em uma linha |
| `row-contextmenu` | `(evt, row, index)` | Clique com botão direito (menu de contexto) em uma linha |

## Estados Visuais

| Estado | Comportamento |
|--------|---------------|
| **loading** | Overlay semitransparente com spinner sobre a tabela |
| **empty** | Exibe mensagem `no-data-label` centralizada |
| **selected row** | Fundo destacado via `--dss-surface-selected` |
| **hover row** | Fundo `--dss-surface-hover` na linha sob o cursor |
| **sorted column** | Ícone de ordenação visível no cabeçalho |
| **density: compact** | Altura de linha reduzida (`--dss-compact-control-height-sm`) |
| **density: comfortable** | Altura de linha aumentada com mais espaço interno |

## Exemplos

### Com seleção múltipla

```vue
<DssTable
  v-model="selectedRows"
  :rows="rows"
  :columns="columns"
  selection="multiple"
/>
```

### Paginação server-side

```vue
<DssTable
  v-model:pagination="pagination"
  :rows="rows"
  :columns="columns"
  @request="onRequest"
/>
```

### Filtro com slot

```vue
<DssTable :rows="rows" :columns="columns">
  <template #top-right>
    <DssInput v-model="filter" label="Buscar" dense />
  </template>
</DssTable>
```

### Ação por linha

```vue
<DssTable :rows="rows" :columns="columns">
  <template #body-cell-actions="{ row }">
    <q-td>
      <DssButton icon="edit" flat round dense @click="edit(row)" />
      <DssButton icon="delete" flat round dense @click="remove(row)" />
    </q-td>
  </template>
</DssTable>
```

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Background da tabela |
| `--dss-surface-hover` | Hover das linhas |
| `--dss-surface-selected` | Linha selecionada |
| `--dss-surface-header` | Background do cabeçalho |
| `--dss-border-default` | Bordas e separadores |
| `--dss-radius-md` | Border radius da tabela |
| `--dss-compact-control-height-sm` | Altura linha density compact |
| `--dss-compact-control-height-md` | Altura linha density standard |
| `--dss-compact-control-height-lg` | Altura linha density comfortable |
| `--dss-text-body` | Cor do texto das células |
| `--dss-text-label` | Cor do texto dos cabeçalhos |

## Acessibilidade

- Tabela usa elemento `<table>` nativo com `<thead>` e `<tbody>` corretos
- Cabeçalhos ordenáveis têm `aria-sort` atualizado automaticamente
- Linhas selecionáveis recebem `aria-selected`
- Loading comunica estado via `aria-busy`

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [DssTable.md](./DssTable.md) | Normativo — governança, exceções de gate, decisões |
| [DSSTABLE_API.md](./DSSTABLE_API.md) | API Reference — props completas, slots, eventos, API imperativa |
