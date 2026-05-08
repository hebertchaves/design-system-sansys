# Pré-prompt: DssDialog

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
Para componentes não-interativos, a referência dourada é o `DssBadge`. Para componentes interativos, a referência dourada é o `DssChip`.

### Golden Context
O `DssDialog` é um componente modal que sobrepõe o conteúdo principal da aplicação para exibir informações críticas, solicitar entrada do usuário ou confirmar ações. Ele interrompe o fluxo do usuário para garantir atenção, sendo essencial para interações que exigem foco e decisão imediata. Seu contexto de uso abrange desde alertas simples até formulários complexos, sempre garantindo uma experiência consistente e acessível.

### Justificativa
A padronização do `DssDialog` é crucial para garantir a consistência visual e funcional em todas as interações modais da aplicação. Ele centraliza a lógica de acessibilidade (gerenciamento de foco, semântica ARIA), gestão de estado e estilização, reduzindo a complexidade e o tempo de desenvolvimento. Além disso, assegura que todos os diálogos sigam as diretrizes de usabilidade e acessibilidade do Design System, proporcionando uma experiência de usuário coesa e inclusiva.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos
*   **Gerenciamento de Z-index**: Potenciais conflitos de empilhamento com outros componentes sobrepostos, exigindo uma estratégia robusta de z-index.
*   **Acessibilidade**: Falha em implementar corretamente o gerenciamento de foco (trap focus), navegação por teclado e atributos ARIA, comprometendo a usabilidade para usuários com deficiência.
*   **Performance**: A renderização de conteúdo complexo ou a abertura/fechamento frequente de diálogos pode impactar a performance da aplicação, especialmente em dispositivos de baixo desempenho.
*   **Customização Excessiva**: Uma API muito flexível pode levar a implementações inconsistentes que desviam das diretrizes do Design System.
*   **Gestão de Estado**: Complexidade na sincronização do estado de abertura/fechamento do diálogo com o estado da aplicação, especialmente em cenários de múltiplos diálogos aninhados.

### Gates
*   **Revisão de Acessibilidade**: Testes rigorosos com leitores de tela e navegação por teclado para validar o gerenciamento de foco e a semântica ARIA.
*   **Testes de Performance**: Avaliação do tempo de abertura/fechamento e do impacto na renderização da página com diferentes volumes de conteúdo.
*   **Validação de Conformidade**: Verificação da adesão estrita aos tokens e diretrizes de design do DSS.
*   **Revisão de API**: Análise da clareza, extensibilidade controlada e facilidade de uso da API do componente.
*   **Testes de Regressão**: Garantir que as alterações no `DssDialog` não introduzam problemas em outros componentes ou fluxos de usuário.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssDialog` será construído sobre o `QDialog` do Quasar, abstraindo e padronizando suas propriedades, slots e eventos para se alinhar às convenções do DSS.

### Propriedades Mapeadas/Padronizadas
*   `v-model` (Quasar) → `v-model:open` (DSS): Controla a visibilidade do diálogo.
*   `persistent` (Quasar) → `persistent` (DSS): Impede o fechamento ao clicar fora ou pressionar ESC.
*   `seamless` (Quasar) → `seamless` (DSS): Remove o backdrop e permite interação com o conteúdo abaixo.
*   `maximized` (Quasar) → `maximized` (DSS): Exibe o diálogo em tela cheia.
*   `full-width` (Quasar) → `full-width` (DSS): Ocupa 100% da largura disponível.
*   `full-height` (Quasar) → `full-height` (DSS): Ocupa 100% da altura disponível.
*   `position` (Quasar) → `position` (DSS): Define a posição do diálogo (e.g., 'top', 'bottom', 'left', 'right', 'standard').
*   `transition-show` (Quasar) → `transition-enter` (DSS): Transição de entrada (e.g., 'fade', 'slide-up').
*   `transition-hide` (Quasar) → `transition-leave` (DSS): Transição de saída (e.g., 'fade', 'slide-down').
*   `no-esc-dismiss` (Quasar) → `disable-esc` (DSS): Desabilita o fechamento via tecla ESC.
*   `no-backdrop-dismiss` (Quasar) → `disable-backdrop-click` (DSS): Desabilita o fechamento via clique no backdrop.

### Slots Mapeados/Padronizados
*   `default` (Quasar) → `default` (DSS): Conteúdo principal do diálogo.
*   `header` (DSS): Slot para o cabeçalho do diálogo (título, botão de fechar).
*   `footer` (DSS): Slot para o rodapé do diálogo (botões de ação).

### Eventos Mapeados/Padronizados
*   `@show` (Quasar) → `@open` (DSS): Emitido quando o diálogo é aberto.
*   `@hide` (Quasar) → `@close` (DSS): Emitido quando o diálogo é fechado.
*   `@before-show` (Quasar) → `@before-open` (DSS): Emitido antes do diálogo ser aberto.
*   `@before-hide` (Quasar) → `@before-close` (DSS): Emitido antes do diálogo ser fechado.

## 4. GOVERNANÇA DE TOKENS E CSS

A estilização do `DssDialog` utilizará exclusivamente tokens numéricos e padrão do DSS para garantir consistência e manutenibilidade. Não serão permitidos tokens com sufixos semânticos não existentes.

### Exemplos de Tokens a Serem Utilizados
*   **Espaçamento**: `--dss-spacing-4`, `--dss-spacing-8`, `--dss-spacing-16`, `--dss-spacing-24` para padding e margin internos.
*   **Raio de Borda**: `--dss-radius-md` para as bordas do diálogo.
*   **Cores de Superfície**: `--dss-surface-default` para o fundo do diálogo, `--dss-action-hub-surface` para o backdrop.
*   **Sombras**: `--dss-shadow-2` para a elevação do diálogo.
*   **Duração de Transição**: `--dss-duration-250` para as animações de entrada e saída.
*   **Tipografia**: Tokens de tipografia do DSS para títulos e corpo do texto dentro do diálogo.
*   **Cores de Texto: `--dss-text-hub`, `--dss-text-subtle`.`.

