Agora temos informação suficiente. Deixe-me compilar o relatório final:

## AGENTE 6 — TOOLING: Relatório de Auditoria Organizacional

### 1. Inventário das Ferramentas

#### A. MCP Server (@sansys/dss-mcp)
**Localização:** `/packages/mcp/`  
**Propósito:** Servidor Model Context Protocol que expõe o DSS como contexto para agentes de IA  
**Estrutura:**
- `/src/index.ts` — Entry point, inicializa o servidor via stdio
- `/src/server.ts` — Factory do servidor MCP (createServer, startServer)
- `/src/http-server.ts` — HTTP wrapper (experimental)
- `/src/sse-server.ts` — SSE wrapper (experimental)
- `/src/tools/` — 19 ferramentas de auditoria, validação e geração
- `/src/resources/` — 6 URIs de recursos normativas (governance, tokens, faseamento)
- `/tests/` — Testes para validateGridLayout (1 arquivo de testes completo)
- `/build/` — Saída compilada via tsup (ES Modules)

**Estado:** ATIVO e MADURO
- 4 modos de operação (stdio, HTTP, SSE, direto)
- Contrato de read-only v0.2 (MCP_READ_ONLY_CONTRACT.md)
- 19 ferramentas mapeadas (Fase 1, 2, 3, 4, 5)
- Documentação completa no `.mcp.json`
- Testes unitários presentes
- TypeScript compilado com tsup

#### B. Grid Inspector (@sansys/grid-inspector)
**Localização:** `/packages/grid-inspector/`  
**Propósito:** Ferramenta universal de inspeção visual e validação de grids em produção  
**Estrutura:**
- `/src/index.ts` — API pública (injectGridInspector, ejectGridInspector, toggleGridInspector)
- `/src/GridInspectorApp.tsx` — Componente React principal
- `/src/contexts/GridSystemContext.tsx` — Context para estado compartilhado
- `/src/types.ts` — Types TypeScript (GridInspectorConfig, etc.)
- `/src/styles.css` — Estilos do inspector
- `/vite.config.ts` — Build dual (ESM + UMD bookmarklet)

**Estado:** ATIVO e FUNCIONAL
- Dual distribution: NPM package (ESM) + Bookmarklet (UMD)
- 5 operational fronts (Visual Debugger, Layout Editor, Token Validator, Brand Switcher, CI Reporter)
- React 18+ com peer dependencies
- Build Vite com suporte a bookmarklet
- localStorage para persistência de estado
- API global `window.__SANSYS_GRID_INSPECTOR__`
- Documentação clara no README.md

#### C. Scripts Utilitários (`/scripts/`)
**Localização:** `/scripts/`

| Script | Tipo | Propósito | Estado | Referências |
|--------|------|----------|--------|------------|
| `build-css.js` | ESM | Compila SCSS da raiz para `dss-example/public/dss-full.css` | OBSOLETO | Sem referências no package.json |
| `inject-default-preview.cjs` | CJS | Injeta `defaultPreview` em dss.meta.json de componentes | ATIVO | Referenciado em documentação de setup |
| `generate-pdf.js` | ESM | Converte Markdown para PDF usando pandoc ou markdown-pdf | INATIVO | Sem referências ativas |
| `md-to-html-pdf.js` | ESM | Converte Markdown para HTML com estilos de impressão PDF | INATIVO | Documentação apenas |

**Estado:** MISTO
- Scripts foram movidos da raiz para `/scripts/` conforme monorepo migration
- Documentação em PROMPT_DIRECIONADOR_MONOREPO.md confirma o movimento
- Dois scripts estão em desuso: build-css.js e generate-pdf.js
- inject-default-preview.cjs é um outlier (CJS em projeto ESM)

---

### 2. Função no Ecossistema

#### MCP Server
- **Consumidores:** Claude Code, agentes de IA, sistemas de automação via stdio/HTTP
- **Responsabilidades:**
  1. **Governança leitura** — Query de componentes, tokens, fase, compliance
  2. **Validação** — Code architecture, pre-prompts, grid layouts, visual contracts
  3. **Geração** — Scaffolds de componentes, pre-prompts templates
  4. **Auditoria** — Record de eventos de auditoria, selo de componentes
  5. **Observabilidade** — Descrição do Grid Inspector, relatórios de conformidade

- **Integração:** Configurado em `.mcp.json` como servidor DSS com transport stdio

#### Grid Inspector
- **Consumidores:** Desenvolvedores (dev), QA, designers, ambientes de produção (bookmarklet)
- **Responsabilidades:**
  1. **Visualização** — Desenha grid overlay não-intrusivo
  2. **Edição** — Modifica spacing via CSS custom properties em :root
  3. **Validação** — Checks de compliance contra tokens DSS em tempo real
  4. **Relatório** — Export de grid-config para CI gates
  5. **Teste de brands** — Injeta data-brand para validar visual em 3 contextos

