<script setup lang="ts">
/**
 * ==========================================================================
 * DssUploader — Design System Sansys Upload Component
 * ==========================================================================
 *
 * Componente composto de upload do Design System Sansys (DSS).
 * Wrapper governado sobre QUploader (Quasar). Reconstrói integralmente
 * a UI via slots `header` e `list`, substituindo todos os componentes
 * nativos do Quasar por seus equivalentes DSS.
 *
 * Golden Reference: DssBadge (componente não interativo em sua raiz —
 *   a interatividade pertence inteiramente aos filhos DssButton)
 * Golden Context: DssCard (container com borda, superfície e elevação)
 *
 * ─── Comportamentos Implícitos (DECLARAÇÃO OBRIGATÓRIA) ──────────────────
 *
 * inheritAttrs: false
 *   $attrs são encaminhados ao div root via v-bind="$attrs".
 *   O QUploader interno NÃO recebe $attrs.
 *
 * EXC-01: Slots estruturais obrigatórios
 *   Os slots `header` e `list` do QUploader são SEMPRE sobrescritos
 *   internamente. Isso impede que QBtn, QIcon e QLinearProgress nativos
 *   do Quasar sejam renderizados no DOM final. Esta é a condição
 *   arquitetural fundamental do DssUploader.
 *
 * EXC-Gate-01: Seletores internos do Quasar
 *   `.q-uploader` precisa ter seus estilos padrão resetados via SCSS
 *   para que o container DSS controle 100% da aparência visual.
 *
 * Delegação de marca via [data-brand]:
 *   Definir `data-brand` no root div propaga automaticamente o brand
 *   para DssButton, DssIcon e DssLinearProgress filhos via CSS cascade.
 *   Não é necessário passar a prop `brand` explicitamente para os filhos.
 *
 * Drag-and-drop:
 *   QUploader gerencia internamente o drag via `.q-uploader--dnd`.
 *   DssUploader reage a esse estado via CSS `:has()` em _variant.scss
 *   sem lógica JS adicional, mantendo a separação de responsabilidades.
 *
 * Stati NÃO APLICÁVEIS:
 *   - hover, active, focus no root: componente não interativo em si
 *   - loading: o DssLinearProgress nos itens é o indicador de progresso
 *
 * @version 1.0.0
 */

import { ref, computed } from 'vue'
import { QUploader, QUploaderAddTrigger } from 'quasar'
import type { QUploaderProps } from 'quasar'
import type {
  DssUploaderProps,
  DssUploaderEmits,
  DssUploaderExpose,
  QUploaderHeaderScope,
  QUploaderListScope,
  QUploaderExtendedFile,
} from '../types/uploader.types'
import { useUploaderClasses } from '../composables/useUploaderClasses'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssIcon from '../../../base/DssIcon/DssIcon.vue'
import DssLinearProgress from '../../../base/DssLinearProgress/DssLinearProgress.vue'

// ─── Component Options ────────────────────────────────────────────────────

defineOptions({ name: 'DssUploader', inheritAttrs: false })

// ─── Props ────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<DssUploaderProps>(), {
  variant:         'elevated',
  method:          'POST',
  addAriaLabel:    'Adicionar arquivos',
  uploadAriaLabel: 'Fazer upload de todos os arquivos',
  abortAriaLabel:  'Cancelar upload',
  clearAriaLabel:  'Remover todos os arquivos da fila',
})

// ─── Emits ────────────────────────────────────────────────────────────────

const emit = defineEmits<DssUploaderEmits>()

// ─── Template Refs ────────────────────────────────────────────────────────

const qUploaderRef = ref<InstanceType<typeof QUploader> | null>(null)

// ─── Classes ──────────────────────────────────────────────────────────────

const { rootClasses } = useUploaderClasses(props)

// ─── Normalização de headers (Record → QUploaderHeaderItem[]) ───────────────
// A API DSS aceita headers como Record<string,string> por conveniência; o
// QUploader só aceita { name, value }[]. Convertemos aqui — na prop e nos
// headers retornados pelo factory — para que a conveniência funcione de fato.
type HeaderInput = Record<string, string> | Array<{ name: string; value: string }> | undefined

