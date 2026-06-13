# DssPagination

Componente de paginação do Design System Sansys. Encapsula o `QPagination` do Quasar como motor, aplicando tokens DSS de forma não-intrusiva via sobreescrita da propriedade CSS `--q-color-primary`.

## Quando usar

- Listas e tabelas com mais de uma página de resultados.
- Conteúdo extenso dividido em seções navegáveis (artigos, cards, itens de busca).
- Qualquer contexto onde o usuário precise saltar para uma página específica.

## Quando NÃO usar

- Listas curtas onde todos os itens cabem em uma tela (use scroll simples).
- Carregamento progressivo por scroll (use `DssInfiniteScroll`).
- Navegação por abas ou seções fixas (use `DssTabs`).

## Quick Start

```vue
<template>
  <DssPagination v-model="page" :max="20" />
</template>

<script setup>
import { ref } from 'vue'
import { DssPagination } from '@dss/components'

const page = ref(1)
</script>
```

## Exemplos

### Padrão
```vue
<DssPagination v-model="page" :max="10" />
```

### Com links de navegação e limite
```vue
<DssPagination v-model="page" :max="50" direction-links boundary-links :max-pages="7" />
```

### Variante round com marca
```vue
<DssPagination v-model="page" :max="8" round brand="hub" />
```

### Variante outline, size sm
```vue
<DssPagination v-model="page" :max="15" outline size="sm" />
```

### Desabilitado
```vue
<DssPagination v-model="page" :max="10" disable />
```

## Modos

| Prop | Comportamento |
|---|---|
| `flat` | Botão ativo sem preenchimento — apenas cor de texto |
| `outline` | Botão ativo com borda colorida |
| `round` | Todos os botões com `border-radius: full` |

## Brandabilidade

```vue
<!-- Hub (laranja) -->
<DssPagination v-model="page" :max="10" brand="hub" />

<!-- Water (azul) -->
<DssPagination v-model="page" :max="10" brand="water" />

<!-- Waste (verde) -->
<DssPagination v-model="page" :max="10" brand="waste" />
```

O contexto de marca também pode ser herdado de um ancestor:
```vue
<div data-brand="hub">
  <DssPagination v-model="page" :max="10" />
</div>
```

## Estados

| Estado | Como ativar | Comportamento visual |
|---|---|---|
| Default | — | Botão ativo com `--dss-action-primary` |
| Hover | Cursor sobre botão | Overlay de `--dss-action-primary` com opacidade |
| Focus | Tab / teclado | Focus ring via `dss-focus-ring` mixin |
| Active | Clique/press | Overlay de pressed |
| Disabled | `disable` prop | `opacity: --dss-opacity-disabled`, sem interação |
| Readonly | `readonly` prop | Sem interação, aparência normal |

## Acessibilidade

- Container raiz: `role="navigation"` + `aria-label` configurável.
- Página ativa: `aria-current="true"` gerenciado pelo QPagination internamente.
- Foco visível em todos os botões via `:focus-visible`.
- Suporte completo a navegação por teclado (Tab + Enter/Space).

## Links

- [API Reference](./DSSPAGINATION_API.md)
- [Documentação normativa](./DssPagination.md)
- [Exemplos interativos](./DssPagination.example.vue)
- [Metadados de governança](./dss.meta.json)
