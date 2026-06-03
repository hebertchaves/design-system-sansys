# 🎯 PRÉ-PROMPT ESPECÍFICO: DssList (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssList`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

O `DssList` é um componente fundamental no Design System Sansys (DSS), atuando como um **container de layout** para agrupar e organizar itens de lista (`DssItem`) e separadores (`DssSeparator`). Sua principal função é fornecer uma estrutura consistente para a apresentação de coleções de conteúdo, garantindo alinhamento, espaçamento e delimitação visual adequados. Este componente é classificado como de **Fase 2 (Componente Composto)**, pois orquestra e gerencia a exibição de componentes de Fase 1, como `DssItem` e `DssSeparator`, sem introduzir interatividade própria.

| Campo | Valor |
|---|---|
| **Nome** | `DssList` |
| **Equivalente Quasar** | `QList` |
| **Fase** | Fase 2 (Componente Composto) |
| **Nível de Execução** | Nível 1 — Independente |
| **Classificação** | Container de layout — Agrupa itens de lista (`DssItem`) e separadores |
| **Golden Reference** | `DssBadge` (não interativo) |
| **Golden Context** | `DssCard` (container estrutural) |

**Justificativa da Fase 2:** A complexidade do `DssList` reside em sua capacidade de definir o contexto visual para seus filhos, incluindo bordas externas, espaçamento interno e o gerenciamento automático de separadores. Ele não é um componente atômico, mas sim um orquestrador que garante a coesão visual e funcional de uma lista de elementos, aderindo aos princípios de design do DSS para consistência e previsibilidade.

---

## 2. O GRANDE RISCO ARQUITETURAL: DELEGAÇÃO DE ESTADOS E BORDAS

### 2.1 O Problema do QList e a Abordagem DSS
O `QList` nativo do Quasar, embora flexível, é excessivamente permissivo. Ele permite a aplicação de estilos globais (como `dark` ou `dense`) que se propagam em cascata para os itens internos. Essa abordagem viola um princípio central do DSS: a **responsabilidade visual estritamente controlada**. No DSS, cada componente deve ser responsável por seu próprio estilo e comportamento, minimizando efeitos colaterais e garantindo a modularidade.

**Decisão Arquitetural Fundamental:**
O `DssList` é projetado para atuar **exclusivamente** como um container de layout. Sua responsabilidade primária é fornecer a estrutura (via flexbox/grid) e gerenciar aspectos visuais como bordas externas e separadores entre os itens. É crucial que o `DssList` **NÃO DEVE** capturar eventos de clique, hover, focus ou qualquer outra forma de interatividade. Toda e qualquer interatividade, como a seleção de um item ou a exibição de um estado de foco, pertence exclusivamente aos componentes filhos, como o `DssItem`.

### 2.2 Gate de Responsabilidade v2.4: Delimitação Clara
Para reforçar essa decisão arquitetural, o `DssList` adere aos seguintes gates de responsabilidade:

-   **Interatividade:** O `DssList` é 100% não-interativo. Isso significa que ele não deve possuir estilos CSS como `:hover`, `:focus-visible` ou `cursor: pointer`. Qualquer tentativa de adicionar interatividade diretamente ao `DssList` será considerada uma violação das diretrizes do DSS.
-   **Bordas e Separadores:** O `DssList` pode aplicar bordas externas (controladas pela propriedade `bordered`) e gerenciar a inserção de separadores visuais entre os itens (controlados pela propriedade `separator`). No entanto, ele **não deve** alterar o padding interno ou outras propriedades de layout dos `DssItem`s. A responsabilidade pelo layout interno dos itens é do próprio `DssItem`.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

O `DssList` expõe um conjunto mínimo de propriedades para controlar seu comportamento como container, enquanto bloqueia aquelas que violariam os princípios de responsabilidade do DSS.

### Props Expostas (Permitidas)

-   `bordered` (Boolean): Quando `true`, aplica uma borda externa ao redor de todo o container da lista. Esta borda utiliza tokens de borda definidos no DSS para garantir consistência visual.
-   `padding` (Boolean): Quando `true`, aplica um espaçamento vertical (padding) no topo e na base da lista. Isso ajuda a criar um respiro visual entre o conteúdo da lista e os elementos circundantes.
-   `separator` (Boolean): Quando `true`, insere divisores visuais automáticos entre os itens filhos diretos do `DssList`. A implementação ideal para isso é via seletores CSS descendentes para otimização de performance, conforme detalhado na Seção 9 (Exceções Previstas).

