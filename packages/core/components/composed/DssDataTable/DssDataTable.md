# DssDataTable — contrato normativo

## Decisão

`DssDataTable` é um composto Fase 3 e não substitui `DssTable`: fornece uma estrutura operacional recorrente sobre ele. Dados remotos são controlados pelo consumidor. Conteúdo variável usa slots; pele usa tokens e `data-brand`; a estrutura invariante pertence ao composto.

## Divergências deliberadas do legado

A API troca `fields` por `columns`, `data` por `rows` e os três booleanos de seleção por `selection`. Ações geram payload explícito. Expansão é controlada por `expandedKeys`. Rede, tradução, autorização e regras de negócio não entram no componente.

## Scroll

O `DssTable` é o proprietário do scroll tabular. Este composto não cria um segundo contêiner rolável.

## Responsabilidade do consumidor

No modo `remote`, responder a `request`; manter paginação e estado; autorizar ações; fornecer detalhes expandidos; traduzir rótulos do domínio.
