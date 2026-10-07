<template>
  <PlaygroundLayout
    title="DssForm — Playground"
    code="composed/DssForm"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. O que o container é ──────────────────────────────────────── -->
    <PgSection
      id="anatomia" index="01" title="O que o container é" :count="2"
      desc="O DssForm é um &lt;form&gt; nativo e nada mais: o QForm é o nó RAIZ, sem wrapper DSS em volta (EXC-Gate-01). Envolver quebraria a relação form↔campos, e com ela o Enter que submete a partir de um campo de texto. Todo o CSS do componente é UMA declaração — o gap entre campos —, o que significa que o consumidor não põe margin no campo."
    >
      <PgGrid>
        <PgTile code="o gap é do formulário, não do campo" align="stretch">
          <DssForm ref="anatomiaRef" class="fm-stage">
            <DssInput v-model="anatomia.a" label="Primeiro campo" />
            <DssInput v-model="anatomia.b" label="Segundo campo" />
            <DssInput v-model="anatomia.c" label="Terceiro campo" />
          </DssForm>
          <p class="fm-nota">
            gap medido: <strong>{{ gapMedido }}</strong> — vem de
            <code>--dss-form-gap</code> → <code>--dss-spacing-4</code>
          </p>
        </PgTile>
        <PgTile code="nó raiz renderizado" align="stretch">
          <DssForm class="fm-stage" aria-label="Formulário de inspeção">
            <DssInput v-model="anatomia.d" label="Campo" />
          </DssForm>
          <p class="fm-nota">
            tag raiz: <strong>&lt;{{ tagRaiz }}&gt;</strong> · classes:
            <code>{{ classesRaiz }}</code>
          </p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. As três props ────────────────────────────────────────────── -->
    <PgSection
      id="props" index="02" title="As três props do container" :count="3"
      desc="O DssForm expõe um subconjunto governado da API do QForm — só o que faz sentido em nível de container. autofocus foca o primeiro campo na montagem; greedy valida TODOS os campos em vez de parar no primeiro inválido; noErrorFocus desliga o salto de foco para o campo reprovado. Props de aparência (dark) são bloqueadas: tema é global, via [data-theme]."
    >
      <PgGrid>
        <PgTile code="padrão — para no primeiro inválido" align="stretch">
          <DssForm ref="padraoRef" class="fm-stage">
            <DssTextarea v-model="greedyA.x" label="Campo 1" :rules="SEMPRE_REPROVA" />
            <DssTextarea v-model="greedyA.y" label="Campo 2" :rules="SEMPRE_REPROVA" />
          </DssForm>
          <DssButton label="validate()" variant="outline" size="sm" @click="validar('padraoRef')" />
        </PgTile>
        <PgTile code="greedy — valida todos" align="stretch">
          <DssForm ref="greedyRef" greedy class="fm-stage">
            <DssTextarea v-model="greedyB.x" label="Campo 1" :rules="SEMPRE_REPROVA" />
            <DssTextarea v-model="greedyB.y" label="Campo 2" :rules="SEMPRE_REPROVA" />
          </DssForm>
          <DssButton label="validate()" variant="outline" size="sm" @click="validar('greedyRef')" />
        </PgTile>
        <PgTile code="noErrorFocus — não salta o foco" align="stretch">
          <DssForm ref="semFocoRef" no-error-focus class="fm-stage">
            <DssTextarea v-model="semFoco.x" label="Campo que reprova" :rules="SEMPRE_REPROVA" />
          </DssForm>
          <DssButton label="validate()" variant="outline" size="sm" @click="validar('semFocoRef')" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Alcance da validação — o achado ──────────────────────────── -->
    <PgSection
      id="alcance" index="03" title="Alcance da validação — os seis campos" :count="6"
      desc="Esta seção é a TRAVA de uma regressão medida em set/2026. O motor é o do QForm, que só valida os componentes registrados nele — e os campos do DSS não são todos wrappers de Quasar: DssInput, DssCheckbox, DssToggle e DssRadio são construção explícita sobre &lt;input&gt; nativo e não se registravam sozinhos. O resultado era o pior possível: validate() respondia `true` para campo com regra que sempre reprova, e formulário com obrigatório vazio se declarava válido. O registro agora é feito pelo useFieldValidation, via o ponto de extensão público do Quasar (useFormChild). Cada tile tem uma regra que SEMPRE reprova: TODOS têm de sair `false`. Um `true` aqui é regressão."
    >
      <PgGrid>
        <PgTile v-for="c in ALCANCE" :key="c.nome" :code="c.code" align="stretch">
          <DssForm :ref="c.ref" class="fm-stage">
            <component
              :is="c.componente"
              v-model="alcance[c.nome]"
              label="Campo com regra que sempre reprova"
              :rules="SEMPRE_REPROVA"
              v-bind="c.props || {}"
            />
          </DssForm>
          <div class="fm-veredito">
            <DssButton label="validate()" variant="outline" size="sm" @click="medirAlcance(c)" />
            <span v-if="c.nome in veredito" :class="['fm-tag', veredito[c.nome] ? 'fm-tag--falso' : 'fm-tag--ok']">
              {{ veredito[c.nome] ? 'true — REGRESSÃO: regra ignorada' : 'false — regra aplicada' }}
            </span>
          </div>
          <p class="fm-nota">motor: <code>{{ c.motor }}</code></p>
        </PgTile>
      </PgGrid>
      <p class="fm-nota fm-nota--bloco">
        <strong>O <code>DssField</code> fica de fora, e é correto.</strong> Ele é moldura —
        rótulo flutuante, borda, área de hint e erro — e não tem <code>modelValue</code>:
        quem guarda o valor é o controle que o consumidor monta no slot. Registrar a moldura
        no formulário faria o <code>validate()</code> perguntar a quem não tem resposta.
      </p>
    </PgSection>

    <!-- ── 04. Aninhamento ──────────────────────────────────────────────── -->
    <PgSection
      id="aninhamento" index="04" title="Aninhamento dos campos" :count="1"
      desc="O caso real: quatro tipos de campo dentro de um mesmo formulário. O que se mede aqui é o RITMO — o respiro entre campos sai todo do gap do container, sem uma margem declarada em campo nenhum. Note que os campos têm alturas visuais diferentes e o gap não compensa isso: alinhar rótulo e base é trabalho do campo, não do formulário."
    >
      <PgGrid :cols="1">
        <PgTile code="Input · Select · Checkbox · Textarea" align="stretch">
          <DssForm ref="ninhoRef" class="fm-stage" aria-label="Formulário de cadastro">
            <DssInput v-model="ninho.nome" label="Nome completo" />
            <DssSelect v-model="ninho.perfil" label="Perfil" :options="PERFIS" />
            <DssTextarea v-model="ninho.obs" label="Observações" />
            <DssCheckbox v-model="ninho.aceite" label="Aceito os termos" />
            <div class="fm-acoes">
              <DssButton type="submit" label="Enviar" color="primary" size="sm" />
              <DssButton type="reset" label="Limpar" variant="flat" size="sm" />
            </div>
          </DssForm>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. API imperativa ───────────────────────────────────────────── -->
    <PgSection
      id="imperativa" index="05" title="API imperativa — os quatro métodos" :count="4"
      desc="O DssForm expõe validate, resetValidation, submit e reset (EXC-Expose-01), delegando ao QForm interno. É o que permite submeter de um botão FORA do formulário — caso do rodapé de um DssDialog, onde a ação não pode morar dentro do &lt;form&gt;. Repare na diferença entre reset (zera valores e erros) e resetValidation (zera só os erros exibidos)."
    >
      <PgGrid :cols="1">
        <PgTile code="os quatro métodos sobre o mesmo formulário" align="stretch">
          <DssForm ref="imperativoRef" class="fm-stage" @submit.prevent="registrar('submit disparado')">
            <DssTextarea v-model="imperativo.assunto" label="Assunto" :rules="OBRIGATORIO" />
            <DssTextarea v-model="imperativo.msg" label="Mensagem" :rules="OBRIGATORIO" />
          </DssForm>
          <div class="fm-acoes">
            <DssButton label="validate()" variant="outline" size="sm" @click="validar('imperativoRef')" />
            <DssButton label="submit()" color="primary" size="sm" @click="chamar('submit')" />
            <DssButton label="resetValidation()" variant="flat" size="sm" @click="chamar('resetValidation')" />
            <DssButton label="reset()" variant="flat" size="sm" @click="chamar('reset')" />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Os quatro eventos ────────────────────────────────────────── -->
    <PgSection
      id="eventos" index="06" title="Os quatro eventos" :count="4"
      desc="submit, reset, validationError e validationSuccess. O validationError carrega a REF do primeiro campo reprovado — não um índice, não uma lista: é só isso que o QForm entrega. Exercite o formulário e leia o registro; ele é a prova de que o evento sai e com que carga."
    >
      <PgGrid>
        <PgTile code="formulário instrumentado" align="stretch">
          <DssForm
            ref="eventosRef"
            class="fm-stage"
            @submit.prevent="registrar('submit')"
            @reset="registrar('reset')"
            @validation-error="registrar('validationError (ref do campo reprovado)')"
            @validation-success="registrar('validationSuccess')"
          >
            <DssTextarea v-model="eventos.campo" label="Preencha para o submit passar" :rules="OBRIGATORIO" />
            <div class="fm-acoes">
              <DssButton type="submit" label="Enviar" color="primary" size="sm" />
              <DssButton type="reset" label="Limpar" variant="flat" size="sm" />
            </div>
          </DssForm>
        </PgTile>
        <PgTile code="registro" align="stretch">
          <ol v-if="registro.length" class="fm-log">
            <li v-for="(l, i) in registro" :key="i"><code>{{ l }}</code></li>
          </ol>
          <p v-else class="fm-nota">Sem eventos ainda — use o formulário ao lado.</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="07" title="Exemplos de uso" :count="4"
      desc="Cenários reais, vindos do DssForm.example.vue do próprio componente."
    >
      <DssFormExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssForm from '@components/composed/DssForm/DssForm.vue'
