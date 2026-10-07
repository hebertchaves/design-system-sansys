<template>
  <PlaygroundLayout
    title="DssDialog — Playground"
    code="composed/DssDialog"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. As três regiões ──────────────────────────────────────────── -->
    <PgSection
      id="regioes" index="01" title="As três regiões" :count="4"
      desc="O DssDialog entrega header, corpo e footer — e nada mais. O que entra em cada um é do consumidor: o componente não tem prop de título, de ícone de fechar nem de botão de ação. Header e footer só existem no DOM quando o slot é fornecido, e isso é acessibilidade, não economia: overlay sem título não pode renderizar um cabeçalho vazio que o leitor de tela anuncia como região sem conteúdo."
    >
      <PgGrid>
        <PgTile v-for="r in REGIOES" :key="r.code" :code="r.code" align="start">
          <DssButton :label="r.rotulo" variant="outline" size="sm" @click="abrir(r.chave)" />
          <DssDialog v-model:open="aberto[r.chave]">
            <template v-if="r.header" #header>
              <h4 class="dg-titulo">Título do overlay</h4>
              <DssButton icon="close" variant="flat" size="sm" round aria-label="Fechar" @click="aberto[r.chave] = false" />
            </template>
            <p class="dg-corpo">Corpo do overlay — o único slot sempre presente.</p>
            <template v-if="r.footer" #footer>
              <DssButton label="Cancelar" variant="flat" size="sm" @click="aberto[r.chave] = false" />
              <DssButton label="Confirmar" color="primary" size="sm" @click="aberto[r.chave] = false" />
            </template>
          </DssDialog>
        </PgTile>
      </PgGrid>
      <p class="dg-nota dg-nota--bloco">
        Regiões presentes no último overlay aberto: <strong>{{ regioesMedidas || '—' }}</strong>
      </p>
    </PgSection>

    <!-- ── 02. Geometria e posição ──────────────────────────────────────── -->
    <PgSection
      id="geometria" index="02" title="Geometria e posição" :count="GEOMETRIAS.length"
      desc="O overlay não tem prop de largura: ele abre no mínimo de 280px e cresce com o conteúdo até 90vw. maximized, fullWidth e fullHeight são degraus sobre isso; position tira o overlay do centro. A folha inferior é position=&quot;bottom&quot; com fullWidth — não é um componente à parte. Abra cada um e confira a largura medida."
    >
      <PgGrid>
        <PgTile v-for="g in GEOMETRIAS" :key="g.code" :code="g.code" align="start">
          <DssButton :label="g.code" variant="outline" size="sm" @click="abrirGeometria(g)" />
          <DssDialog v-model:open="aberto[g.chave]" v-bind="g.props">
            <template #header>
              <h4 class="dg-titulo">{{ g.code }}</h4>
              <DssButton icon="close" variant="flat" size="sm" round aria-label="Fechar" @click="aberto[g.chave] = false" />
            </template>
            <p class="dg-corpo">Conteúdo curto, para a caixa mostrar a própria geometria.</p>
            <template #footer>
              <DssButton label="Fechar" variant="flat" size="sm" @click="aberto[g.chave] = false" />
            </template>
          </DssDialog>
          <p v-if="medidas[g.chave]" class="dg-nota">
            medido: <strong>{{ medidas[g.chave] }}</strong>
          </p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Risco 2.1 — a marca do overlay é do DOCUMENTO ───────────── -->
    <PgSection
      id="teleporte" index="03" title="Risco 2.1 — a marca do overlay é do DOCUMENTO" :count="2"
      desc="O conteúdo do overlay é teleportado para fora da árvore: a cascata de CSS que carrega a marca não chega lá por herança. É o risco 2.1 do guia de Fase 3, e o DssDialog mitiga repassando a marca explicitamente ao nó teleportado — mas a marca que ele repassa é a do DOCUMENTO (data-brand no &lt;body&gt; ou no &lt;html&gt;), nunca a do ancestral do gatilho. A norma está no useTeleportedBrand: quem monta a aplicação põe a marca no &lt;body&gt;. O segundo tile mede a consequência disso, que é uma armadilha real em página de marca mista."
    >
      <PgGrid>
        <PgTile code="norma — data-brand no &lt;body&gt;" align="start">
          <div class="dg-linha">
            <DssButton
              v-for="b in BRANDS" :key="b"
              :label="b" variant="outline" size="sm"
              @click="abrirComMarcaDoDocumento(b)"
            />
          </div>
          <DssDialog v-model:open="aberto.marcaDoc">
            <template #header><h4 class="dg-titulo">Marca do documento</h4></template>
            <p class="dg-corpo">O nó teleportado recebe a marca que está no &lt;body&gt;.</p>
            <template #footer>
              <DssButton label="Confirmar" color="primary" size="sm" @click="aberto.marcaDoc = false" />
            </template>
          </DssDialog>
          <p v-if="medicaoDoc" class="dg-nota">
            &lt;body data-brand="{{ medicaoDoc.body }}"&gt; → nó teleportado
            <code>data-brand="{{ medicaoDoc.atributo }}"</code><br>
            botão do footer: <strong>{{ medicaoDoc.cor }}</strong>
            <span :class="medicaoDoc.confere ? 'dg-ok' : 'dg-alerta'">
              — {{ medicaoDoc.confere ? 'a marca atravessou o teleporte' : 'DIVERGÊNCIA' }}
            </span>
          </p>
        </PgTile>

        <PgTile code="ancestral local — NÃO manda" align="start">
          <div data-brand="waste">
            <DssButton label="Abrir de dentro de [data-brand=&quot;waste&quot;]" variant="outline" size="sm" @click="abrirDeAncestralLocal()" />
            <DssDialog v-model:open="aberto.marcaLocal">
              <template #header><h4 class="dg-titulo">Ancestral local</h4></template>
              <p class="dg-corpo">O gatilho vive em waste. O overlay, não necessariamente.</p>
              <template #footer>
                <DssButton label="Confirmar" color="primary" size="sm" @click="aberto.marcaLocal = false" />
              </template>
            </DssDialog>
          </div>
          <p v-if="medicaoLocal" class="dg-nota">
            &lt;body&gt; sem marca → o fallback escolheu
            <code>{{ medicaoLocal.escolhido }}</code><br>
            nó teleportado: <code>data-brand="{{ medicaoLocal.atributo }}"</code> · botão do
            footer: <strong>{{ medicaoLocal.cor }}</strong><br>
            <span class="dg-alerta">
              Quem decidiu foi a ORDEM no documento, não o ancestral do gatilho. Aqui os dois
              coincidem porque este bloco é o primeiro <code>[data-brand]</code> da página —
              numa tela de marca mista, não coincidiriam.
            </span>
          </p>
        </PgTile>
      </PgGrid>
      <p class="dg-nota dg-nota--bloco">
        <strong>A regra, e a armadilha.</strong> O <code>useTeleportedBrand</code> resolve em
        duas etapas: primeiro o caminho normativo — <code>data-brand</code> no
        <code>&lt;body&gt;</code> ou no <code>&lt;html&gt;</code> —, e, na falta dele, o
        <em>fallback</em> legado: o <strong>primeiro</strong> elemento com
        <code>[data-brand]</code> do documento inteiro. Numa tela Sansys isso é sempre certo,
        porque a página toda tem uma marca só. Em página de marca MISTA é armadilha: todo
        overlay sai com a marca do primeiro bloco do DOM, não com a do bloco que o abriu — e
        sem um aviso sequer. Se a sua tela mistura marcas, ponha a marca no
        <code>&lt;body&gt;</code> antes de abrir o overlay.
      </p>
    </PgSection>

    <!-- ── 04. Risco 2.2 — quem é dono do scroll ────────────────────────── -->
    <PgSection
      id="scroll" index="04" title="Risco 2.2 — quem é dono do scroll" :count="2"
      desc="Aninhar container dentro de container produz barra de rolagem dupla quando ninguém declara quem rola. A resposta do DssDialog precisa ficar escrita: quem rola é o CORPO — o header e o footer ficam parados, e a tabela não declara altura própria. Repare na diferença entre os dois: `hide-bottom` esconde a RÉGUA de paginação, não a paginação. A tabela longa só renderiza as 60 linhas porque recebe `:pagination=&quot;{ rowsPerPage: 0 }&quot;`; sem isso ela mostraria 5 e o overlay pareceria caber."
    >
      <PgGrid>
        <PgTile code="tabela curta — não rola" align="start">
          <DssButton label="Abrir (4 linhas)" variant="outline" size="sm" @click="abrir('tabelaCurta')" />
          <DssDialog v-model:open="aberto.tabelaCurta">
            <template #header>
              <h4 class="dg-titulo">Solicitações</h4>
              <DssButton icon="close" variant="flat" size="sm" round aria-label="Fechar" @click="aberto.tabelaCurta = false" />
            </template>
            <DssTable :rows="LINHAS.slice(0, 4)" :columns="COLUNAS" row-key="protocolo" density="compact" flat hide-bottom />
            <template #footer>
              <DssButton label="Fechar" variant="flat" size="sm" @click="aberto.tabelaCurta = false" />
            </template>
          </DssDialog>
        </PgTile>
        <PgTile code="tabela longa — o CORPO rola" align="start">
          <DssButton label="Abrir (60 linhas)" variant="outline" size="sm" @click="abrir('tabelaLonga')" />
          <DssDialog v-model:open="aberto.tabelaLonga">
            <template #header>
              <h4 class="dg-titulo">Solicitações do período</h4>
              <DssButton icon="close" variant="flat" size="sm" round aria-label="Fechar" @click="aberto.tabelaLonga = false" />
            </template>
            <DssTable
              :rows="LINHAS" :columns="COLUNAS" row-key="protocolo"
              density="compact" flat hide-bottom
              :rows-per-page-options="[0]"
              :pagination="{ rowsPerPage: 0 }"
            />
            <template #footer>
              <DssButton label="Fechar" variant="flat" size="sm" @click="aberto.tabelaLonga = false" />
            </template>
          </DssDialog>
        </PgTile>
      </PgGrid>
      <p v-if="scrollMedido" class="dg-nota dg-nota--bloco">
        Medido no último overlay aberto — {{ scrollMedido }}
      </p>
    </PgSection>

    <!-- ── 05. Formulário dentro do overlay ─────────────────────────────── -->
    <PgSection
      id="formulario" index="05" title="Formulário dentro do overlay" :count="1"
      desc="O aninhamento que o DssDialog existe para hospedar, e que prova duas coisas de uma vez. Primeira: o botão de salvar mora no FOOTER, fora do &lt;form&gt; — não existe type=&quot;submit&quot; que o alcance, então ele submete pela API imperativa do DssForm. Segunda: a validação do formulário funciona DEPOIS do teleporte. O provide/inject do Vue atravessa o teleport porque ele segue a árvore de componentes, não a do DOM — e é isso que o veredito abaixo mede, em vez de supor."
    >
      <PgGrid>
        <PgTile code="DssForm no corpo, ações no footer" align="start">
          <DssButton label="Abrir formulário" color="primary" size="sm" @click="abrir('formulario')" />
          <DssDialog v-model:open="aberto.formulario" persistent>
            <template #header>
              <h4 class="dg-titulo">Editar cadastro</h4>
            </template>
            <DssForm ref="formularioRef">
              <DssInput v-model="cadastro.nome" label="Nome completo" :rules="[(v) => !!v || 'Nome é obrigatório']" />
              <DssSelect v-model="cadastro.perfil" label="Perfil" :options="PERFIS" :rules="[(v) => !!v || 'Selecione um perfil']" />
              <DssCheckbox v-model="cadastro.aceite" label="Confirmo os dados" :rules="[(v) => v === true || 'É preciso confirmar']" />
            </DssForm>
            <template #footer>
              <DssButton label="Cancelar" variant="flat" size="sm" @click="aberto.formulario = false" />
              <DssButton label="Salvar" color="primary" size="sm" @click="salvarDeFora" />
            </template>
          </DssDialog>
          <p v-if="vereditoFormulario" class="dg-nota">
            <code>formularioRef.validate()</code> através do teleporte →
            <strong :class="vereditoFormulario === 'false' ? 'dg-ok' : 'dg-alerta'">{{ vereditoFormulario }}</strong>
            <template v-if="vereditoFormulario === 'false'"> — as regras alcançaram os campos</template>
          </p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Risco 2.3 — saída por teclado ────────────────────────────── -->
    <PgSection
      id="teclado" index="06" title="Risco 2.3 — saída por teclado" :count="2"
      desc="Modal do qual não se sai é armadilha de teclado (WCAG 2.1.2). Por padrão o ESC fecha. persistent e disableEsc desligam isso de propósito — para fluxo que exige decisão explícita — e passam a EXIGIR que o footer ofereça a saída. Um overlay persistente sem cancelar no footer é defeito de acessibilidade, não escolha de produto."
    >
      <PgGrid>
        <PgTile code="padrão — ESC fecha" align="start">
          <DssButton label="Abrir e apertar ESC" variant="outline" size="sm" @click="abrir('escSim')" />
          <DssDialog v-model:open="aberto.escSim">
            <template #header><h4 class="dg-titulo">ESC fecha este</h4></template>
            <p class="dg-corpo">Aperte ESC — o overlay some e o foco volta.</p>
          </DssDialog>
        </PgTile>
        <PgTile code="disableEsc — a saída é do footer" align="start">
          <DssButton label="Abrir sem saída por ESC" variant="outline" size="sm" @click="abrir('escNao')" />
          <DssDialog v-model:open="aberto.escNao" disable-esc>
            <template #header><h4 class="dg-titulo">ESC não fecha este</h4></template>
            <p class="dg-corpo">
              O ESC está desligado. Por isso o footer TEM de oferecer a saída — é o que
              impede que isto vire armadilha de teclado.
            </p>
            <template #footer>
              <DssButton label="Fechar" variant="flat" size="sm" @click="aberto.escNao = false" />
            </template>
          </DssDialog>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="07" title="Exemplos de uso" :count="5"
      desc="Cenários reais, vindos do DssDialog.example.vue do próprio componente."
    >
      <DssDialogExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssDialog from '@components/composed/DssDialog/DssDialog.vue'
