# DssPageScroller — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssPageScroller` é um wrapper DSS governado sobre o `QPageScroller` do Quasar.
Exibe um elemento flutuante — geralmente um botão "Voltar ao Topo" — apenas quando o usuário
rola a página além de um limite configurável (`scroll-offset`). Ao clicar no conteúdo do slot,
o QPageScroller executa scroll suave de volta à posição de origem.

**Quando usar:**
- Páginas longas que se beneficiam de ação rápida para retornar ao topo
- Listas ou feeds com scroll extenso onde o usuário precisa voltar ao contexto inicial
- Qualquer página onde o scroll > 1000px é esperado como comportamento comum

**Quando NÃO usar:**
- Páginas curtas que não excedem o viewport (scroll-offset nunca atingido)
- Como substituto de `DssPageSticky` — quando o elemento deve ser **sempre** visível, use `DssPageSticky`
- Fora do contexto `DssLayout > DssPageContainer > DssPage` — o QPageScroller não funcionará

---

## 2. Classificação DSS

- **Tipo:** Container utilitário de comportamento de scroll
- **Categoria:** Layout Global — Composição de Terceiro Grau — Nível 4
- **Fase:** 2
- **Interativo:** Não — a interatividade reside no conteúdo do slot default
- **Golden Reference:** DssBadge (componente não-interativo — conforme DSS_GOLDEN_COMPONENTS.md § 1.1)
- **Golden Context:** DssPageSticky (baseline arquitetural canônico)

---

## 3. API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `position` | `PageScrollerPosition` | `'bottom-right'` | Posição na tela onde o elemento será ancorado. |
| `offset` | `[number, number]` | `[18, 18]` | Deslocamento `[x, y]` em pixels. |
| `scrollOffset` | `Number` | `1000` | Pixels de scroll antes do componente aparecer. |
| `duration` | `Number` | `250` | Duração da animação de scroll em ms. |
| `reverse` | `Boolean` | `false` | Aparece ao rolar para cima (direção oposta). |

> **Nota DSS:** A prop `duration` tem padrão 250ms, correspondendo ao token `--dss-duration-base`.
> O Quasar usa 300ms como padrão — o DSS governa esse valor para alinhar ao sistema de motion.

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do scroller. Recomendado: `DssButton` (round, com ícone e `aria-label`). |

### Eventos

Nenhum evento é emitido diretamente. O clique no slot é gerenciado pelo QPageScroller internamente.

---

## 4. Estados

| Estado | Implementado | Tipo | Trigger |
|--------|-------------|------|---------|
| Oculto | ✅ | Comportamental | `scroll < scrollOffset` |
| Visível | ✅ | Comportamental | `scroll >= scrollOffset` |
| Animando (scroll) | ✅ | Comportamental | Clique no slot — scroll suave com `effectiveDuration` |
| Reverse | ✅ | Comportamental | `reverse=true` + scroll na direção oposta |
| hover | — | N/A | Responsabilidade do conteúdo no slot |
| focus | — | N/A | Responsabilidade do conteúdo no slot |
| active | — | N/A | Responsabilidade do conteúdo no slot |
| disabled | — | N/A | N/A — containers de scroll não têm estado disabled |
| loading | — | N/A | Fora do escopo — Fase 2 |
| error | — | N/A | N/A — containers de scroll não têm estado error |
| indeterminate | — | N/A | N/A |

---

## 5. Tokens Utilizados

| Token | Valor | Local de Uso |
|-------|-------|--------------|
| `--dss-z-index-sticky` | 1020 | `.dss-page-scroller` — empilhamento governado |

**Tokens referenciados apenas em documentação (não no SCSS):**

| Token | Valor | Descrição |
|-------|-------|-----------|
| `--dss-duration-base` | 250ms | Padrão da prop `duration` em JS |

> **Token First:** DssPageScroller usa apenas 1 token no SCSS porque é container estrutural
> sem cor, tipografia ou espaçamento próprios. A aparência pertence ao conteúdo no slot.

---

## 6. Acessibilidade

- **WCAG 2.1 AA:** Conforme
- **WCAG 2.3.3 (Animação a partir de Interações):** O componente detecta `prefers-reduced-motion: reduce`
  via `window.matchMedia` e força `effectiveDuration = 0` quando ativo, garantindo scroll instantâneo.
- **Touch Target:** Opção B — não implementado. DssPageScroller é container estrutural.
  Touch targets são responsabilidade do botão interno (ex: `DssButton` com `min-height: var(--dss-touch-target-md)`).
