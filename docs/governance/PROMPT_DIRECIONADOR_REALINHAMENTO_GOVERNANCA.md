# 📚 PROMPT DIRECIONADOR: Realinhamento de Governança, Documentação e READMEs (Monorepo)
> **Autor:** Chat Orquestrador Estratégico (Manus AI)  
> **Destinatário:** Chat Executor (Claude)  
> **Status:** Aprovado para Execução Imediata  
> **Escopo:** Ampliado (Inclui Tokens, Grid, Guias Técnicos e Arquitetura)

---

## 🎯 Objetivo

Após a conclusão bem-sucedida das **4 Ondas de Engenharia**, a arquitetura física e técnica do DSS mudou drasticamente (migração para Monorepo, separação de workspaces, criação de `apps/components`, eliminação de warnings, 100% de cobertura de testes). No entanto, o **ecossistema documental de governança está defasado**, contendo referências a caminhos antigos (`dss-example/`, `dss/components/`), versões antigas (v2.2.0 em vez de v2.3.0), e dados desatualizados de cobertura de componentes.

Como o DSS deve ser um sistema autossuficiente e profissional ("falar por si só"), você deve executar o **realinhamento completo de 100% dos documentos de governança, guias técnicos, especificações de tokens, grids e READMEs** para que eles reflitam com precisão absoluta o estado atual do ecossistema.

---

## 🏛️ Mapeamento de Arquivos e Ações Necessárias

Você deve atualizar os seguintes arquivos críticos seguindo as instruções abaixo:

### 1. `README.md` (Raiz do Projeto) — *Correção de Identidade e Instruções*
* **Versão:** Atualizar o badge de versão de `2.2.0` para `2.3.0` (versão real do Core).
* **Workspaces:** Adicionar uma seção curta explicando a estrutura do Monorepo (`packages/core`, `apps/docs-portal`, `apps/sandbox`, `packages/grid-inspector`, `mcp`).
* **Instruções de Inicialização:**
  * Substituir referências a `cd dss-example` por `npm run dev --workspace=@sansys/sandbox` (ou `cd apps/sandbox && npm run dev`).
  * Atualizar os comandos de build globais do package.json raiz (`npm run core:build`, `npm run portal:build`, `npm run portal:sync-docs`).
* **Links:** Corrigir caminhos relativos que apontavam para arquivos movidos ou excluídos.

### 2. `CLAUDE.md` (Guia de Agente de IA) — *Guia Normativo do Monorepo*
* **Instruções de Leitura:** Atualizar a seção *"Leitura Obrigatória (ANTES de criar qualquer componente)"* para refletir os caminhos reais dos guias no monorepo (ex: `docs/reference/PRD_DSS.md` em vez de `docs/PRD_DSS.md`).
* **Caminhos de Importação:** Atualizar o exemplo do Passo 7 (Entry Point Wrapper) para mostrar a estrutura correta dentro de `packages/core/components/base/` e a cópia espelhada em `apps/components/`.
* **Sass Module System:** Reforçar na seção *"Princípios Fundamentais"* que o uso de `@import` é **estritamente proibido** e que novos arquivos SCSS devem usar `@use` e `@forward` com namespaces explícitos (padrão Onda 3).
* **Testes Obrigatórios:** Atualizar a seção de testes para indicar que o arquivo `{NomeComponente}.test.js` é um **gate de build bloqueante** e que a cobertura de testes do core agora é de 100% (76/76 componentes).

### 3. `docs/governance/CERTIFIED_COMPONENTS.md` — *Índice de Selos*
* **Status Atualizado:** Atualizar o status do índice para refletir o scorecard atual:
  * Fase 1: 19/19 componentes (100% selados).
  * Fase 2: 68/68 componentes (100% selados e certificados).
  * Fase 3 (Stress Test): Adicionar os componentes selados da Fase 3 (ex: `DssDataCard` selado em 23/05/2026, e outros selados recentemente).
  * Cobertura de Testes: Atualizar a coluna de testes de todos os componentes para indicar que **100% possuem `test.js` correspondente**.

### 4. `docs/guides/SETUP_COMPLETO.md` e `GUIA_SETUP_VSCODE.md` — *Setup do Monorepo*
* **Setup Completo:** Reescrever o arquivo para refletir a arquitetura Monorepo oficial do npm/pnpm. Remover qualquer referência ao antigo diretório isolado `dss/` ou ao plugin antigo do Figma (`quasar-to-figma-converter`).
* **Comandos:** Atualizar todos os comandos de instalação de dependências e execução para usar o escopo de workspaces do npm (`npm install` na raiz instala tudo; `npm run core:build` compila a biblioteca).

