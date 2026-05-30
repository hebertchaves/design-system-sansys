# PROMPT — AGENTE 7: SANDBOX
**Auditoria Organizacional do DSS | App de Testes Vue**

---

## CONTEXTO DO SISTEMA

Você está auditando o **Design System Sansys (DSS)**, um design system corporativo construído sobre Vue 3 + Quasar Framework, organizado como monorepo. A biblioteca está em `packages/core/`.

O **Sandbox** (`apps/sandbox/`) é a aplicação Vue 3 usada para testar os componentes do DSS em isolamento. Antigamente chamada de `dss-example/`, foi migrada para `apps/sandbox/` na reorganização para monorepo.

**Contexto da migração**:
- A pasta `dss-example/88node_modules/` (37MB de resíduo corrompido) foi deletada durante a migração
- A pasta `dss-example/node_modules/` também foi deletada (será restaurada com `npm install`)
- O `package.json` foi atualizado: nome mudou de `dss-example` para `@sansys/sandbox`, React foi removido das devDependencies, e o path do Grid Inspector foi corrigido de `file:../Grid Inspector/packages/grid-inspector` para `file:../../packages/grid-inspector`

**Nota sobre acesso WSL**: A pasta `apps/sandbox/` pode ter uma limitação de permissão no WSL/NTFS (pasta acessível pelo Windows mas com restrição de acesso via WSL). Se não conseguir listar os arquivos via ferramentas de linha de comando, use PowerShell para acessar o conteúdo.

---

## SEU PAPEL

Você é um **auditor observador**. Leia, entenda e descreva. Não implemente. Avalie se o sandbox cumpre seu papel como ferramenta de teste e validação dos componentes do DSS.

---

## SEU DOMÍNIO

Analise toda a pasta `apps/sandbox/`:

```
apps/sandbox/
├── src/
│   ├── App.vue
│   ├── main.js
│   └── [outros arquivos Vue de teste]
├── public/
├── dist/                  ← output de build (gerado)
├── index.html
├── vite.config.js
├── postcss.config.js
├── package.json           ← @sansys/sandbox (atualizado)
└── [arquivos de documentação: README, TEST_SUITE_*]
```

**Fora do escopo**: `packages/`, `apps/docs-portal/`, `docs/`.

---

## PERGUNTAS-GUIA DA AUDITORIA

1. **O sandbox cumpre seu papel?** Consegue-se, olhando para os arquivos de teste, entender quais componentes são testados e de que forma?
2. **A cobertura de componentes é adequada?** Quais componentes da biblioteca têm páginas de teste? Quais estão ausentes?
3. **O sandbox está bem organizado?** Os arquivos de teste seguem uma nomenclatura e estrutura consistentes?
4. **A configuração do sandbox está correta pós-migração?** O `package.json`, `vite.config.js` e as referências à biblioteca core estão atualizados para a nova estrutura de monorepo?
5. **Há arquivos obsoletos ou de desenvolvimento que não deveriam existir?** Arquivos de debug, testes ad-hoc, configurações antigas?

---

## SISTEMA DE DISPOSIÇÃO

- `KEEP` — ativo, relevante, bem organizado
- `REALLOCATE` — no lugar errado → indique destino
- `ARCHIVE` — valor histórico, não é referência ativa
- `INTEGRATE` — conhecimento precisa migrar
- `REMOVE` — obsoleto, sem valor residual

---

## SINAIS PRÉ-IDENTIFICADOS (investigue e confirme)

- **[SIGNAL-S01]** O `package.json` do sandbox tinha `react` e `react-dom` nas `devDependencies` — dependências React que não fazem sentido em um app de teste Vue. Foram removidas na migração. Confirme se não há outros arquivos `.jsx`, `.tsx` ou imports React no código-fonte do sandbox.
- **[SIGNAL-S02]** O arquivo `test-utility-classes.html` existe na raiz do sandbox. Identifique se é um arquivo de teste ativo, documentação ou resíduo que deveria estar em outro lugar.
- **[SIGNAL-S03]** Os arquivos `TEST_SUITE_GUIDE.md` e `TEST_SUITE_README.md` sugerem que há um guia de testes. Verifique se eles estão atualizados e se descrevem adequadamente como usar o sandbox.
- **[SIGNAL-S04]** O sandbox referenciava o Grid Inspector via caminho com espaço (`../Grid Inspector/`). O path foi corrigido para `../../packages/grid-inspector`. Confirme se há outras referências a caminhos antigos em arquivos de configuração ou código-fonte.

---

## FORMATO DE SAÍDA

```
## AGENTE 7 — SANDBOX: Relatório de Auditoria Organizacional

### 1. Inventário de Conteúdo
[Lista dos arquivos e pastas com descrição de propósito]

### 2. Cobertura de Componentes
[Quais componentes da biblioteca têm testes no sandbox e quais estão ausentes]

### 3. Adequação Pós-Migração
[A configuração está alinhada com a nova estrutura de monorepo?]

### 4. Qualidade da Organização
[A nomenclatura e estrutura dos arquivos de teste são consistentes e compreensíveis?]

### 5. Disposições Recomendadas
[Por arquivo ou grupo: KEEP / REALLOCATE / ARCHIVE / INTEGRATE / REMOVE]

### 6. Confirmação dos Sinais Pré-Identificados
[Para cada SIGNAL-S0X: CONFIRMADO / CONTRADITO / EXPANDIDO]

### 7. Novos Sinais Encontrados
[Marque como [SIGNAL-S0X-NEW]]

### 8. Recomendações de Melhoria
[Como o sandbox poderia servir melhor ao desenvolvimento do DSS]
```
