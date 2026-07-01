> 📌 **Nota de Governança:** Este é um documento vivo de acompanhamento de status. O contrato normativo contra o qual esta auditoria é realizada reside em [DSS_REFERENCIA_VISUAL_ANALISE.md](./DSS_REFERENCIA_VISUAL_ANALISE.md).

# Auditoria de Padrões Visuais DSS (Defaults)

**Data:** 25 de Maio de 2026
**Autor:** Manus AI

## 1. Visão Geral dos Ajustes

O objetivo desta auditoria foi avaliar e ajustar o aspecto visual padrão (default) dos componentes do Design System Sansys (DSS). A meta principal foi garantir que os componentes, quando utilizados sem propriedades explícitas, apresentem um visual coeso, moderno e inovador. A cor primária (`--dss-action-primary`) foi estabelecida como a âncora principal para ações e seleções, substituindo o uso genérico de tons de cinza ou preto.

Para alcançar este resultado, foram adotadas referências de mercado consagradas. Do **Material Design 3**, incorporamos formas mais arredondadas, como o formato de pílula (pill shape) para botões, a remoção do uso forçado de letras maiúsculas (uppercase) e a aplicação intensa de cores primárias para indicar estados ativos. Do **IBM Carbon**, trouxemos a clareza no contraste de formulários, com bordas bem definidas e o uso inteligente da propriedade `currentColor` para herança de estados. Por fim, inspirados no **Salesforce Lightning**, aplicamos um controle rigoroso da densidade de informação e maior clareza nos indicadores de progresso e estados de feedback.

## 2. Componentes Ajustados

Os ajustes foram realizados diretamente nos arquivos SCSS e Vue dos componentes, respeitando a arquitetura de camadas do DSS. A tabela abaixo detalha as modificações aplicadas por categoria de componente.

| Categoria | Componente | Ajustes Realizados |
| :--- | :--- | :--- |
| **Ação** | DssButton | Remoção da propriedade `text-transform: uppercase` para melhorar a legibilidade. O `border-radius` foi alterado para `var(--dss-radius-full)`, adotando o formato de pílula. O `letter-spacing` foi ajustado para `0.01em` para compensar a mudança tipográfica. As variantes `elevated` e `outline` foram atualizadas para utilizar os tokens oficiais de elevação e opacidade do DSS. |
| **Formulário** | DssInput & DssSelect | A cor do rótulo flutuante (label) no estado `focused` foi modificada para utilizar a cor primária (`--dss-action-primary`), garantindo destaque visual imediato durante a interação do usuário. As variantes `outlined` e `filled` foram revisadas para consumir os tokens semânticos corretos de superfície e feedback. |
| **Formulário** | DssCheckbox, DssRadio & DssToggle | O estado inativo (`unchecked`) destes controles agora herda a cor primária no elemento raiz, em vez de herdar a cor do texto padrão. Esta mudança alinha o sistema ao Material 3, indicando interatividade mesmo quando o controle não está selecionado. A cor do rótulo associado foi isolada para utilizar `--dss-text-body`, evitando herança indesejada da cor primária. |
| **Indicadores** | DssAvatar | Foram identificados e substituídos tokens inexistentes no catálogo (`--dss-neutral-200` e `--dss-neutral-700`). O componente agora utiliza `--dss-surface-muted` para o fundo padrão e `--dss-text-body` para o texto, garantindo conformidade com o sistema de design. |
| **Indicadores** | DssSpinner | A propriedade `color` padrão no componente Vue foi alterada de `null` para `'primary'`. Isso assegura que um spinner renderizado isoladamente adote a cor primária da marca. Quando embutido em outros componentes, como botões, o CSS do elemento pai sobrescreve esta cor via `color: inherit`, mantendo o contraste adequado. |
| **Navegação** | DssBreadcrumbsEl | Os links de navegação clicáveis passaram a utilizar o token `--dss-text-action` (mapeado para a cor primária de ação), melhorando significativamente a affordance. O item correspondente à página atual permanece com a cor de texto padrão e peso de fonte seminegrito, indicando sua natureza estática. |

## 3. Pontos de Atenção (Issues Encontrados)

Durante o processo de auditoria e refatoração, foram identificados pontos arquiteturais que requerem atenção contínua da equipe de engenharia e design para evitar regressões ou quebras no sistema.

O primeiro ponto diz respeito à **integridade dos tokens**. No componente `DssAvatar`, o arquivo base fazia referência a tokens de cor e transição que não existiam no catálogo semântico oficial do DSS. É fundamental que novos componentes passem por uma validação estrita contra o dicionário de tokens antes de serem integrados à biblioteca principal.

O segundo ponto envolve a **herança de cor em controles de formulário**. A arquitetura atual de componentes como Checkbox, Radio e Toggle depende fortemente da propriedade `currentColor` herdada do elemento raiz. Ao forçar a cor primária no controle inativo para fins estéticos, foi necessário criar regras de isolamento para os rótulos de texto. A dependência da estrutura DOM gerada pelo framework subjacente (Quasar) dificulta uma separação limpa entre a cor do controle e a cor do rótulo sem o uso de seletores CSS complexos.

O terceiro ponto é o **uso de declarações `!important` em overlays**. Componentes que renderizam painéis flutuantes ou barras fixas, como `DssMenu`, `DssHeader` e `DssFooter`, exigem o uso de `!important` para sobrescrever as classes utilitárias injetadas nativamente pelo Quasar. Embora esta seja uma limitação técnica documentada (conhecida como Gate de Composição), o uso excessivo desta diretiva deve ser monitorado rigorosamente para evitar conflitos de especificidade em implementações futuras.

Por fim, a **ponte entre Vue e SCSS via classes utilitárias** apresenta fragilidades. O framework subjacente injeta classes como `text-primary` e `bg-primary` diretamente no DOM com base nas propriedades passadas aos componentes. O DSS intercepta este comportamento através de composables (`use*Classes`), mas a dependência de strings fixas acopladas ao CSS utilitário cria um elo que pode quebrar caso a nomenclatura das classes utilitárias seja alterada no futuro.

## 4. Conclusão

Os componentes base do Design System Sansys foram refatorados para apresentar um visual padrão moderno, coeso e fortemente ancorado na cor primária da marca. Todas as modificações foram aplicadas estritamente nas camadas de composição e variantes, respeitando a arquitetura de quatro camadas estabelecida pelo projeto. Com esta base sólida e alinhada às melhores práticas de mercado, a equipe de design possui total liberdade para modificar os tokens semânticos globais, injetando a identidade visual final da Sansys com a garantia de que a estrutura dos componentes responderá de forma consistente e previsível.
