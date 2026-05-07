# Pré-prompt: DssBanner

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
O `DssBanner` é um componente não-interativo, utilizado para exibir mensagens informativas, de sucesso, aviso ou erro de forma proeminente. Sua natureza é similar ao `DssBadge`, que também serve para exibir informações concisas sem exigir interação direta do usuário. Portanto, o `DssBadge` é a **Golden Reference** para o `DssBanner`.

### Golden Context
Assim como o `DssBadge` comunica um status ou categoria de forma visualmente distinta, o `DssBanner` estende essa funcionalidade para mensagens mais elaboradas que requerem a atenção do usuário em um contexto específico da aplicação. Ele é ideal para feedback global ou seccional, sem interromper o fluxo principal do usuário com modais ou alertas intrusivos.

### Justificativa
O `DssBanner` preenche a necessidade de um componente padronizado para comunicação de feedback e informações importantes dentro do Design System. Ele garante consistência visual e funcionalidade em toda a aplicação, melhorando a experiência do usuário ao fornecer feedback claro e oportuno. A padronização evita a criação de soluções ad-hoc e garante a adesão aos princípios de acessibilidade e design do DSS.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
*   **Performance:** Múltiplos banners na mesma página podem impactar o desempenho, especialmente se contiverem animações complexas ou lógica reativa excessiva.
*   **Acessibilidade:** Falha em implementar corretamente atributos ARIA, foco de teclado e contraste de cores pode tornar o banner inacessível para usuários com deficiência.
*   **Manutenibilidade:** Lógica complexa para exibição e descarte de banners pode levar a código difícil de manter e testar.
*   **Conflito de Estilos:** Integração inadequada com estilos globais ou de outros componentes pode causar quebras visuais.

### Gates
*   **Revisão de Design:** Garantir que o design do banner esteja alinhado com as diretrizes visuais do DSS.
*   **Revisão de Código:** Assegurar a qualidade do código, aderência a padrões e uso correto dos tokens DSS.
*   **Auditoria de Acessibilidade:** Verificação completa de conformidade com WCAG, incluindo testes com leitores de tela e navegação por teclado.
*   **Testes de Performance:** Avaliação do impacto do componente no carregamento e renderização da página.

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

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssBanner` utilizará exclusivamente tokens do Design System para garantir consistência e facilidade de manutenção. Nenhum token semântico não-existente será inventado.

*   **Espaçamento:** `--dss-spacing-4` (padding interno), `--dss-spacing-8` (espaçamento entre ícone e texto, ou texto e ações).
*   **Raio da Borda:** `--dss-radius-md` para cantos arredondados padrão.
*   **Cores de Superfície:** `--dss-surface-default` para o fundo padrão, e tokens específicos de `surface-info`, `surface-success`, `surface-warning`, `surface-error` para os diferentes `variants`.
*   **Cores de Texto:** `--dss-text-default` para o texto principal, e tokens específicos de `text-info`, `text-success`, `text-warning`, `text-error` para os diferentes `variants`.
*   **Duração de Transição:** `--dss-duration-250` para animações de entrada/saída ou descarte.
*   **Altura da Linha e Tamanho da Fonte:** Tokens de tipografia do DSS (e.g., `--dss-font-size-body-md`, `--dss-line-height-body-md`).

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
*   **Função ARIA:** O `DssBanner` deve usar `role="status"` para mensagens informativas e de sucesso, e `role="alert"` para mensagens de aviso e erro, garantindo que leitores de tela anunciem o conteúdo apropriadamente.
*   **Foco de Teclado:** Se o banner contiver ações (e.g., um botão de fechar), essas ações devem ser navegáveis via teclado e ter um indicador de foco visível.
*   **Contraste de Cores:** Todas as combinações de cores de fundo e texto devem atender aos requisitos mínimos de contraste WCAG AA.
*   **Mensagens Claras:** O conteúdo do banner deve ser conciso e direto, evitando jargões.

### Estados
*   **Padrão (Default):** Estado inicial do banner.
*   **Informativo (Info):** Para mensagens neutras ou informativas.
*   **Sucesso (Success):** Para indicar que uma operação foi concluída com êxito.
*   **Aviso (Warning):** Para alertar sobre situações que exigem atenção, mas não são críticas.
*   **Erro (Error):** Para indicar falhas ou problemas críticos.
*   **Descartável (Dismissible):** Com um botão de fechar que permite ao usuário remover o banner.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas do DSS
*   `DssIcon`: Para exibir ícones contextuais (e.g., `info`, `check`, `warning`, `error`).
*   `DssButton` (ou `DssIconButton`): Para o botão de descarte (`dismissible`) ou outras ações dentro do banner.
*   `DssTypography`: Para garantir a consistência do texto.

### Composição
O `DssBanner` pode ser composto com outros componentes para criar padrões de UI mais complexos. Por exemplo, um `DssBanner` pode conter um `DssLink` dentro de seu slot de conteúdo para direcionar o usuário a mais informações, ou múltiplos `DssButton`s no slot de ações.

## 7. EXCEÇÕES PREVISTAS

*   **Conteúdo Dinâmico:** Banners com conteúdo que muda frequentemente podem exigir uma estratégia de atualização otimizada para evitar impactos na performance.
*   **Posicionamento Fixo:** Em casos raros, um banner pode precisar de posicionamento fixo (e.g., no topo da viewport). Isso deve ser tratado como uma exceção e implementado com cautela para não interferir na rolagem ou em outros elementos fixos.
*   **Interações Complexas:** Se um banner precisar de interações mais complexas do que um simples descarte ou link, ele pode estar se desviando de seu propósito e um componente diferente (e.g., `DssModal`) pode ser mais apropriado.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles
*   `variant`: `string` (`info`, `success`, `warning`, `error`, `default`)
*   `text`: `string` (Conteúdo da mensagem do banner)
*   `icon`: `string` (Nome do ícone, e.g., `info`, `check_circle`, `warning`, `error`)
*   `dismissible`: `boolean` (Se o banner pode ser fechado pelo usuário)
*   `rounded`: `boolean` (Aplica bordas arredondadas)
*   `size`: `string` (`sm`, `md`, `lg`)

### Composite Logic
*   **Lógica de Descarte:** Demonstração de como o banner é removido da UI quando o botão de fechar é clicado ou uma ação de descarte é acionada.
*   **Atualização de Conteúdo:** Exemplo de como o texto ou o `variant` do banner pode ser atualizado dinamicamente.

### Estados a Expor
*   `DssBanner` padrão (sem ícone, sem ações).
*   `DssBanner` informativo com ícone.
*   `DssBanner` de sucesso com ícone e botão de descarte.
*   `DssBanner` de aviso com ícone e link de ação.
*   `DssBanner` de erro com ícone e múltiplas ações.
*   `DssBanner` com bordas arredondadas (`rounded`).
*   `DssBanner` em diferentes tamanhos (`sm`, `md`, `lg`).