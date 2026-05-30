# DSSVIDEO_API.md — DssVideo API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `String` | `undefined` | URL do vídeo (YouTube, Vimeo, arquivo direto) |
| `title` | `String` | `undefined` | Título do iframe — obrigatório para vídeos não-decorativos (WCAG 4.1.2) |
| `decorative` | `Boolean` | `false` | Marca como decorativo: define `title=""` automaticamente. Leitores de tela ignoram o elemento. |
| `ratio` | `Number \| String` | `16/9` (≈ 1.778) | Proporção de aspecto (largura/altura). Reserva espaço antes do carregamento. Ex: `:ratio="16/9"`, `:ratio="4/3"`, `:ratio="1"` |
| `radius` | `String` | `undefined` | Border-radius via token. Aceita: `'none'`, `'sm'`, `'md'`, `'lg'`, `'full'` |

## Props Avançadas via $attrs

| Prop Quasar | Descrição |
|-------------|-----------|
| `fetchpriority` | Prioridade de fetch do iframe (`'auto'`, `'high'`, `'low'`). Flui via `v-bind="$attrs"` ao `QVideo`. |

## Slots

| Slot | Escopo | Description |
|------|--------|-------------|
| `default` | — | Overlay sobre o vídeo — renderizado acima do iframe |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| — | — | Nenhum. QVideo não emite eventos DSS. Interações com o player são gerenciadas pelo iframe nativo. |

## CSS Classes

| Class | Description |
|-------|-------------|
| `.dss-video` | Root element (aplicado no QVideo) |
| `.dss-video--radius-sm` | Border-radius sm |
| `.dss-video--radius-md` | Border-radius md |
| `.dss-video--radius-lg` | Border-radius lg |
| `.dss-video--radius-full` | Border-radius full (circular) |

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-radius-sm` | Variante `radius="sm"` |
| `--dss-radius-md` | Variante `radius="md"` |
| `--dss-radius-lg` | Variante `radius="lg"` |
| `--dss-radius-full` | Variante `radius="full"` |
