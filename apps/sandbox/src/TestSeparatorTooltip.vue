<template>
  <PlaygroundLayout
    title="DssSeparator & DssTooltip — Playground"
    code="base/DssSeparator"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Separador: orientação ────────────────────────────────────── -->
    <PgSection id="orientacao" index="01" title="Separador — orientação" :count="2"
      desc="Horizontal renderiza <hr>; vertical renderiza <div role=&quot;separator&quot;> com aria-orientation. O que se mede é se o vertical realmente ganha altura — separador vertical sem altura é o defeito clássico, porque div vazia colapsa.">
      <PgGrid>
        <PgTile code="horizontal — <hr>" align="stretch">
          <div class="sp-bloco">
            <span>Acima</span>
            <DssSeparator />
            <span>Abaixo</span>
          </div>
        </PgTile>
        <PgTile code="vertical — <div role=separator>" align="stretch">
          <div class="sp-linha">
            <span>Esquerda</span>
            <DssSeparator vertical />
            <span>Direita</span>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Separador: inset e espaçamento ──────────────────────────── -->
    <PgSection id="inset" index="02" title="Separador — inset e espaçamento" :count="5"
      desc="inset recua o separador das bordas; spaced dá respiro vertical. Os valores vêm de token, e é isso que se confere.">
      <PgGrid>
        <PgTile v-for="i in INSETS" :key="String(i.valor)" :code="i.code" align="stretch">
          <div class="sp-bloco sp-bloco--moldura">
            <span>Acima</span>
            <DssSeparator v-bind="i.props" />
            <span>Abaixo</span>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Separador: cor e espessura ──────────────────────────────── -->
    <PgSection id="aparencia" index="03" title="Separador — cor e espessura" :count="9"
      desc="Cor e tamanho por token. Separador é elemento decorativo: o critério não é 4,5:1 de texto, mas ser perceptível — e no tema escuro é onde some.">
      <PgGrid>
        <PgTile v-for="c in CORES" :key="c" :code="`color=&quot;${c}&quot;`" align="stretch">
          <div class="sp-bloco">
            <span>Acima</span>
            <DssSeparator :color="c" />
            <span>Abaixo</span>
          </div>
        </PgTile>
        <PgTile v-for="t in TAMANHOS" :key="t" :code="`size=&quot;${t}&quot;`" align="stretch">
          <div class="sp-bloco">
            <span>Acima</span>
            <DssSeparator :size="t" />
            <span>Abaixo</span>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Separador: semântica ────────────────────────────────────── -->
    <PgSection id="semantica" index="04" title="Separador — semântica" :count="2"
      desc="Separador entre GRUPOS é estrutura e deve ser anunciado; separador meramente decorativo deve sair da árvore com ariaHidden. O componente expõe a escolha — aqui se vê as duas.">
      <PgGrid>
        <PgTile code="estrutural (anunciado)" align="stretch">
          <div class="sp-bloco">
            <span>Grupo A</span>
            <DssSeparator />
            <span>Grupo B</span>
          </div>
        </PgTile>
        <PgTile code="decorativo (ariaHidden)" align="stretch">
          <div class="sp-bloco">
            <span>Linha 1</span>
            <DssSeparator aria-hidden />
            <span>Linha 2</span>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Tooltip: visibilidade é do consumidor ───────────────────── -->
    <PgSection id="visibilidade" index="05" title="Tooltip — a visibilidade é do consumidor" :count="3"
      desc="O DssTooltip NÃO governa a própria visibilidade nem se posiciona: é decisão de governança registrada na doc. Consequência prática: sem ligar `visible`, ele renderiza markup que nunca aparece. O terceiro tile mostra o gatilho de hover/foco feito pelo consumidor.">
      <PgGrid>
        <PgTile code="sem `visible` — nunca aparece" align="center">
          <DssButton label="Passe o mouse" variant="outline" size="sm" />
          <DssTooltip>Esta dica nunca aparece</DssTooltip>
        </PgTile>
        <PgTile code="visible fixo em true" align="center">
          <DssTooltip visible>Sempre visível</DssTooltip>
        </PgTile>
        <PgTile code="gatilho ligado pelo consumidor" align="center">
          <span
            class="tt-ancora"
            @mouseenter="dica = true"
            @mouseleave="dica = false"
            @focusin="dica = true"
            @focusout="dica = false"
          >
            <DssButton label="Passe o mouse" variant="outline" size="sm" />
            <DssTooltip :visible="dica">Dica ligada por hover e foco</DssTooltip>
          </span>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Tooltip: aparência ──────────────────────────────────────── -->
    <PgSection id="tooltipAparencia" index="06" title="Tooltip — aparência" :count="7"
      desc="Cores semânticas e modo multilinha, todas com visible fixo para inspeção. O que se mede é o contraste do texto sobre o fundo de cada cor, nos dois temas.">
      <PgGrid>
        <PgTile v-for="c in CORES_TOOLTIP" :key="c" :code="`color=&quot;${c}&quot;`" align="center">
          <DssTooltip visible :color="c">Dica em {{ c }}</DssTooltip>
        </PgTile>
        <PgTile code="multiLine" align="center">
          <DssTooltip visible multi-line>
            Texto longo o bastante para quebrar em mais de uma linha e mostrar o
            comportamento do modo multilinha.
          </DssTooltip>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos de uso ─────────────────────────────────────────── -->
    <PgSection id="exemplos" index="07" title="Exemplos de uso" :count="2"
      desc="Contextos reais: separador dentro de barra de ações e dica em ícone sem rótulo visível.">
      <PgGrid>
        <PgTile code="separador em barra de ações" align="stretch">
          <DssToolbar>
            <DssButton label="Copiar" variant="flat" size="sm" />
            <DssSeparator vertical />
            <DssButton label="Colar" variant="flat" size="sm" />
          </DssToolbar>
        </PgTile>
        <PgTile code="dica em ícone sem rótulo" align="center">
          <span
            class="tt-ancora"
            @mouseenter="dica2 = true"
            @mouseleave="dica2 = false"
            @focusin="dica2 = true"
            @focusout="dica2 = false"
          >
            <DssButton variant="flat" size="sm" icon="info" aria-label="Sobre este campo" />
            <DssTooltip :visible="dica2">Formato aceito: 00.000-000</DssTooltip>
          </span>
        </PgTile>
      </PgGrid>
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssSeparator from '../../../packages/core/components/base/DssSeparator/DssSeparator.vue'
import DssTooltip from '../../../packages/core/components/base/DssTooltip/DssTooltip.vue'
import DssButton from '../../../packages/core/components/base/DssButton/DssButton.vue'
import DssToolbar from '../../../packages/core/components/base/DssToolbar/DssToolbar.vue'