### Props Bloqueadas (Proibidas)

As seguintes propriedades comuns em `QList` são explicitamente bloqueadas no `DssList` para manter a integridade do Design System:

-   `dark`: O gerenciamento do modo escuro (dark mode) no DSS é feito globalmente via variáveis CSS e classes de tema, não por propriedades em componentes individuais. Isso garante uma transição de tema uniforme em toda a aplicação.
-   `dense`: A densidade de um item de lista deve ser controlada individualmente nos `DssItem`s ou através de tokens de contexto que afetam o espaçamento interno dos itens. Forçar a densidade globalmente pelo container `DssList` violaria o princípio de responsabilidade única e modularidade.
-   `clickable`: Conforme a decisão arquitetural, o `DssList` não é interativo. A interatividade pertence aos `DssItem`s.
-   `flat`, `rounded`, `elevated`: Propriedades relacionadas a estilo de superfície e elevação são gerenciadas por componentes de superfície mais genéricos ou tokens de estilo, não pelo `DssList`.

---

## 4. GOVERNANÇA DE TOKENS

A aplicação de tokens no `DssList` segue rigorosamente as diretrizes do DSS para garantir consistência e facilidade de manutenção. Os tokens são a fonte única da verdade para valores de design.

### 4.1 Tokens de Borda e Separador

-   **Borda Externa (`bordered`):** A borda externa do `DssList` deve ser definida utilizando tokens de borda e cor. Exemplo de implementação:
    ```css
    border: var(--dss-border-width-1) solid var(--dss-color-border-subtle);
    ```
-   **Separadores Internos (`separator`):** Se a propriedade `separator` for implementada via CSS no container (conforme exceção na Seção 9), os separadores devem usar tokens de borda e cor específicos para divisores. Exemplo:
    ```css
    border-bottom: var(--dss-border-width-1) solid var(--dss-color-border-subtle);
    ```
-   **Border-Radius:** O raio da borda, aplicado apenas se `bordered` for `true`, deve usar um token de raio de borda. Exemplo:
    ```css
    border-radius: var(--dss-radius-2);
    ```

### 4.2 Tokens de Espaçamento

-   **Padding (`padding`):** O espaçamento vertical nas extremidades do `DssList` deve ser controlado por tokens de espaçamento. Exemplo:
    ```css
    padding: var(--dss-spacing-4) 0;
    ```

### 4.3 Nomenclatura de Brand e Tokens de Ação

É imperativo que a nomenclatura de brand no código e na documentação reflita os termos padronizados do DSS. Substitua quaisquer referências a 
`hub`, `water`, `waste` por `hub`, `water`, `waste`. Isso se aplica a todas as instâncias de tokens de cor e superfície que denotam estados de brand, como:

-   `--dss-color-hub`
-   `--dss-color-water`
-   `--dss-color-waste`
-   `--dss-surface-hub`
-   `--dss-surface-water`
-   `--dss-surface-waste`

Além disso, os tokens de ação devem ser utilizados para elementos interativos:

-   `--dss-action-hub`
-   `--dss-action-hub-surface`

### 4.4 Correção de Tokens Fantasmas

É crucial eliminar o uso de tokens que não fazem parte da especificação atual do DSS. As seguintes substituições devem ser aplicadas:

-   `--dss-spacing-4` (substitui `--dss-spacing-4`)
-   `--dss-text-subtle` (substitui `--dss-text-subtle`)
-   `outline: 2px solid white` (substitui `outline: 2px solid white`)
-   `--dss-action-hub` (substitui `--dss-action-hub`)
-   `--dss-action-hub-surface` (substitui `--dss-action-hub-surface`)

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

A acessibilidade é um pilar fundamental do Design System Sansys. O `DssList` deve ser construído com as melhores práticas de acessibilidade em mente para garantir que todos os usuários, independentemente de suas capacidades, possam interagir e compreender o conteúdo.

