<template>
  <div class="fab-action-examples">

    <!-- =================================================================
      CENÁRIO 1: Uso básico — ícone único dentro do DssFab
      ================================================================= -->
    <section>
      <h3>1. Uso Básico (ícone)</h3>
      <div class="demo-row">
        <DssFab v-model="fabOpen1" icon="add" active-icon="close" aria-label="Opções de criação">
          <DssFabAction
            color="primary"
            icon="mail"
            aria-label="Enviar e-mail"
            @click="handleAction('e-mail')"
          />
          <DssFabAction
            color="secondary"
            icon="alarm"
            aria-label="Criar alarme"
            @click="handleAction('alarme')"
          />
          <DssFabAction
            color="positive"
            icon="person_add"
            aria-label="Adicionar pessoa"
            @click="handleAction('pessoa')"
          />
        </DssFab>
      </div>
    </section>

    <!-- =================================================================
      CENÁRIO 2: Extended FabAction — ícone + label inline
      ================================================================= -->
    <section>
      <h3>2. Extended (Ícone + Label Inline)</h3>
      <div class="demo-row">
        <DssFab v-model="fabOpen2" icon="add" active-icon="close" aria-label="Criar novo">
          <DssFabAction
            color="primary"
            icon="mail"
            label="E-mail"
            @click="handleAction('e-mail extended')"
          />
          <DssFabAction
            color="secondary"
            icon="share"
            label="Compartilhar"
            @click="handleAction('share extended')"
          />
        </DssFab>
      </div>
    </section>

    <!-- =================================================================
      CENÁRIO 3: Label externo (tooltip lateral)
      ================================================================= -->
    <section>
      <h3>3. Label Externo</h3>
      <div class="demo-row">
        <DssFab v-model="fabOpen3" icon="add" active-icon="close" aria-label="Ações disponíveis">
          <DssFabAction
            color="primary"
            icon="mail"
            external-label="Enviar e-mail"
            label-position="left"
            @click="handleAction('e-mail external')"
          />
          <DssFabAction
            color="accent"
            icon="photo_camera"
            external-label="Tirar foto"
            label-position="left"
            @click="handleAction('câmera external')"
          />
          <DssFabAction
            color="secondary"
            icon="file_upload"
            external-label="Fazer upload"
            label-position="left"
            @click="handleAction('upload external')"
          />
        </DssFab>
      </div>
    </section>

    <!-- =================================================================
      CENÁRIO 4: Estados — disabled
      ================================================================= -->
    <section>
      <h3>4. Estado Disabled</h3>
      <div class="demo-row">
        <DssFab v-model="fabOpen4" icon="add" active-icon="close">
          <DssFabAction
            color="primary"
            icon="mail"
            external-label="Disponível"
            label-position="left"
          />
          <DssFabAction
            color="primary"
            icon="delete"
            external-label="Desabilitado"
            label-position="left"
            disable
          />
        </DssFab>
      </div>
    </section>

    <!-- =================================================================
      CENÁRIO 5: Brand — Hub, Water, Waste
      ================================================================= -->
    <section>
      <h3>5. Brandabilidade</h3>
      <div class="demo-row">

        <!-- Hub -->
        <div data-brand="hub">
          <DssFab v-model="fabOpen5hub" icon="add" active-icon="close" :brand="'hub'">
            <DssFabAction
              color="primary"
              icon="mail"
              brand="hub"
              external-label="Hub"
              label-position="left"
            />
            <DssFabAction
              color="secondary"
              icon="alarm"
              brand="hub"
              external-label="Hub"
              label-position="left"
            />
          </DssFab>
        </div>

        <!-- Water -->
        <div data-brand="water">
          <DssFab v-model="fabOpen5water" icon="add" active-icon="close" :brand="'water'">
            <DssFabAction
              color="primary"
              icon="water_drop"
              brand="water"
              external-label="Water"
              label-position="left"
            />
            <DssFabAction
              color="secondary"
              icon="analytics"
              brand="water"
              external-label="Water"
              label-position="left"
            />
          </DssFab>
        </div>

        <!-- Waste -->
        <div data-brand="waste">
          <DssFab v-model="fabOpen5waste" icon="add" active-icon="close" :brand="'waste'">
            <DssFabAction
              color="positive"
              icon="recycling"
              brand="waste"
              external-label="Waste"
              label-position="left"
            />
            <DssFabAction
              color="secondary"
              icon="local_shipping"
              brand="waste"
              external-label="Waste"
              label-position="left"
            />
          </DssFab>
        </div>

      </div>
    </section>

    <!-- Feedback de ação -->
    <p v-if="lastAction" class="demo-feedback">
      Ação: <strong>{{ lastAction }}</strong>
    </p>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssFab from '../DssFab/DssFab.vue'
import DssFabAction from './DssFabAction.vue'

const fabOpen1 = ref(false)
const fabOpen2 = ref(false)
const fabOpen3 = ref(false)
const fabOpen4 = ref(false)
const fabOpen5hub = ref(false)
const fabOpen5water = ref(false)
const fabOpen5waste = ref(false)

const lastAction = ref('')

function handleAction(name: string) {
  lastAction.value = name
}
</script>

<style scoped>
.fab-action-examples {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-8);
  padding: var(--dss-spacing-6);
}

.demo-row {
  display: flex;
  align-items: flex-end;
  gap: var(--dss-spacing-16);
  padding: var(--dss-spacing-12) var(--dss-spacing-6) var(--dss-spacing-6);
  background: var(--dss-gray-100);
  border-radius: var(--dss-radius-md);
  min-height: var(--dss-spacing-40);
}

.demo-feedback {
  margin-top: var(--dss-spacing-2);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-gray-700);
}
</style>
