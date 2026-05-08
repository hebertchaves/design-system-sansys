# SELO DSS v2.2 — DssPagination

**Data de emissão**: 2026-05-08
**Versão DSS**: 2.2.0
**Componente**: DssPagination
**Status**: CONFORMANT

---

## Declaração de Conformidade

O componente `DssPagination` foi auditado formalmente e está em conformidade com as normas do **Design System Sansys (DSS) v2.2**.

Este selo é emitido após a resolução de todas as Não-Conformidades (NCs) identificadas no ciclo de auditoria.

---

## Classificação

| Atributo | Valor |
|----------|-------|
| **Categoria** | Navegação Estrutural — Independente (Base da Fase 2) |
| **Fase** | 2 — Nível 1 (Independente) |
| **Interatividade** | Não interativo em sua raiz (interatividade pertence aos botões internos do QPagination) |
| **Golden Reference** | DssChip (interativo — designação normativa global) |
| **Golden Context** | DssBtnGroup (container de botões coordenados interativos — selado 26 Mar 2026) |
| **Dependências DSS Internas** | Nenhuma (QPagination utilizado como motor via Quasar) |

---

## Ciclos de Auditoria

### Ciclo 1 — Auditoria Arquitetural e de Tokens

| Etapa | Data | Resultado |
|-------|------|-----------|
| Auditoria inicial | 2026-05-08 | 3 NCs não-bloqueantes + 3 GAPs identificados |
| Correções aplicadas | 2026-05-08 | 3 NCs resolvidas, 3 GAPs resolvidos |
| Auditoria final (MCP validate_component_code) | 2026-05-08 | 0 NCs pendentes |
| **Emissão do Selo** | **2026-05-08** | **CONFORMANT** |

---

## Não-Conformidades Resolvidas

### NC-01 — `aria-current="true"` Incorreto (Acessibilidade — Não-bloqueante)

**Descrição**: Os seletores CSS em `3-variants/_variant.scss` (linhas 6, 16) e `4-output/_states.scss` (linha 24) usavam `[aria-current="true"]` para identificar o botão de página ativo. O `QPagination` define `aria-current="page"` no botão ativo, conforme o padrão ARIA WAI (`aria-current` para paginação usa o valor `"page"`, não `"true"`). O mesmo erro estava presente nas anotações de `DssPagination.md §7` e `DSSPAGINATION_API.md`.

**Impacto**: O seletor `[aria-current="true"]` nunca disparava — o fallback `.bg-primary` cobria a estilização, tornando o impacto visual nulo. Contudo, o seletor incorreto representava erro de conformidade ARIA e risco de regressão em futuras versões do Quasar que pudessem alterar o comportamento da classe `.bg-primary`.

**Correção aplicada**: Todos os seletores `[aria-current="true"]` substituídos por `[aria-current="page"]` nos três arquivos SCSS afetados. Anotações corrigidas em `DssPagination.md §7` e `DSSPAGINATION_API.md`.

**Arquivos modificados**: `3-variants/_variant.scss`, `4-output/_states.scss`, `DssPagination.md`, `DSSPAGINATION_API.md`

---

### NC-02 — `.q-pagination__content` Inexistente no DOM do QPagination (Arquitetural — Não-bloqueante)

**Descrição**: O seletor `.q-pagination__content > .q-btn:not(.q-pagination__middle .q-btn)` em `2-composition/_base.scss` referenciava a classe `.q-pagination__content`, que não existe na estrutura DOM gerada pelo QPagination no Quasar v2. O elemento raiz gerado pelo QPagination é `.q-pagination`, sem wrapper intermediário com essa classe. O seletor nunca correspondia a nenhum elemento, impedindo a aplicação de `color: var(--dss-text-primary)` nos botões de navegação (anterior/próximo/primeiro/último).

**Impacto**: A cor dos botões de direção e limite não era sobrescrita pelo token DSS — permanecendo com a cor padrão do tema Quasar. Funcionalidade de navegação não comprometida; apenas o refinamento visual de cor não era aplicado.

**Correção aplicada**: Seletor corrigido para `.q-pagination > .q-btn { color: var(--dss-text-primary); }`. O comentário foi atualizado para documentar que o QPagination não gera um wrapper `.q-pagination__content`.

**Arquivos modificados**: `2-composition/_base.scss`

---

### NC-03 — `!important` Não Documentado no EXC-Gate-01 (Documental — Não-bloqueante)

