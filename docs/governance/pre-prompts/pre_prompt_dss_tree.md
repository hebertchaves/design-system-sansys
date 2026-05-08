# Pré-prompt: DssTree

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
O componente `DssTree` é um componente interativo que permite a exibição hierárquica de dados. Portanto, sua Golden Reference é o `DssChip` para componentes interativos e `DssBadge` para componentes não-interativos.

### Golden Context
O `DssTree` é utilizado para organizar e apresentar informações de forma estruturada, permitindo que o usuário navegue por diferentes níveis de dados. Ele deve ser intuitivo e responsivo, adaptando-se a diferentes tamanhos de tela e dispositivos.

### Justificativa
A necessidade de um componente `DssTree` surge da demanda por uma maneira eficiente e padronizada de exibir dados hierárquicos em aplicações construídas com o Design System. Ele garante consistência visual e funcionalidade em toda a plataforma, reduzindo o tempo de desenvolvimento e melhorando a experiência do usuário ao lidar com estruturas de dados complexas.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
- **Performance:** Renderização de grandes volumes de dados em árvores complexas pode impactar a performance. A virtualização de itens e a carga preguiçosa (lazy loading) devem ser consideradas.
- **Customização:** A flexibilidade para customizar a renderização de nós (nodes) sem comprometer a padronização do DSS.
- **Estado:** Gerenciamento do estado de expansão/colapso dos nós e seleção de itens, especialmente em cenários de múltiplos `DssTree` na mesma página.

