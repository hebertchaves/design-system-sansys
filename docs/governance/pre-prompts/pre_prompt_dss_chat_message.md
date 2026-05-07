# Pré-prompt: DssChatMessage

## 1. CLASSIFICAÇÃO E CONTEXTO

**Golden Reference:** DssChip

**Golden Context:** O componente `DssChatMessage` é projetado para exibir mensagens individuais em uma interface de chat ou conversação. Ele deve ser capaz de representar mensagens enviadas pelo usuário atual e mensagens recebidas de outros participantes, com metadados associados como remetente, timestamp e status de leitura. Sua natureza interativa, permitindo seleção ou ações contextuais, o alinha com o `DssChip` como referência.

**Justificativa:** A necessidade de um componente de mensagem de chat padronizado no DSS surge da crescente demanda por interfaces de comunicação ricas e consistentes. Este componente garantirá uma experiência de usuário unificada em todas as aplicações que incorporam funcionalidades de chat, promovendo a reutilização e reduzindo o esforço de desenvolvimento.

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
| `status`                        | `status`                         | Estado da mensagem (ex: 'sent', 'delivered', 'read', 'error', 'sending'). |
| `@click`                        | `@click`                         | Evento emitido ao clicar na mensagem.                                     |
| `@longpress`                    | `@longPress`                     | Evento emitido ao pressionar e segurar a mensagem.                       |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssChatMessage` utilizará exclusivamente tokens do DSS para garantir consistência visual e manutenibilidade. Abaixo estão exemplos de uso:

*   **Espaçamento:**
    *   `padding: var(--dss-spacing-4) var(--dss-spacing-8);` (padding interno da bolha da mensagem)
    *   `margin-bottom: var(--dss-spacing-2);` (espaçamento entre mensagens)

*   **Raio da Borda:**
    *   `border-radius: var(--dss-radius-md);` (raio padrão da bolha da mensagem)
    *   `border-bottom-left-radius: var(--dss-radius-sm);` (ajuste para a bolha do remetente)

*   **Cores de Superfície:**
    *   `background-color: var(--dss-surface-default);` (cor de fundo para mensagens recebidas)
    *   `background-color: var(--dss-surface-primary);` (cor de fundo para mensagens enviadas)

*   **Duração de Transição:**
    *   `transition: background-color var(--dss-duration-250) ease-in-out;` (transição suave para estados de hover ou seleção)

**Tokens Proibidos:** `--dss-padding-md`, `--dss-margin-sm`, `--dss-color-blue`, `--dss-duration-base` (qualquer token com sufixo semântico não numérico ou não padrão).

## 5. ACESSIBILIDADE E ESTADOS

**Acessibilidade:**
*   **Função ARIA:** O componente deve ter `role="listitem"` para cada mensagem individual dentro de um contêiner com `role="list"` ou `role="feed"`.
*   **Labels:** Utilizar `aria-label` para fornecer contexto adicional, como "Mensagem de [Remetente] enviada em [Data/Hora]".
*   **Foco e Navegação:** Garantir que elementos interativos dentro da mensagem (ex: botões de ação) sejam acessíveis via teclado e que o foco seja gerenciado corretamente.
*   **Contraste de Cores:** Assegurar que as cores de texto e fundo atendam aos requisitos de contraste WCAG.

**Estados:**
*   **Enviado (isMine: true):** Mensagem enviada pelo usuário atual.
*   **Recebido (isMine: false):** Mensagem recebida de outro usuário.
*   **Lido:** Indicador visual de que a mensagem foi lida pelo destinatário.
*   **Não Lido:** Indicador visual de que a mensagem ainda não foi lida.
*   **Erro:** Mensagem que falhou ao ser enviada.
*   **Carregando:** Mensagem em processo de envio.
*   **Selecionado:** Mensagem que está em um estado de seleção (ex: para cópia ou exclusão).
*   **Hover:** Estado quando o mouse está sobre a mensagem.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

**Dependências:**
*   `DssAvatar`: Para exibir a imagem do perfil do remetente.
*   `DssText`: Para o conteúdo da mensagem, nome do remetente e timestamp.
*   `DssIcon`: Para ícones de status (ex: lido, erro) ou ações.
*   `DssButton` (opcional): Para ações contextuais na mensagem.

**Composição:**
Um `DssChatMessage` é composto por:
*   **Avatar do Remetente:** (Opcional) `DssAvatar` exibindo a imagem do remetente.
*   **Cabeçalho da Mensagem:** (Opcional) Contendo o nome do remetente (`DssText`) e/ou o timestamp (`DssText`).
*   **Bolha da Mensagem:** Contêiner principal da mensagem.
    *   **Conteúdo da Mensagem:** `DssText` para o texto da mensagem, podendo incluir links ou outros elementos inline.
    *   **Metadados da Mensagem:** (Opcional) `DssText` para o timestamp e `DssIcon` para o status de leitura/envio.
*   **Ações da Mensagem:** (Opcional) `DssButton` ou `DssIcon` para ações como responder, editar, excluir.

## 7. EXCEÇÕES PREVISTAS

*   **Mensagens Muito Longas:** O componente deve lidar com quebras de linha e rolagem interna, se necessário, para mensagens extensas.
*   **Mensagens com Mídia:** Suporte para exibir imagens, vídeos ou outros anexos dentro da bolha da mensagem (requer componentes adicionais ou slots).
*   **Mensagens com Links:** Detecção e renderização adequada de URLs clicáveis.
*   **Mensagens de Sistema:** Diferenciação visual para mensagens geradas pelo sistema (ex: "Usuário X entrou no chat").
*   **Mensagens Vazias:** Tratamento de mensagens sem conteúdo de texto.
*   **Mensagens com Conteúdo HTML/Markdown:** Sanitização e renderização segura de conteúdo rico.

## 8. SUPERFÍCIE DE PLAYGROUND

**Controles:**
*   `message` (String): Conteúdo da mensagem.
*   `isMine` (Boolean): Se a mensagem foi enviada pelo usuário atual.
*   `timestamp` (String): Carimbo de data/hora da mensagem (ex: "10:30 AM", "Ontem 14:00").
*   `senderName` (String): Nome do remetente.
*   `avatarSrc` (String): URL do avatar do remetente.
*   `status` (String): Estado da mensagem ('sent', 'delivered', 'read', 'error', 'sending').
*   `hasActions` (Boolean): Se a mensagem deve exibir botões de ação.

**Composite Logic:**
*   A propriedade `isMine` deve controlar o alinhamento da bolha da mensagem (direita para `true`, esquerda para `false`) e a cor de fundo (ex: `--dss-surface-primary` para `true`, `--dss-surface-default` para `false`).
*   O `status` deve controlar o ícone exibido (ex: ícone de check duplo para 'read', ícone de exclamação para 'error').
*   A presença de `avatarSrc` deve renderizar o `DssAvatar` correspondente.
*   `hasActions` deve alternar a visibilidade de um slot ou de botões de ação predefinidos.

**Estados a Expor:**
*   Mensagem Enviada (isMine: true, status: 'sent')
*   Mensagem Recebida (isMine: false, status: 'delivered')
*   Mensagem Lida (isMine: false, status: 'read')
*   Mensagem com Erro (isMine: true, status: 'error')
*   Mensagem Carregando (isMine: true, status: 'sending')
*   Mensagem Selecionada (isMine: false, status: 'delivered', selecionado: true)
*   Mensagem com Avatar e Nome do Remetente
*   Mensagem com Ações Contextuais