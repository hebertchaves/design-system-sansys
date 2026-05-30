# AGENTE 3 — INPUTS & CONTROLES: Relatório de Auditoria Organizacional

**Data:** 2026-05-29  
**Domínio:** `packages/core/components/base/` — Família Inputs & Controles  
**Versão:** 2.0 (reauditoria completa com exploração direta de arquivos)

---

## 1. Inventário por Componente

| Componente | Arquitetura Real | 4 Camadas | test.js | API.md | Selo | Status dss | index |
|---|---|---|---|---|---|---|---|
| DssInput | Custom — native `<input>` | ✅ | ❌ | ✅ | ✅ | approved | .js |
| DssTextarea | Wrapper QInput | ✅ | ❌ | ✅ | ✅ | conformant | .js |
| DssField | Custom — div root (SEM QField) | ✅ | ❌ | ✅ | ✅ | sealed | .js |
| DssSelect | Wrapper QSelect + popup-content-class | ✅ | ❌ | ✅ | ✅ | conformant | .js |
| DssCheckbox | Custom — native `<input type="checkbox">` | ✅ | ✅ | ✅ | ✅ | approved | .js |
| DssRadio | Custom — native `<input type="radio">` | ✅ | ❌ | ✅ | ✅ | approved | .js |
| DssToggle | Custom — native `<input type="checkbox" role="switch">` | ✅ | ✅ | ✅ | ✅ | sealed | .js |
| DssOptionGroup | Custom — orquestra DssRadio/DssCheckbox/DssToggle | ✅ | ❌ | ✅ | ✅ | sealed | **.ts** |
| DssSlider | Wrapper QSlider | ✅ | ❌ | ✅ | ✅ | conformant | .js |
| DssRange | Wrapper QRange | ✅ | ❌ | ✅ | ✅ | conformant | .js |
| DssKnob | QKnob como root (EXC-Gate-01) | ✅ | ❌ | ✅ | ✅ | compliant | .js |
| DssRating | QRating como root (EXC-Gate-01) | ✅ | ❌ | ✅ | ✅ | sealed | .js |
| DssFile | Wrapper QFile | ✅ | ❌ | ✅ | ✅ | conformant | **.ts** |
| DssPullToRefresh | QPullToRefresh como root (EXC-Gate-01) | ✅ | ✅ | ✅ | ✅ | sealed | **.ts** |

### Observações estruturais relevantes

- `DssInput/1-structure/` contém `DssInput.ts.vue` + `DssInput.vue.legacy` — arquivo de migração explícito (Options API → Composition API). A versão `.legacy` é idêntica ao `ts.vue` mas sem TypeScript. Nenhum outro componente da família tem arquivo `.legacy`.
- `DssSelect/2-composition/` contém `_panel.scss` adicional — único na família, justificado pelo painel teleportado via QMenu.
- `DssOptionGroup`, `DssFile`, `DssPullToRefresh` usam `index.ts` em vez de `index.js`. Os outros 11 usam `index.js` (padrão definido no CLAUDE.md).
- `DssInput`, `DssRadio`, `DssToggle` têm arquivos `*.module.css` compilados presentes no diretório — artefatos de build residuais (também presentes em DssButton e DssCard fora desta família).
- `DssInput` é o único da família com `DOCUMENTATION_CHANGELOG.md` — presente também em DssButton, DssAvatar e DssChip, os componentes mais maduros do sistema.

---

## 2. Função da Família no Ecossistema

Camada de coleta de dados do usuário. 14 componentes cobrem cinco subfamílias funcionais:

| Subfamília | Componentes | Característica arquitetural |
|---|---|---|
| **Texto livre** | DssInput, DssTextarea | DssInput é custom (native `<input>`); DssTextarea delega ao QInput renderizado como textarea |
| **Campo estrutural** | DssField | Único custom sem motor Quasar — container-estrutura para controles externos |
| **Seleção e escolha** | DssSelect, DssCheckbox, DssRadio, DssToggle, DssOptionGroup | DssSelect delega ao QSelect; os demais são custom com input nativo |
| **Faixa numérica** | DssSlider, DssRange, DssKnob, DssRating | DssSlider/DssRange delegam ao Quasar; DssKnob/DssRating usam o motor como root (SVG/icons) |
| **Casos especiais** | DssFile, DssPullToRefresh | DssFile delega ao QFile; DssPullToRefresh usa QPullToRefresh como root com WARN-A11Y-01 |

