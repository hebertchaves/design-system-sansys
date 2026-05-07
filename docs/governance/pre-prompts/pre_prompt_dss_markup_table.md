# Pré-prompt: DssMarkupTable

## 1. CLASSIFICAÇÃO E CONTEXTO
### Golden Reference
DssChip

### Golden Context
O DssMarkupTable é um componente de exibição de dados tabulares, projetado para apresentar informações complexas de forma organizada e legível. Ele suporta funcionalidades essenciais como ordenação, paginação e seleção, tornando-o versátil para diversas aplicações que exigem manipulação e visualização de grandes volumes de dados.

### Justificativa
A necessidade de um componente de tabela robusto e padronizado é fundamental para garantir a consistência na apresentação de dados em todo o sistema. O DssMarkupTable visa encapsular a lógica de exibição e interação com dados tabulares, promovendo a reutilização, a manutenção simplificada e a adesão aos princípios de design do DSS.

## 2. RISCOS ARQUITETURAIS E GATES
- **Performance com grandes volumes de dados**: Garantir que o componente mantenha alta performance ao renderizar milhares de linhas, possivelmente com virtualização de linhas.
- **Customização flexível**: Equilibrar a padronização do DSS com a necessidade de customização de colunas, células e cabeçalhos.
- **Integração com APIs de dados**: Definir uma interface clara para a integração com diferentes fontes de dados (local, remoto, assíncrono).
- **Acessibilidade complexa**: Garantir que todas as funcionalidades interativas (ordenação, paginação, seleção) sejam totalmente acessíveis.

## 3. MAPEAMENTO DE API (QUASAR → DSS)
Considerando um componente de tabela Quasar (ex: `QTable`):

| Funcionalidade Quasar | Propriedade/Slot/Evento Quasar | Equivalente DSS (Proposta) |
| :-------------------- | :----------------------------- | :------------------------- |
| Dados                 | `rows`                         | `data`                     |
| Colunas               | `columns`                      | `columns`                  |
| Paginação             | `pagination`, `onUpdate:pagination` | `pagination`, `onPageChange` |
| Ordenação             | `sortBy`, `sortOrder`, `onRequest` | `sortBy`, `sortOrder`, `onSort` |
| Seleção               | `selection`, `selected`, `onUpdate:selected` | `selection`, `selectedItems`, `onSelectionChange` |
| Carregamento          | `loading`                      | `isLoading`                |
| Slots de Célula/Cabeçalho | `body-cell-[name]`, `header-cell-[name]` | `cell-[name]`, `header-[name]` |
| Densidade             | `dense`                        | `density` (valores: `compact`, `standard`, `comfortable`) |

## 4. GOVERNANÇA DE TOKENS E CSS
O DssMarkupTable deve utilizar exclusivamente os tokens de design do DSS para espaçamento, raio, cores e tipografia. Exemplos de uso:

- **Espaçamento**: `--dss-spacing-4` (para padding interno de células), `--dss-spacing-8` (para espaçamento entre elementos da paginação).
- **Raio**: `--dss-radius-sm` (para bordas de elementos interativos), `--dss-radius-md` (para o contorno da tabela).
- **Cores**: `--dss-surface-default` (para o fundo da tabela), `--dss-text-primary` (para texto principal).
- **Duração**: `--dss-duration-250` (para transições de hover ou foco).

**Proibido**: Utilizar valores hardcoded ou tokens semânticos não existentes no DSS (ex: `--dss-padding-md`, `--dss-table-border`).

## 5. ACESSIBILIDADE E ESTADOS
### Acessibilidade
- **Semântica HTML**: Utilização de `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` com atributos `scope` apropriados.
- **Navegação por teclado**: Suporte completo para navegação e interação com a tabela (ordenação, paginação, seleção) via teclado.
- **ARIA Attributes**: Implementação de `aria-label`, `aria-describedby`, `aria-sort`, `aria-selected` conforme necessário para leitores de tela.
- **Foco visível**: Indicação clara do estado de foco para elementos interativos.

### Estados
- **Padrão**: Tabela com dados exibidos normalmente.
- **Vazio**: Tabela sem dados, exibindo uma mensagem de 