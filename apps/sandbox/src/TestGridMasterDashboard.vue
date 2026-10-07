<template>
  <div class="gm-page" data-brand="water">
    <DssLayout view="hHh lpR fFf" container class="gm-layout">

      <!-- ================================================================
           BARRA DE APLICAÇÃO — composto
           Antes: DssHeader + DssToolbar + 5 peças soltas + 50 linhas de CSS
           (.gm-appbar__left/right/brand/brand-alt/pipe/module).
           ================================================================ -->
      <DssAppBar
        brand="water"
        title="Nome do Módulo"
        menu-aria-label="Abrir menu principal"
      >
        <template #actions>
          <DssButton variant="flat" round size="md" icon="help_outline" aria-label="Ajuda">
            <DssTooltip label="Central de ajuda" />
          </DssButton>
          <DssButton variant="flat" round size="md" icon="notifications" aria-label="Notificações">
            <DssTooltip label="Notificações" />
          </DssButton>
          <DssButton variant="flat" round size="md" icon="apps" aria-label="Aplicativos Sansys">
            <DssTooltip label="Aplicativos Sansys" />
          </DssButton>
          <DssButton variant="flat" round size="md" icon="account_circle" aria-label="Minha conta">
            <DssTooltip label="Minha conta" />
          </DssButton>
        </template>
      </DssAppBar>

      <DssPageContainer>
        <DssPage>

          <!-- ============================================================
               MIOLO — composto
               Antes: <nav class="gm-rail"> à mão + .gm-content + .gm-board
               + <DssCard class="gm-board"> — 75 linhas de CSS.
               ============================================================ -->
          <DssPageShell rail-aria-label="Módulos do sistema">

            <template #rail>
              <DssPageShellRailItem
                v-for="m in modulos"
                :key="m.label"
                :icon="m.icone"
                :label="m.label"
                :active="m.ativo"
              />
            </template>

            <template #breadcrumb>
              <DssBreadcrumbs separator="›" gutter="sm">
                <DssBreadcrumbsEl label="Pesquisar registro" icon="looks_one" />
                <DssBreadcrumbsEl label="Caminho-2" icon="looks_two" />
                <DssBreadcrumbsEl label="Caminho-3" icon="looks_3" />
              </DssBreadcrumbs>
            </template>

            <DssSectionTitle :level="1" size="lg" label="Título" />

            <!-- ==========================================================
                 FAIXA DE DASHBOARD — Filtros · Status · Prioridade
                 ========================================================== -->
            <div class="gm-band">

              <!-- Filtros -->
              <DssCard variant="outlined" class="gm-panel gm-panel--filters">
                <div class="gm-panel__head">
                  <DssSectionTitle label="Filtros" />
                  <!-- `md` + `dense`, e a combinação é deliberada. Medido:
                       | caso        | altura | ícone |
                       | sm          |  36px  | 16px  |
                       | sm + dense  |  36px  | 16px  |  ← dense não toca o ícone
                       | md          |  44px  | 20px  |
                       | md + dense  |  36px  | 20px  |  ← aqui

                       O `dense` NÃO reduz o ícone: ele mexe em padding, altura
                       e tipografia. Quem dimensiona o ícone é a regra de
                       tamanho (`.dss-button--md .dss-button__icon`), de
                       especificidade maior, e ela sobrevive ao `dense`.

                       Resultado: a caixa fica compacta como a do `sm` (36px) e
                       o glifo sobe para 20px — 25% maior, que é o que
                       incomodava no botão icon-only. -->
                  <div class="gm-panel__actions">
                    <DssButton
                      variant="unelevated" color="primary" size="md" dense
                      icon="save" aria-label="Salvar filtro"
                    >
                      <DssTooltip label="Salvar este conjunto de filtros" />
                    </DssButton>
                    <DssButton
                      variant="unelevated" color="primary" size="md" dense
                      label="Opções filtro" icon-right="expand_more"
                    />
                  </div>
                </div>

                <div class="gm-grid gm-grid--3">
                  <DssInput v-model="filtros.setor" variant="outlined" dense label="Setor Execução" />
                  <DssInput v-model="filtros.equipe" variant="outlined" dense label="Equipe" />
                  <DssInput v-model="filtros.servico" variant="outlined" dense label="Código Serviço" />
                </div>

                <!-- ==========================================================
                     CHIPS DE FILTRO — uma linha, o resto atrás do gatilho

                     A lista ocupa UMA linha; o que não couber vive atrás do
                     "+N filtros", que a revela. É o pedido do usuário e também
                     o que devolve altura: com 10 filtros a lista quebrava em 3
                     linhas dentro do card mais alto da faixa, e era a faixa
                     inteira que empurrava a tabela para baixo.

                     O que não cabe sai do DOM (`hidden`), não só da vista: um
                     chip invisível mas tabulável é uma armadilha de teclado.

                     O gatilho mora DENTRO da lista de propósito — assim ele
                     participa da mesma quebra de linha que os chips, e a conta
                     de "o que cabe" é a do navegador, não uma aritmética
                     paralela que pode divergir do layout real.
                     ========================================================== -->
                <ul
                  id="gm-filtros-aplicados"
                  ref="listaChips"
                  class="gm-chips"
                  :class="{
                    'gm-chips--medindo': medindo,
                    'gm-chips--expandido': chipsExpandidos,
                  }"
                  aria-label="Filtros aplicados"
                >
                  <li
                    v-for="(f, i) in filtrosAplicados"
                    :key="f"
                    :hidden="!chipVisivel(i)"
                  >
                    <DssChip
                      variant="outline" color="neutral" size="sm" dense
                      :label="f" removable
                      :remove-aria-label="`Remover ${f}`"
                      @remove="removerFiltro(f)"
                    />
                  </li>

                  <li v-if="medindo || chipsOcultos > 0 || chipsExpandidos">
                    <DssButton
                      variant="flat" color="primary" size="sm"
                      :label="chipsExpandidos ? 'Ver menos' : `+${chipsOcultos} filtros`"
                      :icon-right="chipsExpandidos ? 'expand_less' : 'expand_more'"
                      :aria-expanded="chipsExpandidos"
                      aria-controls="gm-filtros-aplicados"
                      @click="chipsExpandidos = !chipsExpandidos"
                    />
                  </li>
                </ul>

                <div class="gm-panel__submit">
                  <DssButton
                    variant="unelevated" color="tertiary" size="sm"
                    icon="error_outline" label="Pesquisar"
                  />
                </div>
              </DssCard>

              <!-- Status -->
              <DssCard variant="outlined" class="gm-panel">
                <DssSectionTitle label="Status" />
                <ul class="gm-status">
                  <li
                    v-for="s in status"
                    :key="s.label"
                    class="gm-status__row"
                    :class="`gm-status__row--${s.tom}`"
                  >
                    <span class="gm-status__value">{{ s.valor }}</span>
                    <span class="gm-status__label">{{ s.label }}</span>
                    <DssIcon :name="s.icone" size="sm" :color="s.cor" decorative />
                  </li>
                </ul>
              </DssCard>

              <!-- Prioridade -->
              <DssCard variant="outlined" class="gm-panel">
                <DssSectionTitle label="Prioridade" />
                <div class="gm-priority">
                  <svg
                    class="gm-donut" viewBox="0 0 42 42"
                    role="img"
                    :aria-label="`Prioridade das ordens: ${prioridades.map(p => `${p.label} ${p.valor}`).join(', ')}`"
                  >
                    <circle class="gm-donut__track" cx="21" cy="21" r="15.915" />
                    <circle
                      v-for="(p, i) in prioridades"
                      :key="p.label"
                      class="gm-donut__seg"
                      :class="`gm-donut__seg--${p.tom}`"
                      cx="21" cy="21" r="15.915"
                      :stroke-dasharray="`${p.valor} ${100 - p.valor}`"
                      :stroke-dashoffset="offsetDonut(i)"
                    />
                  </svg>

                  <ul class="gm-legend">
                    <li v-for="p in prioridades" :key="p.label" class="gm-legend__item">
                      <span class="gm-legend__dot" :class="`gm-legend__dot--${p.tom}`" aria-hidden="true" />
                      <span class="gm-legend__label">{{ p.label }}</span>
                      <span class="gm-legend__value">{{ p.valor }}</span>
                    </li>
                  </ul>
                </div>
              </DssCard>
            </div>

            <!-- ==========================================================
                 CARD — linha de campos (6 colunas)
                 ========================================================== -->
            <DssCard variant="outlined" class="gm-panel">
              <DssSectionTitle label="Título" />
              <div class="gm-grid gm-grid--6">
                <DssInput v-model="linha.single1" variant="outlined" dense label="Input Single" />
                <DssSelect
                  v-model="linha.multiplo" :options="opcoes" variant="outlined" dense multiple use-chips
                  label="Input Multiple"
                />
                <DssInput v-model="linha.single2" variant="outlined" dense label="Input Single (2)" />
                <DssInput v-model="linha.busca" variant="outlined" dense label="Input-search" />
                <DssInput v-model="linha.data" variant="outlined" dense type="date" label="Data" />
                <DssInput v-model="linha.horario" variant="outlined" dense type="number" label="Horário Agendamento" />
              </div>
            </DssCard>

            <!-- ==========================================================
                 CARD — tabela de registros (composto)

                 Antes: DssMarkupTable + <table> escrito à mão + 56 linhas de
                 CSS (.gm-table). A tabela tem SELEÇÃO de linha, que é o que o
                 "quando NÃO usar" do DssMarkupTable manda levar ao DssTable.
                 A caixa de seleção por linha e o "selecionar todos" passaram a
                 ser do componente — sumiram da página junto com o <thead>.
                 ========================================================== -->
            <DssCard variant="outlined" class="gm-panel">
              <DssSectionTitle label="Título" />

              <DssTable
                v-model="registrosSelecionados"
                :rows="registros"
                :columns="colunas"
                row-key="id"
                selection="multiple"
                density="compact"
                flat
                :rows-per-page-options="[10, 25, 50]"
                aria-label="Registros do módulo"
              >
                <!-- SELEÇÃO COM NOME ACESSÍVEL.

                     A caixa que o QTable desenha sozinho não tem nome: medido
                     na própria tela depois da conversão, 5 `<input type=checkbox>`
                     sem `id`, sem `name` e sem `aria-label` — a tabela escrita à
                     mão tinha "Selecionar protocolo X" em cada linha, e a troca
                     para o composto perdeu isso em silêncio.

                     Os slots `header-selection`/`body-selection` devolvem o
                     controle: a caixa passa a ser `DssCheckbox`, com nome. -->
                <template #header-selection="scope">
                  <DssCheckbox
                    v-model="scope.selected" dense size="xs"
                    aria-label="Selecionar todos os registros"
                  />
                </template>

                <template #body-selection="scope">
                  <DssCheckbox
                    v-model="scope.selected" dense size="xs"
                    :aria-label="`Selecionar protocolo ${scope.row.protocolo}`"
                  />
                </template>

                <!-- O slot `body-cell-*` do QTable SUBSTITUI o `<td>`, então o
                     `<td>` é do consumidor por contrato — não é marcação crua
                     escapando do DSS. O que vai DENTRO dele é componente. -->
                <template #body-cell-equipe="{ value }">
                  <td class="text-left">
                    <!-- `sm` e não `xs`: no `xs` o ícone é 12px, e um círculo de 12px de
                         diâmetro tem a linha do topo com ~40% da largura da central — é
                         geometria, não defeito, mas lê como topo cortado. O `sm` leva o
                         glifo a 16px dentro de um chip de 24px. -->
                    <DssChip variant="outline" color="positive" size="sm" dense icon="check_circle" :label="String(value)" />
                  </td>
                </template>

                <template #body-cell-mobile>
                  <td class="text-left">
                    <DssIcon name="file_upload" size="xs" color="primary" aria-label="Enviado pelo mobile" />
                  </td>
                </template>

                <template #body-cell-servico="{ row }">
                  <td class="text-left">
                    <span class="gm-cell-stack">
                      <strong>{{ row.servico }}</strong>
                      <span class="gm-cell-sub">{{ row.servicoDesc }}</span>
                    </span>
                  </td>
                </template>

                <template #body-cell-situacaoPrazo="{ value }">
                  <td class="text-left">
                    <span class="gm-cell-inline">
                      <DssIcon name="notification_important" size="xs" color="negative" decorative />
                      {{ value }}
                    </span>
                  </td>
                </template>

                <template #body-cell-prioridade="{ value }">
                  <td class="text-left">
                    <span class="gm-dot gm-dot--urgente" role="img" :aria-label="`Prioridade ${value}`" />
                  </td>
                </template>

                <template #body-cell-acoes="{ row }">
                  <td class="text-right">
                    <DssButton
                      variant="flat" round size="xs" icon="expand_more"
                      :aria-label="`Detalhar protocolo ${row.protocolo}`"
                    />
                  </td>
                </template>
              </DssTable>
            </DssCard>

            <!-- ==========================================================
                 CARD — formulário (6 × 2) + ações do card
                 ========================================================== -->
            <DssCard variant="outlined" class="gm-panel">
              <DssSectionTitle label="Título" />

              <div class="gm-grid gm-grid--6 gm-grid--rows">
                <DssSelect
                  v-for="n in 12" :key="n"
                  v-model="formulario[n - 1]" :options="opcoes"
                  variant="outlined" dense
                  :label="`Campo ${n}`"
                />
              </div>

              <div class="gm-panel__submit gm-panel__submit--center">
                <DssButton variant="outline" color="primary" size="sm" label="Limpar" :disabled="!formularioPreenchido" />
                <DssButton variant="unelevated" color="primary" size="sm" label="Salvar" />
              </div>
            </DssCard>

            <!-- ==========================================================
                 colect.button — barra de ações do fluxo
                 ========================================================== -->
            <div class="gm-actions" role="group" aria-label="Ações do formulário">
              <DssButton variant="unelevated" color="negative"  size="sm" label="Cancelar"  class="gm-actions__btn" />
              <DssButton variant="outline"    color="primary"   size="sm" label="Voltar"    class="gm-actions__btn" />
              <DssButton variant="unelevated" color="primary"   size="sm" label="Próximo"   class="gm-actions__btn" />
              <DssButton variant="unelevated" color="secondary" size="sm" label="Finalizar" class="gm-actions__btn" />
            </div>

          </DssPageShell>
        </DssPage>
      </DssPageContainer>
    </DssLayout>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 *  TestGridMasterDashboard — Sansys Water · Grid master (dashboard)
 * ==========================================================================
 *
 *  Esqueleto canônico de página do Sansys Water, montado sobre o DSS.
 *
 *  FONTES (ordem de autoridade — Constituição #6):
 *  1. CSS/tokens do DSS e API real dos componentes  → árbitro
 *  2. Figma "Grid master - dashboard" (node 1233:6030, symbol container.base
 *     1823:1062, arquivo Base Componentes — Sansys Water) → referência
 *
 *  GRADE MEDIDA NO FIGMA (todas as medidas viraram token):
 *  · header 40 px · rail 52 px · gutter do conteúdo 24 px
 *  · board 1818 px com padding 24 · card interno padding 16
 *  · grade de 6 colunas, gutter 20 px · altura de campo 36 px
 *  · linha de tabela 36 px · barra de ações 60 px · botão de fluxo 160×36
 *
 *  ==========================================================================
 *  RECONSTRUÇÃO SOBRE OS COMPOSTOS (Bloco 3.1, set/2026)
 *  ==========================================================================
 *
 *  Quatro peças que eram CSS desta página viraram componente, e a página
 *  passou a CONSUMIR em vez de reimplementar:
 *
 *  | Era, aqui                               | Virou                       |
 *  |-----------------------------------------|-----------------------------|
 *  | `DssHeader`+`DssToolbar`+5 peças soltas | `DssAppBar`                 |
 *  | `<nav class="gm-rail">` escrito à mão   | `DssPageShell` + RailItem   |
 *  | `.gm-content` + `.gm-board` + um card   | `DssPageShell` (board)      |
 *  | `.gm-title` (6 ocorrências)             | `DssSectionTitle`           |
 *  | `DssMarkupTable` + `<table>` à mão      | `DssTable`                  |
 *
 *  DUAS DIVERGÊNCIAS CONTRA O FIGMA — Constituição #6 diz que o árbitro visual
 *  é o CSS do DSS, não o Figma:
 *
 *  · O traço do título de seção segue a MARCA, não o âmbar do Figma. Não é
 *    escolha deste arquivo: é decisão de produto, tomada no Bloco 3.1 e
 *    registrada em DssSectionTitle.md §4. `accent="brand"` é o default e
 *    consome `--dss-action-primary`, que acompanha o produto. O âmbar seria
 *    `accent="warning"` — e isso significaria "esta seção fala de um alerta",
 *    que é falso nas seis.
 *  · O cabeçalho da tabela é o tratamento do `DssTable` sob `[data-brand]`:
 *    fundo `--dss-water-50` com texto `--dss-water-700`. O Figma usa azul
 *    sólido com texto branco. Repintar daqui seria injetar CSS no filho — o
 *    que o Cartão Composto proíbe. Registrado como lacuna do DssTable.
 *
 *  DESVIOS DELIBERADOS ANTERIORES (regra-dura do DSS vence refino estético):
 *  · "Voltar" é um botão cinza (#bcbcbc) no Figma. O DSS não tem cor neutra
 *    em ButtonColor, e branco sobre #bcbcbc dá 2,3:1 (reprova WCAG 1.4.3).
 *    Usa variant="outline", que é o tratamento secundário do DSS.
 *  · "Cancelar" é #d41320 no Figma; o token equivalente do DSS é
 *    --dss-feedback-error (#d8182e). Usa o token.
 *  · O donut do Figma pinta um segmento azul que não existe na própria
 *    legenda (5 categorias, 5 cores). Aqui segue a legenda.
 */
import { ref, reactive, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

import DssAppBar        from '@components/composed/DssAppBar/DssAppBar.vue'
import DssBreadcrumbs   from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssButton        from '@components/base/DssButton/DssButton.vue'
import DssCard          from '@components/base/DssCard/DssCard.vue'
import DssCheckbox      from '@components/base/DssCheckbox/DssCheckbox.vue'
import DssChip          from '@components/base/DssChip/DssChip.vue'
import DssIcon          from '@components/base/DssIcon/DssIcon.vue'
import DssInput         from '@components/base/DssInput/DssInput.vue'
import DssLayout        from '@components/base/DssLayout/DssLayout.vue'
import DssPage          from '@components/base/DssPage/DssPage.vue'
import DssPageContainer from '@components/base/DssPageContainer/DssPageContainer.vue'
import DssPageShell     from '@components/composed/DssPageShell/DssPageShell.vue'
import DssPageShellRailItem from '@components/composed/DssPageShell/DssPageShellRailItem.vue'
import DssSectionTitle  from '@components/base/DssSectionTitle/DssSectionTitle.vue'
import DssSelect        from '@components/base/DssSelect/DssSelect.vue'
import DssTable         from '@components/composed/DssTable/DssTable.vue'
import DssTooltip       from '@components/base/DssTooltip/DssTooltip.vue'

// ── Rail de módulos ──────────────────────────────────────────────────────
const modulos = [
  { icone: 'public',        label: 'Mapa',            ativo: true  },
  { icone: 'shopping_cart', label: 'Comercial',       ativo: false },
  { icone: 'paid',          label: 'Financeiro',      ativo: false },
  { icone: 'bar_chart',     label: 'Relatórios',      ativo: false },
  { icone: 'smartphone',    label: 'Mobile',          ativo: false },
  { icone: 'settings',      label: 'Configurações',   ativo: false },
  { icone: 'account_tree',  label: 'Estrutura',       ativo: false },
]

// ── Filtros ──────────────────────────────────────────────────────────────
const filtros = reactive({ setor: '', equipe: '', servico: '' })
const filtrosAplicados = ref(
  Array.from({ length: 10 }, (_, i) => `Filtro - ${i + 1}`),
)
function removerFiltro(f: string) {
  filtrosAplicados.value = filtrosAplicados.value.filter(x => x !== f)
}

// ── Chips de filtro: uma linha, o excedente atrás do gatilho ──────────────
//
// Por que `hidden` e não `overflow: hidden` sozinho: recorte de CSS esconde da
// VISTA, não do DOM — o chip recortado continua tabulável e continua sendo
// lido pelo leitor de tela, que é uma armadilha de teclado em cima de algo
// invisível. Aqui o excedente sai da árvore de acessibilidade.
//
// Por que medir o LAYOUT em vez de somar larguras em cache: a primeira versão
// disto media os chips uma vez e reaproveitava os números. Medido, o defeito
// apareceu na hora — estreitar o card recalculava, ALARGAR não: a conta usava
// larguras velhas e o gatilho ficava preso em "+9 filtros" num card que já
// comportava sete chips. Agora cada recálculo renderiza tudo com `wrap` por um
// tick e pergunta ao navegador quem ficou na primeira linha. Quem encaixa é o
// motor de layout; o código só lê o resultado.
const listaChips = ref<HTMLElement | null>(null)
const chipsExpandidos = ref(false)
const medindo = ref(true)
const chipsVisiveis = ref(0)
const GAP_CHIPS = 8   // --dss-spacing-2

const chipsOcultos = computed(() =>
  Math.max(0, filtrosAplicados.value.length - chipsVisiveis.value))

function chipVisivel(i: number) {
  return medindo.value || chipsExpandidos.value || i < chipsVisiveis.value
}

// Uma execução por vez. O `ResizeObserver` dispara DURANTE o passo de medição
// (ele mexe no DOM), e duas execuções concorrentes se corrompem: a primeira
// desliga `medindo` enquanto a segunda ainda está medindo, e a segunda passa a
// medir uma lista JÁ RECOLHIDA — lê menos chips na primeira linha e encolhe o
// número. Medido: a cada redimensionamento o valor caía um degrau até chegar a
// 1, e só voltava ao certo quando uma passada rodava sozinha.
let emAndamento = false
let pendente = false

async function recalcular(): Promise<void> {
  if (emAndamento) { pendente = true; return }
  emAndamento = true
  try {
    await medir()
  } finally {
    emAndamento = false
    if (pendente) { pendente = false; await recalcular() }
  }
}

async function medir() {
  const total = filtrosAplicados.value.length
  if (!total) { chipsVisiveis.value = 0; return }

  // 1º tick: tudo visível e com quebra de linha, para o navegador encaixar.
  medindo.value = true
  await nextTick()

  const lista = listaChips.value
  if (!lista) { medindo.value = false; return }

  // Consulta o DOM na hora de medir, em vez de guardar `ref` de `v-for`: esse
  // array mantém nós DEFASADOS entre renderizações (e depois de HMR), e medir
  // nó solto devolve zero sem avisar. Já custou uma investigação nesta onda.
  const todosLi = [...lista.querySelectorAll<HTMLElement>(':scope > li')]
  const liGatilho = todosLi.find(li => li.querySelector('[aria-expanded]')) ?? null
  const itens = todosLi.filter(li => li !== liGatilho)
  if (!itens.length) { medindo.value = false; return }

  // `offsetTop` só identifica a linha porque `--medindo` alinha os itens pelo
  // topo. Com `align-items: center` cada item da MESMA linha fica num topo
  // diferente (alturas diferentes), e o teste de primeira linha seria falso.
  const topo = itens[0].offsetTop
  const naPrimeiraLinha = itens.filter(li => li.offsetTop === topo)

  if (naPrimeiraLinha.length === total) {
    // Coube tudo — nenhum gatilho a desenhar, nenhum chip a esconder.
    chipsVisiveis.value = total
  } else {
    // Não coube: o gatilho precisa dividir a linha com os chips que ficarem.
    const larguraLista = lista.clientWidth
    const larguraGatilho = liGatilho?.getBoundingClientRect().width ?? 0
    const larguras = naPrimeiraLinha.map(li => li.getBoundingClientRect().width)
    let n = larguras.length
    let usado = larguras.reduce((a, w) => a + w, 0) + GAP_CHIPS * (n - 1)
    // Cede chips até o gatilho caber.
    while (n > 1 && usado + GAP_CHIPS + larguraGatilho > larguraLista) {
      usado -= larguras[n - 1] + GAP_CHIPS
      n--
    }
    // Largura extrema: nem UM chip mais o gatilho cabem. Aqui o chip cede, não
    // o gatilho — medido a 202px, manter um chip fazia a linha transbordar e o
    // recorte comia justamente o "+N filtros", que é o único caminho até os
    // escondidos. Uma linha só com "+10 filtros" informa menos, mas informa; e
    // é acessível, que é o que não se pode perder.
    if (n === 1 && usado + GAP_CHIPS + larguraGatilho > larguraLista) n = 0
    chipsVisiveis.value = n
  }

  medindo.value = false
}

let observador: ResizeObserver | null = null
let agendado = 0
function agendarRecalculo() {
  // O recálculo mexe no DOM, e mexer no DOM dentro do callback do
  // ResizeObserver dispara o aviso de loop. Um frame de folga resolve.
  cancelAnimationFrame(agendado)
  agendado = requestAnimationFrame(() => { recalcular() })
}

onMounted(async () => {
  await recalcular()
  if (listaChips.value && 'ResizeObserver' in window) {
    observador = new ResizeObserver(agendarRecalculo)
    observador.observe(listaChips.value)
  }
})
onBeforeUnmount(() => { cancelAnimationFrame(agendado); observador?.disconnect() })

// Remover um filtro muda a lista — o encaixe precisa ser refeito.
watch(() => filtrosAplicados.value.length, () => { recalcular() })

// ── Status ───────────────────────────────────────────────────────────────
const status = [
  { valor: 10, label: 'No prazo', tom: 'positivo', icone: 'check_circle',           cor: 'positive' as const },
  { valor: 10, label: 'A vencer', tom: 'alerta',   icone: 'watch_later',            cor: 'warning'  as const },
  { valor: 10, label: 'Vencidas', tom: 'negativo', icone: 'notification_important', cor: 'negative' as const },
]

// ── Prioridade (donut) ───────────────────────────────────────────────────
const prioridades = [
  { label: 'Urgente',      valor: 29, tom: 'urgente' },
  { label: 'Alta',         valor: 21, tom: 'alta'    },
  { label: 'Média',        valor: 20, tom: 'media'   },
  { label: 'Baixa',        valor: 22, tom: 'baixa'   },
  { label: 'Sem Urgência', valor:  8, tom: 'nenhuma' },
]
/** Offset acumulado: o dasharray do donut é em % do perímetro (r = 15.915). */
function offsetDonut(i: number) {
  const anterior = prioridades.slice(0, i).reduce((a, p) => a + p.valor, 0)
  return 25 - anterior
}

// ── Linha de campos ──────────────────────────────────────────────────────
const opcoes = ['Opção A', 'Opção B', 'Opção C']
const linha = reactive({
  single1: '', multiplo: [] as string[], single2: '',
  busca: '', data: '', horario: '',
})

// ── Tabela ───────────────────────────────────────────────────────────────
/**
 * As colunas são DADO, não marcação — foi o que a troca para `DssTable`
 * comprou. O `<thead>` escrito à mão sumiu junto com a caixa de "selecionar
 * todos": seleção é responsabilidade do componente.
 */
// ALINHAMENTO: tudo à ESQUERDA, menos a coluna de ações.
//
// Número à direita serve para comparar MAGNITUDE — valor, quantidade, total —,
// onde alinhar as casas deixa o olho comparar ordens de grandeza. Protocolo,
// matrícula, nr. de hidrômetro e data são IDENTIFICADORES e marcos: ninguém
// soma dois protocolos. Alinhá-los à direita só quebrava a margem de leitura,
// com colunas vizinhas correndo em sentidos opostos.
//
// `acoes` fica à direita de propósito: é o fim da linha, onde a mão procura o
// controle depois de ler o registro inteiro.
const colunas = [
  { name: 'equipe',        label: 'Equipe',         field: 'equipe',        align: 'left'  as const },
  { name: 'mobile',        label: 'Mobile',         field: 'id',            align: 'left'  as const },
  { name: 'protocolo',     label: 'Protocolo',      field: 'protocolo',     align: 'left' as const },
  { name: 'servico',       label: 'Serviço',        field: 'servico',       align: 'left'  as const },
  { name: 'matricula',     label: 'Matrícula',      field: 'matricula',     align: 'left' as const },
  { name: 'hidrometro',    label: 'Nr. Hidrômetro', field: 'hidrometro',    align: 'left' as const },
  { name: 'endereco',      label: 'Endereço',       field: 'endereco',      align: 'left'  as const },
  { name: 'bairro',        label: 'Bairro',         field: 'bairro',        align: 'left'  as const },
  { name: 'municipio',     label: 'Município',      field: 'municipio',     align: 'left'  as const },
  { name: 'solicitacao',   label: 'Solicitação',    field: 'solicitacao',   align: 'left' as const },
  { name: 'limite',        label: 'Lim. Execução',  field: 'limite',        align: 'left' as const },
  { name: 'situacaoPrazo', label: 'Status',         field: 'situacaoPrazo', align: 'left'  as const },
  { name: 'situacaoData',  label: 'Situação',       field: 'situacaoData',  align: 'left' as const },
  { name: 'prioridade',    label: 'Prioridade',     field: 'prioridade',    align: 'left'  as const },
  { name: 'acoes',         label: '',               field: 'id',            align: 'right' as const },
]

interface Registro {
  id: number; equipe: string; protocolo: string
  servico: string; servicoDesc: string; matricula: string; hidrometro: string
  endereco: string; bairro: string; municipio: string
  solicitacao: string; limite: string
  situacaoPrazo: string; situacaoData: string; prioridade: string
}

const registros = reactive<Registro[]>(
  Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    equipe: 'CL250',
    protocolo: '65665262',
    servico: '3565',
    servicoDesc: 'Solicitação Contato Ativo',
    matricula: '5646515-0',
    hidrometro: 'HD65465R54',
    endereco: 'Ser…',
    bairro: 'Centro',
    municipio: 'São José',
    solicitacao: '01/01/2024',
    limite: '01/01/2024',
    situacaoPrazo: 'Atrasada',
    situacaoData: '01/01/2024',
    prioridade: 'Urgente',
  })),
)

const registrosSelecionados = ref<Record<string, unknown>[]>([])

// ── Formulário ───────────────────────────────────────────────────────────
const formulario = reactive<(string | null)[]>(Array.from({ length: 12 }, () => null))
const formularioPreenchido = computed(() => formulario.some(v => v !== null && v !== ''))
</script>

<style lang="scss" scoped>
// ==========================================================================
//  TestGridMasterDashboard — esqueleto canônico de página do Sansys Water
//  Zero hardcode: toda cor, medida, raio e sombra vem de var(--dss-*).
//
//  O QUE SOBROU AQUI, E POR QUÊ:
//  Estrutura de página (barra, rail, trilha, board, título de seção, tabela)
//  saiu toda para componente no Bloco 3.1. O que resta é CONTEÚDO desta tela
//  — a faixa de dashboard, o donut de prioridade, a legenda, os blocos de
//  status. Nada disso se repete em outra tela, e por isso não virou composto:
//  a regra do §1.6 é que estrutura INVARIANTE vira componente, não que toda
//  linha de CSS deva sumir da página.
// ==========================================================================

// ── Raiz ──────────────────────────────────────────────────────────────────
.gm-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-font-size-sm);
}

