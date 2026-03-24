<template>
  <div class="dss-file-examples">
    <h2>DssFile — Exemplos</h2>

    <!-- ================================================================
         CENÁRIO 1: Arquivo único simples (outlined, padrão)
         ================================================================ -->
    <section>
      <h3>1. Arquivo único — outlined (padrão)</h3>
      <DssFile
        v-model="singleFile"
        label="Anexar documento"
        hint="Formatos aceitos: PDF, DOC, DOCX (máx. 5MB)"
        accept=".pdf,.doc,.docx"
        :max-file-size="5242880"
        clearable
      />
      <p v-if="singleFile">Selecionado: {{ singleFile.name }}</p>
    </section>

    <!-- ================================================================
         CENÁRIO 2: Múltiplos arquivos — filled com erro
         ================================================================ -->
    <section>
      <h3>2. Múltiplos arquivos — filled com erro</h3>
      <DssFile
        v-model="multipleFiles"
        label="Imagens do projeto"
        accept="image/*"
        multiple
        :max-files="5"
        :max-file-size="2097152"
        variant="filled"
        :error="hasFileError"
        :error-message="fileErrorMessage"
        clearable
        @rejected="handleRejected"
      />
    </section>

    <!-- ================================================================
         CENÁRIO 3: Desabilitado e readonly
         ================================================================ -->
    <section>
      <h3>3. Estados: disabled e readonly</h3>

      <DssFile
        v-model="disabledFile"
        label="Contrato assinado (desabilitado)"
        disabled
        variant="outlined"
      />

      <DssFile
        v-model="readonlyFile"
        label="Laudo técnico (somente leitura)"
        readonly
        variant="outlined"
      />
    </section>

    <!-- ================================================================
         CENÁRIO 4: Variantes visuais
         ================================================================ -->
    <section>
      <h3>4. Variantes visuais</h3>

      <DssFile
        v-model="variantFiles.outlined"
        label="Outlined (padrão)"
        variant="outlined"
        clearable
      />

      <DssFile
        v-model="variantFiles.filled"
        label="Filled"
        variant="filled"
        clearable
      />

      <DssFile
        v-model="variantFiles.standout"
        label="Standout"
        variant="standout"
        clearable
      />

      <DssFile
        v-model="variantFiles.borderless"
        label="Borderless"
        variant="borderless"
        clearable
      />
    </section>

    <!-- ================================================================
         CENÁRIO 5: Brandabilidade (Hub, Water, Waste)
         ================================================================ -->
    <section>
      <h3>5. Brandabilidade</h3>

      <DssFile
        v-model="brandFiles.hub"
        label="Relatório Hub (via prop)"
        brand="hub"
        variant="outlined"
        clearable
      />

      <div data-brand="water">
        <DssFile
          v-model="brandFiles.water"
          label="Planta hidráulica (via ancestral)"
          variant="outlined"
          clearable
        />
      </div>

      <DssFile
        v-model="brandFiles.waste"
        label="Laudo ambiental Waste"
        brand="waste"
        variant="filled"
        clearable
      />
    </section>

    <!-- ================================================================
         CENÁRIO 6: Com slot prepend e modo compacto
         ================================================================ -->
    <section>
      <h3>6. Slot prepend + dense</h3>

      <DssFile
        v-model="denseFile"
        label="Comprovante"
        accept=".pdf"
        dense
        clearable
      >
        <template #prepend>
          <span aria-hidden="true">📄</span>
        </template>
      </DssFile>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DssFile from './DssFile.vue'

// Cenário 1
const singleFile = ref<File | null>(null)

// Cenário 2
const multipleFiles = ref<File[] | null>(null)
const hasFileError = ref(false)
const fileErrorMessage = ref('')

const handleRejected = (rejections: { failedPropValidation: string; file: File }[]) => {
  hasFileError.value = true
  const reasons = rejections.map(r => {
    if (r.failedPropValidation === 'max-file-size') return `"${r.file.name}" excede o tamanho máximo (2MB)`
    if (r.failedPropValidation === 'accept') return `"${r.file.name}" não é um formato aceito`
    if (r.failedPropValidation === 'max-files') return 'Limite de 5 arquivos excedido'
    return `"${r.file.name}" rejeitado`
  })
  fileErrorMessage.value = reasons[0] ?? 'Arquivo(s) rejeitado(s)'
}

// Cenário 3
const disabledFile = ref<File | null>(null)
const readonlyFile = ref<File | null>(null)

// Cenário 4
const variantFiles = ref({
  outlined: null as File | null,
  filled: null as File | null,
  standout: null as File | null,
  borderless: null as File | null
})

// Cenário 5
const brandFiles = ref({
  hub: null as File | null,
  water: null as File | null,
  waste: null as File | null
})

// Cenário 6
const denseFile = ref<File | null>(null)
</script>

<style scoped>
.dss-file-examples {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 480px;
}

section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--dss-text-secondary);
  margin: 0;
}

p {
  font-size: 12px;
  color: var(--dss-text-secondary);
  margin: 0;
}
</style>
