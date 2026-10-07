<template>
  <PlaygroundLayout
    title="DssContextHeader — Playground"
    code="composed/DssContextHeader"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. A anatomia ──────────────────────────────────────────────── -->
    <PgSection
      id="anatomia" index="01" title="Três colunas que não negociam entre si" :count="1"
      desc="Identidade (fixa) · informações (elástica) · trilho de sessão (fixo). Só a do meio encolhe — as das pontas carregam alvos de 44px e perderiam a WCAG 2.5.5 se cedessem largura. O badge do ícone do imóvel é o CONTADOR de registros; o botão Detalhes abre outro modal. No trilho: alternar atendimento (com a contagem dos abertos), iniciar novo, minimizar."
    >
      <PgGrid class="pg-grid--full">
        <PgTile code="identifier + groups + openCount + recordsCount" align="stretch">
          <DssContextHeader
            v-model:collapsed="retraido"
            data-medida="anatomia"
            identifier="652701-9"
            :records-count="2"
            :open-count="2"
            :groups="GRUPOS"
            :summary="['morador', 'endereco']"
            brand="water"
            @open-records="registrar('open-records')"
            @open-details="registrar('open-details')"
            @switch="registrar('switch')"
            @create="registrar('create')"
            @item-action="registrar(`item-action: ${$event}`)"
          />
        </PgTile>
      </PgGrid>

      <div class="ch-eventos">
        <span><strong>Último evento:</strong> <code>{{ ultimoEvento || '—' }}</code></span>
        <span><strong>Estado:</strong> {{ retraido ? 'retraído' : 'expandido' }}</span>
        <DssButton
          variant="outline" color="primary" size="sm" dense
          :label="retraido ? 'Expandir pelo v-model' : 'Retrair pelo v-model'"
          @click="retraido = !retraido"
        />
      </div>
    </PgSection>

    <!-- ── 02. O badge tem dois estados ────────────────────────────────── -->
    <PgSection
      id="badge" index="02" title="O badge muda; o ícone não" :count="2"
      desc="Sem registros, o badge é o add_circle — o gesto é CADASTRAR. A partir de um, vira o contador. O ícone do imóvel permanece o mesmo nos dois casos, e isso é deliberado: o destino do clique é sempre o mesmo modal, então um ícone diferente anunciaria um destino que não existe. A contagem vai no aria-label do botão, e o badge é aria-hidden — sem isso o leitor de tela diria o número duas vezes, na segunda sem dizer de que ele é contagem."
    >
      <PgGrid class="pg-grid--full">
        <PgTile code="recordsCount: 0" align="stretch">
          <DssContextHeader
            identifier="652701-9"
            :records-count="0"
            :groups="[GRUPOS[0]]"
            :collapsible="false"
            :switchable="false"
            :creatable="false"
          />
        </PgTile>
        <PgTile code="recordsCount: 7" align="stretch">
          <DssContextHeader
            identifier="652701-9"
            :records-count="7"
            :groups="[GRUPOS[0]]"
            :collapsible="false"
            :switchable="false"
            :creatable="false"
          />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. A lista é servida, não escrita ──────────────────────────── -->
    <PgSection
      id="dados" index="03" title="Cada cliente serve uma lista diferente" :count="3"
      desc="A lista de informações vem com o atendimento. Filiais pedem campos diferentes e o mesmo cliente rende listas diferentes conforme a completude do cadastro — por isso `groups` é CONFIG, como as columns do DssTable, e não marcação escrita na tela. O agrupamento é o que mantém o sentido quando falta dado: sem grupos, um campo ausente faria o primeiro item do assunto seguinte subir para o lugar dele."
    >
      <PgGrid class="pg-grid--full">
        <PgTile code="cadastro completo — 3 grupos × 4" align="stretch">
          <DssContextHeader
            identifier="652701-9"
            :records-count="2"
            :groups="GRUPOS"
            :collapsible="false"
            :switchable="false"
            :creatable="false"
          />
        </PgTile>
        <PgTile code="filial sem saneamento — 2 grupos × 3" align="stretch">
          <DssContextHeader
            identifier="118340-2"
            :records-count="0"
            :groups="GRUPOS_PARCIAIS"
            :collapsible="false"
            :switchable="false"
            :creatable="false"
          />
        </PgTile>
        <PgTile code="cadastro incompleto — 1 grupo × 2" align="stretch">
          <DssContextHeader
            identifier="904112-5"
            :records-count="0"
            :groups="GRUPOS_MINIMOS"
            :collapsible="false"
            :switchable="false"
            :creatable="false"
          />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Retração ────────────────────────────────────────────────── -->
    <PgSection
      id="retracao" index="04" title="Retrair não é mostrar o mesmo conteúdo menor" :count="2"
      desc="A faixa retraída mantém identidade, Detalhes e DUAS informações — as demais somem inteiras. Encolher todas produziria texto ilegível e uma faixa que continua roubando a altura que a retração existe para devolver. Quais duas é declaração de quem monta a tela (`summary`), porque muda por filial; sem a declaração caem as duas primeiras na ordem do documento."
    >
      <PgGrid class="pg-grid--full">
        <PgTile code="collapsed + summary: ['morador','endereco']" align="stretch">
          <DssContextHeader
            collapsed
            identifier="652701-9"
            :records-count="2"
            :open-count="2"
            :groups="GRUPOS"
            :summary="['morador', 'endereco']"
          />
        </PgTile>
        <PgTile code="collapsed sem summary — default = as 2 primeiras" align="stretch">
          <DssContextHeader
            collapsed
            identifier="652701-9"
            :records-count="2"
            :groups="GRUPOS"
          />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04b. A transição ────────────────────────────────────────────── -->
    <PgSection
      id="movimento" index="04b" title="A transição entre os dois estados" :count="2"
      desc="Retrair é TROCAR DE ARRANJO, não esconder conteúdo — e troca de arranjo é instantânea por natureza. A suavidade vem de três camadas: a altura da peça (sanfona medida, porque `auto → auto` não interpola), o esmaecimento do conteúdo novo enquanto a caixa ainda se move, e o chevron que GIRA em vez de trocar de glifo. O gatilho fica fora do esmaecimento: esmaecer o botão que a pessoa acabou de clicar é perder o único ponto fixo da cena. `prefers-reduced-motion` desliga as três."
    >
      <PgGrid class="pg-grid--full">
        <PgTile code="padrão — --dss-collapse-duration: 250ms" align="stretch">
          <DssContextHeader
            v-model:collapsed="retraidoPadrao"
            data-medida="movimento"
            identifier="652701-9"
            :records-count="2"
            :open-count="2"
            :groups="GRUPOS"
            :summary="['morador', 'endereco']"
          />
        </PgTile>
        <PgTile code="host remapeia os canais — 500ms, decelerate" align="stretch">
          <div class="ch-lento">
            <DssContextHeader
              v-model:collapsed="retraidoLento"
              identifier="652701-9"
              :records-count="2"
              :open-count="2"
              :groups="GRUPOS"
              :summary="['morador', 'endereco']"
            />
          </div>
        </PgTile>
      </PgGrid>

      <div class="ch-eventos">
        <DssButton
          variant="outline" color="primary" size="sm" dense
          label="Medir a curva da altura"
          @click="medirCurva"
        />
        <code v-if="curva.length">{{ curva.map((p) => `${p.t}ms:${p.h}px`).join(' · ') }}</code>
        <span v-else>Clique para amostrar a altura quadro a quadro durante a retração.</span>
      </div>
    </PgSection>

    <!-- ── 05. O estado desce sem prop drilling ────────────────────────── -->
    <PgSection
      id="cascata" index="05" title="A retração cascateia por inject" :count="1"
      desc="O cabeçalho PROVÊ o estado (§1.2 — provide/inject tipado) e qualquer descendente injeta, inclusive conteúdo que chegou por slot e que o cabeçalho não conhece. O slot item-ligacao_agua abaixo consome useContextHeader() e muda o que desenha conforme o estado — sem receber prop de ninguém."
    >
      <PgGrid class="pg-grid--full">
        <PgTile code="slot item-* + useContextHeader()" align="stretch">
          <DssContextHeader
            v-model:collapsed="retraidoCascata"
            identifier="652701-9"
            :records-count="2"
            :groups="GRUPOS"
            :summary="['ligacao_agua', 'endereco']"
          >
            <template #item-ligacao_agua="{ item }">
              <SondaDeCascata :valor="item.value" />
            </template>
          </DssContextHeader>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Tons ────────────────────────────────────────────────────── -->
    <PgSection
      id="tons" index="06" title="Tons de status — e o tom que não existe" :count="1"
      desc="Os valores de status são TEXTO colorido, e texto colorido responde à WCAG 1.4.3 (4,5:1). Os tokens de feedback puros não servem: --dss-positive (#4dd228) dá 1,9:1 sobre branco. Os tons usam os níveis -deep/-hover no claro e -light no escuro, por canal remapeado. `warning` NÃO é oferecido: a regra de a11y em tokens/globals.scss diz que nem --dss-warning-deep fecha 4,5:1 (máx. 4,36). O peso da fonte é o segundo canal, porque a 1.4.1 proíbe informação só por cor."
    >
      <PgGrid class="pg-grid--full">
        <PgTile code="tone: neutral | positive | negative | info" align="stretch">
          <DssContextHeader
            identifier="652701-9"
            :records-count="1"
            :groups="GRUPOS_TONS"
            :collapsible="false"
            :switchable="false"
            :creatable="false"
          />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Marca ───────────────────────────────────────────────────── -->
    <PgSection
      id="marca" index="07" title="A marca chega pelo token, não pela pintura" :count="3"
      desc="A prop brand emite data-brand no root e REMAPEIA --dss-action-primary; ela não pinta elemento nenhum (§K5). O trilho e o botão Detalhes seguem a marca sozinhos — 4-output/_brands.scss está vazio por design. O anel de foco do trilho é o único caso especial: --dss-focus-primary é remapeado por marca com a premissa “anel sobre fundo branco”, e o ladrilho é pintado com a cor da marca; anel e fundo ficariam a 1,00:1. Lá o anel é a cor do texto sobre a ação."
    >
      <PgGrid class="pg-grid--full">
        <PgTile v-for="m in MARCAS" :key="m" :code="`brand=&quot;${m}&quot;`" align="stretch">
          <DssContextHeader
            :brand="m"
            identifier="652701-9"
            :records-count="2"
            :open-count="3"
            :groups="[GRUPOS[2]]"
            :collapsible="true"
          />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Medição ─────────────────────────────────────────────────── -->
    <PgSection
      id="medicao" index="08" title="O que o DOM responde" :count="1"
      desc="Medir, não afirmar. Os números abaixo saem do elemento renderizado na seção 01."
    >
      <PgGrid class="pg-grid--full">
        <PgTile code="getBoundingClientRect + árvore de acessibilidade" align="stretch">
          <div class="ch-medidas">
            <DssButton
              variant="unelevated" color="primary" size="md" dense
              icon="straighten" label="Medir" @click="medir"
            />
            <dl class="ch-medidas__lista">
              <template v-for="(v, k) in medidas" :key="k">
                <dt>{{ k }}</dt>
                <dd>{{ v }}</dd>
              </template>
            </dl>
            <p v-if="!Object.keys(medidas).length" class="ch-medidas__vazio">
              Nenhuma medida ainda.
            </p>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. A fronteira ─────────────────────────────────────────────── -->
    <PgSection
      id="fronteira" index="09" title="O que ele NÃO faz, e é deliberado" :count="FRONTEIRA.length"
      desc="Declarado, não omitido."
    >
      <ul class="ch-fronteira">
        <li v-for="f in FRONTEIRA" :key="f.item">
          <strong>{{ f.item }}</strong> — {{ f.nota }}
        </li>
      </ul>
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * TestContextHeader — o cabeçalho de contexto do atendimento
 * ==========================================================================
 *
 * Esta página NÃO reproduz o protótipo do Figma. O protótipo está velho — o
 * que vale dele é o FUNCIONAMENTO: a posição dos elementos, a separação dos
 * contêineres e das colunas, e as dicas em cada controle.
 *
 * O que está medido aqui e o que foi deliberado:
 *
 *  1. O ícone do imóvel não muda entre "sem registros" e "com registros" —
 *     muda só o badge. O destino do clique é o mesmo modal.
 *  2. A lista de informações é servida POR ATENDIMENTO e varia entre clientes;
 *     por isso é config, não marcação.
 *  3. Retraído, o trilho guarda só o gatilho de expandir. A faixa retraída
 *     existe para devolver altura, não para manter três alvos de 44px.
 */

