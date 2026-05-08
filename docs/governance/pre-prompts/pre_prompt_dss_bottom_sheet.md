# Pré-prompt: DssBottomSheet

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
O `DssBottomSheet` é um componente interativo, portanto, sua Golden Reference é o `DssChip`.

### Golden Context
O `DssBottomSheet` é um componente de interface do usuário que apresenta um painel deslizante da parte inferior da tela, contendo conteúdo contextual ou ações relacionadas à tarefa atual. Ele é ideal para exibir informações adicionais, formulários curtos, listas de opções ou menus de ação sem navegar para uma nova tela. Sua implementação deve ser baseada no comportamento e na API do `QBottomSheet` do Quasar, adaptando-o para a linguagem visual e funcional do DSS. Este componente é fundamental para aprimorar a experiência do usuário em aplicações que necessitam de interações contextuais e eficientes, minimizando a necessidade de navegação entre páginas e mantendo o usuário no fluxo principal da aplicação.

### Justificativa
Este componente é essencial para fornecer uma experiência de usuário fluida e não intrusiva em dispositivos móveis e desktops. Ele permite que os usuários interajam com conteúdo secundário ou realizem ações rápidas sem perder o contexto da tela principal, melhorando a usabilidade e a eficiência da navegação. A sua adoção no Design System Sansys visa padronizar a apresentação de informações complementares e ações rápidas, garantindo uma interface consistente e de alta qualidade em todas as plataformas. A flexibilidade do `DssBottomSheet` o torna uma solução versátil para diversos casos de uso, desde a exibição de filtros e opções de ordenação até formulários de feedback e confirmações de ações.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
*   **Performance**: Animações e transições suaves, especialmente em dispositivos de baixo desempenho. Deve-se garantir que o componente não cause jank ou lentidão na interface, mesmo em dispositivos com recursos limitados. A otimização de CSS e JavaScript é crucial, incluindo o uso de `will-change` e `transform` para animações, e a minimização de repaints e reflows. Testes de performance devem ser realizados em diferentes navegadores e dispositivos para garantir uma experiência consistente.
*   **Acessibilidade**: Garantir que o componente seja totalmente acessível via teclado e leitores de tela, com foco na gestão de foco e semântica ARIA. Isso inclui a correta marcação de elementos, a ordem de tabulação lógica, a descrição adequada para tecnologias assistivas e a conformidade com as diretrizes WCAG 2.1. O foco deve ser gerenciado de forma a prender o usuário dentro do `BottomSheet` quando ele estiver aberto e retorná-lo ao elemento que o ativou após o fechamento.
*   **Integração**: Compatibilidade com diferentes layouts e componentes do DSS, evitando conflitos de z-index ou sobreposições indesejadas. O `BottomSheet` deve se comportar de forma previsível em qualquer contexto de layout, sem interferir com outros elementos da página. A sua integração com sistemas de roteamento e gerenciamento de estado da aplicação deve ser robusta e bem documentada.
*   **Responsividade**: Comportamento adequado em diferentes tamanhos de tela e orientações. O componente deve se adaptar fluidamente de dispositivos móveis a desktops, ajustando sua altura, largura e posicionamento conforme necessário. Em telas menores, pode ocupar a largura total, enquanto em telas maiores, pode ter uma largura máxima definida para melhor legibilidade.

