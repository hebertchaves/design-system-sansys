# Pré-prompt de Criação de Componente DSS: DssHeader

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente. A estrita observância destas diretrizes é fundamental para garantir a integridade do Design System Sansys (DSS).

## 1. Classificação e Contexto

- **Nome do Componente:** `DssHeader`
- **Família:** Superfícies e Layout
- **Nível de Composição:** Nível 3 (Composição de Segundo Grau)
- **Golden Reference:** `DssBadge` (como referência de governança para componentes não-interativos, garantindo que a ausência de estados de interação seja rigorosamente mantida)
- **Golden Context:** `DssLayout` (container pai futuro, Nível 4, responsável por orquestrar a estrutura macro da aplicação)
- **Componente Quasar Base:** `QHeader`
- **Dependência Direta:** `DssToolbar` (Nível 1, responsável por abrigar os elementos de navegação e ações)

**Justificativa da Fase 2:** O `DssHeader` atua como o container superior de layout de página, sendo uma peça central na arquitetura de navegação da aplicação. Como componente de Nível 3, ele orquestra componentes de Nível 1 (especialmente o `DssToolbar`) e interage diretamente com o sistema de layout do Quasar (`QLayout`). A sua construção exige atenção rigorosa às regras de layout, garantindo que o cabeçalho se comporte de maneira previsível em diferentes resoluções, dispositivos e contextos de uso, sem violar as diretrizes de design system estabelecidas. Ele não deve conter lógica de negócio, mas sim fornecer a estrutura visual e de posicionamento adequada.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Injeção de Layout e Z-Index
O `QHeader` nativo do Quasar possui um comportamento complexo: ele injeta variáveis CSS no `QLayout` pai para calcular o offset do conteúdo da página (garantindo que o conteúdo não fique escondido atrás do header) e gerencia seu próprio `z-index` para ficar sobreposto ao conteúdo rolado. O risco arquitetural primário é que a sobrescrita indevida de estilos quebre a matemática de layout do Quasar ou cause problemas de empilhamento (z-index) com modais, drawers, tooltips e menus suspensos.
**Mitigação:** O `DssHeader` **não deve, sob nenhuma circunstância,** alterar o `z-index` nativo nem as propriedades de posicionamento (`position: fixed`, `position: absolute`, `top`, `left`, `right`) aplicadas pelo Quasar. As customizações devem se restringir estritamente a bordas, sombras (elevation) e cores de fundo, garantindo que a integridade estrutural do layout seja mantida intacta e delegando o controle de posicionamento ao framework base.

### 2.2. Gate de Responsabilidade v2.4
O `DssHeader` é classificado como um **container estrutural de layout 100% não-interativo**. Isso significa que ele não possui, e não deve implementar, estados de `:hover`, `:focus` ou `:active`. Sua responsabilidade única e exclusiva é ancorar o conteúdo no topo da página e gerenciar a elevação visual (sombra ou borda) em relação ao conteúdo rolado. Qualquer interatividade (como cliques, navegação, abertura de menus) deve ser delegada aos componentes filhos, como botões, links ou menus dentro do `DssToolbar`.

### 2.3. Gate de Composição v2.4
O componente deve ser implementado como um wrapper direto e transparente do `<q-header>`. O slot `default` é destinado **exclusivamente** a componentes `DssToolbar` (ou `DssTabs` em cenários específicos de navegação global). O uso de HTML nativo (como `<div>`, `<span>`, `<header>`) ou texto solto diretamente no `DssHeader` viola frontalmente a governança de Nível 3. O encapsulamento rigoroso garante que a estrutura do cabeçalho permaneça consistente em toda a aplicação e que as atualizações do design system sejam propagadas sem quebras visuais.

## 3. Mapeamento de API (Props e Eventos)

A API do `DssHeader` deve ser enxuta e focada em suas responsabilidades estruturais.

### 3.1. Props Expostas (Permitidas)
- `elevated` (Boolean, default: false) - Aplica a sombra padrão de elevação do DSS para destacar o header do conteúdo da página. Ideal para layouts onde o header precisa se destacar claramente do fundo, especialmente quando o fundo da página e do header possuem a mesma cor.
- `bordered` (Boolean, default: false) - Aplica uma borda inferior sutil em vez de sombra. Esta é uma alternativa ao `elevated` para layouts mais flat e minimalistas, proporcionando uma separação visual limpa sem a profundidade da sombra.
- `reveal` (Boolean, default: false) - Permite que o header se esconda automaticamente ao rolar a página para baixo e reapareça ao rolar para cima. Este comportamento nativo do Quasar é repassado via `$attrs` e é altamente recomendado para melhorar a experiência do usuário em dispositivos móveis, maximizando o espaço de leitura disponível.
- `height-hint` (String | Number, default: '50') - Dica de altura para o layout, repassada ao Quasar para otimização de renderização inicial. Ajuda a evitar saltos de layout (layout shifts) durante o carregamento da página.

