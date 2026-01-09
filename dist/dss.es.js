import { createBlock, openBlock, resolveDynamicComponent, mergeProps, withCtx, createElementBlock, createCommentVNode, createElementVNode, normalizeClass, normalizeStyle, toDisplayString, renderSlot, createTextVNode } from "vue";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$6 = {
  name: "DssButton",
  inheritAttrs: false,
  props: {
    // Content
    label: {
      type: String,
      default: ""
    },
    // Ícone à esquerda (compatível com Quasar)
    icon: {
      type: String,
      default: ""
    },
    // Ícone à direita (compatível com Quasar)
    iconRight: {
      type: String,
      default: ""
    },
    // Visual Variant
    variant: {
      type: String,
      default: "elevated",
      validator: (value) => ["elevated", "flat", "outline", "unelevated", "push", "glossy"].includes(value)
    },
    // Color
    color: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "secondary", "tertiary", "accent", "positive", "negative", "warning", "info"].includes(value)
    },
    // Size
    size: {
      type: String,
      default: "md",
      validator: (value) => ["xs", "sm", "md", "lg", "xl"].includes(value)
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
      validator: (value) => value === null || value >= 0 && value <= 100
    },
    darkPercentage: {
      type: Boolean,
      default: false
    },
    // Behavior
    type: {
      type: String,
      default: "button",
      validator: (value) => ["button", "submit", "reset"].includes(value)
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
      validator: (value) => !value || ["hub", "water", "waste"].includes(value)
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
      default: "center",
      validator: (value) => ["left", "center", "right", "between", "around", "evenly"].includes(value)
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
      default: null
      // null = usa padding padrão do DSS
    }
  },
  computed: {
    componentType() {
      if (this.to) {
        return "router-link";
      }
      return "button";
    },
    nativeType() {
      return this.to ? null : this.type;
    },
    // Ícone à esquerda (compatível com Quasar)
    computedIconLeft() {
      return this.icon || "";
    },
    // Ícone à direita (compatível com Quasar)
    computedIconRight() {
      return this.iconRight || "";
    },
    buttonClasses() {
      let colorClasses = "";
      if (!this.brand) {
        if (this.variant === "flat" || this.variant === "outline") {
          colorClasses = `text-${this.color}`;
        } else {
          colorClasses = `bg-${this.color} text-white`;
        }
      }
      return [
        "dss-button",
        `dss-button--${this.variant}`,
        colorClasses,
        // Classes utilitárias (.bg-primary, .text-primary) - vazio se brand
        `dss-button--${this.size}`,
        {
          "dss-button--round": this.round,
          "dss-button--square": this.square,
          "dss-button--loading": this.loading,
          "dss-button--disabled": this.disabled,
          "dss-button--dense": this.dense,
          "dss-button--no-caps": this.noCaps,
          "dss-button--icon-only": (this.computedIconLeft || this.computedIconRight) && !this.label && !this.$slots.default,
          [`dss-button--brand-${this.brand}`]: this.brand,
          // Layout classes (compatível com Quasar)
          [`dss-button--align-${this.align}`]: this.align !== "center",
          "dss-button--stack": this.stack,
          "dss-button--stretch": this.stretch,
          "dss-button--no-wrap": this.noWrap
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
        this.$emit("click", event);
      }
    }
  }
};
const _hoisted_1$2 = {
  key: 0,
  class: "dss-button__loading"
};
const _hoisted_2$1 = {
  key: 2,
  class: "dss-button__icon dss-button__icon--left"
};
const _hoisted_3$1 = {
  key: 3,
  class: "dss-button__label"
};
const _hoisted_4$1 = {
  key: 4,
  class: "dss-button__icon dss-button__icon--right"
};
const _hoisted_5$1 = {
  key: 5,
  class: "dss-button__ripple"
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($options.componentType), mergeProps({
    type: $options.nativeType,
    to: $props.to,
    replace: $props.replace,
    disabled: $props.disabled || $props.loading,
    class: $options.buttonClasses,
    style: $options.buttonStyle,
    tabindex: $options.computedTabindex
  }, _ctx.$attrs, { onClick: $options.handleClick }), {
    default: withCtx(() => [
      $props.loading && $props.percentage === null ? (openBlock(), createElementBlock("span", _hoisted_1$2, [..._cache[0] || (_cache[0] = [
        createElementVNode("span", { class: "dss-button__spinner" }, null, -1)
      ])])) : createCommentVNode("", true),
      $props.loading && $props.percentage !== null ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass(["dss-button__progress", { "dss-button__progress--dark": $props.darkPercentage }])
      }, [
        createElementVNode("span", {
          class: "dss-button__progress-indicator",
          style: normalizeStyle($options.percentageStyle)
        }, null, 4)
      ], 2)) : createCommentVNode("", true),
      $options.computedIconLeft && !$props.loading ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString($options.computedIconLeft), 1)) : createCommentVNode("", true),
      $props.label || _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_3$1, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString($props.label), 1)
        ])
      ])) : createCommentVNode("", true),
      $options.computedIconRight && !$props.loading ? (openBlock(), createElementBlock("span", _hoisted_4$1, toDisplayString($options.computedIconRight), 1)) : createCommentVNode("", true),
      $props.ripple ? (openBlock(), createElementBlock("span", _hoisted_5$1)) : createCommentVNode("", true)
    ]),
    _: 3
  }, 16, ["type", "to", "replace", "disabled", "class", "style", "tabindex", "onClick"]);
}
const DssButton = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const _sfc_main$5 = {
  name: "DssBadge",
  props: {
    // Conteúdo
    label: {
      type: [Number, String],
      default: ""
    },
    // Cores (compatível com Quasar)
    color: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "secondary", "tertiary", "accent", "positive", "negative", "warning", "info"].includes(value)
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
      validator: (value) => !value || ["top", "middle", "bottom"].includes(value)
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
      this.outline === true || this.transparent === true ? this.color : this.textColor;
      let colorClasses = "";
      if (this.outline === true || this.transparent === true) {
        colorClasses = `text-${this.color}`;
      } else {
        colorClasses = `bg-${this.color} text-white`;
      }
      if (this.textColor) {
        colorClasses += ` text-${this.textColor}`;
      }
      return [
        "dss-badge",
        colorClasses,
        // Classes utilitárias (.bg-primary, .text-primary)
        {
          "dss-badge--floating": this.floating,
          "dss-badge--transparent": this.transparent,
          "dss-badge--multi-line": this.multiLine,
          "dss-badge--outline": this.outline,
          "dss-badge--rounded": this.rounded
        }
      ];
    },
    badgeStyle() {
      const style = {};
      if (this.align) {
        style.verticalAlign = this.align;
      }
      return style;
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.badgeClasses),
    style: normalizeStyle($options.badgeStyle)
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createTextVNode(toDisplayString($props.label), 1)
    ])
  ], 6);
}
const DssBadge = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const _sfc_main$4 = {
  name: "DssAvatar",
  props: {
    // Tamanho (compatível com Quasar - aceita qualquer unidade CSS)
    size: {
      type: String,
      default: null
      // null = usa tamanho padrão (48px)
    },
    // Tipografia
    fontSize: {
      type: String,
      default: null
    },
    // Cores (compatível com Quasar)
    color: {
      type: String,
      default: null,
      validator: (value) => !value || ["primary", "secondary", "tertiary", "accent", "positive", "negative", "warning", "info"].includes(value)
    },
    textColor: {
      type: String,
      default: null
    },
    // Ícone
    icon: {
      type: String,
      default: null
    },
    // Forma (compatível com Quasar)
    square: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    avatarClasses() {
      let colorClasses = "";
      if (this.color) {
        colorClasses = `bg-${this.color} text-white`;
      }
      if (this.textColor) {
        colorClasses += ` text-${this.textColor}`;
      }
      return [
        "dss-avatar",
        colorClasses,
        // Classes utilitárias (.bg-primary, .text-primary)
        {
          "dss-avatar--square": this.square,
          "dss-avatar--rounded": this.rounded
        }
      ];
    },
    avatarStyle() {
      const style = {};
      if (this.size) {
        style.width = this.size;
        style.height = this.size;
      }
      return style;
    },
    contentStyle() {
      const style = {};
      if (this.fontSize) {
        style.fontSize = this.fontSize;
      }
      return style;
    }
  }
};
const _hoisted_1$1 = {
  key: 0,
  class: "dss-avatar__icon material-icons"
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.avatarClasses),
    style: normalizeStyle($options.avatarStyle)
  }, [
    $props.icon ? (openBlock(), createElementBlock("span", _hoisted_1$1, toDisplayString($props.icon), 1)) : createCommentVNode("", true),
    !$props.icon ? (openBlock(), createElementBlock("div", {
      key: 1,
      style: normalizeStyle($options.contentStyle),
      class: "dss-avatar__content"
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 4)) : createCommentVNode("", true)
  ], 6);
}
const DssAvatar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = {
  name: "DssCard",
  props: {
    /**
     * Visual variant of the card
     * @values elevated, flat, bordered, outlined
     */
    variant: {
      type: String,
      default: "elevated",
      validator: (value) => ["elevated", "flat", "bordered", "outlined"].includes(value)
    },
    /**
     * Remove border-radius (square corners)
     */
    square: {
      type: Boolean,
      default: false
    },
    /**
     * Make card clickable (adds hover effects)
     */
    clickable: {
      type: Boolean,
      default: false
    },
    /**
     * Dark mode variant
     */
    dark: {
      type: Boolean,
      default: false
    },
    /**
     * Brand variant (Hub, Water, Waste)
     * @values null, hub, water, waste
     */
    brand: {
      type: String,
      default: null,
      validator: (value) => !value || ["hub", "water", "waste"].includes(value)
    }
  },
  emits: ["click"],
  computed: {
    cardClasses() {
      return [
        "dss-card",
        `dss-card--${this.variant}`,
        {
          "dss-card--square": this.square,
          "dss-card--clickable": this.clickable,
          "dss-card--dark": this.dark,
          [`dss-card--brand-${this.brand}`]: this.brand
        }
      ];
    },
    cardStyles() {
      return {};
    }
  },
  methods: {
    handleClick(event) {
      if (this.clickable) {
        this.$emit("click", event);
      }
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    class: $options.cardClasses,
    style: $options.cardStyles
  }, _ctx.$attrs, {
    onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClick && $options.handleClick(...args))
  }), [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 16);
}
const DssCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-8d3b76e3"]]);
const _sfc_main$2 = {
  name: "DssCardSection",
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
        "dss-card-section",
        {
          "dss-card-section--horizontal": this.horizontal
        }
      ];
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.sectionClasses)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
const DssCardSection = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-a4819ae3"]]);
const _sfc_main$1 = {
  name: "DssCardActions",
  props: {
    /**
     * Alignment of actions
     * @values left, center, right, between, around
     */
    align: {
      type: String,
      default: "right",
      validator: (value) => ["left", "center", "right", "between", "around"].includes(value)
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
        "dss-card-actions",
        `dss-card-actions--align-${this.align}`,
        {
          "dss-card-actions--vertical": this.vertical
        }
      ];
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.actionsClasses)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
const DssCardActions = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-fa8188fe"]]);
const style0 = {
  "dss-input": "_dss-input_dqnng_32",
  "dss-input__field": "_dss-input__field_dqnng_43",
  "dss-input--dense": "_dss-input--dense_dqnng_54",
  "dss-input__control": "_dss-input__control_dqnng_61",
  "dss-input__label": "_dss-input__label_dqnng_77",
  "dss-input__label--float": "_dss-input__label--float_dqnng_90",
  "dss-input__label--stack": "_dss-input__label--stack_dqnng_97",
  "dss-input__native": "_dss-input__native_dqnng_107",
  "dss-input--disabled": "_dss-input--disabled_dqnng_137",
  "dss-input--readonly": "_dss-input--readonly_dqnng_143",
  "dss-input__before": "_dss-input__before_dqnng_150",
  "dss-input__after": "_dss-input__after_dqnng_151",
  "dss-input__prepend": "_dss-input__prepend_dqnng_152",
  "dss-input__append": "_dss-input__append_dqnng_153",
  "dss-input__clear": "_dss-input__clear_dqnng_173",
  "dss-input__bottom": "_dss-input__bottom_dqnng_201",
  "dss-input__hint": "_dss-input__hint_dqnng_210",
  "dss-input__error": "_dss-input__error_dqnng_214",
  "dss-input--loading": "_dss-input--loading_dqnng_232",
  "dss-input-spin": "_dss-input-spin_dqnng_1",
  "dss-input--filled": "_dss-input--filled_dqnng_268",
  "dss-input--focused": "_dss-input--focused_dqnng_276",
  "dss-input--error": "_dss-input--error_dqnng_284",
  "dss-input--outlined": "_dss-input--outlined_dqnng_319",
  "dss-input--standout": "_dss-input--standout_dqnng_377",
  "dss-input--borderless": "_dss-input--borderless_dqnng_448",
  "dss-input--brand-hub": "_dss-input--brand-hub_dqnng_622",
  "dss-input--brand-water": "_dss-input--brand-water_dqnng_661",
  "dss-input--brand-waste": "_dss-input--brand-waste_dqnng_692"
};
const _sfc_main = {
  name: "DssInput",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    variant: {
      type: String,
      default: "outlined",
      validator: (value) => ["filled", "outlined", "standout", "borderless"].includes(value)
    },
    type: {
      type: String,
      default: "text"
    },
    label: {
      type: String,
      default: ""
    },
    stackLabel: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    brand: {
      type: String,
      default: null,
      validator: (value) => !value || ["hub", "water", "waste"].includes(value)
    }
  },
  data() {
    return {
      isFocused: false
    };
  },
  computed: {
    wrapperClasses() {
      return [
        "dss-input",
        `dss-input--${this.variant}`,
        {
          "dss-input--focused": this.isFocused,
          "dss-input--error": this.error,
          "dss-input--disabled": this.disabled,
          "dss-input--readonly": this.readonly,
          "dss-input--dense": this.dense,
          "dss-input--loading": this.loading,
          "dss-input--filled": this.hasValue,
          [`dss-input--brand-${this.brand}`]: this.brand
        }
      ];
    },
    labelClasses() {
      return [
        "dss-input__label",
        {
          "dss-input__label--stack": this.stackLabel,
          "dss-input__label--float": this.hasValue || this.isFocused
        }
      ];
    },
    inputClasses() {
      return "dss-input__native";
    },
    hasValue() {
      return this.modelValue !== "" && this.modelValue !== null && this.modelValue !== void 0;
    },
    hasBottomSlot() {
      return this.error && this.errorMessage || this.hint || this.$slots.error || this.$slots.hint;
    }
  },
  methods: {
    handleInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    handleFocus(event) {
      this.isFocused = true;
      this.$emit("focus", event);
    },
    handleBlur(event) {
      this.isFocused = false;
      this.$emit("blur", event);
    },
    handleClear() {
      this.$emit("update:modelValue", "");
      this.$refs.inputRef.focus();
    },
    focus() {
      var _a;
      (_a = this.$refs.inputRef) == null ? void 0 : _a.focus();
    },
    blur() {
      var _a;
      (_a = this.$refs.inputRef) == null ? void 0 : _a.blur();
    }
  }
};
const _hoisted_1 = {
  key: 0,
  class: "dss-input__before"
};
const _hoisted_2 = { class: "dss-input__field" };
const _hoisted_3 = {
  key: 0,
  class: "dss-input__prepend"
};
const _hoisted_4 = { class: "dss-input__control" };
const _hoisted_5 = ["type", "value", "placeholder", "disabled", "readonly"];
const _hoisted_6 = {
  key: 1,
  class: "dss-input__append"
};
const _hoisted_7 = {
  key: 1,
  class: "dss-input__after"
};
const _hoisted_8 = {
  key: 2,
  class: "dss-input__bottom"
};
const _hoisted_9 = {
  key: 0,
  class: "dss-input__error"
};
const _hoisted_10 = {
  key: 1,
  class: "dss-input__hint"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.wrapperClasses)
  }, [
    _ctx.$slots.before ? (openBlock(), createElementBlock("div", _hoisted_1, [
      renderSlot(_ctx.$slots, "before")
    ])) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_2, [
      _ctx.$slots.prepend ? (openBlock(), createElementBlock("div", _hoisted_3, [
        renderSlot(_ctx.$slots, "prepend")
      ])) : createCommentVNode("", true),
      createElementVNode("div", _hoisted_4, [
        $props.label || _ctx.$slots.label ? (openBlock(), createElementBlock("label", {
          key: 0,
          class: normalizeClass($options.labelClasses)
        }, [
          renderSlot(_ctx.$slots, "label", {}, () => [
            createTextVNode(toDisplayString($props.label), 1)
          ])
        ], 2)) : createCommentVNode("", true),
        createElementVNode("input", mergeProps({
          ref: "inputRef",
          type: $props.type,
          value: $props.modelValue,
          placeholder: $props.placeholder,
          disabled: $props.disabled,
          readonly: $props.readonly,
          class: $options.inputClasses
        }, _ctx.$attrs, {
          onInput: _cache[0] || (_cache[0] = (...args) => $options.handleInput && $options.handleInput(...args)),
          onFocus: _cache[1] || (_cache[1] = (...args) => $options.handleFocus && $options.handleFocus(...args)),
          onBlur: _cache[2] || (_cache[2] = (...args) => $options.handleBlur && $options.handleBlur(...args))
        }), null, 16, _hoisted_5)
      ]),
      _ctx.$slots.append || $props.clearable ? (openBlock(), createElementBlock("div", _hoisted_6, [
        renderSlot(_ctx.$slots, "append"),
        $props.clearable && $props.modelValue ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "dss-input__clear",
          type: "button",
          onClick: _cache[3] || (_cache[3] = (...args) => $options.handleClear && $options.handleClear(...args)),
          "aria-label": "Clear input"
        }, " × ")) : createCommentVNode("", true)
      ])) : createCommentVNode("", true)
    ]),
    _ctx.$slots.after ? (openBlock(), createElementBlock("div", _hoisted_7, [
      renderSlot(_ctx.$slots, "after")
    ])) : createCommentVNode("", true),
    $options.hasBottomSlot ? (openBlock(), createElementBlock("div", _hoisted_8, [
      $props.error && $props.errorMessage ? (openBlock(), createElementBlock("div", _hoisted_9, [
        renderSlot(_ctx.$slots, "error", {}, () => [
          createTextVNode(toDisplayString($props.errorMessage), 1)
        ])
      ])) : $props.hint ? (openBlock(), createElementBlock("div", _hoisted_10, [
        renderSlot(_ctx.$slots, "hint", {}, () => [
          createTextVNode(toDisplayString($props.hint), 1)
        ])
      ])) : createCommentVNode("", true)
    ])) : createCommentVNode("", true)
  ], 2);
}
const cssModules = {
  "$style": style0
};
const DssInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
const DesignSystemSansys = {
  install(app, options = {}) {
    app.component("DssButton", DssButton);
    app.component("DssBadge", DssBadge);
    app.component("DssAvatar", DssAvatar);
    app.component("DssCard", DssCard);
    app.component("DssCardSection", DssCardSection);
    app.component("DssCardActions", DssCardActions);
    app.component("DssInput", DssInput);
    if (options.brand) {
      app.provide("dss-default-brand", options.brand);
    }
    if (options.theme) {
      app.provide("dss-default-theme", options.theme);
    }
    if (process.env.NODE_ENV !== "production") {
      console.log("✅ Design System Sansys instalado com sucesso!");
      console.log("📦 Componentes registrados:", [
        "DssButton",
        "DssBadge",
        "DssAvatar",
        "DssCard",
        "DssCardSection",
        "DssCardActions",
        "DssInput"
      ]);
      if (options.brand) {
        console.log("🎨 Brand padrão:", options.brand);
      }
    }
  }
};
/**
 * ==========================================================================
 * DESIGN SYSTEM SANSYS (DSS) v2.0
 * Sistema de Design profissional com componentes Vue 3
 * ==========================================================================
 *
 * @author Hebert Daniel Oliveira Chaves
 * @license MIT
 * @version 2.0.0
 *
 * @description
 * Design System completo baseado em tokens semânticos, com componentes
 * Vue 3, acessibilidade WCAG 2.1 AA e brandabilidade (Hub, Water, Waste).
 *
 * @features
 * - ✅ Componentes Vue 3 (Composition API + Options API)
 * - ✅ Tokens DSS (cores, spacing, typography, etc.)
 * - ✅ Acessibilidade WCAG 2.1 AA
 * - ✅ Brandabilidade (Hub 🟠, Water 🔵, Waste 🟢)
 * - ✅ Dark Mode Support
 * - ✅ TypeScript ready
 * - ✅ Tree-shakeable
 *
 * @usage
 *
 * // 1. Instalação global (todos os componentes)
 * import DesignSystemSansys from '@sansys/design-system'
 * import '@sansys/design-system/css'
 *
 * app.use(DesignSystemSansys, {
 *   brand: 'hub' // opcional
 * })
 *
 * // 2. Importação individual (tree-shaking)
 * import { DssButton, DssCard, DssInput } from '@sansys/design-system'
 * import '@sansys/design-system/css'
 *
 * ==========================================================================
 */
const version = "2.2.0";
const metadata = {
  name: "Design System Sansys",
  version: "2.2.0",
  description: "Sistema de Design profissional com componentes Vue 3 e tokens DSS",
  author: "Hebert Daniel Oliveira Chaves",
  license: "MIT",
  components: [
    "DssButton",
    "DssBadge",
    "DssAvatar",
    "DssCard",
    "DssCardSection",
    "DssCardActions",
    "DssInput"
  ],
  brands: ["hub", "water", "waste"],
  accessibility: "WCAG 2.1 AA",
  frameworks: ["Vue 3"]
};
export {
  DssAvatar,
  DssBadge,
  DssButton,
  DssCard,
  DssCardActions,
  DssCardSection,
  DssInput,
  DesignSystemSansys as default,
  metadata,
  version
};
//# sourceMappingURL=dss.es.js.map
