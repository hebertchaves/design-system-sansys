# DSS UI Rules — Regras de Construção de Interfaces

> **📅 Criado:** Abril 2026
> **🎯 Objetivo:** Definir padrões, indicações e proibições para a construção de interfaces usando componentes e tokens DSS.
> **🤖 Integração:** Este documento serve como base de conhecimento para o MCP e como apoio ao Grid Inspector do Figma.

## 1. Introdução e Filosofia

O **DSS UI Rules** é o documento normativo que rege *como* os componentes do Design System Sansys devem ser combinados para formar interfaces coesas, acessíveis e alinhadas à marca. Enquanto o `DSS_COMPONENT_ARCHITECTURE.md` define como *construir* um componente, este documento define como *usá-los em conjunto*.

### 1.1. Princípios de Interface DSS

1. **Espaçamento Semântico:** Nunca use valores arbitrários de margem ou padding. O ritmo vertical e horizontal da página deve ser ditado exclusivamente pelos tokens `--dss-spacing-*`.
2. **Hierarquia Visual:** A elevação (shadows) e a tipografia devem guiar o olhar do usuário. Superfícies sobrepostas devem usar `--dss-surface-muted` ou `--dss-surface-default` com a elevação correta.
3. **Acessibilidade Integrada:** As regras de UI garantem que o contraste, o tamanho dos touch targets e a ordem de foco sejam mantidos quando os componentes são combinados.
4. **Consistência entre Marcas:** As regras estruturais são universais. Apenas os tokens de cor e tipografia mudam entre Hub, Water e Waste.

## 2. Estrutura do Sistema de Regras

As regras de UI estão divididas em módulos temáticos para facilitar a consulta pelo MCP e pelo Grid Inspector:

- **[Módulo 1: Page Layout & Estrutura Base](./ui-rules/01_PAGE_LAYOUT.md)** — Regras para containers, grids, espaçamento de seções e ritmo vertical.
- **[Módulo 2: Headers, Footers & Toolbars](./ui-rules/02_HEADERS_FOOTERS.md)** — Padrões de navegação, ações de página e hierarquia de títulos.
- **[Módulo 3: Card Patterns & Superfícies](./ui-rules/03_CARD_PATTERNS.md)** — Como estruturar informações dentro de cards, modais e painéis.
- **[Módulo 4: Formulários & Inputs] (Em breve)** — Alinhamento, validação e agrupamento de campos.
- **[Módulo 5: Tabelas & Listas] (Em breve)** — Densidade de dados, paginação e ações em lote.

## 3. Integração com Ferramentas

### 3.1. Grid Inspector (Figma)
O Grid Inspector utiliza as regras definidas no **Módulo 1** para validar se os designs no Figma respeitam os tokens de espaçamento (`--dss-spacing-*`) e as larguras máximas de container. Qualquer desvio das regras documentadas aqui será sinalizado como erro no Inspector.

### 3.2. Model Context Protocol (MCP)
Agentes de IA (como o Claude Code) que constroem telas ou componentes da Fase 3 **DEVEM** consultar os módulos de regras correspondentes antes de gerar o código. O MCP usará estas regras para validar se a composição proposta viola algum padrão do DSS.

## 4. Glossário de Termos de UI

- **Ritmo Vertical:** O espaçamento consistente entre blocos de conteúdo de cima para baixo na página.
- **Superfície:** Qualquer elemento que atue como container para outros elementos (ex: Cards, Dialogs, Drawers).
- **Touch Target:** A área clicável de um elemento interativo, que deve ser no mínimo 48x48px (WCAG 2.5.5) ou 44x44px (WCAG 2.1 AA).
- **Gutter:** O espaço entre colunas em um layout de grid.
- **Gap:** O espaço entre elementos em um layout flexbox.

---
*Nota: Este documento é vivo e será expandido conforme novos padrões de interface forem consolidados pelas equipes de produto.*
