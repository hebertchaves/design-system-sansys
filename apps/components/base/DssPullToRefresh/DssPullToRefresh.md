# DssPullToRefresh — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssPullToRefresh` é um componente interativo que envolve o conteúdo de uma área rolável e permite que o usuário a atualize puxando para baixo. Fornece feedback visual via indicador circular com ícone e suporte a animação de carregamento.

**Quando usar:**
- Em feeds, listas ou grades com dados dinâmicos que o usuário precisa atualizar manualmente
- Em interfaces mobile-first ou responsivas onde o gesto de puxar é familiar
- Como alternativa ergonômica a um botão "Atualizar" em contextos de rolagem

**Quando NÃO usar:**
- Em listas com atualização automática/polling (o componente é para iniciação manual)
- Em áreas sem rolagem vertical (o gesto de pull requer espaço de drag)
- Como substituto de loading states gerais — use `DssInnerLoading` para isso
- Sozinho sem uma alternativa acessível via teclado/leitor de tela para acionar a atualização (o gesto de puxar não é acessível por teclado — forneça um botão de atualização explícito adjacente)

---

## 2. Classificação DSS

| Campo | Valor |
|-------|-------|
| **Tipo** | Interativo — Wrapper de Interação Gestual |
| **Categoria** | Interação Gestual |
| **Família** | Interação Gestual (Fase 2 — Nível 1) |
| **Fase** | 2 |
| **Interativo** | Sim |
| **Motor Quasar** | `QPullToRefresh` |
| **Golden Reference** | DssChip (interativo, toque, pseudo-elementos) |
| **Golden Context** | DssInfiniteScroll (padrão de scroll + evento + done()) |

---

## 3. Modelo DSS × Quasar (Declaração Obrigatória)

| Camada | Papel |
|--------|-------|
| **Quasar (QPullToRefresh)** | Camada de execução — gerencia eventos de toque, limiares de arrasto e ciclo de refresh |
| **DSS (DssPullToRefresh)** | Camada de governança — tokenização, brandabilidade, acessibilidade e API restrita |

**Divergências intencionais da API Quasar:**
- Props `pull-message`, `release-message`, `refresh-message` **removidas** — DSS usa apenas feedback visual
- Props `color` e `bg-color` **bloqueadas** — cores são governadas por CSS via tokens DSS
- Prop `size` **adicionada** — DSS oferece variantes de tamanho sem equivalente Quasar

---

## 4. API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho visual do indicador circular |
| `disabled` | `Boolean` | `false` | Desativa o gesto de puxar |
| `noMouse` | `Boolean` | `false` | Restringe interação apenas a touch (sem mouse) |
| `icon` | `String` | `undefined` | Ícone Material do handler (padrão: `refresh`) |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo rolável (lista, feed, grade) |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `refresh` | `done: () => void` | Disparado quando o gesto de pull ultrapassa o threshold. **Obrigatório** chamar `done()` ao final. |

### Métodos expostos

| Método | Descrição |
|--------|-----------|
| `trigger()` | Dispara refresh programaticamente |

---

## 5. Comportamento e Ciclo de Estados

O componente possui 5 estados internos (gerenciados pelo QPullToRefresh):

| Estado | Descrição |
|--------|-----------|
| **Idle** | Invisível. A área rola normalmente. |
| **Pulling** | Usuário arrasta para baixo. Handler aparece com opacidade/posição proporcional ao drag. |
| **Ready** | Threshold atingido. Handler sinaliza que o release iniciará o refresh. |
| **Refreshing** | Usuário soltou. Handler permanece visível e o ícone gira. Evento `@refresh` é emitido. |
| **Done** | `done()` foi chamado. Handler desaparece com animação. Retorna a Idle. |

**Tratamento de erros:** Se a atualização falhar, a aplicação deve chamar `done()` mesmo assim e exibir o erro separadamente (ex.: `DssToast`). Nunca deixar o spinner em loop infinito.

---

## 6. Estados Aplicáveis

