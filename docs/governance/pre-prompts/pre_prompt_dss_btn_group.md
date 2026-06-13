# Pre-Prompt de Criação — DssBtnGroup

> **Status:** Artefato de Governança — DSS v2.2
> **Criado:** 26 Mar 2026
> **Nota de Origem:** Especificação original fornecida inline durante sessão de trabalho (26 Mar 2026).
> Este documento é a reconstrução fiel da especificação normativa utilizada para criar o componente.
> Toda a informação deriva dos arquivos de documentação gerados (`DssBtnGroup.md`, `DSSBTNGROUP_API.md`, `dss.meta.json`).

---

## 1. Contexto e Classificação do Componente

Você é o Agente DSS responsável por criar o componente **DssBtnGroup** conforme a especificação normativa DSS v2.2. Este componente é um container de composição que agrupa múltiplos botões, gerenciando o estado visual compartilhado entre eles.

| Campo | Valor |
|-------|-------|
| **Nome** | DssBtnGroup |
| **Componente Quasar Equivalente** | QBtnGroup |
| **Categoria** | Container de Composição (Action Group) |
| **Fase** | 2 — Componente Composto |
| **Golden Reference** | DssChip |
| **Golden Context** | DssCard |
| **Status Inicial** | Pré-auditoria |
| **DSS Version** | v2.2 |

**Justificativa Fase 2:** O DssBtnGroup gerencia estado visual compartilhado entre múltiplos DssButton filhos (border-radius, separadores, layout). Isso caracteriza composição interna — critério da Fase 2, indicando que o componente é mais do que um simples wrapper, mas um orquestrador de elementos interativos.

**Justificativa Golden Context (DssCard):** DssCard é o componente composto de Fase 2 mais próximo semanticamente. Ambos são containers estruturais de composição, fornecendo um contexto para outros componentes se organizarem visualmente e funcionalmente. A referência ao DssCard ajuda a manter a consistência na abordagem de design para componentes de agrupamento.

---

## 2. Princípios de Design e Riscos Arquiteturais

### 2.1 Prop Sync Obrigatório

> ⚠️ CRÍTICO — Esta é a regra mais importante do componente.

O DssBtnGroup **não propaga automaticamente** as props de estilo para os filhos. As props de estilo (`flat`, `outline`, `push`, `unelevated`, `glossy`, `square`) **DEVEM ser declaradas tanto no DssBtnGroup quanto em cada DssButton filho**. Esta é uma limitação fundamental do Quasar `QBtnGroup` que o DSS herda e deve ser explicitamente gerenciada para evitar inconsistências visuais.

Fonte: Quasar oficial — *"You must use same design props (flat, outline, push, …) on both the parent QBtnGroup and the children QBtn/QBtnDropdown."*

```vue
<!-- ❌ INCORRETO: botões filhos não herdarão o estilo flat -->
<DssBtnGroup flat>
  <DssButton label="Primeiro" />
  <DssButton label="Segundo" />
</DssBtnGroup>

<!-- ✅ CORRETO: prop declarada no grupo E em cada filho -->
<DssBtnGroup flat>
  <DssButton flat label="Primeiro" />
  <DssButton flat label="Segundo" />
</DssBtnGroup>
```

### 2.2 Escopo de Estilo: Não-Scoped Obrigatório

O `<style>` do Vue component **deve ser não-scoped** (`<style lang="scss">`, sem `scoped`). Com `scoped`, os filhos passados via `<slot>` não recebem o atributo de escopo do Vue e nenhum seletor `.dss-btn-group > .dss-button` produziria efeito em runtime. Esta regra é crucial para permitir que o DssBtnGroup aplique estilos globais aos seus filhos, como o gerenciamento de `border-radius` e separadores.

```vue
<!-- ❌ INCORRETO — child selectors não funcionam com scoped -->
<style lang="scss" scoped>

<!-- ✅ CORRETO — estilos globais necessários para o grouping funcionar -->
<style lang="scss">
```

### 2.3 Gate de Responsabilidade v2.4

