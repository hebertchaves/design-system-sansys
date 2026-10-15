# DSS — Fluxo de Entrega Ponta a Ponta

> **O que este documento é:** o catálogo operacional do caminho completo, do prompt humano
> até a entrega selada. Diz **com qual comando começar** em cada tipo de entrega — que é
> justamente o que o Roteador do `CLAUDE.md` não diz.
>
> **Por que existe:** o DSS tem ferramental de sobra (16 tools MCP, 24 gates, 9 documentos
> normativos de Fase 3) e esse ferramental não é acionado. Dois agentes independentes —
> um externo (Lovable), outro interno — construíram compostos sem tocar em nenhuma das
> ferramentas de bootstrap, e os dois relataram como "faltando" coisas que já existiam.
> Ferramenta fora do caminho crítico do primeiro passo não é usada. Ver `DEBITO_ABERTO`
> frente (g).
>
> **Status:** catálogo descritivo, verificado contra o disco em out/2026. Não substitui
> nenhum normativo — aponta para eles na ordem certa. Onde encontrei divergência entre o
> que se acredita existir e o que existe, está marcado **⚠️ DIVERGÊNCIA MEDIDA**.

---

## O fluxo em sete fases

| # | Fase | Quem | Artefato que sai | Como se sabe que terminou |
|---|---|---|---|---|
| 0 | **Encomenda** | humano | prompt com os 5 eixos + referências | o agente não precisa perguntar nada para começar |
| 1 | **Contrato** | agente | pré-prompt preenchido + árvore validada | `validate_pre_prompt` cobre os 5 eixos; `validate_composition` sem CRITICAL |
| 2 | **Esqueleto** | agente | 4 camadas + wrapper + barrel + orquestrador | `npm run validate:structure` verde |
| 3 | **Implementação** | agente | SFC, SCSS, types, composable, testes, docs | `npx sass` compila · `vitest` verde · `vue-tsc` 0 erros |
| 4 | **Verificação** | agente | contrato derivado + gates | `node scripts/emit-contract.mjs --all --strict` exit 0 |
| 5 | **Registro** | agente | 6 pontos de registro + página de sandbox | `validate:sandbox-nav`, `validate:demo-registry` verdes |
| 6 | **Fechamento / Selo** | **outro** agente | `docs/Compliance/seals/<Comp>/` | arquivo físico do selo existe e `catalog:validate` concorda |

A fase 6 **nunca** é feita por quem construiu — ver §6.

---

## Fase 0 — Encomenda: o que o humano precisa dar

O briefing determina o resultado mais do que a capacidade do agente. Comparação medida
nesta casa: o plano do agente externo para o `DssDataTable`
(`.lovable/plan/plano-dssdatatable-piloto-de-incorporação-webcomps-dss-2026-10-14.md`)
não citava **nenhum pattern de referência** — e a entrega saiu sem o enquadramento que os
patterns já tinham consolidado. Não foi falta de profundidade: foi o que estava escrito.

### Template de prompt — copiar e preencher

```
ENTREGA: ⟪ componente base | composto Fase 3 | pattern de tela | migração de legado | adequação ⟫
NOME: ⟪ DssXxx ⟫

ORIGEM (se migração):
  repositório/caminho: ⟪ url + caminho do componente legado ⟫
  documentação da origem: ⟪ caminho do .md, se houver ⟫

REFERÊNCIA DE UI (obrigatório para composto e pattern):
  pattern(s) consolidado(s) a seguir: ⟪ ex.: apps/sandbox/src/TestSolicitacoes.vue,
     apps/sandbox/src/patterns/nfag/NfagCheckinPage.vue ⟫
  o que desses patterns deve ser herdado: ⟪ enquadramento | estados | vocabulário de cor ⟫

ESCOPO NEGATIVO (o que NÃO entra):
  ⟪ ex.: não busca dados · não filtra · sem edição inline ⟫

DECISÕES JÁ TOMADAS (não reabrir):
  ⟪ ex.: paginação sempre ligada · seleção por enum, não por booleanos ⟫

MARCA / TEMA: ⟪ hub | water | waste | todas ⟫ · ⟪ light | dark | ambos ⟫

ONDE DEMONSTRAR: ⟪ página nova no sandbox | aninhado em pattern existente | só o example.vue ⟫

FECHAMENTO ESPERADO: ⟪ candidate (sem selo) | pronto para auditoria independente ⟫
```

