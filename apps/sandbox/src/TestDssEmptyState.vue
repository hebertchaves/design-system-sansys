<template>
  <PlaygroundLayout
    title="DssEmptyState — Playground"
    code="base/DssEmptyState"
    :sections="SECTIONS"
    :kpis="KPIS"
  >
    <!-- ── 01. Tamanhos ────────────────────────────────────────────────── -->
    <PgSection id="tamanhos" index="01" title="Tamanhos" :count="SIZES.length"
      desc="Três tamanhos ligados a CONTEXTOS DE USO reais, não a uma escala tipográfica livre: sm cabe na linha vazia de uma tabela; md é a área de conteúdo de uma seção; lg é a página inteira vazia.">
      <PgGrid>
        <PgTile v-for="s in SIZES" :key="s" :code="`size=&quot;${s}&quot;`">
          <DssEmptyState :size="s" icon="inbox" title="Nenhuma solicitação encontrada"
            description="Ajuste os filtros ou limpe a busca." />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 02. Variantes ───────────────────────────────────────────────── -->
    <PgSection id="variantes" index="02" title="Variantes de contêiner" :count="VARIANTS.length"
      desc="plain (default) não desenha moldura — o caso dominante é o bloco ocupar uma área que já tem contorno (card, tabela). bordered usa borda TRACEJADA de propósito: borda sólida lê como componente ativo, e o estado vazio não é interativo.">
      <PgGrid>
        <PgTile v-for="v in VARIANTS" :key="v" :code="`variant=&quot;${v}&quot;`">
          <DssEmptyState :variant="v" icon="attach_file" title="Nenhum anexo"
            description="Arraste arquivos para esta área." />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 03. Composição de conteúdo ──────────────────────────────────── -->
    <PgSection id="conteudo" index="03" title="Composição de conteúdo" :count="4"
      desc="Todas as props de conteúdo são opcionais de propósito. Um estado vazio só de título é legítimo; um só de ícone (célula estreita) também.">
      <PgGrid>
        <PgTile code="icon + title + description">
          <DssEmptyState icon="search_off" title="Nenhum resultado"
            description="Nenhum registro corresponde aos filtros aplicados." />
        </PgTile>
        <PgTile code="icon + title">
          <DssEmptyState icon="event_busy" title="Nenhum evento agendado para hoje" />
        </PgTile>
        <PgTile code="title + description (sem ícone)">
          <DssEmptyState title="Caixa de entrada vazia"
            description="Você está em dia — não há nada aguardando resposta." />
        </PgTile>
        <PgTile code="só icon">
          <DssEmptyState size="sm" icon="folder_open" />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 04. Slots ───────────────────────────────────────────────────── -->
    <PgSection id="slots" index="04" title="Slots" :count="SLOTS.length"
      desc="5 slots. Os três de conteúdo (icon, title, description) PRECEDEM a prop equivalente — passar os dois não é erro, a prop é ignorada (CCI §3.2). O slot action é o que tira o usuário do vazio.">
      <PgGrid>
        <PgTile code="#action — desfaz a causa do vazio">
          <DssEmptyState icon="search_off" title="Nenhuma solicitação encontrada"
            description="Nenhum registro corresponde aos filtros.">
            <template #action>
              <DssButton variant="outline" size="sm">Limpar filtros</DssButton>
            </template>
          </DssEmptyState>
        </PgTile>
        <PgTile code="#icon — ilustração própria (precede a prop)">
          <DssEmptyState title="Nada por aqui" description="SVG fornecido pelo consumidor.">
            <template #icon>
              <svg viewBox="0 0 48 48" aria-hidden="true" fill="none"
                   stroke="currentColor" stroke-width="2">
                <rect x="6" y="14" width="36" height="26" rx="3" />
                <path d="M6 20h36M16 8v6M32 8v6" />
              </svg>
            </template>
          </DssEmptyState>
        </PgTile>
        <PgTile code="#title + #description — rich text">
          <DssEmptyState icon="filter_alt_off">
            <template #title>Nenhum item em <strong>Pendentes</strong></template>
            <template #description>Veja também a aba <em>Concluídos</em>.</template>
          </DssEmptyState>
        </PgTile>
        <PgTile code="#action com duas ações (flex-wrap)">
          <DssEmptyState icon="inbox" title="Você ainda não tem solicitações">
            <template #action>
              <DssButton color="primary" size="sm" icon="add">Nova</DssButton>
              <DssButton variant="outline" size="sm">Importar</DssButton>
            </template>
          </DssEmptyState>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 05. Estados ─────────────────────────────────────────────────── -->
    <PgSection id="estados" index="05" title="Estados" count="0 interativos"
      desc="O componente NÃO é interativo: não tem hover, focus, active nem disabled próprios. É decisão de arquitetura declarada, não escopo reduzido — o único elemento focável é o que o consumidor põe no slot action, e ele traz os próprios estados.">
      <PgGrid>
        <PgTile code="announce (default: true) — role=status + aria-live=polite">
          <DssEmptyState icon="check_circle" title="Anuncia-se a leitores de tela"
            description="O caso dominante é o vazio SUBSTITUIR um resultado após busca ou filtro — essa troca precisa ser anunciada." />
        </PgTile>
        <PgTile code=":announce=&quot;false&quot; — conteúdo estático">
          <DssEmptyState :announce="false" icon="folder_open" title="Esta pasta está vazia"
            description="Desligue quando o bloco já nasce na tela e nunca muda: anunciar conteúdo estático é ruído." />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 06. Brandabilidade ──────────────────────────────────────────── -->
    <PgSection id="brand" index="06" title="Brandabilidade" count="0 por decisão"
      desc="O estado vazio NÃO se colore por marca — decisão registrada em 4-output/_brands.scss, que existe deliberadamente sem regras. Ele é informação neutra; pintá-lo competiria com a ação, que é o lugar da marca. Os três tiles abaixo devem ficar IDÊNTICOS no bloco — o que se verifica. ⚠️ O BOTÃO também está idêntico, e NÃO deveria: a classe utilitária .bg-primary usa o PRIMITIVO --dss-primary em vez do semântico --dss-action-primary (utils/_colors.scss), furando a camada que faz a brandabilidade. É defeito do sistema, não deste componente — ver DEBITO_ABERTO.">
      <PgGrid>
        <PgTile v-for="b in BRANDS" :key="b" :code="`[data-brand=&quot;${b}&quot;]`">
          <div :data-brand="b">
            <DssEmptyState size="sm" icon="inbox" title="Nenhuma solicitação"
              description="Bloco neutro por decisão; a ação deveria seguir a marca.">
              <template #action>
                <DssButton color="primary" size="sm">Nova solicitação</DssButton>
              </template>
            </DssEmptyState>
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 07. Em contexto real ────────────────────────────────────────── -->
    <PgSection id="contexto" index="07" title="Em contexto real" :count="3"
      desc="O componente define a própria densidade interna, mas NÃO define largura, altura nem centralização vertical — isso é decisão do contêiner ('layout mora no pai'). Estes tiles mostram o bloco dentro dos contêineres que de fato o hospedam.">
      <PgGrid>
        <PgTile code="dentro de tabela (size=sm)">
          <div class="ctx-tabela">
            <div class="ctx-tabela__head">
              <span>Solicitação</span><span>Status</span><span>Data</span>
            </div>
            <DssEmptyState size="sm" icon="table_rows" title="Sem registros no período" />
          </div>
        </PgTile>
        <PgTile code="área de anexos (bordered)">
          <DssEmptyState variant="bordered" size="sm" icon="attach_file" title="Nenhum anexo"
            description="Arraste arquivos para esta área." />
        </PgTile>
        <PgTile code="célula estreita — sem estouro (G1)">
          <div class="ctx-estreito">
            <DssEmptyState size="sm" icon="inbox"
              title="Nenhumaresponsabilidadeatribuídaaesteusuário"
              description="Palavra longa sem espaço para provar que o bloco não estoura a célula." />
          </div>
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 08. Matriz tamanho × variante ───────────────────────────────── -->
    <PgSection id="matriz" index="08" title="Matriz Tamanho × Variante" :count="SIZES.length * VARIANTS.length"
      desc="As 6 combinações. Verificar em LIGHT e DARK: o bloco é transparente por desenho, então a legibilidade depende da superfície do contêiner.">
      <PgGrid>
        <PgTile v-for="c in MATRIZ" :key="c.k" :code="c.k">
          <DssEmptyState :size="c.size" :variant="c.variant" icon="inbox"
            title="Nenhuma solicitação" description="Ajuste os filtros." />
        </PgTile>
      </PgGrid>
    </PgSection>

    <!-- ── 09. Exemplos ────────────────────────────────────────────────── -->
    <PgSection id="exemplos" index="09" title="Exemplos de uso" count="7"
      desc="Arquivo DssEmptyState.example.vue — a verdade de uso do componente, renderizado aqui como está no pacote.">
      <DssEmptyStateExample />
    </PgSection>
  </PlaygroundLayout>
