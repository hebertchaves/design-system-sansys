# 🤖 PRÉ-PROMPT: DssCadrisCard (Fase 3 - Stress Test)

> **Contexto:** Este é o Contrato de Interface para o componente `DssCadrisCard`, um componente composto complexo da Fase 3 do DSS. Ele orquestra um layout de pesquisa, tabela de dados e paginação, baseado em um protótipo real de produto. O objetivo é testar a governança da Fase 3 em um cenário de alta densidade de informação, garantindo acessibilidade e suporte a dark mode.

## 1️⃣ CLASSIFICAÇÃO E CONTEXTO
- **Nome:** `DssCadrisCard`
- **Fase:** Fase 3 — Componente Composto Complexo (Stress Test)
- **Golden Context:** `DssDataCard` (referência para composição profunda)
- **Golden Reference:** `DssBadge` para componentes não-interativos e `DssChip` para interativos.
- **Justificativa:** Orquestra múltiplos componentes DSS (Card, Inputs, Selects, Buttons, Table/List, Pagination) para formar uma interface completa de listagem e pesquisa de Cadris, gerenciando estado compartilhado e layout responsivo.

## 2️⃣ CONTRATO DE INTERFACE (NOVO FASE 3)
### 2.1. Casos de Uso Negativos
O que este componente **NÃO** deve fazer:
- ❌ Não deve fazer chamadas de API diretamente. Deve emitir eventos (`@search`, `@paginate`) para que o componente pai gerencie os dados.
- ❌ Não deve forçar larguras fixas em pixels que quebrem a responsividade em telas menores.
- ❌ Não deve usar CSS customizado para cores; deve usar estritamente os tokens DSS para garantir o dark mode.
- ❌ Não deve assumir o controle de rotas ou navegação do aplicativo.
- ❌ Não deve modificar os dados recebidos via props, mantendo o princípio de one-way data flow.

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
- **Erro de Rede:** Se houver um erro na busca, exibir um banner ou alerta informando o usuário sobre a falha, com opção de tentar novamente.

## 3️⃣ O GRANDE RISCO ARQUITETURAL
- **Risco:** Quebra de contraste e legibilidade no Dark Mode, especialmente nas linhas alternadas da tabela e no cabeçalho azul do protótipo.
- **Mitigação:** O cabeçalho da tabela não deve usar uma cor primária fixa (azul) que quebre no dark mode. Deve usar `var(--dss-surface-muted)` ou `var(--dss-surface-subtle)` para o fundo do cabeçalho, e `var(--dss-text-hub)` para o texto. As linhas alternadas devem usar `var(--dss-surface-hover)` ou `var(--dss-surface-subtle)` para garantir contraste adequado em ambos os temas.
- **Risco de Performance:** Renderização de muitas linhas na tabela causando lentidão.
- **Mitigação:** Implementar paginação eficiente e, se necessário, virtualização de lista para grandes conjuntos de dados.

## 4️⃣ MAPEAMENTO DE API (DSS vs QUASAR)
| Prop/Slot/Event | Origem | Ação DSS | Justificativa / Tipo |
|---|---|---|---|
| `rows` | DSS | Criar | Array de objetos com os dados dos Cadris a serem exibidos. |
| `loading` | DSS | Criar | Controla o estado de carregamento da tabela e do botão de pesquisa. |
| `pagination` | DSS | Criar | Objeto de paginação (página atual, total, linhas por página). |
| `brand` | DSS | Criar | Define a marca visual do componente (hub, water, waste). |
| `@search` | DSS | Criar | Evento emitido ao clicar em "Pesquisar", passando os filtros. |
| `@close` | DSS | Criar | Evento emitido ao clicar em "FECHAR". |
| `@update:pagination` | DSS | Criar | Evento emitido ao mudar a página ou linhas por página. |
| `header` (slot) | DSS | Criar | Slot para customizar o cabeçalho do card. |
| `footer` (slot) | DSS | Criar | Slot para customizar o rodapé do card. |

