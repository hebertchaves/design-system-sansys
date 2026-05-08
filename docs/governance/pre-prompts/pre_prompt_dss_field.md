# Pré-prompt: DssField

## 1. CLASSIFICAÇÃO E CONTEXTO

*   **Golden Reference:** DssChip
*   **Golden Context:** Componente de entrada de dados (input) para formulários.
*   **Justificativa:** O DssField é um componente fundamental no Design System Sansys (DSS), atuando como o invólucro principal para todos os elementos de entrada de dados em formulários. Sua função primordial é padronizar a experiência do usuário e a interface visual de campos de formulário, garantindo consistência, acessibilidade e facilidade de uso em toda a aplicação. Ele encapsula funcionalidades essenciais como a exibição de rótulos (`label`), textos de dica (`hint`), mensagens de erro (`errorMessage`), e o gerenciamento de estados de interação (foco, hover, desabilitado, carregamento). Além disso, o DssField é projetado para ser extensível, permitindo a composição com diferentes tipos de inputs (texto, seleção, data, etc.) através de slots, sem acoplar-se a bibliotecas de validação específicas. Isso promove uma arquitetura flexível e de fácil manutenção, alinhada com os princípios de modularidade e reusabilidade do DSS. A sua implementação visa otimizar a performance em formulários complexos e reduzir a sobrecarga de propriedades, oferecendo uma API clara e intuitiva para desenvolvedores.

## 2. RISCOS ARQUITETURAIS E GATES

*   **Riscos:**
    *   **Acoplamento excessivo com bibliotecas de validação externas:** A dependência rígida de uma biblioteca de validação específica pode limitar a flexibilidade do componente e dificultar futuras migrações ou a integração com diferentes ecossistemas de desenvolvimento. Isso pode levar a um código mais difícil de manter e atualizar.
    *   **Dificuldade em estender para tipos de entrada complexos:** Se a arquitetura interna do DssField não for suficientemente modular, pode ser desafiador adicionar suporte para inputs mais complexos, como upload de arquivos com pré-visualização, editores de rich text ou seletores de múltiplos itens, sem refatorações significativas.
    *   **Performance em formulários com muitos campos:** Em formulários com dezenas ou centenas de campos, uma implementação ineficiente do DssField pode causar lentidão na renderização, atrasos na validação e uma experiência de usuário degradada. A otimização do ciclo de vida e da reatividade é crucial.
    *   **Sobrecarga de props, dificultando a manutenção:** Um número excessivo de propriedades (`props`) no componente pode torná-lo difícil de entender, usar e manter. Isso aumenta a curva de aprendizado para novos desenvolvedores e a probabilidade de erros na configuração.
*   **Gates:**
    *   **Agnóstico a bibliotecas de validação:** O DssField deve ser projetado para aceitar funções de validação genéricas ou um array de regras, permitindo que o consumidor do componente defina sua própria lógica de validação ou integre-se com qualquer biblioteca de validação de sua escolha (e.g., VeeValidate, Zod, Yup) sem modificar o código-fonte do componente.
    *   **Mecanismos de composição para diferentes tipos de inputs:** Deve fornecer slots nomeados ou um sistema de renderização de conteúdo (`renderless component` ou `scoped slots`) que permita ao desenvolvedor injetar qualquer elemento de input (DssInput, DssSelect, DssTextarea, etc.) dentro do DssField, mantendo a estrutura e o comportamento padronizados do campo.
    *   **API clara e concisa para gerenciar estados de erro e sucesso:** A API deve expor propriedades como `error` (booleano) e `errorMessage` (string) de forma explícita, facilitando a exibição condicional de mensagens de feedback e a aplicação de estilos visuais para indicar o estado do campo. A transição entre estados deve ser suave e previsível.
    *   **Suporte completo à acessibilidade:** Implementação de atributos ARIA (`aria-describedby`, `aria-invalid`, `aria-labelledby`), associações corretas de rótulos (`for`/`id`), e gerenciamento de foco para garantir que o componente seja utilizável por pessoas com deficiência, incluindo usuários de leitores de tela e navegação por teclado.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