**Interdependência importante:** `DssOptionGroup` não delega ao `QOptionGroup` do Quasar. Em vez disso, itera sobre `options[]` e renderiza explicitamente instâncias de `DssRadio`, `DssCheckbox` ou `DssToggle` (via Entry Point Wrapper de cada um), garantindo 100% de fidelidade com a governança visual DSS desses componentes. Este é o único componente da família que cria dependências diretas para outros componentes da mesma família.

---

## 3. Padrão de Delegação ao Quasar

| Componente | Motor Quasar | Tipo de Integração | Exceção Documentada |
|---|---|---|---|
| DssInput | **Nenhum — native `<input>`** | Custom completo | Implícita (Golden Context de DssField) |
| DssTextarea | QInput | Wrapper via import explícito | — |
| DssField | **Nenhum — div root** | Custom completo | ✅ EXC-Gate-01 em `gateExceptions.templateStructure` |
| DssSelect | QSelect | Wrapper via auto-import Quasar + popup-content-class | ⚠️ documentado nos comentários do Vue, **ausente no meta.json** |
| DssCheckbox | **Nenhum — native `<input type="checkbox">`** | Custom completo | — (sem declaração de motor) |
| DssRadio | **Nenhum — native `<input type="radio">`** | Custom completo | — (sem declaração de motor) |
| DssToggle | **Nenhum — native `<input type="checkbox" role="switch">`** | Custom completo | — (sem declaração de motor) |
| DssOptionGroup | **Nenhum — orquestra DSS siblings** | Composição de componentes DSS | ✅ documentado no cabeçalho do ts.vue |
| DssSlider | QSlider | Wrapper via import explícito | — |
| DssRange | QRange | Wrapper via import explícito | — |
| DssKnob | QKnob | **Root (sem wrapper div)** | ✅ EXC-Gate-01 em `gateExceptions.templateStructure` |
| DssRating | QRating | **Root (sem wrapper div)** | ✅ EXC-Gate-01 em `gateExceptions.templateStructure` |
| DssFile | QFile | Wrapper via import explícito | — |
| DssPullToRefresh | QPullToRefresh | **Root** + `motor` declarado no meta.json | ✅ EXC-Gate-01/02 no código; `gateExceptions: {}` vazio no meta.json |

**Achado arquitetural crítico:** A família Inputs & Controles tem **duas arquiteturas distintas** para controles de interação:

1. **Custom com input nativo** (DssInput, DssCheckbox, DssRadio, DssToggle): nenhum componente Quasar é usado. O DSS reimplementa o controle com `<input>` nativo, ARIA completo, e CSS via 4 camadas. Esta escolha maximiza controle visual e acessibilidade ao custo de responsabilidade de manutenção.

2. **Wrapper Quasar** (DssTextarea, DssSelect, DssSlider, DssRange, DssFile): delega ao framework. O DSS gerencia apenas tokens e variantes visuais via SCSS.

Esta distinção **não está documentada como decisão arquitetural explícita** em nenhum documento de governança — é inferível apenas lendo o código.

---

## 4. Qualidade da Distribuição Estrutural

### 4.1 Consistente (100%)
- **4 camadas**: todos os 14 componentes têm `1-structure/`, `2-composition/`, `3-variants/`, `4-output/` completas
- **Entry Point Wrapper**: todos têm `DssNomeComponente.vue` como re-export puro para `1-structure/`
- **API.md**: todos têm (DssToggle nomeado `DSS_TOGGLE_API.md` — única variação de nomenclatura)
- **Selos**: todos os 14 têm selo em `docs/Compliance/seals/DssNomeComponente/`

### 4.2 Inconsistente

**test.js — 3/14 (21%)**

| Componente | test.js | Cobertura |
|---|---|---|
| DssCheckbox | ✅ | 466 linhas — Props, Model, States, ARIA, icons, toggleIndeterminate |
| DssToggle | ✅ | 503 linhas — Props, Model, States, ARIA, role="switch", array model |
| DssPullToRefresh | ✅ | 141 linhas — Renderização, props, eventos, slots, forwarding |
| Outros 11 | ❌ | Ausentes |

