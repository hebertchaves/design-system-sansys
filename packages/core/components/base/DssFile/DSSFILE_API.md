# DssFile — API Reference

**Versão DSS**: 2.4.0 | **Componente**: DssFile | **Status**: pending-audit

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `File \| File[] \| null` | `null` | Arquivo(s) selecionado(s) (v-model). `null` quando vazio. |
| `multiple` | `boolean` | `false` | Habilita seleção de múltiplos arquivos. |
| `accept` | `string` | `undefined` | Tipos de arquivo aceitos. MIME types (`image/*`, `application/pdf`) ou extensões (`.pdf,.doc`). |
| `maxFiles` | `number` | `undefined` | Número máximo de arquivos. Apenas com `multiple=true`. Emite `rejected` ao exceder. |
| `maxFileSize` | `number` | `undefined` | Tamanho máximo em bytes por arquivo. `5242880` = 5MB. Emite `rejected` ao exceder. |
| `variant` | `FileVariant` | `'outlined'` | Variante visual: `outlined`, `filled`, `standout`, `borderless`. |
| `dense` | `boolean` | `false` | Modo compacto — `min-height: var(--dss-input-height-sm)` (36px). |
| `brand` | `FileBrand \| null` | `null` | Marca Sansys (`hub`, `water`, `waste`). Aplica accent color no foco e drag-drop. |
| `label` | `string` | `''` | Label flutuante do campo. |
| `stackLabel` | `boolean` | `false` | Label sempre visível no topo (não flutua). |
| `placeholder` | `string` | `''` | Texto exibido na área de drop quando vazio. Padrão: `'Clique ou arraste arquivos aqui'`. |
| `hint` | `string` | `''` | Texto de ajuda abaixo do campo. |
| `errorMessage` | `string` | `''` | Mensagem de erro. Exibida quando `error=true`. |
| `error` | `boolean` | `false` | Estado de erro. Aplica `--dss-feedback-error` com prioridade absoluta. |
| `disabled` | `boolean` | `false` | Campo desabilitado. `opacity: var(--dss-opacity-disabled)`, `pointer-events: none`. |
| `readonly` | `boolean` | `false` | Campo somente leitura. Borda tracejada, sem interação. |
| `clearable` | `boolean` | `false` | Exibe botão `×` quando há arquivo selecionado. |
| `ariaLabel` | `string` | `undefined` | Label acessível para screen readers. Sobrescreve label visual. |
| `clearAriaLabel` | `string` | `'Remover arquivo selecionado'` | Label do botão de limpar para screen readers. |
| `tabindex` | `number \| string \| null` | `null` | Tabindex customizado. `-1` = não focável. |

---

## Tipos

### `FileVariant`
```typescript
type FileVariant = 'filled' | 'outlined' | 'standout' | 'borderless'
```

### `FileBrand`
```typescript
type FileBrand = 'hub' | 'water' | 'waste'
```

### `modelValue`
```typescript
// Modo simples (multiple=false)
modelValue: File | null

// Modo múltiplo (multiple=true)
modelValue: File[] | null
```

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `File \| File[] \| null` | Emitido quando a seleção muda (v-model). |
| `add` | `{ files: readonly File[]; index: number }[]` | Arquivo(s) adicionado(s) à seleção. |
| `remove` | `{ files: readonly File[]; index: number }[]` | Arquivo removido da seleção. |
| `rejected` | `{ failedPropValidation: string; file: File }[]` | Arquivo(s) rejeitado(s). `failedPropValidation`: `'accept'`, `'max-file-size'`, `'max-files'`. |
| `focus` | `FocusEvent` | Campo recebeu foco. |
| `blur` | `FocusEvent` | Campo perdeu foco. |
| `clear` | — | Seleção limpa via botão clear. |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `prepend` | Conteúdo à esquerda do campo (ex: ícone de anexo). Renderizado dentro do `.dss-file__prepend`. |
| `append` | Conteúdo à direita (antes do botão clear). Renderizado dentro do `.dss-file__append`. |
| `error` | Mensagem de erro customizada. Substitui `errorMessage` quando fornecido. |
| `hint` | Texto de ajuda customizado. Substitui `hint` quando fornecido. |

---

## Expose (ref)

```typescript
const fileRef = ref<FileExpose | null>(null)

// Abrir seletor nativo
fileRef.value?.pickFiles()

// Remover arquivo
fileRef.value?.removeAtIndex(0)
fileRef.value?.removeFile(file)

// Foco programático
fileRef.value?.focus()
fileRef.value?.blur()
```

