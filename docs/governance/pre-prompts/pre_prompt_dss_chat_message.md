# Pré-prompt: DssChatMessage

## 1. CLASSIFICAÇÃO E CONTEXTO

**Fase:** 2 — Nível 2 (Composição de Primeiro Grau) | **Família:** Conteúdo Rico

**Golden Reference:** DssChip (interativo — touch target `::before`, pseudo-elementos, brand system)

**Golden Context:** DssCarousel (composto Fase 2, EXC-Arch-01 — HTML semântico customizado com subcomponentes DSS internos)

**Justificativa de EXC-Arch-01:** `QChatMessage` do Quasar é primitivo demais: texto como array de strings, sem slots ricos, sem status icons, sem estados de entrega/leitura. `DssChatMessage` é implementado como HTML semântico customizado (`<article role="listitem">`) com `DssAvatar` e `DssIcon` como subcomponentes internos.

## 2. RISCOS ARQUITETURAIS E GATES

**Riscos Arquiteturais:**
*   **Complexidade de Estados:** Gerenciamento de múltiplos estados (enviado, recebido, lido, erro, carregando, selecionado) e suas transições pode levar a um código complexo e propenso a erros.
*   **Internacionalização (i18n):** Formatação de datas e horários, bem como suporte a diferentes direções de texto (RTL/LTR), pode ser um desafio.
*   **Acessibilidade:** Garantir que o conteúdo da mensagem e os metadados sejam corretamente anunciados por leitores de tela e que a navegação por teclado seja intuitiva.
*   **Conteúdo Variável:** Acomodar diferentes tipos de conteúdo (texto simples, links, emojis, mídia) dentro da mensagem.

**Gates:**
*   **Revisão de Design:** Validação do design do componente com as diretrizes do DSS e requisitos de UX.
*   **Testes de Acessibilidade:** Auditoria completa de acessibilidade para garantir conformidade com WCAG.
*   **Testes de Performance:** Avaliação do desempenho do componente em listas longas de mensagens.
*   **Revisão de Código:** Garantir a implementação correta dos estados e da API.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

Considerando a ausência de um componente `QChatMessage` direto no Quasar que se alinhe perfeitamente com a complexidade desejada, o mapeamento será conceitual, focando em propriedades e eventos comuns a componentes de exibição de conteúdo com interatividade. No entanto, para fins de demonstração, podemos inferir algumas propriedades e eventos que seriam relevantes para um componente de mensagem de chat.