DssCheckbox e DssToggle têm cobertura exemplar. DssPullToRefresh tem cobertura mínima mas funcional. Os 11 restantes (incluindo DssInput e DssSelect, os mais complexos) não têm cobertura alguma — inconsistência direta com o CLAUDE.md que lista test.js como requisito bloqueante para selo.

**index.js vs index.ts — 3/14 usam `.ts`**
- `DssOptionGroup/index.ts`, `DssFile/index.ts`, `DssPullToRefresh/index.ts`
- Os outros 11 usam `index.js` (padrão documentado no CLAUDE.md)

**3-variants — três padrões diferentes**

| Padrão | Componentes | Variantes nomeadas |
|---|---|---|
| 4 variantes nomeadas | DssInput, DssTextarea, DssField, DssSelect, DssFile | `_borderless`, `_filled`, `_outlined`, `_standout` |
| 1 variante específica | DssOptionGroup | `_dense.scss` |
| Variante genérica | DssKnob, DssRating, DssPullToRefresh | `_variant.scss` (sem nome semântico) |
| Apenas `index.scss` | DssCheckbox, DssRadio, DssToggle, DssSlider, DssRange | Sem variantes visuais distintas |

**Schema de dss.meta.json — dois esquemas coexistentes**

| Schema | Campo de versão | Componentes |
|---|---|---|
| Schema A (antigo) | `version: "2.2"` | DssField, DssKnob, DssRating |
| Schema B (recente) | `dssVersion: "2.2"` ou `"2.2.0"` | DssInput, DssCheckbox, DssToggle, DssOptionGroup, DssSlider, DssPullToRefresh... |
| Schema C (anomalia) | `version: "1.0.0"` | **DssFile** — versão desatualizada |

**Status vocabulary — 4 valores distintos em uso**

| Status | Componentes |
|---|---|
| `sealed` | DssField, DssToggle, DssOptionGroup, DssRating, DssPullToRefresh |
| `conformant` | DssTextarea, DssSelect, DssSlider, DssRange, DssFile |
| `approved` | DssInput, DssCheckbox, DssRadio |
| `compliant` | DssKnob (**único na família** — provavelmente sinônimo de `conformant`) |

**Artefatos compilados (.module.css) presentes no diretório fonte**
- `DssInput/DssInput.module.css` (+ `.map`)
- `DssRadio/DssRadio.module.css`
- `DssToggle/DssToggle.module.css` (+ `.map`)
- Esses arquivos são output de compilação Sass/PostCSS — presença no diretório fonte indica ausência de `.gitignore` para outputs, ou build step que gera e não limpa.

---

## 5. Disposições Recomendadas

| Item | Disposição | Justificativa |
|---|---|---|
| Todos os 14 componentes (estrutura) | **KEEP** | 4 camadas completas, Entry Point Wrapper, API.md e selos presentes |
| `DssInput.vue.legacy` | **ARCHIVE** | Arquivo de migração Options API → Composition API. Remover após confirmar que nenhum consumer o referencia diretamente |
| `index.ts` em 3 componentes | **INTEGRATE** | Normalizar para `index.js` ou formalizar TypeScript como padrão de toda a família |
| `test.js` ausentes (11 componentes) | **INTEGRATE** | Requisito bloqueante no CLAUDE.md — criar cobertura mínima (prioridade: DssInput, DssSelect, DssRadio) |
| `DssFile/dss.meta.json` versão `1.0.0` | **INTEGRATE** | Atualizar para `"dssVersion": "2.2"` com schema B — única anomalia de versão na família |
| `DssKnob` status `compliant` | **INTEGRATE** | Normalizar para `conformant` ou `sealed` — `compliant` não é um status reconhecido no vocabulário DSS |
| `.module.css` artefatos | **REMOVE** | Outputs de compilação não devem estar no diretório fonte. Adicionar ao `.gitignore` |
| `DssSelect.gateExceptions: {}` | **INTEGRATE** | Formalizar EXC-Gate-02 no meta.json — a exceção existe (popup-content-class + _panel.scss global) mas não está no contrato de governança |
| `DssPullToRefresh.gateExceptions: {}` | **INTEGRATE** | EXC-Gate-01/02 declarados no código Vue não estão formalizados no meta.json |

---

## 6. Confirmação dos Sinais Pré-Identificados

### [SIGNAL-I01] `DssInput/1-structure/` contém apenas `.ts.vue` (sem `.vue`)