import { ref } from 'vue'
import { defineComponent, h } from 'vue'

import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'

import DssButton from '@components/base/DssButton/DssButton.vue'
import DssContextHeader from '@components/composed/DssContextHeader/DssContextHeader.vue'
import { useContextHeader } from '@components/composed/DssContextHeader/composables'
import type { ContextHeaderGroup } from '@components/composed/DssContextHeader/types/context-header.types'

// ── Sonda de cascata ─────────────────────────────────────────────────────
/**
 * Consome `useContextHeader()` SEM receber prop nenhuma. É a prova de que o
 * estado desce por inject — e de que alcança conteúdo que chegou por slot.
 */
const SondaDeCascata = defineComponent({
  name: 'SondaDeCascata',
  props: { valor: { type: String, default: '' } },
  setup(props) {
    const { collapsed } = useContextHeader()
    return () =>
      h('span', { 'data-sonda': collapsed.value ? 'retraido' : 'expandido' }, [
        props.valor,
        h(
          'small',
          { style: 'opacity:.7;margin-inline-start:.4rem' },
          collapsed.value ? '(injetou: retraído)' : '(injetou: expandido)',
        ),
      ])
  },
})

// ── Dados ────────────────────────────────────────────────────────────────
const VISUALIZAR_CLIENTE = { icon: 'badge', label: 'Visualizar cliente' }

