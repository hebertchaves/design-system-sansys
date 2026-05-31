# DSSSTEP_API — Referência Técnica

Referência técnica completa do componente DssStep.

---

## Props

### `name` *(obrigatório)*

| | |
|---|---|
| **Tipo** | `string \| number` |
| **Padrão** | — |
| **Descrição** | Identificador único do passo. Usado pelo v-model do container QStepper/DssStepper para determinar o passo ativo. |

---

### `title`

| | |
|---|---|
| **Tipo** | `string` |
| **Padrão** | `undefined` |
| **Descrição** | Texto principal exibido ao lado do dot. Renderizado como `.q-stepper__title`. |

---

### `caption`

| | |
|---|---|
| **Tipo** | `string` |
| **Padrão** | `undefined` |
| **Descrição** | Texto secundário exibido abaixo do título. Renderizado como `.q-stepper__caption`. Ativa a classe `dss-step--has-caption`. |

---

### `icon`

| | |
|---|---|
| **Tipo** | `string` |
| **Padrão** | `undefined` |
| **Descrição** | Nome de ícone Material Icons. Substitui o número padrão no dot do passo. Ativa a classe `dss-step--has-icon`. |

---

### `activeIcon`

| | |
|---|---|
| **Tipo** | `string` |
| **Padrão** | `undefined` |
| **Descrição** | Ícone exibido dentro do dot quando o passo está ativo (passo corrente). Sobrescreve `icon` durante o estado ativo. |

---

### `doneIcon`

| | |
|---|---|
| **Tipo** | `string` |
| **Padrão** | `'check'` (padrão Quasar) |
| **Descrição** | Ícone exibido quando `done=true`. O Quasar usa `check` por padrão; forneça um ícone customizado se necessário. |

---

### `errorIcon`

| | |
|---|---|
| **Tipo** | `string` |
| **Padrão** | `'warning'` (padrão Quasar) |
| **Descrição** | Ícone exibido quando `error=true`. O Quasar usa `warning` por padrão. |

---

### `done`

| | |
|---|---|
| **Tipo** | `boolean` |
| **Padrão** | `false` |
| **Descrição** | Marca o passo como concluído. Aplica dot com `--dss-feedback-success` e ícone de conclusão. Ativa a classe `dss-step--done`. |

---

### `error`

| | |
|---|---|
| **Tipo** | `boolean` |
| **Padrão** | `false` |
| **Descrição** | Marca o passo com estado de erro. Aplica dot com `--dss-feedback-error` e ícone de alerta. Ativa a classe `dss-step--error`. |

---

### `disable`

| | |
|---|---|
| **Tipo** | `boolean` |
| **Padrão** | `false` |
| **Descrição** | Desabilita interação com o passo. Aplica opacidade `--dss-opacity-disabled` e `cursor: not-allowed` no cabeçalho. Ativa a classe `dss-step--disable`. |

---

### `headerNav`

| | |
|---|---|
| **Tipo** | `boolean` |
| **Padrão** | `false` |
| **Descrição** | Torna o cabeçalho do passo clicável para navegação direta. Ativa overlay hover/active via `::after`. Ativa a classe `dss-step--header-nav`. Funciona em conjunto com `q-stepper` sem modo linear. |

---

## Props bloqueadas (não disponíveis no DssStep)

| Prop QStep | Motivo do bloqueio |
|-----------|-------------------|
| `color` | Cor base governada por `--dss-action-primary` e overrides de brand |
| `active-color` | Estado ativo usa `--dss-action-primary` (ou cor de brand) |
| `done-color` | Estado concluído usa `--dss-feedback-success` |
| `error-color` | Estado de erro usa `--dss-feedback-error` |
| `prefix` | DSS governa numeração via QStep nativo; prefixos textuais não estão no escopo do DSS |

---

## Eventos

DssStep não emite eventos próprios. A navegação entre passos é gerenciada pelo container QStepper via `v-model`.

---

## Slots

### `default`

| | |
|---|---|
| **Descrição** | Conteúdo do passo. Exibido na área expansível quando o passo está ativo. |
| **Aceita** | Qualquer componente DSS ou HTML |
| **Renderiza em** | `.q-stepper__step-content > .q-stepper__step-inner` |

---

## Classes CSS geradas

| Classe | Condição |
|--------|---------|
| `dss-step` | Sempre presente |
| `dss-step--done` | `done=true` |
| `dss-step--error` | `error=true` |
| `dss-step--disable` | `disable=true` |
| `dss-step--has-icon` | `icon` fornecido |
| `dss-step--has-caption` | `caption` fornecido |
| `dss-step--header-nav` | `headerNav=true` |
| `q-stepper__step--active` | Adicionada pelo QStepper pai quando este é o passo ativo |

---

