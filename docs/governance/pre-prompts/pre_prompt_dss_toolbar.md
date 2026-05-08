# Pré-prompt de Criação de Componente DSS: DssToolbar

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.
>
> **Nota de Auditoria (2026-04-16):** Pré-prompt corrigido retroativamente após auditoria DSS v2.5. Gaps corrigidos: GAP-01 (Golden Context inválido), GAP-02 (tokens inexistentes), GAP-03 (Touch Target ausente), GAP-04 (estrutura props.blocked migrada para propsBlocked).

## 1. Classificação e Contexto

- **Nome do Componente:** `DssToolbar`
- **Família:** Estrutura de Página (Base)
- **Nível de Composição:** Nível 1 (Independente)
- **Golden Reference:** `DssBadge` (como container estrutural não-interativo)
- **Golden Context:** `DssTabs` — container horizontal de navegação/ação com brandabilidade via `[data-brand]`, Selo DSS v2.2 (Abr 2026). `DssHeader` e `DssFooter` (contextos pais naturais) ainda não existem — registrados em `compositionFuture`. *(GAP-01 corrigido)*
- **Componente Quasar Base:** `QToolbar`
- **Dependências Diretas:** `DssButton`, `DssIcon` (para composição interna pelo consumidor)

**Justificativa da Fase 2:** O `DssToolbar` é um componente essencial no Design System, atuando como a **barra de ações horizontal fundamental** para a interface do usuário. Sua principal função é servir como um bloco de construção versátil para elementos estruturais maiores, como cabeçalhos (`DssHeader`), rodapés (`DssFooter`) e barras de ferramentas internas encontradas em componentes como cards ou modais. A sua robustez e flexibilidade o tornam indispensável para a consistência visual e funcional em toda a aplicação. Ele garante que as ações e navegações primárias estejam sempre acessíveis e alinhadas com os padrões de design do DSS.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Altura e Alinhamento

O `QToolbar` nativo possui uma altura mínima padrão (`min-height: 50px`) e gerencia o alinhamento dos itens via flexbox. O risco é que a altura não corresponda à escala de sizing do DSS e que o espaçamento interno (padding) não utilize os tokens de spacing corretos.

**Mitigação:** O `DssToolbar` deve sobrescrever a altura mínima e o padding nativos utilizando tokens DSS (`--dss-spacing-14` para altura padrão, `--dss-spacing-4` para padding horizontal).

### 2.2. Gate de Responsabilidade v2.4

