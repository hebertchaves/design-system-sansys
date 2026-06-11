import { computed as s, defineComponent as he, useSlots as Nt, createBlock as qe, openBlock as R, resolveDynamicComponent as Wn, unref as F, mergeProps as pe, withCtx as ve, createElementBlock as ne, createCommentVNode as me, createElementVNode as Oe, normalizeClass as qt, normalizeStyle as gn, toDisplayString as Ee, renderSlot as ee, createTextVNode as ht, ref as z, watchEffect as hd, shallowReactive as bd, reactive as vn, markRaw as Jr, getCurrentInstance as ye, provide as Va, watch as se, h as f, onBeforeUnmount as tt, isRef as yd, Transition as Pt, withDirectives as aa, onBeforeUpdate as Yn, nextTick as nt, onUpdated as pd, onMounted as bt, onDeactivated as wa, onActivated as en, inject as Yt, onBeforeMount as Ko, onUnmounted as Vl, Teleport as kd, KeepAlive as es, toRaw as ka, vShow as Wo, createApp as Cd, createVNode as Mt, createSlots as Et, renderList as Aa, normalizeProps as Lt, guardReactiveProps as zt, Fragment as hn, resolveComponent as lt, withModifiers as Nn, withKeys as wn, useAttrs as ts } from "vue";
function Sd(e, t) {
  return {
    buttonClasses: s(() => {
      let n = "";
      e.brand || (e.variant === "flat" || e.variant === "outline" ? n = `text-${e.color}` : n = `bg-${e.color} text-white`);
      const l = !!(e.label || t.hasDefaultSlot.value), i = !!(e.icon || e.iconRight) && !l;
      return [
        // Classe base
        "dss-button",
        // Variante visual
        `dss-button--${e.variant}`,
        // Classes de cor (utilitárias DSS)
        n,
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
          "dss-button--icon-only": i,
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
function wd(e) {
  const t = s(() => e.to ? "router-link" : "button"), a = s(() => e.to ? null : e.type || "button");
  return {
    componentType: t,
    nativeType: a
  };
}
function xd(e) {
  return {
    percentageStyle: s(() => e.percentage === null || e.percentage === void 0 ? null : {
      transform: `translateX(${e.percentage - 100}%)`
    })
  };
}
const _d = {
  key: 0,
  class: "dss-button__loading",
  role: "status",
  "aria-label": "Loading",
  "aria-live": "polite"
}, $d = ["aria-valuenow", "aria-label"], qd = {
  key: 2,
  class: "dss-button__icon dss-button__icon--left",
  "aria-hidden": "true"
}, Bd = {
  key: 3,
  class: "dss-button__label"
}, Td = {
  key: 4,
  class: "dss-button__icon dss-button__icon--right",
  "aria-hidden": "true"
}, Md = {
  key: 5,
  class: "dss-button__ripple",
  "aria-hidden": "true"
}, CC = /* @__PURE__ */ he({
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
  setup(e, { emit: t }) {
    const a = e, n = t, l = Nt(), o = s(() => !!l.default), { componentType: i, nativeType: r } = wd(a), { buttonClasses: u } = Sd(a, { hasDefaultSlot: o }), { percentageStyle: c } = xd(a), d = s(() => a.icon || ""), v = s(() => a.iconRight || ""), b = s(() => {
      const p = {};
      return a.padding && (p.padding = a.padding), p;
    }), m = s(() => a.disabled || a.loading ? -1 : a.tabindex !== null && a.tabindex !== void 0 ? typeof a.tabindex == "number" ? a.tabindex : parseInt(a.tabindex) : 0);
    function g(p) {
      !a.disabled && !a.loading && n("click", p);
    }
    return (p, k) => (R(), qe(Wn(F(i)), pe({
      type: F(r),
      to: e.to,
      replace: e.replace,
      disabled: e.disabled || e.loading,
      class: F(u),
      style: b.value,
      tabindex: m.value,
      "aria-label": e.ariaLabel,
      "aria-busy": e.loading ? "true" : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, p.$attrs, { onClick: g }), {
      default: ve(() => [
        e.loading && e.percentage === null ? (R(), ne("span", _d, [...k[0] || (k[0] = [
          Oe("span", {
            class: "dss-button__spinner",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : me("", !0),
        e.loading && e.percentage !== null ? (R(), ne("span", {
          key: 1,
          class: qt(["dss-button__progress", { "dss-button__progress--dark": e.darkPercentage }]),
          role: "progressbar",
          "aria-valuenow": e.percentage,
          "aria-valuemin": "0",
          "aria-valuemax": "100",
          "aria-label": `Loading ${e.percentage}%`
        }, [
          Oe("span", {
            class: "dss-button__progress-indicator",
            style: gn(F(c)),
            "aria-hidden": "true"
          }, null, 4)
        ], 10, $d)) : me("", !0),
        d.value && !e.loading ? (R(), ne("span", qd, Ee(d.value), 1)) : me("", !0),
        e.label || p.$slots.default ? (R(), ne("span", Bd, [
          ee(p.$slots, "default", {}, () => [
            ht(Ee(e.label), 1)
          ])
        ])) : me("", !0),
        v.value && !e.loading ? (R(), ne("span", Td, Ee(v.value), 1)) : me("", !0),
        e.ripple ? (R(), ne("span", Md)) : me("", !0)
      ]),
      _: 3
    }, 16, ["type", "to", "replace", "disabled", "class", "style", "tabindex", "aria-label", "aria-busy", "aria-disabled"]));
  }
});
function Ad(e, t) {
  const a = s(() => {
    const l = e.color || "primary";
    let o = "";
    return e.brand && (o = `dss-checkbox--${l}`), [
      // Classe base
      "dss-checkbox",
      // Tamanho
      `dss-checkbox--${e.size || "md"}`,
      // Classe de cor (apenas com brand)
      o,
      // Classes condicionais
      {
        "dss-checkbox--checked": t.isChecked.value,
        "dss-checkbox--indeterminate": t.isIndeterminate.value,
        "dss-checkbox--disabled": e.disable,
        "dss-checkbox--dense": e.dense,
        "dss-checkbox--left-label": e.leftLabel
      }
    ];
  }), n = s(() => e.brand || !(t.isChecked.value || t.isIndeterminate.value) ? "" : `bg-${e.color || "primary"} text-white`);
  return {
    checkboxClasses: a,
    controlColorClasses: n
  };
}
const Dd = ["data-brand"], Ld = {
  key: 0,
  class: "dss-checkbox__label dss-checkbox__label--left"
}, zd = ["checked", "disabled", "tabindex", "aria-label", "value"], Vd = {
  key: 0,
  class: "dss-checkbox__check material-icons",
  "aria-hidden": "true"
}, Pd = {
  key: 1,
  class: "dss-checkbox__dash material-icons",
  "aria-hidden": "true"
}, Rd = {
  key: 1,
  class: "dss-checkbox__label"
}, Fd = /* @__PURE__ */ he({
  name: "DssCheckbox",
  inheritAttrs: !1,
  __name: "DssCheckbox.ts",
  props: {
    modelValue: { type: [Boolean, null, Array], default: !1 },
    val: {},
    trueValue: { default: !0 },
    falseValue: { default: !1 },
    indeterminateValue: { default: null },
    toggleIndeterminate: { type: Boolean, default: !1 },
    label: { default: "" },
    leftLabel: { type: Boolean, default: !1 },
    color: { default: "primary" },
    size: { default: "md" },
    disable: { type: Boolean, default: !1 },
    dense: { type: Boolean, default: !1 },
    brand: { default: null },
    tabindex: { default: null },
    ariaLabel: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = Nt(), o = z(null), i = z(!1), r = s(() => Array.isArray(a.modelValue) ? a.modelValue.includes(a.val) : a.modelValue === a.trueValue), u = s(() => Array.isArray(a.modelValue) ? !1 : a.modelValue === a.indeterminateValue), c = s(() => !!(a.label || l.default)), d = s(() => a.disable ? -1 : a.tabindex !== null && a.tabindex !== void 0 ? typeof a.tabindex == "number" ? a.tabindex : parseInt(a.tabindex) : 0), { checkboxClasses: v, controlColorClasses: b } = Ad(
      a,
      { isChecked: r, isIndeterminate: u }
    ), m = s(() => [
      b.value,
      {
        "dss-checkbox__control--checked": r.value,
        "dss-checkbox__control--indeterminate": u.value,
        "dss-checkbox__control--focused": i.value
      }
    ]);
    hd(() => {
      o.value && (o.value.indeterminate = u.value);
    });
    function g() {
      if (!a.disable) {
        if (Array.isArray(a.modelValue)) {
          const p = [...a.modelValue], k = p.indexOf(a.val);
          k === -1 ? p.push(a.val) : p.splice(k, 1), n("update:modelValue", p);
          return;
        }
        if (a.toggleIndeterminate) {
          u.value ? n("update:modelValue", a.falseValue) : r.value ? n("update:modelValue", a.indeterminateValue) : n("update:modelValue", a.trueValue);
          return;
        }
        n("update:modelValue", r.value ? a.falseValue : a.trueValue);
      }
    }
    return (p, k) => (R(), ne("label", pe({
      class: F(v),
      "data-brand": e.brand || void 0
    }, p.$attrs), [
      c.value && e.leftLabel ? (R(), ne("span", Ld, [
        ee(p.$slots, "default", {}, () => [
          ht(Ee(e.label), 1)
        ])
      ])) : me("", !0),
      Oe("input", {
        ref_key: "inputRef",
        ref: o,
        type: "checkbox",
        class: "dss-checkbox__native",
        checked: r.value,
        disabled: e.disable,
        tabindex: d.value,
        "aria-label": e.ariaLabel,
        value: e.val,
        onChange: g,
        onFocus: k[0] || (k[0] = (C) => i.value = !0),
        onBlur: k[1] || (k[1] = (C) => i.value = !1)
      }, null, 40, zd),
      Oe("span", {
        class: qt(["dss-checkbox__control", m.value]),
        "aria-hidden": "true"
      }, [
        r.value ? (R(), ne("span", Vd, "check")) : me("", !0),
        u.value ? (R(), ne("span", Pd, "remove")) : me("", !0)
      ], 2),
      c.value && !e.leftLabel ? (R(), ne("span", Rd, [
        ee(p.$slots, "default", {}, () => [
          ht(Ee(e.label), 1)
        ])
      ])) : me("", !0)
    ], 16, Dd));
  }
});
function Ed(e, t) {
  const a = s(() => {
    const o = e.color || "primary";
    let i = "";
    return e.brand && (i = `dss-radio--${o}`), [
      "dss-radio",
      `dss-radio--${e.size || "md"}`,
      i,
      {
        "dss-radio--checked": t.isChecked.value,
        "dss-radio--disabled": e.disable,
        "dss-radio--dense": e.dense,
        "dss-radio--error": e.error,
        "dss-radio--left-label": e.leftLabel
      }
    ];
  }), n = s(() => {
    const o = ["dss-radio__control"];
    return t.isChecked.value && o.push("dss-radio__control--checked"), t.isFocused.value && o.push("dss-radio__control--focused"), o;
  }), l = s(() => e.brand || !t.isChecked.value || e.error ? "" : `text-${e.color || "primary"}`);
  return { radioClasses: a, controlClasses: n, controlColorClasses: l };
}
const Id = ["data-brand"], Od = {
  key: 0,
  class: "dss-radio__label dss-radio__label--left"
}, Hd = ["name", "value", "checked", "disabled", "tabindex", "aria-label", "aria-checked", "aria-disabled", "aria-invalid", "aria-describedby"], Nd = {
  key: 0,
  class: "dss-radio__dot"
}, jd = {
  key: 1,
  class: "dss-radio__label"
}, Qd = ["id"], as = /* @__PURE__ */ he({
  name: "DssRadio",
  inheritAttrs: !1,
  __name: "DssRadio.ts",
  props: {
    modelValue: { default: void 0 },
    val: { default: void 0 },
    name: { default: void 0 },
    label: { default: void 0 },
    leftLabel: { type: Boolean, default: !1 },
    color: { default: "primary" },
    size: { default: "md" },
    disable: { type: Boolean, default: !1 },
    dense: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    errorMessage: { default: void 0 },
    brand: { default: null },
    tabindex: { default: null },
    ariaLabel: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = z(null), i = z(!1), r = Nt(), u = s(() => n.modelValue !== void 0 && n.modelValue === n.val), c = s(() => !!(n.label || r.default)), d = s(() => n.disable ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? Number(n.tabindex) : 0), v = s(() => `dss-radio-${Math.random().toString(36).substring(2, 8)}`), b = s(() => n.error && n.errorMessage ? `${v.value}-error` : void 0), { radioClasses: m, controlClasses: g, controlColorClasses: p } = Ed(
      n,
      { isChecked: u, isFocused: i }
    );
    function k() {
      n.disable || l("update:modelValue", n.val);
    }
    function C() {
      i.value = !0;
    }
    function y() {
      i.value = !1;
    }
    return t({
      /** Referencia ao input nativo */
      inputRef: o,
      /** Foca o input programaticamente */
      focus: () => {
        var h;
        return (h = o.value) == null ? void 0 : h.focus();
      },
      /** Remove o foco do input programaticamente */
      blur: () => {
        var h;
        return (h = o.value) == null ? void 0 : h.blur();
      }
    }), (h, w) => (R(), ne("label", pe({
      class: F(m),
      "data-brand": e.brand || void 0
    }, h.$attrs), [
      c.value && e.leftLabel ? (R(), ne("span", Od, [
        ee(h.$slots, "default", {}, () => [
          ht(Ee(e.label), 1)
        ])
      ])) : me("", !0),
      Oe("input", {
        ref_key: "inputRef",
        ref: o,
        type: "radio",
        class: "dss-radio__native",
        name: e.name,
        value: e.val,
        checked: u.value,
        disabled: e.disable,
        tabindex: d.value,
        "aria-label": e.ariaLabel,
        "aria-checked": u.value,
        "aria-disabled": e.disable || void 0,
        "aria-invalid": e.error || void 0,
        "aria-describedby": b.value,
        onChange: k,
        onFocus: C,
        onBlur: y
      }, null, 40, Hd),
      Oe("span", {
        class: qt([F(g), F(p)]),
        "aria-hidden": "true"
      }, [
        u.value ? (R(), ne("span", Nd)) : me("", !0)
      ], 2),
      c.value && !e.leftLabel ? (R(), ne("span", jd, [
        ee(h.$slots, "default", {}, () => [
          ht(Ee(e.label), 1)
        ])
      ])) : me("", !0),
      e.error && e.errorMessage ? (R(), ne("span", {
        key: 2,
        id: b.value,
        class: "dss-radio__error",
        role: "alert",
        "aria-live": "assertive"
      }, Ee(e.errorMessage), 9, Qd)) : me("", !0)
    ], 16, Id));
  }
});
function Ud(e, t) {
  const a = s(() => {
    const l = e.color || "primary";
    let o = "";
    return e.brand && (o = `dss-toggle--${l}`), [
      // Classe base
      "dss-toggle",
      // Tamanho
      `dss-toggle--${e.size || "md"}`,
      // Classe de cor (apenas com brand)
      o,
      // Classes condicionais
      {
        "dss-toggle--checked": t.isChecked.value,
        "dss-toggle--disabled": e.disable,
        "dss-toggle--dense": e.dense,
        "dss-toggle--left-label": e.leftLabel,
        "dss-toggle--error": e.error
      }
    ];
  }), n = s(() => e.brand || !t.isChecked.value || e.error ? "" : `bg-${e.color || "primary"} text-white`);
  return {
    toggleClasses: a,
    trackColorClasses: n
  };
}
const Kd = ["data-brand"], Wd = {
  key: 0,
  class: "dss-toggle__label dss-toggle__label--left"
}, Yd = ["checked", "disabled", "tabindex", "aria-label", "aria-checked", "aria-disabled", "aria-invalid", "aria-describedby", "value"], Xd = {
  key: 1,
  class: "dss-toggle__label"
}, Gd = /* @__PURE__ */ he({
  name: "DssToggle",
  inheritAttrs: !1,
  __name: "DssToggle.ts",
  props: {
    modelValue: { type: [Boolean, null, Array], default: !1 },
    trueValue: { default: !0 },
    falseValue: { default: !1 },
    val: {},
    label: { default: "" },
    leftLabel: { type: Boolean, default: !1 },
    color: { default: "primary" },
    size: { default: "md" },
    disable: { type: Boolean, default: !1 },
    dense: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    brand: { default: null },
    tabindex: { default: null },
    ariaLabel: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = Nt(), i = z(null), r = z(!1), c = `dss-toggle-error-${Math.random().toString(36).substring(2, 8)}`, d = s(() => Array.isArray(n.modelValue) ? n.modelValue.includes(n.val) : n.modelValue === n.trueValue), v = s(() => !!(n.label || o.default)), b = s(() => n.disable ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(n.tabindex) : 0), m = s(() => {
      if (n.error && n.errorMessage)
        return c;
    }), { toggleClasses: g, trackColorClasses: p } = Ud(
      n,
      { isChecked: d }
    ), k = s(() => [
      p.value,
      {
        "dss-toggle__track--checked": d.value,
        "dss-toggle__track--focused": r.value
      }
    ]);
    function C() {
      if (!n.disable) {
        if (Array.isArray(n.modelValue)) {
          const y = [...n.modelValue], h = y.indexOf(n.val);
          h === -1 ? y.push(n.val) : y.splice(h, 1), l("update:modelValue", y);
          return;
        }
        l("update:modelValue", d.value ? n.falseValue : n.trueValue);
      }
    }
    return t({
      /** Foca o input nativo */
      focus: () => {
        var y;
        return (y = i.value) == null ? void 0 : y.focus();
      },
      /** Remove foco do input nativo */
      blur: () => {
        var y;
        return (y = i.value) == null ? void 0 : y.blur();
      }
    }), (y, h) => (R(), ne("label", pe({
      class: F(g),
      "data-brand": e.brand || void 0
    }, y.$attrs), [
      v.value && e.leftLabel ? (R(), ne("span", Wd, [
        ee(y.$slots, "default", {}, () => [
          ht(Ee(e.label), 1)
        ])
      ])) : me("", !0),
      Oe("input", {
        ref_key: "inputRef",
        ref: i,
        type: "checkbox",
        role: "switch",
        class: "dss-toggle__native",
        checked: d.value,
        disabled: e.disable,
        tabindex: b.value,
        "aria-label": e.ariaLabel,
        "aria-checked": d.value,
        "aria-disabled": e.disable || void 0,
        "aria-invalid": e.error || void 0,
        "aria-describedby": m.value,
        value: e.val,
        onChange: C,
        onFocus: h[0] || (h[0] = (w) => r.value = !0),
        onBlur: h[1] || (h[1] = (w) => r.value = !1)
      }, null, 40, Yd),
      Oe("span", {
        class: qt(["dss-toggle__track", k.value]),
        "aria-hidden": "true"
      }, [...h[2] || (h[2] = [
        Oe("span", {
          class: "dss-toggle__thumb",
          "aria-hidden": "true"
        }, null, -1)
      ])], 2),
      v.value && !e.leftLabel ? (R(), ne("span", Xd, [
        ee(y.$slots, "default", {}, () => [
          ht(Ee(e.label), 1)
        ])
      ])) : me("", !0),
      e.error && e.errorMessage ? (R(), ne("span", {
        key: 2,
        id: c,
        class: "dss-toggle__error",
        role: "alert",
        "aria-live": "assertive"
      }, Ee(e.errorMessage), 1)) : me("", !0)
    ], 16, Kd));
  }
});
/*!
* Quasar Framework v2.19.3
* (c) 2015-present Razvan Stoenescu
* Released under the MIT License.
*/
let Jl = null;
function Yo() {
  return Jl !== null ? Jl : Jl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
typeof __QUASAR_SSR__ != "boolean" && (Yo().__QUASAR_SSR__ = !1);
typeof __QUASAR_SSR_CLIENT__ != "boolean" && (Yo().__QUASAR_SSR_CLIENT__ = !1);
typeof __QUASAR_SSR_PWA__ != "boolean" && (Yo().__QUASAR_SSR_PWA__ = !1);
function Rt(e, t, a, n) {
  return Object.defineProperty(e, t, {
    get: a,
    set: n,
    enumerable: !0
  }), e;
}
function ns(e, t) {
  for (const a in t) Rt(e, a, t[a]);
  return e;
}
const na = z(__QUASAR_SSR_CLIENT__ && (__QUASAR_SSR_PWA__ ? document.body.getAttribute("data-server-rendered") !== null : !0));
let Bo;
function Zd(e, t) {
  const a = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(vivaldi)[\/]([\w.]+)/.exec(e) || /(chrome|crios)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(firefox|fxios)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) || [];
  return {
    browser: a[5] || a[3] || a[1] || "",
    version: a[4] || a[2] || "0",
    platform: t[0] || ""
  };
}
function Jd(e) {
  return /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(silk)/.exec(e) || /(android)/.exec(e) || /(win)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || /(playbook)/.exec(e) || /(bb)/.exec(e) || /(blackberry)/.exec(e) || [];
}
const ls = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function ec(e) {
  const t = e.toLowerCase(), a = Zd(t, Jd(t)), n = {
    mobile: !1,
    desktop: !1,
    cordova: !1,
    capacitor: !1,
    nativeMobile: !1,
    electron: !1,
    bex: !1,
    linux: !1,
    mac: !1,
    win: !1,
    cros: !1,
    chrome: !1,
    firefox: !1,
    opera: !1,
    safari: !1,
    vivaldi: !1,
    edge: !1,
    edgeChromium: !1,
    ie: !1,
    webkit: !1,
    android: !1,
    ios: !1,
    ipad: !1,
    iphone: !1,
    ipod: !1,
    kindle: !1,
    winphone: !1,
    blackberry: !1,
    playbook: !1,
    silk: !1
  };
  a.browser && (n[a.browser] = !0, n.version = a.version, n.versionNumber = parseInt(a.version, 10)), a.platform && (n[a.platform] = !0);
  const l = n.android || n.ios || n.bb || n.blackberry || n.ipad || n.iphone || n.ipod || n.kindle || n.playbook || n.silk || n["windows phone"];
  if (l === !0 || t.indexOf("mobile") !== -1 ? n.mobile = !0 : n.desktop = !0, n["windows phone"] && (n.winphone = !0, delete n["windows phone"]), n.edga || n.edgios || n.edg ? (n.edge = !0, a.browser = "edge") : n.crios ? (n.chrome = !0, a.browser = "chrome") : n.fxios && (n.firefox = !0, a.browser = "firefox"), (n.ipod || n.ipad || n.iphone) && (n.ios = !0), n.vivaldi && (a.browser = "vivaldi", n.vivaldi = !0), (n.chrome || n.opr || n.safari || n.vivaldi || n.mobile === !0 && n.ios !== !0 && l !== !0) && (n.webkit = !0), n.opr && (a.browser = "opera", n.opera = !0), n.safari && (n.blackberry || n.bb ? (a.browser = "blackberry", n.blackberry = !0) : n.playbook ? (a.browser = "playbook", n.playbook = !0) : n.android ? (a.browser = "android", n.android = !0) : n.kindle ? (a.browser = "kindle", n.kindle = !0) : n.silk && (a.browser = "silk", n.silk = !0)), n.name = a.browser, n.platform = a.platform, t.indexOf("electron") !== -1) n.electron = !0;
  else if (document.location.href.indexOf("-extension://") !== -1) n.bex = !0;
  else {
    if (window.Capacitor !== void 0 ? (n.capacitor = !0, n.nativeMobile = !0, n.nativeMobileWrapper = "capacitor") : (window._cordovaNative !== void 0 || window.cordova !== void 0) && (n.cordova = !0, n.nativeMobile = !0, n.nativeMobileWrapper = "cordova"), na.value === !0 && (Bo = { is: { ...n } }), ls === !0 && n.mac === !0 && (n.desktop === !0 && n.safari === !0 || n.nativeMobile === !0 && n.android !== !0 && n.ios !== !0 && n.ipad !== !0)) {
      delete n.mac, delete n.desktop;
      const o = Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
      Object.assign(n, {
        mobile: !0,
        ios: !0,
        platform: o,
        [o]: !0
      });
    }
    n.mobile !== !0 && window.navigator.userAgentData && window.navigator.userAgentData.mobile && (delete n.desktop, n.mobile = !0);
  }
  return n;
}
const Mi = navigator.userAgent || navigator.vendor || window.opera, tc = {
  has: {
    touch: !1,
    webStorage: !1
  },
  within: { iframe: !1 }
}, Je = {
  userAgent: Mi,
  is: ec(Mi),
  has: { touch: ls },
  within: { iframe: window.self !== window.top }
}, To = { install(e) {
  const { $q: t } = e;
  na.value === !0 ? (e.onSSRHydrated.push(() => {
    Object.assign(t.platform, Je), na.value = !1;
  }), t.platform = vn(this)) : t.platform = this;
} };
{
  let e;
  Rt(Je.has, "webStorage", () => {
    if (e !== void 0) return e;
    try {
      if (window.localStorage)
        return e = !0, !0;
    } catch {
    }
    return e = !1, !1;
  }), Object.assign(To, Je), na.value === !0 && (Object.assign(To, Bo, tc), Bo = null);
}
function re(e) {
  return Jr(he(e));
}
function ca(e) {
  return Jr(e);
}
const Pa = (e, t) => {
  const a = vn(e);
  for (const n in e) Rt(t, n, () => a[n], (l) => {
    a[n] = l;
  });
  return t;
}, gt = {
  hasPassive: !1,
  passiveCapture: !0,
  notPassiveCapture: !0
};
try {
  const e = Object.defineProperty({}, "passive", { get() {
    Object.assign(gt, {
      hasPassive: !0,
      passive: { passive: !0 },
      notPassive: { passive: !1 },
      passiveCapture: {
        passive: !0,
        capture: !0
      },
      notPassiveCapture: {
        passive: !1,
        capture: !0
      }
    });
  } });
  window.addEventListener("qtest", null, e), window.removeEventListener("qtest", null, e);
} catch {
}
function At() {
}
function Pl(e) {
  return e.button === 0;
}
function Wt(e) {
  return e.touches && e.touches[0] ? e = e.touches[0] : e.changedTouches && e.changedTouches[0] ? e = e.changedTouches[0] : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]), {
    top: e.clientY,
    left: e.clientX
  };
}
function ac(e) {
  if (e.path) return e.path;
  if (e.composedPath) return e.composedPath();
  const t = [];
  let a = e.target;
  for (; a; ) {
    if (t.push(a), a.tagName === "HTML")
      return t.push(document), t.push(window), t;
    a = a.parentElement;
  }
}
function wt(e) {
  e.stopPropagation();
}
function Ft(e) {
  e.cancelable !== !1 && e.preventDefault();
}
function Ye(e) {
  e.cancelable !== !1 && e.preventDefault(), e.stopPropagation();
}
function bn(e, t) {
  if (e === void 0 || t === !0 && e.__dragPrevented === !0) return;
  const a = t === !0 ? (n) => {
    n.__dragPrevented = !0, n.addEventListener("dragstart", Ft, gt.notPassiveCapture);
  } : (n) => {
    delete n.__dragPrevented, n.removeEventListener("dragstart", Ft, gt.notPassiveCapture);
  };
  e.querySelectorAll("a, img").forEach(a);
}
function _t(e, t, a) {
  const n = `__q_${t}_evt`;
  e[n] = e[n] !== void 0 ? e[n].concat(a) : a, a.forEach((l) => {
    l[0].addEventListener(l[1], e[l[2]], gt[l[3]]);
  });
}
function Ut(e, t) {
  const a = `__q_${t}_evt`;
  e[a] !== void 0 && (e[a].forEach((n) => {
    n[0].removeEventListener(n[1], e[n[2]], gt[n[3]]);
  }), e[a] = void 0);
}
function $n(e, t = 250, a) {
  let n = null;
  function l() {
    const o = arguments, i = () => {
      n = null, e.apply(this, o);
    };
    n !== null && clearTimeout(n), n = setTimeout(i, t);
  }
  return l.cancel = () => {
    n !== null && clearTimeout(n);
  }, l;
}
const eo = [
  "sm",
  "md",
  "lg",
  "xl"
], { passive: Ai } = gt;
Pa({
  width: 0,
  height: 0,
  name: "xs",
  sizes: {
    sm: 600,
    md: 1024,
    lg: 1440,
    xl: 1920
  },
  lt: {
    sm: !0,
    md: !0,
    lg: !0,
    xl: !0
  },
  gt: {
    xs: !1,
    sm: !1,
    md: !1,
    lg: !1
  },
  xs: !0,
  sm: !1,
  md: !1,
  lg: !1,
  xl: !1
}, {
  setSizes: At,
  setDebounce: At,
  install({ $q: e, onSSRHydrated: t }) {
    var v;
    if (e.screen = this, this.__installed === !0) {
      e.config.screen !== void 0 && (e.config.screen.bodyClasses === !1 ? document.body.classList.remove(`screen--${this.name}`) : this.__update(!0));
      return;
    }
    const { visualViewport: a } = window, n = a || window, l = document.scrollingElement || document.documentElement, o = a === void 0 || Je.is.mobile === !0 ? () => [Math.max(window.innerWidth, l.clientWidth), Math.max(window.innerHeight, l.clientHeight)] : () => [a.width * a.scale + window.innerWidth - l.clientWidth, a.height * a.scale + window.innerHeight - l.clientHeight], i = ((v = e.config.screen) == null ? void 0 : v.bodyClasses) === !0;
    this.__update = (b) => {
      const [m, g] = o();
      if (g !== this.height && (this.height = g), m !== this.width) this.width = m;
      else if (b !== !0) return;
      let p = this.sizes;
      this.gt.xs = m >= p.sm, this.gt.sm = m >= p.md, this.gt.md = m >= p.lg, this.gt.lg = m >= p.xl, this.lt.sm = m < p.sm, this.lt.md = m < p.md, this.lt.lg = m < p.lg, this.lt.xl = m < p.xl, this.xs = this.lt.sm, this.sm = this.gt.xs === !0 && this.lt.md === !0, this.md = this.gt.sm === !0 && this.lt.lg === !0, this.lg = this.gt.md === !0 && this.lt.xl === !0, this.xl = this.gt.lg, p = this.xs === !0 && "xs" || this.sm === !0 && "sm" || this.md === !0 && "md" || this.lg === !0 && "lg" || "xl", p !== this.name && (i === !0 && (document.body.classList.remove(`screen--${this.name}`), document.body.classList.add(`screen--${p}`)), this.name = p);
    };
    let r, u = {}, c = 16;
    this.setSizes = (b) => {
      eo.forEach((m) => {
        b[m] !== void 0 && (u[m] = b[m]);
      });
    }, this.setDebounce = (b) => {
      c = b;
    };
    const d = () => {
      const b = getComputedStyle(document.body);
      b.getPropertyValue("--q-size-sm") && eo.forEach((m) => {
        this.sizes[m] = parseInt(b.getPropertyValue(`--q-size-${m}`), 10);
      }), this.setSizes = (m) => {
        eo.forEach((g) => {
          m[g] && (this.sizes[g] = m[g]);
        }), this.__update(!0);
      }, this.setDebounce = (m) => {
        r !== void 0 && n.removeEventListener("resize", r, Ai), r = m > 0 ? $n(this.__update, m) : this.__update, n.addEventListener("resize", r, Ai);
      }, this.setDebounce(c), Object.keys(u).length !== 0 ? (this.setSizes(u), u = void 0) : this.__update(), i === !0 && this.name === "xs" && document.body.classList.add("screen--xs");
    };
    na.value === !0 ? t.push(d) : d();
  }
});
const Kt = Pa({
  isActive: !1,
  mode: !1
}, {
  __media: void 0,
  set(e) {
    Kt.mode = e, e === "auto" ? (Kt.__media === void 0 && (Kt.__media = window.matchMedia("(prefers-color-scheme: dark)"), Kt.__updateMedia = () => {
      Kt.set("auto");
    }, Kt.__media.addListener(Kt.__updateMedia)), e = Kt.__media.matches) : Kt.__media !== void 0 && (Kt.__media.removeListener(Kt.__updateMedia), Kt.__media = void 0), Kt.isActive = e === !0, document.body.classList.remove(`body--${e === !0 ? "light" : "dark"}`), document.body.classList.add(`body--${e === !0 ? "dark" : "light"}`);
  },
  toggle() {
    Kt.set(Kt.isActive === !1);
  },
  install({ $q: e, ssrContext: t }) {
    const a = __QUASAR_SSR_CLIENT__ ? document.body.classList.contains("body--dark") : e.config.dark;
    e.dark = this, this.__installed !== !0 && this.set(a !== void 0 ? a : !1);
  }
});
function tn(e) {
  return e !== Object(e) || e.isComposing === !0 || e.qKeyEvent === !0;
}
function la(e, t) {
  return tn(e) === !0 ? !1 : [].concat(t).includes(e.keyCode);
}
var Mo = {
  isoName: "en-US",
  nativeName: "English (US)",
  label: {
    clear: "Clear",
    ok: "OK",
    cancel: "Cancel",
    close: "Close",
    set: "Set",
    select: "Select",
    reset: "Reset",
    remove: "Remove",
    update: "Update",
    create: "Create",
    search: "Search",
    filter: "Filter",
    refresh: "Refresh",
    expand: (e) => e ? `Expand "${e}"` : "Expand",
    collapse: (e) => e ? `Collapse "${e}"` : "Collapse"
  },
  date: {
    days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    firstDayOfWeek: 0,
    format24h: !1,
    pluralDay: "days",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    prevYear: "Previous year",
    nextYear: "Next year",
    today: "Today",
    prevRangeYears: (e) => `Previous ${e} years`,
    nextRangeYears: (e) => `Next ${e} years`
  },
  table: {
    noData: "No data available",
    noResults: "No matching records found",
    loading: "Loading...",
    selectedRecords: (e) => e === 1 ? "1 record selected." : (e === 0 ? "No" : e) + " records selected.",
    recordsPerPage: "Records per page:",
    allRows: "All",
    pagination: (e, t, a) => e + "-" + t + " of " + a,
    columns: "Columns"
  },
  pagination: {
    first: "First page",
    prev: "Previous page",
    next: "Next page",
    last: "Last page"
  },
  editor: {
    url: "URL",
    bold: "Bold",
    italic: "Italic",
    strikethrough: "Strikethrough",
    underline: "Underline",
    unorderedList: "Unordered List",
    orderedList: "Ordered List",
    subscript: "Subscript",
    superscript: "Superscript",
    hyperlink: "Hyperlink",
    toggleFullscreen: "Toggle Fullscreen",
    quote: "Quote",
    left: "Left align",
    center: "Center align",
    right: "Right align",
    justify: "Justify align",
    print: "Print",
    outdent: "Decrease indentation",
    indent: "Increase indentation",
    removeFormat: "Remove formatting",
    formatting: "Formatting",
    fontSize: "Font Size",
    align: "Align",
    hr: "Insert Horizontal Rule",
    undo: "Undo",
    redo: "Redo",
    heading1: "Heading 1",
    heading2: "Heading 2",
    heading3: "Heading 3",
    heading4: "Heading 4",
    heading5: "Heading 5",
    heading6: "Heading 6",
    paragraph: "Paragraph",
    code: "Code",
    size1: "Very small",
    size2: "A bit small",
    size3: "Normal",
    size4: "Medium-large",
    size5: "Big",
    size6: "Very big",
    size7: "Maximum",
    defaultFont: "Default Font",
    viewSource: "View Source"
  },
  tree: {
    noNodes: "No nodes available",
    noResults: "No matching nodes found"
  }
};
function Di() {
  const e = Array.isArray(navigator.languages) === !0 && navigator.languages.length !== 0 ? navigator.languages[0] : navigator.language;
  if (typeof e == "string") return e.split(/[-_]/).map((t, a) => a === 0 ? t.toLowerCase() : a > 1 || t.length < 4 ? t.toUpperCase() : t[0].toUpperCase() + t.slice(1).toLowerCase()).join("-");
}
const Ta = Pa({ __qLang: {} }, {
  getLocale: Di,
  set(e = Mo, t) {
    const a = {
      ...e,
      rtl: e.rtl === !0,
      getLocale: Di
    };
    if (a.set = Ta.set, Ta.__langConfig === void 0 || Ta.__langConfig.noHtmlAttrs !== !0) {
      const n = document.documentElement;
      n.setAttribute("dir", a.rtl === !0 ? "rtl" : "ltr"), n.setAttribute("lang", a.isoName);
    }
    Object.assign(Ta.__qLang, a);
  },
  install({ $q: e, lang: t, ssrContext: a }) {
    e.lang = Ta.__qLang, Ta.__langConfig = e.config.lang, this.__installed === !0 ? t !== void 0 && this.set(t) : (this.props = new Proxy(this.__qLang, {
      get() {
        return Reflect.get(...arguments);
      },
      ownKeys(n) {
        return Reflect.ownKeys(n).filter((l) => l !== "set" && l !== "getLocale");
      }
    }), this.set(t || Mo));
  }
});
var nc = {
  name: "material-icons",
  type: {
    positive: "check_circle",
    negative: "warning",
    info: "info",
    warning: "priority_high"
  },
  arrow: {
    up: "arrow_upward",
    right: "arrow_forward",
    down: "arrow_downward",
    left: "arrow_back",
    dropdown: "arrow_drop_down"
  },
  chevron: {
    left: "chevron_left",
    right: "chevron_right"
  },
  colorPicker: {
    spectrum: "gradient",
    tune: "tune",
    palette: "style"
  },
  pullToRefresh: { icon: "refresh" },
  carousel: {
    left: "chevron_left",
    right: "chevron_right",
    up: "keyboard_arrow_up",
    down: "keyboard_arrow_down",
    navigationIcon: "lens"
  },
  chip: {
    remove: "cancel",
    selected: "check"
  },
  datetime: {
    arrowLeft: "chevron_left",
    arrowRight: "chevron_right",
    now: "access_time",
    today: "today"
  },
  editor: {
    bold: "format_bold",
    italic: "format_italic",
    strikethrough: "strikethrough_s",
    underline: "format_underlined",
    unorderedList: "format_list_bulleted",
    orderedList: "format_list_numbered",
    subscript: "vertical_align_bottom",
    superscript: "vertical_align_top",
    hyperlink: "link",
    toggleFullscreen: "fullscreen",
    quote: "format_quote",
    left: "format_align_left",
    center: "format_align_center",
    right: "format_align_right",
    justify: "format_align_justify",
    print: "print",
    outdent: "format_indent_decrease",
    indent: "format_indent_increase",
    removeFormat: "format_clear",
    formatting: "text_format",
    fontSize: "format_size",
    align: "format_align_left",
    hr: "remove",
    undo: "undo",
    redo: "redo",
    heading: "format_size",
    code: "code",
    size: "format_size",
    font: "font_download",
    viewSource: "code"
  },
  expansionItem: {
    icon: "keyboard_arrow_down",
    denseIcon: "arrow_drop_down"
  },
  fab: {
    icon: "add",
    activeIcon: "close"
  },
  field: {
    clear: "cancel",
    error: "error"
  },
  pagination: {
    first: "first_page",
    prev: "keyboard_arrow_left",
    next: "keyboard_arrow_right",
    last: "last_page"
  },
  rating: { icon: "grade" },
  stepper: {
    done: "check",
    active: "edit",
    error: "warning"
  },
  tabs: {
    left: "chevron_left",
    right: "chevron_right",
    up: "keyboard_arrow_up",
    down: "keyboard_arrow_down"
  },
  table: {
    arrowUp: "arrow_upward",
    warning: "warning",
    firstPage: "first_page",
    prevPage: "chevron_left",
    nextPage: "chevron_right",
    lastPage: "last_page"
  },
  tree: { icon: "play_arrow" },
  uploader: {
    done: "done",
    clear: "clear",
    add: "add_box",
    upload: "cloud_upload",
    removeQueue: "clear_all",
    removeUploaded: "done_all"
  }
};
const Li = Pa({
  iconMapFn: null,
  __qIconSet: {}
}, {
  set(e, t) {
    const a = { ...e };
    a.set = Li.set, Object.assign(Li.__qIconSet, a);
  },
  install({ $q: e, iconSet: t, ssrContext: a }) {
    e.config.iconMapFn !== void 0 && (this.iconMapFn = e.config.iconMapFn), e.iconSet = this.__qIconSet, Rt(e, "iconMapFn", () => this.iconMapFn, (n) => {
      this.iconMapFn = n;
    }), this.__installed === !0 ? t !== void 0 && this.set(t) : (this.props = new Proxy(this.__qIconSet, {
      get() {
        return Reflect.get(...arguments);
      },
      ownKeys(n) {
        return Reflect.ownKeys(n).filter((l) => l !== "set");
      }
    }), this.set(t || nc));
  }
}), os = "_q_t_", is = "_q_s_", an = "_q_l_", lc = "_q_pc_", rs = "_q_f_", ss = "_q_fo_", us = "_q_tabs_", ds = "_q_u_";
function vt() {
}
const zi = {};
function ua(e, t) {
  if (e === t) return !0;
  if (e !== null && t !== null && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    let a, n;
    if (e.constructor === Array) {
      if (a = e.length, a !== t.length) return !1;
      for (n = a; n-- !== 0; ) if (ua(e[n], t[n]) !== !0) return !1;
      return !0;
    }
    if (e.constructor === Map) {
      if (e.size !== t.size) return !1;
      let o = e.entries();
      for (n = o.next(); n.done !== !0; ) {
        if (t.has(n.value[0]) !== !0) return !1;
        n = o.next();
      }
      for (o = e.entries(), n = o.next(); n.done !== !0; ) {
        if (ua(n.value[1], t.get(n.value[0])) !== !0) return !1;
        n = o.next();
      }
      return !0;
    }
    if (e.constructor === Set) {
      if (e.size !== t.size) return !1;
      const o = e.entries();
      for (n = o.next(); n.done !== !0; ) {
        if (t.has(n.value[0]) !== !0) return !1;
        n = o.next();
      }
      return !0;
    }
    if (e.buffer != null && e.buffer.constructor === ArrayBuffer) {
      if (a = e.length, a !== t.length) return !1;
      for (n = a; n-- !== 0; ) if (e[n] !== t[n]) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    const l = Object.keys(e).filter((o) => e[o] !== void 0);
    if (a = l.length, a !== Object.keys(t).filter((o) => t[o] !== void 0).length) return !1;
    for (n = a; n-- !== 0; ) {
      const o = l[n];
      if (ua(e[o], t[o]) !== !0) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Qt(e) {
  return e !== null && typeof e == "object" && Array.isArray(e) !== !0;
}
function Ao(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function oc(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
function jn(e) {
  return typeof e == "number" && isFinite(e);
}
function cs(e, t) {
  const a = Cd(e);
  a.config.globalProperties = t.config.globalProperties;
  const { reload: n, ...l } = t._context;
  return Object.assign(a._context, l), a;
}
const Vi = [
  "B",
  "KB",
  "MB",
  "GB",
  "TB",
  "PB"
];
function Do(e, t = 1) {
  let a = 0;
  for (; parseInt(e, 10) >= 1024 && a < Vi.length - 1; )
    e /= 1024, ++a;
  return `${e.toFixed(t)}${Vi[a]}`;
}
function mt(e, t, a) {
  return a <= t ? t : Math.min(a, Math.max(t, e));
}
function pl(e, t, a) {
  if (a <= t) return t;
  const n = a - t + 1;
  let l = t + (e - t) % n;
  return l < t && (l = n + l), l === 0 ? 0 : l;
}
function ct(e, t = 2, a = "0") {
  if (e == null) return e;
  const n = String(e);
  return n.length >= t ? n : new Array(t - n.length + 1).join(a) + n;
}
const Xo = XMLHttpRequest, fs = Xo.prototype.open, ic = [
  "top",
  "right",
  "bottom",
  "left"
];
let kl = [], Fn = 0;
function rc({ p: e, pos: t, active: a, horiz: n, reverse: l, dir: o }) {
  let i = 1, r = 1;
  return n === !0 ? (l === !0 && (i = -1), t === "bottom" && (r = -1), { transform: `translate3d(${i * (e - 100)}%,${a ? 0 : r * -200}%,0)` }) : (l === !0 && (r = -1), t === "right" && (i = -1), { transform: `translate3d(${a ? 0 : o * i * -200}%,${r * (e - 100)}%,0)` });
}
function sc(e, t) {
  return typeof t != "number" && (e < 25 ? t = Math.random() * 3 + 3 : e < 65 ? t = Math.random() * 3 : e < 85 ? t = Math.random() * 2 : e < 99 ? t = 0.6 : t = 0), mt(e + t, 0, 100);
}
function uc(e) {
  Fn++, kl.push(e), !(Fn > 1) && (Xo.prototype.open = function(a, n) {
    const l = [], o = () => {
      kl.forEach((r) => {
        (r.hijackFilter.value === null || r.hijackFilter.value(n) === !0) && (r.start(), l.push(r.stop));
      });
    }, i = () => {
      l.forEach((r) => {
        r();
      });
    };
    this.addEventListener("loadstart", o, { once: !0 }), this.addEventListener("loadend", i, { once: !0 }), fs.apply(this, arguments);
  });
}
function dc(e) {
  kl = kl.filter((t) => t.start !== e), Fn = Math.max(0, Fn - 1), Fn === 0 && (Xo.prototype.open = fs);
}
var vs = re({
  name: "QAjaxBar",
  props: {
    position: {
      type: String,
      default: "top",
      validator: (e) => ic.includes(e)
    },
    size: {
      type: String,
      default: "2px"
    },
    color: String,
    skipHijack: Boolean,
    reverse: Boolean,
    hijackFilter: Function
  },
  emits: ["start", "stop"],
  setup(e, { emit: t }) {
    const { proxy: a } = ye(), n = z(0), l = z(!1), o = z(!0);
    let i = 0, r = null, u;
    const c = s(() => `q-loading-bar q-loading-bar--${e.position}` + (e.color !== void 0 ? ` bg-${e.color}` : "") + (o.value === !0 ? "" : " no-transition")), d = s(() => e.position === "top" || e.position === "bottom"), v = s(() => d.value === !0 ? "height" : "width"), b = s(() => {
      const h = l.value, w = rc({
        p: n.value,
        pos: e.position,
        active: h,
        horiz: d.value,
        reverse: a.$q.lang.rtl === !0 && ["top", "bottom"].includes(e.position) ? e.reverse === !1 : e.reverse,
        dir: a.$q.lang.rtl === !0 ? -1 : 1
      });
      return w[v.value] = e.size, w.opacity = h ? 1 : 0, w;
    }), m = s(() => l.value === !0 ? {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": n.value
    } : { "aria-hidden": "true" });
    function g(h = 300) {
      const w = u;
      return u = Math.max(0, h) || 0, i++, i > 1 ? (w === 0 && h > 0 ? C() : r !== null && w > 0 && h <= 0 && (clearTimeout(r), r = null), i) : (r !== null && clearTimeout(r), t("start"), n.value = 0, r = setTimeout(() => {
        r = null, o.value = !0, h > 0 && C();
      }, l._value === !0 ? 500 : 1), l._value !== !0 && (l.value = !0, o.value = !1), i);
    }
    function p(h) {
      return i > 0 && (n.value = sc(n.value, h)), i;
    }
    function k() {
      if (i = Math.max(0, i - 1), i > 0) return i;
      r !== null && (clearTimeout(r), r = null), t("stop");
      const h = () => {
        o.value = !0, n.value = 100, r = setTimeout(() => {
          r = null, l.value = !1;
        }, 1e3);
      };
      return n.value === 0 ? r = setTimeout(h, 1) : h(), i;
    }
    function C() {
      n.value < 100 && (r = setTimeout(() => {
        r = null, p(), C();
      }, u));
    }
    let y;
    return bt(() => {
      e.skipHijack !== !0 && (y = !0, uc({
        start: g,
        stop: k,
        hijackFilter: s(() => e.hijackFilter || null)
      }));
    }), tt(() => {
      r !== null && clearTimeout(r), y === !0 && dc(g);
    }), Object.assign(a, {
      start: g,
      stop: k,
      increment: p
    }), () => f("div", {
      class: c.value,
      style: b.value,
      ...m.value
    });
  }
});
const Lo = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
}, xa = { size: String };
function _a(e, t = Lo) {
  return s(() => e.size !== void 0 ? { fontSize: e.size in t ? `${t[e.size]}px` : e.size } : null);
}
function De(e, t) {
  return e !== void 0 && e() || t;
}
function Xn(e, t) {
  if (e !== void 0) {
    const a = e();
    if (a != null) return a.slice();
  }
  return t;
}
function $t(e, t) {
  return e !== void 0 ? t.concat(e()) : t;
}
function Go(e, t) {
  return e === void 0 ? t : t !== void 0 ? t.concat(e()) : e();
}
function oa(e, t, a, n, l, o) {
  t.key = n + l;
  const i = f(e, t, a);
  return l === !0 ? aa(i, o()) : i;
}
const Pi = "0 0 24 24", to = (e) => e, ao = (e) => `ionicons ${e}`, ms = {
  "mdi-": (e) => `mdi ${e}`,
  "icon-": to,
  "bt-": (e) => `bt ${e}`,
  "eva-": (e) => `eva ${e}`,
  "ion-md": ao,
  "ion-ios": ao,
  "ion-logo": ao,
  "iconfont ": to,
  "ti-": (e) => `themify-icon ${e}`,
  "bi-": (e) => `bootstrap-icons ${e}`,
  "i-": to
}, gs = {
  o_: "-outlined",
  r_: "-round",
  s_: "-sharp"
}, hs = {
  sym_o_: "-outlined",
  sym_r_: "-rounded",
  sym_s_: "-sharp"
}, cc = new RegExp("^(" + Object.keys(ms).join("|") + ")"), fc = new RegExp("^(" + Object.keys(gs).join("|") + ")"), Ri = new RegExp("^(" + Object.keys(hs).join("|") + ")"), vc = /^[Mm]\s?[-+]?\.?\d/, mc = /^img:/, gc = /^svguse:/, hc = /^ion-/, bc = /^(fa-(classic|sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var st = re({
  name: "QIcon",
  props: {
    ...xa,
    tag: {
      type: String,
      default: "i"
    },
    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  },
  setup(e, { slots: t }) {
    const { proxy: { $q: a } } = ye(), n = _a(e), l = s(() => "q-icon" + (e.left === !0 ? " on-left" : "") + (e.right === !0 ? " on-right" : "") + (e.color !== void 0 ? ` text-${e.color}` : "")), o = s(() => {
      let i, r = e.name;
      if (r === "none" || !r) return { none: !0 };
      if (a.iconMapFn !== null) {
        const d = a.iconMapFn(r);
        if (d !== void 0) if (d.icon !== void 0) {
          if (r = d.icon, r === "none" || !r) return { none: !0 };
        } else return {
          cls: d.cls,
          content: d.content !== void 0 ? d.content : " "
        };
      }
      if (vc.test(r) === !0) {
        const [d, v = Pi] = r.split("|");
        return {
          svg: !0,
          viewBox: v,
          nodes: d.split("&&").map((b) => {
            const [m, g, p] = b.split("@@");
            return f("path", {
              style: g,
              d: m,
              transform: p
            });
          })
        };
      }
      if (mc.test(r) === !0) return {
        img: !0,
        src: r.substring(4)
      };
      if (gc.test(r) === !0) {
        const [d, v = Pi] = r.split("|");
        return {
          svguse: !0,
          src: d.substring(7),
          viewBox: v
        };
      }
      let u = " ";
      const c = r.match(cc);
      if (c !== null) i = ms[c[1]](r);
      else if (bc.test(r) === !0) i = r;
      else if (hc.test(r) === !0) i = `ionicons ion-${a.platform.is.ios === !0 ? "ios" : "md"}${r.substring(3)}`;
      else if (Ri.test(r) === !0) {
        i = "notranslate material-symbols";
        const d = r.match(Ri);
        d !== null && (r = r.substring(6), i += hs[d[1]]), u = r;
      } else {
        i = "notranslate material-icons";
        const d = r.match(fc);
        d !== null && (r = r.substring(2), i += gs[d[1]]), u = r;
      }
      return {
        cls: i,
        content: u
      };
    });
    return () => {
      const i = {
        class: l.value,
        style: n.value,
        "aria-hidden": "true"
      };
      return o.value.none === !0 ? f(e.tag, i, De(t.default)) : o.value.img === !0 ? f(e.tag, i, $t(t.default, [f("img", { src: o.value.src })])) : o.value.svg === !0 ? f(e.tag, i, $t(t.default, [f("svg", { viewBox: o.value.viewBox || "0 0 24 24" }, o.value.nodes)])) : o.value.svguse === !0 ? f(e.tag, i, $t(t.default, [f("svg", { viewBox: o.value.viewBox }, [f("use", { "xlink:href": o.value.src })])])) : (o.value.cls !== void 0 && (i.class += " " + o.value.cls), f(e.tag, i, $t(t.default, [o.value.content])));
    };
  }
});
re({
  name: "QAvatar",
  props: {
    ...xa,
    fontSize: String,
    color: String,
    textColor: String,
    icon: String,
    square: Boolean,
    rounded: Boolean
  },
  setup(e, { slots: t }) {
    const a = _a(e), n = s(() => "q-avatar" + (e.color ? ` bg-${e.color}` : "") + (e.textColor ? ` text-${e.textColor} q-chip--colored` : "") + (e.square === !0 ? " q-avatar--square" : e.rounded === !0 ? " rounded-borders" : "")), l = s(() => e.fontSize ? { fontSize: e.fontSize } : null);
    return () => {
      const o = e.icon !== void 0 ? [f(st, { name: e.icon })] : void 0;
      return f("div", {
        class: n.value,
        style: a.value
      }, [f("div", {
        class: "q-avatar__content row flex-center overflow-hidden",
        style: l.value
      }, Go(t.default, o))]);
    };
  }
});
const yc = [
  "top",
  "middle",
  "bottom"
];
re({
  name: "QBadge",
  props: {
    color: String,
    textColor: String,
    floating: Boolean,
    transparent: Boolean,
    multiLine: Boolean,
    outline: Boolean,
    rounded: Boolean,
    label: [Number, String],
    align: {
      type: String,
      validator: (e) => yc.includes(e)
    }
  },
  setup(e, { slots: t }) {
    const a = s(() => e.align !== void 0 ? { verticalAlign: e.align } : null), n = s(() => {
      const l = e.outline === !0 && e.color || e.textColor;
      return `q-badge flex inline items-center no-wrap q-badge--${e.multiLine === !0 ? "multi" : "single"}-line` + (e.outline === !0 ? " q-badge--outline" : e.color !== void 0 ? ` bg-${e.color}` : "") + (l !== void 0 ? ` text-${l}` : "") + (e.floating === !0 ? " q-badge--floating" : "") + (e.rounded === !0 ? " q-badge--rounded" : "") + (e.transparent === !0 ? " q-badge--transparent" : "");
    });
    return () => f("div", {
      class: n.value,
      style: a.value,
      role: "status",
      "aria-label": e.label
    }, $t(t.default, e.label !== void 0 ? [e.label] : []));
  }
});
const it = { dark: {
  type: Boolean,
  default: null
} };
function rt(e, t) {
  return s(() => e.dark === null ? t.dark.isActive : e.dark);
}
var pc = re({
  name: "QBanner",
  props: {
    ...it,
    inlineActions: Boolean,
    dense: Boolean,
    rounded: Boolean
  },
  setup(e, { slots: t }) {
    const { proxy: { $q: a } } = ye(), n = rt(e, a), l = s(() => "q-banner row items-center" + (e.dense === !0 ? " q-banner--dense" : "") + (n.value === !0 ? " q-banner--dark q-dark" : "") + (e.rounded === !0 ? " rounded-borders" : "")), o = s(() => `q-banner__actions row items-center justify-end col-${e.inlineActions === !0 ? "auto" : "all"}`);
    return () => {
      const i = [f("div", { class: "q-banner__avatar col-auto row items-center self-start" }, De(t.avatar)), f("div", { class: "q-banner__content col text-body2" }, De(t.default))], r = De(t.action);
      return r !== void 0 && i.push(f("div", { class: o.value }, r)), f("div", {
        class: l.value + (e.inlineActions === !1 && r !== void 0 ? " q-banner--top-padding" : ""),
        role: "alert"
      }, i);
    };
  }
}), kc = re({
  name: "QBar",
  props: {
    ...it,
    dense: Boolean
  },
  setup(e, { slots: t }) {
    const { proxy: { $q: a } } = ye(), n = rt(e, a), l = s(() => `q-bar row no-wrap items-center q-bar--${e.dense === !0 ? "dense" : "standard"}  q-bar--${n.value === !0 ? "dark" : "light"}`);
    return () => f("div", {
      class: l.value,
      role: "toolbar"
    }, De(t.default));
  }
});
const bs = {
  left: "start",
  center: "center",
  right: "end",
  between: "between",
  around: "around",
  evenly: "evenly",
  stretch: "stretch"
}, Cc = Object.keys(bs), Zo = { align: {
  type: String,
  validator: (e) => Cc.includes(e)
} };
function Jo(e) {
  return s(() => {
    const t = e.align === void 0 ? e.vertical === !0 ? "stretch" : "left" : e.align;
    return `${e.vertical === !0 ? "items" : "justify"}-${bs[t]}`;
  });
}
function gl(e) {
  if (Object(e.$parent) === e.$parent) return e.$parent;
  let { parent: t } = e.$;
  for (; Object(t) === t; ) {
    if (Object(t.proxy) === t.proxy) return t.proxy;
    t = t.parent;
  }
}
function ys(e, t) {
  typeof t.type == "symbol" ? Array.isArray(t.children) === !0 && t.children.forEach((a) => {
    ys(e, a);
  }) : e.add(t);
}
function ei(e) {
  const t = /* @__PURE__ */ new Set();
  return e.forEach((a) => {
    ys(t, a);
  }), Array.from(t);
}
function ti(e) {
  return e.appContext.config.globalProperties.$router !== void 0;
}
function Da(e) {
  return e.isUnmounted === !0 || e.isDeactivated === !0;
}
const Sc = ["", !0];
re({
  name: "QBreadcrumbs",
  props: {
    ...Zo,
    separator: {
      type: String,
      default: "/"
    },
    separatorColor: String,
    activeColor: {
      type: String,
      default: "primary"
    },
    gutter: {
      type: String,
      validator: (e) => [
        "none",
        "xs",
        "sm",
        "md",
        "lg",
        "xl"
      ].includes(e),
      default: "sm"
    }
  },
  setup(e, { slots: t }) {
    const a = Jo(e), n = s(() => `flex items-center ${a.value}${e.gutter === "none" ? "" : ` q-gutter-${e.gutter}`}`), l = s(() => e.separatorColor ? ` text-${e.separatorColor}` : ""), o = s(() => ` text-${e.activeColor}`);
    return () => {
      if (t.default === void 0) return;
      const i = ei(De(t.default));
      if (i.length === 0) return;
      let r = 1;
      const u = [], c = i.filter((v) => {
        var b;
        return ((b = v.type) == null ? void 0 : b.name) === "QBreadcrumbsEl";
      }).length, d = t.separator !== void 0 ? t.separator : () => e.separator;
      return i.forEach((v) => {
        var b;
        if (((b = v.type) == null ? void 0 : b.name) === "QBreadcrumbsEl") {
          const m = r < c, g = v.props !== null && Sc.includes(v.props.disable), p = (m === !0 ? "" : " q-breadcrumbs--last") + (g !== !0 && m === !0 ? o.value : "");
          r++, u.push(f("div", { class: `flex items-center${p}` }, [v])), m === !0 && u.push(f("div", { class: "q-breadcrumbs__separator" + l.value }, d()));
        } else u.push(v);
      }), f("div", { class: "q-breadcrumbs" }, [f("div", { class: n.value }, u)]);
    };
  }
});
function Fi(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
function Ei(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function wc(e, t) {
  for (const a in t) {
    const n = t[a], l = e[a];
    if (typeof n == "string") {
      if (n !== l) return !1;
    } else if (Array.isArray(l) === !1 || l.length !== n.length || n.some((o, i) => o !== l[i])) return !1;
  }
  return !0;
}
function Ii(e, t) {
  return Array.isArray(t) === !0 ? e.length === t.length && e.every((a, n) => a === t[n]) : e.length === 1 && e[0] === t;
}
function xc(e, t) {
  return Array.isArray(e) === !0 ? Ii(e, t) : Array.isArray(t) === !0 ? Ii(t, e) : e === t;
}
function _c(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const a in e) if (xc(e[a], t[a]) === !1) return !1;
  return !0;
}
const ps = {
  to: [String, Object],
  replace: Boolean,
  href: String,
  target: String,
  disable: Boolean
}, Gn = {
  ...ps,
  exact: Boolean,
  activeClass: {
    type: String,
    default: "q-router-link--active"
  },
  exactActiveClass: {
    type: String,
    default: "q-router-link--exact-active"
  }
};
function Rl({ fallbackTag: e, useDisableForRouterLinkProps: t = !0 } = {}) {
  const a = ye(), { props: n, proxy: l, emit: o } = a, i = ti(a), r = s(() => n.disable !== !0 && n.href !== void 0), u = t === !0 ? s(() => i === !0 && n.disable !== !0 && r.value !== !0 && n.to !== void 0 && n.to !== null && n.to !== "") : s(() => i === !0 && r.value !== !0 && n.to !== void 0 && n.to !== null && n.to !== ""), c = s(() => u.value === !0 ? y(n.to) : null), d = s(() => c.value !== null), v = s(() => r.value === !0 || d.value === !0), b = s(() => n.type === "a" || v.value === !0 ? "a" : n.tag || e || "div"), m = s(() => r.value === !0 ? {
    href: n.href,
    target: n.target
  } : d.value === !0 ? {
    href: c.value.href,
    target: n.target
  } : {}), g = s(() => {
    if (d.value === !1) return -1;
    const { matched: x } = c.value, { length: L } = x, M = x[L - 1];
    if (M === void 0) return -1;
    const K = l.$route.matched;
    if (K.length === 0) return -1;
    const X = K.findIndex(Ei.bind(null, M));
    if (X !== -1) return X;
    const A = Fi(x[L - 2]);
    return L > 1 && Fi(M) === A && K[K.length - 1].path !== A ? K.findIndex(Ei.bind(null, x[L - 2])) : X;
  }), p = s(() => d.value === !0 && g.value !== -1 && wc(l.$route.params, c.value.params)), k = s(() => p.value === !0 && g.value === l.$route.matched.length - 1 && _c(l.$route.params, c.value.params)), C = s(() => d.value === !0 ? k.value === !0 ? ` ${n.exactActiveClass} ${n.activeClass}` : n.exact === !0 ? "" : p.value === !0 ? ` ${n.activeClass}` : "" : "");
  function y(x) {
    try {
      return l.$router.resolve(x);
    } catch {
    }
    return null;
  }
  function h(x, { returnRouterError: L, to: M = n.to, replace: K = n.replace } = {}) {
    if (n.disable === !0)
      return x.preventDefault(), Promise.resolve(!1);
    if (x.metaKey || x.altKey || x.ctrlKey || x.shiftKey || x.button !== void 0 && x.button !== 0 || n.target === "_blank") return Promise.resolve(!1);
    x.preventDefault();
    const X = l.$router[K === !0 ? "replace" : "push"](M);
    return L === !0 ? X : X.then(() => {
    }).catch(() => {
    });
  }
  function w(x) {
    if (d.value === !0) {
      const L = (M) => h(x, M);
      o("click", x, L), x.defaultPrevented !== !0 && L();
    } else o("click", x);
  }
  return {
    hasRouterLink: d,
    hasHrefLink: r,
    hasLink: v,
    linkTag: b,
    resolvedLink: c,
    linkIsActive: p,
    linkIsExactActive: k,
    linkClass: C,
    linkAttrs: m,
    getLink: y,
    navigateToRouterLink: h,
    navigateOnClick: w
  };
}
re({
  name: "QBreadcrumbsEl",
  props: {
    ...Gn,
    label: String,
    icon: String,
    tag: {
      type: String,
      default: "span"
    }
  },
  emits: ["click"],
  setup(e, { slots: t }) {
    const { linkTag: a, linkAttrs: n, linkClass: l, navigateOnClick: o } = Rl(), i = s(() => ({
      class: "q-breadcrumbs__el q-link flex inline items-center relative-position " + (e.disable !== !0 ? "q-link--focusable" + l.value : "q-breadcrumbs__el--disable"),
      ...n.value,
      onClick: o
    })), r = s(() => "q-breadcrumbs__el-icon" + (e.label !== void 0 ? " q-breadcrumbs__el-icon--with-label" : ""));
    return () => {
      const u = [];
      return e.icon !== void 0 && u.push(f(st, {
        class: r.value,
        name: e.icon
      })), e.label !== void 0 && u.push(e.label), f(a.value, { ...i.value }, $t(t.default, u));
    };
  }
});
const Bt = {
  size: {
    type: [String, Number],
    default: "1em"
  },
  color: String
};
function Tt(e) {
  return {
    cSize: s(() => e.size in Lo ? `${Lo[e.size]}px` : e.size),
    classes: s(() => "q-spinner" + (e.color ? ` text-${e.color}` : ""))
  };
}
var ia = re({
  name: "QSpinner",
  props: {
    ...Bt,
    thickness: {
      type: Number,
      default: 5
    }
  },
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value + " q-spinner-mat",
      width: t.value,
      height: t.value,
      viewBox: "25 25 50 50"
    }, [f("circle", {
      class: "path",
      cx: "50",
      cy: "50",
      r: "20",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": e.thickness,
      "stroke-miterlimit": "10"
    })]);
  }
});
function Cl(e) {
  if (e === window) return {
    top: 0,
    left: 0
  };
  const { top: t, left: a } = e.getBoundingClientRect();
  return {
    top: t,
    left: a
  };
}
function xn(e) {
  return e === window ? window.innerHeight : e.getBoundingClientRect().height;
}
function zo(e, t) {
  const a = e.style;
  for (const n in t) a[n] = t[n];
}
function $c(e) {
  if (e == null) return;
  if (typeof e == "string") try {
    return document.querySelector(e) || void 0;
  } catch {
    return;
  }
  const t = F(e);
  if (t) return t.$el || t;
}
function ks(e, t) {
  if (e == null || e.contains(t) === !0) return !0;
  for (let a = e.nextElementSibling; a !== null; a = a.nextElementSibling) if (a.contains(t)) return !0;
  return !1;
}
function Cs(e, t = 250) {
  let a = !1, n;
  return function() {
    return a === !1 && (a = !0, setTimeout(() => {
      a = !1;
    }, t), n = e.apply(this, arguments)), n;
  };
}
function Oi(e, t, a, n) {
  a.modifiers.stop === !0 && wt(e);
  const l = a.modifiers.color;
  let o = a.modifiers.center;
  o = o === !0 || n === !0;
  const i = document.createElement("span"), r = document.createElement("span"), u = Wt(e), { left: c, top: d, width: v, height: b } = t.getBoundingClientRect(), m = Math.sqrt(v * v + b * b), g = m / 2, p = `${(v - m) / 2}px`, k = o ? p : `${u.left - c - g}px`, C = `${(b - m) / 2}px`, y = o ? C : `${u.top - d - g}px`;
  r.className = "q-ripple__inner", zo(r, {
    height: `${m}px`,
    width: `${m}px`,
    transform: `translate3d(${k},${y},0) scale3d(.2,.2,1)`,
    opacity: 0
  }), i.className = `q-ripple${l ? " text-" + l : ""}`, i.setAttribute("dir", "ltr"), i.appendChild(r), t.appendChild(i);
  const h = () => {
    i.remove(), clearTimeout(w);
  };
  a.abort.push(h);
  let w = setTimeout(() => {
    r.classList.add("q-ripple__inner--enter"), r.style.transform = `translate3d(${p},${C},0) scale3d(1,1,1)`, r.style.opacity = 0.2, w = setTimeout(() => {
      r.classList.remove("q-ripple__inner--enter"), r.classList.add("q-ripple__inner--leave"), r.style.opacity = 0, w = setTimeout(() => {
        i.remove(), a.abort.splice(a.abort.indexOf(h), 1);
      }, 275);
    }, 250);
  }, 50);
}
function Hi(e, { modifiers: t, value: a, arg: n }) {
  const l = Object.assign({}, e.cfg.ripple, t, a);
  e.modifiers = {
    early: l.early === !0,
    stop: l.stop === !0,
    center: l.center === !0,
    color: l.color || n,
    keyCodes: [].concat(l.keyCodes || 13)
  };
}
var Fl = ca({
  name: "ripple",
  beforeMount(e, t) {
    const a = t.instance.$.appContext.config.globalProperties.$q.config || {};
    if (a.ripple === !1) return;
    const n = {
      cfg: a,
      enabled: t.value !== !1,
      modifiers: {},
      abort: [],
      start(l) {
        n.enabled === !0 && l.qSkipRipple !== !0 && l.type === (n.modifiers.early === !0 ? "pointerdown" : "click") && Oi(l, e, n, l.qKeyEvent === !0);
      },
      keystart: Cs((l) => {
        n.enabled === !0 && l.qSkipRipple !== !0 && la(l, n.modifiers.keyCodes) === !0 && l.type === `key${n.modifiers.early === !0 ? "down" : "up"}` && Oi(l, e, n, !0);
      }, 300)
    };
    Hi(n, t), e.__qripple = n, _t(n, "main", [
      [
        e,
        "pointerdown",
        "start",
        "passive"
      ],
      [
        e,
        "click",
        "start",
        "passive"
      ],
      [
        e,
        "keydown",
        "keystart",
        "passive"
      ],
      [
        e,
        "keyup",
        "keystart",
        "passive"
      ]
    ]);
  },
  updated(e, t) {
    if (t.oldValue !== t.value) {
      const a = e.__qripple;
      a !== void 0 && (a.enabled = t.value !== !1, a.enabled === !0 && Object(t.value) === t.value && Hi(a, t));
    }
  },
  beforeUnmount(e) {
    const t = e.__qripple;
    t !== void 0 && (t.abort.forEach((a) => {
      a();
    }), Ut(t, "main"), delete e._qripple);
  }
});
const Sl = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
}, qc = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
}, Bc = [
  "button",
  "submit",
  "reset"
], Tc = /[^\s]\/[^\s]/, Ss = [
  "flat",
  "outline",
  "push",
  "unelevated"
];
function ai(e, t) {
  return e.flat === !0 ? "flat" : e.outline === !0 ? "outline" : e.push === !0 ? "push" : e.unelevated === !0 ? "unelevated" : t;
}
function ws(e) {
  const t = ai(e);
  return t !== void 0 ? { [t]: !0 } : {};
}
const ni = {
  ...xa,
  ...ps,
  type: {
    type: String,
    default: "button"
  },
  label: [Number, String],
  icon: String,
  iconRight: String,
  ...Ss.reduce((e, t) => (e[t] = Boolean) && e, {}),
  square: Boolean,
  rounded: Boolean,
  glossy: Boolean,
  size: String,
  fab: Boolean,
  fabMini: Boolean,
  padding: String,
  color: String,
  textColor: String,
  noCaps: Boolean,
  noWrap: Boolean,
  dense: Boolean,
  tabindex: [Number, String],
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  align: {
    ...Zo.align,
    default: "center"
  },
  stack: Boolean,
  stretch: Boolean,
  loading: {
    type: Boolean,
    default: null
  },
  disable: Boolean
}, Mc = {
  ...ni,
  round: Boolean
};
function Ac(e) {
  const t = _a(e, qc), a = Jo(e), { hasRouterLink: n, hasLink: l, linkTag: o, linkAttrs: i, navigateOnClick: r } = Rl({ fallbackTag: "button" }), u = s(() => {
    const g = e.fab === !1 && e.fabMini === !1 ? t.value : {};
    return e.padding !== void 0 ? Object.assign({}, g, {
      padding: e.padding.split(/\s+/).map((p) => p in Sl ? Sl[p] + "px" : p).join(" "),
      minWidth: "0",
      minHeight: "0"
    }) : g;
  }), c = s(() => e.rounded === !0 || e.fab === !0 || e.fabMini === !0), d = s(() => e.disable !== !0 && e.loading !== !0), v = s(() => d.value === !0 ? e.tabindex || 0 : -1), b = s(() => ai(e, "standard")), m = s(() => {
    const g = { tabindex: v.value };
    return l.value === !0 ? Object.assign(g, i.value) : Bc.includes(e.type) === !0 && (g.type = e.type), o.value === "a" ? (e.disable === !0 ? g["aria-disabled"] = "true" : g.href === void 0 && (g.role = "button"), n.value !== !0 && Tc.test(e.type) === !0 && (g.type = e.type)) : e.disable === !0 && (g.disabled = "", g["aria-disabled"] = "true"), e.loading === !0 && e.percentage !== void 0 && Object.assign(g, {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": e.percentage
    }), g;
  });
  return {
    classes: s(() => {
      let g;
      e.color !== void 0 ? e.flat === !0 || e.outline === !0 ? g = `text-${e.textColor || e.color}` : g = `bg-${e.color} text-${e.textColor || "white"}` : e.textColor && (g = `text-${e.textColor}`);
      const p = e.round === !0 ? "round" : `rectangle${c.value === !0 ? " q-btn--rounded" : e.square === !0 ? " q-btn--square" : ""}`;
      return `q-btn--${b.value} q-btn--${p}` + (g !== void 0 ? " " + g : "") + (d.value === !0 ? " q-btn--actionable q-focusable q-hoverable" : e.disable === !0 ? " disabled" : "") + (e.fab === !0 ? " q-btn--fab" : e.fabMini === !0 ? " q-btn--fab-mini" : "") + (e.noCaps === !0 ? " q-btn--no-uppercase" : "") + (e.dense === !0 ? " q-btn--dense" : "") + (e.stretch === !0 ? " no-border-radius self-stretch" : "") + (e.glossy === !0 ? " glossy" : "") + (e.square ? " q-btn--square" : "");
    }),
    style: u,
    innerClasses: s(() => a.value + (e.stack === !0 ? " column" : " row") + (e.noWrap === !0 ? " no-wrap text-no-wrap" : "") + (e.loading === !0 ? " q-btn__content--hidden" : "")),
    attributes: m,
    hasLink: l,
    linkTag: o,
    navigateOnClick: r,
    isActionable: d
  };
}
const { passiveCapture: ea } = gt;
let ln = null, on = null, rn = null;
var ft = re({
  name: "QBtn",
  props: {
    ...Mc,
    percentage: Number,
    darkPercentage: Boolean,
    onTouchstart: [Function, Array]
  },
  emits: [
    "click",
    "keydown",
    "mousedown",
    "keyup"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), { classes: l, style: o, innerClasses: i, attributes: r, hasLink: u, linkTag: c, navigateOnClick: d, isActionable: v } = Ac(e), b = z(null), m = z(null);
    let g = null, p, k = null;
    const C = s(() => e.label !== void 0 && e.label !== null && e.label !== ""), y = s(() => e.disable === !0 || e.ripple === !1 ? !1 : {
      keyCodes: u.value === !0 ? [13, 32] : [13],
      ...e.ripple === !0 ? {} : e.ripple
    }), h = s(() => ({ center: e.round })), w = s(() => {
      const S = Math.max(0, Math.min(100, e.percentage));
      return S > 0 ? {
        transition: "transform 0.6s",
        transform: `translateX(${S - 100}%)`
      } : {};
    }), x = s(() => {
      if (e.loading === !0) return {
        onMousedown: _,
        onTouchstart: _,
        onClick: _,
        onKeydown: _,
        onKeyup: _
      };
      if (v.value === !0) {
        const S = {
          onClick: M,
          onKeydown: K,
          onMousedown: A
        };
        if (n.$q.platform.has.touch === !0) {
          const T = e.onTouchstart !== void 0 ? "" : "Passive";
          S[`onTouchstart${T}`] = X;
        }
        return S;
      }
      return { onClick: Ye };
    }), L = s(() => ({
      ref: b,
      class: "q-btn q-btn-item non-selectable no-outline " + l.value,
      style: o.value,
      ...r.value,
      ...x.value
    }));
    function M(S) {
      if (b.value !== null) {
        if (S !== void 0) {
          if (S.defaultPrevented === !0) return;
          const T = document.activeElement;
          if (e.type === "submit" && T !== document.body && b.value.contains(T) === !1 && T.contains(b.value) === !1) {
            S.qAvoidFocus !== !0 && b.value.focus();
            const H = () => {
              var E;
              document.removeEventListener("keydown", Ye, !0), document.removeEventListener("keyup", H, ea), (E = b.value) == null || E.removeEventListener("blur", H, ea);
            };
            document.addEventListener("keydown", Ye, !0), document.addEventListener("keyup", H, ea), b.value.addEventListener("blur", H, ea);
          }
        }
        d(S);
      }
    }
    function K(S) {
      b.value !== null && (a("keydown", S), la(S, [13, 32]) === !0 && on !== b.value && (on !== null && D(), S.defaultPrevented !== !0 && (S.qAvoidFocus !== !0 && b.value.focus(), on = b.value, b.value.classList.add("q-btn--active"), document.addEventListener("keyup", $, !0), b.value.addEventListener("blur", $, ea)), Ye(S)));
    }
    function X(S) {
      b.value !== null && (a("touchstart", S), S.defaultPrevented !== !0 && (ln !== b.value && (ln !== null && D(), ln = b.value, g = S.target, g.addEventListener("touchcancel", $, ea), g.addEventListener("touchend", $, ea)), p = !0, k !== null && clearTimeout(k), k = setTimeout(() => {
        k = null, p = !1;
      }, 200)));
    }
    function A(S) {
      b.value !== null && (S.qSkipRipple = p === !0, a("mousedown", S), S.defaultPrevented !== !0 && rn !== b.value && (rn !== null && D(), rn = b.value, b.value.classList.add("q-btn--active"), document.addEventListener("mouseup", $, ea)));
    }
    function $(S) {
      if (b.value !== null && !((S == null ? void 0 : S.type) === "blur" && document.activeElement === b.value)) {
        if ((S == null ? void 0 : S.type) === "keyup") {
          if (on === b.value && la(S, [13, 32]) === !0) {
            const T = new MouseEvent("click", S);
            T.qKeyEvent = !0, S.defaultPrevented === !0 && Ft(T), S.cancelBubble === !0 && wt(T), b.value.dispatchEvent(T), Ye(S), S.qKeyEvent = !0;
          }
          a("keyup", S);
        }
        D();
      }
    }
    function D(S) {
      var H, E;
      const T = m.value;
      S !== !0 && (ln === b.value || rn === b.value) && T !== null && T !== document.activeElement && (T.setAttribute("tabindex", -1), T.focus()), ln === b.value && (g !== null && (g.removeEventListener("touchcancel", $, ea), g.removeEventListener("touchend", $, ea)), ln = g = null), rn === b.value && (document.removeEventListener("mouseup", $, ea), rn = null), on === b.value && (document.removeEventListener("keyup", $, !0), (H = b.value) == null || H.removeEventListener("blur", $, ea), on = null), (E = b.value) == null || E.classList.remove("q-btn--active");
    }
    function _(S) {
      Ye(S), S.qSkipRipple = !0;
    }
    return tt(() => {
      D(!0);
    }), Object.assign(n, { click: (S) => {
      v.value === !0 && M(S);
    } }), () => {
      let S = [];
      e.icon !== void 0 && S.push(f(st, {
        name: e.icon,
        left: e.stack !== !0 && C.value === !0,
        role: "img"
      })), C.value === !0 && S.push(f("span", { class: "block" }, [e.label])), S = $t(t.default, S), e.iconRight !== void 0 && e.round === !1 && S.push(f(st, {
        name: e.iconRight,
        right: e.stack !== !0 && C.value === !0,
        role: "img"
      }));
      const T = [f("span", {
        class: "q-focus-helper",
        ref: m
      })];
      return e.loading === !0 && e.percentage !== void 0 && T.push(f("span", { class: "q-btn__progress absolute-full overflow-hidden" + (e.darkPercentage === !0 ? " q-btn__progress--dark" : "") }, [f("span", {
        class: "q-btn__progress-indicator fit block",
        style: w.value
      })])), T.push(f("span", { class: "q-btn__content text-center col items-center q-anchor--skip " + i.value }, S)), e.loading !== null && T.push(f(Pt, { name: "q-transition--fade" }, () => e.loading === !0 ? [f("span", {
        key: "loading",
        class: "absolute-full flex flex-center"
      }, t.loading !== void 0 ? t.loading() : [f(ia)])] : null)), aa(f(c.value, L.value, T), [[
        Fl,
        y.value,
        void 0,
        h.value
      ]]);
    };
  }
}), xs = re({
  name: "QBtnGroup",
  props: {
    unelevated: Boolean,
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    square: Boolean,
    push: Boolean,
    stretch: Boolean,
    glossy: Boolean,
    spread: Boolean
  },
  setup(e, { slots: t }) {
    const a = s(() => {
      const n = [
        "unelevated",
        "outline",
        "flat",
        "rounded",
        "square",
        "push",
        "stretch",
        "glossy"
      ].filter((l) => e[l] === !0).map((l) => `q-btn-group--${l}`).join(" ");
      return `q-btn-group row no-wrap${n.length !== 0 ? " " + n : ""}` + (e.spread === !0 ? " q-btn-group--spread" : " inline");
    });
    return () => f("div", { class: a.value }, De(t.default));
  }
});
function da() {
  if (window.getSelection !== void 0) {
    const e = window.getSelection();
    e.empty !== void 0 ? e.empty() : e.removeAllRanges !== void 0 && (e.removeAllRanges(), To.is.mobile !== !0 && e.addRange(document.createRange()));
  } else document.selection !== void 0 && document.selection.empty();
}
const _s = {
  target: {
    type: [
      Boolean,
      String,
      Element
    ],
    default: !0
  },
  noParentEvent: Boolean
}, $s = {
  ..._s,
  contextMenu: Boolean
};
function li({ showing: e, avoidEmit: t, configureAnchorEl: a }) {
  const { props: n, proxy: l, emit: o } = ye(), i = z(null);
  let r = null;
  function u(m) {
    return i.value === null ? !1 : m === void 0 || m.touches === void 0 || m.touches.length <= 1;
  }
  const c = {};
  a === void 0 && (Object.assign(c, {
    hide(m) {
      l.hide(m);
    },
    toggle(m) {
      l.toggle(m), m.qAnchorHandled = !0;
    },
    toggleKey(m) {
      la(m, 13) === !0 && c.toggle(m);
    },
    contextClick(m) {
      l.hide(m), Ft(m), nt(() => {
        l.show(m), m.qAnchorHandled = !0;
      });
    },
    prevent: Ft,
    mobileTouch(m) {
      if (c.mobileCleanup(m), u(m) !== !0) return;
      l.hide(m), i.value.classList.add("non-selectable");
      const g = m.target;
      _t(c, "anchor", [
        [
          g,
          "touchmove",
          "mobileCleanup",
          "passive"
        ],
        [
          g,
          "touchend",
          "mobileCleanup",
          "passive"
        ],
        [
          g,
          "touchcancel",
          "mobileCleanup",
          "passive"
        ],
        [
          i.value,
          "contextmenu",
          "prevent",
          "notPassive"
        ]
      ]), r = setTimeout(() => {
        r = null, l.show(m), m.qAnchorHandled = !0;
      }, 300);
    },
    mobileCleanup(m) {
      i.value.classList.remove("non-selectable"), r !== null && (clearTimeout(r), r = null), e.value === !0 && m !== void 0 && da();
    }
  }), a = function(g = n.contextMenu) {
    if (n.noParentEvent === !0 || i.value === null) return;
    let p;
    g === !0 ? l.$q.platform.is.mobile === !0 ? p = [[
      i.value,
      "touchstart",
      "mobileTouch",
      "passive"
    ]] : p = [[
      i.value,
      "mousedown",
      "hide",
      "passive"
    ], [
      i.value,
      "contextmenu",
      "contextClick",
      "notPassive"
    ]] : p = [[
      i.value,
      "click",
      "toggle",
      "passive"
    ], [
      i.value,
      "keyup",
      "toggleKey",
      "passive"
    ]], _t(c, "anchor", p);
  });
  function d() {
    Ut(c, "anchor");
  }
  function v(m) {
    for (i.value = m; i.value.classList.contains("q-anchor--skip"); ) i.value = i.value.parentNode;
    a();
  }
  function b() {
    if (n.target === !1 || n.target === "" || l.$el.parentNode === null) i.value = null;
    else if (n.target === !0) v(l.$el.parentNode);
    else {
      let m = n.target;
      if (typeof n.target == "string") try {
        m = document.querySelector(n.target);
      } catch {
        m = void 0;
      }
      m != null ? (i.value = m.$el || m, a()) : (i.value = null, console.error(`Anchor: target "${n.target}" not found`));
    }
  }
  return se(() => n.contextMenu, (m) => {
    i.value !== null && (d(), a(m));
  }), se(() => n.target, () => {
    i.value !== null && d(), b();
  }), se(() => n.noParentEvent, (m) => {
    i.value !== null && (m === !0 ? d() : a());
  }), bt(() => {
    b(), t !== !0 && n.modelValue === !0 && i.value === null && o("update:modelValue", !1);
  }), tt(() => {
    r !== null && clearTimeout(r), d();
  }), {
    anchorEl: i,
    canShow: u,
    anchorEvents: c
  };
}
function qs(e, t) {
  const a = z(null);
  let n;
  function l(i, r) {
    const u = `${r !== void 0 ? "add" : "remove"}EventListener`, c = r !== void 0 ? r : n;
    i !== window && i[u]("scroll", c, gt.passive), window[u]("scroll", c, gt.passive), n = r;
  }
  function o() {
    a.value !== null && (l(a.value), a.value = null);
  }
  return tt(se(() => e.noParentEvent, () => {
    a.value !== null && (o(), t());
  })), {
    localScrollTarget: a,
    unconfigureScrollTarget: o,
    changeScrollEvent: l
  };
}
const qn = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
}, Bn = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function Tn({ showing: e, canShow: t, hideOnRouteChange: a, handleShow: n, handleHide: l, processOnMount: o }) {
  const i = ye(), { props: r, emit: u, proxy: c } = i;
  let d;
  function v(y) {
    e.value === !0 ? g(y) : b(y);
  }
  function b(y) {
    if (r.disable === !0 || (y == null ? void 0 : y.qAnchorHandled) === !0 || t !== void 0 && t(y) !== !0) return;
    const h = r["onUpdate:modelValue"] !== void 0;
    h === !0 && (u("update:modelValue", !0), d = y, nt(() => {
      d === y && (d = void 0);
    })), (r.modelValue === null || h === !1) && m(y);
  }
  function m(y) {
    e.value !== !0 && (e.value = !0, u("beforeShow", y), n !== void 0 ? n(y) : u("show", y));
  }
  function g(y) {
    if (r.disable === !0) return;
    const h = r["onUpdate:modelValue"] !== void 0;
    h === !0 && (u("update:modelValue", !1), d = y, nt(() => {
      d === y && (d = void 0);
    })), (r.modelValue === null || h === !1) && p(y);
  }
  function p(y) {
    e.value !== !1 && (e.value = !1, u("beforeHide", y), l !== void 0 ? l(y) : u("hide", y));
  }
  function k(y) {
    r.disable === !0 && y === !0 ? r["onUpdate:modelValue"] !== void 0 && u("update:modelValue", !1) : y === !0 !== e.value && (y === !0 ? m : p)(d);
  }
  se(() => r.modelValue, k), a !== void 0 && ti(i) === !0 && se(() => c.$route.fullPath, () => {
    a.value === !0 && e.value === !0 && g();
  }), o === !0 && bt(() => {
    k(r.modelValue);
  });
  const C = {
    show: b,
    hide: g,
    toggle: v
  };
  return Object.assign(c, C), C;
}
let Qa = [], Qn = [];
function Bs(e) {
  Qn = Qn.filter((t) => t !== e);
}
function Dc(e) {
  Bs(e), Qn.push(e);
}
function Ni(e) {
  Bs(e), Qn.length === 0 && Qa.length !== 0 && (Qa[Qa.length - 1](), Qa = []);
}
function Mn(e) {
  Qn.length === 0 ? e() : Qa.push(e);
}
function Lc(e) {
  Qa = Qa.filter((t) => t !== e);
}
const yn = [], En = [];
let zc = 1, Ba = document.body;
function oi(e, t) {
  const a = document.createElement("div");
  if (a.id = t !== void 0 ? `q-portal--${t}--${zc++}` : e, zi.globalNodes !== void 0) {
    const n = zi.globalNodes.class;
    n !== void 0 && (a.className = n);
  }
  return Ba.appendChild(a), yn.push(a), En.push(t), a;
}
function Ts(e) {
  const t = yn.indexOf(e);
  yn.splice(t, 1), En.splice(t, 1), e.remove();
}
function Vc(e) {
  if (e === Ba) return;
  if (Ba = e, Ba === document.body || En.reduce((a, n) => n === "dialog" ? a + 1 : a, 0) < 2) {
    yn.forEach((a) => {
      a.contains(Ba) === !1 && Ba.appendChild(a);
    });
    return;
  }
  const t = En.lastIndexOf("dialog");
  for (let a = 0; a < yn.length; a++) {
    const n = yn[a];
    (a === t || En[a] !== "dialog") && n.contains(Ba) === !1 && Ba.appendChild(n);
  }
}
const pn = [];
function Pc(e) {
  return pn.find((t) => t.contentEl !== null && t.contentEl.contains(e));
}
function Ms(e, t) {
  do {
    if (e.$options.name === "QMenu") {
      if (e.hide(t), e.$props.separateClosePopup === !0) return gl(e);
    } else if (e.__qPortal === !0) {
      const a = gl(e);
      return (a == null ? void 0 : a.$options.name) === "QPopupProxy" ? (e.hide(t), a) : e;
    }
    e = gl(e);
  } while (e != null);
}
function Rc(e, t, a) {
  for (; a !== 0 && e !== void 0 && e !== null; ) {
    if (e.__qPortal === !0) {
      if (a--, e.$options.name === "QMenu") {
        e = Ms(e, t);
        continue;
      }
      e.hide(t);
    }
    e = gl(e);
  }
}
const Fc = re({
  name: "QPortal",
  setup(e, { slots: t }) {
    return () => t.default();
  }
});
function Ec(e) {
  for (e = e.parent; e != null; ) {
    if (e.type.name === "QGlobalDialog") return !0;
    if (e.type.name === "QDialog" || e.type.name === "QMenu") return !1;
    e = e.parent;
  }
  return !1;
}
function ii(e, t, a, n) {
  const l = z(!1), o = z(!1);
  let i = null;
  const r = {}, u = n === "dialog" && Ec(e);
  function c(v) {
    if (v === !0) {
      Ni(r), o.value = !0;
      return;
    }
    o.value = !1, l.value === !1 && (u === !1 && i === null && (i = oi(!1, n)), l.value = !0, pn.push(e.proxy), Dc(r));
  }
  function d(v) {
    if (o.value = !1, v !== !0) return;
    Ni(r), l.value = !1;
    const b = pn.indexOf(e.proxy);
    b !== -1 && pn.splice(b, 1), i !== null && (Ts(i), i = null);
  }
  return Vl(() => {
    d(!0);
  }), e.proxy.__qPortal = !0, Rt(e.proxy, "contentEl", () => t.value), {
    showPortal: c,
    hidePortal: d,
    portalIsActive: l,
    portalIsAccessible: o,
    renderPortal: () => u === !0 ? a() : l.value === !0 ? [f(kd, { to: i }, f(Fc, a))] : void 0
  };
}
const Ka = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
function El(e, t = () => {
}, a = () => {
}) {
  return {
    transitionProps: s(() => {
      const n = `q-transition--${e.transitionShow || t()}`, l = `q-transition--${e.transitionHide || a()}`;
      return {
        appear: !0,
        enterFromClass: `${n}-enter-from`,
        enterActiveClass: `${n}-enter-active`,
        enterToClass: `${n}-enter-to`,
        leaveFromClass: `${l}-leave-from`,
        leaveActiveClass: `${l}-leave-active`,
        leaveToClass: `${l}-leave-to`
      };
    }),
    transitionStyle: s(() => `--q-transition-duration: ${e.transitionDuration}ms`)
  };
}
function kn() {
  let e;
  const t = ye();
  function a() {
    e = void 0;
  }
  return wa(a), tt(a), {
    removeTick: a,
    registerTick(n) {
      e = n, nt(() => {
        e === n && (Da(t) === !1 && e(), e = void 0);
      });
    }
  };
}
function Sa() {
  let e = null;
  const t = ye();
  function a() {
    e !== null && (clearTimeout(e), e = null);
  }
  return wa(a), tt(a), {
    removeTimeout: a,
    registerTimeout(n, l) {
      a(), Da(t) === !1 && (e = setTimeout(() => {
        e = null, n();
      }, l));
    }
  };
}
const nn = [Element, String], Ic = [
  null,
  document,
  document.body,
  document.scrollingElement,
  document.documentElement
];
function ma(e, t) {
  let a = $c(t);
  if (a === void 0) {
    if (e == null) return window;
    a = e.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return Ic.includes(a) ? window : a;
}
function el(e) {
  return (e === window ? document.body : e).scrollHeight;
}
function La(e) {
  return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop;
}
function Il(e) {
  return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft;
}
function As(e, t, a = 0) {
  const n = arguments[3] === void 0 ? performance.now() : arguments[3], l = La(e);
  if (a <= 0) {
    l !== t && Vo(e, t);
    return;
  }
  requestAnimationFrame((o) => {
    const i = o - n, r = l + (t - l) / Math.max(i, a) * i;
    Vo(e, r), r !== t && As(e, t, a - i, o);
  });
}
function Ds(e, t, a = 0) {
  const n = arguments[3] === void 0 ? performance.now() : arguments[3], l = Il(e);
  if (a <= 0) {
    l !== t && Po(e, t);
    return;
  }
  requestAnimationFrame((o) => {
    const i = o - n, r = l + (t - l) / Math.max(i, a) * i;
    Po(e, r), r !== t && Ds(e, t, a - i, o);
  });
}
function Vo(e, t) {
  if (e === window) {
    window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t);
    return;
  }
  e.scrollTop = t;
}
function Po(e, t) {
  if (e === window) {
    window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    return;
  }
  e.scrollLeft = t;
}
function Cn(e, t, a) {
  if (a) {
    As(e, t, a);
    return;
  }
  Vo(e, t);
}
function no(e, t, a) {
  if (a) {
    Ds(e, t, a);
    return;
  }
  Po(e, t);
}
let tl;
function hl() {
  if (tl !== void 0) return tl;
  const e = document.createElement("p"), t = document.createElement("div");
  zo(e, {
    width: "100%",
    height: "200px"
  }), zo(t, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  }), t.appendChild(e), document.body.appendChild(t);
  const a = e.offsetWidth;
  t.style.overflow = "scroll";
  let n = e.offsetWidth;
  return a === n && (n = t.clientWidth), t.remove(), tl = a - n, tl;
}
function Oc(e, t = !0) {
  return !e || e.nodeType !== Node.ELEMENT_NODE ? !1 : t ? e.scrollHeight > e.clientHeight && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"])) : e.scrollWidth > e.clientWidth && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"]));
}
const Wa = [];
let _n;
function Hc(e) {
  _n = e.keyCode === 27;
}
function Nc() {
  _n === !0 && (_n = !1);
}
function jc(e) {
  _n === !0 && (_n = !1, la(e, 27) === !0 && Wa[Wa.length - 1](e));
}
function Ls(e) {
  window[e]("keydown", Hc), window[e]("blur", Nc), window[e]("keyup", jc), _n = !1;
}
function zs(e) {
  Je.is.desktop === !0 && (Wa.push(e), Wa.length === 1 && Ls("addEventListener"));
}
function wl(e) {
  const t = Wa.indexOf(e);
  t !== -1 && (Wa.splice(t, 1), Wa.length === 0 && Ls("removeEventListener"));
}
const Ya = [];
function Vs(e) {
  Ya[Ya.length - 1](e);
}
function Ps(e) {
  Je.is.desktop === !0 && (Ya.push(e), Ya.length === 1 && document.body.addEventListener("focusin", Vs));
}
function Ro(e) {
  const t = Ya.indexOf(e);
  t !== -1 && (Ya.splice(t, 1), Ya.length === 0 && document.body.removeEventListener("focusin", Vs));
}
const { notPassiveCapture: xl } = gt, Xa = [];
function _l(e) {
  const t = e.target;
  if (t === void 0 || t.nodeType === 8 || t.classList.contains("no-pointer-events") === !0) return;
  let a = pn.length - 1;
  for (; a >= 0; ) {
    const n = pn[a].$;
    if (n.type.name === "QTooltip") {
      a--;
      continue;
    }
    if (n.type.name !== "QDialog") break;
    if (n.props.seamless !== !0) return;
    a--;
  }
  for (let n = Xa.length - 1; n >= 0; n--) {
    const l = Xa[n];
    if ((l.anchorEl.value === null || l.anchorEl.value.contains(t) === !1) && (t === document.body || l.innerRef.value !== null && l.innerRef.value.contains(t) === !1))
      e.qClickOutside = !0, l.onClickOutside(e);
    else return;
  }
}
function Rs(e) {
  Xa.push(e), Xa.length === 1 && (document.addEventListener("mousedown", _l, xl), document.addEventListener("touchstart", _l, xl));
}
function $l(e) {
  const t = Xa.findIndex((a) => a === e);
  t !== -1 && (Xa.splice(t, 1), Xa.length === 0 && (document.removeEventListener("mousedown", _l, xl), document.removeEventListener("touchstart", _l, xl)));
}
let ji, Qi;
function ql(e) {
  const t = e.split(" ");
  return t.length !== 2 ? !1 : [
    "top",
    "center",
    "bottom"
  ].includes(t[0]) !== !0 ? (console.error("Anchor/Self position must start with one of top/center/bottom"), !1) : [
    "left",
    "middle",
    "right",
    "start",
    "end"
  ].includes(t[1]) !== !0 ? (console.error("Anchor/Self position must end with one of left/middle/right/start/end"), !1) : !0;
}
function Fs(e) {
  return e ? !(e.length !== 2 || typeof e[0] != "number" || typeof e[1] != "number") : !0;
}
const Fo = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};
[
  "left",
  "middle",
  "right"
].forEach((e) => {
  Fo[`${e}#ltr`] = e, Fo[`${e}#rtl`] = e;
});
function Bl(e, t) {
  const a = e.split(" ");
  return {
    vertical: a[0],
    horizontal: Fo[`${a[1]}#${t === !0 ? "rtl" : "ltr"}`]
  };
}
function Qc(e, t) {
  let { top: a, left: n, right: l, bottom: o, width: i, height: r } = e.getBoundingClientRect();
  return t !== void 0 && (a -= t[1], n -= t[0], o += t[1], l += t[0], i += t[0], r += t[1]), {
    top: a,
    bottom: o,
    height: r,
    left: n,
    right: l,
    width: i,
    middle: n + (l - n) / 2,
    center: a + (o - a) / 2
  };
}
function Uc(e, t, a) {
  let { top: n, left: l } = e.getBoundingClientRect();
  return n += t.top, l += t.left, a !== void 0 && (n += a[1], l += a[0]), {
    top: n,
    bottom: n + 1,
    height: 1,
    left: l,
    right: l + 1,
    width: 1,
    middle: l,
    center: n
  };
}
function Kc(e, t) {
  return {
    top: 0,
    center: t / 2,
    bottom: t,
    left: 0,
    middle: e / 2,
    right: e
  };
}
function Ui(e, t, a, n) {
  return {
    top: e[a.vertical] - t[n.vertical],
    left: e[a.horizontal] - t[n.horizontal]
  };
}
function ri(e, t = 0) {
  if (e.targetEl === null || e.anchorEl === null || t > 5) return;
  if (e.targetEl.offsetHeight === 0 || e.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      ri(e, t + 1);
    }, 10);
    return;
  }
  const { targetEl: a, offset: n, anchorEl: l, anchorOrigin: o, selfOrigin: i, absoluteOffset: r, fit: u, cover: c, maxHeight: d, maxWidth: v } = e;
  if (Je.is.ios === !0 && window.visualViewport !== void 0) {
    const L = document.body.style, { offsetLeft: M, offsetTop: K } = window.visualViewport;
    M !== ji && (L.setProperty("--q-pe-left", M + "px"), ji = M), K !== Qi && (L.setProperty("--q-pe-top", K + "px"), Qi = K);
  }
  const { scrollLeft: b, scrollTop: m } = a, g = r === void 0 ? Qc(l, c === !0 ? [0, 0] : n) : Uc(l, r, n);
  Object.assign(a.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth: v,
    maxHeight: d,
    visibility: "visible"
  });
  const { offsetWidth: p, offsetHeight: k } = a, { elWidth: C, elHeight: y } = u === !0 || c === !0 ? {
    elWidth: Math.max(g.width, p),
    elHeight: c === !0 ? Math.max(g.height, k) : k
  } : {
    elWidth: p,
    elHeight: k
  };
  let h = {
    maxWidth: v,
    maxHeight: d
  };
  (u === !0 || c === !0) && (h.minWidth = g.width + "px", c === !0 && (h.minHeight = g.height + "px")), Object.assign(a.style, h);
  const w = Kc(C, y);
  let x = Ui(g, w, o, i);
  if (r === void 0 || n === void 0) lo(x, g, w, o, i);
  else {
    const { top: L, left: M } = x;
    lo(x, g, w, o, i);
    let K = !1;
    if (x.top !== L) {
      K = !0;
      const X = 2 * n[1];
      g.center = g.top -= X, g.bottom -= X + 2;
    }
    if (x.left !== M) {
      K = !0;
      const X = 2 * n[0];
      g.middle = g.left -= X, g.right -= X + 2;
    }
    K === !0 && (x = Ui(g, w, o, i), lo(x, g, w, o, i));
  }
  h = {
    top: x.top + "px",
    left: x.left + "px"
  }, x.maxHeight !== void 0 && (h.maxHeight = x.maxHeight + "px", g.height > x.maxHeight && (h.minHeight = h.maxHeight)), x.maxWidth !== void 0 && (h.maxWidth = x.maxWidth + "px", g.width > x.maxWidth && (h.minWidth = h.maxWidth)), Object.assign(a.style, h), a.scrollTop !== m && (a.scrollTop = m), a.scrollLeft !== b && (a.scrollLeft = b);
}
function lo(e, t, a, n, l) {
  const o = a.bottom, i = a.right, r = hl(), u = window.innerHeight - r, c = document.body.clientWidth;
  if (e.top < 0 || e.top + o > u) if (l.vertical === "center")
    e.top = t[n.vertical] > u / 2 ? Math.max(0, u - o) : 0, e.maxHeight = Math.min(o, u);
  else if (t[n.vertical] > u / 2) {
    const d = Math.min(u, n.vertical === "center" ? t.center : n.vertical === l.vertical ? t.bottom : t.top);
    e.maxHeight = Math.min(o, d), e.top = Math.max(0, d - o);
  } else
    e.top = Math.max(0, n.vertical === "center" ? t.center : n.vertical === l.vertical ? t.top : t.bottom), e.maxHeight = Math.min(o, u - e.top);
  if (e.left < 0 || e.left + i > c)
    if (e.maxWidth = Math.min(i, c), l.horizontal === "middle") e.left = t[n.horizontal] > c / 2 ? Math.max(0, c - i) : 0;
    else if (t[n.horizontal] > c / 2) {
      const d = Math.min(c, n.horizontal === "middle" ? t.middle : n.horizontal === l.horizontal ? t.right : t.left);
      e.maxWidth = Math.min(i, d), e.left = Math.max(0, d - e.maxWidth);
    } else
      e.left = Math.max(0, n.horizontal === "middle" ? t.middle : n.horizontal === l.horizontal ? t.left : t.right), e.maxWidth = Math.min(i, c - e.left);
}
var Ol = re({
  name: "QMenu",
  inheritAttrs: !1,
  props: {
    ...$s,
    ...qn,
    ...it,
    ...Ka,
    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,
    noEscDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    fit: Boolean,
    cover: Boolean,
    square: Boolean,
    anchor: {
      type: String,
      validator: ql
    },
    self: {
      type: String,
      validator: ql
    },
    offset: {
      type: Array,
      validator: Fs
    },
    scrollTarget: nn,
    touchPosition: Boolean,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },
  emits: [
    ...Bn,
    "click",
    "escapeKey"
  ],
  setup(e, { slots: t, emit: a, attrs: n }) {
    let l = null, o, i, r;
    const u = ye(), { proxy: c } = u, { $q: d } = c, v = z(null), b = z(!1), m = s(() => e.persistent !== !0 && e.noRouteDismiss !== !0), g = rt(e, d), { registerTick: p, removeTick: k } = kn(), { registerTimeout: C } = Sa(), { transitionProps: y, transitionStyle: h } = El(e), { localScrollTarget: w, changeScrollEvent: x, unconfigureScrollTarget: L } = qs(e, G), { anchorEl: M, canShow: K } = li({ showing: b }), { hide: X } = Tn({
      showing: b,
      canShow: K,
      handleShow: N,
      handleHide: Z,
      hideOnRouteChange: m,
      processOnMount: !0
    }), { showPortal: A, hidePortal: $, renderPortal: D } = ii(u, v, de, "menu"), _ = {
      anchorEl: M,
      innerRef: v,
      onClickOutside(Y) {
        if (e.persistent !== !0 && b.value === !0)
          return X(Y), (Y.type === "touchstart" || Y.target.classList.contains("q-dialog__backdrop")) && Ye(Y), !0;
      }
    }, S = s(() => Bl(e.anchor || (e.cover === !0 ? "center middle" : "bottom start"), d.lang.rtl)), T = s(() => e.cover === !0 ? S.value : Bl(e.self || "top start", d.lang.rtl)), H = s(() => (e.square === !0 ? " q-menu--square" : "") + (g.value === !0 ? " q-menu--dark q-dark" : "")), E = s(() => e.autoClose === !0 ? { onClick: V } : {}), Q = s(() => b.value === !0 && e.persistent !== !0);
    se(Q, (Y) => {
      Y === !0 ? (zs(P), Rs(_)) : (wl(P), $l(_));
    });
    function j() {
      Mn(() => {
        let Y = v.value;
        Y && Y.contains(document.activeElement) !== !0 && (Y = Y.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || Y.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || Y.querySelector("[autofocus], [data-autofocus]") || Y, Y.focus({ preventScroll: !0 }));
      });
    }
    function N(Y) {
      if (l = e.noRefocus === !1 ? document.activeElement : null, Ps(oe), A(), G(), o = void 0, Y !== void 0 && (e.touchPosition || e.contextMenu)) {
        const fe = Wt(Y);
        if (fe.left !== void 0) {
          const { top: W, left: be } = M.value.getBoundingClientRect();
          o = {
            left: fe.left - be,
            top: fe.top - W
          };
        }
      }
      i === void 0 && (i = se(() => d.screen.width + "|" + d.screen.height + "|" + e.self + "|" + e.anchor + "|" + d.lang.rtl, I)), e.noFocus !== !0 && document.activeElement.blur(), p(() => {
        I(), e.noFocus !== !0 && j();
      }), C(() => {
        d.platform.is.ios === !0 && (r = e.autoClose, v.value.click()), I(), A(!0), a("show", Y);
      }, e.transitionDuration);
    }
    function Z(Y) {
      k(), $(), B(!0), l !== null && (Y === void 0 || Y.qClickOutside !== !0) && ((((Y == null ? void 0 : Y.type.indexOf("key")) === 0 ? l.closest('[tabindex]:not([tabindex^="-"])') : void 0) || l).focus(), l = null), C(() => {
        $(!0), a("hide", Y);
      }, e.transitionDuration);
    }
    function B(Y) {
      o = void 0, i !== void 0 && (i(), i = void 0), (Y === !0 || b.value === !0) && (Ro(oe), L(), $l(_), wl(P)), Y !== !0 && (l = null);
    }
    function G() {
      (M.value !== null || e.scrollTarget !== void 0) && (w.value = ma(M.value, e.scrollTarget), x(w.value, I));
    }
    function V(Y) {
      r !== !0 ? (Ms(c, Y), a("click", Y)) : r = !1;
    }
    function oe(Y) {
      Q.value === !0 && e.noFocus !== !0 && ks(v.value, Y.target) !== !0 && j();
    }
    function P(Y) {
      e.noEscDismiss !== !0 && (a("escapeKey"), X(Y));
    }
    function I() {
      ri({
        targetEl: v.value,
        offset: e.offset,
        anchorEl: M.value,
        anchorOrigin: S.value,
        selfOrigin: T.value,
        absoluteOffset: o,
        fit: e.fit,
        cover: e.cover,
        maxHeight: e.maxHeight,
        maxWidth: e.maxWidth
      });
    }
    function de() {
      return f(Pt, y.value, () => b.value === !0 ? f("div", {
        role: "menu",
        ...n,
        ref: v,
        tabindex: -1,
        class: ["q-menu q-position-engine scroll" + H.value, n.class],
        style: [n.style, h.value],
        ...E.value
      }, De(t.default)) : null);
    }
    return tt(B), Object.assign(c, {
      focus: j,
      updatePosition: I
    }), D;
  }
});
let oo, al = 0;
const Ht = new Array(256);
for (let e = 0; e < 256; e++) Ht[e] = (e + 256).toString(16).substring(1);
const Wc = (() => {
  const e = typeof crypto < "u" ? crypto : typeof window < "u" ? window.crypto || window.msCrypto : void 0;
  if (e !== void 0) {
    if (e.randomBytes !== void 0) return e.randomBytes;
    if (e.getRandomValues !== void 0) return (t) => {
      const a = new Uint8Array(t);
      return e.getRandomValues(a), a;
    };
  }
  return (t) => {
    const a = [];
    for (let n = t; n > 0; n--) a.push(Math.floor(Math.random() * 256));
    return a;
  };
})(), Ki = 4096;
function Un() {
  (oo === void 0 || al + 16 > Ki) && (al = 0, oo = Wc(Ki));
  const e = Array.prototype.slice.call(oo, al, al += 16);
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, Ht[e[0]] + Ht[e[1]] + Ht[e[2]] + Ht[e[3]] + "-" + Ht[e[4]] + Ht[e[5]] + "-" + Ht[e[6]] + Ht[e[7]] + "-" + Ht[e[8]] + Ht[e[9]] + "-" + Ht[e[10]] + Ht[e[11]] + Ht[e[12]] + Ht[e[13]] + Ht[e[14]] + Ht[e[15]];
}
function Yc(e) {
  return e ?? null;
}
function Wi(e, t) {
  return e ?? (t === !0 ? `f_${Un()}` : null);
}
function Hl({ getValue: e, required: t = !0 } = {}) {
  if (na.value === !0) {
    const a = e !== void 0 ? z(Yc(e())) : z(null);
    return t === !0 && a.value === null && bt(() => {
      a.value = `f_${Un()}`;
    }), e !== void 0 && se(e, (n) => {
      a.value = Wi(n, t);
    }), a;
  }
  return e !== void 0 ? s(() => Wi(e(), t)) : z(`f_${Un()}`);
}
const Xc = Object.keys(ni);
function Gc(e) {
  return Xc.reduce((t, a) => {
    const n = e[a];
    return n !== void 0 && (t[a] = n), t;
  }, {});
}
var Zc = re({
  name: "QBtnDropdown",
  props: {
    ...ni,
    ...Ka,
    modelValue: Boolean,
    split: Boolean,
    dropdownIcon: String,
    contentClass: [
      Array,
      String,
      Object
    ],
    contentStyle: [
      Array,
      String,
      Object
    ],
    cover: Boolean,
    persistent: Boolean,
    noEscDismiss: Boolean,
    noRouteDismiss: Boolean,
    autoClose: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    menuAnchor: {
      type: String,
      default: "bottom end"
    },
    menuSelf: {
      type: String,
      default: "top end"
    },
    menuOffset: Array,
    disableMainBtn: Boolean,
    disableDropdown: Boolean,
    noIconAnimation: Boolean,
    toggleAriaLabel: String
  },
  emits: [
    "update:modelValue",
    "click",
    "beforeShow",
    "show",
    "beforeHide",
    "hide"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), l = z(e.modelValue), o = z(null), i = Hl(), r = s(() => {
      const w = {
        "aria-expanded": l.value === !0 ? "true" : "false",
        "aria-haspopup": "true",
        "aria-controls": i.value,
        "aria-label": e.toggleAriaLabel || n.$q.lang.label[l.value === !0 ? "collapse" : "expand"](e.label)
      };
      return (e.disable === !0 || e.split === !1 && e.disableMainBtn === !0 || e.disableDropdown === !0) && (w["aria-disabled"] = "true"), w;
    }), u = s(() => "q-btn-dropdown__arrow" + (l.value === !0 && e.noIconAnimation === !1 ? " rotate-180" : "") + (e.split === !1 ? " q-btn-dropdown__arrow-container" : "")), c = s(() => ws(e)), d = s(() => Gc(e));
    se(() => e.modelValue, (w) => {
      var x;
      (x = o.value) == null || x[w ? "show" : "hide"]();
    }), se(() => e.split, h);
    function v(w) {
      l.value = !0, a("beforeShow", w);
    }
    function b(w) {
      a("show", w), a("update:modelValue", !0);
    }
    function m(w) {
      l.value = !1, a("beforeHide", w);
    }
    function g(w) {
      a("hide", w), a("update:modelValue", !1);
    }
    function p(w) {
      a("click", w);
    }
    function k(w) {
      wt(w), h(), a("click", w);
    }
    function C(w) {
      var x;
      (x = o.value) == null || x.toggle(w);
    }
    function y(w) {
      var x;
      (x = o.value) == null || x.show(w);
    }
    function h(w) {
      var x;
      (x = o.value) == null || x.hide(w);
    }
    return Object.assign(n, {
      show: y,
      hide: h,
      toggle: C
    }), bt(() => {
      e.modelValue === !0 && y();
    }), () => {
      const w = [f(st, {
        class: u.value,
        name: e.dropdownIcon || n.$q.iconSet.arrow.dropdown
      })];
      return e.disableDropdown !== !0 && w.push(f(Ol, {
        ref: o,
        id: i.value,
        class: e.contentClass,
        style: e.contentStyle,
        cover: e.cover,
        fit: !0,
        persistent: e.persistent,
        noEscDismiss: e.noEscDismiss,
        noRouteDismiss: e.noRouteDismiss,
        autoClose: e.autoClose,
        noFocus: e.noFocus,
        noRefocus: e.noRefocus,
        anchor: e.menuAnchor,
        self: e.menuSelf,
        offset: e.menuOffset,
        separateClosePopup: !0,
        transitionShow: e.transitionShow,
        transitionHide: e.transitionHide,
        transitionDuration: e.transitionDuration,
        onBeforeShow: v,
        onShow: b,
        onBeforeHide: m,
        onHide: g
      }, t.default)), e.split === !1 ? f(ft, {
        class: "q-btn-dropdown q-btn-dropdown--simple",
        ...d.value,
        ...r.value,
        disable: e.disable === !0 || e.disableMainBtn === !0,
        noWrap: !0,
        round: !1,
        onClick: p
      }, {
        default: () => De(t.label, []).concat(w),
        loading: t.loading
      }) : f(xs, {
        class: "q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",
        rounded: e.rounded,
        square: e.square,
        ...c.value,
        glossy: e.glossy,
        stretch: e.stretch
      }, () => [f(ft, {
        class: "q-btn-dropdown--current",
        ...d.value,
        disable: e.disable === !0 || e.disableMainBtn === !0,
        noWrap: !0,
        round: !1,
        onClick: k
      }, {
        default: t.label,
        loading: t.loading
      }), f(ft, {
        class: "q-btn-dropdown__arrow-container q-anchor--skip",
        ...r.value,
        ...c.value,
        disable: e.disable === !0 || e.disableDropdown === !0,
        rounded: e.rounded,
        color: e.color,
        textColor: e.textColor,
        dense: e.dense,
        size: e.size,
        padding: e.padding,
        ripple: e.ripple
      }, () => w)]);
    };
  }
});
const ra = { name: String };
function Zn(e) {
  return s(() => ({
    type: "hidden",
    name: e.name,
    value: e.modelValue
  }));
}
function Ra(e = {}) {
  return (t, a, n) => {
    t[a](f("input", {
      class: "hidden" + (n || ""),
      ...e.value
    }));
  };
}
function si(e) {
  return s(() => e.name || e.for);
}
re({
  name: "QBtnToggle",
  props: {
    ...ra,
    modelValue: { required: !0 },
    options: {
      type: Array,
      required: !0,
      validator: (e) => e.every((t) => ("label" in t || "icon" in t || "slot" in t) && "value" in t)
    },
    color: String,
    textColor: String,
    toggleColor: {
      type: String,
      default: "primary"
    },
    toggleTextColor: String,
    outline: Boolean,
    flat: Boolean,
    unelevated: Boolean,
    rounded: Boolean,
    push: Boolean,
    glossy: Boolean,
    size: String,
    padding: String,
    noCaps: Boolean,
    noWrap: Boolean,
    dense: Boolean,
    readonly: Boolean,
    disable: Boolean,
    stack: Boolean,
    stretch: Boolean,
    spread: Boolean,
    clearable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: !0
    }
  },
  emits: [
    "update:modelValue",
    "clear",
    "click"
  ],
  setup(e, { slots: t, emit: a }) {
    const n = s(() => e.options.find((v) => v.value === e.modelValue) !== void 0), l = Ra(s(() => ({
      type: "hidden",
      name: e.name,
      value: e.modelValue
    }))), o = s(() => ws(e)), i = s(() => ({
      rounded: e.rounded,
      dense: e.dense,
      ...o.value
    })), r = s(() => e.options.map((v, b) => {
      const { attrs: m, value: g, slot: p, ...k } = v;
      return {
        slot: p,
        props: {
          key: b,
          "aria-pressed": g === e.modelValue ? "true" : "false",
          ...m,
          ...k,
          ...i.value,
          disable: e.disable === !0 || k.disable === !0,
          color: g === e.modelValue ? c(k, "toggleColor") : c(k, "color"),
          textColor: g === e.modelValue ? c(k, "toggleTextColor") : c(k, "textColor"),
          noCaps: c(k, "noCaps") === !0,
          noWrap: c(k, "noWrap") === !0,
          size: c(k, "size"),
          padding: c(k, "padding"),
          ripple: c(k, "ripple"),
          stack: c(k, "stack") === !0,
          stretch: c(k, "stretch") === !0,
          onClick(C) {
            u(g, v, C);
          }
        }
      };
    }));
    function u(v, b, m) {
      e.readonly !== !0 && (e.modelValue === v ? e.clearable === !0 && (a("update:modelValue", null, null), a("clear")) : a("update:modelValue", v, b), a("click", m));
    }
    function c(v, b) {
      return v[b] === void 0 ? e[b] : v[b];
    }
    function d() {
      const v = r.value.map((b) => f(ft, b.props, b.slot !== void 0 ? t[b.slot] : void 0));
      return e.name !== void 0 && e.disable !== !0 && n.value === !0 && l(v, "push"), $t(t.default, v);
    }
    return () => f(xs, {
      class: "q-btn-toggle",
      ...o.value,
      rounded: e.rounded,
      stretch: e.stretch,
      glossy: e.glossy,
      spread: e.spread
    }, d);
  }
});
var Es = re({
  name: "QCard",
  props: {
    ...it,
    tag: {
      type: String,
      default: "div"
    },
    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },
  setup(e, { slots: t }) {
    const { proxy: { $q: a } } = ye(), n = rt(e, a), l = s(() => "q-card" + (n.value === !0 ? " q-card--dark q-dark" : "") + (e.bordered === !0 ? " q-card--bordered" : "") + (e.square === !0 ? " q-card--square no-border-radius" : "") + (e.flat === !0 ? " q-card--flat no-shadow" : ""));
    return () => f(e.tag, { class: l.value }, De(t.default));
  }
}), Na = re({
  name: "QCardSection",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    horizontal: Boolean
  },
  setup(e, { slots: t }) {
    const a = s(() => `q-card__section q-card__section--${e.horizontal === !0 ? "horiz row no-wrap" : "vert"}`);
    return () => f(e.tag, { class: a.value }, De(t.default));
  }
}), Jc = re({
  name: "QCardActions",
  props: {
    ...Zo,
    vertical: Boolean
  },
  setup(e, { slots: t }) {
    const a = Jo(e), n = s(() => `q-card__actions ${a.value} q-card__actions--${e.vertical === !0 ? "vert column" : "horiz row"}`);
    return () => f("div", { class: n.value }, De(t.default));
  }
});
const ui = {
  left: !0,
  right: !0,
  up: !0,
  down: !0,
  horizontal: !0,
  vertical: !0
}, ef = Object.keys(ui);
ui.all = !0;
function Tl(e) {
  const t = {};
  for (const a of ef) e[a] === !0 && (t[a] = !0);
  return Object.keys(t).length === 0 ? ui : (t.horizontal === !0 ? t.left = t.right = !0 : t.left === !0 && t.right === !0 && (t.horizontal = !0), t.vertical === !0 ? t.up = t.down = !0 : t.up === !0 && t.down === !0 && (t.vertical = !0), t.horizontal === !0 && t.vertical === !0 && (t.all = !0), t);
}
const tf = ["INPUT", "TEXTAREA"];
function Ml(e, t) {
  return t.event === void 0 && e.target !== void 0 && e.target.draggable !== !0 && typeof t.handler == "function" && tf.includes(e.target.nodeName.toUpperCase()) === !1 && (e.qClonedBy === void 0 || e.qClonedBy.indexOf(t.uid) === -1);
}
function af(e) {
  const t = [
    0.06,
    6,
    50
  ];
  return typeof e == "string" && e.length && e.split(":").forEach((a, n) => {
    const l = parseFloat(a);
    l && (t[n] = l);
  }), t;
}
var nf = ca({
  name: "touch-swipe",
  beforeMount(e, { value: t, arg: a, modifiers: n }) {
    if (n.mouse !== !0 && Je.has.touch !== !0) return;
    const l = n.mouseCapture === !0 ? "Capture" : "", o = {
      handler: t,
      sensitivity: af(a),
      direction: Tl(n),
      noop: At,
      mouseStart(i) {
        Ml(i, o) && Pl(i) && (_t(o, "temp", [[
          document,
          "mousemove",
          "move",
          `notPassive${l}`
        ], [
          document,
          "mouseup",
          "end",
          "notPassiveCapture"
        ]]), o.start(i, !0));
      },
      touchStart(i) {
        if (Ml(i, o)) {
          const r = i.target;
          _t(o, "temp", [
            [
              r,
              "touchmove",
              "move",
              "notPassiveCapture"
            ],
            [
              r,
              "touchcancel",
              "end",
              "notPassiveCapture"
            ],
            [
              r,
              "touchend",
              "end",
              "notPassiveCapture"
            ]
          ]), o.start(i);
        }
      },
      start(i, r) {
        Je.is.firefox === !0 && bn(e, !0);
        const u = Wt(i);
        o.event = {
          x: u.left,
          y: u.top,
          time: Date.now(),
          mouse: r === !0,
          dir: !1
        };
      },
      move(i) {
        if (o.event === void 0) return;
        if (o.event.dir !== !1) {
          Ye(i);
          return;
        }
        const r = Date.now() - o.event.time;
        if (r === 0) return;
        const u = Wt(i), c = u.left - o.event.x, d = Math.abs(c), v = u.top - o.event.y, b = Math.abs(v);
        if (o.event.mouse !== !0) {
          if (d < o.sensitivity[1] && b < o.sensitivity[1]) {
            o.end(i);
            return;
          }
        } else if (window.getSelection().toString() !== "") {
          o.end(i);
          return;
        } else if (d < o.sensitivity[2] && b < o.sensitivity[2]) return;
        const m = d / r, g = b / r;
        o.direction.vertical === !0 && d < b && d < 100 && g > o.sensitivity[0] && (o.event.dir = v < 0 ? "up" : "down"), o.direction.horizontal === !0 && d > b && b < 100 && m > o.sensitivity[0] && (o.event.dir = c < 0 ? "left" : "right"), o.direction.up === !0 && d < b && v < 0 && d < 100 && g > o.sensitivity[0] && (o.event.dir = "up"), o.direction.down === !0 && d < b && v > 0 && d < 100 && g > o.sensitivity[0] && (o.event.dir = "down"), o.direction.left === !0 && d > b && c < 0 && b < 100 && m > o.sensitivity[0] && (o.event.dir = "left"), o.direction.right === !0 && d > b && c > 0 && b < 100 && m > o.sensitivity[0] && (o.event.dir = "right"), o.event.dir !== !1 ? (Ye(i), o.event.mouse === !0 && (document.body.classList.add("no-pointer-events--children"), document.body.classList.add("non-selectable"), da(), o.styleCleanup = (p) => {
          o.styleCleanup = void 0, document.body.classList.remove("non-selectable");
          const k = () => {
            document.body.classList.remove("no-pointer-events--children");
          };
          p === !0 ? setTimeout(k, 50) : k();
        }), o.handler({
          evt: i,
          touch: o.event.mouse !== !0,
          mouse: o.event.mouse,
          direction: o.event.dir,
          duration: r,
          distance: {
            x: d,
            y: b
          }
        })) : o.end(i);
      },
      end(i) {
        var r;
        o.event !== void 0 && (Ut(o, "temp"), Je.is.firefox === !0 && bn(e, !1), (r = o.styleCleanup) == null || r.call(o, !0), i !== void 0 && o.event.dir !== !1 && Ye(i), o.event = void 0);
      }
    };
    e.__qtouchswipe = o, n.mouse === !0 && _t(o, "main", [[
      e,
      "mousedown",
      "mouseStart",
      `passive${n.mouseCapture === !0 || n.mousecapture === !0 ? "Capture" : ""}`
    ]]), Je.has.touch === !0 && _t(o, "main", [[
      e,
      "touchstart",
      "touchStart",
      `passive${n.capture === !0 ? "Capture" : ""}`
    ], [
      e,
      "touchmove",
      "noop",
      "notPassiveCapture"
    ]]);
  },
  updated(e, t) {
    const a = e.__qtouchswipe;
    a !== void 0 && (t.oldValue !== t.value && (typeof t.value != "function" && a.end(), a.handler = t.value), a.direction = Tl(t.modifiers));
  },
  beforeUnmount(e) {
    var a;
    const t = e.__qtouchswipe;
    t !== void 0 && (Ut(t, "main"), Ut(t, "temp"), Je.is.firefox === !0 && bn(e, !1), (a = t.styleCleanup) == null || a.call(t), delete e.__qtouchswipe);
  }
});
function Jn() {
  let e = /* @__PURE__ */ Object.create(null);
  return {
    getCache: (t, a) => e[t] === void 0 ? e[t] = typeof a == "function" ? a() : a : e[t],
    setCache(t, a) {
      e[t] = a;
    },
    hasCache(t) {
      return Object.hasOwnProperty.call(e, t);
    },
    clearCache(t) {
      t !== void 0 ? delete e[t] : e = /* @__PURE__ */ Object.create(null);
    }
  };
}
const di = {
  name: { required: !0 },
  disable: Boolean
}, Yi = { setup(e, { slots: t }) {
  return () => f("div", {
    class: "q-panel scroll",
    role: "tabpanel"
  }, De(t.default));
} }, ci = {
  modelValue: { required: !0 },
  animated: Boolean,
  infinite: Boolean,
  swipeable: Boolean,
  vertical: Boolean,
  transitionPrev: String,
  transitionNext: String,
  transitionDuration: {
    type: [String, Number],
    default: 300
  },
  keepAlive: Boolean,
  keepAliveInclude: [
    String,
    Array,
    RegExp
  ],
  keepAliveExclude: [
    String,
    Array,
    RegExp
  ],
  keepAliveMax: Number
}, fi = [
  "update:modelValue",
  "beforeTransition",
  "transition"
];
function vi() {
  const { props: e, emit: t, proxy: a } = ye(), { getCache: n } = Jn(), { registerTimeout: l } = Sa();
  let o, i;
  const r = z(null), u = { value: null };
  function c(S) {
    const T = e.vertical === !0 ? "up" : "left";
    K((a.$q.lang.rtl === !0 ? -1 : 1) * (S.direction === T ? 1 : -1));
  }
  const d = s(() => [[
    nf,
    c,
    void 0,
    {
      horizontal: e.vertical !== !0,
      vertical: e.vertical,
      mouse: !0
    }
  ]]), v = s(() => e.transitionPrev || `slide-${e.vertical === !0 ? "down" : "right"}`), b = s(() => e.transitionNext || `slide-${e.vertical === !0 ? "up" : "left"}`), m = s(() => `--q-transition-duration: ${e.transitionDuration}ms`), g = s(() => typeof e.modelValue == "string" || typeof e.modelValue == "number" ? e.modelValue : String(e.modelValue)), p = s(() => ({
    include: e.keepAliveInclude,
    exclude: e.keepAliveExclude,
    max: e.keepAliveMax
  })), k = s(() => e.keepAliveInclude !== void 0 || e.keepAliveExclude !== void 0);
  se(() => e.modelValue, (S, T) => {
    const H = w(S) === !0 ? x(S) : -1;
    i !== !0 && M(H === -1 ? 0 : H < x(T) ? -1 : 1), u.value !== H && (u.value = H, t("beforeTransition", S, T), l(() => {
      t("transition", S, T);
    }, e.transitionDuration));
  });
  function C() {
    K(1);
  }
  function y() {
    K(-1);
  }
  function h(S) {
    t("update:modelValue", S);
  }
  function w(S) {
    return S != null && S !== "";
  }
  function x(S) {
    return o.findIndex((T) => T.props.name === S && T.props.disable !== "" && T.props.disable !== !0);
  }
  function L() {
    return o.filter((S) => S.props.disable !== "" && S.props.disable !== !0);
  }
  function M(S) {
    const T = S !== 0 && e.animated === !0 && u.value !== -1 ? "q-transition--" + (S === -1 ? v.value : b.value) : null;
    r.value !== T && (r.value = T);
  }
  function K(S, T = u.value) {
    let H = T + S;
    for (; H !== -1 && H < o.length; ) {
      const E = o[H];
      if (E !== void 0 && E.props.disable !== "" && E.props.disable !== !0) {
        M(S), i = !0, t("update:modelValue", E.props.name), setTimeout(() => {
          i = !1;
        });
        return;
      }
      H += S;
    }
    e.infinite === !0 && o.length !== 0 && T !== -1 && T !== o.length && K(S, S === -1 ? o.length : -1);
  }
  function X() {
    const S = x(e.modelValue);
    return u.value !== S && (u.value = S), !0;
  }
  function A() {
    const S = w(e.modelValue) === !0 && X() && o[u.value];
    return e.keepAlive === !0 ? [f(es, p.value, [f(k.value === !0 ? n(g.value, () => ({
      ...Yi,
      name: g.value
    })) : Yi, {
      key: g.value,
      style: m.value
    }, () => S)])] : [f("div", {
      class: "q-panel scroll",
      style: m.value,
      key: g.value,
      role: "tabpanel"
    }, [S])];
  }
  function $() {
    if (o.length !== 0)
      return e.animated === !0 ? [f(Pt, { name: r.value }, A)] : A();
  }
  function D(S) {
    return o = ei(De(S.default, [])).filter((T) => T.props !== null && T.props.slot === void 0 && w(T.props.name) === !0), o.length;
  }
  function _() {
    return o;
  }
  return Object.assign(a, {
    next: C,
    previous: y,
    goTo: h
  }), {
    panelIndex: u,
    panelDirectives: d,
    updatePanelsList: D,
    updatePanelIndex: X,
    getPanelContent: $,
    getEnabledPanels: L,
    getPanels: _,
    isValidPanelName: w,
    keepAliveProps: p,
    needsUniqueKeepAliveWrapper: k,
    goToPanelByOffset: K,
    goToPanel: h,
    nextPanel: C,
    previousPanel: y
  };
}
let An = 0;
const mi = {
  fullscreen: Boolean,
  noRouteFullscreenExit: Boolean
}, gi = ["update:fullscreen", "fullscreen"];
function hi() {
  const e = ye(), { props: t, emit: a, proxy: n } = e;
  let l, o;
  const i = z(!1);
  ti(e) === !0 && se(() => n.$route.fullPath, () => {
    t.noRouteFullscreenExit !== !0 && c();
  }), se(() => t.fullscreen, (d) => {
    i.value !== d && r();
  }), se(i, (d) => {
    a("update:fullscreen", d), a("fullscreen", d);
  });
  function r() {
    i.value === !0 ? c() : u();
  }
  function u() {
    i.value !== !0 && (i.value = !0, o = n.$el.parentNode, o.replaceChild(l, n.$el), document.body.appendChild(n.$el), An++, An === 1 && document.body.classList.add("q-body--fullscreen-mixin"));
  }
  function c() {
    i.value === !0 && (o.replaceChild(n.$el, l), i.value = !1, An = Math.max(0, An - 1), An === 0 && (document.body.classList.remove("q-body--fullscreen-mixin"), n.$el.scrollIntoView !== void 0 && setTimeout(() => {
      n.$el.scrollIntoView();
    })));
  }
  return Ko(() => {
    l = document.createElement("span");
  }), bt(() => {
    t.fullscreen === !0 && u();
  }), tt(c), Object.assign(n, {
    toggleFullscreen: r,
    setFullscreen: u,
    exitFullscreen: c
  }), {
    inFullscreen: i,
    toggleFullscreen: r
  };
}
const lf = [
  "top",
  "right",
  "bottom",
  "left"
], of = [
  "regular",
  "flat",
  "outline",
  "push",
  "unelevated"
];
var rf = re({
  name: "QCarousel",
  props: {
    ...it,
    ...ci,
    ...mi,
    transitionPrev: {
      type: String,
      default: "fade"
    },
    transitionNext: {
      type: String,
      default: "fade"
    },
    height: String,
    padding: Boolean,
    controlColor: String,
    controlTextColor: String,
    controlType: {
      type: String,
      validator: (e) => of.includes(e),
      default: "flat"
    },
    autoplay: [Number, Boolean],
    arrows: Boolean,
    prevIcon: String,
    nextIcon: String,
    navigation: Boolean,
    navigationPosition: {
      type: String,
      validator: (e) => lf.includes(e)
    },
    navigationIcon: String,
    navigationActiveIcon: String,
    thumbnails: Boolean
  },
  emits: [...gi, ...fi],
  setup(e, { slots: t }) {
    const { proxy: { $q: a } } = ye(), n = rt(e, a);
    let l = null, o;
    const { updatePanelsList: i, getPanelContent: r, panelDirectives: u, goToPanel: c, previousPanel: d, nextPanel: v, getEnabledPanels: b, panelIndex: m } = vi(), { inFullscreen: g } = hi(), p = s(() => g.value !== !0 && e.height !== void 0 ? { height: e.height } : {}), k = s(() => e.vertical === !0 ? "vertical" : "horizontal"), C = s(() => e.navigationPosition || (e.vertical === !0 ? "right" : "bottom")), y = s(() => `q-carousel q-panel-parent q-carousel--with${e.padding === !0 ? "" : "out"}-padding` + (g.value === !0 ? " fullscreen" : "") + (n.value === !0 ? " q-carousel--dark q-dark" : "") + (e.arrows === !0 ? ` q-carousel--arrows-${k.value}` : "") + (e.navigation === !0 ? ` q-carousel--navigation-${C.value}` : "")), h = s(() => {
      const A = [e.prevIcon || a.iconSet.carousel[e.vertical === !0 ? "up" : "left"], e.nextIcon || a.iconSet.carousel[e.vertical === !0 ? "down" : "right"]];
      return e.vertical === !1 && a.lang.rtl === !0 ? A.reverse() : A;
    }), w = s(() => e.navigationIcon || a.iconSet.carousel.navigationIcon), x = s(() => e.navigationActiveIcon || w.value), L = s(() => ({
      color: e.controlColor,
      textColor: e.controlTextColor,
      round: !0,
      [e.controlType]: !0,
      dense: !0
    }));
    se(() => e.modelValue, () => {
      e.autoplay && M();
    }), se(() => e.autoplay, (A) => {
      A ? M() : l !== null && (clearTimeout(l), l = null);
    });
    function M() {
      const A = jn(e.autoplay) === !0 ? Math.abs(e.autoplay) : 5e3;
      l !== null && clearTimeout(l), l = setTimeout(() => {
        l = null, A >= 0 ? v() : d();
      }, A);
    }
    bt(() => {
      e.autoplay && M();
    }), tt(() => {
      l !== null && clearTimeout(l);
    });
    function K(A, $) {
      return f("div", { class: `q-carousel__control q-carousel__navigation no-wrap absolute flex q-carousel__navigation--${A} q-carousel__navigation--${C.value}` + (e.controlColor !== void 0 ? ` text-${e.controlColor}` : "") }, [f("div", { class: "q-carousel__navigation-inner flex flex-center no-wrap" }, b().map($))]);
    }
    function X() {
      const A = [];
      if (e.navigation === !0) {
        const $ = t["navigation-icon"] !== void 0 ? t["navigation-icon"] : (_) => f(ft, {
          key: "nav" + _.name,
          class: `q-carousel__navigation-icon q-carousel__navigation-icon--${_.active === !0 ? "" : "in"}active`,
          ..._.btnProps,
          onClick: _.onClick
        }), D = o - 1;
        A.push(K("buttons", (_, S) => {
          const T = _.props.name, H = m.value === S;
          return $({
            index: S,
            maxIndex: D,
            name: T,
            active: H,
            btnProps: {
              icon: H === !0 ? x.value : w.value,
              size: "sm",
              ...L.value
            },
            onClick: () => {
              c(T);
            }
          });
        }));
      } else if (e.thumbnails === !0) {
        const $ = e.controlColor !== void 0 ? ` text-${e.controlColor}` : "";
        A.push(K("thumbnails", (D) => {
          const _ = D.props;
          return f("img", {
            key: "tmb#" + _.name,
            class: `q-carousel__thumbnail q-carousel__thumbnail--${_.name === e.modelValue ? "" : "in"}active` + $,
            src: _.imgSrc || _["img-src"],
            onClick: () => {
              c(_.name);
            }
          });
        }));
      }
      return e.arrows === !0 && m.value >= 0 && ((e.infinite === !0 || m.value > 0) && A.push(f("div", {
        key: "prev",
        class: `q-carousel__control q-carousel__arrow q-carousel__prev-arrow q-carousel__prev-arrow--${k.value} absolute flex flex-center`
      }, [f(ft, {
        icon: h.value[0],
        ...L.value,
        onClick: d
      })])), (e.infinite === !0 || m.value < o - 1) && A.push(f("div", {
        key: "next",
        class: `q-carousel__control q-carousel__arrow q-carousel__next-arrow q-carousel__next-arrow--${k.value} absolute flex flex-center`
      }, [f(ft, {
        icon: h.value[1],
        ...L.value,
        onClick: v
      })]))), $t(t.control, A);
    }
    return () => (o = i(t), f("div", {
      class: y.value,
      style: p.value
    }, [oa("div", { class: "q-carousel__slides-container" }, r(), "sl-cont", e.swipeable, () => u.value)].concat(X())));
  }
}), sf = re({
  name: "QCarouselSlide",
  props: {
    ...di,
    imgSrc: String
  },
  setup(e, { slots: t }) {
    const a = s(() => e.imgSrc ? { backgroundImage: `url("${e.imgSrc}")` } : {});
    return () => f("div", {
      class: "q-carousel__slide",
      style: a.value
    }, De(t.default));
  }
});
re({
  name: "QCarouselControl",
  props: {
    position: {
      type: String,
      default: "bottom-right",
      validator: (e) => [
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "top",
        "right",
        "bottom",
        "left"
      ].includes(e)
    },
    offset: {
      type: Array,
      default: () => [18, 18],
      validator: (e) => e.length === 2
    }
  },
  setup(e, { slots: t }) {
    const a = s(() => `q-carousel__control absolute absolute-${e.position}`), n = s(() => ({ margin: `${e.offset[1]}px ${e.offset[0]}px` }));
    return () => f("div", {
      class: a.value,
      style: n.value
    }, De(t.default));
  }
});
re({
  name: "QChatMessage",
  props: {
    sent: Boolean,
    label: String,
    bgColor: String,
    textColor: String,
    name: String,
    avatar: String,
    text: Array,
    stamp: String,
    size: String,
    labelHtml: Boolean,
    nameHtml: Boolean,
    textHtml: Boolean,
    stampHtml: Boolean
  },
  setup(e, { slots: t }) {
    const a = s(() => e.sent === !0 ? "sent" : "received"), n = s(() => `q-message-text-content q-message-text-content--${a.value}` + (e.textColor !== void 0 ? ` text-${e.textColor}` : "")), l = s(() => `q-message-text q-message-text--${a.value}` + (e.bgColor !== void 0 ? ` text-${e.bgColor}` : "")), o = s(() => "q-message-container row items-end no-wrap" + (e.sent === !0 ? " reverse" : "")), i = s(() => e.size !== void 0 ? `col-${e.size}` : ""), r = s(() => ({
      msg: e.textHtml === !0 ? "innerHTML" : "textContent",
      stamp: e.stampHtml === !0 ? "innerHTML" : "textContent",
      name: e.nameHtml === !0 ? "innerHTML" : "textContent",
      label: e.labelHtml === !0 ? "innerHTML" : "textContent"
    }));
    function u(d) {
      return t.stamp !== void 0 ? [d, f("div", { class: "q-message-stamp" }, t.stamp())] : e.stamp ? [d, f("div", {
        class: "q-message-stamp",
        [r.value.stamp]: e.stamp
      })] : [d];
    }
    function c(d, v) {
      const b = v === !0 ? d.length > 1 ? (m) => m : (m) => f("div", [m]) : (m) => f("div", { [r.value.msg]: m });
      return d.map((m, g) => f("div", {
        key: g,
        class: l.value
      }, [f("div", { class: n.value }, u(b(m)))]));
    }
    return () => {
      const d = [];
      t.avatar !== void 0 ? d.push(t.avatar()) : e.avatar !== void 0 && d.push(f("img", {
        class: `q-message-avatar q-message-avatar--${a.value}`,
        src: e.avatar,
        "aria-hidden": "true"
      }));
      const v = [];
      t.name !== void 0 ? v.push(f("div", { class: `q-message-name q-message-name--${a.value}` }, t.name())) : e.name !== void 0 && v.push(f("div", {
        class: `q-message-name q-message-name--${a.value}`,
        [r.value.name]: e.name
      })), t.default !== void 0 ? v.push(c(ei(t.default()), !0)) : e.text !== void 0 && v.push(c(e.text)), d.push(f("div", { class: i.value }, v));
      const b = [];
      return t.label !== void 0 ? b.push(f("div", { class: "q-message-label" }, t.label())) : e.label !== void 0 && b.push(f("div", {
        class: "q-message-label",
        [r.value.label]: e.label
      })), b.push(f("div", { class: o.value }, d)), f("div", { class: `q-message q-message-${a.value}` }, b);
    };
  }
});
function Is(e, t) {
  const a = z(null), n = s(() => e.disable === !0 ? null : f("span", {
    ref: a,
    class: "no-outline",
    tabindex: -1
  }));
  function l(o) {
    const i = t.value;
    (o == null ? void 0 : o.qAvoidFocus) !== !0 && ((o == null ? void 0 : o.type.indexOf("key")) === 0 ? document.activeElement !== i && (i == null ? void 0 : i.contains(document.activeElement)) === !0 && i.focus() : a.value !== null && (o === void 0 || (i == null ? void 0 : i.contains(o.target)) === !0) && a.value.focus());
  }
  return {
    refocusTargetEl: n,
    refocusTarget: l
  };
}
var Os = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const Hs = {
  ...it,
  ...xa,
  ...ra,
  modelValue: {
    required: !0,
    default: null
  },
  val: {},
  trueValue: { default: !0 },
  falseValue: { default: !1 },
  indeterminateValue: { default: null },
  checkedIcon: String,
  uncheckedIcon: String,
  indeterminateIcon: String,
  toggleOrder: {
    type: String,
    validator: (e) => e === "tf" || e === "ft"
  },
  toggleIndeterminate: Boolean,
  label: String,
  leftLabel: Boolean,
  color: String,
  keepColor: Boolean,
  dense: Boolean,
  disable: Boolean,
  tabindex: [String, Number]
}, Ns = ["update:modelValue"];
function js(e, t) {
  const { props: a, slots: n, emit: l, proxy: o } = ye(), { $q: i } = o, r = rt(a, i), u = z(null), { refocusTargetEl: c, refocusTarget: d } = Is(a, u), v = _a(a, Os), b = s(() => a.val !== void 0 && Array.isArray(a.modelValue)), m = s(() => {
    const $ = ka(a.val);
    return b.value === !0 ? a.modelValue.findIndex((D) => ka(D) === $) : -1;
  }), g = s(() => b.value === !0 ? m.value !== -1 : ka(a.modelValue) === ka(a.trueValue)), p = s(() => b.value === !0 ? m.value === -1 : ka(a.modelValue) === ka(a.falseValue)), k = s(() => g.value === !1 && p.value === !1), C = s(() => a.disable === !0 ? -1 : a.tabindex || 0), y = s(() => `q-${e} cursor-pointer no-outline row inline no-wrap items-center` + (a.disable === !0 ? " disabled" : "") + (r.value === !0 ? ` q-${e}--dark` : "") + (a.dense === !0 ? ` q-${e}--dense` : "") + (a.leftLabel === !0 ? " reverse" : "")), h = s(() => `q-${e}__inner relative-position non-selectable q-${e}__inner--${g.value === !0 ? "truthy" : p.value === !0 ? "falsy" : "indet"}${a.color !== void 0 && (a.keepColor === !0 || (e === "toggle" ? g.value === !0 : p.value !== !0)) ? ` text-${a.color}` : ""}`), w = Ra(s(() => {
    const $ = { type: "checkbox" };
    return a.name !== void 0 && Object.assign($, {
      ".checked": g.value,
      "^checked": g.value === !0 ? "checked" : void 0,
      name: a.name,
      value: b.value === !0 ? a.val : a.trueValue
    }), $;
  })), x = s(() => {
    const $ = {
      tabindex: C.value,
      role: e === "toggle" ? "switch" : "checkbox",
      "aria-label": a.label,
      "aria-checked": k.value === !0 ? "mixed" : g.value === !0 ? "true" : "false"
    };
    return a.disable === !0 && ($["aria-disabled"] = "true"), $;
  });
  function L($) {
    $ !== void 0 && (Ye($), d($)), a.disable !== !0 && l("update:modelValue", M(), $);
  }
  function M() {
    if (b.value === !0) {
      if (g.value === !0) {
        const $ = a.modelValue.slice();
        return $.splice(m.value, 1), $;
      }
      return a.modelValue.concat([a.val]);
    }
    if (g.value === !0) {
      if (a.toggleOrder !== "ft" || a.toggleIndeterminate === !1) return a.falseValue;
    } else if (p.value === !0) {
      if (a.toggleOrder === "ft" || a.toggleIndeterminate === !1) return a.trueValue;
    } else return a.toggleOrder !== "ft" ? a.trueValue : a.falseValue;
    return a.indeterminateValue;
  }
  function K($) {
    ($.keyCode === 13 || $.keyCode === 32) && Ye($);
  }
  function X($) {
    ($.keyCode === 13 || $.keyCode === 32) && L($);
  }
  const A = t(g, k);
  return Object.assign(o, { toggle: L }), () => {
    const $ = A();
    a.disable !== !0 && w($, "unshift", ` q-${e}__native absolute q-ma-none q-pa-none`);
    const D = [f("div", {
      class: h.value,
      style: v.value,
      "aria-hidden": "true"
    }, $)];
    c.value !== null && D.push(c.value);
    const _ = a.label !== void 0 ? $t(n.default, [a.label]) : De(n.default);
    return _ !== void 0 && D.push(f("div", { class: `q-${e}__label q-anchor--skip` }, _)), f("div", {
      ref: u,
      class: y.value,
      ...x.value,
      onClick: L,
      onKeydown: K,
      onKeyup: X
    }, D);
  };
}
const uf = () => f("div", {
  key: "svg",
  class: "q-checkbox__bg absolute"
}, [f("svg", {
  class: "q-checkbox__svg fit absolute-full",
  viewBox: "0 0 24 24"
}, [f("path", {
  class: "q-checkbox__truthy",
  fill: "none",
  d: "M1.73,12.91 8.1,19.28 22.79,4.59"
}), f("path", {
  class: "q-checkbox__indet",
  d: "M4,14H20V10H4"
})])]);
var In = re({
  name: "QCheckbox",
  props: Hs,
  emits: Ns,
  setup(e) {
    const t = uf();
    function a(n, l) {
      const o = s(() => (n.value === !0 ? e.checkedIcon : l.value === !0 ? e.indeterminateIcon : e.uncheckedIcon) || null);
      return () => o.value !== null ? [f("div", {
        key: "icon",
        class: "q-checkbox__icon-container absolute-full flex flex-center no-wrap"
      }, [f(st, {
        class: "q-checkbox__icon",
        name: o.value
      })])] : [t];
    }
    return js("checkbox", a);
  }
});
const df = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
var Qs = re({
  name: "QChip",
  props: {
    ...it,
    ...xa,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: !0
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    removeAriaLabel: String,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: !0
    }
  },
  emits: [
    "update:modelValue",
    "update:selected",
    "remove",
    "click"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = ye(), l = rt(e, n), o = _a(e, df), i = s(() => e.selected === !0 || e.icon !== void 0), r = s(() => e.selected === !0 ? e.iconSelected || n.iconSet.chip.selected : e.icon), u = s(() => e.iconRemove || n.iconSet.chip.remove), c = s(() => e.disable === !1 && (e.clickable === !0 || e.selected !== null)), d = s(() => {
      const k = e.outline === !0 && e.color || e.textColor;
      return "q-chip row inline no-wrap items-center" + (e.outline === !1 && e.color !== void 0 ? ` bg-${e.color}` : "") + (k ? ` text-${k} q-chip--colored` : "") + (e.disable === !0 ? " disabled" : "") + (e.dense === !0 ? " q-chip--dense" : "") + (e.outline === !0 ? " q-chip--outline" : "") + (e.selected === !0 ? " q-chip--selected" : "") + (c.value === !0 ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (e.square === !0 ? " q-chip--square" : "") + (l.value === !0 ? " q-chip--dark q-dark" : "");
    }), v = s(() => {
      const k = e.disable === !0 ? {
        tabindex: -1,
        "aria-disabled": "true"
      } : { tabindex: e.tabindex || 0 };
      return {
        chip: k,
        remove: {
          ...k,
          role: "button",
          "aria-hidden": "false",
          "aria-label": e.removeAriaLabel || n.lang.label.remove
        }
      };
    });
    function b(k) {
      k.keyCode === 13 && m(k);
    }
    function m(k) {
      e.disable || (a("update:selected", !e.selected), a("click", k));
    }
    function g(k) {
      (k.keyCode === void 0 || k.keyCode === 13) && (Ye(k), e.disable === !1 && (a("update:modelValue", !1), a("remove")));
    }
    function p() {
      const k = [];
      c.value === !0 && k.push(f("div", { class: "q-focus-helper" })), i.value === !0 && k.push(f(st, {
        class: "q-chip__icon q-chip__icon--left",
        name: r.value
      }));
      const C = e.label !== void 0 ? [f("div", { class: "ellipsis" }, [e.label])] : void 0;
      return k.push(f("div", { class: "q-chip__content col row no-wrap items-center q-anchor--skip" }, Go(t.default, C))), e.iconRight && k.push(f(st, {
        class: "q-chip__icon q-chip__icon--right",
        name: e.iconRight
      })), e.removable === !0 && k.push(f(st, {
        class: "q-chip__icon q-chip__icon--remove cursor-pointer",
        name: u.value,
        ...v.value.remove,
        onClick: g,
        onKeyup: g
      })), k;
    }
    return () => {
      if (e.modelValue === !1) return;
      const k = {
        class: d.value,
        style: o.value
      };
      return c.value === !0 && Object.assign(k, v.value.chip, {
        onClick: m,
        onKeyup: b
      }), oa("div", k, p(), "ripple", e.ripple !== !1 && e.disable !== !0, () => [[Fl, e.ripple]]);
    };
  }
});
const bi = {
  ...xa,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  color: String,
  centerColor: String,
  trackColor: String,
  fontSize: String,
  rounded: Boolean,
  thickness: {
    type: Number,
    default: 0.2,
    validator: (e) => e >= 0 && e <= 1
  },
  angle: {
    type: Number,
    default: 0
  },
  showValue: Boolean,
  reverse: Boolean,
  instantFeedback: Boolean
}, Eo = 50, Us = 2 * Eo, Ks = Us * Math.PI, cf = Math.round(Ks * 1e3) / 1e3;
var yi = re({
  name: "QCircularProgress",
  props: {
    ...bi,
    value: {
      type: Number,
      default: 0
    },
    animationSpeed: {
      type: [String, Number],
      default: 600
    },
    indeterminate: Boolean
  },
  setup(e, { slots: t }) {
    const { proxy: { $q: a } } = ye(), n = _a(e), l = s(() => {
      const m = (a.lang.rtl === !0 ? -1 : 1) * e.angle;
      return { transform: e.reverse !== (a.lang.rtl === !0) ? `scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90 - m}deg)` : `rotate3d(0, 0, 1, ${m - 90}deg)` };
    }), o = s(() => e.instantFeedback !== !0 && e.indeterminate !== !0 ? { transition: `stroke-dashoffset ${e.animationSpeed}ms ease 0s, stroke ${e.animationSpeed}ms ease` } : ""), i = s(() => Us / (1 - e.thickness / 2)), r = s(() => `${i.value / 2} ${i.value / 2} ${i.value} ${i.value}`), u = s(() => mt(e.value, e.min, e.max)), c = s(() => e.max - e.min), d = s(() => e.thickness / 2 * i.value), v = s(() => {
      const m = (e.max - u.value) / c.value, g = e.rounded === !0 && u.value < e.max && m < 0.25 ? d.value / 2 * (1 - m / 0.25) : 0;
      return Ks * m + g;
    });
    function b({ thickness: m, offset: g, color: p, cls: k, rounded: C }) {
      return f("circle", {
        class: "q-circular-progress__" + k + (p !== void 0 ? ` text-${p}` : ""),
        style: o.value,
        fill: "transparent",
        stroke: "currentColor",
        "stroke-width": m,
        "stroke-dasharray": cf,
        "stroke-dashoffset": g,
        "stroke-linecap": C,
        cx: i.value,
        cy: i.value,
        r: Eo
      });
    }
    return () => {
      const m = [];
      e.centerColor !== void 0 && e.centerColor !== "transparent" && m.push(f("circle", {
        class: `q-circular-progress__center text-${e.centerColor}`,
        fill: "currentColor",
        r: Eo - d.value / 2,
        cx: i.value,
        cy: i.value
      })), e.trackColor !== void 0 && e.trackColor !== "transparent" && m.push(b({
        cls: "track",
        thickness: d.value,
        offset: 0,
        color: e.trackColor
      })), m.push(b({
        cls: "circle",
        thickness: d.value,
        offset: v.value,
        color: e.color,
        rounded: e.rounded === !0 ? "round" : void 0
      }));
      const g = [f("svg", {
        class: "q-circular-progress__svg",
        style: l.value,
        viewBox: r.value,
        "aria-hidden": "true"
      }, m)];
      return e.showValue === !0 && g.push(f("div", {
        class: "q-circular-progress__text absolute-full row flex-center content-center",
        style: { fontSize: e.fontSize }
      }, t.default !== void 0 ? t.default() : [f("div", u.value)])), f("div", {
        class: `q-circular-progress q-circular-progress--${e.indeterminate === !0 ? "in" : ""}determinate`,
        style: n.value,
        role: "progressbar",
        "aria-valuemin": e.min,
        "aria-valuemax": e.max,
        "aria-valuenow": e.indeterminate === !0 ? void 0 : u.value
      }, Go(t.internal, g));
    };
  }
});
function io(e, t, a) {
  const n = Wt(e);
  let l, o = n.left - t.event.x, i = n.top - t.event.y, r = Math.abs(o), u = Math.abs(i);
  const c = t.direction;
  c.horizontal === !0 && c.vertical !== !0 ? l = o < 0 ? "left" : "right" : c.horizontal !== !0 && c.vertical === !0 ? l = i < 0 ? "up" : "down" : c.up === !0 && i < 0 ? (l = "up", r > u && (c.left === !0 && o < 0 ? l = "left" : c.right === !0 && o > 0 && (l = "right"))) : c.down === !0 && i > 0 ? (l = "down", r > u && (c.left === !0 && o < 0 ? l = "left" : c.right === !0 && o > 0 && (l = "right"))) : c.left === !0 && o < 0 ? (l = "left", r < u && (c.up === !0 && i < 0 ? l = "up" : c.down === !0 && i > 0 && (l = "down"))) : c.right === !0 && o > 0 && (l = "right", r < u && (c.up === !0 && i < 0 ? l = "up" : c.down === !0 && i > 0 && (l = "down")));
  let d = !1;
  if (l === void 0 && a === !1) {
    if (t.event.isFirst === !0 || t.event.lastDir === void 0) return {};
    l = t.event.lastDir, d = !0, l === "left" || l === "right" ? (n.left -= o, r = 0, o = 0) : (n.top -= i, u = 0, i = 0);
  }
  return {
    synthetic: d,
    payload: {
      evt: e,
      touch: t.event.mouse !== !0,
      mouse: t.event.mouse === !0,
      position: n,
      direction: l,
      isFirst: t.event.isFirst,
      isFinal: a === !0,
      duration: Date.now() - t.event.time,
      distance: {
        x: r,
        y: u
      },
      offset: {
        x: o,
        y: i
      },
      delta: {
        x: n.left - t.event.lastX,
        y: n.top - t.event.lastY
      }
    }
  };
}
let ff = 0;
var ta = ca({
  name: "touch-pan",
  beforeMount(e, { value: t, modifiers: a }) {
    if (a.mouse !== !0 && Je.has.touch !== !0) return;
    function n(o, i) {
      a.mouse === !0 && i === !0 ? Ye(o) : (a.stop === !0 && wt(o), a.prevent === !0 && Ft(o));
    }
    const l = {
      uid: "qvtp_" + ff++,
      handler: t,
      modifiers: a,
      direction: Tl(a),
      noop: At,
      mouseStart(o) {
        Ml(o, l) && Pl(o) && (_t(l, "temp", [[
          document,
          "mousemove",
          "move",
          "notPassiveCapture"
        ], [
          document,
          "mouseup",
          "end",
          "passiveCapture"
        ]]), l.start(o, !0));
      },
      touchStart(o) {
        if (Ml(o, l)) {
          const i = o.target;
          _t(l, "temp", [
            [
              i,
              "touchmove",
              "move",
              "notPassiveCapture"
            ],
            [
              i,
              "touchcancel",
              "end",
              "passiveCapture"
            ],
            [
              i,
              "touchend",
              "end",
              "passiveCapture"
            ]
          ]), l.start(o);
        }
      },
      start(o, i) {
        if (Je.is.firefox === !0 && bn(e, !0), l.lastEvt = o, i === !0 || a.stop === !0) {
          if (l.direction.all !== !0 && (i !== !0 || l.modifiers.mouseAllDir !== !0 && l.modifiers.mousealldir !== !0)) {
            const c = o.type.indexOf("mouse") !== -1 ? new MouseEvent(o.type, o) : new TouchEvent(o.type, o);
            o.defaultPrevented === !0 && Ft(c), o.cancelBubble === !0 && wt(c), Object.assign(c, {
              qKeyEvent: o.qKeyEvent,
              qClickOutside: o.qClickOutside,
              qAnchorHandled: o.qAnchorHandled,
              qClonedBy: o.qClonedBy === void 0 ? [l.uid] : o.qClonedBy.concat(l.uid)
            }), l.initialEvent = {
              target: o.target,
              event: c
            };
          }
          wt(o);
        }
        const { left: r, top: u } = Wt(o);
        l.event = {
          x: r,
          y: u,
          time: Date.now(),
          mouse: i === !0,
          detected: !1,
          isFirst: !0,
          isFinal: !1,
          lastX: r,
          lastY: u
        };
      },
      move(o) {
        if (l.event === void 0) return;
        const i = Wt(o), r = i.left - l.event.x, u = i.top - l.event.y;
        if (r === 0 && u === 0) return;
        l.lastEvt = o;
        const c = l.event.mouse === !0, d = () => {
          n(o, c);
          let m;
          a.preserveCursor !== !0 && a.preservecursor !== !0 && (m = document.documentElement.style.cursor || "", document.documentElement.style.cursor = "grabbing"), c === !0 && document.body.classList.add("no-pointer-events--children"), document.body.classList.add("non-selectable"), da(), l.styleCleanup = (g) => {
            if (l.styleCleanup = void 0, m !== void 0 && (document.documentElement.style.cursor = m), document.body.classList.remove("non-selectable"), c === !0) {
              const p = () => {
                document.body.classList.remove("no-pointer-events--children");
              };
              g !== void 0 ? setTimeout(() => {
                p(), g();
              }, 50) : p();
            } else g !== void 0 && g();
          };
        };
        if (l.event.detected === !0) {
          l.event.isFirst !== !0 && n(o, l.event.mouse);
          const { payload: m, synthetic: g } = io(o, l, !1);
          m !== void 0 && (l.handler(m) === !1 ? l.end(o) : (l.styleCleanup === void 0 && l.event.isFirst === !0 && d(), l.event.lastX = m.position.left, l.event.lastY = m.position.top, l.event.lastDir = g === !0 ? void 0 : m.direction, l.event.isFirst = !1));
          return;
        }
        if (l.direction.all === !0 || c === !0 && (l.modifiers.mouseAllDir === !0 || l.modifiers.mousealldir === !0)) {
          d(), l.event.detected = !0, l.move(o);
          return;
        }
        const v = Math.abs(r), b = Math.abs(u);
        v !== b && (l.direction.horizontal === !0 && v > b || l.direction.vertical === !0 && v < b || l.direction.up === !0 && v < b && u < 0 || l.direction.down === !0 && v < b && u > 0 || l.direction.left === !0 && v > b && r < 0 || l.direction.right === !0 && v > b && r > 0 ? (l.event.detected = !0, l.move(o)) : l.end(o, !0));
      },
      end(o, i) {
        var r;
        if (l.event !== void 0) {
          if (Ut(l, "temp"), Je.is.firefox === !0 && bn(e, !1), i === !0)
            (r = l.styleCleanup) == null || r.call(l), l.event.detected !== !0 && l.initialEvent !== void 0 && l.initialEvent.target.dispatchEvent(l.initialEvent.event);
          else if (l.event.detected === !0) {
            l.event.isFirst === !0 && l.handler(io(o === void 0 ? l.lastEvt : o, l).payload);
            const { payload: u } = io(o === void 0 ? l.lastEvt : o, l, !0), c = () => {
              l.handler(u);
            };
            l.styleCleanup !== void 0 ? l.styleCleanup(c) : c();
          }
          l.event = void 0, l.initialEvent = void 0, l.lastEvt = void 0;
        }
      }
    };
    e.__qtouchpan = l, a.mouse === !0 && _t(l, "main", [[
      e,
      "mousedown",
      "mouseStart",
      `passive${a.mouseCapture === !0 || a.mousecapture === !0 ? "Capture" : ""}`
    ]]), Je.has.touch === !0 && _t(l, "main", [[
      e,
      "touchstart",
      "touchStart",
      `passive${a.capture === !0 ? "Capture" : ""}`
    ], [
      e,
      "touchmove",
      "noop",
      "notPassiveCapture"
    ]]);
  },
  updated(e, t) {
    const a = e.__qtouchpan;
    a !== void 0 && (t.oldValue !== t.value && (typeof value != "function" && a.end(), a.handler = t.value), a.direction = Tl(t.modifiers));
  },
  beforeUnmount(e) {
    var a;
    const t = e.__qtouchpan;
    t !== void 0 && (t.event !== void 0 && t.end(), Ut(t, "main"), Ut(t, "temp"), Je.is.firefox === !0 && bn(e, !1), (a = t.styleCleanup) == null || a.call(t), delete e.__qtouchpan);
  }
});
const vf = "q-slider__marker-labels", mf = (e) => ({ value: e }), gf = ({ marker: e }) => f("div", {
  key: e.value,
  style: e.style,
  class: e.classes
}, e.label), pi = [
  34,
  37,
  40,
  33,
  39,
  38
], Ws = {
  ...it,
  ...ra,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  innerMin: Number,
  innerMax: Number,
  step: {
    type: Number,
    default: 1,
    validator: (e) => e >= 0
  },
  snap: Boolean,
  vertical: Boolean,
  reverse: Boolean,
  color: String,
  markerLabelsClass: String,
  label: Boolean,
  labelColor: String,
  labelTextColor: String,
  labelAlways: Boolean,
  switchLabelSide: Boolean,
  markers: [Boolean, Number],
  markerLabels: [
    Boolean,
    Array,
    Object,
    Function
  ],
  switchMarkerLabelsSide: Boolean,
  trackImg: String,
  trackColor: String,
  innerTrackImg: String,
  innerTrackColor: String,
  selectionColor: String,
  selectionImg: String,
  thumbSize: {
    type: String,
    default: "20px"
  },
  trackSize: {
    type: String,
    default: "4px"
  },
  disable: Boolean,
  readonly: Boolean,
  dense: Boolean,
  tabindex: [String, Number],
  thumbColor: String,
  thumbPath: {
    type: String,
    default: "M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"
  }
}, Ys = [
  "pan",
  "update:modelValue",
  "change"
];
function Xs({ updateValue: e, updatePosition: t, getDragging: a, formAttrs: n }) {
  const { props: l, emit: o, slots: i, proxy: { $q: r } } = ye(), u = rt(l, r), c = Ra(n), d = z(!1), v = z(!1), b = z(!1), m = z(!1), g = s(() => l.vertical === !0 ? "--v" : "--h"), p = s(() => "-" + (l.switchLabelSide === !0 ? "switched" : "standard")), k = s(() => l.vertical === !0 ? l.reverse === !0 : l.reverse !== (r.lang.rtl === !0)), C = s(() => isNaN(l.innerMin) === !0 || l.innerMin < l.min ? l.min : l.innerMin), y = s(() => isNaN(l.innerMax) === !0 || l.innerMax > l.max ? l.max : l.innerMax), h = s(() => l.disable !== !0 && l.readonly !== !0 && C.value < y.value), w = s(() => {
    if (l.step === 0) return (ke) => ke;
    const le = (String(l.step).trim().split(".")[1] || "").length;
    return (ke) => parseFloat(ke.toFixed(le));
  }), x = s(() => l.step === 0 ? 1 : l.step), L = s(() => h.value === !0 ? l.tabindex || 0 : -1), M = s(() => l.max - l.min), K = s(() => y.value - C.value), X = s(() => W(C.value)), A = s(() => W(y.value)), $ = s(() => l.vertical === !0 ? k.value === !0 ? "bottom" : "top" : k.value === !0 ? "right" : "left"), D = s(() => l.vertical === !0 ? "height" : "width"), _ = s(() => l.vertical === !0 ? "width" : "height"), S = s(() => l.vertical === !0 ? "vertical" : "horizontal"), T = s(() => {
    const le = {
      role: "slider",
      "aria-valuemin": C.value,
      "aria-valuemax": y.value,
      "aria-orientation": S.value,
      "data-step": l.step
    };
    return l.disable === !0 ? le["aria-disabled"] = "true" : l.readonly === !0 && (le["aria-readonly"] = "true"), le;
  }), H = s(() => `q-slider q-slider${g.value} q-slider--${d.value === !0 ? "" : "in"}active inline no-wrap ` + (l.vertical === !0 ? "row" : "column") + (l.disable === !0 ? " disabled" : " q-slider--enabled" + (h.value === !0 ? " q-slider--editable" : "")) + (b.value === "both" ? " q-slider--focus" : "") + (l.label || l.labelAlways === !0 ? " q-slider--label" : "") + (l.labelAlways === !0 ? " q-slider--label-always" : "") + (u.value === !0 ? " q-slider--dark" : "") + (l.dense === !0 ? " q-slider--dense q-slider--dense" + g.value : ""));
  function E(le) {
    const ke = "q-slider__" + le;
    return `${ke} ${ke}${g.value} ${ke}${g.value}${p.value}`;
  }
  function Q(le) {
    const ke = "q-slider__" + le;
    return `${ke} ${ke}${g.value}`;
  }
  const j = s(() => {
    const le = l.selectionColor || l.color;
    return "q-slider__selection absolute" + (le !== void 0 ? ` text-${le}` : "");
  }), N = s(() => Q("markers") + " absolute overflow-hidden"), Z = s(() => Q("track-container")), B = s(() => E("pin")), G = s(() => E("label")), V = s(() => E("text-container")), oe = s(() => E("marker-labels-container") + (l.markerLabelsClass !== void 0 ? ` ${l.markerLabelsClass}` : "")), P = s(() => "q-slider__track relative-position no-outline" + (l.trackColor !== void 0 ? ` bg-${l.trackColor}` : "")), I = s(() => {
    const le = { [_.value]: l.trackSize };
    return l.trackImg !== void 0 && (le.backgroundImage = `url(${l.trackImg}) !important`), le;
  }), de = s(() => "q-slider__inner absolute" + (l.innerTrackColor !== void 0 ? ` bg-${l.innerTrackColor}` : "")), Y = s(() => {
    const le = A.value - X.value, ke = {
      [$.value]: `${100 * X.value}%`,
      [D.value]: le === 0 ? "2px" : `${100 * le}%`
    };
    return l.innerTrackImg !== void 0 && (ke.backgroundImage = `url(${l.innerTrackImg}) !important`), ke;
  });
  function fe(le) {
    const { min: ke, max: Fe, step: Te } = l;
    let He = ke + le * (Fe - ke);
    if (Te > 0) {
      const ut = (He - C.value) % Te;
      He += (Math.abs(ut) >= Te / 2 ? (ut < 0 ? -1 : 1) * Te : 0) - ut;
    }
    return He = w.value(He), mt(He, C.value, y.value);
  }
  function W(le) {
    return M.value === 0 ? 0 : (le - l.min) / M.value;
  }
  function be(le, ke) {
    const Fe = Wt(le), Te = l.vertical === !0 ? mt((Fe.top - ke.top) / ke.height, 0, 1) : mt((Fe.left - ke.left) / ke.width, 0, 1);
    return mt(k.value === !0 ? 1 - Te : Te, X.value, A.value);
  }
  const _e = s(() => jn(l.markers) === !0 ? l.markers : x.value), we = s(() => {
    const le = [], ke = _e.value, Fe = l.max;
    let Te = l.min;
    do
      le.push(Te), Te += ke;
    while (Te < Fe);
    return le.push(Fe), le;
  }), Ie = s(() => {
    const le = ` ${vf}${g.value}-`;
    return `q-slider__marker-labels${le}${l.switchMarkerLabelsSide === !0 ? "switched" : "standard"}${le}${k.value === !0 ? "rtl" : "ltr"}`;
  }), Ce = s(() => l.markerLabels === !1 ? null : ot(l.markerLabels).map((le, ke) => ({
    index: ke,
    value: le.value,
    label: le.label || le.value,
    classes: Ie.value + (le.classes !== void 0 ? " " + le.classes : ""),
    style: {
      ...We(le.value),
      ...le.style || {}
    }
  }))), Me = s(() => ({
    markerList: Ce.value,
    markerMap: ue.value,
    classes: Ie.value,
    getStyle: We
  })), Le = s(() => {
    const le = K.value === 0 ? "2px" : 100 * _e.value / K.value;
    return {
      ...Y.value,
      backgroundSize: l.vertical === !0 ? `2px ${le}%` : `${le}% 2px`
    };
  });
  function ot(le) {
    if (le === !1) return null;
    if (le === !0) return we.value.map(mf);
    if (typeof le == "function") return we.value.map((Fe) => {
      const Te = le(Fe);
      return Qt(Te) === !0 ? {
        ...Te,
        value: Fe
      } : {
        value: Fe,
        label: Te
      };
    });
    const ke = ({ value: Fe }) => Fe >= l.min && Fe <= l.max;
    return Array.isArray(le) === !0 ? le.map((Fe) => Qt(Fe) === !0 ? Fe : { value: Fe }).filter(ke) : Object.keys(le).map((Fe) => {
      const Te = le[Fe], He = Number(Fe);
      return Qt(Te) === !0 ? {
        ...Te,
        value: He
      } : {
        value: He,
        label: Te
      };
    }).filter(ke);
  }
  function We(le) {
    return { [$.value]: `${100 * (le - l.min) / M.value}%` };
  }
  const ue = s(() => {
    if (l.markerLabels === !1) return null;
    const le = {};
    return Ce.value.forEach((ke) => {
      le[ke.value] = ke;
    }), le;
  });
  function ie() {
    if (i["marker-label-group"] !== void 0) return i["marker-label-group"](Me.value);
    const le = i["marker-label"] || gf;
    return Ce.value.map((ke) => le({
      marker: ke,
      ...Me.value
    }));
  }
  const ge = s(() => [[
    ta,
    Pe,
    void 0,
    {
      [S.value]: !0,
      prevent: !0,
      stop: !0,
      mouse: !0,
      mouseAllDir: !0
    }
  ]]);
  function Pe(le) {
    le.isFinal === !0 ? (m.value !== void 0 && (t(le.evt), le.touch === !0 && e(!0), m.value = void 0, o("pan", "end")), d.value = !1, b.value = !1) : le.isFirst === !0 ? (m.value = a(le.evt), t(le.evt), e(), d.value = !0, o("pan", "start")) : (t(le.evt), e());
  }
  function Ge() {
    b.value = !1;
  }
  function Ke(le) {
    t(le, a(le)), e(), v.value = !0, d.value = !0, document.addEventListener("mouseup", je, !0);
  }
  function je() {
    v.value = !1, d.value = !1, e(!0), Ge(), document.removeEventListener("mouseup", je, !0);
  }
  function Qe(le) {
    t(le, a(le)), e(!0);
  }
  function et(le) {
    pi.includes(le.keyCode) && e(!0);
  }
  function ae(le) {
    if (l.vertical === !0) return null;
    const ke = r.lang.rtl !== l.reverse ? 1 - le : le;
    return { transform: `translateX(calc(${2 * ke - 1} * ${l.thumbSize} / 2 + ${50 - 100 * ke}%))` };
  }
  function ce(le) {
    const ke = s(() => v.value === !1 && (b.value === le.focusValue || b.value === "both") ? " q-slider--focus" : ""), Fe = s(() => `q-slider__thumb q-slider__thumb${g.value} q-slider__thumb${g.value}-${k.value === !0 ? "rtl" : "ltr"} absolute non-selectable` + ke.value + (le.thumbColor.value !== void 0 ? ` text-${le.thumbColor.value}` : "")), Te = s(() => ({
      width: l.thumbSize,
      height: l.thumbSize,
      [$.value]: `${100 * le.ratio.value}%`,
      zIndex: b.value === le.focusValue ? 2 : void 0
    })), He = s(() => le.labelColor.value !== void 0 ? ` text-${le.labelColor.value}` : ""), ut = s(() => ae(le.ratio.value)), It = s(() => "q-slider__text" + (le.labelTextColor.value !== void 0 ? ` text-${le.labelTextColor.value}` : ""));
    return () => {
      const Ct = [f("svg", {
        class: "q-slider__thumb-shape absolute-full",
        viewBox: "0 0 20 20",
        "aria-hidden": "true"
      }, [f("path", { d: l.thumbPath })]), f("div", { class: "q-slider__focus-ring fit" })];
      return (l.label === !0 || l.labelAlways === !0) && (Ct.push(f("div", { class: B.value + " absolute fit no-pointer-events" + He.value }, [f("div", {
        class: G.value,
        style: { minWidth: l.thumbSize }
      }, [f("div", {
        class: V.value,
        style: ut.value
      }, [f("span", { class: It.value }, le.label.value)])])])), l.name !== void 0 && l.disable !== !0 && c(Ct, "push")), f("div", {
        class: Fe.value,
        style: Te.value,
        ...le.getNodeData()
      }, Ct);
    };
  }
  function Ve(le, ke, Fe, Te) {
    const He = [];
    l.innerTrackColor !== "transparent" && He.push(f("div", {
      key: "inner",
      class: de.value,
      style: Y.value
    })), l.selectionColor !== "transparent" && He.push(f("div", {
      key: "selection",
      class: j.value,
      style: le.value
    })), l.markers !== !1 && He.push(f("div", {
      key: "marker",
      class: N.value,
      style: Le.value
    })), Te(He);
    const ut = [oa("div", {
      key: "trackC",
      class: Z.value,
      tabindex: ke.value,
      ...Fe.value
    }, [f("div", {
      class: P.value,
      style: I.value
    }, He)], "slide", h.value, () => ge.value)];
    return l.markerLabels !== !1 && ut[l.switchMarkerLabelsSide === !0 ? "unshift" : "push"](f("div", {
      key: "markerL",
      class: oe.value
    }, ie())), ut;
  }
  return tt(() => {
    document.removeEventListener("mouseup", je, !0);
  }), {
    state: {
      active: d,
      focus: b,
      preventFocus: v,
      dragging: m,
      editable: h,
      classes: H,
      tabindex: L,
      attributes: T,
      roundValueFn: w,
      keyStep: x,
      trackLen: M,
      innerMin: C,
      innerMinRatio: X,
      innerMax: y,
      innerMaxRatio: A,
      positionProp: $,
      sizeProp: D,
      isReversed: k
    },
    methods: {
      onActivate: Ke,
      onMobileClick: Qe,
      onBlur: Ge,
      onKeyup: et,
      getContent: Ve,
      getThumbRenderFn: ce,
      convertRatioToModel: fe,
      convertModelToRatio: W,
      getDraggingRatio: be
    }
  };
}
const hf = () => ({});
var Ha = re({
  name: "QSlider",
  props: {
    ...Ws,
    modelValue: {
      required: !0,
      default: null,
      validator: (e) => typeof e == "number" || e === null
    },
    labelValue: [String, Number]
  },
  emits: Ys,
  setup(e, { emit: t }) {
    const { proxy: { $q: a } } = ye(), { state: n, methods: l } = Xs({
      updateValue: g,
      updatePosition: k,
      getDragging: p,
      formAttrs: Zn(e)
    }), o = z(null), i = z(0), r = z(0);
    function u() {
      r.value = e.modelValue === null ? n.innerMin.value : mt(e.modelValue, n.innerMin.value, n.innerMax.value);
    }
    se(() => `${e.modelValue}|${n.innerMin.value}|${n.innerMax.value}`, u), u();
    const c = s(() => l.convertModelToRatio(r.value)), d = s(() => n.active.value === !0 ? i.value : c.value), v = s(() => {
      const h = {
        [n.positionProp.value]: `${100 * n.innerMinRatio.value}%`,
        [n.sizeProp.value]: `${100 * (d.value - n.innerMinRatio.value)}%`
      };
      return e.selectionImg !== void 0 && (h.backgroundImage = `url(${e.selectionImg}) !important`), h;
    }), b = l.getThumbRenderFn({
      focusValue: !0,
      getNodeData: hf,
      ratio: d,
      label: s(() => e.labelValue !== void 0 ? e.labelValue : r.value),
      thumbColor: s(() => e.thumbColor || e.color),
      labelColor: s(() => e.labelColor),
      labelTextColor: s(() => e.labelTextColor)
    }), m = s(() => n.editable.value !== !0 ? {} : a.platform.is.mobile === !0 ? { onClick: l.onMobileClick } : {
      onMousedown: l.onActivate,
      onFocus: C,
      onBlur: l.onBlur,
      onKeydown: y,
      onKeyup: l.onKeyup
    });
    function g(h) {
      r.value !== e.modelValue && t("update:modelValue", r.value), h === !0 && t("change", r.value);
    }
    function p() {
      return o.value.getBoundingClientRect();
    }
    function k(h, w = n.dragging.value) {
      const x = l.getDraggingRatio(h, w);
      r.value = l.convertRatioToModel(x), i.value = e.snap !== !0 || e.step === 0 ? x : l.convertModelToRatio(r.value);
    }
    function C() {
      n.focus.value = !0;
    }
    function y(h) {
      if (pi.includes(h.keyCode) === !1) return;
      Ye(h);
      const w = ([34, 33].includes(h.keyCode) ? 10 : 1) * n.keyStep.value, x = ([
        34,
        37,
        40
      ].includes(h.keyCode) ? -1 : 1) * (n.isReversed.value === !0 ? -1 : 1) * (e.vertical === !0 ? -1 : 1) * w;
      r.value = mt(n.roundValueFn.value(r.value + x), n.innerMin.value, n.innerMax.value), g();
    }
    return () => {
      const h = l.getContent(v, n.tabindex, m, (w) => {
        w.push(b());
      });
      return f("div", {
        ref: o,
        class: n.classes.value + (e.modelValue === null ? " q-slider--no-value" : ""),
        ...n.attributes.value,
        "aria-valuenow": e.modelValue
      }, h);
    };
  }
});
function Gs() {
  const e = z(!na.value);
  return e.value === !1 && bt(() => {
    e.value = !0;
  }), { isHydrated: e };
}
const Zs = typeof ResizeObserver < "u", Xi = Zs === !0 ? {} : {
  style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
  url: "about:blank"
};
var Ga = re({
  name: "QResizeObserver",
  props: { debounce: {
    type: [String, Number],
    default: 100
  } },
  emits: ["resize"],
  setup(e, { emit: t }) {
    let a = null, n, l = {
      width: -1,
      height: -1
    };
    function o(u) {
      u === !0 || e.debounce === 0 || e.debounce === "0" ? i() : a === null && (a = setTimeout(i, e.debounce));
    }
    function i() {
      if (a !== null && (clearTimeout(a), a = null), n) {
        const { offsetWidth: u, offsetHeight: c } = n;
        (u !== l.width || c !== l.height) && (l = {
          width: u,
          height: c
        }, t("resize", l));
      }
    }
    const { proxy: r } = ye();
    if (r.trigger = o, Zs === !0) {
      let u;
      const c = (d) => {
        n = r.$el.parentNode, n ? (u = new ResizeObserver(o), u.observe(n), i()) : d !== !0 && nt(() => {
          c(!0);
        });
      };
      return bt(() => {
        c();
      }), tt(() => {
        a !== null && clearTimeout(a), u !== void 0 && (u.disconnect !== void 0 ? u.disconnect() : n && u.unobserve(n));
      }), At;
    } else {
      let d = function() {
        a !== null && (clearTimeout(a), a = null), c !== void 0 && (c.removeEventListener !== void 0 && c.removeEventListener("resize", o, gt.passive), c = void 0);
      }, v = function() {
        d(), n != null && n.contentDocument && (c = n.contentDocument.defaultView, c.addEventListener("resize", o, gt.passive), i());
      };
      const { isHydrated: u } = Gs();
      let c;
      return bt(() => {
        nt(() => {
          n = r.$el, n && v();
        });
      }), tt(d), () => {
        if (u.value === !0) return f("object", {
          class: "q--avoid-card-border",
          style: Xi.style,
          tabindex: -1,
          type: "text/html",
          data: Xi.url,
          "aria-hidden": "true",
          onLoad: v
        });
      };
    }
  }
});
let Kn = !1;
if (!__QUASAR_SSR__) {
  const e = document.createElement("div");
  e.setAttribute("dir", "rtl"), Object.assign(e.style, {
    width: "1px",
    height: "1px",
    overflow: "auto"
  });
  const t = document.createElement("div");
  Object.assign(t.style, {
    width: "1000px",
    height: "1px"
  }), document.body.appendChild(e), e.appendChild(t), e.scrollLeft = -1e3, Kn = e.scrollLeft >= 0, e.remove();
}
function bf(e, t, a) {
  const n = a === !0 ? ["left", "right"] : ["top", "bottom"];
  return `absolute-${t === !0 ? n[0] : n[1]}${e ? ` text-${e}` : ""}`;
}
const yf = [
  "left",
  "center",
  "right",
  "justify"
];
var Gi = re({
  name: "QTabs",
  props: {
    modelValue: [Number, String],
    align: {
      type: String,
      default: "center",
      validator: (e) => yf.includes(e)
    },
    breakpoint: {
      type: [String, Number],
      default: 600
    },
    vertical: Boolean,
    shrink: Boolean,
    stretch: Boolean,
    activeClass: String,
    activeColor: String,
    activeBgColor: String,
    indicatorColor: String,
    leftIcon: String,
    rightIcon: String,
    outsideArrows: Boolean,
    mobileArrows: Boolean,
    switchIndicator: Boolean,
    narrowIndicator: Boolean,
    inlineLabel: Boolean,
    noCaps: Boolean,
    dense: Boolean,
    contentClass: String,
    "onUpdate:modelValue": [Function, Array]
  },
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), { $q: l } = n, { registerTick: o } = kn(), { registerTick: i } = kn(), { registerTick: r } = kn(), { registerTimeout: u, removeTimeout: c } = Sa(), { registerTimeout: d, removeTimeout: v } = Sa(), b = z(null), m = z(null), g = z(e.modelValue), p = z(!1), k = z(!0), C = z(!1), y = z(!1), h = [], w = z(0), x = z(!1);
    let L = null, M = null, K;
    const X = s(() => ({
      activeClass: e.activeClass,
      activeColor: e.activeColor,
      activeBgColor: e.activeBgColor,
      indicatorClass: bf(e.indicatorColor, e.switchIndicator, e.vertical),
      narrowIndicator: e.narrowIndicator,
      inlineLabel: e.inlineLabel,
      noCaps: e.noCaps
    })), A = s(() => {
      const ie = w.value, ge = g.value;
      for (let Pe = 0; Pe < ie; Pe++) if (h[Pe].name.value === ge) return !0;
      return !1;
    }), $ = s(() => `q-tabs__content--align-${p.value === !0 ? "left" : y.value === !0 ? "justify" : e.align}`), D = s(() => `q-tabs row no-wrap items-center q-tabs--${p.value === !0 ? "" : "not-"}scrollable q-tabs--${e.vertical === !0 ? "vertical" : "horizontal"} q-tabs__arrows--${e.outsideArrows === !0 ? "outside" : "inside"} q-tabs--mobile-with${e.mobileArrows === !0 ? "" : "out"}-arrows` + (e.dense === !0 ? " q-tabs--dense" : "") + (e.shrink === !0 ? " col-shrink" : "") + (e.stretch === !0 ? " self-stretch" : "")), _ = s(() => "q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position " + $.value + (e.contentClass !== void 0 ? ` ${e.contentClass}` : "")), S = s(() => e.vertical === !0 ? {
      container: "height",
      content: "offsetHeight",
      scroll: "scrollHeight"
    } : {
      container: "width",
      content: "offsetWidth",
      scroll: "scrollWidth"
    }), T = s(() => e.vertical !== !0 && l.lang.rtl === !0), H = s(() => Kn === !1 && T.value === !0);
    se(T, B), se(() => e.modelValue, (ie) => {
      E({
        name: ie,
        setCurrent: !0,
        skipEmit: !0
      });
    }), se(() => e.outsideArrows, Q);
    function E({ name: ie, setCurrent: ge, skipEmit: Pe }) {
      g.value !== ie && (Pe !== !0 && e["onUpdate:modelValue"] !== void 0 && a("update:modelValue", ie), (ge === !0 || e["onUpdate:modelValue"] === void 0) && (N(g.value, ie), g.value = ie));
    }
    function Q() {
      o(() => {
        b.value && j({
          width: b.value.offsetWidth,
          height: b.value.offsetHeight
        });
      });
    }
    function j(ie) {
      if (S.value === void 0 || m.value === null) return;
      const ge = ie[S.value.container], Pe = Math.min(m.value[S.value.scroll], Array.prototype.reduce.call(m.value.children, (Ke, je) => Ke + (je[S.value.content] || 0), 0)), Ge = ge > 0 && Pe > ge;
      p.value = Ge, Ge === !0 && i(B), y.value = ge < parseInt(e.breakpoint, 10);
    }
    function N(ie, ge) {
      const Pe = ie != null && ie !== "" ? h.find((Ke) => Ke.name.value === ie) : null, Ge = ge != null && ge !== "" ? h.find((Ke) => Ke.name.value === ge) : null;
      if (ue === !0) ue = !1;
      else if (Pe && Ge) {
        const Ke = Pe.tabIndicatorRef.value, je = Ge.tabIndicatorRef.value;
        L !== null && (clearTimeout(L), L = null), Ke.style.transition = "none", Ke.style.transform = "none", je.style.transition = "none", je.style.transform = "none";
        const Qe = Ke.getBoundingClientRect(), et = je.getBoundingClientRect();
        je.style.transform = e.vertical === !0 ? `translate3d(0,${Qe.top - et.top}px,0) scale3d(1,${et.height ? Qe.height / et.height : 1},1)` : `translate3d(${Qe.left - et.left}px,0,0) scale3d(${et.width ? Qe.width / et.width : 1},1,1)`, r(() => {
          L = setTimeout(() => {
            L = null, je.style.transition = "transform .25s cubic-bezier(.4, 0, .2, 1)", je.style.transform = "none";
          }, 70);
        });
      }
      Ge && p.value === !0 && Z(Ge.rootRef.value);
    }
    function Z(ie) {
      const { left: ge, width: Pe, top: Ge, height: Ke } = m.value.getBoundingClientRect(), je = ie.getBoundingClientRect();
      let Qe = e.vertical === !0 ? je.top - Ge : je.left - ge;
      if (Qe < 0) {
        m.value[e.vertical === !0 ? "scrollTop" : "scrollLeft"] += Math.floor(Qe), B();
        return;
      }
      Qe += e.vertical === !0 ? je.height - Ke : je.width - Pe, Qe > 0 && (m.value[e.vertical === !0 ? "scrollTop" : "scrollLeft"] += Math.ceil(Qe), B());
    }
    function B() {
      const ie = m.value;
      if (ie === null) return;
      const ge = ie.getBoundingClientRect(), Pe = e.vertical === !0 ? ie.scrollTop : Math.abs(ie.scrollLeft);
      T.value === !0 ? (k.value = Math.ceil(Pe + ge.width) < ie.scrollWidth - 1, C.value = Pe > 0) : (k.value = Pe > 0, C.value = e.vertical === !0 ? Math.ceil(Pe + ge.height) < ie.scrollHeight : Math.ceil(Pe + ge.width) < ie.scrollWidth);
    }
    function G(ie) {
      M !== null && clearInterval(M), M = setInterval(() => {
        Y(ie) === !0 && P();
      }, 5);
    }
    function V() {
      G(H.value === !0 ? Number.MAX_SAFE_INTEGER : 0);
    }
    function oe() {
      G(H.value === !0 ? 0 : Number.MAX_SAFE_INTEGER);
    }
    function P() {
      M !== null && (clearInterval(M), M = null);
    }
    function I(ie, ge) {
      const Pe = Array.prototype.filter.call(m.value.children, (et) => et === ge || et.matches && et.matches(".q-tab.q-focusable") === !0), Ge = Pe.length;
      if (Ge === 0) return;
      if (ie === 36)
        return Z(Pe[0]), Pe[0].focus(), !0;
      if (ie === 35)
        return Z(Pe[Ge - 1]), Pe[Ge - 1].focus(), !0;
      const Ke = ie === (e.vertical === !0 ? 38 : 37), je = ie === (e.vertical === !0 ? 40 : 39), Qe = Ke === !0 ? -1 : je === !0 ? 1 : void 0;
      if (Qe !== void 0) {
        const et = T.value === !0 ? -1 : 1, ae = Pe.indexOf(ge) + Qe * et;
        return ae >= 0 && ae < Ge && (Z(Pe[ae]), Pe[ae].focus({ preventScroll: !0 })), !0;
      }
    }
    const de = s(() => H.value === !0 ? {
      get: (ie) => Math.abs(ie.scrollLeft),
      set: (ie, ge) => {
        ie.scrollLeft = -ge;
      }
    } : e.vertical === !0 ? {
      get: (ie) => ie.scrollTop,
      set: (ie, ge) => {
        ie.scrollTop = ge;
      }
    } : {
      get: (ie) => ie.scrollLeft,
      set: (ie, ge) => {
        ie.scrollLeft = ge;
      }
    });
    function Y(ie) {
      const ge = m.value, { get: Pe, set: Ge } = de.value;
      let Ke = !1, je = Pe(ge);
      const Qe = ie < je ? -1 : 1;
      return je += Qe * 5, je < 0 ? (Ke = !0, je = 0) : (Qe === -1 && je <= ie || Qe === 1 && je >= ie) && (Ke = !0, je = ie), Ge(ge, je), B(), Ke;
    }
    function fe(ie, ge) {
      for (const Pe in ie) if (ie[Pe] !== ge[Pe]) return !1;
      return !0;
    }
    function W() {
      let ie = null, ge = {
        matchedLen: 0,
        queryDiff: 9999,
        hrefLen: 0
      };
      const Pe = h.filter((Qe) => {
        var et;
        return ((et = Qe.routeData) == null ? void 0 : et.hasRouterLink.value) === !0;
      }), { hash: Ge, query: Ke } = n.$route, je = Object.keys(Ke).length;
      for (const Qe of Pe) {
        const et = Qe.routeData.exact.value === !0;
        if (Qe.routeData[et === !0 ? "linkIsExactActive" : "linkIsActive"].value !== !0) continue;
        const { hash: ae, query: ce, matched: Ve, href: le } = Qe.routeData.resolvedLink.value, ke = Object.keys(ce).length;
        if (et === !0) {
          if (ae !== Ge || ke !== je || fe(Ke, ce) === !1) continue;
          ie = Qe.name.value;
          break;
        }
        if (ae !== "" && ae !== Ge || ke !== 0 && fe(ce, Ke) === !1) continue;
        const Fe = {
          matchedLen: Ve.length,
          queryDiff: je - ke,
          hrefLen: le.length - ae.length
        };
        if (Fe.matchedLen > ge.matchedLen) {
          ie = Qe.name.value, ge = Fe;
          continue;
        } else if (Fe.matchedLen !== ge.matchedLen) continue;
        if (Fe.queryDiff < ge.queryDiff)
          ie = Qe.name.value, ge = Fe;
        else if (Fe.queryDiff !== ge.queryDiff) continue;
        Fe.hrefLen > ge.hrefLen && (ie = Qe.name.value, ge = Fe);
      }
      if (ie === null && h.some((Qe) => Qe.routeData === void 0 && Qe.name.value === g.value) === !0) {
        ue = !1;
        return;
      }
      E({
        name: ie,
        setCurrent: !0
      });
    }
    function be(ie) {
      if (c(), x.value !== !0 && b.value !== null && ie.target && typeof ie.target.closest == "function") {
        const ge = ie.target.closest(".q-tab");
        ge && b.value.contains(ge) === !0 && (x.value = !0, p.value === !0 && Z(ge));
      }
    }
    function _e() {
      u(() => {
        x.value = !1;
      }, 30);
    }
    function we() {
      Le.avoidRouteWatcher === !1 ? d(W) : v();
    }
    function Ie() {
      if (K === void 0) {
        const ie = se(() => n.$route.fullPath, we);
        K = () => {
          ie(), K = void 0;
        };
      }
    }
    function Ce(ie) {
      h.push(ie), w.value++, Q(), ie.routeData === void 0 || n.$route === void 0 ? d(() => {
        if (p.value === !0) {
          const ge = g.value, Pe = ge != null && ge !== "" ? h.find((Ge) => Ge.name.value === ge) : null;
          Pe && Z(Pe.rootRef.value);
        }
      }) : (Ie(), ie.routeData.hasRouterLink.value === !0 && we());
    }
    function Me(ie) {
      h.splice(h.indexOf(ie), 1), w.value--, Q(), K !== void 0 && ie.routeData !== void 0 && (h.every((ge) => ge.routeData === void 0) === !0 && K(), we());
    }
    const Le = {
      currentModel: g,
      tabProps: X,
      hasFocus: x,
      hasActiveTab: A,
      registerTab: Ce,
      unregisterTab: Me,
      verifyRouteModel: we,
      updateModel: E,
      onKbdNavigate: I,
      avoidRouteWatcher: !1
    };
    Va(us, Le);
    function ot() {
      L !== null && clearTimeout(L), P(), K == null || K();
    }
    let We, ue;
    return tt(ot), wa(() => {
      We = K !== void 0, ot();
    }), en(() => {
      We === !0 && (Ie(), ue = !0, we()), Q();
    }), () => f("div", {
      ref: b,
      class: D.value,
      role: "tablist",
      onFocusin: be,
      onFocusout: _e
    }, [
      f(Ga, { onResize: j }),
      f("div", {
        ref: m,
        class: _.value,
        onScroll: B
      }, De(t.default)),
      f(st, {
        class: "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" + (k.value === !0 ? "" : " q-tabs__arrow--faded"),
        name: e.leftIcon || l.iconSet.tabs[e.vertical === !0 ? "up" : "left"],
        onMousedownPassive: V,
        onTouchstartPassive: V,
        onMouseupPassive: P,
        onMouseleavePassive: P,
        onTouchendPassive: P
      }),
      f(st, {
        class: "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" + (C.value === !0 ? "" : " q-tabs__arrow--faded"),
        name: e.rightIcon || l.iconSet.tabs[e.vertical === !0 ? "down" : "right"],
        onMousedownPassive: oe,
        onTouchstartPassive: oe,
        onMouseupPassive: P,
        onMouseleavePassive: P,
        onTouchendPassive: P
      })
    ]);
  }
});
let pf = 0;
const Js = ["click", "keydown"], eu = {
  icon: String,
  label: [Number, String],
  alert: [Boolean, String],
  alertIcon: String,
  name: {
    type: [Number, String],
    default: () => `t_${pf++}`
  },
  noCaps: Boolean,
  tabindex: [String, Number],
  disable: Boolean,
  contentClass: String,
  ripple: {
    type: [Boolean, Object],
    default: !0
  }
};
function tu(e, t, a, n) {
  const l = Yt(us, vt);
  if (l === vt)
    return console.error("QTab/QRouteTab component needs to be child of QTabs"), vt;
  const { proxy: o } = ye(), i = z(null), r = z(null), u = z(null), c = s(() => e.disable === !0 || e.ripple === !1 ? !1 : Object.assign({
    keyCodes: [13, 32],
    early: !0
  }, e.ripple === !0 ? {} : e.ripple)), d = s(() => l.currentModel.value === e.name), v = s(() => "q-tab relative-position self-stretch flex flex-center text-center" + (d.value === !0 ? " q-tab--active" + (l.tabProps.value.activeClass ? " " + l.tabProps.value.activeClass : "") + (l.tabProps.value.activeColor ? ` text-${l.tabProps.value.activeColor}` : "") + (l.tabProps.value.activeBgColor ? ` bg-${l.tabProps.value.activeBgColor}` : "") : " q-tab--inactive") + (e.icon && e.label && l.tabProps.value.inlineLabel === !1 ? " q-tab--full" : "") + (e.noCaps === !0 || l.tabProps.value.noCaps === !0 ? " q-tab--no-caps" : "") + (e.disable === !0 ? " disabled" : " q-focusable q-hoverable cursor-pointer") + (n !== void 0 ? n.linkClass.value : "")), b = s(() => "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " + (l.tabProps.value.inlineLabel === !0 ? "row no-wrap q-tab__content--inline" : "column") + (e.contentClass !== void 0 ? ` ${e.contentClass}` : "")), m = s(() => e.disable === !0 || l.hasFocus.value === !0 || d.value === !1 && l.hasActiveTab.value === !0 ? -1 : e.tabindex || 0);
  function g(h, w) {
    var x;
    if (w !== !0 && (h == null ? void 0 : h.qAvoidFocus) !== !0 && ((x = i.value) == null || x.focus()), e.disable === !0) {
      (n == null ? void 0 : n.hasRouterLink.value) === !0 && Ye(h);
      return;
    }
    if (n === void 0) {
      l.updateModel({ name: e.name }), a("click", h);
      return;
    }
    if (n.hasRouterLink.value === !0) {
      const L = (M = {}) => {
        let K;
        const X = M.to === void 0 || ua(M.to, e.to) === !0 ? l.avoidRouteWatcher = Un() : null;
        return n.navigateToRouterLink(h, {
          ...M,
          returnRouterError: !0
        }).catch((A) => {
          K = A;
        }).then((A) => {
          var $;
          if (X === l.avoidRouteWatcher && (l.avoidRouteWatcher = !1, K === void 0 && (A === void 0 || (($ = A.message) == null ? void 0 : $.startsWith("Avoided redundant navigation")) === !0) && l.updateModel({ name: e.name })), M.returnRouterError === !0) return K !== void 0 ? Promise.reject(K) : A;
        });
      };
      a("click", h, L), h.defaultPrevented !== !0 && L();
      return;
    }
    a("click", h);
  }
  function p(h) {
    la(h, [13, 32]) ? g(h, !0) : tn(h) !== !0 && h.keyCode >= 35 && h.keyCode <= 40 && h.altKey !== !0 && h.metaKey !== !0 && l.onKbdNavigate(h.keyCode, o.$el) === !0 && Ye(h), a("keydown", h);
  }
  function k() {
    const h = l.tabProps.value.narrowIndicator, w = [], x = f("div", {
      ref: u,
      class: ["q-tab__indicator", l.tabProps.value.indicatorClass]
    });
    e.icon !== void 0 && w.push(f(st, {
      class: "q-tab__icon",
      name: e.icon
    })), e.label !== void 0 && w.push(f("div", { class: "q-tab__label" }, e.label)), e.alert !== !1 && w.push(e.alertIcon !== void 0 ? f(st, {
      class: "q-tab__alert-icon",
      color: e.alert !== !0 ? e.alert : void 0,
      name: e.alertIcon
    }) : f("div", { class: "q-tab__alert" + (e.alert !== !0 ? ` text-${e.alert}` : "") })), h === !0 && w.push(x);
    const L = [f("div", {
      class: "q-focus-helper",
      tabindex: -1,
      ref: i
    }), f("div", { class: b.value }, $t(t.default, w))];
    return h === !1 && L.push(x), L;
  }
  const C = {
    name: s(() => e.name),
    rootRef: r,
    tabIndicatorRef: u,
    routeData: n
  };
  tt(() => {
    l.unregisterTab(C);
  }), bt(() => {
    l.registerTab(C);
  });
  function y(h, w) {
    return aa(f(h, {
      ref: r,
      class: v.value,
      tabindex: m.value,
      role: "tab",
      "aria-selected": d.value === !0 ? "true" : "false",
      "aria-disabled": e.disable === !0 ? "true" : void 0,
      onClick: g,
      onKeydown: p,
      ...w
    }, k()), [[Fl, c.value]]);
  }
  return {
    renderTab: y,
    $tabs: l
  };
}
var Dn = re({
  name: "QTab",
  props: eu,
  emits: Js,
  setup(e, { slots: t, emit: a }) {
    const { renderTab: n } = tu(e, t, a);
    return () => n("div");
  }
}), kf = re({
  name: "QTabPanels",
  props: {
    ...ci,
    ...it
  },
  emits: fi,
  setup(e, { slots: t }) {
    const a = rt(e, ye().proxy.$q), { updatePanelsList: n, getPanelContent: l, panelDirectives: o } = vi(), i = s(() => "q-tab-panels q-panel-parent" + (a.value === !0 ? " q-tab-panels--dark q-dark" : ""));
    return () => (n(t), oa("div", { class: i.value }, l(), "pan", e.swipeable, () => o.value));
  }
}), ro = re({
  name: "QTabPanel",
  props: di,
  setup(e, { slots: t }) {
    return () => f("div", {
      class: "q-tab-panel",
      role: "tabpanel"
    }, De(t.default));
  }
});
const Zi = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, Ji = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, er = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, nl = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, ll = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/, bl = {
  date: (e) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),
  time: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),
  fulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),
  timeOrFulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),
  email: (e) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),
  hexColor: (e) => Zi.test(e),
  hexaColor: (e) => Ji.test(e),
  hexOrHexaColor: (e) => er.test(e),
  rgbColor: (e) => nl.test(e),
  rgbaColor: (e) => ll.test(e),
  rgbOrRgbaColor: (e) => nl.test(e) || ll.test(e),
  hexOrRgbColor: (e) => Zi.test(e) || nl.test(e),
  hexaOrRgbaColor: (e) => Ji.test(e) || ll.test(e),
  anyColor: (e) => er.test(e) || nl.test(e) || ll.test(e)
}, Cf = /^rgb(a)?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?([01]?\.?\d*?)?\)$/;
function tr({ r: e, g: t, b: a, a: n }) {
  const l = n !== void 0;
  if (e = Math.round(e), t = Math.round(t), a = Math.round(a), e > 255 || t > 255 || a > 255 || l && n > 100) throw new TypeError("Expected 3 numbers below 256 (and optionally one below 100)");
  return n = l ? (Math.round(255 * n / 100) | 256).toString(16).slice(1) : "", "#" + (a | t << 8 | e << 16 | 1 << 24).toString(16).slice(1) + n;
}
function ar({ r: e, g: t, b: a, a: n }) {
  return `rgb${n !== void 0 ? "a" : ""}(${e},${t},${a}${n !== void 0 ? "," + n / 100 : ""})`;
}
function au(e) {
  if (typeof e != "string") throw new TypeError("Expected a string");
  e = e.replace(/^#/, ""), e.length === 3 ? e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : e.length === 4 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2] + e[3] + e[3]);
  const t = parseInt(e, 16);
  return e.length > 6 ? {
    r: t >> 24 & 255,
    g: t >> 16 & 255,
    b: t >> 8 & 255,
    a: Math.round((t & 255) / 2.55)
  } : {
    r: t >> 16,
    g: t >> 8 & 255,
    b: t & 255
  };
}
function nr({ h: e, s: t, v: a, a: n }) {
  let l, o, i;
  t = t / 100, a = a / 100, e = e / 360;
  const r = Math.floor(e * 6), u = e * 6 - r, c = a * (1 - t), d = a * (1 - u * t), v = a * (1 - (1 - u) * t);
  switch (r % 6) {
    case 0:
      l = a, o = v, i = c;
      break;
    case 1:
      l = d, o = a, i = c;
      break;
    case 2:
      l = c, o = a, i = v;
      break;
    case 3:
      l = c, o = d, i = a;
      break;
    case 4:
      l = v, o = c, i = a;
      break;
    case 5:
      l = a, o = c, i = d;
      break;
  }
  return {
    r: Math.round(l * 255),
    g: Math.round(o * 255),
    b: Math.round(i * 255),
    a: n
  };
}
function so({ r: e, g: t, b: a, a: n }) {
  const l = Math.max(e, t, a), o = Math.min(e, t, a), i = l - o, r = l === 0 ? 0 : i / l, u = l / 255;
  let c;
  switch (l) {
    case o:
      c = 0;
      break;
    case e:
      c = t - a + i * (t < a ? 6 : 0), c /= 6 * i;
      break;
    case t:
      c = a - e + i * 2, c /= 6 * i;
      break;
    case a:
      c = e - t + i * 4, c /= 6 * i;
      break;
  }
  return {
    h: Math.round(c * 360),
    s: Math.round(r * 100),
    v: Math.round(u * 100),
    a: n
  };
}
function nu(e) {
  if (typeof e != "string") throw new TypeError("Expected a string");
  const t = e.replace(/ /g, ""), a = Cf.exec(t);
  if (a === null) return au(t);
  const n = {
    r: Math.min(255, parseInt(a[2], 10)),
    g: Math.min(255, parseInt(a[3], 10)),
    b: Math.min(255, parseInt(a[4], 10))
  };
  if (a[1]) {
    const l = parseFloat(a[5]);
    n.a = Math.min(1, isNaN(l) === !0 ? 1 : l) * 100;
  }
  return n;
}
function Sf(e) {
  if (typeof e != "string" && (!e || e.r === void 0)) throw new TypeError("Expected a string or a {r, g, b} object as color");
  const t = typeof e == "string" ? nu(e) : e, a = t.r / 255, n = t.g / 255, l = t.b / 255, o = a <= 0.03928 ? a / 12.92 : ((a + 0.055) / 1.055) ** 2.4, i = n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4, r = l <= 0.03928 ? l / 12.92 : ((l + 0.055) / 1.055) ** 2.4;
  return 0.2126 * o + 0.7152 * i + 0.0722 * r;
}
const wf = [
  "rgb(255,204,204)",
  "rgb(255,230,204)",
  "rgb(255,255,204)",
  "rgb(204,255,204)",
  "rgb(204,255,230)",
  "rgb(204,255,255)",
  "rgb(204,230,255)",
  "rgb(204,204,255)",
  "rgb(230,204,255)",
  "rgb(255,204,255)",
  "rgb(255,153,153)",
  "rgb(255,204,153)",
  "rgb(255,255,153)",
  "rgb(153,255,153)",
  "rgb(153,255,204)",
  "rgb(153,255,255)",
  "rgb(153,204,255)",
  "rgb(153,153,255)",
  "rgb(204,153,255)",
  "rgb(255,153,255)",
  "rgb(255,102,102)",
  "rgb(255,179,102)",
  "rgb(255,255,102)",
  "rgb(102,255,102)",
  "rgb(102,255,179)",
  "rgb(102,255,255)",
  "rgb(102,179,255)",
  "rgb(102,102,255)",
  "rgb(179,102,255)",
  "rgb(255,102,255)",
  "rgb(255,51,51)",
  "rgb(255,153,51)",
  "rgb(255,255,51)",
  "rgb(51,255,51)",
  "rgb(51,255,153)",
  "rgb(51,255,255)",
  "rgb(51,153,255)",
  "rgb(51,51,255)",
  "rgb(153,51,255)",
  "rgb(255,51,255)",
  "rgb(255,0,0)",
  "rgb(255,128,0)",
  "rgb(255,255,0)",
  "rgb(0,255,0)",
  "rgb(0,255,128)",
  "rgb(0,255,255)",
  "rgb(0,128,255)",
  "rgb(0,0,255)",
  "rgb(128,0,255)",
  "rgb(255,0,255)",
  "rgb(245,0,0)",
  "rgb(245,123,0)",
  "rgb(245,245,0)",
  "rgb(0,245,0)",
  "rgb(0,245,123)",
  "rgb(0,245,245)",
  "rgb(0,123,245)",
  "rgb(0,0,245)",
  "rgb(123,0,245)",
  "rgb(245,0,245)",
  "rgb(214,0,0)",
  "rgb(214,108,0)",
  "rgb(214,214,0)",
  "rgb(0,214,0)",
  "rgb(0,214,108)",
  "rgb(0,214,214)",
  "rgb(0,108,214)",
  "rgb(0,0,214)",
  "rgb(108,0,214)",
  "rgb(214,0,214)",
  "rgb(163,0,0)",
  "rgb(163,82,0)",
  "rgb(163,163,0)",
  "rgb(0,163,0)",
  "rgb(0,163,82)",
  "rgb(0,163,163)",
  "rgb(0,82,163)",
  "rgb(0,0,163)",
  "rgb(82,0,163)",
  "rgb(163,0,163)",
  "rgb(92,0,0)",
  "rgb(92,46,0)",
  "rgb(92,92,0)",
  "rgb(0,92,0)",
  "rgb(0,92,46)",
  "rgb(0,92,92)",
  "rgb(0,46,92)",
  "rgb(0,0,92)",
  "rgb(46,0,92)",
  "rgb(92,0,92)",
  "rgb(255,255,255)",
  "rgb(205,205,205)",
  "rgb(178,178,178)",
  "rgb(153,153,153)",
  "rgb(127,127,127)",
  "rgb(102,102,102)",
  "rgb(76,76,76)",
  "rgb(51,51,51)",
  "rgb(25,25,25)",
  "rgb(0,0,0)"
], lr = "M5 5 h10 v10 h-10 v-10 z", xf = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2NkYGAwZkAFZ5G5jPRRgOYEVDeB3EBjBQBOZwTVugIGyAAAAABJRU5ErkJggg==";
var _f = re({
  name: "QColor",
  props: {
    ...it,
    ...ra,
    modelValue: String,
    defaultValue: String,
    defaultView: {
      type: String,
      default: "spectrum",
      validator: (e) => [
        "spectrum",
        "tune",
        "palette"
      ].includes(e)
    },
    formatModel: {
      type: String,
      default: "auto",
      validator: (e) => [
        "auto",
        "hex",
        "rgb",
        "hexa",
        "rgba"
      ].includes(e)
    },
    palette: Array,
    noHeader: Boolean,
    noHeaderTabs: Boolean,
    noFooter: Boolean,
    square: Boolean,
    flat: Boolean,
    bordered: Boolean,
    disable: Boolean,
    readonly: Boolean
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const { proxy: a } = ye(), { $q: n } = a, l = rt(e, n), { getCache: o } = Jn(), i = z(null), r = z(null), u = s(() => e.formatModel === "auto" ? null : e.formatModel.indexOf("hex") !== -1), c = s(() => e.formatModel === "auto" ? null : e.formatModel.indexOf("a") !== -1), d = z(e.formatModel === "auto" ? e.modelValue === void 0 || e.modelValue === null || e.modelValue === "" || e.modelValue.startsWith("#") ? "hex" : "rgb" : e.formatModel.startsWith("hex") ? "hex" : "rgb"), v = z(e.defaultView), b = z($(e.modelValue || e.defaultValue)), m = s(() => e.disable !== !0 && e.readonly !== !0), g = s(() => e.modelValue === void 0 || e.modelValue === null || e.modelValue === "" || e.modelValue.startsWith("#")), p = s(() => u.value !== null ? u.value : g.value), k = Ra(s(() => ({
      type: "hidden",
      name: e.name,
      value: b.value[p.value === !0 ? "hex" : "rgb"]
    }))), C = s(() => c.value !== null ? c.value : b.value.a !== void 0), y = s(() => ({ backgroundColor: b.value.rgb || "#000" })), h = s(() => `q-color-picker__header-content q-color-picker__header-content--${b.value.a !== void 0 && b.value.a < 65 || Sf(b.value) > 0.4 ? "light" : "dark"}`), w = s(() => ({ background: `hsl(${b.value.h},100%,50%)` })), x = s(() => ({
      top: `${100 - b.value.v}%`,
      [n.lang.rtl === !0 ? "right" : "left"]: `${b.value.s}%`
    })), L = s(() => e.palette !== void 0 && e.palette.length !== 0 ? e.palette : wf), M = s(() => "q-color-picker" + (e.bordered === !0 ? " q-color-picker--bordered" : "") + (e.square === !0 ? " q-color-picker--square no-border-radius" : "") + (e.flat === !0 ? " q-color-picker--flat no-shadow" : "") + (e.disable === !0 ? " disabled" : "") + (l.value === !0 ? " q-color-picker--dark q-dark" : "")), K = s(() => e.disable === !0 ? { "aria-disabled": "true" } : {}), X = s(() => [[
      ta,
      Q,
      void 0,
      {
        prevent: !0,
        stop: !0,
        mouse: !0
      }
    ]]);
    se(() => e.modelValue, (W) => {
      const be = $(W || e.defaultValue);
      be.hex !== b.value.hex && (b.value = be);
    }), se(() => e.defaultValue, (W) => {
      if (!e.modelValue && W) {
        const be = $(W);
        be.hex !== b.value.hex && (b.value = be);
      }
    });
    function A(W, be) {
      b.value.hex = tr(W), b.value.rgb = ar(W), b.value.r = W.r, b.value.g = W.g, b.value.b = W.b, b.value.a = W.a;
      const _e = b.value[p.value === !0 ? "hex" : "rgb"];
      t("update:modelValue", _e), be === !0 && t("change", _e);
    }
    function $(W) {
      const be = c.value !== void 0 ? c.value : e.formatModel === "auto" ? null : e.formatModel.indexOf("a") !== -1;
      if (typeof W != "string" || W.length === 0 || bl.anyColor(W.replace(/ /g, "")) !== !0) return {
        h: 0,
        s: 0,
        v: 0,
        r: 0,
        g: 0,
        b: 0,
        a: be === !0 ? 100 : void 0,
        hex: void 0,
        rgb: void 0
      };
      const _e = nu(W);
      return be === !0 && _e.a === void 0 && (_e.a = 100), _e.hex = tr(_e), _e.rgb = ar(_e), Object.assign(_e, so(_e));
    }
    function D(W, be, _e) {
      const we = i.value;
      if (we === null) return;
      const Ie = we.clientWidth, Ce = we.clientHeight, Me = we.getBoundingClientRect();
      let Le = Math.min(Ie, Math.max(0, W - Me.left));
      n.lang.rtl === !0 && (Le = Ie - Le);
      const ot = Math.min(Ce, Math.max(0, be - Me.top)), We = Math.round(100 * Le / Ie), ue = Math.round(100 * Math.max(0, Math.min(1, -(ot / Ce) + 1))), ie = nr({
        h: b.value.h,
        s: We,
        v: ue,
        a: C.value === !0 ? b.value.a : void 0
      });
      b.value.s = We, b.value.v = ue, A(ie, _e);
    }
    function _(W, be) {
      const _e = Math.round(W), we = nr({
        h: _e,
        s: b.value.s,
        v: b.value.v,
        a: C.value === !0 ? b.value.a : void 0
      });
      b.value.h = _e, A(we, be);
    }
    function S(W) {
      _(W, !0);
    }
    function T(W, be, _e, we, Ie) {
      if (we !== void 0 && wt(we), !/^[0-9]+$/.test(W)) {
        Ie === !0 && a.$forceUpdate();
        return;
      }
      const Ce = Math.floor(Number(W));
      if (Ce < 0 || Ce > _e) {
        Ie === !0 && a.$forceUpdate();
        return;
      }
      const Me = {
        r: be === "r" ? Ce : b.value.r,
        g: be === "g" ? Ce : b.value.g,
        b: be === "b" ? Ce : b.value.b,
        a: C.value === !0 ? be === "a" ? Ce : b.value.a : void 0
      };
      if (be !== "a") {
        const Le = so(Me);
        b.value.h = Le.h, b.value.s = Le.s, b.value.v = Le.v;
      }
      if (A(Me, Ie), Ie !== !0 && (we == null ? void 0 : we.target.selectionEnd) !== void 0) {
        const Le = we.target.selectionEnd;
        nt(() => {
          we.target.setSelectionRange(Le, Le);
        });
      }
    }
    function H(W, be) {
      let _e;
      const we = W.target.value;
      if (wt(W), d.value === "hex") {
        if (we.length !== (C.value === !0 ? 9 : 7) || !/^#[0-9A-Fa-f]+$/.test(we)) return !0;
        _e = au(we);
      } else {
        let Ce;
        if (we.endsWith(")")) if (C.value !== !0 && we.startsWith("rgb(")) {
          if (Ce = we.substring(4, we.length - 1).split(",").map((Me) => parseInt(Me, 10)), Ce.length !== 3 || !/^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/.test(we)) return !0;
        } else if (C.value === !0 && we.startsWith("rgba(")) {
          if (Ce = we.substring(5, we.length - 1).split(","), Ce.length !== 4 || !/^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/.test(we)) return !0;
          for (let Le = 0; Le < 3; Le++) {
            const ot = parseInt(Ce[Le], 10);
            if (ot < 0 || ot > 255) return !0;
            Ce[Le] = ot;
          }
          const Me = parseFloat(Ce[3]);
          if (Me < 0 || Me > 1) return !0;
          Ce[3] = Me;
        } else return !0;
        else return !0;
        if (Ce[0] < 0 || Ce[0] > 255 || Ce[1] < 0 || Ce[1] > 255 || Ce[2] < 0 || Ce[2] > 255 || C.value === !0 && (Ce[3] < 0 || Ce[3] > 1)) return !0;
        _e = {
          r: Ce[0],
          g: Ce[1],
          b: Ce[2],
          a: C.value === !0 ? Ce[3] * 100 : void 0
        };
      }
      const Ie = so(_e);
      if (b.value.h = Ie.h, b.value.s = Ie.s, b.value.v = Ie.v, A(_e, be), be !== !0) {
        const Ce = W.target.selectionEnd;
        nt(() => {
          W.target.setSelectionRange(Ce, Ce);
        });
      }
    }
    function E(W) {
      const be = $(W), _e = {
        r: be.r,
        g: be.g,
        b: be.b,
        a: be.a
      };
      _e.a === void 0 && (_e.a = b.value.a), b.value.h = be.h, b.value.s = be.s, b.value.v = be.v, A(_e, !0);
    }
    function Q(W) {
      W.isFinal ? D(W.position.left, W.position.top, !0) : j(W);
    }
    const j = Cs((W) => {
      D(W.position.left, W.position.top);
    }, 20);
    function N(W) {
      D(W.pageX - window.pageXOffset, W.pageY - window.pageYOffset, !0);
    }
    function Z(W) {
      D(W.pageX - window.pageXOffset, W.pageY - window.pageYOffset);
    }
    function B(W) {
      r.value !== null && (r.value.$el.style.opacity = W ? 1 : 0);
    }
    function G(W) {
      d.value = W;
    }
    function V() {
      const W = [];
      return e.noHeaderTabs !== !0 && W.push(f(Gi, {
        class: "q-color-picker__header-tabs",
        modelValue: d.value,
        dense: !0,
        align: "justify",
        "onUpdate:modelValue": G
      }, () => [f(Dn, {
        label: "HEX" + (C.value === !0 ? "A" : ""),
        name: "hex",
        ripple: !1
      }), f(Dn, {
        label: "RGB" + (C.value === !0 ? "A" : ""),
        name: "rgb",
        ripple: !1
      })])), W.push(f("div", { class: "q-color-picker__header-banner row flex-center no-wrap" }, [f("input", {
        class: "fit",
        value: b.value[d.value],
        ...m.value !== !0 ? { readonly: !0 } : {},
        ...o("topIn", {
          onInput: (be) => {
            B(H(be) === !0);
          },
          onChange: wt,
          onBlur: (be) => {
            H(be, !0) === !0 && a.$forceUpdate(), B(!1);
          }
        })
      }), f(st, {
        ref: r,
        class: "q-color-picker__error-icon absolute no-pointer-events",
        name: n.iconSet.type.negative
      })])), f("div", { class: "q-color-picker__header relative-position overflow-hidden" }, [f("div", { class: "q-color-picker__header-bg absolute-full" }), f("div", {
        class: h.value,
        style: y.value
      }, W)]);
    }
    function oe() {
      return f(kf, {
        modelValue: v.value,
        animated: !0
      }, () => [
        f(ro, {
          class: "q-color-picker__spectrum-tab overflow-hidden",
          name: "spectrum"
        }, de),
        f(ro, {
          class: "q-pa-md q-color-picker__tune-tab",
          name: "tune"
        }, Y),
        f(ro, {
          class: "q-color-picker__palette-tab",
          name: "palette"
        }, fe)
      ]);
    }
    function P(W) {
      v.value = W;
    }
    function I() {
      return f("div", { class: "q-color-picker__footer relative-position overflow-hidden" }, [f(Gi, {
        class: "absolute-full",
        modelValue: v.value,
        dense: !0,
        align: "justify",
        "onUpdate:modelValue": P
      }, () => [
        f(Dn, {
          icon: n.iconSet.colorPicker.spectrum,
          name: "spectrum",
          ripple: !1
        }),
        f(Dn, {
          icon: n.iconSet.colorPicker.tune,
          name: "tune",
          ripple: !1
        }),
        f(Dn, {
          icon: n.iconSet.colorPicker.palette,
          name: "palette",
          ripple: !1
        })
      ])]);
    }
    function de() {
      const W = {
        ref: i,
        class: "q-color-picker__spectrum non-selectable relative-position cursor-pointer" + (m.value !== !0 ? " readonly" : ""),
        style: w.value,
        ...m.value === !0 ? {
          onClick: N,
          onMousedown: Z
        } : {}
      }, be = [
        f("div", { style: { paddingBottom: "100%" } }),
        f("div", { class: "q-color-picker__spectrum-white absolute-full" }),
        f("div", { class: "q-color-picker__spectrum-black absolute-full" }),
        f("div", {
          class: "absolute",
          style: x.value
        }, [b.value.hex !== void 0 ? f("div", { class: "q-color-picker__spectrum-circle" }) : null])
      ], _e = [f(Ha, {
        class: "q-color-picker__hue non-selectable",
        modelValue: b.value.h,
        min: 0,
        max: 360,
        trackSize: "8px",
        innerTrackColor: "transparent",
        selectionColor: "transparent",
        readonly: m.value !== !0,
        thumbPath: lr,
        "onUpdate:modelValue": _,
        onChange: S
      })];
      return C.value === !0 && _e.push(f(Ha, {
        class: "q-color-picker__alpha non-selectable",
        modelValue: b.value.a,
        min: 0,
        max: 100,
        trackSize: "8px",
        trackColor: "white",
        innerTrackColor: "transparent",
        selectionColor: "transparent",
        trackImg: xf,
        readonly: m.value !== !0,
        hideSelection: !0,
        thumbPath: lr,
        ...o("alphaSlide", {
          "onUpdate:modelValue": (we) => T(we, "a", 100),
          onChange: (we) => T(we, "a", 100, void 0, !0)
        })
      })), [oa("div", W, be, "spec", m.value, () => X.value), f("div", { class: "q-color-picker__sliders" }, _e)];
    }
    function Y() {
      return [
        f("div", { class: "row items-center no-wrap" }, [
          f("div", "R"),
          f(Ha, {
            modelValue: b.value.r,
            min: 0,
            max: 255,
            color: "red",
            dark: l.value,
            readonly: m.value !== !0,
            ...o("rSlide", {
              "onUpdate:modelValue": (W) => T(W, "r", 255),
              onChange: (W) => T(W, "r", 255, void 0, !0)
            })
          }),
          f("input", {
            value: b.value.r,
            maxlength: 3,
            readonly: m.value !== !0,
            onChange: wt,
            ...o("rIn", {
              onInput: (W) => T(W.target.value, "r", 255, W),
              onBlur: (W) => T(W.target.value, "r", 255, W, !0)
            })
          })
        ]),
        f("div", { class: "row items-center no-wrap" }, [
          f("div", "G"),
          f(Ha, {
            modelValue: b.value.g,
            min: 0,
            max: 255,
            color: "green",
            dark: l.value,
            readonly: m.value !== !0,
            ...o("gSlide", {
              "onUpdate:modelValue": (W) => T(W, "g", 255),
              onChange: (W) => T(W, "g", 255, void 0, !0)
            })
          }),
          f("input", {
            value: b.value.g,
            maxlength: 3,
            readonly: m.value !== !0,
            onChange: wt,
            ...o("gIn", {
              onInput: (W) => T(W.target.value, "g", 255, W),
              onBlur: (W) => T(W.target.value, "g", 255, W, !0)
            })
          })
        ]),
        f("div", { class: "row items-center no-wrap" }, [
          f("div", "B"),
          f(Ha, {
            modelValue: b.value.b,
            min: 0,
            max: 255,
            color: "blue",
            readonly: m.value !== !0,
            dark: l.value,
            ...o("bSlide", {
              "onUpdate:modelValue": (W) => T(W, "b", 255),
              onChange: (W) => T(W, "b", 255, void 0, !0)
            })
          }),
          f("input", {
            value: b.value.b,
            maxlength: 3,
            readonly: m.value !== !0,
            onChange: wt,
            ...o("bIn", {
              onInput: (W) => T(W.target.value, "b", 255, W),
              onBlur: (W) => T(W.target.value, "b", 255, W, !0)
            })
          })
        ]),
        C.value === !0 ? f("div", { class: "row items-center no-wrap" }, [
          f("div", "A"),
          f(Ha, {
            modelValue: b.value.a,
            color: "grey",
            readonly: m.value !== !0,
            dark: l.value,
            ...o("aSlide", {
              "onUpdate:modelValue": (W) => T(W, "a", 100),
              onChange: (W) => T(W, "a", 100, void 0, !0)
            })
          }),
          f("input", {
            value: b.value.a,
            maxlength: 3,
            readonly: m.value !== !0,
            onChange: wt,
            ...o("aIn", {
              onInput: (W) => T(W.target.value, "a", 100, W),
              onBlur: (W) => T(W.target.value, "a", 100, W, !0)
            })
          })
        ]) : null
      ];
    }
    function fe() {
      const W = (be) => f("div", {
        class: "q-color-picker__cube col-auto",
        style: { backgroundColor: be },
        ...m.value === !0 ? o("palette#" + be, { onClick: () => {
          E(be);
        } }) : {}
      });
      return [f("div", { class: "row items-center q-color-picker__palette-rows" + (m.value === !0 ? " q-color-picker__palette-rows--editable" : "") }, L.value.map(W))];
    }
    return () => {
      const W = [oe()];
      return e.name !== void 0 && e.disable !== !0 && k(W, "push"), e.noHeader !== !0 && W.unshift(V()), e.noFooter !== !0 && W.push(I()), f("div", {
        class: M.value,
        ...K.value
      }, W);
    };
  }
});
const Ma = [
  -61,
  9,
  38,
  199,
  426,
  686,
  756,
  818,
  1111,
  1181,
  1210,
  1635,
  2060,
  2097,
  2192,
  2262,
  2324,
  2394,
  2456,
  3178
];
function $f(e, t, a) {
  return Object.prototype.toString.call(e) === "[object Date]" && (a = e.getDate(), t = e.getMonth() + 1, e = e.getFullYear()), Mf(ki(e, t, a));
}
function or(e, t, a) {
  return ou(Tf(e, t, a));
}
function qf(e) {
  return Bf(e) === 0;
}
function yl(e, t) {
  return t <= 6 ? 31 : t <= 11 || qf(e) ? 30 : 29;
}
function Bf(e) {
  const t = Ma.length;
  let a = Ma[0], n, l, o, i, r;
  if (e < a || e >= Ma[t - 1]) throw new Error("Invalid Jalaali year " + e);
  for (r = 1; r < t && (n = Ma[r], l = n - a, !(e < n)); r += 1)
    a = n;
  return i = e - a, l - i < 6 && (i = i - l + kt(l + 4, 33) * 33), o = Gt(Gt(i + 1, 33) - 1, 4), o === -1 && (o = 4), o;
}
function lu(e, t) {
  const a = Ma.length, n = e + 621;
  let l = -14, o = Ma[0], i, r, u, c, d;
  if (e < o || e >= Ma[a - 1]) throw new Error("Invalid Jalaali year " + e);
  for (d = 1; d < a && (i = Ma[d], r = i - o, !(e < i)); d += 1)
    l = l + kt(r, 33) * 8 + kt(Gt(r, 33), 4), o = i;
  c = e - o, l = l + kt(c, 33) * 8 + kt(Gt(c, 33) + 3, 4), Gt(r, 33) === 4 && r - c === 4 && (l += 1);
  const v = kt(n, 4) - kt((kt(n, 100) + 1) * 3, 4) - 150, b = 20 + l - v;
  return t || (r - c < 6 && (c = c - r + kt(r + 4, 33) * 33), u = Gt(Gt(c + 1, 33) - 1, 4), u === -1 && (u = 4)), {
    leap: u,
    gy: n,
    march: b
  };
}
function Tf(e, t, a) {
  const n = lu(e, !0);
  return ki(n.gy, 3, n.march) + (t - 1) * 31 - kt(t, 7) * (t - 7) + a - 1;
}
function Mf(e) {
  const t = ou(e).gy;
  let a = t - 621, n, l, o;
  const i = lu(a, !1);
  if (o = e - ki(t, 3, i.march), o >= 0) {
    if (o <= 185)
      return l = 1 + kt(o, 31), n = Gt(o, 31) + 1, {
        jy: a,
        jm: l,
        jd: n
      };
    o -= 186;
  } else
    a -= 1, o += 179, i.leap === 1 && (o += 1);
  return l = 7 + kt(o, 30), n = Gt(o, 30) + 1, {
    jy: a,
    jm: l,
    jd: n
  };
}
function ki(e, t, a) {
  let n = kt((e + kt(t - 8, 6) + 100100) * 1461, 4) + kt(153 * Gt(t + 9, 12) + 2, 5) + a - 34840408;
  return n = n - kt(kt(e + 100100 + kt(t - 8, 6), 100) * 3, 4) + 752, n;
}
function ou(e) {
  let t = 4 * e + 139361631;
  t = t + kt(kt(4 * e + 183187720, 146097) * 3, 4) * 4 - 3908;
  const a = kt(Gt(t, 1461), 4) * 5 + 308, n = kt(Gt(a, 153), 5) + 1, l = Gt(kt(a, 153), 12) + 1;
  return {
    gy: kt(t, 1461) - 100100 + kt(8 - l, 6),
    gm: l,
    gd: n
  };
}
function kt(e, t) {
  return ~~(e / t);
}
function Gt(e, t) {
  return e - ~~(e / t) * t;
}
const Af = ["gregorian", "persian"], Al = {
  mask: { type: String },
  locale: Object,
  calendar: {
    type: String,
    validator: (e) => Af.includes(e),
    default: "gregorian"
  },
  landscape: Boolean,
  color: String,
  textColor: String,
  square: Boolean,
  flat: Boolean,
  bordered: Boolean,
  readonly: Boolean,
  disable: Boolean
}, iu = ["update:modelValue"];
function ya(e) {
  return e.year + "/" + ct(e.month) + "/" + ct(e.day);
}
function ru(e, t) {
  const a = s(() => e.disable !== !0 && e.readonly !== !0), n = s(() => a.value === !0 ? 0 : -1), l = s(() => {
    const r = [];
    return e.color !== void 0 && r.push(`bg-${e.color}`), e.textColor !== void 0 && r.push(`text-${e.textColor}`), r.join(" ");
  });
  function o() {
    return e.locale !== void 0 ? {
      ...t.lang.date,
      ...e.locale
    } : t.lang.date;
  }
  function i(r) {
    const u = /* @__PURE__ */ new Date(), c = r === !0 ? null : 0;
    if (e.calendar === "persian") {
      const d = $f(u);
      return {
        year: d.jy,
        month: d.jm,
        day: d.jd
      };
    }
    return {
      year: u.getFullYear(),
      month: u.getMonth() + 1,
      day: u.getDate(),
      hour: c,
      minute: c,
      second: c,
      millisecond: c
    };
  }
  return {
    editable: a,
    tabindex: n,
    headerClass: l,
    getLocale: o,
    getCurrentDate: i
  };
}
const su = 864e5, Df = 36e5, Io = 6e4, uu = "YYYY-MM-DDTHH:mm:ss.SSSZ", Lf = /\[((?:[^\]\\]|\\]|\\)*)\]|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, zf = /(\[[^\]]*\])|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, uo = {};
function Vf(e, t) {
  const a = "(" + t.days.join("|") + ")", n = e + a;
  if (uo[n] !== void 0) return uo[n];
  const l = "(" + t.daysShort.join("|") + ")", o = "(" + t.months.join("|") + ")", i = "(" + t.monthsShort.join("|") + ")", r = {};
  let u = 0;
  const c = e.replace(zf, (v) => {
    switch (u++, v) {
      case "YY":
        return r.YY = u, "(-?\\d{1,2})";
      case "YYYY":
        return r.YYYY = u, "(-?\\d{1,4})";
      case "M":
        return r.M = u, "(\\d{1,2})";
      case "Mo":
        return r.M = u++, "(\\d{1,2}(st|nd|rd|th))";
      case "MM":
        return r.M = u, "(\\d{2})";
      case "MMM":
        return r.MMM = u, i;
      case "MMMM":
        return r.MMMM = u, o;
      case "D":
        return r.D = u, "(\\d{1,2})";
      case "Do":
        return r.D = u++, "(\\d{1,2}(st|nd|rd|th))";
      case "DD":
        return r.D = u, "(\\d{2})";
      case "H":
        return r.H = u, "(\\d{1,2})";
      case "HH":
        return r.H = u, "(\\d{2})";
      case "h":
        return r.h = u, "(\\d{1,2})";
      case "hh":
        return r.h = u, "(\\d{2})";
      case "m":
        return r.m = u, "(\\d{1,2})";
      case "mm":
        return r.m = u, "(\\d{2})";
      case "s":
        return r.s = u, "(\\d{1,2})";
      case "ss":
        return r.s = u, "(\\d{2})";
      case "S":
        return r.S = u, "(\\d{1})";
      case "SS":
        return r.S = u, "(\\d{2})";
      case "SSS":
        return r.S = u, "(\\d{3})";
      case "A":
        return r.A = u, "(AM|PM)";
      case "a":
        return r.a = u, "(am|pm)";
      case "aa":
        return r.aa = u, "(a\\.m\\.|p\\.m\\.)";
      case "ddd":
        return l;
      case "dddd":
        return a;
      case "Q":
      case "d":
      case "E":
        return "(\\d{1})";
      case "do":
        return u++, "(\\d{1}(st|nd|rd|th))";
      case "Qo":
        return "(1st|2nd|3rd|4th)";
      case "DDD":
      case "DDDD":
        return "(\\d{1,3})";
      case "DDDo":
        return u++, "(\\d{1,3}(st|nd|rd|th))";
      case "w":
        return "(\\d{1,2})";
      case "wo":
        return u++, "(\\d{1,2}(st|nd|rd|th))";
      case "ww":
        return "(\\d{2})";
      case "Z":
        return r.Z = u, "(Z|[+-]\\d{2}:\\d{2})";
      case "ZZ":
        return r.ZZ = u, "(Z|[+-]\\d{2}\\d{2})";
      case "X":
        return r.X = u, "(-?\\d+)";
      case "x":
        return r.x = u, "(-?\\d{4,})";
      default:
        return u--, v[0] === "[" && (v = v.substring(1, v.length - 1)), v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  }), d = {
    map: r,
    regex: new RegExp("^" + c)
  };
  return uo[n] = d, d;
}
function du(e, t) {
  return e !== void 0 ? e : t !== void 0 ? t.date : Mo.date;
}
function ir(e, t = "") {
  const a = e > 0 ? "-" : "+", n = Math.abs(e), l = Math.floor(n / 60), o = n % 60;
  return a + ct(l) + t + ct(o);
}
function Pn(e, t, a, n, l) {
  const o = {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timezoneOffset: null,
    dateHash: null,
    timeHash: null
  };
  if (l !== void 0 && Object.assign(o, l), e == null || e === "" || typeof e != "string") return o;
  t === void 0 && (t = uu);
  const i = du(a, Ta.props), r = i.months, u = i.monthsShort, { regex: c, map: d } = Vf(t, i), v = e.match(c);
  if (v === null) return o;
  let b = "";
  if (d.X !== void 0 || d.x !== void 0) {
    const m = parseInt(v[d.X !== void 0 ? d.X : d.x], 10);
    if (isNaN(m) === !0 || m < 0) return o;
    const g = /* @__PURE__ */ new Date(m * (d.X !== void 0 ? 1e3 : 1));
    o.year = g.getFullYear(), o.month = g.getMonth() + 1, o.day = g.getDate(), o.hour = g.getHours(), o.minute = g.getMinutes(), o.second = g.getSeconds(), o.millisecond = g.getMilliseconds();
  } else {
    if (d.YYYY !== void 0) o.year = parseInt(v[d.YYYY], 10);
    else if (d.YY !== void 0) {
      const m = parseInt(v[d.YY], 10);
      o.year = m < 0 ? m : 2e3 + m;
    }
    if (d.M !== void 0) {
      if (o.month = parseInt(v[d.M], 10), o.month < 1 || o.month > 12) return o;
    } else d.MMM !== void 0 ? o.month = u.indexOf(v[d.MMM]) + 1 : d.MMMM !== void 0 && (o.month = r.indexOf(v[d.MMMM]) + 1);
    if (d.D !== void 0) {
      if (o.day = parseInt(v[d.D], 10), o.year === null || o.month === null || o.day < 1) return o;
      const m = n !== "persian" ? new Date(o.year, o.month, 0).getDate() : yl(o.year, o.month);
      if (o.day > m) return o;
    }
    d.H !== void 0 ? o.hour = parseInt(v[d.H], 10) % 24 : d.h !== void 0 && (o.hour = parseInt(v[d.h], 10) % 12, (d.A && v[d.A] === "PM" || d.a && v[d.a] === "pm" || d.aa && v[d.aa] === "p.m.") && (o.hour += 12), o.hour = o.hour % 24), d.m !== void 0 && (o.minute = parseInt(v[d.m], 10) % 60), d.s !== void 0 && (o.second = parseInt(v[d.s], 10) % 60), d.S !== void 0 && (o.millisecond = parseInt(v[d.S], 10) * 10 ** (3 - v[d.S].length)), (d.Z !== void 0 || d.ZZ !== void 0) && (b = d.Z !== void 0 ? v[d.Z].replace(":", "") : v[d.ZZ], o.timezoneOffset = (b[0] === "+" ? -1 : 1) * (60 * b.slice(1, 3) + Number(b.slice(3, 5))));
  }
  return o.dateHash = ct(o.year, 4) + "/" + ct(o.month) + "/" + ct(o.day), o.timeHash = ct(o.hour) + ":" + ct(o.minute) + ":" + ct(o.second) + b, o;
}
function co(e) {
  const t = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  t.setDate(t.getDate() - (t.getDay() + 6) % 7 + 3);
  const a = new Date(t.getFullYear(), 0, 4);
  a.setDate(a.getDate() - (a.getDay() + 6) % 7 + 3);
  const n = t.getTimezoneOffset() - a.getTimezoneOffset();
  t.setHours(t.getHours() - n);
  const l = (t - a) / (su * 7);
  return 1 + Math.floor(l);
}
function pa(e, t, a) {
  const n = new Date(e), l = `set${a === !0 ? "UTC" : ""}`;
  switch (t) {
    case "year":
    case "years":
      n[`${l}Month`](0);
    case "month":
    case "months":
      n[`${l}Date`](1);
    case "day":
    case "days":
    case "date":
      n[`${l}Hours`](0);
    case "hour":
    case "hours":
      n[`${l}Minutes`](0);
    case "minute":
    case "minutes":
      n[`${l}Seconds`](0);
    case "second":
    case "seconds":
      n[`${l}Milliseconds`](0);
  }
  return n;
}
function ol(e, t, a) {
  return (e.getTime() - e.getTimezoneOffset() * Io - (t.getTime() - t.getTimezoneOffset() * Io)) / a;
}
function cu(e, t, a = "days") {
  const n = new Date(e), l = new Date(t);
  switch (a) {
    case "years":
    case "year":
      return n.getFullYear() - l.getFullYear();
    case "months":
    case "month":
      return (n.getFullYear() - l.getFullYear()) * 12 + n.getMonth() - l.getMonth();
    case "days":
    case "day":
    case "date":
      return ol(pa(n, "day"), pa(l, "day"), su);
    case "hours":
    case "hour":
      return ol(pa(n, "hour"), pa(l, "hour"), Df);
    case "minutes":
    case "minute":
      return ol(pa(n, "minute"), pa(l, "minute"), Io);
    case "seconds":
    case "second":
      return ol(pa(n, "second"), pa(l, "second"), 1e3);
  }
}
function fo(e) {
  return cu(e, pa(e, "year"), "days") + 1;
}
function sn(e) {
  if (e >= 11 && e <= 13) return `${e}th`;
  switch (e % 10) {
    case 1:
      return `${e}st`;
    case 2:
      return `${e}nd`;
    case 3:
      return `${e}rd`;
  }
  return `${e}th`;
}
const rr = {
  YY(e, t, a) {
    const n = this.YYYY(e, t, a) % 100;
    return n >= 0 ? ct(n) : "-" + ct(Math.abs(n));
  },
  YYYY(e, t, a) {
    return a ?? e.getFullYear();
  },
  M(e) {
    return e.getMonth() + 1;
  },
  Mo(e) {
    return sn(e.getMonth() + 1);
  },
  MM(e) {
    return ct(e.getMonth() + 1);
  },
  MMM(e, t) {
    return t.monthsShort[e.getMonth()];
  },
  MMMM(e, t) {
    return t.months[e.getMonth()];
  },
  Q(e) {
    return Math.ceil((e.getMonth() + 1) / 3);
  },
  Qo(e) {
    return sn(this.Q(e));
  },
  D(e) {
    return e.getDate();
  },
  Do(e) {
    return sn(e.getDate());
  },
  DD(e) {
    return ct(e.getDate());
  },
  DDD(e) {
    return fo(e);
  },
  DDDo(e) {
    return sn(fo(e));
  },
  DDDD(e) {
    return ct(fo(e), 3);
  },
  d(e) {
    return e.getDay();
  },
  do(e) {
    return sn(e.getDay());
  },
  dd(e, t) {
    return t.days[e.getDay()].slice(0, 2);
  },
  ddd(e, t) {
    return t.daysShort[e.getDay()];
  },
  dddd(e, t) {
    return t.days[e.getDay()];
  },
  E(e) {
    return e.getDay() || 7;
  },
  w(e) {
    return co(e);
  },
  wo(e) {
    return sn(co(e));
  },
  ww(e) {
    return ct(co(e));
  },
  H(e) {
    return e.getHours();
  },
  HH(e) {
    return ct(e.getHours());
  },
  h(e) {
    const t = e.getHours();
    return t === 0 ? 12 : t > 12 ? t % 12 : t;
  },
  hh(e) {
    return ct(this.h(e));
  },
  m(e) {
    return e.getMinutes();
  },
  mm(e) {
    return ct(e.getMinutes());
  },
  s(e) {
    return e.getSeconds();
  },
  ss(e) {
    return ct(e.getSeconds());
  },
  S(e) {
    return Math.floor(e.getMilliseconds() / 100);
  },
  SS(e) {
    return ct(Math.floor(e.getMilliseconds() / 10));
  },
  SSS(e) {
    return ct(e.getMilliseconds(), 3);
  },
  A(e) {
    return e.getHours() < 12 ? "AM" : "PM";
  },
  a(e) {
    return e.getHours() < 12 ? "am" : "pm";
  },
  aa(e) {
    return e.getHours() < 12 ? "a.m." : "p.m.";
  },
  Z(e, t, a, n) {
    return ir(n ?? e.getTimezoneOffset(), ":");
  },
  ZZ(e, t, a, n) {
    return ir(n ?? e.getTimezoneOffset());
  },
  X(e) {
    return Math.floor(e.getTime() / 1e3);
  },
  x(e) {
    return e.getTime();
  }
};
function fu(e, t, a, n, l) {
  if (e !== 0 && !e || e === 1 / 0 || e === -1 / 0) return;
  const o = new Date(e);
  if (isNaN(o)) return;
  t === void 0 && (t = uu);
  const i = du(a, Ta.props);
  return t.replace(Lf, (r, u) => r in rr ? rr[r](o, i, n, l) : u === void 0 ? r : u.split("\\]").join("]"));
}
const ha = 20, Pf = [
  "Calendar",
  "Years",
  "Months"
], sr = (e) => Pf.includes(e), vo = (e) => /^-?[\d]+\/[0-1]\d$/.test(e), un = " — ";
function $a(e) {
  return e.year + "/" + ct(e.month);
}
var Rf = re({
  name: "QDate",
  props: {
    ...Al,
    ...ra,
    ...it,
    modelValue: {
      required: !0,
      validator: (e) => typeof e == "string" || Array.isArray(e) === !0 || Object(e) === e || e === null
    },
    multiple: Boolean,
    range: Boolean,
    title: String,
    subtitle: String,
    mask: {
      ...Al.mask,
      default: "YYYY/MM/DD"
    },
    defaultYearMonth: {
      type: String,
      validator: vo
    },
    yearsInMonthView: Boolean,
    events: [Array, Function],
    eventColor: [String, Function],
    emitImmediately: Boolean,
    options: [Array, Function],
    navigationMinYearMonth: {
      type: String,
      validator: vo
    },
    navigationMaxYearMonth: {
      type: String,
      validator: vo
    },
    noUnset: Boolean,
    firstDayOfWeek: [String, Number],
    todayBtn: Boolean,
    minimal: Boolean,
    defaultView: {
      type: String,
      default: "Calendar",
      validator: sr
    }
  },
  emits: [
    ...iu,
    "rangeStart",
    "rangeEnd",
    "navigation"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), { $q: l } = n, o = rt(e, l), { getCache: i } = Jn(), { tabindex: r, headerClass: u, getLocale: c, getCurrentDate: d } = ru(e, l);
    let v;
    const b = Ra(Zn(e)), m = z(null), g = z(Qe()), p = z(c()), k = s(() => Qe()), C = s(() => c()), y = s(() => d()), h = z(ae(g.value, p.value)), w = z(e.defaultView), x = s(() => l.lang.rtl === !0 ? "right" : "left"), L = z(x.value), M = z(x.value), K = h.value.year, X = z(K - K % ha - (K < 0 ? ha : 0)), A = z(null), $ = s(() => {
      const q = e.landscape === !0 ? "landscape" : "portrait";
      return `q-date q-date--${q} q-date--${q}-${e.minimal === !0 ? "minimal" : "standard"}` + (o.value === !0 ? " q-date--dark q-dark" : "") + (e.bordered === !0 ? " q-date--bordered" : "") + (e.square === !0 ? " q-date--square no-border-radius" : "") + (e.flat === !0 ? " q-date--flat no-shadow" : "") + (e.disable === !0 ? " disabled" : e.readonly === !0 ? " q-date--readonly" : "");
    }), D = s(() => e.color || "primary"), _ = s(() => e.textColor || "white"), S = s(() => e.emitImmediately === !0 && e.multiple !== !0 && e.range !== !0), T = s(() => Array.isArray(e.modelValue) === !0 ? e.modelValue : e.modelValue !== null && e.modelValue !== void 0 ? [e.modelValue] : []), H = s(() => T.value.filter((q) => typeof q == "string").map((q) => et(q, g.value, p.value)).filter((q) => q.dateHash !== null && q.day !== null && q.month !== null && q.year !== null)), E = s(() => {
      const q = (U) => et(U, g.value, p.value);
      return T.value.filter((U) => Qt(U) === !0 && U.from !== void 0 && U.to !== void 0).map((U) => ({
        from: q(U.from),
        to: q(U.to)
      })).filter((U) => U.from.dateHash !== null && U.to.dateHash !== null && U.from.dateHash < U.to.dateHash);
    }), Q = s(() => e.calendar !== "persian" ? (q) => new Date(q.year, q.month - 1, q.day) : (q) => {
      const U = or(q.year, q.month, q.day);
      return new Date(U.gy, U.gm - 1, U.gd);
    }), j = s(() => e.calendar === "persian" ? ya : (q, U, te) => fu(new Date(q.year, q.month - 1, q.day, q.hour, q.minute, q.second, q.millisecond), U === void 0 ? g.value : U, te === void 0 ? p.value : te, q.year, q.timezoneOffset)), N = s(() => H.value.length + E.value.reduce((q, U) => q + 1 + cu(Q.value(U.to), Q.value(U.from)), 0)), Z = s(() => {
      if (e.title !== void 0 && e.title !== null && e.title.length !== 0) return e.title;
      if (A.value !== null) {
        const te = A.value.init, xe = Q.value(te);
        return p.value.daysShort[xe.getDay()] + ", " + p.value.monthsShort[te.month - 1] + " " + te.day + un + "?";
      }
      if (N.value === 0) return un;
      if (N.value > 1) return `${N.value} ${p.value.pluralDay}`;
      const q = H.value[0], U = Q.value(q);
      return isNaN(U.valueOf()) === !0 ? un : p.value.headerTitle !== void 0 ? p.value.headerTitle(U, q) : p.value.daysShort[U.getDay()] + ", " + p.value.monthsShort[q.month - 1] + " " + q.day;
    }), B = s(() => H.value.concat(E.value.map((q) => q.from)).sort((q, U) => q.year - U.year || q.month - U.month)[0]), G = s(() => H.value.concat(E.value.map((q) => q.to)).sort((q, U) => U.year - q.year || U.month - q.month)[0]), V = s(() => {
      if (e.subtitle !== void 0 && e.subtitle !== null && e.subtitle.length !== 0) return e.subtitle;
      if (N.value === 0) return un;
      if (N.value > 1) {
        const q = B.value, U = G.value, te = p.value.monthsShort;
        return te[q.month - 1] + (q.year !== U.year ? " " + q.year + un + te[U.month - 1] + " " : q.month !== U.month ? un + te[U.month - 1] : "") + " " + U.year;
      }
      return H.value[0].year;
    }), oe = s(() => {
      const q = [l.iconSet.datetime.arrowLeft, l.iconSet.datetime.arrowRight];
      return l.lang.rtl === !0 ? q.reverse() : q;
    }), P = s(() => e.firstDayOfWeek !== void 0 ? Number(e.firstDayOfWeek) : p.value.firstDayOfWeek), I = s(() => {
      const q = p.value.daysShort, U = P.value;
      return U > 0 ? q.slice(U, 7).concat(q.slice(0, U)) : q;
    }), de = s(() => {
      const q = h.value;
      return e.calendar !== "persian" ? new Date(q.year, q.month, 0).getDate() : yl(q.year, q.month);
    }), Y = s(() => typeof e.eventColor == "function" ? e.eventColor : () => e.eventColor), fe = s(() => {
      if (e.navigationMinYearMonth === void 0) return null;
      const q = e.navigationMinYearMonth.split("/");
      return {
        year: parseInt(q[0], 10),
        month: parseInt(q[1], 10)
      };
    }), W = s(() => {
      if (e.navigationMaxYearMonth === void 0) return null;
      const q = e.navigationMaxYearMonth.split("/");
      return {
        year: parseInt(q[0], 10),
        month: parseInt(q[1], 10)
      };
    }), be = s(() => {
      const q = {
        month: {
          prev: !0,
          next: !0
        },
        year: {
          prev: !0,
          next: !0
        }
      };
      return fe.value !== null && fe.value.year >= h.value.year && (q.year.prev = !1, fe.value.year === h.value.year && fe.value.month >= h.value.month && (q.month.prev = !1)), W.value !== null && W.value.year <= h.value.year && (q.year.next = !1, W.value.year === h.value.year && W.value.month <= h.value.month && (q.month.next = !1)), q;
    }), _e = s(() => {
      const q = {};
      return H.value.forEach((U) => {
        const te = $a(U);
        q[te] === void 0 && (q[te] = []), q[te].push(U.day);
      }), q;
    }), we = s(() => {
      const q = {};
      return E.value.forEach((U) => {
        const te = $a(U.from), xe = $a(U.to);
        if (q[te] === void 0 && (q[te] = []), q[te].push({
          from: U.from.day,
          to: te === xe ? U.to.day : void 0,
          range: U
        }), te < xe) {
          let $e;
          const { year: Ze, month: ze } = U.from, Ue = ze < 12 ? {
            year: Ze,
            month: ze + 1
          } : {
            year: Ze + 1,
            month: 1
          };
          for (; ($e = $a(Ue)) <= xe; )
            q[$e] === void 0 && (q[$e] = []), q[$e].push({
              from: void 0,
              to: $e === xe ? U.to.day : void 0,
              range: U
            }), Ue.month++, Ue.month > 12 && (Ue.year++, Ue.month = 1);
        }
      }), q;
    }), Ie = s(() => {
      if (A.value === null) return;
      const { init: q, initHash: U, final: te, finalHash: xe } = A.value, [$e, Ze] = U <= xe ? [q, te] : [te, q], ze = $a($e), Ue = $a(Ze);
      if (ze !== Ce.value && Ue !== Ce.value) return;
      const dt = {};
      return ze === Ce.value ? (dt.from = $e.day, dt.includeFrom = !0) : dt.from = 1, Ue === Ce.value ? (dt.to = Ze.day, dt.includeTo = !0) : dt.to = de.value, dt;
    }), Ce = s(() => $a(h.value)), Me = s(() => {
      const q = {};
      if (e.options === void 0) {
        for (let te = 1; te <= de.value; te++) q[te] = !0;
        return q;
      }
      const U = typeof e.options == "function" ? e.options : (te) => e.options.includes(te);
      for (let te = 1; te <= de.value; te++) q[te] = U(Ce.value + "/" + ct(te));
      return q;
    }), Le = s(() => {
      const q = {};
      if (e.events === void 0) for (let U = 1; U <= de.value; U++) q[U] = !1;
      else {
        const U = typeof e.events == "function" ? e.events : (te) => e.events.includes(te);
        for (let te = 1; te <= de.value; te++) {
          const xe = Ce.value + "/" + ct(te);
          q[te] = U(xe) === !0 && Y.value(xe);
        }
      }
      return q;
    }), ot = s(() => {
      let q, U;
      const { year: te, month: xe } = h.value;
      if (e.calendar !== "persian")
        q = new Date(te, xe - 1, 1), U = new Date(te, xe - 1, 0).getDate();
      else {
        const $e = or(te, xe, 1);
        q = new Date($e.gy, $e.gm - 1, $e.gd);
        let Ze = xe - 1, ze = te;
        Ze === 0 && (Ze = 12, ze--), U = yl(ze, Ze);
      }
      return {
        days: q.getDay() - P.value - 1,
        endDay: U
      };
    }), We = s(() => {
      const q = [], { days: U, endDay: te } = ot.value, xe = U < 0 ? U + 7 : U;
      if (xe < 6) for (let ze = te - xe; ze <= te; ze++) q.push({
        i: ze,
        fill: !0
      });
      const $e = q.length;
      for (let ze = 1; ze <= de.value; ze++) {
        const Ue = {
          i: ze,
          event: Le.value[ze],
          classes: []
        };
        Me.value[ze] === !0 && (Ue.in = !0, Ue.flat = !0), q.push(Ue);
      }
      if (_e.value[Ce.value] !== void 0 && _e.value[Ce.value].forEach((ze) => {
        const Ue = $e + ze - 1;
        Object.assign(q[Ue], {
          selected: !0,
          unelevated: !0,
          flat: !1,
          color: D.value,
          textColor: _.value
        });
      }), we.value[Ce.value] !== void 0 && we.value[Ce.value].forEach((ze) => {
        if (ze.from !== void 0) {
          const Ue = $e + ze.from - 1, dt = $e + (ze.to || de.value) - 1;
          for (let Jt = Ue; Jt <= dt; Jt++) Object.assign(q[Jt], {
            range: ze.range,
            unelevated: !0,
            color: D.value,
            textColor: _.value
          });
          Object.assign(q[Ue], {
            rangeFrom: !0,
            flat: !1
          }), ze.to !== void 0 && Object.assign(q[dt], {
            rangeTo: !0,
            flat: !1
          });
        } else if (ze.to !== void 0) {
          const Ue = $e + ze.to - 1;
          for (let dt = $e; dt <= Ue; dt++) Object.assign(q[dt], {
            range: ze.range,
            unelevated: !0,
            color: D.value,
            textColor: _.value
          });
          Object.assign(q[Ue], {
            flat: !1,
            rangeTo: !0
          });
        } else {
          const Ue = $e + de.value - 1;
          for (let dt = $e; dt <= Ue; dt++) Object.assign(q[dt], {
            range: ze.range,
            unelevated: !0,
            color: D.value,
            textColor: _.value
          });
        }
      }), Ie.value !== void 0) {
        const ze = $e + Ie.value.from - 1, Ue = $e + Ie.value.to - 1;
        for (let dt = ze; dt <= Ue; dt++)
          q[dt].color = D.value, q[dt].editRange = !0;
        Ie.value.includeFrom === !0 && (q[ze].editRangeFrom = !0), Ie.value.includeTo === !0 && (q[Ue].editRangeTo = !0);
      }
      h.value.year === y.value.year && h.value.month === y.value.month && (q[$e + y.value.day - 1].today = !0);
      const Ze = q.length % 7;
      if (Ze > 0) {
        const ze = 7 - Ze;
        for (let Ue = 1; Ue <= ze; Ue++) q.push({
          i: Ue,
          fill: !0
        });
      }
      return q.forEach((ze) => {
        let Ue = "q-date__calendar-item ";
        ze.fill === !0 ? Ue += "q-date__calendar-item--fill" : (Ue += `q-date__calendar-item--${ze.in === !0 ? "in" : "out"}`, ze.range !== void 0 && (Ue += ` q-date__range${ze.rangeTo === !0 ? "-to" : ze.rangeFrom === !0 ? "-from" : ""}`), ze.editRange === !0 && (Ue += ` q-date__edit-range${ze.editRangeFrom === !0 ? "-from" : ""}${ze.editRangeTo === !0 ? "-to" : ""}`), (ze.range !== void 0 || ze.editRange === !0) && (Ue += ` text-${ze.color}`)), ze.classes = Ue;
      }), q;
    }), ue = s(() => e.disable === !0 ? { "aria-disabled": "true" } : {});
    se(() => e.modelValue, (q) => {
      if (v === JSON.stringify(q)) v = 0;
      else {
        const U = ae(g.value, p.value);
        ut(U.year, U.month, U);
      }
    }), se(w, () => {
      m.value !== null && n.$el.contains(document.activeElement) === !0 && m.value.focus();
    }), se(() => h.value.year + "|" + h.value.month, () => {
      a("navigation", {
        year: h.value.year,
        month: h.value.month
      });
    }), se(k, (q) => {
      J(q, p.value, "mask"), g.value = q;
    }), se(C, (q) => {
      J(g.value, q, "locale"), p.value = q;
    });
    function ie(q) {
      v = JSON.stringify(q);
    }
    function ge() {
      const { year: q, month: U, day: te } = y.value, xe = {
        ...h.value,
        year: q,
        month: U,
        day: te
      }, $e = _e.value[$a(xe)];
      ($e === void 0 || $e.includes(xe.day) === !1) && ga(xe), Ke(xe.year, xe.month);
    }
    function Pe(q) {
      sr(q) === !0 && (w.value = q);
    }
    function Ge(q, U) {
      ["month", "year"].includes(q) && (q === "month" ? Ve : le)(U === !0 ? -1 : 1);
    }
    function Ke(q, U) {
      w.value = "Calendar", ut(q, U);
    }
    function je(q, U) {
      if (e.range === !1 || !q) {
        A.value = null;
        return;
      }
      const te = Object.assign({ ...h.value }, q), xe = U !== void 0 ? Object.assign({ ...h.value }, U) : te;
      A.value = {
        init: te,
        initHash: ya(te),
        final: xe,
        finalHash: ya(xe)
      }, Ke(te.year, te.month);
    }
    function Qe() {
      return e.calendar === "persian" ? "YYYY/MM/DD" : e.mask;
    }
    function et(q, U, te) {
      return Pn(q, U, te, e.calendar, {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
    }
    function ae(q, U) {
      const te = Array.isArray(e.modelValue) === !0 ? e.modelValue : e.modelValue ? [e.modelValue] : [];
      if (te.length === 0) return ce();
      const xe = te[te.length - 1], $e = et(xe.from !== void 0 ? xe.from : xe, q, U);
      return $e.dateHash === null ? ce() : $e;
    }
    function ce() {
      let q, U;
      if (e.defaultYearMonth !== void 0) {
        const te = e.defaultYearMonth.split("/");
        q = parseInt(te[0], 10), U = parseInt(te[1], 10);
      } else {
        const te = y.value !== void 0 ? y.value : d();
        q = te.year, U = te.month;
      }
      return {
        year: q,
        month: U,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        dateHash: q + "/" + ct(U) + "/01"
      };
    }
    function Ve(q) {
      let U = h.value.year, te = Number(h.value.month) + q;
      te === 13 ? (te = 1, U++) : te === 0 && (te = 12, U--), ut(U, te), S.value === !0 && Ct("month");
    }
    function le(q) {
      ut(Number(h.value.year) + q, h.value.month), S.value === !0 && Ct("year");
    }
    function ke(q) {
      ut(q, h.value.month), w.value = e.defaultView === "Years" ? "Months" : "Calendar", S.value === !0 && Ct("year");
    }
    function Fe(q) {
      ut(h.value.year, q), w.value = "Calendar", S.value === !0 && Ct("month");
    }
    function Te(q, U) {
      var te;
      (((te = _e.value[U]) == null ? void 0 : te.includes(q.day)) === !0 ? fa : ga)(q);
    }
    function He(q) {
      return {
        year: q.year,
        month: q.month,
        day: q.day
      };
    }
    function ut(q, U, te) {
      if (fe.value !== null && q <= fe.value.year && ((U < fe.value.month || q < fe.value.year) && (U = fe.value.month), q = fe.value.year), W.value !== null && q >= W.value.year && ((U > W.value.month || q > W.value.year) && (U = W.value.month), q = W.value.year), te !== void 0) {
        const { hour: $e, minute: Ze, second: ze, millisecond: Ue, timezoneOffset: dt, timeHash: Jt } = te;
        Object.assign(h.value, {
          hour: $e,
          minute: Ze,
          second: ze,
          millisecond: Ue,
          timezoneOffset: dt,
          timeHash: Jt
        });
      }
      const xe = q + "/" + ct(U) + "/01";
      xe !== h.value.dateHash && (L.value = h.value.dateHash < xe == (l.lang.rtl !== !0) ? "left" : "right", q !== h.value.year && (M.value = L.value), nt(() => {
        X.value = q - q % ha - (q < 0 ? ha : 0), Object.assign(h.value, {
          year: q,
          month: U,
          day: 1,
          dateHash: xe
        });
      }));
    }
    function It(q, U, te) {
      const xe = q !== null && q.length === 1 && e.multiple === !1 ? q[0] : q, { reason: $e, details: Ze } = Zt(U, te);
      ie(xe), a("update:modelValue", xe, $e, Ze);
    }
    function Ct(q) {
      const U = H.value[0] !== void 0 && H.value[0].dateHash !== null ? { ...H.value[0] } : { ...h.value };
      nt(() => {
        U.year = h.value.year, U.month = h.value.month;
        const te = e.calendar !== "persian" ? new Date(U.year, U.month, 0).getDate() : yl(U.year, U.month);
        U.day = Math.min(Math.max(1, U.day), te);
        const xe = Xt(U), { details: $e } = Zt("", U);
        ie(xe), a("update:modelValue", xe, q, $e);
      });
    }
    function Zt(q, U) {
      return U.from !== void 0 ? {
        reason: `${q}-range`,
        details: {
          ...He(U.target),
          from: He(U.from),
          to: He(U.to)
        }
      } : {
        reason: `${q}-day`,
        details: He(U)
      };
    }
    function Xt(q, U, te) {
      return q.from !== void 0 ? {
        from: j.value(q.from, U, te),
        to: j.value(q.to, U, te)
      } : j.value(q, U, te);
    }
    function ga(q) {
      let U;
      if (e.multiple === !0) if (q.from !== void 0) {
        const te = ya(q.from), xe = ya(q.to), $e = H.value.filter((ze) => ze.dateHash < te || ze.dateHash > xe), Ze = E.value.filter(({ from: ze, to: Ue }) => Ue.dateHash < te || ze.dateHash > xe);
        U = $e.concat(Ze).concat(q).map((ze) => Xt(ze));
      } else {
        const te = T.value.slice();
        te.push(Xt(q)), U = te;
      }
      else U = Xt(q);
      It(U, "add", q);
    }
    function fa(q) {
      if (e.noUnset === !0) return;
      let U = null;
      if (e.multiple === !0 && Array.isArray(e.modelValue) === !0) {
        const te = Xt(q);
        q.from !== void 0 ? U = e.modelValue.filter((xe) => xe.from !== void 0 ? xe.from !== te.from && xe.to !== te.to : !0) : U = e.modelValue.filter((xe) => xe !== te), U.length === 0 && (U = null);
      }
      It(U, "remove", q);
    }
    function J(q, U, te) {
      const xe = H.value.concat(E.value).map((Ze) => Xt(Ze, q, U)).filter((Ze) => Ze.from !== void 0 ? Ze.from.dateHash !== null && Ze.to.dateHash !== null : Ze.dateHash !== null), $e = (e.multiple === !0 ? xe : xe[0]) || null;
      ie($e), a("update:modelValue", $e, te);
    }
    function Se() {
      if (e.minimal !== !0)
        return f("div", { class: "q-date__header " + u.value }, [f("div", { class: "relative-position" }, [f(Pt, { name: "q-transition--fade" }, () => f("div", {
          key: "h-yr-" + V.value,
          class: "q-date__header-subtitle q-date__header-link " + (w.value === "Years" ? "q-date__header-link--active" : "cursor-pointer"),
          tabindex: r.value,
          ...i("vY", {
            onClick() {
              w.value = "Years";
            },
            onKeyup(q) {
              q.keyCode === 13 && (w.value = "Years");
            }
          })
        }, [V.value]))]), f("div", { class: "q-date__header-title relative-position flex no-wrap" }, [f("div", { class: "relative-position col" }, [f(Pt, { name: "q-transition--fade" }, () => f("div", {
          key: "h-sub" + Z.value,
          class: "q-date__header-title-label q-date__header-link " + (w.value === "Calendar" ? "q-date__header-link--active" : "cursor-pointer"),
          tabindex: r.value,
          ...i("vC", {
            onClick() {
              w.value = "Calendar";
            },
            onKeyup(q) {
              q.keyCode === 13 && (w.value = "Calendar");
            }
          })
        }, [Z.value]))]), e.todayBtn === !0 ? f(ft, {
          class: "q-date__header-today self-start",
          icon: l.iconSet.datetime.today,
          "aria-label": l.lang.date.today,
          flat: !0,
          size: "sm",
          round: !0,
          tabindex: r.value,
          onClick: ge
        }) : null])]);
    }
    function Re({ label: q, type: U, key: te, dir: xe, goTo: $e, boundaries: Ze, cls: ze }) {
      return [
        f("div", { class: "row items-center q-date__arrow" }, [f(ft, {
          round: !0,
          dense: !0,
          size: "sm",
          flat: !0,
          icon: oe.value[0],
          "aria-label": U === "Years" ? l.lang.date.prevYear : l.lang.date.prevMonth,
          tabindex: r.value,
          disable: Ze.prev === !1,
          ...i("go-#" + U, { onClick() {
            $e(-1);
          } })
        })]),
        f("div", { class: "relative-position overflow-hidden flex flex-center" + ze }, [f(Pt, { name: "q-transition--jump-" + xe }, () => f("div", { key: te }, [f(ft, {
          flat: !0,
          dense: !0,
          noCaps: !0,
          label: q,
          tabindex: r.value,
          ...i("view#" + U, { onClick: () => {
            w.value = U;
          } })
        })]))]),
        f("div", { class: "row items-center q-date__arrow" }, [f(ft, {
          round: !0,
          dense: !0,
          size: "sm",
          flat: !0,
          icon: oe.value[1],
          "aria-label": U === "Years" ? l.lang.date.nextYear : l.lang.date.nextMonth,
          tabindex: r.value,
          disable: Ze.next === !1,
          ...i("go+#" + U, { onClick() {
            $e(1);
          } })
        })])
      ];
    }
    const Ne = {
      Calendar: () => [f("div", {
        key: "calendar-view",
        class: "q-date__view q-date__calendar"
      }, [
        f("div", { class: "q-date__navigation row items-center no-wrap" }, Re({
          label: p.value.months[h.value.month - 1],
          type: "Months",
          key: h.value.month,
          dir: L.value,
          goTo: Ve,
          boundaries: be.value.month,
          cls: " col"
        }).concat(Re({
          label: h.value.year,
          type: "Years",
          key: h.value.year,
          dir: M.value,
          goTo: le,
          boundaries: be.value.year,
          cls: ""
        }))),
        f("div", { class: "q-date__calendar-weekdays row items-center no-wrap" }, I.value.map((q) => f("div", { class: "q-date__calendar-item" }, [f("div", q)]))),
        f("div", { class: "q-date__calendar-days-container relative-position overflow-hidden" }, [f(Pt, { name: "q-transition--slide-" + L.value }, () => f("div", {
          key: Ce.value,
          class: "q-date__calendar-days fit"
        }, We.value.map((q) => f("div", { class: q.classes }, [q.in === !0 ? f(ft, {
          class: q.today === !0 ? "q-date__today" : "",
          dense: !0,
          flat: q.flat,
          unelevated: q.unelevated,
          color: q.color,
          textColor: q.textColor,
          label: q.i,
          tabindex: r.value,
          ...i("day#" + q.i, {
            onClick: () => {
              Xe(q.i);
            },
            onMouseover: () => {
              pt(q.i);
            }
          })
        }, q.event !== !1 ? () => f("div", { class: "q-date__event bg-" + q.event }) : null) : f("div", String(q.i))]))))])
      ])],
      Months() {
        const q = h.value.year === y.value.year, U = (xe) => fe.value !== null && h.value.year === fe.value.year && fe.value.month > xe || W.value !== null && h.value.year === W.value.year && W.value.month < xe, te = p.value.monthsShort.map((xe, $e) => {
          const Ze = h.value.month === $e + 1;
          return f("div", { class: "q-date__months-item flex flex-center" }, [f(ft, {
            class: q === !0 && y.value.month === $e + 1 ? "q-date__today" : null,
            flat: Ze !== !0,
            label: xe,
            unelevated: Ze,
            color: Ze === !0 ? D.value : null,
            textColor: Ze === !0 ? _.value : null,
            tabindex: r.value,
            disable: U($e + 1),
            ...i("month#" + $e, { onClick: () => {
              Fe($e + 1);
            } })
          })]);
        });
        return e.yearsInMonthView === !0 && te.unshift(f("div", { class: "row no-wrap full-width" }, [Re({
          label: h.value.year,
          type: "Years",
          key: h.value.year,
          dir: M.value,
          goTo: le,
          boundaries: be.value.year,
          cls: " col"
        })])), f("div", {
          key: "months-view",
          class: "q-date__view q-date__months flex flex-center"
        }, te);
      },
      Years() {
        const q = X.value, U = q + ha, te = [], xe = ($e) => fe.value !== null && fe.value.year > $e || W.value !== null && W.value.year < $e;
        for (let $e = q; $e <= U; $e++) {
          const Ze = h.value.year === $e;
          te.push(f("div", { class: "q-date__years-item flex flex-center" }, [f(ft, {
            key: "yr" + $e,
            class: y.value.year === $e ? "q-date__today" : null,
            flat: !Ze,
            label: $e,
            dense: !0,
            unelevated: Ze,
            color: Ze === !0 ? D.value : null,
            textColor: Ze === !0 ? _.value : null,
            tabindex: r.value,
            disable: xe($e),
            ...i("yr#" + $e, { onClick: () => {
              ke($e);
            } })
          })]));
        }
        return f("div", { class: "q-date__view q-date__years flex flex-center" }, [
          f("div", { class: "col-auto" }, [f(ft, {
            round: !0,
            dense: !0,
            flat: !0,
            icon: oe.value[0],
            "aria-label": l.lang.date.prevRangeYears(ha),
            tabindex: r.value,
            disable: xe(q),
            ...i("y-", { onClick: () => {
              X.value -= ha;
            } })
          })]),
          f("div", { class: "q-date__years-content col self-stretch row items-center" }, te),
          f("div", { class: "col-auto" }, [f(ft, {
            round: !0,
            dense: !0,
            flat: !0,
            icon: oe.value[1],
            "aria-label": l.lang.date.nextRangeYears(ha),
            tabindex: r.value,
            disable: xe(U),
            ...i("y+", { onClick: () => {
              X.value += ha;
            } })
          })])
        ]);
      }
    };
    function Xe(q) {
      const U = {
        ...h.value,
        day: q
      };
      if (e.range === !1) {
        Te(U, Ce.value);
        return;
      }
      if (A.value === null) {
        const te = We.value.find(($e) => $e.fill !== !0 && $e.i === q);
        if (e.noUnset !== !0 && te.range !== void 0) {
          fa({
            target: U,
            from: te.range.from,
            to: te.range.to
          });
          return;
        }
        if (te.selected === !0) {
          fa(U);
          return;
        }
        const xe = ya(U);
        A.value = {
          init: U,
          initHash: xe,
          final: U,
          finalHash: xe
        }, a("rangeStart", He(U));
      } else {
        const te = A.value.initHash, xe = ya(U), $e = te <= xe ? {
          from: A.value.init,
          to: U
        } : {
          from: U,
          to: A.value.init
        };
        A.value = null, ga(te === xe ? U : {
          target: U,
          ...$e
        }), a("rangeEnd", {
          from: He($e.from),
          to: He($e.to)
        });
      }
    }
    function pt(q) {
      if (A.value !== null) {
        const U = {
          ...h.value,
          day: q
        };
        Object.assign(A.value, {
          final: U,
          finalHash: ya(U)
        });
      }
    }
    return Object.assign(n, {
      setToday: ge,
      setView: Pe,
      offsetCalendar: Ge,
      setCalendarTo: Ke,
      setEditingRange: je
    }), () => {
      const q = [f("div", { class: "q-date__content col relative-position" }, [f(Pt, { name: "q-transition--fade" }, Ne[w.value])])], U = De(t.default);
      return U !== void 0 && q.push(f("div", { class: "q-date__actions" }, U)), e.name !== void 0 && e.disable !== !0 && b(q, "push"), f("div", {
        class: $.value,
        ...ue.value
      }, [Se(), f("div", {
        ref: m,
        class: "q-date__main col column",
        tabindex: -1
      }, q)]);
    };
  }
});
function vu(e, t, a) {
  function n() {
  }
  return tt(() => {
    e.value;
  }), {
    removeFromHistory: n,
    addToHistory() {
    }
  };
}
let Ln = 0, mo, go, Rn, ho = !1, ur, dr, cr, Fa = null;
function Ff(e) {
  Ef(e) && Ye(e);
}
function Ef(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) return !0;
  const t = ac(e), a = e.shiftKey && !e.deltaX, n = !a && Math.abs(e.deltaX) <= Math.abs(e.deltaY), l = a || n ? e.deltaY : e.deltaX;
  for (let o = 0; o < t.length; o++) {
    const i = t[o];
    if (Oc(i, n)) return n ? l < 0 && i.scrollTop === 0 ? !0 : l > 0 && i.scrollTop + i.clientHeight === i.scrollHeight : l < 0 && i.scrollLeft === 0 ? !0 : l > 0 && i.scrollLeft + i.clientWidth === i.scrollWidth;
  }
  return !0;
}
function fr(e) {
  e.target === document && (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop);
}
function il(e) {
  ho !== !0 && (ho = !0, requestAnimationFrame(() => {
    ho = !1;
    const { height: t } = e.target, { clientHeight: a, scrollTop: n } = document.scrollingElement;
    (Rn === void 0 || t !== window.innerHeight) && (Rn = a - t, document.scrollingElement.scrollTop = n), n > Rn && (document.scrollingElement.scrollTop -= Math.ceil((n - Rn) / 8));
  }));
}
function vr(e) {
  const t = document.body, a = window.visualViewport !== void 0;
  if (e === "add") {
    const { overflowY: n, overflowX: l } = window.getComputedStyle(t);
    mo = Il(window), go = La(window), ur = t.style.left, dr = t.style.top, cr = window.location.href, t.style.left = `-${mo}px`, t.style.top = `-${go}px`, l !== "hidden" && (l === "scroll" || t.scrollWidth > window.innerWidth) && t.classList.add("q-body--force-scrollbar-x"), n !== "hidden" && (n === "scroll" || t.scrollHeight > window.innerHeight) && t.classList.add("q-body--force-scrollbar-y"), t.classList.add("q-body--prevent-scroll"), document.qScrollPrevented = !0, Je.is.ios === !0 && (a === !0 ? (window.scrollTo(0, 0), window.visualViewport.addEventListener("resize", il, gt.passiveCapture), window.visualViewport.addEventListener("scroll", il, gt.passiveCapture), window.scrollTo(0, 0)) : window.addEventListener("scroll", fr, gt.passiveCapture));
  }
  Je.is.desktop === !0 && Je.is.mac === !0 && window[`${e}EventListener`]("wheel", Ff, gt.notPassive), e === "remove" && (Je.is.ios === !0 && (a === !0 ? (window.visualViewport.removeEventListener("resize", il, gt.passiveCapture), window.visualViewport.removeEventListener("scroll", il, gt.passiveCapture)) : window.removeEventListener("scroll", fr, gt.passiveCapture)), t.classList.remove("q-body--prevent-scroll"), t.classList.remove("q-body--force-scrollbar-x"), t.classList.remove("q-body--force-scrollbar-y"), document.qScrollPrevented = !1, t.style.left = ur, t.style.top = dr, window.location.href === cr && window.scrollTo(mo, go), Rn = void 0);
}
function Oo(e) {
  let t = "add";
  if (e === !0) {
    if (Ln++, Fa !== null) {
      clearTimeout(Fa), Fa = null;
      return;
    }
    if (Ln > 1) return;
  } else {
    if (Ln === 0 || (Ln--, Ln > 0)) return;
    if (t = "remove", Je.is.ios === !0 && Je.is.nativeMobile === !0) {
      Fa !== null && clearTimeout(Fa), Fa = setTimeout(() => {
        vr(t), Fa = null;
      }, 100);
      return;
    }
  }
  vr(t);
}
function mu() {
  let e;
  return { preventBodyScroll(t) {
    t !== e && (e !== void 0 || t === !0) && (e = t, Oo(t));
  } };
}
let rl = 0;
const If = {
  standard: "fixed-full flex-center",
  top: "fixed-top justify-center",
  bottom: "fixed-bottom justify-center",
  right: "fixed-right items-center",
  left: "fixed-left items-center"
}, mr = {
  standard: ["scale", "scale"],
  top: ["slide-down", "slide-up"],
  bottom: ["slide-up", "slide-down"],
  right: ["slide-left", "slide-right"],
  left: ["slide-right", "slide-left"]
};
var Nl = re({
  name: "QDialog",
  inheritAttrs: !1,
  props: {
    ...qn,
    ...Ka,
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    backdropFilter: String,
    position: {
      type: String,
      default: "standard",
      validator: (e) => [
        "standard",
        "top",
        "bottom",
        "left",
        "right"
      ].includes(e)
    }
  },
  emits: [
    ...Bn,
    "shake",
    "click",
    "escapeKey"
  ],
  setup(e, { slots: t, emit: a, attrs: n }) {
    const l = ye(), o = z(null), i = z(!1), r = z(!1);
    let u = null, c = null, d, v;
    const b = s(() => e.persistent !== !0 && e.noRouteDismiss !== !0 && e.seamless !== !0), { preventBodyScroll: m } = mu(), { registerTimeout: g } = Sa(), { registerTick: p, removeTick: k } = kn(), { transitionProps: C, transitionStyle: y } = El(e, () => mr[e.position][0], () => mr[e.position][1]), h = s(() => y.value + (e.backdropFilter !== void 0 ? `;backdrop-filter:${e.backdropFilter};-webkit-backdrop-filter:${e.backdropFilter}` : "")), { showPortal: w, hidePortal: x, portalIsAccessible: L, renderPortal: M } = ii(l, o, G, "dialog"), { hide: K } = Tn({
      showing: i,
      hideOnRouteChange: b,
      handleShow: _,
      handleHide: S,
      processOnMount: !0
    });
    vu(i);
    const X = s(() => `q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized === !0 ? "maximized" : "minimized"} q-dialog__inner--${e.position} ${If[e.position]}` + (r.value === !0 ? " q-dialog__inner--animating" : "") + (e.fullWidth === !0 ? " q-dialog__inner--fullwidth" : "") + (e.fullHeight === !0 ? " q-dialog__inner--fullheight" : "") + (e.square === !0 ? " q-dialog__inner--square" : "")), A = s(() => i.value === !0 && e.seamless !== !0), $ = s(() => e.autoClose === !0 ? { onClick: N } : {}), D = s(() => [`q-dialog fullscreen no-pointer-events q-dialog--${A.value === !0 ? "modal" : "seamless"}`, n.class]);
    se(() => e.maximized, (V) => {
      i.value === !0 && j(V);
    }), se(A, (V) => {
      m(V), V === !0 ? (Ps(B), zs(E)) : (Ro(B), wl(E));
    });
    function _(V) {
      var oe;
      c = e.noRefocus === !1 && document.activeElement !== null ? document.activeElement : null, j(e.maximized), w(), r.value = !0, e.noFocus !== !0 ? ((oe = document.activeElement) == null || oe.blur(), p(T)) : k(), g(() => {
        if (l.proxy.$q.platform.is.ios === !0) {
          if (e.seamless !== !0 && document.activeElement) {
            const { top: P, bottom: I } = document.activeElement.getBoundingClientRect(), { innerHeight: de } = window, Y = window.visualViewport !== void 0 ? window.visualViewport.height : de;
            P > 0 && I > Y / 2 && (document.scrollingElement.scrollTop = Math.min(document.scrollingElement.scrollHeight - Y, I >= de ? 1 / 0 : Math.ceil(document.scrollingElement.scrollTop + I - Y / 2))), document.activeElement.scrollIntoView();
          }
          v = !0, o.value.click(), v = !1;
        }
        w(!0), r.value = !1, a("show", V);
      }, e.transitionDuration);
    }
    function S(V) {
      k(), Q(!0), r.value = !0, x(), c !== null && ((((V == null ? void 0 : V.type.indexOf("key")) === 0 ? c.closest('[tabindex]:not([tabindex^="-"])') : void 0) || c).focus(), c = null), g(() => {
        x(!0), r.value = !1, a("hide", V);
      }, e.transitionDuration);
    }
    function T(V) {
      Mn(() => {
        let oe = o.value;
        if (oe !== null) {
          if (V !== void 0) {
            const P = oe.querySelector(V);
            if (P !== null) {
              P.focus({ preventScroll: !0 });
              return;
            }
          }
          oe.contains(document.activeElement) !== !0 && (oe = oe.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || oe.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || oe.querySelector("[autofocus], [data-autofocus]") || oe, oe.focus({ preventScroll: !0 }));
        }
      });
    }
    function H(V) {
      V && typeof V.focus == "function" ? V.focus({ preventScroll: !0 }) : T(), a("shake");
      const oe = o.value;
      oe !== null && (oe.classList.remove("q-animate--scale"), oe.classList.add("q-animate--scale"), u !== null && clearTimeout(u), u = setTimeout(() => {
        u = null, o.value !== null && (oe.classList.remove("q-animate--scale"), T());
      }, 170));
    }
    function E() {
      e.seamless !== !0 && (e.persistent === !0 || e.noEscDismiss === !0 ? e.maximized !== !0 && e.noShake !== !0 && H() : (a("escapeKey"), K()));
    }
    function Q(V) {
      u !== null && (clearTimeout(u), u = null), (V === !0 || i.value === !0) && (j(!1), e.seamless !== !0 && (m(!1), Ro(B), wl(E))), V !== !0 && (c = null);
    }
    function j(V) {
      V === !0 ? d !== !0 && (rl < 1 && document.body.classList.add("q-body--dialog"), rl++, d = !0) : d === !0 && (rl < 2 && document.body.classList.remove("q-body--dialog"), rl--, d = !1);
    }
    function N(V) {
      v !== !0 && (K(V), a("click", V));
    }
    function Z(V) {
      e.persistent !== !0 && e.noBackdropDismiss !== !0 ? K(V) : e.noShake !== !0 && H();
    }
    function B(V) {
      e.allowFocusOutside !== !0 && L.value === !0 && ks(o.value, V.target) !== !0 && T('[tabindex]:not([tabindex="-1"])');
    }
    Object.assign(l.proxy, {
      focus: T,
      shake: H,
      __updateRefocusTarget(V) {
        c = V || null;
      }
    }), tt(Q);
    function G() {
      return f("div", {
        role: "dialog",
        "aria-modal": A.value === !0 ? "true" : "false",
        ...n,
        class: D.value
      }, [f(Pt, {
        name: "q-transition--fade",
        appear: !0
      }, () => A.value === !0 ? f("div", {
        class: "q-dialog__backdrop fixed-full",
        style: h.value,
        "aria-hidden": "true",
        tabindex: -1,
        onClick: Z
      }) : null), f(Pt, C.value, () => i.value === !0 ? f("div", {
        ref: o,
        class: X.value,
        style: y.value,
        tabindex: -1,
        ...$.value
      }, De(t.default)) : null)]);
    }
    return M;
  }
});
const gr = 150;
re({
  name: "QDrawer",
  inheritAttrs: !1,
  props: {
    ...qn,
    ...it,
    side: {
      type: String,
      default: "left",
      validator: (e) => ["left", "right"].includes(e)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    noMiniAnimation: Boolean,
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (e) => [
        "default",
        "desktop",
        "mobile"
      ].includes(e),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },
  emits: [
    ...Bn,
    "onLayout",
    "miniState"
  ],
  setup(e, { slots: t, emit: a, attrs: n }) {
    const l = ye(), { proxy: { $q: o } } = l, i = rt(e, o), { preventBodyScroll: r } = mu(), { registerTimeout: u, removeTimeout: c } = Sa(), d = Yt(an, vt);
    if (d === vt)
      return console.error("QDrawer needs to be child of QLayout"), vt;
    let v, b = null, m;
    const g = z(e.behavior === "mobile" || e.behavior !== "desktop" && d.totalWidth.value <= e.breakpoint), p = s(() => e.mini === !0 && g.value !== !0), k = s(() => p.value === !0 ? e.miniWidth : e.width), C = z(e.showIfAbove === !0 && g.value === !1 ? !0 : e.modelValue === !0), y = s(() => e.persistent !== !0 && (g.value === !0 || Q.value === !0));
    function h(ue, ie) {
      if (ue !== !1 && d.animate(), W(0), g.value === !0) {
        const ge = d.instances[S.value];
        (ge == null ? void 0 : ge.belowBreakpoint) === !0 && ge.hide(!1), be(1), d.isContainer.value !== !0 && r(!0);
      } else
        be(0), ue !== !1 && _e(!1);
      u(() => {
        ue !== !1 && _e(!0), ie !== !0 && a("show", ue);
      }, gr);
    }
    function w(ue, ie) {
      ue !== !1 && d.animate(), be(0), W(X.value * k.value), Me(), ie !== !0 ? u(() => {
        a("hide", ue);
      }, gr) : c();
    }
    const { show: x, hide: L } = Tn({
      showing: C,
      hideOnRouteChange: y,
      handleShow: h,
      handleHide: w
    });
    vu(C);
    const M = {
      belowBreakpoint: g,
      hide: L
    }, K = s(() => e.side === "right"), X = s(() => (o.lang.rtl === !0 ? -1 : 1) * (K.value === !0 ? 1 : -1)), A = z(0), $ = z(!1), D = z(!1), _ = z(k.value * X.value), S = s(() => K.value === !0 ? "left" : "right"), T = s(() => C.value === !0 && g.value === !1 && e.overlay === !1 ? e.miniToOverlay === !0 ? e.miniWidth : k.value : 0), H = s(() => e.overlay === !0 || e.miniToOverlay === !0 || d.view.value.indexOf(K.value ? "R" : "L") !== -1 || o.platform.is.ios === !0 && d.isContainer.value === !0), E = s(() => e.overlay === !1 && C.value === !0 && g.value === !1), Q = s(() => e.overlay === !0 && C.value === !0 && g.value === !1), j = s(() => "fullscreen q-drawer__backdrop" + (C.value === !1 && $.value === !1 ? " hidden" : "")), N = s(() => ({ backgroundColor: `rgba(0,0,0,${A.value * 0.4})` })), Z = s(() => K.value === !0 ? d.rows.value.top[2] === "r" : d.rows.value.top[0] === "l"), B = s(() => K.value === !0 ? d.rows.value.bottom[2] === "r" : d.rows.value.bottom[0] === "l"), G = s(() => {
      const ue = {};
      return d.header.space === !0 && Z.value === !1 && (H.value === !0 ? ue.top = `${d.header.offset}px` : d.header.space === !0 && (ue.top = `${d.header.size}px`)), d.footer.space === !0 && B.value === !1 && (H.value === !0 ? ue.bottom = `${d.footer.offset}px` : d.footer.space === !0 && (ue.bottom = `${d.footer.size}px`)), ue;
    }), V = s(() => {
      const ue = {
        width: `${k.value}px`,
        transform: `translateX(${_.value}px)`
      };
      return g.value === !0 ? ue : Object.assign(ue, G.value);
    }), oe = s(() => "q-drawer__content fit " + (d.isContainer.value !== !0 ? "scroll" : "overflow-auto")), P = s(() => `q-drawer q-drawer--${e.side}` + (D.value === !0 ? " q-drawer--mini-animate" : "") + (e.bordered === !0 ? " q-drawer--bordered" : "") + (i.value === !0 ? " q-drawer--dark q-dark" : "") + ($.value === !0 ? " no-transition" : C.value === !0 ? "" : " q-layout--prevent-focus") + (g.value === !0 ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${p.value === !0 ? "mini" : "standard"}` + (H.value === !0 || E.value !== !0 ? " fixed" : "") + (e.overlay === !0 || e.miniToOverlay === !0 ? " q-drawer--on-top" : "") + (Z.value === !0 ? " q-drawer--top-padding" : ""))), I = s(() => [[
      ta,
      Ie,
      void 0,
      {
        [o.lang.rtl === !0 ? e.side : S.value]: !0,
        mouse: !0
      }
    ]]), de = s(() => [[
      ta,
      Ce,
      void 0,
      {
        [o.lang.rtl === !0 ? S.value : e.side]: !0,
        mouse: !0
      }
    ]]), Y = s(() => [[
      ta,
      Ce,
      void 0,
      {
        [o.lang.rtl === !0 ? S.value : e.side]: !0,
        mouse: !0,
        mouseAllDir: !0
      }
    ]]);
    function fe() {
      ot(g, e.behavior === "mobile" || e.behavior !== "desktop" && d.totalWidth.value <= e.breakpoint);
    }
    se(g, (ue) => {
      ue === !0 ? (v = C.value, C.value === !0 && L(!1)) : e.overlay === !1 && e.behavior !== "mobile" && v !== !1 && (C.value === !0 ? (W(0), be(0), Me()) : x(!1));
    }), se(() => e.side, (ue, ie) => {
      d.instances[ie] === M && (d.instances[ie] = void 0, d[ie].space = !1, d[ie].offset = 0), d.instances[ue] = M, d[ue].size = k.value, d[ue].space = E.value, d[ue].offset = T.value;
    }), se(d.totalWidth, () => {
      (d.isContainer.value === !0 || document.qScrollPrevented !== !0) && fe();
    }), se(() => e.behavior + e.breakpoint, fe), se(d.isContainer, (ue) => {
      C.value === !0 && r(ue !== !0), ue === !0 && fe();
    }), se(d.scrollbarWidth, () => {
      W(C.value === !0 ? 0 : void 0);
    }), se(T, (ue) => {
      Le("offset", ue);
    }), se(E, (ue) => {
      a("onLayout", ue), Le("space", ue);
    }), se(K, () => {
      W();
    }), se(k, (ue) => {
      W(), We(e.miniToOverlay, ue);
    }), se(() => e.miniToOverlay, (ue) => {
      We(ue, k.value);
    }), se(() => o.lang.rtl, () => {
      W();
    }), se(() => e.mini, () => {
      e.noMiniAnimation || e.modelValue === !0 && (we(), d.animate());
    }), se(p, (ue) => {
      a("miniState", ue);
    });
    function W(ue) {
      ue === void 0 ? nt(() => {
        ue = C.value === !0 ? 0 : k.value, W(X.value * ue);
      }) : (d.isContainer.value === !0 && K.value === !0 && (g.value === !0 || Math.abs(ue) === k.value) && (ue += X.value * d.scrollbarWidth.value), _.value = ue);
    }
    function be(ue) {
      A.value = ue;
    }
    function _e(ue) {
      const ie = ue === !0 ? "remove" : d.isContainer.value !== !0 ? "add" : "";
      ie !== "" && document.body.classList[ie]("q-body--drawer-toggle");
    }
    function we() {
      b !== null && clearTimeout(b), l.proxy && l.proxy.$el && l.proxy.$el.classList.add("q-drawer--mini-animate"), D.value = !0, b = setTimeout(() => {
        var ue, ie;
        b = null, D.value = !1, (ie = (ue = l == null ? void 0 : l.proxy) == null ? void 0 : ue.$el) == null || ie.classList.remove("q-drawer--mini-animate");
      }, 150);
    }
    function Ie(ue) {
      if (C.value !== !1) return;
      const ie = k.value, ge = mt(ue.distance.x, 0, ie);
      if (ue.isFinal === !0) {
        ge >= Math.min(75, ie) ? x() : (d.animate(), be(0), W(X.value * ie)), $.value = !1;
        return;
      }
      W((o.lang.rtl === !0 ? K.value !== !0 : K.value) ? Math.max(ie - ge, 0) : Math.min(0, ge - ie)), be(mt(ge / ie, 0, 1)), ue.isFirst === !0 && ($.value = !0);
    }
    function Ce(ue) {
      if (C.value !== !0) return;
      const ie = k.value, ge = ue.direction === e.side, Pe = (o.lang.rtl === !0 ? ge !== !0 : ge) ? mt(ue.distance.x, 0, ie) : 0;
      if (ue.isFinal === !0) {
        Math.abs(Pe) < Math.min(75, ie) ? (d.animate(), be(1), W(0)) : L(), $.value = !1;
        return;
      }
      W(X.value * Pe), be(mt(1 - Pe / ie, 0, 1)), ue.isFirst === !0 && ($.value = !0);
    }
    function Me() {
      r(!1), _e(!0);
    }
    function Le(ue, ie) {
      d.update(e.side, ue, ie);
    }
    function ot(ue, ie) {
      ue.value !== ie && (ue.value = ie);
    }
    function We(ue, ie) {
      Le("size", ue === !0 ? e.miniWidth : ie);
    }
    return d.instances[e.side] = M, We(e.miniToOverlay, k.value), Le("space", E.value), Le("offset", T.value), e.showIfAbove === !0 && e.modelValue !== !0 && C.value === !0 && e["onUpdate:modelValue"] !== void 0 && a("update:modelValue", !0), bt(() => {
      a("onLayout", E.value), a("miniState", p.value), v = e.showIfAbove === !0;
      const ue = () => {
        (C.value === !0 ? h : w)(!1, !0);
      };
      if (d.totalWidth.value !== 0) {
        nt(ue);
        return;
      }
      m = se(d.totalWidth, () => {
        m(), m = void 0, C.value === !1 && e.showIfAbove === !0 && g.value === !1 ? x(!1) : ue();
      });
    }), tt(() => {
      m == null || m(), b !== null && (clearTimeout(b), b = null), C.value === !0 && Me(), d.instances[e.side] === M && (d.instances[e.side] = void 0, Le("size", 0), Le("offset", 0), Le("space", !1));
    }), () => {
      const ue = [];
      g.value === !0 && (e.noSwipeOpen === !1 && ue.push(aa(f("div", {
        key: "open",
        class: `q-drawer__opener fixed-${e.side}`,
        "aria-hidden": "true"
      }), I.value)), ue.push(oa("div", {
        ref: "backdrop",
        class: j.value,
        style: N.value,
        "aria-hidden": "true",
        onClick: L
      }, void 0, "backdrop", e.noSwipeBackdrop !== !0 && C.value === !0, () => Y.value)));
      const ie = p.value === !0 && t.mini !== void 0, ge = [f("div", {
        ...n,
        key: String(ie),
        class: [oe.value, n.class]
      }, ie === !0 ? t.mini() : De(t.default))];
      return e.elevated === !0 && C.value === !0 && ge.push(f("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), ue.push(oa("aside", {
        ref: "content",
        class: P.value,
        style: V.value
      }, ge, "contentclose", e.noSwipeClose !== !0 && g.value === !0, () => de.value)), f("div", { class: "q-drawer-container" }, ue);
    };
  }
});
function gu(e, t) {
  if (t && e === t) return null;
  const a = e.nodeName.toLowerCase();
  if ([
    "div",
    "li",
    "ul",
    "ol",
    "blockquote"
  ].includes(a) === !0) return e;
  const n = (window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle).display;
  return n === "block" || n === "table" ? e : gu(e.parentNode);
}
function bo(e, t, a) {
  return !e || e === document.body ? !1 : a === !0 && e === t || (t === document ? document.body : t).contains(e.parentNode);
}
function hu(e, t, a) {
  if (a || (a = document.createRange(), a.selectNode(e), a.setStart(e, 0)), t.count === 0) a.setEnd(e, t.count);
  else if (t.count > 0) if (e.nodeType === Node.TEXT_NODE) e.textContent.length < t.count ? t.count -= e.textContent.length : (a.setEnd(e, t.count), t.count = 0);
  else for (let n = 0; t.count !== 0 && n < e.childNodes.length; n++) a = hu(e.childNodes[n], t, a);
  return a;
}
const Of = /^https?:\/\//;
var Hf = class {
  constructor(e, t) {
    this.el = e, this.eVm = t, this._range = null;
  }
  get selection() {
    if (this.el) {
      const e = document.getSelection();
      if (bo(e.anchorNode, this.el, !0) && bo(e.focusNode, this.el, !0)) return e;
    }
    return null;
  }
  get hasSelection() {
    return this.selection !== null ? this.selection.toString().length !== 0 : !1;
  }
  get range() {
    const e = this.selection;
    return e != null && e.rangeCount ? e.getRangeAt(0) : this._range;
  }
  get parent() {
    const e = this.range;
    if (e !== null) {
      const t = e.startContainer;
      return t.nodeType === document.ELEMENT_NODE ? t : t.parentNode;
    }
    return null;
  }
  get blockParent() {
    const e = this.parent;
    return e !== null ? gu(e, this.el) : null;
  }
  save(e = this.range) {
    e !== null && (this._range = e);
  }
  restore(e = this._range) {
    const t = document.createRange(), a = document.getSelection();
    e !== null ? (t.setStart(e.startContainer, e.startOffset), t.setEnd(e.endContainer, e.endOffset), a.removeAllRanges(), a.addRange(t)) : (a.selectAllChildren(this.el), a.collapseToEnd());
  }
  savePosition() {
    let e = -1, t;
    const a = document.getSelection(), n = this.el.parentNode;
    if (a.focusNode && bo(a.focusNode, n))
      for (t = a.focusNode, e = a.focusOffset; t && t !== n; ) t !== this.el && t.previousSibling ? (t = t.previousSibling, e += t.textContent.length) : t = t.parentNode;
    this.savedPos = e;
  }
  restorePosition(e = 0) {
    if (this.savedPos > 0 && this.savedPos < e) {
      const t = window.getSelection(), a = hu(this.el, { count: this.savedPos });
      a && (a.collapse(!1), t.removeAllRanges(), t.addRange(a));
    }
  }
  hasParent(e, t) {
    const a = t ? this.parent : this.blockParent;
    return a !== null ? a.nodeName.toLowerCase() === e.toLowerCase() : !1;
  }
  hasParents(e, t, a = this.parent) {
    return a === null ? !1 : e.includes(a.nodeName.toLowerCase()) === !0 ? !0 : t === !0 ? this.hasParents(e, t, a.parentNode) : !1;
  }
  is(e, t) {
    if (this.selection === null) return !1;
    switch (e) {
      case "formatBlock":
        return t === "DIV" && this.parent === this.el || this.hasParent(t, t === "PRE");
      case "link":
        return this.hasParent("A", !0);
      case "fontSize":
        return document.queryCommandValue(e) === t;
      case "fontName":
        const a = document.queryCommandValue(e);
        return a === `"${t}"` || a === t;
      case "fullscreen":
        return this.eVm.inFullscreen.value;
      case "viewsource":
        return this.eVm.isViewingSource.value;
      case void 0:
        return !1;
      default:
        const n = document.queryCommandState(e);
        return t !== void 0 ? n === t : n;
    }
  }
  getParentAttribute(e) {
    return this.parent !== null ? this.parent.getAttribute(e) : null;
  }
  can(e) {
    if (e === "outdent") return this.hasParents(["blockquote", "li"], !0);
    if (e === "indent") return this.hasParents(["li"], !0);
    if (e === "link") return this.selection !== null || this.is("link");
  }
  apply(e, t, a = At) {
    if (e === "formatBlock")
      [
        "BLOCKQUOTE",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6"
      ].includes(t) && this.is(e, t) && (e = "outdent", t = null), t === "PRE" && this.is(e, "PRE") && (t = "P");
    else if (e === "print") {
      a();
      const n = window.open();
      n.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `), n.print(), n.close();
      return;
    } else if (e === "link") {
      const n = this.getParentAttribute("href");
      if (n === null) {
        const l = this.selectWord(this.selection), o = l ? l.toString() : "";
        if (!o.length && (!this.range || !this.range.cloneContents().querySelector("img"))) return;
        this.eVm.editLinkUrl.value = Of.test(o) ? o : "https://", this.save(l.getRangeAt(0)), document.execCommand("createLink", !1, this.eVm.editLinkUrl.value);
      } else
        this.eVm.editLinkUrl.value = n, this.range.selectNodeContents(this.parent), this.save();
      return;
    } else if (e === "fullscreen") {
      this.eVm.toggleFullscreen(), a();
      return;
    } else if (e === "viewsource") {
      this.eVm.isViewingSource.value = this.eVm.isViewingSource.value === !1, this.eVm.setContent(this.eVm.props.modelValue), a();
      return;
    }
    document.execCommand(e, !1, t), a();
  }
  selectWord(e) {
    if (e === null || e.isCollapsed !== !0 || e.modify === void 0) return e;
    const t = document.createRange();
    t.setStart(e.anchorNode, e.anchorOffset), t.setEnd(e.focusNode, e.focusOffset);
    const a = t.collapsed ? ["backward", "forward"] : ["forward", "backward"];
    t.detach();
    const n = e.focusNode, l = e.focusOffset;
    return e.collapse(e.anchorNode, e.anchorOffset), e.modify("move", a[0], "character"), e.modify("move", a[1], "word"), e.extend(n, l), e.modify("extend", a[1], "character"), e.modify("extend", a[0], "word"), e;
  }
}, Nf = re({
  name: "QTooltip",
  inheritAttrs: !1,
  props: {
    ..._s,
    ...qn,
    ...Ka,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    transitionShow: {
      ...Ka.transitionShow,
      default: "jump-down"
    },
    transitionHide: {
      ...Ka.transitionHide,
      default: "jump-up"
    },
    anchor: {
      type: String,
      default: "bottom middle",
      validator: ql
    },
    self: {
      type: String,
      default: "top middle",
      validator: ql
    },
    offset: {
      type: Array,
      default: () => [14, 14],
      validator: Fs
    },
    scrollTarget: nn,
    delay: {
      type: Number,
      default: 0
    },
    hideDelay: {
      type: Number,
      default: 0
    },
    persistent: Boolean
  },
  emits: [...Bn],
  setup(e, { slots: t, emit: a, attrs: n }) {
    let l, o;
    const i = ye(), { proxy: { $q: r } } = i, u = z(null), c = z(!1), d = s(() => Bl(e.anchor, r.lang.rtl)), v = s(() => Bl(e.self, r.lang.rtl)), b = s(() => e.persistent !== !0), { registerTick: m, removeTick: g } = kn(), { registerTimeout: p } = Sa(), { transitionProps: k, transitionStyle: C } = El(e), { localScrollTarget: y, changeScrollEvent: h, unconfigureScrollTarget: w } = qs(e, N), { anchorEl: x, canShow: L, anchorEvents: M } = li({
      showing: c,
      configureAnchorEl: j
    }), { show: K, hide: X } = Tn({
      showing: c,
      canShow: L,
      handleShow: _,
      handleHide: S,
      hideOnRouteChange: b,
      processOnMount: !0
    });
    Object.assign(M, {
      delayShow: E,
      delayHide: Q
    });
    const { showPortal: A, hidePortal: $, renderPortal: D } = ii(i, u, B, "tooltip");
    if (r.platform.is.mobile === !0) {
      const G = {
        anchorEl: x,
        innerRef: u,
        onClickOutside(V) {
          return X(V), V.target.classList.contains("q-dialog__backdrop") && Ye(V), !0;
        }
      };
      se(s(() => e.modelValue === null && e.persistent !== !0 && c.value === !0), (V) => {
        (V === !0 ? Rs : $l)(G);
      }), tt(() => {
        $l(G);
      });
    }
    function _(G) {
      A(), m(() => {
        o = new MutationObserver(() => H()), o.observe(u.value, {
          attributes: !1,
          childList: !0,
          characterData: !0,
          subtree: !0
        }), H(), N();
      }), l === void 0 && (l = se(() => r.screen.width + "|" + r.screen.height + "|" + e.self + "|" + e.anchor + "|" + r.lang.rtl, H)), p(() => {
        A(!0), a("show", G);
      }, e.transitionDuration);
    }
    function S(G) {
      g(), $(), T(), p(() => {
        $(!0), a("hide", G);
      }, e.transitionDuration);
    }
    function T() {
      o !== void 0 && (o.disconnect(), o = void 0), l !== void 0 && (l(), l = void 0), w(), Ut(M, "tooltipTemp");
    }
    function H() {
      ri({
        targetEl: u.value,
        offset: e.offset,
        anchorEl: x.value,
        anchorOrigin: d.value,
        selfOrigin: v.value,
        maxHeight: e.maxHeight,
        maxWidth: e.maxWidth
      });
    }
    function E(G) {
      if (r.platform.is.mobile === !0) {
        da(), document.body.classList.add("non-selectable");
        const V = x.value;
        _t(M, "tooltipTemp", [
          "touchmove",
          "touchcancel",
          "touchend",
          "click"
        ].map((oe) => [
          V,
          oe,
          "delayHide",
          "passiveCapture"
        ]));
      }
      p(() => {
        K(G);
      }, e.delay);
    }
    function Q(G) {
      r.platform.is.mobile === !0 && (Ut(M, "tooltipTemp"), da(), setTimeout(() => {
        document.body.classList.remove("non-selectable");
      }, 10)), p(() => {
        X(G);
      }, e.hideDelay);
    }
    function j() {
      e.noParentEvent === !0 || x.value === null || _t(M, "anchor", r.platform.is.mobile === !0 ? [[
        x.value,
        "touchstart",
        "delayShow",
        "passive"
      ]] : [[
        x.value,
        "mouseenter",
        "delayShow",
        "passive"
      ], [
        x.value,
        "mouseleave",
        "delayHide",
        "passive"
      ]]);
    }
    function N() {
      if (x.value !== null || e.scrollTarget !== void 0) {
        y.value = ma(x.value, e.scrollTarget);
        const G = e.noParentEvent === !0 ? H : X;
        h(y.value, G);
      }
    }
    function Z() {
      return c.value === !0 ? f("div", {
        ...n,
        ref: u,
        class: ["q-tooltip q-tooltip--style q-position-engine no-pointer-events", n.class],
        style: [n.style, C.value],
        role: "tooltip"
      }, De(t.default)) : null;
    }
    function B() {
      return f(Pt, k.value, Z);
    }
    return tt(T), Object.assign(i.proxy, { updatePosition: H }), D;
  }
}), jl = re({
  name: "QItem",
  props: {
    ...it,
    ...Gn,
    tag: {
      type: String,
      default: "div"
    },
    active: {
      type: Boolean,
      default: null
    },
    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,
    tabindex: [String, Number],
    focused: Boolean,
    manualFocus: Boolean
  },
  emits: ["click", "keyup"],
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = ye(), l = rt(e, n), { hasLink: o, linkAttrs: i, linkClass: r, linkTag: u, navigateOnClick: c } = Rl(), d = z(null), v = z(null), b = s(() => e.clickable === !0 || o.value === !0 || e.tag === "label"), m = s(() => e.disable !== !0 && b.value === !0), g = s(() => "q-item q-item-type row no-wrap" + (e.dense === !0 ? " q-item--dense" : "") + (l.value === !0 ? " q-item--dark" : "") + (o.value === !0 && e.active === null ? r.value : e.active === !0 ? ` q-item--active${e.activeClass !== void 0 ? ` ${e.activeClass}` : ""}` : "") + (e.disable === !0 ? " disabled" : "") + (m.value === !0 ? " q-item--clickable q-link cursor-pointer " + (e.manualFocus === !0 ? "q-manual-focusable" : "q-focusable q-hoverable") + (e.focused === !0 ? " q-manual-focusable--focused" : "") : "")), p = s(() => e.insetLevel === void 0 ? null : { ["padding" + (n.lang.rtl === !0 ? "Right" : "Left")]: 16 + e.insetLevel * 56 + "px" });
    function k(h) {
      m.value === !0 && (v.value !== null && h.qAvoidFocus !== !0 && (h.qKeyEvent !== !0 && document.activeElement === d.value ? v.value.focus() : document.activeElement === v.value && d.value.focus()), c(h));
    }
    function C(h) {
      if (m.value === !0 && la(h, [13, 32]) === !0) {
        Ye(h), h.qKeyEvent = !0;
        const w = new MouseEvent("click", h);
        w.qKeyEvent = !0, d.value.dispatchEvent(w);
      }
      a("keyup", h);
    }
    function y() {
      const h = Xn(t.default, []);
      return m.value === !0 && h.unshift(f("div", {
        class: "q-focus-helper",
        tabindex: -1,
        ref: v
      })), h;
    }
    return () => {
      const h = {
        ref: d,
        class: g.value,
        style: p.value,
        role: "listitem",
        onClick: k,
        onKeyup: C
      };
      return m.value === !0 ? (h.tabindex = e.tabindex || "0", Object.assign(h, i.value)) : b.value === !0 && (h["aria-disabled"] = "true"), f(u.value, h, y());
    };
  }
}), za = re({
  name: "QItemSection",
  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    noWrap: Boolean
  },
  setup(e, { slots: t }) {
    const a = s(() => `q-item__section column q-item__section--${e.avatar === !0 || e.side === !0 || e.thumbnail === !0 ? "side" : "main"}` + (e.top === !0 ? " q-item__section--top justify-start" : " justify-center") + (e.avatar === !0 ? " q-item__section--avatar" : "") + (e.thumbnail === !0 ? " q-item__section--thumbnail" : "") + (e.noWrap === !0 ? " q-item__section--nowrap" : ""));
    return () => f("div", { class: a.value }, De(t.default));
  }
});
function bu(e, t, a) {
  t.handler ? t.handler(e, a, a.caret) : a.runCmd(t.cmd, t.param);
}
function Ci(e) {
  return f("div", { class: "q-editor__toolbar-group" }, e);
}
function yu(e, t, a, n = !1) {
  const l = n || (t.type === "toggle" ? t.toggled ? t.toggled(e) : t.cmd && e.caret.is(t.cmd, t.param) : !1), o = [];
  if (e.$q.platform.is.desktop && (t.tip || t.htmlTip)) {
    const i = t.key ? f("div", [f("small", `(CTRL + ${String.fromCharCode(t.key)})`)]) : null;
    o.push(f(Nf, { delay: 1e3 }, () => [f("div", t.htmlTip ? { innerHTML: t.htmlTip } : t.tip), i]));
  }
  return f(ft, {
    ...e.buttonProps.value,
    icon: t.icon !== null ? t.icon : void 0,
    color: l ? t.toggleColor || e.props.toolbarToggleColor : t.color || e.props.toolbarColor,
    textColor: l && !e.props.toolbarPush ? null : t.textColor || e.props.toolbarTextColor,
    label: t.label,
    "aria-label": t.label === null ? t.tip : void 0,
    disable: t.disable ? typeof t.disable == "function" ? t.disable(e) : !0 : !1,
    size: "sm",
    onClick(i) {
      a == null || a(), bu(i, t, e);
    }
  }, () => o);
}
function jf(e, t) {
  const a = t.list === "only-icons";
  let n = t.label, l = t.icon !== null ? t.icon : void 0, o, i;
  function r() {
    c.component.proxy.hide();
  }
  if (a)
    i = t.options.map((d) => {
      const v = d.type === void 0 ? e.caret.is(d.cmd, d.param) : !1;
      return v && (n = d.tip, l = d.icon !== null ? d.icon : void 0), yu(e, d, r, v);
    }), o = e.toolbarBackgroundClass.value, i = [Ci(i)];
  else {
    const d = e.props.toolbarToggleColor !== void 0 ? `text-${e.props.toolbarToggleColor}` : null, v = e.props.toolbarTextColor !== void 0 ? `text-${e.props.toolbarTextColor}` : null, b = t.list === "no-icons";
    i = t.options.map((m) => {
      const g = m.disable ? m.disable(e) : !1, p = m.type === void 0 ? e.caret.is(m.cmd, m.param) : !1;
      p && (n = m.tip, l = m.icon !== null ? m.icon : void 0);
      const k = m.htmlTip;
      return f(jl, {
        active: p,
        activeClass: d,
        clickable: !0,
        disable: g,
        dense: !0,
        onClick(C) {
          var y;
          r(), (C == null ? void 0 : C.qAvoidFocus) !== !0 && ((y = e.contentRef.value) == null || y.focus()), e.caret.restore(), bu(C, m, e);
        }
      }, () => [b === !0 ? null : f(za, {
        class: p ? d : v,
        side: !0
      }, () => f(st, { name: m.icon !== null ? m.icon : void 0 })), f(za, k ? () => f("div", {
        class: "text-no-wrap",
        innerHTML: m.htmlTip
      }) : m.tip ? () => f("div", { class: "text-no-wrap" }, m.tip) : void 0)]);
    }), o = [e.toolbarBackgroundClass.value, v];
  }
  const u = t.highlight && n !== t.label, c = f(Zc, {
    ...e.buttonProps.value,
    noCaps: !0,
    noWrap: !0,
    color: u ? e.props.toolbarToggleColor : e.props.toolbarColor,
    textColor: u && !e.props.toolbarPush ? null : e.props.toolbarTextColor,
    label: t.fixedLabel ? t.label : n,
    icon: t.fixedIcon ? t.icon !== null ? t.icon : void 0 : l,
    contentClass: o,
    onShow: (d) => e.emit("dropdownShow", d),
    onHide: (d) => e.emit("dropdownHide", d),
    onBeforeShow: (d) => e.emit("dropdownBeforeShow", d),
    onBeforeHide: (d) => e.emit("dropdownBeforeHide", d)
  }, () => i);
  return c;
}
function Qf(e) {
  if (e.caret) return e.buttons.value.filter((t) => !e.isViewingSource.value || t.find((a) => a.cmd === "viewsource")).map((t) => Ci(t.map((a) => e.isViewingSource.value && a.cmd !== "viewsource" ? !1 : a.type === "slot" ? De(e.slots[a.slot]) : a.type === "dropdown" ? jf(e, a) : yu(e, a))));
}
function Uf(e, t, a, n = {}) {
  const l = Object.keys(n);
  if (l.length === 0) return {};
  const o = { default_font: {
    cmd: "fontName",
    param: e,
    icon: a,
    tip: t
  } };
  return l.forEach((i) => {
    const r = n[i];
    o[i] = {
      cmd: "fontName",
      param: r,
      icon: a,
      tip: r,
      htmlTip: `<font face="${r}">${r}</font>`
    };
  }), o;
}
function Kf(e) {
  if (e.caret) {
    const t = e.props.toolbarColor || e.props.toolbarTextColor;
    let a = e.editLinkUrl.value;
    const n = () => {
      e.caret.restore(), a !== e.editLinkUrl.value && document.execCommand("createLink", !1, a === "" ? " " : a), e.editLinkUrl.value = null;
    };
    return [
      f("div", { class: `q-mx-xs text-${t}` }, `${e.$q.lang.editor.url}: `),
      f("input", {
        key: "qedt_btm_input",
        class: "col q-editor__link-input",
        value: a,
        onInput: (l) => {
          wt(l), a = l.target.value;
        },
        onKeydown: (l) => {
          if (tn(l) !== !0)
            switch (l.keyCode) {
              case 13:
                return Ft(l), n();
              case 27:
                Ft(l), e.caret.restore(), (!e.editLinkUrl.value || e.editLinkUrl.value === "https://") && document.execCommand("unlink"), e.editLinkUrl.value = null;
                break;
            }
        }
      }),
      Ci([f(ft, {
        key: "qedt_btm_rem",
        ...e.buttonProps.value,
        label: e.$q.lang.label.remove,
        noCaps: !0,
        onClick: () => {
          e.caret.restore(), document.execCommand("unlink"), e.editLinkUrl.value = null;
        }
      }), f(ft, {
        key: "qedt_btm_upd",
        ...e.buttonProps.value,
        label: e.$q.lang.label.update,
        noCaps: !0,
        onClick: n
      })])
    ];
  }
}
const hr = /^on[A-Z]/;
function pu() {
  const { attrs: e, vnode: t } = ye(), a = {
    listeners: z({}),
    attributes: z({})
  };
  function n() {
    const l = {}, o = {};
    for (const i in e) i !== "class" && i !== "style" && hr.test(i) === !1 && (l[i] = e[i]);
    for (const i in t.props) hr.test(i) === !0 && (o[i] = t.props[i]);
    a.attributes.value = l, a.listeners.value = o;
  }
  return Yn(n), n(), a;
}
const Wf = Object.prototype.toString, yo = Object.prototype.hasOwnProperty, Yf = new Set([
  "Boolean",
  "Number",
  "String",
  "Function",
  "Array",
  "Date",
  "RegExp"
].map((e) => "[object " + e + "]"));
function br(e) {
  if (e !== Object(e) || Yf.has(Wf.call(e)) === !0 || e.constructor && yo.call(e, "constructor") === !1 && yo.call(e.constructor.prototype, "isPrototypeOf") === !1) return !1;
  let t;
  for (t in e) ;
  return t === void 0 || yo.call(e, t);
}
function ku() {
  let e, t, a, n, l, o, i = arguments[0] || {}, r = 1, u = !1;
  const c = arguments.length;
  for (typeof i == "boolean" && (u = i, i = arguments[1] || {}, r = 2), Object(i) !== i && typeof i != "function" && (i = {}), c === r && (i = this, r--); r < c; r++) if ((e = arguments[r]) !== null) for (t in e)
    a = i[t], n = e[t], i !== n && (u === !0 && n && ((l = Array.isArray(n)) || br(n) === !0) ? (l === !0 ? o = Array.isArray(a) === !0 ? a : [] : o = br(a) === !0 ? a : {}, i[t] = ku(u, o, n)) : n !== void 0 && (i[t] = n));
  return i;
}
re({
  name: "QEditor",
  props: {
    ...it,
    ...mi,
    modelValue: {
      type: String,
      required: !0
    },
    readonly: Boolean,
    disable: Boolean,
    minHeight: {
      type: String,
      default: "10rem"
    },
    maxHeight: String,
    height: String,
    definitions: Object,
    fonts: Object,
    placeholder: String,
    toolbar: {
      type: Array,
      validator: (e) => e.length === 0 || e.every((t) => t.length),
      default: () => [
        [
          "left",
          "center",
          "right",
          "justify"
        ],
        [
          "bold",
          "italic",
          "underline",
          "strike"
        ],
        ["undo", "redo"]
      ]
    },
    toolbarColor: String,
    toolbarBg: String,
    toolbarTextColor: String,
    toolbarToggleColor: {
      type: String,
      default: "primary"
    },
    toolbarOutline: Boolean,
    toolbarPush: Boolean,
    toolbarRounded: Boolean,
    paragraphTag: {
      type: String,
      validator: (e) => ["div", "p"].includes(e),
      default: "div"
    },
    contentStyle: Object,
    contentClass: [
      Object,
      Array,
      String
    ],
    square: Boolean,
    flat: Boolean,
    dense: Boolean
  },
  emits: [
    ...gi,
    "update:modelValue",
    "keydown",
    "click",
    "focus",
    "blur",
    "dropdownShow",
    "dropdownHide",
    "dropdownBeforeShow",
    "dropdownBeforeHide",
    "linkShow",
    "linkHide"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), { $q: l } = n, o = rt(e, l), { inFullscreen: i, toggleFullscreen: r } = hi(), u = pu(), c = z(null), d = z(null), v = z(null), b = z(!1), m = s(() => !e.readonly && !e.disable);
    let g, p, k = e.modelValue;
    document.execCommand("defaultParagraphSeparator", !1, e.paragraphTag), g = window.getComputedStyle(document.body).fontFamily;
    const C = s(() => e.toolbarBg ? ` bg-${e.toolbarBg}` : ""), y = s(() => ({
      type: "a",
      flat: e.toolbarOutline !== !0 && e.toolbarPush !== !0,
      noWrap: !0,
      outline: e.toolbarOutline,
      push: e.toolbarPush,
      rounded: e.toolbarRounded,
      dense: !0,
      color: e.toolbarColor,
      disable: !m.value,
      size: "sm"
    })), h = s(() => {
      const P = l.lang.editor, I = l.iconSet.editor;
      return {
        bold: {
          cmd: "bold",
          icon: I.bold,
          tip: P.bold,
          key: 66
        },
        italic: {
          cmd: "italic",
          icon: I.italic,
          tip: P.italic,
          key: 73
        },
        strike: {
          cmd: "strikeThrough",
          icon: I.strikethrough,
          tip: P.strikethrough,
          key: 83
        },
        underline: {
          cmd: "underline",
          icon: I.underline,
          tip: P.underline,
          key: 85
        },
        unordered: {
          cmd: "insertUnorderedList",
          icon: I.unorderedList,
          tip: P.unorderedList
        },
        ordered: {
          cmd: "insertOrderedList",
          icon: I.orderedList,
          tip: P.orderedList
        },
        subscript: {
          cmd: "subscript",
          icon: I.subscript,
          tip: P.subscript,
          htmlTip: "x<subscript>2</subscript>"
        },
        superscript: {
          cmd: "superscript",
          icon: I.superscript,
          tip: P.superscript,
          htmlTip: "x<superscript>2</superscript>"
        },
        link: {
          cmd: "link",
          disable: (de) => de.caret && !de.caret.can("link"),
          icon: I.hyperlink,
          tip: P.hyperlink,
          key: 76
        },
        fullscreen: {
          cmd: "fullscreen",
          icon: I.toggleFullscreen,
          tip: P.toggleFullscreen,
          key: 70
        },
        viewsource: {
          cmd: "viewsource",
          icon: I.viewSource,
          tip: P.viewSource
        },
        quote: {
          cmd: "formatBlock",
          param: "BLOCKQUOTE",
          icon: I.quote,
          tip: P.quote,
          key: 81
        },
        left: {
          cmd: "justifyLeft",
          icon: I.left,
          tip: P.left
        },
        center: {
          cmd: "justifyCenter",
          icon: I.center,
          tip: P.center
        },
        right: {
          cmd: "justifyRight",
          icon: I.right,
          tip: P.right
        },
        justify: {
          cmd: "justifyFull",
          icon: I.justify,
          tip: P.justify
        },
        print: {
          type: "no-state",
          cmd: "print",
          icon: I.print,
          tip: P.print,
          key: 80
        },
        outdent: {
          type: "no-state",
          disable: (de) => de.caret && !de.caret.can("outdent"),
          cmd: "outdent",
          icon: I.outdent,
          tip: P.outdent
        },
        indent: {
          type: "no-state",
          disable: (de) => de.caret && !de.caret.can("indent"),
          cmd: "indent",
          icon: I.indent,
          tip: P.indent
        },
        removeFormat: {
          type: "no-state",
          cmd: "removeFormat",
          icon: I.removeFormat,
          tip: P.removeFormat
        },
        hr: {
          type: "no-state",
          cmd: "insertHorizontalRule",
          icon: I.hr,
          tip: P.hr
        },
        undo: {
          type: "no-state",
          cmd: "undo",
          icon: I.undo,
          tip: P.undo,
          key: 90
        },
        redo: {
          type: "no-state",
          cmd: "redo",
          icon: I.redo,
          tip: P.redo,
          key: 89
        },
        h1: {
          cmd: "formatBlock",
          param: "H1",
          icon: I.heading1 || I.heading,
          tip: P.heading1,
          htmlTip: `<h1 class="q-ma-none">${P.heading1}</h1>`
        },
        h2: {
          cmd: "formatBlock",
          param: "H2",
          icon: I.heading2 || I.heading,
          tip: P.heading2,
          htmlTip: `<h2 class="q-ma-none">${P.heading2}</h2>`
        },
        h3: {
          cmd: "formatBlock",
          param: "H3",
          icon: I.heading3 || I.heading,
          tip: P.heading3,
          htmlTip: `<h3 class="q-ma-none">${P.heading3}</h3>`
        },
        h4: {
          cmd: "formatBlock",
          param: "H4",
          icon: I.heading4 || I.heading,
          tip: P.heading4,
          htmlTip: `<h4 class="q-ma-none">${P.heading4}</h4>`
        },
        h5: {
          cmd: "formatBlock",
          param: "H5",
          icon: I.heading5 || I.heading,
          tip: P.heading5,
          htmlTip: `<h5 class="q-ma-none">${P.heading5}</h5>`
        },
        h6: {
          cmd: "formatBlock",
          param: "H6",
          icon: I.heading6 || I.heading,
          tip: P.heading6,
          htmlTip: `<h6 class="q-ma-none">${P.heading6}</h6>`
        },
        p: {
          cmd: "formatBlock",
          param: e.paragraphTag,
          icon: I.heading,
          tip: P.paragraph
        },
        code: {
          cmd: "formatBlock",
          param: "PRE",
          icon: I.code,
          htmlTip: `<code>${P.code}</code>`
        },
        "size-1": {
          cmd: "fontSize",
          param: "1",
          icon: I.size1 || I.size,
          tip: P.size1,
          htmlTip: `<font size="1">${P.size1}</font>`
        },
        "size-2": {
          cmd: "fontSize",
          param: "2",
          icon: I.size2 || I.size,
          tip: P.size2,
          htmlTip: `<font size="2">${P.size2}</font>`
        },
        "size-3": {
          cmd: "fontSize",
          param: "3",
          icon: I.size3 || I.size,
          tip: P.size3,
          htmlTip: `<font size="3">${P.size3}</font>`
        },
        "size-4": {
          cmd: "fontSize",
          param: "4",
          icon: I.size4 || I.size,
          tip: P.size4,
          htmlTip: `<font size="4">${P.size4}</font>`
        },
        "size-5": {
          cmd: "fontSize",
          param: "5",
          icon: I.size5 || I.size,
          tip: P.size5,
          htmlTip: `<font size="5">${P.size5}</font>`
        },
        "size-6": {
          cmd: "fontSize",
          param: "6",
          icon: I.size6 || I.size,
          tip: P.size6,
          htmlTip: `<font size="6">${P.size6}</font>`
        },
        "size-7": {
          cmd: "fontSize",
          param: "7",
          icon: I.size7 || I.size,
          tip: P.size7,
          htmlTip: `<font size="7">${P.size7}</font>`
        }
      };
    }), w = s(() => {
      const P = e.definitions || {}, I = e.definitions || e.fonts ? ku(!0, {}, h.value, P, Uf(g, l.lang.editor.defaultFont, l.iconSet.editor.font, e.fonts)) : h.value;
      return e.toolbar.map((de) => de.map((Y) => {
        if (Y.options) return {
          type: "dropdown",
          icon: Y.icon,
          label: Y.label,
          size: "sm",
          dense: !0,
          fixedLabel: Y.fixedLabel,
          fixedIcon: Y.fixedIcon,
          highlight: Y.highlight,
          list: Y.list,
          options: Y.options.map((W) => I[W])
        };
        const fe = I[Y];
        return fe ? fe.type === "no-state" || P[Y] && (fe.cmd === void 0 || h.value[fe.cmd] && h.value[fe.cmd].type === "no-state") ? fe : Object.assign({ type: "toggle" }, fe) : {
          type: "slot",
          slot: Y
        };
      }));
    }), x = {
      $q: l,
      props: e,
      slots: t,
      emit: a,
      inFullscreen: i,
      toggleFullscreen: r,
      runCmd: B,
      isViewingSource: b,
      editLinkUrl: v,
      toolbarBackgroundClass: C,
      buttonProps: y,
      contentRef: d,
      buttons: w,
      setContent: Z
    };
    se(() => e.modelValue, (P) => {
      k !== P && (k = P, Z(P, !0));
    }), se(v, (P) => {
      a(`link${P ? "Show" : "Hide"}`);
    });
    const L = s(() => e.toolbar && e.toolbar.length !== 0), M = s(() => {
      const P = {}, I = (de) => {
        de.key && (P[de.key] = {
          cmd: de.cmd,
          param: de.param
        });
      };
      return w.value.forEach((de) => {
        de.forEach((Y) => {
          Y.options ? Y.options.forEach(I) : I(Y);
        });
      }), P;
    }), K = s(() => i.value ? e.contentStyle : [{
      minHeight: e.minHeight,
      height: e.height,
      maxHeight: e.maxHeight
    }, e.contentStyle]), X = s(() => `q-editor q-editor--${b.value === !0 ? "source" : "default"}` + (e.disable === !0 ? " disabled" : "") + (i.value === !0 ? " fullscreen column" : "") + (e.square === !0 ? " q-editor--square no-border-radius" : "") + (e.flat === !0 ? " q-editor--flat" : "") + (e.dense === !0 ? " q-editor--dense" : "") + (o.value === !0 ? " q-editor--dark q-dark" : "")), A = s(() => [
      e.contentClass,
      "q-editor__content",
      {
        col: i.value,
        "overflow-auto": i.value || e.maxHeight
      }
    ]), $ = s(() => e.disable === !0 ? { "aria-disabled": "true" } : {});
    function D() {
      if (d.value !== null) {
        const P = `inner${b.value === !0 ? "Text" : "HTML"}`, I = d.value[P];
        I !== e.modelValue && (k = I, a("update:modelValue", I));
      }
    }
    function _(P) {
      if (a("keydown", P), P.ctrlKey !== !0 || tn(P) === !0) {
        G();
        return;
      }
      const I = P.keyCode, de = M.value[I];
      if (de !== void 0) {
        const { cmd: Y, param: fe } = de;
        Ye(P), B(Y, fe, !1);
      }
    }
    function S(P) {
      G(), a("click", P);
    }
    function T(P) {
      if (d.value !== null) {
        const { scrollTop: I, scrollHeight: de } = d.value;
        p = de - I;
      }
      x.caret.save(), a("blur", P);
    }
    function H(P) {
      nt(() => {
        d.value !== null && p !== void 0 && (d.value.scrollTop = d.value.scrollHeight - p);
      }), a("focus", P);
    }
    function E(P) {
      const I = c.value;
      if (I !== null && I.contains(P.target) === !0 && (P.relatedTarget === null || I.contains(P.relatedTarget) !== !0)) {
        const de = `inner${b.value === !0 ? "Text" : "HTML"}`;
        x.caret.restorePosition(d.value[de].length), G();
      }
    }
    function Q(P) {
      const I = c.value;
      I !== null && I.contains(P.target) === !0 && (P.relatedTarget === null || I.contains(P.relatedTarget) !== !0) && (x.caret.savePosition(), G());
    }
    function j() {
      p = void 0;
    }
    function N() {
      x.caret.save();
    }
    function Z(P, I) {
      if (d.value !== null) {
        I === !0 && x.caret.savePosition();
        const de = `inner${b.value === !0 ? "Text" : "HTML"}`;
        d.value[de] = P, I === !0 && (x.caret.restorePosition(d.value[de].length), G());
      }
    }
    function B(P, I, de = !0) {
      V(), x.caret.restore(), x.caret.apply(P, I, () => {
        V(), x.caret.save(), de && G();
      });
    }
    function G() {
      setTimeout(() => {
        v.value = null, n.$forceUpdate();
      }, 1);
    }
    function V() {
      Mn(() => {
        var P;
        (P = d.value) == null || P.focus({ preventScroll: !0 });
      });
    }
    function oe() {
      return d.value;
    }
    return bt(() => {
      x.caret = n.caret = new Hf(d.value, x), Z(e.modelValue), G(), document.addEventListener("selectionchange", N);
    }), tt(() => {
      document.removeEventListener("selectionchange", N);
    }), Object.assign(n, {
      runCmd: B,
      refreshToolbar: G,
      focus: V,
      getContentEl: oe
    }), () => {
      let P;
      if (L.value) {
        const I = [f("div", {
          key: "qedt_top",
          class: "q-editor__toolbar row no-wrap scroll-x" + C.value
        }, Qf(x))];
        v.value !== null && I.push(f("div", {
          key: "qedt_btm",
          class: "q-editor__toolbar row no-wrap items-center scroll-x" + C.value
        }, Kf(x))), P = f("div", {
          key: "toolbar_ctainer",
          class: "q-editor__toolbars-container"
        }, I);
      }
      return f("div", {
        ref: c,
        class: X.value,
        style: { height: i.value === !0 ? "100%" : null },
        ...$.value,
        onFocusin: E,
        onFocusout: Q
      }, [P, f("div", {
        ref: d,
        style: K.value,
        class: A.value,
        contenteditable: m.value,
        placeholder: e.placeholder,
        ...u.listeners.value,
        onInput: D,
        onKeydown: _,
        onClick: S,
        onBlur: T,
        onFocus: H,
        onMousedown: j,
        onTouchstartPassive: j
      })]);
    };
  }
});
var Ho = re({
  name: "QItemLabel",
  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [Number, String]
  },
  setup(e, { slots: t }) {
    const a = s(() => parseInt(e.lines, 10)), n = s(() => "q-item__label" + (e.overline === !0 ? " q-item__label--overline text-overline" : "") + (e.caption === !0 ? " q-item__label--caption text-caption" : "") + (e.header === !0 ? " q-item__label--header" : "") + (a.value === 1 ? " ellipsis" : "")), l = s(() => e.lines !== void 0 && a.value > 1 ? {
      overflow: "hidden",
      display: "-webkit-box",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": a.value
    } : null);
    return () => f("div", {
      style: l.value,
      class: n.value
    }, De(t.default));
  }
}), Si = re({
  name: "QSlideTransition",
  props: {
    appear: Boolean,
    duration: {
      type: Number,
      default: 300
    }
  },
  emits: ["show", "hide"],
  setup(e, { slots: t, emit: a }) {
    let n = !1, l, o, i = null, r = null, u, c;
    function d() {
      l == null || l(), l = null, n = !1, i !== null && (clearTimeout(i), i = null), r !== null && (clearTimeout(r), r = null), o == null || o.removeEventListener("transitionend", u), u = null;
    }
    function v(p, k, C) {
      k !== void 0 && (p.style.height = `${k}px`), p.style.transition = `height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`, n = !0, l = C;
    }
    function b(p, k) {
      p.style.overflowY = null, p.style.height = null, p.style.transition = null, d(), k !== c && a(k);
    }
    function m(p, k) {
      let C = 0;
      o = p, n === !0 ? (d(), C = p.offsetHeight === p.scrollHeight ? 0 : void 0) : (c = "hide", p.style.overflowY = "hidden"), v(p, C, k), i = setTimeout(() => {
        i = null, p.style.height = `${p.scrollHeight}px`, u = (y) => {
          r = null, (Object(y) !== y || y.target === p) && b(p, "show");
        }, p.addEventListener("transitionend", u), r = setTimeout(u, e.duration * 1.1);
      }, 100);
    }
    function g(p, k) {
      let C;
      o = p, n === !0 ? d() : (c = "show", p.style.overflowY = "hidden", C = p.scrollHeight), v(p, C, k), i = setTimeout(() => {
        i = null, p.style.height = 0, u = (y) => {
          r = null, (Object(y) !== y || y.target === p) && b(p, "hide");
        }, p.addEventListener("transitionend", u), r = setTimeout(u, e.duration * 1.1);
      }, 100);
    }
    return tt(() => {
      n === !0 && d();
    }), () => f(Pt, {
      css: !1,
      appear: e.appear,
      onEnter: m,
      onLeave: g
    }, t.default);
  }
});
const Xf = {
  true: "inset",
  item: "item-inset",
  "item-thumbnail": "item-thumbnail-inset"
}, po = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
};
var Za = re({
  name: "QSeparator",
  props: {
    ...it,
    spaced: [Boolean, String],
    inset: [Boolean, String],
    vertical: Boolean,
    color: String,
    size: String
  },
  setup(e) {
    const t = rt(e, ye().proxy.$q), a = s(() => e.vertical === !0 ? "vertical" : "horizontal"), n = s(() => ` q-separator--${a.value}`), l = s(() => e.inset !== !1 ? `${n.value}-${Xf[e.inset]}` : ""), o = s(() => `q-separator${n.value}${l.value}` + (e.color !== void 0 ? ` bg-${e.color}` : "") + (t.value === !0 ? " q-separator--dark" : "")), i = s(() => {
      const r = {};
      if (e.size !== void 0 && (r[e.vertical === !0 ? "width" : "height"] = e.size), e.spaced !== !1) {
        const u = e.spaced === !0 ? `${po.md}px` : e.spaced in po ? `${po[e.spaced]}px` : e.spaced, c = e.vertical === !0 ? ["Left", "Right"] : ["Top", "Bottom"];
        r[`margin${c[0]}`] = r[`margin${c[1]}`] = u;
      }
      return r;
    });
    return () => f("hr", {
      class: o.value,
      style: i.value,
      "aria-orientation": a.value
    });
  }
});
const Ea = bd({}), Gf = Object.keys(Gn);
re({
  name: "QExpansionItem",
  props: {
    ...Gn,
    ...qn,
    ...it,
    icon: String,
    label: String,
    labelLines: [Number, String],
    caption: String,
    captionLines: [Number, String],
    dense: Boolean,
    toggleAriaLabel: String,
    expandIcon: String,
    expandedIcon: String,
    expandIconClass: [
      Array,
      String,
      Object
    ],
    duration: {},
    headerInsetLevel: Number,
    contentInsetLevel: Number,
    expandSeparator: Boolean,
    defaultOpened: Boolean,
    hideExpandIcon: Boolean,
    expandIconToggle: Boolean,
    switchToggleSide: Boolean,
    denseToggle: Boolean,
    group: String,
    popup: Boolean,
    headerStyle: [
      Array,
      String,
      Object
    ],
    headerClass: [
      Array,
      String,
      Object
    ]
  },
  emits: [
    ...Bn,
    "click",
    "afterShow",
    "afterHide"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = ye(), l = rt(e, n), o = z(e.modelValue !== null ? e.modelValue : e.defaultOpened), i = z(null), r = Hl(), { show: u, hide: c, toggle: d } = Tn({ showing: o });
    let v, b;
    const m = s(() => `q-expansion-item q-item-type q-expansion-item--${o.value === !0 ? "expanded" : "collapsed"} q-expansion-item--${e.popup === !0 ? "popup" : "standard"}`), g = s(() => e.contentInsetLevel === void 0 ? null : { ["padding" + (n.lang.rtl === !0 ? "Right" : "Left")]: e.contentInsetLevel * 56 + "px" }), p = s(() => e.disable !== !0 && (e.href !== void 0 || e.to !== void 0 && e.to !== null && e.to !== "")), k = s(() => {
      const E = {};
      return Gf.forEach((Q) => {
        E[Q] = e[Q];
      }), E;
    }), C = s(() => p.value === !0 || e.expandIconToggle !== !0), y = s(() => e.expandedIcon !== void 0 && o.value === !0 ? e.expandedIcon : e.expandIcon || n.iconSet.expansionItem[e.denseToggle === !0 ? "denseIcon" : "icon"]), h = s(() => e.disable !== !0 && (p.value === !0 || e.expandIconToggle === !0)), w = s(() => ({
      expanded: o.value === !0,
      detailsId: r.value,
      toggle: d,
      show: u,
      hide: c
    })), x = s(() => {
      const E = e.toggleAriaLabel !== void 0 ? e.toggleAriaLabel : n.lang.label[o.value === !0 ? "collapse" : "expand"](e.label);
      return {
        role: "button",
        "aria-expanded": o.value === !0 ? "true" : "false",
        "aria-controls": r.value,
        "aria-label": E
      };
    });
    se(() => e.group, (E) => {
      b == null || b(), E !== void 0 && $();
    });
    function L(E) {
      p.value !== !0 && d(E), a("click", E);
    }
    function M(E) {
      E.keyCode === 13 && K(E, !0);
    }
    function K(E, Q) {
      var j;
      Q !== !0 && E.qAvoidFocus !== !0 && ((j = i.value) == null || j.focus()), d(E), Ye(E);
    }
    function X() {
      a("afterShow");
    }
    function A() {
      a("afterHide");
    }
    function $() {
      v === void 0 && (v = Un()), o.value === !0 && (Ea[e.group] = v);
      const E = se(o, (j) => {
        j === !0 ? Ea[e.group] = v : Ea[e.group] === v && delete Ea[e.group];
      }), Q = se(() => Ea[e.group], (j, N) => {
        N === v && j !== void 0 && j !== v && c();
      });
      b = () => {
        E(), Q(), Ea[e.group] === v && delete Ea[e.group], b = void 0;
      };
    }
    function D() {
      const E = {
        class: [`q-focusable relative-position cursor-pointer${e.denseToggle === !0 && e.switchToggleSide === !0 ? " items-end" : ""}`, e.expandIconClass],
        side: e.switchToggleSide !== !0,
        avatar: e.switchToggleSide
      }, Q = [f(st, {
        class: "q-expansion-item__toggle-icon" + (e.expandedIcon === void 0 && o.value === !0 ? " q-expansion-item__toggle-icon--rotated" : ""),
        name: y.value
      })];
      return h.value === !0 && (Object.assign(E, {
        tabindex: 0,
        ...x.value,
        onClick: K,
        onKeyup: M
      }), Q.unshift(f("div", {
        ref: i,
        class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
        tabindex: -1
      }))), f(za, E, () => Q);
    }
    function _() {
      let E;
      return t.header !== void 0 ? E = [].concat(t.header(w.value)) : (E = [f(za, () => [f(Ho, { lines: e.labelLines }, () => e.label || ""), e.caption ? f(Ho, {
        lines: e.captionLines,
        caption: !0
      }, () => e.caption) : null])], e.icon && E[e.switchToggleSide === !0 ? "push" : "unshift"](f(za, {
        side: e.switchToggleSide === !0,
        avatar: e.switchToggleSide !== !0
      }, () => f(st, { name: e.icon })))), e.disable !== !0 && e.hideExpandIcon !== !0 && E[e.switchToggleSide === !0 ? "unshift" : "push"](D()), E;
    }
    function S() {
      const E = {
        ref: "item",
        style: e.headerStyle,
        class: e.headerClass,
        dark: l.value,
        disable: e.disable,
        dense: e.dense,
        insetLevel: e.headerInsetLevel
      };
      return C.value === !0 && (E.clickable = !0, E.onClick = L, Object.assign(E, p.value === !0 ? k.value : x.value)), f(jl, E, _);
    }
    function T() {
      return aa(f("div", {
        key: "e-content",
        class: "q-expansion-item__content relative-position",
        style: g.value,
        id: r.value
      }, De(t.default)), [[Wo, o.value]]);
    }
    function H() {
      const E = [S(), f(Si, {
        duration: e.duration,
        onShow: X,
        onHide: A
      }, T)];
      return e.expandSeparator === !0 && E.push(f(Za, {
        class: "q-expansion-item__border q-expansion-item__border--top absolute-top",
        dark: l.value
      }), f(Za, {
        class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",
        dark: l.value
      })), E;
    }
    return e.group !== void 0 && $(), tt(() => {
      b == null || b();
    }), () => f("div", { class: m.value }, [f("div", { class: "q-expansion-item__container relative-position" }, H())]);
  }
});
const Zf = [
  "top",
  "right",
  "bottom",
  "left"
], No = {
  type: {
    type: String,
    default: "a"
  },
  outline: Boolean,
  push: Boolean,
  flat: Boolean,
  unelevated: Boolean,
  color: String,
  textColor: String,
  glossy: Boolean,
  square: Boolean,
  padding: String,
  label: {
    type: [String, Number],
    default: ""
  },
  labelPosition: {
    type: String,
    default: "right",
    validator: (e) => Zf.includes(e)
  },
  externalLabel: Boolean,
  hideLabel: { type: Boolean },
  labelClass: [
    Array,
    String,
    Object
  ],
  labelStyle: [
    Array,
    String,
    Object
  ],
  disable: Boolean,
  tabindex: [Number, String]
};
function Cu(e, t) {
  return {
    formClass: s(() => `q-fab--form-${e.square === !0 ? "square" : "rounded"}`),
    stacked: s(() => e.externalLabel === !1 && ["top", "bottom"].includes(e.labelPosition)),
    labelProps: s(() => {
      if (e.externalLabel === !0) {
        const a = e.hideLabel === null ? t.value === !1 : e.hideLabel;
        return {
          action: "push",
          data: {
            class: [e.labelClass, `q-fab__label q-tooltip--style q-fab__label--external q-fab__label--external-${e.labelPosition}` + (a === !0 ? " q-fab__label--external-hidden" : "")],
            style: e.labelStyle
          }
        };
      }
      return {
        action: ["left", "top"].includes(e.labelPosition) ? "unshift" : "push",
        data: {
          class: [e.labelClass, `q-fab__label q-fab__label--internal q-fab__label--internal-${e.labelPosition}` + (e.hideLabel === !0 ? " q-fab__label--internal-hidden" : "")],
          style: e.labelStyle
        }
      };
    })
  };
}
const Jf = [
  "up",
  "right",
  "down",
  "left"
], ev = [
  "left",
  "center",
  "right"
];
re({
  name: "QFab",
  props: {
    ...No,
    ...qn,
    icon: String,
    activeIcon: String,
    hideIcon: Boolean,
    hideLabel: {
      ...No.hideLabel,
      default: null
    },
    direction: {
      type: String,
      default: "right",
      validator: (e) => Jf.includes(e)
    },
    persistent: Boolean,
    verticalActionsAlign: {
      type: String,
      default: "center",
      validator: (e) => ev.includes(e)
    }
  },
  emits: Bn,
  setup(e, { slots: t }) {
    const a = z(null), n = z(e.modelValue === !0), l = Hl(), { proxy: { $q: o } } = ye(), { formClass: i, labelProps: r } = Cu(e, n), { hide: u, toggle: c } = Tn({
      showing: n,
      hideOnRouteChange: s(() => e.persistent !== !0)
    }), d = s(() => ({ opened: n.value })), v = s(() => `q-fab z-fab row inline justify-center q-fab--align-${e.verticalActionsAlign} ${i.value}` + (n.value === !0 ? " q-fab--opened" : " q-fab--closed")), b = s(() => `q-fab__actions flex no-wrap inline q-fab__actions--${e.direction} q-fab__actions--${n.value === !0 ? "opened" : "closed"}`), m = s(() => {
      const C = {
        id: l.value,
        role: "menu"
      };
      return n.value !== !0 && (C["aria-hidden"] = "true"), C;
    }), g = s(() => `q-fab__icon-holder  q-fab__icon-holder--${n.value === !0 ? "opened" : "closed"}`);
    function p(C, y) {
      const h = t[C], w = `q-fab__${C} absolute-full`;
      return h === void 0 ? f(st, {
        class: w,
        name: e[y] || o.iconSet.fab[y]
      }) : f("div", { class: w }, h(d.value));
    }
    function k() {
      const C = [];
      return e.hideIcon !== !0 && C.push(f("div", { class: g.value }, [p("icon", "icon"), p("active-icon", "activeIcon")])), (e.label !== "" || t.label !== void 0) && C[r.value.action](f("div", r.value.data, t.label !== void 0 ? t.label(d.value) : [e.label])), $t(t.tooltip, C);
    }
    return Va(rs, {
      showing: n,
      onChildClick(C) {
        var y;
        u(C), (C == null ? void 0 : C.qAvoidFocus) !== !0 && ((y = a.value) == null || y.$el.focus());
      }
    }), () => f("div", { class: v.value }, [f(ft, {
      ref: a,
      class: i.value,
      ...e,
      noWrap: !0,
      stack: e.stacked,
      align: void 0,
      icon: void 0,
      label: void 0,
      noCaps: !0,
      fab: !0,
      "aria-expanded": n.value === !0 ? "true" : "false",
      "aria-haspopup": "true",
      "aria-controls": l.value,
      onClick: c
    }, k), f("div", {
      class: b.value,
      ...m.value
    }, De(t.default))]);
  }
});
const Su = {
  start: "self-end",
  center: "self-center",
  end: "self-start"
}, tv = Object.keys(Su);
re({
  name: "QFabAction",
  props: {
    ...No,
    icon: {
      type: String,
      default: ""
    },
    anchor: {
      type: String,
      validator: (e) => tv.includes(e)
    },
    to: [String, Object],
    replace: Boolean
  },
  emits: ["click"],
  setup(e, { slots: t, emit: a }) {
    const n = Yt(rs, () => ({
      showing: { value: !0 },
      onChildClick: At
    })), { formClass: l, labelProps: o } = Cu(e, n.showing), i = s(() => {
      const v = Su[e.anchor];
      return l.value + (v !== void 0 ? ` ${v}` : "");
    }), r = s(() => e.disable === !0 || n.showing.value !== !0);
    function u(v) {
      n.onChildClick(v), a("click", v);
    }
    function c() {
      const v = [];
      return t.icon !== void 0 ? v.push(t.icon()) : e.icon !== "" && v.push(f(st, { name: e.icon })), (e.label !== "" || t.label !== void 0) && v[o.value.action](f("div", o.value.data, t.label !== void 0 ? t.label() : [e.label])), $t(t.default, v);
    }
    const d = ye();
    return Object.assign(d.proxy, { click: u }), () => f(ft, {
      class: i.value,
      ...e,
      noWrap: !0,
      stack: e.stacked,
      icon: void 0,
      label: void 0,
      noCaps: !0,
      fabMini: !0,
      disable: r.value,
      onClick: u
    }, c);
  }
});
function av({ validate: e, resetValidation: t, requiresQForm: a }) {
  const n = Yt(ss, !1);
  if (n !== !1) {
    const { props: l, proxy: o } = ye();
    Object.assign(o, {
      validate: e,
      resetValidation: t
    }), se(() => l.disable, (i) => {
      i === !0 ? (typeof t == "function" && t(), n.unbindComponent(o)) : n.bindComponent(o);
    }), bt(() => {
      l.disable !== !0 && n.bindComponent(o);
    }), tt(() => {
      l.disable !== !0 && n.unbindComponent(o);
    });
  } else a === !0 && console.error("Parent QForm not found on useFormChild()!");
}
const nv = [
  !0,
  !1,
  "ondemand"
], lv = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    default: !1,
    validator: (e) => nv.includes(e)
  }
};
function ov(e, t) {
  const { props: a, proxy: n } = ye(), l = z(!1), o = z(null), i = z(!1);
  av({
    validate: p,
    resetValidation: g
  });
  let r = 0, u;
  const c = s(() => a.rules !== void 0 && a.rules !== null && a.rules.length !== 0), d = s(() => a.disable !== !0 && c.value === !0 && t.value === !1), v = s(() => a.error === !0 || l.value === !0), b = s(() => typeof a.errorMessage == "string" && a.errorMessage.length !== 0 ? a.errorMessage : o.value);
  se(() => a.modelValue, () => {
    i.value = !0, d.value === !0 && a.lazyRules === !1 && k();
  });
  function m() {
    a.lazyRules !== "ondemand" && d.value === !0 && i.value === !0 && k();
  }
  se(() => a.reactiveRules, (C) => {
    C === !0 ? u === void 0 && (u = se(() => a.rules, m, {
      immediate: !0,
      deep: !0
    })) : u !== void 0 && (u(), u = void 0);
  }, { immediate: !0 }), se(() => a.lazyRules, m), se(e, (C) => {
    C === !0 ? i.value = !0 : d.value === !0 && a.lazyRules !== "ondemand" && k();
  });
  function g() {
    r++, t.value = !1, i.value = !1, l.value = !1, o.value = null, k.cancel();
  }
  function p(C = a.modelValue) {
    if (a.disable === !0 || c.value === !1) return !0;
    const y = ++r, h = t.value !== !0 ? () => {
      i.value = !0;
    } : () => {
    }, w = (L, M) => {
      L === !0 && h(), l.value = L, o.value = M || null, t.value = !1;
    }, x = [];
    for (let L = 0; L < a.rules.length; L++) {
      const M = a.rules[L];
      let K;
      if (typeof M == "function" ? K = M(C, bl) : typeof M == "string" && bl[M] !== void 0 && (K = bl[M](C)), K === !1 || typeof K == "string")
        return w(!0, K), !1;
      K !== !0 && K !== void 0 && x.push(K);
    }
    return x.length === 0 ? (w(!1), !0) : (t.value = !0, Promise.all(x).then((L) => {
      if (L === void 0 || Array.isArray(L) === !1 || L.length === 0)
        return y === r && w(!1), !0;
      const M = L.find((K) => K === !1 || typeof K == "string");
      return y === r && w(M !== void 0, M), M === void 0;
    }, (L) => (y === r && (console.error(L), w(!0)), !1)));
  }
  const k = $n(p, 0);
  return tt(() => {
    u == null || u(), k.cancel();
  }), Object.assign(n, {
    resetValidation: g,
    validate: p
  }), Rt(n, "hasError", () => v.value), {
    isDirtyModel: i,
    hasRules: c,
    hasError: v,
    errorMessage: b,
    validate: p,
    resetValidation: g
  };
}
function Ja(e) {
  return e != null && String(e).length !== 0;
}
const wu = {
  ...it,
  ...lv,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String
}, Ql = {
  ...wu,
  maxlength: [Number, String]
}, Ul = [
  "update:modelValue",
  "clear",
  "focus",
  "blur"
];
function Kl({ requiredForAttr: e = !0, tagProp: t, changeEvent: a = !1 } = {}) {
  const { props: n, proxy: l } = ye(), o = rt(n, l.$q), i = Hl({
    required: e,
    getValue: () => n.for
  });
  return {
    requiredForAttr: e,
    changeEvent: a,
    tag: t === !0 ? s(() => n.tag) : { value: "label" },
    isDark: o,
    editable: s(() => n.disable !== !0 && n.readonly !== !0),
    innerLoading: z(!1),
    focused: z(!1),
    hasPopupOpen: !1,
    splitAttrs: pu(),
    targetUid: i,
    rootRef: z(null),
    targetRef: z(null),
    controlRef: z(null)
  };
}
function Wl(e) {
  const { props: t, emit: a, slots: n, attrs: l, proxy: o } = ye(), { $q: i } = o;
  let r = null;
  e.hasValue === void 0 && (e.hasValue = s(() => Ja(t.modelValue))), e.emitValue === void 0 && (e.emitValue = (Q) => {
    a("update:modelValue", Q);
  }), e.controlEvents === void 0 && (e.controlEvents = {
    onFocusin: X,
    onFocusout: A
  }), Object.assign(e, {
    clearValue: $,
    onControlFocusin: X,
    onControlFocusout: A,
    focus: M
  }), e.computedCounter === void 0 && (e.computedCounter = s(() => {
    if (t.counter !== !1) {
      const Q = typeof t.modelValue == "string" || typeof t.modelValue == "number" ? String(t.modelValue).length : Array.isArray(t.modelValue) === !0 ? t.modelValue.length : 0, j = t.maxlength !== void 0 ? t.maxlength : t.maxValues;
      return Q + (j !== void 0 ? " / " + j : "");
    }
  }));
  const { isDirtyModel: u, hasRules: c, hasError: d, errorMessage: v, resetValidation: b } = ov(e.focused, e.innerLoading), m = e.floatingLabel !== void 0 ? s(() => t.stackLabel === !0 || e.focused.value === !0 || e.floatingLabel.value === !0) : s(() => t.stackLabel === !0 || e.focused.value === !0 || e.hasValue.value === !0), g = s(() => t.bottomSlots === !0 || t.hint !== void 0 || c.value === !0 || t.counter === !0 || t.error !== null), p = s(() => t.filled === !0 ? "filled" : t.outlined === !0 ? "outlined" : t.borderless === !0 ? "borderless" : t.standout ? "standout" : "standard"), k = s(() => `q-field row no-wrap items-start q-field--${p.value}` + (e.fieldClass !== void 0 ? ` ${e.fieldClass.value}` : "") + (t.rounded === !0 ? " q-field--rounded" : "") + (t.square === !0 ? " q-field--square" : "") + (m.value === !0 ? " q-field--float" : "") + (y.value === !0 ? " q-field--labeled" : "") + (t.dense === !0 ? " q-field--dense" : "") + (t.itemAligned === !0 ? " q-field--item-aligned q-item-type" : "") + (e.isDark.value === !0 ? " q-field--dark" : "") + (e.getControl === void 0 ? " q-field--auto-height" : "") + (e.focused.value === !0 ? " q-field--focused" : "") + (d.value === !0 ? " q-field--error" : "") + (d.value === !0 || e.focused.value === !0 ? " q-field--highlighted" : "") + (t.hideBottomSpace !== !0 && g.value === !0 ? " q-field--with-bottom" : "") + (t.disable === !0 ? " q-field--disabled" : t.readonly === !0 ? " q-field--readonly" : "")), C = s(() => "q-field__control relative-position row no-wrap" + (t.bgColor !== void 0 ? ` bg-${t.bgColor}` : "") + (d.value === !0 ? " text-negative" : typeof t.standout == "string" && t.standout.length !== 0 && e.focused.value === !0 ? ` ${t.standout}` : t.color !== void 0 ? ` text-${t.color}` : "")), y = s(() => t.labelSlot === !0 || t.label !== void 0), h = s(() => "q-field__label no-pointer-events absolute ellipsis" + (t.labelColor !== void 0 && d.value !== !0 ? ` text-${t.labelColor}` : "")), w = s(() => ({
    id: e.targetUid.value,
    editable: e.editable.value,
    focused: e.focused.value,
    floatingLabel: m.value,
    modelValue: t.modelValue,
    emitValue: e.emitValue
  })), x = s(() => {
    const Q = {};
    return e.targetUid.value && (Q.for = e.targetUid.value), t.disable === !0 && (Q["aria-disabled"] = "true"), Q;
  });
  function L() {
    var N;
    const Q = document.activeElement;
    let j = (N = e.targetRef) == null ? void 0 : N.value;
    j && (Q === null || Q.id !== e.targetUid.value) && (j.hasAttribute("tabindex") !== !0 && (j = j.querySelector("[tabindex]")), j !== Q && (j == null || j.focus({ preventScroll: !0 })));
  }
  function M() {
    Mn(L);
  }
  function K() {
    Lc(L);
    const Q = document.activeElement;
    Q !== null && e.rootRef.value.contains(Q) && Q.blur();
  }
  function X(Q) {
    r !== null && (clearTimeout(r), r = null), e.editable.value === !0 && e.focused.value === !1 && (e.focused.value = !0, a("focus", Q));
  }
  function A(Q, j) {
    r !== null && clearTimeout(r), r = setTimeout(() => {
      r = null, !(document.hasFocus() === !0 && (e.hasPopupOpen === !0 || e.controlRef === void 0 || e.controlRef.value === null || e.controlRef.value.contains(document.activeElement) !== !1)) && (e.focused.value === !0 && (e.focused.value = !1, a("blur", Q)), j == null || j());
    });
  }
  function $(Q) {
    var j;
    Ye(Q), i.platform.is.mobile !== !0 ? (((j = e.targetRef) == null ? void 0 : j.value) || e.rootRef.value).focus() : e.rootRef.value.contains(document.activeElement) === !0 && document.activeElement.blur(), t.type === "file" && (e.inputRef.value.value = null), a("update:modelValue", null), e.changeEvent === !0 && a("change", null), a("clear", t.modelValue), nt(() => {
      const N = u.value;
      b(), u.value = N;
    });
  }
  function D(Q) {
    [13, 32].includes(Q.keyCode) && $(Q);
  }
  function _() {
    const Q = [];
    return n.prepend !== void 0 && Q.push(f("div", {
      class: "q-field__prepend q-field__marginal row no-wrap items-center",
      key: "prepend",
      onClick: Ft
    }, n.prepend())), Q.push(f("div", { class: "q-field__control-container col relative-position row no-wrap q-anchor--skip" }, S())), d.value === !0 && t.noErrorIcon === !1 && Q.push(H("error", [f(st, {
      name: i.iconSet.field.error,
      color: "negative"
    })])), t.loading === !0 || e.innerLoading.value === !0 ? Q.push(H("inner-loading-append", n.loading !== void 0 ? n.loading() : [f(ia, { color: t.color })])) : t.clearable === !0 && e.hasValue.value === !0 && e.editable.value === !0 && Q.push(H("inner-clearable-append", [f(st, {
      class: "q-field__focusable-action",
      name: t.clearIcon || i.iconSet.field.clear,
      tabindex: 0,
      role: "button",
      "aria-hidden": "false",
      "aria-label": i.lang.label.clear,
      onKeyup: D,
      onClick: $
    })])), n.append !== void 0 && Q.push(f("div", {
      class: "q-field__append q-field__marginal row no-wrap items-center",
      key: "append",
      onClick: Ft
    }, n.append())), e.getInnerAppend !== void 0 && Q.push(H("inner-append", e.getInnerAppend())), e.getControlChild !== void 0 && Q.push(e.getControlChild()), Q;
  }
  function S() {
    const Q = [];
    return t.prefix !== void 0 && t.prefix !== null && Q.push(f("div", { class: "q-field__prefix no-pointer-events row items-center" }, t.prefix)), e.getShadowControl !== void 0 && e.hasShadow.value === !0 && Q.push(e.getShadowControl()), y.value === !0 && Q.push(f("div", { class: h.value }, De(n.label, t.label))), e.getControl !== void 0 ? Q.push(e.getControl()) : n.rawControl !== void 0 ? Q.push(n.rawControl()) : n.control !== void 0 && Q.push(f("div", {
      ref: e.targetRef,
      class: "q-field__native row",
      tabindex: -1,
      ...e.splitAttrs.attributes.value,
      "data-autofocus": t.autofocus === !0 || void 0
    }, n.control(w.value))), t.suffix !== void 0 && t.suffix !== null && Q.push(f("div", { class: "q-field__suffix no-pointer-events row items-center" }, t.suffix)), Q.concat(De(n.default));
  }
  function T() {
    let Q, j;
    d.value === !0 ? v.value !== null ? (Q = [f("div", { role: "alert" }, v.value)], j = `q--slot-error-${v.value}`) : (Q = De(n.error), j = "q--slot-error") : (t.hideHint !== !0 || e.focused.value === !0) && (t.hint !== void 0 ? (Q = [f("div", t.hint)], j = `q--slot-hint-${t.hint}`) : (Q = De(n.hint), j = "q--slot-hint"));
    const N = t.counter === !0 || n.counter !== void 0;
    if (t.hideBottomSpace === !0 && N === !1 && Q === void 0) return;
    const Z = f("div", {
      key: j,
      class: "q-field__messages col"
    }, Q);
    return f("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (t.hideBottomSpace !== !0 ? "animated" : "stale"),
      onClick: Ft
    }, [t.hideBottomSpace === !0 ? Z : f(Pt, { name: "q-transition--field-message" }, () => Z), N === !0 ? f("div", { class: "q-field__counter" }, n.counter !== void 0 ? n.counter() : e.computedCounter.value) : null]);
  }
  function H(Q, j) {
    return j === null ? null : f("div", {
      key: Q,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, j);
  }
  let E = !1;
  return wa(() => {
    E = !0;
  }), en(() => {
    E === !0 && t.autofocus === !0 && o.focus();
  }), t.autofocus === !0 && bt(() => {
    o.focus();
  }), tt(() => {
    r !== null && clearTimeout(r);
  }), Object.assign(o, {
    focus: M,
    blur: K
  }), function() {
    const j = e.getControl === void 0 && n.control === void 0 ? {
      ...e.splitAttrs.attributes.value,
      "data-autofocus": t.autofocus === !0 || void 0,
      ...x.value
    } : x.value;
    return f(e.tag.value, {
      ref: e.rootRef,
      class: [k.value, l.class],
      style: l.style,
      ...j
    }, [
      n.before !== void 0 ? f("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: Ft
      }, n.before()) : null,
      f("div", { class: "q-field__inner relative-position col self-stretch" }, [f("div", {
        ref: e.controlRef,
        class: C.value,
        tabindex: -1,
        ...e.controlEvents
      }, _()), g.value === !0 ? T() : null]),
      n.after !== void 0 ? f("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: Ft
      }, n.after()) : null
    ]);
  };
}
var iv = re({
  name: "QField",
  inheritAttrs: !1,
  props: {
    ...Ql,
    tag: {
      type: String,
      default: "label"
    }
  },
  emits: Ul,
  setup() {
    return Wl(Kl({ tagProp: !0 }));
  }
});
function dn(e, t, a, n) {
  const l = [];
  return e.forEach((o) => {
    n(o) === !0 ? l.push(o) : t.push({
      failedPropValidation: a,
      file: o
    });
  }), l;
}
function sl(e) {
  e != null && e.dataTransfer && (e.dataTransfer.dropEffect = "copy"), Ye(e);
}
const xu = {
  multiple: Boolean,
  accept: String,
  capture: String,
  maxFileSize: [Number, String],
  maxTotalSize: [Number, String],
  maxFiles: [Number, String],
  filter: Function
}, _u = ["rejected"];
function $u({ editable: e, dnd: t, getFileInput: a, addFilesToQueue: n }) {
  const { props: l, emit: o, proxy: i } = ye(), r = z(null), u = s(() => l.accept !== void 0 ? l.accept.split(",").map((y) => (y = y.trim(), y === "*" ? "*/" : (y.endsWith("/*") && (y = y.slice(0, y.length - 1)), y.toUpperCase()))) : null), c = s(() => parseInt(l.maxFiles, 10)), d = s(() => parseInt(l.maxTotalSize, 10));
  function v(y) {
    var h;
    if (e.value)
      if (y !== Object(y) && (y = { target: null }), ((h = y.target) == null ? void 0 : h.matches('input[type="file"]')) === !0)
        y.clientX === 0 && y.clientY === 0 && wt(y);
      else {
        const w = a();
        w !== y.target && (w == null || w.click(y));
      }
  }
  function b(y) {
    e.value && y && n(null, y);
  }
  function m(y, h, w, x) {
    let L = Array.from(h || y.target.files);
    const M = [], K = () => {
      M.length !== 0 && o("rejected", M);
    };
    if (l.accept !== void 0 && u.value.indexOf("*/") === -1 && (L = dn(L, M, "accept", (X) => u.value.some((A) => X.type.toUpperCase().startsWith(A) || X.name.toUpperCase().endsWith(A))), L.length === 0))
      return K();
    if (l.maxFileSize !== void 0) {
      const X = parseInt(l.maxFileSize, 10);
      if (L = dn(L, M, "max-file-size", (A) => A.size <= X), L.length === 0) return K();
    }
    if (l.multiple !== !0 && L.length !== 0 && (L = [L[0]]), L.forEach((X) => {
      X.__key = X.webkitRelativePath + X.lastModified + X.name + X.size;
    }), x === !0) {
      const X = w.map((A) => A.__key);
      L = dn(L, M, "duplicate", (A) => X.includes(A.__key) === !1);
    }
    if (L.length === 0) return K();
    if (l.maxTotalSize !== void 0) {
      let X = x === !0 ? w.reduce((A, $) => A + $.size, 0) : 0;
      if (L = dn(L, M, "max-total-size", (A) => (X += A.size, X <= d.value)), L.length === 0) return K();
    }
    if (typeof l.filter == "function") {
      const X = l.filter(L);
      L = dn(L, M, "filter", (A) => X.includes(A));
    }
    if (l.maxFiles !== void 0) {
      let X = x === !0 ? w.length : 0;
      if (L = dn(L, M, "max-files", () => (X++, X <= c.value)), L.length === 0) return K();
    }
    if (K(), L.length !== 0) return L;
  }
  function g(y) {
    sl(y), t.value !== !0 && (t.value = !0);
  }
  function p(y) {
    Ye(y), (y.relatedTarget !== null || Je.is.safari !== !0 ? y.relatedTarget !== r.value : document.elementsFromPoint(y.clientX, y.clientY).includes(r.value) === !1) && (t.value = !1);
  }
  function k(y) {
    sl(y);
    const h = y.dataTransfer.files;
    h.length !== 0 && n(null, h), t.value = !1;
  }
  function C(y) {
    if (t.value === !0) return f("div", {
      ref: r,
      class: `q-${y}__dnd absolute-full`,
      onDragenter: sl,
      onDragover: sl,
      onDragleave: p,
      onDrop: k
    });
  }
  return Object.assign(i, {
    pickFiles: v,
    addFiles: b
  }), {
    pickFiles: v,
    addFiles: b,
    onDragover: g,
    onDragleave: p,
    processFiles: m,
    getDndNode: C,
    maxFilesNumber: c,
    maxTotalSizeNumber: d
  };
}
function qu(e, t) {
  function a() {
    const n = e.modelValue;
    try {
      const l = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      return Object(n) === n && ("length" in n ? Array.from(n) : [n]).forEach((o) => {
        l.items.add(o);
      }), { files: l.files };
    } catch {
      return { files: void 0 };
    }
  }
  return t === !0 ? s(() => {
    if (e.type === "file")
      return a();
  }) : s(a);
}
var rv = re({
  name: "QFile",
  inheritAttrs: !1,
  props: {
    ...wu,
    ...ra,
    ...xu,
    modelValue: [
      File,
      FileList,
      Array
    ],
    append: Boolean,
    useChips: Boolean,
    displayValue: [String, Number],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    counterLabel: Function,
    inputClass: [
      Array,
      String,
      Object
    ],
    inputStyle: [
      Array,
      String,
      Object
    ]
  },
  emits: [...Ul, ..._u],
  setup(e, { slots: t, emit: a, attrs: n }) {
    const { proxy: l } = ye(), o = Kl(), i = z(null), r = z(!1), u = si(e), { pickFiles: c, onDragover: d, onDragleave: v, processFiles: b, getDndNode: m } = $u({
      editable: o.editable,
      dnd: r,
      getFileInput: D,
      addFilesToQueue: _
    }), g = qu(e), p = s(() => Object(e.modelValue) === e.modelValue ? "length" in e.modelValue ? Array.from(e.modelValue) : [e.modelValue] : []), k = s(() => Ja(p.value)), C = s(() => p.value.map((E) => E.name).join(", ")), y = s(() => Do(p.value.reduce((E, Q) => E + Q.size, 0))), h = s(() => ({
      totalSize: y.value,
      filesNumber: p.value.length,
      maxFiles: e.maxFiles
    })), w = s(() => ({
      tabindex: -1,
      type: "file",
      title: "",
      accept: e.accept,
      capture: e.capture,
      name: u.value,
      ...n,
      id: o.targetUid.value,
      disabled: o.editable.value !== !0
    })), x = s(() => "q-file q-field--auto-height" + (r.value === !0 ? " q-file--dnd" : "")), L = s(() => e.multiple === !0 && e.append === !0);
    function M(E) {
      const Q = p.value.slice();
      Q.splice(E, 1), X(Q);
    }
    function K(E) {
      const Q = p.value.indexOf(E);
      Q !== -1 && M(Q);
    }
    function X(E) {
      a("update:modelValue", e.multiple === !0 ? E : E[0]);
    }
    function A(E) {
      E.keyCode === 13 && Ft(E);
    }
    function $(E) {
      (E.keyCode === 13 || E.keyCode === 32) && c(E);
    }
    function D() {
      return i.value;
    }
    function _(E, Q) {
      const j = b(E, Q, p.value, L.value), N = D();
      N != null && (N.value = ""), j !== void 0 && ((e.multiple === !0 ? e.modelValue && j.every((Z) => p.value.includes(Z)) : e.modelValue === j[0]) || X(L.value === !0 ? p.value.concat(j) : j));
    }
    function S() {
      return [f("input", {
        class: [e.inputClass, "q-file__filler"],
        style: e.inputStyle
      })];
    }
    function T() {
      if (t.file !== void 0) return p.value.length === 0 ? S() : p.value.map((Q, j) => t.file({
        index: j,
        file: Q,
        ref: this
      }));
      if (t.selected !== void 0) return p.value.length === 0 ? S() : t.selected({
        files: p.value,
        ref: this
      });
      if (e.useChips === !0) return p.value.length === 0 ? S() : p.value.map((Q, j) => f(Qs, {
        key: "file-" + j,
        removable: o.editable.value,
        dense: !0,
        textColor: e.color,
        tabindex: e.tabindex,
        onRemove: () => {
          M(j);
        }
      }, () => f("span", {
        class: "ellipsis",
        textContent: Q.name
      })));
      const E = e.displayValue !== void 0 ? e.displayValue : C.value;
      return E.length !== 0 ? [f("div", {
        class: e.inputClass,
        style: e.inputStyle,
        textContent: E
      })] : S();
    }
    function H() {
      const E = {
        ref: i,
        ...w.value,
        ...g.value,
        class: "q-field__input fit absolute-full cursor-pointer",
        onChange: _
      };
      return e.multiple === !0 && (E.multiple = !0), f("input", E);
    }
    return Object.assign(o, {
      fieldClass: x,
      emitValue: X,
      hasValue: k,
      inputRef: i,
      innerValue: p,
      floatingLabel: s(() => k.value === !0 || Ja(e.displayValue)),
      computedCounter: s(() => {
        if (e.counterLabel !== void 0) return e.counterLabel(h.value);
        const E = e.maxFiles;
        return `${p.value.length}${E !== void 0 ? " / " + E : ""} (${y.value})`;
      }),
      getControlChild: () => m("file"),
      getControl: () => {
        const E = {
          ref: o.targetRef,
          class: "q-field__native row items-center cursor-pointer",
          tabindex: e.tabindex
        };
        return o.editable.value === !0 && Object.assign(E, {
          onDragover: d,
          onDragleave: v,
          onKeydown: A,
          onKeyup: $
        }), f("div", E, [H()].concat(T()));
      }
    }), Object.assign(l, {
      removeAtIndex: M,
      removeFile: K,
      getNativeElement: () => i.value
    }), Rt(l, "nativeEl", () => i.value), Wl(o);
  }
});
re({
  name: "QFooter",
  props: {
    modelValue: {
      type: Boolean,
      default: !0
    },
    reveal: Boolean,
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = ye(), l = Yt(an, vt);
    if (l === vt)
      return console.error("QFooter needs to be child of QLayout"), vt;
    const o = z(parseInt(e.heightHint, 10)), i = z(!0), r = z(na.value === !0 || l.isContainer.value === !0 ? 0 : window.innerHeight), u = s(() => e.reveal === !0 || l.view.value.indexOf("F") !== -1 || n.platform.is.ios && l.isContainer.value === !0), c = s(() => l.isContainer.value === !0 ? l.containerHeight.value : r.value), d = s(() => {
      if (e.modelValue !== !0) return 0;
      if (u.value === !0) return i.value === !0 ? o.value : 0;
      const x = l.scroll.value.position + c.value + o.value - l.height.value;
      return x > 0 ? x : 0;
    }), v = s(() => e.modelValue !== !0 || u.value === !0 && i.value !== !0), b = s(() => e.modelValue === !0 && v.value === !0 && e.reveal === !0), m = s(() => "q-footer q-layout__section--marginal " + (u.value === !0 ? "fixed" : "absolute") + "-bottom" + (e.bordered === !0 ? " q-footer--bordered" : "") + (v.value === !0 ? " q-footer--hidden" : "") + (e.modelValue !== !0 ? " q-layout--prevent-focus" + (u.value !== !0 ? " hidden" : "") : "")), g = s(() => {
      const x = l.rows.value.bottom, L = {};
      return x[0] === "l" && l.left.space === !0 && (L[n.lang.rtl === !0 ? "right" : "left"] = `${l.left.size}px`), x[2] === "r" && l.right.space === !0 && (L[n.lang.rtl === !0 ? "left" : "right"] = `${l.right.size}px`), L;
    });
    function p(x, L) {
      l.update("footer", x, L);
    }
    function k(x, L) {
      x.value !== L && (x.value = L);
    }
    function C({ height: x }) {
      k(o, x), p("size", x);
    }
    function y() {
      if (e.reveal !== !0) return;
      const { direction: x, position: L, inflectionPoint: M } = l.scroll.value;
      k(i, x === "up" || L - M < 100 || l.height.value - c.value - L - o.value < 300);
    }
    function h(x) {
      b.value === !0 && k(i, !0), a("focusin", x);
    }
    se(() => e.modelValue, (x) => {
      p("space", x), k(i, !0), l.animate();
    }), se(d, (x) => {
      p("offset", x);
    }), se(() => e.reveal, (x) => {
      x === !1 && k(i, e.modelValue);
    }), se(i, (x) => {
      l.animate(), a("reveal", x);
    }), se([
      o,
      l.scroll,
      l.height
    ], y), se(() => n.screen.height, (x) => {
      l.isContainer.value !== !0 && k(r, x);
    });
    const w = {};
    return l.instances.footer = w, e.modelValue === !0 && p("size", o.value), p("space", e.modelValue), p("offset", d.value), tt(() => {
      l.instances.footer === w && (l.instances.footer = void 0, p("size", 0), p("offset", 0), p("space", !1));
    }), () => {
      const x = $t(t.default, [f(Ga, {
        debounce: 0,
        onResize: C
      })]);
      return e.elevated === !0 && x.push(f("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), f("footer", {
        class: m.value,
        style: g.value,
        onFocusin: h
      }, x);
    };
  }
});
re({
  name: "QForm",
  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,
    onSubmit: Function
  },
  emits: [
    "reset",
    "validationSuccess",
    "validationError"
  ],
  setup(e, { slots: t, emit: a }) {
    const n = ye(), l = z(null);
    let o = 0;
    const i = [];
    function r(m) {
      const g = typeof m == "boolean" ? m : e.noErrorFocus !== !0, p = ++o, k = (y, h) => {
        a(`validation${y === !0 ? "Success" : "Error"}`, h);
      }, C = (y) => {
        const h = y.validate();
        return typeof h.then == "function" ? h.then((w) => ({
          valid: w,
          comp: y
        }), (w) => ({
          valid: !1,
          comp: y,
          err: w
        })) : Promise.resolve({
          valid: h,
          comp: y
        });
      };
      return (e.greedy === !0 ? Promise.all(i.map(C)).then((y) => y.filter((h) => h.valid !== !0)) : i.reduce((y, h) => y.then(() => C(h).then((w) => {
        if (w.valid === !1) return Promise.reject(w);
      })), Promise.resolve()).catch((y) => [y])).then((y) => {
        if (y === void 0 || y.length === 0)
          return p === o && k(!0), !0;
        if (p === o) {
          const { comp: h, err: w } = y[0];
          if (w !== void 0 && console.error(w), k(!1, h), g === !0) {
            const x = y.find(({ comp: L }) => typeof L.focus == "function" && Da(L.$) === !1);
            x !== void 0 && x.comp.focus();
          }
        }
        return !1;
      });
    }
    function u() {
      o++, i.forEach((m) => {
        typeof m.resetValidation == "function" && m.resetValidation();
      });
    }
    function c(m) {
      m !== void 0 && Ye(m);
      const g = o + 1;
      r().then((p) => {
        g === o && p === !0 && (e.onSubmit !== void 0 ? a("submit", m) : (m == null ? void 0 : m.target) !== void 0 && typeof m.target.submit == "function" && m.target.submit());
      });
    }
    function d(m) {
      m !== void 0 && Ye(m), a("reset"), nt(() => {
        u(), e.autofocus === !0 && e.noResetFocus !== !0 && v();
      });
    }
    function v() {
      Mn(() => {
        var m;
        l.value !== null && ((m = l.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || l.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || l.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(l.value.querySelectorAll("[tabindex]"), (g) => g.tabIndex !== -1)) == null || m.focus({ preventScroll: !0 }));
      });
    }
    Va(ss, {
      bindComponent(m) {
        i.push(m);
      },
      unbindComponent(m) {
        const g = i.indexOf(m);
        g !== -1 && i.splice(g, 1);
      }
    });
    let b = !1;
    return wa(() => {
      b = !0;
    }), en(() => {
      b === !0 && e.autofocus === !0 && v();
    }), bt(() => {
      e.autofocus === !0 && v();
    }), Object.assign(n.proxy, {
      validate: r,
      resetValidation: u,
      submit: c,
      reset: d,
      focus: v,
      getValidationComponents: () => i
    }), () => f("form", {
      class: "q-form",
      ref: l,
      onSubmit: c,
      onReset: d
    }, De(t.default));
  }
});
re({
  name: "QHeader",
  props: {
    modelValue: {
      type: Boolean,
      default: !0
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    },
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = ye(), l = Yt(an, vt);
    if (l === vt)
      return console.error("QHeader needs to be child of QLayout"), vt;
    const o = z(parseInt(e.heightHint, 10)), i = z(!0), r = s(() => e.reveal === !0 || l.view.value.indexOf("H") !== -1 || n.platform.is.ios && l.isContainer.value === !0), u = s(() => {
      if (e.modelValue !== !0) return 0;
      if (r.value === !0) return i.value === !0 ? o.value : 0;
      const y = o.value - l.scroll.value.position;
      return y > 0 ? y : 0;
    }), c = s(() => e.modelValue !== !0 || r.value === !0 && i.value !== !0), d = s(() => e.modelValue === !0 && c.value === !0 && e.reveal === !0), v = s(() => "q-header q-layout__section--marginal " + (r.value === !0 ? "fixed" : "absolute") + "-top" + (e.bordered === !0 ? " q-header--bordered" : "") + (c.value === !0 ? " q-header--hidden" : "") + (e.modelValue !== !0 ? " q-layout--prevent-focus" : "")), b = s(() => {
      const y = l.rows.value.top, h = {};
      return y[0] === "l" && l.left.space === !0 && (h[n.lang.rtl === !0 ? "right" : "left"] = `${l.left.size}px`), y[2] === "r" && l.right.space === !0 && (h[n.lang.rtl === !0 ? "left" : "right"] = `${l.right.size}px`), h;
    });
    function m(y, h) {
      l.update("header", y, h);
    }
    function g(y, h) {
      y.value !== h && (y.value = h);
    }
    function p({ height: y }) {
      g(o, y), m("size", y);
    }
    function k(y) {
      d.value === !0 && g(i, !0), a("focusin", y);
    }
    se(() => e.modelValue, (y) => {
      m("space", y), g(i, !0), l.animate();
    }), se(u, (y) => {
      m("offset", y);
    }), se(() => e.reveal, (y) => {
      y === !1 && g(i, e.modelValue);
    }), se(i, (y) => {
      l.animate(), a("reveal", y);
    }), se(l.scroll, (y) => {
      e.reveal === !0 && g(i, y.direction === "up" || y.position <= e.revealOffset || y.position - y.inflectionPoint < 100);
    });
    const C = {};
    return l.instances.header = C, e.modelValue === !0 && m("size", o.value), m("space", e.modelValue), m("offset", u.value), tt(() => {
      l.instances.header === C && (l.instances.header = void 0, m("size", 0), m("offset", 0), m("space", !1));
    }), () => {
      const y = Xn(t.default, []);
      return e.elevated === !0 && y.push(f("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), y.push(f(Ga, {
        debounce: 0,
        onResize: p
      })), f("header", {
        class: v.value,
        style: b.value,
        onFocusin: k
      }, y);
    };
  }
});
const wi = { ratio: [String, Number] };
function xi(e, t) {
  return s(() => {
    const a = Number(e.ratio || (t !== void 0 ? t.value : void 0));
    return isNaN(a) !== !0 && a > 0 ? { paddingBottom: `${100 / a}%` } : null;
  });
}
const sv = 1.7778;
var uv = re({
  name: "QImg",
  props: {
    ...wi,
    src: String,
    srcset: String,
    sizes: String,
    alt: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String,
    draggable: Boolean,
    loading: {
      type: String,
      default: "lazy"
    },
    loadingShowDelay: {
      type: [Number, String],
      default: 0
    },
    fetchpriority: {
      type: String,
      default: "auto"
    },
    width: String,
    height: String,
    initialRatio: {
      type: [Number, String],
      default: sv
    },
    placeholderSrc: String,
    errorSrc: String,
    fit: {
      type: String,
      default: "cover"
    },
    position: {
      type: String,
      default: "50% 50%"
    },
    imgClass: String,
    imgStyle: Object,
    noSpinner: Boolean,
    noNativeMenu: Boolean,
    noTransition: Boolean,
    spinnerColor: String,
    spinnerSize: String
  },
  emits: ["load", "error"],
  setup(e, { slots: t, emit: a }) {
    const n = z(e.initialRatio), l = xi(e, n), o = ye(), { registerTimeout: i, removeTimeout: r } = Sa(), { registerTimeout: u, removeTimeout: c } = Sa(), d = s(() => e.placeholderSrc !== void 0 ? { src: e.placeholderSrc } : null), v = s(() => e.errorSrc !== void 0 ? {
      src: e.errorSrc,
      __qerror: !0
    } : null), b = [z(null), z(d.value)], m = z(0), g = z(!1), p = z(!1), k = s(() => `q-img q-img--${e.noNativeMenu === !0 ? "no-" : ""}menu`), C = s(() => ({
      width: e.width,
      height: e.height
    })), y = s(() => `q-img__image ${e.imgClass !== void 0 ? e.imgClass + " " : ""}q-img__image--with${e.noTransition === !0 ? "out" : ""}-transition q-img__image--`), h = s(() => ({
      ...e.imgStyle,
      objectFit: e.fit,
      objectPosition: e.position
    }));
    function w() {
      if (c(), e.loadingShowDelay === 0) {
        g.value = !0;
        return;
      }
      u(() => {
        g.value = !0;
      }, e.loadingShowDelay);
    }
    function x() {
      c(), g.value = !1;
    }
    function L({ target: D }) {
      Da(o) === !1 && (r(), n.value = D.naturalHeight === 0 ? 0.5 : D.naturalWidth / D.naturalHeight, M(D, 1));
    }
    function M(D, _) {
      _ === 1e3 || Da(o) === !0 || (D.complete === !0 ? K(D) : i(() => {
        M(D, _ + 1);
      }, 50));
    }
    function K(D) {
      Da(o) !== !0 && (m.value = m.value ^ 1, b[m.value].value = null, x(), D.getAttribute("__qerror") !== "true" && (p.value = !1), a("load", D.currentSrc || D.src));
    }
    function X(D) {
      r(), x(), p.value = !0, b[m.value].value = v.value, b[m.value ^ 1].value = d.value, a("error", D);
    }
    function A(D) {
      const _ = b[D].value, S = {
        key: "img_" + D,
        class: y.value,
        style: h.value,
        alt: e.alt,
        crossorigin: e.crossorigin,
        decoding: e.decoding,
        referrerpolicy: e.referrerpolicy,
        height: e.height,
        width: e.width,
        loading: e.loading,
        fetchpriority: e.fetchpriority,
        "aria-hidden": "true",
        draggable: e.draggable,
        ..._
      };
      return m.value === D ? Object.assign(S, {
        class: S.class + "current",
        onLoad: L,
        onError: X
      }) : S.class += "loaded", f("div", {
        class: "q-img__container absolute-full",
        key: "img" + D
      }, f("img", S));
    }
    function $() {
      return g.value === !1 ? f("div", {
        key: "content",
        class: "q-img__content absolute-full q-anchor--skip"
      }, De(t[p.value === !0 ? "error" : "default"])) : f("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, t.loading !== void 0 ? t.loading() : e.noSpinner === !0 ? void 0 : [f(ia, {
        color: e.spinnerColor,
        size: e.spinnerSize
      })]);
    }
    {
      let D = function() {
        se(() => e.src || e.srcset || e.sizes ? {
          src: e.src,
          srcset: e.srcset,
          sizes: e.sizes
        } : null, (_) => {
          r(), p.value = !1, _ === null ? (x(), b[m.value ^ 1].value = d.value) : w(), b[m.value].value = _;
        }, { immediate: !0 });
      };
      na.value === !0 ? bt(D) : D();
    }
    return () => {
      const D = [];
      return l.value !== null && D.push(f("div", {
        key: "filler",
        style: l.value
      })), b[0].value !== null && D.push(A(0)), b[1].value !== null && D.push(A(1)), D.push(f(Pt, { name: "q-transition--fade" }, $)), f("div", {
        key: "main",
        class: k.value,
        style: C.value,
        role: "img",
        "aria-label": e.alt
      }, D);
    };
  }
});
const { passive: Ia } = gt;
var dv = re({
  name: "QInfiniteScroll",
  props: {
    offset: {
      type: Number,
      default: 500
    },
    debounce: {
      type: [String, Number],
      default: 100
    },
    scrollTarget: nn,
    initialIndex: {
      type: Number,
      default: 0
    },
    disable: Boolean,
    reverse: Boolean
  },
  emits: ["load"],
  setup(e, { slots: t, emit: a }) {
    const n = z(!1), l = z(!0), o = z(null), i = z(null);
    let r = e.initialIndex, u, c;
    const d = s(() => "q-infinite-scroll__loading" + (n.value === !0 ? "" : " invisible"));
    function v() {
      if (e.disable === !0 || n.value === !0 || l.value === !1) return;
      const M = el(u), K = La(u), X = xn(u);
      e.reverse === !1 ? Math.round(K + X + e.offset) >= Math.round(M) && b() : Math.round(K) <= e.offset && b();
    }
    function b() {
      if (e.disable === !0 || n.value === !0 || l.value === !1) return;
      r++, n.value = !0;
      const M = el(u);
      a("load", r, (K) => {
        l.value === !0 && (n.value = !1, nt(() => {
          if (e.reverse === !0) {
            const X = el(u), A = La(u), $ = X - M;
            Cn(u, A + $);
          }
          K === !0 ? p() : o.value && o.value.closest("body") && c();
        }));
      });
    }
    function m() {
      r = 0;
    }
    function g() {
      l.value === !1 && (l.value = !0, u.addEventListener("scroll", c, Ia)), v();
    }
    function p() {
      var M;
      l.value === !0 && (l.value = !1, n.value = !1, u.removeEventListener("scroll", c, Ia), (M = c == null ? void 0 : c.cancel) == null || M.call(c));
    }
    function k() {
      if (u && l.value === !0 && u.removeEventListener("scroll", c, Ia), u = ma(o.value, e.scrollTarget), l.value === !0) {
        if (u.addEventListener("scroll", c, Ia), e.reverse === !0) {
          const M = el(u), K = xn(u);
          Cn(u, M - K);
        }
        v();
      }
    }
    function C(M) {
      r = M;
    }
    function y(M) {
      M = parseInt(M, 10);
      const K = c;
      c = M <= 0 ? v : $n(v, isNaN(M) === !0 ? 100 : M), u && l.value === !0 && (K !== void 0 && u.removeEventListener("scroll", K, Ia), u.addEventListener("scroll", c, Ia));
    }
    function h(M) {
      if (w.value === !0) {
        if (i.value === null) {
          M !== !0 && nt(() => {
            h(!0);
          });
          return;
        }
        const K = `${n.value === !0 ? "un" : ""}pauseAnimations`;
        Array.from(i.value.getElementsByTagName("svg")).forEach((X) => {
          X[K]();
        });
      }
    }
    const w = s(() => e.disable !== !0 && l.value === !0);
    se([n, w], () => {
      h();
    }), se(() => e.disable, (M) => {
      M === !0 ? p() : g();
    }), se(() => e.reverse, () => {
      n.value === !1 && l.value === !0 && v();
    }), se(() => e.scrollTarget, k), se(() => e.debounce, y);
    let x = !1;
    en(() => {
      x !== !1 && u && Cn(u, x);
    }), wa(() => {
      x = u ? La(u) : !1;
    }), tt(() => {
      l.value === !0 && u.removeEventListener("scroll", c, Ia);
    }), bt(() => {
      y(e.debounce), k(), n.value === !1 && h();
    });
    const L = ye();
    return Object.assign(L.proxy, {
      poll: () => {
        c == null || c();
      },
      trigger: b,
      stop: p,
      reset: m,
      resume: g,
      setIndex: C,
      updateScrollTarget: k
    }), () => {
      const M = Xn(t.default, []);
      return w.value === !0 && M[e.reverse === !1 ? "push" : "unshift"](f("div", {
        ref: i,
        class: d.value
      }, De(t.loading))), f("div", {
        class: "q-infinite-scroll",
        ref: o
      }, M);
    };
  }
}), cv = re({
  name: "QInnerLoading",
  props: {
    ...it,
    ...Ka,
    showing: Boolean,
    color: String,
    size: {
      type: [String, Number],
      default: "42px"
    },
    label: String,
    labelClass: String,
    labelStyle: [
      String,
      Array,
      Object
    ]
  },
  setup(e, { slots: t }) {
    const a = rt(e, ye().proxy.$q), { transitionProps: n, transitionStyle: l } = El(e), o = s(() => "q-inner-loading q--avoid-card-border absolute-full column flex-center" + (a.value === !0 ? " q-inner-loading--dark" : "")), i = s(() => "q-inner-loading__label" + (e.labelClass !== void 0 ? ` ${e.labelClass}` : ""));
    function r() {
      const c = [f(ia, {
        size: e.size,
        color: e.color
      })];
      return e.label !== void 0 && c.push(f("div", {
        class: i.value,
        style: e.labelStyle
      }, [e.label])), c;
    }
    function u() {
      return e.showing === !0 ? f("div", {
        class: o.value,
        style: l.value
      }, t.default !== void 0 ? t.default() : r()) : null;
    }
    return () => f(Pt, n.value, u);
  }
});
const yr = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
}, { tokenMap: pr, tokenKeys: fv } = Bu({
  "#": {
    pattern: "[\\d]",
    negate: "[^\\d]"
  },
  S: {
    pattern: "[a-zA-Z]",
    negate: "[^a-zA-Z]"
  },
  N: {
    pattern: "[0-9a-zA-Z]",
    negate: "[^0-9a-zA-Z]"
  },
  A: {
    pattern: "[a-zA-Z]",
    negate: "[^a-zA-Z]",
    transform: (e) => e.toLocaleUpperCase()
  },
  a: {
    pattern: "[a-zA-Z]",
    negate: "[^a-zA-Z]",
    transform: (e) => e.toLocaleLowerCase()
  },
  X: {
    pattern: "[0-9a-zA-Z]",
    negate: "[^0-9a-zA-Z]",
    transform: (e) => e.toLocaleUpperCase()
  },
  x: {
    pattern: "[0-9a-zA-Z]",
    negate: "[^0-9a-zA-Z]",
    transform: (e) => e.toLocaleLowerCase()
  }
});
function Bu(e) {
  const t = Object.keys(e), a = {};
  return t.forEach((n) => {
    const l = e[n];
    a[n] = {
      ...l,
      regex: new RegExp(l.pattern)
    };
  }), {
    tokenMap: a,
    tokenKeys: t
  };
}
function Tu(e) {
  return new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + e.join("") + "])|(.)", "g");
}
const kr = /[.*+?^${}()|[\]\\]/g, vv = Tu(fv), Dt = "", mv = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean,
  maskTokens: Object
};
function gv(e, t, a, n) {
  let l, o, i, r, u, c;
  const d = s(() => {
    if (e.maskTokens === void 0 || e.maskTokens === null) return {
      tokenMap: pr,
      tokenRegexMask: vv
    };
    const { tokenMap: A } = Bu(e.maskTokens), $ = {
      ...pr,
      ...A
    };
    return {
      tokenMap: $,
      tokenRegexMask: Tu(Object.keys($))
    };
  }), v = z(null), b = z(g());
  function m() {
    return e.autogrow === !0 || [
      "textarea",
      "text",
      "search",
      "url",
      "tel",
      "password"
    ].includes(e.type);
  }
  se(() => e.type + e.autogrow, k), se(() => e.mask, (A) => {
    if (A !== void 0) C(b.value, !0);
    else {
      const $ = K(b.value);
      k(), e.modelValue !== $ && t("update:modelValue", $);
    }
  }), se(() => e.fillMask + e.reverseFillMask, () => {
    v.value === !0 && C(b.value, !0);
  }), se(() => e.unmaskedValue, () => {
    v.value === !0 && C(b.value);
  });
  function g() {
    if (k(), v.value === !0) {
      const A = L(K(e.modelValue));
      return e.fillMask !== !1 ? X(A) : A;
    }
    return e.modelValue;
  }
  function p(A) {
    if (A < l.length) return l.slice(-A);
    let $ = "", D = l;
    const _ = D.indexOf(Dt);
    if (_ !== -1) {
      for (let S = A - D.length; S > 0; S--) $ += Dt;
      D = D.slice(0, _) + $ + D.slice(_);
    }
    return D;
  }
  function k() {
    if (v.value = e.mask !== void 0 && e.mask.length !== 0 && m(), v.value === !1) {
      r = void 0, l = "", o = "";
      return;
    }
    const A = yr[e.mask] === void 0 ? e.mask : yr[e.mask], $ = typeof e.fillMask == "string" && e.fillMask.length !== 0 ? e.fillMask.slice(0, 1) : "_", D = $.replace(kr, "\\$&"), _ = [], S = [], T = [];
    let H = e.reverseFillMask === !0, E = "", Q = "";
    A.replace(d.value.tokenRegexMask, (B, G, V, oe, P) => {
      if (oe !== void 0) {
        const I = d.value.tokenMap[oe];
        T.push(I), Q = I.negate, H === !0 && (S.push("(?:" + Q + "+)?(" + I.pattern + "+)?(?:" + Q + "+)?(" + I.pattern + "+)?"), H = !1), S.push("(?:" + Q + "+)?(" + I.pattern + ")?");
      } else if (V !== void 0)
        E = "\\" + (V === "\\" ? "" : V), T.push(V), _.push("([^" + E + "]+)?" + E + "?");
      else {
        const I = G !== void 0 ? G : P;
        E = I === "\\" ? "\\\\\\\\" : I.replace(kr, "\\\\$&"), T.push(I), _.push("([^" + E + "]+)?" + E + "?");
      }
    });
    const j = new RegExp("^" + _.join("") + "(" + (E === "" ? "." : "[^" + E + "]") + "+)?" + (E === "" ? "" : "[" + E + "]*") + "$"), N = S.length - 1, Z = S.map((B, G) => G === 0 && e.reverseFillMask === !0 ? new RegExp("^" + D + "*" + B) : G === N ? new RegExp("^" + B + "(" + (Q === "" ? "." : Q) + "+)?" + (e.reverseFillMask === !0 ? "$" : D + "*")) : new RegExp("^" + B));
    i = T, r = (B) => {
      const G = j.exec(e.reverseFillMask === !0 ? B : B.slice(0, T.length + 1));
      G !== null && (B = G.slice(1).join(""));
      const V = [], oe = Z.length;
      for (let P = 0, I = B; P < oe; P++) {
        const de = Z[P].exec(I);
        if (de === null) break;
        I = I.slice(de.shift().length), V.push(...de);
      }
      return V.length !== 0 ? V.join("") : B;
    }, l = T.map((B) => typeof B == "string" ? B : Dt).join(""), o = l.split(Dt).join($);
  }
  function C(A, $, D) {
    const _ = n.value, S = _.selectionEnd, T = _.value.length - S, H = K(A);
    $ === !0 && k();
    const E = L(H, $), Q = e.fillMask !== !1 ? X(E) : E, j = b.value !== Q;
    _.value !== Q && (_.value = Q), j === !0 && (b.value = Q), document.activeElement === _ && nt(() => {
      if (Q === o) {
        const Z = e.reverseFillMask === !0 ? o.length : 0;
        _.setSelectionRange(Z, Z, "forward");
        return;
      }
      if (D === "insertFromPaste" && e.reverseFillMask !== !0) {
        const Z = _.selectionEnd;
        let B = S - 1;
        for (let G = u; G <= B && G < Z; G++) l[G] !== Dt && B++;
        h.right(_, B);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(D) !== -1) {
        const Z = e.reverseFillMask === !0 ? S === 0 ? Q.length > E.length ? 1 : 0 : Math.max(0, Q.length - (Q === o ? 0 : Math.min(E.length, T) + 1)) + 1 : S;
        _.setSelectionRange(Z, Z, "forward");
        return;
      }
      if (e.reverseFillMask === !0) if (j === !0) {
        const Z = Math.max(0, Q.length - (Q === o ? 0 : Math.min(E.length, T + 1)));
        Z === 1 && S === 1 ? _.setSelectionRange(Z, Z, "forward") : h.rightReverse(_, Z);
      } else {
        const Z = Q.length - T;
        _.setSelectionRange(Z, Z, "backward");
      }
      else if (j === !0) {
        const Z = Math.max(0, l.indexOf(Dt), Math.min(E.length, S) - 1);
        h.right(_, Z);
      } else {
        const Z = S - 1;
        h.right(_, Z);
      }
    });
    const N = e.unmaskedValue === !0 ? K(Q) : Q;
    String(e.modelValue) !== N && (e.modelValue !== null || N !== "") && a(N, !0);
  }
  function y(A, $, D) {
    const _ = L(K(A.value));
    $ = Math.max(0, l.indexOf(Dt), Math.min(_.length, $)), u = $, A.setSelectionRange($, D, "forward");
  }
  const h = {
    left(A, $) {
      const D = l.slice($ - 1).indexOf(Dt) === -1;
      let _ = Math.max(0, $ - 1);
      for (; _ >= 0; _--) if (l[_] === Dt) {
        $ = _, D === !0 && $++;
        break;
      }
      if (_ < 0 && l[$] !== void 0 && l[$] !== Dt) return h.right(A, 0);
      $ >= 0 && A.setSelectionRange($, $, "backward");
    },
    right(A, $) {
      const D = A.value.length;
      let _ = Math.min(D, $ + 1);
      for (; _ <= D; _++) if (l[_] === Dt) {
        $ = _;
        break;
      } else l[_ - 1] === Dt && ($ = _);
      if (_ > D && l[$ - 1] !== void 0 && l[$ - 1] !== Dt) return h.left(A, D);
      A.setSelectionRange($, $, "forward");
    },
    leftReverse(A, $) {
      const D = p(A.value.length);
      let _ = Math.max(0, $ - 1);
      for (; _ >= 0; _--) if (D[_ - 1] === Dt) {
        $ = _;
        break;
      } else if (D[_] === Dt && ($ = _, _ === 0))
        break;
      if (_ < 0 && D[$] !== void 0 && D[$] !== Dt) return h.rightReverse(A, 0);
      $ >= 0 && A.setSelectionRange($, $, "backward");
    },
    rightReverse(A, $) {
      const D = A.value.length, _ = p(D), S = _.slice(0, $ + 1).indexOf(Dt) === -1;
      let T = Math.min(D, $ + 1);
      for (; T <= D; T++) if (_[T - 1] === Dt) {
        $ = T, $ > 0 && S === !0 && $--;
        break;
      }
      if (T > D && _[$ - 1] !== void 0 && _[$ - 1] !== Dt) return h.leftReverse(A, D);
      A.setSelectionRange($, $, "forward");
    }
  };
  function w(A) {
    t("click", A), c = void 0;
  }
  function x(A) {
    if (t("keydown", A), tn(A) === !0 || A.altKey === !0) return;
    const $ = n.value, D = $.selectionStart, _ = $.selectionEnd;
    if (A.shiftKey || (c = void 0), A.keyCode === 37 || A.keyCode === 39) {
      A.shiftKey && c === void 0 && (c = $.selectionDirection === "forward" ? D : _);
      const S = h[(A.keyCode === 39 ? "right" : "left") + (e.reverseFillMask === !0 ? "Reverse" : "")];
      if (A.preventDefault(), S($, c === D ? _ : D), A.shiftKey) {
        const T = $.selectionStart;
        $.setSelectionRange(Math.min(c, T), Math.max(c, T), "forward");
      }
    } else A.keyCode === 8 && e.reverseFillMask !== !0 && D === _ ? (h.left($, D), $.setSelectionRange($.selectionStart, _, "backward")) : A.keyCode === 46 && e.reverseFillMask === !0 && D === _ && (h.rightReverse($, _), $.setSelectionRange(D, $.selectionEnd, "forward"));
  }
  function L(A, $) {
    if (A == null || A === "") return "";
    if (e.reverseFillMask === !0) return M(A, $);
    const D = i;
    let _ = 0, S = "";
    for (let T = 0; T < D.length; T++) {
      const H = A[_], E = D[T];
      if (typeof E == "string")
        S += E, $ === !0 && H === E && _++;
      else if (H !== void 0 && E.regex.test(H))
        S += E.transform !== void 0 ? E.transform(H) : H, _++;
      else return S;
    }
    return S;
  }
  function M(A, $) {
    const D = i, _ = l.indexOf(Dt);
    let S = A.length - 1, T = "";
    for (let H = D.length - 1; H >= 0 && S !== -1; H--) {
      const E = D[H];
      let Q = A[S];
      if (typeof E == "string")
        T = E + T, $ === !0 && Q === E && S--;
      else if (Q !== void 0 && E.regex.test(Q)) do
        T = (E.transform !== void 0 ? E.transform(Q) : Q) + T, S--, Q = A[S];
      while (_ === H && Q !== void 0 && E.regex.test(Q));
      else return T;
    }
    return T;
  }
  function K(A) {
    return typeof A != "string" || r === void 0 ? typeof A == "number" ? r(String(A)) : A : r(A);
  }
  function X(A) {
    return o.length - A.length <= 0 ? A : e.reverseFillMask === !0 && A.length !== 0 ? o.slice(0, -A.length) + A : A + o.slice(A.length);
  }
  return {
    innerValue: b,
    hasMask: v,
    moveCursorForPaste: y,
    updateMaskValue: C,
    onMaskedKeydown: x,
    onMaskedClick: w
  };
}
const hv = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/, bv = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u, yv = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/, pv = /[a-z0-9_ -]$/i;
function Mu(e) {
  return function(a) {
    if (a.type === "compositionend" || a.type === "change") {
      if (a.target.qComposing !== !0) return;
      a.target.qComposing = !1, e(a);
    } else a.type === "compositionupdate" && a.target.qComposing !== !0 && typeof a.data == "string" && (Je.is.firefox === !0 ? pv.test(a.data) === !1 : hv.test(a.data) === !0 || bv.test(a.data) === !0 || yv.test(a.data) === !0) && (a.target.qComposing = !0);
  };
}
var _i = re({
  name: "QInput",
  inheritAttrs: !1,
  props: {
    ...Ql,
    ...mv,
    ...ra,
    modelValue: [
      String,
      Number,
      FileList
    ],
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [
      Array,
      String,
      Object
    ],
    inputStyle: [
      Array,
      String,
      Object
    ]
  },
  emits: [
    ...Ul,
    "paste",
    "change",
    "keydown",
    "click",
    "animationend"
  ],
  setup(e, { emit: t, attrs: a }) {
    const { proxy: n } = ye(), { $q: l } = n, o = {};
    let i = NaN, r, u, c = null, d;
    const v = z(null), b = si(e), { innerValue: m, hasMask: g, moveCursorForPaste: p, updateMaskValue: k, onMaskedKeydown: C, onMaskedClick: y } = gv(e, t, H, v), h = qu(e, !0), w = s(() => Ja(m.value)), x = Mu(S), L = Kl({ changeEvent: !0 }), M = s(() => e.type === "textarea" || e.autogrow === !0), K = s(() => M.value === !0 || [
      "text",
      "search",
      "url",
      "tel",
      "password"
    ].includes(e.type)), X = s(() => {
      const B = {
        ...L.splitAttrs.listeners.value,
        onInput: S,
        onPaste: _,
        onChange: Q,
        onBlur: j,
        onFocus: wt
      };
      return B.onCompositionstart = B.onCompositionupdate = B.onCompositionend = x, g.value === !0 && (B.onKeydown = C, B.onClick = y), e.autogrow === !0 && (B.onAnimationend = T), B;
    }), A = s(() => {
      const B = {
        tabindex: 0,
        "data-autofocus": e.autofocus === !0 || void 0,
        rows: e.type === "textarea" ? 6 : void 0,
        "aria-label": e.label,
        name: b.value,
        ...L.splitAttrs.attributes.value,
        id: L.targetUid.value,
        maxlength: e.maxlength,
        disabled: e.disable === !0,
        readonly: e.readonly === !0
      };
      return M.value === !1 && (B.type = e.type), e.autogrow === !0 && (B.rows = 1), B;
    });
    se(() => e.type, () => {
      v.value && (v.value.value = e.modelValue);
    }), se(() => e.modelValue, (B) => {
      if (g.value === !0) {
        if (u === !0 && (u = !1, String(B) === i))
          return;
        k(B);
      } else m.value !== B && (m.value = B, e.type === "number" && o.hasOwnProperty("value") === !0 && (r === !0 ? r = !1 : delete o.value));
      e.autogrow === !0 && nt(E);
    }), se(() => e.autogrow, (B) => {
      B === !0 ? nt(E) : v.value !== null && a.rows > 0 && (v.value.style.height = "auto");
    }), se(() => e.dense, () => {
      e.autogrow === !0 && nt(E);
    });
    function $() {
      Mn(() => {
        const B = document.activeElement;
        v.value !== null && v.value !== B && (B === null || B.id !== L.targetUid.value) && v.value.focus({ preventScroll: !0 });
      });
    }
    function D() {
      var B;
      (B = v.value) == null || B.select();
    }
    function _(B) {
      if (g.value === !0 && e.reverseFillMask !== !0) {
        const G = B.target;
        p(G, G.selectionStart, G.selectionEnd);
      }
      t("paste", B);
    }
    function S(B) {
      if (!B || !B.target) return;
      if (e.type === "file") {
        t("update:modelValue", B.target.files);
        return;
      }
      const G = B.target.value;
      if (B.target.qComposing === !0) {
        o.value = G;
        return;
      }
      if (g.value === !0) k(G, !1, B.inputType);
      else if (H(G), K.value === !0 && B.target === document.activeElement) {
        const { selectionStart: V, selectionEnd: oe } = B.target;
        V !== void 0 && oe !== void 0 && nt(() => {
          B.target === document.activeElement && G.indexOf(B.target.value) === 0 && B.target.setSelectionRange(V, oe);
        });
      }
      e.autogrow === !0 && E();
    }
    function T(B) {
      t("animationend", B), E();
    }
    function H(B, G) {
      d = () => {
        c = null, e.type !== "number" && o.hasOwnProperty("value") === !0 && delete o.value, e.modelValue !== B && i !== B && (i = B, G === !0 && (u = !0), t("update:modelValue", B), nt(() => {
          i === B && (i = NaN);
        })), d = void 0;
      }, e.type === "number" && (r = !0, o.value = B), e.debounce !== void 0 ? (c !== null && clearTimeout(c), o.value = B, c = setTimeout(d, e.debounce)) : d();
    }
    function E() {
      requestAnimationFrame(() => {
        const B = v.value;
        if (B !== null) {
          const G = B.parentNode.style, { scrollTop: V } = B, { overflowY: oe, maxHeight: P } = l.platform.is.firefox === !0 ? {} : window.getComputedStyle(B), I = oe !== void 0 && oe !== "scroll";
          I === !0 && (B.style.overflowY = "hidden"), G.marginBottom = B.scrollHeight - 1 + "px", B.style.height = "1px", B.style.height = B.scrollHeight + "px", I === !0 && (B.style.overflowY = parseInt(P, 10) < B.scrollHeight ? "auto" : "hidden"), G.marginBottom = "", B.scrollTop = V;
        }
      });
    }
    function Q(B) {
      x(B), c !== null && (clearTimeout(c), c = null), d == null || d(), t("change", B.target.value);
    }
    function j(B) {
      B !== void 0 && wt(B), c !== null && (clearTimeout(c), c = null), d == null || d(), r = !1, u = !1, delete o.value, e.type !== "file" && setTimeout(() => {
        v.value !== null && (v.value.value = m.value !== void 0 ? m.value : "");
      });
    }
    function N() {
      return o.hasOwnProperty("value") === !0 ? o.value : m.value !== void 0 ? m.value : "";
    }
    tt(() => {
      j();
    }), bt(() => {
      e.autogrow === !0 && E();
    }), Object.assign(L, {
      innerValue: m,
      fieldClass: s(() => `q-${M.value === !0 ? "textarea" : "input"}` + (e.autogrow === !0 ? " q-textarea--autogrow" : "")),
      hasShadow: s(() => e.type !== "file" && typeof e.shadowText == "string" && e.shadowText.length !== 0),
      inputRef: v,
      emitValue: H,
      hasValue: w,
      floatingLabel: s(() => w.value === !0 && (e.type !== "number" || isNaN(m.value) === !1) || Ja(e.displayValue)),
      getControl: () => f(M.value === !0 ? "textarea" : "input", {
        ref: v,
        class: ["q-field__native q-placeholder", e.inputClass],
        style: e.inputStyle,
        ...A.value,
        ...X.value,
        ...e.type !== "file" ? { value: N() } : h.value
      }),
      getShadowControl: () => f("div", { class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (M.value === !0 ? "" : " text-no-wrap") }, [f("span", { class: "invisible" }, N()), f("span", e.shadowText)])
    });
    const Z = Wl(L);
    return Object.assign(n, {
      focus: $,
      select: D,
      getNativeElement: () => v.value
    }), Rt(n, "nativeEl", () => v.value), Z;
  }
});
const Cr = {
  threshold: 0,
  root: null,
  rootMargin: "0px"
};
function Sr(e, t, a) {
  var i;
  let n, l, o;
  typeof a == "function" ? (n = a, l = Cr, o = t.cfg === void 0) : (n = a.handler, l = Object.assign({}, Cr, a.cfg), o = t.cfg === void 0 || ua(t.cfg, l) === !1), t.handler !== n && (t.handler = n), o === !0 && (t.cfg = l, (i = t.observer) == null || i.unobserve(e), t.observer = new IntersectionObserver(([r]) => {
    if (typeof t.handler == "function") {
      if (r.rootBounds === null && document.body.contains(e) === !0) {
        t.observer.unobserve(e), t.observer.observe(e);
        return;
      }
      (t.handler(r, t.observer) === !1 || t.once === !0 && r.isIntersecting === !0) && Au(e);
    }
  }, l), t.observer.observe(e));
}
function Au(e) {
  var a;
  const t = e.__qvisible;
  t !== void 0 && ((a = t.observer) == null || a.unobserve(e), delete e.__qvisible);
}
var kv = ca({
  name: "intersection",
  mounted(e, { modifiers: t, value: a }) {
    const n = { once: t.once === !0 };
    Sr(e, n, a), e.__qvisible = n;
  },
  updated(e, t) {
    const a = e.__qvisible;
    a !== void 0 && Sr(e, a, t.value);
  },
  beforeUnmount: Au
});
re({
  name: "QIntersection",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    once: Boolean,
    transition: String,
    transitionDuration: {
      type: [String, Number],
      default: 300
    },
    ssrPrerender: Boolean,
    margin: String,
    threshold: [Number, Array],
    root: { default: null },
    disable: Boolean,
    onVisibility: Function
  },
  setup(e, { slots: t, emit: a }) {
    const n = z(na.value === !0 ? e.ssrPrerender : !1), l = s(() => e.root !== void 0 || e.margin !== void 0 || e.threshold !== void 0 ? {
      handler: u,
      cfg: {
        root: e.root,
        rootMargin: e.margin,
        threshold: e.threshold
      }
    } : u), o = s(() => e.disable !== !0 && (na.value !== !0 || e.once !== !0 || e.ssrPrerender !== !0)), i = s(() => [[
      kv,
      l.value,
      void 0,
      { once: e.once }
    ]]), r = s(() => `--q-transition-duration: ${e.transitionDuration}ms`);
    function u(d) {
      n.value !== d.isIntersecting && (n.value = d.isIntersecting, e.onVisibility !== void 0 && a("visibility", n.value));
    }
    function c() {
      if (n.value === !0) return [f("div", {
        key: "content",
        style: r.value
      }, De(t.default))];
      if (t.hidden !== void 0) return [f("div", {
        key: "hidden",
        style: r.value
      }, t.hidden())];
    }
    return () => {
      const d = e.transition ? [f(Pt, { name: "q-transition--" + e.transition }, c)] : c();
      return oa(e.tag, { class: "q-intersection" }, d, "main", o.value, () => i.value);
    };
  }
});
const Cv = ["ul", "ol"];
var Sv = re({
  name: "QList",
  props: {
    ...it,
    bordered: Boolean,
    dense: Boolean,
    separator: Boolean,
    padding: Boolean,
    tag: {
      type: String,
      default: "div"
    }
  },
  setup(e, { slots: t }) {
    const a = rt(e, ye().proxy.$q), n = s(() => Cv.includes(e.tag) ? null : "list"), l = s(() => "q-list" + (e.bordered === !0 ? " q-list--bordered" : "") + (e.dense === !0 ? " q-list--dense" : "") + (e.separator === !0 ? " q-list--separator" : "") + (a.value === !0 ? " q-list--dark" : "") + (e.padding === !0 ? " q-list--padding" : ""));
    return () => f(e.tag, {
      class: l.value,
      role: n.value
    }, De(t.default));
  }
});
const wr = [
  34,
  37,
  40,
  33,
  39,
  38
], wv = Object.keys(bi);
var xv = re({
  name: "QKnob",
  props: {
    ...ra,
    ...bi,
    modelValue: {
      type: Number,
      required: !0
    },
    innerMin: Number,
    innerMax: Number,
    step: {
      type: Number,
      default: 1,
      validator: (e) => e >= 0
    },
    tabindex: {
      type: [Number, String],
      default: 0
    },
    disable: Boolean,
    readonly: Boolean
  },
  emits: [
    "update:modelValue",
    "change",
    "dragValue"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), { $q: l } = n, o = z(e.modelValue), i = z(!1), r = s(() => isNaN(e.innerMin) === !0 || e.innerMin < e.min ? e.min : e.innerMin), u = s(() => isNaN(e.innerMax) === !0 || e.innerMax > e.max ? e.max : e.innerMax);
    let c;
    function d() {
      o.value = e.modelValue === null ? r.value : mt(e.modelValue, r.value, u.value), $(!0);
    }
    se(() => `${e.modelValue}|${r.value}|${u.value}`, d), d();
    const v = s(() => e.disable === !1 && e.readonly === !1), b = s(() => "q-knob non-selectable" + (v.value === !0 ? " q-knob--editable" : e.disable === !0 ? " disabled" : "")), m = s(() => (String(e.step).trim().split(".")[1] || "").length), g = s(() => e.step === 0 ? 1 : e.step), p = s(() => e.instantFeedback === !0 || i.value === !0), k = l.platform.is.mobile === !0 ? s(() => v.value === !0 ? { onClick: M } : {}) : s(() => v.value === !0 ? {
      onMousedown: L,
      onClick: M,
      onKeydown: K,
      onKeyup: A
    } : {}), C = s(() => v.value === !0 ? { tabindex: e.tabindex } : { [`aria-${e.disable === !0 ? "disabled" : "readonly"}`]: "true" }), y = s(() => {
      const S = {};
      return wv.forEach((T) => {
        S[T] = e[T];
      }), S;
    });
    function h(S) {
      S.isFinal ? (X(S.evt, !0), i.value = !1) : (S.isFirst && (x(), i.value = !0), X(S.evt));
    }
    const w = s(() => [[
      ta,
      h,
      void 0,
      {
        prevent: !0,
        stop: !0,
        mouse: !0
      }
    ]]);
    function x() {
      const { top: S, left: T, width: H, height: E } = n.$el.getBoundingClientRect();
      c = {
        top: S + E / 2,
        left: T + H / 2
      };
    }
    function L(S) {
      x(), X(S);
    }
    function M(S) {
      x(), X(S, !0);
    }
    function K(S) {
      if (wr.includes(S.keyCode) === !1) return;
      Ye(S);
      const T = ([34, 33].includes(S.keyCode) ? 10 : 1) * g.value, H = [
        34,
        37,
        40
      ].includes(S.keyCode) ? -T : T;
      o.value = mt(parseFloat((o.value + H).toFixed(m.value)), r.value, u.value), $();
    }
    function X(S, T) {
      const H = Wt(S), E = Math.abs(H.top - c.top), Q = Math.sqrt(E ** 2 + Math.abs(H.left - c.left) ** 2);
      let j = Math.asin(E / Q) * (180 / Math.PI);
      H.top < c.top ? j = c.left < H.left ? 90 - j : 270 + j : j = c.left < H.left ? j + 90 : 270 - j, l.lang.rtl === !0 ? j = pl(-j - e.angle, 0, 360) : e.angle && (j = pl(j - e.angle, 0, 360)), e.reverse === !0 && (j = 360 - j);
      let N = e.min + j / 360 * (e.max - e.min);
      if (g.value !== 0) {
        const Z = N % g.value;
        N = N - Z + (Math.abs(Z) >= g.value / 2 ? (Z < 0 ? -1 : 1) * g.value : 0), N = parseFloat(N.toFixed(m.value));
      }
      N = mt(N, r.value, u.value), a("dragValue", N), o.value !== N && (o.value = N), $(T);
    }
    function A(S) {
      wr.includes(S.keyCode) && $(!0);
    }
    function $(S) {
      e.modelValue !== o.value && a("update:modelValue", o.value), S === !0 && a("change", o.value);
    }
    const D = Zn(e);
    function _() {
      return f("input", D.value);
    }
    return () => {
      const S = {
        class: b.value,
        role: "slider",
        "aria-valuemin": r.value,
        "aria-valuemax": u.value,
        "aria-valuenow": e.modelValue,
        ...C.value,
        ...y.value,
        value: o.value,
        instantFeedback: p.value,
        ...k.value
      }, T = { default: t.default };
      return v.value === !0 && e.name !== void 0 && (T.internal = _), oa(yi, S, T, "knob", v.value, () => w.value);
    };
  }
});
const { passive: xr } = gt, _v = [
  "both",
  "horizontal",
  "vertical"
];
var Du = re({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (e) => _v.includes(e),
      default: "vertical"
    },
    debounce: [String, Number],
    scrollTarget: nn
  },
  emits: ["scroll"],
  setup(e, { emit: t }) {
    const a = {
      position: {
        top: 0,
        left: 0
      },
      direction: "down",
      directionChanged: !1,
      delta: {
        top: 0,
        left: 0
      },
      inflectionPoint: {
        top: 0,
        left: 0
      }
    };
    let n = null, l, o;
    se(() => e.scrollTarget, () => {
      u(), r();
    });
    function i() {
      n == null || n();
      const v = Math.max(0, La(l)), b = Il(l), m = {
        top: v - a.position.top,
        left: b - a.position.left
      };
      if (e.axis === "vertical" && m.top === 0 || e.axis === "horizontal" && m.left === 0) return;
      const g = Math.abs(m.top) >= Math.abs(m.left) ? m.top < 0 ? "up" : "down" : m.left < 0 ? "left" : "right";
      a.position = {
        top: v,
        left: b
      }, a.directionChanged = a.direction !== g, a.delta = m, a.directionChanged === !0 && (a.direction = g, a.inflectionPoint = a.position), t("scroll", { ...a });
    }
    function r() {
      l = ma(o, e.scrollTarget), l.addEventListener("scroll", c, xr), c(!0);
    }
    function u() {
      l !== void 0 && (l.removeEventListener("scroll", c, xr), l = void 0);
    }
    function c(v) {
      if (v === !0 || e.debounce === 0 || e.debounce === "0") i();
      else if (n === null) {
        const [b, m] = e.debounce ? [setTimeout(i, e.debounce), clearTimeout] : [requestAnimationFrame(i), cancelAnimationFrame];
        n = () => {
          m(b), n = null;
        };
      }
    }
    const { proxy: d } = ye();
    return se(() => d.$q.lang.rtl, i), bt(() => {
      o = d.$el.parentNode, r();
    }), tt(() => {
      n == null || n(), u();
    }), Object.assign(d, {
      trigger: c,
      getPosition: () => a
    }), At;
  }
});
re({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (e) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = ye(), l = z(null), o = z(n.screen.height), i = z(e.container === !0 ? 0 : n.screen.width), r = z({
      position: 0,
      direction: "down",
      inflectionPoint: 0
    }), u = z(0), c = z(na.value === !0 ? 0 : hl()), d = s(() => "q-layout q-layout--" + (e.container === !0 ? "containerized" : "standard")), v = s(() => e.container === !1 ? { minHeight: n.screen.height + "px" } : null), b = s(() => c.value !== 0 ? { [n.lang.rtl === !0 ? "left" : "right"]: `${c.value}px` } : null), m = s(() => c.value !== 0 ? {
      [n.lang.rtl === !0 ? "right" : "left"]: 0,
      [n.lang.rtl === !0 ? "left" : "right"]: `-${c.value}px`,
      width: `calc(100% + ${c.value}px)`
    } : null);
    function g(w) {
      if (e.container === !0 || document.qScrollPrevented !== !0) {
        const x = {
          position: w.position.top,
          direction: w.direction,
          directionChanged: w.directionChanged,
          inflectionPoint: w.inflectionPoint.top,
          delta: w.delta.top
        };
        r.value = x, e.onScroll !== void 0 && a("scroll", x);
      }
    }
    function p(w) {
      const { height: x, width: L } = w;
      let M = !1;
      o.value !== x && (M = !0, o.value = x, e.onScrollHeight !== void 0 && a("scrollHeight", x), C()), i.value !== L && (M = !0, i.value = L), M === !0 && e.onResize !== void 0 && a("resize", w);
    }
    function k({ height: w }) {
      u.value !== w && (u.value = w, C());
    }
    function C() {
      if (e.container === !0) {
        const w = o.value > u.value ? hl() : 0;
        c.value !== w && (c.value = w);
      }
    }
    let y = null;
    const h = {
      instances: {},
      view: s(() => e.view),
      isContainer: s(() => e.container),
      rootRef: l,
      height: o,
      containerHeight: u,
      scrollbarWidth: c,
      totalWidth: s(() => i.value + c.value),
      rows: s(() => {
        const w = e.view.toLowerCase().split(" ");
        return {
          top: w[0].split(""),
          middle: w[1].split(""),
          bottom: w[2].split("")
        };
      }),
      header: vn({
        size: 0,
        offset: 0,
        space: !1
      }),
      right: vn({
        size: 300,
        offset: 0,
        space: !1
      }),
      footer: vn({
        size: 0,
        offset: 0,
        space: !1
      }),
      left: vn({
        size: 300,
        offset: 0,
        space: !1
      }),
      scroll: r,
      animate() {
        y !== null ? clearTimeout(y) : document.body.classList.add("q-body--layout-animate"), y = setTimeout(() => {
          y = null, document.body.classList.remove("q-body--layout-animate");
        }, 155);
      },
      update(w, x, L) {
        h[w][x] = L;
      }
    };
    if (Va(an, h), hl() > 0) {
      let L = function() {
        w = null, x.classList.remove("hide-scrollbar");
      }, M = function() {
        if (w === null) {
          if (x.scrollHeight > n.screen.height) return;
          x.classList.add("hide-scrollbar");
        } else clearTimeout(w);
        w = setTimeout(L, 300);
      }, K = function(X) {
        w !== null && X === "remove" && (clearTimeout(w), L()), window[`${X}EventListener`]("resize", M);
      }, w = null;
      const x = document.body;
      se(() => e.container !== !0 ? "add" : "remove", K), e.container !== !0 && K("add"), Vl(() => {
        K("remove");
      });
    }
    return () => {
      const w = $t(t.default, [f(Du, { onScroll: g }), f(Ga, { onResize: p })]), x = f("div", {
        class: d.value,
        style: v.value,
        ref: e.container === !0 ? void 0 : l,
        tabindex: -1
      }, w);
      return e.container === !0 ? f("div", {
        class: "q-layout-container overflow-hidden",
        ref: l
      }, [f(Ga, { onResize: k }), f("div", {
        class: "absolute-full",
        style: b.value
      }, [f("div", {
        class: "scroll",
        style: m.value
      }, [x])])]) : x;
    };
  }
});
const $v = [
  "horizontal",
  "vertical",
  "cell",
  "none"
];
var qv = re({
  name: "QMarkupTable",
  props: {
    ...it,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    wrapCells: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (e) => $v.includes(e)
    }
  },
  setup(e, { slots: t }) {
    const a = rt(e, ye().proxy.$q), n = s(() => `q-markup-table q-table__container q-table__card q-table--${e.separator}-separator` + (a.value === !0 ? " q-table--dark q-table__card--dark q-dark" : "") + (e.dense === !0 ? " q-table--dense" : "") + (e.flat === !0 ? " q-table--flat" : "") + (e.bordered === !0 ? " q-table--bordered" : "") + (e.square === !0 ? " q-table--square" : "") + (e.wrapCells === !1 ? " q-table--no-wrap" : ""));
    return () => f("div", { class: n.value }, [f("table", { class: "q-table" }, De(t.default))]);
  }
});
re({
  name: "QNoSsr",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    placeholder: String
  },
  setup(e, { slots: t }) {
    const { isHydrated: a } = Gs();
    return () => {
      if (a.value === !0) {
        const o = De(t.default);
        return o === void 0 ? o : o.length > 1 ? f(e.tag, {}, o) : o[0];
      }
      const n = { class: "q-no-ssr-placeholder" }, l = De(t.placeholder);
      if (l !== void 0) return l.length > 1 ? f(e.tag, n, l) : l[0];
      if (e.placeholder !== void 0) return f(e.tag, n, e.placeholder);
    };
  }
});
const Bv = () => f("svg", {
  key: "svg",
  class: "q-radio__bg absolute non-selectable",
  viewBox: "0 0 24 24"
}, [f("path", { d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12" }), f("path", {
  class: "q-radio__check",
  d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
})]);
var Tv = re({
  name: "QRadio",
  props: {
    ...it,
    ...xa,
    ...ra,
    modelValue: { required: !0 },
    val: { required: !0 },
    label: String,
    leftLabel: Boolean,
    checkedIcon: String,
    uncheckedIcon: String,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number]
  },
  emits: ["update:modelValue"],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), l = rt(e, n.$q), o = _a(e, Os), i = z(null), { refocusTargetEl: r, refocusTarget: u } = Is(e, i), c = s(() => ka(e.modelValue) === ka(e.val)), d = s(() => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (e.disable === !0 ? " disabled" : "") + (l.value === !0 ? " q-radio--dark" : "") + (e.dense === !0 ? " q-radio--dense" : "") + (e.leftLabel === !0 ? " reverse" : "")), v = s(() => {
      const h = e.color !== void 0 && (e.keepColor === !0 || c.value === !0) ? ` text-${e.color}` : "";
      return `q-radio__inner relative-position q-radio__inner--${c.value === !0 ? "truthy" : "falsy"}${h}`;
    }), b = s(() => (c.value === !0 ? e.checkedIcon : e.uncheckedIcon) || null), m = s(() => e.disable === !0 ? -1 : e.tabindex || 0), g = Ra(s(() => {
      const h = { type: "radio" };
      return e.name !== void 0 && Object.assign(h, {
        ".checked": c.value === !0,
        "^checked": c.value === !0 ? "checked" : void 0,
        name: e.name,
        value: e.val
      }), h;
    }));
    function p(h) {
      h !== void 0 && (Ye(h), u(h)), e.disable !== !0 && c.value !== !0 && a("update:modelValue", e.val, h);
    }
    function k(h) {
      (h.keyCode === 13 || h.keyCode === 32) && Ye(h);
    }
    function C(h) {
      (h.keyCode === 13 || h.keyCode === 32) && p(h);
    }
    Object.assign(n, { set: p });
    const y = Bv();
    return () => {
      const h = b.value !== null ? [f("div", {
        key: "icon",
        class: "q-radio__icon-container absolute-full flex flex-center no-wrap"
      }, [f(st, {
        class: "q-radio__icon",
        name: b.value
      })])] : [y];
      e.disable !== !0 && g(h, "unshift", " q-radio__native q-ma-none q-pa-none");
      const w = [f("div", {
        class: v.value,
        style: o.value,
        "aria-hidden": "true"
      }, h)];
      r.value !== null && w.push(r.value);
      const x = e.label !== void 0 ? $t(t.default, [e.label]) : De(t.default);
      return x !== void 0 && w.push(f("div", { class: "q-radio__label q-anchor--skip" }, x)), f("div", {
        ref: i,
        class: d.value,
        tabindex: m.value,
        role: "radio",
        "aria-label": e.label,
        "aria-checked": c.value === !0 ? "true" : "false",
        "aria-disabled": e.disable === !0 ? "true" : void 0,
        onClick: p,
        onKeydown: k,
        onKeyup: C
      }, w);
    };
  }
}), Mv = re({
  name: "QToggle",
  props: {
    ...Hs,
    icon: String,
    iconColor: String
  },
  emits: Ns,
  setup(e) {
    function t(a, n) {
      const l = s(() => (a.value === !0 ? e.checkedIcon : n.value === !0 ? e.indeterminateIcon : e.uncheckedIcon) || e.icon), o = s(() => a.value === !0 ? e.iconColor : null);
      return () => [f("div", { class: "q-toggle__track" }), f("div", { class: "q-toggle__thumb absolute flex flex-center no-wrap" }, l.value !== void 0 ? [f(st, {
        name: l.value,
        color: o.value
      })] : void 0)];
    }
    return js("toggle", t);
  }
});
const Lu = {
  radio: Tv,
  checkbox: In,
  toggle: Mv
}, Av = Object.keys(Lu);
function ko(e, t) {
  if (typeof e == "function") return e;
  const a = e !== void 0 ? e : t;
  return (n) => n[a];
}
var Dv = re({
  name: "QOptionGroup",
  props: {
    ...it,
    modelValue: { required: !0 },
    options: {
      type: Array,
      validator: (e) => e.every(Qt),
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    name: String,
    type: {
      type: String,
      default: "radio",
      validator: (e) => Av.includes(e)
    },
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    size: String,
    leftLabel: Boolean,
    inline: Boolean,
    disable: Boolean
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t, slots: a }) {
    const { proxy: { $q: n } } = ye(), l = Array.isArray(e.modelValue);
    e.type === "radio" ? l === !0 && console.error("q-option-group: model should not be array") : l === !1 && console.error("q-option-group: model should be array in your case");
    const o = rt(e, n), i = s(() => Lu[e.type]), r = s(() => ko(e.optionValue, "value")), u = s(() => ko(e.optionLabel, "label")), c = s(() => ko(e.optionDisable, "disable")), d = s(() => e.options.map((g) => ({
      val: r.value(g),
      name: g.name === void 0 ? e.name : g.name,
      disable: e.disable || c.value(g),
      leftLabel: g.leftLabel === void 0 ? e.leftLabel : g.leftLabel,
      color: g.color === void 0 ? e.color : g.color,
      checkedIcon: g.checkedIcon,
      uncheckedIcon: g.uncheckedIcon,
      dark: g.dark === void 0 ? o.value : g.dark,
      size: g.size === void 0 ? e.size : g.size,
      dense: e.dense,
      keepColor: g.keepColor === void 0 ? e.keepColor : g.keepColor
    }))), v = s(() => "q-option-group q-gutter-x-sm" + (e.inline === !0 ? " q-option-group--inline" : "")), b = s(() => {
      const g = { role: "group" };
      return e.type === "radio" && (g.role = "radiogroup", e.disable === !0 && (g["aria-disabled"] = "true")), g;
    });
    function m(g) {
      t("update:modelValue", g);
    }
    return () => f("div", {
      class: v.value,
      ...b.value
    }, e.options.map((g, p) => {
      const k = a["label-" + p] !== void 0 ? () => a["label-" + p](g) : a.label !== void 0 ? () => a.label(g) : void 0;
      return f("div", [f(i.value, {
        label: k === void 0 ? u.value(g) : null,
        modelValue: e.modelValue,
        "onUpdate:modelValue": m,
        ...d.value[p]
      }, k)]);
    }));
  }
});
re({
  name: "QPage",
  props: {
    padding: Boolean,
    styleFn: Function
  },
  setup(e, { slots: t }) {
    const { proxy: { $q: a } } = ye(), n = Yt(an, vt);
    if (n === vt)
      return console.error("QPage needs to be a deep child of QLayout"), vt;
    if (Yt("_q_pc_", vt) === vt)
      return console.error("QPage needs to be child of QPageContainer"), vt;
    const l = s(() => {
      const i = (n.header.space === !0 ? n.header.size : 0) + (n.footer.space === !0 ? n.footer.size : 0);
      if (typeof e.styleFn == "function") {
        const r = n.isContainer.value === !0 ? n.containerHeight.value : a.screen.height;
        return e.styleFn(i, r);
      }
      return { minHeight: n.isContainer.value === !0 ? n.containerHeight.value - i + "px" : a.screen.height === 0 ? i !== 0 ? `calc(100vh - ${i}px)` : "100vh" : a.screen.height - i + "px" };
    }), o = s(() => `q-page${e.padding === !0 ? " q-layout-padding" : ""}`);
    return () => f("main", {
      class: o.value,
      style: l.value
    }, De(t.default));
  }
});
re({
  name: "QPageContainer",
  setup(e, { slots: t }) {
    const { proxy: { $q: a } } = ye(), n = Yt(an, vt);
    if (n === vt)
      return console.error("QPageContainer needs to be child of QLayout"), vt;
    Va(lc, !0);
    const l = s(() => {
      const o = {};
      return n.header.space === !0 && (o.paddingTop = `${n.header.size}px`), n.right.space === !0 && (o[`padding${a.lang.rtl === !0 ? "Left" : "Right"}`] = `${n.right.size}px`), n.footer.space === !0 && (o.paddingBottom = `${n.footer.size}px`), n.left.space === !0 && (o[`padding${a.lang.rtl === !0 ? "Right" : "Left"}`] = `${n.left.size}px`), o;
    });
    return () => f("div", {
      class: "q-page-container",
      style: l.value
    }, De(t.default));
  }
});
const jo = {
  position: {
    type: String,
    default: "bottom-right",
    validator: (e) => [
      "top-right",
      "top-left",
      "bottom-right",
      "bottom-left",
      "top",
      "right",
      "bottom",
      "left"
    ].includes(e)
  },
  offset: {
    type: Array,
    validator: (e) => e.length === 2
  },
  expand: Boolean
};
function zu() {
  const { props: e, proxy: { $q: t } } = ye(), a = Yt(an, vt);
  if (a === vt)
    return console.error("QPageSticky needs to be child of QLayout"), vt;
  const n = s(() => {
    const v = e.position;
    return {
      top: v.indexOf("top") !== -1,
      right: v.indexOf("right") !== -1,
      bottom: v.indexOf("bottom") !== -1,
      left: v.indexOf("left") !== -1,
      vertical: v === "top" || v === "bottom",
      horizontal: v === "left" || v === "right"
    };
  }), l = s(() => a.header.offset), o = s(() => a.right.offset), i = s(() => a.footer.offset), r = s(() => a.left.offset), u = s(() => {
    let v = 0, b = 0;
    const m = n.value, g = t.lang.rtl === !0 ? -1 : 1;
    m.top === !0 && l.value !== 0 ? b = `${l.value}px` : m.bottom === !0 && i.value !== 0 && (b = `${-i.value}px`), m.left === !0 && r.value !== 0 ? v = `${g * r.value}px` : m.right === !0 && o.value !== 0 && (v = `${-g * o.value}px`);
    const p = { transform: `translate(${v}, ${b})` };
    return e.offset && (p.margin = `${e.offset[1]}px ${e.offset[0]}px`), m.vertical === !0 ? (r.value !== 0 && (p[t.lang.rtl === !0 ? "right" : "left"] = `${r.value}px`), o.value !== 0 && (p[t.lang.rtl === !0 ? "left" : "right"] = `${o.value}px`)) : m.horizontal === !0 && (l.value !== 0 && (p.top = `${l.value}px`), i.value !== 0 && (p.bottom = `${i.value}px`)), p;
  }), c = s(() => `q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand === !0 ? "expand" : "shrink"}`);
  function d(v) {
    const b = De(v.default);
    return f("div", {
      class: c.value,
      style: u.value
    }, e.expand === !0 ? b : [f("div", b)]);
  }
  return {
    $layout: a,
    getStickyContent: d
  };
}
re({
  name: "QPageScroller",
  props: {
    ...jo,
    scrollOffset: {
      type: Number,
      default: 1e3
    },
    reverse: Boolean,
    duration: {
      type: Number,
      default: 300
    },
    offset: {
      ...jo.offset,
      default: () => [18, 18]
    }
  },
  emits: ["click"],
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = ye(), { $layout: l, getStickyContent: o } = zu(), i = z(null);
    let r;
    const u = s(() => l.height.value - (l.isContainer.value === !0 ? l.containerHeight.value : n.screen.height));
    function c() {
      return e.reverse === !0 ? u.value - l.scroll.value.position > e.scrollOffset : l.scroll.value.position > e.scrollOffset;
    }
    const d = z(c());
    function v() {
      const k = c();
      d.value !== k && (d.value = k);
    }
    function b() {
      e.reverse === !0 ? r === void 0 && (r = se(u, v)) : m();
    }
    se(l.scroll, v), se(() => e.reverse, b);
    function m() {
      r !== void 0 && (r(), r = void 0);
    }
    function g(k) {
      Cn(ma(l.isContainer.value === !0 ? i.value : l.rootRef.value), e.reverse === !0 ? l.height.value : 0, e.duration), a("click", k);
    }
    function p() {
      return d.value === !0 ? f("div", {
        ref: i,
        class: "q-page-scroller",
        onClick: g
      }, o(t)) : null;
    }
    return b(), tt(m), () => f(Pt, { name: "q-transition--fade" }, p);
  }
});
re({
  name: "QPageSticky",
  props: jo,
  setup(e, { slots: t }) {
    const { getStickyContent: a } = zu();
    return () => a(t);
  }
});
function ul(e, t) {
  return [!0, !1].includes(e) ? e : t;
}
var Lv = re({
  name: "QPagination",
  props: {
    ...it,
    modelValue: {
      type: Number,
      required: !0
    },
    min: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      required: !0
    },
    maxPages: {
      type: [Number, String],
      default: 0,
      validator: (e) => (typeof e == "string" ? parseInt(e, 10) : e) >= 0
    },
    inputStyle: [
      Array,
      String,
      Object
    ],
    inputClass: [
      Array,
      String,
      Object
    ],
    size: String,
    disable: Boolean,
    input: Boolean,
    iconPrev: String,
    iconNext: String,
    iconFirst: String,
    iconLast: String,
    toFn: Function,
    boundaryLinks: {
      type: Boolean,
      default: null
    },
    boundaryNumbers: {
      type: Boolean,
      default: null
    },
    directionLinks: {
      type: Boolean,
      default: null
    },
    ellipses: {
      type: Boolean,
      default: null
    },
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    round: Boolean,
    rounded: Boolean,
    flat: Boolean,
    outline: Boolean,
    unelevated: Boolean,
    push: Boolean,
    glossy: Boolean,
    color: {
      type: String,
      default: "primary"
    },
    textColor: String,
    activeDesign: {
      type: String,
      default: "",
      values: (e) => e === "" || Ss.includes(e)
    },
    activeColor: String,
    activeTextColor: String,
    gutter: String,
    padding: {
      type: String,
      default: "3px 2px"
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const { proxy: a } = ye(), { $q: n } = a, l = rt(e, n), o = s(() => parseInt(e.min, 10)), i = s(() => parseInt(e.max, 10)), r = s(() => parseInt(e.maxPages, 10)), u = s(() => g.value + " / " + i.value), c = s(() => ul(e.boundaryLinks, e.input)), d = s(() => ul(e.boundaryNumbers, !e.input)), v = s(() => ul(e.directionLinks, e.input)), b = s(() => ul(e.ellipses, !e.input)), m = z(null), g = s({
      get: () => e.modelValue,
      set: (T) => {
        if (T = parseInt(T, 10), e.disable || isNaN(T)) return;
        const H = mt(T, o.value, i.value);
        e.modelValue !== H && t("update:modelValue", H);
      }
    });
    se(() => `${o.value}|${i.value}`, () => {
      g.value = e.modelValue;
    });
    const p = s(() => "q-pagination row no-wrap items-center" + (e.disable === !0 ? " disabled" : "")), k = s(() => e.gutter in Sl ? `${Sl[e.gutter]}px` : e.gutter || null), C = s(() => k.value !== null ? `--q-pagination-gutter-parent:-${k.value};--q-pagination-gutter-child:${k.value}` : null), y = s(() => {
      const T = [
        e.iconFirst || n.iconSet.pagination.first,
        e.iconPrev || n.iconSet.pagination.prev,
        e.iconNext || n.iconSet.pagination.next,
        e.iconLast || n.iconSet.pagination.last
      ];
      return n.lang.rtl === !0 ? T.reverse() : T;
    }), h = s(() => ({
      "aria-disabled": e.disable === !0 ? "true" : "false",
      role: "navigation"
    })), w = s(() => ai(e, "flat")), x = s(() => ({
      [w.value]: !0,
      round: e.round,
      rounded: e.rounded,
      padding: e.padding,
      color: e.color,
      textColor: e.textColor,
      size: e.size,
      ripple: e.ripple !== null ? e.ripple : !0
    })), L = s(() => {
      const T = { [w.value]: !1 };
      return e.activeDesign !== "" && (T[e.activeDesign] = !0), T;
    }), M = s(() => ({
      ...L.value,
      color: e.activeColor || e.color,
      textColor: e.activeTextColor || e.textColor
    })), K = s(() => {
      let T = Math.max(r.value, 1 + (b.value ? 2 : 0) + (d.value ? 2 : 0));
      const H = {
        pgFrom: o.value,
        pgTo: i.value,
        ellipsesStart: !1,
        ellipsesEnd: !1,
        boundaryStart: !1,
        boundaryEnd: !1,
        marginalStyle: { minWidth: `${Math.max(2, String(i.value).length)}em` }
      };
      return r.value && T < i.value - o.value + 1 && (T = 1 + Math.floor(T / 2) * 2, H.pgFrom = Math.max(o.value, Math.min(i.value - T + 1, e.modelValue - Math.floor(T / 2))), H.pgTo = Math.min(i.value, H.pgFrom + T - 1), d.value && (H.boundaryStart = !0, H.pgFrom++), b.value && H.pgFrom > o.value + (d.value ? 1 : 0) && (H.ellipsesStart = !0, H.pgFrom++), d.value && (H.boundaryEnd = !0, H.pgTo--), b.value && H.pgTo < i.value - (d.value ? 1 : 0) && (H.ellipsesEnd = !0, H.pgTo--)), H;
    });
    function X(T) {
      g.value = T;
    }
    function A(T) {
      g.value = g.value + T;
    }
    function $() {
      g.value = m.value, m.value = null, n.platform.is.mobile === !0 && document.activeElement.blur();
    }
    function D(T) {
      m.value = T;
    }
    function _(T) {
      la(T, 13) === !0 && $();
    }
    function S(T, H, E) {
      const Q = {
        "aria-label": H,
        "aria-current": "false",
        ...x.value,
        ...T
      };
      return E === !0 && Object.assign(Q, {
        "aria-current": "true",
        ...M.value
      }), H !== void 0 && (e.toFn !== void 0 ? Q.to = e.toFn(H) : Q.onClick = () => {
        X(H);
      }), f(ft, Q);
    }
    return Object.assign(a, {
      set: X,
      setByOffset: A
    }), () => {
      const T = [], H = [];
      let E;
      if (c.value === !0 && (T.push(S({
        key: "bls",
        disable: e.disable || e.modelValue <= o.value,
        icon: y.value[0],
        "aria-label": n.lang.pagination.first
      }, o.value)), H.unshift(S({
        key: "ble",
        disable: e.disable || e.modelValue >= i.value,
        icon: y.value[3],
        "aria-label": n.lang.pagination.last
      }, i.value))), v.value === !0 && (T.push(S({
        key: "bdp",
        disable: e.disable || e.modelValue <= o.value,
        icon: y.value[1],
        "aria-label": n.lang.pagination.prev
      }, e.modelValue - 1)), H.unshift(S({
        key: "bdn",
        disable: e.disable || e.modelValue >= i.value,
        icon: y.value[2],
        "aria-label": n.lang.pagination.next
      }, e.modelValue + 1))), e.input !== !0) {
        E = [];
        const { pgFrom: Q, pgTo: j, marginalStyle: N } = K.value;
        if (K.value.boundaryStart === !0) {
          const Z = o.value === e.modelValue;
          T.push(S({
            key: "bns",
            style: N,
            disable: e.disable,
            label: o.value
          }, o.value, Z));
        }
        if (K.value.boundaryEnd === !0) {
          const Z = i.value === e.modelValue;
          H.unshift(S({
            key: "bne",
            style: N,
            disable: e.disable,
            label: i.value
          }, i.value, Z));
        }
        K.value.ellipsesStart === !0 && T.push(S({
          key: "bes",
          style: N,
          disable: e.disable,
          label: "…",
          ripple: !1
        }, Q - 1)), K.value.ellipsesEnd === !0 && H.unshift(S({
          key: "bee",
          style: N,
          disable: e.disable,
          label: "…",
          ripple: !1
        }, j + 1));
        for (let Z = Q; Z <= j; Z++) E.push(S({
          key: `bpg${Z}`,
          style: N,
          disable: e.disable,
          label: Z
        }, Z, Z === e.modelValue));
      }
      return f("div", {
        class: p.value,
        ...h.value
      }, [f("div", {
        class: "q-pagination__content row no-wrap items-center",
        style: C.value
      }, [
        ...T,
        e.input === !0 ? f(_i, {
          class: "inline",
          style: { width: `${u.value.length / 1.5}em` },
          type: "number",
          dense: !0,
          value: m.value,
          disable: e.disable,
          dark: l.value,
          borderless: !0,
          inputClass: e.inputClass,
          inputStyle: e.inputStyle,
          placeholder: u.value,
          min: o.value,
          max: i.value,
          "onUpdate:modelValue": D,
          onKeyup: _,
          onBlur: $
        }) : f("div", { class: "q-pagination__middle row justify-center" }, E),
        ...H
      ])]);
    };
  }
});
function Co(e) {
  let t = !1, a, n;
  function l() {
    n = arguments, t !== !0 && (t = !0, a = window.requestAnimationFrame(() => {
      e.apply(this, n), n = void 0, t = !1;
    }));
  }
  return l.cancel = () => {
    window.cancelAnimationFrame(a), t = !1;
  }, l;
}
const { passive: dl } = gt;
var zv = re({
  name: "QParallax",
  props: {
    src: String,
    height: {
      type: Number,
      default: 500
    },
    speed: {
      type: Number,
      default: 1,
      validator: (e) => e >= 0 && e <= 1
    },
    scrollTarget: nn,
    onScroll: Function
  },
  setup(e, { slots: t, emit: a }) {
    const n = z(0), l = z(null), o = z(null), i = z(null);
    let r, u, c, d, v, b;
    se(() => e.height, () => {
      r === !0 && g();
    }), se(() => e.scrollTarget, () => {
      r === !0 && (y(), C());
    });
    let m = (h) => {
      n.value = h, e.onScroll !== void 0 && a("scroll", h);
    };
    function g() {
      let h, w, x;
      b === window ? (h = 0, x = w = window.innerHeight) : (h = Cl(b).top, w = xn(b), x = h + w);
      const L = Cl(l.value).top, M = L + e.height;
      if (v !== void 0 || M > h && L < x) {
        const K = (x - L) / (e.height + w);
        p((c - e.height) * K * e.speed), m(K);
      }
    }
    let p = (h) => {
      u.style.transform = `translate3d(-50%,${Math.round(h)}px,0)`;
    };
    function k() {
      c = u.naturalHeight || u.videoHeight || xn(u), r === !0 && g();
    }
    function C() {
      r = !0, b = ma(l.value, e.scrollTarget), b.addEventListener("scroll", g, dl), window.addEventListener("resize", d, dl), g();
    }
    function y() {
      r === !0 && (r = !1, b.removeEventListener("scroll", g, dl), window.removeEventListener("resize", d, dl), b = void 0, p.cancel(), m.cancel(), d.cancel());
    }
    return bt(() => {
      p = Co(p), m = Co(m), d = Co(k), u = t.media !== void 0 ? o.value.children[0] : i.value, u.onload = u.onloadstart = u.loadedmetadata = k, k(), u.style.display = "initial", window.IntersectionObserver !== void 0 ? (v = new IntersectionObserver((h) => {
        (h[0].isIntersecting === !0 ? C : y)();
      }), v.observe(l.value)) : C();
    }), tt(() => {
      y(), v == null || v.disconnect(), u.onload = u.onloadstart = u.loadedmetadata = null;
    }), () => f("div", {
      ref: l,
      class: "q-parallax",
      style: { height: `${e.height}px` }
    }, [f("div", {
      ref: o,
      class: "q-parallax__media absolute-full"
    }, t.media !== void 0 ? t.media() : [f("img", {
      ref: i,
      src: e.src
    })]), f("div", { class: "q-parallax__content absolute-full column flex-center" }, t.content !== void 0 ? t.content({ percentScrolled: n.value }) : De(t.default))]);
  }
});
function On(e, t = /* @__PURE__ */ new WeakMap()) {
  if (Object(e) !== e) return e;
  if (t.has(e)) return t.get(e);
  const a = e instanceof Date ? new Date(e) : e instanceof RegExp ? new RegExp(e.source, e.flags) : e instanceof Set ? /* @__PURE__ */ new Set() : e instanceof Map ? /* @__PURE__ */ new Map() : typeof e.constructor != "function" ? /* @__PURE__ */ Object.create(null) : e.prototype !== void 0 && typeof e.prototype.constructor == "function" ? e : new e.constructor();
  if (typeof e.constructor == "function" && typeof e.valueOf == "function") {
    const n = e.valueOf();
    if (Object(n) !== n) {
      const l = new e.constructor(n);
      return t.set(e, l), l;
    }
  }
  return t.set(e, a), e instanceof Set ? e.forEach((n) => {
    a.add(On(n, t));
  }) : e instanceof Map && e.forEach((n, l) => {
    a.set(l, On(n, t));
  }), Object.assign(a, ...Object.keys(e).map((n) => ({ [n]: On(e[n], t) })));
}
re({
  name: "QPopupEdit",
  props: {
    modelValue: { required: !0 },
    title: String,
    buttons: Boolean,
    labelSet: String,
    labelCancel: String,
    color: {
      type: String,
      default: "primary"
    },
    validate: {
      type: Function,
      default: () => !0
    },
    autoSave: Boolean,
    cover: {
      type: Boolean,
      default: !0
    },
    disable: Boolean
  },
  emits: [
    "update:modelValue",
    "save",
    "cancel",
    "beforeShow",
    "show",
    "beforeHide",
    "hide"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), { $q: l } = n, o = z(null), i = z(""), r = z("");
    let u = !1;
    const c = s(() => Rt({
      initialValue: i.value,
      validate: e.validate,
      set: d,
      cancel: v,
      updatePosition: b
    }, "value", () => r.value, (w) => {
      r.value = w;
    }));
    function d() {
      e.validate(r.value) !== !1 && (m() === !0 && (a("save", r.value, i.value), a("update:modelValue", r.value)), g());
    }
    function v() {
      m() === !0 && a("cancel", r.value, i.value), g();
    }
    function b() {
      nt(() => {
        o.value.updatePosition();
      });
    }
    function m() {
      return ua(r.value, i.value) === !1;
    }
    function g() {
      u = !0, o.value.hide();
    }
    function p() {
      u = !1, i.value = On(e.modelValue), r.value = On(e.modelValue), a("beforeShow");
    }
    function k() {
      a("show");
    }
    function C() {
      u === !1 && m() === !0 && (e.autoSave === !0 && e.validate(r.value) === !0 ? (a("save", r.value, i.value), a("update:modelValue", r.value)) : a("cancel", r.value, i.value)), a("beforeHide");
    }
    function y() {
      a("hide");
    }
    function h() {
      const w = t.default !== void 0 ? [].concat(t.default(c.value)) : [];
      return e.title && w.unshift(f("div", { class: "q-dialog__title q-mt-sm q-mb-sm" }, e.title)), e.buttons === !0 && w.push(f("div", { class: "q-popup-edit__buttons row justify-center no-wrap" }, [f(ft, {
        flat: !0,
        color: e.color,
        label: e.labelCancel || l.lang.label.cancel,
        onClick: v
      }), f(ft, {
        flat: !0,
        color: e.color,
        label: e.labelSet || l.lang.label.set,
        onClick: d
      })])), w;
    }
    return Object.assign(n, {
      set: d,
      cancel: v,
      show(w) {
        var x;
        (x = o.value) == null || x.show(w);
      },
      hide(w) {
        var x;
        (x = o.value) == null || x.hide(w);
      },
      updatePosition: b
    }), () => {
      if (e.disable !== !0)
        return f(Ol, {
          ref: o,
          class: "q-popup-edit",
          cover: e.cover,
          onBeforeShow: p,
          onShow: k,
          onBeforeHide: C,
          onHide: y,
          onEscapeKey: v
        }, h);
    };
  }
});
re({
  name: "QPopupProxy",
  props: {
    ...$s,
    breakpoint: {
      type: [String, Number],
      default: 450
    }
  },
  emits: ["show", "hide"],
  setup(e, { slots: t, emit: a, attrs: n }) {
    const { proxy: l } = ye(), { $q: o } = l, i = z(!1), r = z(null), u = s(() => parseInt(e.breakpoint, 10)), { canShow: c } = li({ showing: i });
    function d() {
      return o.screen.width < u.value || o.screen.height < u.value ? "dialog" : "menu";
    }
    const v = z(d()), b = s(() => v.value === "menu" ? { maxHeight: "99vh" } : {});
    se(() => d(), (p) => {
      i.value !== !0 && (v.value = p);
    });
    function m(p) {
      i.value = !0, a("show", p);
    }
    function g(p) {
      i.value = !1, v.value = d(), a("hide", p);
    }
    return Object.assign(l, {
      show(p) {
        c(p) === !0 && r.value.show(p);
      },
      hide(p) {
        r.value.hide(p);
      },
      toggle(p) {
        r.value.toggle(p);
      }
    }), Rt(l, "currentComponent", () => ({
      type: v.value,
      ref: r.value
    })), () => {
      const p = {
        ref: r,
        ...b.value,
        ...n,
        onShow: m,
        onHide: g
      };
      let k;
      return v.value === "dialog" ? k = Nl : (k = Ol, Object.assign(p, {
        target: e.target,
        contextMenu: e.contextMenu,
        noParentEvent: !0,
        separateClosePopup: !0
      })), f(k, p, t.default);
    };
  }
});
const Vv = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 10,
  xl: 14
};
function _r(e, t, a) {
  return { transform: t === !0 ? `translateX(${a.lang.rtl === !0 ? "-" : ""}100%) scale3d(${-e},1,1)` : `scale3d(${e},1,1)` };
}
var Vu = re({
  name: "QLinearProgress",
  props: {
    ...it,
    ...xa,
    value: {
      type: Number,
      default: 0
    },
    buffer: Number,
    color: String,
    trackColor: String,
    reverse: Boolean,
    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,
    animationSpeed: {
      type: [String, Number],
      default: 2100
    },
    instantFeedback: Boolean
  },
  setup(e, { slots: t }) {
    const { proxy: a } = ye(), n = rt(e, a.$q), l = _a(e, Vv), o = s(() => e.indeterminate === !0 || e.query === !0), i = s(() => e.reverse !== e.query), r = s(() => ({
      ...l.value !== null ? l.value : {},
      "--q-linear-progress-speed": `${e.animationSpeed}ms`
    })), u = s(() => "q-linear-progress" + (e.color !== void 0 ? ` text-${e.color}` : "") + (e.reverse === !0 || e.query === !0 ? " q-linear-progress--reverse" : "") + (e.rounded === !0 ? " rounded-borders" : "")), c = s(() => _r(e.buffer !== void 0 ? e.buffer : 1, i.value, a.$q)), d = s(() => `with${e.instantFeedback === !0 ? "out" : ""}-transition`), v = s(() => `q-linear-progress__track absolute-full q-linear-progress__track--${d.value} q-linear-progress__track--${n.value === !0 ? "dark" : "light"}` + (e.trackColor !== void 0 ? ` bg-${e.trackColor}` : "")), b = s(() => _r(o.value === !0 ? 1 : e.value, i.value, a.$q)), m = s(() => `q-linear-progress__model absolute-full q-linear-progress__model--${d.value} q-linear-progress__model--${o.value === !0 ? "in" : ""}determinate`), g = s(() => ({ width: `${e.value * 100}%` })), p = s(() => `q-linear-progress__stripe absolute-${e.reverse === !0 ? "right" : "left"} q-linear-progress__stripe--${d.value}`);
    return () => {
      const k = [f("div", {
        class: v.value,
        style: c.value
      }), f("div", {
        class: m.value,
        style: b.value
      })];
      return e.stripe === !0 && o.value === !1 && k.push(f("div", {
        class: p.value,
        style: g.value
      })), f("div", {
        class: u.value,
        style: r.value,
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": e.indeterminate === !0 ? void 0 : e.value
      }, $t(t.default, k));
    };
  }
});
const cn = 40, So = 20;
var Pv = re({
  name: "QPullToRefresh",
  props: {
    color: String,
    bgColor: String,
    icon: String,
    noMouse: Boolean,
    disable: Boolean,
    scrollTarget: nn
  },
  emits: ["refresh"],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), { $q: l } = n, o = z("pull"), i = z(0), r = z(!1), u = z(-cn), c = z(!1), d = z({}), v = s(() => ({
      opacity: i.value,
      transform: `translateY(${u.value}px) rotate(${i.value * 360}deg)`
    })), b = s(() => "q-pull-to-refresh__puller row flex-center" + (c.value === !0 ? " q-pull-to-refresh__puller--animating" : "") + (e.bgColor !== void 0 ? ` bg-${e.bgColor}` : ""));
    function m(x) {
      if (x.isFinal === !0) {
        r.value === !0 && (r.value = !1, o.value === "pulled" ? (o.value = "refreshing", h({ pos: So }), k()) : o.value === "pull" && h({
          pos: -cn,
          ratio: 0
        }));
        return;
      }
      if (c.value === !0 || o.value === "refreshing") return !1;
      if (x.isFirst === !0) {
        if (La(C) !== 0 || x.direction !== "down")
          return r.value === !0 && (r.value = !1, o.value = "pull", h({
            pos: -cn,
            ratio: 0
          })), !1;
        r.value = !0;
        const { top: K, left: X } = n.$el.getBoundingClientRect();
        d.value = {
          top: K + "px",
          left: X + "px",
          width: window.getComputedStyle(n.$el).getPropertyValue("width")
        };
      }
      Ft(x.evt);
      const L = Math.min(140, Math.max(0, x.distance.y));
      u.value = L - cn, i.value = mt(L / (So + cn), 0, 1);
      const M = u.value > So ? "pulled" : "pull";
      o.value !== M && (o.value = M);
    }
    const g = s(() => {
      const x = { down: !0 };
      return e.noMouse !== !0 && (x.mouse = !0), [[
        ta,
        m,
        void 0,
        x
      ]];
    }), p = s(() => `q-pull-to-refresh__content${r.value === !0 ? " no-pointer-events" : ""}`);
    function k() {
      a("refresh", () => {
        h({
          pos: -cn,
          ratio: 0
        }, () => {
          o.value = "pull";
        });
      });
    }
    let C, y = null;
    function h({ pos: x, ratio: L }, M) {
      c.value = !0, u.value = x, L !== void 0 && (i.value = L), y !== null && clearTimeout(y), y = setTimeout(() => {
        y = null, c.value = !1, M == null || M();
      }, 300);
    }
    function w() {
      C = ma(n.$el, e.scrollTarget);
    }
    return se(() => e.scrollTarget, w), bt(w), tt(() => {
      y !== null && clearTimeout(y);
    }), Object.assign(n, {
      trigger: k,
      updateScrollTarget: w
    }), () => oa("div", { class: "q-pull-to-refresh" }, [f("div", { class: p.value }, De(t.default)), f("div", {
      class: "q-pull-to-refresh__puller-container fixed row flex-center no-pointer-events z-top",
      style: d.value
    }, [f("div", {
      class: b.value,
      style: v.value
    }, [o.value !== "refreshing" ? f(st, {
      name: e.icon || l.iconSet.pullToRefresh.icon,
      color: e.color,
      size: "32px"
    }) : f(ia, {
      size: "24px",
      color: e.color
    })])])], "main", e.disable === !1, () => g.value);
  }
});
const qa = {
  MIN: 0,
  RANGE: 1,
  MAX: 2
};
var Rv = re({
  name: "QRange",
  props: {
    ...Ws,
    modelValue: {
      type: Object,
      default: () => ({
        min: null,
        max: null
      }),
      validator: (e) => "min" in e && "max" in e
    },
    dragRange: Boolean,
    dragOnlyRange: Boolean,
    leftLabelColor: String,
    leftLabelTextColor: String,
    rightLabelColor: String,
    rightLabelTextColor: String,
    leftLabelValue: [String, Number],
    rightLabelValue: [String, Number],
    leftThumbColor: String,
    rightThumbColor: String
  },
  emits: Ys,
  setup(e, { emit: t }) {
    const { proxy: { $q: a } } = ye(), { state: n, methods: l } = Xs({
      updateValue: K,
      updatePosition: A,
      getDragging: X,
      formAttrs: s(() => ({
        type: "hidden",
        name: e.name,
        value: `${e.modelValue.min}|${e.modelValue.max}`
      }))
    }), o = z(null), i = z(0), r = z(0), u = z({
      min: 0,
      max: 0
    });
    function c() {
      u.value.min = e.modelValue.min === null ? n.innerMin.value : mt(e.modelValue.min, n.innerMin.value, n.innerMax.value), u.value.max = e.modelValue.max === null ? n.innerMax.value : mt(e.modelValue.max, n.innerMin.value, n.innerMax.value);
    }
    se(() => `${e.modelValue.min}|${e.modelValue.max}|${n.innerMin.value}|${n.innerMax.value}`, c), c();
    const d = s(() => l.convertModelToRatio(u.value.min)), v = s(() => l.convertModelToRatio(u.value.max)), b = s(() => n.active.value === !0 ? i.value : d.value), m = s(() => n.active.value === !0 ? r.value : v.value), g = s(() => {
      const D = {
        [n.positionProp.value]: `${100 * b.value}%`,
        [n.sizeProp.value]: `${100 * (m.value - b.value)}%`
      };
      return e.selectionImg !== void 0 && (D.backgroundImage = `url(${e.selectionImg}) !important`), D;
    }), p = s(() => {
      if (n.editable.value !== !0) return {};
      if (a.platform.is.mobile === !0) return { onClick: l.onMobileClick };
      const D = { onMousedown: l.onActivate };
      return (e.dragRange === !0 || e.dragOnlyRange === !0) && Object.assign(D, {
        onFocus: () => {
          n.focus.value = "both";
        },
        onBlur: l.onBlur,
        onKeydown: $,
        onKeyup: l.onKeyup
      }), D;
    });
    function k(D) {
      return a.platform.is.mobile !== !0 && n.editable.value === !0 && e.dragOnlyRange !== !0 ? {
        onFocus: () => {
          n.focus.value = D;
        },
        onBlur: l.onBlur,
        onKeydown: $,
        onKeyup: l.onKeyup
      } : {};
    }
    const C = s(() => e.dragOnlyRange !== !0 ? n.tabindex.value : null), y = s(() => a.platform.is.mobile !== !0 && (e.dragRange || e.dragOnlyRange === !0) ? n.tabindex.value : null), h = z(null), w = s(() => k("min")), x = l.getThumbRenderFn({
      focusValue: "min",
      getNodeData: () => ({
        ref: h,
        key: "tmin",
        ...w.value,
        tabindex: C.value
      }),
      ratio: b,
      label: s(() => e.leftLabelValue !== void 0 ? e.leftLabelValue : u.value.min),
      thumbColor: s(() => e.leftThumbColor || e.thumbColor || e.color),
      labelColor: s(() => e.leftLabelColor || e.labelColor),
      labelTextColor: s(() => e.leftLabelTextColor || e.labelTextColor)
    }), L = s(() => k("max")), M = l.getThumbRenderFn({
      focusValue: "max",
      getNodeData: () => ({
        ...L.value,
        key: "tmax",
        tabindex: C.value
      }),
      ratio: m,
      label: s(() => e.rightLabelValue !== void 0 ? e.rightLabelValue : u.value.max),
      thumbColor: s(() => e.rightThumbColor || e.thumbColor || e.color),
      labelColor: s(() => e.rightLabelColor || e.labelColor),
      labelTextColor: s(() => e.rightLabelTextColor || e.labelTextColor)
    });
    function K(D) {
      (u.value.min !== e.modelValue.min || u.value.max !== e.modelValue.max) && t("update:modelValue", { ...u.value }), D === !0 && t("change", { ...u.value });
    }
    function X(D) {
      const { left: _, top: S, width: T, height: H } = o.value.getBoundingClientRect(), E = e.dragOnlyRange === !0 ? 0 : e.vertical === !0 ? h.value.offsetHeight / (2 * H) : h.value.offsetWidth / (2 * T), Q = {
        left: _,
        top: S,
        width: T,
        height: H,
        valueMin: u.value.min,
        valueMax: u.value.max,
        ratioMin: d.value,
        ratioMax: v.value
      }, j = l.getDraggingRatio(D, Q);
      return e.dragOnlyRange !== !0 && j < Q.ratioMin + E ? Q.type = qa.MIN : e.dragOnlyRange === !0 || j < Q.ratioMax - E ? e.dragRange === !0 || e.dragOnlyRange === !0 ? (Q.type = qa.RANGE, Object.assign(Q, {
        offsetRatio: j,
        offsetModel: l.convertRatioToModel(j),
        rangeValue: Q.valueMax - Q.valueMin,
        rangeRatio: Q.ratioMax - Q.ratioMin
      })) : Q.type = Q.ratioMax - j < j - Q.ratioMin ? qa.MAX : qa.MIN : Q.type = qa.MAX, Q;
    }
    function A(D, _ = n.dragging.value) {
      let S;
      const T = l.getDraggingRatio(D, _), H = l.convertRatioToModel(T);
      switch (_.type) {
        case qa.MIN:
          T <= _.ratioMax ? (S = {
            minR: T,
            maxR: _.ratioMax,
            min: H,
            max: _.valueMax
          }, n.focus.value = "min") : (S = {
            minR: _.ratioMax,
            maxR: T,
            min: _.valueMax,
            max: H
          }, n.focus.value = "max");
          break;
        case qa.MAX:
          T >= _.ratioMin ? (S = {
            minR: _.ratioMin,
            maxR: T,
            min: _.valueMin,
            max: H
          }, n.focus.value = "max") : (S = {
            minR: T,
            maxR: _.ratioMin,
            min: H,
            max: _.valueMin
          }, n.focus.value = "min");
          break;
        case qa.RANGE:
          const E = T - _.offsetRatio, Q = mt(_.ratioMin + E, n.innerMinRatio.value, n.innerMaxRatio.value - _.rangeRatio), j = H - _.offsetModel, N = mt(_.valueMin + j, n.innerMin.value, n.innerMax.value - _.rangeValue);
          S = {
            minR: Q,
            maxR: Q + _.rangeRatio,
            min: n.roundValueFn.value(N),
            max: n.roundValueFn.value(N + _.rangeValue)
          }, n.focus.value = "both";
          break;
      }
      u.value = u.value.min === null || u.value.max === null ? {
        min: S.min || e.min,
        max: S.max || e.max
      } : {
        min: S.min,
        max: S.max
      }, e.snap !== !0 || e.step === 0 ? (i.value = S.minR, r.value = S.maxR) : (i.value = l.convertModelToRatio(u.value.min), r.value = l.convertModelToRatio(u.value.max));
    }
    function $(D) {
      if (pi.includes(D.keyCode) === !1) return;
      Ye(D);
      const _ = ([34, 33].includes(D.keyCode) ? 10 : 1) * n.keyStep.value, S = ([
        34,
        37,
        40
      ].includes(D.keyCode) ? -1 : 1) * (n.isReversed.value === !0 ? -1 : 1) * (e.vertical === !0 ? -1 : 1) * _;
      if (n.focus.value === "both") {
        const T = u.value.max - u.value.min, H = mt(n.roundValueFn.value(u.value.min + S), n.innerMin.value, n.innerMax.value - T);
        u.value = {
          min: H,
          max: n.roundValueFn.value(H + T)
        };
      } else {
        if (n.focus.value === !1) return;
        {
          const T = n.focus.value;
          u.value = {
            ...u.value,
            [T]: mt(n.roundValueFn.value(u.value[T] + S), T === "min" ? n.innerMin.value : u.value.min, T === "max" ? n.innerMax.value : u.value.max)
          };
        }
      }
      K();
    }
    return () => {
      const D = l.getContent(g, y, p, (_) => {
        _.push(x(), M());
      });
      return f("div", {
        ref: o,
        class: "q-range " + n.classes.value + (e.modelValue.min === null || e.modelValue.max === null ? " q-slider--no-value" : ""),
        ...n.attributes.value,
        "aria-valuenow": e.modelValue.min + "|" + e.modelValue.max
      }, D);
    };
  }
}), Fv = re({
  name: "QRating",
  props: {
    ...xa,
    ...ra,
    modelValue: {
      type: Number,
      required: !0
    },
    max: {
      type: [String, Number],
      default: 5
    },
    icon: [String, Array],
    iconHalf: [String, Array],
    iconSelected: [String, Array],
    iconAriaLabel: [String, Array],
    color: [String, Array],
    colorHalf: [String, Array],
    colorSelected: [String, Array],
    noReset: Boolean,
    noDimming: Boolean,
    readonly: Boolean,
    disable: Boolean
  },
  emits: ["update:modelValue"],
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = ye(), l = _a(e), o = Ra(Zn(e)), i = z(0);
    let r = {};
    const u = s(() => e.readonly !== !0 && e.disable !== !0), c = s(() => `q-rating row inline items-center q-rating--${u.value === !0 ? "" : "non-"}editable` + (e.noDimming === !0 ? " q-rating--no-dimming" : "") + (e.disable === !0 ? " disabled" : "") + (e.color !== void 0 && Array.isArray(e.color) === !1 ? ` text-${e.color}` : "")), d = s(() => {
      const y = Array.isArray(e.icon) === !0 ? e.icon.length : 0, h = Array.isArray(e.iconSelected) === !0 ? e.iconSelected.length : 0, w = Array.isArray(e.iconHalf) === !0 ? e.iconHalf.length : 0, x = Array.isArray(e.color) === !0 ? e.color.length : 0, L = Array.isArray(e.colorSelected) === !0 ? e.colorSelected.length : 0, M = Array.isArray(e.colorHalf) === !0 ? e.colorHalf.length : 0;
      return {
        iconLen: y,
        icon: y > 0 ? e.icon[y - 1] : e.icon,
        selIconLen: h,
        selIcon: h > 0 ? e.iconSelected[h - 1] : e.iconSelected,
        halfIconLen: w,
        halfIcon: w > 0 ? e.iconHalf[h - 1] : e.iconHalf,
        colorLen: x,
        color: x > 0 ? e.color[x - 1] : e.color,
        selColorLen: L,
        selColor: L > 0 ? e.colorSelected[L - 1] : e.colorSelected,
        halfColorLen: M,
        halfColor: M > 0 ? e.colorHalf[M - 1] : e.colorHalf
      };
    }), v = s(() => {
      if (typeof e.iconAriaLabel == "string") {
        const y = e.iconAriaLabel.length !== 0 ? `${e.iconAriaLabel} ` : "";
        return (h) => `${y}${h}`;
      }
      if (Array.isArray(e.iconAriaLabel) === !0) {
        const y = e.iconAriaLabel.length;
        if (y > 0) return (h) => e.iconAriaLabel[Math.min(h, y) - 1];
      }
      return (y, h) => `${h} ${y}`;
    }), b = s(() => {
      const y = [], h = d.value, w = Math.ceil(e.modelValue), x = u.value === !0 ? 0 : null, L = e.iconHalf === void 0 || w === e.modelValue ? -1 : w;
      for (let M = 1; M <= e.max; M++) {
        const K = i.value === 0 && e.modelValue >= M || i.value > 0 && i.value >= M, X = L === M && i.value < M, A = i.value > 0 && (X === !0 ? w : e.modelValue) >= M && i.value < M, $ = X === !0 ? M <= h.halfColorLen ? e.colorHalf[M - 1] : h.halfColor : h.selColor !== void 0 && K === !0 ? M <= h.selColorLen ? e.colorSelected[M - 1] : h.selColor : M <= h.colorLen ? e.color[M - 1] : h.color, D = (X === !0 ? M <= h.halfIconLen ? e.iconHalf[M - 1] : h.halfIcon : h.selIcon !== void 0 && (K === !0 || A === !0) ? M <= h.selIconLen ? e.iconSelected[M - 1] : h.selIcon : M <= h.iconLen ? e.icon[M - 1] : h.icon) || n.iconSet.rating.icon;
        y.push({
          name: (X === !0 ? M <= h.halfIconLen ? e.iconHalf[M - 1] : h.halfIcon : h.selIcon !== void 0 && (K === !0 || A === !0) ? M <= h.selIconLen ? e.iconSelected[M - 1] : h.selIcon : M <= h.iconLen ? e.icon[M - 1] : h.icon) || n.iconSet.rating.icon,
          attrs: {
            tabindex: x,
            role: "radio",
            "aria-checked": e.modelValue === M ? "true" : "false",
            "aria-label": v.value(M, D)
          },
          iconClass: "q-rating__icon" + (K === !0 || X === !0 ? " q-rating__icon--active" : "") + (A === !0 ? " q-rating__icon--exselected" : "") + (i.value === M ? " q-rating__icon--hovered" : "") + ($ !== void 0 ? ` text-${$}` : "")
        });
      }
      return y;
    }), m = s(() => {
      const y = { role: "radiogroup" };
      return e.disable === !0 && (y["aria-disabled"] = "true"), e.readonly === !0 && (y["aria-readonly"] = "true"), y;
    });
    function g(y) {
      if (u.value === !0) {
        const h = mt(parseInt(y, 10), 1, parseInt(e.max, 10)), w = e.noReset !== !0 && e.modelValue === h ? 0 : h;
        w !== e.modelValue && a("update:modelValue", w), i.value = 0;
      }
    }
    function p(y) {
      u.value === !0 && (i.value = y);
    }
    function k(y, h) {
      switch (y.keyCode) {
        case 13:
        case 32:
          return g(h), Ye(y);
        case 37:
        case 40:
          return r[`rt${h - 1}`] && r[`rt${h - 1}`].focus(), Ye(y);
        case 39:
        case 38:
          return r[`rt${h + 1}`] && r[`rt${h + 1}`].focus(), Ye(y);
      }
    }
    function C() {
      i.value = 0;
    }
    return Yn(() => {
      r = {};
    }), () => {
      const y = [];
      return b.value.forEach(({ iconClass: h, name: w, attrs: x }, L) => {
        const M = L + 1;
        y.push(f("div", {
          key: M,
          ref: (K) => {
            r[`rt${M}`] = K;
          },
          class: "q-rating__icon-container flex flex-center",
          ...x,
          onClick() {
            g(M);
          },
          onMouseover() {
            p(M);
          },
          onMouseout: C,
          onFocus() {
            p(M);
          },
          onBlur: C,
          onKeyup(K) {
            k(K, M);
          }
        }, $t(t[`tip-${M}`], [f(st, {
          class: h,
          name: w
        })])));
      }), e.name !== void 0 && e.disable !== !0 && o(y, "push"), f("div", {
        class: c.value,
        style: l.value,
        ...m.value
      }, y);
    };
  }
});
re({
  name: "QResponsive",
  props: wi,
  setup(e, { slots: t }) {
    const a = xi(e);
    return () => f("div", { class: "q-responsive" }, [f("div", { class: "q-responsive__filler overflow-hidden" }, [f("div", { style: a.value })]), f("div", { class: "q-responsive__content absolute-full fit" }, De(t.default))]);
  }
});
var Ev = re({
  props: [
    "store",
    "barStyle",
    "verticalBarStyle",
    "horizontalBarStyle"
  ],
  setup(e) {
    return () => [
      f("div", {
        class: e.store.scroll.vertical.barClass.value,
        style: [e.barStyle, e.verticalBarStyle],
        "aria-hidden": "true",
        onMousedown: e.store.onVerticalMousedown
      }),
      f("div", {
        class: e.store.scroll.horizontal.barClass.value,
        style: [e.barStyle, e.horizontalBarStyle],
        "aria-hidden": "true",
        onMousedown: e.store.onHorizontalMousedown
      }),
      aa(f("div", {
        ref: e.store.scroll.vertical.ref,
        class: e.store.scroll.vertical.thumbClass.value,
        style: e.store.scroll.vertical.style.value,
        "aria-hidden": "true"
      }), e.store.thumbVertDir),
      aa(f("div", {
        ref: e.store.scroll.horizontal.ref,
        class: e.store.scroll.horizontal.thumbClass.value,
        style: e.store.scroll.horizontal.style.value,
        "aria-hidden": "true"
      }), e.store.thumbHorizDir)
    ];
  }
});
const $r = ["vertical", "horizontal"], wo = {
  vertical: {
    offset: "offsetY",
    scroll: "scrollTop",
    dir: "down",
    dist: "y"
  },
  horizontal: {
    offset: "offsetX",
    scroll: "scrollLeft",
    dir: "right",
    dist: "x"
  }
}, qr = {
  prevent: !0,
  mouse: !0,
  mouseAllDir: !0
}, Br = (e) => e >= 250 ? 50 : Math.ceil(e / 5);
var Iv = re({
  name: "QScrollArea",
  props: {
    ...it,
    thumbStyle: Object,
    verticalThumbStyle: Object,
    horizontalThumbStyle: Object,
    barStyle: [
      Array,
      String,
      Object
    ],
    verticalBarStyle: [
      Array,
      String,
      Object
    ],
    horizontalBarStyle: [
      Array,
      String,
      Object
    ],
    verticalOffset: {
      type: Array,
      default: [0, 0]
    },
    horizontalOffset: {
      type: Array,
      default: [0, 0]
    },
    contentStyle: [
      Array,
      String,
      Object
    ],
    contentActiveStyle: [
      Array,
      String,
      Object
    ],
    delay: {
      type: [String, Number],
      default: 1e3
    },
    visible: {
      type: Boolean,
      default: null
    },
    tabindex: [String, Number],
    onScroll: Function
  },
  setup(e, { slots: t, emit: a }) {
    const n = z(!1), l = z(!1), o = z(!1), i = {
      vertical: z(0),
      horizontal: z(0)
    }, r = {
      vertical: {
        ref: z(null),
        position: z(0),
        size: z(0)
      },
      horizontal: {
        ref: z(null),
        position: z(0),
        size: z(0)
      }
    }, { proxy: u } = ye(), c = rt(e, u.$q);
    let d = null, v;
    const b = z(null), m = s(() => "q-scrollarea" + (c.value === !0 ? " q-scrollarea--dark" : ""));
    Object.assign(i, {
      verticalInner: s(() => i.vertical.value - e.verticalOffset[0] - e.verticalOffset[1]),
      horizontalInner: s(() => i.horizontal.value - e.horizontalOffset[0] - e.horizontalOffset[1])
    }), r.vertical.percentage = s(() => {
      const S = r.vertical.size.value - i.vertical.value;
      if (S <= 0) return 0;
      const T = mt(r.vertical.position.value / S, 0, 1);
      return Math.round(T * 1e4) / 1e4;
    }), r.vertical.thumbHidden = s(() => (e.visible === null ? o.value : e.visible) !== !0 && n.value === !1 && l.value === !1 || r.vertical.size.value <= i.vertical.value + 1), r.vertical.thumbStart = s(() => e.verticalOffset[0] + r.vertical.percentage.value * (i.verticalInner.value - r.vertical.thumbSize.value)), r.vertical.thumbSize = s(() => Math.round(mt(i.verticalInner.value * i.verticalInner.value / r.vertical.size.value, Br(i.verticalInner.value), i.verticalInner.value))), r.vertical.style = s(() => ({
      ...e.thumbStyle,
      ...e.verticalThumbStyle,
      top: `${r.vertical.thumbStart.value}px`,
      height: `${r.vertical.thumbSize.value}px`,
      right: `${e.horizontalOffset[1]}px`
    })), r.vertical.thumbClass = s(() => "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" + (r.vertical.thumbHidden.value === !0 ? " q-scrollarea__thumb--invisible" : "")), r.vertical.barClass = s(() => "q-scrollarea__bar q-scrollarea__bar--v absolute-right" + (r.vertical.thumbHidden.value === !0 ? " q-scrollarea__bar--invisible" : "")), r.horizontal.percentage = s(() => {
      const S = r.horizontal.size.value - i.horizontal.value;
      if (S <= 0) return 0;
      const T = mt(Math.abs(r.horizontal.position.value) / S, 0, 1);
      return Math.round(T * 1e4) / 1e4;
    }), r.horizontal.thumbHidden = s(() => (e.visible === null ? o.value : e.visible) !== !0 && n.value === !1 && l.value === !1 || r.horizontal.size.value <= i.horizontal.value + 1), r.horizontal.thumbStart = s(() => e.horizontalOffset[0] + r.horizontal.percentage.value * (i.horizontalInner.value - r.horizontal.thumbSize.value)), r.horizontal.thumbSize = s(() => Math.round(mt(i.horizontalInner.value * i.horizontalInner.value / r.horizontal.size.value, Br(i.horizontalInner.value), i.horizontalInner.value))), r.horizontal.style = s(() => ({
      ...e.thumbStyle,
      ...e.horizontalThumbStyle,
      [u.$q.lang.rtl === !0 ? "right" : "left"]: `${r.horizontal.thumbStart.value}px`,
      width: `${r.horizontal.thumbSize.value}px`,
      bottom: `${e.verticalOffset[1]}px`
    })), r.horizontal.thumbClass = s(() => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (r.horizontal.thumbHidden.value === !0 ? " q-scrollarea__thumb--invisible" : "")), r.horizontal.barClass = s(() => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (r.horizontal.thumbHidden.value === !0 ? " q-scrollarea__bar--invisible" : ""));
    const g = s(() => r.vertical.thumbHidden.value === !0 && r.horizontal.thumbHidden.value === !0 ? e.contentStyle : e.contentActiveStyle);
    function p() {
      const S = {};
      return $r.forEach((T) => {
        const H = r[T];
        Object.assign(S, {
          [T + "Position"]: H.position.value,
          [T + "Percentage"]: H.percentage.value,
          [T + "Size"]: H.size.value,
          [T + "ContainerSize"]: i[T].value,
          [T + "ContainerInnerSize"]: i[T + "Inner"].value
        });
      }), S;
    }
    const k = $n(() => {
      const S = p();
      S.ref = u, a("scroll", S);
    }, 0);
    function C(S, T, H) {
      if ($r.includes(S) === !1) {
        console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
        return;
      }
      (S === "vertical" ? Cn : no)(b.value, T, H);
    }
    function y({ height: S, width: T }) {
      let H = !1;
      i.vertical.value !== S && (i.vertical.value = S, H = !0), i.horizontal.value !== T && (i.horizontal.value = T, H = !0), H === !0 && M();
    }
    function h({ position: S }) {
      let T = !1;
      r.vertical.position.value !== S.top && (r.vertical.position.value = S.top, T = !0), r.horizontal.position.value !== S.left && (r.horizontal.position.value = S.left, T = !0), T === !0 && M();
    }
    function w({ height: S, width: T }) {
      r.horizontal.size.value !== T && (r.horizontal.size.value = T, M()), r.vertical.size.value !== S && (r.vertical.size.value = S, M());
    }
    function x(S, T) {
      const H = r[T];
      if (S.isFirst === !0) {
        if (H.thumbHidden.value === !0) return;
        v = H.position.value, l.value = !0;
      } else if (l.value !== !0) return;
      S.isFinal === !0 && (l.value = !1);
      const E = wo[T], Q = (H.size.value - i[T].value) / (i[T + "Inner"].value - H.thumbSize.value), j = S.distance[E.dist];
      K(v + (S.direction === E.dir ? 1 : -1) * j * Q, T);
    }
    function L(S, T) {
      const H = r[T];
      if (H.thumbHidden.value !== !0) {
        const E = T === "vertical" ? e.verticalOffset[0] : e.horizontalOffset[0], Q = S[wo[T].offset] - E, j = H.thumbStart.value - E;
        (Q < j || Q > j + H.thumbSize.value) && K(mt((Q - H.thumbSize.value / 2) / (i[T + "Inner"].value - H.thumbSize.value), 0, 1) * Math.max(0, H.size.value - i[T].value), T), H.ref.value !== null && H.ref.value.dispatchEvent(new MouseEvent(S.type, S));
      }
    }
    function M() {
      n.value = !0, d !== null && clearTimeout(d), d = setTimeout(() => {
        d = null, n.value = !1;
      }, e.delay), e.onScroll !== void 0 && k();
    }
    function K(S, T) {
      b.value[wo[T].scroll] = S;
    }
    let X = null;
    function A() {
      X !== null && clearTimeout(X), X = setTimeout(() => {
        X = null, o.value = !0;
      }, u.$q.platform.is.ios ? 50 : 0);
    }
    function $() {
      X !== null && (clearTimeout(X), X = null), o.value = !1;
    }
    let D = null;
    se(() => u.$q.lang.rtl, (S) => {
      b.value !== null && no(b.value, Math.abs(r.horizontal.position.value) * (S === !0 ? -1 : 1));
    }), wa(() => {
      D = {
        top: r.vertical.position.value,
        left: r.horizontal.position.value
      };
    }), en(() => {
      if (D === null) return;
      const S = b.value;
      S !== null && (no(S, D.left), Cn(S, D.top));
    }), tt(k.cancel), Object.assign(u, {
      getScrollTarget: () => b.value,
      getScroll: p,
      getScrollPosition: () => ({
        top: r.vertical.position.value,
        left: r.horizontal.position.value
      }),
      getScrollPercentage: () => ({
        top: r.vertical.percentage.value,
        left: r.horizontal.percentage.value
      }),
      setScrollPosition: C,
      setScrollPercentage(S, T, H) {
        C(S, T * (r[S].size.value - i[S].value) * (S === "horizontal" && u.$q.lang.rtl === !0 ? -1 : 1), H);
      }
    });
    const _ = {
      scroll: r,
      thumbVertDir: [[
        ta,
        (S) => {
          x(S, "vertical");
        },
        void 0,
        {
          vertical: !0,
          ...qr
        }
      ]],
      thumbHorizDir: [[
        ta,
        (S) => {
          x(S, "horizontal");
        },
        void 0,
        {
          horizontal: !0,
          ...qr
        }
      ]],
      onVerticalMousedown(S) {
        L(S, "vertical");
      },
      onHorizontalMousedown(S) {
        L(S, "horizontal");
      }
    };
    return () => f("div", {
      class: m.value,
      onMouseenter: A,
      onMouseleave: $
    }, [
      f("div", {
        ref: b,
        class: "q-scrollarea__container scroll relative-position fit hide-scrollbar",
        tabindex: e.tabindex !== void 0 ? e.tabindex : void 0
      }, [f("div", {
        class: "q-scrollarea__content absolute",
        style: g.value
      }, $t(t.default, [f(Ga, {
        debounce: 0,
        onResize: w
      })])), f(Du, {
        axis: "both",
        onScroll: h
      })]),
      f(Ga, {
        debounce: 0,
        onResize: y
      }),
      f(Ev, {
        store: _,
        barStyle: e.barStyle,
        verticalBarStyle: e.verticalBarStyle,
        horizontalBarStyle: e.horizontalBarStyle
      })
    ]);
  }
});
const sa = 1e3, Ov = [
  "start",
  "center",
  "end",
  "start-force",
  "center-force",
  "end-force"
], Pu = Array.prototype.filter, Hv = __QUASAR_SSR__ || window.getComputedStyle(document.body).overflowAnchor === void 0 ? At : function(t, a) {
  t !== null && (t._qOverflowAnimationFrame !== void 0 && cancelAnimationFrame(t._qOverflowAnimationFrame), t._qOverflowAnimationFrame = requestAnimationFrame(() => {
    if (t === null) return;
    t._qOverflowAnimationFrame = void 0;
    const n = t.children || [];
    Pu.call(n, (o) => o.dataset && o.dataset.qVsAnchor !== void 0).forEach((o) => {
      delete o.dataset.qVsAnchor;
    });
    const l = n[a];
    l != null && l.dataset && (l.dataset.qVsAnchor = "");
  }));
};
function Sn(e, t) {
  return e + t;
}
function xo(e, t, a, n, l, o, i, r) {
  const u = e === window ? document.scrollingElement || document.documentElement : e, c = l === !0 ? "offsetWidth" : "offsetHeight", d = {
    scrollStart: 0,
    scrollViewSize: -i - r,
    scrollMaxSize: 0,
    offsetStart: -i,
    offsetEnd: -r
  };
  if (l === !0 ? (e === window ? (d.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, d.scrollViewSize += document.documentElement.clientWidth) : (d.scrollStart = u.scrollLeft, d.scrollViewSize += u.clientWidth), d.scrollMaxSize = u.scrollWidth, o === !0 && (d.scrollStart = (Kn === !0 ? d.scrollMaxSize - d.scrollViewSize : 0) - d.scrollStart)) : (e === window ? (d.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0, d.scrollViewSize += document.documentElement.clientHeight) : (d.scrollStart = u.scrollTop, d.scrollViewSize += u.clientHeight), d.scrollMaxSize = u.scrollHeight), a !== null)
    for (let v = a.previousElementSibling; v !== null; v = v.previousElementSibling) v.classList.contains("q-virtual-scroll--skip") === !1 && (d.offsetStart += v[c]);
  if (n !== null)
    for (let v = n.nextElementSibling; v !== null; v = v.nextElementSibling) v.classList.contains("q-virtual-scroll--skip") === !1 && (d.offsetEnd += v[c]);
  if (t !== e) {
    const v = u.getBoundingClientRect(), b = t.getBoundingClientRect();
    l === !0 ? (d.offsetStart += b.left - v.left, d.offsetEnd -= b.width) : (d.offsetStart += b.top - v.top, d.offsetEnd -= b.height), e !== window && (d.offsetStart += d.scrollStart), d.offsetEnd += d.scrollMaxSize - d.offsetStart;
  }
  return d;
}
function Tr(e, t, a, n) {
  t === "end" && (t = (e === window ? document.body : e)[a === !0 ? "scrollWidth" : "scrollHeight"]), e === window ? a === !0 ? (n === !0 && (t = (Kn === !0 ? document.body.scrollWidth - document.documentElement.clientWidth : 0) - t), window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0)) : window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t) : a === !0 ? (n === !0 && (t = (Kn === !0 ? e.scrollWidth - e.offsetWidth : 0) - t), e.scrollLeft = t) : e.scrollTop = t;
}
function zn(e, t, a, n) {
  if (a >= n) return 0;
  const l = t.length, o = Math.floor(a / sa), i = Math.floor((n - 1) / sa) + 1;
  let r = e.slice(o, i).reduce(Sn, 0);
  return a % sa !== 0 && (r -= t.slice(o * sa, a).reduce(Sn, 0)), n % sa !== 0 && n !== l && (r -= t.slice(n, i * sa).reduce(Sn, 0)), r;
}
const Ru = {
  virtualScrollSliceSize: {
    type: [Number, String],
    default: 10
  },
  virtualScrollSliceRatioBefore: {
    type: [Number, String],
    default: 1
  },
  virtualScrollSliceRatioAfter: {
    type: [Number, String],
    default: 1
  },
  virtualScrollItemSize: {
    type: [Number, String],
    default: 24
  },
  virtualScrollStickySizeStart: {
    type: [Number, String],
    default: 0
  },
  virtualScrollStickySizeEnd: {
    type: [Number, String],
    default: 0
  },
  tableColspan: [Number, String]
}, Fu = Object.keys(Ru), Qo = {
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function,
  ...Ru
};
function Eu({ virtualScrollLength: e, getVirtualScrollTarget: t, getVirtualScrollEl: a, virtualScrollItemSizeComputed: n }) {
  const { props: l, emit: o, proxy: i } = ye(), { $q: r } = i;
  let u, c, d, v = [], b;
  const m = z(0), g = z(0), p = z({}), k = z(null), C = z(null), y = z(null), h = z({
    from: 0,
    to: 0
  }), w = s(() => l.tableColspan !== void 0 ? l.tableColspan : 100);
  n === void 0 && (n = s(() => l.virtualScrollItemSize));
  const x = s(() => n.value + ";" + l.virtualScrollHorizontal);
  se(s(() => x.value + ";" + l.virtualScrollSliceRatioBefore + ";" + l.virtualScrollSliceRatioAfter), () => {
    S();
  }), se(x, L);
  function L() {
    _(c, !0);
  }
  function M(j) {
    _(j === void 0 ? c : j);
  }
  function K(j, N) {
    const Z = t();
    if (Z == null || Z.nodeType === 8) return;
    const B = xo(Z, a(), k.value, C.value, l.virtualScrollHorizontal, r.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd);
    d !== B.scrollViewSize && S(B.scrollViewSize), A(Z, B, Math.min(e.value - 1, Math.max(0, parseInt(j, 10) || 0)), 0, Ov.indexOf(N) !== -1 ? N : c !== -1 && j > c ? "end" : "start");
  }
  function X() {
    const j = t();
    if (j == null || j.nodeType === 8) return;
    const N = xo(j, a(), k.value, C.value, l.virtualScrollHorizontal, r.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd), Z = e.value - 1, B = N.scrollMaxSize - N.offsetStart - N.offsetEnd - g.value;
    if (u === N.scrollStart) return;
    if (N.scrollMaxSize <= 0) {
      A(j, N, 0, 0);
      return;
    }
    d !== N.scrollViewSize && S(N.scrollViewSize), $(h.value.from);
    const G = Math.floor(N.scrollMaxSize - Math.max(N.scrollViewSize, N.offsetEnd) - Math.min(b[Z], N.scrollViewSize / 2));
    if (G > 0 && Math.ceil(N.scrollStart) >= G) {
      A(j, N, Z, N.scrollMaxSize - N.offsetEnd - v.reduce(Sn, 0));
      return;
    }
    let V = 0, oe = N.scrollStart - N.offsetStart, P = oe;
    if (oe <= B && oe + N.scrollViewSize >= m.value)
      oe -= m.value, V = h.value.from, P = oe;
    else for (let I = 0; oe >= v[I] && V < Z; I++)
      oe -= v[I], V += sa;
    for (; oe > 0 && V < Z; )
      oe -= b[V], oe > -N.scrollViewSize ? (V++, P = oe) : P = b[V] + oe;
    A(j, N, V, P);
  }
  function A(j, N, Z, B, G) {
    const V = typeof G == "string" && G.indexOf("-force") !== -1, oe = V === !0 ? G.replace("-force", "") : G, P = oe !== void 0 ? oe : "start";
    let I = Math.max(0, Z - p.value[P]), de = I + p.value.total;
    de > e.value && (de = e.value, I = Math.max(0, de - p.value.total)), u = N.scrollStart;
    const Y = I !== h.value.from || de !== h.value.to;
    if (Y === !1 && oe === void 0) {
      H(Z);
      return;
    }
    const { activeElement: fe } = document, W = y.value;
    Y === !0 && W !== null && W !== fe && W.contains(fe) === !0 && (W.addEventListener("focusout", D), setTimeout(() => {
      W == null || W.removeEventListener("focusout", D);
    })), Hv(W, Z - I);
    const be = oe !== void 0 ? b.slice(I, Z).reduce(Sn, 0) : 0;
    if (Y === !0) {
      const _e = de >= h.value.from && I <= h.value.to ? h.value.to : de;
      h.value = {
        from: I,
        to: _e
      }, m.value = zn(v, b, 0, I), g.value = zn(v, b, de, e.value), requestAnimationFrame(() => {
        h.value.to !== de && u === N.scrollStart && (h.value = {
          from: h.value.from,
          to: de
        }, g.value = zn(v, b, de, e.value));
      });
    }
    requestAnimationFrame(() => {
      if (u !== N.scrollStart) return;
      Y === !0 && $(I);
      const _e = b.slice(I, Z).reduce(Sn, 0), we = _e + N.offsetStart + m.value, Ie = we + b[Z];
      let Ce = we + B;
      if (oe !== void 0) {
        const Me = _e - be, Le = N.scrollStart + Me;
        Ce = V !== !0 && Le < we && Ie < Le + N.scrollViewSize ? Le : oe === "end" ? Ie - N.scrollViewSize : we - (oe === "start" ? 0 : Math.round((N.scrollViewSize - b[Z]) / 2));
      }
      u = Ce, Tr(j, Ce, l.virtualScrollHorizontal, r.lang.rtl), H(Z);
    });
  }
  function $(j) {
    const N = y.value;
    if (N) {
      const Z = Pu.call(N.children, (I) => I.classList && I.classList.contains("q-virtual-scroll--skip") === !1), B = Z.length, G = l.virtualScrollHorizontal === !0 ? (I) => I.getBoundingClientRect().width : (I) => I.offsetHeight;
      let V = j, oe, P;
      for (let I = 0; I < B; ) {
        for (oe = G(Z[I]), I++; I < B && Z[I].classList.contains("q-virtual-scroll--with-prev") === !0; )
          oe += G(Z[I]), I++;
        P = oe - b[V], P !== 0 && (b[V] += P, v[Math.floor(V / sa)] += P), V++;
      }
    }
  }
  function D() {
    var j;
    (j = y.value) == null || j.focus();
  }
  function _(j, N) {
    const Z = Number(n.value);
    (N === !0 || Array.isArray(b) === !1) && (b = []);
    const B = b.length;
    b.length = e.value;
    for (let V = e.value - 1; V >= B; V--) b[V] = Z;
    const G = Math.floor((e.value - 1) / sa);
    v = [];
    for (let V = 0; V <= G; V++) {
      let oe = 0;
      const P = Math.min((V + 1) * sa, e.value);
      for (let I = V * sa; I < P; I++) oe += b[I];
      v.push(oe);
    }
    c = -1, u = void 0, m.value = zn(v, b, 0, h.value.from), g.value = zn(v, b, h.value.to, e.value), j >= 0 ? ($(h.value.from), nt(() => {
      K(j);
    })) : E();
  }
  function S(j) {
    if (j === void 0 && typeof window < "u") {
      const oe = t();
      oe != null && oe.nodeType !== 8 && (j = xo(oe, a(), k.value, C.value, l.virtualScrollHorizontal, r.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd).scrollViewSize);
    }
    d = j;
    const N = parseFloat(l.virtualScrollSliceRatioBefore) || 0, Z = parseFloat(l.virtualScrollSliceRatioAfter) || 0, B = 1 + N + Z, G = j === void 0 || j <= 0 ? 1 : Math.ceil(j / n.value), V = Math.max(1, G, Math.ceil((l.virtualScrollSliceSize > 0 ? l.virtualScrollSliceSize : 10) / B));
    p.value = {
      total: Math.ceil(V * B),
      start: Math.ceil(V * N),
      center: Math.ceil(V * (0.5 + N)),
      end: Math.ceil(V * (1 + N)),
      view: G
    };
  }
  function T(j, N) {
    const Z = l.virtualScrollHorizontal === !0 ? "width" : "height", B = { ["--q-virtual-scroll-item-" + Z]: n.value + "px" };
    return [
      j === "tbody" ? f(j, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: k
      }, [f("tr", [f("td", {
        style: {
          [Z]: `${m.value}px`,
          ...B
        },
        colspan: w.value
      })])]) : f(j, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: k,
        style: {
          [Z]: `${m.value}px`,
          ...B
        }
      }),
      f(j, {
        class: "q-virtual-scroll__content",
        key: "content",
        ref: y,
        tabindex: -1
      }, N.flat()),
      j === "tbody" ? f(j, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: C
      }, [f("tr", [f("td", {
        style: {
          [Z]: `${g.value}px`,
          ...B
        },
        colspan: w.value
      })])]) : f(j, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: C,
        style: {
          [Z]: `${g.value}px`,
          ...B
        }
      })
    ];
  }
  function H(j) {
    c !== j && (l.onVirtualScroll !== void 0 && o("virtualScroll", {
      index: j,
      from: h.value.from,
      to: h.value.to - 1,
      direction: j < c ? "decrease" : "increase",
      ref: i
    }), c = j);
  }
  S();
  const E = $n(X, r.platform.is.ios === !0 ? 120 : 35);
  Ko(() => {
    S();
  });
  let Q = !1;
  return wa(() => {
    Q = !0;
  }), en(() => {
    if (Q !== !0) return;
    const j = t();
    u !== void 0 && j !== void 0 && j !== null && j.nodeType !== 8 ? Tr(j, u, l.virtualScrollHorizontal, r.lang.rtl) : K(c);
  }), __QUASAR_SSR__ || tt(() => {
    E.cancel();
  }), Object.assign(i, {
    scrollTo: K,
    reset: L,
    refresh: M
  }), {
    virtualScrollSliceRange: h,
    virtualScrollSliceSizeComputed: p,
    setVirtualScrollSize: S,
    onVirtualScrollEvt: E,
    localResetVirtualScroll: _,
    padVirtualScroll: T,
    scrollTo: K,
    reset: L,
    refresh: M
  };
}
const Mr = (e) => [
  "add",
  "add-unique",
  "toggle"
].includes(e), Nv = ".*+?^${}()|[]\\", jv = Object.keys(Ql);
function _o(e, t) {
  if (typeof e == "function") return e;
  const a = e !== void 0 ? e : t;
  return (n) => n !== null && typeof n == "object" && a in n ? n[a] : n;
}
var Iu = re({
  name: "QSelect",
  inheritAttrs: !1,
  props: {
    ...Qo,
    ...ra,
    ...Ql,
    modelValue: { required: !0 },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: {
      type: Array,
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [
      String,
      Array,
      Object
    ],
    popupNoRouteDismiss: Boolean,
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: Mr
    },
    mapOptions: Boolean,
    emitValue: Boolean,
    disableTabSelection: Boolean,
    inputDebounce: {
      type: [Number, String],
      default: 500
    },
    inputClass: [
      Array,
      String,
      Object
    ],
    inputStyle: [
      Array,
      String,
      Object
    ],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    autocomplete: String,
    transitionShow: {},
    transitionHide: {},
    transitionDuration: {},
    behavior: {
      type: String,
      validator: (e) => [
        "default",
        "menu",
        "dialog"
      ].includes(e),
      default: "default"
    },
    virtualScrollItemSize: Qo.virtualScrollItemSize.type,
    onNewValue: Function,
    onFilter: Function
  },
  emits: [
    ...Ul,
    "add",
    "remove",
    "inputValue",
    "keyup",
    "keypress",
    "keydown",
    "popupShow",
    "popupHide",
    "filterAbort"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), { $q: l } = n, o = z(!1), i = z(!1), r = z(-1), u = z(""), c = z(!1), d = z(!1);
    let v = null, b = null, m, g, p, k = null, C, y, h, w;
    const x = z(null), L = z(null), M = z(null), K = z(null), X = z(null), A = si(e), $ = Mu(fa), D = s(() => Array.isArray(e.options) ? e.options.length : 0), { virtualScrollSliceRange: _, virtualScrollSliceSizeComputed: S, localResetVirtualScroll: T, padVirtualScroll: H, onVirtualScrollEvt: E, scrollTo: Q, setVirtualScrollSize: j } = Eu({
      virtualScrollLength: D,
      getVirtualScrollTarget: Ct,
      getVirtualScrollEl: It,
      virtualScrollItemSizeComputed: s(() => e.virtualScrollItemSize === void 0 ? e.optionsDense === !0 ? 24 : 48 : e.virtualScrollItemSize)
    }), N = Kl(), Z = s(() => {
      const O = e.mapOptions === !0 && e.multiple !== !0, Be = e.modelValue !== void 0 && (e.modelValue !== null || O === !0) ? e.multiple === !0 && Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue] : [];
      if (e.mapOptions === !0 && Array.isArray(e.options) === !0) {
        const Ae = e.mapOptions === !0 && m !== void 0 ? m : [], at = Be.map((St) => Ve(St, Ae));
        return e.modelValue === null && O === !0 ? at.filter((St) => St !== null) : at;
      }
      return Be;
    }), B = s(() => {
      const O = {};
      return jv.forEach((Be) => {
        const Ae = e[Be];
        Ae !== void 0 && (O[Be] = Ae);
      }), O;
    }), G = s(() => e.optionsDark === null ? N.isDark.value : e.optionsDark), V = s(() => Ja(Z.value)), oe = s(() => {
      let O = "q-field__input q-placeholder col";
      return e.hideSelected === !0 || Z.value.length === 0 ? [O, e.inputClass] : (O += " q-field__input--padding", e.inputClass === void 0 ? O : [O, e.inputClass]);
    }), P = s(() => (e.virtualScrollHorizontal === !0 ? "q-virtual-scroll--horizontal" : "") + (e.popupContentClass ? " " + e.popupContentClass : "")), I = s(() => D.value === 0), de = s(() => Z.value.map((O) => ue.value(O)).join(", ")), Y = s(() => e.displayValue !== void 0 ? e.displayValue : de.value), fe = s(() => e.optionsHtml === !0 ? () => !0 : (O) => (O == null ? void 0 : O.html) === !0), W = s(() => e.displayValueHtml === !0 || e.displayValue === void 0 && (e.optionsHtml === !0 || Z.value.some(fe.value))), be = s(() => N.focused.value === !0 ? e.tabindex : -1), _e = s(() => {
      const O = {
        tabindex: e.tabindex,
        role: "combobox",
        "aria-label": e.label,
        "aria-readonly": e.readonly === !0 ? "true" : "false",
        "aria-autocomplete": e.useInput === !0 ? "list" : "none",
        "aria-expanded": o.value === !0 ? "true" : "false",
        "aria-controls": `${N.targetUid.value}_lb`
      };
      return r.value >= 0 && (O["aria-activedescendant"] = `${N.targetUid.value}_${r.value}`), O;
    }), we = s(() => ({
      id: `${N.targetUid.value}_lb`,
      role: "listbox",
      "aria-multiselectable": e.multiple === !0 ? "true" : "false"
    })), Ie = s(() => Z.value.map((O, Be) => ({
      index: Be,
      opt: O,
      html: fe.value(O),
      selected: !0,
      removeAtIndex: je,
      toggleOption: et,
      tabindex: be.value
    }))), Ce = s(() => {
      if (D.value === 0) return [];
      const { from: O, to: Be } = _.value;
      return e.options.slice(O, Be).map((Ae, at) => {
        const St = ie.value(Ae) === !0, Vt = le(Ae) === !0, yt = O + at, xt = {
          clickable: !0,
          active: Vt,
          activeClass: ot.value,
          manualFocus: !0,
          focused: !1,
          disable: St,
          tabindex: -1,
          dense: e.optionsDense,
          dark: G.value,
          role: "option",
          "aria-selected": Vt === !0 ? "true" : "false",
          id: `${N.targetUid.value}_${yt}`,
          onClick: () => {
            et(Ae);
          }
        };
        return St !== !0 && (r.value === yt && (xt.focused = !0), l.platform.is.desktop === !0 && (xt.onMousemove = () => {
          o.value === !0 && ae(yt);
        })), {
          index: yt,
          opt: Ae,
          html: fe.value(Ae),
          label: ue.value(Ae),
          selected: xt.active,
          focused: xt.focused,
          toggleOption: et,
          setOptionIndex: ae,
          itemProps: xt
        };
      });
    }), Me = s(() => e.dropdownIcon !== void 0 ? e.dropdownIcon : l.iconSet.arrow.dropdown), Le = s(() => e.optionsCover === !1 && e.outlined !== !0 && e.standout !== !0 && e.borderless !== !0 && e.rounded !== !0), ot = s(() => e.optionsSelectedClass !== void 0 ? e.optionsSelectedClass : e.color !== void 0 ? `text-${e.color}` : ""), We = s(() => _o(e.optionValue, "value")), ue = s(() => _o(e.optionLabel, "label")), ie = s(() => _o(e.optionDisable, "disable")), ge = s(() => Z.value.map(We.value)), Pe = s(() => {
      const O = {
        onInput: fa,
        onChange: $,
        onKeydown: ut,
        onKeyup: Te,
        onKeypress: He,
        onFocus: ke,
        onClick(Be) {
          g === !0 && wt(Be);
        }
      };
      return O.onCompositionstart = O.onCompositionupdate = O.onCompositionend = $, O;
    });
    se(Z, (O) => {
      m = O, e.useInput === !0 && e.fillInput === !0 && e.multiple !== !0 && N.innerLoading.value !== !0 && (i.value !== !0 && o.value !== !0 || V.value !== !0) && (p !== !0 && Jt(), (i.value === !0 || o.value === !0) && Re(""));
    }, { immediate: !0 }), se(() => e.fillInput, Jt), se(o, Gl), se(D, gd);
    function Ge(O) {
      return e.emitValue === !0 ? We.value(O) : O;
    }
    function Ke(O) {
      if (O !== -1 && O < Z.value.length) if (e.multiple === !0) {
        const Be = e.modelValue.slice();
        a("remove", {
          index: O,
          value: Be.splice(O, 1)[0]
        }), a("update:modelValue", Be);
      } else a("update:modelValue", null);
    }
    function je(O) {
      Ke(O), N.focus();
    }
    function Qe(O, Be) {
      const Ae = Ge(O);
      if (e.multiple !== !0) {
        e.fillInput === !0 && Se(ue.value(O), !0, !0), a("update:modelValue", Ae);
        return;
      }
      if (Z.value.length === 0) {
        a("add", {
          index: 0,
          value: Ae
        }), a("update:modelValue", e.multiple === !0 ? [Ae] : Ae);
        return;
      }
      if (Be === !0 && le(O) === !0 || e.maxValues !== void 0 && e.modelValue.length >= e.maxValues) return;
      const at = e.modelValue.slice();
      a("add", {
        index: at.length,
        value: Ae
      }), at.push(Ae), a("update:modelValue", at);
    }
    function et(O, Be) {
      var Vt;
      if (N.editable.value !== !0 || O === void 0 || ie.value(O) === !0) return;
      const Ae = We.value(O);
      if (e.multiple !== !0) {
        Be !== !0 && (Se(e.fillInput === !0 ? ue.value(O) : "", !0, !0), dt()), (Vt = L.value) == null || Vt.focus(), (Z.value.length === 0 || ua(We.value(Z.value[0]), Ae) !== !0) && a("update:modelValue", e.emitValue === !0 ? Ae : O);
        return;
      }
      if ((g !== !0 || c.value === !0) && N.focus(), ke(), Z.value.length === 0) {
        const yt = e.emitValue === !0 ? Ae : O;
        a("add", {
          index: 0,
          value: yt
        }), a("update:modelValue", e.multiple === !0 ? [yt] : yt);
        return;
      }
      const at = e.modelValue.slice(), St = ge.value.findIndex((yt) => ua(yt, Ae));
      if (St !== -1) a("remove", {
        index: St,
        value: at.splice(St, 1)[0]
      });
      else {
        if (e.maxValues !== void 0 && at.length >= e.maxValues) return;
        const yt = e.emitValue === !0 ? Ae : O;
        a("add", {
          index: at.length,
          value: yt
        }), at.push(yt);
      }
      a("update:modelValue", at);
    }
    function ae(O) {
      if (l.platform.is.desktop !== !0) return;
      const Be = O !== -1 && O < D.value ? O : -1;
      r.value !== Be && (r.value = Be);
    }
    function ce(O = 1, Be) {
      if (o.value === !0) {
        let Ae = r.value;
        do
          Ae = pl(Ae + O, -1, D.value - 1);
        while (Ae !== -1 && Ae !== r.value && ie.value(e.options[Ae]) === !0);
        r.value !== Ae && (ae(Ae), Q(Ae), Be !== !0 && e.useInput === !0 && e.fillInput === !0 && J(Ae >= 0 ? ue.value(e.options[Ae]) : C, !0));
      }
    }
    function Ve(O, Be) {
      const Ae = (at) => ua(We.value(at), O);
      return e.options.find(Ae) || Be.find(Ae) || O;
    }
    function le(O) {
      const Be = We.value(O);
      return ge.value.find((Ae) => ua(Ae, Be)) !== void 0;
    }
    function ke(O) {
      e.useInput === !0 && L.value !== null && (O === void 0 || L.value === O.target && O.target.value === de.value) && L.value.select();
    }
    function Fe(O) {
      la(O, 27) === !0 && o.value === !0 && (wt(O), dt(), Jt()), a("keyup", O);
    }
    function Te(O) {
      const { value: Be } = O.target;
      if (O.keyCode !== void 0) {
        Fe(O);
        return;
      }
      if (O.target.value = "", v !== null && (clearTimeout(v), v = null), b !== null && (clearTimeout(b), b = null), Jt(), typeof Be == "string" && Be.length !== 0) {
        const Ae = Be.toLocaleLowerCase(), at = (Vt) => {
          const yt = e.options.find((xt) => String(Vt.value(xt)).toLocaleLowerCase() === Ae);
          return yt === void 0 ? !1 : (Z.value.indexOf(yt) === -1 ? et(yt) : dt(), !0);
        }, St = (Vt) => {
          at(We) !== !0 && Vt !== !0 && at(ue) !== !0 && Re(Be, !0, () => St(!0));
        };
        St();
      } else N.clearValue(O);
    }
    function He(O) {
      a("keypress", O);
    }
    function ut(O) {
      if (a("keydown", O), tn(O) === !0) return;
      const Be = u.value.length !== 0 && (e.newValueMode !== void 0 || e.onNewValue !== void 0), Ae = O.shiftKey !== !0 && e.disableTabSelection !== !0 && e.multiple !== !0 && (r.value !== -1 || Be === !0);
      if (O.keyCode === 27) {
        Ft(O);
        return;
      }
      if (O.keyCode === 9 && Ae === !1) {
        ze();
        return;
      }
      if (O.target === void 0 || O.target.id !== N.targetUid.value || N.editable.value !== !0) return;
      if (O.keyCode === 40 && N.innerLoading.value !== !0 && o.value === !1) {
        Ye(O), Ue();
        return;
      }
      if (O.keyCode === 8 && (e.useChips === !0 || e.clearable === !0) && e.hideSelected !== !0 && u.value.length === 0) {
        e.multiple === !0 && Array.isArray(e.modelValue) === !0 ? Ke(e.modelValue.length - 1) : e.multiple !== !0 && e.modelValue !== null && a("update:modelValue", null);
        return;
      }
      (O.keyCode === 35 || O.keyCode === 36) && (typeof u.value != "string" || u.value.length === 0) && (Ye(O), r.value = -1, ce(O.keyCode === 36 ? 1 : -1, e.multiple)), (O.keyCode === 33 || O.keyCode === 34) && S.value !== void 0 && (Ye(O), r.value = Math.max(-1, Math.min(D.value, r.value + (O.keyCode === 33 ? -1 : 1) * S.value.view)), ce(O.keyCode === 33 ? 1 : -1, e.multiple)), (O.keyCode === 38 || O.keyCode === 40) && (Ye(O), ce(O.keyCode === 38 ? -1 : 1, e.multiple));
      const at = D.value;
      if ((h === void 0 || w < Date.now()) && (h = ""), at > 0 && e.useInput !== !0 && O.key !== void 0 && O.key.length === 1 && O.altKey === !1 && O.ctrlKey === !1 && O.metaKey === !1 && (O.keyCode !== 32 || h.length !== 0)) {
        o.value !== !0 && Ue(O);
        const St = O.key.toLocaleLowerCase(), Vt = h.length === 1 && h[0] === St;
        w = Date.now() + 1500, Vt === !1 && (Ye(O), h += St);
        const yt = new RegExp("^" + h.split("").map((Zl) => Nv.indexOf(Zl) !== -1 ? "\\" + Zl : Zl).join(".*"), "i");
        let xt = r.value;
        if (Vt === !0 || xt < 0 || yt.test(ue.value(e.options[xt])) !== !0) do
          xt = pl(xt + 1, -1, at - 1);
        while (xt !== r.value && (ie.value(e.options[xt]) === !0 || yt.test(ue.value(e.options[xt])) !== !0));
        r.value !== xt && nt(() => {
          ae(xt), Q(xt), xt >= 0 && e.useInput === !0 && e.fillInput === !0 && J(ue.value(e.options[xt]), !0);
        });
        return;
      }
      if (!(O.keyCode !== 13 && (O.keyCode !== 32 || e.useInput === !0 || h !== "") && (O.keyCode !== 9 || Ae === !1))) {
        if (O.keyCode !== 9 && Ye(O), r.value !== -1 && r.value < at) {
          et(e.options[r.value]);
          return;
        }
        if (Be === !0) {
          const St = (Vt, yt) => {
            var xt;
            if (yt) {
              if (Mr(yt) !== !0) return;
            } else yt = e.newValueMode;
            Se("", e.multiple !== !0, !0), Vt != null && ((yt === "toggle" ? et : Qe)(Vt, yt === "add-unique"), e.multiple !== !0 && ((xt = L.value) == null || xt.focus(), dt()));
          };
          if (e.onNewValue !== void 0 ? a("newValue", u.value, St) : St(u.value), e.multiple !== !0) return;
        }
        o.value === !0 ? ze() : N.innerLoading.value !== !0 && Ue();
      }
    }
    function It() {
      return g === !0 ? X.value : M.value !== null && M.value.contentEl !== null ? M.value.contentEl : void 0;
    }
    function Ct() {
      return It();
    }
    function Zt() {
      return e.hideSelected === !0 ? [] : t["selected-item"] !== void 0 ? Ie.value.map((O) => t["selected-item"](O)).slice() : t.selected !== void 0 ? [].concat(t.selected()) : e.useChips === !0 ? Ie.value.map((O, Be) => f(Qs, {
        key: "option-" + Be,
        removable: N.editable.value === !0 && ie.value(O.opt) !== !0,
        dense: !0,
        textColor: e.color,
        tabindex: be.value,
        onRemove() {
          O.removeAtIndex(Be);
        }
      }, () => f("span", {
        class: "ellipsis",
        [O.html === !0 ? "innerHTML" : "textContent"]: ue.value(O.opt)
      }))) : [f("span", {
        class: "ellipsis",
        [W.value === !0 ? "innerHTML" : "textContent"]: Y.value
      })];
    }
    function Xt() {
      if (I.value === !0) return t["no-option"] !== void 0 ? t["no-option"]({ inputValue: u.value }) : void 0;
      const O = t.option !== void 0 ? t.option : (Ae) => f(jl, {
        key: Ae.index,
        ...Ae.itemProps
      }, () => f(za, () => f(Ho, () => f("span", { [Ae.html === !0 ? "innerHTML" : "textContent"]: Ae.label }))));
      let Be = H("div", Ce.value.map(O));
      return t["before-options"] !== void 0 && (Be = t["before-options"]().concat(Be)), $t(t["after-options"], Be);
    }
    function ga(O, Be) {
      const Ae = Be === !0 ? {
        ..._e.value,
        ...N.splitAttrs.attributes.value
      } : void 0, at = {
        ref: Be === !0 ? L : void 0,
        key: "i_t",
        class: oe.value,
        style: e.inputStyle,
        value: u.value !== void 0 ? u.value : "",
        type: "search",
        ...Ae,
        id: Be === !0 ? N.targetUid.value : void 0,
        maxlength: e.maxlength,
        autocomplete: e.autocomplete,
        "data-autofocus": O === !0 || e.autofocus === !0 || void 0,
        disabled: e.disable === !0,
        readonly: e.readonly === !0,
        ...Pe.value
      };
      return O !== !0 && g === !0 && (Array.isArray(at.class) === !0 ? at.class = [...at.class, "no-pointer-events"] : at.class += " no-pointer-events"), f("input", at);
    }
    function fa(O) {
      v !== null && (clearTimeout(v), v = null), b !== null && (clearTimeout(b), b = null), !(O && O.target && O.target.qComposing === !0) && (J(O.target.value || ""), p = !0, C = u.value, N.focused.value !== !0 && (g !== !0 || c.value === !0) && N.focus(), e.onFilter !== void 0 && (v = setTimeout(() => {
        v = null, Re(u.value);
      }, e.inputDebounce)));
    }
    function J(O, Be) {
      u.value !== O && (u.value = O, Be === !0 || e.inputDebounce === 0 || e.inputDebounce === "0" ? a("inputValue", O) : b = setTimeout(() => {
        b = null, a("inputValue", O);
      }, e.inputDebounce));
    }
    function Se(O, Be, Ae) {
      p = Ae !== !0, e.useInput === !0 && (J(O, !0), (Be === !0 || Ae !== !0) && (C = O), Be !== !0 && Re(O));
    }
    function Re(O, Be, Ae) {
      if (e.onFilter === void 0 || Be !== !0 && N.focused.value !== !0) return;
      N.innerLoading.value === !0 ? a("filterAbort") : (N.innerLoading.value = !0, d.value = !0), O !== "" && e.multiple !== !0 && Z.value.length !== 0 && p !== !0 && O === ue.value(Z.value[0]) && (O = "");
      const at = setTimeout(() => {
        o.value === !0 && (o.value = !1);
      }, 10);
      k !== null && clearTimeout(k), k = at, a("filter", O, (St, Vt) => {
        (Be === !0 || N.focused.value === !0) && k === at && (clearTimeout(k), typeof St == "function" && St(), d.value = !1, nt(() => {
          N.innerLoading.value = !1, N.editable.value === !0 && (Be === !0 ? o.value === !0 && dt() : o.value === !0 ? Gl(!0) : o.value = !0), typeof Vt == "function" && nt(() => {
            Vt(n);
          }), typeof Ae == "function" && nt(() => {
            Ae(n);
          });
        }));
      }, () => {
        N.focused.value === !0 && k === at && (clearTimeout(k), N.innerLoading.value = !1, d.value = !1), o.value === !0 && (o.value = !1);
      });
    }
    function Ne() {
      return f(Ol, {
        ref: M,
        class: P.value,
        style: e.popupContentStyle,
        modelValue: o.value,
        fit: e.menuShrink !== !0,
        cover: e.optionsCover === !0 && I.value !== !0 && e.useInput !== !0,
        anchor: e.menuAnchor,
        self: e.menuSelf,
        offset: e.menuOffset,
        dark: G.value,
        noParentEvent: !0,
        noRefocus: !0,
        noFocus: !0,
        noRouteDismiss: e.popupNoRouteDismiss,
        square: Le.value,
        transitionShow: e.transitionShow,
        transitionHide: e.transitionHide,
        transitionDuration: e.transitionDuration,
        separateClosePopup: !0,
        ...we.value,
        onScrollPassive: E,
        onBeforeShow: qi,
        onBeforeHide: Xe,
        onShow: pt
      }, Xt);
    }
    function Xe(O) {
      Bi(O), ze();
    }
    function pt() {
      j();
    }
    function q(O) {
      var Be;
      wt(O), (Be = L.value) == null || Be.focus(), c.value = !0, window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
    }
    function U(O) {
      wt(O), nt(() => {
        c.value = !1;
      });
    }
    function te() {
      const O = [f(iv, {
        class: `col-auto ${N.fieldClass.value}`,
        ...B.value,
        for: N.targetUid.value,
        dark: G.value,
        square: !0,
        loading: d.value,
        itemAligned: !1,
        filled: !0,
        stackLabel: u.value.length !== 0,
        ...N.splitAttrs.listeners.value,
        onFocus: q,
        onBlur: U
      }, {
        ...t,
        rawControl: () => N.getControl(!0),
        before: void 0,
        after: void 0
      })];
      return o.value === !0 && O.push(f("div", {
        ref: X,
        class: P.value + " scroll",
        style: e.popupContentStyle,
        ...we.value,
        onClick: Ft,
        onScrollPassive: E
      }, Xt())), f(Nl, {
        ref: K,
        modelValue: i.value,
        position: e.useInput === !0 ? "top" : void 0,
        transitionShow: y,
        transitionHide: e.transitionHide,
        transitionDuration: e.transitionDuration,
        noRouteDismiss: e.popupNoRouteDismiss,
        onBeforeShow: qi,
        onBeforeHide: xe,
        onHide: $e,
        onShow: Ze
      }, () => f("div", { class: "q-select__dialog" + (G.value === !0 ? " q-select__dialog--dark q-dark" : "") + (c.value === !0 ? " q-select__dialog--focused" : "") }, O));
    }
    function xe(O) {
      Bi(O), K.value !== null && K.value.__updateRefocusTarget(N.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")), N.focused.value = !1;
    }
    function $e(O) {
      dt(), N.focused.value === !1 && a("blur", O), Jt();
    }
    function Ze() {
      const O = document.activeElement;
      (O === null || O.id !== N.targetUid.value) && L.value !== null && L.value !== O && L.value.focus(), j();
    }
    function ze() {
      i.value !== !0 && (r.value = -1, o.value === !0 && (o.value = !1), N.focused.value === !1 && (k !== null && (clearTimeout(k), k = null), N.innerLoading.value === !0 && (a("filterAbort"), N.innerLoading.value = !1, d.value = !1)));
    }
    function Ue(O) {
      N.editable.value === !0 && (g === !0 ? (N.onControlFocusin(O), i.value = !0, nt(() => {
        N.focus();
      })) : N.focus(), e.onFilter !== void 0 ? Re(u.value) : (I.value !== !0 || t["no-option"] !== void 0) && (o.value = !0));
    }
    function dt() {
      i.value = !1, ze();
    }
    function Jt() {
      e.useInput === !0 && Se(e.multiple !== !0 && e.fillInput === !0 && Z.value.length !== 0 && ue.value(Z.value[0]) || "", !0, !0);
    }
    function Gl(O) {
      let Be = -1;
      if (O === !0) {
        if (Z.value.length !== 0) {
          const Ae = We.value(Z.value[0]);
          Be = e.options.findIndex((at) => ua(We.value(at), Ae));
        }
        T(Be);
      }
      ae(Be);
    }
    function gd(O, Be) {
      o.value === !0 && N.innerLoading.value === !1 && (T(-1, !0), nt(() => {
        o.value === !0 && N.innerLoading.value === !1 && (O > Be ? T() : Gl(!0));
      }));
    }
    function $i() {
      i.value === !1 && M.value !== null && M.value.updatePosition();
    }
    function qi(O) {
      O !== void 0 && wt(O), a("popupShow", O), N.hasPopupOpen = !0, N.onControlFocusin(O);
    }
    function Bi(O) {
      O !== void 0 && wt(O), a("popupHide", O), N.hasPopupOpen = !1, N.onControlFocusout(O);
    }
    function Ti() {
      g = l.platform.is.mobile !== !0 && e.behavior !== "dialog" ? !1 : e.behavior !== "menu" && (e.useInput === !0 ? t["no-option"] !== void 0 || e.onFilter !== void 0 || I.value === !1 : !0), y = l.platform.is.ios === !0 && g === !0 && e.useInput === !0 ? "fade" : e.transitionShow;
    }
    return Yn(Ti), pd($i), Ti(), tt(() => {
      v !== null && clearTimeout(v), b !== null && clearTimeout(b);
    }), Object.assign(n, {
      showPopup: Ue,
      hidePopup: dt,
      removeAtIndex: Ke,
      add: Qe,
      toggleOption: et,
      getOptionIndex: () => r.value,
      setOptionIndex: ae,
      moveOptionSelection: ce,
      filter: Re,
      updateMenuPosition: $i,
      updateInputValue: Se,
      isOptionSelected: le,
      getEmittingOptionValue: Ge,
      isOptionDisabled: (...O) => ie.value.apply(null, O) === !0,
      getOptionValue: (...O) => We.value.apply(null, O),
      getOptionLabel: (...O) => ue.value.apply(null, O)
    }), Object.assign(N, {
      innerValue: Z,
      fieldClass: s(() => `q-select q-field--auto-height q-select--with${e.useInput !== !0 ? "out" : ""}-input q-select--with${e.useChips !== !0 ? "out" : ""}-chips q-select--${e.multiple === !0 ? "multiple" : "single"}`),
      inputRef: x,
      targetRef: L,
      hasValue: V,
      showPopup: Ue,
      floatingLabel: s(() => e.hideSelected !== !0 && V.value === !0 || typeof u.value == "number" || u.value.length !== 0 || Ja(e.displayValue)),
      getControlChild: () => {
        if (N.editable.value !== !1 && (i.value === !0 || I.value !== !0 || t["no-option"] !== void 0)) return g === !0 ? te() : Ne();
        N.hasPopupOpen === !0 && (N.hasPopupOpen = !1);
      },
      controlEvents: {
        onFocusin(O) {
          N.onControlFocusin(O);
        },
        onFocusout(O) {
          N.onControlFocusout(O, () => {
            Jt(), ze();
          });
        },
        onClick(O) {
          var Be;
          if (Ft(O), g !== !0 && o.value === !0) {
            ze(), (Be = L.value) == null || Be.focus();
            return;
          }
          Ue(O);
        }
      },
      getControl: (O) => {
        const Be = Zt(), Ae = O === !0 || i.value !== !0 || g !== !0;
        if (e.useInput === !0) Be.push(ga(O, Ae));
        else if (N.editable.value === !0) {
          const at = Ae === !0 ? _e.value : void 0;
          Be.push(f("input", {
            ref: Ae === !0 ? L : void 0,
            key: "d_t",
            class: "q-select__focus-target",
            id: Ae === !0 ? N.targetUid.value : void 0,
            value: Y.value,
            readonly: !0,
            "data-autofocus": O === !0 || e.autofocus === !0 || void 0,
            ...at,
            onKeydown: ut,
            onKeyup: Fe,
            onKeypress: He
          })), Ae === !0 && typeof e.autocomplete == "string" && e.autocomplete.length !== 0 && Be.push(f("input", {
            class: "q-select__autocomplete-input",
            autocomplete: e.autocomplete,
            tabindex: -1,
            onKeyup: Te
          }));
        }
        if (A.value !== void 0 && e.disable !== !0 && ge.value.length !== 0) {
          const at = ge.value.map((St) => f("option", {
            value: St,
            selected: !0
          }));
          Be.push(f("select", {
            class: "hidden",
            name: A.value,
            multiple: e.multiple
          }, at));
        }
        return f("div", {
          class: "q-field__native row items-center",
          ...e.useInput === !0 || Ae !== !0 ? void 0 : N.splitAttrs.attributes.value,
          ...N.splitAttrs.listeners.value
        }, Be);
      },
      getInnerAppend: () => e.loading !== !0 && d.value !== !0 && e.hideDropdownIcon !== !0 ? [f(st, {
        class: "q-select__dropdown-icon" + (o.value === !0 ? " rotate-180" : ""),
        name: Me.value
      })] : null
    }), Wl(N);
  }
});
const Qv = [
  "text",
  "rect",
  "circle",
  "QBtn",
  "QBadge",
  "QChip",
  "QToolbar",
  "QCheckbox",
  "QRadio",
  "QToggle",
  "QSlider",
  "QRange",
  "QInput",
  "QAvatar"
], Uv = [
  "wave",
  "pulse",
  "pulse-x",
  "pulse-y",
  "fade",
  "blink",
  "none"
];
var Kv = re({
  name: "QSkeleton",
  props: {
    ...it,
    tag: {
      type: String,
      default: "div"
    },
    type: {
      type: String,
      validator: (e) => Qv.includes(e),
      default: "rect"
    },
    animation: {
      type: String,
      validator: (e) => Uv.includes(e),
      default: "wave"
    },
    animationSpeed: {
      type: [String, Number],
      default: 1500
    },
    square: Boolean,
    bordered: Boolean,
    size: String,
    width: String,
    height: String
  },
  setup(e, { slots: t }) {
    const a = rt(e, ye().proxy.$q), n = s(() => {
      const o = e.size !== void 0 ? [e.size, e.size] : [e.width, e.height];
      return {
        "--q-skeleton-speed": `${e.animationSpeed}ms`,
        width: o[0],
        height: o[1]
      };
    }), l = s(() => `q-skeleton q-skeleton--${a.value === !0 ? "dark" : "light"} q-skeleton--type-${e.type}` + (e.animation !== "none" ? ` q-skeleton--anim q-skeleton--anim-${e.animation}` : "") + (e.square === !0 ? " q-skeleton--square" : "") + (e.bordered === !0 ? " q-skeleton--bordered" : ""));
    return () => f(e.tag, {
      class: l.value,
      style: n.value
    }, De(t.default));
  }
});
const Ar = [
  [
    "left",
    "center",
    "start",
    "width"
  ],
  [
    "right",
    "center",
    "end",
    "width"
  ],
  [
    "top",
    "start",
    "center",
    "height"
  ],
  [
    "bottom",
    "end",
    "center",
    "height"
  ]
];
var Wv = re({
  name: "QSlideItem",
  props: {
    ...it,
    leftColor: String,
    rightColor: String,
    topColor: String,
    bottomColor: String,
    onSlide: Function
  },
  emits: [
    "action",
    "top",
    "right",
    "bottom",
    "left"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), { $q: l } = n, o = rt(e, l), { getCache: i } = Jn(), r = z(null);
    let u = null, c = {}, d = {}, v = {};
    const b = s(() => l.lang.rtl === !0 ? {
      left: "right",
      right: "left"
    } : {
      left: "left",
      right: "right"
    }), m = s(() => "q-slide-item q-item-type overflow-hidden" + (o.value === !0 ? " q-slide-item--dark q-dark" : ""));
    function g() {
      r.value.style.transform = "translate(0,0)";
    }
    function p(C, y, h) {
      e.onSlide !== void 0 && a("slide", {
        side: C,
        ratio: y,
        isReset: h
      });
    }
    function k(C) {
      const y = r.value;
      if (C.isFirst)
        c = {
          dir: null,
          size: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          },
          scale: 0
        }, y.classList.add("no-transition"), Ar.forEach((L) => {
          if (t[L[0]] !== void 0) {
            const M = v[L[0]];
            M.style.transform = "scale(1)", c.size[L[0]] = M.getBoundingClientRect()[L[3]];
          }
        }), c.axis = C.direction === "up" || C.direction === "down" ? "Y" : "X";
      else if (C.isFinal) {
        y.classList.remove("no-transition"), c.scale === 1 ? (y.style.transform = `translate${c.axis}(${c.dir * 100}%)`, u !== null && clearTimeout(u), u = setTimeout(() => {
          u = null, a(c.showing, { reset: g }), a("action", {
            side: c.showing,
            reset: g
          });
        }, 230)) : (y.style.transform = "translate(0,0)", p(c.showing, 0, !0));
        return;
      } else C.direction = c.axis === "X" ? C.offset.x < 0 ? "left" : "right" : C.offset.y < 0 ? "up" : "down";
      if (t.left === void 0 && C.direction === b.value.right || t.right === void 0 && C.direction === b.value.left || t.top === void 0 && C.direction === "down" || t.bottom === void 0 && C.direction === "up") {
        y.style.transform = "translate(0,0)";
        return;
      }
      let h, w, x;
      c.axis === "X" ? (w = C.direction === "left" ? -1 : 1, h = w === 1 ? b.value.left : b.value.right, x = C.distance.x) : (w = C.direction === "up" ? -2 : 2, h = w === 2 ? "top" : "bottom", x = C.distance.y), !(c.dir !== null && Math.abs(w) !== Math.abs(c.dir)) && (c.dir !== w && ([
        "left",
        "right",
        "top",
        "bottom"
      ].forEach((L) => {
        d[L] && (d[L].style.visibility = h === L ? "visible" : "hidden");
      }), c.showing = h, c.dir = w), c.scale = Math.max(0, Math.min(1, (x - 40) / c.size[h])), y.style.transform = `translate${c.axis}(${x * w / Math.abs(w)}px)`, v[h].style.transform = `scale(${c.scale})`, p(h, c.scale, !1));
    }
    return Yn(() => {
      d = {}, v = {};
    }), tt(() => {
      u !== null && clearTimeout(u);
    }), Object.assign(n, { reset: g }), () => {
      const C = [], y = {
        left: t[b.value.right] !== void 0,
        right: t[b.value.left] !== void 0,
        up: t.bottom !== void 0,
        down: t.top !== void 0
      }, h = Object.keys(y).filter((x) => y[x] === !0);
      Ar.forEach((x) => {
        const L = x[0];
        t[L] !== void 0 && C.push(f("div", {
          key: L,
          ref: (M) => {
            d[L] = M;
          },
          class: `q-slide-item__${L} absolute-full row no-wrap items-${x[1]} justify-${x[2]}` + (e[L + "Color"] !== void 0 ? ` bg-${e[L + "Color"]}` : "")
        }, [f("div", { ref: (M) => {
          v[L] = M;
        } }, t[L]())]));
      });
      const w = f("div", {
        key: `${h.length === 0 ? "only-" : ""} content`,
        ref: r,
        class: "q-slide-item__content"
      }, De(t.default));
      return h.length === 0 ? C.push(w) : C.push(aa(w, i("dir#" + h.join(""), () => {
        const x = {
          prevent: !0,
          stop: !0,
          mouse: !0
        };
        return h.forEach((L) => {
          x[L] = !0;
        }), [[
          ta,
          k,
          void 0,
          x
        ]];
      }))), f("div", { class: m.value }, C);
    };
  }
});
re({
  name: "QSpace",
  setup() {
    const e = f("div", { class: "q-space" });
    return () => e;
  }
});
const Yv = '<g transform="matrix(1 0 0 -1 0 80)"><rect width="10" height="20" rx="3"><animate attributeName="height" begin="0s" dur="4.3s" values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="15" width="10" height="80" rx="3"><animate attributeName="height" begin="0s" dur="2s" values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="30" width="10" height="50" rx="3"><animate attributeName="height" begin="0s" dur="1.4s" values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="45" width="10" height="30" rx="3"><animate attributeName="height" begin="0s" dur="2s" values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear" repeatCount="indefinite"></animate></rect></g>';
re({
  name: "QSpinnerAudio",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      fill: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 55 80",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: Yv
    });
  }
});
const Xv = '<g transform="translate(1 1)" stroke-width="2" fill="none" fill-rule="evenodd"><circle cx="5" cy="50" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="27" cy="5" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="49" cy="50" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite"></animate></circle></g>';
re({
  name: "QSpinnerBall",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      stroke: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 57 57",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: Xv
    });
  }
});
const Gv = '<rect y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="30" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="60" width="15" height="140" rx="6"><animate attributeName="height" begin="0s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="90" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="120" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect>';
var Zv = re({
  name: "QSpinnerBars",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      fill: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 135 140",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: Gv
    });
  }
});
const Jv = '<rect x="25" y="25" width="50" height="50" fill="none" stroke-width="4" stroke="currentColor"><animateTransform id="spinnerBox" attributeName="transform" type="rotate" from="0 50 50" to="180 50 50" dur="0.5s" begin="rectBox.end"></animateTransform></rect><rect x="27" y="27" width="46" height="50" fill="currentColor"><animate id="rectBox" attributeName="height" begin="0s;spinnerBox.end" dur="1.3s" from="50" to="0" fill="freeze"></animate></rect>';
re({
  name: "QSpinnerBox",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: Jv
    });
  }
});
const em = '<circle cx="50" cy="50" r="48" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="currentColor"></circle><line stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" stroke="currentColor" x1="50" y1="50" x2="85" y2="50.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite"></animateTransform></line><line stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" stroke="currentColor" x1="50" y1="50" x2="49.5" y2="74"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="15s" repeatCount="indefinite"></animateTransform></line>';
re({
  name: "QSpinnerClock",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: em
    });
  }
});
const tm = '<rect x="0" y="0" width="100" height="100" fill="none"></rect><path d="M78,19H22c-6.6,0-12,5.4-12,12v31c0,6.6,5.4,12,12,12h37.2c0.4,3,1.8,5.6,3.7,7.6c2.4,2.5,5.1,4.1,9.1,4 c-1.4-2.1-2-7.2-2-10.3c0-0.4,0-0.8,0-1.3h8c6.6,0,12-5.4,12-12V31C90,24.4,84.6,19,78,19z" fill="currentColor"></path><circle cx="30" cy="47" r="5" fill="#fff"><animate attributeName="opacity" from="0" to="1" values="0;1;1" keyTimes="0;0.2;1" dur="1s" repeatCount="indefinite"></animate></circle><circle cx="50" cy="47" r="5" fill="#fff"><animate attributeName="opacity" from="0" to="1" values="0;0;1;1" keyTimes="0;0.2;0.4;1" dur="1s" repeatCount="indefinite"></animate></circle><circle cx="70" cy="47" r="5" fill="#fff"><animate attributeName="opacity" from="0" to="1" values="0;0;1;1" keyTimes="0;0.4;0.6;1" dur="1s" repeatCount="indefinite"></animate></circle>';
re({
  name: "QSpinnerComment",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      innerHTML: tm
    });
  }
});
const am = '<rect x="0" y="0" width="100" height="100" fill="none"></rect><g transform="translate(25 25)"><rect x="-20" y="-20" width="40" height="40" fill="currentColor" opacity="0.9"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(75 25)"><rect x="-20" y="-20" width="40" height="40" fill="currentColor" opacity="0.8"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.1s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(25 75)"><rect x="-20" y="-20" width="40" height="40" fill="currentColor" opacity="0.7"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.3s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(75 75)"><rect x="-20" y="-20" width="40" height="40" fill="currentColor" opacity="0.6"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.2s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g>';
re({
  name: "QSpinnerCube",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      innerHTML: am
    });
  }
});
const nm = '<circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity=".3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from=".5" to=".5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle>';
var lm = re({
  name: "QSpinnerDots",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      fill: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 120 30",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: nm
    });
  }
});
const om = '<g transform="translate(20 50)"><rect x="-10" y="-30" width="20" height="60" fill="currentColor" opacity="0.6"><animateTransform attributeName="transform" type="scale" from="2" to="1" begin="0s" repeatCount="indefinite" dur="1s" calcMode="spline" keySplines="0.1 0.9 0.4 1" keyTimes="0;1" values="2;1"></animateTransform></rect></g><g transform="translate(50 50)"><rect x="-10" y="-30" width="20" height="60" fill="currentColor" opacity="0.8"><animateTransform attributeName="transform" type="scale" from="2" to="1" begin="0.1s" repeatCount="indefinite" dur="1s" calcMode="spline" keySplines="0.1 0.9 0.4 1" keyTimes="0;1" values="2;1"></animateTransform></rect></g><g transform="translate(80 50)"><rect x="-10" y="-30" width="20" height="60" fill="currentColor" opacity="0.9"><animateTransform attributeName="transform" type="scale" from="2" to="1" begin="0.2s" repeatCount="indefinite" dur="1s" calcMode="spline" keySplines="0.1 0.9 0.4 1" keyTimes="0;1" values="2;1"></animateTransform></rect></g>';
re({
  name: "QSpinnerFacebook",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid",
      innerHTML: om
    });
  }
});
const im = '<g transform="translate(-20,-20)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" from="90 50 50" to="0 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></g><g transform="translate(20,20) rotate(15 50 50)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></g>';
re({
  name: "QSpinnerGears",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: im
    });
  }
});
const rm = '<circle cx="12.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="0s" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5"><animate attributeName="fill-opacity" begin="100ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="300ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="52.5" r="12.5"><animate attributeName="fill-opacity" begin="600ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="800ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="52.5" r="12.5"><animate attributeName="fill-opacity" begin="400ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="12.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="700ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="500ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="200ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle>';
re({
  name: "QSpinnerGrid",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      fill: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 105 105",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: rm
    });
  }
});
const sm = '<path d="M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.716-6.002 11.47-7.65 17.304-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z" fill-opacity=".5"><animate attributeName="fill-opacity" begin="0s" dur="1.4s" values="0.5;1;0.5" calcMode="linear" repeatCount="indefinite"></animate></path><path d="M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.593-2.32 17.308 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z" fill-opacity=".5"><animate attributeName="fill-opacity" begin="0.7s" dur="1.4s" values="0.5;1;0.5" calcMode="linear" repeatCount="indefinite"></animate></path><path d="M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z"></path>';
re({
  name: "QSpinnerHearts",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      fill: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 140 64",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: sm
    });
  }
});
const um = '<g><path fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10" d="M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z"></path><clipPath id="uil-hourglass-clip1"><rect x="15" y="20" width="70" height="25"><animate attributeName="height" from="25" to="0" dur="1s" repeatCount="indefinite" values="25;0;0" keyTimes="0;0.5;1"></animate><animate attributeName="y" from="20" to="45" dur="1s" repeatCount="indefinite" values="20;45;45" keyTimes="0;0.5;1"></animate></rect></clipPath><clipPath id="uil-hourglass-clip2"><rect x="15" y="55" width="70" height="25"><animate attributeName="height" from="0" to="25" dur="1s" repeatCount="indefinite" values="0;25;25" keyTimes="0;0.5;1"></animate><animate attributeName="y" from="80" to="55" dur="1s" repeatCount="indefinite" values="80;55;55" keyTimes="0;0.5;1"></animate></rect></clipPath><path d="M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z" clip-path="url(#uil-hourglass-clip1)" fill="currentColor"></path><path d="M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z" clip-path="url(#uil-hourglass-clip2)" fill="currentColor"></path><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="180 50 50" repeatCount="indefinite" dur="1s" values="0 50 50;0 50 50;180 50 50" keyTimes="0;0.7;1"></animateTransform></g>';
re({
  name: "QSpinnerHourglass",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: um
    });
  }
});
const dm = '<path d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z" fill="none" stroke="currentColor" stroke-width="8" stroke-dasharray="10.691205342610678 10.691205342610678" stroke-dashoffset="0"><animate attributeName="stroke-dashoffset" from="0" to="21.382410685221355" begin="0" dur="2s" repeatCount="indefinite" fill="freeze"></animate></path>';
re({
  name: "QSpinnerInfinity",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      innerHTML: dm
    });
  }
});
const cm = '<g stroke-width="4" stroke-linecap="round"><line y1="17" y2="29" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g>';
var fm = re({
  name: "QSpinnerIos",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      stroke: "currentColor",
      fill: "currentColor",
      viewBox: "0 0 64 64",
      innerHTML: cm
    });
  }
});
const vm = '<circle cx="50" cy="50" r="44" fill="none" stroke-width="4" stroke-opacity=".5" stroke="currentColor"></circle><circle cx="8" cy="54" r="6" fill="currentColor" stroke-width="3" stroke="currentColor"><animateTransform attributeName="transform" type="rotate" from="0 50 48" to="360 50 52" dur="2s" repeatCount="indefinite"></animateTransform></circle>';
re({
  name: "QSpinnerOrbit",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: vm
    });
  }
});
const mm = '<g transform="translate(1 1)" stroke-width="2" fill="none" fill-rule="evenodd"><circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform></path></g>';
var gm = re({
  name: "QSpinnerOval",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      stroke: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 38 38",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: mm
    });
  }
});
const hm = '<path d="M0 50A50 50 0 0 1 50 0L50 50L0 50" fill="currentColor" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="0.8s" repeatCount="indefinite"></animateTransform></path><path d="M50 0A50 50 0 0 1 100 50L50 50L50 0" fill="currentColor" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.6s" repeatCount="indefinite"></animateTransform></path><path d="M100 50A50 50 0 0 1 50 100L50 50L100 50" fill="currentColor" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2.4s" repeatCount="indefinite"></animateTransform></path><path d="M50 100A50 50 0 0 1 0 50L50 50L50 100" fill="currentColor" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3.2s" repeatCount="indefinite"></animateTransform></path>';
var bm = re({
  name: "QSpinnerPie",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: hm
    });
  }
});
const ym = '<g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle></g>';
re({
  name: "QSpinnerPuff",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      stroke: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 44 44",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: ym
    });
  }
});
const pm = '<g transform="scale(0.55)"><circle cx="30" cy="150" r="30" fill="currentColor"><animate attributeName="opacity" from="0" to="1" dur="1s" begin="0" repeatCount="indefinite" keyTimes="0;0.5;1" values="0;1;1"></animate></circle><path d="M90,150h30c0-49.7-40.3-90-90-90v30C63.1,90,90,116.9,90,150z" fill="currentColor"><animate attributeName="opacity" from="0" to="1" dur="1s" begin="0.1" repeatCount="indefinite" keyTimes="0;0.5;1" values="0;1;1"></animate></path><path d="M150,150h30C180,67.2,112.8,0,30,0v30C96.3,30,150,83.7,150,150z" fill="currentColor"><animate attributeName="opacity" from="0" to="1" dur="1s" begin="0.2" repeatCount="indefinite" keyTimes="0;0.5;1" values="0;1;1"></animate></path></g>';
re({
  name: "QSpinnerRadio",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: pm
    });
  }
});
const km = '<g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2"><circle cx="22" cy="22" r="6"><animate attributeName="r" begin="1.5s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="1.5s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="stroke-width" begin="1.5s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="6"><animate attributeName="r" begin="3s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="3s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="stroke-width" begin="3s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="8"><animate attributeName="r" begin="0s" dur="1.5s" values="6;1;2;3;4;5;6" calcMode="linear" repeatCount="indefinite"></animate></circle></g>';
var Cm = re({
  name: "QSpinnerRings",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      stroke: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 45 45",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: km
    });
  }
});
const Sm = '<defs><linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"><stop stop-color="currentColor" stop-opacity="0" offset="0%"></stop><stop stop-color="currentColor" stop-opacity=".631" offset="63.146%"></stop><stop stop-color="currentColor" offset="100%"></stop></linearGradient></defs><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#a)" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></path><circle fill="currentColor" cx="36" cy="18" r="1"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></circle></g>';
var wm = re({
  name: "QSpinnerTail",
  props: Bt,
  setup(e) {
    const { cSize: t, classes: a } = Tt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 38 38",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: Sm
    });
  }
});
re({
  name: "QSplitter",
  props: {
    ...it,
    modelValue: {
      type: Number,
      required: !0
    },
    reverse: Boolean,
    unit: {
      type: String,
      default: "%",
      validator: (e) => ["%", "px"].includes(e)
    },
    limits: {
      type: Array,
      validator: (e) => e.length !== 2 || typeof e[0] != "number" || typeof e[1] != "number" ? !1 : e[0] >= 0 && e[0] <= e[1]
    },
    emitImmediately: Boolean,
    horizontal: Boolean,
    disable: Boolean,
    beforeClass: [
      Array,
      String,
      Object
    ],
    afterClass: [
      Array,
      String,
      Object
    ],
    separatorClass: [
      Array,
      String,
      Object
    ],
    separatorStyle: [
      Array,
      String,
      Object
    ]
  },
  emits: ["update:modelValue"],
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = ye(), l = rt(e, n), o = z(null), i = {
      before: z(null),
      after: z(null)
    }, r = s(() => `q-splitter no-wrap ${e.horizontal === !0 ? "q-splitter--horizontal column" : "q-splitter--vertical row"} q-splitter--${e.disable === !0 ? "disabled" : "workable"}` + (l.value === !0 ? " q-splitter--dark" : "")), u = s(() => e.horizontal === !0 ? "height" : "width"), c = s(() => e.reverse !== !0 ? "before" : "after"), d = s(() => e.limits !== void 0 ? e.limits : e.unit === "%" ? [10, 90] : [50, 1 / 0]);
    function v(x) {
      return (e.unit === "%" ? x : Math.round(x)) + e.unit;
    }
    const b = s(() => ({ [c.value]: { [u.value]: v(e.modelValue) } }));
    let m, g, p, k, C;
    function y(x) {
      if (x.isFirst === !0) {
        const M = o.value.getBoundingClientRect()[u.value];
        m = e.horizontal === !0 ? "up" : "left", g = e.unit === "%" ? 100 : M, p = Math.min(g, d.value[1], Math.max(d.value[0], e.modelValue)), k = (e.reverse !== !0 ? 1 : -1) * (e.horizontal === !0 ? 1 : n.lang.rtl === !0 ? -1 : 1) * (e.unit === "%" ? M === 0 ? 0 : 100 / M : 1), o.value.classList.add("q-splitter--active");
        return;
      }
      if (x.isFinal === !0) {
        C !== e.modelValue && a("update:modelValue", C), o.value.classList.remove("q-splitter--active");
        return;
      }
      const L = p + k * (x.direction === m ? -1 : 1) * x.distance[e.horizontal === !0 ? "y" : "x"];
      C = Math.min(g, d.value[1], Math.max(d.value[0], L)), i[c.value].value.style[u.value] = v(C), e.emitImmediately === !0 && e.modelValue !== C && a("update:modelValue", C);
    }
    const h = s(() => [[
      ta,
      y,
      void 0,
      {
        [e.horizontal === !0 ? "vertical" : "horizontal"]: !0,
        prevent: !0,
        stop: !0,
        mouse: !0,
        mouseAllDir: !0
      }
    ]]);
    function w(x, L) {
      x < L[0] ? a("update:modelValue", L[0]) : x > L[1] && a("update:modelValue", L[1]);
    }
    return se(() => e.modelValue, (x) => {
      w(x, d.value);
    }), se(() => e.limits, () => {
      nt(() => {
        w(e.modelValue, d.value);
      });
    }), () => {
      const x = [
        f("div", {
          ref: i.before,
          class: ["q-splitter__panel q-splitter__before" + (e.reverse === !0 ? " col" : ""), e.beforeClass],
          style: b.value.before
        }, De(t.before)),
        f("div", {
          class: ["q-splitter__separator", e.separatorClass],
          style: e.separatorStyle,
          "aria-disabled": e.disable === !0 ? "true" : void 0
        }, [oa("div", { class: "q-splitter__separator-area absolute-full" }, De(t.separator), "sep", e.disable !== !0, () => h.value)]),
        f("div", {
          ref: i.after,
          class: ["q-splitter__panel q-splitter__after" + (e.reverse === !0 ? "" : " col"), e.afterClass],
          style: b.value.after
        }, De(t.after))
      ];
      return f("div", {
        class: r.value,
        ref: o
      }, $t(t.default, x));
    };
  }
});
var Ou = re({
  name: "StepHeader",
  props: {
    stepper: {},
    step: {},
    goToPanel: Function
  },
  setup(e, { attrs: t }) {
    const { proxy: { $q: a } } = ye(), n = z(null), l = s(() => e.stepper.modelValue === e.step.name), o = s(() => {
      const k = e.step.disable;
      return k === !0 || k === "";
    }), i = s(() => {
      const k = e.step.error;
      return k === !0 || k === "";
    }), r = s(() => {
      const k = e.step.done;
      return o.value === !1 && (k === !0 || k === "");
    }), u = s(() => {
      const k = e.step.headerNav, C = k === !0 || k === "" || k === void 0;
      return o.value === !1 && e.stepper.headerNav && C;
    }), c = s(() => e.step.prefix && (l.value === !1 || e.stepper.activeIcon === "none") && (i.value === !1 || e.stepper.errorIcon === "none") && (r.value === !1 || e.stepper.doneIcon === "none")), d = s(() => {
      const k = e.step.icon || e.stepper.inactiveIcon;
      if (l.value === !0) {
        const C = e.step.activeIcon || e.stepper.activeIcon;
        return C === "none" ? k : C || a.iconSet.stepper.active;
      }
      if (i.value === !0) {
        const C = e.step.errorIcon || e.stepper.errorIcon;
        return C === "none" ? k : C || a.iconSet.stepper.error;
      }
      if (o.value === !1 && r.value === !0) {
        const C = e.step.doneIcon || e.stepper.doneIcon;
        return C === "none" ? k : C || a.iconSet.stepper.done;
      }
      return k;
    }), v = s(() => {
      const k = i.value === !0 ? e.step.errorColor || e.stepper.errorColor : void 0;
      if (l.value === !0) {
        const C = e.step.activeColor || e.stepper.activeColor || e.step.color;
        return C !== void 0 ? C : k;
      }
      return k !== void 0 ? k : o.value === !1 && r.value === !0 ? e.step.doneColor || e.stepper.doneColor || e.step.color || e.stepper.inactiveColor : e.step.color || e.stepper.inactiveColor;
    }), b = s(() => "q-stepper__tab col-grow flex items-center no-wrap relative-position" + (v.value !== void 0 ? ` text-${v.value}` : "") + (i.value === !0 ? " q-stepper__tab--error q-stepper__tab--error-with-" + (c.value === !0 ? "prefix" : "icon") : "") + (l.value === !0 ? " q-stepper__tab--active" : "") + (r.value === !0 ? " q-stepper__tab--done" : "") + (u.value === !0 ? " q-stepper__tab--navigation q-focusable q-hoverable" : "") + (o.value === !0 ? " q-stepper__tab--disabled" : "")), m = s(() => e.stepper.headerNav !== !0 ? !1 : u.value);
    function g() {
      var k;
      (k = n.value) == null || k.focus(), l.value === !1 && e.goToPanel(e.step.name);
    }
    function p(k) {
      k.keyCode === 13 && l.value === !1 && e.goToPanel(e.step.name);
    }
    return () => {
      const k = { class: b.value };
      u.value === !0 && (k.onClick = g, k.onKeyup = p, Object.assign(k, o.value === !0 ? {
        tabindex: -1,
        "aria-disabled": "true"
      } : { tabindex: t.tabindex || 0 }));
      const C = [f("div", {
        class: "q-focus-helper",
        tabindex: -1,
        ref: n
      }), f("div", { class: "q-stepper__dot row flex-center q-stepper__line relative-position" }, [f("span", { class: "row flex-center" }, [c.value === !0 ? e.step.prefix : f(st, { name: d.value })])])];
      if (e.step.title !== void 0 && e.step.title !== null) {
        const y = [f("div", { class: "q-stepper__title" }, e.step.title)];
        e.step.caption !== void 0 && e.step.caption !== null && y.push(f("div", { class: "q-stepper__caption" }, e.step.caption)), C.push(f("div", { class: "q-stepper__label q-stepper__line relative-position" }, y));
      }
      return aa(f("div", k, C), [[Fl, m.value]]);
    };
  }
});
function Hu(e) {
  return f("div", { class: "q-stepper__step-content" }, [f("div", { class: "q-stepper__step-inner" }, De(e.default))]);
}
const Dr = { setup(e, { slots: t }) {
  return () => Hu(t);
} };
re({
  name: "QStep",
  props: {
    ...di,
    icon: String,
    color: String,
    title: {
      type: String,
      required: !0
    },
    caption: String,
    prefix: [String, Number],
    doneIcon: String,
    doneColor: String,
    activeIcon: String,
    activeColor: String,
    errorIcon: String,
    errorColor: String,
    headerNav: {
      type: Boolean,
      default: !0
    },
    done: Boolean,
    error: Boolean,
    onScroll: [Function, Array]
  },
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = ye(), l = Yt(is, vt);
    if (l === vt)
      return console.error("QStep needs to be a child of QStepper"), vt;
    const { getCache: o } = Jn(), i = z(null), r = s(() => l.value.modelValue === e.name), u = s(() => n.platform.is.ios !== !0 && n.platform.is.chrome === !0 || r.value !== !0 || l.value.vertical !== !0 ? {} : { onScroll(v) {
      const { target: b } = v;
      b.scrollTop > 0 && (b.scrollTop = 0), e.onScroll !== void 0 && a("scroll", v);
    } }), c = s(() => typeof e.name == "string" || typeof e.name == "number" ? e.name : String(e.name));
    function d() {
      const v = l.value.vertical;
      return v === !0 && l.value.keepAlive === !0 ? f(es, l.value.keepAliveProps.value, r.value === !0 ? [f(l.value.needsUniqueKeepAliveWrapper.value === !0 ? o(c.value, () => ({
        ...Dr,
        name: c.value
      })) : Dr, { key: c.value }, t.default)] : void 0) : v !== !0 || r.value === !0 ? Hu(t) : void 0;
    }
    return () => f("div", {
      ref: i,
      class: "q-stepper__step",
      role: "tabpanel",
      ...u.value
    }, l.value.vertical === !0 ? [f(Ou, {
      stepper: l.value,
      step: e,
      goToPanel: l.value.goToPanel
    }), l.value.animated === !0 ? f(Si, d) : d()] : [d()]);
  }
});
const xm = /(-\w)/g;
function _m(e) {
  const t = {};
  for (const a in e) {
    const n = a.replace(xm, (l) => l[1].toUpperCase());
    t[n] = e[a];
  }
  return t;
}
re({
  name: "QStepper",
  props: {
    ...it,
    ...ci,
    flat: Boolean,
    bordered: Boolean,
    alternativeLabels: Boolean,
    headerNav: Boolean,
    contracted: Boolean,
    headerClass: String,
    inactiveColor: String,
    inactiveIcon: String,
    doneIcon: String,
    doneColor: String,
    activeIcon: String,
    activeColor: String,
    errorIcon: String,
    errorColor: String
  },
  emits: fi,
  setup(e, { slots: t }) {
    const a = rt(e, ye().proxy.$q), { updatePanelsList: n, isValidPanelName: l, updatePanelIndex: o, getPanelContent: i, getPanels: r, panelDirectives: u, goToPanel: c, keepAliveProps: d, needsUniqueKeepAliveWrapper: v } = vi();
    Va(is, s(() => ({
      goToPanel: c,
      keepAliveProps: d,
      needsUniqueKeepAliveWrapper: v,
      ...e
    })));
    const b = s(() => `q-stepper q-stepper--${e.vertical === !0 ? "vertical" : "horizontal"}` + (e.flat === !0 ? " q-stepper--flat" : "") + (e.bordered === !0 ? " q-stepper--bordered" : "") + (a.value === !0 ? " q-stepper--dark q-dark" : "")), m = s(() => `q-stepper__header row items-stretch justify-between q-stepper__header--${e.alternativeLabels === !0 ? "alternative" : "standard"}-labels` + (e.flat === !1 || e.bordered === !0 ? " q-stepper__header--border" : "") + (e.contracted === !0 ? " q-stepper__header--contracted" : "") + (e.headerClass !== void 0 ? ` ${e.headerClass}` : ""));
    function g() {
      const p = De(t.message, []);
      if (e.vertical === !0) {
        l(e.modelValue) && o();
        const k = f("div", { class: "q-stepper__content" }, De(t.default));
        return p === void 0 ? [k] : p.concat(k);
      }
      return [
        f("div", { class: m.value }, r().map((k) => {
          const C = _m(k.props);
          return f(Ou, {
            key: C.name,
            stepper: e,
            step: C,
            goToPanel: c
          });
        })),
        p,
        oa("div", { class: "q-stepper__content q-panel-parent" }, i(), "cont", e.swipeable, () => u.value)
      ];
    }
    return () => (n(t), f("div", { class: b.value }, $t(t.navigation, g())));
  }
});
re({
  name: "QStepperNavigation",
  setup(e, { slots: t }) {
    return () => f("div", { class: "q-stepper__nav" }, De(t.default));
  }
});
var $m = re({
  name: "QTh",
  props: {
    props: Object,
    autoWidth: Boolean
  },
  emits: ["click"],
  setup(e, { slots: t, emit: a }) {
    const n = ye(), { proxy: { $q: l } } = n, o = (i) => {
      a("click", i);
    };
    return () => {
      if (e.props === void 0) return f("th", {
        class: e.autoWidth === !0 ? "q-table--col-auto-width" : "",
        onClick: o
      }, De(t.default));
      let i, r;
      const u = n.vnode.key;
      if (u) {
        if (i = e.props.colsMap[u], i === void 0) return;
      } else i = e.props.col;
      if (i.sortable === !0) {
        const c = i.align === "right" ? "unshift" : "push";
        r = Xn(t.default, []), r[c](f(st, {
          class: i.__iconClass,
          name: l.iconSet.table.arrowUp
        }));
      } else r = De(t.default);
      return f("th", {
        class: i.__thClass + (e.autoWidth === !0 ? " q-table--col-auto-width" : ""),
        style: i.headerStyle,
        onClick: (c) => {
          i.sortable === !0 && e.props.sort(i), o(c);
        }
      }, r);
    };
  }
});
function Nu(e, t) {
  return f("div", e, [f("table", { class: "q-table" }, t)]);
}
const qm = {
  list: Sv,
  table: qv
}, Bm = [
  "list",
  "table",
  "__qtable"
];
var ju = re({
  name: "QVirtualScroll",
  props: {
    ...Qo,
    type: {
      type: String,
      default: "list",
      validator: (e) => Bm.includes(e)
    },
    items: {
      type: Array,
      default: () => []
    },
    itemsFn: Function,
    itemsSize: Number,
    scrollTarget: nn
  },
  setup(e, { slots: t, attrs: a }) {
    let n;
    const l = z(null), o = s(() => e.itemsSize >= 0 && e.itemsFn !== void 0 ? parseInt(e.itemsSize, 10) : Array.isArray(e.items) ? e.items.length : 0), { virtualScrollSliceRange: i, localResetVirtualScroll: r, padVirtualScroll: u, onVirtualScrollEvt: c } = Eu({
      virtualScrollLength: o,
      getVirtualScrollTarget: g,
      getVirtualScrollEl: m
    }), d = s(() => {
      if (o.value === 0) return [];
      const y = (h, w) => ({
        index: i.value.from + w,
        item: h
      });
      return e.itemsFn === void 0 ? e.items.slice(i.value.from, i.value.to).map(y) : e.itemsFn(i.value.from, i.value.to - i.value.from).map(y);
    }), v = s(() => "q-virtual-scroll q-virtual-scroll" + (e.virtualScrollHorizontal === !0 ? "--horizontal" : "--vertical") + (e.scrollTarget !== void 0 ? "" : " scroll")), b = s(() => e.scrollTarget !== void 0 ? {} : { tabindex: 0 });
    se(o, () => {
      r();
    }), se(() => e.scrollTarget, () => {
      k(), p();
    });
    function m() {
      return l.value.$el || l.value;
    }
    function g() {
      return n;
    }
    function p() {
      n = ma(m(), e.scrollTarget), n.addEventListener("scroll", c, gt.passive);
    }
    function k() {
      n !== void 0 && (n.removeEventListener("scroll", c, gt.passive), n = void 0);
    }
    function C() {
      let y = u(e.type === "list" ? "div" : "tbody", d.value.map(t.default));
      return t.before !== void 0 && (y = t.before().concat(y)), $t(t.after, y);
    }
    return Ko(() => {
      r();
    }), bt(() => {
      p();
    }), en(() => {
      p();
    }), wa(() => {
      k();
    }), tt(() => {
      k();
    }), () => {
      if (t.default === void 0) {
        console.error("QVirtualScroll: default scoped slot is required for rendering");
        return;
      }
      return e.type === "__qtable" ? Nu({
        ref: l,
        class: "q-table__middle " + v.value
      }, C()) : f(qm[e.type], {
        ...a,
        ref: l,
        class: [a.class, v.value],
        ...b.value
      }, C);
    };
  }
});
function Tm(e, t) {
  return new Date(e) - new Date(t);
}
const Mm = {
  sortMethod: Function,
  binaryStateSort: Boolean,
  columnSortOrder: {
    type: String,
    validator: (e) => e === "ad" || e === "da",
    default: "ad"
  }
};
function Am(e, t, a, n) {
  const l = s(() => {
    const { sortBy: r } = t.value;
    return r && a.value.find((u) => u.name === r) || null;
  }), o = s(() => e.sortMethod !== void 0 ? e.sortMethod : (r, u, c) => {
    const d = a.value.find((m) => m.name === u);
    if (d === void 0 || d.field === void 0) return r;
    const v = c === !0 ? -1 : 1, b = typeof d.field == "function" ? (m) => d.field(m) : (m) => m[d.field];
    return r.sort((m, g) => {
      let p = b(m), k = b(g);
      return d.rawSort !== void 0 ? d.rawSort(p, k, m, g) * v : p == null ? -1 * v : k == null ? Number(v) : d.sort !== void 0 ? d.sort(p, k, m, g) * v : jn(p) === !0 && jn(k) === !0 ? (p - k) * v : Ao(p) === !0 && Ao(k) === !0 ? Tm(p, k) * v : typeof p == "boolean" && typeof k == "boolean" ? (p - k) * v : ([p, k] = [p, k].map((C) => String(C).toLocaleString().toLowerCase()), p < k ? -1 * v : p === k ? 0 : v);
    });
  });
  function i(r) {
    let u = e.columnSortOrder;
    if (Qt(r) === !0)
      r.sortOrder && (u = r.sortOrder), r = r.name;
    else {
      const v = a.value.find((b) => b.name === r);
      v != null && v.sortOrder && (u = v.sortOrder);
    }
    let { sortBy: c, descending: d } = t.value;
    c !== r ? (c = r, d = u === "da") : e.binaryStateSort === !0 ? d = !d : d === !0 ? u === "ad" ? c = null : d = !1 : u === "ad" ? d = !0 : c = null, n({
      sortBy: c,
      descending: d,
      page: 1
    });
  }
  return {
    columnToSort: l,
    computedSortMethod: o,
    sort: i
  };
}
const Dm = {
  filter: [String, Object],
  filterMethod: Function
};
function Lm(e, t) {
  const a = s(() => e.filterMethod !== void 0 ? e.filterMethod : (n, l, o, i) => {
    const r = l ? l.toLowerCase() : "";
    return n.filter((u) => o.some((c) => {
      const d = String(i(c, u));
      return (d === "undefined" || d === "null" ? "" : d.toLowerCase()).indexOf(r) !== -1;
    }));
  });
  return se(() => e.filter, () => {
    nt(() => {
      t({ page: 1 }, !0);
    });
  }, { deep: !0 }), { computedFilterMethod: a };
}
function zm(e, t) {
  for (const a in t) if (t[a] !== e[a]) return !1;
  return !0;
}
function Lr(e) {
  return e.page < 1 && (e.page = 1), e.rowsPerPage !== void 0 && e.rowsPerPage < 1 && (e.rowsPerPage = 0), e;
}
const Vm = {
  pagination: Object,
  rowsPerPageOptions: {
    type: Array,
    default: () => [
      5,
      7,
      10,
      15,
      20,
      25,
      50,
      0
    ]
  },
  "onUpdate:pagination": [Function, Array]
};
function Pm(e, t) {
  const { props: a, emit: n } = e, l = z(Object.assign({
    sortBy: null,
    descending: !1,
    page: 1,
    rowsPerPage: a.rowsPerPageOptions.length !== 0 ? a.rowsPerPageOptions[0] : 5
  }, a.pagination)), o = s(() => Lr(a["onUpdate:pagination"] !== void 0 ? {
    ...l.value,
    ...a.pagination
  } : l.value)), i = s(() => o.value.rowsNumber !== void 0);
  function r(d) {
    u({
      pagination: d,
      filter: a.filter
    });
  }
  function u(d = {}) {
    nt(() => {
      n("request", {
        pagination: d.pagination || o.value,
        filter: d.filter || a.filter,
        getCellValue: t
      });
    });
  }
  function c(d, v) {
    const b = Lr({
      ...o.value,
      ...d
    });
    if (zm(o.value, b) === !0) {
      i.value === !0 && v === !0 && r(b);
      return;
    }
    if (i.value === !0) {
      r(b);
      return;
    }
    a.pagination !== void 0 && a["onUpdate:pagination"] !== void 0 ? n("update:pagination", b) : l.value = b;
  }
  return {
    innerPagination: l,
    computedPagination: o,
    isServerSide: i,
    requestServerInteraction: u,
    setPagination: c
  };
}
function Rm(e, t, a, n, l, o) {
  const { props: i, emit: r, proxy: { $q: u } } = e, c = s(() => n.value === !0 ? a.value.rowsNumber || 0 : o.value), d = s(() => {
    const { page: w, rowsPerPage: x } = a.value;
    return (w - 1) * x;
  }), v = s(() => {
    const { page: w, rowsPerPage: x } = a.value;
    return w * x;
  }), b = s(() => a.value.page === 1), m = s(() => a.value.rowsPerPage === 0 ? 1 : Math.max(1, Math.ceil(c.value / a.value.rowsPerPage))), g = s(() => v.value === 0 ? !0 : a.value.page >= m.value), p = s(() => (i.rowsPerPageOptions.includes(t.value.rowsPerPage) ? i.rowsPerPageOptions : [t.value.rowsPerPage].concat(i.rowsPerPageOptions)).map((w) => ({
    label: w === 0 ? u.lang.table.allRows : String(w),
    value: w
  })));
  se(m, (w, x) => {
    if (w === x) return;
    const L = a.value.page;
    w && !L ? l({ page: 1 }) : w < L && l({ page: w });
  });
  function k() {
    l({ page: 1 });
  }
  function C() {
    const { page: w } = a.value;
    w > 1 && l({ page: w - 1 });
  }
  function y() {
    const { page: w, rowsPerPage: x } = a.value;
    v.value > 0 && w * x < c.value && l({ page: w + 1 });
  }
  function h() {
    l({ page: m.value });
  }
  return i["onUpdate:pagination"] !== void 0 && r("update:pagination", { ...a.value }), {
    firstRowIndex: d,
    lastRowIndex: v,
    isFirstPage: b,
    isLastPage: g,
    pagesNumber: m,
    computedRowsPerPageOptions: p,
    computedRowsNumber: c,
    firstPage: k,
    prevPage: C,
    nextPage: y,
    lastPage: h
  };
}
const Fm = {
  selection: {
    type: String,
    default: "none",
    validator: (e) => [
      "single",
      "multiple",
      "none"
    ].includes(e)
  },
  selected: {
    type: Array,
    default: () => []
  }
}, Em = ["update:selected", "selection"];
function Im(e, t, a, n) {
  const l = s(() => {
    const g = {};
    return e.selected.map(n.value).forEach((p) => {
      g[p] = !0;
    }), g;
  }), o = s(() => e.selection !== "none"), i = s(() => e.selection === "single"), r = s(() => e.selection === "multiple"), u = s(() => a.value.length !== 0 && a.value.every((g) => l.value[n.value(g)] === !0)), c = s(() => u.value !== !0 && a.value.some((g) => l.value[n.value(g)] === !0)), d = s(() => e.selected.length);
  function v(g) {
    return l.value[g] === !0;
  }
  function b() {
    t("update:selected", []);
  }
  function m(g, p, k, C) {
    t("selection", {
      rows: p,
      added: k,
      keys: g,
      evt: C
    }), t("update:selected", i.value === !0 ? k === !0 ? p : [] : k === !0 ? e.selected.concat(p) : e.selected.filter((y) => g.includes(n.value(y)) === !1));
  }
  return {
    hasSelectionMode: o,
    singleSelection: i,
    multipleSelection: r,
    allRowsSelected: u,
    someRowsSelected: c,
    rowsSelectedNumber: d,
    isRowSelected: v,
    clearSelection: b,
    updateSelection: m
  };
}
function zr(e) {
  return Array.isArray(e) ? e.slice() : [];
}
const Om = { expanded: Array }, Hm = ["update:expanded"];
function Nm(e, t) {
  const a = z(zr(e.expanded));
  se(() => e.expanded, (i) => {
    a.value = zr(i);
  });
  function n(i) {
    return a.value.includes(i);
  }
  function l(i) {
    e.expanded !== void 0 ? t("update:expanded", i) : a.value = i;
  }
  function o(i, r) {
    const u = a.value.slice(), c = u.indexOf(i);
    r === !0 ? c === -1 && (u.push(i), l(u)) : c !== -1 && (u.splice(c, 1), l(u));
  }
  return {
    isRowExpanded: n,
    setExpanded: l,
    updateExpanded: o
  };
}
const jm = { visibleColumns: Array };
function Qm(e, t, a) {
  const n = s(() => {
    if (e.columns !== void 0) return e.columns;
    const o = e.rows[0];
    return o !== void 0 ? Object.keys(o).map((i) => ({
      name: i,
      label: i.toUpperCase(),
      field: i,
      align: jn(o[i]) ? "right" : "left",
      sortable: !0
    })) : [];
  }), l = s(() => {
    const { sortBy: o, descending: i } = t.value;
    return (e.visibleColumns !== void 0 ? n.value.filter((r) => r.required === !0 || e.visibleColumns.includes(r.name) === !0) : n.value).map((r) => {
      const u = r.align || "right", c = `text-${u}`;
      return {
        ...r,
        align: u,
        __iconClass: `q-table__sort-icon q-table__sort-icon--${u}`,
        __thClass: c + (r.headerClasses !== void 0 ? " " + r.headerClasses : "") + (r.sortable === !0 ? " sortable" : "") + (r.name === o ? ` sorted ${i === !0 ? "sort-desc" : ""}` : ""),
        __tdStyle: r.style !== void 0 ? typeof r.style != "function" ? () => r.style : r.style : () => null,
        __tdClass: r.classes !== void 0 ? typeof r.classes != "function" ? () => c + " " + r.classes : (d) => c + " " + r.classes(d) : () => c
      };
    });
  });
  return {
    colList: n,
    computedCols: l,
    computedColsMap: s(() => {
      const o = {};
      return l.value.forEach((i) => {
        o[i.name] = i;
      }), o;
    }),
    computedColspan: s(() => e.tableColspan !== void 0 ? e.tableColspan : l.value.length + (a.value === !0 ? 1 : 0))
  };
}
const cl = "q-table__bottom row items-center", Qu = {};
Fu.forEach((e) => {
  Qu[e] = {};
});
re({
  name: "QTable",
  props: {
    rows: {
      type: Array,
      required: !0
    },
    rowKey: {
      type: [String, Function],
      default: "id"
    },
    columns: Array,
    loading: Boolean,
    iconFirstPage: String,
    iconPrevPage: String,
    iconNextPage: String,
    iconLastPage: String,
    title: String,
    hideHeader: Boolean,
    grid: Boolean,
    gridHeader: Boolean,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (e) => [
        "horizontal",
        "vertical",
        "cell",
        "none"
      ].includes(e)
    },
    wrapCells: Boolean,
    virtualScroll: Boolean,
    virtualScrollTarget: {},
    ...Qu,
    noDataLabel: String,
    noResultsLabel: String,
    loadingLabel: String,
    selectedRowsLabel: Function,
    rowsPerPageLabel: String,
    paginationLabel: Function,
    color: {
      type: String,
      default: "grey-8"
    },
    titleClass: [
      String,
      Array,
      Object
    ],
    tableStyle: [
      String,
      Array,
      Object
    ],
    tableClass: [
      String,
      Array,
      Object
    ],
    tableHeaderStyle: [
      String,
      Array,
      Object
    ],
    tableHeaderClass: [
      String,
      Array,
      Object
    ],
    tableRowStyleFn: Function,
    tableRowClassFn: Function,
    cardContainerClass: [
      String,
      Array,
      Object
    ],
    cardContainerStyle: [
      String,
      Array,
      Object
    ],
    cardStyle: [
      String,
      Array,
      Object
    ],
    cardClass: [
      String,
      Array,
      Object
    ],
    cardStyleFn: Function,
    cardClassFn: Function,
    hideBottom: Boolean,
    hideSelectedBanner: Boolean,
    hideNoData: Boolean,
    hidePagination: Boolean,
    onRowClick: Function,
    onRowDblclick: Function,
    onRowContextmenu: Function,
    ...it,
    ...mi,
    ...jm,
    ...Dm,
    ...Vm,
    ...Om,
    ...Fm,
    ...Mm
  },
  emits: [
    "request",
    "virtualScroll",
    ...gi,
    ...Hm,
    ...Em
  ],
  setup(e, { slots: t, emit: a }) {
    const n = ye(), { proxy: { $q: l } } = n, o = rt(e, l), { inFullscreen: i, toggleFullscreen: r } = hi(), u = s(() => typeof e.rowKey == "function" ? e.rowKey : (J) => J[e.rowKey]), c = z(null), d = z(null), v = s(() => e.grid !== !0 && e.virtualScroll === !0), b = s(() => " q-table__card" + (o.value === !0 ? " q-table__card--dark q-dark" : "") + (e.square === !0 ? " q-table--square" : "") + (e.flat === !0 ? " q-table--flat" : "") + (e.bordered === !0 ? " q-table--bordered" : "")), m = s(() => `q-table__container q-table--${e.separator}-separator column no-wrap` + (e.grid === !0 ? " q-table--grid" : b.value) + (o.value === !0 ? " q-table--dark" : "") + (e.dense === !0 ? " q-table--dense" : "") + (e.wrapCells === !1 ? " q-table--no-wrap" : "") + (i.value === !0 ? " fullscreen scroll" : "")), g = s(() => m.value + (e.loading === !0 ? " q-table--loading" : ""));
    se(() => e.tableStyle + e.tableClass + e.tableHeaderStyle + e.tableHeaderClass + m.value, () => {
      var J;
      v.value === !0 && ((J = d.value) == null || J.reset());
    });
    const { innerPagination: p, computedPagination: k, isServerSide: C, requestServerInteraction: y, setPagination: h } = Pm(n, ce), { computedFilterMethod: w } = Lm(e, h), { isRowExpanded: x, setExpanded: L, updateExpanded: M } = Nm(e, a), K = s(() => {
      let J = e.rows;
      if (C.value === !0 || J.length === 0) return J;
      const { sortBy: Se, descending: Re } = k.value;
      return e.filter && (J = w.value(J, e.filter, Z.value, ce)), V.value !== null && (J = oe.value(e.rows === J ? J.slice() : J, Se, Re)), J;
    }), X = s(() => K.value.length), A = s(() => {
      let J = K.value;
      if (C.value === !0) return J;
      const { rowsPerPage: Se } = k.value;
      return Se !== 0 && (I.value === 0 && e.rows !== J ? J.length > de.value && (J = J.slice(0, de.value)) : J = J.slice(I.value, de.value)), J;
    }), { hasSelectionMode: $, singleSelection: D, multipleSelection: _, allRowsSelected: S, someRowsSelected: T, rowsSelectedNumber: H, isRowSelected: E, clearSelection: Q, updateSelection: j } = Im(e, a, A, u), { colList: N, computedCols: Z, computedColsMap: B, computedColspan: G } = Qm(e, k, $), { columnToSort: V, computedSortMethod: oe, sort: P } = Am(e, k, N, h), { firstRowIndex: I, lastRowIndex: de, isFirstPage: Y, isLastPage: fe, pagesNumber: W, computedRowsPerPageOptions: be, computedRowsNumber: _e, firstPage: we, prevPage: Ie, nextPage: Ce, lastPage: Me } = Rm(n, p, k, C, h, X), Le = s(() => A.value.length === 0), ot = s(() => {
      const J = {};
      return Fu.forEach((Se) => {
        J[Se] = e[Se];
      }), J.virtualScrollItemSize === void 0 && (J.virtualScrollItemSize = e.dense === !0 ? 28 : 48), J;
    });
    function We() {
      v.value === !0 && d.value.reset();
    }
    function ue() {
      if (e.grid === !0) return fa();
      const J = e.hideHeader !== !0 ? Fe : null;
      if (v.value === !0) {
        const Re = t["top-row"], Ne = t["bottom-row"], Xe = { default: (pt) => Ge(pt.item, t.body, pt.index) };
        if (Re !== void 0) {
          const pt = f("tbody", Re({ cols: Z.value }));
          Xe.before = J === null ? () => pt : () => [J()].concat(pt);
        } else J !== null && (Xe.before = J);
        return Ne !== void 0 && (Xe.after = () => f("tbody", Ne({ cols: Z.value }))), f(ju, {
          ref: d,
          class: e.tableClass,
          style: e.tableStyle,
          ...ot.value,
          scrollTarget: e.virtualScrollTarget,
          items: A.value,
          type: "__qtable",
          tableColspan: G.value,
          onVirtualScroll: ge
        }, Xe);
      }
      const Se = [Ke()];
      return J !== null && Se.unshift(J()), Nu({
        class: ["q-table__middle scroll", e.tableClass],
        style: e.tableStyle
      }, Se);
    }
    function ie(J, Se) {
      if (d.value !== null) {
        d.value.scrollTo(J, Se);
        return;
      }
      J = parseInt(J, 10);
      const Re = c.value.querySelector(`tbody tr:nth-of-type(${J + 1})`);
      if (Re !== null) {
        const Ne = c.value.querySelector(".q-table__middle.scroll"), Xe = Re.offsetTop - e.virtualScrollStickySizeStart, pt = Xe < Ne.scrollTop ? "decrease" : "increase";
        Ne.scrollTop = Xe, a("virtualScroll", {
          index: J,
          from: 0,
          to: p.value.rowsPerPage - 1,
          direction: pt
        });
      }
    }
    function ge(J) {
      a("virtualScroll", J);
    }
    function Pe() {
      return [f(Vu, {
        class: "q-table__linear-progress",
        color: e.color,
        dark: o.value,
        indeterminate: !0,
        trackColor: "transparent"
      })];
    }
    function Ge(J, Se, Re) {
      const Ne = u.value(J), Xe = E(Ne);
      if (Se !== void 0) {
        const te = {
          key: Ne,
          row: J,
          pageIndex: Re,
          __trClass: Xe ? "selected" : ""
        };
        if (e.tableRowStyleFn !== void 0 && (te.__trStyle = e.tableRowStyleFn(J)), e.tableRowClassFn !== void 0) {
          const xe = e.tableRowClassFn(J);
          xe && (te.__trClass = `${xe} ${te.__trClass}`);
        }
        return Se(je(te));
      }
      const pt = t["body-cell"], q = Z.value.map((te) => {
        const xe = t[`body-cell-${te.name}`], $e = xe !== void 0 ? xe : pt;
        return $e !== void 0 ? $e(Qe({
          key: Ne,
          row: J,
          pageIndex: Re,
          col: te
        })) : f("td", {
          class: te.__tdClass(J),
          style: te.__tdStyle(J)
        }, ce(te, J));
      });
      if ($.value === !0) {
        const te = t["body-selection"], xe = te !== void 0 ? te(et({
          key: Ne,
          row: J,
          pageIndex: Re
        })) : [f(In, {
          modelValue: Xe,
          color: e.color,
          dark: o.value,
          dense: e.dense,
          "onUpdate:modelValue": ($e, Ze) => {
            j([Ne], [J], $e, Ze);
          }
        })];
        q.unshift(f("td", { class: "q-table--col-auto-width" }, xe));
      }
      const U = {
        key: Ne,
        class: { selected: Xe }
      };
      if (e.onRowClick !== void 0 && (U.class["cursor-pointer"] = !0, U.onClick = (te) => {
        a("rowClick", te, J, Re);
      }), e.onRowDblclick !== void 0 && (U.class["cursor-pointer"] = !0, U.onDblclick = (te) => {
        a("rowDblclick", te, J, Re);
      }), e.onRowContextmenu !== void 0 && (U.class["cursor-pointer"] = !0, U.onContextmenu = (te) => {
        a("rowContextmenu", te, J, Re);
      }), e.tableRowStyleFn !== void 0 && (U.style = e.tableRowStyleFn(J)), e.tableRowClassFn !== void 0) {
        const te = e.tableRowClassFn(J);
        te && (U.class[te] = !0);
      }
      return f("tr", U, q);
    }
    function Ke() {
      const J = t.body, Se = t["top-row"], Re = t["bottom-row"];
      let Ne = A.value.map((Xe, pt) => Ge(Xe, J, pt));
      return Se !== void 0 && (Ne = Se({ cols: Z.value }).concat(Ne)), Re !== void 0 && (Ne = Ne.concat(Re({ cols: Z.value }))), f("tbody", Ne);
    }
    function je(J) {
      return ae(J), J.cols = J.cols.map((Se) => Rt({ ...Se }, "value", () => ce(Se, J.row))), J;
    }
    function Qe(J) {
      return ae(J), Rt(J, "value", () => ce(J.col, J.row)), J;
    }
    function et(J) {
      return ae(J), J;
    }
    function ae(J) {
      Object.assign(J, {
        cols: Z.value,
        colsMap: B.value,
        sort: P,
        rowIndex: I.value + J.pageIndex,
        color: e.color,
        dark: o.value,
        dense: e.dense
      }), $.value === !0 && Rt(J, "selected", () => E(J.key), (Se, Re) => {
        j([J.key], [J.row], Se, Re);
      }), Rt(J, "expand", () => x(J.key), (Se) => {
        M(J.key, Se);
      });
    }
    function ce(J, Se) {
      const Re = typeof J.field == "function" ? J.field(Se) : Se[J.field];
      return J.format !== void 0 ? J.format(Re, Se) : Re;
    }
    const Ve = s(() => ({
      pagination: k.value,
      pagesNumber: W.value,
      isFirstPage: Y.value,
      isLastPage: fe.value,
      firstPage: we,
      prevPage: Ie,
      nextPage: Ce,
      lastPage: Me,
      inFullscreen: i.value,
      toggleFullscreen: r
    }));
    function le() {
      const J = t.top, Se = t["top-left"], Re = t["top-right"], Ne = t["top-selection"], Xe = $.value === !0 && Ne !== void 0 && H.value > 0, pt = "q-table__top relative-position row items-center";
      if (J !== void 0) return f("div", { class: pt }, [J(Ve.value)]);
      let q;
      if (Xe === !0 ? q = Ne(Ve.value).slice() : (q = [], Se !== void 0 ? q.push(f("div", { class: "q-table__control" }, [Se(Ve.value)])) : e.title && q.push(f("div", { class: "q-table__control" }, [f("div", { class: ["q-table__title", e.titleClass] }, e.title)]))), Re !== void 0 && (q.push(f("div", { class: "q-table__separator col" })), q.push(f("div", { class: "q-table__control" }, [Re(Ve.value)]))), q.length !== 0)
        return f("div", { class: pt }, q);
    }
    const ke = s(() => T.value === !0 ? null : S.value);
    function Fe() {
      const J = Te();
      return e.loading === !0 && t.loading === void 0 && J.push(f("tr", { class: "q-table__progress" }, [f("th", {
        class: "relative-position",
        colspan: G.value
      }, Pe())])), f("thead", J);
    }
    function Te() {
      const J = t.header, Se = t["header-cell"];
      if (J !== void 0) return J(He({ header: !0 })).slice();
      const Re = Z.value.map((Ne) => {
        const Xe = t[`header-cell-${Ne.name}`], pt = Xe !== void 0 ? Xe : Se, q = He({ col: Ne });
        return pt !== void 0 ? pt(q) : f($m, {
          key: Ne.name,
          props: q
        }, () => Ne.label);
      });
      if (D.value === !0 && e.grid !== !0) Re.unshift(f("th", { class: "q-table--col-auto-width" }, " "));
      else if (_.value === !0) {
        const Ne = t["header-selection"], Xe = Ne !== void 0 ? Ne(He({})) : [f(In, {
          color: e.color,
          modelValue: ke.value,
          dark: o.value,
          dense: e.dense,
          "onUpdate:modelValue": ut
        })];
        Re.unshift(f("th", { class: "q-table--col-auto-width" }, Xe));
      }
      return [f("tr", {
        class: e.tableHeaderClass,
        style: e.tableHeaderStyle
      }, Re)];
    }
    function He(J) {
      return Object.assign(J, {
        cols: Z.value,
        sort: P,
        colsMap: B.value,
        color: e.color,
        dark: o.value,
        dense: e.dense
      }), _.value === !0 && Rt(J, "selected", () => ke.value, ut), J;
    }
    function ut(J) {
      T.value === !0 && (J = !1), j(A.value.map(u.value), A.value, J);
    }
    const It = s(() => {
      const J = [
        e.iconFirstPage || l.iconSet.table.firstPage,
        e.iconPrevPage || l.iconSet.table.prevPage,
        e.iconNextPage || l.iconSet.table.nextPage,
        e.iconLastPage || l.iconSet.table.lastPage
      ];
      return l.lang.rtl === !0 ? J.reverse() : J;
    });
    function Ct() {
      if (e.hideBottom === !0) return;
      if (Le.value === !0) {
        if (e.hideNoData === !0) return;
        const Re = e.loading === !0 ? e.loadingLabel || l.lang.table.loading : e.filter ? e.noResultsLabel || l.lang.table.noResults : e.noDataLabel || l.lang.table.noData, Ne = t["no-data"], Xe = Ne !== void 0 ? [Ne({
          message: Re,
          icon: l.iconSet.table.warning,
          filter: e.filter
        })] : [f(st, {
          class: "q-table__bottom-nodata-icon",
          name: l.iconSet.table.warning
        }), Re];
        return f("div", { class: cl + " q-table__bottom--nodata" }, Xe);
      }
      const J = t.bottom;
      if (J !== void 0) return f("div", { class: cl }, [J(Ve.value)]);
      const Se = e.hideSelectedBanner !== !0 && $.value === !0 && H.value > 0 ? [f("div", { class: "q-table__control" }, [f("div", [(e.selectedRowsLabel || l.lang.table.selectedRecords)(H.value)])])] : [];
      if (e.hidePagination !== !0) return f("div", { class: cl + " justify-end" }, Xt(Se));
      if (Se.length !== 0) return f("div", { class: cl }, Se);
    }
    function Zt(J) {
      h({
        page: 1,
        rowsPerPage: J.value
      });
    }
    function Xt(J) {
      let Se;
      const { rowsPerPage: Re } = k.value, Ne = e.paginationLabel || l.lang.table.pagination, Xe = t.pagination, pt = e.rowsPerPageOptions.length > 1;
      if (J.push(f("div", { class: "q-table__separator col" })), pt === !0 && J.push(f("div", { class: "q-table__control" }, [f("span", { class: "q-table__bottom-item" }, [e.rowsPerPageLabel || l.lang.table.recordsPerPage]), f(Iu, {
        class: "q-table__select inline q-table__bottom-item",
        color: e.color,
        modelValue: Re,
        options: be.value,
        displayValue: Re === 0 ? l.lang.table.allRows : Re,
        dark: o.value,
        borderless: !0,
        dense: !0,
        optionsDense: !0,
        optionsCover: !0,
        "onUpdate:modelValue": Zt
      })])), Xe !== void 0) Se = Xe(Ve.value);
      else if (Se = [f("span", Re !== 0 ? { class: "q-table__bottom-item" } : {}, [Re ? Ne(I.value + 1, Math.min(de.value, _e.value), _e.value) : Ne(1, X.value, _e.value)])], Re !== 0 && W.value > 1) {
        const q = {
          color: e.color,
          round: !0,
          dense: !0,
          flat: !0
        };
        e.dense === !0 && (q.size = "sm"), W.value > 2 && Se.push(f(ft, {
          key: "pgFirst",
          ...q,
          icon: It.value[0],
          disable: Y.value,
          "aria-label": l.lang.pagination.first,
          onClick: we
        })), Se.push(f(ft, {
          key: "pgPrev",
          ...q,
          icon: It.value[1],
          disable: Y.value,
          "aria-label": l.lang.pagination.prev,
          onClick: Ie
        }), f(ft, {
          key: "pgNext",
          ...q,
          icon: It.value[2],
          disable: fe.value,
          "aria-label": l.lang.pagination.next,
          onClick: Ce
        })), W.value > 2 && Se.push(f(ft, {
          key: "pgLast",
          ...q,
          icon: It.value[3],
          disable: fe.value,
          "aria-label": l.lang.pagination.last,
          onClick: Me
        }));
      }
      return J.push(f("div", { class: "q-table__control" }, Se)), J;
    }
    function ga() {
      return f("div", { class: "q-table__middle" }, e.gridHeader === !0 ? [f("table", { class: "q-table" }, [Fe()])] : e.loading === !0 && t.loading === void 0 ? Pe() : void 0);
    }
    function fa() {
      const J = t.item !== void 0 ? t.item : (Se) => {
        const Re = Se.cols.map((Xe) => f("div", { class: "q-table__grid-item-row" }, [f("div", { class: "q-table__grid-item-title" }, [Xe.label]), f("div", { class: "q-table__grid-item-value" }, [Xe.value])]));
        if ($.value === !0) {
          const Xe = t["body-selection"], pt = Xe !== void 0 ? Xe(Se) : [f(In, {
            modelValue: Se.selected,
            color: e.color,
            dark: o.value,
            dense: e.dense,
            "onUpdate:modelValue": (q, U) => {
              j([Se.key], [Se.row], q, U);
            }
          })];
          Re.unshift(f("div", { class: "q-table__grid-item-row" }, pt), f(Za, { dark: o.value }));
        }
        const Ne = {
          class: ["q-table__grid-item-card" + b.value, e.cardClass],
          style: e.cardStyle
        };
        if (e.cardStyleFn !== void 0 && (Ne.style = [Ne.style, e.cardStyleFn(Se.row)]), e.cardClassFn !== void 0) {
          const Xe = e.cardClassFn(Se.row);
          Xe && (Ne.class[0] += ` ${Xe}`);
        }
        return (e.onRowClick !== void 0 || e.onRowDblclick !== void 0 || e.onRowContextmenu !== void 0) && (Ne.class[0] += " cursor-pointer", e.onRowClick !== void 0 && (Ne.onClick = (Xe) => {
          a("RowClick", Xe, Se.row, Se.pageIndex);
        }), e.onRowDblclick !== void 0 && (Ne.onDblclick = (Xe) => {
          a("RowDblclick", Xe, Se.row, Se.pageIndex);
        }), e.onRowContextmenu !== void 0 && (Ne.onContextmenu = (Xe) => {
          a("rowContextmenu", Xe, Se.row, Se.pageIndex);
        })), f("div", { class: "q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3" + (Se.selected === !0 ? " q-table__grid-item--selected" : "") }, [f("div", Ne, Re)]);
      };
      return f("div", {
        class: ["q-table__grid-content row", e.cardContainerClass],
        style: e.cardContainerStyle
      }, A.value.map((Se, Re) => J(je({
        key: u.value(Se),
        row: Se,
        pageIndex: Re
      }))));
    }
    return Object.assign(n.proxy, {
      requestServerInteraction: y,
      setPagination: h,
      firstPage: we,
      prevPage: Ie,
      nextPage: Ce,
      lastPage: Me,
      isRowSelected: E,
      clearSelection: Q,
      isRowExpanded: x,
      setExpanded: L,
      sort: P,
      resetVirtualScroll: We,
      scrollTo: ie,
      getCellValue: ce
    }), ns(n.proxy, {
      filteredSortedRows: () => K.value,
      computedRows: () => A.value,
      computedRowsNumber: () => _e.value
    }), () => {
      const J = [le()], Se = {
        ref: c,
        class: g.value
      };
      return e.grid === !0 ? J.push(ga()) : Object.assign(Se, {
        class: [Se.class, e.cardClass],
        style: e.cardStyle
      }), J.push(ue(), Ct()), e.loading === !0 && t.loading !== void 0 && J.push(t.loading()), f("div", Se, J);
    };
  }
});
re({
  name: "QTr",
  props: {
    props: Object,
    noHover: Boolean
  },
  setup(e, { slots: t }) {
    const a = s(() => "q-tr" + (e.props === void 0 || e.props.header === !0 ? "" : " " + e.props.__trClass) + (e.noHover === !0 ? " q-tr--no-hover" : ""));
    return () => {
      var n;
      return f("tr", {
        style: (n = e.props) == null ? void 0 : n.__trStyle,
        class: a.value
      }, De(t.default));
    };
  }
});
re({
  name: "QTd",
  props: {
    props: Object,
    autoWidth: Boolean,
    noHover: Boolean
  },
  setup(e, { slots: t }) {
    const a = ye(), n = s(() => "q-td" + (e.autoWidth === !0 ? " q-table--col-auto-width" : "") + (e.noHover === !0 ? " q-td--no-hover" : "") + " ");
    return () => {
      if (e.props === void 0) return f("td", { class: n.value }, De(t.default));
      const l = a.vnode.key, o = (e.props.colsMap !== void 0 ? e.props.colsMap[l] : null) || e.props.col;
      if (o === void 0) return;
      const { row: i } = e.props;
      return f("td", {
        class: n.value + o.__tdClass(i),
        style: o.__tdStyle(i)
      }, De(t.default));
    };
  }
});
re({
  name: "QRouteTab",
  props: {
    ...Gn,
    ...eu
  },
  emits: Js,
  setup(e, { slots: t, emit: a }) {
    const n = Rl({ useDisableForRouterLinkProps: !1 }), { renderTab: l, $tabs: o } = tu(e, t, a, {
      exact: s(() => e.exact),
      ...n
    });
    return se(() => `${e.name} | ${e.exact} | ${(n.resolvedLink.value || {}).href}`, o.verifyRouteModel), () => l(n.linkTag.value, n.linkAttrs.value);
  }
});
function Um(e, t) {
  return e.hour !== null && e.minute === null ? "minute" : "hour";
}
function Km() {
  const e = /* @__PURE__ */ new Date();
  return {
    hour: e.getHours(),
    minute: e.getMinutes(),
    second: e.getSeconds(),
    millisecond: e.getMilliseconds()
  };
}
var Wm = re({
  name: "QTime",
  props: {
    ...it,
    ...ra,
    ...Al,
    modelValue: {
      required: !0,
      validator: (e) => typeof e == "string" || e === null
    },
    mask: {
      ...Al.mask,
      default: null
    },
    format24h: {
      type: Boolean,
      default: null
    },
    defaultDate: {
      type: String,
      validator: (e) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e)
    },
    options: Function,
    hourOptions: Array,
    minuteOptions: Array,
    secondOptions: Array,
    withSeconds: Boolean,
    nowBtn: Boolean
  },
  emits: iu,
  setup(e, { slots: t, emit: a }) {
    const n = ye(), { $q: l } = n.proxy, o = rt(e, l), { tabindex: i, headerClass: r, getLocale: u, getCurrentDate: c } = ru(e, l), d = Ra(Zn(e));
    let v, b;
    const m = z(null), g = s(() => V()), p = s(() => u()), k = s(() => oe()), C = Pn(e.modelValue, g.value, p.value, e.calendar, k.value), y = z(Um(C)), h = z(C), w = z(C.hour === null || C.hour < 12), x = s(() => `q-time q-time--${e.landscape === !0 ? "landscape" : "portrait"}` + (o.value === !0 ? " q-time--dark q-dark" : "") + (e.disable === !0 ? " disabled" : e.readonly === !0 ? " q-time--readonly" : "") + (e.bordered === !0 ? " q-time--bordered" : "") + (e.square === !0 ? " q-time--square no-border-radius" : "") + (e.flat === !0 ? " q-time--flat no-shadow" : "")), L = s(() => {
      const ae = h.value;
      return {
        hour: ae.hour === null ? "--" : M.value === !0 ? ct(ae.hour) : String(w.value === !0 ? ae.hour === 0 ? 12 : ae.hour : ae.hour > 12 ? ae.hour - 12 : ae.hour),
        minute: ae.minute === null ? "--" : ct(ae.minute),
        second: ae.second === null ? "--" : ct(ae.second)
      };
    }), M = s(() => e.format24h !== null ? e.format24h : l.lang.date.format24h), K = s(() => {
      const ae = y.value === "hour", ce = ae === !0 ? 12 : 60, Ve = h.value[y.value];
      let le = `rotate(${Math.round(Ve * (360 / ce)) - 180}deg) translateX(-50%)`;
      return ae === !0 && M.value === !0 && h.value.hour >= 12 && (le += " scale(.7)"), { transform: le };
    }), X = s(() => h.value.hour !== null), A = s(() => X.value === !0 && h.value.minute !== null), $ = s(() => e.hourOptions !== void 0 ? (ae) => e.hourOptions.includes(ae) : e.options !== void 0 ? (ae) => e.options(ae, null, null) : null), D = s(() => e.minuteOptions !== void 0 ? (ae) => e.minuteOptions.includes(ae) : e.options !== void 0 ? (ae) => e.options(h.value.hour, ae, null) : null), _ = s(() => e.secondOptions !== void 0 ? (ae) => e.secondOptions.includes(ae) : e.options !== void 0 ? (ae) => e.options(h.value.hour, h.value.minute, ae) : null), S = s(() => {
      if ($.value === null) return null;
      const ae = Z(0, 11, $.value), ce = Z(12, 11, $.value);
      return {
        am: ae,
        pm: ce,
        values: ae.values.concat(ce.values)
      };
    }), T = s(() => D.value !== null ? Z(0, 59, D.value) : null), H = s(() => _.value !== null ? Z(0, 59, _.value) : null), E = s(() => {
      switch (y.value) {
        case "hour":
          return S.value;
        case "minute":
          return T.value;
        case "second":
          return H.value;
      }
    }), Q = s(() => {
      let ae, ce, Ve = 0, le = 1;
      const ke = E.value !== null ? E.value.values : void 0;
      y.value === "hour" ? M.value === !0 ? (ae = 0, ce = 23) : (ae = 0, ce = 11, w.value === !1 && (Ve = 12)) : (ae = 0, ce = 55, le = 5);
      const Fe = [];
      for (let Te = ae, He = ae; Te <= ce; Te += le, He++) {
        const ut = Te + Ve, It = (ke == null ? void 0 : ke.includes(ut)) === !1, Ct = y.value === "hour" && Te === 0 ? M.value === !0 ? "00" : "12" : Te;
        Fe.push({
          val: ut,
          index: He,
          disable: It,
          label: Ct
        });
      }
      return Fe;
    }), j = s(() => [[
      ta,
      de,
      void 0,
      {
        stop: !0,
        prevent: !0,
        mouse: !0
      }
    ]]);
    se(() => e.modelValue, (ae) => {
      const ce = Pn(ae, g.value, p.value, e.calendar, k.value);
      (ce.dateHash !== h.value.dateHash || ce.timeHash !== h.value.timeHash) && (h.value = ce, ce.hour === null ? y.value = "hour" : w.value = ce.hour < 12);
    }), se([g, p], () => {
      nt(() => {
        je();
      });
    });
    function N() {
      const ae = {
        ...c(),
        ...Km()
      };
      je(ae), Object.assign(h.value, ae), y.value = "hour";
    }
    function Z(ae, ce, Ve) {
      const le = Array.apply(null, { length: ce + 1 }).map((ke, Fe) => {
        const Te = Fe + ae;
        return {
          index: Te,
          val: Ve(Te) === !0
        };
      }).filter((ke) => ke.val === !0).map((ke) => ke.index);
      return {
        min: le[0],
        max: le[le.length - 1],
        values: le,
        threshold: ce + 1
      };
    }
    function B(ae, ce, Ve) {
      const le = Math.abs(ae - ce);
      return Math.min(le, Ve - le);
    }
    function G(ae, { min: ce, max: Ve, values: le, threshold: ke }) {
      if (ae === ce) return ce;
      if (ae < ce || ae > Ve) return B(ae, ce, ke) <= B(ae, Ve, ke) ? ce : Ve;
      const Fe = le.findIndex((ut) => ae <= ut), Te = le[Fe - 1], He = le[Fe];
      return ae - Te <= He - ae ? Te : He;
    }
    function V() {
      return e.calendar !== "persian" && e.mask !== null ? e.mask : `HH:mm${e.withSeconds === !0 ? ":ss" : ""}`;
    }
    function oe() {
      if (typeof e.defaultDate != "string") {
        const ae = c(!0);
        return ae.dateHash = ya(ae), ae;
      }
      return Pn(e.defaultDate, "YYYY/MM/DD", void 0, e.calendar);
    }
    function P() {
      return Da(n) === !0 || E.value !== null && (E.value.values.length === 0 || y.value === "hour" && M.value !== !0 && S.value[w.value === !0 ? "am" : "pm"].values.length === 0);
    }
    function I() {
      const { top: ae, left: ce, width: Ve } = m.value.getBoundingClientRect(), le = Ve / 2;
      return {
        top: ae + le,
        left: ce + le,
        dist: le * 0.7
      };
    }
    function de(ae) {
      if (P() !== !0) {
        if (ae.isFirst === !0) {
          v = I(), b = fe(ae.evt, v);
          return;
        }
        b = fe(ae.evt, v, b), ae.isFinal === !0 && (v = !1, b = null, Y());
      }
    }
    function Y() {
      y.value === "hour" ? y.value = "minute" : e.withSeconds && y.value === "minute" && (y.value = "second");
    }
    function fe(ae, ce, Ve) {
      const le = Wt(ae), ke = Math.abs(le.top - ce.top), Fe = Math.sqrt(Math.abs(le.top - ce.top) ** 2 + Math.abs(le.left - ce.left) ** 2);
      let Te, He = Math.asin(ke / Fe) * (180 / Math.PI);
      if (le.top < ce.top ? He = ce.left < le.left ? 90 - He : 270 + He : He = ce.left < le.left ? He + 90 : 270 - He, y.value === "hour") {
        if (Te = He / 30, S.value !== null) {
          const ut = M.value !== !0 ? w.value === !0 : S.value.am.values.length !== 0 && S.value.pm.values.length !== 0 ? Fe >= ce.dist : S.value.am.values.length !== 0;
          Te = G(Te + (ut === !0 ? 0 : 12), S.value[ut === !0 ? "am" : "pm"]);
        } else
          Te = Math.round(Te), M.value === !0 ? Fe < ce.dist ? Te < 12 && (Te += 12) : Te === 12 && (Te = 0) : w.value === !0 && Te === 12 ? Te = 0 : w.value === !1 && Te !== 12 && (Te += 12);
        M.value === !0 && (w.value = Te < 12);
      } else
        Te = Math.round(He / 6) % 60, y.value === "minute" && T.value !== null ? Te = G(Te, T.value) : y.value === "second" && H.value !== null && (Te = G(Te, H.value));
      return Ve !== Te && ie[y.value](Te), Te;
    }
    const W = {
      hour() {
        y.value = "hour";
      },
      minute() {
        y.value = "minute";
      },
      second() {
        y.value = "second";
      }
    };
    function be(ae) {
      ae.keyCode === 13 && ge();
    }
    function _e(ae) {
      ae.keyCode === 13 && Pe();
    }
    function we(ae) {
      P() !== !0 && (l.platform.is.desktop !== !0 && fe(ae, I()), Y());
    }
    function Ie(ae) {
      P() !== !0 && fe(ae, I());
    }
    function Ce(ae) {
      if (ae.keyCode === 13) y.value = "hour";
      else if ([37, 39].includes(ae.keyCode)) {
        const ce = ae.keyCode === 37 ? -1 : 1;
        if (S.value !== null) {
          const Ve = M.value === !0 ? S.value.values : S.value[w.value === !0 ? "am" : "pm"].values;
          if (Ve.length === 0) return;
          h.value.hour === null ? ot(Ve[0]) : ot(Ve[(Ve.length + Ve.indexOf(h.value.hour) + ce) % Ve.length]);
        } else {
          const Ve = M.value === !0 ? 24 : 12;
          ot((M.value !== !0 && w.value === !1 ? 12 : 0) + (24 + (h.value.hour === null ? -ce : h.value.hour) + ce) % Ve);
        }
      }
    }
    function Me(ae) {
      if (ae.keyCode === 13) y.value = "minute";
      else if ([37, 39].includes(ae.keyCode)) {
        const ce = ae.keyCode === 37 ? -1 : 1;
        if (T.value !== null) {
          const Ve = T.value.values;
          if (Ve.length === 0) return;
          h.value.minute === null ? We(Ve[0]) : We(Ve[(Ve.length + Ve.indexOf(h.value.minute) + ce) % Ve.length]);
        } else We((60 + (h.value.minute === null ? -ce : h.value.minute) + ce) % 60);
      }
    }
    function Le(ae) {
      if (ae.keyCode === 13) y.value = "second";
      else if ([37, 39].includes(ae.keyCode)) {
        const ce = ae.keyCode === 37 ? -1 : 1;
        if (H.value !== null) {
          const Ve = H.value.values;
          if (Ve.length === 0) return;
          h.value.seconds === null ? ue(Ve[0]) : ue(Ve[(Ve.length + Ve.indexOf(h.value.second) + ce) % Ve.length]);
        } else ue((60 + (h.value.second === null ? -ce : h.value.second) + ce) % 60);
      }
    }
    function ot(ae) {
      h.value.hour !== ae && (h.value.hour = ae, Ke());
    }
    function We(ae) {
      h.value.minute !== ae && (h.value.minute = ae, Ke());
    }
    function ue(ae) {
      h.value.second !== ae && (h.value.second = ae, Ke());
    }
    const ie = {
      hour: ot,
      minute: We,
      second: ue
    };
    function ge() {
      w.value === !1 && (w.value = !0, h.value.hour !== null && (h.value.hour -= 12, Ke()));
    }
    function Pe() {
      w.value === !0 && (w.value = !1, h.value.hour !== null && (h.value.hour += 12, Ke()));
    }
    function Ge(ae) {
      const ce = e.modelValue;
      y.value !== ae && ce !== void 0 && ce !== null && ce !== "" && typeof ce != "string" && (y.value = ae);
    }
    function Ke() {
      if ($.value !== null && $.value(h.value.hour) !== !0) {
        h.value = Pn(), Ge("hour");
        return;
      }
      if (D.value !== null && D.value(h.value.minute) !== !0) {
        h.value.minute = null, h.value.second = null, Ge("minute");
        return;
      }
      if (e.withSeconds === !0 && _.value !== null && _.value(h.value.second) !== !0) {
        h.value.second = null, Ge("second");
        return;
      }
      h.value.hour === null || h.value.minute === null || e.withSeconds === !0 && h.value.second === null || je();
    }
    function je(ae) {
      const ce = Object.assign({ ...h.value }, ae), Ve = e.calendar === "persian" ? ct(ce.hour) + ":" + ct(ce.minute) + (e.withSeconds === !0 ? ":" + ct(ce.second) : "") : fu(new Date(ce.year, ce.month === null ? null : ce.month - 1, ce.day, ce.hour, ce.minute, ce.second, ce.millisecond), g.value, p.value, ce.year, ce.timezoneOffset);
      ce.changed = Ve !== e.modelValue, a("update:modelValue", Ve, ce);
    }
    function Qe() {
      const ae = [
        f("div", {
          class: "q-time__link " + (y.value === "hour" ? "q-time__link--active" : "cursor-pointer"),
          tabindex: i.value,
          onClick: W.hour,
          onKeyup: Ce
        }, L.value.hour),
        f("div", ":"),
        f("div", X.value === !0 ? {
          class: "q-time__link " + (y.value === "minute" ? "q-time__link--active" : "cursor-pointer"),
          tabindex: i.value,
          onKeyup: Me,
          onClick: W.minute
        } : { class: "q-time__link" }, L.value.minute)
      ];
      e.withSeconds === !0 && ae.push(f("div", ":"), f("div", A.value === !0 ? {
        class: "q-time__link " + (y.value === "second" ? "q-time__link--active" : "cursor-pointer"),
        tabindex: i.value,
        onKeyup: Le,
        onClick: W.second
      } : { class: "q-time__link" }, L.value.second));
      const ce = [f("div", {
        class: "q-time__header-label row items-center no-wrap",
        dir: "ltr"
      }, ae)];
      return M.value === !1 && ce.push(f("div", { class: "q-time__header-ampm column items-between no-wrap" }, [f("div", {
        class: "q-time__link " + (w.value === !0 ? "q-time__link--active" : "cursor-pointer"),
        tabindex: i.value,
        onClick: ge,
        onKeyup: be
      }, "AM"), f("div", {
        class: "q-time__link " + (w.value !== !0 ? "q-time__link--active" : "cursor-pointer"),
        tabindex: i.value,
        onClick: Pe,
        onKeyup: _e
      }, "PM")])), f("div", { class: "q-time__header flex flex-center no-wrap " + r.value }, ce);
    }
    function et() {
      const ae = h.value[y.value];
      return f("div", { class: "q-time__content col relative-position" }, [f(Pt, { name: "q-transition--scale" }, () => f("div", {
        key: "clock" + y.value,
        class: "q-time__container-parent absolute-full"
      }, [f("div", {
        ref: m,
        class: "q-time__container-child fit overflow-hidden"
      }, [aa(f("div", {
        class: "q-time__clock cursor-pointer non-selectable",
        onClick: we,
        onMousedown: Ie
      }, [f("div", { class: "q-time__clock-circle fit" }, [f("div", {
        class: "q-time__clock-pointer" + (h.value[y.value] === null ? " hidden" : e.color !== void 0 ? ` text-${e.color}` : ""),
        style: K.value
      }), Q.value.map((ce) => f("div", { class: `q-time__clock-position row flex-center q-time__clock-pos-${ce.index}` + (ce.val === ae ? " q-time__clock-position--active " + r.value : ce.disable === !0 ? " q-time__clock-position--disable" : "") }, [f("span", ce.label)]))])]), j.value)])])), e.nowBtn === !0 ? f(ft, {
        class: "q-time__now-button absolute",
        icon: l.iconSet.datetime.now,
        unelevated: !0,
        size: "sm",
        round: !0,
        color: e.color,
        textColor: e.textColor,
        tabindex: i.value,
        onClick: N
      }) : null]);
    }
    return n.proxy.setNow = N, () => {
      const ae = [et()], ce = De(t.default);
      return ce !== void 0 && ae.push(f("div", { class: "q-time__actions" }, ce)), e.name !== void 0 && e.disable !== !0 && d(ae, "push"), f("div", {
        class: x.value,
        tabindex: -1
      }, [Qe(), f("div", { class: "q-time__main col overflow-auto" }, ae)]);
    };
  }
}), Ym = re({
  name: "QTimeline",
  props: {
    ...it,
    color: {
      type: String,
      default: "primary"
    },
    side: {
      type: String,
      default: "right",
      validator: (e) => ["left", "right"].includes(e)
    },
    layout: {
      type: String,
      default: "dense",
      validator: (e) => [
        "dense",
        "comfortable",
        "loose"
      ].includes(e)
    }
  },
  setup(e, { slots: t }) {
    const a = rt(e, ye().proxy.$q);
    Va(os, e);
    const n = s(() => `q-timeline q-timeline--${e.layout} q-timeline--${e.layout}--${e.side}` + (a.value === !0 ? " q-timeline--dark" : ""));
    return () => f("ul", { class: n.value }, De(t.default));
  }
}), Xm = re({
  name: "QTimelineEntry",
  props: {
    heading: Boolean,
    tag: {
      type: String,
      default: "h3"
    },
    side: {
      type: String,
      default: "right",
      validator: (e) => ["left", "right"].includes(e)
    },
    icon: String,
    avatar: String,
    color: String,
    title: String,
    subtitle: String,
    body: String
  },
  setup(e, { slots: t }) {
    const a = Yt(os, vt);
    if (a === vt)
      return console.error("QTimelineEntry needs to be child of QTimeline"), vt;
    const n = s(() => `q-timeline__entry q-timeline__entry--${e.side}` + (e.icon !== void 0 || e.avatar !== void 0 ? " q-timeline__entry--icon" : "")), l = s(() => `q-timeline__dot text-${e.color || a.color}`), o = s(() => a.layout === "comfortable" && a.side === "left");
    return () => {
      const i = Xn(t.default, []);
      if (e.body !== void 0 && i.unshift(e.body), e.heading === !0) {
        const c = [
          f("div"),
          f("div"),
          f(e.tag, { class: "q-timeline__heading-title" }, i)
        ];
        return f("div", { class: "q-timeline__heading" }, o.value === !0 ? c.reverse() : c);
      }
      let r;
      e.icon !== void 0 ? r = [f(st, {
        class: "row items-center justify-center",
        name: e.icon
      })] : e.avatar !== void 0 && (r = [f("img", {
        class: "q-timeline__dot-img",
        src: e.avatar
      })]);
      const u = [
        f("div", { class: "q-timeline__subtitle" }, [f("span", {}, De(t.subtitle, [e.subtitle]))]),
        f("div", { class: l.value }, r),
        f("div", { class: "q-timeline__content" }, [f("h6", { class: "q-timeline__title" }, De(t.title, [e.title]))].concat(i))
      ];
      return f("li", { class: n.value }, o.value === !0 ? u.reverse() : u);
    };
  }
});
re({
  name: "QToolbar",
  props: { inset: Boolean },
  setup(e, { slots: t }) {
    const a = s(() => "q-toolbar row no-wrap items-center" + (e.inset === !0 ? " q-toolbar--inset" : ""));
    return () => f("div", {
      class: a.value,
      role: "toolbar"
    }, De(t.default));
  }
});
re({
  name: "QToolbarTitle",
  props: { shrink: Boolean },
  setup(e, { slots: t }) {
    const a = s(() => "q-toolbar__title ellipsis" + (e.shrink === !0 ? " col-shrink" : ""));
    return () => f("div", { class: a.value }, De(t.default));
  }
});
const Gm = [
  "none",
  "strict",
  "leaf",
  "leaf-filtered"
];
re({
  name: "QTree",
  props: {
    ...it,
    nodes: {
      type: Array,
      required: !0
    },
    nodeKey: {
      type: String,
      required: !0
    },
    labelKey: {
      type: String,
      default: "label"
    },
    childrenKey: {
      type: String,
      default: "children"
    },
    dense: Boolean,
    color: String,
    controlColor: String,
    textColor: String,
    selectedColor: String,
    icon: String,
    tickStrategy: {
      type: String,
      default: "none",
      validator: (e) => Gm.includes(e)
    },
    ticked: Array,
    expanded: Array,
    selected: {},
    noSelectionUnset: Boolean,
    defaultExpandAll: Boolean,
    accordion: Boolean,
    filter: String,
    filterMethod: Function,
    duration: {},
    noConnectors: Boolean,
    noTransition: Boolean,
    noNodesLabel: String,
    noResultsLabel: String
  },
  emits: [
    "update:expanded",
    "update:ticked",
    "update:selected",
    "lazyLoad",
    "afterShow",
    "afterHide"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = ye(), { $q: l } = n, o = rt(e, l), i = z({}), r = z(e.ticked || []), u = z(e.expanded || []);
    let c = {};
    Yn(() => {
      c = {};
    });
    const d = s(() => `q-tree q-tree--${e.dense === !0 ? "dense" : "standard"}` + (e.noConnectors === !0 ? " q-tree--no-connectors" : "") + (o.value === !0 ? " q-tree--dark" : "") + (e.color !== void 0 ? ` text-${e.color}` : "")), v = s(() => e.selected !== void 0), b = s(() => e.icon || l.iconSet.tree.icon), m = s(() => e.controlColor || e.color), g = s(() => e.textColor !== void 0 ? ` text-${e.textColor}` : ""), p = s(() => {
      const B = e.selectedColor || e.color;
      return B ? ` text-${B}` : "";
    }), k = s(() => e.filterMethod !== void 0 ? e.filterMethod : (B, G) => {
      const V = G.toLowerCase();
      return B[e.labelKey] && B[e.labelKey].toLowerCase().indexOf(V) !== -1;
    }), C = s(() => {
      const B = {}, G = (V, oe) => {
        const P = V.tickStrategy || (oe ? oe.tickStrategy : e.tickStrategy), I = V[e.nodeKey], de = V[e.childrenKey] && Array.isArray(V[e.childrenKey]) && V[e.childrenKey].length !== 0, Y = V.disabled !== !0 && v.value === !0 && V.selectable !== !1, fe = V.disabled !== !0 && V.expandable !== !1, W = P !== "none", be = P === "strict", _e = P === "leaf-filtered", we = P === "leaf" || P === "leaf-filtered";
        let Ie = V.disabled !== !0 && V.tickable !== !1;
        we === !0 && Ie === !0 && oe && oe.tickable !== !0 && (Ie = !1);
        let Ce = V.lazy;
        Ce === !0 && i.value[I] !== void 0 && Array.isArray(V[e.childrenKey]) === !0 && (Ce = i.value[I]);
        const Me = {
          key: I,
          parent: oe,
          isParent: de,
          lazy: Ce,
          disabled: V.disabled,
          link: V.disabled !== !0 && (Y === !0 || fe === !0 && (de === !0 || Ce === !0)),
          children: [],
          matchesFilter: e.filter ? k.value(V, e.filter) : !0,
          selected: I === e.selected && Y === !0,
          selectable: Y,
          expanded: de === !0 ? u.value.includes(I) : !1,
          expandable: fe,
          noTick: V.noTick === !0 || be !== !0 && Ce && Ce !== "loaded",
          tickable: Ie,
          tickStrategy: P,
          hasTicking: W,
          strictTicking: be,
          leafFilteredTicking: _e,
          leafTicking: we,
          ticked: be === !0 ? r.value.includes(I) : de === !0 ? !1 : r.value.includes(I)
        };
        if (B[I] = Me, de === !0 && (Me.children = V[e.childrenKey].map((Le) => G(Le, Me)), e.filter && (Me.matchesFilter !== !0 ? Me.matchesFilter = Me.children.some((Le) => Le.matchesFilter) : Me.noTick !== !0 && Me.disabled !== !0 && Me.tickable === !0 && _e === !0 && Me.children.every((Le) => Le.matchesFilter !== !0 || Le.noTick === !0 || Le.tickable !== !0) === !0 && (Me.tickable = !1)), Me.matchesFilter === !0 && (Me.noTick !== !0 && be !== !0 && Me.children.every((Le) => Le.noTick) === !0 && (Me.noTick = !0), we))) {
          if (Me.ticked = !1, Me.indeterminate = Me.children.some((Le) => Le.indeterminate === !0), Me.tickable = Me.tickable === !0 && Me.children.some((Le) => Le.tickable), Me.indeterminate !== !0) {
            const Le = Me.children.reduce((ot, We) => We.ticked === !0 ? ot + 1 : ot, 0);
            Le === Me.children.length ? Me.ticked = !0 : Le > 0 && (Me.indeterminate = !0);
          }
          Me.indeterminate === !0 && (Me.indeterminateNextState = Me.children.every((Le) => Le.tickable !== !0 || Le.ticked !== !0));
        }
        return Me;
      };
      return e.nodes.forEach((V) => G(V, null)), B;
    });
    se(() => e.ticked, (B) => {
      r.value = B;
    }), se(() => e.expanded, (B) => {
      u.value = B;
    });
    function y(B) {
      const G = [].reduce, V = (oe, P) => {
        if (oe || !P) return oe;
        if (Array.isArray(P) === !0) return G.call(Object(P), V, oe);
        if (P[e.nodeKey] === B) return P;
        if (P[e.childrenKey]) return V(null, P[e.childrenKey]);
      };
      return V(null, e.nodes);
    }
    function h() {
      return r.value.map((B) => y(B));
    }
    function w() {
      return u.value.map((B) => y(B));
    }
    function x(B) {
      return B && C.value[B] ? C.value[B].expanded : !1;
    }
    function L() {
      e.expanded !== void 0 ? a("update:expanded", []) : u.value = [];
    }
    function M() {
      const B = [], G = (V) => {
        V[e.childrenKey] && V[e.childrenKey].length !== 0 && V.expandable !== !1 && V.disabled !== !0 && (B.push(V[e.nodeKey]), V[e.childrenKey].forEach(G));
      };
      e.nodes.forEach(G), e.expanded !== void 0 ? a("update:expanded", B) : u.value = B;
    }
    function K(B, G, V = y(B), oe = C.value[B]) {
      if (oe.lazy && oe.lazy !== "loaded") {
        if (oe.lazy === "loading") return;
        i.value[B] = "loading", Array.isArray(V[e.childrenKey]) !== !0 && (V[e.childrenKey] = []), a("lazyLoad", {
          node: V,
          key: B,
          done: (P) => {
            i.value[B] = "loaded", V[e.childrenKey] = Array.isArray(P) === !0 ? P : [], nt(() => {
              var I;
              ((I = C.value[B]) == null ? void 0 : I.isParent) === !0 && X(B, !0);
            });
          },
          fail: () => {
            delete i.value[B], V[e.childrenKey].length === 0 && delete V[e.childrenKey];
          }
        });
      } else oe.isParent === !0 && oe.expandable === !0 && X(B, G);
    }
    function X(B, G) {
      let V = u.value;
      const oe = e.expanded !== void 0;
      if (oe === !0 && (V = V.slice()), G) {
        if (e.accordion && C.value[B]) {
          const P = [];
          C.value[B].parent ? C.value[B].parent.children.forEach((I) => {
            I.key !== B && I.expandable === !0 && P.push(I.key);
          }) : e.nodes.forEach((I) => {
            const de = I[e.nodeKey];
            de !== B && P.push(de);
          }), P.length !== 0 && (V = V.filter((I) => P.includes(I) === !1));
        }
        V = V.concat([B]).filter((P, I, de) => de.indexOf(P) === I);
      } else V = V.filter((P) => P !== B);
      oe === !0 ? a("update:expanded", V) : u.value = V;
    }
    function A(B) {
      return B && C.value[B] ? C.value[B].ticked : !1;
    }
    function $(B, G) {
      let V = r.value;
      const oe = e.ticked !== void 0;
      oe === !0 && (V = V.slice()), G ? V = V.concat(B).filter((P, I, de) => de.indexOf(P) === I) : V = V.filter((P) => B.includes(P) === !1), oe === !0 && a("update:ticked", V);
    }
    function D(B, G, V) {
      const oe = {
        tree: n,
        node: B,
        key: V,
        color: e.color,
        dark: o.value
      };
      return Rt(oe, "expanded", () => G.expanded, (P) => {
        P !== G.expanded && K(V, P);
      }), Rt(oe, "ticked", () => G.ticked, (P) => {
        P !== G.ticked && $([V], P);
      }), oe;
    }
    function _(B) {
      return (e.filter ? B.filter((G) => C.value[G[e.nodeKey]].matchesFilter) : B).map((G) => E(G));
    }
    function S(B) {
      if (B.icon !== void 0) return f(st, {
        class: "q-tree__icon q-mr-sm",
        name: B.icon,
        color: B.iconColor
      });
      const G = B.img || B.avatar;
      if (G) return f("img", {
        class: `q-tree__${B.img ? "img" : "avatar"} q-mr-sm`,
        src: G
      });
    }
    function T() {
      a("afterShow");
    }
    function H() {
      a("afterHide");
    }
    function E(B) {
      const G = B[e.nodeKey], V = C.value[G], oe = B.header && t[`header-${B.header}`] || t["default-header"], P = V.isParent === !0 ? _(B[e.childrenKey]) : [], I = P.length !== 0 || V.lazy && V.lazy !== "loaded";
      let de = B.body && t[`body-${B.body}`] || t["default-body"];
      const Y = oe !== void 0 || de !== void 0 ? D(B, V, G) : null;
      return de !== void 0 && (de = f("div", { class: "q-tree__node-body relative-position" }, [f("div", { class: g.value }, [de(Y)])])), f("div", {
        key: G,
        class: `q-tree__node relative-position q-tree__node--${I === !0 ? "parent" : "child"}`
      }, [f("div", {
        class: "q-tree__node-header relative-position row no-wrap items-center" + (V.link === !0 ? " q-tree__node--link q-hoverable q-focusable" : "") + (V.selected === !0 ? " q-tree__node--selected" : "") + (V.disabled === !0 ? " q-tree__node--disabled" : ""),
        tabindex: V.link === !0 ? 0 : -1,
        ariaExpanded: P.length > 0 ? V.expanded : null,
        role: "treeitem",
        onClick: (fe) => {
          j(B, V, fe);
        },
        onKeypress(fe) {
          tn(fe) !== !0 && (fe.keyCode === 13 ? j(B, V, fe, !0) : fe.keyCode === 32 && N(B, V, fe, !0));
        }
      }, [
        f("div", {
          class: "q-focus-helper",
          tabindex: -1,
          ref: (fe) => {
            c[V.key] = fe;
          }
        }),
        V.lazy === "loading" ? f(ia, {
          class: "q-tree__spinner",
          color: m.value
        }) : I === !0 ? f(st, {
          class: "q-tree__arrow" + (V.expanded === !0 ? " q-tree__arrow--rotate" : ""),
          name: b.value,
          onClick(fe) {
            N(B, V, fe);
          }
        }) : null,
        V.hasTicking === !0 && V.noTick !== !0 ? f(In, {
          class: "q-tree__tickbox",
          modelValue: V.indeterminate === !0 ? null : V.ticked,
          color: m.value,
          dark: o.value,
          dense: !0,
          keepColor: !0,
          disable: V.tickable !== !0,
          onKeydown: Ye,
          "onUpdate:modelValue": (fe) => {
            Z(V, fe);
          }
        }) : null,
        f("div", { class: "q-tree__node-header-content col row no-wrap items-center" + (V.selected === !0 ? p.value : g.value) }, [oe ? oe(Y) : [S(B), f("div", B[e.labelKey])]])
      ]), I === !0 ? e.noTransition === !0 ? V.expanded === !0 ? f("div", {
        class: "q-tree__node-collapsible" + g.value,
        key: `${G}__q`
      }, [de, f("div", {
        class: "q-tree__children" + (V.disabled === !0 ? " q-tree__node--disabled" : ""),
        role: "group"
      }, P)]) : null : f(Si, {
        duration: e.duration,
        onShow: T,
        onHide: H
      }, () => aa(f("div", {
        class: "q-tree__node-collapsible" + g.value,
        key: `${G}__q`
      }, [de, f("div", {
        class: "q-tree__children" + (V.disabled === !0 ? " q-tree__node--disabled" : ""),
        role: "group"
      }, P)]), [[Wo, V.expanded]])) : de]);
    }
    function Q(B) {
      var G;
      (G = c[B]) == null || G.focus();
    }
    function j(B, G, V, oe) {
      oe !== !0 && G.selectable !== !1 && Q(G.key), v.value && G.selectable ? e.noSelectionUnset === !1 ? a("update:selected", G.key !== e.selected ? G.key : null) : G.key !== e.selected && a("update:selected", G.key === void 0 ? null : G.key) : N(B, G, V, oe), typeof B.handler == "function" && B.handler(B);
    }
    function N(B, G, V, oe) {
      V !== void 0 && Ye(V), oe !== !0 && G.selectable !== !1 && Q(G.key), K(G.key, !G.expanded, B, G);
    }
    function Z(B, G) {
      if (B.indeterminate === !0 && (G = B.indeterminateNextState), B.strictTicking) $([B.key], G);
      else if (B.leafTicking) {
        const V = [], oe = (P) => {
          P.isParent ? (G !== !0 && P.noTick !== !0 && P.tickable === !0 && V.push(P.key), P.leafTicking === !0 && P.children.forEach(oe)) : P.noTick !== !0 && P.tickable === !0 && (P.leafFilteredTicking !== !0 || P.matchesFilter === !0) && V.push(P.key);
        };
        oe(B), $(V, G);
      }
    }
    return e.defaultExpandAll === !0 && M(), Object.assign(n, {
      getNodeByKey: y,
      getTickedNodes: h,
      getExpandedNodes: w,
      isExpanded: x,
      collapseAll: L,
      expandAll: M,
      setExpanded: K,
      isTicked: A,
      setTicked: $
    }), () => {
      const B = _(e.nodes);
      return f("div", {
        class: d.value,
        role: "tree"
      }, B.length === 0 ? e.filter ? e.noResultsLabel || l.lang.tree.noResults : e.noNodesLabel || l.lang.tree.noNodes : B);
    };
  }
});
function Vr(e) {
  return (e * 100).toFixed(2) + "%";
}
const Zm = {
  ...it,
  ...xu,
  label: String,
  color: String,
  textColor: String,
  square: Boolean,
  flat: Boolean,
  bordered: Boolean,
  noThumbnails: Boolean,
  thumbnailFit: {
    type: String,
    default: "cover"
  },
  autoUpload: Boolean,
  hideUploadBtn: Boolean,
  disable: Boolean,
  readonly: Boolean
}, Uu = [
  ..._u,
  "start",
  "finish",
  "added",
  "removed"
];
function Jm(e, t) {
  const a = ye(), { props: n, slots: l, emit: o, proxy: i } = a, { $q: r } = i, u = rt(n, r);
  function c(Y, fe, W) {
    if (Y.__status = fe, fe === "idle") {
      Y.__uploaded = 0, Y.__progress = 0, Y.__sizeLabel = Do(Y.size), Y.__progressLabel = "0.00%";
      return;
    }
    if (fe === "failed") {
      i.$forceUpdate();
      return;
    }
    Y.__uploaded = fe === "uploaded" ? Y.size : W, Y.__progress = fe === "uploaded" ? 1 : Math.min(0.9999, Y.__uploaded / Y.size), Y.__progressLabel = Vr(Y.__progress), i.$forceUpdate();
  }
  const d = s(() => n.disable !== !0 && n.readonly !== !0), v = z(!1), b = z(null), m = z(null), g = {
    files: z([]),
    queuedFiles: z([]),
    uploadedFiles: z([]),
    uploadedSize: z(0),
    updateFileStatus: c,
    isAlive: () => Da(a) === !1
  }, { pickFiles: p, addFiles: k, onDragover: C, onDragleave: y, processFiles: h, getDndNode: w, maxFilesNumber: x, maxTotalSizeNumber: L } = $u({
    editable: d,
    dnd: v,
    getFileInput: Z,
    addFilesToQueue: B
  });
  Object.assign(g, e({
    props: n,
    slots: l,
    emit: o,
    helpers: g,
    exposeApi: (Y) => {
      Object.assign(g, Y);
    }
  })), g.isBusy === void 0 && (g.isBusy = z(!1));
  const M = z(0), K = s(() => M.value === 0 ? 0 : g.uploadedSize.value / M.value), X = s(() => Vr(K.value)), A = s(() => Do(M.value)), $ = s(() => d.value === !0 && g.isUploading.value !== !0 && (n.multiple === !0 || g.queuedFiles.value.length === 0) && (n.maxFiles === void 0 || g.files.value.length < x.value) && (n.maxTotalSize === void 0 || M.value < L.value)), D = s(() => d.value === !0 && g.isBusy.value !== !0 && g.isUploading.value !== !0 && g.queuedFiles.value.length !== 0);
  Va(ds, oe);
  const _ = s(() => "q-uploader column no-wrap" + (u.value === !0 ? " q-uploader--dark q-dark" : "") + (n.bordered === !0 ? " q-uploader--bordered" : "") + (n.square === !0 ? " q-uploader--square no-border-radius" : "") + (n.flat === !0 ? " q-uploader--flat no-shadow" : "") + (n.disable === !0 ? " disabled q-uploader--disable" : "") + (v.value === !0 ? " q-uploader--dnd" : "")), S = s(() => "q-uploader__header" + (n.color !== void 0 ? ` bg-${n.color}` : "") + (n.textColor !== void 0 ? ` text-${n.textColor}` : ""));
  se(g.isUploading, (Y, fe) => {
    fe === !1 && Y === !0 ? o("start") : fe === !0 && Y === !1 && o("finish");
  });
  function T() {
    n.disable === !1 && (g.abort(), g.uploadedSize.value = 0, M.value = 0, N(), g.files.value = [], g.queuedFiles.value = [], g.uploadedFiles.value = []);
  }
  function H() {
    n.disable === !1 && Q(["uploaded"], () => {
      g.uploadedFiles.value = [];
    });
  }
  function E() {
    Q(["idle", "failed"], ({ size: Y }) => {
      M.value -= Y, g.queuedFiles.value = [];
    });
  }
  function Q(Y, fe) {
    if (n.disable === !0) return;
    const W = {
      files: [],
      size: 0
    }, be = g.files.value.filter((_e) => Y.indexOf(_e.__status) === -1 ? !0 : (W.size += _e.size, W.files.push(_e), _e.__img !== void 0 && window.URL.revokeObjectURL(_e.__img.src), !1));
    W.files.length !== 0 && (g.files.value = be, fe(W), o("removed", W.files));
  }
  function j(Y) {
    n.disable || (Y.__status === "uploaded" ? g.uploadedFiles.value = g.uploadedFiles.value.filter((fe) => fe.__key !== Y.__key) : Y.__status === "uploading" ? Y.__abort() : M.value -= Y.size, g.files.value = g.files.value.filter((fe) => fe.__key !== Y.__key ? !0 : (fe.__img !== void 0 && window.URL.revokeObjectURL(fe.__img.src), !1)), g.queuedFiles.value = g.queuedFiles.value.filter((fe) => fe.__key !== Y.__key), o("removed", [Y]));
  }
  function N() {
    g.files.value.forEach((Y) => {
      Y.__img !== void 0 && window.URL.revokeObjectURL(Y.__img.src);
    });
  }
  function Z() {
    return m.value || b.value.getElementsByClassName("q-uploader__input")[0];
  }
  function B(Y, fe) {
    const W = h(Y, fe, g.files.value, !0), be = Z();
    be != null && (be.value = ""), W !== void 0 && (W.forEach((_e) => {
      if (g.updateFileStatus(_e, "idle"), M.value += _e.size, n.noThumbnails !== !0 && _e.type.toUpperCase().startsWith("IMAGE")) {
        const we = new Image();
        we.src = window.URL.createObjectURL(_e), _e.__img = we;
      }
    }), g.files.value = g.files.value.concat(W), g.queuedFiles.value = g.queuedFiles.value.concat(W), o("added", W), n.autoUpload === !0 && g.upload());
  }
  function G() {
    D.value === !0 && g.upload();
  }
  function V(Y, fe, W) {
    if (Y === !0) {
      const be = {
        type: "a",
        key: fe,
        icon: r.iconSet.uploader[fe],
        flat: !0,
        dense: !0
      };
      let _e;
      return fe === "add" ? (be.onClick = p, _e = oe) : be.onClick = W, f(ft, be, _e);
    }
  }
  function oe() {
    return f("input", {
      ref: m,
      class: "q-uploader__input overflow-hidden absolute-full",
      tabindex: -1,
      type: "file",
      title: "",
      accept: n.accept,
      multiple: n.multiple === !0 ? "multiple" : void 0,
      capture: n.capture,
      onMousedown: wt,
      onClick: p,
      onChange: B
    });
  }
  function P() {
    return l.header !== void 0 ? l.header(de) : [f("div", { class: "q-uploader__header-content column" }, [f("div", { class: "flex flex-center no-wrap q-gutter-xs" }, [
      V(g.queuedFiles.value.length !== 0, "removeQueue", E),
      V(g.uploadedFiles.value.length !== 0, "removeUploaded", H),
      g.isUploading.value === !0 ? f(ia, { class: "q-uploader__spinner" }) : null,
      f("div", { class: "col column justify-center" }, [n.label !== void 0 ? f("div", { class: "q-uploader__title" }, [n.label]) : null, f("div", { class: "q-uploader__subtitle" }, [A.value + " / " + X.value])]),
      V($.value, "add"),
      V(n.hideUploadBtn === !1 && D.value === !0, "upload", g.upload),
      V(g.isUploading.value, "clear", g.abort)
    ])])];
  }
  function I() {
    return l.list !== void 0 ? l.list(de) : g.files.value.map((Y) => f("div", {
      key: Y.__key,
      class: "q-uploader__file relative-position" + (n.noThumbnails !== !0 && Y.__img !== void 0 ? " q-uploader__file--img" : "") + (Y.__status === "failed" ? " q-uploader__file--failed" : Y.__status === "uploaded" ? " q-uploader__file--uploaded" : ""),
      style: n.noThumbnails !== !0 && Y.__img !== void 0 ? {
        backgroundImage: 'url("' + Y.__img.src + '")',
        backgroundSize: n.thumbnailFit
      } : null
    }, [f("div", { class: "q-uploader__file-header row flex-center no-wrap" }, [
      Y.__status === "failed" ? f(st, {
        class: "q-uploader__file-status",
        name: r.iconSet.type.negative,
        color: "negative"
      }) : null,
      f("div", { class: "q-uploader__file-header-content col" }, [f("div", { class: "q-uploader__title" }, [Y.name]), f("div", { class: "q-uploader__subtitle row items-center no-wrap" }, [Y.__sizeLabel + " / " + Y.__progressLabel])]),
      Y.__status === "uploading" ? f(yi, {
        value: Y.__progress,
        min: 0,
        max: 1,
        indeterminate: Y.__progress === 0
      }) : f(ft, {
        round: !0,
        dense: !0,
        flat: !0,
        icon: r.iconSet.uploader[Y.__status === "uploaded" ? "done" : "clear"],
        onClick: () => {
          j(Y);
        }
      })
    ])]));
  }
  tt(() => {
    g.isUploading.value === !0 && g.abort(), g.files.value.length !== 0 && N();
  });
  const de = {};
  for (const Y in g) yd(g[Y]) === !0 ? Rt(de, Y, () => g[Y].value) : de[Y] = g[Y];
  return Object.assign(de, {
    upload: G,
    reset: T,
    removeUploadedFiles: H,
    removeQueuedFiles: E,
    removeFile: j,
    pickFiles: p,
    addFiles: k
  }), ns(de, {
    canAddFiles: () => $.value,
    canUpload: () => D.value,
    uploadSizeLabel: () => A.value,
    uploadProgressLabel: () => X.value
  }), t({
    ...g,
    upload: G,
    reset: T,
    removeUploadedFiles: H,
    removeQueuedFiles: E,
    removeFile: j,
    pickFiles: p,
    addFiles: k,
    canAddFiles: $,
    canUpload: D,
    uploadSizeLabel: A,
    uploadProgressLabel: X
  }), () => {
    const Y = [
      f("div", { class: S.value }, P()),
      f("div", { class: "q-uploader__list scroll" }, I()),
      w("uploader")
    ];
    g.isBusy.value === !0 && Y.push(f("div", { class: "q-uploader__overlay absolute-full flex flex-center" }, [f(ia)]));
    const fe = {
      ref: b,
      class: _.value
    };
    return $.value === !0 && Object.assign(fe, {
      onDragover: C,
      onDragleave: y
    }), f("div", fe, Y);
  };
}
const eg = () => !0;
function Ku(e) {
  const t = {};
  return e.forEach((a) => {
    t[a] = eg;
  }), t;
}
const tg = Ku(Uu);
var ag = ({ name: e, props: t, emits: a, injectPlugin: n }) => re({
  name: e,
  props: {
    ...Zm,
    ...t
  },
  emits: Qt(a) === !0 ? {
    ...tg,
    ...a
  } : [...Uu, ...a],
  setup(l, { expose: o }) {
    return Jm(n, o);
  }
});
function ba(e) {
  return typeof e == "function" ? e : () => e;
}
const ng = "QUploader", lg = {
  url: [Function, String],
  method: {
    type: [Function, String],
    default: "POST"
  },
  fieldName: {
    type: [Function, String],
    default: () => (e) => e.name
  },
  headers: [Function, Array],
  formFields: [Function, Array],
  withCredentials: [Function, Boolean],
  sendRaw: [Function, Boolean],
  batch: [Function, Boolean],
  factory: Function
}, og = [
  "factoryFailed",
  "uploaded",
  "failed",
  "uploading"
];
function ig({ props: e, emit: t, helpers: a }) {
  const n = z([]), l = z([]), o = z(0), i = s(() => ({
    url: ba(e.url),
    method: ba(e.method),
    headers: ba(e.headers),
    formFields: ba(e.formFields),
    fieldName: ba(e.fieldName),
    withCredentials: ba(e.withCredentials),
    sendRaw: ba(e.sendRaw),
    batch: ba(e.batch)
  })), r = s(() => o.value > 0), u = s(() => l.value.length !== 0);
  let c;
  function d() {
    n.value.forEach((g) => {
      g.abort();
    }), l.value.length !== 0 && (c = !0);
  }
  function v() {
    const g = a.queuedFiles.value.slice(0);
    a.queuedFiles.value = [], i.value.batch(g) ? b(g) : g.forEach((p) => {
      b([p]);
    });
  }
  function b(g) {
    if (o.value++, typeof e.factory != "function") {
      m(g, {});
      return;
    }
    const p = e.factory(g);
    if (!p)
      t("factoryFailed", /* @__PURE__ */ new Error("QUploader: factory() does not return properly"), g), o.value--;
    else if (typeof p.catch == "function" && typeof p.then == "function") {
      l.value.push(p);
      const k = (C) => {
        a.isAlive() === !0 && (l.value = l.value.filter((y) => y !== p), l.value.length === 0 && (c = !1), a.queuedFiles.value = a.queuedFiles.value.concat(g), g.forEach((y) => {
          a.updateFileStatus(y, "failed");
        }), t("factoryFailed", C, g), o.value--);
      };
      p.then((C) => {
        c === !0 ? k(/* @__PURE__ */ new Error("Aborted")) : a.isAlive() === !0 && (l.value = l.value.filter((y) => y !== p), m(g, C));
      }).catch(k);
    } else m(g, p || {});
  }
  function m(g, p) {
    const k = new FormData(), C = new XMLHttpRequest(), y = (D, _) => p[D] !== void 0 ? ba(p[D])(_) : i.value[D](_), h = y("url", g);
    if (!h) {
      console.error("q-uploader: invalid or no URL specified"), o.value--;
      return;
    }
    const w = y("formFields", g);
    w !== void 0 && w.forEach((D) => {
      k.append(D.name, D.value);
    });
    let x = 0, L = 0, M = 0, K = 0, X;
    C.upload.addEventListener("progress", (D) => {
      if (X === !0) return;
      const _ = Math.min(K, D.loaded);
      a.uploadedSize.value += _ - M, M = _;
      let S = M - L;
      for (let T = x; S > 0 && T < g.length; T++) {
        const H = g[T];
        if (S > H.size)
          S -= H.size, x++, L += H.size, a.updateFileStatus(H, "uploading", H.size);
        else {
          a.updateFileStatus(H, "uploading", S);
          return;
        }
      }
    }, !1), C.onreadystatechange = () => {
      C.readyState < 4 || (C.status && C.status < 400 ? (a.uploadedFiles.value = a.uploadedFiles.value.concat(g), g.forEach((D) => {
        a.updateFileStatus(D, "uploaded");
      }), t("uploaded", {
        files: g,
        xhr: C
      })) : (X = !0, a.uploadedSize.value -= M, a.queuedFiles.value = a.queuedFiles.value.concat(g), g.forEach((D) => {
        a.updateFileStatus(D, "failed");
      }), t("failed", {
        files: g,
        xhr: C
      })), o.value--, n.value = n.value.filter((D) => D !== C));
    }, C.open(y("method", g), h), y("withCredentials", g) === !0 && (C.withCredentials = !0);
    const A = y("headers", g);
    A !== void 0 && A.forEach((D) => {
      C.setRequestHeader(D.name, D.value);
    });
    const $ = y("sendRaw", g);
    g.forEach((D) => {
      a.updateFileStatus(D, "uploading", 0), $ !== !0 && k.append(y("fieldName", D), D, D.name), D.xhr = C, D.__abort = () => {
        C.abort();
      }, K += D.size;
    }), t("uploading", {
      files: g,
      xhr: C
    }), n.value.push(C), $ === !0 ? C.send(new Blob(g)) : C.send(k);
  }
  return {
    isUploading: r,
    isBusy: u,
    abort: d,
    upload: v
  };
}
var rg = ag({
  name: ng,
  props: lg,
  emits: og,
  injectPlugin: ig
});
re({
  name: "QUploaderAddTrigger",
  setup() {
    const e = Yt(ds, vt);
    return e === vt && console.error("QUploaderAddTrigger needs to be child of QUploader"), e;
  }
});
var sg = re({
  name: "QVideo",
  props: {
    ...wi,
    src: {
      type: String,
      required: !0
    },
    title: String,
    fetchpriority: {
      type: String,
      default: "auto"
    },
    loading: {
      type: String,
      default: "eager"
    },
    referrerpolicy: {
      type: String,
      default: "strict-origin-when-cross-origin"
    }
  },
  setup(e) {
    const t = xi(e), a = s(() => "q-video" + (e.ratio !== void 0 ? " q-video--responsive" : ""));
    return () => f("div", {
      class: a.value,
      style: t.value
    }, [f("iframe", {
      src: e.src,
      title: e.title,
      fetchpriority: e.fetchpriority,
      loading: e.loading,
      referrerpolicy: e.referrerpolicy,
      frameborder: "0",
      allowfullscreen: !0
    })]);
  }
});
function Pr(e) {
  if (e === !1) return 0;
  if (e === !0 || e === void 0) return 1;
  const t = parseInt(e, 10);
  return isNaN(t) ? 0 : t;
}
ca({
  name: "close-popup",
  beforeMount(e, { value: t }) {
    const a = {
      depth: Pr(t),
      handler(n) {
        a.depth !== 0 && setTimeout(() => {
          const l = Pc(e);
          l !== void 0 && Rc(l, n, a.depth);
        });
      },
      handlerKey(n) {
        la(n, 13) === !0 && a.handler(n);
      }
    };
    e.__qclosepopup = a, e.addEventListener("click", a.handler), e.addEventListener("keyup", a.handlerKey);
  },
  updated(e, { value: t, oldValue: a }) {
    t !== a && (e.__qclosepopup.depth = Pr(t));
  },
  beforeUnmount(e) {
    const t = e.__qclosepopup;
    e.removeEventListener("click", t.handler), e.removeEventListener("keyup", t.handlerKey), delete e.__qclosepopup;
  }
});
let ug = 0, Vn;
function Rr(e, t) {
  Vn === void 0 && (Vn = document.createElement("div"), Vn.style.cssText = "position: absolute; left: 0; top: 0", document.body.appendChild(Vn));
  const a = e.getBoundingClientRect(), n = Vn.getBoundingClientRect(), { marginLeft: l, marginRight: o, marginTop: i, marginBottom: r } = window.getComputedStyle(e), u = parseInt(l, 10) + parseInt(o, 10), c = parseInt(i, 10) + parseInt(r, 10);
  return {
    left: a.left - n.left,
    top: a.top - n.top,
    width: a.right - a.left,
    height: a.bottom - a.top,
    widthM: a.right - a.left + (t === !0 ? 0 : u),
    heightM: a.bottom - a.top + (t === !0 ? 0 : c),
    marginH: t === !0 ? u : 0,
    marginV: t === !0 ? c : 0
  };
}
function fl(e) {
  return {
    width: e.scrollWidth,
    height: e.scrollHeight
  };
}
const Fr = [
  "Top",
  "Right",
  "Bottom",
  "Left"
], Er = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
], dg = /-block|-inline|block-|inline-/, cg = /(-block|-inline|block-|inline-).*:/;
function Ir(e, t) {
  const a = window.getComputedStyle(e), n = {};
  for (let l = 0; l < t.length; l++) {
    const o = t[l];
    if (a[o] === "") if (o === "cssText") {
      const i = a.length;
      let r = "";
      for (let u = 0; u < i; u++) dg.test(a[u]) !== !0 && (r += a[u] + ": " + a[a[u]] + "; ");
      n[o] = r;
    } else if ([
      "borderWidth",
      "borderStyle",
      "borderColor"
    ].indexOf(o) !== -1) {
      const i = o.replace("border", "");
      let r = "";
      for (let u = 0; u < Fr.length; u++) {
        const c = "border" + Fr[u] + i;
        r += a[c] + " ";
      }
      n[o] = r;
    } else if (o === "borderRadius") {
      let i = "", r = "";
      for (let u = 0; u < Er.length; u++) {
        const c = a[Er[u]].split(" ");
        i += c[0] + " ", r += (c[1] === void 0 ? c[0] : c[1]) + " ";
      }
      n[o] = i + "/ " + r;
    } else n[o] = a[o];
    else o === "cssText" ? n[o] = a[o].split(";").filter((i) => cg.test(i) !== !0).join(";") : n[o] = a[o];
  }
  return n;
}
const fg = [
  "absolute",
  "fixed",
  "relative",
  "sticky"
];
function Or(e) {
  let t = e, a = 0;
  for (; t !== null && t !== document; ) {
    const { position: n, zIndex: l } = window.getComputedStyle(t), o = Number(l);
    o > a && (t === e || fg.includes(n) === !0) && (a = o), t = t.parentNode;
  }
  return a;
}
function vg(e) {
  return {
    from: e.from,
    to: e.to !== void 0 ? e.to : e.from
  };
}
function mg(e) {
  return typeof e == "number" ? e = { duration: e } : typeof e == "function" && (e = { onEnd: e }), {
    ...e,
    waitFor: e.waitFor === void 0 ? 0 : e.waitFor,
    duration: isNaN(e.duration) === !0 ? 300 : parseInt(e.duration, 10),
    easing: typeof e.easing == "string" && e.easing.length !== 0 ? e.easing : "ease-in-out",
    delay: isNaN(e.delay) === !0 ? 0 : parseInt(e.delay, 10),
    fill: typeof e.fill == "string" && e.fill.length !== 0 ? e.fill : "none",
    resize: e.resize === !0,
    useCSS: e.useCSS === !0 || e.usecss === !0,
    hideFromClone: e.hideFromClone === !0 || e.hidefromclone === !0,
    keepToClone: e.keepToClone === !0 || e.keeptoclone === !0,
    tween: e.tween === !0,
    tweenFromOpacity: isNaN(e.tweenFromOpacity) === !0 ? 0.6 : parseFloat(e.tweenFromOpacity),
    tweenToOpacity: isNaN(e.tweenToOpacity) === !0 ? 0.5 : parseFloat(e.tweenToOpacity)
  };
}
function Hr(e) {
  const t = typeof e;
  return t === "function" ? e() : t === "string" ? document.querySelector(e) : e;
}
function Nr(e) {
  return e && e.ownerDocument === document && e.parentNode !== null;
}
function gg(e) {
  let t = () => !1, a = !1, n = !0;
  const l = vg(e), o = mg(e), i = Hr(l.from);
  if (Nr(i) !== !0) return t;
  typeof i.qMorphCancel == "function" && i.qMorphCancel();
  let r, u, c, d;
  const v = i.parentNode, b = i.nextElementSibling, m = Rr(i, o.resize), { width: g, height: p } = fl(v), { borderWidth: k, borderStyle: C, borderColor: y, borderRadius: h, backgroundColor: w, transform: x, position: L, cssText: M } = Ir(i, [
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "backgroundColor",
    "transform",
    "position",
    "cssText"
  ]), K = i.classList.toString(), X = i.style.cssText, A = i.cloneNode(!0), $ = o.tween === !0 ? i.cloneNode(!0) : void 0;
  $ !== void 0 && ($.className = $.classList.toString().split(" ").filter((_) => /^bg-/.test(_) === !1).join(" ")), o.hideFromClone === !0 && A.classList.add("q-morph--internal"), A.setAttribute("aria-hidden", "true"), A.style.transition = "none", A.style.animation = "none", A.style.pointerEvents = "none", v.insertBefore(A, b), i.qMorphCancel = () => {
    a = !0, A.remove(), $ == null || $.remove(), o.hideFromClone === !0 && A.classList.remove("q-morph--internal"), i.qMorphCancel = void 0;
  };
  const D = () => {
    const _ = Hr(l.to);
    if (a === !0 || Nr(_) !== !0) {
      typeof i.qMorphCancel == "function" && i.qMorphCancel();
      return;
    }
    i !== _ && typeof _.qMorphCancel == "function" && _.qMorphCancel(), o.keepToClone !== !0 && _.classList.add("q-morph--internal"), A.classList.add("q-morph--internal");
    const { width: S, height: T } = fl(v), { width: H, height: E } = fl(_.parentNode);
    o.hideFromClone !== !0 && A.classList.remove("q-morph--internal"), _.qMorphCancel = () => {
      a = !0, A.remove(), $ == null || $.remove(), o.hideFromClone === !0 && A.classList.remove("q-morph--internal"), o.keepToClone !== !0 && _.classList.remove("q-morph--internal"), i.qMorphCancel = void 0, _.qMorphCancel = void 0;
    };
    const Q = () => {
      if (a === !0) {
        typeof _.qMorphCancel == "function" && _.qMorphCancel();
        return;
      }
      o.hideFromClone !== !0 && (A.classList.add("q-morph--internal"), A.innerHTML = "", A.style.left = 0, A.style.right = "unset", A.style.top = 0, A.style.bottom = "unset", A.style.transform = "none"), o.keepToClone !== !0 && _.classList.remove("q-morph--internal");
      const j = _.parentNode, { width: N, height: Z } = fl(j), B = _.cloneNode(o.keepToClone);
      B.setAttribute("aria-hidden", "true"), o.keepToClone !== !0 && (B.style.left = 0, B.style.right = "unset", B.style.top = 0, B.style.bottom = "unset", B.style.transform = "none", B.style.pointerEvents = "none"), B.classList.add("q-morph--internal");
      const G = _ === i && v === j ? A : _.nextElementSibling;
      j.insertBefore(B, G);
      const { borderWidth: V, borderStyle: oe, borderColor: P, borderRadius: I, backgroundColor: de, transform: Y, position: fe, cssText: W } = Ir(_, [
        "borderWidth",
        "borderStyle",
        "borderColor",
        "borderRadius",
        "backgroundColor",
        "transform",
        "position",
        "cssText"
      ]), be = _.classList.toString(), _e = _.style.cssText;
      _.style.cssText = W, _.style.transform = "none", _.style.animation = "none", _.style.transition = "none", _.className = be.split(" ").filter((ke) => /^bg-/.test(ke) === !1).join(" ");
      const we = Rr(_, o.resize), Ie = m.left - we.left, Ce = m.top - we.top, Me = m.width / (we.width > 0 ? we.width : 10), Le = m.height / (we.height > 0 ? we.height : 100), ot = g - S, We = p - T, ue = N - H, ie = Z - E, ge = Math.max(m.widthM, ot), Pe = Math.max(m.heightM, We), Ge = Math.max(we.widthM, ue), Ke = Math.max(we.heightM, ie), je = i === _ && ["absolute", "fixed"].includes(fe) === !1 && ["absolute", "fixed"].includes(L) === !1;
      let Qe = fe === "fixed", et = j;
      for (; Qe !== !0 && et !== document; )
        Qe = window.getComputedStyle(et).position === "fixed", et = et.parentNode;
      if (o.hideFromClone !== !0 && (A.style.display = "block", A.style.flex = "0 0 auto", A.style.opacity = 0, A.style.minWidth = "unset", A.style.maxWidth = "unset", A.style.minHeight = "unset", A.style.maxHeight = "unset", A.classList.remove("q-morph--internal")), o.keepToClone !== !0 && (B.style.display = "block", B.style.flex = "0 0 auto", B.style.opacity = 0, B.style.minWidth = "unset", B.style.maxWidth = "unset", B.style.minHeight = "unset", B.style.maxHeight = "unset"), B.classList.remove("q-morph--internal"), typeof o.classes == "string" && (_.className += " " + o.classes), typeof o.style == "string") _.style.cssText += " " + o.style;
      else if (Qt(o.style) === !0) for (const ke in o.style) _.style[ke] = o.style[ke];
      const ae = Or(A), ce = Or(_), Ve = Qe === !0 ? document.documentElement : {
        scrollLeft: 0,
        scrollTop: 0
      };
      _.style.position = Qe === !0 ? "fixed" : "absolute", _.style.left = `${we.left - Ve.scrollLeft}px`, _.style.right = "unset", _.style.top = `${we.top - Ve.scrollTop}px`, _.style.margin = 0, o.resize === !0 && (_.style.minWidth = "unset", _.style.maxWidth = "unset", _.style.minHeight = "unset", _.style.maxHeight = "unset", _.style.overflow = "hidden", _.style.overflowX = "hidden", _.style.overflowY = "hidden"), document.body.appendChild(_), $ !== void 0 && ($.style.cssText = M, $.style.transform = "none", $.style.animation = "none", $.style.transition = "none", $.style.position = _.style.position, $.style.left = `${m.left - Ve.scrollLeft}px`, $.style.right = "unset", $.style.top = `${m.top - Ve.scrollTop}px`, $.style.margin = 0, $.style.pointerEvents = "none", o.resize === !0 && ($.style.minWidth = "unset", $.style.maxWidth = "unset", $.style.minHeight = "unset", $.style.maxHeight = "unset", $.style.overflow = "hidden", $.style.overflowX = "hidden", $.style.overflowY = "hidden"), document.body.appendChild($));
      const le = (ke) => {
        i === _ && n !== !0 ? (_.style.cssText = X, _.className = K) : (_.style.cssText = _e, _.className = be), B.parentNode === j && j.insertBefore(_, B), A.remove(), B.remove(), $ == null || $.remove(), t = () => !1, i.qMorphCancel = void 0, _.qMorphCancel = void 0, typeof o.onEnd == "function" && o.onEnd(n === !0 ? "to" : "from", ke === !0);
      };
      if (o.useCSS !== !0 && typeof _.animate == "function") {
        const ke = o.resize === !0 ? {
          transform: `translate(${Ie}px, ${Ce}px)`,
          width: `${ge}px`,
          height: `${Pe}px`
        } : { transform: `translate(${Ie}px, ${Ce}px) scale(${Me}, ${Le})` }, Fe = o.resize === !0 ? {
          width: `${Ge}px`,
          height: `${Ke}px`
        } : {}, Te = o.resize === !0 ? {
          width: `${ge}px`,
          height: `${Pe}px`
        } : {}, He = o.resize === !0 ? {
          transform: `translate(${-1 * Ie}px, ${-1 * Ce}px)`,
          width: `${Ge}px`,
          height: `${Ke}px`
        } : { transform: `translate(${-1 * Ie}px, ${-1 * Ce}px) scale(${1 / Me}, ${1 / Le})` }, ut = $ !== void 0 ? { opacity: o.tweenToOpacity } : { backgroundColor: w }, It = $ !== void 0 ? { opacity: 1 } : { backgroundColor: de };
        d = _.animate([{
          margin: 0,
          borderWidth: k,
          borderStyle: C,
          borderColor: y,
          borderRadius: h,
          zIndex: ae,
          transformOrigin: "0 0",
          ...ke,
          ...ut
        }, {
          margin: 0,
          borderWidth: V,
          borderStyle: oe,
          borderColor: P,
          borderRadius: I,
          zIndex: ce,
          transformOrigin: "0 0",
          transform: Y,
          ...Fe,
          ...It
        }], {
          duration: o.duration,
          easing: o.easing,
          fill: o.fill,
          delay: o.delay
        }), u = $ === void 0 ? void 0 : $.animate([{
          opacity: o.tweenFromOpacity,
          margin: 0,
          borderWidth: k,
          borderStyle: C,
          borderColor: y,
          borderRadius: h,
          zIndex: ae,
          transformOrigin: "0 0",
          transform: x,
          ...Te
        }, {
          opacity: 0,
          margin: 0,
          borderWidth: V,
          borderStyle: oe,
          borderColor: P,
          borderRadius: I,
          zIndex: ce,
          transformOrigin: "0 0",
          ...He
        }], {
          duration: o.duration,
          easing: o.easing,
          fill: o.fill,
          delay: o.delay
        }), r = o.hideFromClone === !0 || je === !0 ? void 0 : A.animate([{
          margin: `${We < 0 ? We / 2 : 0}px ${ot < 0 ? ot / 2 : 0}px`,
          width: `${ge + m.marginH}px`,
          height: `${Pe + m.marginV}px`
        }, {
          margin: 0,
          width: 0,
          height: 0
        }], {
          duration: o.duration,
          easing: o.easing,
          fill: o.fill,
          delay: o.delay
        }), c = o.keepToClone === !0 ? void 0 : B.animate([je === !0 ? {
          margin: `${We < 0 ? We / 2 : 0}px ${ot < 0 ? ot / 2 : 0}px`,
          width: `${ge + m.marginH}px`,
          height: `${Pe + m.marginV}px`
        } : {
          margin: 0,
          width: 0,
          height: 0
        }, {
          margin: `${ie < 0 ? ie / 2 : 0}px ${ue < 0 ? ue / 2 : 0}px`,
          width: `${Ge + we.marginH}px`,
          height: `${Ke + we.marginV}px`
        }], {
          duration: o.duration,
          easing: o.easing,
          fill: o.fill,
          delay: o.delay
        });
        const Ct = (Zt) => {
          r == null || r.cancel(), u == null || u.cancel(), c == null || c.cancel(), d.cancel(), d.removeEventListener("finish", Ct), d.removeEventListener("cancel", Ct), le(Zt), r = void 0, u = void 0, c = void 0, d = void 0;
        };
        i.qMorphCancel = () => {
          i.qMorphCancel = void 0, a = !0, Ct();
        }, _.qMorphCancel = () => {
          _.qMorphCancel = void 0, a = !0, Ct();
        }, d.addEventListener("finish", Ct), d.addEventListener("cancel", Ct), t = (Zt) => a === !0 || d === void 0 ? !1 : Zt === !0 ? (Ct(!0), !0) : (n = n !== !0, r == null || r.reverse(), u == null || u.reverse(), c == null || c.reverse(), d.reverse(), !0);
      } else {
        const ke = `q-morph-anim-${++ug}`, Fe = document.createElement("style"), Te = o.resize === !0 ? `
            transform: translate(${Ie}px, ${Ce}px);
            width: ${ge}px;
            height: ${Pe}px;
          ` : `transform: translate(${Ie}px, ${Ce}px) scale(${Me}, ${Le});`, He = o.resize === !0 ? `
            width: ${Ge}px;
            height: ${Ke}px;
          ` : "", ut = o.resize === !0 ? `
            width: ${ge}px;
            height: ${Pe}px;
          ` : "", It = o.resize === !0 ? `
            transform: translate(${-1 * Ie}px, ${-1 * Ce}px);
            width: ${Ge}px;
            height: ${Ke}px;
          ` : `transform: translate(${-1 * Ie}px, ${-1 * Ce}px) scale(${1 / Me}, ${1 / Le});`, Ct = $ !== void 0 ? `opacity: ${o.tweenToOpacity};` : `background-color: ${w};`, Zt = $ !== void 0 ? "opacity: 1;" : `background-color: ${de};`, Xt = $ === void 0 ? "" : `
            @keyframes ${ke}-from-tween {
              0% {
                opacity: ${o.tweenFromOpacity};
                margin: 0;
                border-width: ${k};
                border-style: ${C};
                border-color: ${y};
                border-radius: ${h};
                z-index: ${ae};
                transform-origin: 0 0;
                transform: ${x};
                ${ut}
              }

              100% {
                opacity: 0;
                margin: 0;
                border-width: ${V};
                border-style: ${oe};
                border-color: ${P};
                border-radius: ${I};
                z-index: ${ce};
                transform-origin: 0 0;
                ${It}
              }
            }
          `, ga = o.hideFromClone === !0 || je === !0 ? "" : `
            @keyframes ${ke}-from {
              0% {
                margin: ${We < 0 ? We / 2 : 0}px ${ot < 0 ? ot / 2 : 0}px;
                width: ${ge + m.marginH}px;
                height: ${Pe + m.marginV}px;
              }

              100% {
                margin: 0;
                width: 0;
                height: 0;
              }
            }
          `, fa = je === !0 ? `
            margin: ${We < 0 ? We / 2 : 0}px ${ot < 0 ? ot / 2 : 0}px;
            width: ${ge + m.marginH}px;
            height: ${Pe + m.marginV}px;
          ` : `
            margin: 0;
            width: 0;
            height: 0;
          `;
        Fe.innerHTML = `
          @keyframes ${ke} {
            0% {
              margin: 0;
              border-width: ${k};
              border-style: ${C};
              border-color: ${y};
              border-radius: ${h};
              background-color: ${w};
              z-index: ${ae};
              transform-origin: 0 0;
              ${Te}
              ${Ct}
            }

            100% {
              margin: 0;
              border-width: ${V};
              border-style: ${oe};
              border-color: ${P};
              border-radius: ${I};
              background-color: ${de};
              z-index: ${ce};
              transform-origin: 0 0;
              transform: ${Y};
              ${He}
              ${Zt}
            }
          }

          ${ga}

          ${Xt}

          ${o.keepToClone === !0 ? "" : `
            @keyframes ${ke}-to {
              0% {
                ${fa}
              }

              100% {
                margin: ${ie < 0 ? ie / 2 : 0}px ${ue < 0 ? ue / 2 : 0}px;
                width: ${Ge + we.marginH}px;
                height: ${Ke + we.marginV}px;
              }
            }
          `}
        `, document.head.appendChild(Fe);
        let J = "normal";
        A.style.animation = `${o.duration}ms ${o.easing} ${o.delay}ms ${J} ${o.fill} ${ke}-from`, $ !== void 0 && ($.style.animation = `${o.duration}ms ${o.easing} ${o.delay}ms ${J} ${o.fill} ${ke}-from-tween`), B.style.animation = `${o.duration}ms ${o.easing} ${o.delay}ms ${J} ${o.fill} ${ke}-to`, _.style.animation = `${o.duration}ms ${o.easing} ${o.delay}ms ${J} ${o.fill} ${ke}`;
        const Se = (Re) => {
          Re === Object(Re) && Re.animationName !== ke || (_.removeEventListener("animationend", Se), _.removeEventListener("animationcancel", Se), le(), Fe.remove());
        };
        i.qMorphCancel = () => {
          i.qMorphCancel = void 0, a = !0, Se();
        }, _.qMorphCancel = () => {
          _.qMorphCancel = void 0, a = !0, Se();
        }, _.addEventListener("animationend", Se), _.addEventListener("animationcancel", Se), t = (Re) => a === !0 || !_ || !A || !B ? !1 : Re === !0 ? (Se(), !0) : (n = n !== !0, J = J === "normal" ? "reverse" : "normal", A.style.animationDirection = J, $.style.animationDirection = J, B.style.animationDirection = J, _.style.animationDirection = J, !0);
      }
    };
    o.waitFor > 0 || o.waitFor === "transitionend" || o.waitFor === Object(o.waitFor) && typeof o.waitFor.then == "function" ? (o.waitFor > 0 ? new Promise((j) => setTimeout(j, o.waitFor)) : o.waitFor === "transitionend" ? new Promise((j) => {
      const N = () => {
        Z !== null && (clearTimeout(Z), Z = null), _ && (_.removeEventListener("transitionend", N), _.removeEventListener("transitioncancel", N)), j();
      };
      let Z = setTimeout(N, 400);
      _.addEventListener("transitionend", N), _.addEventListener("transitioncancel", N);
    }) : o.waitFor).then(Q).catch(() => {
      typeof _.qMorphCancel == "function" && _.qMorphCancel();
    }) : Q();
  };
  return typeof e.onToggle == "function" && e.onToggle(), requestAnimationFrame(D), (_) => t(_);
}
const Dl = {}, hg = [
  "duration",
  "delay",
  "easing",
  "fill",
  "classes",
  "style",
  "duration",
  "resize",
  "useCSS",
  "hideFromClone",
  "keepToClone",
  "tween",
  "tweenFromOpacity",
  "tweenToOpacity",
  "waitFor",
  "onEnd"
], bg = [
  "resize",
  "useCSS",
  "hideFromClone",
  "keepToClone",
  "tween"
];
function mn(e, t) {
  e.clsAction !== t && (e.clsAction = t, e.el.classList[t]("q-morph--invisible"));
}
function Wu(e) {
  if (e.animating === !0 || e.queue.length < 2) return;
  const [t, a] = e.queue;
  e.animating = !0, t.animating = !0, a.animating = !0, mn(t, "remove"), mn(a, "remove");
  const n = gg({
    from: t.el,
    to: a.el,
    onToggle() {
      mn(t, "add"), mn(a, "remove");
    },
    ...a.opts,
    onEnd(l, o) {
      var i, r;
      (r = (i = a.opts).onEnd) == null || r.call(i, l, o), o !== !0 && (t.animating = !1, a.animating = !1, e.animating = !1, e.cancel = void 0, e.queue.shift(), Wu(e));
    }
  });
  e.cancel = () => {
    n(!0), e.cancel = void 0;
  };
}
function Yu(e, t) {
  const a = t.opts;
  bg.forEach((n) => {
    a[n] = e[n] === !0;
  });
}
function yg(e, t) {
  const a = typeof e == "string" && e.length !== 0 ? e.split(":") : [];
  t.name = a[0], t.group = a[1], Object.assign(t.opts, {
    duration: isNaN(a[2]) === !0 ? 300 : parseFloat(a[2]),
    waitFor: a[3]
  });
}
function pg(e, t) {
  e.group !== void 0 && (t.group = e.group), e.name !== void 0 && (t.name = e.name);
  const a = t.opts;
  hg.forEach((n) => {
    e[n] !== void 0 && (a[n] = e[n]);
  });
}
function kg(e, t) {
  if (t.name === e) {
    const a = Dl[t.group];
    a === void 0 ? (Dl[t.group] = {
      name: t.group,
      model: e,
      queue: [t],
      animating: !1
    }, mn(t, "remove")) : a.model !== e && (a.model = e, a.queue.push(t), a.animating === !1 && a.queue.length === 2 && Wu(a));
    return;
  }
  t.animating === !1 && mn(t, "add");
}
function jr(e, t) {
  let a;
  Object(t) === t ? (a = String(t.model), pg(t, e), Yu(t, e)) : a = String(t), a !== e.model ? (e.model = a, kg(a, e)) : e.animating === !1 && e.clsAction !== void 0 && e.el.classList[e.clsAction]("q-morph--invisible");
}
ca({
  name: "morph",
  mounted(e, t) {
    const a = {
      el: e,
      animating: !1,
      opts: {}
    };
    Yu(t.modifiers, a), yg(t.arg, a), jr(a, t.value), e.__qmorph = a;
  },
  updated(e, t) {
    jr(e.__qmorph, t.value);
  },
  beforeUnmount(e) {
    var n;
    const t = e.__qmorph, a = Dl[t.group];
    a !== void 0 && a.queue.indexOf(t) !== -1 && (a.queue = a.queue.filter((l) => l !== t), a.queue.length === 0 && ((n = a.cancel) == null || n.call(a), delete Dl[t.group])), t.clsAction === "add" && e.classList.remove("q-morph--invisible"), delete e.__qmorph;
  }
});
const Cg = {
  childList: !0,
  subtree: !0,
  attributes: !0,
  characterData: !0,
  attributeOldValue: !0,
  characterDataOldValue: !0
};
function Qr(e, t, a) {
  var n;
  t.handler = a, (n = t.observer) == null || n.disconnect(), t.observer = new MutationObserver((l) => {
    typeof t.handler == "function" && (t.handler(l) === !1 || t.once === !0) && Xu(e);
  }), t.observer.observe(e, t.opts);
}
function Xu(e) {
  var a;
  const t = e.__qmutation;
  t !== void 0 && ((a = t.observer) == null || a.disconnect(), delete e.__qmutation);
}
ca({
  name: "mutation",
  mounted(e, { modifiers: { once: t, ...a }, value: n }) {
    const l = {
      once: t,
      opts: Object.keys(a).length === 0 ? Cg : a
    };
    Qr(e, l, n), e.__qmutation = l;
  },
  updated(e, { oldValue: t, value: a }) {
    const n = e.__qmutation;
    n !== void 0 && t !== a && Qr(e, n, a);
  },
  beforeUnmount: Xu
});
const { passive: Ll } = gt;
function Ur(e, { value: t, oldValue: a }) {
  if (typeof t != "function") {
    e.scrollTarget.removeEventListener("scroll", e.scroll, Ll);
    return;
  }
  e.handler = t, typeof a != "function" && (e.scrollTarget.addEventListener("scroll", e.scroll, Ll), e.scroll());
}
ca({
  name: "scroll-fire",
  mounted(e, t) {
    const a = {
      scrollTarget: ma(e),
      scroll: $n(() => {
        let n, l;
        a.scrollTarget === window ? (l = e.getBoundingClientRect().bottom, n = window.innerHeight) : (l = Cl(e).top + xn(e), n = Cl(a.scrollTarget).top + xn(a.scrollTarget)), l > 0 && l < n && (a.scrollTarget.removeEventListener("scroll", a.scroll, Ll), a.handler(e));
      }, 25)
    };
    Ur(a, t), e.__qscrollfire = a;
  },
  updated(e, t) {
    t.value !== t.oldValue && Ur(e.__qscrollfire, t);
  },
  beforeUnmount(e) {
    const t = e.__qscrollfire;
    t.scrollTarget.removeEventListener("scroll", t.scroll, Ll), t.scroll.cancel(), delete e.__qscrollfire;
  }
});
function Kr(e, { value: t, oldValue: a }) {
  if (typeof t != "function") {
    e.scrollTarget.removeEventListener("scroll", e.scroll, gt.passive);
    return;
  }
  e.handler = t, typeof a != "function" && e.scrollTarget.addEventListener("scroll", e.scroll, gt.passive);
}
ca({
  name: "scroll",
  mounted(e, t) {
    const a = {
      scrollTarget: ma(e),
      scroll() {
        a.handler(La(a.scrollTarget), Il(a.scrollTarget));
      }
    };
    Kr(a, t), e.__qscroll = a;
  },
  updated(e, t) {
    e.__qscroll !== void 0 && t.oldValue !== t.value && Kr(e.__qscroll, t);
  },
  beforeUnmount(e) {
    const t = e.__qscroll;
    t.scrollTarget.removeEventListener("scroll", t.scroll, gt.passive), delete e.__qscroll;
  }
});
ca({
  name: "touch-hold",
  beforeMount(e, t) {
    const { modifiers: a } = t;
    if (a.mouse !== !0 && Je.has.touch !== !0) return;
    const n = {
      handler: t.value,
      noop: At,
      mouseStart(o) {
        typeof n.handler == "function" && Pl(o) === !0 && (_t(n, "temp", [[
          document,
          "mousemove",
          "move",
          "passiveCapture"
        ], [
          document,
          "click",
          "end",
          "notPassiveCapture"
        ]]), n.start(o, !0));
      },
      touchStart(o) {
        if (o.target !== void 0 && typeof n.handler == "function") {
          const i = o.target;
          _t(n, "temp", [
            [
              i,
              "touchmove",
              "move",
              "passiveCapture"
            ],
            [
              i,
              "touchcancel",
              "end",
              "notPassiveCapture"
            ],
            [
              i,
              "touchend",
              "end",
              "notPassiveCapture"
            ]
          ]), n.start(o);
        }
      },
      start(o, i) {
        n.origin = Wt(o);
        const r = Date.now();
        Je.is.mobile === !0 && (document.body.classList.add("non-selectable"), da(), n.styleCleanup = (u) => {
          n.styleCleanup = void 0;
          const c = () => {
            document.body.classList.remove("non-selectable");
          };
          u === !0 ? (da(), setTimeout(c, 10)) : c();
        }), n.triggered = !1, n.sensitivity = i === !0 ? n.mouseSensitivity : n.touchSensitivity, n.timer = setTimeout(() => {
          n.timer = void 0, da(), n.triggered = !0, n.handler({
            evt: o,
            touch: i !== !0,
            mouse: i === !0,
            position: n.origin,
            duration: Date.now() - r
          });
        }, n.duration);
      },
      move(o) {
        const { top: i, left: r } = Wt(o);
        n.timer !== void 0 && (Math.abs(r - n.origin.left) >= n.sensitivity || Math.abs(i - n.origin.top) >= n.sensitivity) && (clearTimeout(n.timer), n.timer = void 0);
      },
      end(o) {
        var i;
        Ut(n, "temp"), (i = n.styleCleanup) == null || i.call(n, n.triggered), n.triggered === !0 ? o !== void 0 && Ye(o) : n.timer !== void 0 && (clearTimeout(n.timer), n.timer = void 0);
      }
    }, l = [
      600,
      5,
      7
    ];
    typeof t.arg == "string" && t.arg.length !== 0 && t.arg.split(":").forEach((o, i) => {
      const r = parseInt(o, 10);
      r && (l[i] = r);
    }), [n.duration, n.touchSensitivity, n.mouseSensitivity] = l, e.__qtouchhold = n, a.mouse === !0 && _t(n, "main", [[
      e,
      "mousedown",
      "mouseStart",
      `passive${a.mouseCapture === !0 || a.mousecapture === !0 ? "Capture" : ""}`
    ]]), Je.has.touch === !0 && _t(n, "main", [[
      e,
      "touchstart",
      "touchStart",
      `passive${a.capture === !0 ? "Capture" : ""}`
    ], [
      e,
      "touchend",
      "noop",
      "notPassiveCapture"
    ]]);
  },
  updated(e, t) {
    const a = e.__qtouchhold;
    a !== void 0 && t.oldValue !== t.value && (typeof t.value != "function" && a.end(), a.handler = t.value);
  },
  beforeUnmount(e) {
    var a;
    const t = e.__qtouchhold;
    t !== void 0 && (Ut(t, "main"), Ut(t, "temp"), t.timer !== void 0 && clearTimeout(t.timer), (a = t.styleCleanup) == null || a.call(t), delete e.__qtouchhold);
  }
});
const Gu = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  delete: [8, 46]
}, Sg = new RegExp(`^([\\d+]+|${Object.keys(Gu).join("|")})$`, "i");
function wg(e, t) {
  const { top: a, left: n } = Wt(e);
  return Math.abs(n - t.left) >= 7 || Math.abs(a - t.top) >= 7;
}
ca({
  name: "touch-repeat",
  beforeMount(e, { modifiers: t, value: a, arg: n }) {
    const l = Object.keys(t).reduce((u, c) => {
      if (Sg.test(c) === !0) {
        const d = isNaN(parseInt(c, 10)) ? Gu[c.toLowerCase()] : parseInt(c, 10);
        d >= 0 && u.push(d);
      }
      return u;
    }, []);
    if (t.mouse !== !0 && Je.has.touch !== !0 && l.length === 0) return;
    const o = typeof n == "string" && n.length !== 0 ? n.split(":").map((u) => parseInt(u, 10)) : [
      0,
      600,
      300
    ], i = o.length - 1, r = {
      keyboard: l,
      handler: a,
      noop: At,
      mouseStart(u) {
        r.event === void 0 && typeof r.handler == "function" && Pl(u) === !0 && (_t(r, "temp", [[
          document,
          "mousemove",
          "move",
          "passiveCapture"
        ], [
          document,
          "click",
          "end",
          "notPassiveCapture"
        ]]), r.start(u, !0));
      },
      keyboardStart(u) {
        if (typeof r.handler == "function" && la(u, l) === !0) {
          if ((o[0] === 0 || r.event !== void 0) && (Ye(u), e.focus(), r.event !== void 0))
            return;
          _t(r, "temp", [[
            document,
            "keyup",
            "end",
            "notPassiveCapture"
          ], [
            document,
            "click",
            "end",
            "notPassiveCapture"
          ]]), r.start(u, !1, !0);
        }
      },
      touchStart(u) {
        if (u.target !== void 0 && typeof r.handler == "function") {
          const c = u.target;
          _t(r, "temp", [
            [
              c,
              "touchmove",
              "move",
              "passiveCapture"
            ],
            [
              c,
              "touchcancel",
              "end",
              "notPassiveCapture"
            ],
            [
              c,
              "touchend",
              "end",
              "notPassiveCapture"
            ]
          ]), r.start(u);
        }
      },
      start(u, c, d) {
        d !== !0 && (r.origin = Wt(u));
        function v(m) {
          r.styleCleanup = void 0, document.documentElement.style.cursor = "";
          const g = () => {
            document.body.classList.remove("non-selectable");
          };
          m === !0 ? (da(), setTimeout(g, 10)) : g();
        }
        Je.is.mobile === !0 && (document.body.classList.add("non-selectable"), da(), r.styleCleanup = v), r.event = {
          touch: c !== !0 && d !== !0,
          mouse: c === !0,
          keyboard: d === !0,
          startTime: Date.now(),
          repeatCount: 0
        };
        const b = () => {
          if (r.timer = void 0, r.event === void 0) return;
          r.event.repeatCount === 0 && (r.event.evt = u, d === !0 ? r.event.keyCode = u.keyCode : r.event.position = Wt(u), Je.is.mobile !== !0 && (document.documentElement.style.cursor = "pointer", document.body.classList.add("non-selectable"), da(), r.styleCleanup = v)), r.event.duration = Date.now() - r.event.startTime, r.event.repeatCount += 1, r.handler(r.event);
          const m = i < r.event.repeatCount ? i : r.event.repeatCount;
          r.timer = setTimeout(b, o[m]);
        };
        o[0] === 0 ? b() : r.timer = setTimeout(b, o[0]);
      },
      move(u) {
        r.event !== void 0 && r.timer !== void 0 && wg(u, r.origin) === !0 && (clearTimeout(r.timer), r.timer = void 0);
      },
      end(u) {
        var c;
        r.event !== void 0 && ((c = r.styleCleanup) == null || c.call(r, !0), u !== void 0 && r.event.repeatCount > 0 && Ye(u), Ut(r, "temp"), r.timer !== void 0 && (clearTimeout(r.timer), r.timer = void 0), r.event = void 0);
      }
    };
    e.__qtouchrepeat = r, t.mouse === !0 && _t(r, "main", [[
      e,
      "mousedown",
      "mouseStart",
      `passive${t.mouseCapture === !0 || t.mousecapture === !0 ? "Capture" : ""}`
    ]]), Je.has.touch === !0 && _t(r, "main", [[
      e,
      "touchstart",
      "touchStart",
      `passive${t.capture === !0 ? "Capture" : ""}`
    ], [
      e,
      "touchend",
      "noop",
      "passiveCapture"
    ]]), l.length !== 0 && _t(r, "main", [[
      e,
      "keydown",
      "keyboardStart",
      `notPassive${t.keyCapture === !0 || t.keycapture === !0 ? "Capture" : ""}`
    ]]);
  },
  updated(e, { oldValue: t, value: a }) {
    const n = e.__qtouchrepeat;
    n !== void 0 && t !== a && (typeof a != "function" && n.end(), n.handler = a);
  },
  beforeUnmount(e) {
    var a;
    const t = e.__qtouchrepeat;
    t !== void 0 && (t.timer !== void 0 && clearTimeout(t.timer), Ut(t, "main"), Ut(t, "temp"), (a = t.styleCleanup) == null || a.call(t), delete e.__qtouchrepeat);
  }
});
function xg(e, t = document.body) {
  if (!(t instanceof Element)) throw new TypeError("Expected a DOM element");
  return getComputedStyle(t).getPropertyValue(`--q-${e}`).trim() || null;
}
let vl;
function _g() {
  return Je.is.winphone ? "msapplication-navbutton-color" : "theme-color";
}
function $g(e) {
  const t = document.getElementsByTagName("META");
  for (const a in t) if (t[a].name === e) return t[a];
}
function qg(e) {
  vl === void 0 && (vl = _g());
  let t = $g(vl);
  const a = t === void 0;
  a && (t = document.createElement("meta"), t.setAttribute("name", vl)), t.setAttribute("content", e), a && document.head.appendChild(t);
}
Je.is.mobile === !0 && (Je.is.nativeMobile === !0 || Je.is.winphone === !0 || Je.is.safari === !0 || Je.is.webkit === !0 || Je.is.vivaldi);
const Hn = {};
function Bg(e) {
  Object.assign(jt, {
    request: e,
    exit: e,
    toggle: e
  });
}
function Zu() {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null;
}
function Ju() {
  const e = jt.activeEl = jt.isActive === !1 ? null : Zu();
  Vc(e === null || e === document.documentElement ? document.body : e);
}
function Tg() {
  jt.isActive = jt.isActive === !1, Ju();
}
function Wr(e, t) {
  try {
    const a = e[t]();
    return a === void 0 ? Promise.resolve() : a;
  } catch (a) {
    return Promise.reject(a);
  }
}
const jt = Pa({
  isActive: !1,
  activeEl: null
}, {
  isCapable: !1,
  install({ $q: e }) {
    e.fullscreen = this;
  }
});
Hn.request = [
  "requestFullscreen",
  "msRequestFullscreen",
  "mozRequestFullScreen",
  "webkitRequestFullscreen"
].find((e) => document.documentElement[e] !== void 0);
jt.isCapable = Hn.request !== void 0;
jt.isCapable === !1 ? Bg(() => Promise.reject("Not capable")) : (Object.assign(jt, {
  request(e) {
    const t = e || document.documentElement, { activeEl: a } = jt;
    return t === a ? Promise.resolve() : (a !== null && t.contains(a) === !0 ? jt.exit() : Promise.resolve()).finally(() => Wr(t, Hn.request));
  },
  exit() {
    return jt.isActive === !0 ? Wr(document, Hn.exit) : Promise.resolve();
  },
  toggle(e) {
    return jt.isActive === !0 ? jt.exit() : jt.request(e);
  }
}), Hn.exit = [
  "exitFullscreen",
  "msExitFullscreen",
  "mozCancelFullScreen",
  "webkitExitFullscreen"
].find((e) => document[e]), jt.isActive = !!Zu(), jt.isActive === !0 && Ju(), [
  "onfullscreenchange",
  "onmsfullscreenchange",
  "onwebkitfullscreenchange"
].forEach((e) => {
  document[e] = Tg;
}));
const Mg = Pa({ appVisible: !0 }, { install({ $q: e }) {
  Rt(e, "appVisible", () => this.appVisible);
} });
{
  let e, t;
  if (typeof document.hidden < "u" ? (e = "hidden", t = "visibilitychange") : typeof document.msHidden < "u" ? (e = "msHidden", t = "msvisibilitychange") : typeof document.webkitHidden < "u" && (e = "webkitHidden", t = "webkitvisibilitychange"), t && typeof document[e] < "u") {
    const a = () => {
      Mg.appVisible = !document[e];
    };
    document.addEventListener(t, a, !1);
  }
}
re({
  name: "BottomSheetComponent",
  props: {
    ...it,
    title: String,
    message: String,
    actions: Array,
    grid: Boolean,
    cardClass: [
      String,
      Array,
      Object
    ],
    cardStyle: [
      String,
      Array,
      Object
    ]
  },
  emits: ["ok", "hide"],
  setup(e, { emit: t }) {
    const { proxy: a } = ye(), n = rt(e, a.$q), l = z(null);
    function o() {
      l.value.show();
    }
    function i() {
      l.value.hide();
    }
    function r(m) {
      t("ok", m), i();
    }
    function u() {
      t("hide");
    }
    function c() {
      return e.actions.map((m) => {
        const g = m.avatar || m.img;
        return m.label === void 0 ? f(Za, {
          class: "col-all",
          dark: n.value
        }) : f("div", {
          class: ["q-bottom-sheet__item q-hoverable q-focusable cursor-pointer relative-position", m.class],
          style: m.style,
          tabindex: 0,
          role: "listitem",
          onClick() {
            r(m);
          },
          onKeyup(p) {
            p.keyCode === 13 && r(m);
          }
        }, [
          f("div", { class: "q-focus-helper" }),
          m.icon ? f(st, {
            name: m.icon,
            color: m.color
          }) : g ? f("img", {
            class: m.avatar ? "q-bottom-sheet__avatar" : "",
            src: g
          }) : f("div", { class: "q-bottom-sheet__empty-icon" }),
          f("div", m.label)
        ]);
      });
    }
    function d() {
      return e.actions.map((m) => {
        const g = m.avatar || m.img;
        return m.label === void 0 ? f(Za, {
          spaced: !0,
          dark: n.value
        }) : f(jl, {
          class: ["q-bottom-sheet__item", m.classes],
          style: m.style,
          tabindex: 0,
          clickable: !0,
          dark: n.value,
          onClick() {
            r(m);
          }
        }, () => [f(za, { avatar: !0 }, () => m.icon ? f(st, {
          name: m.icon,
          color: m.color
        }) : g ? f("img", {
          class: m.avatar ? "q-bottom-sheet__avatar" : "",
          src: g
        }) : null), f(za, () => m.label)]);
      });
    }
    function v() {
      const m = [];
      return e.title && m.push(f(Na, { class: "q-dialog__title" }, () => e.title)), e.message && m.push(f(Na, { class: "q-dialog__message" }, () => e.message)), m.push(e.grid === !0 ? f("div", {
        class: "row items-stretch justify-start",
        role: "list"
      }, c()) : f("div", { role: "list" }, d())), m;
    }
    function b() {
      return [f(Es, {
        class: [`q-bottom-sheet q-bottom-sheet--${e.grid === !0 ? "grid" : "list"}` + (n.value === !0 ? " q-bottom-sheet--dark q-dark" : ""), e.cardClass],
        style: e.cardStyle
      }, v)];
    }
    return Object.assign(a, {
      show: o,
      hide: i
    }), () => f(Nl, {
      ref: l,
      position: "bottom",
      onHide: u
    }, b);
  }
});
function ed(e) {
  return encodeURIComponent(e);
}
function td(e) {
  return decodeURIComponent(e);
}
function Ag(e) {
  return ed(e === Object(e) ? JSON.stringify(e) : String(e));
}
function Dg(e) {
  if (e === "") return e;
  e.indexOf('"') === 0 && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")), e = td(e.replace(/\+/g, " "));
  try {
    const t = JSON.parse(e);
    (t === Object(t) || Array.isArray(t) === !0) && (e = t);
  } catch {
  }
  return e;
}
function ad(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setMilliseconds(t.getMilliseconds() + e), t.toUTCString();
}
function Lg(e) {
  let t = 0;
  const a = e.match(/(\d+)d/), n = e.match(/(\d+)h/), l = e.match(/(\d+)m/), o = e.match(/(\d+)s/);
  return a && (t += a[1] * 864e5), n && (t += n[1] * 36e5), l && (t += l[1] * 6e4), o && (t += o[1] * 1e3), t === 0 ? e : ad(t);
}
function nd(e, t, a = {}, n) {
  let l, o;
  a.expires !== void 0 && (Object.prototype.toString.call(a.expires) === "[object Date]" ? l = a.expires.toUTCString() : typeof a.expires == "string" ? l = Lg(a.expires) : (o = parseFloat(a.expires), l = isNaN(o) === !1 ? ad(o * 864e5) : a.expires));
  const i = `${ed(e)}=${Ag(t)}`, r = [
    i,
    l !== void 0 ? "; Expires=" + l : "",
    a.path ? "; Path=" + a.path : "",
    a.domain ? "; Domain=" + a.domain : "",
    a.sameSite ? "; SameSite=" + a.sameSite : "",
    a.httpOnly ? "; HttpOnly" : "",
    a.secure ? "; Secure" : "",
    a.other ? "; " + a.other : ""
  ].join("");
  if (n) {
    n.req.qCookies ? n.req.qCookies.push(r) : n.req.qCookies = [r], n.res.setHeader("Set-Cookie", n.req.qCookies);
    let u = n.req.headers.cookie || "";
    if (l !== void 0 && o < 0) {
      const c = zl(e, n);
      c !== void 0 && (u = u.replace(`${e}=${c}; `, "").replace(`; ${e}=${c}`, "").replace(`${e}=${c}`, ""));
    } else u = u ? `${i}; ${u}` : r;
    n.req.headers.cookie = u;
  } else document.cookie = r;
}
function zl(e, t) {
  const a = t ? t.req.headers : document, n = a.cookie ? a.cookie.split("; ") : [], l = n.length;
  let o = e ? null : {}, i = 0, r, u, c;
  for (; i < l; i++)
    if (r = n[i].split("="), u = td(r.shift()), c = r.join("="), !e) o[u] = c;
    else if (e === u) {
      o = Dg(c);
      break;
    }
  return o;
}
function zg(e, t, a) {
  nd(e, "", {
    expires: -1,
    ...t
  }, a);
}
function Vg(e, t) {
  return zl(e, t) !== null;
}
function ld(e) {
  return {
    get: (t) => zl(t, e),
    set: (t, a, n) => nd(t, a, n, e),
    has: (t) => Vg(t, e),
    remove: (t, a) => zg(t, a, e),
    getAll: () => zl(null, e)
  };
}
const od = { install({ $q: e, ssrContext: t }) {
  e.cookies = this;
} };
__QUASAR_SSR__ && (od.parseSSR = (e) => {
  if (e !== void 0) return ld(e);
});
Object.assign(od, ld());
re({
  name: "DialogPluginComponent",
  props: {
    ...it,
    title: String,
    message: String,
    prompt: Object,
    options: Object,
    progress: [Boolean, Object],
    html: Boolean,
    ok: {
      type: [
        String,
        Object,
        Boolean
      ],
      default: !0
    },
    cancel: [
      String,
      Object,
      Boolean
    ],
    focus: {
      type: String,
      default: "ok",
      validator: (e) => [
        "ok",
        "cancel",
        "none"
      ].includes(e)
    },
    stackButtons: Boolean,
    color: String,
    cardClass: [
      String,
      Array,
      Object
    ],
    cardStyle: [
      String,
      Array,
      Object
    ]
  },
  emits: ["ok", "hide"],
  setup(e, { emit: t }) {
    const { proxy: a } = ye(), { $q: n } = a, l = rt(e, n), o = z(null), i = z(e.prompt !== void 0 ? e.prompt.model : e.options !== void 0 ? e.options.model : void 0), r = s(() => "q-dialog-plugin" + (l.value === !0 ? " q-dialog-plugin--dark q-dark" : "") + (e.progress !== !1 ? " q-dialog-plugin--progress" : "")), u = s(() => e.color || (l.value === !0 ? "amber" : "primary")), c = s(() => e.progress === !1 ? null : Qt(e.progress) === !0 ? {
      component: e.progress.spinner || ia,
      props: { color: e.progress.color || u.value }
    } : {
      component: ia,
      props: { color: u.value }
    }), d = s(() => e.prompt !== void 0 || e.options !== void 0), v = s(() => {
      if (d.value !== !0) return {};
      const { model: S, isValid: T, items: H, ...E } = e.prompt !== void 0 ? e.prompt : e.options;
      return E;
    }), b = s(() => Qt(e.ok) === !0 || e.ok === !0 ? n.lang.label.ok : e.ok), m = s(() => Qt(e.cancel) === !0 || e.cancel === !0 ? n.lang.label.cancel : e.cancel), g = s(() => e.prompt !== void 0 ? e.prompt.isValid !== void 0 && e.prompt.isValid(i.value) !== !0 : e.options !== void 0 ? e.options.isValid !== void 0 && e.options.isValid(i.value) !== !0 : !1), p = s(() => ({
      color: u.value,
      label: b.value,
      ripple: !1,
      disable: g.value,
      ...Qt(e.ok) === !0 ? e.ok : { flat: !0 },
      "data-autofocus": e.focus === "ok" && d.value !== !0 || void 0,
      onClick: h
    })), k = s(() => ({
      color: u.value,
      label: m.value,
      ripple: !1,
      ...Qt(e.cancel) === !0 ? e.cancel : { flat: !0 },
      "data-autofocus": e.focus === "cancel" && d.value !== !0 || void 0,
      onClick: w
    }));
    se(() => e.prompt && e.prompt.model, L), se(() => e.options && e.options.model, L);
    function C() {
      o.value.show();
    }
    function y() {
      o.value.hide();
    }
    function h() {
      t("ok", ka(i.value)), y();
    }
    function w() {
      y();
    }
    function x() {
      t("hide");
    }
    function L(S) {
      i.value = S;
    }
    function M(S) {
      g.value !== !0 && e.prompt.type !== "textarea" && la(S, 13) === !0 && h();
    }
    function K(S, T) {
      return e.html === !0 ? f(Na, {
        class: S,
        innerHTML: T
      }) : f(Na, { class: S }, () => T);
    }
    function X() {
      return [f(_i, {
        color: u.value,
        dense: !0,
        autofocus: !0,
        dark: l.value,
        ...v.value,
        modelValue: i.value,
        "onUpdate:modelValue": L,
        onKeyup: M
      })];
    }
    function A() {
      return [f(Dv, {
        color: u.value,
        options: e.options.items,
        dark: l.value,
        ...v.value,
        modelValue: i.value,
        "onUpdate:modelValue": L
      })];
    }
    function $() {
      const S = [];
      return e.cancel && S.push(f(ft, k.value)), e.ok && S.push(f(ft, p.value)), f(Jc, {
        class: e.stackButtons === !0 ? "items-end" : "",
        vertical: e.stackButtons,
        align: "right"
      }, () => S);
    }
    function D() {
      const S = [];
      return e.title && S.push(K("q-dialog__title", e.title)), e.progress !== !1 && S.push(f(Na, { class: "q-dialog__progress" }, () => f(c.value.component, c.value.props))), e.message && S.push(K("q-dialog__message", e.message)), e.prompt !== void 0 ? S.push(f(Na, { class: "scroll q-dialog-plugin__form" }, X)) : e.options !== void 0 && S.push(f(Za, { dark: l.value }), f(Na, { class: "scroll q-dialog-plugin__form" }, A), f(Za, { dark: l.value })), (e.ok || e.cancel) && S.push($()), S;
    }
    function _() {
      return [f(Es, {
        class: [r.value, e.cardClass],
        style: e.cardStyle,
        dark: l.value
      }, D)];
    }
    return Object.assign(a, {
      show: C,
      hide: y
    }), () => f(Nl, {
      ref: o,
      onHide: x
    }, _);
  }
});
let fn, $o, Yr = 0, Oa = null, Ot = {}, Ua = {};
const id = {
  group: "__default_quasar_group__",
  delay: 0,
  message: !1,
  html: !1,
  spinnerSize: 80,
  spinnerColor: "",
  messageColor: "",
  backgroundColor: "",
  boxClass: "",
  spinner: ia,
  customClass: ""
}, rd = { ...id };
function Pg(e) {
  if ((e == null ? void 0 : e.group) !== void 0 && Ua[e.group] !== void 0) return Object.assign(Ua[e.group], e);
  const t = Qt(e) === !0 && e.ignoreDefaults === !0 ? {
    ...id,
    ...e
  } : {
    ...rd,
    ...e
  };
  return Ua[t.group] = t, t;
}
const va = Pa({ isActive: !1 }, {
  show(e) {
    Ot = Pg(e);
    const { group: t } = Ot;
    return va.isActive = !0, fn !== void 0 ? (Ot.uid = Yr, $o.$forceUpdate()) : (Ot.uid = ++Yr, Oa !== null && clearTimeout(Oa), Oa = setTimeout(() => {
      Oa = null;
      const a = oi("q-loading");
      fn = cs({
        name: "QLoading",
        setup() {
          bt(() => {
            Oo(!0);
          });
          function n() {
            va.isActive !== !0 && fn !== void 0 && (Oo(!1), fn.unmount(a), Ts(a), fn = void 0, $o = void 0);
          }
          function l() {
            if (va.isActive !== !0) return null;
            const o = [f(Ot.spinner, {
              class: "q-loading__spinner",
              color: Ot.spinnerColor,
              size: Ot.spinnerSize
            })];
            return Ot.message && o.push(f("div", {
              class: "q-loading__message" + (Ot.messageColor ? ` text-${Ot.messageColor}` : ""),
              [Ot.html === !0 ? "innerHTML" : "textContent"]: Ot.message
            })), f("div", {
              class: "q-loading fullscreen flex flex-center z-max " + Ot.customClass.trim(),
              key: Ot.uid
            }, [f("div", { class: "q-loading__backdrop" + (Ot.backgroundColor ? ` bg-${Ot.backgroundColor}` : "") }), f("div", { class: "q-loading__box column items-center " + Ot.boxClass }, o)]);
          }
          return () => f(Pt, {
            name: "q-transition--fade",
            appear: !0,
            onAfterLeave: n
          }, l);
        }
      }, va.__parentApp), $o = fn.mount(a);
    }, Ot.delay)), (a) => {
      if (a === void 0 || Object(a) !== a) {
        va.hide(t);
        return;
      }
      va.show({
        ...a,
        group: t
      });
    };
  },
  hide(e) {
    if (va.isActive === !0) {
      if (e === void 0) Ua = {};
      else {
        if (Ua[e] === void 0) return;
        {
          delete Ua[e];
          const t = Object.keys(Ua);
          if (t.length !== 0) {
            const a = t[t.length - 1];
            va.show({ group: a });
            return;
          }
        }
      }
      Oa !== null && (clearTimeout(Oa), Oa = null), va.isActive = !1;
    }
  },
  setDefaults(e) {
    Qt(e) === !0 && Object.assign(rd, e);
  },
  install({ $q: e, parentApp: t }) {
    e.loading = this, va.__parentApp = t, e.config.loading !== void 0 && this.setDefaults(e.config.loading);
  }
}), ml = z(null), Xr = Pa({ isActive: !1 }, {
  start: At,
  stop: At,
  increment: At,
  setDefaults: At,
  install({ $q: e, parentApp: t }) {
    if (e.loadingBar = this, this.__installed === !0) {
      e.config.loadingBar !== void 0 && this.setDefaults(e.config.loadingBar);
      return;
    }
    const a = z(e.config.loadingBar !== void 0 ? { ...e.config.loadingBar } : {});
    function n() {
      Xr.isActive = !0;
    }
    function l() {
      Xr.isActive = !1;
    }
    const o = oi("q-loading-bar");
    cs({
      name: "LoadingBar",
      devtools: { hide: !0 },
      setup: () => () => f(vs, {
        ...a.value,
        onStart: n,
        onStop: l,
        ref: ml
      })
    }, t).mount(o), Object.assign(this, {
      start(i) {
        ml.value.start(i);
      },
      stop() {
        ml.value.stop();
      },
      increment() {
        ml.value.increment.apply(null, arguments);
      },
      setDefaults(i) {
        Qt(i) === !0 && Object.assign(a.value, i);
      }
    });
  }
});
function Rg(e) {
  return Ao(e) === !0 ? "__q_date|" + e.getTime() : oc(e) === !0 ? "__q_expr|" + e.source : typeof e == "number" ? "__q_numb|" + e : typeof e == "boolean" ? "__q_bool|" + (e ? "1" : "0") : typeof e == "string" ? "__q_strn|" + e : typeof e == "function" ? "__q_strn|" + e.toString() : e === Object(e) ? "__q_objt|" + JSON.stringify(e) : e;
}
function Fg(e) {
  if (e.length < 9) return e;
  const t = e.substring(0, 8), a = e.substring(9);
  switch (t) {
    case "__q_date":
      const n = Number(a);
      return new Date(Number.isNaN(n) === !0 ? a : n);
    case "__q_expr":
      return new RegExp(a);
    case "__q_numb":
      return Number(a);
    case "__q_bool":
      return a === "1";
    case "__q_strn":
      return String(a);
    case "__q_objt":
      return JSON.parse(a);
    default:
      return e;
  }
}
function sd() {
  const e = () => null;
  return {
    has: () => !1,
    hasItem: () => !1,
    getLength: () => 0,
    getItem: e,
    getIndex: e,
    getKey: e,
    getAll: () => {
    },
    getAllKeys: () => [],
    set: At,
    setItem: At,
    remove: At,
    removeItem: At,
    clear: At,
    isEmpty: () => !0
  };
}
function ud(e) {
  const t = window[e + "Storage"], a = (i) => {
    const r = t.getItem(i);
    return r ? Fg(r) : null;
  }, n = (i) => t.getItem(i) !== null, l = (i, r) => {
    t.setItem(i, Rg(r));
  }, o = (i) => {
    t.removeItem(i);
  };
  return {
    has: n,
    hasItem: n,
    getLength: () => t.length,
    getItem: a,
    getIndex: (i) => i < t.length ? a(t.key(i)) : null,
    getKey: (i) => i < t.length ? t.key(i) : null,
    getAll: () => {
      let i;
      const r = {}, u = t.length;
      for (let c = 0; c < u; c++)
        i = t.key(c), r[i] = a(i);
      return r;
    },
    getAllKeys: () => {
      const i = [], r = t.length;
      for (let u = 0; u < r; u++) i.push(t.key(u));
      return i;
    },
    set: l,
    setItem: l,
    remove: o,
    removeItem: o,
    clear: () => {
      t.clear();
    },
    isEmpty: () => t.length === 0
  };
}
const dd = Je.has.webStorage === !1 ? sd() : ud("local"), Eg = { install({ $q: e }) {
  e.localStorage = dd;
} };
Object.assign(Eg, dd);
const cd = Je.has.webStorage === !1 ? sd() : ud("session"), Ig = { install({ $q: e }) {
  e.sessionStorage = cd;
} };
Object.assign(Ig, cd);
const Og = ["ok", "hide"];
Ku(Og);
function Hg() {
  return Yt("_q_");
}
function Ng(e, t) {
  return { wrapperClasses: s(() => [
    "dss-range",
    {
      "dss-range--focused": t.isFocused.value,
      "dss-range--error": e.error ?? !1,
      "dss-range--disabled": e.disabled ?? !1,
      "dss-range--readonly": e.readonly ?? !1,
      "dss-range--dense": e.dense ?? !1,
      "dss-range--drag-range": e.dragRange ?? !1,
      ...e.brand ? { [`dss-range--brand-${e.brand}`]: !0 } : {}
    }
  ]) };
}
function jg() {
  const e = z(!1);
  function t() {
    e.value = !0;
  }
  function a() {
    e.value = !1;
  }
  return { isFocused: e, handleFocusIn: t, handleFocusOut: a };
}
function Qg(e) {
  function t() {
    var l, o;
    const n = (l = e.value) == null ? void 0 : l.$el;
    (o = n == null ? void 0 : n.focus) == null || o.call(n);
  }
  function a() {
    var l, o;
    const n = (l = e.value) == null ? void 0 : l.$el;
    (o = n == null ? void 0 : n.blur) == null || o.call(n);
  }
  return { focus: t, blur: a };
}
const Ug = ["data-brand"], Kg = {
  key: 1,
  class: "dss-range__hint"
}, Wg = /* @__PURE__ */ he({
  name: "DssRange",
  inheritAttrs: !1,
  __name: "DssRange.ts",
  props: {
    modelValue: {},
    min: { default: 0 },
    max: { default: 100 },
    step: { default: 1 },
    label: { type: Boolean, default: !1 },
    markers: { type: Boolean, default: !1 },
    dragRange: { type: Boolean, default: !1 },
    dense: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    hint: { default: "" },
    brand: { default: null },
    tabindex: { default: null },
    ariaLabel: { default: void 0 }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { expose: t, emit: a }) {
    var k;
    const n = e, l = a, { isFocused: o, handleFocusIn: i, handleFocusOut: r } = jg(), { wrapperClasses: u } = Ng(n, { isFocused: o }), c = z(null), { focus: d, blur: v } = Qg(c), m = `dss-range-error-${((k = ye()) == null ? void 0 : k.uid) ?? 0}`, g = s(() => n.disabled ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? n.tabindex : 0), p = s(() => {
      if (n.error && n.errorMessage) return m;
    });
    return process.env.NODE_ENV !== "production" && !n.ariaLabel && console.warn(
      "[DssRange] A prop `ariaLabel` é fortemente recomendada para acessibilidade. Range sliders sem rótulo verbal violam WCAG 1.3.1 (Name, Role, Value)."
    ), t({ focus: d, blur: v }), (C, y) => (R(), ne("div", {
      class: qt(F(u)),
      "data-brand": e.brand ?? void 0,
      onFocusin: y[2] || (y[2] = //@ts-ignore
      (...h) => F(i) && F(i)(...h)),
      onFocusout: y[3] || (y[3] = //@ts-ignore
      (...h) => F(r) && F(r)(...h))
    }, [
      Mt(F(Rv), pe({
        ref_key: "qRangeRef",
        ref: c,
        "model-value": e.modelValue,
        min: e.min,
        max: e.max,
        step: e.step,
        label: e.label,
        markers: e.markers,
        "drag-range": e.dragRange,
        dense: e.dense,
        disable: e.disabled,
        readonly: e.readonly,
        tabindex: g.value,
        "aria-label": e.ariaLabel,
        "aria-describedby": p.value
      }, C.$attrs, {
        "onUpdate:modelValue": y[0] || (y[0] = (h) => l("update:modelValue", h)),
        onChange: y[1] || (y[1] = (h) => l("change", h))
      }), null, 16, ["model-value", "min", "max", "step", "label", "markers", "drag-range", "dense", "disable", "readonly", "tabindex", "aria-label", "aria-describedby"]),
      e.error && e.errorMessage ? (R(), ne("span", {
        key: 0,
        id: m,
        class: "dss-range__error",
        role: "alert",
        "aria-live": "polite"
      }, Ee(e.errorMessage), 1)) : e.hint ? (R(), ne("span", Kg, Ee(e.hint), 1)) : me("", !0)
    ], 42, Ug));
  }
}), Yg = Wg;
function Xg(e, t) {
  return { wrapperClasses: s(() => [
    "dss-slider",
    {
      "dss-slider--focused": t.isFocused.value,
      "dss-slider--error": e.error,
      "dss-slider--disabled": e.disabled,
      "dss-slider--readonly": e.readonly,
      "dss-slider--dense": e.dense,
      "dss-slider--vertical": e.vertical,
      ...e.brand ? { [`dss-slider--brand-${e.brand}`]: !0 } : {}
    }
  ]) };
}
function Gg(e) {
  function t() {
    var l, o;
    const n = (l = e.value) == null ? void 0 : l.$el;
    (o = n == null ? void 0 : n.focus) == null || o.call(n);
  }
  function a() {
    var l, o;
    const n = (l = e.value) == null ? void 0 : l.$el;
    (o = n == null ? void 0 : n.blur) == null || o.call(n);
  }
  return { focus: t, blur: a };
}
function Zg() {
  const e = z(!1);
  function t() {
    e.value = !0;
  }
  function a() {
    e.value = !1;
  }
  return { isFocused: e, handleFocusIn: t, handleFocusOut: a };
}
const Jg = ["data-brand"], eh = {
  key: 0,
  class: "dss-slider__hint"
}, th = /* @__PURE__ */ he({
  name: "DssSlider",
  inheritAttrs: !1,
  __name: "DssSlider.ts",
  props: {
    modelValue: {},
    min: { default: 0 },
    max: { default: 100 },
    step: { default: 1 },
    snap: { type: Boolean, default: !1 },
    markers: { type: [Boolean, Number], default: !1 },
    label: { type: Boolean, default: !1 },
    labelAlways: { type: Boolean, default: !1 },
    labelValue: { default: null },
    hint: { default: "" },
    errorMessage: { default: "" },
    error: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    dense: { type: Boolean, default: !1 },
    vertical: { type: Boolean, default: !1 },
    reverse: { type: Boolean, default: !1 },
    brand: { default: null },
    tabindex: { default: null },
    ariaLabel: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = z(null), r = `dss-slider-error-${Math.random().toString(36).substring(2, 8)}`, { isFocused: u, handleFocusIn: c, handleFocusOut: d } = Zg(), { wrapperClasses: v } = Xg(n, { isFocused: u }), { focus: b, blur: m } = Gg(o), g = s(() => n.disabled ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(String(n.tabindex)) : 0), p = s(() => {
      if (n.error && n.errorMessage) return r;
    }), k = s(
      () => n.labelValue !== null && n.labelValue !== void 0 ? n.labelValue : void 0
    );
    return bt(() => {
      process.env.NODE_ENV !== "production" && !n.ariaLabel && console.warn(
        "[DssSlider] ariaLabel é fortemente recomendado quando não há label visual associado (WCAG 1.3.1)"
      );
    }), t({
      focus: b,
      blur: m
    }), (C, y) => (R(), ne("div", {
      class: qt(F(v)),
      "data-brand": e.brand || void 0,
      onFocusin: y[2] || (y[2] = //@ts-ignore
      (...h) => F(c) && F(c)(...h)),
      onFocusout: y[3] || (y[3] = //@ts-ignore
      (...h) => F(d) && F(d)(...h))
    }, [
      Mt(F(Ha), pe({
        ref_key: "qSliderRef",
        ref: o,
        "model-value": e.modelValue,
        min: e.min,
        max: e.max,
        step: e.step,
        snap: e.snap,
        markers: e.markers,
        label: e.label,
        "label-always": e.labelAlways,
        "label-value": k.value,
        disable: e.disabled,
        readonly: e.readonly,
        dense: e.dense,
        vertical: e.vertical,
        reverse: e.reverse,
        tabindex: g.value,
        "aria-label": e.ariaLabel || void 0,
        "aria-describedby": p.value
      }, C.$attrs, {
        "onUpdate:modelValue": y[0] || (y[0] = (h) => l("update:modelValue", h)),
        onChange: y[1] || (y[1] = (h) => l("change", h))
      }), null, 16, ["model-value", "min", "max", "step", "snap", "markers", "label", "label-always", "label-value", "disable", "readonly", "dense", "vertical", "reverse", "tabindex", "aria-label", "aria-describedby"]),
      e.hint && !e.error ? (R(), ne("div", eh, Ee(e.hint), 1)) : me("", !0),
      e.error && e.errorMessage ? (R(), ne("div", {
        key: 1,
        id: r,
        class: "dss-slider__error",
        role: "alert",
        "aria-live": "assertive"
      }, Ee(e.errorMessage), 1)) : me("", !0)
    ], 42, Jg));
  }
}), ah = th;
function nh(e) {
  return { rootClasses: s(() => [
    "dss-rating",
    { [`dss-rating--brand-${e.brand}`]: !!e.brand }
  ]) };
}
const lh = /* @__PURE__ */ he({
  name: "DssRating",
  inheritAttrs: !1,
  __name: "DssRating.ts",
  props: {
    modelValue: {},
    max: { default: 5 },
    size: {},
    icon: {},
    iconSelected: {},
    iconHalf: {},
    noReset: { type: Boolean },
    readonly: { type: Boolean },
    disable: { type: Boolean },
    tabindex: {},
    name: {},
    brand: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, { rootClasses: l } = nh(a);
    return (o, i) => (R(), qe(F(Fv), pe(o.$attrs, {
      class: F(l),
      "model-value": e.modelValue,
      max: e.max,
      size: e.size,
      icon: e.icon,
      "icon-selected": e.iconSelected,
      "icon-half": e.iconHalf,
      "no-reset": e.noReset,
      readonly: e.readonly,
      disable: e.disable,
      tabindex: e.tabindex,
      name: e.name,
      "onUpdate:modelValue": i[0] || (i[0] = (r) => n("update:modelValue", r))
    }), null, 16, ["class", "model-value", "max", "size", "icon", "icon-selected", "icon-half", "no-reset", "readonly", "disable", "tabindex", "name"]));
  }
}), oh = lh;
function ih(e) {
  return { rootClasses: s(() => [
    "dss-knob",
    {
      [`dss-knob--brand-${e.brand}`]: !!e.brand
    }
  ]) };
}
const rh = /* @__PURE__ */ he({
  name: "DssKnob",
  inheritAttrs: !1,
  __name: "DssKnob.ts",
  props: {
    modelValue: {},
    min: { default: 0 },
    max: { default: 100 },
    innerMin: {},
    innerMax: {},
    step: { default: 1 },
    reverse: { type: Boolean },
    instantFeedback: { type: Boolean },
    readonly: { type: Boolean },
    disable: { type: Boolean },
    thickness: { default: 0.2 },
    angle: {},
    rounded: { type: Boolean },
    tabindex: {},
    size: {},
    name: {},
    showValue: { type: Boolean, default: !0 },
    brand: {}
  },
  emits: ["update:modelValue", "change", "drag-value"],
  setup(e, { emit: t }) {
    const a = e, n = t, { rootClasses: l } = ih(a);
    return (o, i) => (R(), qe(F(xv), pe(o.$attrs, {
      class: F(l),
      "model-value": e.modelValue,
      min: e.min,
      max: e.max,
      "inner-min": e.innerMin,
      "inner-max": e.innerMax,
      step: e.step,
      reverse: e.reverse,
      "instant-feedback": e.instantFeedback,
      readonly: e.readonly,
      disable: e.disable,
      thickness: e.thickness,
      angle: e.angle,
      rounded: e.rounded,
      tabindex: e.tabindex,
      size: e.size,
      name: e.name,
      "show-value": e.showValue,
      color: "primary",
      "track-color": "grey-3",
      "center-color": "white",
      "onUpdate:modelValue": i[0] || (i[0] = (r) => n("update:modelValue", r)),
      onChange: i[1] || (i[1] = (r) => n("change", r)),
      onDragValue: i[2] || (i[2] = (r) => n("drag-value", r))
    }), {
      default: ve(() => [
        ee(o.$slots, "default", {}, () => [
          ht(Ee(e.modelValue), 1)
        ])
      ]),
      _: 3
    }, 16, ["class", "model-value", "min", "max", "inner-min", "inner-max", "step", "reverse", "instant-feedback", "readonly", "disable", "thickness", "angle", "rounded", "tabindex", "size", "name", "show-value"]));
  }
}), sh = rh;
function uh(e, t) {
  return { wrapperClasses: s(() => [
    "dss-select",
    `dss-select--${e.variant ?? "outlined"}`,
    {
      "dss-select--focused": t.isFocused.value,
      "dss-select--error": e.error,
      "dss-select--disabled": e.disabled,
      "dss-select--readonly": e.readonly,
      "dss-select--dense": e.dense,
      "dss-select--loading": e.loading,
      "dss-select--multiple": e.multiple,
      ...e.brand ? { [`dss-select--brand-${e.brand}`]: !0 } : {}
    }
  ]) };
}
function dh(e) {
  return { isFocused: z(!1) };
}
function ch(e, t, a) {
  function n(d) {
    a.value = !0, e("focus", d);
  }
  function l(d) {
    a.value = !1, e("blur", d);
  }
  function o() {
    var d;
    (d = t.value) == null || d.focus();
  }
  function i() {
    var d;
    (d = t.value) == null || d.blur();
  }
  function r() {
    var d;
    (d = t.value) == null || d.showPopup();
  }
  function u() {
    var d;
    (d = t.value) == null || d.hidePopup();
  }
  function c() {
    var d, v;
    return ((v = (d = t.value) == null ? void 0 : d.getNativeElement) == null ? void 0 : v.call(d)) ?? null;
  }
  return { handleFocus: n, handleBlur: l, focus: o, blur: i, showPopup: r, hidePopup: u, getNativeEl: c };
}
const fh = /* @__PURE__ */ he({
  name: "DssSelect",
  inheritAttrs: !1,
  __name: "DssSelect.ts",
  props: {
    modelValue: { default: null },
    options: { default: () => [] },
    optionValue: { type: [String, Function], default: "value" },
    optionLabel: { type: [String, Function], default: "label" },
    emitValue: { type: Boolean, default: !1 },
    mapOptions: { type: Boolean, default: !1 },
    variant: { default: "outlined" },
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
    multiple: { type: Boolean, default: !1 },
    useChips: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    ariaLabel: {},
    tabindex: { default: null }
  },
  emits: ["update:modelValue", "focus", "blur", "clear", "popup-show", "popup-hide"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = Nt(), i = z(null), { isFocused: r } = dh(), { wrapperClasses: u } = uh(n, { isFocused: r }), { handleFocus: c, handleBlur: d, focus: v, blur: b, showPopup: m, hidePopup: g, getNativeEl: p } = ch(l, i, r), k = s(() => n.disabled || n.loading ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(String(n.tabindex)) : 0), C = s(() => {
      const y = ["dss-select__panel"];
      return n.brand && y.push(`dss-select__panel--brand-${n.brand}`), y.join(" ");
    });
    return t({
      focus: v,
      blur: b,
      showPopup: m,
      hidePopup: g,
      get nativeEl() {
        return p();
      }
    }), (y, h) => (R(), qe(F(Iu), pe({
      ref_key: "qSelectRef",
      ref: i,
      class: F(u),
      "popup-content-class": C.value,
      "model-value": e.modelValue,
      options: e.options,
      "option-value": e.optionValue,
      "option-label": e.optionLabel,
      "emit-value": e.emitValue,
      "map-options": e.mapOptions,
      label: e.label,
      "stack-label": e.stackLabel,
      placeholder: e.placeholder,
      hint: e.hint,
      error: e.error,
      "error-message": e.errorMessage,
      disabled: e.disabled,
      readonly: e.readonly,
      loading: e.loading,
      clearable: e.clearable,
      multiple: e.multiple,
      "use-chips": e.useChips,
      outlined: e.variant === "outlined",
      filled: e.variant === "filled",
      standout: e.variant === "standout",
      borderless: e.variant === "borderless",
      dense: e.dense,
      tabindex: k.value,
      "aria-label": e.ariaLabel || void 0,
      "aria-required": e.required ? "true" : void 0
    }, y.$attrs, {
      "onUpdate:modelValue": h[0] || (h[0] = (w) => l("update:modelValue", w)),
      onFocus: F(c),
      onBlur: F(d),
      onClear: h[1] || (h[1] = (w) => l("clear")),
      onPopupShow: h[2] || (h[2] = (w) => l("popup-show")),
      onPopupHide: h[3] || (h[3] = (w) => l("popup-hide"))
    }), Et({ _: 2 }, [
      Aa(F(o), (w, x) => ({
        name: x,
        fn: ve((L) => [
          ee(y.$slots, x, Lt(zt(L ?? {})))
        ])
      }))
    ]), 1040, ["class", "popup-content-class", "model-value", "options", "option-value", "option-label", "emit-value", "map-options", "label", "stack-label", "placeholder", "hint", "error", "error-message", "disabled", "readonly", "loading", "clearable", "multiple", "use-chips", "outlined", "filled", "standout", "borderless", "dense", "tabindex", "aria-label", "aria-required", "onFocus", "onBlur"]));
  }
}), vh = fh;
function mh(e) {
  const t = s(() => [
    "dss-option-group",
    // Tipo do controle interno (determina CSS selector scope)
    `dss-option-group--${e.type ?? "radio"}`,
    {
      // Layout
      "dss-option-group--inline": e.inline,
      // Densidade
      "dss-option-group--dense": e.dense,
      // Estados do container
      "dss-option-group--disable": e.disable,
      "dss-option-group--readonly": e.readonly
    }
  ]), a = s(
    () => e.type === "radio" || !e.type ? "radiogroup" : "group"
  );
  return { containerClasses: t, computedRole: a };
}
const fd = Fd, vd = Gd, gh = ["role", "aria-label", "aria-labelledby", "aria-disabled"];
let hh = 0;
const bh = /* @__PURE__ */ he({
  name: "DssOptionGroup",
  /**
   * inheritAttrs: false — Atributos extras (data-*, event listeners) são
   * repassados manualmente ao container via v-bind="$attrs".
   * Evita duplicação de atributos em elemento raiz e filhos.
   */
  inheritAttrs: !1,
  __name: "DssOptionGroup.ts",
  props: {
    modelValue: {},
    options: {},
    type: { default: "radio" },
    color: { default: "primary" },
    keepColor: { type: Boolean, default: !1 },
    inline: { type: Boolean, default: !1 },
    disable: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    dense: { type: Boolean, default: !1 },
    ariaLabel: {},
    ariaLabelledby: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, { containerClasses: l, computedRole: o } = mh(a), i = `dss-option-group-${++hh}`;
    function r(c) {
      return Array.isArray(a.modelValue) ? a.modelValue.includes(c) : !1;
    }
    function u(c, d) {
      const v = Array.isArray(a.modelValue) ? [...a.modelValue] : [];
      if (d)
        v.includes(c) || v.push(c);
      else {
        const b = v.indexOf(c);
        b > -1 && v.splice(b, 1);
      }
      n("update:modelValue", v);
    }
    return (c, d) => (R(), ne("div", pe({
      class: F(l),
      role: F(o),
      "aria-label": e.ariaLabel || void 0,
      "aria-labelledby": e.ariaLabelledby || void 0,
      "aria-disabled": e.disable || void 0
    }, c.$attrs), [
      e.type === "radio" || !e.type ? (R(!0), ne(hn, { key: 0 }, Aa(e.options, (v) => (R(), qe(as, {
        key: String(v.value),
        "model-value": e.modelValue,
        val: v.value,
        label: v.label,
        color: v.color ?? e.color,
        "keep-color": v.keepColor ?? e.keepColor,
        disable: !!(e.disable || v.disable),
        readonly: e.readonly,
        dense: e.dense,
        name: i,
        "onUpdate:modelValue": d[0] || (d[0] = (b) => n("update:modelValue", b))
      }, null, 8, ["model-value", "val", "label", "color", "keep-color", "disable", "readonly", "dense"]))), 128)) : e.type === "checkbox" ? (R(!0), ne(hn, { key: 1 }, Aa(e.options, (v) => (R(), qe(fd, {
        key: String(v.value),
        "model-value": r(v.value),
        label: v.label,
        color: v.color ?? e.color,
        "keep-color": v.keepColor ?? e.keepColor,
        disable: !!(e.disable || v.disable),
        readonly: e.readonly,
        dense: e.dense,
        "onUpdate:modelValue": (b) => u(v.value, b)
      }, null, 8, ["model-value", "label", "color", "keep-color", "disable", "readonly", "dense", "onUpdate:modelValue"]))), 128)) : e.type === "toggle" ? (R(!0), ne(hn, { key: 2 }, Aa(e.options, (v) => (R(), qe(vd, {
        key: String(v.value),
        "model-value": r(v.value),
        label: v.label,
        color: v.color ?? e.color,
        "keep-color": v.keepColor ?? e.keepColor,
        disable: !!(e.disable || v.disable),
        readonly: e.readonly,
        dense: e.dense,
        "onUpdate:modelValue": (b) => u(v.value, b)
      }, null, 8, ["model-value", "label", "color", "keep-color", "disable", "readonly", "dense", "onUpdate:modelValue"]))), 128)) : me("", !0)
    ], 16, gh));
  }
}), yh = bh;
function ph(e) {
  return {
    btnGroupClasses: s(() => [
      // Classe base
      "dss-btn-group",
      // Variantes de estilo (prop sync com filhos obrigatório)
      {
        "dss-btn-group--flat": e.flat,
        "dss-btn-group--outline": e.outline,
        "dss-btn-group--push": e.push,
        "dss-btn-group--unelevated": e.unelevated,
        "dss-btn-group--glossy": e.glossy
      },
      // Modificadores de forma
      {
        "dss-btn-group--rounded": e.rounded,
        "dss-btn-group--square": e.square
      },
      // Modificadores de layout
      {
        "dss-btn-group--spread": e.spread,
        "dss-btn-group--stretch": e.stretch
      },
      // Brand
      {
        [`dss-btn-group--brand-${e.brand}`]: e.brand
      }
    ])
  };
}
const kh = ["aria-label"], Ch = /* @__PURE__ */ he({
  name: "DssBtnGroup",
  inheritAttrs: !1,
  __name: "DssBtnGroup.ts",
  props: {
    flat: { type: Boolean, default: !1 },
    outline: { type: Boolean, default: !1 },
    push: { type: Boolean, default: !1 },
    unelevated: { type: Boolean, default: !1 },
    rounded: { type: Boolean, default: !1 },
    square: { type: Boolean, default: !1 },
    glossy: { type: Boolean, default: !1 },
    spread: { type: Boolean, default: !1 },
    stretch: { type: Boolean, default: !1 },
    brand: { default: null },
    ariaLabel: { default: void 0 }
  },
  setup(e) {
    const t = e, { btnGroupClasses: a } = ph(t);
    return (n, l) => (R(), ne("div", pe({
      class: F(a),
      role: "group",
      "aria-label": e.ariaLabel || void 0
    }, n.$attrs), [
      ee(n.$slots, "default")
    ], 16, kh));
  }
}), Sh = Ch;
function wh(e) {
  const t = s(() => {
    const n = e.variant ?? "elevated";
    return {
      flat: n === "flat",
      outline: n === "outline",
      unelevated: n === "unelevated",
      push: n === "push"
      // elevated = nenhuma prop booleana (padrão Quasar)
    };
  });
  return {
    btnToggleClasses: s(() => [
      // Classe base
      "dss-btn-toggle",
      // Variante visual
      {
        "dss-btn-toggle--elevated": !e.variant || e.variant === "elevated",
        "dss-btn-toggle--flat": e.variant === "flat",
        "dss-btn-toggle--outline": e.variant === "outline",
        "dss-btn-toggle--unelevated": e.variant === "unelevated",
        "dss-btn-toggle--push": e.variant === "push"
      },
      // Modificadores de forma
      {
        "dss-btn-toggle--rounded": e.rounded,
        "dss-btn-toggle--square": e.square
      },
      // Modificadores de layout
      {
        "dss-btn-toggle--spread": e.spread,
        "dss-btn-toggle--stretch": e.stretch
      },
      // Estado de interação
      {
        "dss-btn-toggle--readonly": e.readonly
      },
      // Brand
      {
        [`dss-btn-toggle--brand-${e.brand}`]: e.brand
      }
    ]),
    variantProps: t
  };
}
const xh = /* @__PURE__ */ he({
  name: "DssBtnToggle",
  inheritAttrs: !1,
  __name: "DssBtnToggle.ts",
  props: {
    modelValue: { default: void 0 },
    options: {},
    variant: { default: "elevated" },
    color: { default: "primary" },
    toggleColor: { default: "primary" },
    textColor: { default: void 0 },
    toggleTextColor: { default: void 0 },
    rounded: { type: Boolean, default: !1 },
    square: { type: Boolean, default: !1 },
    spread: { type: Boolean, default: !1 },
    stretch: { type: Boolean, default: !1 },
    disable: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    brand: { default: null },
    ariaLabel: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, { btnToggleClasses: l, variantProps: o } = wh(a);
    return (i, r) => {
      const u = lt("q-btn-toggle");
      return R(), qe(u, pe({
        class: F(l),
        "model-value": e.modelValue,
        "onUpdate:modelValue": r[0] || (r[0] = (c) => n("update:modelValue", c)),
        options: e.options,
        flat: F(o).flat,
        outline: F(o).outline,
        unelevated: F(o).unelevated,
        push: F(o).push,
        rounded: e.rounded,
        square: e.square,
        spread: e.spread,
        stretch: e.stretch,
        disable: e.disable,
        readonly: e.readonly,
        clearable: e.clearable,
        color: e.color || void 0,
        "toggle-color": e.toggleColor || void 0,
        "text-color": e.textColor || void 0,
        "toggle-text-color": e.toggleTextColor || void 0,
        role: "group",
        "aria-label": e.ariaLabel || void 0,
        "no-caps": ""
      }, i.$attrs), null, 16, ["class", "model-value", "options", "flat", "outline", "unelevated", "push", "rounded", "square", "spread", "stretch", "disable", "readonly", "clearable", "color", "toggle-color", "text-color", "toggle-text-color", "aria-label"]);
    };
  }
});
function _h(e) {
  return s(() => {
    switch (e) {
      case "flat":
        return { flat: !0 };
      case "outline":
        return { outline: !0 };
      case "unelevated":
        return { unelevated: !0 };
      case "elevated":
      default:
        return {};
    }
  });
}
function $h(e) {
  return { btnDropdownClasses: s(() => {
    const a = ["dss-btn-dropdown"];
    return e.variant && e.variant !== "elevated" && a.push(`dss-btn-dropdown--${e.variant}`), e.split && a.push("dss-btn-dropdown--split"), e.square && a.push("dss-btn-dropdown--square"), e.rounded && a.push("dss-btn-dropdown--rounded"), e.dense && a.push("dss-btn-dropdown--dense"), e.disable && a.push("dss-btn-dropdown--disabled"), e.loading && a.push("dss-btn-dropdown--loading"), e.brand && a.push(`dss-btn-dropdown--brand-${e.brand}`), a;
  }) };
}
const qh = /* @__PURE__ */ he({
  name: "DssBtnDropdown",
  inheritAttrs: !1,
  __name: "DssBtnDropdown.ts",
  props: {
    label: { default: void 0 },
    icon: { default: void 0 },
    iconRight: { default: void 0 },
    variant: { default: "elevated" },
    color: { default: "primary" },
    textColor: { default: void 0 },
    size: { default: "md" },
    square: { type: Boolean, default: !1 },
    rounded: { type: Boolean, default: !1 },
    dense: { type: Boolean, default: !1 },
    split: { type: Boolean, default: !1 },
    disable: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    closeOnEsc: { type: Boolean, default: !0 },
    dropdownIcon: { default: "arrow_drop_down" },
    menuAnchor: { default: "bottom left" },
    menuSelf: { default: "top left" },
    menuOffset: { default: () => [0, 0] },
    stretch: { type: Boolean, default: !1 },
    persistent: { type: Boolean, default: !1 },
    brand: { default: null },
    ariaLabel: { default: void 0 }
  },
  emits: ["click", "show", "hide", "before-show", "before-hide"],
  setup(e, { emit: t }) {
    const a = e, n = t, { btnDropdownClasses: l } = $h(a), o = s(() => _h(a.variant).value);
    return (i, r) => {
      const u = lt("q-btn-dropdown");
      return R(), ne("div", pe({ class: F(l) }, i.$attrs), [
        Mt(u, pe({
          label: e.label,
          icon: e.icon,
          "icon-right": e.iconRight
        }, o.value, {
          color: e.color,
          "text-color": e.textColor,
          size: e.size,
          square: e.square,
          rounded: e.rounded,
          dense: e.dense,
          split: e.split,
          disable: e.disable,
          loading: e.loading,
          "close-on-esc-key": e.closeOnEsc,
          "dropdown-icon": e.dropdownIcon,
          "menu-anchor": e.menuAnchor,
          "menu-self": e.menuSelf,
          "menu-offset": e.menuOffset,
          stretch: e.stretch,
          persistent: e.persistent,
          "aria-label": e.ariaLabel || void 0,
          "popup-content-class": "dss-btn-dropdown__panel",
          class: "dss-btn-dropdown__trigger",
          onClick: r[0] || (r[0] = (c) => n("click", c)),
          onShow: r[1] || (r[1] = (c) => n("show")),
          onHide: r[2] || (r[2] = (c) => n("hide")),
          onBeforeShow: r[3] || (r[3] = (c) => n("before-show")),
          onBeforeHide: r[4] || (r[4] = (c) => n("before-hide"))
        }), Et({
          default: ve(() => [
            ee(i.$slots, "default")
          ]),
          _: 2
        }, [
          i.$slots.label ? {
            name: "label",
            fn: ve(() => [
              ee(i.$slots, "label")
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["label", "icon", "icon-right", "color", "text-color", "size", "square", "rounded", "dense", "split", "disable", "loading", "close-on-esc-key", "dropdown-icon", "menu-anchor", "menu-self", "menu-offset", "stretch", "persistent", "aria-label"])
      ], 16);
    };
  }
}), Bh = qh;
function Th(e) {
  return { fabClasses: s(() => {
    const a = ["dss-fab"];
    return e.label && a.push("dss-fab--extended"), e.direction && e.direction !== "up" && a.push(`dss-fab--direction-${e.direction}`), e.disable && a.push("dss-fab--disabled"), e.brand && a.push(`dss-fab--brand-${e.brand}`), a;
  }) };
}
const Mh = /* @__PURE__ */ he({
  name: "DssFab",
  inheritAttrs: !1,
  __name: "DssFab.ts",
  props: {
    modelValue: { type: Boolean, default: !1 },
    color: { default: "primary" },
    textColor: { default: void 0 },
    label: { default: void 0 },
    icon: { default: "add" },
    activeIcon: { default: "close" },
    hideIcon: { type: Boolean, default: !1 },
    hideLabel: { type: Boolean, default: !1 },
    direction: { default: "up" },
    verticalActionsAlign: { default: "center" },
    persistent: { type: Boolean, default: !1 },
    disable: { type: Boolean, default: !1 },
    brand: { default: null },
    ariaLabel: { default: void 0 }
  },
  emits: ["update:modelValue", "click", "show", "hide", "before-show", "before-hide"],
  setup(e, { emit: t }) {
    const a = e, n = t, { fabClasses: l } = Th(a);
    return (o, i) => {
      const r = lt("q-fab");
      return R(), ne("div", pe({ class: F(l) }, o.$attrs), [
        Mt(r, {
          class: "dss-fab__qfab",
          "model-value": e.modelValue,
          color: e.color,
          "text-color": e.textColor,
          icon: e.icon,
          "active-icon": e.activeIcon,
          label: e.label,
          "hide-icon": e.hideIcon,
          "hide-label": e.hideLabel,
          direction: e.direction,
          "vertical-actions-align": e.verticalActionsAlign,
          persistent: e.persistent,
          disable: e.disable,
          "aria-label": e.ariaLabel || void 0,
          "onUpdate:modelValue": i[0] || (i[0] = (u) => n("update:modelValue", u)),
          onClick: i[1] || (i[1] = (u) => n("click", u)),
          onShow: i[2] || (i[2] = (u) => n("show")),
          onHide: i[3] || (i[3] = (u) => n("hide")),
          onBeforeShow: i[4] || (i[4] = (u) => n("before-show")),
          onBeforeHide: i[5] || (i[5] = (u) => n("before-hide"))
        }, {
          default: ve(() => [
            ee(o.$slots, "default")
          ]),
          _: 3
        }, 8, ["model-value", "color", "text-color", "icon", "active-icon", "label", "hide-icon", "hide-label", "direction", "vertical-actions-align", "persistent", "disable", "aria-label"])
      ], 16);
    };
  }
}), Ah = Mh;
function Dh(e) {
  return { fabActionClasses: s(() => {
    const a = ["dss-fab-action"];
    return e.label && a.push("dss-fab-action--extended"), e.externalLabel && (a.push("dss-fab-action--has-external-label"), e.labelPosition && a.push(`dss-fab-action--label-${e.labelPosition}`)), e.disable && a.push("dss-fab-action--disabled"), e.brand && a.push(`dss-fab-action--brand-${e.brand}`), a;
  }) };
}
const Lh = /* @__PURE__ */ he({
  name: "DssFabAction",
  inheritAttrs: !1,
  __name: "DssFabAction.ts",
  props: {
    color: { default: "primary" },
    textColor: {},
    icon: {},
    label: {},
    externalLabel: {},
    labelPosition: { default: "left" },
    to: {},
    href: {},
    target: { default: "_self" },
    disable: { type: Boolean, default: !1 },
    brand: { default: null },
    ariaLabel: {}
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const a = e, n = t, { fabActionClasses: l } = Dh(a);
    return (o, i) => {
      const r = lt("q-fab-action");
      return R(), ne("div", pe({ class: F(l) }, o.$attrs), [
        Mt(r, {
          class: "dss-fab-action__qaction",
          color: e.color,
          "text-color": e.textColor,
          icon: e.icon,
          label: e.label,
          "external-label": e.externalLabel,
          "label-position": e.labelPosition || "left",
          disable: e.disable,
          to: e.to,
          href: e.href,
          target: e.target,
          "aria-label": e.ariaLabel || void 0,
          onClick: i[0] || (i[0] = (u) => n("click", u))
        }, Et({ _: 2 }, [
          o.$slots.icon ? {
            name: "icon",
            fn: ve(() => [
              ee(o.$slots, "icon")
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["color", "text-color", "icon", "label", "external-label", "label-position", "disable", "to", "href", "target", "aria-label"])
      ], 16);
    };
  }
}), zh = Lh;
function Vh(e) {
  return { rootClasses: s(() => ({
    "dss-pagination": !0,
    [`dss-pagination--${e.size ?? "md"}`]: !0,
    "dss-pagination--flat": e.flat,
    "dss-pagination--outline": e.outline,
    "dss-pagination--round": e.round,
    "dss-pagination--disabled": e.disable,
    "dss-pagination--readonly": e.readonly
  })) };
}
const Ph = ["data-brand", "aria-label"], Rh = /* @__PURE__ */ he({
  name: "DssPagination",
  inheritAttrs: !1,
  __name: "DssPagination.ts",
  props: {
    modelValue: {},
    max: {},
    maxPages: { default: 5 },
    disable: { type: Boolean },
    readonly: { type: Boolean },
    size: {},
    ellipses: { type: Boolean, default: !0 },
    boundaryLinks: { type: Boolean },
    directionLinks: { type: Boolean, default: !0 },
    flat: { type: Boolean },
    outline: { type: Boolean },
    round: { type: Boolean },
    brand: {},
    ariaLabel: { default: "Navegação por páginas" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, { rootClasses: l } = Vh(a);
    return (o, i) => (R(), ne("div", pe(o.$attrs, {
      class: F(l),
      "data-brand": e.brand ?? void 0,
      role: "navigation",
      "aria-label": e.ariaLabel
    }), [
      Mt(F(Lv), {
        "model-value": e.modelValue,
        max: e.max,
        "max-pages": e.maxPages,
        disable: e.disable,
        readonly: e.readonly,
        size: e.size,
        ellipses: e.ellipses,
        "boundary-links": e.boundaryLinks,
        "direction-links": e.directionLinks,
        flat: e.flat,
        outline: e.outline,
        round: e.round,
        color: "primary",
        "active-color": "primary",
        unelevated: "",
        "onUpdate:modelValue": i[0] || (i[0] = (r) => n("update:modelValue", r))
      }, null, 8, ["model-value", "max", "max-pages", "disable", "readonly", "size", "ellipses", "boundary-links", "direction-links", "flat", "outline", "round"])
    ], 16, Ph));
  }
}), Fh = Rh;
function Eh(e, { isFocused: t, hasValue: a }) {
  const n = s(() => [
    // Classe base
    "dss-input",
    // Variante visual
    `dss-input--${e.variant}`,
    // Classes condicionais de estado
    {
      "dss-input--focused": t.value,
      "dss-input--error": e.error,
      "dss-input--disabled": e.disabled,
      "dss-input--readonly": e.readonly,
      "dss-input--dense": e.dense,
      "dss-input--loading": e.loading,
      "dss-input--filled": a.value,
      [`dss-input--brand-${e.brand}`]: e.brand
    }
  ]), l = s(() => [
    // Classe base
    "dss-input__label",
    // Classes condicionais
    {
      "dss-input__label--stack": e.stackLabel,
      "dss-input__label--float": a.value || t.value
    }
  ]), o = s(() => "dss-input__native");
  return {
    wrapperClasses: n,
    labelClasses: l,
    inputClasses: o
  };
}
function Ih(e, t) {
  const a = z(!1), n = s(() => e.modelValue !== "" && e.modelValue !== null && e.modelValue !== void 0), l = s(() => e.error && e.errorMessage || e.hint || !!t.error || !!t.hint);
  return {
    isFocused: a,
    hasValue: n,
    hasBottomSlot: l
  };
}
function Oh(e, t, a) {
  return {
    handleInput: (c) => {
      const d = c.target;
      e("update:modelValue", d.value);
    },
    handleFocus: (c) => {
      a.value = !0, e("focus", c);
    },
    handleBlur: (c) => {
      a.value = !1, e("blur", c);
    },
    handleClear: () => {
      var c;
      e("update:modelValue", ""), e("clear"), (c = t.value) == null || c.focus();
    },
    focus: () => {
      var c;
      (c = t.value) == null || c.focus();
    },
    blur: () => {
      var c;
      (c = t.value) == null || c.blur();
    }
  };
}
const Hh = {
  key: 0,
  class: "dss-input__before"
}, Nh = { class: "dss-input__field" }, jh = {
  key: 0,
  class: "dss-input__prepend"
}, Qh = { class: "dss-input__control" }, Uh = ["id", "for"], Kh = ["id", "type", "value", "placeholder", "disabled", "readonly", "tabindex", "aria-label", "aria-labelledby", "aria-describedby", "aria-invalid", "aria-busy", "aria-disabled", "aria-readonly", "aria-required"], Wh = {
  key: 1,
  class: "dss-input__append"
}, Yh = {
  key: 0,
  class: "dss-input__loading",
  role: "status",
  "aria-label": "Loading",
  "aria-live": "polite"
}, Xh = ["aria-label"], Gh = {
  key: 1,
  class: "dss-input__after"
}, Zh = {
  key: 2,
  class: "dss-input__bottom"
}, Jh = ["id"], eb = ["id"], tb = /* @__PURE__ */ he({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = Nt(), i = z(null), r = Math.random().toString(36).substring(2, 9), u = s(() => `dss-input-${r}`), c = s(() => `dss-input-label-${r}`), d = s(() => `dss-input-hint-${r}`), v = s(() => `dss-input-error-${r}`), { isFocused: b, hasValue: m, hasBottomSlot: g } = Ih(n, o), { wrapperClasses: p, labelClasses: k, inputClasses: C } = Eh(n, { isFocused: b, hasValue: m }), { handleInput: y, handleFocus: h, handleBlur: w, handleClear: x, focus: L, blur: M } = Oh(
      l,
      i,
      b
    ), K = s(() => n.stackLabel || !n.label || b.value || m.value ? n.placeholder : ""), X = s(() => n.disabled || n.loading ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(n.tabindex) : 0), A = s(() => {
      const $ = [];
      return n.error && n.errorMessage ? $.push(v.value) : n.hint && $.push(d.value), $.length > 0 ? $.join(" ") : void 0;
    });
    return t({
      focus: L,
      blur: M,
      inputRef: i
    }), ($, D) => (R(), ne("div", {
      class: qt(F(p))
    }, [
      F(o).before ? (R(), ne("div", Hh, [
        ee($.$slots, "before")
      ])) : me("", !0),
      Oe("div", Nh, [
        F(o).prepend ? (R(), ne("div", jh, [
          ee($.$slots, "prepend")
        ])) : me("", !0),
        Oe("div", Qh, [
          e.label || F(o).label ? (R(), ne("label", {
            key: 0,
            id: c.value,
            for: u.value,
            class: qt(F(k))
          }, [
            ee($.$slots, "label", {}, () => [
              ht(Ee(e.label), 1)
            ])
          ], 10, Uh)) : me("", !0),
          Oe("input", pe({
            id: u.value,
            ref_key: "inputRef",
            ref: i,
            type: e.type,
            value: e.modelValue,
            placeholder: K.value,
            disabled: e.disabled || e.loading,
            readonly: e.readonly,
            class: F(C),
            tabindex: X.value,
            "aria-label": e.ariaLabel,
            "aria-labelledby": e.label ? c.value : void 0,
            "aria-describedby": A.value,
            "aria-invalid": e.error ? "true" : void 0,
            "aria-busy": e.loading ? "true" : void 0,
            "aria-disabled": e.disabled ? "true" : void 0,
            "aria-readonly": e.readonly ? "true" : void 0,
            "aria-required": e.required ? "true" : void 0
          }, $.$attrs, {
            onInput: D[0] || (D[0] = //@ts-ignore
            (..._) => F(y) && F(y)(..._)),
            onFocus: D[1] || (D[1] = //@ts-ignore
            (..._) => F(h) && F(h)(..._)),
            onBlur: D[2] || (D[2] = //@ts-ignore
            (..._) => F(w) && F(w)(..._))
          }), null, 16, Kh)
        ]),
        F(o).append || e.clearable || e.loading ? (R(), ne("div", Wh, [
          ee($.$slots, "append"),
          e.loading ? (R(), ne("span", Yh, [...D[4] || (D[4] = [
            Oe("span", {
              class: "dss-input__spinner",
              "aria-hidden": "true"
            }, null, -1)
          ])])) : me("", !0),
          e.clearable && F(m) && !e.loading && !e.disabled && !e.readonly ? (R(), ne("button", {
            key: 1,
            class: "dss-input__clear",
            type: "button",
            tabindex: -1,
            "aria-label": e.clearAriaLabel,
            onClick: D[3] || (D[3] = //@ts-ignore
            (..._) => F(x) && F(x)(..._))
          }, [...D[5] || (D[5] = [
            Oe("span", { "aria-hidden": "true" }, "×", -1)
          ])], 8, Xh)) : me("", !0)
        ])) : me("", !0)
      ]),
      F(o).after ? (R(), ne("div", Gh, [
        ee($.$slots, "after")
      ])) : me("", !0),
      F(g) ? (R(), ne("div", Zh, [
        e.error && e.errorMessage ? (R(), ne("div", {
          key: 0,
          id: v.value,
          class: "dss-input__error",
          role: "alert",
          "aria-live": "assertive"
        }, [
          ee($.$slots, "error", {}, () => [
            ht(Ee(e.errorMessage), 1)
          ])
        ], 8, Jh)) : e.hint ? (R(), ne("div", {
          key: 1,
          id: d.value,
          class: "dss-input__hint"
        }, [
          ee($.$slots, "hint", {}, () => [
            ht(Ee(e.hint), 1)
          ])
        ], 8, eb)) : me("", !0)
      ])) : me("", !0)
    ], 2));
  }
});
function ab(e, { isFocused: t, hasValue: a }) {
  return { wrapperClasses: s(() => [
    // Classe base
    "dss-textarea",
    // Variante visual
    `dss-textarea--${e.variant ?? "outlined"}`,
    // Classes condicionais de estado
    {
      "dss-textarea--focused": t.value,
      "dss-textarea--error": e.error,
      "dss-textarea--disabled": e.disabled,
      "dss-textarea--readonly": e.readonly,
      "dss-textarea--dense": e.dense,
      "dss-textarea--loading": e.loading,
      "dss-textarea--has-value": a.value,
      "dss-textarea--autogrow": e.autogrow,
      [`dss-textarea--brand-${e.brand}`]: !!e.brand
    }
  ]) };
}
function nb(e) {
  const t = z(!1), a = s(() => e.modelValue !== void 0 && e.modelValue !== null && e.modelValue !== "");
  return { isFocused: t, hasValue: a };
}
function lb(e, t, a) {
  function n(u) {
    a.value = !0, e("focus", u);
  }
  function l(u) {
    a.value = !1, e("blur", u);
  }
  function o() {
    var u;
    (u = t.value) == null || u.focus();
  }
  function i() {
    var u;
    (u = t.value) == null || u.blur();
  }
  function r() {
    var u, c;
    return ((c = (u = t.value) == null ? void 0 : u.getNativeElement) == null ? void 0 : c.call(u)) ?? null;
  }
  return { handleFocus: n, handleBlur: l, focus: o, blur: i, getNativeEl: r };
}
const ob = /* @__PURE__ */ he({
  name: "DssTextarea",
  inheritAttrs: !1,
  __name: "DssTextarea.ts",
  props: {
    modelValue: { default: "" },
    variant: { default: "outlined" },
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
    autogrow: { type: Boolean, default: !1 },
    rows: { default: 3 },
    maxHeight: {},
    ariaLabel: {},
    clearAriaLabel: { default: "Clear textarea" },
    tabindex: { default: null }
  },
  emits: ["update:modelValue", "focus", "blur", "clear"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = Nt(), i = z(null), { isFocused: r, hasValue: u } = nb(n), { wrapperClasses: c } = ab(n, { isFocused: r, hasValue: u }), { handleFocus: d, handleBlur: v, focus: b, blur: m, getNativeEl: g } = lb(
      l,
      i,
      r
    ), p = s(() => n.disabled || n.loading ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(String(n.tabindex)) : 0), k = s(() => n.maxHeight ? { "--dss-textarea-max-height": n.maxHeight } : {});
    return t({
      focus: b,
      blur: m,
      get nativeEl() {
        return g();
      }
    }), (C, y) => (R(), qe(F(_i), pe({
      ref_key: "qInputRef",
      ref: i,
      class: F(c),
      style: k.value,
      type: "textarea",
      "model-value": e.modelValue,
      label: e.label,
      "stack-label": e.stackLabel,
      placeholder: e.placeholder,
      hint: e.hint,
      error: e.error,
      "error-message": e.errorMessage,
      disabled: e.disabled,
      readonly: e.readonly,
      loading: e.loading,
      clearable: e.clearable,
      outlined: e.variant === "outlined",
      filled: e.variant === "filled",
      standout: e.variant === "standout",
      borderless: e.variant === "borderless",
      dense: e.dense,
      autogrow: e.autogrow,
      rows: e.rows,
      tabindex: p.value,
      "aria-label": e.ariaLabel || void 0,
      "aria-required": e.required ? "true" : void 0
    }, C.$attrs, {
      "onUpdate:modelValue": y[0] || (y[0] = (h) => l("update:modelValue", String(h ?? ""))),
      onFocus: F(d),
      onBlur: F(v),
      onClear: y[1] || (y[1] = (h) => l("clear"))
    }), Et({ _: 2 }, [
      Aa(F(o), (h, w) => ({
        name: w,
        fn: ve((x) => [
          ee(C.$slots, w, Lt(zt(x ?? {})))
        ])
      }))
    ]), 1040, ["class", "style", "model-value", "label", "stack-label", "placeholder", "hint", "error", "error-message", "disabled", "readonly", "loading", "clearable", "outlined", "filled", "standout", "borderless", "dense", "autogrow", "rows", "tabindex", "aria-label", "aria-required", "onFocus", "onBlur"]));
  }
}), ib = ob;
function rb(e, t) {
  const a = s(() => [
    "dss-field",
    `dss-field--${e.variant ?? "outlined"}`,
    {
      "dss-field--dense": e.size === "sm",
      "dss-field--focused": t.value,
      "dss-field--error": e.error,
      "dss-field--disabled": e.disable,
      "dss-field--readonly": e.readonly,
      "dss-field--loading": e.loading,
      "dss-field--stack-label": e.stackLabel,
      [`dss-field--brand-${e.brand}`]: !!e.brand
    }
  ]), n = s(() => [
    "dss-field__label",
    {
      // Flutua quando focado OU quando o controle interno tem valor (sinalizado externamente)
      "dss-field__label--float": !e.stackLabel && (t.value || e.hasValue),
      "dss-field__label--stack": e.stackLabel
    }
  ]);
  return { rootClasses: a, labelClasses: n };
}
const sb = {
  key: 0,
  class: "dss-field__before"
}, ub = { class: "dss-field__field" }, db = {
  key: 0,
  class: "dss-field__prepend",
  "aria-hidden": "true"
}, cb = {
  key: 1,
  class: "dss-field__prefix",
  "aria-hidden": "true"
}, fb = { class: "dss-field__control" }, vb = ["for"], mb = {
  key: 2,
  class: "dss-field__suffix",
  "aria-hidden": "true"
}, gb = {
  key: 3,
  class: "dss-field__append"
}, hb = {
  key: 0,
  class: "dss-field__loading",
  role: "status",
  "aria-label": "Carregando",
  "aria-live": "polite"
}, bb = {
  key: 1,
  class: "dss-field__after"
}, yb = {
  key: 2,
  class: "dss-field__bottom"
}, pb = /* @__PURE__ */ he({
  name: "DssField",
  inheritAttrs: !1,
  __name: "DssField.ts",
  props: {
    variant: { default: "outlined" },
    size: {},
    brand: {},
    label: {},
    stackLabel: { type: Boolean },
    hasValue: { type: Boolean },
    hint: {},
    error: { type: Boolean },
    errorMessage: {},
    prefix: {},
    suffix: {},
    disable: { type: Boolean },
    readonly: { type: Boolean },
    loading: { type: Boolean },
    fieldId: {}
  },
  setup(e, { expose: t }) {
    const a = e, n = Nt(), l = z(!1);
    function o() {
      a.disable || (l.value = !0);
    }
    function i(C) {
      C.currentTarget.contains(C.relatedTarget) || (l.value = !1);
    }
    const r = Math.random().toString(36).slice(2, 9), u = `dss-field-ctrl-${r}`, c = `dss-field-hint-${r}`, d = `dss-field-error-${r}`, v = `dss-field-label-${r}`, b = s(() => a.fieldId ?? u), { rootClasses: m, labelClasses: g } = rb(a, l), p = s(
      () => a.error && (a.errorMessage || n.error) || !a.error && (a.hint || n.hint)
    ), k = s(() => {
      if (a.error && (a.errorMessage || n.error)) return d;
      if (!a.error && (a.hint || n.hint)) return c;
    });
    return t({ fieldId: b, hintId: c, errorId: d, ariaDescribedby: k }), (C, y) => (R(), ne("div", pe(C.$attrs, {
      class: F(m),
      onFocusin: o,
      onFocusout: i
    }), [
      C.$slots.before ? (R(), ne("div", sb, [
        ee(C.$slots, "before")
      ])) : me("", !0),
      Oe("div", ub, [
        C.$slots.prepend ? (R(), ne("div", db, [
          ee(C.$slots, "prepend")
        ])) : me("", !0),
        e.prefix ? (R(), ne("span", cb, Ee(e.prefix), 1)) : me("", !0),
        Oe("div", fb, [
          e.label || C.$slots.label ? (R(), ne("label", {
            key: 0,
            id: v,
            for: b.value,
            class: qt(F(g))
          }, [
            ee(C.$slots, "label", {}, () => [
              ht(Ee(e.label), 1)
            ])
          ], 10, vb)) : me("", !0),
          ee(C.$slots, "default", {
            fieldId: b.value,
            ariaDescribedby: k.value
          })
        ]),
        e.suffix ? (R(), ne("span", mb, Ee(e.suffix), 1)) : me("", !0),
        C.$slots.append || e.loading ? (R(), ne("div", gb, [
          ee(C.$slots, "append"),
          e.loading ? (R(), ne("span", hb, [...y[0] || (y[0] = [
            Oe("span", {
              class: "dss-field__spinner",
              "aria-hidden": "true"
            }, null, -1)
          ])])) : me("", !0)
        ])) : me("", !0)
      ]),
      C.$slots.after ? (R(), ne("div", bb, [
        ee(C.$slots, "after")
      ])) : me("", !0),
      p.value ? (R(), ne("div", yb, [
        e.error && (e.errorMessage || C.$slots.error) ? (R(), ne("div", {
          key: 0,
          id: d,
          class: "dss-field__error",
          role: "alert",
          "aria-live": "assertive"
        }, [
          ee(C.$slots, "error", {}, () => [
            ht(Ee(e.errorMessage), 1)
          ])
        ])) : !e.error && (e.hint || C.$slots.hint) ? (R(), ne("div", {
          key: 1,
          id: c,
          class: "dss-field__hint"
        }, [
          ee(C.$slots, "hint", {}, () => [
            ht(Ee(e.hint), 1)
          ])
        ])) : me("", !0)
      ])) : me("", !0)
    ], 16));
  }
}), kb = pb;
function Cb(e, t) {
  const a = z(!1), n = z(!1), l = s(() => {
    const i = e.modelValue;
    return i ? Array.isArray(i) ? i.length > 0 : i instanceof File : !1;
  }), o = s(() => e.error && e.errorMessage || !!e.hint || !!t.error || !!t.hint);
  return {
    isFocused: a,
    isDragging: n,
    hasValue: l,
    hasBottomSlot: o
  };
}
function Sb(e, { isFocused: t, hasValue: a, isDragging: n }) {
  const l = s(() => [
    "dss-file",
    `dss-file--${e.variant ?? "outlined"}`,
    {
      "dss-file--focused": t.value,
      "dss-file--error": e.error,
      "dss-file--disabled": e.disabled,
      "dss-file--readonly": e.readonly,
      "dss-file--dense": e.dense,
      "dss-file--filled": a.value,
      "dss-file--dragging": n.value,
      [`dss-file--brand-${e.brand}`]: e.brand
    }
  ]), o = s(() => [
    "dss-file__label",
    {
      "dss-file__label--stack": e.stackLabel,
      "dss-file__label--float": a.value || t.value
    }
  ]);
  return {
    wrapperClasses: l,
    labelClasses: o
  };
}
function wb(e, t, a, n) {
  return {
    handleFocus: (g) => {
      a.value = !0, e("focus", g);
    },
    handleBlur: (g) => {
      a.value = !1, n.value = !1, e("blur", g);
    },
    handleClear: () => {
      e("update:modelValue", null), e("clear");
    },
    handleDragOver: (g) => {
      g.preventDefault(), n.value || (n.value = !0);
    },
    handleDragLeave: (g) => {
      const p = g.currentTarget, k = g.relatedTarget;
      (!k || !p.contains(k)) && (n.value = !1);
    },
    pickFiles: () => {
      var g;
      (g = t.value) == null || g.pickFiles();
    },
    removeAtIndex: (g) => {
      var p;
      (p = t.value) == null || p.removeAtIndex(g);
    },
    removeFile: (g) => {
      var p;
      (p = t.value) == null || p.removeFile(g);
    },
    focus: () => {
      var g, p;
      (p = (g = t.value) == null ? void 0 : g.$el) == null || p.focus();
    },
    blur: () => {
      var g, p;
      (p = (g = t.value) == null ? void 0 : g.$el) == null || p.blur();
    }
  };
}
const xb = { class: "dss-file__prepend" }, _b = { class: "dss-file__append" }, $b = ["aria-label"], qb = {
  class: "dss-file__field",
  "aria-hidden": "true"
}, Bb = {
  key: 1,
  class: "dss-file__drop-hint"
}, Tb = { class: "dss-file__drop-text" }, Mb = {
  key: 2,
  class: "dss-file__value"
}, Ab = {
  key: 0,
  class: "dss-file__file-name"
}, Db = {
  key: 1,
  class: "dss-file__file-name"
}, Lb = {
  key: 0,
  class: "dss-file__drag-overlay",
  "aria-hidden": "true"
}, zb = {
  key: 1,
  class: "dss-file__bottom"
}, Vb = ["id"], Pb = ["id"], Rb = /* @__PURE__ */ he({
  name: "DssFile",
  inheritAttrs: !1,
  __name: "DssFile.ts",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    accept: { default: void 0 },
    maxFiles: { default: void 0 },
    maxFileSize: { default: void 0 },
    variant: { default: "outlined" },
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
    clearable: { type: Boolean, default: !1 },
    ariaLabel: { default: void 0 },
    clearAriaLabel: { default: "Remover arquivo selecionado" },
    tabindex: { default: null }
  },
  emits: ["update:modelValue", "add", "remove", "rejected", "focus", "blur", "clear"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = Nt(), i = z(null), r = Math.random().toString(36).substring(2, 9), u = s(() => `dss-file-hint-${r}`), c = s(() => `dss-file-error-${r}`), { isFocused: d, isDragging: v, hasValue: b, hasBottomSlot: m } = Cb(n, o), { wrapperClasses: g, labelClasses: p } = Sb(n, { isFocused: d, hasValue: b, isDragging: v }), {
      handleFocus: k,
      handleBlur: C,
      handleClear: y,
      handleDragOver: h,
      handleDragLeave: w,
      pickFiles: x,
      removeAtIndex: L,
      removeFile: M,
      focus: K,
      blur: X
    } = wb(l, i, d, v), A = s(() => n.disabled ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(String(n.tabindex)) : 0);
    return t({
      pickFiles: x,
      removeAtIndex: L,
      removeFile: M,
      focus: K,
      blur: X
    }), ($, D) => (R(), ne("div", {
      class: qt(F(g)),
      onDragover: D[6] || (D[6] = //@ts-ignore
      (..._) => F(h) && F(h)(..._)),
      onDragleave: D[7] || (D[7] = //@ts-ignore
      (..._) => F(w) && F(w)(..._))
    }, [
      Mt(F(rv), {
        ref_key: "qFileRef",
        ref: i,
        "model-value": e.modelValue,
        multiple: e.multiple,
        accept: e.accept,
        "max-files": e.maxFiles,
        "max-file-size": e.maxFileSize,
        disable: e.disabled,
        readonly: e.readonly,
        tabindex: A.value,
        "aria-label": e.ariaLabel,
        class: "dss-file__q-file",
        borderless: "",
        "onUpdate:modelValue": D[1] || (D[1] = (_) => l("update:modelValue", _)),
        onAdd: D[2] || (D[2] = (_) => l("add", _)),
        onRemove: D[3] || (D[3] = (_) => l("remove", _)),
        onRejected: D[4] || (D[4] = (_) => l("rejected", _)),
        onFocus: F(k),
        onBlur: F(C)
      }, Et({
        append: ve(() => [
          Oe("div", _b, [
            ee($.$slots, "append"),
            e.clearable && F(b) && !e.disabled && !e.readonly ? (R(), ne("button", {
              key: 0,
              class: "dss-file__clear",
              type: "button",
              tabindex: -1,
              "aria-label": e.clearAriaLabel,
              onClick: D[0] || (D[0] = Nn(
                //@ts-ignore
                (..._) => F(y) && F(y)(..._),
                ["stop"]
              ))
            }, [...D[8] || (D[8] = [
              Oe("span", { "aria-hidden": "true" }, "×", -1)
            ])], 8, $b)) : me("", !0)
          ])
        ]),
        _: 2
      }, [
        F(o).prepend ? {
          name: "prepend",
          fn: ve(() => [
            Oe("div", xb, [
              ee($.$slots, "prepend")
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["model-value", "multiple", "accept", "max-files", "max-file-size", "disable", "readonly", "tabindex", "aria-label", "onFocus", "onBlur"]),
      Oe("div", qb, [
        e.label || F(o)["label-slot"] ? (R(), ne("label", {
          key: 0,
          class: qt(F(p)),
          onClick: D[5] || (D[5] = //@ts-ignore
          (..._) => F(x) && F(x)(..._))
        }, Ee(e.label), 3)) : me("", !0),
        !F(b) && !e.disabled && !e.readonly ? (R(), ne("div", Bb, [
          D[9] || (D[9] = Oe("span", {
            class: "dss-file__drop-icon",
            "aria-hidden": "true"
          }, "📎", -1)),
          Oe("span", Tb, Ee(e.placeholder || "Clique ou arraste arquivos aqui"), 1)
        ])) : me("", !0),
        F(b) ? (R(), ne("div", Mb, [
          Array.isArray(e.modelValue) ? (R(), ne("span", Ab, Ee(e.modelValue.length === 1 ? e.modelValue[0].name : `${e.modelValue.length} arquivos selecionados`), 1)) : (R(), ne("span", Db, Ee(e.modelValue.name), 1))
        ])) : me("", !0)
      ]),
      F(v) ? (R(), ne("div", Lb, [...D[10] || (D[10] = [
        Oe("span", { class: "dss-file__drag-label" }, "Solte os arquivos aqui", -1)
      ])])) : me("", !0),
      F(m) ? (R(), ne("div", zb, [
        e.error && (e.errorMessage || F(o).error) ? (R(), ne("div", {
          key: 0,
          id: c.value,
          class: "dss-file__error",
          role: "alert",
          "aria-live": "assertive"
        }, [
          ee($.$slots, "error", {}, () => [
            ht(Ee(e.errorMessage), 1)
          ])
        ], 8, Vb)) : e.hint || F(o).hint ? (R(), ne("div", {
          key: 1,
          id: u.value,
          class: "dss-file__hint"
        }, [
          ee($.$slots, "hint", {}, () => [
            ht(Ee(e.hint), 1)
          ])
        ], 8, Pb)) : me("", !0)
      ])) : me("", !0)
    ], 34));
  }
}), Fb = Rb;
function Eb(e, t) {
  return {
    chipClasses: s(() => {
      const n = !!(e.label || t.hasDefaultSlot.value), o = !!(e.icon || e.iconRight) && !n;
      let i = "";
      return e.brand ? i = `dss-chip--${e.color}` : e.variant === "flat" || e.variant === "outline" ? i = `text-${e.color}` : i = `bg-${e.color} text-white`, [
        // Classe base
        "dss-chip",
        // Variante visual
        `dss-chip--${e.variant}`,
        // Classes de cor (estrategia baseada em brand)
        i,
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
          "dss-chip--icon-only": o
        }
      ];
    })
  };
}
const Ib = ["tabindex", "aria-label", "aria-selected", "aria-disabled", "data-brand", "onKeydown"], Ob = {
  key: 0,
  class: "dss-chip__icon dss-chip__icon--selected",
  "aria-hidden": "true"
}, Hb = {
  key: 1,
  class: "dss-chip__icon dss-chip__icon--left",
  "aria-hidden": "true"
}, Nb = {
  key: 2,
  class: "dss-chip__label"
}, jb = {
  key: 3,
  class: "dss-chip__icon dss-chip__icon--right",
  "aria-hidden": "true"
}, Qb = ["aria-label", "disabled"], Ub = {
  class: "dss-chip__icon dss-chip__icon--remove",
  "aria-hidden": "true"
}, Kb = {
  key: 5,
  class: "dss-chip__ripple",
  "aria-hidden": "true"
}, Wb = /* @__PURE__ */ he({
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
  setup(e, { emit: t }) {
    const a = e, n = t, l = Nt(), o = s(() => !!l.default), { chipClasses: i } = Eb(a, { hasDefaultSlot: o }), r = s(() => a.icon || ""), u = s(() => a.iconRight || ""), c = s(() => a.iconRemove || "cancel"), d = s(() => a.iconSelected || "check"), v = s(() => a.selected), b = s(() => a.removable && !a.disable), m = s(() => ({})), g = s(() => a.disable ? -1 : a.tabindex !== null && a.tabindex !== void 0 ? typeof a.tabindex == "number" ? a.tabindex : parseInt(a.tabindex) : a.clickable ? 0 : -1);
    function p(C) {
      a.clickable && !a.disable && (n("click", C), a.selected !== void 0 && n("update:selected", !a.selected));
    }
    function k(C) {
      a.disable || n("remove", C);
    }
    return (C, y) => (R(), ne("div", pe({
      class: F(i),
      style: m.value,
      tabindex: g.value,
      "aria-label": e.ariaLabel,
      "aria-selected": e.selected ? "true" : void 0,
      "aria-disabled": e.disable ? "true" : void 0,
      "data-brand": e.brand || void 0,
      role: "option"
    }, C.$attrs, {
      onClick: p,
      onKeydown: [
        wn(p, ["enter"]),
        wn(Nn(p, ["prevent"]), ["space"])
      ]
    }), [
      v.value ? (R(), ne("span", Ob, Ee(d.value), 1)) : me("", !0),
      r.value && !v.value ? (R(), ne("span", Hb, Ee(r.value), 1)) : me("", !0),
      e.label || C.$slots.default ? (R(), ne("span", Nb, [
        ee(C.$slots, "default", {}, () => [
          ht(Ee(e.label), 1)
        ])
      ])) : me("", !0),
      u.value && !b.value ? (R(), ne("span", jb, Ee(u.value), 1)) : me("", !0),
      b.value ? (R(), ne("button", {
        key: 4,
        type: "button",
        class: "dss-chip__remove",
        "aria-label": e.removeAriaLabel,
        disabled: e.disable,
        onClick: Nn(k, ["stop"])
      }, [
        Oe("span", Ub, Ee(c.value), 1)
      ], 8, Qb)) : me("", !0),
      e.ripple && e.clickable ? (R(), ne("span", Kb)) : me("", !0)
    ], 16, Ib));
  }
}), Yb = Wb;
function Xb(e) {
  return {
    badgeClasses: s(() => {
      let a = "";
      return e.brand || (e.outline || e.transparent ? a = `text-${e.color}` : a = `bg-${e.color} text-white`, e.textColor && (a += ` text-${e.textColor}`)), [
        // Classe base
        "dss-badge",
        // Classes de cor (utilitárias DSS)
        a,
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
const Gb = ["aria-label"], Zb = /* @__PURE__ */ he({
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
    const t = e, { badgeClasses: a } = Xb(t), n = s(() => {
      const l = {};
      return t.align && (l.verticalAlign = t.align), l;
    });
    return (l, o) => (R(), ne("div", {
      class: qt(F(a)),
      style: gn(n.value),
      role: "status",
      "aria-label": e.ariaLabel,
      "aria-live": "polite"
    }, [
      ee(l.$slots, "default", {}, () => [
        ht(Ee(e.label), 1)
      ])
    ], 14, Gb));
  }
}), Jb = Zb;
function e0(e) {
  return {
    avatarClasses: s(() => {
      let a = "";
      return e.color && (a = `bg-${e.color} text-white`), e.textColor && (a += ` text-${e.textColor}`), [
        // Classe base
        "dss-avatar",
        // Classes de cor (utilitárias DSS)
        a,
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
const t0 = {
  xs: "16px",
  sm: "20px",
  md: "24px",
  lg: "32px",
  xl: "48px"
}, a0 = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px"
};
function qo(e) {
  return ["xs", "sm", "md", "lg", "xl"].includes(e);
}
function n0(e) {
  const t = s(() => {
    const l = {};
    return e.size && !qo(e.size) && (l.width = e.size, l.height = e.size), e.square ? l.borderRadius = "0" : e.rounded && (l.borderRadius = "var(--dss-radius-md)"), l;
  }), a = s(() => {
    const l = {};
    if (e.size)
      if (qo(e.size))
        l.fontSize = t0[e.size];
      else {
        const o = parseFloat(e.size);
        if (!isNaN(o)) {
          const i = o * 0.5;
          l.fontSize = `${i}px`;
        }
      }
    return l;
  }), n = s(() => {
    const l = {};
    return e.fontSize ? l.fontSize = e.fontSize : e.size && qo(e.size) && (l.fontSize = a0[e.size]), l;
  });
  return {
    avatarStyle: t,
    iconStyle: a,
    contentStyle: n
  };
}
const l0 = ["role", "aria-label"], o0 = ["aria-label"], i0 = /* @__PURE__ */ he({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = z(null), { avatarClasses: i } = e0(n), { avatarStyle: r, iconStyle: u, contentStyle: c } = n0(n), d = (v) => {
      l("click", v);
    };
    return t({
      rootRef: o
    }), (v, b) => (R(), ne("div", {
      ref_key: "rootRef",
      ref: o,
      class: qt(F(i)),
      style: gn(F(r)),
      role: e.ariaLabel ? "img" : void 0,
      "aria-label": e.ariaLabel,
      onClick: d
    }, [
      e.icon ? (R(), ne("span", {
        key: 0,
        class: "dss-avatar__icon material-icons",
        style: gn(F(u)),
        "aria-hidden": "true"
      }, Ee(e.icon), 5)) : me("", !0),
      e.icon ? me("", !0) : (R(), ne("div", {
        key: 1,
        style: gn(F(c)),
        class: "dss-avatar__content"
      }, [
        ee(v.$slots, "default")
      ], 4)),
      e.status ? (R(), ne("span", {
        key: 2,
        class: qt(["dss-avatar__status", `dss-avatar__status--${e.status}`]),
        "aria-label": `Status: ${e.status}`
      }, null, 10, o0)) : me("", !0)
    ], 14, l0));
  }
}), Uo = i0;
function r0(e) {
  return {
    iconClasses: s(() => {
      let a = "";
      return !e.brand && e.color && (a = `text-${e.color}`), [
        // Classe base
        "dss-icon",
        // Classe de tamanho
        `dss-icon--${e.size ?? "md"}`,
        // Classe de cor (utilitaria DSS)
        a,
        // Classes condicionais
        {
          "dss-icon--spin": e.spin,
          "dss-icon--pulse": e.pulse,
          "dss-icon--decorative": e.decorative,
          // Brand
          [`dss-icon--brand-${e.brand}`]: !!e.brand
        }
      ];
    })
  };
}
const s0 = ["aria-hidden", "aria-label", "role"], u0 = /* @__PURE__ */ he({
  name: "DssIcon",
  __name: "DssIcon.ts",
  props: {
    name: {},
    size: { default: "md" },
    color: { default: null },
    brand: { default: null },
    spin: { type: Boolean, default: !1 },
    pulse: { type: Boolean, default: !1 },
    decorative: { type: Boolean, default: !1 },
    ariaLabel: { default: void 0 }
  },
  setup(e) {
    const t = e, { iconClasses: a } = r0(t);
    return (n, l) => {
      const o = lt("q-icon");
      return R(), ne("span", {
        class: qt(F(a)),
        "aria-hidden": e.decorative ? "true" : void 0,
        "aria-label": e.decorative ? void 0 : e.ariaLabel,
        role: e.decorative ? void 0 : "img"
      }, [
        Mt(o, {
          name: e.name,
          class: "dss-icon__inner"
        }, null, 8, ["name"]),
        ee(n.$slots, "default")
      ], 10, s0);
    };
  }
}), Ca = u0;
function d0(e) {
  return { spinnerClasses: s(() => {
    const a = {
      "dss-spinner": !0,
      [`dss-spinner--type-${e.type ?? "standard"}`]: !0,
      [`dss-spinner--size-${e.size ?? "md"}`]: !0
    };
    return e.color && (a[`dss-spinner--color-${e.color}`] = !0), e.brand && (a[`dss-spinner--brand-${e.brand}`] = !0), a;
  }) };
}
const c0 = ["data-brand"], f0 = { class: "dss-spinner__label" }, v0 = /* @__PURE__ */ he({
  name: "DssSpinner",
  inheritAttrs: !1,
  __name: "DssSpinner.ts",
  props: {
    type: { default: "standard" },
    color: { default: "primary" },
    size: { default: "md" },
    thickness: { default: 5 },
    brand: { default: null },
    ariaLabel: { default: "Carregando" }
  },
  setup(e) {
    const t = e, { spinnerClasses: a } = d0(t), n = {
      standard: ia,
      dots: lm,
      ios: fm,
      oval: gm,
      tail: wm,
      rings: Cm,
      pie: bm,
      bars: Zv
    }, l = s(() => n[t.type]), o = s(
      () => t.type === "standard" ? t.thickness : void 0
    );
    return (i, r) => (R(), ne("span", pe(i.$attrs, {
      class: F(a),
      "data-brand": e.brand ?? void 0,
      role: "status",
      "aria-live": "polite"
    }), [
      (R(), qe(Wn(l.value), {
        class: "dss-spinner__inner",
        size: "100%",
        thickness: o.value,
        "aria-hidden": "true"
      }, null, 8, ["thickness"])),
      Oe("span", f0, Ee(e.ariaLabel), 1)
    ], 16, c0));
  }
}), Yl = v0;
function m0(e) {
  return { rootClasses: s(() => [
    "dss-img",
    {
      [`dss-img--radius-${e.radius}`]: e.radius && e.radius !== "none"
    }
  ]) };
}
const g0 = {
  class: "dss-img__loading",
  "aria-hidden": "true"
}, h0 = {
  class: "dss-img__error",
  "aria-hidden": "true"
}, b0 = /* @__PURE__ */ he({
  name: "DssImg",
  inheritAttrs: !1,
  __name: "DssImg.ts",
  props: {
    src: {},
    alt: {},
    decorative: { type: Boolean },
    ratio: {},
    fit: { default: "cover" },
    loading: { default: "lazy" },
    fallbackSrc: {},
    placeholderSrc: {},
    position: {},
    radius: {},
    noTransition: { type: Boolean }
  },
  emits: ["load", "error"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = s(() => a.decorative === !0 ? "" : a.alt !== void 0 ? a.alt : ""), { rootClasses: o } = m0(a);
    function i() {
      n("load");
    }
    function r() {
      n("error");
    }
    return (u, c) => (R(), qe(F(uv), pe(u.$attrs, {
      class: F(o),
      src: e.src,
      alt: l.value,
      ratio: e.ratio,
      fit: e.fit,
      loading: e.loading,
      "error-src": e.fallbackSrc ?? void 0,
      "placeholder-src": e.placeholderSrc ?? void 0,
      position: e.position,
      "no-transition": e.noTransition,
      onLoad: i,
      onError: r
    }), {
      loading: ve(() => [
        ee(u.$slots, "loading", {}, () => [
          Oe("div", g0, [
            Mt(Yl, { size: "sm" })
          ])
        ])
      ]),
      error: ve(() => [
        ee(u.$slots, "error", {}, () => [
          Oe("div", h0, [
            Mt(Ca, { name: "broken_image" })
          ])
        ])
      ]),
      default: ve(() => [
        ee(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "src", "alt", "ratio", "fit", "loading", "error-src", "placeholder-src", "position", "no-transition"]));
  }
}), y0 = b0;
function p0(e) {
  return {
    cardClasses: s(() => [
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
function k0(e, t) {
  return {
    cardAttrs: s(() => {
      const n = { ...t };
      return e.clickable && (n.tabindex = n.tabindex ?? "0", n.role = n.role ?? "article"), n;
    })
  };
}
function C0(e, t) {
  return {
    handleClick: (l) => {
      e.clickable && t("click", l);
    },
    handleKeydown: (l) => {
      e.clickable && t("click", l);
    }
  };
}
function S0(e) {
  return {
    sectionClasses: s(() => [
      // Classe base
      "dss-card-section",
      // Classes condicionais
      {
        "dss-card-section--horizontal": e.horizontal
      }
    ])
  };
}
function w0(e) {
  return {
    actionsClasses: s(() => [
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
const x0 = /* @__PURE__ */ he({
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
  setup(e, { emit: t }) {
    const a = e, n = t, l = ts(), { cardClasses: o } = p0(a), { cardAttrs: i } = k0(a, l), { handleClick: r, handleKeydown: u } = C0(a, n), c = s(() => ({}));
    return (d, v) => (R(), ne("div", pe({
      class: F(o),
      style: c.value
    }, F(i), {
      onClick: v[0] || (v[0] = //@ts-ignore
      (...b) => F(r) && F(r)(...b)),
      onKeydown: [
        v[1] || (v[1] = wn(
          //@ts-ignore
          (...b) => F(u) && F(u)(...b),
          ["enter"]
        )),
        v[2] || (v[2] = wn(Nn(
          //@ts-ignore
          (...b) => F(u) && F(u)(...b),
          ["prevent"]
        ), ["space"]))
      ]
    }), [
      ee(d.$slots, "default", {}, void 0, !0)
    ], 16));
  }
}), Xl = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, l] of t)
    a[n] = l;
  return a;
}, _0 = /* @__PURE__ */ Xl(x0, [["__scopeId", "data-v-017dc787"]]), $0 = /* @__PURE__ */ he({
  name: "DssCardSection",
  inheritAttrs: !1,
  __name: "DssCardSection.ts",
  props: {
    horizontal: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { sectionClasses: a } = S0(t);
    return (n, l) => (R(), ne("div", pe({ class: F(a) }, n.$attrs), [
      ee(n.$slots, "default", {}, void 0, !0)
    ], 16));
  }
}), q0 = /* @__PURE__ */ Xl($0, [["__scopeId", "data-v-8b1a37c3"]]), B0 = /* @__PURE__ */ he({
  name: "DssCardActions",
  inheritAttrs: !1,
  __name: "DssCardActions.ts",
  props: {
    align: { default: "right" },
    vertical: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { actionsClasses: a } = w0(t);
    return (n, l) => (R(), ne("div", pe({ class: F(a) }, n.$attrs), [
      ee(n.$slots, "default", {}, void 0, !0)
    ], 16));
  }
}), T0 = /* @__PURE__ */ Xl(B0, [["__scopeId", "data-v-e04ed18f"]]);
function M0(e) {
  return {
    listClasses: s(() => [
      // Classe base
      "dss-list",
      // Variantes visuais
      {
        "dss-list--bordered": e.bordered,
        "dss-list--padding": e.padding,
        "dss-list--separator": e.separator,
        // Brand
        [`dss-list--brand-${e.brand}`]: !!e.brand
      }
    ])
  };
}
const A0 = ["data-brand", "aria-label", "aria-labelledby"], D0 = /* @__PURE__ */ he({
  name: "DssList",
  inheritAttrs: !1,
  __name: "DssList.ts",
  props: {
    bordered: { type: Boolean, default: !1 },
    padding: { type: Boolean, default: !1 },
    separator: { type: Boolean, default: !1 },
    brand: { default: null },
    ariaLabel: { default: void 0 },
    ariaLabelledby: { default: void 0 }
  },
  setup(e) {
    const t = e, { listClasses: a } = M0(t);
    return (n, l) => (R(), ne("div", pe({
      class: F(a),
      "data-brand": t.brand || void 0,
      role: "list",
      "aria-label": t.ariaLabel,
      "aria-labelledby": t.ariaLabelledby
    }, n.$attrs), [
      ee(n.$slots, "default")
    ], 16, A0));
  }
});
function L0(e) {
  return {
    itemClasses: s(() => {
      let a = "";
      return !e.brand && e.color && (a = `text-${e.color}`), [
        // Classe base
        "dss-item",
        // Classe de densidade
        `dss-item--${e.density ?? "default"}`,
        // Classe de cor (utilitaria DSS)
        a,
        // Classes condicionais
        {
          "dss-item--clickable": e.clickable,
          "dss-item--disabled": e.disabled,
          "dss-item--active": e.active,
          "dss-item--inset": e.inset,
          "dss-item--divider": e.divider,
          "dss-item--multiline": !!e.caption,
          // Brand
          [`dss-item--brand-${e.brand}`]: !!e.brand
        }
      ];
    })
  };
}
const z0 = ["role", "tabindex", "aria-label", "aria-disabled", "data-brand", "onKeydown"], V0 = ["aria-hidden"], P0 = { class: "dss-item__content" }, R0 = {
  key: 0,
  class: "dss-item__label"
}, F0 = {
  key: 1,
  class: "dss-item__caption"
}, E0 = ["aria-hidden"], I0 = /* @__PURE__ */ he({
  name: "DssItem",
  inheritAttrs: !1,
  __name: "DssItem.ts",
  props: {
    label: { default: "" },
    caption: { default: "" },
    clickable: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !1 },
    density: { default: "default" },
    color: { default: "primary" },
    inset: { type: Boolean, default: !1 },
    divider: { type: Boolean, default: !1 },
    brand: { default: null },
    ariaLabel: { default: void 0 },
    tabindex: { default: null },
    leadingDecorative: { type: Boolean, default: !1 },
    trailingDecorative: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const a = e, n = t, { itemClasses: l } = L0(a), o = s(() => a.clickable && a.disabled ? -1 : a.tabindex !== null && a.tabindex !== void 0 ? typeof a.tabindex == "number" ? a.tabindex : parseInt(a.tabindex) : a.clickable ? 0 : void 0);
    function i(r) {
      a.clickable && !a.disabled && n("click", r);
    }
    return (r, u) => (R(), ne("div", pe({
      class: F(l),
      role: e.clickable ? "button" : "listitem",
      tabindex: o.value,
      "aria-label": e.ariaLabel,
      "aria-disabled": e.clickable && e.disabled ? "true" : void 0,
      "data-brand": e.brand || void 0
    }, r.$attrs, {
      onClick: i,
      onKeydown: [
        wn(i, ["enter"]),
        wn(Nn(i, ["prevent"]), ["space"])
      ]
    }), [
      r.$slots.leading ? (R(), ne("div", {
        key: 0,
        class: "dss-item__leading",
        "aria-hidden": e.leadingDecorative ? "true" : void 0
      }, [
        ee(r.$slots, "leading")
      ], 8, V0)) : me("", !0),
      Oe("div", P0, [
        ee(r.$slots, "default", {}, () => [
          e.label ? (R(), ne("span", R0, Ee(e.label), 1)) : me("", !0),
          e.caption ? (R(), ne("span", F0, Ee(e.caption), 1)) : me("", !0)
        ])
      ]),
      r.$slots.trailing ? (R(), ne("div", {
        key: 1,
        class: "dss-item__trailing",
        "aria-hidden": e.trailingDecorative ? "true" : void 0
      }, [
        ee(r.$slots, "trailing")
      ], 8, E0)) : me("", !0)
    ], 16, z0));
  }
}), O0 = I0;
function H0(e) {
  return { itemLabelClasses: s(() => [
    "dss-item-label",
    {
      "dss-item-label--header": e.header,
      "dss-item-label--caption": e.caption,
      "dss-item-label--overline": e.overline,
      "dss-item-label--lines": !!e.lines
    }
  ]) };
}
const N0 = /* @__PURE__ */ he({
  name: "DssItemLabel",
  inheritAttrs: !1,
  __name: "DssItemLabel.ts",
  props: {
    header: { type: Boolean, default: !1 },
    caption: { type: Boolean, default: !1 },
    overline: { type: Boolean, default: !1 },
    lines: { default: void 0 }
  },
  setup(e) {
    const t = e, { itemLabelClasses: a } = H0(t);
    return (n, l) => {
      const o = lt("q-item-label");
      return R(), qe(o, pe({
        class: F(a),
        header: t.header,
        caption: t.caption,
        overline: t.overline,
        lines: t.lines
      }, n.$attrs), {
        default: ve(() => [
          ee(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "header", "caption", "overline", "lines"]);
    };
  }
}), j0 = N0;
function Q0(e) {
  return { itemSectionClasses: s(() => [
    "dss-item-section",
    {
      "dss-item-section--avatar": e.avatar,
      "dss-item-section--thumbnail": e.thumbnail,
      "dss-item-section--side": e.side,
      "dss-item-section--top": e.top,
      "dss-item-section--nowrap": e.noWrap
    }
  ]) };
}
const U0 = /* @__PURE__ */ he({
  name: "DssItemSection",
  inheritAttrs: !1,
  __name: "DssItemSection.ts",
  props: {
    avatar: { type: Boolean, default: !1 },
    thumbnail: { type: Boolean, default: !1 },
    side: { type: Boolean, default: !1 },
    top: { type: Boolean, default: !1 },
    noWrap: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { itemSectionClasses: a } = Q0(t);
    return (n, l) => {
      const o = lt("q-item-section");
      return R(), qe(o, pe({
        class: F(a),
        avatar: t.avatar,
        thumbnail: t.thumbnail,
        side: t.side,
        top: t.top,
        "no-wrap": t.noWrap
      }, n.$attrs), {
        default: ve(() => [
          ee(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "avatar", "thumbnail", "side", "top", "no-wrap"]);
    };
  }
});
function K0(e) {
  return {
    rootClasses: s(() => [
      "dss-markup-table",
      {
        // Density variants
        "dss-markup-table--compact": e.density === "compact",
        "dss-markup-table--comfortable": e.density === "comfortable",
        // Brand
        [`dss-markup-table--brand-${e.brand}`]: !!e.brand
      }
    ])
  };
}
const W0 = {
  name: "DssMarkupTable",
  inheritAttrs: !1
}, Y0 = /* @__PURE__ */ he({
  ...W0,
  props: {
    density: { default: "standard" },
    flat: { type: Boolean },
    bordered: { type: Boolean },
    separator: { default: "horizontal" },
    square: { type: Boolean },
    wrapCells: { type: Boolean },
    brand: { default: null }
  },
  setup(e) {
    const t = e, { rootClasses: a } = K0(t), n = s(() => t.density === "compact");
    return (l, o) => {
      const i = lt("q-markup-table");
      return R(), qe(i, pe(l.$attrs, {
        class: F(a),
        dense: n.value,
        flat: e.flat,
        bordered: e.bordered,
        separator: e.separator,
        square: e.square,
        "wrap-cells": e.wrapCells
      }), {
        default: ve(() => [
          ee(l.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "dense", "flat", "bordered", "separator", "square", "wrap-cells"]);
    };
  }
}), X0 = Y0;
function G0(e) {
  return { treeClasses: s(() => [
    "dss-tree",
    e.dense && "dss-tree--dense"
  ].filter(Boolean)) };
}
const Z0 = {
  name: "DssTree",
  inheritAttrs: !1
}, J0 = /* @__PURE__ */ he({
  ...Z0,
  props: {
    nodes: {},
    nodeKey: { default: "id" },
    labelKey: { default: "label" },
    childrenKey: { default: "children" },
    selected: {},
    expanded: {},
    ticked: {},
    accordion: { type: Boolean },
    noConnectors: { type: Boolean },
    defaultExpandAll: { type: Boolean },
    filter: {},
    filterMethod: {},
    tickStrategy: { default: "none" },
    noNodesLabel: { default: "Nenhum nó disponível" },
    noResultsLabel: { default: "Nenhum resultado para o filtro aplicado" },
    iconSize: {},
    dense: { type: Boolean }
  },
  emits: ["update:selected", "update:expanded", "update:ticked", "lazy-load", "after-show", "after-hide"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, { treeClasses: o } = G0(n), i = z();
    return t({
      /** Retorna um nó pelo seu valor de chave */
      getNodeByKey: (r) => {
        var u;
        return (u = i.value) == null ? void 0 : u.getNodeByKey(r);
      },
      /** Retorna todos os nós atualmente marcados (ticked) */
      getTickedNodes: () => {
        var r;
        return (r = i.value) == null ? void 0 : r.getTickedNodes();
      },
      /** Retorna todos os nós atualmente expandidos */
      getExpandedNodes: () => {
        var r;
        return (r = i.value) == null ? void 0 : r.getExpandedNodes();
      },
      /** Verifica se um nó está expandido */
      isExpanded: (r) => {
        var u;
        return (u = i.value) == null ? void 0 : u.isExpanded(r);
      },
      /** Verifica se um nó está marcado */
      isTicked: (r) => {
        var u;
        return (u = i.value) == null ? void 0 : u.isTicked(r);
      },
      /** Expande todos os nós */
      expandAll: () => {
        var r;
        return (r = i.value) == null ? void 0 : r.expandAll();
      },
      /** Colapsa todos os nós */
      collapseAll: () => {
        var r;
        return (r = i.value) == null ? void 0 : r.collapseAll();
      },
      /** Define programaticamente o estado de expansão de um nó */
      setExpanded: (r, u) => {
        var c;
        return (c = i.value) == null ? void 0 : c.setExpanded(r, u);
      },
      /** Define programaticamente o estado de marcação de um nó */
      setTicked: (r, u) => {
        var c;
        return (c = i.value) == null ? void 0 : c.setTicked(r, u);
      }
    }), (r, u) => {
      const c = lt("q-tree");
      return R(), qe(c, pe({
        ref_key: "qTreeRef",
        ref: i
      }, r.$attrs, {
        class: F(o),
        nodes: n.nodes,
        "node-key": n.nodeKey,
        "label-key": n.labelKey,
        "children-key": n.childrenKey,
        selected: n.selected,
        expanded: n.expanded,
        ticked: n.ticked,
        accordion: n.accordion,
        "no-connectors": n.noConnectors,
        "default-expand-all": n.defaultExpandAll,
        filter: n.filter,
        "filter-method": n.filterMethod,
        "tick-strategy": n.tickStrategy !== "none" ? n.tickStrategy : void 0,
        "no-nodes-label": n.noNodesLabel,
        "no-results-label": n.noResultsLabel,
        "icon-size": n.iconSize,
        dense: n.dense,
        "onUpdate:selected": u[0] || (u[0] = (d) => l("update:selected", d)),
        "onUpdate:expanded": u[1] || (u[1] = (d) => l("update:expanded", d)),
        "onUpdate:ticked": u[2] || (u[2] = (d) => l("update:ticked", d)),
        onLazyLoad: u[3] || (u[3] = (d) => l("lazy-load", d)),
        onAfterShow: u[4] || (u[4] = (d) => l("after-show", d)),
        onAfterHide: u[5] || (u[5] = (d) => l("after-hide", d))
      }), Et({ _: 2 }, [
        Aa(r.$slots, (d, v) => ({
          name: v,
          fn: ve((b) => [
            ee(r.$slots, v, Lt(zt(b || {})))
          ])
        }))
      ]), 1040, ["class", "nodes", "node-key", "label-key", "children-key", "selected", "expanded", "ticked", "accordion", "no-connectors", "default-expand-all", "filter", "filter-method", "tick-strategy", "no-nodes-label", "no-results-label", "icon-size", "dense"]);
    };
  }
}), ey = J0;
function ty(e) {
  return { rootClasses: s(() => [
    "dss-linear-progress",
    `dss-linear-progress--size-${e.size ?? "md"}`,
    `dss-linear-progress--color-${e.color ?? "primary"}`,
    {
      [`dss-linear-progress--brand-${e.brand}`]: !!e.brand,
      "dss-linear-progress--indeterminate": e.indeterminate,
      "dss-linear-progress--stripe": e.stripe,
      "dss-linear-progress--disabled": e.disable
    }
  ]) };
}
const ay = ["data-brand"], ny = /* @__PURE__ */ he({
  name: "DssLinearProgress",
  inheritAttrs: !1,
  __name: "DssLinearProgress.ts",
  props: {
    value: {},
    indeterminate: { type: Boolean },
    reverse: { type: Boolean },
    color: { default: "primary" },
    size: { default: "md" },
    brand: {},
    stripe: { type: Boolean },
    disable: { type: Boolean }
  },
  setup(e) {
    const t = e, { rootClasses: a } = ty(t), n = {
      xs: "var(--dss-spacing-1)",
      //  4px
      sm: "var(--dss-spacing-2)",
      //  8px
      md: "var(--dss-spacing-3)",
      // 12px — padrão
      lg: "var(--dss-spacing-4)",
      // 16px
      xl: "var(--dss-spacing-6)"
      // 24px
    }, l = s(() => n[t.size ?? "md"]), o = s(
      () => t.indeterminate ? void 0 : t.value
    );
    return (i, r) => (R(), ne("div", pe(i.$attrs, {
      class: F(a),
      "data-brand": e.brand ?? void 0
    }), [
      Mt(F(Vu), {
        class: "dss-linear-progress__inner",
        size: l.value,
        value: o.value,
        indeterminate: e.indeterminate,
        reverse: e.reverse,
        stripe: e.stripe,
        "animation-speed": 250
      }, null, 8, ["size", "value", "indeterminate", "reverse", "stripe"])
    ], 16, ay));
  }
}), md = ny;
function ly(e) {
  return { rootClasses: s(() => [
    "dss-circular-progress",
    `dss-circular-progress--size-${e.size ?? "md"}`,
    `dss-circular-progress--color-${e.color ?? "primary"}`,
    {
      [`dss-circular-progress--brand-${e.brand}`]: !!e.brand,
      "dss-circular-progress--indeterminate": e.indeterminate,
      "dss-circular-progress--disabled": e.disable
    }
  ]) };
}
const oy = ["data-brand"], iy = /* @__PURE__ */ he({
  name: "DssCircularProgress",
  inheritAttrs: !1,
  __name: "DssCircularProgress.ts",
  props: {
    value: {},
    min: { default: 0 },
    max: { default: 100 },
    color: { default: "primary" },
    size: { default: "md" },
    brand: {},
    indeterminate: { type: Boolean },
    thickness: { default: 0.2 },
    angle: { default: 0 },
    reverse: { type: Boolean },
    instantFeedback: { type: Boolean },
    disable: { type: Boolean }
  },
  setup(e) {
    const t = e, { rootClasses: a } = ly(t), n = {
      xs: "var(--dss-spacing-10)",
      //  40px
      sm: "var(--dss-spacing-12)",
      //  48px
      md: "var(--dss-spacing-16)",
      //  64px — padrão
      lg: "var(--dss-spacing-20)",
      //  80px
      xl: "var(--dss-spacing-24)"
      //  96px
    }, l = s(() => n[t.size ?? "md"]), o = s(
      () => t.indeterminate ? void 0 : t.value
    ), i = Nt(), r = s(() => !!i.default);
    return (u, c) => (R(), ne("div", pe(u.$attrs, {
      class: F(a),
      "data-brand": e.brand ?? void 0
    }), [
      Mt(F(yi), {
        class: "dss-circular-progress__inner",
        size: l.value,
        value: o.value,
        min: e.min,
        max: e.max,
        thickness: e.thickness,
        angle: e.angle,
        indeterminate: e.indeterminate,
        reverse: e.reverse,
        "instant-feedback": e.instantFeedback,
        "show-value": r.value,
        "animation-speed": 250
      }, {
        default: ve(() => [
          ee(u.$slots, "default")
        ]),
        _: 3
      }, 8, ["size", "value", "min", "max", "thickness", "angle", "indeterminate", "reverse", "instant-feedback", "show-value"])
    ], 16, oy));
  }
}), ry = iy, sy = {
  rect: "rect",
  text: "text",
  circle: "circle",
  heading: "rect",
  avatar: "circle"
}, uy = {
  wave: "wave",
  pulse: "pulse",
  none: "none"
};
function dy(e) {
  const t = s(() => e.type ?? "rect"), a = s(() => e.animation ?? "wave"), n = s(() => e.lines ?? 1), l = s(
    () => t.value === "text" && n.value > 1
  ), o = s(() => sy[t.value] ?? "rect"), i = s(() => uy[a.value] ?? "wave"), r = s(() => {
    const d = l.value ? n.value : 1;
    return Array.from({ length: d }, (v, b) => ({
      width: l.value && b === d - 1 ? "70%" : e.width
    }));
  }), u = s(() => [
    "dss-skeleton",
    `dss-skeleton--type-${t.value}`,
    `dss-skeleton--anim-${a.value}`,
    {
      [`dss-skeleton--brand-${e.brand}`]: !!e.brand,
      "dss-skeleton--multi": l.value
    }
  ]), c = s(() => {
    const d = {};
    return e.radius && (d["--dss-skeleton-radius"] = `var(${e.radius})`), d;
  });
  return {
    rootClasses: u,
    rootStyle: c,
    quasarType: o,
    quasarAnimation: i,
    skeletonItems: r
  };
}
const cy = ["data-brand"], fy = /* @__PURE__ */ he({
  name: "DssSkeleton",
  inheritAttrs: !1,
  __name: "DssSkeleton.ts",
  props: {
    type: { default: "rect" },
    width: {},
    height: {},
    lines: {},
    animation: { default: "wave" },
    bordered: { type: Boolean },
    tag: {},
    radius: {},
    brand: {}
  },
  setup(e) {
    const t = e, { rootClasses: a, rootStyle: n, quasarType: l, quasarAnimation: o, skeletonItems: i } = dy(t);
    return (r, u) => (R(), ne("div", pe({ "aria-hidden": "true" }, r.$attrs, {
      class: F(a),
      style: F(n),
      "data-brand": e.brand ?? void 0
    }), [
      (R(!0), ne(hn, null, Aa(F(i), (c, d) => (R(), qe(F(Kv), {
        key: d,
        class: "dss-skeleton__item",
        type: F(l),
        animation: F(o),
        bordered: e.bordered,
        width: c.width,
        height: e.height,
        tag: e.tag
      }, null, 8, ["type", "animation", "bordered", "width", "height", "tag"]))), 128))
    ], 16, cy));
  }
}), vy = fy;
function my(e) {
  return { rootClasses: s(() => [
    "dss-inner-loading",
    `dss-inner-loading--color-${e.color ?? "primary"}`,
    `dss-inner-loading--size-${e.size ?? "md"}`,
    {
      [`dss-inner-loading--brand-${e.brand}`]: !!e.brand,
      "dss-inner-loading--has-label": !!e.label
    }
  ]) };
}
const gy = {
  key: 0,
  class: "dss-inner-loading__label"
}, hy = /* @__PURE__ */ he({
  name: "DssInnerLoading",
  inheritAttrs: !1,
  __name: "DssInnerLoading.ts",
  props: {
    showing: { type: Boolean },
    color: { default: "primary" },
    size: { default: "md" },
    label: {},
    delay: {},
    brand: {}
  },
  setup(e) {
    const t = e, { rootClasses: a } = my(t);
    return (n, l) => (R(), qe(F(cv), pe({
      role: "status",
      "aria-live": "polite",
      class: F(a),
      "data-brand": e.brand ?? void 0,
      showing: e.showing,
      delay: e.delay
    }, n.$attrs), {
      default: ve(() => [
        ee(n.$slots, "default", {}, () => [
          Mt(Yl, {
            size: e.size,
            "aria-hidden": "true"
          }, null, 8, ["size"]),
          e.label ? (R(), ne("span", gy, Ee(e.label), 1)) : me("", !0)
        ])
      ]),
      _: 3
    }, 16, ["class", "data-brand", "showing", "delay"]));
  }
}), by = hy;
function yy(e) {
  return { rootClasses: s(() => [
    "dss-ajax-bar",
    `dss-ajax-bar--pos-${e.position ?? "top"}`,
    {
      [`dss-ajax-bar--brand-${e.brand}`]: !!e.brand
    }
  ]) };
}
const py = /* @__PURE__ */ he({
  name: "DssAjaxBar",
  inheritAttrs: !1,
  __name: "DssAjaxBar.ts",
  props: {
    position: {},
    size: {},
    skipHijack: { type: Boolean },
    reverse: { type: Boolean },
    hijackFilter: { type: Function },
    brand: {}
  },
  emits: ["start", "stop"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, { rootClasses: o } = yy(n), i = z(null);
    return t({
      start: (r) => {
        var u;
        return (u = i.value) == null ? void 0 : u.start(r);
      },
      stop: () => {
        var r;
        return (r = i.value) == null ? void 0 : r.stop();
      },
      increment: (r) => {
        var u;
        return (u = i.value) == null ? void 0 : u.increment(r);
      },
      setProgress: (r) => {
        var u;
        return (u = i.value) == null ? void 0 : u.setProgress(r);
      }
    }), (r, u) => (R(), qe(F(vs), pe({
      ref_key: "qAjaxBarRef",
      ref: i
    }, r.$attrs, {
      class: F(o),
      position: e.position,
      size: e.size,
      "skip-hijack": e.skipHijack ?? !1,
      reverse: e.reverse ?? !1,
      "hijack-filter": e.hijackFilter,
      color: "primary",
      onStart: u[0] || (u[0] = (c) => l("start")),
      onStop: u[1] || (u[1] = (c) => l("stop"))
    }), null, 16, ["class", "position", "size", "skip-hijack", "reverse", "hijack-filter"]));
  }
}), ky = py;
function Cy(e) {
  return {
    tooltipClasses: s(() => {
      let a = "";
      return e.brand || (a = `bg-${e.color} text-white`, e.textColor && (a += ` text-${e.textColor}`)), [
        // Classe base
        "dss-tooltip",
        // Classes de cor (utilitarias DSS)
        a,
        // Classes condicionais
        {
          "dss-tooltip--multi-line": e.multiLine,
          // Brand
          [`dss-tooltip--brand-${e.brand}`]: !!e.brand
        }
      ];
    })
  };
}
const Sy = ["aria-label"], wy = /* @__PURE__ */ he({
  name: "DssTooltip",
  __name: "DssTooltip.ts",
  props: {
    label: { default: "" },
    color: { default: "dark" },
    textColor: { default: null },
    multiLine: { type: Boolean, default: !1 },
    visible: { type: Boolean, default: !1 },
    brand: { default: null },
    ariaLabel: { default: void 0 }
  },
  setup(e) {
    const t = e, { tooltipClasses: a } = Cy(t);
    return (n, l) => aa((R(), ne("div", {
      class: qt(F(a)),
      role: "tooltip",
      "aria-label": e.ariaLabel
    }, [
      ee(n.$slots, "default", {}, () => [
        ht(Ee(e.label), 1)
      ])
    ], 10, Sy)), [
      [Wo, e.visible]
    ]);
  }
}), xy = wy;
function _y(e) {
  return {
    menuClasses: s(() => [
      "dss-menu"
    ])
  };
}
const $y = /* @__PURE__ */ he({
  name: "DssMenu",
  inheritAttrs: !1,
  __name: "DssMenu.ts",
  props: {
    modelValue: { type: Boolean, default: !1 },
    fit: { type: Boolean, default: !1 },
    cover: { type: Boolean, default: !1 },
    anchor: { default: void 0 },
    self: { default: void 0 },
    offset: { default: void 0 }
  },
  emits: ["update:modelValue", "show", "hide"],
  setup(e, { emit: t }) {
    const a = e, n = t, { menuClasses: l } = _y();
    return (o, i) => {
      const r = lt("q-menu");
      return R(), qe(r, pe({
        class: F(l),
        "model-value": a.modelValue,
        fit: a.fit,
        cover: a.cover,
        anchor: a.anchor,
        self: a.self,
        offset: a.offset
      }, o.$attrs, {
        "onUpdate:modelValue": i[0] || (i[0] = (u) => n("update:modelValue", u)),
        onShow: i[1] || (i[1] = (u) => n("show", u)),
        onHide: i[2] || (i[2] = (u) => n("hide", u))
      }), {
        default: ve(() => [
          ee(o.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "model-value", "fit", "cover", "anchor", "self", "offset"]);
    };
  }
}), qy = $y;
function By(e) {
  return {
    popupProxyClasses: s(() => ["dss-popup-proxy"])
  };
}
const Ty = /* @__PURE__ */ he({
  name: "DssPopupProxy",
  inheritAttrs: !1,
  __name: "DssPopupProxy.ts",
  props: {
    open: { type: Boolean },
    breakpoint: { default: 450 },
    target: { type: [String, Boolean, null] },
    noParentEvent: { type: Boolean },
    contextMenu: { type: Boolean },
    persistent: { type: Boolean },
    noFocus: { type: Boolean },
    noRefocus: { type: Boolean },
    autoClose: { type: Boolean },
    anchor: {},
    self: {},
    offset: {},
    fit: { type: Boolean },
    cover: { type: Boolean },
    maxHeight: {},
    maxWidth: {},
    transitionShow: {},
    transitionHide: {},
    scrollTarget: {}
  },
  emits: ["update:open", "beforeShow", "show", "beforeHide", "hide"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, { popupProxyClasses: o } = By(), i = z();
    return t({
      /** Abre o popup programaticamente */
      show: (r) => {
        var u;
        return (u = i.value) == null ? void 0 : u.show(r);
      },
      /** Fecha o popup programaticamente */
      hide: (r) => {
        var u;
        return (u = i.value) == null ? void 0 : u.hide(r);
      },
      /** Alterna a visibilidade do popup programaticamente */
      toggle: (r) => {
        var u;
        return (u = i.value) == null ? void 0 : u.toggle(r);
      },
      /** Referência ao componente atual renderizado (QMenu ou QDialog) */
      get currentComponent() {
        var r;
        return (r = i.value) == null ? void 0 : r.currentComponent;
      }
    }), (r, u) => {
      const c = lt("q-popup-proxy");
      return R(), qe(c, pe({
        ref_key: "proxyRef",
        ref: i,
        class: F(o),
        "model-value": n.open,
        breakpoint: n.breakpoint,
        target: n.target,
        "no-parent-event": n.noParentEvent,
        "context-menu": n.contextMenu,
        persistent: n.persistent,
        "no-focus": n.noFocus,
        "no-refocus": n.noRefocus,
        "auto-close": n.autoClose,
        anchor: n.anchor,
        self: n.self,
        offset: n.offset,
        fit: n.fit,
        cover: n.cover,
        "max-height": n.maxHeight,
        "max-width": n.maxWidth,
        "transition-show": n.transitionShow,
        "transition-hide": n.transitionHide,
        "scroll-target": n.scrollTarget
      }, r.$attrs, {
        "onUpdate:modelValue": u[0] || (u[0] = (d) => l("update:open", d)),
        onBeforeShow: u[1] || (u[1] = (d) => l("beforeShow", d)),
        onShow: u[2] || (u[2] = (d) => l("show", d)),
        onBeforeHide: u[3] || (u[3] = (d) => l("beforeHide", d)),
        onHide: u[4] || (u[4] = (d) => l("hide", d))
      }), {
        default: ve(() => [
          ee(r.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "model-value", "breakpoint", "target", "no-parent-event", "context-menu", "persistent", "no-focus", "no-refocus", "auto-close", "anchor", "self", "offset", "fit", "cover", "max-height", "max-width", "transition-show", "transition-hide", "scroll-target"]);
    };
  }
}), My = Ty;
function Ay(e) {
  return { layoutClasses: s(() => [
    "dss-layout",
    {
      "dss-layout--container": e.container
    }
  ]) };
}
const Dy = /* @__PURE__ */ he({
  name: "DssLayout",
  inheritAttrs: !1,
  __name: "DssLayout.ts",
  props: {
    view: { default: "hHh lpR fFf" },
    container: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { layoutClasses: a } = Ay(t);
    return (n, l) => {
      const o = lt("q-layout");
      return R(), qe(o, pe({
        class: F(a),
        view: t.view,
        container: t.container
      }, n.$attrs), {
        default: ve(() => [
          ee(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "view", "container"]);
    };
  }
});
function Ly(e) {
  return { pageClasses: s(() => [
    "dss-page",
    {
      "dss-page--padding": e.padding
    }
  ]) };
}
const zy = /* @__PURE__ */ he({
  name: "DssPage",
  inheritAttrs: !1,
  __name: "DssPage.ts",
  props: {
    padding: { type: Boolean, default: !1 },
    styleFn: {}
  },
  setup(e) {
    const t = e, { pageClasses: a } = Ly(t);
    return (n, l) => {
      const o = lt("q-page");
      return R(), qe(o, pe({
        class: F(a),
        role: "main",
        "style-fn": t.styleFn
      }, n.$attrs), {
        default: ve(() => [
          ee(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "style-fn"]);
    };
  }
}), Vy = zy;
function Py() {
  return { pageContainerClasses: s(() => ({
    "dss-page-container": !0
  })) };
}
const Ry = /* @__PURE__ */ he({
  name: "DssPageContainer",
  inheritAttrs: !1,
  __name: "DssPageContainer.ts",
  setup(e) {
    const { pageContainerClasses: t } = Py();
    return (a, n) => {
      const l = lt("q-page-container");
      return R(), qe(l, pe({ class: F(t) }, a.$attrs), {
        default: ve(() => [
          ee(a.$slots, "default")
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
}), Fy = Ry;
function Ey(e) {
  return { headerClasses: s(() => [
    "dss-header",
    {
      "dss-header--elevated": e.elevated,
      "dss-header--bordered": e.bordered
    }
  ]) };
}
const Iy = /* @__PURE__ */ he({
  name: "DssHeader",
  inheritAttrs: !1,
  __name: "DssHeader.ts",
  props: {
    elevated: { type: Boolean, default: !1 },
    bordered: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { headerClasses: a } = Ey(t);
    return (n, l) => {
      const o = lt("q-header");
      return R(), qe(o, pe({ class: F(a) }, n.$attrs), {
        default: ve(() => [
          ee(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
});
function Oy(e) {
  return { footerClasses: s(() => [
    "dss-footer",
    {
      "dss-footer--elevated": e.elevated,
      "dss-footer--bordered": e.bordered
    }
  ]) };
}
const Hy = /* @__PURE__ */ he({
  name: "DssFooter",
  inheritAttrs: !1,
  __name: "DssFooter.ts",
  props: {
    elevated: { type: Boolean, default: !1 },
    bordered: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { footerClasses: a } = Oy(t);
    return (n, l) => {
      const o = lt("q-footer");
      return R(), qe(o, pe({ class: F(a) }, n.$attrs), {
        default: ve(() => [
          ee(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
});
function Ny(e) {
  return { drawerClasses: s(() => [
    "dss-drawer",
    `dss-drawer--${e.side ?? "left"}`,
    {
      "dss-drawer--elevated": e.elevated,
      "dss-drawer--bordered": e.bordered,
      "dss-drawer--mini": e.mini,
      "dss-drawer--overlay": e.overlay
    }
  ]) };
}
const jy = /* @__PURE__ */ he({
  name: "DssDrawer",
  inheritAttrs: !1,
  __name: "DssDrawer.ts",
  props: {
    modelValue: { type: Boolean, default: !0 },
    side: { default: "left" },
    overlay: { type: Boolean, default: !1 },
    elevated: { type: Boolean, default: !1 },
    bordered: { type: Boolean, default: !1 },
    mini: { type: Boolean, default: !1 },
    width: { default: 256 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = ts(), { drawerClasses: o } = Ny(a), i = s(() => ({
      role: "navigation",
      ...l
    }));
    function r(u) {
      n("update:modelValue", u);
    }
    return (u, c) => {
      const d = lt("q-drawer");
      return R(), qe(d, pe({ class: F(o) }, i.value, {
        "model-value": a.modelValue,
        side: a.side,
        overlay: a.overlay,
        mini: a.mini,
        width: a.width,
        behavior: "default",
        "onUpdate:modelValue": r
      }), {
        default: ve(() => [
          ee(u.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "model-value", "side", "overlay", "mini", "width"]);
    };
  }
});
function Qy(e) {
  return { toolbarClasses: s(() => [
    "dss-toolbar",
    {
      "dss-toolbar--inset": e.inset,
      [`dss-toolbar--brand-${e.brand}`]: !!e.brand
    }
  ]) };
}
const Uy = /* @__PURE__ */ he({
  name: "DssToolbar",
  inheritAttrs: !1,
  __name: "DssToolbar.ts",
  props: {
    inset: { type: Boolean, default: !1 },
    brand: { default: void 0 }
  },
  setup(e) {
    const t = e, { toolbarClasses: a } = Qy(t), n = s(() => t.brand ? { "data-brand": t.brand } : {});
    return (l, o) => {
      const i = lt("q-toolbar");
      return R(), qe(i, pe({ class: F(a) }, { ...l.$attrs, ...n.value }), {
        default: ve(() => [
          ee(l.$slots, "default")
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
}), Ky = Uy;
function Wy(e) {
  return { toolbarTitleClasses: s(() => ({
    "dss-toolbar-title": !0,
    "dss-toolbar-title--shrink": !!e.shrink
  })) };
}
const Yy = /* @__PURE__ */ he({
  name: "DssToolbarTitle",
  inheritAttrs: !1,
  __name: "DssToolbarTitle.ts",
  props: {
    shrink: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { toolbarTitleClasses: a } = Wy(t);
    return (n, l) => {
      const o = lt("q-toolbar-title");
      return R(), qe(o, pe({
        class: F(a),
        shrink: t.shrink
      }, n.$attrs), Et({
        default: ve(() => [
          ee(n.$slots, "default")
        ]),
        _: 2
      }, [
        n.$slots.subtitle ? {
          name: "subtitle",
          fn: ve(() => [
            ee(n.$slots, "subtitle")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "shrink"]);
    };
  }
}), Xy = Yy;
function Gy(e) {
  return { separatorClasses: s(() => {
    let a = null;
    return e.inset === !0 ? a = "dss-separator--inset" : e.inset === "item" ? a = "dss-separator--inset-item" : e.inset === "item-thumbnail" && (a = "dss-separator--inset-item-thumbnail"), [
      // Classe base obrigatória
      "dss-separator",
      // Classes condicionais
      {
        // Orientação
        "dss-separator--vertical": e.vertical,
        // Espaçamento externo
        "dss-separator--spaced": e.spaced,
        // Cor (apenas se diferente do default)
        [`dss-separator--color-${e.color}`]: e.color !== "default",
        // Espessura (apenas se diferente do default 'thin')
        [`dss-separator--size-${e.size}`]: e.size !== "thin"
      },
      // Inset (null quando false — filtrado abaixo)
      a
    ].filter(Boolean);
  }) };
}
const Zy = /* @__PURE__ */ he({
  name: "DssSeparator",
  /**
   * inheritAttrs: true (default)
   * Atributos HTML passam automaticamente para o elemento raiz (<hr> ou <div>).
   * Permite: <DssSeparator aria-hidden="true" id="sep-1" />
   */
  inheritAttrs: !0,
  __name: "DssSeparator.ts",
  props: {
    vertical: { type: Boolean, default: !1 },
    inset: { type: [Boolean, String], default: !1 },
    spaced: { type: Boolean, default: !1 },
    color: { default: "default" },
    size: { default: "thin" },
    ariaHidden: { type: Boolean, default: void 0 }
  },
  setup(e) {
    const t = e, { separatorClasses: a } = Gy(t);
    return (n, l) => (R(), qe(Wn(e.vertical ? "div" : "hr"), {
      class: qt(F(a)),
      role: e.vertical ? "separator" : void 0,
      "aria-orientation": e.vertical ? "vertical" : void 0,
      "aria-hidden": e.ariaHidden || void 0
    }, null, 8, ["class", "role", "aria-orientation", "aria-hidden"]));
  }
}), Jy = Zy;
function ep(e) {
  return { spaceClasses: s(() => {
    const a = ["dss-space"];
    return e.size !== void 0 && a.push(`dss-space--size-${e.size}`), a;
  }) };
}
const tp = /* @__PURE__ */ he({
  name: "DssSpace",
  inheritAttrs: !0,
  __name: "DssSpace.ts",
  props: {
    size: {}
  },
  setup(e) {
    const t = e, { spaceClasses: a } = ep(t);
    return (n, l) => (R(), ne("div", {
      class: qt(F(a)),
      "aria-hidden": "true"
    }, null, 2));
  }
}), ap = tp;
function np(e) {
  return { rootClasses: s(() => ({
    "dss-scroll-area--horizontal": e.horizontal,
    "dss-scroll-area--always-visible": e.visible === "always",
    "dss-scroll-area--never-visible": e.visible === "never"
  })) };
}
const lp = /* @__PURE__ */ he({
  name: "DssScrollArea",
  inheritAttrs: !1,
  __name: "DssScrollArea.ts",
  props: {
    visible: { default: "auto" },
    horizontal: { type: Boolean, default: !1 },
    barDelay: { default: 1e3 },
    scrollTarget: {},
    label: {}
  },
  emits: ["scroll"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, { rootClasses: o } = np(n), i = z(null), r = s(() => {
      if (n.visible === "always") return !0;
      if (n.visible === "never") return !1;
    });
    function u(c) {
      l("scroll", c);
    }
    return t({
      /** Returns the underlying scroll DOM element */
      getScrollTarget: () => {
        var c;
        return (c = i.value) == null ? void 0 : c.getScrollTarget();
      },
      /** Returns current scroll position as { top, left } */
      getScrollPosition: () => {
        var c;
        return (c = i.value) == null ? void 0 : c.getScrollPosition();
      },
      /**
       * Scrolls to an absolute offset.
       * @param offset  Position in pixels
       * @param duration  Animation duration in ms (0 = instant)
       * @param axis  'vertical' (default) | 'horizontal'
       */
      scrollTo: (c, d, v) => {
        var b;
        return (b = i.value) == null ? void 0 : b.scrollTo(c, d, v);
      },
      /**
       * Scrolls by a relative offset from current position.
       * @param offset  Delta in pixels
       * @param duration  Animation duration in ms (0 = instant)
       * @param axis  'vertical' (default) | 'horizontal'
       */
      scrollBy: (c, d, v) => {
        var b;
        return (b = i.value) == null ? void 0 : b.scrollBy(c, d, v);
      },
      /**
       * Sets scroll position on a specific axis.
       * @param axis  'vertical' | 'horizontal'
       * @param offset  Position in pixels
       * @param duration  Animation duration in ms (optional)
       */
      setScrollPosition: (c, d, v) => {
        var b;
        return (b = i.value) == null ? void 0 : b.setScrollPosition(c, d, v);
      }
    }), (c, d) => (R(), qe(F(Iv), pe({
      ref_key: "scrollAreaRef",
      ref: i
    }, c.$attrs, {
      class: ["dss-scroll-area", F(o)],
      visible: r.value,
      horizontal: e.horizontal,
      delay: e.barDelay,
      "scroll-target": e.scrollTarget ?? void 0,
      role: e.label ? "region" : void 0,
      "aria-label": e.label ?? void 0,
      onScroll: u
    }), {
      default: ve(() => [
        ee(c.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "visible", "horizontal", "delay", "scroll-target", "role", "aria-label"]));
  }
}), op = lp;
function ip(e) {
  return { rootClasses: s(() => ({
    "dss-splitter--vertical": e.orientation === "vertical",
    "dss-splitter--disabled": e.disabled,
    "dss-splitter--reversed": e.reverse
  })) };
}
const rp = /* @__PURE__ */ he({
  name: "DssSplitter",
  inheritAttrs: !1,
  __name: "DssSplitter.ts",
  props: {
    modelValue: { default: 50 },
    orientation: { default: "horizontal" },
    limits: { default: () => [0, 100] },
    reverse: { type: Boolean },
    disabled: { type: Boolean },
    emitImmediately: { type: Boolean },
    unit: { default: "%" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, { rootClasses: l } = ip(a), o = s(() => a.orientation === "vertical");
    return (i, r) => {
      const u = lt("q-splitter");
      return R(), qe(u, pe(i.$attrs, {
        class: ["dss-splitter", F(l)],
        "model-value": e.modelValue,
        horizontal: o.value,
        limits: e.limits,
        reverse: e.reverse,
        disable: e.disabled,
        "emit-immediately": e.emitImmediately,
        unit: e.unit,
        "onUpdate:modelValue": r[0] || (r[0] = (c) => n("update:modelValue", c))
      }), {
        before: ve(() => [
          ee(i.$slots, "before")
        ]),
        separator: ve(() => [
          ee(i.$slots, "separator")
        ]),
        after: ve(() => [
          ee(i.$slots, "after")
        ]),
        _: 3
      }, 16, ["class", "model-value", "horizontal", "limits", "reverse", "disable", "emit-immediately", "unit"]);
    };
  }
}), sp = rp;
function up() {
  const e = Hg(), t = s(() => e.screen.xs ? "xs" : e.screen.sm ? "sm" : e.screen.md ? "md" : e.screen.lg ? "lg" : "xl"), a = s(() => t.value === "xs"), n = s(() => t.value === "sm"), l = s(() => t.value === "md"), o = s(() => t.value === "lg"), i = s(() => t.value === "xl"), r = s(() => a.value || n.value), u = s(() => l.value || o.value || i.value);
  return {
    currentBreakpoint: t,
    isXs: a,
    isSm: n,
    isMd: l,
    isLg: o,
    isXl: i,
    isMobile: r,
    isDesktop: u
  };
}
const dp = {
  name: "DssResponsive",
  inheritAttrs: !1
}, cp = /* @__PURE__ */ he({
  ...dp,
  props: {
    breakpoint: {},
    showOn: {},
    hideOn: {},
    tag: { default: "div" }
  },
  setup(e) {
    const t = e, { currentBreakpoint: a, isXs: n, isSm: l, isMd: o, isLg: i, isXl: r, isMobile: u, isDesktop: c } = up(), d = s(() => {
      const b = a.value, m = t.showOn ?? t.breakpoint;
      if (m && m.length > 0) {
        const g = m.includes(b);
        return t.hideOn && t.hideOn.length > 0 ? g && !t.hideOn.includes(b) : g;
      }
      return t.hideOn && t.hideOn.length > 0 ? !t.hideOn.includes(b) : !0;
    }), v = s(() => ({
      currentBreakpoint: a.value,
      isXs: n.value,
      isSm: l.value,
      isMd: o.value,
      isLg: i.value,
      isXl: r.value,
      isMobile: u.value,
      isDesktop: c.value
    }));
    return (b, m) => d.value ? (R(), qe(Wn(t.tag), pe({ key: 0 }, b.$attrs, { class: "dss-responsive" }), {
      default: ve(() => [
        ee(b.$slots, "default", Lt(zt(v.value)))
      ]),
      _: 3
    }, 16)) : me("", !0);
  }
}), fp = cp;
function vp() {
  return { scrollerClasses: ["dss-page-scroller"] };
}
const mp = /* @__PURE__ */ he({
  name: "DssPageScroller",
  inheritAttrs: !1,
  __name: "DssPageScroller.ts",
  props: {
    position: { default: "bottom-right" },
    offset: { default: () => [18, 18] },
    scrollOffset: { default: 1e3 },
    duration: { default: 250 },
    reverse: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { scrollerClasses: a } = vp(), n = z(!1);
    let l = null;
    function o(r) {
      n.value = r.matches;
    }
    bt(() => {
      l = window.matchMedia("(prefers-reduced-motion: reduce)"), n.value = l.matches, l.addEventListener("change", o);
    }), Vl(() => {
      l == null || l.removeEventListener("change", o);
    });
    const i = s(
      () => n.value ? 0 : t.duration
    );
    return (r, u) => {
      const c = lt("q-page-scroller");
      return R(), qe(c, pe({
        position: t.position,
        offset: t.offset,
        "scroll-offset": t.scrollOffset,
        duration: i.value,
        reverse: t.reverse,
        class: F(a)
      }, r.$attrs), {
        default: ve(() => [
          ee(r.$slots, "default")
        ]),
        _: 3
      }, 16, ["position", "offset", "scroll-offset", "duration", "reverse", "class"]);
    };
  }
}), gp = mp;
function hp(e) {
  return { stickyClasses: s(() => [
    "dss-page-sticky",
    {
      "dss-page-sticky--elevated": e.elevated
    }
  ]) };
}
const bp = /* @__PURE__ */ he({
  name: "DssPageSticky",
  inheritAttrs: !1,
  __name: "DssPageSticky.ts",
  props: {
    position: { default: "bottom-right" },
    offset: { default: () => [18, 18] },
    expand: { type: Boolean, default: !1 },
    elevated: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { stickyClasses: a } = hp(t);
    return (n, l) => {
      const o = lt("q-page-sticky");
      return R(), qe(o, pe({
        position: t.position,
        offset: t.offset,
        expand: t.expand,
        class: F(a)
      }, n.$attrs), {
        default: ve(() => [
          ee(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["position", "offset", "expand", "class"]);
    };
  }
}), yp = bp;
function pp(e) {
  return { tabsClasses: s(() => [
    // Classe base
    "dss-tabs",
    // Alinhamento
    {
      [`dss-tabs--align-${e.align}`]: e.align && e.align !== "left"
    },
    // Layout
    {
      "dss-tabs--vertical": e.vertical,
      "dss-tabs--dense": e.dense
    },
    // Brand
    {
      [`dss-tabs--brand-${e.brand}`]: e.brand
    }
  ]) };
}
const kp = ["data-brand"], Cp = /* @__PURE__ */ he({
  name: "DssTabs",
  inheritAttrs: !1,
  __name: "DssTabs.ts",
  props: {
    modelValue: { default: void 0 },
    align: { default: "left" },
    breakpoint: { default: 600 },
    vertical: { type: Boolean, default: !1 },
    dense: { type: Boolean, default: !1 },
    brand: { default: null },
    ariaLabel: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, { tabsClasses: l } = pp(a);
    function o(i) {
      n("update:modelValue", i);
    }
    return (i, r) => {
      const u = lt("q-tabs");
      return R(), ne("div", pe({
        class: F(l),
        "data-brand": a.brand || void 0
      }, i.$attrs), [
        Mt(u, {
          "model-value": a.modelValue,
          align: a.align,
          breakpoint: a.breakpoint,
          vertical: a.vertical,
          dense: a.dense,
          "aria-label": a.ariaLabel || void 0,
          "left-icon": "chevron_left",
          "right-icon": "chevron_right",
          ripple: !1,
          "onUpdate:modelValue": o
        }, {
          default: ve(() => [
            ee(i.$slots, "default")
          ]),
          _: 3
        }, 8, ["model-value", "align", "breakpoint", "vertical", "dense", "aria-label"])
      ], 16, kp);
    };
  }
}), Sp = Cp;
function wp(e) {
  return { tabClasses: s(() => [
    "dss-tab",
    {
      "dss-tab--icon": !!e.icon && !e.label,
      "dss-tab--has-icon": !!e.icon,
      "dss-tab--has-label": !!e.label,
      "dss-tab--alert": !!e.alert,
      "dss-tab--disable": e.disable
    }
  ]) };
}
const xp = /* @__PURE__ */ he({
  name: "DssTab",
  inheritAttrs: !1,
  __name: "DssTab.ts",
  props: {
    name: {},
    label: { default: void 0 },
    icon: { default: void 0 },
    alert: { type: [Boolean, String], default: void 0 },
    disable: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { tabClasses: a } = wp(t);
    return (n, l) => {
      const o = lt("q-tab");
      return R(), qe(o, pe({
        class: F(a),
        name: t.name,
        label: t.label,
        icon: t.icon,
        alert: t.alert,
        disable: t.disable,
        ripple: !1
      }, n.$attrs), Et({ _: 2 }, [
        n.$slots.default ? {
          name: "default",
          fn: ve(() => [
            ee(n.$slots, "default")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "name", "label", "icon", "alert", "disable"]);
    };
  }
}), _p = xp;
function $p(e) {
  return { tabPanelClasses: s(() => [
    "dss-tab-panel",
    {
      "dss-tab-panel--disabled": e.disable
    }
  ]) };
}
const qp = /* @__PURE__ */ he({
  name: "DssTabPanel",
  inheritAttrs: !1,
  __name: "DssTabPanel.ts",
  props: {
    name: {},
    disable: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { tabPanelClasses: a } = $p(t);
    return (n, l) => {
      const o = lt("q-tab-panel");
      return R(), qe(o, pe({
        class: F(a),
        name: t.name,
        disable: t.disable
      }, n.$attrs), {
        default: ve(() => [
          ee(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "name", "disable"]);
    };
  }
}), Bp = qp;
function Tp(e) {
  return { tabPanelsClasses: s(() => [
    "dss-tab-panels",
    {
      "dss-tab-panels--animated": e.animated
    }
  ]) };
}
const Gr = "dss-tab-panels", Mp = /* @__PURE__ */ he({
  name: "DssTabPanels",
  inheritAttrs: !1,
  __name: "DssTabPanels.ts",
  props: {
    modelValue: {},
    animated: { type: Boolean, default: !1 },
    swipeable: { type: Boolean, default: !1 },
    infinite: { type: Boolean, default: !1 },
    keepAlive: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, { tabPanelsClasses: l } = Tp(a);
    return (o, i) => {
      const r = lt("q-tab-panels");
      return R(), qe(r, pe({
        class: F(l),
        "model-value": e.modelValue,
        animated: e.animated,
        "transition-prev": e.animated ? Gr : void 0,
        "transition-next": e.animated ? Gr : void 0,
        swipeable: e.swipeable,
        infinite: e.infinite,
        "keep-alive": e.keepAlive
      }, o.$attrs, {
        "onUpdate:modelValue": i[0] || (i[0] = (u) => n("update:modelValue", u))
      }), {
        default: ve(() => [
          ee(o.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "model-value", "animated", "transition-prev", "transition-next", "swipeable", "infinite", "keep-alive"]);
    };
  }
}), Ap = Mp;
function Dp(e) {
  return { routeTabClasses: s(() => [
    "dss-tab",
    {
      "dss-tab--icon": !!e.icon && !e.label,
      "dss-tab--has-icon": !!e.icon,
      "dss-tab--has-label": !!e.label,
      "dss-tab--alert": !!e.alert,
      "dss-tab--disable": e.disable
    }
  ]) };
}
const Lp = /* @__PURE__ */ he({
  name: "DssRouteTab",
  inheritAttrs: !1,
  __name: "DssRouteTab.ts",
  props: {
    name: {},
    label: { default: void 0 },
    icon: { default: void 0 },
    alert: { type: [Boolean, String], default: void 0 },
    disable: { type: Boolean, default: !1 },
    to: { default: void 0 },
    exact: { type: Boolean, default: !1 },
    replace: { type: Boolean, default: !1 },
    href: { default: void 0 },
    target: { default: void 0 }
  },
  setup(e) {
    const t = e, { routeTabClasses: a } = Dp(t);
    return (n, l) => {
      const o = lt("q-route-tab");
      return R(), qe(o, pe({
        class: F(a),
        name: t.name,
        label: t.label,
        icon: t.icon,
        alert: t.alert,
        disable: t.disable,
        to: t.to,
        exact: t.exact,
        replace: t.replace,
        href: t.href,
        target: t.target,
        ripple: !1
      }, n.$attrs), Et({ _: 2 }, [
        n.$slots.default ? {
          name: "default",
          fn: ve(() => [
            ee(n.$slots, "default")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "name", "label", "icon", "alert", "disable", "to", "exact", "replace", "href", "target"]);
    };
  }
}), zp = Lp;
function Vp(e) {
  return { breadcrumbsClasses: s(() => [
    "dss-breadcrumbs",
    {
      [`dss-breadcrumbs--gutter-${e.gutter}`]: e.gutter,
      [`dss-breadcrumbs--align-${e.align}`]: e.align && e.align !== "left",
      [`dss-breadcrumbs--brand-${e.brand}`]: e.brand
    }
  ]) };
}
const Pp = /* @__PURE__ */ he({
  name: "DssBreadcrumbs",
  inheritAttrs: !1,
  __name: "DssBreadcrumbs.ts",
  props: {
    separator: { default: "/" },
    separatorColor: { default: "subtle" },
    gutter: { default: "md" },
    align: { default: "left" },
    brand: {}
  },
  setup(e) {
    const t = e, { breadcrumbsClasses: a } = Vp(t), n = s(() => ({
      sm: "var(--dss-spacing-2)",
      md: "var(--dss-spacing-3)",
      lg: "var(--dss-spacing-4)"
    })[t.gutter ?? "md"] ?? "var(--dss-spacing-3)"), l = s(() => {
      const i = {
        subtle: "var(--dss-text-subtle)",
        body: "var(--dss-text-body)",
        disabled: "var(--dss-text-disabled)"
      }, r = t.separatorColor ?? "subtle";
      return i[r] ?? `var(--dss-text-${r})`;
    }), o = s(() => ({
      "--dss-breadcrumbs-gap": n.value,
      "--dss-breadcrumbs-separator-color": l.value
    }));
    return (i, r) => {
      const u = lt("q-breadcrumbs");
      return R(), qe(u, pe({
        class: F(a),
        style: o.value,
        separator: e.separator,
        align: e.align === "left" ? void 0 : e.align,
        gutter: "none"
      }, i.$attrs), Et({
        default: ve(() => [
          ee(i.$slots, "default")
        ]),
        _: 2
      }, [
        i.$slots.separator ? {
          name: "separator",
          fn: ve(() => [
            ee(i.$slots, "separator")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "style", "separator", "align"]);
    };
  }
}), Rp = Pp;
function Fp(e) {
  const t = s(() => !!(e.to || e.href));
  return { breadcrumbsElClasses: s(() => ({
    "dss-breadcrumbs-el--clickable": t.value,
    "dss-breadcrumbs-el--current": !t.value,
    "dss-breadcrumbs-el--disabled": e.disable
  })), isClickable: t };
}
const Ep = /* @__PURE__ */ he({
  name: "DssBreadcrumbsEl",
  inheritAttrs: !1,
  __name: "DssBreadcrumbsEl.ts",
  props: {
    label: {},
    icon: {},
    to: {},
    href: {},
    disable: { type: Boolean, default: !1 },
    tag: {}
  },
  setup(e) {
    const t = e, { breadcrumbsElClasses: a } = Fp(t);
    return (n, l) => {
      const o = lt("q-breadcrumbs-el");
      return R(), qe(o, pe({
        class: ["dss-breadcrumbs-el", F(a)],
        to: e.to,
        href: e.href,
        disable: e.disable,
        tag: e.tag
      }, n.$attrs), {
        default: ve(() => [
          e.icon ? (R(), qe(Ca, {
            key: 0,
            name: e.icon,
            size: "sm",
            "aria-hidden": "true"
          }, null, 8, ["name"])) : me("", !0),
          ee(n.$slots, "default", {}, () => [
            ht(Ee(e.label), 1)
          ])
        ]),
        _: 3
      }, 16, ["class", "to", "href", "disable", "tag"]);
    };
  }
}), Ip = Ep;
function Op(e) {
  return { rootClasses: s(() => ({
    "dss-bar--elevated": e.elevated
  })) };
}
const Hp = { name: "DssBar", inheritAttrs: !1 }, Np = /* @__PURE__ */ he({
  ...Hp,
  props: {
    dense: { type: Boolean },
    elevated: { type: Boolean }
  },
  setup(e) {
    const t = e, { rootClasses: a } = Op(t);
    return (n, l) => (R(), qe(F(kc), pe(n.$attrs, {
      class: [F(a), "dss-bar"],
      dense: e.dense
    }), {
      default: ve(() => [
        ee(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "dense"]));
  }
}), jp = Np;
function Qp(e) {
  return { expansionItemClasses: s(
    () => [
      "dss-expansion-item",
      e.dense && "dss-expansion-item--dense",
      e.disable && "dss-expansion-item--disabled",
      e.brand && `dss-expansion-item--brand-${e.brand}`
    ].filter(Boolean)
  ) };
}
const Up = /* @__PURE__ */ he({
  name: "DssExpansionItem",
  inheritAttrs: !1,
  __name: "DssExpansionItem.ts",
  props: {
    label: {},
    caption: {},
    icon: {},
    expandIcon: {},
    modelValue: { type: Boolean },
    defaultOpened: { type: Boolean },
    group: {},
    disable: { type: Boolean, default: !1 },
    dense: { type: Boolean, default: !1 },
    brand: { default: null },
    ariaLabel: {}
  },
  emits: ["update:modelValue", "show", "hide", "before-show", "before-hide"],
  setup(e, { emit: t }) {
    const a = e, n = t, { expansionItemClasses: l } = Qp(a);
    return (o, i) => {
      const r = lt("q-expansion-item");
      return R(), ne("div", pe({ class: F(l) }, o.$attrs), [
        Mt(r, {
          class: "dss-expansion-item__qexpansion",
          "model-value": e.modelValue,
          "default-opened": e.defaultOpened,
          group: e.group,
          disable: e.disable,
          label: e.label,
          caption: e.caption,
          icon: e.icon,
          "expand-icon": e.expandIcon || void 0,
          "header-aria-label": e.ariaLabel || void 0,
          "onUpdate:modelValue": i[0] || (i[0] = (u) => n("update:modelValue", u)),
          onShow: i[1] || (i[1] = (u) => n("show")),
          onHide: i[2] || (i[2] = (u) => n("hide")),
          onBeforeShow: i[3] || (i[3] = (u) => n("before-show")),
          onBeforeHide: i[4] || (i[4] = (u) => n("before-hide"))
        }, Et({
          default: ve(() => [
            ee(o.$slots, "default")
          ]),
          _: 2
        }, [
          o.$slots.header ? {
            name: "header",
            fn: ve(() => [
              ee(o.$slots, "header")
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["model-value", "default-opened", "group", "disable", "label", "caption", "icon", "expand-icon", "header-aria-label"])
      ], 16);
    };
  }
}), Kp = Up;
function Wp(e) {
  return { stepperClasses: s(() => [
    "dss-stepper",
    {
      "dss-stepper--vertical": e.vertical,
      "dss-stepper--horizontal": !e.vertical,
      "dss-stepper--flat": e.flat,
      "dss-stepper--bordered": e.bordered,
      [`dss-stepper--brand-${e.brand}`]: !!e.brand
    }
  ]) };
}
const Yp = ["data-brand"], Xp = /* @__PURE__ */ he({
  name: "DssStepper",
  inheritAttrs: !1,
  __name: "DssStepper.ts",
  props: {
    modelValue: { default: void 0 },
    vertical: { type: Boolean, default: !1 },
    headerNav: { type: Boolean, default: !1 },
    animated: { type: Boolean, default: !1 },
    flat: { type: Boolean, default: !1 },
    bordered: { type: Boolean, default: !1 },
    brand: { default: null },
    ariaLabel: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, { stepperClasses: l } = Wp(a);
    function o(i) {
      n("update:modelValue", i);
    }
    return (i, r) => {
      const u = lt("q-stepper");
      return R(), ne("div", pe({
        class: F(l),
        "data-brand": a.brand || void 0
      }, i.$attrs), [
        Mt(u, {
          "model-value": a.modelValue,
          vertical: a.vertical,
          "header-nav": a.headerNav,
          animated: a.animated,
          flat: a.flat,
          bordered: a.bordered,
          "aria-label": a.ariaLabel || void 0,
          "onUpdate:modelValue": o
        }, Et({
          default: ve(() => [
            ee(i.$slots, "default")
          ]),
          _: 2
        }, [
          i.$slots.message ? {
            name: "message",
            fn: ve(() => [
              ee(i.$slots, "message")
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["model-value", "vertical", "header-nav", "animated", "flat", "bordered", "aria-label"])
      ], 16, Yp);
    };
  }
}), Gp = Xp;
function Zp(e) {
  return { stepClasses: s(() => [
    "dss-step",
    {
      "dss-step--done": e.done,
      "dss-step--error": e.error,
      "dss-step--disable": e.disable,
      "dss-step--has-icon": !!e.icon,
      "dss-step--has-caption": !!e.caption,
      "dss-step--header-nav": e.headerNav
    }
  ]) };
}
const Jp = /* @__PURE__ */ he({
  name: "DssStep",
  inheritAttrs: !1,
  __name: "DssStep.ts",
  props: {
    name: {},
    title: { default: void 0 },
    caption: { default: void 0 },
    icon: { default: void 0 },
    activeIcon: { default: void 0 },
    doneIcon: { default: void 0 },
    errorIcon: { default: void 0 },
    done: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    disable: { type: Boolean, default: !1 },
    headerNav: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { stepClasses: a } = Zp(t);
    return (n, l) => {
      const o = lt("q-step");
      return R(), qe(o, pe({
        class: F(a),
        name: t.name,
        title: t.title,
        caption: t.caption,
        icon: t.icon,
        "active-icon": t.activeIcon,
        "done-icon": t.doneIcon,
        "error-icon": t.errorIcon,
        done: t.done,
        error: t.error,
        disable: t.disable,
        "header-nav": t.headerNav
      }, n.$attrs), Et({ _: 2 }, [
        n.$slots.default ? {
          name: "default",
          fn: ve(() => [
            ee(n.$slots, "default")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "name", "title", "caption", "icon", "active-icon", "done-icon", "error-icon", "done", "error", "disable", "header-nav"]);
    };
  }
}), e1 = Jp;
function t1(e) {
  return { rootClasses: s(() => ({
    "dss-timeline--dense": e.layout === "dense",
    "dss-timeline--comfortable": e.layout === "comfortable" || !e.layout,
    "dss-timeline--loose": e.layout === "loose",
    "dss-timeline--side-left": e.side === "left",
    "dss-timeline--side-right": e.side === "right"
  })) };
}
const a1 = { name: "DssTimeline", inheritAttrs: !1 }, n1 = /* @__PURE__ */ he({
  ...a1,
  props: {
    layout: {},
    side: {},
    dark: { type: Boolean }
  },
  setup(e) {
    const t = e, { rootClasses: a } = t1(t);
    return (n, l) => (R(), qe(F(Ym), pe(n.$attrs, {
      class: [F(a), "dss-timeline"],
      layout: e.layout,
      side: e.side,
      dark: e.dark
    }), {
      default: ve(() => [
        ee(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "layout", "side", "dark"]));
  }
}), l1 = n1;
function o1(e) {
  return { rootClasses: s(() => ({
    "dss-timeline-entry--heading": e.heading,
    "dss-timeline-entry--side-left": e.side === "left",
    "dss-timeline-entry--side-right": e.side === "right",
    "dss-timeline-entry--has-icon": !!e.icon,
    "dss-timeline-entry--has-avatar": !!e.avatar
  })) };
}
const i1 = { name: "DssTimelineEntry", inheritAttrs: !1 }, r1 = /* @__PURE__ */ he({
  ...i1,
  props: {
    heading: { type: Boolean },
    tag: {},
    side: {},
    icon: {},
    avatar: {},
    title: {},
    subtitle: {}
  },
  setup(e) {
    const t = e, a = Nt(), { rootClasses: n } = o1(t);
    return (l, o) => (R(), qe(F(Xm), pe(l.$attrs, {
      class: [F(n), "dss-timeline-entry"],
      heading: e.heading,
      tag: e.tag,
      side: e.side,
      icon: e.icon,
      avatar: e.avatar,
      title: e.title,
      subtitle: e.subtitle
    }), Et({
      default: ve(() => [
        ee(l.$slots, "default")
      ]),
      _: 2
    }, [
      F(a).title ? {
        name: "title",
        fn: ve(() => [
          ee(l.$slots, "title")
        ]),
        key: "0"
      } : void 0,
      F(a).subtitle ? {
        name: "subtitle",
        fn: ve(() => [
          ee(l.$slots, "subtitle")
        ]),
        key: "1"
      } : void 0,
      F(a).icon ? {
        name: "icon",
        fn: ve(() => [
          ee(l.$slots, "icon")
        ]),
        key: "2"
      } : void 0
    ]), 1040, ["class", "heading", "tag", "side", "icon", "avatar", "title", "subtitle"]));
  }
}), s1 = r1;
function u1(e) {
  return { rootClasses: s(() => ({
    "dss-virtual-scroll": !0,
    "dss-virtual-scroll--horizontal": e.horizontal === !0,
    "dss-virtual-scroll--loading": e.loading === !0,
    "dss-virtual-scroll--disabled": e.disable === !0,
    "dss-virtual-scroll--table": e.type === "table"
  })) };
}
const d1 = {
  key: 0,
  class: "dss-virtual-scroll__loading",
  role: "status",
  "aria-live": "polite",
  "aria-label": "Carregando itens"
}, c1 = {
  key: 1,
  class: "dss-virtual-scroll__empty",
  role: "status"
}, f1 = /* @__PURE__ */ he({
  name: "DssVirtualScroll",
  inheritAttrs: !1,
  __name: "DssVirtualScroll.ts",
  props: {
    items: {},
    itemSize: { default: 48 },
    type: { default: "list" },
    scrollTarget: {},
    sliceSize: {},
    horizontal: { type: Boolean },
    loading: { type: Boolean },
    disable: { type: Boolean }
  },
  emits: ["scroll", "native-scroll"],
  setup(e, { emit: t }) {
    const a = e, n = t, { rootClasses: l } = u1(a), o = s(() => {
      var c;
      return ((c = a.items) == null ? void 0 : c.length) ?? 0;
    }), i = s(
      () => !a.loading && (!a.items || a.items.length === 0)
    );
    function r(c) {
      n("scroll", c);
    }
    function u(c) {
      n("native-scroll", c);
    }
    return (c, d) => (R(), ne("div", pe(c.$attrs, { class: F(l) }), [
      ee(c.$slots, "prepend"),
      e.loading ? (R(), ne("div", d1, [
        ee(c.$slots, "loading", {}, () => [
          d[0] || (d[0] = Oe("div", {
            class: "dss-virtual-scroll__loading-indicator",
            "aria-hidden": "true"
          }, null, -1))
        ])
      ])) : i.value ? (R(), ne("div", c1, [
        ee(c.$slots, "empty", {}, () => [
          d[1] || (d[1] = Oe("span", { class: "dss-virtual-scroll__empty-text" }, "Nenhum item para exibir", -1))
        ])
      ])) : (R(), qe(F(ju), {
        key: 2,
        class: "dss-virtual-scroll__inner",
        items: e.items,
        "virtual-scroll-item-size": e.itemSize,
        type: e.type,
        "scroll-target": e.scrollTarget ?? void 0,
        "virtual-scroll-slice-size": e.sliceSize ?? void 0,
        horizontal: e.horizontal,
        onVirtualScroll: r,
        onScroll: u
      }, {
        default: ve(({ item: v, index: b }) => [
          ee(c.$slots, "default", {
            item: v,
            index: b,
            ariaSetsize: o.value,
            ariaPosinset: b + 1
          })
        ]),
        _: 3
      }, 8, ["items", "virtual-scroll-item-size", "type", "scroll-target", "virtual-scroll-slice-size", "horizontal"])),
      ee(c.$slots, "append")
    ], 16));
  }
}), v1 = f1;
function m1(e, t) {
  return { rootClasses: s(() => [
    "dss-infinite-scroll",
    {
      "dss-infinite-scroll--disabled": e.disable === !0,
      "dss-infinite-scroll--loading": t.isLoading.value,
      "dss-infinite-scroll--no-more": t.noMore.value,
      "dss-infinite-scroll--reverse": e.reverse === !0
    }
  ]) };
}
const g1 = {
  key: 0,
  class: "dss-infinite-scroll__no-more",
  role: "status",
  "aria-live": "polite"
}, h1 = {
  class: "dss-infinite-scroll__loading",
  role: "status",
  "aria-live": "polite",
  "aria-label": "Carregando mais itens"
}, b1 = /* @__PURE__ */ he({
  name: "DssInfiniteScroll",
  inheritAttrs: !1,
  __name: "DssInfiniteScroll.ts",
  props: {
    offset: { default: 500 },
    debounce: { default: 100 },
    initialIndex: {},
    scrollTarget: {},
    reverse: { type: Boolean },
    disable: { type: Boolean }
  },
  emits: ["load"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = z(!1), i = z(!1), r = z(null), { rootClasses: u } = m1(n, { isLoading: o, noMore: i });
    function c(d, v) {
      o.value = !0, l("load", d, (m = !1) => {
        o.value = !1, m && (i.value = !0), v(m);
      });
    }
    return t({
      poll: () => {
        var d;
        return (d = r.value) == null ? void 0 : d.poll();
      },
      trigger: () => {
        var d;
        return (d = r.value) == null ? void 0 : d.trigger();
      },
      reset: () => {
        var d;
        i.value = !1, (d = r.value) == null || d.reset();
      },
      stop: () => {
        var d;
        return (d = r.value) == null ? void 0 : d.stop();
      },
      resume: () => {
        var d;
        return (d = r.value) == null ? void 0 : d.resume();
      },
      setIndex: (d) => {
        var v;
        return (v = r.value) == null ? void 0 : v.setIndex(d);
      },
      isLoading: o,
      noMore: i
    }), (d, v) => (R(), qe(F(dv), pe({
      ref_key: "innerRef",
      ref: r
    }, d.$attrs, {
      class: F(u),
      offset: e.offset,
      debounce: e.debounce,
      "initial-index": e.initialIndex ?? void 0,
      "scroll-target": e.scrollTarget ?? void 0,
      reverse: e.reverse,
      disable: e.disable,
      onLoad: c
    }), {
      loading: ve(() => [
        Oe("div", h1, [
          ee(d.$slots, "loading", {}, () => [
            Mt(Yl, {
              class: "dss-infinite-scroll__spinner",
              size: "sm",
              "aria-hidden": "true"
            })
          ])
        ])
      ]),
      default: ve(() => [
        ee(d.$slots, "default"),
        i.value ? (R(), ne("div", g1, [
          ee(d.$slots, "no-more", {}, () => [
            v[0] || (v[0] = Oe("span", { class: "dss-infinite-scroll__no-more-text" }, " Todos os itens foram carregados ", -1))
          ])
        ])) : me("", !0)
      ]),
      _: 3
    }, 16, ["class", "offset", "debounce", "initial-index", "scroll-target", "reverse", "disable"]));
  }
}), y1 = b1;
function p1(e) {
  return { rootClasses: s(() => ({
    [`dss-pull-to-refresh--${e.size ?? "md"}`]: !0,
    "dss-pull-to-refresh--disabled": e.disabled
  })) };
}
const k1 = ["aria-busy"], C1 = { name: "DssPullToRefresh", inheritAttrs: !1 }, S1 = /* @__PURE__ */ he({
  ...C1,
  props: {
    disabled: { type: Boolean },
    noMouse: { type: Boolean },
    icon: {},
    size: { default: "md" }
  },
  emits: ["refresh"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, { rootClasses: o } = p1(n), i = z(null), r = z(!1);
    function u(c) {
      r.value = !0, l("refresh", () => {
        r.value = !1, c();
      });
    }
    return t({
      /** Dispara a ação de refresh programaticamente */
      trigger: () => {
        var c;
        return (c = i.value) == null ? void 0 : c.trigger();
      }
    }), (c, d) => (R(), qe(F(Pv), pe({
      ref_key: "qPullToRefreshRef",
      ref: i
    }, c.$attrs, {
      class: [F(o), "dss-pull-to-refresh"],
      color: "primary",
      "no-mouse": e.noMouse,
      disable: e.disabled,
      icon: e.icon,
      onRefresh: u
    }), {
      default: ve(() => [
        Oe("span", {
          class: "dss-sr-only",
          role: "status",
          "aria-live": "polite",
          "aria-busy": r.value
        }, [
          r.value ? (R(), ne(hn, { key: 0 }, [
            ht("Atualizando conteúdo…")
          ], 64)) : me("", !0)
        ], 8, k1),
        ee(c.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "no-mouse", "disable", "icon"]));
  }
}), w1 = S1;
function x1(e) {
  return { rootClasses: s(() => ({
    "dss-slide-item--disabled": e.disable
  })) };
}
const _1 = { name: "DssSlideItem", inheritAttrs: !1 }, $1 = /* @__PURE__ */ he({
  ..._1,
  props: {
    disable: { type: Boolean },
    leftColor: {},
    rightColor: {}
  },
  emits: ["action", "slide"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = Nt(), { rootClasses: i } = x1(n), r = z(null), u = {
      error: "negative",
      success: "positive",
      warning: "warning",
      info: "info"
    }, c = {
      error: "var(--dss-feedback-error)",
      success: "var(--dss-feedback-success)",
      warning: "var(--dss-feedback-warning)",
      info: "var(--dss-feedback-info)"
    }, d = s(
      () => n.leftColor ? u[n.leftColor] : o.left ? "negative" : void 0
    ), v = s(
      () => n.rightColor ? u[n.rightColor] : o.right ? "info" : void 0
    ), b = s(() => ({
      "--dss-slide-item-left-bg": n.leftColor ? c[n.leftColor] : "var(--dss-feedback-error)",
      "--dss-slide-item-right-bg": n.rightColor ? c[n.rightColor] : "var(--dss-feedback-info)"
    }));
    return t({
      /** Reseta o item para a posição original programaticamente */
      // QSlideItem.reset() não é tipado publicamente na versão atual do Quasar — cast necessário
      reset: () => {
        var m, g;
        return (g = (m = r.value) == null ? void 0 : m.reset) == null ? void 0 : g.call(m);
      }
    }), (m, g) => (R(), qe(F(Wv), pe({
      ref_key: "qSlideItemRef",
      ref: r
    }, m.$attrs, {
      class: [F(i), "dss-slide-item"],
      style: b.value,
      "left-color": d.value,
      "right-color": v.value,
      disable: e.disable,
      onAction: g[0] || (g[0] = (p) => l("action", p)),
      onSlide: g[1] || (g[1] = (p) => l("slide", p))
    }), Et({
      default: ve(() => [
        ee(m.$slots, "default")
      ]),
      _: 2
    }, [
      F(o).left ? {
        name: "left",
        fn: ve((p) => [
          ee(m.$slots, "left", Lt(zt(p ?? {})))
        ]),
        key: "0"
      } : void 0,
      F(o).right ? {
        name: "right",
        fn: ve((p) => [
          ee(m.$slots, "right", Lt(zt(p ?? {})))
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["class", "style", "left-color", "right-color", "disable"]));
  }
}), q1 = $1;
function B1() {
  return { rootClasses: s(() => ["dss-parallax"]) };
}
function T1() {
  const e = z(!1);
  let t = null;
  function a(n) {
    e.value = n.matches;
  }
  return bt(() => {
    typeof window < "u" && window.matchMedia && (t = window.matchMedia("(prefers-reduced-motion: reduce)"), e.value = t.matches, t.addEventListener("change", a));
  }), Vl(() => {
    t == null || t.removeEventListener("change", a);
  }), { isReducedMotion: e };
}
const M1 = {
  key: 0,
  class: "dss-sr-only"
}, A1 = {
  key: 0,
  class: "dss-sr-only"
}, D1 = /* @__PURE__ */ he({
  name: "DssParallax",
  inheritAttrs: !1,
  __name: "DssParallax.ts",
  props: {
    src: {},
    height: { default: 500 },
    speed: { default: 0.5 },
    scrollTarget: {},
    alt: {},
    decorative: { type: Boolean }
  },
  setup(e) {
    const t = e, { isReducedMotion: a } = T1(), { rootClasses: n } = B1(), l = s(() => t.decorative ? !1 : !!t.alt), o = s(() => ({
      "background-image": t.src ? `url(${t.src})` : void 0,
      height: `${t.height}px`
    }));
    return (i, r) => F(a) ? (R(), ne("div", pe({ key: 1 }, i.$attrs, {
      class: [...F(n), "dss-parallax--static"],
      style: o.value
    }), [
      l.value ? (R(), ne("span", A1, Ee(e.alt), 1)) : me("", !0),
      ee(i.$slots, "default")
    ], 16)) : (R(), qe(F(zv), pe({ key: 0 }, i.$attrs, {
      class: F(n),
      src: e.src,
      height: e.height,
      speed: e.speed,
      "scroll-target": e.scrollTarget
    }), {
      default: ve(() => [
        l.value ? (R(), ne("span", M1, Ee(e.alt), 1)) : me("", !0),
        ee(i.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "src", "height", "speed", "scroll-target"]));
  }
}), L1 = D1;
function z1(e) {
  return { rootClasses: s(() => [
    "dss-video",
    { [`dss-video--radius-${e.radius}`]: e.radius && e.radius !== "none" }
  ]) };
}
const V1 = /* @__PURE__ */ he({
  name: "DssVideo",
  inheritAttrs: !1,
  __name: "DssVideo.ts",
  props: {
    src: {},
    title: {},
    decorative: { type: Boolean },
    ratio: { default: 16 / 9 },
    radius: {}
  },
  setup(e) {
    const t = e, a = s(() => t.decorative === !0 ? "" : t.title !== void 0 ? t.title : ""), { rootClasses: n } = z1(t);
    return (l, o) => (R(), qe(F(sg), pe(l.$attrs, {
      class: F(n),
      src: e.src,
      ratio: e.ratio,
      title: a.value
    }), {
      default: ve(() => [
        ee(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "src", "ratio", "title"]));
  }
}), P1 = V1, R1 = {
  default: "status",
  info: "status",
  success: "status",
  warning: "alert",
  error: "alert"
}, F1 = {
  default: "polite",
  info: "polite",
  success: "polite",
  warning: "assertive",
  error: "assertive"
};
function E1(e) {
  const t = s(() => e.variant ?? "default"), a = s(() => ({
    [`dss-banner--${t.value}`]: !0,
    "dss-banner--dismissible": e.dismissible
  })), n = s(() => R1[t.value]), l = s(() => F1[t.value]);
  return { rootClasses: a, ariaRole: n, ariaLive: l };
}
const I1 = {
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
}, O1 = {
  key: 0,
  class: "dss-button__loading"
}, H1 = {
  key: 2,
  class: "dss-button__icon dss-button__icon--left"
}, N1 = {
  key: 3,
  class: "dss-button__label"
}, j1 = {
  key: 4,
  class: "dss-button__icon dss-button__icon--right"
}, Q1 = {
  key: 5,
  class: "dss-button__ripple"
};
function U1(e, t, a, n, l, o) {
  return R(), qe(Wn(o.componentType), pe({
    type: o.nativeType,
    to: a.to,
    replace: a.replace,
    disabled: a.disabled || a.loading,
    class: o.buttonClasses,
    style: o.buttonStyle,
    tabindex: o.computedTabindex
  }, e.$attrs, { onClick: o.handleClick }), {
    default: ve(() => [
      a.loading && a.percentage === null ? (R(), ne("span", O1, [...t[0] || (t[0] = [
        Oe("span", { class: "dss-button__spinner" }, null, -1)
      ])])) : me("", !0),
      a.loading && a.percentage !== null ? (R(), ne("span", {
        key: 1,
        class: qt(["dss-button__progress", { "dss-button__progress--dark": a.darkPercentage }])
      }, [
        Oe("span", {
          class: "dss-button__progress-indicator",
          style: gn(o.percentageStyle)
        }, null, 4)
      ], 2)) : me("", !0),
      o.computedIconLeft && !a.loading ? (R(), ne("span", H1, Ee(o.computedIconLeft), 1)) : me("", !0),
      a.label || e.$slots.default ? (R(), ne("span", N1, [
        ee(e.$slots, "default", {}, () => [
          ht(Ee(a.label), 1)
        ])
      ])) : me("", !0),
      o.computedIconRight && !a.loading ? (R(), ne("span", j1, Ee(o.computedIconRight), 1)) : me("", !0),
      a.ripple ? (R(), ne("span", Q1)) : me("", !0)
    ]),
    _: 3
  }, 16, ["type", "to", "replace", "disabled", "class", "style", "tabindex", "onClick"]);
}
const K1 = /* @__PURE__ */ Xl(I1, [["render", U1]]), ja = K1, W1 = { name: "DssBanner", inheritAttrs: !1 }, Y1 = /* @__PURE__ */ he({
  ...W1,
  props: {
    variant: {},
    icon: {},
    dismissible: { type: Boolean },
    dismissLabel: {},
    dense: { type: Boolean },
    rounded: { type: Boolean },
    inlineActions: { type: Boolean }
  },
  emits: ["dismiss"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = Nt(), { rootClasses: o, ariaRole: i, ariaLive: r } = E1(a), u = {
      info: "info",
      success: "check_circle",
      warning: "warning",
      error: "error"
    }, c = s(() => a.icon !== void 0 ? a.icon : u[a.variant ?? "default"] ?? ""), d = s(() => !!(c.value || l.avatar)), v = s(() => !!(a.dismissible || l.actions));
    function b() {
      n("dismiss");
    }
    return (m, g) => (R(), qe(F(pc), pe(m.$attrs, {
      class: [F(o), "dss-banner"],
      dense: e.dense,
      rounded: e.rounded,
      "inline-actions": e.inlineActions,
      role: F(i),
      "aria-live": F(r)
    }), Et({
      default: ve(() => [
        ee(m.$slots, "default")
      ]),
      _: 2
    }, [
      d.value ? {
        name: "avatar",
        fn: ve(() => [
          ee(m.$slots, "avatar", {}, () => [
            c.value ? (R(), qe(Ca, {
              key: 0,
              name: c.value,
              size: "md",
              class: "dss-banner__icon",
              "aria-hidden": "true"
            }, null, 8, ["name"])) : me("", !0)
          ])
        ]),
        key: "0"
      } : void 0,
      v.value ? {
        name: "action",
        fn: ve(() => [
          ee(m.$slots, "actions", {}, () => [
            e.dismissible ? (R(), qe(ja, {
              key: 0,
              variant: "flat",
              round: !0,
              icon: "close",
              size: "sm",
              class: "dss-banner__dismiss",
              "aria-label": e.dismissLabel ?? "Fechar",
              onClick: b
            }, null, 8, ["aria-label"])) : me("", !0)
          ])
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["class", "dense", "rounded", "inline-actions", "role", "aria-live"]));
  }
}), X1 = Y1;
function G1(e) {
  return { dialogClasses: s(() => ({
    "dss-dialog": !0,
    "dss-dialog--maximized": e.maximized,
    "dss-dialog--full-width": e.fullWidth,
    "dss-dialog--full-height": e.fullHeight,
    "dss-dialog--seamless": e.seamless,
    [`dss-dialog--position-${e.position ?? "standard"}`]: !0
  })) };
}
const Z1 = {
  key: 0,
  class: "dss-dialog__header"
}, J1 = { class: "dss-dialog__body" }, ek = {
  key: 1,
  class: "dss-dialog__footer"
}, tk = /* @__PURE__ */ he({
  name: "DssDialog",
  inheritAttrs: !1,
  __name: "DssDialog.ts",
  props: {
    open: { type: Boolean },
    persistent: { type: Boolean },
    seamless: { type: Boolean },
    maximized: { type: Boolean },
    fullWidth: { type: Boolean },
    fullHeight: { type: Boolean },
    position: { default: "standard" },
    transitionEnter: { default: "scale" },
    transitionLeave: { default: "scale" },
    disableEsc: { type: Boolean },
    disableBackdropClick: { type: Boolean }
  },
  emits: ["update:open", "open", "close", "before-open", "before-close"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = Nt(), { dialogClasses: o } = G1(a), i = s(() => !!l.header), r = s(() => !!l.footer);
    return (u, c) => {
      const d = lt("q-dialog");
      return R(), qe(d, pe({
        "model-value": a.open,
        persistent: a.persistent,
        seamless: a.seamless,
        maximized: a.maximized,
        "full-width": a.fullWidth,
        "full-height": a.fullHeight,
        position: a.position ?? "standard",
        "transition-show": a.transitionEnter ?? "scale",
        "transition-hide": a.transitionLeave ?? "scale",
        "no-esc-dismiss": a.disableEsc,
        "no-backdrop-dismiss": a.disableBackdropClick
      }, u.$attrs, {
        "onUpdate:modelValue": c[0] || (c[0] = (v) => n("update:open", v)),
        onShow: c[1] || (c[1] = (v) => n("open")),
        onHide: c[2] || (c[2] = (v) => n("close")),
        onBeforeShow: c[3] || (c[3] = (v) => n("before-open")),
        onBeforeHide: c[4] || (c[4] = (v) => n("before-close"))
      }), {
        default: ve(() => [
          Oe("div", {
            class: qt(F(o))
          }, [
            i.value ? (R(), ne("div", Z1, [
              ee(u.$slots, "header")
            ])) : me("", !0),
            Oe("div", J1, [
              ee(u.$slots, "default")
            ]),
            r.value ? (R(), ne("div", ek, [
              ee(u.$slots, "footer")
            ])) : me("", !0)
          ], 2)
        ]),
        _: 3
      }, 16, ["model-value", "persistent", "seamless", "maximized", "full-width", "full-height", "position", "transition-show", "transition-hide", "no-esc-dismiss", "no-backdrop-dismiss"]);
    };
  }
}), ak = tk;
function nk(e) {
  return { tableClasses: s(() => [
    "dss-table",
    e.density === "compact" && "dss-table--compact",
    e.density === "comfortable" && "dss-table--comfortable",
    e.loading && "dss-table--loading"
  ].filter(Boolean)) };
}
const lk = {
  name: "DssTable",
  inheritAttrs: !1
}, ok = /* @__PURE__ */ he({
  ...lk,
  props: {
    rows: {},
    columns: {},
    rowKey: { default: "id" },
    title: {},
    loading: { type: Boolean },
    filter: {},
    selection: { default: "none" },
    modelValue: { default: () => [] },
    pagination: {},
    density: { default: "standard" },
    bordered: { type: Boolean },
    flat: { type: Boolean },
    wrapCells: { type: Boolean },
    separator: { default: "horizontal" },
    virtualScroll: { type: Boolean },
    noDataLabel: { default: "Nenhum dado disponível" },
    noResultsLabel: { default: "Nenhum resultado encontrado para o filtro aplicado" },
    hideBottom: { type: Boolean },
    hideHeader: { type: Boolean },
    rowsPerPageOptions: { default: () => [10, 25, 50] }
  },
  emits: ["update:modelValue", "update:pagination", "request", "selection", "row-click", "row-dblclick", "row-contextmenu"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, { tableClasses: o } = nk(n), i = s(() => n.density === "compact"), r = z();
    return t({
      /** Dispara requisição server-side manualmente */
      requestServerInteraction: (u) => {
        var c;
        return (c = r.value) == null ? void 0 : c.requestServerInteraction(u);
      },
      /** Reinicia o virtual-scroll para o início */
      resetVirtualScroll: () => {
        var u;
        return (u = r.value) == null ? void 0 : u.resetVirtualScroll();
      },
      /** Scrolla para o índice especificado (modo virtual-scroll) */
      scrollTo: (u, c) => {
        var d;
        return (d = r.value) == null ? void 0 : d.scrollTo(u, c);
      },
      /** Limpa toda a seleção atual */
      clearSelection: () => {
        var u;
        return (u = r.value) == null ? void 0 : u.clearSelection();
      },
      /** Ordena por uma coluna específica */
      sort: (u) => {
        var c;
        return (c = r.value) == null ? void 0 : c.sort(u);
      }
    }), (u, c) => {
      const d = lt("q-table");
      return R(), qe(d, pe({
        ref_key: "qTableRef",
        ref: r
      }, u.$attrs, {
        class: F(o),
        rows: n.rows,
        columns: n.columns,
        "row-key": n.rowKey,
        title: n.title,
        loading: n.loading,
        filter: n.filter,
        selection: n.selection !== "none" ? n.selection : void 0,
        selected: n.modelValue,
        pagination: n.pagination,
        dense: i.value,
        bordered: n.bordered,
        flat: n.flat,
        "wrap-cells": n.wrapCells,
        separator: n.separator,
        "virtual-scroll": n.virtualScroll,
        "no-data-label": n.noDataLabel,
        "no-results-label": n.noResultsLabel,
        "hide-bottom": n.hideBottom,
        "hide-header": n.hideHeader,
        "rows-per-page-options": n.rowsPerPageOptions,
        "onUpdate:selected": c[0] || (c[0] = (v) => l("update:modelValue", v)),
        "onUpdate:pagination": c[1] || (c[1] = (v) => l("update:pagination", v)),
        onRequest: c[2] || (c[2] = (v) => l("request", v)),
        onSelection: c[3] || (c[3] = (v) => l("selection", v)),
        onRowClick: c[4] || (c[4] = (v, b, m) => l("row-click", v, b, m)),
        onRowDblclick: c[5] || (c[5] = (v, b, m) => l("row-dblclick", v, b, m)),
        onRowContextmenu: c[6] || (c[6] = (v, b, m) => l("row-contextmenu", v, b, m))
      }), Et({ _: 2 }, [
        u.$slots.top ? {
          name: "top",
          fn: ve((v) => [
            ee(u.$slots, "top", Lt(zt(v)))
          ]),
          key: "0"
        } : void 0,
        u.$slots["top-left"] ? {
          name: "top-left",
          fn: ve((v) => [
            ee(u.$slots, "top-left", Lt(zt(v)))
          ]),
          key: "1"
        } : void 0,
        u.$slots["top-right"] ? {
          name: "top-right",
          fn: ve((v) => [
            ee(u.$slots, "top-right", Lt(zt(v)))
          ]),
          key: "2"
        } : void 0,
        u.$slots["top-row"] ? {
          name: "top-row",
          fn: ve((v) => [
            ee(u.$slots, "top-row", Lt(zt(v)))
          ]),
          key: "3"
        } : void 0,
        u.$slots["top-selection"] ? {
          name: "top-selection",
          fn: ve((v) => [
            ee(u.$slots, "top-selection", Lt(zt(v)))
          ]),
          key: "4"
        } : void 0,
        u.$slots.header ? {
          name: "header",
          fn: ve((v) => [
            ee(u.$slots, "header", Lt(zt(v)))
          ]),
          key: "5"
        } : void 0,
        u.$slots["header-cell"] ? {
          name: "header-cell",
          fn: ve((v) => [
            ee(u.$slots, "header-cell", Lt(zt(v)))
          ]),
          key: "6"
        } : void 0,
        u.$slots.body ? {
          name: "body",
          fn: ve((v) => [
            ee(u.$slots, "body", Lt(zt(v)))
          ]),
          key: "7"
        } : void 0,
        u.$slots["body-row"] ? {
          name: "body-row",
          fn: ve((v) => [
            ee(u.$slots, "body-row", Lt(zt(v)))
          ]),
          key: "8"
        } : void 0,
        u.$slots["body-cell"] ? {
          name: "body-cell",
          fn: ve((v) => [
            ee(u.$slots, "body-cell", Lt(zt(v)))
          ]),
          key: "9"
        } : void 0,
        u.$slots["no-data"] ? {
          name: "no-data",
          fn: ve((v) => [
            ee(u.$slots, "no-data", Lt(zt(v)))
          ]),
          key: "10"
        } : void 0,
        u.$slots.loading ? {
          name: "loading",
          fn: ve(() => [
            ee(u.$slots, "loading")
          ]),
          key: "11"
        } : void 0,
        u.$slots.pagination ? {
          name: "pagination",
          fn: ve((v) => [
            ee(u.$slots, "pagination", Lt(zt(v)))
          ]),
          key: "12"
        } : void 0,
        u.$slots.bottom ? {
          name: "bottom",
          fn: ve((v) => [
            ee(u.$slots, "bottom", Lt(zt(v)))
          ]),
          key: "13"
        } : void 0,
        u.$slots["bottom-row"] ? {
          name: "bottom-row",
          fn: ve((v) => [
            ee(u.$slots, "bottom-row", Lt(zt(v)))
          ]),
          key: "14"
        } : void 0
      ]), 1040, ["class", "rows", "columns", "row-key", "title", "loading", "filter", "selection", "selected", "pagination", "dense", "bordered", "flat", "wrap-cells", "separator", "virtual-scroll", "no-data-label", "no-results-label", "hide-bottom", "hide-header", "rows-per-page-options"]);
    };
  }
}), ik = ok;
function rk(e) {
  return { rootClasses: s(() => ({
    "dss-carousel--arrows": e.arrows,
    "dss-carousel--navigation": e.navigation,
    "dss-carousel--thumbnails": e.thumbnails,
    "dss-carousel--padding": e.padding,
    "dss-carousel--vertical": e.vertical,
    "dss-carousel--infinite": e.infinite,
    "dss-carousel--autoplay": !!e.autoplay,
    [`dss-carousel--navigation-${e.navigationPosition ?? "bottom"}`]: e.navigation
  })) };
}
const sk = /* @__PURE__ */ he({
  name: "DssCarousel",
  inheritAttrs: !1,
  __name: "DssCarousel.ts",
  props: {
    modelValue: {},
    animated: { type: Boolean, default: !0 },
    swipeable: { type: Boolean, default: !0 },
    vertical: { type: Boolean },
    infinite: { type: Boolean },
    autoplay: { type: [Boolean, Number] },
    height: {},
    padding: { type: Boolean },
    arrows: { type: Boolean },
    prevIcon: {},
    nextIcon: {},
    navigation: { type: Boolean },
    navigationPosition: {},
    navigationActiveIcon: {},
    navigationIcon: {},
    thumbnails: { type: Boolean },
    controlType: { default: "flat" },
    fullscreen: { type: Boolean },
    keepAlive: { type: Boolean },
    keepAliveInclude: {},
    keepAliveExclude: {},
    keepAliveMax: {},
    ariaLabel: {}
  },
  emits: ["update:modelValue", "before-transition", "transition", "fullscreen"],
  setup(e, { emit: t }) {
    const a = e, n = t, { rootClasses: l } = rk(a);
    return (o, i) => (R(), qe(F(rf), pe(o.$attrs, {
      "model-value": e.modelValue,
      animated: e.animated,
      swipeable: e.swipeable,
      vertical: e.vertical,
      infinite: e.infinite,
      autoplay: e.autoplay,
      height: e.height,
      padding: e.padding,
      arrows: e.arrows,
      "prev-icon": e.prevIcon,
      "next-icon": e.nextIcon,
      navigation: e.navigation,
      "navigation-position": e.navigationPosition,
      "navigation-active-icon": e.navigationActiveIcon,
      "navigation-icon": e.navigationIcon,
      thumbnails: e.thumbnails,
      "control-type": e.controlType,
      "keep-alive": e.keepAlive,
      "keep-alive-include": e.keepAliveInclude,
      "keep-alive-exclude": e.keepAliveExclude,
      "keep-alive-max": e.keepAliveMax,
      fullscreen: e.fullscreen,
      "control-color": "primary",
      role: "region",
      "aria-label": e.ariaLabel ?? "Carrossel de conteúdo",
      class: [F(l), "dss-carousel"],
      "onUpdate:modelValue": i[0] || (i[0] = (r) => n("update:modelValue", r)),
      onBeforeTransition: i[1] || (i[1] = (r, u) => n("before-transition", r, u)),
      onTransition: i[2] || (i[2] = (r, u) => n("transition", r, u)),
      onFullscreen: i[3] || (i[3] = (r) => n("fullscreen", r))
    }), {
      default: ve(() => [
        ee(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["model-value", "animated", "swipeable", "vertical", "infinite", "autoplay", "height", "padding", "arrows", "prev-icon", "next-icon", "navigation", "navigation-position", "navigation-active-icon", "navigation-icon", "thumbnails", "control-type", "keep-alive", "keep-alive-include", "keep-alive-exclude", "keep-alive-max", "fullscreen", "aria-label", "class"]));
  }
}), uk = sk, dk = /* @__PURE__ */ he({
  name: "DssCarouselSlide",
  inheritAttrs: !1,
  __name: "DssCarouselSlide.ts",
  props: {
    name: {},
    disable: { type: Boolean },
    imgSrc: {},
    imgStyle: {},
    imgClass: {}
  },
  setup(e) {
    return (t, a) => (R(), qe(F(sf), pe(t.$attrs, {
      name: e.name,
      disable: e.disable,
      "img-src": e.imgSrc,
      "img-style": e.imgStyle,
      "img-class": e.imgClass,
      role: "group",
      class: "dss-carousel__slide"
    }), {
      default: ve(() => [
        ee(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["name", "disable", "img-src", "img-style", "img-class"]));
  }
}), ck = dk;
function fk(e) {
  return { sheetClasses: s(() => ({
    "dss-bottom-sheet": !0,
    "dss-bottom-sheet--maximized": e.maximized,
    "dss-bottom-sheet--square": e.square
  })) };
}
const vk = {
  class: "dss-bottom-sheet__handle-area",
  "aria-hidden": "true"
}, mk = {
  key: 0,
  class: "dss-bottom-sheet__handle"
}, gk = {
  key: 0,
  class: "dss-bottom-sheet__header"
}, hk = { class: "dss-bottom-sheet__body" }, bk = /* @__PURE__ */ he({
  name: "DssBottomSheet",
  inheritAttrs: !1,
  __name: "DssBottomSheet.ts",
  props: {
    open: { type: Boolean },
    persistent: { type: Boolean },
    maximized: { type: Boolean },
    square: { type: Boolean },
    noEscDismiss: { type: Boolean },
    noBackdropDismiss: { type: Boolean },
    transitionEnter: { default: "slide-up" },
    transitionLeave: { default: "slide-down" },
    showHandle: { type: Boolean, default: !0 }
  },
  emits: ["update:open", "open", "close", "before-open", "before-close"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = Nt(), { sheetClasses: o } = fk(a), i = s(() => !!l.header);
    return (r, u) => {
      const c = lt("q-dialog");
      return R(), qe(c, pe({
        "model-value": a.open,
        position: "bottom",
        "full-width": "",
        persistent: a.persistent,
        maximized: a.maximized,
        "no-esc-dismiss": a.noEscDismiss,
        "no-backdrop-dismiss": a.noBackdropDismiss,
        "transition-show": a.transitionEnter ?? "slide-up",
        "transition-hide": a.transitionLeave ?? "slide-down"
      }, r.$attrs, {
        "onUpdate:modelValue": u[0] || (u[0] = (d) => n("update:open", d)),
        onShow: u[1] || (u[1] = (d) => n("open")),
        onHide: u[2] || (u[2] = (d) => n("close")),
        onBeforeShow: u[3] || (u[3] = (d) => n("before-open")),
        onBeforeHide: u[4] || (u[4] = (d) => n("before-close"))
      }), {
        default: ve(() => [
          Oe("div", {
            class: qt(F(o))
          }, [
            Oe("div", vk, [
              ee(r.$slots, "handle", {}, () => [
                a.showHandle ? (R(), ne("div", mk)) : me("", !0)
              ])
            ]),
            i.value ? (R(), ne("div", gk, [
              ee(r.$slots, "header")
            ])) : me("", !0),
            Oe("div", hk, [
              ee(r.$slots, "default")
            ])
          ], 2)
        ]),
        _: 3
      }, 16, ["model-value", "persistent", "maximized", "no-esc-dismiss", "no-backdrop-dismiss", "transition-show", "transition-hide"]);
    };
  }
}), yk = bk;
function pk(e) {
  return { rootClasses: s(() => ({
    "dss-chat-message--mine": e.isMine,
    "dss-chat-message--received": !e.isMine,
    "dss-chat-message--compact": e.compact,
    "dss-chat-message--selected": e.selected,
    "dss-chat-message--disable": e.disable,
    [`dss-chat-message--status-${e.status}`]: !!e.status
  })) };
}
const kk = ["aria-label"], Ck = {
  key: 0,
  class: "dss-chat-message__avatar-area",
  "aria-hidden": "true"
}, Sk = ["src", "alt"], wk = {
  key: 1,
  "aria-hidden": "true"
}, xk = { class: "dss-chat-message__main" }, _k = {
  key: 0,
  class: "dss-chat-message__sender-name"
}, $k = { class: "dss-chat-message__bubble" }, qk = { class: "dss-chat-message__content" }, Bk = {
  key: 0,
  class: "dss-chat-message__text"
}, Tk = {
  key: 0,
  class: "dss-chat-message__meta",
  "aria-hidden": "true"
}, Mk = ["datetime"], Ak = {
  key: 1,
  class: "dss-chat-message__actions"
}, Dk = {
  key: 1,
  class: "dss-chat-message__avatar-area dss-chat-message__avatar-area--mine",
  "aria-hidden": "true"
}, Lk = ["src", "alt"], zk = {
  key: 1,
  "aria-hidden": "true"
}, Vk = /* @__PURE__ */ he({
  name: "DssChatMessage",
  inheritAttrs: !1,
  __name: "DssChatMessage.ts",
  props: {
    message: {},
    isMine: { type: Boolean },
    timestamp: {},
    datetimeValue: {},
    senderName: {},
    avatarSrc: {},
    status: {},
    compact: { type: Boolean },
    selected: { type: Boolean },
    showAvatar: { type: Boolean, default: !0 },
    disable: { type: Boolean }
  },
  emits: ["click", "long-press"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = Nt(), { rootClasses: o } = pk(a), i = {
      sending: "schedule",
      sent: "done",
      delivered: "done_all",
      read: "done_all",
      error: "error_outline"
    }, r = s(
      () => a.status ? i[a.status] ?? null : null
    ), u = s(() => a.senderName ? a.senderName.split(" ").slice(0, 2).map((p) => {
      var k;
      return ((k = p[0]) == null ? void 0 : k.toUpperCase()) ?? "";
    }).join("") : "?"), c = s(() => {
      const p = [];
      if (a.senderName ? p.push(`Mensagem de ${a.senderName}`) : a.isMine ? p.push("Mensagem enviada") : p.push("Mensagem recebida"), a.timestamp && p.push(`em ${a.timestamp}`), a.status) {
        const k = {
          sending: "enviando",
          sent: "enviada",
          delivered: "entregue",
          read: "lida",
          error: "erro no envio"
        };
        p.push(`status: ${k[a.status] ?? a.status}`);
      }
      return p.join(", ");
    });
    let d = null, v = null;
    const b = (p) => {
      a.disable || (v = p, d = setTimeout(() => {
        v && n("long-press", v);
      }, 500));
    }, m = () => {
      d && (clearTimeout(d), d = null), v = null;
    };
    tt(() => {
      m();
    });
    const g = (p) => {
      a.disable || n("click", p);
    };
    return (p, k) => (R(), ne("article", pe(p.$attrs, {
      class: [F(o), "dss-chat-message"],
      "aria-label": c.value,
      role: "listitem",
      onClick: g,
      onPointerdown: b,
      onPointerup: m,
      onPointermove: m,
      onPointercancel: m
    }), [
      !e.isMine && e.showAvatar ? (R(), ne("div", Ck, [
        ee(p.$slots, "avatar", {}, () => [
          Mt(Uo, {
            size: e.compact ? "sm" : "md",
            class: "dss-chat-message__avatar"
          }, {
            default: ve(() => [
              e.avatarSrc ? (R(), ne("img", {
                key: 0,
                src: e.avatarSrc,
                alt: e.senderName ?? "",
                class: "dss-chat-message__avatar-img"
              }, null, 8, Sk)) : (R(), ne("span", wk, Ee(u.value), 1))
            ]),
            _: 1
          }, 8, ["size"])
        ])
      ])) : me("", !0),
      Oe("div", xk, [
        !e.isMine && (e.senderName || F(l)["sender-name"]) ? (R(), ne("div", _k, [
          ee(p.$slots, "sender-name", {}, () => [
            ht(Ee(e.senderName), 1)
          ])
        ])) : me("", !0),
        Oe("div", $k, [
          Oe("div", qk, [
            ee(p.$slots, "default", {}, () => [
              e.message ? (R(), ne("p", Bk, Ee(e.message), 1)) : me("", !0)
            ])
          ]),
          e.timestamp || e.status ? (R(), ne("div", Tk, [
            e.timestamp ? (R(), ne("time", {
              key: 0,
              class: "dss-chat-message__timestamp",
              datetime: e.datetimeValue
            }, Ee(e.timestamp), 9, Mk)) : me("", !0),
            e.status && r.value ? (R(), ne("span", {
              key: 1,
              class: qt(`dss-chat-message__status dss-chat-message__status--${e.status}`)
            }, [
              Mt(Ca, {
                name: r.value,
                size: "xs",
                decorative: ""
              }, null, 8, ["name"])
            ], 2)) : me("", !0)
          ])) : me("", !0)
        ]),
        F(l).actions ? (R(), ne("div", Ak, [
          ee(p.$slots, "actions")
        ])) : me("", !0)
      ]),
      e.isMine && e.showAvatar ? (R(), ne("div", Dk, [
        ee(p.$slots, "avatar", {}, () => [
          e.avatarSrc || e.senderName ? (R(), qe(Uo, {
            key: 0,
            size: e.compact ? "sm" : "md",
            class: "dss-chat-message__avatar"
          }, {
            default: ve(() => [
              e.avatarSrc ? (R(), ne("img", {
                key: 0,
                src: e.avatarSrc,
                alt: e.senderName ?? "",
                class: "dss-chat-message__avatar-img"
              }, null, 8, Lk)) : (R(), ne("span", zk, Ee(u.value), 1))
            ]),
            _: 1
          }, 8, ["size"])) : me("", !0)
        ])
      ])) : me("", !0)
    ], 16, kk));
  }
}), Pk = Vk;
function Rk(e) {
  return { colorPickerClasses: s(() => ({
    "dss-color-picker": !0
  })) };
}
const Fk = /* @__PURE__ */ he({
  name: "DssColorPicker",
  inheritAttrs: !1,
  __name: "DssColorPicker.ts",
  props: {
    modelValue: {},
    defaultValue: {},
    formatModel: {},
    noHeader: { type: Boolean },
    noHeaderTabs: { type: Boolean },
    noFooter: { type: Boolean },
    defaultView: {},
    palette: {},
    square: { type: Boolean },
    flat: { type: Boolean },
    bordered: { type: Boolean },
    disable: { type: Boolean },
    readonly: { type: Boolean },
    name: {},
    tabindex: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const a = e, n = t, { colorPickerClasses: l } = Rk();
    return (o, i) => (R(), qe(F(_f), pe(o.$attrs, {
      class: F(l),
      "model-value": a.modelValue,
      "default-value": a.defaultValue,
      "format-model": a.formatModel,
      "no-header": a.noHeader,
      "no-header-tabs": a.noHeaderTabs,
      "no-footer": a.noFooter,
      "default-view": a.defaultView,
      palette: a.palette,
      square: a.square,
      flat: a.flat,
      bordered: a.bordered,
      disable: a.disable,
      readonly: a.readonly,
      name: a.name,
      tabindex: a.tabindex,
      color: "primary",
      "onUpdate:modelValue": i[0] || (i[0] = (r) => n("update:modelValue", r)),
      onChange: i[1] || (i[1] = (r) => n("change", r))
    }), null, 16, ["class", "model-value", "default-value", "format-model", "no-header", "no-header-tabs", "no-footer", "default-view", "palette", "square", "flat", "bordered", "disable", "readonly", "name", "tabindex"]));
  }
}), Ek = Fk;
function Ik(e) {
  return { datePickerClasses: s(() => ({
    "dss-date-picker": !0
  })) };
}
const Ok = /* @__PURE__ */ he({
  name: "DssDatePicker",
  inheritAttrs: !1,
  __name: "DssDatePicker.ts",
  props: {
    modelValue: {},
    multiple: { type: Boolean },
    range: { type: Boolean },
    mask: {},
    locale: {},
    calendar: {},
    landscape: { type: Boolean },
    minimal: { type: Boolean },
    todayBtn: { type: Boolean },
    emitImmediately: { type: Boolean },
    defaultView: {},
    defaultYearMonth: {},
    yearsInMonthView: { type: Boolean },
    options: { type: [Array, Function] },
    events: { type: [Array, Function] },
    eventColor: { type: [String, Function] },
    navigationMinYearMonth: {},
    navigationMaxYearMonth: {},
    noUnset: { type: Boolean },
    firstDayOfWeek: {},
    title: {},
    subtitle: {},
    name: {},
    tabindex: {},
    disable: { type: Boolean },
    readonly: { type: Boolean }
  },
  emits: ["update:modelValue", "navigation", "range-start", "range-end"],
  setup(e, { emit: t }) {
    const a = e, n = t, { datePickerClasses: l } = Ik();
    return (o, i) => (R(), qe(F(Rf), pe(o.$attrs, {
      class: F(l),
      "model-value": a.modelValue,
      multiple: a.multiple,
      range: a.range,
      mask: a.mask,
      locale: a.locale,
      calendar: a.calendar,
      landscape: a.landscape,
      minimal: a.minimal,
      "today-btn": a.todayBtn,
      "emit-immediately": a.emitImmediately,
      "default-view": a.defaultView,
      "default-year-month": a.defaultYearMonth,
      "years-in-month-view": a.yearsInMonthView,
      options: a.options,
      events: a.events,
      "event-color": a.eventColor,
      "navigation-min-year-month": a.navigationMinYearMonth,
      "navigation-max-year-month": a.navigationMaxYearMonth,
      "no-unset": a.noUnset,
      "first-day-of-week": a.firstDayOfWeek,
      title: a.title,
      subtitle: a.subtitle,
      name: a.name,
      tabindex: a.tabindex,
      disable: a.disable,
      readonly: a.readonly,
      color: "primary",
      "onUpdate:modelValue": i[0] || (i[0] = (r) => n("update:modelValue", r)),
      onNavigation: i[1] || (i[1] = (r) => n("navigation", r)),
      onRangeStart: i[2] || (i[2] = (r) => n("range-start", r)),
      onRangeEnd: i[3] || (i[3] = (r) => n("range-end", r))
    }), Et({ _: 2 }, [
      o.$slots.default ? {
        name: "default",
        fn: ve(() => [
          ee(o.$slots, "default")
        ]),
        key: "0"
      } : void 0
    ]), 1040, ["class", "model-value", "multiple", "range", "mask", "locale", "calendar", "landscape", "minimal", "today-btn", "emit-immediately", "default-view", "default-year-month", "years-in-month-view", "options", "events", "event-color", "navigation-min-year-month", "navigation-max-year-month", "no-unset", "first-day-of-week", "title", "subtitle", "name", "tabindex", "disable", "readonly"]));
  }
}), Hk = Ok;
function Nk(e) {
  return { timePickerClasses: s(() => ({
    "dss-time-picker": !0
  })) };
}
const jk = /* @__PURE__ */ he({
  name: "DssTimePicker",
  inheritAttrs: !1,
  __name: "DssTimePicker.ts",
  props: {
    modelValue: {},
    landscape: { type: Boolean },
    mask: {},
    locale: {},
    format24h: { type: Boolean },
    defaultView: {},
    options: { type: Function },
    hourOptions: {},
    minuteOptions: {},
    secondOptions: {},
    withSeconds: { type: Boolean },
    nowBtn: { type: Boolean },
    minimal: { type: Boolean },
    readonly: { type: Boolean },
    disable: { type: Boolean },
    name: {},
    tabindex: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, { timePickerClasses: l } = Nk();
    return (o, i) => (R(), qe(F(Wm), pe(o.$attrs, {
      class: F(l),
      "model-value": a.modelValue,
      landscape: a.landscape,
      mask: a.mask,
      locale: a.locale,
      format24h: a.format24h,
      "default-view": a.defaultView,
      options: a.options,
      "hour-options": a.hourOptions,
      "minute-options": a.minuteOptions,
      "second-options": a.secondOptions,
      "with-seconds": a.withSeconds,
      "now-btn": a.nowBtn,
      minimal: a.minimal,
      readonly: a.readonly,
      disable: a.disable,
      name: a.name,
      tabindex: a.tabindex,
      color: "primary",
      "onUpdate:modelValue": i[0] || (i[0] = (r) => n("update:modelValue", r))
    }), Et({ _: 2 }, [
      o.$slots.default ? {
        name: "default",
        fn: ve(() => [
          ee(o.$slots, "default")
        ]),
        key: "0"
      } : void 0
    ]), 1040, ["class", "model-value", "landscape", "mask", "locale", "format24h", "default-view", "options", "hour-options", "minute-options", "second-options", "with-seconds", "now-btn", "minimal", "readonly", "disable", "name", "tabindex"]));
  }
}), Qk = jk;
function Uk(e) {
  return { formClasses: s(() => ({
    "dss-form": !0
  })) };
}
const Kk = /* @__PURE__ */ he({
  name: "DssForm",
  inheritAttrs: !1,
  __name: "DssForm.ts",
  props: {
    autofocus: { type: Boolean },
    greedy: { type: Boolean },
    noErrorFocus: { type: Boolean }
  },
  emits: ["submit", "reset", "validationError", "validationSuccess"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = z(null), { formClasses: i } = Uk();
    return t({
      validate: (r) => {
        var u;
        return (u = o.value) == null ? void 0 : u.validate(r);
      },
      resetValidation: () => {
        var r;
        return (r = o.value) == null ? void 0 : r.resetValidation();
      },
      submit: (r) => {
        var u;
        return (u = o.value) == null ? void 0 : u.submit(r);
      },
      reset: () => {
        var r;
        return (r = o.value) == null ? void 0 : r.reset();
      }
    }), (r, u) => {
      const c = lt("q-form");
      return R(), qe(c, pe({
        ref_key: "qFormRef",
        ref: o,
        class: F(i),
        autofocus: n.autofocus,
        greedy: n.greedy,
        "no-error-focus": n.noErrorFocus
      }, r.$attrs, {
        onSubmit: u[0] || (u[0] = (d) => l("submit", d)),
        onReset: u[1] || (u[1] = (d) => l("reset", d)),
        onValidationError: u[2] || (u[2] = (d, v, b) => l("validationError", d, v, b)),
        onValidationSuccess: u[3] || (u[3] = (d) => l("validationSuccess"))
      }), {
        default: ve(() => [
          ee(r.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "autofocus", "greedy", "no-error-focus"]);
    };
  }
}), Wk = Kk, Yk = /* @__PURE__ */ he({
  name: "DssPopupEdit",
  inheritAttrs: !1,
  __name: "DssPopupEdit.ts",
  props: {
    modelValue: {},
    title: {},
    buttons: { type: Boolean, default: !0 },
    labelSet: { default: "Salvar" },
    labelCancel: { default: "Cancelar" },
    persistent: { type: Boolean },
    fit: { type: Boolean },
    cover: { type: Boolean },
    anchor: {},
    self: {},
    offset: {},
    maxHeight: {},
    maxWidth: {},
    autoSave: { type: Boolean },
    validate: {},
    touchPosition: { type: Boolean },
    disable: { type: Boolean }
  },
  emits: ["update:modelValue", "save", "cancel", "show", "hide", "before-show", "before-hide"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = z(null);
    return t({
      set: () => {
        var i;
        return (i = o.value) == null ? void 0 : i.set();
      },
      cancel: () => {
        var i;
        return (i = o.value) == null ? void 0 : i.cancel();
      }
    }), (i, r) => {
      const u = lt("q-popup-edit");
      return R(), qe(u, pe({
        "model-value": n.modelValue,
        title: n.title,
        buttons: n.buttons,
        "label-set": n.labelSet,
        "label-cancel": n.labelCancel,
        persistent: n.persistent,
        fit: n.fit,
        cover: n.cover,
        anchor: n.anchor,
        self: n.self,
        offset: n.offset,
        "max-height": n.maxHeight,
        "max-width": n.maxWidth,
        "auto-save": n.autoSave,
        validate: n.validate,
        "touch-position": n.touchPosition,
        disable: n.disable
      }, i.$attrs, {
        "onUpdate:modelValue": r[0] || (r[0] = (c) => l("update:modelValue", c)),
        onSave: r[1] || (r[1] = (c, d) => l("save", c, d)),
        onCancel: r[2] || (r[2] = (c) => l("cancel")),
        onShow: r[3] || (r[3] = (c) => l("show")),
        onHide: r[4] || (r[4] = (c) => l("hide")),
        onBeforeShow: r[5] || (r[5] = (c) => l("before-show")),
        onBeforeHide: r[6] || (r[6] = (c) => l("before-hide")),
        ref_key: "popupEditRef",
        ref: o
      }), {
        default: ve(() => [
          ee(i.$slots, "default")
        ]),
        _: 3
      }, 16, ["model-value", "title", "buttons", "label-set", "label-cancel", "persistent", "fit", "cover", "anchor", "self", "offset", "max-height", "max-width", "auto-save", "validate", "touch-position", "disable"]);
    };
  }
}), Xk = Yk;
function Gk(e) {
  return { rootClasses: s(() => [
    "dss-uploader",
    `dss-uploader--${e.variant ?? "elevated"}`,
    {
      [`dss-uploader--brand-${e.brand}`]: !!e.brand,
      "dss-uploader--disabled": e.disable,
      "dss-uploader--readonly": e.readonly
    }
  ]) };
}
const Zk = ["data-brand"], Jk = ["aria-label"], eC = {
  key: 4,
  class: "dss-uploader__progress-info",
  "aria-hidden": "true"
}, tC = ["aria-label"], aC = { class: "dss-uploader__dropzone-text" }, nC = { class: "dss-uploader__dropzone-hint" }, lC = ["aria-label"], oC = { class: "dss-uploader__file-info" }, iC = { class: "dss-uploader__file-name" }, rC = { class: "dss-uploader__file-meta" }, sC = {
  class: "dss-uploader__sr-status",
  role: "status",
  "aria-live": "polite",
  "aria-atomic": "true"
}, uC = /* @__PURE__ */ he({
  name: "DssUploader",
  inheritAttrs: !1,
  __name: "DssUploader.ts",
  props: {
    url: {},
    method: { default: "POST" },
    headers: {},
    formFields: {},
    withCredentials: { type: Boolean },
    sendRaw: { type: Boolean },
    factory: {},
    multiple: { type: Boolean },
    accept: {},
    maxFiles: {},
    maxFileSize: {},
    maxTotalSize: {},
    autoUpload: { type: Boolean },
    batch: { type: Boolean },
    disable: { type: Boolean },
    readonly: { type: Boolean },
    variant: { default: "elevated" },
    brand: {},
    label: {},
    addAriaLabel: { default: "Adicionar arquivos" },
    uploadAriaLabel: { default: "Fazer upload de todos os arquivos" },
    abortAriaLabel: { default: "Cancelar upload" },
    clearAriaLabel: { default: "Remover todos os arquivos da fila" }
  },
  emits: ["added", "removed", "rejected", "uploading", "uploaded", "failed"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = z(null), { rootClasses: i } = Gk(n), r = z("");
    function u(k) {
      r.value = "", requestAnimationFrame(() => {
        r.value = k;
      });
    }
    function c(k) {
      u(
        k.length === 1 ? `Arquivo "${k[0].name}" adicionado à fila` : `${k.length} arquivos adicionados à fila`
      ), l("added", k);
    }
    function d(k) {
      u(
        k.length === 1 ? `Arquivo "${k[0].name}" removido` : `${k.length} arquivos removidos`
      ), l("removed", k);
    }
    function v(k) {
      u(
        k.length === 1 ? `Arquivo "${k[0].file.name}" rejeitado` : `${k.length} arquivos rejeitados`
      ), l("rejected", k);
    }
    function b(k) {
      u("Upload iniciado"), l("uploading", k);
    }
    function m(k) {
      u("Upload concluído com sucesso"), l("uploaded", k);
    }
    function g(k) {
      u("Falha no upload. Verifique o arquivo e tente novamente."), l("failed", k);
    }
    function p(k) {
      const C = k.type;
      return C.startsWith("image/") ? "image" : C.startsWith("video/") ? "videocam" : C.startsWith("audio/") ? "audiotrack" : C === "application/pdf" ? "picture_as_pdf" : C.includes("spreadsheet") || C.includes("excel") ? "table_chart" : C.includes("document") || C.includes("word") ? "description" : C.includes("zip") || C.includes("compressed") || C.includes("archive") ? "folder_zip" : C.includes("presentation") || C.includes("powerpoint") ? "slideshow" : "insert_drive_file";
    }
    return t({
      upload: () => {
        var k;
        return (k = o.value) == null ? void 0 : k.upload();
      },
      abort: () => {
        var k;
        return (k = o.value) == null ? void 0 : k.abort();
      },
      reset: () => {
        var k;
        return (k = o.value) == null ? void 0 : k.reset();
      },
      pickFiles: () => {
        var k, C;
        return (C = (k = o.value) == null ? void 0 : k.pickFiles) == null ? void 0 : C.call(k);
      }
    }), (k, C) => (R(), ne("div", pe(k.$attrs, {
      class: F(i),
      "data-brand": e.brand ?? void 0
    }), [
      Mt(F(rg), {
        ref_key: "qUploaderRef",
        ref: o,
        class: "dss-uploader__engine",
        url: e.url,
        method: e.method,
        headers: e.headers,
        "form-fields": e.formFields,
        "with-credentials": e.withCredentials,
        "send-raw": e.sendRaw,
        factory: e.factory,
        multiple: e.multiple,
        accept: e.accept,
        "max-files": e.maxFiles,
        "max-file-size": e.maxFileSize,
        "max-total-size": e.maxTotalSize,
        "auto-upload": e.autoUpload,
        batch: e.batch,
        disable: e.disable,
        flat: "",
        bordered: "",
        onAdded: c,
        onRemoved: d,
        onRejected: v,
        onUploading: b,
        onUploaded: m,
        onFailed: g
      }, {
        header: ve((y) => [
          Oe("div", {
            class: "dss-uploader__header",
            role: "toolbar",
            "aria-label": `Ações de upload${y.files.length > 0 ? ` — ${y.files.length} arquivo(s)` : ""}`
          }, [
            y.canAddFiles && !e.readonly ? (R(), qe(ja, {
              key: 0,
              variant: "outline",
              color: "primary",
              size: "sm",
              icon: "add",
              dense: "",
              "no-caps": "",
              disabled: e.disable,
              "aria-label": e.addAriaLabel,
              onClick: (h) => y.addFiles()
            }, {
              default: ve(() => [...C[0] || (C[0] = [
                ht(" Adicionar ", -1)
              ])]),
              _: 1
            }, 8, ["disabled", "aria-label", "onClick"])) : me("", !0),
            !e.autoUpload && y.canUpload && !y.isUploading && !e.readonly ? (R(), qe(ja, {
              key: 1,
              variant: "elevated",
              color: "primary",
              size: "sm",
              icon: "cloud_upload",
              dense: "",
              "no-caps": "",
              disabled: e.disable,
              loading: y.isUploading,
              "aria-label": e.uploadAriaLabel,
              onClick: (h) => y.upload()
            }, {
              default: ve(() => [...C[1] || (C[1] = [
                ht(" Upload ", -1)
              ])]),
              _: 1
            }, 8, ["disabled", "loading", "aria-label", "onClick"])) : me("", !0),
            y.isUploading ? (R(), qe(ja, {
              key: 2,
              variant: "flat",
              color: "negative",
              size: "sm",
              icon: "stop",
              dense: "",
              "no-caps": "",
              "aria-label": e.abortAriaLabel,
              onClick: (h) => y.abort()
            }, {
              default: ve(() => [...C[2] || (C[2] = [
                ht(" Cancelar ", -1)
              ])]),
              _: 1
            }, 8, ["aria-label", "onClick"])) : me("", !0),
            y.files.length > 0 && !y.isUploading && !e.readonly ? (R(), qe(ja, {
              key: 3,
              variant: "flat",
              size: "sm",
              icon: "delete_sweep",
              dense: "",
              "no-caps": "",
              disabled: e.disable,
              "aria-label": e.clearAriaLabel,
              onClick: (h) => y.reset()
            }, {
              default: ve(() => [...C[3] || (C[3] = [
                ht(" Limpar ", -1)
              ])]),
              _: 1
            }, 8, ["disabled", "aria-label", "onClick"])) : me("", !0),
            y.isUploading ? (R(), ne("span", eC, Ee(y.uploadProgressLabel), 1)) : me("", !0)
          ], 8, Jk)
        ]),
        list: ve((y) => [
          y.files.length === 0 ? (R(), ne("div", {
            key: 0,
            class: "dss-uploader__dropzone",
            "aria-label": e.label || "Arraste arquivos aqui ou clique em Adicionar"
          }, [
            Mt(Ca, {
              name: "cloud_upload",
              size: "lg",
              decorative: !0
            }),
            Oe("p", aC, Ee(e.label || "Arraste arquivos aqui ou clique em Adicionar"), 1),
            Oe("p", nC, Ee(e.accept ? `Tipos aceitos: ${e.accept}` : "Todos os tipos de arquivo são aceitos"), 1)
          ], 8, tC)) : (R(), ne("ul", {
            key: 1,
            class: "dss-uploader__list",
            role: "list",
            "aria-label": `Fila de upload — ${y.files.length} arquivo(s)`
          }, [
            (R(!0), ne(hn, null, Aa(y.files, (h) => (R(), ne("li", {
              key: h.__key,
              class: qt(["dss-uploader__file-item", {
                "dss-uploader__file-item--uploading": h.__status === "uploading",
                "dss-uploader__file-item--uploaded": h.__status === "uploaded",
                "dss-uploader__file-item--failed": h.__status === "failed"
              }])
            }, [
              Mt(Ca, {
                name: p(h),
                size: "sm",
                decorative: !0,
                class: "dss-uploader__file-icon"
              }, null, 8, ["name"]),
              Oe("div", oC, [
                Oe("span", iC, Ee(h.name), 1),
                Oe("span", rC, Ee(h.__sizeLabel), 1)
              ]),
              h.__status === "uploading" ? (R(), qe(md, {
                key: 0,
                value: h.__progress,
                size: "xs",
                class: "dss-uploader__file-progress",
                "aria-label": `Progresso de ${h.name}: ${h.__progressLabel}`
              }, null, 8, ["value", "aria-label"])) : h.__status === "uploaded" ? (R(), qe(Ca, {
                key: 1,
                name: "check_circle",
                size: "sm",
                class: "dss-uploader__status-icon dss-uploader__status-icon--success",
                decorative: !1,
                "aria-label": `${h.name}: upload concluído`
              }, null, 8, ["aria-label"])) : h.__status === "failed" ? (R(), qe(Ca, {
                key: 2,
                name: "error",
                size: "sm",
                class: "dss-uploader__status-icon dss-uploader__status-icon--error",
                decorative: !1,
                "aria-label": `${h.name}: falha no upload`
              }, null, 8, ["aria-label"])) : me("", !0),
              h.__status !== "uploading" && !e.disable && !e.readonly ? (R(), qe(ja, {
                key: 3,
                variant: "flat",
                size: "xs",
                icon: "close",
                round: "",
                dense: "",
                "aria-label": `Remover ${h.name} da fila`,
                onClick: (w) => h.__status === "uploaded" ? y.removeUploadedFile(h) : y.removeQueuedFile(h)
              }, null, 8, ["aria-label", "onClick"])) : me("", !0)
            ], 2))), 128))
          ], 8, lC)),
          Oe("div", sC, Ee(r.value), 1)
        ]),
        _: 1
      }, 8, ["url", "method", "headers", "form-fields", "with-credentials", "send-raw", "factory", "multiple", "accept", "max-files", "max-file-size", "max-total-size", "auto-upload", "batch", "disable"])
    ], 16, Zk));
  }
}), dC = uC, cC = xh, fC = tb, vC = _0, mC = D0, gC = U0, hC = Dy, bC = Iy, yC = Hy, pC = jy, Zr = [
  // Controles interativos
  ja,
  fd,
  as,
  vd,
  Yg,
  ah,
  oh,
  sh,
  vh,
  yh,
  Sh,
  cC,
  Bh,
  Ah,
  zh,
  Fh,
  // Inputs e formulários
  fC,
  ib,
  kb,
  Fb,
  // Exibição de dados
  Yb,
  Jb,
  Uo,
  Ca,
  y0,
  vC,
  q0,
  T0,
  mC,
  O0,
  j0,
  gC,
  X0,
  ey,
  // Feedback e progresso
  md,
  ry,
  Yl,
  vy,
  by,
  ky,
  xy,
  qy,
  My,
  // Layout e estrutura
  hC,
  Vy,
  Fy,
  bC,
  yC,
  pC,
  Ky,
  Xy,
  Jy,
  ap,
  op,
  sp,
  fp,
  gp,
  yp,
  // Navegação
  Sp,
  _p,
  Bp,
  Ap,
  zp,
  Rp,
  Ip,
  jp,
  Kp,
  // Stepper
  Gp,
  e1,
  // Timeline
  l1,
  s1,
  // Avançados
  v1,
  y1,
  w1,
  q1,
  L1,
  P1,
  X1,
  // Compostos
  ak,
  ik,
  uk,
  ck,
  yk,
  Pk,
  Ek,
  Hk,
  Qk,
  Wk,
  Xk,
  dC
], SC = {
  install(e, t = {}) {
    Zr.forEach((a) => {
      a && a.name && e.component(a.name, a);
    }), t.brand && e.provide("dss-default-brand", t.brand), t.theme && e.provide("dss-default-theme", t.theme), process.env.NODE_ENV !== "production" && console.log(`✅ Design System Sansys instalado (${Zr.length} componentes)`);
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
const wC = "2.2.0", xC = {
  name: "Design System Sansys",
  version: "2.2.0",
  description: "Sistema de Design profissional com componentes Vue 3 e tokens DSS",
  author: "Hebert Daniel Oliveira Chaves",
  license: "MIT",
  componentCount: 89,
  components: [
    // Controles interativos
    "DssButton",
    "DssCheckbox",
    "DssRadio",
    "DssToggle",
    "DssRange",
    "DssSlider",
    "DssRating",
    "DssKnob",
    "DssSelect",
    "DssOptionGroup",
    "DssBtnGroup",
    "DssBtnToggle",
    "DssBtnDropdown",
    "DssFab",
    "DssFabAction",
    "DssPagination",
    // Inputs e formulários
    "DssInput",
    "DssTextarea",
    "DssField",
    "DssFile",
    // Exibição de dados
    "DssChip",
    "DssBadge",
    "DssAvatar",
    "DssIcon",
    "DssImg",
    "DssCard",
    "DssCardSection",
    "DssCardActions",
    "DssList",
    "DssItem",
    "DssItemLabel",
    "DssItemSection",
    "DssMarkupTable",
    "DssTree",
    // Feedback e progresso
    "DssLinearProgress",
    "DssCircularProgress",
    "DssSpinner",
    "DssSkeleton",
    "DssInnerLoading",
    "DssAjaxBar",
    "DssTooltip",
    "DssMenu",
    "DssPopupProxy",
    // Layout e estrutura
    "DssLayout",
    "DssPage",
    "DssPageContainer",
    "DssHeader",
    "DssFooter",
    "DssDrawer",
    "DssToolbar",
    "DssToolbarTitle",
    "DssSeparator",
    "DssSpace",
    "DssScrollArea",
    "DssSplitter",
    "DssResponsive",
    "DssPageScroller",
    "DssPageSticky",
    // Navegação
    "DssTabs",
    "DssTab",
    "DssTabPanel",
    "DssTabPanels",
    "DssRouteTab",
    "DssBreadcrumbs",
    "DssBreadcrumbsEl",
    "DssBar",
    "DssExpansionItem",
    // Stepper
    "DssStepper",
    "DssStep",
    // Timeline
    "DssTimeline",
    "DssTimelineEntry",
    // Avançados
    "DssVirtualScroll",
    "DssInfiniteScroll",
    "DssPullToRefresh",
    "DssSlideItem",
    "DssParallax",
    "DssVideo",
    "DssBanner",
    // Compostos
    "DssDialog",
    "DssTable",
    "DssCarousel",
    "DssCarouselSlide",
    "DssBottomSheet",
    "DssChatMessage",
    "DssColorPicker",
    "DssDatePicker",
    "DssTimePicker",
    "DssForm",
    "DssPopupEdit",
    "DssUploader"
  ],
  brands: ["hub", "water", "waste"],
  accessibility: "WCAG 2.1 AA",
  frameworks: ["Vue 3"]
};
export {
  ky as DssAjaxBar,
  Uo as DssAvatar,
  Jb as DssBadge,
  X1 as DssBanner,
  jp as DssBar,
  yk as DssBottomSheet,
  Rp as DssBreadcrumbs,
  Ip as DssBreadcrumbsEl,
  Bh as DssBtnDropdown,
  Sh as DssBtnGroup,
  xh as DssBtnToggle,
  CC as DssButton,
  _0 as DssCard,
  T0 as DssCardActions,
  q0 as DssCardSection,
  uk as DssCarousel,
  ck as DssCarouselSlide,
  Pk as DssChatMessage,
  Fd as DssCheckbox,
  Yb as DssChip,
  ry as DssCircularProgress,
  Ek as DssColorPicker,
  Hk as DssDatePicker,
  ak as DssDialog,
  jy as DssDrawer,
  Kp as DssExpansionItem,
  Ah as DssFab,
  zh as DssFabAction,
  kb as DssField,
  Fb as DssFile,
  Hy as DssFooter,
  Wk as DssForm,
  Iy as DssHeader,
  Ca as DssIcon,
  y0 as DssImg,
  y1 as DssInfiniteScroll,
  by as DssInnerLoading,
  tb as DssInput,
  O0 as DssItem,
  j0 as DssItemLabel,
  U0 as DssItemSection,
  sh as DssKnob,
  Dy as DssLayout,
  md as DssLinearProgress,
  D0 as DssList,
  X0 as DssMarkupTable,
  qy as DssMenu,
  yh as DssOptionGroup,
  Vy as DssPage,
  Fy as DssPageContainer,
  gp as DssPageScroller,
  yp as DssPageSticky,
  Fh as DssPagination,
  L1 as DssParallax,
  Xk as DssPopupEdit,
  My as DssPopupProxy,
  w1 as DssPullToRefresh,
  as as DssRadio,
  Yg as DssRange,
  oh as DssRating,
  fp as DssResponsive,
  zp as DssRouteTab,
  op as DssScrollArea,
  vh as DssSelect,
  Jy as DssSeparator,
  vy as DssSkeleton,
  q1 as DssSlideItem,
  ah as DssSlider,
  ap as DssSpace,
  Yl as DssSpinner,
  sp as DssSplitter,
  e1 as DssStep,
  Gp as DssStepper,
  _p as DssTab,
  Bp as DssTabPanel,
  Ap as DssTabPanels,
  ik as DssTable,
  Sp as DssTabs,
  ib as DssTextarea,
  Qk as DssTimePicker,
  l1 as DssTimeline,
  s1 as DssTimelineEntry,
  Gd as DssToggle,
  Ky as DssToolbar,
  Xy as DssToolbarTitle,
  xy as DssTooltip,
  ey as DssTree,
  dC as DssUploader,
  P1 as DssVideo,
  v1 as DssVirtualScroll,
  SC as default,
  xC as metadata,
  wC as version
};
//# sourceMappingURL=dss.es.js.map
