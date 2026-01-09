<template>
  <div
    :class="badgeClasses"
    :style="badgeStyle"
  >
    <!-- Conteúdo do badge -->
    <slot>{{ label }}</slot>
  </div>
</template>

<script>
export default {
  name: 'DssBadge',

  props: {
    // Conteúdo
    label: {
      type: [Number, String],
      default: ''
    },

    // Cores (compatível com Quasar)
    color: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info'].includes(value)
    },
    textColor: {
      type: String,
      default: null
    },

    // Posicionamento (compatível com Quasar)
    floating: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: null,
      validator: (value) => !value || ['top', 'middle', 'bottom'].includes(value)
    },

    // Aparência (compatível com Quasar)
    transparent: {
      type: Boolean,
      default: false
    },
    multiLine: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    badgeClasses() {
      // Determina cores seguindo padrão Quasar (QBadge)
      // outline/transparent: usa text-{color}
      // normal: usa bg-{color}
      const text = this.outline === true || this.transparent === true
        ? this.color
        : this.textColor;

      let colorClasses = '';
      if (this.outline === true || this.transparent === true) {
        // outline/transparent: apenas cor de texto
        colorClasses = `text-${this.color}`;
      } else {
        // normal: background + texto branco
        colorClasses = `bg-${this.color} text-white`;
      }

      // Override de text color se especificado
      if (this.textColor) {
        colorClasses += ` text-${this.textColor}`;
      }

      return [
        'dss-badge',
        colorClasses, // Classes utilitárias (.bg-primary, .text-primary)
        {
          'dss-badge--floating': this.floating,
          'dss-badge--transparent': this.transparent,
          'dss-badge--multi-line': this.multiLine,
          'dss-badge--outline': this.outline,
          'dss-badge--rounded': this.rounded
        }
      ];
    },

    badgeStyle() {
      const style = {};

      // Vertical align (compatível com Quasar)
      if (this.align) {
        style.verticalAlign = this.align;
      }

      return style;
    }
  }
}
</script>

<!-- Estilos carregados globalmente via dss-full.css -->
