# DssDataCard — API Reference

**Versão DSS:** 2.2  
**Fase:** 3 — Componente Composto Complexo  
**Golden Context:** *É o Golden Context da Fase 3*

---

## Props

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `title` | `string` | `undefined` | Título exibido na DssToolbar interna |
| `subtitle` | `string` | `undefined` | Subtítulo exibido abaixo do título |
| `variant` | `'elevated' \| 'flat' \| 'bordered' \| 'outlined'` | `'elevated'` | Variante visual do DssCard container |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca Sansys — propaga via `[data-brand]` sem prop drilling |
| `tabs` | `DataCardTab[]` | `[]` | Lista de abas; cada aba gera um slot `tab-{name}` |
| `totalItems` | `number` | `0` | Total de itens para cálculo de páginas; `0` = sem paginação |
| `itemsPerPage` | `number` | `10` | Itens por página |
| `modelValue` | `number` | `1` | Página atual — compatível com `v-model` |
| `disabled` | `boolean` | `false` | Desabilita toda interação; propagado via `provide/inject` |
| `loading` | `boolean` | `false` | Exibe skeleton loader no lugar do conteúdo |
| `tabsAriaLabel` | `string` | `undefined` | `aria-label` acessível para o grupo de abas (`DssTabs`) |

## Props bloqueadas

| Prop Quasar | Motivo |
|---|---|
| `dark` | Tema escuro governado via `[data-theme='dark']` global |

---

## DataCardTab

```typescript
interface DataCardTab {
  name: string       // Identificador único — usado como nome do slot: tab-{name}
  label: string      // Texto exibido na aba
  icon?: string      // Ícone Material Icons (opcional)
  disabled?: boolean // Desabilita esta aba individualmente
}
```

---

## Emits

| Evento | Payload | Descrição |
|---|---|---|
| `update:modelValue` | `number` | Emitido ao mudar de página (compatível com `v-model`) |
| `tab-change` | `string \| number` | Emitido ao trocar de aba ativa |
| `refresh` | — | Emitido ao clicar no botão refresh da toolbar |

---

## Slots

| Slot | Descrição |
|---|---|
| `toolbar-actions` | Área de ações adicionais na toolbar (direita, após o botão refresh). Aceita `DssButton` flat/ghost e `DssIcon`. |
| `tab-{name}` | Conteúdo de cada aba, nomeado dinamicamente. Ex: `#tab-resumo` para `{ name: 'resumo' }`. |
| `default` | Slot de fallback quando nenhuma aba está configurada. Renderizado no `DssCardSection`. |
| `footer` | Área de rodapé abaixo da paginação. Renderizado condicionalmente. |

---

## Provide/Inject

| Chave | Tipo | Descrição |
|---|---|---|
| `DATA_CARD_DISABLED_KEY` | `InjectionKey<Ref<boolean>>` | Estado `disabled` disponível para componentes filhos sem prop drilling |

```typescript
// Componente filho que consome o contexto:
import { injectDataCardDisabled } from 'dss/DssDataCard'
const isDisabled = injectDataCardDisabled() // Ref<boolean>
```

---

## Tokens CSS utilizados

| Token | Uso |
|---|---|
| `--dss-font-size-md` | Tamanho de fonte do título |
| `--dss-font-size-sm` | Tamanho de fonte do subtítulo e label de paginação |
| `--dss-font-weight-medium` | Peso do título |
| `--dss-text-body` | Cor do título |
| `--dss-text-secondary` | Cor do subtítulo e label de paginação |
| `--dss-gray-300` | Cor das bordas internas (toolbar, tabs, paginação, footer) |
| `--dss-surface-muted` | Fundo das linhas do skeleton |
| `--dss-border-width-thin` | Largura das bordas (1px) |
| `--dss-radius-sm` | Border-radius das linhas do skeleton |
| `--dss-spacing-1` | Gap entre botões de paginação (4px) |
| `--dss-spacing-2` | Padding vertical da paginação e rodapé (8px) |
| `--dss-spacing-3` | Gap entre linhas do skeleton (12px) |
| `--dss-spacing-4` | Padding interno do conteúdo e paginação horizontal (16px) |
| `--dss-opacity-disabled` | Opacidade do estado `--disabled` (0.4) |
| `--dss-line-height-xs` | Line-height do título |
| `--dss-duration-1000` | Duração da animação de shimmer do skeleton |
| `--dss-hub-600` | Cor de borda no brand hub |
| `--dss-water-500` | Cor de borda no brand water |
| `--dss-waste-600` | Cor de borda no brand waste |

---

## Exceções registradas

| ID | Tipo | Descrição |
|---|---|---|
| EXC-Structural-01 | Código | `gap: 2px` em `__title-group` — gap geométrico mínimo; `--dss-spacing-1` (4px) é o menor token disponível |
| EXC-Structural-02 | Código | `line-height: 1.3` em `__subtitle` — nenhum token DSS mapeia para 1.3; `--dss-line-height-xs` = 1.4 é o mais próximo mas seria visualmente incorreto |
| EXC-Structural-03 | Código | `opacity: 0.4` no `@keyframes dss-data-card-shimmer` — ponto médio da animação shimmer; nenhum token de opacidade para animações; `--dss-opacity-disabled` (0.4) tem semântica diferente (estado disabled) |