### 5. `docs/reference/DSS_ARCHITECTURE.md` e `APRESENTACAO_TECNICA.md` — *Arquitetura Monorepo*
* **Estrutura de Pastas:** Atualizar a árvore de diretórios do sistema para mostrar a divisão em `packages/` e `apps/`.
* **Contratos:** Garantir que a documentação explique a relação entre `packages/core/components` (fonte de verdade e distribuição) e `apps/components` (espelho local de desenvolvimento).

### 6. `docs/reference/DSS_TOKEN_REFERENCE.md` e `DSS_TOKEN_GUIDELINES.md` — *Especificações de Tokens*
* **Versão:** Atualizar a versão para `v2.3.0` (Sincronizada com o Core).
* **Estrutura de Arquivos:** Atualizar as seções que descrevem onde os arquivos de tokens vivem física e tecnicamente (agora em `packages/core/tokens/` em vez de caminhos relativos soltos ou pastas isoladas).
* **Sass Module System:** Atualizar os exemplos de código para usar `@use 'tokens/semantic/accessibility'` em vez de `@import 'tokens/semantic/accessibility'`. Reforçar o fim do `@import` na seção de boas práticas.

### 7. `docs/guides/dss-grid-layout.md` e `FOCUS_TOKENS_REFERENCIA.md` — *Grid, Layout e Acessibilidade*
* **Caminhos e Estruturas:** Atualizar referências a componentes de layout (como `DssLayout`, `DssSpace`, `DssSeparator`) para refletir que eles agora vivem em `packages/core/components/base/` e possuem cobertura de testes 100%.
* **Sass Imports:** Corrigir qualquer exemplo de importação Sass de grid ou focus para a sintaxe `@use`.

### 8. `docs/governance/DSS_GOLDEN_COMPONENTS.md` e `DSS_GUIA_COMPOSICAO_FASE3.md` — *Governança Golden e Composição*
* **Golden Reference:** Atualizar a lista de componentes Golden para refletir que o `DssDataCard` está selado e que o `DssCheckbox` e `DssButton` agora possuem cobertura de testes robusta (100%).
* **Caminhos de Importação:** Corrigir os exemplos de código de composição (como os exemplos de importação de subcomponentes do `DssCard`) para refletir o monorepo e o uso correto de namespaces Sass.

### 9. `docs/dss_system_handoff_v_2.md` — *Handoff do Sistema*
* **Identidade do Sistema:** Atualizar a versão normativa de `v2.2` para `v2.3` (Monorepo + 100% Cobertura de Testes).
* **Componentes Selados:** Atualizar o balanço geral de componentes para indicar que a Fase 2 está 100% concluída com 68 componentes selados e que todos possuem testes unitários e páginas no portal.

---

## 🧼 Ação de Higienização de Guias Obsoletos

Para evitar que desenvolvedores ou novos agentes de IA leiam instruções desatualizadas que possam quebrar o sistema, você deve **mover os seguintes arquivos para a pasta `docs/archive/reports/` ou `docs/archive/specs/`**:

1. `docs/guides/SETUP_COMPLETO.md` (se você julgar que reescrevê-lo é redundante com o README raiz, mova-o para o arquivo e consolide tudo no README).
2. Qualquer guia em `docs/guides/` que ainda faça referência à pasta isolada `dss/` ou comandos do plugin do Figma legado.

---

## 🧪 Critérios de Aceite e Validação

Você deve validar que:
1. **Nenhum arquivo de documentação ativo contém a palavra `dss-example`** (exceto em históricos de migração explicitamente marcados).
2. **Nenhum arquivo ativo faz referência à pasta `dss/` isolada** para comandos ou caminhos de componentes.
3. **O `README.md` raiz possui as instruções corretas** que permitem a um desenvolvedor clonar o repositório, rodar `npm install` e subir o sandbox ou o portal de documentação de primeira, sem erros.
4. **Todos os exemplos de código SCSS/Sass** nos guias ativos usam `@use` e `@forward` em vez de `@import`.

---

## 📢 Instruções de Commit

Faça as atualizações em commits separados por arquivo ou um único commit consolidado com a mensagem padrão:

> `docs(governance): realinha 100% da governança, guias e READMEs com a arquitetura Monorepo`

Envie o relatório detalhado das atualizações e dos arquivos arquivados/limpos de volta para o chat orquestrador estratégico. Boa execução!
