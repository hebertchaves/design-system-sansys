# 🎯 PRÉ-PROMPT ESPECÍFICO: DssBreadcrumbsEl (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssBreadcrumbsEl`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssBreadcrumbsEl` |
| **Equivalente Quasar** | `QBreadcrumbsEl` |
| **Fase** | Fase 2 (Componente Estrutural/Interativo) |
| **Nível de Execução** | Nível 1 — Independente |
| **Classificação** | Elemento individual de trilha de navegação (breadcrumb) |
| **Golden Reference** | `DssChip` (para estados interativos quando clicável) |
| **Golden Context** | `DssBreadcrumbs` (container pai futuro — Nível 2) |

**Justificativa da Fase 2:** O `DssBreadcrumbsEl` é um elemento de navegação que pode ser clicável (link) ou estático (item atual). Ele compõe `DssIcon` internamente e serve como bloco de construção fundamental para o `DssBreadcrumbs` (Nível 2).

---

## 2. O GRANDE RISCO ARQUITETURAL: DUALIDADE LINK/TEXTO

### 2.1 O Problema do QBreadcrumbsEl

O `QBreadcrumbsEl` nativo do Quasar renderiza um `<a>` quando possui a prop `to` (roteamento Vue Router) ou `href`, e um `<span>` quando é apenas texto estático. Essa dualidade cria dois cenários distintos de acessibilidade e estilo que o DSS deve gerenciar explicitamente.

**Decisão Arquitetural:**
O `DssBreadcrumbsEl` fará o wrap direto do `<q-breadcrumbs-el>`, mas deve:
1. Aplicar estilos distintos para o estado **clicável** (link — com hover e cursor pointer) e **estático** (item atual — sem interação).
2. Garantir que o item atual (último da trilha) seja visualmente diferenciado e marcado com `aria-current="page"`.

### 2.2 Gate de Responsabilidade v2.4

O `DssBreadcrumbsEl` é **condicionalmente interativo**. Quando clicável (prop `to` ou `href` presente), deve possuir estados de `:hover` e `:focus-visible`. Quando estático (item atual), **não deve ter estados de interação** — é um elemento puramente informativo.

Esta dualidade é uma exceção prevista ao Gate de Responsabilidade e deve ser documentada formalmente.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

### Props Expostas (Permitidas)
- `label` (String) → Texto do item de breadcrumb.
- `icon` (String) → Ícone opcional a ser exibido antes do label.
- `to` (String | Object) → Destino de roteamento Vue Router (torna o item clicável).
- `href` (String) → URL externa (alternativa ao `to`).
- `disable` (Boolean) → Desabilita a interação com o item.
- `tag` (String) → Permite sobrescrever a tag HTML renderizada (padrão: `a` quando clicável, `span` quando estático).

### Props Bloqueadas (Proibidas)
- `ripple` → O DSS não usa ripple em elementos de navegação estrutural.
- `exact` → Gerenciado pelo `DssBreadcrumbs` pai, não pelo elemento individual.
- `active-class` / `exact-active-class` → O DSS governa as classes de estado ativo via CSS/tokens.

---

## 4. GOVERNANÇA DE TOKENS

### 4.1 Estado Clicável (com `to` ou `href`)
- **Padrão:** Cor de texto secundária (`var(--dss-text-subtle)`) com `text-decoration: none`.
- **Hover/Focus:** Cor de texto principal (`var(--dss-text-body)`) e `text-decoration: underline`.
- **Focus-visible:** `outline` padrão do DSS (`var(--dss-focus-ring)`).
- **Disabled:** Opacidade reduzida (`var(--dss-opacity-disabled)`) e `pointer-events: none`.

### 4.2 Estado Estático (item atual — sem `to` ou `href`)
- **Padrão:** Cor de texto principal (`var(--dss-text-body)`) com `font-weight` semibold (`var(--dss-font-weight-semibold)`).
- **Sem hover, sem cursor pointer, sem interação.**

### 4.3 Ícone
- O ícone deve usar o tamanho `sm` do DSS (`var(--dss-icon-size-sm)`) e herdar a cor do texto do estado atual.

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

O `DssBreadcrumbsEl` é um elemento de navegação estrutural.

- O item atual (último da trilha) **deve** receber `aria-current="page"` — este atributo é gerenciado pelo `DssBreadcrumbs` pai via prop, mas o `DssBreadcrumbsEl` deve aceitar e propagar o atributo via `v-bind="$attrs"`.
- Quando clicável, deve ser um `<a>` com `href` válido para garantir navegabilidade por teclado nativa.
- O separador entre itens (ex: `/` ou `>`) é responsabilidade do `DssBreadcrumbs` pai — **não** do `DssBreadcrumbsEl`.

---

