# Pré-prompt: DssAjaxBar

## 1. CLASSIFICAÇÃO E CONTEXTO

**Golden Reference**: DssBadge

**Golden Context**: O DssAjaxBar é um componente de feedback não-interativo que indica o status de operações assíncronas (AJAX) em andamento. Ele se posiciona na camada de feedback visual, informando o usuário sobre o carregamento de dados ou processos em segundo plano, sem bloquear a interação com a interface. Sua principal função é melhorar a percepção de desempenho e a experiência do usuário, evitando a sensação de que a aplicação está travada. O componente é projetado para ser sutil, mas perceptível, fornecendo uma indicação clara de que o sistema está trabalhando em uma solicitação.

**Justificativa**: A necessidade de um DssAjaxBar surge da ubiquidade de operações assíncronas em aplicações modernas. Prover feedback visual claro e consistente sobre o estado dessas operações é crucial para a usabilidade. Este componente padroniza a forma como o feedback de carregamento é apresentado, garantindo alinhamento com a identidade visual e os princípios de experiência do usuário do Design System, além de reduzir a duplicação de esforços no desenvolvimento de indicadores de carregamento. A padronização também ajuda a manter uma linguagem visual coesa em toda a aplicação, o que é essencial para a confiança do usuário.

## 2. RISCOS ARQUITETURAIS E GATES

*   **Performance**: O DssAjaxBar deve ser leve e não impactar negativamente o desempenho da aplicação, especialmente em cenários de múltiplas requisições simultâneas. A lógica de exibição e ocultação deve ser otimizada para evitar repaints e layouts desnecessários. O uso de transformações CSS (como `translate` e `scale`) é preferível a alterações de propriedades que disparam reflows (como `width` ou `left`).
*   **Consistência Global**: Garantir que o DssAjaxBar seja o único mecanismo de feedback de carregamento global para requisições AJAX, evitando conflitos com outros loaders ou spinners implementados de forma ad-hoc. A presença de múltiplos indicadores de carregamento pode confundir o usuário e poluir a interface.
*   **Gerenciamento de Estado**: A complexidade do gerenciamento de estado global para ativar/desativar o DssAjaxBar pode levar a bugs, como barras que não desaparecem ou que aparecem em momentos inadequados. É crucial definir um gate claro para a integração com o gerenciamento de estado da aplicação (e.g., Vuex, Pinia). O componente deve ser capaz de lidar com múltiplas requisições concorrentes, mantendo-se visível enquanto houver pelo menos uma requisição em andamento.
*   **Acessibilidade**: Assegurar que o componente seja acessível para usuários com deficiência visual, fornecendo feedback adequado via leitores de tela, mesmo sendo um componente visual. A falta de feedback acessível pode deixar usuários de tecnologias assistivas sem saber que uma operação está em andamento.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O DssAjaxBar pode ser inspirado no `QAjaxBar` do Quasar, mas com uma API simplificada e alinhada aos padrões do DSS. A tabela abaixo detalha o mapeamento de propriedades, slots e eventos.

| Quasar (QAjaxBar) Propriedade/Slot/Evento | DSS (DssAjaxBar) Propriedade/Slot/Evento | Descrição DSS | Tipo DSS | Notas |
| :--- | :--- | :--- | :--- | :--- |
| `position` | `position` | Posição da barra na tela (top, bottom, left, right). | `String` | Padrão: 'top'. Define onde a barra será ancorada. |
| `size` | `size` | Espessura da barra. | `String` | Padrão: '2px'. Permite ajustar a visibilidade da barra. |
| `color` | `color` | Cor da barra. | `String` | Padrão: 'hub'. Utiliza os tokens de cor do DSS. |
| `skip-hijack` | `skipHijack` | Se verdadeiro, não intercepta requisições AJAX automaticamente. | `Boolean` | Padrão: false. Útil para controle manual. |
| `reverse` | `reverse` | Inverte a direção da animação. | `Boolean` | Padrão: false. Altera o fluxo visual da barra. |
| `hijack-filter` | `hijackFilter` | Função para filtrar quais requisições devem ser interceptadas. | `Function` | Permite ignorar requisições específicas (ex: polling). |
| `@start` | `@start` | Evento emitido quando a barra começa a carregar. | `Event` | Útil para sincronizar outros elementos da UI. |
| `@stop` | `@stop` | Evento emitido quando a barra para de carregar. | `Event` | Indica a conclusão de todas as requisições interceptadas. |

