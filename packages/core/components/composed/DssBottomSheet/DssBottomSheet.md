# DssBottomSheet — Documentação (Template 13.1)

## 1. Visão Geral

**O que é:** `DssBottomSheet` é um overlay que desliza da parte inferior da tela, apresentando conteúdo contextual, listas de ações ou formulários curtos sem navegar para uma nova tela. É o padrão UX universal para interações secundárias em mobile e desktop.

**Quando usar:**
- Exibir listas de ações contextuais (compartilhar, editar, excluir)
- Formulários curtos de entrada de dados sem mudar de contexto
- Confirmações de ações com opções (cancelar / confirmar)
- Filtros e ordenação de listas
- Seleção de itens de um conjunto (usuários, opções, tags)

**Quando NÃO usar:**
- Notificações temporárias — usar `DssToast`/`DssSnackbar`
- Navegação principal — usar `DssDrawer` ou rotas
- Tooltips e popovers — usar `DssTooltip` ou `DssMenu`
- Quando há mais de 2 níveis de interação em sequência — reavaliar fluxo

---

## 2. Classificação DSS

- **Tipo:** Overlay Bottom Sheet
- **Categoria:** Navegação
- **Fase:** 2 — Nível 2 (Composição de Primeiro Grau)
- **Interativo:** Sim (v-model:open para controle de visibilidade)
- **Motor Quasar:** `QDialog` com `position="bottom"` + `fullWidth`
- **Nota:** `QBottomSheet` do Quasar é um plugin ($q.bottomSheet({})), não um componente. DssBottomSheet reimplementa o comportamento usando QDialog diretamente.

---

## 3. API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `Boolean` | `false` | Controla visibilidade (v-model:open) |
| `persistent` | `Boolean` | `false` | Impede fechamento externo |
| `maximized` | `Boolean` | `false` | Altura total da tela |
| `square` | `Boolean` | `false` | Cantos superiores quadrados |
| `noEscDismiss` | `Boolean` | `false` | Desabilita fechamento via ESC |
| `noBackdropDismiss` | `Boolean` | `false` | Desabilita fechamento via backdrop |
| `showHandle` | `Boolean` | `true` | Exibe handle visual de arrasto |
| `transitionEnter` | `String` | `'slide-up'` | Transição de entrada |
| `transitionLeave` | `String` | `'slide-down'` | Transição de saída |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo principal |
| `header` | Cabeçalho opcional (título, fechar) |
| `handle` | Handle customizado (substitui handle padrão) |

### Events

| Event | Payload | Descrição |
|-------|---------|-----------|
| `update:open` | `Boolean` | v-model:open |
| `open` | — | Após abertura |
| `close` | — | Após fechamento |
| `before-open` | — | Antes de abrir |
| `before-close` | — | Antes de fechar |

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| open | ✅ | Visível e interativo |
| closed | ✅ | Não renderizado (teleport) |
| persistent | ✅ | Sem fechamento externo |
| maximized | ✅ | Altura total da tela |
| square | ✅ | Cantos superiores quadrados |
| hover | ❌ N/A | Container overlay não-interativo no root |
| focus | ❌ N/A | Foco pertence aos filhos |
| active | ❌ N/A | Não interativo no root |
| disabled | ❌ N/A | Simplesmente não abrir |
| loading | ❌ N/A | Usar DssSpinner dentro do slot default |

---

## 5. Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Background do sheet |
| `--dss-shadow-modal` | Sombra de elevação |
| `--dss-radius-lg` | Cantos superiores arredondados |
| `--dss-radius-full` | Handle visual (pill) |
| `--dss-padding-3` | Padding vertical do header (12px) |
| `--dss-padding-4` | Padding horizontal header e body (16px) |
| `--dss-spacing-1` | Altura do handle (4px) |
| `--dss-spacing-2` | Espaço acima do handle (8px) |
| `--dss-spacing-8` | Largura do handle (32px) |
| `--dss-gray-100` | Borda separador do header |
| `--dss-gray-200` | Handle em modo neutro |
| `--dss-gray-300` | Handle em dark mode |
| `--dss-border-width-thin` | Borda em forced-colors |
| `--dss-border-width-md` | Outline em high-contrast |
| `--dss-font-family-sans` | Tipografia |
| `--dss-text-body` | Cor do texto |
| `--dss-hub-600` | Handle brand hub |
| `--dss-hub-primary` | Borda header brand hub |
| `--dss-water-500` | Handle brand water |
| `--dss-water-primary` | Borda header brand water |
| `--dss-waste-600` | Handle brand waste |
| `--dss-waste-primary` | Borda header brand waste |

---

## 6. Acessibilidade

- **WCAG 2.1 AA**: Conformidade via QDialog (foco preso no overlay, retorno ao trigger após fechar)
- **Touch target**: N/A — DssBottomSheet é overlay container, não controle interativo no root
- **ARIA**: `role="dialog"`, `aria-modal="true"` gerenciados pelo QDialog. Handle visual com `aria-hidden="true"`
- **Navegação por teclado**: Tab/Shift+Tab para navegar entre elementos internos; ESC fecha (quando `noEscDismiss` não ativo)
- **Foco**: QDialog captura e retorna foco automaticamente (focus-trap nativo Quasar)
- **Leitores de tela**: Conteúdo do slot default é lido normalmente. Handle area é `aria-hidden="true"`

---

## 7. Comportamentos Implícitos

### Forwarding e inheritAttrs
- `inheritAttrs: false` declarado em `defineOptions`
- `$attrs` repassado ao `q-dialog` via `v-bind="$attrs"`
- QDialog gerencia quaisquer atributos HTML extras internamente

