Pré-prompt: DssVirtualScroll

## 1. CLASSIFICAÇÃO E CONTEXTO

**Golden Reference:** DssBadge (para aspectos de exibição de itens não-interativos) e DssChip (para interatividade de rolagem e seleção, se aplicável).
**Golden Context:** O `DssVirtualScroll` é um componente de navegação e exibição de dados projetado para renderizar listas massivas de forma eficiente. Ele se posiciona como a solução padrão do Design System para lidar com grandes volumes de itens (tabelas, listas, feeds) sem comprometer a performance do DOM, renderizando apenas os elementos visíveis na viewport.

**Justificativa:** A renderização de milhares de nós no DOM degrada severamente a performance da aplicação, causando travamentos, alto consumo de memória e uma experiência de usuário ruim, especialmente em dispositivos móveis ou com recursos limitados. O `DssVirtualScroll` encapsula a complexidade da virtualização, oferecendo uma API simplificada e alinhada ao DSS para garantir rolagem fluida (60fps) e baixo consumo de memória, mantendo a consistência visual com os demais componentes de lista e dados. Ele atua como um wrapper otimizado, garantindo que as regras de negócio e de design do sistema sejam aplicadas de forma consistente, sem a necessidade de os desenvolvedores implementarem lógicas complexas de virtualização manualmente. A adoção deste componente é crucial para manter a performance e a usabilidade em aplicações que lidam com grandes volumes de dados, evitando a necessidade de soluções customizadas e inconsistentes.

## 2. RISCOS ARQUITETURAIS E GATES

*   **Risco de Performance com Alturas Dinâmicas:** Itens com alturas variáveis podem causar saltos na rolagem ou cálculos excessivos, prejudicando a experiência do usuário. O cálculo constante da altura de cada item renderizado pode sobrecarregar a thread principal do navegador, levando a quedas na taxa de quadros (FPS).
    *   **Gate:** O componente deve suportar alturas dinâmicas, mas deve incentivar o uso de alturas fixas sempre que possível através de propriedades de configuração. A documentação deve alertar sobre o impacto na performance ao usar alturas dinâmicas em listas muito grandes e fornecer exemplos de como otimizar esses cenários, como a pré-determinação de alturas ou o uso de estimativas.
*   **Risco de Perda de Estado:** Ao reciclar nós do DOM, o estado interno de componentes filhos pode ser perdido, resultando em comportamentos inesperados (ex: inputs perdendo o valor digitado, componentes de expansão fechando inesperadamente). Isso ocorre porque os elementos DOM são removidos e reinseridos, perdendo seu estado interno.
    *   **Gate:** Documentar claramente a necessidade de gerenciar o estado fora dos itens da lista (ex: usando chaves únicas e stores como Pinia ou Vuex). O componente deve garantir que a propriedade `key` seja utilizada corretamente na renderização dos itens, forçando a re-renderização quando necessário e preservando o estado lógico.
*   **Risco de Acessibilidade:** Listas virtualizadas podem ocultar o tamanho real da lista para leitores de tela, prejudicando a navegação de usuários com deficiência visual, que podem não ter a percepção do tamanho total do conjunto de dados. Isso pode levar a uma experiência de usuário frustrante e não inclusiva.
    *   **Gate:** Implementar atributos ARIA adequados (`aria-setsize`, `aria-posinset`) para comunicar o contexto total ao usuário. O componente deve calcular e injetar esses atributos automaticamente nos itens renderizados, garantindo conformidade com as diretrizes WCAG (Web Content Accessibility Guidelines) e proporcionando uma experiência equitativa.
