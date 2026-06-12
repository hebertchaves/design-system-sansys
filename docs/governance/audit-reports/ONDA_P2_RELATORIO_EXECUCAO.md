# Onda P2 — Relatório de Execução (Testes & Infra)

**Executado em:** 12 de Junho de 2026
**Escopo:** Grupos 3 e 4 do backlog pós-auditoria (Seção 3 do consolidado)
**Commits:** `befb47c..373d1b6` (8 commits)

---

## Sumário

| Tarefa | Status | Destaque |
|--------|--------|----------|
| G3.1 — 3 test.js faltantes | ✅ | Cobertura de arquivos **91/91** (Uploader, CadrisCard, TestPageComplexity) |
| G3.2 — Estabilização da suíte | ✅ | Primeira execução da história: **549 falhas → 0**. Suíte final: **90/90 arquivos, 2526 testes** |
| G3.3 — Teclado WCAG 2.1.1 | ✅ | 18 componentes interativos; suíte total: **2553 testes verdes** |
| G4.1 — Quick wins infra | ✅ | Higiene (8 artefatos), lockfile único, dist untracked, alias `@core`, máscara `silenceDeprecations` removida |
| G4.2 — Type-check real | ✅ | Stub `echo` → `vue-tsc` real; **baseline de 66 erros** documentada (`TYPECHECK_BASELINE_P2.md`) |
| G4.3 — MCP | ✅ | Bug de cwd do `validateVisualContract` corrigido (resolução validada p/ base, composed e stress-test); build atualizado |
| G4.4 — Tokenizações | ✅ | `--dss-focus-ring-offset` (19×), `--dss-shadow-up-md` (EXC-05 do Footer resolvida), bordas do Dialog, Drawer preview fechado, previewGroups de layout |

---

## G3.2 — Os 6 bugs REAIS de produção descobertos pela suíte

A estabilização não foi só de testes — expor o gate revelou defeitos de componente que existiam em produção:

1. **DssBreadcrumbsEl**: o QBreadcrumbs identifica itens por `vnode.type.name === 'QBreadcrumbsEl'` — com o nome DSS, **separadores nunca renderizavam** (produção inclusive). Corrigido (name alinhado ao contrato do motor + import local anti-recursão).
2. **DssExpansionItem**: cast booleano do Vue forçava modo controlado fechado — **`defaultOpened` era ignorado**. Corrigido (`modelValue: undefined` explícito).
3. **DssAjaxBar**: expose chamava `setProgress`, **método inexistente no QAjaxBar** → TypeError. Mapeado para `increment`.
4. **DssToolbarTitle**: slot `subtitle` ia para um slot **inexistente** do motor — conteúdo descartado. Renderização própria adicionada.
5. **DssTabs.test.js** nunca registrava o Quasar; **DssPullToRefresh.test.js** tinha sintaxe TS em `.js` — nunca parseou.
6. **DssParallax** (teste): stub declarava `class` como prop, engolindo o binding.

## G3.2 — Correções de infraestrutura do runner

- `compilerOptions.comments: false` (paridade com produção): comentários HTML antes do root tornavam componentes *fragment* em modo dev — `classes()` vazio em massa (**313 testes** recuperados com 1 linha).
- Shims jsdom: scroll APIs, matchMedia, Resize/IntersectionObserver, SMIL (`beginElement`/`endElement`/`pauseAnimations`/`unpauseAnimations`), `HTMLImageElement.decode`.
- Padrão de **contexto canônico** para componentes com acoplamento pai-filho do Quasar: FabAction→QFab, Tab/RouteTab→QTabs (+vue-router de memória), Page*→QLayout, Drawer→QLayout, Breadcrumbs→com filhos.

## G3.3 — Mecânicas reais de teclado mapeadas (por sondagem)

- Runner de ESC do Quasar: `keydown`+`keyup` no **window** (Dialog, BottomSheet, Menu, Drawer overlay).
- QSlider: setas no `.q-slider__track-container`; QRange exige **foco real no thumb**.
- QRating: seta move + **Enter confirma**; QTabs: setas movem o **foco** (roving), não o modelo.
- **Limitação de motor registrada**: QStepper não dá foco nativo aos cabeçalhos (teste trava o contrato para sinalizar mudança futura do Quasar).

## Pendências geradas (Onda P2.1 — backlog explícito)

1. **66 erros de type-check** (baseline em `TYPECHECK_BASELINE_P2.md`) — tipos DSS × tipos oficiais do Quasar; corrigir caso a caso sem introduzir novos.
2. `validate_visual_contract` segue **declarativa** (pipeline de renderização real é a Fase 4 do plano MCP).
3. DssVideo: slot declarado no template é descartado pelo QVideo (iframe puro) — alinhar documentação ou implementar overlay próprio.
4. `outline-offset` com `1px`/`-2px` (insets específicos) permanecem como exceções pontuais.
5. Integrar `npm run type-check` e a suíte `unit` ao CI quando o GitLab estiver ativo.

## Bateria final

| Verificação | Resultado |
|---|---|
| Suíte unit completa | ✅ 90/90 arquivos · 2553/2553 testes |
| `npm run core:build` | ✅ exit 0 |
| `npm run docs:build` | ✅ (G4.1) |
| `validate:css-meta` | ✅ 88 comps, zero tokens inválidos |
| Contrato visual | ✅ sync automático via pre-commit |
| Sandbox smoke | ✅ HTTP 200 com alias @core |
