# HANDOFF — Higiene de `!important` (continuidade)

**Última atualização:** 22 de Junho de 2026
**Branch:** `import/dss-v2.4.0`
**Documento-mãe (ler primeiro):** [`PROMPT_DIRECIONADOR_HIGIENE_IMPORTANT.md`](./PROMPT_DIRECIONADOR_HIGIENE_IMPORTANT.md)
**Auditoria de origem:** [`audit-reports/AUDITORIA_IMPORTANT_HIGIENE_JUNHO_2026.md`](./audit-reports/AUDITORIA_IMPORTANT_HIGIENE_JUNHO_2026.md)

> Este documento é o **bastão** entre sessões. Descreve o que já foi executado, o que falta, o método de validação descoberto e as armadilhas do ambiente. Atualize-o ao fim de cada lote.

---

## 1. Placar

| Métrica | Valor |
|---|---|
| `!important` em `packages/core` no início | **1025** |
| `!important` agora | **681** |
| Removidos (T1 + T2a), com 0 regressão | **344** |
| Restantes estimados como removíveis | ~205 (T2b ~56 · T3 ~43 · T4 ~106 dos 146) |

Comando de medição: `grep -rc "!important" packages/core --include="*.scss" | awk -F: '{s+=$2} END{print s}'`

---

## 2. Commits já feitos (nesta branch)

| Commit | Lote | Arquivos | Removidos |
|---|---|---|---|
| `c911678` | **T1** | `themes/_quasar-overrides.scss` (estrutural, seções 1–11) | 290 |
| `fc57e76` | **T2a** | `utils/_colors.scss` + `_quasar-overrides.scss` §12 (utilitárias puras) | 54 |

Cada `!important` mantido por motivo tem comentário `KEEP:` no código.

---

## 3. Checklist de execução

### ✅ Concluído
- [x] **T0 — Pré-requisito de segurança (bloqueante):** Quasar 100% em `@layer quasar` em todos os entry points (sandbox via `quasar-layered.css`; docs-portal é React puro sem Quasar). Regressão estática do Princípio #13 passou. **Premissa de remoção válida.**
- [x] **T1 — `_quasar-overrides.scss` seções 1–11 (estrutural):** 342→52. Validado **0 regressão** nos 88 componentes em estado default por 2 métodos independentes. 10 keepers documentados (`KEEP:`): opacity de disabled ×4, line-height `.q-item__label`, `.q-btn`{min-height,min-width,padding}, `.q-field__control`{min-height,border-radius}.
- [x] **T2a — utilitárias globais puras:** `_colors.scss` (25→0) + `_quasar-overrides.scss` §12 (-29). Validado por detector invertido (0 mudança).

### ⏳ Pendente
- [ ] **T2b — `_colors-hover.scss` (56):** estados hover/active de botão/badge (`.dss-button:hover.bg-primary{…!important}`). **Análise de cascata = remoção segura** (a regra hover unlayered é inerte vs `.bg-primary!important` layered do Quasar, OU vence a base por especificidade 0,3,0 com/sem `!important`). **Falta:** confirmação empírica com `:hover` ativo (hover-tool + recompile) antes de aplicar.
- [ ] **T2b — `_quasar-utilities.scss` (26):** **MISTO, não tratar como utilitária pura:**
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

Já feito (não refazer): T0 (verde), T1 (commit c911678, -290), T2a (commit fc57e76, -54).
Placar: 1025 → 681 !important, 0 regressão.

Sua missão, em LOTES pequenos com validação antes de cada commit:
1. T2b — _colors-hover.scss (56): aplicar remoção (cascata já indica seguro), CONFIRMANDO com
   :hover real via hover-tool + detector invertido. _quasar-utilities.scss: MANTER os blocos
   a11y (.dss-high-contrast/.dss-reduced-motion) e deixar as custom-props de brand para o T4.
2. T3 — _layout-helpers.scss (18) + 3-variants/ (25): trocar !important por especificidade.
3. T4 — tokens/brand/index.scss (~146): analisar ordem .dss-brand-x vs [data-brand=x].

Regras de ouro:
- Validação por lote é OBRIGATÓRIA (detector invertido CSSOM sem recompile; ou file-toggle com
  DOM idêntico). Qualquer diferença de computed-style = reverter a linha e documentar como KEEP.
- Gate de build = `npx sass packages/core/index.scss` (NÃO depender do vitest — infra trava).
- Subir dev server FRESH para validar; matar ao terminar. Sempre navegar por URL explícita.
- Atualizar este HANDOFF e a memória project-important-audit ao fim de cada lote.
- NÃO mexer em 4-output/ @media forced-colors/prefers-contrast (a11y) nem nos keepers já marcados.
```

---

## 8. Artefatos de apoio
- Memória persistente: `project_important_audit.md` (regra de cascata, buckets, método, placar).
- Relacionados: `reference_quasar_layered_important`, `project_qfield_height_token_bug`.
