# Pré-prompt de Criação de Componente DSS: DssPagination

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssPagination`
- **Família:** Navegação Estrutural
- **Nível de Composição:** Nível 1 (Componente Base)
- **Golden Reference:** `DssChip` (Componente interativo com touch target próprio)
- **Golden Context:** `DssBtnGroup` (Container de botões coordenados interativos)
- **Componente Quasar Base:** `QPagination`
- **Dependências Diretas:** Nenhuma (Usa o motor interno do Quasar)

**Justificativa da Fase 2:** O `DssPagination` é um componente fundamental para a **navegação eficiente e intuitiva** em aplicações que lidam com grandes volumes de dados, como tabelas, listas de resultados de busca e feeds de conteúdo. Ele permite que os usuários **percorram o conteúdo dividido em páginas de forma controlada**, melhorando a usabilidade e a performance da interface. No contexto do Design System Sansys (DSS), o `DssPagination` não apenas padroniza a experiência de paginação, mas também **garante consistência visual rigorosa**, **acessibilidade robusta** (seguindo diretrizes WCAG) e **suporte nativo ao sistema de marcas** (`hub`, `water`, `waste`), assegurando que a identidade visual da Sansys seja mantida em todos os pontos de interação. Sua implementação como um wrapper do `QPagination` do Quasar, com as devidas adaptações, otimiza o tempo de desenvolvimento e mantém a compatibilidade com o ecossistema existente, ao mesmo tempo em que adere aos padrões de governança do DSS.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Motor QPagination sem slot API (CRÍTICO)

O `QPagination` do Quasar não fornece API de slot para botões individuais de página. Isso torna impossível substituir os botões internos por `DssButton`. 

**Mitigação:** O `DssPagination` deve atuar como um wrapper que utiliza o `QPagination` como motor de renderização e lógica. Todo o theming visual deve ser feito via sobreescrita de seletores CSS internos estáveis e da propriedade CSS `--q-color-hub`. Esta é uma exceção formal ao Gate de Composição v2.4 (EXC-01).

### 2.2. Gate de Responsabilidade v2.4

O `DssPagination` é responsável por:
1. Gerenciar o estado da página atual (`v-model`).
2. Configurar a janela de páginas visíveis e links de limite/direção.
3. Aplicar o theming correto baseado na prop `brand` (hub, water, waste).
4. Garantir a acessibilidade correta (roles e aria-labels).

Ele **delega** a lógica complexa de cálculo de páginas e elipses para o motor do Quasar.

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-pagination>`. Não há slots expostos, pois o motor interno não suporta injeção de conteúdo customizado nos botões.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

Esta seção detalha as propriedades (`props`) que o componente `DssPagination` expõe para configuração externa, permitindo aos desenvolvedores controlar seu comportamento e aparência de acordo com as necessidades da aplicação, sempre em conformidade com as diretrizes do DSS.

**Controle de Estado:**
- `modelValue` / `v-model` (Number) — **Página atual selecionada.** Esta prop é **obrigatória** e bidirecional, utilizada para controlar e refletir a página atualmente ativa na paginação. Seu valor deve ser um número inteiro positivo que corresponde ao índice da página.
- `max` (Number) — **Número total de páginas disponíveis.** Esta prop é **obrigatória** e define o limite superior para a navegação. O componente calculará e exibirá os botões de página com base neste valor.
- `maxPages` (Number) — **Número máximo de botões de página visíveis simultaneamente.** Define a "janela" de páginas exibidas no componente. Se o número total de páginas (`max`) exceder `maxPages`, reticências (`ellipses`) serão exibidas para indicar páginas ocultas. O valor padrão é `5`.

**Comportamento e Navegação:**
- `disable` (Boolean) — Quando `true`, **desabilita completamente a paginação**, tornando-a não interativa e aplicando estilos visuais que indicam seu estado desativado (e.g., opacidade reduzida). Impede qualquer interação do usuário com os botões de página.
- `readonly` (Boolean) — Quando `true`, **bloqueia a interação do usuário** com a paginação, mas **mantém sua aparência visual normal**, sem os estilos de desabilitação. Útil para cenários onde a paginação deve ser exibida, mas não alterável pelo usuário.
- `ellipses` (Boolean) — Quando `true` (padrão), **exibe indicadores de reticências** (`...`) para representar blocos de páginas que estão fora da janela de `maxPages` visível. Melhora a clareza em paginações com muitas páginas.
- `boundaryLinks` (Boolean) — Quando `true`, **exibe botões dedicados para navegar diretamente para a primeira e a última página** do conjunto. Facilita a navegação rápida em grandes conjuntos de dados.
- `directionLinks` (Boolean) — Quando `true` (padrão), **exibe botões para navegar para a página anterior e a próxima**. Essencial para a navegação sequencial.

