# Pré-prompt: DssBanner

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
O `DssBanner` é um componente não-interativo, utilizado para exibir mensagens informativas, de sucesso, aviso ou erro de forma proeminente. Sua natureza é similar ao `DssBadge`, que também serve para exibir informações concisas sem exigir interação direta do usuário. Portanto, o `DssBadge` é a **Golden Reference** para o `DssBanner`.

### Golden Context
Assim como o `DssBadge` comunica um status ou categoria de forma visualmente distinta, o `DssBanner` estende essa funcionalidade para mensagens mais elaboradas que requerem a atenção do usuário em um contexto específico da aplicação. Ele é ideal para feedback global ou seccional, sem interromper o fluxo principal do usuário com modais ou alertas intrusivos. O `DssBanner` é frequentemente posicionado no topo de uma página, seção ou formulário para comunicar o estado geral daquela área.

### Justificativa
O `DssBanner` preenche a necessidade de um componente padronizado para comunicação de feedback e informações importantes dentro do Design System. Ele garante consistência visual e funcionalidade em toda a aplicação, melhorando a experiência do usuário ao fornecer feedback claro e oportuno. A padronização evita a criação de soluções ad-hoc e garante a adesão aos princípios de acessibilidade e design do DSS. A utilização de banners padronizados reduz a carga cognitiva do usuário, que rapidamente aprende a identificar o tipo de mensagem pela cor e ícone associados.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
*   **Performance:** Múltiplos banners na mesma página podem impactar o desempenho, especialmente se contiverem animações complexas ou lógica reativa excessiva. A renderização de muitos componentes simultâneos deve ser evitada.
*   **Acessibilidade:** Falha em implementar corretamente atributos ARIA, foco de teclado e contraste de cores pode tornar o banner inacessível para usuários com deficiência. Leitores de tela precisam ser notificados de novos banners, especialmente os de erro.
*   **Manutenibilidade:** Lógica complexa para exibição e descarte de banners pode levar a código difícil de manter e testar. O estado do banner deve ser gerenciado de forma clara e previsível.
*   **Conflito de Estilos:** Integração inadequada com estilos globais ou de outros componentes pode causar quebras visuais. O isolamento de estilos através de escopo ou BEM é crucial.
*   **Sobrecarga de Informação:** O uso excessivo de banners pode causar "cegueira de banner", onde os usuários passam a ignorar as mensagens.

### Gates
*   **Revisão de Design:** Garantir que o design do banner esteja alinhado com as diretrizes visuais do DSS, respeitando espaçamentos, tipografia e paleta de cores.
*   **Revisão de Código:** Assegurar a qualidade do código, aderência a padrões (Vue 3 Composition API, TypeScript) e uso correto dos tokens DSS.
*   **Auditoria de Acessibilidade:** Verificação completa de conformidade com WCAG 2.1 AA, incluindo testes com leitores de tela (NVDA, VoiceOver) e navegação por teclado.
*   **Testes de Performance:** Avaliação do impacto do componente no carregamento e renderização da página, garantindo que não haja gargalos.
*   **Testes Unitários:** Cobertura de testes para garantir que as propriedades, eventos e slots funcionem conforme o esperado.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssBanner` será construído com base nas capacidades de componentes de notificação ou alerta do Quasar, mas com uma API simplificada e padronizada pelo DSS.

| Quasar Componente/Propriedade | DssBanner Propriedade/Slot | Descrição |
| :---------------------------- | :------------------------- | :---------- |
| `QBanner`                     | `DssBanner`                | Componente base. |
| `QBanner.props.type`          | `DssBanner.props.variant`  | Tipo de banner (e.g., `info`, `success`, `warning`, `error`). |
| `QBanner.props.icon`          | `DssBanner.props.icon`     | Ícone a ser exibido no banner. |
| `QBanner.props.dense`         | `DssBanner.props.size`     | Controle de densidade/tamanho (e.g., `sm`, `md`, `lg`). |
| `QBanner.props.inline-actions`| `DssBanner.slots.actions`  | Slot para ações (e.g., botões de fechar, links). |
| `QBanner.props.rounded`       | `DssBanner.props.rounded`  | Aplica bordas arredondadas. |
| `QBanner.slots.default`       | `DssBanner.slots.default`  | Conteúdo principal do banner (mensagem). |
| N/A                           | `DssBanner.emits.dismiss`  | Evento emitido quando o banner é descartado. |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssBanner` utilizará exclusivamente tokens do Design System para garantir consistência e facilidade de manutenção. Nenhum token semântico não-existente será inventado.

