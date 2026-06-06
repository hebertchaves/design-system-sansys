# 🤖 PROMPT DIRECIONADOR: Consolidação do Isolamento Quasar↔DSS + Regressão Visual Tokenizada

> **Autor:** Chat Orquestrador Estratégico (Manus AI)
> **Destinatário:** Chat Executor (Claude Code)
> **Status:** Aprovado para Execução Imediata
> **Escopo:** Apps `sandbox`, pacote `core/themes`, governança documental e suíte de regressão automatizada.

---

## 🎯 Objetivo

A última auditoria de saúde do sistema (pós-implantação de `@layer quasar` + bridge `--q-* → --dss-*`) constatou que o **isolamento visual entre Quasar e DSS está estruturalmente resolvido**, mas existem **4 pontos remanescentes** que impedem o sistema de atingir o nível "Production-Ready de Verdade" com **garantia contínua**:

1. **Ausência de teste de regressão automatizado** para tokens (`--q-*` deve sempre resolver para `--dss-*`).
2. **Coexistência de CSS legado** (`public/quasar-components.css`, 566 linhas) que pode reintroduzir vazamentos silenciosos.
3. **Princípio arquitetural #13 não formalizado** no `DSS_ARCHITECTURE.md` (CSS de terceiros DEVE viver em `@layer vendor`; CSS DSS NUNCA é envolvido em layer).
4. **Dívida documental** (~30 arquivos em `docs/governance/`) sem ponto de entrada único para novos agentes.

Sua missão é **executar os 4 itens em sequência**, com validação automatizada ao final.

---

## 📐 Diretrizes Técnicas Vinculantes (Padrão de Ouro)

- **Princípio #1 (Token First):** nenhuma cor, dimensão ou espaçamento hardcoded nos testes ou nos arquivos refatorados.
- **Princípio #12 (CSS como Fonte de Verdade Visual):** os testes devem validar o **CSS computado real** (`getComputedStyle`), não inferências de `meta.json`.
- **Princípio #13 (NOVO — a ser formalizado nesta missão):** todo CSS de terceiros (Quasar, Material Icons, etc.) DEVE ser servido dentro de `@layer vendor`. CSS DSS NUNCA é envolvido em layer (mantém specificity natural e sempre vence o `vendor`).
- **Sass Module System:** `@use`/`@forward` apenas. `@import` permanece proibido.
- **Localização canônica de testes:** `apps/sandbox/tests/` para testes de integração visual; `packages/core/components/<Comp>/<Comp>.test.js` para unitários (já existente).

---

## 🛠️ Plano de Execução (4 Tarefas Sequenciais)

### ✅ Tarefa 1 — Auditoria e Remoção de CSS Legado

**Contexto:** O arquivo `apps/sandbox/public/quasar-components.css` (566 linhas) é remanescente da arquitetura pré-`@layer`. Mesmo não referenciado no `index.html` atual, sua presença é uma armadilha — qualquer agente futuro pode reintroduzi-lo.

**Ações:**
1. `grep -r "quasar-components.css" apps/ packages/ docs/` para mapear todas as referências.
2. Se **não houver referência ativa** no HTML/JS/Vite config:
   - Mover para `apps/sandbox/public/_archive/quasar-components.css.deprecated`
   - Adicionar header no topo do arquivo: `/* DEPRECATED 2026-06-06 — substituído por quasar-layered.css com @layer quasar. NÃO REINTRODUZIR. */`
3. Se houver referência ativa: documentar onde, remover a referência, repetir passo 2.
4. Validar via `grep` que `_quasar-overrides.scss` não contém mais redeclarações mortas de `.bg-*` / `.text-*` que já são neutralizadas pela bridge. Remover blocos mortos identificados.

**Critério de aceite:** `grep -r "quasar-components" apps/sandbox/index.html apps/sandbox/src apps/sandbox/vite.config.js` retorna vazio.

---

### ✅ Tarefa 2 — Formalização do Princípio Arquitetural #13

