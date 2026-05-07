# Pré-prompt: DssScrollArea

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
O `DssScrollArea` é um componente não-interativo que encapsula conteúdo, provendo uma área de rolagem controlada. Sua referência dourada é o `DssBadge`, devido à sua natureza de invólucro e não de interação direta com o usuário para manipulação de dados ou ações primárias.

### Golden Context
Em sistemas de design, a consistência visual e funcional das áreas de rolagem é crucial para a experiência do usuário. O `DssScrollArea` visa padronizar a forma como o conteúdo rolável é apresentado e se comporta em toda a aplicação, garantindo que a rolagem seja suave, acessível e visualmente alinhada com o restante do Design System. Ele atua como um contêiner para conteúdo que excede as dimensões visíveis de seu pai, oferecendo mecanismos de rolagem vertical e/ou horizontal.

### Justificativa
A necessidade de um `DssScrollArea` surge da inconsistência inerente aos mecanismos de rolagem nativos dos navegadores e da complexidade de implementar rolagem personalizada que seja performática e acessível. Este componente centraliza a lógica de rolagem, estilização dos *scrollbars* (quando necessário e permitido pelo DSS) e garante que o comportamento de rolagem seja previsível e otimizado, especialmente em cenários com grandes volumes de dados ou layouts complexos. Ele também abstrai as diferenças entre as implementações de rolagem do Quasar e as diretrizes do DSS, oferecendo uma API simplificada e consistente para os desenvolvedores.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
*   **Performance**: Rolagem de grandes listas ou conteúdo dinâmico pode impactar a performance, especialmente em dispositivos de baixo poder. A renderização de muitos elementos fora da tela pode causar lentidão.
*   **Aninhamento de ScrollAreas**: O aninhamento de múltiplas áreas de rolagem pode levar a comportamentos de rolagem confusos ou indesejados e problemas de acessibilidade.
*   **Compatibilidade entre Navegadores**: A estilização e o comportamento dos *scrollbars* podem variar significativamente entre navegadores, exigindo soluções de *fallback* ou abstrações complexas.
*   **Acessibilidade**: Garantir que o conteúdo rolável seja totalmente acessível via teclado e leitores de tela, sem prender o foco ou dificultar a navegação.

### Gates
*   **Performance Benchmark**: O componente deve passar por testes de performance com grandes volumes de dados (e.g., 1000+ itens) em diferentes navegadores, mantendo 60 FPS. Testes de *stress* para rolagem rápida e aninhada.
*   **Auditoria de Acessibilidade**: Conclusão de uma auditoria de acessibilidade (WCAG 2.1 AA) para garantir que todos os aspectos de rolagem, foco e interação via teclado estejam em conformidade.
*   **Testes de Regressão Visual**: Implementação de testes de regressão visual para garantir a consistência da estilização dos *scrollbars* e do comportamento de rolagem em diferentes ambientes e navegadores.
*   **Documentação Completa**: Documentação clara sobre o uso, limitações e melhores práticas para evitar aninhamento excessivo e garantir a performance.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssScrollArea` abstrairá o `QScrollArea` do Quasar, expondo uma API simplificada e alinhada com as necessidades do Design System. Abaixo, um mapeamento proposto:

| Quasar (QScrollArea) Prop/Slot/Event | DSS (DssScrollArea) Prop/Slot/Event | Descrição | Notas |
| :----------------------------------- | :---------------------------------- | :-------- | :---- |
| `visible` (prop)                     | `visible` (prop)                    | Controla a visibilidade dos *scrollbars*. | Padrão `auto` no DSS. |
| `horizontal` (prop)                  | `horizontal` (prop)                 | Habilita rolagem horizontal. | Booleano. |
| `vertical` (prop)                    | `vertical` (prop)                   | Habilita rolagem vertical. | Booleano. |
| `bar-delay` (prop)                   | `barDelay` (prop)                   | Atraso para ocultar os *scrollbars*. | Usará `--dss-duration-250` como padrão. |
| `scroll-target` (prop)               | `scrollTarget` (prop)               | Elemento alvo para rolagem. | Pode ser um seletor CSS ou referência a um elemento. |
| `content-style` (prop)               | `contentClass` (prop)               | Classes CSS para o conteúdo interno. | Para estilização flexível. |
| `content-active-style` (prop)        | N/A                                 | Estilo quando o conteúdo está ativo. | Não exposto diretamente, gerenciado internamente. |
| `scroll` (event)                     | `scroll` (event)                    | Emitido durante a rolagem. | Objeto de evento com `position`, `direction`, etc. |
| `scrollPosition` (method)            | `scrollTo` (method)                 | Rola para uma posição específica. | Aceita `x`, `y` ou um objeto `{ top, left }`. |
| `getScrollPosition` (method)         | `getScrollPosition` (method)        | Retorna a posição atual de rolagem. | Objeto `{ top, left }`. |
| `getScrollTarget` (method)           | `getScrollTarget` (method)          | Retorna o elemento alvo de rolagem. | |
| `__slot__` (default)                 | `default` (slot)                    | Conteúdo a ser rolado. | |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssScrollArea` utilizará exclusivamente tokens numéricos e padrão do DSS para sua estilização, garantindo consistência e aderência ao sistema de design. Não serão permitidos tokens com sufixos semânticos não existentes.

