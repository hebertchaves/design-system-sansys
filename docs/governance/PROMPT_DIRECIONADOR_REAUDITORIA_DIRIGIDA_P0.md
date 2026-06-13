# PROMPT DIRECIONADOR — Reauditoria Dirigida Pós-Onda P0

**Gerado em:** 11 de Junho de 2026
**Insumos:**
1. `docs/governance/audit-reports/AUDITORIA_FINAL_CONSOLIDADA_JUNHO_2026.md` (Seção 2 — os 12 bloqueantes)
2. `docs/governance/PROMPT_DIRECIONADOR_ONDA_P0_CORRECOES_BLOQUEANTES.md` (o que foi mandado fazer)
3. `docs/governance/audit-reports/ONDA_P0_RELATORIO_EXECUCAO.md` (o que o executor alega ter feito)

**Objetivo:** emitir o veredicto go/no-go para a **Fase 4** (commit final + push GitLab), auditando EXCLUSIVAMENTE os 12 itens da Seção 2 do consolidado + os efeitos colaterais da onda. Os 69 alertas da Seção 3 estão FORA do escopo (backlog pós-migração).

**Princípio desta reauditoria:** a auditoria original buscava *o que parece feito mas não funciona*. Esta busca *o que parece corrigido mas foi mascarado*. O relatório de execução é HIPÓTESE, não evidência — toda alegação deve ser reverificada por comando próprio.

---

## Prompt para o Chat Auditor

