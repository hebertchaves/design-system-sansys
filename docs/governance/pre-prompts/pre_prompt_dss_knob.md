# Pré-prompt: DssKnob

### 1. CLASSIFICAÇÃO E CONTEXTO
*   **Golden Reference**: `DssChip`
    *   **Justificativa da Golden Reference**: A escolha do `DssChip` como referência dourada para o `DssKnob` baseia-se na sua natureza interativa e na capacidade de representar um estado selecionado de forma clara e concisa. Ambos os componentes servem como elementos de entrada que permitem ao usuário fazer escolhas ou ajustar valores, embora por mecanismos diferentes. O `DssChip` é um componente interativo que pode ser selecionado, filtrado ou usado para exibir informações compactas, enquanto o `DssKnob` permite a seleção de um valor dentro de um intervalo. A similaridade reside na sua função como controles de interface que respondem à interação do usuário e comunicam um estado específico.
*   **Golden Context**: O `DssKnob` é um componente de entrada interativo que permite ao usuário selecionar um valor dentro de um intervalo predefinido, girando um "botão" virtual. Ele é visualmente similar a um dial e é ideal para cenários onde a precisão numérica é importante, mas a interface visual de um slider tradicional pode ser menos intuitiva ou esteticamente desejável. Sua interatividade e capacidade de representar um estado selecionado o alinham com a natureza interativa do `DssChip`.
    *   **Casos de Uso Primários**: O `DssKnob` é particularmente útil em interfaces que exigem ajustes finos de valores numéricos, como:
        *   Controles de volume ou tonalidade em players de áudio/vídeo.
        *   Ajustes de brilho, contraste ou saturação em editores de imagem.
        *   Seleção de datas ou horas em calendários ou agendadores (com adaptações).
        *   Definição de limites ou thresholds em dashboards de monitoramento.
    *   **Benefícios para o Usuário**: Oferece uma experiência de usuário mais tátil e direta para a manipulação de valores, economizando espaço em comparação com sliders longos e proporcionando um feedback visual imediato da posição e do valor selecionado.
*   **Justificativa**: O `DssKnob` oferece uma alternativa compacta e visualmente distinta para a entrada de dados numéricos, especialmente útil em dashboards, configurações de áudio/vídeo ou qualquer interface que se beneficie de um controle rotativo. Ele complementa os componentes de entrada existentes, proporcionando uma experiência de usuário rica e diferenciada.
    *   **Posicionamento no DSS**: O `DssKnob` preenche uma lacuna no Design System Sansys para controles de entrada que exigem uma interação rotativa, oferecendo uma solução padronizada e acessível. Sua inclusão visa enriquecer a biblioteca de componentes, permitindo que os designers e desenvolvedores criem interfaces mais intuitivas e engajadoras para cenários específicos de ajuste de valores.

### 2. RISCOS ARQUITETURAIS E GATES
*   **Complexidade de Interação**: A implementação da lógica de rotação e mapeamento de valores pode ser complexa, exigindo atenção à suavidade da animação e à precisão da seleção. Isso inclui a gestão de eventos de toque e mouse, a interpolação de valores para uma transição suave e a prevenção de "saltos" indesejados no valor. A complexidade aumenta com a necessidade de suportar diferentes gestos (arrastar, clicar) e a calibração da sensibilidade do controle para diferentes plataformas e dispositivos.
*   **Responsividade**: Garantir que o `DssKnob` seja responsivo e funcione bem em diferentes tamanhos de tela e dispositivos (mouse, toque) é crucial. O componente deve adaptar seu tamanho e a área de interação de forma inteligente, mantendo a usabilidade tanto em telas pequenas de dispositivos móveis quanto em monitores maiores. Testes rigorosos em diversas resoluções e tipos de entrada são essenciais para validar a responsividade.
*   **Customização de Estilo**: A flexibilidade para estilizar o knob (cor, tamanho, indicador de valor) sem comprometer a usabilidade ou a consistência com o DSS é um desafio. É necessário definir claramente quais aspectos do estilo são customizáveis via props e quais devem ser rigidamente controlados pelos tokens do DSS. A customização deve ser possível dentro dos limites do design system, evitando que o componente se desvie de sua identidade visual.
*   **Performance**: Animações e atualizações de estado devem ser otimizadas para evitar lentidão na interface, especialmente em dispositivos com menor poder de processamento. O uso de transformações CSS para animações, a otimização da renderização de componentes e a minimização de recálculos de layout são estratégias importantes para garantir uma experiência fluida. O componente deve ser leve e eficiente, mesmo quando há múltiplas instâncias na mesma página.
*   **Gate**: O componente deve ter uma API clara e bem documentada, com exemplos de uso para diferentes cenários. A funcionalidade básica (seleção de valor, feedback visual) deve estar estável antes de considerar customizações avançadas. O "gate" de qualidade para este componente inclui a validação de:
    *   **Acessibilidade**: Conformidade com WCAG 2.1, incluindo navegação por teclado e suporte a leitores de tela.
    *   **Testes Automatizados**: Cobertura abrangente de testes unitários e de integração.
    *   **Documentação**: Pré-prompt completo, exemplos de código e diretrizes de uso para designers e desenvolvedores.
    *   **Performance**: Avaliação do desempenho em diferentes navegadores e dispositivos.