import DssFormExample from '@components/composed/DssForm/DssForm.example.vue'
import DssInput from '@components/base/DssInput/DssInput.vue'
import DssSelect from '@components/base/DssSelect/DssSelect.vue'
import DssCheckbox from '@components/base/DssCheckbox/DssCheckbox.vue'
import DssTextarea from '@components/base/DssTextarea/DssTextarea.vue'
import DssToggle from '@components/base/DssToggle/DssToggle.vue'
import DssRadio from '@components/base/DssRadio/DssRadio.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

type FormRef = {
  validate: (f?: boolean) => Promise<boolean> | undefined
  resetValidation: () => void
  submit: (e?: Event) => void
  reset: () => void
} | null

// Regra que reprova SEMPRE — é o instrumento de medição da seção 03:
// se o veredito vier `true`, a regra não foi consultada.
const SEMPRE_REPROVA = [() => 'esta regra sempre reprova']
const OBRIGATORIO = [(v: unknown) => !!v || 'campo obrigatório']
const PERFIS = ['Administrador', 'Editor', 'Visualizador']

const anatomia = reactive({ a: '', b: '', c: '', d: '' })
const greedyA = reactive({ x: '', y: '' })
const greedyB = reactive({ x: '', y: '' })
const semFoco = reactive({ x: '' })
const ninho = reactive({ nome: '', perfil: null as string | null, obs: '', aceite: false })
const imperativo = reactive({ assunto: '', msg: '' })
const eventos = reactive({ campo: '' })
const alcance = reactive<Record<string, unknown>>({
  DssInput: '', DssSelect: null, DssCheckbox: false, DssTextarea: '',
  DssToggle: false, DssRadio: null,
})