| Propriedade Quasar (QField) | Propriedade DSS (DssField) | Tipo | Descrição |
| :-------------------------- | :------------------------- | :--- | :-------- |
| `label`                     | `label`                    | String | O rótulo textual que descreve a finalidade do campo para o usuário. Essencial para acessibilidade e clareza do formulário. |
| `hint`                      | `hint`                     | String | Um texto de dica sutil que aparece abaixo do rótulo, fornecendo informações adicionais ou exemplos de preenchimento. |
| `error`                     | `error`                    | Boolean | Um flag booleano que, quando `true`, indica que o campo está em um estado de erro, ativando estilos visuais de erro e exibindo a `errorMessage`. |
| `error-message`             | `errorMessage`             | String | A mensagem de texto específica a ser exibida quando o campo está em estado de erro, informando ao usuário sobre o problema. |
| `rules`                     | `rules`                    | Array<Function> | Um array de funções de validação. Cada função recebe o valor do campo e deve retornar `true` se o valor for válido ou uma string com a mensagem de erro caso contrário. |
| `dense`                     | `size`                     | `'sm' \| 'md' \| 'lg'` | Define o tamanho visual do campo, afetando padding e altura. `'sm'` para compacto, `'md'` para padrão, `'lg'` para maior visibilidade. |
| `square`                    | `rounded`                  | Boolean | Controla o arredondamento das bordas do campo. Quando `true`, as bordas são mais arredondadas; quando `false`, são mais quadradas. (Inverso de `square` do Quasar). |
| `outlined`                  | `variant`                  | `'outlined' \| 'filled' \| 'standard'` | Define o estilo visual do campo: `outlined` (borda visível), `filled` (fundo preenchido), `standard` (apenas linha inferior). |
| `disable`                   | `disabled`                 | Boolean | Quando `true`, o campo não pode ser interagido pelo usuário, e seu valor não é submetido no formulário. Estilos visuais indicam o estado desabilitado. |
| `readonly`                  | `readonly`                 | Boolean | Quando `true`, o campo exibe seu valor, mas não permite edição. O valor é submetido no formulário. |
| `loading`                   | `loading`                  | Boolean | Um flag booleano que, quando `true`, exibe um indicador de carregamento dentro do campo, útil para operações assíncronas como busca de dados. |
| `clearable`                 | `clearable`                | Boolean | Adiciona um ícone clicável que permite ao usuário limpar o conteúdo do campo rapidamente. |
| `counter`                   | `counter`                  | Boolean | Exibe um contador de caracteres abaixo do campo, mostrando o número de caracteres digitados e, opcionalmente, o `maxLength`. |
| `maxlength`                 | `maxLength`                | Number | O número máximo de caracteres permitidos no campo. Funciona em conjunto com `counter` para feedback visual. |
| `prefix`                    | `prefix`                   | Slot | Um slot para conteúdo arbitrário (texto, ícone) que aparece antes do input principal, dentro da área do campo. |
| `suffix`                    | `suffix`                   | Slot | Um slot para conteúdo arbitrário (texto, ícone) que aparece depois do input principal, dentro da área do campo. |
| `bottom-slots`              | `bottomSlots`              | Slot | Um slot para conteúdo que aparece na parte inferior do campo, abaixo da mensagem de erro/dica, útil para informações adicionais. |
| `before`                    | `before`                   | Slot | Um slot para conteúdo que aparece antes de toda a estrutura do DssField, fora da área principal do campo. |
| `after`                     | `after`                    | Slot | Um slot para conteúdo que aparece depois de toda a estrutura do DssField, fora da área principal do campo. |
| `append`                    | `append`                   | Slot | Um slot para conteúdo que é anexado ao final do input principal, geralmente usado para ícones de ação ou botões. |
| `prepend`                   | `prepend`                  | Slot | Um slot para conteúdo que é pré-anexado ao início do input principal, similar ao `append`. |
| `autogrow`                  | `autoGrow`                 | Boolean | (Para textareas) Ajusta automaticamente a altura do campo para acomodar o conteúdo. |
| `type`                      | `type`                     | String | O tipo de input HTML (e.g., `text`, `email`, `password`, `number`). |
| `placeholder`               | `placeholder`              | String | Texto de exemplo que aparece no campo quando vazio. |

