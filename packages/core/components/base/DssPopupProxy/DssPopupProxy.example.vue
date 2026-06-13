<template>
  <div class="q-pa-md q-gutter-md">
    <div class="text-h6 q-mb-md">DssPopupProxy — Exemplos</div>

    <!-- ====================================================================
         Exemplo 1: Menu de Ações (modo menu — desktop)
         Popup básico com lista de ações usando DssList e DssItem.
         Em mobile (< 450px): abre como DssDialog.
         ==================================================================== -->
    <div>
      <div class="text-subtitle2 q-mb-sm">1. Menu de Ações</div>
      <DssButton label="Ações" icon-right="arrow_drop_down">
        <DssPopupProxy v-model:open="popup1">
          <DssList>
            <DssItem label="Editar" clickable v-close-popup @click="handleAction('Editar')" />
            <DssItem label="Duplicar" clickable v-close-popup @click="handleAction('Duplicar')" />
            <DssSeparator />
            <DssItem label="Excluir" clickable v-close-popup @click="handleAction('Excluir')" />
          </DssList>
        </DssPopupProxy>
      </DssButton>
      <span v-if="lastAction" class="q-ml-md text-caption">Ação: {{ lastAction }}</span>
    </div>

    <!-- ====================================================================
         Exemplo 2: Popup de Confirmação (persistent)
         Popup que exige ação explícita — não fecha ao clicar fora.
         Em desktop: painel flutuante. Em mobile: dialog modal.
         ==================================================================== -->
    <div>
      <div class="text-subtitle2 q-mb-sm">2. Popup de Confirmação (persistent)</div>
      <DssButton label="Excluir item" color="negative" icon="delete">
        <DssPopupProxy v-model:open="popup2" persistent>
          <DssCard class="q-pa-md" style="min-width: 260px">
            <div class="text-body2 q-mb-md">Tem certeza que deseja excluir este item?</div>
            <div class="row justify-end q-gutter-sm">
              <DssButton flat label="Cancelar" v-close-popup @click="popup2 = false" />
              <DssButton
                color="negative"
                label="Excluir"
                v-close-popup
                @click="handleAction('Excluir confirmado')"
              />
            </div>
          </DssCard>
        </DssPopupProxy>
      </DssButton>
    </div>

    <!-- ====================================================================
         Exemplo 3: Menu de Usuário com Avatar
         Popup acionado por avatar — fecha automaticamente ao selecionar.
         ==================================================================== -->
    <div>
      <div class="text-subtitle2 q-mb-sm">3. Menu de Usuário</div>
      <DssButton round flat>
        <DssAvatar icon="person" />
        <DssPopupProxy v-model:open="popup3" auto-close anchor="bottom right" self="top right">
          <DssList>
            <DssItem label="Meu Perfil" clickable icon="account_circle" v-close-popup />
            <DssItem label="Configurações" clickable icon="settings" v-close-popup />
            <DssSeparator />
            <DssItem label="Sair" clickable icon="logout" v-close-popup @click="handleAction('Logout')" />
          </DssList>
        </DssPopupProxy>
      </DssButton>
    </div>

    <!-- ====================================================================
         Exemplo 4: Context Menu (clique-direito)
         Popup ativado via clique-direito em área definida.
         ==================================================================== -->
    <div>
      <div class="text-subtitle2 q-mb-sm">4. Context Menu (clique-direito)</div>
      <DssCard class="q-pa-md" style="min-width: 200px; cursor: context-menu">
        <div class="text-body2">Clique com botão direito nesta área</div>
        <DssPopupProxy v-model:open="popup4" context-menu>
          <DssList>
            <DssItem label="Copiar" clickable v-close-popup @click="handleAction('Copiar')" />
            <DssItem label="Colar" clickable v-close-popup @click="handleAction('Colar')" />
            <DssItem label="Selecionar tudo" clickable v-close-popup @click="handleAction('Selecionar')" />
          </DssList>
        </DssPopupProxy>
      </DssCard>
    </div>

    <!-- ====================================================================
         Exemplo 5: Breakpoint customizado (sem modo dialog)
         breakpoint="0" força sempre modo menu, independente do viewport.
         ==================================================================== -->
    <div>
      <div class="text-subtitle2 q-mb-sm">5. Sempre modo menu (breakpoint=0)</div>
      <DssButton label="Opções" icon="more_vert" flat>
        <DssPopupProxy v-model:open="popup5" :breakpoint="0">
          <DssList>
            <DssItem label="Opção A" clickable v-close-popup @click="handleAction('Opção A')" />
            <DssItem label="Opção B" clickable v-close-popup @click="handleAction('Opção B')" />
          </DssList>
        </DssPopupProxy>
      </DssButton>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DssPopupProxy.example.vue
 *
 * Exemplos funcionais do componente DssPopupProxy.
 * Demonstra modo menu (desktop) e modo dialog (mobile) via breakpoint=450.
 */

import { ref } from 'vue'
import { DssPopupProxy } from './index.js'
import { DssButton } from '../DssButton/index.js'
import { DssCard } from '../DssCard/index.js'
import { DssList } from '../DssList/index.js'
import { DssItem } from '../DssItem/index.js'
import { DssSeparator } from '../DssSeparator/index.js'
import { DssAvatar } from '../DssAvatar/index.js'

const popup1 = ref(false)
const popup2 = ref(false)
const popup3 = ref(false)
const popup4 = ref(false)
const popup5 = ref(false)

const lastAction = ref('')

function handleAction(action: string) {
  lastAction.value = action
}
</script>
