# 🗺️ DSS Monorepo Path Map & Mapeamento Canônico de Caminhos
**Design System Sansys (DSS) — Versão Normativa v2.3.0**  
**Autor:** Chat Orquestrador Estratégico (Manus AI)  
**Status:** Normativo Vinculante  
**Data:** Junho de 2026

---

## 1. Visão Geral e Propósito

Com a transição completa do Design System Sansys (DSS) para a arquitetura de **Monorepo**, a estrutura física e lógica do repositório foi reorganizada para isolar responsabilidades, eliminar warnings de build e permitir escala independente das ferramentas. No entanto, para que o sistema seja autossuficiente e livre de ambiguidades para desenvolvedores humanos e agentes de IA, este documento estabelece o **Mapeamento Canônico de Caminhos** e as regras de importação oficiais.

> ⚠️ **Regra de Ouro:** Fica estritamente proibido o uso de caminhos relativos arbitrários (como `../../../../`) que cruzem as fronteiras de pacotes ou aplicações. Toda importação inter-pacote deve utilizar os workspaces do npm ou os aliases oficiais definidos neste documento.

---

## 2. O Novo Arranjo do Repositório (Monorepo)

O repositório está estruturado em workspaces gerenciados na raiz pelo `package.json`. O ecossistema é dividido entre `packages/` (bibliotecas reutilizáveis e tooling) e `apps/` (aplicações e ambientes de desenvolvimento):

```
DSS/ (Raiz)
├── packages/
│   ├── core/                  ← @sansys/design-system (Biblioteca principal Vue 3 + Quasar)
│   │   ├── components/base/   ← Fonte de verdade dos componentes (ex: DssButton)
│   │   ├── tokens/            ← Tokens semânticos SCSS
│   │   └── utils/             ← Mixins e funções utilitárias SCSS
│   ├── grid-inspector/        ← @sansys/grid-inspector (Ferramenta de observabilidade React)
│   └── mcp/                   ← @sansys/dss-mcp (Servidor de contexto para agentes de IA)
├── apps/
│   ├── docs-portal/           ← @sansys/docs-portal (Portal de documentação React/Lovable)
│   ├── sandbox/               ← @sansys/sandbox (Ambiente de testes Vue 3 - antiga dss-example/)
│   └── components/            ← Espelho local de componentes Vue 3 usado para desenvolvimento
└── package.json               ← Arquivo raiz que define os workspaces do npm
```

---

## 3. Mapeamento de Caminhos de Importação (JS/TS)

Para garantir consistência e evitar quebras de build em produção, as importações de arquivos JavaScript/TypeScript devem seguir rigorosamente a tabela abaixo:

| Contexto de Origem | O que está importando | Caminho/Método Correto | Exemplo de Código |
| :--- | :--- | :--- | :--- |
| **Qualquer aplicação/pacote** | Componentes do Core | Workspace `@sansys/design-system` | `import { DssButton } from '@sansys/design-system'` |
| **Qualquer aplicação/pacote** | CSS compilado do Core | Export de estilo do workspace | `import '@sansys/design-system/css'` |
| **Interno do `packages/core`** | Outro componente | Caminho relativo local | `import DssIcon from '../DssIcon/DssIcon.vue'` |
| **Interno do `packages/core`** | Composables locais | Pasta interna de composables | `import { useTheme } from '../../composables/useTheme'` |
| **`apps/sandbox` (Desenvolvimento)** | Componentes locais | Aliases oficiais do Vite | `import { DssButton } from '@components/base/DssButton'` |
| **`apps/sandbox` (Desenvolvimento)** | Componentes base | Alias `@dss` (Vite) | `import DssButton from '@dss/DssButton/DssButton.vue'` |

### 🔍 A Regra do Espelho `apps/components`

A pasta `apps/components` é um **espelho local estável** utilizado para o desenvolvimento interativo no sandbox e no portal.
* **Desenvolvimento:** O sandbox (`apps/sandbox`) consome os componentes deste diretório durante a execução do comando `npm run sandbox:dev` para garantir feedback rápido e sem quebras de build locais.
* **Produção / Distribuição:** A pasta `packages/core/components/base/` continua sendo a **única fonte de verdade oficial**. Nenhum componente deve ser criado ou modificado diretamente em `apps/components` sem que a alteração seja realizada primeiro no `packages/core` e espelhada.