## 4. GOVERNANÇA DE TOKENS E CSS

O DssField deve utilizar exclusivamente os tokens numéricos/padrão do DSS para espaçamento, raio, duração e cores de superfície, garantindo a consistência visual e a manutenibilidade do Design System. A utilização de tokens semânticos que não fazem parte da paleta oficial do DSS é estritamente proibida para evitar a proliferação de estilos inconsistentes e a dificuldade de atualização.

*   **Espaçamento:**
    *   `--dss-spacing-4`: Utilizado para padding interno de elementos menores, como o padding horizontal dentro do campo de texto.
    *   `--dss-spacing-8`: Aplicado para margens entre elementos adjacentes, como a margem entre o rótulo e o campo de input, ou entre o campo e a mensagem de erro.
    *   `--dss-spacing-16`: Para espaçamentos maiores, como a margem vertical entre diferentes DssFields em um formulário.
*   **Raio:**
    *   `--dss-radius-md`: O raio de borda padrão para a maioria dos elementos do DssField, conferindo um visual suave e moderno.
    *   `--dss-radius-sm`: Para elementos menores ou detalhes específicos que requerem um arredondamento mais sutil, como ícones internos.
    *   `--dss-radius-full`: Para elementos que devem ser completamente circulares, como avatares ou botões de ação flutuantes (embora menos comum diretamente no DssField, é um token disponível).
*   **Duração:**
    *   `--dss-duration-250`: A duração padrão para transições de estado, como o efeito de foco, hover ou a aparição/desaparição de mensagens de erro, garantindo animações fluidas e responsivas.
    *   `--dss-duration-150`: Para transições mais rápidas, onde a resposta imediata é crucial.
*   **Cores de Superfície:**
    *   `--dss-surface-default`: A cor de fundo padrão para o corpo do campo quando em estado normal.
    *   `--dss-surface-hover`: A cor de fundo aplicada quando o usuário passa o mouse sobre o campo, indicando interatividade.
    *   `--dss-surface-active`: A cor de fundo para o estado ativo do campo, geralmente quando clicado ou focado.
    *   `--dss-action-hub-surface`: Cor de superfície para ações primárias, substituindo `--dss-action-hub-surface`.
    *   `--dss-action-water-surface`: Cor de superfície para ações secundárias.
    *   `--dss-action-waste-surface`: Cor de superfície para ações de destaque/ênfase.
*   **Cores de Borda:**
    *   `--dss-border-default`: A cor da borda padrão para o campo.
    *   `--dss-border-error`: A cor da borda quando o campo está em estado de erro, fornecendo feedback visual claro.
    *   `--dss-action-hub`: Cor da borda para ações primárias, substituindo `--dss-action-hub`.
*   **Cores de Texto:**
    *   `--dss-text-default`: Cor padrão para o texto principal do campo.
    *   `--dss-text-subtle`: Cor para textos secundários ou de dica, substituindo `--dss-text-subtle`.
    *   `--dss-text-error`: Cor para mensagens de erro.
*   **Foco:**
    *   `outline: 2px solid white`: Utilizado para o anel de foco, substituindo `outline: 2px solid white` para garantir visibilidade e acessibilidade.

**NUNCA** inventar tokens com sufixos semânticos que não existem (ex: `--dss-spacing-4`, `--dss-duration-base`).

## 5. ACESSIBILIDADE E ESTADOS

O DssField deve garantir acessibilidade completa, seguindo as diretrizes WCAG para garantir que todos os usuários, incluindo aqueles com deficiência, possam interagir e compreender o componente. Isso inclui suporte para leitores de tela, navegação por teclado e feedback visual claro para diferentes estados.