const anatomiaRef = ref<FormRef>(null)
const padraoRef = ref<FormRef>(null)
const greedyRef = ref<FormRef>(null)
const semFocoRef = ref<FormRef>(null)
const ninhoRef = ref<FormRef>(null)
const imperativoRef = ref<FormRef>(null)
const eventosRef = ref<FormRef>(null)
const alcanceRefs = ref<Record<string, FormRef>>({})

const REFS: Record<string, { value: FormRef }> = {
  anatomiaRef, padraoRef, greedyRef, semFocoRef, ninhoRef, imperativoRef, eventosRef,
}

/**
 * Os quatro campos da seção 03, com o motor que cada um usa por baixo.
 * O motor é o que decide se o campo se registra no QForm — medido no disco,
 * não suposto: DssSelect renderiza QSelect e DssTextarea renderiza QInput,
 * enquanto DssInput e DssCheckbox renderizam <input> nativo.
 */
const ALCANCE = [
  { nome: 'DssInput',    code: 'DssInput',    componente: DssInput,    motor: '<input> nativo + useFieldValidation', ref: (el: unknown) => { alcanceRefs.value.DssInput = el as FormRef } },
  { nome: 'DssCheckbox', code: 'DssCheckbox', componente: DssCheckbox, motor: '<input> nativo + useFieldValidation', ref: (el: unknown) => { alcanceRefs.value.DssCheckbox = el as FormRef } },
  { nome: 'DssToggle',   code: 'DssToggle',   componente: DssToggle,   motor: '<input> nativo + useFieldValidation', ref: (el: unknown) => { alcanceRefs.value.DssToggle = el as FormRef } },
  { nome: 'DssRadio',    code: 'DssRadio',    componente: DssRadio,    motor: '<input> nativo + useFieldValidation', props: { val: 'a' }, ref: (el: unknown) => { alcanceRefs.value.DssRadio = el as FormRef } },
  { nome: 'DssSelect',   code: 'DssSelect',   componente: DssSelect,   motor: 'QSelect (registro nativo do Quasar)', props: { options: PERFIS }, ref: (el: unknown) => { alcanceRefs.value.DssSelect = el as FormRef } },
  { nome: 'DssTextarea', code: 'DssTextarea', componente: DssTextarea, motor: 'QInput (registro nativo do Quasar)',  ref: (el: unknown) => { alcanceRefs.value.DssTextarea = el as FormRef } },
]

