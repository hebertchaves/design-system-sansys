<template>
  <section
    ref="raiz"
    :class="headerClasses"
    :data-brand="brand || undefined"
    :aria-label="ariaLabel"
    v-bind="$attrs"
  >
    <!-- ================================================================
         IDENTIDADE — quem está sendo atendido

         Sobrevive à retração INTEIRA. É o dado que o operador dita ao
         telefone; esconder ao retrair obrigaria a expandir para conferir, e
         a retração deixaria de economizar qualquer coisa.
         ================================================================ -->
    <div class="dss-context-header__identity">
      <!--
        Botão de registros. O ÍCONE é o mesmo nos dois estados — muda só o
        badge: `add_circle` quando não há nada cadastrado, contador a partir
        de 1. O destino do clique é o mesmo modal nos dois casos, então um
        ícone diferente anunciaria um destino diferente que não existe.
      -->
      <span
        class="dss-context-header__hint-anchor"
        @mouseenter="mostrarDica('records')"
        @mouseleave="esconderDica('records')"
        @focusin="mostrarDica('records')"
        @focusout="esconderDica('records')"
      >
        <button
          type="button"
          class="dss-context-header__records"
          :aria-label="rotuloDeRegistros"
          @click="$emit('open-records')"
        >
          <DssIcon
            :name="identityIcon"
            class="dss-context-header__records-icon"
            inline
            decorative
          />
        </button>

        <!--
          O badge é IRMÃO do botão, não filho — por duas razões medidas.
          (1) O `DssBadge` é um `<div role="status" aria-live>`; dentro de um
          `<button>` o HTML não permite conteúdo de fluxo, e uma região viva
          aninhada num controle é anunciada fora de hora.
          (2) Sobreposto por `absolute` + `pointer-events: none`, o clique
          atravessa para o botão — o alvo continua sendo um só, inteiro.

          Ele é DECORATIVO para o leitor de tela: a contagem já está no
          `aria-label` do botão. Sem o `aria-hidden` o número é anunciado duas
          vezes, e na segunda sem dizer de que ele é contagem.
        -->
        <DssBadge
          v-if="temRegistros"
          class="dss-context-header__records-badge"
          color="negative"
          rounded
          :label="String(recordsCount)"
          aria-hidden="true"
        />
        <DssIcon
          v-else
          name="add_circle"
          class="dss-context-header__records-badge dss-context-header__records-badge--add"
          inline
          decorative
        />

        <DssTooltip
          :visible="dicaAtiva === 'records'"
          class="dss-context-header__hint dss-context-header__hint--below"
        >
          {{ rotuloDeRegistros }}
        </DssTooltip>
      </span>

      <!--
        O identificador. `identifierLabel` é visualmente oculto porque o
        protótipo mostra o número sozinho — mas sem ele o leitor de tela
        anuncia "652701-9" sem dizer o que o número é.
      -->
      <p class="dss-context-header__identifier">
        <slot name="identity">
          <span class="dss-context-header__sr-only">{{ identifierLabel }}: </span>
          <span class="dss-context-header__identifier-value">{{ identifier }}</span>
        </slot>
      </p>

      <span
        class="dss-context-header__hint-anchor"
        @mouseenter="mostrarDica('details')"
        @mouseleave="esconderDica('details')"
        @focusin="mostrarDica('details')"
        @focusout="esconderDica('details')"
      >
        <DssButton
          class="dss-context-header__details"
          variant="unelevated"
          color="primary"
          size="sm"
          dense
          :icon="detailsIcon"
          :label="detailsLabel"
          @click="$emit('open-details')"
        />

        <DssTooltip
          :visible="dicaAtiva === 'details'"
          class="dss-context-header__hint dss-context-header__hint--below"
        >
          {{ detailsTooltip }}
        </DssTooltip>
      </span>
    </div>

    <!-- ================================================================
         INFORMAÇÕES — uma coluna por assunto

         `dl`/`dt`/`dd` e não `div`: o par rótulo/valor TEM semântica de
         termo/definição, e o leitor de tela anuncia "Ligação água, Ativa"
         em vez de dois textos soltos na mesma linha.
         ================================================================ -->
    <div :id="idDoConteudo" class="dss-context-header__groups">
      <dl
        v-for="grupo in gruposVisiveis"
        :key="grupo.name"
        class="dss-context-header__group"
        :style="{ flexGrow: grupo.span ?? 1 }"
        :aria-label="grupo.label || undefined"
      >
        <div
          v-for="item in grupo.items"
          :key="item.name"
          class="dss-context-header__item"
        >
          <dt class="dss-context-header__label">{{ item.label }}:</dt>

          <dd class="dss-context-header__value" :data-tone="item.tone || 'neutral'">
            <!--
              `title` carrega o valor inteiro quando a coluna é estreita e o
              texto trunca. Truncar sem isto APAGA informação — e o dado que
              some primeiro é o fim do endereço, justo o complemento.
            -->
            <span class="dss-context-header__value-text" :title="item.value">
              <slot :name="`item-${item.name}`" :item="item" :collapsed="estaRetraido">
                {{ item.value }}
              </slot>
            </span>

            <span
              v-if="item.action"
              class="dss-context-header__hint-anchor"
              @mouseenter="mostrarDica(`item:${item.name}`)"
              @mouseleave="esconderDica(`item:${item.name}`)"
              @focusin="mostrarDica(`item:${item.name}`)"
              @focusout="esconderDica(`item:${item.name}`)"
            >
              <button
                type="button"
                class="dss-context-header__item-action"
                :aria-label="item.action.label"
                @click="$emit('item-action', item.name)"
              >
                <DssIcon
                  :name="item.action.icon"
                  class="dss-context-header__item-action-icon"
                  inline
                  decorative
                />
              </button>

              <DssTooltip
                :visible="dicaAtiva === `item:${item.name}`"
                class="dss-context-header__hint dss-context-header__hint--below"
              >
                {{ item.action.label }}
              </DssTooltip>
            </span>
          </dd>
        </div>
      </dl>
    </div>

    <!-- ================================================================
         TRILHO — as ações de SESSÃO

         Alternar e criar atendimento não pertencem ao registro exibido:
         pertencem à sessão do atendente. Por isso vivem separados, numa
         coluna própria, e não misturados com "detalhes" do cadastro.

         Retraído, o trilho guarda só o gatilho de expandir — é o que o
         protótipo mostra, e é coerente: a faixa retraída existe para
         devolver altura, não para manter três alvos de 44px.
         ================================================================ -->
    <div class="dss-context-header__rail">
      <span
        v-if="switchable && !estaRetraido"
        class="dss-context-header__hint-anchor dss-context-header__rail-slot"
        @mouseenter="mostrarDica('switch')"
        @mouseleave="esconderDica('switch')"
        @focusin="mostrarDica('switch')"
        @focusout="esconderDica('switch')"
      >
        <button
          type="button"
          class="dss-context-header__rail-btn"
          :aria-label="rotuloDeAlternar"
          @click="$emit('switch')"
        >
          <DssIcon
            :name="switchIcon"
            class="dss-context-header__rail-icon"
            inline
            decorative
          />
        </button>

        <!-- Irmão e decorativo, pela mesma razão do badge de registros. -->
        <DssBadge
          v-if="temAtendimentosAbertos"
          class="dss-context-header__rail-badge"
          color="negative"
          rounded
          :label="String(openCount)"
          aria-hidden="true"
        />

        <DssTooltip
          :visible="dicaAtiva === 'switch'"
          class="dss-context-header__hint dss-context-header__hint--before"
        >
          {{ rotuloDeAlternar }}
        </DssTooltip>
      </span>

      <span
        v-if="creatable && !estaRetraido"
        class="dss-context-header__hint-anchor dss-context-header__rail-slot"
        @mouseenter="mostrarDica('create')"
        @mouseleave="esconderDica('create')"
        @focusin="mostrarDica('create')"
        @focusout="esconderDica('create')"
      >
        <button
          type="button"
          class="dss-context-header__rail-btn"
          :aria-label="createLabel"
          @click="$emit('create')"
        >
          <DssIcon
            :name="createIcon"
            class="dss-context-header__rail-icon"
            inline
            decorative
          />
        </button>

        <DssTooltip
          :visible="dicaAtiva === 'create'"
          class="dss-context-header__hint dss-context-header__hint--before"
        >
          {{ createLabel }}
        </DssTooltip>
      </span>

      <span
        v-if="collapsible"
        class="dss-context-header__hint-anchor dss-context-header__rail-slot"
        @mouseenter="mostrarDica('toggle')"
        @mouseleave="esconderDica('toggle')"
        @focusin="mostrarDica('toggle')"
        @focusout="esconderDica('toggle')"
      >
        <button
          type="button"
          class="dss-context-header__rail-btn"
          :aria-expanded="!estaRetraido"
          :aria-controls="idDoConteudo"
          :aria-label="rotuloDoGatilho"
          @click="alternarRetracao"
        >
          <!-- UM glifo, que GIRA. Alternar `arrow_up`/`arrow_down` é uma
               troca INSTANTÂNEA no meio de uma transição contínua: o ícone
               pulava enquanto a peça deslizava, e era o pulo que se via. -->
          <DssIcon
            name="keyboard_arrow_up"
            class="dss-context-header__rail-icon dss-context-header__rail-icon--gatilho"
            inline
            decorative
          />
        </button>

        <DssTooltip
          :visible="dicaAtiva === 'toggle'"
          class="dss-context-header__hint dss-context-header__hint--before"
        >
          {{ rotuloDoGatilho }}
        </DssTooltip>
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssContextHeader — Layer 1: Structure
 * ==========================================================================
 *
 * O cabeçalho de CONTEXTO do atendimento — a faixa que acompanha o atendente
 * por toda a jornada e diz, em qualquer tela, quem está sendo atendido.
 *
 *   EXPANDIDO
 *   ┌──────────┬───────────────────────────────────────────────┬─────┐
 *   │   [🏢²]  │ Proprietário: …⊡   Rota: …      Água: Ativa   │ [⇄²]│
 *   │ 652701-9 │ Morador: …⊡        Local: …     Esgoto: Inat. │ [ + ]│
 *   │[+DETALHES]│ Endereço: …       Cobrança: …   Lixo: …       │ [ ^ ]│
 *   └──────────┴───────────────────────────────────────────────┴─────┘
 *
 *   RETRAÍDO
 *   ┌──────────────────────────────┬──────────────────────────┬─────┐
 *   │ [🏢²] 652701-9 [+DETALHES]   │ Morador: …   Endereço: … │ [ v ]│
 *   └──────────────────────────────┴──────────────────────────┴─────┘
 *
 * O §1.6 decide o mecanismo de cada eixo:
 *
 *   | eixo                               | mecanismo |
 *   |------------------------------------|-----------|
 *   | pele (cor, marca)                  | token via [data-brand] |
 *   | QUAIS informações, QUAIS grupos    | config (`groups`) |
 *   | como UMA informação é desenhada    | slot `item-[name]` |
 *   | a ESTRUTURA e a retração           | COMPOSTO — é o que não varia |
 *
 * POR QUE A LISTA É CONFIG E NÃO SLOT
 *
 * Ela é SERVIDA por atendimento. Filiais pedem campos diferentes, e o mesmo
 * cliente rende listas diferentes conforme a completude do cadastro. Um
 * template fixo teria que ser reescrito por filial; a config vem do mesmo
 * lugar de onde vêm os dados.
 *
 * O QUE ELE NÃO FAZ, E É DELIBERADO
 *
 * Não abre modal nenhum. Emite `open-records` e `open-details` e a página
 * decide o que montar. Embutir os modais o amarraria a um conjunto fixo de
 * telas — e são justamente esses dois modais que mudam entre produtos.
 *
 * A RETRAÇÃO É COORDENADA
 *
 * O cabeçalho PROVÊ o estado (§1.2, `provide/inject` tipado) e todo
 * descendente que o injete recolhe junto, inclusive o que chegou por slot.
 *
 * @see DSS_GUIA_COMPOSICAO_FASE3.md §1.2 e §1.6
 */

