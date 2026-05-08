# Pré-prompt: DssCarousel

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
Para o `DssCarousel`, a **Golden Reference** é o `DssChip`, devido à sua natureza interativa e à necessidade de gerenciar estados e interações complexas com o usuário, como navegação e seleção de itens.

### Golden Context
O `DssCarousel` é um componente fundamental para a exibição eficiente de múltiplos itens ou conteúdos em um espaço limitado, permitindo que o usuário navegue por eles de forma sequencial. Ele é ideal para galerias de imagens, destaques de produtos, depoimentos ou qualquer conjunto de informações que se beneficie de uma apresentação rotativa e compacta. Sua implementação deve garantir performance, responsividade e uma experiência de usuário fluida em diferentes dispositivos e tamanhos de tela, mantendo a consistência visual e funcional do Design System.

### Justificativa
A necessidade de um `DssCarousel` surge da demanda por apresentar grandes volumes de conteúdo de forma organizada e acessível, otimizando o espaço na interface. Ele melhora a usabilidade ao reduzir a rolagem vertical excessiva e permite destacar informações importantes de maneira dinâmica. A padronização via DSS garante que todos os carrosséis da aplicação compartilhem a mesma base de acessibilidade, performance e estilo, facilitando a manutenção e a consistência da marca.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
*   **Performance**: Carrosséis com muitos itens ou itens complexos (imagens de alta resolução, vídeos) podem impactar negativamente o tempo de carregamento e a fluidez da navegação.
*   **Acessibilidade**: Falha em fornecer navegação por teclado adequada, indicadores de foco visíveis e descrições ARIA para leitores de tela.
*   **Responsividade**: Comportamento inconsistente em diferentes tamanhos de tela, resultando em cortes de conteúdo ou navegação difícil.
*   **Interferência com outros componentes**: Potenciais conflitos de eventos ou estilos com componentes aninhados ou adjacentes.

### Gates
*   **Performance**: Testes de carregamento e renderização com 10+ itens, garantindo um tempo de resposta inferior a 200ms para transições.
*   **Acessibilidade**: Auditoria de acessibilidade (WCAG 2.1 AA) com foco em navegação por teclado, contraste e semântica ARIA.
*   **Responsividade**: Testes em pelo menos 3 breakpoints (mobile, tablet, desktop) para garantir layout e funcionalidade corretos.
*   **Testes de Integração**: Validação do comportamento do carrossel quando combinado com outros componentes DSS.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

