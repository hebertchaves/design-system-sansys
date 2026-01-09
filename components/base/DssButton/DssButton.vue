<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :aria-busy="loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Ripple effect (opcional) -->
    <span v-if="ripple" class="dss-button__ripple" aria-hidden="true"></span>

    <!-- Loading spinner -->
    <span v-if="loading" class="dss-button__loading" aria-hidden="true">
      <svg class="dss-button__spinner" viewBox="0 0 24 24">
        <circle class="dss-button__spinner-track" cx="12" cy="12" r="10" />
        <circle class="dss-button__spinner-fill" cx="12" cy="12" r="10" />
      </svg>
    </span>

    <!-- Left icon -->
    <span v-if="icon && !loading" class="dss-button__icon dss-button__icon--left" aria-hidden="true">
      <slot name="icon">{{ icon }}</slot>
    </span>

    <!-- Label/Content -->
    <span v-if="label || $slots.default" class="dss-button__label">
      <slot>{{ label }}</slot>
    </span>

    <!-- Right icon -->
    <span v-if="iconRight" class="dss-button__icon dss-button__icon--right" aria-hidden="true">
      <slot name="icon-right">{{ iconRight }}</slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'DssButton',

  props: {
    /**
     * Button color variant
     * @values primary, secondary, tertiary, accent, dark, positive, negative, warning, info
     */
    color: {
      type: String,
      default: 'primary',
      validator: (value) => [
        'primary', 'secondary', 'tertiary', 'accent', 'dark',
        'positive', 'negative', 'warning', 'info'
      ].includes(value)
    },

    /**
     * Button size
     * @values xs, sm, md, lg, xl
     */
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },

    /**
     * Button visual variant
     * @values filled, outlined, flat, unelevated
     */
    variant: {
      type: String,
      default: 'filled',
      validator: (value) => ['filled', 'outlined', 'flat', 'unelevated'].includes(value)
    },

    /**
     * Button label text
     */
    label: {
      type: String,
      default: ''
    },

    /**
     * Left icon (Material Icons name)
     */
    icon: {
      type: String,
      default: ''
    },

    /**
     * Right icon (Material Icons name)
     */
    iconRight: {
      type: String,
      default: ''
    },

    /**
     * Loading state
     */
    loading: {
      type: Boolean,
      default: false
    },

    /**
     * Disabled state
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Disable uppercase transformation
     */
    noCaps: {
      type: Boolean,
      default: false
    },

    /**
     * Round button (circular)
     */
    round: {
      type: Boolean,
      default: false
    },

    /**
     * Dense mode (reduced padding)
     */
    dense: {
      type: Boolean,
      default: false
    },

    /**
     * Full width button
     */
    block: {
      type: Boolean,
      default: false
    },

    /**
     * HTML button type
     * @values button, submit, reset
     */
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },

    /**
     * ARIA label for accessibility
     */
    ariaLabel: {
      type: String,
      default: ''
    },

    /**
     * Enable ripple effect (vertical wave animation)
     */
    ripple: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  computed: {
    /**
     * Mapeamento de variants para classes CSS
     * "outlined" → "outline" (convenção DSS)
     */
    variantClass() {
      const variantMap = {
        'outlined': 'outline'
      };
      return variantMap[this.variant] || this.variant;
    },

    buttonClasses() {
      return [
        'dss-button',
        `dss-button--${this.color}`,
        `dss-button--${this.size}`,
        `dss-button--${this.variantClass}`,
        {
          'dss-button--loading': this.loading,
          'dss-button--disabled': this.disabled,
          'dss-button--no-caps': this.noCaps,
          'dss-button--round': this.round,
          'dss-button--dense': this.dense,
          'dss-button--block': this.block,
          'dss-button--icon-only': this.isIconOnly
        }
      ]
    },

    isIconOnly() {
      return (this.icon || this.iconRight) && !this.label && !this.$slots.default
    }
  },

  methods: {
    handleClick(event) {
      if (this.disabled || this.loading) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './DssButton.module.scss';
</style>
