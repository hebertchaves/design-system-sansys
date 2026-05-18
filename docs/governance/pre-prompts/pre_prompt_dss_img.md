# Pré-prompt: DssImg

## 1. CLASSIFICAÇÃO E CONTEXTO

- **Fase:** 2
- **Nível:** 1 — Independente (depende apenas de componentes da Fase 1)
- **Família:** Mídia e Visualização
- **Tipo:** Container de mídia não interativo
- **Interativo:** Não (imagem não tem interatividade própria; interação é responsabilidade do elemento pai)

### Golden Reference

**DssBadge** — Golden Reference oficial para componentes não interativos do DSS.

### Golden Context

**DssInfiniteScroll** — baseline específico para auditoria. DssImg segue o mesmo padrão arquitetural: componente Quasar como root element (EXC-Gate-01), `inheritAttrs: false` com `v-bind="$attrs"` forwarded ao root, sem estados interativos, sem `defineEmits` inventados, `withDefaults` apenas para defaults não-triviais.

**Diferença crítica DssInfiniteScroll → DssImg:** QImg expõe slots `#loading` e `#error` que DssImg governa. DssInfiniteScroll expõe API imperativa via `defineExpose`; DssImg não expõe API imperativa — emite apenas eventos passivos (`load`, `error`).

### Justificativa de Fase 2

DssImg é classificado como Fase 2 N1 por ser um wrapper de uma única base Quasar (`QImg`) com composição interna de componentes DSS (`DssSpinner`, `DssIcon`). A dependência de componentes Fase 1 para estados visuais (loading/error) o eleva da Fase 1 para Fase 2 N1.

---

## 2. RISCOS ARQUITETURAIS E GATES

### Calcanhar de Aquiles: `alt` vs `decorative` — WCAG 1.1.1

O maior risco é o agente omitir o sistema dual `alt`/`decorative` ou implementá-lo incorretamente.

**Anti-pattern:**
```vue
<!-- ❌ alt hardcoded vazio sem decorative -->
<q-img :alt="''" />

<!-- ❌ alt opcional sem aviso em dev mode -->
<q-img :alt="props.alt" />
```

**Padrão correto:**
```typescript
// ✅ Sistema dual com computed + dev warning
const computedAlt = computed<string>(() => {
  if (props.decorative === true) return ''
  if (props.alt !== undefined) return props.alt
  if (import.meta.env?.DEV) {
    console.warn('[DssImg] O prop `alt` é obrigatório para imagens não-decorativas (WCAG 1.1.1).')
  }
  return ''
})
```

### Risco secundário: QImg como root element (EXC-Gate-01)

QImg DEVE ser o root element direto — sem div wrapper intermediário. O QImg renderiza como `<div>` com `overflow:hidden !important` (classe Quasar interna). Esse `overflow:hidden` é o que garante o clip correto do `border-radius` aplicado pelas variantes. Adicionar um wrapper div quebraria o clip.

**Anti-pattern:**
```vue
<!-- ❌ Wrapper div extra — quebra overflow:hidden e aspect ratio trick -->
<div :class="rootClasses">
  <q-img v-bind="$attrs" ... />
</div>
```

**Padrão correto:**
```vue
<!-- ✅ QImg como root element direto -->
<q-img v-bind="$attrs" :class="rootClasses" ... />
```

---

## 3. MAPEAMENTO DE API (QUASAR → DSS)

### Props Expostas

| Prop QImg | Prop DSS | Tipo | Default | Observações |
|-----------|----------|------|---------|-------------|
| `src` | `src` | `String` | `undefined` | URL da imagem |
| `alt` | `alt` | `String` | `undefined` | Obrigatório para não-decorativas (WCAG 1.1.1) |
| — | `decorative` | `Boolean` | `false` | Extensão DSS: define `alt=""` automaticamente |
| `ratio` | `ratio` | `Number \| String` | `undefined` | Aspect ratio. Sem default — consumer deve prover |
| `fit` | `fit` | `'cover'\|'contain'\|'fill'\|'none'\|'scale-down'` | `'cover'` | Default não-trivial |
| `loading` | `loading` | `'lazy'\|'eager'` | `'lazy'` | Default não-trivial |
| `error-src` | `fallbackSrc` | `String` | `undefined` | Imagem exibida quando `src` falha |
| `placeholder-src` | `placeholderSrc` | `String` | `undefined` | LQIP — imagem de baixa qualidade enquanto carrega |
| `position` | `position` | `String` | `undefined` | Equivalente a background-position |
| `no-transition` | `noTransition` | `Boolean` | `false` | Desativa fade-in ao carregar |
| — | `radius` | `'none'\|'sm'\|'md'\|'lg'\|'full'` | `undefined` | Extensão DSS: border-radius via tokens |

