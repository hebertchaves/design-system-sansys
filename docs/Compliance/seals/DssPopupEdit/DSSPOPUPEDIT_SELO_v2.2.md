# SELO DSS v2.2 — DssPopupEdit

**Data de emissão**: 2026-05-11
**Versão DSS**: 2.2.0
**Componente**: DssPopupEdit
**Status**: CONFORMANT

---

## Declaração de Conformidade

O componente `DssPopupEdit` foi auditado formalmente e está em conformidade com as normas do **Design System Sansys (DSS) v2.2**.

Este selo é emitido após a resolução de todas as Não-Conformidades (NCs) identificadas no ciclo de auditoria.

---

## Classificação

| Atributo | Valor |
|----------|-------|
| **Categoria** | Overlay de Edição Inline — Overlays e Dialogs |
| **Fase** | 2 — Nível 1 (Independente) |
| **Interatividade** | Não interativo na raiz (Opção B). O elemento pai hospedeiro (td, li, div) é o gatilho. Interatividade interna pertence aos filhos (DssInput, DssButton) via slot. |
| **Golden Reference** | DssChip (componente interativo) |
| **Golden Context** | DssMenu (overlay teleportado — mesma estratégia de CSS global targeting `.q-*`) |
| **Dependências DSS Internas** | Nenhuma obrigatória. Filhos DSS são responsabilidade do consumidor via slot. |

---

## Ciclos de Auditoria

### Ciclo 1 — Auditoria Arquitetural e de Tokens

| Etapa | Data | Resultado |
|-------|------|-----------|
| Implementação inicial | 2026-05-11 | 18 arquivos criados seguindo arquitetura de 4 camadas |
| Auditoria DSS v2.5 (MCP validate_component_code) | 2026-05-11 | 0 erros · 1 warning (EXC-02) |
| Auditoria manual (Gates Estrutural, Composição, Responsabilidade, Documentação) | 2026-05-11 | 3 NCs + 4 GAPs identificados |
| Correções aplicadas (NC-01 a NC-03 + GAP-04) | 2026-05-11 | 4 itens resolvidos |
| Re-validação MCP | 2026-05-11 | 0 erros · 1 warning (EXC-02 documentado) ✅ |
| **Emissão do Selo** | **2026-05-11** | **CONFORMANT** |

---

## Não-Conformidades Resolvidas

### NC-01 — Forwarding incorreto do evento `save` (Arquitetural)

**Descrição**: O handler `@save="emit('save', $event, props.modelValue)"` capturava apenas o primeiro argumento do QPopupEdit (`$event = valor confirmado`) e descartava o segundo (`initialValue` interno do QPopupEdit). Em substituição, passava `props.modelValue` como `initialValue`, que já pode ser o novo valor quando `@save` dispara (pois `@update:modelValue` dispara antes e atualiza a prop de forma síncrona). Isso tornava `save(newValue, newValue)` em vez de `save(newValue, originalValue)` para consumidores reativos.

**Correção aplicada**: Arrow function explícita que captura ambos os args do QPopupEdit:
```vue
@save="(val, initVal) => emit('save', val, initVal)"
```

**Arquivos modificados**: `1-structure/DssPopupEdit.ts.vue`

---

### NC-02 — `usePopupEditClasses` exportado publicamente mas sem efeito funcional (Documental/Arquitetural)

**Descrição**: O composable `composables/usePopupEditClasses.ts` era exportado em `index.js`, mas nunca importado ou usado pelo componente. As classes BEM que gera (`dss-popup-edit`, `dss-popup-edit--with-title`, etc.) não podem ser aplicadas ao container `.q-popup-edit` teleportado (EXC-Gate-02 — QPopupEdit não expõe `popup-content-class`). A exportação pública induzia consumidores a acreditar que era funcional.

**Correção aplicada**: Removido da exportação pública em `index.js`. O arquivo do composable é mantido como artefato de convenção DSS com documentação explicativa. Nota adicionada em `index.js` explicando o motivo arquitetural.

**Arquivos modificados**: `index.js`

---

### NC-03 — EXC-01 em `dss.meta.json` documentava `!important` parcialmente (Documental)