**CONFIRMADO e REFINADO.**

`DssInput/1-structure/` contém `DssInput.ts.vue` + `DssInput.vue.legacy`. O `.legacy` é arquivo de migração explícito (Options API anterior), não o padrão duplo `.vue` + `.ts.vue` presente em DssButton, DssBadge e DssAvatar.

**Refinamento importante:** DssInput é custom (native `<input>`), não um wrapper de QInput. O nome `DssInput` não reflete o motor — reflete a semântica. A ausência de `DssInput.vue` (sem sufixo) em `1-structure/` é consistente com todos os outros componentes desta família, que também têm apenas o `.ts.vue`.

**Acréscimo:** Apenas 3 componentes fora desta família (DssButton, DssBadge, DssAvatar) têm o padrão duplo `.vue` + `.ts.vue` em `1-structure/`. Esses são casos de transição explícita — não o padrão da família.

---

### [SIGNAL-I02] `DssField` custom sem QField

**CONFIRMADO e BEM DOCUMENTADO.**

`DssField` usa `<div>` como root (SEM QField). `gateExceptions.templateStructure` documenta `EXC-Gate-01` com justificativa e referência ao `DssInput como Golden Context`. Foco rastreado via `focusin/focusout` bubbling com `wrapper.contains(e.relatedTarget)` (linha 24 do ts.vue).

**Acréscimo:** DssField expõe slot scope com `{ fieldId, ariaDescribedby }` — garantia de acessibilidade via ARIA-describedby para controles internos. Esta é uma decisão arquitetural documentada no código mas não explícita no API.md desta auditoria.

---

### [SIGNAL-I03] `DssSelect` usa `popup-content-class`

**CONFIRMADO, gateExceptions VAZIO — risco ativo de governança.**

`DssSelect` injeta `.dss-select__panel` via `popup-content-class` no QMenu teleportado. A classe é construída dinamicamente com brand:
```
['dss-select__panel', 'dss-select__panel--brand-{brand}']
```
Existe arquivo dedicado `2-composition/_panel.scss` (único na família) com documentação detalhada sobre o mecanismo de teleportação.

**O problema:** `gateExceptions` no `dss.meta.json` é `{}` — exceção arquitetural real não está no contrato formal de governança. Documentação existe nos comentários Vue mas não é acessível via MCP tools (`mcp__dss__check_compliance`).

---

### [SIGNAL-I04] `DssPullToRefresh` acessibilidade de teclado

**CONFIRMADO e DOCUMENTADO.**

`accessibilityNotes.criticalWarning` no meta.json: *"O gesto de puxar não é acessível via teclado. Toda interface com DssPullToRefresh DEVE fornecer um botão de atualização alternativo."*

O campo `requiredAdjacent` (presente em outros componentes do sistema) **não está declarado** no meta.json de DssPullToRefresh — a necessidade de DssButton adjacente está no texto livre da warning, não como campo estruturado consultável via MCP.

**Acréscimo:** `gateExceptions: {}` está vazio apesar de o ts.vue declarar EXC-Gate-01 e EXC-Gate-02 nos comentários. Mesmo padrão do DssSelect — exceções documentadas no código mas não no contrato JSON.

---

## 7. Novos Sinais Encontrados

### [SIGNAL-I05-NEW] Arquitetura custom vs. wrapper não está documentada como decisão explícita

**5 dos 14 componentes** (DssInput, DssCheckbox, DssRadio, DssToggle, DssField) são implementações **completamente custom** que não delegam ao Quasar — usam `<input>` nativo. Outros 4 (DssOptionGroup em particular) têm arquitetura ainda mais distinta (composição de siblings DSS). Esta decisão arquitetural fundamental afeta manutenibilidade, cobertura de acessibilidade e aderência ao princípio "DSS como camada sobre Quasar".

Não há nenhum documento de governança que explique **por que** DssInput e DssCheckbox são custom (native input) enquanto DssTextarea e DssSlider delegam ao Quasar.

**Impacto:** Alto — novos desenvolvedores podem criar wrappers Quasar para componentes que intencionalmente não devem ser.

---

### [SIGNAL-I06-NEW] `DssSelect.gateExceptions: {}` e `DssPullToRefresh.gateExceptions: {}` — lacuna sistêmica