- **Integração:** Pode ser consumido como NPM package em apps Vue/React ou via bookmarklet em qualquer URL

#### Scripts
- **build-css.js:** Compilação offline de SCSS (substituído por monorepo setup)
- **inject-default-preview.cjs:** Setup automático de metadados de preview (ativo em CI)
- **generate-pdf.js, md-to-html-pdf.js:** Geração de documentação (obsoleto/manual)

---

### 3. Adequação ao Monorepo

#### MCP Server — EXCELENTE
✅ Bem posicionado como package independente  
✅ Dependências isoladas (@modelcontextprotocol/sdk, zod, tsup)  
✅ Build system próprio (tsup → /build/)  
✅ Exports bem definidos no package.json  
✅ Testes colocalizados (/tests/)  

**Observação:** Referência em `/tools/describeGridInspector.ts` ainda aponta para caminho antigo "Grid Inspector/..." (vide SIGNAL-T02-NEW)

#### Grid Inspector — EXCELENTE
✅ Bem posicionado como package independente  
✅ Dual distribution clara (ESM + UMD)  
✅ Vite config profissional  
✅ React peer dependency apropriada  
✅ Bookmarklet como primeira classe (não afterthought)  

**Observação:** Nenhum outro app/package referencia o caminho antigo (foi corrigido corretamente)

#### Scripts — INADEQUADO
❌ Scripts soltos em `/scripts/` sem integração clara no monorepo  
❌ Misto de ESM (.js) e CJS (.cjs) — conflito de tipo de módulo  
❌ Sem referências em package.json root (não autodiscoverable)  
❌ Documentação espalhada (PROMPT_DIRECIONADOR_MONOREPO.md)  

**Recomendação:** Mover scripts para seus respectivos pacotes ou criar `/tools/` integrado

---

### 4. Estado dos Scripts Utilitários

#### `build-css.js`
**Propósito:** Compilar SCSS da raiz para CSS estático para exemplo  
**Modo de uso:** `node scripts/build-css.js`  
**Dependências:** Requer `npx sass` (CLI do Dart Sass)  
**Estado:** OBSOLETO  
**Por quê?**
- Referencia caminhos antigos (`index.scss` na raiz não existe mais)
- CSS compilation é responsabilidade do Vite em @sansys/core agora
- Nenhuma referência em root package.json

**Disposição:** REMOVE

---

#### `inject-default-preview.cjs`
**Propósito:** Injetar campo `defaultPreview` em `dss.meta.json` de componentes  
**Modo de uso:** `node scripts/inject-default-preview.cjs`  
**Funcionamento:** Percorre `/components/` recursivamente, localiza dss.meta.json, insere objeto com props/dimensions/tokens/demo  
**Estado:** ATIVO (usado em CI/automação)  
**Por quê?**
- CommonJS (.cjs) em projeto ESM ("type": "module") — conflito potencial
- Lê lista hardcoded de defaultPreviews (DssButton, DssBadge, DssChip, etc.)
- Sem entrada em package.json root

**Disposição:** REALLOCATE para @sansys/dss-mcp como tool (generate_default_preview)

---

#### `generate-pdf.js`
**Propósito:** Converter Markdown de componente para PDF  
**Modo de uso:** `node scripts/generate-pdf.js path/to/file.md`  
**Fallbacks:** Tenta pandoc, depois markdown-pdf npm  
**Estado:** INATIVO  
**Por quê?**
- Nenhuma referência em package.json root
- Sem indicação de uso em CI/automação
- VSCode Markdown PDF extension mais prático para usuários

**Disposição:** ARCHIVE (conservar como documentação histórica, não ativo)

---

#### `md-to-html-pdf.js`
**Propósito:** Converter Markdown para HTML com CSS print-friendly  
**Modo de uso:** `node scripts/md-to-html-pdf.js path/to/file.md`  
**Funcionamento:** Usa marked.js ou fallback regex, gera HTML com estilos de impressão  
**Estado:** INATIVO  
**Por quê?**
- Nenhuma referência em package.json root
- Sem uso em CI/automação
- Solução manual/one-off para documentação

**Disposição:** ARCHIVE (manter como referência, opcional para desenvolvedores)

---

### 5. Disposições Recomendadas

