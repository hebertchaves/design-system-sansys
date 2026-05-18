# Pré-prompt: DssInfiniteScroll

## 1. CLASSIFICAÇÃO E CONTEXTO

**Fase:** 2
**Nível:** 1 — Container comportamental

### Golden Reference
DssChip (componente interativo — governança global de categoria)

### Golden Context
**DssVirtualScroll** — componente da mesma família (Scroll e Virtualização, Fase 2 Nível 1), selado em 12 Mai 2026. Usado como baseline técnico principal para: padrão de wrapper Quasar, seletores brand com descendant selector, spinner via `currentColor`, estrutura de slots em containers comportamentais.

### Justificativa de Fase 2
`DssInfiniteScroll` é um container comportamental que depende do DSS estar estável (Fase 1) para poder governar a experiência de scroll incremental sobre componentes como `DssSpinner`, `DssList`, `DssItem` e `DssCard`. É complementar ao `DssVirtualScroll` (Golden Context) para carregamento sob demanda.

---

## 2. RISCOS ARQUITETURAIS E GATES

### Risco Principal — Loop Infinito de Carregamento
**Anti-pattern:** Consumidor não chama `done()` após `@load` (path de sucesso, erro ou vazio).
**Padrão correto:** `done()` SEMPRE chamado em qualquer caminho — `done(false)` para continuar, `done(true)` para encerrar. O `DssInfiniteScroll` expõe a `done` como wrapper para rastrear `isLoading`/`noMore` antes de delegar ao Quasar.

### Risco — `defineExpose` com API imperativa (EXC-Expose-01)
**Anti-pattern:** Expor métodos do QInfiniteScroll sem documentar a exceção.
**Padrão correto:** Delegar via `innerRef` e registrar EXC-Expose-01 em `dss.meta.json`. Precedente único no DSS para wrappers com API imperativa.

### Risco — QInfiniteScroll como root element (EXC-Gate-01)
**Anti-pattern:** Adicionar `<div>` wrapper entre o root DSS e o QInfiniteScroll.
**Padrão correto:** QInfiniteScroll IS o root element. `v-bind="$attrs"` forwarded diretamente no `q-infinite-scroll`. Sem div intermediário.

### Risco — Slot `no-more` fora do slot default
**Anti-pattern:** Renderizar o estado no-more como irmão do QInfiniteScroll (fora da área de scroll).
**Padrão correto:** Slot no-more renderizado DENTRO do slot default do QInfiniteScroll — aparece naturalmente ao final do conteúdo scrollável.

### Risco — Scroll-target inválido
**Anti-pattern:** `scroll-target` apontando para elemento não-scrollável ou inexistente.
**Padrão correto:** Documentar o requisito no README e exemplos. O componente não valida o target — responsabilidade do consumidor.

---

## 3. MAPEAMENTO DE API (QUASAR → DSS)

| Propriedade Quasar | Tipo Quasar | Propriedade DSS | Tipo DSS | Observação |
| :----------------- | :---------- | :-------------- | :------- | :--------- |
| `offset` | `Number` | `offset` | `Number` | Default DSS: 500px |
| `debounce` | `String \| Number` | `debounce` | `Number` | Default DSS: 100ms (apenas Number) |
| `initial-index` | `Number` | `initialIndex` | `Number` | camelCase DSS |
| `scroll-target` | `Element \| String` | `scrollTarget` | `String \| Element \| null` | camelCase DSS; null aceito para reset |
| `reverse` | `Boolean` | `reverse` | `Boolean` | Modo chat/mensageiro |
| `disable` | `Boolean` | `disable` | `Boolean` | Para detecção de scroll e @load |
| `tag` | `String` | — | **BLOQUEADA** | DssInfiniteScroll sempre renderiza como `<div>`. Usar `scroll-target` para containers customizados. |

| Evento Quasar | Parâmetros Quasar | Evento DSS | Parâmetros DSS | Observação |
| :------------ | :---------------- | :--------- | :------------- | :--------- |
| `@load` | `index: Number, done: Function` | `@load` | `index: number, done: (stop?: boolean) => void` | `done` é um wrapper DSS — atualiza `isLoading`/`noMore` antes de delegar ao Quasar |

| Método Quasar | Método DSS | Observação |
| :------------ | :--------- | :--------- |
| `poll()` | `poll()` | Delegado via innerRef |
| `trigger()` | `trigger()` | Delegado via innerRef |
| `reset()` | `reset()` | Delegado + reseta `noMore = false` |
| `stop()` | `stop()` | Delegado via innerRef |
| `resume()` | `resume()` | Delegado via innerRef |
| `setIndex(index)` | `setIndex(index)` | Delegado via innerRef |

