# DSS — Faseamento Oficial de Componentes Quasar

> **Status:** Ativo e Normativo
> **Última Atualização:** Março 2026 (Revisão de escopo e ordenação lógica da Fase 2)

## Princípio Fundamental
Todo componente Quasar **DEVE** ser classificado em uma fase antes de entrar no DSS. A fase determina as regras de arquitetura, governança e complexidade permitidas.

---

## FASE 1 — Componentes Básicos (Wrappers DSS)

**Objetivo:** Criar o vocabulário atômico do DSS, substituir o uso direto de Quasar, garantir consistência visual, semântica e de acessibilidade.

**Regra de Ouro da Fase 1:**
O componente deve ser um wrapper direto de **UM único componente Quasar**, sem composição interna relevante, sem layout complexo, com API pública curada e mínima, e sem lógica de negócio.

### Componentes de Fase 1
* **Inputs & Form Controls:** `QInput`, `QTextarea`, `QSelect`, `QCheckbox`, `QRadio`, `QToggle`, `QSlider`, `QRange`, `QFile`
* **Ações:** `QBtn` *(Golden Sample do DSS)*
* **Feedback simples / Status:** `QBadge`, `QChip`, `QAvatar`, `QIcon`, `QSpinner`, `QTooltip`
* **Estruturais simples:** `QSeparator`, `QSpace`

---

## FASE 2 — Componentes Compostos / Estruturais

**Objetivo:** Criar padrões reutilizáveis de UI/UX, resolver composição recorrente entre produtos, definir estruturas de layout e agrupamento.

**Regra de Ouro da Fase 2:**
O componente envolve a **composição de dois ou mais componentes DSS** (ou gerencia estado complexo entre filhos), pode definir layout e estrutura, mas ainda não representa uma feature de negócio. Exige governança explícita de composição.

### Trilha de Execução (Ordem Lógica por Dependência)
A lista abaixo foi reordenada para garantir que componentes base sejam criados antes dos componentes que os consomem, evitando bloqueios de arquitetura.

**Nível 1: Independentes (Base da Fase 2)**
*Não possuem dependências de outros componentes da Fase 2, apenas da Fase 1.*
* `QCard` *(Já selado)*
* `QBtnGroup`, `QOptionGroup`
* `QList`, `QItem`, `QItemSection`, `QItemLabel` *(QItem já selado)*
* `QTab`
* `QBreadcrumbsEl`
* `QStep`
* `QPagination`
* `QDialog`
* `QVirtualScroll`, `QInfiniteScroll`

**Nível 2: Composição de Primeiro Grau**
*Dependem dos componentes do Nível 1.*
* `QTabs`, `QRouteTab` *(dependem de QTab)*
* `QBreadcrumbs` *(depende de QBreadcrumbsEl)*
* `QStepper` *(depende de QStep)*
* `QMenu`, `QBottomSheet` *(dependem de QList/QItem)*
* `QFab` *(base para QFabAction)*
* `QToolbar` *(base para estrutura de página)*

**Nível 3: Composição de Segundo Grau e Estrutura**
*Dependem dos componentes do Nível 2.*
* `QFabAction` *(depende de QFab)*
* `QToolbarTitle`, `QHeader`, `QFooter` *(dependem de QToolbar)*
* `QDrawer` *(depende de QList)*
* `QPopupProxy` *(depende de QMenu ou QDialog)*

**Nível 4: Layouts e Alta Complexidade**
*O topo da cadeia de dependências.*
* `QLayout` *(depende de Header, Footer, Drawer)*
* `QPage`, `QPageContainer` *(dependem de QLayout)*
* `QTable` *(depende de QPagination, QCheckbox, QSpinner, etc.)*
* `QTree`

---

## FASE 3 — Patterns / Recipes (Não são componentes DSS)

**Objetivo:** Acelerar times de produto, documentar boas práticas, exemplificar uso correto do DSS em cenários reais.

**Regra de Ouro da Fase 3:**
Não gera um wrapper DSS. Não vira um componente reutilizável no pacote npm. É puramente documentação, código de exemplo e guias de implementação.

### Patterns de Fase 3
* `QForm`, `QEditor`, `QCarousel`, `QSplitter`, `QScrollArea`, `QResizeObserver`, `QIntersection`, `QNoSsr`

---

## Histórico de Revisões

* **Março 2026:** Reordenação da Fase 2 em "Trilha de Execução" baseada em interdependência, garantindo que componentes consumidos sejam criados antes dos consumidores.
* **Março 2026:** Reclassificação de `QOptionGroup`, `QBtnGroup`, `QFab` e `QFabAction` da Fase 1 para a Fase 2. Justificativa: A regra de ouro da Fase 1 exige que o componente seja um wrapper de um único componente, sem composição interna. Estes componentes gerenciam estado entre múltiplos filhos ou compõem outros componentes internamente, caracterizando comportamento de Fase 2.
* **Fevereiro 2026:** Documento original criado em formato PDF.
