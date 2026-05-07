# Pré-prompt: DssPopupEdit

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
DssChip (componente interativo)

### Golden Context
O DssPopupEdit é um componente modal ou não-modal que permite a edição de informações em um contexto específico, sem a necessidade de navegar para uma nova página. Ele deve ser utilizado para interações rápidas e focadas na modificação de dados, como editar um campo de texto, selecionar opções ou ajustar configurações. Sua natureza interativa e de manipulação de dados o alinha com o comportamento de componentes como o DssChip, que gerencia estados e interações do usuário.

### Justificativa
A necessidade de um componente DssPopupEdit surge da demanda por uma experiência de usuário fluida e eficiente em cenários de edição de dados. Ele consolida padrões de UI para edição inline ou contextual, garantindo consistência visual e funcional em toda a aplicação. Ao encapsular a lógica de exibição, edição e submissão, o DssPopupEdit reduz a complexidade de desenvolvimento e promove a reutilização, alinhando-se aos princípios do Design System.

## 2. RISCOS ARQUITETURAIS E GATES

- **Gerenciamento de Estado**: Como o estado do formulário dentro do popup será gerenciado e sincronizado com o componente pai. Considerar soluções como `v-model` ou gerenciamento de estado explícito.
- **Posicionamento e Responsividade**: Garantir que o popup se posicione corretamente em diferentes tamanhos de tela e dispositivos, especialmente em cenários de rolagem ou com múltiplos popups abertos.
- **Performance**: Avaliar o impacto na performance ao renderizar formulários complexos dentro do popup, especialmente em casos de re-renderização frequente.
- **Animações**: Definir padrões de animação de entrada e saída para garantir uma experiência de usuário suave e consistente.
- **Fechamento**: Definir as condições de fechamento (clique fora, tecla ESC, botão de fechar) e como isso afeta o estado dos dados em edição.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O DssPopupEdit deve abstrair e padronizar funcionalidades de componentes Quasar como `QDialog`, `QMenu` ou `QPopupProxy`, focando em um fluxo de edição. A API deve expor propriedades para:

- **`modelValue` (v-model)**: Para controlar a visibilidade do popup (booleano).
- **`data`**: Objeto contendo os dados a serem editados.
- **`title`**: Título do popup.
- **`actions`**: Slot ou prop para botões de ação (Salvar, Cancelar).
- **`loading`**: Estado de carregamento para indicar processamento (booleano).
- **`error`**: Mensagem de erro a ser exibida (string).
- **`persistent`**: Se o popup deve ser persistente (não fecha ao clicar fora ou ESC).
- **`position`**: Posição do popup (e.g., 'top', 'bottom', 'left', 'right', 'standard').

Eventos a serem emitidos:
- **`update:modelValue`**: Ao fechar o popup.
- **`save`**: Ao confirmar a edição dos dados.
- **`cancel`**: Ao cancelar a edição.

## 4. GOVERNANÇA DE TOKENS E CSS

O DssPopupEdit deve utilizar exclusivamente os tokens de design do DSS para espaçamento, raio, duração e cores de superfície.

- **Espaçamento interno (padding)**: `--dss-spacing-16` (para conteúdo), `--dss-spacing-8` (para elementos menores).
- **Espaçamento externo (margin)**: `--dss-spacing-24` (entre o popup e a borda da tela).
- **Raio da borda (border-radius)**: `--dss-radius-md`.
- **Cor de fundo (background-color)**: `--dss-surface-default`.
- **Sombra (box-shadow)**: Utilizar token de sombra padrão do DSS (se disponível, caso contrário, definir um padrão que se alinhe).
- **Duração da transição (transition-duration)**: `--dss-duration-250`.

**NUNCA** inventar tokens como `--dss-padding-md` ou `--dss-duration-base`.

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
- **Foco**: Gerenciamento de foco para garantir que o foco seja movido para o popup ao abrir e retorne ao elemento que o ativou ao fechar.
- **ARIA**: Utilizar atributos ARIA apropriados (`role=