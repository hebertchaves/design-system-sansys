# DssInfiniteScroll — Documentação (Template 13.1)

## 1. Visão Geral

**O que é:** `DssInfiniteScroll` é um container comportamental que carrega conteúdo dinamicamente à medida que o usuário rola a página ou um container específico. Ele detecta quando o scroll se aproxima do limite definido (`offset`) e dispara o evento `@load`, permitindo que a aplicação adicione mais itens assincronamente.

**Quando usar:**
- Feeds de notícias, timelines ou listas de atividade com volume indefinido
- Tabelas paginadas onde o carregamento sob demanda melhora a performance
- Chats e mensageiros no modo `reverse` (carrega mensagens mais antigas ao rolar para o topo)
- Qualquer lista onde carregar todos os dados de uma vez seria inviável

**Quando NÃO usar:**
- Listas com volume conhecido e finito pequeno — prefira paginação explícita (`DssPagination`)
- Quando o usuário precisa navegar diretamente a uma posição específica — infinite scroll impede isso
- Em formulários ou contextos onde perder o estado de scroll seria problemático
- Quando combinado com `DssVirtualScroll` para listas > 10.000 itens, avaliar qual componente gerencia o scroll

---

## 2. Classificação DSS

- **Tipo:** Container comportamental de scroll infinito (não interativo como container — itens filhos gerenciam interação)
- **Categoria:** Scroll e Virtualização
- **Fase:** 2 — Nível 1
- **Família:** Scroll e Virtualização
- **Interativo:** Não (o scroll é nativo do browser; o componente detecta eventos, mas não os gera)

---

## 3. API

### Props
*(ver DSSINFINITESCROLL_API.md — Seção Props)*

### Slots
*(ver DSSINFINITESCROLL_API.md — Seção Slots)*

### Events
*(ver DSSINFINITESCROLL_API.md — Seção Events)*

### Métodos Expostos
*(ver DSSINFINITESCROLL_API.md — Seção Métodos Expostos)*

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Lista renderizada; aguardando scroll |
| loading | ✅ | Spinner ativo entre `@load` e `done()` |
| no-more | ✅ | Exibido após `done(true)` — sem mais itens |
| disabled | ✅ | `pointer-events: none` + `opacity: --dss-opacity-disabled` |
| hover | ❌ N/A | Container comportamental — itens filhos gerenciam |
| focus | ❌ N/A | Scroll nativo do browser |
| active | ❌ N/A | Container comportamental |
| error | ❌ N/A | Responsabilidade do consumidor: usar `disable=true` durante tratamento de erro e renderizar feedback no slot `default` |

---

## 5. Comportamentos Implícitos

### inheritAttrs: false
`$attrs` (class extra, id, data-*, aria-*) são forwarded via `v-bind="$attrs"` diretamente no `QInfiniteScroll`. O QInfiniteScroll é o root element efetivo — sem div wrapper intermediário.

### Delegação ao Quasar
`QInfiniteScroll` gerencia toda a lógica: detecção de scroll, debounce, cálculo de offset, threshold de carregamento e ciclo de vida de paginação. `DssInfiniteScroll` não reimplementa nenhuma dessas lógicas.

### done() wrapping
A função `done` passada ao consumidor via `@load` é um wrapper interno que:
1. Mantém `isLoading = true` durante o carregamento
2. Define `isLoading = false` ao ser chamada
3. Define `noMore = true` se `done(true)` for chamada
4. Repassa para a `done` original do Quasar

### slot no-more dentro do slot default
O slot `no-more` é renderizado DENTRO do slot default do `QInfiniteScroll` (não após como element irmão). Isso garante que a mensagem apareça naturalmente ao final do conteúdo scrollável, visível apenas após o usuário atingir o fim da lista.

### Prop `tag` não exposta
`DssInfiniteScroll` sempre renderiza como `<div>` (root do `QInfiniteScroll`). A prop `tag` do Quasar não é exposta. Para containers de scroll customizados, usar `scroll-target`.

### `user-select` não aplicado no container
`user-select: none` **não é aplicado** no root element. Itens filhos gerenciam sua própria política de seleção de texto. Aplicar `user-select: none` no container bloquearia seleção de conteúdo textual em casos de uso legítimos (ex: chat reverso com mensagens copiáveis). Consistente com DssVirtualScroll (Golden Context). Consumidores que precisarem desabilitar seleção podem aplicar a classe utilitária `no-wrap` ou estilo inline no wrapper externo.

### aria-label hardcoded PT-BR
O `aria-label="Carregando mais itens"` do container de loading está fixo em português (idioma padrão do DSS). Prop `loadingLabel` para i18n está planejada para Fase 3. Consumidores multilíngues podem substituir o slot `#loading` completo com seu próprio container acessível.

---

## 6. Paridade com Golden Reference (DssChip)

| Aspecto | DssChip | DssInfiniteScroll | Justificativa |
|---------|---------|-------------------|---------------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Idêntico |
| `inheritAttrs: false` + forwarding | ✅ | ✅ | Idêntico — forwarding para root |
| Touch target `::before` | ✅ (interativo) | ❌ N/A | Container não interativo — Opção B |
| `-webkit-tap-highlight-color` | ✅ | ❌ N/A | Sem interatividade direta de tap |
| `disabled` via opacity | ✅ | ✅ | `--dss-opacity-disabled` = 0.4 |
| `disabled` via pointer-events | ✅ | ✅ | `pointer-events: none` |
| Brand via `[data-brand]` descendant | ✅ | ✅ | Padrão DSS — descendant com espaço |
| estados no-more / loading com ARIA | ❌ N/A | ✅ | Específico de scroll — role="status" |
| `defineExpose` de métodos | ❌ N/A | ✅ | Específico — API imperativa do Quasar |

