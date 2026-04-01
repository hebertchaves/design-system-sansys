# DssItemSection — API Reference

> Referência técnica completa. Para quick start, veja [README.md](./README.md).

## Classificação

| Campo | Valor |
|-------|-------|
| Fase | 2 — Componente Estrutural |
| Classificação | Container de Layout Interno — coluna flex dentro do DssItem |
| Equivalente Quasar | `QItemSection` |
| Golden Reference | `DssAvatar` |
| Golden Context | `DssList` |
| Subcomponentes | Nenhum (standalone) |
| Dependências de Composição | `DssItem` (container pai obrigatório) |

---

## Props

### `avatar`

```typescript
avatar?: boolean
// Padrão: false
```

Configura a seção como container de avatar. Ajusta padding-right e min-width para acomodar um `DssAvatar` ou `DssIcon` na posição leading.

**Override Quasar (EXC-01):** Substitui `padding-right` nativo do Quasar por `var(--dss-spacing-3)`. Min-width calculada via `calc(var(--dss-compact-control-height-md) + var(--dss-spacing-4))`.

---

### `thumbnail`

```typescript
thumbnail?: boolean
// Padrão: false
```

Configura a seção como container de thumbnail. A min-width desta seção é herdada do Quasar (`.q-item__section--thumbnail`) e **não é gerenciada por tokens DSS**. Decisão intencional: o override é desnecessário para o escopo atual de DssItemSection.

> **Nota de governança:** Diferentemente das seções `avatar` e `side` (cujos espaçamentos são sobrescritos via EXC-01 com tokens DSS), a seção `thumbnail` não possui override DSS correspondente. O valor de min-width é o padrão interno do Quasar.

---

### `side`

```typescript
side?: boolean
// Padrão: false
```

Indica que a seção é lateral/secundária. Geralmente usada à direita do item para ações, metadados ou indicadores.

**Override Quasar (EXC-01):** Substitui `padding-right` nativo do Quasar por `var(--dss-spacing-4)`.

---

### `top`

```typescript
top?: boolean
// Padrão: false
```

Alinha o conteúdo da seção ao topo (`align-items: flex-start`). Usado em itens com múltiplas linhas de texto onde a seção lateral deve ancorar ao topo em vez de centralizar.

---

### `noWrap`

```typescript
noWrap?: boolean
// Padrão: false
```

Impede a quebra de linha do conteúdo interno (`white-space: nowrap`). O conteúdo é truncado quando excede a largura disponível.

---

## Props Bloqueadas

Nenhuma. A API do QItemSection é minimalista e focada exclusivamente em layout, sem divergências arquiteturais que exijam bloqueio de props.

---

## Slots

### `default`

Conteúdo da seção. Aceita qualquer componente DSS ou elemento HTML.

```vue
<!-- Seção de avatar (leading) -->
<DssItemSection avatar>
  <DssAvatar color="primary" icon="person" />
</DssItemSection>

<!-- Seção principal -->
<DssItemSection>
  <DssItemLabel label="Ana Silva" caption="Administradora" />
</DssItemSection>

<!-- Seção lateral (trailing) -->
<DssItemSection side>
  <DssIcon name="chevron_right" />
</DssItemSection>
```

**Componentes idiomáticos DSS por posição:**

| Posição | Props | Componentes Recomendados |
|---------|-------|--------------------------|
| Leading | `avatar=true` | DssAvatar, DssIcon, DssCheckbox, DssRadio |
| Principal | (padrão) | DssItemLabel, texto, DssIcon |
| Trailing | `side=true` | DssIcon, DssBadge, DssButton (flat/round), DssToggle |
| Thumbnail | `thumbnail=true` | `<img>`, DssAvatar (large) |

---

## Eventos

Nenhum. DssItemSection é não-interativo.

---

## Atributos Herdados (`$attrs`)

DssItemSection usa `inheritAttrs: false` e aplica `v-bind="$attrs"` no `<q-item-section>` raiz. Atributos extras (`id`, `class`, `data-*`) são aplicados ao container da seção.

---

## Estados

| Estado | Aplicável | Justificativa |
|--------|-----------|---------------|
| `default` | ✅ | Estado base da seção |
| `hover` | ❌ | Pertence ao DssItem pai |
| `focus` | ❌ | Pertence ao DssItem pai |
| `active` | ❌ | Pertence ao DssItem pai |
| `disabled` | ❌ | Pertence ao DssItem pai |
| `loading` | ❌ | Pertence ao consumidor |
| `error` | ❌ | Pertence ao consumidor |
| `indeterminate` | ❌ | Não aplicável a seções de layout |

---

## Classes CSS Geradas

| Classe | Condição |
|--------|----------|
| `dss-item-section` | Sempre (base) |
| `dss-item-section--avatar` | `avatar=true` |
| `dss-item-section--thumbnail` | `thumbnail=true` |
| `dss-item-section--side` | `side=true` |
| `dss-item-section--top` | `top=true` |
| `dss-item-section--nowrap` | `noWrap=true` |

**Nota:** As classes `q-item__section--*` são adicionadas pelo QItemSection nativo. As classes `dss-item-section--*` são adicionadas pelo wrapper DSS para extensões futuras.

---

## Exceções Documentadas

| ID | Valor / Seletor | Local | Justificativa |
|----|-----------------|-------|---------------|
| EXC-01 | `.dss-item-section.q-item__section--side/avatar` | `2-composition/_base.scss` | Gate de Composição v2.4. Override de CSS Quasar com tokens DSS. Única forma de garantir ritmo visual DSS. |
| EXC-02 | `ButtonText` (system keyword) | `4-output/_states.scss` | Forced-colors. System keywords obrigatórios — tokens CSS ignorados pelo navegador neste modo. |

---

## Paridade com Golden Reference (DssAvatar)

| Característica | DssAvatar | DssItemSection | Diferença | Justificativa |
|----------------|-----------|----------------|-----------|---------------|
| Não-interativo | ✅ | ✅ | Igual | — |
| Touch target | Option A/B (condicional) | Option B (sempre) | Diferente | DssItemSection nunca é clicável diretamente |
| `inheritAttrs: false` | ✅ | ✅ | Igual | — |
| `defineOptions({ name })` | ✅ | ✅ | Igual | — |
| `v-bind="$attrs"` | ✅ | ✅ | Igual | — |
| Tokens de tamanho | `--dss-compact-control-height-*` | `--dss-compact-control-height-md` (calc) | Diferente | DssItemSection usa o token para calcular min-width, não para própria altura |
| Brand via `data-brand` | ✅ | ❌ | Diferente | DssItemSection herda brand via ancestral, não o define |

---

## Paridade com Golden Context (DssList)

| Característica | DssList | DssItemSection | Diferença | Justificativa |
|----------------|---------|----------------|-----------|---------------|
| Container não-interativo | ✅ | ✅ | Igual | — |
| `inheritAttrs: false` + `v-bind="$attrs"` | ✅ | ✅ | Igual | — |
| EXC para override Quasar | EXC-06 (seletor descendente) | EXC-01 (seletor composto) | Diferente | DssList override CSS own; DssItemSection override CSS do QItemSection wrappee |
| Wrapper de componente Quasar | QList | QItemSection | Diferente | Nível hierárquico diferente |
| role semântico | `role="list"` | Herdado (div sem role) | Diferente | DssList requer semântica de lista; DssItemSection é elemento de apresentação |
| Brand direta | ✅ | ❌ | Diferente | Brand no nível de lista/item, não no nível de seção |
| Estados não aplicáveis | hover/focus/active/disabled/loading/error | Mesmos | Igual | Ambos não-interativos |
