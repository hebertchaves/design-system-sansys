# Pré-prompt: DssSkeleton

## 1. CLASSIFICAÇÃO E CONTEXTO

*   **Golden Reference**: DssBadge
*   **Golden Context**: O DssSkeleton é um componente não-interativo utilizado para indicar o carregamento de conteúdo, fornecendo um placeholder visual que simula a estrutura do conteúdo final antes que os dados reais sejam exibidos. Ele melhora a percepção de desempenho e a experiência do usuário, minimizando a sensação de espera e garantindo uma transição suave entre os estados de carregamento e conteúdo final. Este componente é fundamental para a construção de interfaces responsivas e amigáveis, onde a agilidade na apresentação da informação é crucial.
*   **Justificativa**: Padronizar a experiência do usuário durante estados de carregamento, reduzindo a percepção de lentidão e melhorando a consistência visual da aplicação. Oferece uma representação visual imediata do layout que está por vir, evitando mudanças abruptas na interface e contribuindo para uma navegação mais fluida. A implementação de um DssSkeleton robusto e configurável permite que designers e desenvolvedores mantenham a coesão visual em diferentes cenários de uso, desde a carga inicial de uma página até a atualização de seções específicas de um componente.

## 2. RISCOS ARQUITETURAIS E GATES

*   **Riscos Arquiteturais**:
    *   **Performance**: O uso excessivo de DssSkeletons ou a implementação de animações complexas podem impactar negativamente o desempenho da renderização, especialmente em listas longas ou interfaces densas com múltiplos componentes de carregamento. É crucial otimizar as animações e a quantidade de elementos renderizados para evitar quedas na taxa de quadros (FPS) e garantir uma experiência fluida.
    *   **Acessibilidade**: A indicação visual de carregamento deve ser complementada por atributos ARIA adequados para leitores de tela, garantindo que usuários com deficiência visual sejam informados sobre o estado da página. A falta de semântica acessível pode tornar o componente inútil ou confuso para esses usuários.
    *   **Flexibilidade vs. Padronização**: A dificuldade em adaptar o esqueleto a layouts muito complexos ou personalizados sem quebrar a padronização do Design System é um risco. É necessário encontrar um equilíbrio entre a flexibilidade para atender a casos de uso específicos e a manutenção da consistência visual e estrutural do DSS.
*   **Gates**:
    *   **Revisão de Performance**: Testes de desempenho rigorosos em cenários de uso intensivo (ex: 100+ skeletons na tela simultaneamente) para garantir que o FPS não caia abaixo de 30 em dispositivos de médio desempenho. Ferramentas como Lighthouse e WebPageTest devem ser utilizadas para monitorar e otimizar o tempo de carregamento e a fluidez da interface.
    *   **Testes de Acessibilidade**: Validação com ferramentas automatizadas (Lighthouse, Axe) e testes manuais com leitores de tela (NVDA, VoiceOver) para garantir conformidade com WCAG 2.1 AA. A inclusão de usuários com deficiência visual nos testes é fundamental para validar a eficácia das soluções de acessibilidade.
    *   **Validação de Design**: Aprovação formal do time de Design para garantir que o componente se adapte a diferentes layouts e casos de uso sem comprometer a identidade visual e os princípios do Design System. Isso inclui a revisão de variações de forma, tamanho e animação em diversos contextos de aplicação.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O Quasar, framework base do DSS, não oferece um componente `Skeleton` nativo, o que exige a criação de soluções customizadas para simular estados de carregamento. Tradicionalmente, essa funcionalidade é alcançada através da combinação de elementos HTML básicos como `div` e `span`, estilizados com classes utilitárias para mimetizar a forma e o tamanho do conteúdo final. Alternativamente, componentes como `QSpinner` ou `QLinearProgress` podem ser empregados para indicar um carregamento genérico, mas não oferecem a representação estrutural que um skeleton proporciona. O DssSkeleton surge para preencher essa lacuna, abstraindo a complexidade da implementação manual e oferecendo uma API simplificada e consistente. Ele permite aos desenvolvedores configurar facilmente a forma (retangular, circular, textual), o tamanho (largura e altura) e o tipo de animação (onda, pulso, nenhum) do placeholder, garantindo uma experiência de usuário fluida e padronizada durante o carregamento de dados. A API do DssSkeleton é projetada para ser intuitiva, minimizando a curva de aprendizado e promovendo a reusabilidade em todo o ecossistema do Design System Sansys.