### Props Bloqueadas (não expor)

| Prop QImg | Motivo do bloqueio |
|-----------|--------------------|
| `spinner-color` | Gerenciado internamente via `DssSpinner` no slot `#loading` |
| `spinner-size` | DSS usa `DssSpinner size="sm"` como padrão |
| `no-spinner` | Irrelevante quando slot `#loading` é fornecido |

### Props Avançadas via `$attrs`

Props QImg não declaradas acima (`srcset`, `sizes`, `img-class`, `img-style`, `no-native-menu`, `fetchpriority`) fluem via `v-bind="$attrs"`.

### Slots

| Slot DSS | Slot QImg | Default DSS |
|----------|-----------|-------------|
| `default` | `default` | — (overlay sobre a imagem) |
| `loading` | `#loading` | `DssSpinner size="sm"` com `aria-hidden="true"` |
| `error` | `#error` | `DssIcon name="broken_image"` com `aria-hidden="true"` |

### Events

| Evento QImg | Evento DSS | Quando |
|-------------|------------|--------|
| `@load` | `@load` | Imagem carregada com sucesso |
| `@error` | `@error` | Carregamento falhou (após tentativas de `src` e `fallbackSrc`) |

---

## 4. GOVERNANÇA DE TOKENS E CSS

### Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-disabled` | Fundo dos containers `__loading` e `__error` |
| `--dss-text-subtle` | Cor do ícone de erro (sem brand) |
| `--dss-radius-sm` | Variante `radius="sm"` |
| `--dss-radius-md` | Variante `radius="md"` |
| `--dss-radius-lg` | Variante `radius="lg"` |
| `--dss-radius-full` | Variante `radius="full"` (circular) |
| `--dss-action-hub` | Cor do ícone de erro em brand hub |
| `--dss-action-water` | Cor do ícone de erro em brand water |
| `--dss-action-waste` | Cor do ícone de erro em brand waste |

### Tokens que NÃO existem no catálogo DSS (nunca usar)

- `--dss-action-hub-surface` — **NÃO EXISTE**
- `--dss-duration-250` para fade-in — **NÃO usar**: o fade-in é gerenciado internamente pelo `QImg`. Não é responsabilidade do DSS CSS sobrescrever animação interna do Quasar.

### `_brands.scss`

Seletor descendant obrigatório: `[data-brand="hub"] .dss-img { .dss-img__error { color: var(--dss-action-hub); } }`. Compila para `[data-brand="hub"] .dss-img .dss-img__error`. Padrão DSS correto.

### `_states.scss`

- `forced-color-adjust: proibido no DSS`
- `prefers-contrast: more` → `color: currentColor` no `__error`
- `forced-colors: active` → `color: CanvasText` e `background-color: Canvas` (SystemColor keywords)
- `print` → `__loading { display: none }` (estado de loading sem significado em papel)

---

## 5. ACESSIBILIDADE E ESTADOS

### Estados Aplicáveis

| Estado | Implementado | Motivo |
|--------|-------------|--------|
| `default` | ✅ | Imagem carregada e exibida |
| `loading` | ✅ | `DssSpinner` via slot `#loading`; QImg gerencia visibilidade |
| `error` | ✅ | `DssIcon name="broken_image"` via slot `#error`; QImg exibe após falha de src e fallbackSrc |
| `hover` | ❌ N/A | Container não interativo — responsabilidade do elemento pai (link, botão) |
| `focus` | ❌ N/A | Não interativo diretamente |
| `active` | ❌ N/A | Container de mídia |
| `disabled` | ❌ N/A | Sem semântica de disable para elementos de mídia |

### Touch Target

N/A — componente não interativo. `::before` não deve ser implementado (reservado para touch target — WCAG 2.5.5).

### WCAG

- **WCAG 1.1.1 (Nível A) — Texto Alternativo**: `alt` obrigatório para não-decorativas. Dev warning se ausente sem `decorative=true`.
- **WCAG 1.1.1 — Imagens Decorativas**: `decorative=true` define `alt=""` automaticamente.
- **ARIA loading/error**: `aria-hidden="true"` nos containers `__loading` e `__error` — decorativos; feedback acessível é o `alt` text.

### Exceção Estrutural (EXC-Gate-01)

QImg deve ser o root element direto. `$attrs` forwarded via `v-bind="$attrs"` no QImg. Justificativa: QImg aplica `overflow:hidden !important` internamente — necessário para clip de `border-radius` e aspect ratio padding trick.