## 4. GOVERNANÇA DE TOKENS E ESTILIZAÇÃO

A estilização do DssAjaxBar deve ser feita exclusivamente através de Design Tokens do DSS, garantindo consistência visual e facilitando a manutenção. O uso de valores hardcoded é estritamente proibido.

*   **Cores**:
    *   Cor principal da barra: `--dss-action-hub` (substituindo o antigo hub). Esta é a cor padrão para indicar atividade.
    *   Cor de fundo (se aplicável): `--dss-action-hub-surface`. Pode ser usada para criar um contraste sutil.
    *   Cores alternativas: `--dss-action-water` (para informações), `--dss-action-waste` (para alertas ou erros).
*   **Espaçamento e Tamanho**:
    *   Espessura padrão: `--dss-spacing-1` (ou valor específico para bordas/linhas). A barra deve ser fina o suficiente para não interferir no layout.
    *   Evitar tokens fantasmas como `--dss-spacing-4`, usar `--dss-spacing-4` se necessário para margens ou posicionamento.
*   **Tipografia**:
    *   Não aplicável, pois o componente é puramente visual e não contém texto.
    *   Evitar tokens fantasmas como `--dss-text-subtle`, usar `--dss-text-subtle` se houver necessidade de texto auxiliar (ex: em um tooltip associado).
*   **Foco e Interação**:
    *   Não aplicável, pois o componente não é interativo.
    *   Evitar tokens fantasmas como `outline: 2px solid white`, usar `outline: 2px solid white` se necessário para acessibilidade (embora improvável para este componente).
*   **Animação**:
    *   Duração da animação: `--dss-animation-duration-normal`.
    *   Curva de animação (easing): `--dss-animation-easing-standard`.

## 5. ACESSIBILIDADE (A11Y)

A acessibilidade é fundamental para garantir que todos os usuários possam perceber o status de carregamento. O DssAjaxBar deve implementar as seguintes práticas:

*   **ARIA Roles**: O DssAjaxBar deve utilizar o atributo `role="progressbar"` para indicar sua função aos leitores de tela. Isso informa ao usuário que um processo está em andamento.
*   **ARIA Attributes**:
    *   `aria-valuemin="0"` e `aria-valuemax="100"` para definir os limites da barra.
    *   `aria-valuenow` deve ser atualizado dinamicamente com o progresso atual, se aplicável.
    *   Se o progresso for indeterminado (o que é comum para requisições AJAX onde o tamanho da resposta é desconhecido), omitir `aria-valuenow` ou usar um estado indeterminado específico.
*   **Anúncios de Tela**: Utilizar `aria-live="polite"` em um elemento invisível para anunciar o início e o fim do carregamento para usuários de leitores de tela. Exemplo: "Carregando dados..." e "Carregamento concluído".
*   **Contraste**: Garantir que a cor da barra tenha contraste suficiente com o fundo da aplicação, seguindo as diretrizes WCAG AA.

## 6. DEPENDÊNCIAS E INTEGRAÇÕES

O DssAjaxBar pode depender de bibliotecas ou módulos internos para interceptar requisições AJAX.

*   **Interceptadores HTTP**: Integração com Axios ou Fetch API para detectar automaticamente o início e o fim das requisições. O componente deve ser capaz de se conectar globalmente a essas APIs.
*   **Gerenciamento de Estado**: Integração opcional com Vuex ou Pinia para controle manual da barra em cenários complexos, onde a interceptação automática não é suficiente ou desejada.
*   **Quasar Framework**: O componente pode encapsular o `QAjaxBar` do Quasar, adaptando sua API e estilização para os padrões do DSS. Isso permite aproveitar a lógica robusta do Quasar enquanto mantém a identidade visual do DSS.
*   **Vue Router**: Integração com o Vue Router para exibir a barra durante a navegação entre rotas, melhorando a percepção de velocidade da aplicação (SPA).

## 7. EXCEÇÕES E CASOS DE USO NÃO SUPORTADOS

Existem cenários onde o uso do DssAjaxBar não é recomendado ou suportado.

*   **Carregamento Local**: Não utilizar para indicar o carregamento de componentes específicos ou áreas restritas da tela (ex: um card ou uma tabela). Nesses casos, utilizar o `DssSpinner` ou `DssSkeleton`.
*   **Operações Síncronas**: Não utilizar para operações que bloqueiam a thread principal, pois a animação da barra também será bloqueada, resultando em uma experiência ruim.
*   **Upload/Download de Arquivos**: Para operações de longa duração com progresso determinístico (onde o tamanho total e o progresso atual são conhecidos), considerar o uso de um componente de progresso mais detalhado, como o `DssProgressBar`, que pode exibir a porcentagem exata.
*   **Polling Frequente**: Se a aplicação faz requisições de polling muito frequentes (ex: a cada segundo), a barra pode ficar piscando constantemente. Nesses casos, é recomendável usar a propriedade `hijackFilter` para ignorar essas requisições.

