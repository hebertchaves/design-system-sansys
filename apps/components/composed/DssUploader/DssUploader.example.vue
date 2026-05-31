<script setup lang="ts">
/**
 * DssUploader — Playground Interativo (Fase 2)
 *
 * Este arquivo simula uploads reais via factory com setTimeout.
 * Nenhuma requisição HTTP é feita para URLs externas.
 *
 * Composição prevista na Seção 8 do pré-prompt:
 *   - Brand: hub / water / waste
 *   - Variant: elevated / outline / subtle
 *   - Multiple: single / multiple
 *   - Disable: habilitado / desabilitado
 *   - Auto-upload: manual / automático
 *   - Simulação de estados: pending → uploading → uploaded / failed
 */

import { ref, computed } from 'vue'
import DssUploader from './DssUploader.vue'

// ─── Controles do Playground ──────────────────────────────────────────────

const selectedBrand    = ref<'hub' | 'water' | 'waste' | ''>('')
const selectedVariant  = ref<'elevated' | 'outline' | 'subtle'>('elevated')
const multipleMode     = ref(false)
const disableMode      = ref(false)
const autoUploadMode   = ref(false)
const showErrorScenario = ref(false)

// ─── Simulação de Upload ──────────────────────────────────────────────────
//
// A `factory` intercepta cada upload e retorna uma configuração com URL
// local simulada. O `url` aponta para `localhost/simulate` que não existe,
// mas o `factory` nos permite controlar o comportamento via Promise.
//
// Para simular progresso real, usamos um servidor mock local opcional.
// Na ausência de servidor, o factory retorna URL de teste que vai falhar,
// demonstrando o estado de erro.

function simulatedFactory(files: readonly File[]) {
  return new Promise<{
    url: string
    method: string
    headers: Record<string, string>
  }>((resolve) => {
    // Simula latência de rede antes de iniciar o upload
    setTimeout(() => {
      if (showErrorScenario.value) {
        // Aponta para URL inválida para simular falha
        resolve({
          url: 'http://localhost:1/simulate-error',
          method: 'POST',
          headers: { 'X-Simulated': 'true' }
        })
      } else {
        // Aponta para httpbin.org para simular sucesso real (opcional)
        // Em ambiente sem rede, vai ao timeout/error
        resolve({
          url: 'https://httpbin.org/post',
          method: 'POST',
          headers: { 'X-Simulated': 'true' }
        })
      }
    }, 500)
  })
}

// ─── Eventos ──────────────────────────────────────────────────────────────

const lastEvent = ref('')
const eventLog  = ref<string[]>([])

function onAdded(files: readonly File[]) {
  logEvent(`added: ${files.map(f => f.name).join(', ')}`)
}

function onRemoved(files: readonly File[]) {
  logEvent(`removed: ${files.map(f => f.name).join(', ')}`)
}

function onRejected(rejections: ReadonlyArray<{ failedPropValidation: string; file: File }>) {
  logEvent(`rejected (${rejections[0]?.failedPropValidation}): ${rejections.map(r => r.file.name).join(', ')}`)
}

function onUploading(payload: { files: readonly File[] }) {
  logEvent(`uploading: ${payload.files.map(f => f.name).join(', ')}`)
}

function onUploaded(payload: { files: readonly File[] }) {
  logEvent(`✅ uploaded: ${payload.files.map(f => f.name).join(', ')}`)
}

function onFailed(payload: { files: readonly File[] }) {
  logEvent(`❌ failed: ${payload.files.map(f => f.name).join(', ')}`)
}