### 3. MAPEAMENTO DE API (QUASAR → DSS)
O `DssKnob` será baseado no `QKnob` do Quasar. A API do `DssKnob` deve ser um subconjunto ou uma extensão da API do `QKnob`, com os seguintes mapeamentos e considerações:
*   **`value` (Quasar) → `model-value` (DSS)**: Propriedade principal para o valor selecionado do knob. Aceita um `Number` e suporta a diretiva `v-model` para ligação de dados bidirecional. O valor deve estar dentro do intervalo definido por `min` e `max`.
    *   **Exemplo de Uso**: `<DssKnob v-model="knobValue" />`
*   **`min` (Quasar) → `min` (DSS)**: Define o valor mínimo permitido para o knob. Tipo `Number`, padrão `0`.
    *   **`max` (Quasar) → `max` (DSS)**: Define o valor máximo permitido para o knob. Tipo `Number`, padrão `100`.
    *   **Considerações**: `min` não deve ser maior que `max`. Se for, o componente deve emitir um aviso e usar valores padrão ou inverter os valores para garantir um intervalo válido.
*   **`step` (Quasar) → `step` (DSS)**: Define o incremento ou decremento do valor ao interagir com o knob. Tipo `Number`, padrão `1`. Deve ser um número positivo.
    *   **Considerações**: Um `step` de `0` ou negativo deve ser tratado como `1` ou emitir um aviso.
*   **`size` (Quasar) → `size` (DSS)**: Controla o tamanho visual do knob. Aceita `String` com valores como `sm` (pequeno), `md` (médio, padrão) e `lg` (grande). Internamente, esses valores são mapeados para tokens de espaçamento do DSS (ex: `sm` -> `--dss-spacing-40`, `md` -> `--dss-spacing-48`, `lg` -> `--dss-spacing-64`) para garantir consistência visual.
*   **`color` (Quasar) → `color` (DSS)**: Define a cor principal do indicador de progresso do knob. Aceita `String` com nomes de cores do DSS (ex: `hub`, `water`, `waste`, `neutral`, `info`, `success`, `warning`, `error`). Padrão é `hub`.
    *   **`track-color` (Quasar) → `track-color` (DSS)**: Define a cor da trilha de fundo do knob. Aceita `String` com nomes de cores do DSS. Padrão é `neutral`.
    *   **`inner-color` (Quasar) → `inner-color` (DSS)**: Define a cor do fundo interno do knob. Aceita `String` com nomes de cores do DSS. Padrão é `surface-default`.
    *   **Mapeamento de Tokens**: Todas as cores são traduzidas para os tokens de cor correspondentes do DSS (ex: `hub` -> `--dss-action-hub`, `neutral` -> `--dss-neutral-surface`).
*   **`readonly` (Quasar) → `readonly` (DSS)**: Quando `true`, o knob não pode ser alterado pelo usuário, mas ainda é visualmente interativo (não desabilitado). Tipo `Boolean`, padrão `false`.
    *   **`disable` (Quasar) → `disabled` (DSS)**: Quando `true`, o knob é completamente desabilitado, não interativo e com feedback visual de desabilitado (ex: opacidade reduzida). Tipo `Boolean`, padrão `false`.
*   **`angle` (Quasar) → `start-angle`, `end-angle` (DSS)**: Controla o arco de rotação do knob. `start-angle` define o início do arco em graus (padrão `0`), e `end-angle` define o fim (padrão `360`). Tipo `Number`.
    *   **Considerações**: Permite criar knobs parciais ou semicirculares, útil para designs específicos.
*   **Slots**: O `DssKnob` deve expor slots para permitir a customização do conteúdo exibido dentro do knob. Isso inclui um slot `default` para o valor principal e, opcionalmente, slots nomeados para ícones ou informações adicionais.
    *   **Exemplo**: `<DssKnob><template #default>{{ knobValue }}%</template></DssKnob>`

