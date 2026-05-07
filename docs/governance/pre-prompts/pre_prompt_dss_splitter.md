# Pré-prompt: DssSplitter

## 1. CLASSIFICAÇÃO E CONTEXTO
*   **Golden Reference**: DssChip (componente interativo)
*   **Golden Context**: O DssSplitter é um componente utilizado para redimensionar dinamicamente o espaço entre dois painéis adjacentes, permitindo que o usuário ajuste a proporção de cada painel. É ideal para layouts que exigem flexibilidade e personalização por parte do usuário, como IDEs, painéis de administração ou interfaces com múltiplas visualizações de dados.
*   **Justificativa**: A necessidade de um componente de splitter no DSS surge da demanda por layouts adaptáveis e eficientes, onde o usuário pode controlar a distribuição do espaço na tela. Isso melhora a usabilidade em cenários de multitarefas e visualização de dados complexos, oferecendo uma experiência mais rica e personalizada.

## 2. RISCOS ARQUITETURAIS E GATES
*   **Performance**: Garantir que o redimensionamento seja suave e responsivo, mesmo com conteúdo complexo nos painéis. Evitar reflows excessivos e otimizar a renderização.
*   **Acessibilidade**: Assegurar que o splitter seja totalmente operável via teclado e que forneça feedback visual e semântico adequado para tecnologias assistivas.
*   **Responsividade**: O componente deve se adaptar a diferentes tamanhos de tela e orientações, potencialmente desativando ou ajustando o comportamento do splitter em telas menores.
*   **Estado Persistente**: Gerenciamento do estado do splitter (posição) para persistência entre sessões ou navegações, se necessário.
*   **Validação de Limites**: Prevenir que o splitter ultrapasse limites definidos ou cause colapso indesejado dos painéis.

## 3. MAPEAMENTO DE API (QUASAR → DSS)
*   **`model-value` (Quasar `v-model`)**: Mapeia para `value` (DSS), controlando a proporção ou tamanho do primeiro painel. Tipo: `Number` (0-100 para percentual, ou pixels).
*   **`limits` (Quasar `limits`)**: Mapeia para `limits` (DSS), definindo os valores mínimo e máximo para `value`. Tipo: `Array<Number>` (ex: `[20, 80]`).
*   **`horizontal` (Quasar `horizontal`)**: Mapeia para `orientation` (DSS), com valores `'horizontal'` ou `'vertical'`. Padrão: `'horizontal'`.
*   **`reverse` (Quasar `reverse`)**: Mapeia para `reverse` (DSS), invertendo a ordem dos painéis. Tipo: `Boolean`.
*   **`separator-class` (Quasar `separator-class`)**: Mapeia para `separatorClass` (DSS), para estilização customizada do separador.
*   **`separator-color` (Quasar `separator-color`)**: Mapeia para `separatorColor` (DSS), para controle da cor do separador.
*   **`disable` (Quasar `disable`)**: Mapeia para `disabled` (DSS), desativando a interação com o splitter. Tipo: `Boolean`.
*   **`emit-immediately` (Quasar `emit-immediately`)**: Mapeia para `emitImmediately` (DSS), emitindo eventos de atualização de valor durante o arrasto. Tipo: `Boolean`.
*   **Eventos**: `update:model-value` (Quasar) -> `change` (DSS), `splitter-click` (Quasar) -> `click` (DSS), `splitter-resize` (Quasar) -> `resize` (DSS).

## 4. GOVERNANÇA DE TOKENS E CSS
*   **Espaçamento do Separador**: `--dss-spacing-2` (para espessura padrão do separador).
*   **Cor de Fundo do Separador**: `--dss-surface-default` ou `--dss-surface-variant`.
*   **Cor do Separador (Hover/Active)**: `--dss-action-primary-default`.
*   **Raio das Bordas (se aplicável ao separador)**: `--dss-radius-sm`.
*   **Duração da Transição (se houver animação)**: `--dss-duration-200`.
*   **Tokens para ícones de arrasto (se presentes)**: `--dss-icon-size-md`.

## 5. ACESSIBILIDADE E ESTADOS
*   **Operação por Teclado**: O separador deve ser navegável via `Tab` e redimensionável via `ArrowLeft`/`ArrowRight` (horizontal) ou `ArrowUp`/`ArrowDown` (vertical).
*   **ARIA Attributes**: `role="separator"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-orientation`.
*   **Foco**: O separador deve receber e gerenciar o foco visualmente.
*   **Estados**: 
    *   `default`: Estado inicial, separador visível e interativo.
    *   `hover`: Separador com feedback visual ao passar o mouse (ex: cor de fundo ou borda).
    *   `active` / `dragging`: Separador com feedback visual durante o arrasto (ex: cor de destaque, cursor `grabbing`).
    *   `disabled`: Separador não interativo, com estilo visual indicando desativação (ex: opacidade reduzida, cursor `not-allowed`).

## 6. DEPENDÊNCIAS E COMPOSIÇÃO
*   **Dependências**: Nenhuma dependência direta de outros componentes DSS para sua funcionalidade principal. Pode depender de `DssIcon` se o separador incluir um ícone de arrasto.
*   **Composição**: O DssSplitter compõe dois slots (painéis) que podem conter qualquer conteúdo, incluindo outros componentes DSS, layouts complexos ou conteúdo arbitrário. Ele atua como um container de layout.

## 7. EXCEÇÕES PREVISTAS
*   **Conteúdo Fluido**: Problemas de layout podem surgir se o conteúdo dos painéis não for projetado para ser fluido ou responsivo ao redimensionamento.
*   **Aninhamento Complexo**: O aninhamento de múltiplos DssSplitters pode levar a complexidade na gestão de estado e performance, exigindo atenção especial.
*   **Limites Inválidos**: Se os `limits` forem configurados de forma inválida (ex: `min > max`), o componente deve ter um comportamento fallback robusto (ex: usar limites padrão ou desativar o splitter).
*   **Conteúdo com Scroll**: Se um painel tiver scroll interno, o comportamento do splitter deve ser claro para evitar conflitos de rolagem.

## 8. SUPERFÍCIE DE PLAYGROUND
*   **Controles**: 
    *   `value`: Slider numérico para controlar a posição inicial do splitter (0-100).
    *   `orientation`: Radio buttons para `horizontal` ou `vertical`.
    *   `limits`: Campos de entrada numéricos para `min` e `max`.
    *   `disabled`: Checkbox para ativar/desativar o splitter.
    *   `reverse`: Checkbox para inverter a ordem dos painéis.
    *   `emitImmediately`: Checkbox para controlar a emissão de eventos durante o arrasto.
*   **Composite Logic**: 
    *   Exemplo de uso com `DssCard` ou `DssContainer` em cada painel para demonstrar como o conteúdo se adapta.
    *   Demonstração de um splitter aninhado (horizontal dentro de vertical) para testar cenários complexos.
*   **Estados a Expor**: 
    *   `isDragging`: Boolean que indica se o separador está sendo arrastado no momento.
    *   `currentValue`: O valor atual da posição do splitter.