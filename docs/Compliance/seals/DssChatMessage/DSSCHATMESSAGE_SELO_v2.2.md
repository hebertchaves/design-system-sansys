# SELO DSS v2.2 — DssChatMessage

## Resultado: ✅ APROVADO

**Data:** 2026-05-21
**Auditor:** Claude Code (Auditoria v2.5)
**Versão do componente:** 1.0.0
**Fase:** 2 — Nível 2 (Composição de Primeiro Grau)
**Família:** Conteúdo Rico
**Golden Reference:** DssChip
**Golden Context:** DssCarousel

---

## Não-Conformidades (Não-Bloqueantes — Corrigidas no Ciclo)

| ID | Arquivo | Descrição | Status |
|----|---------|-----------|--------|
| NC-01 | `DSSCHATMESSAGE_API.md:75` | `--dss-gray-300` documentado na tabela de tokens mas ausente em todos os arquivos SCSS | ✅ Corrigida |
| NC-02 | `4-output/_states.scss:81` | `opacity: 0.7` hardcoded no bloco `prefers-reduced-motion`. Token `--dss-opacity-70` existe e é usado no mesmo componente | ✅ Corrigida |
| NC-03 | `1-structure/DssChatMessage.ts.vue:77` | `withDefaults` com defaults triviais `false` para `isMine`, `compact`, `selected`, `disable`. Apenas `showAvatar: true` é não-trivial | ✅ Corrigida |

## Gaps Registrados

| ID | Impacto | Fase | Descrição |
|----|---------|------|-----------|
| GAP-01 | Baixo | ✅ Corrigido | `<time>` sem `datetime` — prop `datetimeValue?: string` adicionada; template usa `:datetime="datetimeValue"`. Documentado na API. |
| GAP-02 | Baixo | Aceito | `<img>` HTML nativo no slot de DssAvatar em vez de `DssImg`. Atenuado: DssAvatar é projetado para receber `<img>` em seu slot; `DssImg` serve imagens de conteúdo, não avatares. |
| GAP-03 | Baixo | ✅ Corrigido | Pré-prompt §4 com tokens fantasmas (`--dss-action-hub-surface`, `--dss-surface-water`, `--dss-text-default`, `--dss-action-water`). Seções 1, 4 e 8 reescritas com tokens reais e Golden Context declarado explicitamente. |
| GAP-04 | Baixo | ✅ Corrigido | `dss.meta.json` atualizado para `status: "sealed"` com `auditHistory` registrado. |

## Exceções Aprovadas

| ID | Tipo | Justificativa |
|----|------|---------------|
| EXC-Arch-01 | Sem Motor Quasar | `QChatMessage` é primitivo demais: texto como array de strings, ausência de slots ricos, sem status icons, sem estados de entrega/leitura. Implementação como HTML semântico customizado com `DssAvatar` + `DssIcon`. |
| EX-Structural-01 | Valor Estrutural Não-Tokenizado | `max-width: 75%` — constante geométrica de layout de bolha de chat. Convenção universal de interfaces de mensageria para evitar linhas excessivamente largas. Sem token DSS equivalente para `max-width` de componente. |

## Pontos de Conformidade Destacados

- Arquitetura 4 camadas completa (`components/composed/` — primeiro componente da família Conteúdo Rico)
- Entry Point Wrapper `DssChatMessage.vue` re-export puro
- `defineOptions({ name: 'DssChatMessage', inheritAttrs: false })` + `v-bind="$attrs"` no `<article>`
- `<article role="listitem">` + `aria-label` dinâmico composto (remetente + timestamp + status em PT-BR)
- `aria-hidden="true"` em avatar-area e meta (redundantes cobertos pelo aria-label)
- DssAvatar e DssIcon como subcomponentes DSS internos (Gate de Composição)
- Long press 500ms via `pointerdown`/`pointerup`/`pointermove`/`pointercancel` + `onBeforeUnmount` cleanup
- `filter: brightness(0.95/0.90)` com valores canônicos da tabela DSS
- `EX-Structural-01` comentado para `max-width: 75%`
- Brand dual-selector para hub/water/waste (contexto e prop): mine bubble primary + status--read
- `prefers-contrast: more` com border via token `--dss-border-width-thin`
- `forced-colors: active` com SystemColor keywords (Canvas, CanvasText, ButtonText, LinkText)
- `prefers-reduced-motion: reduce` para animação `sending`
- `-webkit-tap-highlight-color: transparent` (padrão DssChip)
- `focus-visible` com `--dss-focus-ring` + `--dss-border-width-md`
- `opacity: var(--dss-opacity-disabled)` + `pointer-events: none` no disable
- Touch target N/A documentado (container ≥ 48px de altura natural)
- `withDefaults` com único default não-trivial (`showAvatar: true`)
- 6 describe blocks de teste: base, props, eventos, slots, acessibilidade, forwarding
- Long-press test com `vi.useFakeTimers` + cancel test
- `dss.meta.json` completo com auditHistory registrado
- Template 13.1 completo com seção de paridade Golden Reference (DssChip)
