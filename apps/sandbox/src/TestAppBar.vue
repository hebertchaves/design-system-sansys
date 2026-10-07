<template>
  <PlaygroundLayout
    title="DssAppBar — Playground"
    code="composed/DssAppBar"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. A estrutura invariante ───────────────────────────────────── -->
    <PgSection
      id="estrutura" index="01" title="A estrutura invariante" :count="1"
      desc="Cinco peças, nesta ordem: menu → logo → divisor → título do módulo → espaço → ações. É o que NÃO muda entre Water, Hub e Waste, e é por isso que isto é um composto e não props no DssHeader. O §1.6 do guia de Fase 3 diz qual é o critério: a pele muda (cor) e vira token; o conteúdo muda (qual logo, quais ícones) e vira slot; a estrutura não muda, e vira composto. Expressar a ordem como props (burgerIcon, logoSrc, actions[]) seria reimplementar slots, mal."
    >
      <PgGrid :cols="1">
        <PgTile code="a casca do Sansys" align="stretch">
          <div class="ab-palco">
            <DssLayout view="hHh lpR fFf" container>
              <DssAppBar brand="water" title="Nome do Módulo" data-medida="estrutura" @menu="registrar('menu')">
                <template #actions>
                  <DssButton v-for="a in ACOES" :key="a.icone"
                    variant="flat" round size="md" :icon="a.icone" :aria-label="a.rotulo" />
                </template>
              </DssAppBar>
            </DssLayout>
          </div>
          <p v-if="medidas.estrutura" class="ab-nota">{{ medidas.estrutura }}</p>
          <p v-if="registro.length" class="ab-nota">
            evento: <code>{{ registro[0] }}</code>
          </p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Uma prop, dois efeitos ───────────────────────────────────── -->
    <PgSection
      id="marca" index="02" title="Uma prop, dois efeitos" :count="3"
      desc="brand vai ao DssToolbar, e de lá saem DUAS coisas sem ninguém repassar nada: a pele (o toolbar pinta o fundo e remapeia --dss-action-primary para os filhos) e o logo certo (o toolbar propaga [data-brand] no próprio root, e o DssBrandLogo resolve pelo ancestral mais próximo). O DssBrandLogo aqui não recebe prop de marca nenhuma — é o padrão §1.3 do guia: contexto visual por data-*, não por provide/inject. A medição lê o viewBox do logo, que identifica a marca desenhada sem consultar a prop."
    >
      <PgGrid>
        <PgTile v-for="m in MARCAS" :key="m" :code="`brand=&quot;${m}&quot;`" align="stretch">
          <div class="ab-palco">
            <DssLayout view="hHh lpR fFf" container>
              <DssAppBar :brand="m" :title="`Módulo ${m}`" :data-medida="`marca-${m}`">
                <template #actions>
                  <DssButton variant="flat" round size="md" icon="account_circle" aria-label="Minha conta" />
                </template>
              </DssAppBar>
            </DssLayout>
          </div>
          <p v-if="medidas[`marca-${m}`]" class="ab-nota">{{ medidas[`marca-${m}`] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Altura ───────────────────────────────────────────────────── -->
    <PgSection
      id="altura" index="03" title="Altura" :count="2"
      desc="compact é 40px e é o PADRÃO, porque é a barra real do Sansys — medida no grid master em produção (Figma 1813:1328). O token --dss-layout-header-height-compact nasceu com este componente: dos dois degraus que existiam, --dss-layout-header-height é 64px e o -dense é 48px, e nenhum cobria os 40. É min-height e não height: a barra cresce se o consumidor puser algo mais alto nas ações, em vez de cortar o conteúdo em silêncio."
    >
      <PgGrid>
        <PgTile v-for="d in DENSIDADES" :key="d" :code="`density=&quot;${d}&quot;`" align="stretch">
          <div class="ab-palco">
            <DssLayout view="hHh lpR fFf" container>
              <DssAppBar brand="waste" :density="d" title="Módulo" :data-medida="`alt-${d}`">
                <template #actions>
                  <DssButton variant="flat" round size="md" icon="apps" aria-label="Aplicativos" />
                </template>
              </DssAppBar>
            </DssLayout>
          </div>
          <p v-if="medidas[`alt-${d}`]" class="ab-nota">{{ medidas[`alt-${d}`] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. O divisor é condicional ──────────────────────────────────── -->
    <PgSection
      id="divisor" index="04" title="O divisor é condicional" :count="2"
      desc="Sem título não há o que separar, e um traço sozinho na barra é lixo visual. O divisor também NÃO é um DssSeparator: a regra R3 do ui-rules não o admite dentro de DssToolbar, e a regra está certa — aqui o traço é decoração de barra, não separação semântica entre grupos. Ele sai da árvore de acessibilidade com aria-hidden."
    >
      <PgGrid>
        <PgTile code="com título — há divisor" align="stretch">
          <div class="ab-palco">
            <DssLayout view="hHh lpR fFf" container>
              <DssAppBar brand="hub" title="Com título" data-medida="div-com" />
            </DssLayout>
          </div>
          <p v-if="medidas['div-com']" class="ab-nota">{{ medidas['div-com'] }}</p>
        </PgTile>
        <PgTile code="sem título — o divisor some junto" align="stretch">
          <div class="ab-palco">
            <DssLayout view="hHh lpR fFf" container>
              <DssAppBar brand="hub" data-medida="div-sem" />
            </DssLayout>
          </div>
          <p v-if="medidas['div-sem']" class="ab-nota">{{ medidas['div-sem'] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Os três slots ────────────────────────────────────────────── -->
    <PgSection
      id="slots" index="05" title="Os três slots" :count="3"
      desc="brand, title e actions. O conteúdo é sempre do consumidor: a barra fixa a ordem, não o que entra em cada posição. actions é o mais usado — na casca Sansys são quatro botões de ícone. O slot brand serve ao caso em que o logo vira link para a home, e aí o nome acessível passa a ser do LINK: o logo continua decorative, para o leitor de tela não ler a marca duas vezes."
    >
      <PgGrid>
        <PgTile code="slot brand — logo como link" align="stretch">
          <div class="ab-palco">
            <DssLayout view="hHh lpR fFf" container>
              <DssAppBar brand="water" title="Solicitações" data-medida="slot-brand">
                <template #brand>
                  <a href="#inicio" class="ab-link" aria-label="Página inicial do Sansys Water">
                    <DssBrandLogo size="lg" decorative />
                  </a>
                </template>
              </DssAppBar>
            </DssLayout>
          </div>
          <p v-if="medidas['slot-brand']" class="ab-nota">{{ medidas['slot-brand'] }}</p>
        </PgTile>
        <PgTile code="slot title — título composto" align="stretch">
          <div class="ab-palco">
            <DssLayout view="hHh lpR fFf" container>
              <DssAppBar brand="water">
                <template #title>
                  Faturamento <DssChip label="beta" size="xs" dense color="warning" />
                </template>
              </DssAppBar>
            </DssLayout>
          </div>
        </PgTile>
        <PgTile code="sem slot actions — a área não existe" align="stretch">
          <div class="ab-palco">
            <DssLayout view="hHh lpR fFf" container>
              <DssAppBar brand="water" title="Sem ações" data-medida="sem-acoes" />
            </DssLayout>
          </div>
          <p v-if="medidas['sem-acoes']" class="ab-nota">{{ medidas['sem-acoes'] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Acessibilidade ───────────────────────────────────────────── -->
    <PgSection
      id="a11y" index="06" title="Acessibilidade" :count="2"
      desc="Três decisões medíveis. O nome do módulo é um &lt;h1&gt; — ele É o título da tela, e sem a declaração explícita cairia na escala Material do Quasar (6rem), porque o h1 do vendor é seletor de tipo. O logo é decorative por padrão: o nome do produto já é anunciado pelo título ao lado, e informativo aqui faria o leitor ler a marca duas vezes. E o botão de menu exige nome — botão só de ícone sem nome não existe para quem usa leitor de tela, por isso menuAriaLabel tem padrão."
    >
      <PgGrid>
        <PgTile code="o que a barra expõe" align="stretch">
          <div class="ab-palco">
            <DssLayout view="hHh lpR fFf" container>
              <DssAppBar brand="water" title="Solicitações" data-medida="a11y">
                <template #actions>
                  <DssButton variant="flat" round size="md" icon="notifications" aria-label="Notificações" />
                </template>
              </DssAppBar>
            </DssLayout>
          </div>
          <p v-if="medidas.a11y" class="ab-nota">{{ medidas.a11y }}</p>
        </PgTile>
        <PgTile code="menuAriaLabel personalizado" align="stretch">
          <div class="ab-palco">
            <DssLayout view="hHh lpR fFf" container>
              <DssAppBar brand="water" title="X" menu-aria-label="Abrir navegação de Faturamento" data-medida="a11y-menu" />
            </DssLayout>
          </div>
          <p v-if="medidas['a11y-menu']" class="ab-nota">{{ medidas['a11y-menu'] }}</p>
        </PgTile>
      </PgGrid>
      <p class="ab-nota ab-nota--bloco">
        <DssButton label="Medir" variant="outline" size="sm" @click="medir" />
      </p>
    </PgSection>

    <!-- ── 07. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="07" title="Exemplos de uso" :count="6"
      desc="Cenários reais, vindos do DssAppBar.example.vue do próprio componente."
    >
      <DssAppBarExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssAppBar from '@components/composed/DssAppBar/DssAppBar.vue'
import DssAppBarExample from '@components/composed/DssAppBar/DssAppBar.example.vue'
import DssLayout from '@components/base/DssLayout/DssLayout.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssBrandLogo from '@components/base/DssBrandLogo/DssBrandLogo.vue'
import DssChip from '@components/base/DssChip/DssChip.vue'

const MARCAS = ['water', 'hub', 'waste'] as const
const DENSIDADES = ['compact', 'standard'] as const

const ACOES = [
  { icone: 'help_outline', rotulo: 'Ajuda' },
  { icone: 'notifications', rotulo: 'Notificações' },
  { icone: 'apps', rotulo: 'Aplicativos Sansys' },
  { icone: 'account_circle', rotulo: 'Minha conta' },
]

const medidas = reactive<Record<string, string>>({})
const registro = ref<string[]>([])

/** O viewBox identifica a marca desenhada sem consultar a prop. */
const VIEWBOX_MARCA: Record<string, string> = {
  '0 0 154 42': 'water',
  '0 0 120 42': 'hub',
  '0 0 156 42': 'waste',
}

function registrar(evento: string) {
  registro.value.unshift(`${new Date().toLocaleTimeString('pt-BR')} · ${evento}`)
  registro.value = registro.value.slice(0, 5)
}

/**
 * As medições saem do DOM, não dos tokens.
 *
 * `offsetParent === null` pula a seção oculta: a casca mantém as seções
 * montadas com v-show quando se vai ao Preview Frame, e medir ali devolve zero
 * em tudo — custou uma rodada de números falsos no DssTable.
 */
function medir() {
  for (const el of document.querySelectorAll<HTMLElement>('[data-medida]')) {
    const chave = el.dataset.medida as string
    if (!chave || el.offsetParent === null) continue

    const barra = el.querySelector<HTMLElement>('.dss-app-bar__bar')
    const logo = el.querySelector('.dss-brand-logo')
    const titulo = el.querySelector('.dss-app-bar__title')
    const divisor = el.querySelector('.dss-app-bar__divider')
    const acoes = el.querySelector('.dss-app-bar__end')
    const menu = el.querySelector('.dss-app-bar__menu')

    if (chave.startsWith('marca-')) {
      const vb = logo?.getAttribute('viewBox') ?? ''
      const toolbar = el.querySelector<HTMLElement>('[data-brand]')
      const fundo = toolbar ? getComputedStyle(toolbar).backgroundColor : '—'
      medidas[chave] = `logo: ${VIEWBOX_MARCA[vb] ?? 'nenhum'} · fundo da barra: ${fundo}`
    } else if (chave.startsWith('alt-')) {
      medidas[chave] = barra
        ? `altura: ${Math.round(barra.getBoundingClientRect().height)}px`
        : '—'
    } else if (chave.startsWith('div-')) {
      medidas[chave] = `divisor: ${divisor ? 'presente' : 'ausente'} · título: ${titulo ? 'presente' : 'ausente'}`
    } else if (chave === 'sem-acoes') {
      medidas[chave] = `área de ações: ${acoes ? 'presente' : 'ausente — o slot não foi fornecido'}`
    } else if (chave === 'slot-brand') {
      const link = el.querySelector('a[aria-label]')
      medidas[chave] = link
        ? `o nome é do link: "${link.getAttribute('aria-label')}" · logo: aria-hidden=${logo?.getAttribute('aria-hidden')}`
        : '—'
    } else if (chave.startsWith('a11y')) {
      medidas[chave] = [
        `título: <${titulo?.tagName.toLowerCase() ?? '—'}>`,
        `logo: aria-hidden=${logo?.getAttribute('aria-hidden') ?? '—'}`,
        `menu: "${menu?.getAttribute('aria-label') ?? '—'}"`,
        `divisor: aria-hidden=${divisor?.getAttribute('aria-hidden') ?? '—'}`,
      ].join(' · ')
    } else {
      const pecas = ['menu', 'brand', 'divider', 'title'].filter((p) =>
        el.querySelector(`.dss-app-bar__${p}`),
      )
      medidas[chave] = `peças: ${pecas.join(' → ')}${acoes ? ' → ações' : ''} · altura ${barra ? Math.round(barra.getBoundingClientRect().height) : 0}px`
    }
  }
}

onMounted(async () => {
  await nextTick()
  medir()
})

const SECTIONS = [
  { id: 'estrutura', index: '01', title: 'A estrutura invariante' },
  { id: 'marca',     index: '02', title: 'Uma prop, dois efeitos' },
  { id: 'altura',    index: '03', title: 'Altura' },
  { id: 'divisor',   index: '04', title: 'O divisor é condicional' },
  { id: 'slots',     index: '05', title: 'Os três slots' },
  { id: 'a11y',      index: '06', title: 'Acessibilidade' },
  { id: 'exemplos',  index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 6, label: 'Props' },
  { value: 3, label: 'Slots' },
  { value: 1, label: 'Emit' },
  { value: 40, label: 'px de altura' },
]
</script>

<style scoped>
/* O QLayout ocupa a VIEWPORT por padrão. A contenção vem da prop `container`
   do próprio DssLayout — não de CSS injetado no filho. O palco só dá a moldura
   e a altura que o `container` precisa para preencher. */
.ab-palco {
  position: relative;
  min-block-size: var(--dss-spacing-20);
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.ab-nota {
  margin: var(--dss-spacing-2) 0 0;
  font-size: var(--dss-font-size-xs);
  line-height: var(--dss-line-height-relaxed);
  color: var(--dss-text-subtle);
}

.ab-nota--bloco {
  margin-top: var(--dss-spacing-4);
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
  flex-wrap: wrap;
}

.ab-link {
  display: inline-flex;
  padding: var(--dss-spacing-1);
  border-radius: var(--dss-radius-sm);
  color: inherit;
}

.ab-link:focus-visible {
  outline: var(--dss-border-width-md) solid currentColor;
  outline-offset: var(--dss-spacing-1);
}
</style>
