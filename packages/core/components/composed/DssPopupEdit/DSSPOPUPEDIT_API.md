# DssPopupEdit — API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `unknown` | `undefined` | Valor em edição (via `v-model`). **Não é visibilidade** — controla o dado editado. |
| `title` | `string` | `undefined` | Cabeçalho do popup (usa `.q-item-label--header` do Quasar internamente). |
| `buttons` | `boolean` | `true` | Exibe botões de Salvar/Cancelar. Padrão DSS é `true` para ação explícita. |
| `labelSet` | `string` | `'Salvar'` | Rótulo do botão de confirmação. |
| `labelCancel` | `string` | `'Cancelar'` | Rótulo do botão de cancelamento. |
| `persistent` | `boolean` | `false` | Impede fechamento via clique externo ou tecla ESC. |
| `fit` | `boolean` | `false` | Popup herda a largura do elemento pai hospedeiro. |
| `cover` | `boolean` | `false` | Popup cobre o elemento pai hospedeiro. |
| `anchor` | `string` | `undefined` | Posição de ancoragem relativa ao elemento pai (`'top left'`, `'bottom right'`, etc.). |
| `self` | `string` | `undefined` | Auto-alinhamento do popup (`'top left'`, `'bottom right'`, etc.). |
| `offset` | `[number, number]` | `undefined` | Deslocamento em pixels `[horizontal, vertical]`. |
| `maxHeight` | `string` | `undefined` | Altura máxima com rolagem interna (ex: `'300px'`). |
| `maxWidth` | `string` | `undefined` | Largura máxima (ex: `'400px'`). |
| `autoSave` | `boolean` | `false` | Salva automaticamente ao perder o foco (sem clicar em "Salvar"). |
| `validate` | `(value: unknown) => boolean \| string` | `undefined` | Função de validação. Retorna `true` para válido ou `string` de erro. |
| `touchPosition` | `boolean` | `false` | Ancora o popup na posição do toque (mobile). |
| `disable` | `boolean` | `false` | Desabilita a abertura do popup ao clicar no elemento pai. |

## Props bloqueadas (não repassadas ao QPopupEdit)

| Prop Quasar | Motivo do bloqueio |
|-------------|-------------------|
| `dark` | Tema escuro governado globalmente via `[data-theme="dark"]` |

## Emits

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `value: unknown` | Emitido ao confirmar edição. Sincroniza o v-model. |
| `save` | `value: unknown, initialValue: unknown` | Emitido ao clicar em "Salvar". Carrega o novo valor e o valor original. |
| `cancel` | — | Emitido ao clicar em "Cancelar". O valor original é restaurado. |
| `show` | — | Emitido após o popup terminar de aparecer. |
| `hide` | — | Emitido após o popup terminar de desaparecer. |
| `before-show` | — | Emitido antes do popup iniciar abertura. |
| `before-hide` | — | Emitido antes do popup iniciar fechamento. |

## Slots

| Slot | Escopo | Descrição |
|------|--------|-----------|
| `default` | — | Conteúdo do formulário de edição. Use `DssInput`, `DssSelect`, `DssCheckbox`, etc. |

## Métodos Expostos

| Método | Descrição |
|--------|-----------|
| `set()` | Confirma a edição programaticamente (equivalente a clicar em "Salvar"). |
| `cancel()` | Cancela a edição programaticamente (equivalente a clicar em "Cancelar"). |

```vue
<DssPopupEdit ref="popupRef" v-model="valor">...</DssPopupEdit>

<!-- Programático -->
<script setup>
const popupRef = ref()
popupRef.value.set()    // confirma
popupRef.value.cancel() // cancela
</script>
```

## Mapeamento Quasar → DSS

| Prop QPopupEdit | Prop DssPopupEdit | Alteração |
|-----------------|-------------------|-----------|
| `model-value` | `modelValue` | Sem alteração — valor editado (não visibilidade) |
| `title` | `title` | Sem alteração |
| `buttons` | `buttons` | **Padrão alterado**: Quasar `false` → DSS `true` |
| `label-set` | `labelSet` | Sem alteração — padrão DSS `'Salvar'` |
| `label-cancel` | `labelCancel` | Sem alteração — padrão DSS `'Cancelar'` |
| `persistent` | `persistent` | Sem alteração |
| `fit` | `fit` | Sem alteração |
| `cover` | `cover` | Sem alteração |
| `anchor` | `anchor` | Sem alteração |
| `self` | `self` | Sem alteração |
| `offset` | `offset` | Sem alteração |
| `max-height` | `maxHeight` | Sem alteração |
| `max-width` | `maxWidth` | Sem alteração |
| `auto-save` | `autoSave` | Sem alteração |
| `validate` | `validate` | Sem alteração |
| `touch-position` | `touchPosition` | Sem alteração |
| `disable` | `disable` | Sem alteração |
| `dark` | **Bloqueada** | Modo escuro via `[data-theme="dark"]` |

## Tokens Utilizados

| Categoria | Token | Valor |
|-----------|-------|-------|
| Superfície | `--dss-surface-default` | #ffffff |
| Sombra | `--dss-elevation-3` | `var(--dss-shadow-lg)` |
| Forma | `--dss-radius-md` | 8px |
| Espaçamento | `--dss-padding-4` | 16px |
| Espaçamento | `--dss-padding-3` | 12px |
| Espaçamento | `--dss-spacing-2` | 8px |
| Borda | `--dss-gray-100` | separadores internos |
| Borda | `--dss-gray-200` | separadores dark mode |
| Borda | `--dss-border-width-thin` | 1px |
| Borda | `--dss-border-width-md` | 2px |
| Tipografia | `--dss-font-family-sans` | — |
| Tipografia | `--dss-text-body` | cor do cabeçalho |
| Brand Hub | `--dss-hub-primary` | acento rodapé |
| Brand Water | `--dss-water-primary` | acento rodapé |
| Brand Waste | `--dss-waste-primary` | acento rodapé |

## Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-Gate-01 | `<q-popup-edit>` no template | `1-structure/DssPopupEdit.ts.vue` | Gate de Composição v2.4 — Rule 1. QPopupEdit fornece mecanismo de posicionamento, teleport via QMenu e gerenciamento de estado de edição sem equivalente DSS. |
| EXC-Gate-02 | Seletor global `.q-popup-edit` no CSS | `2-composition/_base.scss` | QPopupEdit não expõe `popup-content-class` ou equivalente — impossível injetar classe DSS no container teleportado. CSS global é a única estratégia disponível. Precedente: DssMenu (targeting `.q-menu`). |
| EXC-01 | `background-color: !important`, `box-shadow: !important` | `2-composition/_base.scss` | QPopupEdit aplica estilos via QCard com especificidade CSS superior. `!important` necessário para que `--dss-surface-default` e `--dss-elevation-3` prevaleçam. Precedente: DssDialog (EXC-01), DssMenu (EXC-01). |
| EXC-02 | `min-width: 180px` | `2-composition/_base.scss` | Não existe token DSS para largura mínima de popup inline. 180px garante conteúdo mínimo usável com DssInput e rótulo. |
