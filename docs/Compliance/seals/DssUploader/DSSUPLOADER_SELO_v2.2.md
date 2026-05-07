# SELO DSS v2.2 — DssUploader

**Data de emissão**: 2026-05-07
**Versão DSS**: 2.2.0
**Componente**: DssUploader
**Status**: CONFORMANT

---

## Declaração de Conformidade

O componente `DssUploader` foi auditado formalmente e está em conformidade com as normas do **Design System Sansys (DSS) v2.2**.

Este selo é emitido após a resolução de todas as Não-Conformidades (NCs) identificadas no ciclo de auditoria.

---

## Classificação

| Atributo | Valor |
|----------|-------|
| **Categoria** | Upload / File Management — Composição de Primeiro Grau |
| **Fase** | 2 — Nível 2 (Composição de Primeiro Grau) |
| **Interatividade** | Não interativo em sua raiz (interatividade pertence aos filhos DssButton) |
| **Golden Reference** | DssBadge (não interativo — designação normativa global) |
| **Golden Context** | DssCard (container com borda, superfície e elevação — selado 12 Fev 2026) |
| **Dependências DSS Internas** | DssButton, DssIcon, DssLinearProgress |

---

## Ciclos de Auditoria

### Ciclo 1 — Auditoria Arquitetural e de Tokens

| Etapa | Data | Resultado |
|-------|------|-----------|
| Auditoria inicial | 2026-05-07 | 6 NCs + 4 GAPs identificados |
| Correções aplicadas | 2026-05-07 | 6 NCs resolvidas, 4 GAPs resolvidos |
| Auditoria final (MCP validate_component_code) | 2026-05-07 | 0 NCs pendentes |
| **Emissão do Selo** | **2026-05-07** | **CONFORMANT** |

---

## Não-Conformidades Resolvidas

### NC-01 — `forced-color-adjust: none` Proibido (Acessibilidade — Bloqueante)

**Descrição**: `4-output/_states.scss` continha `forced-color-adjust: none` dentro do bloco `@media (forced-colors: active)`. A propriedade `forced-color-adjust` é proibida pelo DSS em todos os contextos, conforme precedentes estabelecidos nas auditorias DssTextarea e DssBreadcrumbsEl.

**Impacto**: Windows High Contrast Mode comprometido — a propriedade suprime a substituição de cores pelo sistema operacional, quebrando a conformidade com WCAG 1.4.11 (Non-text Contrast) em modo de alto contraste.

**Correção aplicada**: `forced-color-adjust: none` removido de `4-output/_states.scss`. Os tokens de sistema HCM (`CanvasText`, `LinkText`, `Mark`) provêm adaptação correta sem necessidade de ajuste manual.

**Arquivos modificados**: `4-output/_states.scss`

---

### NC-02 — Campo `gateExceptions` Ausente em `dss.meta.json` (Composição v2.4 — Bloqueante)

**Descrição**: `dss.meta.json` registrava exceções estruturais (EXC-01, EXC-Gate-01, EXC-Gate-02) no array `exceptions`, mas o campo normativo `gateExceptions` exigido pelo Gate de Composição v2.4 Rule 1 estava ausente. O uso direto de `<q-uploader>` no template não estava formalmente justificado no campo correto.

**Impacto**: Auditores automáticos e humanos não conseguiam identificar que a exceção ao Gate de Composição v2.4 é intencional e arquitetural — o componente aparentava violar o gate sem justificativa registrada.

**Correção aplicada**: Campo `gateExceptions` adicionado ao `dss.meta.json` com justificativa: "DssUploader usa QUploader como motor de upload (XHR, validação, drag-and-drop). Não existe equivalente DSS para um motor de upload XHR. A UI é integralmente reconstruída via slots #header e #list obrigatórios, impedindo que QBtn, QIcon e QLinearProgress sejam renderizados."

**Arquivos modificados**: `dss.meta.json`

---

### NC-03 — Defaults Triviais em `withDefaults` (Arquitetural)

**Descrição**: `withDefaults` declarava 7 props booleanas com default `false` explícito: `multiple`, `autoUpload`, `batch`, `withCredentials`, `sendRaw`, `disable`, `readonly`. Em Vue 3 com TypeScript, props do tipo `Boolean` sem default declarado têm valor `false` implícito — declaração explícita viola o padrão DSS de omitir defaults desnecessários, conforme Golden Reference DssBadge e precedente DssLinearProgress (NC-01 daquele ciclo).

**Impacto**: Paridade arquitetural quebrada com Golden Reference DssBadge. Ruído semântico no `withDefaults` que pode induzir mantenedores a presumir que a declaração explícita tem semântica adicional.