### 4. GOVERNANÇA DE TOKENS E CSS
O `DssKnob` deve aderir estritamente ao sistema de tokens do DSS para todas as suas propriedades de estilo, garantindo consistência visual e facilidade de manutenção. Isso significa que nenhum valor hardcoded de CSS (cores hexadecimais, pixels fixos para espaçamento, etc.) deve ser utilizado diretamente no componente. Em vez disso, todos os estilos devem ser derivados de tokens pré-definidos no Design System Sansys.

**Princípios de Governança de Tokens:**
*   **Atomicidade**: Cada token representa uma única decisão de design (ex: uma cor específica, um valor de espaçamento).
*   **Semântica**: Tokens devem ter nomes que descrevam seu propósito, não seu valor literal (ex: `--dss-action-hub` em vez de `--dss-blue-500`).
*   **Escalabilidade**: O sistema de tokens deve ser capaz de suportar futuras expansões e variações do design.

**Exemplos de Uso de Tokens:**
*   **Tamanho**: Para definir as dimensões do `DssKnob`, utilize tokens de espaçamento do DSS. Por exemplo, `--dss-spacing-48` pode ser usado para um knob de tamanho médio, enquanto `--dss-spacing-64` seria adequado para uma versão maior. Isso garante que o componente se ajuste harmoniosamente ao grid e às proporções do design system.
    *   **Mapeamento de `size` prop**: A propriedade `size` do componente (`sm`, `md`, `lg`) deve ser mapeada internamente para tokens de espaçamento específicos, como `--dss-spacing-40` para `sm`, `--dss-spacing-48` para `md` e `--dss-spacing-64` para `lg`.
*   **Raio de Borda**: O formato circular do `DssKnob` é garantido pelo token `--dss-radius-full`, que aplica um `border-radius` de 50%. Para variações ou estados específicos, outros tokens de raio podem ser considerados, mas o padrão deve ser sempre circular.
*   **Cores**: As cores do `DssKnob` devem ser definidas por tokens de cor semânticos do DSS.
    *   **Fundo do Knob**: `--dss-surface-default` para o fundo geral do componente.
    *   **Cor do Progresso/Valor**: `--dss-action-hub` para a cor que indica o progresso ou o valor selecionado. Este token reflete a cor principal de ação do sistema.
    *   **Cor da Trilha**: `--dss-action-hub-surface` para a trilha que o indicador de progresso percorre. Este token é uma variação da cor de ação, geralmente mais suave ou em um tom diferente para criar contraste.
    *   **Estados**: Cores para estados como `hover`, `focus`, `active`, `disabled` também devem ser definidas por tokens específicos (ex: `--dss-action-hub-hover`, `--dss-action-hub-disabled`).
*   **Espaçamento Interno e Externo**: Qualquer espaçamento dentro ou ao redor do `DssKnob` deve utilizar tokens de espaçamento do DSS, como `--dss-spacing-4` ou `--dss-spacing-8`. Isso assegura que o componente mantenha um ritmo visual consistente com outros elementos da interface.
*   **Transições e Animações**: Para garantir uma experiência de usuário fluida, as transições de estado (ex: `hover`, `focus`) e as animações de mudança de valor devem usar tokens de duração e easing do DSS. Por exemplo, `--dss-duration-250` para a duração da transição e `--dss-ease-in-out` para a função de temporização. Isso padroniza a velocidade e o comportamento das animações em todo o sistema.

**Tokens Proibidos e Substituições:**
É crucial evitar o uso de tokens que não fazem parte do vocabulário oficial do DSS ou que foram descontinuados. A lista a seguir detalha tokens proibidos e suas substituições corretas:
*   `--dss-spacing-4` -> Substituir por `--dss-spacing-4` (ou outro token de espaçamento apropriado).
*   `--dss-text-subtle` -> Substituir por `--dss-text-subtle`.
*   `outline: 2px solid white` -> Remover ou substituir por `outline: 2px solid var(--dss-action-hub-border-focus)` ou `outline: 2px solid white` para acessibilidade.
*   `--dss-action-hub` -> Substituir por `--dss-action-hub`.
*   `--dss-action-hub-surface` -> Substituir por `--dss-action-hub-surface`.
*   `--dss-duration-base` -> Substituir por tokens de duração específicos como `--dss-duration-150`, `--dss-duration-250`, etc.