**Contexto:** A solução `@layer` foi adotada pragmaticamente, mas não está registrada como princípio normativo. Sem isso, qualquer refatoração futura pode quebrar a premissa.

**Ações:**
1. Editar `docs/reference/DSS_ARCHITECTURE.md`, adicionando uma nova seção:

   ```markdown
   ## Princípio #13 — Isolamento de CSS de Terceiros via Cascade Layers (VINCULANTE)

   ### Regra
   - Todo CSS proveniente de bibliotecas de terceiros (Quasar, Material Icons,
     fontes externas com `@layer` próprio, etc.) DEVE ser carregado dentro de
     `@layer vendor { ... }`.
   - O CSS do DSS (tokens, componentes, utilitários) NUNCA é envolvido em
     `@layer`. Permanece no escopo implícito (unlayered), que tem precedência
     absoluta sobre qualquer layer nomeado, independente de specificity ou
     `!important` dentro do layer.

   ### Racional
   Cascade Layers (CSS WG, Baseline 2022) inverteu o modelo tradicional: regras
   unlayered sempre vencem regras dentro de layers nomeados. Isso permite que o
   DSS conviva com `!important` agressivo do Quasar sem precisar de override
   manual por componente.

   ### Implementação Canônica
   - `apps/sandbox/public/quasar-layered.css` — Quasar empacotado em `@layer quasar`
   - `apps/sandbox/index.html` — carrega `quasar-layered.css` ANTES do bundle DSS
   - `packages/core/themes/_quasar-tokens-mapping.scss` (Seção 12) — bridge
     `--q-* → --dss-*` como defesa em profundidade

   ### Anti-Patterns
   - ❌ Envolver CSS DSS em `@layer dss { ... }` (perde precedência)
   - ❌ Carregar Quasar fora de layer (volta ao cenário de `!important` tóxico)
   - ❌ Adicionar `!important` em componentes DSS para "vencer" Quasar
     (sintoma de que o layer não está configurado corretamente)
   ```

2. Adicionar referência ao Princípio #13 no `CLAUDE.md`, seção "Princípios Fundamentais do DSS (NÃO VIOLAR)", como item **#13**, com link para `DSS_ARCHITECTURE.md`.

3. Atualizar `docs/governance/DSS_VISUAL_CONTRACT.md` mencionando que validação visual assume Princípio #13 ativo.

**Critério de aceite:** `grep "Princípio #13" docs/reference/DSS_ARCHITECTURE.md CLAUDE.md` retorna ≥ 2 ocorrências.

---

### ✅ Tarefa 3 — Suíte de Regressão Visual Tokenizada (CORAÇÃO DA MISSÃO)

**Contexto:** Atualmente não há nada que impeça uma regressão silenciosa onde `.bg-primary` volte a renderizar com a cor Quasar `#1976D2` em vez do token DSS.

**Stack:** Vitest + jsdom (já presente no monorepo) + happy-dom para `getComputedStyle` confiável.

#### 3.1 — Estrutura de Arquivos

Criar:

```
apps/sandbox/tests/
├── regression/
│   ├── token-isolation.spec.ts        ← Bridge --q-* → --dss-*
│   ├── cascade-layers.spec.ts         ← @layer quasar não vence DSS
│   ├── utility-classes.spec.ts        ← .bg-*, .text-*, .border-* resolvem DSS
│   ├── brand-switching.spec.ts        ← [data-brand] propaga corretamente
│   └── component-defaults.spec.ts     ← Defaults dos 15 grupos batem com meta.json
├── helpers/
│   ├── mountWithLayers.ts             ← Helper que injeta quasar-layered.css + DSS
│   ├── computedToken.ts               ← Resolve var(--dss-*) em RGB
│   └── tokenMatrix.ts                 ← Matriz canônica de tokens a validar
└── setup.ts                           ← Setup global (happy-dom, CSS injection)
```

#### 3.2 — Matriz Canônica de Tokens (`tokenMatrix.ts`)

