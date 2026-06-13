"""md
# Pre-Prompt de Criação — DssBtnToggle

> **Status:** Artefato de Governança — DSS v2.2
> **Criado:** 27 Mar 2026
> **Última Revisão:** 08 Mai 2026
> **Nota de Origem:** Especificação original fornecida inline durante sessão de trabalho (27 Mar 2026), revisada e expandida para conformidade com as diretrizes DSS v2.2.
> Este documento é a reconstrução fiel da especificação normativa utilizada para criar o componente, com detalhes adicionais para garantir robustez e clareza.
> Toda a informação deriva dos arquivos de documentação gerados (`DssBtnToggle.md`, `DSSBTNTOGGLE_API.md`, `dss.meta.json`) e das diretrizes de governança do Design System Sansys.

---

## 1. Classificação e Contexto

Você é o Agente DSS responsável por criar o componente **DssBtnToggle** conforme a especificação normativa DSS v2.2. Este componente é um controle de seleção exclusiva, projetado para agrupar opções mutuamente exclusivas de forma visualmente coesa e funcionalmente robusta.

| Campo | Valor |
|-------|-------|
| **Nome** | DssBtnToggle |
| **Componente Quasar Equivalente** | QBtnToggle |
| **Categoria** | Container de Seleção Exclusiva (Grupo de Alternância) |
| **Fase** | 2 — Componente Composto |
| **Golden Reference** | DssChip |
| **Golden Context** | DssBtnGroup (irmão arquitetural direto) |
| **Status Inicial** | Pré-auditoria |
| **DSS Version** | v2.2 |

**Justificativa Fase 2:** O DssBtnToggle gerencia estado de seleção (v-model) compartilhado entre múltiplos botões internos, orquestrados via prop `options`. Este gerenciamento de estado cruzado e a renderização interna pelo Quasar caracterizam composição interna — um critério fundamental da Fase 2 para componentes que encapsulam lógica e UI de outros componentes.

**Justificativa Golden Context (DssBtnGroup):** DssBtnGroup é o irmão arquitetural mais próximo, compartilhando o mesmo padrão de container de grupo de botões, governança de border-radius, separadores e acento de marca. A diferença fundamental reside na forma como os filhos são gerenciados: DssBtnGroup aceita `DssButton` via `<slot>`, enquanto DssBtnToggle gera botões internamente via `options`, oferecendo uma API mais simplificada para casos de uso específicos.

**Abordagem obrigatória: WRAP** — DssBtnToggle deve envolver o `QBtnToggle`, não reconstruir gerenciamento de seleção do zero. Esta estratégia é crucial porque o `QBtnToggle` fornece `v-model`, `aria-pressed`, e navegação por teclado nativos, garantindo acessibilidade e funcionalidade robusta com mínimo esforço. Precedente: DssBtnDropdown (selado Mar 2026) usa a mesma estratégia de encapsulamento.

---

## 2. Diferença Fundamental vs. DssBtnGroup

> ⚠️ CRÍTICO — Principal fonte de confusão arquitetural e ponto de atenção para manutenção futura.

Esta seção detalha as distinções cruciais entre DssBtnToggle e DssBtnGroup, esclarecendo suas responsabilidades e casos de uso para evitar implementações incorretas e garantir a consistência do Design System.

| Aspecto | DssBtnGroup | DssBtnToggle |
|---------|-------------|--------------|
| Filhos | `DssButton` via `<slot>` (composição externa) | Gerados internamente pelo Quasar via `options` (composição interna) |
| Estado | Sem v-model (layout puro, sem gerenciamento de seleção) | Com v-model (gerenciamento de seleção exclusiva) |
| Seletores CSS | `.dss-button:first/last-child` (seletores de componente DSS) | `.q-btn-item:first/last-child` (seletores de elemento DOM interno Quasar) |
| Prop sync | Obrigatório (filhos precisam replicar estilo e estado do grupo) | Não necessário (Quasar propaga via `flat`/`outline` e outras props) |
| Variante API | Props booleanas individuais para cada estilo | `variant` string única (API simplificada DSS) |

---

## 3. O Grande Risco Arquitetural

Esta seção aborda os riscos arquiteturais identificados e as soluções normativas para garantir a integridade e a manutenibilidade do DssBtnToggle, especialmente em relação à interação com o Quasar e a governança de CSS.

### 3.1 Seletores CSS e Gate de Composição v2.4

> ⚠️ CRÍTICO — Registro preemptivo obrigatório para exceções de governança.

O QBtnToggle renderiza botões internos com a classe `.q-btn-item`. Para gerenciar border-radius e separadores de forma consistente com o DSS, o SCSS precisa de seletores específicos que visam o DOM interno do Quasar, o que constitui uma exceção à regra geral de não estilizar elementos internos de componentes de terceiros.

```scss
/* ✅ CORRETO — .q-btn-item é DOM interno Quasar, não componente DSS filho direto. Esta exceção é justificada pela necessidade de harmonização visual. */
.dss-btn-toggle > .q-btn-item:first-child { border-radius: 0; }
```

**Este padrão DEVE ser registrado em `dss.meta.json → gateExceptions.compositionGateV24`** desde o início da implementação. Precedente: DssBtnGroup (selado Mar 2026), que enfrentou um desafio similar e estabeleceu este precedente.

**Anti-pattern:**
```scss
/* ❌ INCORRETO — tentar usar seletores de DssButton (eles não existem aqui). Isso resultaria em estilos quebrados e dificultaria a manutenção. */
.dss-btn-toggle > .dss-button:first-child { ... }
```

### 3.2 Gate de Responsabilidade v2.4

O modo `outline` do DssBtnToggle requer um ajuste de `z-index` nos estados `:hover` e `:focus-visible` para garantir que as bordas dos botões ativos ou focados não sejam cortadas por elementos adjacentes, mantendo a clareza visual e a interatividade.

```scss
/* ✅ CORRETO — ajuste estrutural de posicionamento, não captura de aparência. Essencial para a correta renderização de estados interativos. */
.dss-btn-toggle--outline > .q-btn-item:not(:first-child) {
  &:hover, &:focus-visible {
    position: relative;
    z-index: 1;
  }
}
```

**Este padrão DEVE ser registrado em `dss.meta.json → gateExceptions.responsibilityGateV24`**. Precedente: DssBtnGroup Ciclo 2, onde uma solução similar foi implementada para resolver problemas de sobreposição de bordas.

### 3.3 `<style>` sem scoped

É obrigatório o uso de `<style lang="scss">` **sem** o atributo `scoped`. Com `scoped`, os seletores que visam o DOM interno do Quasar (como `.q-btn-item`) não funcionariam corretamente em runtime, quebrando a estilização do componente. Precedente: DssBtnGroup NC-01 (Ciclo 1, Mar 2026), que demonstrou a necessidade desta abordagem.

### 3.4 Reatividade do Mapeamento de Variante

A prop `variant` (string) do DssBtnToggle é mapeada para props booleanas do Quasar (`flat`, `outline`, etc.). Este mapeamento **DEVE ser reativo** para garantir que o componente responda dinamicamente a mudanças na prop `variant` em tempo de execução, evitando estados visuais inconsistentes.

```typescript
// ❌ INCORRETO — não reativo a mudanças dinâmicas de variant. O componente não atualizaria seu estilo se a prop 'variant' fosse alterada após a montagem inicial.
const flat = props.variant === 'flat'

// ✅ CORRETO — computed rastreia props.variant reativamente. Garante que o componente sempre reflita o estado visual correto. 
const variantProps = computed(() => ({
  flat: props.variant === 'flat',
  outline: props.variant === 'outline',
  unelevated: props.variant === 'unelevated',
  push: props.variant === 'push',
  // Adicionar outras variantes conforme necessário
}))
```

Precedente: DssBtnDropdown NC-02 (Ciclo 1, Mar 2026), onde a reatividade do mapeamento de props foi um requisito crítico.

---

## 4. Mapeamento de API

Esta seção detalha as propriedades, eventos e slots que o DssBtnToggle expõe, bem como as props do Quasar que são explicitamente bloqueadas para manter a consistência e a governança do Design System. O mapeamento de `variant` é crucial para a simplificação da API.

### Props Expostas (Permitidas)

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `any` | `undefined` | Valor selecionado (v-model). Representa o valor da opção ativa no grupo. |
| `options` | `BtnToggleOption[]` | — | Array de objetos de opções (**obrigatório**). Cada objeto define um botão no grupo. |
| `variant` | `BtnToggleVariant` | `'elevated'` | Variante visual do componente (API simplificada DSS). Controla o estilo de elevação, contorno, etc. |
| `color` | `string` | `undefined` | Cor de fundo dos botões inativos. Utiliza tokens de cor do DSS. |
| `toggleColor` | `string` | `undefined` | Cor de fundo do botão ativo. Destaca a opção selecionada. |
| `textColor` | `string` | `undefined` | Cor do texto dos botões inativos. |
| `toggleTextColor` | `string` | `undefined` | Cor do texto do botão ativo. |
| `rounded` | `boolean` | `false` | Aplica cantos arredondados (pill) nas extremidades do grupo. |
| `square` | `boolean` | `false` | Remove completamente o border-radius, resultando em cantos retos. |
| `spread` | `boolean` | `false` | Faz com que o grupo ocupe a largura total disponível do seu container pai. |
| `stretch` | `boolean` | `false` | Estica o grupo para preencher a altura total do seu container pai. |
| `disable` | `boolean` | `false` | Desabilita todo o grupo de botões, impedindo interação. |
| `readonly` | `boolean` | `false` | Torna o grupo somente leitura, permitindo visualização mas não alteração. |
| `clearable` | `boolean` | `false` | Permite desmarcar a opção selecionada, retornando ao estado `undefined`. |
| `brand` | `BtnToggleBrand\|null` | `null` | Acento de marca para o componente, utilizando as cores de marca do DSS (`hub`, `water`, `waste`). |
| `ariaLabel` | `string` | `undefined` | Label acessível para o grupo de botões, importante para leitores de tela. |

### Props Bloqueadas (Proibidas)

As seguintes props do QBtnToggle são explicitamente bloqueadas para garantir a adesão às diretrizes do DSS e evitar inconsistências visuais ou de comportamento.

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | O DSS gerencia o dark mode globalmente via `[data-theme="dark"]`, evitando a necessidade de props de dark mode em componentes individuais. |
| `glossy` | Não faz parte da linguagem visual do DSS v2.2. Estilos glossy são inconsistentes com a estética flat e moderna do sistema. |
| `size` | O dimensionamento do componente deve seguir os tokens de espaçamento e altura definidos pelo DSS, como `--dss-compact-control-height-*`, garantindo consistência em toda a aplicação. |
| `dense` | Mesmo motivo de `size`. O espaçamento é controlado por tokens de design. |
| `noCaps` (externo) | O componente aplica internamente o controle de capitalização; o casing do texto é governado por tokens de tipografia do DSS. |

### Mapeamento variant → QBtnToggle

Este mapeamento simplifica a API do DssBtnToggle, permitindo que os consumidores usem uma única prop `variant` em vez de múltiplas props booleanas do Quasar.

| `variant` DSS | Props booleanas Quasar |
|---------------|------------------------|
| `elevated` | *(nenhuma — utiliza o estilo padrão de elevação do Quasar)* |
| `flat` | `flat: true` |
| `outline` | `outline: true` |
| `unelevated` | `unelevated: true` |
| `push` | `push: true` |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `any` | Emitido quando o valor selecionado muda, seja ao clicar numa opção ou ao desmarcar (se `clearable` for `true`). |

### Slots

| Slot | Descrição |
|------|-----------|
| `[nome-do-slot]` (dinâmico) | Um slot dinâmico é disponibilizado para cada opção, permitindo customização do conteúdo interno do botão, disponível quando `option.slot` está definido no objeto de opções. |

---

## 5. Governança de Tokens

Esta seção detalha os tokens de design obrigatórios e as exceções documentadas que o DssBtnToggle deve utilizar, garantindo a consistência visual e a aderência às especificações do Design System Sansys. A correta aplicação dos tokens é fundamental para a escalabilidade e manutenibilidade.

### Tokens Obrigatórios

| Token | Camada | Uso | Detalhes |
|-------|--------|-----|----------|
| `--dss-border-width-thin` | L3 | Separadores `flat`/`unelevated`; colapso `outline` | Define a espessura fina para bordas e separadores. |
| `--dss-border-width-thick` | L4 | Acento `brand` (inset box-shadow) | Utilizado para criar um destaque visual mais pronunciado para as marcas. |
| `--dss-spacing-4` | L2 | Espaçamento interno e externo | Substitui `--dss-spacing-4` para padronizar o espaçamento. |
| `--dss-radius-full` | L2 | Border-radius `pill` (`rounded`) | Define o raio máximo para cantos completamente arredondados. |
| `--dss-gray-200` | L3 | Separador `unelevated` (sutil) | Cor cinza clara para separadores em variantes de baixa elevação. |
| `--dss-gray-300` | L3 | Separador `flat` | Cor cinza média para separadores em variantes flat. |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub (claro/dark) | Cores específicas para a marca 'Hub' em temas claro e escuro. |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water (claro/dark) | Cores específicas para a marca 'Water' em temas claro e escuro. |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste (claro/dark) | Cores específicas para a marca 'Waste' em temas claro e escuro. |
| `--dss-text-subtle` | L3 | Cor de texto secundária | Substitui `--dss-text-subtle` para textos de menor destaque. |
| `--dss-action-hub` | L4 | Cor de ação primária | Substitui `--dss-action-hub` para ações principais. |
| `--dss-action-hub-surface` | L4 | Superfície de ação primária | Substitui `--dss-action-hub-surface` para fundos de ações principais. |

### Exceções Documentadas Obrigatórias

As exceções a seguir são justificadas por requisitos específicos de design ou interoperabilidade com o Quasar, e devem ser rigorosamente documentadas para garantir a transparência e a conformidade.

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `_base.scss` | Necessário para a variante `square`, que remove o arredondamento. É um comportamento semântico e alinhado com o padrão DssBtnGroup EXC-01. |
| EXC-02 | `rgba(255, 255, 255, 0.12)` | `_states.scss` | Utilizado para divisores em dark mode. Não existe um token DSS específico para `white` com `alpha` neste contexto, justificando o uso direto do valor. |
| EXC-03 | `1px solid ButtonText` | `_states.scss` | Necessário para compatibilidade com `forced-colors` (alto contraste), onde palavras-chave do sistema são obrigatórias para garantir a acessibilidade. |
| EXC-04 | `outline: 2px solid white` | `_states.scss` | Substitui `outline: 2px solid white` para garantir um anel de foco visível e acessível em todos os temas, especialmente em dark mode. |

---

## 6. Acessibilidade e Estados

Esta seção detalha as considerações de acessibilidade e o gerenciamento de estados do DssBtnToggle, garantindo que o componente seja utilizável por todos os usuários, incluindo aqueles que dependem de tecnologias assistivas.

### ARIA

A correta aplicação de atributos ARIA é fundamental para a semântica e a acessibilidade do componente, especialmente para leitores de tela.

| Atributo | Valor | Fonte | Detalhes |
|----------|-------|-------|----------|
| `role` | `group` | DssBtnToggle (explícito no template) | Define o componente como um grupo de elementos interativos. |
| `aria-label` | prop `ariaLabel` | Quando fornecido | Fornece um rótulo descritivo para o grupo, essencial para a navegação. |
| `aria-pressed` | `true`/`false` | QBtnToggle (automático por botão) | Indica o estado de 
"""md
seleção de cada botão individualmente. |
| `aria-disabled` | `true` | QBtnToggle (automático quando `disable`) | Indica se o botão está desabilitado. |