import DssDialogExample from '@components/composed/DssDialog/DssDialog.example.vue'
import DssForm from '@components/composed/DssForm/DssForm.vue'
import DssTable from '@components/composed/DssTable/DssTable.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssInput from '@components/base/DssInput/DssInput.vue'
import DssSelect from '@components/base/DssSelect/DssSelect.vue'
import DssCheckbox from '@components/base/DssCheckbox/DssCheckbox.vue'

const BRANDS = ['hub', 'water', 'waste'] as const
const PERFIS = ['Administrador', 'Editor', 'Visualizador']

const REGIOES = [
  { chave: 'r1', code: 'só corpo', rotulo: 'Abrir', header: false, footer: false },
  { chave: 'r2', code: 'header + corpo', rotulo: 'Abrir', header: true, footer: false },
  { chave: 'r3', code: 'corpo + footer', rotulo: 'Abrir', header: false, footer: true },
  { chave: 'r4', code: 'as três regiões', rotulo: 'Abrir', header: true, footer: true },
]

const GEOMETRIAS = [
  { chave: 'g1', code: 'padrão', props: {} },
  { chave: 'g2', code: 'maximized', props: { maximized: true } },
  { chave: 'g3', code: 'fullWidth', props: { fullWidth: true } },
  { chave: 'g4', code: 'fullHeight', props: { fullHeight: true } },
  { chave: 'g5', code: 'position="top"', props: { position: 'top' as const } },
  { chave: 'g6', code: 'position="bottom" + fullWidth', props: { position: 'bottom' as const, fullWidth: true } },
]

