<script setup lang="ts">
import { ref } from 'vue'
import DssBanner from './DssBanner.vue'

const showDismissible = ref(true)
const showSuccess = ref(true)

function resetBanners() {
  showDismissible.value = true
  showSuccess.value = true
}
</script>

<template>
  <div class="q-pa-lg q-gutter-y-md">

    <!-- Cenário 1: Variantes semânticas -->
    <section>
      <p class="text-subtitle2 q-mb-sm">Variantes semânticas</p>
      <div class="q-gutter-y-sm">
        <DssBanner>
          Banner padrão — sem variante semântica. Usado para mensagens neutras ou informações
          gerais sem urgência específica.
        </DssBanner>

        <DssBanner variant="info">
          <strong>Informação:</strong> Uma nova versão do sistema está disponível. Atualize
          para aproveitar as novas funcionalidades.
        </DssBanner>

        <DssBanner variant="success">
          <strong>Sucesso:</strong> Suas alterações foram salvas com sucesso e estão em vigor.
        </DssBanner>

        <DssBanner variant="warning">
          <strong>Atenção:</strong> Sua sessão expira em 5 minutos. Salve seu trabalho para
          não perder alterações.
        </DssBanner>

        <DssBanner variant="error">
          <strong>Erro:</strong> Não foi possível conectar ao servidor. Verifique sua conexão
          e tente novamente.
        </DssBanner>
      </div>
    </section>

    <!-- Cenário 2: Descartável (dismissible) -->
    <section>
      <p class="text-subtitle2 q-mb-sm">Banner descartável</p>
      <DssBanner
        v-if="showDismissible"
        variant="info"
        dismissible
        @dismiss="showDismissible = false"
      >
        Este banner pode ser fechado pelo usuário. Clique no botão × para dispensá-lo.
      </DssBanner>
      <div v-else class="text-caption text-grey-6 q-pa-sm">
        Banner dispensado.
        <a href="#" class="text-primary" @click.prevent="showDismissible = true">Mostrar novamente</a>
      </div>
    </section>

    <!-- Cenário 3: Com ações personalizadas -->
    <section>
      <p class="text-subtitle2 q-mb-sm">Com ações personalizadas</p>
      <DssBanner variant="warning">
        <template #default>
          <strong>Manutenção programada:</strong> O sistema ficará indisponível amanhã das
          02h às 04h para manutenção preventiva.
        </template>
        <template #actions>
          <q-btn flat size="sm" label="Saiba mais" no-caps />
          <q-btn flat size="sm" icon="close" round aria-label="Fechar" />
        </template>
      </DssBanner>
    </section>

    <!-- Cenário 4: Dense -->
    <section>
      <p class="text-subtitle2 q-mb-sm">Modo compacto (dense)</p>
      <div class="q-gutter-y-sm">
        <DssBanner variant="info" dense>
          Banner compacto — ideal para espaços reduzidos ou contextos com múltiplos avisos.
        </DssBanner>
        <DssBanner variant="error" dense dismissible @dismiss="() => {}">
          Erro de validação nos campos do formulário.
        </DssBanner>
      </div>
    </section>

    <!-- Cenário 5: Com bordas arredondadas -->
    <section>
      <p class="text-subtitle2 q-mb-sm">Com bordas arredondadas</p>
      <DssBanner variant="success" rounded>
        Operação concluída com sucesso. Seus dados foram processados.
      </DssBanner>
    </section>

    <!-- Cenário 6: Ícone personalizado -->
    <section>
      <p class="text-subtitle2 q-mb-sm">Ícone personalizado</p>
      <DssBanner variant="info" icon="update">
        Atualize o aplicativo para a versão mais recente para obter novas funcionalidades
        e correções de segurança.
      </DssBanner>
    </section>

    <!-- Cenário 7: Sem ícone -->
    <section>
      <p class="text-subtitle2 q-mb-sm">Sem ícone (prop icon="")</p>
      <DssBanner variant="warning" icon="">
        Aviso sem ícone. Use quando o contexto visual já indica a natureza da mensagem.
      </DssBanner>
    </section>

    <!-- Cenário 8: Brands -->
    <section>
      <p class="text-subtitle2 q-mb-sm">Com brandabilidade</p>
      <div class="q-gutter-y-sm">
        <div data-brand="hub">
          <DssBanner>
            <strong>Hub:</strong> Banner no contexto da marca Hub (laranja).
          </DssBanner>
        </div>
        <div data-brand="water">
          <DssBanner>
            <strong>Water:</strong> Banner no contexto da marca Water (azul).
          </DssBanner>
        </div>
        <div data-brand="waste">
          <DssBanner>
            <strong>Waste:</strong> Banner no contexto da marca Waste (verde).
          </DssBanner>
        </div>
      </div>
    </section>

    <!-- Cenário 9: Variante sucesso descartável (estado funcional) -->
    <section>
      <p class="text-subtitle2 q-mb-sm">Sucesso com descarte (estado funcional)</p>
      <DssBanner
        v-if="showSuccess"
        variant="success"
        dismissible
        dismiss-label="Fechar notificação de sucesso"
        @dismiss="showSuccess = false"
      >
        <strong>Cadastro realizado!</strong> Você receberá um e-mail de confirmação em breve.
      </DssBanner>
      <q-btn
        v-if="!showSuccess || !showDismissible"
        flat
        size="sm"
        label="Resetar exemplos"
        class="q-mt-sm"
        @click="resetBanners"
      />
    </section>

  </div>
</template>
