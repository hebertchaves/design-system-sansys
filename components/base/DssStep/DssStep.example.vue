<script setup lang="ts">
/**
 * DssStep — Exemplos interativos
 *
 * Nota: DssStep é filho direto de q-stepper (ou DssStepper, quando existir).
 * Os exemplos usam q-stepper como container de scaffolding.
 * Isenção formal de .example.vue: containers q-stepper são permitidos
 * conforme política DSS_IMPLEMENTATION_GUIDE.md §9.
 */
import { ref } from 'vue'
import DssStep from './DssStep.vue'

// Exemplo 1: Stepper linear básico
const stepBasic = ref(1)

// Exemplo 2: Estados visuais (done + error)
const stepStates = ref(3)

// Exemplo 3: Navegação livre (header-nav)
const stepNav = ref(2)

// Exemplo 4: Com caption
const stepCaption = ref(1)

// Exemplo 5: Brand Hub
const stepBrand = ref(1)
</script>

<template>
  <div class="dss-step-examples q-pa-md q-gutter-y-xl">

    <!-- =================================================================
         Exemplo 1: Fluxo básico (inativo, ativo, futuro)
         ================================================================= -->
    <section>
      <p class="text-subtitle2 q-mb-sm">1. Fluxo básico — linear</p>
      <q-stepper
        v-model="stepBasic"
        flat
        animated
      >
        <DssStep :name="1" title="Dados Pessoais">
          <p>Preencha seus dados pessoais.</p>
          <q-btn label="Avançar" color="primary" @click="stepBasic = 2" />
        </DssStep>

        <DssStep :name="2" title="Endereço">
          <p>Informe seu endereço completo.</p>
          <q-btn label="Avançar" color="primary" @click="stepBasic = 3" />
        </DssStep>

        <DssStep :name="3" title="Confirmação">
          <p>Revise e confirme seus dados.</p>
          <q-btn label="Finalizar" color="primary" @click="stepBasic = 1" />
        </DssStep>
      </q-stepper>
    </section>

    <!-- =================================================================
         Exemplo 2: Estados visuais (done, error, disable)
         ================================================================= -->
    <section>
      <p class="text-subtitle2 q-mb-sm">2. Estados visuais: concluído, erro, desabilitado</p>
      <q-stepper
        v-model="stepStates"
        flat
        animated
      >
        <DssStep
          :name="1"
          title="Identificação"
          done
        >
          <p>Este passo está concluído.</p>
        </DssStep>

        <DssStep
          :name="2"
          title="Validação"
          error
        >
          <p>Este passo tem um erro.</p>
        </DssStep>

        <DssStep
          :name="3"
          title="Envio"
        >
          <p>Este passo está ativo.</p>
        </DssStep>

        <DssStep
          :name="4"
          title="Conclusão"
          disable
        >
          <p>Este passo está desabilitado.</p>
        </DssStep>
      </q-stepper>
    </section>

    <!-- =================================================================
         Exemplo 3: Navegação livre (header-nav=true)
         ================================================================= -->
    <section>
      <p class="text-subtitle2 q-mb-sm">3. Navegação livre (cabeçalho clicável)</p>
      <q-stepper
        v-model="stepNav"
        flat
        animated
      >
        <DssStep
          :name="1"
          title="Passo 1"
          header-nav
          done
        >
          <p>Clique nos cabeçalhos para navegar.</p>
        </DssStep>

        <DssStep
          :name="2"
          title="Passo 2"
          header-nav
        >
          <p>Passo atual — navegação livre ativa.</p>
        </DssStep>

        <DssStep
          :name="3"
          title="Passo 3"
          header-nav
        >
          <p>Passo futuro acessível diretamente.</p>
        </DssStep>
      </q-stepper>
    </section>

    <!-- =================================================================
         Exemplo 4: Com caption (título + subtítulo)
         ================================================================= -->
    <section>
      <p class="text-subtitle2 q-mb-sm">4. Com caption (subtítulo)</p>
      <q-stepper
        v-model="stepCaption"
        flat
        animated
      >
        <DssStep
          :name="1"
          title="Configuração inicial"
          caption="Preencha as informações básicas do projeto"
        >
          <p>Conteúdo do passo com subtítulo.</p>
          <q-btn label="Próximo" color="primary" @click="stepCaption = 2" />
        </DssStep>

        <DssStep
          :name="2"
          title="Integrações"
          caption="Conecte suas ferramentas externas"
          done-icon="integration_instructions"
        >
          <p>Conteúdo de integrações.</p>
          <q-btn label="Próximo" color="primary" @click="stepCaption = 3" />
        </DssStep>

        <DssStep
          :name="3"
          title="Publicação"
          caption="Revise e publique sua configuração"
          icon="publish"
        >
          <p>Conteúdo final.</p>
          <q-btn label="Publicar" color="primary" @click="stepCaption = 1" />
        </DssStep>
      </q-stepper>
    </section>

    <!-- =================================================================
         Exemplo 5: Brand Hub (laranja)
         ================================================================= -->
    <section>
      <p class="text-subtitle2 q-mb-sm">5. Brand Hub</p>
      <div data-brand="hub">
        <q-stepper
          v-model="stepBrand"
          flat
          animated
        >
          <DssStep
            :name="1"
            title="Análise"
            done
          >
            <p>Análise concluída com brand Hub.</p>
            <q-btn label="Avançar" @click="stepBrand = 2" />
          </DssStep>

          <DssStep
            :name="2"
            title="Processamento"
          >
            <p>Passo ativo com cor brand Hub.</p>
            <q-btn label="Avançar" @click="stepBrand = 3" />
          </DssStep>

          <DssStep
            :name="3"
            title="Resultado"
          >
            <p>Passo futuro.</p>
          </DssStep>
        </q-stepper>
      </div>
    </section>

  </div>
</template>
