<template>
  <PlaygroundLayout
    title="DssAvatar — Playground"
    code="base/DssAvatar"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Conteúdo ────────────────────────────────────────────────── -->
    <PgSection id="conteudo" index="01" title="Conteúdo" :count="4"
      desc="Três formas de preencher o avatar: iniciais ou imagem pelo slot default, ou a prop icon. As duas vias são EXCLUDENTES — com `icon` definido o slot não é renderizado (o template só monta o conteúdo do slot quando não há ícone).">
      <PgGrid>
        <PgTile align="start" code="slot: iniciais">
          <DssAvatar color="primary">JD</DssAvatar>
        </PgTile>
        <PgTile align="start" code="icon=&quot;person&quot;">
          <DssAvatar color="primary" icon="person" />
        </PgTile>
        <PgTile align="start" code="slot: &lt;img&gt;">
          <DssAvatar aria-label="Foto de Maria Kim"><img :src="FOTO" alt="" /></DssAvatar>
        </PgTile>
        <PgTile align="start" code="icon + slot → só o ícone">
          <DssAvatar color="primary" icon="person">JD</DssAvatar>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Tamanhos ────────────────────────────────────────────────── -->
    <PgSection id="tamanhos" index="02" title="Tamanhos" :count="SIZES.length * 2"
      desc="Prop size — xs, sm, md (default), lg, xl. As dimensões abaixo de cada avatar são MEDIDAS do DOM, não escritas à mão: se o token mudar, o número muda junto.">
      <div class="pg-matrix">
        <div class="pg-matrix-row">
          <div class="pg-matrix-row__label">iniciais</div>
          <div class="pg-matrix-row__items pg-matrix-row__items--intrinsic av-linha">
            <div v-for="s in SIZES" :key="s" class="av-medido">
              <DssAvatar :size="s" color="primary" :data-medida="`ini-${s}`">{{ s.toUpperCase() }}</DssAvatar>
              <small>{{ s }}<template v-if="medidas[`ini-${s}`]"> · {{ medidas[`ini-${s}`] }}</template></small>
            </div>
          </div>
        </div>
        <div class="pg-matrix-row">
          <div class="pg-matrix-row__label">ícone</div>
          <div class="pg-matrix-row__items pg-matrix-row__items--intrinsic av-linha">
            <div v-for="s in SIZES" :key="s" class="av-medido">
              <DssAvatar :size="s" color="secondary" icon="person" :data-medida="`ico-${s}`" />
              <small>{{ s }}<template v-if="medidas[`ico-${s}`]"> · {{ medidas[`ico-${s}`] }}</template></small>
            </div>
          </div>
        </div>
      </div>
    </PgSection>

    <!-- ── 03. Tamanho livre ───────────────────────────────────────────── -->
    <PgSection id="tamanho-livre" index="03" title="Tamanho e fonte livres" :count="6"
      desc="size também aceita qualquer comprimento CSS, e fontSize ajusta o conteúdo sem mexer na caixa. É a saída para o caso que a escala não cobre — o caminho normal é o enum, que vem de token.">
      <PgGrid>
        <PgTile align="start" v-for="s in CUSTOM_SIZES" :key="s" :code="`size=&quot;${s}&quot;`">
          <DssAvatar :size="s" color="accent">AB</DssAvatar>
        </PgTile>
        <PgTile align="start" v-for="f in FONT_SIZES" :key="f" :code="`size=&quot;lg&quot; font-size=&quot;${f}&quot;`">
          <DssAvatar size="lg" :font-size="f" color="accent">AB</DssAvatar>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Cores ───────────────────────────────────────────────────── -->
    <PgSection id="cores" index="04" title="Cores Semânticas" :count="COLORS.length"
      desc="Prop color — pinta o fundo pela classe utilitária bg-* (a cor não mora no SCSS do componente) e põe o texto em branco. O default é primary: avatar sem a prop já nasce pintado.">
      <PgGrid>
        <PgTile align="start" v-for="c in COLORS" :key="c" :code="`color=&quot;${c}&quot;`">
          <DssAvatar :color="c">{{ iniciais(c) }}</DssAvatar>
        </PgTile>
        <PgTile align="start" code="sem a prop (= primary)">
          <DssAvatar>JD</DssAvatar>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Cor do texto ────────────────────────────────────────────── -->
    <PgSection id="texto" index="05" title="Cor do texto" :count="TEXT_COLORS.length"
      desc="textColor acrescenta a classe text-* por cima do branco padrão. O contraste passa a ser responsabilidade de quem escolhe o par — o componente não valida a combinação.">
      <PgGrid>
        <PgTile align="start" v-for="t in TEXT_COLORS" :key="t.text" :code="`color=&quot;${t.bg}&quot; text-color=&quot;${t.text}&quot;`">
          <DssAvatar :color="t.bg" :text-color="t.text">Aa</DssAvatar>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Forma ───────────────────────────────────────────────────── -->
    <PgSection id="forma" index="06" title="Forma" :count="6"
      desc="Circular por padrão; square e rounded mudam o raio. square costuma servir a logo de empresa, onde o círculo cortaria a marca.">
      <div class="pg-matrix">
        <div v-for="f in FORMAS" :key="f.code" class="pg-matrix-row">
          <div class="pg-matrix-row__label">{{ f.code }}</div>
          <div class="pg-matrix-row__items pg-matrix-row__items--intrinsic av-linha">
            <DssAvatar v-bind="f.props" size="lg" color="primary">JD</DssAvatar>
            <DssAvatar v-bind="f.props" size="lg" color="secondary" icon="business" />
          </div>
        </div>
      </div>
    </PgSection>

    <!-- ── 07. Status ──────────────────────────────────────────────────── -->
    <PgSection id="status" index="07" title="Status" :count="STATUSES.length * 2"
      desc="Prop status — online, away, busy, offline. O indicador é um elemento próprio com aria-label (`Status: online`), não só uma cor: quem não vê a bolinha ainda recebe o estado.">
      <div class="pg-matrix">
        <div class="pg-matrix-row">
          <div class="pg-matrix-row__label">iniciais</div>
          <div class="pg-matrix-row__items pg-matrix-row__items--intrinsic av-linha">
            <div v-for="s in STATUSES" :key="s" class="av-medido">
              <DssAvatar :status="s" size="lg" color="primary">JD</DssAvatar>
              <small>{{ s }}</small>
            </div>
          </div>
        </div>
        <div class="pg-matrix-row">
          <div class="pg-matrix-row__label">por tamanho</div>
          <div class="pg-matrix-row__items pg-matrix-row__items--intrinsic av-linha">
            <div v-for="s in SIZES" :key="s" class="av-medido">
              <DssAvatar status="online" :size="s" color="secondary" icon="person" />
              <small>{{ s }}</small>
            </div>
          </div>
        </div>
      </div>
    </PgSection>

    <!-- ── 08. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="08" title="Brandabilidade" :count="BRAND_KEYS.length * 2"
      desc="A prop brand escreve [data-brand] no próprio avatar; as pílulas do topo escrevem no ancestral. São os dois caminhos da mesma marca. Linha de cima: prop brand. Linha de baixo: sem prop — só reage às pílulas do topo.">
      <div class="pg-matrix">
        <div class="pg-matrix-row">
          <div class="pg-matrix-row__label">prop brand</div>
          <div class="pg-matrix-row__items pg-matrix-row__items--intrinsic av-linha">
            <div v-for="b in BRAND_KEYS" :key="b" class="av-medido">
              <DssAvatar :brand="b" size="lg" icon="person" />
              <small>brand="{{ b }}"</small>
            </div>
            <div v-for="b in BRAND_KEYS" :key="`c-${b}`" class="av-medido">
              <DssAvatar :brand="b" size="lg" color="primary">{{ b.slice(0, 2).toUpperCase() }}</DssAvatar>
              <small>{{ b }} + primary</small>
            </div>
          </div>
        </div>
        <div class="pg-matrix-row">
          <div class="pg-matrix-row__label">só o topo</div>
          <div class="pg-matrix-row__items pg-matrix-row__items--intrinsic av-linha">
            <DssAvatar size="lg" icon="person" />
            <DssAvatar size="lg" color="primary">JD</DssAvatar>
            <DssAvatar size="lg" color="positive">OK</DssAvatar>
            <DssAvatar size="lg" color="primary" status="online">JD</DssAvatar>
          </div>
        </div>
      </div>
    </PgSection>

    <!-- ── 09. Acessibilidade ──────────────────────────────────────────── -->
    <PgSection id="a11y" index="09" title="Acessibilidade" :count="3"
      desc="Com ariaLabel o avatar vira role=&quot;img&quot; nomeado; sem ele, não tem papel e o leitor de tela lê o conteúdo cru (as iniciais, letra a letra). Os atributos abaixo são lidos do DOM. O evento click é emitido sempre, mas o avatar é um &lt;div&gt; sem tabindex: não entra na ordem de tabulação nem responde a Enter. Os estados de hover/foco do CSS só valem para button.dss-avatar, a.dss-avatar ou role=&quot;button&quot; — ação de verdade pede um desses.">
      <PgGrid>
        <PgTile align="start" :code="a11y.semLabel || 'sem aria-label'">
          <DssAvatar color="primary" data-a11y="semLabel">JD</DssAvatar>
        </PgTile>
        <PgTile align="start" :code="a11y.comLabel || 'aria-label'">
          <DssAvatar color="primary" aria-label="Avatar de João Dias" data-a11y="comLabel">JD</DssAvatar>
        </PgTile>
        <PgTile align="start" :code="`@click · cliques: ${cliques}`">
          <DssAvatar color="secondary" aria-label="Alice Brown" @click="cliques++">AB</DssAvatar>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 10. Grupo ───────────────────────────────────────────────────── -->
    <PgSection id="grupo" index="10" title="Grupo" :count="3"
      desc="A classe .dss-avatar-group (do próprio CSS do componente) sobrepõe os avatares e dá a cada um a borda da superfície, para o recorte entre eles continuar legível. Não há componente DssAvatarGroup — é um wrapper de classe.">
      <PgGrid :cols="1">
        <PgTile align="start" code=".dss-avatar-group">
          <div class="dss-avatar-group">
            <DssAvatar v-for="p in PESSOAS.slice(0, 4)" :key="p.ini" :color="p.cor">{{ p.ini }}</DssAvatar>
            <DssAvatar color="info">+5</DssAvatar>
          </div>
        </PgTile>
        <PgTile align="start" code=".dss-avatar-group + status">
          <div class="dss-avatar-group">
            <DssAvatar v-for="p in PESSOAS.slice(0, 4)" :key="p.ini" :color="p.cor" :status="p.status">{{ p.ini }}</DssAvatar>
          </div>
        </PgTile>
        <PgTile align="start" code=".dss-avatar-group · 12 avatares">
          <div class="dss-avatar-group">
            <DssAvatar v-for="i in 12" :key="i" :color="COLORS[i % COLORS.length]" size="sm">{{ i }}</DssAvatar>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 11. Em contexto ─────────────────────────────────────────────── -->
    <PgSection id="contexto" index="11" title="Em contexto" :count="PESSOAS.length"
      desc="O uso mais comum: avatar à esquerda de nome e papel, com status. O avatar leva aria-label com o estado por extenso — o nome ao lado já identifica a pessoa, o que faltava ao leitor de tela era o status.">
      <PgGrid :cols="1">
        <PgTile align="stretch" code="lista de usuários">
          <ul class="av-lista">
            <li v-for="p in PESSOAS" :key="p.ini" class="av-lista__item">
              <DssAvatar :color="p.cor" :status="p.status" :aria-label="`${p.nome} — ${p.status}`">{{ p.ini }}</DssAvatar>
              <div class="av-lista__texto">
                <strong>{{ p.nome }}</strong>
                <span>{{ p.papel }}</span>
              </div>
            </li>
          </ul>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 12. Exemplos de uso (.example.vue como fonte) ───────────────── -->
    <PgSection id="exemplos" index="12" title="Exemplos de uso" :count="1"
      desc="Composições reais do DssAvatar.example.vue — fonte única, também usável na documentação.">
      <DssAvatarExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssAvatar from '@components/base/DssAvatar/DssAvatar.vue'