### Gates
- **Performance:** O componente deve ser capaz de renderizar uma árvore com 1000 nós em menos de 500ms em dispositivos de médio desempenho.
- **Acessibilidade:** Conformidade total com WCAG 2.1 Nível AA para navegação por teclado e leitores de tela.
- **Testes:** Cobertura de testes unitários e de integração superior a 80%.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssTree` será construído sobre o componente `QTree` do Quasar. Abaixo, um mapeamento inicial de propriedades e eventos:

| Propriedade/Evento Quasar (QTree) | Propriedade/Evento DSS (DssTree) | Tipo | Descrição | Observações |
| :-------------------------------- | :------------------------------- | :--- | :---------- | :---------- |
| `nodes`                           | `items`                          | `Array<Object>` | Dados hierárquicos a serem exibidos. | Renomeado para melhor semântica no DSS, representando a coleção de itens da árvore. |
| `node-key`                        | `item-key`                       | `String` | Nome da propriedade que serve como chave única para cada item. | Essencial para o rastreamento e gerenciamento de estado dos itens. |
| `label-key`                       | `label-key`                      | `String` | Nome da propriedade que contém o texto a ser exibido para cada item. | Permite flexibilidade na estrutura dos dados de entrada. |
| `children-key`                    | `children-key`                   | `String` | Nome da propriedade que contém o array de filhos de um item. | Define a estrutura hierárquica da árvore. |
| `selected`                        | `model-value`                    | `Array<String>` | Array de chaves dos itens selecionados. | Renomeado para seguir o padrão `v-model` do Vue para componentes controlados. |
| `expanded`                        | `expanded-items`                 | `Array<String>` | Array de chaves dos nós atualmente expandidos. | Gerencia o estado de expansão/colapso dos nós. |
| `@update:selected`                | `@update:model-value`            | `Event` | Emitido quando a seleção de itens é alterada. | Permite a reatividade e o controle externo da seleção. |
| `@update:expanded`                | `@update:expanded-items`         | `Event` | Emitido quando o estado de expansão de um nó é alterado. | Permite a reatividade e o controle externo da expansão. |
| `accordion`                       | `accordion`                      | `Boolean` | Se verdadeiro, apenas um nó de cada nível pode ser expandido por vez. | Mantém o mesmo nome e funcionalidade. |
| `no-connectors`                   | `hide-connectors`                | `Boolean` | Se verdadeiro, as linhas de conexão entre os nós não são exibidas. | Renomeado para clareza e consistência com a terminologia do DSS. |
| `default-expand-all`              | `expand-all-on-load`             | `Boolean` | Se verdadeiro, todos os nós são expandidos por padrão no carregamento inicial. | Nova propriedade para controle do estado inicial da árvore. |
| `filter`                          | `search-query`                   | `String` | String de filtro para buscar nós na árvore. | Implementação de filtro nativo para melhorar a usabilidade. |
| `filter-method`                   | `custom-filter`                  | `Function` | Função customizada para aplicar lógica de filtro. | Oferece flexibilidade para filtros complexos. |

## 4. GOVERNANÇA DE TOKENS E CSS

A governança de tokens no `DssTree` é crucial para manter a consistência visual e funcional em todo o Design System. O componente deve aderir estritamente ao uso de tokens numéricos e de superfície pré-definidos, evitando a criação de tokens semânticos ad-hoc que possam comprometer a escalabilidade e a manutenibilidade do sistema.

### Princípios de Uso de Tokens:
- **Espaçamento:** Utilizar tokens de espaçamento do DSS para definir margens, preenchimentos e lacunas entre os elementos da árvore. Isso garante um ritmo vertical e horizontal harmonioso.
- **Tipografia:** A tipografia dos rótulos dos nós deve seguir os tokens de texto do DSS, incluindo tamanho, peso e cor, para garantir legibilidade e hierarquia visual.
- **Cores:** As cores devem ser aplicadas através dos tokens de cor do DSS, abrangendo estados interativos (hover, focado, selecionado), cores de texto e cores de fundo. Especial atenção deve ser dada às cores de superfície para garantir contraste adequado e acessibilidade.
- **Bordas e Raios:** Se o componente incluir elementos com bordas ou cantos arredondados, os tokens de raio do DSS devem ser aplicados para manter a identidade visual.
- **Transições e Animações:** As durações de transição para expansão/colapso e outros efeitos visuais devem ser controladas por tokens de duração, proporcionando uma experiência de usuário fluida e previsível.

### Exemplos de uso de tokens:
- **Espaçamento entre itens:** `--dss-spacing-4` (para espaçamento vertical entre nós irmãos).
- **Espaçamento interno dos nós:** `--dss-spacing-3` (para padding interno dos rótulos dos nós).
- **Raio das bordas (se aplicável):** `--dss-radius-md` (para cantos arredondados de itens selecionados ou contêineres).
- **Cor de fundo de itens selecionados:** `--dss-action-hub-surface` (para o estado de seleção, indicando a ação principal).
- **Cor de fundo de itens em hover:** `--dss-surface-hover` (para feedback visual ao passar o mouse).
- **Cor do texto padrão:** `--dss-text-default`.
- **Cor do texto sutil:** `--dss-text-subtle` (para descrições ou informações secundárias).
- **Cor do ícone de expansão:** `--dss-icon-default`.
- **Duração de transições (expansão/colapso):** `--dss-duration-250` (para uma transição suave de 250ms).
- **Sombra (se aplicável):** `--dss-shadow-sm` (para elevação de nós em estados específicos, como drag-and-drop).

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
A acessibilidade é um pilar fundamental do `DssTree`, garantindo que todos os usuários, independentemente de suas capacidades, possam interagir com dados hierárquicos de forma eficiente.
- **Navegação por teclado:** O componente deve ser totalmente operável via teclado.
  - `Seta para Baixo`: Move o foco para o próximo nó visível.
  - `Seta para Cima`: Move o foco para o nó visível anterior.
  - `Seta para Direita`: Expande o nó atual se estiver colapsado; se já estiver expandido, move o foco para o primeiro filho.
  - `Seta para Esquerda`: Colapsa o nó atual se estiver expandido; se já estiver colapsado, move o foco para o nó pai.
  - `Enter` ou `Espaço`: Seleciona ou desmarca o nó atual.
  - `Home`: Move o foco para o primeiro nó da árvore.
  - `End`: Move o foco para o último nó visível da árvore.
- **Leitores de tela (Screen Readers):** O componente deve utilizar atributos ARIA para comunicar sua estrutura e estado.
  - `role="tree"` no contêiner principal.
  - `role="treeitem"` em cada nó.
  - `aria-expanded="true/false"` em nós que possuem filhos, indicando seu estado atual.
  - `aria-selected="true/false"` em nós selecionáveis.
  - `aria-level="N"` para indicar a profundidade do nó na hierarquia.
  - `aria-setsize` e `aria-posinset` para informar o tamanho do grupo e a posição do nó dentro dele.
- **Gerenciamento de Foco:** O foco deve ser visualmente claro e seguir o padrão de "roving tabindex", onde apenas um elemento da árvore recebe foco por vez, facilitando a navegação.

### Estados
O `DssTree` deve comunicar claramente seu estado atual através de feedback visual consistente com os tokens do DSS.
- **Padrão (Default):** O estado base do componente, exibindo a hierarquia inicial de dados.
- **Hover:** Quando o cursor do mouse passa sobre um nó, a cor de fundo deve mudar sutilmente (ex: `--dss-surface-hover`) para indicar interatividade.
- **Focado (Focused):** Quando um nó recebe foco via teclado, um anel de foco claro deve ser exibido (ex: `outline: 2px solid white` ou `--dss-action-hub`), garantindo visibilidade em diferentes fundos.
- **Selecionado (Selected):** O nó selecionado deve ter um destaque visual proeminente, como uma cor de fundo específica (ex: `--dss-action-hub-surface`) e texto contrastante.
- **Expandido/Colapsado:** O ícone indicador (geralmente uma seta ou chevron) deve rotacionar ou mudar para refletir o estado do nó.
- **Desabilitado (Disabled):** Nós desabilitados devem ter opacidade reduzida (ex: `opacity: 0.5`) e o cursor deve mudar para `not-allowed`, impedindo interações.
- **Carregando (Loading):** Durante o lazy loading de filhos, um indicador de progresso (ex: `DssSpinner`) deve ser exibido ao lado ou no lugar do ícone de expansão.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências
- **Quasar Framework:** `QTree` (componente base).
- **Design System Core:** Tokens de design (CSS custom properties).

### Composição
O `DssTree` pode compor outros componentes do DSS para a renderização de seus nós, como `DssBadge` para indicadores ou `DssIcon` para ícones de expansão/colapso.

## 7. EXCEÇÕES PREVISTAS

- **Nós arrastáveis/soltáveis (Drag and Drop):** Funcionalidade de drag and drop não será implementada na Fase 2. Caso seja necessária, será considerada para fases futuras como uma extensão.
- **Edição inline de nós:** A edição direta do texto dos nós não será suportada na Fase 2.
- **Filtro/Busca:** Funcionalidade de filtro ou busca dentro da árvore não será parte da Fase 2.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles
- **Propriedade `items`:** Editor JSON para definir a estrutura hierárquica dos dados.
- **Propriedade `item-key`:** Campo de texto para definir a chave única dos itens.
- **Propriedade `label-key`:** Campo de texto para definir a chave do texto exibido.
- **Propriedade `children-key`:** Campo de texto para definir a chave dos filhos.
- **Propriedade `model-value`:** Multi-select para simular a seleção de itens.
- **Propriedade `expanded-items`:** Multi-select para simular a expansão de nós.
- **Propriedade `accordion`:** Toggle para ativar/desativar o modo acordeão.
- **Propriedade `hide-connectors`:** Toggle para exibir/ocultar as linhas de conexão.

### Composite Logic (Lógica Composta)
A seção de Lógica Composta na Superfície de Playground deve demonstrar cenários de uso mais avançados e integrações do `DssTree` com outros componentes e funcionalidades do Design System.

- **Seleção de múltiplos itens com feedback visual:**
  - **Descrição:** Apresentar um exemplo interativo onde o usuário pode selecionar múltiplos nós na árvore, e o `DssTree` reflete essa seleção de forma clara, por exemplo, alterando a cor de fundo dos nós selecionados para `--dss-action-hub-surface` e exibindo um contador de itens selecionados em um `DssBadge` na parte superior do playground.
  - **Detalhes:** A demonstração deve incluir a persistência da seleção ao expandir e colapsar nós, e a capacidade de desmarcar itens individualmente ou todos de uma vez.

- **Carregamento assíncrono de nós (Lazy Loading) com indicador de progresso:**
  - **Descrição:** Ilustrar como o `DssTree` gerencia o carregamento de dados em grandes árvores. Ao expandir um nó pai que ainda não teve seus filhos carregados, um `DssSpinner` deve ser exibido temporariamente no lugar dos filhos, e os dados devem ser carregados de forma assíncrona, simulando uma chamada de API.
  - **Detalhes:** O exemplo deve mostrar a transição suave do spinner para os nós filhos carregados, e como o estado `is-loading` é gerenciado internamente e exposto para controle externo.

- **Integração com `DssInput` para filtragem dinâmica:**
  - **Descrição:** Demonstrar como um `DssInput` pode ser utilizado em conjunto com o `DssTree` para filtrar os nós exibidos. Conforme o usuário digita no `DssInput`, a árvore deve ser atualizada dinamicamente, mostrando apenas os nós que correspondem ao termo de busca (e seus ancestrais, se necessário).
  - **Detalhes:** A lógica de filtragem deve ser concreta, mostrando como a propriedade `search-query` ou a função `custom-filter` do `DssTree` pode ser utilizada para implementar essa funcionalidade. Deve-se considerar a busca por `label-key` e, opcionalmente, por outras propriedades dos itens.

### Estados a Expor
Para facilitar a depuração e a integração com outras partes da aplicação, o `DssTree` deve expor os seguintes estados:

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `model-value` | Um array contendo as chaves únicas de todos os itens que estão atualmente selecionados na árvore. Este estado é bidirecional e pode ser usado para controlar a seleção programaticamente. | `Array<String>` | — |
| `expanded-items` | Um array contendo as chaves únicas de todos os nós que estão atualmente expandidos. Permite controlar e observar quais partes da árvore estão visíveis. | `Array<String>` | Clique no header |
| `is-loading` | Um booleano que indica se o componente está em processo de carregamento assíncrono de dados (por exemplo, filhos de um nó via lazy loading). Útil para exibir indicadores de carregamento na interface do usuário. | `Boolean` | Prop `loading=true` |
| `active-node` | A chave única do nó que está atualmente com foco (via teclado ou clique). Essencial para acessibilidade e navegação. | `String` ou `null` | Mouse press / tecla Enter |
| `filtered-nodes` | Um array dos nós que são visíveis após a aplicação de um filtro de busca. Útil para depuração e para exibir o número de resultados filtrados. | `Array<Object>` | — |