### Touch Target

**Opção B — Delegado ao QBtnToggle interno.** O DssBtnToggle não é um Compact Control standalone. A responsabilidade pelo touch target é delegada ao componente Quasar subjacente, que já implementa as diretrizes de tamanho mínimo para elementos interativos.

### Delegação de Estados

O gerenciamento de estados é crucial para a interatividade e feedback visual do componente. Alguns estados são gerenciados diretamente pelo DssBtnToggle, enquanto outros são delegados ao QBtnToggle.

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `default` | ✅ | Visual | Padrão (renderização inicial) |
| `disabled` | ✅ | Visual | Prop `disable=true` |
| `readonly` | ✅ | Visual | Prop `readonly=true` |
| `hover`, `focus`, `active` | Delegado | Visual | Mouse over |
| `error`, `indeterminate`, `loading` | ❌ | Funcional | Prop `loading=true` |

---

## 7. Estrutura de Arquivos Obrigatória

A estrutura de arquivos a seguir é mandatória para a implementação do DssBtnToggle, garantindo a organização, modularidade e conformidade com as convenções do Design System Sansys. Cada arquivo tem uma responsabilidade clara e definida.

```
DssBtnToggle/
├── 1-structure/DssBtnToggle.ts.vue     ← Implementação canônica do componente Vue, contendo a lógica principal e o template.
├── 2-composition/_base.scss            ← Estilos base para o container do componente e regras de border-radius (incluindo EXC-01).
├── 3-variants/
│   ├── _flat.scss                      ← Estilos específicos para a variante `flat`, incluindo o separador.
│   ├── _outline.scss                   ← Estilos para a variante `outline`, com regras para colapso de borda e z-index (responsibilityGateV24).
│   ├── _unelevated.scss                ← Estilos para a variante `unelevated`, incluindo o separador.
│   ├── _push.scss                      ← Placeholder para a variante `push` (gerenciamento delegado ao Quasar).
│   └── index.scss                      ← Arquivo de orquestração para os estilos das variantes.
├── 4-output/
│   ├── _states.scss                    ← Estilos para estados (dark mode EXC-02, forced-colors EXC-03, focus ring EXC-04).
│   ├── _brands.scss                    ← Estilos para as variantes de marca (Hub, Water, Waste).
│   └── index.scss                      ← Arquivo de orquestração para os estilos de saída.
├── composables/useBtnToggleClasses.ts  ← Composable para gerenciar classes CSS dinâmicas baseadas nas props do componente.
├── types/btn-toggle.types.ts           ← Definições de tipos TypeScript para as props e opções do DssBtnToggle.
├── DssBtnToggle.module.scss            ← Arquivo SCSS principal que orquestra a importação dos estilos L2→L3→L4.
├── DssBtnToggle.vue                    ← Entry Point Wrapper (re-export puro) para o componente.
├── DssBtnToggle.example.vue            ← Arquivo de exemplos com 7 cenários de uso para demonstração e testes.
├── DssBtnToggle.md                     ← Documentação normativa do componente, detalhando seu uso e comportamento.
├── DSSBTNTOGGLE_API.md                 ← Referência da API do componente, gerada automaticamente.
├── dss.meta.json                       ← Metadados do componente, incluindo exceções e `gateExceptions`.
├── index.js                            ← Barrel export para facilitar a importação do componente.
└── README.md                           ← Descrição geral do componente e instruções básicas.
```