import DssAvatarExample from '@components/base/DssAvatar/DssAvatar.example.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssAvatar (vide types/avatar.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const COLORS = [
  'primary', 'secondary', 'tertiary', 'accent',
  'positive', 'negative', 'warning', 'info',
] as const
const STATUSES = ['online', 'away', 'busy', 'offline'] as const
const BRAND_KEYS = ['hub', 'water', 'waste'] as const

const CUSTOM_SIZES = ['3rem', '72px', '4em']
const FONT_SIZES = ['12px', '20px', '28px']

const TEXT_COLORS = [
  { bg: 'primary' as const, text: 'white' },
  { bg: 'warning' as const, text: 'black' },
  { bg: 'accent' as const, text: 'negative' },
]

const FORMAS = [
  { code: 'circular (padrão)', props: {} },
  { code: 'square', props: { square: true } },
  { code: 'rounded', props: { rounded: true } },
]

const PESSOAS = [
  { ini: 'JD', nome: 'João Dias', papel: 'Administrador', cor: 'primary' as const, status: 'online' as const },
  { ini: 'AB', nome: 'Alice Brown', papel: 'Operadora', cor: 'secondary' as const, status: 'away' as const },
  { ini: 'MK', nome: 'Maria Kim', papel: 'Analista', cor: 'accent' as const, status: 'busy' as const },
  { ini: 'RS', nome: 'Rui Souza', papel: 'Leitura de campo', cor: 'positive' as const, status: 'offline' as const },
]

