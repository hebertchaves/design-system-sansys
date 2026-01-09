<template>
  <div :class="sectionClasses">
    <slot />
  </div>
</template>

<script>
/**
 * DssCardSection - LAYER 1: STRUCTURE
 *
 * Seção de conteúdo dentro do DssCard
 * Compatível com Quasar q-card-section
 *
 * @component
 * @example
 * <DssCardSection horizontal>
 *   Content here
 * </DssCardSection>
 */
export default {
  name: 'DssCardSection',

  props: {
    /**
     * Horizontal layout (flex-row)
     */
    horizontal: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    sectionClasses() {
      return [
        'dss-card-section',
        {
          'dss-card-section--horizontal': this.horizontal
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../DssCard.module.scss';
</style>