| Estado | Implementado | Observação |
|--------|-------------|------------|
| Idle | ✅ | Estado padrão — handler não visível |
| Pulling | ✅ | Gerenciado internamente pelo QPullToRefresh |
| Ready | ✅ | Gerenciado internamente pelo QPullToRefresh |
| Refreshing | ✅ | `isRefreshing = true` → `aria-busy="true"` no anunciador |
| Done | ✅ | Chamada de `done()` → `isRefreshing = false` |
| Disabled | ✅ | Delegado ao QPullToRefresh via `:disable` prop — sem CSS adicional (ver NC-02 ciclo 1) |
| Hover | N/A | Gesto de puxar não tem estado hover visual no handler |
| Focus | N/A | O handler é gerado pelo QPullToRefresh sem foco próprio; não recebe foco via teclado |
| Active | N/A | Não aplicável como estado CSS separado — Pulling/Ready já são estados visuais |
| Loading | ✅ | Estado Refreshing é o equivalente de loading |

---

## 7. Acessibilidade

### Alternativa obrigatória

> **⚠️ CRÍTICO:** O gesto de puxar para atualizar **não é acessível via teclado ou leitor de tela**. Toda interface que utilizar `DssPullToRefresh` **DEVE fornecer um botão de atualização alternativo** acessível por teclado.

```vue
<!-- Padrão mínimo obrigatório -->
<DssPullToRefresh @refresh="onRefresh">...</DssPullToRefresh>
<DssButton icon="refresh" @click="manualRefresh">Atualizar</DssButton>
```

### Implementação ARIA

| Atributo | Local | Valor | Justificativa |
|----------|-------|-------|---------------|
| `role="status"` | Anunciador sr-only | Fixo | Anuncia mudanças de estado sem interromper |
| `aria-live="polite"` | Anunciador sr-only | Fixo | Atualiza o leitor de tela sem urgência |
| `aria-busy` | Anunciador sr-only | `true` durante refresh | Indica que conteúdo está sendo atualizado |

### Touch target

Não aplicável como Compact Control — `DssPullToRefresh` é um container de rolagem, não um botão. O handler é uma área visual de feedback, não um alvo de toque discreto.

### WCAG 2.1 AA

| Critério | Conformidade |
|---------|-------------|
| 1.1.1 Conteúdo não textual | N/A — handler é decorativo |
| 1.4.3 Contraste mínimo | ✅ Ícone via `--dss-hub/water/waste-600` sobre fundo claro |
| 1.4.11 Contraste não-textual | ✅ Handler com `--dss-shadow-md` garante visibilidade |
| 2.1.1 Teclado | ⚠️ N/A para gesto; **alternativa por teclado obrigatória** |
| 2.5.5 Tamanho do alvo | N/A — handler é feedback visual, não alvo de clique |
| 4.1.3 Status messages | ✅ `aria-live="polite"` + `aria-busy` no anunciador |

---

## 8. Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-action-primary` | Cor do ícone (sem brand) |
| `--dss-surface-default` | Background do handler (sem brand) |
| `--dss-shadow-md` | Sombra do handler (sem brand) |
| `--dss-padding-1` | Padding handler sm (4px) |
| `--dss-padding-2` | Padding handler md (8px) |
| `--dss-padding-3` | Padding handler lg (12px) |
| `--dss-icon-size-sm` | Ícone 20px (size=sm) |
| `--dss-icon-size-md` | Ícone 24px (size=md) |
| `--dss-icon-size-lg` | Ícone 32px (size=lg) |
| `--dss-opacity-disabled` | Opacidade disabled (0.4) |
| `--dss-border-width-thick` | Borda em prefers-contrast: more |
| `--dss-hub-600` | Ícone hub |
| `--dss-hub-50` | Fundo handler hub |
| `--dss-shadow-hub-md` | Sombra handler hub |
| `--dss-water-500` | Ícone water |
| `--dss-water-50` | Fundo handler water |
| `--dss-shadow-water-md` | Sombra handler water |
| `--dss-waste-600` | Ícone waste |
| `--dss-waste-50` | Fundo handler waste |
| `--dss-shadow-waste-md` | Sombra handler waste |

---

## 9. Comportamentos Implícitos

| Comportamento | Detalhe |
|---------------|---------|
| **Forwarding de attrs** | `inheritAttrs: false` + `v-bind="$attrs"` no QPullToRefresh root. Atributos arbitrários vão para o elemento raiz. |
| **color="primary" interno** | Passado fixamente ao QPullToRefresh para que `--q-color-primary` CSS governe a cor real via EXC-Gate-02. |
| **isRefreshing tracking** | Estado interno via `ref(false)` — ativado na entrada do `@refresh`, resetado ao chamar `done()`. Usado apenas para ARIA. |
| **done() wrapping** | O `done()` recebido do QPullToRefresh é wrapped para resetar `isRefreshing` antes de chamar o `done()` original. |
| **-webkit-tap-highlight-color** | `transparent` aplicado no root — suprime destaque de toque do browser durante gesto de pull. |

