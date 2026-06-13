# PROMPT DIRECIONADOR — ONDA P0: Correção dos Bloqueantes da Auditoria Final

**Gerado em:** 11 de Junho de 2026
**Insumo primário:** `docs/governance/audit-reports/AUDITORIA_FINAL_CONSOLIDADA_JUNHO_2026.md` (veredicto ❌ BLOQUEADO, 16 bloqueantes, 69 alertas)
**Endosso estratégico:** Chat orquestrador confirmou fisicamente os bloqueantes B1–B5 no código antes de aprovar este plano
**Objetivo:** Zerar os bloqueantes da Seção 2 do relatório consolidado, habilitar reauditoria dirigida e desbloquear a migração GitLab (Fase 4)

---

## ⚠️ DECISÃO DE GOVERNANÇA INCORPORADA (vinculante para esta onda)

**O Figma NÃO é mais autoridade visual do DSS.** Ele regrediu na hierarquia: é apenas uma ferramenta de mercado acessível via MCP, como qualquer outra. O **CSS do componente é a fonte de verdade visual suprema** (Princípio #12 do CLAUDE.md, já vigente). O `DSS_REFERENCIA_VISUAL_ANALISE.md` ainda contém resíduos da versão antiga da hierarquia que declaram o oposto — corrigi-los é **item P0 desta onda** (tarefa T6), não um alerta adiável, porque documentos Nível 1 em contradição confundem agentes executores que seguem o Princípio #12 literalmente.

---

## Prompt para o Chat Executor

```
Você é o executor da Onda P0 do Design System Sansys (DSS). Sua missão é corrigir
os bloqueantes confirmados pela Auditoria Final de Junho/2026, na ordem exata
abaixo. Cada tarefa tem critério de validação próprio — NÃO avance para a próxima
sem validar a atual. Não introduza máscaras: toda correção deve ser real e
verificável por comando.

LEITURA OBRIGATÓRIA ANTES DE COMEÇAR:
1. /mnt/c/Users/hebert.chaves/DSS/CLAUDE.md (Princípios #1, #2, #11, #12)
2. /mnt/c/Users/hebert.chaves/DSS/docs/governance/audit-reports/AUDITORIA_FINAL_CONSOLIDADA_JUNHO_2026.md (Seção 2 completa)
3. /mnt/c/Users/hebert.chaves/DSS/docs/governance/DSS_MONOREPO_PATH_MAP.md (regras de importação)

Relatórios setoriais de apoio (consultar quando a tarefa citar):
docs/governance/audit-reports/AUDITORIA_FINAL_A1..A12_*.md

═══════════════════════════════════════════════════════════════════
T0 — SANEAR O HEAD (pré-requisito de tudo)
═══════════════════════════════════════════════════════════════════
Contexto [A2]: o estado COMMITADO do repo não compila. As correções já existem
no working tree mas não foram commitadas.

a) Verificar/aplicar: DssUploader/1-structure/DssUploader.ts.vue linhas 60-62 —
   imports devem ser '../../../base/...' (três níveis), não '../../base/...'
b) Verificar/aplicar: barrels de DssBottomSheet, DssCarousel, DssChatMessage,
   DssDialog, DssUploader (composed/) — remover sintaxe `export type` de
   arquivos .js (usar `export * from './types/...'` ou migrar para index.ts)
c) Commit dessas correções com mensagem descritiva.

VALIDAÇÃO: cd /mnt/c/Users/hebert.chaves/DSS && npm run core:build → exit 0.
Em seguida: git stash && npm run core:build && git stash pop → exit 0 também
(prova que o HEAD compila, não apenas o working tree).

═══════════════════════════════════════════════════════════════════
T1 — TOKENS NO DIST (B1 — o bloqueante mais grave)
═══════════════════════════════════════════════════════════════════
Contexto [A2]: packages/core/dist/style.css tem CSS de componentes mas ZERO
blocos :root — o entry da lib (vite.config.lib.js → index.js) nunca importa
packages/core/index.scss. Consumidores reais recebem var(--dss-*) indefinidas.
O sandbox mascara isso por compilar Sass ao vivo.

a) Adicionar a importação do SCSS de tokens no entry da lib (index.js do core).
   ⚠️ CUIDADO (alerta do orquestrador): packages/core/index.scss pode incluir
   components/index.scss — verificar se a adição duplica o CSS de componentes
   no bundle. Se duplicar, importar apenas a cadeia de tokens+themes (criar
   entry SCSS específico se necessário, ex.: tokens-entry.scss) mantendo o CSS
   de componentes pelo caminho atual.
b) Rebuildar e medir.

VALIDAÇÃO (todas obrigatórias):
- grep -c ":root" packages/core/dist/style.css → > 0
- grep "compact-control-height" packages/core/dist/style.css → declarações presentes
- grep -c "dss-chip" packages/core/dist/style.css → > 0
- Tamanho do style.css coerente (ordem de centenas de KB, sem dobrar por duplicação)
- Nenhum seletor de componente duplicado (spot-check: grep -c ".dss-button {" ≤ contagem pré-mudança)

═══════════════════════════════════════════════════════════════════
T2 — DSSBUTTON: ELIMINAR IMPLEMENTAÇÃO DUPLA (B2)
═══════════════════════════════════════════════════════════════════
Contexto [A3]: 1-structure/ contém DssButton.vue (legado, SEM ARIA) e
DssButton.ts.vue (canônico, com aria-label/aria-busy/aria-disabled). O wrapper
raiz DssButton.vue importa o LEGADO; o index.js importa o canônico. Quem usa o
wrapper (ex.: sandbox) recebe botão sem acessibilidade.

a) Atualizar o wrapper raiz DssButton.vue para re-export puro de
   './1-structure/DssButton.ts.vue' (formato canônico do Princípio #11)
b) Remover (ou mover para _archive/ com header DEPRECATED) o
   1-structure/DssButton.vue legado — não pode restar caminho de import ativo
c) Verificar o MESMO padrão em DssAvatar e DssBadge (ambos têm .vue extra em
   1-structure/ segundo o A3) — aplicar a mesma correção se confirmado
d) Rodar DssButton.test.js e o build após a troca

VALIDAÇÃO: grep "aria-busy" no template efetivamente entregue pelo wrapper;
npm run core:build verde; testes do componente passando; nenhuma referência
restante ao arquivo legado (grep -r "1-structure/DssButton.vue" packages/ apps/).

═══════════════════════════════════════════════════════════════════
T3 — DSSCHIP: REMOVER color: white LITERAL (B3 — Golden Reference)
═══════════════════════════════════════════════════════════════════
Contexto [A3]: 3-variants/_outline.scss tem 6 ocorrências de `color: white`.
Gravíssimo por ser a Golden Reference interativa — valida implicitamente a
violação para todo o sistema.

a) Substituir por token semântico. Candidato do orquestrador:
   var(--dss-text-inverse) — CONFIRMAR no DSS_TOKEN_REFERENCE.md qual é o token
   exato para texto sobre fundo de cor (verificar se é --dss-text-inverse ou
   --dss-text-on-primary; usar o nome EXATO do catálogo)
b) Conferir se dss.meta.json.visualProperties do DssChip precisa refletir a mudança
c) Rodar npm run sync:visual-contract se o meta mudou

VALIDAÇÃO: grep -n "white" packages/core/components/base/DssChip/**/*.scss →
zero ocorrências como valor de cor; SCSS compila; visual contract em sincronia.

═══════════════════════════════════════════════════════════════════
T4 — BRAND EM OVERLAYS TELEPORTADOS (B4)
═══════════════════════════════════════════════════════════════════
Contexto [A8]: DssDialog, DssBottomSheet e DssPopupEdit usam seletores
[data-brand] .dss-* mas o Quasar teleporta o conteúdo para <body>, fora do
container onde data-brand é aplicado hoje (divs internas no Storybook/sandbox).
O acento de brand falha silenciosamente em produção.

Estratégia (dupla, conforme orquestrador + A8):
a) NORMATIZAR: data-brand DEVE ser aplicado em document.body (ou html).
   Documentar essa regra no DSS_IMPLEMENTATION_GUIDE.md (seção de brandabilidade)
b) Criar composable useBrand() em packages/core/composables/ que:
   - leia o data-brand efetivo do contexto (body/html ou ancestral)
   - aplique-o programaticamente no elemento teleportado em onMounted
     (cobre apps que não seguirem a norma do item a)
c) Integrar o composable nos 3 componentes afetados (DssDialog, DssBottomSheet,
   DssPopupEdit). DssPopupProxy está imune (brand delegado aos filhos) — não tocar.
d) Ajustar o decorator do Storybook (preview.ts:8) e wrappers do sandbox para
   aplicar data-brand no body
e) Adicionar teste: dialog montado com data-brand="water" no body recebe o estilo
   de brand (asserção no DOM teleportado)

VALIDAÇÃO: teste novo passando; smoke test no sandbox com brand trocado
(dialog aberto deve refletir o acento de marca); build verde.

═══════════════════════════════════════════════════════════════════
T5 — DSSTABLE: FORWARDING DINÂMICO body-cell-* (B5)
═══════════════════════════════════════════════════════════════════
Contexto [A9/NC-A9-01]: README documenta #body-cell-actions mas o template
repassa apenas lista FIXA de slots — slot dinâmico é silenciosamente ignorado.
Ações por linha (caso de uso nº 1 de tabelas corporativas) não funcionam.

a) Implementar forwarding dinâmico de slots no DssTable.ts.vue usando o padrão
   JÁ EXISTENTE em DssTree.ts.vue:31-32 (iterar $slots e repassar ao QTable)
b) Garantir que slots nomeados existentes continuam funcionando (top, bottom, etc.)
c) Adicionar teste: slot body-cell-actions customizado renderiza conteúdo na célula

VALIDAÇÃO: teste novo passando; exemplo do README reproduzível no sandbox;
testes existentes do DssTable sem regressão.

═══════════════════════════════════════════════════════════════════
T6 — CORREÇÃO NORMATIVA: CSS SUPREMO, FIGMA REBAIXADO (decisão de governança)
═══════════════════════════════════════════════════════════════════
Contexto [A11-07 + decisão do mantenedor]: o DSS_REFERENCIA_VISUAL_ANALISE.md
contém resíduos da hierarquia ANTIGA que declaram o Figma como árbitro visual
supremo. A hierarquia vigente (Princípio #12 do CLAUDE.md) é:
CSS → meta.json → DSS_REFERENCIA_VISUAL_ANALISE.md. O Figma é apenas ferramenta
integrável via MCP, SEM autoridade normativa.

Ocorrências mapeadas (TODAS na região manual — o bloco AUTO-GENERATED começa
na linha ~1952 e NÃO deve ser tocado):
- Linha ~5 (nota de Autoridade): "Em caso de conflito com o Figma, o Figma
  prevalece (Princípio #12)" → reescrever: o CSS do componente prevalece
- Linha ~34 (tabela): linha "Árbitro visual | Figma (Princípio #12) | ... | Supremo"
  → Árbitro visual é o CSS do componente
- Seção 2.2 (~linhas 72-76) "Figma como Árbitro Visual" → reescrever a seção
  inteira: título "CSS como Fonte de Verdade Visual (Princípio #12)"; o
  defaultPreview reflete o CSS; em ambiguidade, consultar o CSS compilado;
  Figma é ferramenta opcional de consulta via MCP, sem precedência
- Linha ~1932 (passo de processo): "Consulte o Figma via MCP para confirmar
  dimensões e tokens" → "Consulte o CSS do componente (2-composition/_base.scss
  e camadas seguintes) para confirmar dimensões e tokens; o Figma pode ser
  consultado via MCP como apoio, sem autoridade decisória"
- Seção 5.4 (~linha 1946): hierarquia "1. Figma (supremo)" → reescrever a
  hierarquia: 1. CSS do componente (supremo) → 2. dss.meta.json (espelho
  documentado) → 3. DSS_REFERENCIA_VISUAL_ANALISE.md (derivado) → Figma fora
  da cadeia de autoridade (ferramenta MCP)

Depois da edição:
a) grep -in "supremo" e "figma" no documento para confirmar que nenhuma
   declaração de autoridade restou (menções ao Figma como FERRAMENTA são ok)
b) Verificar se DSS_DEFAULT_PREVIEW_WORKFLOW.md, DSS_IMPLEMENTATION_GUIDE.md ou
   outros docs de governança repetem a hierarquia antiga (grep -ril "figma"
   docs/) e corrigir no mesmo padrão
c) Rodar npm run sync:visual-contract e confirmar diff zero na região
   auto-gerada (a edição é só na região manual)

VALIDAÇÃO: zero declarações de autoridade do Figma em docs Nível 1 e 2;
região AUTO-GENERATED intocada; consistência com CLAUDE.md Princípio #12.

═══════════════════════════════════════════════════════════════════
T7 — DEMAIS BLOQUEANTES DA SEÇÃO 2 (ordem livre, todos obrigatórios)
═══════════════════════════════════════════════════════════════════
7.1 [A1 item 3] @import ativo em packages/core/ (25 .scss + 1 .vue + 17 SFCs):
    migrar TUDO para @use/@forward. Inclui resolver o GAP-03/NC-A5-01: decidir
    estratégia ÚNICA de carga de CSS (SFC-local OU index global — nunca ambos;
    recomendação A5: manter o @forward global e remover os @import dos SFCs).
    VALIDAÇÃO: grep -r "@import" packages/core/ --include="*.scss" --include="*.vue"
    | grep -v "_archive\|node_modules\|//" → zero; build sem deprecation warnings.

7.2 [A1 item 4] _quasar-overrides.scss: eliminar as 16 refs var(--quasar-*)
    (namespace inexistente), incluindo os 2 rgba(var(--quasar-primary), 0.1)
    inválidos (linhas ~79/90) → usar a bridge canônica --q-* / tokens --dss-*.
    VALIDAÇÃO: grep -c "quasar-" packages/core/themes/_quasar-overrides.scss
    (apenas --q-* permitidos).

7.3 [A3 item 8] DssAvatar: criar DssAvatar.example.vue (mín. 3 cenários);
    renomear orquestrador L4 para index.scss canônico; mover brands de
    3-variants/_brands.scss para 4-output/_brands.scss; tokenizar 64px/56px/768px
    ou documentar exceção aprovada; reconciliar meta (40px) × CSS (48px).

7.4 [Débito sistêmico A — itens 9+10] Barrel exports incompletos (~20 comps):
    correção EM LOTE — migrar barrels para index.ts (padrão validado em
    DssOptionGroup/DssFile/Timeline) exportando componente + types + composables.
    Afetados: 7 do A3 (Button, Badge, Radio, Avatar, Icon, Input, Tooltip),
    Slider/Range (A4), Layout/Header/Drawer (A5), 5 composed (A7),
    PopupEdit (A8), Table/Tree/Card (A9).
    VALIDAÇÃO: script/grep confirmando export de types em todos; build verde.

7.5 [A3 item 11] DssBadge: remover 4-output/DssBadge.scss órfão (import quebrado).

7.6 [A12 item 12] docs-portal index.css: eliminar o drift — substituir as 346
    declarações --dss-* manuais por importação do CSS de tokens do core (ou
    geração via script de sync). Corrigir também as duplicatas colaterais no
    globals.scss do core (linhas ~89-90, 129-130, 137-138).
    VALIDAÇÃO: grep -- "--dss-" apps/docs-portal/src/index.css → zero declarações
    manuais divergentes; portal builda e renderiza com a paleta do core.

═══════════════════════════════════════════════════════════════════
ENCERRAMENTO DA ONDA
═══════════════════════════════════════════════════════════════════
1. Rodar a bateria completa de validação:
   - npm run core:build (zero erros, zero warnings)
   - npm run docs:build (verde)
   - Suíte de testes dos componentes tocados
   - npm run sync:visual-contract (diff zero ou apenas mudanças intencionais)
   - Checklist "Ferramentas Complementares" do plano de auditoria
     (AUDITORIA_FINAL_PLANO_JUNHO_2026.md, seção homônima)
2. Produzir relatório de execução em
   docs/governance/audit-reports/ONDA_P0_RELATORIO_EXECUCAO.md com:
   tarefa × status × evidência (comando + saída) × arquivos tocados
3. NÃO emitir parecer de "pronto para migração" — isso é papel da reauditoria
   dirigida (somente os itens da Seção 2 do consolidado), que ocorre DEPOIS
   desta onda.

REGRAS INVIOLÁVEIS:
- CLAUDE.md é vinculante em tudo (Token First, @use, 4 camadas, wrapper puro)
- Nenhuma correção pode ser mascarada (ex.: silenciar warning sem resolver causa)
- Toda validação exige comando executado + saída real no relatório
- Commits incrementais por tarefa (T0..T7), mensagens descritivas
- Em dúvida entre simplificar ou explicitar: explicitar (Regra Final do CLAUDE.md)
```

---

## Justificativa da Ordem (racional do orquestrador, adaptado)

| Ordem | Tarefa | Racional |
|-------|--------|----------|
| T0 | Sanear HEAD | Sem build verde no commitado, nenhuma outra validação tem sentido |
| T1 | Tokens no dist | Bloqueante mais grave; todos os testes de artefato dependem dele |
| T2 | DssButton duplo | Golden Sample precisa estar correta antes de servir de referência |
| T3 | DssChip white | Golden Reference precisa estar conforme antes de servir de modelo |
| T4 | Brand teleport | Impacto de produto direto e visível ao usuário final |
| T5 | DssTable slots | Impacto funcional no caso de uso nº 1 de sistemas corporativos |
| T6 | CSS supremo (Figma rebaixado) | Decisão de governança do mantenedor: docs Nível 1 contraditórios confundem agentes executores — corrigir antes dos lotes |
| T7 | Demais bloqueantes + lotes | Fecham a Seção 2 do consolidado |

**Adaptação relevante vs. parecer original do orquestrador:** o orquestrador interpretou que CLAUDE.md e o Contrato Visual "dizem a mesma coisa" (ambos pró-Figma). Está incorreto — o Princípio #12 do CLAUDE.md já estabelece o **CSS como fonte de verdade** e nega explicitamente o papel de árbitro ao Figma. A contradição é unilateral: apenas o `DSS_REFERENCIA_VISUAL_ANALISE.md` (região manual, 6 ocorrências mapeadas) carrega o resíduo da hierarquia antiga. Por decisão do mantenedor (11/jun/2026), a correção foi elevada de alerta para item P0 (T6).

---

## Pós-Onda (fora do escopo do executor)

1. **Reauditoria dirigida** — novo agente auditando SOMENTE os itens da Seção 2 do consolidado
2. **Adendo/v2 do Production Readiness Laudo** (A11-08) — registrar Onda 8 e Onda P0
3. **Fase 4** — commit final + push GitLab
4. Os **69 alertas** da Seção 3 permanecem como backlog da primeira sprint pós-migração
