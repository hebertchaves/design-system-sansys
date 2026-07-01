# Selo Final de Conformidade DSS v2.2

**Componente:** DssChip
**Versao DSS:** v2.2
**Golden Component de Referencia:** N/A (DssChip E o Golden Component de referencia para Compact Controls interativos)
**Classificacao:** Compact Control interativo
**Data da Auditoria Final:** 27/01/2026
**Modo:** Auditor Final DSS — Selo de Conformidade

---

## Declaracao de Conformidade

Nenhuma nao-conformidade encontrada.

---

## Ressalvas

Nenhuma ressalva registrada.

---

## Tabela Final de Criterios

| Criterio | Status |
|----------|--------|
| Tokens | PASS |
| Touch Target | PASS |
| Arquitetura | PASS |
| Acessibilidade | PASS |
| Documentacao | PASS |

---

## Conformidades Confirmadas

### Tokens
- Uso de `--dss-compact-control-height-{xs,sm,md,lg}` para altura visual
- Touch target via `--dss-touch-target-min` (48px)
- Tokens de spacing: `--dss-spacing-1` a `--dss-spacing-4`
- Tokens de tipografia: `--dss-font-family-sans`, `--dss-font-size-{xs,sm,md}`
- Tokens de radius: `--dss-radius-sm`, `--dss-radius-full`
- Tokens de borda: `--dss-border-width-md`
- Tokens de opacidade: `--dss-opacity-disabled`, `--dss-opacity-hover`, `--dss-opacity-active`
- Tokens de motion: `--dss-duration-150`, `--dss-duration-200`, `--dss-easing-standard`
- Tokens de focus: `--dss-focus-ring`, `--dss-focus-ring-offset`
- Tokens de brand: `--dss-hub-*`, `--dss-water-*`, `--dss-waste-*`
- Nenhum token especifico de componente (`--dss-chip-*`)
- Valores de brightness canonicos: 0.85, 0.90, 0.92, 0.95 (light), 1.10, 1.20 (dark)

### Arquitetura
- 4 camadas presentes: `1-structure/`, `2-composition/`, `3-variants/`, `4-output/`
- Layer 3 com 3 variantes: filled, outline, flat
- Layer 4 com brands (Hub/Water/Waste) e states (hover, focus, active, disabled, selected)
- Module orchestrator presente (`DssChip.module.scss`)
- Barrel exports e composables organizados

### Acessibilidade
- WCAG 2.1 AA completo
- Touch target >= 48px via `::before` no root com `pointer-events: none`
- ARIA: `role="option"`, `aria-selected`, `aria-disabled`
- Remove button: `aria-label="Remover"` (customizavel via `removeAriaLabel`)
- Keyboard: Tab (foco), Enter/Space (acao), Delete (remover)
- `prefers-reduced-motion: reduce` respeitado
- `prefers-contrast: more` suportado
- `forced-colors: active` compativel com Windows High Contrast Mode

### Documentacao
- `DssChip.md` — Template 13.1 completo (904 linhas, 13 secoes)
- `DSSCHIP_API.md` — Referencia tecnica
- `README.md` — Quick reference
- `DssChip.example.vue` — Showcase visual
- `DssChip.test.js` — Testes unitarios
- `DOCUMENTATION_CHANGELOG.md` — Historico de alteracoes
- Excecoes documentadas com justificativas tecnicas
- API completa: 21 props, 3 eventos, 4 slots

### Estados
- default, hover, focus, active, selected, disabled: todos implementados
- Prioridade: disabled > selected > active > focus > hover > default
- Dark mode: brightness invertido (1.10 hover, 1.20 active)
- High contrast: saturacao aumentada

---

## Designacao Especial

O DssChip e designado como **Golden Compact Control (interativo)**, servindo como referencia normativa para:
- Uso dos tokens `--dss-compact-control-height-*`
- Implementacao de touch target (WCAG 2.5.5) via `::before`
- Convencao obrigatoria de pseudo-elementos (`::before` = touch target, `::after` = efeitos visuais)
- Documentacao de excecoes visuais (brightness, saturate)
- Implementacao de acessibilidade avancada (5 media queries)

**Componente pareado:** DssBadge (Golden Compact Control nao interativo)

---

## Status Final

**APROVADO — Selo DSS v2.2**

O componente **DssChip** esta em total conformidade com o Design System Sansys v2.2.

**Selo de Conformidade DSS v2.2 emitido em 27/01/2026.**

---

Este arquivo e um registro historico imexivel. Qualquer alteracao requer nova auditoria completa.

**Design System Sansys — Governanca DSS v2.2**

---

## Adendo — Migracao CCI v2.4.0 (16 Junho 2026)

> Adendo registrado sobre o selo v2.2 imutavel. Documenta a migracao de composicao de icone (Principio #14 / `DSS_ICON_COMPOSITION_CONTRACT.md`) aplicada na Fase 2. O selo v2.2 permanece valido; este adendo atualiza apenas os fatos afetados.

**Mudanca:** As quatro posicoes de icone (`icon`, `iconRight`, `iconSelected`, `iconRemove`) deixaram de renderizar glifo em `<span>` Material Icons cru e passaram a compor `<DssIcon inline decorative>` (CCI §3.1). Adicionados slots nomeados `#icon-left`/`#icon-right` com precedencia sobre a prop. API publica inalterada.

**Decisao de design (CCI §3.2, "use julgamento"):** **nao** foram expostos slots para `selected`/`remove` — sao marca visual de **comportamento** (estado de selecao / acao de remocao), nao pontos de extensao de conteudo arbitrario. Permanecem dirigidos por `iconSelected`/`iconRemove`, agora compostos via DssIcon.

**Fatos atualizados pela migracao:**
- "Subcomponentes DSS Utilizados: Nenhum" → **DssChip agora compoe `DssIcon`** (CCI §5 item 7).
- `font-family: 'Material Icons'` + `font-feature-settings` removidos de `2-composition/_base.scss` (CCI §3.4) — `grep "Material Icons" --include="*.scss"` retorna **zero**.
- Testes de glifo cru migrados para composicao (`dss-icon`, `.dss-icon__inner`) + cobertura dos slots novos.

**Papel Golden:** como **Golden Reference interativo**, o DssChip agora **modela a arquitetura** da composicao de icone via DssIcon — reimplementar glifo em `<span>` cru e anti-pattern proibido (Principio #14).

**Inalterado:** API publica, acessibilidade (WCAG 2.1 AA, `aria-hidden`, touch target via `::before`). `dss.meta.json` nao repontado — `defaultPreview` e label, sem icone (CCI §5 item 3 = N/A; `sync:visual-contract` = no-op). Gate CCI §5: `npx sass` OK, `npx vitest` 53/53, grep zero.

Ref.: `docs/governance/DSS_ICON_COMPOSITION_CONTRACT.md`
