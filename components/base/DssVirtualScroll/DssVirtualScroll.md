# DssVirtualScroll — Documentação (Template 13.1)

## 1. Visão Geral

**O que é:** `DssVirtualScroll` é um container de virtualização que renderiza eficientemente listas massivas de dados (tabelas, feeds, seleções), exibindo apenas os itens visíveis na viewport. É um wrapper DSS governado sobre o `QVirtualScroll` do Quasar.

**Quando usar:**
- Listas com mais de ~100 itens onde performance é crítica
- Feeds ou streams de dados em tempo real
- Tabelas de dados de grande volume (junto com `type="table"`)
- Qualquer situação onde renderizar todos os itens no DOM causaria degradação de performance

**Quando NÃO usar:**
- Listas pequenas (< 50 itens) — overhead de virtualização não justificado
- Quando itens têm alturas extremamente variáveis e não podem ser estimadas — preferir paginação tradicional
- Quando o estado interno dos itens precisa ser preservado sem gerenciamento externo (Pinia/Vuex)

---

## 2. Classificação DSS

- **Tipo:** Container de dados virtualizado não interativo
- **Categoria:** Dados e Listas
- **Fase:** 2
- **Interativo:** Não (container — itens filhos gerenciam interação)
- **Golden Reference:** DssBadge (componente não interativo)
- **Golden Context:** DssLinearProgress (wrapper sobre componente Quasar)

---

## 3. Arquitetura

`DssVirtualScroll` delega toda a lógica de virtualização ao `QVirtualScroll` do Quasar:

```
DssVirtualScroll (DSS wrapper)
├── [prepend slot] — cabeçalho fixo opcional
├── QVirtualScroll — motor de virtualização
│   └── [default slot scoped] — template de cada item
│       Escopo: { item, index, ariaSetsize, ariaPosinset }
└── [append slot] — rodapé fixo opcional
```

---

## 4. API

### Props
*(ver DSSVIRTUALSCROLL_API.md)*

### Slots
*(ver DSSVIRTUALSCROLL_API.md)*

### Events
*(ver DSSVIRTUALSCROLL_API.md)*

---

## 5. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Lista virtualizada normal |
| loading | ✅ | Spinner CSS / slot customizável |
| empty | ✅ | Texto padrão / slot customizável |
| disabled | ✅ | pointer-events: none + opacity |
| hover | N/A | Container — gerenciado pelos filhos |
| focus | N/A | Scroll nativo — gerenciado pelos filhos |
| active | N/A | Container — gerenciado pelos filhos |

---

## 6. Comportamentos Implícitos

### inheritAttrs: false
`$attrs` (class extra, id, data-*, aria-* adicionais) são encaminhados ao `div` root via `v-bind="$attrs"`. O `QVirtualScroll` interno **não** recebe `$attrs` diretamente.

### Delegação total ao Quasar
`QVirtualScroll` gerencia virtualização, cálculo de posições, reciclagem de DOM e scroll nativo. `DssVirtualScroll` não reimplementa nenhuma dessas lógicas.

### ARIA — aria-setsize / aria-posinset
Expostos via escopo do slot `default` para que o consumidor os aplique em cada item. Calculados com base em `items.length` para comunicar o tamanho real da lista a leitores de tela, mesmo quando apenas um subconjunto está no DOM.

### Props bloqueadas
- `virtual-scroll-slice-ratio-before/after`: gerenciados internamente pelo Quasar
- `virtual-scroll-sticky-size-start/end`: simplificados pelo DSS (não há caso de uso validado)
- `dark`: gerenciado pelo DSS via `[data-theme="dark"]`

---

## 7. Paridade com Golden Component

| Aspecto | DssBadge (Golden) | DssVirtualScroll | Justificativa |
|---------|-------------------|------------------|---------------|
| `defineOptions` | ✅ | ✅ | — |
| `inheritAttrs: false` | ✅ | ✅ | — |
| `v-bind="$attrs"` no root | ✅ | ✅ | — |
| `-webkit-tap-highlight-color` | ✅ | N/A | Componente container, sem interação de toque direta |
| Touch target `::before` | ✅ | N/A | Container não interativo |
| Focus-visible strategy | Não aplicável | N/A | Scroll nativo; filhos gerenciam foco |
| `aria-hidden` em decorativos | ✅ | ✅ (spinner) | `aria-hidden="true"` no `.dss-virtual-scroll__loading-indicator` |
| Dark mode via `[data-theme]` | ✅ | ✅ | — |
| Forced-colors | ✅ | ✅ | — |
| Reduced-motion | ✅ | ✅ | — |

---

## 8. Acessibilidade