const GRUPOS: ContextHeaderGroup[] = [
  {
    name: 'pessoas',
    label: 'Pessoas e endereço',
    span: 2,
    items: [
      { name: 'proprietario', label: 'Proprietário', value: '(CPF: 000.000.000-00) - Nome e Sobrenome Proprietário', action: VISUALIZAR_CLIENTE },
      { name: 'morador', label: 'Morador', value: '(CPF: 000.000.000-00) - Nome e Sobrenome Morador', action: VISUALIZAR_CLIENTE },
      { name: 'endereco', label: 'Endereço', value: 'Rua logradouro do Usuário, 123 - 00000-000 - Bairro, Cidade - UF - Complemento' },
      { name: 'contato', label: 'Contato', value: '(00) 00000-0000' },
    ],
  },
  {
    name: 'cadastro',
    label: 'Dados técnicos',
    items: [
      { name: 'rota', label: 'Rota Leitura', value: '0000.00.00' },
      { name: 'localizacao', label: 'Localização', value: '00.00.0000.0000.0000' },
      { name: 'cobranca', label: 'Tipo de Cobrança / Tipo Unidade', value: 'Pagamento Caixa / Norma' },
      { name: 'hidrometro', label: 'Hidrômetro', value: 'A00000000' },
    ],
  },
  {
    name: 'situacao',
    label: 'Situação das ligações',
    items: [
      { name: 'ligacao_agua', label: 'Ligação água', value: 'Ativa', tone: 'positive' },
      { name: 'ligacao_esgoto', label: 'Ligação esgoto', value: 'Inativa', tone: 'negative' },
      { name: 'lixo', label: 'Situação Lixo', value: 'Ativa (Cobrança na Fatura)' },
      { name: 'debito', label: 'Débito', value: 'Em negociação', tone: 'info' },
    ],
  },
]

