<template>
  <PlaygroundLayout
    title="DssPageShell — Playground"
    code="composed/DssPageShell"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. O arranjo ────────────────────────────────────────────────── -->
    <PgSection
      id="arranjo" index="01" title="O arranjo" :count="1"
      desc="Rail de módulos à esquerda, trilha e board à direita. O shell absorveu o ARRANJO — a coluna de 52px, o fundo rebaixado da página, o respiro do conteúdo, a superfície do board — e deixou de fora o CONTEÚDO: quais módulos, qual trilha, o que vai no board. Ele NÃO é a casca inteira: não absorve DssLayout nem DssPage, porque isso o travaria num único arranjo de página e o tornaria inútil em modal, aba ou preview."
    >
      <PgGrid :cols="1">
        <PgTile code="o miolo completo" align="stretch">
          <div data-brand="water" class="ps-palco" data-medida="arranjo">
            <DssPageShell>
              <template #rail>
                <DssPageShellRailItem
                  v-for="m in MODULOS" :key="m.label"
                  :icon="m.icone" :label="m.label" :active="m.ativo"
                  @click="registrar(m.label)"
                />
              </template>
              <template #breadcrumb>
                <DssBreadcrumbs separator="›" gutter="sm">
                  <DssBreadcrumbsEl label="Pesquisar registro" icon="search" />
                  <DssBreadcrumbsEl label="Solicitações" icon="description" />
                </DssBreadcrumbs>
              </template>
              <DssSectionTitle label="Verificações" size="lg" />
              <p class="ps-corpo">O conteúdo da página vive no board.</p>
            </DssPageShell>
          </div>
          <p v-if="medidas.arranjo" class="ps-nota">{{ medidas.arranjo }}</p>
          <p v-if="ultimoModulo" class="ps-nota">clicado: <code>{{ ultimoModulo }}</code></p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. O rail acompanha a marca ─────────────────────────────────── -->
    <PgSection
      id="marca" index="02" title="O rail acompanha a marca sem uma regra de brand" :count="3"
      desc="A Layer 4 de brands deste componente está VAZIA, e é de propósito: o rail consome --dss-action-primary-deep (fundo), --dss-action-primary-hover (separador) e --dss-action-primary (item ativo), e os três são remapeados por [data-brand]. A tela de origem não fazia assim — ela cravava --dss-border-water-700 no separador, prendendo o rail à marca Water. E pior: esse token é um SHORTHAND completo (`1px solid <cor>`), não uma cor, então a declaração virava `1px solid 1px solid #0356a1`, inválida — medido na tela, border-bottom-width era 0px e os separadores simplesmente não existiam."
    >
      <PgGrid>
        <PgTile v-for="b in MARCAS" :key="b" :code="`[data-brand=&quot;${b}&quot;]`" align="stretch">
          <div :data-brand="b" class="ps-palco ps-palco--baixo" :data-medida="`marca-${b}`">
            <DssPageShell :rail-aria-label="`Módulos do Sansys ${b}`">
              <template #rail>
                <DssPageShellRailItem v-for="m in MODULOS.slice(0, 3)" :key="m.label"
                  :icon="m.icone" :label="m.label" :active="m.ativo" />
              </template>
              <DssSectionTitle :label="`Sansys ${b}`" />
            </DssPageShell>
          </div>
          <p v-if="medidas[`marca-${b}`]" class="ps-nota">{{ medidas[`marca-${b}`] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Regiões condicionais ─────────────────────────────────────── -->
    <PgSection
      id="regioes" index="03" title="Regiões condicionais" :count="3"
      desc="Sem slot, sem região. Um &lt;nav&gt; vazio é anunciado como 'navegação' pelo leitor de tela e leva a lugar nenhum; um container de trilha vazio ocupa respiro sem conteúdo. O shell só renderiza o que recebeu."
    >
      <PgGrid>
        <PgTile v-for="r in REGIOES" :key="r.chave" :code="r.code" align="stretch">
          <div data-brand="water" class="ps-palco ps-palco--baixo" :data-medida="r.chave">
            <DssPageShell>
              <template v-if="r.rail" #rail>
                <DssPageShellRailItem icon="dashboard" label="Painel" active />
              </template>
              <template v-if="r.trilha" #breadcrumb>
                <DssBreadcrumbs separator="›" gutter="sm">
                  <DssBreadcrumbsEl label="Início" icon="home" />
                </DssBreadcrumbs>
              </template>
              <DssSectionTitle label="Conteúdo" />
            </DssPageShell>
          </div>
          <p v-if="medidas[r.chave]" class="ps-nota">{{ medidas[r.chave] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. O board ──────────────────────────────────────────────────── -->
    <PgSection
      id="board" index="04" title="O board é do shell" :count="2"
      desc="O cartão branco sobre o fundo rebaixado é o arranjo padrão das telas Sansys, e estava duplicado como `.gm-board` em cada uma. O shell absorveu. board={false} devolve a coluna nua para a tela que monta a própria superfície — ou que tem várias."
    >
      <PgGrid>
        <PgTile code="board (padrão)" align="stretch">
          <div data-brand="water" class="ps-palco ps-palco--baixo" data-medida="board-sim">
            <DssPageShell>
              <DssSectionTitle label="Com board" />
              <p class="ps-corpo">A superfície branca vem do shell.</p>
            </DssPageShell>
          </div>
          <p v-if="medidas['board-sim']" class="ps-nota">{{ medidas['board-sim'] }}</p>
        </PgTile>
        <PgTile code="board={false}" align="stretch">
          <div data-brand="water" class="ps-palco ps-palco--baixo" data-medida="board-nao">
            <DssPageShell :board="false">
              <DssCard variant="outlined" class="ps-cartao">
                <DssCardSection>Superfície própria</DssCardSection>
              </DssCard>
            </DssPageShell>
          </div>
          <p v-if="medidas['board-nao']" class="ps-nota">{{ medidas['board-nao'] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Acessibilidade do rail ───────────────────────────────────── -->
    <PgSection
      id="a11y" index="05" title="Acessibilidade do rail" :count="2"
      desc="Três decisões medíveis. O rail é um &lt;nav&gt; NOMEADO — numa página onde a trilha também é &lt;nav&gt;, dois sem nome viram 'navegação' e 'navegação'. O item tem nome acessível obrigatório: o rail só mostra ícones, e um botão cujo único conteúdo é um ícone decorativo é um botão sem nome. E o módulo atual marca aria-current=&quot;page&quot; além de ser pintado — informação que vive só na cor é o que a WCAG 1.4.1 proíbe. Some o alvo de toque: 44px de altura mínima, numa coluna de 52px que É a largura do alvo."
    >
      <PgGrid>
        <PgTile code="o que o rail expõe" align="stretch">
          <div data-brand="water" class="ps-palco ps-palco--baixo" data-medida="a11y">
            <DssPageShell>
              <template #rail>
                <DssPageShellRailItem icon="dashboard" label="Painel" active />
                <DssPageShellRailItem icon="description" label="Solicitações" />
                <DssPageShellRailItem icon="lock" label="Bloqueado" disabled />
              </template>
              <DssSectionTitle label="Conteúdo" />
            </DssPageShell>
          </div>
          <p v-if="medidas.a11y" class="ps-nota">{{ medidas.a11y }}</p>
        </PgTile>
        <PgTile code="alvo de toque" align="stretch">
          <div data-brand="water" class="ps-palco ps-palco--baixo" data-medida="alvo">
            <DssPageShell>
              <template #rail>
                <DssPageShellRailItem v-for="m in MODULOS" :key="m.label"
                  :icon="m.icone" :label="m.label" :active="m.ativo" />
              </template>
              <DssSectionTitle label="Conteúdo" />
            </DssPageShell>
          </div>
          <p v-if="medidas.alvo" class="ps-nota">{{ medidas.alvo }}</p>
        </PgTile>
      </PgGrid>
      <p class="ps-nota ps-nota--bloco">
        <DssButton label="Medir" variant="outline" size="sm" @click="medir" />
      </p>
    </PgSection>

    <!-- ── 06. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="06" title="Exemplos de uso" :count="4"
      desc="Cenários reais, vindos do DssPageShell.example.vue do próprio componente."
    >
      <DssPageShellExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssPageShell from '@components/composed/DssPageShell/DssPageShell.vue'
import DssPageShellRailItem from '@components/composed/DssPageShell/1-structure/DssPageShellRailItem.ts.vue'
import DssPageShellExample from '@components/composed/DssPageShell/DssPageShell.example.vue'
import DssBreadcrumbs from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssSectionTitle from '@components/base/DssSectionTitle/DssSectionTitle.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssCard from '@components/base/DssCard/DssCard.vue'
import { DssCardSection } from '@components/base/DssCard/index'

const MARCAS = ['water', 'hub', 'waste'] as const

const MODULOS = [
  { icone: 'dashboard', label: 'Painel', ativo: true },
  { icone: 'description', label: 'Solicitações', ativo: false },
  { icone: 'people', label: 'Clientes', ativo: false },
  { icone: 'settings', label: 'Configurações', ativo: false },
]

const REGIOES = [
  { chave: 'reg-tudo', code: 'rail + trilha', rail: true, trilha: true },
  { chave: 'reg-rail', code: 'só rail', rail: true, trilha: false },
  { chave: 'reg-nada', code: 'nem rail nem trilha', rail: false, trilha: false },
]

const medidas = reactive<Record<string, string>>({})
const ultimoModulo = ref('')

function registrar(modulo: string) {
  ultimoModulo.value = modulo
}

/**
 * As medições saem do DOM. `offsetParent === null` pula a seção oculta — a
 * casca mantém as seções montadas com v-show quando se vai ao Preview Frame,
 * e medir ali devolve zero em tudo.
 */
function medir() {
  for (const palco of document.querySelectorAll<HTMLElement>('[data-medida]')) {
    const chave = palco.dataset.medida as string
    if (!chave || palco.offsetParent === null) continue

    const rail = palco.querySelector<HTMLElement>('.dss-page-shell__rail')
    const item = palco.querySelector<HTMLElement>('.dss-page-shell__rail-item')
    const trilha = palco.querySelector('.dss-page-shell__breadcrumb')
    const board = palco.querySelector<HTMLElement>('.dss-page-shell__board')
    const shell = palco.querySelector<HTMLElement>('.dss-page-shell')

    if (chave.startsWith('marca-')) {
      const csRail = rail ? getComputedStyle(rail) : null
      const ativo = palco.querySelector<HTMLElement>('.dss-page-shell__rail-item--active')
      medidas[chave] = [
        `fundo do rail: ${csRail?.backgroundColor ?? '—'}`,
        `separador: ${item ? getComputedStyle(item).borderBottomColor : '—'}`,
        `item ativo: ${ativo ? getComputedStyle(ativo).backgroundColor : '—'}`,
      ].join(' · ')
    } else if (chave.startsWith('reg-')) {
      medidas[chave] = `rail: ${rail ? 'presente' : 'ausente'} · trilha: ${trilha ? 'presente' : 'ausente'}`
    } else if (chave.startsWith('board-')) {
      const cs = board ? getComputedStyle(board) : null
      const temSuperficie = shell?.classList.contains('dss-page-shell--board')
      medidas[chave] = temSuperficie
        ? `superfície: ${cs?.backgroundColor} · moldura: ${cs?.borderTopWidth}`
        : 'coluna nua — a superfície é do consumidor'
    } else if (chave === 'a11y') {
      const desabilitado = palco.querySelector<HTMLButtonElement>('.dss-page-shell__rail-item:disabled')
      medidas[chave] = [
        `<nav aria-label="${rail?.getAttribute('aria-label')}">`,
        `nome do item: "${palco.querySelector('.dss-page-shell__rail-label')?.textContent}"`,
        `ativo: aria-current=${palco.querySelector('.dss-page-shell__rail-item--active')?.getAttribute('aria-current')}`,
        `desabilitado: ${desabilitado ? 'sim' : 'não'}`,
      ].join(' · ')
    } else if (chave === 'alvo') {
      const r = item?.getBoundingClientRect()
      medidas[chave] = item
        ? `item: ${Math.round(r!.width)} × ${Math.round(r!.height)}px · rail: ${rail ? Math.round(rail.getBoundingClientRect().width) : 0}px`
        : '—'
    } else {
      const r = rail?.getBoundingClientRect()
      medidas[chave] = [
        `rail: ${r ? Math.round(r.width) : 0}px`,
        `fundo da página: ${shell ? getComputedStyle(shell).backgroundColor : '—'}`,
        `board: ${board ? getComputedStyle(board).backgroundColor : '—'}`,
      ].join(' · ')
    }
  }
}

onMounted(async () => {
  await nextTick()
  medir()
})

const SECTIONS = [
  { id: 'arranjo',  index: '01', title: 'O arranjo' },
  { id: 'marca',    index: '02', title: 'O rail acompanha a marca sem uma regra de brand' },
  { id: 'regioes',  index: '03', title: 'Regiões condicionais' },
  { id: 'board',    index: '04', title: 'O board é do shell' },
  { id: 'a11y',     index: '05', title: 'Acessibilidade do rail' },
  { id: 'exemplos', index: '06', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 2, label: 'Props' },
  { value: 3, label: 'Slots' },
  { value: 52, label: 'px de rail' },
  { value: 0, label: 'regras de brand' },
]
</script>

<style scoped>
/* O shell preenche a altura do pai, e o rail acompanha a rolagem. Dentro de um
   tile o pai precisa declarar altura — senão não há o que acompanhar. */
.ps-palco {
  block-size: var(--dss-spacing-80);
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.ps-palco--baixo {
  block-size: var(--dss-spacing-48);
}

.ps-corpo {
  margin: 0;
  color: var(--dss-text-body);
}

.ps-cartao {
  padding: var(--dss-spacing-4);
}

.ps-nota {
  margin: var(--dss-spacing-2) 0 0;
  font-size: var(--dss-font-size-xs);
  line-height: var(--dss-line-height-relaxed);
  color: var(--dss-text-subtle);
}

.ps-nota--bloco {
  margin-top: var(--dss-spacing-4);
}
</style>