O `DssToolbar` é um **container estrutural 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua única responsabilidade é fornecer o layout horizontal (flexbox) e o espaçamento correto para os elementos filhos (botões, títulos, ícones). A interatividade é responsabilidade exclusiva dos componentes inseridos nele.

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-toolbar>`. O slot `default` é destinado ao conteúdo da barra e pode receber qualquer componente DSS, sendo os mais comuns `DssButton` (variante `flat` ou `ghost`), `DssToolbarTitle` (futuro) e `DssIcon`.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

- `inset` (Boolean): Esta propriedade booleana, quando `true`, adiciona um espaçamento horizontal extra à esquerda do conteúdo da barra de ferramentas. É particularmente útil em layouts onde o `DssToolbar` precisa se alinhar visualmente com um menu lateral ou outra estrutura de navegação, garantindo uma hierarquia visual clara e um alinhamento estético. O espaçamento aplicado é `--dss-spacing-6` (24px).
- `brand` (String): Esta propriedade define a identidade visual da barra de ferramentas, permitindo a aplicação de cores de fundo e texto predefinidas pelo Design System. Os valores aceitos são `hub`, `water` e `waste`. Cada valor corresponde a uma paleta de cores específica, que é aplicada dinamicamente ao fundo (`--dss-{brand}-600`) e ao texto (`--dss-text-inverse`) do componente. A ausência desta prop ou um valor `null` reverte o componente para seu estado padrão, com fundo transparente e texto `--dss-text-body`.

### 3.2. Props Bloqueadas (Governança DSS) *(GAP-04 corrigido — estrutura top-level)*

```json
"propsBlocked": ["dark", "glossy", "color", "text-color"],
"propsBlockedJustification": {
  "dark": "Modo escuro governado globalmente pelo DSS via [data-theme='dark'], não por prop individual.",
  "glossy": "Efeito visual não utilizado no DSS — ausência de glossy é padrão.",
  "color": "Cor de fundo governada por tokens DSS, especificamente `--dss-{brand}-600` para as variantes de `brand` (`hub`, `water`, `waste`), ou `transparent` para o estado padrão. Isso garante a aderência à paleta de cores definida pelo Design System e a flexibilidade para temas e contextos visuais diversos.",
  "text-color": "Cor de texto governada por tokens DSS, utilizando `--dss-text-body` para o texto padrão em superfícies claras e `--dss-text-inverse` para texto em superfícies de `brand` escuras. Essa abordagem assegura contraste adequado e legibilidade em todas as variações de cor de fundo, mantendo a acessibilidade e a estética do Design System."
}
```

### 3.3. Pass-through via `$attrs`

O `DssToolbar` é projetado para ser flexível e permitir a passagem de atributos HTML nativos ou propriedades não declaradas explicitamente no DSS diretamente para o componente base `QToolbar` via `$attrs`. Isso é crucial para manter a compatibilidade e a extensibilidade. Um exemplo notável é:

- `dense` (Boolean): Embora não seja uma prop explicitamente declarada no DSS para o `DssToolbar`, esta propriedade booleana é encaminhada via `$attrs` diretamente ao `QToolbar` subjacente. Quando `dense` é `true`, o `QToolbar` aplica a classe `.q-toolbar--dense` nativamente, o que resulta em uma barra de ferramentas mais compacta, com altura reduzida para `--dss-spacing-10` (40px) e padding horizontal para `--dss-spacing-3` (12px). Esta funcionalidade permite que o consumidor do componente ajuste a densidade visual sem a necessidade de uma prop DSS duplicada.

## 4. Governança de Tokens e CSS *(GAP-02 corrigido)*

A governança de tokens é um pilar fundamental para a consistência visual e a manutenibilidade do Design System. O `DssToolbar` adere estritamente a esta governança, utilizando tokens de design para todas as suas propriedades estilísticas, garantindo que qualquer alteração global no Design System seja refletida automaticamente no componente. Isso elimina a necessidade de ajustes manuais e reduz a probabilidade de inconsistências visuais. Abaixo, detalhamos os tokens essenciais que o `DssToolbar` deve utilizar, com suas respectivas propriedades e valores:

O `DssToolbar` deve utilizar os seguintes tokens:

| Propriedade | Token Correto | Valor |
|---|---|---|
| Altura padrão (min-height) | `--dss-spacing-14` | 56px |
| Altura dense (min-height) | `--dss-spacing-10` | 40px |
| Padding horizontal padrão | `--dss-spacing-4` | 16px |
| Padding horizontal inset | `--dss-spacing-6` | 24px |
| Padding horizontal dense | `--dss-spacing-3` | 12px |
| Cor de texto padrão | `--dss-text-body` | — |
| Cor de texto com brand | `--dss-text-inverse` | — |
| Brand Hub | `--dss-hub-600` | — |
| Brand Water | `--dss-water-600` | — |
| Brand Waste | `--dss-waste-600` | — |

**Cor de fundo padrão: `transparent`. É importante notar que o `QToolbar` subjacente não aplica um background por padrão, o que significa que o `DssToolbar` herda essa característica. Não há um token DSS específico para 'background transparente', pois essa é a ausência de uma cor de fundo, permitindo que a cor da superfície pai seja visível. Isso é intencional para promover a flexibilidade na composição de layouts.).

> **Tokens Inexistentes e Práticas a Evitar:** É crucial que o desenvolvimento do `DssToolbar` evite o uso de tokens que não fazem parte do vocabulário oficial do Design System. Tokens como `--dss-size-14`, `--dss-size-16`, `--dss-surface-base` e `--dss-brand-*-500` são considerados **tokens fantasmas** ou legados e **NÃO devem ser utilizados**. A adesão estrita aos tokens documentados garante a integridade do sistema e evita comportamentos visuais inesperados ou difíceis de manter. Em caso de dúvida sobre a existência ou o uso correto de um token, a documentação oficial do DSS deve ser consultada.

## 5. Acessibilidade e Estados *(GAP-03 corrigido)*

A acessibilidade é um aspecto crítico no desenvolvimento de componentes de UI, garantindo que todos os usuários, independentemente de suas capacidades, possam interagir e compreender o conteúdo. O `DssToolbar` é projetado com foco na acessibilidade, seguindo as diretrizes WCAG e as melhores práticas de ARIA.

- **Role Semântico:** O `QToolbar` nativamente implementa o atributo `role="toolbar"`, que é fundamental para a semântica de acessibilidade. O `DssToolbar` deve **preservar e respeitar essa semântica**, garantindo que tecnologias assistivas identifiquem corretamente o componente como uma barra de ferramentas, facilitando a navegação e a compreensão para usuários de leitores de tela.
- **Aria-label para Contexto:** Para fornecer um contexto mais descritivo a usuários de tecnologias assistivas, é **altamente recomendado** que o consumidor do componente utilize o atributo `aria-label` via `$attrs`. Por exemplo: `<DssToolbar aria-label="Ações do documento">`. O `DssToolbar` deve ser implementado de forma a **repassar corretamente todos os `$attrs`** para o elemento `QToolbar` subjacente, permitindo essa customização semântica.
- **Touch Target e Interatividade:** É crucial entender que o `DssToolbar` é um **container estrutural 100% não-interativo**. Isso significa que ele não possui estados de interação próprios como `:hover`, `:focus` ou `:active`. A responsabilidade pelo `touch target` e pela interatividade recai **exclusivamente sobre os componentes filhos** que são inseridos dentro da barra de ferramentas (e.g., `DssButton`, `DssIcon`). Consequentemente, a implementação de `touch target` via pseudo-elementos `::before` ou `::after` **não se aplica** ao `DssToolbar` em si, mas sim aos seus elementos interativos internos.
- **Estados Visuais Aplicáveis:** Os estados visuais que se aplicam diretamente ao `DssToolbar` são `default` (estado inicial sem modificações) e `branded` (quando uma das opções de `brand` — `hub`, `water`, `waste` — é ativada). É importante reforçar que **nenhum estado de interação** (como `hover`, `focus`, `active`, `disabled`) deve ser aplicado ou gerenciado pelo `DssToolbar` como container, pois sua natureza é puramente estrutural e não interativa.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssToolbar.example.vue` deve ser abrangente e demonstrar a versatilidade do componente em diversos contextos. Cada cenário deve ser implementado com clareza, utilizando as props e slots de forma a ilustrar o comportamento esperado e as capacidades do `DssToolbar`. A seguir, detalhamos os cenários obrigatórios:

