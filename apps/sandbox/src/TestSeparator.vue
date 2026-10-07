<template>
  <PlaygroundLayout
    title="DssSeparator — Playground"
    code="base/DssSeparator"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Orientação ───────────────────────────────────────────────── -->
    <PgSection
      id="orientacao" index="01" title="Orientação" :count="2"
      desc="Horizontal renderiza <hr>; vertical renderiza <div role=&quot;separator&quot;> com aria-orientation. O que se mede é se o vertical realmente ganha altura — separador vertical sem altura é o defeito clássico, porque div vazia colapsa e o contexto precisa dar a altura."
    >
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

    <!-- ── 02. Inset e espaçamento ──────────────────────────────────────── -->
    <PgSection
      id="inset" index="02" title="Inset e espaçamento" :count="INSETS.length"
      desc="inset recua o separador das bordas; spaced dá respiro vertical. Os valores vêm de token, e é isso que se confere — a moldura tracejada marca onde estaria a borda do container."
    >
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

    <!-- ── 03. Cor e espessura ──────────────────────────────────────────── -->
    <PgSection
      id="aparencia" index="03" title="Cor e espessura" :count="CORES.length + TAMANHOS.length"
      desc="Cor e tamanho por token. Separador é elemento decorativo: o critério não é 4,5:1 de texto, mas ser perceptível — e no tema escuro é onde some. Troque o tema na casca e confira as cinco cores."
    >
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

    <!-- ── 04. Semântica ────────────────────────────────────────────────── -->
    <PgSection
      id="semantica" index="04" title="Semântica" :count="2"
      desc="Separador entre GRUPOS é estrutura e deve ser anunciado; separador meramente decorativo deve sair da árvore com ariaHidden. O componente expõe a escolha — quem monta a tela é que decide qual dos dois o caso pede."
    >
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

    <!-- ── 05. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection
      id="exemplos" index="05" title="Exemplos de uso" :count="2"
      desc="O separador vertical em barra de ações é o caso mais comum — e é onde a regra de composição morde: o DssToolbar não aceita DssSeparator como filho (R3 do ui-rules). Aqui ele aparece para medir a geometria; numa tela real o divisor da barra é um elemento decorativo, não este componente."
    >
      <PgGrid>
        <PgTile code="separador em barra de ações" align="stretch">
          <DssToolbar>
            <DssButton label="Copiar" variant="flat" size="sm" />
            <DssSeparator vertical />
            <DssButton label="Colar" variant="flat" size="sm" />
          </DssToolbar>
        </PgTile>
      </PgGrid>
      <DssSeparatorExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssSeparator from '@components/base/DssSeparator/DssSeparator.vue'
import DssSeparatorExample from '@components/base/DssSeparator/DssSeparator.example.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'
import DssToolbar from '@components/base/DssToolbar/DssToolbar.vue'

const CORES = ['subtle', 'default', 'strong', 'primary', 'secondary'] as const
const TAMANHOS = ['hairline', 'thin', 'md', 'thick'] as const

const INSETS = [
  { code: 'sem inset',              valor: 'nenhum',         props: {} },
  { code: 'inset',                  valor: true,             props: { inset: true } },
  { code: 'inset="item"',           valor: 'item',           props: { inset: 'item' } },
  { code: 'inset="item-thumbnail"', valor: 'item-thumbnail', props: { inset: 'item-thumbnail' } },
  { code: 'spaced',                 valor: 'spaced',         props: { spaced: true } },
]

const SECTIONS = [
  { id: 'orientacao', index: '01', title: 'Orientação' },
  { id: 'inset',      index: '02', title: 'Inset e espaçamento' },
  { id: 'aparencia',  index: '03', title: 'Cor e espessura' },
  { id: 'semantica',  index: '04', title: 'Semântica' },
  { id: 'exemplos',   index: '05', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 6,               label: 'Props' },
  { value: INSETS.length,   label: 'Insets' },
  { value: CORES.length,    label: 'Cores' },
  { value: TAMANHOS.length, label: 'Espessuras' },
]
</script>

<style scoped>
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
</style>