const aberto = reactive<Record<string, boolean>>({
  r1: false, r2: false, r3: false, r4: false,
  g1: false, g2: false, g3: false, g4: false, g5: false, g6: false,
  tabelaCurta: false, tabelaLonga: false, formulario: false, escSim: false, escNao: false,
  marcaDoc: false, marcaLocal: false,
})
const medicaoDoc = ref<{ body: string; atributo: string; cor: string; confere: boolean } | null>(null)
const medicaoLocal = ref<{ atributo: string; cor: string; escolhido: string } | null>(null)
const medidas = reactive<Record<string, string>>({})
const regioesMedidas = ref('')
const scrollMedido = ref('')
const vereditoFormulario = ref('')

const cadastro = reactive({ nome: '', perfil: null as string | null, aceite: false })
const formularioRef = ref<{ validate: () => Promise<boolean> | undefined } | null>(null)

const COLUNAS = [
  { name: 'protocolo', label: 'Protocolo', field: 'protocolo', align: 'left' as const, sortable: true },
  { name: 'servico', label: 'Serviço', field: 'servico', align: 'left' as const, sortable: true },
  { name: 'situacao', label: 'Situação', field: 'situacao', align: 'left' as const },
]

const LINHAS = Array.from({ length: 60 }, (_, i) => ({
  protocolo: String(65665262 + i),
  servico: ['Religação de água', 'Aferição de hidrômetro', 'Troca de hidrômetro'][i % 3],
  situacao: ['Atrasada', 'No prazo', 'A vencer'][i % 3],
}))