*   **Propriedades Sugeridas**:
    *   `variant`: `string` (e.g., 'text', 'rect', 'circle', 'heading', 'avatar'). Define a forma visual do esqueleto para simular diferentes tipos de conteúdo. Por exemplo, 'text' para linhas de texto, 'rect' para blocos genéricos, 'circle' para avatares ou ícones, 'heading' para títulos e 'avatar' para representações de usuário. Esta propriedade é crucial para a adaptabilidade do componente, permitindo que ele se integre harmoniosamente em diversos layouts.
    *   `width`: `string` (e.g., '100px', '50%', '--dss-spacing-32'). Controla a largura do componente skeleton. Pode aceitar valores fixos em pixels, porcentagens para layouts responsivos ou tokens de espaçamento do DSS para garantir alinhamento com o grid do sistema. A flexibilidade na definição da largura é essencial para simular com precisão o espaço ocupado pelo conteúdo real.
    *   `height`: `string` (e.g., '20px', '--dss-spacing-8'). Controla a altura do componente skeleton. Similar à largura, aceita pixels, porcentagens ou tokens de espaçamento do DSS. A combinação de largura e altura permite a criação de placeholders que mimetizam fielmente as dimensões dos elementos que serão carregados.
    *   `lines`: `number`. Específico para `variant='text'`, define o número de linhas de texto simuladas. Útil para representar parágrafos ou listas de forma dinâmica, conferindo realismo ao estado de carregamento de blocos de texto.
    *   `animation`: `string` (e.g., 'wave', 'pulse', 'none'). Define o tipo de efeito visual que indica o carregamento. 'wave' cria um efeito de onda suave que se move horizontalmente, 'pulse' um efeito de pulsação sutil que altera a opacidade, e 'none' desativa a animação para casos onde apenas o placeholder estático é desejado. A escolha da animação impacta diretamente a percepção de atividade e a experiência do usuário.
    *   `bordered`: `boolean`. Quando `true`, adiciona uma borda ao redor do skeleton, o que pode ser útil para simular inputs, cards ou outros elementos com contorno visual. Esta propriedade adiciona um nível extra de detalhe visual, aproximando o skeleton do elemento final.
    *   `radius`: `string` (e.g., '--dss-radius-sm', '--dss-radius-md', '--dss-radius-lg', '--dss-radius-full'). Permite ajustar o raio da borda do skeleton, especialmente útil para `variant='rect'` para criar cantos arredondados que se alinham com a linguagem visual do DSS. A consistência nos raios de borda é vital para a identidade visual do sistema.

## 4. GOVERNANÇA DE TOKENS E CSS

O DssSkeleton deve utilizar exclusivamente tokens numéricos e padrão do DSS para espaçamento, raio, cores de superfície e duração de animação. NENHUM token com sufixo semântico não existente deve ser inventado. A adesão estrita a esta regra garante a consistência e a manutenibilidade do Design System, evitando a proliferação de tokens não padronizados que podem levar a inconsistências visuais e técnicas. A governança de tokens é um pilar fundamental para a escalabilidade e a robustez do DSS.

*   **Tokens de Espaçamento**: `--dss-spacing-1` a `--dss-spacing-96` (para `width`, `height`, `margin`, `padding` internos). Estes tokens garantem que o espaçamento do DssSkeleton esteja alinhado com o grid e a escala de espaçamento definida no Design System, promovendo a harmonia visual e a previsibilidade do layout.
*   **Tokens de Raio**: `--dss-radius-sm`, `--dss-radius-md`, `--dss-radius-lg`, `--dss-radius-full` (para `border-radius`). A aplicação desses tokens assegura que os cantos arredondados do DssSkeleton sigam as diretrizes de design, contribuindo para a coesão estética do componente com o restante da interface.
*   **Tokens de Duração**: `--dss-duration-150`, `--dss-duration-200`, `--dss-duration-250`, `--dss-duration-300` (para `animation-duration`). A padronização das durações de animação através de tokens garante que as transições do DssSkeleton sejam suaves e consistentes em toda a aplicação, melhorando a percepção de desempenho e a experiência do usuário.
*   **Tokens de Superfície**: `--dss-surface-default`, `--dss-surface-variant`, `--dss-surface-inverse`, `--dss-action-hub-surface`, `--dss-action-water-surface`, `--dss-action-waste-surface` (para `background-color` do esqueleto). Estes tokens definem as cores de fundo do DssSkeleton, garantindo que ele se integre visualmente com os diferentes temas e estados da aplicação. A utilização de tokens semânticos para cores de superfície é crucial para a adaptabilidade e a acessibilidade do componente.
*   **Exemplo de Uso de Tokens**:
    ```css
    .dss-skeleton--rect {
        background-color: var(--dss-surface-variant);
        border-radius: var(--dss-radius-md);
        width: var(--dss-spacing-64);
        height: var(--dss-spacing-8);
        animation-duration: var(--dss-duration-250);
    }
    .dss-skeleton--circle {
        border-radius: var(--dss-radius-full);
        width: var(--dss-spacing-32);
        height: var(--dss-spacing-32);
    }
    .dss-skeleton--text {
        background-color: var(--dss-surface-default);
        border-radius: var(--dss-radius-sm);
        height: var(--dss-spacing-4);
    }
    .dss-skeleton--hub {
        background-color: var(--dss-action-hub-surface);
    }
    ```

