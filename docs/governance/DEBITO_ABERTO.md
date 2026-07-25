# DSS — Índice de Débito Aberto

> Ponto único de consulta do que está **em aberto** no DSS, para não depender de varrer a memória/histórico.
> Criado 2026-07-02 @ `import/dss-v2.4.0`. **Manter enxuto:** ao fechar um item, mover para "Resolvidos"
> (com commit) ou remover. Cada item aponta a fonte de detalhe (doc de governança ou arquivo de memória).

## Legenda
🔴 ativo (frente em curso) · 🟡 débito de fundo (consciente, não urgente) · ⏳ aguardando terceiro · 🔍 verificar

---

## Frentes desta onda (cadeia de fonte única / contraste)

- ✅ **(a) Escalar `dss.contract.json`** — **CONCLUÍDO (76/76)**, `--all --strict` exit 0. Todos os
  grupos (Form/Input 23, Feedback 1, Navigation 9, Overlay 1, Data 3, Layout 10, Outros 27) emitidos,
  schema-válidos, a11y verificada. Relatórios em `relatorios/CONTRATOS_*.md`. `classification` é enum
  enforçado (Action|Compact|Visual); prosa→`classificationNote`. Runbook histórico: `HANDOFF_ESCALA_CONTRATOS.md`.
  - ⚠️ **Mapeamentos de `classification` ambíguos p/ revisão humana** (nos relatórios): DssItem,
    DssBreadcrumbsEl (Action×Visual), DssCard (clickable), DssSlideItem (gesto), DssBanner (dispensar),
    **DssUploader (Visual×Action — root não-interativo, mas propósito é fluxo de upload interativo)**.
  - ⚠️ **Débito de componente descoberto na emissão** (fora do escopo, tratar em Higiene): progressbars
    sem `aria-valuenow` tipado; cobertura de `alt`/`decorative` nos testes de imagem. + focus-ring (já listado).
- ⏳ **(c1) Contraste WCAG da paleta default** — auditoria + tabela de rotas (A escurecer / B texto escuro)
  prontas; **aguardando decisão da equipe** por cor. NÃO tocar `globals.scss` até o retorno.
  `[[project_color_ramp_a11y]]`. (c0 — reconciliação da rampa com o Figma — **feito**, commit `6a4baa6`.)

## Débito de fundo (ondas anteriores)

- 🟡 **DssChip sem cor neutra/token + DssSelect não consome DssChip** (decidido 2026-07, ADIADO). O
  `useChips` do DssSelect delega ao `.q-chip` NATIVO do Quasar (cinza), não ao DssChip; o
  DssMultiselectAutocomplete consome o DssChip (default filled azul) → divergência visual de chip.
  Raiz: DssChip só tem cores semânticas (sem neutra/token). **Decisão do dono: caminho 1** — adicionar
  aparência neutra/token ao DssChip + migrar useChips do DssSelect→DssChip (ambos consumindo a base).
  **Sequência: só DEPOIS de fechar o DssMultiselectAutocomplete** (o chip azul fica como está por ora,
  pré-adequação do DssChip). `[[project_multiselect_autocomplete]]`.

- 🟡 **`meta.visualProperties` staleness = GERIDO via checklist (automação total impossível)** — o gate
  não pode pegar drift da *lista de tokens*: o validador não distingue "token aplicado via classe Quasar
  (`bg-primary`)" de "token removido" — `--validate-strict` deu **129 falsos-positivos em 88 comp**. Mesma
  cegueira atinge o contrato (deriva do SCSS compilado, não vê Quasar-applied). Correção da premissa:
  `meta.visualProperties` (curado, inclui Quasar-applied) é **complementar** ao contrato, não legado
  inferior. **Resolvido como:** passo de propagação no `DSS_UI_ADEQUACAO_CHECKLIST.md` (sync:token-values
  p/ value dimensional + revisão curatorial da lista + reverificar meta.a11y). Não há mais gate a construir
  aqui — é curadoria humana consciente. *(Opção estratégica adiada: validador Quasar-aware p/ resolver
  bg-primary→token; ou aposentar a REFERENCIA em favor do contrato.)*

