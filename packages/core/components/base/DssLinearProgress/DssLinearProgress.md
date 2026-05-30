# DssLinearProgress — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssLinearProgress` é um indicador de progresso linear que comunica o andamento de uma operação ao usuário. Pode operar em modo **determinado** (valor numérico 0.0–1.0) ou **indeterminado** (animação contínua quando o tempo de conclusão é desconhecido).

**Quando usar:**
- Progresso de upload ou download de arquivo
- Carregamento de conteúdo de página
- Progresso de formulário multi-etapa (valor aproximado)
- Indicação de processamento em background

**Quando NÃO usar:**
- Progresso circular → use `DssSpinner`
- Etapas discretas com contexto → use `DssStepper`
- Indicação de carregamento inline dentro de botão → use `DssButton` com `loading`

---

## 2. Classificação DSS

- **Tipo:** Indicador de Progresso não interativo
- **Categoria:** Progresso e Feedback
- **Fase:** 2 — Nível Arquitetural 2 (Composição de base)
- **Interativo:** Não
- **Golden Reference:** DssBadge (componente não interativo)
- **Golden Context:** DssSpinner (componente de feedback não interativo)

---

## 3. Modelo DSS × Quasar

- **Quasar** = camada de execução (`QLinearProgress`: animação, ARIA, cálculo de posição)
- **DSS** = camada de governança (tokens de cor, altura, forma, brandability)

O DssLinearProgress é um **wrapper DSS governado** sobre `QLinearProgress`. O DSS diverge da API Quasar em três pontos intencionais:
- **`track-color`** bloqueado → governado por `--dss-surface-muted`
- **`dark`** bloqueado → gerenciado via `[data-theme="dark"]`
- **`rounded`** bloqueado → governado por `--dss-radius-full`

---

## 4. API

*(ver DSSLINEARPROGRESS_API.md para referência completa)*

### Props Expostas
| Prop | Tipo | Padrão |
|------|------|--------|
| `value` | `Number` | `undefined` |
| `indeterminate` | `Boolean` | `false` |
| `reverse` | `Boolean` | `false` |
| `color` | `String` | `'primary'` |
| `size` | `String` | `'md'` |
| `brand` | `String` | `undefined` |
| `stripe` | `Boolean` | `false` |
| `disable` | `Boolean` | `false` |

### Slots
Nenhum. Componente visual puro.

### Events
Nenhum. Componente não interativo.

---

## 5. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Barra determinada, value visível |
| indeterminate | ✅ | Animação contínua via QLinearProgress |
| disabled | ✅ | `opacity: var(--dss-opacity-disabled)` = 0.4 |
| hover | N/A | Componente não interativo (Opção B — padrão DssBadge) |
| focus | N/A | Componente não interativo |
| active | N/A | Componente não interativo |
| loading | N/A | Este componente É o indicador de loading |

---

## 6. Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA)

### 6.1 inheritAttrs: false
`$attrs` são encaminhados ao `div` root via `v-bind="$attrs"`. O `QLinearProgress` interno **não** recebe `$attrs`. Isso permite adicionar `id`, `class` extra, `data-*` e `aria-*` ao wrapper sem contaminar a lógica interna do Quasar.

### 6.2 Delegação ao Quasar
`QLinearProgress` gerencia completamente:
- `role="progressbar"` no elemento raiz
- `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="1"`
- Lógica de animação indeterminate (CSS keyframes internos)
- Cálculo de posição/largura da barra

O DssLinearProgress **não reimplementa** nenhuma dessas lógicas.

### 6.3 Prop `value` vs `indeterminate`
Quando `indeterminate=true`, `value` é internamente convertido para `undefined` antes de ser passado ao Quasar. Isso ativa a animação contínua do Quasar corretamente. `value=0` não é equivalente a `indeterminate`.

### 6.4 Mapeamento de `size` para token CSS
A prop `size` é traduzida para o CSS token correspondente e passada como `:size` ao `QLinearProgress`. O Quasar aplica esse valor como inline style de `height`, garantindo que o browser resolva o CSS var sem conflito de especificidade.

### 6.5 Dualidade de altura: inline style × classe CSS
As classes `dss-linear-progress--size-*` definem `min-height` como floor constraint. O mecanismo primário de altura é a prop `:size` (CSS token resolvido em JS, ex: `'var(--dss-spacing-3)'`) passada ao `QLinearProgress` como inline style `height`. Os dois mecanismos coexistem sem conflito: o inline style define a altura exata, a classe define o piso mínimo de segurança. Não remova `:size` do `QLinearProgress` assumindo que o CSS é suficiente — os mecanismos são complementares.

### 6.6 Props bloqueadas
`dark`, `track-color` e `rounded` não são expostos ao consumidor. A governança é feita pelo DSS via CSS global.

---

## 7. Tokens Utilizados

