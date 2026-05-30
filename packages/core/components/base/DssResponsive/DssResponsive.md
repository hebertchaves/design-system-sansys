# DssResponsive — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssResponsive` é um wrapper de utilidade que exibe ou oculta seu conteúdo com base no breakpoint ativo da tela, usando o plugin `Screen` do Quasar como motor reativo. Também expõe o estado do breakpoint como slot scope para que componentes filhos possam reagir ao contexto de tela sem instanciar lógica própria.

**Quando usar:**
- Mostrar componentes alternativos para mobile e desktop (ex.: `DssFab` em mobile, `DssButton` em desktop).
- Ocultar seções de layout desnecessárias em determinados breakpoints.
- Expor o breakpoint atual ao slot para lógica condicional no template.

**Quando NÃO usar:**
- Para ajustes visuais menores de espaçamento ou tamanho de fonte — prefira media queries CSS diretamente nos componentes consumidores.
- Quando a exibição/ocultação pode ser resolvida com classes utilitárias Quasar (`lt-sm`, `gt-md`) sem lógica adicional.
- Para ocultar conteúdo essencial à funcionalidade da página em todos os breakpoints — sempre forneça alternativa acessível.
- Para animações/transições entre estados responsivos — delegue aos componentes filhos ou a utilitários de transição dedicados.

---

## 2. Classificação DSS

- **Tipo:** Utilitário / Wrapper Não-Interativo
- **Categoria:** Layout Auxiliar
- **Fase:** 2 — **Nível 1 (Independente)**
- **Interativo:** Não
- **Golden Reference:** DssBadge (componente não-interativo)
- **Golden Context:** DssLayout (wrapper estrutural sem tokens visuais próprios)

---

## 3. Arquitetura

### Equivalente Quasar

`DssResponsive` não envolve nenhum componente Quasar como root. Ele utiliza `useQuasar()` para acessar `$q.screen` (Screen Plugin) de forma reativa.

| Conceito Quasar | Abstração DSS |
|---|---|
| `$q.screen.xs/sm/md/lg/xl` | `currentBreakpoint` (slot scope + composable) |
| Classes `lt-sm`, `gt-md` | Props `showOn`, `hideOn`, `breakpoint` |
| `QResizeObserver` | Não utilizado — `$q.screen` já é reativo |

### Superfície de Composição DSS

**🟢 Existentes (pode compor via slot):**
- DssButton, DssFab, DssCard, DssChip, DssBadge, DssIcon, DssAvatar
- DssList, DssItem, DssMenu, DssTabs, DssToolbar
- DssInput, DssSelect, DssCheckbox, DssRadio, DssToggle
- Todos os componentes DSS Fase 1 e Fase 2

**🟡 Planejados / Roadmap:**
- DssText, DssGrid — componentes de tipografia/layout DSS ainda não implementados

**⚪ Estruturalmente Esperados mas Inexistentes:**
- Composable público `useDssBreakpoint()` (exportável como utilitário standalone sem wrapper)

### Declaração de Impacto

- Existentes: todos os componentes DSS Fase 1 e 2
- Planejados: DssText, DssGrid
- Inexistentes: composable standalone como utilitário público

Risco se composable não existir: baixo — `useResponsiveState` já é exportado pelo `index.js` e pode ser importado diretamente.

---

## 4. API

### Props
*(ver DSSRESPONSIVE_API.md)*

### Slots
*(ver DSSRESPONSIVE_API.md)*

### Events
Nenhum — `DssResponsive` é container não-emissor.

---

## 5. Comportamentos Implícitos

