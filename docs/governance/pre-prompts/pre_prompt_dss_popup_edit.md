# Pré-prompt: DssPopupEdit

> **Status de governança:** Corrigido em 11 Mai 2026 — retroativo à auditoria v2.5
> **Correções aplicadas:** GAP-01 (tokens fantasma removidos), GAP-02 (semântica do v-model corrigida), Golden Context declarado

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
**DssChip** — componente interativo (estratégia Opção A para componentes com touch target)

### Golden Context
**DssMenu** — ambos são overlays teleportados via QMenu interno que requerem CSS global para estilizar o container (`.q-menu`, `.q-popup-edit`). O DssPopupEdit segue o mesmo padrão arquitetural: usa `EXC-Gate-01` (motor Quasar direto sem equivalente DSS) e `EXC-Gate-02` (ausência de `popup-content-class`, CSS global obrigatório).

### Classificação DSS
- **Tipo:** Overlay de Edição Inline
- **Categoria:** Overlays e Dialogs — Fase 2 Nível 1 (Independente)
- **Interatividade na raiz:** NÃO — o DssPopupEdit não é interativo na raiz. A interatividade pertence ao elemento pai hospedeiro (gatilho de clique) e aos filhos dentro do slot (DssInput, DssButton).
- **Abertura:** Controlada pelo clique no elemento pai hospedeiro — diferente de DssDialog que usa `v-model:open` booleano.

### Justificativa
O DssPopupEdit padroniza o padrão de edição inline contextual sobre `QPopupEdit` do Quasar. Permite edição rápida de valores em tabelas, listas e formulários sem navegar para outra tela. Seu diferencial em relação ao DssDialog é que opera diretamente sobre o elemento que contém o dado, preservando contexto visual. O DSS padroniza botões Salvar/Cancelar por padrão (`buttons: true`), contra o padrão Quasar (`buttons: false`), para garantir que o usuário sempre tenha controle explícito sobre o salvamento.

---

## 2. DECISÃO ARQUITETURAL CRÍTICA — v-model

> ⚠️ **Diferença fundamental em relação ao DssDialog:**

| | DssDialog | DssPopupEdit |
|---|---|---|
| `v-model` controla | **Visibilidade** (Boolean: true = aberto) | **Valor em edição** (qualquer tipo: string, number…) |
| Abertura | `v-model:open="true"` programático | Clique no **elemento pai hospedeiro** |
| Fechamento | `v-model:open="false"` | Botão Salvar / Cancelar / ESC / clique fora |

O `v-model` do DssPopupEdit **nunca é Boolean de visibilidade**. Ele carrega o valor sendo editado. O QPopupEdit gerencia internamente a abertura/fechamento via QMenu interno.

---

## 3. RISCOS ARQUITETURAIS E GATES

### EXC-Gate-01 — Motor QPopupEdit direto
DssPopupEdit usa `<q-popup-edit>` diretamente no template. Não existe equivalente DSS para infraestrutura de edição inline (posicionamento via QMenu interno, gerenciamento de valor, eventos save/cancel). Toda a UI do popup é construída via slot default com conteúdo DSS.

### EXC-Gate-02 — Ausência de popup-content-class (único no DSS)
`QPopupEdit` **não expõe** `popup-content-class` ou equivalente. Impossível injetar classe DSS no container `.q-popup-edit` teleportado. CSS global com seletor `.q-popup-edit` é a única estratégia disponível. Este é o **único componente DSS nessa condição** — todos os outros overlays teleportados (DssMenu, DssBtnDropdown, DssSelect) usam `popup-content-class`.

### EXC-01 — !important obrigatório em 4 propriedades
QPopupEdit aplica `background`, `box-shadow`, `border-radius` e `padding` via `.q-card` interno com especificidade CSS superior. `!important` é necessário nas 4 propriedades para que os tokens DSS prevaleçam:
```scss
.q-popup-edit {
  background-color: var(--dss-surface-default) !important;
  box-shadow: var(--dss-elevation-3) !important;
  border-radius: var(--dss-radius-md) !important;
  padding: 0 !important;
}
```