**Correção aplicada**: 7 defaults triviais `false` removidos. `withDefaults` mantém apenas defaults não-triviais: `variant: 'elevated'`, `method: 'POST'` e as 4 strings de `ariaLabel`.

**Arquivos modificados**: `1-structure/DssUploader.ts.vue`

---

### NC-04 — Import `computed` Não Utilizado (Arquitetural)

**Descrição**: `import { ref, computed } from 'vue'` em `1-structure/DssUploader.ts.vue` — `computed` importado mas não utilizado no arquivo. O composable `useUploaderClasses` usa `computed` internamente; o arquivo principal não precisa do import.

**Impacto**: Import morto aumenta tamanho do bundle e pode induzir mantenedores a criar computed properties incorretamente no arquivo raiz em vez do composable dedicado.

**Correção aplicada**: Import reduzido para `import { ref } from 'vue'`.

**Arquivos modificados**: `1-structure/DssUploader.ts.vue`

---

### NC-05 — Anotações TypeScript Inválidas em Slot Scope (Arquitetural)

**Descrição**: Os slots `#header` e `#list` usavam sintaxe inválida no template Vue: `<template #header="(scope: QUploaderHeaderScope)">` e `<template #list="(scope: QUploaderListScope)">`. Anotações de tipo TypeScript em destructuring de slot scope não são suportadas pelo Vue template compiler — o Volar infere o tipo pelo contrato do componente sem anotação explícita.

**Impacto**: Erro de compilação potencial em builds de produção com Vite/vue-tsc. Falsa sensação de segurança de tipos que pode mascarar incompatibilidades de interface.

**Correção aplicada**: Anotações TypeScript removidas. Slots corrigidos para: `<template #header="scope">` e `<template #list="scope">`.

**Arquivos modificados**: `1-structure/DssUploader.ts.vue`

---

### NC-06 — `1px` Hardcoded no Bloco `forced-colors` (Token First)

**Descrição**: Duas ocorrências de `border-bottom: 1px solid CanvasText` no bloco `@media (forced-colors: active)` de `4-output/_states.scss` violavam o princípio Token First. O valor `1px` deve ser expresso como `var(--dss-border-width-thin)`.

**Impacto**: Se o token `--dss-border-width-thin` for atualizado globalmente, as bordas de separação no modo HCM não refletirão a mudança, criando inconsistência visual em contexto de acessibilidade crítica.

**Correção aplicada**: `1px` substituído por `var(--dss-border-width-thin)` nas duas ocorrências (`&__header` e `&__file-item`).

**Arquivos modificados**: `4-output/_states.scss`

---

## GAPs Resolvidos

### GAP-01 — Arquivo de Pré-Prompt Ausente (Documental)

**Descrição**: Componente implementado sem pré-prompt de governança registrado em `docs/governance/pre-prompts/`. Componentes Fase 2 exigem pré-prompt versionado para rastreabilidade arquitetural e reprodutibilidade de criação.

**Correção**: `pre_prompt_dss_uploader.md` criado em `DSS/docs/governance/pre-prompts/` com 10 seções normativas: Classificação, Restrição Arquitetural Fundamental (EXC-01), Gates v2.4, API, Tokens, Variantes, Acessibilidade, Estados, Playground e Histórico de Versões.

**Arquivos criados**: `docs/governance/pre-prompts/pre_prompt_dss_uploader.md`

---

### GAP-02 — Subseção "Exceções aos Gates v2.4" Ausente em `DssUploader.md §10` (Documental)

**Descrição**: A seção §10 de Exceções Registradas listava EXC-01, EXC-Gate-01 e EXC-Gate-02 em formato genérico, mas não incluía a subseção formal de exceções de gate exigida por `DSS_CRITERIOS_AVALIACAO_FASE2.md §3`.

**Correção**: Subseção "Exceções aos Gates v2.4" adicionada ao §10 com tabela formal declarando a exceção ao Gate de Composição v2.4 Rule 1 para o uso de `<q-uploader>` e sua justificativa arquitetural.

**Arquivos modificados**: `DssUploader.md`

---

### GAP-03 — Cast `as any` Não Documentado como Exceção Técnica (Documental)

**Descrição**: `(qUploaderRef.value as any)?.pickFiles?.()` em `defineExpose` usava cast TypeScript não seguro sem registro formal de exceção. `QUploader.pickFiles()` existe na API oficial Quasar mas não está incluída nas definições de tipo do pacote `quasar`.

**Correção**: `EXC-TS-01` documentado em `dss.meta.json` com justificativa e orientação: "Manter monitorado para atualização de tipos Quasar." `EXC-TS-01` também incluído na tabela de Exceções de `DssUploader.md §10`.

**Arquivos modificados**: `dss.meta.json`, `DssUploader.md`

---

