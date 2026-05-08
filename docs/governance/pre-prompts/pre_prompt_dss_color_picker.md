# Pré-prompt: DssColorPicker

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
DssChip (componente interativo)

### Golden Context
O DssColorPicker é um componente de seleção de cor, parte integrante do grupo de Formulários e Inputs. 

Ele permite ao usuário escolher uma cor através de uma interface visual interativa. 

Este componente é essencial para interfaces que requerem personalização de temas, seleção de categorias por cor, ou qualquer outra funcionalidade onde a entrada de cor seja necessária de forma visual e intuitiva. 

O componente deve ser projetado para ser facilmente integrado em formulários complexos, modais de configuração e painéis de controle, oferecendo uma experiência de usuário fluida e consistente.

### Justificativa
A principal justificativa para a criação do DssColorPicker é padronizar a experiência de seleção de cores em todas as aplicações do Design System. 

Isso garante consistência visual, funcionalidade robusta e acessibilidade em todo o ecossistema. 

O DssColorPicker deve ser projetado para ser intuitivo e flexível, atendendo a diferentes casos de uso. 

Ele deve suportar desde a seleção de cores da marca (como hub, water e waste) até a personalização avançada com paletas customizadas. 

A padronização evita a proliferação de seletores de cor de terceiros, que frequentemente apresentam comportamentos e visuais inconsistentes, prejudicando a experiência do usuário e a manutenibilidade do código. 

Além disso, centralizar a lógica de seleção de cores em um único componente facilita a aplicação de atualizações de design e correções de bugs em toda a plataforma.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos
A implementação de um seletor de cores apresenta vários riscos arquiteturais que devem ser cuidadosamente gerenciados. 

A complexidade de formatos é um desafio significativo, pois há dificuldade em gerenciar e converter entre diferentes formatos de cor (HEX, RGB, HSL, RGBA) de forma consistente. 

Essa complexidade pode causar bugs na persistência de dados e na renderização visual se as conversões não forem precisas. 

A performance também é uma preocupação primordial, podendo ocorrer lentidão na renderização ou interação com paletas de cores muito grandes ou complexas, especialmente em dispositivos móveis ou com recursos limitados. 

A manipulação intensiva do DOM durante a seleção de cores no espectro pode causar gargalos de desempenho.

A acessibilidade é outro risco crítico; a falha em atender aos padrões WCAG para contraste, navegação por teclado e leitores de tela pode excluir usuários com deficiências visuais ou motoras. 

O componente deve ser utilizável por todos, independentemente de suas capacidades. 

Além disso, a customização excessiva pode levar a dificuldades em permitir alterações de paleta e interface sem quebrar a consistência do DSS, resultando em implementações fragmentadas e difíceis de manter. 

Por fim, a dependência de terceiros, como o forte acoplamento com a implementação do Quasar, pode dificultar futuras migrações ou substituições do framework base, criando um débito técnico a longo prazo.

### Gates
Para mitigar esses riscos, vários gates rigorosos devem ser estabelecidos antes da liberação do componente. 

A validação de formato deve ser exaustiva para todos os formatos de cor suportados, garantindo que apenas valores válidos sejam emitidos e processados. 

Testes unitários devem cobrir todas as conversões de formato possíveis. 

Testes de performance automatizados são necessários para garantir que o componente mantenha alta performance com diversas configurações de paleta, limitando o número máximo de cores renderizadas simultaneamente, se necessário, e otimizando os event listeners durante a interação de arrastar.

Uma auditoria completa de acessibilidade (WCAG 2.1 AA) é obrigatória para garantir conformidade, incluindo testes práticos com leitores de tela populares como NVDA, JAWS e VoiceOver. 

A navegação por teclado deve ser fluida e lógica. 

A API do componente deve ser clara e extensível, permitindo customização controlada (por exemplo, apenas paletas pré-aprovadas) sem comprometer a integridade do DSS. 

O encapsulamento deve ser garantido, assegurando que a lógica interna do Quasar seja abstraída, expondo apenas a API do DSS e evitando o vazamento de propriedades específicas do framework subjacente. 

