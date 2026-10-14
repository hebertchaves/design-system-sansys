# DssDataTable - Claude Code — contrato normativo

## Decisão

`DssDataTableClaudeCode` é um composto Fase 3 e **não substitui** o `DssTable`: dá a ele o enquadramento operacional que os patterns "Check-in NFAg - Paralelo" e "Solicitações" já tinham consolidado em CSS de página — cabeçalho, contagem viva, barra de ações, cartão, situação como chip e vazio com saída.

Ele convive, deliberadamente, com o `DssDataTable`. Duas leituras do mesmo componente de origem, sob a mesma governança, para que a comparação seja sobre decisões e não sobre acabamento.

## O que foi promovido de pattern a componente

| Pattern | Elemento | Por que vira componente |
|---|---|---|
| Solicitações | `.sol-card` + `.sol-card__head` | o enquadramento se repetia a cada tela de grade |
| Solicitações | `.sol-contagem` (`aria-live`) | anúncio de mudança sem movimento de foco é regra, não enfeite |
| Solicitações | `#body-cell-situacao` com chip | situação por cor+ícone é contrato de a11y (1.4.1) |
| NFAg | chip removível do filtro | o mesmo gesto informa o filtro e oferece a saída |
| NFAg | `DssEmptyState` com `#action` | vazio sem ação é beco |
| NFAg | `.nf-detail` sobre `--dss-surface-subtle` | o detalhe precisa se distinguir da grade |

## Divergências deliberadas do legado Jtech

`fields` → `columns`; `data` → `rows`; os três booleanos de seleção (`singleselect`/`multiselect`/`noneselect`) → `selection`; `nmInterface` e `$jt.repository` saem (o bloco não acessa rede); `columnEdit` fica fora.

**O que NÃO diverge:** o `mode` dos botões. `SINGLE`/`MULTI`/`ANY`/`NONE` é um contrato de quatro estados e está preservado em minúsculas. Reduzi-lo a um booleano perde `any` e `multi`.

## Fronteira de dados

O bloco **não filtra e não busca**. Recebe `rows` já filtradas e `total` para o denominador; em `mode="remote"` emite `request` e espera o produto atualizar `rows`, `loading`, `error` e `pagination`. É a fronteira que o pattern "Solicitações" documentou para o `DssDataBoard`, aplicada aqui pelo mesmo motivo: um componente que filtra vira componente de dados.

## Scroll

O `DssTable` é dono do scroll tabular. Este composto não cria um segundo contêiner rolável. A paginação fica ligada por padrão — `rowsPerPage: 0` faz a grade crescer até o container e ganhar rolagem própria por arredondamento de meio pixel do `border-collapse` (medido e registrado no pattern "Solicitações").

## Marca

Superfície de **conteúdo**: as ações dentro do bloco seguem o peso semântico, não o produto. A marca pinta um único traço de identidade na borda do cartão, com `--dss-brand-primary` — tier de indicador, piso 3:1 (DSS_MODELO_PROPAGACAO_MARCA.md §9.4). Nenhum token local é declarado sem consumo na mesma regra.

## Responsabilidade do consumidor

Filtrar as linhas e informar `total`; responder a `request` no modo remoto; autorizar ações; fornecer o conteúdo do detalhe; traduzir rótulos do domínio; declarar o `statusMap` de cada situação que a tela exibe.
