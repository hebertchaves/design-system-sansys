# DssDataGrid

Versão DSS do `jtech-data-grid` (WebComps Jtech): a lista de registros apresentada como **fichas**, não como linhas.

## Quando usar

- O registro tem poucos campos e cada um precisa de rótulo visível (ficha, não planilha).
- A leitura é de um registro por vez, não comparação entre registros.
- Há campos secundários que só interessam sob demanda (`visibility: 'hidden'`).

## Quando NÃO usar

- Comparar valores entre registros → `DssDataTable` ou `DssTable`. Grade alinha colunas; ficha não.
- Muitos campos por registro — a ficha cresce e o grid vira parede de texto.
- Ordenação pelo cabeçalho: ficha não tem cabeçalho. Ordenar é da página.

## A divergência estrutural que governa o componente

A origem é um `q-table grid`: uma **tabela** transformada em cards por CSS. No DOM continua tabela, um card por célula — para quem navega por estrutura, anuncia-se como "tabela, 1 coluna, N linhas", e o rótulo de cada campo vive num `<div>` ao lado do valor, sem vínculo programático.

Aqui o conteúdo é o que ele é: uma `<ul>` de registros, cada ficha com `<dl>` — `<dt>` rótulo, `<dd>` valor. O vínculo vem de graça (WCAG 1.3.1).

## API

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `rows` | `DssDataGridRow[]` | — | Registros a exibir, já filtrados pela página |
| `fields` | `DssDataGridField[]` | — | Campos da ficha: `{ name, label, field?, format?, visibility? }` |
| `rowKey` | `string` | `'id'` | Chave única do registro |
| `title` | `string` | `''` | Título da seção |
| `ariaLabel` | `string` | `''` | Nome acessível da região |
| `titleField` | `string \| null` | `null` | Campo que dá nome à ficha; omitido, usa o primeiro visível |
| `total` | `number \| null` | `null` | Denominador da contagem viva |
| `countNoun` | `string` | `'registros'` | Substantivo contado |
| `selection` | `'none' \| 'single' \| 'multiple'` | `'none'` | Tipo de seleção |
| `modelValue` | `DssDataGridRow[]` | `[]` | Registros selecionados (v-model) |
| `filterLabel` | `string \| null` | `null` | Filtro aplicado; presente, vira chip removível |
| `paginated` | `boolean` | `true` | Liga a paginação |
| `page` | `number` | `1` | Página atual (v-model:page) |
| `rowsPerPage` | `number` | `12` | Fichas por página |
| `rowsNumber` | `number \| null` | `null` | Total no servidor — informado, a paginação é REMOTA |
| `columnsPerRow` | `1 \| 2 \| 3 \| 4` | `3` | Teto de colunas da grade |
| `loading` | `boolean` | `false` | Carregando |
| `error` | `string \| null` | `null` | Mensagem de falha |
| `disabled` | `boolean` | `false` | Desabilita o bloco |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca do bloco |
| `emptyTitle` | `string` | `'Nenhum registro encontrado'` | Título do vazio |
| `emptyDescription` | `string` | `'Revise os critérios ou limpe os filtros aplicados.'` | Descrição do vazio |
| `moreLabel` | `string` | `'Mais'` | Rótulo do revelador fechado |
| `lessLabel` | `string` | `'Menos'` | Rótulo do revelador aberto |

### Eventos

| Evento | Payload | Quando |
|---|---|---|
| `update:modelValue` | `DssDataGridRow[]` | Seleção mudou |
| `update:page` | `number` | Página mudou |
| `request` | `{ page, rowsPerPage }` | Paginação remota precisa de dados |
| `item-click` | `(row, index)` | Ficha clicada |
| `clear-filter` | — | Chip removido, ou "Limpar filtro" no vazio |
| `retry` | — | "Tentar novamente" após falha |

### Slots

| Slot | Escopo | Descrição |
|---|---|---|
| `head-start` | `{ selected }` | Entre o título e o chip de filtro |
| `head-actions` | `{ selected, disabled }` | Barra de ações do cabeçalho |
| `item` | `{ row, selected, index }` | Substitui o corpo da ficha inteira |
| `item-actions` | `{ row, disabled }` | Acrescenta ao cabeçalho da ficha |
| `empty` | `{ filtered }` | Substitui o estado vazio |