/**
 * O overlay teleportado VISÍVEL — é dele que saem todas as medições.
 *
 * Dois detalhes medidos no DOM real, e não supostos:
 *  1. o QDialog NÃO é filho direto do <body> — ele teleporta para um <div>
 *     que o Quasar cria ali, então `body > .q-dialog` não casa com nada;
 *  2. pode haver mais de um `.dss-dialog` montado ao mesmo tempo. O que
 *     interessa é o que está de fato na tela, não o último do documento.
 */
function overlayNoDom(): HTMLElement | null {
  const todos = [...document.querySelectorAll<HTMLElement>('.q-dialog .dss-dialog')]
  // `offsetWidth > 0` e não `getClientRects()`: durante a transição `scale` do
  // QDialog o elemento TEM rects, só que de tamanho zero — medido no DOM real.
  const visiveis = todos.filter((el) => el.offsetWidth > 0)
  return visiveis.length ? visiveis[visiveis.length - 1] : null
}

async function esperarPintura() {
  await nextTick()
  // O QDialog anima ao entrar com `transform: scale`. Enquanto a transição
  // corre, getBoundingClientRect devolve 0×0 — o transform entra na conta.
  // Daí duas decisões: esperar a transição terminar E medir por
  // offsetWidth/offsetHeight, que é caixa de layout e ignora transform.
  await new Promise((r) => setTimeout(r, 450))
}

