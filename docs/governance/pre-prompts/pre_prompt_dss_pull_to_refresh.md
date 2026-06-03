# Pré-prompt: DssPullToRefresh

## 1. CLASSIFICAÇÃO E CONTEXTO

*   **Golden Reference:** DssChip
*   **Golden Context:** O `DssPullToRefresh` é um componente interativo que permite aos usuários atualizar o conteúdo de uma lista ou área de exibição puxando a tela para baixo. Ele fornece feedback visual e tátil durante o processo de atualização, indicando o estado de carregamento e a conclusão da ação.
*   **Justificativa:** Essencial para a experiência do usuário em aplicações que exibem dados dinâmicos, garantindo que o conteúdo esteja sempre atualizado com uma interação intuitiva e familiar, especialmente em dispositivos móveis e interfaces touch.
*   **Categoria:** Navegação e Interação de Dados.
*   **Nível de Complexidade:** Intermediário. Requer manipulação de eventos de toque, animações de carregamento e integração com o ciclo de vida de dados da aplicação.

## 2. RISCOS ARQUITETURAIS E GATES

*   **Riscos:**
    *   Integração inadequada com o ciclo de vida de dados, levando a chamadas de API duplicadas ou estados de carregamento inconsistentes.
    *   Problemas de desempenho em listas muito longas ou complexas, impactando a fluidez da rolagem e a responsividade do refresh.
    *   Conflitos com rolagem nativa do navegador ou outros componentes de rolagem aninhados (ex: modais, painéis laterais).
    *   Acessibilidade para usuários com deficiência motora ou visual, especialmente na interação com o gesto de puxar para atualizar, que pode não ser intuitivo ou acessível via teclado.
    *   Uso de tokens desatualizados ou não padronizados, quebrando a consistência visual do Design System.
*   **Gates:**
    *   Definição clara dos eventos de `@refresh` para gerenciar o ciclo de vida da atualização de dados de forma determinística.
    *   Testes de integração abrangentes com diferentes fontes de dados e cenários de carregamento (sucesso, falha, atraso, timeout).
    *   Validação de desempenho em dispositivos de baixo custo e redes lentas para garantir uma experiência de usuário consistente e sem travamentos.
    *   Revisão de acessibilidade (WCAG 2.1 AA) para garantir que o componente seja utilizável por todos os usuários, incluindo alternativas para o gesto de puxar (ex: botão de atualização explícito).
    *   Auditoria rigorosa de tokens de design, garantindo o uso exclusivo das variáveis CSS oficiais do DSS.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O componente `DssPullToRefresh` atua como um wrapper altamente estilizado e controlado sobre o `QPullToRefresh` do Quasar, restringindo propriedades não conformes e injetando a identidade visual do DSS.

| Quasar (`QPullToRefresh`) | DSS (`DssPullToRefresh`) | Notas de Implementação e Restrições |
| :--- | :--- | :--- |
| `color` | `color` | Restrito aos tokens de cor do DSS (ex: `hub`, `water`, `waste`). Não aceita cores hexadecimais arbitrárias. |
| `bg-color` | `bgColor` | Define a cor de fundo do indicador de refresh. Mapeado para tokens de superfície. |
| `icon` | `icon` | Ícone exibido durante o estado de puxar. Deve usar a biblioteca de ícones oficial do DSS. |
| `no-mouse` | `noMouse` | Desativa a interação via mouse. Útil para forçar o uso apenas em dispositivos touch. |
| `disable` | `disabled` | Desativa completamente o componente, impedindo a interação de puxar. |
| `@refresh` | `@refresh` | Evento emitido quando a ação de puxar é concluída e a atualização deve iniciar. Recebe uma função `done` como parâmetro. |
| `pull-message` | N/A | Removido. O DSS utiliza apenas feedback visual (ícone/spinner) para manter a interface limpa. |
| `release-message` | N/A | Removido pelo mesmo motivo acima. |
| `refresh-message` | N/A | Removido pelo mesmo motivo acima. |

**Propriedades Exclusivas do DSS:**

*   `size`: Define o tamanho do indicador de refresh (`sm`, `md`, `lg`). Padrão é `md`.
*   `spinnerType`: Permite escolher entre diferentes estilos de spinner de carregamento padronizados no DSS.

