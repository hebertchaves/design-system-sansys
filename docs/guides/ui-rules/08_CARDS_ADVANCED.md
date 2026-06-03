# Módulo 8: Cards (Aprofundado)

> **Status:** Normativo
> **Integração:** Grid Inspector (Figma) & MCP

Este módulo aprofunda as regras de composição para cards complexos da Fase 3, como o `DssDataCard` e suas especializações (ex: `DssCadrisCard`), focando em como gerenciar estados, paginação e ações em lote dentro de superfícies elevadas.

## 8.1. Estrutura do DssDataCard

O `DssDataCard` é o contêiner padrão para exibição de dados tabulares ou listas complexas. Ele encapsula a lógica de toolbar, abas, paginação e estados de carregamento.

- **✅ OBRIGATÓRIO:** Usar `DssDataCard` sempre que precisar exibir uma lista paginada de itens com ações globais (ex: Pesquisar, Filtrar, Atualizar).
- **✅ OBRIGATÓRIO:** A toolbar do `DssDataCard` deve conter o título (à esquerda) e as ações globais (à direita, no slot `toolbar-actions`).
- **✅ OBRIGATÓRIO:** Se houver paginação, ela deve ser renderizada no rodapé do card, usando o componente `DssPagination` (ou a prop `pagination` do `DssDataCard`).
- **❌ PROIBIDO:** Colocar paginação no topo do card ou fora dele. A paginação pertence ao rodapé da superfície que contém os dados.

## 8.2. Gerenciamento de Estados (Loading e Disabled)

Cards complexos frequentemente precisam bloquear interações enquanto buscam dados.

- **✅ OBRIGATÓRIO:** Usar a prop `loading` do `DssDataCard` para exibir skeletons ou spinners enquanto os dados são carregados. Isso deve desabilitar temporariamente as ações da toolbar.
- **✅ OBRIGATÓRIO:** Usar a prop `disabled` para bloquear completamente a interação com o card (ex: usuário sem permissão). Isso deve ser propagado para todos os componentes internos via `provide/inject` (ex: `DATA_CARD_DISABLED_KEY`).
- **❌ PROIBIDO:** Deixar botões de ação habilitados enquanto a tabela principal está em estado de `loading`.

## 8.3. Especializações (ex: DssCadrisCard)

Componentes como o `DssCadrisCard` são especializações do `DssDataCard` para domínios de negócio específicos.

- **✅ OBRIGATÓRIO:** Especializações devem herdar a estrutura visual do `DssDataCard` (toolbar, paginação, estados) para manter a consistência.
- **✅ OBRIGATÓRIO:** Filtros específicos do domínio (ex: select de "Documento" ou "Aterro") devem ser posicionados abaixo da toolbar ou em um painel expansível, nunca misturados com as ações globais da toolbar.
- **✅ OBRIGATÓRIO:** O botão principal de busca (ex: "Pesquisar") deve ficar visível e acessível próximo aos filtros.
- **❌ PROIBIDO:** Criar uma nova estrutura de card do zero para exibir dados tabulares. Sempre estenda ou componha a partir do `DssDataCard`.

## 8.4. Aninhamento de Cards

O aninhamento de cards deve ser evitado, mas quando necessário, regras estritas de elevação se aplicam.

- **✅ OBRIGATÓRIO:** Se um card precisar ser colocado dentro de outro (ex: um card de detalhes dentro de um `DssDataCard`), o card interno deve usar a variante `flat` ou `bordered` (sem sombra) para evitar confusão visual.
- **✅ OBRIGATÓRIO:** O padding do card interno deve ser menor que o padding do card externo (ver Módulo 0: Hierarquia de Espaçamento).
- **❌ PROIBIDO:** Aninhar cards com sombra (`elevated`) dentro de outros cards com sombra.

## 8.5. Validação no Grid Inspector

O Grid Inspector do Figma verificará automaticamente:
1. Se a paginação está posicionada no rodapé do `DssDataCard`.
2. Se as ações globais estão alinhadas à direita na toolbar.
3. Se não há aninhamento de cards com sombra (`elevated` dentro de `elevated`).