| Propriedade Quasar (Conceitual) | Propriedade DSS (DssChatMessage) | Descrição                                                                 |
| :------------------------------ | :------------------------------- | :------------------------------------------------------------------------ |
| `text`                          | `message`                        | Conteúdo principal da mensagem.                                           |
| `sent`                          | `isMine`                         | Indica se a mensagem foi enviada pelo usuário atual.                      |
| `stamp`                         | `timestamp`                      | Carimbo de data/hora da mensagem.                                         |
| `avatar`                        | `avatarSrc`                      | URL da imagem do avatar do remetente.                                     |
| `name`                          | `senderName`                     | Nome do remetente da mensagem.                                            |
| `bgColor`                       | `backgroundColor`                | Cor de fundo da bolha da mensagem (controlada por tokens DSS).            |
| `textColor`                     | `textColor`                      | Cor do texto da mensagem (controlada por tokens DSS).                     |
| `status`                        | `status`                         | Estado da mensagem (ex: 'sent', 'delivered', 'read', 'error', 'sending'). Este status é crucial para a renderização condicional de ícones de feedback. |
| `dense`                         | `compact`                        | Booleano que indica se a mensagem deve ser renderizada em um formato mais compacto, ideal para conversas com alta densidade de mensagens. |
| `textColor`                     | `textColor`                      | Cor do texto da mensagem, controlada por tokens DSS como `--dss-text-default` ou `--dss-text-subtle`. |
| `avatarPosition`                | `avatarPlacement`                | Posição do avatar em relação à bolha da mensagem (e.g., 'top', 'center', 'bottom'). |
| `messageType`                   | `contentType`                    | Define o tipo de conteúdo da mensagem (e.g., 'text', 'image', 'file', 'link') para renderização especializada. |
| `@click`                        | `@click`                         | Evento emitido ao clicar na área principal da mensagem, útil para seleção ou exibição de detalhes. |
| `@longpress`                    | `@longPress`                     | Evento emitido ao pressionar e segurar a mensagem, geralmente para ativar modos de seleção múltipla ou menus contextuais. |
| `@delete`                       | `@delete`                        | Evento customizado emitido quando uma ação de exclusão é disparada na mensagem. |
| `@edit`                         | `@edit`                          | Evento customizado emitido quando uma ação de edição é disparada na mensagem. |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssChatMessage` utilizará exclusivamente tokens do DSS para garantir consistência visual e manutenibilidade. Abaixo estão exemplos de uso:

*   **Espaçamento:**
    *   `padding: var(--dss-spacing-4) var(--dss-spacing-8);` (padding interno da bolha da mensagem, garantindo respiro adequado ao conteúdo).
    *   `margin-bottom: var(--dss-spacing-2);` (espaçamento vertical entre mensagens consecutivas para legibilidade).
    *   `gap: var(--dss-spacing-1);` (espaçamento entre elementos internos da mensagem, como avatar e conteúdo).

*   **Raio da Borda:**
    *   `border-radius: var(--dss-radius-md);` (raio padrão da bolha da mensagem, conferindo um visual suave e moderno).
    *   `border-bottom-left-radius: var(--dss-radius-sm);` (ajuste específico para a bolha do remetente, criando um "bico" que aponta para o avatar).
    *   `border-top-right-radius: var(--dss-radius-xs);` (ajuste para mensagens recebidas, diferenciando visualmente a origem).

*   **Cores de Superfície:**
    *   `background-color: var(--dss-surface-default);` — bolha de mensagem recebida (neutro).
    *   `background-color: var(--dss-gray-200);` — bolha de mensagem enviada, sem brand (padrão).
    *   `background-color: var(--dss-{hub|water|waste}-primary);` — bolha mine com brand ativo.
    *   `background-color: var(--dss-surface-dark);` — bolha recebida em dark mode.
    *   `background-color: var(--dss-gray-600);` — bolha mine em dark mode.

*   **Cores de Texto:**
    *   `color: var(--dss-text-body);` — texto principal da mensagem.
    *   `color: var(--dss-text-subtle);` — timestamp, nome do remetente, ícones de status neutros.
    *   `color: var(--dss-text-inverse);` — texto sobre superfícies escuras (dark mode).
    *   `color: var(--dss-{hub|water|waste}-on-primary);` — texto sobre bolha mine com brand.

*   **Duração de Transição:**
    *   `transition: background-color var(--dss-duration-200) var(--dss-easing-standard);` — hover/seleção.
    *   `transition: filter var(--dss-duration-150) var(--dss-easing-standard);` — brightness na bolha.
    *   `animation: ... var(--dss-duration-slowest) var(--dss-easing-ease-in-out) infinite alternate;` — pulsação do status sending.

*   **Sombras:**
    *   `box-shadow: var(--dss-shadow-sm);` — sombra sutil da bolha.

**⚠️ Tokens que NÃO existem no catálogo DSS (proibidos):**
- `--dss-action-hub-surface`, `--dss-action-water` → usar `--dss-hub-primary`, `--dss-water-primary`
- `--dss-surface-water`, `--dss-surface-hub` → tokens por produto não existem; usar `--dss-surface-default`
- `--dss-text-default` → usar `--dss-text-body`
- `--dss-duration-250` → tokens de duração existentes: `--dss-duration-150`, `-200`, `-slowest`
- `--dss-margin-sm`, `--dss-color-blue` → não existem no catálogo DSS

## 5. ACESSIBILIDADE E ESTADOS

**Acessibilidade:**
*   **Função ARIA:** O componente deve ter `role="listitem"` para cada mensagem individual dentro de um contêiner com `role="list"` ou `role="feed"`. Isso ajuda tecnologias assistivas a interpretar a estrutura da conversa.
*   **Labels:** Utilizar `aria-label` para fornecer contexto adicional e descritivo, como "Mensagem de [Remetente] enviada em [Data/Hora] com status [Status]". Isso enriquece a experiência para usuários de leitores de tela.
*   **Foco e Navegação:** Garantir que todos os elementos interativos dentro da mensagem (ex: botões de ação, links) sejam acessíveis via teclado (`tabindex`) e que o foco seja gerenciado corretamente, especialmente em cenários de navegação complexos ou modais.
*   **Contraste de Cores:** Assegurar que as cores de texto e fundo atendam aos requisitos mínimos de contraste WCAG 2.1 (nível AA) para garantir legibilidade para usuários com deficiência visual.
*   **Estrutura Semântica:** Utilizar elementos HTML semânticos (`<time>`, `<p>`, `<span>`) para transmitir o significado correto do conteúdo da mensagem e seus metadados.
*   **Feedback Visual para Estados:** Fornecer feedback visual claro para estados interativos (foco, hover, ativo) que não dependa apenas de cor.

**Estados:**
*   **Enviado (isMine: true):** Mensagem enviada pelo usuário atual. Visualmente alinhada à direita, com cor de fundo `--dss-action-hub-surface`.
*   **Recebido (isMine: false):** Mensagem recebida de outro usuário. Visualmente alinhada à esquerda, com cor de fundo `--dss-surface-default`.
*   **Lido:** Indicador visual (ex: ícone de check duplo azul) de que a mensagem foi lida pelo destinatário. Este estado é crucial para feedback em tempo real.
*   **Não Lido:** Indicador visual (ex: bolha ou ponto) de que a mensagem ainda não foi lida, incentivando a atenção do usuário.
*   **Erro:** Mensagem que falhou ao ser enviada. Exibição de um ícone de alerta (ex: exclamação em círculo) e, opcionalmente, uma mensagem de erro detalhada.
*   **Carregando:** Mensagem em processo de envio. Pode ser representado por um spinner ou um estado de opacidade reduzida.
*   **Selecionado:** Mensagem que está em um estado de seleção (ex: para cópia, exclusão ou encaminhamento). Geralmente com um destaque visual (borda ou cor de fundo diferente).
*   **Hover:** Estado quando o ponteiro do mouse está sobre a mensagem, indicando interatividade. Pode ativar a exibição de ações contextuais.
*   **Foco:** Estado quando a mensagem ou um de seus elementos internos está focado via teclado, essencial para acessibilidade.
*   **Desabilitado:** Mensagem ou ações dentro dela que estão temporariamente indisponíveis, com feedback visual de inatividade.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

**Dependências:**
*   `DssAvatar`: Essencial para exibir a imagem de perfil do remetente, contribuindo para a identificação visual rápida em conversas. Deve ser configurável para diferentes tamanhos e formatos.
*   `DssText`: Utilizado para renderizar o conteúdo principal da mensagem, o nome do remetente, o timestamp e quaisquer outros textos informativos. Deve suportar variações de tipografia e cor definidas pelos tokens do DSS.
*   `DssIcon`: Necessário para exibir ícones de status (como lido, entregue, erro, enviando) e para representar ações contextuais (como responder, encaminhar, excluir). A biblioteca de ícones deve ser consistente com o restante do Design System.
*   `DssButton` (opcional): Pode ser integrado para fornecer ações interativas diretamente na bolha da mensagem, como botões de resposta rápida ou opções de menu. Sua inclusão deve ser condicional e configurável.
*   `DssTooltip` (opcional): Para fornecer informações adicionais ao passar o mouse sobre elementos da mensagem, como o timestamp completo ou o status detalhado.
*   `DssLink` (opcional): Para renderizar URLs dentro do conteúdo da mensagem de forma acessível e estilizada.

**Composição:**
Um `DssChatMessage` é uma composição flexível de vários componentes menores, organizados para formar uma unidade de mensagem coesa:
*   **Container Principal:** Um elemento flexível que agrupa todos os subcomponentes, controlando o alinhamento (esquerda/direita) e o espaçamento geral da mensagem.
*   **Avatar do Remetente:** (Opcional) Um `DssAvatar` posicionado estrategicamente para indicar o autor da mensagem. Sua visibilidade pode ser controlada por uma propriedade `showAvatar`.
*   **Bolha da Mensagem:** O contêiner visual principal que envolve o conteúdo da mensagem. Suas propriedades de estilo (cor de fundo, raio da borda, sombra) são definidas por tokens DSS e variam conforme o estado (`isMine`, `status`).
    *   **Cabeçalho da Mensagem:** (Opcional) Uma área dentro da bolha que pode conter o nome do remetente (`DssText`) e/ou o timestamp (`DssText`), especialmente útil em chats de grupo ou para mensagens recebidas.
    *   **Conteúdo da Mensagem:** O coração do componente, geralmente um `DssText` que exibe o texto da mensagem. Pode incluir slots para renderização de conteúdo rico (imagens, vídeos, anexos) ou componentes como `DssLink`.
    *   **Metadados da Mensagem:** (Opcional) Uma área para informações secundárias, como o timestamp (`DssText`) e o ícone de status (`DssIcon`), que fornecem feedback sobre o envio e leitura da mensagem.
*   **Ações da Mensagem:** (Opcional) Um slot ou um conjunto de `DssButton` ou `DssIcon` que aparecem ao interagir com a mensagem (ex: hover, seleção), permitindo ações como responder, editar, excluir, ou encaminhar. A visibilidade e o tipo de ações são configuráveis via propriedades.

## 7. EXCEÇÕES PREVISTAS

*   **Mensagens Muito Longas:** O componente deve ser capaz de lidar com mensagens de texto extensas, aplicando quebras de linha automáticas e, se necessário, rolagem interna ou truncamento com opção de expansão para evitar sobrecarga visual e manter a legibilidade.
*   **Mensagens com Mídia:** Prever suporte para a exibição de diferentes tipos de mídia (imagens, vídeos, áudios, documentos) diretamente dentro da bolha da mensagem. Isso pode ser alcançado através de slots dedicados ou componentes internos especializados (ex: `DssImage`, `DssVideoPlayer`).
*   **Mensagens com Links:** Implementar detecção automática e renderização adequada de URLs clicáveis, garantindo que sejam acessíveis e visualmente distintos do texto normal. Considerar a exibição de pré-visualizações de links (link unfurling).
*   **Mensagens de Sistema:** Permitir uma diferenciação visual clara para mensagens geradas pelo sistema (ex: "Usuário X entrou no chat", "Mensagem editada"), que podem ter um estilo neutro e centralizado, sem avatar ou bolha.
*   **Mensagens Vazias:** Tratar mensagens que não contêm conteúdo de texto visível, mas podem ter anexos ou metadados. O componente deve ser robusto o suficiente para não quebrar e, idealmente, exibir um placeholder ou ícone indicativo.
*   **Mensagens com Conteúdo HTML/Markdown:** Garantir a sanitização e renderização segura de conteúdo rico (HTML ou Markdown) para prevenir ataques XSS e manter a integridade visual. A renderização deve ser consistente com as diretrizes de tipografia do DSS.
*   **Mensagens Interativas:** Exceções para mensagens que contêm elementos interativos complexos, como formulários embutidos, enquetes ou botões de ação que disparam fluxos específicos. Estes podem exigir slots ou componentes de renderização personalizados.
*   **Mensagens Criptografadas:** Considerar o tratamento de mensagens criptografadas, onde o conteúdo pode precisar ser descriptografado antes da exibição, ou exibir um aviso caso a descriptografia falhe.

## 8. SUPERFÍCIE DE PLAYGROUND

**Controles Obrigatórios:**
*   `message` (String): O conteúdo textual principal da mensagem. Deve ser capaz de renderizar texto simples e, opcionalmente, suportar formatação básica como negrito ou itálico. Exemplo: "Olá, tudo bem?" ou "*Urgente*: Reunião às 10h."
*   `isMine` (Boolean): Um flag booleano que indica se a mensagem foi enviada pelo usuário atualmente logado. Este controle é fundamental para a diferenciação visual do remetente e do destinatário, afetando o alinhamento e as cores da bolha da mensagem.
*   `timestamp` (String): O carimbo de data/hora da mensagem. Pode ser uma string formatada (ex: "10:30 AM", "Ontem 14:00") ou um objeto `Date` que o componente formatará internamente. Essencial para contextualizar a mensagem cronologicamente.
*   `senderName` (String, opcional): O nome do remetente da mensagem. Exibido acima da bolha da mensagem em conversas de grupo ou quando `isMine` é `false`. Exemplo: "João Silva".
*   `avatarSrc` (String, opcional): A URL da imagem do avatar do remetente. Se fornecido, o `DssAvatar` será renderizado. Se ausente, um avatar placeholder ou as iniciais do remetente podem ser exibidos. Exemplo: "https://example.com/avatar.jpg".
*   `status` (String, opcional): O estado atual da mensagem, que pode ser um dos seguintes: `sent` (enviada), `delivered` (entregue), `read` (lida), `error` (erro no envio), `sending` (enviando). Este controle é vital para fornecer feedback visual ao usuário sobre o ciclo de vida da mensagem.
*   `hasActions` (Boolean, opcional): Um flag que determina se a mensagem deve exibir um conjunto de ações contextuais (ex: responder, editar, excluir). Quando `true`, um slot ou botões predefinidos são ativados.
*   `compact` (Boolean, opcional): Se `true`, a mensagem será renderizada em um formato mais denso, reduzindo o espaçamento interno e externo, ideal para exibir um grande volume de mensagens.
*   `contentType` (String, opcional): Define o tipo de conteúdo da mensagem além de texto simples, como `image`, `video`, `file`, `link`. Permite que o componente renderize o conteúdo de forma apropriada.

**Composite Logic:**
*   **Alinhamento e Estilo da Bolha:** A propriedade `isMine` é a principal controladora do layout. Se `isMine` for `true`, a bolha é alinhada à direita com `border-radius: var(--dss-radius-lg) var(--dss-radius-sm) var(--dss-radius-lg) var(--dss-radius-lg)` e `background-color: var(--dss-gray-200)` (sem brand) ou `var(--dss-{brand}-primary)` (com brand). Se `isMine` for `false`, alinhada à esquerda com `border-radius: var(--dss-radius-sm) var(--dss-radius-lg) var(--dss-radius-lg) var(--dss-radius-lg)` e `background-color: var(--dss-surface-default)`.
*   **Feedback de Status (ícones Material Icons):** `sending` → `schedule` (animado, `--dss-text-subtle`); `sent` → `done` (`--dss-text-subtle`); `delivered` → `done_all` (`--dss-text-subtle`); `read` → `done_all` (`--dss-text-body` sem brand, `--dss-{brand}-primary` com brand); `error` → `error_outline` (`--dss-feedback-error`).
*   **Exibição do Avatar:** A presença da propriedade `avatarSrc` deve condicionar a renderização do componente `DssAvatar`. Se `avatarSrc` estiver vazio ou nulo, o `DssAvatar` não deve ser exibido, ou um placeholder com as iniciais do `senderName` pode ser gerado. A posição do avatar pode ser ajustada com base em `isMine` ou `avatarPlacement`.
*   **Ações Contextuais:** Quando `hasActions` é `true`, um slot nomeado `actions` deve ser ativado, permitindo que o consumidor do componente injete `DssButton` ou `DssIcon` interativos. Alternativamente, um menu de contexto padrão pode ser exibido ao passar o mouse ou clicar na mensagem, oferecendo opções como "Responder", "Encaminhar", "Excluir".
*   **Renderização de Conteúdo:** A propriedade `contentType` deve guiar a renderização do `message`. Se `contentType` for `image`, o `message` deve ser tratado como uma URL de imagem e renderizado dentro de um `DssImage`. Se for `link`, o `message` deve ser transformado em um `DssLink` clicável. Isso garante que diferentes tipos de conteúdo sejam apresentados de forma otimizada e segura.

**Estados a Expor:**

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `Enviada` | Mensagem enviada pelo usuário atual (`isMine: true`, `status: 'sent'`). | Visual | — |
| `Recebida` | Mensagem recebida de outro usuário (`isMine: false`, `status: 'delivered'`). | Visual | — |
| `Lida` | Indicador visual de que a mensagem foi lida pelo destinatário (`status: 'read'`). | Visual | — |
| `Com Erro` | Mensagem que falhou ao ser enviada (`isMine: true`, `status: 'error'`). | Funcional | Prop `error=true` ou validação |
| `Carregando` | Mensagem em processo de envio (`isMine: true`, `status: 'sending'`). | Funcional | Prop `loading=true` |
| `Selecionada` | Mensagem que está em um estado de seleção (`selecionado: true`). | Visual | — |
| `Com Avatar e Nome` | Mensagem exibindo o avatar e nome do remetente. | Visual | — |
| `Com Ações` | Mensagem com botões de ação contextuais (`hasActions: true`). | Visual | — |