### Gates
*   **Revisão de Design**: Validação do design e comportamento com a equipe de design do DSS. Todos os aspectos visuais e interativos devem ser aprovados pelos designers para garantir a consistência com o Design System. Isso inclui a revisão de mockups, protótipos e a implementação final.
*   **Auditoria de Acessibilidade**: Testes completos de acessibilidade para garantir conformidade com WCAG. Ferramentas automatizadas (como Lighthouse, Axe) e testes manuais com leitores de tela (como NVDA, VoiceOver) devem ser realizados para identificar e corrigir quaisquer barreiras de acessibilidade. Um relatório de acessibilidade detalhado deve ser gerado.
*   **Testes de Performance**: Avaliação do desempenho da animação e renderização em diferentes dispositivos. Métricas como FPS (Frames Per Second), tempo de carregamento e tempo de resposta devem ser monitoradas para garantir uma experiência de usuário suave. Ferramentas de perfil de desempenho do navegador devem ser utilizadas.
*   **Testes de Integração**: Verificação da interação com outros componentes do DSS. O `DssBottomSheet` deve ser testado em conjunto com `DssButton`, `DssList`, `DssForm`, entre outros, para assegurar que não haja conflitos ou comportamentos inesperados. Testes de unidade e integração automatizados são essenciais.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssBottomSheet` deve encapsular e estender as funcionalidades do `QBottomSheet` do Quasar, fornecendo uma API simplificada e alinhada com os padrões do DSS. A abstração da API do Quasar é crucial para manter a independência do DSS em relação a frameworks de terceiros, permitindo futuras migrações ou atualizações sem impactar os consumidores do componente. Abaixo estão os mapeamentos e considerações detalhadas para cada aspecto da API:

*   **Props**: Mapear props relevantes como `model-value` (Boolean, para controlar a visibilidade do `BottomSheet`, suportando `v-model`), `persistent` (Boolean, impede o fechamento ao clicar fora ou pressionar Esc), `maximized` (Boolean, ocupa a altura total da tela), `seamless` (Boolean, remove bordas e sombras para uma aparência mais integrada), `no-backdrop-dismiss` (Boolean, desabilita o fechamento ao clicar no backdrop), `no-esc-dismiss` (Boolean, desabilita o fechamento ao pressionar Esc), `no-route-dismiss` (Boolean, desabilita o fechamento ao mudar de rota, útil em SPAs), `square` (Boolean, bordas quadradas em vez de arredondadas), `dark` (Boolean, aplica tema escuro ao componente), `transition-show` (String, nome da transição de entrada personalizada, e.g., `slide-up`), `transition-hide` (String, nome da transição de saída personalizada, e.g., `slide-down`). Além disso, o `DssBottomSheet` deve introduzir uma prop `brand` (String, opcional) que aceita os valores `hub`, `water` e `waste` para definir a cor principal do componente, substituindo o conceito de `hub`, `water` e `waste` e alinhando-se à paleta de cores do DSS.
*   **Slots**: Suportar slots padrão como `default` para o conteúdo principal do `BottomSheet`, permitindo que qualquer conteúdo HTML ou componente Vue seja inserido. Se necessário, slots adicionais como `header` ou `footer` podem ser implementados para permitir a personalização dessas seções com outros componentes do DSS, como `DssToolbar` para o cabeçalho (com título e botões de ação) ou `DssButton` para ações no rodapé (como 
botões de confirmação e cancelamento). A flexibilidade dos slots permite que o `DssBottomSheet` seja altamente configurável e reutilizável em diferentes contextos.
*   **Eventos**: Expor eventos como `show` (disparado após a abertura do componente, útil para carregar dados ou iniciar animações), `hide` (disparado após o fechamento, para limpar estados ou liberar recursos), `before-show` (disparado antes da abertura, permitindo a prevenção da abertura com `event.preventDefault()`) e `before-hide` (disparado antes do fechamento, para confirmar ações ou salvar dados). Esses eventos são cruciais para a integração com lógicas de aplicação e para a execução de efeitos colaterais, oferecendo pontos de extensão para desenvolvedores.
*   **Métodos**: Considerar a exposição de métodos programáticos como `show()` e `hide()` para controlar a visibilidade do `BottomSheet` diretamente via JavaScript, sem depender exclusivamente da prop `v-model`. Isso oferece maior flexibilidade para cenários de uso avançados, como a abertura programática do `BottomSheet` em resposta a eventos externos ou a partir de outras partes da aplicação. A API de métodos deve ser simples e intuitiva.

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssBottomSheet` deve utilizar exclusivamente os tokens de design numéricos e padrão do DSS para estilização, garantindo a consistência visual e a manutenibilidade do Design System. É estritamente proibido inventar tokens com sufixos semânticos não existentes ou utilizar valores hardcoded. A governança de tokens é fundamental para a escalabilidade e a padronização, assegurando que todas as instâncias do componente sigam as diretrizes visuais estabelecidas. A aderência a esses tokens facilita a criação de temas e a manutenção do Design System como um todo.

### Exemplos de Tokens Permitidos:
*   **Espaçamento**: `--dss-spacing-4` (16px), `--dss-spacing-8` (32px), `--dss-spacing-16` (64px). A gama completa de tokens de espaçamento vai de `--dss-spacing-1` a `--dss-spacing-96`, seguindo uma escala de 4px. Esses tokens devem ser usados para definir margens, paddings e gaps entre elementos, garantindo um ritmo vertical e horizontal consistente.
*   **Raio de Borda**: `--dss-radius-sm` (4px), `--dss-radius-md` (8px), `--dss-radius-lg` (16px), `--dss-radius-full` (50%). Apenas esses quatro tokens de raio de borda são permitidos para garantir a uniformidade visual e a identidade da marca. O uso de `border-radius` customizados é proibido.
*   **Cores de Superfície**: `--dss-surface-default` (cor de fundo padrão para elementos neutros), `--dss-surface-variant` (cor de fundo alternativa para seções ou cards), `--dss-surface-inverse` (cor de fundo para contraste em temas escuros ou elementos invertidos). Esses tokens definem as cores de fundo para diferentes contextos de interface, garantindo a legibilidade e a hierarquia visual.
*   **Duração de Transição**: `--dss-duration-150` (150ms), `--dss-duration-200` (200ms), `--dss-duration-250` (250ms), `--dss-duration-300` (300ms). Esses tokens controlam a velocidade das animações e transições do componente, proporcionando uma experiência de usuário suave e previsível. Devem ser aplicados a propriedades como `opacity`, `transform` e `background-color`.
*   **Sombras**: `--dss-shadow-1` (sombra leve para elevação sutil), `--dss-shadow-2` (sombra média para elevação mais pronunciada). Utilizar esses tokens para aplicar profundidade e hierarquia visual aos elementos, indicando interatividade ou importância. As sombras devem ser consistentes em todo o Design System.
*   **Cores de Ação**: `--dss-action-hub` (cor principal para ações primárias e elementos de destaque), `--dss-action-water` (cor secundária para ações menos proeminentes ou estados de hover), `--dss-action-waste` (cor de destaque para ações terciárias ou elementos de feedback). Esses tokens substituem as antigas nomenclaturas de `hub`, `water` e `waste`, alinhando-se à nova terminologia de brand do DSS.
*   **Superfícies de Ação**: `--dss-action-hub-surface` (superfície para ações hub, geralmente um fundo mais claro ou mais escuro da cor `hub`), `--dss-action-water-surface` (superfície para ações water), `--dss-action-waste-surface` (superfície para ações waste). Utilizados para definir as cores de fundo de elementos interativos, como botões e links, garantindo contraste e legibilidade.
*   **Texto**: `--dss-text-subtle` (cor de texto para informações secundárias ou menos proeminentes, como legendas ou textos de ajuda). Este token substitui o antigo `--dss-text-subtle`, promovendo uma linguagem mais consistente e semântica.

