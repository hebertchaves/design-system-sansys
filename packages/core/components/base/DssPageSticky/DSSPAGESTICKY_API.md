# DSSPAGESTICKY_API.md — DssPageSticky API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `PageStickyPosition` | `'bottom-right'` | Posição na viewport onde o elemento fixo será ancorado. |
| `offset` | `[number, number]` | `[18, 18]` | Deslocamento `[x, y]` em pixels a partir da posição definida. |
| `expand` | `Boolean` | `false` | Expande para ocupar toda a largura ou altura da borda definida por `position`. |
| `elevated` | `Boolean` | `false` | **Prop DSS exclusiva.** Aplica sombra de elevação (`--dss-elevation-2`) ao container fixo. |

### Tipo: `PageStickyPosition`

```typescript
type PageStickyPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
```

### Props repassadas via `$attrs`

Atributos HTML não declarados como props DSS são repassados ao elemento `<q-page-sticky>`:

| Atributo | Exemplo | Uso |
|----------|---------|-----|
| `aria-label` | `aria-label="Ações flutuantes"` | Descreve a região para leitores de tela |
| `data-*` | `data-testid="sticky-fab"` | Atributos de teste |

### Props Bloqueadas

Nenhuma prop do QPageSticky é bloqueada. Todas as props de posicionamento são repassadas explicitamente.

---

## Slots

| Slot | Description |
|------|-------------|
| `default` | Conteúdo fixo. Aceita qualquer elemento DSS: `DssButton` (FAB), banners, CTAs persistentes. |

---

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| — | — | DssPageSticky não emite eventos. É container estrutural puro. |

---

## Tokens Utilizados

| Token | Valor Resolvido | Uso |
|-------|----------------|-----|
| `--dss-z-index-sticky` | `1020` | Z-index base do elemento fixo. Posiciona acima de dropdowns (1000), abaixo de modais (1050). |
| `--dss-elevation-2` | `var(--dss-shadow-md)` | Sombra de elevação quando `elevated=true`. |

**Referência de hierarquia de z-index:**
```
base (1) < dropdown (1000) < sticky (1020) < fixed (1030) < backdrop (1040) < modal (1050) < tooltip (1070)
```

---

## CSS Classes

| Class | Trigger | Description |
|-------|---------|-------------|
| `.dss-page-sticky` | Sempre | Classe raiz. Aplica `z-index: var(--dss-z-index-sticky)`. |
| `.dss-page-sticky--elevated` | `elevated=true` | Aplica `box-shadow: var(--dss-elevation-2)`. |

---

## Comportamentos Implícitos

| Comportamento | Descrição |
|--------------|-----------|
| **Forwarding de $attrs** | `inheritAttrs: false` + `v-bind="$attrs"` no `<q-page-sticky>`. Atributos HTML são repassados ao elemento raiz. |
| **Offset do layout** | QPageSticky respeita offsets de DssHeader/DssFooter via `--q-header-offset`/`--q-footer-offset` do QLayout. |
| **position: fixed** | O elemento raiz usa `position: fixed`. Em `@media print`, é substituído por `position: static`. |
| **Reatividade de offset** | A prop `offset` aceita array reativo — alterações em runtime reposicionam o elemento. |

---

## Contexto Obrigatório

```vue
<!-- DssPageSticky requer este contexto para funcionar -->
<DssLayout>
  <DssPageContainer>
    <DssPage>
      <!-- conteúdo da página -->
      <DssPageSticky position="bottom-right" :offset="[18, 18]">
        <!-- conteúdo fixo -->
      </DssPageSticky>
    </DssPage>
  </DssPageContainer>
</DssLayout>
```