import { computed, ref, toRef, useId } from 'vue'

import { useCollapseHeight } from '../../../../composables/useCollapseHeight'

import DssBadge from '../../../base/DssBadge/DssBadge.vue'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssIcon from '../../../base/DssIcon/DssIcon.vue'
import DssTooltip from '../../../base/DssTooltip/DssTooltip.vue'

import { provideContextHeader, useContextHeaderSummary } from '../composables'
import type {
  ContextHeaderEmits,
  ContextHeaderGroup,
  ContextHeaderProps,
} from '../types/context-header.types'

defineOptions({
  name: 'DssContextHeader',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextHeaderProps>(), {
  identifier: '',
  identifierLabel: 'Matrícula',
  identityIcon: 'domain',
  recordsCount: 0,
  recordsAddLabel: 'Adicionar informações do imóvel',
  recordsLabel: 'Ver {n} informações do imóvel',
  detailsLabel: 'Detalhes',
  detailsIcon: 'add',
  detailsTooltip: 'Ver detalhes do cadastro',
  groups: () => [],
  summary: () => [],
  // `undefined`, NÃO `false`. Com o default `false` a prop nunca é nula, o
  // `??` do `estaRetraido` nunca cai para o espelho local e o gatilho fica
  // MORTO em toda tela que não amarra `v-model:collapsed` — o clique emitia o
  // evento e não mudava nada. É `undefined` que significa "ninguém controla".
  collapsed: undefined,
  collapsible: true,
  openCount: 0,
  switchable: true,
  creatable: true,
  switchIcon: 'switch_account',
  switchLabel: 'Alterar atendimento',
  createIcon: 'add',
  createLabel: 'Iniciar novo atendimento',
  collapseLabel: 'Minimizar cabeçalho',
  expandLabel: 'Maximizar cabeçalho',
  brand: null,
  ariaLabel: 'Contexto do atendimento',
})

const emit = defineEmits<ContextHeaderEmits>()

// ── Retração ─────────────────────────────────────────────────────────────
// Espelho local porque `collapsed` é opcional: sem `v-model:collapsed`, o
// cabeçalho ainda precisa retrair sozinho. Com o v-model, a prop manda.
const retracaoLocal = ref(props.collapsed ?? false)
const estaRetraido = computed(() => props.collapsed ?? retracaoLocal.value)

function alternarRetracao() {
  const novo = !estaRetraido.value
  retracaoLocal.value = novo
  emit('update:collapsed', novo)
}

// Provê para TODO descendente — é o que faz a retração cascatear.
provideContextHeader(estaRetraido as unknown as typeof retracaoLocal)

/**
 * A altura acompanha a retração.
 *
 * Aqui a troca é mais brusca que no board: a lista INTEIRA de informações sai
 * e entra o resumo, e a identidade deita. Sem a sanfona medida, a peça salta
 * de 136px para 54px em um quadro. O composable transita entre as duas
 * alturas; o conteúdo novo fica recortado pelo `overflow: hidden` do root
 * enquanto a caixa se move.
 */
const raiz = ref<HTMLElement | null>(null)
useCollapseHeight(raiz, estaRetraido)

const idDoConteudo = `dss-context-header-conteudo-${useId()}`

// ── Informações ──────────────────────────────────────────────────────────
const { informacoesDoResumo } = useContextHeaderSummary(
  toRef(props, 'groups'),
  toRef(props, 'summary'),
)

/**
 * UM `v-for` serve os dois estados: retraído, os grupos viram um grupo
 * sintético com as informações do resumo.
 *
 * A alternativa — dois blocos de marcação — duplicaria o item (rótulo, valor,
 * tom, ação, slot) e faria o segundo bloco divergir do primeiro na primeira
 * manutenção. O que muda entre os estados é só arranjo, e arranjo é CSS.
 */
const gruposVisiveis = computed<ContextHeaderGroup[]>(() => {
  if (!estaRetraido.value) return props.groups
  return [{ name: 'resumo', items: informacoesDoResumo.value }]
})

// ── Rótulos derivados ────────────────────────────────────────────────────
const temRegistros = computed(() => (props.recordsCount ?? 0) > 0)
const temAtendimentosAbertos = computed(() => (props.openCount ?? 0) > 0)

const rotuloDeRegistros = computed(() =>
  temRegistros.value
    ? props.recordsLabel.replace('{n}', String(props.recordsCount))
    : props.recordsAddLabel,
)

/**
 * A contagem entra no NOME do botão de alternar, e não só no badge: o badge é
 * `aria-hidden`, então sem isto o leitor de tela nunca saberia que existem
 * dois atendimentos em aberto.
 */
const rotuloDeAlternar = computed(() =>
  temAtendimentosAbertos.value
    ? `${props.switchLabel} (${props.openCount} em aberto)`
    : props.switchLabel,
)

const rotuloDoGatilho = computed(() =>
  estaRetraido.value ? props.expandLabel : props.collapseLabel,
)

// ── Dicas ────────────────────────────────────────────────────────────────
/**
 * UMA dica por vez, identificada por chave.
 *
 * O `DssTooltip` não governa a própria visibilidade nem se posiciona — é
 * decisão de governança registrada na doc dele. Quem liga o gatilho e quem
 * posiciona é o HOST, e o host é este composto; o posicionamento vive na
 * nossa 2-composition, nunca injetado no filho com `:deep()`.
 *
 * `focusin`/`focusout` junto com o mouse é requisito da WCAG 1.4.13: a dica
 * precisa aparecer para quem navega por teclado.
 */
const dicaAtiva = ref<string | null>(null)

function mostrarDica(chave: string) {
  dicaAtiva.value = chave
}

function esconderDica(chave: string) {
  if (dicaAtiva.value === chave) dicaAtiva.value = null
}

// ── Classes ──────────────────────────────────────────────────────────────
const headerClasses = computed(() => [
  'dss-context-header',
  {
    'dss-context-header--collapsed': estaRetraido.value,
    'dss-context-header--brand-hub': props.brand === 'hub',
    'dss-context-header--brand-water': props.brand === 'water',
    'dss-context-header--brand-waste': props.brand === 'waste',
  },
])
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
