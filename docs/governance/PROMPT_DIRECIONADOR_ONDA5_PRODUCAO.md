# 🎯 Prompt Direcionador: Onda 5 — Prontidão para Produção (Sanamento de Links e Sincronização)
**Papel:** Agente Executor de Qualidade e Governança (Claude)  
**Objetivo:** Sanar todos os links quebrados na documentação de entrada e garantir a sincronização perfeita do espelho de componentes para liberação de produção.  
**Hierarquia de Autoridade:** Este documento é uma ordem direta do Chat Orquestrador Estratégico. Não violar as diretrizes abaixo.

---

## 1. Contexto Técnico

O DSS alcançou maturidade técnica de 100% de testes e build limpo. No entanto, uma inspeção de prontidão para produção revelou que a transição para Monorepo e o arquivamento de guias históricos deixaram links quebrados nos arquivos de entrada (`README.md`, `QUICK_START.md` e guias de `docs/`). Além disso, existem 8 arquivos com divergências de quebra de linha (CRLF vs LF) entre o Core e o Espelho.

Este prompt direciona você a realizar a higienização final para garantir uma entrega de nível corporativo (Triple-A).

---

## 2. Tarefas Obrigatórias

### 2.1. Ação 1 — Correção de Links de Entrada (`README.md` e `QUICK_START.md`)
Você deve varrer o `README.md` e o `QUICK_START.md` na raiz do projeto e atualizar os seguintes links:
* Substituir referências a `./components/base/...` por `./packages/core/components/base/...`.
* Substituir referências a `./MIGRATION_TO_TYPESCRIPT.md` por `./docs/archive/reports/MIGRATION_TO_TYPESCRIPT.md`.

### 2.2. Ação 2 — Correção de Links em Guias de Referência e Arquitetura
Você deve corrigir os links internos nos seguintes arquivos em `docs/`:
* **`docs/reference/DSS_COMPONENT_ARCHITECTURE.md`:**
  * Corrigir o link de `DSS_IMPLEMENTATION_GUIDE.md` para `../guides/DSS_IMPLEMENTATION_GUIDE.md`.
  * Corrigir o link de `REFACTORING_QUASAR_PATTERN.md` para `../archive/reports/REFACTORING_QUASAR_PATTERN.md`.
  * Corrigir links de guias de componentes básicos/compostos para apontar para `../archive/reports/...`.
* **`docs/guides/DSS_ARCHITECTURE_GUIDE.md`:**
  * Corrigir links de guias de componentes básicos/compostos para apontar para `../archive/reports/...`.

### 2.3. Ação 3 — Sincronização e Normalização do Espelho (`apps/components`)
Existem 8 arquivos com divergências de quebra de linha (whitespace/CRLF) entre `packages/core/components/base/` e `apps/components/base/` (nas pastas `DssBadge` e `DssCard`).
* Você deve normalizar esses arquivos para garantir que o conteúdo de `apps/components/` seja **100% idêntico** ao de `packages/core/components/base/` (incluindo quebras de linha LF padrão Linux).
* Dica: Você pode copiar os arquivos corretos do core para o espelho para garantir a igualdade bit-a-bit.

---

## 3. Critérios de Aceite e Gates de Validação

Para declarar a Onda 5 como concluída com sucesso, você deve garantir que:
1. **Zero Links Quebrados:** Uma varredura de links não deve encontrar nenhum link relativo apontando para arquivos inexistentes nos arquivos modificados.
2. **Igualdade do Espelho:** O comando `diff -rq --exclude="*.test.js" --exclude="node_modules" packages/core/components/base/ apps/components/base/` deve retornar **absolutamente nada** (zero saída, indicando igualdade perfeita).
3. **Build de Produção:** O comando `npm run core:build` deve continuar passando com sucesso.

---

## 4. Instruções de Commit
Ao final da execução, faça o commit com a seguinte mensagem padronizada:
> `docs(governance): executa onda 5 de prontidao para producao (links e espelho)`
