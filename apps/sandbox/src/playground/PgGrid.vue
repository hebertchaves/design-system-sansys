<template>
  <div
    class="pg-grid"
    :data-cols="colunas || undefined"
    :style="colunas ? { '--pg-cols': colunas } : undefined"
  >
    <slot />
  </div>
</template>

<script setup>
/**
 * Wrapper de grid de tiles. A apresentação mora em playground.scss (.pg-grid).
 *
 * `cols` ERA UMA MENTIRA e virou contrato.
 *
 * Seis seções do TestDataCard escreviam `<PgGrid :cols="1">` esperando uma
 * coluna; o componente não declarava a prop, então `cols` caía como atributo
 * HTML no `<div>` e não fazia NADA. O grid continuava em `auto-fill` de 280px,
 * e um único tile ocupava a PRIMEIRA faixa de ~290px numa área de 1250px — o
 * cartão aparecia espremido com o resto da linha vazio.
 *
 * O defeito era mudo: nenhum erro, nenhum aviso, e a seção até parecia "um
 * componente por linha" porque só havia um tile.
 *
 * COMO `cols` SE COMPORTA
 *
 * É um TETO, não um número fixo. O piso de legibilidade (280px, 320px no modo
 * confortável) continua valendo: numa faixa estreita o grid entrega menos
 * colunas que o pedido em vez de espremer o conteúdo. A conta está no SCSS,
 * porque é lá que `100%` conhece a largura real do contêiner.
 *
 * Sem `cols`, nada muda: `auto-fill` com o piso, que é o default de 262 usos.
 */
defineOptions({ name: 'PgGrid' })

const props = defineProps({
  /**
   * Teto de colunas. Ausente: `auto-fill` pelo piso de legibilidade.
   * `1` equivale a `class="pg-grid--full"`.
   */
  cols: { type: [Number, String], default: null },
})

// Normaliza para número: o template escreve `:cols="1"` (número) e também
// `cols="1"` (string) — e `repeat()` não aceita string com aspas.
const colunas = Number(props.cols) > 0 ? Number(props.cols) : null
</script>