### Tokens Proibidos (Exemplos) e Suas Correções:
*   `--dss-spacing-4` (sufixo semântico não existente para espaçamento; **CORREÇÃO**: usar `--dss-spacing-4` ou outro token de espaçamento numérico, como `--dss-spacing-8` para um padding maior, ou `--dss-spacing-2` para um menor. A escolha deve ser baseada na escala de espaçamento definida no DSS).
*   `--dss-duration-base` (sufixo semântico não existente para duração; **CORREÇÃO**: usar `--dss-duration-250` ou outro token de duração numérico, como `--dss-duration-150` para transições mais rápidas ou `--dss-duration-300` para mais lentas).
*   `--dss-text-subtle` (**CORREÇÃO**: usar `--dss-text-subtle`. Este token é mais descritivo e alinhado com a semântica de cores do DSS).
*   `outline: 2px solid white` (**CORREÇÃO**: remover ou usar `outline: 2px solid white` para o anel de foco. O anel de foco deve ser visível e contrastante, mas não deve depender de uma cor específica que possa não se adaptar a todos os temas).
*   `--dss-action-hub` (**CORREÇÃO**: usar `--dss-action-hub`. A nomenclatura `hub` é genérica e foi substituída por `hub` para refletir a identidade de marca do DSS).
*   `--dss-action-hub-surface` (**CORREÇÃO**: usar `--dss-action-hub-surface`. Similar ao `--dss-action-hub`, o `--dss-action-hub-surface` foi substituído por uma nomenclatura mais específica e alinhada com a marca).

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
*   **Foco**: Gerenciamento de foco robusto, garantindo que o foco seja movido para o `BottomSheet` ao abrir e retorne ao elemento que o ativou ao fechar. A navegação por teclado deve ser intuitiva e sem armadilhas de foco, permitindo que usuários que dependem do teclado possam interagir plenamente com o componente. O uso de `tabindex` e `focus()` deve ser cuidadosamente implementado.
*   **Teclado**: Navegação completa via teclado (Tab para avançar, Shift+Tab para retroceder, Esc para fechar). Todos os elementos interativos dentro do `BottomSheet` devem ser acessíveis via teclado, e a ordem de tabulação deve seguir a ordem visual e lógica do conteúdo. A tecla `Esc` deve sempre fechar o `BottomSheet`, a menos que a prop `no-esc-dismiss` esteja ativada.
*   **ARIA**: Uso de atributos ARIA apropriados (e.g., `role="dialog"` para indicar que é uma caixa de diálogo, `aria-modal="true"` para indicar que o conteúdo por trás está desativado e inacessível, `aria-labelledby` e `aria-describedby` para associar rótulos e descrições textuais ao componente). Isso garante que leitores de tela possam interpretar corretamente o componente e fornecer informações contextuais aos usuários com deficiência visual.
*   **Leitores de Tela**: Conteúdo e ações devem ser corretamente anunciados por leitores de tela. A semântica HTML deve ser utilizada de forma eficaz para fornecer uma experiência acessível, e o texto alternativo para imagens e ícones deve ser fornecido quando apropriado. Testes com diferentes leitores de tela são essenciais para validar a experiência.