## 4. GOVERNANÇA DE TOKENS E ESTILIZAÇÃO

A estilização do `DssPullToRefresh` deve ser estritamente baseada nos tokens CSS do Design System. O uso de valores hardcoded ou tokens obsoletos é proibido.

**Mapeamento de Tokens:**

*   **Cores de Marca (Brand):**
    *   Substituir `hub` por `hub`.
    *   Substituir `water` por `water`.
    *   Substituir `waste` por `waste`.
*   **Tokens de Ação e Superfície:**
    *   Cor de ação principal: `--dss-action-hub` (NÃO usar `--dss-action-hub`).
    *   Superfície de ação principal: `--dss-action-hub-surface` (NÃO usar `--dss-action-hub-surface`).
*   **Espaçamento e Tipografia:**
    *   Espaçamento interno: `--dss-spacing-4` (NÃO usar `--dss-spacing-4`).
    *   Cor de texto secundário: `--dss-text-subtle` (NÃO usar `--dss-text-subtle`).
*   **Foco e Acessibilidade:**
    *   Anel de foco: Utilizar `outline: 2px solid white` para alto contraste (NÃO usar `outline: 2px solid white`).

**Exemplo de Estilização CSS (SCSS):**

```scss
.dss-pull-to-refresh {
  // Container principal
  position: relative;
  width: 100%;
  
  &__indicator {
    background-color: var(--dss-action-hub-surface);
    color: var(--dss-action-hub);
    padding: var(--dss-spacing-4);
    border-radius: 50%;
    box-shadow: var(--dss-shadow-sm);
    
    // Estados de cor baseados na marca
    &--hub {
      color: var(--dss-brand-hub);
    }
    &--water {
      color: var(--dss-brand-water);
    }
    &--waste {
      color: var(--dss-brand-waste);
    }
  }
  
  &__text {
    color: var(--dss-text-subtle);
    font-family: var(--dss-font-family-base);
  }
  
  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
}
```

## 5. ACESSIBILIDADE E SEMÂNTICA

O `DssPullToRefresh` deve ser acessível a todos os usuários, independentemente de suas capacidades motoras ou visuais.

*   **Alternativas de Interação:** O gesto de "puxar para atualizar" é inerentemente inacessível para usuários de teclado ou leitores de tela. É OBRIGATÓRIO fornecer um botão de atualização alternativo (ex: um `DssButton` com ícone de refresh) na interface quando o `DssPullToRefresh` for utilizado.
*   **Aria Attributes:**
    *   O container da lista deve ter `aria-live="polite"` para anunciar quando o conteúdo for atualizado.
    *   Durante o carregamento, o indicador deve ter `aria-busy="true"`.
*   **Foco:** O componente em si não precisa receber foco, mas o conteúdo atualizado deve gerenciar o foco adequadamente após a atualização (ex: mover o foco para o primeiro novo item ou manter a posição de rolagem).
*   **Contraste:** Garantir que as cores do indicador de refresh (fundo e ícone) atendam à proporção de contraste mínima de 4.5:1 (WCAG AA).

## 6. COMPORTAMENTO E ESTADOS

O componente possui um ciclo de vida de estados bem definido durante a interação:

1.  **Idle (Ocioso):** O componente está invisível ou em sua posição inicial. A lista rola normalmente.
2.  **Pulling (Puxando):** O usuário está arrastando a tela para baixo. O indicador de refresh começa a aparecer e se mover para baixo, muitas vezes com uma animação de rotação ou opacidade proporcional à distância puxada.
3.  **Ready (Pronto para Soltar):** O usuário puxou além do limite mínimo necessário para acionar a atualização. O indicador sinaliza visualmente que a ação será iniciada se o usuário soltar a tela.
4.  **Refreshing (Atualizando):** O usuário soltou a tela. O indicador permanece visível e animado (ex: spinner girando). O evento `@refresh` é emitido.
5.  **Done (Concluído):** A função `done()` passada pelo evento `@refresh` é chamada pela aplicação. O indicador desaparece com uma animação suave e o componente retorna ao estado Idle.

**Tratamento de Erros:**
Se a atualização falhar, o componente deve retornar ao estado Idle e a aplicação deve exibir uma mensagem de erro apropriada (ex: um `DssToast` ou `DssAlert`), não deixando o spinner girando infinitamente.

