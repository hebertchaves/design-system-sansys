# DssIcon

Componente base estrutural do Design System Sansys para exibição de ícones.

## Quick Start

```vue
<template>
  <!-- Ícone com significado semântico (aria-label obrigatório) -->
  <DssIcon name="home" aria-label="Página inicial" />

  <!-- Ícone decorativo (aria-hidden automático) -->
  <DssIcon name="star" :decorative="true" />

  <!-- Ícone com cor semântica -->
  <DssIcon name="check_circle" color="positive" aria-label="Sucesso" />

  <!-- Ícone com brand -->
  <DssIcon name="business" brand="hub" aria-label="Hub" />

  <!-- Ícone com animação de carregamento -->
  <DssIcon name="sync" :spin="true" aria-label="Carregando" />
</template>

<script setup>
import { DssIcon } from '@sansys/design-system'
</script>
```

## Quando usar

- Acompanhar texto para reforço visual (sempre com `aria-label`)
- Ícone como único elemento de ação (botão de ícone)
- Indicadores de estado ou tipo dentro de outros componentes DSS

## Quando NÃO usar

- Para imagens ilustrativas → usar `DssImg`
- Para avatares → usar `DssAvatar` com `icon`
- Como decoração pura sem `decorative: true` → viola acessibilidade

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `name` | `string` | **(obrigatório)** | Nome do ícone Material Icons |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamanho predefinido via tokens |
| `color` | `IconColor \| null` | `null` | Cor semântica; herda do contexto se null |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Brand override |
| `spin` | `boolean` | `false` | Animação de rotação contínua |
| `pulse` | `boolean` | `false` | Animação de pulso |
| `decorative` | `boolean` | `false` | Marca como decorativo (`aria-hidden`) |
| `inline` | `boolean` | `false` | Modo inline: sizing dirigido pelo host (width/height = 1em, font-size = inherit) |
| `ariaLabel` | `string \| undefined` | `undefined` | Label para screen readers |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo customizado (uso avançado: SVG inline, imagem) |

## Events

Nenhum evento emitido. `DssIcon` é um componente de exibição puro.

## Tamanhos

```vue
<DssIcon name="home" size="xs" />  <!-- 16px -->
<DssIcon name="home" size="sm" />  <!-- 20px -->
<DssIcon name="home" size="md" />  <!-- 24px (default) -->
<DssIcon name="home" size="lg" />  <!-- 32px -->
<DssIcon name="home" size="xl" />  <!-- 48px -->
```

## Estados Visuais

| Estado | Comportamento |
|--------|---------------|
| **decorativo** | `opacity: var(--dss-opacity-60)` — ícone visualmente atenuado |
| **spin** | Rotação contínua 360° com `--dss-duration-1000` |
| **pulse** | Animação de pulsação com `--dss-duration-1000` |
| **brand** | Cor substituída pelo token de brand (hub/water/waste) |
| **color** | Cor semântica via classe utilitária `.text-{color}` |

`hover`, `focus` e `active` não se aplicam: `DssIcon` não é interativo. Quando dentro de um controle (ex: `DssButton`), os estados são gerenciados pelo pai.

## Modo Embedded

Quando usado dentro de outro componente DSS, o ícone herda a cor do contexto via `currentColor`:

```vue
<!-- Dentro de DssButton: herda a cor do botão -->
<DssButton color="primary">
  <DssIcon name="send" :decorative="true" />
  Enviar
</DssButton>
```

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-icon-size-xs` | 16px | Tamanho xs |
| `--dss-icon-size-sm` | 20px | Tamanho sm |
| `--dss-icon-size-md` | 24px | Tamanho md (default) |
| `--dss-icon-size-lg` | 32px | Tamanho lg |
| `--dss-icon-size-xl` | 48px | Tamanho xl |
| `--dss-duration-150` | 150ms | Transição de cor |
| `--dss-duration-1000` | 1000ms | Animação spin/pulse |
| `--dss-easing-standard` | cubic-bezier(0.4,0,0.2,1) | Easing padrão |
| `--dss-opacity-60` | 0.6 | Ícone decorativo |
| `--dss-hub-600` | — | Brand Hub (light) |
| `--dss-water-500` | — | Brand Water (light) |
| `--dss-waste-600` | — | Brand Waste (light) |

## Acessibilidade

- Ícone com significado → `aria-label` obrigatório
- Ícone decorativo → usar `:decorative="true"` (aplica `aria-hidden="true"` automaticamente)
- Touch target não se aplica: `DssIcon` não é interativo

## Dependências

- **QIcon** (Quasar Framework) — renderização do ícone
- **Material Icons** — font family padrão

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [DssIcon.md](./DssIcon.md) | Normativo — governança e decisões |
| [DSSICON_API.md](./DSSICON_API.md) | API Reference — props, classes, tokens |