Isso garante que o componente possa ser atualizado ou substituído no futuro com impacto mínimo nos consumidores.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

A tabela abaixo detalha o mapeamento das propriedades e eventos do componente base do Quasar para a interface pública do DssColorPicker. Este mapeamento garante que a API exposta seja consistente com os padrões do DSS, ocultando a complexidade subjacente.

| Propriedade/Evento Quasar (QColorPicker) | Propriedade/Evento DSS (DssColorPicker) | Descrição                                                                 |
| :--------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------ |
| `v-model`                                | `v-model` ou `modelValue`               | Valor da cor selecionada (HEX, RGB, HSL, RGBA).                           |
| `@update:modelValue`                     | `@update:modelValue`                    | Evento emitido quando o valor da cor é alterado.                         |
| `disable`                                | `disabled`                              | Desabilita o componente, impedindo interação.                             |
| `readonly`                               | `readonly`                              | Torna o componente somente leitura, impedindo alterações.                 |
| `no-header`                              | `hideHeader`                            | Oculta o cabeçalho do seletor de cores.                                   |
| `no-footer`                              | `hideFooter`                            | Oculta o rodapé do seletor de cores.                                      |
| `default-value`                          | `defaultValue`                          | Valor inicial da cor quando o componente é montado.                       |
| `format`                                 | `colorFormat`                           | Formato de exibição e retorno da cor (e.g., 'hex', 'rgb', 'hsl', 'hexa'). |
| `palette`                                | `colorPalette`                          | Array de cores pré-definidas para a paleta.                               |
| `square`                                 | `square`                                | Define se o seletor de cores deve ter bordas quadradas.                   |
| `flat`                                   | `flat`                                  | Remove sombras e bordas para um estilo mais plano.                        |
| `dark`                                   | `dark`                                  | Força o modo escuro no componente, independente do tema global.           |
| `bordered`                               | `bordered`                              | Adiciona uma borda ao redor do componente.                                |
| `elevation`                              | `elevation`                             | Define o nível de sombra (elevação) do componente.                        |

## 4. GOVERNANÇA DE TOKENS E CSS

O DssColorPicker deve utilizar exclusivamente tokens de design do DSS para espaçamento, raio de borda, cores de superfície, tipografia e durações de transição. 

Não serão permitidos valores hardcoded ou tokens semânticos não existentes no DSS. 

Esta governança é crucial para manter a consistência visual, facilitar atualizações globais de tema e garantir que o componente se adapte perfeitamente aos modos claro e escuro.

### Exemplos de Tokens a Serem Utilizados
Para espaçamento, devem ser utilizados tokens como `--dss-spacing-4` para padding interno e `--dss-spacing-8` para margens entre elementos internos. 

O raio de borda deve ser definido por `--dss-radius-md` para cantos arredondados do componente ou de seus elementos internos. 

As cores de superfície devem empregar `--dss-surface-default` para o fundo principal e `--dss-surface-variant` para elementos secundários, como o fundo do cabeçalho ou rodapé.

As cores de borda devem utilizar `--dss-border-default` para delimitar o componente e suas seções internas. 

Para cores de texto, os tokens apropriados são `--dss-text-hub` para o texto principal e `--dss-text-subtle` para textos secundários ou de apoio. 

As cores de ação, utilizadas em botões internos ou indicadores de seleção, devem ser mapeadas para `--dss-action-hub` e `--dss-action-hub-surface`. 

A duração de transição para animações de hover, focus ou mudanças de estado deve usar `--dss-duration-250` para garantir uma resposta visual suave. 

As sombras para elevação do componente, especialmente quando usado em popovers, devem ser definidas por `--dss-shadow-1` ou superior, dependendo do contexto. 

Para o estado de foco, deve-se utilizar `outline: 2px solid white`, garantindo alta visibilidade em temas escuros ou sobre fundos coloridos.

