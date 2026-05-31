# DssBanner — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssBanner` é um componente de faixa de notificação que exibe mensagens
informativas, de sucesso, de aviso ou de erro de forma proeminente. Funciona como wrapper
DSS governado sobre o `QBanner` do Quasar.

**Quando usar:**
- Feedback global ou seccional (ex.: aviso de manutenção no topo da página)
- Confirmação de operações concluídas em nível de seção
- Alertas persistentes que o usuário precisa reconhecer
- Erros de validação em nível de formulário (não de campo individual)
- Comunicações importantes que devem permanecer visíveis enquanto a situação persistir

**Quando NÃO usar:**
- Interações que bloqueiam o fluxo principal → use `DssDialog`
- Notificações temporárias e auto-descartáveis → use `QNotify` (Toast)
- Feedback de campo individual → use prop `error` do `DssInput`
- Pop-ups contextuais → use `DssMenu` ou `DssPopupProxy`

---

## 2. Classificação DSS

- **Tipo:** Informativo / Feedback
- **Categoria:** Notificações e Alertas
- **Fase:** 2 — Nível 1 (Independente)
- **Família:** Notificações e Alertas
- **Interativo:** Não (o banner root não é interativo; botões internos podem ser)
- **Motor:** `QBanner` (EXC-Gate-01)
- **Golden Reference:** `DssBadge`
- **Golden Context:** `DssBadge`

---

## 3. Declaração DSS × Quasar

- **Quasar** = camada de execução (`QBanner` fornece estrutura grid e comportamento de layout)
- **DSS** = camada de governança, semântica e tokenização

O `DssBanner` **diverge** da API do `QBanner` em alguns pontos:
- Adiciona `variant` para semântica de feedback (ausente no Quasar)
- Adiciona `dismissible` e `dismiss` para controle padronizado de descarte
- Adiciona `icon` com ícones padrão por variante
- **Remove** a prop `avatar` do QBanner em favor do slot `avatar`

---

## 4. API

### Props
*(ver DSSBANNER_API.md — seção Props)*

### Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `() => VNode` | Conteúdo principal (mensagem, HTML rico) |
| `avatar` | `() => VNode` | Área de ícone. Sobrescreve a prop `icon` |
| `actions` | `() => VNode` | Ações personalizadas. Sobrescreve o botão fechar padrão |

### Events

| Event | Payload | Disparado quando |
|-------|---------|------------------|
| `dismiss` | — | Usuário clica no botão fechar (`dismissible=true`) |

---

## 5. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| `variant="default"` | ✅ | Fundo neutro, borda cinza |
| `variant="info"` | ✅ | Fundo azul claro, borda azul |
| `variant="success"` | ✅ | Fundo verde claro, borda verde |
| `variant="warning"` | ✅ | Fundo amarelo claro, borda amarela |
| `variant="error"` | ✅ | Fundo vermelho claro, borda vermelha |
| `dismissible` | ✅ | Botão fechar via DssButton |
| `dense` | ✅ | Padding reduzido via QBanner |
| `rounded` | ✅ | Bordas arredondadas via QBanner |
| hover | ❌ N/A | Componente não-interativo |
| active | ❌ N/A | Componente não-interativo |
| focus | ❌ N/A | Banner root não é focável |
| loading | ❌ N/A | Componente de exibição estática |
| disabled | ❌ N/A | Sem semântica de disabled para banners |

---

## 6. Tokens Utilizados

*(Lista exata — 1:1 com o SCSS. Todos existem no DSS_TOKEN_REFERENCE.md)*

### Tipografia
- `--dss-font-family-sans`
- `--dss-font-size-md`
- `--dss-font-weight-normal`
- `--dss-line-height-md`

### Espaçamento
- `--dss-padding-4` (16px — padding padrão)
- `--dss-padding-2` (8px — padding dense)
- `--dss-gap-3` (12px — gap ícone ↔ conteúdo)
- `--dss-spacing-0_5` (2px — ajuste top ícone)

### Bordas
- `--dss-border-width-heavy` (4px — borda esquerda acento)

### Cores de Texto
- `--dss-text-body` (texto principal)

### Superfícies
- `--dss-surface-default` (fundo base)
- `--dss-surface-subtle` (fundo variant default)
- `--dss-surface-brand-light` (fundo brand)

### Feedback
- `--dss-feedback-info` + `--dss-feedback-info-deep` + `--dss-feedback-info-surface`
- `--dss-feedback-success` + `--dss-feedback-success-deep` + `--dss-feedback-success-surface`
- `--dss-feedback-warning` + `--dss-feedback-warning-deep` + `--dss-feedback-warning-surface`
- `--dss-feedback-error` + `--dss-feedback-error-deep` + `--dss-feedback-error-surface`

### Neutros
- `--dss-gray-300` (borda default)
- `--dss-gray-700` (borda default em high-contrast)