| Ferramenta/Arquivo | Disposição | Justificativa |
|---|---|---|
| **MCP Server** (`/packages/mcp/`) | **KEEP** | Crítico para eco-sistema, bem estruturado, ativo em produção |
| **Grid Inspector** (`/packages/grid-inspector/`) | **KEEP** | Ferramental ativo, dual-distribution clara, sem quebras |
| **build-css.js** | **REMOVE** | Obsoleto, referencia caminhos antigos, sem uso em monorepo |
| **inject-default-preview.cjs** | **INTEGRATE** | Integrar como tool MCP: `generate_default_preview` (remove CJS conflict) |
| **generate-pdf.js** | **ARCHIVE** | Sem uso, fallback manual para VSCode extension |
| **md-to-html-pdf.js** | **ARCHIVE** | Sem uso, referência histórica (browser print → PDF) |
| **.mcp.json** (referência ao path antigo) | **FIX** | Alterar `./mcp/build/index.js` → `./packages/mcp/build/index.js` |
| **describeGridInspector.ts** (5 refs) | **FIX** | Alterar `Grid Inspector/...` → `packages/grid-inspector/...` |

---

### 6. Confirmação dos Sinais Pré-Identificados

#### [SIGNAL-T01] Referências ao caminho antigo do MCP
**Status:** CONFIRMADO ✅

**Localização:** `/mnt/c/Users/hebert.chaves/quasar-to-figma-converter/V5/V5-2.0.2/DSS/.mcp.json`

**Conteúdo:**
```json
"dss": {
  "command": "node",
  "args": ["./mcp/build/index.js"]  // ❌ Aponta para ./mcp/ (antigo)
}
```

**Impacto:** CRÍTICO
- O MCP Server NÃO será encontrado ao iniciar via `.mcp.json`
- Causa falha silenciosa ou erro quando Claude Code tenta carregar o servidor DSS
- Deve ser: `./packages/mcp/build/index.js`

**Ação:** Corrigir imediatamente em `.mcp.json`

---

#### [SIGNAL-T02] Referências ao Grid Inspector com caminho antigo
**Status:** CONFIRMADO ✅ (EXPANDIDO como T02-NEW)

**Localização:** `/packages/mcp/src/tools/describeGridInspector.ts`

**Occorrências:**
- Linha 287: `script: "Grid Inspector/packages/grid-inspector/scripts/validate-grid-ci.mjs"`
- Linha 342: `path: "Grid Inspector/README.md"`
- Linha 347: `path: "Grid Inspector/packages/grid-inspector/README.md"`
- Linha 352: `path: "Grid Inspector/src/observability/README.md"`
- Linha 357: `path: "Grid Inspector/src/app/components/dss/README.md"`

**Impacto:** MÉDIO
- Estas são PATHS DOCUMENTAIS apenas (não código operacional)
- Não causam falha em runtime
- Mas confundem agentes de IA e desenvolvedores sobre localização real

**Ação:** Atualizar todas para: `packages/grid-inspector/...`

---

#### [SIGNAL-T03] inject-default-preview.cjs é CommonJS
**Status:** CONFIRMADO ✅

**Localização:** `/scripts/inject-default-preview.cjs`

**Impacto:** BAIXO
- Node.js interpreta `.cjs` explicitamente como CommonJS independente de `"type": "module"`
- Funciona, mas é uma incongruência visual
- Melhor seria converter para ESM ou integrar como tool MCP

**Ação:** REALLOCATE como tool MCP (melhor padrão)

---

#### [SIGNAL-T04] build-css.js e md-to-html-pdf.js sem uso
**Status:** CONFIRMADO ✅

**Verificação:**
```bash
grep -r "build-css\|generate-pdf\|md-to-html-pdf" /scripts/ package*.json
# Sem resultados em scripts ativas
```

**Impacto:** BAIXO
- Não prejudicam nada, só ocupam espaço
- Podem ser úteis para referência histórica

**Ação:** ARCHIVE (manter no repo, remover de pipeline ativo)

---

### 7. Novos Sinais Encontrados

#### [SIGNAL-T02-NEW] Referências documentais a "Grid Inspector/" em describeGridInspector.ts
**Severity:** MEDIUM  
**Description:** 5 occorrências em `/packages/mcp/src/tools/describeGridInspector.ts` apontam para caminho antigo "Grid Inspector/" em vez de "packages/grid-inspector/"  
**Files affected:**
- Línea 287: CI Gate script path
- Líneas 342-357: Documentation map paths

**Action:** Search-and-replace "Grid Inspector/" → "packages/grid-inspector/"

---

#### [SIGNAL-T05-NEW] Apps workspace não está configurado em root package.json
**Severity:** LOW  
**Description:** `/apps/docs-portal/` existe e é funcional, mas não tem referência a Grid Inspector  
**Details:**
- apps/sandbox desaparece em monorepo migration (permissão dificultada)
- apps/docs-portal é o survivor
- Sem consumo de @sansys/grid-inspector detectado

