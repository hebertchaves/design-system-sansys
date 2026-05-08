# Pré-prompt: DssInfiniteScroll

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
DssChip

### Golden Context
O `DssInfiniteScroll` é um componente que permite carregar conteúdo dinamicamente à medida que o usuário rola a página ou um contêiner específico. Ele é ideal para listas longas de dados, feeds de notícias ou qualquer cenário onde o carregamento de todo o conteúdo de uma vez prejudicaria a performance. O componente gerencia a lógica de detecção de scroll e o acionamento de um evento de carregamento quando o usuário se aproxima do final do conteúdo, permitindo que a aplicação adicione mais itens à lista de forma assíncrona.

### Justificativa
A necessidade de um componente de *infinite scroll* surge da demanda por otimização de performance e melhor experiência do usuário em aplicações com grandes volumes de dados. Ao carregar conteúdo sob demanda, evitamos o carregamento inicial excessivo, reduzimos o tempo de renderização e economizamos recursos do navegador. Isso resulta em uma interface mais responsiva e fluida, especialmente em dispositivos móveis ou conexões de internet mais lentas.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos
*   **Loop Infinito de Carregamento:** Se a função de carregamento (`@load`) não for implementada corretamente ou se o conteúdo carregado não for suficiente para preencher o `offset` definido, o componente pode entrar em um loop de carregamento contínuo, consumindo recursos e prejudicando a experiência do usuário.
*   **Problemas de Desempenho:** Embora o *infinite scroll* seja uma técnica de otimização, um carregamento excessivo de dados ou uma renderização complexa de cada item da lista pode, paradoxalmente, impactar negativamente o desempenho, especialmente em listas muito longas ou com itens visualmente ricos.
*   **Acessibilidade:** Garantir que o carregamento de conteúdo seja perceptível e controlável para usuários com tecnologias assistivas é crucial. A falta de feedback visual ou programático sobre o estado de carregamento pode gerar confusão.
*   **Scroll Target Incorreto:** Se o `scroll-target` for configurado incorretamente (apontando para um elemento não-scrollável ou inexistente), o componente pode não detectar os eventos de scroll, impedindo o carregamento de novos itens.
*   **Gestão de Estado:** A complexidade na gestão do estado de carregamento (loading, erro, sem mais dados) e a integração com a lógica de paginação da aplicação podem levar a bugs e inconsistências.

### Gates
*   **Validação da Função `done()`:** A função `done()` passada para o evento `@load` deve ser sempre chamada para indicar a conclusão do carregamento, evitando loops infinitos. Isso será validado em testes de unidade e integração.
*   **Testes de Performance:** Serão realizados testes de performance com grandes volumes de dados e diferentes configurações de `offset` e `debounce` para garantir que o componente mantenha a responsividade e o desempenho aceitáveis.
*   **Testes de Acessibilidade:** O componente deve ser testado com leitores de tela e outras ferramentas de acessibilidade para garantir que o estado de carregamento e a adição de novos itens sejam comunicados de forma clara aos usuários.
*   **Validação do `scroll-target`:** A documentação e exemplos de uso devem enfatizar a importância de um `scroll-target` válido e scrollável. Testes de integração devem cobrir cenários com e sem `scroll-target` customizado.
*   **Documentação Clara:** Fornecer exemplos claros e diretrizes para a gestão do estado de carregamento e a integração com APIs de dados.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

| Propriedade Quasar | Tipo Quasar | Descrição Quasar | Propriedade DSS | Tipo DSS | Descrição DSS |
| :----------------- | :---------- | :---------------- | :-------------- | :------- | :-------------- |
| `offset`           | `Number`    | Offset (pixels) para o fundo do contêiner do Infinite Scroll a partir do qual o componente deve começar a carregar mais conteúdo. | `offset`         | `Number` | Offset (pixels) para o fundo do contêiner do Infinite Scroll a partir do qual o componente deve começar a carregar mais conteúdo. |
| `debounce`         | `String \| Number` | Quantidade de debounce (em milissegundos). | `debounce`       | `Number` | Quantidade de debounce (em milissegundos). |
| `initial-index`    | `Number`    | Inicializa o índice de paginação (usado para o evento `@load`). | `initialIndex`   | `Number` | Inicializa o índice de paginação (usado para o evento `@load`). |
| `scroll-target`    | `Element \| String` | Seletor CSS ou elemento DOM a ser usado como um contêiner de scroll personalizado em vez do detectado automaticamente. | `scrollTarget`   | `String` | Seletor CSS ou elemento DOM a ser usado como um contêiner de scroll personalizado em vez do detectado automaticamente. |
| `reverse`          | `Boolean`   | A área de scroll deve se comportar como um mensageiro - começando rolada para baixo e carregando ao atingir o topo. | `reverse`        | `Boolean` | A área de scroll deve se comportar como um mensageiro - começando rolada para baixo e carregando ao atingir o topo. |

