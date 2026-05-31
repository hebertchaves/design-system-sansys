# DssBreadcrumbs — Documentação Normativa DSS v2.2

> **Template 13.1** | **Fase 2** | **Status:** Pré-auditoria
> **Classificação:** Container Orquestrador de Navegação (Breadcrumb Trail)
> **Golden Reference:** DssBtnGroup | **Golden Context:** DssCard
> **Data:** 2026-04-11

---

## 1. Visão Geral

### 1.1 O que é o DssBreadcrumbs

O **DssBreadcrumbs** é um container de trilha de navegação governado pelo DSS. É um wrapper sobre o `QBreadcrumbs` do Quasar que gerencia o layout (flexbox, gap), a renderização de separadores e o contexto semântico de navegação (`<nav role="navigation">`).

Wrapper DSS governado sobre infraestrutura Quasar (QBreadcrumbs). A implementação DSS controla o gap via CSS custom properties, a cor e tipografia dos separadores via seletor descendente (EXC-01), e delega os estados interativos exclusivamente aos `DssBreadcrumbsEl` filhos.

### 1.2 Quando usar

- Navegação hierárquica em páginas com múltiplos níveis (ex: Home > Categoria > Produto)
- Contextos de aplicação com rotas aninhadas (Vue Router)
- Layouts de página que requerem orientação posicional do usuário
- Qualquer fluxo em que o usuário precise entender e navegar para o nível superior

### 1.3 Quando NÃO usar

- Para navegação linear (anterior/próximo) — usar `DssButton` com ícone de seta
- Para trilhas com apenas 1 nível (sem ancestrais) — desnecessário
- Para menus ou listas de links sem hierarquia — usar `DssList` + `DssItem`
- Quando o contexto não é navegacional (ex: steps de wizard) — usar componente de steps (futuro)

### 1.4 Componente Quasar equivalente

`QBreadcrumbs` — Wrapper DSS governado (API DSS difere da API Quasar)

---

## 2. Arquitetura Técnica

### 2.1 Modelo DSS × Quasar

| Camada | Responsabilidade |
|--------|-----------------|
| **Quasar (QBreadcrumbs)** | Renderiza `<nav role="navigation">`, injeta separadores com `aria-hidden="true"`, gerencia slot de separador, aplica alinhamento via classes Quasar |
| **DSS** | Governança de tokens, gap via CSS custom property, cor/tipografia dos separadores, brandabilidade, acessibilidade avançada |

### 2.2 Mapeamento Estrutural

#### Componente Quasar Principal
- `QBreadcrumbs` — container com role="navigation", separadores e alinhamento

#### Componentes Auxiliares Quasar (não usados diretamente)
- `QBreadcrumbsEl` — gerenciado pelo `DssBreadcrumbsEl` (filho DSS obrigatório)

### 2.3 Mapeamento de Composição DSS

| Status | Componente | Papel na Trilha |
|--------|-----------|-----------------|
| 🟢 Existente | `DssBreadcrumbsEl` | Item individual da trilha (link ou estático) |
| 🟢 Existente | `DssIcon` | Ícone nos itens (via prop `icon` do DssBreadcrumbsEl) |

#### Declaração de Impacto
- **Componentes existentes**: 2 (DssBreadcrumbsEl, DssIcon)
- **Planejados/Roadmap**: 0
- **Inexistentes estruturalmente necessários**: 0

**Composição ideal está completa** — DssBreadcrumbs tem todos os componentes necessários disponíveis.

### 2.4 Estrutura de Componentes

```
DssBreadcrumbs (container — Nível 2, este componente)
└── slot default
    └── DssBreadcrumbsEl (filho obrigatório — Nível 1, selado)
          └── DssIcon (composição interna opcional via prop icon)
```

### 2.5 Elemento HTML renderizado

