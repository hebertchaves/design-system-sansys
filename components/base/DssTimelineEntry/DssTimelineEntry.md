# DssTimelineEntry — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssTimelineEntry` é o subcomponente de entrada da `DssTimeline`. Representa um evento individual dentro de uma linha do tempo, contendo título, subtítulo (data/hora), marcador visual e conteúdo. Wrapper DSS sobre o `QTimelineEntry` do Quasar.

**Quando usar:**
- Exclusivamente como filho direto de `DssTimeline`
- Para representar cada evento individual em uma sequência cronológica
- Para criar separadores visuais de período (prop `heading`)

**Quando NÃO usar:**
- Fora do contexto de `DssTimeline`
- Como substituto de `DssItem` em listas não-cronológicas
- Como substituto de `DssStep` em steppers com navegação interativa

---

## 2. Classificação DSS

- **Tipo:** Subcomponente de container não-interativo
- **Categoria:** Visualização de Dados e Histórico — Fase 2, Nível 2
- **Fase:** 2
- **Interativo:** Não — o entry root não é interativo; o slot `default` aceita conteúdo interativo do consumidor
- **Motor:** `QTimelineEntry` (Quasar)
- **Contexto obrigatório:** Deve ser filho de `DssTimeline`

---

## 3. Mapeamento de Superfície

**Componentes DSS válidos por slot:**

| Slot | Componentes DSS recomendados |
|------|------------------------------|
| `#title` | `DssBadge` (indicadores de status), `DssIcon` (ícone decorativo) |
| `#subtitle` | `<time>` HTML nativo (data/hora semântica) |
| `#icon` | `DssIcon` (ícone customizado), SVG inline |
| `default` | `DssButton` (ações contextuais), `DssCard` (conteúdo rico), texto livre |

**Anti-patterns:**
- ❌ Usar `QTimelineEntry` diretamente (use `DssTimelineEntry`)
- ❌ Estilos inline com valores hardcoded (ex: `style="font-size: 12px"`)
- ❌ Usar fora do contexto de `DssTimeline`

---

## 4. API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `heading` | `Boolean` | `false` | Quando `true`, renderiza como cabeçalho/separador visual de período (ex.: "2026") |
| `tag` | `String` | `'li'` | Tag HTML raiz do elemento. Normalmente não precisa ser alterada |
| `side` | `'left' \| 'right'` | `undefined` | Sobrescreve o `side` do `DssTimeline` pai para esta entrada específica |
| `icon` | `String` | `undefined` | Nome do ícone Material Icons exibido no marcador |
| `avatar` | `String` | `undefined` | URL de imagem de avatar — tem precedência sobre `icon` |
| `title` | `String` | `undefined` | Título textual do evento. Sobrescrito pelo slot `#title` |
| `subtitle` | `String` | `undefined` | Subtítulo (data/hora). Sobrescrito pelo slot `#subtitle` |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Corpo do evento — conteúdo textual ou componentes DSS |
| `#title` | Customização do título — aceita markup rico (badges, ícones) |
| `#subtitle` | Customização do subtítulo — aceita `<time>`, formatações especiais |
| `#icon` | Customização do marcador — aceita SVG ou componente DSS customizado |

### Eventos

Nenhum evento emitido — subcomponente não-interativo.

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| hover | N/A | Subcomponente não-interativo — sem cursor pointer |
| focus | N/A | O entry root não é focável |
| active | N/A | Sem estado pressionado |
| disabled | N/A | Não aplicável para itens de timeline |
| loading | N/A | Conteúdo estático |

---

## 5. Tokens Utilizados

DssTimelineEntry herda tokens do `DssTimeline` pai via custom properties e descendant selectors. Tokens próprios do entry:

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-font-size-lg` | 2-composition | Heading — título de separador de período |
| `--dss-font-weight-semibold` | 2-composition | Heading — peso do título de período |
| `--dss-text-subtle` | 2-composition | Heading — cor do título de período |
| `--dss-spacing-2` | 2-composition | Heading — padding vertical |

> **Demais tokens** de cor (linha, marcador), tipografia (título, subtítulo) e espaçamento são herdados do `.dss-timeline` pai via cascade CSS e custom properties `--dss-timeline-line-color`, `--dss-timeline-dot-color`.

---

## 6. Acessibilidade

- **WCAG 2.1 AA**: QTimelineEntry renderiza como `<li>` por padrão, garantindo semântica de lista
- **Touch target**: N/A — não-interativo
- **ARIA**: O consumidor deve adicionar `aria-label` nos itens interativos dentro do slot default
- **Ícones decorativos**: Ícones passados via prop `icon` são renderizados pelo QTimeline internamente — garantir `aria-hidden="true"` se for puramente decorativo via slot `#icon`
- **Avatar**: Passar texto alternativo ao usar `avatar`:
  ```vue
  <DssTimelineEntry avatar="url.png">
    <!-- O QTimelineEntry renderiza o avatar — complementar com aria-label no DssTimeline -->
  </DssTimelineEntry>
  ```

---

## 7. Exceções Registradas

| ID | Tipo | Local | Valor | Justificativa |
|----|------|-------|-------|---------------|
| EXC-Gate-01 | Gate de Composição v2.4 | `2-composition/_base.scss` | Selector `.dss-timeline-entry--heading .q-timeline__heading-title` | QTimelineEntry no modo heading renderiza `.q-timeline__heading-title` internamente sem CSS custom property nativa para tipografia. Necessário para aplicar tokens de fonte do heading. |
| EXC-States-01 | Forced Colors | `4-output/_states.scss` | `ButtonText` | Em forced-colors, o heading usa ButtonText para garantir visibilidade do separador de período. |

---

## 8. Paridade com Golden Component (DssBadge)

| Aspecto | DssBadge | DssTimelineEntry | Diferença | Justificativa |
|---------|----------|-----------------|-----------|---------------|
| `defineOptions({ name, inheritAttrs: false })` | ✅ | ✅ | — | — |
| `v-bind="$attrs"` forwarding | ✅ | ✅ | — | — |
| Sem touch target | ✅ (não-interativo) | ✅ (não-interativo) | — | — |
| Sem `defineEmits` | ✅ | ✅ | — | Subcomponente não emite eventos |
| Slots condicionais via `useSlots()` | — | ✅ | Adicionado | Necessário para slots #title, #subtitle, #icon condicionais |

---

## 9. Comportamentos Implícitos

- **Slots condicionais**: Os slots `#title`, `#subtitle` e `#icon` são renderizados condicionalmente via `v-if="$slots.xxx"` — o QTimelineEntry recebe o template apenas quando o slot está preenchido.
- **Precedência avatar/icon**: A prop `avatar` tem precedência sobre `icon` no QTimelineEntry — se ambas forem passadas, o avatar é exibido.
- **Heading não aceita conteúdo**: Quando `heading=true`, o QTimelineEntry renderiza apenas como separador — o slot default é ignorado internamente pelo Quasar.
- **Color não forwarded**: Assim como no `DssTimeline`, a prop `color` do QTimelineEntry **não é exposta** — cores são governadas por CSS.

---

## 10. Changelog

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0.0 | 2026-05-20 | Criação inicial — Fase 2 Nível 2 |
