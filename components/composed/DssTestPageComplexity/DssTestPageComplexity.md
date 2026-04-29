# DssTestPageComplexity

> Documentação Normativa — Template 13.1  
> DSS v2.2 | Fase 3 | Status: Review

---

## 1. Identificação

| Campo | Valor |
|-------|-------|
| **Nome** | DssTestPageComplexity |
| **Categoria** | Composed |
| **Fase DSS** | 3 |
| **Versão** | 1.0.0 |
| **Status** | Review — Pendente de auditoria |
| **Golden Reference** | DssChip |
| **Golden Context** | DssCard |
| **Data de criação** | 2026-04-29 |

---

## 2. Propósito e Escopo

### O que é
`DssTestPageComplexity` é uma **página de dados operacionais composta** que orquestra múltiplos componentes DSS e Quasar para exibir ordens de serviço. É o stress test de composição de Fase 3 da arquitetura DSS.

A página implementa:
- Breadcrumb de navegação
- Header com título, subtítulo e toggle de visualização (dashboard/mapa/agenda)
- 3 cards de status com indicadores semânticos (no prazo / a vencer / vencidas)
- Seção de filtros expansível com chips removíveis
- Tabela de dados paginada com estado vazio e loading skeleton

### Escopo funcional
**Inclui:**
- Estrutura visual completa da página
- Estado de loading com skeletons
- Estado disabled propagado via provide/inject
- Brandabilidade via `data-brand`
- Slots de extensão para filtros, rodapé e views alternativas

**Não inclui (responsabilidade do consumidor):**
- Lógica de busca e filtragem de dados
- Paginação server-side (emite evento, não processa)
- Views de mapa e agenda (fornecidas via slot)
- Formulário de filtros (fornecido via slot)

---

## 3. Arquitetura

### Camadas SCSS

| Camada | Arquivo | Responsabilidade |
|--------|---------|------------------|
| L2 | `2-composition/_base.scss` | Estilos base, tokens de layout, status cards, tabela, skeleton |
| L3 | `3-variants/_variant.scss` | Estado disabled, loading, toggle de view, variantes de linha |
| L4 | `4-output/_states.scss` | Dark mode, high contrast, forced-colors, reduced-motion, print |
| L4 | `4-output/_brands.scss` | Hub, Water, Waste — override de cor de ação |
| — | `DssTestPageComplexity.module.scss` | Orchestrador: L2 → L3 → L4 |

### Composables

| Arquivo | Exporta | Responsabilidade |
|---------|---------|------------------|
| `composables/useTestPageComplexityClasses.ts` | `useTestPageComplexityClasses` | Classes computed: `--disabled`, `--loading` |

### provide/inject

O componente fornece `PAGE_COMPLEXITY_DISABLED_KEY` via `provide()` para propagar o estado `disabled` para todos os componentes filhos DSS sem prop drilling.

### inheritAttrs

`inheritAttrs: false` — os atributos não declarados são aplicados manualmente ao elemento raiz `.dss-test-page-complexity` via `v-bind="$attrs"`.

---

## 4. Props

Veja [DSSTESTPAGECOMPLEXITY_API.md](./DSSTESTPAGECOMPLEXITY_API.md) para referência completa.

**Props principais:**
- `brand` — Marca Sansys (Hub/Water/Waste)
- `disabled` — Estado desabilitado (propagado via provide/inject)
- `loading` — Estado de carregamento (exibe skeletons)
- `pageTitle` — Título do módulo
- `statusCounts` — Contadores de status `{ onTime, expiring, expired }`
- `tableRows` — Dados da tabela
- `activeView` — View ativa no toggle (v-model)
- `currentPage` — Página atual (v-model)
- `activeFilters` — Chips de filtros ativos

---

## 5. Estados

### 5.1 Default
Estrutura completa visível com todos os dados fornecidos via props.

### 5.2 Loading
Quando `loading: true`:
- Cards de status exibem skeletons (número + label)
- Tabela exibe 5 linhas skeleton com animação shimmer
- Animação usa gradiente entre `--dss-surface-muted` e `--dss-surface-subtle`
- Reduzida em `prefers-reduced-motion: reduce`

### 5.3 Disabled
Quando `disabled: true`:
- Opacidade: `var(--dss-opacity-disabled)` (0.4)
- `pointer-events: none` na raiz
- Estado propagado via `PAGE_COMPLEXITY_DISABLED_KEY` para componentes DSS filhos

### 5.4 Empty
Quando `tableRows` está vazio (e não está em loading):
- Exibe `__empty` com texto "Nenhuma ordem encontrada"
- Altura mínima: `var(--dss-spacing-32)` (8rem)

### 5.5 Hover (linha de tabela)
- Background: `var(--dss-surface-hover)`
- Transição: `var(--dss-duration-150)` com `var(--dss-easing-standard)`

### 5.6 Focus (links)
- Outline: `2px solid var(--dss-action-primary)`
- `outline-offset: 2px`
- `border-radius: var(--dss-radius-sm)`
- WCAG 2.1 AA conforme

**Estados NÃO aplicáveis:**
- `active`: gerenciado pelos filhos (QBtn, QPagination)
- `indeterminate`: não aplicável a componente de página
- `error`: responsabilidade do consumidor (dados de erro)