```html
<nav
  role="navigation"
  aria-label="[consumidor fornece via $attrs]"
  class="q-breadcrumbs dss-breadcrumbs [modificadores]"
  style="--dss-breadcrumbs-gap: var(--dss-spacing-3); --dss-breadcrumbs-separator-color: var(--dss-text-subtle);"
>
  <!-- DssBreadcrumbsEl: <a> ou <div> via QBreadcrumbsEl -->
  <!-- .q-breadcrumbs__separator: injetado pelo QBreadcrumbs, aria-hidden="true" -->
</nav>
```

---

## 3. Instalação

```js
import { DssBreadcrumbs } from '@/dss/components/base/DssBreadcrumbs'
import { DssBreadcrumbsEl } from '@/dss/components/base/DssBreadcrumbsEl'
```

---

## 4. Uso Básico

```vue
<template>
  <!-- Trilha simples com separador padrão (/) -->
  <DssBreadcrumbs aria-label="Trilha de navegação">
    <DssBreadcrumbsEl to="/home" label="Início" />
    <DssBreadcrumbsEl to="/produtos" label="Produtos" />
    <DssBreadcrumbsEl label="Fone de Ouvido Pro" aria-current="page" />
  </DssBreadcrumbs>

  <!-- Separador customizado + ícones -->
  <DssBreadcrumbs separator=">" aria-label="Trilha com ícones">
    <DssBreadcrumbsEl to="/home" icon="home" label="Início" />
    <DssBreadcrumbsEl to="/produtos" icon="shopping_cart" label="Produtos" />
    <DssBreadcrumbsEl icon="headphones" label="Fone Pro" aria-current="page" />
  </DssBreadcrumbs>
</template>
```

---

## 5. Props

### 5.1 Props Expostas

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `separator` | `string` | `'/'` | Caractere separador. Aceita texto ou nome de ícone para uso com slot `#separator`. |
| `separatorColor` | `string` | `'subtle'` | Cor do separador: `subtle` (padrão), `body`, `disabled`. Outros valores tentam `var(--dss-text-{value})`. **Nota de precedência:** quando `data-brand` está presente no contexto ou prop `brand` está ativa, os tokens de brand (`--dss-{brand}-500/600`) têm precedência sobre `separatorColor`. |
| `gutter` | `'sm' \| 'md' \| 'lg'` | `'md'` | Espaçamento entre itens: `sm` = 8px, `md` = 12px, `lg` = 16px. |
| `align` | `'left' \| 'center' \| 'right' \| 'between' \| 'around'` | `'left'` | Alinhamento horizontal. |
| `brand` | `'hub' \| 'water' \| 'waste'` | `undefined` | Marca Sansys — cor da marca nos separadores. |

### 5.2 Props Bloqueadas

| Prop | Motivo |
|------|--------|
| `active-color` | A cor do item ativo pertence ao `DssBreadcrumbsEl` (Gate de Responsabilidade v2.4) |
| `separator-class` | Estilos do separador governados via CSS DSS (EXC-01) |

---

## 6. Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `VNode[]` | Itens da trilha. Aceita **apenas** `DssBreadcrumbsEl`. |
| `separator` | `VNode[]` | Separador customizado (ex: `DssIcon`). Sobrepõe prop `separator`. |

### Exemplo com slot separator

```vue
<DssBreadcrumbs>
  <template #separator>
    <DssIcon name="chevron_right" size="xs" />
  </template>
  <DssBreadcrumbsEl to="/home" label="Início" />
  <DssBreadcrumbsEl label="Página" aria-current="page" />
</DssBreadcrumbs>
```

---

## 7. Eventos

Sem eventos próprios. Eventos DOM nativos propagados via `inheritAttrs: false` + `v-bind="$attrs"`.

---

## 8. Estados

### 8.1 Estados do Container (DssBreadcrumbs)

| Estado | Descrição |
|--------|-----------|
| `default` | Único estado — container estrutural sem estados interativos |

### 8.2 Estados Não Aplicáveis ao Container

