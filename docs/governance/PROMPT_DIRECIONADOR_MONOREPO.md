# 🚀 DIRETRIZ DE TRANSIÇÃO: ARQUITETURA DE MONOREPO DSS
**Autor:** Chat Orquestrador Estratégico (Manus AI)  
**Destinatário:** Chat Executor (Claude)  
**Data:** 29 de Maio de 2026  
**Status:** Aprovado para Execução  

---

## 🎯 Objetivo Geral

Você foi designado para realizar a **reestruturação arquitetural e física** do repositório do Design System Sansys (DSS). O objetivo é transformar o repositório atual em um **Monorepo limpo, modular e escalável**, separando fisicamente os diferentes ecossistemas tecnológicos que coexistem no projeto. 

Atualmente, o código-fonte da biblioteca (Vue 3 + Quasar) e o portal de documentação (React + Lovable) estão misturados na raiz do repositório, o que gera conflito de dependências e compromete a integridade do pacote de produção. Esta transição deve ser feita **sem quebrar nenhuma funcionalidade existente** e garantindo que o portal Lovable e o sandbox Vue continuem rodando perfeitamente.

---

## 📐 Estrutura Alvo do Monorepo

O repositório deve ser reorganizado de acordo com a seguinte estrutura de diretórios:

```
design-system-sansys/                  ← Raiz do Monorepo
├── package.json                        ← Configuração de Workspaces (npm workspaces)
├── package-lock.json                   ← Lockfile unificado da raiz
│
├── packages/                           ← Pacotes reutilizáveis e publicáveis
│   ├── core/                           ← Biblioteca de Componentes Vue 3 (@sansys/design-system)
│   │   ├── components/                 ← components/base, components/composed, components/stress-test
│   │   ├── tokens/                     ← SCSS de tokens
│   │   ├── utils/                      ← Utilitários TypeScript/JavaScript
│   │   ├── composables/                ← Vue Composables
│   │   ├── themes/                     ← Temas e variáveis globais
│   │   ├── dist/                       ← Output de build (gerado no build)
│   │   ├── index.js                    ← Entry point de exportação da lib
│   │   ├── vite.config.lib.js          ← Configuração de build da biblioteca
│   │   └── package.json                ← Dependências puras da biblioteca Vue
│   │
│   ├── mcp/                            ← Servidor MCP (@sansys/dss-mcp)
│   │   ├── src/
│   │   ├── build/
│   │   └── package.json
│   │
│   └── grid-inspector/                 ← Inspetor de Grid (@sansys/grid-inspector)
│       ├── src/
│       └── package.json
│
├── apps/                               ← Aplicações e Consumidores
│   ├── docs-portal/                    ← Portal de Documentação (React + Lovable)
│   │   ├── src/                        ← Antiga pasta src/ da raiz
│   │   ├── index.html                  ← Antigo index.html da raiz
│   │   ├── tailwind.config.ts          ← Antigo tailwind.config.ts da raiz
│   │   ├── vite.config.ts              ← Antigo vite.config.ts da raiz
│   │   └── package.json                ← Dependências exclusivas do React/Tailwind/Lovable
│   │
│   └── sandbox/                        ← App de Testes Vue (Antiga pasta dss-example/)
│       ├── src/
│       ├── index.html
│       ├── vite.config.js
│       └── package.json                ← Dependências puras do Vue 3/Quasar para testes
│
├── docs/                               ← Documentação de governança (permanece inalterada)
│   ├── Compliance/
│   ├── governance/
│   └── reference/
│
├── scripts/                            ← Scripts utilitários de build e automação
│   ├── build-css.js                    ← Movido da raiz
│   ├── generate-pdf.js                 ← Movido da raiz
│   ├── md-to-html-pdf.js               ← Movido da raiz
│   └── inject-default-preview.cjs      ← Movido da raiz
│
└── .mcp.json                           ← Configuração do servidor MCP na raiz
```

---

## 🛠️ Passo a Passo Detalhado para a Execução

