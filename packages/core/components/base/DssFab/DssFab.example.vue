<script setup lang="ts">
/**
 * DssFab — Exemplos Interativos
 *
 * NOTE: .example.vue files are exempt from Token First and Gate de Composição
 * per DSS_IMPLEMENTATION_GUIDE.md policy (scaffolding context only).
 *
 * EXC-01: Uso de <q-fab-action> nativo nos exemplos.
 * Justificativa: DssFabAction (Nível 3) ainda não foi construído.
 * Esta exceção será removida quando DssFabAction for selado.
 * Ver dss.meta.json → exceptions[0].
 */
import { ref } from 'vue'
import DssFab from './DssFab.vue'

// Playground state
const fabOpen = ref(false)

// Playground controls
const playgroundColor = ref('primary')
const playgroundLabel = ref('')
const playgroundDirection = ref<'up' | 'down' | 'left' | 'right'>('up')
const playgroundDisabled = ref(false)

const colorOptions = ['primary', 'secondary', 'positive', 'negative', 'warning', 'info']
const directionOptions: Array<'up' | 'down' | 'left' | 'right'> = ['up', 'down', 'left', 'right']
</script>

<template>
  <div class="example-wrapper" style="display: flex; flex-direction: column; gap: 48px; padding: 40px;">

    <!-- ===================================================================
         Cenário 1: FAB Padrão (Ícone apenas)
         FAB circular com ícone add, expandindo para cima.
         =================================================================== -->
    <section>
      <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600;">
        1. Padrão (Ícone apenas — expansão para cima)
      </h3>
      <!-- EXC-01: q-fab-action nativo temporário — DssFabAction a ser criado (Nível 3) -->
      <DssFab icon="add" active-icon="close" color="primary" direction="up">
        <q-fab-action color="primary" icon="mail" label="E-mail" />
        <q-fab-action color="secondary" icon="alarm" label="Lembrete" />
        <q-fab-action color="positive" icon="add_task" label="Tarefa" />
      </DssFab>
    </section>

    <!-- ===================================================================
         Cenário 2: Extended FAB (Ícone + Label)
         FAB em formato pill com texto.
         =================================================================== -->
    <section>
      <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600;">
        2. Extended FAB (Ícone + Label)
      </h3>
      <!-- EXC-01: q-fab-action nativo temporário -->
      <DssFab icon="add" active-icon="close" color="primary" label="Nova Ação" direction="up">
        <q-fab-action color="primary" icon="mail" label="E-mail" />
        <q-fab-action color="secondary" icon="alarm" label="Lembrete" />
      </DssFab>
    </section>

    <!-- ===================================================================
         Cenário 3: Direções — right e down
         Demonstração de expansão para diferentes direções.
         =================================================================== -->
    <section>
      <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600;">
        3. Direções (right e down)
      </h3>
      <div style="display: flex; gap: 32px; align-items: flex-start;">
        <!-- Expansão para a direita -->
        <div>
          <p style="font-size: 12px; margin-bottom: 8px;">direction="right"</p>
          <!-- EXC-01: q-fab-action nativo temporário -->
          <DssFab icon="share" active-icon="close" color="secondary" direction="right">
            <q-fab-action color="secondary" icon="facebook" />
            <q-fab-action color="secondary" icon="linkedin" />
            <q-fab-action color="secondary" icon="twitter" />
          </DssFab>
        </div>

        <!-- Expansão para baixo -->
        <div>
          <p style="font-size: 12px; margin-bottom: 8px;">direction="down"</p>
          <!-- EXC-01: q-fab-action nativo temporário -->
          <DssFab icon="menu" active-icon="close" color="info" direction="down">
            <q-fab-action color="info" icon="settings" label="Configurações" />
            <q-fab-action color="info" icon="help" label="Ajuda" />
          </DssFab>
        </div>
      </div>
    </section>

    <!-- ===================================================================
         Cenário 4: Cores Semânticas
         Demonstração com secondary e warning.
         =================================================================== -->
    <section>
      <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600;">
        4. Cores Semânticas
      </h3>
      <div style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;">
        <div v-for="color in colorOptions" :key="color">
          <p style="font-size: 12px; margin-bottom: 8px;">{{ color }}</p>
          <!-- EXC-01: q-fab-action nativo temporário -->
          <DssFab icon="add" active-icon="close" :color="color" direction="up">
            <q-fab-action :color="color" icon="star" />
            <q-fab-action :color="color" icon="favorite" />
          </DssFab>
        </div>
      </div>
    </section>

    <!-- ===================================================================
         Cenário 5: Estado Disabled
         =================================================================== -->
    <section>
      <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600;">
        5. Estado Disabled
      </h3>
      <!-- EXC-01: q-fab-action nativo temporário -->
      <DssFab icon="add" color="primary" disable direction="up">
        <q-fab-action color="primary" icon="mail" />
      </DssFab>
    </section>

    <!-- ===================================================================
         Cenário 6: Brands (Hub, Water, Waste)
         =================================================================== -->
    <section>
      <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600;">
        6. Brandabilidade
      </h3>
      <div style="display: flex; gap: 24px; align-items: flex-start;">
        <div>
          <p style="font-size: 12px; margin-bottom: 8px;">brand="hub"</p>
          <!-- EXC-01: q-fab-action nativo temporário -->
          <DssFab icon="add" color="primary" brand="hub" direction="up">
            <q-fab-action color="primary" icon="star" />
          </DssFab>
        </div>
        <div>
          <p style="font-size: 12px; margin-bottom: 8px;">brand="water"</p>
          <!-- EXC-01: q-fab-action nativo temporário -->
          <DssFab icon="add" color="info" brand="water" direction="up">
            <q-fab-action color="info" icon="water_drop" />
          </DssFab>
        </div>
        <div>
          <p style="font-size: 12px; margin-bottom: 8px;">brand="waste"</p>
          <!-- EXC-01: q-fab-action nativo temporário -->
          <DssFab icon="add" color="positive" brand="waste" direction="up">
            <q-fab-action color="positive" icon="recycling" />
          </DssFab>
        </div>
      </div>
    </section>

    <!-- ===================================================================
         Cenário 7: Playground Interativo
         =================================================================== -->
    <section>
      <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600;">
        7. Playground Interativo
      </h3>

      <!-- Controles do Playground -->
      <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
        <div>
          <label style="font-size: 12px; display: block; margin-bottom: 4px;">Color</label>
          <select v-model="playgroundColor" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc;">
            <option v-for="c in colorOptions" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; display: block; margin-bottom: 4px;">Label (vazio = circular, preenchido = Extended)</label>
          <input v-model="playgroundLabel" placeholder="Ex: Nova Ação" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc;" />
        </div>
        <div>
          <label style="font-size: 12px; display: block; margin-bottom: 4px;">Direction</label>
          <select v-model="playgroundDirection" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc;">
            <option v-for="d in directionOptions" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <label style="font-size: 12px;">Disabled</label>
          <input type="checkbox" v-model="playgroundDisabled" />
        </div>
      </div>

      <!-- FAB do Playground -->
      <!-- Renderizado no fluxo normal do documento (não fixed/absolute)
           para provar que a expansão funciona independentemente do container.
           (Requisito 8.2 do pré-prompt) -->
      <div style="min-height: 200px; display: flex; align-items: center; justify-content: center; background: #fafafa; border-radius: 8px; border: 1px dashed #ddd;">
        <!-- EXC-01: q-fab-action nativo temporário — 3 ações para demonstrar coreografia -->
        <DssFab
          v-model="fabOpen"
          icon="add"
          active-icon="close"
          :color="playgroundColor"
          :label="playgroundLabel || undefined"
          :direction="playgroundDirection"
          :disable="playgroundDisabled"
        >
          <q-fab-action :color="playgroundColor" icon="mail" label="E-mail" />
          <q-fab-action :color="playgroundColor" icon="alarm" label="Lembrete" />
          <q-fab-action :color="playgroundColor" icon="add_task" label="Tarefa" />
        </DssFab>
      </div>
      <p style="font-size: 12px; color: #666; margin-top: 8px;">
        Estado: {{ fabOpen ? 'Expandido' : 'Colapsado' }}
        | Label: {{ playgroundLabel || '(vazio → circular)' }}
        | Direction: {{ playgroundDirection }}
      </p>
    </section>

  </div>
</template>
