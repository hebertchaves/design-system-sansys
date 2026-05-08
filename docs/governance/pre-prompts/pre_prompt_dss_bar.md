# Pré-prompt: DssBar

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
O `DssBar` é um componente interativo, similar a uma barra de navegação ou cabeçalho. Portanto, o `DssChip` serve como **Golden Reference** para padrões de interação, acessibilidade e estados, enquanto o `DssBadge` pode ser consultado para aspectos de exibição de informações não-interativas contidas na barra.

### Golden Context
O `DssBar` é utilizado para exibir informações contextuais, ações rápidas ou navegação primária em uma interface. Ele pode conter elementos como título, botões de ação, ícones e, opcionalmente, um campo de busca ou outros componentes interativos. Seu uso é fundamental para a organização e a usabilidade da aplicação, fornecendo um ponto de acesso consistente para funcionalidades importantes.

### Justificativa
A criação do `DssBar` visa padronizar a apresentação de barras de cabeçalho e navegação em todas as aplicações que utilizam o Design System. Isso garante consistência visual, comportamental e de acessibilidade, além de otimizar o desenvolvimento ao fornecer um componente reutilizável e bem definido. A integração com Vue.js/Quasar assegura a reatividade e a performance esperadas.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais
- **Acoplamento excessivo:** Risco de o `DssBar` se tornar um "componente monolítico" que tenta resolver muitos problemas, resultando em um acoplamento forte com a lógica da aplicação. Deve-se garantir que ele seja o mais agnóstico possível em relação à lógica de negócio.
- **Performance:** O `DssBar` pode conter múltiplos elementos interativos e reativos. A renderização excessiva ou a manipulação ineficiente do DOM podem impactar a performance, especialmente em dispositivos móveis ou com conexões lentas.
- **Flexibilidade vs. Padronização:** Encontrar o equilíbrio entre oferecer flexibilidade suficiente para diferentes casos de uso (ex: barra com busca, barra com menu, barra com ações) e manter a padronização visual e de comportamento do DSS.

### Gates
- **Revisão de API:** A API do `DssBar` deve ser revisada para garantir que seja intuitiva, extensível e que não exponha detalhes de implementação internos do Quasar.
- **Testes de Performance:** Realizar testes de performance rigorosos para garantir que o componente não cause gargalos na renderização da aplicação.
- **Testes de Acessibilidade:** Validação completa de acessibilidade (WCAG 2.1 AA) para todos os estados e interações do componente.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssBar` será construído sobre o componente `QToolbar` do Quasar. A API do DSS deve abstrair as propriedades e eventos do Quasar, expondo uma interface mais semântica e alinhada com o Design System.

| Propriedade Quasar (QToolbar) | Propriedade DSS (DssBar) | Tipo | Descrição | Notas |
|---|---|---|---|---|
| `dark` | `dark` | `Boolean` | Aplica o tema escuro. | Mapeamento direto. |
| `dense` | `dense` | `Boolean` | Torna a barra mais compacta. | Mapeamento direto. |
| `color` | `backgroundColor` | `String` | Cor de fundo da barra. | Deve aceitar tokens de cor do DSS (ex: `--dss-surface-default`). |
| `text-color` | `textColor` | `String` | Cor do texto e ícones. | Deve aceitar tokens de cor do DSS. |
| `inverted` | `inverted` | `Boolean` | Inverte as cores. | Considerar se é necessário ou se `backgroundColor` e `textColor` são suficientes. |
| `fixed` | `fixed` | `Boolean` | Fixa a barra no topo. | Mapeamento direto. |
| `float` | `float` | `Boolean` | Permite que a barra flutue. | Mapeamento direto. |
| `elevated` | `elevated` | `Boolean` | Adiciona sombra para elevação. | Mapeamento direto. |
| `v-slots` | `default`, `left`, `right` | `Slots` | Conteúdo da barra. | Abstrair slots do Quasar para slots nomeados do DSS. |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssBar` deve utilizar exclusivamente tokens de design do DSS para espaçamento, raio, cores e duração de transições. É proibido o uso de valores hardcoded ou tokens semânticos não definidos no DSS.

### Exemplos de Uso de Tokens:
- **Espaçamento interno (padding):** `--dss-spacing-4` (para padding geral), `--dss-spacing-2` (para espaçamento entre itens).
- **Raio de borda (border-radius):** `--dss-radius-md` (se a barra tiver cantos arredondados).
- **Cor de fundo:** `--dss-surface-default` (para o fundo padrão), `--dss-action-hub-surface` (para um fundo primário).
- **Cor do texto/ícones:** `--dss-text-on-surface`, `--dss-text-subtle`.
- **Duração de transições:** `--dss-duration-250` (para animações de hover ou clique).
- **Foco:** `outline: 2px solid white` (para anéis de foco).

### Regras de Ouro para Tokens:
- **Espaçamento:** Utilizar `--dss-spacing-1` a `--dss-spacing-96`.
- **Raio:** Utilizar `--dss-radius-sm`, `--dss-radius-md`, `--dss-radius-lg`, `--dss-radius-full`.
- **Duração:** Utilizar `--dss-duration-150`, `--dss-duration-200`, `--dss-duration-250`, `--dss-duration-300`.
- **Cores de Brand:** Utilizar `hub`, `water`, `waste` em vez de `hub`, `water`, `waste`.
- **NUNCA** inventar tokens com sufixos semânticos que não existem.