### Marca
- `--dss-hub-600`, `--dss-water-500`, `--dss-waste-600`

### Motion
- `--dss-duration-250`
- `--dss-easing-standard`

---

## 7. Acessibilidade

- **WCAG 2.1 AA**: Conformidade total.
- **Role ARIA:**
  - `role="status"` + `aria-live="polite"` → variantes `default`, `info`, `success`
  - `role="alert"` + `aria-live="assertive"` → variantes `warning`, `error`
- **Touch target:** N/A — componente não-interativo. Botões internos (DssButton) têm seus próprios touch targets.
- **Contraste de cores:** Texto usa `--dss-text-body` (escuro) sobre superfícies de feedback (10% de opacidade sobre branco) — proporção ≥ 12:1 em fundo claro.
- **Ícones decorativos:** `aria-hidden="true"` no `DssIcon` interno.
- **Botão fechar:** `aria-label` obrigatório (padrão `"Fechar"`, customizável via `dismissLabel`).
- **Navegação por teclado:** O banner root não recebe foco. Botões e links internos são focáveis normalmente.
- **Anúncio dinâmico:** Quando inserido na árvore DOM dinamicamente, `aria-live` garante que leitores de tela anunciem o conteúdo.

---

## 8. Comportamentos Implícitos

| Comportamento | Detalhe |
|---------------|---------|
| `inheritAttrs: false` | Atributos extras são encaminhados para o `QBanner` via `v-bind="$attrs"` |
| Ícone padrão | `variant="info/success/warning/error"` sem `icon` → exibe ícone Material Icons padrão |
| Sem ícone no default | `variant="default"` sem `icon` → nenhuma área de avatar é renderizada |
| Slot avatar condicional | O template `#avatar` do QBanner só é inserido quando há ícone ou slot avatar |
| Slot action condicional | O template `#action` do QBanner só é inserido quando `dismissible` ou slot `actions` |

---

## 9. Paridade com Golden Component (DssBadge)

| Aspecto | DssBadge | DssBanner | Justificativa da Divergência |
|---------|----------|-----------|------------------------------|
| `defineOptions({ name })` | ✅ | ✅ | — |
| `inheritAttrs: false` | — | ✅ | Banner recebe `$attrs` para forwarding no QBanner |
| `v-bind="$attrs"` | — | ✅ | Forwarding para QBanner motor |
| Elementos decorativos `aria-hidden` | ✅ | ✅ (`DssIcon`) | — |
| Não-interativo (sem hover/active) | ✅ | ✅ | — |
| `role` semântico | `role="status"` | `role="status"\|"alert"` | Banner tem dois modos ARIA por urgência |
| `aria-live` | `aria-live="polite"` | `"polite"\|"assertive"` | Variantes warning/error exigem `assertive` |
| Token First | ✅ | ✅ | — |
| Sem `::before` touch target | ✅ | ✅ | Ambos não-interativos |
| Brand variants | ✅ | ✅ (apenas `default`) | Variantes semânticas têm precedência sobre marca |
| `prefers-contrast: more` | ❌ | ✅ | Banner tem bordas que requerem reforço de contraste |

---

## 10. Matriz de Composição DSS

### Papel Estrutural
O `DssBanner` é uma **superfície de notificação**. Ele fornece o contêiner visual e semântico;
o conteúdo e as ações são responsabilidade do consumidor via slots.

### Componentes DSS Recomendados (internos)
- `DssIcon` — slot `avatar` (automático via prop `icon`)
- `DssButton` — slot `actions` (automático via `dismissible`)

### Anti-Patterns de Composição
- ❌ Usar `<q-banner>` sem wrapper DSS dentro de componentes DSS
- ❌ Aninhar `DssBanner` dentro de outro `DssBanner`
- ❌ Usar `DssBanner` em substituição a `DssDialog` para conteúdo que exige confirmação
- ❌ Aninhar `DssBanner` em modais (use `DssDialog` com slot de conteúdo)
- ❌ Aplicar `v-show` no `DssBanner` — prefira `v-if` para que o ARIA anuncie corretamente a inserção

---

## 11. Exceções Registradas

| ID | Tipo | Local | Justificativa |
|----|------|-------|---------------|
| `EXC-Gate-01` | Gate de Composição | `2-composition/_base.scss` | `.q-banner__avatar/content/actions` para layout interno do QBanner |
| `EXC-Gate-02` | Gate de Composição | `3-variants/_variant.scss` | `.dss-banner.q-banner--dense` para modo compacto |
| `EXC-States-01` | Estado | `4-output/_states.scss` | `ButtonText` em `forced-colors: active` |
| `EXC-04` | Print | `4-output/_states.scss` | `!important` em `@media print` |
| `EX-Color-01` | Cor | `_base.scss + _variant.scss` | CSS custom property `--dss-banner-icon-color` para cascata sem `:deep()` |

---

## 12. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-20 | Claude Code | Criação inicial — Fase 2 Nível 1 |
