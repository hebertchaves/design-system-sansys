# DssTabPanel — Documentação Normativa DSS v2.2

> **Status:** Pronto para Auditoria  
> **Fase:** 1 — Componente Independente  
> **Golden Reference:** DssCard  
> **Golden Context:** DssTabs  
> **Quasar Base:** QTabPanel  
> **Versão:** 1.0.0

---

## 1. Visão Geral

O `DssTabPanel` é o container de conteúdo de aba do Design System Sansys. É um wrapper DSS governado sobre o `QTabPanel` do Quasar Framework.

**O que faz:**
- Fornece container estrutural com espaçamento interno governado por tokens DSS
- Associa conteúdo a uma aba específica via prop `name`
- Suporta estado `disabled` via prop `disable`
- Propaga contexto de marca recebido via cascata CSS do `DssTabs` ancestral

**O que NÃO faz:**
- Não gerencia lógica de show/hide (responsabilidade do `DssTabPanels` / `QTabPanels`)
- Não possui estados interativos próprios (hover, focus, active)
- Não instancia componentes filhos — composição é responsabilidade do consumidor
- Não aceita prop `dark` — dark mode é global no DSS

---

## 2. Arquitetura

```
DssTabPanel/
├── 1-structure/
│   └── DssTabPanel.ts.vue         ← Implementação canônica (Vue 3 + TS)
├── 2-composition/
│   └── _base.scss                  ← Padding, disabled state (tokens genéricos)
├── 3-variants/
│   └── index.scss                  ← Vazio v1.0.0 — camada preservada
├── 4-output/
│   ├── _states.scss                ← Dark mode, high-contrast, forced-colors, print
│   ├── _brands.scss                ← Hub, Water, Waste (via cascata [data-brand])
│   └── index.scss                  ← Orchestrador L4
├── composables/
│   ├── index.ts
│   └── useTabPanelClasses.ts       ← Classes reativas
├── types/
│   └── tab-panel.types.ts          ← TabPanelProps, TabPanelSlots
├── DssTabPanel.md                  ← Este arquivo
├── DssTabPanel.module.scss         ← Orchestrador principal L2 → L3 → L4
├── DssTabPanel.example.vue         ← 3 cenários de uso
├── DssTabPanel.vue                 ← Entry Point Wrapper (re-export puro)
├── DSSTABPANEL_API.md              ← API Reference completa
├── dss.meta.json                   ← Metadados de auditoria
├── README.md                       ← Quick start
└── index.js                        ← Barrel export
```

---

## 3. Mapeamento Estrutural Quasar × DSS

| Aspecto | QTabPanel (Quasar) | DssTabPanel (DSS) |
|---------|-------------------|------------------|
| Prop `name` | `String \| Number` | Mantida — obrigatória |
| Prop `disable` | `Boolean` | Mantida |
| Prop `dark` | `Boolean` | **Bloqueada** — DSS governa globalmente |
| Padding | 16px (Material Design) | `var(--dss-spacing-6)` (DSS) via EXC-01 |
| role | `tabpanel` | Gerenciado nativamente pelo QTabPanel |

---

## 4. Gate de Responsabilidade v2.4

O `DssTabPanel` é um **container estrutural não-interativo**.

- ❌ **NÃO possui** estados de `:hover`, `:focus` ou `:active` próprios
- ❌ **NÃO deve** receber foco diretamente
- ✅ O **conteúdo interativo filho** é responsável pela sua própria interatividade
- ✅ O **painel em si** pode receber foco via `Tab` apenas para que o browser mova o foco para o primeiro filho interativo

---

## 5. Gate de Composição v2.4

| Regra | Implementação |
|-------|---------------|
| Fornece slot, não instancia filhos | ✅ — slot `default` livre |
| Não estiliza filhos DSS via `::v-deep` | ✅ — nenhum `::v-deep` |
| Composição é do consumidor | ✅ — documentado |
| Comunicação pai-filho via provide/inject | N/A — DssTabPanel é Nível 1 |

### Anti-Patterns de Composição (Documentação Obrigatória)

- ❌ Usar `<q-tab-panel>` diretamente — use `DssTabPanel`
- ❌ Sobrescrever padding do `DssTabPanel` via `:style` (usar composição DSS)
- ❌ Usar `DssTabPanel` fora de contexto de abas (`DssTabs` + `DssTab`)
- ❌ Aninhar `DssTabPanel` dentro de outro `DssTabPanel`
- ❌ Usar `<div>` genérico quando existe `DssCard` para superfície de conteúdo

---

## 6. Matriz de Composição DSS

| Papel | Componente | Status DSS |
|-------|-----------|------------|
| Container pai (obrigatório) | DssTabPanels | 🟡 Planejado (Fase 2 — roadmap) |
| Navegação de abas | DssTabs | 🟢 Existente (Selado Apr 2026) |
| Aba individual | DssTab | 🟢 Existente (Selado Apr 2026) |
| Superfície no slot | DssCard | 🟢 Existente (Selado Fev 2026) |
| Controles no slot | DssInput, DssSelect, etc. | 🟢 Existentes |
| Separação visual | DssSeparator | 🟢 Existente (Selado Mar 2026) |