- **WCAG 2.1 AA**: Conforme via ARIA `aria-setsize` / `aria-posinset` expostos no slot
- **Touch target**: N/A — componente container
- **ARIA role**: Container usa `role` gerenciado pelo `QVirtualScroll` (list/table via prop `type`)
- **Navegação por teclado**: Scroll nativo suportado; foco em itens gerenciado pelos componentes filhos
- **Leitores de tela**: `aria-setsize` informa o total real de itens, evitando confusão com o subconjunto DOM visível
- **Loading state**: `role="status"` + `aria-live="polite"` no container de loading para anúncio não intrusivo

---

## 9. Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-spacing-2` | Scrollbar width/height (8px) |
| `--dss-spacing-6` | Padding do estado loading (24px) |
| `--dss-spacing-8` | Padding do estado empty e tamanho do spinner (32px) |
| `--dss-spacing-px` | Borda mínima do spinner (1px) |
| `--dss-radius-full` | Scrollbar thumb e spinner arredondados |
| `--dss-surface-muted` | Cor da scrollbar e track do spinner |
| `--dss-text-subtle` | Texto do estado vazio |
| `--dss-opacity-disabled` | Opacidade no estado desabilitado (0.4) |
| `--dss-duration-500` | Duração da animação do spinner (500ms) |
| `--dss-action-hub` | Cor do spinner/scrollbar no brand Hub |
| `--dss-action-water` | Cor do spinner/scrollbar no brand Water |
| `--dss-action-waste` | Cor do spinner/scrollbar no brand Waste |

> **Spinner:** A cor de destaque usa `currentColor` no base (herda do contexto). Cada brand sobrescreve em `4-output/_brands.scss` com `--dss-action-{brand}`.

---

## 10. Exceções Registradas

| ID | Regra | Seletor / Valor | Justificativa |
|----|-------|-----------------|---------------|
| EXC-Gate-01 | Gate de Composição v2.4 — seletores internos Quasar | `.q-virtual-scroll__content { width: 100% }` em `__inner` | `.q-virtual-scroll__content` é gerado exclusivamente pelo QVirtualScroll e não é acessível via slot/prop. A regra `width: 100%` garante que o conteúdo virtualizado preencha a largura total do container, evitando colapso em listas com display: block ou itens de tamanho variável. Localização: `2-composition/_base.scss — bloco .dss-virtual-scroll__inner`. |
| EX-States-01 | `!important` em `prefers-reduced-motion` | `animation: none !important` | Sobrescreve `@keyframes dss-virtual-scroll-spin` definido em `_base.scss`. Sem `!important`, a animação persiste com motion reduzido. Precedente: DssLinearProgress (EX-States-01), DssSpinner (EX-02). |

---

## 11. Matriz de Composição DSS

### Papel Estrutural
`DssVirtualScroll` é um **container de performance** — não estiliza itens internamente nem assume presença de componentes específicos. É agnóstico ao tipo de conteúdo.

### Componentes DSS Recomendados
- 🟢 **DssList + DssItem**: composição canônica para listas de dados DSS
- 🟢 **DssCard**: container estrutural recomendado para envolver o VirtualScroll
- 🟡 **DssInfiniteScroll**: complementar para carregamento incremental (planejado)
- 🟡 **DssSpinner**: substituto para o slot `#loading` (quando selado)
- ⚪ **DssEmptyState**: substituto para o slot `#empty` (não existe, roadmap)

### Declaração de Impacto
- **Existentes**: DssList, DssItem, DssCard, DssBadge, DssChip
- **Planejados**: DssInfiniteScroll, DssSpinner
- **Inexistentes**: DssEmptyState

**Risco se DssEmptyState não existir**: Baixo. O slot `#empty` permite customização completa pelo consumidor.
**Impacto arquitetural**: Nenhum bloqueante. DssVirtualScroll está completo sem DssEmptyState.
**Recomendação**: Implementar DssEmptyState como componente de feedback genérico no Roadmap Fase 3.

### Anti-patterns
- ❌ Usar HTML nativo (`<ul>/<li>`) quando DssList/DssItem existem
- ❌ Sobrescrever estilos internos de filhos DSS com `::v-deep`
- ❌ Passar funções de renderização complexas sem keys únicas (quebra virtualização)
- ❌ Gerenciar estado interno nos itens sem store externo (Pinia/Vuex)
- ❌ Combinar `DssVirtualScroll` com `DssInfiniteScroll` sem gerenciar loading state

---

## 12. Governança de Lacunas

| Lacuna | Classificação | Ação |
|--------|---------------|------|
| `DssEmptyState` inexistente | Não crítica | Documentada — slot `#empty` cobre o caso de uso |
| `DssSpinner` não selado | Não crítica | Fallback CSS interno; substituir quando DssSpinner estiver disponível |

---

## 13. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-11 | Claude Code | Criação inicial — Fase 2 |