</template>

<script setup lang="ts">
// Imports canônicos DSS — Entry Point Wrappers (Princípio Fundamental #11)
import DssEmptyState from '@components/base/DssEmptyState/DssEmptyState.vue'
import DssEmptyStateExample from '@components/base/DssEmptyState/DssEmptyState.example.vue'
import DssButton from '@components/base/DssButton/DssButton.vue'

// Template reutilizável das páginas de teste
import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'

// ──────────────────────────────────────────────────────────────────────────
// API canônica do DssEmptyState (vide types/empty-state.types.ts)
// ──────────────────────────────────────────────────────────────────────────
const SIZES = ['sm', 'md', 'lg'] as const
const VARIANTS = ['plain', 'bordered'] as const
const SLOTS = ['icon', 'title', 'description', 'action', 'default'] as const
const BRANDS = ['hub', 'water', 'waste'] as const

const MATRIZ = SIZES.flatMap((size) =>
  VARIANTS.map((variant) => ({ k: `${size} · ${variant}`, size, variant }))
)

const SECTIONS = [
  { id: 'tamanhos',  index: '01', title: 'Tamanhos' },
  { id: 'variantes', index: '02', title: 'Variantes' },
  { id: 'conteudo',  index: '03', title: 'Conteúdo' },
  { id: 'slots',     index: '04', title: 'Slots' },
  { id: 'estados',   index: '05', title: 'Estados' },
  { id: 'brand',     index: '06', title: 'Brandabilidade' },
  { id: 'contexto',  index: '07', title: 'Em contexto real' },
  { id: 'matriz',    index: '08', title: 'Matriz T × V' },
  { id: 'exemplos',  index: '09', title: 'Exemplos de uso' },
]

const KPIS = [
  { value: SIZES.length,    label: 'Tamanhos' },
  { value: VARIANTS.length, label: 'Variantes' },
  { value: SLOTS.length,    label: 'Slots' },
  { value: 0,               label: 'Eventos' },
]
</script>

<style scoped>
/* Contêineres de DEMONSTRAÇÃO (seção 07) — não fazem parte do componente.
   Existem para provar a fronteira: o layout mora no pai, não no DssEmptyState. */
.ctx-tabela {
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.ctx-tabela__head {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  /* Tinta translucida, nao superficie opaca: --dss-surface-muted INVERTE de papel
     no dark (#f5f5f5 discreto no light vs #737373 berrante no dark), e o texto do
     cabecalho caia para ~2.8:1. Medido. Ver DEBITO_ABERTO. */
  background: var(--dss-surface-hover);
  border-bottom: 1px solid var(--dss-border-default);
  font-size: var(--dss-font-size-sm);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-secondary);
}

/* Célula deliberadamente estreita: prova do item G1 do checklist de adequação. */
.ctx-estreito {
  max-width: 200px;
  border: 1px dashed var(--dss-border-default);
  overflow: hidden;
}
</style>
