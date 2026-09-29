<template>
  <PlaygroundLayout
    title="DssToolbar — Playground"
    code="base/DssToolbar"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Altura e densidade ───────────────────────────────────────── -->
    <PgSection id="altura" index="01" title="Altura e densidade" :count="2"
      desc="A barra tem altura própria (min-height), e os filhos têm a sua. O que se mede aqui é se a barra acomoda o filho mais alto sem o esmagar — e se o alvo de toque do filho sobrevive dentro dela.">
      <PgGrid>
        <PgTile code="padrão" align="stretch">
          <DssToolbar>
            <DssButton label="Salvar" variant="flat" size="sm" />
            <DssButton label="Descartar" variant="flat" size="sm" />
          </DssToolbar>
        </PgTile>
        <PgTile code="inset" align="stretch">
          <DssToolbar inset>
            <DssButton label="Salvar" variant="flat" size="sm" />
            <DssButton label="Descartar" variant="flat" size="sm" />
          </DssToolbar>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Composição de filhos ─────────────────────────────────────── -->
    <PgSection id="filhos" index="02" title="Composição de filhos" :count="3"
      desc="A barra é container estrutural: não tem hover, focus nem active próprios. Aqui se vê se o alinhamento horizontal funciona com tipos diferentes de filho misturados.">
      <PgGrid>
        <PgTile code="título + ações" align="stretch">
          <DssToolbar>
            <span class="tb-titulo">Solicitações</span>
            <div class="tb-espaco" />
            <DssButton label="Filtrar" variant="flat" size="sm" icon="filter_list" />
            <DssButton label="Exportar" variant="flat" size="sm" icon="download" />
          </DssToolbar>
        </PgTile>
        <PgTile code="ícone + título + ícone" align="stretch">
          <DssToolbar>
            <DssButton variant="flat" size="sm" icon="arrow_back" aria-label="Voltar" />
            <span class="tb-titulo">Detalhe do registro</span>
            <div class="tb-espaco" />
            <DssButton variant="flat" size="sm" icon="more_vert" aria-label="Mais ações" />
          </DssToolbar>
        </PgTile>
        <PgTile code="com separador" align="stretch">
          <DssToolbar>
            <DssButton label="Copiar" variant="flat" size="sm" />
            <DssSeparator vertical />
            <DssButton label="Colar" variant="flat" size="sm" />
          </DssToolbar>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Transbordo ───────────────────────────────────────────────── -->
    <PgSection id="transbordo" index="03" title="Transbordo horizontal" :count="2"
      desc="O caso que quebra barra de ferramentas: mais ações do que largura. Compare 4 e 14 ações no MESMO contêiner estreito — a barra não pode empurrar a página para o lado.">
      <PgGrid>
        <PgTile code="4 ações" align="stretch">
          <div class="tb-estreito">
            <DssToolbar>
              <DssButton v-for="a in ACOES.slice(0, 4)" :key="a" :label="a" variant="flat" size="sm" />
            </DssToolbar>
          </div>
        </PgTile>
        <PgTile code="14 ações — mesma largura" align="stretch">
          <div class="tb-estreito">
            <DssToolbar>
              <DssButton v-for="a in ACOES" :key="a" :label="a" variant="flat" size="sm" />
            </DssToolbar>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Superfície nos dois temas ────────────────────────────────── -->
    <PgSection id="superficie" index="04" title="Superfície nos dois temas" :count="2"
      desc="A barra é uma superfície: precisa se distinguir do conteúdo que a cerca no claro E no escuro. Troque o tema no cabeçalho e compare.">
      <PgGrid>
        <PgTile code="sobre superfície padrão" align="stretch">
          <div class="tb-fundo-padrao">
            <DssToolbar>
              <span class="tb-titulo">Barra sobre superfície padrão</span>
            </DssToolbar>
          </div>
        </PgTile>
        <PgTile code="sobre superfície sutil" align="stretch">
          <div class="tb-fundo-sutil">
            <DssToolbar>
              <span class="tb-titulo">Barra sobre superfície sutil</span>
            </DssToolbar>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Brandabilidade via prop ──────────────────────────────────── -->
    <PgSection id="brand" index="05" title="Brandabilidade via prop" :count="3"
      desc="O DssToolbar é o único da fila que resolve a brand pondo [data-brand] no próprio root — não uma classe. Aqui se mede se isso faz os FILHOS herdarem a marca, inclusive o anel de foco (tabule até os botões).">
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="b" :code="`brand=&quot;${b}&quot;`" align="stretch">
          <DssToolbar :brand="b">
            <span class="tb-titulo">{{ b }}</span>
            <div class="tb-espaco" />
            <DssButton label="Ação" variant="flat" size="sm" />
          </DssToolbar>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection id="exemplos" index="06" title="Exemplos de uso" :count="2"
      desc="Contextos reais em que a barra aparece no sistema.">
      <PgGrid>
        <PgTile code="cabeçalho de listagem" align="stretch">
          <DssToolbar>
            <span class="tb-titulo">Atender solicitações</span>
            <div class="tb-espaco" />
            <DssButton label="Nova" variant="primary" size="sm" icon="add" />
          </DssToolbar>
        </PgTile>
        <PgTile code="barra de edição" align="stretch">
          <DssToolbar inset>
            <DssButton variant="flat" size="sm" icon="format_bold" aria-label="Negrito" />
            <DssButton variant="flat" size="sm" icon="format_italic" aria-label="Itálico" />
            <DssSeparator vertical />
            <DssButton variant="flat" size="sm" icon="link" aria-label="Inserir link" />
          </DssToolbar>
        </PgTile>
      </PgGrid>
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
import PlaygroundLayout from './playground/PlaygroundLayout.vue'
import PgSection from './playground/PgSection.vue'
import PgGrid from './playground/PgGrid.vue'
import PgTile from './playground/PgTile.vue'
import DssToolbar from '../../../packages/core/components/base/DssToolbar/DssToolbar.vue'
import DssButton from '../../../packages/core/components/base/DssButton/DssButton.vue'
import DssSeparator from '../../../packages/core/components/base/DssSeparator/DssSeparator.vue'

