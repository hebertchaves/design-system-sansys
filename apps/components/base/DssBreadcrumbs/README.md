# DssBreadcrumbs — Trilha de Navegação DSS

**Container de trilha de navegação** baseado no Quasar QBreadcrumbs, implementado com arquitetura DSS em 4 camadas.

> **📋 Documentação Completa:** [DssBreadcrumbs.md](./DssBreadcrumbs.md)
> **📘 API Reference:** [DSSBREADCRUMBS_API.md](./DSSBREADCRUMBS_API.md)
> Este README é um guia rápido. Para documentação normativa completa (Template 13.1), consulte **DssBreadcrumbs.md**.

---

## 🚀 Quick Start

### Instalação

```javascript
import { DssBreadcrumbs } from '@/dss/components/base/DssBreadcrumbs'
import { DssBreadcrumbsEl } from '@/dss/components/base/DssBreadcrumbsEl'
```

### Uso Básico

```vue
<DssBreadcrumbs aria-label="Trilha de navegação">
  <DssBreadcrumbsEl to="/home" label="Início" />
  <DssBreadcrumbsEl to="/produtos" label="Produtos" />
  <DssBreadcrumbsEl label="Fone de Ouvido Pro" aria-current="page" />
</DssBreadcrumbs>
```

### Com Ícones

```vue
<DssBreadcrumbs separator=">" aria-label="Trilha de navegação com ícones">
  <DssBreadcrumbsEl to="/home" icon="home" label="Início" />
  <DssBreadcrumbsEl to="/produtos" icon="shopping_cart" label="Produtos" />
  <DssBreadcrumbsEl icon="headphones" label="Fone Pro" aria-current="page" />
</DssBreadcrumbs>
```

### Com Brand

```vue
<div data-brand="hub">
  <DssBreadcrumbs aria-label="Trilha Hub">
    <DssBreadcrumbsEl to="/home" label="Início" />
    <DssBreadcrumbsEl label="Configurações" aria-current="page" />
  </DssBreadcrumbs>
</div>
```

---

## ⚠️ Regra de Ouro: aria-current="page"

O `DssBreadcrumbs` **NÃO injeta automaticamente** `aria-current="page"` no último item.

**Sempre declare explicitamente no último `DssBreadcrumbsEl`:**

```vue
<!-- ❌ INCORRETO: último item sem aria-current -->
<DssBreadcrumbs>
  <DssBreadcrumbsEl to="/home" label="Início" />
  <DssBreadcrumbsEl label="Página Atual" />   <!-- Sem aria-current! -->
</DssBreadcrumbs>

<!-- ✅ CORRETO: último item com aria-current="page" -->
<DssBreadcrumbs>
  <DssBreadcrumbsEl to="/home" label="Início" />
  <DssBreadcrumbsEl label="Página Atual" aria-current="page" />
</DssBreadcrumbs>
```

---

## 📁 Estrutura de Arquivos

```
DssBreadcrumbs/
├── 1-structure/
│   └── DssBreadcrumbs.ts.vue        (template + props + CSS custom properties)
│
├── 2-composition/
│   └── _base.scss                   (container layout + separador tipografia/cor)
│
├── 3-variants/
│   ├── _gutter.scss                 (modificadores BEM de gutter — documentação)
│   └── index.scss                   (orquestrador)
│
├── 4-output/
│   ├── _states.scss                 (dark mode, forced-colors, high contrast, print)
│   ├── _brands.scss                 (Hub, Water, Waste — separador brandado)
│   └── index.scss                   (orquestrador)
│
├── composables/
│   ├── useBreadcrumbsClasses.ts     (lógica de classes BEM)
│   └── index.ts                     (barrel export)
│
├── types/
│   └── breadcrumbs.types.ts         (TypeScript interfaces)
│
├── DssBreadcrumbs.module.scss       # Orquestrador principal (L2 → L3 → L4)
├── DssBreadcrumbs.vue               # Entry point wrapper (re-export puro)
├── DssBreadcrumbs.example.vue       # 5 cenários de uso
├── DssBreadcrumbs.md                # Documentação completa (Template 13.1)
├── DSSBREADCRUMBS_API.md            # API Reference
├── dss.meta.json                    # Metadados DSS
├── index.js                         # Barrel export
└── README.md                        # Este arquivo
```

---

## 🎯 Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `separator` | `string` | `'/'` | Caractere separador entre os itens. |
| `separatorColor` | `string` | `'subtle'` | Cor do separador (`subtle`, `body`, `disabled`). |
| `gutter` | `'sm' \| 'md' \| 'lg'` | `'md'` | Espaçamento entre os itens (8px / 12px / 16px). |
| `align` | `'left' \| 'center' \| 'right' \| 'between' \| 'around'` | `'left'` | Alinhamento horizontal. |
| `brand` | `'hub' \| 'water' \| 'waste'` | `undefined` | Marca Sansys — acentua cor do separador. |

**Props bloqueadas:** `active-color`, `separator-class`.

---

## 🔑 Exemplos

### Separador Customizado

```vue
<DssBreadcrumbs separator="›">
  <DssBreadcrumbsEl to="/home" label="Início" />
  <DssBreadcrumbsEl label="Página" aria-current="page" />
</DssBreadcrumbs>
```

### Alinhamento Central

```vue
<DssBreadcrumbs align="center">
  <DssBreadcrumbsEl to="/home" label="Início" />
  <DssBreadcrumbsEl label="Página" aria-current="page" />
</DssBreadcrumbs>
```

### Gutter Compacto

```vue
<DssBreadcrumbs gutter="sm">
  <DssBreadcrumbsEl to="/home" label="Início" />
  <DssBreadcrumbsEl label="Página" aria-current="page" />
</DssBreadcrumbs>
```

---

## ♿ Acessibilidade

| Recurso | Implementação |
|---------|--------------|
| Role semântico | `role="navigation"` via QBreadcrumbs nativo |
| Label acessível | `aria-label` via `$attrs` (consumidor declara) |
| Separadores | `aria-hidden="true"` via QBreadcrumbs nativo |
| `aria-current="page"` | Responsabilidade do consumidor — último `DssBreadcrumbsEl` |
| Touch target | Delegado a cada `DssBreadcrumbsEl` filho |
| Navegação por teclado | Via Tab em cada `DssBreadcrumbsEl` clicável |

---

## 🔧 Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-spacing-2` | Gutter sm (8px) |
| `--dss-spacing-3` | Gutter md (12px, padrão) |
| `--dss-spacing-4` | Gutter lg (16px) |
| `--dss-font-size-sm` | Tamanho de fonte dos separadores |
| `--dss-line-height-sm` | Line-height dos separadores |
| `--dss-text-subtle` | Cor dos separadores (padrão) |
| `--dss-border-width-thin` | Outline em prefers-contrast: high |
| `--dss-radius-sm` | Border-radius outline high contrast |
| `--dss-font-weight-bold` | Peso dos separadores em high contrast |
| `--dss-hub-600`, `--dss-hub-400` | Brand Hub |
| `--dss-water-500`, `--dss-water-400` | Brand Water |
| `--dss-waste-600`, `--dss-waste-500` | Brand Waste |

---

**Criado:** 11 de Abril de 2026
**Fase:** 2 (Componente Composto — Nível 2)
**Golden Reference:** DssBtnGroup | **Golden Context:** DssCard