---

## 4. Mapeamento de Caminhos Sass/SCSS (Onda 3)

Com a extinção completa do `@import` legado na Onda 3, todas as importações de estilos no DSS devem usar o sistema de módulos modernos do Sass (`@use` e `@forward`).

### 4.1. Importação de Tokens e Utilitários nos Componentes

Todo componente localizado em `packages/core/components/base/` que precise consumir tokens, mixins ou funções deve realizar a importação usando o caminho relativo correto apontando para o aggregador do Core:

```scss
// Caminho correto de importação dentro de um componente base (ex: DssButton)
@use '../../../../utils/index' as utils;

.dss-button {
  padding: var(--dss-spacing-md);
  @include utils.dss-transition; // Uso correto com namespace
}
```

### 4.2. Estrutura de Agregação do Foundation (Sass Module System)

* **`packages/core/tokens/index.scss`:** Agrega todos os tokens semânticos e de marca. Usa `@use` puro para gerar o CSS correspondente sem expor membros Sass:
  ```scss
  @use 'globals';
  @use 'semantic/index';
  @use 'brand/index';
  @use 'themes/light/colors';
  ```
* **`packages/core/utils/index.scss`:** Atua como o orquestrador e distribuidor de mixins e funções. Usa `@forward` para re-exportar os membros de forma que fiquem disponíveis para os componentes sob o mesmo namespace:
  ```scss
  @forward 'functions';
  @forward 'mixins';
  @forward 'accessibility-mixins';
  ```

---

## 5. Mapeamento de Ferramentas e Observabilidade

### 5.1. Configuração do Servidor MCP (`packages/mcp`)

O servidor MCP do DSS (`@sansys/dss-mcp`) roda localmente e precisa ler a base de conhecimento e os componentes do monorepo. Seus caminhos de leitura interna são relativos à raiz do monorepo e estão configurados no arquivo `.mcp.json` na raiz:

* **Caminho dos Componentes:** `packages/core/components/base/`
* **Caminho das Regras de UI:** `docs/guides/ui-rules/`
* **Caminho do Schema:** `docs/guides/ui-rules/ui-rules.schema.json`

### 5.2. Grid Inspector (`packages/grid-inspector`)

O Grid Inspector é um pacote autocontido React que é consumido pelo sandbox Vue para testes de layout.
* **Importação no Sandbox:** É importado como uma dependência local de desenvolvimento no `apps/sandbox/package.json`:
  ```json
  "devDependencies": {
    "@sansys/grid-inspector": "file:../../packages/grid-inspector"
  }
  ```
* **Uso no código (`apps/sandbox/src/main.js`):**
  ```javascript
  import { initGridInspector } from '@sansys/grid-inspector';
  // Inicialização segura no ambiente de desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    initGridInspector();
  }
  ```

---

## 6. Checklist de Conformidade de Caminhos para Próximos Componentes

Sempre que um novo componente for criado na Fase 3 ou revisado, o agente de IA ou desenvolvedor deve validar os caminhos contra este checklist:

- [ ] O componente está localizado fisicamente em `packages/core/components/base/{NomeComponente}/`?
- [ ] O arquivo `test.js` correspondente está na pasta do componente?
- [ ] Todas as importações de estilos dentro do componente usam `@use '../../../../utils/index' as utils;`?
- [ ] Nenhum arquivo `.scss` ou bloco `<style>` do componente usa `@import`?
- [ ] O wrapper `DssNomeComponente.vue` na raiz do componente faz o re-export correto de `1-structure/`?
- [ ] O arquivo `index.js` do componente exporta o wrapper, types e composables?
- [ ] O componente foi espelhado corretamente na pasta `apps/components/` para uso do sandbox e portal?

---

## 7. Conclusão

Este mapeamento canônico elimina qualquer ambiguidade arquitetural no DSS. Ao pautar as importações e caminhos de forma explícita e normatizada, garantimos que o ecossistema continue escalável, livre de warnings de build e totalmente compreensível para humanos e ferramentas de automação.