### Tokens de Espaçamento
*   `--dss-spacing-4`: Utilizado para o espaçamento interno (padding) do contêiner de rolagem, se aplicável, ou para margens de elementos internos para evitar que o conteúdo toque as bordas do *scrollarea*.
*   `--dss-spacing-8`: Para espaçamentos maiores, como entre o *scrollarea* e outros componentes adjacentes.

### Tokens de Raio
*   `--dss-radius-md`: Aplicado às bordas do `DssScrollArea` para manter a consistência visual com outros componentes do DSS que possuem cantos arredondados.

### Tokens de Cor de Superfície
*   `--dss-surface-default`: Utilizado como cor de fundo padrão para a área de rolagem, garantindo que o contraste e a identidade visual sejam mantidos.

### Tokens de Duração
*   `--dss-duration-250`: Para a transição de ocultação/exibição dos *scrollbars* (barDelay), proporcionando uma experiência de usuário suave e não abrupta.

### Exemplo de Aplicação de Tokens (CSS hipotético)
```css
.dss-scroll-area {
  border-radius: var(--dss-radius-md);
  background-color: var(--dss-surface-default);
  padding: var(--dss-spacing-4);
  /* Outros estilos como largura, altura, etc. */
}

.dss-scroll-area__bar {
  transition: opacity var(--dss-duration-250) ease-in-out;
}
```

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
*   **Navegação por Teclado**: O conteúdo dentro do `DssScrollArea` deve ser navegável por teclado (Tab, Shift+Tab) de forma lógica. A rolagem deve ser controlável via setas do teclado (Up, Down, Page Up, Page Down, Home, End) quando o foco estiver dentro da área de rolagem.
*   **Atributos ARIA**: Utilização de `role="region"` e `aria-labelledby` ou `aria-label` para identificar a área de rolagem para leitores de tela. Se o conteúdo for um fluxo contínuo, `aria-live` pode ser considerado para atualizações dinâmicas.
*   **Foco**: Garantir que o foco não seja "preso" dentro do `DssScrollArea` e que os usuários possam sair da área de rolagem facilmente.
*   **Contraste**: As barras de rolagem (se estilizadas) e o conteúdo devem ter contraste suficiente para atender aos requisitos de WCAG.

### Estados
*   **Padrão**: Estado inicial, com ou sem *scrollbars* visíveis, dependendo do conteúdo e da prop `visible`.
*   **Rolando**: Estado durante a interação de rolagem, onde os *scrollbars* podem estar visíveis.
*   **Topo da Rolagem**: Estado quando o conteúdo está totalmente rolado para o início (topo/esquerda).
*   **Fim da Rolagem**: Estado quando o conteúdo está totalmente rolado para o final (base/direita).
*   **Desabilitado**: Se o `DssScrollArea` puder ser desabilitado, o que impediria a rolagem e alteraria a aparência dos *scrollbars*.
*   **Foco**: Estado quando o `DssScrollArea` ou seu conteúdo interativo recebe foco, indicando que a rolagem pode ser controlada via teclado.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas do DSS
*   **DssResizeObserver**: Pode ser uma dependência interna para detectar mudanças no tamanho do conteúdo ou do próprio `DssScrollArea`, ajustando dinamicamente a visibilidade dos *scrollbars* ou o comportamento de rolagem. (A ser avaliado se necessário).
*   **DssFocusTrap**: Se houver cenários onde o foco precisa ser contido temporariamente dentro do `DssScrollArea` (e.g., modais com conteúdo rolável).