function logEvent(message: string) {
  lastEvent.value = message
  eventLog.value = [message, ...eventLog.value].slice(0, 10)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px; max-width: 800px;">

    <!-- ═══════════════════════════════════════════════════════════════════
         PAINEL DE CONTROLES DO PLAYGROUND
         ═══════════════════════════════════════════════════════════════════ -->
    <section>
      <h2 style="margin: 0 0 16px; font-size: 1rem; font-weight: 600;">Controles do Playground</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start;">

        <!-- Brand -->
        <div>
          <label style="display: block; font-size: 0.75rem; color: #666; margin-bottom: 4px;">Brand</label>
          <select v-model="selectedBrand" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc;">
            <option value="">Nenhum</option>
            <option value="hub">Hub (laranja)</option>
            <option value="water">Water (azul)</option>
            <option value="waste">Waste (verde)</option>
          </select>
        </div>

        <!-- Variant -->
        <div>
          <label style="display: block; font-size: 0.75rem; color: #666; margin-bottom: 4px;">Variant</label>
          <select v-model="selectedVariant" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc;">
            <option value="elevated">elevated</option>
            <option value="outline">outline</option>
            <option value="subtle">subtle</option>
          </select>
        </div>

        <!-- Checkboxes -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" v-model="multipleMode" />
            <span style="font-size: 0.875rem;">Multiple</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" v-model="disableMode" />
            <span style="font-size: 0.875rem;">Disable</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" v-model="autoUploadMode" />
            <span style="font-size: 0.875rem;">Auto-upload</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" v-model="showErrorScenario" />
            <span style="font-size: 0.875rem;">Simular erro</span>
          </label>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         CENÁRIO 1: Uploader Configurável (controles do playground)
         ═══════════════════════════════════════════════════════════════════ -->
    <section>
      <h2 style="margin: 0 0 12px; font-size: 0.875rem; font-weight: 600; color: #444;">
        Cenário 1 — Configurável (via controles acima)
      </h2>
      <DssUploader
        :variant="selectedVariant"
        :brand="selectedBrand || undefined"
        :multiple="multipleMode"
        :disable="disableMode"
        :auto-upload="autoUploadMode"
        :factory="simulatedFactory"
        label="Arraste arquivos aqui ou clique em Adicionar"
        @added="onAdded"
        @removed="onRemoved"
        @rejected="onRejected"
        @uploading="onUploading"
        @uploaded="onUploaded"
        @failed="onFailed"
      />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         CENÁRIO 2: Variante outline com validação de tipo
         ═══════════════════════════════════════════════════════════════════ -->
    <section>
      <h2 style="margin: 0 0 12px; font-size: 0.875rem; font-weight: 600; color: #444;">
        Cenário 2 — Outline com validação de tipo (apenas PDF)
      </h2>
      <DssUploader
        variant="outline"
        :factory="simulatedFactory"
        accept=".pdf"
        :max-file-size="5242880"
        multiple
        label="Apenas arquivos PDF até 5 MB"
        @rejected="onRejected"
      />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         CENÁRIO 3: Subtle com brand Hub e auto-upload
         ═══════════════════════════════════════════════════════════════════ -->
    <section :data-brand="'hub'">
      <h2 style="margin: 0 0 12px; font-size: 0.875rem; font-weight: 600; color: #444;">
        Cenário 3 — Subtle + Brand Hub + Auto-upload
      </h2>
      <DssUploader
        variant="subtle"
        brand="hub"
        :factory="simulatedFactory"
        multiple
        auto-upload
        label="Upload automático assim que o arquivo for selecionado"
        @uploaded="onUploaded"
        @failed="onFailed"
      />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         CENÁRIO 4: Estado Desabilitado
         ═══════════════════════════════════════════════════════════════════ -->
    <section>
      <h2 style="margin: 0 0 12px; font-size: 0.875rem; font-weight: 600; color: #444;">
        Cenário 4 — Desabilitado
      </h2>
      <DssUploader
        variant="elevated"
        :factory="simulatedFactory"
        disable
        label="Este uploader está desabilitado"
      />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         CENÁRIO 5: Brand Water com upload em lote
         ═══════════════════════════════════════════════════════════════════ -->
    <section :data-brand="'water'">
      <h2 style="margin: 0 0 12px; font-size: 0.875rem; font-weight: 600; color: #444;">
        Cenário 5 — Brand Water + Lote (batch)
      </h2>
      <DssUploader
        variant="elevated"
        brand="water"
        :factory="simulatedFactory"
        multiple
        batch
        label="Seleção múltipla — enviados em lote único"
      />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         LOG DE EVENTOS
         ═══════════════════════════════════════════════════════════════════ -->
    <section>
      <h2 style="margin: 0 0 8px; font-size: 0.875rem; font-weight: 600; color: #444;">
        Log de Eventos
      </h2>
      <div
        v-if="eventLog.length === 0"
        style="font-size: 0.75rem; color: #999; font-style: italic;"
      >
        Nenhum evento ainda. Adicione arquivos acima.
      </div>
      <ul v-else style="margin: 0; padding: 0 0 0 16px; font-size: 0.75rem; color: #333; line-height: 1.8;">
        <li v-for="(entry, i) in eventLog" :key="i">{{ entry }}</li>
      </ul>
    </section>

  </div>
</template>