const GRUPOS_PARCIAIS: ContextHeaderGroup[] = [
  {
    name: 'pessoas',
    span: 2,
    items: [
      { name: 'morador', label: 'Morador', value: '(CPF: 000.000.000-00) - Nome e Sobrenome', action: VISUALIZAR_CLIENTE },
      { name: 'endereco', label: 'Endereço', value: 'Av. Exemplo, 900 - Centro, Cidade - UF' },
      { name: 'contato', label: 'Contato', value: '—' },
    ],
  },
  {
    name: 'situacao',
    items: [
      { name: 'ligacao_agua', label: 'Ligação água', value: 'Ativa', tone: 'positive' },
      { name: 'lixo', label: 'Situação Lixo', value: 'Não aplicável' },
      { name: 'debito', label: 'Débito', value: 'Sem pendência', tone: 'positive' },
    ],
  },
]

const GRUPOS_MINIMOS: ContextHeaderGroup[] = [
  {
    name: 'pessoas',
    items: [
      { name: 'morador', label: 'Morador', value: 'Cadastro incompleto' },
      { name: 'endereco', label: 'Endereço', value: 'Rua Sem Número, s/n' },
    ],
  },
]

const GRUPOS_TONS: ContextHeaderGroup[] = [
  {
    name: 'tons',
    items: [
      { name: 't_neutral', label: 'neutral', value: 'Ativa (Cobrança na Fatura)' },
      { name: 't_positive', label: 'positive', value: 'Ativa' },
      { name: 't_negative', label: 'negative', value: 'Inativa' },
      { name: 't_info', label: 'info', value: 'Em negociação' },
    ],
  },
]