Siga rigorosamente as etapas abaixo para garantir uma transição segura:

### Etapa 1: Preparação do Ambiente e Backup
1. Garanta que o repositório esteja limpo antes de começar (`git status`).
2. Crie uma branch de desenvolvimento dedicada chamada `feature/arquitetura-monorepo` para realizar as alterações.

### Etapa 2: Criação dos Diretórios Estruturais
Crie as pastas necessárias que ainda não existem:
```bash
mkdir -p packages/core
mkdir -p apps/docs-portal
mkdir -p scripts
```

### Etapa 3: Movimentação de Arquivos e Limpeza de Resíduos
Realize as movimentações físicas de arquivos com precisão:

1. **Camada Core (Vue 3):**
   * Mova as pastas `components/`, `tokens/`, `utils/`, `composables/` e `themes/` para `packages/core/`.
   * Mova os arquivos `index.js` e `vite.config.lib.js` para `packages/core/`.
   * Mova o `package.json` atual para `packages/core/package.json` (ele será ajustado na Etapa 4).

2. **Camada Portal de Documentação (React/Lovable):**
   * Mova a pasta `src/` inteira da raiz para `apps/docs-portal/src/`.
   * Mova os arquivos `index.html`, `tailwind.config.ts`, `vite.config.ts`, `postcss.config.js` e `tsconfig.json` para `apps/docs-portal/`.

3. **Camada Sandbox (dss-example):**
   * Renomeie e mova a pasta `dss-example/` para `apps/sandbox/`.
   * **AÇÃO CRÍTICA DE HIGIENIZAÇÃO:** Delete permanentemente a pasta `apps/sandbox/88node_modules/` (`rm -rf`). Ela é um resíduo corrompido de 47MB que foi commitado por engano.

4. **Ferramentas e Scripts:**
   * Mova o servidor MCP atual para `packages/mcp/` (se ele já não estiver lá).
   * Mova a pasta `packages/grid-inspector/` para garantir que esteja sob a nova estrutura.
   * **AÇÃO CRÍTICA DE HIGIENIZAÇÃO:** Delete permanentemente a pasta `"Grid Inspector/"` (com espaço no nome) localizada na raiz. Ela é um resíduo obsoleto de desenvolvimento.
   * Mova os scripts soltos na raiz (`build-css.js`, `generate-pdf.js`, `md-to-html-pdf.js`, `inject-default-preview.cjs`) para a pasta `scripts/`.

---

### Etapa 4: Configuração dos `package.json` e Workspaces

Esta é a etapa mais crítica para o sucesso do Monorepo. Devemos isolar as dependências em seus respectivos escopos.

#### 1. Novo `package.json` da Raiz (Gerenciador de Workspaces)
Crie um `package.json` na raiz do repositório configurado para gerenciar os workspaces via npm:

```json
{
  "name": "design-system-sansys-monorepo",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "bootstrap": "npm install",
    "core:build": "npm run build --workspace=@sansys/design-system",
    "core:dev": "npm run dev --workspace=@sansys/design-system",
    "docs:dev": "npm run dev --workspace=@sansys/docs-portal",
    "docs:build": "npm run build --workspace=@sansys/docs-portal",
    "sandbox:dev": "npm run dev --workspace=@sansys/sandbox",
    "mcp:build": "npm run build --workspace=@sansys/dss-mcp",
    "mcp:start": "npm run start --workspace=@sansys/dss-mcp",
    "build:all": "npm run core:build && npm run docs:build && npm run mcp:build"
  }
}
```

#### 2. Ajuste do `packages/core/package.json` (A Biblioteca Vue 3)
Este arquivo deve conter **apenas** dependências relacionadas ao Vue 3, Quasar e SCSS. Remova todas as dependências React, Tailwind e Lovable.