.gm-layout {
  flex: 1;
  min-height: 0;
}

// ── Faixa de dashboard ────────────────────────────────────────────────────
.gm-band {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(var(--dss-spacing-48), 2fr) minmax(var(--dss-spacing-64), 2fr);
  gap: var(--dss-spacing-3);
  align-items: stretch;
}

// DENSIDADE (set/2026) — um degrau abaixo em padding e gap. A conta está na
// nota do `DssPageShell`: cada ~50px devolvidos acima da tabela é uma linha a
// mais antes da dobra. Altura de campo, alvo de toque e tipografia NÃO entram
// nesta redução.
.gm-panel {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-2);
  background: var(--dss-surface-default);

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--dss-spacing-4);
    flex-wrap: wrap;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--dss-spacing-2);
  }

  &__submit {
    display: flex;
    justify-content: center;
    gap: var(--dss-spacing-4);

    &--center { padding-top: var(--dss-spacing-2); }
  }
}

// ── Grades de campo — 6 colunas, gutter 20 px ────────────────────────────
.gm-grid {
  display: grid;
  // 16px entre colunas de campo. O gutter medido no Figma era 20; o degrau
  // abaixo mantém os campos distinguíveis e devolve altura nas grades de 2
  // linhas (o formulário de 12 campos).
  gap: var(--dss-spacing-4);

  // item de grade não encolhe abaixo do conteúdo sem isto: o q-field
  // do DssInput tem largura natural maior que a coluna e vaza.
  > * { min-width: 0; }

  &--3 { grid-template-columns: repeat(auto-fit, minmax(var(--dss-spacing-36), 1fr)); }
  &--6 { grid-template-columns: repeat(auto-fit, minmax(var(--dss-spacing-36), 1fr)); }
  &--rows { row-gap: var(--dss-spacing-3); }
}

