# HANDOFF — Higiene de `!important` (continuidade)

**Última atualização:** 23 de Junho de 2026
**Branch:** `import/dss-v2.4.0`
**Documento-mãe (ler primeiro):** [`PROMPT_DIRECIONADOR_HIGIENE_IMPORTANT.md`](./PROMPT_DIRECIONADOR_HIGIENE_IMPORTANT.md)
**Auditoria de origem:** [`audit-reports/AUDITORIA_IMPORTANT_HIGIENE_JUNHO_2026.md`](./audit-reports/AUDITORIA_IMPORTANT_HIGIENE_JUNHO_2026.md)

> Este documento é o **bastão** entre sessões. Descreve o que já foi executado, o que falta, o método de validação descoberto e as armadilhas do ambiente. Atualize-o ao fim de cada lote.

---

## 1. Placar

| Métrica | Valor |
|---|---|
| `!important` (declarações) em `packages/core` no início | **1025** |
| `!important` (declarações) agora | **557** |
| Removidos (T1 + T2a + T2b), com 0 regressão | **392** (290 + 54 + 48) |
| Restantes estimados como removíveis | ~149 (T3 ~43 · T4 ~106 dos 146) |

Comando de medição (declarações reais, robusto a comentários): `grep -rhoE "!important[;}]" packages/core --include="*.scss" | wc -l`

> ⚠️ O comando antigo (`grep -rc "!important"`) conta **linhas**, inflando o número
> com comentários `KEEP:`/explicativos que citam a palavra. Use a contagem de
> **declarações** (`!important[;}]`) como métrica canônica daqui em diante. O T2b
> adicionou ~14 linhas de comentário com a palavra → a métrica antiga marcaria 647,
> mas a remoção real de declarações foi **−48**.

---

## 2. Commits já feitos (nesta branch)

| Commit | Lote | Arquivos | Removidos |
|---|---|---|---|
| `c911678` | **T1** | `themes/_quasar-overrides.scss` (estrutural, seções 1–11) | 290 |
| `fc57e76` | **T2a** | `utils/_colors.scss` + `_quasar-overrides.scss` §12 (utilitárias puras) | 54 |
| `b9ec0cf` | **T2b** | `utils/_colors-hover.scss` (hover/active botão+badge) | 48 |

Cada `!important` mantido por motivo tem comentário `KEEP:` no código.

---

## 3. Checklist de execução

### ✅ Concluído
- [x] **T0 — Pré-requisito de segurança (bloqueante):** Quasar 100% em `@layer quasar` em todos os entry points (sandbox via `quasar-layered.css`; docs-portal é React puro sem Quasar). Regressão estática do Princípio #13 passou. **Premissa de remoção válida.**
- [x] **T1 — `_quasar-overrides.scss` seções 1–11 (estrutural):** 342→52. Validado **0 regressão** nos 88 componentes em estado default por 2 métodos independentes. 10 keepers documentados (`KEEP:`): opacity de disabled ×4, line-height `.q-item__label`, `.q-btn`{min-height,min-width,padding}, `.q-field__control`{min-height,border-radius}.
- [x] **T2a — utilitárias globais puras:** `_colors.scss` (25→0) + `_quasar-overrides.scss` §12 (-29). Validado por detector invertido (0 mudança).
- [x] **T2b — `_colors-hover.scss` (56→8, −48):** commit `b9ec0cf`. Removido o `!important` de hover/active de botão e badge; **mantidos 8** (`background` do hover de badge **outline/transparent**). Validado por **resolvedor de cascata layer-aware em CSSOM** (não o detector simples — ver §5) com 0 mudança de computed-style; diff normalizado idêntico ao HEAD (só `!important` tocado); `npx sass` OK. **Verdito por grupo:**
  - FILLED (`.bg-*`, 24): **inerte** — Quasar `.bg-X{…!important}` em `@layer quasar` vence qualquer unlayered (layered important > unlayered important) → remover não muda nada.
  - FLAT/OUTLINE (`.text-*`, 24): `background` vence por especificidade (0,5,0/0,3,0) sobre normais; `color` é dominada por `.text-X` layered do Quasar → ambos redundantes/inertes.
  - **KEEP (8):** `background` do hover de badge outline/transparent compete contra a base **unlayered** `.dss-badge--outline/--transparent{ background-color: transparent !important }` (DssBadge/3-variants). Ambos unlayered → sem `!important` a base venceria e o fill de hover sumiria. **Resolver no T3** (ao tratar o `!important` da base do badge, estes 8 viram redundantes).

### ⏳ Pendente
- [ ] **T2b/sobra — `_quasar-utilities.scss` (26):** **MISTO, não tratar como utilitária pura:**
  - `.dss-high-contrast` / `.dss-reduced-motion` → **A11Y, MANTER** (mesma natureza da seção 13).
  - `--quasar-*` custom-props de brand → pertencem ao **T4**, não ao T2.
  - Sobra pouca coisa de fato removível aqui.
