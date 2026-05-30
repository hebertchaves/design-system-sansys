# DSSUPLOADER_API.md — DssUploader API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `String` | `undefined` | URL para envio dos arquivos via XHR |
| `method` | `'POST' \| 'PUT'` | `'POST'` | Método HTTP de envio |
| `headers` | `Record<string,string> \| Array<{name,value}>` | `undefined` | Cabeçalhos HTTP adicionais |
| `formFields` | `Array<{name,value}>` | `undefined` | Campos de formulário adicionais |
| `withCredentials` | `Boolean` | `false` | Envia credenciais (cookies, auth headers) |
| `sendRaw` | `Boolean` | `false` | Envia arquivo como binário puro (sem FormData) |
| `factory` | `Function` | `undefined` | Configuração dinâmica de upload por chamada |
| `multiple` | `Boolean` | `false` | Permite selecionar múltiplos arquivos |
| `accept` | `String` | `undefined` | Filtro de tipos aceitos (ex: `.pdf,image/*`) |
| `maxFiles` | `Number` | `undefined` | Número máximo de arquivos na fila |
| `maxFileSize` | `Number` | `undefined` | Tamanho máximo por arquivo em bytes |
| `maxTotalSize` | `Number` | `undefined` | Tamanho máximo total da fila em bytes |
| `autoUpload` | `Boolean` | `false` | Inicia o upload automaticamente ao adicionar |
| `batch` | `Boolean` | `false` | Envia todos os arquivos em um único request |
| `disable` | `Boolean` | `false` | Desabilita toda interação |
| `readonly` | `Boolean` | `false` | Modo somente leitura — mostra mas impede ações |
| `variant` | `'elevated' \| 'outline' \| 'subtle'` | `'elevated'` | Variante visual do container |
| `brand` | `'hub' \| 'water' \| 'waste'` | `undefined` | Contexto de marca Sansys |
| `label` | `String` | `undefined` | Texto da dropzone vazia |
| `addAriaLabel` | `String` | `'Adicionar arquivos'` | aria-label do botão de adicionar |
| `uploadAriaLabel` | `String` | `'Fazer upload de todos os arquivos'` | aria-label do botão de upload |
| `abortAriaLabel` | `String` | `'Cancelar upload'` | aria-label do botão de cancelar |
| `clearAriaLabel` | `String` | `'Remover todos os arquivos da fila'` | aria-label do botão de limpar |

### Props Bloqueadas (não expostas ao consumidor)

| Prop QUploader | Motivo do Bloqueio |
|---|---|
| `color`, `text-color` | Cor do header é governada por tokens de superfície DSS |
| `flat`, `bordered`, `square` | Aparência do container é governada pela prop `variant` (Golden Context DssCard) |
| `dark` | Gerenciado por `[data-theme="dark"]` em `4-output/_states.scss` |
| `hide-upload-btn` | Controle de UI feito internamente via slot `header` (EXC-01) |

### Factory Function

```typescript
type UploaderFactory = (
  files: readonly File[]
) => UploaderFactoryResult | Promise<UploaderFactoryResult>

interface UploaderFactoryResult {
  url?:             string
  method?:          string
  headers?:         Record<string, string> | Array<{ name: string; value: string }>
  formFields?:      Array<{ name: string; value: string }>
  fieldName?:       string
  withCredentials?: boolean
  sendRaw?:         boolean
  batch?:           boolean
}
```

## Slots

DssUploader **não expõe slots públicos**.

