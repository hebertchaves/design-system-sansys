# DSSDIALOG_API.md — DssDialog API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `Boolean` | `false` | Controla visibilidade via `v-model:open`. Mapeia para `v-model` do QDialog. |
| `persistent` | `Boolean` | `false` | Impede fechamento ao clicar fora ou pressionar ESC. Mapeia para `persistent` do QDialog. |
| `seamless` | `Boolean` | `false` | Remove backdrop e permite interação com conteúdo abaixo. Mapeia para `seamless` do QDialog. |
| `maximized` | `Boolean` | `false` | Exibe em tela cheia (100vw × 100vh). Mapeia para `maximized` do QDialog. |
| `fullWidth` | `Boolean` | `false` | Ocupa 100% da largura disponível. Mapeia para `full-width` do QDialog. |
| `fullHeight` | `Boolean` | `false` | Ocupa 100% da altura disponível. Mapeia para `full-height` do QDialog. |
| `position` | `'standard' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'standard'` | Define a posição do diálogo na tela. Mapeia para `position` do QDialog. |
| `transitionEnter` | `String` | `'scale'` | Nome da transição de entrada (ex: `'fade'`, `'slide-up'`). Mapeia para `transition-show` do QDialog. |
| `transitionLeave` | `String` | `'scale'` | Nome da transição de saída (ex: `'fade'`, `'slide-down'`). Mapeia para `transition-hide` do QDialog. |
| `disableEsc` | `Boolean` | `false` | Desabilita fechamento via tecla ESC. Mapeia para `no-esc-dismiss` do QDialog. |
| `disableBackdropClick` | `Boolean` | `false` | Desabilita fechamento via clique no backdrop. Mapeia para `no-backdrop-dismiss` do QDialog. |

## Slots

| Slot | Required | Description |
|------|----------|-------------|
| `#header` | Não | Área do cabeçalho. Renderizado apenas quando fornecido. Recomendado: título + botão fechar. |
| `default` | Sim | Conteúdo principal do diálogo. Pode conter qualquer componente DSS. |
| `#footer` | Não | Área do rodapé. Renderizado apenas quando fornecido. Recomendado: botões de ação. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:open` | `Boolean` | Emitido para atualizar o v-model:open |
| `open` | — | Emitido quando o diálogo termina de abrir (após animação de entrada) |
| `close` | — | Emitido quando o diálogo termina de fechar (após animação de saída) |
| `before-open` | — | Emitido antes do diálogo iniciar abertura |
| `before-close` | — | Emitido antes do diálogo iniciar fechamento |

## CSS Classes

| Class | Element | Description |
|-------|---------|-------------|
| `.dss-dialog` | Root (wrapper interno) | Classe raiz do diálogo |
| `.dss-dialog__header` | Header div | Área do cabeçalho |
| `.dss-dialog__body` | Body div | Área de conteúdo principal |
| `.dss-dialog__footer` | Footer div | Área do rodapé |
| `.dss-dialog--maximized` | Root | Variante fullscreen |
| `.dss-dialog--full-width` | Root | Variante 100% largura |
| `.dss-dialog--full-height` | Root | Variante 100% altura |
| `.dss-dialog--seamless` | Root | Variante sem backdrop |
| `.dss-dialog--position-{standard\|top\|bottom\|left\|right}` | Root | Variante de posição |

## Tokens Used

| Token | Layer | Usage |
|-------|-------|-------|
| `--dss-surface-default` | L2 | Background |
| `--dss-shadow-modal` | L2 | Box shadow |
| `--dss-radius-lg` | L2, L3 | Border radius |
| `--dss-padding-4` | L2 | Padding header/footer |
| `--dss-padding-6` | L2 | Padding body, padding lateral |
| `--dss-spacing-2` | L2 | Gap footer buttons |
| `--dss-gray-100` | L2 | Dividers header/footer |
| `--dss-font-family-sans` | L2 | Typography |
| `--dss-text-body` | L2 | Text color |
| `--dss-elevation-3` | L3 | Seamless variant shadow |
| `--dss-hub-primary` | L4 | Brand Hub border |
| `--dss-water-primary` | L4 | Brand Water border |
| `--dss-waste-primary` | L4 | Brand Waste border |

## Gate Exceptions

| ID | Gate | Justification |
|----|------|---------------|
| EXC-Gate-01 | Gate de Composição v2.4 — QDialog usado diretamente | QDialog fornece infraestrutura de teleport, backdrop, focus-trap e posicionamento que não possui equivalente DSS |

## Mapeamento Quasar → DSS

| Quasar (QDialog) | DSS (DssDialog) | Tipo de Mudança |
|------------------|-----------------|-----------------|
| `v-model` | `v-model:open` | Renomeado (clareza semântica) |
| `persistent` | `persistent` | Mantido |
| `seamless` | `seamless` | Mantido |
| `maximized` | `maximized` | Mantido |
| `full-width` | `fullWidth` | camelCase DSS |
| `full-height` | `fullHeight` | camelCase DSS |
| `position` | `position` | Mantido |
| `transition-show` | `transitionEnter` | Renomeado (semântica direcional) |
| `transition-hide` | `transitionLeave` | Renomeado (semântica direcional) |
| `no-esc-dismiss` | `disableEsc` | Renomeado (positivo/negativo) |
| `no-backdrop-dismiss` | `disableBackdropClick` | Renomeado (positivo/negativo) |
| `@show` | `@open` | Renomeado (semântica DSS) |
| `@hide` | `@close` | Renomeado (semântica DSS) |
| `@before-show` | `@before-open` | Renomeado (semântica DSS) |
| `@before-hide` | `@before-close` | Renomeado (semântica DSS) |
| `dark` | ❌ Bloqueado | Modo escuro global via `[data-theme="dark"]` |
| `square` | ❌ Bloqueado | Viola `--dss-radius-lg` |