### Proibido
É estritamente proibido o uso de `--dss-spacing-4`, pois este sufixo semântico não é permitido para padding; em seu lugar, deve-se usar `--dss-spacing-4`. 

O token `--dss-text-subtle` não deve ser utilizado, sendo substituído por `--dss-text-subtle` para manter a consistência com a nova nomenclatura. 

O uso de `outline: 2px solid white` é proibido, devendo-se adotar `outline: 2px solid white` para uma indicação de foco mais universal e acessível.

Os tokens `--dss-action-hub` e `--dss-action-hub-surface` são considerados fantasmas e devem ser substituídos por `--dss-action-hub` e `--dss-action-hub-surface`, respectivamente, alinhando-se com a estratégia de cores da marca. 

O token `--dss-duration-base` não é permitido, pois o sufixo semântico é inválido para duração; deve-se usar valores numéricos específicos como `--dss-duration-250`. 

Além disso, é terminantemente proibido o uso de valores em `px`, `rem`, `em` diretamente no CSS do componente sem que sejam derivados de tokens oficiais do DSS, garantindo que o componente responda corretamente a mudanças globais de escala e tipografia.

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
A acessibilidade é um pilar fundamental do DssColorPicker, garantindo que o componente seja utilizável por todos. 

O componente deve ser totalmente navegável via teclado, permitindo o uso das teclas Tab e Shift+Tab para mover o foco entre os controles, e setas direcionais para a seleção de cores na paleta ou no espectro visual. 

O uso adequado de rótulos ARIA, como `aria-label`, `aria-labelledby` e `aria-describedby`, é obrigatório para fornecer contexto adequado a leitores de tela, especialmente para os controles individuais de matiz, saturação e luminosidade, que podem não ter rótulos visuais explícitos.

O contraste de cores deve ser rigorosamente verificado para garantir que a relação entre o texto e o fundo, bem como entre os elementos interativos e seus arredores, atenda aos requisitos da diretriz WCAG 2.1 AA. 

A indicação de foco deve ser claramente visível e consistente com o restante do DSS, utilizando `outline: 2px solid white` quando apropriado para garantir visibilidade em diferentes fundos, incluindo fundos escuros ou altamente saturados. 

Mensagens de erro devem ser semanticamente associadas ao campo correspondente e anunciadas proativamente por leitores de tela através de atributos como `aria-live` ou `aria-errormessage`, garantindo que os usuários sejam informados imediatamente sobre entradas inválidas.

### Estados
O componente deve suportar e renderizar visualmente os seguintes estados, fornecendo feedback claro ao usuário sobre a condição atual do controle:

O estado **Default** representa o componente em sua condição padrão, aguardando interação do usuário, com cores e bordas neutras. 

O estado **Hover** é ativado quando o cursor do mouse está posicionado sobre o componente ou sobre elementos interativos internos, como as amostras de cor na paleta, geralmente indicado por uma leve mudança na cor de fundo ou elevação. 

O estado **Focus** ocorre quando o componente ou um de seus elementos internos recebe foco, seja via navegação por teclado ou clique do mouse, destacado pelo anel de foco padronizado.

O estado **Active** é acionado quando o componente está sendo ativado, por exemplo, durante um clique em um botão interno ou enquanto o usuário arrasta o seletor no espectro de cores, fornecendo feedback visual imediato da ação. 

O estado **Disabled** indica que o componente não pode ser interagido, devendo apresentar uma aparência visualmente desabilitada, tipicamente com opacidade reduzida, cores acinzentadas e cursor indicando ação não permitida. 

O estado **Readonly** exibe um valor, mas não permite alterações; diferentemente do estado disabled, o valor ainda pode ser selecionado e copiado pelo usuário, e o componente mantém um contraste visual adequado para leitura. 

O estado **Error** indica que o valor selecionado é inválido ou que ocorreu um problema, fornecendo feedback visual claro, como bordas vermelhas e ícones de alerta, e, opcionalmente, uma mensagem de erro descritiva. 

