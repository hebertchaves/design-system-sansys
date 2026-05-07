# Pré-prompt: DssCircularProgress

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
`DssBadge`

### Golden Context
O `DssCircularProgress` é um componente de feedback visual não-interativo, similar ao `DssBadge` em sua natureza de exibir informações de status ou progresso de forma concisa. Ele indica o andamento de uma operação, seja ela determinada (com um valor percentual) ou indeterminada (aguardando a conclusão de uma tarefa). Sua principal função é comunicar ao usuário que um processo está em andamento, evitando a percepção de lentidão ou travamento da interface. Deve ser utilizado para operações que levam tempo perceptível, mas que não bloqueiam a interação do usuário com outras partes da aplicação, ou para indicar o carregamento de dados.

### Justificativa
O `DssCircularProgress` é essencial para aprimorar a experiência do usuário, fornecendo feedback visual claro sobre o estado das operações assíncronas. Ele ajuda a gerenciar as expectativas do usuário, reduzindo a ansiedade e a frustração durante períodos de espera. Ao padronizar a representação de progresso, garantimos consistência visual e funcional em todo o sistema, alinhando-se aos princípios de usabilidade e acessibilidade do Design System.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
*   **Performance**: Uso excessivo ou animações complexas podem impactar o desempenho da renderização, especialmente em dispositivos de baixo poder. Otimização da animação e uso de CSS nativo são cruciais.
*   **Acessibilidade**: Falha em fornecer feedback adequado para leitores de tela pode excluir usuários com deficiência visual. A implementação de atributos ARIA é fundamental.
*   **Customização Excessiva**: Permitir customização irrestrita pode levar à inconsistência visual e dificultar a manutenção. A customização deve ser limitada aos tokens do DSS.
*   **Dependência de Terceiros**: Forte acoplamento com a implementação do Quasar pode dificultar futuras migrações ou atualizações do framework.

### Gates
*   **Design Review**: Aprovação do design visual e interativo pelo time de Design System.
*   **Accessibility Review**: Validação da conformidade com WCAG 2.1 (nível AA) por especialistas em acessibilidade.
*   **Performance Testing**: Testes de desempenho para garantir que o componente não cause gargalos na interface.
*   **Code Review**: Revisão do código para garantir a adesão às melhores práticas de desenvolvimento e uso correto dos tokens do DSS.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

| Propriedade Quasar (`QCircularProgress`) | Propriedade DSS (`DssCircularProgress`) | Observações |
| :--------------------------------------- | :-------------------------------------- | :---------- |
| `value` (Number)                         | `value` (Number)                        | Valor atual do progresso (0-100). |
| `min` (Number)                           | `min` (Number)                          | Valor mínimo para o progresso. Padrão: 0. |
| `max` (Number)                           | `max` (Number)                          | Valor máximo para o progresso. Padrão: 100. |
| `size` (String)                          | `size` (String)                         | Tamanho do componente (ex: 'md', 'lg'). Mapear para tokens de espaçamento do DSS. |
| `color` (String)                         | `color` (String)                        | Cor do progresso. Mapear para tokens de cor do DSS. |
| `track-color` (String)                   | `trackColor` (String)                   | Cor da trilha de fundo. Mapear para tokens de cor do DSS. |
| `indeterminate` (Boolean)                | `indeterminate` (Boolean)               | Se o progresso é indeterminado. |
| `thickness` (Number)                     | `thickness` (Number)                    | Espessura da linha de progresso (0-1). |
| `angle` (Number)                         | `angle` (Number)                        | Ângulo inicial do progresso. Padrão: 0. |
| `font-size` (String)                     | `labelSize` (String)                    | Tamanho da fonte do rótulo interno. Mapear para tokens de tipografia do DSS. |
| `label` (Slot)                           | `default` (Slot)                        | Conteúdo customizado dentro do círculo. |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssCircularProgress` deve utilizar exclusivamente os tokens de design do DSS para garantir consistência e manutenibilidade. Abaixo estão exemplos de como os tokens devem ser aplicados:

*   **Tamanho (`size`)**: Definido por `width` e `height` utilizando tokens de espaçamento, por exemplo, `--dss-spacing-16` para um tamanho 'md'.
*   **Espessura (`thickness`)**: Mapeado para um valor numérico que pode ser ajustado internamente, mas sua representação visual pode ser influenciada por tokens de espaçamento para bordas ou elementos internos, se aplicável.
*   **Cor (`color`, `trackColor`)**: Utilizar tokens de cor semânticos do DSS, como `--dss-surface-default` para o fundo da trilha e `--dss-action-primary-default` para a cor do progresso.
*   **Animação (`duration`)**: As transições e animações devem usar tokens de duração do DSS, por exemplo, `--dss-duration-250` para a duração da animação de mudança de valor.
*   **Raio (`border-radius`)**: Se houver elementos com bordas arredondadas, usar tokens como `--dss-radius-full` para o formato circular.

**Exemplos de uso de tokens:**

```css
.dss-circular-progress {
  width: var(--dss-spacing-16);
  height: var(--dss-spacing-16);
  background-color: var(--dss-surface-default);
  border-radius: var(--dss-radius-full);
  /* Outras propriedades de estilo */
}

