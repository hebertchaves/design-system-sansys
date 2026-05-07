# Pré-prompt: DssBottomSheet

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
O `DssBottomSheet` é um componente interativo, portanto, sua Golden Reference é o `DssChip`.

### Golden Context
O `DssBottomSheet` é um componente de interface do usuário que apresenta um painel deslizante da parte inferior da tela, contendo conteúdo contextual ou ações relacionadas à tarefa atual. Ele é ideal para exibir informações adicionais, formulários curtos, listas de opções ou menus de ação sem navegar para uma nova tela. Sua implementação deve ser baseada no comportamento e na API do `QBottomSheet` do Quasar, adaptando-o para a linguagem visual e funcional do DSS.

### Justificativa
Este componente é essencial para fornecer uma experiência de usuário fluida e não intrusiva em dispositivos móveis e desktops. Ele permite que os usuários interajam com conteúdo secundário ou realizem ações rápidas sem perder o contexto da tela principal, melhorando a usabilidade e a eficiência da navegação.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
*   **Performance**: Animações e transições suaves, especialmente em dispositivos de baixo desempenho.
*   **Acessibilidade**: Garantir que o componente seja totalmente acessível via teclado e leitores de tela, com foco na gestão de foco e semântica ARIA.
*   **Integração**: Compatibilidade com diferentes layouts e componentes do DSS, evitando conflitos de z-index ou sobreposições indesejadas.
*   **Responsividade**: Comportamento adequado em diferentes tamanhos de tela e orientações.

### Gates
*   **Revisão de Design**: Validação do design e comportamento com a equipe de design do DSS.
*   **Auditoria de Acessibilidade**: Testes completos de acessibilidade para garantir conformidade com WCAG.
*   **Testes de Performance**: Avaliação do desempenho da animação e renderização em diferentes dispositivos.
*   **Testes de Integração**: Verificação da interação com outros componentes do DSS.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssBottomSheet` deve encapsular e estender as funcionalidades do `QBottomSheet` do Quasar. Abaixo estão os mapeamentos e considerações:

*   **Props**: Mapear props relevantes como `model-value` (para controlar visibilidade), `persistent`, `maximized`, `seamless`, `no-backdrop-dismiss`, `no-esc-dismiss`, `no-route-dismiss`, `square`, `dark`, `transition-show`, `transition-hide`.
*   **Slots**: Suportar slots padrão como `default` para o conteúdo principal e, se necessário, slots para `header` ou `footer` personalizados.
*   **Eventos**: Expor eventos como `show`, `hide`, `before-show`, `before-hide` para permitir a interação com o ciclo de vida do componente.
*   **Métodos**: Considerar a exposição de métodos como `show()` e `hide()` para controle programático.

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssBottomSheet` deve utilizar exclusivamente os tokens de design numéricos e padrão do DSS para estilização. É proibido inventar tokens com sufixos semânticos não existentes.

### Exemplos de Tokens Permitidos:
*   **Espaçamento**: `--dss-spacing-4`, `--dss-spacing-8`, `--dss-spacing-16` (de `--dss-spacing-1` a `--dss-spacing-96`)
*   **Raio de Borda**: `--dss-radius-md`, `--dss-radius-lg`, `--dss-radius-full` (apenas `--dss-radius-sm`, `-md`, `-lg`, `-full`)
*   **Cores de Superfície**: `--dss-surface-default`, `--dss-surface-variant`, `--dss-surface-inverse`
*   **Duração de Transição**: `--dss-duration-250`, `--dss-duration-300` (apenas `--dss-duration-150`, `-200`, `-250`, `-300`)
*   **Sombras**: `--dss-shadow-1`, `--dss-shadow-2`

### Tokens Proibidos (Exemplos):
*   `--dss-padding-md` (sufixo semântico não existente para espaçamento)
*   `--dss-duration-base` (sufixo semântico não existente para duração)

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
*   **Foco**: Gerenciamento de foco robusto, garantindo que o foco seja movido para o `BottomSheet` ao abrir e retorne ao elemento que o ativou ao fechar.
*   **Teclado**: Navegação completa via teclado (Tab, Shift+Tab, Esc para fechar).
*   **ARIA**: Uso de atributos ARIA apropriados (e.g., `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`).
*   **Leitores de Tela**: Conteúdo e ações devem ser corretamente anunciados por leitores de tela.

### Estados
*   **Fechado (Closed)**: O `BottomSheet` não está visível.
*   **Aberto (Open)**: O `BottomSheet` está visível e interativo.
*   **Persistente (Persistent)**: O `BottomSheet` não pode ser fechado clicando fora dele ou pressionando Esc.
*   **Maximizável (Maximized)**: O `BottomSheet` ocupa a altura total da tela.
*   **Desabilitado (Disabled)**: O `BottomSheet` não pode ser aberto ou interagir.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas do DSS
*   `DssButton`: Para ações dentro do `BottomSheet`.
*   `DssIcon`: Para ícones de fechamento ou informativos.
*   `DssSeparator`: Para separar seções de conteúdo.
*   `DssList` / `DssItem`: Para exibir listas de opções.

### Composição
O `DssBottomSheet` pode ser composto com outros componentes do DSS para criar experiências mais ricas, como:
*   `DssCard` dentro do `BottomSheet` para agrupar conteúdo.
*   `DssForm` para formulários rápidos.
*   `DssToolbar` para um cabeçalho fixo dentro do `BottomSheet`.

## 7. EXCEÇÕES PREVISTAS

*   **Conteúdo Dinâmico**: O `BottomSheet` deve ser capaz de lidar com conteúdo que muda dinamicamente após a abertura, ajustando sua altura conforme necessário.
*   **Aninhamento**: Evitar o aninhamento de múltiplos `BottomSheet`s ou modais para não prejudicar a experiência do usuário e a acessibilidade.
*   **Scroll Interno**: Quando o conteúdo excede a altura disponível, o scroll deve ser tratado internamente pelo `BottomSheet` sem afetar o scroll da página principal.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles
*   **`v-model` (Boolean)**: Para controlar a visibilidade do `BottomSheet`.
*   **`persistent` (Boolean)**: Para alternar entre comportamento persistente e não persistente.
*   **`maximized` (Boolean)**: Para alternar entre o estado normal e maximizado.
*   **`no-backdrop-dismiss` (Boolean)**: Para controlar o fechamento ao clicar no backdrop.
*   **`no-esc-dismiss` (Boolean)**: Para controlar o fechamento ao pressionar a tecla Esc.
*   **`square` (Boolean)**: Para alternar entre bordas arredondadas e quadradas.

### Composite Logic
*   Demonstrar a abertura e fechamento do `BottomSheet` através de um `DssButton`.
*   Exibir diferentes tipos de conteúdo (texto simples, lista de itens, formulário) dentro do `BottomSheet`.
*   Cenário de uso com `DssList` e `DssItem` para seleção de opções.

### Estados a Expor
*   **Aberto/Fechado**: Visualização do `BottomSheet` em ambos os estados.
*   **Comportamento Persistente**: Demonstração de que o `BottomSheet` não fecha ao clicar fora ou pressionar Esc.
*   **Comportamento Maximizado**: Visualização do `BottomSheet` ocupando a altura total da tela.