const MARCAS = ['hub', 'water', 'waste'] as const

const FRONTEIRA = [
  { item: 'Não abre modal nenhum', nota: 'emite open-records e open-details; a página decide o que montar. Embutir os modais amarraria o componente a um conjunto fixo de telas — e são justamente esses dois que mudam entre produtos.' },
  { item: 'Não busca dados', nota: 'groups chega pronto. Buscar aqui o tornaria um componente de DADOS e o acoplaria à API de um produto.' },
  { item: 'Não lista os atendimentos abertos', nota: 'o botão de alternar emite switch e informa a contagem; a lista e a troca são da página.' },
  { item: 'Não quebra linha no valor', nota: 'trunca em uma linha, com o valor inteiro no title e na árvore de acessibilidade. A altura da faixa é o recurso escasso; quebrar linha empurraria a tela a cada endereço longo.' },
  { item: 'Não oferece tom warning', nota: 'não há contraste seguro entre o amarelo da paleta e fundo claro — regra registrada em tokens/globals.scss.' },
  { item: 'Retraído, esconde alternar e novo atendimento', nota: 'é o que o protótipo mostra, e é coerente: a faixa retraída existe para devolver altura.' },
]

const SECTIONS = [
  { id: 'anatomia',  index: '01', title: 'Três colunas que não negociam entre si' },
  { id: 'badge',     index: '02', title: 'O badge muda; o ícone não' },
  { id: 'dados',     index: '03', title: 'Cada cliente serve uma lista diferente' },
  { id: 'retracao',  index: '04', title: 'Retrair não é mostrar o mesmo conteúdo menor' },
  { id: 'movimento', index: '04b', title: 'A transição entre os dois estados' },
  { id: 'cascata',   index: '05', title: 'A retração cascateia por inject' },
  { id: 'tons',      index: '06', title: 'Tons de status — e o tom que não existe' },
  { id: 'marca',     index: '07', title: 'A marca chega pelo token, não pela pintura' },
  { id: 'medicao',   index: '08', title: 'O que o DOM responde' },
  { id: 'fronteira', index: '09', title: 'O que ele NÃO faz, e é deliberado' },
]

const KPIS = [
  { value: 24, label: 'Props' },
  { value: 3, label: 'Camadas de transição' },
  { value: 6, label: 'Eventos' },
  { value: 4, label: 'Tons' },
  { value: 3, label: 'Marcas' },
]

// ── Estado da página ─────────────────────────────────────────────────────
const retraido = ref(false)
const retraidoPadrao = ref(false)
const retraidoLento = ref(false)
const retraidoCascata = ref(false)
const curva = ref<{ t: number; h: number }[]>([])

/**
 * Amostra a altura quadro a quadro durante a retração.
 *
 * Mede, não afirma: a curva mostra a aceleração do `--dss-easing-standard` e
 * o tempo real da transição. Se o composable não estivesse agindo, sairiam
 * dois pontos — a altura inicial e a final, sem nada no meio.
 */
async function medirCurva() {
  const el = document.querySelector('[data-medida="movimento"]') as HTMLElement | null
  if (!el) return
  curva.value = []
  const t0 = performance.now()
  retraidoPadrao.value = !retraidoPadrao.value
  for (let i = 0; i < 12; i++) {
    curva.value.push({
      t: Math.round(performance.now() - t0),
      h: Math.round(el.getBoundingClientRect().height),
    })
    await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 25)))
  }
}
const ultimoEvento = ref('')

function registrar(evento: string) {
  ultimoEvento.value = `${evento} · ${new Date().toLocaleTimeString()}`
}

// ── Medição ──────────────────────────────────────────────────────────────
const medidas = ref<Record<string, string>>({})

