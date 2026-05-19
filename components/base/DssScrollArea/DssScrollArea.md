# DssScrollArea — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssScrollArea` é um container de conteúdo rolável com scrollbar customizada pelos tokens DSS. Substitui o uso direto de `overflow: auto/scroll` em CSS e do `QScrollArea` do Quasar, fornecendo um mecanismo de rolagem padronizado, acessível e visualmente alinhado com o sistema de design.

**Quando usar:**
- Quando uma área de conteúdo tem dimensões fixas e o conteúdo interno pode excedê-las (ex.: listas longas, tabelas, painéis laterais)
- Dentro de `DssDialog` ou `DssDrawer` para gerenciar conteúdo longo
- Quando a scrollbar visual deve ser estilizada com tokens DSS (cor de marca, tamanho)
- Quando controle programático de posição de scroll é necessário (via `scrollTo`, `scrollBy`)

**Quando NÃO usar:**
- Para listas muito longas (> 1.000 itens): prefira `DssVirtualScroll` (virtualização DOM)
- Para carregamento incremental: prefira `DssInfiniteScroll`
- Para scroll da página principal: use `overflow` nativo no layout ou `DssLayout`
- Quando aninhado em múltiplas camadas de scroll (> 2 níveis): risco de confusão UX
- Quando scroll nativo do browser é suficiente e sem customização visual necessária

---

## 2. Classificação DSS

- **Tipo:** Container de conteúdo rolável com scrollbar customizada
- **Categoria:** Layout Auxiliar
- **Fase:** 2 — Nível 1 (Independente)
- **Família:** Layout Auxiliar
- **Interativo:** Não (o container não é interativo; o conteúdo pode ser)
- **Quasar Base:** `QScrollArea`

---

## 3. API

*(ver [DSSSCROLLAREA_API.md](./DSSSCROLLAREA_API.md) para referência completa)*

### Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `visible` | `'auto' \| 'always' \| 'never'` | `'auto'` | Controla visibilidade da scrollbar |
| `horizontal` | `Boolean` | `false` | Habilita rolagem horizontal |
| `barDelay` | `Number` | `1000` | Delay (ms) antes de ocultar a scrollbar |
| `scrollTarget` | `Element \| String` | `undefined` | Elemento externo como alvo do scroll |
| `label` | `String` | `undefined` | Label ARIA; adiciona `role="region"` |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo a ser rolado |

### Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `scroll` | `ScrollPayload` | Emitido durante a rolagem |

### Métodos (via ref)

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `getScrollTarget()` | `Element` | Retorna o elemento DOM de scroll |
| `getScrollPosition()` | `{ top, left }` | Posição atual de scroll |
| `scrollTo(offset, duration?, axis?)` | `void` | Rola para posição absoluta |
| `scrollBy(offset, duration?, axis?)` | `void` | Rola por offset relativo |
| `setScrollPosition(axis, offset, duration?)` | `void` | Define posição em eixo específico |

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Scrollbar oculta, aparece ao hover/scroll (visible='auto') |
| scrolling | ✅ | Scrollbar visível enquanto rolando ou com hover |
| always-visible | ✅ | Modificador: visible='always' → scrollbar sempre visível |
| never-visible | ✅ | Modificador: visible='never' → scrollbar oculta mas scroll funcional |
| hover | — | Container não-interativo: filhos gerenciam hover |
| active | — | Container não-interativo: filhos gerenciam active |
| focus | — | Foco gerenciado pelos elementos filhos interativos |
| disabled | — | QScrollArea não possui estado disabled |
| error | — | Responsabilidade do conteúdo interno |
| loading | — | Responsabilidade do conteúdo interno (usar DssInnerLoading no slot) |

---

