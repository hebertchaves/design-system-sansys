# DssCarousel — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssCarousel` é um componente de navegação de slides para exibir múltiplos itens ou conteúdos em sequência dentro de um espaço delimitado. Permite que o usuário navegue por slides de forma manual (setas, pontos de paginação, swipe) ou automática (autoplay).

**Quando usar:**
- Galerias de imagens com navegação
- Destaques rotativos na página inicial (hero banners)
- Depoimentos ou cases em sequência
- Apresentação de múltiplos itens de conteúdo quando o espaço vertical é limitado
- Onboarding com passos sequenciais em mobile

**Quando NÃO usar:**
- Para mostrar todos os itens simultaneamente → use `DssList` ou grid
- Para conteúdo que o usuário deve comparar lado a lado → use layout em colunas
- Quando o número de slides for maior que 8–10 (prejudica usabilidade)
- Para navegação estrutural entre seções da página → use `DssTabs`
- Quando o conteúdo é crítico e não pode ser ignorado → evite autoplay

---

## 2. Classificação DSS

- **Tipo:** Componente de exibição interativo com navegação
- **Categoria:** Conteúdo Rico
- **Fase:** 2 — Nível 2 (Composição de Primeiro Grau)
- **Interativo:** sim (navegação por teclado, setas, paginação, swipe)
- **Motor Quasar:** `QCarousel` + `QCarouselSlide` (EXC-Gate-01)
- **Sub-componente:** `DssCarouselSlide`

---

## 3. API

*(ver [DSSCAROUSEL_API.md](./DSSCAROUSEL_API.md))*

---

## 4. Estados

| Estado | Implementado | Localização | Observação |
|--------|-------------|-------------|------------|
| hover | ✅ | Setas e dots (via QBtn interno) | Overlay `.q-focus-helper` nas setas |
| focus | ✅ | Setas e dots (via QBtn interno) | Herda foco DSS global de DssButton |
| active | ✅ | Setas e dots (via QBtn interno) | Ripple nativo do QBtn |
| disabled | — | N/A | Container não possui estado disable; slides individuais têm `disable` prop |
| loading | — | N/A | Use `DssInnerLoading` externamente |
| error | — | N/A | Carousel é container de apresentação |

---

## 5. Tokens Utilizados