| Estado | Justificativa |
|--------|---------------|
| `hover` | Pertence aos `DssBreadcrumbsEl` filhos |
| `focus-visible` | Pertence aos `DssBreadcrumbsEl` filhos |
| `active` | Pertence aos `DssBreadcrumbsEl` filhos |
| `disabled` | Pertence aos `DssBreadcrumbsEl` filhos |
| `loading` | Pertence às páginas de destino dos links |
| `error` | Pertence ao roteamento/network |
| `indeterminate` | Não aplicável a trilhas de navegação |

> **Gate de Responsabilidade v2.4**: DssBreadcrumbs é um container orquestrador. Estados interativos são exclusivos dos `DssBreadcrumbsEl` filhos.

---

## 9. Acessibilidade (WCAG 2.1 AA)

### 9.1 role="navigation"

O QBreadcrumbs renderiza `<nav role="navigation">` nativamente. O consumidor deve fornecer `aria-label` via `$attrs` para identificar a trilha para leitores de tela:

```vue
<DssBreadcrumbs aria-label="Trilha de navegação do produto">
  ...
</DssBreadcrumbs>
```

### 9.2 aria-current="page"

O DssBreadcrumbs **não injeta automaticamente** `aria-current="page"`. O consumidor deve declarar no último `DssBreadcrumbsEl`:

```vue
<!-- ✅ CORRETO -->
<DssBreadcrumbs aria-label="Trilha">
  <DssBreadcrumbsEl to="/home" label="Início" />
  <DssBreadcrumbsEl label="Página Atual" aria-current="page" />
</DssBreadcrumbs>
```

### 9.3 Separadores e Screen Readers

Os separadores injetados pelo QBreadcrumbs recebem `aria-hidden="true"` nativamente — não são lidos por screen readers, evitando ruído auditivo na trilha de navegação.

### 9.4 Navegação por Teclado

| Tecla | Comportamento |
|-------|---------------|
| `Tab` | Move foco para o próximo `DssBreadcrumbsEl` clicável |
| `Enter` | Ativa o link do item focado |
| `Shift + Tab` | Move foco para o item clicável anterior |

O container (`<nav>`) não é focusável — apenas os `DssBreadcrumbsEl` clicáveis recebem foco.

---

## 10. Tokens Utilizados

| Token | Local | Uso |
|-------|-------|-----|
| `--dss-spacing-2` | Layer 1 (style binding) | Gutter sm = 8px |
| `--dss-spacing-3` | Layer 1 (style binding) | Gutter md = 12px (padrão) |
| `--dss-spacing-4` | Layer 1 (style binding) | Gutter lg = 16px |
| `--dss-spacing-1` | `DssBreadcrumbs.module.scss` | Outline offset high contrast |
| `--dss-font-size-sm` | `2-composition/_base.scss` | Tipografia dos separadores |
| `--dss-line-height-sm` | `2-composition/_base.scss` | Line-height dos separadores |
| `--dss-text-subtle` | Layer 1 + `2-composition/_base.scss` | Cor padrão dos separadores |
| `--dss-text-body` | Layer 1 | Cor separadores quando separatorColor="body" |
| `--dss-text-disabled` | Layer 1 | Cor separadores quando separatorColor="disabled" |
| `--dss-border-width-thin` | `DssBreadcrumbs.module.scss` | Outline high contrast |
| `--dss-radius-sm` | `DssBreadcrumbs.module.scss` | Border-radius outline |
| `--dss-font-weight-bold` | `4-output/_states.scss` | Peso separadores em high contrast |
| `--dss-hub-600` | `4-output/_brands.scss` | Cor Hub light mode |
| `--dss-hub-400` | `4-output/_brands.scss` | Cor Hub dark mode |
| `--dss-water-500` | `4-output/_brands.scss` | Cor Water light mode |
| `--dss-water-400` | `4-output/_brands.scss` | Cor Water dark mode |
| `--dss-waste-600` | `4-output/_brands.scss` | Cor Waste light mode |
| `--dss-waste-500` | `4-output/_brands.scss` | Cor Waste dark mode |