## 5. ACESSIBILIDADE E ESTADOS

*   **Acessibilidade**:
    *   O DssSkeleton, por ser um placeholder visual, não deve ser focado por leitores de tela. Deve-se usar `aria-hidden="true"` no componente principal do skeleton para evitar que o conteúdo visual seja lido de forma confusa e redundante. Isso garante que a experiência para usuários de tecnologias assistivas seja clara e sem interrupções desnecessárias.
    *   O elemento pai que contém o skeleton e o conteúdo real deve ter `aria-busy="true"` enquanto o conteúdo estiver carregando e `aria-busy="false"` quando o conteúdo for carregado. Esta prática informa aos leitores de tela sobre o estado dinâmico da interface, permitindo que os usuários compreendam quando o conteúdo está sendo atualizado.
    *   Considerar `aria-live="polite"` em uma região para anunciar a mudança de estado (ex: "Conteúdo carregando..." ou "Conteúdo atualizado."). Esta é uma medida proativa para garantir que os usuários sejam notificados sobre alterações importantes na página, mesmo que não estejam interagindo diretamente com o componente.
*   **Estados**:
    *   **Carregando (Loading)**: Estado padrão do DssSkeleton, com animação ativa. Neste estado, o componente exibe o placeholder visual e a animação configurada para indicar que o conteúdo está sendo processado ou buscado.
    *   **Pronto (Loaded)**: O DssSkeleton é removido e o conteúdo real é exibido. A transição entre o skeleton e o conteúdo final deve ser suave e sem saltos visuais, proporcionando uma experiência de usuário contínua.
    *   **Erro (Error)**: O DssSkeleton pode ser substituído por um componente de erro ou uma mensagem, indicando que o carregamento falhou. Este estado é crucial para informar o usuário sobre problemas e oferecer opções de recuperação ou retry.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

*   **Dependências**: O DssSkeleton deve ter dependência mínima, idealmente apenas dos tokens de design do DSS e de uma biblioteca de animação CSS leve, se necessário. Não deve depender de componentes complexos do Quasar, garantindo sua leveza e portabilidade. A minimização de dependências é uma prática essencial para manter o Design System modular e eficiente.
*   **Composição**: O DssSkeleton é um componente de baixo nível, projetado para ser composto dentro de outros componentes ou layouts mais complexos. Pode ser usado para simular a estrutura de:
    *   Cards (`DssCard`): Simular o carregamento de um card completo, incluindo título, imagem e texto.
    *   Listas (`DssList`, `DssListItem`): Representar itens individuais de uma lista enquanto são carregados, melhorando a percepção de desempenho em grandes conjuntos de dados.
    *   Avatares (`DssAvatar`): Criar placeholders para imagens de perfil ou ícones de usuário.
    *   Textos (`DssTypography`): Simular blocos de texto de diferentes tamanhos e formatos.
    *   Imagens (`DssImage`): Indicar o carregamento de imagens, evitando o 
"layout shift" quando a imagem final é renderizada.

## 7. EXCEÇÕES PREVISTAS

*   **Conteúdo Estático Rápido**: Para carregamentos extremamente rápidos (milissegundos), o uso do DssSkeleton pode causar um "flash" visual indesejado. Nesses casos, é preferível não exibir o skeleton ou utilizar um pequeno atraso (delay) antes de mostrá-lo, garantindo que ele só apareça se o carregamento demorar mais do que um limite predefinido (ex: 200ms).
*   **Aplicações de Baixa Conectividade**: Em cenários de conectividade muito lenta, o skeleton pode permanecer visível por um longo período. É importante considerar a implementação de timeouts ou mensagens de erro após um determinado tempo para evitar que o usuário fique esperando indefinidamente.