const veredito = reactive<Record<string, boolean>>({})
const registro = ref<string[]>([])
const gapMedido = ref('—')
const tagRaiz = ref('—')
const classesRaiz = ref('—')

async function validar(nome: string) {
  const ok = await REFS[nome]?.value?.validate()
  registrar(`${nome}.validate() → ${ok}`)
}

async function medirAlcance(c: (typeof ALCANCE)[number]) {
  const ok = await alcanceRefs.value[c.nome]?.validate()
  veredito[c.nome] = ok === true
}

function chamar(metodo: 'submit' | 'reset' | 'resetValidation') {
  imperativoRef.value?.[metodo]()
  registrar(`imperativoRef.${metodo}()`)
}

function registrar(texto: string) {
  registro.value.unshift(`${new Date().toLocaleTimeString('pt-BR')} · ${texto}`)
  registro.value = registro.value.slice(0, 12)
}

// Mede o que o componente de fato entrega, em vez de repetir o token de cor.
onMounted(async () => {
  await nextTick()
  const form = document.querySelector('.fm-stage.dss-form') as HTMLElement | null
  if (!form) return
  gapMedido.value = getComputedStyle(form).rowGap || '—'
  tagRaiz.value = form.tagName.toLowerCase()
  classesRaiz.value = form.className
})

const SECTIONS = [
  { id: 'anatomia',    index: '01', title: 'O que o container é' },
  { id: 'props',       index: '02', title: 'As três props do container' },
  { id: 'alcance',     index: '03', title: 'Alcance da validação — os seis campos' },
  { id: 'aninhamento', index: '04', title: 'Aninhamento dos campos' },
  { id: 'imperativa',  index: '05', title: 'API imperativa — os quatro métodos' },
  { id: 'eventos',     index: '06', title: 'Os quatro eventos' },
  { id: 'exemplos',    index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 3, label: 'Props' },
  { value: 4, label: 'Emits' },
  { value: 4, label: 'Métodos' },
  { value: 1, label: 'Slot' },
]
</script>

<style scoped>
.fm-stage {
  width: 100%;
}

.fm-acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dss-spacing-2);
}

/* Botão solto logo abaixo de um formulário com campo de mensagem: mesma
   colisão com o .q-field__bottom absoluto descrita acima. */
.fm-stage + .dss-button {
  margin-top: var(--dss-spacing-8);
}

.fm-nota {
  margin: var(--dss-spacing-2) 0 0;
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}

/* O respiro maior aqui NÃO é estética: a mensagem de erro do campo mora em
   .q-field__bottom, que o Quasar posiciona ABSOLUTO na variante animada — ela
   não reserva espaço e invade o que vier depois do formulário. Medido: 29px de
   altura fora da caixa do <form>. --dss-spacing-8 (32px) cobre com folga. */
.fm-nota--bloco {
  margin-top: var(--dss-spacing-4);
  font-size: var(--dss-font-size-sm);
  max-width: 72ch;
}

.fm-veredito {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  margin-top: var(--dss-spacing-8);
  flex-wrap: wrap;
}

.fm-tag {
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-semibold);
  padding: var(--dss-spacing-1) var(--dss-spacing-2);
  border-radius: var(--dss-radius-sm);
}

.fm-tag--ok {
  color: var(--dss-feedback-success);
  background: var(--dss-surface-subtle);
}

.fm-tag--falso {
  color: var(--dss-feedback-error);
  background: var(--dss-surface-subtle);
}

.fm-log {
  margin: 0;
  padding-left: var(--dss-spacing-5);
  font-size: var(--dss-font-size-xs);
  line-height: var(--dss-line-height-relaxed);
  color: var(--dss-text-subtle);
}
</style>
