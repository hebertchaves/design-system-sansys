# DssImg — Documentação (Template 13.1)

## 1. Visão Geral

**O que é:** `DssImg` é um container de mídia governado sobre o `QImg` do Quasar. Ele gerencia o carregamento progressivo de imagens (lazy loading), estados de loading e erro com feedback visual consistente (DssSpinner e ícone `broken_image`), imagens de fallback, proporções controladas (aspect ratio) e border-radius via tokens DSS.

**Quando usar:**
- Imagens de produto, capa, avatar, banner ou conteúdo visual com volume indefinido ou conexão variável
- Quando precisar reservar espaço antes do carregamento para evitar CLS (Cumulative Layout Shift)
- Quando precisar de estado de erro visual consistente com a identidade DSS
- Quando precisar de border-radius controlado por tokens (thumbnails, avatares, banners arredondados)
- Dentro de `DssCard` como imagem de capa ou destaque

**Quando NÃO usar:**
- SVGs inline complexos que precisam de manipulação de CSS → use `DssIcon`
- Background images em containers complexos → use CSS nativo (`background-image`)
- Quando o elemento pai já garante lazy loading nativo e o estado de loading/error não é necessário
- Listas muito densas de imagens pequenas (> 100 elementos visíveis simultaneamente) → combinar com `DssVirtualScroll`

---

## 2. Classificação DSS

- **Tipo:** Container de mídia não interativo
- **Categoria:** Mídia e Visualização
- **Fase:** 2 — Nível 1
- **Família:** Mídia e Visualização
- **Interativo:** Não (imagem não tem interatividade própria; interação é responsabilidade do elemento pai)

---

## 3. API

### Props
*(ver DSSIMG_API.md — Seção Props)*

### Slots
*(ver DSSIMG_API.md — Seção Slots)*

### Events
*(ver DSSIMG_API.md — Seção Events)*

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Imagem carregada e exibida |
| loading | ✅ | DssSpinner via slot `#loading`; QImg gerencia visibilidade |
| error | ✅ | Ícone `broken_image` via DssIcon (slot `#error`); QImg exibe após falha de src e fallbackSrc |
| hover | ❌ N/A | Container de mídia não interativo — elemento pai assume |
| focus | ❌ N/A | Não interativo — foco é do elemento pai (link, botão) |
| active | ❌ N/A | Container de mídia |
| disabled | ❌ N/A | Sem semântica de disable para imagens — consumidor remove/oculta o elemento |

---

## 5. Comportamentos Implícitos

### inheritAttrs: false
`$attrs` (class extra, id, data-*, aria-* adicionais) são encaminhados via `v-bind="$attrs"` diretamente no `QImg`. O QImg é o root element efetivo — sem div wrapper intermediário.

**Atributos Quasar avançados via $attrs:** Props Quasar não declaradas na API DSS (ex: `srcset`, `sizes`, `img-class`, `img-style`, `no-native-menu`, `fetchpriority`) fluem via `$attrs` para o QImg. Funcionalidade avançada disponível para consumidores sem criar dependência na API DSS.

### QImg como root element
`QImg` é usado como root element do componente. Isso preserva o `overflow:hidden` nativo do QImg (necessário para o clip correto do `border-radius` aplicado via variantes) e o aspect ratio padding trick interno do Quasar — sem DOM desnecessário.

### alt + decorative: sistema dual
`alt` é obrigatório para imagens não-decorativas (WCAG 1.1.1 — Nível A).
- Se `decorative=true`: `alt=""` é aplicado automaticamente. Leitores de tela ignoram o elemento.
- Se `alt` for fornecido: valor usado diretamente no `<img>`.
- Em modo de desenvolvimento (`import.meta.env.DEV`): advertência no console se nenhum dos dois for fornecido.

### overflow:hidden e border-radius
`QImg` aplica `overflow:hidden` internamente (via classe Quasar `overflow-hidden !important`). Os modificadores `.dss-img--radius-*` adicionam `border-radius` ao mesmo elemento root. O clip ocorre corretamente sem redeclarar `overflow` no CSS DSS.

### Slot no-more dentro do slot loading/error
Os slots `#loading` e `#error` do `QImg` recebem os templates DSS. O QImg controla quando cada um é exibido baseado no estado interno de carregamento.

### aria-hidden nos estados visuais
Os containers `__loading` e `__error` têm `aria-hidden="true"`. O feedback acessível para leitores de tela é o `alt` text do `<img>` — quando a imagem falha, leitores de tela anunciam o alt text. Os indicadores visuais (spinner, ícone broken) são decorativos.

---

## 6. Paridade com Golden Reference (DssBadge)

| Aspecto | DssBadge | DssImg | Justificativa |
|---------|----------|--------|---------------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Idêntico |
| `inheritAttrs: false` + forwarding | ✅ | ✅ | Idêntico — forwarding para root |
| Touch target `::before` | ❌ N/A (não interativo) | ❌ N/A | Ambos não interativos — Opção B |
| `-webkit-tap-highlight-color` | ❌ N/A | ❌ N/A | Sem interatividade de tap |
| `disabled` via opacity | ✅ | ❌ N/A | DssImg sem estado disabled (sem semântica de disable para mídia) |
| Brand via `[data-brand]` descendant | ✅ | ✅ | Padrão DSS — descendant com espaço |
| Forwarding via `v-bind="$attrs"` | ✅ | ✅ | Idêntico |
| `withDefaults` só para não-triviais | ✅ | ✅ | `fit: 'cover'` e `loading: 'lazy'` |

