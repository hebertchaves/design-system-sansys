# DssCircularProgress — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssCircularProgress` é um indicador de progresso circular — um SVG animado que comunica visualmente o andamento de uma operação, seja com valor determinado (percentual conhecido) ou indeterminado (operação em andamento sem progresso mensurável).

**Quando usar:**
- Operações assíncronas com duração perceptível (> 500ms)
- Upload de arquivo com percentual de progresso conhecido
- Etapas de onboarding ou completude de perfil
- Carregamento de dados em cards ou seções de conteúdo
- Contextos onde o espaço é limitado (não cabe DssLinearProgress)

**Quando NÃO usar:**
- Operações com duração < 500ms (cintilação desnecessária)
- Como indicador primário de erro (usar DssBanner, DssToast)
- Aninhando múltiplos DssCircularProgress na mesma área visual
- Em fluxos de formulário onde o progresso é irrelevante para o usuário
- Quando DssSpinner (mais simples) é suficiente para o contexto

---

## 2. Classificação DSS

- **Tipo:** Indicador de Progresso circular não interativo
- **Categoria:** Progresso e Feedback
- **Fase:** 2 — Nível 1
- **Interativo:** Não
- **Golden Reference:** DssBadge (componente não interativo — governança de categoria)
- **Golden Context:** DssLinearProgress (componente de progresso irmão — baseline de auditoria específico)

---

## 3. API

### Props

| Prop | Type | Default | Obrigatório | Description |
|------|------|---------|-------------|-------------|
| `value` | `Number` | `undefined` | Não | Valor atual (min..max) |
| `min` | `Number` | `0` | Não | Valor mínimo |
| `max` | `Number` | `100` | Não | Valor máximo |
| `color` | `CircularProgressColor` | `'primary'` | Não | Cor semântica DSS do arco |
| `size` | `CircularProgressSize` | `'md'` | Não | Tamanho do componente |
| `brand` | `CircularProgressBrand` | `undefined` | Não | Contexto de brand Sansys |
| `indeterminate` | `Boolean` | `false` | Não | Animação contínua |
| `thickness` | `Number` | `0.2` | Não | Espessura do traço (0–1) |
| `angle` | `Number` | `0` | Não | Ângulo de início em graus |
| `reverse` | `Boolean` | `false` | Não | Inverte direção |
| `instantFeedback` | `Boolean` | `false` | Não | Remove transição de valor |
| `disable` | `Boolean` | `false` | Não | Reduz opacidade (desabilitado) |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Conteúdo no centro do círculo (rótulo, percentual, ícone) |

### Events

Nenhum. QCircularProgress não expõe eventos controláveis pelo DSS.

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Progresso determinado com valor |
| indeterminate | ✅ | Animação contínua (loading) |
| disabled | ✅ | Opacidade `--dss-opacity-disabled` (0.4), sem pointer-events |
| hover | — | N/A — componente não interativo |
| focus | — | N/A — sem navegação por teclado própria |
| active | — | N/A — sem interação direta |
| loading | — | N/A — este componente É o indicador de loading |
| error | — | N/A — erro deve ser comunicado por DssBanner / DssToast |

---

## 5. Tokens Utilizados

| Propriedade | Token | Motivo |
|-------------|-------|--------|
| Track (trilha de fundo) | `--dss-surface-muted` | Cor atenuada do sistema — mantém hierarquia visual arco/track |
| Opacidade disabled | `--dss-opacity-disabled` | 0.4 — padrão canônico DSS |
| Tamanho xs | `--dss-spacing-10` | 40px — via prop :size |
| Tamanho sm | `--dss-spacing-12` | 48px — via prop :size |
| Tamanho md | `--dss-spacing-16` | 64px — padrão |
| Tamanho lg | `--dss-spacing-20` | 80px — via prop :size |
| Tamanho xl | `--dss-spacing-24` | 96px — via prop :size |
| Cor primary | `--dss-action-primary` | Ação principal do sistema |
| Cor secondary | `--dss-action-secondary` | Ação secundária |
| Cor error | `--dss-feedback-error` | Feedback de erro |
| Cor success | `--dss-feedback-success` | Feedback de sucesso |
| Cor warning | `--dss-feedback-warning` | Feedback de alerta |
| Cor info | `--dss-feedback-info` | Feedback informativo |
| Brand hub light | `--dss-hub-600` | Brand Sansys Hub — light mode |
| Brand hub dark | `--dss-hub-500` | Brand Sansys Hub — dark mode |
| Brand water light | `--dss-water-500` | Brand Sansys Water — light mode |
| Brand water dark | `--dss-water-400` | Brand Sansys Water — dark mode |
| Brand waste light | `--dss-waste-600` | Brand Sansys Waste — light mode |
| Brand waste dark | `--dss-waste-500` | Brand Sansys Waste — dark mode |

---

## 6. Acessibilidade

### WCAG 2.1 AA

| Critério | Status | Implementação |
|----------|--------|---------------|
| 4.1.3 Mensagens de Status | ✅ | QCircularProgress declara `role="progressbar"` e `aria-valuenow/min/max` automaticamente |
| 2.3.3 Animação de Interação | ✅ (AAA) | `animation: none !important` quando `prefers-reduced-motion: reduce` |
| 1.4.11 Contraste Não Textual | ✅ | `forced-colors: active` usa `CanvasText`/`GrayText` |
| 1.3.1 Informação e Relações | ✅ | `aria-valuenow/min/max` gerenciados pelo Quasar quando `value` é fornecido |

