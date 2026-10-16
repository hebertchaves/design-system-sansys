# 🤖 PRÉ-PROMPT: DssComposition (Fase 3)

> **Contexto:** Contrato de Interface do composto Fase 3 que migra o `JtComposition` do
> [WebComps-to-DSS](https://github.com/hebertchaves/WebComps-to-DSS). De-para completo,
> passo zero e decisões: `packages/core/components/composed/DssComposition/MIGRATION_JTECH_COMPOSITION.md`.
> Peça irmã: `pre_prompt_dss_composition_group.md` (o container de abas).

## 1️⃣ CLASSIFICAÇÃO E CONTEXTO
- **Nome:** `DssComposition`
- **Fase:** Fase 3 — Componente Composto
- **Classificação:** `Action` (interativo: inclui, edita e remove registros)
- **Categoria:** Formulário — coleção de sub-registros
- **Golden Reference:** `DssChip` (interativo)
- **Golden Context:** `DssDataTableClaudeCode` (é a peça que esta composição envolve; o
  enquadramento e os estados vêm dele)
- **Justificativa:** todo cadastro mestre do Sansys tem coleções filhas (endereços,
  contatos, medidores…). O `JtComposition` resolvia isso com acesso a repositório dentro do
  componente, formulário gerado por metadados e validação chamada à mão pelo pai. No DSS a
  composição é **um campo de formulário cujo valor é a lista de sub-registros**: participa
  do `DssForm` como qualquer campo, e o consumidor monta o formulário do registro.

## 2️⃣ CONTRATO DE INTERFACE

### 2.1. Casos de Uso Negativos
- ❌ Não busca nem persiste dados. Não há rede dentro do componente; ativar e inativar
  emitem a intenção e o consumidor muda o registro.
- ❌ Não gera formulário a partir de metadados. O formulário é o slot `form`, montado pelo
  consumidor com campos DSS.
- ❌ Não decide entre excluir e inativar. O consumidor diz quais ações cada linha mostra
  (Decisão C).
- ❌ Não inventa chave de registro. `rowKey` é obrigatório e o registro novo chega com a
  chave pela fábrica `newRecord` (ver Risco 4).
- ❌ Não muta o array do consumidor. Toda mudança sai como **array novo** em
  `update:modelValue`.
- ❌ Não reimplementa a tabela, as ações nem a paginação: são do `DssDataTableClaudeCode`.
- ❌ Não traduz. Rótulos são props com padrão em português.

### 2.2. Matriz de Composição
- ✅ `DssDataTableClaudeCode` — a lista, a seleção, as ações da barra e da linha, o vazio
- ✅ `DssDialog` — o modal do formulário e a confirmação
- ✅ `DssForm` — **dentro do modal**, envolvendo o slot `form` (ver Risco 2)
- ✅ `DssButton` — confirmar e cancelar, no rodapé dos diálogos
- ✅ `DssBanner` — a mensagem de erro do campo ("inclua ao menos um registro")
- ❌ `DssActionMenu` — o DataTable já monta as ações com `DssButton`
- ❌ Quasar cru, `$q.dialog`, `jt-*`

### 2.3. Estado de Falha e Loading
- **Loading:** `loading` repassado ao `DssDataTableClaudeCode`, que já tem o estado.
- **Vazio:** o vazio do DataTable (`emptyTitle`/`emptyDescription`, slot `empty`). Coleção
  obrigatória e vazia **depois de validada** mostra o erro do campo em `DssBanner`.
- **Falha de validação:** `temErro`/`mensagemDeErro` do `useFieldValidation`, com a mesma
  semântica dos campos DSS (regra roda depois de interação ou no submit, não ao abrir).

## 3️⃣ O GRANDE RISCO ARQUITETURAL

- **Risco 1 — participar do `DssForm` mestre (decisão 3).**
  **Mitigação:** reusar `packages/core/composables/useFieldValidation.ts`, que já faz isso
  para `DssInput`, `DssCheckbox`, `DssToggle` e `DssRadio` sobre o `useFormChild` do Quasar.
  `modelValue: () => linhas`; `required` vira a regra `l => l.length > 0 || requiredMessage`.
  Nenhum motor paralelo.
- **Risco 2 — os campos do formulário do modal se registrarem no formulário MESTRE.**
  O `useFormChild` injeta o formulário mais próximo na árvore do Vue; o teleporte do
  `DssDialog` muda o DOM, não essa árvore. Com o modal aberto, o `validate()` do mestre
  validaria os campos do modal.
  **Mitigação:** o slot `form` fica dentro de um `DssForm` próprio, que passa a ser o
  formulário mais próximo daqueles campos. **Provar em spike antes do esqueleto.**
- **Risco 4 — chave do registro novo.** O legado escrevia `__index` nos registros do
  consumidor. Aqui `rowKey` é obrigatório e a fábrica `newRecord()` precisa devolver a chave.
  Em dev, chave ausente ou repetida gera aviso no console (falha visível, não silêncio).

## 4️⃣ MAPEAMENTO DE API (DSS vs LEGADO vs QUASAR)

| Prop/Slot/Evento | Origem | Ação DSS | Justificativa / Tipo |
|---|---|---|---|
| `modelValue` | legado (`data` + `.sync`) | Criar | `Record<string, unknown>[]` — valor do campo; v-model |
| `columns` | legado | Expor | repassado ao DataTable |
| `rowKey` | legado | Expor (obrigatório) | sem padrão `__index`: chave é dado do consumidor |
| `label` | legado (`title`) | Expor | rótulo do campo e da aba no grupo |
| `name` | legado (`id`) | Expor (obrigatório no grupo) | identifica a aba e o registro no grupo |
| `required` / `requiredMessage` | legado (`required`) | Expor | regra "ao menos um registro" sobre `useFieldValidation` |
| `rules` | DSS (família de campo) | Criar | `DssFieldRule<linhas>[]` — paridade com `DssInput` |
| `actions` / `rowActions` | legado (`buttons`) | Expor | forma do DataTable + `intent?: 'add' \| 'edit' \| 'remove' \| 'activate' \| 'inactivate' \| 'detail'` e `confirm?: { title, message }` |
| `selection` | legado (`multiselect`) | Expor | enum do DataTable |
| `newRecord` | DSS | Criar | `() => Record<string, unknown>` — semente do registro em inclusão (com a chave) |
| `addTitle` / `editTitle` | legado (`$gettext`) | Criar | título do modal, padrão em português |
| `loading`, `disabled`, `readonly`, `brand` | DSS | Criar | `readonly` substitui o `buttonHidden` do legado |
| `isPaginated` | legado | Bloquear | paginação é do DataTable, sempre ligada (Decisão B) |
| `modelForm`, `allowCustomEditModal`, `dependencias*` | legado | Bloquear | viram o slot `form` |
| slot `form` | legado (`modal-form`) | Expor | escopado: `{ record, mode: 'add' \| 'edit' }` — `record` é rascunho, não o registro original |
| slots `head-actions`, `empty` | DataTable | Expor | repasse |
| `update:modelValue` | DSS | Criar | array novo a cada inclusão, edição ou exclusão confirmada |
| `activate` / `inactivate` / `detail` | legado (`on-*`) | Expor | `{ rows }` — intenção; o consumidor persiste |
| `action` | legado (`action-click`) | Expor | ação sem `intent`: `{ action, rows }` — dado, nunca a instância |
| `form-close` | legado | Expor | — |
| `validate()` / `resetValidation()` | legado | Expor | vindos do `useFieldValidation`; o `DssForm` chama sozinho |

## 5️⃣ GOVERNANÇA DE TOKENS E COMPOSIÇÃO
- **Layout:** sem `:deep()`. O espaço entre tabela e erro sai do `gap` do contêiner raiz.
- **Atributos:** `inheritAttrs: false` + `v-bind="$attrs"` no contêiner raiz.
- **Marca:** `brand` vira `data-brand` no contêiner raiz (rota de atributo, gate
  `validate:brand-form`); os filhos herdam pela cascata de CSS var.
- **Estado:** `disabled`/`readonly` repassados por prop aos filhos diretos (são poucos e
  conhecidos); o grupo usa provide/inject tipado (ver o pré-prompt dele).
- **Tokens:** só os do contêiner — `--dss-spacing-3` (gap entre tabela e erro),
  `--dss-spacing-2`. Cor nenhuma no SCSS: tudo vem dos componentes compostos.

## 6️⃣ ACESSIBILIDADE E ESTADOS
- **ARIA:** o contêiner raiz é `role="group"` com `aria-labelledby` apontando o rótulo, e
  `aria-invalid`/`aria-describedby` apontando a mensagem de erro quando inválido.
- **Foco:** ao fechar o modal ou a confirmação, o foco volta ao botão que abriu (o
  `DssDialog` entrega isso; a afirmação 2.4.3 dele é débito aberto e esta composição o herda).
- **Teclado:** herdado do DataTable e do `DssDialog` (ESC fecha; o modal não é armadilha).
- **Afirmações a11y nascem ancoradas** (`test` ou `ariaAttrs` no meta), cada teste provado
  por mutação. Nenhuma entra no baseline.

## 7️⃣ SUPERFÍCIE DE PLAYGROUND
1. **Fluxo principal:** cadastro mestre com uma coleção obrigatória — incluir, editar,
   excluir com confirmação; submeter o mestre vazio e ver o erro do campo.
2. **Estado:** `disabled`, `readonly` e `loading` sobre a árvore inteira.
3. **Slots:** o slot `form` com campos DSS reais (`DssInput`, `DssSelect`).
4. **Marca:** Hub, Water e Waste, claro e escuro.

## 1️⃣1️⃣ REQUISITOS DE TESTES UNITÁRIOS 🔒 BLOQUEANTE
Os quatro domínios do `TEMPLATE_FASE3.md` (renderização, propagação, lógica composta,
ARIA), mais, por causa dos riscos declarados:
- [ ] `DssForm.validate()` do mestre responde `false` com coleção obrigatória vazia
  (**mutação:** sem o `useFormChild`, o teste falha).
- [ ] Com o modal aberto e um campo obrigatório vazio dentro dele, o `validate()` do mestre
  **não** reprova por causa desse campo (Risco 2).
- [ ] Inclusão, edição e exclusão emitem array **novo**; o array recebido não é mutado.
- [ ] Ação com `intent: 'remove'` pede confirmação antes de emitir.