const dica = ref(false)
const dica2 = ref(false)

const CORES = ['subtle', 'default', 'strong', 'primary', 'secondary'] as const
const TAMANHOS = ['hairline', 'thin', 'md', 'thick'] as const
const CORES_TOOLTIP = ['dark', 'primary', 'positive', 'negative', 'warning', 'info'] as const

const INSETS = [
  { code: 'sem inset',        valor: 'nenhum', props: {} },
  { code: 'inset',            valor: true,     props: { inset: true } },
  { code: 'inset="item"',     valor: 'item',   props: { inset: 'item' } },
  { code: 'inset="item-thumbnail"', valor: 'item-thumbnail', props: { inset: 'item-thumbnail' } },
  { code: 'spaced',           valor: 'spaced', props: { spaced: true } },
]

const SECTIONS = [
  { id: 'orientacao',       index: '01', title: 'Separador — orientação' },
  { id: 'inset',            index: '02', title: 'Separador — inset' },
  { id: 'aparencia',        index: '03', title: 'Separador — cor e espessura' },
  { id: 'semantica',        index: '04', title: 'Separador — semântica' },
  { id: 'visibilidade',     index: '05', title: 'Tooltip — visibilidade' },
  { id: 'tooltipAparencia', index: '06', title: 'Tooltip — aparência' },
  { id: 'exemplos',         index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 6,                    label: 'Props (Separator)' },
  { value: 7,                    label: 'Props (Tooltip)' },
  { value: INSETS.length,        label: 'Insets' },
  { value: CORES_TOOLTIP.length, label: 'Cores de dica' },
]
</script>

<style scoped>
/* Andaimes da página. */
.sp-bloco {
  display: flex;
  flex-direction: column;
  font-size: var(--dss-font-size-sm);
}

.sp-bloco--moldura {
  border: var(--dss-border-width-thin) dashed var(--dss-border-default);
}

.sp-linha {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-3);
  font-size: var(--dss-font-size-sm);
  /* altura explícita: separador vertical precisa de contexto com altura */
  height: var(--dss-spacing-10);
}

/* O posicionamento da dica é do CONSUMIDOR — o DssTooltip declara
   posicionamento fora de escopo. Este é o mínimo para a dica não empurrar o
   layout ao aparecer. */
.tt-ancora {
  position: relative;
  display: inline-flex;
}

.tt-ancora :deep(.dss-tooltip) {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--dss-spacing-1);
  white-space: nowrap;
  z-index: 1;
}
</style>
