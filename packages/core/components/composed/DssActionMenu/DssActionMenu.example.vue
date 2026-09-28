<!--
  DssActionMenu — exemplos de uso.

  Os cenários NÃO são decorativos: cada um corresponde a um item da §7 do
  pré-prompt, e dois deles existem para expor o risco arquitetural declarado —
  overlay em superfície de comando.
-->
<template>
  <div class="ex">
    <!-- 1 · Fluxo principal ------------------------------------------------- -->
    <section class="ex__bloco">
      <h3>1. Fluxo principal</h3>
      <p class="ex__desc">
        Quatro ações; a última abre sub-ações. Uma delas está desabilitada
        individualmente — continua focável, para ser anunciada.
      </p>
      <DssActionMenu aria-label="Ações do registro" @action="registrar">
        <DssActionMenuItem name="novo" label="Novo" icon="add" />
        <DssActionMenuItem name="editar" label="Editar" icon="edit" />
        <DssActionMenuItem name="excluir" label="Excluir" icon="delete" disabled />
        <DssActionMenuItem name="exportar" label="Exportar" icon="download">
          <DssActionMenuSubItem name="exportar:pdf" label="PDF" />
          <DssActionMenuSubItem name="exportar:xlsx" label="Planilha" />
        </DssActionMenuItem>
      </DssActionMenu>
      <p class="ex__log">Último evento: <code>{{ ultimo || '—' }}</code></p>
    </section>

    <!-- 2 · Barra desabilitada ----------------------------------------------- -->
    <section class="ex__bloco">
      <h3>2. Barra desabilitada</h3>
      <p class="ex__desc">
        Prova que <code>disabled</code> alcança cada ação <strong>e impede a
        abertura</strong> do sub-menu. É o defeito clássico de prop drilling: o
        menu abrir com itens inertes.
      </p>
      <DssActionMenu aria-label="Ações indisponíveis" disabled>
        <DssActionMenuItem name="novo" label="Novo" icon="add" />
        <DssActionMenuItem name="exportar" label="Exportar" icon="download">
          <DssActionMenuSubItem name="pdf" label="PDF" />
        </DssActionMenuItem>
      </DssActionMenu>
    </section>

    <!-- 3 · Dentro de header sticky, sobre conteúdo rolável ------------------- -->
    <section class="ex__bloco">
      <h3>3. Em header fixo, sobre conteúdo rolável</h3>
      <p class="ex__desc">
        É o cenário em que o overlay quebra — o <code>DssMenu</code> teleporta
        para o <code>&lt;body&gt;</code> e a barra vive em superfície fixa. Abra
        o sub-menu e role a lista.
      </p>
      <div class="ex__palco">
        <div class="ex__sticky">
          <DssActionMenu aria-label="Ações da lista" size="sm" @action="registrar">
            <DssActionMenuItem name="filtrar" label="Filtrar" icon="filter_alt" />
            <DssActionMenuItem name="ordenar" label="Ordenar" icon="sort">
              <DssActionMenuSubItem name="mais recentes" label="Mais recentes" />
              <DssActionMenuSubItem name="mais antigos" label="Mais antigos" />
            </DssActionMenuItem>
          </DssActionMenu>
        </div>
        <ul class="ex__lista">
          <li v-for="n in 20" :key="n">Registro {{ n }}</li>
        </ul>
      </div>
    </section>

    <!-- 4 · Três marcas ------------------------------------------------------ -->
    <section class="ex__bloco">
      <h3>4. As três marcas</h3>
      <p class="ex__desc">A marca desce por <code>data-brand</code> até cada ação.</p>
      <div class="ex__marcas">
        <DssActionMenu
          v-for="m in ['hub', 'water', 'waste']"
          :key="m"
          :aria-label="`Ações — ${m}`"
          :brand="m"
          variant="unelevated"
        >
          <DssActionMenuItem name="salvar" label="Salvar" icon="save" />
          <DssActionMenuItem name="mais" label="Mais" icon="more_horiz">
            <DssActionMenuSubItem name="duplicar" label="Duplicar" />
          </DssActionMenuItem>
        </DssActionMenu>
      </div>
    </section>

    <!-- 5 · Variantes --------------------------------------------------------- -->
    <section class="ex__bloco">
      <h3>5. Variantes</h3>
      <p class="ex__desc">
        O conjunto é reduzido de propósito: <code>elevated</code> não entra —
        uma fileira de blocos elevados compete consigo mesma.
      </p>
      <div class="ex__marcas">
        <DssActionMenu
          v-for="v in ['flat', 'outline', 'unelevated']"
          :key="v"
          :aria-label="`Variante ${v}`"
          :variant="v"
        >
          <DssActionMenuItem name="a" label="Ação" icon="bolt" />
          <DssActionMenuItem name="b" label="Outra" icon="star" />
        </DssActionMenu>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DssActionMenu from './DssActionMenu.vue'
import DssActionMenuItem from './DssActionMenuItem.vue'
import DssActionMenuSubItem from './DssActionMenuSubItem.vue'

const ultimo = ref('')
function registrar(nome) { ultimo.value = nome }
</script>

<style scoped>
.ex { display: flex; flex-direction: column; gap: var(--dss-spacing-8); }
.ex__bloco { display: flex; flex-direction: column; gap: var(--dss-spacing-2); }
.ex__desc { margin: 0; color: var(--dss-text-subtle); font-size: var(--dss-font-size-sm); max-width: 62ch; }
.ex__log { margin: 0; font-size: var(--dss-font-size-sm); color: var(--dss-text-subtle); }
.ex__marcas { display: flex; flex-wrap: wrap; gap: var(--dss-spacing-4); }
.ex__palco {
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  border-radius: var(--dss-radius-sm);
  height: var(--dss-spacing-56);
  overflow-y: auto;
  background: var(--dss-surface-default);
}
.ex__sticky {
  position: sticky; top: 0; z-index: 1;
  padding: var(--dss-spacing-2);
  background: var(--dss-surface-subtle);
  border-bottom: var(--dss-border-width-thin) solid var(--dss-border-subtle);
}
.ex__lista { margin: 0; padding: var(--dss-spacing-3) var(--dss-spacing-6); }
.ex__lista li { padding: var(--dss-spacing-1) 0; color: var(--dss-text-body); }
</style>
