# 🎯 Prompt Direcionador: Onda 7 — Governança e Ajustes Finais (Pós-Sessão de Prontidão)

Você é o **Agente Executor de Governança do DSS**. Sua missão nesta Onda 7 é implementar três ajustes finais e cirúrgicos no repositório para consolidar as melhorias de infraestrutura, testes e visual defaults realizadas na última sessão.

Estas ações garantirão que o ecossistema documental seja 100% íntegro, autossuficiente e livre de ruídos de build ou histórico para qualquer desenvolvedor que consuma o sistema.

---

## 📋 Diretrizes de Execução

### Ação 1 — Documentação de Git Hooks e Scripts de Sincronização
O novo sistema de **Default Preview Data-Driven** introduziu o script `scripts/sync-visual-contract.js` e o pre-commit hook para garantir que o `DSS_REFERENCIA_VISUAL_ANALISE.md` nunca fique desatualizado em relação aos `dss.meta.json`. Isso precisa estar explicitamente documentado para novos desenvolvedores.

1. **No `README.md` Raiz:**
   * Localize a seção de **Desenvolvimento** ou **Instalação**.
   * Adicione uma subseção dedicada chamada **"Git Hooks e Sincronização Automatizada"**.
   * Explique que, ao clonar o repositório, o desenvolvedor **deve** rodar o comando `npm run setup:hooks` para instalar o hook de pre-commit.
   * Explique brevemente o fluxo: o hook roda o script `scripts/sync-visual-contract.js` automaticamente a cada commit, gerando o catálogo Markdown a partir dos JSONs de preview, garantindo que o contrato visual esteja sempre sincronizado.

2. **No `docs/guides/COMANDOS_EXATOS.md`:**
   * Adicione o comando `npm run setup:hooks` na lista de comandos de inicialização e configuração do ambiente, explicando seu propósito de governança.

---

### Ação 2 — Higienização do Git e `.gitignore` para o `dist/` do Portal
Atualmente, a pasta `apps/docs-portal/dist/` (assets compilados de produção) está sendo rastreada e commitada no repositório. Em um monorepo profissional, artefatos compilados devem ser ignorados para evitar ruídos no histórico de commits e conflitos de merge.

1. **No `.gitignore` Raiz:**
   * Adicione as seguintes entradas para ignorar pastas de build de todos os pacotes e aplicações:
     ```gitignore
     # Build Outputs
     dist/
     .svelte-kit/
     .next/
     .nuxt/
     out/
     build/
     
     # Ignorar especificamente dists dentro de apps e packages
     apps/*/dist/
     packages/*/dist/
     ```
2. **Remover do Rastreamento do Git (Sem deletar fisicamente):**
   * Execute o comando para remover a pasta `dist` do cache do Git, mantendo-a localmente:
     ```bash
     git rm -r --cached apps/docs-portal/dist/
     ```
   * *Nota: Certifique-se de que o `.gitignore` atualizado seja commitado junto com essa remoção.*

---

### Ação 3 — Atualização do Relatório Consolidado Estratégico
O arquivo `docs/governance/audit-reports/RELATORIO_CONSOLIDADO_ESTRATEGICO_DSS.md` foi escrito antes das ondas de ajuste finais. Ele precisa ser atualizado para registrar que **todas as 6 Ondas de Engenharia e Governança foram 100% concluídas com sucesso**.

1. **No `RELATORIO_CONSOLIDADO_ESTRATEGICO_DSS.md`:**
   * Atualize o **Scorecard Final de Saúde** para refletir o estado real de hoje:
     * Cobertura de Testes Unitários: **100% (76/76 componentes com test.js)**.
     * Cobertura do Portal de Docs: **100% (91/91 componentes com páginas geradas)**.
     * Warnings de Build Sass: **Zero (Sass-embedded integrado)**.
     * Links Quebrados: **Zero (Onda 5 concluída)**.
     * Sincronização Core vs. Espelho: **Concluída (Espelho removido, sandbox consome core via alias `@components`)**.
     * Contrato Visual Canônico: **100% Consolidado via `DSS_REFERENCIA_VISUAL_ANALISE.md` integrado com o `defaultPreview` data-driven**.
   * Adicione uma seção rápida resumindo a **Onda 5 (Prontidão)** e a **Onda 6 (Consolidação do Contrato Visual)** na lista de ondas concluídas.
   * Mude o veredicto final do relatório de "Aprovado com Ajustes" para **APROVADO PARA PRODUÇÃO (PADRÃO TRIPLE-A ATINGIDO)**.

---

## 🏁 Critérios de Aceite (Gate de Conclusão)

- [ ] `README.md` atualizado documentando o comando `npm run setup:hooks` e o fluxo de sincronização.
- [ ] `docs/guides/COMANDOS_EXATOS.md` atualizado com o comando de setup de hooks.
- [ ] `.gitignore` raiz atualizado para ignorar todas as pastas `dist/` de forma genérica e específica.
- [ ] Pasta `apps/docs-portal/dist/` removida do rastreamento do Git (`git rm -r --cached`).
- [ ] `RELATORIO_CONSOLIDADO_ESTRATEGICO_DSS.md` atualizado com veredicto final **APROVADO PARA PRODUÇÃO** e scorecard de 100% verde.
- [ ] Todos os testes locais e builds continuam passando sem erros.

---

## 💾 Instruções de Commit

Faça as alterações e crie um **commit único** com a mensagem padrão:
> `docs(governance): executa Onda 7 de ajustes finais e atualiza laudo para produção`
