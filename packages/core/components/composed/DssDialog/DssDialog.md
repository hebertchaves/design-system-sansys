# DssDialog — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssDialog` é um componente modal que sobrepõe o conteúdo principal da aplicação para exibir informações críticas, solicitar entrada do usuário ou confirmar ações destrutivas. Interrompe o fluxo do usuário para garantir atenção total.

**Quando usar:**
- Confirmação de ações irreversíveis (ex: exclusão de dados)
- Formulários que exigem foco total antes de prosseguir
- Exibição de informações críticas que requerem leitura antes de continuar
- Fluxos de autenticação ou permissão secundária
- Visualização detalhada de um item sem navegar para nova tela

**Quando NÃO usar:**
- Notificações temporárias não-interativas → usar `DssToast` ou `DssSnackbar`
- Informações contextuais ao passar o mouse → usar `DssTooltip`
- Ações rápidas de baixo impacto → usar `DssMenu` ou `DssPopupProxy`
- Múltiplos níveis de diálogo aninhado (evitar mais de 2 níveis)
- Diálogos nativos do sistema operacional (`alert()`, `confirm()`)

---

## 2. Classificação DSS

- **Tipo:** Overlay Modal
- **Categoria:** Overlays e Dialogs
- **Fase:** 2 — Nível 1 (Independente)
- **Interativo:** Sim (no root via `v-model:open`; internamente via filhos DssButton)
- **Quasar Base:** QDialog

---

## 3. Golden Components

- **Golden Reference:** DssChip (componente interativo — touch target, ARIA, estados)
- **Golden Context:** DssCard (estrutura com header/body/footer, superfície elevada)

---

## 4. API

*(ver DSSDIALOG_API.md para referência completa)*

### Props Principais

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `Boolean` | `false` | Controla visibilidade via v-model:open |
| `persistent` | `Boolean` | `false` | Impede fechamento por clique externo ou ESC |
| `seamless` | `Boolean` | `false` | Remove backdrop |
| `maximized` | `Boolean` | `false` | Exibe em tela cheia |
| `full-width` | `Boolean` | `false` | Ocupa 100% da largura |
| `full-height` | `Boolean` | `false` | Ocupa 100% da altura |
| `position` | `String` | `'standard'` | Posição: standard, top, bottom, left, right |
| `transition-enter` | `String` | `'scale'` | Transição de entrada |
| `transition-leave` | `String` | `'scale'` | Transição de saída |
| `disable-esc` | `Boolean` | `false` | Desabilita fechamento via ESC |
| `disable-backdrop-click` | `Boolean` | `false` | Desabilita fechamento via backdrop |

### Slots

| Slot | Obrigatório | Descrição |
|------|-------------|-----------|
| `#header` | Não | Cabeçalho: título, botão fechar. Renderizado apenas quando fornecido. |
| `default` | Sim | Conteúdo principal do diálogo |
| `#footer` | Não | Rodapé: botões de ação. Renderizado apenas quando fornecido. |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:open` | `Boolean` | Para v-model:open |
| `open` | — | Diálogo aberto |
| `close` | — | Diálogo fechado |
| `before-open` | — | Antes de abrir |
| `before-close` | — | Antes de fechar |

---

## 5. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| Aberto | ✅ | Controlado por `v-model:open` |
| Fechado | ✅ | Estado padrão |
| Persistente | ✅ | Prop `persistent` |
| Maximizado | ✅ | Prop `maximized` |
| Seamless | ✅ | Prop `seamless` — sem backdrop |
| Full Width | ✅ | Prop `full-width` |
| Full Height | ✅ | Prop `full-height` |
| hover | — | N/A: DssDialog não é controle interativo no root |
| focus | — | N/A: foco pertence aos filhos (DssButton, DssInput) |
| active | — | N/A: não interativo no root |
| disabled | — | N/A: diálogos não têm estado desabilitado — simplesmente não abrir |
| loading | — | Fora do escopo mínimo; usar DssSpinner dentro do slot default |

---

## 6. Comportamentos Implícitos

### Teleport para `<body>`
QDialog teleporta seu conteúdo para `<body>` automaticamente. Os estilos DSS devem ser carregados **globalmente** via `components/index.scss` — `<style scoped>` seria ineficaz. O seletor `.dss-dialog` garante escopo sem scoped.

### inheritAttrs: false
`$attrs` repassado explicitamente ao QDialog via `v-bind="$attrs"`. Permite que atributos HTML adicionais (`data-*`, `aria-*`) sejam aplicados diretamente no QDialog.

### Slots condicionais
`#header` e `#footer` são renderizados **apenas quando fornecidos** — o componente detecta presença via `useSlots()` e aplica `v-if`. Isso garante que bordas e paddings de header/footer não apareçam em diálogos sem essas seções.

### Mapeamento de eventos
QDialog usa `@show`/`@hide`; DssDialog expõe `@open`/`@close` para clareza semântica DSS.

### Props bloqueadas
- `dark`: modo escuro governado globalmente via `[data-theme="dark"]`
- `square`: viola `--dss-radius-lg`

---

## 7. Paridade com Golden Component

