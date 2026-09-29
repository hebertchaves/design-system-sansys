<template>
  <PlaygroundLayout
    title="DssActionMenu — Playground"
    code="composed/DssActionMenu"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Anatomia ─────────────────────────────────────────────────── -->
    <PgSection id="anatomia" index="01" title="Anatomia" :count="4"
      desc="Três peças: a barra (role=toolbar, decide cor/tamanho/variante UMA vez), o item (ação direta ou disparador de submenu) e o subitem (role=menuitem). O item decide se abre submenu pelo CONTEÚDO do slot, não por prop.">
      <PgGrid>
        <PgTile code="só ações diretas" align="start">
          <DssActionMenu aria-label="Ações diretas" @action="registrar">
            <DssActionMenuItem name="novo" label="Novo" icon="add" />
            <DssActionMenuItem name="editar" label="Editar" icon="edit" />
          </DssActionMenu>
        </PgTile>
        <PgTile code="item com submenu" align="start">
          <DssActionMenu aria-label="Com submenu" @action="registrar">
            <DssActionMenuItem name="exportar" label="Exportar" icon="download">
              <DssActionMenuSubItem name="exportar:pdf" label="PDF" />
              <DssActionMenuSubItem name="exportar:xlsx" label="Planilha" />
            </DssActionMenuItem>
          </DssActionMenu>
        </PgTile>
        <PgTile code="ação com dica (hover/foco)" align="start">
          <DssActionMenu aria-label="Com dica" @action="registrar">
            <DssActionMenuItem name="sync" label="Sincronizar" icon="sync"
              tooltip="Busca atualizações no servidor" />
            <DssActionMenuItem name="hist" label="Histórico" icon="history"
              tooltip="Últimas 30 alterações" />
          </DssActionMenu>
        </PgTile>
        <PgTile code="misto + item desabilitado" align="start">
          <DssActionMenu aria-label="Misto" @action="registrar">
            <DssActionMenuItem name="novo" label="Novo" icon="add" />
            <DssActionMenuItem name="excluir" label="Excluir" icon="delete" disabled />
            <DssActionMenuItem name="mais" label="Mais" icon="more_horiz">
              <DssActionMenuSubItem name="mais:duplicar" label="Duplicar" />
              <DssActionMenuSubItem name="mais:arquivar" label="Arquivar" disabled />
            </DssActionMenuItem>
          </DssActionMenu>
        </PgTile>
      </PgGrid>
      <p class="am-log">Último evento <code>action</code>: <code>{{ ultimo || '—' }}</code></p>
    </PgSection>

    <!-- ── 02. Teclado ──────────────────────────────────────────────────── -->
    <PgSection id="teclado" index="02" title="Navegação por teclado" :count="2"
      desc="A barra usa tabindex rovente: UM ponto de entrada no Tab, setas circulam entre as ações. Tabule até a barra e use ← →. O segundo caso tem a primeira ação desabilitada — o roving precisa PULAR quem não pode receber foco.">
      <PgGrid>
        <PgTile code="quatro ações habilitadas" align="start">
          <DssActionMenu aria-label="Teclado — todas habilitadas" @action="registrar">
            <DssActionMenuItem v-for="a in QUATRO" :key="a.name" v-bind="a" />
          </DssActionMenu>
        </PgTile>
        <PgTile code="primeira e terceira desabilitadas" align="start">
          <DssActionMenu aria-label="Teclado — com desabilitadas" @action="registrar">
            <DssActionMenuItem name="a" label="Primeira" icon="looks_one" disabled />
            <DssActionMenuItem name="b" label="Segunda" icon="looks_two" />
            <DssActionMenuItem name="c" label="Terceira" icon="looks_3" disabled />
            <DssActionMenuItem name="d" label="Quarta" icon="looks_4" />
          </DssActionMenu>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Efeito da adequação ──────────────────────────────────────── -->
    <PgSection id="adequacao" index="03" title="Efeito da adequação das peças" :count="2"
      desc="Esta seção existe para medir o que a fila de adequação prometeu. O composto foi construído CONTORNANDO defeitos de DssButton e DssMenu; os dois foram consertados. Aqui se compara o contorno com o idioma canônico, que voltou a funcionar.">
      <PgGrid>
        <PgTile code="o composto (contorno: DssMenu irmão + v-model)" align="start">
          <DssActionMenu aria-label="Composto" @action="registrar">
            <DssActionMenuItem name="abrir" label="Abrir" icon="folder_open">
              <DssActionMenuSubItem name="abrir:recente" label="Recente" />
              <DssActionMenuSubItem name="abrir:arquivo" label="Do arquivo" />
            </DssActionMenuItem>
          </DssActionMenu>
        </PgTile>
        <PgTile code="idioma canônico do Quasar — antes NÃO abria" align="start">
          <DssButton label="Abrir" variant="flat" size="md" icon="folder_open">
            <DssMenu>
              <DssList>
                <DssItem clickable label="Recente" />
                <DssItem clickable label="Do arquivo" />
              </DssList>
            </DssMenu>
          </DssButton>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Variantes e tamanho ──────────────────────────────────────── -->
    <PgSection id="variantes" index="04" title="Variantes e tamanho" :count="7"
      desc="A barra decide variante, cor e tamanho UMA vez e todas as ações herdam por provide/inject — nunca por prop repetida em cada item."
    >
      <PgGrid>
        <PgTile v-for="v in VARIANTES" :key="v" :code="`variant=&quot;${v}&quot;`" align="start">
          <DssActionMenu :variant="v" aria-label="Variante" @action="registrar">
            <DssActionMenuItem name="salvar" label="Salvar" icon="save" />
            <DssActionMenuItem name="limpar" label="Limpar" icon="clear" />
          </DssActionMenu>
        </PgTile>
        <PgTile v-for="t in TAMANHOS" :key="t" :code="`size=&quot;${t}&quot;`" align="start">
          <DssActionMenu :size="t" aria-label="Tamanho" @action="registrar">
            <DssActionMenuItem name="salvar" label="Salvar" icon="save" />
            <DssActionMenuItem name="limpar" label="Limpar" icon="clear" />
          </DssActionMenu>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Estado desabilitado ──────────────────────────────────────── -->
    <PgSection id="desabilitado" index="05" title="Desabilitado — barra e item" :count="2"
      desc="Desabilitar a BARRA desabilita todas as ações; desabilitar um ITEM afeta só ele. O que se mede é se a barra desabilitada sai inteira do fluxo de teclado.">
      <PgGrid>
        <PgTile code="barra inteira desabilitada" align="start">
          <DssActionMenu disabled aria-label="Barra desabilitada" @action="registrar">
            <DssActionMenuItem name="novo" label="Novo" icon="add" />
            <DssActionMenuItem name="editar" label="Editar" icon="edit" />
          </DssActionMenu>
        </PgTile>
        <PgTile code="só um item desabilitado" align="start">
          <DssActionMenu aria-label="Item desabilitado" @action="registrar">
            <DssActionMenuItem name="novo" label="Novo" icon="add" />
            <DssActionMenuItem name="editar" label="Editar" icon="edit" disabled />
          </DssActionMenu>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Brandabilidade ───────────────────────────────────────────── -->
    <PgSection id="brand" index="06" title="Brandabilidade" :count="3"
      desc="A marca é decidida na barra e herdada pelas ações. O submenu teleporta para o body — aqui se vê se a marca alcança o conteúdo teleportado.">
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="b" :code="`brand=&quot;${b}&quot;`" align="start">
          <DssActionMenu :brand="b" aria-label="Brand" @action="registrar">
            <DssActionMenuItem name="acao" label="Ação" icon="bolt" />
            <DssActionMenuItem name="mais" label="Mais" icon="more_horiz">
              <DssActionMenuSubItem name="mais:um" label="Opção um" />
              <DssActionMenuSubItem name="mais:dois" label="Opção dois" />
            </DssActionMenuItem>
          </DssActionMenu>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Exemplos de uso ──────────────────────────────────────────── -->
    <PgSection id="exemplos" index="07" title="Exemplos de uso" :count="2"
      desc="Contextos reais em que a barra de ações aparece no sistema.">
      <PgGrid>
        <PgTile code="cabeçalho de registro" align="start">
          <DssActionMenu aria-label="Ações da solicitação" @action="registrar">
            <DssActionMenuItem name="atender" label="Atender" icon="play_arrow" />
            <DssActionMenuItem name="encaminhar" label="Encaminhar" icon="send" />
            <DssActionMenuItem name="exportar" label="Exportar" icon="download">
              <DssActionMenuSubItem name="exportar:pdf" label="PDF" />
              <DssActionMenuSubItem name="exportar:csv" label="CSV" />
            </DssActionMenuItem>
          </DssActionMenu>
        </PgTile>
        <PgTile code="ações destrutivas" align="start">
          <DssActionMenu color="negative" aria-label="Ações destrutivas" @action="registrar">
            <DssActionMenuItem name="arquivar" label="Arquivar" icon="archive" />
            <DssActionMenuItem name="excluir" label="Excluir" icon="delete" />
          </DssActionMenu>
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
import DssActionMenu from '../../../packages/core/components/composed/DssActionMenu/DssActionMenu.vue'
import DssActionMenuItem from '../../../packages/core/components/composed/DssActionMenu/DssActionMenuItem.vue'
import DssActionMenuSubItem from '../../../packages/core/components/composed/DssActionMenu/DssActionMenuSubItem.vue'
import DssButton from '../../../packages/core/components/base/DssButton/DssButton.vue'
import DssMenu from '../../../packages/core/components/base/DssMenu/DssMenu.vue'
import DssList from '../../../packages/core/components/base/DssList/DssList.vue'
import DssItem from '../../../packages/core/components/base/DssItem/DssItem.vue'