- 🟡 **Visual Height do DssInput (issues #3/#4)** — auto-height do Quasar: label ~2.5px fora do centro em
  repouso (#3); com valor, a label flutuante **sobrepõe** o valor centralizado no native (#4). Tensão:
  altura compacta (zero padding vertical) × reserva de topo p/ label flutuante. `[[project_visual_height_propagacao]]`.
- 🟡 **Propagação CSS→meta — lotes 2–6** — catálogo com 38 divergências de *value* + 6 dimensionais
  pendentes (`sync-token-values.js`). Mesma fonte acima.
- 🟡 **`--dss-text-secondary` reprova AA** — `#B0B0B0` ≈ 2.6:1, sistêmico. DssInput já migrou p/ gray-600
  no label; **demais componentes ainda usam o token frouxo**. → **tratar junto com (c1)** (mesmo tema).
- 🟡 **Gate a11y — verificação de âncora é COARSE em `aria`/`test`** — descoberto no teste de fluxo do
  DssUploader (2026-07). `verifiedBy: "css"` (contraste/focus) é **calculado de verdade** pelo wcag-kit;
  mas `verifiedBy: "aria"` passa só por existir prop `aria*`/`required`, e `verifiedBy: "test"` passa só
  por existir `*.test.js` — **presença, não que o teste exerça o claim**. Logo o "impossível escrever p/
  passar" vale **plenamente só para `css`**; `aria`/`test` são gameáveis. (O executor cobriu por honestidade
  — não declarou 2.1.1/teclado porque o teste não exercita.) **Decisão futura:** endurecer (aria→checar
  atributo no DOM renderizado; test→casar o critério a um `it()` nomeado) ou aceitar como presence-gate assumido.
- 🟡 **DssUploader disabled usa `opacity: 0.4` (não o padrão cor-based F1)** — escalado, não forçado. Seguro
  AQUI (Quasar `.q-uploader--disable` só aplica `pointer-events:none`, sem empilhar → não ocorre o 0.24 do F1),
  mas não é o padrão. Migrar = redesenho multi-camada num componente selado → decisão humana. `[[project_adequacao_ui_recorrencias]]`.
- 🟡 **Composto com `classification`-objeto precisa `meta.category` no top-level** — o emissor lê
  `meta.category` (raiz); na convenção antiga de composto a `category` fica DENTRO do objeto `classification`.
  Ao emitir contrato dos próximos compostos, **promover `category` para o topo** (senão `--write` dá gap).
- 🟡 **Focus ring ausente no CSS próprio de 6 interativos** — Checkbox, Radio, Toggle, Field, Range,
  Slider não declaram anel de foco no SCSS do componente; visibilidade de foco depende de regra
  global/Quasar. Risco WCAG 2.4.7 se a global falhar/for sobrescrita. Achado ao emitir contratos
  (Form/Input). **Verificar na Onda Higiene.** `relatorios/CONTRATOS_FORM_INPUT.md`.
- 🟡 **Higiene `!important` — estados não-default** — disabled/erro/hover reais não são validáveis na
  sandbox (injeção sintética de classe Quasar dá artefato). Risco residual baixo. `[[project_important_audit]]`.
- 🟡 **`tokens/brand/index.scss` = código morto (T4)** — ~149 `!important` inócuos (arquivo não importado)
  + feature de override local de marca parcialmente entregue. T4 BLOQUEADO (limpar seria maquiagem).
  Alerta em `ALERTA_BRAND_INDEX_NAO_IMPORTADO.md`. `[[project_brand_index_dead_code]]`.
- 🟡 **Decisão: label flutuante vs estática** — Material (flutuante, atual) vs shadcn/Make (estática acima).
  Usuário optou por **manter flutuante por enquanto**. `[[project_make_vs_dss_contrato_visual]]`.
- 🟡 **Consolidação documental (5→1)** — `COMPONENT_PAGE_STRUCTURE` já absorve 5 docs; **remoção física**
  dos superados é etapa pós-POC, ainda não executada. `[[project_sandbox_source_of_truth]]`.
- 🟡 **`example.vue` non-normativos (90)** — rotular como demo ilustrativo (item M do blueprint); backfill
  de prosa verificável (a11y) por componente é parte de (a). `[[project_sandbox_source_of_truth]]`.
- 🟡 **Adequação LLM-eficiente dos 4 docs-gigantes de referência** — `DSS_IMPLEMENTATION_GUIDE` (3059 linhas),
  `DSS_TOKEN_REFERENCE` (2338), `DSS_COMPONENT_ARCHITECTURE` (2084), `DSS_ARCHITECTURE` (1591) carregam o vício
  de acreção/lista-plana que o CLAUDE.md já superou. **Fora do caminho crítico da adequação de base** (o Roteador
  manda o agente ao checklist de 208 linhas, não a eles) — mas **tratar ANTES de reabrir "criar componente do
  zero"**, que é quando o agente realmente os lê. Ref.: `PROPOSTA_READEQUACAO_CLAUDE_MD.md` (mesma tese: núcleo
  enxuto + gates + índice para lookup). `[[project_claudemd_higiene]]`.

## Verificar (pode já estar resolvido)

- 🔍 **`DssResponsive`** — lista scope-props do slot default como slots (baixa prioridade). Mesmo arquivo.

