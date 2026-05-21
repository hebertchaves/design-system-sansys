# DSSCHATMESSAGE_API.md — DssChatMessage API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `String` | `undefined` | Conteúdo textual da mensagem. Substituído pelo slot `default` quando preenchido. |
| `isMine` | `Boolean` | `false` | Indica que a mensagem foi enviada pelo usuário atual. Afeta alinhamento, cor e posição do avatar. |
| `timestamp` | `String` | `undefined` | Carimbo de data/hora exibido na área de metadados (ex: `"10:30"`, `"Ontem 14:00"`). |
| `senderName` | `String` | `undefined` | Nome do remetente. Exibido acima da bolha somente em mensagens recebidas (`isMine: false`). |
| `avatarSrc` | `String` | `undefined` | URL da imagem de avatar. Quando fornecido, renderiza um `<img>` dentro do `DssAvatar`. Substituído pelo slot `avatar`. |
| `status` | `'sending' \| 'sent' \| 'delivered' \| 'read' \| 'error'` | `undefined` | Status de entrega/leitura. Renderiza ícone correspondente via `DssIcon`. |
| `compact` | `Boolean` | `false` | Reduz espaçamento interno para alta densidade de mensagens. |
| `selected` | `Boolean` | `false` | Estado de seleção (ex: modo de cópia/exclusão múltipla). Adiciona outline na bolha. |
| `showAvatar` | `Boolean` | `true` | Controla visibilidade da área de avatar. |
| `disable` | `Boolean` | `false` | Desabilita clique e long-press. Aplica `opacity: var(--dss-opacity-disabled)`. |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Conteúdo principal da mensagem. Substitui a prop `message`. Permite conteúdo rico (imagens, links, etc.). |
| `avatar` | Avatar customizado. Substitui a renderização automática do `DssAvatar`. |
| `actions` | Ações contextuais (ex: Responder, Encaminhar, Excluir). Renderizadas abaixo da bolha. |
| `sender-name` | Nome do remetente customizado. Substitui o texto da prop `senderName`. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitido ao clicar na mensagem. Não emitido quando `disable: true`. |
| `long-press` | `PointerEvent` | Emitido após ~500ms de pressão contínua. Útil para menus contextuais. Cancelado por `pointermove`/`pointercancel`. |

## Status Icons (Material Icons)

| Status | Ícone | Cor Padrão | Cor com Brand |
|--------|-------|-----------|--------------|
| `sending` | `schedule` | `--dss-text-subtle` + animação pulse | — |
| `sent` | `done` | `--dss-text-subtle` | — |
| `delivered` | `done_all` | `--dss-text-subtle` | — |
| `read` | `done_all` | `--dss-text-body` | `--dss-{brand}-primary` |
| `error` | `error_outline` | `--dss-feedback-error` | — |

## Tokens Utilizados

