# DssPopupEdit — Documentação Normativa DSS v2.2

> **Versão**: 1.0.0  
> **Fase**: 2 — Nível 1 (Independente)  
> **Status**: `conformant`  
> **Golden Reference**: DssChip  
> **Golden Context**: DssMenu  
> **Categoria**: Overlay de Edição Inline — Overlays e Dialogs  
> **Motor Quasar**: QPopupEdit  

---

## 1. Propósito e Escopo

O `DssPopupEdit` é um componente de **edição inline contextual** que abre um popup flutuante ao clicar no elemento pai hospedeiro. Permite modificar um valor sem navegar para outra página ou abrir um diálogo modal completo.

### Quando usar

- Edição rápida de uma célula em tabela
- Modificação inline de um campo em lista ou card
- Configurações contextuais com um ou poucos campos
- Corrija um valor sem interromper o fluxo da tarefa principal

### Quando NÃO usar

- Formulários longos (mais de 3–4 campos) → usar `DssDialog`
- Ações destrutivas que precisam de confirmação explícita → usar `DssDialog` com persistent
- Tooltips ou popovers informativos → usar `DssTooltip` ou `DssMenu`
- Notificações transitórias → usar DssToast/DssSnackbar (futuro)

### Diferença fundamental: v-model = valor, não visibilidade

O `v-model` do `DssPopupEdit` controla o **valor em edição**, não a abertura/fechamento do popup. A visibilidade é gerenciada internamente pelo QPopupEdit via clique no elemento pai hospedeiro. Esta é a diferença arquitetural central em relação ao `DssDialog`.

---

## 2. Classificação Arquitetural

| Atributo | Valor |
|----------|-------|
| **Tipo** | Overlay de Edição Inline |
| **Fase** | 2 — Nível 1 (Independente) |
| **Categoria** | Overlays e Dialogs |
| **Interatividade** | Opção B — Não interativo na raiz. O popup não renderiza nada no DOM no estado fechado. O elemento pai hospedeiro é o gatilho de interação. Interatividade interna pertence aos filhos (DssInput, DssButton) via slot. |
| **Golden Reference** | DssChip (interativo) |
| **Golden Context** | DssMenu (overlay teleportado — mesma estratégia de CSS global para seletor `.q-*`) |
| **Motor Quasar** | QPopupEdit (usa QMenu internamente para teleport e posicionamento) |
| **Dependências DSS** | Nenhuma obrigatória. Filhos DSS são responsabilidade do consumidor via slot. |

---

## 3. Touch Target

**Estratégia: Opção B — Não interativo na raiz.**

- `DssPopupEdit` não renderiza nenhum elemento no DOM quando fechado.
- O touch target é responsabilidade do **elemento pai hospedeiro** (ex: `<td>`, `<li>`, `<div>`).
- O consumidor é responsável por garantir área clicável ≥ 48×48px no hospedeiro.
- `::before` não é utilizado no container do popup (correto para Opção B).
- Interatividade interna (DssInput, DssButton no slot) carrega seu próprio touch target (Opção A via DssInput/DssButton).

**Referência**: DssBadge (Golden Reference não interativo).

---

## 4. Acessibilidade

| Critério | Implementação |
|----------|---------------|
| `role="dialog"` | Gerenciado pelo QPopupEdit/QMenu internamente (EXC-Gate-01) |
| `aria-modal` | Gerenciado pelo QMenu interno |
| Foco | Gerenciado pelo QPopupEdit. O foco entra no popup ao abrir. |
| ESC | Fecha o popup (a menos que `persistent: true`). Gerenciado pelo QMenu. |
| `prefers-contrast: more` | Implementado — outline 2px, borders reforçados |
| `forced-colors: active` | Implementado — Canvas, CanvasText, ButtonText |
| `prefers-reduced-motion: reduce` | Implementado — desabilita transições |
| Print | Implementado — popup ocultado em impressão |
| `-webkit-tap-highlight-color` | N/A — sem elemento interativo próprio na raiz |