O estado **Success** indica que o valor selecionado é válido, fornecendo feedback visual positivo, como bordas verdes e ícones de confirmação, útil em cenários de validação em tempo real.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas
O DssColorPicker possui uma dependência interna principal: ele será construído sobre o componente `QColorPicker` do framework Quasar. 

A implementação deve focar em abstrair a API do Quasar, expondo apenas a interface padronizada do DSS para os consumidores do componente. 

Esta abstração é vital para garantir que futuras atualizações do Quasar ou até mesmo a substituição do framework base não quebrem as aplicações que dependem do DssColorPicker.

### Composição (Exemplos)
O DssColorPicker foi projetado para ser composto com outros componentes do DSS para criar experiências mais ricas e complexas. 

Ele pode ser acoplado a um **DssInput**, que pode ser utilizado para exibir o valor da cor selecionada em formatos como HEX ou RGB, permitindo também a entrada manual pelo usuário. 

O DssColorPicker pode atuar como um addon para este input, abrindo em um popover quando o input recebe foco ou quando um ícone adjacente é clicado.

Componentes como o **DssButton** podem ser compostos dentro do DssColorPicker ou em um contexto adjacente para fornecer ações como "Limpar", "Confirmar" ou "Cancelar" a seleção de cor. 

Para otimizar o espaço na tela principal e fornecer uma experiência de seleção mais controlada, o DssColorPicker pode ser encapsulado dentro de um **DssPopover** ou **DssDialog**. 

Além disso, o **DssIcon** deve ser utilizado para renderizar ícones internos necessários, como o ícone de conta-gotas para seleção de cor na tela ou o ícone de limpar a seleção atual, garantindo que a iconografia seja consistente com o restante do sistema.

## 7. EXCEÇÕES PREVISTAS

O componente deve ser altamente resiliente e lidar graciosamente com diversas exceções previstas, garantindo que a aplicação não quebre devido a entradas inesperadas ou condições adversas. 

No caso de uma **Cor Inválida**, como a tentativa de definir uma cor com um formato ou valor não reconhecido (por exemplo, `#ZZZZZZ` ou `rgb(300, 0, 0)`), o componente deve interceptar o erro e reverter para o último valor válido conhecido, adotar um valor padrão seguro (como `#000000`), ou exibir um estado de erro claro e informativo para o usuário, impedindo a propagação do valor inválido.

Se a propriedade `colorPalette` for fornecida como uma **Paleta Vazia** (um array sem elementos ou nulo), o componente deve adaptar sua interface de forma inteligente, exibindo o seletor completo (espectro de cores) sem a seção de paleta pré-definida, ou apresentar um estado de fallback adequado que não quebre o layout, como uma mensagem indicando que nenhuma paleta está disponível. 

Em situações de **Conflito de Formato**, onde o `colorFormat` definido não pode representar o `modelValue` atual sem perda de dados (por exemplo, tentar exibir uma cor com transparência `rgba` em um formato `rgb` estrito), o componente deve converter o valor da melhor forma possível, como descartando o canal alfa, ou emitir um aviso no console para alertar o desenvolvedor sobre a possível perda de informação.

Por fim, deve-se considerar o **Desempenho em Dispositivos Antigos**. 

Devido à complexidade inerente da interface de seleção de cores, que envolve a renderização de gradientes complexos e a manipulação intensiva do DOM durante a interação de arrastar, podem ocorrer problemas de desempenho em navegadores ou dispositivos com recursos limitados. 

Nesses cenários, a implementação deve prever mecanismos de degradação graciosa, como a desabilitação de animações complexas, a redução da taxa de atualização durante o arrasto (throttling), ou a simplificação da renderização do espectro de cores para garantir uma experiência utilizável.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios
O playground de documentação deve expor um conjunto abrangente de controles para permitir o teste exaustivo do DssColorPicker em todas as suas configurações possíveis. 

Os controles obrigatórios incluem o `v-model`, que permite definir e observar a cor selecionada, suportando entrada manual para testar a reatividade bidirecional e a validação de formato em tempo real. 