## 5. Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-gray-400` | #d4d4d4 | Cor padrão do scrollbar thumb |
| `--dss-gray-500` | #a3a3a3 | Cor do thumb em hover |
| `--dss-gray-600` | #737373 | Thumb no dark mode |
| `--dss-gray-700` | #525252 | Thumb hover em high-contrast |
| `--dss-gray-900` | #0a0a0a | Thumb hover em high-contrast máximo |
| `--dss-gray-300` | #e5e5e5 | Track em high-contrast |
| `--dss-radius-full` | 9999px | Border-radius do thumb (pill shape) |
| `--dss-spacing-2` | 8px | Espessura da scrollbar (bar e thumb) |
| `--dss-duration-250` | 250ms | Duração da transição de cor/opacidade |
| `--dss-easing-ease-out` | ease-out | Curva de animação da scrollbar |
| `--dss-action-hub` | — | Thumb em contexto brand="hub" |
| `--dss-action-water` | — | Thumb em contexto brand="water" |
| `--dss-action-waste` | — | Thumb em contexto brand="waste" |
| `--dss-hub-600` | — | Thumb hover em brand="hub" |
| `--dss-water-600` | — | Thumb hover em brand="water" |
| `--dss-waste-600` | — | Thumb hover em brand="waste" |

---

## 6. Acessibilidade

- **WCAG 2.1 AA:** Componente container — conformidade garantida pela estrutura semântica e comportamento nativo de scroll.
- **Touch target:** NÃO aplicável — componente não interativo. Elementos filhos interativos gerenciam seus próprios touch targets.
- **ARIA:**
  - Quando `label` é fornecida: `role="region"` + `aria-label` são adicionados ao root, tornando a área uma landmark identificável por leitores de tela.
  - Sem `label`: nenhum role extra; o scroll é transparente para leitores de tela que leem o conteúdo sequencialmente.
