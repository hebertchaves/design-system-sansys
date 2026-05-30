# DssChatMessage — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:**
`DssChatMessage` é um componente composto interativo do DSS para exibição de mensagens individuais em interfaces de chat e conversação. Representa uma única mensagem com suporte a identificação do remetente, metadados (timestamp, status de entrega/leitura), ações contextuais e brandabilidade.

**Quando usar:**
- Interfaces de chat ou mensageria em tempo real
- Timelines de comentários com estrutura conversacional
- Históricos de comunicação estruturados (suporte, notificações, alertas operacionais)
- Qualquer contexto onde mensagens precisam de diferenciação visual entre remetente e destinatário

**Quando NÃO usar:**
- Notificações toast ou alerts simples → usar `DssBanner` ou `DssTooltip`
- Listas de itens sem contexto de remetente → usar `DssList` + `DssItem`
- Comentários sem autoria ou thread → usar `DssCard` com conteúdo de texto
- Feed de atividades de sistema (sem interação de usuário) → componente específico de Feed (roadmap)

---

## 2. Classificação DSS

- **Tipo:** Componente Composto Interativo
- **Categoria:** Conteúdo Rico
- **Fase:** 2 — Nível 2
- **Família:** Conteúdo Rico
- **Interativo:** Sim (click, long-press)
- **Golden Reference:** DssChip (interativo)
- **Golden Context:** DssCarousel (composto Fase 2 com subcomponentes DSS)
- **Subcomponentes internos:** DssAvatar, DssIcon

---

## 3. API

*(ver [DSSCHATMESSAGE_API.md](./DSSCHATMESSAGE_API.md))*

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| hover | ✅ | Cursor pointer via interatividade natural |
| focus | ✅ | `focus-visible` com `--dss-focus-ring` no elemento raiz |
| active | ✅ | `filter: brightness` na bolha via `.dss-chat-message:active` |
| selected | ✅ | Outline na bolha via `.dss-chat-message--selected` |
| disable | ✅ | `opacity: --dss-opacity-disabled` + `pointer-events: none` |
| loading | ❌ N/A | Status `sending` cobre o feedback de carregamento via ícone animado (`schedule` + keyframe) |
| sending | ✅ | Via `status="sending"` — ícone `schedule` com animação pulse |
| sent | ✅ | Via `status="sent"` — ícone `done` |
| delivered | ✅ | Via `status="delivered"` — ícone `done_all` cinza |
| read | ✅ | Via `status="read"` — ícone `done_all` brand primary (ou texto body sem brand) |
| error | ✅ | Via `status="error"` — ícone `error_outline` com `--dss-feedback-error` |

---

## 5. Tokens Utilizados

