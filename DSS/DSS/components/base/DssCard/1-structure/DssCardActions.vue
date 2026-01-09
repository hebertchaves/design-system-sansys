<template>
  <div :class="actionsClasses">
    <slot />
  </div>
</template>

<script>
/**
 * DssCardActions - LAYER 1: STRUCTURE
 *
 * Área de ações (botões) dentro do DssCard
 * Compatível com Quasar q-card-actions
 *
 * @component
 * @example
 * <DssCardActions align="right">
 *   <DssButton>Cancel</DssButton>
 *   <DssButton color="primary">Confirm</DssButton>
 * </DssCardActions>
 */
export default {
  name: 'DssCardActions',

  props: {
    /**
     * Alignment of actions
     * @values left, center, right, between, around
     */
    align: {
      type: String,
      default: 'right',
      validator: (value) => ['left', 'center', 'right', 'between', 'around'].includes(value)
    },

    /**
     * Vertical alignment (stacked buttons)
     */
    vertical: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    actionsClasses() {
      return [
        'dss-card-actions',
        `dss-card-actions--align-${this.align}`,
        {
          'dss-card-actions--vertical': this.vertical
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../DssCard.module.scss';
</style>