*   **Rótulos:**
    *   **Associação Explícita:** O `label` do DssField deve ser explicitamente associado ao elemento de input subjacente usando o atributo `for` e o `id` correspondente. Isso permite que leitores de tela anunciem o rótulo corretamente quando o campo recebe foco.
    *   **`aria-labelledby`:** Em cenários mais complexos, onde o rótulo pode ser composto por múltiplos elementos ou não é um `<label>` HTML direto, `aria-labelledby` pode ser usado para referenciar os IDs dos elementos que servem como rótulo.
*   **Mensagens de Erro:**
    *   **Visibilidade e Associação:** Mensagens de erro devem ser visíveis quando o campo está em estado de erro e associadas ao input via `aria-describedby`. Isso garante que o leitor de tela anuncie a mensagem de erro junto com o rótulo do campo.
    *   **`aria-invalid`:** O atributo `aria-invalid=
"true"` deve ser definido no input quando houver um erro de validação.
*   **Feedback Visual:** Além dos atributos ARIA, o DssField deve fornecer feedback visual claro para os estados de erro, como bordas vermelhas, ícones de erro e mensagens de texto em destaque.
*   **Validação em Tempo Real:** A validação deve ocorrer de forma responsiva, idealmente no `blur` do campo ou no `change` para feedback imediato ao usuário.
*   **Navegação por Teclado:** Todos os elementos interativos dentro do DssField (input, botões de limpar, etc.) devem ser acessíveis e operáveis via teclado, com um indicador de foco visível.