## 8. SUPERFÍCIE DE PLAYGROUND

O DssSkeleton, como um componente não-interativo, foca em fornecer feedback visual de carregamento. A superfície de playground deve demonstrar suas variações de forma, tamanho e animação em diferentes contextos de uso, permitindo que os desenvolvedores testem e visualizem o comportamento do componente em tempo real.

### Controles Obrigatórios

*   **Tipo (variant)**: Seletores para `text`, `rect`, `circle`, `heading`, `avatar`. Permite alternar entre as diferentes formas visuais do skeleton.
*   **Largura (width)**: Input numérico ou slider para ajustar a largura (e.g., de `--dss-spacing-8` a `--dss-spacing-96`). Facilita a visualização de como o skeleton se adapta a diferentes tamanhos de contêiner.
*   **Altura (height)**: Input numérico ou slider para ajustar a altura (e.g., de `--dss-spacing-4` a `--dss-spacing-32`). Permite testar a proporção do skeleton em relação ao conteúdo simulado.
*   **Linhas (lines)**: Input numérico para `variant='text'`, de 1 a 5. Demonstra a capacidade do skeleton de simular blocos de texto de diferentes tamanhos.
*   **Animação (animation)**: Seletores para `wave`, `pulse`, `none`. Permite visualizar os diferentes efeitos de animação disponíveis.
*   **Borda (bordered)**: Toggle `true`/`false`. Demonstra a adição de bordas ao skeleton.
*   **Raio (radius)**: Seletores para `--dss-radius-sm`, `--dss-radius-md`, `--dss-radius-lg`, `--dss-radius-full`. Permite testar o arredondamento dos cantos do skeleton.

### Composite Logic

Para demonstrar a `Composite Logic` do DssSkeleton, podemos simular o carregamento de um `DssCard` com um `DssAvatar`, um `DssHeading` e algumas linhas de `DssText`. A lógica aqui é que o DssSkeleton se adapta para preencher o espaço e a forma dos componentes que ele está substituindo temporariamente. Por exemplo, um `DssSkeleton` com `variant='avatar'` e `width/height` de `--dss-spacing-32` simularia um `DssAvatar`. Um `DssSkeleton` com `variant='heading'` e `width` de `--dss-spacing-64` e `height` de `--dss-spacing-8` simularia um título. Múltiplos `DssSkeleton` com `variant='text'` e `width` variáveis e `height` de `--dss-spacing-4` simulariam blocos de texto. A animação deve ser sincronizada entre os múltiplos skeletons dentro do `DssCard` simulado, criando uma experiência visual coesa e profissional.

### Estados a Expor

| Estado | Descrição |
| :--- | :--- |
| **Carregando Avatar** | `DssSkeleton` com `variant='avatar'`, `width='--dss-spacing-32'`, `height='--dss-spacing-32'`, `animation='wave'`. Simula o carregamento de uma imagem de perfil. |
| **Carregando Título** | `DssSkeleton` com `variant='heading'`, `width='--dss-spacing-64'`, `height='--dss-spacing-8'`, `animation='pulse'`. Simula o carregamento de um título principal. |
| **Carregando Texto** | `DssSkeleton` com `variant='text'`, `lines=3`, `animation='wave'`. Simula o carregamento de um parágrafo de texto. |
| **Carregando Card** | Composição de múltiplos `DssSkeleton` (avatar, título, texto) dentro de um contêiner com borda, simulando o carregamento de um card completo. |
| **Estático (Sem Animação)** | `DssSkeleton` com `variant='rect'`, `width='--dss-spacing-48'`, `height='--dss-spacing-48'`, `animation='none'`. Demonstra o placeholder sem efeito visual de carregamento. |
| **Com Borda** | `DssSkeleton` com `variant='rect'`, `width='--dss-spacing-48'`, `height='--dss-spacing-48'`, `bordered=true`. Demonstra o skeleton com contorno visual. |
| **Raio Customizado** | `DssSkeleton` com `variant='rect'`, `width='--dss-spacing-48'`, `height='--dss-spacing-48'`, `radius='--dss-radius-full'`. Demonstra a aplicação de cantos arredondados. |
| **Tema Hub** | `DssSkeleton` utilizando a cor de superfície `--dss-action-hub-surface`. |
| **Tema Water** | `DssSkeleton` utilizando a cor de superfície `--dss-action-water-surface`. |
| **Tema Waste** | `DssSkeleton` utilizando a cor de superfície `--dss-action-waste-surface`. |
