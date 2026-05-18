# Pré-prompt: DssVideo

## 1. CLASSIFICAÇÃO E CONTEXTO

- **Fase:** 2
- **Nível:** 1 — Independente (depende apenas de componentes da Fase 1)
- **Família:** Mídia e Visualização
- **Tipo:** Container de mídia não interativo
- **Interativo:** Não (controles de vídeo são internos ao iframe; interação é responsabilidade do player nativo)

### Golden Reference

**DssBadge** — Golden Reference oficial para componentes não interativos do DSS.

### Golden Context

**DssImg** — baseline específico para auditoria. DssVideo segue o mesmo padrão arquitetural de DssImg: componente Quasar como root element (EXC-Gate-01), sistema `title`/`decorative` análogo ao `alt`/`decorative` do DssImg, variantes de `radius` idênticas, sem estados interativos.

**Diferença crítica DssImg → DssVideo:** QVideo é um wrapper de `<iframe>`, não de `<img>`. Consequências diretas:
- Não há slots `#loading` nem `#error` expostos pelo QVideo — documentar como N/A
- Controles de reprodução são internos ao player embarcado (YouTube/Vimeo) — fora do escopo DSS
- Acessibilidade via `title` do iframe (WCAG 4.1.2) em vez de `alt` da imagem (WCAG 1.1.1)

### Justificativa de Fase 2

DssVideo é classificado como Fase 2 por ser um wrapper de uma única base Quasar (`QVideo`) sem composição interna de outros componentes DSS — critério idêntico ao DssImg. A classificação Nível 1 é confirmada: dependência apenas de Fase 1 (nenhum componente DSS interno).

---

## 2. RISCOS ARQUITETURAIS E GATES

### Calcanhar de Aquiles: confundir `QVideo` com `<video>` HTML nativo

O maior risco é o agente implementar props da tag `<video>` HTML (`autoplay`, `loop`, `controls`, `volume`, `muted`, `poster`) no DssVideo. Essas propriedades **não pertencem à API do `QVideo`** — pertencem ao elemento nativo. O `QVideo` encapsula um `<iframe>` e gerencia apenas a responsividade.

**Anti-pattern:**
```typescript
// ❌ Props que NÃO existem no QVideo
interface DssVideoProps {
  autoplay?: boolean    // <video> nativo — fora do escopo
  loop?: boolean        // <video> nativo — fora do escopo
  controls?: boolean    // <video> nativo — fora do escopo
  volume?: number       // <video> nativo — fora do escopo
  muted?: boolean       // <video> nativo — fora do escopo
  poster?: string       // <video> nativo — fora do escopo
}
```

**Padrão correto:**
```typescript
// ✅ Props reais do QVideo + extensões DSS
interface DssVideoProps {
  src?: string                                       // QVideo nativo
  ratio?: number | string                            // QVideo nativo (default: 16/9 numérico)
  title?: string                                     // QVideo nativo + WCAG 4.1.2
  decorative?: boolean                               // Extensão DSS (sets title="")
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'   // Extensão DSS
  // fetchpriority flui via $attrs (prop avançada)
}
```

### Risco secundário: string `'16/9'` como default de `ratio`

`parseFloat('16/9') === 16` em JavaScript — o parser para no `/`. O default correto é o número `16/9` (sem aspas), que TypeScript avalia como `1.7777...`. Sempre usar número, nunca string, em `withDefaults` para ratio.

---

## 3. MAPEAMENTO DE API (QUASAR → DSS)

A API real do `QVideo` (Quasar 2.x) tem **4 props** — não 8. Todas as outras props listadas em versões anteriores deste pré-prompt eram invenção.

### Props Expostas

| Prop QVideo | Prop DSS | Tipo | Default | Observações |
|-------------|----------|------|---------|-------------|
| `src` | `src` | `String` | `undefined` | URL YouTube/Vimeo ou arquivo direto |
| `ratio` | `ratio` | `Number \| String` | `16/9` (número) | Aspect ratio. Default não-trivial: previne CLS |
| `title` | `title` | `String` | `undefined` | Título do iframe — WCAG 4.1.2 |
| — | `decorative` | `Boolean` | `false` | Extensão DSS: define `title=""` automaticamente |
| — | `radius` | `'none'\|'sm'\|'md'\|'lg'\|'full'` | `undefined` | Extensão DSS: border-radius via tokens |

### Props Avançadas via `$attrs` (não declarar na API DSS)

| Prop QVideo | Observação |
|-------------|------------|
| `fetchpriority` | `'auto'`, `'high'`, `'low'` — para iframes above the fold |

### Props Bloqueadas (não existem no QVideo)