Cobertura **OBRIGATÓRIA**:

| Categoria | Tokens validados |
|---|---|
| Action | `--dss-action-primary`, `--dss-action-secondary`, `--dss-action-accent` (+ `-hover`, `-deep`) |
| Feedback | `--dss-feedback-success`, `--dss-feedback-error`, `--dss-feedback-warning`, `--dss-feedback-info` |
| Surface | `--dss-surface-default`, `--dss-surface-subtle`, `--dss-surface-elevated` |
| Text | `--dss-text-body`, `--dss-text-subtle`, `--dss-text-muted`, `--dss-text-action` |
| Border | `--dss-border-gray-200`, `--dss-border-gray-300` |
| Bridge Quasar | `--q-primary`, `--q-secondary`, `--q-accent`, `--q-positive`, `--q-negative`, `--q-warning`, `--q-info`, `--q-dark` |
| Brand Hub | `[data-brand="hub"] --dss-brand-primary` ≠ default |
| Brand Water | `[data-brand="water"] --dss-brand-primary` ≠ default |
| Brand Waste | `[data-brand="waste"] --dss-brand-primary` ≠ default |

#### 3.3 — Especificações dos 5 Specs

**`token-isolation.spec.ts` — Bridge `--q-* → --dss-*`**
```ts
describe('Token Bridge Q→DSS', () => {
  TOKEN_BRIDGE_PAIRS.forEach(([qVar, dssVar]) => {
    it(`${qVar} resolves to the same RGB as ${dssVar}`, () => {
      const root = document.documentElement;
      const qValue = computedColor(root, qVar);
      const dssValue = computedColor(root, dssVar);
      expect(qValue).toBe(dssValue);
      expect(qValue).not.toBe(''); // não vazio
      expect(qValue).not.toBe('rgb(25, 118, 210)'); // não é Quasar default
    });
  });
});
```

**`cascade-layers.spec.ts` — Layer não vence DSS**
```ts
it('DSS .bg-primary wins over @layer quasar #app .bg-primary', () => {
  const el = mountWithLayers('<div id="app"><div class="bg-primary">x</div></div>');
  const target = el.querySelector('.bg-primary')!;
  const bg = getComputedStyle(target).backgroundColor;
  expect(bg).toBe(computedColor(document.documentElement, '--dss-action-primary'));
  expect(bg).not.toBe('rgb(25, 118, 210)');
});

it('every Quasar !important rule is contained inside @layer quasar', () => {
  const sheetText = readFileSync('apps/sandbox/public/quasar-layered.css', 'utf8');
  const importantCount = (sheetText.match(/!important/g) || []).length;
  const layerWrap = sheetText.match(/@layer\s+quasar\s*\{([\s\S]*)\}/)?.[1] ?? '';
  const importantInsideLayer = (layerWrap.match(/!important/g) || []).length;
  expect(importantInsideLayer).toBe(importantCount); // 100% contido
});
```

**`utility-classes.spec.ts` — Classes utilitárias resolvem DSS**

Tabela de validação para CADA combinação `{ classe, propriedade CSS, token DSS esperado }`:
- `.bg-primary` → `background-color` → `--dss-action-primary`
- `.bg-secondary` → `background-color` → `--dss-action-secondary`
- `.bg-accent` → `background-color` → `--dss-action-accent`
- `.bg-positive` → `background-color` → `--dss-feedback-success`
- `.bg-negative` → `background-color` → `--dss-feedback-error`
- `.bg-warning` → `background-color` → `--dss-feedback-warning`
- `.bg-info` → `background-color` → `--dss-feedback-info`
- Idem para `.text-*` em `color`
- Idem para `.border-*` em `border-color`

Iterar via `it.each(MATRIX)` — total ≥ 21 assertions.