*   **Espaçamento:** `--dss-padding-4` (padding interno), `--dss-gap-3` (espaçamento entre ícone e texto, ou texto e ações).
*   **Raio da Borda:** `--dss-radius-md` para cantos arredondados padrão.
*   **Cores de Superfície:** `--dss-surface-default` para o fundo padrão, e tokens específicos de `surface-brand-light` para variantes com brand. Para feedback: `--dss-feedback-info-surface`, `--dss-feedback-success-surface`, `--dss-feedback-warning-surface`, `--dss-feedback-error-surface`.
*   **Cores de Texto:** `--dss-text-body` para o texto principal, `--dss-text-subtle` para textos secundários, e tokens específicos de `--dss-feedback-info`, `--dss-feedback-success`, `--dss-feedback-warning`, `--dss-feedback-error` para os diferentes `variants`.
*   **Cores de Ação (brands):** `--dss-hub-600` para ações hub, `--dss-water-500` para ações water, e `--dss-waste-600` para ações waste.
*   **Foco:** Utilizar `outline: 2px solid white` ou o token apropriado de foco do DSS para garantir visibilidade ao navegar por teclado.
*   **Duração de Transição:** `--dss-duration-250` para animações de entrada/saída ou descarte.
*   **Altura da Linha e Tamanho da Fonte:** Tokens de tipografia do DSS (e.g., `--dss-font-size-body-md`, `--dss-line-height-body-md`).

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
*   **Função ARIA:** O `DssBanner` deve usar `role="status"` para mensagens informativas e de sucesso, e `role="alert"` para mensagens de aviso e erro, garantindo que leitores de tela anunciem o conteúdo apropriadamente.
*   **Foco de Teclado:** Se o banner contiver ações (e.g., um botão de fechar), essas ações devem ser navegáveis via teclado e ter um indicador de foco visível (`outline: 2px solid white`).
*   **Contraste de Cores:** Todas as combinações de cores de fundo e texto devem atender aos requisitos mínimos de contraste WCAG AA (4.5:1 para texto normal, 3:1 para texto grande).
*   **Mensagens Claras:** O conteúdo do banner deve ser conciso e direto, evitando jargões.
*   **Aviso de Mudança:** Quando um banner é adicionado dinamicamente à página, o leitor de tela deve ser notificado através de `aria-live="polite"` ou `aria-live="assertive"`, dependendo da urgência.

### Estados
*   **Padrão (Default):** Estado inicial do banner, sem cores semânticas específicas.
*   **Informativo (Info):** Para mensagens neutras ou informativas. Utiliza tons de azul.
*   **Sucesso (Success):** Para indicar que uma operação foi concluída com êxito. Utiliza tons de verde.
*   **Aviso (Warning):** Para alertar sobre situações que exigem atenção, mas não são críticas. Utiliza tons de amarelo/laranja.
*   **Erro (Error):** Para indicar falhas ou problemas críticos. Utiliza tons de vermelho.
*   **Descartável (Dismissible):** Com um botão de fechar que permite ao usuário remover o banner. O estado de visibilidade deve ser gerenciado pelo componente pai.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas do DSS
*   `DssIcon`: Para exibir ícones contextuais (e.g., `info`, `check`, `warning`, `error`).
*   `DssButton` (ou `DssIconButton`): Para o botão de descarte (`dismissible`) ou outras ações dentro do banner.
*   `DssTypography`: Para garantir a consistência do texto.

### Composição
O `DssBanner` pode ser composto com outros componentes para criar padrões de UI mais complexos. Por exemplo, um `DssBanner` pode conter um `DssLink` dentro de seu slot de conteúdo para direcionar o usuário a mais informações, ou múltiplos `DssButton`s no slot de ações. A composição deve ser flexível o suficiente para permitir diferentes layouts de ações (inline ou empilhadas).

## 7. EXCEÇÕES PREVISTAS

*   **Conteúdo Dinâmico:** Banners com conteúdo que muda frequentemente podem exigir uma estratégia de atualização otimizada para evitar impactos na performance.
*   **Posicionamento Fixo:** Em casos raros, um banner pode precisar de posicionamento fixo (e.g., no topo da viewport). Isso deve ser tratado como uma exceção e implementado com cautela para não interferir na rolagem ou em outros elementos fixos.
*   **Interações Complexas:** Se um banner precisar de interações mais complexas do que um simples descarte ou link, ele pode estar se desviando de seu propósito e um componente diferente (e.g., `DssModal` ou `DssDialog`) pode ser mais apropriado.
*   **Banners Globais vs. Locais:** A distinção entre banners que afetam toda a aplicação (e.g., manutenção do sistema) e banners locais (e.g., erro em um formulário específico) deve ser clara na implementação.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios
*   `variant`: `select` (`info`, `success`, `warning`, `error`, `default`) - Define a intenção semântica do banner.
*   `text`: `text` - Conteúdo da mensagem principal do banner.
*   `icon`: `text` - Nome do ícone a ser exibido (opcional).
*   `dismissible`: `boolean` - Habilita o botão de fechar o banner.
*   `rounded`: `boolean` - Aplica bordas arredondadas ao banner.
*   `size`: `select` (`sm`, `md`, `lg`) - Define o tamanho e densidade do banner.

### Composite Logic
*   **Lógica de Descarte:** Demonstração de como o banner é removido da UI quando o botão de fechar é clicado ou uma ação de descarte é acionada. Isso envolve a emissão de um evento `dismiss` e a remoção do componente da árvore DOM através de um `v-if` no componente pai.
*   **Atualização de Conteúdo:** Exemplo de como o texto ou o `variant` do banner pode ser atualizado dinamicamente, reagindo a mudanças de estado na aplicação. Isso pode ser demonstrado através de um botão que alterna o tipo de mensagem (e.g., de `info` para `success`).
*   **Interação com Ações:** Demonstração de como as ações configuradas no slot `actions` interagem com a aplicação, por exemplo, um botão "Saiba Mais" que navega para outra página ou um botão "Tentar Novamente" que dispara uma nova requisição.

### Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Default | Banner padrão sem ícone e sem ações. | Visual | Padrão (renderização inicial) |
| Info | Banner informativo com ícone. | Visual | — |
| Success | Banner de sucesso com ícone e botão de descarte. | Funcional | Operação concluída |
| Warning | Banner de aviso com ícone e link de ação. | Visual | — |
| Error | Banner de erro com ícone e múltiplas ações. | Funcional | Prop `error=true` ou validação |
| Rounded | Banner com bordas arredondadas. | Visual | Prop `round=true` |
| Small | Banner em tamanho pequeno. | Visual | — |
| Large | Banner em tamanho grande. | Visual | — |