## 5. ACESSIBILIDADE E ESTADOS

O `DssBar` deve ser totalmente acessível, seguindo as diretrizes WCAG 2.1 AA. Isso inclui suporte a navegação por teclado, leitores de tela e contraste de cores adequado.

### Estados:
- **Padrão:** Estado inicial do componente.
- **Hover:** Quando o cursor do mouse está sobre elementos interativos dentro da barra (botões, links).
- **Focus:** Quando um elemento interativo dentro da barra recebe foco via teclado.
- **Active/Pressed:** Quando um elemento interativo é ativado (clicado ou pressionado).
- **Disabled:** Para elementos interativos desabilitados dentro da barra.
- **Fixed:** Quando a barra está fixada no topo da tela.
- **Elevated:** Quando a barra possui elevação (sombra).

### Considerações de Acessibilidade:
- **Semântica HTML:** Utilizar elementos HTML semânticos apropriados (ex: `<header>`, `<nav>`, `<button>`).
- **Atributos ARIA:** Fornecer atributos ARIA (`aria-label`, `aria-labelledby`, `role`) para melhorar a experiência de leitores de tela, especialmente para elementos complexos ou interativos.
- **Contraste de Cores:** Garantir que o contraste entre o texto/ícones e o fundo da barra atenda aos requisitos mínimos de acessibilidade.
- **Navegação por Teclado:** Todos os elementos interativos devem ser navegáveis e operáveis via teclado.

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências Internas do DSS:
- `DssButton`: Para botões de ação dentro da barra.
- `DssIcon`: Para ícones visuais.
- `DssInput`: Opcionalmente, para campos de busca.
- `DssMenu`: Opcionalmente, para menus de contexto ou dropdowns.

### Composição:
O `DssBar` é um componente de composição, permitindo que outros componentes do DSS sejam aninhados dentro dele para construir diferentes layouts e funcionalidades. Ele deve fornecer slots bem definidos para facilitar essa composição.

## 7. EXCEÇÕES PREVISTAS

- **Barras de ferramentas contextuais:** Para casos onde uma barra de ferramentas muito específica e temporária é necessária (ex: edição de texto), pode-se considerar a criação de um componente mais especializado ou o uso direto do `QToolbar` com estilização ad-hoc, se a complexidade de adaptação do `DssBar` for muito alta. No entanto, a preferência é sempre por estender o `DssBar`.
- **Layouts de página completos:** O `DssBar` é focado na barra superior. Para layouts de página que incluem sidebars, footers e outras regiões, o `DssLayout` deve ser utilizado como componente principal, que pode então incorporar o `DssBar`.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios
- **`dark` (Checkbox):** Alterna entre tema claro e escuro.
- **`dense` (Checkbox):** Ativa/desativa o modo compacto.
- **`backgroundColor` (Dropdown/Color Picker):** Seleciona a cor de fundo da barra (com opções de tokens DSS como `--dss-surface-default`, `--dss-surface-hub`, `--dss-surface-water`, `--dss-surface-waste`).
- **`textColor` (Dropdown/Color Picker):** Seleciona a cor do texto/ícones (com opções de tokens DSS como `--dss-text-on-surface`, `--dss-text-hub`, `--dss-text-water`, `--dss-text-waste`).
- **`fixed` (Checkbox):** Fixa a barra no topo.
- **`elevated` (Checkbox):** Adiciona elevação (sombra).
- **Conteúdo do Slot `default` (Textarea):** Permite inserir texto ou outros componentes (ex: `DssButton`, `DssIcon`) para visualização.
- **Conteúdo do Slot `left` (Textarea):** Permite inserir conteúdo no lado esquerdo da barra.
- **Conteúdo do Slot `right` (Textarea):** Permite inserir conteúdo no lado direito da barra.

### Composite Logic
O playground deve demonstrar a composição do `DssBar` com outros componentes do DSS. Exemplos concretos:
- Um `DssBar` contendo um `DssIcon` à esquerda, um título no centro e um `DssButton` à direita.
- Um `DssBar` com um `DssInput` (campo de busca) no slot `default`.
- Um `DssBar` fixo e elevado, com diferentes cores de fundo e texto, utilizando os tokens de brand `hub`, `water` e `waste`.

### Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Padrão | Visualização inicial do componente com as propriedades padrão. | Visual | Padrão (renderização inicial) |
| Fixed | Indicar se a barra está fixada ou não. | Visual | — |
| Elevated | Indicar se a barra possui elevação. | Visual | — |
| Hover/Focus/Active | Demonstrar os estados de interatividade dos elementos internos (ex: `DssButton` ou `DssIcon` aninhados). | Visual | Mouse over |
| Tokens CSS | Mostrar os valores CSS finais resultantes dos tokens DSS selecionados. | Visual | — |

---garantindo o uso correto de `--dss-spacing-4`, `--dss-text-subtle`, `--dss-action-hub`, `--dss-action-hub-surface` e `outline: 2px solid white`. |

---
*Fim do documento.*
