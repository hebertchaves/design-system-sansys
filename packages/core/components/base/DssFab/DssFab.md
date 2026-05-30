# DssFab — Documentação Normativa DSS v2.2

> **Versão do Componente:** 1.0.0
> **DSS Version:** v2.2
> **Fase:** 2 — Componente Composto
> **Status:** Conformant
> **Data de Criação:** 2026-05-01
> **Baseado em:** QFab (Quasar)
> **Golden Reference:** DssChip
> **Golden Context:** DssBtnDropdown

---

## 1. Identidade do Componente

### 1.1 Definição

O **DssFab** é um componente composto de Fase 2 que implementa o padrão _Floating Action Button_ (FAB) do Material Design. Representa a ação primária de uma tela e pode expandir para revelar ações secundárias relacionadas via DssFabAction.

### 1.2 Justificativa de Fase 2

O DssFab é classificado como Fase 2 porque:
- Gerencia **estado interno** (expandido/colapsado) via `v-model`
- Orquestra **múltiplos filhos** (DssFabAction) com coreografia de animação em cascata
- Coordena a **direção de expansão** das ações filhas
- Não é um simples wrapper de primitivo atômico

### 1.3 Equivalente Quasar

| DSS | Quasar | Nota |
|-----|--------|------|
| `DssFab` | `QFab` | Wrapper governado — envolve QFab sem reconstruir |

### 1.4 Abordagem Arquitetural: WRAP

**Decisão:** DssFab ENVOLVE `QFab`, não reconstrói do zero.

**Justificativa:**
- QFab fornece estado de expansão, direção de animação, acessibilidade WAI-ARIA, keyboard navigation e animações de ações filhas nativamente
- Rebuild seria duplicação de esforço sem ganho arquitetural
- **Precedente:** DssBtnDropdown (selado Mar 2026) usa mesma estratégia wrap para QBtnDropdown

---

## 2. Quando Usar / Quando Não Usar

### ✅ Quando Usar

- **Ação principal de uma tela**: Criar novo item, compor mensagem, adicionar registro
- **Acesso rápido a ações relacionadas**: Expandir para revelar 2–5 ações secundárias
- **Contextos mobile-first**: Onde o FAB ocupa área de fácil alcance do polegar
- **Fluxos de criação primária**: Nova tarefa, novo evento, novo documento

### ❌ Quando Não Usar

- **Mais de 5 ações secundárias**: Use DssBtnDropdown ou menu contextual
- **Ações destrutivas como primária**: O FAB é para criação/ação positiva
- **Múltiplos FABs na mesma tela**: Cria confusão de hierarquia visual
- **Navegação**: Use DssToolbar ou DssTabs
- **Ações de formulário inline**: Use DssButton dentro do formulário
- **Sem DssPageSticky**: Se precisar de posicionamento fixo, use `<DssPageSticky>`

---

## 3. Gate de Responsabilidade v2.4

### O DssFab É Responsável Por:
1. Gerenciar o estado de expansão (aberto/fechado) via `v-model`
2. Orquestrar a direção da animação das ações filhas (`direction`)
3. Fornecer o botão trigger principal com governança visual DSS
4. Aplicar tokens de elevação, transição e brandabilidade

### O DssFab NÃO É Responsável Por:
1. **Posicionamento fixo na tela** → responsabilidade do `DssPageSticky`
2. **Executar as ações finais** → responsabilidade dos `DssFabAction` filhos
3. **Decidir quais ações exibir** → responsabilidade do consumidor (slot default)

---

## 4. Anatomia do Componente

```
┌─────────────────────────────────────────────┐
│                                             │
│   ┌──────────┐  ← Trigger (circular/pill)  │
│   │  [ícone] │    .dss-fab__qfab           │
│   └──────────┘    .q-fab__trigger          │
│                                             │
│   [ação 1]   ←  DssFabAction (slot)        │
│   [ação 2]   ←  DssFabAction (slot)        │
│   [ação 3]   ←  DssFabAction (slot)        │
│                                             │
└─────────────────────────────────────────────┘
  ↑ .dss-fab (wrapper div)
```

### Partes Internas

| Parte | Classe | Descrição |
|-------|--------|-----------|
| Container | `.dss-fab` | Wrapper div externo. Portador das classes de estado/brand |
| QFab | `.dss-fab__qfab` | O QFab em si — gerencia trigger + ações |
| Trigger | `.q-fab__trigger` *(Quasar internal)* | Botão circular/pill principal |
| Ações | `.q-fab__actions` *(Quasar internal)* | Container das ações filhas |

