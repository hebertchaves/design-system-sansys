# DssTimeline — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssTimeline` é um container governado que exibe uma sequência de eventos em ordem cronológica através de uma linha visual conectada. Wrapper DSS sobre o `QTimeline` do Quasar.

**Quando usar:**
- Rastreamento de pedidos, status de envio
- Histórico de atividades de usuário ou sistema
- Fluxos de aprovação e progressão de etapas
- Changelog de versões ou eventos de auditoria
- Qualquer sequência temporal que precise de representação visual clara

**Quando NÃO usar:**
- Listas simples sem relação temporal entre os itens (use `DssList`)
- Stepper com interatividade explícita (use `DssStepper`)
- Listas de notificações sem progressão (use `DssBanner`)

---

## 2. Classificação DSS

- **Tipo:** Container não-interativo de dados temporais
- **Categoria:** Visualização de Dados e Histórico — Fase 2, Nível 2
- **Fase:** 2
- **Interativo:** Não — o container em si não é interativo; itens internos podem ter conteúdo interativo via slot
- **Motor:** `QTimeline` (Quasar)
- **Subcomponente:** `DssTimelineEntry` (wrapper de `QTimelineEntry`)

---

## 3. Mapeamento Arquitetural

### 3.1 Equivalente Quasar

| Quasar | DSS | Observação |
|--------|-----|------------|
| `QTimeline` | `DssTimeline` | Container principal |
| `QTimelineEntry` | `DssTimelineEntry` | Item de entrada |

### 3.2 Mapeamento de Superfície

