# DssTabPanels — Documentação Normativa DSS v2.2

> **Status:** Pronto para Auditoria
> **Fase:** 2 — Componente Container/Composto
> **Golden Reference:** DssCard
> **Golden Context:** DssTabs
> **Quasar Base:** QTabPanels
> **Versão:** 1.0.0

---

## 1. Visão Geral

O `DssTabPanels` é o container pai dos `DssTabPanel` no Design System Sansys. É um wrapper DSS governado sobre o `QTabPanels` do Quasar Framework.

**O que faz:**
- Gerencia qual `DssTabPanel` está visível via `v-model` (sincronizado com `name` dos filhos)
- Coordena transições animadas entre painéis (fade governado por tokens DSS)
- Suporta navegação por swipe em dispositivos touch
- Suporta navegação cíclica (infinite)
- Preserva o estado dos painéis inativos em memória (Vue KeepAlive)
- Propaga contexto de brand recebido via cascata CSS do `DssTabs` ancestral

**O que NÃO faz:**
- Não gerencia navegação de abas (responsabilidade do `DssTabs`)
- Não possui estados interativos próprios (hover, focus, active)
- Não instancia componentes filhos — composição é responsabilidade do consumidor
- Não aceita prop `dark` — dark mode é global no DSS
- Não aceita `transition-prev` / `transition-next` — transições são governadas internamente

---

## 2. Arquitetura

```
DssTabPanels/
├── 1-structure/
│   └── DssTabPanels.ts.vue         ← Implementação canônica (Vue 3 + TS)
├── 2-composition/
│   └── _base.scss                  ← Background transparent, tap-highlight
├── 3-variants/
│   └── index.scss                  ← Vazio v1.0.0 — camada preservada
├── 4-output/
│   ├── _states.scss                ← High-contrast, forced-colors, print
│   ├── _brands.scss                ← Vazio — brand via cascade dos filhos
│   └── index.scss                  ← Orchestrador L4
├── composables/
│   ├── index.ts
│   └── useTabPanelsClasses.ts      ← Classes reativas
├── types/
│   └── tab-panels.types.ts         ← TabPanelsProps, TabPanelsEmits, TabPanelsSlots
├── DssTabPanels.md                 ← Este arquivo
├── DssTabPanels.module.scss        ← Orchestrador principal L2 → L3 → L4
├── DssTabPanels.example.vue        ← 4 cenários de uso
├── DssTabPanels.vue                ← Entry Point Wrapper (re-export puro)
├── DSSTABPANELS_API.md             ← API Reference completa
├── dss.meta.json                   ← Metadados de auditoria
├── index.js                        ← Barrel export
└── README.md                       ← Quick start
```

---

## 3. Mapeamento Estrutural Quasar × DSS

| Aspecto | QTabPanels (Quasar) | DssTabPanels (DSS) |
|---------|--------------------|--------------------|
| Prop `model-value` | `any` | `string \| number` (narrowado — alinhado com `DssTab.name`) |
| Prop `animated` | `boolean` | Mantida — DSS governa a transição internamente |
| Prop `transition-prev` | `string` | **Bloqueada** — DSS governa via `'dss-tab-panels'` |
| Prop `transition-next` | `string` | **Bloqueada** — DSS governa via `'dss-tab-panels'` |
| Prop `swipeable` | `boolean` | Mantida |
| Prop `infinite` | `boolean` | Mantida |
| Prop `keep-alive` | `boolean` | Mantida como `keepAlive` (camelCase DSS) |
| Prop `dark` | `boolean` | **Bloqueada** — DSS governa globalmente |
| Background | Herda tema Quasar | `transparent` (EXC-01) — herda do container pai |
| Transição | `slide-right`/`slide-left` (default) | `dss-tab-panels` (fade) — tokens `--dss-duration-200` + `--dss-easing-standard` |

---

## 4. Gate de Responsabilidade v2.4

O `DssTabPanels` é um **container orquestrador não-interativo**.

- ❌ **NÃO possui** estados de `:hover`, `:focus` ou `:active` próprios
- ❌ **NÃO deve** ser alvo direto de interação do usuário
- ✅ **Gerencia** qual `DssTabPanel` está visível via `v-model`
- ✅ **A navegação** pertence ao `DssTabs` (abas + setas de teclado)
- ✅ **O conteúdo interativo** dentro dos `DssTabPanel` é responsável pela sua própria interatividade

---

## 5. Gate de Composição v2.4