// ── Chips de filtro — uma linha, excedente atrás do gatilho ───────────────
.gm-chips {
  list-style: none;
  margin: var(--dss-spacing-0);
  padding: var(--dss-spacing-0);
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);

  // Recolhida: UMA linha. O recorte é cinto de segurança — quem de fato tira
  // o excedente é o `hidden` no template, que o remove do DOM.
  flex-wrap: nowrap;
  overflow: hidden;

  // Chip NÃO encolhe. Num flex `nowrap` o padrão é `flex-shrink: 1`, e com a
  // lista cheia os chips eram espremidos: o rótulo truncava e a largura medida
  // deixava de ser a natural — justamente a entrada da conta de encaixe.
  > li { flex: 0 0 auto; }

  // Durante a medição e quando expandida, a lista quebra em linhas. É assim
  // que o navegador responde "quem cabe na primeira linha".
  &--expandido {
    flex-wrap: wrap;
    overflow: visible;
  }

  // Durante a medição, além de quebrar linha, os itens alinham pelo TOPO —
  // é o que faz `offsetTop` identificar a linha. Com `center` (o alinhamento
  // normal) itens de alturas diferentes na mesma linha têm topos diferentes.
  &--medindo {
    flex-wrap: wrap;
    overflow: visible;
    align-items: flex-start;
  }
}