*   **Risco de Acoplamento:** Dependência excessiva de implementações específicas do Quasar pode dificultar futuras migrações ou atualizações do framework base, tornando o Design System menos flexível e mais custoso para evoluir.
    *   **Gate:** A API exposta deve ser agnóstica em relação ao Quasar sempre que possível, mapeando as propriedades e eventos para a nomenclatura padrão do DSS. Isso facilita a manutenção e a evolução do Design System a longo prazo, permitindo a substituição do framework subjacente com mínimo impacto.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssVirtualScroll` atua como um wrapper otimizado sobre o `q-virtual-scroll` do Quasar, adaptando sua API para os padrões do Design System e ocultando complexidades desnecessárias, oferecendo uma interface mais limpa e consistente.

### Propriedades (Props)

*   `items` (Quasar) ➔ `items` (DSS): Array de dados a serem renderizados. Deve aceitar arrays de objetos ou tipos primitivos. É a fonte de verdade para a renderização da lista e deve ser reativo.
*   `virtual-scroll-item-size` (Quasar) ➔ `itemSize` (DSS): Tamanho padrão do item (altura para rolagem vertical, largura para horizontal). Deve aceitar valores numéricos (pixels). Crucial para o cálculo inicial da área de rolagem e para a otimização da virtualização.
*   `virtual-scroll-sticky-size-start` / `virtual-scroll-sticky-size-end` (Quasar) ➔ Omitidos/Simplificados: Gerenciados internamente se necessário, ou expostos apenas se houver caso de uso claro no DSS, para evitar sobrecarga na API e manter a simplicidade. Caso expostos, devem seguir a nomenclatura DSS.
*   `type` (Quasar) ➔ `type` (DSS): Define se é uma lista (`list`) ou tabela (`table`). O padrão deve ser `list`. Afeta a semântica e a renderização interna, como a aplicação de roles ARIA e estilos específicos.
*   `scroll-target` (Quasar) ➔ `scrollTarget` (DSS): Elemento alvo para a rolagem. Pode ser um seletor CSS ou uma referência a um elemento DOM. Útil quando a rolagem deve ocorrer em um container pai, e não no próprio componente.
*   `virtual-scroll-slice-size` (Quasar) ➔ `sliceSize` (DSS): Número de itens a serem renderizados no DOM de uma vez. Omitido por padrão, exposto apenas para ajustes finos de performance em casos específicos onde o comportamento padrão não é suficiente.
*   `virtual-scroll-slice-ratio-before` / `virtual-scroll-slice-ratio-after` (Quasar) ➔ Omitidos: Gerenciados internamente com valores otimizados para a maioria dos casos de uso, garantindo uma boa experiência sem exigir configuração manual e reduzindo a complexidade para o desenvolvedor.

### Eventos (Events)

*   `@virtual-scroll` (Quasar) ➔ `@scroll` (DSS): Evento emitido durante a rolagem, padronizado para o DSS. O payload deve conter informações sobre o índice atual, a posição de rolagem e a direção, permitindo a implementação de lógicas customizadas (ex: carregar mais itens, lazy loading).
*   `@scroll` (Quasar) ➔ `@native-scroll` (DSS): Evento de rolagem nativo do container, exposto para casos de uso avançados onde o acesso direto ao evento DOM é necessário para manipulações específicas.

### Slots

*   `default` (Quasar) ➔ `default` (DSS): Slot principal para renderizar cada item da lista. O escopo do slot deve fornecer o item atual, o índice e os atributos ARIA necessários, permitindo total flexibilidade na renderização e na composição de layouts complexos.
*   `before` / `after` (Quasar) ➔ `prepend` / `append` (DSS): Slots para adicionar conteúdo antes ou depois da lista virtualizada (ex: cabeçalhos fixos, rodapés, loaders, mensagens de 
erro). Úteis para compor layouts complexos e fornecer feedback ao usuário.

## 4. GOVERNANÇA DE TOKENS E CSS

O componente deve utilizar estritamente os tokens do DSS para garantir consistência visual e facilitar a manutenção. O uso de valores hardcoded ou tokens inexistentes é estritamente proibido, a fim de manter a integridade do Design System e permitir alterações globais de estilo de forma centralizada.

*   **Espaçamento:**
    *   Padding interno do container (se aplicável): `--dss-spacing-4` (equivalente a 16px). Utilizado para criar um respiro entre o conteúdo e as bordas do componente.
    *   Espaçamento entre itens (gap): `--dss-spacing-2` (equivalente a 8px). Garante uma separação visual clara entre os elementos da lista.
*   **Superfície e Cores:**
    *   Fundo do container: `--dss-surface-default`. Define a cor de fundo principal do componente, alinhada à paleta de superfícies do DSS.
    *   Cor da barra de rolagem (customização via CSS): `--dss-surface-sunken`. Proporciona uma barra de rolagem discreta e harmoniosa com o restante da interface.
    *   Cor de destaque (interação): `--dss-action-hub`. Utilizada para elementos interativos ou em estados de foco/hover, indicando ação primária.
    *   Cor de fundo de destaque: `--dss-action-hub-surface`. Complementa a cor de destaque, sendo aplicada em áreas de fundo de elementos interativos.
    *   Cor de texto sutil: `--dss-text-subtle`. Ideal para textos secundários, descrições ou informações menos proeminentes.
*   **Bordas e Raios:**
    *   Raio do container (se encapsulado em um card): `--dss-radius-md`. Aplica um arredondamento médio nas bordas, conferindo um visual moderno e suave.
    *   Foco (acessibilidade): `outline: 2px solid white`. Garante que o elemento em foco seja claramente visível, essencial para a navegação por teclado. Em ambientes de alto contraste, esta regra pode ser ajustada para `outline: 2px solid var(--dss-action-hub)`.
*   **Animações/Transições:**
    *   Transições de estado de carregamento: `--dss-duration-250`. Define a duração padrão para animações de carregamento, proporcionando uma experiência fluida e sem interrupções bruscas.

*Nota: Não inventar tokens como `--dss-spacing-4` ou `--dss-duration-base`. Utilize apenas os tokens oficiais documentados no DSS, que são mantidos centralmente e garantem a consistência em todo o ecossistema.*

## 5. ACESSIBILIDADE E ESTADOS

A acessibilidade é um requisito fundamental para o `DssVirtualScroll`, garantindo que todos os usuários possam interagir com o componente de forma eficiente e inclusiva, independentemente de suas capacidades ou tecnologias assistivas.

*   **Acessibilidade (a11y):**
    *   O container deve possuir `role="list"` ou `role="table"` dependendo do tipo configurado na propriedade `type`, fornecendo o contexto correto para tecnologias assistivas como leitores de tela. Isso ajuda a estruturar a informação de forma compreensível.
    *   Os itens renderizados devem possuir `role="listitem"` ou `role="row"`, garantindo a semântica adequada para cada elemento dentro da lista ou tabela virtualizada.
    *   É obrigatório o uso de `aria-setsize` no container para indicar o número total de itens, e `aria-posinset` em cada item renderizado para indicar sua posição real na lista. O componente deve gerenciar esses atributos automaticamente, aliviando o desenvolvedor dessa responsabilidade e garantindo a conformidade com as diretrizes WCAG 2.1 Nível AA.
    *   Suporte a navegação por teclado (setas para cima/baixo) para focar itens dentro da área visível. O foco deve ser gerenciado de forma a não prender o usuário dentro da lista, permitindo a navegação fluida para outros elementos da página através de `Tab` e `Shift+Tab`.
    *   O estado de foco deve ser claramente visível, utilizando a regra `outline: 2px solid white` (ou o token apropriado para foco, como `--dss-focus-ring-color`), garantindo que usuários que navegam por teclado saibam exatamente onde estão e qual elemento está ativo.

*   **Estados:**
    *   **Loading:** Exibição de skeleton loaders ou spinner enquanto os dados iniciais ou adicionais são carregados. O componente deve aceitar uma propriedade `loading` para ativar este estado, bloqueando interações se necessário e fornecendo feedback visual ao usuário sobre o processo em andamento.
    *   **Empty:** Estado visual claro quando a lista de `items` estiver vazia. Deve exibir uma mensagem amigável ou um componente `DssEmptyState`, orientando o usuário sobre o motivo da lista estar vazia e, se aplicável, sugerindo ações para preenchê-la.
    *   **Error:** Feedback visual caso ocorra falha ao carregar mais itens (em cenários de infinite scroll combinados). Deve permitir a tentativa de recarregamento através de um botão de ação claro, informando o usuário sobre o erro e oferecendo uma solução.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

O `DssVirtualScroll` foi projetado para ser altamente combinável com outros componentes do ecossistema DSS, promovendo a reutilização, a consistência e a modularidade no desenvolvimento de interfaces.

*   **Dependências Quasar:** `QVirtualScroll`. O componente deve importar apenas o necessário do Quasar para minimizar o bundle size e evitar dependências desnecessárias, mantendo o componente leve e performático.
*   **Composição DSS:**
    *   Pode compor com `DssSkeleton` para estados de carregamento. O slot `append` pode ser utilizado para exibir skeletons no final da lista durante o carregamento de mais itens, proporcionando feedback visual contínuo e evitando a sensação de 
travamento.
    *   Pode compor com `DssEmptyState` (se existir) para listas vazias. O componente deve renderizar o empty state automaticamente quando a propriedade `items` for um array vazio e `loading` for falso, garantindo uma experiência consistente em toda a aplicação.
    *   Os itens renderizados no slot padrão frequentemente serão instâncias de `DssListItem`, `DssBadge`, `DssChip` ou componentes customizados de card, permitindo a criação de interfaces ricas e complexas sem perder os benefícios da virtualização.

## 7. EXCEÇÕES PREVISTAS

*   **Rolagem Horizontal:** Embora o foco principal seja listas verticais, o componente deve prever e suportar rolagem horizontal caso o layout exija (ex: carrosséis de dados massivos, tabelas largas). A propriedade `horizontal` deve ser exposta para habilitar este modo, ajustando os cálculos internos de acordo.
*   **Itens com Altura Dinâmica Extrema:** Em casos onde a altura do item varia drasticamente e não pode ser calculada previamente, a performance do `QVirtualScroll` pode degradar significativamente. O DSS deve documentar essa limitação e sugerir paginação tradicional como alternativa para esses casos extremos, priorizando a estabilidade da aplicação.
*   **Listas Agrupadas:** O suporte a listas agrupadas (com cabeçalhos de grupo) pode ser complexo em listas virtualizadas, pois os cabeçalhos podem ter alturas diferentes dos itens normais. O componente deve fornecer exemplos de como implementar agrupamento utilizando itens de tipos diferentes no array de dados, ou sugerir abordagens alternativas se a complexidade for muito alta.

## 8. SUPERFÍCIE DE PLAYGROUND

O playground do `DssVirtualScroll` deve expor as seguintes configurações para testes, garantindo que todas as variações e estados possam ser validados visualmente e funcionalmente em um ambiente controlado.

*   **Controles Obrigatórios:**
    *   `itemSize` (Number): Controle deslizante para ajustar a altura base dos itens (ex: 24px a 120px). Permite testar o comportamento do componente com diferentes tamanhos de conteúdo.
    *   `type` (Select): Alternar entre 'list' e 'table'. Permite validar a semântica e a renderização em ambos os modos.
    *   `itemCount` (Number): Controle para gerar mock data (ex: 100, 1000, 10000 itens) para testar a performance e o comportamento da barra de rolagem com diferentes volumes de dados.
    *   `horizontal` (Boolean): Toggle para alternar entre rolagem vertical e horizontal, validando o suporte a ambos os eixos.

*   **Composite Logic (concreta, não genérica):**
    *   Slot para customizar o template do item renderizado. O playground deve oferecer opções pré-definidas para facilitar os testes:
        *   Item de texto simples (usando `DssListItem`), ideal para testar performance bruta.
        *   Item complexo com avatar, título, subtítulo e ações (usando `DssBadge` e `DssChip`), ideal para testar a renderização de componentes aninhados.
        *   Item com altura variável (para testar o comportamento dinâmico e os limites do componente).

*   **Estados a Expor (em tabela):**

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Padrão | Lista renderizada normalmente com dados. | Visual | N/A |
| Carregando | Exibição de skeletons ou spinner. | Funcional | `loading: true` |
| Vazio | Lista sem dados. | Visual | `items: []` |
| Erro | Falha ao carregar dados. | Funcional | `error: true` |
lmente e funcionalmente em um ambiente controlado.

*   **Controles Obrigatórios:**
    *   `itemSize` (Number): Controle deslizante para ajustar a altura base dos itens (ex: 24px a 120px). Permite testar o comportamento do componente com diferentes tamanhos de conteúdo.
    *   `type` (Select): Alternar entre 'list' e 'table'. Permite validar a semântica e a renderização em ambos os modos.
    *   `itemCount` (Number): Controle para gerar mock data (ex: 100, 1000, 10000 itens) para testar a performance e o comportamento da barra de rolagem com diferentes volumes de dados.
    *   `horizontal` (Boolean): Toggle para alternar entre rolagem vertical e horizontal, validando o suporte a ambos os eixos.

*   **Composite Logic (concreta, não genérica):**
    *   Slot para customizar o template do item renderizado. O playground deve oferecer opções pré-definidas para facilitar os testes:
        *   Item de texto simples (usando `DssListItem`), ideal para testar performance bruta.
        *   Item complexo com avatar, título, subtítulo e ações (usando `DssBadge` e `DssChip`), ideal para testar a renderização de componentes aninhados.
        *   Item com altura variável (para testar o comportamento dinâmico e os limites do componente).

*   **Estados a Expor (em tabela):**

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Padrão | Lista renderizada normalmente com dados. | Visual | N/A |
| Carregando | Exibição de skeletons ou spinner. | Funcional | `loading: true` |
| Vazio | Lista sem dados. | Visual | `items: []` |
| Erro | Falha ao carregar dados. | Funcional | `error: true` |
OUND

O playground do `DssVirtualScroll` deve expor as seguintes configurações para testes, garantindo que todas as variações e estados possam ser validados visualmente e funcionalmente em um ambiente controlado.

*   **Controles Obrigatórios:**
    *   `itemSize` (Number): Controle deslizante para ajustar a altura base dos itens (ex: 24px a 120px). Permite testar o comportamento do componente com diferentes tamanhos de conteúdo.
    *   `type` (Select): Alternar entre 'list' e 'table'. Permite validar a semântica e a renderização em ambos os modos.
    *   `itemCount` (Number): Controle para gerar mock data (ex: 100, 1000, 10000 itens) para testar a performance e o comportamento da barra de rolagem com diferentes volumes de dados.
    *   `horizontal` (Boolean): Toggle para alternar entre rolagem vertical e horizontal, validando o suporte a ambos os eixos.

*   **Composite Logic (concreta, não genérica):**
    *   Slot para customizar o template do item renderizado. O playground deve oferecer opções pré-definidas para facilitar os testes:
        *   Item de texto simples (usando `DssListItem`), ideal para testar performance bruta.
        *   Item complexo com avatar, título, subtítulo e ações (usando `DssBadge` e `DssChip`), ideal para testar a renderização de componentes aninhados.
        *   Item com altura variável (para testar o comportamento dinâmico e os limites do componente).

*   **Estados a Expor (em tabela):**

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Padrão | Lista renderizada normalmente com dados. | Visual | N/A |
| Carregando | Exibição de skeletons ou spinner. | Funcional | `loading: true` |
| Vazio | Lista sem dados. | Visual | `items: []` |
| Erro | Falha ao carregar dados. | Funcional | `error: true` |
