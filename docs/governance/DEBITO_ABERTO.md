# DSS — Índice de Débito Aberto

> Ponto único de consulta do que está **em aberto** no DSS, para não depender de varrer a memória/histórico.
> Criado 2026-07-02 @ `import/dss-v2.4.0`. **Manter enxuto:** ao fechar um item, mover para "Resolvidos"
> (com commit) ou remover. Cada item aponta a fonte de detalhe (doc de governança ou arquivo de memória).

## Legenda
🔴 ativo (frente em curso) · 🟡 débito de fundo (consciente, não urgente) · ⏳ aguardando terceiro · 🔍 verificar

---

## Frentes desta onda (cadeia de fonte única / contraste)

- 🔴 **(a) Escalar `dss.contract.json`** — **35/76** base emitidos; faltam **41**. Runbook:
  `HANDOFF_ESCALA_CONTRATOS.md`. Grupos sequenciais por família. Relatórios em `relatorios/CONTRATOS_*.md`.
  - ✅ **Form/Input (23)** · **Feedback/Status (1)** · **Navigation (9)** — todos schema-válidos, 0 gaps, a11y verificada.
  - ⬜ Faltam: Overlay (1), Data Display (3), Layout (10), Outros (27).
  - 🔒 `classification` agora é **enum enforçado** no schema (Action|Compact|Visual); prosa/racional vai
    p/ `classificationNote`. Os 10 valores-prosa do Form/Input foram reconciliados retroativamente.
- ⏳ **(c1) Contraste WCAG da paleta default** — auditoria + tabela de rotas (A escurecer / B texto escuro)
  prontas; **aguardando decisão da equipe** por cor. NÃO tocar `globals.scss` até o retorno.
  `[[project_color_ramp_a11y]]`. (c0 — reconciliação da rampa com o Figma — **feito**, commit `6a4baa6`.)
- ⏳ **Merge para `main`** (com o responsável) — 3 branches penduradas:
  `import/dss-v2.4.0` (~14), `chore/eol-normalization` (~11, normaliza EOL/`.gitattributes`),
  `chore/apidocs-passthrough` (~13, zera o gate api-docs). Ordem não deve importar (arquivos disjuntos);
  ⚠️ o CI do `main` pode reprovar o gate `validate:api-docs` **até** a branch de api-docs entrar.

## Débito de fundo (ondas anteriores)

- 🟡 **Visual Height do DssInput (issues #3/#4)** — auto-height do Quasar: label ~2.5px fora do centro em
  repouso (#3); com valor, a label flutuante **sobrepõe** o valor centralizado no native (#4). Tensão:
  altura compacta (zero padding vertical) × reserva de topo p/ label flutuante. `[[project_visual_height_propagacao]]`.
- 🟡 **Propagação CSS→meta — lotes 2–6** — catálogo com 38 divergências de *value* + 6 dimensionais
  pendentes (`sync-token-values.js`). Mesma fonte acima.
- 🟡 **`--dss-text-secondary` reprova AA** — `#B0B0B0` ≈ 2.6:1, sistêmico. DssInput já migrou p/ gray-600
  no label; **demais componentes ainda usam o token frouxo**. → **tratar junto com (c1)** (mesmo tema).
- 🟡 **Cobertura de testes: `DssUploader`** — único componente base sem `*.test.js` (89/89 exceto ele;
  CadrisCard/TestPageComplexity são fixtures fora de escopo). `[[project_cobertura_testes]]`.
- 🟡 **Focus ring ausente no CSS próprio de 6 interativos** — Checkbox, Radio, Toggle, Field, Range,
  Slider não declaram anel de foco no SCSS do componente; visibilidade de foco depende de regra
  global/Quasar. Risco WCAG 2.4.7 se a global falhar/for sobrescrita. Achado ao emitir contratos
  (Form/Input). **Verificar na Onda Higiene.** `relatorios/CONTRATOS_FORM_INPUT.md`.
- 🟡 **Higiene `!important` — estados não-default** — disabled/erro/hover reais não são validáveis na
  sandbox (injeção sintética de classe Quasar dá artefato). Risco residual baixo. `[[project_important_audit]]`.
- 🟡 **`tokens/brand/index.scss` = código morto (T4)** — ~149 `!important` inócuos (arquivo não importado)
  + feature de override local de marca parcialmente entregue. T4 BLOQUEADO (limpar seria maquiagem).
  Alerta em `ALERTA_BRAND_INDEX_NAO_IMPORTADO.md`. `[[project_brand_index_dead_code]]`.
- 🟡 **Escala `--dss-error-*` indefinida** — error-600/900 nunca definidos; estados de erro
  (borderless/standout) caem p/ transparente em vários componentes. Usar `--dss-feedback-error`.
  `[[project_undefined_error_scale]]`.
- 🟡 **Decisão: label flutuante vs estática** — Material (flutuante, atual) vs shadcn/Make (estática acima).
  Usuário optou por **manter flutuante por enquanto**. `[[project_make_vs_dss_contrato_visual]]`.
- 🟡 **Consolidação documental (5→1)** — `COMPONENT_PAGE_STRUCTURE` já absorve 5 docs; **remoção física**
  dos superados é etapa pós-POC, ainda não executada. `[[project_sandbox_source_of_truth]]`.
- 🟡 **`example.vue` non-normativos (90)** — rotular como demo ilustrativo (item M do blueprint); backfill
  de prosa verificável (a11y) por componente é parte de (a). `[[project_sandbox_source_of_truth]]`.

## Verificar (pode já estar resolvido)

- 🔍 **Débito de props (api-docs, 30)** — ainda diverge em `import/dss-v2.4.0`, mas o fix (30→0) vive em
  `chore/apidocs-passthrough`. **Confirmar após o merge** dessa branch no `main`. `[[reference_api_docs_validator]]`.
- 🔍 **`DssResponsive`** — lista scope-props do slot default como slots (baixa prioridade). Mesmo arquivo.

## Resolvidos nesta onda (para não reabrir por engano)

- ✅ **c0 — rampa de cores reconciliada com o Figma** (focus ausente/deep duplicado; 54/54) — `6a4baa6`.
- ✅ **Cadeia de fonte única**: schema + emissor + gates N/O/F + Preview Frame + gate CI — provados em DssInput/DssSelect.
- ✅ **Gate api-docs (30→0)** — na branch `chore/apidocs-passthrough` (pendente de merge).
- ✅ **Normalização EOL** — `.gitattributes` na branch `chore/eol-normalization` (pendente de merge).