---

## 8. Superfície de Playground

Esta seção descreve a superfície de playground para o DssBtnToggle, detalhando os controles obrigatórios, a lógica composta concreta e os estados a expor. O objetivo é fornecer um ambiente de teste e demonstração abrangente que cubra todos os cenários de uso e validação do componente.

### Controles Obrigatórios

Para uma validação completa, o playground deve incluir os seguintes controles interativos:

*   **`v-model`**: Um controle para alterar o valor selecionado do `DssBtnToggle`, permitindo testar a reatividade e a seleção. Pode ser um `DssInput` ou `DssSelect` que reflita e altere o `modelValue`.
*   **`options`**: Um editor de array de objetos para `BtnToggleOption[]`, permitindo adicionar, remover e modificar as opções disponíveis no grupo. Isso valida a flexibilidade do componente em diferentes configurações.
*   **`variant`**: Um `DssSelect` com as opções `elevated`, `flat`, `outline`, `unelevated`, `push` para alternar entre as variantes visuais do componente.
*   **`color` e `toggleColor`**: Controles de seleção de cor (ex: `DssColorPicker` ou `DssSelect` com tokens de cor) para definir as cores dos botões inativos e ativos, respectivamente.
*   **`textColor` e `toggleTextColor`**: Controles de seleção de cor para o texto dos botões inativos e ativos.
*   **`rounded`**: Um `DssCheckbox` para alternar a propriedade `rounded` (cantos pill).
*   **`square`**: Um `DssCheckbox` para alternar a propriedade `square` (sem border-radius).
*   **`spread`**: Um `DssCheckbox` para alternar a propriedade `spread` (largura total).
*   **`stretch`**: Um `DssCheckbox` para alternar a propriedade `stretch` (altura total).
*   **`disable`**: Um `DssCheckbox` para desabilitar o grupo de botões.
*   **`readonly`**: Um `DssCheckbox` para tornar o grupo somente leitura.
*   **`clearable`**: Um `DssCheckbox` para permitir desmarcar a opção selecionada.
*   **`brand`**: Um `DssSelect` com as opções `hub`, `water`, `waste` e `null` para aplicar acentos de marca.
*   **`ariaLabel`**: Um `DssInput` para definir o `aria-label` do componente.

