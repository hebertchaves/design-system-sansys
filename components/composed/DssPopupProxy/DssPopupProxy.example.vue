<template>
  <div class="q-pa-md">
    <h6 class="q-mt-none q-mb-md">DssPopupProxy — Exemplos</h6>

    <!-- ==========================================================================
         EXEMPLO 1: Menu de Ações (modo responsivo básico)
         Desktop: abre como QMenu ancorado ao botão
         Mobile (< 450px): abre como QDialog fullscreen
         ========================================================================== -->
    <section class="q-mb-xl">
      <p class="text-weight-medium q-mb-sm">1. Menu de ações responsivo</p>
      <DssButton
        ref="btnActionsRef"
        label="Opções"
        icon="more_vert"
        color="hub"
        flat
        @click="showActions = !showActions"
      />
      <DssPopupProxy v-model="showActions" :target="btnActionsRef">
        <DssList>
          <DssItem clickable v-close-popup @click="onEdit">
            <DssItemSection avatar>
              <DssIcon name="edit" />
            </DssItemSection>
            <DssItemSection>Editar</DssItemSection>
          </DssItem>
          <DssItem clickable v-close-popup @click="onDuplicate">
            <DssItemSection avatar>
              <DssIcon name="content_copy" />
            </DssItemSection>
            <DssItemSection>Duplicar</DssItemSection>
          </DssItem>
          <DssSeparator />
          <DssItem clickable v-close-popup @click="onDelete" class="text-negative">
            <DssItemSection avatar>
              <DssIcon name="delete" color="negative" />
            </DssItemSection>
            <DssItemSection>Excluir</DssItemSection>
          </DssItem>
        </DssList>
      </DssPopupProxy>
    </section>

    <!-- ==========================================================================
         EXEMPLO 2: Popup de confirmação persistente
         Não fecha ao clicar fora — exige ação explícita do usuário.
         ========================================================================== -->
    <section class="q-mb-xl">
      <p class="text-weight-medium q-mb-sm">2. Confirmação de exclusão (persistente)</p>
      <DssButton
        ref="btnDeleteRef"
        label="Excluir item"
        icon="delete"
        color="negative"
        flat
        @click="showDelete = true"
      />
      <DssPopupProxy
        v-model="showDelete"
        :target="btnDeleteRef"
        persistent
        anchor="bottom left"
        self="top left"
        :offset="[0, 4]"
      >
        <DssCard class="q-pa-md" style="max-width: 320px">
          <p class="text-body1 q-mb-sm">Tem certeza?</p>
          <p class="text-body2 text-grey-7 q-mb-md">
            Esta ação não pode ser desfeita.
          </p>
          <div class="row q-gutter-sm justify-end">
            <DssButton
              label="Cancelar"
              flat
              color="water"
              v-close-popup
              @click="showDelete = false"
            />
            <DssButton
              label="Excluir"
              color="negative"
              @click="onConfirmDelete"
            />
          </div>
        </DssCard>
      </DssPopupProxy>
    </section>

    <!-- ==========================================================================
         EXEMPLO 3: Popup de informação com breakpoint customizado
         Em viewports menores que 768px → QDialog fullscreen
         Em viewports maiores → QMenu ancorado
         ========================================================================== -->
    <section class="q-mb-xl">
      <p class="text-weight-medium q-mb-sm">3. Informação com breakpoint customizado (768px)</p>
      <DssButton
        ref="btnInfoRef"
        icon="info"
        flat
        round
        color="hub"
        @click="showInfo = !showInfo"
        aria-label="Mais informações"
      />
      <DssPopupProxy
        v-model="showInfo"
        :target="btnInfoRef"
        :breakpoint="768"
        anchor="bottom middle"
        self="top middle"
        :offset="[0, 8]"
        auto-close
      >
        <DssCard class="q-pa-md" style="max-width: 280px">
          <p class="text-subtitle2 q-mb-xs">Sobre este campo</p>
          <p class="text-body2 text-grey-7">
            O valor deve ser único e conter entre 3 e 50 caracteres.
            Apenas letras, números e hífens são permitidos.
          </p>
        </DssCard>
      </DssPopupProxy>
    </section>

    <!-- ==========================================================================
         EXEMPLO 4: Menu de usuário acionado por avatar
         auto-close fecha o popup ao clicar em qualquer item interno.
         ========================================================================== -->
    <section class="q-mb-xl">
      <p class="text-weight-medium q-mb-sm">4. Menu de usuário (auto-close)</p>
      <div
        ref="avatarRef"
        class="cursor-pointer"
        role="button"
        tabindex="0"
        aria-label="Menu do usuário"
        @click="showUserMenu = !showUserMenu"
        @keydown.enter="showUserMenu = !showUserMenu"
        @keydown.space.prevent="showUserMenu = !showUserMenu"
      >
        <DssAvatar color="hub" text-color="white" size="md" label="JD" />
      </div>
      <DssPopupProxy
        v-model="showUserMenu"
        :target="avatarRef"
        anchor="bottom right"
        self="top right"
        :offset="[0, 8]"
        auto-close
      >
        <DssList style="min-width: 180px">
          <DssItem class="q-py-sm">
            <DssItemSection avatar>
              <DssAvatar color="hub" text-color="white" size="sm" label="JD" />
            </DssItemSection>
            <DssItemSection>
              <span class="text-weight-medium">João da Silva</span>
              <br />
              <span class="text-caption text-grey-6">joao@email.com</span>
            </DssItemSection>
          </DssItem>
          <DssSeparator />
          <DssItem clickable v-close-popup>
            <DssItemSection avatar>
              <DssIcon name="person" />
            </DssItemSection>
            <DssItemSection>Meu Perfil</DssItemSection>
          </DssItem>
          <DssItem clickable v-close-popup>
            <DssItemSection avatar>
              <DssIcon name="settings" />
            </DssItemSection>
            <DssItemSection>Configurações</DssItemSection>
          </DssItem>
          <DssSeparator />
          <DssItem clickable v-close-popup>
            <DssItemSection avatar>
              <DssIcon name="logout" />
            </DssItemSection>
            <DssItemSection>Sair</DssItemSection>
          </DssItem>
        </DssList>
      </DssPopupProxy>
    </section>

    <!-- Log de eventos -->
    <section>
      <p class="text-weight-medium q-mb-sm">Log de eventos</p>
      <div
        class="q-pa-sm rounded-borders"
        style="background: var(--dss-surface-muted); min-height: 48px; font-family: monospace; font-size: 12px"
      >
        <div v-for="(log, i) in eventLog" :key="i">{{ log }}</div>
        <div v-if="eventLog.length === 0" class="text-grey-6">Nenhum evento registrado</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssPopupProxy from './DssPopupProxy.vue'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssCard from '../../../base/DssCard/DssCard.vue'
