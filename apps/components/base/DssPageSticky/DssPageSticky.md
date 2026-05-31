# DssPageSticky — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssPageSticky` é um container de posicionamento fixo governado pelo DSS. Permite que elementos de UI (FABs, banners de cookies, CTAs persistentes, assistentes flutuantes) sejam ancorados em posições específicas da viewport e permaneçam visíveis enquanto o usuário rola a página.

**Quando usar:**
- Botões FAB (Floating Action Button) que requerem acesso constante
- Banners informativos persistentes (cookies, avisos legais, notificações)
- CTAs (calls-to-action) de alta prioridade que não devem ser perdidos no scroll
- Assistentes ou chats flutuantes

**Quando NÃO usar:**
- Para elementos que devem rolar com a página (use posicionamento normal)
- Para overlays ou backdrops (use `DssDialog` ou `DssDrawer`)
- Para headers/footers de layout (use `DssHeader`/`DssFooter`)
- Fora do contexto de `DssLayout > DssPageContainer > DssPage`

---

## 2. Classificação DSS

- **Tipo:** Container utilitário de posicionamento
- **Categoria:** Layout Global — Composição de Terceiro Grau
- **Família:** Layout
- **Fase:** 2
- **Nível de Composição:** Nível 4
- **Interativo:** Não — container estrutural puro
- **Componente Quasar Base:** `QPageSticky`

---

## 3. API

### Props

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `position` | `PageStickyPosition` | `'bottom-right'` | Posição na viewport. Ver tipo abaixo. |
| `offset` | `[number, number]` | `[18, 18]` | Deslocamento `[x, y]` em pixels a partir da posição. |
| `expand` | `Boolean` | `false` | Expande o elemento para toda a largura (top/bottom) ou altura (left/right) da borda. |
| `elevated` | `Boolean` | `false` | **DSS exclusiva.** Aplica `box-shadow: var(--dss-elevation-2)`. |

**`PageStickyPosition`:**
```typescript
'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom' | 'left' | 'right'
```

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo fixo. Responsabilidade total do consumidor: DssButton (FAB), banners, etc. |

### Events

Nenhum. DssPageSticky é container estrutural — não emite eventos próprios.

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | z-index: var(--dss-z-index-sticky) aplicado |
| elevated | ✅ | box-shadow: var(--dss-elevation-2) |
| hover | ❌ N/A | Container não-interativo. Responsabilidade do slot. |
| focus | ❌ N/A | Container não-interativo. Responsabilidade do slot. |
| active | ❌ N/A | Container não-interativo. Responsabilidade do slot. |
| disabled | ❌ N/A | Containers de posicionamento não têm estado disabled. |
| loading | ❌ N/A | Fase 1 — fora do escopo. |
| error | ❌ N/A | Não aplicável a containers de posicionamento. |
| indeterminate | ❌ N/A | Não aplicável a containers de posicionamento. |

---

## 5. Tokens Utilizados

| Token | Valor Resolvido | Camada | Uso |
|-------|----------------|--------|-----|
| `--dss-z-index-sticky` | `1020` | L2 | Z-index base do elemento fixo |
| `--dss-elevation-2` | `var(--dss-shadow-md)` = `0 4px 6px rgba(0,0,0,0.30)` | L3 | Sombra da variante elevated (light mode) |
| `--dss-shadow-lg` | `0 10px 15px rgba(0,0,0,0.35)` | L4 | Sombra elevated em dark mode (RES-01) |
| `--dss-border-width-thin` | `1px` | L4 | Outline em `prefers-contrast: more` |
| `--dss-gray-400` | `#b0b0b0` | L4 | Cor do outline em `prefers-contrast: more` |

**Hierarquia de z-index DSS (contexto):**
```
base (1) < dropdown (1000) < sticky (1020) < fixed (1030) < backdrop (1040) < modal (1050) < popover (1060) < tooltip (1070)
```

---

## 6. Acessibilidade

- **WCAG 2.1 AA**: Conforme.
- **Touch Target**: Opção B — não implementado. DssPageSticky é container de posicionamento. Touch targets são responsabilidade do conteúdo interno (ex.: `DssButton` com `min-width/height: 48px`).
- **Role**: Nenhum role próprio — semântica pertence ao conteúdo no slot.
- **ARIA**: Recomendado `aria-label` via `$attrs` para descrever a região quando necessário.
- **Navegação por teclado**: Responsabilidade do conteúdo no slot.
- **Landmark**: Não é landmark semântico. Para acessibilidade de regiões fixas, adicionar `role="complementary"` ou `role="navigation"` via `$attrs` conforme o contexto.

---

## 7. Comportamentos Implícitos

| Comportamento | Descrição |
|--------------|-----------|
| **EXC-01: Raiz como `<q-page-sticky>`** | Template usa `<q-page-sticky>` diretamente como raiz. Ver seção 8. |
| **`inheritAttrs: false`** | Atributos HTML não fluem para o elemento raiz automaticamente. |
| **`v-bind="$attrs"`** | Atributos são repassados explicitamente ao `<q-page-sticky>`. |
| **Offset do layout** | QPageSticky respeita offsets de DssHeader e DssFooter via `--q-header-offset` e `--q-footer-offset` do QLayout. O elemento não ficará atrás de headers/footers. |
| **`position: fixed` no print** | Em `@media print`, `position` é sobrescrito para `static` (EXC-03) para evitar repetição em todas as páginas impressas. |
| **Dark mode — elevated** | Em dark mode, `--dss-shadow-md` (rgba 0,0,0,0.30) pode ser imperceptível. Substituído por `--dss-shadow-lg` (RES-01). |