### EXC-02 — min-width hardcoded
Não existe token DSS para largura mínima de popup inline. `min-width: 180px` hardcoded garante conteúdo mínimo usável.

### Outros riscos
- **buttons: true DSS default** — Quasar padrão é `false` (fecha ao qualquer clique). DSS força `true` (Salvar/Cancelar explícitos). Documentar no JSDoc.
- **validate prop** — pode bloquear o fechamento se retornar false. Testar integração com DssInput.
- **CSS global** — seletor `.q-popup-edit` afeta toda a aplicação. Garantir especificidade mínima necessária.

---

## 4. MAPEAMENTO DE API (QPopupEdit → DSS)

### Propriedades

| Prop DSS | Tipo | Padrão DSS | Padrão Quasar | Notas |
|---|---|---|---|---|
| `modelValue` | `unknown` | — | — | **VALOR EM EDIÇÃO** (não visibilidade). v-model bidirecional com o dado. |
| `title` | `string` | `undefined` | — | Título opcional do popup. Renderiza `.q-item-label--header`. |
| `buttons` | `boolean` | **`true`** | `false` | DSS força `true` — Salvar/Cancelar sempre explícitos. |
| `labelSet` | `string` | `'Salvar'` | `'Set'` | Label do botão de confirmação. |
| `labelCancel` | `string` | `'Cancelar'` | `'Cancel'` | Label do botão de cancelamento. |
| `persistent` | `boolean` | `false` | `false` | Impede fechamento por clique fora e ESC. |
| `fit` | `boolean` | `false` | `false` | Popup assume a largura do elemento pai. |
| `cover` | `boolean` | `false` | `false` | Popup cobre o elemento pai. |
| `validate` | `() => boolean` | `undefined` | — | Callback de validação. Retornar `false` bloqueia salvamento. |
| `maxHeight` | `string` | `undefined` | — | Altura máxima do popup (e.g., `'30vh'`). |
| `maxWidth` | `string` | `undefined` | — | Largura máxima do popup. |
| `autoSave` | `boolean` | `false` | `false` | Salvar automaticamente ao mudar o valor. |
| `touchPosition` | `boolean` | `false` | `false` | Posicionar o popup na posição do toque. |
| `disable` | `boolean` | `false` | `false` | Desabilita a abertura do popup. |
| `color` | `string` | `undefined` | `'primary'` | Cor dos botões padrão (Salvar/Cancelar). |
| `offset` | `[number, number]` | `undefined` | `[10, 10]` | Offset de posicionamento `[x, y]`. |
| `anchor` | `string` | `undefined` | `'bottom left'` | Ponto de ancoragem no pai. |
| `self` | `string` | `undefined` | `'top left'` | Ponto de origem do popup. |

### Slots

| Slot | Descrição |
|---|---|
| `default` | Conteúdo de edição — DssInput, DssSelect, etc. com `autofocus`. |
| `buttons` | Customização dos botões de ação (substitui os padrões Salvar/Cancelar). |

### Eventos

| Evento | Assinatura | Descrição |
|---|---|---|
| `update:modelValue` | `(value: unknown) => void` | Atualiza o valor v-model durante edição. |
| `save` | `(value: unknown, initialValue: unknown) => void` | Emitido ao confirmar. Recebe valor final **e** valor inicial (dois args — obrigatório arrow function). |
| `cancel` | `() => void` | Emitido ao cancelar. |
| `beforeShow` | `() => void` | Antes do popup abrir. |
| `show` | `() => void` | Após o popup abrir. |
| `hide` | `() => void` | Após o popup fechar. |
| `escape` | `() => void` | Emitido ao pressionar ESC. |

> **Atenção crítica no evento @save:** O QPopupEdit emite `(value, initialValue)` com **dois argumentos**. Deve ser capturado com arrow function:
> ```vue
> @save="(val, initVal) => emit('save', val, initVal)"
> ```
> Nunca usar `$event` (captura apenas o primeiro argumento).