### Estados
*   **Fechado (Closed)**: O `BottomSheet` não está visível. Este é o estado inicial do componente, onde ele não ocupa espaço na tela e não é interativo. A transição para o estado aberto deve ser suave e animada.
*   **Aberto (Open)**: O `BottomSheet` está visível e interativo. Neste estado, o conteúdo do `BottomSheet` é apresentado ao usuário, e ele pode interagir com os elementos internos. O backdrop deve estar visível e, por padrão, permitir o fechamento ao clicar fora.
*   **Persistente (Persistent)**: O `BottomSheet` não pode ser fechado clicando fora dele ou pressionando Esc. Este estado é útil para situações onde a interação com o `BottomSheet` é obrigatória antes de prosseguir, como em formulários de confirmação crítica. Um botão de fechamento explícito deve ser fornecido.
*   **Maximizável (Maximized)**: O `BottomSheet` ocupa a altura total da tela. Este estado é ideal para exibir grandes quantidades de conteúdo ou formulários complexos em dispositivos móveis, garantindo que todo o conteúdo seja visível sem rolagem excessiva.
*   **Desabilitado (Disabled)**: O `BottomSheet` não pode ser aberto ou interagir. Neste estado, o componente está presente na DOM, mas não responde a eventos do usuário, indicando que não está disponível no momento. Visualmente, pode apresentar um estado esmaecido ou com um overlay para indicar sua inatividade.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas do DSS
*   `DssButton`: Para ações interativas dentro do `BottomSheet`, como botões de confirmação ou cancelamento. O `DssButton` deve herdar as propriedades de estilo e comportamento do Design System.
*   `DssIcon`: Para ícones de fechamento, informativos ou decorativos dentro do `BottomSheet`. Os ícones devem ser consistentes com a biblioteca de ícones do DSS.
*   `DssSeparator`: Para separar visualmente seções de conteúdo dentro do `BottomSheet`, melhorando a legibilidade e a organização. O `DssSeparator` deve seguir as diretrizes de espaçamento e cor do DSS.
*   `DssList` / `DssItem`: Para exibir listas de opções, menus ou itens de navegação dentro do `BottomSheet`. Esses componentes devem ser utilizados para criar estruturas de lista acessíveis e estilizadas de acordo com o DSS.

### Composição
O `DssBottomSheet` pode ser composto com outros componentes do DSS para criar experiências mais ricas e complexas, como:
*   `DssCard` dentro do `BottomSheet` para agrupar conteúdo relacionado, oferecendo uma estrutura visual clara e um senso de hierarquia. Isso é útil para organizar informações em blocos distintos.
*   `DssForm` para formulários rápidos de entrada de dados, permitindo que os usuários preencham informações sem sair da tela principal. A integração com `DssForm` garante que os campos de entrada e validações sigam os padrões do DSS.
*   `DssToolbar` para um cabeçalho fixo dentro do `BottomSheet`, que pode conter um título, botões de ação ou um botão de fechamento. O `DssToolbar` proporciona uma área de controle consistente na parte superior do `BottomSheet`.
*   **Combinação com `DssTabs`**: Para cenários onde o `BottomSheet` precisa apresentar conteúdo organizado em abas, o `DssTabs` pode ser integrado para permitir a navegação entre diferentes seções de informação.
*   **Uso com `DssAvatar` e `DssChip`**: Em casos de seleção de usuários ou tags, a combinação com `DssAvatar` e `DssChip` pode enriquecer a interface, tornando-a mais visual e interativa.

## 7. EXCEÇÕES PREVISTAS

*   **Conteúdo Dinâmico**: O `BottomSheet` deve ser capaz de lidar com conteúdo que muda dinamicamente após a abertura, ajustando sua altura conforme necessário. Isso é crucial para cenários onde o conteúdo é carregado assincronamente ou varia com base nas interações do usuário, como a exibição de resultados de pesquisa ou a atualização de um formulário. O componente deve recalcular sua altura e posição para acomodar o novo conteúdo de forma fluida.
*   **Aninhamento**: Evitar o aninhamento de múltiplos `BottomSheet`s ou modais para não prejudicar a experiência do usuário e a acessibilidade. O aninhamento excessivo pode levar a problemas de foco, sobreposição e confusão para o usuário, tornando a navegação e a interação difíceis. Se múltiplos níveis de interação forem necessários, considerar alternativas como navegação em tela cheia ou fluxos de várias etapas.
*   **Scroll Interno**: Quando o conteúdo excede a altura disponível, o scroll deve ser tratado internamente pelo `BottomSheet` sem afetar o scroll da página principal. Isso garante que a rolagem do conteúdo do `BottomSheet` não cause rolagem indesejada na página de fundo, mantendo o contexto do usuário. A área de scroll deve ser claramente indicada visualmente.
*   **Interações com Elementos Fixos**: O `BottomSheet` deve gerenciar corretamente as interações com elementos fixos na página (como headers ou footers globais), garantindo que não haja sobreposição ou quebra de layout. O `z-index` deve ser cuidadosamente controlado.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios
*   **`v-model` (Boolean)**: Para controlar a visibilidade do `BottomSheet`. Um toggle simples (e.g., `DssToggle` ou `DssCheckbox`) para abrir e fechar o componente, demonstrando seu estado básico.
*   **`persistent` (Boolean)**: Para alternar entre comportamento persistente e não persistente. Um checkbox para ativar/desativar a persistência, permitindo testar o fechamento por clique externo ou Esc.
*   **`maximized` (Boolean)**: Para alternar entre o estado normal e maximizado. Um checkbox para maximizar o `BottomSheet`, mostrando como ele se adapta à altura total da tela.
*   **`no-backdrop-dismiss` (Boolean)**: Para controlar o fechamento ao clicar no backdrop. Um checkbox para desabilitar o fechamento pelo backdrop, útil para cenários de confirmação.
*   **`no-esc-dismiss` (Boolean)**: Para controlar o fechamento ao pressionar a tecla Esc. Um checkbox para desabilitar o fechamento pela tecla Esc, complementando o controle de persistência.
*   **`square` (Boolean)**: Para alternar entre bordas arredondadas e quadradas. Um checkbox para alternar o estilo da borda, demonstrando a flexibilidade visual do componente.
*   **`brand` (String)**: Permite selecionar a variante de marca (`hub`, `water`, `waste`). Um seletor (dropdown, e.g., `DssSelect`) com as opções `hub`, `water`, `waste` para demonstrar as diferentes cores de marca aplicadas ao `BottomSheet`.
*   **`transition-show` (String)**: Um campo de texto ou seletor para escolher diferentes transições de entrada (e.g., `slide-up`, `fade`).
*   **`transition-hide` (String)**: Um campo de texto ou seletor para escolher diferentes transições de saída (e.g., `slide-down`, `fade`).