- [ ] **T3 — `utils/_layout-helpers.scss` (18) + componentes `3-variants/` (25):** intra-DSS; substituir `!important` por especificidade (variante já vence base por ordem L2→L3).
- [ ] **T4 — `tokens/brand/index.scss` (~146):** custom-prop `!important` em `.dss-brand-*`; analisar ordem de carregamento vs `[data-brand=x]`. Custom-prop `!important` só importa quando há definição concorrente.
- [ ] **NÃO MEXER (manter, com motivo):** `4-output/` em `@media (forced-colors)`/`prefers-contrast` (~260, a11y WCAG); `_quasar-overrides` opacity/disabled (já keepers); blocos a11y de `_quasar-utilities.scss`.
- [ ] **Critério de conclusão:** placar na faixa-alvo, cada `!important` mantido documentado, `npx sass` compila, **sem regressão visual**.

---

## 4. Descobertas que refinam o áudit (LER antes de continuar)

1. **Mascaramento intra-DSS (o áudit não previu):** o `!important` do override não é só "redundante vs Quasar". Parte é **load-bearing intra-DSS** — mascarava o CSS dos próprios componentes (override unlayered+`!important` vence componente unlayered+normal). A teoria de cascata do prompt-mãe só cobre **DSS-vs-Quasar**; o confronto **override-vs-componente** só aparece no componente renderizado e foi a causa dos únicos keepers estruturais do T1.
2. **Regras mortas = remoção 100% segura:** `DssCard/DssBadge/DssChip/DssTooltip` **não emitem** `.q-card/.q-badge/.q-chip/.q-tooltip` (só citam em comentário). `DssBanner`/`DssMenu`/`DssDialog` **emitem** (`<QBanner>`/`<q-menu>`/`<q-dialog>`).
3. **Pseudo-estados são seguros vs Quasar:** o Quasar **não** usa `!important` em `:hover/:active/:focus`. Risco em pseudo-estado = só mascaramento intra-DSS (baixo, mesmos tokens).

---

## 5. Método de validação (REUTILIZÁVEL — sem recompile)

**Detector invertido CSSOM.** Com o CSS **original** carregado (todos os `!important` presentes), remove ao vivo o `!important` de cada regra do override e mede se o `getComputedStyle` muda em qualquer elemento renderizado. Mudança ⇒ declaração **load-bearing** (manter). Sem mudança ⇒ **redundante** (remover).

```js
() => {
  const isOverride = (sel) => /\.q-/.test(sel) && !sel.includes('.dss-'); // ajuste o filtro por lote
  const rules = [];
  for (const ss of document.styleSheets){ let rs; try{rs=ss.cssRules}catch(e){continue} if(!rs)continue;
    for (const r of rs) if (r.selectorText && r.style && isOverride(r.selectorText) && r.cssText.includes('--dss-')) rules.push(r); }
  const changes = {};
  for (const r of rules){
    let els; try{els=[...document.querySelectorAll(r.selectorText)]}catch(e){continue}
    if(!els.length) continue;
    for(let i=0;i<r.style.length;i++){
      const p=r.style[i]; if(r.style.getPropertyPriority(p)!=='important') continue;
      const val=r.style.getPropertyValue(p);
      const before=els.map(e=>getComputedStyle(e)[p]);
      r.style.setProperty(p,val,''); const after=els.map(e=>getComputedStyle(e)[p]); r.style.setProperty(p,val,'important');
      for(let k=0;k<els.length;k++){ const cls=(els[k].className+''); if(cls.includes('grid-inspector'))continue;
        if(before[k]!==after[k]){ const key=r.selectorText+' {'+p+'}'; if(!changes[key])changes[key]={withImp:before[k],noImp:after[k],el:cls.slice(0,45)}; } }
    }
  }
  return { rules: rules.length, changeCount: Object.keys(changes).length, changes };
}
```

- Rodar via chrome-devtools MCP (`evaluate_script`) na **Defaults Preview** (renderiza os 88 componentes em estado default).