Os cinco campos que mais custaram tempo quando ausentes, nesta ordem: **referência de UI**,
**escopo negativo**, **onde demonstrar**, **decisões já tomadas**, **fechamento esperado**.

### Os 5 eixos obrigatórios do pré-prompt

São contrato de Fase 2 e valem para toda entrega que produz componente
(`mcp__dss__validate_pre_prompt` reprova se faltar algum):

1. **Classificação** — tipo, categoria, interativo, fase, Golden Reference, Golden Context
2. **Risco arquitetural principal** — a armadilha técnica, declarada *antes* de implementar
3. **API mapeada** — prop a prop, com origem (Quasar/DSS/legado) e ação (expor/bloquear/criar)
4. **Tokens necessários** — nomes exatos `--dss-*`
5. **Acessibilidade e estados** — ARIA, teclado, foco, estados implementados

Template de Fase 3: `docs/governance/pre-prompts/TEMPLATE_FASE3.md` (84 linhas). Ele
acrescenta aos 5 eixos: casos de uso **negativos**, matriz de composição, estado de falha e
loading, e superfície de playground. Há 75 arquivos de pré-prompt em
`docs/governance/pre-prompts/` servindo de exemplo.

---

## Fase 1 — Contrato: validar a árvore ANTES de codar

```
mcp__dss__validate_composition   ← árvore proposta vs ui-rules.schema.json
mcp__dss__query_component        ← o que já existe e qual é o contrato dele
mcp__dss__query_token            ← nome exato do token, antes de inventar
mcp__dss__suggest_token_replacement ← valor cru → token mais próximo
```

`validate_composition` é o portão de desenho: pega Quasar cru com equivalente DSS, componente
inventado, aninhamento proibido, inversão de hierarquia, props obrigatórias faltando e —
importante — **tabela ou lista sem estado `empty`/`loading` declarado**. Rodar isto antes de
escrever a primeira linha é mais barato que descobrir no gate.

**Para migração de legado**, a fase 1 começa antes: de-para prop a prop, evento a evento,
slot a slot, com coluna "ação DSS" e justificativa. O precedente está em
`packages/core/components/composed/DssDataTableClaudeCode/MIGRATION_JTECH_DATA_TABLE.md`.

---

## Fase 2 — Esqueleto

```
mcp__dss__generate_component_scaffold  componentName=DssXxx  type=composed
```

Devolve 17 arquivos em JSON. **O MCP nunca escreve em disco** — por contrato
(`docs/governance/MCP_READ_ONLY_CONTRACT.md`): *"In Read-Only mode, MCP observes and
explains, but never decides or changes."* Quem aplica é o agente.

### ⚠️ DIVERGÊNCIA MEDIDA — o scaffold não é gateado contra os próprios gates

Rodei `generate_component_scaffold` com `type: "composed"` e confronte a saída com os gates
do repositório. **Aplicar os 17 arquivos verbatim produz um componente que reprova.** Cinco
achados, todos verificados no disco:

| # | O scaffold emite | O gate que reprova | Evidência |
|---|---|---|---|
| 1 | `index.js` como barrel | `validate:barrel-ext` — *"nenhum `index.js` em packages/core"* | `scripts/validate-barrel-ext.cjs:10,41` |
| 2 | `"classification": { type, category, interactive }` (objeto) | schema exige **string** do enum `Action\|Compact\|Visual` | `docs/governance/dss.contract.schema.json` → `/properties/identity/properties/classification` |
| 3 | `_brands.scss` com comentários mandando usar `--dss-hub-*`, `--dss-water-*`, `--dss-waste-*` | regra **B1** do `validate:brand-form` persegue exatamente esse primitivo cru | `scripts/validate-brand-form.cjs:111` → `const MARCAS = 'hub\|water\|waste'` |
| 4 | **nenhum arquivo de teste** entre os 17 | DoD do `CLAUDE.md` trata `<Comp>.test.js` como *gate de build bloqueante* | `CLAUDE.md` → Definition of Done |
| 5 | `"phase": 1`, `goldenReference: "DssChip"`, `dssVersion: "2.2"` mesmo com `type=composed` | fase/golden errados para composto; versão vigente é **2.4** | saída da tool vs `dss.meta.json` dos compostos reais |

