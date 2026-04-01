# DssList — API Reference

> Referência técnica completa. Para quick start, veja [README.md](./README.md).

## Classificação

| Campo | Valor |
|-------|-------|
| Fase | 2 — Componente Composto/Estrutural |
| Classificação | Container de Layout Não-Interativo |
| Equivalente Quasar | `QList` |
| Golden Reference | `DssBadge` |
| Golden Context | `DssCard` |
| Subcomponentes | Nenhum (standalone) |
| Dependências de Composição | `DssItem`, `DssSeparator` |

---

## Props

### `bordered`

```typescript
bordered?: boolean
// Padrão: false
```

Aplica borda externa ao container da lista.
Quando `true`, também aplica `border-radius: var(--dss-radius-md)` e `overflow: hidden`.

**Tokens:** `--dss-border-width-thin`, `--dss-gray-300`, `--dss-radius-md`

---

### `padding`

```typescript
padding?: boolean
// Padrão: false
```

Aplica padding vertical (`padding-top` e `padding-bottom`) no container.
Cria espaçamento interno entre a borda e o primeiro/último item.

**Token:** `--dss-spacing-2`

---

### `separator`

```typescript
separator?: boolean
// Padrão: false
```

Aplica divisores automáticos entre todos os filhos diretos da lista.
Implementado via seletor CSS `.dss-list--separator > * + *` (EXC-06).

**Tokens:** `--dss-border-width-thin`, `--dss-gray-200`

> **EXC-06:** Seletor descendente é exceção documentada (Gate de Composição v2.4).
> Aplica apenas `border-top`, sem alterar padding ou layout dos filhos.

---

### `brand`

```typescript
brand?: 'hub' | 'water' | 'waste' | null
// Padrão: null
```

Acento de marca na borda lateral esquerda da lista.
Visualmente relevante apenas quando combinado com `bordered`.

**Tokens Hub:** `--dss-hub-300`, `--dss-hub-400`, `--dss-hub-600`
**Tokens Water:** `--dss-water-200`, `--dss-water-400`, `--dss-water-500`
**Tokens Waste:** `--dss-waste-200`, `--dss-waste-500`, `--dss-waste-600`

---

### `ariaLabel`

```typescript
ariaLabel?: string
// Padrão: undefined
```

Label acessível descrevendo o propósito da lista para leitores de tela.
Recomendado quando o contexto visual não é suficiente para identificar a lista.

---

### `ariaLabelledby`

```typescript
ariaLabelledby?: string
// Padrão: undefined
```

ID do elemento HTML que serve como label da lista.
Alternativa semântica ao `ariaLabel` — use quando há um título visível associado.

---

## Props Bloqueadas (Não Expostas)

| Prop | Motivo |
|------|--------|
| `dark` | Dark mode gerenciado globalmente via `[data-theme="dark"]`. Prop não exposta por decisão arquitetural DSS. |
| `dense` | Densidade é responsabilidade dos filhos (`DssItem`) — controlada individualmente, não forçada pelo container. |

---

## Slots

### `default`

Conteúdo da lista. Espera `DssItem` e/ou `DssSeparator` como filhos diretos.

```vue
<DssList>
  <!-- DssItem com clickable -->
  <DssItem label="Item 1" clickable @click="handleClick" />

  <!-- DssSeparator explícito -->
  <DssSeparator />

  <!-- DssItem estático -->
  <DssItem label="Item 2" />
</DssList>
```

**Nota:** DssList é não-opinativo — aceita qualquer filho via slot. O uso idiomatico DSS é com `DssItem` e `DssSeparator`.

---

## Eventos

Nenhum. DssList é não-interativo. Toda interatividade pertence aos filhos.

---

## Atributos Herdados (`$attrs`)

DssList usa `inheritAttrs: false` e aplica `v-bind="$attrs"` no elemento raiz.
Atributos extras (ex.: `id`, `class`, `data-*`) são aplicados no container da lista.

---

## Estados

| Estado | Aplicável | Justificativa |
|--------|-----------|---------------|
| `default` | ✅ | Estado base da lista |
| `hover` | ❌ | Pertence aos filhos (DssItem) |
| `focus` | ❌ | Pertence aos filhos (DssItem) |
| `active` | ❌ | Pertence aos filhos (DssItem) |
| `disabled` | ❌ | Pertence aos filhos (DssItem) |
| `loading` | ❌ | Pertence ao consumidor |
| `error` | ❌ | Pertence ao consumidor |
| `indeterminate` | ❌ | Não aplicável a listas |