Controles booleanos como `disabled` e `readonly` devem ser fornecidos via checkboxes para alternar os respectivos estados do componente e verificar se a aparência e o comportamento refletem corretamente essas condições.

Um dropdown para `colorFormat` deve permitir a seleção entre as opções suportadas: 'hex', 'rgb', 'hsl', 'hexa', 'rgba' e 'hsla', permitindo testar a conversão e formatação da cor de saída. 

Um campo de texto ou textarea para `colorPalette` deve permitir a inserção dinâmica de um array de cores (por exemplo, `['#FF0000', '#00FF00', '#0000FF']`) ou a seleção de paletas temáticas da marca, como hub, water e waste, para testar a renderização da paleta customizada. 

Checkboxes adicionais devem controlar propriedades visuais estruturais como `hideHeader`, `hideFooter`, `square`, `flat` e `bordered`, permitindo visualizar todas as variações de layout. 

Um slider para `elevation` (variando de 0 a 24) deve estar disponível para testar os diferentes níveis de sombra aplicáveis ao componente, garantindo que a elevação funcione corretamente em diferentes contextos.

### Composite Logic
O playground deve demonstrar a lógica composta do componente através de exemplos práticos e concretos, ilustrando como o DssColorPicker pode ser integrado em cenários do mundo real. 

Um exemplo de **Exibição de Formatos** deve mostrar como o `modelValue` pode ser exibido simultaneamente em diferentes formatos (HEX, RGB, HSL) utilizando instâncias separadas de DssInputs fora do componente principal, reagindo em tempo real às mudanças efetuadas no DssColorPicker. 

Isso demonstra a capacidade do componente de atuar como a fonte da verdade para a cor selecionada.

Uma demonstração de **Validação** deve ilustrar a integração do DssColorPicker com um sistema de validação de formulário robusto, como o VeeValidate. 

Este exemplo deve mostrar claramente os estados de erro e sucesso, por exemplo, quando uma cor específica é exigida (campo obrigatório) ou quando certas cores são proibidas pelas regras de negócio (ex: não permitir cores muito claras que prejudiquem o contraste). 

Um exemplo de **Paletas Dinâmicas da Marca** deve demonstrar como carregar paletas de cores dinamicamente baseadas no tema global selecionado na aplicação. 

Isso inclui carregar os tons específicos de hub, water e waste, permitindo que o usuário selecione cores apenas a partir dessas opções pré-aprovadas, garantindo a consistência da marca e restringindo a liberdade excessiva que poderia levar a designs inconsistentes.

### Estados a Expor
A tabela a seguir lista os estados internos e propriedades que devem ser expostos e visíveis no playground para facilitar o debug, a compreensão do comportamento do componente e a verificação de que todas as propriedades estão funcionando conforme o esperado.

| Estado | Descrição | Exemplo de Valor |
| :--- | :--- | :--- |
| **Cor Selecionada** | O valor atual refletido pelo `v-model`, formatado de acordo com a propriedade `colorFormat`. | `#3498db` |
| **Estado de Habilitação** | Indica se o componente está atualmente desabilitado para interação, refletindo a propriedade `disabled`. | `false` |
| **Estado de Somente Leitura** | Indica se o componente está em modo somente leitura, refletindo a propriedade `readonly`. | `false` |
| **Formato Atual** | O formato de cor atualmente selecionado para exibição e emissão, refletindo a propriedade `colorFormat`. | `hex` |
| **Paleta Ativa** | O array de cores que compõe a paleta atualmente em uso, refletindo a propriedade `colorPalette`. | `['#1abc9c', '#2ecc71', '#3498db']` |
| **Modo de Exibição** | Indica a visibilidade atual do cabeçalho e do rodapé do componente, refletindo `hideHeader` e `hideFooter`. | `header: true, footer: true` |
| **Estilo Visual** | Indica as configurações de estilo aplicadas, como bordas quadradas ou estilo plano, refletindo `square` e `flat`. | `square: false, flat: false` |
| **Elevação Atual** | O nível de sombra atual aplicado ao componente, refletindo a propriedade `elevation`. | `1` |