**Descrição**: O campo `exceptions[EXC-01].description` listava apenas `background-color` e `box-shadow` com `!important`. O SCSS em `2-composition/_base.scss` usa `!important` em 4 propriedades: `background-color`, `box-shadow`, `border-radius` e `padding`. Auditores futuros poderiam questionar as 2 propriedades não listadas como violações não documentadas.

**Correção aplicada**: Descrição atualizada para cobrir as 4 propriedades com justificativa unificada.

**Arquivos modificados**: `dss.meta.json`

---

### GAP-04 — `DssPopupEditExpose` interface não aplicada ao `defineExpose` (Resolvido durante auditoria)

**Descrição**: O tipo `DssPopupEditExpose` estava declarado em `types/popupedit.types.ts` mas não era aplicado ao `defineExpose({...})` no componente, quebrando a convenção DSS de tipagem explícita do expose.

**Correção aplicada**: `defineExpose<DssPopupEditExpose>({...})` com import do tipo adicionado.

**Arquivos modificados**: `1-structure/DssPopupEdit.ts.vue`

---

## GAPs — Histórico Completo

| ID | Descrição | Resolução |
|----|-----------|-----------|
| GAP-01 | `pre_prompt_dss_popup_edit.md` lista tokens fantasma (`--dss-spacing-16`, `--dss-border-default`, `--dss-shadow-md`, `--dss-text-default`, `--dss-text-subtle`) | **Resolvido** em 2026-05-11 (retroativo). Pré-prompt reescrito: tokens fantasma removidos, tabela de tokens reais adicionada com substituições explícitas. Golden Context (DssMenu) declarado. |
| GAP-02 | `pre_prompt_dss_popup_edit.md` descreve `modelValue` como Boolean de visibilidade (semanticamente incorreto para QPopupEdit) | **Resolvido** em 2026-05-11 (retroativo). Pré-prompt reescrito: seção dedicada "Decisão Arquitetural Crítica — v-model" com tabela comparativa DssDialog vs DssPopupEdit. |
| GAP-03 | `cssClass: "q-popup-edit"` referencia classe Quasar em vez de DSS BEM | Mitigado: nota arquitetural adicionada em `dss.meta.json.classification.cssClassNote` explicando a imposição do EXC-Gate-02. |
| GAP-04 | `DssPopupEditExpose` interface não aplicada ao `defineExpose` | **Resolvido** durante ciclo de auditoria. |

---

## Reservas Registradas

| ID | Descrição | Impacto |
|----|-----------|---------|
| R-01 | `usePopupEditClasses` existe no diretório `composables/` mas não é exportado nem usado pelo componente. É um artefato de convenção DSS que documenta as classes BEM que *seriam* aplicadas se o QPopupEdit expusesse `popup-content-class`. | Baixo — sem efeito em runtime. Mantido como documentação da intenção DSS para quando o Quasar eventualmente adicionar suporte a `popup-content-class`. |
| R-02 | GAP-01/02 resolvidos retroativamente em 2026-05-11: pré-prompt reescrito com tokens reais, v-model semantics corretos e Golden Context declarado. DssPopupProxy desbloqueado. | Resolvido — sem bloqueio. |

---

## Tokens Utilizados (15)

| Categoria | Tokens |
|-----------|--------|
| Superfície | `--dss-surface-default` |
| Sombra | `--dss-elevation-3` |
| Forma | `--dss-radius-md` |
| Espaçamento | `--dss-padding-4`, `--dss-padding-3`, `--dss-spacing-2` |
| Borda | `--dss-gray-100`, `--dss-gray-200`, `--dss-border-width-thin`, `--dss-border-width-md` |
| Tipografia | `--dss-font-family-sans`, `--dss-text-body` |
| Brand Hub | `--dss-hub-primary` |
| Brand Water | `--dss-water-primary` |
| Brand Waste | `--dss-waste-primary` |

---