---

## 5. API Pública

### Props Expostas

#### Conteúdo Visual

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `color` | `String` | `'primary'` | Cor do trigger (paleta Quasar/DSS) |
| `text-color` | `String` | `undefined` | Cor do ícone/texto |
| `label` | `String` | `undefined` | Texto ao lado do ícone → Extended FAB |
| `icon` | `String` | `'add'` | Ícone quando fechado |
| `active-icon` | `String` | `'close'` | Ícone quando aberto |
| `hide-icon` | `Boolean` | `false` | Oculta o ícone |
| `hide-label` | `Boolean` | `false` | Oculta o label |

#### Comportamento de Expansão

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `model-value` | `Boolean` | `false` | Estado aberto/fechado (v-model) |
| `direction` | `'up'\|'down'\|'left'\|'right'` | `'up'` | Direção de expansão |
| `vertical-actions-align` | `'left'\|'center'\|'right'` | `'center'` | Alinhamento das ações |
| `persistent` | `Boolean` | `false` | Não fecha ao clicar fora |

#### Estado e Brandabilidade

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `disable` | `Boolean` | `false` | Desabilita o FAB |
| `brand` | `'hub'\|'water'\|'waste'\|null` | `null` | Acento de marca |
| `aria-label` | `String` | `undefined` | Label acessível do trigger |

### Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `glossy` | Não faz parte da linguagem visual DSS v2.2 |
| `push` | Não faz parte da linguagem visual DSS v2.2 |
| `flat` | FAB no DSS é sempre elevado (Material Design baseline) |
| `outline` | Variante sem elevação sem sentido semântico para FAB |
| `unelevated` | Idem `outline` |
| `padding` | Padding governado por tokens internos, não exposto |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Ações filhas. Reservado para `DssFabAction` (Nível 3). Aceita `<q-fab-action>` nativamente enquanto `DssFabAction` não for criado (EXC-01) |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `Boolean` | Estado aberto/fechado mudou |
| `click` | `MouseEvent` | Trigger clicado |
| `show` | — | Ações exibidas |
| `hide` | — | Ações ocultadas |
| `before-show` | — | Antes de exibir ações |
| `before-hide` | — | Antes de ocultar ações |

---

## 6. Estados

### Tabela de Estados

| Estado | Descrição | Token Aplicado | Condição |
|--------|-----------|----------------|----------|
| `default` | Trigger visível, elevação padrão | `--dss-elevation-2` | Padrão |
| `hover` | Elevação aumenta | `--dss-elevation-3` | `:hover` |
| `focus` | Ring de foco visível | `--dss-focus-ring` | `:focus-visible` |
| `active` | Elevação máxima (feedback tátil) | `--dss-elevation-3` | `:active` |
| `disabled` | Opacidade reduzida, sem interatividade | `--dss-opacity-disabled` (0.4) | `disable="true"` |
| `expanded` | Ações filhas visíveis, ícone alterado | — | v-model = true |

### Estados Não Aplicáveis

| Estado | Justificativa |
|--------|---------------|
| `loading` | Fase 2 síncrona — FAB não tem estados assíncronos |
| `error` | FAB é ação flutuante primária — erros pertencem a formulários |
| `indeterminate` | Não aplicável a botões de ação |

---

## 7. Tokens CSS Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-radius-full` | L2 | Border-radius circular/pill do trigger |
| `--dss-elevation-2` | L2, L4 | Sombra padrão e estado default/hover |
| `--dss-elevation-3` | L2, L4 | Sombra no hover/active |
| `--dss-duration-200` | L2 | Duração da transição |
| `--dss-easing-standard` | L2 | Easing das transições (cubic-bezier(0.4,0,0.2,1)) |
| `--dss-spacing-14` | L2 | Dimensão mínima do trigger (56px — touch target ≥ 48px) |
| `--dss-padding-4` | L3 | Padding horizontal do Extended FAB (16px) |
| `--dss-opacity-disabled` | L2 | Opacidade disabled = 0.4 |
| `--dss-focus-ring` | L2 | Ring de foco (WCAG 2.4.7 AA) |
| `--dss-border-width-md` | L4 | Borda em high-contrast |
| `--dss-border-width-thick` | L4 | Acento de marca (box-shadow inset) |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub claro/dark |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water claro/dark |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste claro/dark |