```
Você é o auditor independente da Reauditoria Dirigida pós-Onda P0 do Design
System Sansys (DSS). A Onda P0 alega ter corrigido os 12 bloqueantes que
impediam a migração ao GitLab. Sua missão é CONFIRMAR ou REFUTAR cada
correção com evidência física própria (comando executado + saída real).

REGRAS DE INDEPENDÊNCIA:
- NÃO aceite o ONDA_P0_RELATORIO_EXECUCAO.md como prova — ele é a alegação
  a ser testada. Execute cada verificação você mesmo.
- Toda validação DEVE rodar sobre o ESTADO COMMITADO (HEAD), não sobre o
  working tree. Se houver mudanças não commitadas em packages/ ou apps/,
  registre-as antes (git status) e avalie se contaminam alguma verificação.
- Builds e testes: use a saída real do comando, nunca a alegada.
- Se uma correção for parcial ou mascarada (ex.: warning silenciado sem
  resolver a causa, teste afrouxado para passar), classifique como ❌ com
  a evidência do desvio.

CONTEXTO OBRIGATÓRIO (ler antes):
1. /mnt/c/Users/hebert.chaves/DSS/docs/governance/audit-reports/AUDITORIA_FINAL_CONSOLIDADA_JUNHO_2026.md (Seção 2)
2. /mnt/c/Users/hebert.chaves/DSS/docs/governance/PROMPT_DIRECIONADOR_ONDA_P0_CORRECOES_BLOQUEANTES.md
3. /mnt/c/Users/hebert.chaves/DSS/docs/governance/audit-reports/ONDA_P0_RELATORIO_EXECUCAO.md
4. /mnt/c/Users/hebert.chaves/DSS/CLAUDE.md (Princípios #1, #2, #11, #12)

Commits da onda (para rastrear o que mudou): 7ee0ceb..0d8d423
Comando útil: git log --oneline 7ee0ceb^..0d8d423 e
git diff edb13d3..0d8d423 --stat (delta completo da onda)

═══════════════════════════════════════════════════════════════════
CHECKLIST DE REVERIFICAÇÃO — UM ITEM POR BLOQUEANTE DA SEÇÃO 2
═══════════════════════════════════════════════════════════════════

[R1 ← bloqueante #1: build do HEAD]
□ git status --short -- packages/ → registrar estado; se sujo, git stash
  antes do build e git stash pop depois (provar que o COMMITADO compila)
□ cd /mnt/c/Users/hebert.chaves/DSS && npm run core:build 2>&1 | tail -20
  → exit 0 obrigatório
□ grep -n "from '../../base/" packages/core/components/composed/DssUploader/1-structure/DssUploader.ts.vue
  → zero ocorrências (todos devem ser '../../../base/')
□ for f in DssBottomSheet DssCarousel DssChatMessage DssDialog DssUploader; do
    grep -c "^export type {" packages/core/components/composed/$f/index.* ; done
  → nenhum 'export type {...}' em arquivo .js (em .ts é válido)

[R2 ← bloqueante #2: tokens no dist]
□ Após o build do R1: grep -c ":root" packages/core/dist/style.css → ≥ 1
□ grep -o "\-\-dss-compact-control-height-[a-z]*:" packages/core/dist/style.css | sort -u
  → declarações presentes (xs/sm/md/lg)
□ grep -c "dss-chip" packages/core/dist/style.css → ≥ 1
□ ANTI-MÁSCARA (dupla carga): grep -o "\-\-dss-primary:[^;]*" packages/core/dist/style.css | wc -l
  → exatamente 1; spot-check de 2 seletores de componente confirmando que
  repetições só ocorrem em contextos distintos (@media print/forced-colors/dark)
□ ANTI-MÁSCARA (GAP-03): grep -rn "@import '../.*module.scss'" packages/core/components/ --include="*.vue"
  → zero (a dupla carga não pode ter voltado)

[R3 ← bloqueante #5: DssButton ARIA]
□ grep "1-structure/DssButton" packages/core/components/base/DssButton/DssButton.vue
  → deve apontar para DssButton.ts.vue
□ ls packages/core/components/base/DssButton/1-structure/ → somente DssButton.ts.vue
□ grep -c "aria-busy\|aria-label\|aria-disabled" packages/core/components/base/DssButton/1-structure/DssButton.ts.vue → > 0
□ Mesma checagem de unicidade em DssAvatar/1-structure/ e DssBadge/1-structure/
□ Rodar: cd packages/core && npx vitest run --project unit components/base/DssButton/DssButton.test.js
  → todos passando; ANTI-MÁSCARA: inspecionar os testes adaptados na onda
  (diff aaf046f) e confirmar que a adaptação reflete o contrato canônico,
  não um afrouxamento (ex.: o teste de variantes ainda valida CLASSES
  renderizadas, não apenas existência de prop)

[R4 ← bloqueante #6: DssTable slots]
□ grep -n 'v-for.*\$slots' packages/core/components/composed/DssTable/1-structure/DssTable.ts.vue
  → forwarding dinâmico presente
□ npx vitest run --project unit components/composed/DssTable/DssTable.test.js
  → passando; confirmar que existe teste exercitando body-cell-[name] com
  conteúdo customizado E asserção de renderização real (find no DOM)
□ Conferir que o exemplo do README (#body-cell-actions) é compatível com a
  implementação atual

[R5 ← bloqueante #7: DssChip white]
□ grep -rn "white" packages/core/components/base/DssChip/3-variants/_outline.scss
  → zero como valor de cor
□ grep -c "var(--dss-text-inverse)" packages/core/components/base/DssChip/3-variants/_outline.scss → 4
□ Confirmar no catálogo que --dss-text-inverse está declarado
  (grep -rn -- "--dss-text-inverse:" packages/core/tokens/)

[R6 ← bloqueante #8: DssAvatar]
□ ls packages/core/components/base/DssAvatar/4-output/ → index.scss, _states.scss, _brands.scss (sem DssAvatar.scss)
□ ls packages/core/components/base/DssAvatar/3-variants/ → SEM _brands.scss
□ grep -c "data-brand\|--brand-" packages/core/components/base/DssAvatar/4-output/_brands.scss → > 0
□ test -f packages/core/components/base/DssAvatar/DssAvatar.example.vue && grep -c "section" (mínimo 3 cenários)
□ python3 -c "import json; print(json.load(open('packages/core/components/base/DssAvatar/dss.meta.json'))['defaultPreview']['computedDimensions'])"
  → 48px (md default do CSS)
□ npx sass packages/core/components/base/DssAvatar/DssAvatar.module.scss /tmp/r6.css --no-source-map → compila; brands no output

[R7 ← bloqueante #3: @import]
□ grep -rn "@import" packages/core/ --include="*.scss" --include="*.vue" | grep -v "_archive\|node_modules\|dist/"
  → analisar cada linha restante: só são aceitáveis ocorrências em
  comentários (// ou /* */). Qualquer @import ATIVO = ❌
□ npm run core:build 2>&1 | grep -ci "deprecation" → comparar com baseline
  da auditoria anterior (7 warnings); reduzir a zero era a meta — se restarem,
  identificar a origem exata e classificar (resíduo fora do escopo declarado
  do executor = ⚠️; resíduo dentro do escopo = ❌)
□ ANTI-MÁSCARA: confirmar que a migração não usou --quiet/--silence-deprecation
  em nenhum script de build (grep "silence\|quiet-deps\|quiet" package.json packages/core/package.json packages/core/vite.config.lib.js)

[R8 ← bloqueante #4: --quasar-*]
□ grep -rn "var(--quasar-" packages/core/ --include="*.scss" | grep -v "_archive\|dist/" → zero
□ grep -n "color-mix" packages/core/themes/_quasar-overrides.scss → as 2 linhas
  que eram rgba(var(...), 0.1) agora usam color-mix com var(--dss-primary)
□ Confirmar que --dss-primary/secondary/accent estão declarados no CSS compilado

[R9 ← bloqueantes #9 e #10: barrels]
□ Script de varredura: para cada componente com diretório types/, o barrel
  (index.ts ou index.js) exporta types? Esperado: zero faltantes em
  base/ + composed/ (stress-test pode ser exceção documentada)
□ Spot-check de 3 barrels migrados (DssButton, DssSlider, DssDialog):
  export do componente + export type + composables presentes
□ npm run core:build → o barrel central resolve os index.ts (já coberto pelo
  R1, mas registrar explicitamente)

[R10 ← bloqueante #11: órfão DssBadge]
□ test -f packages/core/components/base/DssBadge/4-output/DssBadge.scss → NÃO deve existir
□ grep -rn "3-variants/colors" packages/core/components/base/DssBadge/ → zero

[R11 ← bloqueante #12: drift docs-portal]
□ grep -c "BEGIN:DSS-TOKENS-AUTO-GENERATED" apps/docs-portal/src/index.css → 1
□ npm run sync:portal-tokens && git diff --stat apps/docs-portal/src/index.css
  → idempotente (diff vazio ou só timestamp). Se diff real = bloco gerado
  está desatualizado em relação ao core → ❌
□ Verificação de drift literal: extrair declarações --dss-* FORA do bloco
  gerado e confirmar que (a) não existem no core OU (b) são cadeias var()
  sem valor literal divergente
□ Duplicatas no core: grep -c -- "--dss-tertiary-deep:" packages/core/tokens/globals.scss → 1
  (idem warning-deep e info-deep)
□ npm run docs:build → exit 0

[R12 ← A11-07 elevado: hierarquia visual (T6)]
□ grep -rn -i "figma" docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md docs/governance/DSS_VISUAL_CONTRACT.md docs/reference/DSS_COMPONENT_ARCHITECTURE.md
  → NENHUMA declaração de autoridade (supremo/prevalece/árbitro/fonte de
  verdade) atribuída ao Figma; menções como ferramenta MCP são aceitáveis
□ Varredura ampla: grep -rn -i "figma.*\(supremo\|prevalece\|precedência\|árbitro\|fonte de verdade\)" docs/ --include="*.md" | grep -v "audit-reports\|archive\|PROMPT_DIRECIONADOR"
  → zero em documentos vivos (direcionadores históricos são registro de época — aceitos)
□ Seção AUTO-GENERATED do contrato visual: npm run sync:visual-contract →
  diff apenas de timestamp (região gerada intacta)
□ Consistência: a hierarquia da Seção 5.4 deve declarar CSS → meta.json →
  documento, alinhada ao Princípio #12 do CLAUDE.md

═══════════════════════════════════════════════════════════════════
EFEITOS COLATERAIS DA ONDA (regressões e qualidade das mudanças novas)
═══════════════════════════════════════════════════════════════════

[R13 — infraestrutura de testes criada na onda]
□ packages/core/vitest.config.ts: projeto 'unit' existe (jsdom, components/**/*.test.js)
□ packages/core/test/quasar-vitest-helper.js: ler o shim INTEIRO — confirmar
  que registra os QComponents de verdade (não um mock vazio) e que
  installQuasar/installQuasarPlugin são funcionalmente reais
□ Rodar a suíte dos componentes TOCADOS pela onda:
  npx vitest run --project unit components/base/DssButton components/base/DssAvatar components/base/DssBadge components/base/DssChip components/composed/DssDialog components/composed/DssBottomSheet components/composed/DssPopupEdit components/composed/DssTable
  → 100% passando (a alegação é 374 testes)
□ ANTI-MÁSCARA: nos diffs dos testes adaptados (commits aaf046f, ad1a02f,
  70647d8), confirmar que nenhuma asserção foi REMOVIDA sem substituição
  equivalente — adaptação ao contrato canônico é válida; esvaziamento não

[R14 — brand teleportado funciona de fato (T4)]
□ Ler packages/core/composables/useTeleportedBrand.ts — verificar lógica
  real (body/html → fallback querySelector → MutationObserver)
□ Confirmar integração nos 3 componentes (grep useTeleportedBrand em
  DssDialog/DssBottomSheet/DssPopupEdit 1-structure)
□ Confirmar seletor self nos 3 _brands.scss (.dss-dialog[data-brand=...])
□ Os 3 testes de brand do DssDialog.test.js passam e cobrem: norma body,
  fallback legado, omissão sem brand
□ Norma documentada no DSS_IMPLEMENTATION_GUIDE.md (seção Brandabilidade)

[R15 — saúde geral pós-onda]
□ git log 7ee0ceb^..HEAD --stat | tail -5 → delta total da onda registrado
□ npm run sync:visual-contract → região gerada estável
□ Sandbox: npm run sandbox:dev em background + curl -s -o /dev/null -w "%{http_code}" http://localhost:<porta> → 200 (smoke test; encerrar o processo depois)
□ Nenhum arquivo de produção referencia caminhos removidos na onda:
  grep -rn "1-structure/DssButton.vue\|4-output/DssAvatar.scss\|4-output/DssBadge.scss" packages/ apps/ --include="*.js" --include="*.ts" --include="*.vue" --include="*.scss" --include="*.json" | grep -v node_modules → zero

═══════════════════════════════════════════════════════════════════
OUTPUT OBRIGATÓRIO
═══════════════════════════════════════════════════════════════════

Relatório com:
1. TABELA-VEREDICTO: | Item (R1–R15) | Bloqueante de origem | Resultado
   (✅ confirmado / ⚠️ parcial / ❌ refutado-mascarado) | Evidência (comando+saída) |
2. DIVERGÊNCIAS entre o alegado no ONDA_P0_RELATORIO_EXECUCAO.md e o
   encontrado (se houver)
3. REGRESSÕES novas introduzidas pela onda (se houver)
4. VEREDICTO FINAL — escolher exatamente um:
   ✅ DESBLOQUEADO PARA FASE 4 (GitLab) — 12/12 confirmados, sem regressões
   ⚠️ DESBLOQUEADO COM RESSALVAS — itens ⚠️ listados, decisão consciente
   ❌ PERMANECE BLOQUEADO — itens ❌ com correção pendente
   Justificativa em 3-5 linhas.
5. Se DESBLOQUEADO: listar as ações da Fase 4 (commit final, push GitLab) e
   os 2 itens documentais pós-migração já conhecidos (adendo v2 do
   Production Readiness Laudo [A11-08] e atualização do CLAUDE.md sobre a
   contagem de test.js, que a onda provou estar defasada).

Salve em: /mnt/c/Users/hebert.chaves/DSS/docs/governance/audit-reports/REAUDITORIA_DIRIGIDA_P0.md
O arquivo salvo é o entregável obrigatório. Salve ASSIM QUE concluir o checklist.
```

---

## Notas de Orquestração

- **Um único agente** é suficiente (escopo fechado de 15 itens) — não repetir o padrão de 12 agentes paralelos da auditoria geral.
- Tempo estimado: 2 builds completos (~7 min cada) + testes + greps.
- O auditor NÃO corrige nada: itens ❌ voltam para um executor (mini-onda P0.1) antes de novo ciclo.
- Após veredicto ✅/⚠️: Fase 4 (commit final + push GitLab) é executada pelo mantenedor ou por chat executor com aprovação explícita do push.
