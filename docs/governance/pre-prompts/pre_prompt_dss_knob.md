# Pré-prompt: DssKnob

### 1. CLASSIFICAÇÃO E CONTEXTO
*   **Golden Reference**: `DssChip`
*   **Golden Context**: O `DssKnob` é um componente de entrada interativo que permite ao usuário selecionar um valor dentro de um intervalo predefinido, girando um "botão" virtual. Ele é visualmente similar a um dial e é ideal para cenários onde a precisão numérica é importante, mas a interface visual de um slider tradicional pode ser menos intuitiva ou esteticamente desejável. Sua interatividade e capacidade de representar um estado selecionado o alinham com a natureza interativa do `DssChip`.
*   **Justificativa**: O `DssKnob` oferece uma alternativa compacta e visualmente distinta para a entrada de dados numéricos, especialmente útil em dashboards, configurações de áudio/vídeo ou qualquer interface que se beneficie de um controle rotativo. Ele complementa os componentes de entrada existentes, proporcionando uma experiência de usuário rica e diferenciada.

### 2. RISCOS ARQUITETURAIS E GATES
*   **Complexidade de Interação**: A implementação da lógica de rotação e mapeamento de valores pode ser complexa, exigindo atenção à suavidade da animação e à precisão da seleção.
*   **Responsividade**: Garantir que o `DssKnob` seja responsivo e funcione bem em diferentes tamanhos de tela e dispositivos (mouse, toque) é crucial.
*   **Customização de Estilo**: A flexibilidade para estilizar o knob (cor, tamanho, indicador de valor) sem comprometer a usabilidade ou a consistência com o DSS.
*   **Performance**: Animações e atualizações de estado devem ser otimizadas para evitar lentidão na interface.
*   **Gate**: O componente deve ter uma API clara e bem documentada, com exemplos de uso para diferentes cenários. A funcionalidade básica (seleção de valor, feedback visual) deve estar estável antes de considerar customizações avançadas.

### 3. MAPEAMENTO DE API (QUASAR → DSS)
O `DssKnob` será baseado no `QKnob` do Quasar. A API do `DssKnob` deve ser um subconjunto ou uma extensão da API do `QKnob`, com os seguintes mapeamentos e considerações:
*   **`value` (Quasar) → `model-value` (DSS)**: Propriedade principal para o valor selecionado do knob, com suporte a `v-model`.
*   **`min`, `max` (Quasar) → `min`, `max` (DSS)**: Definição do intervalo de valores.
*   **`step` (Quasar) → `step` (DSS)**: Incremento/decremento do valor.
*   **`size` (Quasar) → `size` (DSS)**: Controla o tamanho do knob (ex: `sm`, `md`, `lg`). Deve ser mapeado para tokens de espaçamento do DSS para garantir consistência.
*   **`color`, `track-color`, `inner-color` (Quasar) → `color`, `track-color`, `inner-color` (DSS)**: Mapear para tokens de cor do DSS (ex: `--dss-color-primary`, `--dss-surface-default`).
*   **`readonly`, `disable` (Quasar) → `readonly`, `disabled` (DSS)**: Estados de interação.
*   **`angle` (Quasar) → `start-angle`, `end-angle` (DSS)**: Controla o arco de rotação, se necessário.
*   **Slots**: Manter os slots do `QKnob` para customização do conteúdo interno.

### 4. GOVERNANÇA DE TOKENS E CSS
O `DssKnob` deve utilizar exclusivamente tokens do DSS para estilização. Exemplos de uso:
*   **Tamanho**: `--dss-spacing-48` (para um knob de tamanho médio), `--dss-spacing-64` (para um grande).
*   **Raio**: `--dss-radius-full` (para o formato circular do knob).
*   **Cores**: `--dss-surface-default` (fundo), `--dss-color-primary` (cor do valor/progresso), `--dss-surface-variant` (cor da trilha).
*   **Espaçamento interno/externo**: `--dss-spacing-4`, `--dss-spacing-8`.
*   **Transições**: `--dss-duration-250` (para animações de estado ou valor).

**Tokens Proibidos**: `--dss-padding-md`, `--dss-duration-base` (qualquer token com sufixo semântico não existente no DSS).

### 5. ACESSIBILIDADE E ESTADOS
*   **Estados**: `default`, `hover`, `focus`, `active`, `disabled`, `readonly`, `error`, `success`.
*   **Interação por Teclado**: Deve ser navegável via `Tab` e permitir ajuste de valor via setas (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`). `PageUp`/`PageDown` para grandes incrementos.
*   **ARIA Attributes**: Utilizar `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` para leitores de tela.
*   **Feedback Visual**: Mudanças de estado (hover, focus, disabled) devem ter feedback visual claro (ex: `outline` para focus, opacidade para disabled).

### 6. DEPENDÊNCIAS E COMPOSIÇÃO
*   **Dependências**: `QKnob` (Quasar), `QIcon` (para ícones internos, se aplicável).
*   **Composição**: Pode ser composto com `DssTooltip` para exibir o valor exato ao interagir, ou `DssLabel` para contextualizar o controle.

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
    *   `color`: `String` (lista de cores do DSS)
    *   `track-color`: `String` (lista de cores do DSS)
    *   `inner-color`: `String` (lista de cores do DSS)
    *   `disabled`: `Boolean`
    *   `readonly`: `Boolean`
    *   `label`: `Boolean` (para exibir o valor como label)
*   **Composite Logic**:
    *   Exemplo de uso com `DssTooltip` para mostrar o valor ao passar o mouse.
    *   Exemplo de uso com `DssLabel` para descrever a função do knob.
    *   Exemplo de uso em um formulário com validação de entrada.
*   **Estados a Expor**:
    *   `@update:model-value` (evento de mudança de valor)
    *   `@focus`, `@blur` (eventos de foco)
    *   `is-dragging` (estado interno de arrastar, se aplicável)
