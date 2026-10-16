# DssComposition — API Reference

Tipos em `types/composition.types.ts` — **a fonte**; esta página é derivada.

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `modelValue` | `DssCompositionRow[]` | — | As linhas: o **valor** do campo (v-model). Nunca é mutado |
| `columns` | `DssTableColumn[]` | — | Colunas da tabela, repassadas ao `DssDataTableClaudeCode` |
| `rowKey` | `string` | — | Chave de cada registro. Obrigatória e sem padrão |
| `label` | `string` | — | Rótulo do campo: título do bloco e da aba no grupo |
| `name` | `string` | `undefined` | Identifica a coleção no `DssCompositionGroup` (obrigatório lá) |
| `required` | `boolean` | `false` | Exige ao menos um registro no `validate()` do `DssForm` |
| `requiredMessage` | `string` | `'Inclua ao menos um registro.'` | Mensagem da regra `required` |
| `rules` | `DssFieldRule<DssCompositionRow[]>[]` | `undefined` | Regras extras sobre a lista, com a semântica dos campos DSS |
| `actions` | `DssCompositionAction[]` | `[Incluir]` | Ações da barra |
| `rowActions` | `DssCompositionAction[] \| ((row) => DssCompositionAction[])` | `[Editar, Excluir]` | Ações de cada linha; função decide por linha |
| `selection` | `'none' \| 'single' \| 'multiple'` | `'none'` | Seleção de linhas |
| `selected` | `DssCompositionRow[]` | `[]` | Linhas selecionadas (v-model:selected) |
| `newRecord` | `() => DssCompositionRow` | `undefined` | Semente do registro em inclusão — deve trazer a chave |
| `addTitle` | `string` | `'Incluir registro'` | Título do modal em inclusão |
| `editTitle` | `string` | `'Editar registro'` | Título do modal em edição |
| `saveLabel` | `string` | `'Salvar'` | Botão que salva o modal |
| `cancelLabel` | `string` | `'Cancelar'` | Botão que fecha o modal e a confirmação |
| `loading` | `boolean` | `false` | Carregando (repassado à tabela) |
| `error` | `string \| null` | `null` | Falha de carga (repassada à tabela, com "tentar novamente") |
| `disabled` | `boolean` | `false` | Inerte: sem ações e **sem validação** |
| `readonly` | `boolean` | `false` | Lista visível, sem ações e sem validação |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca: `data-brand` na raiz e nos diálogos |
| `emptyTitle` | `string` | `'Nenhum registro incluído'` | Título do vazio |
| `emptyDescription` | `string` | `'Os registros incluídos aparecem aqui.'` | Descrição do vazio |

### `DssCompositionAction`

As props do `DssDataTableCcAction` (`name`, `label`, `icon`, `color`, `mode`, `disabled`) mais:

| Campo | Tipo | Efeito |
|---|---|---|
| `intent` | `'add' \| 'edit' \| 'remove' \| 'activate' \| 'inactivate' \| 'detail'` | O que a composição faz ao acionar. Ausente, emite `action` |
| `confirm` | `{ title, message, confirmLabel? } \| false` | Texto da confirmação; `false` executa sem perguntar |

| `intent` | Efeito |
|---|---|
| `add` | Abre o modal com `newRecord()`; ao salvar, emite `update:modelValue` com a linha nova |
| `edit` | Abre o modal com uma **cópia** da linha; ao salvar, substitui pela chave |
| `remove` | Confirma; ao confirmar, emite `update:modelValue` sem as linhas |
| `activate` / `inactivate` | Confirma; ao confirmar, emite `activate` / `inactivate`. **Não muda o valor** |
| `detail` | Emite `detail` |

## Eventos

| Evento | Payload | Quando |
|---|---|---|
| `update:modelValue` | `DssCompositionRow[]` | Inclusão, edição ou exclusão confirmada — sempre um array **novo** |
| `update:selected` | `DssCompositionRow[]` | Seleção mudou, ou linha selecionada foi excluída |
| `activate` | `{ action, rows, row? }` | Ativar confirmado — o consumidor muda o registro |
| `inactivate` | `{ action, rows, row? }` | Inativar confirmado — o consumidor muda o registro |
| `detail` | `{ action, rows, row? }` | Ação com `intent: 'detail'` |
| `action` | `{ action, rows, row? }` | Ação sem `intent` |
| `form-close` | — | Modal do registro fechou (salvando ou cancelando) |
| `retry` | — | "Tentar novamente" da falha de carga |

## Slots

| Slot | Escopo | Descrição |
|---|---|---|
| `form` | `{ record, mode: 'add' \| 'edit' }` | Formulário do registro. `record` é o **rascunho**. Vive dentro de um `DssForm` próprio |
| `head-actions` | `{ selected, disabled }` | Substitui a barra de ações |
| `empty` | `{ filtered }` | Substitui o estado vazio |

## Métodos expostos

| Método | Retorno | Descrição |
|---|---|---|
| `validate()` | `boolean \| Promise<boolean>` | Roda as regras. O `DssForm` mestre chama sozinho |
| `resetValidation()` | `void` | Limpa o estado de erro, sem tocar o valor |

## Tipos

`DssCompositionRow`, `DssCompositionAction`, `DssCompositionIntent`, `DssCompositionConfirm`,
`DssCompositionRowActions`, `DssCompositionFormMode`, `DssCompositionFormScope`,
`DssCompositionActionPayload`, `DssCompositionExpose`.

## Classes CSS

| Classe | Onde |
|---|---|
| `.dss-composition` | raiz |
| `.dss-composition--invalid` | coleção inválida |
| `.dss-composition--disabled` / `--readonly` | estados |
| `.dss-composition__form` | o `DssForm` do modal |
| `.dss-composition__dialog-title` | título dos dois diálogos |
| `.dss-composition__confirm-message` | texto da confirmação |