// ── Status ────────────────────────────────────────────────────────────────
.gm-status {
  list-style: none;
  margin: var(--dss-spacing-0);
  padding: var(--dss-spacing-0);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);

  &__row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--dss-spacing-3);
    min-height: var(--dss-touch-target-xs);
    padding: var(--dss-spacing-1) var(--dss-spacing-2);
    border-radius: var(--dss-radius-sm);

    &--positivo { background: var(--dss-feedback-success-surface); }
    &--alerta   { background: var(--dss-feedback-warning-surface); }
    &--negativo { background: var(--dss-feedback-error-surface); }
  }

  &__value {
    font-size: var(--dss-font-size-lg);
    font-weight: var(--dss-font-weight-semibold);
    font-variant-numeric: tabular-nums;
  }

  &__label {
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-subtle);
  }
}

// ── Prioridade — donut ────────────────────────────────────────────────────
.gm-priority {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-4);
}

.gm-donut {
  flex-shrink: 0;
  width: var(--dss-spacing-24);
  height: var(--dss-spacing-24);
  transform: rotate(-90deg);

  &__track,
  &__seg {
    fill: none;
    stroke-width: var(--dss-spacing-2);
  }

  &__track { stroke: var(--dss-surface-muted); }

  &__seg {
    &--urgente { stroke: var(--dss-feedback-error); }
    &--alta    { stroke: var(--dss-hub-600); }
    &--media   { stroke: var(--dss-feedback-warning); }
    &--baixa   { stroke: var(--dss-feedback-success); }
    &--nenhuma { stroke: var(--dss-border-gray-500); }
  }
}

