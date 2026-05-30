# DssInnerLoading — Documentação Normativa (Template 13.1)

## 1. Classificação

| Campo | Valor |
|-------|-------|
| **Componente** | `DssInnerLoading` |
| **Versão DSS** | 2.2 |
| **Fase** | 2 |
| **Nível** | 1 — Feedback de loading para container |
| **Família** | Progresso e Feedback |
| **Categoria** | Overlay de loading local (não interativo) |
| **Golden Reference** | `DssBadge` (governança não interativa) |
| **Golden Context** | `DssCircularProgress` (família Progresso e Feedback) |
| **Quasar Base** | `QInnerLoading` |
| **Dependências DSS** | `DssSpinner` (no slot default padrão) |
| **Status** | `conformant` |

### Quando Usar

- Indicar carregamento de dados em um card, tabela, formulário ou painel específico
- Bloquear interações com uma área da UI durante operação assíncrona
- Prevenir submissões duplicadas de formulários

### Quando NÃO Usar

- **Loading de página inteira**: use um mecanismo dedicado de page-level loading
- **Operações < 300ms**: use a prop `delay` ou omita o loading completamente (flash desnecessário)
- **Skeleton loading**: use `DssSkeleton` para simular o layout do conteúdo durante carregamento
- **Barra de progresso global**: use `DssAjaxBar` para requisições HTTP globais

---

## 2. API

Consulte `DSSINNERLOADING_API.md` para a referência completa de props, slots, events, composable, tokens e comportamentos implícitos.

**Requisito crítico do container pai:**
```html
<!-- ✅ CORRETO -->
<div style="position: relative;">
  <DssInnerLoading :showing="true" />
</div>

<!-- ❌ INCORRETO — overlay vaza para fora da área -->
<div>
  <DssInnerLoading :showing="true" />
</div>
```

---

## 3. Estados

| Estado | Implementação | Observação |
|--------|--------------|------------|
| **Ativo (showing=true)** | QInnerLoading renderiza overlay, DssSpinner animado | Estado principal de uso |
| **Inativo (showing=false)** | QInnerLoading não renderiza o overlay (v-show=false) | Transição fade-out automática |
| **Com delay** | QInnerLoading aguarda `delay`ms antes de exibir | Evita flash em operações rápidas |
| **Com label** | Classe `--has-label` + `<span class="dss-inner-loading__label">` renderizado | Texto abaixo do spinner |
| **Com slot customizado** | DssSpinner e label internos não renderizados | Consumer controla o conteúdo |

### Estados NÃO APLICÁVEIS

| Estado | Razão |
|--------|-------|
| **hover** | Overlay não interativo — não possui estado de hover |
| **focus** | Conteúdo abaixo é bloqueado enquanto showing=true; overlay não recebe foco |
| **active** | Overlay não é clicável por design |
| **disabled** | O componente ou está showing ou não está — não existe estado "disabled" |
| **error** | Estado de erro deve ser comunicado por DssBanner ou componente específico |
| **loading** | Este componente É o indicador de loading |

---

## 4. Tokens Utilizados

| Token | Propriedade | Contexto |
|-------|-------------|---------|
| `--dss-surface-default` | `background-color` | Fundo do overlay (EX-Overlay-01) |
| `--dss-font-size-sm` | `font-size` | Label de texto |
| `--dss-font-weight-medium` | `font-weight` | Label de texto |
| `--dss-font-weight-bold` | `font-weight` | Label em prefers-contrast:more |
| `--dss-spacing-2` | `gap` | Espaçamento spinner ↔ label |
| `--dss-action-primary` | `color` | Color: primary (default) |
| `--dss-action-secondary` | `color` | Color: secondary |
| `--dss-feedback-error` | `color` | Color: error |
| `--dss-feedback-success` | `color` | Color: success |
| `--dss-feedback-warning` | `color` | Color: warning |
| `--dss-feedback-info` | `color` | Color: info |
| `--dss-hub-600` / `--dss-hub-500` | `color` | Brand hub (light/dark) |
| `--dss-water-500` / `--dss-water-400` | `color` | Brand water (light/dark) |
| `--dss-waste-600` / `--dss-waste-500` | `color` | Brand waste (light/dark) |

---

## 5. Acessibilidade

- **`role="status"` + `aria-live="polite"`** no root (QInnerLoading): anuncia o estado de loading ao screen reader sem interromper a leitura atual. WCAG 4.1.3.
- **`aria-hidden="true"` no DssSpinner interno** (slot default): evita anúncio duplo — a semântica primária é fornecida pelo root. DssSpinner tem seu próprio `role="status"` que seria redundante; `aria-hidden` prevalece sobre ele.
- **Container pai requer `position: relative`**: documentado como requisito obrigatório. Sem ele, o overlay pode cobrir elementos não relacionados, quebrando a experiência de leitores de tela.
- **`pointer-events: all`**: bloqueia toda interação com o conteúdo abaixo. Elementos interativos no container pai se tornam inacessíveis por teclado enquanto o overlay está ativo.
- **`prefers-reduced-motion: reduce`**: animação do DssSpinner e fade transition do QInnerLoading são suprimidos (EX-States-01). WCAG 2.3.3 (nível AAA).
- **`forced-colors: active`**: overlay usa SystemColor keywords (Canvas, CanvasText, ButtonText). WCAG 1.4.11. `forced-color-adjust` NÃO utilizado — propriedade herdada que afetaria slot customizado.
- **`prefers-contrast: more`**: label com `font-weight: var(--dss-font-weight-bold)`.