### Composite Logic
*   Demonstrar a abertura e fechamento do `BottomSheet` através de um `DssButton` com a variante `hub`. O botão deve estar fora do `BottomSheet` e controlá-lo, exibindo um texto como "Abrir BottomSheet".
*   Exibir diferentes tipos de conteúdo (texto simples, lista de itens, formulário) dentro do `BottomSheet`. Deve haver opções para alternar entre esses tipos de conteúdo para visualização, por exemplo, usando `DssTabs` ou `DssRadioGroup`.
*   Cenário de uso com `DssList` e `DssItem` para seleção de opções, utilizando cores de `water` ou `waste` para destacar itens específicos. Um exemplo de lista de seleção onde os itens selecionados podem ter uma cor de fundo ou texto diferente, e a seleção de um item pode fechar o `BottomSheet`.
*   Integração com um `DssForm` simples dentro do `BottomSheet`, demonstrando a submissão de dados e o fechamento do componente após a ação. O formulário pode conter `DssInput`, `DssCheckbox` e um `DssButton` de submissão.
*   Exemplo de `BottomSheet` com um `DssToolbar` fixo no topo, contendo um título e um `DssButton` de fechamento, e um `DssSeparator` abaixo do toolbar.

### Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Fechado | O `BottomSheet` não está visível, aguardando ser ativado. | Visual | `v-model="false"` |
| Aberto | O `BottomSheet` está visível e pronto para interação. | Visual | `v-model="true"` |
| Persistente | O `BottomSheet` permanece aberto mesmo com cliques externos ou tecla Esc. | Visual | `persistent="true"` |
| Maximizável | O `BottomSheet` ocupa a altura total da tela, ideal para conteúdo extenso. | Visual | `maximized="true"` |
| Variante Hub | O `BottomSheet` estilizado com a cor principal da marca (`hub`). | Visual | `brand="hub"` |
| Variante Water | O `BottomSheet` estilizado com a cor secundária da marca (`water`). | Visual | `brand="water"` |
| Variante Waste | O `BottomSheet` estilizado com a cor de destaque da marca (`waste`). | Visual | `brand="waste"` |
| Com Conteúdo Dinâmico | Demonstração de como o `BottomSheet` se ajusta a conteúdo carregado assincronamente. | Visual | `v-model="true"` com conteúdo que muda após um delay |
| Com Scroll Interno | O `BottomSheet` com conteúdo que excede a altura, exibindo barra de rolagem interna. | Visual | `v-model="true"` e conteúdo longo |

---
*Fim do documento.*

### Detalhamento da API de Props
Cada prop do `DssBottomSheet` é cuidadosamente projetada para oferecer controle granular sobre o comportamento e a aparência do componente. A prop `model-value` é a base para o controle de visibilidade, permitindo uma integração bidirecional com o estado da aplicação. As props `persistent`, `no-backdrop-dismiss` e `no-esc-dismiss` trabalham em conjunto para definir a robustez do fechamento do componente, sendo cruciais para cenários onde a interação do usuário é obrigatória. A prop `maximized` oferece uma solução elegante para a exibição de conteúdo extenso em telas menores, garantindo que o `BottomSheet` ocupe o espaço ideal. As props de transição (`transition-show`, `transition-hide`) permitem personalizar a experiência de abertura e fechamento, alinhando-se à linguagem de movimento do DSS. Finalmente, a prop `brand` é um exemplo claro da governança de tokens, permitindo que o componente herde a identidade visual da marca de forma consistente.