Os slots `header` e `list` do QUploader são implementados internamente (EXC-01) para
garantir que nenhum componente Quasar nativo vaze para o DOM final. Consulte o
[Guia de Composição](#matriz-de-composição) para estratégias de extensão.

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `added` | `readonly File[]` | Arquivos foram adicionados à fila |
| `removed` | `readonly File[]` | Arquivos foram removidos da fila |
| `rejected` | `ReadonlyArray<{ failedPropValidation: string; file: File }>` | Arquivos rejeitados por validação |
| `uploading` | `{ files: readonly File[]; xhr: XMLHttpRequest }` | Upload iniciado |
| `uploaded` | `{ files: readonly File[]; xhr: XMLHttpRequest }` | Upload concluído com sucesso |
| `failed` | `{ files: readonly File[]; xhr: XMLHttpRequest }` | Upload falhou |

## Expose (ref methods)

| Method | Signature | Description |
|--------|-----------|-------------|
| `upload` | `() => void` | Inicia o upload manualmente |
| `abort` | `() => void` | Aborta o upload em andamento |
| `reset` | `() => void` | Limpa toda a fila de arquivos |
| `pickFiles` | `() => void` | Abre o seletor de arquivos do sistema |

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-surface-default` | — | Fundo do container |
| `--dss-surface-hover` | — | Fundo do estado drag-active |
| `--dss-surface-muted` | — | Fundo da variante subtle |
| `--dss-gray-100` | — | Borda de separação interna |
| `--dss-gray-300` | — | Borda padrão do container |
| `--dss-gray-500` | — | Cor do ícone de arquivo |
| `--dss-gray-600` | — | Texto sutil / progress-info |
| `--dss-gray-800` | — | Nome do arquivo |
| `--dss-radius-lg` | 12px | Border-radius do container |
| `--dss-border-width-thin` | 1px | Borda padrão |
| `--dss-border-width-md` | 2px | Borda de alto contraste |
| `--dss-border-focus` | 2px solid action-primary | Borda do drag state |
| `--dss-padding-2` | 8px | Padding vertical do item |
| `--dss-padding-4` | 16px | Padding interno do header e lista |
| `--dss-padding-8` | 32px | Padding vertical da dropzone |
| `--dss-grid-gap-sm` | 8px | Gap entre botões do header e itens da lista |
| `--dss-spacing-20` | 80px | Largura da barra de progresso inline |
| `--dss-font-size-xs` | — | Metadado do arquivo |
| `--dss-font-size-sm` | — | Nome do arquivo / texto da dropzone |
| `--dss-font-weight-normal` | — | Peso de texto padrão |
| `--dss-elevation-1` | — | Sombra da variante elevated |
| `--dss-shadow-hub-sm` | — | Sombra brand Hub |
| `--dss-shadow-water-sm` | — | Sombra brand Water |
| `--dss-shadow-waste-sm` | — | Sombra brand Waste |
| `--dss-hub-600` | — | Borda drag state brand Hub |
| `--dss-water-500` | — | Borda drag state brand Water |
| `--dss-waste-600` | — | Borda drag state brand Waste |
| `--dss-feedback-success` | — | Cor do ícone de upload concluído |
| `--dss-feedback-error` | — | Cor do ícone de falha |
| `--dss-opacity-disabled` | 0.4 | Opacidade do estado disabled |
| `--dss-duration-150` | — | Transição micro (dropzone) |
| `--dss-duration-200` | — | Transição drag state |
| `--dss-easing-standard` | — | Curva de easing padrão |

## CSS Classes

| Classe | Descrição |
|--------|-----------|
| `.dss-uploader` | Root element |
| `.dss-uploader--elevated` | Variante elevated (default) |
| `.dss-uploader--outline` | Variante outline |
| `.dss-uploader--subtle` | Variante subtle |
| `.dss-uploader--brand-hub` | Brand Hub via prop |
| `.dss-uploader--brand-water` | Brand Water via prop |
| `.dss-uploader--brand-waste` | Brand Waste via prop |
| `.dss-uploader--disabled` | Estado desabilitado |
| `.dss-uploader--readonly` | Estado somente leitura |
| `.dss-uploader__engine` | QUploader interno |
| `.dss-uploader__header` | Header de ações |
| `.dss-uploader__dropzone` | Área vazia de drop |
| `.dss-uploader__list` | Lista de arquivos |
| `.dss-uploader__file-item` | Item da lista |
| `.dss-uploader__file-item--uploading` | Item em progresso |
| `.dss-uploader__file-item--uploaded` | Item concluído |
| `.dss-uploader__file-item--failed` | Item com falha |
| `.dss-uploader__status-icon--success` | Ícone de sucesso |
| `.dss-uploader__status-icon--error` | Ícone de erro |

## Matriz de Composição DSS

### Papel Estrutural
DssUploader é um componente composto que orquestra:
- **DssButton** — ações do header (adicionar, upload, cancelar, limpar)
- **DssIcon** — ícone da dropzone e ícones de tipo/status de arquivo
- **DssLinearProgress** — progresso individual por arquivo

### Composição Recomendada

```vue
<!-- Em formulário -->
<DssCard>
  <DssCardSection>
    <DssUploader url="..." label="Anexar comprovantes" />
  </DssCardSection>
</DssCard>

<!-- Múltiplos campos -->
<form>
  <DssInput v-model="description" label="Descrição" />
  <DssUploader url="..." multiple accept=".pdf" />
  <DssButton type="submit">Enviar</DssButton>
</form>
```

### Anti-Patterns

- Não usar `QBtn`, `QIcon`, `QLinearProgress` dentro do DssUploader
- Não sobrescrever os slots `#header` ou `#list` externamente
- Não aninhar DssUploader dentro de outro DssUploader
- Não criar um wrapper próprio quando DssCard já serve de contexto estrutural
