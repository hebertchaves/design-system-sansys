# DssTabPanels — API Reference

> Wrapper DSS governado sobre QTabPanels. Container pai dos DssTabPanel — gerencia qual painel está ativo e coordena transições.

---

## Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `modelValue` | `string \| number` | — | ✅ Sim | Identificador do painel ativo. Deve corresponder à prop `name` de um `DssTabPanel` filho. Suporta `v-model`. |
| `animated` | `boolean` | `false` | Não | Habilita transição de fade ao trocar de painel. A transição é governada pelos tokens `--dss-duration-200` e `--dss-easing-standard` do DSS. Respeitada por `@media (prefers-reduced-motion: reduce)`. |
| `swipeable` | `boolean` | `false` | Não | Habilita navegação por gesto de swipe em dispositivos touch/mobile. |
| `infinite` | `boolean` | `false` | Não | Ao chegar no último painel, retorna ao primeiro (e vice-versa). |
| `keepAlive` | `boolean` | `false` | Não | Mantém o estado dos painéis inativos em memória via Vue KeepAlive. Útil para formulários e outros estados que devem ser preservados ao alternar entre abas. |

### Props Bloqueadas (Governança DSS)

| Prop Quasar | Razão do Bloqueio |
|-------------|-------------------|
| `dark` | Dark mode é governado globalmente pelo DSS via `[data-theme="dark"]`. Prop por componente viola a governança centralizada de tema. |
| `transition-prev` | DSS governa a transição internamente. Quando `animated=true`, `transition-prev="dss-tab-panels"` (fade) é definido internamente com tokens DSS. Expor esta prop permitiria transições não governadas. |
| `transition-next` | Mesmo motivo de `transition-prev`. Fade direction-agnostic: sem motion direcional para evitar desconforto vestibular e garantir compatibilidade RTL. |

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `string \| number` | Emitido quando o painel ativo muda. Suporta `v-model`. |

---

## Slots

| Slot | Aceita | Descrição |
|------|--------|-----------|
| `default` | `DssTabPanel` **exclusivamente** | Slot para os painéis de conteúdo. Gate de Composição v2.4: aceita apenas componentes `DssTabPanel`. |

### Anti-Patterns de Composição (Obrigatório Evitar)

- ❌ Usar `<q-tab-panel>` diretamente no slot — use `DssTabPanel`
- ❌ Usar `<div>` com conteúdo diretamente no slot — envolva com `DssTabPanel`
- ❌ Aninhar `DssTabPanels` dentro de outro `DssTabPanels`
- ❌ Usar `DssTabPanels` sem `DssTabs` + `DssTab` para navegação
- ❌ Misturar `DssTabPanel` com `QTabPanel` no mesmo `DssTabPanels`

---

## Acessibilidade

| Atributo | Responsável | Valor |
|----------|-------------|-------|
| `role="tabpanel"` | QTabPanel nativo (encapsulado pelo DssTabPanel) | Gerenciado automaticamente |
| `aria-labelledby` | QTabPanel + QTabPanels | Associado ao `id` do QTab correspondente via `name` |
| `aria-hidden` | QTabPanels | Gerenciado automaticamente em painéis inativos |
| `tabindex="-1"` | QTabPanels nativo | Container recebe foco programático, não via Tab de teclado |

**Navegação por teclado:**
- `Tab`: navega para o primeiro elemento interativo dentro do painel ativo
- Navegação entre painéis: gerenciada pelo `DssTabs` (setas ←/→)
- `DssTabPanels` não captura eventos de teclado diretamente

---

## Tokens Utilizados

| Token | Uso | Localização |
|-------|-----|-------------|
| `--dss-border-width-thin` | Outline em high-contrast | `4-output/_states.scss` |
| `--dss-duration-200` | Duração do fade quando `animated=true` | `1-structure/DssTabPanels.ts.vue` — `<style>` global |
| `--dss-duration-0` | Desabilita fade em `prefers-reduced-motion` | `1-structure/DssTabPanels.ts.vue` — `<style>` global |
| `--dss-easing-standard` | Easing do fade (`cubic-bezier(0.4, 0, 0.2, 1)`) | `1-structure/DssTabPanels.ts.vue` — `<style>` global |

**Tokens NÃO utilizados:**
- `--dss-surface-transparent`: não existe no catálogo DSS — `background: transparent` usa keyword CSS (EXC-01)
- `--dss-opacity-disabled`: DssTabPanels não tem estado disabled próprio
- `--dss-spacing-*`: sem padding próprio — DssTabPanel gerencia seu próprio padding