---

## 8. Exceções Registradas

| ID | Valor / Localização | Gate Violado | Justificativa |
|----|--------------------|--------------|----|
| EXC-01 | `<q-page-sticky>` como elemento raiz | Gate de Composição v2.4 — Regra 1 | QPageSticky usa `position: fixed` calculado pelo QLayout via `--q-header-offset`/`--q-footer-offset`. Envolver em `<div>` quebra esses offsets. Precedente: DssPage, DssHeader, DssLayout. |
| EXC-02 | `ButtonFace`, `Canvas` em forced-colors | — | System color keywords obrigatórios em `@media (forced-colors: active)`. Tokens CSS são ignorados pelo navegador. Precedente: DssHeader (EXC-03), DssCard. |
| EXC-03 | `position: static !important`, `z-index: auto !important` em print | — | `position: fixed` repete o elemento em cada página impressa. Valores hardcoded necessários — tokens ignorados em `@media print`. Precedente: DssHeader (EXC-04). |

---

## 9. Paridade com Golden Component (DssBadge / DssHeader)

### vs. DssBadge (Golden Reference — não-interativo)

| Aspecto | DssBadge | DssPageSticky | Justificativa da diferença |
|---------|----------|----------------|---------------------------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | — |
| `inheritAttrs: false` | ✅ | ✅ | — |
| `v-bind="$attrs"` no elemento raiz | ✅ | ✅ | — |
| Touch target `::before` | ❌ N/A (não-interativo) | ❌ N/A (não-interativo) | Ambos são containers não-interativos |
| `-webkit-tap-highlight-color` | ❌ N/A | ❌ N/A | Não-interativos |
| Estados hover/focus/active | ❌ N/A | ❌ N/A | Containers estruturais |
| `aria-hidden` em decorativos | ✅ (quando aplicável) | N/A (sem decorativos) | DssPageSticky não possui elementos decorativos |

### vs. DssHeader (Golden Context — elemento fixo com z-index e elevação)

| Aspecto | DssHeader | DssPageSticky | Justificativa da diferença |
|---------|-----------|----------------|---------------------------|
| `defineOptions({ name, inheritAttrs: false })` | ✅ | ✅ | — |
| Primitivo Quasar como raiz (EXC-01) | ✅ (`<q-header>`) | ✅ (`<q-page-sticky>`) | Mesmo padrão arquitetural |
| `elevated` prop com `--dss-elevation-2` | ✅ | ✅ | Token idêntico |
| `bordered` prop | ✅ | ❌ | DssPageSticky não tem borda própria — sem conteúdo visual direto |
| Z-index governado | Via QHeader nativo | `--dss-z-index-sticky` (explícito) | QHeader tem z-index próprio; QPageSticky usa 1000 (override necessário) |
| Brands em `_brands.scss` | ✅ (background) | ❌ | DssPageSticky agnóstico de identidade visual |
| Print: `position: static` | ✅ | ✅ | Mesmo padrão EXC |

---

## 10. Mapeamento Estrutural DSS (Pré-prompt Fase 2)

### Mapeamento de Superfície de Composição

**🟢 A) Existentes DSS (podem compor o slot):**
- `DssButton` — FAB e ações flutuantes
- `DssIcon` — ícones de conteúdo

**🟡 B) Planejados / Roadmap:**
- `DssSnackbar` / `DssToast` — notificações flutuantes (candidatos a usar DssPageSticky internamente)
- `DssChatWidget` — widget de chat flutuante

**⚪ C) Estruturalmente esperados mas inexistentes:**
- `DssFab` — componente FAB dedicado (combinaria DssButton + DssPageSticky em abstração de maior nível)
- `DssCookieBanner` — banner de cookies persistente

### Matriz de Composição

**Papel estrutural:** Container de posicionamento fixo. Fornece o wrapper de posicionamento — não estiliza o conteúdo interno.

**Padrões de uso:**
```
DssPageSticky (position=bottom-right) > DssButton (round, icon=add)          → FAB padrão
DssPageSticky (position=bottom, expand) > [banner div]                       → Banner persistente
DssPageSticky (position=top-right, elevated) > DssChip                       → Status flutuante
```

**Anti-patterns:**
- Usar HTML nativo (`<button>`, `<div>`) com estilos inline no slot em vez de componentes DSS
- Instanciar múltiplos DssPageSticky com posições conflitantes na mesma página
- Sobrescrever `z-index` via `style` inline (viola hierarquia DSS)
- Usar DssPageSticky fora do contexto `DssLayout > DssPageContainer > DssPage`

---

## 11. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-04-23 | DSS Agent | Criação inicial — 4 camadas, 3 exceções, Golden: DssBadge + DssHeader |
