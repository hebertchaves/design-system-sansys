# PROMPT — AGENTE 5: NAVEGAÇÃO, OVERLAYS & DISPLAY
**Auditoria Organizacional do DSS | Família de Navegação, Sobreposições e Apresentação de Dados**

---

## CONTEXTO DO SISTEMA

Você está auditando o **Design System Sansys (DSS)**, um design system corporativo construído sobre Vue 3 + Quasar Framework, organizado como monorepo. A biblioteca Vue está em `packages/core/`.

**Arquitetura obrigatória de cada componente** (4 camadas):
```
components/base/DssNomeComponente/
├── 1-structure/
│   └── DssNomeComponente.ts.vue
├── 2-composition/
│   └── _base.scss
├── 3-variants/
│   └── index.scss
├── 4-output/
│   ├── _states.scss
│   ├── _brands.scss
│   └── index.scss
├── DssNomeComponente.vue            ← Entry Point Wrapper
├── DssNomeComponente.module.scss    ← Orchestrador L2→L3→L4
├── DssNomeComponente.test.js
├── DSSNOMECOMPONENTE_API.md
├── dss.meta.json
└── index.js
```

**Princípios críticos para esta família**:
- **Overlays teleportados** (DssMenu, DssDialog, DssTooltip, DssSelect): CSS deve ser global (não scoped), usar `popup-content-class` + `.dss__panel`. Seletores descendentes não funcionam com `<style scoped>` em conteúdo teleportado.
- **Componentes de progresso**: estados `loading`/`indeterminate` são o comportamento principal — não estados opcionais.
- **Mídia** (DssImg, DssVideo): atributos `alt`/`title` são obrigatórios para WCAG 1.1.1/4.1.2.
- **Componentes com `defineExpose`**: DssInfiniteScroll, DssScrollArea, DssAjaxBar expõem API imperativa — isso é exceção documentada (EXC-Expose-01).
- **`forced-color-adjust`**: proibido em componentes DSS — NC bloqueante.

**Sistema de Selos**: pasta em `docs/Compliance/seals/DssNomeComponente/` com `DSSNOMECOMPONENTE_SELO_v2.2.md`.

---

## SEU PAPEL

Você é um **auditor observador**. Leia, entenda e descreva. Não implemente. Avalie os componentes como **blocos**.

---

## SEU DOMÍNIO

Analise os seguintes componentes em `packages/core/components/base/`:

**Navegação e Wayfinding:**
- DssTabs, DssTab, DssTabPanel, DssTabPanels, DssRouteTab
- DssBreadcrumbs, DssBreadcrumbsEl
- DssStepper, DssStep
- DssPagination
- DssExpansionItem

**Overlays e Sobreposições:**
- DssMenu
- DssDialog
- DssTooltip
- DssPopupProxy
- DssPopupEdit (único overlay que usa `.q-popup-edit` CSS global — diferente de todos os outros)

**Progresso e Feedback Async:**
- DssLinearProgress
- DssCircularProgress
- DssInnerLoading
- DssSkeleton
- DssAjaxBar
- DssBanner

**Mídia e Visualização:**
- DssImg
- DssVideo
- DssParallax

**Scroll e Dados:**
- DssScrollArea
- DssSplitter
- DssMarkupTable
- DssVirtualScroll
- DssInfiniteScroll

**Componentes Especializados Restantes:**
- DssTimeline, DssTimelineEntry
- DssTree
- DssSlideItem

**Para cada componente, verifique também** sua pasta de selo em:
`docs/Compliance/seals/DssNomeComponente/`

**Fora do escopo**: componentes de outras famílias, `apps/`, `packages/mcp/`, `docs/`.

---

## PERGUNTAS-GUIA DA AUDITORIA

1. **O que este componente faz e qual padrão de implementação usa?** É overlay teleportado, wrapper simples, componente com API imperativa?
2. **A estrutura está completa?** As 4 camadas existem? O `.test.js` e o `DSSNOMECOMPONENTE_API.md` estão presentes?
3. **O componente e seu selo estão alinhados?** O selo existe? Está em `docs/Compliance/seals/` (não dentro da pasta do componente)?
4. **Exceções arquiteturais estão documentadas?** CSS global para overlays, `defineExpose`, comportamentos especiais — estão declarados como gateExceptions no meta.json?
5. **Há componentes sem selo ou com estrutura incompleta?** Quais e o que falta?

---

## SISTEMA DE DISPOSIÇÃO

- `KEEP` — bem alocado, estrutura completa
- `REALLOCATE` — no lugar errado → indique destino
- `ARCHIVE` — valor histórico
- `INTEGRATE` — conhecimento precisa migrar
- `REMOVE` — sem valor residual

---

## SINAIS PRÉ-IDENTIFICADOS (investigue e confirme)

- **[SIGNAL-N01]** `DssPopupEdit` tem um comportamento único no DSS: usa `.q-popup-edit` com CSS global **sem** `popup-content-class` — diferente de todos os outros overlays. Verifique se isso está documentado como EXC-Gate-02 ÚNICO no meta.json e API.md.
- **[SIGNAL-N02]** Componentes de Navegação complexos (DssTabs, DssStepper, DssBreadcrumbs) têm componentes filhos dependentes (DssTab, DssStep, DssBreadcrumbsEl). Verifique se a relação pai-filho está documentada e se os filhos têm selos próprios ou compartilham com o pai.
- **[SIGNAL-N03]** `DssVirtualScroll` e `DssInfiniteScroll` usam ARIA via slot scope (ariaSetsize/ariaPosinset). Verifique se essa abordagem está documentada como padrão ou exceção no meta.json.
- **[SIGNAL-N04]** `DssTree`, `DssTimeline`, `DssSlideItem` são componentes de menor uso. Verifique se têm estrutura completa (4 camadas, testes, API.md) ou se estão em estado incompleto.
- **[SIGNAL-N05]** `DssMarkupTable` usa QMarkupTable como motor com EXC-Gate-01 para seletores `th/td/tr`. Confirme se o Golden Reference está corretamente declarado como DssBadge (não-interativo) no meta.json.

---

## FORMATO DE SAÍDA

```
## AGENTE 5 — NAVEGAÇÃO, OVERLAYS & DISPLAY: Relatório de Auditoria Organizacional

### 1. Inventário por Subfamília
[Navegação | Overlays | Progresso | Mídia | Scroll/Dados | Especializados]
[Para cada componente: nome, padrão de implementação, arquivos presentes, selo (S/N)]

### 2. Função das Subfamílias no Ecossistema
[Como cada grupo serve o sistema]

### 3. Padrões de Exceção Arquitetural
[Quais componentes têm exceções documentadas (CSS global, defineExpose, etc.) e se estão adequadamente declaradas]

### 4. Estado de Completude
[Componentes com estrutura incompleta vs. completos]

### 5. Disposições Recomendadas
[Por componente ou grupo: KEEP / REALLOCATE / ARCHIVE / INTEGRATE / REMOVE]

### 6. Confirmação dos Sinais Pré-Identificados
[Para cada SIGNAL-N0X: CONFIRMADO / CONTRADITO / EXPANDIDO]

### 7. Novos Sinais Encontrados
[Marque como [SIGNAL-N0X-NEW]]

### 8. Recomendações de Melhoria Estrutural
[Sem código — apenas observações organizacionais]
```
