<template>
  <component
    :is="componentType"
    :type="nativeType"
    :to="to"
    :replace="replace"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :style="buttonStyle"
    :tabindex="computedTabindex"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <span v-if="loading && percentage === null" class="dss-button__loading">
      <span class="dss-button__spinner"></span>
    </span>

    <!-- Progress bar (percentage mode) -->
    <span
      v-if="loading && percentage !== null"
      class="dss-button__progress"
      :class="{ 'dss-button__progress--dark': darkPercentage }"
    >
      <span
        class="dss-button__progress-indicator"
        :style="percentageStyle"
      ></span>
    </span>

    <!-- Icon Left (before label) -->
    <span v-if="computedIconLeft && !loading" class="dss-button__icon dss-button__icon--left">
      {{ computedIconLeft }}
    </span>

    <!-- Label/Content -->
    <span v-if="label || $slots.default" class="dss-button__label">
      <slot>{{ label }}</slot>
    </span>

    <!-- Icon Right (after label) -->
    <span v-if="computedIconRight && !loading" class="dss-button__icon dss-button__icon--right">
      {{ computedIconRight }}
    </span>

    <!-- Ripple effect container (opcional) -->
    <span v-if="ripple" class="dss-button__ripple"></span>
  </component>
</template>

<script>
export default {
  name: 'DssButton',

  inheritAttrs: false,

  props: {
    // Content
    label: {
      type: String,
      default: ''
    },
    // Ícone à esquerda (compatível com Quasar)
    icon: {
      type: String,
      default: ''
    },
    // Ícone à direita (compatível com Quasar)
    iconRight: {
      type: String,
      default: ''
    },

    // Visual Variant
    variant: {
      type: String,
      default: 'elevated',
      validator: (value) => ['elevated', 'flat', 'outline', 'unelevated', 'push', 'glossy'].includes(value)
    },

    // Color
    color: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info'].includes(value)
    },

    // Size
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },

    // Shape
    round: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },

    // States
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },

    // Loading Progress (compatível com Quasar)
    percentage: {
      type: Number,
      default: null,
      validator: (value) => value === null || (value >= 0 && value <= 100)
    },
    darkPercentage: {
      type: Boolean,
      default: false
    },

    // Behavior
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },

    // Router (if using Vue Router)
    to: {
      type: [String, Object],
      default: null
    },
    replace: {
      type: Boolean,
      default: false
    },

    // Brand
    brand: {
      type: String,
      default: null,
      validator: (value) => !value || ['hub', 'water', 'waste'].includes(value)
    },

    // Dense
    dense: {
      type: Boolean,
      default: false
    },

    // No caps (disable uppercase transform)
    noCaps: {
      type: Boolean,
      default: false
    },

    // Interaction (compatível com Quasar)
    ripple: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: [Number, String],
      default: null
    },

    // Layout (compatível com Quasar)
    align: {
      type: String,
      default: 'center',
      validator: (value) => ['left', 'center', 'right', 'between', 'around', 'evenly'].includes(value)
    },
    stack: {
      type: Boolean,
      default: false
    },
    stretch: {
      type: Boolean,
      default: false
    },
    noWrap: {
      type: Boolean,
      default: false
    },
    padding: {
      type: String,
      default: null // null = usa padding padrão do DSS
    }
  },

  computed: {
    componentType() {
      if (this.to) {
        return 'router-link';
      }
      return 'button';
    },

    nativeType() {
      return this.to ? null : this.type;
    },

    // Ícone à esquerda (compatível com Quasar)
    computedIconLeft() {
      return this.icon || '';
    },

    // Ícone à direita (compatível com Quasar)
    computedIconRight() {
      return this.iconRight || '';
    },

    buttonClasses() {
      // Determina classes de cor seguindo padrão Quasar
      // flat/outline: usa text-{color}
      // outros: usa bg-{color} + text-white
      // ⚠️ EXCETO se tiver brand (brand tem prioridade)
      let colorClasses = '';

      // Se tem brand, NÃO aplicar classes utilitárias de cor
      // (brand usa CSS próprio sem !important)
      if (!this.brand) {
        if (this.variant === 'flat' || this.variant === 'outline') {
          colorClasses = `text-${this.color}`;
        } else {
          colorClasses = `bg-${this.color} text-white`;
        }
      }

      return [
        'dss-button',
        `dss-button--${this.variant}`,
        colorClasses, // Classes utilitárias (.bg-primary, .text-primary) - vazio se brand
        `dss-button--${this.size}`,
        {
          'dss-button--round': this.round,
          'dss-button--square': this.square,
          'dss-button--loading': this.loading,
          'dss-button--disabled': this.disabled,
          'dss-button--dense': this.dense,
          'dss-button--no-caps': this.noCaps,
          'dss-button--icon-only': (this.computedIconLeft || this.computedIconRight) && !this.label && !this.$slots.default,
          [`dss-button--brand-${this.brand}`]: this.brand,
          // Layout classes (compatível com Quasar)
          [`dss-button--align-${this.align}`]: this.align !== 'center',
          'dss-button--stack': this.stack,
          'dss-button--stretch': this.stretch,
          'dss-button--no-wrap': this.noWrap
        }
      ];
    },

    // Estilo inline para padding customizável (compatível com Quasar)
    buttonStyle() {
      const style = {};

      if (this.padding) {
        style.padding = this.padding;
      }

      return style;
    },

    // Barra de progresso (compatível com Quasar)
    percentageStyle() {
      if (this.percentage === null) return null;

      return {
        transform: `translateX(${this.percentage - 100}%)`
      };
    },

    // Tabindex computado (compatível com Quasar)
    computedTabindex() {
      if (this.disabled || this.loading) return -1;
      return this.tabindex !== null ? this.tabindex : 0;
    }
  },

  methods: {
    handleClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', event);
      }
    }
  }
}
</script>

<!-- Estilos carregados globalmente via dss-full.css -->
