# AUDITORIA FINAL — A10: Componentes Periféricos (16 componentes)

**Data:** 2026-06-11
**Auditor:** Claude (DSS Agent)
**Escopo:** 16 componentes fora do foco principal das auditorias Fase 1/2
**Baseline normativa:** CLAUDE.md (Gate Estrutural DSS), CERTIFIED_COMPONENTS.md, DSS_DEFAULT_PREVIEW_WORKFLOW.md

---

## Veredito Geral: ⚠️ ALERTA (não bloqueante para o sistema; 1 componente com gap de teste)

- ✅ **Nenhuma condição de REPROVAÇÃO encontrada**: DssCadrisCard e DssDataCard **NÃO** estão no barrel público do core; nenhum gate técnico falhando nos componentes públicos.
- ⚠️ **1 gap estrutural**: `DssCadrisCard` não possui arquivo `.test.js` (gate de build bloqueante para selo) e é o único dos 16 **não certificado**.
- ⚠️ **2 alertas documentais** (não bloqueantes): DssParallax sem nota de performance no README; nomenclatura `index.ts` vs. `index.js` exigido pelo checklist.

---

## 1. Gate Estrutural — Tabela por Componente

Legenda: ✅ conforme | ⚠️ conforme com ressalva | ❌ não conforme

| Componente | Local | 4 Camadas | Wrapper puro | meta.json (previewGroup + demoSlots) | .test.js | index (barrel local) | Certificado |
|---|---|---|---|---|---|---|---|
| DssAjaxBar | base/ | ✅ | ✅ | ✅ `progresso` / demoSlots declarado (null) | ✅ | ✅ index.js | ✅ 18/05/2026 |
| DssBanner | base/ | ✅ | ✅ | ✅ `banners` / demoSlots objeto | ✅ | ⚠️ index.ts | ✅ 20/05/2026 |
| DssImg | base/ | ✅ | ✅ | ✅ `midia` / demoSlots declarado (null) | ✅ | ⚠️ index.ts | ✅ 13/05/2026 |
| DssMarkupTable | base/ | ✅ | ✅ | ✅ `cartoes` / demoSlots objeto | ✅ | ⚠️ index.ts | ✅ 19/05/2026 |
| DssParallax | base/ | ✅ | ✅ | ✅ `contextuais` / demoSlots declarado (null) | ✅ | ⚠️ index.ts | ✅ 18/05/2026 |
| DssPullToRefresh | base/ | ✅ | ✅ | ✅ `contextuais` / demoSlots declarado (null) | ✅ | ⚠️ index.ts | ✅ 20/05/2026 |
| DssResponsive | base/ | ✅ | ✅ | ✅ `contextuais` / demoSlots declarado (null) | ✅ | ⚠️ index.ts | ✅ 19/05/2026 |
| DssScrollArea | base/ | ✅ | ✅ | ✅ `midia` / demoSlots objeto | ✅ | ⚠️ index.ts | ✅ 19/05/2026 |
| DssVideo | base/ | ✅ | ✅ | ✅ `contextuais` / demoSlots declarado (null) | ✅ | ⚠️ index.ts | ✅ 13/05/2026 |
| DssChatMessage | composed/ | ✅ | ✅ | ✅ `contextuais` / demoSlots declarado (null) | ✅ | ✅ index.js | ✅ 21/05/2026 |
| DssCircularProgress | base/ | ✅ | ✅ | ✅ `progresso` / demoSlots declarado (null) | ✅ | ⚠️ index.ts | ✅ 18/05/2026 |
| DssLinearProgress | base/ | ✅ | ✅ | ✅ `progresso` / demoSlots declarado (null) | ✅ | ✅ index.js | ✅ 06/05/2026 |
| DssSlideItem | base/ | ✅ | ✅ | ✅ `listas` / demoSlots objeto | ✅ | ⚠️ index.ts | ✅ 20/05/2026 |
| DssInnerLoading | base/ | ✅ | ✅ | ✅ `progresso` / demoSlots objeto | ✅ | ✅ index.js | ✅ 18/05/2026 |
| DssCadrisCard | stress-test/ | ✅ | ✅ | ✅ `contextuais` / demoSlots declarado (null) | ❌ **AUSENTE** | ✅ index.js | ❌ **Não certificado** |
| DssDataCard | stress-test/ | ✅ | ✅ | ✅ `contextuais` / demoSlots declarado (null) | ✅ | ✅ index.js | ✅ 23/05/2026 (Fase 3) |

**Evidências do gate estrutural:**
- 16/16 possuem `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` completos (verificação via `ls` em lote).
- 16/16 possuem Entry Point Wrapper como **re-export puro** (sem template, sem style, sem lógica) — conferido lendo cada `Dss<Comp>.vue`. DssCadrisCard e DssDataCard incluem comentário HTML documentacional no wrapper, o que não viola a pureza.
- 16/16 possuem `dss.meta.json` com `previewGroup`, `goldenReference`, `goldenContext` e campo `defaultPreview.demoSlots` declarado. Em 10 componentes o valor é `null` (explícito) — padrão aceito, inclusive em componentes já selados (DssImg, DssVideo, DssPullToRefresh).
- 15/16 possuem `Dss<Comp>.test.js`. **Exceção: DssCadrisCard** (`packages/core/components/stress-test/DssCadrisCard/` — nenhum `*.test.js`).
- Barrel local: 10 componentes usam `index.ts` (TypeScript) em vez de `index.js`. Conteúdo conforme (exporta componente, composable e types — ex.: `base/DssImg/index.ts` exporta `DssImg`, `useImgClasses`, `DssImgProps/Emits/Slots`). O barrel global `components/index.js` os exporta via path do diretório, resolvido pelo Vite. **Ressalva apenas nominal** vs. checklist do CLAUDE.md que cita `index.js`.