Menores, mas reais: types em `datagrid.types.ts` contra a convenção `data-grid.types.ts`;
`export default { name, inheritAttrs }` em bloco `<script>` separado em vez de
`defineOptions`; `README.md` com cerca de código não fechada; `.example.vue` com
`style="gap: 16px; padding: 24px"` inline e **sem importar o próprio componente**;
`dss.meta.json` sem `tagline`, `previewGroup`, `defaultPreview.demoSlots` nem bloco `a11y`
— todos exigidos pelo checklist de fechamento.

O item 3 é o mais grave: **o scaffold ensina a violação que a frente (d) passou uma onda
inteira removendo** (553 referências a primitivo de marca → 241).

**Como usar o scaffold mesmo assim:** como mapa de estrutura, não como código. Ele acerta as
4 camadas, a ordem L2→L3→L4 do orquestrador e o wrapper re-export puro — que é o trabalho
braçal de verdade. Corrija os 5 pontos acima ao aplicar.

**O que falta construir:** um teste que rode o scaffold e passe a saída pelos gates. Enquanto
não existir, "basta explicitar as ferramentas" é necessário mas **não suficiente**.

### ⚠️ DIVERGÊNCIA MEDIDA — `generate_pre_prompt_template` devolve Fase 1 para composto

Chamada para um componente composto, a tool devolve template de **Fase 1**: declara
`**Fase:** 1 (Fase 1 — base components)`, pede "Q-component base" e a URL da api do Quasar,
fala de `--dss-compact-control-height-*` e de `::before` como touch target — e o prompt final
que ela monta termina com:

> `Crie todos os arquivos da arquitetura de 4 camadas em DSS/packages/core/components/base/DssDataGrid/`

**Destino errado** (`base/` em vez de `composed/`) e vocabulário errado. Para Fase 3, use
`docs/governance/pre-prompts/TEMPLATE_FASE3.md` à mão; a tool ainda não conhece a trilha.

---

## Fase 3 — Implementação

Documento que governa, por tipo:

| Tipo | Normativo | O que ele dá |
|---|---|---|
| Base (Fase 1/2) | `DSS_COMPONENT_ARCHITECTURE.md` + Cartão Base do `CLAUDE.md` | 4 camadas, pseudo-elementos, brightness, wrapper |
| Composto (Fase 3) | **`DSS_GUIA_COMPOSICAO_FASE3.md`** | os 6 padrões obrigatórios: `inheritAttrs:false` + `v-bind="$attrs"` explícito, `provide/inject` tipado, marca por `data-*`, **proibição absoluta de `:deep()` para layout**, slots dinâmicos, riscos de overlay/teleport |
| Adequação | `DSS_UI_ADEQUACAO_CHECKLIST.md` (base) · `DSS_UI_ADEQUACAO_CHECKLIST_COMPOSTOS.md` (composto) | delta por peça interna, costuras/divisores, marca via overlay, **M1: nunca reimplementar primitivo** |
| Marca | `DSS_MODELO_PROPAGACAO_MARCA.md` | dois eixos, três zonas, os dois tiers de contraste (§9.4) |
| Ícone | `DSS_ICON_COMPOSITION_CONTRACT.md` | `DssIcon` é o único primitivo |
| Variante | `DSS_VARIANT_NAMING.md` | `outline` vs `outlined` espelha o Quasar |

**Antes de criar qualquer peça interna, pergunte se ela já existe.** Exemplos reais de peça
que foi reimplementada por não se saber que existia: expansão sob demanda já é
`DssExpansionItem` (encapsula o `QExpansionItem` com touch target 44px, modo acordeão por
`group` e suporte a marca; `aria-expanded`/`aria-controls` vêm do QExpansionItem e estão
declarados no `a11y.aria.states` do meta — o SFC do DSS não os emite por conta própria); paginação já é
`DssPagination`; estado vazio já é `DssEmptyState` com slot `#action`.

Ferramentas de apoio nesta fase:

```
mcp__dss__validate_component_code   ← 4 camadas, cor hardcoded, :deep(), token específico
mcp__dss__check_compliance          ← "isto que vou fazer é conforme?" (descritivo, nunca corretivo)
mcp__dss__validate_visual_contract  ← CSS computado × defaultPreview do meta
```

---

## Fase 4 — Verificação

Comandos da Definition of Done, na ordem em que valem a pena rodar (do mais barato ao mais
caro):