⚠️ Tokens de brand numéricos (`--dss-hub-600`, etc.) são usados intencionalmente — tokens semânticos de brand ainda não existem no catálogo DSS v2.2. Padrão idêntico ao DssCard, DssBtnGroup e DssBtnDropdown.

---

## 8. Acessibilidade (WCAG 2.1 AA)

### ARIA

| Atributo | Valor | Fonte |
|----------|-------|-------|
| `role` | `button` | QFab (automático) |
| `aria-expanded` | `true`/`false` | QFab (automático) |
| `aria-label` | prop `ariaLabel` | Quando fornecido |
| `aria-disabled` | `true` | Quando `disable="true"` |

### Touch Target

**Opção A — Tamanho intrínseco.**

O FAB padrão tem `56×56px`, garantindo touch target ≥ 48×48px (WCAG 2.5.5) sem necessidade de pseudo-elemento `::before`. O `::before` é reservado exclusivamente para touch target em Compact Controls com tamanho visual inferior a 48px (DssChip, DssRadio, DssCheckbox). Esta distinção é intencional e documentada.

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `Enter` / `Space` | Abre/fecha ações (gerenciado pelo Quasar) |
| `Escape` | Fecha ações |
| `Tab` | Navega para o próximo elemento focusável |

### Contraste e Estados Visuais

- `prefers-contrast: more`: outline visível no trigger
- `forced-colors: active`: system color keywords (EXC-States-01)
- `prefers-reduced-motion`: transições desabilitadas
- Dark mode: `[data-theme="dark"]` — ring de foco adaptado

---

## 9. Brandabilidade

O DssFab aplica acento visual de marca via `box-shadow` inset na borda inferior do trigger, sobreposto ao shadow de elevação.

```vue
<!-- Hub (laranja) -->
<DssFab icon="add" color="primary" brand="hub">...</DssFab>

<!-- Water (azul) -->
<DssFab icon="add" color="info" brand="water">...</DssFab>

<!-- Waste (verde) -->
<DssFab icon="add" color="positive" brand="waste">...</DssFab>
```

---

## 10. Comportamentos Implícitos

### Forwarding e inheritAttrs
- `inheritAttrs: false` — atributos não declarados são explicitamente vinculados via `v-bind="$attrs"` no elemento raiz `<div.dss-fab>`
- **Racional:** Evita conflito com o `<q-fab>` interno; o wrapper div é o receptor canônico de attrs

### Slot Default
- O slot default é renderizado DENTRO do `<q-fab>`, fazendo com que as ações filhas participem do layout e animação gerenciados pelo Quasar
- Nenhuma lógica adicional é adicionada ao slot — o posicionamento das ações é 100% delegado ao QFab

### Estado Expandido Inicial
- `modelValue: false` (padrão) — FAB começa colapsado
- Para abrir programaticamente, use `v-model` ou `model-value="true"`

---

## 11. Paridade com Golden Context — DssBtnDropdown

| Aspecto | DssBtnDropdown | DssFab | Nota |
|---------|---------------|--------|------|
| `defineOptions` | ✅ | ✅ | Idêntico |
| `inheritAttrs: false` | ✅ | ✅ | Idêntico |
| `v-bind="$attrs"` no wrapper div | ✅ | ✅ | Idêntico |
| Wrapper div externo | ✅ | ✅ | Mesma razão |
| `<style>` sem scoped | ✅ | ✅ | Mesma razão |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ | Idêntico |
| `popup-content-class` para painel | ✅ | ❌ | **Diferença intencional**: QFab não teleporta ações para o body. As ações ficam no DOM local. |
| Gate exception para Quasar internals | ✅ `.q-btn-dropdown__arrow-container` | ✅ `.q-fab__trigger`, `.q-fab__actions` | Mesmo precedente |
| Tokens brand numéricos | ✅ | ✅ | Mesma justificativa |
| Focus ring | ✅ (delegado ao Quasar) | ✅ (explícito via `&:focus-visible`) | Diferença justificada: QFab não tem focus ring nativo tão visível quanto QBtnDropdown |
| Sem touch target `::before` | ✅ (Opção B delegado) | ✅ (Opção A intrínseco 56px) | **Diferença intencional**: FAB 56px já supera 48px |

---

## 12. Matriz de Composição DSS

### Papel Estrutural

O DssFab é um **container de ações primário** que orquestra ações filhas e gerencia estado de expansão.

### Composição Atual