### Touch Target
Não aplicável — DssCircularProgress não é interativo. Opção B (sem `::before`), consistente com DssBadge e DssLinearProgress.

### Navegação por Teclado
O componente não recebe foco. Elementos interativos em volta são gerenciados pelos próprios componentes pai.

### `prefers-reduced-motion`
Quando `prefers-reduced-motion: reduce` está ativo: animações CSS do QCircularProgress são suprimidas via `animation: none !important; transition: none !important`. O `!important` é necessário para sobrescrever as animações internas do Quasar (EX-States-01). Para progresso determinado, o valor estático permanece visível.

---

## 7. Comportamentos Implícitos

### `inheritAttrs: false`
`$attrs` (id, class extra, data-*, aria-* adicionais) são encaminhados ao root div via `v-bind="$attrs"`. O QCircularProgress interno NÃO recebe `$attrs`.

### Cor governada por CSS (não por prop Quasar)
A prop `color` do QCircularProgress NÃO é passada. A cor do arco `.q-circular-progress__circle` é definida via CSS `stroke: var(--dss-...)`. Isso garante governança de tokens DSS em vez do sistema de cores Quasar. Documentado em EXC-Gate-01.

### `show-value` auto-detectado
`show-value` é configurado automaticamente via `useSlots()`: `true` quando o slot default tem conteúdo, `false` caso contrário. O consumidor não precisa declarar `show-value` manualmente.

### Slot default e centro do círculo
O conteúdo do slot default é renderizado no centro do círculo. A fonte do conteúdo central usa a proporção padrão do Quasar (`0.25em` relativo ao tamanho do componente) — escala automaticamente com o `size`.

### Brand via prop e via contexto
Brand pode ser ativado via prop `brand="hub"` (direto) ou via ancestor `[data-brand="hub"]` (herança contextual). Mesmos dois mecanismos do DssLinearProgress e DssSpinner.

---

## 8. Paridade com Golden Reference (DssBadge)

| Aspecto | DssBadge | DssCircularProgress | Status |
|---------|----------|---------------------|--------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Igual |
| `inheritAttrs: false` | ✅ | ✅ | Igual |
| `v-bind="$attrs"` no root | ✅ | ✅ | Igual |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ | Igual |
| Componente não interativo | ✅ | ✅ | Igual |
| Touch target `::before` ausente | ✅ | ✅ | Igual |
| `defineEmits` omitido | ✅ | ✅ | Igual |
| Slot default | ❌ | ✅ | **Diferente** — slot para rótulo central do círculo |
| Brandability | ❌ | ✅ | **Diferente** — semântica de brand para cor do arco |
| Estado indeterminate | ❌ | ✅ | **Diferente** — animação de loading |

---

## 9. Matriz de Composição DSS

### Papel Estrutural
DssCircularProgress é um indicador visual standalone. Não instancia componentes filhos automaticamente.

### Componentes DSS Recomendados como Contexto

| Componente | Status | Uso |
|------------|--------|-----|
| `DssCard` | ✅ Existente | Container para contextualizar o progresso |
| `DssDialog` | ✅ Existente | Overlay de operação longa com progresso |
| `DssSpinner` | ✅ Existente | Alternativa mais simples para indeterminate |
| `DssLinearProgress` | ✅ Existente | Alternativa horizontal |

### Padrões de Layout
- `DssCircularProgress` com rótulo percentual no slot: upload/download progress
- `DssCircularProgress` sem slot (indeterminate): carregamento de seção
- `DssCircularProgress` dentro de `DssCard`: status de operação

### Limites de Responsabilidade
- DssCircularProgress: animação, progresso, ARIA, brandability
- Conteúdo do slot center: responsabilidade do consumidor (tipografia, cor)
- Comunicação de erro: responsabilidade de DssBanner/DssToast

### Anti-Patterns
- ❌ Usar DssCircularProgress como indicador primário de erro
- ❌ Aninhar múltiplos DssCircularProgress na mesma área visual
- ❌ Usar `size` muito pequeno (< xs = 40px) — arco fica imperceptível
- ❌ Omitir `aria-label` em contextos onde o `role="progressbar"` precisar de nome
- ❌ Usar em fluxos de formulário sem relação com progresso

---

## 10. Exceções Registradas

| ID | Regra | Detalhe | Local |
|----|-------|---------|-------|
| EXC-Gate-01 | Gate de Composição v2.4 — seletores internos Quasar | `.q-circular-progress__track` e `.q-circular-progress__circle` necessários para aplicar tokens DSS via `stroke` SVG. Prop `color` e `track-color` do Quasar NÃO são passadas — governança 100% CSS DSS. | `2-composition/_base.scss`, `3-variants/_colors.scss`, `4-output/_brands.scss` |
| EX-States-01 | `!important` em prefers-reduced-motion | `animation: none !important; transition: none !important` — obrigatório para sobrescrever animações internas do QCircularProgress. WCAG 2.3.3. Precedente: DssLinearProgress. | `4-output/_states.scss` |
| EX-States-02 | `!important` em print | `stroke: currentColor !important` — garante visibilidade do arco em impressão monocromática. Precedente: DssLinearProgress, DssTabPanel. | `4-output/_states.scss` |
| EX-Code-01 | Token First — JS não pode consumir CSS vars | `animation-speed: 250` (número JS) equivale a `--dss-duration-250`. Manter sincronizado. Precedente: DssLinearProgress. | `1-structure/DssCircularProgress.ts.vue` |

---

## 11. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-18 | Claude (DSS Agent) | Criação inicial — Fase 2, Nível 1, Família Progresso e Feedback |