### GAP-04 — Guard `isUploading` Ausente no Botão de Upload (Funcional)

**Descrição**: O botão de upload usava `v-if="!autoUpload && scope.canUpload && !readonly"` sem verificar `scope.isUploading`. Em condições de race condition, o botão podia reaparecer durante upload ativo, permitindo duplo-envio.

**Correção**: Condição corrigida para `v-if="!autoUpload && scope.canUpload && !scope.isUploading && !readonly"`.

**Arquivos modificados**: `1-structure/DssUploader.ts.vue`

---

## Reservas Registradas

| ID | Descrição | Impacto |
|----|-----------|---------|
| R-01 | Tokens numéricos de brand (`--dss-hub-600`, `--dss-water-500`, `--dss-waste-600`) usados por ausência de tokens semânticos `--dss-{brand}-border-focus` | Técnico — precedente DssCard/DssLinearProgress/DssBadge; documentado |
| R-02 | Cast `as any` para `pickFiles` deve ser monitorado a cada atualização do pacote `quasar` | Baixo — documentado em EXC-TS-01; risco controlado via documentação |
| R-03 | CSS `:has()` (EXC-Gate-02) tem Baseline 2023 — browsers anteriores a 2023 não detectam o drag state visual | Aceitável — política DSS admite browsers modernos; comportamento degrada graciosamente (funcionalidade de upload intacta, apenas ausência do feedback visual de drag) |
| R-04 | Sem unit tests automatizados na Fase 2 | Aceitável por política DSS Fase 2 |

---

## Conformidades