### 5.1 Role ARIA e Semântica HTML

-   O elemento container do `DssList` deve ter `role="list"`. Esta semântica informa aos leitores de tela que o elemento é uma lista de itens, permitindo uma navegação mais eficiente para usuários com deficiência visual. O Quasar geralmente aplica isso nativamente, mas é imperativo verificar e garantir sua presença.
-   Consequentemente, os filhos diretos do `DssList` (os `DssItem`s) devem assumir `role="listitem"`. Esta combinação (`list` e `listitem`) é essencial para a correta interpretação da estrutura da lista por tecnologias assistivas.
-   Para listas interativas (onde os `DssItem`s são clicáveis), é importante que os `DssItem`s utilizem elementos semânticos como `<button>` ou `<a>` e que os atributos `aria-label` ou `aria-labelledby` sejam fornecidos quando o texto visível não for suficiente para descrever a ação.

### 5.2 Contraste de Cores e Foco Visual

-   Todas as cores utilizadas para bordas, separadores e texto dentro do `DssList` devem aderir aos requisitos de contraste mínimo do WCAG 2.1 AA. Isso inclui o contraste entre o texto e o fundo, bem como entre elementos visuais importantes.
-   Embora o `DssList` não seja interativo, seus filhos (`DssItem`s) frequentemente são. É crucial que os `DssItem`s tenham um indicador de foco visível e claro para usuários que navegam via teclado. O `outline: 2px solid var(--dss-color-focus-ring)` é o padrão recomendado para isso.

---

## 6. ESTADOS DO COMPONENTE

O `DssList` é, por design, um **container estático e não-interativo**. Isso significa que ele não possui estados de interação próprios (como `:hover`, `:active`, `:focus`). Seus estados visuais são derivados exclusivamente da aplicação de suas propriedades (`bordered`, `padding`, `separator`) e da composição de seus filhos. A responsabilidade por estados interativos (como `selecionado`, `desabilitado`, `focado`) recai inteiramente sobre os `DssItem`s ou outros componentes interativos que ele possa conter.

### 6.1 Estados Visuais Baseados em Propriedades

Os estados visuais do `DssList` são uma manifestação direta das propriedades booleanas que ele expõe:

-   **Estado Padrão:** Sem `bordered`, `padding` ou `separator` ativos, o `DssList` renderiza como um container simples, sem adornos visuais adicionais além do fluxo de seus filhos.
-   **Estado `bordered`:** Uma borda externa é aplicada, delimitando visualmente o container. A cor e espessura da borda são controladas por tokens.
-   **Estado `padding`:** Espaçamento vertical é adicionado nas extremidades, proporcionando respiro.
-   **Estado `separator`:** Linhas divisórias aparecem entre os `DssItem`s, organizando visualmente a lista.

É importante que esses estados sejam visualmente distintos e consistentes com o restante do Design System.

---

## 7. SUBCOMPONENTES E COMPOSIÇÃO

O `DssList` é um componente composto que orquestra a exibição de outros componentes, principalmente `DssItem` e `DssSeparator`. Sua composição é um aspecto crítico para garantir a flexibilidade e a extensibilidade do Design System.

### 7.1 Declaração no `dss.meta.json`

O arquivo `dss.meta.json` é o manifesto do componente dentro do DSS. Ele deve declarar claramente as dependências e requisitos de composição do `DssList`:

```json
{
  "phase": 2,
  "goldenContext": "DssCard",
  "subcomponents": [],
  "compositionRequirements": ["DssItem", "DssSeparator"],
  "compositionFuture": ["DssItemSection", "DssItemLabel"]
}
```

-   `phase`: Indica a fase de desenvolvimento do componente (Fase 2 para componentes compostos).
-   `goldenContext`: Define o componente de referência para o contexto de uso, neste caso, `DssCard`, que é um container estrutural similar.
-   `subcomponents`: Lista de componentes que são partes intrínsecas do `DssList` e não são expostos diretamente para uso externo (neste caso, vazio, pois `DssItem` e `DssSeparator` são componentes independentes).
-   `compositionRequirements`: Componentes que são esperados como filhos diretos ou indiretos do `DssList` para que ele funcione corretamente. `DssItem` e `DssSeparator` são essenciais.
-   `compositionFuture`: Componentes que podem ser adicionados no futuro para enriquecer a composição do `DssList`, como `DssItemSection` e `DssItemLabel`, que fornecem granularidade dentro de um `DssItem`.

