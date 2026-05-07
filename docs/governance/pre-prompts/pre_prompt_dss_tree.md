# Pré-prompt: DssTree

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
O componente `DssTree` é um componente interativo que permite a exibição hierárquica de dados. Portanto, sua Golden Reference é o `DssChip`.

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

| Propriedade/Evento Quasar (QTree) | Propriedade/Evento DSS (DssTree) | Observações |
| :-------------------------------- | :------------------------------- | :---------- |
| `nodes`                           | `items`                          | Renomeado para melhor semântica no DSS. |
| `node-key`                        | `item-key`                       | Chave única para cada item. |
| `label-key`                       | `label-key`                      | Chave para o texto exibido. |
| `children-key`                    | `children-key`                   | Chave para os filhos do item. |
| `selected`                        | `model-value`                    | Renomeado para seguir padrão `v-model` do Vue. |
| `expanded`                        | `expanded-items`                 | Array de chaves de itens expandidos. |
| `@update:selected`                | `@update:model-value`            | Evento de atualização da seleção. |
| `@update:expanded`                | `@update:expanded-items`         | Evento de atualização dos itens expandidos. |
| `accordion`                       | `accordion`                      | Mantém o mesmo nome. |
| `no-connectors`                   | `hide-connectors`                | Renomeado para clareza. |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssTree` deve utilizar exclusivamente os tokens numéricos/padrão do DSS para espaçamento, raio, duração e cores de superfície. NENHUM token semântico customizado deve ser inventado.

### Exemplos de uso de tokens:
- **Espaçamento entre itens:** `--dss-spacing-4`
- **Raio das bordas (se aplicável):** `--dss-radius-md`
- **Cor de fundo de itens selecionados/hover:** `--dss-surface-default`
- **Duração de transições (expansão/colapso):** `--dss-duration-250`

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
- **Navegação por teclado:** Deve ser totalmente navegável usando as teclas de seta (cima, baixo, esquerda, direita) para expandir/colapsar nós e selecionar itens.
- **Leitores de tela:** Deve fornecer informações claras sobre o estado de cada nó (expandido/colapsado) e a hierarquia dos itens usando atributos ARIA (`aria-expanded`, `aria-level`, `aria-setsize`, `aria-posinset`).
- **Foco:** O foco deve ser gerenciado de forma lógica, permitindo que o usuário saiba qual item está ativo.

### Estados
- **Padrão:** Estado inicial do componente, com nós colapsados ou expandidos conforme configuração inicial.
- **Hover:** Feedback visual ao passar o mouse sobre um item.
- **Focado:** Feedback visual quando um item está em foco (navegação por teclado).
- **Selecionado:** Feedback visual claro para itens selecionados.
- **Expandido/Colapsado:** Indicadores visuais para o estado de expansão de um nó.
- **Desabilitado:** Estado onde o item não pode ser interagido.
- **Carregando:** Indicador visual quando os filhos de um nó estão sendo carregados (lazy loading).

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

### Composite Logic
- **Seleção de múltiplos itens:** Demonstração de como o `DssTree` lida com a seleção de vários nós simultaneamente.
- **Carregamento assíncrono de nós:** Exemplo de como carregar os filhos de um nó sob demanda (lazy loading) para otimizar a performance.
- **Integração com `DssInput`:** Exemplo de como um `DssInput` pode ser usado para filtrar os itens da árvore (embora o filtro não seja nativo do `DssTree`, a integração pode ser demonstrada).

### Estados a Expor
- **`model-value`:** O array de chaves dos itens atualmente selecionados.
- **`expanded-items`:** O array de chaves dos nós atualmente expandidos.
- **`is-loading`:** Um booleano indicando se o componente está carregando dados assincronamente.