.dss-circular-progress__bar {
  transition: stroke-dashoffset var(--dss-duration-250) ease-in-out;
  /* Outras propriedades de estilo */
}
```

**Tokens permitidos:**
*   Tokens de espaçamento: `--dss-spacing-1` a `--dss-spacing-96`
*   Tokens de raio: `--dss-radius-sm`, `--dss-radius-md`, `--dss-radius-lg`, `--dss-radius-full`
*   Tokens de duração: `--dss-duration-150`, `--dss-duration-200`, `--dss-duration-250`, `--dss-duration-300`
*   Tokens de superfície: `--dss-surface-default` (e outros tokens de cor do DSS, conforme aplicável)

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
O `DssCircularProgress` deve ser acessível para usuários de tecnologias assistivas. Isso inclui:
*   **`aria-live=`polite` ou `assertive`**: Para leitores de tela anunciarem as atualizações de progresso de forma adequada.
*   **`aria-valuenow`, `aria-valuemin`, `aria-valuemax`**: Para indicar o valor atual, mínimo e máximo do progresso, respectivamente, quando o progresso é determinado.
*   **`role="progressbar"`**: Para identificar o elemento como uma barra de progresso para tecnologias assistivas.
*   **Foco e Semântica**: Garantir que o componente não roube o foco indevidamente e que sua semântica seja clara.

### Estados
O `DssCircularProgress` pode apresentar os seguintes estados:
*   **Determinado**: O progresso é conhecido e exibido numericamente (ex: 50%).
*   **Indeterminado**: O progresso é desconhecido ou está em um estado de carregamento contínuo (animação de loop).
*   **Padrão**: Estado inicial, sem valor ou com valor zero.
*   **Erro**: Embora não seja um estado intrínseco do componente, pode ser visualmente indicado por uma cor de erro, se o contexto permitir.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências
*   **Quasar Framework**: O `DssCircularProgress` será construído sobre o componente `QCircularProgress` do Quasar, aproveitando sua base de funcionalidade e otimizações.
*   **Tokens de Design DSS**: Dependência fundamental para estilização e garantia de consistência visual.

### Composição
O `DssCircularProgress` é um componente autônomo, mas pode ser composto com outros componentes para formar padrões de interface mais complexos. Exemplos:
*   **Com `DssButton`**: Um `DssCircularProgress` pode ser exibido dentro ou ao lado de um botão para indicar o carregamento após uma ação.
*   **Com `DssCard` ou `DssDialog`**: Para indicar o carregamento de conteúdo dentro de um contêiner.

## 7. EXCEÇÕES PREVISTAS

*   **Uso em operações de curta duração**: Não deve ser usado para operações que duram menos de 500ms, pois pode causar cintilação e distrair o usuário. Nesses casos, o feedback visual pode ser desnecessário ou outro tipo de feedback mais sutil pode ser preferível.
*   **Substituição de feedback de erro**: O `DssCircularProgress` não deve ser usado como um indicador primário de erro. Embora possa haver um estado visual de erro, a comunicação principal de um erro deve ser feita por outros componentes (ex: `DssBanner`, `DssToast`).
*   **Aninhamento excessivo**: Evitar aninhar múltiplos `DssCircularProgress` em uma mesma área, o que pode sobrecarregar visualmente o usuário.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles
O playground do `DssCircularProgress` deve permitir a manipulação dos seguintes controles para demonstração e teste:
*   **`value` (Slider)**: Para ajustar o valor do progresso de 0 a 100.
*   **`indeterminate` (Toggle)**: Para alternar entre os estados determinado e indeterminado.
*   **`size` (Dropdown)**: Para selecionar tamanhos predefinidos (ex: 'sm', 'md', 'lg'), que mapeiam para tokens de espaçamento do DSS.
*   **`color` (Color Picker)**: Para selecionar cores de progresso a partir dos tokens de cor do DSS.
*   **`trackColor` (Color Picker)**: Para selecionar cores da trilha a partir dos tokens de cor do DSS.
*   **`thickness` (Slider)**: Para ajustar a espessura da linha de progresso.
*   **`angle` (Slider)**: Para ajustar o ângulo inicial do progresso.
*   **`label` (Text Input)**: Para inserir texto customizado dentro do círculo.

### Composite Logic
*   **Exibição Condicional**: Demonstrar como o `DssCircularProgress` pode ser exibido ou ocultado com base em uma condição (ex: `v-if` ou `v-show`).
*   **Integração com API Simulado**: Simular uma chamada de API com um atraso, mostrando o `DssCircularProgress` durante o carregamento e o conteúdo após a conclusão.
*   **Feedback de Ação**: Integrar o `DssCircularProgress` com um `DssButton` para mostrar o progresso de uma ação iniciada pelo usuário.

### Estados a Expor
Os seguintes estados devem ser claramente visíveis e testáveis no playground:
*   **Progresso Determinado**: Com diferentes valores (0%, 25%, 50%, 75%, 100%).
*   **Progresso Indeterminado**: Animação contínua.
*   **Diferentes Tamanhos**: 'sm', 'md', 'lg'.
*   **Diferentes Cores**: Usando tokens de cor do DSS.
*   **Com e sem rótulo interno**.
*   **Com diferentes espessuras**.

