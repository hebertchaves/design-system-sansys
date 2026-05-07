# Pré-prompt: DssTable

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
Para componentes interativos, a referência dourada é o **DssChip**.

### Golden Context
O `DssTable` é um componente fundamental para a exibição de dados tabulares de forma estruturada e interativa dentro do Design System. Ele oferece funcionalidades essenciais como ordenação, paginação, filtragem e seleção de linhas, garantindo uma experiência de usuário consistente e acessível para a manipulação de grandes volumes de informação. Seu design deve ser flexível para acomodar diferentes tipos de dados e complexidades, mantendo a integridade visual e funcional do DSS.

### Justificativa
A necessidade de um componente `DssTable` padronizado surge da ubiquidade da apresentação de dados em formato de tabela em diversas aplicações. A criação de um componente centralizado garante:
*   **Consistência**: Uniformidade na aparência e comportamento das tabelas em todo o ecossistema de produtos.
*   **Acessibilidade**: Implementação de práticas de acessibilidade desde a concepção, reduzindo o esforço de conformidade em cada uso.
*   **Produtividade**: Acelera o desenvolvimento ao fornecer uma solução pronta e testada, eliminando a necessidade de reimplementação.
*   **Manutenibilidade**: Facilita a manutenção e evolução, pois as atualizações são aplicadas em um único local.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
*   **Performance**: Exibição de grandes conjuntos de dados pode impactar o desempenho, exigindo virtualização de linhas ou carregamento sob demanda.
*   **Customização**: Equilibrar a flexibilidade para customização de células e cabeçalhos com a manutenção da padronização e complexidade do código.
*   **Acessibilidade Complexa**: Garantir que todas as funcionalidades interativas (ordenação, paginação, seleção) sejam totalmente acessíveis e compatíveis com tecnologias assistivas.
*   **Integração de Dados**: Lidar com diferentes fontes e formatos de dados, exigindo uma API robusta e flexível.

### Gates
*   **Gate 1 (Design Review)**: Aprovação do design visual e interativo, incluindo estados e variações.
*   **Gate 2 (API Definition)**: Definição e validação da API do componente (props, slots, eventos) com base nas necessidades dos consumidores e no mapeamento Quasar.
*   **Gate 3 (Acessibilidade Audit)**: Auditoria completa de acessibilidade (WCAG 2.1 AA) para todas as funcionalidades e estados.
*   **Gate 4 (Performance Testing)**: Testes de desempenho com grandes volumes de dados para identificar e otimizar gargalos.
*   **Gate 5 (Documentação e Exemplos)**: Conclusão da documentação técnica e criação de exemplos de uso abrangentes no Playground.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssTable` deve abstrair a complexidade do `QTable` do Quasar, expondo uma API simplificada e alinhada com os princípios do DSS. Abaixo, um mapeamento conceitual:

| Funcionalidade Quasar (QTable) | Propriedade/Slot/Evento DSS (DssTable) | Descrição DSS |
| :----------------------------- | :------------------------------------- | :------------ |
| `rows`, `columns`              | `data`, `columns`                      | Dados e definição das colunas da tabela. |
| `row-key`                      | `rowKey`                               | Chave única para cada linha. |
| `pagination`                   | `pagination`                           | Objeto de configuração de paginação. |
| `filter`                       | `filter`                               | String de filtro global. |
| `selection`                    | `selection`                            | Tipo de seleção de linha (`single`, `multiple`, `none`). |
| `selected`                     | `selectedRows`                         | Array de linhas selecionadas (v-model). |
| `loading`                      | `loading`                              | Estado de carregamento da tabela. |
| `title`                        | `title`                                | Título da tabela. |
| `dense`                        | `density`                              | Densidade da tabela (`compact`, `standard`). |
| `flat`, `bordered`, `square`   | `variant`                              | Variações visuais da tabela (`flat`, `bordered`, `elevated`). |
| `wrap-cells`                   | `wrapCells`                            | Quebra de texto nas células. |
| `no-data-label`                | `noDataLabel`                          | Texto exibido quando não há dados. |
| `@request`                     | `@update:pagination`, `@update:filter`, `@update:sort` | Eventos para atualização de paginação, filtro e ordenação. |
| `header` (slot)                | `header` (slot)                        | Slot para customização do cabeçalho. |
| `body` (slot)                  | `row` (slot)                           | Slot para customização de linhas/células. |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssTable` deve utilizar exclusivamente os tokens numéricos/padrão do DSS para garantir a consistência visual e a manutenibilidade. É estritamente proibido inventar tokens com sufixos semânticos que não existem no DSS.

### Exemplos de Uso de Tokens
*   **Espaçamento**: `--dss-spacing-4` (para padding interno de células), `--dss-spacing-8` (para espaçamento entre elementos do cabeçalho).
*   **Raio de Borda**: `--dss-radius-md` (para bordas de contêiner da tabela ou elementos internos).
*   **Cores de Superfície**: `--dss-surface-default` (para o fundo da tabela), `--dss-surface-hover` (para linhas em hover), `--dss-surface-selected` (para linhas selecionadas).
*   **Duração de Transição**: `--dss-duration-250` (para transições de hover ou seleção).
*   **Bordas**: `--dss-border-width-1`, `--dss-border-color-default`.