| Token | Arquivo | Uso |
|-------|---------|-----|
| `--dss-surface-muted` | `_base.scss` | Cor do track (fundo inativo) |
| `--dss-radius-full` | `_base.scss` | Border-radius barra e track |
| `--dss-opacity-disabled` | `_base.scss` | Opacidade no estado disabled (0.4) |
| `--dss-duration-250` | `_base.scss` | Duração da transição |
| `--dss-easing-standard` | `_base.scss` | Curva easing |
| `--dss-spacing-{1,2,3,4,6}` | `_sizes.scss` | Alturas por tamanho |
| `--dss-action-primary` | `_colors.scss` | Model — primary |
| `--dss-action-secondary` | `_colors.scss` | Model — secondary |
| `--dss-feedback-{error,success,warning,info}` | `_colors.scss` | Model — feedback |
| `--dss-hub-{600,500}` | `_brands.scss` + `_states.scss` | Model — hub (light/dark) |
| `--dss-water-{500,400}` | `_brands.scss` + `_states.scss` | Model — water (light/dark) |
| `--dss-waste-{600,500}` | `_brands.scss` + `_states.scss` | Model — waste (light/dark) |

---

## 8. Acessibilidade

- **WCAG 2.1 AA:** Conformante
- **Touch Target:** N/A — Opção B (componente não interativo)
- **ARIA:** Gerenciado pelo `QLinearProgress` (`role="progressbar"`, `aria-valuenow/min/max`). Em estado `indeterminate`, o Quasar omite `aria-valuenow` conforme ARIA spec. Se não houver label visual adjacente, passe `aria-label="Descrição do processo"` via `$attrs` para garantir conformidade com WCAG 2.4.6.
- **Navegação por teclado:** N/A — sem foco
- **prefers-reduced-motion:** Animações do Quasar suprimidas via `animation: none !important` (EX-States-01)
- **forced-colors:** Track usa `Canvas` + borda `CanvasText`; model usa `CanvasText`
- **prefers-contrast: more:** Track recebe `outline: 1px solid currentColor`

---

## 9. Paridade com Golden Reference — DssBadge

| Aspecto | DssBadge | DssLinearProgress | Igual | Justificativa da diferença |
|---------|----------|-------------------|-------|---------------------------|
| `defineOptions` + `inheritAttrs: false` | ✅ | ✅ | ✅ | — |
| `v-bind="$attrs"` no root | ✅ | ✅ | ✅ | — |
| Touch target `::before` | N/A (não interativo) | N/A (não interativo) | ✅ | Ambos usam Opção B |
| `role` semântico | `role="status"` | `role="progressbar"` (Quasar) | Diferente | LinearProgress tem semântica própria de progressbar; Badge usa status |
| `-webkit-tap-highlight-color` | Não aplicável | Não aplicável | ✅ | Ambos não interativos |
| Tokens de brand numéricos | ✅ (hub-600, etc.) | ✅ (hub-600, etc.) | ✅ | — |
| Estado disabled via opacity | ✅ | ✅ | ✅ | `--dss-opacity-disabled` = 0.4 |
| Nenhum evento emitido | ✅ | ✅ | ✅ | — |

---

## 10. Paridade com Golden Context — DssSpinner

| Aspecto | DssSpinner | DssLinearProgress | Igual | Justificativa |
|---------|------------|-------------------|-------|---------------|
| Delegação total ao Quasar | ✅ | ✅ | ✅ | — |
| `defineOptions` + `inheritAttrs` | ✅ | ✅ | ✅ | — |
| `pointer-events: none` | ✅ | ✅ | ✅ | Não interativo |
| `prefers-reduced-motion` com `!important` | ✅ (EX-02) | ✅ (EX-States-01) | ✅ | Mesmo padrão |
| Brand via `data-brand` ancestral | ✅ | ✅ | ✅ | — |
| Brand dark mode (tokens ~500) | ✅ | ✅ | ✅ | — |
| `forced-colors: active` | ButtonText | CanvasText | Diferente | Progressbar usa CanvasText (mais semântico para fills/backgrounds) |
| `sr-only` label | ✅ | N/A | Diferente | Quasar gerencia ARIA; spinner precisa de label porque não tem progressbar role |

---

## 11. Exceções Registradas

| ID | Regra Violada | Local | Justificativa |
|----|---------------|-------|---------------|
| `EXC-Gate-01` | Gate de Composição v2.4 — seletores internos Quasar | `_base.scss`, `_colors.scss`, `_brands.scss` | Necessário para aplicar `--dss-surface-muted`, `--dss-radius-full` e cores semânticas DSS à estrutura DOM interna do QLinearProgress. |
| `EX-States-01` | Uso de `!important` | `_states.scss` | Obrigatório para sobrescrever animações CSS do Quasar em `prefers-reduced-motion`. WCAG 2.3.3. |

---

## 12. Anti-Patterns Documentados

- ❌ Usar `QLinearProgress` diretamente sem o wrapper DSS
- ❌ Passar `track-color` ao `DssLinearProgress` — use o token `--dss-surface-muted`
- ❌ Criar `_colors.scss` com cores hardcoded para variantes — use tokens semânticos
- ❌ Definir `value=0` esperando comportamento de `indeterminate` — use `indeterminate` prop
- ❌ Usar `DssLinearProgress` para etapas discretas — use `DssStepper`

---

## 13. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-06 | Claude Code Assistant | Criação inicial — Fase 2, Nível 2 |
