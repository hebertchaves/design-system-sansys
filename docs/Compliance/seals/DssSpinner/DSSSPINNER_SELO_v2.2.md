# SELO DSS v2.2 — DssSpinner

**Data de emissão**: 2026-03-24
**Versão DSS**: 2.2.0
**Componente**: DssSpinner
**Status**: CONFORMANT

---

## Declaração de Conformidade

O componente `DssSpinner` foi auditado formalmente e está em conformidade com as normas do **Design System Sansys (DSS) v2.2**.

Este selo é emitido após a resolução de todas as Não-Conformidades (NCs) identificadas no ciclo de auditoria.

---

## Classificação

| Atributo | Valor |
|----------|-------|
| **Categoria** | Feedback de Status — indicador de carregamento |
| **Fase** | 1 |
| **Interatividade** | Não interativo (Opção B) |
| **Golden Reference** | DssBadge (não interativo — designação normativa global) |
| **Golden Context** | DssIcon (selado 2026-02-13 — baseline de auditoria) |

---

## Ciclos de Auditoria

### Ciclo 1 — Auditoria Arquitetural e de Tokens

| Etapa | Data | Resultado |
|-------|------|-----------|
| Auditoria inicial | 2026-03-24 | 2 NCs + 4 GAPs identificados |
| Correções aplicadas | 2026-03-24 | 2 NCs resolvidas, 4 GAPs resolvidos |
| Auditoria final | 2026-03-24 | 0 NCs pendentes |
| **Emissão do Selo** | **2026-03-24** | **CONFORMANT** |

### Ciclo 2 — QA Pós-Selo (Auditoria de Metadados e Governança)

| Etapa | Data | Resultado |
|-------|------|-----------|
| Auditoria QA | 2026-03-24 | 2 NCs + 5 GAPs identificados |
| Correções aplicadas | 2026-03-24 | 2 NCs resolvidas, 5 GAPs resolvidos |
| **Confirmação de Conformidade** | **2026-03-24** | **CONFORMANT** (mantido) |

---

## Não-Conformidades Resolvidas

### NC-01 — Paridade de Brand Dark (Arquitetural)

**Descrição**: O bloco `[data-theme="dark"]` com overrides de brand estava em `4-output/_brands.scss`, violando a ordem canônica DSS que exige dark mode em `4-output/_states.scss`. O comentário na linha 14 de `_brands.scss` declarava falsamente que os tokens dark eram "gerenciados no _states.scss".

**Impacto**: Paridade arquitetural quebrada com Golden Reference DssIcon. O `_states.scss` continha um bloco `[data-theme="dark"]` vazio (GAP-02 — resolvido automaticamente por esta NC).

**Correção aplicada**:
- Bloco `[data-theme="dark"]` com overrides de brand movido de `4-output/_brands.scss` → `4-output/_states.scss`
- Comentário falso ("gerenciados no _states.scss") removido de `_brands.scss`
- Bloco vazio em `_states.scss` preenchido com os overrides reais

**Arquivos modificados**: `4-output/_brands.scss`, `4-output/_states.scss`

---

### NC-02 — Contagem de Tokens Inconsistente (Documental)

**Descrição**: Os cabeçalhos de `DssSpinner.module.scss` e `2-composition/_base.scss` declaravam "15 tokens" quando o componente efetivamente utiliza 18 tokens (os 3 tokens dark de brand — `--dss-hub-500`, `--dss-water-400`, `--dss-waste-500` — estavam ausentes da contagem).

**Impacto**: Documentação técnica interna inconsistente com a realidade do sistema. Potencial confusão para auditorias futuras.

**Correção aplicada**:
- `DssSpinner.module.scss`: "15 tokens" → "18 tokens"
- `2-composition/_base.scss`: "15 tokens" → "18 tokens"
- `2-composition/_base.scss`: linha Brand expandida para incluir os 3 tokens dark

**Arquivos modificados**: `DssSpinner.module.scss`, `2-composition/_base.scss`

---

## GAPs Resolvidos

