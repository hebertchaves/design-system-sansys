<script setup lang="ts">
import { ref } from 'vue'
import DssDialog from './DssDialog.vue'

// Scenario 1 — Diálogo padrão de confirmação
const isConfirmOpen = ref(false)

// Scenario 2 — Diálogo persistente com formulário
const isFormOpen = ref(false)
const formName = ref('')

// Scenario 3 — Diálogo em tela cheia
const isMaximizedOpen = ref(false)

// Scenario 4 — Bottom sheet (position="bottom")
const isBottomOpen = ref(false)

// Scenario 5 — Diálogo seamless (sem backdrop)
const isSeamlessOpen = ref(false)

function handleConfirm() {
  isConfirmOpen.value = false
}

function handleFormSubmit() {
  isFormOpen.value = false
}
</script>

<template>
  <div
    class="example-wrapper"
    style="display: flex; flex-direction: column; gap: var(--dss-spacing-6); padding: var(--dss-padding-6);"
  >

    <!-- ================================================================
         Cenário 1: Diálogo de Confirmação (padrão)
         ================================================================ -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">1. Confirmação padrão</h3>
      <button
        class="q-btn q-btn--flat q-btn--rectangle bg-primary text-white"
        style="padding: var(--dss-padding-2) var(--dss-padding-4);"
        @click="isConfirmOpen = true"
      >
        Abrir Diálogo
      </button>

      <DssDialog v-model:open="isConfirmOpen">
        <template #header>
          <span style="font-size: var(--dss-font-size-lg); font-weight: var(--dss-font-weight-bold); color: var(--dss-text-body);">
            Confirmar ação
          </span>
          <button
            aria-label="Fechar diálogo"
            style="background: none; border: none; cursor: pointer; color: var(--dss-text-subtle);"
            @click="isConfirmOpen = false"
          >
            ✕
          </button>
        </template>

        <p style="color: var(--dss-text-body); margin: 0;">
          Esta ação excluirá permanentemente o item selecionado. Deseja continuar?
        </p>

        <template #footer>
          <button
            style="background: none; border: none; cursor: pointer; padding: var(--dss-padding-2) var(--dss-padding-4); color: var(--dss-text-body);"
            @click="isConfirmOpen = false"
          >
            Cancelar
          </button>
          <button
            style="background: var(--dss-hub-primary, #f5911a); border: none; cursor: pointer; padding: var(--dss-padding-2) var(--dss-padding-4); color: white; border-radius: var(--dss-radius-md);"
            @click="handleConfirm"
          >
            Confirmar
          </button>
        </template>
      </DssDialog>
    </section>

    <!-- ================================================================
         Cenário 2: Diálogo persistente com formulário
         ================================================================ -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">2. Formulário persistente</h3>
      <button
        style="padding: var(--dss-padding-2) var(--dss-padding-4); cursor: pointer;"
        @click="isFormOpen = true"
      >
        Abrir Formulário
      </button>

      <DssDialog v-model:open="isFormOpen" persistent>
        <template #header>
          <span style="font-size: var(--dss-font-size-lg); font-weight: var(--dss-font-weight-bold);">
            Editar informações
          </span>
        </template>

        <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-4);">
          <label style="display: flex; flex-direction: column; gap: var(--dss-spacing-1); color: var(--dss-text-body);">
            Nome
            <input
              v-model="formName"
              type="text"
              style="padding: var(--dss-padding-2) var(--dss-padding-3); border: 1px solid var(--dss-gray-300); border-radius: var(--dss-radius-md);"
              placeholder="Digite o nome..."
            />
          </label>
          <p style="color: var(--dss-text-subtle); font-size: var(--dss-font-size-sm);">
            Diálogo persistente — feche apenas via botões de ação.
          </p>
        </div>

        <template #footer>
          <button
            style="background: none; border: none; cursor: pointer; padding: var(--dss-padding-2) var(--dss-padding-4);"
            @click="isFormOpen = false"
          >
            Cancelar
          </button>
          <button
            style="background: var(--dss-hub-primary, #f5911a); border: none; cursor: pointer; padding: var(--dss-padding-2) var(--dss-padding-4); color: white; border-radius: var(--dss-radius-md);"
            @click="handleFormSubmit"
          >
            Salvar
          </button>
        </template>
      </DssDialog>
    </section>

    <!-- ================================================================
         Cenário 3: Diálogo maximizado (tela cheia)
         ================================================================ -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">3. Tela cheia (maximized)</h3>
      <button
        style="padding: var(--dss-padding-2) var(--dss-padding-4); cursor: pointer;"
        @click="isMaximizedOpen = true"
      >
        Abrir Fullscreen
      </button>

      <DssDialog v-model:open="isMaximizedOpen" maximized>
        <template #header>
          <span style="font-size: var(--dss-font-size-lg); font-weight: var(--dss-font-weight-bold);">
            Diálogo em tela cheia
          </span>
          <button
            aria-label="Fechar"
            style="background: none; border: none; cursor: pointer;"
            @click="isMaximizedOpen = false"
          >
            ✕
          </button>
        </template>

        <div style="padding: var(--dss-padding-4);">
          <p style="color: var(--dss-text-body);">
            Conteúdo em tela cheia. Ideal para formulários complexos ou visualizações detalhadas.
          </p>
        </div>

        <template #footer>
          <button
            style="background: none; border: none; cursor: pointer; padding: var(--dss-padding-2) var(--dss-padding-4);"
            @click="isMaximizedOpen = false"
          >
            Fechar
          </button>
        </template>
      </DssDialog>
    </section>

    <!-- ================================================================
         Cenário 4: Bottom sheet (position="bottom")
         ================================================================ -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">4. Bottom sheet (position="bottom")</h3>
      <button
        style="padding: var(--dss-padding-2) var(--dss-padding-4); cursor: pointer;"
        @click="isBottomOpen = true"
      >
        Abrir Bottom Sheet
      </button>

      <DssDialog v-model:open="isBottomOpen" position="bottom" full-width>
        <template #header>
          <span style="font-weight: var(--dss-font-weight-bold);">Opções</span>
          <button style="background: none; border: none; cursor: pointer;" @click="isBottomOpen = false">✕</button>
        </template>

        <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-2);">
          <button style="padding: var(--dss-padding-3); text-align: left; background: none; border: none; cursor: pointer; border-bottom: 1px solid var(--dss-gray-100);">
            Editar
          </button>
          <button style="padding: var(--dss-padding-3); text-align: left; background: none; border: none; cursor: pointer; border-bottom: 1px solid var(--dss-gray-100);">
            Compartilhar
          </button>
          <button style="padding: var(--dss-padding-3); text-align: left; background: none; border: none; cursor: pointer; color: var(--dss-feedback-error);">
            Excluir
          </button>
        </div>
      </DssDialog>
    </section>

    <!-- ================================================================
         Cenário 5: Brand Hub
         ================================================================ -->
    <section data-brand="hub">
      <h3 style="margin-bottom: var(--dss-spacing-3);">5. Brand Hub</h3>
      <button
        style="padding: var(--dss-padding-2) var(--dss-padding-4); cursor: pointer; background: var(--dss-hub-primary, #f5911a); color: white; border: none; border-radius: var(--dss-radius-md);"
        @click="isSeamlessOpen = true"
      >
        Abrir (Brand Hub)
      </button>

      <DssDialog v-model:open="isSeamlessOpen">
        <template #header>
          <span style="font-weight: var(--dss-font-weight-bold);">Ação Sansys Hub</span>
          <button style="background: none; border: none; cursor: pointer;" @click="isSeamlessOpen = false">✕</button>
        </template>

        <p style="color: var(--dss-text-body);">
          Diálogo no contexto brand Hub. O header exibe border-color customizado.
        </p>

        <template #footer>
          <button style="background: none; border: none; cursor: pointer; padding: var(--dss-padding-2) var(--dss-padding-4);" @click="isSeamlessOpen = false">
            Cancelar
          </button>
          <button
            style="background: var(--dss-hub-primary, #f5911a); border: none; cursor: pointer; padding: var(--dss-padding-2) var(--dss-padding-4); color: white; border-radius: var(--dss-radius-md);"
            @click="isSeamlessOpen = false"
          >
            Confirmar
          </button>
        </template>
      </DssDialog>
    </section>

  </div>
</template>