| Evento Quasar | Parâmetros Quasar | Descrição Quasar | Evento DSS | Parâmetros DSS | Descrição DSS |
| :------------ | :---------------- | :--------------- | :--------- | :------------- | :-------------- |
| `@load`       | `index: Number, done: Function` | Disparado quando o componente precisa carregar mais conteúdo. `done()` deve ser chamado quando o carregamento estiver completo. | `@load`    | `index: Number, done: Function` | Disparado quando o componente precisa carregar mais conteúdo. `done()` deve ser chamado quando o carregamento estiver completo. |

| Método Quasar | Parâmetros Quasar | Retorno Quasar | Descrição Quasar | Método DSS | Parâmetros DSS | Retorno DSS | Descrição DSS |
| :------------ | :---------------- | :------------- | :--------------- | :--------- | :------------- | :---------- | :-------------- |
| `poll()`      | -                 | `void`         | Verifica a posição do scroll e carrega mais conteúdo, se necessário. | `poll()`      | -              | `void`      | Verifica a posição do scroll e carrega mais conteúdo, se necessário. |
| `trigger()`   | -                 | `void`         | Força o Infinite Scroll a carregar mais conteúdo, independentemente da posição do scroll. | `trigger()`   | -              | `void`      | Força o Infinite Scroll a carregar mais conteúdo, independentemente da posição do scroll. |
| `reset()`     | -                 | `void`         | Reseta o índice de chamada para 0. | `reset()`     | -              | `void`      | Reseta o índice de chamada para 0. |
| `stop()`      | -                 | `void`         | Para o funcionamento do Infinite Scroll, independentemente da posição do scroll. | `stop()`      | -              | `void`      | Para o funcionamento do Infinite Scroll, independentemente da posição do scroll. |
| `resume()`    | -                 | `void`         | Reinicia o funcionamento do Infinite Scroll. Verifica a posição do scroll na chamada e, se o gatilho for atingido, carrega mais conteúdo. | `resume()`    | -              | `void`      | Reinicia o funcionamento do Infinite Scroll. Verifica a posição do scroll na chamada e, se o gatilho for atingido, carrega mais conteúdo. |
| `setIndex(index)` | `index: Number`   | `void`         | Define o índice de paginação. | `setIndex(index)` | `index: Number` | `void`      | Define o índice de paginação. |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssInfiniteScroll` deve utilizar exclusivamente os tokens de design do DSS para espaçamento, raio de borda, cores e durações de transição. Não serão permitidos valores hardcoded ou tokens semânticos não-existentes.

*   **Espaçamento:** Para margens e preenchimentos internos, utilizar tokens como `--dss-spacing-4` (para um espaçamento padrão), `--dss-spacing-8`, `--dss-spacing-16`, etc., conforme a necessidade de densidade da informação. Por exemplo, para um espaçamento entre itens da lista, pode-se usar `--dss-spacing-8`.
*   **Raio de Borda:** Se o componente ou seus elementos internos possuírem bordas arredondadas, utilizar tokens como `--dss-radius-md` para um arredondamento médio, `--dss-radius-sm` para um menor, ou `--dss-radius-full` para elementos circulares.
*   **Cores:** Para cores de fundo, texto ou ícones de carregamento, utilizar tokens de superfície e texto do DSS, como `--dss-surface-default` para o fundo principal, `--dss-text-default` para o texto, e `--dss-action-hub` para elementos interativos ou de destaque.
*   **Duração de Transição:** Para quaisquer animações ou transições (por exemplo, no estado de carregamento), utilizar tokens de duração como `--dss-duration-250` para uma transição padrão, ou `--dss-duration-150` para algo mais rápido.

**Exemplos de uso de tokens:**

```css
.dss-infinite-scroll {
  padding-bottom: var(--dss-spacing-16);
}

.dss-infinite-scroll__loading-spinner {
  margin-top: var(--dss-spacing-8);
  margin-bottom: var(--dss-spacing-8);
  color: var(--dss-action-hub);
  transition: opacity var(--dss-duration-250) ease-in-out;
}

