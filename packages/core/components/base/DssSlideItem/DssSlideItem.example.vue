<script setup lang="ts">
import { ref } from 'vue'
import DssSlideItem from './DssSlideItem.vue'
import DssIcon from '../DssIcon/DssIcon.vue'
import DssItem from '../DssItem/DssItem.vue'

const items = ref([
  { id: 1, title: 'Notificação de atualização disponível', subtitle: 'Sistema v2.3.0 pronto para instalar' },
  { id: 2, title: 'Mensagem de Hebert Chaves', subtitle: 'Aprovação pendente no módulo de resíduos' },
  { id: 3, title: 'Relatório mensal gerado', subtitle: 'Relatório de Maio 2026 disponível para download' },
])

function handleDelete(id: number) {
  const index = items.value.findIndex(i => i.id === id)
  if (index !== -1) items.value.splice(index, 1)
}

function handleArchive(reset: () => void) {
  reset()
  // Em um app real: chamar API de arquivamento
}
</script>

<template>
  <div style="max-width: 480px; margin: 0 auto; padding: var(--dss-padding-4);">

    <!-- Cenário 1: Deletar (esquerda) e Arquivar (direita) -->
    <section style="margin-bottom: var(--dss-spacing-8);">
      <h3 style="font-size: var(--dss-font-size-md); margin-bottom: var(--dss-spacing-3);">
        Swipe para deletar / arquivar
      </h3>
      <q-list bordered separator>
        <DssSlideItem
          v-for="item in items"
          :key="item.id"
          left-color="error"
          right-color="info"
          @action="(e) => e.side === 'left' ? handleDelete(item.id) : handleArchive(e.reset)"
        >
          <template #left>
            <DssIcon name="delete" aria-hidden="true" />
            <span>Deletar</span>
          </template>
          <template #right>
            <DssIcon name="archive" aria-hidden="true" />
            <span>Arquivar</span>
          </template>

          <DssItem :label="item.title" :caption="item.subtitle" />
        </DssSlideItem>
      </q-list>
    </section>

    <!-- Cenário 2: Apenas ação de sucesso (marcar como feito) -->
    <section style="margin-bottom: var(--dss-spacing-8);">
      <h3 style="font-size: var(--dss-font-size-md); margin-bottom: var(--dss-spacing-3);">
        Swipe para marcar como concluído
      </h3>
      <q-list bordered>
        <DssSlideItem
          left-color="success"
          @action="(e) => e.reset()"
        >
          <template #left>
            <DssIcon name="check_circle" aria-hidden="true" />
            <span>Concluído</span>
          </template>
          <DssItem label="Revisar tokens de spacing" caption="Tarefa pendente" />
        </DssSlideItem>
      </q-list>
    </section>

    <!-- Cenário 3: Desabilitado -->
    <section>
      <h3 style="font-size: var(--dss-font-size-md); margin-bottom: var(--dss-spacing-3);">
        Estado desabilitado
      </h3>
      <q-list bordered>
        <DssSlideItem
          disable
          left-color="error"
        >
          <template #left>
            <DssIcon name="delete" aria-hidden="true" />
            <span>Deletar</span>
          </template>
          <!-- Consumer aplica disable no DssItem para feedback visual (GAP-04) -->
          <DssItem label="Item bloqueado" caption="Swipe desabilitado" disable />
        </DssSlideItem>
      </q-list>
    </section>

  </div>
</template>