| Funcionalidade Quasar | Propriedade/Slot/Evento DSS (Exemplo) |
| :-------------------- | :------------------------------------ |
| `v-model` (current slide) | `v-model:currentSlide`                |
| `slides` (array of items) | `items` (Array de objetos)            |
| `arrows` (navigation)     | `showNavigationArrows` (Boolean)      |
| `navigation` (dots)       | `showPaginationDots` (Boolean)        |
| `autoplay`                | `autoplayInterval` (Number, ms)       |
| `infinite`                | `loop` (Boolean)                      |
| `transition`              | `transitionEffect` (String)           |
| `height`                  | `height` (String, ex: '200px', 'auto')|
| `control-color`           | `navigationColor` (String, token)     |
| `control-text-color`      | `paginationColor` (String, token)     |
| `prev` (slot)             | `slot:prevArrow`                      |
| `next` (slot)             | `slot:nextArrow`                      |
| `@before-slide-change`    | `@beforeSlideChange`                  |
| `@slide-change`           | `@slideChange`                        |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssCarousel` deve utilizar exclusivamente os tokens numéricos/padrão do DSS para espaçamento, raio e duração, garantindo a consistência visual e a manutenibilidade. Não serão permitidos tokens com sufixos semânticos não existentes.

### Exemplos de Uso de Tokens:
*   **Espaçamento interno/externo**: `--dss-spacing-8` (para padding ou margin entre elementos do carrossel).
*   **Raio das bordas**: `--dss-radius-md` (para cantos arredondados dos itens ou do próprio carrossel).
*   **Duração da transição**: `--dss-duration-250` (para a velocidade da animação de troca de slide).
*   **Cores de superfície**: `--dss-surface-default` (para o fundo do carrossel ou dos indicadores).
*   **Cores de texto/ícones**: `--dss-text-hub` (para a cor dos ícones de navegação ou texto dos indicadores).
*   **Ação Principal**: `--dss-action-hub` e `--dss-action-hub-surface` para botões de ação dentro do carrossel.
*   **Foco**: `outline: 2px solid white` para o anel de foco.
*   **Espaçamento Menor**: `--dss-spacing-4` para pequenos ajustes.
*   **Texto Sutil**: `--dss-text-subtle` para descrições secundárias.

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
*   **Navegação por Teclado**: Usuários devem ser capazes de navegar entre os slides e controles (setas, paginação) usando `Tab`, `Shift+Tab`, `Enter` e teclas de seta.
*   **ARIA Attributes**: Implementar `role="region"` para o carrossel, `aria-live="polite"` para anúncios de slide, `aria-label` para navegação e `aria-current="true"` para o slide ativo.
*   **Contraste**: Garantir contraste adequado para textos e ícones de navegação conforme WCAG 2.1 AA.
*   **Foco Visível**: Indicar claramente o elemento focado para usuários de teclado.

### Estados
*   **Normal**: Estado padrão do carrossel.
*   **Hover**: Estado dos controles de navegação (setas, pontos de paginação) quando o mouse passa sobre eles.
*   **Focus**: Estado dos controles de navegação quando focados via teclado.
*   **Ativo**: Estado do slide atualmente visível e do ponto de paginação correspondente.
*   **Desabilitado**: Estado dos botões de navegação quando não há mais slides para avançar/retroceder (se `loop` for `false`).

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas do DSS
*   `DssButton`: Para os botões de navegação (setas).
*   `DssIcon`: Para os ícones das setas de navegação.
*   `DssIndicator` (proposto): Para os pontos de paginação do carrossel.

### Composição
O `DssCarousel` é composto por um contêiner principal, os slides (que podem conter qualquer conteúdo), botões de navegação (opcionais) e indicadores de paginação (opcionais). A estrutura deve ser flexível para permitir a injeção de diferentes tipos de conteúdo nos slides.

## 7. EXCEÇÕES PREVISTAS

*   **Número Mínimo de Slides**: O carrossel pode ter um comportamento degenerado ou desabilitar a navegação se houver apenas um slide ou menos do que o número de slides visíveis simultaneamente.
*   **Conteúdo Misto**: A altura do carrossel pode precisar ser ajustada dinamicamente se os slides contiverem conteúdo de alturas variadas, o que pode impactar a experiência visual.
*   **Interação com Drag/Swipe**: A funcionalidade de arrastar/deslizar para navegação pode ser desabilitada em certos contextos (ex: quando o conteúdo do slide é arrastável).

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios
*   `currentSlide` (v-model): Número do slide atualmente visível.
*   `items`: Array de dados para popular os slides.
*   `showNavigationArrows`: Booleano para exibir/ocultar as setas de navegação.
*   `showPaginationDots`: Booleano para exibir/ocultar os pontos de paginação.
*   `autoplayInterval`: Número em milissegundos para o autoplay (0 para desabilitar).
*   `loop`: Booleano para ativar/desativar o loop infinito.
*   `transitionEffect`: String para selecionar o tipo de transição (ex: 'slide', 'fade').
*   `height`: String para definir a altura do carrossel (ex: '200px', 'auto').

### Composite Logic
*   A visibilidade das setas de navegação e dos pontos de paginação pode ser controlada independentemente.
*   O `autoplayInterval` interage com `loop`: se `loop` for `false` e o carrossel chegar ao fim, o autoplay deve parar.
*   A `height` pode ser fixa ou adaptativa, dependendo do conteúdo dos slides.

### Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `currentSlideIndex` | O índice do slide atualmente ativo. | Visual | — |
| `isAutoplaying` | Booleano indicando se o autoplay está ativo. | Visual | — |
| `isHovering` | Booleano indicando se o mouse está sobre o carrossel. | Visual | Mouse over |

---
*Nota: Este documento foi revisado para garantir conformidade com as diretrizes de nomenclatura de brand (hub, water, waste) e substituição de tokens fantasmas.*
