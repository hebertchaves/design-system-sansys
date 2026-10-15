# Migração `jtech-composition` → `DssComposition`

| Legado | DSS | Decisão |
|---|---|---|
| `JtCompositions` (QTabs + QTabPanels, label `título * (n)`) | `DssCompositions` (DssTabs/DssTab/DssTabPanels) | Mantido. `alert` na aba quando `invalid`. |
| `JtComposition` sobre `jt-data-table` | `DssComposition` sobre `DssDataTable` | Mantido. |
| `data` mutado in-place (`splice`, `$set`, `__index`) | `v-model` imutável + `change` | Reescrito: nunca muta a prop. |
| `buttons` com nomes mágicos `icAdicionarComposicao`, `icAlterar…`, `icExcluir…`, `icInativar…`, `icAtivar…`, `icDetalhar…` | `operations: ['add','edit','remove','toggle','detail']` | Reescrito. |
| `JtCompositionFormModal` (QDialog + QLayout + jt-dynamic-form) | `DssDialog` + slot `form` | Formulário pertence ao consumidor. |
| `$jt.repository.montarTela` / `manterComponente('salvarComposicao')` | — | **Não migrado.** Acesso remoto é do produto; use `validateDraft` e o evento `change`. |
| `$q.dialog` de confirmação | `DssDialog` de confirmação interno | Mantido. |
| `required` + `validate()` / `resetValidation()` | Iguais (expose) + evento `validate` | Mantido; considera apenas registros ativos. |
| `allowCustomEditModal` + `on-add/on-edit` | Slot `form` | Substituído. |
| `CrudLayoutModalPage` (detalhe) | Diálogo `detail` + slot `detail` | Simplificado. |
| `dependenciasObrigatoria`, `modelForm`, `isPaginated`, `multiselect` | — | **Não migrados** (regra de produto / sem uso no editor). |
| `$gettext` | Textos em pt-BR por prop | i18n fica para contrato próprio. |
| Estilo stylus `#jt-compositions` ocultando setas | — | Removido; DssTabs governa. |
