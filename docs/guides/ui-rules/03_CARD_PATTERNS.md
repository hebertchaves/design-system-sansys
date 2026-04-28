# Módulo 3: Card Patterns & Superfícies

> **Status:** Normativo
> **Integração:** Grid Inspector (Figma) & MCP

Este módulo define as regras para a construção de cards, painéis e modais usando os componentes da Fase 2 (`DssCard`, `DssDialog`, `DssDrawer`).

## 3.1. Regras de DssCard

O `DssCard` é o container principal para agrupar informações relacionadas, como detalhes de um registro, formulários curtos ou resumos de dados.

- **✅ OBRIGATÓRIO:** Todo card deve ter um padding interno de `--dss-spacing-4` (16px) ou `--dss-spacing-6` (24px) para separar o conteúdo das bordas.
- **✅ OBRIGATÓRIO:** O título do card deve usar a tipografia `--dss-heading-6` ou `--dss-heading-5` e estar posicionado no topo, preferencialmente dentro de um `DssCardSection` ou `header`.
- **✅ OBRIGATÓRIO:** Ações relacionadas ao conteúdo do card (ex: "Editar", "Excluir") devem ser posicionadas no rodapé do card, dentro de um `DssCardActions` ou `footer`, alinhadas à direita.
- **❌ PROIBIDO:** Usar cards aninhados (um card dentro de outro card) sem necessidade. Isso cria uma hierarquia visual confusa e excesso de bordas/sombras. Use divisores (`DssSeparator`) ou fundos sutis (`--dss-surface-muted`) para agrupar informações dentro de um card.
- **❌ PROIBIDO:** Colocar muito conteúdo em um único card, forçando o usuário a rolar infinitamente. Divida o conteúdo em abas (`DssTabs`) ou múltiplos cards menores.

## 3.2. Elevação e Sombras (Shadows)

A elevação (z-index e box-shadow) é usada para indicar a hierarquia e a interatividade das superfícies.

- **✅ OBRIGATÓRIO:** Cards estáticos (que não são clicáveis) devem usar a elevação padrão (`--dss-shadow-1` ou borda sutil).
- **✅ OBRIGATÓRIO:** Cards interativos (que funcionam como botões ou links) devem aumentar a elevação no estado de hover (`--dss-shadow-2` ou `--dss-shadow-3`) para indicar que são clicáveis.
- **✅ OBRIGATÓRIO:** Modais (`DssDialog`) e Drawers (`DssDrawer`) devem usar elevações mais altas (`--dss-shadow-4` ou superior) para se destacarem do conteúdo da página.
- **❌ PROIBIDO:** Usar sombras excessivas ou coloridas que não estejam definidas nos tokens `--dss-shadow-*`.
- **❌ PROIBIDO:** Aplicar sombras em elementos que já estão dentro de um container elevado (ex: um botão com sombra dentro de um modal com sombra), a menos que seja estritamente necessário para contraste.

## 3.3. Regras de DssDialog (Modais)

O `DssDialog` é usado para interrupções temporárias no fluxo do usuário, exigindo atenção ou ação imediata.

- **✅ OBRIGATÓRIO:** Todo modal deve ter um título claro e descritivo no topo.
- **✅ OBRIGATÓRIO:** O modal deve poder ser fechado clicando fora dele (backdrop) ou pressionando a tecla `Esc`, a menos que seja uma ação crítica e irreversível (ex: confirmação de exclusão).
- **✅ OBRIGATÓRIO:** As ações do modal devem estar no rodapé, alinhadas à direita, com a ação primária (ex: "Confirmar") à direita da ação secundária (ex: "Cancelar").
- **❌ PROIBIDO:** Colocar formulários muito longos ou complexos dentro de um modal. Se o formulário exigir rolagem extensa, ele deve ser uma página separada ou um Drawer lateral.
- **❌ PROIBIDO:** Abrir um modal sobre outro modal (modais aninhados). Isso quebra a experiência do usuário e a acessibilidade.

## 3.4. Regras de DssDrawer (Painéis Laterais)

O `DssDrawer` é usado para navegação principal, filtros complexos ou detalhes de registros que não devem interromper o contexto da página principal.

- **✅ OBRIGATÓRIO:** O Drawer deve ter uma largura consistente (ex: 300px ou 400px) e não deve ocupar mais de 50% da tela em desktop.
- **✅ OBRIGATÓRIO:** Em mobile, o Drawer deve ocupar 100% da largura da tela ou se comportar como um modal (overlay).
- **✅ OBRIGATÓRIO:** O conteúdo do Drawer deve ser rolável independentemente do conteúdo da página principal.
- **❌ PROIBIDO:** Usar o Drawer para ações rápidas ou confirmações simples. Para isso, use um `DssDialog` ou um `DssTooltip`/`DssBadge`.

## 3.5. Validação no Grid Inspector

O Grid Inspector do Figma verificará automaticamente:
1. Se o padding interno dos cards respeita os tokens `--dss-spacing-*`.
2. Se a elevação (sombra) aplicada aos cards e modais corresponde aos tokens `--dss-shadow-*`.
3. Se a ordem e o alinhamento dos botões de ação nos rodapés de cards e modais seguem o padrão (Secundário -> Primário, alinhados à direita).