```bash
npx sass packages/core/components/<grupo>/<Comp>/<Comp>.module.scss  # compila?
npm run validate:structure                                           # 4 camadas, wrapper, barrel
npm run validate:type-check                                          # vue-tsc, 0 erros
cd packages/core && npx vitest run --project unit <caminho do teste>
node scripts/emit-contract.mjs <Comp> --write                        # contrato + âncoras a11y
node scripts/emit-contract.mjs --all --strict                        # gate global
```

### Os 24 gates do pre-commit, na ordem real

De `scripts/hooks/pre-commit` (448 linhas). **Todos param o commit** (`exit 1`):

| Ordem | Bloco | Script | Catraca |
|---|---|---|---|
| 0z | paridade do próprio hook | comparação instalado × versionado | — |
| 0 | barrel `index.ts` | `validate-barrel-ext.cjs` | — |
| 0 | estrutura 4 camadas | `validate-structure.cjs` | — |
| 0a | higiene de SFC | `validate-sfc-hygiene.cjs` | — |
| 0b | grafia de variante | `validate-variant-naming.cjs` | — |
| 0c | token SCSS fantasma | `validate-scss-tokens.cjs` | ✅ baseline |
| 0c-ter | estados interativos | `validate-hover-tokens.cjs` | ✅ baseline |
| 0c-ter | forma da marca | `validate-brand-form.cjs` | ✅ baseline |
| 0c-quater | escala dimensional | `validate-scale.mjs` | ✅ baseline |
| 0c-bis | escopo de tema | `validate-theme-scopes.mjs` | — |
| 0d | convenções de campo | `validate-field-conventions.cjs` | — |
| 1 | token → `DSS_TOKEN_REFERENCE.md` | `sync-tokens-to-reference.js` | **sync, reescreve** |
| 1b | token → docs-portal | `sync-portal-tokens.mjs` | **sync, reescreve** |
| 2 | CSS ↔ meta.json | `sync-css-to-meta.js --validate` | — |
| 3 | meta → referência visual | `sync-visual-contract.js` | **sync, reescreve** |
| 3b | catálogo + drift de selo | `build-catalog.cjs` (+`--validate`) | **sync, reescreve** |
| 3c | selado tem página no portal | `validate-portal-pages.cjs` | — |
| 5 | API ↔ types | `validate-api-docs.cjs` | — |
| 5 | props DSS | `validate-dss-props.cjs` | ✅ baseline |
| 6 | tag `<Dss*>` sem import | `validate-sandbox-tags.cjs` | — |
| 6a | menu fantasma no sandbox | `validate-sandbox-nav.cjs` | — |
| 6b | registry do DemoRenderer | `validate-demo-registry.cjs` | — |
| 8 | contrato derivado | `emit-contract.mjs --strict` | ✅ baseline a11y |
| 8b | categorias de prop | `validate-prop-categories.cjs` | — |
| 8b | sementes de demo | `validate-demo-seeds.cjs` | — |
| 8b | quadro de adequação | `build-adequacao-status.cjs --check` | — |
| 8b | docs do MCP | `validate-mcp-docs.cjs` | — |
| 4 | regressão estática do sandbox | `apps/sandbox → test:static` | — |
| 7 | type-check | `vue-tsc` | — |

**Sentinela** (`scripts/lib/sentinela.cjs`, sai com exit 2): 22 scripts a têm. Ela confere um
invariante conhecido *antes* de confiar na contagem — detector cego aprovava o nada.

**Catraca** (`scripts/lib/catraca.cjs`): 6 gates comparam o baseline contra a versão em HEAD.
Crescer exige `--aceitar-debito` **em commit dedicado**. Baselines no disco:
`a11y-anchor-baseline.json`, `brand-form-baseline.json`, `contract-missing-baseline.json`,
`dss-props-baseline.json`, `hover-tokens-baseline.json`, `scale-baseline.json`,
`scss-token-ghost-baseline.json`.

**Os blocos de sync reescrevem arquivo e dão `git add` neles** — `DSS_TOKEN_REFERENCE.md`,
`apps/docs-portal/src/index.css`, `DSS_REFERENCIA_VISUAL_ANALISE.md`, `catalog.json` e os
`dss.contract.json`. Commitar com caminho explícito **não** impede isso: o hook adiciona por
conta própria.

---

## Fase 5 — Registro: são SEIS pontos, não cinco

Contado no disco para o `DssDataTableClaudeCode`:

