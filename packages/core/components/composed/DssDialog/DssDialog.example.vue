<!--
  ==========================================================================
  DssDialog — Exemplos de uso
  ==========================================================================

  Cinco cenários reais de overlay modal.

  Reescrito em set/2026. A versão anterior montava TUDO com `<button>` cru e
  `style` inline — inclusive o botão que abre cada diálogo, o "✕" de fechar e
  os campos do formulário. Era o anti-padrão que o Cartão Composto proíbe
  nominalmente ("não reimplementar primitivos — compor DSS"), e ainda carregava
  o token fantasma `--dss-hub-primary` com hex de fallback, que nunca existiu.

  O arquivo de exemplo é a superfície de USO documentada do componente: se ele
  mostra `<button>` cru, é isso que o consumidor copia.
-->
<template>
  <div class="dss-dialog-examples">

    <!-- ================================================================
         Cenário 1: Confirmação padrão
         ================================================================ -->
    <section>
      <h3>1. Confirmação padrão</h3>
      <p class="ex-nota">
        O caso mais comum: uma pergunta e duas saídas. O header carrega o título e o
        botão de fechar; o footer carrega as ações. Nenhum dos dois é do componente —
        são slots, e é o consumidor que decide o que entra.
      </p>

      <DssButton label="Abrir diálogo" color="primary" @click="confirmacaoAberta = true" />

      <DssDialog v-model:open="confirmacaoAberta">
        <template #header>
          <h4 class="ex-titulo">Confirmar exclusão</h4>
          <DssButton
            icon="close"
            variant="flat"
            size="sm"
            round
            aria-label="Fechar diálogo"
            @click="confirmacaoAberta = false"
          />
        </template>

        <p class="ex-corpo">
          Esta ação excluirá permanentemente o item selecionado. Não há como desfazer.
        </p>

        <template #footer>
          <DssButton label="Cancelar" variant="flat" @click="confirmacaoAberta = false" />
          <DssButton label="Excluir" color="negative" @click="confirmar" />
        </template>
      </DssDialog>
    </section>

    <!-- ================================================================
         Cenário 2: Formulário persistente
         ================================================================ -->
    <section>
      <h3>2. Formulário persistente</h3>
      <p class="ex-nota">
        <code>persistent</code> desliga o fechamento por ESC e por clique no fundo: a
        saída passa a ser obrigação do footer. É o certo quando há trabalho não salvo —
        e obriga o footer a SEMPRE oferecer um cancelar.
        <br>
        O botão de salvar mora no footer, <strong>fora</strong> do
        <code>&lt;form&gt;</code>, e por isso submete pela API imperativa do
        <code>DssForm</code> — é exatamente o caso que o <code>defineExpose</code> do
        formulário existe para atender.
      </p>

      <DssButton label="Abrir formulário" color="primary" @click="formularioAberto = true" />

      <DssDialog v-model:open="formularioAberto" persistent>
        <template #header>
          <h4 class="ex-titulo">Editar cadastro</h4>
        </template>

        <DssForm ref="formularioRef" @submit.prevent="salvar">
          <DssInput
            v-model="cadastro.nome"
            label="Nome completo"
            :rules="[(v) => !!v || 'Nome é obrigatório']"
          />
          <DssSelect
            v-model="cadastro.perfil"
            label="Perfil"
            :options="PERFIS"
            :rules="[(v) => !!v || 'Selecione um perfil']"
          />
          <DssCheckbox
            v-model="cadastro.aceite"
            label="Confirmo que os dados estão corretos"
            :rules="[(v) => v === true || 'É preciso confirmar']"
          />
        </DssForm>

        <template #footer>
          <DssButton label="Cancelar" variant="flat" @click="cancelarFormulario" />
          <DssButton label="Salvar" color="primary" @click="submeterDeFora" />
        </template>
      </DssDialog>
    </section>

    <!-- ================================================================
         Cenário 3: Tela cheia com tabela
         ================================================================ -->
    <section>
      <h3>3. Tela cheia, com tabela dentro</h3>
      <p class="ex-nota">
        <code>maximized</code> ocupa a viewport inteira. É aqui que o risco 2.2 do guia
        de Fase 3 aparece: com uma tabela dentro, alguém precisa ser dono do scroll.
        Quem rola é o <strong>corpo do diálogo</strong>; o header e o footer ficam
        parados. A tabela não declara altura própria.
      </p>

      <DssButton label="Abrir tela cheia" color="primary" @click="telaCheiaAberta = true" />

      <DssDialog v-model:open="telaCheiaAberta" maximized>
        <template #header>
          <h4 class="ex-titulo">Solicitações do período</h4>
          <DssButton
            icon="close"
            variant="flat"
            size="sm"
            round
            aria-label="Fechar"
            @click="telaCheiaAberta = false"
          />
        </template>

        <DssTable
          :rows="LINHAS"
          :columns="COLUNAS"
          row-key="protocolo"
          density="compact"
          flat
          hide-bottom
        />

        <template #footer>
          <DssButton label="Fechar" variant="flat" @click="telaCheiaAberta = false" />
        </template>
      </DssDialog>
    </section>

    <!-- ================================================================
         Cenário 4: Bottom sheet
         ================================================================ -->
    <section>
      <h3>4. Folha inferior (position="bottom")</h3>
      <p class="ex-nota">
        <code>position="bottom"</code> com <code>full-width</code> é o menu de ações de
        tela estreita. A lista de opções é um <code>DssList</code> — item de lista é
        item de lista, não botão estilizado.
      </p>

      <DssButton label="Abrir folha inferior" color="primary" @click="folhaAberta = true" />

      <DssDialog v-model:open="folhaAberta" position="bottom" full-width>
        <template #header>
          <h4 class="ex-titulo">Opções</h4>
          <DssButton
            icon="close"
            variant="flat"
            size="sm"
            round
            aria-label="Fechar"
            @click="folhaAberta = false"
          />
        </template>

        <DssList>
          <DssItem v-for="acao in ACOES" :key="acao.rotulo" clickable @click="folhaAberta = false">
            <DssItemSection avatar>
              <DssIcon :name="acao.icone" />
            </DssItemSection>
            <DssItemSection>{{ acao.rotulo }}</DssItemSection>
          </DssItem>
        </DssList>
      </DssDialog>
    </section>

    <!-- ================================================================
         Cenário 5: Marca atravessando o teleporte
         ================================================================ -->
    <section data-brand="hub">
      <h3>5. Marca atravessando o teleporte</h3>
      <p class="ex-nota">
        Este bloco vive dentro de <code>[data-brand="hub"]</code>, mas o diálogo é
        <strong>teleportado para o &lt;body&gt;</strong> — a cascata de CSS que carrega a
        marca não chega lá sozinha. É o risco 2.1 do guia de Fase 3. O
        <code>DssDialog</code> resolve repassando a marca explicitamente ao nó
        teleportado, e é por isso que o botão do footer sai laranja.
      </p>

      <DssButton label="Abrir (marca Hub)" color="primary" @click="marcaAberta = true" />

      <DssDialog v-model:open="marcaAberta">
        <template #header>
          <h4 class="ex-titulo">Ação Sansys Hub</h4>
          <DssButton
            icon="close"
            variant="flat"
            size="sm"
            round
            aria-label="Fechar"
            @click="marcaAberta = false"
          />
        </template>

        <p class="ex-corpo">
          A marca chegou até aqui pelo repasse explícito, não pela herança.
        </p>

        <template #footer>
          <DssButton label="Cancelar" variant="flat" @click="marcaAberta = false" />
          <DssButton label="Confirmar" color="primary" @click="marcaAberta = false" />
        </template>
      </DssDialog>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import DssDialog from './DssDialog.vue'