## 8. SUPERFÍCIE DE PLAYGROUND

A superfície de playground permite testar e visualizar o componente em diferentes estados e configurações, garantindo que ele se comporte conforme o esperado em diversas situações.

### Controles Obrigatórios

Os seguintes controles devem estar disponíveis no playground para permitir a manipulação das propriedades do componente:

| Propriedade | Tipo | Valores Permitidos | Valor Padrão | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `position` | `Select` | 'top', 'bottom', 'left', 'right' | 'top' | Define a posição da barra na tela. |
| `color` | `Select` | 'hub', 'water', 'waste' | 'hub' | Define a cor da barra. |
| `size` | `Input` | Valores CSS válidos (ex: '2px', '4px', '0.5rem') | '2px' | Define a espessura da barra. |
| `reverse` | `Toggle` | true, false | false | Inverte a direção da animação. |
| `skipHijack` | `Toggle` | true, false | false | Desativa a interceptação automática. |

### Composite Logic

A lógica de composição do DssAjaxBar no playground deve permitir a simulação de requisições AJAX para visualizar o comportamento da barra. O exemplo abaixo demonstra como integrar o componente com botões para controle manual.

```vue
<template>
  <div class="playground-container">
    <DssAjaxBar
      ref="ajaxBar"
      :position="position"
      :color="color"
      :size="size"
      :reverse="reverse"
      :skip-hijack="skipHijack"
      @start="onStart"
      @stop="onStop"
    />
    
    <div class="controls-panel">
      <DssButton @click="simulateRequest" color="hub">Simular Requisição (2s)</DssButton>
      <DssButton @click="startManual" color="water">Iniciar Manualmente</DssButton>
      <DssButton @click="stopManual" color="waste">Parar Manualmente</DssButton>
    </div>
    
    <div class="status-panel">
      <p>Status: {{ statusMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DssAjaxBar, DssButton } from '@sansys/dss';

const ajaxBar = ref(null);
const position = ref('top');
const color = ref('hub');
const size = ref('2px');
const reverse = ref(false);
const skipHijack = ref(true); // Desativado para controle manual no playground
const statusMessage = ref('Aguardando...');

const simulateRequest = () => {
  ajaxBar.value.start();
  statusMessage.value = 'Carregando (Simulação)...';
  setTimeout(() => {
    ajaxBar.value.stop();
  }, 2000);
};

const startManual = () => {
  ajaxBar.value.start();
};

const stopManual = () => {
  ajaxBar.value.stop();
};

const onStart = () => {
  statusMessage.value = 'Carregamento Iniciado';
};

const onStop = () => {
  statusMessage.value = 'Carregamento Concluído';
};
</script>

<style scoped>
.playground-container {
  padding: var(--dss-spacing-4);
  position: relative;
  min-height: 200px;
  border: 1px solid var(--dss-border-subtle);
}
.controls-panel {
  display: flex;
  gap: var(--dss-spacing-2);
  margin-bottom: var(--dss-spacing-4);
}
.status-panel {
  color: var(--dss-text-subtle);
}
</style>
```

### Estados a Expor

A tabela abaixo lista os estados predefinidos que devem ser expostos no playground para facilitar a visualização das diferentes configurações do componente.

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Padrão (Topo) | Barra de carregamento na posição superior com cor hub. | Visual | `position="top"`, `color="hub"`, `size="2px"` |
| Inferior (Water) | Barra de carregamento na posição inferior com cor water. | Visual | `position="bottom"`, `color="water"`, `size="2px"` |
| Espessa (Waste) | Barra de carregamento mais espessa com cor waste. | Visual | `position="top"`, `color="waste"`, `size="4px"` |
| Lateral Esquerda | Barra de carregamento na lateral esquerda. | Visual | `position="left"`, `color="hub"`, `size="2px"` |
| Lateral Direita | Barra de carregamento na lateral direita. | Visual | `position="right"`, `color="hub"`, `size="2px"` |
| Reversa | Barra de carregamento com animação invertida. | Visual | `position="top"`, `color="hub"`, `reverse="true"` |
