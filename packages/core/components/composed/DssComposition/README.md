# DssComposition / DssCompositions

Editor de **registros filhos** (mestre-detalhe) de um formulário: contatos de um cliente, itens de um contrato, ligações de um imóvel. Equivalente DSS do legado `jtech-composition`.

## Quando usar
- Um registro principal possui uma lista de filhos que o usuário inclui, edita, exclui, ativa ou inativa antes de salvar o principal.
- Várias listas filhas no mesmo formulário → `DssCompositions` (abas com obrigatoriedade e contagem).

## Quando NÃO usar
- Listagem operacional com filtro/paginação remota → `DssDataTable`.
- Informação estática → `DssMarkupTable`.
- Persistência imediata no servidor a cada linha: o componente edita **em memória**; quem salva é o consumidor.

## O que faz / não faz / assume
- **Faz:** tabela compacta (via `DssDataTable`), diálogo de inclusão/edição/detalhe (`DssDialog`), confirmação de exclusão/ativação, validação de obrigatoriedade.
- **Não faz:** chamadas remotas (`montarTela`, `manterComponente`), formulário dinâmico, tradução `$gettext`, edição inline.
- **Assume:** cada linha tem `rowKey` único (gera `new-*` na inclusão se ausente); `activeField` booleano (padrão `available`).

## API — DssComposition
| Prop | Tipo | Padrão |
|---|---|---|
| `modelValue` | `Row[]` (v-model) | — |
| `columns` | `DssTableColumn[]` | — |
| `rowKey` | `string` | `'id'` |
| `title` / `ariaLabel` | `string` | `''` |
| `required` | `boolean` | `false` |
| `requiredMessage` | `string` | `'Adicione ao menos um registro ativo.'` |
| `operations` | `('add'\|'edit'\|'remove'\|'toggle'\|'detail')[]` | `['add','edit','remove']` |
| `activeField` | `string` | `'available'` |
| `createDraft` | `() => Row` | — |
| `validateDraft` | `(draft, mode) => string \| null` | — |
| `disabled` / `loading` | `boolean` | `false` |
| `density` | `DssTableDensity` | `'compact'` |
| `brand` | `'hub'\|'water'\|'waste'\|null` | `null` |
| `noDataLabel` | `string` | `'Nenhum registro adicionado'` |

**Eventos:** `update:modelValue(rows)` (sempre novo array), `change({ type, row, index })`, `validate(valid)`.
**Slots:** `form({ draft, mode, error })` — campos editam `draft` diretamente; `detail({ row })` — padrão é lista `dl` das colunas; `top-right`.
**Expose:** `validate()`, `resetValidation()`, `openAdd()`.

## API — DssCompositions
Props: `items: { name, label, icon?, required?, count?, invalid? }[]`, `modelValue` (aba), `ariaLabel`, `brand`. Slot nomeado por `item.name` com `{ item }`. Eventos: `update:modelValue`.

## Estados
- **Hover/focus/active:** herdados de `DssButton` e `DssDataTable` (sem estado próprio).
- **Disabled:** desabilita Adicionar e ações de linha. **Loading:** repassado à tabela.
- **Inválido:** `aria-invalid="true"` + `DssBanner` erro com `role="alert"` (só após interação ou `validate()`).
- **Inativo:** linha permanece; coluna "Situação" mostra "Inativo"; edição bloqueada.

## Tokens
`--dss-text-body`, `--dss-text-subtle`, `--dss-text-disabled`, `--dss-spacing-1`, `--dss-spacing-2`, `--dss-spacing-3`, `--dss-spacing-96`, `--dss-font-size-xs`, `--dss-font-weight-semibold`, `--dss-feedback-error`, `--dss-action-primary`.

## Exemplos
Ver `DssComposition.example.vue` e sandbox **Compostos › DssComposition**: (1) contatos obrigatórios com formulário; (2) ativar/inativar; (3) somente leitura com detalhe; (4) abas `DssCompositions`; (5) marca Hub/Water/Waste e tema escuro.

Migração do legado: `MIGRATION_JTECH_COMPOSITION.md`.