| Pilar | Critério Avaliado | Resultado |
|-------|-------------------|-----------|
| **Tokens** | Zero valores hardcoded em L2, L3 e L4; 34 tokens DSS utilizados; `--dss-spacing-px` para sr-only; `--dss-border-width-thin` para HCM | CONFORME |
| **Touch Target** | N/A — root não interativo. Interatividade pertence aos filhos DssButton, que possuem touch target próprio. Opção B aplicada conforme designação normativa DssBadge (Golden Reference) | CONFORME |
| **Arquitetura** | Gate Estrutural DSS satisfeito: 4 camadas completas (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`); orquestrador SCSS importa L2→L3→L4 na ordem canônica; Entry Point Wrapper `DssUploader.vue` é re-export puro sem `<template>`, `<style>` ou lógica própria; `index.js` exporta componente, composable e todos os tipos; `gateExceptions` registrado em `dss.meta.json` | CONFORME |
| **Estados** | `disabled` (opacity + pointer-events), `readonly` (v-if nos botões de ação), `drag-active` (CSS `:has(.q-uploader--dnd)`), `uploading`/`uploaded`/`failed` por arquivo via DssLinearProgress/DssIcon; estados não aplicáveis ao root (`hover`, `focus`, `active`, `loading`) documentados explicitamente com justificativa | CONFORME |
| **Acessibilidade** | WCAG 2.1 AA: `role="toolbar"` + `aria-label` dinâmico no header; `role="list"` + contagem na lista; `role="status" aria-live="polite"` com `requestAnimationFrame` double-update; ícones decorativos com `decorative="true"` (aria-hidden); ícones de status com `aria-label` descritivo; `prefers-contrast: more` (não `high`); `prefers-reduced-motion`; forced-colors com `CanvasText`/`LinkText`/`Mark` sem `forced-color-adjust` | CONFORME |
| **Documentação** | Template 13.1 completo (12 seções); `DSSUPLOADER_API.md` com 24 props, 6 eventos, Expose, tabela completa de tokens; 5 cenários no playground com factory simulation; pré-prompt versionado; `dss.meta.json` com `gateExceptions`, `auditHistory` e 4 exceções documentadas | CONFORME |

---

## Tokens Utilizados (34)

| Categoria | Tokens |
|-----------|--------|
| Superfície | `--dss-surface-default`, `--dss-surface-hover`, `--dss-surface-muted` |
| Forma | `--dss-radius-lg` |
| Borda | `--dss-border-width-thin`, `--dss-border-width-md`, `--dss-border-focus` |
| Espaçamento | `--dss-padding-2`, `--dss-padding-4`, `--dss-padding-8`, `--dss-grid-gap-sm`, `--dss-spacing-20`, `--dss-spacing-px` |
| Tipografia | `--dss-font-size-xs`, `--dss-font-size-sm`, `--dss-font-weight-normal` |
| Cor — Neutros | `--dss-gray-100`, `--dss-gray-300`, `--dss-gray-400`, `--dss-gray-500`, `--dss-gray-600`, `--dss-gray-800` |
| Cor — Feedback | `--dss-feedback-success`, `--dss-feedback-error` |
| Elevação | `--dss-elevation-1`, `--dss-shadow-sm` |
| Brand Hub | `--dss-shadow-hub-sm`, `--dss-hub-600` |
| Brand Water | `--dss-shadow-water-sm`, `--dss-water-500` |
| Brand Waste | `--dss-shadow-waste-sm`, `--dss-waste-600` |
| Opacidade | `--dss-opacity-disabled` |
| Transição | `--dss-duration-150`, `--dss-duration-200`, `--dss-easing-standard` |

---

## Exceções Documentadas (4)

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | Sobrescrita obrigatória dos slots `#header` e `#list` do QUploader | `1-structure/DssUploader.ts.vue` | Gate de Composição v2.4 — impede que `QBtn`, `QIcon` e `QLinearProgress` nativos sejam renderizados no DOM final. Motor de upload delegado ao Quasar; UI reconstruída integralmente via componentes DSS. |
| EXC-Gate-01 | Seletores `.q-uploader`, `.q-uploader__header`, `.q-uploader__list`, `.q-uploader__dnd` com `!important` | `2-composition/_base.scss` | QUploader aplica estilos inline via JS que sobrescrevem tokens DSS. `!important` em `border`, `box-shadow` e `background-color` é necessário para que o container DSS controle 100% da aparência visual. |
| EXC-Gate-02 | `:has(.q-uploader--dnd)` | `3-variants/_variant.scss`, `4-output/_brands.scss` | QUploader aplica `.q-uploader--dnd` ao seu elemento raiz interno. CSS `:has()` detecta o estado de drag no container pai sem lógica JS adicional. Suporte: Baseline 2023. |
| EXC-TS-01 | `(qUploaderRef.value as any)?.pickFiles?.()` | `1-structure/DssUploader.ts.vue` — `defineExpose` | `QUploader.pickFiles()` existe na API oficial Quasar mas não está incluída nas definições de tipo do pacote `quasar`. Cast `as any` com optional chaining (`?.`) garante segurança em runtime. Monitorar para atualização de tipos Quasar. |

---

## Paridade com Golden Context (DssCard)

O DssUploader mantém paridade com o DssCard (Golden Context) nos seguintes critérios arquiteturais:

| Aspecto | DssCard | DssUploader | Igual |
|---------|---------|-------------|-------|
| Variantes (`elevated`, `outline`) | ✅ | ✅ (`+ subtle`) | ✅ (extensão justificada) |
| `border-radius: --dss-radius-lg` | ✅ | ✅ | ✅ |
| Brand via `[data-brand]` cascade | ✅ | ✅ | ✅ |
| Sem hover/active no root | ✅ | ✅ | ✅ |
| Sombra `--dss-elevation-1` (elevated) | ✅ | ✅ | ✅ |
| `overflow: hidden` | ✅ | ✅ | ✅ |
| `defineOptions` + `inheritAttrs: false` | ✅ | ✅ | ✅ |
| `v-bind="$attrs"` no root div | ✅ | ✅ | ✅ |
| Dark mode via `[data-theme="dark"]` | ✅ | ✅ | ✅ |
| `forced-colors` com system colors | ✅ | ✅ | ✅ |

**Diferenças justificadas**:

- **Variante `subtle`**: DssUploader adiciona `subtle` ao repertório de DssCard. Justificativa: interfaces de upload frequentemente são exibidas em contextos de formulário onde a variante sem elevação e com fundo muted integra-se visualmente ao restante do form.
- **Drag state**: DssUploader adiciona estado de drag-active via CSS `:has()` — não aplicável a DssCard (que não é zona de drop).
- **Slots internos**: DssUploader reconstrói UI via slots `#header` e `#list` do QUploader; DssCard expõe slots públicos ao consumidor. Diferença arquitetural justificada pela natureza composta do DssUploader e pelo Gate de Composição v2.4 (EXC-01).

---

**Caminho canônico do arquivo**:
`DSS/docs/Compliance/seals/DssUploader/DSSUPLOADER_SELO_v2.2.md`

Este arquivo é histórico e imutável. Não deve ser editado após a emissão. Qualquer alteração no componente invalida este selo. Uma nova auditoria gera um novo arquivo de selo com nova data de emissão.

---

CONFORME — SELO DSS v2.2 CONCEDIDO

**Componente**: DssUploader
**Data de emissão**: 2026-05-07
**Declaração de imutabilidade**: Este documento não pode ser alterado após a emissão. Alterações no componente `DssUploader` exigem nova auditoria e novo arquivo de selo.

*Selo emitido pelo auditor DSS em 2026-05-07. Válido para a versão DSS 2.2.0.*
*Próxima revisão: mediante atualização de dependência Quasar, adição de novos estados de upload, ou criação de tokens semânticos de brand.*