*   **Estados de Interação:**
    *   **Normal:** O estado padrão do campo, sem foco, hover ou erros. A cor da borda e do texto devem seguir os tokens `--dss-border-default` e `--dss-text-default`.
    *   **Foco (`:focus`):** Quando o campo recebe foco, deve haver uma indicação visual clara, como um `outline: 2px solid white` (substituindo `outline: 2px solid white`) e a cor da borda pode mudar para `--dss-action-hub`.
    *   **Hover (`:hover`):** Ao passar o mouse sobre o campo, a cor de fundo pode mudar para `--dss-surface-hover` ou a borda para `--dss-border-hover` para indicar interatividade.
    *   **Desabilitado (`:disabled`):** O campo não deve ser interativo e deve ter um estilo visual que o diferencie claramente dos campos ativos, utilizando `--dss-text-disabled` e `--dss-surface-disabled`. O atributo `aria-disabled="true"` deve ser aplicado.
    *   **Somente Leitura (`:readonly`):** O campo exibe seu valor, mas não permite edição. O estilo visual deve ser sutilmente diferente do estado normal, mas ainda indicando que o conteúdo pode ser copiado. O atributo `readonly`aria-readonly="true"` deve ser aplicado.
    *   **Carregamento (`loading`):** Um indicador visual (spinner, esqueleto) deve ser exibido dentro do campo para indicar que uma operação assíncrona está em andamento, sem bloquear a interface.
    *   **Erro (`error`):** A borda do campo deve ser `--dss-border-error`, o texto da mensagem de erro `--dss-text-error`, e um ícone de erro pode ser exibido. O atributo `aria-invalid="true"` deve ser definido.
    *   **Sucesso:** Opcionalmente, um estado de sucesso pode ser implementado com uma borda verde (`--dss-border-success`) e um ícone de sucesso, após uma validação bem-sucedida.

## 6. DIRETRIZES DE USO E BOAS PRÁTICAS

Para garantir a utilização eficaz e consistente do DssField, as seguintes diretrizes e boas práticas devem ser observadas:

*   **Contexto de Uso:** O DssField é ideal para encapsular inputs de texto, seleções, datas e outros controles de formulário. Ele deve ser usado sempre que um campo de entrada de dados precisar de rótulo, validação, mensagens de erro ou estados de interação padronizados.
*   **Composição:** Utilize os slots (`prefix`, `suffix`, `bottomSlots`, `before`, `after`, `append`, `prepend`) para compor o DssField com outros componentes do DSS, como `DssInput`, `DssSelect`, `DssIcon`, `DssBtn`, etc. Isso permite criar campos complexos e personalizados mantendo a estrutura e o comportamento do DssField.
*   **Validação:** Implemente a validação no lado do cliente para feedback imediato ao usuário e no lado do servidor para segurança. As `rules` do DssField devem ser funções puras que retornam `true` ou uma string de erro.
*   **Mensagens Claras:** As mensagens de erro e dicas (`hint`) devem ser concisas, claras e úteis, orientando o usuário sobre como corrigir o problema ou o que esperar do campo.
*   **Acessibilidade:** Sempre forneça um `label` significativo. Teste a navegação por teclado e a leitura por leitores de tela para garantir uma experiência inclusiva.
*   **Evitar Sobrecarga:** Evite adicionar lógica de negócio complexa diretamente no DssField. Ele deve ser um componente de UI 
puro, focado em UI e UX, e não em regras de negócio específicas.
*   **Performance:** Esteja atento ao número de listeners e re-renderizações em formulários complexos. Utilize técnicas de otimização, como `v-once` ou `memoization`, quando apropriado.

## 7. EXEMPLOS DE USO E VARIAÇÕES

O DssField, por ser um componente base, possui diversas variações de uso, adaptando-se a diferentes necessidades de formulário. Abaixo, alguns exemplos e como eles se comportam:

*   **DssField com DssInput (Texto Simples):**
    ```html
    <DssField label="Nome Completo" hint="Digite seu nome e sobrenome">
      <DssInput v-model="fullName" type="text" placeholder="Ex: João da Silva" />
    </DssField>
    ```
    Neste exemplo, o DssField fornece o rótulo e a dica, enquanto o DssInput gerencia a entrada de texto. A validação pode ser adicionada ao DssField.

*   **DssField com DssSelect (Seleção de Opções):**
    ```html
    <DssField label="Cidade" :rules="[val => !!val || 'Campo obrigatório']">
      <DssSelect v-model="city" :options="cities" placeholder="Selecione uma cidade" />
    </DssField>
    ```
    Aqui, o DssField integra um DssSelect, aplicando regras de validação diretamente no componente pai. Isso garante que a mensagem de erro e o estado visual sejam consistentes.

*   **DssField com Validação e Mensagem de Erro:**
    ```html
    <DssField
      label="Email"
      :error="emailHasError"
      :errorMessage="emailErrorMessage"
      :rules="[val => /.+@.+\..+/.test(val) || 'Email inválido']"
    >
      <DssInput v-model="email" type="email" />
    </DssField>
    ```
    Demonstra como o DssField gerencia e exibe estados de erro, com base em uma propriedade `error` e uma `errorMessage` dinâmica, além de regras de validação.

*   **DssField Desabilitado e Somente Leitura:**
    ```html
    <DssField label="ID do Usuário" disabled>
      <DssInput v-model="userId" />
    </DssField>

    <DssField label="Data de Criação" readonly>
      <DssInput v-model="creationDate" />
    </DssField>
    ```
    Exemplos de como o DssField se comporta nos estados `disabled` e `readonly`, aplicando os estilos e comportamentos de acessibilidade corretos.

## 8. SUPERFÍCIE DE PLAYGROUND

A Superfície de Playground do DssField é um ambiente interativo essencial para testar e visualizar todas as suas variações, estados e comportamentos. Ela deve permitir a manipulação de suas propriedades e slots em tempo real, facilitando o desenvolvimento e a documentação.

### Controles Obrigatórios

Os seguintes controles devem estar disponíveis no playground para permitir a exploração completa do DssField:

*   **`label` (String):** Campo de texto para definir o rótulo do DssField.
*   **`hint` (String):** Campo de texto para definir a dica do DssField.
*   **`error` (Boolean):** Toggle para ativar/desativar o estado de erro.
*   **`errorMessage` (String):** Campo de texto para definir a mensagem de erro, visível quando `error` é `true`.
*   **`disabled` (Boolean):** Toggle para ativar/desativar o estado desabilitado.
*   **`readonly` (Boolean):** Toggle para ativar/desativar o estado somente leitura.
*   **`loading` (Boolean):** Toggle para ativar/desativar o estado de carregamento.
*   **`clearable` (Boolean):** Toggle para ativar/desativar a funcionalidade de limpar o campo.
*   **`counter` (Boolean):** Toggle para ativar/desativar o contador de caracteres.
*   **`maxLength` (Number):** Campo numérico para definir o limite máximo de caracteres.
*   **`size` (Radio: 'sm', 'md', 'lg'):** Seleção para definir o tamanho do campo.
*   **`variant` (Radio: 'outlined', 'filled', 'standard'):** Seleção para definir o estilo visual do campo.
*   **Conteúdo do Slot `default`:** Área de texto ou seleção para injetar diferentes componentes de input (DssInput, DssSelect, etc.) dentro do DssField.
*   **Conteúdo dos Slots `prefix`, `suffix`, `prepend`, `append`:** Áreas de texto ou seleção para injetar ícones ou textos adicionais.

### Composite Logic (Lógica Concreta)

A lógica de composição do DssField deve ser demonstrada com exemplos concretos, mostrando como ele integra e gerencia outros componentes. Por exemplo:

*   **Validação em Tempo Real:** Um DssField encapsulando um DssInput para email, com uma regra de validação que verifica o formato do email. A mensagem de erro deve aparecer dinamicamente ao digitar um email inválido e desaparecer ao corrigir.
    ```html
    <DssField
      label="Email"
      :rules="[val => /.+@.+\..+/.test(val) || 'Por favor, insira um email válido']"
      v-model="playgroundEmail"
    >
      <DssInput type="email" />
    </DssField>
    ```
*   **DssField com DssSelect e Opções Dinâmicas:** Um DssField que encapsula um DssSelect com opções carregadas de um array. A seleção de uma opção deve atualizar um valor reativo.
    ```html
    <DssField label="Fruta Favorita">
      <DssSelect
        v-model="playgroundFruit"
        :options="['Maçã', 'Banana', 'Laranja', 'Uva']"
        placeholder="Selecione uma fruta"
      />
    </DssField>
    ```
*   **DssField com Ícones e Botões nos Slots:** Demonstração de como usar os slots `prepend` e `append` para adicionar ícones (`DssIcon`) e botões (`DssBtn`) interativos, como um botão de 
"mostrar/ocultar senha".
    ```html
    <DssField label="Senha">
      <template #prepend>
        <DssIcon name="lock" />
      </template>
      <DssInput :type="showPassword ? 'text' : 'password'" v-model="playgroundPassword" />
      <template #append>
        <DssBtn icon="visibility" @click="showPassword = !showPassword" flat round />
      </template>
    </DssField>
    ```

### Estados a Expor

A tabela abaixo lista os estados do DssField que devem ser expostos e manipuláveis no playground, permitindo a visualização de todas as suas variações.

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Normal | O estado padrão do campo, sem foco, hover ou erros. | Visual | — |
| Foco | O campo está ativo e pronto para receber entrada do usuário. | Visual | — |
| Hover | O usuário passa o mouse sobre o campo. | Visual | Mouse over |
| Desabilitado | O campo não é interativo e não pode ser focado. | Visual | Prop `disable=true` |
| Somente Leitura | O campo exibe seu valor, mas não permite edição. | Visual | Prop `readonly=true` |
| Carregamento | O campo exibe um indicador de carregamento. | Visual | — |
| Erro | O campo está em estado de erro, exibindo a mensagem de erro. | Funcional | Prop `error=true` ou validação |
| Com Valor | O campo possui um valor preenchido. | Visual | — |
| Vazio | O campo não possui valor preenchido. | Visual | Slot ou conteúdo não fornecido |
| Com Dica | O campo exibe um texto de dica abaixo do input. | Visual | — |
| Com Contador | O campo exibe um contador de caracteres. | Visual | — |
| Com Limpar | O campo exibe um ícone para limpar o valor. | Visual | — |
