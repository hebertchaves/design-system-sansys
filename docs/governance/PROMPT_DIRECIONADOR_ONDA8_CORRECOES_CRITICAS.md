# DSS — Prompt Direcionador: Onda 8 (Correções Críticas de Cascata, Tokens e Contrato Visual)

> **Status:** Normativo Vinculante  
> **Versão DSS:** v2.4.0  
> **Autoridade:** Este documento governa a execução da **Onda 8** de correção arquitetural do Design System Sansys (DSS). Ele é um guia técnico exato e normativo direcionado ao executor (**Claude Code** com a skill `dss-component-builder`) para sanar de forma definitiva o vazamento de tokens CSS na sandbox, as inconsistências de compilação do portal de documentação e as divergências de governança no contrato visual.

---

## 1. Contexto e Diagnóstico das Fraturas Expostas

Durante a homologação da Onda 7, foram detectados três problemas graves que invalidam qualquer declaração prematura de prontidão para produção:

1. **Vazamento Arquitetural Sistêmico na Sandbox:** O arquivo `apps/sandbox/public/quasar-scoped.css` (CSS completo do Quasar pré-processado) escopa utilitários e variáveis sob o seletor `#app` com especificidade elevada (0,1,1). O DSS define utilitários em `packages/core/utils/_colors.scss` de forma global (especificidade 0,1,0). Como consequência, as classes utilitárias de background, texto e bordas (`.bg-primary`, `.text-primary`, etc.) estão sendo silenciosamente substituídas pelos valores originais do Quasar (azul `#1976D2`), ignorando a paleta de cores do DSS.
2. **Código Morto e Bridge Inexistente:** O arquivo `_quasar-tokens-mapping.scss` está incompleto em relação à ponte de variáveis nativas do Quasar (`--q-*`). Além disso, o arquivo `_quasar-overrides.scss` (linhas 1010-1034) faz referência a uma variável inexistente `--quasar-primary`, gerando código morto.
3. **Quebra de Compilação no Portal de Documentação:** O arquivo `apps/docs-portal/src/main.tsx` importa `"./index.css"`, mas este arquivo foi deletado do repositório por engano durante uma etapa anterior de higienização de arquivos soltos na raiz. Isso impede qualquer build ou inicialização do portal de documentação localmente.
4. **Divergência Crítica no Contrato Visual Narrativo:** O script de automação `sync:visual-contract` sincroniza apenas a tabela auto-gerada. As seções narrativas manuais (seções 4.x do `DSS_REFERENCIA_VISUAL_ANALISE.md`) estão desalinhadas com as especificações contidas nos arquivos `dss.meta.json` dos componentes (exemplo clássico: `DssButton` possui border-radius, font-size e padding divergentes entre o JSON e a seção 4.11).

---

## 2. Escopo da Onda 8 (Critérios de Aceite Obrigatórios)

O executor deve seguir estritamente as diretrizes abaixo, sem desvios ou declarações de vitória antes de rodar os comandos de validação correspondentes.

### 2.1 Resolução do Vazamento de Tokens e Alinhamento de Cascata

O vazamento de tokens deve ser sanado por meio de uma estratégia robusta de **CSS Layers**, neutralizando a especificidade do Quasar sem quebrar seus componentes internos.

#### Critérios de Aceite:
1. **Substituição do CSS da Sandbox:** No arquivo `apps/sandbox/index.html`, substituir o carregamento do CSS escopado:
   * **Remover:** `<link rel="stylesheet" href="/quasar-scoped.css">`
   * **Adicionar:** `<link rel="stylesheet" href="/quasar-layered.css">`
   * *Justificativa:* O arquivo `quasar-layered.css` já existe na sandbox e encapsula todo o Quasar sob a camada `@layer quasar`. Como os estilos do DSS são importados sem layer, eles ganham precedência absoluta na cascata de estilos, independente de seletores de ID como `#app`.
2. **Construção da Bridge de Tokens Canônica:** Preencher o arquivo `packages/core/themes/_quasar-tokens-mapping.scss` com a injeção correta das variáveis nativas do Quasar apontando para os tokens do DSS:
   ```scss
   :root {
     /* Mapeamento exato das variáveis do Quasar para os tokens semânticos do DSS */
     --q-primary: var(--dss-primary);
     --q-secondary: var(--dss-secondary);
     --q-accent: var(--dss-accent);
     --q-positive: var(--dss-positive);
     --q-negative: var(--dss-negative);
     --q-warning: var(--dss-warning);
     --q-info: var(--dss-info);
     
     /* Mapeamento de neutros */
     --q-dark: var(--dss-gray-900);
     --q-dark-page: var(--dss-gray-950);
   }
   ```
3. **Limpeza de Código Morto em Overrides:** No arquivo `packages/core/themes/_quasar-overrides.scss` (linhas 1010-1034), corrigir os utilitários de texto, background e borda para usarem diretamente os tokens semânticos do DSS, removendo a referência a `--quasar-*` que não é declarada globalmente:
   ```scss
   /* Text colors com nossos tokens */
   .text-primary { color: var(--dss-primary) !important; }
   .text-secondary { color: var(--dss-secondary) !important; }
   .text-accent { color: var(--dss-accent) !important; }
   .text-positive { color: var(--dss-positive) !important; }
   .text-negative { color: var(--dss-negative) !important; }
   .text-warning { color: var(--dss-warning) !important; }
   .text-info { color: var(--dss-info) !important; }
   
   /* Background colors */
   .bg-primary { background-color: var(--dss-primary) !important; }
   .bg-secondary { background-color: var(--dss-secondary) !important; }
   .bg-accent { background-color: var(--dss-accent) !important; }
   .bg-positive { background-color: var(--dss-positive) !important; }
   .bg-negative { background-color: var(--dss-negative) !important; }
   .bg-warning { background-color: var(--dss-warning) !important; }
   .bg-info { background-color: var(--dss-info) !important; }
   ```