## Frente em curso

- ⏳ **MR !6 — consistência da família de campos** (`work/dss-continuidade` → `main`, aberto 2026-07-22).
  16 commits: brand no anel de foco (rotas A/B + dark), label×placeholder padrão B, base font 16 + ícone
  20px + paridade pixel-perfect do prepend, slot `error` fiel ao `getBottom` do Quasar, anel de foco do
  DssFile, + Preview Frames Textarea/Field e seletor de ícone no sandbox. Gates verdes, testes 5/5.
  Reviewer `@joao-henrique.vieira`; aguardando review + CI.

- ⏳ **Família Controles de Seleção** (branch `work/dss-selection-controls`, NÃO empurrado ainda).
  **DssCheckbox fechado** (4 commits `816ed41`→`fba32a2`): leftLabel (dupla-inversão template×CSS),
  example §12 (estado inicial vazio→variedade), `defineExpose(focus/blur/toggle/inputRef)` (paridade
  campo), Preview Frame nascia indeterminate (seed `null`==`indeterminateValue:null` → semear do
  `@default` do vModel via contrato), `size="xl"` (28px, token). Preview Frame + TestCheckbox
  feitos. **DECISÕES DO DONO RESOLVIDAS + IMPLEMENTADAS (2026-07-24, ainda não commitado):**
  - ✅ **Props de ícone → escopo `checked`+`indeterminate`** (CCI §7, mudança aditiva). `checkedIcon`
    (`'check'`) e `indeterminateIcon` (`'remove'`) compostos via `DssIcon`; desmarcado permanece vazio
    (SEM `unchecked-icon`). Template usa `:name` binding. **`size` px arbitrário = REJEITADO POR TIPO**
    (união literal `xs|sm|md|lg|xl`, não `string`) — precedente da família registrado.
  - ✅ **`keepColor` adotado** (escape hatch opt-in; default cinza inalterado). Impl. em 3 camadas: type
    `keepColor?: boolean`; composable adiciona classe `dss-checkbox--keep-color` no root + `text-{color}`
    no control desmarcado (non-brand); `_brands.scss` estende o mixin p/ colorir o stroke desmarcado por
    variante (primary/secondary/accent) atrás de `.dss-checkbox--keep-color`. Racional/mecanismo detalhado
    ↓ resolvidos. **A11y:** 3:1 (WCAG 1.4.11) por brand×tema continua exigido; `forced-colors` vence.
  - **Gates (75 testes, +12):** SCSS compila · vitest 75/75 · @import/Material Icons/hardcode limpos ·
    contrato re-emitido (18 props, schema-válido, a11y 4) · `--all --strict` exit 0 · api-docs 0 diverg. ·
    type-check exit 0. **PENDENTE:** verificação visual no Preview Frame (dev server estava down; knobs já
    derivam do contrato) + **commit**. `[[project_adequacao_ui_recorrencias]]`.
  - **Verificação visual (2026-07-24, chrome-devtools no 5173):** keepColor ✅ colore o stroke em
    repouso; props de ícone ✅ (`checkedIcon`/`indeterminateIcon` renderizaram "star" no checkbox real —
    `indeterminateIcon` só aparece no estado indeterminate, alcançável via `toggleIndeterminate`+ciclo).
  - 🟡 **keepColor herda a inconsistência de brand global da família** (2026-07-24, provado por CSS):
    o stroke do keepColor segue o **brand-prop** (`_brands.scss` → `var(--dss-action-*)`, brand-aware)
    mas **não** o `[data-brand]` GLOBAL — porque no path non-brand usa a utility `.text-primary` do
    Quasar, que **não** é brand-aware (fixa em `rgb(31,134,222)` sob hub/water/waste). NÃO é regressão do
    keepColor: o **fill do estado marcado** (`bg-primary`) tem a MESMA cegueira; só o focus ring segue o
    global (mecanismo à parte). Consistente com o componente → **não corrigir isoladamente** (faria o
    stroke desmarcado seguir o global enquanto o fill marcado não → pior). Fix correto = sistêmico/família
    (componente inteiro brand-aware sob `[data-brand]` global). `[[project_brand_prop_vs_data_brand_focus]]`.
  - ✅ **MELHORIA DE SANDBOX (Preview Frame): knob de ícone ganhou autocomplete** (2026-07-24). Os knobs
    cujo nome casa `/icon/i` (`checkedIcon`/`indeterminateIcon`/`*Icon`) agora renderizam
    `input list="pv-icon-suggestions"` — o MESMO datalist do slot prepend/append (reaproveitado; movido p/
    fora do bloco de slots). 112 sugestões varridas dos `*.example.vue`. Input continua livre (só sugere),
    mas guia p/ nomes válidos e evita o glifo-em-branco. `PreviewFrame.vue`. Doc alertada
    (`DSSCHECKBOX_API.md` §Icon). *(Contexto: nome ausente do "Material Icons" clássico renderiza em branco
    pois o font não tem glifo de letra — NÃO é bug do componente; passthrough correto p/ DssIcon→QIcon.)*
  - 🟡 **MELHORIA DE SANDBOX (infra): carregar Material Symbols** — o sandbox só carrega `Material Icons`
    clássico (Google Fonts `family=Material+Icons`). Nomes novos falham. Decisão: carregar também
    Material Symbols (suporta os nomes novos) ou manter só o clássico + o picker acima. Escopo sandbox.
  - 🔲 **Aplicar à FAMÍLIA:** replicar `keepColor` + props de ícone (e o `size` união-literal) em
    **DssRadio/DssToggle** — são decisões de família. **Próximo: DssRadio** (Golden Context=DssCheckbox).
  - 🔲 **Ao criar DssRadio/DssToggle:** verificar a MESMA colisão do Preview (seed `null` vs valor "vazio"
    do componente). Só componentes com `indeterminateValue:null` quebram; declarar `@default` no vModel se preciso.

