# 🤖 PROMPT DIRECIONADOR: Onda 4 — Documentação e Escala (Testes Legados, Sass Embedded & Portal)
> **Autor:** Chat Orquestrador Estratégico (Manus AI)  
> **Destinatário:** Chat Executor (Claude)  
> **Status:** Aprovado para Execução Imediata  

---

## 🎯 Objetivo

Com base nas conclusões da **Auditoria Total do DSS** (`docs/governance/audit-reports/RELATORIO_CONSOLIDADO_ESTRATEGICO_DSS.md`) e nos excelentes resultados obtidos na Onda 3, você deve executar a **Onda 4 (Documentação e Escala)**.

Esta onda foca em sanar os débitos técnicos de infraestrutura e qualidade restantes para que o DSS possa ser publicado e consumido em produção com 100% de segurança:
1. **Mitigação do Gap de Testes Legados (Os 47 Componentes):** Estabelecer o plano de ação prático e começar a geração dos arquivos `test.js` para os componentes legados, priorizando a família crítica de **Inputs e Controles** (formulários).
2. **Migração para `sass-embedded`:** Atualizar o compilador de CSS do `sass` legado para o `sass-embedded` de alta performance no `vite.config.lib.js` do Core, eliminando o warning `legacy-js-api`.
3. **Refatoração dos 6 Vue SFCs do `DssCard`:** Substituir os `@import` residuais nos blocos `<style>` dos componentes do DssCard por `@use` moderno.
4. **Automação da Cobertura do Portal de Documentação:** Desenvolver um script em `scripts/generate-portal-landing-pages.js` que leia os selos de conformidade em `docs/Compliance/seals/` e gere automaticamente os arquivos Markdown/MDX para elevar a cobertura do portal React de 39% para 100%.

---

## 🛠️ Detalhamento das Ações

### AÇÃO 1: Plano de Mitigação dos Testes Legados (Prioridade Máxima)

Atualmente, 46 componentes do Core não possuem arquivo `test.js`. Não podemos gerar todos de uma vez nesta rodada para evitar sobrecarga, mas devemos estabelecer a estrutura e mitigar o grupo de **maior risco de regressão**: a família de **Inputs e Controles** (Formulários).

* **Meta desta Onda:** Criar o arquivo `test.js` para os **11 componentes de formulário críticos** que estão sem cobertura:
  1. `DssInput`
  2. `DssSelect`
  3. `DssField`
  4. `DssRadio`
  5. `DssTextarea`
  6. `DssRange`
  7. `DssSlider`
  8. `DssOptionGroup`
  9. `DssFile`
  10. `DssKnob`
  11. `DssRating`
* **Golden Reference:** Use o arquivo de teste existente `DssCheckbox.test.js` (em `packages/core/components/base/DssCheckbox/`) como modelo de cobertura (teste de props, v-model, estados, eventos e acessibilidade ARIA).
* **Localização:** Cada arquivo de teste deve ser criado na raiz da pasta do respectivo componente (ex: `packages/core/components/base/DssInput/DssInput.test.js`).

---

### AÇÃO 2: Migração para `sass-embedded` (Fim dos Warnings de Build)

O build do Core exibe o warning `legacy-js-api` porque o Vite utiliza a API legada do Sass por padrão quando o pacote `sass` comum está instalado.

* **O que fazer:**
  1. No `packages/core/package.json`, substitua a dependência `"sass": "^1.97.2"` por `"sass-embedded": "^1.97.2"` (ou versão estável recente compatível).
  2. No `packages/core/vite.config.lib.js`, adicione explicitamente a configuração de pré-processador para forçar o uso da API moderna (`modern` ou `modern-compiler` conforme suporte da versão do Vite):
     ```javascript
     css: {
       preprocessorOptions: {
         scss: {
           api: 'modern-compiler' // ou 'modern' dependendo do Vite 5.x
         }
       }
     }
     ```
  3. Repita a mesma atualização no `apps/sandbox/package.json` se necessário para garantir consistência no ambiente de desenvolvimento.

---

### AÇÃO 3: Refatoração dos 6 Vue SFCs do `DssCard`

O componente `DssCard` possui 6 arquivos Vue (SFCs) que ainda carregam `@import '../DssCard.module.scss'` em seus blocos `<style>`.

* **Arquivos:**
  * `DssCard.ts.vue` e `DssCard.vue`
  * `DssCardActions.ts.vue` e `DssCardActions.vue`
  * `DssCardSection.ts.vue` e `DssCardSection.vue`
* **O que fazer:** Substitua o `@import '../DssCard.module.scss';` por `@use '../DssCard.module.scss';` (ou alias correto) nos blocos `<style lang="scss">` desses 6 arquivos.

---

### AÇÃO 4: Script de Automação do Portal de Documentação

Para evitar que desenvolvedores fiquem sem documentação de 61% do catálogo do DSS, você deve criar um script de automação de escala.

* **O que fazer:** Criar o arquivo `scripts/generate-portal-landing-pages.js` na raiz do monorepo.
* **Lógica do Script:**
  1. O script deve varrer a pasta `docs/Compliance/seals/` para listar todos os componentes selados.
  2. Para cada componente selado que **não** possua um arquivo de página correspondente em `apps/docs-portal/src/pages/components/`, o script deve gerar automaticamente uma página de documentação padrão `.md` ou `.tsx`.
  3. A página gerada deve ler os dados do `dss.meta.json` do respectivo componente para preencher automaticamente:
     * Título e Descrição.
     * Status de Conformidade e Fase.
     * Tabela de Props bloqueadas e permitidas.
     * Tokens consumidos.
  4. Adicione um script `"portal:sync-docs": "node scripts/generate-portal-landing-pages.js"` no `package.json` raiz.

---

## 🧪 Critérios de Aceite e Validação

1. **Build Limpo e Silencioso:**
   * Execute `npm run core:build`. O build deve passar **com zero warnings**, incluindo o fim do warning `legacy-js-api`.
2. **Execução de Testes com Sucesso:**
   * Execute os testes da biblioteca: `npm run test` (ou comando correspondente do Vitest). Os 11 novos arquivos de teste de formulários devem ser executados e passar com 100% de sucesso.
3. **Geração de Docs Funcional:**
   * Execute `npm run portal:sync-docs`. O script deve rodar sem erros e criar as páginas de documentação faltantes na pasta do portal.
   * Execute `npm run docs:build` para garantir que o portal React compila perfeitamente com as novas páginas geradas.

---

## 📢 Instruções de Commit

Quando concluir e validar todas as etapas locais, faça o commit das alterações com a mensagem padrão:

> `chore(engineering): executa onda 4 de engenharia (testes de inputs, sass-embedded e automacao de docs)`

Envie o relatório de sucesso detalhando os arquivos criados e modificados de volta para o chat orquestrador estratégico. Boa sorte!