### Métodos expostos

`request()` · `clearSelection()` · `revealAll()` · `collapseAll()`

## Campos secundários: `visibility: 'hidden'`

`hidden` **não** é "não renderizar": é "entra atrás do botão Mais". A origem já declarava a intenção — empurrava um campo sintético `showhide` rotulado `MORE` — mas nada o consumia, e o campo marcado como oculto simplesmente sumia. Aqui o revelador existe, é por ficha, e o botão aponta `aria-controls` para o bloco que abre.

O bloco usa `v-show`, não `v-if`: recolhido ele precisa **existir**, senão o `aria-controls` referencia um id ausente do DOM.

## Fronteira

Não busca (`nmInterface`/`$jt.repository` ficam fora — em remoto emite `request`), não filtra (a página filtra; `rows` chega pronta) e não ordena. Com `rowsNumber` informado, `rows` **já é a página** e o componente não refatia.

## Estados

`default` · `loading` (`aria-busy`) · `empty` (com saída quando há filtro) · `error` (`DssBanner` + nova tentativa) · `selected` (checkbox marcado **mais** tinte e borda) · `revealed` (por ficha) · `disabled`.

## Tokens

`--dss-text-body` · `--dss-text-subtle` · `--dss-text-disabled` · `--dss-surface-default` · `--dss-surface-subtle` · `--dss-surface-selected` · `--dss-border-subtle` · `--dss-border-focus` · `--dss-brand-primary` · `--dss-font-family-sans` · `--dss-font-size-{xs,sm,md}` · `--dss-spacing-{1,2,3,6,56,64,80,120}`.

Nenhum token local é declarado — camada que declara e não consome é camada inerte.

## Acessibilidade

- **1.3.1** — `<ul>`/`<li>` para os registros e `<dl>`/`<dt>`/`<dd>` para os campos. Rótulo e valor vinculados sem ARIA extra.
- **4.1.2** — raiz com `aria-busy`/`aria-disabled`; revelador com `aria-expanded` + `aria-controls` apontando para o bloco real; checkbox com `aria-label` contextual (`Selecionar <título da ficha>`).
- **4.1.3** — contagem em região viva `aria-live="polite"`: paginar e filtrar trocam o conteúdo sem mover o foco.
- Seleção não depende de cor nem de deslocamento. A origem usava `transform: scale(0.95)`, que some em `prefers-reduced-motion` e não existe para quem não enxerga.
- Em `forced-colors`, tinte e zebra somem; a borda do card selecionado assume como único sinal.

## Exemplos

### 1 — Ficha mínima

```vue
<DssDataGrid :rows="registros" :fields="campos" :total="registros.length" title="Clientes" />
```

### 2 — Campos secundários atrás do revelador

```vue
<DssDataGrid
  :rows="registros"
  :fields="[
    { name: 'nome', label: 'Solicitante' },
    { name: 'protocolo', label: 'Protocolo' },
    { name: 'bairro', label: 'Bairro', visibility: 'hidden' },
    { name: 'abertura', label: 'Abertura', visibility: 'hidden' },
  ]"
  title="Solicitações"
/>
```

### 3 — Seleção múltipla com ações no cabeçalho

```vue
<DssDataGrid v-model="selecionados" :rows="registros" :fields="campos" selection="multiple">
  <template #head-actions="{ selected, disabled }">
    <DssButton label="Exportar" icon="download" variant="outline" size="sm"
      :disabled="disabled || !selected.length" @click="exportar(selected)" />
  </template>
</DssDataGrid>
```

### 4 — Paginação remota

```vue
<DssDataGrid
  v-model:page="pagina"
  :rows="paginaAtual"
  :fields="campos"
  :rows-number="totalRemoto"
  :rows-per-page="12"
  :loading="carregando"
  :error="erro"
  @request="buscar"
  @retry="buscar({ page: pagina, rowsPerPage: 12 })"
/>
```

### 5 — Ficha inteiramente customizada

```vue
<DssDataGrid :rows="registros" :fields="campos">
  <template #item="{ row, selected }">
    <article :class="{ 'is-selected': selected }">
      <h3>{{ row.nome }}</h3>
      <p>{{ row.resumo }}</p>
    </article>
  </template>
</DssDataGrid>
```