| Token | Layer | Uso |
|-------|-------|-----|
| `--dss-spacing-0_5` | L2, L3 | Gap mínimo entre elementos |
| `--dss-spacing-1` | L2, L3 | Gap interno, padding metadados |
| `--dss-spacing-1_5` | L3 | Gap compacto |
| `--dss-spacing-2` | L2, L3 | Padding bubble (vertical) |
| `--dss-spacing-2_5` | L3 | Padding bubble compacto |
| `--dss-spacing-3` | L2 | Padding bubble (horizontal) |
| `--dss-spacing-4` | L2 | Gap entre avatar e conteúdo |
| `--dss-font-family-sans` | L2 | Família tipográfica |
| `--dss-font-size-xs` | L2, L3 | Timestamp, compact |
| `--dss-font-size-sm` | L2, L3 | Sender name, compact content |
| `--dss-font-size-md` | L2 | Texto principal |
| `--dss-font-weight-normal` | L2 | Peso base |
| `--dss-font-weight-semibold` | L2 | Nome do remetente |
| `--dss-line-height-md` | L2 | Altura de linha |
| `--dss-line-height-tight` | L2 | Altura de linha (metadata) |
| `--dss-radius-sm` | L2 | Bico da bolha |
| `--dss-radius-lg` | L2 | Bordas arredondadas da bolha |
| `--dss-radius-full` | L2 | Avatar circular |
| `--dss-border-width-thin` | L4 | Borda print/contrast |
| `--dss-border-width-md` | L2 | Focus ring, selected outline |
| `--dss-shadow-sm` | L2 | Sombra da bolha |
| `--dss-surface-default` | L2 | Fundo bolha recebida |
| `--dss-surface-dark` | L4 | Fundo dark mode (recebida) |
| `--dss-text-body` | L2, L4 | Cor de texto principal |
| `--dss-text-subtle` | L2 | Timestamp, sender name, status |
| `--dss-text-inverse` | L4 | Texto sobre dark mode |
| `--dss-gray-200` | L2 | Fundo bolha mine (padrão sem brand) |
| `--dss-gray-600` | L4 | Fundo mine dark mode |
| `--dss-feedback-error` | L2 | Cor status error |
| `--dss-focus-ring` | L2 | Focus visible |
| `--dss-opacity-disabled` | L2 | Opacidade desabilitado |
| `--dss-opacity-70` | L4 | Timestamp sobre brand primary |
| `--dss-duration-150` | L2 | Transição rápida |
| `--dss-duration-200` | L2 | Transição seleção |
| `--dss-duration-slowest` | L2 | Animação sending |
| `--dss-easing-standard` | L2 | Easing padrão |
| `--dss-easing-ease-in-out` | L2 | Easing animação |
| `--dss-hub-primary` | L4 | Bolha mine Hub |
| `--dss-hub-on-primary` | L4 | Texto sobre bolha Hub |
| `--dss-water-primary` | L4 | Bolha mine Water |
| `--dss-water-on-primary` | L4 | Texto sobre bolha Water |
| `--dss-waste-primary` | L4 | Bolha mine Waste |
| `--dss-waste-on-primary` | L4 | Texto sobre bolha Waste |

## CSS Classes

| Class | Description |
|-------|-------------|
| `.dss-chat-message` | Elemento raiz (`<article>`) |
| `.dss-chat-message--received` | Mensagem recebida (alinhamento esquerdo) |
| `.dss-chat-message--mine` | Mensagem enviada (alinhamento direito) |
| `.dss-chat-message--compact` | Modo compacto |
| `.dss-chat-message--selected` | Estado de seleção |
| `.dss-chat-message--disable` | Estado desabilitado |
| `.dss-chat-message--status-{status}` | Estado de entrega (`sending`, `sent`, `delivered`, `read`, `error`) |
| `.dss-chat-message__avatar-area` | Container do avatar |
| `.dss-chat-message__avatar-area--mine` | Avatar do lado direito (mensagem enviada) |
| `.dss-chat-message__main` | Container principal (nome + bolha + ações) |
| `.dss-chat-message__sender-name` | Nome do remetente |
| `.dss-chat-message__bubble` | Bolha da mensagem |
| `.dss-chat-message__content` | Área de conteúdo interno |
| `.dss-chat-message__text` | Parágrafo de texto (quando message prop usada) |
| `.dss-chat-message__meta` | Área de metadados (timestamp + status) |
| `.dss-chat-message__timestamp` | Timestamp (`<time>`) |
| `.dss-chat-message__status` | Container do ícone de status |
| `.dss-chat-message__status--{status}` | Modificador de cor por status |
| `.dss-chat-message__actions` | Área de ações contextuais |
| `.dss-chat-message__avatar` | Classe no DssAvatar interno |
| `.dss-chat-message__avatar-img` | Imagem do avatar |

## Exceções Arquiteturais Declaradas

| ID | Descrição | Justificativa |
|----|-----------|---------------|
| EXC-Arch-01 | Sem motor Quasar | `QChatMessage` é limitado demais: texto como array de strings, sem slots ricos, sem status icons, sem estados de entrega/leitura. Componente implementado como HTML semântico customizado. |