## 7. TESTES E VALIDAÇÃO

A suíte de testes para o `DssPullToRefresh` deve cobrir interações de toque, ciclo de vida de eventos e renderização visual.

*   **Testes Unitários (Vitest/Vue Test Utils):**
    *   Verificar se o componente renderiza corretamente com as propriedades padrão.
    *   Simular eventos de touch (`touchstart`, `touchmove`, `touchend`) para validar a transição de estados (Idle -> Pulling -> Ready -> Refreshing).
    *   Garantir que o evento `@refresh` seja emitido corretamente quando o limite de puxar for atingido.
    *   Verificar se a chamada da função `done()` retorna o componente ao estado Idle.
*   **Testes de Integração:**
    *   Montar o componente com uma lista de itens e simular uma atualização de dados assíncrona.
    *   Validar o comportamento quando a atualização é rápida (mock imediato) e lenta (mock com delay).
*   **Testes Visuais (Storybook/Chromatic):**
    *   Capturar snapshots dos estados Idle, Pulling e Refreshing.
    *   Validar a aplicação correta dos tokens de cor (`hub`, `water`, `waste`).

## 8. SUPERFÍCIE DE PLAYGROUND

A superfície de playground no Storybook deve permitir a exploração interativa de todas as capacidades do `DssPullToRefresh`.

### Controles Obrigatórios

| Propriedade | Tipo | Valores Permitidos | Valor Padrão | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `brand` | Select | `'hub'`, `'water'`, `'waste'` | `'hub'` | Cor principal do indicador de refresh (via `data-brand`). |
| `size` | Select | `'sm'`, `'md'`, `'lg'` | `'md'` | Tamanho do indicador. |
| `disabled` | Boolean | `true`, `false` | `false` | Desativa a funcionalidade de puxar. |
| `simulateDelay` | Number | `0` a `5000` (ms) | `2000` | Controle exclusivo do playground para simular o tempo de resposta da API. |

### Composite Logic

A lógica do playground deve simular um cenário real de atualização de dados.

```vue
<template>
  <div class="playground-container">
    <DssPullToRefresh
      :data-brand="args.brand"
      :size="args.size"
      :disabled="args.disabled"
      @refresh="onRefresh"
    >
      <div class="data-list">
        <div v-for="item in items" :key="item.id" class="data-item">
          {{ item.name }} - Atualizado em: {{ item.timestamp }}
        </div>
      </div>
    </DssPullToRefresh>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DssPullToRefresh } from './DssPullToRefresh';

const props = defineProps(['args']);
const items = ref([
  { id: 1, name: 'Item Inicial 1', timestamp: new Date().toLocaleTimeString() },
  { id: 2, name: 'Item Inicial 2', timestamp: new Date().toLocaleTimeString() },
]);

const onRefresh = (done) => {
  // Simula uma chamada de API com delay configurável no playground
  setTimeout(() => {
    const newItem = {
      id: Date.now(),
      name: `Novo Item ${items.value.length + 1}`,
      timestamp: new Date().toLocaleTimeString()
    };
    items.value.unshift(newItem);
    done(); // Finaliza o estado de carregamento
  }, props.args.simulateDelay || 2000);
};
</script>

<style scoped>
.playground-container {
  height: 400px;
  overflow-y: auto;
  border: 1px solid var(--dss-border-subtle);
  border-radius: var(--dss-radius-md);
}
.data-item {
  padding: var(--dss-spacing-4);
  border-bottom: 1px solid var(--dss-border-subtle);
  color: var(--dss-text-base);
}
</style>
```

### Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Default (Hub) | Comportamento padrão com a cor principal da marca. | Visual | Padrão (renderização inicial) |
| Water Theme | Indicador utilizando a cor secundária da marca. | Visual | Atributo `data-brand="water"` |
| Waste Theme | Indicador utilizando a cor de destaque/alerta da marca. | Visual | Atributo `data-brand="waste"` |
| Disabled | Componente desativado, não responde ao gesto de puxar. | Visual | Prop `disable=true` |
| Small Size | Indicador em tamanho reduzido. | Visual | — |
| Large Size | Indicador em tamanho ampliado. | Visual | — |
