# DssDataTable - Claude Code

Segunda versão do `jtech-data-table` (WebComps Jtech) sobre o DSS, escrita a partir da UI já consolidada nos patterns **"Check-in NFAg - Paralelo"** e **"Solicitações"**.

Identificador em código: `DssDataTableClaudeCode` · classe raiz: `dss-data-table-cc`.

> Existe uma outra leitura do mesmo componente de origem — o `DssDataTable`. As duas convivem de propósito: a comparação é o objeto. A diferença não é de estilo, é de **fronteira** e de **fidelidade ao contrato de origem** — veja "O que muda em relação ao DssDataTable".

## Quando usar

- Bloco operacional de dados: título, contagem, ações, grade, seleção e detalhe numa unidade só.
- Grade local ou remota em que a **página** já filtra e o bloco apenas apresenta.
- Ações em lote cujo gatilho depende da quantidade selecionada (o `mode` do Jtech).

## Quando NÃO usar

- Tabela puramente informativa, sem ações nem seleção → `DssMarkupTable`.
- Você quer o motor tabular nu, sem o enquadramento → `DssTable`.
- Edição inline de célula (`columnEdit` do Jtech) → fora deste contrato.
- O componente deve buscar os dados → ele não busca; emite `request`.

## O que muda em relação ao `DssDataTable`

| Eixo | `DssDataTable` | `DssDataTable - Claude Code` |
|---|---|---|
| Enquadramento | título e filtro no slot `#top` do QTable | cabeçalho próprio **fora** do cartão (`.sol-card__head`, `.nf-between`) |
| Contagem | ausente | "N de M registros" em região viva (`aria-live="polite"`) |
| Filtro | `DssInput` interno + `update:filter` | a página filtra; o bloco mostra o **chip removível** do filtro aplicado |
| Ações em lote | `requiresSelection` + `multiple` (2 booleanos) | `mode: single \| multi \| any \| none` — o contrato de 4 estados do Jtech |
| Situação | célula de texto | chip com **rótulo + ícone** (`statusColumn` + `statusMap`) |
| Vazio | `DssEmptyState` | `DssEmptyState` **com ação** de limpar filtro |
| Camada de marca | 2 tokens locais declarados, 0 consumidos | 1 traço de identidade, consumido na mesma regra |

## Fronteira: este bloco não filtra

`rows` chega **já filtrada** pela página, e `total` é o denominador da contagem. É a mesma decisão que o pattern "Solicitações" registra para o `DssDataBoard`: receber o conjunto inteiro e filtrar aqui transformaria o bloco num componente de **dados** e o amarraria ao `DssTable` para sempre. Sem `total`, a contagem informa só o que está em tela — nunca inventa um denominador que não recebeu.

## API

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `rows` | `DssDataTableCcRow[]` | — | Linhas a exibir, já filtradas pela página |
| `columns` | `DssTableColumn[]` | — | Definição das colunas |
| `rowKey` | `string` | `'id'` | Chave única da linha |
| `title` | `string` | `''` | Título da seção, no cabeçalho do bloco |
| `ariaLabel` | `string` | `''` | Nome acessível da região |
| `total` | `number \| null` | `null` | Denominador da contagem viva |
| `countNoun` | `string` | `'registros'` | Substantivo contado no cabeçalho |
| `mode` | `'local' \| 'remote'` | `'local'` | Origem dos dados |
| `selection` | `DssTableSelection` | `'none'` | Tipo de seleção |
| `modelValue` | `DssDataTableCcRow[]` | `[]` | Linhas selecionadas (v-model) |
| `filterLabel` | `string \| null` | `null` | Rótulo do filtro aplicado; presente, vira chip removível |
| `pagination` | `DssTablePagination` | `{ page: 1, rowsPerPage: 10 }` | Estado de paginação |
| `rowsPerPageOptions` | `number[]` | `[10, 25, 50]` | Opções de linhas por página |
| `loading` | `boolean` | `false` | Carregando |
| `error` | `string \| null` | `null` | Mensagem de falha |
| `density` | `DssTableDensity` | `'compact'` | Densidade da grade |
| `actions` | `DssDataTableCcAction[]` | `[]` | Ações da barra do cabeçalho |
| `rowActions` | `DssDataTableCcAction[] \| ((row) => DssDataTableCcAction[])` | `[]` | Ações por linha. Lista = as mesmas em todas; função = o consumidor decide por linha (`[]` deixa a linha sem botões) |
| `expandable` | `boolean` | `false` | Habilita detalhe expansível |
| `expandedKeys` | `Array<string \| number>` | `[]` | Chaves expandidas (v-model) |
| `statusColumn` | `string \| null` | `null` | Coluna cujo valor é situação |
| `statusMap` | `Record<string, DssDataTableCcStatus>` | `{}` | Valor → tom e ícone do chip |
| `disabled` | `boolean` | `false` | Desabilita o bloco inteiro |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca do bloco |
| `emptyTitle` | `string` | `'Nenhum registro para este filtro'` | Título do vazio |
| `emptyDescription` | `string` | `'Revise os critérios ou limpe os filtros aplicados.'` | Descrição do vazio |

### Eventos

| Evento | Payload | Quando |
|---|---|---|
| `update:modelValue` | `DssDataTableCcRow[]` | Seleção mudou |
| `update:pagination` | `DssTablePagination` | Paginação mudou |
| `update:expandedKeys` | `Array<string \| number>` | Expansão mudou |
| `request` | `{ pagination }` | Modo remoto precisa de dados |
| `action` | `{ action, rows, row? }` | Ação acionada |
| `expand-request` | `{ row, key, expanded }` | Detalhe pedido |
| `row-click` | `(evt, row, index)` | Linha clicada |
| `clear-filter` | — | Chip do filtro removido, ou "Limpar filtro" no vazio |
| `retry` | — | "Tentar novamente" após falha |