*(ver [DSSCAROUSEL_API.md — Tokens](./DSSCAROUSEL_API.md#tokens-utilizados))*

---

## 6. Acessibilidade

- **WCAG 2.1 AA:** Implementado
- **Touch target:** N/A para o container — setas e pontos herdam touch target do DssButton (QBtn global)
- **ARIA:**
  - `role="region"` no container do carousel — landmark de conteúdo navegável
  - `aria-label` recomendado via prop `ariaLabel` — descreve o carousel para leitores de tela
  - `role="group"` nos slides (`DssCarouselSlide`) — agrupa conteúdo de cada slide
- **Navegação por teclado:**
  - `Tab` → foca nos controles de navegação (setas e pontos)
  - `Enter` / `Space` → ativa o controle focado
  - Setas do teclado → navegação entre pontos de paginação (comportamento nativo do QCarousel)
- **Prefers-Reduced-Motion:** Transições de slide desabilitadas via CSS (`EXC-States-01`)
- **Forced-Colors:** Controles com valores SystemColor (`EXC-States-02`)
- **Aviso de acessibilidade (autoplay):**
  - WCAG 2.2.2 — Content that Moves: carousel com autoplay DEVE ter mecanismo de pausa.
  - O Quasar não fornece botão de pausa nativo. Para conformidade WCAG 2.2.2 com autoplay, o consumidor DEVE adicionar um botão de pausa via `QCarouselControl` no slot default.
  - O `DssCarousel` com `autoplay` sem botão de pausa é um **GAP documentado** (Fase 3).

---

## 7. Comportamentos Implícitos

### inheritAttrs: false
→ `$attrs` é repassado ao `QCarousel` via `v-bind="$attrs"`. Atributos HTML extras (class, style, aria-*, data-*) são aplicados ao elemento root do carousel.

### Motor QCarousel como root
→ O `QCarousel` é o elemento root do `DssCarousel`. Não há wrapper div externo. Isso preserva a semântica e evita nesting desnecessário.

### role="region" fixo
→ O `role="region"` é aplicado via template e tem precedência sobre `$attrs`. É obrigatório para conformidade WAI-ARIA Carousel Pattern. Não deve ser sobrescrito.

### control-color="primary" bloqueado
→ `control-color="primary"` é passado internamente ao QCarousel. A cor real é governada via `--q-color-primary` CSS override. Consumidores NÃO devem passar `control-color` — será ignorado.

### Transições desabilitadas em prefers-reduced-motion
→ As classes Vue `.q-transition--*` têm `transition-duration: 0` e `animation-duration: 0` quando o usuário prefere movimento reduzido. O Quasar não respeita essa preferência nativamente.

### Thumbnails com opacidade diferenciada
→ Miniaturas inativas têm `opacity: 0.6` e a ativa tem `opacity: 1`. Isso é um desvio visual (não token de opacidade) documentado como `EX-Structural-01`.

---

## 8. Paridade com Golden Component (DssBottomSheet)

| Característica | DssBottomSheet | DssCarousel | Justificativa da divergência |
|----------------|---------------|-------------|------------------------------|
| Motor Quasar como root | QDialog | QCarousel | Cada um tem seu motor apropriado |
| EXC-Gate-01 declarado | ✅ | ✅ | Obrigatório |
| inheritAttrs: false + $attrs | ✅ | ✅ | Idêntico |
| defineOptions({ name, inheritAttrs }) | ✅ | ✅ | Idêntico |
| Slots estruturais documentados | ✅ | ✅ | Apenas default (slides são sub-componentes) |
| Props bloqueadas documentadas | ✅ | ✅ | dark, control-color, control-text-color |
| Touch target N/A | ✅ | ✅ | Ambos são containers |
| Estilos globais (não scoped) | ✅ | ✅ | QCarousel teleporta em fullscreen — global obrigatório |
| role ARIA explícito | `role` via QDialog | `role="region"` | Cada componente tem seu landmark adequado |
| Transições prefers-reduced-motion | N/A (via prop) | CSS override | QCarousel não expõe prop para desabilitar animação |
| Sub-componente incluso | — | DssCarouselSlide | Carousel precisa de sub-componente de slide |

---

## 9. Matriz de Composição DSS

### Papel Estrutural
`DssCarousel` é um **container de navegação sequencial**. Ele fornece:
- Estrutura de slides com transições
- Controles de navegação (setas, pontos, thumbnails)
- Gestos de swipe em dispositivos touch
- Semântica ARIA de região de conteúdo navegável

### Composição Recomendada

```
DssCarousel
├── DssCarouselSlide (name="slide1")
│   ├── DssImg (para imagens com acessibilidade)
│   ├── DssCard (para conteúdo rico)
│   └── [qualquer markup]
└── QCarouselControl (para controles customizados)
    └── DssButton (botão de pausa p/ WCAG 2.2.2)
```

### Anti-Patterns de Composição

```vue
<!-- ❌ HTML nativo em vez de DssCarouselSlide -->
<DssCarousel v-model="slide">
  <q-carousel-slide name="s1">...</q-carousel-slide>
</DssCarousel>

<!-- ✅ DssCarouselSlide -->
<DssCarousel v-model="slide">
  <DssCarouselSlide name="s1">...</DssCarouselSlide>
</DssCarousel>

<!-- ❌ Passar control-color manualmente -->
<DssCarousel control-color="accent" />

<!-- ✅ Usar brand via data-brand -->
<div data-brand="hub">
  <DssCarousel v-model="slide" />
</div>

<!-- ❌ Carousel sem aria-label (risco de acessibilidade) -->
<DssCarousel v-model="slide" navigation />

<!-- ✅ Sempre fornecer aria-label -->
<DssCarousel v-model="slide" navigation aria-label="Galeria de produtos" />
```

### Limites de Responsabilidade

| Responsabilidade | DssCarousel | Consumidor |
|-----------------|-------------|------------|
| Estrutura de slides | ✅ | — |
| Transições e gestos | ✅ (via QCarousel) | — |
| Controles de navegação básicos | ✅ (via props) | — |
| Botão de pausa (WCAG 2.2.2) | — | ✅ via QCarouselControl |
| Conteúdo dos slides | — | ✅ via DssCarouselSlide |
| aria-label do carousel | ✅ (default genérico) | ✅ DEVE personalizar |
| aria-label dos slides individuais | — | ✅ via $attrs no DssCarouselSlide |

---

## 10. Exceções Registradas

| ID | Tipo | Local | Justificativa |
|----|------|-------|---------------|
| EXC-Gate-01 | Motor Quasar | 1-structure/ | QCarousel/QCarouselSlide são infraestrutura insubstituível |
| EXC-Gate-02a | CSS Custom Property | 2-composition/_base.scss | --q-color-primary override (padrão DssPagination) |
| EXC-Gate-02b | Descendant Selector | 2-composition/_base.scss | Dots inativos sem CSS hook nativo no QCarousel |
| EXC-Gate-02c | Descendant Selector | 2-composition/_base.scss | q-focus-helper das setas |
| EXC-States-01 | Prefers-Reduced-Motion | 4-output/_states.scss | Classes Vue transition do QCarousel não respeitam prefers-reduced-motion nativamente |
| EXC-States-02 | Forced Colors | 4-output/_states.scss | SystemColor keywords para controles em forced-colors |

---

## 11. Gaps e Roadmap

| Gap | Impacto | Prioridade | Fase |
|-----|---------|------------|------|
| GAP-01: Botão de pausa para autoplay (WCAG 2.2.2) | Alto (acessibilidade) | Alta | Fase 3 |
| GAP-02: DssCarouselControl como sub-componente DSS | Médio (padronização) | Média | Fase 3 |
| GAP-03: aria-live region para anúncio de mudança de slide | Alto (acessibilidade screen reader) | Alta | Fase 3 |
| GAP-04: prop `thumbnailSize` para tamanho das miniaturas | Baixo | Baixa | Fase 3 |

---

## 12. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-21 | DSS Team | Criação inicial — DssCarousel + DssCarouselSlide |