---

## Estados

| Estado | Aplicável | Implementação |
|--------|-----------|---------------|
| default | ✅ Sim | Display normal, painel ativo visível |
| hover | ❌ Não aplicável | Pertence aos filhos interativos |
| focus | ❌ Não aplicável | Pertence aos filhos interativos |
| active | ❌ Não aplicável | Pertence aos filhos interativos |
| disabled | ❌ Não aplicável | Use `disable` prop no `DssTabPanel` individual |
| loading | ❌ Não aplicável | Filhos gerenciam loading individualmente |
| error | ❌ Não aplicável | Pertence ao conteúdo dos filhos |
| indeterminate | ❌ Não aplicável | Não se aplica a containers de painéis |

---

## Exceções Documentadas

| ID | Valor | Localização | Justificativa |
|----|-------|-------------|---------------|
| EXC-01 | `transparent` | `2-composition/_base.scss` | Keyword CSS semântica — token `--dss-surface-transparent` não existe no catálogo. Container pass-through; override de dark mode Quasar via `.body--dark .q-tab-panels`. |
| EXC-02 | `1px solid ButtonText` | `4-output/_states.scss` | Forced-colors — system keywords obrigatórios. |
| EXC-03 | Bloco `<style>` global em `DssTabPanels.ts.vue` | `1-structure/DssTabPanels.ts.vue` | Classes Vue transition (`.dss-tab-panels-enter-active`, etc.) são aplicadas nos filhos do slot — não podem ser scoped. |

---

## Comportamentos Implícitos

| Comportamento | Detalhe |
|---------------|---------|
| Visibilidade dos painéis | `QTabPanels` mostra/oculta `DssTabPanel` filhos via `provide/inject` Quasar baseado em `modelValue` ↔ `name` |
| `tabindex="-1"` | Aplicado nativamente pelo `QTabPanels` no root. Container pode receber foco programático mas não via Tab. |
| `inheritAttrs: false` | Atributos HTML extras (data-*, aria-*) são forwarded ao root via `v-bind="$attrs"` |
| Brand propagation | `[data-brand]` do `DssTabs` ancestral propaga via cascata CSS para os `DssTabPanel` filhos — sem prop `brand` própria |
| Transição — animated=false | QTabPanels troca instantaneamente. `transition-prev` e `transition-next` são `undefined`. |
| Transição — animated=true | Fade com `transition: opacity var(--dss-duration-200) var(--dss-easing-standard)` |
| Keep Alive | Vue KeepAlive mantém instâncias de `DssTabPanel` inativos em memória (estado de `ref`, `reactive`, inputs) |

---

## Paridade com Golden Reference (DssCard)

| Aspecto | DssCard | DssTabPanels | Justificativa de Divergência |
|---------|---------|--------------|------------------------------|
| `defineOptions({ name, inheritAttrs: false })` | ✅ | ✅ | Igual |
| `v-bind="$attrs"` no root | ✅ | ✅ | Igual |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ | Igual |
| `background` via token | ✅ `--dss-surface-default` | ❌ `transparent` (EXC-01) | DssTabPanels é container transparente — herda do pai |
| `@include dss-transition` | ✅ | ❌ | Transições próprias via Vue transition API (não CSS transition no root) |
| `--dss-radius-lg` | ✅ | ❌ | Radius pertence ao DssCard (superfície visual). DssTabPanels é transparente. |
| Brand via prop | ❌ (sem prop) | ❌ (sem prop) | Ambos via cascata `[data-brand]` — DssCard via DssCard pai, DssTabPanels via DssTabs ancestral |
| Estado `disabled` | ❌ | ❌ | DssTabPanels não é desabilitável; DssCard também não |
| Touch target `::before` | ❌ (Opção B) | ❌ (Opção B) | Ambos não-interativos |
| Seletor Quasar interno | ❌ | ✅ (EXC-01 seletor) | `.dss-tab-panels.q-tab-panels` para override de background Quasar |
| Bloco `<style>` global | ❌ | ✅ (EXC-03) | Necessário para classes Vue transition |
| Subcomponentes filhos | ✅ (DssCardSection, DssCardActions) | ✅ (DssTabPanel) | DssTabPanels gerencia DssTabPanel via v-model/name |