**Atenção:** O componente não deve capturar estados interativos (`:hover`, `:focus-visible`) dos filhos via CSS. No caso do `_outline.scss`, o uso de `z-index` no hover do filho foi registrado como uma exceção formal (`responsibilityGateV24`) no `dss.meta.json`, pois altera apenas o contexto de empilhamento, não a aparência do botão. Qualquer outra tentativa de estilizar o estado interativo dos filhos a partir do pai será considerada um anti-padrão e deve ser evitada.

```scss
/* ❌ ANTI-PATTERN — pai capturando estado do filho sem exceção formal */
.dss-btn-group--outline > .dss-button:hover {
  color: red; /* altera aparência do filho */
}

/* ✅ EXCEÇÃO FORMAL DOCUMENTADA — altera apenas z-index de empilhamento */
/* Ver dss.meta.json > gateExceptions > responsibilityGateV24 */
.dss-btn-group--outline > .dss-button:hover,
.dss-btn-group--outline > .dss-button:focus-visible {
  position: relative;
  z-index: 1; /* contexto de empilhamento apenas — sem mudança visual no botão */
}
```

---

## 3. API do Componente

### Props

#### Props de Estilo Visual (Prop Sync Obrigatório)

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `flat` | Boolean | `false` | Sem elevação/borda. Adiciona separador `--dss-gray-300` entre filhos no container. Este estilo é ideal para barras de ferramentas ou grupos de botões onde a distinção visual é sutil. |
| `outline` | Boolean | `false` | Com borda visível. Colapsa bordas duplas com `margin-left: calc(-1 * var(--dss-border-width-thin))`. Proporciona um visual mais definido e é frequentemente usado para ações secundárias. |
| `push` | Boolean | `false` | Estilo 3D com uma leve sombra. Adiciona separador `--dss-gray-200` entre filhos. Confere uma sensação de profundidade e interatividade. |
| `unelevated` | Boolean | `false` | Remove sombra, mantendo a elevação. Adiciona separador `--dss-gray-200` entre filhos. Útil para manter a hierarquia visual sem a distração de sombras. |
| `glossy` | Boolean | `false` | Efeito glossy. Nenhum ajuste de grupo necessário — responsabilidade dos filhos. Este é um estilo puramente visual que é aplicado individualmente a cada botão. |

#### Props de Forma

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `rounded` | Boolean | `false` | `border-radius: var(--dss-radius-full)` nos cantos externos. Filhos intermediários mantêm `border-radius: 0`. Cria um grupo de botões com extremidades arredondadas, ideal para um visual mais suave. |
| `square` | Boolean | `false` | Remove todo border-radius (`0`) de todos os filhos. Garante que todos os botões no grupo tenham cantos retos, para um visual mais formal ou técnico. |

#### Props de Layout

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `spread` | Boolean | `false` | `display: flex`. Filhos recebem `flex: 1`. Distribui os botões igualmente dentro do grupo, ocupando todo o espaço disponível. |
| `stretch` | Boolean | `false` | `align-self: stretch`. Filhos: `align-self: stretch; min-height: 0`. Requer contexto flexbox externo. Permite que os botões se estiquem para preencher a altura disponível, útil em layouts responsivos. |

#### Props de Brandabilidade

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------|
| `brand` | `String \| null` | `null` | `hub` \| `water` \| `waste` | Acento visual de marca na borda inferior via `box-shadow` inset. Permite aplicar a identidade visual da marca ao grupo de botões, utilizando as cores designadas para `hub`, `water` ou `waste`. |

#### Props de Acessibilidade

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `ariaLabel` | String | `undefined` | Valor do `aria-label` no container `role="group"`. Essencial para fornecer contexto semântico a usuários de tecnologias assistivas, descrevendo a finalidade do grupo de botões. |

