# DSSEXPANSIONITEM_API.md — DssExpansionItem API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `label` | `string` | — | Texto principal do header |
| `caption` | `string` | — | Texto secundário do header (subtítulo) |
| `icon` | `string` | — | Ícone Material Icons à esquerda do header |
| `expandIcon` | `string` | `'expand_more'` (Quasar default) | Ícone customizado de expansão (à direita) |
| `modelValue` | `boolean` | — | Estado de expansão controlado (v-model) |
| `defaultOpened` | `boolean` | — | Estado inicial aberto (não controlado) |
| `group` | `string` | — | Nome do grupo para accordion (fecha outros ao abrir) |
| `disable` | `boolean` | `false` | Desabilita a interação com o item |
| `dense` | `boolean` | `false` | Reduz padding vertical do header (dense mode) |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Acento de marca no header quando expandido |
| `ariaLabel` | `string` | — | Label acessível para o botão toggle do header |

## Props Bloqueadas (QExpansionItem API)

| Prop | Justificativa |
|------|---------------|
| `dark` | DSS gerencia dark mode via CSS global (`[data-theme="dark"]`) |
| `headerClass` | Visual do header estritamente governado pelo DSS |
| `headerStyle` | Visual do header estritamente governado pelo DSS |
| `switchToggleSide` | Ícone de expansão sempre à direita — padrão DSS de consistência |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do painel expansível (obrigatório para demonstrar propósito) |
| `header` | Override completo do header. Quando usado, as props `label`, `caption`, `icon` e `expandIcon` são ignoradas |

### ⚠️ Slot `header` — Responsabilidade do consumidor

Ao usar `#header`, o consumidor assume responsabilidade total pelo conteúdo e acessibilidade do header. O componente não aplica os tokens DSS de tipografia automaticamente neste caso.

```vue
<!-- ✅ Correto: usar #header para layout customizado -->
<DssExpansionItem aria-label="Item customizado">
  <template #header>
    <DssItemSection>
      <DssItemLabel>Label customizado</DssItemLabel>
    </DssItemSection>
  </template>
  <div>conteúdo</div>
</DssExpansionItem>
```

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `boolean` | Estado de expansão alterado (v-model) |
| `show` | — | Emitido quando o painel termina de abrir |
| `hide` | — | Emitido quando o painel termina de fechar |
| `before-show` | — | Emitido antes do painel começar a abrir |
| `before-hide` | — | Emitido antes do painel começar a fechar |

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-font-family-sans` | Roboto, sans-serif | Fonte do header |
| `--dss-font-size-md` | 16px | Tamanho do label |
| `--dss-font-weight-normal` | 400 | Peso do label |
| `--dss-line-height-normal` | 1.5 | Line-height do header |
| `--dss-text-body` | — | Cor do label |
| `--dss-text-subtle` | — | Cor do caption e ícone de expansão |
| `--dss-spacing-1_5` | 6px | Padding vertical (dense) |
| `--dss-spacing-3` | 12px | Padding vertical do header |
| `--dss-spacing-4` | 16px | Padding horizontal do header |
| `--dss-spacing-12` | 48px | min-height do header (padrão) |
| `--dss-surface-hover` | rgba(0,0,0,0.04) | Background hover do header |
| `--dss-surface-active` | rgba(0,0,0,0.08) | Background active do header |
| `--dss-surface-subtle` | #fafafa | Background do header expandido |
| `--dss-surface-muted` | #f5f5f5 | Background hover sobre estado expanded |
| `--dss-focus-ring` | — | Ring de foco (light mode) |
| `--dss-duration-150` | 150ms | Transição de background do header |
| `--dss-duration-250` | 250ms | Transição de rotação do ícone |
| `--dss-easing-standard` | — | Curva de easing das transições |
| `--dss-opacity-disabled` | 0.4 | Opacidade do estado disabled |
| `--dss-touch-target-md` | 44px | min-height do header (dense) |
| `--dss-border-width-thin` | 1px | Borda em prefers-contrast |
| `--dss-border-width-md` | 2px | Outline em prefers-contrast hover |
| `--dss-border-width-thick` | 3px | Brand accent border-left |
| `--dss-hub-600` | — | Brand accent Hub (light) |
| `--dss-hub-400` | — | Brand accent Hub (dark) |
| `--dss-water-500` | — | Brand accent Water (light) |
| `--dss-water-400` | — | Brand accent Water (dark) |
| `--dss-waste-600` | — | Brand accent Waste (light) |
| `--dss-waste-500` | — | Brand accent Waste (dark) |

## CSS Classes

| Classe | Descrição |
|--------|-----------|
| `.dss-expansion-item` | Elemento raiz (wrapper DSS) |
| `.dss-expansion-item--dense` | Variante de alta densidade |
| `.dss-expansion-item--disabled` | Estado desabilitado |
| `.dss-expansion-item--brand-hub` | Acento de marca Hub |
| `.dss-expansion-item--brand-water` | Acento de marca Water |
| `.dss-expansion-item--brand-waste` | Acento de marca Waste |
| `.dss-expansion-item__qexpansion` | Wrapper do QExpansionItem |

### Classes Quasar (gate exceptions — somente leitura)

| Classe | Origem | Uso no DSS |
|--------|--------|-----------|
| `.q-item` | QExpansionItem interno | Target para estilos do header |
| `.q-expansion-item__content` | QExpansionItem interno | Target para painel de conteúdo |
| `.q-expansion-item__toggle-icon` | QExpansionItem interno | Target para transição do ícone |
| `.q-expansion-item--expanded` | QExpansionItem estado | Target para estilos de expanded |
