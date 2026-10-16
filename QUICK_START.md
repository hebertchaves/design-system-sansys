# 🚀 Quick Start — DSS (Design System Sansys)

> **✨ v2.5.0 (Monorepo)**: 91 componentes (88 selados), TypeScript + Composition API, Sass `@use`/`@forward`, CSS Cascade Layers para isolamento do Quasar.

> ♻️ **Reescrito na Onda P1 (Jun/2026)** — a versão anterior referenciava a estrutura pré-monorepo (`quasar-to-figma-converter/dss/`), que não existe mais.

---

## ⚡ Comece em 4 passos

### Passo 0 — Pré-requisitos (uma vez por máquina)

- **Git**.
- **Node.js 22 LTS** ([nodejs.org](https://nodejs.org)). O mínimo é **20.19**: o Sass exige
  `>=20.19.0` e o Vitest recusa versões antigas. A versão está declarada em `.nvmrc` (quem usa
  `nvm` roda `nvm use`) e em `engines` no `package.json` — com Node antigo, o `npm install`
  avisa `EBADENGINE`.
- **No Windows:** clone numa pasta do Windows e rode pelo terminal do Windows. Se usar **WSL**,
  clone **dentro do Linux** (`~/projetos/...`), não em `/mnt/c/...`: nesse caminho o
  servidor fica lento e demora a perceber edições (ver o comentário de `watch` em
  `apps/sandbox/vite.config.js`).

### Passo 1 — Instalar dependências (raiz do monorepo, uma vez)

```bash
npm install
```

Use **npm** — o lockfile único é o `package-lock.json`, e é o que o pipeline usa (`npm ci`).
Se aparecer um `bun.lock`, ele é resíduo do Lovable e está no `.gitignore`.

### Passo 2 — Subir o sandbox (playground de componentes)

```bash
npm run sandbox:dev
```

O Vite imprime a URL local (ex.: `http://localhost:5173`). O sandbox compila o
SCSS do core ao vivo e carrega o Quasar isolado em `@layer quasar`. Não é preciso
compilar o core antes. `Ctrl+C` encerra.

### Passo 3 — Explorar

- **TestSuite**: índice de páginas de teste por componente
- Troque **brand** (Hub/Water/Waste) e **tema** (light/dark) pelos controles das páginas

### Só para quem vai commitar — instalar os gates

```bash
npm run setup:hooks
```

Copia o `pre-commit` (os gates do DSS) para `.git/hooks/`. **O `npm install` não faz isso** —
sem este passo, o commit passa sem nenhuma verificação. No Windows, rode no Git Bash ou no
WSL (o script usa `cp` e `chmod`).

### Problemas comuns

| Sintoma | Causa e saída |
|---|---|
| `EBADENGINE` ou erro de sintaxe ao instalar/rodar | Node anterior a 20.19 — instale o 22 |
| Edito um arquivo e a tela não muda | Projeto em `/mnt/c` no WSL — mova para dentro do Linux, ou reinicie o `sandbox:dev` |
| Prop nova de um componente não aparece | Cache de tipos do compilador SFC — reinicie o `sandbox:dev` |

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