async function abrir(chave: string) {
  aberto[chave] = true
  await esperarPintura()
  const el = overlayNoDom()
  if (!el) return

  const regioes = ['header', 'body', 'footer'].filter((r) => el.querySelector(`.dss-dialog__${r}`))
  regioesMedidas.value = regioes.join(' · ')

  if (chave === 'tabelaCurta' || chave === 'tabelaLonga') {
    const corpo = el.querySelector<HTMLElement>('.dss-dialog__body')
    if (!corpo) return
    const rola = corpo.scrollHeight > corpo.clientHeight
    scrollMedido.value = rola
      ? `o corpo rola (${corpo.scrollHeight}px de conteúdo em ${corpo.clientHeight}px de caixa); header e footer ficam parados`
      : `o corpo NÃO precisa rolar (${corpo.scrollHeight}px cabem em ${corpo.clientHeight}px)`
  }
}

async function abrirGeometria(g: (typeof GEOMETRIAS)[number]) {
  aberto[g.chave] = true
  await esperarPintura()
  const el = overlayNoDom()
  if (!el) return
  medidas[g.chave] = `${el.offsetWidth} × ${el.offsetHeight} px`
}

/**
 * Caminho NORMATIVO: a marca vai para o <body>, que é o que o
 * `useTeleportedBrand` lê primeiro. É assim que uma aplicação Sansys faz.
 */