**Nota**: `forced-color-adjust: none` é **PROIBIDO** (WCAG 1.4.11). Não utilizado.

---

## 5. Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `modelValue` (v-model) | `unknown` | `undefined` | Não | Valor em edição — controla o DADO, não a visibilidade |
| `title` | `string` | `undefined` | Não | Cabeçalho do popup |
| `buttons` | `boolean` | `true` | Não | Exibe botões Salvar/Cancelar |
| `labelSet` | `string` | `'Salvar'` | Não | Rótulo do botão de confirmação |
| `labelCancel` | `string` | `'Cancelar'` | Não | Rótulo do botão de cancelamento |
| `persistent` | `boolean` | `false` | Não | Impede fechamento via backdrop/ESC |
| `fit` | `boolean` | `false` | Não | Popup herda largura do elemento pai |
| `cover` | `boolean` | `false` | Não | Popup cobre o elemento pai |
| `anchor` | `string` | `undefined` | Não | Âncora de posicionamento |
| `self` | `string` | `undefined` | Não | Auto-alinhamento do popup |
| `offset` | `[number, number]` | `undefined` | Não | Deslocamento `[h, v]` em pixels |
| `maxHeight` | `string` | `undefined` | Não | Altura máxima com scroll interno |
| `maxWidth` | `string` | `undefined` | Não | Largura máxima |
| `autoSave` | `boolean` | `false` | Não | Salva ao perder foco (sem clicar em "Salvar") |
| `validate` | `Function` | `undefined` | Não | Validação: retorna `true` ou string de erro |
| `touchPosition` | `boolean` | `false` | Não | Ancora na posição de toque |
| `disable` | `boolean` | `false` | Não | Desabilita abertura do popup |

### Props bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | Tema escuro via `[data-theme="dark"]` |

---

## 6. Emits

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `value: unknown` | Sincroniza o v-model ao confirmar |
| `save` | `value, initialValue` | Emitido ao confirmar — novo valor e valor original |
| `cancel` | — | Emitido ao cancelar — valor original restaurado |
| `show` | — | Popup totalmente visível |
| `hide` | — | Popup totalmente ocultado |
| `before-show` | — | Antes de iniciar abertura |
| `before-hide` | — | Antes de iniciar fechamento |

---

## 7. Slots

| Slot | Escopo | Descrição |
|------|--------|-----------|
| `default` | — | Conteúdo do formulário de edição. Use componentes DSS: DssInput, DssSelect, DssCheckbox, DssToggle. |

---

## 8. Métodos Expostos

| Método | Descrição |
|--------|-----------|
| `set()` | Confirma edição programaticamente |
| `cancel()` | Cancela edição programaticamente |

---

## 9. Estados

### Aplicáveis

| Estado | Descrição |
|--------|-----------|
| Fechado (padrão) | Popup não renderizado. Nenhum elemento visível no DOM. |
| Aberto | Popup visível, flutuante, teleportado para `<body>`. |
| Persistent | Aberto, sem fechamento por backdrop/ESC. |
| Disabled | Popup não abre ao clicar no elemento pai. |

### N/A (não aplicáveis ao container)

| Estado | Justificativa |
|--------|---------------|
| hover | DssPopupEdit não é controle interativo na raiz |
| focus | Foco pertence aos filhos (DssInput, DssButton) no slot |
| active | Não interativo na raiz |
| loading | Usar DssSpinner dentro do slot default quando necessário |
| error | Usar DssInput com validação dentro do slot default |

---

## 10. Tokens

