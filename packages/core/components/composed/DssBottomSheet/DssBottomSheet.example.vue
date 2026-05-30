<script setup lang="ts">
import { ref } from 'vue'
import DssBottomSheet from './DssBottomSheet.vue'
import DssButton from '../../base/DssButton/DssButton.vue'
import DssList from '../../base/DssList/DssList.vue'
import DssItem from '../../base/DssItem/DssItem.vue'
import DssItemSection from '../../base/DssItemSection/DssItemSection.vue'
import DssItemLabel from '../../base/DssItemLabel/DssItemLabel.vue'
import DssIcon from '../../base/DssIcon/DssIcon.vue'
import DssSeparator from '../../base/DssSeparator/DssSeparator.vue'

// Cenário 1: Bottom sheet padrão
const isOpen1 = ref(false)

// Cenário 2: Bottom sheet com header e lista de ações
const isOpen2 = ref(false)

// Cenário 3: Bottom sheet persistente com brand Hub
const isOpen3 = ref(false)

// Cenário 4: Bottom sheet maximizado (Water)
const isOpen4 = ref(false)

// Cenário 5: Bottom sheet com handle customizado (Waste)
const isOpen5 = ref(false)

const actions = [
  { icon: 'share', label: 'Compartilhar' },
  { icon: 'edit', label: 'Editar' },
  { icon: 'delete', label: 'Excluir' }
]
</script>

<template>
  <div class="q-pa-md q-gutter-md">

    <!-- ===================================================================
         Cenário 1: Bottom Sheet Padrão
         =================================================================== -->
    <section>
      <h3 class="text-h6 q-mb-sm">1. Padrão</h3>
      <DssButton label="Abrir Bottom Sheet" color="primary" @click="isOpen1 = true" />

      <DssBottomSheet v-model:open="isOpen1">
        <p class="text-body1">Conteúdo padrão do Bottom Sheet.</p>
        <p class="text-body2 text-grey-6">
          Clique fora ou no botão abaixo para fechar.
        </p>
        <DssButton label="Fechar" flat color="primary" @click="isOpen1 = false" />
      </DssBottomSheet>
    </section>

    <DssSeparator />

    <!-- ===================================================================
         Cenário 2: Com Header e Lista de Ações
         =================================================================== -->
    <section>
      <h3 class="text-h6 q-mb-sm">2. Com Header e Lista de Ações</h3>
      <DssButton label="Abrir com Ações" color="primary" outline @click="isOpen2 = true" />

      <DssBottomSheet v-model:open="isOpen2">
        <template #header>
          <span class="text-subtitle1 text-weight-medium">Selecione uma ação</span>
          <DssButton icon="close" flat round dense @click="isOpen2 = false" />
        </template>

        <DssList>
          <DssItem
            v-for="action in actions"
            :key="action.label"
            clickable
            @click="isOpen2 = false"
          >
            <DssItemSection avatar>
              <DssIcon :name="action.icon" />
            </DssItemSection>
            <DssItemSection>
              <DssItemLabel>{{ action.label }}</DssItemLabel>
            </DssItemSection>
          </DssItem>
        </DssList>
      </DssBottomSheet>
    </section>

    <DssSeparator />

    <!-- ===================================================================
         Cenário 3: Persistente com Brand Hub
         =================================================================== -->
    <section data-brand="hub">
      <h3 class="text-h6 q-mb-sm">3. Persistente — Brand Hub</h3>
      <DssButton label="Abrir Persistente (Hub)" color="primary" @click="isOpen3 = true" />

      <DssBottomSheet
        v-model:open="isOpen3"
        persistent
        no-esc-dismiss
      >
        <template #header>
          <span class="text-subtitle1 text-weight-medium">Confirmação obrigatória</span>
        </template>

        <p class="text-body1 q-mb-md">
          Esta ação requer confirmação. Você não pode fechar clicando fora.
        </p>
        <div class="row q-gutter-sm justify-end">
          <DssButton label="Cancelar" flat color="grey-7" @click="isOpen3 = false" />
          <DssButton label="Confirmar" color="primary" @click="isOpen3 = false" />
        </div>
      </DssBottomSheet>
    </section>

    <DssSeparator />

    <!-- ===================================================================
         Cenário 4: Maximizado — Brand Water
         =================================================================== -->
    <section data-brand="water">
      <h3 class="text-h6 q-mb-sm">4. Maximizado — Brand Water</h3>
      <DssButton label="Abrir Maximizado (Water)" color="primary" @click="isOpen4 = true" />

      <DssBottomSheet
        v-model:open="isOpen4"
        maximized
      >
        <template #header>
          <span class="text-subtitle1 text-weight-medium">Modo de tela cheia</span>
          <DssButton icon="close" flat round dense @click="isOpen4 = false" />
        </template>

        <p class="text-body1">
          Em modo maximizado, o Bottom Sheet ocupa toda a altura da tela.
          Ideal para formulários longos ou conteúdo extenso.
        </p>
      </DssBottomSheet>
    </section>

    <DssSeparator />

    <!-- ===================================================================
         Cenário 5: Handle Customizado — Brand Waste
         =================================================================== -->
    <section data-brand="waste">
      <h3 class="text-h6 q-mb-sm">5. Handle Customizado — Brand Waste</h3>
      <DssButton label="Abrir com Handle Custom (Waste)" color="primary" @click="isOpen5 = true" />

      <DssBottomSheet
        v-model:open="isOpen5"
        :show-handle="false"
      >
        <template #handle>
          <div class="row items-center q-pa-sm q-gutter-xs">
            <DssIcon name="drag_handle" size="sm" color="grey-5" />
            <span class="text-caption text-grey-5">Arraste para fechar</span>
          </div>
        </template>

        <template #header>
          <span class="text-subtitle1 text-weight-medium">Brand Waste</span>
          <DssButton icon="close" flat round dense @click="isOpen5 = false" />
        </template>

        <p class="text-body1">Conteúdo com handle de arrasto customizado.</p>
      </DssBottomSheet>
    </section>

  </div>
</template>