.dss-infinite-scroll__item {
  border-radius: var(--dss-radius-md);
  background-color: var(--dss-surface-default);
  margin-bottom: var(--dss-spacing-4);
}
```

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
*   **Feedback de Carregamento:** O componente deve fornecer feedback visual e programático claro quando novos itens estão sendo carregados. Isso pode ser feito através de um spinner de carregamento (`aria-live="polite"` ou `aria-busy="true"`) e mensagens de status que informem os usuários de leitores de tela sobre o progresso.
*   **Foco:** Gerenciar o foco de forma apropriada quando novos itens são adicionados à lista, garantindo que o foco não seja perdido e que os usuários possam continuar navegando sem interrupções.
*   **Controle:** Para usuários que não podem rolar, deve haver uma alternativa para acionar o carregamento de mais itens (ex: um botão "Carregar Mais").
*   **Semântica:** Utilizar elementos HTML semânticos (`<ul>`, `<li>`) para as listas de itens e garantir que a estrutura seja compreensível para tecnologias assistivas.

### Estados
O `DssInfiniteScroll` deve gerenciar e expor os seguintes estados:
*   **`loading` (Booleano):** Indica se o componente está atualmente carregando mais itens. Deve ser `true` durante a execução da função `@load` e `false` após a chamada de `done()`.
*   **`noMore` (Booleano):** Indica se não há mais itens para carregar. Este estado é controlado pela aplicação através da função `done(true)`.
*   **`error` (Booleano):** Indica se ocorreu um erro durante o carregamento dos itens. (A ser implementado ou gerenciado externamente, mas o componente deve permitir a exibição de um estado de erro).

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências
*   **Vue.js:** Como um componente Vue, depende do ecossistema Vue para sua reatividade e ciclo de vida.
*   **Quasar Framework (opcional):** Embora o `DssInfiniteScroll` seja uma abstração, ele pode internamente utilizar utilitários ou componentes de baixo nível do Quasar (como `QSpinner` para o indicador de carregamento) se isso simplificar a implementação e não expor dependências diretas ao consumidor.
*   **DssSpinner:** Para o indicador de carregamento, o `DssInfiniteScroll` deve utilizar o componente `DssSpinner` do próprio Design System, garantindo consistência visual.

### Composição
O `DssInfiniteScroll` é um componente de composição que encapsula a lógica de *infinite scroll*. Ele deve ser capaz de compor:
*   **Slots:** Um slot `default` para o conteúdo da lista e um slot `loading` para o indicador de carregamento (que pode ser o `DssSpinner`).
*   **DssSpinner:** Para exibir o estado de carregamento.
*   **DssButton (opcional):** Para um botão "Carregar Mais" em cenários de acessibilidade ou quando o scroll não é o único gatilho.

## 7. EXCEÇÕES PREVISTAS

*   **Contêiner de Scroll Não-Padrão:** A capacidade de definir um `scroll-target` customizado é uma exceção importante, permitindo que o *infinite scroll* funcione dentro de elementos específicos da página, e não apenas no `window`.
*   **Listas Invertidas (Messenger Style):** O modo `reverse` é uma exceção para casos de uso como chats ou feeds de mensagens, onde o carregamento ocorre ao rolar para o topo, e não para o fundo.
*   **Conteúdo Inicial Insuficiente:** Se o conteúdo inicial renderizado for menor que a altura do contêiner do scroll, o `QInfiniteScroll` pode disparar o evento `@load` imediatamente. O `DssInfiniteScroll` deve lidar com isso de forma graciosa, talvez com um `debounce` padrão ou uma lógica interna para evitar múltiplos carregamentos desnecessários.
*   **Desativação Temporária:** A necessidade de parar e reiniciar o *infinite scroll* (métodos `stop()` e `resume()`) é uma exceção para cenários onde o carregamento automático precisa ser pausado (ex: durante uma busca ou filtro).

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios
*   **`offset` (Slider/Input Numérico):** Para ajustar o valor do offset em pixels (ex: 0 a 1000).
*   **`debounce` (Slider/Input Numérico):** Para ajustar o tempo de debounce em milissegundos (ex: 0 a 500).
*   **`initialIndex` (Input Numérico):** Para definir o índice inicial de paginação.
*   **`reverse` (Toggle):** Para alternar entre o modo de scroll normal e o modo reverso.
*   **`scrollTarget` (Input de Texto/Dropdown):** Para simular diferentes alvos de scroll (ex: `window`, `#my-custom-scroll-area`).
*   **Botão "Adicionar Item Manualmente":** Para simular a adição de um item à lista sem acionar o scroll.
*   **Botão "Resetar Scroll":** Para chamar o método `reset()`.
*   **Botão "Forçar Carregamento":** Para chamar o método `trigger()`.
*   **Botão "Parar Carregamento":** Para chamar o método `stop()`.
*   **Botão "Retomar Carregamento":** Para chamar o método `resume()`.

### Composite Logic
O playground deve demonstrar a integração do `DssInfiniteScroll` com uma lógica de carregamento de dados simulada. Isso incluirá:
*   Uma lista de itens que cresce à medida que o scroll é acionado.
*   Um indicador de carregamento (`DssSpinner`) visível enquanto o `@load` está ativo.
*   Uma mensagem "Sem mais itens" quando a função `done(true)` é chamada.
*   Simulação de atraso no carregamento de dados (usando `setTimeout`) para observar o `debounce` em ação.
*   Exemplo de uso com um `scroll-target` customizado (ex: um `div` com `overflow: auto` e altura fixa).
*   Exemplo de uso no modo `reverse`.

### Estados a Expor
| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `loading` | Indica se o componente está atualmente carregando mais itens. | Booleano | Prop `loading=true` |
| `noMore` | Indica se não há mais itens para carregar. | Booleano | — |
| `currentIndex` | O índice atual de paginação que seria passado para a função `@load`. | Number | — |