Dois dos três componentes com exceções arquiteturais reais (`popup-content-class` e `QPullToRefresh` como root) têm `gateExceptions: {}` no meta.json. Apenas `DssField`, `DssKnob` e `DssRating` têm gateExceptions formalizadas. `DssPullToRefresh` declara exceções nos comentários Vue mas não as formaliza no contrato JSON.

**Impacto:** `mcp__dss__check_compliance()` não detecta estas exceções — auditorias automáticas podem reportar falsos positivos.

---

### [SIGNAL-I07-NEW] Inconsistência `index.js` vs `index.ts`

`DssOptionGroup`, `DssFile`, `DssPullToRefresh` usam `index.ts`. Os outros 11 usam `index.js`. O CLAUDE.md define `index.js` como padrão obrigatório. A inconsistência é silenciosa — ambos funcionam no bundler, mas viola o padrão de governança.

---

### [SIGNAL-I08-NEW] `DssFile/dss.meta.json` com versão `1.0.0`

Único componente da família (e possivelmente de todo o sistema) com `version: "1.0.0"` em vez de `dssVersion: "2.2"`. Indica que o meta.json foi criado no formato antigo (Schema A com campo `version`) e a versão nunca foi atualizada para `2.2` durante a auditoria de Fase 1.

---

### [SIGNAL-I09-NEW] `DssKnob` com status `compliant` — vocabulário não padronizado

O status `compliant` é único na família e provavelmente em todo o sistema. O vocabulário oficial inclui `approved`, `conformant`, `sealed` e `pending-audit`. `compliant` parece ser um sinônimo de `conformant` mas não está documentado como status válido em nenhum documento de governança.

---

### [SIGNAL-I10-NEW] `DssToggle.API.md` tem nomenclatura diferente

O arquivo de API do DssToggle é `DSS_TOGGLE_API.md` (com separadores sublinhados, todo maiúsculo antes do API) enquanto o padrão dos outros 13 é `DssNomeComponente_API.md` com PascalCase no prefixo. Inconsistência menor mas visível em navegação por diretório.

---

### [SIGNAL-I11-NEW] Artefatos `.module.css` no diretório fonte

`DssInput/DssInput.module.css`, `DssRadio/DssRadio.module.css`, `DssToggle/DssToggle.module.css` são outputs compilados presentes no source. Também encontrados em DssButton e DssCard (fora desta família). Não devem estar versionados no repositório — indicam ausência de entrada `.gitignore` para `*.module.css` (diferente de `*.module.scss`, que é o arquivo fonte).

---

## 8. Recomendações de Melhoria Estrutural

**Alta prioridade:**

1. **Documentar a decisão arquitetural custom vs. wrapper** em `docs/reference/DSS_COMPONENT_ARCHITECTURE.md` — explicar por que alguns componentes de input são custom (native input) e outros delegam ao Quasar. Esta decisão afeta todo novo desenvolvimento de componentes de formulário.

2. **Criar test.js para os 11 componentes faltantes** — DssInput e DssSelect primeiro (os mais complexos e mais utilizados). DssCheckbox e DssToggle servem como Golden Context de cobertura.

3. **Formalizar gateExceptions de DssSelect e DssPullToRefresh** no respectivo `dss.meta.json` — sem isso, auditorias automáticas via MCP não detectam as exceções documentadas apenas no código.

**Média prioridade:**

4. **Normalizar `index.js` vs `index.ts`** — converter DssOptionGroup, DssFile e DssPullToRefresh para `index.js` ou declarar TypeScript como padrão obrigatório e migrar os outros 11.

5. **Atualizar `DssFile/dss.meta.json`** — versão `1.0.0` → `"dssVersion": "2.2"`, migrando para Schema B.

6. **Corrigir status `compliant` em DssKnob** — normalizar para `conformant` ou `sealed`.

**Baixa prioridade:**

7. **Arquivar `DssInput.vue.legacy`** após confirmar que nenhum consumer o importa diretamente. Mover para `docs/archive/` ou remover após validação.

8. **Adicionar `.module.css` ao `.gitignore`** — outputs compilados não devem ser versionados.

9. **Renomear `DSS_TOGGLE_API.md`** para `DssToggle_API.md` para consistência com a família.

10. **Adicionar campo `requiredAdjacent`** estruturado ao `DssPullToRefresh/dss.meta.json` — torna a necessidade de DssButton adjacente consultável via MCP em vez de apenas textual.