| # | Arquivo | Posições | O que |
|---|---|---|---|
| 1 | `packages/core/components/index.ts` | **3** | `export {}` nomeado · `import` do `.vue` · lista de registro global |
| 2 | `packages/core/index.ts` | 1 | nome na lista de componentes |
| 3 | `apps/sandbox/src/DemoRenderer.vue` | **2** | `import` · entrada no mapa |
| 4 | `apps/sandbox/src/TestSuite.vue` | **3** | botão de nav (×2 linhas) · bloco `v-else-if` · `import` |
| 5 | `apps/sandbox/src/Test<Nome>.vue` | — | a página em si |
| 6 | `packages/core/components/index.scss` | 1 | `@forward '<grupo>/<Comp>/<Comp>.module';` |

### ⚠️ DIVERGÊNCIA MEDIDA — o ponto 6 faltava em três componentes (corrigido out/2026)

Comparando os compostos no disco com os `@forward` de `components/index.scss`:

```
no disco mas sem @forward:  DssDataTable · DssDataTableClaudeCode · DssDataGrid
```

Os três **não tinham `@forward`** em `components/index.scss` — dois deles já commitados.
Corrigido na mesma sessão; depois do conserto a folha agregada compila com
`dss-data-table` 25 · `dss-data-table-cc` 26 · `dss-data-grid` 36 ocorrências, e a
comparação disco × `@forward` não acusa nenhum composto órfão.

⚠️ **Não meça isso por `dist/style.css`** — ele é artefato de build do Vite e pode estar
velho em relação ao fonte; um componente criado depois do último build aparece com zero
ocorrências sem ter defeito nenhum. A medição válida é compilar o `components/index.scss`
na hora, ou comparar as duas listas. O SCSS deles chega à tela do sandbox pelo `<style scoped>` do SFC,
então *parece* funcionar — mas não entra na folha distribuída do pacote. É a sétima
reincidência do padrão registrado em `[[reference_scss_orphan_entrypoint]]`: **parcial
editado ≠ parcial embarcado**, e `validate:scss-tokens` dá falso verde porque varre fonte,
não bundle.

Nenhum dos 24 gates pega isso — é o débito já registrado *"Gate estrutural NÃO verifica o
`@forward` em `components/index.scss`"*. Enquanto o gate não existe, **o ponto 6 é checagem
manual obrigatória**, e a verificação correta é compilar o bundle e contar:

```bash
cd packages/core && npx sass --no-source-map --load-path=. components/index.scss /tmp/b.css
grep -c "\.dss-meu-componente" /tmp/b.css   # 0 = órfão
```

**Autodescoberta elimina 1–4 e 6 de uma vez** (`import.meta.glob` ou leitura do
`dss.meta.json`). É item da frente (g) do `DEBITO_ABERTO`.

---

## Fase 6 — Fechamento e selo

### Quem constrói não sela

`docs/governance/prompt_revisao_independente_v1.0.md:45` é explícito: *"Abra um chat novo —
**sem o histórico de quem construiu** (senão a independência é nominal)."* E na linha 89:
*"Se discordar de alguma conclusão dele, **a sua prevalece** — você é a passagem
independente."*

O mesmo documento, linha 240, carrega o aviso de concorrência: *"pode haver outro agente na
mesma árvore. **Nunca `git add -A`**"*.

### Pré-condições do selo

De `docs/governance/prompt_emissao_selo_conformidade_v2.5.txt`, o auditor final confirma
explicitamente, antes de emitir:

- auditoria técnica completa já feita
- nenhuma NC bloqueante aberta
- o código analisado é o estado final pós-correção
- `<Componente>.test.js` existe e tem cobertura mínima
- **Gate Estrutural DSS passou**, com as 4 camadas verificadas

O auditor final **não** pode propor refatoração, sugerir melhoria, criar NC nova nem
reinterpretar critério. Ele emite ou não emite.

### Selado = arquivo físico

O selo é um arquivo em `docs/Compliance/seals/<Componente>/DSS_<NOME>_SELO_v2.2.md` —
são **89** hoje. Campo no `dss.meta.json` **não** é selo; `build-catalog.cjs` lê o arquivo
físico e o `catalog:validate` reprova o drift entre os dois.

### Fase 3 fecha por roteiro próprio

`DSS_ROTEIRO_FECHAMENTO_FASE3.md` substitui o par "Modo Auditor + Selo" das Fases 1/2, em 4
etapas: Etapa 0 (pré-prompt + MCP), Etapa 1 (invariantes), Etapa 2 (gates executáveis),
Etapa 3 (runtime no Preview Frame).