### Composição com Outros Componentes
O `DssScrollArea` é um componente de composição, projetado para envolver outros componentes do DSS ou conteúdo HTML padrão. Exemplos incluem:
*   Envolvendo um `DssCard` com conteúdo extenso.
*   Contendo uma `DssList` ou `DssTable` com muitos itens.
*   Dentro de um `DssDialog` ou `DssDrawer` para gerenciar o conteúdo rolável desses modais.
*   Em layouts complexos onde seções específicas precisam de rolagem independente.

## 7. EXCEÇÕES PREVISTAS

*   **Scroll Hijacking**: O `DssScrollArea` não deve ser utilizado para "sequestrar" o comportamento de rolagem nativo do navegador de forma que impeça o usuário de rolar a página principal. Seu uso deve ser restrito a áreas específicas do layout.
*   **Estilização de Scrollbar em Navegadores Específicos**: Embora o `DssScrollArea` possa tentar padronizar a aparência dos *scrollbars*, pode haver limitações ou inconsistências em navegadores que não suportam estilização completa (e.g., Firefox). Nesses casos, o comportamento nativo será priorizado ou um *fallback* elegante será aplicado.
*   **Conteúdo com `position: fixed` ou `sticky`**: Elementos com `position: fixed` ou `sticky` dentro de um `DssScrollArea` podem ter comportamentos inesperados devido ao contexto de rolagem. Recomenda-se evitar essa combinação ou testar exaustivamente.
*   **Aninhamento Profundo**: Embora o aninhamento seja um risco arquitetural, em casos de exceção onde é inevitável, a documentação deve fornecer diretrizes claras sobre como gerenciar o foco e a rolagem para evitar problemas de usabilidade e acessibilidade.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles
O playground do `DssScrollArea` deve expor os seguintes controles para demonstração e teste:
*   **Prop `visible`**: Um *toggle* para alternar entre `auto`, `always`, `hidden` (se implementado).
*   **Prop `horizontal`**: Um *toggle* para habilitar/desabilitar a rolagem horizontal.
*   **Prop `vertical`**: Um *toggle* para habilitar/desabilitar a rolagem vertical.
*   **Prop `barDelay`**: Um *slider* ou campo de entrada para ajustar o atraso de ocultação das barras de rolagem, com valores baseados em `--dss-duration-*`.
*   **Slot `default`**: Um editor de texto para inserir conteúdo arbitrário e testar diferentes tamanhos e tipos de conteúdo.
*   **Botão "Scroll to Top"**: Um botão para rolar programaticamente o conteúdo para o topo.
*   **Botão "Scroll to Bottom"**: Um botão para rolar programaticamente o conteúdo para a base.
*   **Botão "Scroll to Position (X, Y)"**: Campos de entrada para X e Y e um botão para rolar para uma posição específica.

### Composite Logic
*   **Simulação de Conteúdo Dinâmico**: Demonstração de como o `DssScrollArea` se comporta quando o conteúdo é adicionado ou removido dinamicamente, ajustando automaticamente os *scrollbars*.
*   **Infinite Scroll**: Um exemplo de implementação de "infinite scroll" onde mais conteúdo é carregado quando o usuário atinge o final da rolagem.
*   **Sincronização de Rolagem**: Demonstração de dois `DssScrollArea`s rolando em sincronia (e.g., uma tabela com cabeçalho fixo e corpo rolável).

### Estados a Expor
O playground deve exibir visualmente ou através de *badges* os seguintes estados do `DssScrollArea`:
*   `isScrolledToTop`: Booleano indicando se o conteúdo está no topo da rolagem.
*   `isScrolledToBottom`: Booleano indicando se o conteúdo está na base da rolagem.
*   `isScrolledToLeft`: Booleano indicando se o conteúdo está na esquerda da rolagem (para rolagem horizontal).
*   `isScrolledToRight`: Booleano indicando se o conteúdo está na direita da rolagem (para rolagem horizontal).
*   `hasScrollbars`: Booleano indicando se os *scrollbars* estão visíveis no momento.