"""
# Pré-prompt: DssMarkupTable

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
DssChip

### Golden Context
O DssMarkupTable é um componente de exibição de dados tabulares, projetado para apresentar informações complexas de forma organizada e legível. Ele suporta funcionalidades essenciais como ordenação, paginação, filtragem e seleção, tornando-o versátil para diversas aplicações que exigem manipulação e visualização de grandes volumes de dados. Sua arquitetura modular permite a fácil integração com diferentes fontes de dados e a customização de sua apresentação, mantendo a consistência visual e funcional do Design System Sansys (DSS). Este componente é crucial para dashboards, relatórios e qualquer interface que necessite de uma representação estruturada de dados.

### Justificativa
A necessidade de um componente de tabela robusto e padronizado é fundamental para garantir a consistência na apresentação de dados em todo o sistema. O DssMarkupTable visa encapsular a lógica de exibição e interação com dados tabulares, promovendo a reutilização, a manutenção simplificada e a adesão aos princípios de design do DSS. Ele resolve o desafio de exibir grandes conjuntos de dados de forma eficiente e acessível, minimizando a complexidade para os desenvolvedores e garantindo uma experiência de usuário coesa e intuitiva. A padronização evita a proliferação de implementações de tabela inconsistentes e melhora a governança do design.

## 2. RISCOS ARQUITETURAIS E GATES

- **Performance com grandes volumes de dados**: Garantir que o componente mantenha alta performance ao renderizar milhares de linhas, possivelmente com virtualização de linhas e carregamento lazy-loading. A estratégia de virtualização deve ser bem definida para evitar gargalos de renderização e consumo excessivo de memória, especialmente em dispositivos com recursos limitados. Testes de carga e performance são mandatórios antes da aprovação.
- **Customização flexível**: Equilibrar a padronização do DSS com a necessidade de customização de colunas, células e cabeçalhos. A API deve permitir a injeção de templates ou render functions para células e cabeçalhos, sem comprometer a estrutura base e a acessibilidade. A customização não deve introduzir desvios do design system que possam impactar a experiência do usuário ou a manutenção.
- **Integração com APIs de dados**: Definir uma interface clara e flexível para a integração com diferentes fontes de dados (local, remoto, assíncrono). O componente deve ser agnóstico quanto à origem dos dados, aceitando-os em um formato padronizado e fornecendo mecanismos para callbacks de carregamento e manipulação de estado. Deve haver suporte para carregamento assíncrono e tratamento de erros de forma elegante.
- **Acessibilidade complexa**: Garantir que todas as funcionalidades interativas (ordenação, paginação, seleção, filtragem) sejam totalmente acessíveis. Isso inclui suporte completo para navegação por teclado, uso de atributos ARIA apropriados e feedback visual claro para estados de foco e seleção. A conformidade com WCAG 2.1 (nível AA) é um requisito não negociável.
- **Gerenciamento de estado global**: Evitar que o componente se torne um "god object" que gerencia todo o estado da aplicação. Ele deve ser um componente controlado, onde o estado (como paginação atual, ordenação, seleção) é gerenciado externamente e passado via props, com eventos para notificar mudanças. Isso promove a reusabilidade e a testabilidade.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

Este mapeamento detalha a transição de propriedades e eventos comuns de componentes de tabela do Quasar para a proposta de API do DssMarkupTable, visando uma migração suave e padronização.

| Funcionalidade Quasar | Propriedade/Slot/Evento Quasar | Equivalente DSS (Proposta) | Descrição do Equivalente DSS |
| :-------------------- | :----------------------------- | :------------------------- | :--------------------------- |
| Dados                 | `rows`                         | `data`                     | Array de objetos representando as linhas da tabela. |
| Colunas               | `columns`                      | `columns`                  | Array de objetos definindo as colunas da tabela, incluindo `field`, `label`, `align`, `sortable`, etc. |
| Paginação             | `pagination`, `onUpdate:pagination` | `pagination`, `onPageChange` | Objeto de configuração da paginação e evento para mudança de página. |
| Ordenação             | `sortBy`, `sortOrder`, `onRequest` | `sortBy`, `sortOrder`, `onSort` | Propriedades para coluna e ordem de ordenação, e evento para solicitação de ordenação. |
| Seleção               | `selection`, `selected`, `onUpdate:selected` | `selection`, `selectedItems`, `onSelectionChange` | Tipo de seleção (single, multiple, none), itens selecionados e evento de mudança de seleção. |
| Carregamento          | `loading`                      | `isLoading`                | Booleano que indica se a tabela está em estado de carregamento. |
| Slots de Célula/Cabeçalho | `body-cell-[name]`, `header-cell-[name]` | `cell-[name]`, `header-[name]` | Slots para customização do conteúdo de células e cabeçalhos específicos. |
| Densidade             | `dense`                        | `density` (valores: `compact`, `standard`, `comfortable`) | Define a densidade de espaçamento entre os elementos da tabela. |
| Filtragem             | `filter`, `onFilter`           | `filter`, `onFilterChange` | Valor do filtro global e evento para mudança do filtro. |
| Linhas por página     | `rows-per-page-options`        | `rowsPerPageOptions`       | Opções de quantidade de linhas a serem exibidas por página. |
| Sem dados             | `no-data-label`                | `noDataMessage`            | Mensagem exibida quando não há dados na tabela. |

## 4. GOVERNANÇA DE TOKENS E CSS

O DssMarkupTable deve utilizar exclusivamente os tokens de design do DSS para espaçamento, raio, cores, tipografia e outros atributos visuais. A aderência estrita a esses tokens garante a consistência visual e a fácil manutenção do componente em todo o ecossistema Sansys. Qualquer desvio deve ser justificado e aprovado pela equipe de Design System.

- **Espaçamento**: `--dss-spacing-4` (para padding interno de células), `--dss-spacing-8` (para espaçamento entre elementos da paginação), `--dss-spacing-16` (para margens externas do componente). A utilização de uma escala de espaçamento consistente é vital para a legibilidade e a hierarquia visual.
- **Raio**: `--dss-radius-sm` (para bordas de elementos interativos dentro da tabela, como botões de paginação), `--dss-radius-md` (para o contorno geral da tabela ou cards que a contenham). Garante a coesão visual com outros componentes do DSS.
- **Cores**: `--dss-surface-default` (para o fundo da tabela), `--dss-text-hub` (para texto principal e cabeçalhos), `--dss-text-subtle` (para texto secundário ou descrições), `--dss-action-hub` (para ações primárias, como botões de ordenação ativos), `--dss-action-hub-surface` (para o fundo de elementos interativos primários), `--dss-action-water` (para ações secundárias), `--dss-action-water-surface` (para o fundo de elementos interativos secundários), `--dss-action-waste` (para ações de destaque ou alerta). A paleta de cores deve ser semanticamente aplicada para indicar estados e interações de forma clara.
- **Tipografia**: `--dss-font-family-base` (para todo o texto), `--dss-font-size-md` (para o corpo da tabela), `--dss-font-weight-semibold` (para cabeçalhos de coluna). A tipografia deve seguir a escala e os pesos definidos no DSS para garantir legibilidade e hierarquia.
- **Duração**: `--dss-duration-250` (para transições de hover ou foco), `--dss-duration-150` (para transições mais rápidas, como feedback de clique). As durações de transição contribuem para uma experiência de usuário fluida e responsiva.
- **Bordas**: `--dss-border-width-xs` (para bordas de células), `--dss-border-color-default` (para a cor das bordas). As bordas devem ser sutis para não sobrecarregar a interface, mas presentes para delimitar as células.

**Proibido**: Utilizar valores hardcoded (ex: `padding: 10px;`), tokens semânticos não existentes no DSS (ex: `--dss-table-border`), ou tokens de brand antigos como `--dss-action-hub`, `--dss-action-hub-surface`, `--dss-text-subtle`, `--dss-spacing-4`, `outline: 2px solid white`. Todos os estilos devem ser derivados dos tokens aprovados.

**Correções de Tokens Fantasmas e Nomenclatura de Brand:**
- `--dss-spacing-4` substituído por `--dss-spacing-4` ou `--dss-spacing-8` conforme contexto.
- `--dss-text-subtle` substituído por `--dss-text-subtle`.
- `outline: 2px solid white` removido ou substituído por `outline: 2px solid white` para acessibilidade.
- `--dss-action-hub` substituído por `--dss-action-hub`.
- `--dss-action-hub-surface` substituído por `--dss-action-hub-surface`.
- `hub`, `water`, `waste` substituídos por `hub`, `water`, `waste` em todos os contextos de cor.

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
O DssMarkupTable é construído com foco na acessibilidade, garantindo que todos os usuários, incluindo aqueles com deficiências, possam interagir e compreender o conteúdo da tabela de forma eficaz.

- **Semântica HTML**: Utilização de elementos HTML semânticos como `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` com atributos `scope="col"` e `scope="row"` apropriados para cabeçalhos. Isso fornece uma estrutura clara para tecnologias assistivas.
- **Navegação por teclado**: Suporte completo para navegação e interação com a tabela (ordenação, paginação, seleção, filtragem) via teclado. Os usuários devem ser capazes de navegar entre células, cabeçalhos e controles interativos usando as teclas Tab, Shift+Tab, setas e Enter/Espaço.
- **ARIA Attributes**: Implementação de atributos ARIA (Accessible Rich Internet Applications) como `aria-label`, `aria-describedby`, `aria-sort`, `aria-selected`, `aria-live` conforme necessário para leitores de tela. Esses atributos fornecem informações adicionais sobre o papel, estado e propriedades dos elementos da tabela.
- **Foco visível**: Indicação clara e consistente do estado de foco para elementos interativos. O anel de foco deve ser visível e contrastante, utilizando `outline: 2px solid white` ou um token de foco do DSS que garanta visibilidade em diferentes superfícies.
- **Contraste de cores**: Garantia de que o contraste de cores entre o texto e o fundo atenda aos requisitos mínimos de WCAG 2.1 (nível AA) para garantir legibilidade para usuários com baixa visão.
- **Alternativas textuais**: Fornecer alternativas textuais para qualquer conteúdo não textual, como ícones ou imagens dentro das células da tabela.

### Estados
O componente DssMarkupTable deve exibir claramente seus diferentes estados para informar o usuário sobre sua condição atual e possíveis interações.

- **Padrão**: Tabela com dados exibidos normalmente, sem interações ativas ou mensagens especiais.
- **Vazio**: Tabela sem dados para exibir, apresentando uma mensagem clara como "Nenhum dado disponível" ou "Não foram encontrados resultados para sua busca".
- **Carregando**: Tabela exibindo um indicador de carregamento (spinner ou skeleton loader) enquanto os dados estão sendo buscados ou processados. As interações devem ser desabilitadas ou visualmente indicadas como indisponíveis.
- **Erro**: Tabela exibindo uma mensagem de erro clara e concisa se houver um problema ao carregar os dados, com uma opção para tentar novamente, se aplicável.
- **Selecionado**: Linhas ou células selecionadas devem ter um estilo visual distinto para indicar seu estado de seleção.
- **Hover**: Linhas ou elementos interativos devem ter um estilo de hover para indicar que são interativos.
- **Foco**: Elementos interativos devem ter um estilo de foco visível para usuários de teclado.
- **Ordenado**: Colunas que estão sendo usadas para ordenação devem exibir um ícone indicando a direção da ordenação (ascendente/descendente).
- **Desabilitado**: Controles de paginação ou filtragem podem ser desabilitados se não houver dados ou se a funcionalidade não for aplicável.

## 6. COMPORTAMENTO E INTERAÇÕES

O DssMarkupTable oferece uma gama de comportamentos e interações para otimizar a experiência do usuário na manipulação de dados tabulares.

- **Ordenação de Colunas**: Os usuários podem clicar nos cabeçalhos das colunas para ordenar os dados em ordem crescente ou decrescente. Um ícone visual deve indicar a coluna atualmente ordenada e a direção da ordenação. A ordenação pode ser local (no cliente) ou remota (via API).
- **Paginação**: Para grandes conjuntos de dados, a tabela deve suportar paginação, permitindo que os usuários naveguem entre diferentes páginas de resultados. Controles de paginação (próxima, anterior, números de página, linhas por página) devem ser intuitivos e acessíveis.
- **Seleção de Linhas**: O componente pode permitir a seleção de uma ou múltiplas linhas. Checkboxes devem ser usados para seleção múltipla, e um estado visual claro deve indicar as linhas selecionadas. Eventos devem ser emitidos para notificar a aplicação sobre as linhas selecionadas.
- **Filtragem/Busca**: Uma funcionalidade de busca ou filtragem pode ser integrada para permitir que os usuários refinem os dados exibidos. A filtragem pode ser global (aplicada a todas as colunas) ou por coluna específica.
- **Redimensionamento de Colunas (Opcional)**: Em cenários específicos, pode ser permitido que os usuários redimensionem a largura das colunas. Esta funcionalidade deve ser cuidadosamente implementada para não comprometer a responsividade ou a acessibilidade.
- **Expansão de Detalhes (Opcional)**: Para exibir informações adicionais de uma linha sem sobrecarregar a tabela principal, pode haver um mecanismo de expansão de detalhes, revelando um painel secundário abaixo da linha selecionada.
- **Responsividade**: A tabela deve se adaptar a diferentes tamanhos de tela, possivelmente com rolagem horizontal, ocultação de colunas menos importantes ou uma visualização alternativa em dispositivos móveis (ex: cards).

## 7. DIRETRIZES DE USO E BOAS PRÁTICAS

Para garantir o uso eficaz e consistente do DssMarkupTable, as seguintes diretrizes e boas práticas devem ser observadas.

- **Dados Consistentes**: Sempre forneça dados em um formato consistente e previsível. Objetos para linhas e colunas devem seguir a estrutura definida na API do componente.
- **Evitar Abuso de Customização**: Embora flexível, evite customizações excessivas que possam desviar o componente dos padrões do DSS. Priorize a consistência e a manutenibilidade.
- **Performance**: Para grandes volumes de dados, utilize a paginação e a ordenação remota para otimizar a performance. Considere a virtualização de linhas para renderização eficiente.
- **Acessibilidade em Primeiro Lugar**: Sempre teste a acessibilidade do componente em diferentes cenários e com tecnologias assistivas. Garanta que todos os elementos interativos sejam navegáveis por teclado e que os atributos ARIA estejam corretos.
- **Feedback Visual Claro**: Forneça feedback visual claro para todas as interações do usuário (hover, foco, seleção, ordenação, carregamento) para melhorar a usabilidade.
- **Mensagens de Estado**: Utilize mensagens claras e amigáveis para estados como "vazio", "carregando" e "erro".
- **Limitar Colunas**: Evite um número excessivo de colunas que possa causar rolagem horizontal desnecessária e dificultar a leitura. Priorize as informações mais importantes.
- **Títulos de Coluna Descritivos**: Use títulos de coluna concisos e descritivos que ajudem o usuário a entender o conteúdo.
- **Internacionalização (i18n)**: Garanta que todos os textos exibidos na tabela (cabeçalhos, mensagens de estado, controles de paginação) possam ser facilmente internacionalizados.

## 8. SUPERFÍCIE DE PLAYGROUND

A Superfície de Playground é um ambiente interativo para explorar e testar o DssMarkupTable em diferentes configurações e estados, garantindo que ele se comporte conforme o esperado e se integre perfeitamente com o Design System Sansys.

### Controles Obrigatórios
Os seguintes controles devem estar disponíveis no playground para permitir a manipulação e visualização das principais funcionalidades do componente:

- **Propriedade `data`**: Um editor de JSON ou um seletor de conjuntos de dados pré-definidos (ex: pequeno, médio, grande) para simular diferentes volumes de dados.
- **Propriedade `columns`**: Um editor de JSON para definir a estrutura das colunas, incluindo `field`, `label`, `sortable`, `align`, e opções de customização de slot.
- **Propriedade `pagination`**: Controles para ajustar `rowsPerPage`, `page`, `rowsNumber` e `enablePagination` (true/false).
- **Propriedade `selection`**: Um seletor de tipo de seleção (none, single, multiple).
- **Propriedade `isLoading`**: Um toggle (true/false) para simular o estado de carregamento.
- **Propriedade `density`**: Um seletor de rádio para `compact`, `standard`, `comfortable`.
- **Propriedade `filter`**: Um campo de texto para aplicar um filtro global aos dados da tabela.
- **Eventos**: Um console para exibir os eventos emitidos pelo componente, como `onPageChange`, `onSort`, `onSelectionChange`, `onFilterChange`.

### Composite Logic (concreta, não genérica)
Exemplos de lógica de composição que podem ser demonstrados no playground, mostrando como o DssMarkupTable interage com outros componentes ou lógicas de negócio específicas.

1.  **Tabela com Filtragem e Paginação Remota**: Demonstrar como o DssMarkupTable pode ser integrado com uma API simulada que lida com filtragem e paginação no lado do servidor. Ao alterar o filtro ou a página, uma chamada de API simulada é feita, e os dados são atualizados na tabela. Isso mostra a capacidade de lidar com grandes datasets sem carregar tudo no cliente.
    *   **Cenário**: Exibição de uma lista de produtos com busca e paginação.
    *   **Interação**: Usuário digita no campo de filtro, ou clica nos botões de paginação.
    *   **Resultado Esperado**: Tabela atualiza os dados exibidos com base na resposta da API simulada, mostrando um estado de `isLoading` durante a requisição.

2.  **Tabela com Seleção Múltipla e Ações em Lote**: Integrar o DssMarkupTable com um componente `DssButton` ou `DssDropdown` para realizar ações em lote nas linhas selecionadas. Por exemplo, um botão "Excluir Selecionados" que só fica ativo quando há itens selecionados.
    *   **Cenário**: Gerenciamento de usuários, onde múltiplos usuários podem ser selecionados para exclusão ou edição.
    *   **Interação**: Usuário seleciona várias linhas e clica em um botão de ação.
    *   **Resultado Esperado**: O botão de ação reage ao estado de seleção, e um evento é emitido com os IDs dos itens selecionados para processamento.

3.  **Tabela com Customização de Células e Tooltips**: Demonstrar o uso de slots para customizar o conteúdo de células específicas, como exibir um `DssBadge` para status ou um `DssTooltip` para detalhes adicionais ao passar o mouse sobre um item.
    *   **Cenário**: Exibição de status de pedidos com badges coloridos e tooltips para detalhes do status.
    *   **Interação**: Usuário passa o mouse sobre uma célula de status.
    *   **Resultado Esperado**: Um `DssBadge` é renderizado na célula e um `DssTooltip` aparece com informações adicionais.

### Estados a Expor

Os seguintes estados internos do DssMarkupTable devem ser expostos no playground para monitoramento e depuração, facilitando a compreensão do comportamento do componente.

| Estado Interno      | Tipo    | Descrição                                                                |
| :------------------ | :------ | :----------------------------------------------------------------------- |
| `currentPage`       | Number  | A página atualmente exibida na tabela.                                   |
| `currentSortBy`     | String  | O campo da coluna pela qual a tabela está atualmente ordenada.           |
| `currentSortOrder`  | String  | A direção da ordenação atual (`asc` ou `desc`).                          |
| `selectedRows`      | Array   | Um array contendo os objetos das linhas atualmente selecionadas.          |
| `visibleColumns`    | Array   | Um array contendo os `field`s das colunas visíveis.                     |
| `filteredData`      | Array   | O subconjunto de dados após a aplicação de filtros.                     |
| `totalRowsNumber`   | Number  | O número total de linhas disponíveis (considerando paginação remota).    |
| `isTableLoading`    | Boolean | Indica se a tabela está em processo de carregamento de dados.            |
| `hasError`          | Boolean | Indica se ocorreu um erro durante o carregamento ou processamento de dados. |
| `rowsPerPage`       | Number  | O número de linhas configurado para exibição por página.                 |

"""
