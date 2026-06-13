# 🤖 PROMPT DIRECIONADOR: Criação de Testes Unitários Legados (35 Componentes)
> **Autor:** Chat Orquestrador Estratégico (Manus AI)  
> **Destinatário:** Chat Executor (Claude)  
> **Status:** Aprovado para Execução Imediata  

---

## 🎯 Objetivo

Com base no **Scorecard Final de Saúde** do DSS, temos **35 componentes** que ainda não possuem arquivos de testes unitários `{NomeDoComponente}.test.js` correspondentes. Para mitigar esse gap de qualidade de forma estruturada, eficiente e sem sobrecarga, você deve executar a criação desses arquivos utilizando uma **abordagem distribuída por Famílias de Componentes**, dividida entre **7 Agentes Virtuais Especializados**.

Cada agente virtual será responsável por uma família específica de componentes, garantindo que as especificidades de cada domínio técnico (navegação, feedback, layout, etc.) sejam rigorosamente validadas.

---

## 📐 Diretrizes Técnicas de Qualidade (O Padrão de Ouro)

Todos os arquivos de teste criados devem seguir rigorosamente as melhores práticas do mercado de TI e o padrão estabelecido no `TEMPLATE_FASE3.md` (Seção 11):

1. **Localização Correta:** O arquivo de teste deve viver na raiz da pasta do componente (ex: `packages/core/components/base/DssCard/DssCard.test.js`).
2. **Uso de Mocks e Spies:** Sempre que o componente emitir eventos (ex: `@click`, `@update:modelValue`), use `vi.fn()` ou verifique os eventos emitidos via `wrapper.emitted()`.
3. **Mocks de Timers:** Para componentes que utilizam transições ou timeouts (ex: `DssAjaxBar`, `DssInnerLoading`), use `vi.useFakeTimers()` e `vi.advanceTimersByTime()` para garantir testes determinísticos.
4. **Isolamento de Dependências:** Não teste comportamentos nativos do Quasar. Se o componente apenas encapsula um componente do Quasar, teste a **propagação correta de propriedades (props)**, a **aplicação de classes CSS de Brand do DSS**, e as **exceções de governança**.
5. **Acessibilidade (ARIA):** Validar se o componente possui os atributos ARIA necessários (ex: `role="progressbar"` para progresso, `aria-expanded` para menus/dropdowns, etc.).

---

## 👥 Divisão de Trabalho: Os 7 Agentes de Família

Abaixo está o mapeamento dos 35 componentes divididos entre os 7 agentes especializados. Cada agente deve criar exatamente os arquivos de teste listados em seu domínio:

### 👤 Agente 1: Família de Ações Compostas & Grupos (5 Componentes)
* **Domínio:** Componentes interativos de ação compostos ou agrupados.
* **Componentes a Testar:**
  1. `DssBtnDropdown`
  2. `DssBtnGroup`
  3. `DssBtnToggle`
  4. `DssFab`
  5. `DssFabAction`
* **Foco do Teste:** Propagação de eventos de clique, aplicação de estados de layout agrupados, controle de estado aberto/fechado (para dropdown/fab) e marcas de Brand.

### 👤 Agente 2: Família de Navegação Estrutural & Abas (5 Componentes)
* **Domínio:** Fluxo, navegação global e estruturação de rotas.
* **Componentes a Testar:**
  1. `DssBreadcrumbs`
  2. `DssBreadcrumbsEl`
  3. `DssPagination`
  4. `DssRouteTab`
  5. `DssStepper`
* **Foco do Teste:** Navegação por etapas (stepper), cálculo de páginas ativas (pagination), roteamento de abas (route-tab) e montagem de trilha de navegação (breadcrumbs).

### 👤 Agente 3: Família de Containers de Conteúdo & Painéis (5 Componentes)
* **Domínio:** Estruturas de apresentação de conteúdo em abas ou seções isoladas.
* **Componentes a Testar:**
  1. `DssCard`
  2. `DssExpansionItem`
  3. `DssTabPanel`
  4. `DssTabPanels`
  5. `DssSeparator`
* **Foco do Teste:** Slots de conteúdo (default, header, actions), controle de estado expandido/colapsado (expansion-item), sincronização de abas ativas e estilização visual de separadores.

### 👤 Agente 4: Família de Progresso & Feedback Visual (5 Componentes)
* **Domínio:** Indicadores de carregamento, estados de transição e feedback de sistema.
* **Componentes a Testar:**
  1. `DssAjaxBar`
  2. `DssCircularProgress`
  3. `DssLinearProgress`
  4. `DssInnerLoading`
  5. `DssSkeleton`
* **Foco do Teste:** Atributos ARIA de progresso (`role="progressbar"`), controle de tempo/animação via timers simulados, estados ativo/inativo e renderização de placeholders (skeleton).

### 👤 Agente 5: Família de Layout Global & Listas (5 Componentes)
* **Domínio:** Estruturas de grid, listas de dados e containers de layout de página.
* **Componentes a Testar:**
  1. `DssLayout`
  2. `DssList`
  3. `DssItem`
  4. `DssItemSection`
  5. `DssSpace`
* **Foco do Teste:** Flexbox e alinhamento, espaçamento inline (space), slots de seções de lista (item-section), e propagação de propriedades estruturais.

### 👤 Agente 6: Família de Scroll & Posicionamento Sticky (5 Componentes)
* **Domínio:** Comportamentos dinâmicos de tela, rolagem infinita e elementos fixos.
* **Componentes a Testar:**
  1. `DssInfiniteScroll`
  2. `DssVirtualScroll`
  3. `DssPageScroller`
  4. `DssPageSticky`
  5. `DssParallax`
* **Foco do Teste:** Disparo de eventos de rolagem (infinite-scroll), renderização eficiente de itens visíveis (virtual-scroll), comportamento de scroll-to-top (page-scroller) e fixação de elementos (page-sticky).

### 👤 Agente 7: Família de Mídia & Identidade Básica (5 Componentes)
* **Domínio:** Exibição de recursos visuais básicos, avatares, imagens, ícones e vídeos.
* **Componentes a Testar:**
  1. `DssAvatar`
  2. `DssIcon`
  3. `DssImg`
  4. `DssVideo`
  5. `DssSpinner`
* **Foco do Teste:** Resolução de fontes de ícones, carregamento e tratamento de erros de imagem (fallback), propriedades nativas de vídeo (autoplay, controls), tamanhos de avatar e animações de spinners.

---

## 🧪 Critérios de Aceite e Validação

Você deve executar a geração dos arquivos de teste e validar que:

1. **Todos os 35 arquivos de teste foram criados nos locais corretos.**
2. **A suíte de testes completa roda sem erros:**
   * Execute `npm run test` (ou o comando equivalente do Vitest configurado no monorepo).
   * **100% dos testes devem passar com sucesso.**
3. **Nenhuma quebra de build foi introduzida:**
   * Execute `npm run core:build` para garantir que os arquivos `.test.js` adicionados não contaminaram os builds de distribuição.

---

## 📢 Instruções de Commit

Quando concluir todas as gerações e passar com sucesso na validação local, faça o commit das alterações com a mensagem padrão:

> `test(quality): adiciona cobertura de testes unitários para 35 componentes legados`

Envie o relatório de sucesso detalhando os arquivos criados e os resultados da execução dos testes de volta para o chat orquestrador estratégico. Boa execução!