const BRANDS = ['hub', 'water', 'waste'] as const

const ACOES = [
  'Novo', 'Abrir', 'Salvar', 'Duplicar', 'Renomear', 'Mover', 'Arquivar',
  'Exportar', 'Importar', 'Imprimir', 'Compartilhar', 'Histórico', 'Permissões', 'Excluir',
]

const SECTIONS = [
  { id: 'altura',     index: '01', title: 'Altura e densidade' },
  { id: 'filhos',     index: '02', title: 'Composição de filhos' },
  { id: 'transbordo', index: '03', title: 'Transbordo horizontal' },
  { id: 'superficie', index: '04', title: 'Superfície nos dois temas' },
  { id: 'brand',      index: '05', title: 'Brandabilidade via prop' },
  { id: 'exemplos',   index: '06', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 2,              label: 'Props' },
  { value: 1,              label: 'Slot' },
  { value: BRANDS.length,  label: 'Brands' },
  { value: ACOES.length,   label: 'Ações no teste' },
]
</script>

<style scoped>
/* Só andaimes da página de teste — nada que o componente deva prover.
   Tokens porque a página também é consumidora da governança. */
/* SEM `color`, de propósito. A barra com marca define `color: var(--dss-text-inverse)`
   e o título precisa HERDAR isso — fixar --dss-text-primary aqui mediria a minha
   página, não o componente. */
.tb-titulo {
  font-size: var(--dss-font-size-md);
  font-weight: var(--dss-font-weight-medium);
  white-space: nowrap;
}

.tb-espaco {
  flex: 1 1 auto;
}

/* Contêiner estreito de propósito: é o que expõe o transbordo. */
.tb-estreito {
  max-width: var(--dss-min-w-md);
  border: var(--dss-border-width-thin) dashed var(--dss-border-default);
}

.tb-fundo-padrao {
  background-color: var(--dss-surface-default);
  padding: var(--dss-spacing-4);
}

.tb-fundo-sutil {
  background-color: var(--dss-surface-subtle);
  padding: var(--dss-spacing-4);
}
</style>