---

## 2. Riscos Específicos

### 2.1 DssCadrisCard / DssDataCard (stress-test) — Isolamento do barrel público ✅
- **São componentes de teste de composição (Fase 3 — Stress Test de Composição)**, conforme `dss.meta.json` (`phase: 3`) e seção "Fase 3" do CERTIFIED_COMPONENTS.md.
- **Confirmado: excluídos do barrel público.** `grep` em `packages/core/components/index.js` retorna **0 ocorrências** de `DssCadrisCard`/`DssDataCard`; nenhuma referência a `stress-test/` fora do próprio diretório (verificado em `packages/core/index.js`, `packages/core/components/index.js` e `apps/components/src`).
- O build da lib (`vite.config.lib.js`, entry `index.js`) portanto **não inclui** os stress-test no `dist/` — não importáveis via `import { ... } from '@sansys/design-system'`.
- ⚠️ Nota residual (não bloqueante): o `package.json` do core publica o diretório `components/` em `files`, o que tecnicamente permite deep-import por caminho de arquivo. Não é API pública e não viola o critério, mas pode ser endurecido com `exports` map restritivo no futuro.

### 2.2 DssAjaxBar — position "top" ✅
- `defaultPreview.props.position = "top"` em `base/DssAjaxBar/dss.meta.json` — **a correção do commit anterior permanece**.
- Observação: a posição está em `defaultPreview.props` (local correto), não em `demoSlots` (que é `null` para este componente).

### 2.3 DssImg — fallback de src quebrada ✅ documentado
- Prop `fallbackSrc` documentada em `DSSIMG_API.md` ("URL da imagem exibida quando `src` falha ao carregar").
- README possui seção "Com fallback e border-radius" com exemplo de `fallback-src`.
- `DssImg.md` documenta estado `error` (ícone `broken_image` via DssIcon, slot `#error`), evento `@error` (disparado após tentativas de `src` e `fallbackSrc`) e comportamento de acessibilidade (alt text anunciado quando a imagem falha).

### 2.4 DssParallax — nota de performance ⚠️ GAP
- **README.md NÃO contém nota sobre performance/scroll listener** (grep por performance, scroll listener, requestAnimationFrame, passive: 0 resultados no README).
- `DssParallax.md` menciona performance apenas indiretamente: "Quando NÃO usar — em dispositivos onde performance é crítica sem testes prévios" e "Scroll listeners do QParallax não são registrados" (no contexto de `prefers-reduced-motion`).
- **Recomendação:** adicionar ao README seção curta de performance explicitando que o QParallax registra scroll listener no `scrollTarget` (default `window`) e o custo associado.

---

## 3. Certificação

### Certificados (15/16)
DssLinearProgress (06/05), DssImg e DssVideo (13/05), DssParallax, DssCircularProgress, DssInnerLoading e DssAjaxBar (18/05), DssScrollArea, DssResponsive e DssMarkupTable (19/05), DssBanner, DssPullToRefresh e DssSlideItem (20/05), DssChatMessage (21/05), DssDataCard (23/05 — Golden Context da Fase 3).

### NÃO certificados (1/16)

| Componente | Gap crítico que impede certificação |
|---|---|
| **DssCadrisCard** | **Ausência de `DssCadrisCard.test.js`** — gate de build BLOQUEANTE do Checklist de Validação Final (CLAUDE.md, Gate Documental). Estrutura, wrapper, meta.json (`auditStatus: approved`, `phase: 3`) e documentação existem; o teste é o único artefato faltante. Secundariamente, falta a linha correspondente na tabela Fase 3 do CERTIFIED_COMPONENTS.md (seção marcada "1/? — Em andamento"). |

**Inconsistência observada:** o CLAUDE.md afirma "100% de cobertura: 76/76 componentes possuem test.js no core", mas a contagem atual é 87/89 em base+composed (faltam `composed/DssTestPageComplexity` e `composed/DssUploader` — fora do escopo desta auditoria) e 1/2 em stress-test (falta `DssCadrisCard`). A afirmação de 100% deve ser revisada ou ter seu escopo explicitado.

---

## 4. Ações Recomendadas (priorizadas)

1. **[ALTA]** Criar `DssCadrisCard.test.js` (renderização base, props, eventos, slots) — desbloqueia certificação.
2. **[MÉDIA]** Adicionar linha de DssCadrisCard à tabela Fase 3 do CERTIFIED_COMPONENTS.md após o teste e auditoria de selo.
3. **[BAIXA]** Adicionar nota de performance (scroll listener) ao README do DssParallax.
4. **[BAIXA]** Alinhar o Checklist do CLAUDE.md ao padrão real (`index.ts` aceito como barrel local) ou padronizar a extensão.
5. **[BAIXA]** Endurecer `exports` map do `@sansys/design-system` para impedir deep-import de `components/stress-test/*`.

---

*Relatório gerado pela auditoria A10 — Componentes Periféricos. Evidências coletadas via varredura em lote (ls/grep/python) em `packages/core/components/` e `docs/governance/CERTIFIED_COMPONENTS.md`.*
