# DssExpansionItem — Documentação Normativa

> **Template 13.1 — Componente DSS v2.2**  
> **Família:** Expansão e Colapso | **Fase:** 2 | **Nível:** 2  
> **Status:** Em andamento  
> **Golden Reference:** DssChip | **Golden Context:** DssItem

---

## 1. Identidade do Componente

**Nome:** DssExpansionItem  
**CSS Class:** `.dss-expansion-item`  
**Quasar base:** `QExpansionItem`

### O que é

DssExpansionItem é um item com header interativo e painel colapsável do Design System Sansys. Envolve o `QExpansionItem` do Quasar com governança de tokens DSS, touch target WCAG e brandabilidade.

### Quando usar

- Para revelar conteúdo secundário sob demanda (FAQ, configurações avançadas, seções opcionais)
- Quando há informações relevantes mas não críticas que podem ser omitidas por padrão
- Em contextos onde o espaço vertical é limitado e o conteúdo pode ser progressivamente revelado
- Para accordion (múltiplos itens exclusivos) via prop `group`

### Quando NÃO usar

- Para conteúdo sempre crítico — use layout fixo
- Para navegação principal — use `DssTabs` ou `DssDrawer`
- Para dialogs ou confirmações — use `DssDialog` (futuro)
- Quando o painel contiver formulários complexos com validação — prefira modals
- Mais de 7 itens em sequência — considere paginação ou filtros

---

## 2. Arquitetura

### Decisão: WRAP (não rebuild)

O DssExpansionItem envolve o `QExpansionItem` ao invés de reconstruir do zero.

**Justificativa:**
- `QExpansionItem` fornece animação de altura com transição nativa (sem bugs de clip)
- Acessibilidade WAI-ARIA gerenciada pelo Quasar (`aria-expanded`, `aria-controls`)
- Comportamento de accordion via `group` sem reimplementação
- Navegação por teclado (`Tab`, `Enter`, `Space`) nativa

**Estrutura DOM resultante:**
```html
<div class="dss-expansion-item [modificadores]">         <!-- wrapper DSS -->
  <div class="dss-expansion-item__qexpansion q-expansion-item">
    <div class="q-expansion-item__container">
      <div role="button" class="q-item ...">            <!-- gate exception -->
        <!-- ícone, label, caption, expand icon -->
      </div>
      <div class="q-expansion-item__content">           <!-- gate exception -->
        <!-- slot default -->
      </div>
    </div>
  </div>
</div>
```

### Touch Target — Opção A

O DssExpansionItem adota a **Opção A** do DSS para touch target (WCAG 2.5.5):

| Abordagem | Quando usar | DssExpansionItem |
|-----------|-------------|-----------------|
| Opção A | Tamanho visual ≥ 44px | ✅ (padrão: 48px, dense: 44px) |
| Opção B | Tamanho visual < 44px → `::before` | ❌ |

O header (`.q-item`) tem `min-height: --dss-spacing-12` (48px) por padrão. No modo `dense`, `min-height: --dss-touch-target-md` (44px) — mínimo WCAG mantido.

---

## 3. Props

### Expostas (governadas pelo DSS)

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `label` | `string` | — | Texto principal do header |
| `caption` | `string` | — | Texto secundário do header |
| `icon` | `string` | — | Ícone Material Icons à esquerda |
| `expandIcon` | `string` | `'expand_more'` | Ícone de expansão (à direita) |
| `modelValue` | `boolean` | — | Estado controlado (v-model) |
| `defaultOpened` | `boolean` | — | Estado inicial aberto (não controlado) |
| `group` | `string` | — | Grupo accordion |
| `disable` | `boolean` | `false` | Estado desabilitado |
| `dense` | `boolean` | `false` | Variante de alta densidade |
| `brand` | `ExpansionItemBrand\|null` | `null` | Acento de marca |
| `ariaLabel` | `string` | — | Label acessível do botão toggle |

### Bloqueadas (QExpansionItem API)

| Prop | Justificativa |
|------|---------------|
| `dark` | DSS gerencia dark mode via CSS global |
| `headerClass` | Header estritamente governado pelo DSS |
| `headerStyle` | Header estritamente governado pelo DSS |
| `switchToggleSide` | Ícone de expansão sempre à direita (padrão DSS) |

---

## 4. Estados

### Hierarquia de estados DSS

`disabled` > `expanded` > `active` > `hover` > `focus` > `default`

### Implementação