### 7.2 Flexibilidade de Composição

O `DssList` deve ser flexível o suficiente para aceitar diferentes tipos de conteúdo em seus slots, desde que a semântica de lista seja mantida. Isso significa que, embora `DssItem` seja o filho primário esperado, outros elementos HTML ou componentes customizados podem ser renderizados, desde que não quebrem o layout ou a acessibilidade.

---

## 9. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 3)

Para demonstrar a versatilidade e o comportamento do `DssList`, os seguintes cenários de uso são obrigatórios e devem ser implementados na documentação e nos exemplos de código:

1.  **Básico** — Uma lista simples contendo múltiplos `DssItem`s, sem bordas, padding ou separadores. Este cenário demonstra a funcionalidade mínima do `DssList` como um container de agrupamento.
2.  **Com Bordas e Separadores** — Uma lista que utiliza as propriedades `bordered` e `separator` para exibir uma borda externa e linhas divisórias entre os `DssItem`s. Este exemplo destaca a capacidade do `DssList` de gerenciar o contexto visual de seus filhos.
3.  **Com Padding** — Uma lista que aplica a propriedade `padding` para adicionar espaçamento vertical nas extremidades. Isso ilustra como o `DssList` pode controlar o respiro visual ao redor do conteúdo da lista.
4.  **Lista de Navegação** — Um `DssList` contendo `DssItem`s que atuam como links de navegação. Este cenário pode combinar `bordered` e `separator` para criar um menu de navegação estruturado.
5.  **Lista de Seleção** — Um `DssList` que contém `DssItem`s interativos (por exemplo, com checkboxes ou radio buttons internos), demonstrando como o `DssList` atua como container para elementos interativos sem ser interativo ele mesmo.

Cada cenário deve ser acompanhado de um snippet de código e uma visualização renderizada para facilitar a compreensão.

---

## 10. EXCEÇÕES PREVISTAS

As exceções no DSS são cuidadosamente documentadas para garantir que desvios das regras gerais sejam justificados e controlados, mantendo a consistência do sistema.

### EXC-01: Seletores Descendentes para Separadores (Gate de Composição v2.4)

-   **Justificativa:** A implementação de separadores entre itens de lista é um desafio comum em sistemas de design. Embora a regra geral do DSS proíba que um componente invada o CSS de seus filhos, a aplicação de separadores via seletores descendentes (`.dss-list--separator > .dss-item + .dss-item { border-top: ... }`) no `DssList` é considerada uma exceção formalizada. Esta abordagem é preferível por ser a forma mais performática e eficiente de aplicar separadores automáticos, eliminando a necessidade de o usuário inserir manualmente `<DssSeparator>` entre cada item. Isso simplifica a API do componente e melhora a experiência do desenvolvedor.
-   **Formalização:** Esta exceção deve ser explicitamente documentada no `dss.meta.json` ou em um arquivo de governança de exceções, detalhando o seletor CSS utilizado e a justificativa de performance.

---

## 11. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt detalhado, o agente de execução deve proceder com as seguintes etapas:

1.  **Confirmar** o entendimento de que o `DssList` é um container estático e 100% não-interativo, delegando toda a interatividade aos seus filhos (`DssItem`).
2.  **Confirmar** o Golden Context: `DssCard`, reconhecendo a similaridade estrutural e a função de container.
3.  **Verificar** a aplicação correta de todos os tokens de design, incluindo a nova nomenclatura de brand (`hub`, `water`, `waste`) e a correção dos tokens fantasmas (`--dss-spacing-4`, `--dss-text-subtle`, `--dss-action-hub`, `--dss-action-hub-surface`).
4.  **Garantir** que a Seção 8 (Superfície de Playground) foi implementada com os Controles Obrigatórios, a Composite Logic concreta e a tabela de Estados a Expor.
5.  **Iniciar** a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**, utilizando este pré-prompt como guia fundamental para a implementação.