function toHeaderItems(h: HeaderInput): Array<{ name: string; value: string }> | undefined {
  if (!h) return undefined
  if (Array.isArray(h)) return h
  return Object.entries(h).map(([name, value]) => ({ name, value }))
}

const normalizedHeaders = computed(() => toHeaderItems(props.headers))

const normalizedFactory = computed<QUploaderProps['factory']>(() => {
  const factory = props.factory
  if (!factory) return undefined
  return (files: readonly File[]) => {
    const result = factory(files)
    return result instanceof Promise
      ? result.then((r) => ({ ...r, headers: toHeaderItems(r.headers) }))
      : { ...result, headers: toHeaderItems(result.headers) }
  }
})

// ─── Status Announcement (aria-live) ─────────────────────────────────────
// Região dedicada para anunciar mudanças de estado a screen readers.

const statusAnnouncement = ref('')

function announce(message: string): void {
  statusAnnouncement.value = ''
  requestAnimationFrame(() => { statusAnnouncement.value = message })
}

// ─── Event Handlers ───────────────────────────────────────────────────────

function onAdded(files: readonly File[]): void {
  announce(
    files.length === 1
      ? `Arquivo "${files[0].name}" adicionado à fila`
      : `${files.length} arquivos adicionados à fila`
  )
  emit('added', files)
}

function onRemoved(files: readonly File[]): void {
  announce(
    files.length === 1
      ? `Arquivo "${files[0].name}" removido`
      : `${files.length} arquivos removidos`
  )
  emit('removed', files)
}

function onRejected(
  rejections: ReadonlyArray<{ failedPropValidation: string; file: File }>
): void {
  announce(
    rejections.length === 1
      ? `Arquivo "${rejections[0].file.name}" rejeitado`
      : `${rejections.length} arquivos rejeitados`
  )
  emit('rejected', rejections)
}

function onUploading(payload: { files: readonly File[]; xhr: XMLHttpRequest }): void {
  announce('Upload iniciado')
  emit('uploading', payload)
}

function onUploaded(payload: { files: readonly File[]; xhr: XMLHttpRequest }): void {
  announce('Upload concluído com sucesso')
  emit('uploaded', payload)
}

function onFailed(payload: { files: readonly File[]; xhr: XMLHttpRequest }): void {
  announce('Falha no upload. Verifique o arquivo e tente novamente.')
  emit('failed', payload)
}

// ─── File Icon Helper ─────────────────────────────────────────────────────
// Mapeia o MIME type do arquivo para um nome de ícone Material Icons.

function getFileIcon(file: QUploaderExtendedFile): string {
  const mime = file.type
  if (mime.startsWith('image/'))           return 'image'
  if (mime.startsWith('video/'))           return 'videocam'
  if (mime.startsWith('audio/'))           return 'audiotrack'
  if (mime === 'application/pdf')          return 'picture_as_pdf'
  if (mime.includes('spreadsheet') || mime.includes('excel')) return 'table_chart'
  if (mime.includes('document')    || mime.includes('word'))  return 'description'
  if (mime.includes('zip')         || mime.includes('compressed') || mime.includes('archive')) return 'folder_zip'
  if (mime.includes('presentation') || mime.includes('powerpoint')) return 'slideshow'
  return 'insert_drive_file'
}

// ─── Expose ───────────────────────────────────────────────────────────────

defineExpose<DssUploaderExpose>({
  upload:    () => qUploaderRef.value?.upload(),
  abort:     () => qUploaderRef.value?.abort(),
  reset:     () => qUploaderRef.value?.reset(),
  pickFiles: () => (qUploaderRef.value as any)?.pickFiles?.(),
})
</script>

