# Migração `jtech-composition` → DSS — passos 0 a 2

> **Trilha:** migração de legado → composto Fase 3.
> **Fonte:** [hebertchaves/WebComps-to-DSS](https://github.com/hebertchaves/WebComps-to-DSS) ·
> `src/components/jtech-composition/` (`JtCompositions.vue`, `JtComposition.vue`,
> `JtCompositionFormModal.vue` — 788 linhas, Vue 2 + `vue-property-decorator`).
> **Estado:** passos 0 a 2 do roteiro. **Nenhum código escrito.** Este arquivo vai para a
> pasta do componente quando o esqueleto existir — mesmo lugar do precedente
> `composed/DssDataTableClaudeCode/MIGRATION_JTECH_DATA_TABLE.md`.
> **Roteiro seguido:** `docs/governance/DSS_FLUXO_ENTREGA_PONTA_A_PONTA.md` (Fase 0 e 1) e
> `DSS_ROTEIRO_FECHAMENTO_FASE3.md` (Etapa 0).

**Decisões já tomadas pelo humano (14/out/2026) — não reabrir:**

1. É **componente composto** (Fase 3), não pattern de tela.
2. A tabela é o **`DssDataTableClaudeCode`**.
3. A composição **participa do `DssForm`**: a regra "obrigatório" entra no submit do
   formulário mestre sem código do consumidor.
4. Nomes: **`DssComposition`** (a coleção, um campo) e **`DssCompositionGroup`** (o
   container de abas). *(Decisão A)*
5. **Paginação aceita** como o `DssDataTableClaudeCode` a entrega — sempre ligada. O
   contrato do DataTable não muda. *(Decisão B)*
6. **Excluir × inativar fica com o consumidor**: ele decide quais ações cada linha mostra.
   O componente não sabe o que é registro "novo" ou "gravado". *(Decisão C)*

---

## Passo 0 — O que já existe (e não pode ser reimplementado)

O teste anterior falhou aqui: o agente construiu o que o repositório já tinha. Cada linha
abaixo foi lida do `dss.contract.json`, do `catalog.json` e do `DEBITO_ABERTO.md` — não da
memória.

### Peças candidatas

| Peça | Status | a11y verificada | Papel na composição | Débito que pesa |
|---|---|---|---|---|
| `DssDataTableClaudeCode` | `candidate`, sem selo | 4/4 | a tabela de sub-registros, as ações da barra e da linha | paginação **sempre ligada** (ver Risco 3) |
| `DssDialog` | selado | 3/4 | modal do formulário e confirmações | selo na fila de reemissão (região opcional mudou) |
| `DssForm` | selado | 2/2 | formulário mestre **e** o formulário do modal | selo na fila de reemissão |
| `DssTabs` · `DssTab` · `DssTabPanels` · `DssTabPanel` | selados | 3/4 · 2/3 · 2/3 · 2/3 | o container de abas | `DssTabs` só aceita `DssTab`/`DssRouteTab` no slot |
| `DssBanner` | selado | 1/2 | erro de validação da coleção | — |
| `DssEmptyState` | selado | 3/3 | coleção vazia (já usado dentro do DataTable) | — |
| `DssButton` | selado | 2/3 | ações do modal e da confirmação | — |
| `DssActionMenu` | **draft** | 2/4 | **não entra**: o DataTable escolhido monta as ações com `DssButton` | — |

### Mecanismos que já resolvem metade do problema

- **`packages/core/composables/useFieldValidation.ts`** — composable sobre o ponto de
  extensão público do Quasar (`useFormChild`). Foi criado (set/2026) porque `DssInput`,
  `DssCheckbox`, `DssToggle` e `DssRadio` não se registravam no QForm e o `validate()`
  aprovava formulário inválido. É **genérico no tipo do valor**: com
  `modelValue: () => linhas` e a regra `linhas => linhas.length > 0 || '…'`, a composição
  vira um campo do formulário mestre **sem motor paralelo**. É a resposta à decisão 3.
- **`DssForm` expõe `submit()`** (EXC-Expose-01). Seção 05 do `apps/sandbox/src/TestForm.vue`:
  "submeter de um botão FORA do formulário — caso do rodapé de um `DssDialog`". É
  exatamente o modal de inclusão e edição.
- **`DssDialog.example.vue`, cenário 1 — "Confirmar exclusão"**. É o padrão para excluir,
  ativar e inativar. Substitui o `$q.dialog` do legado.
- **Modelo de ações do `DssDataTableClaudeCode`** — `actions` e `rowActions` com
  `mode: single | multi | any | none`, o contrato de 4 estados que **já veio do Jtech**.
  Os `buttons` do legado mapeiam direto.

### Referência de UI (não o visual do legado)

| Pattern | O que herdar |
|---|---|
| `apps/sandbox/src/TestDataTableClaudeCode.vue` | a tabela dentro de bloco controlado, os estados e as ações por seleção |
| `apps/sandbox/src/TestSolicitacoes.vue` + `patterns/nfag/NfagCheckinPage.vue` | enquadramento (cabeçalho fora do cartão), vocabulário de estado |
| `apps/sandbox/src/TestForm.vue` (seções 03 e 05) | a composição dentro de um formulário mestre; submit pelo rodapé do diálogo |
| `DssDialog.example.vue` (cenário 1) | confirmação destrutiva |

---

## Passo 1 — Encomenda (template da Fase 0, preenchido)

```
ENTREGA: composto Fase 3 (migração de legado)
NOME: DssComposition (um campo: coleção de sub-registros)
      + DssCompositionGroup (container de abas)

ORIGEM:
  repositório/caminho: hebertchaves/WebComps-to-DSS · src/components/jtech-composition/
  documentação da origem: nenhuma além do código

REFERÊNCIA DE UI:
  pattern(s): TestDataTableClaudeCode.vue · TestSolicitacoes.vue · NfagCheckinPage.vue ·
              TestForm.vue (seções 03 e 05) · DssDialog.example.vue (cenário 1)
  o que herdar: enquadramento do bloco · estados · ações por seleção · submit no rodapé
                do diálogo · confirmação destrutiva

ESCOPO NEGATIVO (o que NÃO entra):
  · não busca dados nem monta tela — nada de `$jt.repository.montarTela`/`resolve`
  · não gera formulário a partir de metadados — o `jt-dynamic-form` não migra; o
    formulário é um slot montado pelo consumidor com campos DSS
  · não traduz — `$gettext` vira props de rótulo com padrão em português
  · não abre "tela de detalhe" de CRUD — o `CrudLayoutModalPage` não migra
  · não persiste — ativar e inativar emitem a intenção; quem muda o registro é o consumidor

DECISÕES JÁ TOMADAS: as seis do topo deste arquivo.

MARCA / TEMA: hub | water | waste · light e dark (o componente não é de um produto só)

ONDE DEMONSTRAR: página nova no sandbox (playground + Preview Frame), com o caso de uso
                 real: um cadastro mestre com 2 ou 3 coleções filhas em abas

FECHAMENTO ESPERADO: candidate (sem selo) — o selo é de outro agente
```

---

## Passo 2 — De-para

### O que o legado faz, em uma frase por peça

- **`JtCompositions`** — abas, uma por coleção; o rótulo traz `título + (* se obrigatória) + (contagem)`;
  expõe `isValid()` e `resetValidation()`, que o formulário pai chama manualmente via `$refs`.
- **`JtComposition`** — uma `jt-data-table` de sub-registros. Os botões são roteados por
  **nome mágico** (`icAdicionarComposicao`, `icAlterarComposicao`, `icExcluirComposicao`,
  `icInativarComposicao`, `icAtivarComposicao`, `icDetalharComposicao`). Incluir e editar
  abrem o modal; excluir, ativar e inativar pedem confirmação (`$q.dialog`); a regra
  "obrigatório" só aparece depois do primeiro `validate()`.
- **`JtCompositionFormModal`** — `q-dialog` com `q-layout` e um `jt-dynamic-form` gerado de
  metadados (ou o slot `modal-form`).

### Props — `JtCompositions`

| Legado | DSS | Ação | Nota |
|---|---|---|---|
| `compositions: Array` (config de cada aba) | filhos `DssComposition` no slot do `DssCompositionGroup` | **trocar** | array de configuração vira composição; cada coleção é um campo próprio com `v-model` |
| `buttonHidden` | `readonly` em cada `DssComposition` | **renomear** | esconder todos os botões é o modo somente-leitura, dito pelo nome |

### Props — `JtComposition`

| Legado | DSS | Ação | Nota |
|---|---|---|---|
| `data` (mutado com `.sync` e `splice`) | `modelValue` (v-model, linhas) | **trocar** | é o valor do campo; a composição emite um array **novo**, nunca muta o do consumidor |
| `columns` | `columns` | repassar ao DataTable | mesma forma `{ name, label, field, align, sortable, format }` |
| `rowKey` (padrão `__index`) | `rowKey` (obrigatório) | **mudar** | o legado **escrevia `__index` nos registros do consumidor** (`setKeysInTheRecords`). Não migra: chave é dado do consumidor |
| `title` | `label` | renomear | vira o rótulo do campo e o da aba |
| `buttons` | `actions` e `rowActions` | repassar ao DataTable | `mode` preservado; o roteamento por nome mágico vira `intent` (ver Eventos) |
| `required` | `required` | **reimplementar sobre `useFieldValidation`** | regra "ao menos um registro", avaliada no submit do `DssForm` |
| `isPaginated` (padrão `false`) | — | **conflito** | o DataTable escolhido pagina sempre (Risco 3) |
| `multiselect` | `selection` | repassar | enum do DataTable em vez de booleano |
| `modelForm` | slot `form` (escopado) | **trocar** | o formulário do modal é montado pelo consumidor |
| `allowCustomEditModal` | slot `form` | absorvido | com slot, todo modal é customizável |
| `dependenciasObrigatoria` / `dependenciasNaoObrigatoria` | — | **não migra** | copiavam campos do formulário mestre para o modal via repositório. O consumidor já tem esses valores no escopo dele e os passa ao slot |
| `id` | `name` | renomear | identificador para o grupo e para a validação |

### Eventos

| Legado | DSS | Nota |
|---|---|---|
| `action-click` (com `composition: this` e `table: $refs.jtDataTable`) | `action` com `{ intent, action, rows }` | o legado entregava **a instância e a tabela** ao pai; o DSS entrega dado, nunca componente |
| `on-add` / `on-edit` | — | o próprio modal resolve; ao confirmar, sai `update:modelValue` |
| `on-inactivate` / `on-activate` | `inactivate` / `activate` com as linhas | intenção de domínio; o consumidor persiste |
| `on-detail` | `detail` com a linha | sem `CrudLayoutModalPage`; o consumidor decide onde mostrar |
| `composition-modal-close` | `form-close` | — |
| (nenhum) | `update:modelValue` | novo: é o que faz o v-model funcionar |

### Métodos expostos

| Legado | DSS | Nota |
|---|---|---|
| `validate()` (chamado via `$refs` pelo pai) | `validate()` / `resetValidation()` vindos do `useFieldValidation` | o pai **não precisa mais chamar**: o `DssForm` chama no submit. Ficam expostos para uso imperativo, como nos campos |
| `JtCompositions.isValid()` | o `validate()` do `DssForm` mestre | o grupo não valida nada: cada `DssComposition` é um campo registrado |

### Slots

| Legado | DSS |
|---|---|
| `modal-form` | `form` (escopado: `{ record, mode: 'add' \| 'edit' }`) |
| — | `head-actions` e `empty` repassados ao DataTable |

### Defeitos do legado encontrados na leitura (não migram)

- **Prop declarada duas vezes**: `dependenciasObrigatoria` aparece duas vezes e
  `dependenciasNaoObrigatoria` nunca é declarada, embora seja lida (`addDependencies`).
- **Muta o dado do consumidor**: `setKeysInTheRecords` grava `__index` em cada registro.
- **Código morto**: `hasRemoveAndInactivateButtons` é calculado e não é lido em lugar nenhum.
- **Validação só depois do primeiro `validate()`** (`isPristine`): no DSS, a regra segue a
  semântica do `useFieldValidation` (campo "sujo" depois de interação, ou no submit).

---

## Desenho proposto (para o `validate_composition` do passo 4)

```
DssForm (mestre, do consumidor)
└─ DssCompositionGroup                       ← abas; provide tipado: quem está inválido
   ├─ DssTabs  → DssTab × N                  ← rótulo + contagem + `alert` quando inválida
   └─ painel × N (role="tabpanel", v-show)   ← TODAS montadas — não DssTabPanels (Risco 5)
      └─ DssComposition                      ← campo: v-model = linhas; useFieldValidation
         ├─ DssDataTableClaudeCode           ← linhas, ações (mode), seleção, vazio
         ├─ DssBanner (erro "obrigatório")   ← só quando inválida e já validada
         ├─ DssDialog (formulário)
         │  └─ DssForm (do modal)  ← slot `form` do consumidor; submit pelo rodapé
         └─ DssDialog (confirmação: excluir · ativar · inativar)
```

A `DssComposition` funciona **sozinha**, sem o grupo: uma coleção sem abas é um campo
comum de formulário. O grupo só existe quando há mais de uma.

---

## Riscos arquiteturais — declarados ANTES de construir

| # | Risco | Mitigação | Como provar |
|---|---|---|---|
| 1 | A composição precisa participar do `DssForm` mestre (decisão 3) | reusar `useFieldValidation` (`useFormChild`), como os 4 campos nativos | teste: `DssForm.validate()` responde `false` com coleção obrigatória vazia; **mutação**: sem o `useFormChild`, o teste falha |
| 2 | **Os campos do formulário do modal podem se registrar no formulário MESTRE.** O `useFormChild` injeta o formulário mais próximo na árvore de componentes, e o conteúdo do `DssDialog` é filho da composição — o teleporte muda o DOM, não a árvore do Vue. Validar o mestre com o modal aberto validaria os campos do modal | envolver o slot `form` num `DssForm` próprio, que vira o formulário mais próximo para esses campos | **spike antes da construção**: modal aberto com campo obrigatório vazio → `validate()` do mestre não pode reprovar por causa dele. Nenhum caso do repositório cobre isso hoje |
| 3 | O `DssDataTableClaudeCode` pagina sempre; listas filhas costumam ter poucas linhas, e o legado vinha sem paginação | **aceito** (Decisão B): a composição pagina como o DataTable | — |
| 4 | O `DssDataTableClaudeCode` é `candidate`, sem selo: a composição herda o que ele tiver de errado | construir sobre ele mesmo assim (decisão 2) e registrar a dependência no meta | o selo da composição fica condicionado ao selo do DataTable |

---

## Decisões — todas tomadas (14/out/2026)

A, B e C estão registradas no topo do arquivo (itens 4 a 6). O Risco 3 fica **aceito**: a
composição pagina como o DataTable.

## Passos 3 a 5 — executados (14/out/2026)

**3. Pré-prompts** — `docs/governance/pre-prompts/pre_prompt_dss_composition.md` e
`pre_prompt_dss_composition_group.md`. `mcp validate_pre_prompt`: **5/5 eixos nos dois**.
(Limite do validador: ele aprova um eixo se achar a palavra em qualquer lugar do texto —
os eixos foram escritos pelo conteúdo, não pela palavra.)

**4. `mcp validate_composition`**
- Árvore completa: 2 críticos, ambos "`DssComposition`/`DssCompositionGroup` não existem
  no catálogo". **Esperado e não acionável**: a ferramenta não sabe validar a árvore de um
  composto que ainda vai nascer. As subárvores internas foram validadas sem os nós novos.
- Interior do grupo (abas): **conforme**.
- Interior da composição: 2 avisos médios de "inversão de hierarquia" (`DssDialog` dentro
  de `DssForm`). **Falso positivo justificado**: a regra é de padding entre contêineres
  aninhados; o `DssDialog` é overlay teleportado para o `<body>`, não fica visualmente
  dentro do formulário.
- A ferramenta **não pega** os Riscos 2 e 5: são de comportamento em runtime. Daí o spike.

**5. Spike** — teste descartável com os componentes REAIS (`DssForm`, `DssDialog`,
`DssInput`, `DssTabPanels`, `useFieldValidation`), apagado depois de rodar. Cada risco
provado nos dois sentidos:

| Risco | O problema existe? | A mitigação resolve? |
|---|---|---|
| 1 — participar do `DssForm` | — | ✅ obrigatória vazia reprova o mestre; com 1 registro, aprova |
| 2 — campos do modal no mestre | ✅ sem `DssForm` próprio, o campo do modal **reprova o mestre** | ✅ com `DssForm` dentro do modal, o mestre não o vê |
| 5 — aba não visitada | ✅ com `DssTabPanels`, a coleção da aba fechada **nem monta** e a obrigatória vazia passa | ✅ todas montadas + inativa escondida: reprova |

Os três desenhos dos pré-prompts estão **confirmados**. Os casos do spike viram os testes
de âncora dos componentes (com prova de mutação), não somem.

## Próximos passos

6. `mcp generate_component_scaffold` (type=composed) para cada peça.
7. Construção, sandbox, contrato emitido, afirmações a11y ancoradas desde o nascimento,
   fechamento pela Etapa 2 do `DSS_ROTEIRO_FECHAMENTO_FASE3.md`. Selo: outro agente.
