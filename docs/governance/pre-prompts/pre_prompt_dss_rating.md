# Pré-prompt: DssRating

## 1. CLASSIFICAÇÃO E CONTEXTO

*   **Golden Reference**: DssChip
*   **Golden Context**: O DssRating é um componente interativo utilizado para permitir que usuários avaliem itens ou forneçam feedback através de uma escala visual (e.g., estrelas, corações). Ele deve ser intuitivo, responsivo e acessível, seguindo os padrões de interação estabelecidos por componentes interativos como o DssChip.
*   **Justificativa**: Padronizar a exibição e interação de sistemas de avaliação, garantindo consistência visual e funcional em toda a aplicação, além de facilitar a coleta de feedback do usuário de forma padronizada.

## 2. RISCOS ARQUITETURAIS E GATES

*   **Riscos**:
    *   **Performance**: Renderização de múltiplos componentes DssRating em listas extensas pode impactar a performance.
    *   **Customização excessiva**: Dificuldade em controlar a customização de ícones e cores, levando a inconsistências visuais.
    *   **Sincronização de estado**: Problemas na sincronização do estado de avaliação entre o componente e o modelo de dados da aplicação.
    *   **Acessibilidade**: Falha em fornecer feedback visual e textual adequado para leitores de tela e navegação por teclado.
*   **Gates**:
    *   Definição clara de propriedades para customização (tamanho, cor, ícone).
    *   Implementação de mecanismos de debounce ou throttle para eventos de alteração de valor em cenários de alta frequência.
    *   Testes de performance com 100+ instâncias do componente na mesma tela.
    *   Auditoria de acessibilidade (WCAG 2.1 AA) para garantir navegação por teclado e compatibilidade com leitores de tela.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O DssRating será construído com base no componente `QRating` do Quasar, adaptando suas propriedades e eventos para a API do DSS.

| Propriedade Quasar | Propriedade DSS | Tipo | Descrição | Notas |
| :----------------- | :-------------- | :--- | :-------- | :---- |
| `v-model`          | `v-model`       | Number | Valor da avaliação (0-5) | Obrigatório |
| `max`              | `max`           | Number | Número máximo de itens | Padrão: 5 |
| `size`             | `size`          | String | Tamanho dos ícones | `sm`, `md`, `lg` |
| `color`            | `color`         | String | Cor dos ícones | `primary`, `secondary`, `negative`, etc. |
| `icon`             | `icon`          | String | Ícone a ser usado | Padrão: `star` |
| `icon-half`        | `iconHalf`      | String | Ícone para metade da avaliação | Opcional |
| `icon-selected`    | `iconSelected`  | String | Ícone para avaliação selecionada | Opcional |
| `readonly`         | `readonly`      | Boolean | Componente somente leitura | Padrão: `false` |
| `disable`          | `disabled`      | Boolean | Componente desabilitado | Padrão: `false` |
| `@input`           | `@update:modelValue` | Event | Emitido ao alterar o valor | |

## 4. GOVERNANÇA DE TOKENS E CSS

O DssRating utilizará exclusivamente tokens numéricos/padrão do DSS para espaçamento, raio, cor e duração.

*   **Espaçamento**: `--dss-spacing-4` (para padding interno), `--dss-spacing-8` (para margens externas, se necessário).
*   **Raio**: `--dss-radius-sm` (para ícones menores), `--dss-radius-md` (para ícones maiores ou contêiner).
*   **Cores**: `--dss-color-primary`, `--dss-color-secondary`, `--dss-color-negative`, `--dss-color-surface-default` (para fundo), `--dss-color-on-surface` (para ícones).
*   **Duração**: `--dss-duration-200` (para transições de hover ou clique).
*   **Exemplo de uso de tokens**: `padding: var(--dss-spacing-4); border-radius: var(--dss-radius-md);`

## 5. ACESSIBILIDADE E ESTADOS

*   **Acessibilidade**:
    *   **ARIA**: Utilizar `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` para descrever o estado e a função do componente para leitores de tela.
    *   **Navegação por teclado**: Suporte para `Tab` para focar e `ArrowLeft`/`ArrowRight` para ajustar o valor.
    *   **Feedback visual**: Estados de foco (`:focus-visible`) e hover (`:hover`) devem ser claramente visíveis.
*   **Estados**:
    *   **Padrão**: Componente com valor inicial e interativo.
    *   **Hover**: Ícones reagem visualmente ao passar o mouse.
    *   **Foco**: Contorno visível ao focar via teclado.
    *   **Selecionado**: Ícones preenchidos ou com cor diferente para indicar o valor atual.
    *   **Desabilitado**: Componente não interativo, com estilo visual que indique inatividade (e.g., opacidade reduzida).
    *   **Somente Leitura**: Componente exibe o valor, mas não permite interação, sem estilo de desabilitado.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

*   **Dependências**: `QRating` (Quasar), `QIcon` (Quasar).
*   **Composição**: O DssRating é um componente atômico. Pode ser composto em componentes mais complexos como DssCard (para exibir avaliações de produtos) ou DssForm (para coletar feedback).

## 7. EXCEÇÕES PREVISTAS

*   **Valores inválidos**: Entrada de `v-model` fora do range `0` a `max` deve ser tratada (e.g., clamp para o valor mais próximo).
*   **Ícones personalizados**: Permitir a substituição dos ícones padrão por SVGs ou outros componentes de ícone, garantindo que a acessibilidade seja mantida.
*   **Temas**: Garantir que o componente se adapte corretamente a diferentes temas (claro/escuro) através do uso de tokens de cor.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles

*   **`v-model`**: Slider numérico de 0 a 5.
*   **`max`**: Selector numérico (3, 5, 10).
*   **`size`**: Dropdown (`sm`, `md`, `lg`).
*   **`color`**: Dropdown de cores do DSS (`primary`, `secondary`, `negative`, `positive`, `warning`, `info`, `dark`, `grey-7`).
*   **`icon`**: Input de texto para nome do ícone (e.g., `star`, `favorite`, `thumb_up`).
*   **`iconHalf`**: Input de texto para nome do ícone de metade (e.g., `star_half`).
*   **`iconSelected`**: Input de texto para nome do ícone selecionado (e.g., `star`).
*   **`readonly`**: Checkbox.
*   **`disabled`**: Checkbox.

### Composite Logic

*   **Exemplo 1**: Exibir DssRating dentro de um DssCard para um produto, mostrando a avaliação média e permitindo que o usuário altere sua própria avaliação.
*   **Exemplo 2**: Integrar DssRating em um DssForm para coletar feedback de satisfação do usuário após uma interação.

### Estados a Expor

*   **`v-model`**: Exibir o valor numérico atual da avaliação.
*   **`isHovering`**: Boolean para indicar se o mouse está sobre o componente.
*   **`isFocused`**: Boolean para indicar se o componente está focado.
*   **`isValid`**: Boolean para indicar se o valor da avaliação está dentro dos limites válidos.