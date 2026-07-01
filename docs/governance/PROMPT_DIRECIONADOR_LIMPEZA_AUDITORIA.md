# 🚀 DIRETRIZ DE EXECUÇÃO: ONDA 1 & ONDA 2 (LIMPEZA E AJUSTES DE CAMINHOS)
**Autor:** Chat Orquestrador Estratégico (Manus AI)  
**Destinatário:** Chat Executor (Claude)  
**Data:** 30 de Maio de 2026  
**Status:** Aprovado para Execução Imediata  

---

## 🎯 Objetivo

Com base nas conclusões da **Auditoria Total do DSS** consolidada em `docs/governance/audit-reports/RELATORIO_CONSOLIDADO_ESTRATEGICO_DSS.md`, você deve executar imediatamente as tarefas mapeadas na **Onda 1 (Correções Críticas de Caminhos)** e **Onda 2 (Governança, Limpeza e Descarte)**.

Essas ações visam sanar os riscos operacionais imediatos do monorepo e higienizar o sistema de arquivos antes de avançarmos para a engenharia da Fase 3.

---

## 🛠️ Detalhamento das Ações

### ONDA 1: Correções Críticas de Caminhos (Imediato)

1. **Ajustar caminhos do Grid Inspector no MCP:**
   * Abra o arquivo `packages/mcp/src/tools/describeGridInspector.ts`.
   * Verifique e substitua qualquer referência ao caminho obsoleto da raiz `"Grid Inspector/"` pelo caminho correto do monorepo `"packages/grid-inspector/"`.
   * *Atenção:* Certifique-se de que caminhos de documentação ou scripts de CI referenciados nessa ferramenta apontem corretamente para a nova estrutura.

2. **Verificar Configurações Globais do MCP:**
   * Certifique-se de que o arquivo `.mcp.json` na raiz do projeto está apontando para o build correto: `"args": ["./packages/mcp/build/index.js"]`. (Caso já esteja, apenas valide).

---

### ONDA 2: Governança, Limpeza e Descarte (Sprint Atual)

1. **Executar Descarte Físico (REMOVE):**
   Exclua permanentemente os seguintes arquivos e pastas vazios que geram ruído no repositório:
   * `docs/getting-started.md` (arquivo stub sem conteúdo)
   * `docs/guides/ui-rules/` (pasta vazia)
   * `docs/components/` (pasta vazia)

2. **Arquivar Guias e Especificações Obsoletas (ARCHIVE):**
   Mova os seguintes guias históricos e especificações antigas para suas respectivas subpastas em `docs/archive/` para limpar a navegação de novos desenvolvedores:
   
   * **Para `docs/archive/fixes/`:**
     * `docs/guides/PLANO_ACAO_GRID_LAYOUT.md`
   
   * **Para `docs/archive/reports/`:**
     * `docs/guides/dss_governanca_e_documentacao_de_componentes_basios_fase_1.md`
     * `docs/guides/dss_governanca_e_documentacao_de_componentes_compostos_fase_2.md`
     * `docs/guides/MIGRATION_TO_TYPESCRIPT.md`
     * `docs/guides/INSTRUCOES_TESTE_DSSBUTTON.md`
   
   * **Para `docs/archive/specs/`:**
     * `docs/guides/GRID INSPECTOR SPEC v1.0.txt`
     * `docs/guides/Guia avançado de Grid para UI Design Corporativo.txt`
     * `docs/guides/MCP_GRID_VALIDATION_INTEGRATION.md`
     * `docs/reference/ARQUITETURA_TOKENS_ACCESSIBILITY.md` (marcado como obsoleto)

3. **Limpar Configuração do Sandbox Vue:**
   * Abra o arquivo `apps/sandbox/vite.config.js`.
   * **Remova** as seguintes referências obsoletas a React e deduplicações de dependências que não existem mais no escopo do sandbox:
     ```javascript
     // REMOVER as linhas abaixo dentro de resolve.alias:
     'react': resolve(__dirname, 'node_modules/react'),
     'react-dom': resolve(__dirname, 'node_modules/react-dom'),
     'react/jsx-runtime': resolve(__dirname, 'node_modules/react/jsx-runtime'),
     
     // REMOVER a linha abaixo dentro de resolve:
     dedupe: ['react', 'react-dom'],
     ```
   * **Ajustar Alias de Componentes:** Certifique-se de que o alias `@dss` aponta para a pasta correta de componentes no monorepo: `resolve(__dirname, '../../packages/core/components/base')` (ou caminho equivalente relativo correto).

---

## 🧪 Critérios de Aceite e Validação

Após realizar as alterações, você deve garantir que:

1. **Build do MCP com Sucesso:**
   * Execute `npm run build --workspace=@sansys/dss-mcp` (ou comando equivalente do monorepo) para garantir que a compilação do TypeScript do MCP passe sem erros após a alteração de caminhos.

2. **Sandbox Vue Rodando Limpo:**
   * Execute `npm run dev --workspace=@sansys/sandbox` (ou abra o sandbox localmente) para garantir que o Vite inicialize o app de testes Vue sem erros de alias ou referências quebradas.

3. **Git Status Limpo:**
   * O comando `git status` não deve listar nenhum dos arquivos marcados para descarte ou arquivamento em suas pastas originais.

---

## 📢 Instruções Finais ao Executor

Realize as movimentações usando comandos Git padrão se possível para preservar o histórico de commits. Quando concluir todas as etapas e validar os builds, faça o commit na branch correspondente com a mensagem:

> `chore(governance): executa ondas 1 e 2 de limpeza e caminhos pós-auditoria`

Envie o relatório de sucesso de volta para o chat orquestrador estratégico. Boa execução!