function medir() {
  const el = document.querySelector('[data-medida="anatomia"]') as HTMLElement | null
  if (!el) return

  const caixa = el.getBoundingClientRect()
  const trilho = el.querySelector('.dss-context-header__rail') as HTMLElement | null
  const botoesTrilho = [...el.querySelectorAll('.dss-context-header__rail-btn')] as HTMLElement[]
  const registros = el.querySelector('.dss-context-header__records') as HTMLElement | null
  const acoes = [...el.querySelectorAll('.dss-context-header__item-action')] as HTMLElement[]

  medidas.value['altura da peça'] = `${Math.round(caixa.height)}px`

  // A comparação é contra o `clientHeight` (caixa de CONTEÚDO), não contra o
  // `getBoundingClientRect` (caixa de BORDA). O trilho mora dentro da borda do
  // cartão; medi-lo contra a caixa de borda acusava 2px de falta que são, na
  // verdade, a borda de 1px em cima e embaixo — um falso negativo.
  medidas.value['trilho: altura vs. conteúdo da peça'] = trilho
    ? `${Math.round(trilho.getBoundingClientRect().height)}px de ${el.clientHeight}px — ${
        Math.abs(trilho.getBoundingClientRect().height - el.clientHeight) < 1
          ? 'topo à base ✓'
          : 'NÃO vai de topo à base ✗'
      }`
    : 'ausente'

  const alvos = [registros, ...botoesTrilho].filter(Boolean) as HTMLElement[]
  const reprovados = alvos.filter((a) => {
    const r = a.getBoundingClientRect()
    return r.width < 44 || r.height < 44
  })
  medidas.value['alvos de toque ≥ 44px (WCAG 2.5.5)'] =
    `${alvos.length - reprovados.length}/${alvos.length} aprovados` +
    (reprovados.length ? ` — ${reprovados.length} abaixo do mínimo ✗` : ' ✓')

  if (acoes.length) {
    const a = acoes[0]
    const antes = getComputedStyle(a, '::before')
    medidas.value['ação de linha: visual vs. alvo'] =
      `visual ${Math.round(a.getBoundingClientRect().width)}px · ::before ${antes.width} (o alvo mora no pseudo-elemento)`
  }

  const semNome = [...el.querySelectorAll('button')].filter(
    (b) => !b.getAttribute('aria-label') && !b.textContent?.trim(),
  )
  medidas.value['botões sem nome acessível'] = semNome.length
    ? `${semNome.length} ✗`
    : '0 ✓'

  const badge = el.querySelector('.dss-context-header__records-badge')
  medidas.value['badge oculto do leitor de tela'] = badge
    ? badge.getAttribute('aria-hidden') === 'true'
      ? 'sim ✓ (a contagem está no aria-label do botão)'
      : 'NÃO ✗'
    : 'ausente'

  const termos = el.querySelectorAll('dt').length
  const definicoes = el.querySelectorAll('dd').length
  medidas.value['pares termo/definição'] = `${termos} dt · ${definicoes} dd`

  const sonda = document.querySelector('[data-sonda]')
  if (sonda) {
    medidas.value['sonda de cascata (seção 05)'] = String(sonda.getAttribute('data-sonda'))
  }
}
</script>

<style scoped>
.ch-eventos {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--dss-spacing-3);
  margin-block-start: var(--dss-spacing-3);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
}

.ch-medidas {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-3);
}

.ch-medidas__lista {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--dss-spacing-1) var(--dss-spacing-4);
  margin: 0;
  font-size: var(--dss-font-size-sm);
}

.ch-medidas__lista dt {
  color: var(--dss-text-secondary);
}

.ch-medidas__lista dd {
  margin: 0;
  color: var(--dss-text-body);
}

.ch-medidas__vazio {
  margin: 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-secondary);
}

/* O host remapeia os canais de movimento num CONTÊINER — o componente não os
   redeclara de propósito. Custom property declarada no próprio elemento vence
   a que vem do ancestral: com a declaração dentro do componente, este bloco
   pedia 500ms e a peça continuava em 250ms. Medido na seção 04b. */
.ch-lento {
  --dss-collapse-duration: var(--dss-duration-slower);
  --dss-collapse-easing: var(--dss-easing-decelerate);
}

.ch-fronteira {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  margin: 0;
  padding-inline-start: var(--dss-spacing-5);
  font-size: var(--dss-font-size-sm);
  line-height: var(--dss-line-height-sm);
  color: var(--dss-text-body);
}
</style>
