Pré-prompt: DssVirtualScroll

## 1. CLASSIFICAÇÃO E CONTEXTO

**Golden Reference:** DssBadge (para aspectos de exibição de itens não-interativos) e DssChip (para interatividade de rolagem e seleção, se aplicável).
**Golden Context:** O `DssVirtualScroll` é um componente de navegação e exibição de dados projetado para renderizar listas massivas de forma eficiente. Ele se posiciona como a solução padrão do Design System para lidar com grandes volumes de itens (tabelas, listas, feeds) sem comprometer a performance do DOM, renderizando apenas os elementos visíveis na viewport.

**Justificativa:** A renderização de milhares de nós no DOM degrada severamente a performance da aplicação, causando travamentos, alto consumo de memória e uma experiência de usuário ruim, especialmente em dispositivos móveis ou com recursos limitados. O `DssVirtualScroll` encapsula a complexidade da virtualização, oferecendo uma API simplificada e alinhada ao DSS para garantir rolagem fluida (60fps) e baixo consumo de memória, mantendo a consistência visual com os demais componentes de lista e dados. Ele atua como um wrapper otimizado, garantindo que as regras de negócio e de design do sistema sejam aplicadas de forma consistente, sem a necessidade de os desenvolvedores implementarem lógicas complexas de virtualização manualmente.

## 2. RISCOS ARQUITETURAIS E GATES

*   **Risco de Performance com Alturas Dinâmicas:** Itens com alturas variáveis podem causar saltos na rolagem ou cálculos excessivos, prejudicando a experiência do usuário.
    *   **Gate:** O componente deve suportar alturas dinâmicas, mas deve incentivar o uso de alturas fixas sempre que possível através de propriedades de configuração. A documentação deve alertar sobre o impacto na performance ao usar alturas dinâmicas em listas muito grandes.
*   **Risco de Perda de Estado:** Ao reciclar nós do DOM, o estado interno de componentes filhos pode ser perdido, resultando em comportamentos inesperados.
    *   **Gate:** Documentar claramente a necessidade de gerenciar o estado fora dos itens da lista (ex: usando chaves únicas e stores como Pinia ou Vuex).
*   **Risco de Acessibilidade:** Listas virtualizadas podem ocultar o tamanho real da lista para leitores de tela, prejudicando a navegação de usuários com deficiência visual.
    *   **Gate:** Implementar atributos ARIA adequados (`aria-setsize`, `aria-posinset`) expostos via escopo de slot para que o consumidor os aplique em cada item.
*   **Risco de Acoplamento:** Dependência excessiva de implementações específicas do Quasar pode dificultar futuras migrações ou atualizações do framework base.
    *   **Gate:** A API exposta deve ser agnóstica em relação ao Quasar sempre que possível, mapeando as propriedades e eventos para a nomenclatura padrão do DSS.
*   **Risco de Duplicação de Slots:** Slots `prepend` e `append` não devem ser passados simultaneamente ao nível root do DssVirtualScroll E ao QVirtualScroll interno via `#before`/`#after`, pois causariam renderização dupla no DOM.
    *   **Gate:** Slots `prepend`/`append` devem existir apenas no nível root do DssVirtualScroll. O QVirtualScroll interno não deve receber esses slots via `#before`/`#after`.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssVirtualScroll` atua como um wrapper otimizado sobre o `q-virtual-scroll` do Quasar, adaptando sua API para os padrões do Design System e ocultando complexidades desnecessárias.

### Propriedades (Props)

*   `items` (Quasar) ➔ `items` (DSS): Array de dados a serem renderizados. Deve ser reativo.
*   `virtual-scroll-item-size` (Quasar) ➔ `itemSize` (DSS): Tamanho padrão do item em pixels. Default: 48.
*   `virtual-scroll-sticky-size-start` / `virtual-scroll-sticky-size-end` (Quasar) ➔ Omitidos: Não há caso de uso validado no ecossistema DSS.
*   `type` (Quasar) ➔ `type` (DSS): Define se é uma lista (`list`) ou tabela (`table`). Default: `list`.
*   `scroll-target` (Quasar) ➔ `scrollTarget` (DSS): Elemento alvo para a rolagem (seletor CSS ou referência DOM).
*   `virtual-scroll-slice-size` (Quasar) ➔ `sliceSize` (DSS): Número de itens no DOM simultaneamente. Exposto para ajustes finos.
*   `virtual-scroll-slice-ratio-before` / `virtual-scroll-slice-ratio-after` (Quasar) ➔ Omitidos: Gerenciados internamente pelo Quasar com valores otimizados.
*   `tag` (Quasar) ➔ **NÃO EXPOSTO**: DssVirtualScroll sempre renderiza `<div>` como root. O QVirtualScroll interno gerencia o elemento correto (`table`/`tbody`) internamente via prop `type`.

### Eventos (Events)

*   `@virtual-scroll` (Quasar) ➔ `@scroll` (DSS): Evento emitido durante a rolagem virtual.
*   `@scroll` (Quasar) ➔ `@native-scroll` (DSS): Evento de rolagem nativo do container.

### Slots

*   `default` (Quasar) ➔ `default` (DSS): Slot principal para cada item. Escopo: `{ item, index, ariaSetsize, ariaPosinset }`.
*   `before` / `after` (Quasar) ➔ **NÃO MAPEADOS**: Os slots `prepend` e `append` do DSS existem no nível root do DssVirtualScroll, fora do QVirtualScroll. Isso garante que apareçam em todos os estados (normal, loading, empty) sem duplicação.
*   DSS adiciona slots exclusivos: `#loading` (substitui spinner padrão) e `#empty` (substitui texto padrão de lista vazia).

