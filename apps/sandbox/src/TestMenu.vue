<template>
  <PlaygroundLayout
    title="DssMenu — Playground"
    code="base/DssMenu"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Ancoragem ───────────────────────────────────────────────── -->
    <PgSection id="ancoragem" index="01" title="Ancoragem" :count="ANCORAS.length"
      desc="Props anchor e self definem QUAL ponto do disparador encosta em QUAL ponto do menu. O par é o que resolve menu que abre fora da tela perto da borda.">
      <PgGrid>
        <PgTile v-for="a in ANCORAS" :key="a.anchor" :code="`anchor=&quot;${a.anchor}&quot; self=&quot;${a.self}&quot;`" align="start">
          <DssButton :label="a.rotulo" variant="outline" size="sm">
            <DssMenu :anchor="a.anchor" :self="a.self">
              <DssList>
                <DssItem v-for="o in OPCOES_CURTAS" :key="o" clickable :label="o" />
              </DssList>
            </DssMenu>
          </DssButton>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Quantidade de itens ─────────────────────────────────────── -->
    <PgSection id="itens" index="02" title="Quantidade de itens" :count="3"
      desc="O menu deve acompanhar o conteúdo. Compare 2, 5 e 12 itens — o painel de 2 não pode reservar altura que não usa.">
      <PgGrid>
        <PgTile v-for="q in [2, 5, 12]" :key="q" :code="`${q} itens`" align="start">
          <DssButton :label="`${q} itens`" variant="outline" size="sm">
            <DssMenu>
              <DssList>
                <DssItem v-for="i in q" :key="i" clickable :label="`Opção ${i}`" />
              </DssList>
            </DssMenu>
          </DssButton>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Largura do painel ───────────────────────────────────────── -->
    <PgSection id="largura" index="03" title="Largura" :count="3"
      desc="Prop fit faz o painel ter a largura do disparador. Sem ela, o painel dimensiona pelo próprio conteúdo, respeitando a largura mínima.">
      <PgGrid>
        <PgTile code="padrão" align="start">
          <DssButton label="Disparador largo e comprido" variant="outline" size="sm">
            <DssMenu><DssList><DssItem clickable label="Curto" /></DssList></DssMenu>
          </DssButton>
        </PgTile>
        <PgTile code="fit" align="start">
          <DssButton label="Disparador largo e comprido" variant="outline" size="sm">
            <DssMenu fit><DssList><DssItem clickable label="Curto" /></DssList></DssMenu>
          </DssButton>
        </PgTile>
        <PgTile code="cover" align="start">
          <DssButton label="Cobre o disparador" variant="outline" size="sm">
            <DssMenu cover><DssList><DssItem clickable label="Sobreposto" /></DssList></DssMenu>
          </DssButton>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Superfície e elevação ───────────────────────────────────── -->
    <PgSection id="superficie" index="04" title="Superfície e elevação"
      desc="O painel é uma superfície flutuante: fundo, borda e sombra precisam separá-lo do conteúdo atrás — nos DOIS temas. É o item que mais quebra no escuro.">
      <PgGrid>
        <PgTile code="sobre superfície clara" align="start">
          <div class="tm-fundo tm-fundo--claro">
            <DssButton label="Abrir" variant="unelevated" size="sm">
              <DssMenu><DssList><DssItem clickable label="Renomear" /><DssItem clickable label="Duplicar" /></DssList></DssMenu>
            </DssButton>
          </div>
        </PgTile>
        <PgTile code="sobre superfície sutil" align="start">
          <div class="tm-fundo tm-fundo--sutil">
            <DssButton label="Abrir" variant="unelevated" size="sm">
              <DssMenu><DssList><DssItem clickable label="Renomear" /><DssItem clickable label="Duplicar" /></DssList></DssMenu>
            </DssButton>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Em superfície fixa ──────────────────────────────────────── -->
    <PgSection id="sticky" index="05" title="Em cabeçalho fixo"
      desc="O QMenu teleporta para o body. É aqui que o overlay quebra: disparador em superfície sticky, sobre conteúdo rolável. Abra e role.">
      <PgTile code="header sticky + lista rolável" align="start">
        <div class="tm-palco">
          <div class="tm-sticky">
            <DssButton label="Ações" variant="flat" size="sm">
              <DssMenu>
                <DssList>
                  <DssItem clickable label="Filtrar" />
                  <DssItem clickable label="Ordenar" />
                  <DssItem clickable label="Exportar" />
                </DssList>
              </DssMenu>
            </DssButton>
          </div>
          <ul class="tm-lista"><li v-for="n in 24" :key="n">Registro {{ n }}</li></ul>
        </div>
      </PgTile>
    </PgSection>

    <!-- ── 06. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="06" title="Brandabilidade" :count="BRANDS.length"
      desc="O painel teleporta para o body — fora da subárvore com [data-brand]. Aqui se vê se a marca alcança o conteúdo teleportado.">
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="b" :code="`[data-brand=&quot;${b}&quot;]`" align="start">
          <div :data-brand="b">
            <DssButton :label="brandLabel(b)" variant="unelevated" size="sm">
              <DssMenu>
                <DssList>
                  <DssItem clickable label="Primeira opção" />
                  <DssItem clickable label="Segunda opção" />
                </DssList>
              </DssMenu>
            </DssButton>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos de uso ─────────────────────────────────────────── -->
    <PgSection id="exemplos" index="07" title="Exemplos de uso"
      desc="Contextos reais em que o menu aparece no sistema.">
      <PgGrid>
        <PgTile code="menu de linha de tabela" align="start">
          <DssButton icon="more_vert" variant="flat" size="sm" aria-label="Ações da linha">
            <DssMenu anchor="bottom right" self="top right">
              <DssList>
                <DssItem clickable label="Ver detalhes" />
                <DssItem clickable label="Editar" />
                <DssSeparator />
                <DssItem clickable label="Excluir" />
              </DssList>
            </DssMenu>
          </DssButton>
        </PgTile>
        <PgTile code="menu com legenda" align="start">
          <DssButton label="Conta" icon="account_circle" variant="outline" size="sm">
            <DssMenu>
              <DssList>
                <DssItem clickable label="Perfil" caption="Dados pessoais" />
                <DssItem clickable label="Preferências" caption="Tema e idioma" />
              </DssList>
            </DssMenu>
          </DssButton>
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
import DssMenu from '../../../packages/core/components/base/DssMenu/DssMenu.vue'
import DssList from '../../../packages/core/components/base/DssList/DssList.vue'
import DssItem from '../../../packages/core/components/base/DssItem/DssItem.vue'
import DssButton from '../../../packages/core/components/base/DssButton/DssButton.vue'
import DssSeparator from '../../../packages/core/components/base/DssSeparator/DssSeparator.vue'