### Detalhamento da Governança de Tokens
A governança de tokens no DSS é um pilar fundamental para a criação de interfaces escaláveis e manuteníveis. Para o `DssBottomSheet`, isso significa que cada aspecto visual – desde o espaçamento interno e externo até as cores de fundo e texto – deve ser derivado de um token pré-definido. A proibição de tokens com sufixos semânticos não existentes e o uso de valores hardcoded visa evitar a proliferação de estilos inconsistentes e a dificuldade de manutenção. Por exemplo, em vez de definir um `padding` arbitrário, o desenvolvedor deve consultar a escala de espaçamento do DSS e aplicar o token apropriado, como `--dss-spacing-4`. Da mesma forma, as cores não devem ser definidas por seus nomes literais (e.g., `blue`, `red`), mas sim por sua função dentro do sistema (e.g., `--dss-action-hub`, `--dss-text-subtle`). Essa abordagem garante que, ao alterar um token central, todas as instâncias do `DssBottomSheet` (e outros componentes) que utilizam esse token sejam atualizadas automaticamente, mantendo a coesão visual em todo o produto.

### Expansão da Composite Logic
Para aprofundar a demonstração da `Composite Logic` na superfície de playground, é essencial ir além dos exemplos básicos. Podemos incluir um cenário onde o `DssBottomSheet` é acionado por um `DssFab` (Floating Action Button) e contém um `DssForm` para a criação de um novo item. Ao submeter o formulário, o `BottomSheet` deve fechar e exibir uma `DssSnackbar` de sucesso. Outro exemplo seria um `BottomSheet` que funciona como um seletor de filtros para uma lista de itens, onde a aplicação dos filtros atualiza a lista na página principal sem fechar o `BottomSheet` imediatamente, permitindo que o usuário refine suas escolhas. A integração com `DssAvatar` e `DssChip` pode ser demonstrada em um `BottomSheet` de seleção de contatos, onde cada contato é representado por um `DssAvatar` e, ao ser selecionado, um `DssChip` é adicionado a uma área de seleção.

### Expansão dos Estados a Expor
A tabela de `Estados a Expor` pode ser enriquecida com mais detalhes e cenários de uso. Por exemplo, podemos adicionar um estado para `BottomSheet` com `DssToolbar` fixo, mostrando como o conteúdo rola abaixo do cabeçalho. Outro estado interessante seria o `BottomSheet` com validação de formulário, onde mensagens de erro são exibidas dentro do componente. A inclusão de um estado `Loading` (Carregando) para o `BottomSheet` seria útil para demonstrar como o componente lida com a recuperação assíncrona de dados, exibindo um `DssSpinner` enquanto o conteúdo é carregado. Além disso, um estado `Empty` (Vazio) pode ser adicionado para quando o `BottomSheet` é aberto, mas não há conteúdo disponível para exibição, apresentando uma mensagem amigável ao usuário. Isso demonstra a robustez do componente em diferentes situações de dados e interação.
stado aberto deve ser suave e animada, utilizando as transições definidas nas props `transition-show`.
*   **Aberto (Open)**: O `BottomSheet` está visível e interativo. Neste estado, o conteúdo do `BottomSheet` é apresentado ao usuário, e ele pode interagir com os elementos internos. O backdrop deve estar visível e, por padrão, permitir o fechamento ao clicar fora, a menos que `no-backdrop-dismiss` esteja `true`.
*   **Persistente (Persistent)**: O `BottomSheet` não pode ser fechado clicando fora dele ou pressionando Esc. Este estado é útil para situações onde a interação com o `BottomSheet` é obrigatória antes de prosseguir, como em formulários de confirmação crítica ou fluxos de trabalho que exigem atenção total do usuário. Um botão de fechamento explícito deve ser fornecido para permitir que o usuário conclua a interação.
*   **Maximizável (Maximized)**: O `BottomSheet` ocupa a altura total da tela. Este estado é ideal para exibir grandes quantidades de conteúdo ou formulários complexos em dispositivos móveis, garantindo que todo o conteúdo seja visível sem rolagem excessiva e otimizando o espaço disponível na tela.
*   **Desabilitado (Disabled)**: O `BottomSheet` não pode ser aberto ou interagir. Neste estado, o componente está presente na DOM, mas não responde a eventos do usuário, indicando que não está disponível no momento. Visualmente, pode apresentar um estado esmaecido ou com um overlay para indicar sua inatividade, comunicando claramente ao usuário que a funcionalidade está temporariamente indisponível.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas do DSS
*   `DssButton`: Para ações interativas dentro do `BottomSheet`, como botões de confirmação ou cancelamento. O `DssButton` deve herdar as propriedades de estilo e comportamento do Design System, garantindo consistência visual e funcional.
*   `DssIcon`: Para ícones de fechamento, informativos ou decorativos dentro do `BottomSheet`. Os ícones devem ser consistentes com a biblioteca de ícones do DSS, contribuindo para a identidade visual unificada.
*   `DssSeparator`: Para separar visualmente seções de conteúdo dentro do `BottomSheet`, melhorando a legibilidade e a organização. O `DssSeparator` deve seguir as diretrizes de espaçamento e cor do DSS, mantendo a harmonia visual.
*   `DssList` / `DssItem`: Para exibir listas de opções, menus ou itens de navegação dentro do `BottomSheet`. Esses componentes devem ser utilizados para criar estruturas de lista acessíveis e estilizadas de acordo com o DSS, facilitando a interação do usuário com coleções de dados.