**Lacuna identificada:** `DssTabPanels` (Nível 2, container pai) ainda não implementado.

**Impacto:** Baixo — `QTabPanels` cobre funcionalmente a lacuna. Exemplos documentam o workaround.  
**Classificação:** Não crítica — `DssTabPanel` funciona corretamente sem `DssTabPanels`.  
**Recomendação:** Implementar `DssTabPanels` após `DssTabPanel` receber Selo DSS v2.2.

---

## 7. Comportamentos Implícitos

| Comportamento | Detalhe |
|---------------|---------|
| Visibilidade | `QTabPanels` (container pai) mostra/oculta baseado no v-model e `name` prop |
| `inheritAttrs: false` | Atributos HTML extras forwarded ao root `<div>` via `v-bind="$attrs"` |
| Brand propagation | `[data-brand]` do `DssTabs` ancestral é capturado via cascata CSS |
| `role="tabpanel"` | Aplicado nativamente pelo `QTabPanel` interno — não declarado no wrapper |
| `aria-labelledby` | Associado automaticamente pelo Quasar com base no `name` prop |

---

## 8. Acessibilidade WCAG 2.1 AA

| Critério | Implementação |
|----------|---------------|
| 1.3.1 Info and Relationships | `role="tabpanel"` nativo do QTabPanel |
| 2.1.1 Keyboard | `Tab` para primeiro filho interativo; setas via DssTabs |
| 2.4.3 Focus Order | Ordem DOM — painel ativo é o único exibido (QTabPanels) |
| 2.5.5 Target Size | Opção B — container não-interativo; filhos são responsáveis |
| 4.1.2 Name, Role, Value | `aria-labelledby` gerenciado pelo QTabPanel + QTabPanels |

**Touch target:** Não implementado — Opção B (container não-interativo, mesmo padrão do DssCard).

---

## 9. Tokens Utilizados (1:1 com SCSS)

| Token | Arquivo | Uso |
|-------|---------|-----|
| `--dss-spacing-6` | `2-composition/_base.scss` | Padding interno do painel |
| `--dss-opacity-disabled` | `2-composition/_base.scss` | Opacidade no estado disabled |
| `--dss-border-width-thin` | `4-output/_states.scss` | Outline em high-contrast |
| `--dss-border-width-thick` | `4-output/_brands.scss` | Acento de marca (borda esquerda) |
| `--dss-hub-600` | `4-output/_brands.scss` | Acento Hub light mode |
| `--dss-hub-400` | `4-output/_brands.scss` | Acento Hub dark mode |
| `--dss-water-500` | `4-output/_brands.scss` | Acento Water light mode |
| `--dss-water-400` | `4-output/_brands.scss` | Acento Water dark mode |
| `--dss-waste-600` | `4-output/_brands.scss` | Acento Waste light mode |
| `--dss-waste-500` | `4-output/_brands.scss` | Acento Waste dark mode |

---

## 10. Exceções Documentadas

### EXC-01 — Seletor Composto `.dss-tab-panel.q-tab-panel`
- **Valor:** `.dss-tab-panel.q-tab-panel` (seletor composto — ambas as classes no mesmo elemento raiz)
- **Local:** `2-composition/_base.scss`, `4-output/_states.scss`, `4-output/_brands.scss`
- **Justificativa:** O `QTabPanel` aplica `padding: 16px` nativo (Material Design). O seletor composto garante especificidade suficiente para sobrescrever com `--dss-spacing-6`. Com `<q-tab-panel>` como root (Level 1 pattern), o DOM renderiza `<div class="q-tab-panel dss-tab-panel">` — as duas classes ficam no mesmo elemento. Simplificado no Ciclo 1 (NC-01) de `.dss-tab-panel__inner.q-tab-panel` para `.dss-tab-panel.q-tab-panel`. Precedente: DssTabs EXC-01 (`.dss-tabs .q-tabs__arrow`), DssTab EXC-01 (`.dss-tab .q-tab__indicator`).
- **Gates:** Gate de Composição v2.4 — exceção documentada para seletor Quasar

### EXC-02 — Forced-Colors (container)
- **Valor:** `1px solid ButtonText`
- **Local:** `4-output/_states.scss`
- **Justificativa:** Forced-colors mode. System color keywords obrigatórios — tokens CSS são ignorados pelo navegador. Padrão canônico DSS. Precedente: DssCard EXC-04, DssTabs EXC-02.

### EXC-03 — Forced-Colors (disabled)
- **Valor:** `GrayText`
- **Local:** `4-output/_states.scss`
- **Justificativa:** Forced-colors estado disabled. `GrayText` é o system keyword padrão para elementos desabilitados. `opacity` é ignorado em forced-colors.