/** v-model é OPCIONAL no DssMenu desde a adequação (set/2026): estas seções usam
 *  o idioma não-controlado do Quasar — <DssButton><DssMenu/></DssButton> — de propósito,
 *  porque é justamente ele que estava quebrado. */

const BRANDS = ['hub', 'water', 'waste'] as const
const OPCOES_CURTAS = ['Abrir', 'Renomear']

const ANCORAS = [
  { anchor: 'bottom left',  self: 'top left',     rotulo: 'Abaixo, à esquerda' },
  { anchor: 'bottom right', self: 'top right',    rotulo: 'Abaixo, à direita' },
  { anchor: 'top left',     self: 'bottom left',  rotulo: 'Acima' },
  { anchor: 'center right', self: 'center left',  rotulo: 'Ao lado' },
] as const

const SECTIONS = [
  { id: 'ancoragem',  index: '01', title: 'Ancoragem' },
  { id: 'itens',      index: '02', title: 'Quantidade de itens' },
  { id: 'largura',    index: '03', title: 'Largura' },
  { id: 'superficie', index: '04', title: 'Superfície e elevação' },
  { id: 'sticky',     index: '05', title: 'Em cabeçalho fixo' },
  { id: 'brand',      index: '06', title: 'Brandabilidade' },
  { id: 'exemplos',   index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: ANCORAS.length, label: 'Ancoragens' },
  { value: 3,              label: 'Larguras' },
  { value: BRANDS.length,  label: 'Brands' },
  { value: 1,              label: 'Slot' },
]

const brandLabel = (b: string) => ({ hub: '🟠 Hub', water: '🔵 Water', waste: '🟢 Waste' }[b] || b)
</script>

<style scoped>
/* CONTEÚDO da demonstração — fundos de contraste para aferir a superfície do
   painel contra o que está atrás dele. */
.tm-fundo {
  padding: var(--dss-spacing-4);
  border-radius: var(--dss-radius-sm);
}
.tm-fundo--claro { background: var(--dss-surface-default); }
.tm-fundo--sutil { background: var(--dss-surface-muted); }

.tm-palco {
  width: 100%;
  height: var(--dss-spacing-56);
  overflow-y: auto;
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  border-radius: var(--dss-radius-sm);
  background: var(--dss-surface-default);
}
.tm-sticky {
  position: sticky; top: 0; z-index: 1;
  padding: var(--dss-spacing-2);
  background: var(--dss-surface-subtle);
  border-bottom: var(--dss-border-width-thin) solid var(--dss-border-subtle);
}
.tm-lista { margin: 0; padding: var(--dss-spacing-3) var(--dss-spacing-6); }
.tm-lista li { padding: var(--dss-spacing-1) 0; color: var(--dss-text-body); }
</style>
