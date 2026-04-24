# 🤖 PRÉ-PROMPT: DssCadrisCard (Fase 3 - Stress Test)

> **Contexto:** Este é o Contrato de Interface para o componente `DssCadrisCard`, um componente composto complexo da Fase 3 do DSS. Ele orquestra um layout de pesquisa, tabela de dados e paginação, baseado em um protótipo real de produto. O objetivo é testar a governança da Fase 3 em um cenário de alta densidade de informação, garantindo acessibilidade e suporte a dark mode.

## 1️⃣ CLASSIFICAÇÃO E CONTEXTO
- **Nome:** `DssCadrisCard`
- **Fase:** Fase 3 — Componente Composto Complexo (Stress Test)
- **Golden Context:** `DssDataCard` (referência para composição profunda)
- **Justificativa:** Orquestra múltiplos componentes DSS (Card, Inputs, Selects, Buttons, Table/List, Pagination) para formar uma interface completa de listagem e pesquisa de Cadris, gerenciando estado compartilhado e layout responsivo.

## 2️⃣ CONTRATO DE INTERFACE (NOVO FASE 3)
### 2.1. Casos de Uso Negativos
O que este componente **NÃO** deve fazer:
- ❌ Não deve fazer chamadas de API diretamente. Deve emitir eventos (`@search`, `@paginate`) para que o componente pai gerencie os dados.
- ❌ Não deve forçar larguras fixas em pixels que quebrem a responsividade em telas menores.
- ❌ Não deve usar CSS customizado para cores; deve usar estritamente os tokens DSS para garantir o dark mode.

### 2.2. Matriz de Composição
Quais componentes DSS são permitidos internamente:
- ✅ `DssCard` (container principal)
- ✅ `DssToolbar` / `DssToolbarTitle` (cabeçalho "Cadris")
- ✅ `DssInput` (campos de pesquisa "Cadri" e "Gerador")
- ✅ `DssSelect` (ou equivalente nativo Quasar encapsulado, para "Documento" e "Aterro")
- ✅ `DssButton` (botões "Pesquisar" e "FECHAR")
- ✅ `DssTable` (ou composição de `DssList`/`DssItem` se a tabela DSS ainda não existir, para a listagem de dados)
- ✅ `DssPagination` (ou composição de botões para paginação)
- ✅ `DssIcon` (ícones de status e paginação)
- ❌ Proibido usar tags HTML nativas (`<div>`, `<span>`) para layout interno; usar classes utilitárias do Quasar (`row`, `col`, `q-gutter`) ou componentes de grid DSS.

### 2.3. Estado de Falha e Loading
- **Loading:** Durante a pesquisa, a tabela deve exibir um estado de skeleton ou overlay de loading (`DssInnerLoading` ou equivalente). O botão "Pesquisar" deve assumir estado de loading.
- **Falha/Empty:** Se a pesquisa não retornar resultados, exibir um estado vazio centralizado na área da tabela com uma mensagem clara.

## 3️⃣ O GRANDE RISCO ARQUITETURAL
- **Risco:** Quebra de contraste e legibilidade no Dark Mode, especialmente nas linhas alternadas da tabela e no cabeçalho azul do protótipo.
- **Mitigação:** O cabeçalho da tabela não deve usar uma cor primária fixa (azul) que quebre no dark mode. Deve usar `var(--dss-surface-muted)` ou `var(--dss-surface-subtle)` para o fundo do cabeçalho, e `var(--dss-text-primary)` para o texto. As linhas alternadas devem usar `var(--dss-surface-hover)` ou `var(--dss-surface-subtle)` para garantir contraste adequado em ambos os temas.

## 4️⃣ MAPEAMENTO DE API (DSS vs QUASAR)
| Prop/Slot/Event | Origem | Ação DSS | Justificativa / Tipo |
|---|---|---|---|
| `rows` | DSS | Criar | Array de objetos com os dados dos Cadris a serem exibidos. |
| `loading` | DSS | Criar | Controla o estado de carregamento da tabela e do botão de pesquisa. |
| `pagination` | DSS | Criar | Objeto de paginação (página atual, total, linhas por página). |
| `@search` | DSS | Criar | Evento emitido ao clicar em "Pesquisar", passando os filtros. |
| `@close` | DSS | Criar | Evento emitido ao clicar em "FECHAR". |
| `@update:pagination` | DSS | Criar | Evento emitido ao mudar a página ou linhas por página. |

## 5️⃣ GOVERNANÇA DE TOKENS E COMPOSIÇÃO
- **Layout:** Proibido usar `:deep()`. O layout interno deve ser controlado por classes no wrapper do componente pai ou classes utilitárias do Quasar (`row`, `col`, `q-pa-md`).
- **Atributos:** `inheritAttrs: false` é **obrigatório**. Repassar `$attrs` para o `DssCard` raiz via `v-bind="$attrs"`.
- **Comunicação Visual:** Propagar `brand` via `data-brand` no elemento raiz, se aplicável.
- **Cores e Dark Mode:**
  - Fundo do Card: `var(--dss-surface-default)`
  - Fundo do Cabeçalho "Cadris": `var(--dss-surface-muted)` ou `var(--dss-gray-800)` (avaliar contraste).
  - Botão Pesquisar: Cor de feedback (ex: Warning/Orange) usando tokens semânticos (`--dss-warning-500`).
  - Status "Ativo": Ícone verde usando `--dss-positive-500`.

## 6️⃣ ACESSIBILIDADE E ESTADOS
- **ARIA Roles:** A tabela deve ter `role="table"` ou `role="grid"`. Os cabeçalhos devem ter `role="columnheader"`.
- **Gerenciamento de Foco:** O foco deve fluir logicamente dos filtros para o botão de pesquisa, depois para a tabela e paginação.
- **Contraste:** Garantir que o texto sobre o botão laranja ("Pesquisar") tenha contraste suficiente (WCAG AA). Se o laranja for muito claro, usar texto escuro (`--dss-gray-900`).

## 7️⃣ SUPERFÍCIE DE PLAYGROUND
O playground (`.example.vue`) deve demonstrar a orquestração completa:
1. **Fluxo Principal:** Exibir o card preenchido com dados mockados (pelo menos 5 linhas).
2. **Interatividade:** Demonstrar a mudança de estado ao clicar em "Pesquisar" (ativar loading por 2 segundos).
3. **Dark Mode:** O playground deve permitir alternar para o dark mode para validar a legibilidade da tabela e dos botões.
4. **Estado Vazio:** Um botão no playground para alternar os dados para um array vazio, demonstrando o estado de "Nenhum resultado encontrado".
