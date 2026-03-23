# DSS — Faseamento Oficial de Componentes Quasar

> **Status:** Ativo e Normativo
> **Última Atualização:** Março 2026 (Revisão de escopo Fase 1/Fase 2)

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

### Componentes de Fase 2
* **Ações Agrupadas e Flutuantes:** `QBtnGroup`, `QFab`, `QFabAction`, `QOptionGroup` *(Reclassificados da Fase 1 por exigirem composição interna ou gestão de estado entre filhos)*
* **Containers e Superfícies:** `QCard`, `QLayout`, `QPage`, `QPageContainer`, `QHeader`, `QFooter`, `QDrawer`, `QToolbar`, `QToolbarTitle`
* **Listas, Agrupamentos e Navegação:** `QList`, `QItem`, `QItemSection`, `QItemLabel`, `QTabs`, `QTab`, `QRouteTab`, `QBreadcrumbs`, `QBreadcrumbsEl`
* **Navegação e Fluxo:** `QStepper`, `QStep`, `QPagination`
* **Overlays e Camadas:** `QDialog`, `QMenu`, `QPopupProxy`, `QBottomSheet`, `QTooltip` *(quando usado como pattern avançado)*
* **Dados e Visualização:** `QTable`, `QVirtualScroll`, `QInfiniteScroll`, `QTree` *(Alta complexidade — nunca Fase 1)*

---

## FASE 3 — Patterns / Recipes (Não são componentes DSS)

**Objetivo:** Acelerar times de produto, documentar boas práticas, exemplificar uso correto do DSS em cenários reais.

**Regra de Ouro da Fase 3:**
Não gera um wrapper DSS. Não vira um componente reutilizável no pacote npm. É puramente documentação, código de exemplo e guias de implementação.

### Patterns de Fase 3
* `QForm`, `QEditor`, `QCarousel`, `QSplitter`, `QScrollArea`, `QResizeObserver`, `QIntersection`, `QNoSsr`

---

## Histórico de Revisões

* **Março 2026:** Reclassificação de `QOptionGroup`, `QBtnGroup`, `QFab` e `QFabAction` da Fase 1 para a Fase 2. Justificativa: A regra de ouro da Fase 1 exige que o componente seja um wrapper de um único componente, sem composição interna. Estes componentes gerenciam estado entre múltiplos filhos ou compõem outros componentes internamente, caracterizando comportamento de Fase 2.
* **Fevereiro 2026:** Documento original criado em formato PDF.