*(ver [DSSCHATMESSAGE_API.md](./DSSCHATMESSAGE_API.md#tokens-utilizados))*

**Categorias:**
- **Spacing:** `--dss-spacing-{0_5, 1, 1_5, 2, 2_5, 3, 4}`
- **Typography:** `--dss-font-{family,size,weight}-*`, `--dss-line-height-*`
- **Radius:** `--dss-radius-{sm, lg, full}`
- **Surface:** `--dss-surface-{default, dark}`, `--dss-gray-{200, 600}`
- **Text:** `--dss-text-{body, subtle, inverse}`
- **Feedback:** `--dss-feedback-error`
- **Interaction:** `--dss-focus-ring`, `--dss-opacity-{disabled, 70}`, `--dss-shadow-sm`
- **Motion:** `--dss-duration-{150, 200, slowest}`, `--dss-easing-{standard, ease-in-out}`
- **Brand:** `--dss-{hub,water,waste}-{primary, on-primary}`

---

## 6. Acessibilidade

### WCAG 2.1 AA

| Critério | Status | Implementação |
|---------|--------|---------------|
| 1.1.1 Conteúdo não textual | ✅ | `avatarSrc` + `alt` no `<img>` interno; DssIcon com `decorative` |
| 1.3.1 Informação e relações | ✅ | `<article role="listitem">`, `<time>` para timestamp |
| 1.4.3 Contraste (Mínimo) | ✅ | Tokens garantem contraste ≥ 4.5:1 em todas as variantes de texto |
| 1.4.11 Contraste Não Textual | ✅ | `@media (forced-colors: active)` com SystemColor keywords |
| 2.1.1 Teclado | ✅ | `focus-visible` no elemento raiz; filhos interativos acessíveis via Tab |
| 2.4.7 Foco visível | ✅ | `outline: --dss-border-width-md solid --dss-focus-ring` com `--dss-spacing-1` offset |
| 2.5.5 Tamanho do Alvo | ✅ N/A | Container de conteúdo — altura natural da mensagem sempre ≥ 48px |
| 3.3.1 Identificação de Erros | ✅ | `status="error"` + ícone `error_outline` + cor `--dss-feedback-error` |

### Touch Target
N/A — DssChatMessage é container de conteúdo cuja altura natural supera 48px. Touch target ::before não aplicável.

### ARIA
- **`role="listitem"`** no elemento raiz — cada mensagem é um item de lista WAI-ARIA
- **`aria-label`** dinâmico composto: `"Mensagem de {senderName}, em {timestamp}, status: {status}"`
- **`aria-hidden="true"`** na área de avatar e metadados (decorativos/redundantes)
- **Contêiner pai DEVE ter `role="list"` ou `role="feed"`** — obrigatório para conformidade WCAG

### Navegação por teclado
- `Tab`: foca o elemento raiz (se focável via `tabindex`) ou elementos filhos interativos (slot `actions`)
- `Enter`/`Space`: não há comportamento nativo — componente emite `click` para o consumidor tratar
- Filhos no slot `actions` (DssButton, etc.) são acessíveis individualmente via Tab

---

## 7. Matriz de Composição DSS

### Papel Estrutural
`DssChatMessage` é **container de apresentação** de uma única mensagem. Não gerencia estado de conversação, histórico ou threading — isso é responsabilidade do componente pai ou da lógica da aplicação.

### Componentes DSS Recomendados

| Slot | Componentes Recomendados | Notas |
|------|--------------------------|-------|
| `#default` | `DssImg`, `DssVideo`, `DssLink` (roadmap), texto HTML nativo | Para conteúdo rico |
| `#avatar` | `DssAvatar` customizado, ícones SVG, placeholders | Substitui renderização automática |
| `#actions` | `DssButton` (flat, icon), `DssIcon`, `DssMenu` | Ações contextuais |
| `#sender-name` | `DssBadge`, `DssChip`, texto HTML nativo | Nome formatado, badge de status |

### Componentes Internos (Fase 2)
- 🟢 **DssAvatar** (Fase 1, selado) — renderização de avatar
- 🟢 **DssIcon** (Fase 1, selado) — ícones de status

### Componentes Planejados / Roadmap
- 🟡 **DssLink** — renderização de URLs dentro da mensagem
- 🟡 **DssForm** (roadmap) — mensagens interativas com formulários embutidos

### Lacunas Estruturais
- ⚪ **DssText** — não existe. Texto renderizado via HTML nativo (`<p>`) com tokens DSS aplicados via CSS. Classificado como **não crítico** (HTML nativo é equivalente funcional).

### Padrões de Layout
- Mensagens recebidas: `flex-direction: row` (avatar esquerda → conteúdo)
- Mensagens enviadas: `flex-direction: row-reverse` (conteúdo ← avatar direita)
- Máx-width do conteúdo: 75% do container pai (evita linhas muito longas)

### Limites de Responsabilidade
- ✅ **Faz:** Apresentação de uma mensagem individual com metadados e ações
- ❌ **Não faz:** Gerenciamento de thread, agrupamento de mensagens, scroll infinito, input de nova mensagem, indicadores de "digitando"
- ❌ **Não faz:** Sanitização de HTML/Markdown — responsabilidade do consumidor

### Anti-Patterns
- ❌ Usar sem `role="list"` no pai — viola WCAG 1.3.1
- ❌ Passar cores via prop inline (`style="background: blue"`) — viola Token First
- ❌ Usar DssChatMessage para notificações simples — usar DssBanner
- ❌ Aninhar DssChatMessage dentro de outro DssChatMessage
- ❌ Sobrescrever estilos internos via `::v-deep` ou `:deep()`

---

## 8. Comportamentos Implícitos

### Forwarding de Atributos (`inheritAttrs: false`)
- `$attrs` é repassado ao elemento raiz `<article>` via `v-bind="$attrs"`.
- `class` e `style` adicionais do consumidor são aplicados ao `<article>`.
- `aria-*` e `data-*` adicionais são suportados.

### Long Press
- Implementado via `pointerdown` com `setTimeout(500ms)`.
- **Cancelado por:** `pointerup`, `pointermove`, `pointercancel` (ex: scroll).
- Emite evento `long-press` com o `PointerEvent` original.
- Limpeza automática via `onBeforeUnmount`.

### Avatar Auto-render
- Se `avatarSrc` fornecido e slot `#avatar` vazio: renderiza `DssAvatar` com `<img>` interno.
- Se `avatarSrc` vazio e `senderName` presente: renderiza `DssAvatar` com iniciais.
- Se `showAvatar: false`: área de avatar não renderizada.
- Para mensagens mine: avatar renderizado apenas se `avatarSrc` OU `senderName` fornecido.

### Sem Motor Quasar (EXC-Arch-01)
- `QChatMessage` do Quasar é limitado demais para os requisitos do DSS.
- Componente implementado como HTML semântico customizado.
- Ver `dss.meta.json` para justificativa completa.

---

## 9. Paridade com Golden Component (DssChip)

| Aspecto | DssChip | DssChatMessage | Status | Justificativa |
|---------|---------|----------------|--------|---------------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | **Igual** | — |
| `inheritAttrs: false` + `v-bind="$attrs"` | ✅ | ✅ | **Igual** | — |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ | **Igual** | — |
| Touch target `::before` (WCAG 2.5.5) | ✅ | ❌ N/A | **Diferente (intencional)** | DssChatMessage é container, não controle compacto. Altura natural ≥ 48px. |
| Focus-visible com `--dss-focus-ring` | ✅ | ✅ | **Igual** | — |
| `opacity: --dss-opacity-disabled` no disable | ✅ | ✅ | **Igual** | — |
| Brand system (`--dss-{brand}-primary`) | ✅ | ✅ | **Igual** | — |
| Animação de estado ativo | `filter: brightness(0.9)` | `filter` herdado | **Igual** | — |
| `aria-hidden` em elementos decorativos | ✅ | ✅ (avatar, meta) | **Igual** | — |
| `prefers-reduced-motion` | ✅ | ✅ | **Igual** | Animação sending desabilitada |

---

## 10. Exceções Registradas

| ID | Tipo | Local | Valor | Justificativa |
|----|------|-------|-------|---------------|
| EXC-Arch-01 | Sem motor Quasar | `1-structure/` | N/A | QChatMessage primitivo demais; ver seção "Comportamentos Implícitos" |

---

## 11. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-21 | Claude Code / Hebert Daniel | Criação inicial — Fase 2, Nível 2, Família Conteúdo Rico |
