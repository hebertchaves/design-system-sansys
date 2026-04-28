# Módulo 7: Feedback & Status

> **Status:** Normativo
> **Integração:** Grid Inspector (Figma) & MCP

Este módulo define as regras para fornecer feedback visual ao usuário sobre o estado do sistema, usando componentes como `DssSpinner`, `DssBadge`, `DssChip` e padrões de Empty States.

## 7.1. Indicadores de Carregamento (DssSpinner)

O carregamento deve ser comunicado de forma clara, sem bloquear desnecessariamente a interface.

- **✅ OBRIGATÓRIO:** Usar `DssSpinner` (ou skeletons) quando uma operação demorar mais de 300ms.
- **✅ OBRIGATÓRIO:** O spinner deve ser centralizado no container onde o conteúdo será carregado (ex: dentro de um botão, card ou tabela).
- **✅ OBRIGATÓRIO:** Fornecer um `ariaLabel` descritivo para o spinner (ex: "Carregando lista de usuários").
- **❌ PROIBIDO:** Bloquear a tela inteira com um overlay de carregamento para operações locais ou não-críticas. O carregamento deve ser contextual (ex: apenas o botão fica em loading).

## 7.2. Badges e Chips (DssBadge, DssChip)

Usados para destacar status, contagens ou categorias.

- **✅ OBRIGATÓRIO:** Usar `DssBadge` para contagens numéricas (ex: notificações) ou status muito curtos (ex: "Novo").
- **✅ OBRIGATÓRIO:** Usar `DssChip` para categorias, tags ou filtros selecionados.
- **✅ OBRIGATÓRIO:** As cores devem seguir a semântica DSS (`--dss-feedback-success`, `--dss-feedback-warning`, `--dss-feedback-error`, `--dss-feedback-info`).
- **❌ PROIBIDO:** Usar `DssBadge` como elemento interativo principal. Para ações, use `DssButton` ou `DssChip` clicável.

## 7.3. Notificações e Alertas (Toasts, Banners)

Feedback sobre o resultado de ações ou avisos importantes do sistema.

- **✅ OBRIGATÓRIO:** Usar Toasts (notificações efêmeras) para feedback de sucesso após uma ação do usuário (ex: "Registro salvo com sucesso").
- **✅ OBRIGATÓRIO:** Usar Banners (alertas fixos no topo da página ou seção) para avisos críticos que exigem atenção (ex: "Sua assinatura expira em 3 dias").
- **✅ OBRIGATÓRIO:** Mensagens de erro devem ser claras, evitar jargão técnico e, se possível, sugerir uma solução.
- **❌ PROIBIDO:** Usar Toasts para mensagens de erro críticas que o usuário não pode perder. Toasts desaparecem sozinhos; erros críticos devem ser persistentes (Banners ou modais).

## 7.4. Estados Vazios (Empty States)

O que o usuário vê quando não há dados para exibir.

- **✅ OBRIGATÓRIO:** Todo estado vazio deve ter três elementos: um ícone ou ilustração (opcional, mas recomendado), um título claro (ex: "Nenhum documento encontrado") e uma descrição secundária.
- **✅ OBRIGATÓRIO:** Sempre que possível, incluir uma ação primária (Call to Action) para ajudar o usuário a sair do estado vazio (ex: botão "Criar Documento").
- **✅ OBRIGATÓRIO:** O estado vazio deve ser centralizado no container onde os dados apareceriam (ex: dentro do `DssDataCard`).
- **❌ PROIBIDO:** Exibir apenas uma tabela vazia ou uma tela em branco sem explicação.

## 7.5. Validação no Grid Inspector

O Grid Inspector do Figma verificará automaticamente:
1. Se as cores usadas em Badges e Chips correspondem aos tokens semânticos de feedback.
2. Se os estados vazios possuem título e, idealmente, uma ação primária.
3. Se os spinners estão centralizados e possuem tamanho adequado ao contexto.