> ⚠️ **LIÇÃO T2b — o detector simples acima é LAYER-BLIND.** Ele compara só
> especificidade+ordem e **ignora `@layer`**. Para qualquer lote que compita contra
> utilitárias `.bg-*`/`.text-*` do **Quasar** (que vivem em `@layer quasar` com
> `!important`), ele dá **falso positivo de mudança**: rankeia o `!important` unlayered
> do DSS acima do `!important` layered do Quasar — o inverso do FATO DE CASCATA. No T2b
> isso marcou erroneamente os FILLED como "load-bearing".
>
> **Método correto (usado e validado no T2b): resolvedor de cascata LAYER-AWARE + MEDIA-GUARDED.**
> Coleta recursiva das regras taggeando `layered` (recursão em `CSSLayerBlockRule`);
> respeita `@media` via `window.matchMedia(...).matches` (senão `@media print{…!important}`
> de `4-output/_states.scss` contamina como competidor falso); simula `:hover`/`:active`
> removendo só esses pseudos do `.matches()`; resolve o vencedor de `background-color`
> por **winScore** = important?(layered?5:4):(layered?2:3) → especificidade → ordem.
> Testa elementos **sintéticos** (`document.createElement` com as classes exatas de cada
> variante) — assim cobre flat/outline/badge-outline mesmo que a página não os renderize,
> e dispensa `:hover` real (que é instável: re-render + uid stale movem o ponteiro).
> Compara o vencedor **com** vs **sem** o `!important` da regra-alvo; valor igual ⇒ remover,
> diferente ⇒ KEEP. Script completo no histórico desta sessão (T2b).
- **Estados não-default** (campo disabled/erro, hover/active, menu/dialog/tooltip abertos) NÃO renderizam na Defaults Preview. As páginas "playground"/pattern (Login Forms, Atender) renderizam 0 `q-field` consultável. Para esses: usar o **hover-tool** do MCP (`:hover` real) + o detector, ou o **file-toggle** (original × editado) com DOM idêntico. **NÃO** injetar classe Quasar crua (`.q-field--error`) — dá artefato, pois os componentes usam estado próprio `.dss-*`.

---

## 6. Armadilhas do ambiente (WSL2 / `/mnt/c`)

- **Recompile do `index.scss` ≈ 2 min** por toggle de arquivo. **HMR/polling NÃO propaga** SCSS de forma confiável → subir um **dev server FRESH** (`npx vite --port 51xx --strictPort` em `apps/sandbox`) garante compile no startup; **matar ao terminar**. Pollar o fim do compile: `curl .../@fs/.../packages/core/index.scss`.
- **vitest unit é INVIÁVEL aqui:** workers de fork dão timeout (erro de infra, **não** de código); `--no-file-parallelism` trava sequencial >30 min. **Gate autoritativo para mudança CSS = `npx sass packages/core/index.scss /tmp/x.css`** (rápido). `!important` é CSS puro → não afeta testes de comportamento JS.
- **Servers stale:** podem existir vários `vite` antigos (5173/5174…) que servem CSS desatualizado. A navegação "back" do browser cai neles — **sempre navegar por URL explícita** do server fresh.
- **Grid Inspector** da sandbox injeta elementos próprios; **fechar** (botão "Close") antes de capturar baseline, e filtrar `grid-inspector` no detector.

---

## 7. Prompt pronto para o próximo chat executor

```
Você é o executor da continuidade da Higiene de !important do DSS. Estado e método estão
em docs/governance/HANDOFF_HIGIENE_IMPORTANT.md — LEIA-O PRIMEIRO, junto com o documento-mãe
docs/governance/PROMPT_DIRECIONADOR_HIGIENE_IMPORTANT.md e a seção "FATO DE CASCATA VINCULANTE".

Já feito (não refazer): T0 (verde), T1 (c911678, -290), T2a (fc57e76, -54), T2b (b9ec0cf, -48).
Placar: 1025 → 557 declarações de !important, 0 regressão.

Sua missão, em LOTES pequenos com validação antes de cada commit:
1. T3 — _layout-helpers.scss (18) + 3-variants/ (25): trocar !important por especificidade.
   INCLUI a base do badge `.dss-badge--outline/--transparent{ background-color: transparent !important }`
   — ao tratá-la, os 8 KEEP do T2b (_colors-hover.scss) também viram redundantes; revalidar e remover.
2. T4 — tokens/brand/index.scss (~146): analisar ordem .dss-brand-x vs [data-brand=x].
3. Sobra do T2: _quasar-utilities.scss (26) — MANTER blocos a11y (.dss-high-contrast/.dss-reduced-motion);
   custom-props de brand pertencem ao T4.

Regras de ouro:
- Validação por lote é OBRIGATÓRIA. Para lotes que tocam utilitárias .bg-*/.text- (Quasar layered),
  use o RESOLVEDOR LAYER-AWARE da §5 — NÃO o detector simples (que é layer-blind e dá falso positivo).
  Qualquer diferença de computed-style = reverter a linha e documentar como KEEP.
- Gate de build = `npx sass packages/core/index.scss` (NÃO depender do vitest — infra trava).
- Subir dev server FRESH para validar; matar ao terminar. Sempre navegar por URL explícita.
- Atualizar este HANDOFF e a memória project-important-audit ao fim de cada lote.
- NÃO mexer em 4-output/ @media forced-colors/prefers-contrast (a11y) nem nos keepers já marcados.
```

---

## 8. Artefatos de apoio
- Memória persistente: `project_important_audit.md` (regra de cascata, buckets, método, placar).
- Relacionados: `reference_quasar_layered_important`, `project_qfield_height_token_bug`.