---

## 10. Paridade com Golden Component (DssChip)

| Aspecto | DssChip | DssPullToRefresh | Justificativa de Divergência |
|---------|---------|-----------------|------------------------------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | — |
| `inheritAttrs: false` + `v-bind="$attrs"` | ✅ | ✅ | — |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ | Suprime destaque de toque |
| Touch target `::before` | ✅ | ❌ | N/A: handler não é alvo discreto de toque |
| `disabled` com `opacity` | ✅ | ✅ | `var(--dss-opacity-disabled)` |
| `focus-visible` outline | ✅ | ❌ | N/A: handler não recebe foco |
| Brand via `[data-brand]` | ✅ | ✅ | Dual-selector descendant |
| `prefers-reduced-motion` | ✅ | ✅ | Via CSS (EXC-States-01) |
| `forced-colors` | ✅ | ✅ | SystemColor keywords (EXC-States-02) |
| `aria-hidden` em elementos decorativos | ✅ | N/A | Handler gerado pelo QPullToRefresh |
| `defineExpose` | N/A | ✅ | `trigger()` (EXC-Expose-01) |

---

## 11. Decisões Arquiteturais

*   **spinnerType descartado:** A prop `spinnerType` prevista no pré-prompt foi descartada. O `QPullToRefresh` usa um ícone Material simples para o indicador, não um componente spinner complexo. A customização via prop `icon` é suficiente e mais alinhada com o motor subjacente.
*   **color bloqueada:** A prop `color` mapeada no pré-prompt foi bloqueada. A cor do indicador é governada via CSS (EXC-Gate-02-a) com base no atributo `data-brand` do container, seguindo o padrão do `DssPagination`.

---

## 12. Exceções Registradas

| ID | Tipo | Local | Valor | Justificativa |
|----|------|-------|-------|---------------|
| `EXC-Gate-01` | gateException | `1-structure/` | QPullToRefresh como root | Motor Quasar necessário; sem EXC, o componente não existe |
| `EXC-Gate-02 (a)` | gateException | `2-composition/_base.scss` | `--q-color-primary: var(--dss-action-primary)` | QPullToRefresh não expõe hook CSS para cor do ícone; padrão canônico DSS (DssPagination, DssAjaxBar) |
| `EXC-Gate-02 (b)` | gateException | `2-composition/`, `3-variants/`, `4-output/` | `.dss-pull-to-refresh .q-pull-to-refresh__handler` e `.q-pull-to-refresh__arrow` | Handler e ícone sem slot API; única forma de estilizar |
| `EX-Structural-01` | structuralException | `2-composition/_base.scss` | `border-radius: 50%` | Constante geométrica para forma circular. Sem token DSS equivalente (padrão: DssKnob — stroke-width unitless para SVG) |
| `EXC-States-01` | statesException | `4-output/_states.scss` | CSS animation-duration override | Animação do handler é CSS-based; CSS puro é suficiente (diferente do DssParallax que exige v-if) |
| `EXC-States-02` | statesException | `4-output/_states.scss` | SystemColor keywords | Obrigatório conforme WCAG 1.4.11 |
| `EXC-Expose-01` | exposeException | `1-structure/` | `trigger()` | API imperativa necessária para uso programático (padrão: DssInfiniteScroll, DssScrollArea) |

---

## 13. Anti-Patterns

| Anti-Pattern | Por quê evitar |
|-------------|----------------|
| Usar sem botão de atualização alternativo | `@refresh` por gesto é inacessível via teclado/leitor de tela |
| Não chamar `done()` | Deixa o spinner em loop infinito (sem timeout automático) |
| Aninhar dentro de outro QPullToRefresh | Conflito de gestos de toque |
| Usar em área sem rolagem vertical | O gesto de pull requer espaço de drag vertical |
| Passar `color` ou `bg-color` via `v-bind` | Props bloqueadas; usar `[data-brand]` para cores de marca |

---

## 14. Changelog

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0.0 | 2026-05-20 | Criação inicial — wrapper QPullToRefresh com governança DSS |
