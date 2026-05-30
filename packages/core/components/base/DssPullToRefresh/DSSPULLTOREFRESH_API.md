# DSSPULLTOREFRESH_API.md — DssPullToRefresh API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho visual do indicador de pull |
| `disabled` | `Boolean` | `false` | Desativa o gesto de puxar e aplica estilo desabilitado |
| `noMouse` | `Boolean` | `false` | Restringe a interação apenas a eventos de toque (sem mouse) |
| `icon` | `String` | `undefined` | Ícone Material exibido no handler. Se omitido, usa o padrão do QPullToRefresh (`refresh`) |

### Props explicitamente NÃO expostas (bloqueadas do QPullToRefresh)

| Prop QPullToRefresh | Motivo da remoção |
|---------------------|-------------------|
| `color` | DSS governa via CSS (`--q-color-primary`) usando tokens de brand |
| `bg-color` | DSS governa via CSS (descendant selector no handler) |
| `pull-message` | Removido: DSS usa apenas feedback visual (sem texto) |
| `release-message` | Removido: mesma razão |
| `refresh-message` | Removido: mesma razão |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Área de conteúdo deslizável (lista, feed, grade, etc.) |

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `refresh` | `done: () => void` | Emitido quando a ação de puxar ultrapassa o threshold. A aplicação **DEVE** chamar `done()` ao finalizar a atualização para encerrar o estado de loading. |

## Métodos expostos (`defineExpose`)

| Método | Descrição |
|--------|-----------|
| `trigger()` | Dispara a ação de refresh programaticamente, sem gesto do usuário |

## Classes CSS geradas

| Classe | Condição |
|--------|----------|
| `.dss-pull-to-refresh` | Sempre presente (root) |
| `.dss-pull-to-refresh--sm` | `size="sm"` |
| `.dss-pull-to-refresh--md` | `size="md"` (padrão) |
| `.dss-pull-to-refresh--lg` | `size="lg"` |
| `.dss-pull-to-refresh--disabled` | `disabled=true` |

## Tokens utilizados

| Token | Uso |
|-------|-----|
| `--dss-action-primary` | Cor do ícone do handler (padrão, sem brand) |
| `--dss-surface-default` | Background do handler (padrão, sem brand) |
| `--dss-shadow-md` | Sombra do handler (padrão) |
| `--dss-padding-1` | Padding interno do handler (size=sm) |
| `--dss-padding-2` | Padding interno do handler (size=md) |
| `--dss-padding-3` | Padding interno do handler (size=lg) |
| `--dss-icon-size-sm` | Tamanho do ícone (size=sm) |
| `--dss-icon-size-md` | Tamanho do ícone (size=md) |
| `--dss-icon-size-lg` | Tamanho do ícone (size=lg) |
| `--dss-hub-600` | Cor do ícone em brand=hub |
| `--dss-hub-50` | Background do handler em brand=hub |
| `--dss-shadow-hub-md` | Sombra do handler em brand=hub |
| `--dss-water-500` | Cor do ícone em brand=water |
| `--dss-water-50` | Background do handler em brand=water |
| `--dss-shadow-water-md` | Sombra do handler em brand=water |
| `--dss-waste-600` | Cor do ícone em brand=waste |
| `--dss-waste-50` | Background do handler em brand=waste |
| `--dss-shadow-waste-md` | Sombra do handler em brand=waste |
| `--dss-border-width-thick` | Borda do handler em prefers-contrast: more |

## Exceções registradas

| ID | Tipo | Local | Descrição resumida |
|----|------|-------|--------------------|
| `EXC-Gate-01` | gateException | `1-structure/` | QPullToRefresh como root |
| `EXC-Gate-02 (a)` | gateException | `2-composition/_base.scss` | `--q-color-primary` para cor do ícone |
| `EXC-Gate-02 (b)` | gateException | `2-composition/_base.scss`, `3-variants/`, `4-output/` | Descendant selectors `.q-pull-to-refresh__handler` e `.q-pull-to-refresh__arrow` |
| `EX-Structural-01` | structuralException | `2-composition/_base.scss` | `border-radius: 50%` constante geométrica para forma circular |
| `EXC-States-01` | statesException | `4-output/_states.scss` | `prefers-reduced-motion` via CSS suprime animação do handler |
| `EXC-States-02` | statesException | `4-output/_states.scss` | `forced-colors` usa SystemColor keywords |
| `EXC-Expose-01` | exposeException | `1-structure/` | `defineExpose` do método `trigger()` |
