# Módulo 5: Tabelas & Listas

> **Status:** Normativo
> **Integração:** Grid Inspector (Figma) & MCP

Este módulo define as regras para a exibição de dados tabulares e listas usando os componentes da Fase 2 (`DssList`, `DssItem`, `DssDataCard`) e padrões de tabela.

## 5.1. Escolha entre Tabela e Lista

A decisão entre usar uma tabela tradicional ou uma lista de cards (`DssDataCard`) depende da densidade de dados e do dispositivo.

- **✅ OBRIGATÓRIO:** Usar `DssDataCard` ou `DssList` para visualização em dispositivos móveis (`xs` e `sm`), pois tabelas tradicionais quebram a responsividade.
- **✅ OBRIGATÓRIO:** Usar tabelas tradicionais (com cabeçalhos de coluna) apenas em telas maiores (`md` e acima) quando a comparação de dados entre linhas for essencial.
- **✅ OBRIGATÓRIO:** Ocultar colunas menos importantes em telas menores se o uso de tabela for estritamente necessário.
- **❌ PROIBIDO:** Forçar rolagem horizontal em tabelas em dispositivos móveis sem um indicador visual claro de que há mais conteúdo.

## 5.2. Densidade e Espaçamento

A densidade da informação deve ser ajustada ao contexto de uso.

- **✅ OBRIGATÓRIO:** Usar a variante `dense` em tabelas e listas quando o volume de dados for muito grande e a tela for pequena.
- **✅ OBRIGATÓRIO:** O padding interno das células da tabela deve ser `--dss-spacing-2` (8px) ou `--dss-spacing-3` (12px).
- **✅ OBRIGATÓRIO:** O espaçamento entre itens de uma `DssList` deve ser `--dss-spacing-2` (8px) ou `--dss-spacing-3` (12px).
- **❌ PROIBIDO:** Remover o padding das células da tabela para "fazer caber mais dados". Isso prejudica a legibilidade e o touch target.

## 5.3. Ações em Lote e Paginação

Ações que afetam múltiplos itens devem ser claras e acessíveis.

- **✅ OBRIGATÓRIO:** Se a tabela ou lista suportar seleção múltipla, deve haver uma barra de ações em lote visível (geralmente no topo ou fixada na parte inferior).
- **✅ OBRIGATÓRIO:** A paginação (`DssPagination`) deve estar sempre visível no rodapé da tabela ou lista, alinhada à direita ou centralizada.
- **✅ OBRIGATÓRIO:** O número total de itens e a página atual devem ser claramente indicados.
- **❌ PROIBIDO:** Usar rolagem infinita (`DssInfiniteScroll`) em tabelas complexas onde o usuário precisa acessar o rodapé da página. A rolagem infinita é mais adequada para feeds de conteúdo (ex: redes sociais, logs).

## 5.4. Estados Vazios e Loading

O feedback visual é crucial quando não há dados ou quando eles estão sendo carregados.

- **✅ OBRIGATÓRIO:** Exibir um estado vazio claro (Empty State) quando a tabela ou lista não tiver itens. O estado vazio deve incluir um ícone, uma mensagem explicativa e, se possível, uma ação primária (ex: "Criar Novo").
- **✅ OBRIGATÓRIO:** Exibir um indicador de carregamento (`DssSpinner` ou Skeleton) enquanto os dados estão sendo buscados.
- **❌ PROIBIDO:** Deixar a tabela ou lista em branco sem nenhum feedback visual durante o carregamento ou quando não houver dados.

## 5.5. Validação no Grid Inspector

O Grid Inspector do Figma verificará automaticamente:
1. Se o padding das células da tabela e dos itens da lista corresponde aos tokens permitidos (8px ou 12px).
2. Se a paginação está alinhada corretamente no rodapé.
3. Se os estados vazios e de carregamento estão previstos no design.
