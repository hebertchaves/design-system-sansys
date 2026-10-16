# DssComposition

Coleção de sub-registros como **campo de formulário**. Lista, inclui e edita por modal,
confirma as ações destrutivas e responde ao `validate()` do `DssForm` mestre.

Migração do `JtComposition` (WebComps Jtech). De-para, decisões e riscos:
[`MIGRATION_JTECH_COMPOSITION.md`](./MIGRATION_JTECH_COMPOSITION.md). Várias coleções em
abas: [`DssCompositionGroup`](../DssCompositionGroup/README.md).

## Quando usar

- Um cadastro mestre tem uma lista filha editada junto com ele: contatos, endereços,
  medidores, dependentes.
- A lista precisa entrar na validação do formulário ("inclua ao menos um endereço").

## Quando NÃO usar

- **A lista é só para consulta.** Use o `DssDataTableClaudeCode` direto.
- **Os registros são gravados um a um, no servidor, fora do formulário.** A composição não
  persiste nada; ela é o valor de um campo. Uma tela de CRUD é pattern de produto.
- **Edição dentro da célula.** Fora de escopo: a edição é pelo modal.

## O que ela NÃO faz

- Não busca nem persiste registros. Ativar e inativar **emitem a intenção**; o consumidor
  muda o registro.
- Não gera formulário por metadados. O formulário é o slot `form`.
- Não decide entre excluir e inativar. O consumidor diz quais ações cada linha mostra.
- Não inventa chave: `rowKey` é obrigatório e o registro novo vem com ela em `newRecord`.
- Não muta o array recebido. Toda mudança sai como array novo.
- Não desenha a tabela, as ações nem a paginação: são do `DssDataTableClaudeCode`.

## API

Referência completa: [`DSSCOMPOSITION_API.md`](./DSSCOMPOSITION_API.md).

### Props essenciais

| Prop | Tipo | Padrão |
|---|---|---|
| `modelValue` | `DssCompositionRow[]` | — |
| `columns` | `DssTableColumn[]` | — |
| `rowKey` | `string` | — |
| `label` | `string` | — |
| `required` | `boolean` | `false` |
| `rowActions` | `DssCompositionAction[] \| ((row) => DssCompositionAction[])` | `[Editar, Excluir]` |
| `newRecord` | `() => DssCompositionRow` | — |
| `readonly` / `disabled` / `loading` / `error` / `brand` | — | — |

### Eventos

| Evento | Quando |
|---|---|
| `update:modelValue` | inclusão, edição ou exclusão confirmada — array novo |
| `update:selected` | seleção mudou |
| `activate` | ativar confirmado — o consumidor muda o registro |
| `inactivate` | inativar confirmado — o consumidor muda o registro |
| `detail` | ação com `intent: 'detail'` |
| `action` | ação sem `intent` |
| `form-close` | modal do registro fechou |
| `retry` | "tentar novamente" da falha de carga |

### Slots

| Slot | Escopo |
|---|---|
| `form` | `{ record, mode }` — o rascunho, dentro de um `DssForm` próprio |
| `head-actions` | `{ selected, disabled }` |
| `empty` | `{ filtered }` |

### Métodos expostos

`validate()` · `resetValidation()` — o `DssForm` mestre chama sozinho.

## Estados

| Estado | Como aparece | De quem é |
|---|---|---|
| vazio | vazio do DataTable (`emptyTitle`, `emptyDescription`, slot `empty`) | `DssDataTableClaudeCode` |
| carregando | `loading` | `DssDataTableClaudeCode` |
| falha de carga | `error` + "tentar novamente" (`retry`) | `DssDataTableClaudeCode` |
| inválida | `DssBanner` de erro + `aria-invalid` na raiz | esta composição (`useFieldValidation`) |
| desabilitada | sem ações; não valida | esta composição |
| somente leitura | sem ações; não valida | esta composição |
| modal aberto | `DssDialog` persistente com `DssForm` próprio | esta composição |
| confirmação | `DssDialog`; nada é emitido antes do "sim" | esta composição |
| hover / foco / ativo | de cada botão e da tabela | peças compostas |
| sucesso | **não existe**: a composição não persiste | — |

## Tokens

Só os do contêiner — cor nenhuma no SCSS: `--dss-spacing-3`, `--dss-spacing-4`,
`--dss-text-body`, `--dss-font-family-sans`, `--dss-font-size-lg`,
`--dss-font-weight-semibold`, `--dss-line-height-tight`.

## Acessibilidade

- Sozinha, a raiz é `role="group"` com `aria-label` = `label`. No grupo, é o `tabpanel` da
  própria aba.
- Inválida: `aria-invalid="true"` e `aria-describedby` apontando a mensagem do banner. Não
  nasce em erro antes de validar.
- Excluir, ativar e inativar pedem confirmação (WCAG 3.3.4).
- Foco: entra no modal ao abrir e volta ao botão que abriu ao fechar (do `DssDialog`,
  verificado em Chromium).

## Exemplos

### 1 — Coleção obrigatória num formulário

```vue
<DssForm @submit="salvar">
  <DssComposition v-model="enderecos" label="Endereços" row-key="id" required
                  :columns="colunas" :new-record="() => ({ id: novoId(), logradouro: '' })">
    <template #form="{ record }">
      <DssInput v-model="record.logradouro" label="Logradouro"
                :rules="[v => !!v || 'Informe o logradouro']" />
    </template>
  </DssComposition>
  <DssButton type="submit" label="Salvar" />
</DssForm>
```

### 2 — Ações por linha: registro novo se exclui, gravado se inativa

```vue
<DssComposition v-model="contatos" label="Contatos" row-key="id" :columns="colunas"
                :row-actions="linha => linha.gravado ? [editar, inativar] : [editar, excluir]"
                @inactivate="({ row }) => inativarNoServidor(row)" />
```

### 3 — Somente leitura

```vue
<DssComposition v-model="medidores" label="Medidores" row-key="id" :columns="colunas" readonly />
```

### 4 — Confirmação com texto próprio, ou sem confirmação

```vue
const excluir = { name: 'remove', label: 'Remover', intent: 'remove',
                  confirm: { title: 'Remover dependente', message: 'Ele deixa de constar no cadastro.' } }
const excluirDireto = { name: 'remove', label: 'Remover', intent: 'remove', confirm: false }
```

### 5 — Com marca

```vue
<DssComposition v-model="contatos" label="Contatos" row-key="id" :columns="colunas" brand="water" />
```