---

## 7. Acessibilidade

- **WCAG 2.1 AA**: Carregamento comunicado via `role="status"` + `aria-live="polite"` no container loading
- **Touch target**: N/A — componente container não interativo
- **ARIA loading**: `aria-label="Carregando mais itens"` no container; spinner com `aria-hidden="true"` (decorativo)
- **ARIA no-more**: `role="status"` + `aria-live="polite"` na mensagem de fim de lista
- **Navegação por teclado**: N/A — navegação nos itens é responsabilidade dos filhos
- **prefers-contrast: more**: texto no-more usa `currentColor` para contraste máximo
- **forced-colors: active**: `CanvasText` para o texto no-more
- **print**: estado loading oculto; conteúdo carregado permanece visível
- **WCAG 2.4.3 Focus Order**: foco não é gerenciado pelo componente — itens filhos assumem responsabilidade

---

## 8. Tokens Utilizados

| Token | Valor | Uso no SCSS |
|-------|-------|-------------|
| `--dss-spacing-4` | 16px | Padding do container `__no-more` |
| `--dss-spacing-6` | 24px | Padding do container `__loading` |
| `--dss-text-subtle` | — | Cor da mensagem no-more (padrão) |
| `--dss-opacity-disabled` | 0.4 | Estado disabled |
| `--dss-action-hub` | — | Texto no-more em brand hub |
| `--dss-action-water` | — | Texto no-more em brand water |
| `--dss-action-waste` | — | Texto no-more em brand waste |

---

## 9. Exceções Registradas

### EXC-Gate-01 — QInfiniteScroll como root element direto
`QInfiniteScroll` é usado como root element do componente. `$attrs` são forwarded via `v-bind="$attrs"` no próprio `QInfiniteScroll`, sem div wrapper intermediário. Justificativa: evita DOM desnecessário e preserva a semântica de scroll detection nativa do Quasar. Localização: `1-structure/DssInfiniteScroll.ts.vue`.

### EXC-Expose-01 — defineExpose com API imperativa
`poll`, `trigger`, `reset`, `stop`, `resume`, `setIndex` são delegados ao `QInfiniteScroll` interno via `innerRef`. Necessário para controle programático externo do ciclo de paginação — padrão sem precedente no DSS, documentado como exceção. Localização: `1-structure/DssInfiniteScroll.ts.vue`.

---

## 10. Composição e Matriz DSS

### Papel estrutural
`DssInfiniteScroll` é um container comportamental de scroll — detecta eventos e gerencia o ciclo de paginação. Não renderiza conteúdo próprio além dos indicadores de estado (loading, no-more).

### Componentes DSS recomendados

| Componente | Função | Status |
|-----------|--------|--------|
| `DssSpinner` | Loading indicator (default no slot #loading) | ✅ Fase 1 |
| `DssList + DssItem` | Estrutura canônica para itens no slot default | ✅ Fase 2 |
| `DssCard` | Container estrutural ao envolver DssInfiniteScroll | ✅ Fase 1 |
| `DssVirtualScroll` | Complementar para > 10k itens (virtualização DOM) | ✅ Fase 2 |

### Anti-patterns de composição
- **Não usar junto sem critério**: `DssInfiniteScroll` + `DssVirtualScroll` na mesma lista requerem planejamento cuidadoso de scroll target para evitar conflito de detecção
- **Não chamar `done()` condicionalmente**: sempre chamar `done()` em qualquer caminho (sucesso, erro, vazio) para evitar loop infinito de carregamento
- **Não usar `stop()` sem `resume()`**: parar sem retomar trava o componente permanentemente até `reset()`
- **Não ignorar estado de erro**: sempre usar `disable=true` durante tratamento de erro e fornecer feedback ao usuário

---

## 11. Governança e Extensão

### Extensões previstas no roadmap
- **Prop `loadingLabel`**: i18n do `aria-label="Carregando mais itens"` (Fase 3)
- **Prop `noMoreLabel`**: i18n da mensagem padrão no-more (Fase 3)

### Extensões explicitamente fora do escopo
- Lógica de paginação (page number, cursor): responsabilidade da aplicação via `@load`
- Retry automático em erro: responsabilidade da aplicação
- Seleção de itens: responsabilidade dos itens filhos

---

## 12. Referências

- [Quasar QInfiniteScroll](https://quasar.dev/vue-components/infinite-scroll)
- [DssVirtualScroll](../DssVirtualScroll/DssVirtualScroll.md) — componente complementar
- [DssSpinner](../DssSpinner/DssSpinner.md) — loading indicator padrão
- [DSSINFINITESCROLL_API.md](./DSSINFINITESCROLL_API.md) — referência técnica completa

---

## 13. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-12 | Claude (DSS Agent) | Criação inicial — wrapper QInfiniteScroll, 3 slots, 6 métodos expostos, 5 cenários de exemplo |