| Regra | Implementação |
|-------|---------------|
| Fornece slot, não instancia filhos | ✅ — slot `default` livre para DssTabPanel |
| Não estiliza filhos DSS via `::v-deep` | ✅ — nenhum `::v-deep` |
| Composição é do consumidor | ✅ — documentado |
| Slot aceita apenas DssTabPanel | ✅ — contrato documentado (sem enforcement runtime em v1.0.0) |
| Comunicação pai-filho via provide/inject | ✅ — gerenciado nativamente pelo QTabPanels/QTabPanel Quasar |

### Anti-Patterns de Composição (Documentação Obrigatória)

- ❌ Usar `<q-tab-panel>` no slot — use `DssTabPanel`
- ❌ Usar `<div>` com conteúdo diretamente — envolva com `DssTabPanel`
- ❌ Aninhar `DssTabPanels` dentro de outro `DssTabPanels`
- ❌ Usar `DssTabPanels` sem `DssTabs` + `DssTab` para navegação
- ❌ Usar `transition-prev` ou `transition-next` diretamente (props bloqueadas)
- ❌ Passar prop `dark` para `DssTabPanels` (prop bloqueada)

---

## 6. Matriz de Composição DSS

| Papel | Componente | Status DSS |
|-------|-----------|------------|
| Navegação de abas | DssTabs | 🟢 Existente (Selado 02 Apr 2026) |
| Aba individual | DssTab | 🟢 Existente (Selado 02 Apr 2026) |
| Painel de conteúdo (filho) | DssTabPanel | 🟢 Existente (Selado 09 Apr 2026) |
| Superfície no slot dos painéis | DssCard | 🟢 Existente (Selado Fev 2026) |
| Controles no slot dos painéis | DssInput, DssSelect, etc. | 🟢 Existentes |

**Família Tabs completa (Fase 1 + Fase 2):**
```
DssTabs (Phase 2 — container de navegação, selado 02 Apr 2026)
  └── DssTab (Phase 1 — aba individual, selado 02 Apr 2026)

DssTabPanels (Phase 2 — container de painéis, este componente) ← v1.0.0
  └── DssTabPanel (Phase 1 — painel individual, selado 09 Apr 2026)
```

**Uso completo da família:**
```vue
<DssTabs v-model="activeTab">
  <DssTab name="tab1" label="Aba 1" />
  <DssTab name="tab2" label="Aba 2" />
</DssTabs>

<DssTabPanels v-model="activeTab">
  <DssTabPanel name="tab1">Conteúdo da Aba 1</DssTabPanel>
  <DssTabPanel name="tab2">Conteúdo da Aba 2</DssTabPanel>
</DssTabPanels>
```

---

## 7. Governança de Transições (animated=true)

### Decisão Arquitetural

Quando `animated=true`, `DssTabPanels` governa a transição internamente:
- `transition-prev` e `transition-next` são bloqueados na API pública
- `DssTabPanels` define internamente `transition-prev="dss-tab-panels"` e `transition-next="dss-tab-panels"`
- A transição é um **fade de opacidade direction-agnostic**

### Por que fade direction-agnostic?

| Motivo | Explicação |
|--------|-----------|
| Acessibilidade | Motion direcional (slide) pode causar desconforto vestibular em usuários sensíveis (WCAG 2.3.3) |
| RTL | Fade funciona corretamente em layouts da direita para esquerda (árabe, hebraico) |
| Semântica | "Anterior" e "próximo" em abas são relativos ao layout — fade é neutro |
| Previsibilidade | Mesmo comportamento visual em todos os cenários |

### Implementação Técnica

```css
/* Bloco <style> global em DssTabPanels.ts.vue */
.dss-tab-panels-enter-active,
.dss-tab-panels-leave-active {
  transition: opacity var(--dss-duration-200) var(--dss-easing-standard);
}
.dss-tab-panels-enter-from,
.dss-tab-panels-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .dss-tab-panels-enter-active,
  .dss-tab-panels-leave-active {
    transition-duration: var(--dss-duration-0); /* 0ms — instantâneo */
  }
}
```

### Por que bloco `<style>` global separado?

Vue aplica as classes de transição nos elementos **filhos do slot** (`DssTabPanel`), que estão fora do escopo `data-v-xxx` do root `DssTabPanels`. Um bloco `<style scoped>` adicionaria `[data-v-xxx]` ao seletor, impedindo a aplicação. O bloco global é obrigatório para este padrão Vue. Documentado como EXC-03.