**Aparência e Theming:**
- `size` (String) — **Define o tamanho visual dos botões de paginação.** Aceita os valores `xs`, `sm`, `md`, `lg`. O tamanho padrão é `md`. Esta prop influencia o espaçamento, altura e tipografia dos botões.
- `flat` (Boolean) — Quando `true`, aplica uma **variante visual "plana"** ao botão ativo, removendo o fundo preenchido e destacando-o apenas pela cor do texto e, opcionalmente, uma borda sutil. Ideal para interfaces mais minimalistas.
- `outline` (Boolean) — Quando `true`, aplica uma **variante visual "contornada"** ao botão ativo, exibindo-o com uma borda colorida e fundo transparente. Complementa a variante `flat` ou pode ser usada independentemente.
- `round` (Boolean) — Quando `true`, renderiza os **botões de paginação com formato circular**, em vez do padrão retangular. Aplica `--dss-radius-full` para um visual mais suave.
- `brand` (String) — **Define o contexto de marca para a paginação.** Aceita os valores `hub`, `water`, `waste`. Esta prop é crucial para aplicar as cores e estilos específicos da marca Sansys ao componente, garantindo a coesão visual com o restante do sistema.

**Acessibilidade:**
- `ariaLabel` (String) — **Fornece um rótulo acessível para o container raiz da paginação.** Este rótulo é lido por tecnologias assistivas, como leitores de tela, para descrever o propósito do componente. O valor padrão é `'Navegação por páginas'`, mas pode ser customizado para contextos específicos.

### 3.2. Props Bloqueadas (Governança DSS)

```json
"propsBlocked": ["color", "active-color", "text-color", "active-text-color", "dark", "icon-first", "icon-last", "icon-prev", "icon-next"],
"propsBlockedJustification": {
  "color": "Cores são governadas pela prop 'brand' e tokens DSS.",
  "active-color": "Cor ativa é derivada da prop 'brand'.",
  "text-color": "Cor do texto é governada por tokens DSS (--dss-text-hub).",
  "active-text-color": "Cor do texto ativo é governada por tokens DSS (--dss-text-on-hub).",
  "dark": "Modo escuro governado globalmente pelo DSS via [data-theme='dark'].",
  "icon-*": "Ícones de navegação devem ser padronizados pelo DSS e não customizáveis por instância."
}
```

## 4. Governança de Tokens e CSS

O `DssPagination` deve utilizar exclusivamente tokens do DSS para estilização.

### 4.1. Cores e Theming
- **Botão Ativo (Fundo):** `--dss-action-hub` (injetado via `--q-color-hub`).
- **Botão Ativo (Texto):** `--dss-text-on-hub`.
- **Botões Inativos (Texto):** `--dss-text-hub`.
- **Marcas (Brands):** `--dss-action-hub`, `--dss-action-water`, `--dss-action-waste` (aplicados dinamicamente baseados na prop `brand`).

### 4.2. Espaçamento e Dimensões
- **Gap entre botões:** `--dss-gap-1`.
- **Altura dos botões:** `--dss-compact-control-height-xs`, `-sm`, `-md`, `-lg` (mapeados a partir da prop `size`).

### 4.3. Tipografia
- **Tamanho da Fonte:** `--dss-font-size-xs` (para sizes xs/sm), `--dss-font-size-sm` (para size md), `--dss-font-size-md` (para size lg).
- **Peso da Fonte:** `--dss-font-weight-medium` (inativos), `--dss-font-weight-bold` (ativo na variante flat).

### 4.4. Forma e Feedback
- **Raio de Borda:** `--dss-radius-md` (padrão), `--dss-radius-full` (variante round).
- **Bordas:** `--dss-border-width-thin`, `--dss-border-width-medium` (variante outline).
- **Transições:** `--dss-duration-150` com `--dss-easing-standard`.
- **Disabled:** `--dss-opacity-disabled`.