### 3.2. Props Bloqueadas (Governança DSS)
- `class` / `style` (internas do Quasar) - O componente deve aceitar classes e estilos via `$attrs` normalmente para flexibilidade em casos extremos, mas não deve expor props específicas para isso, mantendo a API limpa e focada nas necessidades de negócio.
- Props de cor nativas do Quasar (`color`, `bg-color`, `text-color`) - A cor deve ser gerenciada exclusivamente através dos tokens do DSS e não pelas props de cor do Quasar. Isso garante a consistência visual e evita a fragmentação do design system.

### 3.3. Eventos Expostos
- `@reveal` - Emitido quando o estado de revelação do header muda (se a prop `reveal` estiver ativa). O payload deve indicar se o header está atualmente visível ou oculto. Este evento é repassado diretamente do componente base e pode ser útil para sincronizar outras partes da interface com a visibilidade do cabeçalho.

## 4. Governança de Tokens e CSS

O `DssHeader` deve utilizar rigorosamente os seguintes tokens de design system, garantindo alinhamento perfeito com a identidade visual da Sansys:

- **Elevação (Elevated):** Quando a prop `elevated` for verdadeira, aplicar `--dss-shadow-2` (sombra padrão para headers e navbars). Esta sombra proporciona a profundidade necessária sem ser excessivamente intrusiva.
- **Borda (Bordered):** Quando a prop `bordered` for verdadeira, aplicar `--dss-border-width-sm` solid `--dss-border-subtle` na borda inferior (`border-bottom`). A borda deve ser sutil, servindo apenas como um delimitador visual.
- **Cor de Fundo:** O `QHeader` nativo aplica a cor primária do Quasar por padrão. O `DssHeader` deve sobrescrever esse comportamento para utilizar `--dss-surface-base` (fundo branco ou escuro padrão, dependendo do tema), delegando a responsabilidade de cor de marca (brand) para o `DssToolbar` interno.
- **Espaçamento Interno:** O espaçamento deve ser gerenciado pelos componentes filhos (`DssToolbar`). No entanto, caso seja estritamente necessário algum ajuste de padding no próprio header em cenários específicos, deve-se utilizar `--dss-spacing-4` (e **nunca** o token fantasma `--dss-spacing-4`).
- **Cor do Texto:** A cor do texto padrão deve herdar de `--dss-text-base`, com variações sutis utilizando `--dss-text-subtle` (e **nunca** o token fantasma `--dss-text-subtle`).
- **Ações e Destaques:** Caso o header possua elementos de destaque próprios (o que é raro, pois deve delegar ao toolbar), deve utilizar `--dss-action-hub` (e **nunca** `--dss-action-hub`) e `--dss-action-hub-surface` (e **nunca** `--dss-action-hub-surface`).
- **Foco:** O `DssHeader` não deve gerenciar foco. Seus filhos gerenciarão seus próprios anéis de foco (ex: `outline: 2px solid white` em fundos escuros, evitando terminantemente o uso do token fantasma `outline: 2px solid white`).

## 5. Acessibilidade e Estados

A acessibilidade é um pilar fundamental do DSS e deve ser tratada com máxima prioridade.

