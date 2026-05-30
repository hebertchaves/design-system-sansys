# DSSCAROUSEL_API.md — DssCarousel API Reference

## DssCarousel

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` *(v-model)* | `String \| Number` | — | **Obrigatório.** Nome ou índice do slide atualmente visível |
| `animated` | `Boolean` | `true` | Ativa animação de transição entre slides |
| `swipeable` | `Boolean` | `true` | Permite navegação por swipe/arrasto |
| `vertical` | `Boolean` | `false` | Orientação vertical dos slides |
| `infinite` | `Boolean` | `false` | Loop infinito ao atingir o último slide |
| `autoplay` | `Boolean \| Number` | `false` | `true` = 5000ms; `Number` = intervalo em ms |
| `height` | `String` | — | Altura CSS do carousel (ex: `'200px'`, `'50vh'`) |
| `padding` | `Boolean` | `false` | Espaçamento interno para não sobrepor as setas ao conteúdo |
| `arrows` | `Boolean` | `false` | Exibe setas de navegação anterior / próximo |
| `prevIcon` | `String` | `'chevron_left'` | Ícone Material Icons para a seta anterior |
| `nextIcon` | `String` | `'chevron_right'` | Ícone Material Icons para a seta próxima |
| `navigation` | `Boolean` | `false` | Exibe pontos de paginação (indicadores de slide) |
| `navigationPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Posição dos pontos de paginação |
| `navigationActiveIcon` | `String` | `'circle'` | Ícone Material Icons do indicador ativo |
| `navigationIcon` | `String` | `'radio_button_unchecked'` | Ícone Material Icons do indicador inativo |
| `thumbnails` | `Boolean` | `false` | Exibe miniaturas dos slides |
| `controlType` | `'regular' \| 'flat' \| 'outline' \| 'push' \| 'unelevated'` | `'flat'` | Estilo dos botões de controle |
| `fullscreen` | `Boolean` | `false` | Ativa modo fullscreen |
| `keepAlive` | `Boolean` | `false` | Mantém slides não visíveis no cache (KeepAlive) |
| `keepAliveInclude` | `String \| RegExp \| Array` | — | Nomes dos slides incluídos no keep-alive |
| `keepAliveExclude` | `String \| RegExp \| Array` | — | Nomes dos slides excluídos do keep-alive |
| `keepAliveMax` | `Number` | — | Máximo de slides no cache |
| `ariaLabel` | `String` | `'Carrossel de conteúdo'` | Rótulo acessível para o landmark `region` |

### Props Bloqueadas (não expostas)

| Prop Quasar | Motivo do bloqueio |
|-------------|-------------------|
| `control-color` | CSS governa via `--q-color-primary` (EXC-Gate-02a) |
| `control-text-color` | CSS governa; exposição redundante |
| `dark` | Modo escuro via `[data-theme="dark"]` global |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Aceita componentes `DssCarouselSlide` e opcionalmente `QCarouselControl` para controles customizados |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `String \| Number` | Emitido quando o slide visível muda |
| `before-transition` | `(newSlide, oldSlide)` | Emitido antes da animação de transição |
| `transition` | `(newSlide, oldSlide)` | Emitido após a animação de transição completar |
| `fullscreen` | `Boolean` | Emitido ao entrar/sair do modo fullscreen |

---

## DssCarouselSlide

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `String \| Number` | — | **Obrigatório.** Nome único do slide, referenciado pelo `v-model` do `DssCarousel` |
| `disable` | `Boolean` | `false` | Desabilita este slide (pula na navegação automática) |
| `imgSrc` | `String` | — | URL de imagem de fundo para o slide |
| `imgStyle` | `Object \| String \| Array` | — | Estilo inline da imagem de fundo |
| `imgClass` | `Object \| String \| Array` | — | Classe CSS da imagem de fundo |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Conteúdo do slide — qualquer markup ou componente DSS |

---

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-action-primary` | `var(--dss-primary)` | Cor primária dos controles (default / sem brand) |
| `--dss-gray-400` | `#bdbdbd` | Cor dos pontos de paginação inativos |
| `--dss-gray-600` | `#757575` | Pontos inativos em dark mode |
| `--dss-gray-700` | `#616161` | Pontos inativos em high contrast |
| `--dss-hub-600` | `#f57c00` | Controles brand Hub |
| `--dss-water-500` | `#1565c0` | Controles brand Water |
| `--dss-waste-600` | `#388e3c` | Controles brand Waste |
| `--dss-surface-muted` | `var(--dss-gray-200)` | Background do carousel sem conteúdo |
| `--dss-surface-hover` | `rgba(0,0,0,0.04)` | Overlay hover nas setas |
| `--dss-radius-md` | `8px` | Arredondamento do container do carousel |
| `--dss-radius-sm` | `4px` | Arredondamento das miniaturas |
| `--dss-border-width-thin` | `1px` | Borda em forced-colors |
| `--dss-border-width-md` | `2px` | Destaque da miniatura ativa e foco |
| `--dss-spacing-1` | `4px` | Gap entre miniaturas |
| `--dss-spacing-2` | `8px` | Padding vertical das miniaturas |
| `--dss-spacing-3` | `12px` | Padding horizontal das miniaturas |
| `--dss-duration-hover` | `150ms` | Transição hover das setas |
| `--dss-duration-base` | `250ms` | Transição das miniaturas |
| `--dss-duration-0` | `0ms` | Override prefers-reduced-motion |
| `--dss-easing-hover` | `ease-out` | Curva hover das setas |
| `--dss-easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Curva das miniaturas |

## CSS Classes

| Class | Description |
|-------|-------------|
| `.dss-carousel` | Root element do DssCarousel |
| `.dss-carousel--arrows` | Modificador: carousel com setas |
| `.dss-carousel--navigation` | Modificador: carousel com pontos de paginação |
| `.dss-carousel--thumbnails` | Modificador: carousel com thumbnails |
| `.dss-carousel--padding` | Modificador: carousel com padding interno |
| `.dss-carousel--vertical` | Modificador: carousel em orientação vertical |
| `.dss-carousel--infinite` | Modificador: carousel com loop infinito |
| `.dss-carousel--autoplay` | Modificador: carousel com autoplay ativo |
| `.dss-carousel--navigation-bottom` | Modificador: paginação na parte inferior (padrão) |
| `.dss-carousel--navigation-top` | Modificador: paginação na parte superior |
| `.dss-carousel--brand-hub` | Modificador: força brand Hub sem `data-brand` no DOM |
| `.dss-carousel--brand-water` | Modificador: força brand Water sem `data-brand` no DOM |
| `.dss-carousel--brand-waste` | Modificador: força brand Waste sem `data-brand` no DOM |
| `.dss-carousel__slide` | Root do DssCarouselSlide |