### Restrições
*   **Proibido**: `--dss-spacing-4`, `--dss-duration-base`, `--dss-dialog-background`. Apenas tokens explicitamente definidos no DSS serão utilizados.
*   Qualquer nova necessidade de token deve ser proposta e aprovada pelo time de Design System.

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
*   **Foco**: O foco deve ser movido para o primeiro elemento interativo dentro do diálogo ao abrir e retornado ao elemento que o ativou ao fechar (trap focus).
*   **Navegação por Teclado**: Suporte completo para navegação via `Tab`, `Shift + Tab` e fechamento via `Esc` (quando não `persistent`).
*   **Atributos ARIA**: Implementação de `role="dialog"` ou `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby` e `aria-describedby` para semântica adequada.
*   **Contraste**: Garantir contraste adequado entre o texto e o fundo do diálogo, e entre o diálogo e o backdrop.

### Estados
*   **Aberto/Fechado**: Controlado pela propriedade `v-model:open`.
*   **Carregando**: Pode ser implementado através de um slot ou propriedade para exibir um indicador de carregamento dentro do diálogo.
*   **Erro**: Pode ser sinalizado visualmente com bordas ou ícones de erro, ou através de mensagens de validação dentro do conteúdo do diálogo.
*   **Desabilitado**: Elementos interativos dentro do diálogo podem ter estados desabilitados.
*   **Maximizável**: Estado de tela cheia, controlado pela propriedade `maximized`.
*   **Persistente**: Estado onde o diálogo não pode ser fechado por clique no backdrop ou tecla ESC, controlado pela propriedade `persistent`.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas (DSS)
O `DssDialog` dependerá de outros componentes e utilitários do Design System para sua construção e estilização:
*   `DssButton`: Para botões de ação no rodapé do diálogo.
*   `DssIcon`: Para ícones de fechar ou de status.
*   `DssTypography`: Para garantir a consistência tipográfica do título e conteúdo.
*   `DssCard`: Pode ser usado internamente para a estrutura visual do corpo do diálogo.
*   `DssBackdrop`: Para a camada de fundo que obscurece o conteúdo principal.

### Composição
O `DssDialog` é um componente de composição, permitindo que outros componentes DSS sejam aninhados em seus slots `default`, `header` e `footer` para criar experiências modais ricas e variadas. Isso promove a reutilização e a consistência, ao mesmo tempo em que oferece flexibilidade para diferentes casos de uso.