### Composição
O `DssBottomSheet` pode ser composto com outros componentes do DSS para criar experiências mais ricas e complexas, como:
*   `DssCard` dentro do `BottomSheet` para agrupar conteúdo relacionado, oferecendo uma estrutura visual clara e um senso de hierarquia. Isso é útil para organizar informações em blocos distintos e melhorar a compreensão do usuário.
*   `DssForm` para formulários rápidos de entrada de dados, permitindo que os usuários preencham informações sem sair da tela principal. A integração com `DssForm` garante que os campos de entrada e validações sigam os padrões do DSS, proporcionando uma experiência de preenchimento consistente.
*   `DssToolbar` para um cabeçalho fixo dentro do `BottomSheet`, que pode conter um título, botões de ação ou um botão de fechamento. O `DssToolbar` proporciona uma área de controle consistente na parte superior do `BottomSheet`, facilitando a navegação e o gerenciamento do componente.
*   **Combinação com `DssTabs`**: Para cenários onde o `BottomSheet` precisa apresentar conteúdo organizado em abas, o `DssTabs` pode ser integrado para permitir a navegação entre diferentes seções de informação de forma eficiente e intuitiva.
*   **Uso com `DssAvatar` e `DssChip`**: Em casos de seleção de usuários ou tags, a combinação com `DssAvatar` e `DssChip` pode enriquecer a interface, tornando-a mais visual e interativa, especialmente em seletores de múltiplos itens.
*   **Integração com `DssStepper`**: Para fluxos de trabalho multi-etapas que podem ser apresentados em um `BottomSheet`, o `DssStepper` pode guiar o usuário através do processo, mantendo o contexto da página principal.

## 7. EXCEÇÕES PREVISTAS

*   **Conteúdo Dinâmico**: O `BottomSheet` deve ser capaz de lidar com conteúdo que muda dinamicamente após a abertura, ajustando sua altura conforme necessário. Isso é crucial para cenários onde o conteúdo é carregado assincronamente ou varia com base nas interações do usuário, como a exibição de resultados de pesquisa ou a atualização de um formulário. O componente deve recalcular sua altura e posição para acomodar o novo conteúdo de forma fluida, sem causar saltos visuais.
*   **Aninhamento**: Evitar o aninhamento de múltiplos `BottomSheet`s ou modais para não prejudicar a experiência do usuário e a acessibilidade. O aninhamento excessivo pode levar a problemas de foco, sobreposição e confusão para o usuário, tornando a navegação e a interação difíceis. Se múltiplos níveis de interação forem necessários, considerar alternativas como navegação em tela cheia ou fluxos de várias etapas, que são mais amigáveis ao usuário.
*   **Scroll Interno**: Quando o conteúdo excede a altura disponível, o scroll deve ser tratado internamente pelo `BottomSheet` sem afetar o scroll da página principal. Isso garante que a rolagem do conteúdo do `BottomSheet` não cause rolagem indesejada na página de fundo, mantendo o contexto do usuário. A área de scroll deve ser claramente indicada visualmente, e o comportamento de rolagem deve ser suave.
*   **Interações com Elementos Fixos**: O `BottomSheet` deve gerenciar corretamente as interações com elementos fixos na página (como headers ou footers globais), garantindo que não haja sobreposição ou quebra de layout. O `z-index` deve ser cuidadosamente controlado para que o `BottomSheet` sempre apareça acima de outros elementos da interface, mas sem obscurecer elementos críticos da página principal.
*   **Fechamento por Swipe**: Em dispositivos móveis, o `BottomSheet` pode ter um comportamento de fechamento por swipe para baixo. Esta funcionalidade deve ser implementada de forma opcional e configurável, garantindo uma experiência de usuário intuitiva em telas sensíveis ao toque.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios
*   **`v-model` (Boolean)**: Para controlar a visibilidade do `BottomSheet`. Um toggle simples (e.g., `DssToggle` ou `DssCheckbox`) para abrir e fechar o componente, demonstrando seu estado básico de forma interativa.
*   **`persistent` (Boolean)**: Para alternar entre comportamento persistente e não persistente. Um checkbox para ativar/desativar a persistência, permitindo testar o fechamento por clique externo ou Esc e observar a diferença no comportamento.
*   **`maximized` (Boolean)**: Para alternar entre o estado normal e maximizado. Um checkbox para maximizar o `BottomSheet`, mostrando como ele se adapta à altura total da tela e como o conteúdo se reorganiza.
*   **`no-backdrop-dismiss` (Boolean)**: Para controlar o fechamento ao clicar no backdrop. Um checkbox para desabilitar o fechamento pelo backdrop, útil para cenários de confirmação onde o usuário deve interagir com o conteúdo do `BottomSheet`.
*   **`no-esc-dismiss` (Boolean)**: Para controlar o fechamento ao pressionar a tecla Esc. Um checkbox para desabilitar o fechamento pela tecla Esc, complementando o controle de persistência e oferecendo maior controle sobre a interação.
*   **`square` (Boolean)**: Para alternar entre bordas arredondadas e quadradas. Um checkbox para alternar o estilo da borda, demonstrando a flexibilidade visual do componente e como ele se alinha a diferentes estéticas de design.
*   **`brand` (String)**: Permite selecionar a variante de marca (`hub`, `water`, `waste`). Um seletor (dropdown, e.g., `DssSelect`) com as opções `hub`, `water`, `waste` para demonstrar as diferentes cores de marca aplicadas ao `BottomSheet`, afetando elementos como o fundo ou o texto de destaque.
*   **`transition-show` (String)**: Um campo de texto ou seletor para escolher diferentes transições de entrada (e.g., `slide-up`, `fade`, `scale`). Isso permite aos desenvolvedores testar e visualizar as diferentes animações disponíveis.
*   **`transition-hide` (String)**: Um campo de texto ou seletor para escolher diferentes transições de saída (e.g., `slide-down`, `fade`, `scale`). Similar ao `transition-show`, para testar as animações de fechamento.