## 5️⃣ GOVERNANÇA DE TOKENS E COMPOSIÇÃO
- **Layout:** Proibido usar `:deep()`. O layout interno deve ser controlado por classes no wrapper do componente pai ou classes utilitárias do Quasar (`row`, `col`, `q-pa-md`).
- **Atributos:** `inheritAttrs: false` é **obrigatório**. Repassar `$attrs` para o `DssCard` raiz via `v-bind="$attrs"`.
- **Comunicação Visual:** Propagar `brand` via `data-brand` no elemento raiz, se aplicável.
- **Espaçamento:** Utilizar `--dss-spacing-4` para paddings internos do card e entre elementos de formulário.
- **Cores e Dark Mode:**
  - Fundo do Card: `var(--dss-surface-default)`
  - Fundo do Cabeçalho "Cadris": `var(--dss-surface-muted)` ou `var(--dss-gray-800)` (avaliar contraste).
  - Botão Pesquisar: Cor de feedback (ex: Warning/Orange) usando tokens semânticos (`--dss-warning-500`).
  - Status "Ativo": Ícone verde usando `--dss-positive-500`.
  - Texto Secundário: Utilizar `--dss-text-subtle` para descrições e textos de apoio.
  - Ação Principal: Utilizar `--dss-action-hub` para botões primários e `--dss-action-hub-surface` para seus fundos.
  - Foco: Utilizar `outline: 2px solid white` para anéis de foco em dark mode, garantindo acessibilidade.

## 6️⃣ ACESSIBILIDADE E ESTADOS
- **ARIA Roles:** A tabela deve ter `role="table"` ou `role="grid"`. Os cabeçalhos devem ter `role="columnheader"`.
- **Gerenciamento de Foco:** O foco deve fluir logicamente dos filtros para o botão de pesquisa, depois para a tabela e paginação.
- **Contraste:** Garantir que o texto sobre o botão laranja ("Pesquisar") tenha contraste suficiente (WCAG AA). Se o laranja for muito claro, usar texto escuro (`--dss-gray-900`).
- **Leitores de Tela:** Fornecer `aria-label` ou `aria-labelledby` para todos os inputs e botões que não possuem texto visível descritivo.
- **Feedback de Estado:** Anunciar mudanças de estado (loading, sucesso, erro) usando `aria-live="polite"`.

## 7️⃣ COMPORTAMENTO RESPONSIVO
- **Mobile (< 600px):** Os campos de filtro devem empilhar verticalmente (1 coluna). A tabela deve mudar para um layout de lista de cartões (se suportado pelo `DssTable`) ou permitir rolagem horizontal.
- **Tablet (600px - 1024px):** Os campos de filtro podem ocupar 2 colunas. A tabela deve se ajustar à largura disponível.
- **Desktop (> 1024px):** Os campos de filtro podem ocupar 3 ou 4 colunas, dependendo da quantidade. A tabela exibe todas as colunas confortavelmente.

## 8️⃣ SUPERFÍCIE DE PLAYGROUND
O playground (`.example.vue`) deve demonstrar a orquestração completa:
1. **Fluxo Principal:** Exibir o card preenchido com dados mockados (pelo menos 5 linhas).
2. **Interatividade:** Demonstrar a mudança de estado ao clicar em "Pesquisar" (ativar loading por 2 segundos).
3. **Dark Mode:** O playground deve permitir alternar para o dark mode para validar a legibilidade da tabela e dos botões.
4. **Estado Vazio:** Um botão no playground para alternar os dados para um array vazio, demonstrando o estado de "Nenhum resultado encontrado".

### 8.1. Controles Obrigatórios
- **Controle de Dados Mockados:** Um seletor para alternar entre dados mockados (com resultados), dados vazios (sem resultados) e dados com erro (simulando falha de API).
- **Controle de Loading:** Um toggle para simular o estado de carregamento da tabela e do botão de pesquisa.
- **Controle de Dark Mode:** Um toggle para alternar entre os temas claro e escuro, validando a aplicação correta dos tokens de cor.
- **Controle de Responsividade:** Botões para simular diferentes breakpoints (mobile, tablet, desktop) para verificar o layout responsivo.
- **Controle de Brand:** Um seletor para alternar entre as marcas `hub`, `water` e `waste`, verificando a aplicação correta das cores.

