# DssComposition — contrato normativo

## Decisão

A composição é **um campo de formulário cujo valor é a lista de sub-registros**. Ela se
registra no `DssForm` mestre pelo `useFieldValidation` (o mesmo de `DssInput`,
`DssCheckbox`, `DssToggle` e `DssRadio`), e não tem motor de validação próprio. O pai não
chama `validate()` à mão, como o legado fazia via `$refs`.

## Os três riscos, e como cada um é provado

| Risco | Mitigação | Prova |
|---|---|---|
| 1 — participar do `DssForm` mestre | `useFieldValidation` (`useFormChild`) | sem o `useFormChild`, o teste "coleção obrigatória vazia reprova o validate() do DssForm mestre" falha |
| 2 — campos do modal no mestre | o slot `form` vive num `DssForm` próprio | sem ele, "campo obrigatório vazio no modal aberto NÃO reprova o mestre" falha |
| 4 — chave e mutação | `rowKey` obrigatório, aviso em DEV, array novo | mutar o array faz "emite um array NOVO ao salvar" falhar |

O teleporte do `DssDialog` muda o DOM, não a árvore do Vue: sem o `DssForm` próprio, o
`useFormChild` dos campos do modal acharia o mestre.

## Fronteira de dados

A composição emite; o consumidor persiste. Ativar e inativar **não alteram o valor** — a
composição não sabe o que é registro "ativo" (decisão C). Ela confirma e entrega a intenção.

## Ações por linha

`rowActions` aceita função (decisão D): o consumidor decide por linha. A função é repassada
ao `DssDataTableClaudeCode`, que desenha os botões — a composição não redesenha nada.

## O que não se herda da origem

- `__index` gravado nos registros do consumidor.
- Formulário gerado por metadados (`jt-dynamic-form`) e cópia de campos do mestre por
  repositório (`dependencias*`).
- `$q.dialog` cru — vira `DssDialog`.
- Validação chamada à mão pelo pai.

## Marca

`brand` vira `data-brand` na raiz **e nos dois diálogos**, que são teleportados para fora
dela e não herdariam a cascata. Nada é pintado em `_brands.scss`.

## Responsabilidade do consumidor

- Devolver a chave em `newRecord`.
- Montar o formulário do registro no slot `form`, com campos DSS.
- Persistir ativar/inativar e, se quiser, gravar o resultado no servidor.