## 5. Acessibilidade e Estados

- **Role:** O container raiz deve receber `role="navigation"` e o `aria-label` configurado.
- **Página Ativa:** O QPagination gerencia internamente `aria-current="page"` no botão ativo. O DSS deve preservar este comportamento.
- **Foco:** O foco deve ser visível via `outline: 2px solid white` em `:focus-visible`.
- **Navegação por Teclado:** Suporte a `Tab` para navegar entre botões e `Enter`/`Space` para ativar.
- **Estado Disabled:** Aplica `pointer-events: none` e `opacity: var(--dss-opacity-disabled)`.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssPagination.example.vue` deve cobrir:

1. **Padrão:** Paginação simples com 10 páginas, size `md`.
2. **Navegação Completa:** Paginação com `boundary-links` e `direction-links` ativos, `max-pages` configurado.
3. **Variantes Visuais:** Demonstração das variantes `flat`, `outline` e `round`.
4. **Marcas (Brands):** Demonstração das cores `hub`, `water` e `waste`.
5. **Tamanhos:** Demonstração dos tamanhos `xs`, `sm`, `md` e `lg`.
6. **Estados:** Demonstração dos estados `disable` e `readonly`.

## 7. Exceções aos Gates v2.4

### EXC-01: Motor QPagination
- **Regra Violada:** Gate de Composição v2.4 (Substituição de subcomponentes).
- **Justificativa:** O QPagination não fornece API de slot para botões individuais. A lógica de paginação é inteiramente gerenciada pelo Quasar, e a substituição por `DssButton` é impossível sem reescrever o motor do zero.

### EXC-Gate-01: Seletores CSS Internos
- **Regra Violada:** Gate de Composição v2.4 (Uso de seletores internos do Quasar).
- **Justificativa:** Para aplicar os tokens DSS, é necessário sobrescrever seletores como `.q-pagination__middle` e `.q-pagination .q-btn`. A propriedade `--q-color-hub` é usada para conectar os tokens de marca. O uso de `background-color: transparent !important` é necessário na variante flat/outline para sobrescrever o `!important` nativo do Quasar.

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios

- **Brand**: [hub, water, waste] — permite testar a aplicação das cores de marca.
- **Size**: [xs, sm, md, lg] — permite testar a escala de dimensões.
- **Variante**: [padrão, flat, outline, round] — permite testar os estilos visuais.
- **Total de Páginas (max)**: Input numérico (ex: 1 a 100) — permite testar a geração de botões.
- **Páginas Visíveis (max-pages)**: Input numérico (ex: 3 a 10) — permite testar a janela de paginação e elipses.
- **Links de Navegação**: Toggles para `boundary-links` e `direction-links`.
- **Estado**: Toggles para `disable` e `readonly`.

### 8.2 Composite Logic

- O playground **deve** demonstrar a paginação controlando um conjunto de dados simulado.
- Crie um array simulado de pelo menos 50 itens (ex: "Item 1", "Item 2", ..., "Item 50").
- Configure o playground para exibir 5 itens por página.
- Ao alterar a página no `DssPagination`, a lista de itens exibida abaixo do componente deve ser atualizada para refletir a página atual (ex: Página 2 exibe itens 6 a 10).
- A alteração do controle `max` deve recalcular o número total de páginas disponíveis.

### 8.3 Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Página Inicial** | Primeira página ativa, botão "Anterior" desabilitado | Visual | `modelValue = 1` |
| **Página Intermediária** | Página no meio do conjunto, elipses visíveis | Visual | `modelValue = 5` (em um total de 10) |
| **Última Página** | Última página ativa, botão "Próximo" desabilitado | Visual | `modelValue = max` |
| **Hover** | Fundo do botão levemente escurecido | Visual | Mouse over em botão inativo |
| **Focus** | Ring de foco visível no botão | Visual | Navegação por teclado (`Tab`) |
| **Disabled** | Opacidade reduzida, sem interatividade | Visual | Prop `disable="true"` |
| **Brand Aplicada** | Cor do botão ativo reflete a marca selecionada | Visual | Alteração no controle `brand` |