| Componente | Status | Papel |
|-----------|--------|-------|
| `DssButton` | ✅ Fase 1 (selado) | Base visual do trigger (via QFab internamente) |
| `DssIcon` | ✅ Fase 1 (selado) | Ícone via prop ou slot |
| `DssFabAction` | ❌ Não existe (Nível 3) | Filhos canônicos do slot default |
| `DssPageSticky` | ❌ Planejado Fase 2 | Posicionamento fixo na tela |

### Gap Crítico: DssFabAction

O `DssFabAction` ainda não existe. Até ser criado, o slot default aceita `<q-fab-action>` nativamente (EXC-01).

**Classificação do gap:** Não crítica para o DssFab em si — o componente funciona corretamente com `<q-fab-action>`. O gap é crítico apenas se for necessário que os filhos tenham governança DSS (tokens, brandabilidade, auditoria).

### Anti-Patterns de Composição

- ❌ Usar `position: fixed` diretamente no DssFab — use `DssPageSticky`
- ❌ Colocar mais de 5 ações no slot — prejudica UX
- ❌ Usar DssFab para navegação — use DssTabs ou DssToolbar
- ❌ Usar DssFab para ações destrutivas como primária
- ❌ Usar HTML nativo `<button>` no slot em vez de `DssFabAction`/`q-fab-action`

---

## 13. Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `<q-fab-action>` nativo | `.example.vue`, `.md` | DssFabAction (Nível 3) ainda não construído. Remoção após DssFabAction ser selado. |
| EXC-States-01 | `1px solid ButtonBorder` | `4-output/_states.scss` | Forced-colors mode — system color keywords obrigatórios. Tokens CSS ignorados. Padrão DssCard EXC-04. |
| EXC-States-02 | `outline: 2px solid white; outline-offset: 2px` | `4-output/_states.scss` | Fallback explícito para dark mode — token `--dss-focus-ring-dark` não existe no catálogo v2.2. Necessário para WCAG 2.4.7 em fundos escuros. |

### Gate Exception v2.4

| Seletor | Justificativa |
|---------|---------------|
| `.dss-fab__qfab .q-fab__trigger` | Elemento DOM interno QFab, não subcomponente DSS. Gate de Composição v2.4 não se aplica. Precedente: DssBtnDropdown (selado Mar 2026). |
| `.dss-fab__qfab .q-fab__actions` | Idem acima. |

---

## 14. Exemplos de Uso

### Básico

```vue
<DssFab icon="add" color="primary" direction="up">
  <q-fab-action color="primary" icon="mail" label="E-mail" />
  <q-fab-action color="secondary" icon="alarm" label="Lembrete" />
</DssFab>
```

### Extended FAB (Ícone + Label)

```vue
<DssFab icon="add" color="primary" label="Nova Ação">
  <q-fab-action color="primary" icon="mail" />
</DssFab>
```

### Com v-model

```vue
<template>
  <DssFab
    v-model="isOpen"
    icon="add"
    active-icon="close"
    color="primary"
  >
    <q-fab-action color="primary" icon="star" />
  </DssFab>
  <p>Estado: {{ isOpen ? 'Aberto' : 'Fechado' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>
```

### Direções

```vue
<!-- Para a direita -->
<DssFab icon="share" color="secondary" direction="right">
  <q-fab-action color="secondary" icon="facebook" />
  <q-fab-action color="secondary" icon="linkedin" />
</DssFab>

<!-- Para baixo -->
<DssFab icon="menu" color="info" direction="down">
  <q-fab-action color="info" icon="settings" label="Configurações" />
  <q-fab-action color="info" icon="help" label="Ajuda" />
</DssFab>
```

### Posicionamento com DssPageSticky *(quando disponível)*

```vue
<!-- Uso canônico — posicionamento via DssPageSticky -->
<DssPageSticky position="bottom-right" :offset="[18, 18]">
  <DssFab icon="add" color="primary">
    <q-fab-action color="primary" icon="mail" />
  </DssFab>
</DssPageSticky>
```

### Brandabilidade

```vue
<DssFab icon="add" color="primary" brand="hub">...</DssFab>
<DssFab icon="add" color="info" brand="water">...</DssFab>
<DssFab icon="add" color="positive" brand="waste">...</DssFab>
```

---

## 15. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-01 | Claude Code — DSS Agent v2.5 | Criação inicial — Fase 2, Nível 2, Golden Context DssBtnDropdown |