- **Role e Semântica:** O `QHeader` nativamente recebe `role="banner"`. O `DssHeader` deve preservar essa semântica, que é a correta para cabeçalhos de página (landmarks). Isso é crucial para que leitores de tela e tecnologias de navegação assistiva identifiquem corretamente a região do cabeçalho.
- **Aria-labels:** Se o header contiver navegação principal, deve-se garantir que as regiões de navegação internas (dentro do `DssToolbar`) possuam atributos `aria-label` apropriados e descritivos.
- **Estados aplicáveis:** Os únicos estados visuais aplicáveis ao container são `elevated` e `bordered`. Nenhum estado de interação (`hover`, `focus`, `active`, `disabled`) aplica-se ao container em si, pois ele é estritamente estrutural.
- **Contraste:** A combinação de `--dss-surface-base` com o texto interno deve sempre respeitar as diretrizes de contraste da WCAG (mínimo de 4.5:1 para texto normal).

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssHeader.example.vue` deve cobrir exaustivamente os seguintes cenários para garantir a correta implementação, documentação e testes visuais:

1. **Básico (Flat):** Header simples contendo um `DssToolbar` com título. Este é o caso de uso mais comum e deve servir como base de comparação para os demais.
2. **Elevated:** Header com a prop `elevated` ativa (com sombra). Demonstra a separação visual do conteúdo através de profundidade, essencial para páginas com muito conteúdo rolável.
3. **Bordered:** Header com a prop `bordered` ativa (com borda inferior). Demonstra a separação visual através de linhas, ideal para temas mais limpos e interfaces densas em dados.
4. **Com Brand Hub:** Header contendo um `DssToolbar` com a prop `brand="hub"`. Demonstra que a cor de marca vem do toolbar, não do header, e valida a integração visual.
5. **Com Brand Water:** Header contendo um `DssToolbar` com a prop `brand="water"`. Valida a aplicação da paleta de cores específica do domínio de água.
6. **Com Brand Waste:** Header contendo um `DssToolbar` com a prop `brand="waste"`. Valida a aplicação da paleta de cores específica do domínio de resíduos.
7. **Com Múltiplos Toolbars:** Header contendo dois `DssToolbar` empilhados (ex: um superior para ações globais do sistema, outro inferior para navegação específica da seção atual). Demonstra a capacidade de composição e empilhamento do componente.
8. **Comportamento Reveal:** Header com a prop `reveal` ativa, demonstrando o comportamento de ocultar/exibir ao rolar a página. Requer um container com conteúdo suficiente para permitir a rolagem.

> **Nota Crítica para o Exemplo:** Como o `DssLayout` (Nível 4) ainda não existe na biblioteca, os exemplos do `DssHeader` devem ser encapsulados em um `<q-layout view="hHh lpR fFf" style="min-height: 400px">` nativo temporariamente. Isso é estritamente necessário para que o header renderize corretamente no Storybook e no Playground, permitindo a validação visual.

## 7. Exceções aos Gates v2.4

### EXC-01: Uso de QLayout no Arquivo de Exemplo
- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (Proibição de componentes Quasar no template).
- **Justificativa:** O `DssHeader` requer um contexto de layout do Quasar para funcionar corretamente (cálculo de elevação, posicionamento fixo, injeção de variáveis CSS). Como o `DssLayout` (Nível 4) ainda não foi construído, é estritamente necessário usar o `<q-layout>` nativo **apenas e exclusivamente no arquivo `DssHeader.example.vue`** para fins de demonstração e testes. O código fonte do componente em si (`DssHeader.ts.vue`) permanece 100% aderente aos gates e não deve conter o `q-layout`.

## 8. Superfície de Playground

A configuração do Playground no Storybook é essencial para permitir que os desenvolvedores, designers e QA testem o componente interativamente em diversos cenários.

### 8.1. Controles Obrigatórios

Os seguintes controles devem ser expostos de forma clara na interface do Storybook:

- **`elevated`**: Controle do tipo `boolean`. Permite alternar a sombra de elevação do header em tempo real.
- **`bordered`**: Controle do tipo `boolean`. Permite alternar a borda inferior do header em tempo real.
- **`reveal`**: Controle do tipo `boolean`. Permite ativar ou desativar o comportamento de ocultação ao rolar a página.
- **`brand` (injetado no DssToolbar interno)**: Controle do tipo `select` com as opções `hub`, `water`, `waste`. Permite visualizar como o header se comporta com diferentes identidades visuais aplicadas ao seu conteúdo interno.

### 8.2. Composite Logic (Concreta)

A lógica de composição no Playground deve refletir cenários reais e complexos de uso:

- **Resolução de Conflitos Visuais:** Se `elevated` e `bordered` forem ativados simultaneamente pelo usuário no Playground, o componente deve priorizar a exibição de um deles ou combinar de forma harmoniosa (geralmente, a sombra `elevated` tem precedência visual sobre a borda). O Playground deve permitir essa combinação para validar o comportamento e garantir que não haja quebras visuais.
- **Injeção Dinâmica de Conteúdo:** O Playground deve injetar um `DssToolbar` padrão no slot `default` do `DssHeader`. Este `DssToolbar` injetado deve ser reativo ao controle de `brand` (`hub`, `water`, `waste`), atualizando sua cor de fundo dinamicamente para demonstrar a delegação de responsabilidade de cor.
- **Simulação de Rolagem Realista:** Para testar adequadamente a prop `reveal`, o Playground deve envolver o `DssHeader` em um container com um `q-page-container` e uma `q-page` contendo conteúdo rolável extenso (ex: múltiplos parágrafos de texto fictício ou uma lista longa). Isso permitirá que o usuário role a visualização e observe o header desaparecendo e reaparecendo conforme o esperado.

### 8.3. Estados a Expor

A tabela abaixo define os estados que devem ser rigorosamente documentados e testáveis no Playground, garantindo cobertura completa das variações do componente:

| Estado | Descrição | Props/Configuração |
| :--- | :--- | :--- |
| **Padrão (Flat)** | Header sem elevação ou borda, fundindo-se com o fundo da página se tiverem a mesma cor. Ideal para layouts contínuos. | `elevated: false`, `bordered: false` |
| **Elevado** | Header com sombra (`--dss-shadow-2`), destacando-se claramente do conteúdo abaixo. | `elevated: true`, `bordered: false` |
| **Com Borda** | Header com borda inferior sutil (`--dss-border-subtle`), proporcionando uma separação limpa e minimalista. | `elevated: false`, `bordered: true` |
| **Reveal Ativo** | Header que se oculta suavemente na rolagem para baixo e reaparece na rolagem para cima. | `reveal: true` (requer simulação de rolagem no Playground) |
| **Brand Hub** | Header contendo toolbar com a cor da marca principal (Hub). | Slot default preenchido com `DssToolbar brand="hub"` |
| **Brand Water** | Header contendo toolbar com a cor da marca de água (Water). | Slot default preenchido com `DssToolbar brand="water"` |
| **Brand Waste** | Header contendo toolbar com a cor da marca de resíduos (Waste). | Slot default preenchido com `DssToolbar brand="waste"` |

---
*Fim do Pré-prompt*