| Categoria | Token | Uso |
|-----------|-------|-----|
| Superfície | `--dss-surface-default` | Background do popup |
| Sombra | `--dss-elevation-3` | box-shadow do popup |
| Forma | `--dss-radius-md` | border-radius do popup |
| Espaçamento | `--dss-padding-4` | padding do cabeçalho e formulário |
| Espaçamento | `--dss-padding-3` | padding do rodapé |
| Espaçamento | `--dss-spacing-2` | gap entre botões, espaçamento interno |
| Borda | `--dss-gray-100` | separador header/form e form/buttons |
| Borda | `--dss-gray-200` | separadores em dark mode |
| Borda | `--dss-border-width-thin` | espessura padrão de bordas (1px) |
| Borda | `--dss-border-width-md` | bordas em alto contraste (2px) |
| Tipografia | `--dss-font-family-sans` | fonte do popup |
| Tipografia | `--dss-text-body` | cor do texto do cabeçalho |
| Brand | `--dss-hub-primary` | acento da borda superior dos botões (Hub) |
| Brand | `--dss-water-primary` | acento da borda superior dos botões (Water) |
| Brand | `--dss-waste-primary` | acento da borda superior dos botões (Waste) |

---

## 11. Exceções Documentadas

| ID | Tipo | Local | Justificativa |
|----|------|-------|---------------|
| EXC-Gate-01 | GateDeComposição | `1-structure/DssPopupEdit.ts.vue` | QPopupEdit fornece mecanismo de posicionamento, teleport e estado de edição sem equivalente DSS. Componente Quasar usado diretamente no template. Precedente: DssDialog (EXC-Gate-01), DssMenu (EXC-Gate-01). |
| EXC-Gate-02 | CSSGlobal | `2-composition/_base.scss` | QPopupEdit não expõe `popup-content-class`. CSS deve selecionar `.q-popup-edit` globalmente — único mecanismo disponível. Precedente: DssMenu (targeting `.q-menu`). |
| EXC-01 | CSSImportant | `2-composition/_base.scss` | `!important` em `background-color` e `box-shadow` para sobrescrever especificidade do QCard interno. Precedente: DssDialog (EXC-01), DssMenu (EXC-01). |
| EXC-02 | HardcodedDimension | `2-composition/_base.scss` | `min-width: 180px` — sem token DSS para largura mínima de popup inline. 180px garante conteúdo usável mínimo. |

---

## 12. Anti-Patterns

❌ Não usar QInput, QBtn ou outros componentes Quasar nativos dentro do slot — use DssInput, DssButton  
❌ Não usar DssPopupEdit standalone sem elemento pai hospedeiro (popup não terá gatilho de abertura)  
❌ Não usar DssPopupEdit como DssDialog (para formulários longos, use DssDialog)  
❌ Não usar DssPopupEdit para notificações ou alertas — use DssDialog ou futuro DssToast  
❌ Não aninhar múltiplos DssPopupEdit (fluxo confuso — redesenhar)  
❌ Não aplicar `forced-color-adjust: none` (proibido — WCAG 1.4.11)  
❌ Não usar `--dss-shadow-md`, `--dss-text-default`, `--dss-border-default` (tokens inexistentes)  

✅ Sempre colocar DssPopupEdit dentro de um elemento pai que serve como gatilho de clique  
✅ Sempre usar `buttons: true` (padrão DSS) para ação explícita do usuário  
✅ Usar `persistent: true` para edições críticas que não devem ser perdidas acidentalmente  
✅ Usar DssInput com `autofocus` no slot para experiência de edição fluida  

---

## 13. Composição Recomendada

```vue
<!-- Edição de célula em tabela com brand -->
<div data-brand="hub">
  <table>
    <tbody>
      <tr>
        <td>
          {{ nome }}
          <DssPopupEdit v-model="nome" title="Editar Nome" @save="onSave">
            <DssInput v-model="nome" dense autofocus label="Nome" />
          </DssPopupEdit>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Com validação -->
<DssPopupEdit
  v-model="email"
  title="Email"
  :validate="(v) => v.includes('@') || 'Email inválido'"
  @save="onEmailSave"
>
  <DssInput v-model="email" type="email" autofocus dense label="Email" />
</DssPopupEdit>

<!-- Persistent com DssSelect -->
<DssPopupEdit v-model="categoria" title="Categoria" persistent>
  <DssSelect v-model="categoria" :options="categorias" dense autofocus />
</DssPopupEdit>
```

---

*Documentação normativa DSS v2.2 — Template 13.1*  
*DssPopupEdit v1.0.0 — Fase 2 Nível 1*
