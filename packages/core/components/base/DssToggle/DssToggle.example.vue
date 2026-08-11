<template>
  <div class="dss-toggle-examples">
    <!-- ================================================================
         Exemplo 1: Toggle basico
         ================================================================ -->
    <section>
      <h3>1. Toggle Basico</h3>
      <DssToggle
        v-model="basicToggle"
        label="Enable notifications"
      />
      <p>Valor: {{ basicToggle }}</p>
    </section>

    <!-- ================================================================
         Exemplo 2: Tamanhos
         ================================================================ -->
    <section>
      <h3>2. Tamanhos</h3>
      <DssToggle v-model="sizeToggle" size="xs" label="Extra Small" />
      <DssToggle v-model="sizeToggle" size="sm" label="Small" />
      <DssToggle v-model="sizeToggle" size="md" label="Medium (padrao)" />
      <DssToggle v-model="sizeToggle" size="lg" label="Large" />
      <DssToggle v-model="sizeToggle" size="xl" label="Extra Large" />
    </section>

    <!-- ================================================================
         Exemplo 3: Cores (sem brand)
         ================================================================ -->
    <section>
      <h3>3. Cores</h3>
      <DssToggle v-model="colorToggle" color="primary" label="Primary" />
      <DssToggle v-model="colorToggle" color="secondary" label="Secondary" />
      <DssToggle v-model="colorToggle" color="accent" label="Accent" />
      <DssToggle v-model="colorToggle" color="positive" label="Positive" />
      <DssToggle v-model="colorToggle" color="negative" label="Negative" />
    </section>

    <!-- ================================================================
         Exemplo 4: Brands
         ================================================================ -->
    <section>
      <h3>4. Brands</h3>
      <DssToggle v-model="brandToggle" brand="hub" color="primary" label="Hub Primary" />
      <DssToggle v-model="brandToggle" brand="water" color="primary" label="Water Primary" />
      <DssToggle v-model="brandToggle" brand="waste" color="primary" label="Waste Primary" />
    </section>

    <!-- ================================================================
         Exemplo 5: Estados
         ================================================================ -->
    <section>
      <h3>5. Estados</h3>
      <DssToggle v-model="stateToggle" label="Normal" />
      <DssToggle v-model="disabledOff" disable label="Disabled (off)" />
      <DssToggle v-model="disabledOn" disable label="Disabled (on)" />
      <DssToggle v-model="errorToggle" error error-message="Campo obrigatorio" label="Error" />
      <DssToggle v-model="denseToggle" dense label="Dense" />
    </section>

    <!-- ================================================================
         Exemplo 6: Left Label
         ================================================================ -->
    <section>
      <h3>6. Left Label</h3>
      <DssToggle v-model="leftToggle" left-label label="Label a esquerda" />
    </section>

    <!-- ================================================================
         Exemplo 7: Slot customizado
         ================================================================ -->
    <section>
      <h3>7. Slot Customizado</h3>
      <DssToggle v-model="slotToggle">
        <span>
          <strong>Dark Mode</strong>
          <br />
          <small>Ativar tema escuro</small>
        </span>
      </DssToggle>
    </section>

    <!-- ================================================================
         Exemplo 8: Array mode (grupo)
         ================================================================ -->
    <section>
      <h3>8. Array Mode (grupo)</h3>
      <DssToggle v-model="features" val="wifi" label="Wi-Fi" />
      <DssToggle v-model="features" val="bluetooth" label="Bluetooth" />
      <DssToggle v-model="features" val="nfc" label="NFC" />
      <p>Ativos: {{ features.join(', ') || 'nenhum' }}</p>
    </section>

    <!-- ================================================================
         Exemplo 9: Acessibilidade
         ================================================================ -->
    <section>
      <h3>9. Acessibilidade</h3>
      <DssToggle
        v-model="a11yToggle"
        aria-label="Ativar modo de alto contraste"
        label="Alto Contraste"
      />
    </section>

    <!-- ================================================================
         Exemplo 10: keepColor (escape hatch de cor no desligado)
         ================================================================ -->
    <section>
      <h3>10. keepColor (escape hatch)</h3>
      <p class="example-description">
        Por padrao o track desligado e cinza. Com <code>keepColor</code>, a
        BORDA recebe a cor — o fundo continua muted e o thumb cinza, para que
        ligado e desligado sigam distinguiveis sem depender so da cor.
      </p>
      <DssToggle v-model="keepOff" label="Padrao — desligado cinza" />
      <DssToggle v-model="keepOn" label="keepColor — borda colorida" keep-color />
    </section>

    <!-- ================================================================
         Exemplo 11: checkedIcon (glifo dentro do thumb)
         ================================================================ -->
    <section>
      <h3>11. checkedIcon (glifo no thumb)</h3>
      <p class="example-description">
        Sem a prop, o thumb e liso. Informar <code>checkedIcon</code> coloca o
        glifo dentro do thumb quando ligado; desligado segue sem glifo.
      </p>
      <DssToggle v-model="iconPlain" label="Padrao (thumb liso)" />
      <DssToggle v-model="iconCheck" label="Com glifo (check)" checked-icon="check" />
      <DssToggle v-model="iconBolt" label="Com glifo (bolt), tamanho lg" checked-icon="bolt" size="lg" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssToggle from './1-structure/DssToggle.ts.vue'

const basicToggle = ref(false)
const sizeToggle = ref(true)
const colorToggle = ref(true)
const brandToggle = ref(true)
const stateToggle = ref(false)
const disabledOff = ref(false)
const disabledOn = ref(true)
const errorToggle = ref(false)
const denseToggle = ref(false)
const leftToggle = ref(false)
const slotToggle = ref(false)
const features = ref<string[]>(['wifi'])
const a11yToggle = ref(false)
// Deliberadamente DESLIGADOS: o ponto do exemplo 10 e o estado em repouso
const keepOff = ref(false)
const keepOn = ref(false)
const iconPlain = ref(true)
const iconCheck = ref(true)
const iconBolt = ref(true)
</script>