### Expose

```typescript
interface DssPopupEditExpose {
  set: () => void    // Abre o popup programaticamente
  cancel: () => void // Fecha o popup sem salvar
}
```

---

## 5. GOVERNANÇA DE TOKENS E CSS

### Tokens Reais Utilizados na Implementação

| Token | Uso |
|---|---|
| `--dss-surface-default` | `background-color` do container popup (`!important`) |
| `--dss-elevation-3` | `box-shadow` (elevação do popup — `!important`) |
| `--dss-radius-md` | `border-radius` (`!important`) |
| `--dss-padding-4` | Padding horizontal e do header (16px) |
| `--dss-padding-3` | Padding inferior do rodapé de botões (12px) |
| `--dss-spacing-2` | `gap` entre botões, padding topo de botões (8px) |
| `--dss-gray-100` | `border-color` dos separadores internos (header/buttons) |
| `--dss-gray-200` | Borda em `prefers-contrast: more` |
| `--dss-border-width-thin` | Espessura dos separadores |
| `--dss-border-width-md` | Borda no modo alto-contraste |
| `--dss-font-family-sans` | Tipografia do popup |
| `--dss-text-body` | Cor do texto do título no header |
| `--dss-hub-primary` | Cor de borda de botões (brand Hub) |
| `--dss-water-primary` | Cor de borda de botões (brand Water) |
| `--dss-waste-primary` | Cor de borda de botões (brand Waste) |

### ⛔ Tokens Fantasma (NÃO USAR — não existem no DSS)

| Token fantasma | Substituto real |
|---|---|
| `--dss-spacing-16` | `--dss-padding-4` (16px) |
| `--dss-border-default` | `--dss-gray-100` (separador sutil) ou `--dss-gray-200` (borda) |
| `--dss-shadow-md` | `--dss-elevation-3` |
| `--dss-text-default` | `--dss-text-body` |
| `--dss-text-subtle` | `--dss-text-body` (não existe variante "subtle" confirmada) |

> ⚠️ **NUNCA inventar tokens.** Todos os tokens devem existir em `DSS/tokens/semantic/`. Em caso de dúvida, usar `mcp__dss__query_token` para verificar.

### CSS Global (não scoped)

O SCSS do DssPopupEdit **não pode usar `<style scoped>`** nem `@use` de escopo. O container `.q-popup-edit` é teleportado para fora da árvore Vue — seletores escopados não alcançarão o popup.

**Estrutura correta:**
```scss
// DssPopupEdit.module.scss → global, sem scope
.q-popup-edit {
  // Estilos do container teleportado
}
```

**Brand via ancestral:**
```scss
// [data-brand] no ancestral comum — filhos e popup herdam
[data-brand='hub'] .q-popup-edit .q-popup-edit__buttons {
  border-top-color: var(--dss-hub-primary);
}
```

---

## 6. ACESSIBILIDADE E ESTADOS

### Interatividade — Opção B (não-interativo na raiz)

O DssPopupEdit aplica **Opção B** de touch target (não implementa `::before`). A interatividade pertence ao elemento pai hospedeiro (gatilho de clique). Documentar explicitamente.

### Estados Aplicáveis
- `open` — popup visível
- `closed` — popup oculto (estado padrão)
- `persistent` — não fecha ao clicar fora / ESC
- `disabled` — popup não abre
- `with-title` — header com título visível
- `with-buttons` — rodapé com Salvar/Cancelar

### Estados NÃO Aplicáveis (documentar)
- `hover` — N/A: DssPopupEdit não é controle interativo no root
- `focus` — N/A: pertence aos filhos (DssInput, DssButton) via slot
- `active` — N/A: não interativo no root
- `loading` — N/A: usar DssSpinner dentro do slot quando necessário
- `error` — N/A: usar DssInput com validação ou prop `validate` do QPopupEdit