---

## 6. Acessibilidade

### WCAG 2.1 AA

| Critério | Implementação |
|----------|---------------|
| 1.3.1 Info and Relationships | Semântica HTML nativa (th, td, nav via QBreadcrumbs) |
| 1.4.3 Contrast (Minimum) | Cores via tokens `--dss-text-*` com contraste garantido pelo DSS |
| 1.4.11 Non-text Contrast | Ícones de status com contraste via tokens `--dss-feedback-*` |
| 2.1.1 Keyboard | Todos os controles interativos acessíveis via teclado (QBtn, QPagination) |
| 2.4.3 Focus Order | Ordem de foco lógica: breadcrumb → header → toggle → filtros → tabela → paginação |
| 2.4.7 Focus Visible | Focus ring visível em links (`outline: 2px solid`) |
| 2.5.5 Target Size | Botões de view: touch target via QBtn (≥ 48px) |
| 4.1.2 Name, Role, Value | ARIA via Quasar (QBtn, QBreadcrumbs, QPagination) |

### Skeletons de loading
- Elementos skeleton NÃO têm role="status" — a região completa de dados usa `aria-live` implícito via Quasar tabs
- Loading visual desaparece quando `loading: false` — leitores de tela anunciam via mudança de conteúdo real

---

## 7. Brandabilidade

O componente aceita `brand?: TestPageBrand` e propaga via `:data-brand` no elemento raiz.

Ao selecionar uma marca:
- Componentes filhos DSS (DssCard, DssChip, DssIcon) recebem automaticamente a identidade visual
- `_brands.scss` sobrescreve cor de ação e focus ring do toggle de view

| Brand | Token de ação | Token de foco |
|-------|---------------|---------------|
| hub | `--dss-hub-primary` | `--dss-hub-primary` |
| water | `--dss-water-primary` | `--dss-water-primary` |
| waste | `--dss-waste-primary` | `--dss-waste-primary` |

---

## 8. Dark Mode

Implementado em `4-output/_states.scss` via `.body--dark` (convenção Quasar).

Todos os valores de background, borda e status cards são determinados por tokens DSS semânticos que já possuem variantes dark no tema global. O componente não precisa redefinir cores — apenas garante que os tokens corretos estejam sendo usados.

---

## 9. Tokens utilizados

46 tokens. Lista completa em [DSSTESTPAGECOMPLEXITY_API.md — Tokens](./DSSTESTPAGECOMPLEXITY_API.md#tokens-utilizados).

**Grupos:**
- Surface: `--dss-surface-{muted,default,subtle,hover,selected}`
- Text: `--dss-text-{primary,secondary,on-primary}`
- Action: `--dss-action-primary`
- Feedback: `--dss-feedback-{success,warning,error}{,-surface,-light}`
- Typography: `--dss-font-{size,weight}-*`
- Radius: `--dss-radius-{lg,md,sm}`
- Spacing: `--dss-spacing-{1,3,4,6,8,10,32,40}`
- Motion: `--dss-duration-{150,1000}`, `--dss-easing-standard`
- Misc: `--dss-opacity-disabled`, `--dss-gray-200`, `--dss-border-default`
- Brand: `--dss-{hub,water,waste}-primary`

---

## 10. Exceções

**Nenhuma exceção a Token First declarada.**

O componente utiliza exclusivamente `var(--dss-*)` sem valores hardcoded.

---

## 11. Dependências DSS internas

| Componente | Uso |
|------------|-----|
| DssCard | Cards de status, filtros e tabela de dados |
| DssCardSection | Seções internas dos cards |
| DssCardActions | Área de ações do card de filtros |
| DssChip | Chips de filtros ativos (com botão de remoção) |
| DssIcon | Ícones semânticos de status |
| DssSeparator | Divisores visuais na seção de filtros |

---

## 12. Verificação de conformidade

### Gate Estrutural
- [x] 4 camadas existem em completude
- [x] Entry Point Wrapper (`DssTestPageComplexity.vue`) é re-export puro
- [x] Orchestrador SCSS importa L2 → L3 → L4 na ordem correta
- [x] Barrel export (`index.js`) exporta componente, types e composables
- [x] `dss.meta.json` existe com `goldenReference` e `goldenContext`

### Gate Técnico
- [x] Zero valores hardcoded — Token First completo
- [x] Cores via tokens, não SCSS
- [x] `inheritAttrs: false` implementado
- [x] `provide/inject` com InjectionKey tipado
- [x] `brand` via `data-brand` no elemento raiz
- [x] Dark mode via `.body--dark` (padrão Quasar)
- [x] forced-colors, high-contrast e print implementados
- [x] `prefers-reduced-motion` implementado
- [x] SCSS compila sem erros

### Gate Documental
- [x] README.md com quick start, modos, tokens e links
- [x] DSSTESTPAGECOMPLEXITY_API.md com props, emits, slots, provide/inject, tokens, estados
- [x] DssTestPageComplexity.md (este arquivo) — Template 13.1
- [x] DssTestPageComplexity.example.vue com ≥ 3 cenários
- [x] dss.meta.json com goldenReference e goldenContext

---

## 13. Changelog

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0.0 | 2026-04-29 | Criação — Stress Test Fase 3 |