## Tokens CSS utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-icon-size-lg` | 32px | Dimensão do dot (padrão) |
| `--dss-icon-size-md` | 24px | Dimensão do dot (dense) + ícone interno |
| `--dss-icon-size-sm` | 20px | Ícone interno no dot (padrão) |
| `--dss-icon-size-xs` | 16px | Ícone interno no dot (dense) |
| `--dss-compact-control-height-sm` | ~36px | Altura mínima do tab em modo dense |
| `--dss-touch-target-md` | ~44px | Altura mínima do tab (WCAG 2.5.5) |
| `--dss-spacing-0_5` | 2px | Margem superior do caption |
| `--dss-spacing-2` | 8px | Padding em modo dense |
| `--dss-spacing-3` | 12px | Padding-block do tab + padding label |
| `--dss-spacing-4` | 16px | Padding-inline do tab e conteúdo |
| `--dss-font-family-sans` | Roboto/sans | Família tipográfica |
| `--dss-font-size-xs` | 12px | Texto em modo dense |
| `--dss-font-size-sm` | 14px | Número no dot + caption |
| `--dss-font-size-base` | 16px | Título do passo |
| `--dss-font-weight-normal` | 400 | Título inativo + caption |
| `--dss-font-weight-medium` | 500 | Título ativo + número no dot |
| `--dss-line-height-tight` | 1.25 | Título |
| `--dss-line-height-normal` | 1.5 | Caption |
| `--dss-text-subtle` | Cinza secundário | Texto/dot inativo |
| `--dss-text-body` | Cinza primário | Título ativo/done |
| `--dss-text-inverse` | Branco | Ícone/número dentro do dot colorido |
| `--dss-surface-muted` | Cinza claro | Background do dot inativo |
| `--dss-action-primary` | Cor primária | Background do dot ativo |
| `--dss-feedback-success` | Verde | Background do dot done |
| `--dss-feedback-error` | Vermelho | Background do dot error |
| `--dss-gray-300` | #e5e5e5 | Cor do conector entre passos |
| `--dss-gray-600` | #737373 | Conector em dark mode |
| `--dss-opacity-disabled` | 0.4 | Opacidade do passo desabilitado |
| `--dss-opacity-hover` | — | Overlay de hover (header-nav) |
| `--dss-opacity-active` | — | Overlay de active (header-nav) |
| `--dss-focus-ring` | Cor de foco | Outline de foco (header-nav) |
| `--dss-border-width-md` | — | Espessura do outline de foco |
| `--dss-border-width-thick` | — | Foco em high-contrast |
| `--dss-border-width-thin` | — | Borda do dot em forced-colors |
| `--dss-duration-150` | 150ms | Duração das transições |
| `--dss-easing-standard` | cubic-bezier... | Curva de animação |
| `--dss-hub-600` | Laranja | Brand Hub — dot ativo |
| `--dss-water-600` | Azul | Brand Water — dot ativo |
| `--dss-waste-600` | Verde | Brand Waste — dot ativo |

---

## Estrutura DOM renderizada

```html
<!-- .dss-step é aplicado no elemento raiz do q-step -->
<div class="q-stepper__step dss-step [dss-step--done|dss-step--error|...]">

  <!-- Cabeçalho (clicável apenas com headerNav=true) -->
  <div class="q-stepper__tab [cursor-pointer]">
    <!-- Dot com número ou ícone -->
    <div class="q-stepper__dot">
      <span>1</span> <!-- ou <i class="q-icon">check</i> -->
    </div>

    <!-- Label: título + caption -->
    <div class="q-stepper__label">
      <div class="q-stepper__title">Título do passo</div>
      <div class="q-stepper__caption">Subtítulo opcional</div>
    </div>
  </div>

  <!-- Área de conteúdo (colapsável pelo QStepper) -->
  <div class="q-stepper__step-content">
    <div class="q-stepper__step-inner">
      <!-- slot default -->
    </div>
  </div>

  <!-- Linha conectora (renderizada pelo QStepper em alguns layouts) -->
  <div class="q-stepper__line" />

</div>
```

---

## Paridade com Golden Reference (DssTab)

| Aspecto | DssTab | DssStep | Justificativa da diferença |
|---------|--------|---------|---------------------------|
| Wrapper Quasar | `<q-tab>` | `<q-step>` | Componentes equivalentes de diferentes famílias |
| Touch target | `min-height: --dss-touch-target-md` | `min-height: --dss-touch-target-md` (header) | Idêntico |
| Focus ring | `outline + --dss-focus-ring` | `outline + --dss-focus-ring` (headerNav only) | DssStep: somente quando clicável |
| Overlay `::after` | Sempre (tab é sempre clicável) | Somente `dss-step--header-nav` | DssStep: header pode ser não-clicável |
| `inheritAttrs: false` | Sim | Sim | Idêntico |
| `defineOptions` | Sim | Sim | Idêntico |
| Estados de cor | Indicador linear | Dot circular | Diferença visual do componente Quasar |
| `aria-hidden` decorativos | n/a | n/a | Sem elementos decorativos independentes |
| `-webkit-tap-highlight-color` | Sim | Sim (no tab) | Idêntico |
| Dark mode | Sim | Sim | Idêntico |
| Forced-colors | ButtonText/GrayText/Highlight | ButtonText/GrayText/Highlight | Idêntico |
| Print | `#000 !important` | `#000 !important` | Idêntico |
| Brands | Dual selector | Dual selector | Idêntico |