### 8.2. Composite Logic (Concreta)
- **Orquestração de Pesquisa:** O playground deve demonstrar como o `DssCadrisCard` coleta os valores dos `DssInput` e `DssSelect` internos, e emite um evento `@search` com um objeto de filtro consolidado. Este evento deve ser capturado pelo componente pai do playground para simular a chamada de API e atualizar os dados da tabela.
- **Gerenciamento de Paginação:** Ao clicar nos controles de paginação (`DssPagination`), o playground deve mostrar o `DssCadrisCard` emitindo um evento `@update:pagination` com os novos parâmetros de página e limite, e o componente pai respondendo com os dados mockados correspondentes à nova página.
- **Estado de Erro:** Simular uma falha na chamada de API (após o evento `@search`) que resulte na exibição de uma mensagem de erro clara na área da tabela, substituindo os resultados ou o estado vazio.
- **Integração de Filtros:** Demonstrar como os filtros selecionados afetam os dados exibidos, com lógica real de filtragem no mock do playground.

### 8.3. Estados a Expor
| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `default` | Exibição padrão com dados mockados e paginação. | Visual | `<DssCadrisCard :rows="mockedData" :pagination="defaultPagination" />` |
| `loading` | Componente em estado de carregamento, com skeleton na tabela e botão de pesquisa desabilitado/carregando. | Funcional | `<DssCadrisCard loading />` |
| `empty` | Nenhum resultado encontrado, com mensagem informativa. | Visual | `<DssCadrisCard :rows="[]" />` |
| `error` | Exibição de mensagem de erro devido a falha na busca de dados. | Funcional | `<DssCadrisCard error-message="Falha ao carregar dados." />` |
| `dark-mode` | Componente renderizado no tema escuro, validando contraste. | Visual | (Ativado via toggle global do playground) |
| `responsive-mobile` | Layout adaptado para telas pequenas. | Visual | (Ativado via botões de breakpoint do playground) |
| `brand-hub` | Componente utilizando a marca hub. | Visual | `<DssCadrisCard brand="hub" />` |
| `brand-water` | Componente utilizando a marca water. | Visual | `<DssCadrisCard brand="water" />` |
| `brand-waste` | Componente utilizando a marca waste. | Visual | `<DssCadrisCard brand="waste" />` |

## 9️⃣ DIRETRIZES DE TESTES
- **Testes Unitários:** Verificar se os eventos `@search` e `@update:pagination` são emitidos corretamente com os payloads esperados.
- **Testes de Integração:** Garantir que a interação entre os filtros e a tabela funciona conforme o esperado.
- **Testes de Acessibilidade:** Validar o contraste de cores, navegação por teclado e leitura por leitores de tela.
- **Testes Visuais:** Capturar screenshots em diferentes estados (default, loading, empty, error) e temas (light, dark) para garantir a consistência visual.

---

## 1️⃣1️⃣ REQUISITOS DE TESTES UNITÁRIOS (Gate de Qualidade) 🔒 BLOQUEANTE

> ⚠️ **`DssCadrisCard` não pode ser selado ou homologado sem o arquivo `DssCadrisCard.test.js`.**

### 11.1. Renderização Básica
- [ ] Monta sem erros com props mínimas (`rows`, `columns`, `pagination`).
- [ ] Monta sem erros sem nenhuma prop (usando defaults).
- [ ] Snapshot do estado `default` com dados mockados.

### 11.2. Propagação de Props Críticas
- [ ] `brand="hub"` aplica `data-brand="hub"` no elemento raiz.
- [ ] `brand="water"` aplica `data-brand="water"` no elemento raiz.
- [ ] `brand="waste"` aplica `data-brand="waste"` no elemento raiz.
- [ ] `loading` desabilita o botão de pesquisa e exibe skeleton na tabela.
- [ ] `disabled` propaga para todos os `DssInput`, `DssSelect` e `DssButton` internos.

### 11.3. Lógica Composta (Composite Logic)
- [ ] Ao alterar os filtros e clicar em "Pesquisar", o evento `@search` é emitido com o objeto de filtros consolidado correto.
- [ ] Ao interagir com `DssPagination`, o evento `@update:pagination` é emitido com os parâmetros `page` e `limit` corretos.
- [ ] Simular falha de API: confirmar que `error-message` é exibida na área da tabela substituindo os dados.
- [ ] `rows=[]` exibe o estado de "Nenhum resultado encontrado" no slot `empty`.

### 11.4. Acessibilidade (ARIA)
- [ ] O container principal possui `role="region"` ou equivalente conforme especificado.
- [ ] O botão de pesquisa possui `aria-label` descritivo.
- [ ] Com `disabled`, todos os controles internos recebem `aria-disabled="true"`.
- [ ] A tabela possui `aria-label` ou `aria-labelledby` vinculado ao título do card.