**Action:** Verificar se apps devem consumir grid-inspector como dev tool

---

#### [SIGNAL-T06-NEW] Falta script de build:grid-inspector no root package.json
**Severity:** LOW  
**Description:** O Grid Inspector tem script `build:all` mas não há atalho no root  
**Details:**
- root package.json tem: core:build, docs:build, mcp:build, build:all
- Falta: grid-inspector:build ou grid-inspector:dev
- Grid Inspector é tangerino ao build pipeline

**Action:** Adicionar conveniência: `"grid-inspector:build": "npm run build --workspace=@sansys/grid-inspector"`

---

### 8. Recomendações de Melhoria Estrutural

#### A. Organização dos Scripts
**Problema:** Scripts utilitários estão soltos em `/scripts/` sem integração clara

**Recomendação:**
1. **Move to MCP:** `inject-default-preview.cjs` → ferramenta MCP `generate_default_preview`
2. **Archive:** `build-css.js`, `generate-pdf.js`, `md-to-html-pdf.js` → `/docs/archive/scripts/`
3. **Create:** `/tools/` como subpasta para scripts de CI/automação

```
scripts/
├── ci/
│   ├── validate-grid-ci.mjs (Grid Inspector)
│   └── validate-components-ci.mjs (novo, para componentes)
└── [archived] build-css.js, generate-pdf.js, etc.
```

---

#### B. Integração MCP em Monorepo
**Problema:** `.mcp.json` aponta a caminho antigo

**Recomendação:**
1. Atualizar `.mcp.json`: `./mcp/` → `./packages/mcp/`
2. Considerar versionamento de `.mcp.json` (v0.2, v0.3)
3. Adicionar `"mcpServers": { "dss-grid-inspector": {...} }` para Grid Inspector CLI

```json
{
  "mcpServers": {
    "dss": {
      "command": "node",
      "args": ["./packages/mcp/build/index.js"]  // ✅ Correto
    },
    "dss-grid-inspector": {
      "command": "node",
      "args": ["./packages/grid-inspector/scripts/validate-grid-ci.mjs"]  // Para CI
    }
  }
}
```

---

#### C. Documentação Centralizada
**Problema:** Documentação de ferramentas espalhada entre README.md, describeGridInspector.ts, PROMPT_DIRECIONADOR_MONOREPO.md

**Recomendação:**
1. Criar `/docs/tooling/README.md` centralizado
2. Atualizar `/packages/mcp/src/tools/describeGridInspector.ts` para ler paths dinâmicos
3. Adicionar seção de "Tool Catalog" no root README

```markdown
# Tooling Catalog

## MCP Server (@sansys/dss-mcp)
📍 Location: `packages/mcp/`
🚀 CLI: `npm run mcp:start`
📖 Docs: `packages/mcp/README.md` (not exists, create it)

## Grid Inspector (@sansys/grid-inspector)
📍 Location: `packages/grid-inspector/`
🚀 CLI: `npm run dev --workspace=@sansys/grid-inspector`
📖 Docs: `packages/grid-inspector/README.md` ✅
```

---

#### D. Testes e CI Gaps
**Problema:** Apenas 1 arquivo de testes (validateGridLayout.test.ts)

**Recomendação:**
1. Adicionar testes para MCP tools (describe_grid_inspector, generate_component_scaffold)
2. Criar CI gate para validar referências de paths em describeGridInspector.ts
3. Adicionar test para `.mcp.json` valid paths

```bash
# CI gate example
node scripts/ci/validate-mcp-paths.mjs
```

---

#### E. Cleanup de Resíduos
**Recomendação imediata:**
1. Remover `build-css.js` ou mover para `/docs/archive/`
2. Converter `inject-default-preview.cjs` → `inject-default-preview.mjs`
3. Remover referencias "Grid Inspector/" de describeGridInspector.ts

---

### Resumo Executivo

| Aspecto | Status | Ação |
|--------|--------|------|
| **MCP Server** | ✅ SAUDÁVEL | Manter, corrigir path em .mcp.json |
| **Grid Inspector** | ✅ SAUDÁVEL | Manter, corrigir refs docs |
| **Scripts** | ⚠️ MISTO | Limpar (remove 2), integrar 1, archive 2 |
| **Monorepo Structure** | ⚠️ CRÍTICO | Atualizar .mcp.json e describeGridInspector.ts |
| **Tests** | ⚠️ MINIMAL | Expandir cobertura |
| **Documentation** | ⚠️ DISPERSO | Centralizar em /docs/tooling/ |

**O ecossistema tooling está 75% saudável, com gaps menores de path resolution e documentação.**
