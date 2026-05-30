# DssVideo — Documentação (Template 13.1)

## 1. Visão Geral

**O que é:** `DssVideo` é um container de mídia governado sobre o `QVideo` do Quasar. Ele gerencia o embed responsivo de vídeos (YouTube, Vimeo, arquivos diretos) com aspect ratio controlado e border-radius via tokens DSS.

**Quando usar:**
- Vídeos de produto, tutorial, apresentação ou conteúdo editorial
- Quando precisar reservar espaço antes do carregamento para evitar CLS (Cumulative Layout Shift)
- Quando precisar de border-radius controlado por tokens (destaque em cards, modais, banners)
- Dentro de `DssCard` como vídeo de capa ou destaque

**Quando NÃO usar:**
- Players com controles customizados (play, pause, volume, progress bar) → solução standalone fora do escopo do `QVideo`
- Vídeos de fundo em containers complexos → CSS nativo (`background-video` pattern)
- SVGs animados → use `DssIcon`
- Streamings protegidos por DRM → solução especializada fora do escopo do DSS

---

## 2. Classificação DSS

- **Tipo:** Container de mídia não interativo
- **Categoria:** Mídia e Visualização
- **Fase:** 2 — Nível 1
- **Família:** Mídia e Visualização
- **Interativo:** Não (controles de vídeo são internos ao iframe; interação é responsabilidade do player nativo ou do elemento pai)

---

## 3. API

### Props
*(ver DSSVIDEO_API.md — Seção Props)*

### Slots
*(ver DSSVIDEO_API.md — Seção Slots)*

### Events
*(ver DSSVIDEO_API.md — Seção Events)*

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Vídeo carregado e exibido |
| loading | ❌ N/A | QVideo é um iframe — não expõe slot `#loading` controlável pelo DSS. Estado de loading é interno ao browser/player. |
| error | ❌ N/A | QVideo não expõe slot de erro. Falhas são gerenciadas internamente pelo iframe. |
| hover | ❌ N/A | Container de mídia não interativo — elemento pai assume |
| focus | ❌ N/A | Não interativo diretamente — foco é do elemento pai (link, botão) |
| active | ❌ N/A | Container de mídia |
| disabled | ❌ N/A | Sem semântica de disable para vídeos — consumidor remove/oculta o elemento |

---

## 5. Comportamentos Implícitos

### inheritAttrs: false
`$attrs` (class extra, id, data-*, aria-* adicionais) são encaminhados via `v-bind="$attrs"` diretamente no `QVideo`. O QVideo é o root element efetivo — sem div wrapper intermediário.

**Atributos Quasar avançados via $attrs:** Props Quasar não declaradas na API DSS (ex: `fetchpriority`) fluem via `$attrs` para o QVideo. Funcionalidade avançada disponível para consumidores sem criar dependência na API DSS.

### QVideo como root element
`QVideo` é usado como root element do componente. O QVideo renderiza como `<div>` com `position:relative` e `overflow:hidden` aplicados internamente — o clip de `border-radius` funciona corretamente sem redeclaração de `overflow` no CSS DSS.

### title + decorative: sistema dual
`title` é obrigatório para vídeos não-decorativos (WCAG 4.1.2 — Name, Role, Value). O atributo `title` no iframe comunica o propósito do conteúdo para leitores de tela.
- Se `decorative=true`: `title=""` é aplicado automaticamente. Leitores de tela ignoram o elemento.
- Se `title` for fornecido: valor usado diretamente no iframe.
- Em modo de desenvolvimento (`import.meta.env.DEV`): advertência no console se nenhum dos dois for fornecido.

### Aspect ratio
A prop `ratio` (default: `'16/9'`) é passada diretamente ao QVideo. O QVideo aplica internamente o padding-trick para reservar o espaço do container antes do iframe carregar — elimina CLS (Cumulative Layout Shift).

### overflow:hidden e border-radius
`QVideo` aplica `overflow:hidden` e `position:relative` internamente. Os modificadores `.dss-video--radius-*` adicionam `border-radius` ao mesmo elemento root. O clip ocorre corretamente sem redeclarar `overflow` no CSS DSS.

### Slot default para overlay
O slot `default` é renderizado dentro do container do QVideo, sobre o iframe. Útil para gradientes decorativos, legendas ou call-to-actions sobrepostos.

---

## 6. Paridade com Golden Reference (DssBadge) e Golden Context (DssImg)

| Aspecto | DssBadge | DssImg | DssVideo | Justificativa |
|---------|----------|--------|----------|---------------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | ✅ | Idêntico |
| `inheritAttrs: false` + forwarding | ✅ | ✅ | ✅ | Idêntico — forwarding para root |
| Touch target `::before` | ❌ N/A | ❌ N/A | ❌ N/A | Todos não interativos — Opção B |
| `disabled` via opacity | ✅ | ❌ N/A | ❌ N/A | DssVideo sem estado disabled |
| Brand via `[data-brand]` descendant | ✅ | ✅ | ❌ N/A (Fase 3) | Player iframe opaco ao DSS |
| Forwarding via `v-bind="$attrs"` | ✅ | ✅ | ✅ | Idêntico |
| Radius variants | ❌ N/A | ✅ | ✅ | Padrão Mídia e Visualização |
| Loading/error slots | ❌ N/A | ✅ | ❌ N/A | QVideo sem slots; QImg tem |

