// DssUploader — TypeScript interfaces

// ─── Tipos de Brand/Variant ────────────────────────────────────────────────

export type UploaderBrand   = 'hub' | 'water' | 'waste'
export type UploaderVariant = 'elevated' | 'outline' | 'subtle'
export type UploaderMethod  = 'POST' | 'PUT'

// ─── Tipos internos do QUploader ──────────────────────────────────────────
// QUploader adiciona propriedades extras a cada File na fila.

export interface QUploaderExtendedFile extends File {
  /** Status atual do arquivo na fila */
  __status:        'idle' | 'uploading' | 'uploaded' | 'failed'
  /** Progresso de 0.0 a 1.0 */
  __progress:      number
  /** Chave única para v-for */
  __key:           number
  /** Tamanho formatado (ex: "1.2 MB") */
  __sizeLabel:     string
  /** Progresso formatado (ex: "45.00%") */
  __progressLabel: string
  /** Thumbnail para imagens */
  __img:           { value: string } | null
}

// ─── Scope dos Slots do QUploader ─────────────────────────────────────────

export interface QUploaderHeaderScope {
  files:               readonly QUploaderExtendedFile[]
  uploadedFiles:       readonly QUploaderExtendedFile[]
  isUploading:         boolean
  isPaused:            boolean
  canAddFiles:         boolean
  canUpload:           boolean
  isBusy:              boolean
  uploadSizeLabel:     string
  uploadProgressLabel: string
  addFiles:            () => void
  upload:              () => void
  abort:               () => void
  reset:               () => void
}

export interface QUploaderListScope {
  files:               readonly QUploaderExtendedFile[]
  uploadedFiles:       readonly QUploaderExtendedFile[]
  isUploading:         boolean
  isBusy:              boolean
  removeQueuedFile:    (file: QUploaderExtendedFile) => void
  removeUploadedFile:  (file: QUploaderExtendedFile) => void
}

// ─── Factory (configuração dinâmica de upload) ────────────────────────────

export interface UploaderFactoryResult {
  url?:             string
  method?:          string
  headers?:         Record<string, string> | Array<{ name: string; value: string }>
  formFields?:      Array<{ name: string; value: string }>
  fieldName?:       string
  withCredentials?: boolean
  sendRaw?:         boolean
  batch?:           boolean
}

export type UploaderFactory = (
  files: readonly File[]
) => UploaderFactoryResult | Promise<UploaderFactoryResult>

// ─── Props DSS ────────────────────────────────────────────────────────────

export interface DssUploaderProps {
  // ── Rede (pass-through ao QUploader) ──────────────────────────────────

  /** URL para envio dos arquivos */
  url?: string
  /** Método HTTP. Padrão: 'POST'. */
  method?: UploaderMethod
  /** Cabeçalhos HTTP adicionais */
  headers?: Record<string, string> | Array<{ name: string; value: string }>
  /** Campos de formulário adicionais */
  formFields?: Array<{ name: string; value: string }>
  /** Envia credenciais (cookies, auth headers) */
  withCredentials?: boolean
  /** Envia arquivo como binário puro (sem FormData) */
  sendRaw?: boolean
  /** Configuração dinâmica de upload via função */
  factory?: UploaderFactory

  // ── Validação de Arquivos (pass-through) ──────────────────────────────

  /** Permite selecionar múltiplos arquivos. Padrão: false. */
  multiple?: boolean
  /** Filtro de tipos aceitos (ex: ".pdf,image/*") */
  accept?: string
  /** Número máximo de arquivos na fila */
  maxFiles?: number
  /** Tamanho máximo por arquivo em bytes */
  maxFileSize?: number
  /** Tamanho máximo total da fila em bytes */
  maxTotalSize?: number

  // ── Comportamento (pass-through) ──────────────────────────────────────

  /** Inicia o upload automaticamente ao adicionar arquivos. Padrão: false. */
  autoUpload?: boolean
  /** Envia todos os arquivos em um único request. Padrão: false. */
  batch?: boolean

  // ── Estado ────────────────────────────────────────────────────────────

  /** Desabilita toda interação com o componente. Padrão: false. */
  disable?: boolean
  /** Modo somente leitura — mostra arquivos mas impede adição/remoção. Padrão: false. */
  readonly?: boolean

  // ── DSS Exclusivos ────────────────────────────────────────────────────

  /** Variante visual do container. Padrão: 'elevated'. */
  variant?: UploaderVariant
  /** Contexto de brand Sansys */
  brand?: UploaderBrand
  /** Texto da dropzone vazia */
  label?: string

  // ── Acessibilidade ────────────────────────────────────────────────────

  /** aria-label do botão "Adicionar arquivos" */
  addAriaLabel?:    string
  /** aria-label do botão "Fazer upload" */
  uploadAriaLabel?: string
  /** aria-label do botão "Cancelar upload" */
  abortAriaLabel?:  string
  /** aria-label do botão "Limpar fila" */
  clearAriaLabel?:  string
}

// ─── Emits ────────────────────────────────────────────────────────────────

export interface DssUploaderEmits {
  /** Arquivos foram adicionados à fila */
  (e: 'added',     files: readonly File[]): void
  /** Arquivos foram removidos da fila */
  (e: 'removed',   files: readonly File[]): void
  /** Arquivos foram rejeitados por validação */
  (e: 'rejected',  rejections: ReadonlyArray<{ failedPropValidation: string; file: File }>): void
  /** Upload iniciado */
  (e: 'uploading', payload: { files: readonly File[]; xhr: XMLHttpRequest }): void
  /** Upload concluído com sucesso */
  (e: 'uploaded',  payload: { files: readonly File[]; xhr: XMLHttpRequest }): void
  /** Upload falhou */
  (e: 'failed',    payload: { files: readonly File[]; xhr: XMLHttpRequest }): void
}

// ─── Slots ────────────────────────────────────────────────────────────────
// DssUploader NÃO expõe os slots header/list do QUploader ao consumidor.
// Esses slots são implementados internamente para garantir conformidade DSS.
// EXC-01: documentado em dss.meta.json.

export interface DssUploaderSlots {
  // Nenhum slot público — composição via props e eventos.
}

// ─── Expose ───────────────────────────────────────────────────────────────

export interface DssUploaderExpose {
  /** Inicia o upload manualmente */
  upload:    () => void
  /** Aborta o upload em andamento */
  abort:     () => void
  /** Limpa a fila de arquivos */
  reset:     () => void
  /** Abre o seletor de arquivos */
  pickFiles: () => void
}