### Acessibilidade
- **Navegação por teclado:** ESC fecha o popup (gerenciado pelo QPopupEdit)
- **Foco:** Move automaticamente para o primeiro elemento do slot ao abrir
- **forced-colors:** Canvas/CanvasText para superfície, ButtonText para botões
- **prefers-contrast: more** (nunca "high" — valor inválido)
- **forced-color-adjust: none** — **PROIBIDO** (WCAG 1.4.11)
- **prefers-reduced-motion:** Remover transições de abertura

---

## 7. RECOMENDAÇÕES DE COMPOSIÇÃO

```vue
<!-- ✅ Padrão correto: DssPopupEdit dentro do elemento hospedeiro -->
<td>
  {{ text }}
  <DssPopupEdit v-model="text">
    <DssInput v-model="text" autofocus dense />
  </DssPopupEdit>
</td>

<!-- ✅ Com título -->
<DssPopupEdit v-model="value" title="Editar campo">
  <DssInput v-model="value" autofocus />
</DssPopupEdit>

<!-- ✅ Persistente com validação -->
<DssPopupEdit v-model="email" persistent :validate="() => isValidEmail(email)">
  <DssInput v-model="email" type="email" autofocus />
</DssPopupEdit>

<!-- ✅ Brand via ancestral -->
<div data-brand="water">
  <td>
    {{ value }}
    <DssPopupEdit v-model="value">...</DssPopupEdit>
  </td>
</div>
```

### Anti-patterns
- ❌ Não usar QInput, QBtn ou componentes Quasar nativos no slot — usar DssInput, DssButton
- ❌ Não usar DssPopupEdit standalone sem elemento pai hospedeiro (sem gatilho de abertura)
- ❌ Não usar DssPopupEdit para formulários longos (3+ campos) — usar DssDialog
- ❌ Não usar DssPopupEdit para notificações ou alertas — usar DssDialog ou futuro DssToast
- ❌ Não aninhar múltiplos DssPopupEdit (fluxo confuso — redesenhar)

---

## 8. SURFACE DE PLAYGROUND

### Cenários de Uso Corretos

| Cenário | Descrição |
|---|---|
| Edição de célula de tabela | `<td>` hospedeiro, DssInput com autofocus, valor sincronizado via v-model |
| Edição de campo de lista | `<li>` ou `DssItem` hospedeiro, conteúdo de seleção via DssSelect |
| Edição persistente | `persistent: true` para campos críticos (CPF, e-mail confirmado) |
| Brand contextual | `[data-brand="hub"]` no ancestral, popup herda acento visual |
| Validação inline | `validate` prop bloqueando salvamento de e-mail inválido |

### Controles do Playground
- `v-model` — valor em edição (string ou number)
- `title` — título opcional do header
- `buttons` — habilitar/desabilitar padrão (padrão DSS = true)
- `persistent` — impedir fechamento por clique fora
- `fit` — popup assume largura do pai
- `cover` — popup cobre o pai
- `disable` — desabilitar abertura

### Estados a Expor

| Estado | Trigger |
|---|---|
| Fechado (default) | Componente renderizado sem interação |
| Aberto | Clique no elemento pai hospedeiro |
| Com título | Prop `title` fornecida |
| Persistente | Prop `persistent: true` |
| Desabilitado | Prop `disable: true` |
| Brand | `[data-brand="hub/water/waste"]` no ancestral |

---

## 9. REFERÊNCIAS

- **Implementação selada:** `DSS/components/composed/DssPopupEdit/`
- **Selo DSS v2.2:** `DSS/docs/Compliance/seals/DssPopupEdit/DSSPOPUPEDIT_SELO_v2.2.md`
- **Golden Context (DssMenu):** `DSS/components/composed/DssMenu/`
- **Tokens:** `DSS/tokens/semantic/_spacing.scss`, `_elevation.scss`, `_color.scss`
- **Quasar API:** [QPopupEdit](https://quasar.dev/vue-components/popup-edit)
