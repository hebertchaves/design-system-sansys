<template>
  <PlaygroundLayout
    title="DssSectionTitle — Playground"
    code="base/DssSectionTitle"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. A distância do traço ─────────────────────────────────────── -->
    <PgSection
      id="distancia" index="01" title="A distância do traço é medida, não arbitrada" :count="3"
      desc="O requisito é que a distância entre o texto e o traço seja MÍNIMA — e mínima não é zero. O que se mede aqui é a distância ÓTICA: do fim da TINTA do descendente (o 'g', o 'p') até o topo do traço, com a linha de base obtida por um marcador inline de altura zero. Com padding 0 o traço não encosta, mas sobra 0,5px no tamanho sm — meio pixel é colisão de subpixel na prática —, e essa folga vem só da meia-entrelinha, que encolhe junto com a fonte. O token (2px) devolve 2,5px em sm, 3px em md e 3,5px em lg: mínimo e estável. As telas atuais usam 4px, cerca do dobro do necessário. Os três tiles comparam no tamanho lg."
    >
      <PgGrid>
        <PgTile v-for="d in DISTANCIAS" :key="d.chave" :code="d.code" align="start">
          <div data-brand="water" :class="['st-amostra', `st-amostra--${d.chave}`]">
            <DssSectionTitle label="Agpq — Verificações" size="lg" :data-medida="d.chave" />
          </div>
          <p v-if="medidas[d.chave]" class="st-nota">
            {{ medidas[d.chave] }}
            <span v-if="d.chave !== 'token'" class="st-alerta">— {{ d.problema }}</span>
            <span v-else class="st-ok">— é o padrão do componente</span>
          </p>
        </PgTile>
      </PgGrid>
      <p class="st-nota st-nota--bloco">
        <DssButton label="Medir" variant="outline" size="sm" @click="medir" />
        A medição lê a distância entre o fim da <strong>tinta</strong> do descendente e o topo
        do traço — não o <code>padding</code> declarado.
      </p>
    </PgSection>

    <!-- ── 02. Nível e tamanho ──────────────────────────────────────────── -->
    <PgSection
      id="eixos" index="02" title="Nível e tamanho são eixos separados" :count="4"
      desc="level decide a TAG; size decide a APARÊNCIA. Juntar os dois numa prop só parece econômico: quem precisa de um h3 grande acaba escrevendo h1 para conseguir o tamanho, e a navegação por cabeçalhos do leitor de tela passa a mentir sobre a estrutura do documento (WCAG 1.3.1 · 2.4.6). Os quatro tiles cruzam os dois eixos — a tag medida é lida do DOM."
    >
      <PgGrid>
        <PgTile v-for="c in CRUZAMENTOS" :key="c.chave" :code="c.code" align="start">
          <div data-brand="water">
            <DssSectionTitle :level="c.level" :size="c.size" :label="c.code" :data-medida="c.chave" />
          </div>
          <p v-if="medidas[c.chave]" class="st-nota">{{ medidas[c.chave] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. O traço segue a marca ────────────────────────────────────── -->
    <PgSection
      id="marca" index="03" title="O traço segue a marca" :count="6"
      desc="accent=&quot;brand&quot; consome --dss-action-primary, que o [data-brand] já remapeia: numa página Sansys o traço fica na cor do produto sem ninguém passar nada. A fila de baixo usa a prop brand, que REMAPEIA o mesmo token no escopo local — nunca pinta a borda direto. A distinção é o §K5 do checklist e custou um defeito medido: o DssLinearProgress pintava o elemento do Quasar com especificidade (0,3,0) e vencia a própria regra de cor, então dentro de qualquer [data-brand] a prop color virava inerte."
    >
      <PgGrid>
        <PgTile v-for="m in MARCAS" :key="`a-${m}`" :code="`[data-brand=&quot;${m}&quot;] ancestral`" align="start">
          <div :data-brand="m">
            <DssSectionTitle :label="`Seção ${m}`" :data-medida="`anc-${m}`" />
          </div>
          <p v-if="medidas[`anc-${m}`]" class="st-nota">{{ medidas[`anc-${m}`] }}</p>
        </PgTile>
        <PgTile v-for="m in MARCAS" :key="`p-${m}`" :code="`prop brand=&quot;${m}&quot;`" align="start">
          <DssSectionTitle :brand="m" :label="`Seção ${m}`" :data-medida="`prop-${m}`" />
          <p v-if="medidas[`prop-${m}`]" class="st-nota">{{ medidas[`prop-${m}`] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Cores de estado ──────────────────────────────────────────── -->
    <PgSection
      id="acento" index="04" title="Cores de estado" :count="5"
      desc="A exceção nomeada: uma seção que fala de um estado — um bloco de alerta, um resultado reprovado — pode querer o traço na cor desse estado. Elas NÃO são brandeáveis, e é correto: erro é vermelho em Water, Hub e Waste, porque significado não muda com a marca. Repare que os cinco estão dentro de [data-brand=&quot;water&quot;] e só o primeiro muda de cor."
    >
      <PgGrid>
        <PgTile v-for="a in ACENTOS" :key="a" :code="`accent=&quot;${a}&quot;`" align="start">
          <div data-brand="water">
            <DssSectionTitle :accent="a" :label="a" :data-medida="`ac-${a}`" />
          </div>
          <p v-if="medidas[`ac-${a}`]" class="st-nota">{{ medidas[`ac-${a}`] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. O traço tem a largura do texto ───────────────────────────── -->
    <PgSection
      id="largura" index="05" title="O traço tem a largura do TEXTO" :count="2"
      desc="É o que diferencia um acento de marca de uma régua divisória. Um traço que atravessa o container inteiro é outra coisa — para isso existe o DssSeparator, e usar este componente ali seria usar um cabeçalho como linha. Os dois tiles têm o mesmo container; o que muda é o comprimento do texto."
    >
      <PgGrid>
        <PgTile code="título curto" align="stretch">
          <div data-brand="water" class="st-moldura">
            <DssSectionTitle label="Curto" data-medida="larg-curto" />
          </div>
          <p v-if="medidas['larg-curto']" class="st-nota">{{ medidas['larg-curto'] }}</p>
        </PgTile>
        <PgTile code="título longo" align="stretch">
          <div data-brand="water" class="st-moldura">
            <DssSectionTitle label="Um título de seção consideravelmente mais longo" data-medida="larg-longo" />
          </div>
          <p v-if="medidas['larg-longo']" class="st-nota">{{ medidas['larg-longo'] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="06" title="Exemplos de uso" :count="5"
      desc="Cenários reais, vindos do DssSectionTitle.example.vue do próprio componente."
    >
      <DssSectionTitleExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { reactive, onMounted, nextTick } from 'vue'
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssSectionTitle from '@components/base/DssSectionTitle/DssSectionTitle.vue'
import DssSectionTitleExample from '@components/base/DssSectionTitle/DssSectionTitle.example.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

const MARCAS = ['water', 'hub', 'waste'] as const
const ACENTOS = ['brand', 'info', 'success', 'warning', 'error'] as const

const DISTANCIAS = [
  { chave: 'zero', code: 'padding 0', problema: 'em sm sobra 0,5px — subpixel' },
  { chave: 'token', code: 'o token — 2px', problema: '' },
  { chave: 'folgado', code: 'padding 4px (o das telas atuais)', problema: 'afasta mais que o necessário' },
]

const CRUZAMENTOS = [
  { chave: 'x1', level: 1 as const, size: 'sm' as const, code: 'level=1 · size=sm' },
  { chave: 'x2', level: 2 as const, size: 'md' as const, code: 'level=2 · size=md' },
  { chave: 'x3', level: 3 as const, size: 'lg' as const, code: 'level=3 · size=lg' },
  { chave: 'x4', level: 4 as const, size: 'sm' as const, code: 'level=4 · size=sm' },
]

const medidas = reactive<Record<string, string>>({})

/**
 * Mede a distância entre o fim da TINTA do descendente e o topo do traço.
 *
 * Não é o `padding` declarado: entre o fim do glifo e a borda existe ainda a
 * sobra da caixa da fonte e a meia-entrelinha. O que interessa ao olho é a
 * distância ótica, e ela se calcula com a métrica real da fonte — `measureText`
 * devolve `actualBoundingBoxDescent`, que é onde a tinta termina.
 */
function medir() {
  const cv = document.createElement('canvas')
  const ctx = cv.getContext('2d')
  if (!ctx) return

  for (const el of document.querySelectorAll<HTMLElement>('[data-medida]')) {
    const chave = el.dataset.medida as string
    if (!chave || el.offsetParent === null) continue

    const cs = getComputedStyle(el)
    const caixa = el.getBoundingClientRect()

    if (chave.startsWith('x')) {
      medidas[chave] = `tag: <${el.tagName.toLowerCase()}> · fonte: ${cs.fontSize}`
      continue
    }
    if (chave.startsWith('anc-') || chave.startsWith('prop-') || chave.startsWith('ac-')) {
      medidas[chave] = `traço: ${cs.borderBottomColor}`
      continue
    }
    if (chave.startsWith('larg-')) {
      const pai = el.parentElement?.getBoundingClientRect()
      medidas[chave] = `traço: ${Math.round(caixa.width)}px · container: ${Math.round(pai?.width ?? 0)}px`
      continue
    }

    // Seção 01: a distância ÓTICA — do fim da tinta do descendente ao traço.
    //
    // A linha de base vem de um marcador inline de altura ZERO acrescentado ao
    // fim do título: o topo dele coincide com a base do texto. É o único jeito
    // confiável de achá-la — deduzir por meia-entrelinha erra, e errou: a
    // primeira versão desta sonda dizia 4,5px onde a medida real era 1,5px.
    const marca = document.createElement('span')
    marca.style.cssText = 'display:inline-block;width:0;height:0'
    el.append(marca)
    const base = marca.getBoundingClientRect().top
    marca.remove()

    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
    const m = ctx.measureText(el.textContent ?? '')
    const topoDoTraco = caixa.bottom - parseFloat(cs.borderBottomWidth)
    const distancia = topoDoTraco - (base + m.actualBoundingBoxDescent)

    medidas[chave] = `padding ${cs.paddingBottom} · do fim da tinta ao traço: ${distancia.toFixed(1)}px`
  }
}

onMounted(async () => {
  await nextTick()
  medir()
})

const SECTIONS = [
  { id: 'distancia', index: '01', title: 'A distância do traço é medida, não arbitrada' },
  { id: 'eixos',     index: '02', title: 'Nível e tamanho são eixos separados' },
  { id: 'marca',     index: '03', title: 'O traço segue a marca' },
  { id: 'acento',    index: '04', title: 'Cores de estado' },
  { id: 'largura',   index: '05', title: 'O traço tem a largura do TEXTO' },
  { id: 'exemplos',  index: '06', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 5, label: 'Props' },
  { value: 4, label: 'Níveis' },
  { value: 3, label: 'Tamanhos' },
  { value: 2, label: 'px de respiro' },
]
</script>

<style scoped>
/* Os três tiles da seção 01 forçam valores DIFERENTES do token, para a
   comparação ser visível. Fora daqui o componente usa só o token. */
.st-amostra--zero :deep(.dss-section-title) {
  padding-block-end: var(--dss-spacing-0);
}

.st-amostra--folgado :deep(.dss-section-title) {
  padding-block-end: var(--dss-spacing-1);
}

.st-moldura {
  border: var(--dss-border-width-thin) dashed var(--dss-border-default);
  padding: var(--dss-spacing-3);
}

.st-nota {
  margin: var(--dss-spacing-2) 0 0;
  font-size: var(--dss-font-size-xs);
  line-height: var(--dss-line-height-relaxed);
  color: var(--dss-text-subtle);
}

.st-nota--bloco {
  margin-top: var(--dss-spacing-4);
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
  flex-wrap: wrap;
  font-size: var(--dss-font-size-sm);
  max-width: 76ch;
}

.st-ok {
  color: var(--dss-feedback-success);
  font-weight: var(--dss-font-weight-semibold);
}

.st-alerta {
  color: var(--dss-feedback-warning);
  font-weight: var(--dss-font-weight-semibold);
}
</style>