// Foto de demonstração embutida: a página não pode depender de rede para
// mostrar o caso "imagem no slot".
const FOTO = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#c9d6e2"/><circle cx="32" cy="25" r="12" fill="#6b8299"/><path d="M8 64c2-16 12-24 24-24s22 8 24 24z" fill="#6b8299"/></svg>'
)

const SECTIONS = [
  { id: 'conteudo',      index: '01', title: 'Conteúdo' },
  { id: 'tamanhos',      index: '02', title: 'Tamanhos' },
  { id: 'tamanho-livre', index: '03', title: 'Tamanho e fonte livres' },
  { id: 'cores',         index: '04', title: 'Cores Semânticas' },
  { id: 'texto',         index: '05', title: 'Cor do texto' },
  { id: 'forma',         index: '06', title: 'Forma' },
  { id: 'status',        index: '07', title: 'Status' },
  { id: 'brand',         index: '08', title: 'Brandabilidade' },
  { id: 'a11y',          index: '09', title: 'Acessibilidade' },
  { id: 'grupo',         index: '10', title: 'Grupo' },
  { id: 'contexto',      index: '11', title: 'Em contexto' },
  { id: 'exemplos',      index: '12', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: SIZES.length,      label: 'Tamanhos' },
  { value: COLORS.length,     label: 'Cores' },
  { value: STATUSES.length,   label: 'Status' },
  { value: BRAND_KEYS.length, label: 'Brands' },
]

