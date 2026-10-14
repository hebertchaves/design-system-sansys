# Pré-prompt: DssDataTable (Fase 3)

## Classificação e contexto

- Nome: `DssDataTable`
- Fase: 3 — composto operacional
- Golden Context: `DssDataCard`
- Justificativa: estrutura recorrente de tabela com filtro, estados, ações, seleção e expansão sem repetir composição nas telas.

## Casos negativos

- Não acessa rede, repositório global ou `nmInterface`.
- Não edita células, interpreta expressões, autoriza ações ou muta linhas.
- Não cria scroll infinito nem um segundo proprietário de scroll.
- Não expõe Quasar cru ou API compatível por aliases com Vue 2.

## Matriz de composição

- `DssTable`: motor tabular.
- `DssInput`: filtro.
- `DssButton`: ações e expansão.
- `DssCheckbox`: seleção quando o body é composto.
- `DssBanner`: erro.
- `DssEmptyState`: vazio customizado.

## Estados

Loading mantém a estrutura e comunica `aria-busy`. Erro usa uma única superfície com nova tentativa. Vazio e filtro sem resultado usam o contrato do `DssTable`, com slot de substituição.

## Risco e mitigação

O maior risco é reimplementar QTable ao adicionar expansão. A mitigação é manter `DssTable` como motor, usar somente o slot `body` para a estrutura necessária e cobrir semântica, seleção e paginação em testes e browser real.

## API

Expõe API DSS controlada. `mode=remote` apenas altera o contrato de filtro/request; o consumidor fornece dados e estados. `dark`, `color`, `nmInterface`, `columnEdit`, `forms` e `defaultHttpOptions` são bloqueados.

## Acessibilidade

Região nomeada; tabela semântica; nomes contextuais para seleção, expansão e ações; ordem natural de tabulação. Tema e marca por contexto.