- **Navegação por teclado:** O scroll é nativo do browser. Quando um elemento filho recebe foco via Tab, o browser rola automaticamente para torná-lo visível. As teclas Page Up/Down, Home/End funcionam quando o foco está dentro da área.
- **Contraste:** Scrollbar thumb usa `--dss-gray-400` (#d4d4d4) — relação de contraste adequada sobre `--dss-surface-default` (#ffffff). Em `prefers-contrast: more`, thumb usa `--dss-gray-700` para aumentar contraste.
- **Modo forçado de cores:** Thumb e track usam `ScrollbarThumb` / `ScrollbarTrack` (SystemColor keywords WCAG 1.4.11).
- **Movimento reduzido:** Transições da scrollbar removidas via `@media (prefers-reduced-motion: reduce)`.

---

## 7. Comportamentos Implícitos

### inheritAttrs: false + forwarding
`DssScrollArea` declara `inheritAttrs: false`. Todos os `$attrs` (id, class extra, data-*, aria-* adicionais) são encaminhados ao elemento root `q-scroll-area` via `v-bind="$attrs"`. O conteúdo do slot não recebe `$attrs`.

### Dimensionamento
`DssScrollArea` não impõe `width` nem `height`. É responsabilidade do consumidor definir as dimensões (via `style`, `class`, ou contexto de layout pai). Sem dimensão explícita, o QScrollArea não ativa o scroll (o conteúdo simplesmente expande).

### Mapeamento de `visible`
| DSS | Quasar QScrollArea `:visible` | Comportamento |
|-----|-------------------------------|---------------|
| `'auto'` (default) | `undefined` | Quasar gerencia auto-hide por hover/scroll |
| `'always'` | `true` | Scrollbar sempre visível |
| `'never'` | `false` | Scrollbar sempre oculta (scroll ainda funciona) |

### Props bloqueadas
As props `bar-style`, `thumb-style`, `dark` e `content-active-style` do QScrollArea não são expostas. A aparência da scrollbar é governada exclusivamente pelos tokens DSS em `2-composition/_base.scss` e `4-output/`.

---

## 8. Paridade com Golden Component

### Golden Reference: DssBadge
| Aspecto | DssBadge | DssScrollArea | Justificativa |
|---------|----------|---------------|---------------|
| `defineOptions` | ✅ `name` | ✅ `name`, `inheritAttrs: false` | Mesma estrutura; `inheritAttrs: false` adicional para forwarding |
| `inheritAttrs + forwarding` | Não aplicável | ✅ `v-bind="$attrs"` no root | Container precisa encaminhar attrs ao root |
| Elementos decorativos `aria-hidden` | ✅ — | — N/A | Não há elementos decorativos no DssScrollArea |
| Touch target (WCAG 2.5.5) | — Não-interativo | — Não-interativo | Componente container; filhos gerenciam touch target |
| Focus-visible | — | — | Foco gerenciado por filhos; sem focus ring no container |

### Golden Context: DssVirtualScroll
| Aspecto | DssVirtualScroll | DssScrollArea | Justificativa |
|---------|-----------------|---------------|---------------|
| Root element Quasar | `div` wrapper + `q-virtual-scroll` interno | `q-scroll-area` como root | DssScrollArea usa EXC-Gate-01 direto; VirtualScroll usa wrapper por necessidade de estados loading/empty |
| Scrollbar via CSS | `scrollbar-width: thin` (CSS nativo) | `.q-scrollarea__thumb` (EXC-Gate-02) | QScrollArea gerencia seu próprio DOM de scrollbar; não usa scrollbar CSS nativa |
| Brand theming na scrollbar | ✅ `--dss-action-hub` no thumb | ✅ `--dss-action-hub` no thumb | Mesmo padrão |
| `defineExpose` | ✅ Não tem | ✅ Sim (EXC-Expose-01) | QScrollArea tem API imperativa de scroll; exposição necessária |
| EXC-Gate-01/02 | ✅ EXC-Gate-01 via wrapper | ✅ EXC-Gate-01 (root) + EXC-Gate-02 | Contextos distintos: VirtualScroll usa wrapper para estados; ScrollArea usa root direto |

---

## 9. Anti-patterns de Composição

- ❌ Usar `height: 100vh` sem container pai definido — o QScrollArea precisa de dimensões explícitas
- ❌ Aninhar `DssScrollArea` dentro de outro `DssScrollArea` sem necessidade arquitetural
- ❌ Usar `DssScrollArea` para a página principal — use scroll nativo ou `DssLayout`
- ❌ Sobrescrever `bar-style` ou `thumb-style` diretamente — use os tokens DSS ou brand theming
- ❌ Usar `DssScrollArea` com listas > 1.000 itens sem `DssVirtualScroll`
- ❌ Colocar `position: fixed` ou `position: sticky` dentro do slot — comportamento imprevisível

---

## 10. Matriz de Composição DSS

| Componente | Relação | Uso típico |
|------------|---------|------------|
| `DssVirtualScroll` | Complementar | Listas grandes (> 1k itens) dentro de DssScrollArea |
| `DssInfiniteScroll` | Complementar | Carregamento incremental dentro do scroll |
| `DssCard` | Container pai recomendado | DssScrollArea com altura fixa dentro de DssCard |
| `DssDialog` | Container pai | Conteúdo longo em modais |
| `DssDrawer` | Container pai | Navegação longa em sidebars |
| `DssInnerLoading` | Filho recomendado | Feedback de carregamento sem bloquear scroll |

---

## 11. Exceções Registradas

| ID | Regra Violada | Justificativa | Local |
|----|---------------|---------------|-------|
| EXC-Gate-01 | Gate de Composição v2.4 — Quasar como root | QScrollArea como root direto; sem wrapper. Evita DOM desnecessário. | `1-structure/DssScrollArea.ts.vue` |
| EXC-Gate-02 | Seletores internos Quasar | `.q-scrollarea__bar` e `.q-scrollarea__thumb` sem CSS hooks públicos; estilização via descendant selectors em CSS global | `2-composition/_base.scss`, `4-output/_brands.scss` |
| EXC-Expose-01 | `defineExpose` em wrapper | API imperativa de scroll (`scrollTo`, `scrollBy`, etc.) necessária para consumidores | `1-structure/DssScrollArea.ts.vue` |

---

## 12. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-19 | Claude (DSS Agent) | Criação inicial — wrapper sobre QScrollArea |
