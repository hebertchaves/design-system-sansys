# 📐 Grid Inspector

> **O que é:** Uma ferramenta universal de inspeção, edição e validação de layout em tempo real, construída para garantir a conformidade de interfaces com o Design System Sansys (DSS).

> **Por que existe:** Para eliminar o "achismo" no espaçamento de interfaces. O Grid Inspector permite que designers, desenvolvedores e agentes de IA visualizem, editem e validem a hierarquia de espaçamento de qualquer página contra os tokens oficiais do DSS, sem precisar modificar o código-fonte.

---

## 🧭 As 5 Frentes de Operação

O Grid Inspector não é apenas uma grade visual. Ele opera simultaneamente em 5 frentes:

| Frente | O que faz | Como funciona |
|---|---|---|
| **1. Depurador Visual** | Desenha a grade sobre a página | Injeta um overlay (`z-index: 1000000`) com colunas, gutters, margins e paddings visíveis. |
| **2. Editor de Layout** | Altera o espaçamento real | Escreve CSS Custom Properties (`--dss-layout-*`) no `:root` ou no `element.style` inline. |
| **3. Validador de Tokens** | Garante conformidade DSS | Valida em tempo real se os valores usados pertencem à escala oficial de tokens do DSS. |
| **4. Alternador de Brand** | Testa temas e marcas | Injeta `data-brand="hub|water|waste"` no `<html>` para testar a interface sob diferentes marcas. |
| **5. Reporter de CI** | Bloqueia PRs fora do padrão | Exporta a configuração do grid para ser validada pelo script de CI Gate (`validate-grid-ci.mjs`). |

---

## 🏗️ Arquitetura: Os 2 Sistemas de Grid

A ferramenta mantém dois conjuntos de valores independentes que **devem** estar sincronizados:

1. **Overlay Grid (Visual):** A grade didática desenhada sobre a tela. Não afeta os componentes.
2. **Layout Grid (Funcional):** O espaçamento real injetado via CSS vars que os componentes DSS consomem.

Se o Overlay e o Layout divergirem, o sistema acusa uma violação de severidade `error`.

---

## 🤖 Integração com Agentes de IA (MCP)

O Grid Inspector foi desenhado para ser operado tanto por humanos quanto por agentes autônomos (como o Claude Code CLI) através do **Model Context Protocol (MCP)**.

### O Fluxo de Validação Obrigatório (CI Gate)

Ao construir ou refatorar uma página complexa, o agente executor **deve** validar o layout final usando o script de CI Gate embutido no pacote:

```bash
# Validação via stdin (passando o JSON exportado)
cat grid-report.json | node "Grid Inspector/packages/grid-inspector/scripts/validate-grid-ci.mjs" --stdin

# O script retorna exit code 0 (sucesso) ou 1 (falha)
```

### Tools MCP Disponíveis

- `describe_grid_inspector`: Retorna o manual de operação e as capacidades da ferramenta.
- `validate_grid_layout`: Valida uma configuração de grid contra as regras do DSS sem precisar rodar o script de CI localmente.

---

## 📚 Documentação Técnica

Para detalhes de implementação, instalação e uso da API, consulte os READMEs específicos de cada pacote:

- 📦 **[NPM Package & Bookmarklet](./packages/grid-inspector/README.md)** — Como instalar no Vue/React ou usar via navegador.
- 📡 **[Observability & Signals](./src/observability/README.md)** — Como o sistema emite sinais e valida regras.
- ⚛️ **[Componentes React](./src/app/components/dss/README.md)** — A biblioteca de componentes internos do painel.

---

## 🔑 Conceitos Chave para Retenção

- **Selection Mode:** Permite editar a grade de um elemento específico (via `element.id`) em vez da grade global.
- **Density Mode:** Multiplicador global (Comfortable 1x, Compact 0.75x, Dense 0.5x) aplicado aos tokens.
- **Breakpoints Canônicos:** Mobile (375px), Tablet (768px), Desktop (1440px), Ultra (1920px).
- **Persistência:** O estado sobrevive a reloads da página via `localStorage`.
