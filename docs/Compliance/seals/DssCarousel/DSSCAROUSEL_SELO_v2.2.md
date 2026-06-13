# SELO DSS v2.2 — DssCarousel + DssCarouselSlide

## Resultado: ✅ APROVADO

**Data:** 2026-05-21
**Auditor:** Claude Code (Auditoria v2.5)
**Versão do componente:** 1.0.0
**Fase:** 2 — Nível 2 (Composição de Primeiro Grau)
**Golden Reference:** DssChip
**Golden Context:** DssBottomSheet

---

## Não-Conformidades (Não-Bloqueantes — Corrigidas)

| ID | Arquivo | Descrição | Status |
|----|---------|-----------|--------|
| NC-01 | `DssCarousel.test.js:1` | `vi` importado sem uso no arquivo de testes | ✅ Corrigida |
| NC-02 | `DssCarousel.example.vue:33,65,94,122` | `max-width: 500px` hardcoded (4 locais) — viola Token First | ✅ Corrigida |

## Gaps Registrados

| ID | Impacto | Fase | Descrição |
|----|---------|------|-----------|
| GAP-01 | Baixo | — | Pré-prompt não nomeava DssBottomSheet explicitamente como Golden Context |
| GAP-02 | Baixo | — | Pré-prompt listava tokens fantasmas (`--dss-text-hub`, `--dss-action-hub`, `--dss-action-hub-surface`) |
| GAP-03 | Alto | Fase 3 | WCAG 2.2.2 — autoplay sem botão de pausa (DssCarouselControl pendente) |
| GAP-04 | Alto | Fase 3 | `aria-live` region ausente para anúncio de mudança de slide |
| GAP-05 | Baixo | — | `example.vue` Cenário 4 usa `q-card`/`q-avatar` em vez de `DssCard`/`DssAvatar` |

## Exceções Aprovadas

| ID | Tipo | Justificativa |
|----|------|---------------|
| EXC-Gate-01 | Motor Quasar | QCarousel/QCarouselSlide são infraestrutura insubstituível |
| EXC-Gate-02a | CSS Custom Property | `--q-color-primary` override (padrão DssPagination/DssAjaxBar) |
| EXC-Gate-02b | Descendant Selector | Dots inativos sem CSS hook nativo no QCarousel |
| EXC-Gate-02c | Descendant Selector | `q-focus-helper` das setas de navegação |
| EXC-States-01 | Prefers-Reduced-Motion | Classes Vue `.q-transition--*` não respeitam prefers-reduced-motion nativamente |
| EXC-States-02 | Forced Colors | SystemColor keywords (ButtonText, Highlight) para controles |
| EX-Structural-01 | Valor Visual Não-Tokenizado | `opacity: 0.6` para thumbnails inativos (sem token DSS de opacidade) |
| EX-Structural-02 | Valor Estrutural Não-Tokenizado | `z-index: 1` para setas (sem token DSS de z-index) |

## Pontos de Conformidade Destacados

- Arquitetura 4 camadas completa
- Entry point wrappers `DssCarousel.vue` + `DssCarouselSlide.vue` — re-exports puros
- `defineOptions({ name, inheritAttrs: false })` — alinhado com Golden Context
- Token First no SCSS: nenhum valor hardcoded nas camadas 2, 3 e 4
- Brand dual-selector para hub/water/waste
- `role="region"` + `aria-label` (WAI-ARIA Carousel Pattern)
- `role="group"` nos slides (DssCarouselSlide)
- prefers-reduced-motion, forced-colors, prefers-contrast, print implementados
- 8 exceções documentadas no `dss.meta.json` com justificativas
- `DssCarousel.md` completo (Template 13.1) com paridade, composição, anti-patterns e 4 GAPs
- 21 testes cobrindo renderização, props, emits, slots, sub-componente, acessibilidade e forwarding