## Exceções Documentadas (4)

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-Gate-01 | `<q-popup-edit>` usado diretamente no template | `1-structure/DssPopupEdit.ts.vue` | Gate de Composição v2.4 — Rule 1. QPopupEdit fornece mecanismo de posicionamento, teleport via QMenu interno e gerenciamento de estado de edição sem equivalente DSS. Precedente: DssDialog (EXC-Gate-01), DssMenu (EXC-Gate-01). |
| EXC-Gate-02 | Seletor global `.q-popup-edit` no CSS | `2-composition/_base.scss` | QPopupEdit não expõe `popup-content-class` ou equivalente. CSS global targeting `.q-popup-edit` é a única estratégia disponível. Componente único no DSS nessa condição. Precedente: DssMenu (targeting `.q-menu`). |
| EXC-01 | `background-color: !important`, `box-shadow: !important`, `border-radius: !important`, `padding: 0 !important` | `2-composition/_base.scss` | QPopupEdit aplica esses estilos via `.q-card` (QCard interno) com especificidade CSS superior. `!important` necessário nas 4 propriedades para tokens DSS prevalecerem. Precedente: DssDialog (EXC-01), DssMenu (EXC-01). |
| EXC-02 | `min-width: 180px` | `2-composition/_base.scss` | Não existe token DSS para largura mínima de popup inline. 180px garante conteúdo mínimo usável (DssInput com rótulo e botões). |

---

## Gate Estrutural DSS ✅

O componente está **CONFORME** com o Gate Estrutural DSS (CLAUDE.md).

- [x] 4 camadas completas presentes: `1-structure/`, `2-composition/`, `3-variants/`, `4-output/`
- [x] Entry Point Wrapper `DssPopupEdit.vue` presente na raiz — re-export puro sem `<template>`, sem `<style>`, sem lógica própria
- [x] Orquestrador `DssPopupEdit.module.scss` importa L2 → L3 → L4 na ordem canônica
- [x] `components/index.scss` registrado sob `/* Composed Components */`
- [x] `index.js` exporta via wrapper `./DssPopupEdit.vue` como entry point principal
- [x] `dss.meta.json` com `goldenReference`, `goldenContext`, `gateExceptions` e exceções formais

---

## Conformidades por Pilar

| Pilar | Resultado |
|-------|-----------|
| **Tokens** | PASS — 15 tokens DSS utilizados; `180px` é EXC-02 documentado. Zero valores hardcoded não documentados fora das exceções formais. |
| **Touch Target** | CONFORME — Opção B declarada e justificada. DssPopupEdit é overlay de edição inline não-interativo na raiz. No estado fechado não renderiza nada no DOM. Elemento pai hospedeiro é o gatilho de toque (responsabilidade do consumidor). |
| **Arquitetura** | PASS — Conforme Gate Estrutural DSS. Wrapper `DssPopupEdit.vue` é re-export puro. 4 camadas completas. Orquestrador canônico L2 → L3 → L4. `inheritAttrs: false` com `v-bind="$attrs"` no `<q-popup-edit>`. CSS carregado globalmente (correto para conteúdo teleportado). EXC-Gate-01 e EXC-Gate-02 formalmente documentados. `defineExpose<DssPopupEditExpose>` tipado. |
| **Estados** | CONFORME — Estados hover/focus/active/disabled/loading todos documentados como N/A em `dss.meta.json.statesNotApplicable` com justificativas técnicas. DssPopupEdit é overlay de edição não-interativo na raiz; interatividade pertence exclusivamente aos filhos. `prefers-contrast: more` implementado. `forced-colors: active` implementado com system keywords. Dark mode via `[data-theme="dark"]`. `prefers-reduced-motion: reduce` implementado. Print: popup ocultado. |
| **Acessibilidade** | PASS — `role="dialog"`, `aria-modal`, foco gerenciados pelo QPopupEdit/QMenu interno (EXC-Gate-01). `prefers-contrast: more` (valor correto — não "high"). `forced-colors: active` com `Canvas`, `CanvasText`, `ButtonText`. `forced-color-adjust: none` ausente (proibido — WCAG 1.4.11). |
| **Documentação** | PASS — Template 13.1 completo (13 seções). `DSSPOPUPEDIT_API.md` com mapeamento Quasar→DSS e tabela de bloqueio. `README.md` com 5 modos de uso e alerta explícito sobre semântica do v-model. `DssPopupEdit.example.vue` com 5 cenários. `DssPopupEdit.test.js` com 20+ casos. `dss.meta.json` com `gateExceptions`, `exceptions`, `statesNotApplicable`, `compositionRecommendations`, `antiPatterns`, `auditHistory`. |

