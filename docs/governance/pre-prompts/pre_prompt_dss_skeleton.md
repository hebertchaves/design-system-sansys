# Pré-prompt: DssSkeleton

## 1. CLASSIFICAÇÃO E CONTEXTO

*   **Golden Reference**: DssBadge
*   **Golden Context**: O DssSkeleton é um componente não-interativo utilizado para indicar o carregamento de conteúdo, fornecendo um placeholder visual que simula a estrutura do conteúdo final antes que os dados reais sejam exibidos. Ele melhora a percepção de desempenho e a experiência do usuário.
*   **Justificativa**: Padronizar a experiência do usuário durante estados de carregamento, reduzindo a percepção de lentidão e melhorando a consistência visual da aplicação. Oferece uma representação visual imediata do layout que está por vir, evitando mudanças abruptas na interface.

## 2. RISCOS ARQUITETURAIS E GATES

*   **Riscos Arquiteturais**:
    *   **Performance**: Uso excessivo ou animações complexas podem impactar o desempenho da renderização, especialmente em listas longas ou interfaces densas.
    *   **Acessibilidade**: A indicação visual de carregamento deve ser complementada por atributos ARIA adequados para leitores de tela, garantindo que usuários com deficiência visual sejam informados sobre o estado da página.
    *   **Flexibilidade vs. Padronização**: Dificuldade em adaptar o esqueleto a layouts muito complexos ou personalizados sem quebrar a padronização do Design System.
*   **Gates**:
    *   **Revisão de Performance**: Testes de desempenho em cenários de uso intensivo (ex: 100+ skeletons na tela) para garantir que o FPS não caia abaixo de 30.
    *   **Testes de Acessibilidade**: Validação com ferramentas automatizadas (Lighthouse, Axe) e testes manuais com leitores de tela para garantir conformidade com WCAG 2.1 AA.
    *   **Validação de Design**: Aprovação do time de Design para garantir que o componente se adapte a diferentes layouts e casos de uso sem comprometer a identidade visual.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O Quasar não possui um componente `Skeleton` direto. A funcionalidade pode ser simulada com elementos de layout (`div`, `span`) e classes utilitárias de estilo, ou através de componentes como `QSpinner` ou `QLinearProgress` para indicadores de carregamento mais genéricos. O DssSkeleton deve abstrair essa complexidade, oferecendo uma API simplificada para configurar forma, tamanho e animação.

*   **Propriedades Sugeridas**:
    *   `type`: `string` (e.g., 'text', 'rect', 'circle', 'heading', 'avatar'). Define a forma básica do esqueleto.
    *   `width`: `string` (e.g., '100px', '50%', '--dss-spacing-32'). Define a largura do esqueleto.
    *   `height`: `string` (e.g., '20px', '--dss-spacing-8'). Define a altura do esqueleto.
    *   `lines`: `number`. Para `type='text'`, define o número de linhas de texto simuladas.
    *   `animation`: `string` (e.g., 'wave', 'pulse', 'none'). Tipo de animação do esqueleto.
    *   `bordered`: `boolean`. Adiciona uma borda ao esqueleto (útil para simular inputs ou cards).

## 4. GOVERNANÇA DE TOKENS E CSS

O DssSkeleton deve utilizar exclusivamente tokens numéricos e padrão do DSS para espaçamento, raio, cores de superfície e duração de animação. NENHUM token com sufixo semântico não existente deve ser inventado.

*   **Tokens de Espaçamento**: `--dss-spacing-1` a `--dss-spacing-96` (para `width`, `height`, `margin`, `padding` internos).
*   **Tokens de Raio**: `--dss-radius-sm`, `--dss-radius-md`, `--dss-radius-lg`, `--dss-radius-full` (para `border-radius`).
*   **Tokens de Duração**: `--dss-duration-150`, `--dss-duration-200`, `--dss-duration-250`, `--dss-duration-300` (para `animation-duration`).
*   **Tokens de Superfície**: `--dss-surface-default`, `--dss-surface-variant`, `--dss-surface-inverse` (para `background-color` do esqueleto).
*   **Exemplo de Uso de Tokens**:
    ```css
    .dss-skeleton--rect {
        background-color: var(--dss-surface-variant);
        border-radius: var(--dss-radius-md);
        width: var(--dss-spacing-64);
        height: var(--dss-spacing-8);
        animation-duration: var(--dss-duration-250);
    }
    .dss-skeleton--circle {
        border-radius: var(--dss-radius-full);
        width: var(--dss-spacing-32);
        height: var(--dss-spacing-32);
    }
    ```

## 5. ACESSIBILIDADE E ESTADOS

*   **Acessibilidade**:
    *   O DssSkeleton, por ser um placeholder visual, não deve ser focado por leitores de tela. Deve-se usar `aria-hidden="true"` no componente principal do skeleton para evitar que o conteúdo visual seja lido de forma confusa.
    *   O elemento pai que contém o skeleton e o conteúdo real deve ter `aria-busy="true"` enquanto o conteúdo estiver carregando e `aria-busy="false"` quando o conteúdo for carregado.
    *   Considerar `aria-live="polite"` em uma região para anunciar a mudança de estado (ex: "Conteúdo carregando..." ou "Conteúdo atualizado.").
*   **Estados**:
    *   **Carregando (Loading)**: Estado padrão do DssSkeleton, com animação ativa.
    *   **Pronto (Loaded)**: O DssSkeleton é removido e o conteúdo real é exibido.
    *   **Erro (Error)**: O DssSkeleton pode ser substituído por um componente de erro ou uma mensagem, indicando que o carregamento falhou.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

*   **Dependências**: O DssSkeleton deve ter dependência mínima, idealmente apenas dos tokens de design do DSS e de uma biblioteca de animação CSS leve, se necessário. Não deve depender de componentes complexos do Quasar.
*   **Composição**: O DssSkeleton é um componente de baixo nível, projetado para ser composto dentro de outros componentes ou layouts mais complexos. Pode ser usado para simular a estrutura de:
    *   Cards (`DssCard`)
    *   Listas (`DssList`, `DssListItem`)
    *   Avatares (`DssAvatar`)
    *   Textos (`DssTypography`)
    *   Imagens (`DssImage`)

## 7. EXCEÇÕES PREVISTAS

*   **Conteúdo Estático Rápido**: Para carregamentos extremamente rápidos (milissegundos), o uso do DssSkeleton pode causar um 