---

## 11. Comportamentos Implícitos

### 11.1 Forwarding de Atributos (`inheritAttrs: false`)

`DssBreadcrumbs` usa `inheritAttrs: false`. Atributos não declarados como props (incluindo `aria-label`, `data-*`, event listeners) são forwarded para `<q-breadcrumbs>` via `v-bind="$attrs"`.

### 11.2 Desativação do Gutter Quasar

`DssBreadcrumbs` passa `gutter="none"` ao QBreadcrumbs para desativar o sistema de gutter nativo (baseado em `q-gutter-{size}` com `margin`). O gap DSS é aplicado exclusivamente via `gap: var(--dss-breadcrumbs-gap)` no Layer 2. Isso garante controle total de espaçamento pelos tokens DSS.

### 11.3 CSS Custom Properties

O template injeta `--dss-breadcrumbs-gap` e `--dss-breadcrumbs-separator-color` via `style` binding. Consumidores avançados podem sobrescrevê-las via CSS:

```css
.meu-container .dss-breadcrumbs {
  --dss-breadcrumbs-gap: var(--dss-spacing-5);
}
```

### 11.4 Slot Separator e prop separator

Quando o slot `#separator` é fornecido, o QBreadcrumbs usa o conteúdo do slot para cada separador. O `aria-hidden="true"` é aplicado nativamente pelo QBreadcrumbs no container do separador, independentemente do conteúdo do slot.

---

## 12. Exceções Documentadas

### EXC-01 — Seletor Descendente `.dss-breadcrumbs .q-breadcrumbs__separator`

- **Valor:** Seletor descendente referenciando classe interna do Quasar
- **Local:** `2-composition/_base.scss`, `4-output/_brands.scss`, `4-output/_states.scss`
- **Justificativa:** O QBreadcrumbs injeta elementos DOM com a classe `.q-breadcrumbs__separator` entre cada filho. Para aplicar tipografia e cor DSS a esses separadores, é estritamente necessário usar seletor descendente. Esta é a única forma de governar o visual dos separadores sem modificar o QBreadcrumbs. Exceção registrada formalmente no pré-prompt oficial do componente. Precedente: DssBtnGroup (`_base.scss`, seletores `.dss-btn-group > .dss-button`).

### EXC-02 — Seletor Composto `.dss-breadcrumbs.q-breadcrumbs`

- **Valor:** Seletor composto com classe interna do Quasar
- **Local:** `2-composition/_base.scss`
- **Justificativa:** Especificidade controlada necessária para sobrescrever propriedades de layout do QBreadcrumbs (`align-items`, `gap`) sem `!important`. O seletor composto é a abordagem canônica DSS para Level 1 DOM overrides. Precedente: DssBreadcrumbsEl EXC-01 (`.dss-breadcrumbs-el.q-breadcrumbs__el`), DssTabPanel EXC-01.

### EXC-03 — `GrayText` (system color keyword em forced-colors)

- **Valor:** `color: GrayText`
- **Local:** `4-output/_states.scss` — `@media (forced-colors: active)`
- **Justificativa:** Forced-colors mode — tokens CSS são ignorados pelo browser. `GrayText` é o system color keyword canônico para elementos secundários/decorativos. Padrão DSS canônico. Precedente: DssBreadcrumbsEl `_states.scss`.

### EXC-04 — `--dss-line-height-sm` em vez de `--dss-line-height-md`

- **Valor:** Token `--dss-line-height-sm` (1.45) usado
- **Local:** `2-composition/_base.scss`
- **Justificativa:** O pré-prompt especificou `--dss-line-height-md` para separadores, mas esse token **não existe** no catálogo DSS (DSS_TOKEN_REFERENCE.md). O token correto e par canônico de `--dss-font-size-sm` é `--dss-line-height-sm` (1.45). Esta situação replica exatamente a NC-01 do DssTooltip (`--dss-font-weight-regular` → `--dss-font-weight-normal`). Divergência documentada explicitamente no SCSS e aqui.

