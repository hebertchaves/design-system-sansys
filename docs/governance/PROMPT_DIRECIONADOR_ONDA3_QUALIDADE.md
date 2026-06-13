# 🤖 PROMPT DIRECIONADOR: Onda 3 — Engenharia e Qualidade (Sass Moderno & Gate de Testes)
> **Autor:** Chat Orquestrador Estratégico (Manus AI)  
> **Destinatário:** Chat Executor (Claude)  
> **Status:** Aprovado para Execução Imediata  

---

## 🎯 Objetivo

Com base nas conclusões da **Auditoria Total do DSS** (`docs/governance/audit-reports/RELATORIO_CONSOLIDADO_ESTRATEGICO_DSS.md`), você deve executar a **Onda 3 (Engenharia e Qualidade)**. 

Esta onda foca em dois pilares fundamentais para a resiliência, escalabilidade e conformidade técnica do DSS:
1. **Modernização do Sistema de Módulos Sass:** Substituição definitiva das ocorrências de `@import` legadas por `@use` e `@forward` nos arquivos `.scss` globais, no Foundation (tokens e utils) e nos componentes de composição parcial, eliminando warnings e preparando o sistema para o Dart Sass 3.0 (fim de 2026).
2. **Instituição do Gate de Testes Obrigatório:** Atualização dos templates e pré-prompts de governança para exigir cobertura de testes unitários (`test.js`) em todas as novas implementações, e mapeamento do plano de mitigação para os 47 componentes que atualmente possuem esse gap.

---

## 🛠️ Detalhamento das Ações

### AÇÃO 1: Modernização do Sass (Sass Module System)

Você deve refatorar as estruturas de arquivos `.scss` para usar o sistema moderno de módulos do Sass (`@use` e `@forward`). Isso elimina o escopo global implícito e evita colisões de variáveis e mixins.

#### 1.1. Refatoração do Foundation (Tokens e Utils)
* **`packages/core/tokens/index.scss`:** Substitua todos os `@import` por `@use` ou `@forward` correspondentes.
* **`packages/core/utils/index.scss`:** Converta os `@import` internos para `@use`. Como as funções e mixins de utilitários são consumidos por outros arquivos, certifique-se de expor os membros necessários de forma limpa.
* **Funções Condicionais:** No arquivo `_functions.scss` (ou equivalente em utils), converta qualquer chamada depreciada da função `if()` inline para a estrutura moderna `@if / @else` do Sass.

#### 1.2. Eliminação de `@import` Residuais nos Componentes
Identificamos 14 componentes que já usam `@use` em seus orquestradores principais, mas ainda possuem `@import '../../../../utils/index'` ou referências internas em suas camadas internas de composição (Layer 2) ou outputs (Layer 4). Você deve refatorar esses arquivos específicos:

* **Componentes Identificados:** `DssBadge`, `DssBtnDropdown`, `DssBtnGroup`, `DssBtnToggle`, `DssCard`, `DssExpansionItem`, `DssFab`, `DssFabAction`, `DssList`, `DssMarkupTable`, `DssOptionGroup`, `DssTabPanel`, `DssTabPanels` e `DssTabs`.
* **Como refatorar:**
  * Substitua `@import '../../../../utils/index';` por `@use '../../../../utils/index' as utils;` (ou caminho equivalente correto).
  * Atualize as chamadas de mixins e funções internas para usar o namespace (ex: `@include utils.respond-to(...)` em vez de `@include respond-to(...)`).
* **Golden Reference de Refatoração:** Use o componente `DssAjaxBar` (especialmente `DssAjaxBar.module.scss` e sua Layer 2) como referência de arquitetura Sass moderna 100% limpa e aderente.

---

### AÇÃO 2: Instituição do Gate de Testes e Mitigação do Gap

Atualmente, 47 dos 77 componentes do DSS (incluindo 11 dos 14 componentes de formulário) não possuem arquivos de testes unitários `test.js`. Precisamos estancar esse vazamento de qualidade para novas criações e planejar a correção do legado.

#### 2.1. Atualização do `TEMPLATE_FASE3.md`
* Edite o arquivo `docs/governance/pre-prompts/TEMPLATE_FASE3.md`.
* Adicione uma nova seção obrigatória e bloqueante chamada **`11. Requisitos de Testes Unitários (Gate de Qualidade)`**.
* Esta seção deve enforcar que **nenhum componente da Fase 3 pode ser selado ou homologado sem o arquivo `{NomeDoComponente}.test.js` correspondente**.
* O template de teste deve exigir cobertura mínima para:
  1. **Renderização Básica:** Confirmar que o componente monta sem quebras.
  2. **Propagação de Props Críticas:** Testar `brand`, `disabled` e `loading`.
  3. **Lógica Composta (Composite Logic):** Testar a propagação de estados para componentes filhos (essencial para a Fase 3).
  4. **Acessibilidade (ARIA):** Validar a presença de atributos ARIA (`aria-label`, `role`, etc.) conforme especificado no pré-prompt.

#### 2.2. Atualização dos Pré-prompts de Componentes Ativos
* Atualize os pré-prompts de componentes complexos da Fase 3 que estão em planejamento ou andamento (ex: `pre_prompt_dss_cadris_card.md`, `pre_prompt_dss_carousel.md`) para incluir explicitamente a seção de Requisitos de Testes baseada no novo template.

---

## 🧪 Critérios de Aceite e Validação

Após realizar as alterações, você deve garantir que:

1. **Compilação Limpa do Sass (Zero Warnings):**
   * Execute o build da biblioteca: `npm run core:build` (ou comando equivalente no workspace).
   * O build deve completar com sucesso **sem exibir nenhum warning de deprecação do Sass** relacionado a `@import` ou funções depreciadas nos arquivos refatorados.

2. **Sandbox e Portal Operacionais:**
   * Execute `npm run build:all` ou teste individualmente os builds do sandbox (`npm run build --workspace=@sansys/sandbox`) e do portal (`npm run docs:build`).
   * Ambos os ambientes devem compilar sem erros de resolução de caminhos Sass ou variáveis indefinidas.

3. **Consistência de Arquivos de Governança:**
   * O arquivo `TEMPLATE_FASE3.md` atualizado deve estar visível e formatado corretamente no Git.

---

## 📢 Instruções de Commit

Quando concluir todas as etapas e validar os builds, faça o commit das alterações na branch correspondente com a mensagem padrão:

> `chore(engineering): executa onda 3 de engenharia (sass module system e gate de testes)`

Envie o relatório de sucesso detalhando os arquivos modificados de volta para o chat orquestrador estratégico. Boa execução!