---

## 6. Comportamentos Implícitos

1. **Container pai requer `position: relative`**: QInnerLoading usa `position: absolute` internamente. Documentado em README.md como requisito obrigatório.

2. **Fade transition automática**: QInnerLoading aplica `q-transition--fade` ao alternar `showing`. Suprimida em `prefers-reduced-motion: reduce`.

3. **DssSpinner herda cor via currentColor**: A prop `color` seta a propriedade CSS `color` no root via classes `--color-*`. DssSpinner interno (sem prop `color` explícita) herda via `currentColor`.

4. **`aria-hidden="true"` no DssSpinner interno**: O root tem `role="status"` como anunciador primário. DssSpinner é visual dentro deste contexto.

5. **Slot customizado desativa DssSpinner e label**: Consumer obtém controle total ao fornecer slot — assume responsabilidade pela acessibilidade.

6. **`delay` delegado ao QInnerLoading**: Implementação nativa Quasar. `undefined` = 0ms.

7. **`border-radius: inherit`** (EX-Structural-01): o overlay herda o border-radius do container pai, evitando overflow em containers com bordas arredondadas.

---

## 7. Paridade com Golden Reference (DssBadge) e Golden Context (DssCircularProgress)

| Aspecto | DssBadge | DssCircularProgress | DssInnerLoading |
|---------|----------|---------------------|----------------|
| Não interativo | ✅ | ✅ | ✅ |
| Touch target N/A | ✅ | ✅ | ✅ (overlay não interativo) |
| `defineEmits` omitido | ✅ | ✅ | ✅ |
| Brand dual-selector | ✅ | ✅ | ✅ |
| Quasar como root (EXC-Gate-01) | ❌ | ❌ | ✅ |
| prefers-reduced-motion | ✅ | ✅ | ✅ |
| forced-colors | ✅ | ✅ | ✅ |
| `withDefaults` | color, size | color, size... | color, size |

**Diferença arquitetural principal vs Golden Context (DssCircularProgress):**
DssCircularProgress usa um `<div>` wrapper como root e QCircularProgress internamente. DssInnerLoading usa QInnerLoading como root (EXC-Gate-01) porque QInnerLoading provê nativamente o posicionamento absoluto e a transição de fade — duplicar em wrapper seria perigoso. Precedente: DssParallax, DssImg, DssVideo.

---

## 8. Composição e Dependências

### Dependências DSS Internas
- **`DssSpinner`**: Renderizado no slot default padrão. Import via entry point wrapper: `'../../DssSpinner/DssSpinner.vue'`. NÃO via `1-structure/DssSpinner.ts.vue`.

### Como Compor DssInnerLoading

```vue
<!-- ✅ Uso padrão em DssCard -->
<DssCard style="position: relative; min-height: 200px;">
  <DssInnerLoading :showing="isLoading" label="Carregando..." />
  <!-- conteúdo do card -->
</DssCard>

<!-- ✅ Uso em tabela -->
<div class="tabela-wrapper" style="position: relative;">
  <DssInnerLoading :showing="isLoading" color="primary" size="lg" />
  <!-- tabela -->
</div>

<!-- ✅ Slot customizado com DssLinearProgress -->
<DssInnerLoading :showing="isUploading">
  <DssLinearProgress :value="uploadPercent" style="width: 200px;" />
  <span>{{ uploadPercent }}% enviado</span>
</DssInnerLoading>
```

---

## 9. Exceções Documentadas

| ID | Tipo | Descrição |
|----|------|-----------|
| EXC-Gate-01 | Gate Estrutural | QInnerLoading como root element — provê posicionamento, layout e transição nativamente |
| EX-States-01 | Estado | `animation: none !important` em prefers-reduced-motion — WCAG 2.3.3 |
| EX-States-02 | Estado | `display: none` em print — overlay não faz sentido em impressão |
| EX-States-03 | Estado | SystemColor keywords em forced-colors — WCAG 1.4.11 |
| EX-Overlay-01 | Token | `background-color: var(--dss-surface-default)` sem opacidade — token `-rgb` inexiste no catálogo DSS |
| EX-Structural-01 | Estrutural | `border-radius: inherit` — valor dependente da geometria do pai em runtime |

---

## 10. Changelog

| Data | Versão | Descrição |
|------|--------|-----------|
| 2026-05-18 | 2.2 | Criação inicial. 2 ciclos de auditoria. Selo emitido. |