### Slots

| Slot | Escopo | Descrição |
|---|---|---|
| `head-start` | `{ selected }` | Entre o título e o chip de filtro |
| `head-actions` | `{ selected, disabled }` | Substitui a barra derivada de `actions` |
| `row-actions` | `{ row, disabled }` | Substitui as ações da linha |
| `expanded-row` | `{ row, key }` | Conteúdo do detalhe |
| `empty` | `{ filtered }` | Substitui o estado vazio |

### Métodos expostos

`request()` · `clearSelection()` · `sort(col)`

## O `mode` das ações (herdado do Jtech)

| `mode` | Ativo quando | Exemplo |
|---|---|---|
| `single` | exatamente 1 selecionada | Editar |
| `multi` | 1 ou mais selecionadas | Excluir em lote |
| `any` | 1 ou mais selecionadas, **sem teto** | Exportar seleção |
| `none` | sempre | Novo |

`single` e `any` divergem só no teto: 2 selecionadas desativam `single`, não `any`. Reduzir isso a um booleano "exige seleção" perde essa distinção — foi o motivo de manter o vocabulário da origem.

## Estados

`default` · `loading` (`aria-busy` na raiz + spinner do `DssTable`) · `empty` · `error` (`DssBanner` + ação de nova tentativa) · `selected` (checkbox marcado **mais** tinte da linha) · `expanded` · `disabled` (sem eventos, texto em `--dss-text-disabled`).

## Composição

`DssTable` (motor tabular) · `DssCard` (cartão `outlined`) · `DssSectionTitle` (título) · `DssChip` (filtro aplicado e situação) · `DssButton` (ações, expansão, nova tentativa) · `DssCheckbox` (seleção) · `DssBanner` (falha) · `DssEmptyState` (vazio).

## Tokens

`--dss-text-body` · `--dss-text-subtle` · `--dss-text-disabled` · `--dss-surface-default` · `--dss-surface-subtle` · `--dss-surface-selected` · `--dss-border-subtle` · `--dss-border-width-thin` · `--dss-border-width-md` · `--dss-brand-primary` · `--dss-font-family-sans` · `--dss-font-size-xs` · `--dss-spacing-1` · `--dss-spacing-2` · `--dss-spacing-3` · `--dss-spacing-4` · `--dss-spacing-6` · `--dss-touch-target-md`.

Nenhum token local é declarado — camada de marca que declara e não consome é camada inerte.

## Acessibilidade

- **1.3.1** — a semântica tabular é a do `DssTable`; cabeçalhos e células preservados.
- **1.4.1** — situação nunca é só cor: o chip leva rótulo **e** ícone. Valor não declarado no `statusMap` cai em neutro **sem** ícone, em vez de inventar semântica.
- **4.1.2** — a raiz comunica `aria-busy`/`aria-disabled`; checkbox, botão de expansão, barra de ações e grupo de ações da linha recebem nome contextual com o identificador da linha.
- **4.1.3** — a contagem é região viva `aria-live="polite"`: filtrar não move o foco, então precisa ser anunciado.
- Linha selecionada é comunicada pelo checkbox (sinal primário) e reforçada por tinte; em `forced-colors` o tinte some e a borda assume.
- Alvo de toque: as células de controle reservam `--dss-touch-target-md`.

## Exemplos

### 1 — Grade mínima com contagem

```vue
<DssDataTableClaudeCode
  :rows="registros"
  :columns="colunas"
  :total="registros.length"
  title="Registros"
  aria-label="Solicitações"
/>
```

### 2 — Situação como chip (pattern "Solicitações")

```vue
<DssDataTableClaudeCode
  :rows="linhasFiltradas"
  :columns="colunas"
  :total="registros.length"
  status-column="situacao"
  :status-map="{
    Atrasada: { tone: 'error', icon: 'notification_important' },
    'No prazo': { tone: 'success', icon: 'schedule' },
  }"
  :filter-label="filtroAplicado"
  title="Solicitações"
  brand="water"
  @clear-filter="limparFiltro"
/>
```

### 3 — Ações em lote com o `mode` do Jtech

```vue
<DssDataTableClaudeCode
  v-model="selecionadas"
  :rows="registros"
  :columns="colunas"
  selection="multiple"
  :actions="[
    { name: 'novo', label: 'Novo', icon: 'add', mode: 'none' },
    { name: 'editar', label: 'Editar', icon: 'edit', mode: 'single' },
    { name: 'exportar', label: 'Exportar', icon: 'download', mode: 'any' },
  ]"
  @action="executar"
/>
```

### 4 — Detalhe expansível (pattern "Check-in NFAg")

```vue
<DssDataTableClaudeCode
  v-model:expanded-keys="expandidas"
  :rows="verificacoes"
  :columns="colunas"
  expandable
  title="Verificações de configuração"
  @expand-request="carregarDetalhe"
>
  <template #expanded-row="{ row }">
    <p>{{ row.regra }}</p>
  </template>
</DssDataTableClaudeCode>
```

### 5 — Remoto, com falha e nova tentativa

```vue
<DssDataTableClaudeCode
  v-model:pagination="paginacao"
  :rows="pagina"
  :columns="colunas"
  :total="totalRemoto"
  mode="remote"
  :loading="carregando"
  :error="erro"
  @request="buscar"
  @retry="buscar({ pagination: paginacao })"
/>
```