**Descrição**: Os blocos de variante `flat` e `outline` em `3-variants/_variant.scss` utilizavam `background-color: transparent !important` para sobrescrever o preenchimento do botão ativo. O uso de `!important` é arquiteturalmente necessário porque a classe Quasar `.bg-primary` aplica `background: var(--q-color-primary) !important` — sem `!important` na sobreescrita DSS, a precedência não é suficiente. Contudo, esse comportamento não estava documentado no campo `description` da exceção `EXC-Gate-01` em `dss.meta.json`, tornando a exceção não rastreável em auditorias futuras.

**Impacto**: Auditores futuros poderiam classificar o `!important` como violação do princípio Token First sem compreender que é necessário para sobrescrever um `!important` upstream do Quasar. Risco de remoção incorreta em ciclos de manutenção.

**Correção aplicada**: Campo `description` do `EXC-Gate-01` em `dss.meta.json` atualizado para incluir: justificativa do `!important` em `_variant.scss`, referência ao `aria-current="page"` como valor correto, e mapeamento do seletor `.q-pagination > .q-btn` para os botões de navegação.

**Arquivos modificados**: `dss.meta.json`

---

## GAPs Resolvidos

### GAP-01 — Estado `loading` Não Declarado como Ausente (Documental)

**Descrição**: A tabela de estados em `DssPagination.md §6` não incluía linha para o estado `loading`, exigido pelo checklist de auditoria DSS como "implementado ou justificado explicitamente como ausente". A ausência de qualquer menção ao estado `loading` criava ambiguidade sobre se o componente era incompleto ou se `loading` era intencionalmente fora de escopo.

**Correção**: Linha adicionada à tabela de estados em `DssPagination.md §6`: "Loading — N/A — Paginação não possui estado loading próprio. Se o conteúdo da página está carregando, o estado de loading deve ser gerenciado pelo componente consumidor (ex: `DssInnerLoading` sobre a lista/tabela)."

**Arquivos modificados**: `DssPagination.md`

---

### GAP-02 — Golden Context Não Declarado Formalmente no Pré-Prompt (Documental)

**Descrição**: O arquivo `docs/governance/pre-prompts/pre_prompt_dss_pagination.md` declarava "Golden Reference: DssChip" na seção §1, mas o campo "Golden Context" continha apenas a descrição de propósito do componente, sem identificar formalmente o baseline de auditoria (`DssBtnGroup`). A ausência de declaração formal do Golden Context comprometia a rastreabilidade da decisão arquitetural e poderia levar criadores futuros de componentes da mesma família a usar uma referência incorreta.

**Correção**: Seção "Golden Context" do pré-prompt reescrita para declarar formalmente: "O baseline específico de auditoria para o `DssPagination` é o `DssBtnGroup`." com justificativa de paridade arquitetural. O conteúdo descritivo original foi relocado para nova subseção "Contexto do Componente".

**Arquivos modificados**: `docs/governance/pre-prompts/pre_prompt_dss_pagination.md`

---

### GAP-03 — Calcanhar de Aquiles Arquitetural Não Identificado no Pré-Prompt (Documental)

**Descrição**: A seção "Riscos Arquiteturais" do pré-prompt listava riscos genéricos (Performance, Acessibilidade, Flexibilidade, Sincronização de Estado), mas não identificava o risco arquitetural principal e determinístico: QPagination não fornece API de slot para botões individuais de página, tornando obrigatória a exceção ao Gate de Composição v2.4 (EXC-01) e a adoção do padrão de theming via `--q-color-primary` + seletores internos (EXC-Gate-01). Esse risco está presente em 100% das implementações de DssPagination e deveria ter sido identificado como o "calcanhar de Aquiles" do componente.

**Correção**: Risco adicionado com marcação explícita "⚠️ CALCANHAR DE AQUILES" no topo da lista de riscos, com descrição do anti-pattern (reconstruir a lógica de paginação fora do QPagination) e do padrão correto (QPagination como motor + theming via CSS custom property).

**Arquivos modificados**: `docs/governance/pre-prompts/pre_prompt_dss_pagination.md`

---

## Reservas Registradas

| ID | Descrição | Impacto |
|----|-----------|---------|
| R-01 | Tokens `--dss-gap-1`, `--dss-compact-control-height-*`, `--dss-font-size-*` são tokens genéricos; ausência de mapeamento direto Quasar↔DSS para `size` prop (xs/sm/md/lg) — mapeamento via CSS classes no `usePaginationClasses` | Técnico — controlado; funcional e consistente com Golden Context DssBtnGroup |
| R-02 | `background-color: transparent !important` nas variantes `flat` e `outline` depende do comportamento upstream de Quasar em `.bg-primary`. Mudança na estratégia de aplicação de cor do Quasar pode requerer revisão | Baixo — documentado em EXC-Gate-01; risco controlado |
| R-03 | Touch target dos botões de página delegado integralmente ao QPagination/QBtn. Se o QPagination mudar a implementação interna dos botões, o `min-width/min-height` via `--dss-compact-control-height-md` (EXC-Gate-01) pode ser perdido | Baixo — Opção B de touch target; QPagination/QBtn nativo já atende WCAG 2.5.5 por padrão |
| R-04 | Sem unit tests automatizados na Fase 2 | Aceitável por política DSS Fase 2 |

