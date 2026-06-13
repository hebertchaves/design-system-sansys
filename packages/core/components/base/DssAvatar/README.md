# DssAvatar

Status: ✅ Selo DSS v2.2 | Auditoria Final: 02/02/2026

Componente de avatar do Design System Sansys para representação visual de usuários, entidades ou placeholders.

## Quick Start

```vue
<template>
  <!-- Com iniciais -->
  <DssAvatar color="primary">JD</DssAvatar>

  <!-- Com ícone -->
  <DssAvatar icon="person" color="secondary" />

  <!-- Com imagem -->
  <DssAvatar aria-label="João Silva">
    <img src="/avatar.jpg" alt="João Silva" />
  </DssAvatar>
</template>

<script setup>
import { DssAvatar } from '@sansys/design-system'
</script>
```

## Quando usar

- Representar um usuário identificado (iniciais, foto, ícone)
- Indicar status de presença (online, away, busy, offline)
- Grupos de avatares sobrepostos (avatar stack)

## Quando NÃO usar

- Para ícones genéricos sem identidade → usar `DssIcon`
- Para imagens de conteúdo (produto, banner) → usar `DssImg`

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | `'md'` | Tamanho predefinido ou CSS unit |
| `fontSize` | `string \| null` | `null` | Tamanho de fonte customizado (CSS unit) |
| `icon` | `string \| null` | `null` | Nome do ícone Material Icons |
| `color` | `string \| null` | `null` | Cor de fundo (classes `.bg-*`) |
| `textColor` | `string \| null` | `null` | Cor do texto/ícone (classes `.text-*`) |
| `shape` | `'circular' \| 'rounded' \| 'square'` | `'circular'` | Forma do avatar |
| `rounded` | `boolean` | `false` | Atalho para `shape="rounded"` |
| `square` | `boolean` | `false` | Atalho para `shape="square"` |
| `status` | `'online' \| 'away' \| 'busy' \| 'offline' \| null` | `null` | Indicador de status de presença |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Brand override |
| `ariaLabel` | `string \| undefined` | `undefined` | Label ARIA para screen readers |
| `alt` | `string \| undefined` | `undefined` | Alt text para imagens no slot |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do avatar: texto (iniciais), `<img>`, ou qualquer elemento |

## Events

Nenhum evento emitido. `DssAvatar` é um componente de exibição puro.

## Tamanhos predefinidos

| Size | Width/Height | Font Size | Icon Size |
|------|--------------|-----------|-----------|
| `xs` | 32px | 12px | 16px |
| `sm` | 40px | 14px | 20px |
| `md` | 48px | 16px | 24px |
| `lg` | 64px | 18px | 32px |
| `xl` | 80px | 20px | 48px |

## Estados Visuais

| Estado | Comportamento |
|--------|---------------|
| **hover** | Não aplicável — DssAvatar não é interativo |
| **focus** | Não aplicável — DssAvatar não é interativo |
| **active** | Não aplicável — DssAvatar não é interativo |
| **disabled** | Não aplicável — DssAvatar não é interativo |
| **status: online** | Indicador verde `--dss-positive` no canto inferior direito |
| **status: away** | Indicador amarelo `--dss-warning` |
| **status: busy** | Indicador vermelho `--dss-negative` |
| **status: offline** | Indicador cinza `--dss-neutral-400` |

Quando DssAvatar é usado como gatilho de um controle interativo (ex: menu de perfil), o estado interativo é responsabilidade do componente pai.

## Exemplos

### Formas

```vue
<DssAvatar color="primary">JD</DssAvatar>            <!-- circular (default) -->
<DssAvatar rounded color="secondary">AB</DssAvatar>  <!-- rounded -->
<DssAvatar square color="accent">XY</DssAvatar>      <!-- square -->
```

### Status de presença

```vue
<DssAvatar status="online" color="primary">JD</DssAvatar>
<DssAvatar status="away" color="secondary">AB</DssAvatar>
<DssAvatar status="busy" color="accent">XY</DssAvatar>
<DssAvatar status="offline" color="info">ZZ</DssAvatar>
```

### Brandabilidade

```vue
<DssAvatar brand="hub" icon="person" />
<DssAvatar brand="water" icon="person" />
<DssAvatar brand="waste" icon="person" />
```

### Grupo de avatares (avatar stack)

```vue
<div class="dss-avatar-group">
  <DssAvatar color="primary">JD</DssAvatar>
  <DssAvatar color="secondary">AB</DssAvatar>
  <DssAvatar color="accent">+5</DssAvatar>
</div>
```

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-compact-control-height-xs` | Dimensão xs (32px) |
| `--dss-compact-control-height-sm` | Dimensão sm (40px) |
| `--dss-compact-control-height-md` | Dimensão md (48px) |
| `--dss-compact-control-height-lg` | Dimensão lg (64px) |
| `--dss-compact-control-height-xl` | Dimensão xl (80px) |
| `--dss-radius-full` | Forma circular |
| `--dss-radius-md` | Forma rounded |
| `--dss-positive` | Status online |
| `--dss-warning` | Status away |
| `--dss-negative` | Status busy |
| `--dss-neutral-400` | Status offline |
| `--dss-hub-600` | Brand Hub |
| `--dss-water-500` | Brand Water |
| `--dss-waste-600` | Brand Waste |

## Acessibilidade

- Avatar identificado → fornecer `aria-label` ou garantir que o contexto o identifique
- Avatar com imagem → `alt` descritivo na tag `<img>` dentro do slot
- Quando usado como gatilho interativo → envolver em elemento focusável (`button`, etc.)

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [DssAvatar.md](./DssAvatar.md) | Normativo — governança, anti-patterns, decisões |
| [DSSAVATAR_API.md](./DSSAVATAR_API.md) | API Reference — props completas, tipos, tokens |