4. **Remoção de Arquivos Obsoletos:** Excluir definitivamente o arquivo `apps/sandbox/public/quasar-scoped.css` para evitar que ele seja carregado acidentalmente ou mantido como lixo no repositório.

### 2.2 Restauração do Build do Portal de Documentação

#### Critérios de Aceite:
1. **Recriação do index.css:** Criar o arquivo `apps/docs-portal/src/index.css` contendo as diretivas corretas de inicialização do Tailwind CSS v4 para restabelecer a folha de estilos do portal:
   ```css
   @import "tailwindcss";
   @config "../tailwind.config.ts";
   ```
2. **Validação do Build:** Executar o comando de build no workspace do portal e garantir que a compilação ocorra com sucesso (zero erros).

### 2.3 Saneamento de Divergências e Governança do Contrato Visual

Para as seções narrativas manuais (4.x) do `DSS_REFERENCIA_VISUAL_ANALISE.md`, adotaremos a **Opção B (Script de Validação)** como a melhor prática de engenharia: ela mantém o rico valor editorial e histórico das seções escritas à mão, mas impede o desalinhamento silencioso através de alertas automáticos.

#### Critérios de Aceite:
1. **Correção Manual do DssButton:** Corrigir as inconsistências históricas na seção 4.11 do `DSS_REFERENCIA_VISUAL_ANALISE.md` para que correspondam exatamente ao `dss.meta.json` do `DssButton`:
   * **border-radius:** Mudar de `--dss-radius-full` para `--dss-radius-sm` (ou ajustar o JSON se a norma do botão exigir formato pílula. Nota: O JSON define `--dss-radius-sm`, que deve ser mantido ou unificado de acordo com a especificação real do componente).
   * **font-size:** Mudar de `--dss-font-size-sm` para `--dss-font-size-md` (conforme definido no JSON).
   * **padding:** Mudar de `--dss-spacing-6` para `--dss-spacing-2 --dss-spacing-4` (conforme definido no JSON).
2. **Desenvolvimento do Script de Validação:** Criar o script `scripts/validate-visual-contract.js` que realiza as seguintes etapas:
   * Varre recursivamente todos os arquivos `dss.meta.json`.
   * Para cada componente, lê as propriedades declaradas em `defaultPreview.computedTokens` (ex: `borderRadius`, `fontSize`, `padding`).
   * Lê o arquivo `DSS_REFERENCIA_VISUAL_ANALISE.md` e localiza a tabela correspondente na seção narrativa 4.x do componente.
   * Compara se os tokens declarados no JSON existem na tabela Markdown da seção narrativa.
   * Emite um `console.warn` detalhado listando todas as divergências encontradas (ex: "Componente DssButton: borderRadius no JSON é --dss-radius-sm, mas na seção 4.11 é --dss-radius-full").
3. **Integração no Pre-commit Hook:** Adicionar a execução de `node scripts/validate-visual-contract.js` no hook de pre-commit (`scripts/hooks/pre-commit`). O commit **não deve ser bloqueado** por divergências nas seções narrativas (para não travar o fluxo de desenvolvimento), mas o script deve imprimir os avisos em destaque para que o desenvolvedor tome ciência do desalinhamento.
4. **Atualização da Documentação de Workflow:** Atualizar o arquivo `docs/governance/DSS_DEFAULT_PREVIEW_WORKFLOW.md` na seção de scripts de manutenção para documentar o novo comando `npm run validate:visual-contract`.

---

## 3. Comandos de Validação Obrigatórios (Gate de Qualidade)

O executor deve rodar e apresentar os outputs dos seguintes comandos para provar a eficácia das correções:

1. **Build do Core (Sass compilado com a nova bridge):**
   ```bash
   npm run build --workspace=@sansys/design-system
   ```
2. **Build do Portal de Documentação (Confirmando a restauração do index.css):**
   ```bash
   npm run build --workspace=@sansys/docs-portal
   ```
3. **Execução do Novo Script de Validação (Para listar eventuais divergências remanescentes em outros componentes):**
   ```bash
   node scripts/validate-visual-contract.js
   ```
4. **Verificação de Regressão nos Testes Unitários:**
   ```bash
   npm run test
   ```

---

## 4. Instruções de Postura para o Executor

* **Não declare vitória prematura:** Só afirme que um item está resolvido após apresentar o comando de build correspondente rodando com sucesso.
* **Preserve o histórico do Git:** Faça commits pequenos e descritivos para cada etapa resolvida (ex: `fix(sandbox): resolve css token leak using css layers`, `fix(docs-portal): restore tailwind index.css and build pipeline`).
* **Siga as diretrizes de Sass:** Lembre-se de que o projeto utiliza o Sass Module System (`@use` e `@forward`). Não introduza `@import` antigos nos arquivos SCSS modificados.