<template>
  <!--
    Root do DssUploader.

    v-bind="$attrs": encaminha id, class extra, data-*, aria-* do pai.
    :data-brand: ativa cascade de brand tokens em DssButton, DssIcon
      e DssLinearProgress filhos via [data-brand] selector.
    :class="rootClasses": aplica variante visual e estado.
  -->
  <div
    v-bind="$attrs"
    :class="rootClasses"
    :data-brand="brand ?? undefined"
  >
    <!--
      QUploader: delega TODA a lógica de upload, validação, XHR ao Quasar.

      Props NÃO passadas ao QUploader (controladas pelo DSS via CSS/Slots):
        - color, text-color: governados por tokens DSS
        - flat, bordered, square: aparência do container é do DSS
        - dark: gerenciado por [data-theme="dark"] em _states.scss
        - hide-upload-btn: controle via slot header (EXC-01)

      EXC-Gate-01: O SCSS em 2-composition/_base.scss reseta estilos
        padrão do QUploader (.q-uploader, .q-uploader__header, etc.)
        para que o container DSS controle 100% da aparência.
    -->
    <q-uploader
      ref="qUploaderRef"
      class="dss-uploader__engine"
      :url="url"
      :method="method"
      :headers="normalizedHeaders"
      :form-fields="formFields"
      :with-credentials="withCredentials"
      :send-raw="sendRaw"
      :factory="normalizedFactory"
      :multiple="multiple"
      :accept="accept"
      :max-files="maxFiles"
      :max-file-size="maxFileSize"
      :max-total-size="maxTotalSize"
      :auto-upload="autoUpload"
      :batch="batch"
      :disable="disable"
      flat
      bordered
      @added="onAdded"
      @removed="onRemoved"
      @rejected="onRejected"
      @uploading="onUploading"
      @uploaded="onUploaded"
      @failed="onFailed"
    >
      <!-- ================================================================
           EXC-01: SLOT HEADER OBRIGATÓRIO
           Reconstrói o header inteiramente com DssButton.
           QBtn nativo do Quasar NÃO é renderizado.
           ================================================================ -->
      <template #header="scope">
        <div
          class="dss-uploader__header"
          role="toolbar"
          :aria-label="`Ações de upload${scope.files.length > 0 ? ` — ${scope.files.length} arquivo(s)` : ''}`"
        >
          <!-- Botão: Adicionar arquivos -->
          <DssButton
            v-if="scope.canAddFiles && !readonly"
            variant="outline"
            color="primary"
            size="sm"
            icon="add"
            dense
            no-caps
            :disabled="disable"
            :aria-label="addAriaLabel"
            @click="scope.pickFiles($event)"
          >
            Adicionar
          </DssButton>
          <!-- Input de arquivo do QUploader, recolocado.
               O override do slot #header (EXC-01) descarta o `<input type=file>`
               que o QUploader renderiza no header default; sem ele `pickFiles()`
               não tem o que clicar. QUploaderAddTrigger reinjeta esse input (via
               `uploaderKey`), setando o `inputRef` interno. Fica **contido e oculto**
               (0×0) para NÃO sobrepor a toolbar — é acionado programaticamente pelo
               clique do botão acima (gesto de usuário → o browser abre o diálogo). -->
          <span
            v-if="scope.canAddFiles && !readonly"
            class="dss-uploader__file-trigger"
            aria-hidden="true"
          >
            <QUploaderAddTrigger />
          </span>

          <!-- Botão: Fazer upload (apenas no modo manual e fora de upload ativo) -->
          <DssButton
            v-if="!autoUpload && scope.canUpload && !scope.isUploading && !readonly"
            variant="elevated"
            color="primary"
            size="sm"
            icon="cloud_upload"
            dense
            no-caps
            :disabled="disable"
            :loading="scope.isUploading"
            :aria-label="uploadAriaLabel"
            @click="scope.upload()"
          >
            Upload
          </DssButton>

          <!-- Botão: Cancelar upload em andamento -->
          <DssButton
            v-if="scope.isUploading"
            variant="flat"
            color="negative"
            size="sm"
            icon="stop"
            dense
            no-caps
            :aria-label="abortAriaLabel"
            @click="scope.abort()"
          >
            Cancelar
          </DssButton>

          <!-- Botão: Limpar fila (disponível quando há arquivos e não está enviando) -->
          <DssButton
            v-if="scope.files.length > 0 && !scope.isUploading && !readonly"
            variant="flat"
            size="sm"
            icon="delete_sweep"
            dense
            no-caps
            :disabled="disable"
            :aria-label="clearAriaLabel"
            @click="scope.reset()"
          >
            Limpar
          </DssButton>

          <!-- Informações de progresso global (durante upload) -->
          <span
            v-if="scope.isUploading"
            class="dss-uploader__progress-info"
            aria-hidden="true"
          >
            {{ scope.uploadProgressLabel }}
          </span>
        </div>
      </template>

      <!-- ================================================================
           EXC-01: SLOT LIST OBRIGATÓRIO
           Reconstrói a lista de arquivos com DssIcon e DssLinearProgress.
           QIcon e QLinearProgress nativos NÃO são renderizados.
           ================================================================ -->
      <template #list="scope">
        <!-- Estado vazio: dropzone com indicação visual -->
        <div
          v-if="scope.files.length === 0"
          class="dss-uploader__dropzone"
          :aria-label="label || 'Arraste arquivos aqui ou clique em Adicionar'"
        >
          <DssIcon
            name="cloud_upload"
            size="lg"
            :decorative="true"
          />
          <p class="dss-uploader__dropzone-text">
            {{ label || 'Arraste arquivos aqui ou clique em Adicionar' }}
          </p>
          <p class="dss-uploader__dropzone-hint">
            {{ accept ? `Tipos aceitos: ${accept}` : 'Todos os tipos de arquivo são aceitos' }}
          </p>
        </div>

        <!-- Lista de arquivos na fila -->
        <ul
          v-else
          class="dss-uploader__list"
          role="list"
          :aria-label="`Fila de upload — ${scope.files.length} arquivo(s)`"
        >
          <li
            v-for="file in scope.files"
            :key="file.__key"
            class="dss-uploader__file-item"
            :class="{
              'dss-uploader__file-item--uploading': file.__status === 'uploading',
              'dss-uploader__file-item--uploaded':  file.__status === 'uploaded',
              'dss-uploader__file-item--failed':    file.__status === 'failed',
            }"
          >
            <!-- Ícone do tipo de arquivo -->
            <DssIcon
              :name="getFileIcon(file)"
              size="sm"
              :decorative="true"
              class="dss-uploader__file-icon"
            />

            <!-- Informações do arquivo -->
            <div class="dss-uploader__file-info">
              <span class="dss-uploader__file-name">{{ file.name }}</span>
              <span class="dss-uploader__file-meta">{{ file.__sizeLabel }}</span>
            </div>

            <!-- Barra de progresso individual (durante upload) -->
            <DssLinearProgress
              v-if="file.__status === 'uploading'"
              :value="file.__progress"
              size="xs"
              class="dss-uploader__file-progress"
              :aria-label="`Progresso de ${file.name}: ${file.__progressLabel}`"
            />

            <!-- Ícone de status: concluído com sucesso -->
            <DssIcon
              v-else-if="file.__status === 'uploaded'"
              name="check_circle"
              size="sm"
              class="dss-uploader__status-icon dss-uploader__status-icon--success"
              :decorative="false"
              :aria-label="`${file.name}: upload concluído`"
            />

            <!-- Ícone de status: falha -->
            <DssIcon
              v-else-if="file.__status === 'failed'"
              name="error"
              size="sm"
              class="dss-uploader__status-icon dss-uploader__status-icon--error"
              :decorative="false"
              :aria-label="`${file.name}: falha no upload`"
            />

            <!-- Botão: Remover arquivo da fila -->
            <DssButton
              v-if="file.__status !== 'uploading' && !disable && !readonly"
              variant="flat"
              size="xs"
              icon="close"
              round
              dense
              :aria-label="`Remover ${file.name} da fila`"
              @click="file.__status === 'uploaded'
                ? scope.removeUploadedFile(file)
                : scope.removeQueuedFile(file)"
            />
          </li>
        </ul>

        <!-- Região aria-live para anúncio de status a screen readers -->
        <div
          class="dss-uploader__sr-status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >{{ statusAnnouncement }}</div>
      </template>
    </q-uploader>
  </div>
</template>