### EXC-04 — Print: `display: block !important`
- **Valor:** `display: block !important`
- **Local:** `4-output/_states.scss — @media print`
- **Justificativa:** O QTabPanels aplica `display: none` via inline style (`v-show`) em painéis inativos. O `!important` é necessário para sobrescrever o inline style em contexto de impressão. Nenhum token DSS cobre a semântica de visibilidade forçada em print. Precedente: DssTabs EXC-03 (`display: none` em `@media print`).

---

## 11. Comportamento em Impressão

O `DssTabPanel` renderiza **todos** os painéis em contexto de impressão (`@media print`), independentemente de qual está ativo na sessão. Este é o comportamento **intencional** documentado como **EXC-04**.

### Por que todos os painéis são impressos

O `QTabPanels` oculta painéis inativos via `v-show` (inline style `display: none`). Em impressão estática, o estado da sessão não é preservado e o conteúdo das abas inativas seria perdido. O DSS opta por renderizar o conjunto completo para garantir que nenhuma informação seja omitida da impressão.

```scss
/* EXC-04 — 4-output/_states.scss */
@media print {
  .dss-tab-panel.q-tab-panel {
    display: block !important;
  }
}
```

### Consequências práticas

| Cenário | Comportamento |
|---------|--------------|
| Impressão com 3 painéis | Todos os 3 painéis são renderizados sequencialmente |
| Painel ativo | Impresso normalmente |
| Painéis inativos | Impressos em sequência, abaixo do painel ativo |
| Navegação de abas (DssTabs) | **Não** é impressa (`display: none` para setas de navegação — DssTabs EXC-03) |

### Quando o comportamento padrão não é desejado

Se o consumidor precisar imprimir apenas o painel ativo, deve sobrescrever a regra em seu próprio SCSS de aplicação:

```scss
/* No SCSS da aplicação — não modificar o DssTabPanel */
@media print {
  .dss-tab-panel.q-tab-panel:not(.q-tab-panel--current) {
    display: none !important;
  }
}
```

> ⚠️ A sobrescrita acima é responsabilidade do consumidor. O DssTabPanel não fornece prop ou variante para controlar o comportamento de impressão.

---

## 12. Reservas

| ID | Descrição | Impacto |
|----|-----------|---------|
| RES-01 | `DssTabPanels` não implementado — exemplos usam `QTabPanels` | Baixo |
| RES-02 | Sem unit tests em v1.0.0 | Baixo |
| RES-03 | Variante `flush` (sem padding) não implementada | Médio — workaround: `q-pa-none` |

---

## 13. Paridade com Golden Reference (DssCard)

| Aspecto | DssCard | DssTabPanel | Divergência Intencional |
|---------|---------|-------------|------------------------|
| `defineOptions({ name, inheritAttrs: false })` | ✅ | ✅ | — |
| `v-bind="$attrs"` no root | ✅ | ✅ | — |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ | — |
| `@include dss-transition` | ✅ | ❌ | Container passivo — sem transições próprias |
| `--dss-surface-default` como background | ✅ | ❌ | DssTabPanel é transparente — herda do pai |
| `--dss-radius-lg` | ✅ | ❌ | Radius pertence ao DssTabPanels (container pai) |
| Prop `brand` | ✅ | ❌ | Brand via cascata CSS do DssTabs — sem prop própria |
| Estado `disabled` | ❌ | ✅ | DssTabPanel suporta `disable` do QTabPanel |
| Seletor Quasar interno | ❌ | ✅ (EXC-01) | Necessário para sobrescrever padding nativo |
| Touch target `::before` | ❌ (Opção B) | ❌ (Opção B) | Ambos não-interativos — decisão idêntica |

---

## 14. Checklist Gate Estrutural DSS

### Gate Estrutural (Bloqueante)
- [x] 4 camadas existem em completude
- [x] Entry Point Wrapper (`DssTabPanel.vue`) existe e é re-export puro
- [x] Orchestrador SCSS importa L2 → L3 → L4 na ordem
- [x] Barrel export (`index.js`) exporta componente, types e composables
- [x] `dss.meta.json` com `goldenReference` e `goldenContext` declarados

### Gate Técnico (Bloqueante)
- [x] Nenhum valor hardcoded (Token First) — exceções documentadas
- [x] Estados implementados e documentados (default, disabled)
- [x] Acessibilidade WCAG 2.1 AA validada
- [x] `defineOptions({ name, inheritAttrs: false })`
- [x] `v-bind="$attrs"` forwarding

### Gate Documental (Bloqueante para selo)
- [x] Tokens listados com nomes exatos
- [x] README completo
- [x] Documentação normativa (este arquivo, Template 13.1)
- [x] API Reference (`DSSTABPANEL_API.md`)
- [x] Exemplos (`DssTabPanel.example.vue`, 3 cenários)

---

**Componente PRONTO PARA AUDITORIA DSS v2.2**

> 🚫 Selo não emitido — 🚫 Conformidade não auto-certificada  
> A auditoria formal DSS v2.2 deve ser conduzida por auditor designado.
