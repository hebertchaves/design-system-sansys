# Módulo 6: Navegação & Estrutura

> **Status:** Normativo
> **Integração:** Grid Inspector (Figma) & MCP

Este módulo define as regras para a construção de fluxos de navegação e estruturação de conteúdo usando os componentes `DssTabs`, `DssBreadcrumbs`, `DssStepper` e `DssMenu`.

## 6.1. Navegação em Abas (DssTabs)

As abas são usadas para alternar entre visualizações de um mesmo contexto sem sair da página.

- **✅ OBRIGATÓRIO:** Usar `DssTabs` apenas quando o conteúdo das abas for mutuamente exclusivo e pertencer ao mesmo nível hierárquico.
- **✅ OBRIGATÓRIO:** Em telas mobile (`xs`), se houver muitas abas, o componente deve permitir rolagem horizontal (comportamento padrão) em vez de empilhar as abas verticalmente.
- **✅ OBRIGATÓRIO:** O conteúdo de cada aba deve estar contido em um `DssTabPanel` dentro de um `DssTabPanels`.
- **❌ PROIBIDO:** Usar abas para navegação principal do sistema (isso é papel do `DssDrawer` ou `DssHeader`).
- **❌ PROIBIDO:** Aninhar `DssTabs` dentro de outro `DssTabs`. Isso confunde o usuário e quebra a hierarquia visual.

## 6.2. Trilhas de Navegação (DssBreadcrumbs)

Os breadcrumbs mostram a localização atual do usuário na hierarquia do sistema.

- **✅ OBRIGATÓRIO:** Exibir breadcrumbs no topo da página (geralmente abaixo do `DssHeader` ou dentro de um `DssToolbar`) quando a página estiver a 3 ou mais níveis de profundidade da raiz.
- **✅ OBRIGATÓRIO:** O último item do breadcrumb (a página atual) não deve ser um link clicável e deve ter peso visual maior (`--dss-font-weight-semibold`).
- **✅ OBRIGATÓRIO:** Usar apenas instâncias de `DssBreadcrumbsEl` dentro do `DssBreadcrumbs`.
- **❌ PROIBIDO:** Usar breadcrumbs em modais (`DssDialog`) ou painéis laterais (`DssDrawer`).

## 6.3. Fluxos em Etapas (DssStepper)

O stepper guia o usuário através de um processo linear e sequencial.

- **✅ OBRIGATÓRIO:** Usar `DssStepper` para formulários complexos ou processos de configuração que exigem mais de 3 etapas.
- **✅ OBRIGATÓRIO:** Fornecer feedback claro de validação antes de permitir que o usuário avance para a próxima etapa.
- **✅ OBRIGATÓRIO:** Em telas mobile (`xs`), considerar o uso do layout vertical (`vertical="true"`) se os títulos das etapas forem longos.
- **❌ PROIBIDO:** Usar o stepper para navegação não-linear (onde o usuário pode pular etapas aleatoriamente). Para isso, use `DssTabs`.

## 6.4. Menus Contextuais (DssMenu)

Menus exibem listas de ações ou opções temporárias ancoradas a um elemento.

- **✅ OBRIGATÓRIO:** Ancorar o `DssMenu` a um elemento interativo claro (ex: `DssButton` com ícone de "mais opções" ou avatar do usuário).
- **✅ OBRIGATÓRIO:** Agrupar ações relacionadas dentro do menu usando `DssSeparator`.
- **✅ OBRIGATÓRIO:** Ações destrutivas (ex: "Excluir") devem ficar no final do menu e, idealmente, usar a cor `--dss-feedback-error`.
- **❌ PROIBIDO:** Colocar formulários complexos ou navegação principal dentro de um `DssMenu`.

## 6.5. Validação no Grid Inspector

O Grid Inspector do Figma verificará automaticamente:
1. Se não há aninhamento de `DssTabs` (abas dentro de abas).
2. Se o último item do `DssBreadcrumbs` está visualmente destacado e sem link.
3. Se o `DssMenu` está ancorado a um elemento com touch target adequado (mínimo 44x44px).