---

## Conformidades

| Pilar | Critério Avaliado | Resultado |
|-------|-------------------|-----------|
| **Tokens** | Zero valores hardcoded em L2, L3 e L4 confirmado pelo MCP validate_component_code (0 findings); `--q-color-primary` sobreescrita via token `--dss-action-primary`; tokens de compact-control, gap, radius, font-size, font-weight, duration, easing e opacity-disabled todos via `var(--dss-*)`; `!important` documentado como EXC-Gate-01 e necessário para sobrescrever upstream Quasar | CONFORME |
| **Touch Target** | N/A — root não interativo. Touch target delegado ao QPagination/QBtn via Opção B. `min-width/min-height: var(--dss-compact-control-height-md)` aplicado via EXC-Gate-01 em `.q-pagination .q-btn`. QPagination/QBtn nativo atende WCAG 2.5.5 por padrão. Conforme com o modelo de delegação de estados do Golden Context DssBtnGroup | CONFORME |
| **Arquitetura** | Gate Estrutural DSS satisfeito: 4 camadas completas (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`); orquestrador `DssPagination.module.scss` importa L2→L3→L4 na ordem canônica; Entry Point Wrapper `DssPagination.vue` é re-export puro sem `<template>`, `<style>` ou lógica própria (aponta para `./1-structure/DssPagination.ts.vue`); `index.js` exporta componente, types e composable; `gateExceptions` registrado em `dss.meta.json` com EXC-01 (motor QPagination sem slot API) e EXC-Gate-01 (seletores internos + `--q-color-primary`); `inheritAttrs: false` + `v-bind="$attrs"` no root; `defineOptions({ name: 'DssPagination' })` declarado | CONFORME |
| **Estados** | `disabled` (`opacity: --dss-opacity-disabled` + `pointer-events: none`), `readonly` (`pointer-events: none`), `focus` (`dss-focus-ring` mixin via `:focus-visible`); `hover` e `active` nos botões de página delegados ao QPagination/QBtn; página ativa via `--q-color-primary` (EXC-Gate-01); `direction-disabled` gerenciado internamente pelo QPagination; estado `loading` declarado explicitamente como fora de escopo com delegação documentada ao consumidor | CONFORME |
| **Acessibilidade** | WCAG 2.1 AA: `role="navigation"` + `aria-label` configurável no container raiz; `aria-current="page"` gerenciado internamente pelo QPagination no botão ativo (valor ARIA correto per WAI spec); foco visível via `dss-focus-ring` mixin em `:focus-visible`; navegação por teclado (Tab + Enter/Space) provida pelo QPagination; `prefers-reduced-motion` com `transition: none` nos botões; `prefers-contrast: more` (não `high`); `forced-colors: active` com `ButtonText` como cor de borda; ausência de `forced-color-adjust: none` (proibido no DSS) | CONFORME |
| **Documentação** | Template 13.1 completo (12 seções em `DssPagination.md`); `DSSPAGINATION_API.md` com 14 props, 1 evento, tabela completa de tokens por categoria, e exceções arquiteturais documentadas; `README.md` com quick start, exemplos, modos, brandabilidade e tabela de estados; 6 cenários no `DssPagination.example.vue` (padrão, navegação completa, round+brand, outline+sm, flat+lg, disabled); pré-prompt com Golden Context formal e calcanhar de Aquiles identificado; `dss.meta.json` com `gateExceptions`, `exceptions`, `tokens`, `props` e `auditStatus` | CONFORME |

---

## Tokens Utilizados

| Categoria | Tokens |
|-----------|--------|
| Cor — Ação | `--dss-action-primary`, `--dss-text-primary`, `--dss-text-on-primary` |
| Cor — Brand | `--dss-hub-primary`, `--dss-water-primary`, `--dss-waste-primary` |
| Dimensão | `--dss-compact-control-height-xs`, `--dss-compact-control-height-sm`, `--dss-compact-control-height-md`, `--dss-compact-control-height-lg` |
| Espaçamento | `--dss-gap-1` |
| Tipografia | `--dss-font-size-xs`, `--dss-font-size-sm`, `--dss-font-size-md`, `--dss-font-weight-medium`, `--dss-font-weight-bold` |
| Forma | `--dss-radius-md`, `--dss-radius-full`, `--dss-border-width-thin`, `--dss-border-width-medium` |
| Movimento | `--dss-duration-150`, `--dss-easing-standard` |
| Feedback | `--dss-opacity-disabled` |

---

## Exceções Documentadas (2)

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | Uso direto de `<q-pagination>` no template sem substituição por componentes DSS internos | `1-structure/DssPagination.ts.vue` | Gate de Composição v2.4 Rule 1 — QPagination não expõe API de slot para botões individuais de página, tornando impossível a substituição interna por `DssButton`. Motor de paginação (lógica de elipses, janela de páginas, boundary/direction links) delegado integralmente ao Quasar. Registrado em `gateExceptions` do `dss.meta.json`. |
| EXC-Gate-01 | Seletores `.q-pagination__middle` (gap), `.q-pagination > .q-btn` (color), `.q-pagination .q-btn` (radius, size, transition, focus); sobreescrita `--q-color-primary`; `background-color: transparent !important` nas variantes flat/outline | `2-composition/_base.scss`, `3-variants/_variant.scss`, `4-output/_states.scss` | QPagination não expõe slot API — theming deve ser aplicado via seletores CSS internos estáveis. `--q-color-primary` é a propriedade CSS customizada que o QPagination usa para o botão ativo, conectada a tokens DSS sem `:deep()`. `!important` nas variantes flat/outline necessário porque Quasar aplica `.bg-primary { background: var(--q-color-primary) !important }` — o `!important` upstream não pode ser sobrescrito sem `!important` na camada DSS. `aria-current="page"` é o valor ARIA correto per WAI spec para paginação. |

---

## Paridade com Golden Context (DssBtnGroup)

O DssPagination mantém paridade com o DssBtnGroup (Golden Context) nos seguintes critérios arquiteturais:

| Aspecto | DssBtnGroup | DssPagination | Igual |
|---------|-------------|---------------|-------|
| Container `inline-flex` com `align-items: center` | ✅ | ✅ | ✅ |
| Root não-interativo (estados nos filhos) | ✅ | ✅ | ✅ |
| Brand via `[data-brand]` cascade + `data-brand` prop | ✅ | ✅ | ✅ |
| `disabled` via `opacity: --dss-opacity-disabled` + `pointer-events: none` | ✅ | ✅ | ✅ |
| `defineOptions` + `inheritAttrs: false` + `v-bind="$attrs"` | ✅ | ✅ | ✅ |
| `prefers-reduced-motion` com `transition: none` | ✅ | ✅ | ✅ |
| `prefers-contrast: more` (não `high`) | ✅ | ✅ | ✅ |
| `forced-colors` sem `forced-color-adjust` | ✅ | ✅ | ✅ |
| `print: display: none` | ✅ | ✅ | ✅ |

**Diferenças justificadas**:

- **Motor QPagination**: DssPagination utiliza `QPagination` como motor de paginação (EXC-01). DssBtnGroup compõe `QBtnGroup` + `DssButton` internos. Diferença arquitetural determinada pelo fato de QPagination não expor slot API para botões individuais.
- **`--q-color-primary` override**: DssPagination utiliza sobreescrita de CSS custom property como mecanismo primário de theming (EXC-Gate-01) — padrão não aplicável ao DssBtnGroup, que aplica theming via props `DssButton`.
- **`aria-current="page"`**: DssPagination gerencia o botão de página ativa via `aria-current="page"` (interno ao QPagination). DssBtnGroup não utiliza `aria-current`.

---

**Caminho canônico do arquivo**:
`DSS/docs/compliance/seals/DssPagination/DSSPAGINATION_SELO_v2.2.md`

Este arquivo é histórico e imutável. Não deve ser editado após a emissão. Qualquer alteração no componente invalida este selo. Uma nova auditoria gera um novo arquivo de selo com nova data de emissão.

---

CONFORME — SELO DSS v2.2 CONCEDIDO

**Componente**: DssPagination
**Data de emissão**: 2026-05-08
**Declaração de imutabilidade**: Este documento não pode ser alterado após a emissão. Alterações no componente `DssPagination` exigem nova auditoria e novo arquivo de selo.

*Selo emitido pelo auditor DSS em 2026-05-08. Válido para a versão DSS 2.2.0.*
*Próxima revisão: mediante atualização de dependência Quasar, adição de novos estados de paginação, ou criação de tokens semânticos de brand para paginação.*