### Props Bloqueadas (Não Suportadas)

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` global. A responsabilidade do tema é centralizada e não deve ser controlada por componentes individuais. |
| `color` | Pertence ao DssButton filho. A cor de cada botão é uma propriedade individual. |
| `text-color` | Pertence ao DssButton filho. A cor do texto de cada botão é uma propriedade individual. |
| `size` | Pertence ao DssButton filho. O tamanho de cada botão é uma propriedade individual. |
| `dense` | Pertence ao DssButton filho. A densidade de cada botão é uma propriedade individual. |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Aceita `DssButton`. `DssBtnDropdown` previsto para Fase 2. Este slot é o ponto de inserção para os botões individuais que compõem o grupo. |

### Eventos

Nenhum. Container estrutural — eventos pertencem aos DssButton filhos. O DssBtnGroup foca na organização visual e de layout, delegando a interatividade aos seus elementos internos.

---

## 4. Estilização e Tematização (Arquitetura CSS e Tokens)

### Estrutura de Arquivos CSS

```
DssBtnGroup/
├── 1-structure/DssBtnGroup.ts.vue
├── 2-composition/_base.scss
├── 3-variants/
│   ├── _flat.scss
│   ├── _outline.scss
│   ├── _push.scss
│   ├── _unelevated.scss
│   ├── _glossy.scss          ← placeholder intencional
│   └── index.scss
├── 4-output/
│   ├── _states.scss          ← dark mode, forced-colors
│   ├── _brands.scss          ← Hub, Water, Waste
│   └── index.scss
├── composables/
│   ├── useBtnGroupClasses.ts
│   └── index.ts
├── types/btn-group.types.ts
├── DssBtnGroup.module.scss
├── DssBtnGroup.vue            ← Entry Point Wrapper
├── DssBtnGroup.example.vue
├── DssBtnGroup.md
├── DSSBTNGROUP_API.md
├── dss.meta.json
├── index.js
└── README.md
```

### Exceção Arquitetural de Composição (Documentada)

O DssBtnGroup **usa seletores CSS globais** do tipo `.dss-btn-group > .dss-button` para gerenciar border-radius e separadores dos filhos. Esta é a única exceção permitida à regra "componentes DSS não estilizam filhos internamente". Esta exceção é fundamental para o funcionamento visual coeso do grupo de botões, permitindo que o container ajuste a aparência dos seus filhos de forma coordenada.

**Justificativa:** Gerenciar visualmente os filhos É o propósito do componente group. Não usa `::v-deep` (estilos globais, não scoped). O `<style>` do Vue component **deve ser não-scoped** para que esses seletores funcionem, garantindo que as regras CSS sejam aplicadas corretamente aos elementos filhos.

### Seletores Obrigatórios (Layer 2)

```scss
/* Primeiro filho */
.dss-btn-group > .dss-button:first-child:not(:only-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

/* Último filho */
.dss-btn-group > .dss-button:last-child:not(:only-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* Filhos intermediários */
.dss-btn-group > .dss-button:not(:first-child):not(:last-child) {
  border-radius: 0; /* EXC-01 documentada */
}
```

### Tokens CSS Obrigatórios e Mapeamento

| Token | Camada | Uso | Mapeamento | Descrição Detalhada |
|-------|--------|-----|------------|---------------------|
| `--dss-border-width-thin` | L2 + L3 | Colapso outline / separadores | N/A | Define a espessura fina da borda, usada para colapsar outlines e criar separadores sutis entre os botões. |
| `--dss-border-width-thick` | L4 | Acento de brand (inset box-shadow) | N/A | Define a espessura grossa da borda, especificamente para o acento visual de marca via `box-shadow` inset. |
| `--dss-border-width-md` | Module | High contrast outline | N/A | Espessura média da borda, utilizada para outlines de alto contraste, melhorando a acessibilidade. |
| `--dss-gray-200` | L3 | Separador push e unelevated | N/A | Cor cinza clara, usada como separador para os estilos `push` e `unelevated`, proporcionando uma distinção visual suave. |
| `--dss-gray-300` | L3 | Separador flat | N/A | Cor cinza um pouco mais escura, usada como separador para o estilo `flat`, garantindo visibilidade em fundos claros. |
| `--dss-radius-full` | L2 | Variante rounded — border-radius pill | N/A | Raio de borda completo, usado para criar o efeito de 
borda arredondada (pill) para a variante `rounded`. |
| `--dss-action-hub` | L4 | Cor principal de ação | `--dss-action-hub` | Representa a cor primária para elementos interativos, substituindo o token antigo. |
| `--dss-action-hub-surface` | L4 | Superfície primária de ação | `--dss-action-hub-surface` | Cor de superfície associada à ação primária, substituindo o token antigo. |
| `--dss-spacing-4` | L2 | Espaçamento médio | `--dss-spacing-4` | Token de espaçamento padronizado, substituindo o token antigo. |
| `--dss-text-subtle` | L3 | Cor de texto sutil | `--dss-text-subtle` | Cor de texto para elementos secundários ou menos proeminentes, substituindo o token antigo. |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub (claro/dark) | N/A | Cores específicas da marca 'Hub' para temas claro e escuro, usadas para acentuação visual. |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water (claro/dark) | N/A | Cores específicas da marca 'Water' para temas claro e escuro, usadas para acentuação visual. |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste (claro/dark) | N/A | Cores específicas da marca 'Waste' para temas claro e escuro, usadas para acentuação visual. |

---

## 5. Governança de Tokens e Exceções

### Exceções Documentadas (Obrigatórias)

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `2-composition/_base.scss` | Square variant — `0` é semântico, não hardcoded visual. Padrão DssCard EXC-03. Esta exceção permite a flexibilidade de remover o `border-radius` para a variante `square`, mantendo a semântica de design. |
| EXC-02 | `rgba(255,255,255,0.12)` | `4-output/_states.scss` | Dark mode divider — sem token DSS equivalente. Padrão Material Design. Padrão DssCard EXC-01. Este valor é uma exceção temporária até que um token DSS apropriado para divisores em modo escuro seja definido. |
| EXC-03 | `1px solid ButtonText` | `4-output/_states.scss` | Forced-colors — system keywords obrigatórios. Padrão DssCard EXC-04. Em ambientes de alto contraste (forced-colors), é essencial usar palavras-chave do sistema para garantir a acessibilidade e a conformidade. |

---

## 6. Acessibilidade

| Atributo | Valor | Condição |
|----------|-------|----------|
| `role` | `"group"` | Sempre | Define o grupo de botões como um elemento de agrupamento para tecnologias assistivas. |
| `aria-label` | valor de `ariaLabel` | Quando prop fornecida | Fornece um rótulo descritivo para o grupo de botões, melhorando a navegação para usuários de leitores de tela. |

- **Touch target:** Opção B — delegado a cada DssButton filho. DssBtnGroup não é Compact Control. A área de toque é gerenciada individualmente por cada botão, garantindo que cada um tenha um tamanho adequado para interação. 
- **Foco:** O container não captura foco. Cada DssButton filho é navegável por Tab individualmente. Isso permite que os usuários naveguem pelos botões dentro do grupo de forma granular. 
- **`inheritAttrs: false`** + `v-bind="$attrs"` no container `<div>`. Garante que atributos não declarados como props sejam passados para o elemento raiz do componente, mantendo a flexibilidade e a compatibilidade. 

---

## 7. Estados do Componente

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| default | O estado padrão do grupo de botões, sem interações ativas ou modificações visuais. | Visual | Padrão (renderização inicial) |
| hover, focus, active, disabled, loading, error, indeterminate | Estes estados são gerenciados individualmente por cada botão dentro do grupo, refletindo sua própria interatividade. | Visual | Mouse over |

---

## 8. Superfície de Playground

Para a validação e demonstração do `DssBtnGroup`, a superfície de playground deve incluir os seguintes elementos:

### Controles Obrigatórios

- **Controle de Prop `flat`:** Um switch ou checkbox para alternar o estado `flat` do `DssBtnGroup` e de seus `DssButton` filhos. Isso demonstrará a regra de Prop Sync obrigatória.
- **Controle de Prop `outline`:** Um switch ou checkbox para alternar o estado `outline` do `DssBtnGroup` e de seus `DssButton` filhos.
- **Controle de Prop `push`:** Um switch ou checkbox para alternar o estado `push` do `DssBtnGroup` e de seus `DssButton` filhos.
- **Controle de Prop `unelevated`:** Um switch ou checkbox para alternar o estado `unelevated` do `DssBtnGroup` e de seus `DssButton` filhos.
- **Controle de Prop `rounded`:** Um switch ou checkbox para alternar o estado `rounded` do `DssBtnGroup`.
- **Controle de Prop `square`:** Um switch ou checkbox para alternar o estado `square` do `DssBtnGroup`.
- **Controle de Prop `spread`:** Um switch ou checkbox para alternar o estado `spread` do `DssBtnGroup`.
- **Controle de Prop `stretch`:** Um switch ou checkbox para alternar o estado `stretch` do `DssBtnGroup`.
- **Controle de Prop `brand`:** Um seletor (dropdown) com as opções `hub`, `water`, `waste` e `null` para aplicar o acento de marca.
- **Controle de Prop `ariaLabel`:** Um campo de texto para inserir um valor para o `aria-label` do `DssBtnGroup`.

### Composite Logic (Concreta, Não Genérica)

O playground deve demonstrar a `Composite Logic` do `DssBtnGroup` através de exemplos concretos:

1.  **Sincronização de Props:** Um exemplo onde o `DssBtnGroup` tem a prop `flat` ativada, mas os `DssButton` filhos não. Um aviso visual deve indicar o anti-padrão e a renderização incorreta. Ao ativar `flat` nos filhos, a renderização deve ser corrigida.
2.  **Gerenciamento de `border-radius`:** Um `DssBtnGroup` com 3 `DssButton` filhos. Ao ativar a prop `rounded`, os cantos externos do grupo devem ser arredondados, enquanto os cantos internos dos botões intermediários permanecem retos. Ao ativar `square`, todos os `border-radius` devem ser removidos.
3.  **Separadores Visuais:** Demonstração clara dos separadores entre os botões para as variantes `flat`, `push` e `unelevated`, mostrando as diferentes cores (`--dss-gray-300` e `--dss-gray-200`) e como eles se comportam.
4.  **Acento de Marca:** Um `DssBtnGroup` com a prop `brand` definida como `hub`, `water` e `waste`, mostrando o `box-shadow` inset correspondente na borda inferior.

### Estados a Expor (em tabela)

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Default | Estado inicial do componente, sem interações. | Visual | O `DssBtnGroup` não possui estados interativos próprios, apenas o estado padrão. |
| Com `flat` | O grupo de botões com estilo plano. | Visual | Separadores `--dss-gray-300` visíveis. |
| Com `outline` | O grupo de botões com bordas visíveis. | Visual | Bordas duplas colapsadas. |
| Com `push` | O grupo de botões com efeito 3D. | Visual | Separadores `--dss-gray-200` visíveis. |
| Com `unelevated` | O grupo de botões sem sombra. | Visual | Separadores `--dss-gray-200` visíveis. |
| Com `rounded` | O grupo de botões com cantos externos arredondados. | Visual | `border-radius: var(--dss-radius-full)` aplicado. |
| Com `square` | O grupo de botões com cantos retos. | Visual | `border-radius: 0` aplicado. |
| Com `spread` | Os botões distribuídos igualmente. | Visual | `display: flex` e `flex: 1` nos filhos. |
| Com `stretch` | Os botões esticados verticalmente. | Visual | `align-self: stretch` nos filhos. |
| Com `brand='hub'` | O grupo de botões com acento de marca 'hub'. | Visual | `box-shadow` inset com cor `hub`. |
| Com `brand='water'` | O grupo de botões com acento de marca 'water'. | Visual | `box-shadow` inset com cor `water`. |
| Com `brand='waste'` | O grupo de botões com acento de marca 'waste'. | Visual | `box-shadow` inset com cor `waste`. |

---

## 9. Exemplos Obrigatórios (mínimo 6)

1.  Básico unelevated com 3 botões
2.  Outline com ícones
3.  Flat (toolbar de formatação)
4.  Spread (largura total)
5.  Brand Hub + Brand Water
6.  Rounded (pill)
7.  Anti-pattern: prop sync incorreto vs correto

---

## 10. Requisitos de Documentação

-   `DssBtnGroup.md` — Template 13.1 completo (17 seções mínimas)
-   `DSSBTNGROUP_API.md` — API Reference com todos os contratos
-   `README.md` — Quick start com Prop Sync Rule destacada
-   `dss.meta.json` — goldenReference, goldenContext, phase, exceptions, tokens, propsBlocked
-   `DssBtnGroup.example.vue` — 6+ cenários + anti-pattern

---

*Artefato de Governança — DSS v2.2 — 26 Mar 2026*