| Estado | Mecanismo | Comportamento |
|--------|-----------|---------------|
| `default` | — | Background transparente, ícone `--dss-text-subtle` |
| `hover` | `:hover:not(.disabled)` no `.q-item` | `--dss-surface-hover` no header |
| `focus` | `:focus-visible` no `.q-item` | `--dss-focus-ring` + `outline-offset: -2px` |
| `active` | `:active:not(.disabled)` no `.q-item` | `--dss-surface-active` no header |
| `expanded` | `.q-expansion-item--expanded` (Quasar) | `--dss-surface-subtle` no header, ícone rotacionado |
| `expanded+hover` | combinação | `--dss-surface-muted` no header |
| `disabled` | `.dss-expansion-item--disabled` | Opacidade 0.4, pointer-events none |

### Estados não aplicáveis

| Estado | Justificativa |
|--------|---------------|
| `loading` | ExpansionItem não executa operações assíncronas |
| `error` | Validação não é responsabilidade do ExpansionItem |
| `indeterminate` | Estado binário (aberto/fechado) — sem indeterminado |

### Dark Mode (EXC-States-02)

```scss
[data-theme="dark"] {
  .dss-expansion-item .q-item:focus-visible {
    outline: 2px solid white; /* EXC-States-02 */
  }
}
```

**Justificativa:** Token `--dss-focus-ring-dark` não existe no catálogo DSS v2.2. Padrão idêntico ao DssFab, DssFabAction (selados Mai 2026).

---

## 5. Brandabilidade

### Mecanismo

Acento de marca via `border-left` no header quando expandido. O acento aparece **apenas no estado expandido** — sem brand no estado colapsado.

### Aplicação

```vue
<!-- Via prop brand no DssExpansionItem -->
<DssExpansionItem label="Módulo Hub" brand="hub">
  <!-- conteúdo -->
</DssExpansionItem>

<!-- Via data-brand no container pai -->
<div data-brand="hub">
  <DssExpansionItem label="Item Hub" brand="hub">
    <!-- conteúdo -->
  </DssExpansionItem>
</div>
```

### Tokens de Brand (por marca)

| Marca | Light | Dark |
|-------|-------|------|
| Hub | `--dss-hub-600` | `--dss-hub-400` |
| Water | `--dss-water-500` | `--dss-water-400` |
| Waste | `--dss-waste-600` | `--dss-waste-500` |

---

## 6. Acessibilidade

### WCAG 2.5.5 — Touch Target

- **Requisito:** Área tocável mínima 44×44px
- **Implementação:** Header (`min-height`) — Opção A
- **Padrão:** `--dss-spacing-12` (48px)
- **Dense:** `--dss-touch-target-md` (44px) — mínimo mantido

### WCAG 2.4.7 — Focus Visível

- **Light mode:** `--dss-focus-ring` via `outline` com `outline-offset: -2px`
- **Dark mode:** `outline: 2px solid white` (EXC-States-02)

### Navegação por Teclado

Gerenciada pelo `QExpansionItem` nativo:
- `Tab` — navega para o header
- `Enter` / `Space` — alterna estado de expansão
- Quando accordion (`group`) está ativo — fechar outros é automático

### Screen Readers

- `aria-expanded` gerenciado automaticamente pelo Quasar
- `aria-controls` apontando para o painel de conteúdo — gerenciado pelo Quasar
- `aria-label` disponível via prop `ariaLabel` → mapeada para `header-aria-label` do QExpansionItem
- **Recomendação:** Sempre fornecer `ariaLabel` quando o `label` não for suficientemente descritivo no contexto

### ⚠️ Comportamento de `$attrs` — ARIA Attributes

O componente usa `inheritAttrs: false` com `v-bind="$attrs"` no `<div>` wrapper externo.

**Consequência:** atributos ARIA passados diretamente pelo consumidor (ex.: `aria-labelledby`, `aria-describedby`) serão aplicados ao `<div>` wrapper (role implícito: `none`), **não** ao `<button>` interno renderizado pelo QExpansionItem.

```vue
<!-- ❌ Risco: aria-labelledby vai para o <div>, não para o <button> -->
<DssExpansionItem aria-labelledby="external-label" label="..." />

<!-- ✅ Correto: usar a prop ariaLabel -->
<DssExpansionItem aria-label="Expandir seção de configurações" label="Configurações" />
```

**Regra:** Use **sempre a prop `ariaLabel`** para rotular DssExpansionItems acessivelmente. Este comportamento é herdado da arquitetura wrapper DSS (DssFab, DssFabAction — selados Mai 2026).

---

## 7. Gate de Composição v2.4

### Exceções documentadas

Os seletores abaixo acessam elementos DOM internos do QExpansionItem (Quasar Framework), **não** subcomponentes DSS. O Gate de Composição v2.4 aplica-se exclusivamente a componentes DSS filhos.