---

## ARIA

```html
<!-- Renderizado pelo DssList -->
<div
  role="list"
  class="dss-list dss-list--bordered"
  aria-label="Lista de usuários"
  data-brand="hub"
>
  <!-- Filhos DssItem renderizam role="listitem" ou role="button" -->
</div>
```

---

## Classes CSS Geradas

| Classe | Condição |
|--------|----------|
| `dss-list` | Sempre (base) |
| `dss-list--bordered` | `bordered=true` |
| `dss-list--padding` | `padding=true` |
| `dss-list--separator` | `separator=true` |
| `dss-list--brand-hub` | `brand="hub"` |
| `dss-list--brand-water` | `brand="water"` |
| `dss-list--brand-waste` | `brand="waste"` |

---

## Paridade com Golden Context (DssCard)

| Característica | DssCard | DssList | Diferença | Justificativa |
|----------------|---------|---------|-----------|---------------|
| `inheritAttrs: false` | ✅ | ✅ | Igual | — |
| `defineOptions({ name })` | ✅ | ✅ | Igual | — |
| `v-bind="$attrs"` | ✅ | ✅ | Igual | — |
| `role` semântico | `role="presentation"` (implícito) | `role="list"` | Diferente | Lista tem semântica específica obrigatória |
| Touch target | Condicional (clickable) | Não aplicável | Diferente | DssList não é interativo |
| `clickable` prop | ✅ | ❌ | Diferente | DssList é sempre não-interativo |
| Brand via `data-brand` | ✅ | ✅ | Igual | — |
| Dark mode por prop | ✅ | ❌ | Diferente | DssList segue governança global |
| `-webkit-tap-highlight-color` | ✅ (clickable) | ❌ | Diferente | Não necessário — sem interatividade |

---

## Paridade com Golden Reference (DssBadge)

| Característica | DssBadge | DssList | Diferença | Justificativa |
|----------------|----------|---------|-----------|---------------|
| Não-interativo | ✅ | ✅ | Igual | — |
| Sem touch target | ✅ | ✅ | Igual | Option B confirmado |
| `aria-hidden` em decorativos | ✅ | N/A | N/A | DssList não tem decorativos próprios |
| Tokens genéricos L2 | ✅ | ✅ | Igual | — |

---

## Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `rgba(255, 255, 255, 0.2)` | `4-output/_states.scss` | Dark mode border. Sem token DSS equivalente. |
| EXC-02 | `rgba(255, 255, 255, 0.12)` | `4-output/_states.scss` | Dark mode separator. Padrão Material Design. |
| EXC-03 | `2px solid ButtonText` | `4-output/_states.scss` | Forced-colors border. System keywords obrigatórios. |
| EXC-04 | `1px solid ButtonText` | `4-output/_states.scss` | Forced-colors separator. Valor absoluto obrigatório. |
| EXC-05 | `4px solid Highlight` | `4-output/_states.scss` | Forced-colors brand accent. Valor absoluto obrigatório. |
| EXC-06 | Seletor descendente | `3-variants/_separator.scss` | Gate de Composição v2.4. Separadores automáticos via CSS. |

---

## Comportamentos Implícitos

### Forwarding de Atributos

`DssList` usa `inheritAttrs: false` + `v-bind="$attrs"` no elemento raiz `<div>`.
Atributos não declarados como props são aplicados ao container.

```vue
<!-- Input do consumidor -->
<DssList id="main-nav" data-testid="nav-list" class="my-custom-class" />

<!-- Renderizado -->
<div
  class="dss-list my-custom-class"
  id="main-nav"
  data-testid="nav-list"
  role="list"
/>
```

### Herança de Estilos pelos Filhos

DssList NÃO sobrescreve estilos internos dos filhos via `::v-deep`.
Os filhos gerenciam seus próprios estilos independentemente.

### `separator` vs `DssSeparator` Manual

As duas abordagens são compatíveis e complementares:

```vue
<!-- Via prop separator (automático) -->
<DssList separator>
  <DssItem label="A" />
  <DssItem label="B" /> <!-- borda automática adicionada aqui -->
</DssList>

<!-- Via DssSeparator manual (controle explícito) -->
<DssList>
  <DssItem label="Grupo 1" />
  <DssSeparator />         <!-- separador com controle total de props -->
  <DssItem label="Grupo 2" />
</DssList>

<!-- Evitar: misturar separator prop com DssSeparator manual (dobra separadores) -->
```