* **Manter em `dependencies` / `devDependencies`:** `vue`, `sass`, `@vitejs/plugin-vue`, `typescript`, `vite`, `vue-tsc`.
* **Remover completamente:** `react`, `react-dom`, `@radix-ui/*`, `tailwindcss`, `lovable-tagger`, `recharts`, etc.
* **Nome do pacote:** Mantenha `"name": "@sansys/design-system"`.
* **Ajustar caminhos de exportação:** Certifique-se de que os caminhos em `files`, `main`, `module` e `exports` apontem corretamente para os arquivos relativos à pasta `packages/core/`.

#### 3. Criação do `apps/docs-portal/package.json` (O Portal React/Lovable)
Este arquivo deve conter as dependências que estavam no `package.json` raiz originais, focadas em React, Tailwind e Lovable.

* **Manter em `dependencies`:** `@radix-ui/*`, `@tanstack/react-query`, `react`, `react-dom`, `react-router-dom`, `tailwindcss`, `lovable-tagger`, `lucide-react`, `recharts`, `sonner`, `tailwind-merge`, etc.
* **Nome do pacote:** `"name": "@sansys/docs-portal"`.
* **Scripts:** Ajuste os scripts `dev` e `build` para rodar o Vite localmente na pasta do app.

#### 4. Ajuste do `apps/sandbox/package.json` (O App de Testes Vue)
Garanta que este arquivo esteja limpo, apontando para as dependências Vue 3/Quasar locais e que utilize o pacote local `@sansys/design-system` via link de workspace se necessário.

---

### Etapa 5: Ajuste de Configurações e Paths (Vite, TSConfig, etc.)

Como os arquivos mudaram de lugar, as configurações do Vite e TypeScript precisam ser atualizadas para não quebrar as importações com alias (`@/*`):

1. **`apps/docs-portal/vite.config.ts`:**
   * Atualize o alias `@` para apontar para `./src` relativo à pasta `apps/docs-portal/`.
   * Garanta que o output de build do portal vá para `dist/` dentro de `apps/docs-portal/`.

2. **`packages/core/vite.config.lib.js`:**
   * Garanta que o ponto de entrada (`entry`) aponte para o `index.js` local na pasta `packages/core/`.

3. **`tsconfig.json` do docs-portal e do core:**
   * Certifique-se de que cada pacote tenha seu próprio `tsconfig.json` ajustado para o seu escopo e caminhos relativos corretos.

---

## 🧪 Validação e Critérios de Aceite (Gate de Sucesso)

Após realizar todas as movimentações e configurações, você deve rodar os seguintes testes para validar a integridade do Monorepo:

1. **Instalação Limpa:**
   * Delete qualquer `node_modules` existente na raiz e subpastas.
   * Rode `npm install` na raiz do repositório. O npm deve bootstrapar todos os workspaces e criar os links simbólicos corretos.

2. **Build da Biblioteca (Vue 3):**
   * Rode `npm run core:build` na raiz. O build deve completar com sucesso, gerando a pasta `packages/core/dist/` com os arquivos `dss.es.js`, `dss.umd.js` e `style.css`.

3. **Build do Portal (React/Lovable):**
   * Rode `npm run docs:build` na raiz. O build deve completar com sucesso, compilando o site React sem erros de TypeScript ou importação.

4. **Build do MCP:**
   * Rode `npm run mcp:build` na raiz (ou o comando equivalente). O servidor MCP deve compilar com sucesso.

5. **Commit Limpo:**
   * Verifique com `git status` se não há arquivos de lixo (`88node_modules`, pastas com espaço) rastreados.
   * Faça o commit das alterações na branch e envie um relatório detalhado de sucesso para o chat orquestrador estratégico.

---

## 📢 Instruções Finais ao Executor

* **Não tome decisões de design visual:** Seu foco é puramente estrutural, de infraestrutura e engenharia de software.
* **Preserve o histórico do Git se possível:** Use comandos de movimentação de arquivos padrão do seu ambiente para manter o histórico de commits dos componentes.
* **Reporte falhas imediatamente:** Se encontrar alguma importação hardcoded que impeça o build, corrija-a atualizando o path relativo.

Inicie o trabalho agora. O DSS conta com você para dar este salto de maturidade arquitetural!