---

## 7. Acessibilidade

- **WCAG 4.1.2 (Nível A) — Nome, Função, Valor**: `title` obrigatório para iframes não-decorativos. Advertência em dev mode se ausente.
- **WCAG 1.2.2 (Nível A) — Legendas (gravadas)**: `DssVideo` não controla legendas — responsabilidade do provider (YouTube, Vimeo) ou da `<track>` para arquivos diretos.
- **WCAG 1.2.5 (Nível AA) — Audiodescrição**: Fora do escopo — responsabilidade do conteúdo de vídeo.
- **WCAG 1.2.1 (Nível A) — Apenas Áudio e Apenas Vídeo**: Conteúdo decorativo (`decorative=true`) é ignorado por leitores de tela.
- **Touch target**: N/A — componente não interativo.
- **Navegação por teclado**: O foco pode entrar no iframe pelo Tab nativo do browser; os controles internos do player (YouTube, Vimeo) são acessíveis pelo player nativo.
- **CLS (Core Web Vital)**: uso de `ratio` reserva espaço antes do carregamento — elimina layout shifts.

---

## 8. Tokens Utilizados

| Token | Valor | Uso no SCSS |
|-------|-------|-------------|
| `--dss-radius-sm` | — | Variante `radius="sm"` |
| `--dss-radius-md` | — | Variante `radius="md"` |
| `--dss-radius-lg` | — | Variante `radius="lg"` |
| `--dss-radius-full` | — | Variante `radius="full"` (circular) |

---

## 9. Exceções Registradas

### EXC-Gate-01 — QVideo como root element direto
`QVideo` é usado como root element do componente. `$attrs` são forwarded via `v-bind="$attrs"` no próprio `QVideo`, sem div wrapper intermediário. Justificativa: evita DOM desnecessário, preserva o `overflow:hidden` e `position:relative` do QVideo necessários para o clip de `border-radius` e o aspect ratio padding trick interno do Quasar. Localização: `1-structure/DssVideo.ts.vue`.

---

## 10. Composição e Matriz DSS

### Papel estrutural
`DssVideo` é um container de mídia — gerencia apresentação responsiva de vídeo embarcado com controle de aspect ratio e variantes de forma. Não renderiza conteúdo próprio além do iframe nativo.

### Componentes DSS recomendados (externos)

| Componente | Função | Status |
|-----------|--------|--------|
| `DssCard` | Container estrutural ao envolver DssVideo (produto, post) | ✅ Fase 2 |
| `DssImg` | Alternativa para imagens estáticas na mesma família | ✅ Fase 2 |

### Anti-patterns de composição
- **Não usar `<video>` nativo** onde `DssVideo` está disponível — perde o aspect ratio responsivo DSS
- **Não omitir `title` sem `decorative=true`** — viola WCAG 4.1.2
- **Não usar como background** para containers complexos — use CSS nativo

---

## 11. Governança e Extensão

### Extensões previstas no roadmap
- **Brand theming**: sobreposição de cor por brand no slot default (overlay) — Fase 3
- **Prop `autoplay` / `muted`**: controle de reprodução automática silent — Fase 3 (requer wrapper sobre `<video>` nativo, fora do escopo do QVideo atual)
- **Slot `#poster`**: imagem de capa antes do carregamento do iframe — Fase 3

### Extensões explicitamente fora do escopo
- Players customizados com controles DSS: requerem componente separado (`DssVideoPlayer`)
- DRM e streaming protegido: solução especializada externa ao DSS
- Vídeos de fundo: CSS nativo (`background-video` pattern)

---

## 12. Referências

- [Quasar QVideo](https://quasar.dev/vue-components/video)
- [DssCard](../DssCard/DssCard.md) — container estrutural recomendado
- [DssImg](../DssImg/DssImg.md) — Golden Context (mesma família de mídia)
- [DSSVIDEO_API.md](./DSSVIDEO_API.md) — referência técnica completa
- [WCAG 4.1.2 — Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
- [WCAG 1.2.2 — Captions (Prerecorded)](https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html)

---

## 13. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-13 | Claude (DSS Agent) | Criação inicial — wrapper QVideo, slot default para overlay, 4 radius variants, sistema title/decorative, 5 cenários de exemplo |
| 1.0.1 | 2026-05-13 | Claude (DSS Agent) | Correções pós-auditoria ciclo 1: NC-01 `forced-color-adjust` removido de `_states.scss`; NC-02 default `ratio` corrigido de string `'16/9'` para número `16/9` (≈ 1.778); pré-prompt reescrito (GAP-01 a GAP-04) |