### Teleport
- QDialog teleporta o conteúdo para `<body>` automaticamente
- Estilos carregados globalmente via `components/index.scss`
- `<style scoped>` seria ineficaz — não usar

### Position e fullWidth fixos
- `position="bottom"` é invariante arquitetural — não exposto como prop
- `full-width` é fixo em `true` — bottom sheets são sempre largura total
- Não faz sentido ter um bottom sheet sem essas características

### Handle automático
- `showHandle: true` por padrão exibe pill cinza (`--dss-gray-200`)
- Slot `#handle` substitui completamente o handle padrão
- `showHandle: false` + slot `#handle` para handle totalmente customizado
- Handle area sempre renderizada com `aria-hidden="true"` — decorativo

### Header condicional
- `.dss-bottom-sheet__header` só renderiza quando o slot `#header` é fornecido
- Detectado via `useSlots()` — sem overhead quando não usado

---

## 8. Paridade com Golden Context (DssDialog)

| Aspecto | DssDialog | DssBottomSheet | Justificativa |
|---------|-----------|----------------|---------------|
| Motor Quasar | QDialog | QDialog | Mesmo motor — EXC-Gate-01 |
| Teleport para body | ✅ | ✅ | Idêntico |
| `inheritAttrs: false` | ✅ | ✅ | Idêntico |
| `$attrs` forwarding | ✅ | ✅ | Idêntico |
| CSS global (não scoped) | ✅ | ✅ | Idêntico |
| `!important` em bg/shadow | ✅ EXC-01 | ✅ EXC-01 | Idêntico precedente |
| Slots condicionais (useSlots) | ✅ | ✅ | Idêntico |
| `[data-brand] .dss-*` | ✅ | ✅ | Idêntico |
| `-webkit-tap-highlight-color` | ✅ | ✅ | Idêntico (DssChip) |
| `will-change` | ✅ | ✅ | Idêntico |
| `position` | Prop (standard/top/bottom...) | **Fixo: bottom** | Diferença intencional: bottom sheet sempre é "bottom" |
| `fullWidth` | Prop opcional | **Fixo: true** | Diferença intencional: bottom sheets são sempre full-width |
| `handle` | ❌ N/A | **✅ slot + padrão** | Extensão DSS — handle é padrão UX de bottom sheets |
| `border-radius` | Simétrico | **Assimétrico (EXC-02)** | Diferença intencional: cantos superiores arredondados, base reta |
| `max-height` | 90vh (EXC-02) | **85vh (EXC-03)** | Bottom sheets deixam conteúdo abaixo visível |

---

## 9. Matriz de Composição DSS

### Papel Estrutural
`DssBottomSheet` é um **container de composição overlay** — ele fornece o envelope visual e estrutural, mas nunca instancia componentes DSS internamente. Toda a composição é responsabilidade do consumidor via slots.

### Componentes DSS Recomendados

| Slot | Componentes Recomendados | Padrão de Uso |
|------|--------------------------|---------------|
| `#handle` | — | Handle customizado com texto ou ícone |
| `#header` | `DssToolbar`, `DssButton`, `DssIcon` | Título + botão fechar |
| `default` | `DssList + DssItem`, `DssButton`, `DssSpinner` | Conteúdo principal |

### Padrões de Layout

```
┌────────────────────────────────────────┐
│  ⋯ [handle area, aria-hidden]          │
│ ─────────────────────────────────────── │
│  [#header: título + botão fechar]       │  ← opcional
│ ─────────────────────────────────────── │
│  [default: DssList / DssForm / texto]   │
│  (scroll interno quando max-height)     │
└────────────────────────────────────────┘
```

### Limites de Responsabilidade
- **DssBottomSheet**: estrutura, handle, header/body via slots, animação, backdrop, foco
- **Consumidor**: conteúdo, botões de ação, validação de formulário, brand

### Governança de Extensão
- Novas props: consultar pré-prompt e obter aprovação antes de adicionar
- Slots adicionais: documentar como extensão futura antes de implementar

### Anti-patterns de Composição

| ❌ Anti-pattern | ✅ Correto |
|----------------|-----------|
| `<q-btn>` dentro do sheet | `<DssButton>` |
| Aninhar DssBottomSheet em DssDialog | Avaliar fluxo alternativo |
| Usar DssBottomSheet para toasts | Usar DssToast/DssSnackbar |
| persistent: true sem botão de fechar | Sempre incluir DssButton com @click="open = false" |
| Misturar Quasar bruto com DSS | Todos componentes internos via DSS |

---

## 10. Exceções Registradas

| ID | Tipo | Local | Justificativa |
|----|------|-------|---------------|
| EXC-Gate-01 | ComponentDirectUsage | template | QDialog como motor de overlay (sem equivalente DSS) |
| EXC-01 | CSSImportant | 2-composition/_base.scss | QDialog sobrescreve bg/shadow — !important necessário |
| EXC-02 | AsymmetricBorderRadius | 2-composition/_base.scss | Cantos superiores arredondados + base reta (UX canônico) |
| EXC-03 | HardcodedDimension | 2-composition/_base.scss | max-height: 85vh (sem token DSS para overlay max-height) |
| EXC-04 | HardcodedDimension | 3-variants/_variant.scss | max-height: 100dvh em maximized (dvh necessário para mobile) |

---

## 11. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-21 | Claude Code (MCP-First) | Criação inicial — Fase 2 Nível 2, motor QDialog position=bottom |
