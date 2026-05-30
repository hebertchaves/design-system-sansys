# DssSkeleton

Placeholder visual de carregamento — simula a estrutura do conteúdo final antes que os dados reais sejam exibidos.

## Quick Start

```vue
<script setup>
import { DssSkeleton } from '@dss/components'
</script>

<template>
  <!-- Bloco retangular padrão -->
  <DssSkeleton width="200px" height="20px" />

  <!-- Texto multilinha -->
  <DssSkeleton type="text" :lines="3" />

  <!-- Avatar -->
  <DssSkeleton type="avatar" />

  <!-- Título -->
  <DssSkeleton type="heading" width="60%" />
</template>
```

> **Requisito**: O elemento pai deve controlar a visibilidade via `v-if` ou `v-show`.
> O `aria-busy="true"` deve ser declarado no container pai enquanto carrega.

## Tipos Disponíveis

| Prop `type` | Descrição | Base Quasar |
|-------------|-----------|-------------|
| `rect` (padrão) | Bloco retangular genérico | `QSkeleton type="rect"` |
| `text` | Linha(s) de texto | `QSkeleton type="text"` |
| `circle` | Forma circular | `QSkeleton type="circle"` |
| `heading` | Barra de título | `QSkeleton type="rect"` (alt. de altura) |
| `avatar` | Círculo de perfil 48×48 | `QSkeleton type="circle"` (alt. de tamanho) |

## Animações

| Prop `animation` | Descrição |
|-----------------|-----------|
| `wave` (padrão) | Onda que percorre horizontalmente |
| `pulse` | Pulso de opacidade |
| `none` | Sem animação (estático) |

## Brand

```vue
<!-- Via prop -->
<DssSkeleton brand="hub" />
<DssSkeleton brand="water" />
<DssSkeleton brand="waste" />

<!-- Via contexto ancestral -->
<div data-brand="hub">
  <DssSkeleton />  <!-- Herda cor hub automaticamente -->
</div>
```

## Links

- [Documentação completa](./DssSkeleton.md)
- [API Reference](./DSSSKELETON_API.md)
- [Exemplos](./DssSkeleton.example.vue)