## 7. EXCEÇÕES PREVISTAS

*   **Modais de Notificação (Toasts/Snackbars)**: Para notificações não-interativas e temporárias, o `DssDialog` não é o componente adequado. Deve-se usar um componente específico de notificação (e.g., `DssToast` ou `DssSnackbar`).
*   **Tooltips/Popovers**: Para informações contextuais que aparecem ao passar o mouse ou clicar em um elemento, mas que não bloqueiam a interação com o restante da página, o `DssDialog` é excessivo. Componentes como `DssTooltip` ou `DssPopover` devem ser utilizados.
*   **Diálogos de Sistema Operacional**: O `DssDialog` não deve tentar replicar diálogos nativos do sistema operacional (e.g., `alert()`, `confirm()`, `prompt()`), mas sim fornecer uma alternativa estilizada e controlada pelo Design System.
*   **Diálogos Aninhados Complexos**: Embora a composição seja permitida, múltiplos níveis de diálogos aninhados podem levar a problemas de usabilidade e acessibilidade. Deve-se buscar soluções alternativas de fluxo de usuário para evitar mais de dois níveis de aninhamento.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles
*   **`v-model:open` (Boolean)**: Alterna a visibilidade do diálogo.
*   **`persistent` (Boolean)**: Impede o fechamento por clique externo ou ESC.
*   **`maximized` (Boolean)**: Exibe o diálogo em tela cheia.
*   **`position` (String)**: Define a posição do diálogo ('standard', 'top', 'bottom', 'left', 'right').
*   **`transition-enter` (String)**: Nome da transição de entrada (e.g., 'fade', 'slide-up').
*   **`transition-leave` (String)**: Nome da transição de saída (e.g., 'fade', 'slide-down').
*   **`disable-esc` (Boolean)**: Desabilita o fechamento via tecla ESC.
*   **`disable-backdrop-click` (Boolean)**: Desabilita o fechamento via clique no backdrop.

### Composite Logic
```vue
<template>
  <DssDialog v-model:open="isDialogOpen" :persistent="isPersistent" :maximized="isMaximized" :position="dialogPosition">
    <template #header>
      <div class="dss-dialog-header">
        <DssTypography variant="h6">Título do Diálogo</DssTypography>
        <DssButton icon="close" flat round @click="isDialogOpen = false" />
      </div>
    </template>

    <template #default>
      <div class="dss-dialog-content">
        <DssTypography variant="body1">Conteúdo principal do diálogo. Pode incluir formulários, informações detalhadas ou outros componentes DSS.</DssTypography>
        <DssInput label="Nome" />
      </div>
    </template>

    <template #footer>
      <div class="dss-dialog-footer">
        <DssButton label="Cancelar" flat @click="isDialogOpen = false" />
        <DssButton label="Confirmar" color="hub" @click="handleConfirm" />
      </div>
    </template>
  </DssDialog>
</template>

<script setup>
import { ref } from 'vue';
// Importar componentes DSS conforme necessário

const isDialogOpen = ref(false);
const isPersistent = ref(false);
const isMaximized = ref(false);
const dialogPosition = ref('standard'); // 'standard', 'top', 'bottom', 'left', 'right'

function handleConfirm() {
  // Lógica de confirmação
  isDialogOpen.value = false;
}
</script>

<style scoped>
.dss-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--dss-spacing-16);
  border-bottom: 1px solid var(--dss-border-color-default);
}

.dss-dialog-content {
  padding: var(--dss-spacing-16);
}

.dss-dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: var(--dss-spacing-16);
  border-top: 1px solid var(--dss-border-color-default);
  gap: var(--dss-spacing-8);
}
</style>
```

### Estados a Expor
*   **`open` (Boolean)**: Indica se o diálogo está visível ou oculto.
*   **`maximized` (Boolean)**: Indica se o diálogo está em modo de tela cheia.
*   **`position` (String)**: A posição atual do diálogo.
*   **`hasHeader` (Boolean)**: Indica se o slot `header` está preenchido.
*   **`hasFooter` (Boolean)**: Indica se o slot `footer` está preenchido.
*   **`isPersistent` (Boolean)**: Indica se o diálogo é persistente.