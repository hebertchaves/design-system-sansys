# 🚀 Quick Start — DSS (Design System Sansys)

> **✨ v2.4.0 (Monorepo)**: 91 componentes (88 selados), TypeScript + Composition API, Sass `@use`/`@forward`, CSS Cascade Layers para isolamento do Quasar.

> ♻️ **Reescrito na Onda P1 (Jun/2026)** — a versão anterior referenciava a estrutura pré-monorepo (`quasar-to-figma-converter/dss/`), que não existe mais.

---

## ⚡ Comece em 3 passos

### Passo 1 — Instalar dependências (raiz do monorepo, uma vez)

```bash
npm install
```

### Passo 2 — Subir o sandbox (playground de componentes)

```bash
npm run sandbox:dev
```

O Vite imprime a URL local (ex.: `http://localhost:5173`). O sandbox compila o
SCSS do core ao vivo e carrega o Quasar isolado em `@layer quasar`.

### Passo 3 — Explorar

- **TestSuite**: índice de páginas de teste por componente
- Troque **brand** (Hub/Water/Waste) e **tema** (light/dark) pelos controles das páginas

---

## 🗺️ Estrutura do Monorepo

```
DSS/
├── packages/
│   ├── core/              ← @sansys/design-system (componentes, tokens, themes)
│   │   ├── components/    ← base/ · composed/ · stress-test/
│   │   ├── tokens/        ← Design tokens (--dss-*)
│   │   └── themes/        ← Bridge Quasar (--q-* → --dss-*)
│   ├── mcp/               ← Servidor MCP do DSS
│   └── grid-inspector/    ← Utilitário de inspeção de grid
├── apps/
│   ├── sandbox/           ← Playground Vue (dev)
│   └── docs-portal/       ← Portal de documentação (React + Tailwind)
└── docs/                  ← Normativos, guias e governança
```

---

## 🔧 Comandos principais

| Comando | O que faz |
|---|---|
| `npm run sandbox:dev` | Playground de componentes (Vue + Vite) |
| `npm run docs:dev` | Portal de documentação local |
| `npm run core:build` | Build da lib (`packages/core/dist/` — js + css com tokens) |
| `npm run docs:build` | Build do portal |
| `npm run build:all` | Core + portal + MCP |
| `npx vitest run --project unit` *(em `packages/core`)* | Testes unitários dos componentes |
| `npm run sync:all` | Sincroniza tokens → meta.json → contrato visual |
| `npm run sync:portal-tokens` | Sincroniza tokens do core para o docs-portal |
| `npm run setup:hooks` | Instala o pre-commit hook (sync automático do contrato visual) |

---

## 📦 Consumindo a lib

```js
// Plugin global (todos os componentes)
import DesignSystemSansys from '@sansys/design-system'
import '@sansys/design-system/css' // tokens + estilos (dist/style.css)

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

**Brandabilidade:** aplique `data-brand` no `<body>` (norma — cobre overlays
teleportados como DssDialog):

```js
document.body.dataset.brand = 'water' // hub | water | waste
```

---

## 🆘 Problemas comuns

### "Componente sem estilo no meu app"
Confirme a importação do CSS da lib (`@sansys/design-system/css`). Sem ela,
as variáveis `--dss-*` não existem.

### "Brand não aplica em Dialog/BottomSheet"
`data-brand` precisa estar no `<body>` (conteúdo é teleportado para fora do
`#app`). Ver `docs/guides/DSS_IMPLEMENTATION_GUIDE.md` — Brandabilidade.

### "Sass não compila"
Use Node 20+ e reinstale na raiz (`npm install`). O monorepo usa
`sass-embedded` via workspaces.

---

## 📚 Próximos passos

| Documento | Para quê |
|---|---|
| `docs/AGENT_QUICKSTART.md` | Ponto de entrada para agentes de IA |
| `docs/reference/DSS_ARCHITECTURE.md` | Arquitetura do sistema |
| `docs/reference/DSS_TOKEN_REFERENCE.md` | Catálogo oficial de tokens |
| `docs/guides/DSS_IMPLEMENTATION_GUIDE.md` | Tokens, estados, acessibilidade, brand |
| `docs/governance/CERTIFIED_COMPONENTS.md` | Índice de selos por componente |
| `CLAUDE.md` | Regras normativas para agentes |
