# DssTabPanel — API Reference

> Wrapper DSS governado sobre QTabPanel. Container estrutural não-interativo de conteúdo de aba.

---

## Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `name` | `string \| number` | — | ✅ Sim | Identificador único do painel. Deve corresponder ao `name` do DssTab associado no DssTabs. Usado pelo DssTabPanels (ou QTabPanels) para sincronizar exibição com a aba ativa. |
| `disable` | `boolean` | `false` | Não | Desabilita o painel, aplicando opacidade reduzida (`--dss-opacity-disabled`) e bloqueando interações com filhos via `pointer-events: none`. |

## Props Bloqueadas (Governança DSS)

| Prop Quasar | Razão do Bloqueio |
|-------------|-------------------|
| `dark` | Dark mode é governado globalmente pelo DSS via `[data-theme="dark"]`. Prop por componente viola a governança centralizada de tema. |

---

## Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `any` | Conteúdo do painel. Aceita qualquer componente DSS ou HTML. Composição é responsabilidade do consumidor (Gate de Composição v2.4). |

**Componentes recomendados no slot:**
- `DssCard` — superfície estrutural
- `DssInput`, `DssSelect`, `DssCheckbox`, `DssRadio` — controles de formulário
- `DssList` + `DssItem` — listas estruturadas
- `DssButton` — ações
- `DssSeparator` — separação visual
- Conteúdo editorial: texto, imagens, tabelas

---

## Eventos

Nenhum evento emitido pelo DssTabPanel.

> O DssTabPanel é um container passivo — a lógica de seleção e visibilidade é gerenciada pelo DssTabPanels (container pai) em conjunto com o DssTabs.

---

## Acessibilidade

| Atributo | Responsável | Valor |
|----------|-------------|-------|
| `role="tabpanel"` | QTabPanel (nativo Quasar) | Gerenciado automaticamente |
| `aria-labelledby` | QTabPanel + QTabPanels | Associado ao `id` do QTab correspondente via `name` |
| `aria-hidden` | QTabPanels | Gerenciado automaticamente (painéis inativos) |

**Navegação por teclado:**
- `Tab`: navega para o primeiro elemento interativo dentro do painel ativo
- Navegação entre painéis: gerenciada pelo DssTabs (setas ←/→)

---

## Tokens Utilizados

| Token | Uso | Localização |
|-------|-----|-------------|
| `--dss-spacing-6` | Padding interno do painel | `2-composition/_base.scss` |
| `--dss-opacity-disabled` | Opacidade no estado disabled | `2-composition/_base.scss` |
| `--dss-border-width-thin` | Outline em high-contrast | `4-output/_states.scss` |
| `--dss-border-width-thick` | Borda de acento de marca | `4-output/_brands.scss` |
| `--dss-focus-ring` | (Reservado — sem uso direto em v1.0.0) | — |
| `--dss-hub-600` / `--dss-hub-400` | Acento Hub (light/dark) | `4-output/_brands.scss` |
| `--dss-water-500` / `--dss-water-400` | Acento Water (light/dark) | `4-output/_brands.scss` |
| `--dss-waste-600` / `--dss-waste-500` | Acento Waste (light/dark) | `4-output/_brands.scss` |

---

## Estados

| Estado | Aplicável | Implementação |
|--------|-----------|---------------|
| default | ✅ Sim | Display normal |
| disabled | ✅ Sim | `opacity: var(--dss-opacity-disabled)` + `pointer-events: none` |
| hover | ❌ Não aplicável | Pertence aos filhos interativos |
| focus | ❌ Não aplicável | Pertence aos filhos interativos |
| active | ❌ Não aplicável | Pertence aos filhos interativos |
| loading | ❌ Não aplicável | Filhos gerenciam loading individualmente |
| error | ❌ Não aplicável | Pertence ao conteúdo dos filhos |
| indeterminate | ❌ Não aplicável | Não se aplica a painéis de conteúdo |

---

## Exceções Documentadas

| ID | Valor | Localização | Justificativa |
|----|-------|-------------|---------------|
| EXC-01 | `.dss-tab-panel.q-tab-panel` (seletor composto) | `2-composition/_base.scss`, `4-output/_states.scss`, `4-output/_brands.scss` | Seletor composto necessário para sobrescrever padding nativo do QTabPanel com `--dss-spacing-6`. Ambas as classes ficam no mesmo elemento raiz (`<q-tab-panel :class="tabPanelClasses">`). Precedente: DssTabs EXC-01. |
| EXC-02 | `1px solid ButtonText` | `4-output/_states.scss` | Forced-colors — system keywords obrigatórios. |
| EXC-03 | `GrayText` | `4-output/_states.scss` | Forced-colors estado disabled — system keyword padrão. |
| EXC-04 | `display: block !important` | `4-output/_states.scss — @media print` | Override do `v-show` (inline style `display: none`) do QTabPanels em contexto de impressão. Nenhum token DSS cobre visibilidade forçada em print. |

---

## Comportamentos Implícitos

| Comportamento | Detalhe |
|---------------|---------|
| Visibilidade | Gerenciada pelo QTabPanels (futuro DssTabPanels) via v-model e `name` prop |
| Brand propagation | Recebe `[data-brand]` via cascata CSS do DssTabs ancestral — sem prop `brand` própria |
| `inheritAttrs: false` | Atributos HTML extras são forwarded ao div raiz via `v-bind="$attrs"` |
| `role="tabpanel"` | Aplicado nativamente pelo QTabPanel — DssTabPanel não precisa declarar |

---

## Paridade com Golden Reference (DssCard)

| Aspecto | DssCard | DssTabPanel | Justificativa de Divergência |
|---------|---------|-------------|------------------------------|
| `defineOptions({ name, inheritAttrs: false })` | ✅ | ✅ | Igual |
| `v-bind="$attrs"` no root | ✅ | ✅ | Igual |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ | Igual |
| `@include dss-transition` | ✅ | ❌ | DssTabPanel não tem transições próprias — container passivo |
| Token `--dss-surface-default` | ✅ | ❌ | DssTabPanel é transparente — herda do container pai |
| Token `--dss-radius-lg` | ✅ | ❌ | Border-radius pertence ao DssTabPanels (container), não ao painel individual |
| Brand via prop | ✅ (prop `brand`) | ❌ (cascata CSS) | Brand é propagado pelo DssTabs via `[data-brand]` — sem prop própria necessária |
| Estado `disabled` | ❌ | ✅ | DssCard não é desabilitável; DssTabPanel suporta `disable` do QTabPanel |
| Touch target `::before` | ❌ (surface) | ❌ (container) | Ambos são não-interativos — Opção B correta |
| Seletor Quasar interno | ❌ | ✅ (EXC-01) | DssTabPanel precisa sobrescrever padding do QTabPanel |