### Registro do evento de auditoria

```
mcp__dss__record_audit_event   phase=initial-audit|correction|revalidation|seal-granted
```

**⚠️ Atenção:** esta é a **única** tool do MCP que escreve. A descrição dela diz
*"CONTROLLED WRITE — authorized by MCP_READ_ONLY_CONTRACT.md v0.2"* e limita-se a
`auditHistory`, `status`, `auditDate` e campos do selo. Exige pedido humano explícito. A
generalização "todo o MCP é read-only" é verdadeira para as outras 15 tools e falsa para
esta.

---

## Catálogo das 16 tools MCP, por momento do fluxo

| Fase | Tool | Para quê | O que **não** faz |
|---|---|---|---|
| 0–1 | `validate_spec_readiness` | completude da spec funcional do analista por gênero de documento; bloqueia vazio/loading/erro/veículo/superfície não ditos | não julga a regra de negócio |
| 0–1 | `request_spec_parecer` | devolve um **roteiro** para o agente ler a spec e emitir parecer semântico | **não é gate**: não reprova nem altera o `validate_spec_readiness` |
| 1 | `validate_composition` | árvore proposta × `ui-rules.schema.json`: Quasar cru, componente inventado, filho proibido, auto-aninhamento, hierarquia invertida, props obrigatórias, tabela/lista sem `empty`/`loading` | não gera código |
| 1 | `query_component` | status, fase, goldens, props, pré-prompt e documentação de um componente | não compara dois |
| 1,3 | `query_token` | nome e documentação exatos do token | não cria token |
| 1,3 | `suggest_token_replacement` | valor cru (hex/rgb/px/rem) → token mais próximo, com confiança e 3 alternativas | não edita arquivo |
| 2 | `generate_component_scaffold` | 17 arquivos da estrutura canônica | não escreve em disco; **e não passa nos próprios gates** (§Fase 2) |
| 1 | `generate_pre_prompt_template` | markdown do pré-prompt com os 5 eixos | não escreve em disco; **devolve Fase 1 mesmo para composto** |
| 1 | `validate_pre_prompt` | confere se o pré-prompt cobre os 5 eixos | não avalia a qualidade do conteúdo |
| 3 | `validate_component_code` | 4 camadas, cor hardcoded, `:deep()`, token específico de componente | não corrige |
| 3 | `check_compliance` | "este uso é conforme?" por `composition`/`token`/`accessibility` | estritamente descritivo, nunca corretivo |
| 4 | `validate_visual_contract` | CSS computado × `defaultPreview` do `dss.meta.json` | não atualiza o meta |
| 3 | `describe_grid_inspector` | manual completo do Grid Inspector — chamar **antes** de `validate_grid_layout` | não inspeciona nada sozinho |
| 3 | `validate_grid_layout` | grid/layout × tokens de espaçamento; sincronia overlay × layout | não aplica o grid |
| — | `get_todo_list_status` | progresso da Fase 2 lendo `DSS_FASE2_TODO.md` | não cobre Fase 3 |
| 6 | `record_audit_event` | registra evento no `auditHistory`; `seal-granted` + `compliant` grava `status=granted` | **ESCREVE** — exige pedido humano explícito |

---

## Onde o Roteador do `CLAUDE.md` é omisso

O Roteador bifurca bem por **fase** e aponta bem os **cartões de invariantes**. O que ele não
cobre:

| Lacuna | Consequência observada |
|---|---|
| Nenhuma trilha diz **qual comando roda primeiro** | o ferramental de bootstrap não é acionado — por humano nem por agente |
| Não existe trilha de **abertura** de Fase 3 (só de fechamento) | o composto nasce sem `validate_composition` e sem pré-prompt |
| **Pattern de tela** não tem trilha nem lar | `TestSolicitacoes.vue` está solto em `apps/sandbox/src/`, `NfagCheckinPage.vue` está em `src/patterns/nfag/` — não há registro dizendo que os dois são a UI consolidada |
| **Migração de legado** não tem trilha | de-para e escopo negativo ficam a cargo da boa vontade de quem escreve o briefing |
| O ponto 6 de registro (`@forward`) não é citado em lugar nenhum | três componentes órfãos do bundle, hoje |

Corrigir isso é a frente (g) do `DEBITO_ABERTO`.

---

## Armadilhas conhecidas