### 5. ACESSIBILIDADE E ESTADOS
*   **Estados**: O `DssKnob` deve suportar e exibir visualmente os seguintes estados, que são cruciais para a usabilidade e acessibilidade:
    *   `default`: Estado inicial do componente, sem interação.
    *   `hover`: Quando o cursor do mouse está sobre o knob, indicando interatividade.
    *   `focus`: Quando o knob está selecionado via teclado ou clique, com um anel de foco claro.
    *   `active`: Durante a interação de arrastar ou clicar no knob.
    *   `disabled`: O knob não é interativo e deve ter um feedback visual que o diferencie dos estados ativos (ex: opacidade reduzida, cores acinzentadas).
    *   `readonly`: O knob exibe um valor, mas não pode ser alterado pelo usuário. Deve ser visualmente distinto do estado `disabled`.
    *   `error`: Indica que o valor do knob está fora dos limites esperados ou há um problema de validação. Geralmente acompanhado por uma borda ou cor de destaque em vermelho.
    *   `success`: Indica que o valor do knob foi validado com sucesso, com feedback visual positivo (ex: borda ou cor de destaque em verde).
*   **Interação por Teclado**: A navegação e interação via teclado são fundamentais para a acessibilidade. O `DssKnob` deve:
    *   Ser acessível via tecla `Tab` para focar e desfocar.
    *   Permitir o ajuste do valor com as teclas de seta (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`), com incrementos definidos pelo `step`.
    *   Suportar `PageUp` e `PageDown` para grandes incrementos ou decrementos de valor, proporcionando uma forma mais rápida de navegar por grandes intervalos.
    *   A tecla `Home` deve definir o valor para `min` e `End` para `max`.
*   **ARIA Attributes**: Para garantir que leitores de tela e outras tecnologias assistivas possam interpretar e interagir corretamente com o `DssKnob`, os seguintes atributos ARIA devem ser implementados:
    *   `role="slider"`: Identifica o elemento como um controle deslizante.
    *   `aria-valuemin`: Define o valor mínimo permitido para o controle.
    *   `aria-valuemax`: Define o valor máximo permitido para o controle.
    *   `aria-valuenow`: Representa o valor atual do controle.
    *   `aria-valuetext`: Uma representação em texto do valor atual, útil para valores que não são puramente numéricos ou que precisam de contexto adicional (ex: "50%", "25 graus Celsius").
    *   `aria-labelledby` ou `aria-label`: Para fornecer um rótulo acessível ao knob.
*   **Feedback Visual**: Todas as mudanças de estado devem ser acompanhadas por feedback visual claro e consistente, seguindo as diretrizes do DSS:
    *   **Foco**: Um `outline` bem definido (ex: `outline: 2px solid var(--dss-action-hub-border-focus)`) deve ser exibido quando o knob está em foco, garantindo visibilidade para usuários de teclado.
    *   **Desabilitado**: O estado `disabled` deve ser indicado por uma redução na opacidade e/ou uma mudança para tons de cinza, removendo qualquer indicação de interatividade.
    *   **Hover/Active**: Pequenas animações ou mudanças sutis de cor podem indicar os estados `hover` e `active`, proporcionando uma experiência responsiva ao usuário.

### 6. DEPENDÊNCIAS E COMPOSIÇÃO
*   **Dependências**: O `DssKnob` pode ter as seguintes dependências:
    *   `QKnob` (Quasar): Como base para a funcionalidade principal do knob, aproveitando sua lógica de interação e renderização. A dependência deve ser encapsulada para que o `DssKnob` exponha uma API consistente com o DSS, independentemente da implementação subjacente.
    *   `QIcon` (Quasar): Para a exibição de ícones internos, se aplicável, garantindo a consistência visual com outros componentes do Quasar/DSS.
    *   **Considerações sobre Dependências**: É fundamental que as dependências externas sejam minimizadas e, quando presentes, sejam bem gerenciadas para evitar o "vendor lock-in" e garantir a estabilidade e a manutenibilidade do componente a longo prazo. A abstração da API do Quasar é crucial para permitir futuras migrações ou substituições de bibliotecas sem impactar os consumidores do `DssKnob`.
*   **Composição**: O `DssKnob` é projetado para ser um componente flexível e pode ser composto com outros componentes do DSS para criar experiências de usuário mais ricas e informativas:
    *   **Com `DssTooltip`**: Para exibir o valor exato do knob ao interagir (passar o mouse, arrastar), fornecendo feedback numérico preciso que complementa a representação visual.
    *   **Com `DssLabel`**: Para contextualizar o controle, fornecendo um rótulo descritivo que explica a função do knob na interface.
    *   **Com `DssValidationMessage`**: Em cenários de formulário, o `DssKnob` pode ser combinado com `DssValidationMessage` para exibir mensagens de erro ou sucesso com base na validação do valor de entrada.
    *   **Com `DssButton` ou `DssIcon`**: Para adicionar controles adicionais ao redor do knob, como botões de reset ou ícones que indicam a funcionalidade.

### 7. EXCEÇÕES PREVISTAS
*   **Valores Inválidos**: Tratamento de `min` > `max` ou `step` inválido. O componente deve fallback para valores padrão ou emitir um aviso.
*   **Overflow de Texto**: Se o valor interno for muito longo, deve ser truncado ou ter seu tamanho de fonte ajustado para caber no knob.
*   **Customização Extrema**: Evitar permitir customizações que quebrem a acessibilidade ou a consistência visual do DSS.

### 8. SUPERFÍCIE DE PLAYGROUND
*   **Controles**:
    *   `model-value`: `Number` (intervalo de 0 a 100, padrão 50)
    *   `min`: `Number` (padrão 0)
    *   `max`: `Number` (padrão 100)
    *   `step`: `Number` (padrão 1)
    *   `size`: `String` (`sm`, `md`, `lg`)
    *   `color`: `String` (`hub`, `water`, `waste`, `neutral`, `info`, `success`, `warning`, `error`)
    *   `track-color`: `String` (`hub`, `water`, `waste`, `neutral`, `info`, `success`, `warning`, `error`)
    *   `inner-color`: `String` (`hub`, `water`, `waste`, `neutral`, `info`, `success`, `warning`, `error`)
    *   `disabled`: `Boolean`
    *   `readonly`: `Boolean`
    *   `label`: `Boolean` (para exibir o valor como label)
*   **Composite Logic (Concreta, Não Genérica)**:
    Para demonstrar a versatilidade do `DssKnob` e sua integração com outros componentes do DSS, os seguintes cenários de `Composite Logic` devem ser apresentados na superfície de playground:
    *   **Controle de Volume Interativo**: Um `DssKnob` integrado com um `DssTooltip` que exibe o valor numérico exato do volume (0-100) ao passar o mouse ou durante a interação. A `Composite Logic` aqui envolve a sincronização do `model-value` do knob com o conteúdo do tooltip, garantindo que o feedback visual seja imediato e preciso.
    *   **Ajuste de Temperatura com Feedback Visual**: Um `DssKnob` que controla a temperatura em um termostato virtual. A `Composite Logic` pode incluir a mudança da cor do `track-color` ou `color` do knob com base na faixa de temperatura (ex: azul para frio, vermelho para quente), utilizando lógica condicional baseada no `model-value`.
    *   **Seleção de Intensidade de Filtro de Imagem**: Um `DssKnob` usado para ajustar a intensidade de um filtro (ex: brilho, contraste) em uma aplicação de edição de imagem. A `Composite Logic` envolveria a aplicação de um estilo CSS dinâmico a um elemento de imagem de demonstração, refletindo a mudança em tempo real do valor do knob.
    *   **Formulário de Configuração com Validação**: Um `DssKnob` dentro de um `DssForm` que ajusta um parâmetro numérico (ex: número de itens por página). A `Composite Logic` deve incluir validação de entrada, mostrando mensagens de erro (`DssValidationMessage`) se o valor exceder limites específicos ou não for um múltiplo do `step`.
*   **Estados a Expor (em Tabela)**:
    A tabela a seguir detalha os eventos e estados que o `DssKnob` deve expor, permitindo que componentes pais reajam às interações do usuário e ao estado interno do knob:

| Evento/Estado       | Descrição                                                                 | Tipo       |
| :------------------ | :------------------------------------------------------------------------ | :--------- |
| `@update:model-value` | Emitido quando o valor do knob é alterado pelo usuário. Fornece o novo valor. | `(value: Number) => void` |
| `@focus`            | Emitido quando o knob recebe foco.                                        | `() => void` |
| `@blur`             | Emitido quando o knob perde o foco.                                       | `() => void` |
| `is-dragging`       | Propriedade reativa que indica se o usuário está arrastando o knob.      | `Boolean`  |
| `is-disabled`       | Propriedade reativa que reflete o estado `disabled` do knob.              | `Boolean`  |
| `is-readonly`       | Propriedade reativa que reflete o estado `readonly` do knob.              | `Boolean`  |
| `has-error`         | Propriedade reativa que indica se o knob está em um estado de erro.       | `Boolean`  |