### Tokens Permitidos
*   **Espaçamento**: `--dss-spacing-1` a `--dss-spacing-96`
*   **Raio**: `--dss-radius-sm`, `--dss-radius-md`, `--dss-radius-lg`, `--dss-radius-full`
*   **Duração**: `--dss-duration-150`, `--dss-duration-200`, `--dss-duration-250`, `--dss-duration-300`
*   **Superfície**: `--dss-surface-default`, `--dss-surface-hover`, `--dss-surface-selected`, `--dss-surface-elevated`, etc. (conforme tokens de superfície existentes no DSS).
*   **Cores**: `--dss-color-primary`, `--dss-color-secondary`, `--dss-color-info`, `--dss-color-success`, `--dss-color-warning`, `--dss-color-danger`, `--dss-color-neutral`, etc. (conforme tokens de cor existentes no DSS).
*   **Tipografia**: `--dss-font-family-base`, `--dss-font-size-md`, `--dss-font-weight-regular`, `--dss-line-height-md`, etc. (conforme tokens de tipografia existentes no DSS).

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
*   **Semântica HTML**: Utilização correta de `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`, `<caption>`.
*   **ARIA Attributes**: Implementação de `aria-label`, `aria-describedby`, `aria-sort` para ordenação, `aria-selected` para seleção de linhas.
*   **Navegação por Teclado**: Suporte completo para navegação via teclado (Tab, Shift+Tab, setas) para todas as células interativas, cabeçalhos ordenáveis e controles de paginação.
*   **Foco Visual**: Indicação clara do foco para elementos interativos.
*   **Contraste de Cores**: Garantir contraste adequado para textos e elementos visuais.
*   **Leitores de Tela**: Conteúdo e interações devem ser corretamente anunciados por leitores de tela.

### Estados
*   **Padrão**: Estado inicial da tabela com dados.
*   **Carregando**: Indicador visual de carregamento (e.g., `DssSpinner`) enquanto os dados são buscados.
*   **Vazio**: Mensagem clara quando não há dados para exibir.
*   **Erro**: Mensagem de erro e/ou opção para tentar novamente em caso de falha no carregamento.
*   **Linha Selecionada**: Estilo visual distinto para linhas selecionadas (simples ou múltipla).
*   **Linha em Hover**: Estilo visual para linhas sob o cursor do mouse.
*   **Ordenado**: Indicação visual da coluna atualmente ordenada e da direção da ordenação.
*   **Filtrado**: Indicação visual de que a tabela está sendo filtrada.
*   **Desabilitado**: Estado onde a tabela ou partes dela não são interativas.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas do DSS
O `DssTable` pode depender de outros componentes do Design System para sua construção e funcionalidade:
*   `DssButton`: Para ações dentro da tabela ou controles de paginação.
*   `DssCheckbox`: Para seleção de linhas.
*   `DssInput`: Para campos de filtro.
*   `DssSelect`: Para seleção de quantidade de itens por página.
*   `DssPagination`: Para controle de paginação.
*   `DssSpinner`: Para indicar estado de carregamento.
*   `DssIcon`: Para ícones de ordenação ou ações.

### Composição
O `DssTable` deve ser altamente componível, permitindo a injeção de conteúdo personalizado através de slots para cabeçalhos, células e rodapés, sem comprometer a estrutura e acessibilidade base. Isso permite a criação de tabelas complexas com elementos interativos ou visuais específicos dentro das células.

## 7. EXCEÇÕES PREVISTAS

*   **Tabelas com Conteúdo Extenso**: Para tabelas com muitas colunas que excedem a largura da tela, deve-se prever rolagem horizontal (`overflow-x: auto`) ou a possibilidade de 
ocultar/exibir colunas.
*   **Tabelas Aninhadas**: Embora não seja o caso de uso primário, a estrutura deve permitir a renderização de tabelas aninhadas, se necessário, através de slots de expansão de linha.
*   **Customização de Células Complexas**: A capacidade de renderizar componentes Vue complexos dentro das células, exigindo que o slot de célula forneça acesso aos dados da linha e da coluna.

## 8. SUPERFÍCIE DE PLAYGROUND

O Playground para o `DssTable` deve demonstrar todas as suas capacidades e variações, permitindo que os desenvolvedores explorem e testem o componente em diferentes cenários.

### Controles
*   **Dados**: Campo para inserir dados JSON simulados ou selecionar conjuntos de dados predefinidos (pequeno, médio, grande).
*   **Colunas**: Controles para definir as colunas (nome, rótulo, ordenável, alinhamento).
*   **Paginação**: Controles para habilitar/desabilitar paginação, definir itens por página, página atual.
*   **Filtro**: Campo de texto para filtro global.
*   **Seleção**: Radio buttons para selecionar o tipo de seleção (`none`, `single`, `multiple`).
*   **Densidade**: Radio buttons para `compact`, `standard`.
*   **Variante**: Radio buttons para `flat`, `bordered`, `elevated`.
*   **Loading**: Checkbox para simular estado de carregamento.
*   **No Data Label**: Campo de texto para customizar a mensagem de 
tabela vazia.
*   **Wrap Cells**: Checkbox para habilitar/desabilitar quebra de texto nas células.

### Composite Logic
*   **Ordenação**: Demonstração de ordenação de colunas (ascendente, descendente, sem ordenação).
*   **Paginação**: Interação com os controles de paginação para navegar entre as páginas.
*   **Filtragem**: Aplicação de filtros e visualização dos resultados.
*   **Seleção de Linhas**: Seleção de linhas individuais e múltiplas, e exibição das linhas selecionadas.
*   **Customização de Slots**: Exemplos de como usar os slots `header` e `row` para renderizar conteúdo personalizado, como botões de ação ou componentes complexos dentro das células.

### Estados a Expor
*   `loading`: Boolean que indica se a tabela está carregando dados.
*   `selectedRows`: Array de objetos representando as linhas selecionadas.
*   `pagination`: Objeto contendo o estado atual da paginação (página, itens por página, total de páginas).
*   `filter`: String contendo o valor atual do filtro global.
*   `sortBy`: String contendo a chave da coluna pela qual a tabela está ordenada.
*   `sortOrder`: String contendo a ordem da ordenação (`asc`, `desc`).