| Seletor | Tipo | Justificativa |
|---------|------|---------------|
| `.dss-expansion-item .q-item` | Quasar internal | Tipografia, layout, hover, focus e active do header |
| `.dss-expansion-item .q-expansion-item__content` | Quasar internal | Painel de conteúdo — override de overflow futuro |
| `.dss-expansion-item .q-expansion-item__toggle-icon` | Quasar internal | Transição de rotação com token DSS |
| `.dss-expansion-item .q-expansion-item--expanded` | Quasar internal | Expanded state e brandabilidade |

**Precedente:** DssFab `gateExceptions → .q-fab__trigger` (selado Mai 2026).

---

## 8. Variantes

### Standard (padrão)

Header com padding `--dss-spacing-3` vertical × `--dss-spacing-4` horizontal. `min-height: --dss-spacing-12` (48px).

```vue
<DssExpansionItem label="Pergunta" aria-label="Expandir: Pergunta">
  <p>Resposta detalhada.</p>
</DssExpansionItem>
```

### Dense

Header com padding `--dss-spacing-1_5` vertical. `min-height: --dss-touch-target-md` (44px).

```vue
<DssExpansionItem dense label="Item compacto" aria-label="Expandir: Item compacto">
  <p>Conteúdo em contexto de alta densidade.</p>
</DssExpansionItem>
```

### Com Slot Header

Override completo do header — props label/caption/icon/expandIcon ignoradas quando slot `#header` é usado.

```vue
<DssExpansionItem aria-label="Item com header customizado">
  <template #header>
    <div class="custom-header">
      <DssItemLabel>Label customizado</DssItemLabel>
    </div>
  </template>
  <p>Conteúdo do painel.</p>
</DssExpansionItem>
```

---

## 9. Composição com outros componentes

### DssExpansionItem como filho de DssList

```vue
<DssList>
  <DssExpansionItem label="Seção 1" aria-label="Expandir: Seção 1">
    <DssItem label="Sub-item 1.1" clickable />
    <DssItem label="Sub-item 1.2" clickable />
  </DssExpansionItem>
  <DssExpansionItem label="Seção 2" aria-label="Expandir: Seção 2">
    <DssItem label="Sub-item 2.1" clickable />
  </DssExpansionItem>
</DssList>
```

### Responsabilidades

| Responsabilidade | DssExpansionItem | Componente Pai |
|-----------------|-----------------|---------------|
| Estado de expansão | ✅ | ❌ (a menos que use v-model) |
| Comportamento accordion | Via prop `group` | ✅ (group binding) |
| Posicionamento | ❌ | ✅ (DssList, layout, etc.) |
| Conteúdo do painel | ❌ (slot) | ✅ (consumidor) |
| Separadores entre itens | ❌ | ✅ (DssSeparator ou border no container) |

---

## 10. Paridade com Golden Context (DssItem)

| Aspecto | DssItem | DssExpansionItem | Justificativa da divergência |
|---------|---------|-----------------|------------------------------|
| Tipografia do header | `--dss-font-size-md`, `--dss-font-weight-normal` | ✅ Idêntico | Mesma escala de lista |
| Padding do header | `--dss-spacing-3` × `--dss-spacing-4` | ✅ Idêntico | Consistência visual |
| min-height | `--dss-spacing-12` | ✅ Idêntico | Touch target Opção A |
| Hover overlay | `--dss-surface-hover` | ✅ Idêntico | Mesma UX pattern |
| Focus ring | `--dss-focus-ring` | ✅ Idêntico | WCAG 2.4.7 |
| Active state | `--dss-surface-active` | ✅ Idêntico | Feedback tátil |
| Disabled opacity | `--dss-opacity-disabled` | ✅ Idêntico | Token canônico DSS |
| `-webkit-tap-highlight-color` | `transparent` | ✅ Idêntico | Prevenção mobile |
| Gerenciamento de estado interno | ✅ (clickable prop) | ❌ Delegado ao Quasar | QExpansionItem gerencia internamente |
| ARIA (expanded, controls) | ❌ Manual | ✅ Quasar nativo | Benefício da arquitetura WRAP |

---

## 11. Reservas Técnicas

1. **Brand tokens numéricos** — tokens semânticos de brand ainda não existem no catálogo v2.2. Padrão consistente com DssFab, DssFabAction, DssCard.
2. **Acento de marca apenas no expanded** — brand colapsado não exibe acento. Decisão de design: marca não polui o estado recolhido.
3. **Slot `header` bypassa props** — ao usar `#header`, o consumidor assume responsabilidade total por acessibilidade e visual do header.
4. **`ariaLabel` → `header-aria-label`** — mapeia para prop do QExpansionItem que define o aria-label do botão toggle. Testado com Quasar 2.14.x. Se a prop `header-aria-label` não for reconhecida por versões futuras do Quasar, o fallback garantido é usar o slot `#header` com `aria-label` no elemento raiz.
5. **Sem unit tests** — componentes DSS não têm testes unitários automatizados em v2.2.
