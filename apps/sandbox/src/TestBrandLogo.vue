<template>
  <PlaygroundLayout
    title="DssBrandLogo — Playground"
    code="base/DssBrandLogo"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. As três marcas ───────────────────────────────────────────── -->
    <PgSection
      id="marcas" index="01" title="As três marcas" :count="3"
      desc="Water, Hub e Waste. O que muda entre elas é o DESENHO, não só o matiz — e isso é acessibilidade, não estética: marca distinguível só por cor some no alto contraste e na impressão em preto e branco (WCAG 1.4.1). Repare que as proporções diferem, e é por isso que quem manda no tamanho é a altura."
    >
      <PgGrid>
        <PgTile v-for="m in MARCAS" :key="m" :code="`brand=&quot;${m}&quot;`" align="center">
          <DssBrandLogo :brand="m" size="lg" :data-medida="`marca-${m}`" />
          <p v-if="medidas[`marca-${m}`]" class="bl-nota">{{ medidas[`marca-${m}`] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. A cor é de quem hospeda ──────────────────────────────────── -->
    <PgSection
      id="cor" index="02" title="A cor é de quem hospeda" :count="4"
      desc="É a decisão central do componente: não existe prop de cor. O logo declara fill: currentColor e nada mais. Os quatro tiles abaixo têm o MESMO &lt;DssBrandLogo brand=&quot;water&quot; /&gt; — nenhum recebe cor. O que muda é o contexto, e o logo acompanha. Uma prop de cor prenderia o desenho a um valor e quebraria justamente o caso mais comum no Sansys, que é o logo sobre a barra colorida da marca."
    >
      <PgGrid>
        <PgTile v-for="c in CONTEXTOS" :key="c.chave" :code="c.code" align="stretch">
          <div :class="['bl-ctx', `bl-ctx--${c.chave}`]">
            <DssBrandLogo brand="water" size="md" :data-medida="`cor-${c.chave}`" />
          </div>
          <p v-if="medidas[`cor-${c.chave}`]" class="bl-nota">
            fill resolvido: <strong>{{ medidas[`cor-${c.chave}`] }}</strong>
          </p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Tamanhos ─────────────────────────────────────────────────── -->
    <PgSection
      id="tamanhos" index="03" title="Tamanhos" :count="TAMANHOS.length"
      desc="Quatro degraus, e cada um sai de um contexto real onde a marca aparece: rail retraído, app bar de 40px do grid master, header de 64px, tela de abertura. Quem manda é a ALTURA — os três desenhos têm proporções diferentes (154×42, 120×42, 156×42), então fixar largura deformaria dois dos três. A largura medida abaixo é consequência, não escolha."
    >
      <PgGrid>
        <PgTile v-for="t in TAMANHOS" :key="t" :code="`size=&quot;${t}&quot;`" align="center">
          <DssBrandLogo brand="hub" :size="t" :data-medida="`tam-${t}`" />
          <p v-if="medidas[`tam-${t}`]" class="bl-nota">{{ medidas[`tam-${t}`] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Recorte do desenho ───────────────────────────────────────── -->
    <PgSection
      id="recorte" index="04" title="Recorte do desenho" :count="3"
      desc="O recorte filtra os paths pelo papel que cada um tem no desenho: símbolo ou nome. É filtro de DOM, não de CSS — por isso vive em JS. icon serve ao rail retraído; wordmark, a quando o símbolo já aparece ao lado."
    >
      <PgGrid>
        <PgTile v-for="v in RECORTES" :key="v" :code="`variant=&quot;${v}&quot;`" align="center">
          <DssBrandLogo brand="waste" :variant="v" size="lg" :data-medida="`rec-${v}`" />
          <p v-if="medidas[`rec-${v}`]" class="bl-nota">{{ medidas[`rec-${v}`] }}</p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. A marca vem do ancestral mais PRÓXIMO ────────────────────── -->
    <PgSection
      id="heranca" index="05" title="A marca vem do ancestral mais PRÓXIMO" :count="2"
      desc="A marca decide quais &lt;path&gt; existem no DOM, e CSS não troca o d de um path. Por isso esta é a única faceta da brandabilidade do DSS que NÃO sai por cascata: é resolvida em JS, pela prop ou pelo [data-brand] mais próximo. O 'mais próximo' é deliberado, e é onde este componente difere do DssDialog: lá o conteúdo é teleportado para fora da árvore e herda a marca do DOCUMENTO; aqui o logo vive na árvore, e quem está mais perto manda. O segundo tile aninha marcas para mostrar a diferença."
    >
      <PgGrid>
        <PgTile code="sem prop — herda do pai" align="center">
          <div class="bl-linha">
            <div v-for="m in MARCAS" :key="m" :data-brand="m" class="bl-heranca">
              <DssBrandLogo size="md" :data-medida="`her-${m}`" />
              <code>[data-brand="{{ m }}"]</code>
            </div>
          </div>
        </PgTile>
        <PgTile code="aninhado — o mais próximo vence" align="center">
          <div data-brand="hub" class="bl-aninhado">
            <code>externo: hub</code>
            <div data-brand="waste" class="bl-aninhado bl-aninhado--interno">
              <code>interno: waste</code>
              <DssBrandLogo size="md" data-medida="aninhado" />
            </div>
          </div>
          <p v-if="medidas.aninhado" class="bl-nota">
            desenhou: <strong>{{ medidas.aninhado }}</strong>
            <span :class="/waste/.test(medidas.aninhado) ? 'bl-ok' : 'bl-alerta'">
              — {{ /waste/.test(medidas.aninhado) ? 'o mais próximo venceu' : 'REGRESSÃO' }}
            </span>
          </p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Sem marca, não desenha ───────────────────────────────────── -->
    <PgSection
      id="vazio" index="06" title="Sem marca, não desenha" :count="2"
      desc="Fora de qualquer [data-brand] e sem prop, o componente renderiza o &lt;svg&gt; sem path nenhum. É escolha: chutar a marca de um produto é pior que não desenhar — um Water que aparece como Hub numa tela de produção é erro que ninguém percebe até o cliente ver."
    >
      <PgGrid>
        <PgTile code="sem fonte de marca" align="center">
          <DssBrandLogo size="lg" data-medida="vazio" />
          <p v-if="medidas.vazio" class="bl-nota">{{ medidas.vazio }}</p>
        </PgTile>
        <PgTile code="prop vence o ancestral" align="center">
          <div data-brand="waste">
            <DssBrandLogo brand="water" size="lg" data-medida="precedencia" />
          </div>
          <p v-if="medidas.precedencia" class="bl-nota">
            ancestral <code>waste</code>, prop <code>water</code> → <strong>{{ medidas.precedencia }}</strong>
          </p>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Acessibilidade ───────────────────────────────────────────── -->
    <PgSection
      id="a11y" index="07" title="Acessibilidade" :count="3"
      desc="O logo tem nome NATURAL — vem dos dados da marca, não de o consumidor lembrar de escrever. É a diferença declarada em relação ao DssIcon, onde ariaLabel é obrigatório: ícone não tem nome, marca tem. decorative existe para um caso concreto: numa barra onde o nome do produto já aparece em texto ao lado, o logo anunciado duplicaria a leitura."
    >
      <PgGrid>
        <PgTile code="padrão — informativo e nomeado" align="center">
          <DssBrandLogo brand="water" size="md" data-medida="a11y-padrao" />
          <p v-if="medidas['a11y-padrao']" class="bl-nota">{{ medidas['a11y-padrao'] }}</p>
        </PgTile>
        <PgTile code="ariaLabel substitui o nome" align="center">
          <DssBrandLogo brand="water" size="md" aria-label="Página inicial" data-medida="a11y-label" />
          <p v-if="medidas['a11y-label']" class="bl-nota">{{ medidas['a11y-label'] }}</p>
        </PgTile>
        <PgTile code="decorative — sai da árvore" align="center">
          <DssBrandLogo brand="water" size="md" decorative data-medida="a11y-dec" />
          <p v-if="medidas['a11y-dec']" class="bl-nota">{{ medidas['a11y-dec'] }}</p>
        </PgTile>
      </PgGrid>
      <p class="bl-nota bl-nota--bloco">
        <DssButton label="Medir" variant="outline" size="sm" @click="medir" />
        O logo também não entra na ordem de tabulação (<code>focusable="false"</code>) e não
        recebe clique (<code>pointer-events: none</code>): quem interage é quem o embrulha.
      </p>
    </PgSection>

    <!-- ── 08. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="08" title="Exemplos de uso" :count="6"
      desc="Cenários reais, vindos do DssBrandLogo.example.vue do próprio componente."
    >
      <DssBrandLogoExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { reactive, onMounted, nextTick } from 'vue'
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssBrandLogo from '@components/base/DssBrandLogo/DssBrandLogo.vue'
import DssBrandLogoExample from '@components/base/DssBrandLogo/DssBrandLogo.example.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

const MARCAS = ['water', 'hub', 'waste'] as const
const TAMANHOS = ['sm', 'md', 'lg', 'xl'] as const
const RECORTES = ['full', 'icon', 'wordmark'] as const

const CONTEXTOS = [
  { chave: 'marca', code: 'sobre a cor da marca' },
  { chave: 'claro', code: 'sobre fundo claro' },
  { chave: 'escuro', code: 'sobre fundo escuro' },
  { chave: 'sutil', code: 'sobre texto sutil' },
]

const medidas = reactive<Record<string, string>>({})

/**
 * As medições saem do DOM renderizado, nunca dos tokens.
 *
 * O ponto do componente é que a cor NÃO é dele — então a única forma honesta
 * de mostrar isso é ler o `fill` computado em cada contexto e ver quatro
 * valores diferentes para o mesmo markup.
 */
function medir() {
  for (const el of document.querySelectorAll<SVGElement>('[data-medida]')) {
    const chave = el.dataset.medida as string
    if (!chave || el.getBoundingClientRect().width === 0) continue
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    const paths = el.querySelectorAll('path').length

    if (chave.startsWith('cor-')) {
      medidas[chave] = cs.fill
    } else if (chave.startsWith('a11y-')) {
      const papel = el.getAttribute('role')
      const nome = el.getAttribute('aria-label')
      const oculto = el.getAttribute('aria-hidden')
      medidas[chave] = oculto
        ? 'aria-hidden="true" · sem role, sem nome'
        : `role="${papel}" · aria-label="${nome}"`
    } else if (chave === 'vazio') {
      medidas[chave] = paths === 0
        ? '0 paths — o svg existe e não desenha nada'
        : `${paths} paths — REGRESSÃO: escolheu uma marca sozinho`
    } else if (chave === 'aninhado' || chave === 'precedencia' || chave.startsWith('her-')) {
      medidas[chave] = `viewBox ${el.getAttribute('viewBox')} (${VIEWBOX_MARCA[el.getAttribute('viewBox') ?? ''] ?? '?'})`
    } else {
      medidas[chave] = `${Math.round(r.width)} × ${Math.round(r.height)} px · ${paths} paths`
    }
  }
}

/** Mapa inverso: o viewBox identifica a marca desenhada sem consultar a prop. */
const VIEWBOX_MARCA: Record<string, string> = {
  '0 0 154 42': 'water',
  '0 0 120 42': 'hub',
  '0 0 156 42': 'waste',
}

onMounted(async () => {
  await nextTick()
  medir()
})

const SECTIONS = [
  { id: 'marcas',   index: '01', title: 'As três marcas' },
  { id: 'cor',      index: '02', title: 'A cor é de quem hospeda' },
  { id: 'tamanhos', index: '03', title: 'Tamanhos' },
  { id: 'recorte',  index: '04', title: 'Recorte do desenho' },
  { id: 'heranca',  index: '05', title: 'A marca vem do ancestral mais PRÓXIMO' },
  { id: 'vazio',    index: '06', title: 'Sem marca, não desenha' },
  { id: 'a11y',     index: '07', title: 'Acessibilidade' },
  { id: 'exemplos', index: '08', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 5, label: 'Props' },
  { value: 3, label: 'Marcas' },
  { value: TAMANHOS.length, label: 'Tamanhos' },
  { value: 0, label: 'Props de cor' },
]
</script>

<style scoped>
.bl-nota {
  margin: var(--dss-spacing-2) 0 0;
  font-size: var(--dss-font-size-xs);
  line-height: var(--dss-line-height-relaxed);
  color: var(--dss-text-subtle);
}

.bl-nota--bloco {
  margin-top: var(--dss-spacing-4);
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
  flex-wrap: wrap;
  font-size: var(--dss-font-size-sm);
  max-width: 76ch;
}

.bl-linha {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--dss-spacing-5);
}

.bl-heranca,
.bl-aninhado {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--dss-spacing-2);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}

.bl-aninhado {
  padding: var(--dss-spacing-3);
  border: var(--dss-border-width-thin) dashed var(--dss-border-default);
  border-radius: var(--dss-radius-sm);
}

.bl-aninhado--interno {
  width: 100%;
}

/* Os quatro contextos definem COR, e é só isso que muda entre eles.
   O markup do logo é idêntico nos quatro. */
.bl-ctx {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--dss-spacing-5);
  border-radius: var(--dss-radius-md);
  min-height: var(--dss-spacing-16);
}

.bl-ctx--marca {
  background: var(--dss-action-primary);
  color: var(--dss-text-on-primary);
}

.bl-ctx--claro {
  background: var(--dss-surface-subtle);
  color: var(--dss-text-body);
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);
}

.bl-ctx--escuro {
  background: var(--dss-gray-900);
  color: var(--dss-text-inverse);
}

.bl-ctx--sutil {
  background: var(--dss-surface-default);
  color: var(--dss-text-subtle);
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);
}

.bl-ok {
  color: var(--dss-feedback-success);
  font-weight: var(--dss-font-weight-semibold);
}

.bl-alerta {
  color: var(--dss-feedback-error);
  font-weight: var(--dss-font-weight-semibold);
}
</style>