const cliques = ref(0)
const iniciais = (c: string) => c.slice(0, 2).toUpperCase()

// Dimensões e atributos de a11y saem do DOM. `offsetParent === null` pula o que
// está oculto — a casca mantém as seções montadas com v-show enquanto mostra o
// Preview Frame, e medir ali devolveria zero em tudo.
const medidas = reactive<Record<string, string>>({})
const a11y = reactive<Record<string, string>>({})

function medir() {
  for (const el of document.querySelectorAll<HTMLElement>('[data-medida]')) {
    if (el.offsetParent === null) continue
    const r = el.getBoundingClientRect()
    medidas[el.dataset.medida as string] = `${Math.round(r.width)}×${Math.round(r.height)}px`
  }
  for (const el of document.querySelectorAll<HTMLElement>('[data-a11y]')) {
    if (el.offsetParent === null) continue
    const role = el.getAttribute('role')
    const label = el.getAttribute('aria-label')
    a11y[el.dataset.a11y as string] = role ? `role="${role}" aria-label="${label}"` : 'sem role, sem aria-label'
  }
}

// A página ABRE no Preview Frame, com as seções ocultas: medir só no mount
// não acharia nada. O ResizeObserver dispara quando o avatar sai de `display:
// none` (0×0) para o tamanho real — isto é, quando as seções aparecem.
let observador: ResizeObserver | null = null
onMounted(() => {
  const alvo = document.querySelector('[data-medida]')
  if (!alvo) return
  observador = new ResizeObserver(medir)
  observador.observe(alvo)
})
onBeforeUnmount(() => observador?.disconnect())
</script>

<style scoped>
.av-linha {
  align-items: flex-end;
  gap: var(--dss-spacing-5);
}

.av-medido {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dss-spacing-2);
}

.av-medido small {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  white-space: nowrap;
}

.av-lista {
  list-style: none;
  margin: var(--dss-spacing-0);
  padding: var(--dss-spacing-0);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}

.av-lista__item {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
}

.av-lista__texto {
  display: flex;
  flex-direction: column;
  line-height: var(--dss-line-height-tight);
}

.av-lista__texto strong {
  color: var(--dss-text-body);
}

.av-lista__texto span {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
}
</style>