---

## 8. Comportamentos Implícitos

| Comportamento | Detalhe |
|---------------|---------|
| Visibilidade | `QTabPanels` mostra/oculta `DssTabPanel` filhos via `provide/inject` baseado em `modelValue` ↔ `name` |
| `tabindex="-1"` | Aplicado nativamente pelo `QTabPanels`. Container pode receber foco programático mas não via Tab |
| `inheritAttrs: false` | Atributos HTML extras (data-*, aria-*) forwarded ao root via `v-bind="$attrs"` |
| Brand propagation | `[data-brand]` do `DssTabs` ancestral propaga via cascata CSS para os `DssTabPanel` filhos — sem intervenção do `DssTabPanels` |
| modelValue narrowing | `model-value` aceita `any` no Quasar; DSS restringe para `string \| number` — alinhado com o tipo da prop `name` do `DssTabPanel` |

---

## 9. Acessibilidade WCAG 2.1 AA

| Critério | Implementação |
|----------|---------------|
| 1.3.1 Info and Relationships | `role="tabpanel"` gerenciado nativamente pelos `DssTabPanel` filhos |
| 2.1.1 Keyboard | `Tab` para o primeiro elemento interativo no painel ativo; setas via `DssTabs` |
| 2.3.3 Animation from Interactions | `prefers-reduced-motion: reduce` desativa transições via `--dss-duration-0` |
| 2.4.3 Focus Order | Ordem DOM — apenas o painel ativo é exibido (`QTabPanels`) |
| 2.5.5 Target Size | Opção B — container não-interativo; filhos são responsáveis |
| 4.1.2 Name, Role, Value | `aria-labelledby` e `aria-hidden` gerenciados pelo `QTabPanel` + `QTabPanels` Quasar |

---

## 10. Tokens Utilizados (1:1 com SCSS)

| Token | Arquivo | Uso |
|-------|---------|-----|
| `--dss-border-width-thin` | `4-output/_states.scss` | Outline em high-contrast |
| `--dss-duration-200` | `1-structure/DssTabPanels.ts.vue` — `<style>` global | Duração do fade (animated=true) |
| `--dss-duration-0` | `1-structure/DssTabPanels.ts.vue` — `<style>` global | Zero duration em prefers-reduced-motion |
| `--dss-easing-standard` | `1-structure/DssTabPanels.ts.vue` — `<style>` global | Easing do fade: cubic-bezier(0.4, 0, 0.2, 1) |

---

## 11. Exceções Documentadas

### EXC-01 — Background Transparent

- **Valor:** `transparent`
- **Local:** `2-composition/_base.scss`
- **Justificativa:** Keyword CSS semântica para background. Token `--dss-surface-transparent` não existe no catálogo DSS. `DssTabPanels` é container pass-through: herda background do container pai (`DssCard`, layout de página). Override necessário para prevenir herança indesejada do tema Material Quasar em dark mode via `.body--dark .q-tab-panels` — seletor Quasar que DSS não utiliza (DSS governa via `[data-theme="dark"]`).

### EXC-02 — Forced-Colors (container)

- **Valor:** `1px solid ButtonText`
- **Local:** `4-output/_states.scss`
- **Justificativa:** Forced-colors mode. System color keywords obrigatórios — tokens CSS são ignorados pelo navegador. Padrão canônico DSS. Precedente: DssTabPanel EXC-02, DssCard EXC-04.

---

### Exceções aos Gates v2.4

#### Gate de Composição v2.4 — Regra 1 (Uso de componente Quasar no template)

**GATE-EXC-01 — Uso de `<q-tab-panels>` como elemento raiz**

- **Local:** `1-structure/DssTabPanels.ts.vue`
- **Justificativa:** `DssTabPanels` usa `<q-tab-panels>` como elemento raiz (Level 1 DOM pattern). O `QTabPanels` é a infraestrutura de state management que gerencia visibilidade dos painéis via `provide/inject` com os `QTabPanel` filhos — funcionalidade que não pode ser reimplementada sem o componente Quasar. Precedente: `DssTabs` `templateStructure` (mesmo padrão, família Tabs).

**GATE-EXC-02 — Bloco `<style>` global (não scoped) no SFC**