import DssList from '../../../base/DssList/DssList.vue'
import DssItem from '../../../base/DssItem/DssItem.vue'
import DssItemSection from '../../../base/DssItemSection/DssItemSection.vue'
import DssIcon from '../../../base/DssIcon/DssIcon.vue'
import DssAvatar from '../../../base/DssAvatar/DssAvatar.vue'
import DssSeparator from '../../../base/DssSeparator/DssSeparator.vue'

// Refs de target (elementos âncora)
const btnActionsRef = ref<HTMLElement | null>(null)
const btnDeleteRef = ref<HTMLElement | null>(null)
const btnInfoRef = ref<HTMLElement | null>(null)
const avatarRef = ref<HTMLElement | null>(null)

// Visibilidade dos popups
const showActions = ref(false)
const showDelete = ref(false)
const showInfo = ref(false)
const showUserMenu = ref(false)

// Log de eventos
const eventLog = ref<string[]>([])

function logEvent(msg: string) {
  const time = new Date().toLocaleTimeString('pt-BR', { hour12: false })
  eventLog.value.unshift(`[${time}] ${msg}`)
  if (eventLog.value.length > 10) eventLog.value.pop()
}

function onEdit() {
  logEvent('Ação: Editar')
}

function onDuplicate() {
  logEvent('Ação: Duplicar')
}

function onDelete() {
  logEvent('Ação: Excluir iniciado')
}

function onConfirmDelete() {
  showDelete.value = false
  logEvent('Ação: Exclusão confirmada')
}
</script>