Aprendidas na prática, nesta casa. Cada uma custou pelo menos uma rodada.

**Gate que aprova sem ter medido.** Detector cego conta zero e reporta ✅. Vinte e um gates
tinham essa falha. A correção é a sentinela (`scripts/lib/sentinela.cjs`): conferir um
invariante conhecido antes de confiar na contagem. **E a sentinela não pode usar cópia da
regex do detector** — cegar o detector sem tocar a cópia não disparava nada. Extraia as
regexes para constantes compartilhadas e prove cegando o gate de propósito.

**Sentinela que confere o disco em vez da saída do detector.** `existsSync(arquivo)` prova
que o arquivo existe, não que o gate o viu. Confira a estrutura de dados que o detector
produziu.

**Âncora de a11y que cobre metade da afirmação.** Claim composta ("compõe a tabela **e**
preserva cabeçalhos e células") apontando para um teste que só prova a primeira metade. O
resolvedor do `emit-contract` aceita **lista** em `test` justamente para isso
(`scripts/emit-contract.mjs:435` — `[].concat(c.test)`). Prove cegando: renomeie o título do teste e confirme que a
âncora reprova.

**Token local declarado e nunca consumido.** `_brands.scss` que declara
`--dss-meu-componente-action` e ninguém lê: parece atender à Constituição #5 e não pinta
nada. O padrão já apareceu sete vezes neste repo e em quatro delas o que estava morto era um
bloco de **acessibilidade** (`forced-colors`). Gate **B7** proposto, ainda não construído.

**Parcial editado ≠ parcial embarcado.** `tokens/index.scss` e `components/index.scss`
enumeram arquivo a arquivo e nunca usam agregador. Arquivo novo que ninguém referencia
compila sozinho e não entra em bundle nenhum. **Confira no CSS compilado, não no gate** —
`validate:scss-tokens` varre fonte e dá falso verde.

**Hook versionado ≠ hook que roda.** `npm run setup:hooks` instala por `cp`. A deriva entre
`.git/hooks/pre-commit` e `scripts/hooks/pre-commit` foi bidirecional e silenciosa. Hoje o
bloco 0z do próprio hook compara os dois. Ao auditar "quais gates existem", não confie só no
arquivo versionado.

**`git add -A` varre o trabalho do outro agente.** E os blocos de sync do pre-commit fazem
`git add` por conta própria em contratos, catálogo e docs derivados — caminho explícito no
`git add` não é proteção suficiente. Combine o escopo do commit antes.

**Timeout de worker do vitest no WSL2 sobre `/mnt/c`.** `Timeout waiting for worker to
respond` em 60s exatos com `environment 0ms` é cache frio do 9p, **não** falha de teste. O
`START_TIMEOUT` está hardcoded no dist, sem flag. Workaround: patch efêmero para `3e5`,
rodar, e **reverter byte-idêntico** (confira o md5). Sob carga total (101 arquivos) ainda
aparece flake que não reproduz em escopo menor — antes de atribuir a flake a uma mudança
sua, rode o arquivo isolado e o diretório dele.

**HMR do sandbox no WSL2.** `inotify` não funciona em `/mnt/c`; precisa de `usePolling`, mas
intervalo curto satura a I/O do Vite. Antes de culpar o código por "sandbox lento", meça o
TTFB — e não meça com o vitest rodando.

---

## Referências

| Assunto | Documento |
|---|---|
| Constituição e Roteador | `CLAUDE.md` |
| Composição Fase 3 | `docs/governance/DSS_GUIA_COMPOSICAO_FASE3.md` |
| Fechamento Fase 3 | `docs/governance/DSS_ROTEIRO_FECHAMENTO_FASE3.md` |
| Checklist de composto | `docs/governance/DSS_UI_ADEQUACAO_CHECKLIST_COMPOSTOS.md` |
| Template de pré-prompt Fase 3 | `docs/governance/pre-prompts/TEMPLATE_FASE3.md` |
| Contrato do MCP | `docs/governance/MCP_READ_ONLY_CONTRACT.md` |
| Revisão independente | `docs/governance/prompt_revisao_independente_v1.0.md` |
| Emissão de selo | `docs/governance/prompt_emissao_selo_conformidade_v2.5.txt` |
| Modelo de marca | `docs/governance/DSS_MODELO_PROPAGACAO_MARCA.md` |
| Débito aberto | `docs/governance/DEBITO_ABERTO.md` |