1.  **Básico:** Uma `DssToolbar` simples, contendo apenas um título (`DssToolbarTitle` - futuro) e um `DssButton` de ação. Este cenário deve focar na estrutura fundamental e no espaçamento padrão.
2.  **Com Brand Hub:** Demonstração da `DssToolbar` com a propriedade `brand="hub"` ativada. O fundo da barra deve exibir a cor `--dss-hub-600` e o texto interno deve automaticamente inverter para `--dss-text-inverse`, garantindo legibilidade e aderência à identidade visual da marca Hub.
3.  **Com Brand Water:** Similar ao cenário anterior, mas com `brand="water"`. O fundo deve ser `--dss-water-600` e o texto `--dss-text-inverse`, refletindo a identidade da marca Water.
4.  **Com Brand Waste:** Cenário com `brand="waste"`, onde o fundo é `--dss-waste-600` e o texto `--dss-text-inverse`, alinhado à marca Waste.
5.  **Com Inset:** Uma `DssToolbar` com a propriedade `inset` definida como `true`. Este exemplo deve evidenciar o espaçamento extra à esquerda (`--dss-spacing-6`), simulando um alinhamento com um menu lateral ou outra área de conteúdo adjacente.
6.  **Dense:** Demonstração da `DssToolbar` em seu estado compacto, ativado pela passagem do atributo `dense` via `$attrs`. O componente deve apresentar altura reduzida (`--dss-spacing-10`) e padding horizontal menor (`--dss-spacing-3`), ideal para interfaces com menor densidade de informação ou em dispositivos móveis.
7.  **Combinação de Props:** Um cenário avançado que combine múltiplas propriedades, como `brand="hub"`, `inset="true"` e `dense` ativado. Este exemplo serve para validar a interação e a prioridade das propriedades, garantindo que o componente se comporte conforme o esperado em situações complexas.
8.  **Com Múltiplos Elementos:** Uma `DssToolbar` contendo uma variedade de elementos, como `DssButton` (com diferentes variantes), `DssIcon`, e potencialmente outros componentes que podem ser aninhados. Este cenário visa testar a capacidade do `DssToolbar` de gerenciar o layout e o espaçamento de múltiplos filhos de forma consistente.

## 7. Exceções aos Gates v2.4

### EXC-01: Sobrescrita de Padding e Min-Height Nativos

- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (L3 com `.q-toolbar--dense`).
- **Justificativa:** L2: O `QToolbar` aplica `min-height: 50px` e `padding: 0 12px` no `.q-toolbar`. Como `.dss-toolbar` é aplicado no mesmo elemento, o override é feito por cascata (mesma especificidade, ordem posterior) — sem seletor composto necessário. L3: O dense usa `.dss-toolbar.q-toolbar--dense` (seletor composto com classe Quasar) porque `dense` é gerenciado nativamente pelo `QToolbar` via `$attrs`, não via prop DSS explícita.

## 8. Superfície de Playground

### 8.1. Controles Obrigatórios

- `brand` (Dropdown: `hub`, `water`, `waste`, `null`)
- `inset` (Toggle: `true`, `false`)
- `dense` (Toggle: `true`, `false`)

### 8.2. Composite Logic

A `DssToolbar` deve reagir dinamicamente à prop `brand`, alterando sua cor de fundo para o token `--dss-{brand}-600` e a cor do texto para `--dss-text-inverse` quando uma `brand` é selecionada. Quando `brand` é `null`, a cor de fundo deve ser `transparent` e a cor do texto `--dss-text-body`. A prop `inset` deve adicionar `--dss-spacing-6` de padding à esquerda, enquanto `dense` deve reduzir a altura mínima para `--dss-spacing-10` e o padding horizontal para `--dss-spacing-3`.

### 8.3. Estados a Expor

| Estado | Descrição |
|---|---|
| `default` | Estado inicial, sem `brand` ou `inset` aplicados. |
| `branded-hub` | `brand="hub"` aplicada. |
| `branded-water` | `brand="water"` aplicada. |
| `branded-waste` | `brand="waste"` aplicada. |
| `inset-active` | `inset="true"` aplicada. |
| `dense-active` | `dense="true"` aplicada. |
| `branded-hub-inset-dense` | Combinação de `brand="hub"`, `inset="true"` e `dense="true"`. |