---

## 7. Acessibilidade

- **WCAG 1.1.1 (Nível A) — Texto Alternativo**: `alt` obrigatório para imagens não-decorativas. Advertência em dev mode se ausente.
- **WCAG 1.1.1 — Imagens Decorativas**: `decorative=true` define `alt=""` automaticamente.
- **WCAG 1.4.5 (Nível AA) — Imagens de Texto**: `DssImg` não renderiza texto como imagem — fora do escopo.
- **Touch target**: N/A — componente não interativo.
- **ARIA loading**: `__loading` e `__error` com `aria-hidden="true"` — decorativos.
- **prefers-contrast: more**: ícone de erro usa `currentColor` para contraste máximo.
- **forced-colors: active**: `CanvasText` para ícone, `Canvas` para fundo.
- **print**: estado loading oculto; conteúdo e estado de erro visíveis.
- **CLS (Core Web Vital)**: uso de `ratio` reserva espaço antes do carregamento — elimina layout shifts.

---

## 8. Tokens Utilizados

| Token | Valor | Uso no SCSS |
|-------|-------|-------------|
| `--dss-surface-disabled` | — | Fundo dos containers `__loading` e `__error` |
| `--dss-text-subtle` | — | Cor do ícone de erro (estado padrão, sem brand) |
| `--dss-radius-sm` | — | Variante `radius="sm"` |
| `--dss-radius-md` | — | Variante `radius="md"` |
| `--dss-radius-lg` | — | Variante `radius="lg"` |
| `--dss-radius-full` | — | Variante `radius="full"` (circular) |
| `--dss-action-hub` | — | Cor do ícone de erro em brand hub |
| `--dss-action-water` | — | Cor do ícone de erro em brand water |
| `--dss-action-waste` | — | Cor do ícone de erro em brand waste |

---

## 9. Exceções Registradas

### EXC-Gate-01 — QImg como root element direto
`QImg` é usado como root element do componente. `$attrs` são forwarded via `v-bind="$attrs"` no próprio `QImg`, sem div wrapper intermediário. Justificativa: evita DOM desnecessário, preserva o `overflow:hidden` do QImg necessário para o clip de `border-radius` e o aspect ratio padding trick interno do Quasar. Localização: `1-structure/DssImg.ts.vue`.

---

## 10. Composição e Matriz DSS

### Papel estrutural
`DssImg` é um container de mídia — gerencia apresentação de imagem com estados de loading/error e variantes de forma. Não renderiza conteúdo próprio além dos indicadores de estado.

### Componentes DSS internos

| Componente | Função | Status |
|-----------|--------|--------|
| `DssSpinner` | Loading indicator (default no slot #loading) | ✅ Fase 1 |
| `DssIcon` | Ícone de erro broken_image (default no slot #error) | ✅ Fase 1 |

### Componentes DSS recomendados (externos)

| Componente | Função | Status |
|-----------|--------|--------|
| `DssCard` | Container estrutural ao envolver DssImg (produto, post) | ✅ Fase 2 |
| `DssInfiniteScroll` | Carregamento incremental de listas de imagens | ✅ Fase 2 |
| `DssVirtualScroll` | Virtualização para grids de muitas imagens (> 10k) | ✅ Fase 2 |

### Anti-patterns de composição
- **Não usar `<img>` nativo** onde `DssImg` está disponível — perde lazy loading e estado de erro
- **Não usar junto com `DssVirtualScroll` sem planejamento** de key e tamanho de item — o placeholder de loading pode interferir na estimativa de altura virtual
- **Não usar como background** para containers complexos — use CSS `background-image` nativo
- **Não omitir `alt` sem `decorative=true`** — viola WCAG 1.1.1

---

## 11. Governança e Extensão

### Extensões previstas no roadmap
- **Prop `srcset` / `sizes`**: exposição explícita na API DSS para imagens responsivas (Fase 3)
- **Prop `transitionDuration`**: controle via `--dss-duration-*` da duração do fade-in do QImg (Fase 3)
- **Prop `errorLabel`**: i18n do estado de erro para leitores de tela (Fase 3)

### Extensões explicitamente fora do escopo
- SVGs inline com manipulação de CSS: responsabilidade do `DssIcon`
- Background images em containers complexos: CSS nativo
- Reprodução de vídeo: responsabilidade do `DssVideo`

---

## 12. Referências

- [Quasar QImg](https://quasar.dev/vue-components/img)
- [DssCard](../DssCard/DssCard.md) — container estrutural recomendado
- [DssSpinner](../DssSpinner/DssSpinner.md) — loading indicator padrão
- [DssIcon](../DssIcon/DssIcon.md) — ícone de erro padrão
- [DSSIMG_API.md](./DSSIMG_API.md) — referência técnica completa
- [WCAG 1.1.1 — Non-text Content](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)

---

## 13. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-13 | Claude (DSS Agent) | Criação inicial — wrapper QImg, 3 slots, lazy loading, 5 radius variants, estados loading/error, 6 cenários de exemplo |