---

## Props QFile NÃO expostas (Fase 1)

| Prop QFile | Justificativa |
|------------|---------------|
| `color` | Governança de cor via tokens DSS. Expor `color` quebraria Token First. |
| `dark` | Dark mode via `[data-theme="dark"]` — governado pelo DSS, não pelo componente. |
| `filled`, `outlined`, `standout`, `borderless` | Substituídos pela prop `variant`. |
| `bottom-slots`, `hide-bottom-space` | Gerenciados internamente pelo DssFile. |
| `counter` | Não previsto na Fase 1. |

---

## Tokens Utilizados (40)

| Categoria | Tokens |
|-----------|--------|
| Dimensão | `--dss-input-height-md`, `--dss-input-height-sm` |
| Espaçamento | `--dss-spacing-1`, `--dss-spacing-2`, `--dss-spacing-3`, `--dss-spacing-4`, `--dss-spacing-5`, `--dss-spacing-6` |
| Tipografia | `--dss-font-family-sans`, `--dss-font-size-sm`, `--dss-font-size-md`, `--dss-font-size-xl`, `--dss-font-weight-medium`, `--dss-line-height-normal` |
| Cor texto | `--dss-text-primary`, `--dss-text-secondary`, `--dss-text-hint`, `--dss-text-disabled` |
| Cor feedback | `--dss-feedback-error`, `--dss-action-primary` |
| Superfície | `--dss-surface-default`, `--dss-surface-hover` |
| Bordas | `--dss-border-width-thin`, `--dss-border-width-md`, `--dss-border-width-thick`, `--dss-radius-md`, `--dss-radius-full`, `--dss-focus-ring` |
| Motion | `--dss-duration-200`, `--dss-duration-300`, `--dss-easing-standard` |
| Estado | `--dss-opacity-disabled` |
| Brand Hub | `--dss-hub-600`, `--dss-hub-700` |
| Brand Water | `--dss-water-500`, `--dss-water-600`, `--dss-water-700` |
| Brand Waste | `--dss-waste-600`, `--dss-waste-700`, `--dss-waste-800` |

---

## CSS Classes Públicas

| Classe | Condição |
|--------|----------|
| `dss-file` | Sempre presente (wrapper root) |
| `dss-file--outlined` | `variant="outlined"` (padrão) |
| `dss-file--filled` | `variant="filled"` |
| `dss-file--standout` | `variant="standout"` |
| `dss-file--borderless` | `variant="borderless"` |
| `dss-file--focused` | Campo com foco |
| `dss-file--filled` | Arquivo selecionado |
| `dss-file--dragging` | Drag ativo sobre o campo |
| `dss-file--error` | `error=true` |
| `dss-file--disabled` | `disabled=true` |
| `dss-file--readonly` | `readonly=true` |
| `dss-file--dense` | `dense=true` |
| `dss-file--brand-hub` | `brand="hub"` |
| `dss-file--brand-water` | `brand="water"` |
| `dss-file--brand-waste` | `brand="waste"` |

---

## Comportamentos Implícitos

### Drag-and-drop

O `QFile` internamente registra event listeners de drag no elemento raiz. O DssFile adiciona `@dragover` e `@dragleave` no wrapper externo para controlar o estado visual `dss-file--dragging`. O drop em si é processado pelo QFile — o DssFile não intercepta o evento `drop`.

**Limitação conhecida**: Em alguns navegadores, `dragleave` dispara ao mover entre elementos filhos. O DssFile usa `event.relatedTarget` para verificar se o cursor realmente saiu do componente antes de desativar `isDragging`.

### Validação de arquivos

A validação (`accept`, `maxFileSize`, `maxFiles`) é delegada ao QFile. Arquivos rejeitados são emitidos via evento `rejected` — o DssFile não exibe erros de rejeição automaticamente. Use o evento `rejected` para definir `error` e `errorMessage` programaticamente.

```vue
<DssFile
  :error="hasError"
  :error-message="errorMsg"
  @rejected="(rej) => { hasError = true; errorMsg = rej[0]?.failedPropValidation }"
/>
```

### Botão de limpar (`clearable`)

O botão `×` emite `update:modelValue` com `null` e o evento `clear`. Não é exibido quando `disabled=true` ou `readonly=true`.

O `clearAriaLabel` padrão é `'Remover arquivo selecionado'`. Em interfaces com múltiplos campos, customize para o contexto: `clearAriaLabel="Remover comprovante"`.
