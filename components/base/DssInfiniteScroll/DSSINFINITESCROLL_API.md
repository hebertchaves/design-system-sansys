# DSSINFINITESCROLL_API.md — DssInfiniteScroll API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `offset` | `Number` | `500` | Pixels a partir do fundo do container para acionar o carregamento |
| `debounce` | `Number` | `100` | Debounce em ms para o evento de scroll |
| `initialIndex` | `Number` | `0` | Índice inicial passado ao primeiro evento `@load` |
| `scrollTarget` | `String \| Element` | `undefined` | Seletor CSS ou elemento DOM para container de scroll customizado |
| `reverse` | `Boolean` | `false` | Modo reverso — carrega ao atingir o topo (chats, feeds) |
| `disable` | `Boolean` | `false` | Desabilita detecção de scroll e acionamento de `@load` |

## Slots

| Slot | Escopo | Description |
|------|--------|-------------|
| `default` | — | Conteúdo da lista. Cresce a cada chamada de `@load` |
| `loading` | — | Indicador de carregamento customizado. Default: `DssSpinner` centralizado |
| `no-more` | — | Mensagem exibida quando `done(true)` é chamado. Default: texto "Todos os itens foram carregados" |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `@load` | `(index: number, done: (stop?: boolean) => void)` | Disparado ao atingir o offset. Chamar `done()` para sinalizar conclusão; `done(true)` para encerrar o ciclo |

## Métodos Expostos (via templateRef)

| Método | Parâmetros | Description |
|--------|-----------|-------------|
| `poll()` | — | Verifica posição de scroll e carrega mais se necessário |
| `trigger()` | — | Força carregamento independente da posição de scroll |
| `reset()` | — | Reseta índice para 0, limpa estado `noMore` e reativa o ciclo |
| `stop()` | — | Para o infinite scroll indefinidamente |
| `resume()` | — | Retoma o infinite scroll e verifica posição atual |
| `setIndex(index)` | `index: number` | Define manualmente o índice de paginação |

## Estados Reativos Expostos

| Propriedade | Type | Description |
|-------------|------|-------------|
| `isLoading` | `Ref<boolean>` | `true` entre o disparo de `@load` e a chamada de `done()` |
| `noMore` | `Ref<boolean>` | `true` após `done(true)` — sem mais itens para carregar |

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-spacing-4` | 16px | Padding do container `__no-more` |
| `--dss-spacing-6` | 24px | Padding do container `__loading` |
| `--dss-text-subtle` | — | Cor da mensagem de estado no-more |
| `--dss-opacity-disabled` | 0.4 | Opacidade do estado disabled |
| `--dss-action-hub` | — | Cor do texto no-more em contexto hub |
| `--dss-action-water` | — | Cor do texto no-more em contexto water |
| `--dss-action-waste` | — | Cor do texto no-more em contexto waste |

## CSS Classes

| Class | Description |
|-------|-------------|
| `.dss-infinite-scroll` | Root element (aplicado no QInfiniteScroll) |
| `.dss-infinite-scroll--disabled` | Estado disabled |
| `.dss-infinite-scroll--loading` | Marker class — carregamento em progresso |
| `.dss-infinite-scroll--no-more` | Marker class — sem mais itens |
| `.dss-infinite-scroll--reverse` | Marker class — modo reverso ativo |
| `.dss-infinite-scroll__loading` | Container do indicador de loading |
| `.dss-infinite-scroll__spinner` | Classe aplicada no DssSpinner padrão |
| `.dss-infinite-scroll__no-more` | Container da mensagem no-more |
| `.dss-infinite-scroll__no-more-text` | Texto padrão da mensagem no-more |

## Extensões Planejadas (Fase 3)

| Prop | Type | Descrição |
|------|------|-----------|
| `loadingLabel` | `String` | i18n do `aria-label` do container de loading. Default atual: `"Carregando mais itens"` (PT-BR hardcoded). Até Fase 3: substituir o slot `#loading` completo para controle total do markup acessível. |
| `noMoreLabel` | `String` | i18n da mensagem padrão exibida quando `done(true)` é chamado. Default atual: `"Todos os itens foram carregados"` (PT-BR hardcoded). |