---

## Paridade com Golden Context (DssMenu)

O DssPopupEdit mantém paridade com o DssMenu (Golden Context) nos critérios arquiteturais de overlay teleportado:

| Aspecto | DssMenu | DssPopupEdit | Igual |
|---------|---------|--------------|-------|
| CSS global (não scoped) | ✅ | ✅ | ✅ |
| Seletor targeting classe Quasar global | `.q-menu` | `.q-popup-edit` | ✅ (padrão) |
| `!important` em background + shadow | ✅ (EXC-01) | ✅ (EXC-01) | ✅ |
| Brand via `[data-brand] .q-*` descendant | ✅ | ✅ | ✅ |
| Motor Quasar nativo (EXC-Gate-01) | QMenu | QPopupEdit | Diferente — justificado |
| Touch target Opção B | ✅ | ✅ | ✅ |
| `popup-content-class` disponível | ✅ (tem) | ❌ (não tem) | Diferente — EXC-Gate-02 |

**Diferença justificada**:
- **`popup-content-class` ausente**: QMenu expõe `popup-content-class`, permitindo ao DssMenu injetar a classe `.dss-menu`. QPopupEdit não expõe este mecanismo — é a única diferença arquitetural e justifica o EXC-Gate-02 único no DSS.
- **Motor Quasar**: QPopupEdit gerencia state de edição inline (valor, validação, autosave) que não existe no QMenu. O uso direto é necessário e documentado.

---

## Arquivos do Componente (18)

```
DSS/components/composed/DssPopupEdit/
├── 1-structure/DssPopupEdit.ts.vue        ← Layer 1 (sem <style> — global via index.scss)
├── 2-composition/_base.scss               ← Layer 2 (EXC-01, EXC-02; targets .q-popup-edit)
├── 3-variants/_variant.scss               ← Layer 3 (vazio — sem variantes visuais)
├── 3-variants/index.scss                  ← Layer 3 orchestrador
├── 4-output/_brands.scss                  ← Layer 4 (hub, water, waste — border-top botões)
├── 4-output/_states.scss                  ← Layer 4 (dark mode, prefers-contrast, forced-colors, print)
├── 4-output/index.scss                    ← Layer 4 orchestrador
├── composables/usePopupEditClasses.ts     ← Artefato de convenção DSS (não exportado — EXC-Gate-02)
├── types/popupedit.types.ts               ← Props, Emits, Slots, Expose interfaces
├── DssPopupEdit.module.scss               ← Orchestrador principal L2 → L3 → L4
├── DssPopupEdit.vue                       ← Entry Point Wrapper (re-export puro)
├── DssPopupEdit.md                        ← Documentação normativa (Template 13.1, 13 seções)
├── DssPopupEdit.example.vue               ← 5 cenários (tabela, seleção, persistente, brand Hub, validação)
├── DSSPOPUPEDIT_API.md                    ← API reference + mapeamento Quasar→DSS
├── DssPopupEdit.test.js                   ← Testes unitários (props, emits, slot, expose, gate)
├── dss.meta.json                          ← Metadados (status: sealed, auditHistory preenchido)
├── README.md                              ← Quick start com 5 modos de uso
└── index.js                               ← Barrel export (componente apenas — composable não exportado)
```

---

**Caminho canônico deste arquivo:**
`DSS/docs/Compliance/seals/DssPopupEdit/DSSPOPUPEDIT_SELO_v2.2.md`

Este arquivo é **histórico e imutável**. Não deve ser editado após a emissão.
Alterações no componente após esta data invalidam este selo.
Nova auditoria resulta em novo selo em novo arquivo.

---

**CONFORME — SELO DSS v2.2 CONCEDIDO**

**Componente**: DssPopupEdit
**Data de emissão**: 2026-05-11
**Declaração de imutabilidade**: Este documento representa o estado do componente auditado em 2026-05-11. É registro histórico permanente. Não pode ser modificado após emissão.

---

*Selo emitido pelo auditor DSS em 2026-05-11. Válido para a versão DSS 2.2.0.*
*Próxima revisão: mediante atualização de dependência QPopupEdit/Quasar ou alteração estrutural no componente.*
