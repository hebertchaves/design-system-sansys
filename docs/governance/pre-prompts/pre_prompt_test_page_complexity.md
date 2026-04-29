# 🤖 PRÉ-PROMPT: DssTestPageComplexity (Fase 3 - Stress Test)

> **Contexto:** Este é um teste de stress empírico da Fase 3. O objetivo é avaliar a capacidade do agente executor de ler um protótipo do Figma via MCP, interpretar as regras do DSS UI Rules e construir uma interface complexa em Vue 3 utilizando estritamente os componentes e tokens do DSS.

## 0️⃣ INSTRUÇÕES ESPECIAIS DE EXECUÇÃO (MCP FIGMA & GRID INSPECTOR)

Antes de escrever qualquer código, o agente executor **DEVE OBRIGATORIAMENTE**:

1. **Conectar-se ao Figma via MCP:**
   - Ler o protótipo na URL: `https://www.figma.com/design/u2XlRujP4RwNqAAgIDaoJA/DSS---Base-de-componentes?node-id=118-2`
   - Focar na layer: `teste-page-complexity`
   - Analisar a estrutura visual, espaçamentos, tipografia e componentes utilizados no protótipo.

2. **Mapear para o DSS:**
   - Traduzir os elementos visuais do Figma para componentes DSS existentes (ex: `DssPageContainer`, `DssCard`, `DssHeader`, `DssButton`, `DssInput`, etc.).
   - Traduzir cores e espaçamentos para tokens DSS (`--dss-spacing-*`, `--dss-surface-*`, `--dss-text-*`).

3. **Validar com o Grid Inspector (MCP e CI Gate):**
   - A composição final **DEVE** estar 100% aderente às regras definidas no `ui-rules.schema.json` e nos módulos do DSS UI Rules (especialmente Módulos 0, 1 e 8).
   - Use a tool `validateGridLayout` do MCP para garantir que a hierarquia de espaçamento (Regra Matryoshka) e os aninhamentos permitidos estão corretos.
   - **Obrigatório:** Após gerar o código, você deve extrair a configuração de grid resultante e validá-ela usando o novo script de CI: `node "Grid Inspector/packages/grid-inspector/scripts/validate-grid-ci.mjs" --stdin`. O componente só é considerado pronto se o script retornar exit code 0.

## 1️⃣ CLASSIFICAÇÃO E CONTEXTO
- **Nome:** `DssTestPageComplexity`
- **Fase:** Fase 3 — Componente Composto Complexo (Stress Test)
- **Golden Context:** `DssDataCard` e `DssPageContainer`
- **Justificativa:** Validar a governança de UI Rules e a capacidade de replicação de protótipos complexos do Figma usando apenas o ecossistema DSS.

## 2️⃣ CONTRATO DE INTERFACE
### 2.1. Casos de Uso Negativos
O que este componente **NÃO** deve fazer:
- ❌ Não deve usar valores CSS hardcoded (ex: `padding: 20px`, `color: #333`). Tudo deve ser mapeado para tokens DSS.
- ❌ Não deve usar tags HTML nativas (`<div>`, `<span>`) para layout estrutural se houver um componente DSS adequado (ex: `DssRow`, classes do Quasar flexbox).
- ❌ Não deve violar a regra de aninhamento de cards (ex: `DssCard[elevated]` dentro de `DssCard[elevated]`).

### 2.2. Matriz de Composição
Quais componentes DSS são permitidos internamente:
- ✅ Todos os componentes da Fase 1 e Fase 2 disponíveis no repositório.
- ✅ Classes utilitárias do Quasar para flexbox (`row`, `col-*`, `justify-*`, `items-*`).
- ✅ Classes utilitárias do Quasar para espaçamento baseadas em tokens DSS (`q-pa-md`, `q-col-gutter-md`).

### 2.3. Estado de Falha e Loading
- **Loading:** O componente deve suportar um estado de `loading` global que exiba skeletons ou spinners apropriados nas áreas de dados.
- **Responsividade:** O layout deve se adaptar fluidamente a telas mobile (`xs`), empilhando colunas conforme as regras do Módulo 1.

## 3️⃣ O GRANDE RISCO ARQUITETURAL
- **Risco:** Desvio entre o protótipo do Figma e as regras estritas do DSS UI Rules. O protótipo pode conter espaçamentos ou aninhamentos que violam a Regra Matryoshka ou o schema JSON.
- **Mitigação:** **As regras do DSS UI Rules têm precedência sobre o protótipo visual.** Se o Figma pedir um padding de 15px, o agente deve arredondar para o token DSS mais próximo (16px = `--dss-spacing-4`). Se o Figma aninhar cards com sombra, o agente deve converter o card interno para `flat` ou `bordered`.

## 4️⃣ MAPEAMENTO DE API (DSS vs QUASAR)
| Prop/Slot/Event | Origem | Ação DSS | Justificativa / Tipo |
|---|---|---|---|
| `loading` | DSS | Criar | Controla o estado de carregamento da página inteira. |
| `brand` | DSS | Criar | Propaga a marca (hub, water, waste) para os componentes internos. |
| `disabled` | DSS | Criar | Desabilita interações na página. |
| `pageTitle` | DSS | Criar | Título principal da página. |
| `pageSubtitle` | DSS | Criar | Subtítulo ou view atual. |
| `breadcrumbs` | DSS | Criar | Array de itens para navegação estrutural. |
| `statusCounts` | DSS | Criar | Objeto com contadores (onTime, expiring, expired). |
| `tableRows` | DSS | Criar | Array de dados para a tabela. |
| `totalItems` | DSS | Criar | Total de itens para paginação. |
| `currentPage` | DSS | Criar | Página atual (v-model). |
| `itemsPerPage` | DSS | Criar | Quantidade de itens por página. |
| `activeFilters` | DSS | Criar | Array de chips de filtros ativos. |

## 5️⃣ GOVERNANÇA DE TOKENS E COMPOSIÇÃO
- **Layout:** Proibido usar `:deep()`. O layout interno deve ser controlado por classes no wrapper do componente pai.
- **Atributos:** `inheritAttrs: false` é **obrigatório**. Repassar `$attrs` para o nó raiz correto via `v-bind="$attrs"`.
- **Comunicação Visual:** Propagar `brand` via `data-brand` no elemento raiz.
- **Comunicação de Estado:** Propagar `disabled`/`readonly` via `provide/inject` tipado, se aplicável.
- **Tokens Específicos:** Use `--dss-border-gray-300` para bordas padrão. Para os cards de status, use obrigatoriamente a família `--dss-feedback-*` (success, warning, error).

## 6️⃣ ACESSIBILIDADE E ESTADOS
- **Contraste:** Garantir que todas as cores extraídas do Figma sejam mapeadas para tokens semânticos que suportem Dark Mode automaticamente.
- **Semântica HTML:** Usar as tags corretas (`<header>`, `<main>`, `<section>`) através das props dos componentes DSS (ex: `tag="section"` no `DssCard`).

## 7️⃣ SUPERFÍCIE DE PLAYGROUND
O playground (`.example.vue`) deve demonstrar a orquestração completa:
1. **Fluxo Principal:** Renderizar a página complexa exatamente como interpretada do Figma, preenchida com dados mockados realistas.
2. **Controles:** Expor toggles para `loading`, `disabled` e seletor de `brand` para validar a propagação de estado.
3. **Dark Mode:** O playground deve permitir alternar para o dark mode para validar a legibilidade de toda a composição.
4. **Responsividade:** O playground deve ser testável em diferentes larguras de viewport para validar o empilhamento de colunas.
