import { computed as o, defineComponent as A, useSlots as M, createBlock as W, openBlock as d, resolveDynamicComponent as j, unref as r, mergeProps as I, withCtx as X, createElementBlock as i, createCommentVNode as u, createElementVNode as p, normalizeClass as $, normalizeStyle as x, toDisplayString as y, renderSlot as b, createTextVNode as z, ref as P, useAttrs as Y, withKeys as q, withModifiers as T } from "vue";
function ee(e, a) {
  return {
    buttonClasses: o(() => {
      let s = "";
      e.brand || (e.variant === "flat" || e.variant === "outline" ? s = `text-${e.color}` : s = `bg-${e.color} text-white`);
      const l = !!(e.label || a.hasDefaultSlot.value), c = !!(e.icon || e.iconRight) && !l;
      return [
        // Classe base
        "dss-button",
        // Variante visual
        `dss-button--${e.variant}`,
        // Classes de cor (utilitárias DSS)
        s,
        // Tamanho
        `dss-button--${e.size}`,
        // Classes condicionais
        {
          "dss-button--round": e.round,
          "dss-button--square": e.square,
          "dss-button--loading": e.loading,
          "dss-button--disabled": e.disabled,
          "dss-button--dense": e.dense,
          "dss-button--no-caps": e.noCaps,
          "dss-button--icon-only": c,
          // Brand
          [`dss-button--brand-${e.brand}`]: !!e.brand,
          // Layout
          [`dss-button--align-${e.align}`]: e.align !== "center",
          "dss-button--stack": e.stack,
          "dss-button--stretch": e.stretch,
          "dss-button--no-wrap": e.noWrap
        }
      ];
    })
  };
}
function te(e) {
  const a = o(() => e.to ? "router-link" : "button"), t = o(() => e.to ? null : e.type || "button");
  return {
    componentType: a,
    nativeType: t
  };
}
function ae(e) {
  return {
    percentageStyle: o(() => e.percentage === null || e.percentage === void 0 ? null : {
      transform: `translateX(${e.percentage - 100}%)`
    })
  };
}
const se = {
  key: 0,
  class: "dss-button__loading",
  role: "status",
  "aria-label": "Loading",
  "aria-live": "polite"
}, ne = ["aria-valuenow", "aria-label"], le = {
  key: 2,
  class: "dss-button__icon dss-button__icon--left",
  "aria-hidden": "true"
}, de = {
  key: 3,
  class: "dss-button__label"
}, ie = {
  key: 4,
  class: "dss-button__icon dss-button__icon--right",
  "aria-hidden": "true"
}, oe = {
  key: 5,
  class: "dss-button__ripple",
  "aria-hidden": "true"
}, $t = /* @__PURE__ */ A({
  name: "DssButton",
  inheritAttrs: !1,
  __name: "DssButton.ts",
  props: {
    label: { default: "" },
    icon: { default: "" },
    iconRight: { default: "" },
    variant: { default: "elevated" },
    color: { default: "primary" },
    size: { default: "md" },
    round: { type: Boolean, default: !1 },
    square: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    percentage: { default: null },
    darkPercentage: { type: Boolean, default: !1 },
    type: { default: "button" },
    to: { default: null },
    replace: { type: Boolean, default: !1 },
    brand: { default: null },
    dense: { type: Boolean, default: !1 },
    noCaps: { type: Boolean, default: !1 },
    align: { default: "center" },
    stack: { type: Boolean, default: !1 },
    stretch: { type: Boolean, default: !1 },
    noWrap: { type: Boolean, default: !1 },
    padding: { default: null },
    ripple: { type: Boolean, default: !1 },
    tabindex: { default: null },
    ariaLabel: { default: void 0 }
  },
  emits: ["click"],
  setup(e, { emit: a }) {
    const t = e, s = a, l = M(), n = o(() => !!l.default), { componentType: c, nativeType: v } = te(t), { buttonClasses: g } = ee(t, { hasDefaultSlot: n }), { percentageStyle: f } = ae(t), k = o(() => t.icon || ""), h = o(() => t.iconRight || ""), m = o(() => {
      const C = {};
      return t.padding && (C.padding = t.padding), C;
    }), w = o(() => t.disabled || t.loading ? -1 : t.tabindex !== null && t.tabindex !== void 0 ? typeof t.tabindex == "number" ? t.tabindex : parseInt(t.tabindex) : 0);
    function V(C) {
      !t.disabled && !t.loading && s("click", C);
    }
    return (C, R) => (d(), W(j(r(c)), I({
      type: r(v),
      to: e.to,
      replace: e.replace,
      disabled: e.disabled || e.loading,
      class: r(g),
      style: m.value,
      tabindex: w.value,
      "aria-label": e.ariaLabel,
      "aria-busy": e.loading ? "true" : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, C.$attrs, { onClick: V }), {
      default: X(() => [
        e.loading && e.percentage === null ? (d(), i("span", se, [...R[0] || (R[0] = [
          p("span", {
            class: "dss-button__spinner",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : u("", !0),
        e.loading && e.percentage !== null ? (d(), i("span", {
          key: 1,
          class: $(["dss-button__progress", { "dss-button__progress--dark": e.darkPercentage }]),
          role: "progressbar",
          "aria-valuenow": e.percentage,
          "aria-valuemin": "0",
          "aria-valuemax": "100",
          "aria-label": `Loading ${e.percentage}%`
        }, [
          p("span", {
            class: "dss-button__progress-indicator",
            style: x(r(f)),
            "aria-hidden": "true"
          }, null, 4)
        ], 10, ne)) : u("", !0),
        k.value && !e.loading ? (d(), i("span", le, y(k.value), 1)) : u("", !0),
        e.label || C.$slots.default ? (d(), i("span", de, [
          b(C.$slots, "default", {}, () => [
            z(y(e.label), 1)
          ])
        ])) : u("", !0),
        h.value && !e.loading ? (d(), i("span", ie, y(h.value), 1)) : u("", !0),
        e.ripple ? (d(), i("span", oe)) : u("", !0)
      ]),
      _: 3
    }, 16, ["type", "to", "replace", "disabled", "class", "style", "tabindex", "aria-label", "aria-busy", "aria-disabled"]));
  }
});
function re(e) {
  return {
    badgeClasses: o(() => {
      let t = "";
      return e.brand || (e.outline || e.transparent ? t = `text-${e.color}` : t = `bg-${e.color} text-white`, e.textColor && (t += ` text-${e.textColor}`)), [
        // Classe base
        "dss-badge",
        // Classes de cor (utilitárias DSS)
        t,
        // Classes condicionais
        {
          "dss-badge--floating": e.floating,
          "dss-badge--transparent": e.transparent,
          "dss-badge--multi-line": e.multiLine,
          "dss-badge--outline": e.outline,
          "dss-badge--rounded": e.rounded,
          // Brand
          [`dss-badge--brand-${e.brand}`]: !!e.brand
        }
      ];
    })
  };
}
const ue = ["aria-label"], ce = /* @__PURE__ */ A({
  name: "DssBadge",
  __name: "DssBadge.ts",
  props: {
    label: { default: "" },
    color: { default: "primary" },
    textColor: { default: null },
    transparent: { type: Boolean, default: !1 },
    outline: { type: Boolean, default: !1 },
    rounded: { type: Boolean, default: !1 },
    multiLine: { type: Boolean, default: !1 },
    floating: { type: Boolean, default: !1 },
    align: { default: null },
    brand: { default: null },
    ariaLabel: { default: void 0 }
  },
  setup(e) {
    const a = e, { badgeClasses: t } = re(a), s = o(() => {
      const l = {};
      return a.align && (l.verticalAlign = a.align), l;
    });
    return (l, n) => (d(), i("div", {
      class: $(r(t)),
      style: x(s.value),
      role: "status",
      "aria-label": e.ariaLabel,
      "aria-live": "polite"
    }, [
      b(l.$slots, "default", {}, () => [
        z(y(e.label), 1)
      ])
    ], 14, ue));
  }
}), Bt = ce;
function fe(e) {
  return {
    avatarClasses: o(() => {
      let t = "";
      return e.color && (t = `bg-${e.color} text-white`), e.textColor && (t += ` text-${e.textColor}`), [
        // Classe base
        "dss-avatar",
        // Classes de cor (utilitárias DSS)
        t,
        // Classe de tamanho predefinido
        {
          "dss-avatar--xs": e.size === "xs",
          "dss-avatar--sm": e.size === "sm",
          "dss-avatar--md": e.size === "md" || !e.size,
          "dss-avatar--lg": e.size === "lg",
          "dss-avatar--xl": e.size === "xl"
        },
        // Classes condicionais de forma
        {
          "dss-avatar--square": e.square,
          "dss-avatar--rounded": e.rounded
        },
        // Classes de brand (Sansys)
        {
          "dss-avatar--brand-hub": e.brand === "hub",
          "dss-avatar--brand-water": e.brand === "water",
          "dss-avatar--brand-waste": e.brand === "waste"
        },
        // Classes de status
        {
          "dss-avatar--with-status": !!e.status
        }
      ];
    })
  };
}
const be = {
  xs: "16px",
  sm: "20px",
  md: "24px",
  lg: "32px",
  xl: "48px"
}, he = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px"
};
function N(e) {
  return ["xs", "sm", "md", "lg", "xl"].includes(e);
}
function ye(e) {
  const a = o(() => {
    const l = {};
    return e.size && !N(e.size) && (l.width = e.size, l.height = e.size), e.square ? l.borderRadius = "0" : e.rounded && (l.borderRadius = "var(--dss-radius-md)"), l;
  }), t = o(() => {
    const l = {};
    if (e.size)
      if (N(e.size))
        l.fontSize = be[e.size];
      else {
        const n = parseFloat(e.size);
        if (!isNaN(n)) {
          const c = n * 0.5;
          l.fontSize = `${c}px`;
        }
      }
    return l;
  }), s = o(() => {
    const l = {};
    return e.fontSize ? l.fontSize = e.fontSize : e.size && N(e.size) && (l.fontSize = he[e.size]), l;
  });
  return {
    avatarStyle: a,
    iconStyle: t,
    contentStyle: s
  };
}
const ve = ["role", "aria-label"], ge = ["aria-label"], me = /* @__PURE__ */ A({
  name: "DssAvatar",
  __name: "DssAvatar.ts",
  props: {
    size: { default: "md" },
    fontSize: { default: null },
    color: { default: "primary" },
    textColor: { default: null },
    brand: { default: null },
    icon: { default: null },
    square: { type: Boolean, default: !1 },
    rounded: { type: Boolean, default: !1 },
    status: { default: null },
    ariaLabel: { default: void 0 },
    alt: { default: void 0 }
  },
  emits: ["click"],
  setup(e, { expose: a, emit: t }) {
    const s = e, l = t, n = P(null), { avatarClasses: c } = fe(s), { avatarStyle: v, iconStyle: g, contentStyle: f } = ye(s), k = (h) => {
      l("click", h);
    };
    return a({
      rootRef: n
    }), (h, m) => (d(), i("div", {
      ref_key: "rootRef",
      ref: n,
      class: $(r(c)),
      style: x(r(v)),
      role: e.ariaLabel ? "img" : void 0,
      "aria-label": e.ariaLabel,
      onClick: k
    }, [
      e.icon ? (d(), i("span", {
        key: 0,
        class: "dss-avatar__icon material-icons",
        style: x(r(g)),
        "aria-hidden": "true"
      }, y(e.icon), 5)) : u("", !0),
      e.icon ? u("", !0) : (d(), i("div", {
        key: 1,
        style: x(r(f)),
        class: "dss-avatar__content"
      }, [
        b(h.$slots, "default")
      ], 4)),
      e.status ? (d(), i("span", {
        key: 2,
        class: $(["dss-avatar__status", `dss-avatar__status--${e.status}`]),
        "aria-label": `Status: ${e.status}`
      }, null, 10, ge)) : u("", !0)
    ], 14, ve));
  }
}), pt = me;
function Ce(e) {
  return {
    cardClasses: o(() => [
      // Classe base
      "dss-card",
      // Variante visual
      `dss-card--${e.variant}`,
      // Classes condicionais
      {
        "dss-card--square": e.square,
        "dss-card--clickable": e.clickable,
        "dss-card--dark": e.dark,
        [`dss-card--brand-${e.brand}`]: e.brand
      }
    ])
  };
}
function ke(e, a) {
  return {
    cardAttrs: o(() => {
      const s = { ...a };
      return e.clickable && (s.tabindex = s.tabindex ?? "0", s.role = s.role ?? "article"), s;
    })
  };
}
function _e(e, a) {
  return {
    handleClick: (l) => {
      e.clickable && a("click", l);
    },
    handleKeydown: (l) => {
      e.clickable && a("click", l);
    }
  };
}
function Se(e) {
  return {
    sectionClasses: o(() => [
      // Classe base
      "dss-card-section",
      // Classes condicionais
      {
        "dss-card-section--horizontal": e.horizontal
      }
    ])
  };
}
function $e(e) {
  return {
    actionsClasses: o(() => [
      // Classe base
      "dss-card-actions",
      // Alinhamento horizontal
      `dss-card-actions--align-${e.align}`,
      // Classes condicionais
      {
        "dss-card-actions--vertical": e.vertical
      }
    ])
  };
}
const Be = /* @__PURE__ */ A({
  name: "DssCard",
  inheritAttrs: !1,
  __name: "DssCard.ts",
  props: {
    variant: { default: "elevated" },
    square: { type: Boolean, default: !1 },
    dark: { type: Boolean, default: !1 },
    brand: { default: null },
    clickable: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(e, { emit: a }) {
    const t = e, s = a, l = Y(), { cardClasses: n } = Ce(t), { cardAttrs: c } = ke(t, l), { handleClick: v, handleKeydown: g } = _e(t, s), f = o(() => ({}));
    return (k, h) => (d(), i("div", I({
      class: r(n),
      style: f.value
    }, r(c), {
      onClick: h[0] || (h[0] = //@ts-ignore
      (...m) => r(v) && r(v)(...m)),
      onKeydown: [
        h[1] || (h[1] = q(
          //@ts-ignore
          (...m) => r(g) && r(g)(...m),
          ["enter"]
        )),
        h[2] || (h[2] = q(T(
          //@ts-ignore
          (...m) => r(g) && r(g)(...m),
          ["prevent"]
        ), ["space"]))
      ]
    }), [
      b(k.$slots, "default", {}, void 0, !0)
    ], 16));
  }
}), D = (e, a) => {
  const t = e.__vccOpts || e;
  for (const [s, l] of a)
    t[s] = l;
  return t;
}, xt = /* @__PURE__ */ D(Be, [["__scopeId", "data-v-9c3f7e07"]]), pe = /* @__PURE__ */ A({
  name: "DssCardSection",
  inheritAttrs: !1,
  __name: "DssCardSection.ts",
  props: {
    horizontal: { type: Boolean, default: !1 }
  },
  setup(e) {
    const a = e, { sectionClasses: t } = Se(a);
    return (s, l) => (d(), i("div", I({ class: r(t) }, s.$attrs), [
      b(s.$slots, "default", {}, void 0, !0)
    ], 16));
  }
}), Dt = /* @__PURE__ */ D(pe, [["__scopeId", "data-v-9b69ab59"]]), xe = /* @__PURE__ */ A({
  name: "DssCardActions",
  inheritAttrs: !1,
  __name: "DssCardActions.ts",
  props: {
    align: { default: "right" },
    vertical: { type: Boolean, default: !1 }
  },
  setup(e) {
    const a = e, { actionsClasses: t } = $e(a);
    return (s, l) => (d(), i("div", I({ class: r(t) }, s.$attrs), [
      b(s.$slots, "default", {}, void 0, !0)
    ], 16));
  }
}), zt = /* @__PURE__ */ D(xe, [["__scopeId", "data-v-5896aec0"]]);
function De(e, { isFocused: a, hasValue: t }) {
  const s = o(() => [
    // Classe base
    "dss-input",
    // Variante visual
    `dss-input--${e.variant}`,
    // Classes condicionais de estado
    {
      "dss-input--focused": a.value,
      "dss-input--error": e.error,
      "dss-input--disabled": e.disabled,
      "dss-input--readonly": e.readonly,
      "dss-input--dense": e.dense,
      "dss-input--loading": e.loading,
      "dss-input--filled": t.value,
      [`dss-input--brand-${e.brand}`]: e.brand
    }
  ]), l = o(() => [
    // Classe base
    "dss-input__label",
    // Classes condicionais
    {
      "dss-input__label--stack": e.stackLabel,
      "dss-input__label--float": t.value || a.value
    }
  ]), n = o(() => "dss-input__native");
  return {
    wrapperClasses: s,
    labelClasses: l,
    inputClasses: n
  };
}
function ze(e, a) {
  const t = P(!1), s = o(() => e.modelValue !== "" && e.modelValue !== null && e.modelValue !== void 0), l = o(() => e.error && e.errorMessage || e.hint || !!a.error || !!a.hint);
  return {
    isFocused: t,
    hasValue: s,
    hasBottomSlot: l
  };
}
function Ae(e, a, t) {
  return {
    handleInput: (f) => {
      const k = f.target;
      e("update:modelValue", k.value);
    },
    handleFocus: (f) => {
      t.value = !0, e("focus", f);
    },
    handleBlur: (f) => {
      t.value = !1, e("blur", f);
    },
    handleClear: () => {
      var f;
      e("update:modelValue", ""), e("clear"), (f = a.value) == null || f.focus();
    },
    focus: () => {
      var f;
      (f = a.value) == null || f.focus();
    },
    blur: () => {
      var f;
      (f = a.value) == null || f.blur();
    }
  };
}
const Ie = {
  key: 0,
  class: "dss-input__before"
}, we = { class: "dss-input__field" }, Le = {
  key: 0,
  class: "dss-input__prepend"
}, Re = { class: "dss-input__control" }, qe = ["id", "for"], Ve = ["id", "type", "value", "placeholder", "disabled", "readonly", "tabindex", "aria-label", "aria-labelledby", "aria-describedby", "aria-invalid", "aria-busy", "aria-disabled", "aria-readonly", "aria-required"], Te = {
  key: 1,
  class: "dss-input__append"
}, Ke = {
  key: 0,
  class: "dss-input__loading",
  role: "status",
  "aria-label": "Loading",
  "aria-live": "polite"
}, Ne = ["aria-label"], Me = {
  key: 1,
  class: "dss-input__after"
}, Pe = {
  key: 2,
  class: "dss-input__bottom"
}, Oe = ["id"], Fe = ["id"], Ee = /* @__PURE__ */ A({
  name: "DssInput",
  inheritAttrs: !1,
  __name: "DssInput.ts",
  props: {
    modelValue: { default: "" },
    variant: { default: "outlined" },
    type: { default: "text" },
    dense: { type: Boolean, default: !1 },
    brand: { default: null },
    label: { default: "" },
    stackLabel: { type: Boolean, default: !1 },
    placeholder: { default: "" },
    hint: { default: "" },
    errorMessage: { default: "" },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    required: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    ariaLabel: { default: void 0 },
    clearAriaLabel: { default: "Clear input" },
    tabindex: { default: null }
  },
  emits: ["update:modelValue", "focus", "blur", "clear"],
  setup(e, { expose: a, emit: t }) {
    const s = e, l = t, n = M(), c = P(null), v = Math.random().toString(36).substring(2, 9), g = o(() => `dss-input-${v}`), f = o(() => `dss-input-label-${v}`), k = o(() => `dss-input-hint-${v}`), h = o(() => `dss-input-error-${v}`), { isFocused: m, hasValue: w, hasBottomSlot: V } = ze(s, n), { wrapperClasses: C, labelClasses: R, inputClasses: B } = De(s, { isFocused: m, hasValue: w }), { handleInput: K, handleFocus: O, handleBlur: F, handleClear: E, focus: G, blur: H } = Ae(
      l,
      c,
      m
    ), J = o(() => s.stackLabel || !s.label || m.value || w.value ? s.placeholder : ""), Q = o(() => s.disabled || s.loading ? -1 : s.tabindex !== null && s.tabindex !== void 0 ? typeof s.tabindex == "number" ? s.tabindex : parseInt(s.tabindex) : 0), U = o(() => {
      const _ = [];
      return s.error && s.errorMessage ? _.push(h.value) : s.hint && _.push(k.value), _.length > 0 ? _.join(" ") : void 0;
    });
    return a({
      focus: G,
      blur: H,
      inputRef: c
    }), (_, S) => (d(), i("div", {
      class: $(r(C))
    }, [
      r(n).before ? (d(), i("div", Ie, [
        b(_.$slots, "before")
      ])) : u("", !0),
      p("div", we, [
        r(n).prepend ? (d(), i("div", Le, [
          b(_.$slots, "prepend")
        ])) : u("", !0),
        p("div", Re, [
          e.label || r(n).label ? (d(), i("label", {
            key: 0,
            id: f.value,
            for: g.value,
            class: $(r(R))
          }, [
            b(_.$slots, "label", {}, () => [
              z(y(e.label), 1)
            ])
          ], 10, qe)) : u("", !0),
          p("input", I({
            id: g.value,
            ref_key: "inputRef",
            ref: c,
            type: e.type,
            value: e.modelValue,
            placeholder: J.value,
            disabled: e.disabled || e.loading,
            readonly: e.readonly,
            class: r(B),
            tabindex: Q.value,
            "aria-label": e.ariaLabel,
            "aria-labelledby": e.label ? f.value : void 0,
            "aria-describedby": U.value,
            "aria-invalid": e.error ? "true" : void 0,
            "aria-busy": e.loading ? "true" : void 0,
            "aria-disabled": e.disabled ? "true" : void 0,
            "aria-readonly": e.readonly ? "true" : void 0,
            "aria-required": e.required ? "true" : void 0
          }, _.$attrs, {
            onInput: S[0] || (S[0] = //@ts-ignore
            (...L) => r(K) && r(K)(...L)),
            onFocus: S[1] || (S[1] = //@ts-ignore
            (...L) => r(O) && r(O)(...L)),
            onBlur: S[2] || (S[2] = //@ts-ignore
            (...L) => r(F) && r(F)(...L))
          }), null, 16, Ve)
        ]),
        r(n).append || e.clearable || e.loading ? (d(), i("div", Te, [
          b(_.$slots, "append"),
          e.loading ? (d(), i("span", Ke, [...S[4] || (S[4] = [
            p("span", {
              class: "dss-input__spinner",
              "aria-hidden": "true"
            }, null, -1)
          ])])) : u("", !0),
          e.clearable && r(w) && !e.loading && !e.disabled && !e.readonly ? (d(), i("button", {
            key: 1,
            class: "dss-input__clear",
            type: "button",
            tabindex: -1,
            "aria-label": e.clearAriaLabel,
            onClick: S[3] || (S[3] = //@ts-ignore
            (...L) => r(E) && r(E)(...L))
          }, [...S[5] || (S[5] = [
            p("span", { "aria-hidden": "true" }, "×", -1)
          ])], 8, Ne)) : u("", !0)
        ])) : u("", !0)
      ]),
      r(n).after ? (d(), i("div", Me, [
        b(_.$slots, "after")
      ])) : u("", !0),
      r(V) ? (d(), i("div", Pe, [
        e.error && e.errorMessage ? (d(), i("div", {
          key: 0,
          id: h.value,
          class: "dss-input__error",
          role: "alert",
          "aria-live": "assertive"
        }, [
          b(_.$slots, "error", {}, () => [
            z(y(e.errorMessage), 1)
          ])
        ], 8, Oe)) : e.hint ? (d(), i("div", {
          key: 1,
          id: k.value,
          class: "dss-input__hint"
        }, [
          b(_.$slots, "hint", {}, () => [
            z(y(e.hint), 1)
          ])
        ], 8, Fe)) : u("", !0)
      ])) : u("", !0)
    ], 2));
  }
});
function We(e, a) {
  return {
    chipClasses: o(() => {
      const s = !!(e.label || a.hasDefaultSlot.value), n = !!(e.icon || e.iconRight) && !s;
      let c = "";
      return e.brand ? c = `dss-chip--${e.color}` : e.variant === "flat" || e.variant === "outline" ? c = `text-${e.color}` : c = `bg-${e.color} text-white`, [
        // Classe base
        "dss-chip",
        // Variante visual
        `dss-chip--${e.variant}`,
        // Classes de cor (estrategia baseada em brand)
        c,
        // Tamanho
        `dss-chip--${e.size}`,
        // Classes condicionais
        {
          "dss-chip--round": e.round,
          "dss-chip--square": e.square,
          "dss-chip--selected": e.selected,
          "dss-chip--disabled": e.disable,
          "dss-chip--dense": e.dense,
          "dss-chip--clickable": e.clickable,
          "dss-chip--removable": e.removable,
          "dss-chip--icon-only": n
        }
      ];
    })
  };
}
const je = ["tabindex", "aria-label", "aria-selected", "aria-disabled", "data-brand", "onKeydown"], Xe = {
  key: 0,
  class: "dss-chip__icon dss-chip__icon--selected",
  "aria-hidden": "true"
}, Ze = {
  key: 1,
  class: "dss-chip__icon dss-chip__icon--left",
  "aria-hidden": "true"
}, Ge = {
  key: 2,
  class: "dss-chip__label"
}, He = {
  key: 3,
  class: "dss-chip__icon dss-chip__icon--right",
  "aria-hidden": "true"
}, Je = ["aria-label", "disabled"], Qe = {
  class: "dss-chip__icon dss-chip__icon--remove",
  "aria-hidden": "true"
}, Ue = {
  key: 5,
  class: "dss-chip__ripple",
  "aria-hidden": "true"
}, Z = /* @__PURE__ */ A({
  name: "DssChip",
  inheritAttrs: !1,
  __name: "DssChip.ts",
  props: {
    label: { default: "" },
    icon: { default: "" },
    iconRight: { default: "" },
    iconRemove: { default: "cancel" },
    iconSelected: { default: "check" },
    variant: { default: "filled" },
    color: { default: "primary" },
    size: { default: "md" },
    round: { type: Boolean, default: !0 },
    square: { type: Boolean, default: !1 },
    selected: { type: Boolean, default: !1 },
    disable: { type: Boolean, default: !1 },
    clickable: { type: Boolean, default: !1 },
    removable: { type: Boolean, default: !1 },
    brand: { default: null },
    dense: { type: Boolean, default: !1 },
    ripple: { type: Boolean, default: !1 },
    tabindex: { default: null },
    removeAriaLabel: { default: "Remove" },
    ariaLabel: { default: void 0 }
  },
  emits: ["click", "remove", "update:selected"],
  setup(e, { emit: a }) {
    const t = e, s = a, l = M(), n = o(() => !!l.default), { chipClasses: c } = We(t, { hasDefaultSlot: n }), v = o(() => t.icon || ""), g = o(() => t.iconRight || ""), f = o(() => t.iconRemove || "cancel"), k = o(() => t.iconSelected || "check"), h = o(() => t.selected), m = o(() => t.removable && !t.disable), w = o(() => ({})), V = o(() => t.disable ? -1 : t.tabindex !== null && t.tabindex !== void 0 ? typeof t.tabindex == "number" ? t.tabindex : parseInt(t.tabindex) : t.clickable ? 0 : -1);
    function C(B) {
      t.clickable && !t.disable && (s("click", B), t.selected !== void 0 && s("update:selected", !t.selected));
    }
    function R(B) {
      t.disable || s("remove", B);
    }
    return (B, K) => (d(), i("div", I({
      class: r(c),
      style: w.value,
      tabindex: V.value,
      "aria-label": e.ariaLabel,
      "aria-selected": e.selected ? "true" : void 0,
      "aria-disabled": e.disable ? "true" : void 0,
      "data-brand": e.brand || void 0,
      role: "option"
    }, B.$attrs, {
      onClick: C,
      onKeydown: [
        q(C, ["enter"]),
        q(T(C, ["prevent"]), ["space"])
      ]
    }), [
      h.value ? (d(), i("span", Xe, y(k.value), 1)) : u("", !0),
      v.value && !h.value ? (d(), i("span", Ze, y(v.value), 1)) : u("", !0),
      e.label || B.$slots.default ? (d(), i("span", Ge, [
        b(B.$slots, "default", {}, () => [
          z(y(e.label), 1)
        ])
      ])) : u("", !0),
      g.value && !m.value ? (d(), i("span", He, y(g.value), 1)) : u("", !0),
      m.value ? (d(), i("button", {
        key: 4,
        type: "button",
        class: "dss-chip__remove",
        "aria-label": e.removeAriaLabel,
        disabled: e.disable,
        onClick: T(R, ["stop"])
      }, [
        p("span", Qe, y(f.value), 1)
      ], 8, Je)) : u("", !0),
      e.ripple && e.clickable ? (d(), i("span", Ue)) : u("", !0)
    ], 16, je));
  }
}), At = Z, Ye = {
  name: "DssButton",
  inheritAttrs: !1,
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
      validator: (e) => ["elevated", "flat", "outline", "unelevated", "push", "glossy"].includes(e)
    },
    // Color
    color: {
      type: String,
      default: "primary",
      validator: (e) => ["primary", "secondary", "tertiary", "accent", "positive", "negative", "warning", "info"].includes(e)
    },
    // Size
    size: {
      type: String,
      default: "md",
      validator: (e) => ["xs", "sm", "md", "lg", "xl"].includes(e)
    },
    // Shape
    round: {
      type: Boolean,
      default: !1
    },
    square: {
      type: Boolean,
      default: !1
    },
    // States
    loading: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    // Loading Progress (compatível com Quasar)
    percentage: {
      type: Number,
      default: null,
      validator: (e) => e === null || e >= 0 && e <= 100
    },
    darkPercentage: {
      type: Boolean,
      default: !1
    },
    // Behavior
    type: {
      type: String,
      default: "button",
      validator: (e) => ["button", "submit", "reset"].includes(e)
    },
    // Router (if using Vue Router)
    to: {
      type: [String, Object],
      default: null
    },
    replace: {
      type: Boolean,
      default: !1
    },
    // Brand
    brand: {
      type: String,
      default: null,
      validator: (e) => !e || ["hub", "water", "waste"].includes(e)
    },
    // Dense
    dense: {
      type: Boolean,
      default: !1
    },
    // No caps (disable uppercase transform)
    noCaps: {
      type: Boolean,
      default: !1
    },
    // Interaction (compatível com Quasar)
    ripple: {
      type: Boolean,
      default: !1
    },
    tabindex: {
      type: [Number, String],
      default: null
    },
    // Layout (compatível com Quasar)
    align: {
      type: String,
      default: "center",
      validator: (e) => ["left", "center", "right", "between", "around", "evenly"].includes(e)
    },
    stack: {
      type: Boolean,
      default: !1
    },
    stretch: {
      type: Boolean,
      default: !1
    },
    noWrap: {
      type: Boolean,
      default: !1
    },
    padding: {
      type: String,
      default: null
      // null = usa padding padrão do DSS
    }
  },
  computed: {
    componentType() {
      return this.to ? "router-link" : "button";
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
      let e = "";
      return this.brand || (this.variant === "flat" || this.variant === "outline" ? e = `text-${this.color}` : e = `bg-${this.color} text-white`), [
        "dss-button",
        `dss-button--${this.variant}`,
        e,
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
      const e = {};
      return this.padding && (e.padding = this.padding), e;
    },
    // Barra de progresso (compatível com Quasar)
    percentageStyle() {
      return this.percentage === null ? null : {
        transform: `translateX(${this.percentage - 100}%)`
      };
    },
    // Tabindex computado (compatível com Quasar)
    computedTabindex() {
      return this.disabled || this.loading ? -1 : this.tabindex !== null ? this.tabindex : 0;
    }
  },
  methods: {
    handleClick(e) {
      !this.disabled && !this.loading && this.$emit("click", e);
    }
  }
}, et = {
  key: 0,
  class: "dss-button__loading"
}, tt = {
  key: 2,
  class: "dss-button__icon dss-button__icon--left"
}, at = {
  key: 3,
  class: "dss-button__label"
}, st = {
  key: 4,
  class: "dss-button__icon dss-button__icon--right"
}, nt = {
  key: 5,
  class: "dss-button__ripple"
};
function lt(e, a, t, s, l, n) {
  return d(), W(j(n.componentType), I({
    type: n.nativeType,
    to: t.to,
    replace: t.replace,
    disabled: t.disabled || t.loading,
    class: n.buttonClasses,
    style: n.buttonStyle,
    tabindex: n.computedTabindex
  }, e.$attrs, { onClick: n.handleClick }), {
    default: X(() => [
      t.loading && t.percentage === null ? (d(), i("span", et, [...a[0] || (a[0] = [
        p("span", { class: "dss-button__spinner" }, null, -1)
      ])])) : u("", !0),
      t.loading && t.percentage !== null ? (d(), i("span", {
        key: 1,
        class: $(["dss-button__progress", { "dss-button__progress--dark": t.darkPercentage }])
      }, [
        p("span", {
          class: "dss-button__progress-indicator",
          style: x(n.percentageStyle)
        }, null, 4)
      ], 2)) : u("", !0),
      n.computedIconLeft && !t.loading ? (d(), i("span", tt, y(n.computedIconLeft), 1)) : u("", !0),
      t.label || e.$slots.default ? (d(), i("span", at, [
        b(e.$slots, "default", {}, () => [
          z(y(t.label), 1)
        ])
      ])) : u("", !0),
      n.computedIconRight && !t.loading ? (d(), i("span", st, y(n.computedIconRight), 1)) : u("", !0),
      t.ripple ? (d(), i("span", nt)) : u("", !0)
    ]),
    _: 3
  }, 16, ["type", "to", "replace", "disabled", "class", "style", "tabindex", "onClick"]);
}
const dt = /* @__PURE__ */ D(Ye, [["render", lt]]), it = {
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
      validator: (e) => ["primary", "secondary", "tertiary", "accent", "positive", "negative", "warning", "info"].includes(e)
    },
    textColor: {
      type: String,
      default: null
    },
    // Posicionamento (compatível com Quasar)
    floating: {
      type: Boolean,
      default: !1
    },
    align: {
      type: String,
      default: null,
      validator: (e) => !e || ["top", "middle", "bottom"].includes(e)
    },
    // Aparência (compatível com Quasar)
    transparent: {
      type: Boolean,
      default: !1
    },
    multiLine: {
      type: Boolean,
      default: !1
    },
    outline: {
      type: Boolean,
      default: !1
    },
    rounded: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    badgeClasses() {
      this.outline === !0 || this.transparent === !0 ? this.color : this.textColor;
      let e = "";
      return this.outline === !0 || this.transparent === !0 ? e = `text-${this.color}` : e = `bg-${this.color} text-white`, this.textColor && (e += ` text-${this.textColor}`), [
        "dss-badge",
        e,
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
      const e = {};
      return this.align && (e.verticalAlign = this.align), e;
    }
  }
};
function ot(e, a, t, s, l, n) {
  return d(), i("div", {
    class: $(n.badgeClasses),
    style: x(n.badgeStyle)
  }, [
    b(e.$slots, "default", {}, () => [
      z(y(t.label), 1)
    ])
  ], 6);
}
const rt = /* @__PURE__ */ D(it, [["render", ot]]), ut = {
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
      validator: (e) => !e || ["primary", "secondary", "tertiary", "accent", "positive", "negative", "warning", "info"].includes(e)
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
      default: !1
    },
    rounded: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    avatarClasses() {
      let e = "";
      return this.color && (e = `bg-${this.color} text-white`), this.textColor && (e += ` text-${this.textColor}`), [
        "dss-avatar",
        e,
        // Classes utilitárias (.bg-primary, .text-primary)
        {
          "dss-avatar--square": this.square,
          "dss-avatar--rounded": this.rounded
        }
      ];
    },
    avatarStyle() {
      const e = {};
      return this.size && (e.width = this.size, e.height = this.size), this.square ? e.borderRadius = "0" : this.rounded ? e.borderRadius = "8px" : e.borderRadius = "50%", e;
    },
    iconStyle() {
      const e = {};
      if (this.size) {
        const t = parseFloat(this.size) * 0.5;
        e.fontSize = `${t}px`;
      }
      return e;
    },
    contentStyle() {
      const e = {};
      return this.fontSize && (e.fontSize = this.fontSize), e;
    }
  }
};
function ct(e, a, t, s, l, n) {
  return d(), i("div", {
    class: $(n.avatarClasses),
    style: x(n.avatarStyle)
  }, [
    t.icon ? (d(), i("span", {
      key: 0,
      class: "dss-avatar__icon material-icons",
      style: x(n.iconStyle)
    }, y(t.icon), 5)) : u("", !0),
    t.icon ? u("", !0) : (d(), i("div", {
      key: 1,
      style: x(n.contentStyle),
      class: "dss-avatar__content"
    }, [
      b(e.$slots, "default")
    ], 4))
  ], 6);
}
const ft = /* @__PURE__ */ D(ut, [["render", ct]]), bt = {
  name: "DssCard",
  props: {
    /**
     * Visual variant of the card
     * @values elevated, flat, bordered, outlined
     */
    variant: {
      type: String,
      default: "elevated",
      validator: (e) => ["elevated", "flat", "bordered", "outlined"].includes(e)
    },
    /**
     * Remove border-radius (square corners)
     */
    square: {
      type: Boolean,
      default: !1
    },
    /**
     * Make card clickable (adds hover effects)
     */
    clickable: {
      type: Boolean,
      default: !1
    },
    /**
     * Dark mode variant
     */
    dark: {
      type: Boolean,
      default: !1
    },
    /**
     * Brand variant (Hub, Water, Waste)
     * @values null, hub, water, waste
     */
    brand: {
      type: String,
      default: null,
      validator: (e) => !e || ["hub", "water", "waste"].includes(e)
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
    },
    /**
     * Adiciona atributos de acessibilidade quando clickable
     */
    cardAttrs() {
      const e = { ...this.$attrs };
      return this.clickable && (e.tabindex = e.tabindex ?? "0", e.role = e.role ?? "article"), e;
    }
  },
  methods: {
    handleClick(e) {
      this.clickable && this.$emit("click", e);
    },
    /**
     * Handler para navegação por teclado (Enter e Space)
     * Conforme WCAG 2.1 AA
     */
    handleKeydown(e) {
      this.clickable && this.$emit("click", e);
    }
  }
};
function ht(e, a, t, s, l, n) {
  return d(), i("div", I({
    class: n.cardClasses,
    style: n.cardStyles
  }, n.cardAttrs, {
    onClick: a[0] || (a[0] = (...c) => n.handleClick && n.handleClick(...c)),
    onKeydown: [
      a[1] || (a[1] = q((...c) => n.handleKeydown && n.handleKeydown(...c), ["enter"])),
      a[2] || (a[2] = q(T((...c) => n.handleKeydown && n.handleKeydown(...c), ["prevent"]), ["space"]))
    ]
  }), [
    b(e.$slots, "default", {}, void 0, !0)
  ], 16);
}
const yt = /* @__PURE__ */ D(bt, [["render", ht], ["__scopeId", "data-v-570cd789"]]), vt = {
  name: "DssCardSection",
  props: {
    /**
     * Horizontal layout (flex-row)
     */
    horizontal: {
      type: Boolean,
      default: !1
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
function gt(e, a, t, s, l, n) {
  return d(), i("div", {
    class: $(n.sectionClasses)
  }, [
    b(e.$slots, "default", {}, void 0, !0)
  ], 2);
}
const mt = /* @__PURE__ */ D(vt, [["render", gt], ["__scopeId", "data-v-a4819ae3"]]), Ct = {
  name: "DssCardActions",
  props: {
    /**
     * Alignment of actions
     * @values left, center, right, between, around
     */
    align: {
      type: String,
      default: "right",
      validator: (e) => ["left", "center", "right", "between", "around"].includes(e)
    },
    /**
     * Vertical alignment (stacked buttons)
     */
    vertical: {
      type: Boolean,
      default: !1
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
function kt(e, a, t, s, l, n) {
  return d(), i("div", {
    class: $(n.actionsClasses)
  }, [
    b(e.$slots, "default", {}, void 0, !0)
  ], 2);
}
const _t = /* @__PURE__ */ D(Ct, [["render", kt], ["__scopeId", "data-v-fa8188fe"]]), It = {
  install(e, a = {}) {
    e.component("DssButton", dt), e.component("DssBadge", rt), e.component("DssAvatar", ft), e.component("DssCard", yt), e.component("DssCardSection", mt), e.component("DssCardActions", _t), e.component("DssInput", Ee), e.component("DssChip", Z), a.brand && e.provide("dss-default-brand", a.brand), a.theme && e.provide("dss-default-theme", a.theme), process.env.NODE_ENV !== "production" && (console.log("✅ Design System Sansys instalado com sucesso!"), console.log("📦 Componentes registrados:", [
      "DssButton",
      "DssBadge",
      "DssAvatar",
      "DssCard",
      "DssCardSection",
      "DssCardActions",
      "DssInput",
      "DssChip"
    ]), a.brand && console.log("🎨 Brand padrão:", a.brand));
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
const wt = "2.2.0", Lt = {
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
  pt as DssAvatar,
  Bt as DssBadge,
  $t as DssButton,
  xt as DssCard,
  zt as DssCardActions,
  Dt as DssCardSection,
  At as DssChip,
  Ee as DssInput,
  It as default,
  Lt as metadata,
  wt as version
};
//# sourceMappingURL=dss.es.js.map
