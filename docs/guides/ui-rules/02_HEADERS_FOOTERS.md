# Módulo 2: Headers, Footers & Toolbars

> **Status:** Normativo
> **Integração:** Grid Inspector (Figma) & MCP

Este módulo define as regras para a construção de áreas de navegação, cabeçalhos de página, rodapés e barras de ferramentas (toolbars) usando os componentes da Fase 2 (`DssHeader`, `DssFooter`, `DssToolbar`, `DssToolbarTitle`).

## 2.1. Regras de DssHeader e DssToolbar

O `DssHeader` é o container principal para navegação no topo da página, enquanto o `DssToolbar` é a faixa horizontal que organiza os elementos dentro dele.

- **✅ OBRIGATÓRIO:** O `DssHeader` deve sempre conter pelo menos um `DssToolbar`.
- **✅ OBRIGATÓRIO:** O título da página ou aplicação deve usar o componente `DssToolbarTitle` dentro do `DssToolbar`.
- **✅ OBRIGATÓRIO:** Ações globais (ex: perfil do usuário, notificações, menu hambúrguer) devem ser posicionadas à direita (ou à esquerda para o menu) usando `DssSpace` para empurrá-las.
- **❌ PROIBIDO:** Usar margens arbitrárias (`margin-left: 20px`) para separar botões na toolbar. Use o gap nativo do flexbox ou o componente `DssSpace`.
- **❌ PROIBIDO:** Colocar formulários complexos ou grandes blocos de texto dentro do `DssToolbar`. Ele é reservado para navegação, títulos e ações rápidas.

## 2.2. Hierarquia de Títulos e Ações

A hierarquia visual dentro de headers e toolbars deve ser clara e seguir os tokens de tipografia.

- **✅ OBRIGATÓRIO:** O título principal (`DssToolbarTitle`) deve usar a tipografia `--dss-heading-6` ou `--dss-heading-5` (dependendo do contexto).
- **✅ OBRIGATÓRIO:** Subtítulos ou badges de status devem ser posicionados ao lado ou abaixo do título, usando `--dss-text-sm` e `--dss-text-subtle`.
- **✅ OBRIGATÓRIO:** Botões de ação primária (ex: "Salvar", "Novo") devem usar a variante `unelevated` ou `flat` no header, reservando o botão `elevated` para ações de página (fora do header).
- **❌ PROIBIDO:** Ter mais de um botão primário (`color="primary"`) no mesmo `DssToolbar`. Ações secundárias devem usar `flat` ou `outline`.

## 2.3. Regras de DssFooter

O `DssFooter` é a área fixada na parte inferior da tela ou do layout, geralmente usada para ações de formulário ou informações de rodapé.

- **✅ OBRIGATÓRIO:** Em modais ou formulários longos, as ações de confirmação ("Salvar", "Cancelar") devem estar dentro de um `DssFooter` ou de uma seção de ações fixada na parte inferior.
- **✅ OBRIGATÓRIO:** O alinhamento padrão para botões de ação no footer é à direita (usando `DssSpace` à esquerda). A ordem deve ser: [Ações Secundárias] -> [Ação Primária]. Ex: "Cancelar" (flat) -> "Salvar" (unelevated).
- **✅ OBRIGATÓRIO:** O padding interno do footer deve ser `--dss-spacing-3` (12px) ou `--dss-spacing-4` (16px), garantindo que os botões fiquem centralizados verticalmente.
- **❌ PROIBIDO:** Colocar navegação principal (links de menu) no `DssFooter` em aplicações desktop. O footer deve ser reservado para ações contextuais ou informações legais/copyright.

## 2.4. Comportamento Sticky e Scroll

Headers e Footers frequentemente precisam permanecer visíveis durante o scroll.

- **✅ OBRIGATÓRIO:** Ao usar `DssHeader` ou `DssFooter` com comportamento `elevated` (sombra), a sombra só deve ser visível quando o conteúdo rolar por baixo deles (comportamento de scroll).
- **✅ OBRIGATÓRIO:** Usar o componente `DssPageSticky` para fixar elementos flutuantes (ex: FAB - Floating Action Button) na tela, respeitando as margens de segurança (`--dss-spacing-4` das bordas).
- **❌ PROIBIDO:** Fixar múltiplos toolbars empilhados que ocupem mais de 20% da altura da tela (viewport), pois isso prejudica a área útil de conteúdo, especialmente em mobile.

## 2.5. Validação no Grid Inspector

O Grid Inspector do Figma verificará automaticamente:
1. Se a altura do `DssToolbar` respeita os padrões (ex: 50px para dense, 64px para normal).
2. Se o alinhamento vertical dos itens dentro da toolbar está centralizado.
3. Se a ordem e o espaçamento dos botões de ação no footer seguem o padrão (Secundário -> Primário, alinhados à direita).
