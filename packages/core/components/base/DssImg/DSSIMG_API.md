# DSSIMG_API.md — DssImg API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `String` | `undefined` | URL da imagem a ser carregada |
| `alt` | `String` | `undefined` | Texto alternativo — obrigatório para imagens não-decorativas (WCAG 1.1.1) |
| `decorative` | `Boolean` | `false` | Marca como decorativa: define `alt=""` automaticamente. Leitores de tela ignoram o elemento. |
| `ratio` | `Number \| String` | `undefined` | Proporção de aspecto (largura/altura). Reserva espaço antes do carregamento. Ex: `16/9`, `4/3`, `1` |
| `fit` | `String` | `'cover'` | Como a imagem se ajusta ao container. Aceita: `'cover'`, `'contain'`, `'fill'`, `'none'`, `'scale-down'` |
| `loading` | `String` | `'lazy'` | Comportamento de carregamento. `'lazy'` adia até a imagem entrar na viewport. Aceita: `'lazy'`, `'eager'` |
| `fallbackSrc` | `String` | `undefined` | URL da imagem exibida quando `src` falha ao carregar |
| `placeholderSrc` | `String` | `undefined` | LQIP: imagem de baixa qualidade exibida enquanto a imagem principal carrega |
| `position` | `String` | `undefined` | Posição da imagem no container (equivalente a `background-position`). Ex: `'50% 50%'`, `'top left'` |
| `radius` | `String` | `undefined` | Border-radius via token. Aceita: `'none'`, `'sm'`, `'md'`, `'lg'`, `'full'` |
| `noTransition` | `Boolean` | `false` | Desativa a transição de fade-in ao carregar |

## Props Bloqueadas (não expostas)

| Prop Quasar | Motivo do bloqueio |
|-------------|-------------------|
| `spinner-color` | Gerenciado internamente via DssSpinner no slot `#loading` |
| `spinner-size` | DSS usa `DssSpinner size="sm"` como padrão |
| `no-spinner` | Irrelevante quando o slot `#loading` substitui o spinner padrão |

> **Nota:** Props Quasar não declaradas acima (ex: `srcset`, `sizes`, `img-class`, `img-style`, `no-native-menu`) fluem via `v-bind="$attrs"` para o `QImg` interno — funcionalidade avançada disponível sem declaração explícita na API DSS.

## Slots

| Slot | Escopo | Description |
|------|--------|-------------|
| `default` | — | Overlay sobre a imagem carregada — renderizado acima do `<img>` |
| `loading` | — | Indicador de carregamento customizado. Default: `DssSpinner size="sm"` centralizado |
| `error` | — | Estado de erro customizado. Default: ícone `broken_image` centralizado |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `@load` | — | Disparado quando a imagem carregou com sucesso |
| `@error` | — | Disparado quando o carregamento falhou (após tentativas de `src` e `fallbackSrc`) |

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-surface-disabled` | — | Fundo dos containers `__loading` e `__error` |
| `--dss-text-subtle` | — | Cor do ícone de erro (estado sem brand) |
| `--dss-radius-sm` | — | Variante de border-radius `radius="sm"` |
| `--dss-radius-md` | — | Variante de border-radius `radius="md"` |
| `--dss-radius-lg` | — | Variante de border-radius `radius="lg"` |
| `--dss-radius-full` | — | Variante de border-radius `radius="full"` |
| `--dss-action-hub` | — | Cor do ícone de erro em contexto brand hub |
| `--dss-action-water` | — | Cor do ícone de erro em contexto brand water |
| `--dss-action-waste` | — | Cor do ícone de erro em contexto brand waste |

## CSS Classes

| Class | Description |
|-------|-------------|
| `.dss-img` | Root element (aplicado no QImg) |
| `.dss-img--radius-sm` | Variante border-radius sm |
| `.dss-img--radius-md` | Variante border-radius md |
| `.dss-img--radius-lg` | Variante border-radius lg |
| `.dss-img--radius-full` | Variante border-radius full (circular) |
| `.dss-img__loading` | Container do indicador de loading |
| `.dss-img__error` | Container do estado de erro |