async function abrirComMarcaDoDocumento(b: string) {
  document.body.dataset.brand = b
  aberto.marcaDoc = true
  await esperarPintura()
  const el = overlayNoDom()
  if (!el) return
  const botao = el.querySelector<HTMLElement>('.dss-dialog__footer .dss-button')
  const atributo = el.getAttribute('data-brand') ?? '(ausente)'
  medicaoDoc.value = {
    body: b,
    atributo,
    cor: botao ? getComputedStyle(botao).backgroundColor : '(sem botão)',
    confere: atributo === b,
  }
}

/**
 * O contraponto: o gatilho vive num [data-brand] LOCAL e o <body> está limpo.
 * O composable cai no fallback legado — o primeiro [data-brand] do documento —,
 * que não tem relação nenhuma com quem abriu o overlay.
 */
async function abrirDeAncestralLocal() {
  delete document.body.dataset.brand
  aberto.marcaLocal = true
  await esperarPintura()
  const el = overlayNoDom()
  if (!el) return
  const botao = el.querySelector<HTMLElement>('.dss-dialog__footer .dss-button')
  // O elemento que o fallback de fato escolheu — é ELE que explica o resultado,
  // e não o ancestral do gatilho. Sem expor isto, uma coincidência de ordem no
  // DOM se parece com uma relação que não existe.
  const primeiro = document.querySelector<HTMLElement>('[data-brand]')
  medicaoLocal.value = {
    atributo: el.getAttribute('data-brand') ?? '(ausente)',
    cor: botao ? getComputedStyle(botao).backgroundColor : '(sem botão)',
    escolhido: primeiro
      ? `${primeiro.tagName.toLowerCase()}${primeiro.className ? '.' + String(primeiro.className).split(' ')[0] : ''}[data-brand="${primeiro.dataset.brand}"]`
      : '(nenhum no documento)',
  }
}

/**
 * O botão de salvar vive no FOOTER, fora do `<form>` — não há `type="submit"`
 * que o alcance. Submeter daqui só é possível pela API imperativa do DssForm,
 * e é essa chamada que prova que a validação atravessa o teleporte.
 */
async function salvarDeFora() {
  const valido = await formularioRef.value?.validate()
  vereditoFormulario.value = String(valido)
  if (valido) aberto.formulario = false
}

const SECTIONS = [
  { id: 'regioes',    index: '01', title: 'As três regiões' },
  { id: 'geometria',  index: '02', title: 'Geometria e posição' },
  { id: 'teleporte',  index: '03', title: 'Risco 2.1 — a marca do overlay é do DOCUMENTO' },
  { id: 'scroll',     index: '04', title: 'Risco 2.2 — quem é dono do scroll' },
  { id: 'formulario', index: '05', title: 'Formulário dentro do overlay' },
  { id: 'teclado',    index: '06', title: 'Risco 2.3 — saída por teclado' },
  { id: 'exemplos',   index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 11, label: 'Props' },
  { value: 5,  label: 'Emits' },
  { value: 3,  label: 'Slots' },
  { value: 3,  label: 'Riscos' },
]
</script>

<style scoped>
/* O título do header é do CONSUMIDOR — o DssDialog entrega a região, não a
   tipografia. Sem isto o <h4> cai na escala Material do Quasar. */
.dg-titulo {
  margin: 0;
  font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold);
  line-height: var(--dss-line-height-snug);
  color: var(--dss-text-primary);
}

.dg-corpo {
  margin: 0;
  color: var(--dss-text-body);
}

.dg-linha {
  display: flex;
  gap: var(--dss-spacing-2);
  flex-wrap: wrap;
}

.dg-nota {
  margin: var(--dss-spacing-2) 0 0;
  font-size: var(--dss-font-size-xs);
  line-height: var(--dss-line-height-relaxed);
  color: var(--dss-text-subtle);
}

.dg-nota--bloco {
  margin-top: var(--dss-spacing-4);
  font-size: var(--dss-font-size-sm);
  max-width: 76ch;
}

.dg-ok {
  color: var(--dss-feedback-success);
}

.dg-alerta {
  color: var(--dss-feedback-error);
}
</style>