### Composite Logic (Concreta, Não Genérica)

O playground deve demonstrar a lógica composta do DssBtnToggle através de exemplos concretos, não apenas genéricos. Isso inclui:

1.  **Reatividade de `variant`**: Um exemplo onde a `variant` é alterada dinamicamente, e o componente responde corretamente (validando o `computed` no `variantProps`).
2.  **Interação com `v-model`**: Um cenário onde o `modelValue` é atualizado externamente e o `DssBtnToggle` reflete a seleção, e vice-versa, quando uma opção é clicada.
3.  **Customização de `options` com `slot`**: Um exemplo de `options` que utiliza a propriedade `slot` para renderizar conteúdo customizado dentro dos botões, demonstrando a flexibilidade dos slots dinâmicos.
4.  **Combinações de `rounded` e `square`**: Testar o comportamento quando `rounded` e `square` são ativados simultaneamente (o `square` deve ter precedência, removendo o arredondamento).
5.  **Estados `disable` e `readonly`**: Demonstrar a diferença visual e funcional entre um componente desabilitado e um somente leitura.
6.  **Comportamento `clearable`**: Um exemplo onde o usuário pode desmarcar a opção selecionada, retornando ao estado inicial.

### Estados a Expor

Os seguintes estados devem ser claramente visíveis e testáveis no playground, preferencialmente através de uma tabela ou de indicadores visuais claros:

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `default` | O componente em seu estado normal, sem interações. | Visual | Padrão (renderização inicial) |
| `hover` | O estado quando o mouse está sobre um botão. | Visual | Mouse over |
| `focus` | O estado quando um botão está focado (via teclado ou clique). | Visual | Navegação por teclado (Tab) |
| `active` | O estado quando um botão está sendo clicado. | Visual | Mouse press / tecla Enter |
| `selected` | O estado de um botão que está atualmente selecionado. | Visual | — |
| `disabled` | O componente ou um botão individual está desabilitado. | Visual | Prop `disable=true` |
| `readonly` | O componente está em modo somente leitura. | Visual | Prop `readonly=true` |
| `brand-hub` | O componente com o acento de marca `hub`. | Visual | Prop `brand="hub"` ou `[data-brand="hub"]` |
| `brand-water` | O componente com o acento de marca `water`. | Visual | Prop `brand="water"` ou `[data-brand="water"]` |
| `brand-waste` | O componente com o acento de marca `waste`. | Visual | Prop `brand="waste"` ou `[data-brand="waste"]` |

---

*Artefato de Governança — DSS v2.2 — 08 Mai 2026*
"""