| Aspecto | DssChip (Golden Ref) | DssDialog | Justificativa da Divergência |
|---------|---------------------|-----------|------------------------------|
| `defineOptions` | ✅ | ✅ | — |
| `inheritAttrs: false` | ✅ | ✅ | — |
| `v-bind="$attrs"` | ✅ | ✅ aplicado ao QDialog | — |
| `-webkit-tap-highlight-color` | ✅ | ✅ no .dss-dialog | — |
| `aria-hidden` em decorativos | ✅ | N/A | DssDialog não tem elementos decorativos |
| Touch target `::before` | ✅ | ❌ N/A | DssDialog é overlay, não controle compacto |
| Focus-visible visível | ✅ | N/A root / ✅ filhos | Foco pertence aos filhos interativos |
| `defineSlots` | ✅ | ✅ | — |

---

## 8. Acessibilidade

- **role:** `dialog` (aplicado automaticamente pelo QDialog)
- **aria-modal:** `true` (aplicado automaticamente pelo QDialog)
- **aria-labelledby:** Deve ser conectado manualmente pelo consumidor ao elemento de título no `#header`
- **aria-describedby:** Deve ser conectado manualmente pelo consumidor ao conteúdo do `default`
- **Trap focus:** Gerenciado automaticamente pelo QDialog — foco confinado dentro do diálogo quando aberto
- **Retorno de foco:** QDialog retorna foco ao elemento que abriu o diálogo ao fechar
- **Navegação por teclado:**
  - `Tab` / `Shift+Tab`: navega entre elementos interativos internos
  - `Esc`: fecha o diálogo (exceto quando `persistent` ou `disable-esc`)
- **WCAG 2.1 AA:**
  - Touch target: N/A no root — filhos (DssButton) são responsáveis
  - Contraste: `--dss-surface-default` vs `--dss-text-body` — garantido pelos tokens
  - Focus visível: delegado aos filhos interativos

---

## 9. Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-surface-default` | L2 | Background do diálogo |
| `--dss-shadow-modal` | L2 | Elevação/sombra |
| `--dss-radius-lg` | L2, L3 | Bordas arredondadas |
| `--dss-padding-4` | L2 | Padding header/footer (16px) |
| `--dss-padding-6` | L2 | Padding body e padding lateral (24px) |
| `--dss-spacing-2` | L2 | Gap entre botões no footer (8px) |
| `--dss-gray-100` | L2 | Bordas divisórias header/footer |
| `--dss-font-family-sans` | L2 | Tipografia |
| `--dss-text-body` | L2 | Cor de texto |
| `--dss-elevation-3` | L3 | Elevação variante seamless |
| `--dss-hub-primary` | L4 brands | Border header brand Hub |
| `--dss-water-primary` | L4 brands | Border header brand Water |
| `--dss-waste-primary` | L4 brands | Border header brand Waste |

---

## 10. Exceções Registradas

| ID | Tipo | Descrição | Justificativa |
|----|------|-----------|---------------|
| EXC-01 | CSSImportant | `!important` em `background-color` e `box-shadow` | QDialog aplica estilos inline e via `.q-dialog__inner` com especificidade que sobrescreve tokens DSS |
| EXC-02 | HardcodedDimension | `min-width: 280px`, `max-width: 90vw`, `max-height: 90vh` | Não existe token DSS para min/max width/height de overlay. Valores de referência Material Design para diálogos usáveis |
| EXC-Gate-01 | QuasarComponent | QDialog usado diretamente no template | QDialog é o motor de teleport, backdrop, focus-trap e posicionamento. Não existe equivalente DSS para substituir esta infraestrutura |

---

## 11. Matriz de Composição DSS

### Papel Estrutural
DssDialog é um **orquestrador de slots** — fornece a estrutura (header, body, footer) e não instancia filhos automaticamente. Composição é responsabilidade do consumidor.

### Componentes Recomendados nos Slots

#### #header
- **DssButton** (icon="close", flat, round) — botão fechar
- **DssIcon** — ícone de status (info, warning, error)
- Texto nativo `<h2>` ou `<h3>` com estilos via classes utilitárias DSS

#### #default (body)
- **DssInput**, **DssSelect**, **DssTextarea** — formulários
- **DssCard** — sub-painéis de conteúdo
- **DssSpinner** — indicador de loading
- **DssList** + **DssItem** — listas de opções
- Texto nativo com classes utilitárias DSS

#### #footer
- **DssButton** (variant="flat") — ação secundária/cancelar
- **DssButton** (color="hub|water|waste") — ação primária/confirmar
- Sequência recomendada: Cancelar (esquerda) → Confirmar (direita)

### Anti-patterns
- ❌ Usar HTML nativo (`<button>`, `<input>`) quando existe versão DSS
- ❌ Sobrescrever estilos internos de filhos DSS com `::v-deep`
- ❌ Aninhar mais de 2 níveis de DssDialog
- ❌ Misturar QBtn, QInput nativos com componentes DSS
- ❌ Criar dependência estrutural obrigatória (filhos hardcoded no template)

---

## 12. Governança de Lacunas

| Componente Ausente | Criticidade | Decisão |
|--------------------|-------------|---------|
| `DssTypography` | Não crítica | Consumidores usam classes utilitárias DSS ou elementos HTML semânticos (`<h2>`, `<p>`) |
| `DssBackdrop` | Não crítica | Backdrop gerenciado internamente pelo QDialog |
| `DssToast` / `DssSnackbar` | Decorativa | Fora do escopo do DssDialog — componentes distintos |

---

## 13. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-11 | Claude Code | Criação inicial — Fase 2 Nível 1 |