.gm-legend {
  list-style: none;
  margin: var(--dss-spacing-0);
  padding: var(--dss-spacing-0);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-1);
  font-size: var(--dss-font-size-xs);

  &__item {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--dss-spacing-3);
    white-space: nowrap;
  }

  &__dot {
    width: var(--dss-spacing-2);
    height: var(--dss-spacing-2);
    border-radius: var(--dss-radius-circle);

    &--urgente { background: var(--dss-feedback-error); }
    &--alta    { background: var(--dss-hub-600); }
    &--media   { background: var(--dss-feedback-warning); }
    &--baixa   { background: var(--dss-feedback-success); }
    &--nenhuma { background: var(--dss-border-gray-500); }
  }

  &__label { color: var(--dss-text-subtle); }

  &__value {
    font-variant-numeric: tabular-nums;
    font-weight: var(--dss-font-weight-semibold);
  }
}

// ── Conteúdo de célula ────────────────────────────────────────────────────
// O que sobrou de `.gm-table`: a tabela em si (grade, cabeçalho, separadores,
// densidade, seleção) é do `DssTable`. Isto aqui é o CONTEÚDO de três células.
.gm-cell-stack {
  display: flex;
  flex-direction: column;
  line-height: var(--dss-line-height-tight);
}

.gm-cell-sub {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}

.gm-cell-inline {
  display: inline-flex;
  align-items: center;
  gap: var(--dss-spacing-1);
}

.gm-dot {
  display: inline-block;
  width: var(--dss-spacing-2);
  height: var(--dss-spacing-2);
  border-radius: var(--dss-radius-circle);

  &--urgente { background: var(--dss-feedback-error); }
}

// ── Barra de ações do fluxo — 160 × 36, gutter 20 ────────────────────────
.gm-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  // 16px entre botões de fluxo: o piso que mantém alvos de 44px visualmente
  // separados. Abaixo disso dois botões adjacentes começam a ler como um só.
  gap: var(--dss-spacing-4);
  padding-top: var(--dss-spacing-1);

  &__btn {
    min-width: var(--dss-spacing-40);
  }
}

// ── Responsividade ────────────────────────────────────────────────────────
@media (max-width: 1439px) {
  .gm-band {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