**Componentes DSS que podem compor DssTimeline:**
- 🟢 `DssIcon` — ícone no marcador de cada entrada
- 🟢 `DssAvatar` — avatar no lugar do ícone
- 🟢 `DssButton` — ação contextual dentro do slot default de cada entrada
- 🟢 `DssBadge` — indicador de status junto ao título (via slot #title)
- 🟢 `DssCard` — conteúdo rico dentro de cada entrada (via slot default)
- 🟢 `DssSeparator` — separação adicional entre entradas

### 3.3 Anti-patterns de Composição

- ❌ Usar `QTimelineEntry` diretamente em vez de `DssTimelineEntry`
- ❌ Aplicar estilos de cor via `style=""` inline nas entradas
- ❌ Usar `::v-deep` ou `:deep()` para sobrescrever estilos internos do QTimeline
- ❌ Criar timeline sem relação cronológica real entre os itens
- ❌ Sobrecarregar itens com conteúdo excessivo (use `DssExpansionItem` para conteúdo expansível)

---

## 4. API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `layout` | `'dense' \| 'comfortable' \| 'loose'` | `undefined` | Controla o espaçamento entre os itens |
| `side` | `'left' \| 'right'` | `undefined` | Define de qual lado os itens aparecem por padrão |
| `dark` | `Boolean` | `false` | Ativa modo escuro no QTimeline. Prefira `[data-theme="dark"]` via cascade DSS. **Aviso:** usar `dark=true` sem `data-theme="dark"` no contexto pai pode criar inconsistência visual com outros componentes DSS da página. |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Slot principal — aceita componentes `DssTimelineEntry` |

### Eventos

Nenhum evento emitido — container não-interativo.

> **Nota:** Interações internas (botões, links no slot default das entradas) emitem seus próprios eventos e são responsabilidade do consumidor.

---

## 5. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| hover | N/A | Container não-interativo — sem cursor pointer |
| focus | N/A | O root não é focável; itens internos têm próprio foco |
| active | N/A | Sem estado pressionado |
| disabled | N/A | Timeline de visualização não possui estado desabilitado |
| loading | N/A | Conteúdo estático — use `DssInnerLoading` externamente se necessário |

---

## 6. Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-timeline-line-color` | Custom Property | Cor da linha conectora (default: `--dss-gray-300`) |
| `--dss-timeline-dot-color` | Custom Property | Cor do marcador/ponto (default: `--dss-gray-400`) |
| `--dss-gray-300` | 2-composition | Linha conectora — estado neutro |
| `--dss-gray-400` | 2-composition | Marcador/ponto — estado neutro |
| `--dss-hub-600` | 4-output/brands | Linha e marcador — brand Hub |
| `--dss-water-500` | 4-output/brands | Linha e marcador — brand Water |
| `--dss-waste-600` | 4-output/brands | Linha e marcador — brand Waste |
| `--dss-gray-600` | 4-output/states | Linha — prefers-contrast: more |
| `--dss-gray-700` | 4-output/states | Marcador — prefers-contrast: more |
| `--dss-hub-800` | 4-output/states | Linha e marcador Hub — prefers-contrast: more |
| `--dss-water-700` | 4-output/states | Linha e marcador Water — prefers-contrast: more |
| `--dss-waste-800` | 4-output/states | Linha e marcador Waste — prefers-contrast: more |
| `--dss-text-body` | 2-composition | Cor do texto de título |
| `--dss-text-subtle` | 2-composition | Cor do subtítulo/data |
| `--dss-text-inverse` | 2-composition | Cor do texto sobre o marcador |
| `--dss-font-family-sans` | 2-composition | Família tipográfica |
| `--dss-font-size-md` | 2-composition | Tamanho de fonte padrão |
| `--dss-font-size-sm` | 2-composition | Tamanho de fonte do subtítulo |
| `--dss-font-weight-normal` | 2-composition | Peso de fonte padrão |
| `--dss-font-weight-semibold` | 2-composition | Peso de fonte do título |
| `--dss-line-height-md` | 2-composition | Altura de linha padrão |
| `--dss-spacing-1` | 2-composition | Margin bottom do título |
| `--dss-spacing-2` | 2-composition | Margin bottom do subtítulo |
| `--dss-spacing-6` | 2-composition | Padding bottom do conteúdo (comfortable) |
| `--dss-spacing-3` | 3-variants | Padding bottom — layout dense |
| `--dss-spacing-8` | 3-variants | Padding bottom — layout loose |

---

## 7. Acessibilidade

- **WCAG 2.1 AA**: Conforme via herança do QTimeline (renderiza como `<ol>` ou `<ul>` de eventos)
- **Touch target**: N/A — componente não-interativo
- **ARIA**: `QTimeline` gerencia a semântica de lista. Adicionar `aria-label` no `DssTimeline` para descrever o propósito da linha do tempo ao consumidor:
  ```vue
  <DssTimeline aria-label="Histórico de pedido">
  ```
- **Navegação por teclado**: N/A no container. Elementos interativos dentro dos slots default das entradas são navegáveis normalmente.
- **Live region**: Para timelines atualizadas dinamicamente, adicionar `aria-live="polite"` via atributo forwarded:
  ```vue
  <DssTimeline aria-live="polite" aria-label="Atualizações em tempo real">
  ```
- **Contraste**: Linha e marcadores com `--dss-gray-300`/`--dss-gray-400` fornecem contraste estrutural adequado. Reforçado por `prefers-contrast: more`.

---

## 8. Exceções Registradas

| ID | Tipo | Local | Valor | Justificativa |
|----|------|-------|-------|---------------|
| EXC-Gate-01 | Gate de Composição v2.4 | `2-composition/_base.scss` | Descendant selectors `.q-timeline__*` | QTimeline renderiza estrutura interna (conector, ponto, título, subtítulo) sem CSS custom properties nativas para controle de cor. Descendant selectors são obrigatórios para governança de tokens DSS. |
| EXC-States-01 | Forced Colors | `4-output/_states.scss` | `ButtonText`, `Canvas`, `CanvasText` | Em `forced-colors: active`, valores SystemColor são permitidos e necessários para garantir visibilidade do contraste estrutural da timeline. |
| EXC-04 | Print | `4-output/_states.scss` | `!important` | Necessário para sobrescrever remoção de background pelo navegador em modo de impressão. |

---

## 9. Paridade com Golden Component (DssBadge)

| Aspecto | DssBadge | DssTimeline | Diferença | Justificativa |
|---------|----------|-------------|-----------|---------------|
| `defineOptions({ name, inheritAttrs: false })` | ✅ | ✅ | — | — |
| `v-bind="$attrs"` forwarding | ✅ | ✅ | — | — |
| Sem touch target `::before` | ✅ (não-interativo) | ✅ (não-interativo) | — | Ambos não-interativos |
| Sem `defineEmits` | ✅ | ✅ | — | Container não emite eventos |
| Brandabilidade via `[data-brand]` | ✅ | ✅ | — | — |
| `forced-colors` media query | ✅ | ✅ | — | — |
| `prefers-contrast: more` | ✅ | ✅ | — | — |
| `-webkit-tap-highlight-color` | ✅ | N/A | Intencional | DssTimeline não é tocável |

---

## 10. Comportamentos Implícitos

- **Forwarding de attrs**: Todo atributo não-prop é forwarded ao `QTimeline` root via `v-bind="$attrs"`.
- **Color não forwarded**: A prop `color` do QTimeline **não é exposta**. Cores são governadas exclusivamente por CSS via tokens DSS (EXC-Gate-01).
- **Dark mode**: A prop `dark` é forwarded mas o dark mode DSS é gerenciado via cascade global de tokens em `data-theme="dark"`.
- **Semântica de lista**: QTimeline renderiza como elemento de lista HTML semântica; DssTimeline herda essa semântica automaticamente.

---

## 11. Changelog

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0.0 | 2026-05-20 | Criação inicial — Fase 2 Nível 2 |