## 4. GOVERNANÇA DE TOKENS E CSS

O componente deve utilizar estritamente os tokens do DSS. O uso de valores hardcoded ou tokens inexistentes é proibido.

*   **Espaçamento:**
    *   Scrollbar: `--dss-spacing-2` (8px)
    *   Padding loading: `--dss-spacing-6` (24px)
    *   Padding empty / spinner size: `--dss-spacing-8` (32px)
    *   Borda spinner: `--dss-spacing-px` (1px)
*   **Superfície e Cores:**
    *   Cor da scrollbar: `--dss-surface-muted`
    *   Texto do estado vazio: `--dss-text-subtle`
    *   Cor do spinner: `currentColor` no base; `--dss-action-hub`, `--dss-action-water`, `--dss-action-waste` por brand em `4-output/_brands.scss`
    *   **Tokens PROIBIDOS**: `--dss-action-primary` (não existe no catálogo DSS), `--dss-hub-primary`, `--dss-water-primary`, `--dss-waste-primary`
*   **Bordas e Raios:**
    *   Scrollbar thumb e spinner: `--dss-radius-full`
*   **Animações:**
    *   Duração do spinner: `--dss-duration-500` (500ms)
*   **Opacidade:**
    *   Estado desabilitado: `--dss-opacity-disabled` (0.4)

## 5. ACESSIBILIDADE E ESTADOS

*   **Acessibilidade (a11y):**
    *   ARIA via escopo de slot: `ariaSetsize` e `ariaPosinset` expostos no `default` slot scope. O consumidor aplica `aria-setsize` / `aria-posinset` em cada item — DssVirtualScroll não pode aplicar diretamente pois não conhece a estrutura interna dos itens.
    *   Estado de loading: `role="status"` + `aria-live="polite"` no container de loading. Spinner decorativo com `aria-hidden="true"`.
    *   `prefers-reduced-motion: reduce`: `animation: none !important` no spinner (EX-States-01).
    *   `prefers-contrast: more`: `currentColor` para scrollbar e texto vazio.
    *   `forced-colors: active`: Semantic colors (`ButtonText`, `Highlight`, `CanvasText`).
    *   Print: `overflow: visible` para exibir toda a lista; loading oculto.

*   **Touch Target:** NÃO aplicável — componente container não interativo. Itens filhos gerenciam seus próprios touch targets.

*   **Estados:**
    *   **default**: Lista virtualizada normal.
    *   **loading**: Spinner CSS + slot `#loading` customizável. `role="status"` + `aria-live="polite"`.
    *   **empty**: Texto padrão + slot `#empty` customizável. `role="status"`.
    *   **disabled**: `pointer-events: none` + `opacity: var(--dss-opacity-disabled)`.
    *   **hover / focus / active**: N/A — container; itens filhos gerenciam.
    *   **error**: N/A — responsabilidade do consumidor via slot `#append` (ex: botão de retry).

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

*   **Dependências Quasar:** `QVirtualScroll` (motor de virtualização).
*   **Composição DSS:**
    *   `DssList + DssItem`: composição canônica para listas de dados DSS.
    *   `DssCard`: container estrutural recomendado para envolver o VirtualScroll.
    *   `DssSpinner`: substituto para o slot `#loading` quando selado.
    *   `DssInfiniteScroll`: complementar para carregamento incremental (planejado Fase 2).

## 7. EXCEÇÕES PREVISTAS

*   **EXC-Gate-01**: `.q-virtual-scroll__content { width: 100% }` dentro de `.dss-virtual-scroll__inner` é necessário para controlar a área de conteúdo gerada internamente pelo QVirtualScroll. Localização: `2-composition/_base.scss`.
*   **EX-States-01**: `animation: none !important` em `prefers-reduced-motion` para sobrescrever `@keyframes` definido em `_base.scss`. Precedente: DssLinearProgress, DssSpinner.
*   **Limitação arquitetural — prop `tag`**: DssVirtualScroll sempre renderiza `<div>` como root. Não é possível usar o componente como `<tbody>` diretamente. Para tabelas com cabeçalho fixo, usar `type="table"` (QVirtualScroll gera a estrutura interna) e o slot `#prepend` para o header.

## 8. SUPERFÍCIE DE PLAYGROUND

O playground do `DssVirtualScroll` deve expor as seguintes configurações para testes:

*   **Controles Obrigatórios:**
    *   `itemSize` (Number): Controle deslizante para ajustar a altura base dos itens (ex: 24px a 120px).
    *   `type` (Select): Alternar entre `'list'` e `'table'`.
    *   `itemCount` (Number): Controle para gerar mock data (ex: 100, 1000, 10000 itens).
    *   `horizontal` (Boolean): Toggle para alternar entre rolagem vertical e horizontal.

*   **Composite Logic (concreta, não genérica):**
    *   Item de texto simples (usando `DssItem`), ideal para testar performance bruta.
    *   Item complexo com avatar, título, subtítulo e ações (usando `DssBadge` e `DssChip`).
    *   Item com altura variável (para testar comportamento dinâmico e os limites do componente).

*   **Estados a Expor:**

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| Padrão | Lista renderizada normalmente com dados | Visual | N/A |
| Carregando | Spinner CSS ou slot `#loading` customizado | Funcional | `loading: true` |
| Vazio | Texto padrão ou slot `#empty` customizado | Visual | `items: []` |
| Desabilitado | pointer-events: none + opacidade reduzida | Visual | `disable: true` |