import DssForm from '../DssForm/DssForm.vue'
import DssTable from '../DssTable/DssTable.vue'
import DssButton from '../../base/DssButton/DssButton.vue'
import DssInput from '../../base/DssInput/DssInput.vue'
import DssSelect from '../../base/DssSelect/DssSelect.vue'
import DssCheckbox from '../../base/DssCheckbox/DssCheckbox.vue'
import DssList from '../../base/DssList/DssList.vue'
import DssIcon from '../../base/DssIcon/DssIcon.vue'
import { DssItem } from '../../base/DssItem'
import { DssItemSection } from '../../base/DssItemSection'

const confirmacaoAberta = ref(false)
const formularioAberto = ref(false)
const telaCheiaAberta = ref(false)
const folhaAberta = ref(false)
const marcaAberta = ref(false)

const cadastro = reactive({ nome: '', perfil: null as string | null, aceite: false })
const PERFIS = ['Administrador', 'Editor', 'Visualizador']

const ACOES = [
  { rotulo: 'Editar', icone: 'edit' },
  { rotulo: 'Compartilhar', icone: 'share' },
  { rotulo: 'Excluir', icone: 'delete' },
]

const COLUNAS = [
  { name: 'protocolo', label: 'Protocolo', field: 'protocolo', align: 'left' as const, sortable: true },
  { name: 'servico', label: 'Serviço', field: 'servico', align: 'left' as const, sortable: true },
  { name: 'situacao', label: 'Situação', field: 'situacao', align: 'left' as const },
]

const LINHAS = Array.from({ length: 18 }, (_, i) => ({
  protocolo: String(65665262 + i),
  servico: ['Religação de água', 'Aferição de hidrômetro', 'Troca de hidrômetro'][i % 3],
  situacao: ['Atrasada', 'No prazo', 'A vencer'][i % 3],
}))

const formularioRef = ref<{ validate: () => Promise<boolean> | undefined; reset: () => void } | null>(null)

function confirmar() {
  confirmacaoAberta.value = false
}

/**
 * O botão de salvar está no FOOTER — fora do `<form>`. Submeter daqui só é
 * possível porque o DssForm expõe a API imperativa; um `type="submit"` não
 * alcançaria o formulário a partir daqui.
 */
async function submeterDeFora() {
  const valido = await formularioRef.value?.validate()
  if (valido) salvar()
}

function salvar() {
  formularioAberto.value = false
}

function cancelarFormulario() {
  formularioRef.value?.reset()
  Object.assign(cadastro, { nome: '', perfil: null, aceite: false })
  formularioAberto.value = false
}
</script>

<style scoped>
.dss-dialog-examples {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
}

.dss-dialog-examples h3 {
  margin: 0 0 var(--dss-spacing-2);
  font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold);
  line-height: var(--dss-line-height-snug);
  color: var(--dss-text-primary);
}

.ex-nota {
  margin: 0 0 var(--dss-spacing-3);
  max-width: 76ch;
  font-size: var(--dss-font-size-sm);
  line-height: var(--dss-line-height-relaxed);
  color: var(--dss-text-subtle);
}

/* O título do header é do CONSUMIDOR — o DssDialog entrega a região, não a
   tipografia. Sem isto o <h4> cai na escala Material do Quasar (2,125rem). */
.ex-titulo {
  margin: 0;
  font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold);
  line-height: var(--dss-line-height-snug);
  color: var(--dss-text-primary);
}

.ex-corpo {
  margin: 0;
  color: var(--dss-text-body);
}
</style>