---

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssInfiniteScroll` usa exclusivamente tokens DSS existentes no catálogo oficial.

**Tokens confirmados no catálogo:**
- `--dss-spacing-4` (16px) — padding do container `__no-more`
- `--dss-spacing-6` (24px) — padding do container `__loading`
- `--dss-text-subtle` — cor da mensagem no-more (base, sem brand)
- `--dss-opacity-disabled` — opacidade do estado disabled (0.4)
- `--dss-action-hub` — cor do texto no-more em contexto brand hub
- `--dss-action-water` — cor do texto no-more em contexto brand water
- `--dss-action-waste` — cor do texto no-more em contexto brand waste

**Padrão de cor para loading spinner:**
O spinner de loading NÃO usa `--dss-action-{brand}` diretamente no `_base.scss`. O DssSpinner filho herda `currentColor` do contexto, aplicando a cor brand automaticamente quando dentro de `[data-brand]`. Não adicionar `--dss-action-hub` no container `__loading` — isso violaria o padrão de delegação ao filho.

**Padrão brand:**
```scss
[data-brand="hub"] .dss-infinite-scroll {
  .dss-infinite-scroll__no-more-text {
    color: var(--dss-action-hub);
  }
}
```
Consistente com DssVirtualScroll (Golden Context).

---

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade
- **WCAG 2.1 AA** — mínimo obrigatório
- **Loading feedback:** `role="status" aria-live="polite"` no container `__loading`; DssSpinner com `aria-hidden="true"` (decorativo — anúncio via container pai)
- **No-more feedback:** `role="status" aria-live="polite"` no container `__no-more`
- **`aria-label` de loading:** `"Carregando mais itens"` — PT-BR hardcoded. Prop `loadingLabel` planejada para Fase 3. Consumidores multilíngues devem substituir o slot `#loading` completo.
- **Touch target:** NÃO APLICÁVEL — componente container comportamental não interativo. Opção B: sem `::before`. Consistente com DssBadge (Golden Reference não-interativo).
- **`user-select`:** NÃO aplicar no root. Itens filhos gerenciam seleção. Consistente com DssVirtualScroll (Golden Context).
- **prefers-contrast: more** (NOT `high`): texto no-more usa `currentColor` para contraste máximo
- **forced-colors: active**: `CanvasText` para texto no-more

### Estados

| Estado | Aplicável | Implementação |
|--------|-----------|---------------|
| `default` | ✅ | Lista renderizada; aguardando scroll |
| `loading` | ✅ | DssSpinner via slot #loading; `isLoading` reativo exposto |
| `no-more` | ✅ | Mensagem via slot #no-more; `noMore` reativo exposto |
| `disabled` | ✅ | `pointer-events: none` + `--dss-opacity-disabled` |
| `hover` | ❌ N/A | Container não interativo — itens filhos gerenciam |
| `focus` | ❌ N/A | Scroll nativo do browser |
| `active` | ❌ N/A | Container comportamental |
| `error` | ❌ N/A | Responsabilidade exclusiva do consumidor: usar `disable=true` durante tratamento de erro e renderizar feedback no slot `default`. O DssInfiniteScroll NÃO implementa estado de erro interno. |

---

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências DSS Internas
- **DssSpinner** — loading indicator padrão no slot `#loading`. Importado via wrapper raiz (`../../DssSpinner/DssSpinner.vue`).

### Dependências Quasar
- **QInfiniteScroll** — motor de scroll infinito. Root element efetivo do componente.

### Anti-patterns de Composição
- **Não usar `done()` condicionalmente** — sempre chamar em todos os paths
- **Não usar `stop()` sem `resume()`** — trava o componente permanentemente até `reset()`
- **Não usar `DssInfiniteScroll` + `DssVirtualScroll` sem planejamento** de scroll-target — risco de conflito de detecção de eventos

---

## 7. EXCEÇÕES PREVISTAS

| ID | Regra | Justificativa |
|----|-------|---------------|
| EXC-Gate-01 | Gate de Composição v2.4 — componente filho como root element | QInfiniteScroll é root direto. `$attrs` forwarded via `v-bind="$attrs"`. Evita DOM desnecessário e preserva scroll detection nativa. |
| EXC-Expose-01 | `defineExpose` em componente wrapper | `poll`, `trigger`, `reset`, `stop`, `resume`, `setIndex` delegados via `innerRef`. Necessário para controle programático externo. Padrão único no DSS para wrappers com API imperativa. |

---

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles Obrigatórios
- `offset` — Slider/Input Numérico (0–1000px)
- `debounce` — Slider/Input Numérico (0–500ms)
- `initialIndex` — Input Numérico
- `reverse` — Toggle
- `scrollTarget` — Input de Texto (seletor CSS)
- `disable` — Toggle
- Botão "Forçar Carregamento" → `trigger()`
- Botão "Parar" → `stop()`
- Botão "Retomar" → `resume()`
- Botão "Reset" → `reset()`

### Cenários Obrigatórios (mínimo 5)
1. Lista básica com carregamento simulado (20 itens por ciclo, máx. 80)
2. Scroll-target customizado (container com overflow: auto)
3. Modo reverse — chat com mensagens mais antigas ao topo
4. Controle programático — stop / resume / reset com botões
5. Brand Hub — DssSpinner e texto no-more com cor hub