### GAP-01 — Limitação `aria-hidden` (Documental)

**Descrição**: Ausência de documentação sobre a limitação de propagação do `aria-hidden="true"` nos QSpinner* internos.

**Correção**: Seção "Comportamentos Implícitos" adicionada em `DSSSPINNER_API.md` documentando a dependência do `inheritAttrs` interno de cada variante e o caráter de limitação conhecida (não-bloqueante para acessibilidade, pois o sr-only permanece funcional).

---

### GAP-02 — Bloco Vazio em `_states.scss` (Arquitetural)

**Descrição**: O `[data-theme="dark"]` em `_states.scss` continha apenas comentários sem regras CSS reais, apontando erroneamente para `_brands.scss`.

**Correção**: Resolvido automaticamente junto com NC-01. O bloco agora contém os overrides reais de brand dark.

---

### GAP-03 — Anti-Pattern `prefers-reduced-motion` (Documental)

**Descrição**: A seção de Anti-Patterns do `DssSpinner.md` não documentava o risco de ausência de feedback alternativo para usuários com `prefers-reduced-motion: reduce`.

**Correção**: Anti-Pattern 5 adicionado em `DssSpinner.md`, documentando que o DssSpinner deve sempre ser acompanhado de texto ou feedback visual estático em contextos onde usuários com preferência de movimento reduzido precisam identificar o estado de carregamento.

---

### GAP-04 — Guard `ariaLabel` Vazio (Documental)

**Descrição**: Ausência de documentação sobre o anti-pattern de passar `:ariaLabel="''"` (string vazia).

**Correção**: Nota adicionada em `DSSSPINNER_API.md` na seção "Comportamentos Implícitos" informando que string vazia produz região de status sem rótulo para screen readers, com exemplo de uso correto.

---

---

## Não-Conformidades — Ciclo 2 (QA Pós-Selo)

### NC-C2-01 — `goldenReference` incorreto nos metadados (Governança)

**Descrição**: `dss.meta.json` declarava `"goldenReference": "DssIcon"` e `DssSpinner.md §2` intitulava "Golden Reference: DssIcon". Por definição normativa (`DSS_GOLDEN_COMPONENTS.md §1.1`, `CLAUDE.md §9`), os únicos Golden References oficiais são DssChip e DssBadge. DssIcon é componente certificado — correto como Golden Context, incorreto como Golden Reference.

**Correção**:
- `dss.meta.json`: `"goldenReference": "DssBadge"`
- `DssSpinner.md §2`: renomeado para "Golden Context: DssIcon" + adicionada seção "Golden Reference: DssBadge (não interativo)"
- `DssSpinner.md §1`: referência a "DssIcon — Golden Reference" corrigida para "DssIcon — Golden Context"
- `README.md`: campo Golden Reference atualizado para DssBadge

**Arquivos modificados**: `dss.meta.json`, `DssSpinner.md`, `README.md`

---

### NC-C2-02 — `README.md` com status desatualizado (Documental)

**Descrição**: `README.md` exibia `**Status:** pending-audit` após a emissão do Selo no Ciclo 1.

**Correção**: `README.md` atualizado para `**Status:** Conformant — Selado 2026-03-24` e Golden Reference corrigido.

**Arquivos modificados**: `README.md`

---

## GAPs — Ciclo 2 (QA Pós-Selo)

### GAP-C2-01 — Comentário de `4-output/index.scss` impreciso após migração dark brands

**Correção**: Comentário atualizado para explicar que a cascata é garantida por **especificidade** (`[data-theme="dark"]` soma +1 ao selector weight: `(0,3,0)` vs `(0,2,0)`), não apenas pela ordem de importação.

### GAP-C2-02 — `prefers-contrast: more` sem documentação de placeholder

**Correção**: Bloco `prefers-contrast: more` em `_states.scss` recebeu comentário explícito declarando que é placeholder Fase 1 sem comportamento diferenciado em runtime, com instrução de re-introdução quando variantes com opacity forem criadas.