- **ARIA:** Nenhum `role` ou `aria-*` no DssPageScroller. O `aria-label` deve estar no **botão interno**:
  `<q-btn aria-label="Voltar ao topo">`.
- **Navegação por teclado:** Gerenciada pelo conteúdo no slot, não pelo DssPageScroller.

---

## 7. Exceções Registradas

| ID | Descrição | Local | Justificativa |
|----|-----------|-------|---------------|
| EXC-01 | `<q-page-scroller>` como elemento raiz | `1-structure/DssPageScroller.ts.vue` | QPageScroller detecta scroll do container pai. Envolver em `<div>` quebra a detecção. Precedente: DssPageSticky (EXC-01). |
| EXC-02 | `forced-color-adjust: auto` em forced-colors | `4-output/_states.scss` | Tokens CSS ignorados em Windows HCM. Padrão canônico DSS. |
| EXC-03 | `display: none !important` em print | `4-output/_states.scss` | Botão "Voltar ao Topo" sem função em impressão. Tokens ignorados em print. Precedente: DssPageSticky (EXC-03). |

---

## 8. Comportamentos Implícitos

| Comportamento | Descrição |
|---------------|-----------|
| `v-bind="$attrs"` | Atributos não declarados são repassados ao `<q-page-scroller>` raiz. Inclui `aria-label`, `data-*`, classes adicionais. |
| `inheritAttrs: false` | Declarado em `defineOptions` — impede forwarding automático. Todo atributo vai via `v-bind="$attrs"` explicitamente. |
| `effectiveDuration` | Computed que retorna `0` quando `prefers-reduced-motion: reduce`, ou `props.duration` caso contrário. |
| Detecção de reduced-motion | `onMounted` registra listener em `window.matchMedia('(prefers-reduced-motion: reduce)')`. Removido em `onUnmounted`. |
| Contexto de scroll | QPageScroller monitora o container pai via QLayout. Sem DssLayout/DssPageContainer/DssPage, o scroll não é detectado. |

---

## 9. Paridade com Golden Context — DssPageSticky

| Aspecto | DssPageSticky | DssPageScroller | Δ / Justificativa |
|---------|---------------|-----------------|-------------------|
| Elemento raiz | `<q-page-sticky>` | `<q-page-scroller>` | Diferente — QPageScroller para visibilidade condicional |
| EXC-01 | ✅ Elemento Quasar como raiz | ✅ Elemento Quasar como raiz | **Igual** |
| `inheritAttrs: false` | ✅ | ✅ | **Igual** |
| `v-bind="$attrs"` | ✅ Na raiz | ✅ Na raiz | **Igual** |
| `defineOptions({ name })` | ✅ | ✅ | **Igual** |
| `defineSlots<T>()` | ✅ | ✅ | **Igual** |
| z-index | `--dss-z-index-sticky` | `--dss-z-index-sticky` | **Igual** |
| Touch target | Opção B | Opção B | **Igual** — ambos não-interativos por si |
| Estados de interação | Nenhum | Nenhum | **Igual** — responsabilidade do slot |
| Prop `elevated` | ✅ DSS-exclusiva | ❌ Não exposta | **Diferente** — DssPageScroller não tem cor/sombra própria. Roadmap: variante futura. |
| Animação/motion | N/A | ✅ `prefers-reduced-motion` | **DssPageScroller adiciona** — necessário pela prop `duration` |
| `@media print` | `position: static !important` | `display: none !important` | **Diferente** — "Voltar ao Topo" não tem função em impressão |
| Brands SCSS | Nenhum override | Nenhum override | **Igual** — sem cor própria |

---

## 10. Anti-Patterns

- **Usar DssPageScroller fora de** `DssLayout > DssPageContainer > DssPage` — QPageScroller não detecta scroll.
- **Definir `aria-label` no DssPageScroller** — deve estar no botão interno do slot.
- **Colocar múltiplos DssPageScroller** na mesma página — conflito de posicionamento.
- **Sobrescrever z-index** via classes ou estilos inline — viola hierarquia DSS.
- **Usar como substituto de DssPageSticky** — DssPageSticky é para elementos **sempre** visíveis.
- **Definir `scroll-offset="0"`** — o componente nunca ficará oculto, equivalente a DssPageSticky.

---

## 11. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-04-26 | DSS Agent | Criação inicial — MCP-First Workflow v2.5 |