- **Local:** `1-structure/DssTabPanels.ts.vue` — segundo bloco `<style>`
- **Justificativa:** Classes de transição Vue (`.dss-tab-panels-enter-active`, `.dss-tab-panels-leave-active`, `.dss-tab-panels-enter-from`, `.dss-tab-panels-leave-to`) são aplicadas pelo Vue runtime nos elementos filhos do slot (`DssTabPanel`), fora do escopo `data-v-xxx` do root. Em `<style scoped>`, Vue adicionaria `[data-v-xxx]` ao seletor, impedindo a aplicação correta. O bloco `<style>` global é o padrão Vue 3 aceito para transições em slots.

> Ambas as exceções estão registradas formalmente em `dss.meta.json` → `gateExceptions.compositionGateV24`. Precedente: `DssTabs` (Golden Context).

---

## 12. Reservas

| ID | Descrição | Impacto |
|----|-----------|---------|
| RES-01 | Sem unit tests em v1.0.0 | Baixo |
| RES-02 | Variante `flush` (sem padding nos filhos) não implementada | Médio — workaround: `q-pa-none` no `DssTabPanel` |
| RES-03 | Prop `tabindex` do `QTabPanels` não exposta | Baixo — padrão `-1` é semanticamente correto |

---

## 13. Paridade com Golden Reference (DssCard)

| Aspecto | DssCard | DssTabPanels | Divergência Intencional |
|---------|---------|--------------|------------------------|
| `defineOptions({ name, inheritAttrs: false })` | ✅ | ✅ | — |
| `v-bind="$attrs"` no root | ✅ | ✅ | — |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ | — |
| `background` via token DSS | ✅ `--dss-surface-default` | ❌ `transparent` (EXC-01) | DssTabPanels é container pass-through — sem superfície própria |
| `@include dss-transition` | ✅ | ❌ | Transições via Vue transition API — não CSS transition no root |
| `--dss-radius-lg` | ✅ | ❌ | Radius pertence ao DssCard (superfície). DssTabPanels é transparente. |
| Prop `brand` | ❌ (via cascata) | ❌ (via cascata) | Ambos sem prop brand própria — cascata CSS |
| Estado `disabled` | ❌ | ❌ | Nenhum é desabilitável como container |
| Touch target `::before` | ❌ (Opção B) | ❌ (Opção B) | Ambos não-interativos — decisão idêntica |
| Bloco `<style>` global | ❌ | ✅ (EXC-03) | Necessário para Vue transition classes nos filhos do slot |
| Subcomponentes filhos DSS | ✅ (DssCardSection, DssCardActions) | ✅ (DssTabPanel) | DssTabPanels gerencia DssTabPanel via v-model/name |

---

## 14. Checklist Gate Estrutural DSS

### Gate Estrutural (Bloqueante)
- [x] 4 camadas existem em completude
- [x] Entry Point Wrapper (`DssTabPanels.vue`) existe e é re-export puro
- [x] Orchestrador SCSS importa L2 → L3 → L4 na ordem
- [x] Barrel export (`index.js`) exporta componente, types e composables
- [x] `dss.meta.json` com `goldenReference` e `goldenContext` declarados

### Gate Técnico (Bloqueante)
- [x] Nenhum valor hardcoded (Token First) — exceções EXC-01/EXC-02 documentadas; exceções de Gate em `gateExceptions`
- [x] Estados implementados e documentados (default — único aplicável)
- [x] Acessibilidade WCAG 2.1 AA validada (incluindo WCAG 2.3.3 prefers-reduced-motion)
- [x] `defineOptions({ name, inheritAttrs: false })`
- [x] `v-bind="$attrs"` forwarding

### Gate Documental (Bloqueante para selo)
- [x] Tokens listados com nomes exatos (1:1 com SCSS)
- [x] README completo
- [x] Documentação normativa (este arquivo, Template 13.x)
- [x] API Reference (`DSSTABPANELS_API.md`)
- [x] Exemplos (`DssTabPanels.example.vue`, 4 cenários)

### Gate de Composição v2.4
- [x] Slot default aceita apenas DssTabPanel (documentado)
- [x] Sem `::v-deep` em filhos DSS
- [x] Comunicação pai-filho via provide/inject (Quasar nativo)
- [x] Anti-patterns documentados

### Gate de Responsabilidade v2.4
- [x] Nenhum estado `:hover`, `:focus`, `:active` no container
- [x] Interatividade declarada como pertencente aos filhos

---

**Componente PRONTO PARA AUDITORIA DSS v2.2**

> 🚫 Selo não emitido — 🚫 Conformidade não auto-certificada
> A auditoria formal DSS v2.2 deve ser conduzida por auditor designado.