### Composite Logic
*   Demonstrar a abertura e fechamento do `BottomSheet` através de um `DssButton` com a variante `hub`. O botão deve estar fora do `BottomSheet` e controlá-lo, exibindo um texto como "Abrir BottomSheet". Ao clicar, o `BottomSheet` deve aparecer com a transição configurada.
*   Exibir diferentes tipos de conteúdo (texto simples, lista de itens, formulário) dentro do `BottomSheet`. Deve haver opções para alternar entre esses tipos de conteúdo para visualização, por exemplo, usando `DssTabs` ou `DssRadioGroup`. Cada tipo de conteúdo deve demonstrar a adaptabilidade do `BottomSheet`.
*   Cenário de uso com `DssList` e `DssItem` para seleção de opções, utilizando cores de `water` ou `waste` para destacar itens específicos. Um exemplo de lista de seleção onde os itens selecionados podem ter uma cor de fundo ou texto diferente, e a seleção de um item pode fechar o `BottomSheet` ou atualizar um estado na página principal.
*   Integração com um `DssForm` simples dentro do `BottomSheet`, demonstrando a submissão de dados e o fechamento do componente após a ação. O formulário pode conter `DssInput`, `DssCheckbox` e um `DssButton` de submissão, com validação básica para mostrar feedback ao usuário.
*   Exemplo de `BottomSheet` com um `DssToolbar` fixo no topo, contendo um título e um `DssButton` de fechamento, e um `DssSeparator` abaixo do toolbar. Isso ilustra como elementos de cabeçalho podem ser incorporados e como o scroll interno funciona.
*   Demonstração de um `BottomSheet` que carrega conteúdo dinamicamente após a abertura, exibindo um `DssSpinner` enquanto os dados são buscados e, em seguida, renderizando o conteúdo completo. Isso valida a capacidade do componente de se ajustar a mudanças de conteúdo.

### Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Fechado | O `BottomSheet` não está visível, aguardando ser ativado. | Visual | `v-model="false"` |
| Aberto | O `BottomSheet` está visível e pronto para interação. | Visual | `v-model="true"` |
| Persistente | O `BottomSheet` permanece aberto mesmo com cliques externos ou tecla Esc. | Visual | `persistent="true"` |
| Maximizável | O `BottomSheet` ocupa a altura total da tela, ideal para conteúdo extenso. | Visual | `maximized="true"` |
| Variante Hub | O `BottomSheet` estilizado com a cor principal da marca (`hub`). | Visual | `brand="hub"` |
| Variante Water | O `BottomSheet` estilizado com a cor secundária da marca (`water`). | Visual | `brand="water"` |
| Variante Waste | O `BottomSheet` estilizado com a cor de destaque da marca (`waste`). | Visual | `brand="waste"` |
| Com Conteúdo Dinâmico | Demonstração de como o `BottomSheet` se ajusta a conteúdo carregado assincronamente. | Visual | `v-model="true"` com conteúdo que muda após um delay |
| Com Scroll Interno | O `BottomSheet` com conteúdo que excede a altura, exibindo barra de rolagem interna. | Visual | `v-model="true"` e conteúdo longo |
| Com `DssToolbar` Fixo | O `BottomSheet` com um cabeçalho fixo, demonstrando a rolagem do conteúdo abaixo dele. | Visual | `v-model="true"` e `DssToolbar` |
| Com Validação de Formulário | O `BottomSheet` contendo um formulário com mensagens de erro de validação. | Visual | `v-model="true"` e `DssForm` com erros |
| Estado de Carregamento | O `BottomSheet` exibindo um `DssSpinner` enquanto aguarda o carregamento de dados. | Visual | `v-model="true"` e `DssSpinner` |

---
*Fim do documento.*
