<template>
  <div class="pg-tile">
    <div class="pg-tile__stage" :class="align !== 'stretch' && `pg-tile__stage--${align}`">
      <slot />
    </div>
    <code class="pg-tile__code">{{ code }}</code>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    code: string
    /**
     * Alinhamento horizontal do conteúdo no stage.
     *
     * `stretch` (default) mantém o comportamento histórico: o componente ocupa a
     * largura do tile — é o certo para CAMPO (input, select, textarea), que em uso
     * real também ocupa a largura do container.
     *
     * `start`/`center` servem a componente de largura INTRÍNSECA (chip, badge,
     * botão): esticado ele mente sobre o próprio tamanho. Note que `inline-flex`
     * não protege — item de flex é blockificado, então o `inline-flex` do root vira
     * `flex` e o componente estica assim mesmo. Só o alinhamento do stage resolve.
     */
    align?: 'stretch' | 'start' | 'center'
  }>(),
  { align: 'stretch' }
)
</script>

<!-- Tile de demonstração: stage listrado (slot) + rótulo de código.
     Sem gap entre stage e code (separador justaposto). Estilo em playground.scss. -->