**`brand-switching.spec.ts` — Brand propagation**
```ts
['hub', 'water', 'waste'].forEach(brand => {
  it(`[data-brand="${brand}"] overrides --dss-brand-primary`, () => {
    const el = mountWithLayers(`<div data-brand="${brand}"><span class="bg-primary"></span></div>`);
    const target = el.querySelector('.bg-primary')!;
    const bg = getComputedStyle(target).backgroundColor;
    const expected = computedColor(target, '--dss-brand-primary');
    expect(bg).toBe(expected);
    expect(bg).not.toBe(DEFAULT_PRIMARY); // mudou da default
  });
});
```

**`component-defaults.spec.ts` — Contrato visual dos defaults**

Para cada componente listado em `TestDefaultPreview.vue` (15 grupos):
1. Ler `packages/core/components/<grupo>/<Comp>/dss.meta.json` → `defaultPreview.visualProperties`.
2. Montar o componente real via `mount()` do `@vue/test-utils`.
3. Para cada `visualProperty`, validar via `getComputedStyle` que o valor computado bate com o token declarado.

#### 3.4 — Helpers

`computedToken.ts`:
```ts
export function computedColor(el: Element, varName: string): string {
  const raw = getComputedStyle(el).getPropertyValue(varName).trim();
  // Resolve HSL/RGB/hex para rgb() canônico via canvas
  const ctx = document.createElement('canvas').getContext('2d')!;
  ctx.fillStyle = raw;
  return ctx.fillStyle.startsWith('#') ? hexToRgb(ctx.fillStyle) : ctx.fillStyle;
}
```

`mountWithLayers.ts`:
```ts
import quasarLayered from '../../public/quasar-layered.css?raw';
import dssStyles from '@core/index.scss?inline';

export function mountWithLayers(html: string): HTMLElement {
  injectStyleOnce('quasar-layered', quasarLayered);
  injectStyleOnce('dss-core', dssStyles);
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);
  return container;
}
```

#### 3.5 — Configuração Vitest

Criar `apps/sandbox/vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom', // suporta getComputedStyle melhor que jsdom
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.spec.ts'],
    css: true, // CRÍTICO: processa CSS real
  },
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, '../../packages/core'),
      '@components': path.resolve(__dirname, '../../packages/core/components'),
    },
  },
});
```

Adicionar em `apps/sandbox/package.json`:
```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:regression": "vitest run tests/regression"
}
```

Instalar deps faltantes: `bun add -D vitest happy-dom @vue/test-utils @vitejs/plugin-vue`.

#### 3.6 — Integração no Pre-Commit e CI

1. Adicionar em `scripts/hooks/pre-commit`:
   ```bash
   echo "🎨 Validando isolamento Quasar↔DSS..."
   (cd apps/sandbox && npm run test:regression) || {
     echo "❌ Regressão visual detectada. Veja apps/sandbox/tests/regression/"
     exit 1
   }
   ```

2. Criar `.github/workflows/visual-regression.yml` (se houver pipeline GH Actions):
   ```yaml
   name: Visual Token Regression
   on: [push, pull_request]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: oven-sh/setup-bun@v1
         - run: bun install
         - run: cd apps/sandbox && bun run test:regression
   ```

**Critério de aceite Tarefa 3:**
- `cd apps/sandbox && npm run test:regression` → 100% verde.
- Cobertura ≥ 50 assertions distintas.
- Quebra deliberada do bridge (comentar Seção 12 de `_quasar-tokens-mapping.scss`) → testes falham com mensagem clara.

---

### ✅ Tarefa 4 — Consolidação Documental (`AGENT_QUICKSTART.md`)

**Contexto:** 30+ arquivos em `docs/governance/` criam barreira de entrada. Não vamos deletar — vamos criar um índice navegável.