| Comportamento | Descrição |
|---|---|
| **Remoção do DOM** | Quando não visível, o componente usa `v-if` — o nó é removido do DOM, tornando o conteúdo inacessível a leitores de tela sem necessidade de `aria-hidden`. |
| **Prioridade de props** | `showOn` tem prioridade sobre `hideOn`. Se ambos forem especificados, o slot é exibido apenas quando o breakpoint está em `showOn` E não está em `hideOn`. `breakpoint` é alias de `showOn`. |
| **Sem constraints** | Se nem `showOn`, `hideOn` nem `breakpoint` forem fornecidos, o slot é sempre exibido. |
| **inheritAttrs + forwarding** | `inheritAttrs: false` está declarado. `v-bind="$attrs"` é aplicado no elemento raiz do slot, permitindo forwarding de atributos HTML (class, style, data-*). |
| **Tag configurável** | O elemento wrapper é configurável via prop `tag` (padrão: `'div'`). Use `'section'`, `'aside'`, `'nav'` etc. conforme semântica HTML. |
| **Slot scope sempre tipado** | O slot scope expõe `currentBreakpoint`, `isXs`, `isSm`, `isMd`, `isLg`, `isXl`, `isMobile`, `isDesktop` — todos derivados de `$q.screen` e reativos. |

---

## 6. Estados

| Estado | Implementado | Observação |
|---|---|---|
| hover | ❌ N/A | Não interativo — sem hover |
| focus | ❌ N/A | Não interativo — sem focus |
| active | ❌ N/A | Não interativo — sem active |
| disabled | ❌ N/A | Não interativo — sem disabled |
| loading | ❌ N/A | Não interativo — sem loading |
| `isVisible` | ✅ | Calculado via `$q.screen` + props; controla v-if |
| `currentBreakpoint` | ✅ | Reativo — atualiza em resize |
| `isMobile` | ✅ | `xs` ou `sm` |
| `isDesktop` | ✅ | `md`, `lg` ou `xl` |

---

## 7. Tokens Utilizados

Nenhum. `DssResponsive` é um componente de lógica pura sem output visual próprio. Não utiliza tokens DSS em seus arquivos SCSS.

---

## 8. Acessibilidade

- **Conteúdo oculto:** Usa `v-if` — o nó é removido do DOM quando não visível. Leitores de tela não acessam conteúdo ausente do DOM. Não é necessário `aria-hidden`.
- **Focus:** Nenhum elemento interativo — sem gerenciamento de foco pelo componente. Se elementos interativos forem exibidos/ocultos reativamente, o consumidor é responsável por redirecionar o foco conforme necessário.
- **Touch target:** N/A — não interativo.
- **ARIA:** Nenhum atributo ARIA adicionado pelo componente. Atributos ARIA passados via `$attrs` são encaminhados ao wrapper.
- **WCAG 2.1 AA:** Conforme — o conteúdo oculto não é apenas `display:none`, mas removido do DOM.

---

## 9. Paridade com Golden Component

| Aspecto | DssBadge (Golden Reference) | DssResponsive | Justificativa |
|---|---|---|---|
| `aria-hidden` em elementos decorativos | ✅ (iconografia) | ❌ N/A | Sem elementos decorativos |
| `defineOptions` com `name` | ✅ | ✅ | Idêntico |
| `inheritAttrs: false` + forwarding | ✅ | ✅ | Idêntico |
| `-webkit-tap-highlight-color` | ✅ | ❌ N/A | Não interativo — sem comportamento de tap |
| Touch target `::before` | ✅ | ❌ N/A | Não interativo |
| `focus-visible` | ✅ | ❌ N/A | Não interativo |
| Estado disabled | ✅ | ❌ N/A | Não interativo — sem estado disabled |

---

## 10. Exceções Registradas

Nenhuma. `DssResponsive` não necessita de exceções DSS — não envolve componentes Quasar como root e não aplica estilos.

---

## 11. Anti-patterns de Composição

- ❌ Usar `DssResponsive` para ocultar conteúdo crítico em todos os breakpoints sem alternativa
- ❌ Aninhar `DssResponsive` dentro de outro `DssResponsive` sem necessidade real
- ❌ Usar `DssResponsive` quando media queries CSS resolvem o problema visualmente
- ❌ Passar `showOn` e `hideOn` conflitantes (ex.: breakpoint em ambas as listas) — o resultado é sempre `false`
- ❌ Esperar que o slot scope seja acessível fora do escopo do slot (tipagem correta garante isso)

---

## 12. Changelog

| Versão | Data | Autor | Descrição |
|---|---|---|---|
| 1.0.0 | 2026-05-19 | DSS | Criação inicial — Fase 2 |
