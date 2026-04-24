# DssCadrisCard

Componente composto Fase 3 do DSS para pesquisa e listagem de Cadris.

## Quando usar

Use `DssCadrisCard` quando precisar exibir uma interface completa de consulta de registros de Cadri, com filtros, tabela de resultados e paginação, gerenciada por um componente pai que controla os dados.

## Quando NÃO usar

- **Não use** para exibir listas genéricas sem os campos específicos de Cadri — prefira `DssDataCard` ou `DssList`.
- **Não use** se precisar de chamadas de API diretas dentro do componente — os dados são sempre gerenciados pelo pai via props e eventos.

## Instalação

```js
import { DssCadrisCard } from '@dss/components/DssCadrisCard'
```

## Uso básico

```vue
<DssCadrisCard
  :rows="cadrisRows"
  :loading="isLoading"
  :pagination="pagination"
  :documento-options="documentoOptions"
  :aterro-options="aterroOptions"
  @search="handleSearch"
  @close="handleClose"
  @update:pagination="handlePagination"
/>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `rows` | `CadrisRow[]` | `[]` | Linhas de dados da tabela |
| `loading` | `boolean` | `false` | Ativa estado de carregamento (skeleton + botão) |
| `pagination` | `CadrisPagination` | `undefined` | Objeto de paginação para v-model |
| `disable` | `boolean` | `false` | Desabilita toda interação |
| `documentoOptions` | `SelectOption[]` | `[]` | Opções do select Documento |
| `aterroOptions` | `SelectOption[]` | `[]` | Opções do select Aterro |

## Eventos

| Evento | Payload | Descrição |
|---|---|---|
| `search` | `CadrisFilters` | Emitido ao clicar em Pesquisar |
| `close` | — | Emitido ao clicar em FECHAR |
| `update:pagination` | `CadrisPagination` | Emitido ao navegar entre páginas |

## Slots

| Slot | Descrição |
|---|---|
| `toolbar-actions` | Ações adicionais na toolbar, antes do botão fechar |

## Estados

| Estado | Comportamento |
|---|---|
| **loading** | Skeleton na tabela, botão Pesquisar com spinner |
| **empty** | Mensagem "Nenhum resultado encontrado" centralizada |
| **disable** | Todos os controles desabilitados via provide/inject |
| **hover (linha)** | Fundo com `--dss-surface-hover` |

## Tipos

```ts
interface CadrisRow {
  id: string | number
  numeroCadri: string
  gerador: string
  aterro: string
  documento: string
  situacao: 'ativo' | 'inativo'
  validade: string
}

interface CadrisPagination {
  page: number
  rowsPerPage: number
  rowsNumber: number
}

interface CadrisFilters {
  cadri: string
  gerador: string
  documento: string | null
  aterro: string | null
}
```

## Tokens utilizados

- `--dss-surface-muted` — fundo do cabeçalho da tabela
- `--dss-surface-subtle` — fundo de linhas alternadas
- `--dss-surface-hover` — fundo de linha em hover
- `--dss-text-primary` / `--dss-text-secondary` — cores de texto
- `--dss-gray-200` / `--dss-gray-300` — bordas divisórias
- `--dss-opacity-disabled` — opacidade no estado disabled
- `--dss-font-size-sm` / `--dss-font-weight-medium` — tipografia da tabela
- `--dss-duration-150` / `--dss-easing-standard` — transição de hover

## Links

- [Documentação normativa](./DssCadrisCard.md)
- [API Reference](./DSSCADRISCARD_API.md)
- [Exemplos interativos](./DssCadrisCard.example.vue)
