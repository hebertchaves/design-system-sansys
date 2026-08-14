# @sansys/design-system

> Núcleo do **Design System Sansys (DSS)** — componentes Vue 3, tokens semânticos e temas. É o pacote publicável consumido pelas aplicações.

[![Version](https://img.shields.io/badge/version-2.5.0-blue.svg)](../../CHANGELOG.md)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](../../LICENSE)
[![WCAG](https://img.shields.io/badge/WCAG-2.1%20AA-success.svg)](#)

Camada corporativa de design e engenharia construída **sobre o Quasar Framework** (não é uma biblioteca standalone). Fornece tokens semânticos, brandabilidade (Hub, Water, Waste), governança visual e acessibilidade WCAG 2.1 AA.

## Conteúdo

```
packages/core/
├── components/
│   ├── base/         # 76 componentes atômicos (DssButton, DssChip, DssInput…)
│   ├── composed/     # 12 componentes compostos (DssDialog, DssTable, DssForm…)
│   └── stress-test/  # 2 componentes de stress (NÃO exportados ao público)
├── tokens/           # Design tokens --dss-* (cores, spacing, tipografia, a11y)
├── themes/           # Bridge Quasar (--q-* → --dss-*)
├── composables/      # Lógica compartilhada (useBrand, useColorClasses…)
└── index.js          # Barrel export + import './index.scss' (tokens no bundle)
```

Cada componente segue a **arquitetura de 4 camadas** obrigatória do DSS
(`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`) — ver
[`docs/reference/DSS_COMPONENT_ARCHITECTURE.md`](../../docs/reference/DSS_COMPONENT_ARCHITECTURE.md).

## Uso

```js
// Plugin global (todos os componentes)
import DesignSystemSansys from '@sansys/design-system'
import '@sansys/design-system/css'   // tokens + estilos (dist/style.css)

app.use(DesignSystemSansys)
```

```vue
<!-- Ou por componente (tree-shakeable) -->
<script setup>
import { DssButton } from '@sansys/design-system'
</script>

<template>
  <DssButton color="primary" label="Salvar" />
</template>
```

**Brandabilidade:** aplique `data-brand` no `<body>` (norma que cobre overlays
teleportados como DssDialog):

```js
document.body.dataset.brand = 'water' // hub | water | waste
```

## Scripts

| Comando (a partir da raiz do monorepo) | O que faz |
|---|---|
| `npm run core:build` | Build da lib → `dist/` (js + css com tokens) |
| `npx vitest run --project unit` *(neste pacote)* | Suíte unitária dos componentes |
| `npm run type-check` *(neste pacote)* | `vue-tsc --noEmit` (ver baseline em `docs/governance/audit-reports/`) |

## Pontos de saída

- `.` → `dist/dss.es.js` (ESM) / `dist/dss.umd.js` (UMD)
- `./css` → `dist/style.css` (tokens `:root` + estilos de todos os componentes)

## Governança

Este pacote é **normativo**: a criação/alteração de componentes exige leitura
prévia dos documentos listados em [`CLAUDE.md`](../../CLAUDE.md) e a passagem
pelo Gate de Validação Final. Índice de selos:
[`docs/governance/CERTIFIED_COMPONENTS.md`](../../docs/governance/CERTIFIED_COMPONENTS.md).

---

Software proprietário — © 2025–2026 JTECH - SOLUÇÕES EM INFORMÁTICA LTDA. Ver [LICENSE](../../LICENSE).
