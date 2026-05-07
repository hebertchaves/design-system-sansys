# Pré-prompt: DssVirtualScroll

## 1. CLASSIFICAÇÃO E CONTEXTO

**Golden Reference:** DssBadge (para aspectos de exibição de itens) e DssChip (para interatividade de rolagem e seleção, se aplicável).
**Golden Context:** O `DssVirtualScroll` é um componente de navegação e exibição de dados projetado para renderizar listas massivas de forma eficiente. Ele se posiciona como a solução padrão do Design System para lidar com grandes volumes de itens (tabelas, listas, feeds) sem comprometer a performance do DOM, renderizando apenas os elementos visíveis na viewport.
**Justificativa:** A renderização de milhares de nós no DOM degrada severamente a performance da aplicação. O `DssVirtualScroll` encapsula a complexidade da virtualização, oferecendo uma API simplificada e alinhada ao DSS para garantir rolagem fluida (60fps) e baixo consumo de memória, mantendo a consistência visual com os demais componentes de lista e dados.

## 2. RISCOS ARQUITETURAIS E GATES

*   **Risco de Performance com Alturas Dinâmicas:** Itens com alturas variáveis podem causar saltos na rolagem ou cálculos excessivos. **Gate:** O componente deve suportar alturas dinâmicas, mas deve incentivar o uso de alturas fixas sempre que possível através de propriedades de configuração.
*   **Risco de Perda de Estado:** Ao reciclar nós do DOM, o estado interno de componentes filhos pode ser perdido. **Gate:** Documentar claramente a necessidade de gerenciar o estado fora dos itens da lista (ex: usando chaves únicas e stores).
*   **Risco de Acessibilidade:** Listas virtualizadas podem ocultar o tamanho real da lista para leitores de tela. **Gate:** Implementar atributos ARIA adequados (`aria-setsize`, `aria-posinset`) para comunicar o contexto total ao usuário.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssVirtualScroll` atua como um wrapper otimizado sobre o `q-virtual-scroll` do Quasar.

*   `items` (Quasar) ➔ `items` (DSS): Array de dados a serem renderizados.
*   `virtual-scroll-item-size` (Quasar) ➔ `itemSize` (DSS): Tamanho padrão do item (altura para rolagem vertical, largura para horizontal).
*   `virtual-scroll-sticky-size-start` / `virtual-scroll-sticky-size-end` (Quasar) ➔ Omitidos/Simplificados: Gerenciados internamente se necessário, ou expostos apenas se houver caso de uso claro no DSS.
*   `type` (Quasar) ➔ `type` (DSS): Define se é uma lista (`list`) ou tabela (`table`).
*   `scroll-target` (Quasar) ➔ `scrollTarget` (DSS): Elemento alvo para a rolagem.
*   `@virtual-scroll` (Quasar) ➔ `@scroll` (DSS): Evento emitido durante a rolagem, padronizado para o DSS.

## 4. GOVERNANÇA DE TOKENS E CSS

O componente deve utilizar estritamente os tokens do DSS para garantir consistência:

*   **Espaçamento:**
    *   Padding interno do container (se aplicável): `--dss-spacing-4`
    *   Espaçamento entre itens (gap): `--dss-spacing-2`
*   **Superfície e Cores:**
    *   Fundo do container: `--dss-surface-default`
    *   Cor da barra de rolagem (customização via CSS): `--dss-surface-sunken`
*   **Bordas e Raios:**
    *   Raio do container (se encapsulado em um card): `--dss-radius-md`
*   **Animações/Transições:**
    *   Transições de estado de carregamento: `--dss-duration-250`

*Nota: Não inventar tokens como `--dss-padding-md` ou `--dss-duration-base`.*

## 5. ACESSIBILIDADE E ESTADOS

*   **Acessibilidade (a11y):**
    *   O container deve possuir `role="list"` ou `role="table"` dependendo do tipo.
    *   Os itens renderizados devem possuir `role="listitem"` ou `role="row"`.
    *   É obrigatório o uso de `aria-setsize` no container para indicar o número total de itens, e `aria-posinset` em cada item renderizado para indicar sua posição real na lista.
    *   Suporte a navegação por teclado (setas para cima/baixo) para focar itens dentro da área visível.
*   **Estados:**
    *   **Loading:** Exibição de skeleton loaders ou spinner enquanto os dados iniciais são carregados.
    *   **Empty:** Estado visual claro quando a lista de `items` estiver vazia.
    *   **Error:** Feedback visual caso ocorra falha ao carregar mais itens (em cenários de infinite scroll combinados).

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

*   **Dependências Quasar:** `QVirtualScroll`.
*   **Composição DSS:**
    *   Pode compor com `DssSkeleton` para estados de carregamento.
    *   Pode compor com `DssEmptyState` (se existir) para listas vazias.
    *   Os itens renderizados no slot padrão frequentemente serão instâncias de `DssListItem` ou componentes customizados de card.

## 7. EXCEÇÕES PREVISTAS

*   **Rolagem Horizontal:** Embora o foco principal seja listas verticais, o componente deve prever e suportar rolagem horizontal caso o layout exija (ex: carrosséis de dados massivos).
*   **Itens com Altura Dinâmica Extrema:** Em casos onde a altura do item varia drasticamente e não pode ser calculada previamente, a performance do `QVirtualScroll` pode degradar. O DSS deve documentar essa limitação e sugerir paginação tradicional como alternativa para esses casos extremos.

## 8. SUPERFÍCIE DE PLAYGROUND

O playground do `DssVirtualScroll` deve expor as seguintes configurações para testes:

*   **Controles:**
    *   `itemSize` (Number): Controle deslizante para ajustar a altura base dos itens.
    *   `type` (Select): Alternar entre 'list' e 'table'.
    *   `itemCount` (Number): Controle para gerar mock data (ex: 100, 1000, 10000 itens) para testar a performance.
*   **Composite Logic:**
    *   Slot para customizar o template do item renderizado (ex: alternar entre um item de texto simples e um card complexo com imagens).
*   **Estados a Expor:**
    *   Toggle para estado `loading` (exibindo skeletons).
    *   Toggle para estado `empty` (lista sem dados).