## 6. SUBCOMPONENTES E COMPOSIÇÃO

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenReference": "DssButton",
  "goldenContext": "DssBreadcrumbs",
  "subcomponents": [],
  "compositionRequirements": ["DssIcon"],
  "compositionFuture": ["DssBreadcrumbs"]
}
```

---

## 7. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 4)

1. **Básico** — Item clicável apenas com `label` e prop `to`.
2. **Com Ícone** — Item clicável com `icon` e `label`.
3. **Item Atual** — Item estático (sem `to`), representando a página atual, com `aria-current="page"`.
4. **Estados** — Demonstração de item clicável, item atual e item desabilitado (`disable`).

---

## 8. SUPERFÍCIE DE PLAYGROUND

### 8.1 Controles Obrigatórios

Para garantir a testabilidade e a flexibilidade do `DssBreadcrumbsEl`, os seguintes controles devem ser expostos no Storybook ou ambiente de playground:

- **`label` (String):** Permite alterar o texto exibido no item do breadcrumb. Essencial para testar diferentes comprimentos de texto e internacionalização.
- **`icon` (String):** Permite adicionar ou remover um ícone, testando a renderização com e sem o elemento visual.
- **`to` (String | Object):** Controla o comportamento de link do item. Deve ser possível alternar entre um link válido (para testar estados interativos) e `null` ou `undefined` (para testar o estado estático).
- **`href` (String):** Alternativa ao `to` para links externos. Deve ser testável em conjunto com `to` (mutuamente exclusivo).
- **`disable` (Boolean):** Permite ativar e desativar o item, verificando os estilos e a inatividade esperada.
- **`aria-current` (String):** Embora gerenciado pelo componente pai, é crucial poder forçar este atributo para testes de acessibilidade do `DssBreadcrumbsEl` isoladamente, garantindo que a marcação `aria-current="page"` seja aplicada corretamente no item estático.

### 8.2 Lógica Composta (Concrete Logic)

A lógica central do `DssBreadcrumbsEl` reside na sua capacidade de adaptar-se dinamicamente com base na presença das props `to` ou `href`. Esta é uma implementação concreta da dualidade link/texto:

- **Renderização Condicional de Tag:**
  - Se `to` ou `href` estiver presente e não for `null`/`undefined`, o componente deve renderizar um elemento `<a>` (ou a `tag` especificada pelo usuário, se aplicável) para garantir a semântica de link e a navegabilidade. Este elemento deve ser focado e clicável.
  - Se `to` e `href` estiverem ausentes ou `null`/`undefined`, o componente deve renderizar um elemento `<span>` (ou a `tag` especificada pelo usuário) para um item estático. Este elemento não deve ser interativo.
- **Aplicação de Estilos Baseados no Estado:**
  - O componente deve aplicar classes CSS ou estilos inline que diferenciem visualmente os estados clicável (com `hover`, `focus-visible`) e estático (sem interação, com `font-weight` semibold).
  - A propriedade `text-decoration: underline` deve ser aplicada especificamente no estado `:hover` de itens clicáveis, conforme a exceção `EXC-02`.
- **Propagação de Atributos de Acessibilidade:**
  - O `DssBreadcrumbsEl` deve ser capaz de receber e propagar atributos arbitrários via `v-bind="$attrs"`, garantindo que `aria-current="page"` possa ser aplicado ao item estático quando ele representa a página atual na trilha de navegação.

### 8.3 Estados a Expor

| Estado | Descrição | Props/Contexto | Tokens/Estilos Aplicados |
|---|---|---|---|
| **Padrão (Clicável)** | Item de navegação interativo, aguardando interação. | `label="Home"`, `to="/home"` | `var(--dss-text-subtle)`, `text-decoration: none` |
| **Hover (Clicável)** | Item clicável com o cursor sobre ele. | `label="Home"`, `to="/home"` + `:hover` | `var(--dss-text-body)`, `text-decoration: underline` |
| **Focus-visible (Clicável)** | Item clicável focado via teclado. | `label="Home"`, `to="/home"` + `:focus-visible` | `var(--dss-focus-ring)` |
| **Desabilitado (Clicável)** | Item clicável, mas temporariamente inativo. | `label="Home"`, `to="/home"`, `disable=true` | `var(--dss-opacity-disabled)`, `pointer-events: none` |
| **Estático (Atual)** | Item não interativo, representando a página atual. | `label="Página Atual"`, `aria-current="page"` | `var(--dss-text-body)`, `font-weight: var(--dss-font-weight-semibold)` |
| **Estático (Outro)** | Item não interativo, parte da trilha, mas não a página atual. | `label="Categoria"` | `var(--dss-text-body)` |

---

## 9. EXCEÇÕES PREVISTAS

### EXC-01: Seletor Composto com Classe Quasar Interna (Level 1 DOM Pattern)
- **Justificativa:** O `QBreadcrumbsEl` aplica a classe `.q-breadcrumbs__el` no elemento raiz renderizado. O DSS usa o seletor composto `.dss-breadcrumbs-el.q-breadcrumbs__el` para aplicar estilos com especificidade adequada sem recorrer a seletores descendentes. Esta é uma exceção formal ao Gate de Composição v2.4 (Regra 1) — o seletor referencia uma classe interna do Quasar, mas o padrão segue o **Level 1 DOM pattern** consolidado na Fase 2 (precedentes: DssTabPanel EXC-01, DssTabPanels EXC-01).

> **Nota de Governança (GAP-04 — corrigido em 2026-04-10):** O pré-prompt original descrevia seletores descendentes (`.dss-breadcrumbs-el a` e `.dss-breadcrumbs-el span`). A implementação adotou corretamente o seletor composto `.dss-breadcrumbs-el.q-breadcrumbs__el` — decisão arquitetural superior que elimina a necessidade de descendant selectors.

### EXC-02: `text-decoration` Hardcoded
- **Justificativa:** O `text-decoration: underline` no estado hover é um padrão de UX amplamente aceito para links em contexto de navegação estrutural (WCAG 2.1 Success Criterion 1.4.1). Não existe token DSS para `text-decoration` — esta é uma exceção formal.

---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento da dualidade link/texto e a necessidade de estilos distintos para cada estado.
2. **Confirmar** que o separador entre itens **não** é responsabilidade deste componente.
3. **Confirmar** a necessidade de propagar `aria-current` via `v-bind="$attrs"`.
4. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
