# DSSBOTTOMSHEET_API.md — DssBottomSheet API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `Boolean` | `false` | Controla a visibilidade via v-model:open |
| `persistent` | `Boolean` | `false` | Impede fechamento ao clicar fora ou pressionar ESC |
| `maximized` | `Boolean` | `false` | Exibe em altura total da tela |
| `square` | `Boolean` | `false` | Cantos superiores quadrados em vez de arredondados |
| `noEscDismiss` | `Boolean` | `false` | Desabilita fechamento via tecla ESC |
| `noBackdropDismiss` | `Boolean` | `false` | Desabilita fechamento via clique no backdrop |
| `showHandle` | `Boolean` | `true` | Exibe o handle visual de arrasto no topo |
| `transitionEnter` | `String` | `'slide-up'` | Nome da transição de entrada |
| `transitionLeave` | `String` | `'slide-down'` | Nome da transição de saída |

**Props bloqueadas (não repassadas ao QDialog):**
- `position`: fixo em `"bottom"` — invariante do bottom sheet
- `fullWidth`: fixo em `true` — bottom sheets são sempre full-width
- `dark`: modo escuro governado via `[data-theme="dark"]`
- `square` do QDialog: gerenciado via classe CSS `.dss-bottom-sheet--square`

## Slots

| Slot | Description |
|------|-------------|
| `default` | Conteúdo principal do bottom sheet |
| `header` | Cabeçalho opcional (título, botão de fechar) — renderizado apenas quando fornecido |
| `handle` | Handle customizado — quando fornecido, substitui o handle padrão (use com `showHandle: false`) |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:open` | `Boolean` | Emitido para atualizar o v-model:open |
| `open` | — | Emitido quando o bottom sheet termina de abrir |
| `close` | — | Emitido quando o bottom sheet termina de fechar |
| `before-open` | — | Emitido antes do bottom sheet começar a abrir |
| `before-close` | — | Emitido antes do bottom sheet começar a fechar |

## Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| `--dss-surface-default` | varies | Background do sheet |
| `--dss-shadow-modal` | varies | Sombra elevada |
| `--dss-radius-lg` | 16px | Cantos superiores arredondados |
| `--dss-radius-full` | 50% | Handle visual (pill) |
| `--dss-padding-3` | 12px | Padding vertical do header |
| `--dss-padding-4` | 16px | Padding horizontal do header e body |
| `--dss-spacing-1` | 4px | Altura do handle visual |
| `--dss-spacing-2` | 8px | Espaço acima do handle |
| `--dss-spacing-8` | 32px | Largura do handle visual |
| `--dss-gray-100` | — | Borda separador do header |
| `--dss-gray-200` | — | Cor do handle visual (neutro) |
| `--dss-gray-300` | — | Cor do handle em dark mode |
| `--dss-border-width-thin` | — | Forced-colors border |
| `--dss-border-width-md` | — | High-contrast outline |
| `--dss-font-family-sans` | — | Tipografia |
| `--dss-text-body` | — | Cor do texto |
| `--dss-hub-600` | — | Handle brand hub |
| `--dss-hub-primary` | — | Borda header brand hub |
| `--dss-water-500` | — | Handle brand water |
| `--dss-water-primary` | — | Borda header brand water |
| `--dss-waste-600` | — | Handle brand waste |
| `--dss-waste-primary` | — | Borda header brand waste |

## CSS Classes

| Class | Description |
|-------|-------------|
| `.dss-bottom-sheet` | Root do wrapper interno (dentro do QDialog teleportado) |
| `.dss-bottom-sheet--maximized` | Modo altura total (max-height: 100dvh, sem border-radius) |
| `.dss-bottom-sheet--square` | Cantos superiores quadrados (border-radius: 0) |
| `.dss-bottom-sheet__handle-area` | Container do handle visual (aria-hidden) |
| `.dss-bottom-sheet__handle` | Handle visual de arrasto (pill cinza) |
| `.dss-bottom-sheet__header` | Área de cabeçalho (visível apenas com slot #header) |
| `.dss-bottom-sheet__body` | Área de conteúdo principal (flex: 1, overflow-y: auto) |

## Exceptions Registradas

| ID | Tipo | Descrição |
|----|------|-----------|
| EXC-Gate-01 | ComponentDirectUsage | QDialog como motor de teleport/overlay |
| EXC-01 | CSSImportant | !important em background-color e box-shadow |
| EXC-02 | AsymmetricBorderRadius | border-radius assimétrico (topo arredondado, base reta) |
| EXC-03 | HardcodedDimension | max-height: 85vh em modo normal |
| EXC-04 | HardcodedDimension | max-height: 100dvh em modo maximized |