**Ações:**
1. Criar `docs/AGENT_QUICKSTART.md` com a estrutura:
   ```markdown
   # 🚀 DSS Agent Quickstart
   > Leia este arquivo PRIMEIRO. Ele aponta para todo o resto.

   ## Em 30 segundos
   DSS = camada corporativa sobre Quasar. Token First. 4 camadas. Brand-aware.

   ## Os 5 documentos que você DEVE ler antes de tocar em código
   1. [CLAUDE.md](/CLAUDE.md) — Regras operacionais
   2. [PRD_DSS.md](/docs/reference/PRD_DSS.md) — Por quê
   3. [DSS_ARCHITECTURE.md](/docs/reference/DSS_ARCHITECTURE.md) — Como (inclui Princípio #13)
   4. [DSS_COMPONENT_ARCHITECTURE.md](/docs/reference/DSS_COMPONENT_ARCHITECTURE.md) — 4 camadas
   5. [DSS_TOKEN_REFERENCE.md](/docs/reference/DSS_TOKEN_REFERENCE.md) — Catálogo

   ## Workflows por tarefa
   | Quero... | Leia |
   |---|---|
   | Criar componente novo | TEMPLATE_FASE3.md + GOLDEN_COMPONENTS |
   | Auditar componente | PROMPT_DIRECIONADOR_ONDA3_QUALIDADE |
   | Mudar token visual | DSS_VISUAL_CONTRACT + REFERENCIA_VISUAL_ANALISE |
   | Tocar no sandbox | apps/sandbox/README + tests/regression |
   | Resolver vazamento Quasar | DSS_ARCHITECTURE Princípio #13 |

   ## Mapa de governança (30 arquivos)
   [tabela auto-gerada via script]
   ```

2. Criar script `scripts/generate-governance-index.js` que lê o frontmatter de cada `.md` em `docs/governance/` e popula a tabela do Quickstart.

3. Adicionar `AGENT_QUICKSTART.md` como leitura **#0** no `CLAUDE.md` (antes do item 1 atual).

**Critério de aceite:** `wc -l docs/AGENT_QUICKSTART.md` < 200 linhas e contém links para 100% dos arquivos de `docs/governance/`.

---

## 🧪 Validação Final Global

Antes de commitar, executar **na ordem**:

```bash
# 1. Build do core (não pode quebrar)
npm run core:build

# 2. Suite completa de testes unitários (76 componentes)
npm run test

# 3. Nova suite de regressão visual
cd apps/sandbox && npm run test:regression && cd ../..

# 4. Sandbox sobe sem erros
cd apps/sandbox && timeout 15 npm run dev 2>&1 | grep -E "(error|Error|ERR)" && exit 1 || echo "OK"

# 5. Pre-commit hook executa sem falhas
.husky/pre-commit || scripts/hooks/pre-commit
```

**TODOS os 5 passos DEVEM retornar verde.** Qualquer falha bloqueia o commit.

---

## 📢 Instruções de Commit

Faça commits atômicos (um por tarefa):

1. `chore(sandbox): remove CSS legado quasar-components.css`
2. `docs(architecture): formaliza Princípio #13 — Cascade Layers para CSS de terceiros`
3. `test(sandbox): adiciona suite de regressão visual tokenizada (50+ assertions)`
4. `docs(governance): cria AGENT_QUICKSTART como ponto único de entrada`

**Mensagem de PR final:**
> `feat(dss): consolida isolamento Quasar↔DSS com regressão automatizada e Princípio #13`

---

## 📋 Relatório de Retorno

Ao concluir, retorne ao orquestrador estratégico com:

1. **Diff resumido** de cada uma das 4 tarefas.
2. **Output completo** da suite `test:regression` (deve mostrar X passed).
3. **Lista de arquivos removidos/arquivados** na Tarefa 1.
4. **Confirmação textual** de que o teste de quebra deliberada (comentar bridge) faz a suite falhar — prova de que o teste tem dentes.
5. **Métrica antes/depois:**
   | Eixo | Antes | Depois |
   |---|---|---|
   | Cobertura de regressão visual | 0 assertions | ≥ 50 |
   | CSS legado órfão | 566 linhas | 0 |
   | Princípios formalizados | 12 | 13 |
   | Arquivos no caminho crítico de onboarding | 12 | 1 (Quickstart) |

Boa execução, camarada. Que o cascade esteja com você.
