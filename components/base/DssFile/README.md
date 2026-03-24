# DssFile

**Status:** pending-audit | **Versão:** 1.0.0 | **Fase:** 1

**Golden Reference:** DssChip (interativo) | **Golden Context:** DssInput

Componente de seleção de arquivos do Design System Sansys. Wrapper controlado do `QFile` (Quasar) com identidade visual idêntica ao `DssInput`, suporte a drag-and-drop e validação de arquivos.

---

## Quando usar

- Formulários que requerem upload de arquivo(s) pelo usuário
- Campos de anexo em formulários de cadastro, solicitação ou ocorrência
- Seleção de imagens, documentos ou qualquer tipo de arquivo

## Quando NÃO usar

- Para upload automático sem interação do usuário → use serviço de upload direto
- Para drag-and-drop em áreas grandes de página → use componente de Drop Zone dedicado
- Para exibir arquivos já enviados → use lista de anexos, não DssFile

---

## Instalação

```js
import { DssFile } from '@dss/components/base/DssFile'
```

---

## Uso Básico

```vue
<DssFile
  v-model="selectedFile"
  label="Anexar documento"
  accept=".pdf,.doc,.docx"
  clearable
/>
```

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `File \| File[] \| null` | `null` | Arquivo(s) selecionado(s) (v-model) |
| `multiple` | `boolean` | `false` | Permite múltiplos arquivos |
| `accept` | `string` | `undefined` | MIME types ou extensões aceitos |
| `maxFiles` | `number` | `undefined` | Máximo de arquivos (com `multiple`) |
| `maxFileSize` | `number` | `undefined` | Tamanho máximo por arquivo em bytes |
| `variant` | `'outlined' \| 'filled' \| 'standout' \| 'borderless'` | `'outlined'` | Variante visual |
| `dense` | `boolean` | `false` | Modo compacto (36px) |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca Sansys |
| `label` | `string` | `''` | Label flutuante |
| `stackLabel` | `boolean` | `false` | Label sempre no topo |
| `placeholder` | `string` | `''` | Texto na área de drop |
| `hint` | `string` | `''` | Texto de ajuda |
| `errorMessage` | `string` | `''` | Mensagem de erro |
| `error` | `boolean` | `false` | Estado de erro |
| `disabled` | `boolean` | `false` | Desabilitado |
| `readonly` | `boolean` | `false` | Somente leitura |
| `clearable` | `boolean` | `false` | Botão de limpar |
| `ariaLabel` | `string` | `undefined` | Label acessível customizado |
| `clearAriaLabel` | `string` | `'Remover arquivo selecionado'` | Label do botão de limpar |
| `tabindex` | `number \| string \| null` | `null` | Tabindex customizado |

---

## Eventos

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `update:modelValue` | `File \| File[] \| null` | v-model |
| `add` | `{ files, index }[]` | Arquivo(s) adicionado(s) |
| `remove` | `{ files, index }[]` | Arquivo removido |
| `rejected` | `{ failedPropValidation, file }[]` | Arquivo(s) rejeitado(s) |
| `focus` | `FocusEvent` | Campo recebeu foco |
| `blur` | `FocusEvent` | Campo perdeu foco |
| `clear` | — | Seleção limpa via botão |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `prepend` | Ícone ou conteúdo à esquerda do campo |
| `append` | Ícone ou conteúdo à direita (após o botão de limpar) |
| `error` | Mensagem de erro customizada |
| `hint` | Texto de ajuda customizado |

---

## Métodos (expose)

| Método | Assinatura | Descrição |
|--------|------------|-----------|
| `pickFiles` | `() => void` | Abre o seletor de arquivos nativo |
| `removeAtIndex` | `(index: number) => void` | Remove arquivo por índice |
| `removeFile` | `(file: File) => void` | Remove arquivo específico |
| `focus` | `() => void` | Foca no campo |
| `blur` | `() => void` | Remove foco |

---

## Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Área de drop com borda e dica visual |
| hover | ✅ | Borda escurecida |
| focus | ✅ | Borda + ring de foco (WCAG 2.4.7) |
| dragging | ✅ | Borda tracejada + fundo hover |
| filled | ✅ | Nome do arquivo exibido |
| disabled | ✅ | opacity 0.4 + pointer-events none |
| readonly | ✅ | Borda tracejada + sem interação |
| error | ✅ | Borda vermelha + mensagem |

---

## Drag-and-Drop

O DssFile suporta drag-and-drop nativo via QFile. O estado `dragging` é ativado quando arquivos são arrastados sobre o componente, exibindo:
- Borda tracejada com cor de ação
- Fundo `--dss-surface-hover`
- Overlay com texto "Solte os arquivos aqui"

```vue
<!-- Drag-and-drop funciona automaticamente em todos os modos -->
<DssFile v-model="files" label="Arraste ou clique" multiple />
```

---

## Brandabilidade

```vue
<!-- Via prop brand -->
<DssFile brand="hub" label="Relatório Hub" />

<!-- Via contexto ancestral [data-brand] -->
<div data-brand="water">
  <DssFile label="Planta hidráulica" />
</div>
```

---

## Exemplos

```vue
<!-- Básico: arquivo único -->
<DssFile v-model="doc" label="Comprovante" accept=".pdf" clearable />

<!-- Múltiplos arquivos com validação -->
<DssFile
  v-model="images"
  label="Fotos"
  accept="image/*"
  multiple
  :max-files="10"
  :max-file-size="2097152"
  :error="hasError"
  :error-message="errorMsg"
  @rejected="onRejected"
/>

<!-- Com slot prepend -->
<DssFile v-model="file" label="Documento">
  <template #prepend>
    <q-icon name="attach_file" />
  </template>
</DssFile>

<!-- Modo compacto -->
<DssFile v-model="file" label="Anexo" dense clearable />
```

---

## Tokens Utilizados

| Categoria | Tokens |
|-----------|--------|
| Dimensão | `--dss-input-height-md` (44px), `--dss-input-height-sm` (36px) |
| Espaçamento | `--dss-spacing-1..6` |
| Tipografia | `--dss-font-family-sans`, `--dss-font-size-sm/md/xl`, `--dss-font-weight-medium`, `--dss-line-height-normal` |
| Cor texto | `--dss-text-primary`, `--dss-text-secondary`, `--dss-text-hint`, `--dss-text-disabled` |
| Cor feedback | `--dss-feedback-error`, `--dss-action-primary` |
| Superfície | `--dss-surface-default`, `--dss-surface-hover` |
| Bordas | `--dss-border-width-thin/md/thick`, `--dss-radius-md/full`, `--dss-focus-ring` |
| Motion | `--dss-duration-200/300`, `--dss-easing-standard` |
| Estado | `--dss-opacity-disabled` |
| Brand | `--dss-hub-600/700`, `--dss-water-500/600/700`, `--dss-waste-600/700/800` |

**Total: 40 tokens**

---

## Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EX-01 | `2px` | `_states.scss` (forced-colors) | Mínimo para visibilidade em Windows HCM. Não tokenizável. Precedente: DssInput, DssIcon. |