---

## 13. Reservas

| ID | Descrição | Impacto |
|----|-----------|---------|
| RES-01 | QBreadcrumbs usa `gutter="none"` + CSS custom property. Mudanças internas do Quasar no sistema de gutter podem conflitar. | Baixo — override com EXC-02 tem especificidade suficiente |
| RES-02 | `aria-current="page"` não é injetado automaticamente no último item. Responsabilidade do consumidor. | Baixo — documentado com exemplos |
| RES-03 | Sem unit tests em v1.0.0. | Baixo — lógica mínima (composable de classes + CSS custom properties) |
| RES-04 | `separatorColor` sem validação runtime — valores inválidos tentam `var(--dss-text-{value})` com fallback `--dss-text-subtle`. | Baixo — fallback garante visual correto |

---

## 14. Paridade com Golden Reference (DssBtnGroup)

| Aspecto | DssBtnGroup | DssBreadcrumbs | Divergência Intencional |
|---------|------------|----------------|------------------------|
| `defineOptions({ name, inheritAttrs: false })` | ✅ | ✅ | — |
| `v-bind="$attrs"` no root | ✅ | ✅ | — |
| Elemento raiz sem componente Quasar | ✅ (`<div>`) | ❌ (`<q-breadcrumbs>`) | GATE-EXC-templateStructure — QBreadcrumbs requerido por `role="navigation"` + separadores automáticos + WCAG 1.3.1 |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ (EXC-02 no container) | — |
| Seletores CSS descendentes para filhos | ✅ `.dss-btn-group > .dss-button` | ✅ `.dss-breadcrumbs .q-breadcrumbs__separator` | — |
| CSS custom properties para layout | ❌ | ✅ `--dss-breadcrumbs-gap` | DssBreadcrumbs requer gap dinâmico via prop |
| Brands via `[data-brand]` | ✅ | ✅ | — |
| `forced-colors` com system keywords | ✅ `ButtonText` | ✅ `GrayText` | Semântica diferente: container vs. separador decorativo |
| `prefers-contrast: high` | ✅ outline no container | ✅ outline no container | — |
| Touch target `::before` | ❌ (não é Compact Control) | ❌ (não é Compact Control) | — |
| Estados interativos próprios | ❌ (delegados a filhos) | ❌ (delegados a filhos) | — |
| Entry Point Wrapper | ✅ | ✅ | — |
| 4 camadas arquiteturais | ✅ | ✅ | — |

---

## 15. Matriz de Composição DSS (Fase 2)

### Papel Estrutural

`DssBreadcrumbs` é o **container orquestrador** da família Breadcrumbs. É Nível 2 — agrupa instâncias de `DssBreadcrumbsEl` (Nível 1) com layout, gap e separadores governados.

### Hierarquia da Família

```
DssBreadcrumbs     ← Nível 2 (este componente) — container com separadores + nav
  └── DssBreadcrumbsEl  ← Nível 1 (selado) — item individual clicável/estático
        └── DssIcon     ← Composição interna opcional (prop icon)
```

### Componentes DSS na Composição

| Componente | Status | Papel |
|------------|--------|-------|
| `DssBreadcrumbsEl` | ✅ Implementado (selado) | Item individual da trilha — `compositionRequirements` |
| `DssIcon` | ✅ Implementado (selado) | Ícone nos itens — composição indireta via DssBreadcrumbsEl |

### Limites de Responsabilidade

| Responsabilidade | DssBreadcrumbs | DssBreadcrumbsEl |
|-----------------|----------------|-----------------|
| Renderizar container `<nav>` | ✅ (via QBreadcrumbs) | — |
| Injetar separadores | ✅ (via QBreadcrumbs) | — |
| Gerenciar gap entre itens | ✅ | — |
| Gerenciar alinhamento horizontal | ✅ | — |
| Cores dos separadores | ✅ | — |
| Renderizar item individual | — | ✅ |
| Gerenciar hover/focus/active | — | ✅ |
| Gerenciar disabled | — | ✅ |
| Ícone antes do label | — | ✅ |