### GAP-C2-03 — Mecanismo `ariaLabel` prop vs atributo HTML não documentado

**Correção**: Seção "Mecanismo canônico" adicionada em `DssSpinner.md §6` e `DSSSPINNER_API.md` explicando diferença entre prop `ariaLabel` (→ sr-only span) e atributo `aria-label` (→ `$attrs` → root element), declarando o mecanismo de prop como canônico.

### GAP-C2-04 — DssSpinner ausente da cadeia de certificação em `DSS_GOLDEN_COMPONENTS.md`

**Correção**: `DSS_GOLDEN_COMPONENTS.md §1.2` (tabela de Golden Contexts) e `§3` (cadeia de certificação) atualizados para incluir DssSpinner como dependente de DssIcon/DssBadge.

### GAP-C2-05 — Seletores `forced-colors` com especificidade menor que demais blocos de brand

**Correção**: Seletores normalizados para forma compound `.dss-spinner--brand-x.dss-spinner` (especificidade `(0,2,0)`) em paridade com os seletores de `_brands.scss`.

---

## Reservas Registradas

| ID | Descrição | Impacto |
|----|-----------|---------|
| R-01 | Propagação de `aria-hidden` depende de `inheritAttrs` interno do QSpinner* — não controlável pelo DSS | Baixo — sr-only garante experiência acessível independentemente |
| R-02 | Tokens numéricos de brand (`--dss-hub-600`, etc.) usados por ausência de tokens semânticos `--dss-{brand}-primary` | Técnico — documentado como precedente DssIcon/DssCard |
| R-03 | Sem unit tests automatizados na Fase 1 | Aceitável por política DSS Fase 1 |

---

## Tokens Utilizados (18)

| Categoria | Tokens |
|-----------|--------|
| Dimensão | `--dss-icon-size-xs`, `--dss-icon-size-sm`, `--dss-icon-size-md`, `--dss-icon-size-lg`, `--dss-icon-size-xl` |
| Cor — actions | `--dss-action-primary`, `--dss-action-secondary` |
| Cor — texto | `--dss-text-secondary` |
| Cor — feedback | `--dss-feedback-error`, `--dss-feedback-success`, `--dss-feedback-warning`, `--dss-feedback-info` |
| Brand Hub | `--dss-hub-600` (claro), `--dss-hub-500` (dark) |
| Brand Water | `--dss-water-500` (claro), `--dss-water-400` (dark) |
| Brand Waste | `--dss-waste-600` (claro), `--dss-waste-500` (dark) |

---

## Exceções Documentadas (2)

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EX-01 | `1px`, `margin: -1px`, `clip: rect(0,0,0,0)` | `.dss-spinner__label` | Padrão sr-only. Não tokenizável. CLAUDE.md: "sr-only pattern: 1px values are acceptable". Precedente: DssInput, DssTextarea |
| EX-02 | `animation: none !important`, `transition: none !important` | `4-output/_states.scss` | Quasar aplica keyframes via CSS interno; `!important` obrigatório para WCAG 2.3.3. Precedente: DssIcon |

---

## Paridade com Golden Context (DssIcon)

O DssSpinner mantém paridade total com o DssIcon (Golden Context) em todos os critérios arquiteturais:
- Touch Target Opção B
- `color: inherit` / `currentColor`
- `pointer-events: none`
- `flex-shrink: 0`
- Tokens `--dss-icon-size-*`
- Padrão `_brands.scss` idêntico
- Dark mode brands em `_states.scss`
- `animation: none !important` em `prefers-reduced-motion`
- `color: ButtonText` em `forced-colors`

**Diferenças justificadas**: `role="status"` + `aria-live="polite"` (vs `role="img"` do DssIcon) devido à natureza de estado transitório do spinner; delegação de animações ao Quasar.

---

*Selo emitido pelo auditor DSS em 2026-03-24. Válido para a versão DSS 2.2.0.*
*Próxima revisão: mediante atualização de dependência Quasar ou criação de tokens semânticos de brand.*