## Resolvidos nesta onda (para não reabrir por engano)

- ✅ **Merge da v2.4.0 para `main` — CONCLUÍDO** (2026-07-17). As 3 branches penduradas
  (`import/dss-v2.4.0`, `chore/apidocs-passthrough`, `chore/eol-normalization`) foram consolidadas
  numa branch de review (`review/merge-v2.4.0-apidocs-eol`, conflitos resolvidos) e mergeadas via
  **MR !5** (merge commit `7fb36d5`, por `@joaoVittorDevvv`). Auditoria de integridade no MR: 36
  arquivos apidocs 100% idênticos + 492 só-EOL + 0 mudança de conteúdo real; baseline de tokens
  fantasma = 0 preservado; CI-Lint válido. MRs !2/!4 auto-marcados merged; !3 fechado como superseded
  (EOL já em `main`). As 3 branches-fonte foram removidas do remoto; trabalho segue em `work/dss-continuidade`.

- ✅ **Tokens SCSS fantasma ZERADOS — baseline 34→0, gate DURO** (`b49b6e0` e antecessores). Todo
  `var(--dss-*)` no SCSS de componente resolvia p/ token INEXISTENTE escapava (o sync só valida o meta).
  Novo gate `validate-scss-tokens.cjs` (ratchet c/ baseline) + varreu 34 fantasmas: `--dss-error-*`→
  `--dss-feedback-error*`; `--dss-focus-ring` (27×, a11y invisível)→`--dss-focus-primary`; brand theming
  (`--dss-{hub,water,waste}-*` literal + interpolado em mixins Checkbox/Chip/Radio/Toggle)→`--dss-action-*`
  brand-aware + colapso de blocos `[data-brand]` redundantes (codemod `collapse-brand-blocks.mjs`); e o
  lote final (typos `border-width-medium`/`touch-target-min`/`line-height-md`/`neutral-*`/`spacing-1-5`,
  theme-aware `surface-dark`/`text-primary-dark`, tokens-de-componente-sem-def→fallback direto). Baseline
  agora **VAZIO** = qualquer `var(--dss-*)` inexistente bloqueia. `[[project_undefined_error_scale]]`.

- ✅ **Teste do fluxo de adequação (DssUploader, composto)** — validado ponta a ponta: Roteador→Cartão
  Composto, fonte-de-verdade-CSS resolveu Fase A sem alucinação, gate do contrato fechou Fase B com
  âncoras verificadas; julgamentos (F1, classification) escalados não forçados. 77 contratos, `--all
  --strict` exit 0. Commits `01e0b4d` (DoD) + `dbcb934` (DssUploader). DoD do CLAUDE.md agora inclui o passo do contrato.
- ✅ **DssUploader tem teste** (30 casos) — o débito de cobertura da memória estava DESATUALIZADO (o teste existe).
- ✅ **c0 — rampa de cores reconciliada com o Figma** (focus ausente/deep duplicado; 54/54) — `6a4baa6`.
- ✅ **Cadeia de fonte única**: schema + emissor + gates N/O/F + Preview Frame + gate CI — provados em DssInput/DssSelect.
- ✅ **Gate api-docs (30→0)** — **mergeado em `main` via MR !5** (v2.4.0); gate `validate:api-docs` verde. Verificação 🔍 fechada.
- ✅ **Normalização EOL** — `.gitattributes` **mergeado em `main` via MR !5** (v2.4.0).