### Anti-Patterns de Composição

```vue
<!-- ❌ INCORRETO: usar QBreadcrumbs diretamente -->
<q-breadcrumbs>
  <q-breadcrumbs-el to="/home" label="Início" />
</q-breadcrumbs>

<!-- ❌ INCORRETO: usar HTML nativo dentro do slot default -->
<DssBreadcrumbs>
  <a href="/home">Início</a>  <!-- Viola Gate de Composição v2.4 -->
</DssBreadcrumbs>

<!-- ❌ INCORRETO: usar DssBreadcrumbs sem DssBreadcrumbsEl -->
<DssBreadcrumbs>
  <span>Início</span>         <!-- Viola Gate de Composição v2.4 -->
</DssBreadcrumbs>

<!-- ❌ INCORRETO: misturar DssBreadcrumbsEl com HTML -->
<DssBreadcrumbs>
  <DssBreadcrumbsEl to="/home" label="Início" />
  <span aria-hidden="true">/</span>  <!-- Separador manual = duplicado com o nativo -->
  <DssBreadcrumbsEl label="Página" aria-current="page" />
</DssBreadcrumbs>

<!-- ✅ CORRETO: apenas DssBreadcrumbsEl, separadores automáticos -->
<DssBreadcrumbs aria-label="Trilha de navegação">
  <DssBreadcrumbsEl to="/home" label="Início" />
  <DssBreadcrumbsEl label="Página" aria-current="page" />
</DssBreadcrumbs>
```

### Governança de Extensão

- **Para personalizar separador visual**: usar slot `#separator` com `DssIcon`
- **Para personalizar gap**: usar prop `gutter` (sm | md | lg)
- **Para personalizar cor do separador**: usar prop `separatorColor` ou contexto `[data-brand]`
- **NÃO sobrescrever** classes internas dos `DssBreadcrumbsEl` filhos via CSS global

---

## 16. Gate de Conformidade DSS v2.2

### Gate Estrutural (Bloqueante)
- [x] 4 camadas existem em completude (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`)
- [x] Entry Point Wrapper (`DssBreadcrumbs.vue`) — re-export puro
- [x] Orquestrador SCSS (`DssBreadcrumbs.module.scss`) — L2 → L3 → L4
- [x] Barrel export (`index.js`) — componente + types + composables
- [x] `dss.meta.json` com `goldenReference` e `goldenContext`

### Gate Técnico (Bloqueante)
- [x] Nenhum valor hardcoded — EXC-01, EXC-02, EXC-03, EXC-04 documentados
- [x] Gate de Composição v2.4 — GATE-EXC-01 em `gateExceptions`
- [x] `defineOptions({ name: 'DssBreadcrumbs', inheritAttrs: false })`
- [x] `v-bind="$attrs"` no elemento raiz
- [x] `-webkit-tap-highlight-color: transparent`
- [x] `prefers-contrast: high` (outline no container)
- [x] `forced-colors: active` (GrayText — EXC-03)
- [x] `@media print`
- [x] Importação do DssBreadcrumbsEl via Entry Point Wrapper (não via `1-structure/`)

### Gate Documental (Bloqueante para Selo)
- [x] Tokens listados com nomes exatos (1:1 com SCSS)
- [x] README completo
- [x] Documentação normativa (Template 13.1)
- [x] API Reference
- [x] Exemplo funcional (5 cenários)
- [x] Reservas documentadas
- [x] Paridade com Golden Reference (DssBtnGroup)
- [x] Matriz de Composição
- [x] Comportamentos implícitos documentados
- [x] EXC-04: token inexistente documentado

---

> **Declaração:** Componente **PRONTO PARA AUDITORIA DSS v2.2**.
> Nenhum selo emitido. Nenhuma auto-certificação de conformidade.