| Prop | Motivo do bloqueio |
|------|--------------------|
| `autoplay` | Atributo do `<video>` HTML nativo, não prop do `QVideo` |
| `loop` | Atributo do `<video>` HTML nativo, não prop do `QVideo` |
| `controls` | Atributo do `<video>` HTML nativo, não prop do `QVideo` |
| `volume` | Atributo do `<video>` HTML nativo, não prop do `QVideo` |
| `muted` | Atributo do `<video>` HTML nativo, não prop do `QVideo` |
| `poster` | Atributo do `<video>` HTML nativo, não prop do `QVideo` |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Overlay sobre o vídeo (gradientes, legendas decorativas, call-to-actions) |

### Events

Nenhum. QVideo não emite eventos DSS. `defineEmits` deve ser **omitido** (anti-padrão para containers não-emissores — referência: DssPageSticky seal).

---

## 4. GOVERNANÇA DE TOKENS E CSS

### Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-radius-sm` | Variante `radius="sm"` |
| `--dss-radius-md` | Variante `radius="md"` |
| `--dss-radius-lg` | Variante `radius="lg"` |
| `--dss-radius-full` | Variante `radius="full"` (circular) |

### Tokens NÃO utilizados (e por quê)

| Token | Motivo da ausência |
|-------|--------------------|
| `--dss-surface-disabled` | Sem estado de loading/error (QVideo sem esses slots) |
| `--dss-text-subtle` | Sem ícone de erro (QVideo sem slot de erro) |
| `--dss-action-hub/water/waste` | Iframe é opaco ao DSS — brand theming N/A nesta fase |

### Tokens que NÃO existem no catálogo DSS (nunca usar)

- `--dss-action-hub-surface` — **NÃO EXISTE**
- `--dss-margin-lg` — **NÃO EXISTE**
- `--dss-duration-base` — **NÃO EXISTE**
- `--dss-surface-variant` — verificar catálogo antes de usar

### `_brands.scss`

Bloco intencionalmente vazio. O conteúdo de vídeo embarcado (iframe YouTube/Vimeo) é opaco ao DSS — cores de marca não alcançam o player nativo. Reservado para extensões futuras (ex: border decorativo por brand). Documentar com comentário explícito.

### `_states.scss`

`forced-color-adjust: proibido no DSS` (referência: DssTextarea e DssUploader seals). `border-radius` é propriedade geométrica — não afetada pelo modo `forced-colors`. Nenhum bloco `@media (forced-colors: active)` necessário.

---

## 5. ACESSIBILIDADE E ESTADOS

### Estados Aplicáveis

| Estado | Implementado | Motivo |
|--------|-------------|--------|
| `default` | ✅ | Vídeo carregado e exibido |
| `loading` | ❌ N/A | QVideo é iframe — não expõe slot `#loading` |
| `error` | ❌ N/A | QVideo não expõe slot de erro |
| `hover` | ❌ N/A | Container não interativo — responsabilidade do pai |
| `focus` | ❌ N/A | Não interativo diretamente |
| `active` | ❌ N/A | Container de mídia |
| `disabled` | ❌ N/A | Sem semântica de disable para mídia |

### Touch Target

N/A — componente não interativo. `::before` não deve ser implementado (reservado para touch target — WCAG 2.5.5). `::after` também não aplicável.

### WCAG

- **WCAG 4.1.2 (Nível A) — Name, Role, Value**: `title` obrigatório para iframes não-decorativos. Advertência em `import.meta.env?.DEV` se ausente sem `decorative=true`.
- **WCAG 1.2.2 (Nível A) — Captions**: Fora do escopo — responsabilidade do provider (YouTube/Vimeo) ou da `<track>` para arquivos diretos.
- **WCAG 1.2.1 — Apenas Vídeo**: `decorative=true` sinaliza ao leitor de tela que o iframe deve ser ignorado (sets `title=""`).

### Sistema `title` + `decorative` (análogo ao DssImg `alt` + `decorative`)

```typescript
// Lógica obrigatória na 1-structure
const computedTitle = computed<string>(() => {
  if (props.decorative === true) return ''
  if (props.title !== undefined) return props.title
  if (import.meta.env?.DEV) {
    console.warn('[DssVideo] O prop `title` é obrigatório para vídeos não-decorativos (WCAG 4.1.2).')
  }
  return ''
})
```

### Exceção Estrutural (EXC-Gate-01)

QVideo deve ser o root element direto — sem div wrapper intermediário. `$attrs` forwarded via `v-bind="$attrs"` no QVideo. Justificativa: QVideo já aplica `overflow:hidden` e `position:relative` internamente — necessários para clip de `border-radius` e aspect ratio padding trick.
