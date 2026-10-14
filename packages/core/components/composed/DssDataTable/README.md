# DssDataTable

Composto operacional inspirado no `jtech-data-table`, reconstruído sobre o DSS. Reúne `DssTable`, filtro, seleção, ações, expansão e estados sem acessar rede nem mutar dados do consumidor.

## Quando usar

- Grades operacionais locais ou remotas com filtro, paginação e seleção.
- Ações em lote ou por linha com contrato serializável.
- Detalhes expansíveis cujo conteúdo pertence ao produto.

## Quando não usar

- Tabela apenas informativa: use `DssMarkupTable`.
- Edição inline: ainda não faz parte deste contrato.
- Feed infinito remoto: componha um fluxo específico com `DssInfiniteScroll`.

## Limites conscientes

Não incorpora `nmInterface`, `$jt.repository`, `expr-eval`, Stylus, mixins de QTable, imagens automáticas, edição de célula ou mutação interna. No modo remoto, emite `request`; o produto busca os dados e atualiza `rows`, `loading`, `error` e `pagination`.

## Estados

Default, loading, empty, filtered-empty, error, selected e expanded. `disabled` impede filtro, ações, seleção e expansão sem aplicar opacidade no contêiner.

## Composição

- `DssTable`: semântica, ordenação, paginação e motor tabular.
- `DssInput`: filtro.
- `DssButton`: ações e expansão.
- `DssCheckbox`: seleção no body composto.
- `DssBanner`: falha de carregamento.
- `DssEmptyState`: vazio contextual customizável.

## Tokens

Usa somente tokens genéricos, incluindo `--dss-spacing-*`, `--dss-surface-subtle`, `--dss-border-subtle`, `--dss-text-body`, `--dss-text-disabled` e `--dss-touch-target-md`.

## Acessibilidade

Preserva a tabela nativa do `DssTable`; ações e seleção recebem nomes por linha; loading e disabled são comunicados na região; detalhes expandidos permanecem imediatamente após sua linha.