const BRANDS = ['hub', 'water', 'waste'] as const
const VARIANTES = ['flat', 'outline', 'unelevated'] as const
const TAMANHOS = ['xs', 'sm', 'md', 'lg'] as const

const QUATRO = [
  { name: 'a', label: 'Primeira', icon: 'looks_one' },
  { name: 'b', label: 'Segunda', icon: 'looks_two' },
  { name: 'c', label: 'Terceira', icon: 'looks_3' },
  { name: 'd', label: 'Quarta', icon: 'looks_4' },
]

/** O evento `action` é o contrato de saída do composto — a barra emite, não o item. */
const ultimo = ref('')
const registrar = (nome: string) => { ultimo.value = nome }

const SECTIONS = [
  { id: 'anatomia',     index: '01', title: 'Anatomia' },
  { id: 'teclado',      index: '02', title: 'Navegação por teclado' },
  { id: 'adequacao',    index: '03', title: 'Efeito da adequação das peças' },
  { id: 'variantes',    index: '04', title: 'Variantes e tamanho' },
  { id: 'desabilitado', index: '05', title: 'Desabilitado' },
  { id: 'brand',        index: '06', title: 'Brandabilidade' },
  { id: 'exemplos',     index: '07', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: 3,                 label: 'SFCs' },
  { value: VARIANTES.length,  label: 'Variantes' },
  { value: TAMANHOS.length,   label: 'Tamanhos' },
  { value: BRANDS.length,     label: 'Brands' },
]
</script>

<style scoped>
.am-log {
  margin-top: var(--dss-spacing-4);
  font-size: var(--dss-font-size-sm);
}
</style>
