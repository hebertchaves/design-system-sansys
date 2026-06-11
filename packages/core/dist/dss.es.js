import { computed as s, defineComponent as me, useSlots as Ot, createBlock as Be, openBlock as F, resolveDynamicComponent as Vl, unref as R, mergeProps as Ce, withCtx as pe, createElementBlock as oe, createCommentVNode as ge, createElementVNode as He, normalizeClass as Mt, normalizeStyle as Rn, toDisplayString as Ee, renderSlot as ie, createTextVNode as yt, ref as V, watchEffect as bd, shallowReactive as yd, reactive as vn, markRaw as es, getCurrentInstance as be, provide as La, watch as se, h as f, onBeforeUnmount as tt, isRef as pd, Transition as Vt, withDirectives as ea, onBeforeUpdate as Wn, nextTick as nt, onUpdated as Cd, onMounted as ht, onDeactivated as Sa, onActivated as en, inject as Kt, onBeforeMount as Uo, onUnmounted as zl, Teleport as kd, KeepAlive as ts, toRaw as ya, vShow as Ko, createApp as Sd, createVNode as Tt, createSlots as Rt, renderList as Ca, normalizeProps as Ya, guardReactiveProps as Xa, Fragment as gn, resolveComponent as lt, withModifiers as Nn, withKeys as Sn, useAttrs as as } from "vue";
function wd(e, t) {
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
function xd(e) {
  const t = s(() => e.to ? "router-link" : "button"), a = s(() => e.to ? null : e.type || "button");
  return {
    componentType: t,
    nativeType: a
  };
}
function _d(e) {
  return {
    percentageStyle: s(() => e.percentage === null || e.percentage === void 0 ? null : {
      transform: `translateX(${e.percentage - 100}%)`
    })
  };
}
const $d = {
  key: 0,
  class: "dss-button__loading",
  role: "status",
  "aria-label": "Loading",
  "aria-live": "polite"
}, qd = ["aria-valuenow", "aria-label"], Bd = {
  key: 2,
  class: "dss-button__icon dss-button__icon--left",
  "aria-hidden": "true"
}, Td = {
  key: 3,
  class: "dss-button__label"
}, Md = {
  key: 4,
  class: "dss-button__icon dss-button__icon--right",
  "aria-hidden": "true"
}, Ad = {
  key: 5,
  class: "dss-button__ripple",
  "aria-hidden": "true"
}, Dd = /* @__PURE__ */ me({
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
    const a = e, n = t, l = Ot(), o = s(() => !!l.default), { componentType: i, nativeType: r } = xd(a), { buttonClasses: u } = wd(a, { hasDefaultSlot: o }), { percentageStyle: c } = _d(a), d = s(() => a.icon || ""), v = s(() => a.iconRight || ""), m = s(() => {
      const p = {};
      return a.padding && (p.padding = a.padding), p;
    }), g = s(() => a.disabled || a.loading ? -1 : a.tabindex !== null && a.tabindex !== void 0 ? typeof a.tabindex == "number" ? a.tabindex : parseInt(a.tabindex) : 0);
    function h(p) {
      !a.disabled && !a.loading && n("click", p);
    }
    return (p, C) => (F(), Be(Vl(R(i)), Ce({
      type: R(r),
      to: e.to,
      replace: e.replace,
      disabled: e.disabled || e.loading,
      class: R(u),
      style: m.value,
      tabindex: g.value,
      "aria-label": e.ariaLabel,
      "aria-busy": e.loading ? "true" : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, p.$attrs, { onClick: h }), {
      default: pe(() => [
        e.loading && e.percentage === null ? (F(), oe("span", $d, [...C[0] || (C[0] = [
          He("span", {
            class: "dss-button__spinner",
            "aria-hidden": "true"
          }, null, -1)
        ])])) : ge("", !0),
        e.loading && e.percentage !== null ? (F(), oe("span", {
          key: 1,
          class: Mt(["dss-button__progress", { "dss-button__progress--dark": e.darkPercentage }]),
          role: "progressbar",
          "aria-valuenow": e.percentage,
          "aria-valuemin": "0",
          "aria-valuemax": "100",
          "aria-label": `Loading ${e.percentage}%`
        }, [
          He("span", {
            class: "dss-button__progress-indicator",
            style: Rn(R(c)),
            "aria-hidden": "true"
          }, null, 4)
        ], 10, qd)) : ge("", !0),
        d.value && !e.loading ? (F(), oe("span", Bd, Ee(d.value), 1)) : ge("", !0),
        e.label || p.$slots.default ? (F(), oe("span", Td, [
          ie(p.$slots, "default", {}, () => [
            yt(Ee(e.label), 1)
          ])
        ])) : ge("", !0),
        v.value && !e.loading ? (F(), oe("span", Md, Ee(v.value), 1)) : ge("", !0),
        e.ripple ? (F(), oe("span", Ad)) : ge("", !0)
      ]),
      _: 3
    }, 16, ["type", "to", "replace", "disabled", "class", "style", "tabindex", "aria-label", "aria-busy", "aria-disabled"]));
  }
});
function Ld(e, t) {
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
const Vd = ["data-brand"], zd = {
  key: 0,
  class: "dss-checkbox__label dss-checkbox__label--left"
}, Pd = ["checked", "disabled", "tabindex", "aria-label", "value"], Rd = {
  key: 0,
  class: "dss-checkbox__check material-icons",
  "aria-hidden": "true"
}, Fd = {
  key: 1,
  class: "dss-checkbox__dash material-icons",
  "aria-hidden": "true"
}, Ed = {
  key: 1,
  class: "dss-checkbox__label"
}, Id = /* @__PURE__ */ me({
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
    const a = e, n = t, l = Ot(), o = V(null), i = V(!1), r = s(() => Array.isArray(a.modelValue) ? a.modelValue.includes(a.val) : a.modelValue === a.trueValue), u = s(() => Array.isArray(a.modelValue) ? !1 : a.modelValue === a.indeterminateValue), c = s(() => !!(a.label || l.default)), d = s(() => a.disable ? -1 : a.tabindex !== null && a.tabindex !== void 0 ? typeof a.tabindex == "number" ? a.tabindex : parseInt(a.tabindex) : 0), { checkboxClasses: v, controlColorClasses: m } = Ld(
      a,
      { isChecked: r, isIndeterminate: u }
    ), g = s(() => [
      m.value,
      {
        "dss-checkbox__control--checked": r.value,
        "dss-checkbox__control--indeterminate": u.value,
        "dss-checkbox__control--focused": i.value
      }
    ]);
    bd(() => {
      o.value && (o.value.indeterminate = u.value);
    });
    function h() {
      if (!a.disable) {
        if (Array.isArray(a.modelValue)) {
          const p = [...a.modelValue], C = p.indexOf(a.val);
          C === -1 ? p.push(a.val) : p.splice(C, 1), n("update:modelValue", p);
          return;
        }
        if (a.toggleIndeterminate) {
          u.value ? n("update:modelValue", a.falseValue) : r.value ? n("update:modelValue", a.indeterminateValue) : n("update:modelValue", a.trueValue);
          return;
        }
        n("update:modelValue", r.value ? a.falseValue : a.trueValue);
      }
    }
    return (p, C) => (F(), oe("label", Ce({
      class: R(v),
      "data-brand": e.brand || void 0
    }, p.$attrs), [
      c.value && e.leftLabel ? (F(), oe("span", zd, [
        ie(p.$slots, "default", {}, () => [
          yt(Ee(e.label), 1)
        ])
      ])) : ge("", !0),
      He("input", {
        ref_key: "inputRef",
        ref: o,
        type: "checkbox",
        class: "dss-checkbox__native",
        checked: r.value,
        disabled: e.disable,
        tabindex: d.value,
        "aria-label": e.ariaLabel,
        value: e.val,
        onChange: h,
        onFocus: C[0] || (C[0] = (k) => i.value = !0),
        onBlur: C[1] || (C[1] = (k) => i.value = !1)
      }, null, 40, Pd),
      He("span", {
        class: Mt(["dss-checkbox__control", g.value]),
        "aria-hidden": "true"
      }, [
        r.value ? (F(), oe("span", Rd, "check")) : ge("", !0),
        u.value ? (F(), oe("span", Fd, "remove")) : ge("", !0)
      ], 2),
      c.value && !e.leftLabel ? (F(), oe("span", Ed, [
        ie(p.$slots, "default", {}, () => [
          yt(Ee(e.label), 1)
        ])
      ])) : ge("", !0)
    ], 16, Vd));
  }
});
function Od(e, t) {
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
const Hd = ["data-brand"], Nd = {
  key: 0,
  class: "dss-radio__label dss-radio__label--left"
}, jd = ["name", "value", "checked", "disabled", "tabindex", "aria-label", "aria-checked", "aria-disabled", "aria-invalid", "aria-describedby"], Qd = {
  key: 0,
  class: "dss-radio__dot"
}, Ud = {
  key: 1,
  class: "dss-radio__label"
}, Kd = ["id"], ns = /* @__PURE__ */ me({
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
    const n = e, l = a, o = V(null), i = V(!1), r = Ot(), u = s(() => n.modelValue !== void 0 && n.modelValue === n.val), c = s(() => !!(n.label || r.default)), d = s(() => n.disable ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? Number(n.tabindex) : 0), v = s(() => `dss-radio-${Math.random().toString(36).substring(2, 8)}`), m = s(() => n.error && n.errorMessage ? `${v.value}-error` : void 0), { radioClasses: g, controlClasses: h, controlColorClasses: p } = Od(
      n,
      { isChecked: u, isFocused: i }
    );
    function C() {
      n.disable || l("update:modelValue", n.val);
    }
    function k() {
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
        var b;
        return (b = o.value) == null ? void 0 : b.focus();
      },
      /** Remove o foco do input programaticamente */
      blur: () => {
        var b;
        return (b = o.value) == null ? void 0 : b.blur();
      }
    }), (b, w) => (F(), oe("label", Ce({
      class: R(g),
      "data-brand": e.brand || void 0
    }, b.$attrs), [
      c.value && e.leftLabel ? (F(), oe("span", Nd, [
        ie(b.$slots, "default", {}, () => [
          yt(Ee(e.label), 1)
        ])
      ])) : ge("", !0),
      He("input", {
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
        "aria-describedby": m.value,
        onChange: C,
        onFocus: k,
        onBlur: y
      }, null, 40, jd),
      He("span", {
        class: Mt([R(h), R(p)]),
        "aria-hidden": "true"
      }, [
        u.value ? (F(), oe("span", Qd)) : ge("", !0)
      ], 2),
      c.value && !e.leftLabel ? (F(), oe("span", Ud, [
        ie(b.$slots, "default", {}, () => [
          yt(Ee(e.label), 1)
        ])
      ])) : ge("", !0),
      e.error && e.errorMessage ? (F(), oe("span", {
        key: 2,
        id: m.value,
        class: "dss-radio__error",
        role: "alert",
        "aria-live": "assertive"
      }, Ee(e.errorMessage), 9, Kd)) : ge("", !0)
    ], 16, Hd));
  }
});
function Wd(e, t) {
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
const Yd = ["data-brand"], Xd = {
  key: 0,
  class: "dss-toggle__label dss-toggle__label--left"
}, Gd = ["checked", "disabled", "tabindex", "aria-label", "aria-checked", "aria-disabled", "aria-invalid", "aria-describedby", "value"], Zd = {
  key: 1,
  class: "dss-toggle__label"
}, Jd = /* @__PURE__ */ me({
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
    const n = e, l = a, o = Ot(), i = V(null), r = V(!1), c = `dss-toggle-error-${Math.random().toString(36).substring(2, 8)}`, d = s(() => Array.isArray(n.modelValue) ? n.modelValue.includes(n.val) : n.modelValue === n.trueValue), v = s(() => !!(n.label || o.default)), m = s(() => n.disable ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(n.tabindex) : 0), g = s(() => {
      if (n.error && n.errorMessage)
        return c;
    }), { toggleClasses: h, trackColorClasses: p } = Wd(
      n,
      { isChecked: d }
    ), C = s(() => [
      p.value,
      {
        "dss-toggle__track--checked": d.value,
        "dss-toggle__track--focused": r.value
      }
    ]);
    function k() {
      if (!n.disable) {
        if (Array.isArray(n.modelValue)) {
          const y = [...n.modelValue], b = y.indexOf(n.val);
          b === -1 ? y.push(n.val) : y.splice(b, 1), l("update:modelValue", y);
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
    }), (y, b) => (F(), oe("label", Ce({
      class: R(h),
      "data-brand": e.brand || void 0
    }, y.$attrs), [
      v.value && e.leftLabel ? (F(), oe("span", Xd, [
        ie(y.$slots, "default", {}, () => [
          yt(Ee(e.label), 1)
        ])
      ])) : ge("", !0),
      He("input", {
        ref_key: "inputRef",
        ref: i,
        type: "checkbox",
        role: "switch",
        class: "dss-toggle__native",
        checked: d.value,
        disabled: e.disable,
        tabindex: m.value,
        "aria-label": e.ariaLabel,
        "aria-checked": d.value,
        "aria-disabled": e.disable || void 0,
        "aria-invalid": e.error || void 0,
        "aria-describedby": g.value,
        value: e.val,
        onChange: k,
        onFocus: b[0] || (b[0] = (w) => r.value = !0),
        onBlur: b[1] || (b[1] = (w) => r.value = !1)
      }, null, 40, Gd),
      He("span", {
        class: Mt(["dss-toggle__track", C.value]),
        "aria-hidden": "true"
      }, [...b[2] || (b[2] = [
        He("span", {
          class: "dss-toggle__thumb",
          "aria-hidden": "true"
        }, null, -1)
      ])], 2),
      v.value && !e.leftLabel ? (F(), oe("span", Zd, [
        ie(y.$slots, "default", {}, () => [
          yt(Ee(e.label), 1)
        ])
      ])) : ge("", !0),
      e.error && e.errorMessage ? (F(), oe("span", {
        key: 2,
        id: c,
        class: "dss-toggle__error",
        role: "alert",
        "aria-live": "assertive"
      }, Ee(e.errorMessage), 1)) : ge("", !0)
    ], 16, Yd));
  }
});
/*!
* Quasar Framework v2.19.3
* (c) 2015-present Razvan Stoenescu
* Released under the MIT License.
*/
let Zl = null;
function Wo() {
  return Zl !== null ? Zl : Zl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
typeof __QUASAR_SSR__ != "boolean" && (Wo().__QUASAR_SSR__ = !1);
typeof __QUASAR_SSR_CLIENT__ != "boolean" && (Wo().__QUASAR_SSR_CLIENT__ = !1);
typeof __QUASAR_SSR_PWA__ != "boolean" && (Wo().__QUASAR_SSR_PWA__ = !1);
function zt(e, t, a, n) {
  return Object.defineProperty(e, t, {
    get: a,
    set: n,
    enumerable: !0
  }), e;
}
function ls(e, t) {
  for (const a in t) zt(e, a, t[a]);
  return e;
}
const ta = V(__QUASAR_SSR_CLIENT__ && (__QUASAR_SSR_PWA__ ? document.body.getAttribute("data-server-rendered") !== null : !0));
let qo;
function ec(e, t) {
  const a = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(vivaldi)[\/]([\w.]+)/.exec(e) || /(chrome|crios)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) || /(firefox|fxios)[\/]([\w.]+)/.exec(e) || /(webkit)[\/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) || [];
  return {
    browser: a[5] || a[3] || a[1] || "",
    version: a[4] || a[2] || "0",
    platform: t[0] || ""
  };
}
function tc(e) {
  return /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(silk)/.exec(e) || /(android)/.exec(e) || /(win)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || /(playbook)/.exec(e) || /(bb)/.exec(e) || /(blackberry)/.exec(e) || [];
}
const os = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function ac(e) {
  const t = e.toLowerCase(), a = ec(t, tc(t)), n = {
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
    if (window.Capacitor !== void 0 ? (n.capacitor = !0, n.nativeMobile = !0, n.nativeMobileWrapper = "capacitor") : (window._cordovaNative !== void 0 || window.cordova !== void 0) && (n.cordova = !0, n.nativeMobile = !0, n.nativeMobileWrapper = "cordova"), ta.value === !0 && (qo = { is: { ...n } }), os === !0 && n.mac === !0 && (n.desktop === !0 && n.safari === !0 || n.nativeMobile === !0 && n.android !== !0 && n.ios !== !0 && n.ipad !== !0)) {
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
const Ai = navigator.userAgent || navigator.vendor || window.opera, nc = {
  has: {
    touch: !1,
    webStorage: !1
  },
  within: { iframe: !1 }
}, Je = {
  userAgent: Ai,
  is: ac(Ai),
  has: { touch: os },
  within: { iframe: window.self !== window.top }
}, Bo = { install(e) {
  const { $q: t } = e;
  ta.value === !0 ? (e.onSSRHydrated.push(() => {
    Object.assign(t.platform, Je), ta.value = !1;
  }), t.platform = vn(this)) : t.platform = this;
} };
{
  let e;
  zt(Je.has, "webStorage", () => {
    if (e !== void 0) return e;
    try {
      if (window.localStorage)
        return e = !0, !0;
    } catch {
    }
    return e = !1, !1;
  }), Object.assign(Bo, Je), ta.value === !0 && (Object.assign(Bo, qo, nc), qo = null);
}
function re(e) {
  return es(me(e));
}
function ua(e) {
  return es(e);
}
const Va = (e, t) => {
  const a = vn(e);
  for (const n in e) zt(t, n, () => a[n], (l) => {
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
function Ut(e) {
  return e.touches && e.touches[0] ? e = e.touches[0] : e.changedTouches && e.changedTouches[0] ? e = e.changedTouches[0] : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]), {
    top: e.clientY,
    left: e.clientX
  };
}
function lc(e) {
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
function Pt(e) {
  e.cancelable !== !1 && e.preventDefault();
}
function Ye(e) {
  e.cancelable !== !1 && e.preventDefault(), e.stopPropagation();
}
function hn(e, t) {
  if (e === void 0 || t === !0 && e.__dragPrevented === !0) return;
  const a = t === !0 ? (n) => {
    n.__dragPrevented = !0, n.addEventListener("dragstart", Pt, gt.notPassiveCapture);
  } : (n) => {
    delete n.__dragPrevented, n.removeEventListener("dragstart", Pt, gt.notPassiveCapture);
  };
  e.querySelectorAll("a, img").forEach(a);
}
function _t(e, t, a) {
  const n = `__q_${t}_evt`;
  e[n] = e[n] !== void 0 ? e[n].concat(a) : a, a.forEach((l) => {
    l[0].addEventListener(l[1], e[l[2]], gt[l[3]]);
  });
}
function jt(e, t) {
  const a = `__q_${t}_evt`;
  e[a] !== void 0 && (e[a].forEach((n) => {
    n[0].removeEventListener(n[1], e[n[2]], gt[n[3]]);
  }), e[a] = void 0);
}
function _n(e, t = 250, a) {
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
const Jl = [
  "sm",
  "md",
  "lg",
  "xl"
], { passive: Di } = gt;
Va({
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
    this.__update = (m) => {
      const [g, h] = o();
      if (h !== this.height && (this.height = h), g !== this.width) this.width = g;
      else if (m !== !0) return;
      let p = this.sizes;
      this.gt.xs = g >= p.sm, this.gt.sm = g >= p.md, this.gt.md = g >= p.lg, this.gt.lg = g >= p.xl, this.lt.sm = g < p.sm, this.lt.md = g < p.md, this.lt.lg = g < p.lg, this.lt.xl = g < p.xl, this.xs = this.lt.sm, this.sm = this.gt.xs === !0 && this.lt.md === !0, this.md = this.gt.sm === !0 && this.lt.lg === !0, this.lg = this.gt.md === !0 && this.lt.xl === !0, this.xl = this.gt.lg, p = this.xs === !0 && "xs" || this.sm === !0 && "sm" || this.md === !0 && "md" || this.lg === !0 && "lg" || "xl", p !== this.name && (i === !0 && (document.body.classList.remove(`screen--${this.name}`), document.body.classList.add(`screen--${p}`)), this.name = p);
    };
    let r, u = {}, c = 16;
    this.setSizes = (m) => {
      Jl.forEach((g) => {
        m[g] !== void 0 && (u[g] = m[g]);
      });
    }, this.setDebounce = (m) => {
      c = m;
    };
    const d = () => {
      const m = getComputedStyle(document.body);
      m.getPropertyValue("--q-size-sm") && Jl.forEach((g) => {
        this.sizes[g] = parseInt(m.getPropertyValue(`--q-size-${g}`), 10);
      }), this.setSizes = (g) => {
        Jl.forEach((h) => {
          g[h] && (this.sizes[h] = g[h]);
        }), this.__update(!0);
      }, this.setDebounce = (g) => {
        r !== void 0 && n.removeEventListener("resize", r, Di), r = g > 0 ? _n(this.__update, g) : this.__update, n.addEventListener("resize", r, Di);
      }, this.setDebounce(c), Object.keys(u).length !== 0 ? (this.setSizes(u), u = void 0) : this.__update(), i === !0 && this.name === "xs" && document.body.classList.add("screen--xs");
    };
    ta.value === !0 ? t.push(d) : d();
  }
});
const Qt = Va({
  isActive: !1,
  mode: !1
}, {
  __media: void 0,
  set(e) {
    Qt.mode = e, e === "auto" ? (Qt.__media === void 0 && (Qt.__media = window.matchMedia("(prefers-color-scheme: dark)"), Qt.__updateMedia = () => {
      Qt.set("auto");
    }, Qt.__media.addListener(Qt.__updateMedia)), e = Qt.__media.matches) : Qt.__media !== void 0 && (Qt.__media.removeListener(Qt.__updateMedia), Qt.__media = void 0), Qt.isActive = e === !0, document.body.classList.remove(`body--${e === !0 ? "light" : "dark"}`), document.body.classList.add(`body--${e === !0 ? "dark" : "light"}`);
  },
  toggle() {
    Qt.set(Qt.isActive === !1);
  },
  install({ $q: e, ssrContext: t }) {
    const a = __QUASAR_SSR_CLIENT__ ? document.body.classList.contains("body--dark") : e.config.dark;
    e.dark = this, this.__installed !== !0 && this.set(a !== void 0 ? a : !1);
  }
});
function tn(e) {
  return e !== Object(e) || e.isComposing === !0 || e.qKeyEvent === !0;
}
function aa(e, t) {
  return tn(e) === !0 ? !1 : [].concat(t).includes(e.keyCode);
}
var To = {
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
function Li() {
  const e = Array.isArray(navigator.languages) === !0 && navigator.languages.length !== 0 ? navigator.languages[0] : navigator.language;
  if (typeof e == "string") return e.split(/[-_]/).map((t, a) => a === 0 ? t.toLowerCase() : a > 1 || t.length < 4 ? t.toUpperCase() : t[0].toUpperCase() + t.slice(1).toLowerCase()).join("-");
}
const Ba = Va({ __qLang: {} }, {
  getLocale: Li,
  set(e = To, t) {
    const a = {
      ...e,
      rtl: e.rtl === !0,
      getLocale: Li
    };
    if (a.set = Ba.set, Ba.__langConfig === void 0 || Ba.__langConfig.noHtmlAttrs !== !0) {
      const n = document.documentElement;
      n.setAttribute("dir", a.rtl === !0 ? "rtl" : "ltr"), n.setAttribute("lang", a.isoName);
    }
    Object.assign(Ba.__qLang, a);
  },
  install({ $q: e, lang: t, ssrContext: a }) {
    e.lang = Ba.__qLang, Ba.__langConfig = e.config.lang, this.__installed === !0 ? t !== void 0 && this.set(t) : (this.props = new Proxy(this.__qLang, {
      get() {
        return Reflect.get(...arguments);
      },
      ownKeys(n) {
        return Reflect.ownKeys(n).filter((l) => l !== "set" && l !== "getLocale");
      }
    }), this.set(t || To));
  }
});
var oc = {
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
const Vi = Va({
  iconMapFn: null,
  __qIconSet: {}
}, {
  set(e, t) {
    const a = { ...e };
    a.set = Vi.set, Object.assign(Vi.__qIconSet, a);
  },
  install({ $q: e, iconSet: t, ssrContext: a }) {
    e.config.iconMapFn !== void 0 && (this.iconMapFn = e.config.iconMapFn), e.iconSet = this.__qIconSet, zt(e, "iconMapFn", () => this.iconMapFn, (n) => {
      this.iconMapFn = n;
    }), this.__installed === !0 ? t !== void 0 && this.set(t) : (this.props = new Proxy(this.__qIconSet, {
      get() {
        return Reflect.get(...arguments);
      },
      ownKeys(n) {
        return Reflect.ownKeys(n).filter((l) => l !== "set");
      }
    }), this.set(t || oc));
  }
}), is = "_q_t_", rs = "_q_s_", an = "_q_l_", ic = "_q_pc_", ss = "_q_f_", us = "_q_fo_", ds = "_q_tabs_", cs = "_q_u_";
function vt() {
}
const zi = {};
function ra(e, t) {
  if (e === t) return !0;
  if (e !== null && t !== null && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    let a, n;
    if (e.constructor === Array) {
      if (a = e.length, a !== t.length) return !1;
      for (n = a; n-- !== 0; ) if (ra(e[n], t[n]) !== !0) return !1;
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
        if (ra(n.value[1], t.get(n.value[0])) !== !0) return !1;
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
      if (ra(e[o], t[o]) !== !0) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Nt(e) {
  return e !== null && typeof e == "object" && Array.isArray(e) !== !0;
}
function Mo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function rc(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
function jn(e) {
  return typeof e == "number" && isFinite(e);
}
function fs(e, t) {
  const a = Sd(e);
  a.config.globalProperties = t.config.globalProperties;
  const { reload: n, ...l } = t._context;
  return Object.assign(a._context, l), a;
}
const Pi = [
  "B",
  "KB",
  "MB",
  "GB",
  "TB",
  "PB"
];
function Ao(e, t = 1) {
  let a = 0;
  for (; parseInt(e, 10) >= 1024 && a < Pi.length - 1; )
    e /= 1024, ++a;
  return `${e.toFixed(t)}${Pi[a]}`;
}
function mt(e, t, a) {
  return a <= t ? t : Math.min(a, Math.max(t, e));
}
function yl(e, t, a) {
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
const Yo = XMLHttpRequest, vs = Yo.prototype.open, sc = [
  "top",
  "right",
  "bottom",
  "left"
];
let pl = [], Fn = 0;
function uc({ p: e, pos: t, active: a, horiz: n, reverse: l, dir: o }) {
  let i = 1, r = 1;
  return n === !0 ? (l === !0 && (i = -1), t === "bottom" && (r = -1), { transform: `translate3d(${i * (e - 100)}%,${a ? 0 : r * -200}%,0)` }) : (l === !0 && (r = -1), t === "right" && (i = -1), { transform: `translate3d(${a ? 0 : o * i * -200}%,${r * (e - 100)}%,0)` });
}
function dc(e, t) {
  return typeof t != "number" && (e < 25 ? t = Math.random() * 3 + 3 : e < 65 ? t = Math.random() * 3 : e < 85 ? t = Math.random() * 2 : e < 99 ? t = 0.6 : t = 0), mt(e + t, 0, 100);
}
function cc(e) {
  Fn++, pl.push(e), !(Fn > 1) && (Yo.prototype.open = function(a, n) {
    const l = [], o = () => {
      pl.forEach((r) => {
        (r.hijackFilter.value === null || r.hijackFilter.value(n) === !0) && (r.start(), l.push(r.stop));
      });
    }, i = () => {
      l.forEach((r) => {
        r();
      });
    };
    this.addEventListener("loadstart", o, { once: !0 }), this.addEventListener("loadend", i, { once: !0 }), vs.apply(this, arguments);
  });
}
function fc(e) {
  pl = pl.filter((t) => t.start !== e), Fn = Math.max(0, Fn - 1), Fn === 0 && (Yo.prototype.open = vs);
}
var ms = re({
  name: "QAjaxBar",
  props: {
    position: {
      type: String,
      default: "top",
      validator: (e) => sc.includes(e)
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
    const { proxy: a } = be(), n = V(0), l = V(!1), o = V(!0);
    let i = 0, r = null, u;
    const c = s(() => `q-loading-bar q-loading-bar--${e.position}` + (e.color !== void 0 ? ` bg-${e.color}` : "") + (o.value === !0 ? "" : " no-transition")), d = s(() => e.position === "top" || e.position === "bottom"), v = s(() => d.value === !0 ? "height" : "width"), m = s(() => {
      const b = l.value, w = uc({
        p: n.value,
        pos: e.position,
        active: b,
        horiz: d.value,
        reverse: a.$q.lang.rtl === !0 && ["top", "bottom"].includes(e.position) ? e.reverse === !1 : e.reverse,
        dir: a.$q.lang.rtl === !0 ? -1 : 1
      });
      return w[v.value] = e.size, w.opacity = b ? 1 : 0, w;
    }), g = s(() => l.value === !0 ? {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": n.value
    } : { "aria-hidden": "true" });
    function h(b = 300) {
      const w = u;
      return u = Math.max(0, b) || 0, i++, i > 1 ? (w === 0 && b > 0 ? k() : r !== null && w > 0 && b <= 0 && (clearTimeout(r), r = null), i) : (r !== null && clearTimeout(r), t("start"), n.value = 0, r = setTimeout(() => {
        r = null, o.value = !0, b > 0 && k();
      }, l._value === !0 ? 500 : 1), l._value !== !0 && (l.value = !0, o.value = !1), i);
    }
    function p(b) {
      return i > 0 && (n.value = dc(n.value, b)), i;
    }
    function C() {
      if (i = Math.max(0, i - 1), i > 0) return i;
      r !== null && (clearTimeout(r), r = null), t("stop");
      const b = () => {
        o.value = !0, n.value = 100, r = setTimeout(() => {
          r = null, l.value = !1;
        }, 1e3);
      };
      return n.value === 0 ? r = setTimeout(b, 1) : b(), i;
    }
    function k() {
      n.value < 100 && (r = setTimeout(() => {
        r = null, p(), k();
      }, u));
    }
    let y;
    return ht(() => {
      e.skipHijack !== !0 && (y = !0, cc({
        start: h,
        stop: C,
        hijackFilter: s(() => e.hijackFilter || null)
      }));
    }), tt(() => {
      r !== null && clearTimeout(r), y === !0 && fc(h);
    }), Object.assign(a, {
      start: h,
      stop: C,
      increment: p
    }), () => f("div", {
      class: c.value,
      style: m.value,
      ...g.value
    });
  }
});
const Do = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
}, wa = { size: String };
function xa(e, t = Do) {
  return s(() => e.size !== void 0 ? { fontSize: e.size in t ? `${t[e.size]}px` : e.size } : null);
}
function De(e, t) {
  return e !== void 0 && e() || t;
}
function Yn(e, t) {
  if (e !== void 0) {
    const a = e();
    if (a != null) return a.slice();
  }
  return t;
}
function $t(e, t) {
  return e !== void 0 ? t.concat(e()) : t;
}
function Xo(e, t) {
  return e === void 0 ? t : t !== void 0 ? t.concat(e()) : e();
}
function na(e, t, a, n, l, o) {
  t.key = n + l;
  const i = f(e, t, a);
  return l === !0 ? ea(i, o()) : i;
}
const Ri = "0 0 24 24", eo = (e) => e, to = (e) => `ionicons ${e}`, gs = {
  "mdi-": (e) => `mdi ${e}`,
  "icon-": eo,
  "bt-": (e) => `bt ${e}`,
  "eva-": (e) => `eva ${e}`,
  "ion-md": to,
  "ion-ios": to,
  "ion-logo": to,
  "iconfont ": eo,
  "ti-": (e) => `themify-icon ${e}`,
  "bi-": (e) => `bootstrap-icons ${e}`,
  "i-": eo
}, hs = {
  o_: "-outlined",
  r_: "-round",
  s_: "-sharp"
}, bs = {
  sym_o_: "-outlined",
  sym_r_: "-rounded",
  sym_s_: "-sharp"
}, vc = new RegExp("^(" + Object.keys(gs).join("|") + ")"), mc = new RegExp("^(" + Object.keys(hs).join("|") + ")"), Fi = new RegExp("^(" + Object.keys(bs).join("|") + ")"), gc = /^[Mm]\s?[-+]?\.?\d/, hc = /^img:/, bc = /^svguse:/, yc = /^ion-/, pc = /^(fa-(classic|sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var st = re({
  name: "QIcon",
  props: {
    ...wa,
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
    const { proxy: { $q: a } } = be(), n = xa(e), l = s(() => "q-icon" + (e.left === !0 ? " on-left" : "") + (e.right === !0 ? " on-right" : "") + (e.color !== void 0 ? ` text-${e.color}` : "")), o = s(() => {
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
      if (gc.test(r) === !0) {
        const [d, v = Ri] = r.split("|");
        return {
          svg: !0,
          viewBox: v,
          nodes: d.split("&&").map((m) => {
            const [g, h, p] = m.split("@@");
            return f("path", {
              style: h,
              d: g,
              transform: p
            });
          })
        };
      }
      if (hc.test(r) === !0) return {
        img: !0,
        src: r.substring(4)
      };
      if (bc.test(r) === !0) {
        const [d, v = Ri] = r.split("|");
        return {
          svguse: !0,
          src: d.substring(7),
          viewBox: v
        };
      }
      let u = " ";
      const c = r.match(vc);
      if (c !== null) i = gs[c[1]](r);
      else if (pc.test(r) === !0) i = r;
      else if (yc.test(r) === !0) i = `ionicons ion-${a.platform.is.ios === !0 ? "ios" : "md"}${r.substring(3)}`;
      else if (Fi.test(r) === !0) {
        i = "notranslate material-symbols";
        const d = r.match(Fi);
        d !== null && (r = r.substring(6), i += bs[d[1]]), u = r;
      } else {
        i = "notranslate material-icons";
        const d = r.match(mc);
        d !== null && (r = r.substring(2), i += hs[d[1]]), u = r;
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
    ...wa,
    fontSize: String,
    color: String,
    textColor: String,
    icon: String,
    square: Boolean,
    rounded: Boolean
  },
  setup(e, { slots: t }) {
    const a = xa(e), n = s(() => "q-avatar" + (e.color ? ` bg-${e.color}` : "") + (e.textColor ? ` text-${e.textColor} q-chip--colored` : "") + (e.square === !0 ? " q-avatar--square" : e.rounded === !0 ? " rounded-borders" : "")), l = s(() => e.fontSize ? { fontSize: e.fontSize } : null);
    return () => {
      const o = e.icon !== void 0 ? [f(st, { name: e.icon })] : void 0;
      return f("div", {
        class: n.value,
        style: a.value
      }, [f("div", {
        class: "q-avatar__content row flex-center overflow-hidden",
        style: l.value
      }, Xo(t.default, o))]);
    };
  }
});
const Cc = [
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
      validator: (e) => Cc.includes(e)
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
var kc = re({
  name: "QBanner",
  props: {
    ...it,
    inlineActions: Boolean,
    dense: Boolean,
    rounded: Boolean
  },
  setup(e, { slots: t }) {
    const { proxy: { $q: a } } = be(), n = rt(e, a), l = s(() => "q-banner row items-center" + (e.dense === !0 ? " q-banner--dense" : "") + (n.value === !0 ? " q-banner--dark q-dark" : "") + (e.rounded === !0 ? " rounded-borders" : "")), o = s(() => `q-banner__actions row items-center justify-end col-${e.inlineActions === !0 ? "auto" : "all"}`);
    return () => {
      const i = [f("div", { class: "q-banner__avatar col-auto row items-center self-start" }, De(t.avatar)), f("div", { class: "q-banner__content col text-body2" }, De(t.default))], r = De(t.action);
      return r !== void 0 && i.push(f("div", { class: o.value }, r)), f("div", {
        class: l.value + (e.inlineActions === !1 && r !== void 0 ? " q-banner--top-padding" : ""),
        role: "alert"
      }, i);
    };
  }
}), Sc = re({
  name: "QBar",
  props: {
    ...it,
    dense: Boolean
  },
  setup(e, { slots: t }) {
    const { proxy: { $q: a } } = be(), n = rt(e, a), l = s(() => `q-bar row no-wrap items-center q-bar--${e.dense === !0 ? "dense" : "standard"}  q-bar--${n.value === !0 ? "dark" : "light"}`);
    return () => f("div", {
      class: l.value,
      role: "toolbar"
    }, De(t.default));
  }
});
const ys = {
  left: "start",
  center: "center",
  right: "end",
  between: "between",
  around: "around",
  evenly: "evenly",
  stretch: "stretch"
}, wc = Object.keys(ys), Go = { align: {
  type: String,
  validator: (e) => wc.includes(e)
} };
function Zo(e) {
  return s(() => {
    const t = e.align === void 0 ? e.vertical === !0 ? "stretch" : "left" : e.align;
    return `${e.vertical === !0 ? "items" : "justify"}-${ys[t]}`;
  });
}
function ml(e) {
  if (Object(e.$parent) === e.$parent) return e.$parent;
  let { parent: t } = e.$;
  for (; Object(t) === t; ) {
    if (Object(t.proxy) === t.proxy) return t.proxy;
    t = t.parent;
  }
}
function ps(e, t) {
  typeof t.type == "symbol" ? Array.isArray(t.children) === !0 && t.children.forEach((a) => {
    ps(e, a);
  }) : e.add(t);
}
function Jo(e) {
  const t = /* @__PURE__ */ new Set();
  return e.forEach((a) => {
    ps(t, a);
  }), Array.from(t);
}
function ei(e) {
  return e.appContext.config.globalProperties.$router !== void 0;
}
function Ma(e) {
  return e.isUnmounted === !0 || e.isDeactivated === !0;
}
const xc = ["", !0];
re({
  name: "QBreadcrumbs",
  props: {
    ...Go,
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
    const a = Zo(e), n = s(() => `flex items-center ${a.value}${e.gutter === "none" ? "" : ` q-gutter-${e.gutter}`}`), l = s(() => e.separatorColor ? ` text-${e.separatorColor}` : ""), o = s(() => ` text-${e.activeColor}`);
    return () => {
      if (t.default === void 0) return;
      const i = Jo(De(t.default));
      if (i.length === 0) return;
      let r = 1;
      const u = [], c = i.filter((v) => {
        var m;
        return ((m = v.type) == null ? void 0 : m.name) === "QBreadcrumbsEl";
      }).length, d = t.separator !== void 0 ? t.separator : () => e.separator;
      return i.forEach((v) => {
        var m;
        if (((m = v.type) == null ? void 0 : m.name) === "QBreadcrumbsEl") {
          const g = r < c, h = v.props !== null && xc.includes(v.props.disable), p = (g === !0 ? "" : " q-breadcrumbs--last") + (h !== !0 && g === !0 ? o.value : "");
          r++, u.push(f("div", { class: `flex items-center${p}` }, [v])), g === !0 && u.push(f("div", { class: "q-breadcrumbs__separator" + l.value }, d()));
        } else u.push(v);
      }), f("div", { class: "q-breadcrumbs" }, [f("div", { class: n.value }, u)]);
    };
  }
});
function Ei(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
function Ii(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function _c(e, t) {
  for (const a in t) {
    const n = t[a], l = e[a];
    if (typeof n == "string") {
      if (n !== l) return !1;
    } else if (Array.isArray(l) === !1 || l.length !== n.length || n.some((o, i) => o !== l[i])) return !1;
  }
  return !0;
}
function Oi(e, t) {
  return Array.isArray(t) === !0 ? e.length === t.length && e.every((a, n) => a === t[n]) : e.length === 1 && e[0] === t;
}
function $c(e, t) {
  return Array.isArray(e) === !0 ? Oi(e, t) : Array.isArray(t) === !0 ? Oi(t, e) : e === t;
}
function qc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const a in e) if ($c(e[a], t[a]) === !1) return !1;
  return !0;
}
const Cs = {
  to: [String, Object],
  replace: Boolean,
  href: String,
  target: String,
  disable: Boolean
}, Xn = {
  ...Cs,
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
  const a = be(), { props: n, proxy: l, emit: o } = a, i = ei(a), r = s(() => n.disable !== !0 && n.href !== void 0), u = t === !0 ? s(() => i === !0 && n.disable !== !0 && r.value !== !0 && n.to !== void 0 && n.to !== null && n.to !== "") : s(() => i === !0 && r.value !== !0 && n.to !== void 0 && n.to !== null && n.to !== ""), c = s(() => u.value === !0 ? y(n.to) : null), d = s(() => c.value !== null), v = s(() => r.value === !0 || d.value === !0), m = s(() => n.type === "a" || v.value === !0 ? "a" : n.tag || e || "div"), g = s(() => r.value === !0 ? {
    href: n.href,
    target: n.target
  } : d.value === !0 ? {
    href: c.value.href,
    target: n.target
  } : {}), h = s(() => {
    if (d.value === !1) return -1;
    const { matched: x } = c.value, { length: L } = x, M = x[L - 1];
    if (M === void 0) return -1;
    const K = l.$route.matched;
    if (K.length === 0) return -1;
    const X = K.findIndex(Ii.bind(null, M));
    if (X !== -1) return X;
    const A = Ei(x[L - 2]);
    return L > 1 && Ei(M) === A && K[K.length - 1].path !== A ? K.findIndex(Ii.bind(null, x[L - 2])) : X;
  }), p = s(() => d.value === !0 && h.value !== -1 && _c(l.$route.params, c.value.params)), C = s(() => p.value === !0 && h.value === l.$route.matched.length - 1 && qc(l.$route.params, c.value.params)), k = s(() => d.value === !0 ? C.value === !0 ? ` ${n.exactActiveClass} ${n.activeClass}` : n.exact === !0 ? "" : p.value === !0 ? ` ${n.activeClass}` : "" : "");
  function y(x) {
    try {
      return l.$router.resolve(x);
    } catch {
    }
    return null;
  }
  function b(x, { returnRouterError: L, to: M = n.to, replace: K = n.replace } = {}) {
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
      const L = (M) => b(x, M);
      o("click", x, L), x.defaultPrevented !== !0 && L();
    } else o("click", x);
  }
  return {
    hasRouterLink: d,
    hasHrefLink: r,
    hasLink: v,
    linkTag: m,
    resolvedLink: c,
    linkIsActive: p,
    linkIsExactActive: C,
    linkClass: k,
    linkAttrs: g,
    getLink: y,
    navigateToRouterLink: b,
    navigateOnClick: w
  };
}
re({
  name: "QBreadcrumbsEl",
  props: {
    ...Xn,
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
const qt = {
  size: {
    type: [String, Number],
    default: "1em"
  },
  color: String
};
function Bt(e) {
  return {
    cSize: s(() => e.size in Do ? `${Do[e.size]}px` : e.size),
    classes: s(() => "q-spinner" + (e.color ? ` text-${e.color}` : ""))
  };
}
var la = re({
  name: "QSpinner",
  props: {
    ...qt,
    thickness: {
      type: Number,
      default: 5
    }
  },
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
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
function wn(e) {
  return e === window ? window.innerHeight : e.getBoundingClientRect().height;
}
function Lo(e, t) {
  const a = e.style;
  for (const n in t) a[n] = t[n];
}
function Bc(e) {
  if (e == null) return;
  if (typeof e == "string") try {
    return document.querySelector(e) || void 0;
  } catch {
    return;
  }
  const t = R(e);
  if (t) return t.$el || t;
}
function ks(e, t) {
  if (e == null || e.contains(t) === !0) return !0;
  for (let a = e.nextElementSibling; a !== null; a = a.nextElementSibling) if (a.contains(t)) return !0;
  return !1;
}
function Ss(e, t = 250) {
  let a = !1, n;
  return function() {
    return a === !1 && (a = !0, setTimeout(() => {
      a = !1;
    }, t), n = e.apply(this, arguments)), n;
  };
}
function Hi(e, t, a, n) {
  a.modifiers.stop === !0 && wt(e);
  const l = a.modifiers.color;
  let o = a.modifiers.center;
  o = o === !0 || n === !0;
  const i = document.createElement("span"), r = document.createElement("span"), u = Ut(e), { left: c, top: d, width: v, height: m } = t.getBoundingClientRect(), g = Math.sqrt(v * v + m * m), h = g / 2, p = `${(v - g) / 2}px`, C = o ? p : `${u.left - c - h}px`, k = `${(m - g) / 2}px`, y = o ? k : `${u.top - d - h}px`;
  r.className = "q-ripple__inner", Lo(r, {
    height: `${g}px`,
    width: `${g}px`,
    transform: `translate3d(${C},${y},0) scale3d(.2,.2,1)`,
    opacity: 0
  }), i.className = `q-ripple${l ? " text-" + l : ""}`, i.setAttribute("dir", "ltr"), i.appendChild(r), t.appendChild(i);
  const b = () => {
    i.remove(), clearTimeout(w);
  };
  a.abort.push(b);
  let w = setTimeout(() => {
    r.classList.add("q-ripple__inner--enter"), r.style.transform = `translate3d(${p},${k},0) scale3d(1,1,1)`, r.style.opacity = 0.2, w = setTimeout(() => {
      r.classList.remove("q-ripple__inner--enter"), r.classList.add("q-ripple__inner--leave"), r.style.opacity = 0, w = setTimeout(() => {
        i.remove(), a.abort.splice(a.abort.indexOf(b), 1);
      }, 275);
    }, 250);
  }, 50);
}
function Ni(e, { modifiers: t, value: a, arg: n }) {
  const l = Object.assign({}, e.cfg.ripple, t, a);
  e.modifiers = {
    early: l.early === !0,
    stop: l.stop === !0,
    center: l.center === !0,
    color: l.color || n,
    keyCodes: [].concat(l.keyCodes || 13)
  };
}
var Fl = ua({
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
        n.enabled === !0 && l.qSkipRipple !== !0 && l.type === (n.modifiers.early === !0 ? "pointerdown" : "click") && Hi(l, e, n, l.qKeyEvent === !0);
      },
      keystart: Ss((l) => {
        n.enabled === !0 && l.qSkipRipple !== !0 && aa(l, n.modifiers.keyCodes) === !0 && l.type === `key${n.modifiers.early === !0 ? "down" : "up"}` && Hi(l, e, n, !0);
      }, 300)
    };
    Ni(n, t), e.__qripple = n, _t(n, "main", [
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
      a !== void 0 && (a.enabled = t.value !== !1, a.enabled === !0 && Object(t.value) === t.value && Ni(a, t));
    }
  },
  beforeUnmount(e) {
    const t = e.__qripple;
    t !== void 0 && (t.abort.forEach((a) => {
      a();
    }), jt(t, "main"), delete e._qripple);
  }
});
const kl = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
}, Tc = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
}, Mc = [
  "button",
  "submit",
  "reset"
], Ac = /[^\s]\/[^\s]/, ws = [
  "flat",
  "outline",
  "push",
  "unelevated"
];
function ti(e, t) {
  return e.flat === !0 ? "flat" : e.outline === !0 ? "outline" : e.push === !0 ? "push" : e.unelevated === !0 ? "unelevated" : t;
}
function xs(e) {
  const t = ti(e);
  return t !== void 0 ? { [t]: !0 } : {};
}
const ai = {
  ...wa,
  ...Cs,
  type: {
    type: String,
    default: "button"
  },
  label: [Number, String],
  icon: String,
  iconRight: String,
  ...ws.reduce((e, t) => (e[t] = Boolean) && e, {}),
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
    ...Go.align,
    default: "center"
  },
  stack: Boolean,
  stretch: Boolean,
  loading: {
    type: Boolean,
    default: null
  },
  disable: Boolean
}, Dc = {
  ...ai,
  round: Boolean
};
function Lc(e) {
  const t = xa(e, Tc), a = Zo(e), { hasRouterLink: n, hasLink: l, linkTag: o, linkAttrs: i, navigateOnClick: r } = Rl({ fallbackTag: "button" }), u = s(() => {
    const h = e.fab === !1 && e.fabMini === !1 ? t.value : {};
    return e.padding !== void 0 ? Object.assign({}, h, {
      padding: e.padding.split(/\s+/).map((p) => p in kl ? kl[p] + "px" : p).join(" "),
      minWidth: "0",
      minHeight: "0"
    }) : h;
  }), c = s(() => e.rounded === !0 || e.fab === !0 || e.fabMini === !0), d = s(() => e.disable !== !0 && e.loading !== !0), v = s(() => d.value === !0 ? e.tabindex || 0 : -1), m = s(() => ti(e, "standard")), g = s(() => {
    const h = { tabindex: v.value };
    return l.value === !0 ? Object.assign(h, i.value) : Mc.includes(e.type) === !0 && (h.type = e.type), o.value === "a" ? (e.disable === !0 ? h["aria-disabled"] = "true" : h.href === void 0 && (h.role = "button"), n.value !== !0 && Ac.test(e.type) === !0 && (h.type = e.type)) : e.disable === !0 && (h.disabled = "", h["aria-disabled"] = "true"), e.loading === !0 && e.percentage !== void 0 && Object.assign(h, {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": e.percentage
    }), h;
  });
  return {
    classes: s(() => {
      let h;
      e.color !== void 0 ? e.flat === !0 || e.outline === !0 ? h = `text-${e.textColor || e.color}` : h = `bg-${e.color} text-${e.textColor || "white"}` : e.textColor && (h = `text-${e.textColor}`);
      const p = e.round === !0 ? "round" : `rectangle${c.value === !0 ? " q-btn--rounded" : e.square === !0 ? " q-btn--square" : ""}`;
      return `q-btn--${m.value} q-btn--${p}` + (h !== void 0 ? " " + h : "") + (d.value === !0 ? " q-btn--actionable q-focusable q-hoverable" : e.disable === !0 ? " disabled" : "") + (e.fab === !0 ? " q-btn--fab" : e.fabMini === !0 ? " q-btn--fab-mini" : "") + (e.noCaps === !0 ? " q-btn--no-uppercase" : "") + (e.dense === !0 ? " q-btn--dense" : "") + (e.stretch === !0 ? " no-border-radius self-stretch" : "") + (e.glossy === !0 ? " glossy" : "") + (e.square ? " q-btn--square" : "");
    }),
    style: u,
    innerClasses: s(() => a.value + (e.stack === !0 ? " column" : " row") + (e.noWrap === !0 ? " no-wrap text-no-wrap" : "") + (e.loading === !0 ? " q-btn__content--hidden" : "")),
    attributes: g,
    hasLink: l,
    linkTag: o,
    navigateOnClick: r,
    isActionable: d
  };
}
const { passiveCapture: Zt } = gt;
let ln = null, on = null, rn = null;
var ft = re({
  name: "QBtn",
  props: {
    ...Dc,
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
    const { proxy: n } = be(), { classes: l, style: o, innerClasses: i, attributes: r, hasLink: u, linkTag: c, navigateOnClick: d, isActionable: v } = Lc(e), m = V(null), g = V(null);
    let h = null, p, C = null;
    const k = s(() => e.label !== void 0 && e.label !== null && e.label !== ""), y = s(() => e.disable === !0 || e.ripple === !1 ? !1 : {
      keyCodes: u.value === !0 ? [13, 32] : [13],
      ...e.ripple === !0 ? {} : e.ripple
    }), b = s(() => ({ center: e.round })), w = s(() => {
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
      ref: m,
      class: "q-btn q-btn-item non-selectable no-outline " + l.value,
      style: o.value,
      ...r.value,
      ...x.value
    }));
    function M(S) {
      if (m.value !== null) {
        if (S !== void 0) {
          if (S.defaultPrevented === !0) return;
          const T = document.activeElement;
          if (e.type === "submit" && T !== document.body && m.value.contains(T) === !1 && T.contains(m.value) === !1) {
            S.qAvoidFocus !== !0 && m.value.focus();
            const H = () => {
              var E;
              document.removeEventListener("keydown", Ye, !0), document.removeEventListener("keyup", H, Zt), (E = m.value) == null || E.removeEventListener("blur", H, Zt);
            };
            document.addEventListener("keydown", Ye, !0), document.addEventListener("keyup", H, Zt), m.value.addEventListener("blur", H, Zt);
          }
        }
        d(S);
      }
    }
    function K(S) {
      m.value !== null && (a("keydown", S), aa(S, [13, 32]) === !0 && on !== m.value && (on !== null && D(), S.defaultPrevented !== !0 && (S.qAvoidFocus !== !0 && m.value.focus(), on = m.value, m.value.classList.add("q-btn--active"), document.addEventListener("keyup", $, !0), m.value.addEventListener("blur", $, Zt)), Ye(S)));
    }
    function X(S) {
      m.value !== null && (a("touchstart", S), S.defaultPrevented !== !0 && (ln !== m.value && (ln !== null && D(), ln = m.value, h = S.target, h.addEventListener("touchcancel", $, Zt), h.addEventListener("touchend", $, Zt)), p = !0, C !== null && clearTimeout(C), C = setTimeout(() => {
        C = null, p = !1;
      }, 200)));
    }
    function A(S) {
      m.value !== null && (S.qSkipRipple = p === !0, a("mousedown", S), S.defaultPrevented !== !0 && rn !== m.value && (rn !== null && D(), rn = m.value, m.value.classList.add("q-btn--active"), document.addEventListener("mouseup", $, Zt)));
    }
    function $(S) {
      if (m.value !== null && !((S == null ? void 0 : S.type) === "blur" && document.activeElement === m.value)) {
        if ((S == null ? void 0 : S.type) === "keyup") {
          if (on === m.value && aa(S, [13, 32]) === !0) {
            const T = new MouseEvent("click", S);
            T.qKeyEvent = !0, S.defaultPrevented === !0 && Pt(T), S.cancelBubble === !0 && wt(T), m.value.dispatchEvent(T), Ye(S), S.qKeyEvent = !0;
          }
          a("keyup", S);
        }
        D();
      }
    }
    function D(S) {
      var H, E;
      const T = g.value;
      S !== !0 && (ln === m.value || rn === m.value) && T !== null && T !== document.activeElement && (T.setAttribute("tabindex", -1), T.focus()), ln === m.value && (h !== null && (h.removeEventListener("touchcancel", $, Zt), h.removeEventListener("touchend", $, Zt)), ln = h = null), rn === m.value && (document.removeEventListener("mouseup", $, Zt), rn = null), on === m.value && (document.removeEventListener("keyup", $, !0), (H = m.value) == null || H.removeEventListener("blur", $, Zt), on = null), (E = m.value) == null || E.classList.remove("q-btn--active");
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
        left: e.stack !== !0 && k.value === !0,
        role: "img"
      })), k.value === !0 && S.push(f("span", { class: "block" }, [e.label])), S = $t(t.default, S), e.iconRight !== void 0 && e.round === !1 && S.push(f(st, {
        name: e.iconRight,
        right: e.stack !== !0 && k.value === !0,
        role: "img"
      }));
      const T = [f("span", {
        class: "q-focus-helper",
        ref: g
      })];
      return e.loading === !0 && e.percentage !== void 0 && T.push(f("span", { class: "q-btn__progress absolute-full overflow-hidden" + (e.darkPercentage === !0 ? " q-btn__progress--dark" : "") }, [f("span", {
        class: "q-btn__progress-indicator fit block",
        style: w.value
      })])), T.push(f("span", { class: "q-btn__content text-center col items-center q-anchor--skip " + i.value }, S)), e.loading !== null && T.push(f(Vt, { name: "q-transition--fade" }, () => e.loading === !0 ? [f("span", {
        key: "loading",
        class: "absolute-full flex flex-center"
      }, t.loading !== void 0 ? t.loading() : [f(la)])] : null)), ea(f(c.value, L.value, T), [[
        Fl,
        y.value,
        void 0,
        b.value
      ]]);
    };
  }
}), _s = re({
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
function sa() {
  if (window.getSelection !== void 0) {
    const e = window.getSelection();
    e.empty !== void 0 ? e.empty() : e.removeAllRanges !== void 0 && (e.removeAllRanges(), Bo.is.mobile !== !0 && e.addRange(document.createRange()));
  } else document.selection !== void 0 && document.selection.empty();
}
const $s = {
  target: {
    type: [
      Boolean,
      String,
      Element
    ],
    default: !0
  },
  noParentEvent: Boolean
}, qs = {
  ...$s,
  contextMenu: Boolean
};
function ni({ showing: e, avoidEmit: t, configureAnchorEl: a }) {
  const { props: n, proxy: l, emit: o } = be(), i = V(null);
  let r = null;
  function u(g) {
    return i.value === null ? !1 : g === void 0 || g.touches === void 0 || g.touches.length <= 1;
  }
  const c = {};
  a === void 0 && (Object.assign(c, {
    hide(g) {
      l.hide(g);
    },
    toggle(g) {
      l.toggle(g), g.qAnchorHandled = !0;
    },
    toggleKey(g) {
      aa(g, 13) === !0 && c.toggle(g);
    },
    contextClick(g) {
      l.hide(g), Pt(g), nt(() => {
        l.show(g), g.qAnchorHandled = !0;
      });
    },
    prevent: Pt,
    mobileTouch(g) {
      if (c.mobileCleanup(g), u(g) !== !0) return;
      l.hide(g), i.value.classList.add("non-selectable");
      const h = g.target;
      _t(c, "anchor", [
        [
          h,
          "touchmove",
          "mobileCleanup",
          "passive"
        ],
        [
          h,
          "touchend",
          "mobileCleanup",
          "passive"
        ],
        [
          h,
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
        r = null, l.show(g), g.qAnchorHandled = !0;
      }, 300);
    },
    mobileCleanup(g) {
      i.value.classList.remove("non-selectable"), r !== null && (clearTimeout(r), r = null), e.value === !0 && g !== void 0 && sa();
    }
  }), a = function(h = n.contextMenu) {
    if (n.noParentEvent === !0 || i.value === null) return;
    let p;
    h === !0 ? l.$q.platform.is.mobile === !0 ? p = [[
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
    jt(c, "anchor");
  }
  function v(g) {
    for (i.value = g; i.value.classList.contains("q-anchor--skip"); ) i.value = i.value.parentNode;
    a();
  }
  function m() {
    if (n.target === !1 || n.target === "" || l.$el.parentNode === null) i.value = null;
    else if (n.target === !0) v(l.$el.parentNode);
    else {
      let g = n.target;
      if (typeof n.target == "string") try {
        g = document.querySelector(n.target);
      } catch {
        g = void 0;
      }
      g != null ? (i.value = g.$el || g, a()) : (i.value = null, console.error(`Anchor: target "${n.target}" not found`));
    }
  }
  return se(() => n.contextMenu, (g) => {
    i.value !== null && (d(), a(g));
  }), se(() => n.target, () => {
    i.value !== null && d(), m();
  }), se(() => n.noParentEvent, (g) => {
    i.value !== null && (g === !0 ? d() : a());
  }), ht(() => {
    m(), t !== !0 && n.modelValue === !0 && i.value === null && o("update:modelValue", !1);
  }), tt(() => {
    r !== null && clearTimeout(r), d();
  }), {
    anchorEl: i,
    canShow: u,
    anchorEvents: c
  };
}
function Bs(e, t) {
  const a = V(null);
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
const $n = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
}, qn = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function Bn({ showing: e, canShow: t, hideOnRouteChange: a, handleShow: n, handleHide: l, processOnMount: o }) {
  const i = be(), { props: r, emit: u, proxy: c } = i;
  let d;
  function v(y) {
    e.value === !0 ? h(y) : m(y);
  }
  function m(y) {
    if (r.disable === !0 || (y == null ? void 0 : y.qAnchorHandled) === !0 || t !== void 0 && t(y) !== !0) return;
    const b = r["onUpdate:modelValue"] !== void 0;
    b === !0 && (u("update:modelValue", !0), d = y, nt(() => {
      d === y && (d = void 0);
    })), (r.modelValue === null || b === !1) && g(y);
  }
  function g(y) {
    e.value !== !0 && (e.value = !0, u("beforeShow", y), n !== void 0 ? n(y) : u("show", y));
  }
  function h(y) {
    if (r.disable === !0) return;
    const b = r["onUpdate:modelValue"] !== void 0;
    b === !0 && (u("update:modelValue", !1), d = y, nt(() => {
      d === y && (d = void 0);
    })), (r.modelValue === null || b === !1) && p(y);
  }
  function p(y) {
    e.value !== !1 && (e.value = !1, u("beforeHide", y), l !== void 0 ? l(y) : u("hide", y));
  }
  function C(y) {
    r.disable === !0 && y === !0 ? r["onUpdate:modelValue"] !== void 0 && u("update:modelValue", !1) : y === !0 !== e.value && (y === !0 ? g : p)(d);
  }
  se(() => r.modelValue, C), a !== void 0 && ei(i) === !0 && se(() => c.$route.fullPath, () => {
    a.value === !0 && e.value === !0 && h();
  }), o === !0 && ht(() => {
    C(r.modelValue);
  });
  const k = {
    show: m,
    hide: h,
    toggle: v
  };
  return Object.assign(c, k), k;
}
let Na = [], Qn = [];
function Ts(e) {
  Qn = Qn.filter((t) => t !== e);
}
function Vc(e) {
  Ts(e), Qn.push(e);
}
function ji(e) {
  Ts(e), Qn.length === 0 && Na.length !== 0 && (Na[Na.length - 1](), Na = []);
}
function Tn(e) {
  Qn.length === 0 ? e() : Na.push(e);
}
function zc(e) {
  Na = Na.filter((t) => t !== e);
}
const bn = [], En = [];
let Pc = 1, qa = document.body;
function li(e, t) {
  const a = document.createElement("div");
  if (a.id = t !== void 0 ? `q-portal--${t}--${Pc++}` : e, zi.globalNodes !== void 0) {
    const n = zi.globalNodes.class;
    n !== void 0 && (a.className = n);
  }
  return qa.appendChild(a), bn.push(a), En.push(t), a;
}
function Ms(e) {
  const t = bn.indexOf(e);
  bn.splice(t, 1), En.splice(t, 1), e.remove();
}
function Rc(e) {
  if (e === qa) return;
  if (qa = e, qa === document.body || En.reduce((a, n) => n === "dialog" ? a + 1 : a, 0) < 2) {
    bn.forEach((a) => {
      a.contains(qa) === !1 && qa.appendChild(a);
    });
    return;
  }
  const t = En.lastIndexOf("dialog");
  for (let a = 0; a < bn.length; a++) {
    const n = bn[a];
    (a === t || En[a] !== "dialog") && n.contains(qa) === !1 && qa.appendChild(n);
  }
}
const yn = [];
function Fc(e) {
  return yn.find((t) => t.contentEl !== null && t.contentEl.contains(e));
}
function As(e, t) {
  do {
    if (e.$options.name === "QMenu") {
      if (e.hide(t), e.$props.separateClosePopup === !0) return ml(e);
    } else if (e.__qPortal === !0) {
      const a = ml(e);
      return (a == null ? void 0 : a.$options.name) === "QPopupProxy" ? (e.hide(t), a) : e;
    }
    e = ml(e);
  } while (e != null);
}
function Ec(e, t, a) {
  for (; a !== 0 && e !== void 0 && e !== null; ) {
    if (e.__qPortal === !0) {
      if (a--, e.$options.name === "QMenu") {
        e = As(e, t);
        continue;
      }
      e.hide(t);
    }
    e = ml(e);
  }
}
const Ic = re({
  name: "QPortal",
  setup(e, { slots: t }) {
    return () => t.default();
  }
});
function Oc(e) {
  for (e = e.parent; e != null; ) {
    if (e.type.name === "QGlobalDialog") return !0;
    if (e.type.name === "QDialog" || e.type.name === "QMenu") return !1;
    e = e.parent;
  }
  return !1;
}
function oi(e, t, a, n) {
  const l = V(!1), o = V(!1);
  let i = null;
  const r = {}, u = n === "dialog" && Oc(e);
  function c(v) {
    if (v === !0) {
      ji(r), o.value = !0;
      return;
    }
    o.value = !1, l.value === !1 && (u === !1 && i === null && (i = li(!1, n)), l.value = !0, yn.push(e.proxy), Vc(r));
  }
  function d(v) {
    if (o.value = !1, v !== !0) return;
    ji(r), l.value = !1;
    const m = yn.indexOf(e.proxy);
    m !== -1 && yn.splice(m, 1), i !== null && (Ms(i), i = null);
  }
  return zl(() => {
    d(!0);
  }), e.proxy.__qPortal = !0, zt(e.proxy, "contentEl", () => t.value), {
    showPortal: c,
    hidePortal: d,
    portalIsActive: l,
    portalIsAccessible: o,
    renderPortal: () => u === !0 ? a() : l.value === !0 ? [f(kd, { to: i }, f(Ic, a))] : void 0
  };
}
const Qa = {
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
function pn() {
  let e;
  const t = be();
  function a() {
    e = void 0;
  }
  return Sa(a), tt(a), {
    removeTick: a,
    registerTick(n) {
      e = n, nt(() => {
        e === n && (Ma(t) === !1 && e(), e = void 0);
      });
    }
  };
}
function ka() {
  let e = null;
  const t = be();
  function a() {
    e !== null && (clearTimeout(e), e = null);
  }
  return Sa(a), tt(a), {
    removeTimeout: a,
    registerTimeout(n, l) {
      a(), Ma(t) === !1 && (e = setTimeout(() => {
        e = null, n();
      }, l));
    }
  };
}
const nn = [Element, String], Hc = [
  null,
  document,
  document.body,
  document.scrollingElement,
  document.documentElement
];
function fa(e, t) {
  let a = Bc(t);
  if (a === void 0) {
    if (e == null) return window;
    a = e.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return Hc.includes(a) ? window : a;
}
function Jn(e) {
  return (e === window ? document.body : e).scrollHeight;
}
function Aa(e) {
  return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop;
}
function Il(e) {
  return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft;
}
function Ds(e, t, a = 0) {
  const n = arguments[3] === void 0 ? performance.now() : arguments[3], l = Aa(e);
  if (a <= 0) {
    l !== t && Vo(e, t);
    return;
  }
  requestAnimationFrame((o) => {
    const i = o - n, r = l + (t - l) / Math.max(i, a) * i;
    Vo(e, r), r !== t && Ds(e, t, a - i, o);
  });
}
function Ls(e, t, a = 0) {
  const n = arguments[3] === void 0 ? performance.now() : arguments[3], l = Il(e);
  if (a <= 0) {
    l !== t && zo(e, t);
    return;
  }
  requestAnimationFrame((o) => {
    const i = o - n, r = l + (t - l) / Math.max(i, a) * i;
    zo(e, r), r !== t && Ls(e, t, a - i, o);
  });
}
function Vo(e, t) {
  if (e === window) {
    window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t);
    return;
  }
  e.scrollTop = t;
}
function zo(e, t) {
  if (e === window) {
    window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    return;
  }
  e.scrollLeft = t;
}
function Cn(e, t, a) {
  if (a) {
    Ds(e, t, a);
    return;
  }
  Vo(e, t);
}
function ao(e, t, a) {
  if (a) {
    Ls(e, t, a);
    return;
  }
  zo(e, t);
}
let el;
function gl() {
  if (el !== void 0) return el;
  const e = document.createElement("p"), t = document.createElement("div");
  Lo(e, {
    width: "100%",
    height: "200px"
  }), Lo(t, {
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
  return a === n && (n = t.clientWidth), t.remove(), el = a - n, el;
}
function Nc(e, t = !0) {
  return !e || e.nodeType !== Node.ELEMENT_NODE ? !1 : t ? e.scrollHeight > e.clientHeight && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"])) : e.scrollWidth > e.clientWidth && (e.classList.contains("scroll") || e.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"]));
}
const Ua = [];
let xn;
function jc(e) {
  xn = e.keyCode === 27;
}
function Qc() {
  xn === !0 && (xn = !1);
}
function Uc(e) {
  xn === !0 && (xn = !1, aa(e, 27) === !0 && Ua[Ua.length - 1](e));
}
function Vs(e) {
  window[e]("keydown", jc), window[e]("blur", Qc), window[e]("keyup", Uc), xn = !1;
}
function zs(e) {
  Je.is.desktop === !0 && (Ua.push(e), Ua.length === 1 && Vs("addEventListener"));
}
function Sl(e) {
  const t = Ua.indexOf(e);
  t !== -1 && (Ua.splice(t, 1), Ua.length === 0 && Vs("removeEventListener"));
}
const Ka = [];
function Ps(e) {
  Ka[Ka.length - 1](e);
}
function Rs(e) {
  Je.is.desktop === !0 && (Ka.push(e), Ka.length === 1 && document.body.addEventListener("focusin", Ps));
}
function Po(e) {
  const t = Ka.indexOf(e);
  t !== -1 && (Ka.splice(t, 1), Ka.length === 0 && document.body.removeEventListener("focusin", Ps));
}
const { notPassiveCapture: wl } = gt, Wa = [];
function xl(e) {
  const t = e.target;
  if (t === void 0 || t.nodeType === 8 || t.classList.contains("no-pointer-events") === !0) return;
  let a = yn.length - 1;
  for (; a >= 0; ) {
    const n = yn[a].$;
    if (n.type.name === "QTooltip") {
      a--;
      continue;
    }
    if (n.type.name !== "QDialog") break;
    if (n.props.seamless !== !0) return;
    a--;
  }
  for (let n = Wa.length - 1; n >= 0; n--) {
    const l = Wa[n];
    if ((l.anchorEl.value === null || l.anchorEl.value.contains(t) === !1) && (t === document.body || l.innerRef.value !== null && l.innerRef.value.contains(t) === !1))
      e.qClickOutside = !0, l.onClickOutside(e);
    else return;
  }
}
function Fs(e) {
  Wa.push(e), Wa.length === 1 && (document.addEventListener("mousedown", xl, wl), document.addEventListener("touchstart", xl, wl));
}
function _l(e) {
  const t = Wa.findIndex((a) => a === e);
  t !== -1 && (Wa.splice(t, 1), Wa.length === 0 && (document.removeEventListener("mousedown", xl, wl), document.removeEventListener("touchstart", xl, wl)));
}
let Qi, Ui;
function $l(e) {
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
function Es(e) {
  return e ? !(e.length !== 2 || typeof e[0] != "number" || typeof e[1] != "number") : !0;
}
const Ro = {
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
  Ro[`${e}#ltr`] = e, Ro[`${e}#rtl`] = e;
});
function ql(e, t) {
  const a = e.split(" ");
  return {
    vertical: a[0],
    horizontal: Ro[`${a[1]}#${t === !0 ? "rtl" : "ltr"}`]
  };
}
function Kc(e, t) {
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
function Wc(e, t, a) {
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
function Yc(e, t) {
  return {
    top: 0,
    center: t / 2,
    bottom: t,
    left: 0,
    middle: e / 2,
    right: e
  };
}
function Ki(e, t, a, n) {
  return {
    top: e[a.vertical] - t[n.vertical],
    left: e[a.horizontal] - t[n.horizontal]
  };
}
function ii(e, t = 0) {
  if (e.targetEl === null || e.anchorEl === null || t > 5) return;
  if (e.targetEl.offsetHeight === 0 || e.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      ii(e, t + 1);
    }, 10);
    return;
  }
  const { targetEl: a, offset: n, anchorEl: l, anchorOrigin: o, selfOrigin: i, absoluteOffset: r, fit: u, cover: c, maxHeight: d, maxWidth: v } = e;
  if (Je.is.ios === !0 && window.visualViewport !== void 0) {
    const L = document.body.style, { offsetLeft: M, offsetTop: K } = window.visualViewport;
    M !== Qi && (L.setProperty("--q-pe-left", M + "px"), Qi = M), K !== Ui && (L.setProperty("--q-pe-top", K + "px"), Ui = K);
  }
  const { scrollLeft: m, scrollTop: g } = a, h = r === void 0 ? Kc(l, c === !0 ? [0, 0] : n) : Wc(l, r, n);
  Object.assign(a.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth: v,
    maxHeight: d,
    visibility: "visible"
  });
  const { offsetWidth: p, offsetHeight: C } = a, { elWidth: k, elHeight: y } = u === !0 || c === !0 ? {
    elWidth: Math.max(h.width, p),
    elHeight: c === !0 ? Math.max(h.height, C) : C
  } : {
    elWidth: p,
    elHeight: C
  };
  let b = {
    maxWidth: v,
    maxHeight: d
  };
  (u === !0 || c === !0) && (b.minWidth = h.width + "px", c === !0 && (b.minHeight = h.height + "px")), Object.assign(a.style, b);
  const w = Yc(k, y);
  let x = Ki(h, w, o, i);
  if (r === void 0 || n === void 0) no(x, h, w, o, i);
  else {
    const { top: L, left: M } = x;
    no(x, h, w, o, i);
    let K = !1;
    if (x.top !== L) {
      K = !0;
      const X = 2 * n[1];
      h.center = h.top -= X, h.bottom -= X + 2;
    }
    if (x.left !== M) {
      K = !0;
      const X = 2 * n[0];
      h.middle = h.left -= X, h.right -= X + 2;
    }
    K === !0 && (x = Ki(h, w, o, i), no(x, h, w, o, i));
  }
  b = {
    top: x.top + "px",
    left: x.left + "px"
  }, x.maxHeight !== void 0 && (b.maxHeight = x.maxHeight + "px", h.height > x.maxHeight && (b.minHeight = b.maxHeight)), x.maxWidth !== void 0 && (b.maxWidth = x.maxWidth + "px", h.width > x.maxWidth && (b.minWidth = b.maxWidth)), Object.assign(a.style, b), a.scrollTop !== g && (a.scrollTop = g), a.scrollLeft !== m && (a.scrollLeft = m);
}
function no(e, t, a, n, l) {
  const o = a.bottom, i = a.right, r = gl(), u = window.innerHeight - r, c = document.body.clientWidth;
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
    ...qs,
    ...$n,
    ...it,
    ...Qa,
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
      validator: $l
    },
    self: {
      type: String,
      validator: $l
    },
    offset: {
      type: Array,
      validator: Es
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
    ...qn,
    "click",
    "escapeKey"
  ],
  setup(e, { slots: t, emit: a, attrs: n }) {
    let l = null, o, i, r;
    const u = be(), { proxy: c } = u, { $q: d } = c, v = V(null), m = V(!1), g = s(() => e.persistent !== !0 && e.noRouteDismiss !== !0), h = rt(e, d), { registerTick: p, removeTick: C } = pn(), { registerTimeout: k } = ka(), { transitionProps: y, transitionStyle: b } = El(e), { localScrollTarget: w, changeScrollEvent: x, unconfigureScrollTarget: L } = Bs(e, G), { anchorEl: M, canShow: K } = ni({ showing: m }), { hide: X } = Bn({
      showing: m,
      canShow: K,
      handleShow: N,
      handleHide: Z,
      hideOnRouteChange: g,
      processOnMount: !0
    }), { showPortal: A, hidePortal: $, renderPortal: D } = oi(u, v, de, "menu"), _ = {
      anchorEl: M,
      innerRef: v,
      onClickOutside(Y) {
        if (e.persistent !== !0 && m.value === !0)
          return X(Y), (Y.type === "touchstart" || Y.target.classList.contains("q-dialog__backdrop")) && Ye(Y), !0;
      }
    }, S = s(() => ql(e.anchor || (e.cover === !0 ? "center middle" : "bottom start"), d.lang.rtl)), T = s(() => e.cover === !0 ? S.value : ql(e.self || "top start", d.lang.rtl)), H = s(() => (e.square === !0 ? " q-menu--square" : "") + (h.value === !0 ? " q-menu--dark q-dark" : "")), E = s(() => e.autoClose === !0 ? { onClick: z } : {}), Q = s(() => m.value === !0 && e.persistent !== !0);
    se(Q, (Y) => {
      Y === !0 ? (zs(P), Fs(_)) : (Sl(P), _l(_));
    });
    function j() {
      Tn(() => {
        let Y = v.value;
        Y && Y.contains(document.activeElement) !== !0 && (Y = Y.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || Y.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || Y.querySelector("[autofocus], [data-autofocus]") || Y, Y.focus({ preventScroll: !0 }));
      });
    }
    function N(Y) {
      if (l = e.noRefocus === !1 ? document.activeElement : null, Rs(ne), A(), G(), o = void 0, Y !== void 0 && (e.touchPosition || e.contextMenu)) {
        const fe = Ut(Y);
        if (fe.left !== void 0) {
          const { top: W, left: he } = M.value.getBoundingClientRect();
          o = {
            left: fe.left - he,
            top: fe.top - W
          };
        }
      }
      i === void 0 && (i = se(() => d.screen.width + "|" + d.screen.height + "|" + e.self + "|" + e.anchor + "|" + d.lang.rtl, I)), e.noFocus !== !0 && document.activeElement.blur(), p(() => {
        I(), e.noFocus !== !0 && j();
      }), k(() => {
        d.platform.is.ios === !0 && (r = e.autoClose, v.value.click()), I(), A(!0), a("show", Y);
      }, e.transitionDuration);
    }
    function Z(Y) {
      C(), $(), B(!0), l !== null && (Y === void 0 || Y.qClickOutside !== !0) && ((((Y == null ? void 0 : Y.type.indexOf("key")) === 0 ? l.closest('[tabindex]:not([tabindex^="-"])') : void 0) || l).focus(), l = null), k(() => {
        $(!0), a("hide", Y);
      }, e.transitionDuration);
    }
    function B(Y) {
      o = void 0, i !== void 0 && (i(), i = void 0), (Y === !0 || m.value === !0) && (Po(ne), L(), _l(_), Sl(P)), Y !== !0 && (l = null);
    }
    function G() {
      (M.value !== null || e.scrollTarget !== void 0) && (w.value = fa(M.value, e.scrollTarget), x(w.value, I));
    }
    function z(Y) {
      r !== !0 ? (As(c, Y), a("click", Y)) : r = !1;
    }
    function ne(Y) {
      Q.value === !0 && e.noFocus !== !0 && ks(v.value, Y.target) !== !0 && j();
    }
    function P(Y) {
      e.noEscDismiss !== !0 && (a("escapeKey"), X(Y));
    }
    function I() {
      ii({
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
      return f(Vt, y.value, () => m.value === !0 ? f("div", {
        role: "menu",
        ...n,
        ref: v,
        tabindex: -1,
        class: ["q-menu q-position-engine scroll" + H.value, n.class],
        style: [n.style, b.value],
        ...E.value
      }, De(t.default)) : null);
    }
    return tt(B), Object.assign(c, {
      focus: j,
      updatePosition: I
    }), D;
  }
});
let lo, tl = 0;
const It = new Array(256);
for (let e = 0; e < 256; e++) It[e] = (e + 256).toString(16).substring(1);
const Xc = (() => {
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
})(), Wi = 4096;
function Un() {
  (lo === void 0 || tl + 16 > Wi) && (tl = 0, lo = Xc(Wi));
  const e = Array.prototype.slice.call(lo, tl, tl += 16);
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, It[e[0]] + It[e[1]] + It[e[2]] + It[e[3]] + "-" + It[e[4]] + It[e[5]] + "-" + It[e[6]] + It[e[7]] + "-" + It[e[8]] + It[e[9]] + "-" + It[e[10]] + It[e[11]] + It[e[12]] + It[e[13]] + It[e[14]] + It[e[15]];
}
function Gc(e) {
  return e ?? null;
}
function Yi(e, t) {
  return e ?? (t === !0 ? `f_${Un()}` : null);
}
function Hl({ getValue: e, required: t = !0 } = {}) {
  if (ta.value === !0) {
    const a = e !== void 0 ? V(Gc(e())) : V(null);
    return t === !0 && a.value === null && ht(() => {
      a.value = `f_${Un()}`;
    }), e !== void 0 && se(e, (n) => {
      a.value = Yi(n, t);
    }), a;
  }
  return e !== void 0 ? s(() => Yi(e(), t)) : V(`f_${Un()}`);
}
const Zc = Object.keys(ai);
function Jc(e) {
  return Zc.reduce((t, a) => {
    const n = e[a];
    return n !== void 0 && (t[a] = n), t;
  }, {});
}
var ef = re({
  name: "QBtnDropdown",
  props: {
    ...ai,
    ...Qa,
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
    const { proxy: n } = be(), l = V(e.modelValue), o = V(null), i = Hl(), r = s(() => {
      const w = {
        "aria-expanded": l.value === !0 ? "true" : "false",
        "aria-haspopup": "true",
        "aria-controls": i.value,
        "aria-label": e.toggleAriaLabel || n.$q.lang.label[l.value === !0 ? "collapse" : "expand"](e.label)
      };
      return (e.disable === !0 || e.split === !1 && e.disableMainBtn === !0 || e.disableDropdown === !0) && (w["aria-disabled"] = "true"), w;
    }), u = s(() => "q-btn-dropdown__arrow" + (l.value === !0 && e.noIconAnimation === !1 ? " rotate-180" : "") + (e.split === !1 ? " q-btn-dropdown__arrow-container" : "")), c = s(() => xs(e)), d = s(() => Jc(e));
    se(() => e.modelValue, (w) => {
      var x;
      (x = o.value) == null || x[w ? "show" : "hide"]();
    }), se(() => e.split, b);
    function v(w) {
      l.value = !0, a("beforeShow", w);
    }
    function m(w) {
      a("show", w), a("update:modelValue", !0);
    }
    function g(w) {
      l.value = !1, a("beforeHide", w);
    }
    function h(w) {
      a("hide", w), a("update:modelValue", !1);
    }
    function p(w) {
      a("click", w);
    }
    function C(w) {
      wt(w), b(), a("click", w);
    }
    function k(w) {
      var x;
      (x = o.value) == null || x.toggle(w);
    }
    function y(w) {
      var x;
      (x = o.value) == null || x.show(w);
    }
    function b(w) {
      var x;
      (x = o.value) == null || x.hide(w);
    }
    return Object.assign(n, {
      show: y,
      hide: b,
      toggle: k
    }), ht(() => {
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
        onShow: m,
        onBeforeHide: g,
        onHide: h
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
      }) : f(_s, {
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
        onClick: C
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
const oa = { name: String };
function Gn(e) {
  return s(() => ({
    type: "hidden",
    name: e.name,
    value: e.modelValue
  }));
}
function za(e = {}) {
  return (t, a, n) => {
    t[a](f("input", {
      class: "hidden" + (n || ""),
      ...e.value
    }));
  };
}
function ri(e) {
  return s(() => e.name || e.for);
}
re({
  name: "QBtnToggle",
  props: {
    ...oa,
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
    const n = s(() => e.options.find((v) => v.value === e.modelValue) !== void 0), l = za(s(() => ({
      type: "hidden",
      name: e.name,
      value: e.modelValue
    }))), o = s(() => xs(e)), i = s(() => ({
      rounded: e.rounded,
      dense: e.dense,
      ...o.value
    })), r = s(() => e.options.map((v, m) => {
      const { attrs: g, value: h, slot: p, ...C } = v;
      return {
        slot: p,
        props: {
          key: m,
          "aria-pressed": h === e.modelValue ? "true" : "false",
          ...g,
          ...C,
          ...i.value,
          disable: e.disable === !0 || C.disable === !0,
          color: h === e.modelValue ? c(C, "toggleColor") : c(C, "color"),
          textColor: h === e.modelValue ? c(C, "toggleTextColor") : c(C, "textColor"),
          noCaps: c(C, "noCaps") === !0,
          noWrap: c(C, "noWrap") === !0,
          size: c(C, "size"),
          padding: c(C, "padding"),
          ripple: c(C, "ripple"),
          stack: c(C, "stack") === !0,
          stretch: c(C, "stretch") === !0,
          onClick(k) {
            u(h, v, k);
          }
        }
      };
    }));
    function u(v, m, g) {
      e.readonly !== !0 && (e.modelValue === v ? e.clearable === !0 && (a("update:modelValue", null, null), a("clear")) : a("update:modelValue", v, m), a("click", g));
    }
    function c(v, m) {
      return v[m] === void 0 ? e[m] : v[m];
    }
    function d() {
      const v = r.value.map((m) => f(ft, m.props, m.slot !== void 0 ? t[m.slot] : void 0));
      return e.name !== void 0 && e.disable !== !0 && n.value === !0 && l(v, "push"), $t(t.default, v);
    }
    return () => f(_s, {
      class: "q-btn-toggle",
      ...o.value,
      rounded: e.rounded,
      stretch: e.stretch,
      glossy: e.glossy,
      spread: e.spread
    }, d);
  }
});
var Is = re({
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
    const { proxy: { $q: a } } = be(), n = rt(e, a), l = s(() => "q-card" + (n.value === !0 ? " q-card--dark q-dark" : "") + (e.bordered === !0 ? " q-card--bordered" : "") + (e.square === !0 ? " q-card--square no-border-radius" : "") + (e.flat === !0 ? " q-card--flat no-shadow" : ""));
    return () => f(e.tag, { class: l.value }, De(t.default));
  }
}), Oa = re({
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
}), tf = re({
  name: "QCardActions",
  props: {
    ...Go,
    vertical: Boolean
  },
  setup(e, { slots: t }) {
    const a = Zo(e), n = s(() => `q-card__actions ${a.value} q-card__actions--${e.vertical === !0 ? "vert column" : "horiz row"}`);
    return () => f("div", { class: n.value }, De(t.default));
  }
});
const si = {
  left: !0,
  right: !0,
  up: !0,
  down: !0,
  horizontal: !0,
  vertical: !0
}, af = Object.keys(si);
si.all = !0;
function Bl(e) {
  const t = {};
  for (const a of af) e[a] === !0 && (t[a] = !0);
  return Object.keys(t).length === 0 ? si : (t.horizontal === !0 ? t.left = t.right = !0 : t.left === !0 && t.right === !0 && (t.horizontal = !0), t.vertical === !0 ? t.up = t.down = !0 : t.up === !0 && t.down === !0 && (t.vertical = !0), t.horizontal === !0 && t.vertical === !0 && (t.all = !0), t);
}
const nf = ["INPUT", "TEXTAREA"];
function Tl(e, t) {
  return t.event === void 0 && e.target !== void 0 && e.target.draggable !== !0 && typeof t.handler == "function" && nf.includes(e.target.nodeName.toUpperCase()) === !1 && (e.qClonedBy === void 0 || e.qClonedBy.indexOf(t.uid) === -1);
}
function lf(e) {
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
var of = ua({
  name: "touch-swipe",
  beforeMount(e, { value: t, arg: a, modifiers: n }) {
    if (n.mouse !== !0 && Je.has.touch !== !0) return;
    const l = n.mouseCapture === !0 ? "Capture" : "", o = {
      handler: t,
      sensitivity: lf(a),
      direction: Bl(n),
      noop: At,
      mouseStart(i) {
        Tl(i, o) && Pl(i) && (_t(o, "temp", [[
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
        if (Tl(i, o)) {
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
        Je.is.firefox === !0 && hn(e, !0);
        const u = Ut(i);
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
        const u = Ut(i), c = u.left - o.event.x, d = Math.abs(c), v = u.top - o.event.y, m = Math.abs(v);
        if (o.event.mouse !== !0) {
          if (d < o.sensitivity[1] && m < o.sensitivity[1]) {
            o.end(i);
            return;
          }
        } else if (window.getSelection().toString() !== "") {
          o.end(i);
          return;
        } else if (d < o.sensitivity[2] && m < o.sensitivity[2]) return;
        const g = d / r, h = m / r;
        o.direction.vertical === !0 && d < m && d < 100 && h > o.sensitivity[0] && (o.event.dir = v < 0 ? "up" : "down"), o.direction.horizontal === !0 && d > m && m < 100 && g > o.sensitivity[0] && (o.event.dir = c < 0 ? "left" : "right"), o.direction.up === !0 && d < m && v < 0 && d < 100 && h > o.sensitivity[0] && (o.event.dir = "up"), o.direction.down === !0 && d < m && v > 0 && d < 100 && h > o.sensitivity[0] && (o.event.dir = "down"), o.direction.left === !0 && d > m && c < 0 && m < 100 && g > o.sensitivity[0] && (o.event.dir = "left"), o.direction.right === !0 && d > m && c > 0 && m < 100 && g > o.sensitivity[0] && (o.event.dir = "right"), o.event.dir !== !1 ? (Ye(i), o.event.mouse === !0 && (document.body.classList.add("no-pointer-events--children"), document.body.classList.add("non-selectable"), sa(), o.styleCleanup = (p) => {
          o.styleCleanup = void 0, document.body.classList.remove("non-selectable");
          const C = () => {
            document.body.classList.remove("no-pointer-events--children");
          };
          p === !0 ? setTimeout(C, 50) : C();
        }), o.handler({
          evt: i,
          touch: o.event.mouse !== !0,
          mouse: o.event.mouse,
          direction: o.event.dir,
          duration: r,
          distance: {
            x: d,
            y: m
          }
        })) : o.end(i);
      },
      end(i) {
        var r;
        o.event !== void 0 && (jt(o, "temp"), Je.is.firefox === !0 && hn(e, !1), (r = o.styleCleanup) == null || r.call(o, !0), i !== void 0 && o.event.dir !== !1 && Ye(i), o.event = void 0);
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
    a !== void 0 && (t.oldValue !== t.value && (typeof t.value != "function" && a.end(), a.handler = t.value), a.direction = Bl(t.modifiers));
  },
  beforeUnmount(e) {
    var a;
    const t = e.__qtouchswipe;
    t !== void 0 && (jt(t, "main"), jt(t, "temp"), Je.is.firefox === !0 && hn(e, !1), (a = t.styleCleanup) == null || a.call(t), delete e.__qtouchswipe);
  }
});
function Zn() {
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
const ui = {
  name: { required: !0 },
  disable: Boolean
}, Xi = { setup(e, { slots: t }) {
  return () => f("div", {
    class: "q-panel scroll",
    role: "tabpanel"
  }, De(t.default));
} }, di = {
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
}, ci = [
  "update:modelValue",
  "beforeTransition",
  "transition"
];
function fi() {
  const { props: e, emit: t, proxy: a } = be(), { getCache: n } = Zn(), { registerTimeout: l } = ka();
  let o, i;
  const r = V(null), u = { value: null };
  function c(S) {
    const T = e.vertical === !0 ? "up" : "left";
    K((a.$q.lang.rtl === !0 ? -1 : 1) * (S.direction === T ? 1 : -1));
  }
  const d = s(() => [[
    of,
    c,
    void 0,
    {
      horizontal: e.vertical !== !0,
      vertical: e.vertical,
      mouse: !0
    }
  ]]), v = s(() => e.transitionPrev || `slide-${e.vertical === !0 ? "down" : "right"}`), m = s(() => e.transitionNext || `slide-${e.vertical === !0 ? "up" : "left"}`), g = s(() => `--q-transition-duration: ${e.transitionDuration}ms`), h = s(() => typeof e.modelValue == "string" || typeof e.modelValue == "number" ? e.modelValue : String(e.modelValue)), p = s(() => ({
    include: e.keepAliveInclude,
    exclude: e.keepAliveExclude,
    max: e.keepAliveMax
  })), C = s(() => e.keepAliveInclude !== void 0 || e.keepAliveExclude !== void 0);
  se(() => e.modelValue, (S, T) => {
    const H = w(S) === !0 ? x(S) : -1;
    i !== !0 && M(H === -1 ? 0 : H < x(T) ? -1 : 1), u.value !== H && (u.value = H, t("beforeTransition", S, T), l(() => {
      t("transition", S, T);
    }, e.transitionDuration));
  });
  function k() {
    K(1);
  }
  function y() {
    K(-1);
  }
  function b(S) {
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
    const T = S !== 0 && e.animated === !0 && u.value !== -1 ? "q-transition--" + (S === -1 ? v.value : m.value) : null;
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
    return e.keepAlive === !0 ? [f(ts, p.value, [f(C.value === !0 ? n(h.value, () => ({
      ...Xi,
      name: h.value
    })) : Xi, {
      key: h.value,
      style: g.value
    }, () => S)])] : [f("div", {
      class: "q-panel scroll",
      style: g.value,
      key: h.value,
      role: "tabpanel"
    }, [S])];
  }
  function $() {
    if (o.length !== 0)
      return e.animated === !0 ? [f(Vt, { name: r.value }, A)] : A();
  }
  function D(S) {
    return o = Jo(De(S.default, [])).filter((T) => T.props !== null && T.props.slot === void 0 && w(T.props.name) === !0), o.length;
  }
  function _() {
    return o;
  }
  return Object.assign(a, {
    next: k,
    previous: y,
    goTo: b
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
    needsUniqueKeepAliveWrapper: C,
    goToPanelByOffset: K,
    goToPanel: b,
    nextPanel: k,
    previousPanel: y
  };
}
let Mn = 0;
const vi = {
  fullscreen: Boolean,
  noRouteFullscreenExit: Boolean
}, mi = ["update:fullscreen", "fullscreen"];
function gi() {
  const e = be(), { props: t, emit: a, proxy: n } = e;
  let l, o;
  const i = V(!1);
  ei(e) === !0 && se(() => n.$route.fullPath, () => {
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
    i.value !== !0 && (i.value = !0, o = n.$el.parentNode, o.replaceChild(l, n.$el), document.body.appendChild(n.$el), Mn++, Mn === 1 && document.body.classList.add("q-body--fullscreen-mixin"));
  }
  function c() {
    i.value === !0 && (o.replaceChild(n.$el, l), i.value = !1, Mn = Math.max(0, Mn - 1), Mn === 0 && (document.body.classList.remove("q-body--fullscreen-mixin"), n.$el.scrollIntoView !== void 0 && setTimeout(() => {
      n.$el.scrollIntoView();
    })));
  }
  return Uo(() => {
    l = document.createElement("span");
  }), ht(() => {
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
const rf = [
  "top",
  "right",
  "bottom",
  "left"
], sf = [
  "regular",
  "flat",
  "outline",
  "push",
  "unelevated"
];
var uf = re({
  name: "QCarousel",
  props: {
    ...it,
    ...di,
    ...vi,
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
      validator: (e) => sf.includes(e),
      default: "flat"
    },
    autoplay: [Number, Boolean],
    arrows: Boolean,
    prevIcon: String,
    nextIcon: String,
    navigation: Boolean,
    navigationPosition: {
      type: String,
      validator: (e) => rf.includes(e)
    },
    navigationIcon: String,
    navigationActiveIcon: String,
    thumbnails: Boolean
  },
  emits: [...mi, ...ci],
  setup(e, { slots: t }) {
    const { proxy: { $q: a } } = be(), n = rt(e, a);
    let l = null, o;
    const { updatePanelsList: i, getPanelContent: r, panelDirectives: u, goToPanel: c, previousPanel: d, nextPanel: v, getEnabledPanels: m, panelIndex: g } = fi(), { inFullscreen: h } = gi(), p = s(() => h.value !== !0 && e.height !== void 0 ? { height: e.height } : {}), C = s(() => e.vertical === !0 ? "vertical" : "horizontal"), k = s(() => e.navigationPosition || (e.vertical === !0 ? "right" : "bottom")), y = s(() => `q-carousel q-panel-parent q-carousel--with${e.padding === !0 ? "" : "out"}-padding` + (h.value === !0 ? " fullscreen" : "") + (n.value === !0 ? " q-carousel--dark q-dark" : "") + (e.arrows === !0 ? ` q-carousel--arrows-${C.value}` : "") + (e.navigation === !0 ? ` q-carousel--navigation-${k.value}` : "")), b = s(() => {
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
    ht(() => {
      e.autoplay && M();
    }), tt(() => {
      l !== null && clearTimeout(l);
    });
    function K(A, $) {
      return f("div", { class: `q-carousel__control q-carousel__navigation no-wrap absolute flex q-carousel__navigation--${A} q-carousel__navigation--${k.value}` + (e.controlColor !== void 0 ? ` text-${e.controlColor}` : "") }, [f("div", { class: "q-carousel__navigation-inner flex flex-center no-wrap" }, m().map($))]);
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
          const T = _.props.name, H = g.value === S;
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
      return e.arrows === !0 && g.value >= 0 && ((e.infinite === !0 || g.value > 0) && A.push(f("div", {
        key: "prev",
        class: `q-carousel__control q-carousel__arrow q-carousel__prev-arrow q-carousel__prev-arrow--${C.value} absolute flex flex-center`
      }, [f(ft, {
        icon: b.value[0],
        ...L.value,
        onClick: d
      })])), (e.infinite === !0 || g.value < o - 1) && A.push(f("div", {
        key: "next",
        class: `q-carousel__control q-carousel__arrow q-carousel__next-arrow q-carousel__next-arrow--${C.value} absolute flex flex-center`
      }, [f(ft, {
        icon: b.value[1],
        ...L.value,
        onClick: v
      })]))), $t(t.control, A);
    }
    return () => (o = i(t), f("div", {
      class: y.value,
      style: p.value
    }, [na("div", { class: "q-carousel__slides-container" }, r(), "sl-cont", e.swipeable, () => u.value)].concat(X())));
  }
}), df = re({
  name: "QCarouselSlide",
  props: {
    ...ui,
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
      const m = v === !0 ? d.length > 1 ? (g) => g : (g) => f("div", [g]) : (g) => f("div", { [r.value.msg]: g });
      return d.map((g, h) => f("div", {
        key: h,
        class: l.value
      }, [f("div", { class: n.value }, u(m(g)))]));
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
      })), t.default !== void 0 ? v.push(c(Jo(t.default()), !0)) : e.text !== void 0 && v.push(c(e.text)), d.push(f("div", { class: i.value }, v));
      const m = [];
      return t.label !== void 0 ? m.push(f("div", { class: "q-message-label" }, t.label())) : e.label !== void 0 && m.push(f("div", {
        class: "q-message-label",
        [r.value.label]: e.label
      })), m.push(f("div", { class: o.value }, d)), f("div", { class: `q-message q-message-${a.value}` }, m);
    };
  }
});
function Os(e, t) {
  const a = V(null), n = s(() => e.disable === !0 ? null : f("span", {
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
var Hs = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const Ns = {
  ...it,
  ...wa,
  ...oa,
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
}, js = ["update:modelValue"];
function Qs(e, t) {
  const { props: a, slots: n, emit: l, proxy: o } = be(), { $q: i } = o, r = rt(a, i), u = V(null), { refocusTargetEl: c, refocusTarget: d } = Os(a, u), v = xa(a, Hs), m = s(() => a.val !== void 0 && Array.isArray(a.modelValue)), g = s(() => {
    const $ = ya(a.val);
    return m.value === !0 ? a.modelValue.findIndex((D) => ya(D) === $) : -1;
  }), h = s(() => m.value === !0 ? g.value !== -1 : ya(a.modelValue) === ya(a.trueValue)), p = s(() => m.value === !0 ? g.value === -1 : ya(a.modelValue) === ya(a.falseValue)), C = s(() => h.value === !1 && p.value === !1), k = s(() => a.disable === !0 ? -1 : a.tabindex || 0), y = s(() => `q-${e} cursor-pointer no-outline row inline no-wrap items-center` + (a.disable === !0 ? " disabled" : "") + (r.value === !0 ? ` q-${e}--dark` : "") + (a.dense === !0 ? ` q-${e}--dense` : "") + (a.leftLabel === !0 ? " reverse" : "")), b = s(() => `q-${e}__inner relative-position non-selectable q-${e}__inner--${h.value === !0 ? "truthy" : p.value === !0 ? "falsy" : "indet"}${a.color !== void 0 && (a.keepColor === !0 || (e === "toggle" ? h.value === !0 : p.value !== !0)) ? ` text-${a.color}` : ""}`), w = za(s(() => {
    const $ = { type: "checkbox" };
    return a.name !== void 0 && Object.assign($, {
      ".checked": h.value,
      "^checked": h.value === !0 ? "checked" : void 0,
      name: a.name,
      value: m.value === !0 ? a.val : a.trueValue
    }), $;
  })), x = s(() => {
    const $ = {
      tabindex: k.value,
      role: e === "toggle" ? "switch" : "checkbox",
      "aria-label": a.label,
      "aria-checked": C.value === !0 ? "mixed" : h.value === !0 ? "true" : "false"
    };
    return a.disable === !0 && ($["aria-disabled"] = "true"), $;
  });
  function L($) {
    $ !== void 0 && (Ye($), d($)), a.disable !== !0 && l("update:modelValue", M(), $);
  }
  function M() {
    if (m.value === !0) {
      if (h.value === !0) {
        const $ = a.modelValue.slice();
        return $.splice(g.value, 1), $;
      }
      return a.modelValue.concat([a.val]);
    }
    if (h.value === !0) {
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
  const A = t(h, C);
  return Object.assign(o, { toggle: L }), () => {
    const $ = A();
    a.disable !== !0 && w($, "unshift", ` q-${e}__native absolute q-ma-none q-pa-none`);
    const D = [f("div", {
      class: b.value,
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
const cf = () => f("div", {
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
  props: Ns,
  emits: js,
  setup(e) {
    const t = cf();
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
    return Qs("checkbox", a);
  }
});
const ff = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
var Us = re({
  name: "QChip",
  props: {
    ...it,
    ...wa,
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
    const { proxy: { $q: n } } = be(), l = rt(e, n), o = xa(e, ff), i = s(() => e.selected === !0 || e.icon !== void 0), r = s(() => e.selected === !0 ? e.iconSelected || n.iconSet.chip.selected : e.icon), u = s(() => e.iconRemove || n.iconSet.chip.remove), c = s(() => e.disable === !1 && (e.clickable === !0 || e.selected !== null)), d = s(() => {
      const C = e.outline === !0 && e.color || e.textColor;
      return "q-chip row inline no-wrap items-center" + (e.outline === !1 && e.color !== void 0 ? ` bg-${e.color}` : "") + (C ? ` text-${C} q-chip--colored` : "") + (e.disable === !0 ? " disabled" : "") + (e.dense === !0 ? " q-chip--dense" : "") + (e.outline === !0 ? " q-chip--outline" : "") + (e.selected === !0 ? " q-chip--selected" : "") + (c.value === !0 ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (e.square === !0 ? " q-chip--square" : "") + (l.value === !0 ? " q-chip--dark q-dark" : "");
    }), v = s(() => {
      const C = e.disable === !0 ? {
        tabindex: -1,
        "aria-disabled": "true"
      } : { tabindex: e.tabindex || 0 };
      return {
        chip: C,
        remove: {
          ...C,
          role: "button",
          "aria-hidden": "false",
          "aria-label": e.removeAriaLabel || n.lang.label.remove
        }
      };
    });
    function m(C) {
      C.keyCode === 13 && g(C);
    }
    function g(C) {
      e.disable || (a("update:selected", !e.selected), a("click", C));
    }
    function h(C) {
      (C.keyCode === void 0 || C.keyCode === 13) && (Ye(C), e.disable === !1 && (a("update:modelValue", !1), a("remove")));
    }
    function p() {
      const C = [];
      c.value === !0 && C.push(f("div", { class: "q-focus-helper" })), i.value === !0 && C.push(f(st, {
        class: "q-chip__icon q-chip__icon--left",
        name: r.value
      }));
      const k = e.label !== void 0 ? [f("div", { class: "ellipsis" }, [e.label])] : void 0;
      return C.push(f("div", { class: "q-chip__content col row no-wrap items-center q-anchor--skip" }, Xo(t.default, k))), e.iconRight && C.push(f(st, {
        class: "q-chip__icon q-chip__icon--right",
        name: e.iconRight
      })), e.removable === !0 && C.push(f(st, {
        class: "q-chip__icon q-chip__icon--remove cursor-pointer",
        name: u.value,
        ...v.value.remove,
        onClick: h,
        onKeyup: h
      })), C;
    }
    return () => {
      if (e.modelValue === !1) return;
      const C = {
        class: d.value,
        style: o.value
      };
      return c.value === !0 && Object.assign(C, v.value.chip, {
        onClick: g,
        onKeyup: m
      }), na("div", C, p(), "ripple", e.ripple !== !1 && e.disable !== !0, () => [[Fl, e.ripple]]);
    };
  }
});
const hi = {
  ...wa,
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
}, Fo = 50, Ks = 2 * Fo, Ws = Ks * Math.PI, vf = Math.round(Ws * 1e3) / 1e3;
var bi = re({
  name: "QCircularProgress",
  props: {
    ...hi,
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
    const { proxy: { $q: a } } = be(), n = xa(e), l = s(() => {
      const g = (a.lang.rtl === !0 ? -1 : 1) * e.angle;
      return { transform: e.reverse !== (a.lang.rtl === !0) ? `scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90 - g}deg)` : `rotate3d(0, 0, 1, ${g - 90}deg)` };
    }), o = s(() => e.instantFeedback !== !0 && e.indeterminate !== !0 ? { transition: `stroke-dashoffset ${e.animationSpeed}ms ease 0s, stroke ${e.animationSpeed}ms ease` } : ""), i = s(() => Ks / (1 - e.thickness / 2)), r = s(() => `${i.value / 2} ${i.value / 2} ${i.value} ${i.value}`), u = s(() => mt(e.value, e.min, e.max)), c = s(() => e.max - e.min), d = s(() => e.thickness / 2 * i.value), v = s(() => {
      const g = (e.max - u.value) / c.value, h = e.rounded === !0 && u.value < e.max && g < 0.25 ? d.value / 2 * (1 - g / 0.25) : 0;
      return Ws * g + h;
    });
    function m({ thickness: g, offset: h, color: p, cls: C, rounded: k }) {
      return f("circle", {
        class: "q-circular-progress__" + C + (p !== void 0 ? ` text-${p}` : ""),
        style: o.value,
        fill: "transparent",
        stroke: "currentColor",
        "stroke-width": g,
        "stroke-dasharray": vf,
        "stroke-dashoffset": h,
        "stroke-linecap": k,
        cx: i.value,
        cy: i.value,
        r: Fo
      });
    }
    return () => {
      const g = [];
      e.centerColor !== void 0 && e.centerColor !== "transparent" && g.push(f("circle", {
        class: `q-circular-progress__center text-${e.centerColor}`,
        fill: "currentColor",
        r: Fo - d.value / 2,
        cx: i.value,
        cy: i.value
      })), e.trackColor !== void 0 && e.trackColor !== "transparent" && g.push(m({
        cls: "track",
        thickness: d.value,
        offset: 0,
        color: e.trackColor
      })), g.push(m({
        cls: "circle",
        thickness: d.value,
        offset: v.value,
        color: e.color,
        rounded: e.rounded === !0 ? "round" : void 0
      }));
      const h = [f("svg", {
        class: "q-circular-progress__svg",
        style: l.value,
        viewBox: r.value,
        "aria-hidden": "true"
      }, g)];
      return e.showValue === !0 && h.push(f("div", {
        class: "q-circular-progress__text absolute-full row flex-center content-center",
        style: { fontSize: e.fontSize }
      }, t.default !== void 0 ? t.default() : [f("div", u.value)])), f("div", {
        class: `q-circular-progress q-circular-progress--${e.indeterminate === !0 ? "in" : ""}determinate`,
        style: n.value,
        role: "progressbar",
        "aria-valuemin": e.min,
        "aria-valuemax": e.max,
        "aria-valuenow": e.indeterminate === !0 ? void 0 : u.value
      }, Xo(t.internal, h));
    };
  }
});
function oo(e, t, a) {
  const n = Ut(e);
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
let mf = 0;
var Jt = ua({
  name: "touch-pan",
  beforeMount(e, { value: t, modifiers: a }) {
    if (a.mouse !== !0 && Je.has.touch !== !0) return;
    function n(o, i) {
      a.mouse === !0 && i === !0 ? Ye(o) : (a.stop === !0 && wt(o), a.prevent === !0 && Pt(o));
    }
    const l = {
      uid: "qvtp_" + mf++,
      handler: t,
      modifiers: a,
      direction: Bl(a),
      noop: At,
      mouseStart(o) {
        Tl(o, l) && Pl(o) && (_t(l, "temp", [[
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
        if (Tl(o, l)) {
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
        if (Je.is.firefox === !0 && hn(e, !0), l.lastEvt = o, i === !0 || a.stop === !0) {
          if (l.direction.all !== !0 && (i !== !0 || l.modifiers.mouseAllDir !== !0 && l.modifiers.mousealldir !== !0)) {
            const c = o.type.indexOf("mouse") !== -1 ? new MouseEvent(o.type, o) : new TouchEvent(o.type, o);
            o.defaultPrevented === !0 && Pt(c), o.cancelBubble === !0 && wt(c), Object.assign(c, {
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
        const { left: r, top: u } = Ut(o);
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
        const i = Ut(o), r = i.left - l.event.x, u = i.top - l.event.y;
        if (r === 0 && u === 0) return;
        l.lastEvt = o;
        const c = l.event.mouse === !0, d = () => {
          n(o, c);
          let g;
          a.preserveCursor !== !0 && a.preservecursor !== !0 && (g = document.documentElement.style.cursor || "", document.documentElement.style.cursor = "grabbing"), c === !0 && document.body.classList.add("no-pointer-events--children"), document.body.classList.add("non-selectable"), sa(), l.styleCleanup = (h) => {
            if (l.styleCleanup = void 0, g !== void 0 && (document.documentElement.style.cursor = g), document.body.classList.remove("non-selectable"), c === !0) {
              const p = () => {
                document.body.classList.remove("no-pointer-events--children");
              };
              h !== void 0 ? setTimeout(() => {
                p(), h();
              }, 50) : p();
            } else h !== void 0 && h();
          };
        };
        if (l.event.detected === !0) {
          l.event.isFirst !== !0 && n(o, l.event.mouse);
          const { payload: g, synthetic: h } = oo(o, l, !1);
          g !== void 0 && (l.handler(g) === !1 ? l.end(o) : (l.styleCleanup === void 0 && l.event.isFirst === !0 && d(), l.event.lastX = g.position.left, l.event.lastY = g.position.top, l.event.lastDir = h === !0 ? void 0 : g.direction, l.event.isFirst = !1));
          return;
        }
        if (l.direction.all === !0 || c === !0 && (l.modifiers.mouseAllDir === !0 || l.modifiers.mousealldir === !0)) {
          d(), l.event.detected = !0, l.move(o);
          return;
        }
        const v = Math.abs(r), m = Math.abs(u);
        v !== m && (l.direction.horizontal === !0 && v > m || l.direction.vertical === !0 && v < m || l.direction.up === !0 && v < m && u < 0 || l.direction.down === !0 && v < m && u > 0 || l.direction.left === !0 && v > m && r < 0 || l.direction.right === !0 && v > m && r > 0 ? (l.event.detected = !0, l.move(o)) : l.end(o, !0));
      },
      end(o, i) {
        var r;
        if (l.event !== void 0) {
          if (jt(l, "temp"), Je.is.firefox === !0 && hn(e, !1), i === !0)
            (r = l.styleCleanup) == null || r.call(l), l.event.detected !== !0 && l.initialEvent !== void 0 && l.initialEvent.target.dispatchEvent(l.initialEvent.event);
          else if (l.event.detected === !0) {
            l.event.isFirst === !0 && l.handler(oo(o === void 0 ? l.lastEvt : o, l).payload);
            const { payload: u } = oo(o === void 0 ? l.lastEvt : o, l, !0), c = () => {
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
    a !== void 0 && (t.oldValue !== t.value && (typeof value != "function" && a.end(), a.handler = t.value), a.direction = Bl(t.modifiers));
  },
  beforeUnmount(e) {
    var a;
    const t = e.__qtouchpan;
    t !== void 0 && (t.event !== void 0 && t.end(), jt(t, "main"), jt(t, "temp"), Je.is.firefox === !0 && hn(e, !1), (a = t.styleCleanup) == null || a.call(t), delete e.__qtouchpan);
  }
});
const gf = "q-slider__marker-labels", hf = (e) => ({ value: e }), bf = ({ marker: e }) => f("div", {
  key: e.value,
  style: e.style,
  class: e.classes
}, e.label), yi = [
  34,
  37,
  40,
  33,
  39,
  38
], Ys = {
  ...it,
  ...oa,
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
}, Xs = [
  "pan",
  "update:modelValue",
  "change"
];
function Gs({ updateValue: e, updatePosition: t, getDragging: a, formAttrs: n }) {
  const { props: l, emit: o, slots: i, proxy: { $q: r } } = be(), u = rt(l, r), c = za(n), d = V(!1), v = V(!1), m = V(!1), g = V(!1), h = s(() => l.vertical === !0 ? "--v" : "--h"), p = s(() => "-" + (l.switchLabelSide === !0 ? "switched" : "standard")), C = s(() => l.vertical === !0 ? l.reverse === !0 : l.reverse !== (r.lang.rtl === !0)), k = s(() => isNaN(l.innerMin) === !0 || l.innerMin < l.min ? l.min : l.innerMin), y = s(() => isNaN(l.innerMax) === !0 || l.innerMax > l.max ? l.max : l.innerMax), b = s(() => l.disable !== !0 && l.readonly !== !0 && k.value < y.value), w = s(() => {
    if (l.step === 0) return (ye) => ye;
    const ae = (String(l.step).trim().split(".")[1] || "").length;
    return (ye) => parseFloat(ye.toFixed(ae));
  }), x = s(() => l.step === 0 ? 1 : l.step), L = s(() => b.value === !0 ? l.tabindex || 0 : -1), M = s(() => l.max - l.min), K = s(() => y.value - k.value), X = s(() => W(k.value)), A = s(() => W(y.value)), $ = s(() => l.vertical === !0 ? C.value === !0 ? "bottom" : "top" : C.value === !0 ? "right" : "left"), D = s(() => l.vertical === !0 ? "height" : "width"), _ = s(() => l.vertical === !0 ? "width" : "height"), S = s(() => l.vertical === !0 ? "vertical" : "horizontal"), T = s(() => {
    const ae = {
      role: "slider",
      "aria-valuemin": k.value,
      "aria-valuemax": y.value,
      "aria-orientation": S.value,
      "data-step": l.step
    };
    return l.disable === !0 ? ae["aria-disabled"] = "true" : l.readonly === !0 && (ae["aria-readonly"] = "true"), ae;
  }), H = s(() => `q-slider q-slider${h.value} q-slider--${d.value === !0 ? "" : "in"}active inline no-wrap ` + (l.vertical === !0 ? "row" : "column") + (l.disable === !0 ? " disabled" : " q-slider--enabled" + (b.value === !0 ? " q-slider--editable" : "")) + (m.value === "both" ? " q-slider--focus" : "") + (l.label || l.labelAlways === !0 ? " q-slider--label" : "") + (l.labelAlways === !0 ? " q-slider--label-always" : "") + (u.value === !0 ? " q-slider--dark" : "") + (l.dense === !0 ? " q-slider--dense q-slider--dense" + h.value : ""));
  function E(ae) {
    const ye = "q-slider__" + ae;
    return `${ye} ${ye}${h.value} ${ye}${h.value}${p.value}`;
  }
  function Q(ae) {
    const ye = "q-slider__" + ae;
    return `${ye} ${ye}${h.value}`;
  }
  const j = s(() => {
    const ae = l.selectionColor || l.color;
    return "q-slider__selection absolute" + (ae !== void 0 ? ` text-${ae}` : "");
  }), N = s(() => Q("markers") + " absolute overflow-hidden"), Z = s(() => Q("track-container")), B = s(() => E("pin")), G = s(() => E("label")), z = s(() => E("text-container")), ne = s(() => E("marker-labels-container") + (l.markerLabelsClass !== void 0 ? ` ${l.markerLabelsClass}` : "")), P = s(() => "q-slider__track relative-position no-outline" + (l.trackColor !== void 0 ? ` bg-${l.trackColor}` : "")), I = s(() => {
    const ae = { [_.value]: l.trackSize };
    return l.trackImg !== void 0 && (ae.backgroundImage = `url(${l.trackImg}) !important`), ae;
  }), de = s(() => "q-slider__inner absolute" + (l.innerTrackColor !== void 0 ? ` bg-${l.innerTrackColor}` : "")), Y = s(() => {
    const ae = A.value - X.value, ye = {
      [$.value]: `${100 * X.value}%`,
      [D.value]: ae === 0 ? "2px" : `${100 * ae}%`
    };
    return l.innerTrackImg !== void 0 && (ye.backgroundImage = `url(${l.innerTrackImg}) !important`), ye;
  });
  function fe(ae) {
    const { min: ye, max: Fe, step: Te } = l;
    let Oe = ye + ae * (Fe - ye);
    if (Te > 0) {
      const ut = (Oe - k.value) % Te;
      Oe += (Math.abs(ut) >= Te / 2 ? (ut < 0 ? -1 : 1) * Te : 0) - ut;
    }
    return Oe = w.value(Oe), mt(Oe, k.value, y.value);
  }
  function W(ae) {
    return M.value === 0 ? 0 : (ae - l.min) / M.value;
  }
  function he(ae, ye) {
    const Fe = Ut(ae), Te = l.vertical === !0 ? mt((Fe.top - ye.top) / ye.height, 0, 1) : mt((Fe.left - ye.left) / ye.width, 0, 1);
    return mt(C.value === !0 ? 1 - Te : Te, X.value, A.value);
  }
  const _e = s(() => jn(l.markers) === !0 ? l.markers : x.value), we = s(() => {
    const ae = [], ye = _e.value, Fe = l.max;
    let Te = l.min;
    do
      ae.push(Te), Te += ye;
    while (Te < Fe);
    return ae.push(Fe), ae;
  }), Ie = s(() => {
    const ae = ` ${gf}${h.value}-`;
    return `q-slider__marker-labels${ae}${l.switchMarkerLabelsSide === !0 ? "switched" : "standard"}${ae}${C.value === !0 ? "rtl" : "ltr"}`;
  }), ke = s(() => l.markerLabels === !1 ? null : ot(l.markerLabels).map((ae, ye) => ({
    index: ye,
    value: ae.value,
    label: ae.label || ae.value,
    classes: Ie.value + (ae.classes !== void 0 ? " " + ae.classes : ""),
    style: {
      ...We(ae.value),
      ...ae.style || {}
    }
  }))), Me = s(() => ({
    markerList: ke.value,
    markerMap: ue.value,
    classes: Ie.value,
    getStyle: We
  })), Le = s(() => {
    const ae = K.value === 0 ? "2px" : 100 * _e.value / K.value;
    return {
      ...Y.value,
      backgroundSize: l.vertical === !0 ? `2px ${ae}%` : `${ae}% 2px`
    };
  });
  function ot(ae) {
    if (ae === !1) return null;
    if (ae === !0) return we.value.map(hf);
    if (typeof ae == "function") return we.value.map((Fe) => {
      const Te = ae(Fe);
      return Nt(Te) === !0 ? {
        ...Te,
        value: Fe
      } : {
        value: Fe,
        label: Te
      };
    });
    const ye = ({ value: Fe }) => Fe >= l.min && Fe <= l.max;
    return Array.isArray(ae) === !0 ? ae.map((Fe) => Nt(Fe) === !0 ? Fe : { value: Fe }).filter(ye) : Object.keys(ae).map((Fe) => {
      const Te = ae[Fe], Oe = Number(Fe);
      return Nt(Te) === !0 ? {
        ...Te,
        value: Oe
      } : {
        value: Oe,
        label: Te
      };
    }).filter(ye);
  }
  function We(ae) {
    return { [$.value]: `${100 * (ae - l.min) / M.value}%` };
  }
  const ue = s(() => {
    if (l.markerLabels === !1) return null;
    const ae = {};
    return ke.value.forEach((ye) => {
      ae[ye.value] = ye;
    }), ae;
  });
  function le() {
    if (i["marker-label-group"] !== void 0) return i["marker-label-group"](Me.value);
    const ae = i["marker-label"] || bf;
    return ke.value.map((ye) => ae({
      marker: ye,
      ...Me.value
    }));
  }
  const ve = s(() => [[
    Jt,
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
  function Pe(ae) {
    ae.isFinal === !0 ? (g.value !== void 0 && (t(ae.evt), ae.touch === !0 && e(!0), g.value = void 0, o("pan", "end")), d.value = !1, m.value = !1) : ae.isFirst === !0 ? (g.value = a(ae.evt), t(ae.evt), e(), d.value = !0, o("pan", "start")) : (t(ae.evt), e());
  }
  function Ge() {
    m.value = !1;
  }
  function Ke(ae) {
    t(ae, a(ae)), e(), v.value = !0, d.value = !0, document.addEventListener("mouseup", je, !0);
  }
  function je() {
    v.value = !1, d.value = !1, e(!0), Ge(), document.removeEventListener("mouseup", je, !0);
  }
  function Qe(ae) {
    t(ae, a(ae)), e(!0);
  }
  function et(ae) {
    yi.includes(ae.keyCode) && e(!0);
  }
  function te(ae) {
    if (l.vertical === !0) return null;
    const ye = r.lang.rtl !== l.reverse ? 1 - ae : ae;
    return { transform: `translateX(calc(${2 * ye - 1} * ${l.thumbSize} / 2 + ${50 - 100 * ye}%))` };
  }
  function ce(ae) {
    const ye = s(() => v.value === !1 && (m.value === ae.focusValue || m.value === "both") ? " q-slider--focus" : ""), Fe = s(() => `q-slider__thumb q-slider__thumb${h.value} q-slider__thumb${h.value}-${C.value === !0 ? "rtl" : "ltr"} absolute non-selectable` + ye.value + (ae.thumbColor.value !== void 0 ? ` text-${ae.thumbColor.value}` : "")), Te = s(() => ({
      width: l.thumbSize,
      height: l.thumbSize,
      [$.value]: `${100 * ae.ratio.value}%`,
      zIndex: m.value === ae.focusValue ? 2 : void 0
    })), Oe = s(() => ae.labelColor.value !== void 0 ? ` text-${ae.labelColor.value}` : ""), ut = s(() => te(ae.ratio.value)), Ft = s(() => "q-slider__text" + (ae.labelTextColor.value !== void 0 ? ` text-${ae.labelTextColor.value}` : ""));
    return () => {
      const kt = [f("svg", {
        class: "q-slider__thumb-shape absolute-full",
        viewBox: "0 0 20 20",
        "aria-hidden": "true"
      }, [f("path", { d: l.thumbPath })]), f("div", { class: "q-slider__focus-ring fit" })];
      return (l.label === !0 || l.labelAlways === !0) && (kt.push(f("div", { class: B.value + " absolute fit no-pointer-events" + Oe.value }, [f("div", {
        class: G.value,
        style: { minWidth: l.thumbSize }
      }, [f("div", {
        class: z.value,
        style: ut.value
      }, [f("span", { class: Ft.value }, ae.label.value)])])])), l.name !== void 0 && l.disable !== !0 && c(kt, "push")), f("div", {
        class: Fe.value,
        style: Te.value,
        ...ae.getNodeData()
      }, kt);
    };
  }
  function ze(ae, ye, Fe, Te) {
    const Oe = [];
    l.innerTrackColor !== "transparent" && Oe.push(f("div", {
      key: "inner",
      class: de.value,
      style: Y.value
    })), l.selectionColor !== "transparent" && Oe.push(f("div", {
      key: "selection",
      class: j.value,
      style: ae.value
    })), l.markers !== !1 && Oe.push(f("div", {
      key: "marker",
      class: N.value,
      style: Le.value
    })), Te(Oe);
    const ut = [na("div", {
      key: "trackC",
      class: Z.value,
      tabindex: ye.value,
      ...Fe.value
    }, [f("div", {
      class: P.value,
      style: I.value
    }, Oe)], "slide", b.value, () => ve.value)];
    return l.markerLabels !== !1 && ut[l.switchMarkerLabelsSide === !0 ? "unshift" : "push"](f("div", {
      key: "markerL",
      class: ne.value
    }, le())), ut;
  }
  return tt(() => {
    document.removeEventListener("mouseup", je, !0);
  }), {
    state: {
      active: d,
      focus: m,
      preventFocus: v,
      dragging: g,
      editable: b,
      classes: H,
      tabindex: L,
      attributes: T,
      roundValueFn: w,
      keyStep: x,
      trackLen: M,
      innerMin: k,
      innerMinRatio: X,
      innerMax: y,
      innerMaxRatio: A,
      positionProp: $,
      sizeProp: D,
      isReversed: C
    },
    methods: {
      onActivate: Ke,
      onMobileClick: Qe,
      onBlur: Ge,
      onKeyup: et,
      getContent: ze,
      getThumbRenderFn: ce,
      convertRatioToModel: fe,
      convertModelToRatio: W,
      getDraggingRatio: he
    }
  };
}
const yf = () => ({});
var Ia = re({
  name: "QSlider",
  props: {
    ...Ys,
    modelValue: {
      required: !0,
      default: null,
      validator: (e) => typeof e == "number" || e === null
    },
    labelValue: [String, Number]
  },
  emits: Xs,
  setup(e, { emit: t }) {
    const { proxy: { $q: a } } = be(), { state: n, methods: l } = Gs({
      updateValue: h,
      updatePosition: C,
      getDragging: p,
      formAttrs: Gn(e)
    }), o = V(null), i = V(0), r = V(0);
    function u() {
      r.value = e.modelValue === null ? n.innerMin.value : mt(e.modelValue, n.innerMin.value, n.innerMax.value);
    }
    se(() => `${e.modelValue}|${n.innerMin.value}|${n.innerMax.value}`, u), u();
    const c = s(() => l.convertModelToRatio(r.value)), d = s(() => n.active.value === !0 ? i.value : c.value), v = s(() => {
      const b = {
        [n.positionProp.value]: `${100 * n.innerMinRatio.value}%`,
        [n.sizeProp.value]: `${100 * (d.value - n.innerMinRatio.value)}%`
      };
      return e.selectionImg !== void 0 && (b.backgroundImage = `url(${e.selectionImg}) !important`), b;
    }), m = l.getThumbRenderFn({
      focusValue: !0,
      getNodeData: yf,
      ratio: d,
      label: s(() => e.labelValue !== void 0 ? e.labelValue : r.value),
      thumbColor: s(() => e.thumbColor || e.color),
      labelColor: s(() => e.labelColor),
      labelTextColor: s(() => e.labelTextColor)
    }), g = s(() => n.editable.value !== !0 ? {} : a.platform.is.mobile === !0 ? { onClick: l.onMobileClick } : {
      onMousedown: l.onActivate,
      onFocus: k,
      onBlur: l.onBlur,
      onKeydown: y,
      onKeyup: l.onKeyup
    });
    function h(b) {
      r.value !== e.modelValue && t("update:modelValue", r.value), b === !0 && t("change", r.value);
    }
    function p() {
      return o.value.getBoundingClientRect();
    }
    function C(b, w = n.dragging.value) {
      const x = l.getDraggingRatio(b, w);
      r.value = l.convertRatioToModel(x), i.value = e.snap !== !0 || e.step === 0 ? x : l.convertModelToRatio(r.value);
    }
    function k() {
      n.focus.value = !0;
    }
    function y(b) {
      if (yi.includes(b.keyCode) === !1) return;
      Ye(b);
      const w = ([34, 33].includes(b.keyCode) ? 10 : 1) * n.keyStep.value, x = ([
        34,
        37,
        40
      ].includes(b.keyCode) ? -1 : 1) * (n.isReversed.value === !0 ? -1 : 1) * (e.vertical === !0 ? -1 : 1) * w;
      r.value = mt(n.roundValueFn.value(r.value + x), n.innerMin.value, n.innerMax.value), h();
    }
    return () => {
      const b = l.getContent(v, n.tabindex, g, (w) => {
        w.push(m());
      });
      return f("div", {
        ref: o,
        class: n.classes.value + (e.modelValue === null ? " q-slider--no-value" : ""),
        ...n.attributes.value,
        "aria-valuenow": e.modelValue
      }, b);
    };
  }
});
function Zs() {
  const e = V(!ta.value);
  return e.value === !1 && ht(() => {
    e.value = !0;
  }), { isHydrated: e };
}
const Js = typeof ResizeObserver < "u", Gi = Js === !0 ? {} : {
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
    const { proxy: r } = be();
    if (r.trigger = o, Js === !0) {
      let u;
      const c = (d) => {
        n = r.$el.parentNode, n ? (u = new ResizeObserver(o), u.observe(n), i()) : d !== !0 && nt(() => {
          c(!0);
        });
      };
      return ht(() => {
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
      const { isHydrated: u } = Zs();
      let c;
      return ht(() => {
        nt(() => {
          n = r.$el, n && v();
        });
      }), tt(d), () => {
        if (u.value === !0) return f("object", {
          class: "q--avoid-card-border",
          style: Gi.style,
          tabindex: -1,
          type: "text/html",
          data: Gi.url,
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
function pf(e, t, a) {
  const n = a === !0 ? ["left", "right"] : ["top", "bottom"];
  return `absolute-${t === !0 ? n[0] : n[1]}${e ? ` text-${e}` : ""}`;
}
const Cf = [
  "left",
  "center",
  "right",
  "justify"
];
var Zi = re({
  name: "QTabs",
  props: {
    modelValue: [Number, String],
    align: {
      type: String,
      default: "center",
      validator: (e) => Cf.includes(e)
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
    const { proxy: n } = be(), { $q: l } = n, { registerTick: o } = pn(), { registerTick: i } = pn(), { registerTick: r } = pn(), { registerTimeout: u, removeTimeout: c } = ka(), { registerTimeout: d, removeTimeout: v } = ka(), m = V(null), g = V(null), h = V(e.modelValue), p = V(!1), C = V(!0), k = V(!1), y = V(!1), b = [], w = V(0), x = V(!1);
    let L = null, M = null, K;
    const X = s(() => ({
      activeClass: e.activeClass,
      activeColor: e.activeColor,
      activeBgColor: e.activeBgColor,
      indicatorClass: pf(e.indicatorColor, e.switchIndicator, e.vertical),
      narrowIndicator: e.narrowIndicator,
      inlineLabel: e.inlineLabel,
      noCaps: e.noCaps
    })), A = s(() => {
      const le = w.value, ve = h.value;
      for (let Pe = 0; Pe < le; Pe++) if (b[Pe].name.value === ve) return !0;
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
    se(T, B), se(() => e.modelValue, (le) => {
      E({
        name: le,
        setCurrent: !0,
        skipEmit: !0
      });
    }), se(() => e.outsideArrows, Q);
    function E({ name: le, setCurrent: ve, skipEmit: Pe }) {
      h.value !== le && (Pe !== !0 && e["onUpdate:modelValue"] !== void 0 && a("update:modelValue", le), (ve === !0 || e["onUpdate:modelValue"] === void 0) && (N(h.value, le), h.value = le));
    }
    function Q() {
      o(() => {
        m.value && j({
          width: m.value.offsetWidth,
          height: m.value.offsetHeight
        });
      });
    }
    function j(le) {
      if (S.value === void 0 || g.value === null) return;
      const ve = le[S.value.container], Pe = Math.min(g.value[S.value.scroll], Array.prototype.reduce.call(g.value.children, (Ke, je) => Ke + (je[S.value.content] || 0), 0)), Ge = ve > 0 && Pe > ve;
      p.value = Ge, Ge === !0 && i(B), y.value = ve < parseInt(e.breakpoint, 10);
    }
    function N(le, ve) {
      const Pe = le != null && le !== "" ? b.find((Ke) => Ke.name.value === le) : null, Ge = ve != null && ve !== "" ? b.find((Ke) => Ke.name.value === ve) : null;
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
    function Z(le) {
      const { left: ve, width: Pe, top: Ge, height: Ke } = g.value.getBoundingClientRect(), je = le.getBoundingClientRect();
      let Qe = e.vertical === !0 ? je.top - Ge : je.left - ve;
      if (Qe < 0) {
        g.value[e.vertical === !0 ? "scrollTop" : "scrollLeft"] += Math.floor(Qe), B();
        return;
      }
      Qe += e.vertical === !0 ? je.height - Ke : je.width - Pe, Qe > 0 && (g.value[e.vertical === !0 ? "scrollTop" : "scrollLeft"] += Math.ceil(Qe), B());
    }
    function B() {
      const le = g.value;
      if (le === null) return;
      const ve = le.getBoundingClientRect(), Pe = e.vertical === !0 ? le.scrollTop : Math.abs(le.scrollLeft);
      T.value === !0 ? (C.value = Math.ceil(Pe + ve.width) < le.scrollWidth - 1, k.value = Pe > 0) : (C.value = Pe > 0, k.value = e.vertical === !0 ? Math.ceil(Pe + ve.height) < le.scrollHeight : Math.ceil(Pe + ve.width) < le.scrollWidth);
    }
    function G(le) {
      M !== null && clearInterval(M), M = setInterval(() => {
        Y(le) === !0 && P();
      }, 5);
    }
    function z() {
      G(H.value === !0 ? Number.MAX_SAFE_INTEGER : 0);
    }
    function ne() {
      G(H.value === !0 ? 0 : Number.MAX_SAFE_INTEGER);
    }
    function P() {
      M !== null && (clearInterval(M), M = null);
    }
    function I(le, ve) {
      const Pe = Array.prototype.filter.call(g.value.children, (et) => et === ve || et.matches && et.matches(".q-tab.q-focusable") === !0), Ge = Pe.length;
      if (Ge === 0) return;
      if (le === 36)
        return Z(Pe[0]), Pe[0].focus(), !0;
      if (le === 35)
        return Z(Pe[Ge - 1]), Pe[Ge - 1].focus(), !0;
      const Ke = le === (e.vertical === !0 ? 38 : 37), je = le === (e.vertical === !0 ? 40 : 39), Qe = Ke === !0 ? -1 : je === !0 ? 1 : void 0;
      if (Qe !== void 0) {
        const et = T.value === !0 ? -1 : 1, te = Pe.indexOf(ve) + Qe * et;
        return te >= 0 && te < Ge && (Z(Pe[te]), Pe[te].focus({ preventScroll: !0 })), !0;
      }
    }
    const de = s(() => H.value === !0 ? {
      get: (le) => Math.abs(le.scrollLeft),
      set: (le, ve) => {
        le.scrollLeft = -ve;
      }
    } : e.vertical === !0 ? {
      get: (le) => le.scrollTop,
      set: (le, ve) => {
        le.scrollTop = ve;
      }
    } : {
      get: (le) => le.scrollLeft,
      set: (le, ve) => {
        le.scrollLeft = ve;
      }
    });
    function Y(le) {
      const ve = g.value, { get: Pe, set: Ge } = de.value;
      let Ke = !1, je = Pe(ve);
      const Qe = le < je ? -1 : 1;
      return je += Qe * 5, je < 0 ? (Ke = !0, je = 0) : (Qe === -1 && je <= le || Qe === 1 && je >= le) && (Ke = !0, je = le), Ge(ve, je), B(), Ke;
    }
    function fe(le, ve) {
      for (const Pe in le) if (le[Pe] !== ve[Pe]) return !1;
      return !0;
    }
    function W() {
      let le = null, ve = {
        matchedLen: 0,
        queryDiff: 9999,
        hrefLen: 0
      };
      const Pe = b.filter((Qe) => {
        var et;
        return ((et = Qe.routeData) == null ? void 0 : et.hasRouterLink.value) === !0;
      }), { hash: Ge, query: Ke } = n.$route, je = Object.keys(Ke).length;
      for (const Qe of Pe) {
        const et = Qe.routeData.exact.value === !0;
        if (Qe.routeData[et === !0 ? "linkIsExactActive" : "linkIsActive"].value !== !0) continue;
        const { hash: te, query: ce, matched: ze, href: ae } = Qe.routeData.resolvedLink.value, ye = Object.keys(ce).length;
        if (et === !0) {
          if (te !== Ge || ye !== je || fe(Ke, ce) === !1) continue;
          le = Qe.name.value;
          break;
        }
        if (te !== "" && te !== Ge || ye !== 0 && fe(ce, Ke) === !1) continue;
        const Fe = {
          matchedLen: ze.length,
          queryDiff: je - ye,
          hrefLen: ae.length - te.length
        };
        if (Fe.matchedLen > ve.matchedLen) {
          le = Qe.name.value, ve = Fe;
          continue;
        } else if (Fe.matchedLen !== ve.matchedLen) continue;
        if (Fe.queryDiff < ve.queryDiff)
          le = Qe.name.value, ve = Fe;
        else if (Fe.queryDiff !== ve.queryDiff) continue;
        Fe.hrefLen > ve.hrefLen && (le = Qe.name.value, ve = Fe);
      }
      if (le === null && b.some((Qe) => Qe.routeData === void 0 && Qe.name.value === h.value) === !0) {
        ue = !1;
        return;
      }
      E({
        name: le,
        setCurrent: !0
      });
    }
    function he(le) {
      if (c(), x.value !== !0 && m.value !== null && le.target && typeof le.target.closest == "function") {
        const ve = le.target.closest(".q-tab");
        ve && m.value.contains(ve) === !0 && (x.value = !0, p.value === !0 && Z(ve));
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
        const le = se(() => n.$route.fullPath, we);
        K = () => {
          le(), K = void 0;
        };
      }
    }
    function ke(le) {
      b.push(le), w.value++, Q(), le.routeData === void 0 || n.$route === void 0 ? d(() => {
        if (p.value === !0) {
          const ve = h.value, Pe = ve != null && ve !== "" ? b.find((Ge) => Ge.name.value === ve) : null;
          Pe && Z(Pe.rootRef.value);
        }
      }) : (Ie(), le.routeData.hasRouterLink.value === !0 && we());
    }
    function Me(le) {
      b.splice(b.indexOf(le), 1), w.value--, Q(), K !== void 0 && le.routeData !== void 0 && (b.every((ve) => ve.routeData === void 0) === !0 && K(), we());
    }
    const Le = {
      currentModel: h,
      tabProps: X,
      hasFocus: x,
      hasActiveTab: A,
      registerTab: ke,
      unregisterTab: Me,
      verifyRouteModel: we,
      updateModel: E,
      onKbdNavigate: I,
      avoidRouteWatcher: !1
    };
    La(ds, Le);
    function ot() {
      L !== null && clearTimeout(L), P(), K == null || K();
    }
    let We, ue;
    return tt(ot), Sa(() => {
      We = K !== void 0, ot();
    }), en(() => {
      We === !0 && (Ie(), ue = !0, we()), Q();
    }), () => f("div", {
      ref: m,
      class: D.value,
      role: "tablist",
      onFocusin: he,
      onFocusout: _e
    }, [
      f(Ga, { onResize: j }),
      f("div", {
        ref: g,
        class: _.value,
        onScroll: B
      }, De(t.default)),
      f(st, {
        class: "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" + (C.value === !0 ? "" : " q-tabs__arrow--faded"),
        name: e.leftIcon || l.iconSet.tabs[e.vertical === !0 ? "up" : "left"],
        onMousedownPassive: z,
        onTouchstartPassive: z,
        onMouseupPassive: P,
        onMouseleavePassive: P,
        onTouchendPassive: P
      }),
      f(st, {
        class: "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" + (k.value === !0 ? "" : " q-tabs__arrow--faded"),
        name: e.rightIcon || l.iconSet.tabs[e.vertical === !0 ? "down" : "right"],
        onMousedownPassive: ne,
        onTouchstartPassive: ne,
        onMouseupPassive: P,
        onMouseleavePassive: P,
        onTouchendPassive: P
      })
    ]);
  }
});
let kf = 0;
const eu = ["click", "keydown"], tu = {
  icon: String,
  label: [Number, String],
  alert: [Boolean, String],
  alertIcon: String,
  name: {
    type: [Number, String],
    default: () => `t_${kf++}`
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
function au(e, t, a, n) {
  const l = Kt(ds, vt);
  if (l === vt)
    return console.error("QTab/QRouteTab component needs to be child of QTabs"), vt;
  const { proxy: o } = be(), i = V(null), r = V(null), u = V(null), c = s(() => e.disable === !0 || e.ripple === !1 ? !1 : Object.assign({
    keyCodes: [13, 32],
    early: !0
  }, e.ripple === !0 ? {} : e.ripple)), d = s(() => l.currentModel.value === e.name), v = s(() => "q-tab relative-position self-stretch flex flex-center text-center" + (d.value === !0 ? " q-tab--active" + (l.tabProps.value.activeClass ? " " + l.tabProps.value.activeClass : "") + (l.tabProps.value.activeColor ? ` text-${l.tabProps.value.activeColor}` : "") + (l.tabProps.value.activeBgColor ? ` bg-${l.tabProps.value.activeBgColor}` : "") : " q-tab--inactive") + (e.icon && e.label && l.tabProps.value.inlineLabel === !1 ? " q-tab--full" : "") + (e.noCaps === !0 || l.tabProps.value.noCaps === !0 ? " q-tab--no-caps" : "") + (e.disable === !0 ? " disabled" : " q-focusable q-hoverable cursor-pointer") + (n !== void 0 ? n.linkClass.value : "")), m = s(() => "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " + (l.tabProps.value.inlineLabel === !0 ? "row no-wrap q-tab__content--inline" : "column") + (e.contentClass !== void 0 ? ` ${e.contentClass}` : "")), g = s(() => e.disable === !0 || l.hasFocus.value === !0 || d.value === !1 && l.hasActiveTab.value === !0 ? -1 : e.tabindex || 0);
  function h(b, w) {
    var x;
    if (w !== !0 && (b == null ? void 0 : b.qAvoidFocus) !== !0 && ((x = i.value) == null || x.focus()), e.disable === !0) {
      (n == null ? void 0 : n.hasRouterLink.value) === !0 && Ye(b);
      return;
    }
    if (n === void 0) {
      l.updateModel({ name: e.name }), a("click", b);
      return;
    }
    if (n.hasRouterLink.value === !0) {
      const L = (M = {}) => {
        let K;
        const X = M.to === void 0 || ra(M.to, e.to) === !0 ? l.avoidRouteWatcher = Un() : null;
        return n.navigateToRouterLink(b, {
          ...M,
          returnRouterError: !0
        }).catch((A) => {
          K = A;
        }).then((A) => {
          var $;
          if (X === l.avoidRouteWatcher && (l.avoidRouteWatcher = !1, K === void 0 && (A === void 0 || (($ = A.message) == null ? void 0 : $.startsWith("Avoided redundant navigation")) === !0) && l.updateModel({ name: e.name })), M.returnRouterError === !0) return K !== void 0 ? Promise.reject(K) : A;
        });
      };
      a("click", b, L), b.defaultPrevented !== !0 && L();
      return;
    }
    a("click", b);
  }
  function p(b) {
    aa(b, [13, 32]) ? h(b, !0) : tn(b) !== !0 && b.keyCode >= 35 && b.keyCode <= 40 && b.altKey !== !0 && b.metaKey !== !0 && l.onKbdNavigate(b.keyCode, o.$el) === !0 && Ye(b), a("keydown", b);
  }
  function C() {
    const b = l.tabProps.value.narrowIndicator, w = [], x = f("div", {
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
    }) : f("div", { class: "q-tab__alert" + (e.alert !== !0 ? ` text-${e.alert}` : "") })), b === !0 && w.push(x);
    const L = [f("div", {
      class: "q-focus-helper",
      tabindex: -1,
      ref: i
    }), f("div", { class: m.value }, $t(t.default, w))];
    return b === !1 && L.push(x), L;
  }
  const k = {
    name: s(() => e.name),
    rootRef: r,
    tabIndicatorRef: u,
    routeData: n
  };
  tt(() => {
    l.unregisterTab(k);
  }), ht(() => {
    l.registerTab(k);
  });
  function y(b, w) {
    return ea(f(b, {
      ref: r,
      class: v.value,
      tabindex: g.value,
      role: "tab",
      "aria-selected": d.value === !0 ? "true" : "false",
      "aria-disabled": e.disable === !0 ? "true" : void 0,
      onClick: h,
      onKeydown: p,
      ...w
    }, C()), [[Fl, c.value]]);
  }
  return {
    renderTab: y,
    $tabs: l
  };
}
var An = re({
  name: "QTab",
  props: tu,
  emits: eu,
  setup(e, { slots: t, emit: a }) {
    const { renderTab: n } = au(e, t, a);
    return () => n("div");
  }
}), Sf = re({
  name: "QTabPanels",
  props: {
    ...di,
    ...it
  },
  emits: ci,
  setup(e, { slots: t }) {
    const a = rt(e, be().proxy.$q), { updatePanelsList: n, getPanelContent: l, panelDirectives: o } = fi(), i = s(() => "q-tab-panels q-panel-parent" + (a.value === !0 ? " q-tab-panels--dark q-dark" : ""));
    return () => (n(t), na("div", { class: i.value }, l(), "pan", e.swipeable, () => o.value));
  }
}), io = re({
  name: "QTabPanel",
  props: ui,
  setup(e, { slots: t }) {
    return () => f("div", {
      class: "q-tab-panel",
      role: "tabpanel"
    }, De(t.default));
  }
});
const Ji = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, er = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, tr = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, al = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, nl = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/, hl = {
  date: (e) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),
  time: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),
  fulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),
  timeOrFulltime: (e) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),
  email: (e) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),
  hexColor: (e) => Ji.test(e),
  hexaColor: (e) => er.test(e),
  hexOrHexaColor: (e) => tr.test(e),
  rgbColor: (e) => al.test(e),
  rgbaColor: (e) => nl.test(e),
  rgbOrRgbaColor: (e) => al.test(e) || nl.test(e),
  hexOrRgbColor: (e) => Ji.test(e) || al.test(e),
  hexaOrRgbaColor: (e) => er.test(e) || nl.test(e),
  anyColor: (e) => tr.test(e) || al.test(e) || nl.test(e)
}, wf = /^rgb(a)?\((\d{1,3}),(\d{1,3}),(\d{1,3}),?([01]?\.?\d*?)?\)$/;
function ar({ r: e, g: t, b: a, a: n }) {
  const l = n !== void 0;
  if (e = Math.round(e), t = Math.round(t), a = Math.round(a), e > 255 || t > 255 || a > 255 || l && n > 100) throw new TypeError("Expected 3 numbers below 256 (and optionally one below 100)");
  return n = l ? (Math.round(255 * n / 100) | 256).toString(16).slice(1) : "", "#" + (a | t << 8 | e << 16 | 1 << 24).toString(16).slice(1) + n;
}
function nr({ r: e, g: t, b: a, a: n }) {
  return `rgb${n !== void 0 ? "a" : ""}(${e},${t},${a}${n !== void 0 ? "," + n / 100 : ""})`;
}
function nu(e) {
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
function lr({ h: e, s: t, v: a, a: n }) {
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
function ro({ r: e, g: t, b: a, a: n }) {
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
function lu(e) {
  if (typeof e != "string") throw new TypeError("Expected a string");
  const t = e.replace(/ /g, ""), a = wf.exec(t);
  if (a === null) return nu(t);
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
function xf(e) {
  if (typeof e != "string" && (!e || e.r === void 0)) throw new TypeError("Expected a string or a {r, g, b} object as color");
  const t = typeof e == "string" ? lu(e) : e, a = t.r / 255, n = t.g / 255, l = t.b / 255, o = a <= 0.03928 ? a / 12.92 : ((a + 0.055) / 1.055) ** 2.4, i = n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4, r = l <= 0.03928 ? l / 12.92 : ((l + 0.055) / 1.055) ** 2.4;
  return 0.2126 * o + 0.7152 * i + 0.0722 * r;
}
const _f = [
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
], or = "M5 5 h10 v10 h-10 v-10 z", $f = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2NkYGAwZkAFZ5G5jPRRgOYEVDeB3EBjBQBOZwTVugIGyAAAAABJRU5ErkJggg==";
var qf = re({
  name: "QColor",
  props: {
    ...it,
    ...oa,
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
    const { proxy: a } = be(), { $q: n } = a, l = rt(e, n), { getCache: o } = Zn(), i = V(null), r = V(null), u = s(() => e.formatModel === "auto" ? null : e.formatModel.indexOf("hex") !== -1), c = s(() => e.formatModel === "auto" ? null : e.formatModel.indexOf("a") !== -1), d = V(e.formatModel === "auto" ? e.modelValue === void 0 || e.modelValue === null || e.modelValue === "" || e.modelValue.startsWith("#") ? "hex" : "rgb" : e.formatModel.startsWith("hex") ? "hex" : "rgb"), v = V(e.defaultView), m = V($(e.modelValue || e.defaultValue)), g = s(() => e.disable !== !0 && e.readonly !== !0), h = s(() => e.modelValue === void 0 || e.modelValue === null || e.modelValue === "" || e.modelValue.startsWith("#")), p = s(() => u.value !== null ? u.value : h.value), C = za(s(() => ({
      type: "hidden",
      name: e.name,
      value: m.value[p.value === !0 ? "hex" : "rgb"]
    }))), k = s(() => c.value !== null ? c.value : m.value.a !== void 0), y = s(() => ({ backgroundColor: m.value.rgb || "#000" })), b = s(() => `q-color-picker__header-content q-color-picker__header-content--${m.value.a !== void 0 && m.value.a < 65 || xf(m.value) > 0.4 ? "light" : "dark"}`), w = s(() => ({ background: `hsl(${m.value.h},100%,50%)` })), x = s(() => ({
      top: `${100 - m.value.v}%`,
      [n.lang.rtl === !0 ? "right" : "left"]: `${m.value.s}%`
    })), L = s(() => e.palette !== void 0 && e.palette.length !== 0 ? e.palette : _f), M = s(() => "q-color-picker" + (e.bordered === !0 ? " q-color-picker--bordered" : "") + (e.square === !0 ? " q-color-picker--square no-border-radius" : "") + (e.flat === !0 ? " q-color-picker--flat no-shadow" : "") + (e.disable === !0 ? " disabled" : "") + (l.value === !0 ? " q-color-picker--dark q-dark" : "")), K = s(() => e.disable === !0 ? { "aria-disabled": "true" } : {}), X = s(() => [[
      Jt,
      Q,
      void 0,
      {
        prevent: !0,
        stop: !0,
        mouse: !0
      }
    ]]);
    se(() => e.modelValue, (W) => {
      const he = $(W || e.defaultValue);
      he.hex !== m.value.hex && (m.value = he);
    }), se(() => e.defaultValue, (W) => {
      if (!e.modelValue && W) {
        const he = $(W);
        he.hex !== m.value.hex && (m.value = he);
      }
    });
    function A(W, he) {
      m.value.hex = ar(W), m.value.rgb = nr(W), m.value.r = W.r, m.value.g = W.g, m.value.b = W.b, m.value.a = W.a;
      const _e = m.value[p.value === !0 ? "hex" : "rgb"];
      t("update:modelValue", _e), he === !0 && t("change", _e);
    }
    function $(W) {
      const he = c.value !== void 0 ? c.value : e.formatModel === "auto" ? null : e.formatModel.indexOf("a") !== -1;
      if (typeof W != "string" || W.length === 0 || hl.anyColor(W.replace(/ /g, "")) !== !0) return {
        h: 0,
        s: 0,
        v: 0,
        r: 0,
        g: 0,
        b: 0,
        a: he === !0 ? 100 : void 0,
        hex: void 0,
        rgb: void 0
      };
      const _e = lu(W);
      return he === !0 && _e.a === void 0 && (_e.a = 100), _e.hex = ar(_e), _e.rgb = nr(_e), Object.assign(_e, ro(_e));
    }
    function D(W, he, _e) {
      const we = i.value;
      if (we === null) return;
      const Ie = we.clientWidth, ke = we.clientHeight, Me = we.getBoundingClientRect();
      let Le = Math.min(Ie, Math.max(0, W - Me.left));
      n.lang.rtl === !0 && (Le = Ie - Le);
      const ot = Math.min(ke, Math.max(0, he - Me.top)), We = Math.round(100 * Le / Ie), ue = Math.round(100 * Math.max(0, Math.min(1, -(ot / ke) + 1))), le = lr({
        h: m.value.h,
        s: We,
        v: ue,
        a: k.value === !0 ? m.value.a : void 0
      });
      m.value.s = We, m.value.v = ue, A(le, _e);
    }
    function _(W, he) {
      const _e = Math.round(W), we = lr({
        h: _e,
        s: m.value.s,
        v: m.value.v,
        a: k.value === !0 ? m.value.a : void 0
      });
      m.value.h = _e, A(we, he);
    }
    function S(W) {
      _(W, !0);
    }
    function T(W, he, _e, we, Ie) {
      if (we !== void 0 && wt(we), !/^[0-9]+$/.test(W)) {
        Ie === !0 && a.$forceUpdate();
        return;
      }
      const ke = Math.floor(Number(W));
      if (ke < 0 || ke > _e) {
        Ie === !0 && a.$forceUpdate();
        return;
      }
      const Me = {
        r: he === "r" ? ke : m.value.r,
        g: he === "g" ? ke : m.value.g,
        b: he === "b" ? ke : m.value.b,
        a: k.value === !0 ? he === "a" ? ke : m.value.a : void 0
      };
      if (he !== "a") {
        const Le = ro(Me);
        m.value.h = Le.h, m.value.s = Le.s, m.value.v = Le.v;
      }
      if (A(Me, Ie), Ie !== !0 && (we == null ? void 0 : we.target.selectionEnd) !== void 0) {
        const Le = we.target.selectionEnd;
        nt(() => {
          we.target.setSelectionRange(Le, Le);
        });
      }
    }
    function H(W, he) {
      let _e;
      const we = W.target.value;
      if (wt(W), d.value === "hex") {
        if (we.length !== (k.value === !0 ? 9 : 7) || !/^#[0-9A-Fa-f]+$/.test(we)) return !0;
        _e = nu(we);
      } else {
        let ke;
        if (we.endsWith(")")) if (k.value !== !0 && we.startsWith("rgb(")) {
          if (ke = we.substring(4, we.length - 1).split(",").map((Me) => parseInt(Me, 10)), ke.length !== 3 || !/^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/.test(we)) return !0;
        } else if (k.value === !0 && we.startsWith("rgba(")) {
          if (ke = we.substring(5, we.length - 1).split(","), ke.length !== 4 || !/^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/.test(we)) return !0;
          for (let Le = 0; Le < 3; Le++) {
            const ot = parseInt(ke[Le], 10);
            if (ot < 0 || ot > 255) return !0;
            ke[Le] = ot;
          }
          const Me = parseFloat(ke[3]);
          if (Me < 0 || Me > 1) return !0;
          ke[3] = Me;
        } else return !0;
        else return !0;
        if (ke[0] < 0 || ke[0] > 255 || ke[1] < 0 || ke[1] > 255 || ke[2] < 0 || ke[2] > 255 || k.value === !0 && (ke[3] < 0 || ke[3] > 1)) return !0;
        _e = {
          r: ke[0],
          g: ke[1],
          b: ke[2],
          a: k.value === !0 ? ke[3] * 100 : void 0
        };
      }
      const Ie = ro(_e);
      if (m.value.h = Ie.h, m.value.s = Ie.s, m.value.v = Ie.v, A(_e, he), he !== !0) {
        const ke = W.target.selectionEnd;
        nt(() => {
          W.target.setSelectionRange(ke, ke);
        });
      }
    }
    function E(W) {
      const he = $(W), _e = {
        r: he.r,
        g: he.g,
        b: he.b,
        a: he.a
      };
      _e.a === void 0 && (_e.a = m.value.a), m.value.h = he.h, m.value.s = he.s, m.value.v = he.v, A(_e, !0);
    }
    function Q(W) {
      W.isFinal ? D(W.position.left, W.position.top, !0) : j(W);
    }
    const j = Ss((W) => {
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
    function z() {
      const W = [];
      return e.noHeaderTabs !== !0 && W.push(f(Zi, {
        class: "q-color-picker__header-tabs",
        modelValue: d.value,
        dense: !0,
        align: "justify",
        "onUpdate:modelValue": G
      }, () => [f(An, {
        label: "HEX" + (k.value === !0 ? "A" : ""),
        name: "hex",
        ripple: !1
      }), f(An, {
        label: "RGB" + (k.value === !0 ? "A" : ""),
        name: "rgb",
        ripple: !1
      })])), W.push(f("div", { class: "q-color-picker__header-banner row flex-center no-wrap" }, [f("input", {
        class: "fit",
        value: m.value[d.value],
        ...g.value !== !0 ? { readonly: !0 } : {},
        ...o("topIn", {
          onInput: (he) => {
            B(H(he) === !0);
          },
          onChange: wt,
          onBlur: (he) => {
            H(he, !0) === !0 && a.$forceUpdate(), B(!1);
          }
        })
      }), f(st, {
        ref: r,
        class: "q-color-picker__error-icon absolute no-pointer-events",
        name: n.iconSet.type.negative
      })])), f("div", { class: "q-color-picker__header relative-position overflow-hidden" }, [f("div", { class: "q-color-picker__header-bg absolute-full" }), f("div", {
        class: b.value,
        style: y.value
      }, W)]);
    }
    function ne() {
      return f(Sf, {
        modelValue: v.value,
        animated: !0
      }, () => [
        f(io, {
          class: "q-color-picker__spectrum-tab overflow-hidden",
          name: "spectrum"
        }, de),
        f(io, {
          class: "q-pa-md q-color-picker__tune-tab",
          name: "tune"
        }, Y),
        f(io, {
          class: "q-color-picker__palette-tab",
          name: "palette"
        }, fe)
      ]);
    }
    function P(W) {
      v.value = W;
    }
    function I() {
      return f("div", { class: "q-color-picker__footer relative-position overflow-hidden" }, [f(Zi, {
        class: "absolute-full",
        modelValue: v.value,
        dense: !0,
        align: "justify",
        "onUpdate:modelValue": P
      }, () => [
        f(An, {
          icon: n.iconSet.colorPicker.spectrum,
          name: "spectrum",
          ripple: !1
        }),
        f(An, {
          icon: n.iconSet.colorPicker.tune,
          name: "tune",
          ripple: !1
        }),
        f(An, {
          icon: n.iconSet.colorPicker.palette,
          name: "palette",
          ripple: !1
        })
      ])]);
    }
    function de() {
      const W = {
        ref: i,
        class: "q-color-picker__spectrum non-selectable relative-position cursor-pointer" + (g.value !== !0 ? " readonly" : ""),
        style: w.value,
        ...g.value === !0 ? {
          onClick: N,
          onMousedown: Z
        } : {}
      }, he = [
        f("div", { style: { paddingBottom: "100%" } }),
        f("div", { class: "q-color-picker__spectrum-white absolute-full" }),
        f("div", { class: "q-color-picker__spectrum-black absolute-full" }),
        f("div", {
          class: "absolute",
          style: x.value
        }, [m.value.hex !== void 0 ? f("div", { class: "q-color-picker__spectrum-circle" }) : null])
      ], _e = [f(Ia, {
        class: "q-color-picker__hue non-selectable",
        modelValue: m.value.h,
        min: 0,
        max: 360,
        trackSize: "8px",
        innerTrackColor: "transparent",
        selectionColor: "transparent",
        readonly: g.value !== !0,
        thumbPath: or,
        "onUpdate:modelValue": _,
        onChange: S
      })];
      return k.value === !0 && _e.push(f(Ia, {
        class: "q-color-picker__alpha non-selectable",
        modelValue: m.value.a,
        min: 0,
        max: 100,
        trackSize: "8px",
        trackColor: "white",
        innerTrackColor: "transparent",
        selectionColor: "transparent",
        trackImg: $f,
        readonly: g.value !== !0,
        hideSelection: !0,
        thumbPath: or,
        ...o("alphaSlide", {
          "onUpdate:modelValue": (we) => T(we, "a", 100),
          onChange: (we) => T(we, "a", 100, void 0, !0)
        })
      })), [na("div", W, he, "spec", g.value, () => X.value), f("div", { class: "q-color-picker__sliders" }, _e)];
    }
    function Y() {
      return [
        f("div", { class: "row items-center no-wrap" }, [
          f("div", "R"),
          f(Ia, {
            modelValue: m.value.r,
            min: 0,
            max: 255,
            color: "red",
            dark: l.value,
            readonly: g.value !== !0,
            ...o("rSlide", {
              "onUpdate:modelValue": (W) => T(W, "r", 255),
              onChange: (W) => T(W, "r", 255, void 0, !0)
            })
          }),
          f("input", {
            value: m.value.r,
            maxlength: 3,
            readonly: g.value !== !0,
            onChange: wt,
            ...o("rIn", {
              onInput: (W) => T(W.target.value, "r", 255, W),
              onBlur: (W) => T(W.target.value, "r", 255, W, !0)
            })
          })
        ]),
        f("div", { class: "row items-center no-wrap" }, [
          f("div", "G"),
          f(Ia, {
            modelValue: m.value.g,
            min: 0,
            max: 255,
            color: "green",
            dark: l.value,
            readonly: g.value !== !0,
            ...o("gSlide", {
              "onUpdate:modelValue": (W) => T(W, "g", 255),
              onChange: (W) => T(W, "g", 255, void 0, !0)
            })
          }),
          f("input", {
            value: m.value.g,
            maxlength: 3,
            readonly: g.value !== !0,
            onChange: wt,
            ...o("gIn", {
              onInput: (W) => T(W.target.value, "g", 255, W),
              onBlur: (W) => T(W.target.value, "g", 255, W, !0)
            })
          })
        ]),
        f("div", { class: "row items-center no-wrap" }, [
          f("div", "B"),
          f(Ia, {
            modelValue: m.value.b,
            min: 0,
            max: 255,
            color: "blue",
            readonly: g.value !== !0,
            dark: l.value,
            ...o("bSlide", {
              "onUpdate:modelValue": (W) => T(W, "b", 255),
              onChange: (W) => T(W, "b", 255, void 0, !0)
            })
          }),
          f("input", {
            value: m.value.b,
            maxlength: 3,
            readonly: g.value !== !0,
            onChange: wt,
            ...o("bIn", {
              onInput: (W) => T(W.target.value, "b", 255, W),
              onBlur: (W) => T(W.target.value, "b", 255, W, !0)
            })
          })
        ]),
        k.value === !0 ? f("div", { class: "row items-center no-wrap" }, [
          f("div", "A"),
          f(Ia, {
            modelValue: m.value.a,
            color: "grey",
            readonly: g.value !== !0,
            dark: l.value,
            ...o("aSlide", {
              "onUpdate:modelValue": (W) => T(W, "a", 100),
              onChange: (W) => T(W, "a", 100, void 0, !0)
            })
          }),
          f("input", {
            value: m.value.a,
            maxlength: 3,
            readonly: g.value !== !0,
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
      const W = (he) => f("div", {
        class: "q-color-picker__cube col-auto",
        style: { backgroundColor: he },
        ...g.value === !0 ? o("palette#" + he, { onClick: () => {
          E(he);
        } }) : {}
      });
      return [f("div", { class: "row items-center q-color-picker__palette-rows" + (g.value === !0 ? " q-color-picker__palette-rows--editable" : "") }, L.value.map(W))];
    }
    return () => {
      const W = [ne()];
      return e.name !== void 0 && e.disable !== !0 && C(W, "push"), e.noHeader !== !0 && W.unshift(z()), e.noFooter !== !0 && W.push(I()), f("div", {
        class: M.value,
        ...K.value
      }, W);
    };
  }
});
const Ta = [
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
function Bf(e, t, a) {
  return Object.prototype.toString.call(e) === "[object Date]" && (a = e.getDate(), t = e.getMonth() + 1, e = e.getFullYear()), Df(pi(e, t, a));
}
function ir(e, t, a) {
  return iu(Af(e, t, a));
}
function Tf(e) {
  return Mf(e) === 0;
}
function bl(e, t) {
  return t <= 6 ? 31 : t <= 11 || Tf(e) ? 30 : 29;
}
function Mf(e) {
  const t = Ta.length;
  let a = Ta[0], n, l, o, i, r;
  if (e < a || e >= Ta[t - 1]) throw new Error("Invalid Jalaali year " + e);
  for (r = 1; r < t && (n = Ta[r], l = n - a, !(e < n)); r += 1)
    a = n;
  return i = e - a, l - i < 6 && (i = i - l + Ct(l + 4, 33) * 33), o = Yt(Yt(i + 1, 33) - 1, 4), o === -1 && (o = 4), o;
}
function ou(e, t) {
  const a = Ta.length, n = e + 621;
  let l = -14, o = Ta[0], i, r, u, c, d;
  if (e < o || e >= Ta[a - 1]) throw new Error("Invalid Jalaali year " + e);
  for (d = 1; d < a && (i = Ta[d], r = i - o, !(e < i)); d += 1)
    l = l + Ct(r, 33) * 8 + Ct(Yt(r, 33), 4), o = i;
  c = e - o, l = l + Ct(c, 33) * 8 + Ct(Yt(c, 33) + 3, 4), Yt(r, 33) === 4 && r - c === 4 && (l += 1);
  const v = Ct(n, 4) - Ct((Ct(n, 100) + 1) * 3, 4) - 150, m = 20 + l - v;
  return t || (r - c < 6 && (c = c - r + Ct(r + 4, 33) * 33), u = Yt(Yt(c + 1, 33) - 1, 4), u === -1 && (u = 4)), {
    leap: u,
    gy: n,
    march: m
  };
}
function Af(e, t, a) {
  const n = ou(e, !0);
  return pi(n.gy, 3, n.march) + (t - 1) * 31 - Ct(t, 7) * (t - 7) + a - 1;
}
function Df(e) {
  const t = iu(e).gy;
  let a = t - 621, n, l, o;
  const i = ou(a, !1);
  if (o = e - pi(t, 3, i.march), o >= 0) {
    if (o <= 185)
      return l = 1 + Ct(o, 31), n = Yt(o, 31) + 1, {
        jy: a,
        jm: l,
        jd: n
      };
    o -= 186;
  } else
    a -= 1, o += 179, i.leap === 1 && (o += 1);
  return l = 7 + Ct(o, 30), n = Yt(o, 30) + 1, {
    jy: a,
    jm: l,
    jd: n
  };
}
function pi(e, t, a) {
  let n = Ct((e + Ct(t - 8, 6) + 100100) * 1461, 4) + Ct(153 * Yt(t + 9, 12) + 2, 5) + a - 34840408;
  return n = n - Ct(Ct(e + 100100 + Ct(t - 8, 6), 100) * 3, 4) + 752, n;
}
function iu(e) {
  let t = 4 * e + 139361631;
  t = t + Ct(Ct(4 * e + 183187720, 146097) * 3, 4) * 4 - 3908;
  const a = Ct(Yt(t, 1461), 4) * 5 + 308, n = Ct(Yt(a, 153), 5) + 1, l = Yt(Ct(a, 153), 12) + 1;
  return {
    gy: Ct(t, 1461) - 100100 + Ct(8 - l, 6),
    gm: l,
    gd: n
  };
}
function Ct(e, t) {
  return ~~(e / t);
}
function Yt(e, t) {
  return e - ~~(e / t) * t;
}
const Lf = ["gregorian", "persian"], Ml = {
  mask: { type: String },
  locale: Object,
  calendar: {
    type: String,
    validator: (e) => Lf.includes(e),
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
}, ru = ["update:modelValue"];
function ha(e) {
  return e.year + "/" + ct(e.month) + "/" + ct(e.day);
}
function su(e, t) {
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
      const d = Bf(u);
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
const uu = 864e5, Vf = 36e5, Eo = 6e4, du = "YYYY-MM-DDTHH:mm:ss.SSSZ", zf = /\[((?:[^\]\\]|\\]|\\)*)\]|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, Pf = /(\[[^\]]*\])|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, so = {};
function Rf(e, t) {
  const a = "(" + t.days.join("|") + ")", n = e + a;
  if (so[n] !== void 0) return so[n];
  const l = "(" + t.daysShort.join("|") + ")", o = "(" + t.months.join("|") + ")", i = "(" + t.monthsShort.join("|") + ")", r = {};
  let u = 0;
  const c = e.replace(Pf, (v) => {
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
  return so[n] = d, d;
}
function cu(e, t) {
  return e !== void 0 ? e : t !== void 0 ? t.date : To.date;
}
function rr(e, t = "") {
  const a = e > 0 ? "-" : "+", n = Math.abs(e), l = Math.floor(n / 60), o = n % 60;
  return a + ct(l) + t + ct(o);
}
function zn(e, t, a, n, l) {
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
  t === void 0 && (t = du);
  const i = cu(a, Ba.props), r = i.months, u = i.monthsShort, { regex: c, map: d } = Rf(t, i), v = e.match(c);
  if (v === null) return o;
  let m = "";
  if (d.X !== void 0 || d.x !== void 0) {
    const g = parseInt(v[d.X !== void 0 ? d.X : d.x], 10);
    if (isNaN(g) === !0 || g < 0) return o;
    const h = /* @__PURE__ */ new Date(g * (d.X !== void 0 ? 1e3 : 1));
    o.year = h.getFullYear(), o.month = h.getMonth() + 1, o.day = h.getDate(), o.hour = h.getHours(), o.minute = h.getMinutes(), o.second = h.getSeconds(), o.millisecond = h.getMilliseconds();
  } else {
    if (d.YYYY !== void 0) o.year = parseInt(v[d.YYYY], 10);
    else if (d.YY !== void 0) {
      const g = parseInt(v[d.YY], 10);
      o.year = g < 0 ? g : 2e3 + g;
    }
    if (d.M !== void 0) {
      if (o.month = parseInt(v[d.M], 10), o.month < 1 || o.month > 12) return o;
    } else d.MMM !== void 0 ? o.month = u.indexOf(v[d.MMM]) + 1 : d.MMMM !== void 0 && (o.month = r.indexOf(v[d.MMMM]) + 1);
    if (d.D !== void 0) {
      if (o.day = parseInt(v[d.D], 10), o.year === null || o.month === null || o.day < 1) return o;
      const g = n !== "persian" ? new Date(o.year, o.month, 0).getDate() : bl(o.year, o.month);
      if (o.day > g) return o;
    }
    d.H !== void 0 ? o.hour = parseInt(v[d.H], 10) % 24 : d.h !== void 0 && (o.hour = parseInt(v[d.h], 10) % 12, (d.A && v[d.A] === "PM" || d.a && v[d.a] === "pm" || d.aa && v[d.aa] === "p.m.") && (o.hour += 12), o.hour = o.hour % 24), d.m !== void 0 && (o.minute = parseInt(v[d.m], 10) % 60), d.s !== void 0 && (o.second = parseInt(v[d.s], 10) % 60), d.S !== void 0 && (o.millisecond = parseInt(v[d.S], 10) * 10 ** (3 - v[d.S].length)), (d.Z !== void 0 || d.ZZ !== void 0) && (m = d.Z !== void 0 ? v[d.Z].replace(":", "") : v[d.ZZ], o.timezoneOffset = (m[0] === "+" ? -1 : 1) * (60 * m.slice(1, 3) + Number(m.slice(3, 5))));
  }
  return o.dateHash = ct(o.year, 4) + "/" + ct(o.month) + "/" + ct(o.day), o.timeHash = ct(o.hour) + ":" + ct(o.minute) + ":" + ct(o.second) + m, o;
}
function uo(e) {
  const t = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  t.setDate(t.getDate() - (t.getDay() + 6) % 7 + 3);
  const a = new Date(t.getFullYear(), 0, 4);
  a.setDate(a.getDate() - (a.getDay() + 6) % 7 + 3);
  const n = t.getTimezoneOffset() - a.getTimezoneOffset();
  t.setHours(t.getHours() - n);
  const l = (t - a) / (uu * 7);
  return 1 + Math.floor(l);
}
function ba(e, t, a) {
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
function ll(e, t, a) {
  return (e.getTime() - e.getTimezoneOffset() * Eo - (t.getTime() - t.getTimezoneOffset() * Eo)) / a;
}
function fu(e, t, a = "days") {
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
      return ll(ba(n, "day"), ba(l, "day"), uu);
    case "hours":
    case "hour":
      return ll(ba(n, "hour"), ba(l, "hour"), Vf);
    case "minutes":
    case "minute":
      return ll(ba(n, "minute"), ba(l, "minute"), Eo);
    case "seconds":
    case "second":
      return ll(ba(n, "second"), ba(l, "second"), 1e3);
  }
}
function co(e) {
  return fu(e, ba(e, "year"), "days") + 1;
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
const sr = {
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
    return co(e);
  },
  DDDo(e) {
    return sn(co(e));
  },
  DDDD(e) {
    return ct(co(e), 3);
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
    return uo(e);
  },
  wo(e) {
    return sn(uo(e));
  },
  ww(e) {
    return ct(uo(e));
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
    return rr(n ?? e.getTimezoneOffset(), ":");
  },
  ZZ(e, t, a, n) {
    return rr(n ?? e.getTimezoneOffset());
  },
  X(e) {
    return Math.floor(e.getTime() / 1e3);
  },
  x(e) {
    return e.getTime();
  }
};
function vu(e, t, a, n, l) {
  if (e !== 0 && !e || e === 1 / 0 || e === -1 / 0) return;
  const o = new Date(e);
  if (isNaN(o)) return;
  t === void 0 && (t = du);
  const i = cu(a, Ba.props);
  return t.replace(zf, (r, u) => r in sr ? sr[r](o, i, n, l) : u === void 0 ? r : u.split("\\]").join("]"));
}
const ma = 20, Ff = [
  "Calendar",
  "Years",
  "Months"
], ur = (e) => Ff.includes(e), fo = (e) => /^-?[\d]+\/[0-1]\d$/.test(e), un = " — ";
function _a(e) {
  return e.year + "/" + ct(e.month);
}
var Ef = re({
  name: "QDate",
  props: {
    ...Ml,
    ...oa,
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
      ...Ml.mask,
      default: "YYYY/MM/DD"
    },
    defaultYearMonth: {
      type: String,
      validator: fo
    },
    yearsInMonthView: Boolean,
    events: [Array, Function],
    eventColor: [String, Function],
    emitImmediately: Boolean,
    options: [Array, Function],
    navigationMinYearMonth: {
      type: String,
      validator: fo
    },
    navigationMaxYearMonth: {
      type: String,
      validator: fo
    },
    noUnset: Boolean,
    firstDayOfWeek: [String, Number],
    todayBtn: Boolean,
    minimal: Boolean,
    defaultView: {
      type: String,
      default: "Calendar",
      validator: ur
    }
  },
  emits: [
    ...ru,
    "rangeStart",
    "rangeEnd",
    "navigation"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: n } = be(), { $q: l } = n, o = rt(e, l), { getCache: i } = Zn(), { tabindex: r, headerClass: u, getLocale: c, getCurrentDate: d } = su(e, l);
    let v;
    const m = za(Gn(e)), g = V(null), h = V(Qe()), p = V(c()), C = s(() => Qe()), k = s(() => c()), y = s(() => d()), b = V(te(h.value, p.value)), w = V(e.defaultView), x = s(() => l.lang.rtl === !0 ? "right" : "left"), L = V(x.value), M = V(x.value), K = b.value.year, X = V(K - K % ma - (K < 0 ? ma : 0)), A = V(null), $ = s(() => {
      const q = e.landscape === !0 ? "landscape" : "portrait";
      return `q-date q-date--${q} q-date--${q}-${e.minimal === !0 ? "minimal" : "standard"}` + (o.value === !0 ? " q-date--dark q-dark" : "") + (e.bordered === !0 ? " q-date--bordered" : "") + (e.square === !0 ? " q-date--square no-border-radius" : "") + (e.flat === !0 ? " q-date--flat no-shadow" : "") + (e.disable === !0 ? " disabled" : e.readonly === !0 ? " q-date--readonly" : "");
    }), D = s(() => e.color || "primary"), _ = s(() => e.textColor || "white"), S = s(() => e.emitImmediately === !0 && e.multiple !== !0 && e.range !== !0), T = s(() => Array.isArray(e.modelValue) === !0 ? e.modelValue : e.modelValue !== null && e.modelValue !== void 0 ? [e.modelValue] : []), H = s(() => T.value.filter((q) => typeof q == "string").map((q) => et(q, h.value, p.value)).filter((q) => q.dateHash !== null && q.day !== null && q.month !== null && q.year !== null)), E = s(() => {
      const q = (U) => et(U, h.value, p.value);
      return T.value.filter((U) => Nt(U) === !0 && U.from !== void 0 && U.to !== void 0).map((U) => ({
        from: q(U.from),
        to: q(U.to)
      })).filter((U) => U.from.dateHash !== null && U.to.dateHash !== null && U.from.dateHash < U.to.dateHash);
    }), Q = s(() => e.calendar !== "persian" ? (q) => new Date(q.year, q.month - 1, q.day) : (q) => {
      const U = ir(q.year, q.month, q.day);
      return new Date(U.gy, U.gm - 1, U.gd);
    }), j = s(() => e.calendar === "persian" ? ha : (q, U, ee) => vu(new Date(q.year, q.month - 1, q.day, q.hour, q.minute, q.second, q.millisecond), U === void 0 ? h.value : U, ee === void 0 ? p.value : ee, q.year, q.timezoneOffset)), N = s(() => H.value.length + E.value.reduce((q, U) => q + 1 + fu(Q.value(U.to), Q.value(U.from)), 0)), Z = s(() => {
      if (e.title !== void 0 && e.title !== null && e.title.length !== 0) return e.title;
      if (A.value !== null) {
        const ee = A.value.init, xe = Q.value(ee);
        return p.value.daysShort[xe.getDay()] + ", " + p.value.monthsShort[ee.month - 1] + " " + ee.day + un + "?";
      }
      if (N.value === 0) return un;
      if (N.value > 1) return `${N.value} ${p.value.pluralDay}`;
      const q = H.value[0], U = Q.value(q);
      return isNaN(U.valueOf()) === !0 ? un : p.value.headerTitle !== void 0 ? p.value.headerTitle(U, q) : p.value.daysShort[U.getDay()] + ", " + p.value.monthsShort[q.month - 1] + " " + q.day;
    }), B = s(() => H.value.concat(E.value.map((q) => q.from)).sort((q, U) => q.year - U.year || q.month - U.month)[0]), G = s(() => H.value.concat(E.value.map((q) => q.to)).sort((q, U) => U.year - q.year || U.month - q.month)[0]), z = s(() => {
      if (e.subtitle !== void 0 && e.subtitle !== null && e.subtitle.length !== 0) return e.subtitle;
      if (N.value === 0) return un;
      if (N.value > 1) {
        const q = B.value, U = G.value, ee = p.value.monthsShort;
        return ee[q.month - 1] + (q.year !== U.year ? " " + q.year + un + ee[U.month - 1] + " " : q.month !== U.month ? un + ee[U.month - 1] : "") + " " + U.year;
      }
      return H.value[0].year;
    }), ne = s(() => {
      const q = [l.iconSet.datetime.arrowLeft, l.iconSet.datetime.arrowRight];
      return l.lang.rtl === !0 ? q.reverse() : q;
    }), P = s(() => e.firstDayOfWeek !== void 0 ? Number(e.firstDayOfWeek) : p.value.firstDayOfWeek), I = s(() => {
      const q = p.value.daysShort, U = P.value;
      return U > 0 ? q.slice(U, 7).concat(q.slice(0, U)) : q;
    }), de = s(() => {
      const q = b.value;
      return e.calendar !== "persian" ? new Date(q.year, q.month, 0).getDate() : bl(q.year, q.month);
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
    }), he = s(() => {
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
      return fe.value !== null && fe.value.year >= b.value.year && (q.year.prev = !1, fe.value.year === b.value.year && fe.value.month >= b.value.month && (q.month.prev = !1)), W.value !== null && W.value.year <= b.value.year && (q.year.next = !1, W.value.year === b.value.year && W.value.month <= b.value.month && (q.month.next = !1)), q;
    }), _e = s(() => {
      const q = {};
      return H.value.forEach((U) => {
        const ee = _a(U);
        q[ee] === void 0 && (q[ee] = []), q[ee].push(U.day);
      }), q;
    }), we = s(() => {
      const q = {};
      return E.value.forEach((U) => {
        const ee = _a(U.from), xe = _a(U.to);
        if (q[ee] === void 0 && (q[ee] = []), q[ee].push({
          from: U.from.day,
          to: ee === xe ? U.to.day : void 0,
          range: U
        }), ee < xe) {
          let $e;
          const { year: Ze, month: Ve } = U.from, Ue = Ve < 12 ? {
            year: Ze,
            month: Ve + 1
          } : {
            year: Ze + 1,
            month: 1
          };
          for (; ($e = _a(Ue)) <= xe; )
            q[$e] === void 0 && (q[$e] = []), q[$e].push({
              from: void 0,
              to: $e === xe ? U.to.day : void 0,
              range: U
            }), Ue.month++, Ue.month > 12 && (Ue.year++, Ue.month = 1);
        }
      }), q;
    }), Ie = s(() => {
      if (A.value === null) return;
      const { init: q, initHash: U, final: ee, finalHash: xe } = A.value, [$e, Ze] = U <= xe ? [q, ee] : [ee, q], Ve = _a($e), Ue = _a(Ze);
      if (Ve !== ke.value && Ue !== ke.value) return;
      const dt = {};
      return Ve === ke.value ? (dt.from = $e.day, dt.includeFrom = !0) : dt.from = 1, Ue === ke.value ? (dt.to = Ze.day, dt.includeTo = !0) : dt.to = de.value, dt;
    }), ke = s(() => _a(b.value)), Me = s(() => {
      const q = {};
      if (e.options === void 0) {
        for (let ee = 1; ee <= de.value; ee++) q[ee] = !0;
        return q;
      }
      const U = typeof e.options == "function" ? e.options : (ee) => e.options.includes(ee);
      for (let ee = 1; ee <= de.value; ee++) q[ee] = U(ke.value + "/" + ct(ee));
      return q;
    }), Le = s(() => {
      const q = {};
      if (e.events === void 0) for (let U = 1; U <= de.value; U++) q[U] = !1;
      else {
        const U = typeof e.events == "function" ? e.events : (ee) => e.events.includes(ee);
        for (let ee = 1; ee <= de.value; ee++) {
          const xe = ke.value + "/" + ct(ee);
          q[ee] = U(xe) === !0 && Y.value(xe);
        }
      }
      return q;
    }), ot = s(() => {
      let q, U;
      const { year: ee, month: xe } = b.value;
      if (e.calendar !== "persian")
        q = new Date(ee, xe - 1, 1), U = new Date(ee, xe - 1, 0).getDate();
      else {
        const $e = ir(ee, xe, 1);
        q = new Date($e.gy, $e.gm - 1, $e.gd);
        let Ze = xe - 1, Ve = ee;
        Ze === 0 && (Ze = 12, Ve--), U = bl(Ve, Ze);
      }
      return {
        days: q.getDay() - P.value - 1,
        endDay: U
      };
    }), We = s(() => {
      const q = [], { days: U, endDay: ee } = ot.value, xe = U < 0 ? U + 7 : U;
      if (xe < 6) for (let Ve = ee - xe; Ve <= ee; Ve++) q.push({
        i: Ve,
        fill: !0
      });
      const $e = q.length;
      for (let Ve = 1; Ve <= de.value; Ve++) {
        const Ue = {
          i: Ve,
          event: Le.value[Ve],
          classes: []
        };
        Me.value[Ve] === !0 && (Ue.in = !0, Ue.flat = !0), q.push(Ue);
      }
      if (_e.value[ke.value] !== void 0 && _e.value[ke.value].forEach((Ve) => {
        const Ue = $e + Ve - 1;
        Object.assign(q[Ue], {
          selected: !0,
          unelevated: !0,
          flat: !1,
          color: D.value,
          textColor: _.value
        });
      }), we.value[ke.value] !== void 0 && we.value[ke.value].forEach((Ve) => {
        if (Ve.from !== void 0) {
          const Ue = $e + Ve.from - 1, dt = $e + (Ve.to || de.value) - 1;
          for (let Gt = Ue; Gt <= dt; Gt++) Object.assign(q[Gt], {
            range: Ve.range,
            unelevated: !0,
            color: D.value,
            textColor: _.value
          });
          Object.assign(q[Ue], {
            rangeFrom: !0,
            flat: !1
          }), Ve.to !== void 0 && Object.assign(q[dt], {
            rangeTo: !0,
            flat: !1
          });
        } else if (Ve.to !== void 0) {
          const Ue = $e + Ve.to - 1;
          for (let dt = $e; dt <= Ue; dt++) Object.assign(q[dt], {
            range: Ve.range,
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
            range: Ve.range,
            unelevated: !0,
            color: D.value,
            textColor: _.value
          });
        }
      }), Ie.value !== void 0) {
        const Ve = $e + Ie.value.from - 1, Ue = $e + Ie.value.to - 1;
        for (let dt = Ve; dt <= Ue; dt++)
          q[dt].color = D.value, q[dt].editRange = !0;
        Ie.value.includeFrom === !0 && (q[Ve].editRangeFrom = !0), Ie.value.includeTo === !0 && (q[Ue].editRangeTo = !0);
      }
      b.value.year === y.value.year && b.value.month === y.value.month && (q[$e + y.value.day - 1].today = !0);
      const Ze = q.length % 7;
      if (Ze > 0) {
        const Ve = 7 - Ze;
        for (let Ue = 1; Ue <= Ve; Ue++) q.push({
          i: Ue,
          fill: !0
        });
      }
      return q.forEach((Ve) => {
        let Ue = "q-date__calendar-item ";
        Ve.fill === !0 ? Ue += "q-date__calendar-item--fill" : (Ue += `q-date__calendar-item--${Ve.in === !0 ? "in" : "out"}`, Ve.range !== void 0 && (Ue += ` q-date__range${Ve.rangeTo === !0 ? "-to" : Ve.rangeFrom === !0 ? "-from" : ""}`), Ve.editRange === !0 && (Ue += ` q-date__edit-range${Ve.editRangeFrom === !0 ? "-from" : ""}${Ve.editRangeTo === !0 ? "-to" : ""}`), (Ve.range !== void 0 || Ve.editRange === !0) && (Ue += ` text-${Ve.color}`)), Ve.classes = Ue;
      }), q;
    }), ue = s(() => e.disable === !0 ? { "aria-disabled": "true" } : {});
    se(() => e.modelValue, (q) => {
      if (v === JSON.stringify(q)) v = 0;
      else {
        const U = te(h.value, p.value);
        ut(U.year, U.month, U);
      }
    }), se(w, () => {
      g.value !== null && n.$el.contains(document.activeElement) === !0 && g.value.focus();
    }), se(() => b.value.year + "|" + b.value.month, () => {
      a("navigation", {
        year: b.value.year,
        month: b.value.month
      });
    }), se(C, (q) => {
      J(q, p.value, "mask"), h.value = q;
    }), se(k, (q) => {
      J(h.value, q, "locale"), p.value = q;
    });
    function le(q) {
      v = JSON.stringify(q);
    }
    function ve() {
      const { year: q, month: U, day: ee } = y.value, xe = {
        ...b.value,
        year: q,
        month: U,
        day: ee
      }, $e = _e.value[_a(xe)];
      ($e === void 0 || $e.includes(xe.day) === !1) && va(xe), Ke(xe.year, xe.month);
    }
    function Pe(q) {
      ur(q) === !0 && (w.value = q);
    }
    function Ge(q, U) {
      ["month", "year"].includes(q) && (q === "month" ? ze : ae)(U === !0 ? -1 : 1);
    }
    function Ke(q, U) {
      w.value = "Calendar", ut(q, U);
    }
    function je(q, U) {
      if (e.range === !1 || !q) {
        A.value = null;
        return;
      }
      const ee = Object.assign({ ...b.value }, q), xe = U !== void 0 ? Object.assign({ ...b.value }, U) : ee;
      A.value = {
        init: ee,
        initHash: ha(ee),
        final: xe,
        finalHash: ha(xe)
      }, Ke(ee.year, ee.month);
    }
    function Qe() {
      return e.calendar === "persian" ? "YYYY/MM/DD" : e.mask;
    }
    function et(q, U, ee) {
      return zn(q, U, ee, e.calendar, {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
    }
    function te(q, U) {
      const ee = Array.isArray(e.modelValue) === !0 ? e.modelValue : e.modelValue ? [e.modelValue] : [];
      if (ee.length === 0) return ce();
      const xe = ee[ee.length - 1], $e = et(xe.from !== void 0 ? xe.from : xe, q, U);
      return $e.dateHash === null ? ce() : $e;
    }
    function ce() {
      let q, U;
      if (e.defaultYearMonth !== void 0) {
        const ee = e.defaultYearMonth.split("/");
        q = parseInt(ee[0], 10), U = parseInt(ee[1], 10);
      } else {
        const ee = y.value !== void 0 ? y.value : d();
        q = ee.year, U = ee.month;
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
    function ze(q) {
      let U = b.value.year, ee = Number(b.value.month) + q;
      ee === 13 ? (ee = 1, U++) : ee === 0 && (ee = 12, U--), ut(U, ee), S.value === !0 && kt("month");
    }
    function ae(q) {
      ut(Number(b.value.year) + q, b.value.month), S.value === !0 && kt("year");
    }
    function ye(q) {
      ut(q, b.value.month), w.value = e.defaultView === "Years" ? "Months" : "Calendar", S.value === !0 && kt("year");
    }
    function Fe(q) {
      ut(b.value.year, q), w.value = "Calendar", S.value === !0 && kt("month");
    }
    function Te(q, U) {
      var ee;
      (((ee = _e.value[U]) == null ? void 0 : ee.includes(q.day)) === !0 ? da : va)(q);
    }
    function Oe(q) {
      return {
        year: q.year,
        month: q.month,
        day: q.day
      };
    }
    function ut(q, U, ee) {
      if (fe.value !== null && q <= fe.value.year && ((U < fe.value.month || q < fe.value.year) && (U = fe.value.month), q = fe.value.year), W.value !== null && q >= W.value.year && ((U > W.value.month || q > W.value.year) && (U = W.value.month), q = W.value.year), ee !== void 0) {
        const { hour: $e, minute: Ze, second: Ve, millisecond: Ue, timezoneOffset: dt, timeHash: Gt } = ee;
        Object.assign(b.value, {
          hour: $e,
          minute: Ze,
          second: Ve,
          millisecond: Ue,
          timezoneOffset: dt,
          timeHash: Gt
        });
      }
      const xe = q + "/" + ct(U) + "/01";
      xe !== b.value.dateHash && (L.value = b.value.dateHash < xe == (l.lang.rtl !== !0) ? "left" : "right", q !== b.value.year && (M.value = L.value), nt(() => {
        X.value = q - q % ma - (q < 0 ? ma : 0), Object.assign(b.value, {
          year: q,
          month: U,
          day: 1,
          dateHash: xe
        });
      }));
    }
    function Ft(q, U, ee) {
      const xe = q !== null && q.length === 1 && e.multiple === !1 ? q[0] : q, { reason: $e, details: Ze } = Xt(U, ee);
      le(xe), a("update:modelValue", xe, $e, Ze);
    }
    function kt(q) {
      const U = H.value[0] !== void 0 && H.value[0].dateHash !== null ? { ...H.value[0] } : { ...b.value };
      nt(() => {
        U.year = b.value.year, U.month = b.value.month;
        const ee = e.calendar !== "persian" ? new Date(U.year, U.month, 0).getDate() : bl(U.year, U.month);
        U.day = Math.min(Math.max(1, U.day), ee);
        const xe = Wt(U), { details: $e } = Xt("", U);
        le(xe), a("update:modelValue", xe, q, $e);
      });
    }
    function Xt(q, U) {
      return U.from !== void 0 ? {
        reason: `${q}-range`,
        details: {
          ...Oe(U.target),
          from: Oe(U.from),
          to: Oe(U.to)
        }
      } : {
        reason: `${q}-day`,
        details: Oe(U)
      };
    }
    function Wt(q, U, ee) {
      return q.from !== void 0 ? {
        from: j.value(q.from, U, ee),
        to: j.value(q.to, U, ee)
      } : j.value(q, U, ee);
    }
    function va(q) {
      let U;
      if (e.multiple === !0) if (q.from !== void 0) {
        const ee = ha(q.from), xe = ha(q.to), $e = H.value.filter((Ve) => Ve.dateHash < ee || Ve.dateHash > xe), Ze = E.value.filter(({ from: Ve, to: Ue }) => Ue.dateHash < ee || Ve.dateHash > xe);
        U = $e.concat(Ze).concat(q).map((Ve) => Wt(Ve));
      } else {
        const ee = T.value.slice();
        ee.push(Wt(q)), U = ee;
      }
      else U = Wt(q);
      Ft(U, "add", q);
    }
    function da(q) {
      if (e.noUnset === !0) return;
      let U = null;
      if (e.multiple === !0 && Array.isArray(e.modelValue) === !0) {
        const ee = Wt(q);
        q.from !== void 0 ? U = e.modelValue.filter((xe) => xe.from !== void 0 ? xe.from !== ee.from && xe.to !== ee.to : !0) : U = e.modelValue.filter((xe) => xe !== ee), U.length === 0 && (U = null);
      }
      Ft(U, "remove", q);
    }
    function J(q, U, ee) {
      const xe = H.value.concat(E.value).map((Ze) => Wt(Ze, q, U)).filter((Ze) => Ze.from !== void 0 ? Ze.from.dateHash !== null && Ze.to.dateHash !== null : Ze.dateHash !== null), $e = (e.multiple === !0 ? xe : xe[0]) || null;
      le($e), a("update:modelValue", $e, ee);
    }
    function Se() {
      if (e.minimal !== !0)
        return f("div", { class: "q-date__header " + u.value }, [f("div", { class: "relative-position" }, [f(Vt, { name: "q-transition--fade" }, () => f("div", {
          key: "h-yr-" + z.value,
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
        }, [z.value]))]), f("div", { class: "q-date__header-title relative-position flex no-wrap" }, [f("div", { class: "relative-position col" }, [f(Vt, { name: "q-transition--fade" }, () => f("div", {
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
          onClick: ve
        }) : null])]);
    }
    function Re({ label: q, type: U, key: ee, dir: xe, goTo: $e, boundaries: Ze, cls: Ve }) {
      return [
        f("div", { class: "row items-center q-date__arrow" }, [f(ft, {
          round: !0,
          dense: !0,
          size: "sm",
          flat: !0,
          icon: ne.value[0],
          "aria-label": U === "Years" ? l.lang.date.prevYear : l.lang.date.prevMonth,
          tabindex: r.value,
          disable: Ze.prev === !1,
          ...i("go-#" + U, { onClick() {
            $e(-1);
          } })
        })]),
        f("div", { class: "relative-position overflow-hidden flex flex-center" + Ve }, [f(Vt, { name: "q-transition--jump-" + xe }, () => f("div", { key: ee }, [f(ft, {
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
          icon: ne.value[1],
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
          label: p.value.months[b.value.month - 1],
          type: "Months",
          key: b.value.month,
          dir: L.value,
          goTo: ze,
          boundaries: he.value.month,
          cls: " col"
        }).concat(Re({
          label: b.value.year,
          type: "Years",
          key: b.value.year,
          dir: M.value,
          goTo: ae,
          boundaries: he.value.year,
          cls: ""
        }))),
        f("div", { class: "q-date__calendar-weekdays row items-center no-wrap" }, I.value.map((q) => f("div", { class: "q-date__calendar-item" }, [f("div", q)]))),
        f("div", { class: "q-date__calendar-days-container relative-position overflow-hidden" }, [f(Vt, { name: "q-transition--slide-" + L.value }, () => f("div", {
          key: ke.value,
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
        const q = b.value.year === y.value.year, U = (xe) => fe.value !== null && b.value.year === fe.value.year && fe.value.month > xe || W.value !== null && b.value.year === W.value.year && W.value.month < xe, ee = p.value.monthsShort.map((xe, $e) => {
          const Ze = b.value.month === $e + 1;
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
        return e.yearsInMonthView === !0 && ee.unshift(f("div", { class: "row no-wrap full-width" }, [Re({
          label: b.value.year,
          type: "Years",
          key: b.value.year,
          dir: M.value,
          goTo: ae,
          boundaries: he.value.year,
          cls: " col"
        })])), f("div", {
          key: "months-view",
          class: "q-date__view q-date__months flex flex-center"
        }, ee);
      },
      Years() {
        const q = X.value, U = q + ma, ee = [], xe = ($e) => fe.value !== null && fe.value.year > $e || W.value !== null && W.value.year < $e;
        for (let $e = q; $e <= U; $e++) {
          const Ze = b.value.year === $e;
          ee.push(f("div", { class: "q-date__years-item flex flex-center" }, [f(ft, {
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
              ye($e);
            } })
          })]));
        }
        return f("div", { class: "q-date__view q-date__years flex flex-center" }, [
          f("div", { class: "col-auto" }, [f(ft, {
            round: !0,
            dense: !0,
            flat: !0,
            icon: ne.value[0],
            "aria-label": l.lang.date.prevRangeYears(ma),
            tabindex: r.value,
            disable: xe(q),
            ...i("y-", { onClick: () => {
              X.value -= ma;
            } })
          })]),
          f("div", { class: "q-date__years-content col self-stretch row items-center" }, ee),
          f("div", { class: "col-auto" }, [f(ft, {
            round: !0,
            dense: !0,
            flat: !0,
            icon: ne.value[1],
            "aria-label": l.lang.date.nextRangeYears(ma),
            tabindex: r.value,
            disable: xe(U),
            ...i("y+", { onClick: () => {
              X.value += ma;
            } })
          })])
        ]);
      }
    };
    function Xe(q) {
      const U = {
        ...b.value,
        day: q
      };
      if (e.range === !1) {
        Te(U, ke.value);
        return;
      }
      if (A.value === null) {
        const ee = We.value.find(($e) => $e.fill !== !0 && $e.i === q);
        if (e.noUnset !== !0 && ee.range !== void 0) {
          da({
            target: U,
            from: ee.range.from,
            to: ee.range.to
          });
          return;
        }
        if (ee.selected === !0) {
          da(U);
          return;
        }
        const xe = ha(U);
        A.value = {
          init: U,
          initHash: xe,
          final: U,
          finalHash: xe
        }, a("rangeStart", Oe(U));
      } else {
        const ee = A.value.initHash, xe = ha(U), $e = ee <= xe ? {
          from: A.value.init,
          to: U
        } : {
          from: U,
          to: A.value.init
        };
        A.value = null, va(ee === xe ? U : {
          target: U,
          ...$e
        }), a("rangeEnd", {
          from: Oe($e.from),
          to: Oe($e.to)
        });
      }
    }
    function pt(q) {
      if (A.value !== null) {
        const U = {
          ...b.value,
          day: q
        };
        Object.assign(A.value, {
          final: U,
          finalHash: ha(U)
        });
      }
    }
    return Object.assign(n, {
      setToday: ve,
      setView: Pe,
      offsetCalendar: Ge,
      setCalendarTo: Ke,
      setEditingRange: je
    }), () => {
      const q = [f("div", { class: "q-date__content col relative-position" }, [f(Vt, { name: "q-transition--fade" }, Ne[w.value])])], U = De(t.default);
      return U !== void 0 && q.push(f("div", { class: "q-date__actions" }, U)), e.name !== void 0 && e.disable !== !0 && m(q, "push"), f("div", {
        class: $.value,
        ...ue.value
      }, [Se(), f("div", {
        ref: g,
        class: "q-date__main col column",
        tabindex: -1
      }, q)]);
    };
  }
});
function mu(e, t, a) {
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
let Dn = 0, vo, mo, Pn, go = !1, dr, cr, fr, Pa = null;
function If(e) {
  Of(e) && Ye(e);
}
function Of(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) return !0;
  const t = lc(e), a = e.shiftKey && !e.deltaX, n = !a && Math.abs(e.deltaX) <= Math.abs(e.deltaY), l = a || n ? e.deltaY : e.deltaX;
  for (let o = 0; o < t.length; o++) {
    const i = t[o];
    if (Nc(i, n)) return n ? l < 0 && i.scrollTop === 0 ? !0 : l > 0 && i.scrollTop + i.clientHeight === i.scrollHeight : l < 0 && i.scrollLeft === 0 ? !0 : l > 0 && i.scrollLeft + i.clientWidth === i.scrollWidth;
  }
  return !0;
}
function vr(e) {
  e.target === document && (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop);
}
function ol(e) {
  go !== !0 && (go = !0, requestAnimationFrame(() => {
    go = !1;
    const { height: t } = e.target, { clientHeight: a, scrollTop: n } = document.scrollingElement;
    (Pn === void 0 || t !== window.innerHeight) && (Pn = a - t, document.scrollingElement.scrollTop = n), n > Pn && (document.scrollingElement.scrollTop -= Math.ceil((n - Pn) / 8));
  }));
}
function mr(e) {
  const t = document.body, a = window.visualViewport !== void 0;
  if (e === "add") {
    const { overflowY: n, overflowX: l } = window.getComputedStyle(t);
    vo = Il(window), mo = Aa(window), dr = t.style.left, cr = t.style.top, fr = window.location.href, t.style.left = `-${vo}px`, t.style.top = `-${mo}px`, l !== "hidden" && (l === "scroll" || t.scrollWidth > window.innerWidth) && t.classList.add("q-body--force-scrollbar-x"), n !== "hidden" && (n === "scroll" || t.scrollHeight > window.innerHeight) && t.classList.add("q-body--force-scrollbar-y"), t.classList.add("q-body--prevent-scroll"), document.qScrollPrevented = !0, Je.is.ios === !0 && (a === !0 ? (window.scrollTo(0, 0), window.visualViewport.addEventListener("resize", ol, gt.passiveCapture), window.visualViewport.addEventListener("scroll", ol, gt.passiveCapture), window.scrollTo(0, 0)) : window.addEventListener("scroll", vr, gt.passiveCapture));
  }
  Je.is.desktop === !0 && Je.is.mac === !0 && window[`${e}EventListener`]("wheel", If, gt.notPassive), e === "remove" && (Je.is.ios === !0 && (a === !0 ? (window.visualViewport.removeEventListener("resize", ol, gt.passiveCapture), window.visualViewport.removeEventListener("scroll", ol, gt.passiveCapture)) : window.removeEventListener("scroll", vr, gt.passiveCapture)), t.classList.remove("q-body--prevent-scroll"), t.classList.remove("q-body--force-scrollbar-x"), t.classList.remove("q-body--force-scrollbar-y"), document.qScrollPrevented = !1, t.style.left = dr, t.style.top = cr, window.location.href === fr && window.scrollTo(vo, mo), Pn = void 0);
}
function Io(e) {
  let t = "add";
  if (e === !0) {
    if (Dn++, Pa !== null) {
      clearTimeout(Pa), Pa = null;
      return;
    }
    if (Dn > 1) return;
  } else {
    if (Dn === 0 || (Dn--, Dn > 0)) return;
    if (t = "remove", Je.is.ios === !0 && Je.is.nativeMobile === !0) {
      Pa !== null && clearTimeout(Pa), Pa = setTimeout(() => {
        mr(t), Pa = null;
      }, 100);
      return;
    }
  }
  mr(t);
}
function gu() {
  let e;
  return { preventBodyScroll(t) {
    t !== e && (e !== void 0 || t === !0) && (e = t, Io(t));
  } };
}
let il = 0;
const Hf = {
  standard: "fixed-full flex-center",
  top: "fixed-top justify-center",
  bottom: "fixed-bottom justify-center",
  right: "fixed-right items-center",
  left: "fixed-left items-center"
}, gr = {
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
    ...$n,
    ...Qa,
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
    ...qn,
    "shake",
    "click",
    "escapeKey"
  ],
  setup(e, { slots: t, emit: a, attrs: n }) {
    const l = be(), o = V(null), i = V(!1), r = V(!1);
    let u = null, c = null, d, v;
    const m = s(() => e.persistent !== !0 && e.noRouteDismiss !== !0 && e.seamless !== !0), { preventBodyScroll: g } = gu(), { registerTimeout: h } = ka(), { registerTick: p, removeTick: C } = pn(), { transitionProps: k, transitionStyle: y } = El(e, () => gr[e.position][0], () => gr[e.position][1]), b = s(() => y.value + (e.backdropFilter !== void 0 ? `;backdrop-filter:${e.backdropFilter};-webkit-backdrop-filter:${e.backdropFilter}` : "")), { showPortal: w, hidePortal: x, portalIsAccessible: L, renderPortal: M } = oi(l, o, G, "dialog"), { hide: K } = Bn({
      showing: i,
      hideOnRouteChange: m,
      handleShow: _,
      handleHide: S,
      processOnMount: !0
    });
    mu(i);
    const X = s(() => `q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized === !0 ? "maximized" : "minimized"} q-dialog__inner--${e.position} ${Hf[e.position]}` + (r.value === !0 ? " q-dialog__inner--animating" : "") + (e.fullWidth === !0 ? " q-dialog__inner--fullwidth" : "") + (e.fullHeight === !0 ? " q-dialog__inner--fullheight" : "") + (e.square === !0 ? " q-dialog__inner--square" : "")), A = s(() => i.value === !0 && e.seamless !== !0), $ = s(() => e.autoClose === !0 ? { onClick: N } : {}), D = s(() => [`q-dialog fullscreen no-pointer-events q-dialog--${A.value === !0 ? "modal" : "seamless"}`, n.class]);
    se(() => e.maximized, (z) => {
      i.value === !0 && j(z);
    }), se(A, (z) => {
      g(z), z === !0 ? (Rs(B), zs(E)) : (Po(B), Sl(E));
    });
    function _(z) {
      var ne;
      c = e.noRefocus === !1 && document.activeElement !== null ? document.activeElement : null, j(e.maximized), w(), r.value = !0, e.noFocus !== !0 ? ((ne = document.activeElement) == null || ne.blur(), p(T)) : C(), h(() => {
        if (l.proxy.$q.platform.is.ios === !0) {
          if (e.seamless !== !0 && document.activeElement) {
            const { top: P, bottom: I } = document.activeElement.getBoundingClientRect(), { innerHeight: de } = window, Y = window.visualViewport !== void 0 ? window.visualViewport.height : de;
            P > 0 && I > Y / 2 && (document.scrollingElement.scrollTop = Math.min(document.scrollingElement.scrollHeight - Y, I >= de ? 1 / 0 : Math.ceil(document.scrollingElement.scrollTop + I - Y / 2))), document.activeElement.scrollIntoView();
          }
          v = !0, o.value.click(), v = !1;
        }
        w(!0), r.value = !1, a("show", z);
      }, e.transitionDuration);
    }
    function S(z) {
      C(), Q(!0), r.value = !0, x(), c !== null && ((((z == null ? void 0 : z.type.indexOf("key")) === 0 ? c.closest('[tabindex]:not([tabindex^="-"])') : void 0) || c).focus(), c = null), h(() => {
        x(!0), r.value = !1, a("hide", z);
      }, e.transitionDuration);
    }
    function T(z) {
      Tn(() => {
        let ne = o.value;
        if (ne !== null) {
          if (z !== void 0) {
            const P = ne.querySelector(z);
            if (P !== null) {
              P.focus({ preventScroll: !0 });
              return;
            }
          }
          ne.contains(document.activeElement) !== !0 && (ne = ne.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || ne.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || ne.querySelector("[autofocus], [data-autofocus]") || ne, ne.focus({ preventScroll: !0 }));
        }
      });
    }
    function H(z) {
      z && typeof z.focus == "function" ? z.focus({ preventScroll: !0 }) : T(), a("shake");
      const ne = o.value;
      ne !== null && (ne.classList.remove("q-animate--scale"), ne.classList.add("q-animate--scale"), u !== null && clearTimeout(u), u = setTimeout(() => {
        u = null, o.value !== null && (ne.classList.remove("q-animate--scale"), T());
      }, 170));
    }
    function E() {
      e.seamless !== !0 && (e.persistent === !0 || e.noEscDismiss === !0 ? e.maximized !== !0 && e.noShake !== !0 && H() : (a("escapeKey"), K()));
    }
    function Q(z) {
      u !== null && (clearTimeout(u), u = null), (z === !0 || i.value === !0) && (j(!1), e.seamless !== !0 && (g(!1), Po(B), Sl(E))), z !== !0 && (c = null);
    }
    function j(z) {
      z === !0 ? d !== !0 && (il < 1 && document.body.classList.add("q-body--dialog"), il++, d = !0) : d === !0 && (il < 2 && document.body.classList.remove("q-body--dialog"), il--, d = !1);
    }
    function N(z) {
      v !== !0 && (K(z), a("click", z));
    }
    function Z(z) {
      e.persistent !== !0 && e.noBackdropDismiss !== !0 ? K(z) : e.noShake !== !0 && H();
    }
    function B(z) {
      e.allowFocusOutside !== !0 && L.value === !0 && ks(o.value, z.target) !== !0 && T('[tabindex]:not([tabindex="-1"])');
    }
    Object.assign(l.proxy, {
      focus: T,
      shake: H,
      __updateRefocusTarget(z) {
        c = z || null;
      }
    }), tt(Q);
    function G() {
      return f("div", {
        role: "dialog",
        "aria-modal": A.value === !0 ? "true" : "false",
        ...n,
        class: D.value
      }, [f(Vt, {
        name: "q-transition--fade",
        appear: !0
      }, () => A.value === !0 ? f("div", {
        class: "q-dialog__backdrop fixed-full",
        style: b.value,
        "aria-hidden": "true",
        tabindex: -1,
        onClick: Z
      }) : null), f(Vt, k.value, () => i.value === !0 ? f("div", {
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
const hr = 150;
re({
  name: "QDrawer",
  inheritAttrs: !1,
  props: {
    ...$n,
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
    ...qn,
    "onLayout",
    "miniState"
  ],
  setup(e, { slots: t, emit: a, attrs: n }) {
    const l = be(), { proxy: { $q: o } } = l, i = rt(e, o), { preventBodyScroll: r } = gu(), { registerTimeout: u, removeTimeout: c } = ka(), d = Kt(an, vt);
    if (d === vt)
      return console.error("QDrawer needs to be child of QLayout"), vt;
    let v, m = null, g;
    const h = V(e.behavior === "mobile" || e.behavior !== "desktop" && d.totalWidth.value <= e.breakpoint), p = s(() => e.mini === !0 && h.value !== !0), C = s(() => p.value === !0 ? e.miniWidth : e.width), k = V(e.showIfAbove === !0 && h.value === !1 ? !0 : e.modelValue === !0), y = s(() => e.persistent !== !0 && (h.value === !0 || Q.value === !0));
    function b(ue, le) {
      if (ue !== !1 && d.animate(), W(0), h.value === !0) {
        const ve = d.instances[S.value];
        (ve == null ? void 0 : ve.belowBreakpoint) === !0 && ve.hide(!1), he(1), d.isContainer.value !== !0 && r(!0);
      } else
        he(0), ue !== !1 && _e(!1);
      u(() => {
        ue !== !1 && _e(!0), le !== !0 && a("show", ue);
      }, hr);
    }
    function w(ue, le) {
      ue !== !1 && d.animate(), he(0), W(X.value * C.value), Me(), le !== !0 ? u(() => {
        a("hide", ue);
      }, hr) : c();
    }
    const { show: x, hide: L } = Bn({
      showing: k,
      hideOnRouteChange: y,
      handleShow: b,
      handleHide: w
    });
    mu(k);
    const M = {
      belowBreakpoint: h,
      hide: L
    }, K = s(() => e.side === "right"), X = s(() => (o.lang.rtl === !0 ? -1 : 1) * (K.value === !0 ? 1 : -1)), A = V(0), $ = V(!1), D = V(!1), _ = V(C.value * X.value), S = s(() => K.value === !0 ? "left" : "right"), T = s(() => k.value === !0 && h.value === !1 && e.overlay === !1 ? e.miniToOverlay === !0 ? e.miniWidth : C.value : 0), H = s(() => e.overlay === !0 || e.miniToOverlay === !0 || d.view.value.indexOf(K.value ? "R" : "L") !== -1 || o.platform.is.ios === !0 && d.isContainer.value === !0), E = s(() => e.overlay === !1 && k.value === !0 && h.value === !1), Q = s(() => e.overlay === !0 && k.value === !0 && h.value === !1), j = s(() => "fullscreen q-drawer__backdrop" + (k.value === !1 && $.value === !1 ? " hidden" : "")), N = s(() => ({ backgroundColor: `rgba(0,0,0,${A.value * 0.4})` })), Z = s(() => K.value === !0 ? d.rows.value.top[2] === "r" : d.rows.value.top[0] === "l"), B = s(() => K.value === !0 ? d.rows.value.bottom[2] === "r" : d.rows.value.bottom[0] === "l"), G = s(() => {
      const ue = {};
      return d.header.space === !0 && Z.value === !1 && (H.value === !0 ? ue.top = `${d.header.offset}px` : d.header.space === !0 && (ue.top = `${d.header.size}px`)), d.footer.space === !0 && B.value === !1 && (H.value === !0 ? ue.bottom = `${d.footer.offset}px` : d.footer.space === !0 && (ue.bottom = `${d.footer.size}px`)), ue;
    }), z = s(() => {
      const ue = {
        width: `${C.value}px`,
        transform: `translateX(${_.value}px)`
      };
      return h.value === !0 ? ue : Object.assign(ue, G.value);
    }), ne = s(() => "q-drawer__content fit " + (d.isContainer.value !== !0 ? "scroll" : "overflow-auto")), P = s(() => `q-drawer q-drawer--${e.side}` + (D.value === !0 ? " q-drawer--mini-animate" : "") + (e.bordered === !0 ? " q-drawer--bordered" : "") + (i.value === !0 ? " q-drawer--dark q-dark" : "") + ($.value === !0 ? " no-transition" : k.value === !0 ? "" : " q-layout--prevent-focus") + (h.value === !0 ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${p.value === !0 ? "mini" : "standard"}` + (H.value === !0 || E.value !== !0 ? " fixed" : "") + (e.overlay === !0 || e.miniToOverlay === !0 ? " q-drawer--on-top" : "") + (Z.value === !0 ? " q-drawer--top-padding" : ""))), I = s(() => [[
      Jt,
      Ie,
      void 0,
      {
        [o.lang.rtl === !0 ? e.side : S.value]: !0,
        mouse: !0
      }
    ]]), de = s(() => [[
      Jt,
      ke,
      void 0,
      {
        [o.lang.rtl === !0 ? S.value : e.side]: !0,
        mouse: !0
      }
    ]]), Y = s(() => [[
      Jt,
      ke,
      void 0,
      {
        [o.lang.rtl === !0 ? S.value : e.side]: !0,
        mouse: !0,
        mouseAllDir: !0
      }
    ]]);
    function fe() {
      ot(h, e.behavior === "mobile" || e.behavior !== "desktop" && d.totalWidth.value <= e.breakpoint);
    }
    se(h, (ue) => {
      ue === !0 ? (v = k.value, k.value === !0 && L(!1)) : e.overlay === !1 && e.behavior !== "mobile" && v !== !1 && (k.value === !0 ? (W(0), he(0), Me()) : x(!1));
    }), se(() => e.side, (ue, le) => {
      d.instances[le] === M && (d.instances[le] = void 0, d[le].space = !1, d[le].offset = 0), d.instances[ue] = M, d[ue].size = C.value, d[ue].space = E.value, d[ue].offset = T.value;
    }), se(d.totalWidth, () => {
      (d.isContainer.value === !0 || document.qScrollPrevented !== !0) && fe();
    }), se(() => e.behavior + e.breakpoint, fe), se(d.isContainer, (ue) => {
      k.value === !0 && r(ue !== !0), ue === !0 && fe();
    }), se(d.scrollbarWidth, () => {
      W(k.value === !0 ? 0 : void 0);
    }), se(T, (ue) => {
      Le("offset", ue);
    }), se(E, (ue) => {
      a("onLayout", ue), Le("space", ue);
    }), se(K, () => {
      W();
    }), se(C, (ue) => {
      W(), We(e.miniToOverlay, ue);
    }), se(() => e.miniToOverlay, (ue) => {
      We(ue, C.value);
    }), se(() => o.lang.rtl, () => {
      W();
    }), se(() => e.mini, () => {
      e.noMiniAnimation || e.modelValue === !0 && (we(), d.animate());
    }), se(p, (ue) => {
      a("miniState", ue);
    });
    function W(ue) {
      ue === void 0 ? nt(() => {
        ue = k.value === !0 ? 0 : C.value, W(X.value * ue);
      }) : (d.isContainer.value === !0 && K.value === !0 && (h.value === !0 || Math.abs(ue) === C.value) && (ue += X.value * d.scrollbarWidth.value), _.value = ue);
    }
    function he(ue) {
      A.value = ue;
    }
    function _e(ue) {
      const le = ue === !0 ? "remove" : d.isContainer.value !== !0 ? "add" : "";
      le !== "" && document.body.classList[le]("q-body--drawer-toggle");
    }
    function we() {
      m !== null && clearTimeout(m), l.proxy && l.proxy.$el && l.proxy.$el.classList.add("q-drawer--mini-animate"), D.value = !0, m = setTimeout(() => {
        var ue, le;
        m = null, D.value = !1, (le = (ue = l == null ? void 0 : l.proxy) == null ? void 0 : ue.$el) == null || le.classList.remove("q-drawer--mini-animate");
      }, 150);
    }
    function Ie(ue) {
      if (k.value !== !1) return;
      const le = C.value, ve = mt(ue.distance.x, 0, le);
      if (ue.isFinal === !0) {
        ve >= Math.min(75, le) ? x() : (d.animate(), he(0), W(X.value * le)), $.value = !1;
        return;
      }
      W((o.lang.rtl === !0 ? K.value !== !0 : K.value) ? Math.max(le - ve, 0) : Math.min(0, ve - le)), he(mt(ve / le, 0, 1)), ue.isFirst === !0 && ($.value = !0);
    }
    function ke(ue) {
      if (k.value !== !0) return;
      const le = C.value, ve = ue.direction === e.side, Pe = (o.lang.rtl === !0 ? ve !== !0 : ve) ? mt(ue.distance.x, 0, le) : 0;
      if (ue.isFinal === !0) {
        Math.abs(Pe) < Math.min(75, le) ? (d.animate(), he(1), W(0)) : L(), $.value = !1;
        return;
      }
      W(X.value * Pe), he(mt(1 - Pe / le, 0, 1)), ue.isFirst === !0 && ($.value = !0);
    }
    function Me() {
      r(!1), _e(!0);
    }
    function Le(ue, le) {
      d.update(e.side, ue, le);
    }
    function ot(ue, le) {
      ue.value !== le && (ue.value = le);
    }
    function We(ue, le) {
      Le("size", ue === !0 ? e.miniWidth : le);
    }
    return d.instances[e.side] = M, We(e.miniToOverlay, C.value), Le("space", E.value), Le("offset", T.value), e.showIfAbove === !0 && e.modelValue !== !0 && k.value === !0 && e["onUpdate:modelValue"] !== void 0 && a("update:modelValue", !0), ht(() => {
      a("onLayout", E.value), a("miniState", p.value), v = e.showIfAbove === !0;
      const ue = () => {
        (k.value === !0 ? b : w)(!1, !0);
      };
      if (d.totalWidth.value !== 0) {
        nt(ue);
        return;
      }
      g = se(d.totalWidth, () => {
        g(), g = void 0, k.value === !1 && e.showIfAbove === !0 && h.value === !1 ? x(!1) : ue();
      });
    }), tt(() => {
      g == null || g(), m !== null && (clearTimeout(m), m = null), k.value === !0 && Me(), d.instances[e.side] === M && (d.instances[e.side] = void 0, Le("size", 0), Le("offset", 0), Le("space", !1));
    }), () => {
      const ue = [];
      h.value === !0 && (e.noSwipeOpen === !1 && ue.push(ea(f("div", {
        key: "open",
        class: `q-drawer__opener fixed-${e.side}`,
        "aria-hidden": "true"
      }), I.value)), ue.push(na("div", {
        ref: "backdrop",
        class: j.value,
        style: N.value,
        "aria-hidden": "true",
        onClick: L
      }, void 0, "backdrop", e.noSwipeBackdrop !== !0 && k.value === !0, () => Y.value)));
      const le = p.value === !0 && t.mini !== void 0, ve = [f("div", {
        ...n,
        key: String(le),
        class: [ne.value, n.class]
      }, le === !0 ? t.mini() : De(t.default))];
      return e.elevated === !0 && k.value === !0 && ve.push(f("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), ue.push(na("aside", {
        ref: "content",
        class: P.value,
        style: z.value
      }, ve, "contentclose", e.noSwipeClose !== !0 && h.value === !0, () => de.value)), f("div", { class: "q-drawer-container" }, ue);
    };
  }
});
function hu(e, t) {
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
  return n === "block" || n === "table" ? e : hu(e.parentNode);
}
function ho(e, t, a) {
  return !e || e === document.body ? !1 : a === !0 && e === t || (t === document ? document.body : t).contains(e.parentNode);
}
function bu(e, t, a) {
  if (a || (a = document.createRange(), a.selectNode(e), a.setStart(e, 0)), t.count === 0) a.setEnd(e, t.count);
  else if (t.count > 0) if (e.nodeType === Node.TEXT_NODE) e.textContent.length < t.count ? t.count -= e.textContent.length : (a.setEnd(e, t.count), t.count = 0);
  else for (let n = 0; t.count !== 0 && n < e.childNodes.length; n++) a = bu(e.childNodes[n], t, a);
  return a;
}
const Nf = /^https?:\/\//;
var jf = class {
  constructor(e, t) {
    this.el = e, this.eVm = t, this._range = null;
  }
  get selection() {
    if (this.el) {
      const e = document.getSelection();
      if (ho(e.anchorNode, this.el, !0) && ho(e.focusNode, this.el, !0)) return e;
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
    return e !== null ? hu(e, this.el) : null;
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
    if (a.focusNode && ho(a.focusNode, n))
      for (t = a.focusNode, e = a.focusOffset; t && t !== n; ) t !== this.el && t.previousSibling ? (t = t.previousSibling, e += t.textContent.length) : t = t.parentNode;
    this.savedPos = e;
  }
  restorePosition(e = 0) {
    if (this.savedPos > 0 && this.savedPos < e) {
      const t = window.getSelection(), a = bu(this.el, { count: this.savedPos });
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
        this.eVm.editLinkUrl.value = Nf.test(o) ? o : "https://", this.save(l.getRangeAt(0)), document.execCommand("createLink", !1, this.eVm.editLinkUrl.value);
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
}, Qf = re({
  name: "QTooltip",
  inheritAttrs: !1,
  props: {
    ...$s,
    ...$n,
    ...Qa,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    transitionShow: {
      ...Qa.transitionShow,
      default: "jump-down"
    },
    transitionHide: {
      ...Qa.transitionHide,
      default: "jump-up"
    },
    anchor: {
      type: String,
      default: "bottom middle",
      validator: $l
    },
    self: {
      type: String,
      default: "top middle",
      validator: $l
    },
    offset: {
      type: Array,
      default: () => [14, 14],
      validator: Es
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
  emits: [...qn],
  setup(e, { slots: t, emit: a, attrs: n }) {
    let l, o;
    const i = be(), { proxy: { $q: r } } = i, u = V(null), c = V(!1), d = s(() => ql(e.anchor, r.lang.rtl)), v = s(() => ql(e.self, r.lang.rtl)), m = s(() => e.persistent !== !0), { registerTick: g, removeTick: h } = pn(), { registerTimeout: p } = ka(), { transitionProps: C, transitionStyle: k } = El(e), { localScrollTarget: y, changeScrollEvent: b, unconfigureScrollTarget: w } = Bs(e, N), { anchorEl: x, canShow: L, anchorEvents: M } = ni({
      showing: c,
      configureAnchorEl: j
    }), { show: K, hide: X } = Bn({
      showing: c,
      canShow: L,
      handleShow: _,
      handleHide: S,
      hideOnRouteChange: m,
      processOnMount: !0
    });
    Object.assign(M, {
      delayShow: E,
      delayHide: Q
    });
    const { showPortal: A, hidePortal: $, renderPortal: D } = oi(i, u, B, "tooltip");
    if (r.platform.is.mobile === !0) {
      const G = {
        anchorEl: x,
        innerRef: u,
        onClickOutside(z) {
          return X(z), z.target.classList.contains("q-dialog__backdrop") && Ye(z), !0;
        }
      };
      se(s(() => e.modelValue === null && e.persistent !== !0 && c.value === !0), (z) => {
        (z === !0 ? Fs : _l)(G);
      }), tt(() => {
        _l(G);
      });
    }
    function _(G) {
      A(), g(() => {
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
      h(), $(), T(), p(() => {
        $(!0), a("hide", G);
      }, e.transitionDuration);
    }
    function T() {
      o !== void 0 && (o.disconnect(), o = void 0), l !== void 0 && (l(), l = void 0), w(), jt(M, "tooltipTemp");
    }
    function H() {
      ii({
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
        sa(), document.body.classList.add("non-selectable");
        const z = x.value;
        _t(M, "tooltipTemp", [
          "touchmove",
          "touchcancel",
          "touchend",
          "click"
        ].map((ne) => [
          z,
          ne,
          "delayHide",
          "passiveCapture"
        ]));
      }
      p(() => {
        K(G);
      }, e.delay);
    }
    function Q(G) {
      r.platform.is.mobile === !0 && (jt(M, "tooltipTemp"), sa(), setTimeout(() => {
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
        y.value = fa(x.value, e.scrollTarget);
        const G = e.noParentEvent === !0 ? H : X;
        b(y.value, G);
      }
    }
    function Z() {
      return c.value === !0 ? f("div", {
        ...n,
        ref: u,
        class: ["q-tooltip q-tooltip--style q-position-engine no-pointer-events", n.class],
        style: [n.style, k.value],
        role: "tooltip"
      }, De(t.default)) : null;
    }
    function B() {
      return f(Vt, C.value, Z);
    }
    return tt(T), Object.assign(i.proxy, { updatePosition: H }), D;
  }
}), jl = re({
  name: "QItem",
  props: {
    ...it,
    ...Xn,
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
    const { proxy: { $q: n } } = be(), l = rt(e, n), { hasLink: o, linkAttrs: i, linkClass: r, linkTag: u, navigateOnClick: c } = Rl(), d = V(null), v = V(null), m = s(() => e.clickable === !0 || o.value === !0 || e.tag === "label"), g = s(() => e.disable !== !0 && m.value === !0), h = s(() => "q-item q-item-type row no-wrap" + (e.dense === !0 ? " q-item--dense" : "") + (l.value === !0 ? " q-item--dark" : "") + (o.value === !0 && e.active === null ? r.value : e.active === !0 ? ` q-item--active${e.activeClass !== void 0 ? ` ${e.activeClass}` : ""}` : "") + (e.disable === !0 ? " disabled" : "") + (g.value === !0 ? " q-item--clickable q-link cursor-pointer " + (e.manualFocus === !0 ? "q-manual-focusable" : "q-focusable q-hoverable") + (e.focused === !0 ? " q-manual-focusable--focused" : "") : "")), p = s(() => e.insetLevel === void 0 ? null : { ["padding" + (n.lang.rtl === !0 ? "Right" : "Left")]: 16 + e.insetLevel * 56 + "px" });
    function C(b) {
      g.value === !0 && (v.value !== null && b.qAvoidFocus !== !0 && (b.qKeyEvent !== !0 && document.activeElement === d.value ? v.value.focus() : document.activeElement === v.value && d.value.focus()), c(b));
    }
    function k(b) {
      if (g.value === !0 && aa(b, [13, 32]) === !0) {
        Ye(b), b.qKeyEvent = !0;
        const w = new MouseEvent("click", b);
        w.qKeyEvent = !0, d.value.dispatchEvent(w);
      }
      a("keyup", b);
    }
    function y() {
      const b = Yn(t.default, []);
      return g.value === !0 && b.unshift(f("div", {
        class: "q-focus-helper",
        tabindex: -1,
        ref: v
      })), b;
    }
    return () => {
      const b = {
        ref: d,
        class: h.value,
        style: p.value,
        role: "listitem",
        onClick: C,
        onKeyup: k
      };
      return g.value === !0 ? (b.tabindex = e.tabindex || "0", Object.assign(b, i.value)) : m.value === !0 && (b["aria-disabled"] = "true"), f(u.value, b, y());
    };
  }
}), Da = re({
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
function yu(e, t, a) {
  t.handler ? t.handler(e, a, a.caret) : a.runCmd(t.cmd, t.param);
}
function Ci(e) {
  return f("div", { class: "q-editor__toolbar-group" }, e);
}
function pu(e, t, a, n = !1) {
  const l = n || (t.type === "toggle" ? t.toggled ? t.toggled(e) : t.cmd && e.caret.is(t.cmd, t.param) : !1), o = [];
  if (e.$q.platform.is.desktop && (t.tip || t.htmlTip)) {
    const i = t.key ? f("div", [f("small", `(CTRL + ${String.fromCharCode(t.key)})`)]) : null;
    o.push(f(Qf, { delay: 1e3 }, () => [f("div", t.htmlTip ? { innerHTML: t.htmlTip } : t.tip), i]));
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
      a == null || a(), yu(i, t, e);
    }
  }, () => o);
}
function Uf(e, t) {
  const a = t.list === "only-icons";
  let n = t.label, l = t.icon !== null ? t.icon : void 0, o, i;
  function r() {
    c.component.proxy.hide();
  }
  if (a)
    i = t.options.map((d) => {
      const v = d.type === void 0 ? e.caret.is(d.cmd, d.param) : !1;
      return v && (n = d.tip, l = d.icon !== null ? d.icon : void 0), pu(e, d, r, v);
    }), o = e.toolbarBackgroundClass.value, i = [Ci(i)];
  else {
    const d = e.props.toolbarToggleColor !== void 0 ? `text-${e.props.toolbarToggleColor}` : null, v = e.props.toolbarTextColor !== void 0 ? `text-${e.props.toolbarTextColor}` : null, m = t.list === "no-icons";
    i = t.options.map((g) => {
      const h = g.disable ? g.disable(e) : !1, p = g.type === void 0 ? e.caret.is(g.cmd, g.param) : !1;
      p && (n = g.tip, l = g.icon !== null ? g.icon : void 0);
      const C = g.htmlTip;
      return f(jl, {
        active: p,
        activeClass: d,
        clickable: !0,
        disable: h,
        dense: !0,
        onClick(k) {
          var y;
          r(), (k == null ? void 0 : k.qAvoidFocus) !== !0 && ((y = e.contentRef.value) == null || y.focus()), e.caret.restore(), yu(k, g, e);
        }
      }, () => [m === !0 ? null : f(Da, {
        class: p ? d : v,
        side: !0
      }, () => f(st, { name: g.icon !== null ? g.icon : void 0 })), f(Da, C ? () => f("div", {
        class: "text-no-wrap",
        innerHTML: g.htmlTip
      }) : g.tip ? () => f("div", { class: "text-no-wrap" }, g.tip) : void 0)]);
    }), o = [e.toolbarBackgroundClass.value, v];
  }
  const u = t.highlight && n !== t.label, c = f(ef, {
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
function Kf(e) {
  if (e.caret) return e.buttons.value.filter((t) => !e.isViewingSource.value || t.find((a) => a.cmd === "viewsource")).map((t) => Ci(t.map((a) => e.isViewingSource.value && a.cmd !== "viewsource" ? !1 : a.type === "slot" ? De(e.slots[a.slot]) : a.type === "dropdown" ? Uf(e, a) : pu(e, a))));
}
function Wf(e, t, a, n = {}) {
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
function Yf(e) {
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
                return Pt(l), n();
              case 27:
                Pt(l), e.caret.restore(), (!e.editLinkUrl.value || e.editLinkUrl.value === "https://") && document.execCommand("unlink"), e.editLinkUrl.value = null;
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
const br = /^on[A-Z]/;
function Cu() {
  const { attrs: e, vnode: t } = be(), a = {
    listeners: V({}),
    attributes: V({})
  };
  function n() {
    const l = {}, o = {};
    for (const i in e) i !== "class" && i !== "style" && br.test(i) === !1 && (l[i] = e[i]);
    for (const i in t.props) br.test(i) === !0 && (o[i] = t.props[i]);
    a.attributes.value = l, a.listeners.value = o;
  }
  return Wn(n), n(), a;
}
const Xf = Object.prototype.toString, bo = Object.prototype.hasOwnProperty, Gf = new Set([
  "Boolean",
  "Number",
  "String",
  "Function",
  "Array",
  "Date",
  "RegExp"
].map((e) => "[object " + e + "]"));
function yr(e) {
  if (e !== Object(e) || Gf.has(Xf.call(e)) === !0 || e.constructor && bo.call(e, "constructor") === !1 && bo.call(e.constructor.prototype, "isPrototypeOf") === !1) return !1;
  let t;
  for (t in e) ;
  return t === void 0 || bo.call(e, t);
}
function ku() {
  let e, t, a, n, l, o, i = arguments[0] || {}, r = 1, u = !1;
  const c = arguments.length;
  for (typeof i == "boolean" && (u = i, i = arguments[1] || {}, r = 2), Object(i) !== i && typeof i != "function" && (i = {}), c === r && (i = this, r--); r < c; r++) if ((e = arguments[r]) !== null) for (t in e)
    a = i[t], n = e[t], i !== n && (u === !0 && n && ((l = Array.isArray(n)) || yr(n) === !0) ? (l === !0 ? o = Array.isArray(a) === !0 ? a : [] : o = yr(a) === !0 ? a : {}, i[t] = ku(u, o, n)) : n !== void 0 && (i[t] = n));
  return i;
}
re({
  name: "QEditor",
  props: {
    ...it,
    ...vi,
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
    ...mi,
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
    const { proxy: n } = be(), { $q: l } = n, o = rt(e, l), { inFullscreen: i, toggleFullscreen: r } = gi(), u = Cu(), c = V(null), d = V(null), v = V(null), m = V(!1), g = s(() => !e.readonly && !e.disable);
    let h, p, C = e.modelValue;
    document.execCommand("defaultParagraphSeparator", !1, e.paragraphTag), h = window.getComputedStyle(document.body).fontFamily;
    const k = s(() => e.toolbarBg ? ` bg-${e.toolbarBg}` : ""), y = s(() => ({
      type: "a",
      flat: e.toolbarOutline !== !0 && e.toolbarPush !== !0,
      noWrap: !0,
      outline: e.toolbarOutline,
      push: e.toolbarPush,
      rounded: e.toolbarRounded,
      dense: !0,
      color: e.toolbarColor,
      disable: !g.value,
      size: "sm"
    })), b = s(() => {
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
      const P = e.definitions || {}, I = e.definitions || e.fonts ? ku(!0, {}, b.value, P, Wf(h, l.lang.editor.defaultFont, l.iconSet.editor.font, e.fonts)) : b.value;
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
        return fe ? fe.type === "no-state" || P[Y] && (fe.cmd === void 0 || b.value[fe.cmd] && b.value[fe.cmd].type === "no-state") ? fe : Object.assign({ type: "toggle" }, fe) : {
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
      isViewingSource: m,
      editLinkUrl: v,
      toolbarBackgroundClass: k,
      buttonProps: y,
      contentRef: d,
      buttons: w,
      setContent: Z
    };
    se(() => e.modelValue, (P) => {
      C !== P && (C = P, Z(P, !0));
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
    }, e.contentStyle]), X = s(() => `q-editor q-editor--${m.value === !0 ? "source" : "default"}` + (e.disable === !0 ? " disabled" : "") + (i.value === !0 ? " fullscreen column" : "") + (e.square === !0 ? " q-editor--square no-border-radius" : "") + (e.flat === !0 ? " q-editor--flat" : "") + (e.dense === !0 ? " q-editor--dense" : "") + (o.value === !0 ? " q-editor--dark q-dark" : "")), A = s(() => [
      e.contentClass,
      "q-editor__content",
      {
        col: i.value,
        "overflow-auto": i.value || e.maxHeight
      }
    ]), $ = s(() => e.disable === !0 ? { "aria-disabled": "true" } : {});
    function D() {
      if (d.value !== null) {
        const P = `inner${m.value === !0 ? "Text" : "HTML"}`, I = d.value[P];
        I !== e.modelValue && (C = I, a("update:modelValue", I));
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
        const de = `inner${m.value === !0 ? "Text" : "HTML"}`;
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
        const de = `inner${m.value === !0 ? "Text" : "HTML"}`;
        d.value[de] = P, I === !0 && (x.caret.restorePosition(d.value[de].length), G());
      }
    }
    function B(P, I, de = !0) {
      z(), x.caret.restore(), x.caret.apply(P, I, () => {
        z(), x.caret.save(), de && G();
      });
    }
    function G() {
      setTimeout(() => {
        v.value = null, n.$forceUpdate();
      }, 1);
    }
    function z() {
      Tn(() => {
        var P;
        (P = d.value) == null || P.focus({ preventScroll: !0 });
      });
    }
    function ne() {
      return d.value;
    }
    return ht(() => {
      x.caret = n.caret = new jf(d.value, x), Z(e.modelValue), G(), document.addEventListener("selectionchange", N);
    }), tt(() => {
      document.removeEventListener("selectionchange", N);
    }), Object.assign(n, {
      runCmd: B,
      refreshToolbar: G,
      focus: z,
      getContentEl: ne
    }), () => {
      let P;
      if (L.value) {
        const I = [f("div", {
          key: "qedt_top",
          class: "q-editor__toolbar row no-wrap scroll-x" + k.value
        }, Kf(x))];
        v.value !== null && I.push(f("div", {
          key: "qedt_btm",
          class: "q-editor__toolbar row no-wrap items-center scroll-x" + k.value
        }, Yf(x))), P = f("div", {
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
        contenteditable: g.value,
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
var Oo = re({
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
}), ki = re({
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
    function v(p, C, k) {
      C !== void 0 && (p.style.height = `${C}px`), p.style.transition = `height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`, n = !0, l = k;
    }
    function m(p, C) {
      p.style.overflowY = null, p.style.height = null, p.style.transition = null, d(), C !== c && a(C);
    }
    function g(p, C) {
      let k = 0;
      o = p, n === !0 ? (d(), k = p.offsetHeight === p.scrollHeight ? 0 : void 0) : (c = "hide", p.style.overflowY = "hidden"), v(p, k, C), i = setTimeout(() => {
        i = null, p.style.height = `${p.scrollHeight}px`, u = (y) => {
          r = null, (Object(y) !== y || y.target === p) && m(p, "show");
        }, p.addEventListener("transitionend", u), r = setTimeout(u, e.duration * 1.1);
      }, 100);
    }
    function h(p, C) {
      let k;
      o = p, n === !0 ? d() : (c = "show", p.style.overflowY = "hidden", k = p.scrollHeight), v(p, k, C), i = setTimeout(() => {
        i = null, p.style.height = 0, u = (y) => {
          r = null, (Object(y) !== y || y.target === p) && m(p, "hide");
        }, p.addEventListener("transitionend", u), r = setTimeout(u, e.duration * 1.1);
      }, 100);
    }
    return tt(() => {
      n === !0 && d();
    }), () => f(Vt, {
      css: !1,
      appear: e.appear,
      onEnter: g,
      onLeave: h
    }, t.default);
  }
});
const Zf = {
  true: "inset",
  item: "item-inset",
  "item-thumbnail": "item-thumbnail-inset"
}, yo = {
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
    const t = rt(e, be().proxy.$q), a = s(() => e.vertical === !0 ? "vertical" : "horizontal"), n = s(() => ` q-separator--${a.value}`), l = s(() => e.inset !== !1 ? `${n.value}-${Zf[e.inset]}` : ""), o = s(() => `q-separator${n.value}${l.value}` + (e.color !== void 0 ? ` bg-${e.color}` : "") + (t.value === !0 ? " q-separator--dark" : "")), i = s(() => {
      const r = {};
      if (e.size !== void 0 && (r[e.vertical === !0 ? "width" : "height"] = e.size), e.spaced !== !1) {
        const u = e.spaced === !0 ? `${yo.md}px` : e.spaced in yo ? `${yo[e.spaced]}px` : e.spaced, c = e.vertical === !0 ? ["Left", "Right"] : ["Top", "Bottom"];
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
const Ra = yd({}), Jf = Object.keys(Xn);
re({
  name: "QExpansionItem",
  props: {
    ...Xn,
    ...$n,
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
    ...qn,
    "click",
    "afterShow",
    "afterHide"
  ],
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = be(), l = rt(e, n), o = V(e.modelValue !== null ? e.modelValue : e.defaultOpened), i = V(null), r = Hl(), { show: u, hide: c, toggle: d } = Bn({ showing: o });
    let v, m;
    const g = s(() => `q-expansion-item q-item-type q-expansion-item--${o.value === !0 ? "expanded" : "collapsed"} q-expansion-item--${e.popup === !0 ? "popup" : "standard"}`), h = s(() => e.contentInsetLevel === void 0 ? null : { ["padding" + (n.lang.rtl === !0 ? "Right" : "Left")]: e.contentInsetLevel * 56 + "px" }), p = s(() => e.disable !== !0 && (e.href !== void 0 || e.to !== void 0 && e.to !== null && e.to !== "")), C = s(() => {
      const E = {};
      return Jf.forEach((Q) => {
        E[Q] = e[Q];
      }), E;
    }), k = s(() => p.value === !0 || e.expandIconToggle !== !0), y = s(() => e.expandedIcon !== void 0 && o.value === !0 ? e.expandedIcon : e.expandIcon || n.iconSet.expansionItem[e.denseToggle === !0 ? "denseIcon" : "icon"]), b = s(() => e.disable !== !0 && (p.value === !0 || e.expandIconToggle === !0)), w = s(() => ({
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
      m == null || m(), E !== void 0 && $();
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
      v === void 0 && (v = Un()), o.value === !0 && (Ra[e.group] = v);
      const E = se(o, (j) => {
        j === !0 ? Ra[e.group] = v : Ra[e.group] === v && delete Ra[e.group];
      }), Q = se(() => Ra[e.group], (j, N) => {
        N === v && j !== void 0 && j !== v && c();
      });
      m = () => {
        E(), Q(), Ra[e.group] === v && delete Ra[e.group], m = void 0;
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
      return b.value === !0 && (Object.assign(E, {
        tabindex: 0,
        ...x.value,
        onClick: K,
        onKeyup: M
      }), Q.unshift(f("div", {
        ref: i,
        class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
        tabindex: -1
      }))), f(Da, E, () => Q);
    }
    function _() {
      let E;
      return t.header !== void 0 ? E = [].concat(t.header(w.value)) : (E = [f(Da, () => [f(Oo, { lines: e.labelLines }, () => e.label || ""), e.caption ? f(Oo, {
        lines: e.captionLines,
        caption: !0
      }, () => e.caption) : null])], e.icon && E[e.switchToggleSide === !0 ? "push" : "unshift"](f(Da, {
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
      return k.value === !0 && (E.clickable = !0, E.onClick = L, Object.assign(E, p.value === !0 ? C.value : x.value)), f(jl, E, _);
    }
    function T() {
      return ea(f("div", {
        key: "e-content",
        class: "q-expansion-item__content relative-position",
        style: h.value,
        id: r.value
      }, De(t.default)), [[Ko, o.value]]);
    }
    function H() {
      const E = [S(), f(ki, {
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
      m == null || m();
    }), () => f("div", { class: g.value }, [f("div", { class: "q-expansion-item__container relative-position" }, H())]);
  }
});
const ev = [
  "top",
  "right",
  "bottom",
  "left"
], Ho = {
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
    validator: (e) => ev.includes(e)
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
function Su(e, t) {
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
const tv = [
  "up",
  "right",
  "down",
  "left"
], av = [
  "left",
  "center",
  "right"
];
re({
  name: "QFab",
  props: {
    ...Ho,
    ...$n,
    icon: String,
    activeIcon: String,
    hideIcon: Boolean,
    hideLabel: {
      ...Ho.hideLabel,
      default: null
    },
    direction: {
      type: String,
      default: "right",
      validator: (e) => tv.includes(e)
    },
    persistent: Boolean,
    verticalActionsAlign: {
      type: String,
      default: "center",
      validator: (e) => av.includes(e)
    }
  },
  emits: qn,
  setup(e, { slots: t }) {
    const a = V(null), n = V(e.modelValue === !0), l = Hl(), { proxy: { $q: o } } = be(), { formClass: i, labelProps: r } = Su(e, n), { hide: u, toggle: c } = Bn({
      showing: n,
      hideOnRouteChange: s(() => e.persistent !== !0)
    }), d = s(() => ({ opened: n.value })), v = s(() => `q-fab z-fab row inline justify-center q-fab--align-${e.verticalActionsAlign} ${i.value}` + (n.value === !0 ? " q-fab--opened" : " q-fab--closed")), m = s(() => `q-fab__actions flex no-wrap inline q-fab__actions--${e.direction} q-fab__actions--${n.value === !0 ? "opened" : "closed"}`), g = s(() => {
      const k = {
        id: l.value,
        role: "menu"
      };
      return n.value !== !0 && (k["aria-hidden"] = "true"), k;
    }), h = s(() => `q-fab__icon-holder  q-fab__icon-holder--${n.value === !0 ? "opened" : "closed"}`);
    function p(k, y) {
      const b = t[k], w = `q-fab__${k} absolute-full`;
      return b === void 0 ? f(st, {
        class: w,
        name: e[y] || o.iconSet.fab[y]
      }) : f("div", { class: w }, b(d.value));
    }
    function C() {
      const k = [];
      return e.hideIcon !== !0 && k.push(f("div", { class: h.value }, [p("icon", "icon"), p("active-icon", "activeIcon")])), (e.label !== "" || t.label !== void 0) && k[r.value.action](f("div", r.value.data, t.label !== void 0 ? t.label(d.value) : [e.label])), $t(t.tooltip, k);
    }
    return La(ss, {
      showing: n,
      onChildClick(k) {
        var y;
        u(k), (k == null ? void 0 : k.qAvoidFocus) !== !0 && ((y = a.value) == null || y.$el.focus());
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
    }, C), f("div", {
      class: m.value,
      ...g.value
    }, De(t.default))]);
  }
});
const wu = {
  start: "self-end",
  center: "self-center",
  end: "self-start"
}, nv = Object.keys(wu);
re({
  name: "QFabAction",
  props: {
    ...Ho,
    icon: {
      type: String,
      default: ""
    },
    anchor: {
      type: String,
      validator: (e) => nv.includes(e)
    },
    to: [String, Object],
    replace: Boolean
  },
  emits: ["click"],
  setup(e, { slots: t, emit: a }) {
    const n = Kt(ss, () => ({
      showing: { value: !0 },
      onChildClick: At
    })), { formClass: l, labelProps: o } = Su(e, n.showing), i = s(() => {
      const v = wu[e.anchor];
      return l.value + (v !== void 0 ? ` ${v}` : "");
    }), r = s(() => e.disable === !0 || n.showing.value !== !0);
    function u(v) {
      n.onChildClick(v), a("click", v);
    }
    function c() {
      const v = [];
      return t.icon !== void 0 ? v.push(t.icon()) : e.icon !== "" && v.push(f(st, { name: e.icon })), (e.label !== "" || t.label !== void 0) && v[o.value.action](f("div", o.value.data, t.label !== void 0 ? t.label() : [e.label])), $t(t.default, v);
    }
    const d = be();
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
function lv({ validate: e, resetValidation: t, requiresQForm: a }) {
  const n = Kt(us, !1);
  if (n !== !1) {
    const { props: l, proxy: o } = be();
    Object.assign(o, {
      validate: e,
      resetValidation: t
    }), se(() => l.disable, (i) => {
      i === !0 ? (typeof t == "function" && t(), n.unbindComponent(o)) : n.bindComponent(o);
    }), ht(() => {
      l.disable !== !0 && n.bindComponent(o);
    }), tt(() => {
      l.disable !== !0 && n.unbindComponent(o);
    });
  } else a === !0 && console.error("Parent QForm not found on useFormChild()!");
}
const ov = [
  !0,
  !1,
  "ondemand"
], iv = {
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
    validator: (e) => ov.includes(e)
  }
};
function rv(e, t) {
  const { props: a, proxy: n } = be(), l = V(!1), o = V(null), i = V(!1);
  lv({
    validate: p,
    resetValidation: h
  });
  let r = 0, u;
  const c = s(() => a.rules !== void 0 && a.rules !== null && a.rules.length !== 0), d = s(() => a.disable !== !0 && c.value === !0 && t.value === !1), v = s(() => a.error === !0 || l.value === !0), m = s(() => typeof a.errorMessage == "string" && a.errorMessage.length !== 0 ? a.errorMessage : o.value);
  se(() => a.modelValue, () => {
    i.value = !0, d.value === !0 && a.lazyRules === !1 && C();
  });
  function g() {
    a.lazyRules !== "ondemand" && d.value === !0 && i.value === !0 && C();
  }
  se(() => a.reactiveRules, (k) => {
    k === !0 ? u === void 0 && (u = se(() => a.rules, g, {
      immediate: !0,
      deep: !0
    })) : u !== void 0 && (u(), u = void 0);
  }, { immediate: !0 }), se(() => a.lazyRules, g), se(e, (k) => {
    k === !0 ? i.value = !0 : d.value === !0 && a.lazyRules !== "ondemand" && C();
  });
  function h() {
    r++, t.value = !1, i.value = !1, l.value = !1, o.value = null, C.cancel();
  }
  function p(k = a.modelValue) {
    if (a.disable === !0 || c.value === !1) return !0;
    const y = ++r, b = t.value !== !0 ? () => {
      i.value = !0;
    } : () => {
    }, w = (L, M) => {
      L === !0 && b(), l.value = L, o.value = M || null, t.value = !1;
    }, x = [];
    for (let L = 0; L < a.rules.length; L++) {
      const M = a.rules[L];
      let K;
      if (typeof M == "function" ? K = M(k, hl) : typeof M == "string" && hl[M] !== void 0 && (K = hl[M](k)), K === !1 || typeof K == "string")
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
  const C = _n(p, 0);
  return tt(() => {
    u == null || u(), C.cancel();
  }), Object.assign(n, {
    resetValidation: h,
    validate: p
  }), zt(n, "hasError", () => v.value), {
    isDirtyModel: i,
    hasRules: c,
    hasError: v,
    errorMessage: m,
    validate: p,
    resetValidation: h
  };
}
function Ja(e) {
  return e != null && String(e).length !== 0;
}
const xu = {
  ...it,
  ...iv,
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
  ...xu,
  maxlength: [Number, String]
}, Ul = [
  "update:modelValue",
  "clear",
  "focus",
  "blur"
];
function Kl({ requiredForAttr: e = !0, tagProp: t, changeEvent: a = !1 } = {}) {
  const { props: n, proxy: l } = be(), o = rt(n, l.$q), i = Hl({
    required: e,
    getValue: () => n.for
  });
  return {
    requiredForAttr: e,
    changeEvent: a,
    tag: t === !0 ? s(() => n.tag) : { value: "label" },
    isDark: o,
    editable: s(() => n.disable !== !0 && n.readonly !== !0),
    innerLoading: V(!1),
    focused: V(!1),
    hasPopupOpen: !1,
    splitAttrs: Cu(),
    targetUid: i,
    rootRef: V(null),
    targetRef: V(null),
    controlRef: V(null)
  };
}
function Wl(e) {
  const { props: t, emit: a, slots: n, attrs: l, proxy: o } = be(), { $q: i } = o;
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
  const { isDirtyModel: u, hasRules: c, hasError: d, errorMessage: v, resetValidation: m } = rv(e.focused, e.innerLoading), g = e.floatingLabel !== void 0 ? s(() => t.stackLabel === !0 || e.focused.value === !0 || e.floatingLabel.value === !0) : s(() => t.stackLabel === !0 || e.focused.value === !0 || e.hasValue.value === !0), h = s(() => t.bottomSlots === !0 || t.hint !== void 0 || c.value === !0 || t.counter === !0 || t.error !== null), p = s(() => t.filled === !0 ? "filled" : t.outlined === !0 ? "outlined" : t.borderless === !0 ? "borderless" : t.standout ? "standout" : "standard"), C = s(() => `q-field row no-wrap items-start q-field--${p.value}` + (e.fieldClass !== void 0 ? ` ${e.fieldClass.value}` : "") + (t.rounded === !0 ? " q-field--rounded" : "") + (t.square === !0 ? " q-field--square" : "") + (g.value === !0 ? " q-field--float" : "") + (y.value === !0 ? " q-field--labeled" : "") + (t.dense === !0 ? " q-field--dense" : "") + (t.itemAligned === !0 ? " q-field--item-aligned q-item-type" : "") + (e.isDark.value === !0 ? " q-field--dark" : "") + (e.getControl === void 0 ? " q-field--auto-height" : "") + (e.focused.value === !0 ? " q-field--focused" : "") + (d.value === !0 ? " q-field--error" : "") + (d.value === !0 || e.focused.value === !0 ? " q-field--highlighted" : "") + (t.hideBottomSpace !== !0 && h.value === !0 ? " q-field--with-bottom" : "") + (t.disable === !0 ? " q-field--disabled" : t.readonly === !0 ? " q-field--readonly" : "")), k = s(() => "q-field__control relative-position row no-wrap" + (t.bgColor !== void 0 ? ` bg-${t.bgColor}` : "") + (d.value === !0 ? " text-negative" : typeof t.standout == "string" && t.standout.length !== 0 && e.focused.value === !0 ? ` ${t.standout}` : t.color !== void 0 ? ` text-${t.color}` : "")), y = s(() => t.labelSlot === !0 || t.label !== void 0), b = s(() => "q-field__label no-pointer-events absolute ellipsis" + (t.labelColor !== void 0 && d.value !== !0 ? ` text-${t.labelColor}` : "")), w = s(() => ({
    id: e.targetUid.value,
    editable: e.editable.value,
    focused: e.focused.value,
    floatingLabel: g.value,
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
    Tn(L);
  }
  function K() {
    zc(L);
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
      m(), u.value = N;
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
      onClick: Pt
    }, n.prepend())), Q.push(f("div", { class: "q-field__control-container col relative-position row no-wrap q-anchor--skip" }, S())), d.value === !0 && t.noErrorIcon === !1 && Q.push(H("error", [f(st, {
      name: i.iconSet.field.error,
      color: "negative"
    })])), t.loading === !0 || e.innerLoading.value === !0 ? Q.push(H("inner-loading-append", n.loading !== void 0 ? n.loading() : [f(la, { color: t.color })])) : t.clearable === !0 && e.hasValue.value === !0 && e.editable.value === !0 && Q.push(H("inner-clearable-append", [f(st, {
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
      onClick: Pt
    }, n.append())), e.getInnerAppend !== void 0 && Q.push(H("inner-append", e.getInnerAppend())), e.getControlChild !== void 0 && Q.push(e.getControlChild()), Q;
  }
  function S() {
    const Q = [];
    return t.prefix !== void 0 && t.prefix !== null && Q.push(f("div", { class: "q-field__prefix no-pointer-events row items-center" }, t.prefix)), e.getShadowControl !== void 0 && e.hasShadow.value === !0 && Q.push(e.getShadowControl()), y.value === !0 && Q.push(f("div", { class: b.value }, De(n.label, t.label))), e.getControl !== void 0 ? Q.push(e.getControl()) : n.rawControl !== void 0 ? Q.push(n.rawControl()) : n.control !== void 0 && Q.push(f("div", {
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
      onClick: Pt
    }, [t.hideBottomSpace === !0 ? Z : f(Vt, { name: "q-transition--field-message" }, () => Z), N === !0 ? f("div", { class: "q-field__counter" }, n.counter !== void 0 ? n.counter() : e.computedCounter.value) : null]);
  }
  function H(Q, j) {
    return j === null ? null : f("div", {
      key: Q,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, j);
  }
  let E = !1;
  return Sa(() => {
    E = !0;
  }), en(() => {
    E === !0 && t.autofocus === !0 && o.focus();
  }), t.autofocus === !0 && ht(() => {
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
      class: [C.value, l.class],
      style: l.style,
      ...j
    }, [
      n.before !== void 0 ? f("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: Pt
      }, n.before()) : null,
      f("div", { class: "q-field__inner relative-position col self-stretch" }, [f("div", {
        ref: e.controlRef,
        class: k.value,
        tabindex: -1,
        ...e.controlEvents
      }, _()), h.value === !0 ? T() : null]),
      n.after !== void 0 ? f("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: Pt
      }, n.after()) : null
    ]);
  };
}
var sv = re({
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
function rl(e) {
  e != null && e.dataTransfer && (e.dataTransfer.dropEffect = "copy"), Ye(e);
}
const _u = {
  multiple: Boolean,
  accept: String,
  capture: String,
  maxFileSize: [Number, String],
  maxTotalSize: [Number, String],
  maxFiles: [Number, String],
  filter: Function
}, $u = ["rejected"];
function qu({ editable: e, dnd: t, getFileInput: a, addFilesToQueue: n }) {
  const { props: l, emit: o, proxy: i } = be(), r = V(null), u = s(() => l.accept !== void 0 ? l.accept.split(",").map((y) => (y = y.trim(), y === "*" ? "*/" : (y.endsWith("/*") && (y = y.slice(0, y.length - 1)), y.toUpperCase()))) : null), c = s(() => parseInt(l.maxFiles, 10)), d = s(() => parseInt(l.maxTotalSize, 10));
  function v(y) {
    var b;
    if (e.value)
      if (y !== Object(y) && (y = { target: null }), ((b = y.target) == null ? void 0 : b.matches('input[type="file"]')) === !0)
        y.clientX === 0 && y.clientY === 0 && wt(y);
      else {
        const w = a();
        w !== y.target && (w == null || w.click(y));
      }
  }
  function m(y) {
    e.value && y && n(null, y);
  }
  function g(y, b, w, x) {
    let L = Array.from(b || y.target.files);
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
  function h(y) {
    rl(y), t.value !== !0 && (t.value = !0);
  }
  function p(y) {
    Ye(y), (y.relatedTarget !== null || Je.is.safari !== !0 ? y.relatedTarget !== r.value : document.elementsFromPoint(y.clientX, y.clientY).includes(r.value) === !1) && (t.value = !1);
  }
  function C(y) {
    rl(y);
    const b = y.dataTransfer.files;
    b.length !== 0 && n(null, b), t.value = !1;
  }
  function k(y) {
    if (t.value === !0) return f("div", {
      ref: r,
      class: `q-${y}__dnd absolute-full`,
      onDragenter: rl,
      onDragover: rl,
      onDragleave: p,
      onDrop: C
    });
  }
  return Object.assign(i, {
    pickFiles: v,
    addFiles: m
  }), {
    pickFiles: v,
    addFiles: m,
    onDragover: h,
    onDragleave: p,
    processFiles: g,
    getDndNode: k,
    maxFilesNumber: c,
    maxTotalSizeNumber: d
  };
}
function Bu(e, t) {
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
var uv = re({
  name: "QFile",
  inheritAttrs: !1,
  props: {
    ...xu,
    ...oa,
    ..._u,
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
  emits: [...Ul, ...$u],
  setup(e, { slots: t, emit: a, attrs: n }) {
    const { proxy: l } = be(), o = Kl(), i = V(null), r = V(!1), u = ri(e), { pickFiles: c, onDragover: d, onDragleave: v, processFiles: m, getDndNode: g } = qu({
      editable: o.editable,
      dnd: r,
      getFileInput: D,
      addFilesToQueue: _
    }), h = Bu(e), p = s(() => Object(e.modelValue) === e.modelValue ? "length" in e.modelValue ? Array.from(e.modelValue) : [e.modelValue] : []), C = s(() => Ja(p.value)), k = s(() => p.value.map((E) => E.name).join(", ")), y = s(() => Ao(p.value.reduce((E, Q) => E + Q.size, 0))), b = s(() => ({
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
      E.keyCode === 13 && Pt(E);
    }
    function $(E) {
      (E.keyCode === 13 || E.keyCode === 32) && c(E);
    }
    function D() {
      return i.value;
    }
    function _(E, Q) {
      const j = m(E, Q, p.value, L.value), N = D();
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
      if (e.useChips === !0) return p.value.length === 0 ? S() : p.value.map((Q, j) => f(Us, {
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
      const E = e.displayValue !== void 0 ? e.displayValue : k.value;
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
        ...h.value,
        class: "q-field__input fit absolute-full cursor-pointer",
        onChange: _
      };
      return e.multiple === !0 && (E.multiple = !0), f("input", E);
    }
    return Object.assign(o, {
      fieldClass: x,
      emitValue: X,
      hasValue: C,
      inputRef: i,
      innerValue: p,
      floatingLabel: s(() => C.value === !0 || Ja(e.displayValue)),
      computedCounter: s(() => {
        if (e.counterLabel !== void 0) return e.counterLabel(b.value);
        const E = e.maxFiles;
        return `${p.value.length}${E !== void 0 ? " / " + E : ""} (${y.value})`;
      }),
      getControlChild: () => g("file"),
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
    }), zt(l, "nativeEl", () => i.value), Wl(o);
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
    const { proxy: { $q: n } } = be(), l = Kt(an, vt);
    if (l === vt)
      return console.error("QFooter needs to be child of QLayout"), vt;
    const o = V(parseInt(e.heightHint, 10)), i = V(!0), r = V(ta.value === !0 || l.isContainer.value === !0 ? 0 : window.innerHeight), u = s(() => e.reveal === !0 || l.view.value.indexOf("F") !== -1 || n.platform.is.ios && l.isContainer.value === !0), c = s(() => l.isContainer.value === !0 ? l.containerHeight.value : r.value), d = s(() => {
      if (e.modelValue !== !0) return 0;
      if (u.value === !0) return i.value === !0 ? o.value : 0;
      const x = l.scroll.value.position + c.value + o.value - l.height.value;
      return x > 0 ? x : 0;
    }), v = s(() => e.modelValue !== !0 || u.value === !0 && i.value !== !0), m = s(() => e.modelValue === !0 && v.value === !0 && e.reveal === !0), g = s(() => "q-footer q-layout__section--marginal " + (u.value === !0 ? "fixed" : "absolute") + "-bottom" + (e.bordered === !0 ? " q-footer--bordered" : "") + (v.value === !0 ? " q-footer--hidden" : "") + (e.modelValue !== !0 ? " q-layout--prevent-focus" + (u.value !== !0 ? " hidden" : "") : "")), h = s(() => {
      const x = l.rows.value.bottom, L = {};
      return x[0] === "l" && l.left.space === !0 && (L[n.lang.rtl === !0 ? "right" : "left"] = `${l.left.size}px`), x[2] === "r" && l.right.space === !0 && (L[n.lang.rtl === !0 ? "left" : "right"] = `${l.right.size}px`), L;
    });
    function p(x, L) {
      l.update("footer", x, L);
    }
    function C(x, L) {
      x.value !== L && (x.value = L);
    }
    function k({ height: x }) {
      C(o, x), p("size", x);
    }
    function y() {
      if (e.reveal !== !0) return;
      const { direction: x, position: L, inflectionPoint: M } = l.scroll.value;
      C(i, x === "up" || L - M < 100 || l.height.value - c.value - L - o.value < 300);
    }
    function b(x) {
      m.value === !0 && C(i, !0), a("focusin", x);
    }
    se(() => e.modelValue, (x) => {
      p("space", x), C(i, !0), l.animate();
    }), se(d, (x) => {
      p("offset", x);
    }), se(() => e.reveal, (x) => {
      x === !1 && C(i, e.modelValue);
    }), se(i, (x) => {
      l.animate(), a("reveal", x);
    }), se([
      o,
      l.scroll,
      l.height
    ], y), se(() => n.screen.height, (x) => {
      l.isContainer.value !== !0 && C(r, x);
    });
    const w = {};
    return l.instances.footer = w, e.modelValue === !0 && p("size", o.value), p("space", e.modelValue), p("offset", d.value), tt(() => {
      l.instances.footer === w && (l.instances.footer = void 0, p("size", 0), p("offset", 0), p("space", !1));
    }), () => {
      const x = $t(t.default, [f(Ga, {
        debounce: 0,
        onResize: k
      })]);
      return e.elevated === !0 && x.push(f("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), f("footer", {
        class: g.value,
        style: h.value,
        onFocusin: b
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
    const n = be(), l = V(null);
    let o = 0;
    const i = [];
    function r(g) {
      const h = typeof g == "boolean" ? g : e.noErrorFocus !== !0, p = ++o, C = (y, b) => {
        a(`validation${y === !0 ? "Success" : "Error"}`, b);
      }, k = (y) => {
        const b = y.validate();
        return typeof b.then == "function" ? b.then((w) => ({
          valid: w,
          comp: y
        }), (w) => ({
          valid: !1,
          comp: y,
          err: w
        })) : Promise.resolve({
          valid: b,
          comp: y
        });
      };
      return (e.greedy === !0 ? Promise.all(i.map(k)).then((y) => y.filter((b) => b.valid !== !0)) : i.reduce((y, b) => y.then(() => k(b).then((w) => {
        if (w.valid === !1) return Promise.reject(w);
      })), Promise.resolve()).catch((y) => [y])).then((y) => {
        if (y === void 0 || y.length === 0)
          return p === o && C(!0), !0;
        if (p === o) {
          const { comp: b, err: w } = y[0];
          if (w !== void 0 && console.error(w), C(!1, b), h === !0) {
            const x = y.find(({ comp: L }) => typeof L.focus == "function" && Ma(L.$) === !1);
            x !== void 0 && x.comp.focus();
          }
        }
        return !1;
      });
    }
    function u() {
      o++, i.forEach((g) => {
        typeof g.resetValidation == "function" && g.resetValidation();
      });
    }
    function c(g) {
      g !== void 0 && Ye(g);
      const h = o + 1;
      r().then((p) => {
        h === o && p === !0 && (e.onSubmit !== void 0 ? a("submit", g) : (g == null ? void 0 : g.target) !== void 0 && typeof g.target.submit == "function" && g.target.submit());
      });
    }
    function d(g) {
      g !== void 0 && Ye(g), a("reset"), nt(() => {
        u(), e.autofocus === !0 && e.noResetFocus !== !0 && v();
      });
    }
    function v() {
      Tn(() => {
        var g;
        l.value !== null && ((g = l.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || l.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || l.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(l.value.querySelectorAll("[tabindex]"), (h) => h.tabIndex !== -1)) == null || g.focus({ preventScroll: !0 }));
      });
    }
    La(us, {
      bindComponent(g) {
        i.push(g);
      },
      unbindComponent(g) {
        const h = i.indexOf(g);
        h !== -1 && i.splice(h, 1);
      }
    });
    let m = !1;
    return Sa(() => {
      m = !0;
    }), en(() => {
      m === !0 && e.autofocus === !0 && v();
    }), ht(() => {
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
    const { proxy: { $q: n } } = be(), l = Kt(an, vt);
    if (l === vt)
      return console.error("QHeader needs to be child of QLayout"), vt;
    const o = V(parseInt(e.heightHint, 10)), i = V(!0), r = s(() => e.reveal === !0 || l.view.value.indexOf("H") !== -1 || n.platform.is.ios && l.isContainer.value === !0), u = s(() => {
      if (e.modelValue !== !0) return 0;
      if (r.value === !0) return i.value === !0 ? o.value : 0;
      const y = o.value - l.scroll.value.position;
      return y > 0 ? y : 0;
    }), c = s(() => e.modelValue !== !0 || r.value === !0 && i.value !== !0), d = s(() => e.modelValue === !0 && c.value === !0 && e.reveal === !0), v = s(() => "q-header q-layout__section--marginal " + (r.value === !0 ? "fixed" : "absolute") + "-top" + (e.bordered === !0 ? " q-header--bordered" : "") + (c.value === !0 ? " q-header--hidden" : "") + (e.modelValue !== !0 ? " q-layout--prevent-focus" : "")), m = s(() => {
      const y = l.rows.value.top, b = {};
      return y[0] === "l" && l.left.space === !0 && (b[n.lang.rtl === !0 ? "right" : "left"] = `${l.left.size}px`), y[2] === "r" && l.right.space === !0 && (b[n.lang.rtl === !0 ? "left" : "right"] = `${l.right.size}px`), b;
    });
    function g(y, b) {
      l.update("header", y, b);
    }
    function h(y, b) {
      y.value !== b && (y.value = b);
    }
    function p({ height: y }) {
      h(o, y), g("size", y);
    }
    function C(y) {
      d.value === !0 && h(i, !0), a("focusin", y);
    }
    se(() => e.modelValue, (y) => {
      g("space", y), h(i, !0), l.animate();
    }), se(u, (y) => {
      g("offset", y);
    }), se(() => e.reveal, (y) => {
      y === !1 && h(i, e.modelValue);
    }), se(i, (y) => {
      l.animate(), a("reveal", y);
    }), se(l.scroll, (y) => {
      e.reveal === !0 && h(i, y.direction === "up" || y.position <= e.revealOffset || y.position - y.inflectionPoint < 100);
    });
    const k = {};
    return l.instances.header = k, e.modelValue === !0 && g("size", o.value), g("space", e.modelValue), g("offset", u.value), tt(() => {
      l.instances.header === k && (l.instances.header = void 0, g("size", 0), g("offset", 0), g("space", !1));
    }), () => {
      const y = Yn(t.default, []);
      return e.elevated === !0 && y.push(f("div", { class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events" })), y.push(f(Ga, {
        debounce: 0,
        onResize: p
      })), f("header", {
        class: v.value,
        style: m.value,
        onFocusin: C
      }, y);
    };
  }
});
const Si = { ratio: [String, Number] };
function wi(e, t) {
  return s(() => {
    const a = Number(e.ratio || (t !== void 0 ? t.value : void 0));
    return isNaN(a) !== !0 && a > 0 ? { paddingBottom: `${100 / a}%` } : null;
  });
}
const dv = 1.7778;
var cv = re({
  name: "QImg",
  props: {
    ...Si,
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
      default: dv
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
    const n = V(e.initialRatio), l = wi(e, n), o = be(), { registerTimeout: i, removeTimeout: r } = ka(), { registerTimeout: u, removeTimeout: c } = ka(), d = s(() => e.placeholderSrc !== void 0 ? { src: e.placeholderSrc } : null), v = s(() => e.errorSrc !== void 0 ? {
      src: e.errorSrc,
      __qerror: !0
    } : null), m = [V(null), V(d.value)], g = V(0), h = V(!1), p = V(!1), C = s(() => `q-img q-img--${e.noNativeMenu === !0 ? "no-" : ""}menu`), k = s(() => ({
      width: e.width,
      height: e.height
    })), y = s(() => `q-img__image ${e.imgClass !== void 0 ? e.imgClass + " " : ""}q-img__image--with${e.noTransition === !0 ? "out" : ""}-transition q-img__image--`), b = s(() => ({
      ...e.imgStyle,
      objectFit: e.fit,
      objectPosition: e.position
    }));
    function w() {
      if (c(), e.loadingShowDelay === 0) {
        h.value = !0;
        return;
      }
      u(() => {
        h.value = !0;
      }, e.loadingShowDelay);
    }
    function x() {
      c(), h.value = !1;
    }
    function L({ target: D }) {
      Ma(o) === !1 && (r(), n.value = D.naturalHeight === 0 ? 0.5 : D.naturalWidth / D.naturalHeight, M(D, 1));
    }
    function M(D, _) {
      _ === 1e3 || Ma(o) === !0 || (D.complete === !0 ? K(D) : i(() => {
        M(D, _ + 1);
      }, 50));
    }
    function K(D) {
      Ma(o) !== !0 && (g.value = g.value ^ 1, m[g.value].value = null, x(), D.getAttribute("__qerror") !== "true" && (p.value = !1), a("load", D.currentSrc || D.src));
    }
    function X(D) {
      r(), x(), p.value = !0, m[g.value].value = v.value, m[g.value ^ 1].value = d.value, a("error", D);
    }
    function A(D) {
      const _ = m[D].value, S = {
        key: "img_" + D,
        class: y.value,
        style: b.value,
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
      return g.value === D ? Object.assign(S, {
        class: S.class + "current",
        onLoad: L,
        onError: X
      }) : S.class += "loaded", f("div", {
        class: "q-img__container absolute-full",
        key: "img" + D
      }, f("img", S));
    }
    function $() {
      return h.value === !1 ? f("div", {
        key: "content",
        class: "q-img__content absolute-full q-anchor--skip"
      }, De(t[p.value === !0 ? "error" : "default"])) : f("div", {
        key: "loading",
        class: "q-img__loading absolute-full flex flex-center"
      }, t.loading !== void 0 ? t.loading() : e.noSpinner === !0 ? void 0 : [f(la, {
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
          r(), p.value = !1, _ === null ? (x(), m[g.value ^ 1].value = d.value) : w(), m[g.value].value = _;
        }, { immediate: !0 });
      };
      ta.value === !0 ? ht(D) : D();
    }
    return () => {
      const D = [];
      return l.value !== null && D.push(f("div", {
        key: "filler",
        style: l.value
      })), m[0].value !== null && D.push(A(0)), m[1].value !== null && D.push(A(1)), D.push(f(Vt, { name: "q-transition--fade" }, $)), f("div", {
        key: "main",
        class: C.value,
        style: k.value,
        role: "img",
        "aria-label": e.alt
      }, D);
    };
  }
});
const { passive: Fa } = gt;
var fv = re({
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
    const n = V(!1), l = V(!0), o = V(null), i = V(null);
    let r = e.initialIndex, u, c;
    const d = s(() => "q-infinite-scroll__loading" + (n.value === !0 ? "" : " invisible"));
    function v() {
      if (e.disable === !0 || n.value === !0 || l.value === !1) return;
      const M = Jn(u), K = Aa(u), X = wn(u);
      e.reverse === !1 ? Math.round(K + X + e.offset) >= Math.round(M) && m() : Math.round(K) <= e.offset && m();
    }
    function m() {
      if (e.disable === !0 || n.value === !0 || l.value === !1) return;
      r++, n.value = !0;
      const M = Jn(u);
      a("load", r, (K) => {
        l.value === !0 && (n.value = !1, nt(() => {
          if (e.reverse === !0) {
            const X = Jn(u), A = Aa(u), $ = X - M;
            Cn(u, A + $);
          }
          K === !0 ? p() : o.value && o.value.closest("body") && c();
        }));
      });
    }
    function g() {
      r = 0;
    }
    function h() {
      l.value === !1 && (l.value = !0, u.addEventListener("scroll", c, Fa)), v();
    }
    function p() {
      var M;
      l.value === !0 && (l.value = !1, n.value = !1, u.removeEventListener("scroll", c, Fa), (M = c == null ? void 0 : c.cancel) == null || M.call(c));
    }
    function C() {
      if (u && l.value === !0 && u.removeEventListener("scroll", c, Fa), u = fa(o.value, e.scrollTarget), l.value === !0) {
        if (u.addEventListener("scroll", c, Fa), e.reverse === !0) {
          const M = Jn(u), K = wn(u);
          Cn(u, M - K);
        }
        v();
      }
    }
    function k(M) {
      r = M;
    }
    function y(M) {
      M = parseInt(M, 10);
      const K = c;
      c = M <= 0 ? v : _n(v, isNaN(M) === !0 ? 100 : M), u && l.value === !0 && (K !== void 0 && u.removeEventListener("scroll", K, Fa), u.addEventListener("scroll", c, Fa));
    }
    function b(M) {
      if (w.value === !0) {
        if (i.value === null) {
          M !== !0 && nt(() => {
            b(!0);
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
      b();
    }), se(() => e.disable, (M) => {
      M === !0 ? p() : h();
    }), se(() => e.reverse, () => {
      n.value === !1 && l.value === !0 && v();
    }), se(() => e.scrollTarget, C), se(() => e.debounce, y);
    let x = !1;
    en(() => {
      x !== !1 && u && Cn(u, x);
    }), Sa(() => {
      x = u ? Aa(u) : !1;
    }), tt(() => {
      l.value === !0 && u.removeEventListener("scroll", c, Fa);
    }), ht(() => {
      y(e.debounce), C(), n.value === !1 && b();
    });
    const L = be();
    return Object.assign(L.proxy, {
      poll: () => {
        c == null || c();
      },
      trigger: m,
      stop: p,
      reset: g,
      resume: h,
      setIndex: k,
      updateScrollTarget: C
    }), () => {
      const M = Yn(t.default, []);
      return w.value === !0 && M[e.reverse === !1 ? "push" : "unshift"](f("div", {
        ref: i,
        class: d.value
      }, De(t.loading))), f("div", {
        class: "q-infinite-scroll",
        ref: o
      }, M);
    };
  }
}), vv = re({
  name: "QInnerLoading",
  props: {
    ...it,
    ...Qa,
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
    const a = rt(e, be().proxy.$q), { transitionProps: n, transitionStyle: l } = El(e), o = s(() => "q-inner-loading q--avoid-card-border absolute-full column flex-center" + (a.value === !0 ? " q-inner-loading--dark" : "")), i = s(() => "q-inner-loading__label" + (e.labelClass !== void 0 ? ` ${e.labelClass}` : ""));
    function r() {
      const c = [f(la, {
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
    return () => f(Vt, n.value, u);
  }
});
const pr = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
}, { tokenMap: Cr, tokenKeys: mv } = Tu({
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
function Tu(e) {
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
function Mu(e) {
  return new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + e.join("") + "])|(.)", "g");
}
const kr = /[.*+?^${}()|[\]\\]/g, gv = Mu(mv), Dt = "", hv = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean,
  maskTokens: Object
};
function bv(e, t, a, n) {
  let l, o, i, r, u, c;
  const d = s(() => {
    if (e.maskTokens === void 0 || e.maskTokens === null) return {
      tokenMap: Cr,
      tokenRegexMask: gv
    };
    const { tokenMap: A } = Tu(e.maskTokens), $ = {
      ...Cr,
      ...A
    };
    return {
      tokenMap: $,
      tokenRegexMask: Mu(Object.keys($))
    };
  }), v = V(null), m = V(h());
  function g() {
    return e.autogrow === !0 || [
      "textarea",
      "text",
      "search",
      "url",
      "tel",
      "password"
    ].includes(e.type);
  }
  se(() => e.type + e.autogrow, C), se(() => e.mask, (A) => {
    if (A !== void 0) k(m.value, !0);
    else {
      const $ = K(m.value);
      C(), e.modelValue !== $ && t("update:modelValue", $);
    }
  }), se(() => e.fillMask + e.reverseFillMask, () => {
    v.value === !0 && k(m.value, !0);
  }), se(() => e.unmaskedValue, () => {
    v.value === !0 && k(m.value);
  });
  function h() {
    if (C(), v.value === !0) {
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
  function C() {
    if (v.value = e.mask !== void 0 && e.mask.length !== 0 && g(), v.value === !1) {
      r = void 0, l = "", o = "";
      return;
    }
    const A = pr[e.mask] === void 0 ? e.mask : pr[e.mask], $ = typeof e.fillMask == "string" && e.fillMask.length !== 0 ? e.fillMask.slice(0, 1) : "_", D = $.replace(kr, "\\$&"), _ = [], S = [], T = [];
    let H = e.reverseFillMask === !0, E = "", Q = "";
    A.replace(d.value.tokenRegexMask, (B, G, z, ne, P) => {
      if (ne !== void 0) {
        const I = d.value.tokenMap[ne];
        T.push(I), Q = I.negate, H === !0 && (S.push("(?:" + Q + "+)?(" + I.pattern + "+)?(?:" + Q + "+)?(" + I.pattern + "+)?"), H = !1), S.push("(?:" + Q + "+)?(" + I.pattern + ")?");
      } else if (z !== void 0)
        E = "\\" + (z === "\\" ? "" : z), T.push(z), _.push("([^" + E + "]+)?" + E + "?");
      else {
        const I = G !== void 0 ? G : P;
        E = I === "\\" ? "\\\\\\\\" : I.replace(kr, "\\\\$&"), T.push(I), _.push("([^" + E + "]+)?" + E + "?");
      }
    });
    const j = new RegExp("^" + _.join("") + "(" + (E === "" ? "." : "[^" + E + "]") + "+)?" + (E === "" ? "" : "[" + E + "]*") + "$"), N = S.length - 1, Z = S.map((B, G) => G === 0 && e.reverseFillMask === !0 ? new RegExp("^" + D + "*" + B) : G === N ? new RegExp("^" + B + "(" + (Q === "" ? "." : Q) + "+)?" + (e.reverseFillMask === !0 ? "$" : D + "*")) : new RegExp("^" + B));
    i = T, r = (B) => {
      const G = j.exec(e.reverseFillMask === !0 ? B : B.slice(0, T.length + 1));
      G !== null && (B = G.slice(1).join(""));
      const z = [], ne = Z.length;
      for (let P = 0, I = B; P < ne; P++) {
        const de = Z[P].exec(I);
        if (de === null) break;
        I = I.slice(de.shift().length), z.push(...de);
      }
      return z.length !== 0 ? z.join("") : B;
    }, l = T.map((B) => typeof B == "string" ? B : Dt).join(""), o = l.split(Dt).join($);
  }
  function k(A, $, D) {
    const _ = n.value, S = _.selectionEnd, T = _.value.length - S, H = K(A);
    $ === !0 && C();
    const E = L(H, $), Q = e.fillMask !== !1 ? X(E) : E, j = m.value !== Q;
    _.value !== Q && (_.value = Q), j === !0 && (m.value = Q), document.activeElement === _ && nt(() => {
      if (Q === o) {
        const Z = e.reverseFillMask === !0 ? o.length : 0;
        _.setSelectionRange(Z, Z, "forward");
        return;
      }
      if (D === "insertFromPaste" && e.reverseFillMask !== !0) {
        const Z = _.selectionEnd;
        let B = S - 1;
        for (let G = u; G <= B && G < Z; G++) l[G] !== Dt && B++;
        b.right(_, B);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(D) !== -1) {
        const Z = e.reverseFillMask === !0 ? S === 0 ? Q.length > E.length ? 1 : 0 : Math.max(0, Q.length - (Q === o ? 0 : Math.min(E.length, T) + 1)) + 1 : S;
        _.setSelectionRange(Z, Z, "forward");
        return;
      }
      if (e.reverseFillMask === !0) if (j === !0) {
        const Z = Math.max(0, Q.length - (Q === o ? 0 : Math.min(E.length, T + 1)));
        Z === 1 && S === 1 ? _.setSelectionRange(Z, Z, "forward") : b.rightReverse(_, Z);
      } else {
        const Z = Q.length - T;
        _.setSelectionRange(Z, Z, "backward");
      }
      else if (j === !0) {
        const Z = Math.max(0, l.indexOf(Dt), Math.min(E.length, S) - 1);
        b.right(_, Z);
      } else {
        const Z = S - 1;
        b.right(_, Z);
      }
    });
    const N = e.unmaskedValue === !0 ? K(Q) : Q;
    String(e.modelValue) !== N && (e.modelValue !== null || N !== "") && a(N, !0);
  }
  function y(A, $, D) {
    const _ = L(K(A.value));
    $ = Math.max(0, l.indexOf(Dt), Math.min(_.length, $)), u = $, A.setSelectionRange($, D, "forward");
  }
  const b = {
    left(A, $) {
      const D = l.slice($ - 1).indexOf(Dt) === -1;
      let _ = Math.max(0, $ - 1);
      for (; _ >= 0; _--) if (l[_] === Dt) {
        $ = _, D === !0 && $++;
        break;
      }
      if (_ < 0 && l[$] !== void 0 && l[$] !== Dt) return b.right(A, 0);
      $ >= 0 && A.setSelectionRange($, $, "backward");
    },
    right(A, $) {
      const D = A.value.length;
      let _ = Math.min(D, $ + 1);
      for (; _ <= D; _++) if (l[_] === Dt) {
        $ = _;
        break;
      } else l[_ - 1] === Dt && ($ = _);
      if (_ > D && l[$ - 1] !== void 0 && l[$ - 1] !== Dt) return b.left(A, D);
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
      if (_ < 0 && D[$] !== void 0 && D[$] !== Dt) return b.rightReverse(A, 0);
      $ >= 0 && A.setSelectionRange($, $, "backward");
    },
    rightReverse(A, $) {
      const D = A.value.length, _ = p(D), S = _.slice(0, $ + 1).indexOf(Dt) === -1;
      let T = Math.min(D, $ + 1);
      for (; T <= D; T++) if (_[T - 1] === Dt) {
        $ = T, $ > 0 && S === !0 && $--;
        break;
      }
      if (T > D && _[$ - 1] !== void 0 && _[$ - 1] !== Dt) return b.leftReverse(A, D);
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
      const S = b[(A.keyCode === 39 ? "right" : "left") + (e.reverseFillMask === !0 ? "Reverse" : "")];
      if (A.preventDefault(), S($, c === D ? _ : D), A.shiftKey) {
        const T = $.selectionStart;
        $.setSelectionRange(Math.min(c, T), Math.max(c, T), "forward");
      }
    } else A.keyCode === 8 && e.reverseFillMask !== !0 && D === _ ? (b.left($, D), $.setSelectionRange($.selectionStart, _, "backward")) : A.keyCode === 46 && e.reverseFillMask === !0 && D === _ && (b.rightReverse($, _), $.setSelectionRange(D, $.selectionEnd, "forward"));
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
    innerValue: m,
    hasMask: v,
    moveCursorForPaste: y,
    updateMaskValue: k,
    onMaskedKeydown: x,
    onMaskedClick: w
  };
}
const yv = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/, pv = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u, Cv = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/, kv = /[a-z0-9_ -]$/i;
function Au(e) {
  return function(a) {
    if (a.type === "compositionend" || a.type === "change") {
      if (a.target.qComposing !== !0) return;
      a.target.qComposing = !1, e(a);
    } else a.type === "compositionupdate" && a.target.qComposing !== !0 && typeof a.data == "string" && (Je.is.firefox === !0 ? kv.test(a.data) === !1 : yv.test(a.data) === !0 || pv.test(a.data) === !0 || Cv.test(a.data) === !0) && (a.target.qComposing = !0);
  };
}
var xi = re({
  name: "QInput",
  inheritAttrs: !1,
  props: {
    ...Ql,
    ...hv,
    ...oa,
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
    const { proxy: n } = be(), { $q: l } = n, o = {};
    let i = NaN, r, u, c = null, d;
    const v = V(null), m = ri(e), { innerValue: g, hasMask: h, moveCursorForPaste: p, updateMaskValue: C, onMaskedKeydown: k, onMaskedClick: y } = bv(e, t, H, v), b = Bu(e, !0), w = s(() => Ja(g.value)), x = Au(S), L = Kl({ changeEvent: !0 }), M = s(() => e.type === "textarea" || e.autogrow === !0), K = s(() => M.value === !0 || [
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
      return B.onCompositionstart = B.onCompositionupdate = B.onCompositionend = x, h.value === !0 && (B.onKeydown = k, B.onClick = y), e.autogrow === !0 && (B.onAnimationend = T), B;
    }), A = s(() => {
      const B = {
        tabindex: 0,
        "data-autofocus": e.autofocus === !0 || void 0,
        rows: e.type === "textarea" ? 6 : void 0,
        "aria-label": e.label,
        name: m.value,
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
      if (h.value === !0) {
        if (u === !0 && (u = !1, String(B) === i))
          return;
        C(B);
      } else g.value !== B && (g.value = B, e.type === "number" && o.hasOwnProperty("value") === !0 && (r === !0 ? r = !1 : delete o.value));
      e.autogrow === !0 && nt(E);
    }), se(() => e.autogrow, (B) => {
      B === !0 ? nt(E) : v.value !== null && a.rows > 0 && (v.value.style.height = "auto");
    }), se(() => e.dense, () => {
      e.autogrow === !0 && nt(E);
    });
    function $() {
      Tn(() => {
        const B = document.activeElement;
        v.value !== null && v.value !== B && (B === null || B.id !== L.targetUid.value) && v.value.focus({ preventScroll: !0 });
      });
    }
    function D() {
      var B;
      (B = v.value) == null || B.select();
    }
    function _(B) {
      if (h.value === !0 && e.reverseFillMask !== !0) {
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
      if (h.value === !0) C(G, !1, B.inputType);
      else if (H(G), K.value === !0 && B.target === document.activeElement) {
        const { selectionStart: z, selectionEnd: ne } = B.target;
        z !== void 0 && ne !== void 0 && nt(() => {
          B.target === document.activeElement && G.indexOf(B.target.value) === 0 && B.target.setSelectionRange(z, ne);
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
          const G = B.parentNode.style, { scrollTop: z } = B, { overflowY: ne, maxHeight: P } = l.platform.is.firefox === !0 ? {} : window.getComputedStyle(B), I = ne !== void 0 && ne !== "scroll";
          I === !0 && (B.style.overflowY = "hidden"), G.marginBottom = B.scrollHeight - 1 + "px", B.style.height = "1px", B.style.height = B.scrollHeight + "px", I === !0 && (B.style.overflowY = parseInt(P, 10) < B.scrollHeight ? "auto" : "hidden"), G.marginBottom = "", B.scrollTop = z;
        }
      });
    }
    function Q(B) {
      x(B), c !== null && (clearTimeout(c), c = null), d == null || d(), t("change", B.target.value);
    }
    function j(B) {
      B !== void 0 && wt(B), c !== null && (clearTimeout(c), c = null), d == null || d(), r = !1, u = !1, delete o.value, e.type !== "file" && setTimeout(() => {
        v.value !== null && (v.value.value = g.value !== void 0 ? g.value : "");
      });
    }
    function N() {
      return o.hasOwnProperty("value") === !0 ? o.value : g.value !== void 0 ? g.value : "";
    }
    tt(() => {
      j();
    }), ht(() => {
      e.autogrow === !0 && E();
    }), Object.assign(L, {
      innerValue: g,
      fieldClass: s(() => `q-${M.value === !0 ? "textarea" : "input"}` + (e.autogrow === !0 ? " q-textarea--autogrow" : "")),
      hasShadow: s(() => e.type !== "file" && typeof e.shadowText == "string" && e.shadowText.length !== 0),
      inputRef: v,
      emitValue: H,
      hasValue: w,
      floatingLabel: s(() => w.value === !0 && (e.type !== "number" || isNaN(g.value) === !1) || Ja(e.displayValue)),
      getControl: () => f(M.value === !0 ? "textarea" : "input", {
        ref: v,
        class: ["q-field__native q-placeholder", e.inputClass],
        style: e.inputStyle,
        ...A.value,
        ...X.value,
        ...e.type !== "file" ? { value: N() } : b.value
      }),
      getShadowControl: () => f("div", { class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (M.value === !0 ? "" : " text-no-wrap") }, [f("span", { class: "invisible" }, N()), f("span", e.shadowText)])
    });
    const Z = Wl(L);
    return Object.assign(n, {
      focus: $,
      select: D,
      getNativeElement: () => v.value
    }), zt(n, "nativeEl", () => v.value), Z;
  }
});
const Sr = {
  threshold: 0,
  root: null,
  rootMargin: "0px"
};
function wr(e, t, a) {
  var i;
  let n, l, o;
  typeof a == "function" ? (n = a, l = Sr, o = t.cfg === void 0) : (n = a.handler, l = Object.assign({}, Sr, a.cfg), o = t.cfg === void 0 || ra(t.cfg, l) === !1), t.handler !== n && (t.handler = n), o === !0 && (t.cfg = l, (i = t.observer) == null || i.unobserve(e), t.observer = new IntersectionObserver(([r]) => {
    if (typeof t.handler == "function") {
      if (r.rootBounds === null && document.body.contains(e) === !0) {
        t.observer.unobserve(e), t.observer.observe(e);
        return;
      }
      (t.handler(r, t.observer) === !1 || t.once === !0 && r.isIntersecting === !0) && Du(e);
    }
  }, l), t.observer.observe(e));
}
function Du(e) {
  var a;
  const t = e.__qvisible;
  t !== void 0 && ((a = t.observer) == null || a.unobserve(e), delete e.__qvisible);
}
var Sv = ua({
  name: "intersection",
  mounted(e, { modifiers: t, value: a }) {
    const n = { once: t.once === !0 };
    wr(e, n, a), e.__qvisible = n;
  },
  updated(e, t) {
    const a = e.__qvisible;
    a !== void 0 && wr(e, a, t.value);
  },
  beforeUnmount: Du
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
    const n = V(ta.value === !0 ? e.ssrPrerender : !1), l = s(() => e.root !== void 0 || e.margin !== void 0 || e.threshold !== void 0 ? {
      handler: u,
      cfg: {
        root: e.root,
        rootMargin: e.margin,
        threshold: e.threshold
      }
    } : u), o = s(() => e.disable !== !0 && (ta.value !== !0 || e.once !== !0 || e.ssrPrerender !== !0)), i = s(() => [[
      Sv,
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
      const d = e.transition ? [f(Vt, { name: "q-transition--" + e.transition }, c)] : c();
      return na(e.tag, { class: "q-intersection" }, d, "main", o.value, () => i.value);
    };
  }
});
const wv = ["ul", "ol"];
var xv = re({
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
    const a = rt(e, be().proxy.$q), n = s(() => wv.includes(e.tag) ? null : "list"), l = s(() => "q-list" + (e.bordered === !0 ? " q-list--bordered" : "") + (e.dense === !0 ? " q-list--dense" : "") + (e.separator === !0 ? " q-list--separator" : "") + (a.value === !0 ? " q-list--dark" : "") + (e.padding === !0 ? " q-list--padding" : ""));
    return () => f(e.tag, {
      class: l.value,
      role: n.value
    }, De(t.default));
  }
});
const xr = [
  34,
  37,
  40,
  33,
  39,
  38
], _v = Object.keys(hi);
var $v = re({
  name: "QKnob",
  props: {
    ...oa,
    ...hi,
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
    const { proxy: n } = be(), { $q: l } = n, o = V(e.modelValue), i = V(!1), r = s(() => isNaN(e.innerMin) === !0 || e.innerMin < e.min ? e.min : e.innerMin), u = s(() => isNaN(e.innerMax) === !0 || e.innerMax > e.max ? e.max : e.innerMax);
    let c;
    function d() {
      o.value = e.modelValue === null ? r.value : mt(e.modelValue, r.value, u.value), $(!0);
    }
    se(() => `${e.modelValue}|${r.value}|${u.value}`, d), d();
    const v = s(() => e.disable === !1 && e.readonly === !1), m = s(() => "q-knob non-selectable" + (v.value === !0 ? " q-knob--editable" : e.disable === !0 ? " disabled" : "")), g = s(() => (String(e.step).trim().split(".")[1] || "").length), h = s(() => e.step === 0 ? 1 : e.step), p = s(() => e.instantFeedback === !0 || i.value === !0), C = l.platform.is.mobile === !0 ? s(() => v.value === !0 ? { onClick: M } : {}) : s(() => v.value === !0 ? {
      onMousedown: L,
      onClick: M,
      onKeydown: K,
      onKeyup: A
    } : {}), k = s(() => v.value === !0 ? { tabindex: e.tabindex } : { [`aria-${e.disable === !0 ? "disabled" : "readonly"}`]: "true" }), y = s(() => {
      const S = {};
      return _v.forEach((T) => {
        S[T] = e[T];
      }), S;
    });
    function b(S) {
      S.isFinal ? (X(S.evt, !0), i.value = !1) : (S.isFirst && (x(), i.value = !0), X(S.evt));
    }
    const w = s(() => [[
      Jt,
      b,
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
      if (xr.includes(S.keyCode) === !1) return;
      Ye(S);
      const T = ([34, 33].includes(S.keyCode) ? 10 : 1) * h.value, H = [
        34,
        37,
        40
      ].includes(S.keyCode) ? -T : T;
      o.value = mt(parseFloat((o.value + H).toFixed(g.value)), r.value, u.value), $();
    }
    function X(S, T) {
      const H = Ut(S), E = Math.abs(H.top - c.top), Q = Math.sqrt(E ** 2 + Math.abs(H.left - c.left) ** 2);
      let j = Math.asin(E / Q) * (180 / Math.PI);
      H.top < c.top ? j = c.left < H.left ? 90 - j : 270 + j : j = c.left < H.left ? j + 90 : 270 - j, l.lang.rtl === !0 ? j = yl(-j - e.angle, 0, 360) : e.angle && (j = yl(j - e.angle, 0, 360)), e.reverse === !0 && (j = 360 - j);
      let N = e.min + j / 360 * (e.max - e.min);
      if (h.value !== 0) {
        const Z = N % h.value;
        N = N - Z + (Math.abs(Z) >= h.value / 2 ? (Z < 0 ? -1 : 1) * h.value : 0), N = parseFloat(N.toFixed(g.value));
      }
      N = mt(N, r.value, u.value), a("dragValue", N), o.value !== N && (o.value = N), $(T);
    }
    function A(S) {
      xr.includes(S.keyCode) && $(!0);
    }
    function $(S) {
      e.modelValue !== o.value && a("update:modelValue", o.value), S === !0 && a("change", o.value);
    }
    const D = Gn(e);
    function _() {
      return f("input", D.value);
    }
    return () => {
      const S = {
        class: m.value,
        role: "slider",
        "aria-valuemin": r.value,
        "aria-valuemax": u.value,
        "aria-valuenow": e.modelValue,
        ...k.value,
        ...y.value,
        value: o.value,
        instantFeedback: p.value,
        ...C.value
      }, T = { default: t.default };
      return v.value === !0 && e.name !== void 0 && (T.internal = _), na(bi, S, T, "knob", v.value, () => w.value);
    };
  }
});
const { passive: _r } = gt, qv = [
  "both",
  "horizontal",
  "vertical"
];
var Lu = re({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (e) => qv.includes(e),
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
      const v = Math.max(0, Aa(l)), m = Il(l), g = {
        top: v - a.position.top,
        left: m - a.position.left
      };
      if (e.axis === "vertical" && g.top === 0 || e.axis === "horizontal" && g.left === 0) return;
      const h = Math.abs(g.top) >= Math.abs(g.left) ? g.top < 0 ? "up" : "down" : g.left < 0 ? "left" : "right";
      a.position = {
        top: v,
        left: m
      }, a.directionChanged = a.direction !== h, a.delta = g, a.directionChanged === !0 && (a.direction = h, a.inflectionPoint = a.position), t("scroll", { ...a });
    }
    function r() {
      l = fa(o, e.scrollTarget), l.addEventListener("scroll", c, _r), c(!0);
    }
    function u() {
      l !== void 0 && (l.removeEventListener("scroll", c, _r), l = void 0);
    }
    function c(v) {
      if (v === !0 || e.debounce === 0 || e.debounce === "0") i();
      else if (n === null) {
        const [m, g] = e.debounce ? [setTimeout(i, e.debounce), clearTimeout] : [requestAnimationFrame(i), cancelAnimationFrame];
        n = () => {
          g(m), n = null;
        };
      }
    }
    const { proxy: d } = be();
    return se(() => d.$q.lang.rtl, i), ht(() => {
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
    const { proxy: { $q: n } } = be(), l = V(null), o = V(n.screen.height), i = V(e.container === !0 ? 0 : n.screen.width), r = V({
      position: 0,
      direction: "down",
      inflectionPoint: 0
    }), u = V(0), c = V(ta.value === !0 ? 0 : gl()), d = s(() => "q-layout q-layout--" + (e.container === !0 ? "containerized" : "standard")), v = s(() => e.container === !1 ? { minHeight: n.screen.height + "px" } : null), m = s(() => c.value !== 0 ? { [n.lang.rtl === !0 ? "left" : "right"]: `${c.value}px` } : null), g = s(() => c.value !== 0 ? {
      [n.lang.rtl === !0 ? "right" : "left"]: 0,
      [n.lang.rtl === !0 ? "left" : "right"]: `-${c.value}px`,
      width: `calc(100% + ${c.value}px)`
    } : null);
    function h(w) {
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
      o.value !== x && (M = !0, o.value = x, e.onScrollHeight !== void 0 && a("scrollHeight", x), k()), i.value !== L && (M = !0, i.value = L), M === !0 && e.onResize !== void 0 && a("resize", w);
    }
    function C({ height: w }) {
      u.value !== w && (u.value = w, k());
    }
    function k() {
      if (e.container === !0) {
        const w = o.value > u.value ? gl() : 0;
        c.value !== w && (c.value = w);
      }
    }
    let y = null;
    const b = {
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
        b[w][x] = L;
      }
    };
    if (La(an, b), gl() > 0) {
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
      se(() => e.container !== !0 ? "add" : "remove", K), e.container !== !0 && K("add"), zl(() => {
        K("remove");
      });
    }
    return () => {
      const w = $t(t.default, [f(Lu, { onScroll: h }), f(Ga, { onResize: p })]), x = f("div", {
        class: d.value,
        style: v.value,
        ref: e.container === !0 ? void 0 : l,
        tabindex: -1
      }, w);
      return e.container === !0 ? f("div", {
        class: "q-layout-container overflow-hidden",
        ref: l
      }, [f(Ga, { onResize: C }), f("div", {
        class: "absolute-full",
        style: m.value
      }, [f("div", {
        class: "scroll",
        style: g.value
      }, [x])])]) : x;
    };
  }
});
const Bv = [
  "horizontal",
  "vertical",
  "cell",
  "none"
];
var Tv = re({
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
      validator: (e) => Bv.includes(e)
    }
  },
  setup(e, { slots: t }) {
    const a = rt(e, be().proxy.$q), n = s(() => `q-markup-table q-table__container q-table__card q-table--${e.separator}-separator` + (a.value === !0 ? " q-table--dark q-table__card--dark q-dark" : "") + (e.dense === !0 ? " q-table--dense" : "") + (e.flat === !0 ? " q-table--flat" : "") + (e.bordered === !0 ? " q-table--bordered" : "") + (e.square === !0 ? " q-table--square" : "") + (e.wrapCells === !1 ? " q-table--no-wrap" : ""));
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
    const { isHydrated: a } = Zs();
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
const Mv = () => f("svg", {
  key: "svg",
  class: "q-radio__bg absolute non-selectable",
  viewBox: "0 0 24 24"
}, [f("path", { d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12" }), f("path", {
  class: "q-radio__check",
  d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
})]);
var Av = re({
  name: "QRadio",
  props: {
    ...it,
    ...wa,
    ...oa,
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
    const { proxy: n } = be(), l = rt(e, n.$q), o = xa(e, Hs), i = V(null), { refocusTargetEl: r, refocusTarget: u } = Os(e, i), c = s(() => ya(e.modelValue) === ya(e.val)), d = s(() => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (e.disable === !0 ? " disabled" : "") + (l.value === !0 ? " q-radio--dark" : "") + (e.dense === !0 ? " q-radio--dense" : "") + (e.leftLabel === !0 ? " reverse" : "")), v = s(() => {
      const b = e.color !== void 0 && (e.keepColor === !0 || c.value === !0) ? ` text-${e.color}` : "";
      return `q-radio__inner relative-position q-radio__inner--${c.value === !0 ? "truthy" : "falsy"}${b}`;
    }), m = s(() => (c.value === !0 ? e.checkedIcon : e.uncheckedIcon) || null), g = s(() => e.disable === !0 ? -1 : e.tabindex || 0), h = za(s(() => {
      const b = { type: "radio" };
      return e.name !== void 0 && Object.assign(b, {
        ".checked": c.value === !0,
        "^checked": c.value === !0 ? "checked" : void 0,
        name: e.name,
        value: e.val
      }), b;
    }));
    function p(b) {
      b !== void 0 && (Ye(b), u(b)), e.disable !== !0 && c.value !== !0 && a("update:modelValue", e.val, b);
    }
    function C(b) {
      (b.keyCode === 13 || b.keyCode === 32) && Ye(b);
    }
    function k(b) {
      (b.keyCode === 13 || b.keyCode === 32) && p(b);
    }
    Object.assign(n, { set: p });
    const y = Mv();
    return () => {
      const b = m.value !== null ? [f("div", {
        key: "icon",
        class: "q-radio__icon-container absolute-full flex flex-center no-wrap"
      }, [f(st, {
        class: "q-radio__icon",
        name: m.value
      })])] : [y];
      e.disable !== !0 && h(b, "unshift", " q-radio__native q-ma-none q-pa-none");
      const w = [f("div", {
        class: v.value,
        style: o.value,
        "aria-hidden": "true"
      }, b)];
      r.value !== null && w.push(r.value);
      const x = e.label !== void 0 ? $t(t.default, [e.label]) : De(t.default);
      return x !== void 0 && w.push(f("div", { class: "q-radio__label q-anchor--skip" }, x)), f("div", {
        ref: i,
        class: d.value,
        tabindex: g.value,
        role: "radio",
        "aria-label": e.label,
        "aria-checked": c.value === !0 ? "true" : "false",
        "aria-disabled": e.disable === !0 ? "true" : void 0,
        onClick: p,
        onKeydown: C,
        onKeyup: k
      }, w);
    };
  }
}), Dv = re({
  name: "QToggle",
  props: {
    ...Ns,
    icon: String,
    iconColor: String
  },
  emits: js,
  setup(e) {
    function t(a, n) {
      const l = s(() => (a.value === !0 ? e.checkedIcon : n.value === !0 ? e.indeterminateIcon : e.uncheckedIcon) || e.icon), o = s(() => a.value === !0 ? e.iconColor : null);
      return () => [f("div", { class: "q-toggle__track" }), f("div", { class: "q-toggle__thumb absolute flex flex-center no-wrap" }, l.value !== void 0 ? [f(st, {
        name: l.value,
        color: o.value
      })] : void 0)];
    }
    return Qs("toggle", t);
  }
});
const Vu = {
  radio: Av,
  checkbox: In,
  toggle: Dv
}, Lv = Object.keys(Vu);
function po(e, t) {
  if (typeof e == "function") return e;
  const a = e !== void 0 ? e : t;
  return (n) => n[a];
}
var Vv = re({
  name: "QOptionGroup",
  props: {
    ...it,
    modelValue: { required: !0 },
    options: {
      type: Array,
      validator: (e) => e.every(Nt),
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    name: String,
    type: {
      type: String,
      default: "radio",
      validator: (e) => Lv.includes(e)
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
    const { proxy: { $q: n } } = be(), l = Array.isArray(e.modelValue);
    e.type === "radio" ? l === !0 && console.error("q-option-group: model should not be array") : l === !1 && console.error("q-option-group: model should be array in your case");
    const o = rt(e, n), i = s(() => Vu[e.type]), r = s(() => po(e.optionValue, "value")), u = s(() => po(e.optionLabel, "label")), c = s(() => po(e.optionDisable, "disable")), d = s(() => e.options.map((h) => ({
      val: r.value(h),
      name: h.name === void 0 ? e.name : h.name,
      disable: e.disable || c.value(h),
      leftLabel: h.leftLabel === void 0 ? e.leftLabel : h.leftLabel,
      color: h.color === void 0 ? e.color : h.color,
      checkedIcon: h.checkedIcon,
      uncheckedIcon: h.uncheckedIcon,
      dark: h.dark === void 0 ? o.value : h.dark,
      size: h.size === void 0 ? e.size : h.size,
      dense: e.dense,
      keepColor: h.keepColor === void 0 ? e.keepColor : h.keepColor
    }))), v = s(() => "q-option-group q-gutter-x-sm" + (e.inline === !0 ? " q-option-group--inline" : "")), m = s(() => {
      const h = { role: "group" };
      return e.type === "radio" && (h.role = "radiogroup", e.disable === !0 && (h["aria-disabled"] = "true")), h;
    });
    function g(h) {
      t("update:modelValue", h);
    }
    return () => f("div", {
      class: v.value,
      ...m.value
    }, e.options.map((h, p) => {
      const C = a["label-" + p] !== void 0 ? () => a["label-" + p](h) : a.label !== void 0 ? () => a.label(h) : void 0;
      return f("div", [f(i.value, {
        label: C === void 0 ? u.value(h) : null,
        modelValue: e.modelValue,
        "onUpdate:modelValue": g,
        ...d.value[p]
      }, C)]);
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
    const { proxy: { $q: a } } = be(), n = Kt(an, vt);
    if (n === vt)
      return console.error("QPage needs to be a deep child of QLayout"), vt;
    if (Kt("_q_pc_", vt) === vt)
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
    const { proxy: { $q: a } } = be(), n = Kt(an, vt);
    if (n === vt)
      return console.error("QPageContainer needs to be child of QLayout"), vt;
    La(ic, !0);
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
const No = {
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
  const { props: e, proxy: { $q: t } } = be(), a = Kt(an, vt);
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
    let v = 0, m = 0;
    const g = n.value, h = t.lang.rtl === !0 ? -1 : 1;
    g.top === !0 && l.value !== 0 ? m = `${l.value}px` : g.bottom === !0 && i.value !== 0 && (m = `${-i.value}px`), g.left === !0 && r.value !== 0 ? v = `${h * r.value}px` : g.right === !0 && o.value !== 0 && (v = `${-h * o.value}px`);
    const p = { transform: `translate(${v}, ${m})` };
    return e.offset && (p.margin = `${e.offset[1]}px ${e.offset[0]}px`), g.vertical === !0 ? (r.value !== 0 && (p[t.lang.rtl === !0 ? "right" : "left"] = `${r.value}px`), o.value !== 0 && (p[t.lang.rtl === !0 ? "left" : "right"] = `${o.value}px`)) : g.horizontal === !0 && (l.value !== 0 && (p.top = `${l.value}px`), i.value !== 0 && (p.bottom = `${i.value}px`)), p;
  }), c = s(() => `q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand === !0 ? "expand" : "shrink"}`);
  function d(v) {
    const m = De(v.default);
    return f("div", {
      class: c.value,
      style: u.value
    }, e.expand === !0 ? m : [f("div", m)]);
  }
  return {
    $layout: a,
    getStickyContent: d
  };
}
re({
  name: "QPageScroller",
  props: {
    ...No,
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
      ...No.offset,
      default: () => [18, 18]
    }
  },
  emits: ["click"],
  setup(e, { slots: t, emit: a }) {
    const { proxy: { $q: n } } = be(), { $layout: l, getStickyContent: o } = zu(), i = V(null);
    let r;
    const u = s(() => l.height.value - (l.isContainer.value === !0 ? l.containerHeight.value : n.screen.height));
    function c() {
      return e.reverse === !0 ? u.value - l.scroll.value.position > e.scrollOffset : l.scroll.value.position > e.scrollOffset;
    }
    const d = V(c());
    function v() {
      const C = c();
      d.value !== C && (d.value = C);
    }
    function m() {
      e.reverse === !0 ? r === void 0 && (r = se(u, v)) : g();
    }
    se(l.scroll, v), se(() => e.reverse, m);
    function g() {
      r !== void 0 && (r(), r = void 0);
    }
    function h(C) {
      Cn(fa(l.isContainer.value === !0 ? i.value : l.rootRef.value), e.reverse === !0 ? l.height.value : 0, e.duration), a("click", C);
    }
    function p() {
      return d.value === !0 ? f("div", {
        ref: i,
        class: "q-page-scroller",
        onClick: h
      }, o(t)) : null;
    }
    return m(), tt(g), () => f(Vt, { name: "q-transition--fade" }, p);
  }
});
re({
  name: "QPageSticky",
  props: No,
  setup(e, { slots: t }) {
    const { getStickyContent: a } = zu();
    return () => a(t);
  }
});
function sl(e, t) {
  return [!0, !1].includes(e) ? e : t;
}
var zv = re({
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
      values: (e) => e === "" || ws.includes(e)
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
    const { proxy: a } = be(), { $q: n } = a, l = rt(e, n), o = s(() => parseInt(e.min, 10)), i = s(() => parseInt(e.max, 10)), r = s(() => parseInt(e.maxPages, 10)), u = s(() => h.value + " / " + i.value), c = s(() => sl(e.boundaryLinks, e.input)), d = s(() => sl(e.boundaryNumbers, !e.input)), v = s(() => sl(e.directionLinks, e.input)), m = s(() => sl(e.ellipses, !e.input)), g = V(null), h = s({
      get: () => e.modelValue,
      set: (T) => {
        if (T = parseInt(T, 10), e.disable || isNaN(T)) return;
        const H = mt(T, o.value, i.value);
        e.modelValue !== H && t("update:modelValue", H);
      }
    });
    se(() => `${o.value}|${i.value}`, () => {
      h.value = e.modelValue;
    });
    const p = s(() => "q-pagination row no-wrap items-center" + (e.disable === !0 ? " disabled" : "")), C = s(() => e.gutter in kl ? `${kl[e.gutter]}px` : e.gutter || null), k = s(() => C.value !== null ? `--q-pagination-gutter-parent:-${C.value};--q-pagination-gutter-child:${C.value}` : null), y = s(() => {
      const T = [
        e.iconFirst || n.iconSet.pagination.first,
        e.iconPrev || n.iconSet.pagination.prev,
        e.iconNext || n.iconSet.pagination.next,
        e.iconLast || n.iconSet.pagination.last
      ];
      return n.lang.rtl === !0 ? T.reverse() : T;
    }), b = s(() => ({
      "aria-disabled": e.disable === !0 ? "true" : "false",
      role: "navigation"
    })), w = s(() => ti(e, "flat")), x = s(() => ({
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
      let T = Math.max(r.value, 1 + (m.value ? 2 : 0) + (d.value ? 2 : 0));
      const H = {
        pgFrom: o.value,
        pgTo: i.value,
        ellipsesStart: !1,
        ellipsesEnd: !1,
        boundaryStart: !1,
        boundaryEnd: !1,
        marginalStyle: { minWidth: `${Math.max(2, String(i.value).length)}em` }
      };
      return r.value && T < i.value - o.value + 1 && (T = 1 + Math.floor(T / 2) * 2, H.pgFrom = Math.max(o.value, Math.min(i.value - T + 1, e.modelValue - Math.floor(T / 2))), H.pgTo = Math.min(i.value, H.pgFrom + T - 1), d.value && (H.boundaryStart = !0, H.pgFrom++), m.value && H.pgFrom > o.value + (d.value ? 1 : 0) && (H.ellipsesStart = !0, H.pgFrom++), d.value && (H.boundaryEnd = !0, H.pgTo--), m.value && H.pgTo < i.value - (d.value ? 1 : 0) && (H.ellipsesEnd = !0, H.pgTo--)), H;
    });
    function X(T) {
      h.value = T;
    }
    function A(T) {
      h.value = h.value + T;
    }
    function $() {
      h.value = g.value, g.value = null, n.platform.is.mobile === !0 && document.activeElement.blur();
    }
    function D(T) {
      g.value = T;
    }
    function _(T) {
      aa(T, 13) === !0 && $();
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
        ...b.value
      }, [f("div", {
        class: "q-pagination__content row no-wrap items-center",
        style: k.value
      }, [
        ...T,
        e.input === !0 ? f(xi, {
          class: "inline",
          style: { width: `${u.value.length / 1.5}em` },
          type: "number",
          dense: !0,
          value: g.value,
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
const { passive: ul } = gt;
var Pv = re({
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
    const n = V(0), l = V(null), o = V(null), i = V(null);
    let r, u, c, d, v, m;
    se(() => e.height, () => {
      r === !0 && h();
    }), se(() => e.scrollTarget, () => {
      r === !0 && (y(), k());
    });
    let g = (b) => {
      n.value = b, e.onScroll !== void 0 && a("scroll", b);
    };
    function h() {
      let b, w, x;
      m === window ? (b = 0, x = w = window.innerHeight) : (b = Cl(m).top, w = wn(m), x = b + w);
      const L = Cl(l.value).top, M = L + e.height;
      if (v !== void 0 || M > b && L < x) {
        const K = (x - L) / (e.height + w);
        p((c - e.height) * K * e.speed), g(K);
      }
    }
    let p = (b) => {
      u.style.transform = `translate3d(-50%,${Math.round(b)}px,0)`;
    };
    function C() {
      c = u.naturalHeight || u.videoHeight || wn(u), r === !0 && h();
    }
    function k() {
      r = !0, m = fa(l.value, e.scrollTarget), m.addEventListener("scroll", h, ul), window.addEventListener("resize", d, ul), h();
    }
    function y() {
      r === !0 && (r = !1, m.removeEventListener("scroll", h, ul), window.removeEventListener("resize", d, ul), m = void 0, p.cancel(), g.cancel(), d.cancel());
    }
    return ht(() => {
      p = Co(p), g = Co(g), d = Co(C), u = t.media !== void 0 ? o.value.children[0] : i.value, u.onload = u.onloadstart = u.loadedmetadata = C, C(), u.style.display = "initial", window.IntersectionObserver !== void 0 ? (v = new IntersectionObserver((b) => {
        (b[0].isIntersecting === !0 ? k : y)();
      }), v.observe(l.value)) : k();
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
    const { proxy: n } = be(), { $q: l } = n, o = V(null), i = V(""), r = V("");
    let u = !1;
    const c = s(() => zt({
      initialValue: i.value,
      validate: e.validate,
      set: d,
      cancel: v,
      updatePosition: m
    }, "value", () => r.value, (w) => {
      r.value = w;
    }));
    function d() {
      e.validate(r.value) !== !1 && (g() === !0 && (a("save", r.value, i.value), a("update:modelValue", r.value)), h());
    }
    function v() {
      g() === !0 && a("cancel", r.value, i.value), h();
    }
    function m() {
      nt(() => {
        o.value.updatePosition();
      });
    }
    function g() {
      return ra(r.value, i.value) === !1;
    }
    function h() {
      u = !0, o.value.hide();
    }
    function p() {
      u = !1, i.value = On(e.modelValue), r.value = On(e.modelValue), a("beforeShow");
    }
    function C() {
      a("show");
    }
    function k() {
      u === !1 && g() === !0 && (e.autoSave === !0 && e.validate(r.value) === !0 ? (a("save", r.value, i.value), a("update:modelValue", r.value)) : a("cancel", r.value, i.value)), a("beforeHide");
    }
    function y() {
      a("hide");
    }
    function b() {
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
      updatePosition: m
    }), () => {
      if (e.disable !== !0)
        return f(Ol, {
          ref: o,
          class: "q-popup-edit",
          cover: e.cover,
          onBeforeShow: p,
          onShow: C,
          onBeforeHide: k,
          onHide: y,
          onEscapeKey: v
        }, b);
    };
  }
});
re({
  name: "QPopupProxy",
  props: {
    ...qs,
    breakpoint: {
      type: [String, Number],
      default: 450
    }
  },
  emits: ["show", "hide"],
  setup(e, { slots: t, emit: a, attrs: n }) {
    const { proxy: l } = be(), { $q: o } = l, i = V(!1), r = V(null), u = s(() => parseInt(e.breakpoint, 10)), { canShow: c } = ni({ showing: i });
    function d() {
      return o.screen.width < u.value || o.screen.height < u.value ? "dialog" : "menu";
    }
    const v = V(d()), m = s(() => v.value === "menu" ? { maxHeight: "99vh" } : {});
    se(() => d(), (p) => {
      i.value !== !0 && (v.value = p);
    });
    function g(p) {
      i.value = !0, a("show", p);
    }
    function h(p) {
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
    }), zt(l, "currentComponent", () => ({
      type: v.value,
      ref: r.value
    })), () => {
      const p = {
        ref: r,
        ...m.value,
        ...n,
        onShow: g,
        onHide: h
      };
      let C;
      return v.value === "dialog" ? C = Nl : (C = Ol, Object.assign(p, {
        target: e.target,
        contextMenu: e.contextMenu,
        noParentEvent: !0,
        separateClosePopup: !0
      })), f(C, p, t.default);
    };
  }
});
const Rv = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 10,
  xl: 14
};
function $r(e, t, a) {
  return { transform: t === !0 ? `translateX(${a.lang.rtl === !0 ? "-" : ""}100%) scale3d(${-e},1,1)` : `scale3d(${e},1,1)` };
}
var Pu = re({
  name: "QLinearProgress",
  props: {
    ...it,
    ...wa,
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
    const { proxy: a } = be(), n = rt(e, a.$q), l = xa(e, Rv), o = s(() => e.indeterminate === !0 || e.query === !0), i = s(() => e.reverse !== e.query), r = s(() => ({
      ...l.value !== null ? l.value : {},
      "--q-linear-progress-speed": `${e.animationSpeed}ms`
    })), u = s(() => "q-linear-progress" + (e.color !== void 0 ? ` text-${e.color}` : "") + (e.reverse === !0 || e.query === !0 ? " q-linear-progress--reverse" : "") + (e.rounded === !0 ? " rounded-borders" : "")), c = s(() => $r(e.buffer !== void 0 ? e.buffer : 1, i.value, a.$q)), d = s(() => `with${e.instantFeedback === !0 ? "out" : ""}-transition`), v = s(() => `q-linear-progress__track absolute-full q-linear-progress__track--${d.value} q-linear-progress__track--${n.value === !0 ? "dark" : "light"}` + (e.trackColor !== void 0 ? ` bg-${e.trackColor}` : "")), m = s(() => $r(o.value === !0 ? 1 : e.value, i.value, a.$q)), g = s(() => `q-linear-progress__model absolute-full q-linear-progress__model--${d.value} q-linear-progress__model--${o.value === !0 ? "in" : ""}determinate`), h = s(() => ({ width: `${e.value * 100}%` })), p = s(() => `q-linear-progress__stripe absolute-${e.reverse === !0 ? "right" : "left"} q-linear-progress__stripe--${d.value}`);
    return () => {
      const C = [f("div", {
        class: v.value,
        style: c.value
      }), f("div", {
        class: g.value,
        style: m.value
      })];
      return e.stripe === !0 && o.value === !1 && C.push(f("div", {
        class: p.value,
        style: h.value
      })), f("div", {
        class: u.value,
        style: r.value,
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": e.indeterminate === !0 ? void 0 : e.value
      }, $t(t.default, C));
    };
  }
});
const cn = 40, ko = 20;
var Fv = re({
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
    const { proxy: n } = be(), { $q: l } = n, o = V("pull"), i = V(0), r = V(!1), u = V(-cn), c = V(!1), d = V({}), v = s(() => ({
      opacity: i.value,
      transform: `translateY(${u.value}px) rotate(${i.value * 360}deg)`
    })), m = s(() => "q-pull-to-refresh__puller row flex-center" + (c.value === !0 ? " q-pull-to-refresh__puller--animating" : "") + (e.bgColor !== void 0 ? ` bg-${e.bgColor}` : ""));
    function g(x) {
      if (x.isFinal === !0) {
        r.value === !0 && (r.value = !1, o.value === "pulled" ? (o.value = "refreshing", b({ pos: ko }), C()) : o.value === "pull" && b({
          pos: -cn,
          ratio: 0
        }));
        return;
      }
      if (c.value === !0 || o.value === "refreshing") return !1;
      if (x.isFirst === !0) {
        if (Aa(k) !== 0 || x.direction !== "down")
          return r.value === !0 && (r.value = !1, o.value = "pull", b({
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
      Pt(x.evt);
      const L = Math.min(140, Math.max(0, x.distance.y));
      u.value = L - cn, i.value = mt(L / (ko + cn), 0, 1);
      const M = u.value > ko ? "pulled" : "pull";
      o.value !== M && (o.value = M);
    }
    const h = s(() => {
      const x = { down: !0 };
      return e.noMouse !== !0 && (x.mouse = !0), [[
        Jt,
        g,
        void 0,
        x
      ]];
    }), p = s(() => `q-pull-to-refresh__content${r.value === !0 ? " no-pointer-events" : ""}`);
    function C() {
      a("refresh", () => {
        b({
          pos: -cn,
          ratio: 0
        }, () => {
          o.value = "pull";
        });
      });
    }
    let k, y = null;
    function b({ pos: x, ratio: L }, M) {
      c.value = !0, u.value = x, L !== void 0 && (i.value = L), y !== null && clearTimeout(y), y = setTimeout(() => {
        y = null, c.value = !1, M == null || M();
      }, 300);
    }
    function w() {
      k = fa(n.$el, e.scrollTarget);
    }
    return se(() => e.scrollTarget, w), ht(w), tt(() => {
      y !== null && clearTimeout(y);
    }), Object.assign(n, {
      trigger: C,
      updateScrollTarget: w
    }), () => na("div", { class: "q-pull-to-refresh" }, [f("div", { class: p.value }, De(t.default)), f("div", {
      class: "q-pull-to-refresh__puller-container fixed row flex-center no-pointer-events z-top",
      style: d.value
    }, [f("div", {
      class: m.value,
      style: v.value
    }, [o.value !== "refreshing" ? f(st, {
      name: e.icon || l.iconSet.pullToRefresh.icon,
      color: e.color,
      size: "32px"
    }) : f(la, {
      size: "24px",
      color: e.color
    })])])], "main", e.disable === !1, () => h.value);
  }
});
const $a = {
  MIN: 0,
  RANGE: 1,
  MAX: 2
};
var Ev = re({
  name: "QRange",
  props: {
    ...Ys,
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
  emits: Xs,
  setup(e, { emit: t }) {
    const { proxy: { $q: a } } = be(), { state: n, methods: l } = Gs({
      updateValue: K,
      updatePosition: A,
      getDragging: X,
      formAttrs: s(() => ({
        type: "hidden",
        name: e.name,
        value: `${e.modelValue.min}|${e.modelValue.max}`
      }))
    }), o = V(null), i = V(0), r = V(0), u = V({
      min: 0,
      max: 0
    });
    function c() {
      u.value.min = e.modelValue.min === null ? n.innerMin.value : mt(e.modelValue.min, n.innerMin.value, n.innerMax.value), u.value.max = e.modelValue.max === null ? n.innerMax.value : mt(e.modelValue.max, n.innerMin.value, n.innerMax.value);
    }
    se(() => `${e.modelValue.min}|${e.modelValue.max}|${n.innerMin.value}|${n.innerMax.value}`, c), c();
    const d = s(() => l.convertModelToRatio(u.value.min)), v = s(() => l.convertModelToRatio(u.value.max)), m = s(() => n.active.value === !0 ? i.value : d.value), g = s(() => n.active.value === !0 ? r.value : v.value), h = s(() => {
      const D = {
        [n.positionProp.value]: `${100 * m.value}%`,
        [n.sizeProp.value]: `${100 * (g.value - m.value)}%`
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
    function C(D) {
      return a.platform.is.mobile !== !0 && n.editable.value === !0 && e.dragOnlyRange !== !0 ? {
        onFocus: () => {
          n.focus.value = D;
        },
        onBlur: l.onBlur,
        onKeydown: $,
        onKeyup: l.onKeyup
      } : {};
    }
    const k = s(() => e.dragOnlyRange !== !0 ? n.tabindex.value : null), y = s(() => a.platform.is.mobile !== !0 && (e.dragRange || e.dragOnlyRange === !0) ? n.tabindex.value : null), b = V(null), w = s(() => C("min")), x = l.getThumbRenderFn({
      focusValue: "min",
      getNodeData: () => ({
        ref: b,
        key: "tmin",
        ...w.value,
        tabindex: k.value
      }),
      ratio: m,
      label: s(() => e.leftLabelValue !== void 0 ? e.leftLabelValue : u.value.min),
      thumbColor: s(() => e.leftThumbColor || e.thumbColor || e.color),
      labelColor: s(() => e.leftLabelColor || e.labelColor),
      labelTextColor: s(() => e.leftLabelTextColor || e.labelTextColor)
    }), L = s(() => C("max")), M = l.getThumbRenderFn({
      focusValue: "max",
      getNodeData: () => ({
        ...L.value,
        key: "tmax",
        tabindex: k.value
      }),
      ratio: g,
      label: s(() => e.rightLabelValue !== void 0 ? e.rightLabelValue : u.value.max),
      thumbColor: s(() => e.rightThumbColor || e.thumbColor || e.color),
      labelColor: s(() => e.rightLabelColor || e.labelColor),
      labelTextColor: s(() => e.rightLabelTextColor || e.labelTextColor)
    });
    function K(D) {
      (u.value.min !== e.modelValue.min || u.value.max !== e.modelValue.max) && t("update:modelValue", { ...u.value }), D === !0 && t("change", { ...u.value });
    }
    function X(D) {
      const { left: _, top: S, width: T, height: H } = o.value.getBoundingClientRect(), E = e.dragOnlyRange === !0 ? 0 : e.vertical === !0 ? b.value.offsetHeight / (2 * H) : b.value.offsetWidth / (2 * T), Q = {
        left: _,
        top: S,
        width: T,
        height: H,
        valueMin: u.value.min,
        valueMax: u.value.max,
        ratioMin: d.value,
        ratioMax: v.value
      }, j = l.getDraggingRatio(D, Q);
      return e.dragOnlyRange !== !0 && j < Q.ratioMin + E ? Q.type = $a.MIN : e.dragOnlyRange === !0 || j < Q.ratioMax - E ? e.dragRange === !0 || e.dragOnlyRange === !0 ? (Q.type = $a.RANGE, Object.assign(Q, {
        offsetRatio: j,
        offsetModel: l.convertRatioToModel(j),
        rangeValue: Q.valueMax - Q.valueMin,
        rangeRatio: Q.ratioMax - Q.ratioMin
      })) : Q.type = Q.ratioMax - j < j - Q.ratioMin ? $a.MAX : $a.MIN : Q.type = $a.MAX, Q;
    }
    function A(D, _ = n.dragging.value) {
      let S;
      const T = l.getDraggingRatio(D, _), H = l.convertRatioToModel(T);
      switch (_.type) {
        case $a.MIN:
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
        case $a.MAX:
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
        case $a.RANGE:
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
      if (yi.includes(D.keyCode) === !1) return;
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
      const D = l.getContent(h, y, p, (_) => {
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
}), Iv = re({
  name: "QRating",
  props: {
    ...wa,
    ...oa,
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
    const { proxy: { $q: n } } = be(), l = xa(e), o = za(Gn(e)), i = V(0);
    let r = {};
    const u = s(() => e.readonly !== !0 && e.disable !== !0), c = s(() => `q-rating row inline items-center q-rating--${u.value === !0 ? "" : "non-"}editable` + (e.noDimming === !0 ? " q-rating--no-dimming" : "") + (e.disable === !0 ? " disabled" : "") + (e.color !== void 0 && Array.isArray(e.color) === !1 ? ` text-${e.color}` : "")), d = s(() => {
      const y = Array.isArray(e.icon) === !0 ? e.icon.length : 0, b = Array.isArray(e.iconSelected) === !0 ? e.iconSelected.length : 0, w = Array.isArray(e.iconHalf) === !0 ? e.iconHalf.length : 0, x = Array.isArray(e.color) === !0 ? e.color.length : 0, L = Array.isArray(e.colorSelected) === !0 ? e.colorSelected.length : 0, M = Array.isArray(e.colorHalf) === !0 ? e.colorHalf.length : 0;
      return {
        iconLen: y,
        icon: y > 0 ? e.icon[y - 1] : e.icon,
        selIconLen: b,
        selIcon: b > 0 ? e.iconSelected[b - 1] : e.iconSelected,
        halfIconLen: w,
        halfIcon: w > 0 ? e.iconHalf[b - 1] : e.iconHalf,
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
        return (b) => `${y}${b}`;
      }
      if (Array.isArray(e.iconAriaLabel) === !0) {
        const y = e.iconAriaLabel.length;
        if (y > 0) return (b) => e.iconAriaLabel[Math.min(b, y) - 1];
      }
      return (y, b) => `${b} ${y}`;
    }), m = s(() => {
      const y = [], b = d.value, w = Math.ceil(e.modelValue), x = u.value === !0 ? 0 : null, L = e.iconHalf === void 0 || w === e.modelValue ? -1 : w;
      for (let M = 1; M <= e.max; M++) {
        const K = i.value === 0 && e.modelValue >= M || i.value > 0 && i.value >= M, X = L === M && i.value < M, A = i.value > 0 && (X === !0 ? w : e.modelValue) >= M && i.value < M, $ = X === !0 ? M <= b.halfColorLen ? e.colorHalf[M - 1] : b.halfColor : b.selColor !== void 0 && K === !0 ? M <= b.selColorLen ? e.colorSelected[M - 1] : b.selColor : M <= b.colorLen ? e.color[M - 1] : b.color, D = (X === !0 ? M <= b.halfIconLen ? e.iconHalf[M - 1] : b.halfIcon : b.selIcon !== void 0 && (K === !0 || A === !0) ? M <= b.selIconLen ? e.iconSelected[M - 1] : b.selIcon : M <= b.iconLen ? e.icon[M - 1] : b.icon) || n.iconSet.rating.icon;
        y.push({
          name: (X === !0 ? M <= b.halfIconLen ? e.iconHalf[M - 1] : b.halfIcon : b.selIcon !== void 0 && (K === !0 || A === !0) ? M <= b.selIconLen ? e.iconSelected[M - 1] : b.selIcon : M <= b.iconLen ? e.icon[M - 1] : b.icon) || n.iconSet.rating.icon,
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
    }), g = s(() => {
      const y = { role: "radiogroup" };
      return e.disable === !0 && (y["aria-disabled"] = "true"), e.readonly === !0 && (y["aria-readonly"] = "true"), y;
    });
    function h(y) {
      if (u.value === !0) {
        const b = mt(parseInt(y, 10), 1, parseInt(e.max, 10)), w = e.noReset !== !0 && e.modelValue === b ? 0 : b;
        w !== e.modelValue && a("update:modelValue", w), i.value = 0;
      }
    }
    function p(y) {
      u.value === !0 && (i.value = y);
    }
    function C(y, b) {
      switch (y.keyCode) {
        case 13:
        case 32:
          return h(b), Ye(y);
        case 37:
        case 40:
          return r[`rt${b - 1}`] && r[`rt${b - 1}`].focus(), Ye(y);
        case 39:
        case 38:
          return r[`rt${b + 1}`] && r[`rt${b + 1}`].focus(), Ye(y);
      }
    }
    function k() {
      i.value = 0;
    }
    return Wn(() => {
      r = {};
    }), () => {
      const y = [];
      return m.value.forEach(({ iconClass: b, name: w, attrs: x }, L) => {
        const M = L + 1;
        y.push(f("div", {
          key: M,
          ref: (K) => {
            r[`rt${M}`] = K;
          },
          class: "q-rating__icon-container flex flex-center",
          ...x,
          onClick() {
            h(M);
          },
          onMouseover() {
            p(M);
          },
          onMouseout: k,
          onFocus() {
            p(M);
          },
          onBlur: k,
          onKeyup(K) {
            C(K, M);
          }
        }, $t(t[`tip-${M}`], [f(st, {
          class: b,
          name: w
        })])));
      }), e.name !== void 0 && e.disable !== !0 && o(y, "push"), f("div", {
        class: c.value,
        style: l.value,
        ...g.value
      }, y);
    };
  }
});
re({
  name: "QResponsive",
  props: Si,
  setup(e, { slots: t }) {
    const a = wi(e);
    return () => f("div", { class: "q-responsive" }, [f("div", { class: "q-responsive__filler overflow-hidden" }, [f("div", { style: a.value })]), f("div", { class: "q-responsive__content absolute-full fit" }, De(t.default))]);
  }
});
var Ov = re({
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
      ea(f("div", {
        ref: e.store.scroll.vertical.ref,
        class: e.store.scroll.vertical.thumbClass.value,
        style: e.store.scroll.vertical.style.value,
        "aria-hidden": "true"
      }), e.store.thumbVertDir),
      ea(f("div", {
        ref: e.store.scroll.horizontal.ref,
        class: e.store.scroll.horizontal.thumbClass.value,
        style: e.store.scroll.horizontal.style.value,
        "aria-hidden": "true"
      }), e.store.thumbHorizDir)
    ];
  }
});
const qr = ["vertical", "horizontal"], So = {
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
}, Br = {
  prevent: !0,
  mouse: !0,
  mouseAllDir: !0
}, Tr = (e) => e >= 250 ? 50 : Math.ceil(e / 5);
var Hv = re({
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
    const n = V(!1), l = V(!1), o = V(!1), i = {
      vertical: V(0),
      horizontal: V(0)
    }, r = {
      vertical: {
        ref: V(null),
        position: V(0),
        size: V(0)
      },
      horizontal: {
        ref: V(null),
        position: V(0),
        size: V(0)
      }
    }, { proxy: u } = be(), c = rt(e, u.$q);
    let d = null, v;
    const m = V(null), g = s(() => "q-scrollarea" + (c.value === !0 ? " q-scrollarea--dark" : ""));
    Object.assign(i, {
      verticalInner: s(() => i.vertical.value - e.verticalOffset[0] - e.verticalOffset[1]),
      horizontalInner: s(() => i.horizontal.value - e.horizontalOffset[0] - e.horizontalOffset[1])
    }), r.vertical.percentage = s(() => {
      const S = r.vertical.size.value - i.vertical.value;
      if (S <= 0) return 0;
      const T = mt(r.vertical.position.value / S, 0, 1);
      return Math.round(T * 1e4) / 1e4;
    }), r.vertical.thumbHidden = s(() => (e.visible === null ? o.value : e.visible) !== !0 && n.value === !1 && l.value === !1 || r.vertical.size.value <= i.vertical.value + 1), r.vertical.thumbStart = s(() => e.verticalOffset[0] + r.vertical.percentage.value * (i.verticalInner.value - r.vertical.thumbSize.value)), r.vertical.thumbSize = s(() => Math.round(mt(i.verticalInner.value * i.verticalInner.value / r.vertical.size.value, Tr(i.verticalInner.value), i.verticalInner.value))), r.vertical.style = s(() => ({
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
    }), r.horizontal.thumbHidden = s(() => (e.visible === null ? o.value : e.visible) !== !0 && n.value === !1 && l.value === !1 || r.horizontal.size.value <= i.horizontal.value + 1), r.horizontal.thumbStart = s(() => e.horizontalOffset[0] + r.horizontal.percentage.value * (i.horizontalInner.value - r.horizontal.thumbSize.value)), r.horizontal.thumbSize = s(() => Math.round(mt(i.horizontalInner.value * i.horizontalInner.value / r.horizontal.size.value, Tr(i.horizontalInner.value), i.horizontalInner.value))), r.horizontal.style = s(() => ({
      ...e.thumbStyle,
      ...e.horizontalThumbStyle,
      [u.$q.lang.rtl === !0 ? "right" : "left"]: `${r.horizontal.thumbStart.value}px`,
      width: `${r.horizontal.thumbSize.value}px`,
      bottom: `${e.verticalOffset[1]}px`
    })), r.horizontal.thumbClass = s(() => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (r.horizontal.thumbHidden.value === !0 ? " q-scrollarea__thumb--invisible" : "")), r.horizontal.barClass = s(() => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (r.horizontal.thumbHidden.value === !0 ? " q-scrollarea__bar--invisible" : ""));
    const h = s(() => r.vertical.thumbHidden.value === !0 && r.horizontal.thumbHidden.value === !0 ? e.contentStyle : e.contentActiveStyle);
    function p() {
      const S = {};
      return qr.forEach((T) => {
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
    const C = _n(() => {
      const S = p();
      S.ref = u, a("scroll", S);
    }, 0);
    function k(S, T, H) {
      if (qr.includes(S) === !1) {
        console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
        return;
      }
      (S === "vertical" ? Cn : ao)(m.value, T, H);
    }
    function y({ height: S, width: T }) {
      let H = !1;
      i.vertical.value !== S && (i.vertical.value = S, H = !0), i.horizontal.value !== T && (i.horizontal.value = T, H = !0), H === !0 && M();
    }
    function b({ position: S }) {
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
      const E = So[T], Q = (H.size.value - i[T].value) / (i[T + "Inner"].value - H.thumbSize.value), j = S.distance[E.dist];
      K(v + (S.direction === E.dir ? 1 : -1) * j * Q, T);
    }
    function L(S, T) {
      const H = r[T];
      if (H.thumbHidden.value !== !0) {
        const E = T === "vertical" ? e.verticalOffset[0] : e.horizontalOffset[0], Q = S[So[T].offset] - E, j = H.thumbStart.value - E;
        (Q < j || Q > j + H.thumbSize.value) && K(mt((Q - H.thumbSize.value / 2) / (i[T + "Inner"].value - H.thumbSize.value), 0, 1) * Math.max(0, H.size.value - i[T].value), T), H.ref.value !== null && H.ref.value.dispatchEvent(new MouseEvent(S.type, S));
      }
    }
    function M() {
      n.value = !0, d !== null && clearTimeout(d), d = setTimeout(() => {
        d = null, n.value = !1;
      }, e.delay), e.onScroll !== void 0 && C();
    }
    function K(S, T) {
      m.value[So[T].scroll] = S;
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
      m.value !== null && ao(m.value, Math.abs(r.horizontal.position.value) * (S === !0 ? -1 : 1));
    }), Sa(() => {
      D = {
        top: r.vertical.position.value,
        left: r.horizontal.position.value
      };
    }), en(() => {
      if (D === null) return;
      const S = m.value;
      S !== null && (ao(S, D.left), Cn(S, D.top));
    }), tt(C.cancel), Object.assign(u, {
      getScrollTarget: () => m.value,
      getScroll: p,
      getScrollPosition: () => ({
        top: r.vertical.position.value,
        left: r.horizontal.position.value
      }),
      getScrollPercentage: () => ({
        top: r.vertical.percentage.value,
        left: r.horizontal.percentage.value
      }),
      setScrollPosition: k,
      setScrollPercentage(S, T, H) {
        k(S, T * (r[S].size.value - i[S].value) * (S === "horizontal" && u.$q.lang.rtl === !0 ? -1 : 1), H);
      }
    });
    const _ = {
      scroll: r,
      thumbVertDir: [[
        Jt,
        (S) => {
          x(S, "vertical");
        },
        void 0,
        {
          vertical: !0,
          ...Br
        }
      ]],
      thumbHorizDir: [[
        Jt,
        (S) => {
          x(S, "horizontal");
        },
        void 0,
        {
          horizontal: !0,
          ...Br
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
      class: g.value,
      onMouseenter: A,
      onMouseleave: $
    }, [
      f("div", {
        ref: m,
        class: "q-scrollarea__container scroll relative-position fit hide-scrollbar",
        tabindex: e.tabindex !== void 0 ? e.tabindex : void 0
      }, [f("div", {
        class: "q-scrollarea__content absolute",
        style: h.value
      }, $t(t.default, [f(Ga, {
        debounce: 0,
        onResize: w
      })])), f(Lu, {
        axis: "both",
        onScroll: b
      })]),
      f(Ga, {
        debounce: 0,
        onResize: y
      }),
      f(Ov, {
        store: _,
        barStyle: e.barStyle,
        verticalBarStyle: e.verticalBarStyle,
        horizontalBarStyle: e.horizontalBarStyle
      })
    ]);
  }
});
const ia = 1e3, Nv = [
  "start",
  "center",
  "end",
  "start-force",
  "center-force",
  "end-force"
], Ru = Array.prototype.filter, jv = __QUASAR_SSR__ || window.getComputedStyle(document.body).overflowAnchor === void 0 ? At : function(t, a) {
  t !== null && (t._qOverflowAnimationFrame !== void 0 && cancelAnimationFrame(t._qOverflowAnimationFrame), t._qOverflowAnimationFrame = requestAnimationFrame(() => {
    if (t === null) return;
    t._qOverflowAnimationFrame = void 0;
    const n = t.children || [];
    Ru.call(n, (o) => o.dataset && o.dataset.qVsAnchor !== void 0).forEach((o) => {
      delete o.dataset.qVsAnchor;
    });
    const l = n[a];
    l != null && l.dataset && (l.dataset.qVsAnchor = "");
  }));
};
function kn(e, t) {
  return e + t;
}
function wo(e, t, a, n, l, o, i, r) {
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
    const v = u.getBoundingClientRect(), m = t.getBoundingClientRect();
    l === !0 ? (d.offsetStart += m.left - v.left, d.offsetEnd -= m.width) : (d.offsetStart += m.top - v.top, d.offsetEnd -= m.height), e !== window && (d.offsetStart += d.scrollStart), d.offsetEnd += d.scrollMaxSize - d.offsetStart;
  }
  return d;
}
function Mr(e, t, a, n) {
  t === "end" && (t = (e === window ? document.body : e)[a === !0 ? "scrollWidth" : "scrollHeight"]), e === window ? a === !0 ? (n === !0 && (t = (Kn === !0 ? document.body.scrollWidth - document.documentElement.clientWidth : 0) - t), window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0)) : window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t) : a === !0 ? (n === !0 && (t = (Kn === !0 ? e.scrollWidth - e.offsetWidth : 0) - t), e.scrollLeft = t) : e.scrollTop = t;
}
function Ln(e, t, a, n) {
  if (a >= n) return 0;
  const l = t.length, o = Math.floor(a / ia), i = Math.floor((n - 1) / ia) + 1;
  let r = e.slice(o, i).reduce(kn, 0);
  return a % ia !== 0 && (r -= t.slice(o * ia, a).reduce(kn, 0)), n % ia !== 0 && n !== l && (r -= t.slice(n, i * ia).reduce(kn, 0)), r;
}
const Fu = {
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
}, Eu = Object.keys(Fu), jo = {
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function,
  ...Fu
};
function Iu({ virtualScrollLength: e, getVirtualScrollTarget: t, getVirtualScrollEl: a, virtualScrollItemSizeComputed: n }) {
  const { props: l, emit: o, proxy: i } = be(), { $q: r } = i;
  let u, c, d, v = [], m;
  const g = V(0), h = V(0), p = V({}), C = V(null), k = V(null), y = V(null), b = V({
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
    const B = wo(Z, a(), C.value, k.value, l.virtualScrollHorizontal, r.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd);
    d !== B.scrollViewSize && S(B.scrollViewSize), A(Z, B, Math.min(e.value - 1, Math.max(0, parseInt(j, 10) || 0)), 0, Nv.indexOf(N) !== -1 ? N : c !== -1 && j > c ? "end" : "start");
  }
  function X() {
    const j = t();
    if (j == null || j.nodeType === 8) return;
    const N = wo(j, a(), C.value, k.value, l.virtualScrollHorizontal, r.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd), Z = e.value - 1, B = N.scrollMaxSize - N.offsetStart - N.offsetEnd - h.value;
    if (u === N.scrollStart) return;
    if (N.scrollMaxSize <= 0) {
      A(j, N, 0, 0);
      return;
    }
    d !== N.scrollViewSize && S(N.scrollViewSize), $(b.value.from);
    const G = Math.floor(N.scrollMaxSize - Math.max(N.scrollViewSize, N.offsetEnd) - Math.min(m[Z], N.scrollViewSize / 2));
    if (G > 0 && Math.ceil(N.scrollStart) >= G) {
      A(j, N, Z, N.scrollMaxSize - N.offsetEnd - v.reduce(kn, 0));
      return;
    }
    let z = 0, ne = N.scrollStart - N.offsetStart, P = ne;
    if (ne <= B && ne + N.scrollViewSize >= g.value)
      ne -= g.value, z = b.value.from, P = ne;
    else for (let I = 0; ne >= v[I] && z < Z; I++)
      ne -= v[I], z += ia;
    for (; ne > 0 && z < Z; )
      ne -= m[z], ne > -N.scrollViewSize ? (z++, P = ne) : P = m[z] + ne;
    A(j, N, z, P);
  }
  function A(j, N, Z, B, G) {
    const z = typeof G == "string" && G.indexOf("-force") !== -1, ne = z === !0 ? G.replace("-force", "") : G, P = ne !== void 0 ? ne : "start";
    let I = Math.max(0, Z - p.value[P]), de = I + p.value.total;
    de > e.value && (de = e.value, I = Math.max(0, de - p.value.total)), u = N.scrollStart;
    const Y = I !== b.value.from || de !== b.value.to;
    if (Y === !1 && ne === void 0) {
      H(Z);
      return;
    }
    const { activeElement: fe } = document, W = y.value;
    Y === !0 && W !== null && W !== fe && W.contains(fe) === !0 && (W.addEventListener("focusout", D), setTimeout(() => {
      W == null || W.removeEventListener("focusout", D);
    })), jv(W, Z - I);
    const he = ne !== void 0 ? m.slice(I, Z).reduce(kn, 0) : 0;
    if (Y === !0) {
      const _e = de >= b.value.from && I <= b.value.to ? b.value.to : de;
      b.value = {
        from: I,
        to: _e
      }, g.value = Ln(v, m, 0, I), h.value = Ln(v, m, de, e.value), requestAnimationFrame(() => {
        b.value.to !== de && u === N.scrollStart && (b.value = {
          from: b.value.from,
          to: de
        }, h.value = Ln(v, m, de, e.value));
      });
    }
    requestAnimationFrame(() => {
      if (u !== N.scrollStart) return;
      Y === !0 && $(I);
      const _e = m.slice(I, Z).reduce(kn, 0), we = _e + N.offsetStart + g.value, Ie = we + m[Z];
      let ke = we + B;
      if (ne !== void 0) {
        const Me = _e - he, Le = N.scrollStart + Me;
        ke = z !== !0 && Le < we && Ie < Le + N.scrollViewSize ? Le : ne === "end" ? Ie - N.scrollViewSize : we - (ne === "start" ? 0 : Math.round((N.scrollViewSize - m[Z]) / 2));
      }
      u = ke, Mr(j, ke, l.virtualScrollHorizontal, r.lang.rtl), H(Z);
    });
  }
  function $(j) {
    const N = y.value;
    if (N) {
      const Z = Ru.call(N.children, (I) => I.classList && I.classList.contains("q-virtual-scroll--skip") === !1), B = Z.length, G = l.virtualScrollHorizontal === !0 ? (I) => I.getBoundingClientRect().width : (I) => I.offsetHeight;
      let z = j, ne, P;
      for (let I = 0; I < B; ) {
        for (ne = G(Z[I]), I++; I < B && Z[I].classList.contains("q-virtual-scroll--with-prev") === !0; )
          ne += G(Z[I]), I++;
        P = ne - m[z], P !== 0 && (m[z] += P, v[Math.floor(z / ia)] += P), z++;
      }
    }
  }
  function D() {
    var j;
    (j = y.value) == null || j.focus();
  }
  function _(j, N) {
    const Z = Number(n.value);
    (N === !0 || Array.isArray(m) === !1) && (m = []);
    const B = m.length;
    m.length = e.value;
    for (let z = e.value - 1; z >= B; z--) m[z] = Z;
    const G = Math.floor((e.value - 1) / ia);
    v = [];
    for (let z = 0; z <= G; z++) {
      let ne = 0;
      const P = Math.min((z + 1) * ia, e.value);
      for (let I = z * ia; I < P; I++) ne += m[I];
      v.push(ne);
    }
    c = -1, u = void 0, g.value = Ln(v, m, 0, b.value.from), h.value = Ln(v, m, b.value.to, e.value), j >= 0 ? ($(b.value.from), nt(() => {
      K(j);
    })) : E();
  }
  function S(j) {
    if (j === void 0 && typeof window < "u") {
      const ne = t();
      ne != null && ne.nodeType !== 8 && (j = wo(ne, a(), C.value, k.value, l.virtualScrollHorizontal, r.lang.rtl, l.virtualScrollStickySizeStart, l.virtualScrollStickySizeEnd).scrollViewSize);
    }
    d = j;
    const N = parseFloat(l.virtualScrollSliceRatioBefore) || 0, Z = parseFloat(l.virtualScrollSliceRatioAfter) || 0, B = 1 + N + Z, G = j === void 0 || j <= 0 ? 1 : Math.ceil(j / n.value), z = Math.max(1, G, Math.ceil((l.virtualScrollSliceSize > 0 ? l.virtualScrollSliceSize : 10) / B));
    p.value = {
      total: Math.ceil(z * B),
      start: Math.ceil(z * N),
      center: Math.ceil(z * (0.5 + N)),
      end: Math.ceil(z * (1 + N)),
      view: G
    };
  }
  function T(j, N) {
    const Z = l.virtualScrollHorizontal === !0 ? "width" : "height", B = { ["--q-virtual-scroll-item-" + Z]: n.value + "px" };
    return [
      j === "tbody" ? f(j, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: C
      }, [f("tr", [f("td", {
        style: {
          [Z]: `${g.value}px`,
          ...B
        },
        colspan: w.value
      })])]) : f(j, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: C,
        style: {
          [Z]: `${g.value}px`,
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
        ref: k
      }, [f("tr", [f("td", {
        style: {
          [Z]: `${h.value}px`,
          ...B
        },
        colspan: w.value
      })])]) : f(j, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: k,
        style: {
          [Z]: `${h.value}px`,
          ...B
        }
      })
    ];
  }
  function H(j) {
    c !== j && (l.onVirtualScroll !== void 0 && o("virtualScroll", {
      index: j,
      from: b.value.from,
      to: b.value.to - 1,
      direction: j < c ? "decrease" : "increase",
      ref: i
    }), c = j);
  }
  S();
  const E = _n(X, r.platform.is.ios === !0 ? 120 : 35);
  Uo(() => {
    S();
  });
  let Q = !1;
  return Sa(() => {
    Q = !0;
  }), en(() => {
    if (Q !== !0) return;
    const j = t();
    u !== void 0 && j !== void 0 && j !== null && j.nodeType !== 8 ? Mr(j, u, l.virtualScrollHorizontal, r.lang.rtl) : K(c);
  }), __QUASAR_SSR__ || tt(() => {
    E.cancel();
  }), Object.assign(i, {
    scrollTo: K,
    reset: L,
    refresh: M
  }), {
    virtualScrollSliceRange: b,
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
const Ar = (e) => [
  "add",
  "add-unique",
  "toggle"
].includes(e), Qv = ".*+?^${}()|[]\\", Uv = Object.keys(Ql);
function xo(e, t) {
  if (typeof e == "function") return e;
  const a = e !== void 0 ? e : t;
  return (n) => n !== null && typeof n == "object" && a in n ? n[a] : n;
}
var Ou = re({
  name: "QSelect",
  inheritAttrs: !1,
  props: {
    ...jo,
    ...oa,
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
      validator: Ar
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
    virtualScrollItemSize: jo.virtualScrollItemSize.type,
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
    const { proxy: n } = be(), { $q: l } = n, o = V(!1), i = V(!1), r = V(-1), u = V(""), c = V(!1), d = V(!1);
    let v = null, m = null, g, h, p, C = null, k, y, b, w;
    const x = V(null), L = V(null), M = V(null), K = V(null), X = V(null), A = ri(e), $ = Au(da), D = s(() => Array.isArray(e.options) ? e.options.length : 0), { virtualScrollSliceRange: _, virtualScrollSliceSizeComputed: S, localResetVirtualScroll: T, padVirtualScroll: H, onVirtualScrollEvt: E, scrollTo: Q, setVirtualScrollSize: j } = Iu({
      virtualScrollLength: D,
      getVirtualScrollTarget: kt,
      getVirtualScrollEl: Ft,
      virtualScrollItemSizeComputed: s(() => e.virtualScrollItemSize === void 0 ? e.optionsDense === !0 ? 24 : 48 : e.virtualScrollItemSize)
    }), N = Kl(), Z = s(() => {
      const O = e.mapOptions === !0 && e.multiple !== !0, qe = e.modelValue !== void 0 && (e.modelValue !== null || O === !0) ? e.multiple === !0 && Array.isArray(e.modelValue) ? e.modelValue : [e.modelValue] : [];
      if (e.mapOptions === !0 && Array.isArray(e.options) === !0) {
        const Ae = e.mapOptions === !0 && g !== void 0 ? g : [], at = qe.map((St) => ze(St, Ae));
        return e.modelValue === null && O === !0 ? at.filter((St) => St !== null) : at;
      }
      return qe;
    }), B = s(() => {
      const O = {};
      return Uv.forEach((qe) => {
        const Ae = e[qe];
        Ae !== void 0 && (O[qe] = Ae);
      }), O;
    }), G = s(() => e.optionsDark === null ? N.isDark.value : e.optionsDark), z = s(() => Ja(Z.value)), ne = s(() => {
      let O = "q-field__input q-placeholder col";
      return e.hideSelected === !0 || Z.value.length === 0 ? [O, e.inputClass] : (O += " q-field__input--padding", e.inputClass === void 0 ? O : [O, e.inputClass]);
    }), P = s(() => (e.virtualScrollHorizontal === !0 ? "q-virtual-scroll--horizontal" : "") + (e.popupContentClass ? " " + e.popupContentClass : "")), I = s(() => D.value === 0), de = s(() => Z.value.map((O) => ue.value(O)).join(", ")), Y = s(() => e.displayValue !== void 0 ? e.displayValue : de.value), fe = s(() => e.optionsHtml === !0 ? () => !0 : (O) => (O == null ? void 0 : O.html) === !0), W = s(() => e.displayValueHtml === !0 || e.displayValue === void 0 && (e.optionsHtml === !0 || Z.value.some(fe.value))), he = s(() => N.focused.value === !0 ? e.tabindex : -1), _e = s(() => {
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
    })), Ie = s(() => Z.value.map((O, qe) => ({
      index: qe,
      opt: O,
      html: fe.value(O),
      selected: !0,
      removeAtIndex: je,
      toggleOption: et,
      tabindex: he.value
    }))), ke = s(() => {
      if (D.value === 0) return [];
      const { from: O, to: qe } = _.value;
      return e.options.slice(O, qe).map((Ae, at) => {
        const St = le.value(Ae) === !0, Lt = ae(Ae) === !0, bt = O + at, xt = {
          clickable: !0,
          active: Lt,
          activeClass: ot.value,
          manualFocus: !0,
          focused: !1,
          disable: St,
          tabindex: -1,
          dense: e.optionsDense,
          dark: G.value,
          role: "option",
          "aria-selected": Lt === !0 ? "true" : "false",
          id: `${N.targetUid.value}_${bt}`,
          onClick: () => {
            et(Ae);
          }
        };
        return St !== !0 && (r.value === bt && (xt.focused = !0), l.platform.is.desktop === !0 && (xt.onMousemove = () => {
          o.value === !0 && te(bt);
        })), {
          index: bt,
          opt: Ae,
          html: fe.value(Ae),
          label: ue.value(Ae),
          selected: xt.active,
          focused: xt.focused,
          toggleOption: et,
          setOptionIndex: te,
          itemProps: xt
        };
      });
    }), Me = s(() => e.dropdownIcon !== void 0 ? e.dropdownIcon : l.iconSet.arrow.dropdown), Le = s(() => e.optionsCover === !1 && e.outlined !== !0 && e.standout !== !0 && e.borderless !== !0 && e.rounded !== !0), ot = s(() => e.optionsSelectedClass !== void 0 ? e.optionsSelectedClass : e.color !== void 0 ? `text-${e.color}` : ""), We = s(() => xo(e.optionValue, "value")), ue = s(() => xo(e.optionLabel, "label")), le = s(() => xo(e.optionDisable, "disable")), ve = s(() => Z.value.map(We.value)), Pe = s(() => {
      const O = {
        onInput: da,
        onChange: $,
        onKeydown: ut,
        onKeyup: Te,
        onKeypress: Oe,
        onFocus: ye,
        onClick(qe) {
          h === !0 && wt(qe);
        }
      };
      return O.onCompositionstart = O.onCompositionupdate = O.onCompositionend = $, O;
    });
    se(Z, (O) => {
      g = O, e.useInput === !0 && e.fillInput === !0 && e.multiple !== !0 && N.innerLoading.value !== !0 && (i.value !== !0 && o.value !== !0 || z.value !== !0) && (p !== !0 && Gt(), (i.value === !0 || o.value === !0) && Re(""));
    }, { immediate: !0 }), se(() => e.fillInput, Gt), se(o, Xl), se(D, hd);
    function Ge(O) {
      return e.emitValue === !0 ? We.value(O) : O;
    }
    function Ke(O) {
      if (O !== -1 && O < Z.value.length) if (e.multiple === !0) {
        const qe = e.modelValue.slice();
        a("remove", {
          index: O,
          value: qe.splice(O, 1)[0]
        }), a("update:modelValue", qe);
      } else a("update:modelValue", null);
    }
    function je(O) {
      Ke(O), N.focus();
    }
    function Qe(O, qe) {
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
      if (qe === !0 && ae(O) === !0 || e.maxValues !== void 0 && e.modelValue.length >= e.maxValues) return;
      const at = e.modelValue.slice();
      a("add", {
        index: at.length,
        value: Ae
      }), at.push(Ae), a("update:modelValue", at);
    }
    function et(O, qe) {
      var Lt;
      if (N.editable.value !== !0 || O === void 0 || le.value(O) === !0) return;
      const Ae = We.value(O);
      if (e.multiple !== !0) {
        qe !== !0 && (Se(e.fillInput === !0 ? ue.value(O) : "", !0, !0), dt()), (Lt = L.value) == null || Lt.focus(), (Z.value.length === 0 || ra(We.value(Z.value[0]), Ae) !== !0) && a("update:modelValue", e.emitValue === !0 ? Ae : O);
        return;
      }
      if ((h !== !0 || c.value === !0) && N.focus(), ye(), Z.value.length === 0) {
        const bt = e.emitValue === !0 ? Ae : O;
        a("add", {
          index: 0,
          value: bt
        }), a("update:modelValue", e.multiple === !0 ? [bt] : bt);
        return;
      }
      const at = e.modelValue.slice(), St = ve.value.findIndex((bt) => ra(bt, Ae));
      if (St !== -1) a("remove", {
        index: St,
        value: at.splice(St, 1)[0]
      });
      else {
        if (e.maxValues !== void 0 && at.length >= e.maxValues) return;
        const bt = e.emitValue === !0 ? Ae : O;
        a("add", {
          index: at.length,
          value: bt
        }), at.push(bt);
      }
      a("update:modelValue", at);
    }
    function te(O) {
      if (l.platform.is.desktop !== !0) return;
      const qe = O !== -1 && O < D.value ? O : -1;
      r.value !== qe && (r.value = qe);
    }
    function ce(O = 1, qe) {
      if (o.value === !0) {
        let Ae = r.value;
        do
          Ae = yl(Ae + O, -1, D.value - 1);
        while (Ae !== -1 && Ae !== r.value && le.value(e.options[Ae]) === !0);
        r.value !== Ae && (te(Ae), Q(Ae), qe !== !0 && e.useInput === !0 && e.fillInput === !0 && J(Ae >= 0 ? ue.value(e.options[Ae]) : k, !0));
      }
    }
    function ze(O, qe) {
      const Ae = (at) => ra(We.value(at), O);
      return e.options.find(Ae) || qe.find(Ae) || O;
    }
    function ae(O) {
      const qe = We.value(O);
      return ve.value.find((Ae) => ra(Ae, qe)) !== void 0;
    }
    function ye(O) {
      e.useInput === !0 && L.value !== null && (O === void 0 || L.value === O.target && O.target.value === de.value) && L.value.select();
    }
    function Fe(O) {
      aa(O, 27) === !0 && o.value === !0 && (wt(O), dt(), Gt()), a("keyup", O);
    }
    function Te(O) {
      const { value: qe } = O.target;
      if (O.keyCode !== void 0) {
        Fe(O);
        return;
      }
      if (O.target.value = "", v !== null && (clearTimeout(v), v = null), m !== null && (clearTimeout(m), m = null), Gt(), typeof qe == "string" && qe.length !== 0) {
        const Ae = qe.toLocaleLowerCase(), at = (Lt) => {
          const bt = e.options.find((xt) => String(Lt.value(xt)).toLocaleLowerCase() === Ae);
          return bt === void 0 ? !1 : (Z.value.indexOf(bt) === -1 ? et(bt) : dt(), !0);
        }, St = (Lt) => {
          at(We) !== !0 && Lt !== !0 && at(ue) !== !0 && Re(qe, !0, () => St(!0));
        };
        St();
      } else N.clearValue(O);
    }
    function Oe(O) {
      a("keypress", O);
    }
    function ut(O) {
      if (a("keydown", O), tn(O) === !0) return;
      const qe = u.value.length !== 0 && (e.newValueMode !== void 0 || e.onNewValue !== void 0), Ae = O.shiftKey !== !0 && e.disableTabSelection !== !0 && e.multiple !== !0 && (r.value !== -1 || qe === !0);
      if (O.keyCode === 27) {
        Pt(O);
        return;
      }
      if (O.keyCode === 9 && Ae === !1) {
        Ve();
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
      if ((b === void 0 || w < Date.now()) && (b = ""), at > 0 && e.useInput !== !0 && O.key !== void 0 && O.key.length === 1 && O.altKey === !1 && O.ctrlKey === !1 && O.metaKey === !1 && (O.keyCode !== 32 || b.length !== 0)) {
        o.value !== !0 && Ue(O);
        const St = O.key.toLocaleLowerCase(), Lt = b.length === 1 && b[0] === St;
        w = Date.now() + 1500, Lt === !1 && (Ye(O), b += St);
        const bt = new RegExp("^" + b.split("").map((Gl) => Qv.indexOf(Gl) !== -1 ? "\\" + Gl : Gl).join(".*"), "i");
        let xt = r.value;
        if (Lt === !0 || xt < 0 || bt.test(ue.value(e.options[xt])) !== !0) do
          xt = yl(xt + 1, -1, at - 1);
        while (xt !== r.value && (le.value(e.options[xt]) === !0 || bt.test(ue.value(e.options[xt])) !== !0));
        r.value !== xt && nt(() => {
          te(xt), Q(xt), xt >= 0 && e.useInput === !0 && e.fillInput === !0 && J(ue.value(e.options[xt]), !0);
        });
        return;
      }
      if (!(O.keyCode !== 13 && (O.keyCode !== 32 || e.useInput === !0 || b !== "") && (O.keyCode !== 9 || Ae === !1))) {
        if (O.keyCode !== 9 && Ye(O), r.value !== -1 && r.value < at) {
          et(e.options[r.value]);
          return;
        }
        if (qe === !0) {
          const St = (Lt, bt) => {
            var xt;
            if (bt) {
              if (Ar(bt) !== !0) return;
            } else bt = e.newValueMode;
            Se("", e.multiple !== !0, !0), Lt != null && ((bt === "toggle" ? et : Qe)(Lt, bt === "add-unique"), e.multiple !== !0 && ((xt = L.value) == null || xt.focus(), dt()));
          };
          if (e.onNewValue !== void 0 ? a("newValue", u.value, St) : St(u.value), e.multiple !== !0) return;
        }
        o.value === !0 ? Ve() : N.innerLoading.value !== !0 && Ue();
      }
    }
    function Ft() {
      return h === !0 ? X.value : M.value !== null && M.value.contentEl !== null ? M.value.contentEl : void 0;
    }
    function kt() {
      return Ft();
    }
    function Xt() {
      return e.hideSelected === !0 ? [] : t["selected-item"] !== void 0 ? Ie.value.map((O) => t["selected-item"](O)).slice() : t.selected !== void 0 ? [].concat(t.selected()) : e.useChips === !0 ? Ie.value.map((O, qe) => f(Us, {
        key: "option-" + qe,
        removable: N.editable.value === !0 && le.value(O.opt) !== !0,
        dense: !0,
        textColor: e.color,
        tabindex: he.value,
        onRemove() {
          O.removeAtIndex(qe);
        }
      }, () => f("span", {
        class: "ellipsis",
        [O.html === !0 ? "innerHTML" : "textContent"]: ue.value(O.opt)
      }))) : [f("span", {
        class: "ellipsis",
        [W.value === !0 ? "innerHTML" : "textContent"]: Y.value
      })];
    }
    function Wt() {
      if (I.value === !0) return t["no-option"] !== void 0 ? t["no-option"]({ inputValue: u.value }) : void 0;
      const O = t.option !== void 0 ? t.option : (Ae) => f(jl, {
        key: Ae.index,
        ...Ae.itemProps
      }, () => f(Da, () => f(Oo, () => f("span", { [Ae.html === !0 ? "innerHTML" : "textContent"]: Ae.label }))));
      let qe = H("div", ke.value.map(O));
      return t["before-options"] !== void 0 && (qe = t["before-options"]().concat(qe)), $t(t["after-options"], qe);
    }
    function va(O, qe) {
      const Ae = qe === !0 ? {
        ..._e.value,
        ...N.splitAttrs.attributes.value
      } : void 0, at = {
        ref: qe === !0 ? L : void 0,
        key: "i_t",
        class: ne.value,
        style: e.inputStyle,
        value: u.value !== void 0 ? u.value : "",
        type: "search",
        ...Ae,
        id: qe === !0 ? N.targetUid.value : void 0,
        maxlength: e.maxlength,
        autocomplete: e.autocomplete,
        "data-autofocus": O === !0 || e.autofocus === !0 || void 0,
        disabled: e.disable === !0,
        readonly: e.readonly === !0,
        ...Pe.value
      };
      return O !== !0 && h === !0 && (Array.isArray(at.class) === !0 ? at.class = [...at.class, "no-pointer-events"] : at.class += " no-pointer-events"), f("input", at);
    }
    function da(O) {
      v !== null && (clearTimeout(v), v = null), m !== null && (clearTimeout(m), m = null), !(O && O.target && O.target.qComposing === !0) && (J(O.target.value || ""), p = !0, k = u.value, N.focused.value !== !0 && (h !== !0 || c.value === !0) && N.focus(), e.onFilter !== void 0 && (v = setTimeout(() => {
        v = null, Re(u.value);
      }, e.inputDebounce)));
    }
    function J(O, qe) {
      u.value !== O && (u.value = O, qe === !0 || e.inputDebounce === 0 || e.inputDebounce === "0" ? a("inputValue", O) : m = setTimeout(() => {
        m = null, a("inputValue", O);
      }, e.inputDebounce));
    }
    function Se(O, qe, Ae) {
      p = Ae !== !0, e.useInput === !0 && (J(O, !0), (qe === !0 || Ae !== !0) && (k = O), qe !== !0 && Re(O));
    }
    function Re(O, qe, Ae) {
      if (e.onFilter === void 0 || qe !== !0 && N.focused.value !== !0) return;
      N.innerLoading.value === !0 ? a("filterAbort") : (N.innerLoading.value = !0, d.value = !0), O !== "" && e.multiple !== !0 && Z.value.length !== 0 && p !== !0 && O === ue.value(Z.value[0]) && (O = "");
      const at = setTimeout(() => {
        o.value === !0 && (o.value = !1);
      }, 10);
      C !== null && clearTimeout(C), C = at, a("filter", O, (St, Lt) => {
        (qe === !0 || N.focused.value === !0) && C === at && (clearTimeout(C), typeof St == "function" && St(), d.value = !1, nt(() => {
          N.innerLoading.value = !1, N.editable.value === !0 && (qe === !0 ? o.value === !0 && dt() : o.value === !0 ? Xl(!0) : o.value = !0), typeof Lt == "function" && nt(() => {
            Lt(n);
          }), typeof Ae == "function" && nt(() => {
            Ae(n);
          });
        }));
      }, () => {
        N.focused.value === !0 && C === at && (clearTimeout(C), N.innerLoading.value = !1, d.value = !1), o.value === !0 && (o.value = !1);
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
        onBeforeShow: Bi,
        onBeforeHide: Xe,
        onShow: pt
      }, Wt);
    }
    function Xe(O) {
      Ti(O), Ve();
    }
    function pt() {
      j();
    }
    function q(O) {
      var qe;
      wt(O), (qe = L.value) == null || qe.focus(), c.value = !0, window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
    }
    function U(O) {
      wt(O), nt(() => {
        c.value = !1;
      });
    }
    function ee() {
      const O = [f(sv, {
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
        onClick: Pt,
        onScrollPassive: E
      }, Wt())), f(Nl, {
        ref: K,
        modelValue: i.value,
        position: e.useInput === !0 ? "top" : void 0,
        transitionShow: y,
        transitionHide: e.transitionHide,
        transitionDuration: e.transitionDuration,
        noRouteDismiss: e.popupNoRouteDismiss,
        onBeforeShow: Bi,
        onBeforeHide: xe,
        onHide: $e,
        onShow: Ze
      }, () => f("div", { class: "q-select__dialog" + (G.value === !0 ? " q-select__dialog--dark q-dark" : "") + (c.value === !0 ? " q-select__dialog--focused" : "") }, O));
    }
    function xe(O) {
      Ti(O), K.value !== null && K.value.__updateRefocusTarget(N.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")), N.focused.value = !1;
    }
    function $e(O) {
      dt(), N.focused.value === !1 && a("blur", O), Gt();
    }
    function Ze() {
      const O = document.activeElement;
      (O === null || O.id !== N.targetUid.value) && L.value !== null && L.value !== O && L.value.focus(), j();
    }
    function Ve() {
      i.value !== !0 && (r.value = -1, o.value === !0 && (o.value = !1), N.focused.value === !1 && (C !== null && (clearTimeout(C), C = null), N.innerLoading.value === !0 && (a("filterAbort"), N.innerLoading.value = !1, d.value = !1)));
    }
    function Ue(O) {
      N.editable.value === !0 && (h === !0 ? (N.onControlFocusin(O), i.value = !0, nt(() => {
        N.focus();
      })) : N.focus(), e.onFilter !== void 0 ? Re(u.value) : (I.value !== !0 || t["no-option"] !== void 0) && (o.value = !0));
    }
    function dt() {
      i.value = !1, Ve();
    }
    function Gt() {
      e.useInput === !0 && Se(e.multiple !== !0 && e.fillInput === !0 && Z.value.length !== 0 && ue.value(Z.value[0]) || "", !0, !0);
    }
    function Xl(O) {
      let qe = -1;
      if (O === !0) {
        if (Z.value.length !== 0) {
          const Ae = We.value(Z.value[0]);
          qe = e.options.findIndex((at) => ra(We.value(at), Ae));
        }
        T(qe);
      }
      te(qe);
    }
    function hd(O, qe) {
      o.value === !0 && N.innerLoading.value === !1 && (T(-1, !0), nt(() => {
        o.value === !0 && N.innerLoading.value === !1 && (O > qe ? T() : Xl(!0));
      }));
    }
    function qi() {
      i.value === !1 && M.value !== null && M.value.updatePosition();
    }
    function Bi(O) {
      O !== void 0 && wt(O), a("popupShow", O), N.hasPopupOpen = !0, N.onControlFocusin(O);
    }
    function Ti(O) {
      O !== void 0 && wt(O), a("popupHide", O), N.hasPopupOpen = !1, N.onControlFocusout(O);
    }
    function Mi() {
      h = l.platform.is.mobile !== !0 && e.behavior !== "dialog" ? !1 : e.behavior !== "menu" && (e.useInput === !0 ? t["no-option"] !== void 0 || e.onFilter !== void 0 || I.value === !1 : !0), y = l.platform.is.ios === !0 && h === !0 && e.useInput === !0 ? "fade" : e.transitionShow;
    }
    return Wn(Mi), Cd(qi), Mi(), tt(() => {
      v !== null && clearTimeout(v), m !== null && clearTimeout(m);
    }), Object.assign(n, {
      showPopup: Ue,
      hidePopup: dt,
      removeAtIndex: Ke,
      add: Qe,
      toggleOption: et,
      getOptionIndex: () => r.value,
      setOptionIndex: te,
      moveOptionSelection: ce,
      filter: Re,
      updateMenuPosition: qi,
      updateInputValue: Se,
      isOptionSelected: ae,
      getEmittingOptionValue: Ge,
      isOptionDisabled: (...O) => le.value.apply(null, O) === !0,
      getOptionValue: (...O) => We.value.apply(null, O),
      getOptionLabel: (...O) => ue.value.apply(null, O)
    }), Object.assign(N, {
      innerValue: Z,
      fieldClass: s(() => `q-select q-field--auto-height q-select--with${e.useInput !== !0 ? "out" : ""}-input q-select--with${e.useChips !== !0 ? "out" : ""}-chips q-select--${e.multiple === !0 ? "multiple" : "single"}`),
      inputRef: x,
      targetRef: L,
      hasValue: z,
      showPopup: Ue,
      floatingLabel: s(() => e.hideSelected !== !0 && z.value === !0 || typeof u.value == "number" || u.value.length !== 0 || Ja(e.displayValue)),
      getControlChild: () => {
        if (N.editable.value !== !1 && (i.value === !0 || I.value !== !0 || t["no-option"] !== void 0)) return h === !0 ? ee() : Ne();
        N.hasPopupOpen === !0 && (N.hasPopupOpen = !1);
      },
      controlEvents: {
        onFocusin(O) {
          N.onControlFocusin(O);
        },
        onFocusout(O) {
          N.onControlFocusout(O, () => {
            Gt(), Ve();
          });
        },
        onClick(O) {
          var qe;
          if (Pt(O), h !== !0 && o.value === !0) {
            Ve(), (qe = L.value) == null || qe.focus();
            return;
          }
          Ue(O);
        }
      },
      getControl: (O) => {
        const qe = Xt(), Ae = O === !0 || i.value !== !0 || h !== !0;
        if (e.useInput === !0) qe.push(va(O, Ae));
        else if (N.editable.value === !0) {
          const at = Ae === !0 ? _e.value : void 0;
          qe.push(f("input", {
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
            onKeypress: Oe
          })), Ae === !0 && typeof e.autocomplete == "string" && e.autocomplete.length !== 0 && qe.push(f("input", {
            class: "q-select__autocomplete-input",
            autocomplete: e.autocomplete,
            tabindex: -1,
            onKeyup: Te
          }));
        }
        if (A.value !== void 0 && e.disable !== !0 && ve.value.length !== 0) {
          const at = ve.value.map((St) => f("option", {
            value: St,
            selected: !0
          }));
          qe.push(f("select", {
            class: "hidden",
            name: A.value,
            multiple: e.multiple
          }, at));
        }
        return f("div", {
          class: "q-field__native row items-center",
          ...e.useInput === !0 || Ae !== !0 ? void 0 : N.splitAttrs.attributes.value,
          ...N.splitAttrs.listeners.value
        }, qe);
      },
      getInnerAppend: () => e.loading !== !0 && d.value !== !0 && e.hideDropdownIcon !== !0 ? [f(st, {
        class: "q-select__dropdown-icon" + (o.value === !0 ? " rotate-180" : ""),
        name: Me.value
      })] : null
    }), Wl(N);
  }
});
const Kv = [
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
], Wv = [
  "wave",
  "pulse",
  "pulse-x",
  "pulse-y",
  "fade",
  "blink",
  "none"
];
var Yv = re({
  name: "QSkeleton",
  props: {
    ...it,
    tag: {
      type: String,
      default: "div"
    },
    type: {
      type: String,
      validator: (e) => Kv.includes(e),
      default: "rect"
    },
    animation: {
      type: String,
      validator: (e) => Wv.includes(e),
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
    const a = rt(e, be().proxy.$q), n = s(() => {
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
const Dr = [
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
var Xv = re({
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
    const { proxy: n } = be(), { $q: l } = n, o = rt(e, l), { getCache: i } = Zn(), r = V(null);
    let u = null, c = {}, d = {}, v = {};
    const m = s(() => l.lang.rtl === !0 ? {
      left: "right",
      right: "left"
    } : {
      left: "left",
      right: "right"
    }), g = s(() => "q-slide-item q-item-type overflow-hidden" + (o.value === !0 ? " q-slide-item--dark q-dark" : ""));
    function h() {
      r.value.style.transform = "translate(0,0)";
    }
    function p(k, y, b) {
      e.onSlide !== void 0 && a("slide", {
        side: k,
        ratio: y,
        isReset: b
      });
    }
    function C(k) {
      const y = r.value;
      if (k.isFirst)
        c = {
          dir: null,
          size: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          },
          scale: 0
        }, y.classList.add("no-transition"), Dr.forEach((L) => {
          if (t[L[0]] !== void 0) {
            const M = v[L[0]];
            M.style.transform = "scale(1)", c.size[L[0]] = M.getBoundingClientRect()[L[3]];
          }
        }), c.axis = k.direction === "up" || k.direction === "down" ? "Y" : "X";
      else if (k.isFinal) {
        y.classList.remove("no-transition"), c.scale === 1 ? (y.style.transform = `translate${c.axis}(${c.dir * 100}%)`, u !== null && clearTimeout(u), u = setTimeout(() => {
          u = null, a(c.showing, { reset: h }), a("action", {
            side: c.showing,
            reset: h
          });
        }, 230)) : (y.style.transform = "translate(0,0)", p(c.showing, 0, !0));
        return;
      } else k.direction = c.axis === "X" ? k.offset.x < 0 ? "left" : "right" : k.offset.y < 0 ? "up" : "down";
      if (t.left === void 0 && k.direction === m.value.right || t.right === void 0 && k.direction === m.value.left || t.top === void 0 && k.direction === "down" || t.bottom === void 0 && k.direction === "up") {
        y.style.transform = "translate(0,0)";
        return;
      }
      let b, w, x;
      c.axis === "X" ? (w = k.direction === "left" ? -1 : 1, b = w === 1 ? m.value.left : m.value.right, x = k.distance.x) : (w = k.direction === "up" ? -2 : 2, b = w === 2 ? "top" : "bottom", x = k.distance.y), !(c.dir !== null && Math.abs(w) !== Math.abs(c.dir)) && (c.dir !== w && ([
        "left",
        "right",
        "top",
        "bottom"
      ].forEach((L) => {
        d[L] && (d[L].style.visibility = b === L ? "visible" : "hidden");
      }), c.showing = b, c.dir = w), c.scale = Math.max(0, Math.min(1, (x - 40) / c.size[b])), y.style.transform = `translate${c.axis}(${x * w / Math.abs(w)}px)`, v[b].style.transform = `scale(${c.scale})`, p(b, c.scale, !1));
    }
    return Wn(() => {
      d = {}, v = {};
    }), tt(() => {
      u !== null && clearTimeout(u);
    }), Object.assign(n, { reset: h }), () => {
      const k = [], y = {
        left: t[m.value.right] !== void 0,
        right: t[m.value.left] !== void 0,
        up: t.bottom !== void 0,
        down: t.top !== void 0
      }, b = Object.keys(y).filter((x) => y[x] === !0);
      Dr.forEach((x) => {
        const L = x[0];
        t[L] !== void 0 && k.push(f("div", {
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
        key: `${b.length === 0 ? "only-" : ""} content`,
        ref: r,
        class: "q-slide-item__content"
      }, De(t.default));
      return b.length === 0 ? k.push(w) : k.push(ea(w, i("dir#" + b.join(""), () => {
        const x = {
          prevent: !0,
          stop: !0,
          mouse: !0
        };
        return b.forEach((L) => {
          x[L] = !0;
        }), [[
          Jt,
          C,
          void 0,
          x
        ]];
      }))), f("div", { class: g.value }, k);
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
const Gv = '<g transform="matrix(1 0 0 -1 0 80)"><rect width="10" height="20" rx="3"><animate attributeName="height" begin="0s" dur="4.3s" values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="15" width="10" height="80" rx="3"><animate attributeName="height" begin="0s" dur="2s" values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="30" width="10" height="50" rx="3"><animate attributeName="height" begin="0s" dur="1.4s" values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="45" width="10" height="30" rx="3"><animate attributeName="height" begin="0s" dur="2s" values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear" repeatCount="indefinite"></animate></rect></g>';
re({
  name: "QSpinnerAudio",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      fill: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 55 80",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: Gv
    });
  }
});
const Zv = '<g transform="translate(1 1)" stroke-width="2" fill="none" fill-rule="evenodd"><circle cx="5" cy="50" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="27" cy="5" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="49" cy="50" r="5"><animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite"></animate></circle></g>';
re({
  name: "QSpinnerBall",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      stroke: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 57 57",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: Zv
    });
  }
});
const Jv = '<rect y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="30" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="60" width="15" height="140" rx="6"><animate attributeName="height" begin="0s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="90" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="120" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect>';
var em = re({
  name: "QSpinnerBars",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      fill: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 135 140",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: Jv
    });
  }
});
const tm = '<rect x="25" y="25" width="50" height="50" fill="none" stroke-width="4" stroke="currentColor"><animateTransform id="spinnerBox" attributeName="transform" type="rotate" from="0 50 50" to="180 50 50" dur="0.5s" begin="rectBox.end"></animateTransform></rect><rect x="27" y="27" width="46" height="50" fill="currentColor"><animate id="rectBox" attributeName="height" begin="0s;spinnerBox.end" dur="1.3s" from="50" to="0" fill="freeze"></animate></rect>';
re({
  name: "QSpinnerBox",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: tm
    });
  }
});
const am = '<circle cx="50" cy="50" r="48" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="currentColor"></circle><line stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" stroke="currentColor" x1="50" y1="50" x2="85" y2="50.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite"></animateTransform></line><line stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" stroke="currentColor" x1="50" y1="50" x2="49.5" y2="74"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="15s" repeatCount="indefinite"></animateTransform></line>';
re({
  name: "QSpinnerClock",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: am
    });
  }
});
const nm = '<rect x="0" y="0" width="100" height="100" fill="none"></rect><path d="M78,19H22c-6.6,0-12,5.4-12,12v31c0,6.6,5.4,12,12,12h37.2c0.4,3,1.8,5.6,3.7,7.6c2.4,2.5,5.1,4.1,9.1,4 c-1.4-2.1-2-7.2-2-10.3c0-0.4,0-0.8,0-1.3h8c6.6,0,12-5.4,12-12V31C90,24.4,84.6,19,78,19z" fill="currentColor"></path><circle cx="30" cy="47" r="5" fill="#fff"><animate attributeName="opacity" from="0" to="1" values="0;1;1" keyTimes="0;0.2;1" dur="1s" repeatCount="indefinite"></animate></circle><circle cx="50" cy="47" r="5" fill="#fff"><animate attributeName="opacity" from="0" to="1" values="0;0;1;1" keyTimes="0;0.2;0.4;1" dur="1s" repeatCount="indefinite"></animate></circle><circle cx="70" cy="47" r="5" fill="#fff"><animate attributeName="opacity" from="0" to="1" values="0;0;1;1" keyTimes="0;0.4;0.6;1" dur="1s" repeatCount="indefinite"></animate></circle>';
re({
  name: "QSpinnerComment",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      innerHTML: nm
    });
  }
});
const lm = '<rect x="0" y="0" width="100" height="100" fill="none"></rect><g transform="translate(25 25)"><rect x="-20" y="-20" width="40" height="40" fill="currentColor" opacity="0.9"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(75 25)"><rect x="-20" y="-20" width="40" height="40" fill="currentColor" opacity="0.8"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.1s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(25 75)"><rect x="-20" y="-20" width="40" height="40" fill="currentColor" opacity="0.7"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.3s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(75 75)"><rect x="-20" y="-20" width="40" height="40" fill="currentColor" opacity="0.6"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.2s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g>';
re({
  name: "QSpinnerCube",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      innerHTML: lm
    });
  }
});
const om = '<circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity=".3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from=".5" to=".5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle>';
var im = re({
  name: "QSpinnerDots",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      fill: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 120 30",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: om
    });
  }
});
const rm = '<g transform="translate(20 50)"><rect x="-10" y="-30" width="20" height="60" fill="currentColor" opacity="0.6"><animateTransform attributeName="transform" type="scale" from="2" to="1" begin="0s" repeatCount="indefinite" dur="1s" calcMode="spline" keySplines="0.1 0.9 0.4 1" keyTimes="0;1" values="2;1"></animateTransform></rect></g><g transform="translate(50 50)"><rect x="-10" y="-30" width="20" height="60" fill="currentColor" opacity="0.8"><animateTransform attributeName="transform" type="scale" from="2" to="1" begin="0.1s" repeatCount="indefinite" dur="1s" calcMode="spline" keySplines="0.1 0.9 0.4 1" keyTimes="0;1" values="2;1"></animateTransform></rect></g><g transform="translate(80 50)"><rect x="-10" y="-30" width="20" height="60" fill="currentColor" opacity="0.9"><animateTransform attributeName="transform" type="scale" from="2" to="1" begin="0.2s" repeatCount="indefinite" dur="1s" calcMode="spline" keySplines="0.1 0.9 0.4 1" keyTimes="0;1" values="2;1"></animateTransform></rect></g>';
re({
  name: "QSpinnerFacebook",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      xmlns: "http://www.w3.org/2000/svg",
      preserveAspectRatio: "xMidYMid",
      innerHTML: rm
    });
  }
});
const sm = '<g transform="translate(-20,-20)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" from="90 50 50" to="0 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></g><g transform="translate(20,20) rotate(15 50 50)"><path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></g>';
re({
  name: "QSpinnerGears",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: sm
    });
  }
});
const um = '<circle cx="12.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="0s" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5"><animate attributeName="fill-opacity" begin="100ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="300ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="52.5" r="12.5"><animate attributeName="fill-opacity" begin="600ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="12.5" r="12.5"><animate attributeName="fill-opacity" begin="800ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="52.5" r="12.5"><animate attributeName="fill-opacity" begin="400ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="12.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="700ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="52.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="500ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="92.5" cy="92.5" r="12.5"><animate attributeName="fill-opacity" begin="200ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"></animate></circle>';
re({
  name: "QSpinnerGrid",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      fill: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 105 105",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: um
    });
  }
});
const dm = '<path d="M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.716-6.002 11.47-7.65 17.304-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z" fill-opacity=".5"><animate attributeName="fill-opacity" begin="0s" dur="1.4s" values="0.5;1;0.5" calcMode="linear" repeatCount="indefinite"></animate></path><path d="M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.593-2.32 17.308 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z" fill-opacity=".5"><animate attributeName="fill-opacity" begin="0.7s" dur="1.4s" values="0.5;1;0.5" calcMode="linear" repeatCount="indefinite"></animate></path><path d="M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z"></path>';
re({
  name: "QSpinnerHearts",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      fill: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 140 64",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: dm
    });
  }
});
const cm = '<g><path fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10" d="M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z"></path><clipPath id="uil-hourglass-clip1"><rect x="15" y="20" width="70" height="25"><animate attributeName="height" from="25" to="0" dur="1s" repeatCount="indefinite" values="25;0;0" keyTimes="0;0.5;1"></animate><animate attributeName="y" from="20" to="45" dur="1s" repeatCount="indefinite" values="20;45;45" keyTimes="0;0.5;1"></animate></rect></clipPath><clipPath id="uil-hourglass-clip2"><rect x="15" y="55" width="70" height="25"><animate attributeName="height" from="0" to="25" dur="1s" repeatCount="indefinite" values="0;25;25" keyTimes="0;0.5;1"></animate><animate attributeName="y" from="80" to="55" dur="1s" repeatCount="indefinite" values="80;55;55" keyTimes="0;0.5;1"></animate></rect></clipPath><path d="M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z" clip-path="url(#uil-hourglass-clip1)" fill="currentColor"></path><path d="M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z" clip-path="url(#uil-hourglass-clip2)" fill="currentColor"></path><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="180 50 50" repeatCount="indefinite" dur="1s" values="0 50 50;0 50 50;180 50 50" keyTimes="0;0.7;1"></animateTransform></g>';
re({
  name: "QSpinnerHourglass",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: cm
    });
  }
});
const fm = '<path d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z" fill="none" stroke="currentColor" stroke-width="8" stroke-dasharray="10.691205342610678 10.691205342610678" stroke-dashoffset="0"><animate attributeName="stroke-dashoffset" from="0" to="21.382410685221355" begin="0" dur="2s" repeatCount="indefinite" fill="freeze"></animate></path>';
re({
  name: "QSpinnerInfinity",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      innerHTML: fm
    });
  }
});
const vm = '<g stroke-width="4" stroke-linecap="round"><line y1="17" y2="29" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="17" y2="29" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g>';
var mm = re({
  name: "QSpinnerIos",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      stroke: "currentColor",
      fill: "currentColor",
      viewBox: "0 0 64 64",
      innerHTML: vm
    });
  }
});
const gm = '<circle cx="50" cy="50" r="44" fill="none" stroke-width="4" stroke-opacity=".5" stroke="currentColor"></circle><circle cx="8" cy="54" r="6" fill="currentColor" stroke-width="3" stroke="currentColor"><animateTransform attributeName="transform" type="rotate" from="0 50 48" to="360 50 52" dur="2s" repeatCount="indefinite"></animateTransform></circle>';
re({
  name: "QSpinnerOrbit",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: gm
    });
  }
});
const hm = '<g transform="translate(1 1)" stroke-width="2" fill="none" fill-rule="evenodd"><circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"></animateTransform></path></g>';
var bm = re({
  name: "QSpinnerOval",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      stroke: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 38 38",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: hm
    });
  }
});
const ym = '<path d="M0 50A50 50 0 0 1 50 0L50 50L0 50" fill="currentColor" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="0.8s" repeatCount="indefinite"></animateTransform></path><path d="M50 0A50 50 0 0 1 100 50L50 50L50 0" fill="currentColor" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.6s" repeatCount="indefinite"></animateTransform></path><path d="M100 50A50 50 0 0 1 50 100L50 50L100 50" fill="currentColor" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2.4s" repeatCount="indefinite"></animateTransform></path><path d="M50 100A50 50 0 0 1 0 50L50 50L50 100" fill="currentColor" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3.2s" repeatCount="indefinite"></animateTransform></path>';
var pm = re({
  name: "QSpinnerPie",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: ym
    });
  }
});
const Cm = '<g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle></g>';
re({
  name: "QSpinnerPuff",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      stroke: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 44 44",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: Cm
    });
  }
});
const km = '<g transform="scale(0.55)"><circle cx="30" cy="150" r="30" fill="currentColor"><animate attributeName="opacity" from="0" to="1" dur="1s" begin="0" repeatCount="indefinite" keyTimes="0;0.5;1" values="0;1;1"></animate></circle><path d="M90,150h30c0-49.7-40.3-90-90-90v30C63.1,90,90,116.9,90,150z" fill="currentColor"><animate attributeName="opacity" from="0" to="1" dur="1s" begin="0.1" repeatCount="indefinite" keyTimes="0;0.5;1" values="0;1;1"></animate></path><path d="M150,150h30C180,67.2,112.8,0,30,0v30C96.3,30,150,83.7,150,150z" fill="currentColor"><animate attributeName="opacity" from="0" to="1" dur="1s" begin="0.2" repeatCount="indefinite" keyTimes="0;0.5;1" values="0;1;1"></animate></path></g>';
re({
  name: "QSpinnerRadio",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: km
    });
  }
});
const Sm = '<g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2"><circle cx="22" cy="22" r="6"><animate attributeName="r" begin="1.5s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="1.5s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="stroke-width" begin="1.5s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="6"><animate attributeName="r" begin="3s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="3s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="stroke-width" begin="3s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="8"><animate attributeName="r" begin="0s" dur="1.5s" values="6;1;2;3;4;5;6" calcMode="linear" repeatCount="indefinite"></animate></circle></g>';
var wm = re({
  name: "QSpinnerRings",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      stroke: "currentColor",
      width: t.value,
      height: t.value,
      viewBox: "0 0 45 45",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: Sm
    });
  }
});
const xm = '<defs><linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"><stop stop-color="currentColor" stop-opacity="0" offset="0%"></stop><stop stop-color="currentColor" stop-opacity=".631" offset="63.146%"></stop><stop stop-color="currentColor" offset="100%"></stop></linearGradient></defs><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#a)" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></path><circle fill="currentColor" cx="36" cy="18" r="1"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></circle></g>';
var _m = re({
  name: "QSpinnerTail",
  props: qt,
  setup(e) {
    const { cSize: t, classes: a } = Bt(e);
    return () => f("svg", {
      class: a.value,
      width: t.value,
      height: t.value,
      viewBox: "0 0 38 38",
      xmlns: "http://www.w3.org/2000/svg",
      innerHTML: xm
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
    const { proxy: { $q: n } } = be(), l = rt(e, n), o = V(null), i = {
      before: V(null),
      after: V(null)
    }, r = s(() => `q-splitter no-wrap ${e.horizontal === !0 ? "q-splitter--horizontal column" : "q-splitter--vertical row"} q-splitter--${e.disable === !0 ? "disabled" : "workable"}` + (l.value === !0 ? " q-splitter--dark" : "")), u = s(() => e.horizontal === !0 ? "height" : "width"), c = s(() => e.reverse !== !0 ? "before" : "after"), d = s(() => e.limits !== void 0 ? e.limits : e.unit === "%" ? [10, 90] : [50, 1 / 0]);
    function v(x) {
      return (e.unit === "%" ? x : Math.round(x)) + e.unit;
    }
    const m = s(() => ({ [c.value]: { [u.value]: v(e.modelValue) } }));
    let g, h, p, C, k;
    function y(x) {
      if (x.isFirst === !0) {
        const M = o.value.getBoundingClientRect()[u.value];
        g = e.horizontal === !0 ? "up" : "left", h = e.unit === "%" ? 100 : M, p = Math.min(h, d.value[1], Math.max(d.value[0], e.modelValue)), C = (e.reverse !== !0 ? 1 : -1) * (e.horizontal === !0 ? 1 : n.lang.rtl === !0 ? -1 : 1) * (e.unit === "%" ? M === 0 ? 0 : 100 / M : 1), o.value.classList.add("q-splitter--active");
        return;
      }
      if (x.isFinal === !0) {
        k !== e.modelValue && a("update:modelValue", k), o.value.classList.remove("q-splitter--active");
        return;
      }
      const L = p + C * (x.direction === g ? -1 : 1) * x.distance[e.horizontal === !0 ? "y" : "x"];
      k = Math.min(h, d.value[1], Math.max(d.value[0], L)), i[c.value].value.style[u.value] = v(k), e.emitImmediately === !0 && e.modelValue !== k && a("update:modelValue", k);
    }
    const b = s(() => [[
      Jt,
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
          style: m.value.before
        }, De(t.before)),
        f("div", {
          class: ["q-splitter__separator", e.separatorClass],
          style: e.separatorStyle,
          "aria-disabled": e.disable === !0 ? "true" : void 0
        }, [na("div", { class: "q-splitter__separator-area absolute-full" }, De(t.separator), "sep", e.disable !== !0, () => b.value)]),
        f("div", {
          ref: i.after,
          class: ["q-splitter__panel q-splitter__after" + (e.reverse === !0 ? "" : " col"), e.afterClass],
          style: m.value.after
        }, De(t.after))
      ];
      return f("div", {
        class: r.value,
        ref: o
      }, $t(t.default, x));
    };
  }
});
var Hu = re({
  name: "StepHeader",
  props: {
    stepper: {},
    step: {},
    goToPanel: Function
  },
  setup(e, { attrs: t }) {
    const { proxy: { $q: a } } = be(), n = V(null), l = s(() => e.stepper.modelValue === e.step.name), o = s(() => {
      const C = e.step.disable;
      return C === !0 || C === "";
    }), i = s(() => {
      const C = e.step.error;
      return C === !0 || C === "";
    }), r = s(() => {
      const C = e.step.done;
      return o.value === !1 && (C === !0 || C === "");
    }), u = s(() => {
      const C = e.step.headerNav, k = C === !0 || C === "" || C === void 0;
      return o.value === !1 && e.stepper.headerNav && k;
    }), c = s(() => e.step.prefix && (l.value === !1 || e.stepper.activeIcon === "none") && (i.value === !1 || e.stepper.errorIcon === "none") && (r.value === !1 || e.stepper.doneIcon === "none")), d = s(() => {
      const C = e.step.icon || e.stepper.inactiveIcon;
      if (l.value === !0) {
        const k = e.step.activeIcon || e.stepper.activeIcon;
        return k === "none" ? C : k || a.iconSet.stepper.active;
      }
      if (i.value === !0) {
        const k = e.step.errorIcon || e.stepper.errorIcon;
        return k === "none" ? C : k || a.iconSet.stepper.error;
      }
      if (o.value === !1 && r.value === !0) {
        const k = e.step.doneIcon || e.stepper.doneIcon;
        return k === "none" ? C : k || a.iconSet.stepper.done;
      }
      return C;
    }), v = s(() => {
      const C = i.value === !0 ? e.step.errorColor || e.stepper.errorColor : void 0;
      if (l.value === !0) {
        const k = e.step.activeColor || e.stepper.activeColor || e.step.color;
        return k !== void 0 ? k : C;
      }
      return C !== void 0 ? C : o.value === !1 && r.value === !0 ? e.step.doneColor || e.stepper.doneColor || e.step.color || e.stepper.inactiveColor : e.step.color || e.stepper.inactiveColor;
    }), m = s(() => "q-stepper__tab col-grow flex items-center no-wrap relative-position" + (v.value !== void 0 ? ` text-${v.value}` : "") + (i.value === !0 ? " q-stepper__tab--error q-stepper__tab--error-with-" + (c.value === !0 ? "prefix" : "icon") : "") + (l.value === !0 ? " q-stepper__tab--active" : "") + (r.value === !0 ? " q-stepper__tab--done" : "") + (u.value === !0 ? " q-stepper__tab--navigation q-focusable q-hoverable" : "") + (o.value === !0 ? " q-stepper__tab--disabled" : "")), g = s(() => e.stepper.headerNav !== !0 ? !1 : u.value);
    function h() {
      var C;
      (C = n.value) == null || C.focus(), l.value === !1 && e.goToPanel(e.step.name);
    }
    function p(C) {
      C.keyCode === 13 && l.value === !1 && e.goToPanel(e.step.name);
    }
    return () => {
      const C = { class: m.value };
      u.value === !0 && (C.onClick = h, C.onKeyup = p, Object.assign(C, o.value === !0 ? {
        tabindex: -1,
        "aria-disabled": "true"
      } : { tabindex: t.tabindex || 0 }));
      const k = [f("div", {
        class: "q-focus-helper",
        tabindex: -1,
        ref: n
      }), f("div", { class: "q-stepper__dot row flex-center q-stepper__line relative-position" }, [f("span", { class: "row flex-center" }, [c.value === !0 ? e.step.prefix : f(st, { name: d.value })])])];
      if (e.step.title !== void 0 && e.step.title !== null) {
        const y = [f("div", { class: "q-stepper__title" }, e.step.title)];
        e.step.caption !== void 0 && e.step.caption !== null && y.push(f("div", { class: "q-stepper__caption" }, e.step.caption)), k.push(f("div", { class: "q-stepper__label q-stepper__line relative-position" }, y));
      }
      return ea(f("div", C, k), [[Fl, g.value]]);
    };
  }
});
function Nu(e) {
  return f("div", { class: "q-stepper__step-content" }, [f("div", { class: "q-stepper__step-inner" }, De(e.default))]);
}
const Lr = { setup(e, { slots: t }) {
  return () => Nu(t);
} };
re({
  name: "QStep",
  props: {
    ...ui,
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
    const { proxy: { $q: n } } = be(), l = Kt(rs, vt);
    if (l === vt)
      return console.error("QStep needs to be a child of QStepper"), vt;
    const { getCache: o } = Zn(), i = V(null), r = s(() => l.value.modelValue === e.name), u = s(() => n.platform.is.ios !== !0 && n.platform.is.chrome === !0 || r.value !== !0 || l.value.vertical !== !0 ? {} : { onScroll(v) {
      const { target: m } = v;
      m.scrollTop > 0 && (m.scrollTop = 0), e.onScroll !== void 0 && a("scroll", v);
    } }), c = s(() => typeof e.name == "string" || typeof e.name == "number" ? e.name : String(e.name));
    function d() {
      const v = l.value.vertical;
      return v === !0 && l.value.keepAlive === !0 ? f(ts, l.value.keepAliveProps.value, r.value === !0 ? [f(l.value.needsUniqueKeepAliveWrapper.value === !0 ? o(c.value, () => ({
        ...Lr,
        name: c.value
      })) : Lr, { key: c.value }, t.default)] : void 0) : v !== !0 || r.value === !0 ? Nu(t) : void 0;
    }
    return () => f("div", {
      ref: i,
      class: "q-stepper__step",
      role: "tabpanel",
      ...u.value
    }, l.value.vertical === !0 ? [f(Hu, {
      stepper: l.value,
      step: e,
      goToPanel: l.value.goToPanel
    }), l.value.animated === !0 ? f(ki, d) : d()] : [d()]);
  }
});
const $m = /(-\w)/g;
function qm(e) {
  const t = {};
  for (const a in e) {
    const n = a.replace($m, (l) => l[1].toUpperCase());
    t[n] = e[a];
  }
  return t;
}
re({
  name: "QStepper",
  props: {
    ...it,
    ...di,
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
  emits: ci,
  setup(e, { slots: t }) {
    const a = rt(e, be().proxy.$q), { updatePanelsList: n, isValidPanelName: l, updatePanelIndex: o, getPanelContent: i, getPanels: r, panelDirectives: u, goToPanel: c, keepAliveProps: d, needsUniqueKeepAliveWrapper: v } = fi();
    La(rs, s(() => ({
      goToPanel: c,
      keepAliveProps: d,
      needsUniqueKeepAliveWrapper: v,
      ...e
    })));
    const m = s(() => `q-stepper q-stepper--${e.vertical === !0 ? "vertical" : "horizontal"}` + (e.flat === !0 ? " q-stepper--flat" : "") + (e.bordered === !0 ? " q-stepper--bordered" : "") + (a.value === !0 ? " q-stepper--dark q-dark" : "")), g = s(() => `q-stepper__header row items-stretch justify-between q-stepper__header--${e.alternativeLabels === !0 ? "alternative" : "standard"}-labels` + (e.flat === !1 || e.bordered === !0 ? " q-stepper__header--border" : "") + (e.contracted === !0 ? " q-stepper__header--contracted" : "") + (e.headerClass !== void 0 ? ` ${e.headerClass}` : ""));
    function h() {
      const p = De(t.message, []);
      if (e.vertical === !0) {
        l(e.modelValue) && o();
        const C = f("div", { class: "q-stepper__content" }, De(t.default));
        return p === void 0 ? [C] : p.concat(C);
      }
      return [
        f("div", { class: g.value }, r().map((C) => {
          const k = qm(C.props);
          return f(Hu, {
            key: k.name,
            stepper: e,
            step: k,
            goToPanel: c
          });
        })),
        p,
        na("div", { class: "q-stepper__content q-panel-parent" }, i(), "cont", e.swipeable, () => u.value)
      ];
    }
    return () => (n(t), f("div", { class: m.value }, $t(t.navigation, h())));
  }
});
re({
  name: "QStepperNavigation",
  setup(e, { slots: t }) {
    return () => f("div", { class: "q-stepper__nav" }, De(t.default));
  }
});
var Bm = re({
  name: "QTh",
  props: {
    props: Object,
    autoWidth: Boolean
  },
  emits: ["click"],
  setup(e, { slots: t, emit: a }) {
    const n = be(), { proxy: { $q: l } } = n, o = (i) => {
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
        r = Yn(t.default, []), r[c](f(st, {
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
function ju(e, t) {
  return f("div", e, [f("table", { class: "q-table" }, t)]);
}
const Tm = {
  list: xv,
  table: Tv
}, Mm = [
  "list",
  "table",
  "__qtable"
];
var Qu = re({
  name: "QVirtualScroll",
  props: {
    ...jo,
    type: {
      type: String,
      default: "list",
      validator: (e) => Mm.includes(e)
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
    const l = V(null), o = s(() => e.itemsSize >= 0 && e.itemsFn !== void 0 ? parseInt(e.itemsSize, 10) : Array.isArray(e.items) ? e.items.length : 0), { virtualScrollSliceRange: i, localResetVirtualScroll: r, padVirtualScroll: u, onVirtualScrollEvt: c } = Iu({
      virtualScrollLength: o,
      getVirtualScrollTarget: h,
      getVirtualScrollEl: g
    }), d = s(() => {
      if (o.value === 0) return [];
      const y = (b, w) => ({
        index: i.value.from + w,
        item: b
      });
      return e.itemsFn === void 0 ? e.items.slice(i.value.from, i.value.to).map(y) : e.itemsFn(i.value.from, i.value.to - i.value.from).map(y);
    }), v = s(() => "q-virtual-scroll q-virtual-scroll" + (e.virtualScrollHorizontal === !0 ? "--horizontal" : "--vertical") + (e.scrollTarget !== void 0 ? "" : " scroll")), m = s(() => e.scrollTarget !== void 0 ? {} : { tabindex: 0 });
    se(o, () => {
      r();
    }), se(() => e.scrollTarget, () => {
      C(), p();
    });
    function g() {
      return l.value.$el || l.value;
    }
    function h() {
      return n;
    }
    function p() {
      n = fa(g(), e.scrollTarget), n.addEventListener("scroll", c, gt.passive);
    }
    function C() {
      n !== void 0 && (n.removeEventListener("scroll", c, gt.passive), n = void 0);
    }
    function k() {
      let y = u(e.type === "list" ? "div" : "tbody", d.value.map(t.default));
      return t.before !== void 0 && (y = t.before().concat(y)), $t(t.after, y);
    }
    return Uo(() => {
      r();
    }), ht(() => {
      p();
    }), en(() => {
      p();
    }), Sa(() => {
      C();
    }), tt(() => {
      C();
    }), () => {
      if (t.default === void 0) {
        console.error("QVirtualScroll: default scoped slot is required for rendering");
        return;
      }
      return e.type === "__qtable" ? ju({
        ref: l,
        class: "q-table__middle " + v.value
      }, k()) : f(Tm[e.type], {
        ...a,
        ref: l,
        class: [a.class, v.value],
        ...m.value
      }, k);
    };
  }
});
function Am(e, t) {
  return new Date(e) - new Date(t);
}
const Dm = {
  sortMethod: Function,
  binaryStateSort: Boolean,
  columnSortOrder: {
    type: String,
    validator: (e) => e === "ad" || e === "da",
    default: "ad"
  }
};
function Lm(e, t, a, n) {
  const l = s(() => {
    const { sortBy: r } = t.value;
    return r && a.value.find((u) => u.name === r) || null;
  }), o = s(() => e.sortMethod !== void 0 ? e.sortMethod : (r, u, c) => {
    const d = a.value.find((g) => g.name === u);
    if (d === void 0 || d.field === void 0) return r;
    const v = c === !0 ? -1 : 1, m = typeof d.field == "function" ? (g) => d.field(g) : (g) => g[d.field];
    return r.sort((g, h) => {
      let p = m(g), C = m(h);
      return d.rawSort !== void 0 ? d.rawSort(p, C, g, h) * v : p == null ? -1 * v : C == null ? Number(v) : d.sort !== void 0 ? d.sort(p, C, g, h) * v : jn(p) === !0 && jn(C) === !0 ? (p - C) * v : Mo(p) === !0 && Mo(C) === !0 ? Am(p, C) * v : typeof p == "boolean" && typeof C == "boolean" ? (p - C) * v : ([p, C] = [p, C].map((k) => String(k).toLocaleString().toLowerCase()), p < C ? -1 * v : p === C ? 0 : v);
    });
  });
  function i(r) {
    let u = e.columnSortOrder;
    if (Nt(r) === !0)
      r.sortOrder && (u = r.sortOrder), r = r.name;
    else {
      const v = a.value.find((m) => m.name === r);
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
const Vm = {
  filter: [String, Object],
  filterMethod: Function
};
function zm(e, t) {
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
function Pm(e, t) {
  for (const a in t) if (t[a] !== e[a]) return !1;
  return !0;
}
function Vr(e) {
  return e.page < 1 && (e.page = 1), e.rowsPerPage !== void 0 && e.rowsPerPage < 1 && (e.rowsPerPage = 0), e;
}
const Rm = {
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
function Fm(e, t) {
  const { props: a, emit: n } = e, l = V(Object.assign({
    sortBy: null,
    descending: !1,
    page: 1,
    rowsPerPage: a.rowsPerPageOptions.length !== 0 ? a.rowsPerPageOptions[0] : 5
  }, a.pagination)), o = s(() => Vr(a["onUpdate:pagination"] !== void 0 ? {
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
    const m = Vr({
      ...o.value,
      ...d
    });
    if (Pm(o.value, m) === !0) {
      i.value === !0 && v === !0 && r(m);
      return;
    }
    if (i.value === !0) {
      r(m);
      return;
    }
    a.pagination !== void 0 && a["onUpdate:pagination"] !== void 0 ? n("update:pagination", m) : l.value = m;
  }
  return {
    innerPagination: l,
    computedPagination: o,
    isServerSide: i,
    requestServerInteraction: u,
    setPagination: c
  };
}
function Em(e, t, a, n, l, o) {
  const { props: i, emit: r, proxy: { $q: u } } = e, c = s(() => n.value === !0 ? a.value.rowsNumber || 0 : o.value), d = s(() => {
    const { page: w, rowsPerPage: x } = a.value;
    return (w - 1) * x;
  }), v = s(() => {
    const { page: w, rowsPerPage: x } = a.value;
    return w * x;
  }), m = s(() => a.value.page === 1), g = s(() => a.value.rowsPerPage === 0 ? 1 : Math.max(1, Math.ceil(c.value / a.value.rowsPerPage))), h = s(() => v.value === 0 ? !0 : a.value.page >= g.value), p = s(() => (i.rowsPerPageOptions.includes(t.value.rowsPerPage) ? i.rowsPerPageOptions : [t.value.rowsPerPage].concat(i.rowsPerPageOptions)).map((w) => ({
    label: w === 0 ? u.lang.table.allRows : String(w),
    value: w
  })));
  se(g, (w, x) => {
    if (w === x) return;
    const L = a.value.page;
    w && !L ? l({ page: 1 }) : w < L && l({ page: w });
  });
  function C() {
    l({ page: 1 });
  }
  function k() {
    const { page: w } = a.value;
    w > 1 && l({ page: w - 1 });
  }
  function y() {
    const { page: w, rowsPerPage: x } = a.value;
    v.value > 0 && w * x < c.value && l({ page: w + 1 });
  }
  function b() {
    l({ page: g.value });
  }
  return i["onUpdate:pagination"] !== void 0 && r("update:pagination", { ...a.value }), {
    firstRowIndex: d,
    lastRowIndex: v,
    isFirstPage: m,
    isLastPage: h,
    pagesNumber: g,
    computedRowsPerPageOptions: p,
    computedRowsNumber: c,
    firstPage: C,
    prevPage: k,
    nextPage: y,
    lastPage: b
  };
}
const Im = {
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
}, Om = ["update:selected", "selection"];
function Hm(e, t, a, n) {
  const l = s(() => {
    const h = {};
    return e.selected.map(n.value).forEach((p) => {
      h[p] = !0;
    }), h;
  }), o = s(() => e.selection !== "none"), i = s(() => e.selection === "single"), r = s(() => e.selection === "multiple"), u = s(() => a.value.length !== 0 && a.value.every((h) => l.value[n.value(h)] === !0)), c = s(() => u.value !== !0 && a.value.some((h) => l.value[n.value(h)] === !0)), d = s(() => e.selected.length);
  function v(h) {
    return l.value[h] === !0;
  }
  function m() {
    t("update:selected", []);
  }
  function g(h, p, C, k) {
    t("selection", {
      rows: p,
      added: C,
      keys: h,
      evt: k
    }), t("update:selected", i.value === !0 ? C === !0 ? p : [] : C === !0 ? e.selected.concat(p) : e.selected.filter((y) => h.includes(n.value(y)) === !1));
  }
  return {
    hasSelectionMode: o,
    singleSelection: i,
    multipleSelection: r,
    allRowsSelected: u,
    someRowsSelected: c,
    rowsSelectedNumber: d,
    isRowSelected: v,
    clearSelection: m,
    updateSelection: g
  };
}
function zr(e) {
  return Array.isArray(e) ? e.slice() : [];
}
const Nm = { expanded: Array }, jm = ["update:expanded"];
function Qm(e, t) {
  const a = V(zr(e.expanded));
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
const Um = { visibleColumns: Array };
function Km(e, t, a) {
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
const dl = "q-table__bottom row items-center", Uu = {};
Eu.forEach((e) => {
  Uu[e] = {};
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
    ...Uu,
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
    ...vi,
    ...Um,
    ...Vm,
    ...Rm,
    ...Nm,
    ...Im,
    ...Dm
  },
  emits: [
    "request",
    "virtualScroll",
    ...mi,
    ...jm,
    ...Om
  ],
  setup(e, { slots: t, emit: a }) {
    const n = be(), { proxy: { $q: l } } = n, o = rt(e, l), { inFullscreen: i, toggleFullscreen: r } = gi(), u = s(() => typeof e.rowKey == "function" ? e.rowKey : (J) => J[e.rowKey]), c = V(null), d = V(null), v = s(() => e.grid !== !0 && e.virtualScroll === !0), m = s(() => " q-table__card" + (o.value === !0 ? " q-table__card--dark q-dark" : "") + (e.square === !0 ? " q-table--square" : "") + (e.flat === !0 ? " q-table--flat" : "") + (e.bordered === !0 ? " q-table--bordered" : "")), g = s(() => `q-table__container q-table--${e.separator}-separator column no-wrap` + (e.grid === !0 ? " q-table--grid" : m.value) + (o.value === !0 ? " q-table--dark" : "") + (e.dense === !0 ? " q-table--dense" : "") + (e.wrapCells === !1 ? " q-table--no-wrap" : "") + (i.value === !0 ? " fullscreen scroll" : "")), h = s(() => g.value + (e.loading === !0 ? " q-table--loading" : ""));
    se(() => e.tableStyle + e.tableClass + e.tableHeaderStyle + e.tableHeaderClass + g.value, () => {
      var J;
      v.value === !0 && ((J = d.value) == null || J.reset());
    });
    const { innerPagination: p, computedPagination: C, isServerSide: k, requestServerInteraction: y, setPagination: b } = Fm(n, ce), { computedFilterMethod: w } = zm(e, b), { isRowExpanded: x, setExpanded: L, updateExpanded: M } = Qm(e, a), K = s(() => {
      let J = e.rows;
      if (k.value === !0 || J.length === 0) return J;
      const { sortBy: Se, descending: Re } = C.value;
      return e.filter && (J = w.value(J, e.filter, Z.value, ce)), z.value !== null && (J = ne.value(e.rows === J ? J.slice() : J, Se, Re)), J;
    }), X = s(() => K.value.length), A = s(() => {
      let J = K.value;
      if (k.value === !0) return J;
      const { rowsPerPage: Se } = C.value;
      return Se !== 0 && (I.value === 0 && e.rows !== J ? J.length > de.value && (J = J.slice(0, de.value)) : J = J.slice(I.value, de.value)), J;
    }), { hasSelectionMode: $, singleSelection: D, multipleSelection: _, allRowsSelected: S, someRowsSelected: T, rowsSelectedNumber: H, isRowSelected: E, clearSelection: Q, updateSelection: j } = Hm(e, a, A, u), { colList: N, computedCols: Z, computedColsMap: B, computedColspan: G } = Km(e, C, $), { columnToSort: z, computedSortMethod: ne, sort: P } = Lm(e, C, N, b), { firstRowIndex: I, lastRowIndex: de, isFirstPage: Y, isLastPage: fe, pagesNumber: W, computedRowsPerPageOptions: he, computedRowsNumber: _e, firstPage: we, prevPage: Ie, nextPage: ke, lastPage: Me } = Em(n, p, C, k, b, X), Le = s(() => A.value.length === 0), ot = s(() => {
      const J = {};
      return Eu.forEach((Se) => {
        J[Se] = e[Se];
      }), J.virtualScrollItemSize === void 0 && (J.virtualScrollItemSize = e.dense === !0 ? 28 : 48), J;
    });
    function We() {
      v.value === !0 && d.value.reset();
    }
    function ue() {
      if (e.grid === !0) return da();
      const J = e.hideHeader !== !0 ? Fe : null;
      if (v.value === !0) {
        const Re = t["top-row"], Ne = t["bottom-row"], Xe = { default: (pt) => Ge(pt.item, t.body, pt.index) };
        if (Re !== void 0) {
          const pt = f("tbody", Re({ cols: Z.value }));
          Xe.before = J === null ? () => pt : () => [J()].concat(pt);
        } else J !== null && (Xe.before = J);
        return Ne !== void 0 && (Xe.after = () => f("tbody", Ne({ cols: Z.value }))), f(Qu, {
          ref: d,
          class: e.tableClass,
          style: e.tableStyle,
          ...ot.value,
          scrollTarget: e.virtualScrollTarget,
          items: A.value,
          type: "__qtable",
          tableColspan: G.value,
          onVirtualScroll: ve
        }, Xe);
      }
      const Se = [Ke()];
      return J !== null && Se.unshift(J()), ju({
        class: ["q-table__middle scroll", e.tableClass],
        style: e.tableStyle
      }, Se);
    }
    function le(J, Se) {
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
    function ve(J) {
      a("virtualScroll", J);
    }
    function Pe() {
      return [f(Pu, {
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
        const ee = {
          key: Ne,
          row: J,
          pageIndex: Re,
          __trClass: Xe ? "selected" : ""
        };
        if (e.tableRowStyleFn !== void 0 && (ee.__trStyle = e.tableRowStyleFn(J)), e.tableRowClassFn !== void 0) {
          const xe = e.tableRowClassFn(J);
          xe && (ee.__trClass = `${xe} ${ee.__trClass}`);
        }
        return Se(je(ee));
      }
      const pt = t["body-cell"], q = Z.value.map((ee) => {
        const xe = t[`body-cell-${ee.name}`], $e = xe !== void 0 ? xe : pt;
        return $e !== void 0 ? $e(Qe({
          key: Ne,
          row: J,
          pageIndex: Re,
          col: ee
        })) : f("td", {
          class: ee.__tdClass(J),
          style: ee.__tdStyle(J)
        }, ce(ee, J));
      });
      if ($.value === !0) {
        const ee = t["body-selection"], xe = ee !== void 0 ? ee(et({
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
      if (e.onRowClick !== void 0 && (U.class["cursor-pointer"] = !0, U.onClick = (ee) => {
        a("rowClick", ee, J, Re);
      }), e.onRowDblclick !== void 0 && (U.class["cursor-pointer"] = !0, U.onDblclick = (ee) => {
        a("rowDblclick", ee, J, Re);
      }), e.onRowContextmenu !== void 0 && (U.class["cursor-pointer"] = !0, U.onContextmenu = (ee) => {
        a("rowContextmenu", ee, J, Re);
      }), e.tableRowStyleFn !== void 0 && (U.style = e.tableRowStyleFn(J)), e.tableRowClassFn !== void 0) {
        const ee = e.tableRowClassFn(J);
        ee && (U.class[ee] = !0);
      }
      return f("tr", U, q);
    }
    function Ke() {
      const J = t.body, Se = t["top-row"], Re = t["bottom-row"];
      let Ne = A.value.map((Xe, pt) => Ge(Xe, J, pt));
      return Se !== void 0 && (Ne = Se({ cols: Z.value }).concat(Ne)), Re !== void 0 && (Ne = Ne.concat(Re({ cols: Z.value }))), f("tbody", Ne);
    }
    function je(J) {
      return te(J), J.cols = J.cols.map((Se) => zt({ ...Se }, "value", () => ce(Se, J.row))), J;
    }
    function Qe(J) {
      return te(J), zt(J, "value", () => ce(J.col, J.row)), J;
    }
    function et(J) {
      return te(J), J;
    }
    function te(J) {
      Object.assign(J, {
        cols: Z.value,
        colsMap: B.value,
        sort: P,
        rowIndex: I.value + J.pageIndex,
        color: e.color,
        dark: o.value,
        dense: e.dense
      }), $.value === !0 && zt(J, "selected", () => E(J.key), (Se, Re) => {
        j([J.key], [J.row], Se, Re);
      }), zt(J, "expand", () => x(J.key), (Se) => {
        M(J.key, Se);
      });
    }
    function ce(J, Se) {
      const Re = typeof J.field == "function" ? J.field(Se) : Se[J.field];
      return J.format !== void 0 ? J.format(Re, Se) : Re;
    }
    const ze = s(() => ({
      pagination: C.value,
      pagesNumber: W.value,
      isFirstPage: Y.value,
      isLastPage: fe.value,
      firstPage: we,
      prevPage: Ie,
      nextPage: ke,
      lastPage: Me,
      inFullscreen: i.value,
      toggleFullscreen: r
    }));
    function ae() {
      const J = t.top, Se = t["top-left"], Re = t["top-right"], Ne = t["top-selection"], Xe = $.value === !0 && Ne !== void 0 && H.value > 0, pt = "q-table__top relative-position row items-center";
      if (J !== void 0) return f("div", { class: pt }, [J(ze.value)]);
      let q;
      if (Xe === !0 ? q = Ne(ze.value).slice() : (q = [], Se !== void 0 ? q.push(f("div", { class: "q-table__control" }, [Se(ze.value)])) : e.title && q.push(f("div", { class: "q-table__control" }, [f("div", { class: ["q-table__title", e.titleClass] }, e.title)]))), Re !== void 0 && (q.push(f("div", { class: "q-table__separator col" })), q.push(f("div", { class: "q-table__control" }, [Re(ze.value)]))), q.length !== 0)
        return f("div", { class: pt }, q);
    }
    const ye = s(() => T.value === !0 ? null : S.value);
    function Fe() {
      const J = Te();
      return e.loading === !0 && t.loading === void 0 && J.push(f("tr", { class: "q-table__progress" }, [f("th", {
        class: "relative-position",
        colspan: G.value
      }, Pe())])), f("thead", J);
    }
    function Te() {
      const J = t.header, Se = t["header-cell"];
      if (J !== void 0) return J(Oe({ header: !0 })).slice();
      const Re = Z.value.map((Ne) => {
        const Xe = t[`header-cell-${Ne.name}`], pt = Xe !== void 0 ? Xe : Se, q = Oe({ col: Ne });
        return pt !== void 0 ? pt(q) : f(Bm, {
          key: Ne.name,
          props: q
        }, () => Ne.label);
      });
      if (D.value === !0 && e.grid !== !0) Re.unshift(f("th", { class: "q-table--col-auto-width" }, " "));
      else if (_.value === !0) {
        const Ne = t["header-selection"], Xe = Ne !== void 0 ? Ne(Oe({})) : [f(In, {
          color: e.color,
          modelValue: ye.value,
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
    function Oe(J) {
      return Object.assign(J, {
        cols: Z.value,
        sort: P,
        colsMap: B.value,
        color: e.color,
        dark: o.value,
        dense: e.dense
      }), _.value === !0 && zt(J, "selected", () => ye.value, ut), J;
    }
    function ut(J) {
      T.value === !0 && (J = !1), j(A.value.map(u.value), A.value, J);
    }
    const Ft = s(() => {
      const J = [
        e.iconFirstPage || l.iconSet.table.firstPage,
        e.iconPrevPage || l.iconSet.table.prevPage,
        e.iconNextPage || l.iconSet.table.nextPage,
        e.iconLastPage || l.iconSet.table.lastPage
      ];
      return l.lang.rtl === !0 ? J.reverse() : J;
    });
    function kt() {
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
        return f("div", { class: dl + " q-table__bottom--nodata" }, Xe);
      }
      const J = t.bottom;
      if (J !== void 0) return f("div", { class: dl }, [J(ze.value)]);
      const Se = e.hideSelectedBanner !== !0 && $.value === !0 && H.value > 0 ? [f("div", { class: "q-table__control" }, [f("div", [(e.selectedRowsLabel || l.lang.table.selectedRecords)(H.value)])])] : [];
      if (e.hidePagination !== !0) return f("div", { class: dl + " justify-end" }, Wt(Se));
      if (Se.length !== 0) return f("div", { class: dl }, Se);
    }
    function Xt(J) {
      b({
        page: 1,
        rowsPerPage: J.value
      });
    }
    function Wt(J) {
      let Se;
      const { rowsPerPage: Re } = C.value, Ne = e.paginationLabel || l.lang.table.pagination, Xe = t.pagination, pt = e.rowsPerPageOptions.length > 1;
      if (J.push(f("div", { class: "q-table__separator col" })), pt === !0 && J.push(f("div", { class: "q-table__control" }, [f("span", { class: "q-table__bottom-item" }, [e.rowsPerPageLabel || l.lang.table.recordsPerPage]), f(Ou, {
        class: "q-table__select inline q-table__bottom-item",
        color: e.color,
        modelValue: Re,
        options: he.value,
        displayValue: Re === 0 ? l.lang.table.allRows : Re,
        dark: o.value,
        borderless: !0,
        dense: !0,
        optionsDense: !0,
        optionsCover: !0,
        "onUpdate:modelValue": Xt
      })])), Xe !== void 0) Se = Xe(ze.value);
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
          icon: Ft.value[0],
          disable: Y.value,
          "aria-label": l.lang.pagination.first,
          onClick: we
        })), Se.push(f(ft, {
          key: "pgPrev",
          ...q,
          icon: Ft.value[1],
          disable: Y.value,
          "aria-label": l.lang.pagination.prev,
          onClick: Ie
        }), f(ft, {
          key: "pgNext",
          ...q,
          icon: Ft.value[2],
          disable: fe.value,
          "aria-label": l.lang.pagination.next,
          onClick: ke
        })), W.value > 2 && Se.push(f(ft, {
          key: "pgLast",
          ...q,
          icon: Ft.value[3],
          disable: fe.value,
          "aria-label": l.lang.pagination.last,
          onClick: Me
        }));
      }
      return J.push(f("div", { class: "q-table__control" }, Se)), J;
    }
    function va() {
      return f("div", { class: "q-table__middle" }, e.gridHeader === !0 ? [f("table", { class: "q-table" }, [Fe()])] : e.loading === !0 && t.loading === void 0 ? Pe() : void 0);
    }
    function da() {
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
          class: ["q-table__grid-item-card" + m.value, e.cardClass],
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
      setPagination: b,
      firstPage: we,
      prevPage: Ie,
      nextPage: ke,
      lastPage: Me,
      isRowSelected: E,
      clearSelection: Q,
      isRowExpanded: x,
      setExpanded: L,
      sort: P,
      resetVirtualScroll: We,
      scrollTo: le,
      getCellValue: ce
    }), ls(n.proxy, {
      filteredSortedRows: () => K.value,
      computedRows: () => A.value,
      computedRowsNumber: () => _e.value
    }), () => {
      const J = [ae()], Se = {
        ref: c,
        class: h.value
      };
      return e.grid === !0 ? J.push(va()) : Object.assign(Se, {
        class: [Se.class, e.cardClass],
        style: e.cardStyle
      }), J.push(ue(), kt()), e.loading === !0 && t.loading !== void 0 && J.push(t.loading()), f("div", Se, J);
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
    const a = be(), n = s(() => "q-td" + (e.autoWidth === !0 ? " q-table--col-auto-width" : "") + (e.noHover === !0 ? " q-td--no-hover" : "") + " ");
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
    ...Xn,
    ...tu
  },
  emits: eu,
  setup(e, { slots: t, emit: a }) {
    const n = Rl({ useDisableForRouterLinkProps: !1 }), { renderTab: l, $tabs: o } = au(e, t, a, {
      exact: s(() => e.exact),
      ...n
    });
    return se(() => `${e.name} | ${e.exact} | ${(n.resolvedLink.value || {}).href}`, o.verifyRouteModel), () => l(n.linkTag.value, n.linkAttrs.value);
  }
});
function Wm(e, t) {
  return e.hour !== null && e.minute === null ? "minute" : "hour";
}
function Ym() {
  const e = /* @__PURE__ */ new Date();
  return {
    hour: e.getHours(),
    minute: e.getMinutes(),
    second: e.getSeconds(),
    millisecond: e.getMilliseconds()
  };
}
var Xm = re({
  name: "QTime",
  props: {
    ...it,
    ...oa,
    ...Ml,
    modelValue: {
      required: !0,
      validator: (e) => typeof e == "string" || e === null
    },
    mask: {
      ...Ml.mask,
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
  emits: ru,
  setup(e, { slots: t, emit: a }) {
    const n = be(), { $q: l } = n.proxy, o = rt(e, l), { tabindex: i, headerClass: r, getLocale: u, getCurrentDate: c } = su(e, l), d = za(Gn(e));
    let v, m;
    const g = V(null), h = s(() => z()), p = s(() => u()), C = s(() => ne()), k = zn(e.modelValue, h.value, p.value, e.calendar, C.value), y = V(Wm(k)), b = V(k), w = V(k.hour === null || k.hour < 12), x = s(() => `q-time q-time--${e.landscape === !0 ? "landscape" : "portrait"}` + (o.value === !0 ? " q-time--dark q-dark" : "") + (e.disable === !0 ? " disabled" : e.readonly === !0 ? " q-time--readonly" : "") + (e.bordered === !0 ? " q-time--bordered" : "") + (e.square === !0 ? " q-time--square no-border-radius" : "") + (e.flat === !0 ? " q-time--flat no-shadow" : "")), L = s(() => {
      const te = b.value;
      return {
        hour: te.hour === null ? "--" : M.value === !0 ? ct(te.hour) : String(w.value === !0 ? te.hour === 0 ? 12 : te.hour : te.hour > 12 ? te.hour - 12 : te.hour),
        minute: te.minute === null ? "--" : ct(te.minute),
        second: te.second === null ? "--" : ct(te.second)
      };
    }), M = s(() => e.format24h !== null ? e.format24h : l.lang.date.format24h), K = s(() => {
      const te = y.value === "hour", ce = te === !0 ? 12 : 60, ze = b.value[y.value];
      let ae = `rotate(${Math.round(ze * (360 / ce)) - 180}deg) translateX(-50%)`;
      return te === !0 && M.value === !0 && b.value.hour >= 12 && (ae += " scale(.7)"), { transform: ae };
    }), X = s(() => b.value.hour !== null), A = s(() => X.value === !0 && b.value.minute !== null), $ = s(() => e.hourOptions !== void 0 ? (te) => e.hourOptions.includes(te) : e.options !== void 0 ? (te) => e.options(te, null, null) : null), D = s(() => e.minuteOptions !== void 0 ? (te) => e.minuteOptions.includes(te) : e.options !== void 0 ? (te) => e.options(b.value.hour, te, null) : null), _ = s(() => e.secondOptions !== void 0 ? (te) => e.secondOptions.includes(te) : e.options !== void 0 ? (te) => e.options(b.value.hour, b.value.minute, te) : null), S = s(() => {
      if ($.value === null) return null;
      const te = Z(0, 11, $.value), ce = Z(12, 11, $.value);
      return {
        am: te,
        pm: ce,
        values: te.values.concat(ce.values)
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
      let te, ce, ze = 0, ae = 1;
      const ye = E.value !== null ? E.value.values : void 0;
      y.value === "hour" ? M.value === !0 ? (te = 0, ce = 23) : (te = 0, ce = 11, w.value === !1 && (ze = 12)) : (te = 0, ce = 55, ae = 5);
      const Fe = [];
      for (let Te = te, Oe = te; Te <= ce; Te += ae, Oe++) {
        const ut = Te + ze, Ft = (ye == null ? void 0 : ye.includes(ut)) === !1, kt = y.value === "hour" && Te === 0 ? M.value === !0 ? "00" : "12" : Te;
        Fe.push({
          val: ut,
          index: Oe,
          disable: Ft,
          label: kt
        });
      }
      return Fe;
    }), j = s(() => [[
      Jt,
      de,
      void 0,
      {
        stop: !0,
        prevent: !0,
        mouse: !0
      }
    ]]);
    se(() => e.modelValue, (te) => {
      const ce = zn(te, h.value, p.value, e.calendar, C.value);
      (ce.dateHash !== b.value.dateHash || ce.timeHash !== b.value.timeHash) && (b.value = ce, ce.hour === null ? y.value = "hour" : w.value = ce.hour < 12);
    }), se([h, p], () => {
      nt(() => {
        je();
      });
    });
    function N() {
      const te = {
        ...c(),
        ...Ym()
      };
      je(te), Object.assign(b.value, te), y.value = "hour";
    }
    function Z(te, ce, ze) {
      const ae = Array.apply(null, { length: ce + 1 }).map((ye, Fe) => {
        const Te = Fe + te;
        return {
          index: Te,
          val: ze(Te) === !0
        };
      }).filter((ye) => ye.val === !0).map((ye) => ye.index);
      return {
        min: ae[0],
        max: ae[ae.length - 1],
        values: ae,
        threshold: ce + 1
      };
    }
    function B(te, ce, ze) {
      const ae = Math.abs(te - ce);
      return Math.min(ae, ze - ae);
    }
    function G(te, { min: ce, max: ze, values: ae, threshold: ye }) {
      if (te === ce) return ce;
      if (te < ce || te > ze) return B(te, ce, ye) <= B(te, ze, ye) ? ce : ze;
      const Fe = ae.findIndex((ut) => te <= ut), Te = ae[Fe - 1], Oe = ae[Fe];
      return te - Te <= Oe - te ? Te : Oe;
    }
    function z() {
      return e.calendar !== "persian" && e.mask !== null ? e.mask : `HH:mm${e.withSeconds === !0 ? ":ss" : ""}`;
    }
    function ne() {
      if (typeof e.defaultDate != "string") {
        const te = c(!0);
        return te.dateHash = ha(te), te;
      }
      return zn(e.defaultDate, "YYYY/MM/DD", void 0, e.calendar);
    }
    function P() {
      return Ma(n) === !0 || E.value !== null && (E.value.values.length === 0 || y.value === "hour" && M.value !== !0 && S.value[w.value === !0 ? "am" : "pm"].values.length === 0);
    }
    function I() {
      const { top: te, left: ce, width: ze } = g.value.getBoundingClientRect(), ae = ze / 2;
      return {
        top: te + ae,
        left: ce + ae,
        dist: ae * 0.7
      };
    }
    function de(te) {
      if (P() !== !0) {
        if (te.isFirst === !0) {
          v = I(), m = fe(te.evt, v);
          return;
        }
        m = fe(te.evt, v, m), te.isFinal === !0 && (v = !1, m = null, Y());
      }
    }
    function Y() {
      y.value === "hour" ? y.value = "minute" : e.withSeconds && y.value === "minute" && (y.value = "second");
    }
    function fe(te, ce, ze) {
      const ae = Ut(te), ye = Math.abs(ae.top - ce.top), Fe = Math.sqrt(Math.abs(ae.top - ce.top) ** 2 + Math.abs(ae.left - ce.left) ** 2);
      let Te, Oe = Math.asin(ye / Fe) * (180 / Math.PI);
      if (ae.top < ce.top ? Oe = ce.left < ae.left ? 90 - Oe : 270 + Oe : Oe = ce.left < ae.left ? Oe + 90 : 270 - Oe, y.value === "hour") {
        if (Te = Oe / 30, S.value !== null) {
          const ut = M.value !== !0 ? w.value === !0 : S.value.am.values.length !== 0 && S.value.pm.values.length !== 0 ? Fe >= ce.dist : S.value.am.values.length !== 0;
          Te = G(Te + (ut === !0 ? 0 : 12), S.value[ut === !0 ? "am" : "pm"]);
        } else
          Te = Math.round(Te), M.value === !0 ? Fe < ce.dist ? Te < 12 && (Te += 12) : Te === 12 && (Te = 0) : w.value === !0 && Te === 12 ? Te = 0 : w.value === !1 && Te !== 12 && (Te += 12);
        M.value === !0 && (w.value = Te < 12);
      } else
        Te = Math.round(Oe / 6) % 60, y.value === "minute" && T.value !== null ? Te = G(Te, T.value) : y.value === "second" && H.value !== null && (Te = G(Te, H.value));
      return ze !== Te && le[y.value](Te), Te;
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
    function he(te) {
      te.keyCode === 13 && ve();
    }
    function _e(te) {
      te.keyCode === 13 && Pe();
    }
    function we(te) {
      P() !== !0 && (l.platform.is.desktop !== !0 && fe(te, I()), Y());
    }
    function Ie(te) {
      P() !== !0 && fe(te, I());
    }
    function ke(te) {
      if (te.keyCode === 13) y.value = "hour";
      else if ([37, 39].includes(te.keyCode)) {
        const ce = te.keyCode === 37 ? -1 : 1;
        if (S.value !== null) {
          const ze = M.value === !0 ? S.value.values : S.value[w.value === !0 ? "am" : "pm"].values;
          if (ze.length === 0) return;
          b.value.hour === null ? ot(ze[0]) : ot(ze[(ze.length + ze.indexOf(b.value.hour) + ce) % ze.length]);
        } else {
          const ze = M.value === !0 ? 24 : 12;
          ot((M.value !== !0 && w.value === !1 ? 12 : 0) + (24 + (b.value.hour === null ? -ce : b.value.hour) + ce) % ze);
        }
      }
    }
    function Me(te) {
      if (te.keyCode === 13) y.value = "minute";
      else if ([37, 39].includes(te.keyCode)) {
        const ce = te.keyCode === 37 ? -1 : 1;
        if (T.value !== null) {
          const ze = T.value.values;
          if (ze.length === 0) return;
          b.value.minute === null ? We(ze[0]) : We(ze[(ze.length + ze.indexOf(b.value.minute) + ce) % ze.length]);
        } else We((60 + (b.value.minute === null ? -ce : b.value.minute) + ce) % 60);
      }
    }
    function Le(te) {
      if (te.keyCode === 13) y.value = "second";
      else if ([37, 39].includes(te.keyCode)) {
        const ce = te.keyCode === 37 ? -1 : 1;
        if (H.value !== null) {
          const ze = H.value.values;
          if (ze.length === 0) return;
          b.value.seconds === null ? ue(ze[0]) : ue(ze[(ze.length + ze.indexOf(b.value.second) + ce) % ze.length]);
        } else ue((60 + (b.value.second === null ? -ce : b.value.second) + ce) % 60);
      }
    }
    function ot(te) {
      b.value.hour !== te && (b.value.hour = te, Ke());
    }
    function We(te) {
      b.value.minute !== te && (b.value.minute = te, Ke());
    }
    function ue(te) {
      b.value.second !== te && (b.value.second = te, Ke());
    }
    const le = {
      hour: ot,
      minute: We,
      second: ue
    };
    function ve() {
      w.value === !1 && (w.value = !0, b.value.hour !== null && (b.value.hour -= 12, Ke()));
    }
    function Pe() {
      w.value === !0 && (w.value = !1, b.value.hour !== null && (b.value.hour += 12, Ke()));
    }
    function Ge(te) {
      const ce = e.modelValue;
      y.value !== te && ce !== void 0 && ce !== null && ce !== "" && typeof ce != "string" && (y.value = te);
    }
    function Ke() {
      if ($.value !== null && $.value(b.value.hour) !== !0) {
        b.value = zn(), Ge("hour");
        return;
      }
      if (D.value !== null && D.value(b.value.minute) !== !0) {
        b.value.minute = null, b.value.second = null, Ge("minute");
        return;
      }
      if (e.withSeconds === !0 && _.value !== null && _.value(b.value.second) !== !0) {
        b.value.second = null, Ge("second");
        return;
      }
      b.value.hour === null || b.value.minute === null || e.withSeconds === !0 && b.value.second === null || je();
    }
    function je(te) {
      const ce = Object.assign({ ...b.value }, te), ze = e.calendar === "persian" ? ct(ce.hour) + ":" + ct(ce.minute) + (e.withSeconds === !0 ? ":" + ct(ce.second) : "") : vu(new Date(ce.year, ce.month === null ? null : ce.month - 1, ce.day, ce.hour, ce.minute, ce.second, ce.millisecond), h.value, p.value, ce.year, ce.timezoneOffset);
      ce.changed = ze !== e.modelValue, a("update:modelValue", ze, ce);
    }
    function Qe() {
      const te = [
        f("div", {
          class: "q-time__link " + (y.value === "hour" ? "q-time__link--active" : "cursor-pointer"),
          tabindex: i.value,
          onClick: W.hour,
          onKeyup: ke
        }, L.value.hour),
        f("div", ":"),
        f("div", X.value === !0 ? {
          class: "q-time__link " + (y.value === "minute" ? "q-time__link--active" : "cursor-pointer"),
          tabindex: i.value,
          onKeyup: Me,
          onClick: W.minute
        } : { class: "q-time__link" }, L.value.minute)
      ];
      e.withSeconds === !0 && te.push(f("div", ":"), f("div", A.value === !0 ? {
        class: "q-time__link " + (y.value === "second" ? "q-time__link--active" : "cursor-pointer"),
        tabindex: i.value,
        onKeyup: Le,
        onClick: W.second
      } : { class: "q-time__link" }, L.value.second));
      const ce = [f("div", {
        class: "q-time__header-label row items-center no-wrap",
        dir: "ltr"
      }, te)];
      return M.value === !1 && ce.push(f("div", { class: "q-time__header-ampm column items-between no-wrap" }, [f("div", {
        class: "q-time__link " + (w.value === !0 ? "q-time__link--active" : "cursor-pointer"),
        tabindex: i.value,
        onClick: ve,
        onKeyup: he
      }, "AM"), f("div", {
        class: "q-time__link " + (w.value !== !0 ? "q-time__link--active" : "cursor-pointer"),
        tabindex: i.value,
        onClick: Pe,
        onKeyup: _e
      }, "PM")])), f("div", { class: "q-time__header flex flex-center no-wrap " + r.value }, ce);
    }
    function et() {
      const te = b.value[y.value];
      return f("div", { class: "q-time__content col relative-position" }, [f(Vt, { name: "q-transition--scale" }, () => f("div", {
        key: "clock" + y.value,
        class: "q-time__container-parent absolute-full"
      }, [f("div", {
        ref: g,
        class: "q-time__container-child fit overflow-hidden"
      }, [ea(f("div", {
        class: "q-time__clock cursor-pointer non-selectable",
        onClick: we,
        onMousedown: Ie
      }, [f("div", { class: "q-time__clock-circle fit" }, [f("div", {
        class: "q-time__clock-pointer" + (b.value[y.value] === null ? " hidden" : e.color !== void 0 ? ` text-${e.color}` : ""),
        style: K.value
      }), Q.value.map((ce) => f("div", { class: `q-time__clock-position row flex-center q-time__clock-pos-${ce.index}` + (ce.val === te ? " q-time__clock-position--active " + r.value : ce.disable === !0 ? " q-time__clock-position--disable" : "") }, [f("span", ce.label)]))])]), j.value)])])), e.nowBtn === !0 ? f(ft, {
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
      const te = [et()], ce = De(t.default);
      return ce !== void 0 && te.push(f("div", { class: "q-time__actions" }, ce)), e.name !== void 0 && e.disable !== !0 && d(te, "push"), f("div", {
        class: x.value,
        tabindex: -1
      }, [Qe(), f("div", { class: "q-time__main col overflow-auto" }, te)]);
    };
  }
}), Gm = re({
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
    const a = rt(e, be().proxy.$q);
    La(is, e);
    const n = s(() => `q-timeline q-timeline--${e.layout} q-timeline--${e.layout}--${e.side}` + (a.value === !0 ? " q-timeline--dark" : ""));
    return () => f("ul", { class: n.value }, De(t.default));
  }
}), Zm = re({
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
    const a = Kt(is, vt);
    if (a === vt)
      return console.error("QTimelineEntry needs to be child of QTimeline"), vt;
    const n = s(() => `q-timeline__entry q-timeline__entry--${e.side}` + (e.icon !== void 0 || e.avatar !== void 0 ? " q-timeline__entry--icon" : "")), l = s(() => `q-timeline__dot text-${e.color || a.color}`), o = s(() => a.layout === "comfortable" && a.side === "left");
    return () => {
      const i = Yn(t.default, []);
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
const Jm = [
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
      validator: (e) => Jm.includes(e)
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
    const { proxy: n } = be(), { $q: l } = n, o = rt(e, l), i = V({}), r = V(e.ticked || []), u = V(e.expanded || []);
    let c = {};
    Wn(() => {
      c = {};
    });
    const d = s(() => `q-tree q-tree--${e.dense === !0 ? "dense" : "standard"}` + (e.noConnectors === !0 ? " q-tree--no-connectors" : "") + (o.value === !0 ? " q-tree--dark" : "") + (e.color !== void 0 ? ` text-${e.color}` : "")), v = s(() => e.selected !== void 0), m = s(() => e.icon || l.iconSet.tree.icon), g = s(() => e.controlColor || e.color), h = s(() => e.textColor !== void 0 ? ` text-${e.textColor}` : ""), p = s(() => {
      const B = e.selectedColor || e.color;
      return B ? ` text-${B}` : "";
    }), C = s(() => e.filterMethod !== void 0 ? e.filterMethod : (B, G) => {
      const z = G.toLowerCase();
      return B[e.labelKey] && B[e.labelKey].toLowerCase().indexOf(z) !== -1;
    }), k = s(() => {
      const B = {}, G = (z, ne) => {
        const P = z.tickStrategy || (ne ? ne.tickStrategy : e.tickStrategy), I = z[e.nodeKey], de = z[e.childrenKey] && Array.isArray(z[e.childrenKey]) && z[e.childrenKey].length !== 0, Y = z.disabled !== !0 && v.value === !0 && z.selectable !== !1, fe = z.disabled !== !0 && z.expandable !== !1, W = P !== "none", he = P === "strict", _e = P === "leaf-filtered", we = P === "leaf" || P === "leaf-filtered";
        let Ie = z.disabled !== !0 && z.tickable !== !1;
        we === !0 && Ie === !0 && ne && ne.tickable !== !0 && (Ie = !1);
        let ke = z.lazy;
        ke === !0 && i.value[I] !== void 0 && Array.isArray(z[e.childrenKey]) === !0 && (ke = i.value[I]);
        const Me = {
          key: I,
          parent: ne,
          isParent: de,
          lazy: ke,
          disabled: z.disabled,
          link: z.disabled !== !0 && (Y === !0 || fe === !0 && (de === !0 || ke === !0)),
          children: [],
          matchesFilter: e.filter ? C.value(z, e.filter) : !0,
          selected: I === e.selected && Y === !0,
          selectable: Y,
          expanded: de === !0 ? u.value.includes(I) : !1,
          expandable: fe,
          noTick: z.noTick === !0 || he !== !0 && ke && ke !== "loaded",
          tickable: Ie,
          tickStrategy: P,
          hasTicking: W,
          strictTicking: he,
          leafFilteredTicking: _e,
          leafTicking: we,
          ticked: he === !0 ? r.value.includes(I) : de === !0 ? !1 : r.value.includes(I)
        };
        if (B[I] = Me, de === !0 && (Me.children = z[e.childrenKey].map((Le) => G(Le, Me)), e.filter && (Me.matchesFilter !== !0 ? Me.matchesFilter = Me.children.some((Le) => Le.matchesFilter) : Me.noTick !== !0 && Me.disabled !== !0 && Me.tickable === !0 && _e === !0 && Me.children.every((Le) => Le.matchesFilter !== !0 || Le.noTick === !0 || Le.tickable !== !0) === !0 && (Me.tickable = !1)), Me.matchesFilter === !0 && (Me.noTick !== !0 && he !== !0 && Me.children.every((Le) => Le.noTick) === !0 && (Me.noTick = !0), we))) {
          if (Me.ticked = !1, Me.indeterminate = Me.children.some((Le) => Le.indeterminate === !0), Me.tickable = Me.tickable === !0 && Me.children.some((Le) => Le.tickable), Me.indeterminate !== !0) {
            const Le = Me.children.reduce((ot, We) => We.ticked === !0 ? ot + 1 : ot, 0);
            Le === Me.children.length ? Me.ticked = !0 : Le > 0 && (Me.indeterminate = !0);
          }
          Me.indeterminate === !0 && (Me.indeterminateNextState = Me.children.every((Le) => Le.tickable !== !0 || Le.ticked !== !0));
        }
        return Me;
      };
      return e.nodes.forEach((z) => G(z, null)), B;
    });
    se(() => e.ticked, (B) => {
      r.value = B;
    }), se(() => e.expanded, (B) => {
      u.value = B;
    });
    function y(B) {
      const G = [].reduce, z = (ne, P) => {
        if (ne || !P) return ne;
        if (Array.isArray(P) === !0) return G.call(Object(P), z, ne);
        if (P[e.nodeKey] === B) return P;
        if (P[e.childrenKey]) return z(null, P[e.childrenKey]);
      };
      return z(null, e.nodes);
    }
    function b() {
      return r.value.map((B) => y(B));
    }
    function w() {
      return u.value.map((B) => y(B));
    }
    function x(B) {
      return B && k.value[B] ? k.value[B].expanded : !1;
    }
    function L() {
      e.expanded !== void 0 ? a("update:expanded", []) : u.value = [];
    }
    function M() {
      const B = [], G = (z) => {
        z[e.childrenKey] && z[e.childrenKey].length !== 0 && z.expandable !== !1 && z.disabled !== !0 && (B.push(z[e.nodeKey]), z[e.childrenKey].forEach(G));
      };
      e.nodes.forEach(G), e.expanded !== void 0 ? a("update:expanded", B) : u.value = B;
    }
    function K(B, G, z = y(B), ne = k.value[B]) {
      if (ne.lazy && ne.lazy !== "loaded") {
        if (ne.lazy === "loading") return;
        i.value[B] = "loading", Array.isArray(z[e.childrenKey]) !== !0 && (z[e.childrenKey] = []), a("lazyLoad", {
          node: z,
          key: B,
          done: (P) => {
            i.value[B] = "loaded", z[e.childrenKey] = Array.isArray(P) === !0 ? P : [], nt(() => {
              var I;
              ((I = k.value[B]) == null ? void 0 : I.isParent) === !0 && X(B, !0);
            });
          },
          fail: () => {
            delete i.value[B], z[e.childrenKey].length === 0 && delete z[e.childrenKey];
          }
        });
      } else ne.isParent === !0 && ne.expandable === !0 && X(B, G);
    }
    function X(B, G) {
      let z = u.value;
      const ne = e.expanded !== void 0;
      if (ne === !0 && (z = z.slice()), G) {
        if (e.accordion && k.value[B]) {
          const P = [];
          k.value[B].parent ? k.value[B].parent.children.forEach((I) => {
            I.key !== B && I.expandable === !0 && P.push(I.key);
          }) : e.nodes.forEach((I) => {
            const de = I[e.nodeKey];
            de !== B && P.push(de);
          }), P.length !== 0 && (z = z.filter((I) => P.includes(I) === !1));
        }
        z = z.concat([B]).filter((P, I, de) => de.indexOf(P) === I);
      } else z = z.filter((P) => P !== B);
      ne === !0 ? a("update:expanded", z) : u.value = z;
    }
    function A(B) {
      return B && k.value[B] ? k.value[B].ticked : !1;
    }
    function $(B, G) {
      let z = r.value;
      const ne = e.ticked !== void 0;
      ne === !0 && (z = z.slice()), G ? z = z.concat(B).filter((P, I, de) => de.indexOf(P) === I) : z = z.filter((P) => B.includes(P) === !1), ne === !0 && a("update:ticked", z);
    }
    function D(B, G, z) {
      const ne = {
        tree: n,
        node: B,
        key: z,
        color: e.color,
        dark: o.value
      };
      return zt(ne, "expanded", () => G.expanded, (P) => {
        P !== G.expanded && K(z, P);
      }), zt(ne, "ticked", () => G.ticked, (P) => {
        P !== G.ticked && $([z], P);
      }), ne;
    }
    function _(B) {
      return (e.filter ? B.filter((G) => k.value[G[e.nodeKey]].matchesFilter) : B).map((G) => E(G));
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
      const G = B[e.nodeKey], z = k.value[G], ne = B.header && t[`header-${B.header}`] || t["default-header"], P = z.isParent === !0 ? _(B[e.childrenKey]) : [], I = P.length !== 0 || z.lazy && z.lazy !== "loaded";
      let de = B.body && t[`body-${B.body}`] || t["default-body"];
      const Y = ne !== void 0 || de !== void 0 ? D(B, z, G) : null;
      return de !== void 0 && (de = f("div", { class: "q-tree__node-body relative-position" }, [f("div", { class: h.value }, [de(Y)])])), f("div", {
        key: G,
        class: `q-tree__node relative-position q-tree__node--${I === !0 ? "parent" : "child"}`
      }, [f("div", {
        class: "q-tree__node-header relative-position row no-wrap items-center" + (z.link === !0 ? " q-tree__node--link q-hoverable q-focusable" : "") + (z.selected === !0 ? " q-tree__node--selected" : "") + (z.disabled === !0 ? " q-tree__node--disabled" : ""),
        tabindex: z.link === !0 ? 0 : -1,
        ariaExpanded: P.length > 0 ? z.expanded : null,
        role: "treeitem",
        onClick: (fe) => {
          j(B, z, fe);
        },
        onKeypress(fe) {
          tn(fe) !== !0 && (fe.keyCode === 13 ? j(B, z, fe, !0) : fe.keyCode === 32 && N(B, z, fe, !0));
        }
      }, [
        f("div", {
          class: "q-focus-helper",
          tabindex: -1,
          ref: (fe) => {
            c[z.key] = fe;
          }
        }),
        z.lazy === "loading" ? f(la, {
          class: "q-tree__spinner",
          color: g.value
        }) : I === !0 ? f(st, {
          class: "q-tree__arrow" + (z.expanded === !0 ? " q-tree__arrow--rotate" : ""),
          name: m.value,
          onClick(fe) {
            N(B, z, fe);
          }
        }) : null,
        z.hasTicking === !0 && z.noTick !== !0 ? f(In, {
          class: "q-tree__tickbox",
          modelValue: z.indeterminate === !0 ? null : z.ticked,
          color: g.value,
          dark: o.value,
          dense: !0,
          keepColor: !0,
          disable: z.tickable !== !0,
          onKeydown: Ye,
          "onUpdate:modelValue": (fe) => {
            Z(z, fe);
          }
        }) : null,
        f("div", { class: "q-tree__node-header-content col row no-wrap items-center" + (z.selected === !0 ? p.value : h.value) }, [ne ? ne(Y) : [S(B), f("div", B[e.labelKey])]])
      ]), I === !0 ? e.noTransition === !0 ? z.expanded === !0 ? f("div", {
        class: "q-tree__node-collapsible" + h.value,
        key: `${G}__q`
      }, [de, f("div", {
        class: "q-tree__children" + (z.disabled === !0 ? " q-tree__node--disabled" : ""),
        role: "group"
      }, P)]) : null : f(ki, {
        duration: e.duration,
        onShow: T,
        onHide: H
      }, () => ea(f("div", {
        class: "q-tree__node-collapsible" + h.value,
        key: `${G}__q`
      }, [de, f("div", {
        class: "q-tree__children" + (z.disabled === !0 ? " q-tree__node--disabled" : ""),
        role: "group"
      }, P)]), [[Ko, z.expanded]])) : de]);
    }
    function Q(B) {
      var G;
      (G = c[B]) == null || G.focus();
    }
    function j(B, G, z, ne) {
      ne !== !0 && G.selectable !== !1 && Q(G.key), v.value && G.selectable ? e.noSelectionUnset === !1 ? a("update:selected", G.key !== e.selected ? G.key : null) : G.key !== e.selected && a("update:selected", G.key === void 0 ? null : G.key) : N(B, G, z, ne), typeof B.handler == "function" && B.handler(B);
    }
    function N(B, G, z, ne) {
      z !== void 0 && Ye(z), ne !== !0 && G.selectable !== !1 && Q(G.key), K(G.key, !G.expanded, B, G);
    }
    function Z(B, G) {
      if (B.indeterminate === !0 && (G = B.indeterminateNextState), B.strictTicking) $([B.key], G);
      else if (B.leafTicking) {
        const z = [], ne = (P) => {
          P.isParent ? (G !== !0 && P.noTick !== !0 && P.tickable === !0 && z.push(P.key), P.leafTicking === !0 && P.children.forEach(ne)) : P.noTick !== !0 && P.tickable === !0 && (P.leafFilteredTicking !== !0 || P.matchesFilter === !0) && z.push(P.key);
        };
        ne(B), $(z, G);
      }
    }
    return e.defaultExpandAll === !0 && M(), Object.assign(n, {
      getNodeByKey: y,
      getTickedNodes: b,
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
function Pr(e) {
  return (e * 100).toFixed(2) + "%";
}
const eg = {
  ...it,
  ..._u,
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
}, Ku = [
  ...$u,
  "start",
  "finish",
  "added",
  "removed"
];
function tg(e, t) {
  const a = be(), { props: n, slots: l, emit: o, proxy: i } = a, { $q: r } = i, u = rt(n, r);
  function c(Y, fe, W) {
    if (Y.__status = fe, fe === "idle") {
      Y.__uploaded = 0, Y.__progress = 0, Y.__sizeLabel = Ao(Y.size), Y.__progressLabel = "0.00%";
      return;
    }
    if (fe === "failed") {
      i.$forceUpdate();
      return;
    }
    Y.__uploaded = fe === "uploaded" ? Y.size : W, Y.__progress = fe === "uploaded" ? 1 : Math.min(0.9999, Y.__uploaded / Y.size), Y.__progressLabel = Pr(Y.__progress), i.$forceUpdate();
  }
  const d = s(() => n.disable !== !0 && n.readonly !== !0), v = V(!1), m = V(null), g = V(null), h = {
    files: V([]),
    queuedFiles: V([]),
    uploadedFiles: V([]),
    uploadedSize: V(0),
    updateFileStatus: c,
    isAlive: () => Ma(a) === !1
  }, { pickFiles: p, addFiles: C, onDragover: k, onDragleave: y, processFiles: b, getDndNode: w, maxFilesNumber: x, maxTotalSizeNumber: L } = qu({
    editable: d,
    dnd: v,
    getFileInput: Z,
    addFilesToQueue: B
  });
  Object.assign(h, e({
    props: n,
    slots: l,
    emit: o,
    helpers: h,
    exposeApi: (Y) => {
      Object.assign(h, Y);
    }
  })), h.isBusy === void 0 && (h.isBusy = V(!1));
  const M = V(0), K = s(() => M.value === 0 ? 0 : h.uploadedSize.value / M.value), X = s(() => Pr(K.value)), A = s(() => Ao(M.value)), $ = s(() => d.value === !0 && h.isUploading.value !== !0 && (n.multiple === !0 || h.queuedFiles.value.length === 0) && (n.maxFiles === void 0 || h.files.value.length < x.value) && (n.maxTotalSize === void 0 || M.value < L.value)), D = s(() => d.value === !0 && h.isBusy.value !== !0 && h.isUploading.value !== !0 && h.queuedFiles.value.length !== 0);
  La(cs, ne);
  const _ = s(() => "q-uploader column no-wrap" + (u.value === !0 ? " q-uploader--dark q-dark" : "") + (n.bordered === !0 ? " q-uploader--bordered" : "") + (n.square === !0 ? " q-uploader--square no-border-radius" : "") + (n.flat === !0 ? " q-uploader--flat no-shadow" : "") + (n.disable === !0 ? " disabled q-uploader--disable" : "") + (v.value === !0 ? " q-uploader--dnd" : "")), S = s(() => "q-uploader__header" + (n.color !== void 0 ? ` bg-${n.color}` : "") + (n.textColor !== void 0 ? ` text-${n.textColor}` : ""));
  se(h.isUploading, (Y, fe) => {
    fe === !1 && Y === !0 ? o("start") : fe === !0 && Y === !1 && o("finish");
  });
  function T() {
    n.disable === !1 && (h.abort(), h.uploadedSize.value = 0, M.value = 0, N(), h.files.value = [], h.queuedFiles.value = [], h.uploadedFiles.value = []);
  }
  function H() {
    n.disable === !1 && Q(["uploaded"], () => {
      h.uploadedFiles.value = [];
    });
  }
  function E() {
    Q(["idle", "failed"], ({ size: Y }) => {
      M.value -= Y, h.queuedFiles.value = [];
    });
  }
  function Q(Y, fe) {
    if (n.disable === !0) return;
    const W = {
      files: [],
      size: 0
    }, he = h.files.value.filter((_e) => Y.indexOf(_e.__status) === -1 ? !0 : (W.size += _e.size, W.files.push(_e), _e.__img !== void 0 && window.URL.revokeObjectURL(_e.__img.src), !1));
    W.files.length !== 0 && (h.files.value = he, fe(W), o("removed", W.files));
  }
  function j(Y) {
    n.disable || (Y.__status === "uploaded" ? h.uploadedFiles.value = h.uploadedFiles.value.filter((fe) => fe.__key !== Y.__key) : Y.__status === "uploading" ? Y.__abort() : M.value -= Y.size, h.files.value = h.files.value.filter((fe) => fe.__key !== Y.__key ? !0 : (fe.__img !== void 0 && window.URL.revokeObjectURL(fe.__img.src), !1)), h.queuedFiles.value = h.queuedFiles.value.filter((fe) => fe.__key !== Y.__key), o("removed", [Y]));
  }
  function N() {
    h.files.value.forEach((Y) => {
      Y.__img !== void 0 && window.URL.revokeObjectURL(Y.__img.src);
    });
  }
  function Z() {
    return g.value || m.value.getElementsByClassName("q-uploader__input")[0];
  }
  function B(Y, fe) {
    const W = b(Y, fe, h.files.value, !0), he = Z();
    he != null && (he.value = ""), W !== void 0 && (W.forEach((_e) => {
      if (h.updateFileStatus(_e, "idle"), M.value += _e.size, n.noThumbnails !== !0 && _e.type.toUpperCase().startsWith("IMAGE")) {
        const we = new Image();
        we.src = window.URL.createObjectURL(_e), _e.__img = we;
      }
    }), h.files.value = h.files.value.concat(W), h.queuedFiles.value = h.queuedFiles.value.concat(W), o("added", W), n.autoUpload === !0 && h.upload());
  }
  function G() {
    D.value === !0 && h.upload();
  }
  function z(Y, fe, W) {
    if (Y === !0) {
      const he = {
        type: "a",
        key: fe,
        icon: r.iconSet.uploader[fe],
        flat: !0,
        dense: !0
      };
      let _e;
      return fe === "add" ? (he.onClick = p, _e = ne) : he.onClick = W, f(ft, he, _e);
    }
  }
  function ne() {
    return f("input", {
      ref: g,
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
      z(h.queuedFiles.value.length !== 0, "removeQueue", E),
      z(h.uploadedFiles.value.length !== 0, "removeUploaded", H),
      h.isUploading.value === !0 ? f(la, { class: "q-uploader__spinner" }) : null,
      f("div", { class: "col column justify-center" }, [n.label !== void 0 ? f("div", { class: "q-uploader__title" }, [n.label]) : null, f("div", { class: "q-uploader__subtitle" }, [A.value + " / " + X.value])]),
      z($.value, "add"),
      z(n.hideUploadBtn === !1 && D.value === !0, "upload", h.upload),
      z(h.isUploading.value, "clear", h.abort)
    ])])];
  }
  function I() {
    return l.list !== void 0 ? l.list(de) : h.files.value.map((Y) => f("div", {
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
      Y.__status === "uploading" ? f(bi, {
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
    h.isUploading.value === !0 && h.abort(), h.files.value.length !== 0 && N();
  });
  const de = {};
  for (const Y in h) pd(h[Y]) === !0 ? zt(de, Y, () => h[Y].value) : de[Y] = h[Y];
  return Object.assign(de, {
    upload: G,
    reset: T,
    removeUploadedFiles: H,
    removeQueuedFiles: E,
    removeFile: j,
    pickFiles: p,
    addFiles: C
  }), ls(de, {
    canAddFiles: () => $.value,
    canUpload: () => D.value,
    uploadSizeLabel: () => A.value,
    uploadProgressLabel: () => X.value
  }), t({
    ...h,
    upload: G,
    reset: T,
    removeUploadedFiles: H,
    removeQueuedFiles: E,
    removeFile: j,
    pickFiles: p,
    addFiles: C,
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
    h.isBusy.value === !0 && Y.push(f("div", { class: "q-uploader__overlay absolute-full flex flex-center" }, [f(la)]));
    const fe = {
      ref: m,
      class: _.value
    };
    return $.value === !0 && Object.assign(fe, {
      onDragover: k,
      onDragleave: y
    }), f("div", fe, Y);
  };
}
const ag = () => !0;
function Wu(e) {
  const t = {};
  return e.forEach((a) => {
    t[a] = ag;
  }), t;
}
const ng = Wu(Ku);
var lg = ({ name: e, props: t, emits: a, injectPlugin: n }) => re({
  name: e,
  props: {
    ...eg,
    ...t
  },
  emits: Nt(a) === !0 ? {
    ...ng,
    ...a
  } : [...Ku, ...a],
  setup(l, { expose: o }) {
    return tg(n, o);
  }
});
function ga(e) {
  return typeof e == "function" ? e : () => e;
}
const og = "QUploader", ig = {
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
}, rg = [
  "factoryFailed",
  "uploaded",
  "failed",
  "uploading"
];
function sg({ props: e, emit: t, helpers: a }) {
  const n = V([]), l = V([]), o = V(0), i = s(() => ({
    url: ga(e.url),
    method: ga(e.method),
    headers: ga(e.headers),
    formFields: ga(e.formFields),
    fieldName: ga(e.fieldName),
    withCredentials: ga(e.withCredentials),
    sendRaw: ga(e.sendRaw),
    batch: ga(e.batch)
  })), r = s(() => o.value > 0), u = s(() => l.value.length !== 0);
  let c;
  function d() {
    n.value.forEach((h) => {
      h.abort();
    }), l.value.length !== 0 && (c = !0);
  }
  function v() {
    const h = a.queuedFiles.value.slice(0);
    a.queuedFiles.value = [], i.value.batch(h) ? m(h) : h.forEach((p) => {
      m([p]);
    });
  }
  function m(h) {
    if (o.value++, typeof e.factory != "function") {
      g(h, {});
      return;
    }
    const p = e.factory(h);
    if (!p)
      t("factoryFailed", /* @__PURE__ */ new Error("QUploader: factory() does not return properly"), h), o.value--;
    else if (typeof p.catch == "function" && typeof p.then == "function") {
      l.value.push(p);
      const C = (k) => {
        a.isAlive() === !0 && (l.value = l.value.filter((y) => y !== p), l.value.length === 0 && (c = !1), a.queuedFiles.value = a.queuedFiles.value.concat(h), h.forEach((y) => {
          a.updateFileStatus(y, "failed");
        }), t("factoryFailed", k, h), o.value--);
      };
      p.then((k) => {
        c === !0 ? C(/* @__PURE__ */ new Error("Aborted")) : a.isAlive() === !0 && (l.value = l.value.filter((y) => y !== p), g(h, k));
      }).catch(C);
    } else g(h, p || {});
  }
  function g(h, p) {
    const C = new FormData(), k = new XMLHttpRequest(), y = (D, _) => p[D] !== void 0 ? ga(p[D])(_) : i.value[D](_), b = y("url", h);
    if (!b) {
      console.error("q-uploader: invalid or no URL specified"), o.value--;
      return;
    }
    const w = y("formFields", h);
    w !== void 0 && w.forEach((D) => {
      C.append(D.name, D.value);
    });
    let x = 0, L = 0, M = 0, K = 0, X;
    k.upload.addEventListener("progress", (D) => {
      if (X === !0) return;
      const _ = Math.min(K, D.loaded);
      a.uploadedSize.value += _ - M, M = _;
      let S = M - L;
      for (let T = x; S > 0 && T < h.length; T++) {
        const H = h[T];
        if (S > H.size)
          S -= H.size, x++, L += H.size, a.updateFileStatus(H, "uploading", H.size);
        else {
          a.updateFileStatus(H, "uploading", S);
          return;
        }
      }
    }, !1), k.onreadystatechange = () => {
      k.readyState < 4 || (k.status && k.status < 400 ? (a.uploadedFiles.value = a.uploadedFiles.value.concat(h), h.forEach((D) => {
        a.updateFileStatus(D, "uploaded");
      }), t("uploaded", {
        files: h,
        xhr: k
      })) : (X = !0, a.uploadedSize.value -= M, a.queuedFiles.value = a.queuedFiles.value.concat(h), h.forEach((D) => {
        a.updateFileStatus(D, "failed");
      }), t("failed", {
        files: h,
        xhr: k
      })), o.value--, n.value = n.value.filter((D) => D !== k));
    }, k.open(y("method", h), b), y("withCredentials", h) === !0 && (k.withCredentials = !0);
    const A = y("headers", h);
    A !== void 0 && A.forEach((D) => {
      k.setRequestHeader(D.name, D.value);
    });
    const $ = y("sendRaw", h);
    h.forEach((D) => {
      a.updateFileStatus(D, "uploading", 0), $ !== !0 && C.append(y("fieldName", D), D, D.name), D.xhr = k, D.__abort = () => {
        k.abort();
      }, K += D.size;
    }), t("uploading", {
      files: h,
      xhr: k
    }), n.value.push(k), $ === !0 ? k.send(new Blob(h)) : k.send(C);
  }
  return {
    isUploading: r,
    isBusy: u,
    abort: d,
    upload: v
  };
}
var ug = lg({
  name: og,
  props: ig,
  emits: rg,
  injectPlugin: sg
});
re({
  name: "QUploaderAddTrigger",
  setup() {
    const e = Kt(cs, vt);
    return e === vt && console.error("QUploaderAddTrigger needs to be child of QUploader"), e;
  }
});
var dg = re({
  name: "QVideo",
  props: {
    ...Si,
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
    const t = wi(e), a = s(() => "q-video" + (e.ratio !== void 0 ? " q-video--responsive" : ""));
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
function Rr(e) {
  if (e === !1) return 0;
  if (e === !0 || e === void 0) return 1;
  const t = parseInt(e, 10);
  return isNaN(t) ? 0 : t;
}
ua({
  name: "close-popup",
  beforeMount(e, { value: t }) {
    const a = {
      depth: Rr(t),
      handler(n) {
        a.depth !== 0 && setTimeout(() => {
          const l = Fc(e);
          l !== void 0 && Ec(l, n, a.depth);
        });
      },
      handlerKey(n) {
        aa(n, 13) === !0 && a.handler(n);
      }
    };
    e.__qclosepopup = a, e.addEventListener("click", a.handler), e.addEventListener("keyup", a.handlerKey);
  },
  updated(e, { value: t, oldValue: a }) {
    t !== a && (e.__qclosepopup.depth = Rr(t));
  },
  beforeUnmount(e) {
    const t = e.__qclosepopup;
    e.removeEventListener("click", t.handler), e.removeEventListener("keyup", t.handlerKey), delete e.__qclosepopup;
  }
});
let cg = 0, Vn;
function Fr(e, t) {
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
function cl(e) {
  return {
    width: e.scrollWidth,
    height: e.scrollHeight
  };
}
const Er = [
  "Top",
  "Right",
  "Bottom",
  "Left"
], Ir = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
], fg = /-block|-inline|block-|inline-/, vg = /(-block|-inline|block-|inline-).*:/;
function Or(e, t) {
  const a = window.getComputedStyle(e), n = {};
  for (let l = 0; l < t.length; l++) {
    const o = t[l];
    if (a[o] === "") if (o === "cssText") {
      const i = a.length;
      let r = "";
      for (let u = 0; u < i; u++) fg.test(a[u]) !== !0 && (r += a[u] + ": " + a[a[u]] + "; ");
      n[o] = r;
    } else if ([
      "borderWidth",
      "borderStyle",
      "borderColor"
    ].indexOf(o) !== -1) {
      const i = o.replace("border", "");
      let r = "";
      for (let u = 0; u < Er.length; u++) {
        const c = "border" + Er[u] + i;
        r += a[c] + " ";
      }
      n[o] = r;
    } else if (o === "borderRadius") {
      let i = "", r = "";
      for (let u = 0; u < Ir.length; u++) {
        const c = a[Ir[u]].split(" ");
        i += c[0] + " ", r += (c[1] === void 0 ? c[0] : c[1]) + " ";
      }
      n[o] = i + "/ " + r;
    } else n[o] = a[o];
    else o === "cssText" ? n[o] = a[o].split(";").filter((i) => vg.test(i) !== !0).join(";") : n[o] = a[o];
  }
  return n;
}
const mg = [
  "absolute",
  "fixed",
  "relative",
  "sticky"
];
function Hr(e) {
  let t = e, a = 0;
  for (; t !== null && t !== document; ) {
    const { position: n, zIndex: l } = window.getComputedStyle(t), o = Number(l);
    o > a && (t === e || mg.includes(n) === !0) && (a = o), t = t.parentNode;
  }
  return a;
}
function gg(e) {
  return {
    from: e.from,
    to: e.to !== void 0 ? e.to : e.from
  };
}
function hg(e) {
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
function Nr(e) {
  const t = typeof e;
  return t === "function" ? e() : t === "string" ? document.querySelector(e) : e;
}
function jr(e) {
  return e && e.ownerDocument === document && e.parentNode !== null;
}
function bg(e) {
  let t = () => !1, a = !1, n = !0;
  const l = gg(e), o = hg(e), i = Nr(l.from);
  if (jr(i) !== !0) return t;
  typeof i.qMorphCancel == "function" && i.qMorphCancel();
  let r, u, c, d;
  const v = i.parentNode, m = i.nextElementSibling, g = Fr(i, o.resize), { width: h, height: p } = cl(v), { borderWidth: C, borderStyle: k, borderColor: y, borderRadius: b, backgroundColor: w, transform: x, position: L, cssText: M } = Or(i, [
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "backgroundColor",
    "transform",
    "position",
    "cssText"
  ]), K = i.classList.toString(), X = i.style.cssText, A = i.cloneNode(!0), $ = o.tween === !0 ? i.cloneNode(!0) : void 0;
  $ !== void 0 && ($.className = $.classList.toString().split(" ").filter((_) => /^bg-/.test(_) === !1).join(" ")), o.hideFromClone === !0 && A.classList.add("q-morph--internal"), A.setAttribute("aria-hidden", "true"), A.style.transition = "none", A.style.animation = "none", A.style.pointerEvents = "none", v.insertBefore(A, m), i.qMorphCancel = () => {
    a = !0, A.remove(), $ == null || $.remove(), o.hideFromClone === !0 && A.classList.remove("q-morph--internal"), i.qMorphCancel = void 0;
  };
  const D = () => {
    const _ = Nr(l.to);
    if (a === !0 || jr(_) !== !0) {
      typeof i.qMorphCancel == "function" && i.qMorphCancel();
      return;
    }
    i !== _ && typeof _.qMorphCancel == "function" && _.qMorphCancel(), o.keepToClone !== !0 && _.classList.add("q-morph--internal"), A.classList.add("q-morph--internal");
    const { width: S, height: T } = cl(v), { width: H, height: E } = cl(_.parentNode);
    o.hideFromClone !== !0 && A.classList.remove("q-morph--internal"), _.qMorphCancel = () => {
      a = !0, A.remove(), $ == null || $.remove(), o.hideFromClone === !0 && A.classList.remove("q-morph--internal"), o.keepToClone !== !0 && _.classList.remove("q-morph--internal"), i.qMorphCancel = void 0, _.qMorphCancel = void 0;
    };
    const Q = () => {
      if (a === !0) {
        typeof _.qMorphCancel == "function" && _.qMorphCancel();
        return;
      }
      o.hideFromClone !== !0 && (A.classList.add("q-morph--internal"), A.innerHTML = "", A.style.left = 0, A.style.right = "unset", A.style.top = 0, A.style.bottom = "unset", A.style.transform = "none"), o.keepToClone !== !0 && _.classList.remove("q-morph--internal");
      const j = _.parentNode, { width: N, height: Z } = cl(j), B = _.cloneNode(o.keepToClone);
      B.setAttribute("aria-hidden", "true"), o.keepToClone !== !0 && (B.style.left = 0, B.style.right = "unset", B.style.top = 0, B.style.bottom = "unset", B.style.transform = "none", B.style.pointerEvents = "none"), B.classList.add("q-morph--internal");
      const G = _ === i && v === j ? A : _.nextElementSibling;
      j.insertBefore(B, G);
      const { borderWidth: z, borderStyle: ne, borderColor: P, borderRadius: I, backgroundColor: de, transform: Y, position: fe, cssText: W } = Or(_, [
        "borderWidth",
        "borderStyle",
        "borderColor",
        "borderRadius",
        "backgroundColor",
        "transform",
        "position",
        "cssText"
      ]), he = _.classList.toString(), _e = _.style.cssText;
      _.style.cssText = W, _.style.transform = "none", _.style.animation = "none", _.style.transition = "none", _.className = he.split(" ").filter((ye) => /^bg-/.test(ye) === !1).join(" ");
      const we = Fr(_, o.resize), Ie = g.left - we.left, ke = g.top - we.top, Me = g.width / (we.width > 0 ? we.width : 10), Le = g.height / (we.height > 0 ? we.height : 100), ot = h - S, We = p - T, ue = N - H, le = Z - E, ve = Math.max(g.widthM, ot), Pe = Math.max(g.heightM, We), Ge = Math.max(we.widthM, ue), Ke = Math.max(we.heightM, le), je = i === _ && ["absolute", "fixed"].includes(fe) === !1 && ["absolute", "fixed"].includes(L) === !1;
      let Qe = fe === "fixed", et = j;
      for (; Qe !== !0 && et !== document; )
        Qe = window.getComputedStyle(et).position === "fixed", et = et.parentNode;
      if (o.hideFromClone !== !0 && (A.style.display = "block", A.style.flex = "0 0 auto", A.style.opacity = 0, A.style.minWidth = "unset", A.style.maxWidth = "unset", A.style.minHeight = "unset", A.style.maxHeight = "unset", A.classList.remove("q-morph--internal")), o.keepToClone !== !0 && (B.style.display = "block", B.style.flex = "0 0 auto", B.style.opacity = 0, B.style.minWidth = "unset", B.style.maxWidth = "unset", B.style.minHeight = "unset", B.style.maxHeight = "unset"), B.classList.remove("q-morph--internal"), typeof o.classes == "string" && (_.className += " " + o.classes), typeof o.style == "string") _.style.cssText += " " + o.style;
      else if (Nt(o.style) === !0) for (const ye in o.style) _.style[ye] = o.style[ye];
      const te = Hr(A), ce = Hr(_), ze = Qe === !0 ? document.documentElement : {
        scrollLeft: 0,
        scrollTop: 0
      };
      _.style.position = Qe === !0 ? "fixed" : "absolute", _.style.left = `${we.left - ze.scrollLeft}px`, _.style.right = "unset", _.style.top = `${we.top - ze.scrollTop}px`, _.style.margin = 0, o.resize === !0 && (_.style.minWidth = "unset", _.style.maxWidth = "unset", _.style.minHeight = "unset", _.style.maxHeight = "unset", _.style.overflow = "hidden", _.style.overflowX = "hidden", _.style.overflowY = "hidden"), document.body.appendChild(_), $ !== void 0 && ($.style.cssText = M, $.style.transform = "none", $.style.animation = "none", $.style.transition = "none", $.style.position = _.style.position, $.style.left = `${g.left - ze.scrollLeft}px`, $.style.right = "unset", $.style.top = `${g.top - ze.scrollTop}px`, $.style.margin = 0, $.style.pointerEvents = "none", o.resize === !0 && ($.style.minWidth = "unset", $.style.maxWidth = "unset", $.style.minHeight = "unset", $.style.maxHeight = "unset", $.style.overflow = "hidden", $.style.overflowX = "hidden", $.style.overflowY = "hidden"), document.body.appendChild($));
      const ae = (ye) => {
        i === _ && n !== !0 ? (_.style.cssText = X, _.className = K) : (_.style.cssText = _e, _.className = he), B.parentNode === j && j.insertBefore(_, B), A.remove(), B.remove(), $ == null || $.remove(), t = () => !1, i.qMorphCancel = void 0, _.qMorphCancel = void 0, typeof o.onEnd == "function" && o.onEnd(n === !0 ? "to" : "from", ye === !0);
      };
      if (o.useCSS !== !0 && typeof _.animate == "function") {
        const ye = o.resize === !0 ? {
          transform: `translate(${Ie}px, ${ke}px)`,
          width: `${ve}px`,
          height: `${Pe}px`
        } : { transform: `translate(${Ie}px, ${ke}px) scale(${Me}, ${Le})` }, Fe = o.resize === !0 ? {
          width: `${Ge}px`,
          height: `${Ke}px`
        } : {}, Te = o.resize === !0 ? {
          width: `${ve}px`,
          height: `${Pe}px`
        } : {}, Oe = o.resize === !0 ? {
          transform: `translate(${-1 * Ie}px, ${-1 * ke}px)`,
          width: `${Ge}px`,
          height: `${Ke}px`
        } : { transform: `translate(${-1 * Ie}px, ${-1 * ke}px) scale(${1 / Me}, ${1 / Le})` }, ut = $ !== void 0 ? { opacity: o.tweenToOpacity } : { backgroundColor: w }, Ft = $ !== void 0 ? { opacity: 1 } : { backgroundColor: de };
        d = _.animate([{
          margin: 0,
          borderWidth: C,
          borderStyle: k,
          borderColor: y,
          borderRadius: b,
          zIndex: te,
          transformOrigin: "0 0",
          ...ye,
          ...ut
        }, {
          margin: 0,
          borderWidth: z,
          borderStyle: ne,
          borderColor: P,
          borderRadius: I,
          zIndex: ce,
          transformOrigin: "0 0",
          transform: Y,
          ...Fe,
          ...Ft
        }], {
          duration: o.duration,
          easing: o.easing,
          fill: o.fill,
          delay: o.delay
        }), u = $ === void 0 ? void 0 : $.animate([{
          opacity: o.tweenFromOpacity,
          margin: 0,
          borderWidth: C,
          borderStyle: k,
          borderColor: y,
          borderRadius: b,
          zIndex: te,
          transformOrigin: "0 0",
          transform: x,
          ...Te
        }, {
          opacity: 0,
          margin: 0,
          borderWidth: z,
          borderStyle: ne,
          borderColor: P,
          borderRadius: I,
          zIndex: ce,
          transformOrigin: "0 0",
          ...Oe
        }], {
          duration: o.duration,
          easing: o.easing,
          fill: o.fill,
          delay: o.delay
        }), r = o.hideFromClone === !0 || je === !0 ? void 0 : A.animate([{
          margin: `${We < 0 ? We / 2 : 0}px ${ot < 0 ? ot / 2 : 0}px`,
          width: `${ve + g.marginH}px`,
          height: `${Pe + g.marginV}px`
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
          width: `${ve + g.marginH}px`,
          height: `${Pe + g.marginV}px`
        } : {
          margin: 0,
          width: 0,
          height: 0
        }, {
          margin: `${le < 0 ? le / 2 : 0}px ${ue < 0 ? ue / 2 : 0}px`,
          width: `${Ge + we.marginH}px`,
          height: `${Ke + we.marginV}px`
        }], {
          duration: o.duration,
          easing: o.easing,
          fill: o.fill,
          delay: o.delay
        });
        const kt = (Xt) => {
          r == null || r.cancel(), u == null || u.cancel(), c == null || c.cancel(), d.cancel(), d.removeEventListener("finish", kt), d.removeEventListener("cancel", kt), ae(Xt), r = void 0, u = void 0, c = void 0, d = void 0;
        };
        i.qMorphCancel = () => {
          i.qMorphCancel = void 0, a = !0, kt();
        }, _.qMorphCancel = () => {
          _.qMorphCancel = void 0, a = !0, kt();
        }, d.addEventListener("finish", kt), d.addEventListener("cancel", kt), t = (Xt) => a === !0 || d === void 0 ? !1 : Xt === !0 ? (kt(!0), !0) : (n = n !== !0, r == null || r.reverse(), u == null || u.reverse(), c == null || c.reverse(), d.reverse(), !0);
      } else {
        const ye = `q-morph-anim-${++cg}`, Fe = document.createElement("style"), Te = o.resize === !0 ? `
            transform: translate(${Ie}px, ${ke}px);
            width: ${ve}px;
            height: ${Pe}px;
          ` : `transform: translate(${Ie}px, ${ke}px) scale(${Me}, ${Le});`, Oe = o.resize === !0 ? `
            width: ${Ge}px;
            height: ${Ke}px;
          ` : "", ut = o.resize === !0 ? `
            width: ${ve}px;
            height: ${Pe}px;
          ` : "", Ft = o.resize === !0 ? `
            transform: translate(${-1 * Ie}px, ${-1 * ke}px);
            width: ${Ge}px;
            height: ${Ke}px;
          ` : `transform: translate(${-1 * Ie}px, ${-1 * ke}px) scale(${1 / Me}, ${1 / Le});`, kt = $ !== void 0 ? `opacity: ${o.tweenToOpacity};` : `background-color: ${w};`, Xt = $ !== void 0 ? "opacity: 1;" : `background-color: ${de};`, Wt = $ === void 0 ? "" : `
            @keyframes ${ye}-from-tween {
              0% {
                opacity: ${o.tweenFromOpacity};
                margin: 0;
                border-width: ${C};
                border-style: ${k};
                border-color: ${y};
                border-radius: ${b};
                z-index: ${te};
                transform-origin: 0 0;
                transform: ${x};
                ${ut}
              }

              100% {
                opacity: 0;
                margin: 0;
                border-width: ${z};
                border-style: ${ne};
                border-color: ${P};
                border-radius: ${I};
                z-index: ${ce};
                transform-origin: 0 0;
                ${Ft}
              }
            }
          `, va = o.hideFromClone === !0 || je === !0 ? "" : `
            @keyframes ${ye}-from {
              0% {
                margin: ${We < 0 ? We / 2 : 0}px ${ot < 0 ? ot / 2 : 0}px;
                width: ${ve + g.marginH}px;
                height: ${Pe + g.marginV}px;
              }

              100% {
                margin: 0;
                width: 0;
                height: 0;
              }
            }
          `, da = je === !0 ? `
            margin: ${We < 0 ? We / 2 : 0}px ${ot < 0 ? ot / 2 : 0}px;
            width: ${ve + g.marginH}px;
            height: ${Pe + g.marginV}px;
          ` : `
            margin: 0;
            width: 0;
            height: 0;
          `;
        Fe.innerHTML = `
          @keyframes ${ye} {
            0% {
              margin: 0;
              border-width: ${C};
              border-style: ${k};
              border-color: ${y};
              border-radius: ${b};
              background-color: ${w};
              z-index: ${te};
              transform-origin: 0 0;
              ${Te}
              ${kt}
            }

            100% {
              margin: 0;
              border-width: ${z};
              border-style: ${ne};
              border-color: ${P};
              border-radius: ${I};
              background-color: ${de};
              z-index: ${ce};
              transform-origin: 0 0;
              transform: ${Y};
              ${Oe}
              ${Xt}
            }
          }

          ${va}

          ${Wt}

          ${o.keepToClone === !0 ? "" : `
            @keyframes ${ye}-to {
              0% {
                ${da}
              }

              100% {
                margin: ${le < 0 ? le / 2 : 0}px ${ue < 0 ? ue / 2 : 0}px;
                width: ${Ge + we.marginH}px;
                height: ${Ke + we.marginV}px;
              }
            }
          `}
        `, document.head.appendChild(Fe);
        let J = "normal";
        A.style.animation = `${o.duration}ms ${o.easing} ${o.delay}ms ${J} ${o.fill} ${ye}-from`, $ !== void 0 && ($.style.animation = `${o.duration}ms ${o.easing} ${o.delay}ms ${J} ${o.fill} ${ye}-from-tween`), B.style.animation = `${o.duration}ms ${o.easing} ${o.delay}ms ${J} ${o.fill} ${ye}-to`, _.style.animation = `${o.duration}ms ${o.easing} ${o.delay}ms ${J} ${o.fill} ${ye}`;
        const Se = (Re) => {
          Re === Object(Re) && Re.animationName !== ye || (_.removeEventListener("animationend", Se), _.removeEventListener("animationcancel", Se), ae(), Fe.remove());
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
const Al = {}, yg = [
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
], pg = [
  "resize",
  "useCSS",
  "hideFromClone",
  "keepToClone",
  "tween"
];
function mn(e, t) {
  e.clsAction !== t && (e.clsAction = t, e.el.classList[t]("q-morph--invisible"));
}
function Yu(e) {
  if (e.animating === !0 || e.queue.length < 2) return;
  const [t, a] = e.queue;
  e.animating = !0, t.animating = !0, a.animating = !0, mn(t, "remove"), mn(a, "remove");
  const n = bg({
    from: t.el,
    to: a.el,
    onToggle() {
      mn(t, "add"), mn(a, "remove");
    },
    ...a.opts,
    onEnd(l, o) {
      var i, r;
      (r = (i = a.opts).onEnd) == null || r.call(i, l, o), o !== !0 && (t.animating = !1, a.animating = !1, e.animating = !1, e.cancel = void 0, e.queue.shift(), Yu(e));
    }
  });
  e.cancel = () => {
    n(!0), e.cancel = void 0;
  };
}
function Xu(e, t) {
  const a = t.opts;
  pg.forEach((n) => {
    a[n] = e[n] === !0;
  });
}
function Cg(e, t) {
  const a = typeof e == "string" && e.length !== 0 ? e.split(":") : [];
  t.name = a[0], t.group = a[1], Object.assign(t.opts, {
    duration: isNaN(a[2]) === !0 ? 300 : parseFloat(a[2]),
    waitFor: a[3]
  });
}
function kg(e, t) {
  e.group !== void 0 && (t.group = e.group), e.name !== void 0 && (t.name = e.name);
  const a = t.opts;
  yg.forEach((n) => {
    e[n] !== void 0 && (a[n] = e[n]);
  });
}
function Sg(e, t) {
  if (t.name === e) {
    const a = Al[t.group];
    a === void 0 ? (Al[t.group] = {
      name: t.group,
      model: e,
      queue: [t],
      animating: !1
    }, mn(t, "remove")) : a.model !== e && (a.model = e, a.queue.push(t), a.animating === !1 && a.queue.length === 2 && Yu(a));
    return;
  }
  t.animating === !1 && mn(t, "add");
}
function Qr(e, t) {
  let a;
  Object(t) === t ? (a = String(t.model), kg(t, e), Xu(t, e)) : a = String(t), a !== e.model ? (e.model = a, Sg(a, e)) : e.animating === !1 && e.clsAction !== void 0 && e.el.classList[e.clsAction]("q-morph--invisible");
}
ua({
  name: "morph",
  mounted(e, t) {
    const a = {
      el: e,
      animating: !1,
      opts: {}
    };
    Xu(t.modifiers, a), Cg(t.arg, a), Qr(a, t.value), e.__qmorph = a;
  },
  updated(e, t) {
    Qr(e.__qmorph, t.value);
  },
  beforeUnmount(e) {
    var n;
    const t = e.__qmorph, a = Al[t.group];
    a !== void 0 && a.queue.indexOf(t) !== -1 && (a.queue = a.queue.filter((l) => l !== t), a.queue.length === 0 && ((n = a.cancel) == null || n.call(a), delete Al[t.group])), t.clsAction === "add" && e.classList.remove("q-morph--invisible"), delete e.__qmorph;
  }
});
const wg = {
  childList: !0,
  subtree: !0,
  attributes: !0,
  characterData: !0,
  attributeOldValue: !0,
  characterDataOldValue: !0
};
function Ur(e, t, a) {
  var n;
  t.handler = a, (n = t.observer) == null || n.disconnect(), t.observer = new MutationObserver((l) => {
    typeof t.handler == "function" && (t.handler(l) === !1 || t.once === !0) && Gu(e);
  }), t.observer.observe(e, t.opts);
}
function Gu(e) {
  var a;
  const t = e.__qmutation;
  t !== void 0 && ((a = t.observer) == null || a.disconnect(), delete e.__qmutation);
}
ua({
  name: "mutation",
  mounted(e, { modifiers: { once: t, ...a }, value: n }) {
    const l = {
      once: t,
      opts: Object.keys(a).length === 0 ? wg : a
    };
    Ur(e, l, n), e.__qmutation = l;
  },
  updated(e, { oldValue: t, value: a }) {
    const n = e.__qmutation;
    n !== void 0 && t !== a && Ur(e, n, a);
  },
  beforeUnmount: Gu
});
const { passive: Dl } = gt;
function Kr(e, { value: t, oldValue: a }) {
  if (typeof t != "function") {
    e.scrollTarget.removeEventListener("scroll", e.scroll, Dl);
    return;
  }
  e.handler = t, typeof a != "function" && (e.scrollTarget.addEventListener("scroll", e.scroll, Dl), e.scroll());
}
ua({
  name: "scroll-fire",
  mounted(e, t) {
    const a = {
      scrollTarget: fa(e),
      scroll: _n(() => {
        let n, l;
        a.scrollTarget === window ? (l = e.getBoundingClientRect().bottom, n = window.innerHeight) : (l = Cl(e).top + wn(e), n = Cl(a.scrollTarget).top + wn(a.scrollTarget)), l > 0 && l < n && (a.scrollTarget.removeEventListener("scroll", a.scroll, Dl), a.handler(e));
      }, 25)
    };
    Kr(a, t), e.__qscrollfire = a;
  },
  updated(e, t) {
    t.value !== t.oldValue && Kr(e.__qscrollfire, t);
  },
  beforeUnmount(e) {
    const t = e.__qscrollfire;
    t.scrollTarget.removeEventListener("scroll", t.scroll, Dl), t.scroll.cancel(), delete e.__qscrollfire;
  }
});
function Wr(e, { value: t, oldValue: a }) {
  if (typeof t != "function") {
    e.scrollTarget.removeEventListener("scroll", e.scroll, gt.passive);
    return;
  }
  e.handler = t, typeof a != "function" && e.scrollTarget.addEventListener("scroll", e.scroll, gt.passive);
}
ua({
  name: "scroll",
  mounted(e, t) {
    const a = {
      scrollTarget: fa(e),
      scroll() {
        a.handler(Aa(a.scrollTarget), Il(a.scrollTarget));
      }
    };
    Wr(a, t), e.__qscroll = a;
  },
  updated(e, t) {
    e.__qscroll !== void 0 && t.oldValue !== t.value && Wr(e.__qscroll, t);
  },
  beforeUnmount(e) {
    const t = e.__qscroll;
    t.scrollTarget.removeEventListener("scroll", t.scroll, gt.passive), delete e.__qscroll;
  }
});
ua({
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
        n.origin = Ut(o);
        const r = Date.now();
        Je.is.mobile === !0 && (document.body.classList.add("non-selectable"), sa(), n.styleCleanup = (u) => {
          n.styleCleanup = void 0;
          const c = () => {
            document.body.classList.remove("non-selectable");
          };
          u === !0 ? (sa(), setTimeout(c, 10)) : c();
        }), n.triggered = !1, n.sensitivity = i === !0 ? n.mouseSensitivity : n.touchSensitivity, n.timer = setTimeout(() => {
          n.timer = void 0, sa(), n.triggered = !0, n.handler({
            evt: o,
            touch: i !== !0,
            mouse: i === !0,
            position: n.origin,
            duration: Date.now() - r
          });
        }, n.duration);
      },
      move(o) {
        const { top: i, left: r } = Ut(o);
        n.timer !== void 0 && (Math.abs(r - n.origin.left) >= n.sensitivity || Math.abs(i - n.origin.top) >= n.sensitivity) && (clearTimeout(n.timer), n.timer = void 0);
      },
      end(o) {
        var i;
        jt(n, "temp"), (i = n.styleCleanup) == null || i.call(n, n.triggered), n.triggered === !0 ? o !== void 0 && Ye(o) : n.timer !== void 0 && (clearTimeout(n.timer), n.timer = void 0);
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
    t !== void 0 && (jt(t, "main"), jt(t, "temp"), t.timer !== void 0 && clearTimeout(t.timer), (a = t.styleCleanup) == null || a.call(t), delete e.__qtouchhold);
  }
});
const Zu = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  delete: [8, 46]
}, xg = new RegExp(`^([\\d+]+|${Object.keys(Zu).join("|")})$`, "i");
function _g(e, t) {
  const { top: a, left: n } = Ut(e);
  return Math.abs(n - t.left) >= 7 || Math.abs(a - t.top) >= 7;
}
ua({
  name: "touch-repeat",
  beforeMount(e, { modifiers: t, value: a, arg: n }) {
    const l = Object.keys(t).reduce((u, c) => {
      if (xg.test(c) === !0) {
        const d = isNaN(parseInt(c, 10)) ? Zu[c.toLowerCase()] : parseInt(c, 10);
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
        if (typeof r.handler == "function" && aa(u, l) === !0) {
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
        d !== !0 && (r.origin = Ut(u));
        function v(g) {
          r.styleCleanup = void 0, document.documentElement.style.cursor = "";
          const h = () => {
            document.body.classList.remove("non-selectable");
          };
          g === !0 ? (sa(), setTimeout(h, 10)) : h();
        }
        Je.is.mobile === !0 && (document.body.classList.add("non-selectable"), sa(), r.styleCleanup = v), r.event = {
          touch: c !== !0 && d !== !0,
          mouse: c === !0,
          keyboard: d === !0,
          startTime: Date.now(),
          repeatCount: 0
        };
        const m = () => {
          if (r.timer = void 0, r.event === void 0) return;
          r.event.repeatCount === 0 && (r.event.evt = u, d === !0 ? r.event.keyCode = u.keyCode : r.event.position = Ut(u), Je.is.mobile !== !0 && (document.documentElement.style.cursor = "pointer", document.body.classList.add("non-selectable"), sa(), r.styleCleanup = v)), r.event.duration = Date.now() - r.event.startTime, r.event.repeatCount += 1, r.handler(r.event);
          const g = i < r.event.repeatCount ? i : r.event.repeatCount;
          r.timer = setTimeout(m, o[g]);
        };
        o[0] === 0 ? m() : r.timer = setTimeout(m, o[0]);
      },
      move(u) {
        r.event !== void 0 && r.timer !== void 0 && _g(u, r.origin) === !0 && (clearTimeout(r.timer), r.timer = void 0);
      },
      end(u) {
        var c;
        r.event !== void 0 && ((c = r.styleCleanup) == null || c.call(r, !0), u !== void 0 && r.event.repeatCount > 0 && Ye(u), jt(r, "temp"), r.timer !== void 0 && (clearTimeout(r.timer), r.timer = void 0), r.event = void 0);
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
    t !== void 0 && (t.timer !== void 0 && clearTimeout(t.timer), jt(t, "main"), jt(t, "temp"), (a = t.styleCleanup) == null || a.call(t), delete e.__qtouchrepeat);
  }
});
function $g(e, t = document.body) {
  if (!(t instanceof Element)) throw new TypeError("Expected a DOM element");
  return getComputedStyle(t).getPropertyValue(`--q-${e}`).trim() || null;
}
let fl;
function qg() {
  return Je.is.winphone ? "msapplication-navbutton-color" : "theme-color";
}
function Bg(e) {
  const t = document.getElementsByTagName("META");
  for (const a in t) if (t[a].name === e) return t[a];
}
function Tg(e) {
  fl === void 0 && (fl = qg());
  let t = Bg(fl);
  const a = t === void 0;
  a && (t = document.createElement("meta"), t.setAttribute("name", fl)), t.setAttribute("content", e), a && document.head.appendChild(t);
}
Je.is.mobile === !0 && (Je.is.nativeMobile === !0 || Je.is.winphone === !0 || Je.is.safari === !0 || Je.is.webkit === !0 || Je.is.vivaldi);
const Hn = {};
function Mg(e) {
  Object.assign(Ht, {
    request: e,
    exit: e,
    toggle: e
  });
}
function Ju() {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null;
}
function ed() {
  const e = Ht.activeEl = Ht.isActive === !1 ? null : Ju();
  Rc(e === null || e === document.documentElement ? document.body : e);
}
function Ag() {
  Ht.isActive = Ht.isActive === !1, ed();
}
function Yr(e, t) {
  try {
    const a = e[t]();
    return a === void 0 ? Promise.resolve() : a;
  } catch (a) {
    return Promise.reject(a);
  }
}
const Ht = Va({
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
Ht.isCapable = Hn.request !== void 0;
Ht.isCapable === !1 ? Mg(() => Promise.reject("Not capable")) : (Object.assign(Ht, {
  request(e) {
    const t = e || document.documentElement, { activeEl: a } = Ht;
    return t === a ? Promise.resolve() : (a !== null && t.contains(a) === !0 ? Ht.exit() : Promise.resolve()).finally(() => Yr(t, Hn.request));
  },
  exit() {
    return Ht.isActive === !0 ? Yr(document, Hn.exit) : Promise.resolve();
  },
  toggle(e) {
    return Ht.isActive === !0 ? Ht.exit() : Ht.request(e);
  }
}), Hn.exit = [
  "exitFullscreen",
  "msExitFullscreen",
  "mozCancelFullScreen",
  "webkitExitFullscreen"
].find((e) => document[e]), Ht.isActive = !!Ju(), Ht.isActive === !0 && ed(), [
  "onfullscreenchange",
  "onmsfullscreenchange",
  "onwebkitfullscreenchange"
].forEach((e) => {
  document[e] = Ag;
}));
const Dg = Va({ appVisible: !0 }, { install({ $q: e }) {
  zt(e, "appVisible", () => this.appVisible);
} });
{
  let e, t;
  if (typeof document.hidden < "u" ? (e = "hidden", t = "visibilitychange") : typeof document.msHidden < "u" ? (e = "msHidden", t = "msvisibilitychange") : typeof document.webkitHidden < "u" && (e = "webkitHidden", t = "webkitvisibilitychange"), t && typeof document[e] < "u") {
    const a = () => {
      Dg.appVisible = !document[e];
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
    const { proxy: a } = be(), n = rt(e, a.$q), l = V(null);
    function o() {
      l.value.show();
    }
    function i() {
      l.value.hide();
    }
    function r(g) {
      t("ok", g), i();
    }
    function u() {
      t("hide");
    }
    function c() {
      return e.actions.map((g) => {
        const h = g.avatar || g.img;
        return g.label === void 0 ? f(Za, {
          class: "col-all",
          dark: n.value
        }) : f("div", {
          class: ["q-bottom-sheet__item q-hoverable q-focusable cursor-pointer relative-position", g.class],
          style: g.style,
          tabindex: 0,
          role: "listitem",
          onClick() {
            r(g);
          },
          onKeyup(p) {
            p.keyCode === 13 && r(g);
          }
        }, [
          f("div", { class: "q-focus-helper" }),
          g.icon ? f(st, {
            name: g.icon,
            color: g.color
          }) : h ? f("img", {
            class: g.avatar ? "q-bottom-sheet__avatar" : "",
            src: h
          }) : f("div", { class: "q-bottom-sheet__empty-icon" }),
          f("div", g.label)
        ]);
      });
    }
    function d() {
      return e.actions.map((g) => {
        const h = g.avatar || g.img;
        return g.label === void 0 ? f(Za, {
          spaced: !0,
          dark: n.value
        }) : f(jl, {
          class: ["q-bottom-sheet__item", g.classes],
          style: g.style,
          tabindex: 0,
          clickable: !0,
          dark: n.value,
          onClick() {
            r(g);
          }
        }, () => [f(Da, { avatar: !0 }, () => g.icon ? f(st, {
          name: g.icon,
          color: g.color
        }) : h ? f("img", {
          class: g.avatar ? "q-bottom-sheet__avatar" : "",
          src: h
        }) : null), f(Da, () => g.label)]);
      });
    }
    function v() {
      const g = [];
      return e.title && g.push(f(Oa, { class: "q-dialog__title" }, () => e.title)), e.message && g.push(f(Oa, { class: "q-dialog__message" }, () => e.message)), g.push(e.grid === !0 ? f("div", {
        class: "row items-stretch justify-start",
        role: "list"
      }, c()) : f("div", { role: "list" }, d())), g;
    }
    function m() {
      return [f(Is, {
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
    }, m);
  }
});
function td(e) {
  return encodeURIComponent(e);
}
function ad(e) {
  return decodeURIComponent(e);
}
function Lg(e) {
  return td(e === Object(e) ? JSON.stringify(e) : String(e));
}
function Vg(e) {
  if (e === "") return e;
  e.indexOf('"') === 0 && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")), e = ad(e.replace(/\+/g, " "));
  try {
    const t = JSON.parse(e);
    (t === Object(t) || Array.isArray(t) === !0) && (e = t);
  } catch {
  }
  return e;
}
function nd(e) {
  const t = /* @__PURE__ */ new Date();
  return t.setMilliseconds(t.getMilliseconds() + e), t.toUTCString();
}
function zg(e) {
  let t = 0;
  const a = e.match(/(\d+)d/), n = e.match(/(\d+)h/), l = e.match(/(\d+)m/), o = e.match(/(\d+)s/);
  return a && (t += a[1] * 864e5), n && (t += n[1] * 36e5), l && (t += l[1] * 6e4), o && (t += o[1] * 1e3), t === 0 ? e : nd(t);
}
function ld(e, t, a = {}, n) {
  let l, o;
  a.expires !== void 0 && (Object.prototype.toString.call(a.expires) === "[object Date]" ? l = a.expires.toUTCString() : typeof a.expires == "string" ? l = zg(a.expires) : (o = parseFloat(a.expires), l = isNaN(o) === !1 ? nd(o * 864e5) : a.expires));
  const i = `${td(e)}=${Lg(t)}`, r = [
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
      const c = Ll(e, n);
      c !== void 0 && (u = u.replace(`${e}=${c}; `, "").replace(`; ${e}=${c}`, "").replace(`${e}=${c}`, ""));
    } else u = u ? `${i}; ${u}` : r;
    n.req.headers.cookie = u;
  } else document.cookie = r;
}
function Ll(e, t) {
  const a = t ? t.req.headers : document, n = a.cookie ? a.cookie.split("; ") : [], l = n.length;
  let o = e ? null : {}, i = 0, r, u, c;
  for (; i < l; i++)
    if (r = n[i].split("="), u = ad(r.shift()), c = r.join("="), !e) o[u] = c;
    else if (e === u) {
      o = Vg(c);
      break;
    }
  return o;
}
function Pg(e, t, a) {
  ld(e, "", {
    expires: -1,
    ...t
  }, a);
}
function Rg(e, t) {
  return Ll(e, t) !== null;
}
function od(e) {
  return {
    get: (t) => Ll(t, e),
    set: (t, a, n) => ld(t, a, n, e),
    has: (t) => Rg(t, e),
    remove: (t, a) => Pg(t, a, e),
    getAll: () => Ll(null, e)
  };
}
const id = { install({ $q: e, ssrContext: t }) {
  e.cookies = this;
} };
__QUASAR_SSR__ && (id.parseSSR = (e) => {
  if (e !== void 0) return od(e);
});
Object.assign(id, od());
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
    const { proxy: a } = be(), { $q: n } = a, l = rt(e, n), o = V(null), i = V(e.prompt !== void 0 ? e.prompt.model : e.options !== void 0 ? e.options.model : void 0), r = s(() => "q-dialog-plugin" + (l.value === !0 ? " q-dialog-plugin--dark q-dark" : "") + (e.progress !== !1 ? " q-dialog-plugin--progress" : "")), u = s(() => e.color || (l.value === !0 ? "amber" : "primary")), c = s(() => e.progress === !1 ? null : Nt(e.progress) === !0 ? {
      component: e.progress.spinner || la,
      props: { color: e.progress.color || u.value }
    } : {
      component: la,
      props: { color: u.value }
    }), d = s(() => e.prompt !== void 0 || e.options !== void 0), v = s(() => {
      if (d.value !== !0) return {};
      const { model: S, isValid: T, items: H, ...E } = e.prompt !== void 0 ? e.prompt : e.options;
      return E;
    }), m = s(() => Nt(e.ok) === !0 || e.ok === !0 ? n.lang.label.ok : e.ok), g = s(() => Nt(e.cancel) === !0 || e.cancel === !0 ? n.lang.label.cancel : e.cancel), h = s(() => e.prompt !== void 0 ? e.prompt.isValid !== void 0 && e.prompt.isValid(i.value) !== !0 : e.options !== void 0 ? e.options.isValid !== void 0 && e.options.isValid(i.value) !== !0 : !1), p = s(() => ({
      color: u.value,
      label: m.value,
      ripple: !1,
      disable: h.value,
      ...Nt(e.ok) === !0 ? e.ok : { flat: !0 },
      "data-autofocus": e.focus === "ok" && d.value !== !0 || void 0,
      onClick: b
    })), C = s(() => ({
      color: u.value,
      label: g.value,
      ripple: !1,
      ...Nt(e.cancel) === !0 ? e.cancel : { flat: !0 },
      "data-autofocus": e.focus === "cancel" && d.value !== !0 || void 0,
      onClick: w
    }));
    se(() => e.prompt && e.prompt.model, L), se(() => e.options && e.options.model, L);
    function k() {
      o.value.show();
    }
    function y() {
      o.value.hide();
    }
    function b() {
      t("ok", ya(i.value)), y();
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
      h.value !== !0 && e.prompt.type !== "textarea" && aa(S, 13) === !0 && b();
    }
    function K(S, T) {
      return e.html === !0 ? f(Oa, {
        class: S,
        innerHTML: T
      }) : f(Oa, { class: S }, () => T);
    }
    function X() {
      return [f(xi, {
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
      return [f(Vv, {
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
      return e.cancel && S.push(f(ft, C.value)), e.ok && S.push(f(ft, p.value)), f(tf, {
        class: e.stackButtons === !0 ? "items-end" : "",
        vertical: e.stackButtons,
        align: "right"
      }, () => S);
    }
    function D() {
      const S = [];
      return e.title && S.push(K("q-dialog__title", e.title)), e.progress !== !1 && S.push(f(Oa, { class: "q-dialog__progress" }, () => f(c.value.component, c.value.props))), e.message && S.push(K("q-dialog__message", e.message)), e.prompt !== void 0 ? S.push(f(Oa, { class: "scroll q-dialog-plugin__form" }, X)) : e.options !== void 0 && S.push(f(Za, { dark: l.value }), f(Oa, { class: "scroll q-dialog-plugin__form" }, A), f(Za, { dark: l.value })), (e.ok || e.cancel) && S.push($()), S;
    }
    function _() {
      return [f(Is, {
        class: [r.value, e.cardClass],
        style: e.cardStyle,
        dark: l.value
      }, D)];
    }
    return Object.assign(a, {
      show: k,
      hide: y
    }), () => f(Nl, {
      ref: o,
      onHide: x
    }, _);
  }
});
let fn, _o, Xr = 0, Ea = null, Et = {}, ja = {};
const rd = {
  group: "__default_quasar_group__",
  delay: 0,
  message: !1,
  html: !1,
  spinnerSize: 80,
  spinnerColor: "",
  messageColor: "",
  backgroundColor: "",
  boxClass: "",
  spinner: la,
  customClass: ""
}, sd = { ...rd };
function Fg(e) {
  if ((e == null ? void 0 : e.group) !== void 0 && ja[e.group] !== void 0) return Object.assign(ja[e.group], e);
  const t = Nt(e) === !0 && e.ignoreDefaults === !0 ? {
    ...rd,
    ...e
  } : {
    ...sd,
    ...e
  };
  return ja[t.group] = t, t;
}
const ca = Va({ isActive: !1 }, {
  show(e) {
    Et = Fg(e);
    const { group: t } = Et;
    return ca.isActive = !0, fn !== void 0 ? (Et.uid = Xr, _o.$forceUpdate()) : (Et.uid = ++Xr, Ea !== null && clearTimeout(Ea), Ea = setTimeout(() => {
      Ea = null;
      const a = li("q-loading");
      fn = fs({
        name: "QLoading",
        setup() {
          ht(() => {
            Io(!0);
          });
          function n() {
            ca.isActive !== !0 && fn !== void 0 && (Io(!1), fn.unmount(a), Ms(a), fn = void 0, _o = void 0);
          }
          function l() {
            if (ca.isActive !== !0) return null;
            const o = [f(Et.spinner, {
              class: "q-loading__spinner",
              color: Et.spinnerColor,
              size: Et.spinnerSize
            })];
            return Et.message && o.push(f("div", {
              class: "q-loading__message" + (Et.messageColor ? ` text-${Et.messageColor}` : ""),
              [Et.html === !0 ? "innerHTML" : "textContent"]: Et.message
            })), f("div", {
              class: "q-loading fullscreen flex flex-center z-max " + Et.customClass.trim(),
              key: Et.uid
            }, [f("div", { class: "q-loading__backdrop" + (Et.backgroundColor ? ` bg-${Et.backgroundColor}` : "") }), f("div", { class: "q-loading__box column items-center " + Et.boxClass }, o)]);
          }
          return () => f(Vt, {
            name: "q-transition--fade",
            appear: !0,
            onAfterLeave: n
          }, l);
        }
      }, ca.__parentApp), _o = fn.mount(a);
    }, Et.delay)), (a) => {
      if (a === void 0 || Object(a) !== a) {
        ca.hide(t);
        return;
      }
      ca.show({
        ...a,
        group: t
      });
    };
  },
  hide(e) {
    if (ca.isActive === !0) {
      if (e === void 0) ja = {};
      else {
        if (ja[e] === void 0) return;
        {
          delete ja[e];
          const t = Object.keys(ja);
          if (t.length !== 0) {
            const a = t[t.length - 1];
            ca.show({ group: a });
            return;
          }
        }
      }
      Ea !== null && (clearTimeout(Ea), Ea = null), ca.isActive = !1;
    }
  },
  setDefaults(e) {
    Nt(e) === !0 && Object.assign(sd, e);
  },
  install({ $q: e, parentApp: t }) {
    e.loading = this, ca.__parentApp = t, e.config.loading !== void 0 && this.setDefaults(e.config.loading);
  }
}), vl = V(null), Gr = Va({ isActive: !1 }, {
  start: At,
  stop: At,
  increment: At,
  setDefaults: At,
  install({ $q: e, parentApp: t }) {
    if (e.loadingBar = this, this.__installed === !0) {
      e.config.loadingBar !== void 0 && this.setDefaults(e.config.loadingBar);
      return;
    }
    const a = V(e.config.loadingBar !== void 0 ? { ...e.config.loadingBar } : {});
    function n() {
      Gr.isActive = !0;
    }
    function l() {
      Gr.isActive = !1;
    }
    const o = li("q-loading-bar");
    fs({
      name: "LoadingBar",
      devtools: { hide: !0 },
      setup: () => () => f(ms, {
        ...a.value,
        onStart: n,
        onStop: l,
        ref: vl
      })
    }, t).mount(o), Object.assign(this, {
      start(i) {
        vl.value.start(i);
      },
      stop() {
        vl.value.stop();
      },
      increment() {
        vl.value.increment.apply(null, arguments);
      },
      setDefaults(i) {
        Nt(i) === !0 && Object.assign(a.value, i);
      }
    });
  }
});
function Eg(e) {
  return Mo(e) === !0 ? "__q_date|" + e.getTime() : rc(e) === !0 ? "__q_expr|" + e.source : typeof e == "number" ? "__q_numb|" + e : typeof e == "boolean" ? "__q_bool|" + (e ? "1" : "0") : typeof e == "string" ? "__q_strn|" + e : typeof e == "function" ? "__q_strn|" + e.toString() : e === Object(e) ? "__q_objt|" + JSON.stringify(e) : e;
}
function Ig(e) {
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
function ud() {
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
function dd(e) {
  const t = window[e + "Storage"], a = (i) => {
    const r = t.getItem(i);
    return r ? Ig(r) : null;
  }, n = (i) => t.getItem(i) !== null, l = (i, r) => {
    t.setItem(i, Eg(r));
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
const cd = Je.has.webStorage === !1 ? ud() : dd("local"), Og = { install({ $q: e }) {
  e.localStorage = cd;
} };
Object.assign(Og, cd);
const fd = Je.has.webStorage === !1 ? ud() : dd("session"), Hg = { install({ $q: e }) {
  e.sessionStorage = fd;
} };
Object.assign(Hg, fd);
const Ng = ["ok", "hide"];
Wu(Ng);
function jg() {
  return Kt("_q_");
}
function Qg(e, t) {
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
function Ug() {
  const e = V(!1);
  function t() {
    e.value = !0;
  }
  function a() {
    e.value = !1;
  }
  return { isFocused: e, handleFocusIn: t, handleFocusOut: a };
}
function Kg(e) {
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
const Wg = ["data-brand"], Yg = {
  key: 1,
  class: "dss-range__hint"
}, Xg = /* @__PURE__ */ me({
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
    var C;
    const n = e, l = a, { isFocused: o, handleFocusIn: i, handleFocusOut: r } = Ug(), { wrapperClasses: u } = Qg(n, { isFocused: o }), c = V(null), { focus: d, blur: v } = Kg(c), g = `dss-range-error-${((C = be()) == null ? void 0 : C.uid) ?? 0}`, h = s(() => n.disabled ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? n.tabindex : 0), p = s(() => {
      if (n.error && n.errorMessage) return g;
    });
    return process.env.NODE_ENV !== "production" && !n.ariaLabel && console.warn(
      "[DssRange] A prop `ariaLabel` é fortemente recomendada para acessibilidade. Range sliders sem rótulo verbal violam WCAG 1.3.1 (Name, Role, Value)."
    ), t({ focus: d, blur: v }), (k, y) => (F(), oe("div", {
      class: Mt(R(u)),
      "data-brand": e.brand ?? void 0,
      onFocusin: y[2] || (y[2] = //@ts-ignore
      (...b) => R(i) && R(i)(...b)),
      onFocusout: y[3] || (y[3] = //@ts-ignore
      (...b) => R(r) && R(r)(...b))
    }, [
      Tt(R(Ev), Ce({
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
        tabindex: h.value,
        "aria-label": e.ariaLabel,
        "aria-describedby": p.value
      }, k.$attrs, {
        "onUpdate:modelValue": y[0] || (y[0] = (b) => l("update:modelValue", b)),
        onChange: y[1] || (y[1] = (b) => l("change", b))
      }), null, 16, ["model-value", "min", "max", "step", "label", "markers", "drag-range", "dense", "disable", "readonly", "tabindex", "aria-label", "aria-describedby"]),
      e.error && e.errorMessage ? (F(), oe("span", {
        key: 0,
        id: g,
        class: "dss-range__error",
        role: "alert",
        "aria-live": "polite"
      }, Ee(e.errorMessage), 1)) : e.hint ? (F(), oe("span", Yg, Ee(e.hint), 1)) : ge("", !0)
    ], 42, Wg));
  }
}), Gg = Xg;
function Zg(e, t) {
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
function Jg(e) {
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
function eh() {
  const e = V(!1);
  function t() {
    e.value = !0;
  }
  function a() {
    e.value = !1;
  }
  return { isFocused: e, handleFocusIn: t, handleFocusOut: a };
}
const th = ["data-brand"], ah = {
  key: 0,
  class: "dss-slider__hint"
}, nh = /* @__PURE__ */ me({
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
    const n = e, l = a, o = V(null), r = `dss-slider-error-${Math.random().toString(36).substring(2, 8)}`, { isFocused: u, handleFocusIn: c, handleFocusOut: d } = eh(), { wrapperClasses: v } = Zg(n, { isFocused: u }), { focus: m, blur: g } = Jg(o), h = s(() => n.disabled ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(String(n.tabindex)) : 0), p = s(() => {
      if (n.error && n.errorMessage) return r;
    }), C = s(
      () => n.labelValue !== null && n.labelValue !== void 0 ? n.labelValue : void 0
    );
    return ht(() => {
      process.env.NODE_ENV !== "production" && !n.ariaLabel && console.warn(
        "[DssSlider] ariaLabel é fortemente recomendado quando não há label visual associado (WCAG 1.3.1)"
      );
    }), t({
      focus: m,
      blur: g
    }), (k, y) => (F(), oe("div", {
      class: Mt(R(v)),
      "data-brand": e.brand || void 0,
      onFocusin: y[2] || (y[2] = //@ts-ignore
      (...b) => R(c) && R(c)(...b)),
      onFocusout: y[3] || (y[3] = //@ts-ignore
      (...b) => R(d) && R(d)(...b))
    }, [
      Tt(R(Ia), Ce({
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
        "label-value": C.value,
        disable: e.disabled,
        readonly: e.readonly,
        dense: e.dense,
        vertical: e.vertical,
        reverse: e.reverse,
        tabindex: h.value,
        "aria-label": e.ariaLabel || void 0,
        "aria-describedby": p.value
      }, k.$attrs, {
        "onUpdate:modelValue": y[0] || (y[0] = (b) => l("update:modelValue", b)),
        onChange: y[1] || (y[1] = (b) => l("change", b))
      }), null, 16, ["model-value", "min", "max", "step", "snap", "markers", "label", "label-always", "label-value", "disable", "readonly", "dense", "vertical", "reverse", "tabindex", "aria-label", "aria-describedby"]),
      e.hint && !e.error ? (F(), oe("div", ah, Ee(e.hint), 1)) : ge("", !0),
      e.error && e.errorMessage ? (F(), oe("div", {
        key: 1,
        id: r,
        class: "dss-slider__error",
        role: "alert",
        "aria-live": "assertive"
      }, Ee(e.errorMessage), 1)) : ge("", !0)
    ], 42, th));
  }
}), lh = nh;
function oh(e) {
  return { rootClasses: s(() => [
    "dss-rating",
    { [`dss-rating--brand-${e.brand}`]: !!e.brand }
  ]) };
}
const ih = /* @__PURE__ */ me({
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
    const a = e, n = t, { rootClasses: l } = oh(a);
    return (o, i) => (F(), Be(R(Iv), Ce(o.$attrs, {
      class: R(l),
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
}), rh = ih;
function sh(e) {
  return { rootClasses: s(() => [
    "dss-knob",
    {
      [`dss-knob--brand-${e.brand}`]: !!e.brand
    }
  ]) };
}
const uh = /* @__PURE__ */ me({
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
    const a = e, n = t, { rootClasses: l } = sh(a);
    return (o, i) => (F(), Be(R($v), Ce(o.$attrs, {
      class: R(l),
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
      default: pe(() => [
        ie(o.$slots, "default", {}, () => [
          yt(Ee(e.modelValue), 1)
        ])
      ]),
      _: 3
    }, 16, ["class", "model-value", "min", "max", "inner-min", "inner-max", "step", "reverse", "instant-feedback", "readonly", "disable", "thickness", "angle", "rounded", "tabindex", "size", "name", "show-value"]));
  }
}), dh = uh;
function ch(e, t) {
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
function fh(e) {
  return { isFocused: V(!1) };
}
function vh(e, t, a) {
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
const mh = /* @__PURE__ */ me({
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
    const n = e, l = a, o = Ot(), i = V(null), { isFocused: r } = fh(), { wrapperClasses: u } = ch(n, { isFocused: r }), { handleFocus: c, handleBlur: d, focus: v, blur: m, showPopup: g, hidePopup: h, getNativeEl: p } = vh(l, i, r), C = s(() => n.disabled || n.loading ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(String(n.tabindex)) : 0), k = s(() => {
      const y = ["dss-select__panel"];
      return n.brand && y.push(`dss-select__panel--brand-${n.brand}`), y.join(" ");
    });
    return t({
      focus: v,
      blur: m,
      showPopup: g,
      hidePopup: h,
      get nativeEl() {
        return p();
      }
    }), (y, b) => (F(), Be(R(Ou), Ce({
      ref_key: "qSelectRef",
      ref: i,
      class: R(u),
      "popup-content-class": k.value,
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
      tabindex: C.value,
      "aria-label": e.ariaLabel || void 0,
      "aria-required": e.required ? "true" : void 0
    }, y.$attrs, {
      "onUpdate:modelValue": b[0] || (b[0] = (w) => l("update:modelValue", w)),
      onFocus: R(c),
      onBlur: R(d),
      onClear: b[1] || (b[1] = (w) => l("clear")),
      onPopupShow: b[2] || (b[2] = (w) => l("popup-show")),
      onPopupHide: b[3] || (b[3] = (w) => l("popup-hide"))
    }), Rt({ _: 2 }, [
      Ca(R(o), (w, x) => ({
        name: x,
        fn: pe((L) => [
          ie(y.$slots, x, Ya(Xa(L ?? {})))
        ])
      }))
    ]), 1040, ["class", "popup-content-class", "model-value", "options", "option-value", "option-label", "emit-value", "map-options", "label", "stack-label", "placeholder", "hint", "error", "error-message", "disabled", "readonly", "loading", "clearable", "multiple", "use-chips", "outlined", "filled", "standout", "borderless", "dense", "tabindex", "aria-label", "aria-required", "onFocus", "onBlur"]));
  }
}), gh = mh;
function hh(e) {
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
const vd = Id, md = Jd, bh = ["role", "aria-label", "aria-labelledby", "aria-disabled"];
let yh = 0;
const ph = /* @__PURE__ */ me({
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
    const a = e, n = t, { containerClasses: l, computedRole: o } = hh(a), i = `dss-option-group-${++yh}`;
    function r(c) {
      return Array.isArray(a.modelValue) ? a.modelValue.includes(c) : !1;
    }
    function u(c, d) {
      const v = Array.isArray(a.modelValue) ? [...a.modelValue] : [];
      if (d)
        v.includes(c) || v.push(c);
      else {
        const m = v.indexOf(c);
        m > -1 && v.splice(m, 1);
      }
      n("update:modelValue", v);
    }
    return (c, d) => (F(), oe("div", Ce({
      class: R(l),
      role: R(o),
      "aria-label": e.ariaLabel || void 0,
      "aria-labelledby": e.ariaLabelledby || void 0,
      "aria-disabled": e.disable || void 0
    }, c.$attrs), [
      e.type === "radio" || !e.type ? (F(!0), oe(gn, { key: 0 }, Ca(e.options, (v) => (F(), Be(ns, {
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
        "onUpdate:modelValue": d[0] || (d[0] = (m) => n("update:modelValue", m))
      }, null, 8, ["model-value", "val", "label", "color", "keep-color", "disable", "readonly", "dense"]))), 128)) : e.type === "checkbox" ? (F(!0), oe(gn, { key: 1 }, Ca(e.options, (v) => (F(), Be(vd, {
        key: String(v.value),
        "model-value": r(v.value),
        label: v.label,
        color: v.color ?? e.color,
        "keep-color": v.keepColor ?? e.keepColor,
        disable: !!(e.disable || v.disable),
        readonly: e.readonly,
        dense: e.dense,
        "onUpdate:modelValue": (m) => u(v.value, m)
      }, null, 8, ["model-value", "label", "color", "keep-color", "disable", "readonly", "dense", "onUpdate:modelValue"]))), 128)) : e.type === "toggle" ? (F(!0), oe(gn, { key: 2 }, Ca(e.options, (v) => (F(), Be(md, {
        key: String(v.value),
        "model-value": r(v.value),
        label: v.label,
        color: v.color ?? e.color,
        "keep-color": v.keepColor ?? e.keepColor,
        disable: !!(e.disable || v.disable),
        readonly: e.readonly,
        dense: e.dense,
        "onUpdate:modelValue": (m) => u(v.value, m)
      }, null, 8, ["model-value", "label", "color", "keep-color", "disable", "readonly", "dense", "onUpdate:modelValue"]))), 128)) : ge("", !0)
    ], 16, bh));
  }
}), Ch = ph;
function kh(e) {
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
const Sh = ["aria-label"], wh = /* @__PURE__ */ me({
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
    const t = e, { btnGroupClasses: a } = kh(t);
    return (n, l) => (F(), oe("div", Ce({
      class: R(a),
      role: "group",
      "aria-label": e.ariaLabel || void 0
    }, n.$attrs), [
      ie(n.$slots, "default")
    ], 16, Sh));
  }
}), xh = wh;
function _h(e) {
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
const $h = /* @__PURE__ */ me({
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
    const a = e, n = t, { btnToggleClasses: l, variantProps: o } = _h(a);
    return (i, r) => {
      const u = lt("q-btn-toggle");
      return F(), Be(u, Ce({
        class: R(l),
        "model-value": e.modelValue,
        "onUpdate:modelValue": r[0] || (r[0] = (c) => n("update:modelValue", c)),
        options: e.options,
        flat: R(o).flat,
        outline: R(o).outline,
        unelevated: R(o).unelevated,
        push: R(o).push,
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
function qh(e) {
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
function Bh(e) {
  return { btnDropdownClasses: s(() => {
    const a = ["dss-btn-dropdown"];
    return e.variant && e.variant !== "elevated" && a.push(`dss-btn-dropdown--${e.variant}`), e.split && a.push("dss-btn-dropdown--split"), e.square && a.push("dss-btn-dropdown--square"), e.rounded && a.push("dss-btn-dropdown--rounded"), e.dense && a.push("dss-btn-dropdown--dense"), e.disable && a.push("dss-btn-dropdown--disabled"), e.loading && a.push("dss-btn-dropdown--loading"), e.brand && a.push(`dss-btn-dropdown--brand-${e.brand}`), a;
  }) };
}
const Th = /* @__PURE__ */ me({
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
    const a = e, n = t, { btnDropdownClasses: l } = Bh(a), o = s(() => qh(a.variant).value);
    return (i, r) => {
      const u = lt("q-btn-dropdown");
      return F(), oe("div", Ce({ class: R(l) }, i.$attrs), [
        Tt(u, Ce({
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
        }), Rt({
          default: pe(() => [
            ie(i.$slots, "default")
          ]),
          _: 2
        }, [
          i.$slots.label ? {
            name: "label",
            fn: pe(() => [
              ie(i.$slots, "label")
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["label", "icon", "icon-right", "color", "text-color", "size", "square", "rounded", "dense", "split", "disable", "loading", "close-on-esc-key", "dropdown-icon", "menu-anchor", "menu-self", "menu-offset", "stretch", "persistent", "aria-label"])
      ], 16);
    };
  }
}), Mh = Th;
function Ah(e) {
  return { fabClasses: s(() => {
    const a = ["dss-fab"];
    return e.label && a.push("dss-fab--extended"), e.direction && e.direction !== "up" && a.push(`dss-fab--direction-${e.direction}`), e.disable && a.push("dss-fab--disabled"), e.brand && a.push(`dss-fab--brand-${e.brand}`), a;
  }) };
}
const Dh = /* @__PURE__ */ me({
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
    const a = e, n = t, { fabClasses: l } = Ah(a);
    return (o, i) => {
      const r = lt("q-fab");
      return F(), oe("div", Ce({ class: R(l) }, o.$attrs), [
        Tt(r, {
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
          default: pe(() => [
            ie(o.$slots, "default")
          ]),
          _: 3
        }, 8, ["model-value", "color", "text-color", "icon", "active-icon", "label", "hide-icon", "hide-label", "direction", "vertical-actions-align", "persistent", "disable", "aria-label"])
      ], 16);
    };
  }
}), Lh = Dh;
function Vh(e) {
  return { fabActionClasses: s(() => {
    const a = ["dss-fab-action"];
    return e.label && a.push("dss-fab-action--extended"), e.externalLabel && (a.push("dss-fab-action--has-external-label"), e.labelPosition && a.push(`dss-fab-action--label-${e.labelPosition}`)), e.disable && a.push("dss-fab-action--disabled"), e.brand && a.push(`dss-fab-action--brand-${e.brand}`), a;
  }) };
}
const zh = /* @__PURE__ */ me({
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
    const a = e, n = t, { fabActionClasses: l } = Vh(a);
    return (o, i) => {
      const r = lt("q-fab-action");
      return F(), oe("div", Ce({ class: R(l) }, o.$attrs), [
        Tt(r, {
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
        }, Rt({ _: 2 }, [
          o.$slots.icon ? {
            name: "icon",
            fn: pe(() => [
              ie(o.$slots, "icon")
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["color", "text-color", "icon", "label", "external-label", "label-position", "disable", "to", "href", "target", "aria-label"])
      ], 16);
    };
  }
}), Ph = zh;
function Rh(e) {
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
const Fh = ["data-brand", "aria-label"], Eh = /* @__PURE__ */ me({
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
    const a = e, n = t, { rootClasses: l } = Rh(a);
    return (o, i) => (F(), oe("div", Ce(o.$attrs, {
      class: R(l),
      "data-brand": e.brand ?? void 0,
      role: "navigation",
      "aria-label": e.ariaLabel
    }), [
      Tt(R(zv), {
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
    ], 16, Fh));
  }
}), Ih = Eh;
function Oh(e, { isFocused: t, hasValue: a }) {
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
function Hh(e, t) {
  const a = V(!1), n = s(() => e.modelValue !== "" && e.modelValue !== null && e.modelValue !== void 0), l = s(() => e.error && e.errorMessage || e.hint || !!t.error || !!t.hint);
  return {
    isFocused: a,
    hasValue: n,
    hasBottomSlot: l
  };
}
function Nh(e, t, a) {
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
const jh = {
  key: 0,
  class: "dss-input__before"
}, Qh = { class: "dss-input__field" }, Uh = {
  key: 0,
  class: "dss-input__prepend"
}, Kh = { class: "dss-input__control" }, Wh = ["id", "for"], Yh = ["id", "type", "value", "placeholder", "disabled", "readonly", "tabindex", "aria-label", "aria-labelledby", "aria-describedby", "aria-invalid", "aria-busy", "aria-disabled", "aria-readonly", "aria-required"], Xh = {
  key: 1,
  class: "dss-input__append"
}, Gh = {
  key: 0,
  class: "dss-input__loading",
  role: "status",
  "aria-label": "Loading",
  "aria-live": "polite"
}, Zh = ["aria-label"], Jh = {
  key: 1,
  class: "dss-input__after"
}, eb = {
  key: 2,
  class: "dss-input__bottom"
}, tb = ["id"], ab = ["id"], nb = /* @__PURE__ */ me({
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
    const n = e, l = a, o = Ot(), i = V(null), r = Math.random().toString(36).substring(2, 9), u = s(() => `dss-input-${r}`), c = s(() => `dss-input-label-${r}`), d = s(() => `dss-input-hint-${r}`), v = s(() => `dss-input-error-${r}`), { isFocused: m, hasValue: g, hasBottomSlot: h } = Hh(n, o), { wrapperClasses: p, labelClasses: C, inputClasses: k } = Oh(n, { isFocused: m, hasValue: g }), { handleInput: y, handleFocus: b, handleBlur: w, handleClear: x, focus: L, blur: M } = Nh(
      l,
      i,
      m
    ), K = s(() => n.stackLabel || !n.label || m.value || g.value ? n.placeholder : ""), X = s(() => n.disabled || n.loading ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(n.tabindex) : 0), A = s(() => {
      const $ = [];
      return n.error && n.errorMessage ? $.push(v.value) : n.hint && $.push(d.value), $.length > 0 ? $.join(" ") : void 0;
    });
    return t({
      focus: L,
      blur: M,
      inputRef: i
    }), ($, D) => (F(), oe("div", {
      class: Mt(R(p))
    }, [
      R(o).before ? (F(), oe("div", jh, [
        ie($.$slots, "before")
      ])) : ge("", !0),
      He("div", Qh, [
        R(o).prepend ? (F(), oe("div", Uh, [
          ie($.$slots, "prepend")
        ])) : ge("", !0),
        He("div", Kh, [
          e.label || R(o).label ? (F(), oe("label", {
            key: 0,
            id: c.value,
            for: u.value,
            class: Mt(R(C))
          }, [
            ie($.$slots, "label", {}, () => [
              yt(Ee(e.label), 1)
            ])
          ], 10, Wh)) : ge("", !0),
          He("input", Ce({
            id: u.value,
            ref_key: "inputRef",
            ref: i,
            type: e.type,
            value: e.modelValue,
            placeholder: K.value,
            disabled: e.disabled || e.loading,
            readonly: e.readonly,
            class: R(k),
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
            (..._) => R(y) && R(y)(..._)),
            onFocus: D[1] || (D[1] = //@ts-ignore
            (..._) => R(b) && R(b)(..._)),
            onBlur: D[2] || (D[2] = //@ts-ignore
            (..._) => R(w) && R(w)(..._))
          }), null, 16, Yh)
        ]),
        R(o).append || e.clearable || e.loading ? (F(), oe("div", Xh, [
          ie($.$slots, "append"),
          e.loading ? (F(), oe("span", Gh, [...D[4] || (D[4] = [
            He("span", {
              class: "dss-input__spinner",
              "aria-hidden": "true"
            }, null, -1)
          ])])) : ge("", !0),
          e.clearable && R(g) && !e.loading && !e.disabled && !e.readonly ? (F(), oe("button", {
            key: 1,
            class: "dss-input__clear",
            type: "button",
            tabindex: -1,
            "aria-label": e.clearAriaLabel,
            onClick: D[3] || (D[3] = //@ts-ignore
            (..._) => R(x) && R(x)(..._))
          }, [...D[5] || (D[5] = [
            He("span", { "aria-hidden": "true" }, "×", -1)
          ])], 8, Zh)) : ge("", !0)
        ])) : ge("", !0)
      ]),
      R(o).after ? (F(), oe("div", Jh, [
        ie($.$slots, "after")
      ])) : ge("", !0),
      R(h) ? (F(), oe("div", eb, [
        e.error && e.errorMessage ? (F(), oe("div", {
          key: 0,
          id: v.value,
          class: "dss-input__error",
          role: "alert",
          "aria-live": "assertive"
        }, [
          ie($.$slots, "error", {}, () => [
            yt(Ee(e.errorMessage), 1)
          ])
        ], 8, tb)) : e.hint ? (F(), oe("div", {
          key: 1,
          id: d.value,
          class: "dss-input__hint"
        }, [
          ie($.$slots, "hint", {}, () => [
            yt(Ee(e.hint), 1)
          ])
        ], 8, ab)) : ge("", !0)
      ])) : ge("", !0)
    ], 2));
  }
});
function lb(e, { isFocused: t, hasValue: a }) {
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
function ob(e) {
  const t = V(!1), a = s(() => e.modelValue !== void 0 && e.modelValue !== null && e.modelValue !== "");
  return { isFocused: t, hasValue: a };
}
function ib(e, t, a) {
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
const rb = /* @__PURE__ */ me({
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
    const n = e, l = a, o = Ot(), i = V(null), { isFocused: r, hasValue: u } = ob(n), { wrapperClasses: c } = lb(n, { isFocused: r, hasValue: u }), { handleFocus: d, handleBlur: v, focus: m, blur: g, getNativeEl: h } = ib(
      l,
      i,
      r
    ), p = s(() => n.disabled || n.loading ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(String(n.tabindex)) : 0), C = s(() => n.maxHeight ? { "--dss-textarea-max-height": n.maxHeight } : {});
    return t({
      focus: m,
      blur: g,
      get nativeEl() {
        return h();
      }
    }), (k, y) => (F(), Be(R(xi), Ce({
      ref_key: "qInputRef",
      ref: i,
      class: R(c),
      style: C.value,
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
    }, k.$attrs, {
      "onUpdate:modelValue": y[0] || (y[0] = (b) => l("update:modelValue", String(b ?? ""))),
      onFocus: R(d),
      onBlur: R(v),
      onClear: y[1] || (y[1] = (b) => l("clear"))
    }), Rt({ _: 2 }, [
      Ca(R(o), (b, w) => ({
        name: w,
        fn: pe((x) => [
          ie(k.$slots, w, Ya(Xa(x ?? {})))
        ])
      }))
    ]), 1040, ["class", "style", "model-value", "label", "stack-label", "placeholder", "hint", "error", "error-message", "disabled", "readonly", "loading", "clearable", "outlined", "filled", "standout", "borderless", "dense", "autogrow", "rows", "tabindex", "aria-label", "aria-required", "onFocus", "onBlur"]));
  }
}), sb = rb;
function ub(e, t) {
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
const db = {
  key: 0,
  class: "dss-field__before"
}, cb = { class: "dss-field__field" }, fb = {
  key: 0,
  class: "dss-field__prepend",
  "aria-hidden": "true"
}, vb = {
  key: 1,
  class: "dss-field__prefix",
  "aria-hidden": "true"
}, mb = { class: "dss-field__control" }, gb = ["for"], hb = {
  key: 2,
  class: "dss-field__suffix",
  "aria-hidden": "true"
}, bb = {
  key: 3,
  class: "dss-field__append"
}, yb = {
  key: 0,
  class: "dss-field__loading",
  role: "status",
  "aria-label": "Carregando",
  "aria-live": "polite"
}, pb = {
  key: 1,
  class: "dss-field__after"
}, Cb = {
  key: 2,
  class: "dss-field__bottom"
}, kb = /* @__PURE__ */ me({
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
    const a = e, n = Ot(), l = V(!1);
    function o() {
      a.disable || (l.value = !0);
    }
    function i(k) {
      k.currentTarget.contains(k.relatedTarget) || (l.value = !1);
    }
    const r = Math.random().toString(36).slice(2, 9), u = `dss-field-ctrl-${r}`, c = `dss-field-hint-${r}`, d = `dss-field-error-${r}`, v = `dss-field-label-${r}`, m = s(() => a.fieldId ?? u), { rootClasses: g, labelClasses: h } = ub(a, l), p = s(
      () => a.error && (a.errorMessage || n.error) || !a.error && (a.hint || n.hint)
    ), C = s(() => {
      if (a.error && (a.errorMessage || n.error)) return d;
      if (!a.error && (a.hint || n.hint)) return c;
    });
    return t({ fieldId: m, hintId: c, errorId: d, ariaDescribedby: C }), (k, y) => (F(), oe("div", Ce(k.$attrs, {
      class: R(g),
      onFocusin: o,
      onFocusout: i
    }), [
      k.$slots.before ? (F(), oe("div", db, [
        ie(k.$slots, "before")
      ])) : ge("", !0),
      He("div", cb, [
        k.$slots.prepend ? (F(), oe("div", fb, [
          ie(k.$slots, "prepend")
        ])) : ge("", !0),
        e.prefix ? (F(), oe("span", vb, Ee(e.prefix), 1)) : ge("", !0),
        He("div", mb, [
          e.label || k.$slots.label ? (F(), oe("label", {
            key: 0,
            id: v,
            for: m.value,
            class: Mt(R(h))
          }, [
            ie(k.$slots, "label", {}, () => [
              yt(Ee(e.label), 1)
            ])
          ], 10, gb)) : ge("", !0),
          ie(k.$slots, "default", {
            fieldId: m.value,
            ariaDescribedby: C.value
          })
        ]),
        e.suffix ? (F(), oe("span", hb, Ee(e.suffix), 1)) : ge("", !0),
        k.$slots.append || e.loading ? (F(), oe("div", bb, [
          ie(k.$slots, "append"),
          e.loading ? (F(), oe("span", yb, [...y[0] || (y[0] = [
            He("span", {
              class: "dss-field__spinner",
              "aria-hidden": "true"
            }, null, -1)
          ])])) : ge("", !0)
        ])) : ge("", !0)
      ]),
      k.$slots.after ? (F(), oe("div", pb, [
        ie(k.$slots, "after")
      ])) : ge("", !0),
      p.value ? (F(), oe("div", Cb, [
        e.error && (e.errorMessage || k.$slots.error) ? (F(), oe("div", {
          key: 0,
          id: d,
          class: "dss-field__error",
          role: "alert",
          "aria-live": "assertive"
        }, [
          ie(k.$slots, "error", {}, () => [
            yt(Ee(e.errorMessage), 1)
          ])
        ])) : !e.error && (e.hint || k.$slots.hint) ? (F(), oe("div", {
          key: 1,
          id: c,
          class: "dss-field__hint"
        }, [
          ie(k.$slots, "hint", {}, () => [
            yt(Ee(e.hint), 1)
          ])
        ])) : ge("", !0)
      ])) : ge("", !0)
    ], 16));
  }
}), Sb = kb;
function wb(e, t) {
  const a = V(!1), n = V(!1), l = s(() => {
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
function xb(e, { isFocused: t, hasValue: a, isDragging: n }) {
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
function _b(e, t, a, n) {
  return {
    handleFocus: (h) => {
      a.value = !0, e("focus", h);
    },
    handleBlur: (h) => {
      a.value = !1, n.value = !1, e("blur", h);
    },
    handleClear: () => {
      e("update:modelValue", null), e("clear");
    },
    handleDragOver: (h) => {
      h.preventDefault(), n.value || (n.value = !0);
    },
    handleDragLeave: (h) => {
      const p = h.currentTarget, C = h.relatedTarget;
      (!C || !p.contains(C)) && (n.value = !1);
    },
    pickFiles: () => {
      var h;
      (h = t.value) == null || h.pickFiles();
    },
    removeAtIndex: (h) => {
      var p;
      (p = t.value) == null || p.removeAtIndex(h);
    },
    removeFile: (h) => {
      var p;
      (p = t.value) == null || p.removeFile(h);
    },
    focus: () => {
      var h, p;
      (p = (h = t.value) == null ? void 0 : h.$el) == null || p.focus();
    },
    blur: () => {
      var h, p;
      (p = (h = t.value) == null ? void 0 : h.$el) == null || p.blur();
    }
  };
}
const $b = { class: "dss-file__prepend" }, qb = { class: "dss-file__append" }, Bb = ["aria-label"], Tb = {
  class: "dss-file__field",
  "aria-hidden": "true"
}, Mb = {
  key: 1,
  class: "dss-file__drop-hint"
}, Ab = { class: "dss-file__drop-text" }, Db = {
  key: 2,
  class: "dss-file__value"
}, Lb = {
  key: 0,
  class: "dss-file__file-name"
}, Vb = {
  key: 1,
  class: "dss-file__file-name"
}, zb = {
  key: 0,
  class: "dss-file__drag-overlay",
  "aria-hidden": "true"
}, Pb = {
  key: 1,
  class: "dss-file__bottom"
}, Rb = ["id"], Fb = ["id"], Eb = /* @__PURE__ */ me({
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
    const n = e, l = a, o = Ot(), i = V(null), r = Math.random().toString(36).substring(2, 9), u = s(() => `dss-file-hint-${r}`), c = s(() => `dss-file-error-${r}`), { isFocused: d, isDragging: v, hasValue: m, hasBottomSlot: g } = wb(n, o), { wrapperClasses: h, labelClasses: p } = xb(n, { isFocused: d, hasValue: m, isDragging: v }), {
      handleFocus: C,
      handleBlur: k,
      handleClear: y,
      handleDragOver: b,
      handleDragLeave: w,
      pickFiles: x,
      removeAtIndex: L,
      removeFile: M,
      focus: K,
      blur: X
    } = _b(l, i, d, v), A = s(() => n.disabled ? -1 : n.tabindex !== null && n.tabindex !== void 0 ? typeof n.tabindex == "number" ? n.tabindex : parseInt(String(n.tabindex)) : 0);
    return t({
      pickFiles: x,
      removeAtIndex: L,
      removeFile: M,
      focus: K,
      blur: X
    }), ($, D) => (F(), oe("div", {
      class: Mt(R(h)),
      onDragover: D[6] || (D[6] = //@ts-ignore
      (..._) => R(b) && R(b)(..._)),
      onDragleave: D[7] || (D[7] = //@ts-ignore
      (..._) => R(w) && R(w)(..._))
    }, [
      Tt(R(uv), {
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
        onFocus: R(C),
        onBlur: R(k)
      }, Rt({
        append: pe(() => [
          He("div", qb, [
            ie($.$slots, "append"),
            e.clearable && R(m) && !e.disabled && !e.readonly ? (F(), oe("button", {
              key: 0,
              class: "dss-file__clear",
              type: "button",
              tabindex: -1,
              "aria-label": e.clearAriaLabel,
              onClick: D[0] || (D[0] = Nn(
                //@ts-ignore
                (..._) => R(y) && R(y)(..._),
                ["stop"]
              ))
            }, [...D[8] || (D[8] = [
              He("span", { "aria-hidden": "true" }, "×", -1)
            ])], 8, Bb)) : ge("", !0)
          ])
        ]),
        _: 2
      }, [
        R(o).prepend ? {
          name: "prepend",
          fn: pe(() => [
            He("div", $b, [
              ie($.$slots, "prepend")
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["model-value", "multiple", "accept", "max-files", "max-file-size", "disable", "readonly", "tabindex", "aria-label", "onFocus", "onBlur"]),
      He("div", Tb, [
        e.label || R(o)["label-slot"] ? (F(), oe("label", {
          key: 0,
          class: Mt(R(p)),
          onClick: D[5] || (D[5] = //@ts-ignore
          (..._) => R(x) && R(x)(..._))
        }, Ee(e.label), 3)) : ge("", !0),
        !R(m) && !e.disabled && !e.readonly ? (F(), oe("div", Mb, [
          D[9] || (D[9] = He("span", {
            class: "dss-file__drop-icon",
            "aria-hidden": "true"
          }, "📎", -1)),
          He("span", Ab, Ee(e.placeholder || "Clique ou arraste arquivos aqui"), 1)
        ])) : ge("", !0),
        R(m) ? (F(), oe("div", Db, [
          Array.isArray(e.modelValue) ? (F(), oe("span", Lb, Ee(e.modelValue.length === 1 ? e.modelValue[0].name : `${e.modelValue.length} arquivos selecionados`), 1)) : (F(), oe("span", Vb, Ee(e.modelValue.name), 1))
        ])) : ge("", !0)
      ]),
      R(v) ? (F(), oe("div", zb, [...D[10] || (D[10] = [
        He("span", { class: "dss-file__drag-label" }, "Solte os arquivos aqui", -1)
      ])])) : ge("", !0),
      R(g) ? (F(), oe("div", Pb, [
        e.error && (e.errorMessage || R(o).error) ? (F(), oe("div", {
          key: 0,
          id: c.value,
          class: "dss-file__error",
          role: "alert",
          "aria-live": "assertive"
        }, [
          ie($.$slots, "error", {}, () => [
            yt(Ee(e.errorMessage), 1)
          ])
        ], 8, Rb)) : e.hint || R(o).hint ? (F(), oe("div", {
          key: 1,
          id: u.value,
          class: "dss-file__hint"
        }, [
          ie($.$slots, "hint", {}, () => [
            yt(Ee(e.hint), 1)
          ])
        ], 8, Fb)) : ge("", !0)
      ])) : ge("", !0)
    ], 34));
  }
}), Ib = Eb;
function Ob(e, t) {
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
const Hb = ["tabindex", "aria-label", "aria-selected", "aria-disabled", "data-brand", "onKeydown"], Nb = {
  key: 0,
  class: "dss-chip__icon dss-chip__icon--selected",
  "aria-hidden": "true"
}, jb = {
  key: 1,
  class: "dss-chip__icon dss-chip__icon--left",
  "aria-hidden": "true"
}, Qb = {
  key: 2,
  class: "dss-chip__label"
}, Ub = {
  key: 3,
  class: "dss-chip__icon dss-chip__icon--right",
  "aria-hidden": "true"
}, Kb = ["aria-label", "disabled"], Wb = {
  class: "dss-chip__icon dss-chip__icon--remove",
  "aria-hidden": "true"
}, Yb = {
  key: 5,
  class: "dss-chip__ripple",
  "aria-hidden": "true"
}, Xb = /* @__PURE__ */ me({
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
    const a = e, n = t, l = Ot(), o = s(() => !!l.default), { chipClasses: i } = Ob(a, { hasDefaultSlot: o }), r = s(() => a.icon || ""), u = s(() => a.iconRight || ""), c = s(() => a.iconRemove || "cancel"), d = s(() => a.iconSelected || "check"), v = s(() => a.selected), m = s(() => a.removable && !a.disable), g = s(() => ({})), h = s(() => a.disable ? -1 : a.tabindex !== null && a.tabindex !== void 0 ? typeof a.tabindex == "number" ? a.tabindex : parseInt(a.tabindex) : a.clickable ? 0 : -1);
    function p(k) {
      a.clickable && !a.disable && (n("click", k), a.selected !== void 0 && n("update:selected", !a.selected));
    }
    function C(k) {
      a.disable || n("remove", k);
    }
    return (k, y) => (F(), oe("div", Ce({
      class: R(i),
      style: g.value,
      tabindex: h.value,
      "aria-label": e.ariaLabel,
      "aria-selected": e.selected ? "true" : void 0,
      "aria-disabled": e.disable ? "true" : void 0,
      "data-brand": e.brand || void 0,
      role: "option"
    }, k.$attrs, {
      onClick: p,
      onKeydown: [
        Sn(p, ["enter"]),
        Sn(Nn(p, ["prevent"]), ["space"])
      ]
    }), [
      v.value ? (F(), oe("span", Nb, Ee(d.value), 1)) : ge("", !0),
      r.value && !v.value ? (F(), oe("span", jb, Ee(r.value), 1)) : ge("", !0),
      e.label || k.$slots.default ? (F(), oe("span", Qb, [
        ie(k.$slots, "default", {}, () => [
          yt(Ee(e.label), 1)
        ])
      ])) : ge("", !0),
      u.value && !m.value ? (F(), oe("span", Ub, Ee(u.value), 1)) : ge("", !0),
      m.value ? (F(), oe("button", {
        key: 4,
        type: "button",
        class: "dss-chip__remove",
        "aria-label": e.removeAriaLabel,
        disabled: e.disable,
        onClick: Nn(C, ["stop"])
      }, [
        He("span", Wb, Ee(c.value), 1)
      ], 8, Kb)) : ge("", !0),
      e.ripple && e.clickable ? (F(), oe("span", Yb)) : ge("", !0)
    ], 16, Hb));
  }
}), Gb = Xb;
function Zb(e) {
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
const Jb = ["aria-label"], e0 = /* @__PURE__ */ me({
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
    const t = e, { badgeClasses: a } = Zb(t), n = s(() => {
      const l = {};
      return t.align && (l.verticalAlign = t.align), l;
    });
    return (l, o) => (F(), oe("div", {
      class: Mt(R(a)),
      style: Rn(n.value),
      role: "status",
      "aria-label": e.ariaLabel,
      "aria-live": "polite"
    }, [
      ie(l.$slots, "default", {}, () => [
        yt(Ee(e.label), 1)
      ])
    ], 14, Jb));
  }
}), t0 = e0;
function a0(e) {
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
const n0 = {
  xs: "16px",
  sm: "20px",
  md: "24px",
  lg: "32px",
  xl: "48px"
}, l0 = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px"
};
function $o(e) {
  return ["xs", "sm", "md", "lg", "xl"].includes(e);
}
function o0(e) {
  const t = s(() => {
    const l = {};
    return e.size && !$o(e.size) && (l.width = e.size, l.height = e.size), e.square ? l.borderRadius = "0" : e.rounded && (l.borderRadius = "var(--dss-radius-md)"), l;
  }), a = s(() => {
    const l = {};
    if (e.size)
      if ($o(e.size))
        l.fontSize = n0[e.size];
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
    return e.fontSize ? l.fontSize = e.fontSize : e.size && $o(e.size) && (l.fontSize = l0[e.size]), l;
  });
  return {
    avatarStyle: t,
    iconStyle: a,
    contentStyle: n
  };
}
const i0 = ["role", "aria-label"], r0 = ["aria-label"], s0 = /* @__PURE__ */ me({
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
    const n = e, l = a, o = V(null), { avatarClasses: i } = a0(n), { avatarStyle: r, iconStyle: u, contentStyle: c } = o0(n), d = (v) => {
      l("click", v);
    };
    return t({
      rootRef: o
    }), (v, m) => (F(), oe("div", {
      ref_key: "rootRef",
      ref: o,
      class: Mt(R(i)),
      style: Rn(R(r)),
      role: e.ariaLabel ? "img" : void 0,
      "aria-label": e.ariaLabel,
      onClick: d
    }, [
      e.icon ? (F(), oe("span", {
        key: 0,
        class: "dss-avatar__icon material-icons",
        style: Rn(R(u)),
        "aria-hidden": "true"
      }, Ee(e.icon), 5)) : ge("", !0),
      e.icon ? ge("", !0) : (F(), oe("div", {
        key: 1,
        style: Rn(R(c)),
        class: "dss-avatar__content"
      }, [
        ie(v.$slots, "default")
      ], 4)),
      e.status ? (F(), oe("span", {
        key: 2,
        class: Mt(["dss-avatar__status", `dss-avatar__status--${e.status}`]),
        "aria-label": `Status: ${e.status}`
      }, null, 10, r0)) : ge("", !0)
    ], 14, i0));
  }
}), Qo = s0;
function u0(e) {
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
const d0 = ["aria-hidden", "aria-label", "role"], c0 = /* @__PURE__ */ me({
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
    const t = e, { iconClasses: a } = u0(t);
    return (n, l) => {
      const o = lt("q-icon");
      return F(), oe("span", {
        class: Mt(R(a)),
        "aria-hidden": e.decorative ? "true" : void 0,
        "aria-label": e.decorative ? void 0 : e.ariaLabel,
        role: e.decorative ? void 0 : "img"
      }, [
        Tt(o, {
          name: e.name,
          class: "dss-icon__inner"
        }, null, 8, ["name"]),
        ie(n.$slots, "default")
      ], 10, d0);
    };
  }
}), pa = c0;
function f0(e) {
  return { spinnerClasses: s(() => {
    const a = {
      "dss-spinner": !0,
      [`dss-spinner--type-${e.type ?? "standard"}`]: !0,
      [`dss-spinner--size-${e.size ?? "md"}`]: !0
    };
    return e.color && (a[`dss-spinner--color-${e.color}`] = !0), e.brand && (a[`dss-spinner--brand-${e.brand}`] = !0), a;
  }) };
}
const v0 = ["data-brand"], m0 = { class: "dss-spinner__label" }, g0 = /* @__PURE__ */ me({
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
    const t = e, { spinnerClasses: a } = f0(t), n = {
      standard: la,
      dots: im,
      ios: mm,
      oval: bm,
      tail: _m,
      rings: wm,
      pie: pm,
      bars: em
    }, l = s(() => n[t.type]), o = s(
      () => t.type === "standard" ? t.thickness : void 0
    );
    return (i, r) => (F(), oe("span", Ce(i.$attrs, {
      class: R(a),
      "data-brand": e.brand ?? void 0,
      role: "status",
      "aria-live": "polite"
    }), [
      (F(), Be(Vl(l.value), {
        class: "dss-spinner__inner",
        size: "100%",
        thickness: o.value,
        "aria-hidden": "true"
      }, null, 8, ["thickness"])),
      He("span", m0, Ee(e.ariaLabel), 1)
    ], 16, v0));
  }
}), Yl = g0;
function h0(e) {
  return { rootClasses: s(() => [
    "dss-img",
    {
      [`dss-img--radius-${e.radius}`]: e.radius && e.radius !== "none"
    }
  ]) };
}
const b0 = {
  class: "dss-img__loading",
  "aria-hidden": "true"
}, y0 = {
  class: "dss-img__error",
  "aria-hidden": "true"
}, p0 = /* @__PURE__ */ me({
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
    const a = e, n = t, l = s(() => a.decorative === !0 ? "" : a.alt !== void 0 ? a.alt : ""), { rootClasses: o } = h0(a);
    function i() {
      n("load");
    }
    function r() {
      n("error");
    }
    return (u, c) => (F(), Be(R(cv), Ce(u.$attrs, {
      class: R(o),
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
      loading: pe(() => [
        ie(u.$slots, "loading", {}, () => [
          He("div", b0, [
            Tt(Yl, { size: "sm" })
          ])
        ])
      ]),
      error: pe(() => [
        ie(u.$slots, "error", {}, () => [
          He("div", y0, [
            Tt(pa, { name: "broken_image" })
          ])
        ])
      ]),
      default: pe(() => [
        ie(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "src", "alt", "ratio", "fit", "loading", "error-src", "placeholder-src", "position", "no-transition"]));
  }
}), C0 = p0;
function k0(e) {
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
function S0(e, t) {
  return {
    cardAttrs: s(() => {
      const n = { ...t };
      return e.clickable && (n.tabindex = n.tabindex ?? "0", n.role = n.role ?? "article"), n;
    })
  };
}
function w0(e, t) {
  return {
    handleClick: (l) => {
      e.clickable && t("click", l);
    },
    handleKeydown: (l) => {
      e.clickable && t("click", l);
    }
  };
}
function x0(e) {
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
function _0(e) {
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
const $0 = /* @__PURE__ */ me({
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
    const a = e, n = t, l = as(), { cardClasses: o } = k0(a), { cardAttrs: i } = S0(a, l), { handleClick: r, handleKeydown: u } = w0(a, n), c = s(() => ({}));
    return (d, v) => (F(), oe("div", Ce({
      class: R(o),
      style: c.value
    }, R(i), {
      onClick: v[0] || (v[0] = //@ts-ignore
      (...m) => R(r) && R(r)(...m)),
      onKeydown: [
        v[1] || (v[1] = Sn(
          //@ts-ignore
          (...m) => R(u) && R(u)(...m),
          ["enter"]
        )),
        v[2] || (v[2] = Sn(Nn(
          //@ts-ignore
          (...m) => R(u) && R(u)(...m),
          ["prevent"]
        ), ["space"]))
      ]
    }), [
      ie(d.$slots, "default", {}, void 0, !0)
    ], 16));
  }
}), _i = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, l] of t)
    a[n] = l;
  return a;
}, q0 = /* @__PURE__ */ _i($0, [["__scopeId", "data-v-017dc787"]]), B0 = /* @__PURE__ */ me({
  name: "DssCardSection",
  inheritAttrs: !1,
  __name: "DssCardSection.ts",
  props: {
    horizontal: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { sectionClasses: a } = x0(t);
    return (n, l) => (F(), oe("div", Ce({ class: R(a) }, n.$attrs), [
      ie(n.$slots, "default", {}, void 0, !0)
    ], 16));
  }
}), T0 = /* @__PURE__ */ _i(B0, [["__scopeId", "data-v-8b1a37c3"]]), M0 = /* @__PURE__ */ me({
  name: "DssCardActions",
  inheritAttrs: !1,
  __name: "DssCardActions.ts",
  props: {
    align: { default: "right" },
    vertical: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { actionsClasses: a } = _0(t);
    return (n, l) => (F(), oe("div", Ce({ class: R(a) }, n.$attrs), [
      ie(n.$slots, "default", {}, void 0, !0)
    ], 16));
  }
}), A0 = /* @__PURE__ */ _i(M0, [["__scopeId", "data-v-e04ed18f"]]);
function D0(e) {
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
const L0 = ["data-brand", "aria-label", "aria-labelledby"], V0 = /* @__PURE__ */ me({
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
    const t = e, { listClasses: a } = D0(t);
    return (n, l) => (F(), oe("div", Ce({
      class: R(a),
      "data-brand": t.brand || void 0,
      role: "list",
      "aria-label": t.ariaLabel,
      "aria-labelledby": t.ariaLabelledby
    }, n.$attrs), [
      ie(n.$slots, "default")
    ], 16, L0));
  }
});
function z0(e) {
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
const P0 = ["role", "tabindex", "aria-label", "aria-disabled", "data-brand", "onKeydown"], R0 = ["aria-hidden"], F0 = { class: "dss-item__content" }, E0 = {
  key: 0,
  class: "dss-item__label"
}, I0 = {
  key: 1,
  class: "dss-item__caption"
}, O0 = ["aria-hidden"], H0 = /* @__PURE__ */ me({
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
    const a = e, n = t, { itemClasses: l } = z0(a), o = s(() => a.clickable && a.disabled ? -1 : a.tabindex !== null && a.tabindex !== void 0 ? typeof a.tabindex == "number" ? a.tabindex : parseInt(a.tabindex) : a.clickable ? 0 : void 0);
    function i(r) {
      a.clickable && !a.disabled && n("click", r);
    }
    return (r, u) => (F(), oe("div", Ce({
      class: R(l),
      role: e.clickable ? "button" : "listitem",
      tabindex: o.value,
      "aria-label": e.ariaLabel,
      "aria-disabled": e.clickable && e.disabled ? "true" : void 0,
      "data-brand": e.brand || void 0
    }, r.$attrs, {
      onClick: i,
      onKeydown: [
        Sn(i, ["enter"]),
        Sn(Nn(i, ["prevent"]), ["space"])
      ]
    }), [
      r.$slots.leading ? (F(), oe("div", {
        key: 0,
        class: "dss-item__leading",
        "aria-hidden": e.leadingDecorative ? "true" : void 0
      }, [
        ie(r.$slots, "leading")
      ], 8, R0)) : ge("", !0),
      He("div", F0, [
        ie(r.$slots, "default", {}, () => [
          e.label ? (F(), oe("span", E0, Ee(e.label), 1)) : ge("", !0),
          e.caption ? (F(), oe("span", I0, Ee(e.caption), 1)) : ge("", !0)
        ])
      ]),
      r.$slots.trailing ? (F(), oe("div", {
        key: 1,
        class: "dss-item__trailing",
        "aria-hidden": e.trailingDecorative ? "true" : void 0
      }, [
        ie(r.$slots, "trailing")
      ], 8, O0)) : ge("", !0)
    ], 16, P0));
  }
}), N0 = H0;
function j0(e) {
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
const Q0 = /* @__PURE__ */ me({
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
    const t = e, { itemLabelClasses: a } = j0(t);
    return (n, l) => {
      const o = lt("q-item-label");
      return F(), Be(o, Ce({
        class: R(a),
        header: t.header,
        caption: t.caption,
        overline: t.overline,
        lines: t.lines
      }, n.$attrs), {
        default: pe(() => [
          ie(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "header", "caption", "overline", "lines"]);
    };
  }
}), U0 = Q0;
function K0(e) {
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
const W0 = /* @__PURE__ */ me({
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
    const t = e, { itemSectionClasses: a } = K0(t);
    return (n, l) => {
      const o = lt("q-item-section");
      return F(), Be(o, Ce({
        class: R(a),
        avatar: t.avatar,
        thumbnail: t.thumbnail,
        side: t.side,
        top: t.top,
        "no-wrap": t.noWrap
      }, n.$attrs), {
        default: pe(() => [
          ie(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "avatar", "thumbnail", "side", "top", "no-wrap"]);
    };
  }
});
function Y0(e) {
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
const X0 = {
  name: "DssMarkupTable",
  inheritAttrs: !1
}, G0 = /* @__PURE__ */ me({
  ...X0,
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
    const t = e, { rootClasses: a } = Y0(t), n = s(() => t.density === "compact");
    return (l, o) => {
      const i = lt("q-markup-table");
      return F(), Be(i, Ce(l.$attrs, {
        class: R(a),
        dense: n.value,
        flat: e.flat,
        bordered: e.bordered,
        separator: e.separator,
        square: e.square,
        "wrap-cells": e.wrapCells
      }), {
        default: pe(() => [
          ie(l.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "dense", "flat", "bordered", "separator", "square", "wrap-cells"]);
    };
  }
}), Z0 = G0;
function J0(e) {
  return { treeClasses: s(() => [
    "dss-tree",
    e.dense && "dss-tree--dense"
  ].filter(Boolean)) };
}
const ey = {
  name: "DssTree",
  inheritAttrs: !1
}, ty = /* @__PURE__ */ me({
  ...ey,
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
    const n = e, l = a, { treeClasses: o } = J0(n), i = V();
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
      return F(), Be(c, Ce({
        ref_key: "qTreeRef",
        ref: i
      }, r.$attrs, {
        class: R(o),
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
      }), Rt({ _: 2 }, [
        Ca(r.$slots, (d, v) => ({
          name: v,
          fn: pe((m) => [
            ie(r.$slots, v, Ya(Xa(m || {})))
          ])
        }))
      ]), 1040, ["class", "nodes", "node-key", "label-key", "children-key", "selected", "expanded", "ticked", "accordion", "no-connectors", "default-expand-all", "filter", "filter-method", "tick-strategy", "no-nodes-label", "no-results-label", "icon-size", "dense"]);
    };
  }
}), ay = ty;
function ny(e) {
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
const ly = ["data-brand"], oy = /* @__PURE__ */ me({
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
    const t = e, { rootClasses: a } = ny(t), n = {
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
    return (i, r) => (F(), oe("div", Ce(i.$attrs, {
      class: R(a),
      "data-brand": e.brand ?? void 0
    }), [
      Tt(R(Pu), {
        class: "dss-linear-progress__inner",
        size: l.value,
        value: o.value,
        indeterminate: e.indeterminate,
        reverse: e.reverse,
        stripe: e.stripe,
        "animation-speed": 250
      }, null, 8, ["size", "value", "indeterminate", "reverse", "stripe"])
    ], 16, ly));
  }
}), gd = oy;
function iy(e) {
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
const ry = ["data-brand"], sy = /* @__PURE__ */ me({
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
    const t = e, { rootClasses: a } = iy(t), n = {
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
    ), i = Ot(), r = s(() => !!i.default);
    return (u, c) => (F(), oe("div", Ce(u.$attrs, {
      class: R(a),
      "data-brand": e.brand ?? void 0
    }), [
      Tt(R(bi), {
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
        default: pe(() => [
          ie(u.$slots, "default")
        ]),
        _: 3
      }, 8, ["size", "value", "min", "max", "thickness", "angle", "indeterminate", "reverse", "instant-feedback", "show-value"])
    ], 16, ry));
  }
}), uy = sy, dy = {
  rect: "rect",
  text: "text",
  circle: "circle",
  heading: "rect",
  avatar: "circle"
}, cy = {
  wave: "wave",
  pulse: "pulse",
  none: "none"
};
function fy(e) {
  const t = s(() => e.type ?? "rect"), a = s(() => e.animation ?? "wave"), n = s(() => e.lines ?? 1), l = s(
    () => t.value === "text" && n.value > 1
  ), o = s(() => dy[t.value] ?? "rect"), i = s(() => cy[a.value] ?? "wave"), r = s(() => {
    const d = l.value ? n.value : 1;
    return Array.from({ length: d }, (v, m) => ({
      width: l.value && m === d - 1 ? "70%" : e.width
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
const vy = ["data-brand"], my = /* @__PURE__ */ me({
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
    const t = e, { rootClasses: a, rootStyle: n, quasarType: l, quasarAnimation: o, skeletonItems: i } = fy(t);
    return (r, u) => (F(), oe("div", Ce({ "aria-hidden": "true" }, r.$attrs, {
      class: R(a),
      style: R(n),
      "data-brand": e.brand ?? void 0
    }), [
      (F(!0), oe(gn, null, Ca(R(i), (c, d) => (F(), Be(R(Yv), {
        key: d,
        class: "dss-skeleton__item",
        type: R(l),
        animation: R(o),
        bordered: e.bordered,
        width: c.width,
        height: e.height,
        tag: e.tag
      }, null, 8, ["type", "animation", "bordered", "width", "height", "tag"]))), 128))
    ], 16, vy));
  }
}), gy = my;
function hy(e) {
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
const by = {
  key: 0,
  class: "dss-inner-loading__label"
}, yy = /* @__PURE__ */ me({
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
    const t = e, { rootClasses: a } = hy(t);
    return (n, l) => (F(), Be(R(vv), Ce({
      role: "status",
      "aria-live": "polite",
      class: R(a),
      "data-brand": e.brand ?? void 0,
      showing: e.showing,
      delay: e.delay
    }, n.$attrs), {
      default: pe(() => [
        ie(n.$slots, "default", {}, () => [
          Tt(Yl, {
            size: e.size,
            "aria-hidden": "true"
          }, null, 8, ["size"]),
          e.label ? (F(), oe("span", by, Ee(e.label), 1)) : ge("", !0)
        ])
      ]),
      _: 3
    }, 16, ["class", "data-brand", "showing", "delay"]));
  }
}), py = yy;
function Cy(e) {
  return { rootClasses: s(() => [
    "dss-ajax-bar",
    `dss-ajax-bar--pos-${e.position ?? "top"}`,
    {
      [`dss-ajax-bar--brand-${e.brand}`]: !!e.brand
    }
  ]) };
}
const ky = /* @__PURE__ */ me({
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
    const n = e, l = a, { rootClasses: o } = Cy(n), i = V(null);
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
    }), (r, u) => (F(), Be(R(ms), Ce({
      ref_key: "qAjaxBarRef",
      ref: i
    }, r.$attrs, {
      class: R(o),
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
}), Sy = ky;
function wy(e) {
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
const xy = ["aria-label"], _y = /* @__PURE__ */ me({
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
    const t = e, { tooltipClasses: a } = wy(t);
    return (n, l) => ea((F(), oe("div", {
      class: Mt(R(a)),
      role: "tooltip",
      "aria-label": e.ariaLabel
    }, [
      ie(n.$slots, "default", {}, () => [
        yt(Ee(e.label), 1)
      ])
    ], 10, xy)), [
      [Ko, e.visible]
    ]);
  }
}), $y = _y;
function qy(e) {
  return {
    menuClasses: s(() => [
      "dss-menu"
    ])
  };
}
const By = /* @__PURE__ */ me({
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
    const a = e, n = t, { menuClasses: l } = qy();
    return (o, i) => {
      const r = lt("q-menu");
      return F(), Be(r, Ce({
        class: R(l),
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
        default: pe(() => [
          ie(o.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "model-value", "fit", "cover", "anchor", "self", "offset"]);
    };
  }
}), Ty = By;
function My(e) {
  return {
    popupProxyClasses: s(() => ["dss-popup-proxy"])
  };
}
const Ay = /* @__PURE__ */ me({
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
    const n = e, l = a, { popupProxyClasses: o } = My(), i = V();
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
      return F(), Be(c, Ce({
        ref_key: "proxyRef",
        ref: i,
        class: R(o),
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
        default: pe(() => [
          ie(r.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "model-value", "breakpoint", "target", "no-parent-event", "context-menu", "persistent", "no-focus", "no-refocus", "auto-close", "anchor", "self", "offset", "fit", "cover", "max-height", "max-width", "transition-show", "transition-hide", "scroll-target"]);
    };
  }
}), Dy = Ay;
function Ly(e) {
  return { layoutClasses: s(() => [
    "dss-layout",
    {
      "dss-layout--container": e.container
    }
  ]) };
}
const Vy = /* @__PURE__ */ me({
  name: "DssLayout",
  inheritAttrs: !1,
  __name: "DssLayout.ts",
  props: {
    view: { default: "hHh lpR fFf" },
    container: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { layoutClasses: a } = Ly(t);
    return (n, l) => {
      const o = lt("q-layout");
      return F(), Be(o, Ce({
        class: R(a),
        view: t.view,
        container: t.container
      }, n.$attrs), {
        default: pe(() => [
          ie(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "view", "container"]);
    };
  }
});
function zy(e) {
  return { pageClasses: s(() => [
    "dss-page",
    {
      "dss-page--padding": e.padding
    }
  ]) };
}
const Py = /* @__PURE__ */ me({
  name: "DssPage",
  inheritAttrs: !1,
  __name: "DssPage.ts",
  props: {
    padding: { type: Boolean, default: !1 },
    styleFn: {}
  },
  setup(e) {
    const t = e, { pageClasses: a } = zy(t);
    return (n, l) => {
      const o = lt("q-page");
      return F(), Be(o, Ce({
        class: R(a),
        role: "main",
        "style-fn": t.styleFn
      }, n.$attrs), {
        default: pe(() => [
          ie(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "style-fn"]);
    };
  }
}), Ry = Py;
function Fy() {
  return { pageContainerClasses: s(() => ({
    "dss-page-container": !0
  })) };
}
const Ey = /* @__PURE__ */ me({
  name: "DssPageContainer",
  inheritAttrs: !1,
  __name: "DssPageContainer.ts",
  setup(e) {
    const { pageContainerClasses: t } = Fy();
    return (a, n) => {
      const l = lt("q-page-container");
      return F(), Be(l, Ce({ class: R(t) }, a.$attrs), {
        default: pe(() => [
          ie(a.$slots, "default")
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
}), Iy = Ey;
function Oy(e) {
  return { headerClasses: s(() => [
    "dss-header",
    {
      "dss-header--elevated": e.elevated,
      "dss-header--bordered": e.bordered
    }
  ]) };
}
const Hy = /* @__PURE__ */ me({
  name: "DssHeader",
  inheritAttrs: !1,
  __name: "DssHeader.ts",
  props: {
    elevated: { type: Boolean, default: !1 },
    bordered: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { headerClasses: a } = Oy(t);
    return (n, l) => {
      const o = lt("q-header");
      return F(), Be(o, Ce({ class: R(a) }, n.$attrs), {
        default: pe(() => [
          ie(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
});
function Ny(e) {
  return { footerClasses: s(() => [
    "dss-footer",
    {
      "dss-footer--elevated": e.elevated,
      "dss-footer--bordered": e.bordered
    }
  ]) };
}
const jy = /* @__PURE__ */ me({
  name: "DssFooter",
  inheritAttrs: !1,
  __name: "DssFooter.ts",
  props: {
    elevated: { type: Boolean, default: !1 },
    bordered: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { footerClasses: a } = Ny(t);
    return (n, l) => {
      const o = lt("q-footer");
      return F(), Be(o, Ce({ class: R(a) }, n.$attrs), {
        default: pe(() => [
          ie(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
});
function Qy(e) {
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
const Uy = /* @__PURE__ */ me({
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
    const a = e, n = t, l = as(), { drawerClasses: o } = Qy(a), i = s(() => ({
      role: "navigation",
      ...l
    }));
    function r(u) {
      n("update:modelValue", u);
    }
    return (u, c) => {
      const d = lt("q-drawer");
      return F(), Be(d, Ce({ class: R(o) }, i.value, {
        "model-value": a.modelValue,
        side: a.side,
        overlay: a.overlay,
        mini: a.mini,
        width: a.width,
        behavior: "default",
        "onUpdate:modelValue": r
      }), {
        default: pe(() => [
          ie(u.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "model-value", "side", "overlay", "mini", "width"]);
    };
  }
});
function Ky(e) {
  return { toolbarClasses: s(() => [
    "dss-toolbar",
    {
      "dss-toolbar--inset": e.inset,
      [`dss-toolbar--brand-${e.brand}`]: !!e.brand
    }
  ]) };
}
const Wy = /* @__PURE__ */ me({
  name: "DssToolbar",
  inheritAttrs: !1,
  __name: "DssToolbar.ts",
  props: {
    inset: { type: Boolean, default: !1 },
    brand: { default: void 0 }
  },
  setup(e) {
    const t = e, { toolbarClasses: a } = Ky(t), n = s(() => t.brand ? { "data-brand": t.brand } : {});
    return (l, o) => {
      const i = lt("q-toolbar");
      return F(), Be(i, Ce({ class: R(a) }, { ...l.$attrs, ...n.value }), {
        default: pe(() => [
          ie(l.$slots, "default")
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
}), Yy = Wy;
function Xy(e) {
  return { toolbarTitleClasses: s(() => ({
    "dss-toolbar-title": !0,
    "dss-toolbar-title--shrink": !!e.shrink
  })) };
}
const Gy = /* @__PURE__ */ me({
  name: "DssToolbarTitle",
  inheritAttrs: !1,
  __name: "DssToolbarTitle.ts",
  props: {
    shrink: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { toolbarTitleClasses: a } = Xy(t);
    return (n, l) => {
      const o = lt("q-toolbar-title");
      return F(), Be(o, Ce({
        class: R(a),
        shrink: t.shrink
      }, n.$attrs), Rt({
        default: pe(() => [
          ie(n.$slots, "default")
        ]),
        _: 2
      }, [
        n.$slots.subtitle ? {
          name: "subtitle",
          fn: pe(() => [
            ie(n.$slots, "subtitle")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "shrink"]);
    };
  }
}), Zy = Gy;
function Jy(e) {
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
const ep = /* @__PURE__ */ me({
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
    const t = e, { separatorClasses: a } = Jy(t);
    return (n, l) => (F(), Be(Vl(e.vertical ? "div" : "hr"), {
      class: Mt(R(a)),
      role: e.vertical ? "separator" : void 0,
      "aria-orientation": e.vertical ? "vertical" : void 0,
      "aria-hidden": e.ariaHidden || void 0
    }, null, 8, ["class", "role", "aria-orientation", "aria-hidden"]));
  }
}), tp = ep;
function ap(e) {
  return { spaceClasses: s(() => {
    const a = ["dss-space"];
    return e.size !== void 0 && a.push(`dss-space--size-${e.size}`), a;
  }) };
}
const np = /* @__PURE__ */ me({
  name: "DssSpace",
  inheritAttrs: !0,
  __name: "DssSpace.ts",
  props: {
    size: {}
  },
  setup(e) {
    const t = e, { spaceClasses: a } = ap(t);
    return (n, l) => (F(), oe("div", {
      class: Mt(R(a)),
      "aria-hidden": "true"
    }, null, 2));
  }
}), lp = np;
function op(e) {
  return { rootClasses: s(() => ({
    "dss-scroll-area--horizontal": e.horizontal,
    "dss-scroll-area--always-visible": e.visible === "always",
    "dss-scroll-area--never-visible": e.visible === "never"
  })) };
}
const ip = /* @__PURE__ */ me({
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
    const n = e, l = a, { rootClasses: o } = op(n), i = V(null), r = s(() => {
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
        var m;
        return (m = i.value) == null ? void 0 : m.scrollTo(c, d, v);
      },
      /**
       * Scrolls by a relative offset from current position.
       * @param offset  Delta in pixels
       * @param duration  Animation duration in ms (0 = instant)
       * @param axis  'vertical' (default) | 'horizontal'
       */
      scrollBy: (c, d, v) => {
        var m;
        return (m = i.value) == null ? void 0 : m.scrollBy(c, d, v);
      },
      /**
       * Sets scroll position on a specific axis.
       * @param axis  'vertical' | 'horizontal'
       * @param offset  Position in pixels
       * @param duration  Animation duration in ms (optional)
       */
      setScrollPosition: (c, d, v) => {
        var m;
        return (m = i.value) == null ? void 0 : m.setScrollPosition(c, d, v);
      }
    }), (c, d) => (F(), Be(R(Hv), Ce({
      ref_key: "scrollAreaRef",
      ref: i
    }, c.$attrs, {
      class: ["dss-scroll-area", R(o)],
      visible: r.value,
      horizontal: e.horizontal,
      delay: e.barDelay,
      "scroll-target": e.scrollTarget ?? void 0,
      role: e.label ? "region" : void 0,
      "aria-label": e.label ?? void 0,
      onScroll: u
    }), {
      default: pe(() => [
        ie(c.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "visible", "horizontal", "delay", "scroll-target", "role", "aria-label"]));
  }
}), rp = ip;
function sp(e) {
  return { rootClasses: s(() => ({
    "dss-splitter--vertical": e.orientation === "vertical",
    "dss-splitter--disabled": e.disabled,
    "dss-splitter--reversed": e.reverse
  })) };
}
const up = /* @__PURE__ */ me({
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
    const a = e, n = t, { rootClasses: l } = sp(a), o = s(() => a.orientation === "vertical");
    return (i, r) => {
      const u = lt("q-splitter");
      return F(), Be(u, Ce(i.$attrs, {
        class: ["dss-splitter", R(l)],
        "model-value": e.modelValue,
        horizontal: o.value,
        limits: e.limits,
        reverse: e.reverse,
        disable: e.disabled,
        "emit-immediately": e.emitImmediately,
        unit: e.unit,
        "onUpdate:modelValue": r[0] || (r[0] = (c) => n("update:modelValue", c))
      }), {
        before: pe(() => [
          ie(i.$slots, "before")
        ]),
        separator: pe(() => [
          ie(i.$slots, "separator")
        ]),
        after: pe(() => [
          ie(i.$slots, "after")
        ]),
        _: 3
      }, 16, ["class", "model-value", "horizontal", "limits", "reverse", "disable", "emit-immediately", "unit"]);
    };
  }
}), dp = up;
function cp() {
  const e = jg(), t = s(() => e.screen.xs ? "xs" : e.screen.sm ? "sm" : e.screen.md ? "md" : e.screen.lg ? "lg" : "xl"), a = s(() => t.value === "xs"), n = s(() => t.value === "sm"), l = s(() => t.value === "md"), o = s(() => t.value === "lg"), i = s(() => t.value === "xl"), r = s(() => a.value || n.value), u = s(() => l.value || o.value || i.value);
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
const fp = {
  name: "DssResponsive",
  inheritAttrs: !1
}, vp = /* @__PURE__ */ me({
  ...fp,
  props: {
    breakpoint: {},
    showOn: {},
    hideOn: {},
    tag: { default: "div" }
  },
  setup(e) {
    const t = e, { currentBreakpoint: a, isXs: n, isSm: l, isMd: o, isLg: i, isXl: r, isMobile: u, isDesktop: c } = cp(), d = s(() => {
      const m = a.value, g = t.showOn ?? t.breakpoint;
      if (g && g.length > 0) {
        const h = g.includes(m);
        return t.hideOn && t.hideOn.length > 0 ? h && !t.hideOn.includes(m) : h;
      }
      return t.hideOn && t.hideOn.length > 0 ? !t.hideOn.includes(m) : !0;
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
    return (m, g) => d.value ? (F(), Be(Vl(t.tag), Ce({ key: 0 }, m.$attrs, { class: "dss-responsive" }), {
      default: pe(() => [
        ie(m.$slots, "default", Ya(Xa(v.value)))
      ]),
      _: 3
    }, 16)) : ge("", !0);
  }
}), mp = vp;
function gp() {
  return { scrollerClasses: ["dss-page-scroller"] };
}
const hp = /* @__PURE__ */ me({
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
    const t = e, { scrollerClasses: a } = gp(), n = V(!1);
    let l = null;
    function o(r) {
      n.value = r.matches;
    }
    ht(() => {
      l = window.matchMedia("(prefers-reduced-motion: reduce)"), n.value = l.matches, l.addEventListener("change", o);
    }), zl(() => {
      l == null || l.removeEventListener("change", o);
    });
    const i = s(
      () => n.value ? 0 : t.duration
    );
    return (r, u) => {
      const c = lt("q-page-scroller");
      return F(), Be(c, Ce({
        position: t.position,
        offset: t.offset,
        "scroll-offset": t.scrollOffset,
        duration: i.value,
        reverse: t.reverse,
        class: R(a)
      }, r.$attrs), {
        default: pe(() => [
          ie(r.$slots, "default")
        ]),
        _: 3
      }, 16, ["position", "offset", "scroll-offset", "duration", "reverse", "class"]);
    };
  }
}), bp = hp;
function yp(e) {
  return { stickyClasses: s(() => [
    "dss-page-sticky",
    {
      "dss-page-sticky--elevated": e.elevated
    }
  ]) };
}
const pp = /* @__PURE__ */ me({
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
    const t = e, { stickyClasses: a } = yp(t);
    return (n, l) => {
      const o = lt("q-page-sticky");
      return F(), Be(o, Ce({
        position: t.position,
        offset: t.offset,
        expand: t.expand,
        class: R(a)
      }, n.$attrs), {
        default: pe(() => [
          ie(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["position", "offset", "expand", "class"]);
    };
  }
}), Cp = pp;
function kp(e) {
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
const Sp = ["data-brand"], wp = /* @__PURE__ */ me({
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
    const a = e, n = t, { tabsClasses: l } = kp(a);
    function o(i) {
      n("update:modelValue", i);
    }
    return (i, r) => {
      const u = lt("q-tabs");
      return F(), oe("div", Ce({
        class: R(l),
        "data-brand": a.brand || void 0
      }, i.$attrs), [
        Tt(u, {
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
          default: pe(() => [
            ie(i.$slots, "default")
          ]),
          _: 3
        }, 8, ["model-value", "align", "breakpoint", "vertical", "dense", "aria-label"])
      ], 16, Sp);
    };
  }
}), xp = wp;
function _p(e) {
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
const $p = /* @__PURE__ */ me({
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
    const t = e, { tabClasses: a } = _p(t);
    return (n, l) => {
      const o = lt("q-tab");
      return F(), Be(o, Ce({
        class: R(a),
        name: t.name,
        label: t.label,
        icon: t.icon,
        alert: t.alert,
        disable: t.disable,
        ripple: !1
      }, n.$attrs), Rt({ _: 2 }, [
        n.$slots.default ? {
          name: "default",
          fn: pe(() => [
            ie(n.$slots, "default")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "name", "label", "icon", "alert", "disable"]);
    };
  }
}), qp = $p;
function Bp(e) {
  return { tabPanelClasses: s(() => [
    "dss-tab-panel",
    {
      "dss-tab-panel--disabled": e.disable
    }
  ]) };
}
const Tp = /* @__PURE__ */ me({
  name: "DssTabPanel",
  inheritAttrs: !1,
  __name: "DssTabPanel.ts",
  props: {
    name: {},
    disable: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, { tabPanelClasses: a } = Bp(t);
    return (n, l) => {
      const o = lt("q-tab-panel");
      return F(), Be(o, Ce({
        class: R(a),
        name: t.name,
        disable: t.disable
      }, n.$attrs), {
        default: pe(() => [
          ie(n.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "name", "disable"]);
    };
  }
}), Mp = Tp;
function Ap(e) {
  return { tabPanelsClasses: s(() => [
    "dss-tab-panels",
    {
      "dss-tab-panels--animated": e.animated
    }
  ]) };
}
const Zr = "dss-tab-panels", Dp = /* @__PURE__ */ me({
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
    const a = e, n = t, { tabPanelsClasses: l } = Ap(a);
    return (o, i) => {
      const r = lt("q-tab-panels");
      return F(), Be(r, Ce({
        class: R(l),
        "model-value": e.modelValue,
        animated: e.animated,
        "transition-prev": e.animated ? Zr : void 0,
        "transition-next": e.animated ? Zr : void 0,
        swipeable: e.swipeable,
        infinite: e.infinite,
        "keep-alive": e.keepAlive
      }, o.$attrs, {
        "onUpdate:modelValue": i[0] || (i[0] = (u) => n("update:modelValue", u))
      }), {
        default: pe(() => [
          ie(o.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "model-value", "animated", "transition-prev", "transition-next", "swipeable", "infinite", "keep-alive"]);
    };
  }
}), Lp = Dp;
function Vp(e) {
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
const zp = /* @__PURE__ */ me({
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
    const t = e, { routeTabClasses: a } = Vp(t);
    return (n, l) => {
      const o = lt("q-route-tab");
      return F(), Be(o, Ce({
        class: R(a),
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
      }, n.$attrs), Rt({ _: 2 }, [
        n.$slots.default ? {
          name: "default",
          fn: pe(() => [
            ie(n.$slots, "default")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "name", "label", "icon", "alert", "disable", "to", "exact", "replace", "href", "target"]);
    };
  }
}), Pp = zp;
function Rp(e) {
  return { breadcrumbsClasses: s(() => [
    "dss-breadcrumbs",
    {
      [`dss-breadcrumbs--gutter-${e.gutter}`]: e.gutter,
      [`dss-breadcrumbs--align-${e.align}`]: e.align && e.align !== "left",
      [`dss-breadcrumbs--brand-${e.brand}`]: e.brand
    }
  ]) };
}
const Fp = /* @__PURE__ */ me({
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
    const t = e, { breadcrumbsClasses: a } = Rp(t), n = s(() => ({
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
      return F(), Be(u, Ce({
        class: R(a),
        style: o.value,
        separator: e.separator,
        align: e.align === "left" ? void 0 : e.align,
        gutter: "none"
      }, i.$attrs), Rt({
        default: pe(() => [
          ie(i.$slots, "default")
        ]),
        _: 2
      }, [
        i.$slots.separator ? {
          name: "separator",
          fn: pe(() => [
            ie(i.$slots, "separator")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "style", "separator", "align"]);
    };
  }
}), Ep = Fp;
function Ip(e) {
  const t = s(() => !!(e.to || e.href));
  return { breadcrumbsElClasses: s(() => ({
    "dss-breadcrumbs-el--clickable": t.value,
    "dss-breadcrumbs-el--current": !t.value,
    "dss-breadcrumbs-el--disabled": e.disable
  })), isClickable: t };
}
const Op = /* @__PURE__ */ me({
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
    const t = e, { breadcrumbsElClasses: a } = Ip(t);
    return (n, l) => {
      const o = lt("q-breadcrumbs-el");
      return F(), Be(o, Ce({
        class: ["dss-breadcrumbs-el", R(a)],
        to: e.to,
        href: e.href,
        disable: e.disable,
        tag: e.tag
      }, n.$attrs), {
        default: pe(() => [
          e.icon ? (F(), Be(pa, {
            key: 0,
            name: e.icon,
            size: "sm",
            "aria-hidden": "true"
          }, null, 8, ["name"])) : ge("", !0),
          ie(n.$slots, "default", {}, () => [
            yt(Ee(e.label), 1)
          ])
        ]),
        _: 3
      }, 16, ["class", "to", "href", "disable", "tag"]);
    };
  }
}), Hp = Op;
function Np(e) {
  return { rootClasses: s(() => ({
    "dss-bar--elevated": e.elevated
  })) };
}
const jp = { name: "DssBar", inheritAttrs: !1 }, Qp = /* @__PURE__ */ me({
  ...jp,
  props: {
    dense: { type: Boolean },
    elevated: { type: Boolean }
  },
  setup(e) {
    const t = e, { rootClasses: a } = Np(t);
    return (n, l) => (F(), Be(R(Sc), Ce(n.$attrs, {
      class: [R(a), "dss-bar"],
      dense: e.dense
    }), {
      default: pe(() => [
        ie(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "dense"]));
  }
}), Up = Qp;
function Kp(e) {
  return { expansionItemClasses: s(
    () => [
      "dss-expansion-item",
      e.dense && "dss-expansion-item--dense",
      e.disable && "dss-expansion-item--disabled",
      e.brand && `dss-expansion-item--brand-${e.brand}`
    ].filter(Boolean)
  ) };
}
const Wp = /* @__PURE__ */ me({
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
    const a = e, n = t, { expansionItemClasses: l } = Kp(a);
    return (o, i) => {
      const r = lt("q-expansion-item");
      return F(), oe("div", Ce({ class: R(l) }, o.$attrs), [
        Tt(r, {
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
        }, Rt({
          default: pe(() => [
            ie(o.$slots, "default")
          ]),
          _: 2
        }, [
          o.$slots.header ? {
            name: "header",
            fn: pe(() => [
              ie(o.$slots, "header")
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["model-value", "default-opened", "group", "disable", "label", "caption", "icon", "expand-icon", "header-aria-label"])
      ], 16);
    };
  }
}), Yp = Wp;
function Xp(e) {
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
const Gp = ["data-brand"], Zp = /* @__PURE__ */ me({
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
    const a = e, n = t, { stepperClasses: l } = Xp(a);
    function o(i) {
      n("update:modelValue", i);
    }
    return (i, r) => {
      const u = lt("q-stepper");
      return F(), oe("div", Ce({
        class: R(l),
        "data-brand": a.brand || void 0
      }, i.$attrs), [
        Tt(u, {
          "model-value": a.modelValue,
          vertical: a.vertical,
          "header-nav": a.headerNav,
          animated: a.animated,
          flat: a.flat,
          bordered: a.bordered,
          "aria-label": a.ariaLabel || void 0,
          "onUpdate:modelValue": o
        }, Rt({
          default: pe(() => [
            ie(i.$slots, "default")
          ]),
          _: 2
        }, [
          i.$slots.message ? {
            name: "message",
            fn: pe(() => [
              ie(i.$slots, "message")
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["model-value", "vertical", "header-nav", "animated", "flat", "bordered", "aria-label"])
      ], 16, Gp);
    };
  }
}), Jp = Zp;
function e1(e) {
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
const t1 = /* @__PURE__ */ me({
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
    const t = e, { stepClasses: a } = e1(t);
    return (n, l) => {
      const o = lt("q-step");
      return F(), Be(o, Ce({
        class: R(a),
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
      }, n.$attrs), Rt({ _: 2 }, [
        n.$slots.default ? {
          name: "default",
          fn: pe(() => [
            ie(n.$slots, "default")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["class", "name", "title", "caption", "icon", "active-icon", "done-icon", "error-icon", "done", "error", "disable", "header-nav"]);
    };
  }
}), a1 = t1;
function n1(e) {
  return { rootClasses: s(() => ({
    "dss-timeline--dense": e.layout === "dense",
    "dss-timeline--comfortable": e.layout === "comfortable" || !e.layout,
    "dss-timeline--loose": e.layout === "loose",
    "dss-timeline--side-left": e.side === "left",
    "dss-timeline--side-right": e.side === "right"
  })) };
}
const l1 = { name: "DssTimeline", inheritAttrs: !1 }, o1 = /* @__PURE__ */ me({
  ...l1,
  props: {
    layout: {},
    side: {},
    dark: { type: Boolean }
  },
  setup(e) {
    const t = e, { rootClasses: a } = n1(t);
    return (n, l) => (F(), Be(R(Gm), Ce(n.$attrs, {
      class: [R(a), "dss-timeline"],
      layout: e.layout,
      side: e.side,
      dark: e.dark
    }), {
      default: pe(() => [
        ie(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "layout", "side", "dark"]));
  }
}), i1 = o1;
function r1(e) {
  return { rootClasses: s(() => ({
    "dss-timeline-entry--heading": e.heading,
    "dss-timeline-entry--side-left": e.side === "left",
    "dss-timeline-entry--side-right": e.side === "right",
    "dss-timeline-entry--has-icon": !!e.icon,
    "dss-timeline-entry--has-avatar": !!e.avatar
  })) };
}
const s1 = { name: "DssTimelineEntry", inheritAttrs: !1 }, u1 = /* @__PURE__ */ me({
  ...s1,
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
    const t = e, a = Ot(), { rootClasses: n } = r1(t);
    return (l, o) => (F(), Be(R(Zm), Ce(l.$attrs, {
      class: [R(n), "dss-timeline-entry"],
      heading: e.heading,
      tag: e.tag,
      side: e.side,
      icon: e.icon,
      avatar: e.avatar,
      title: e.title,
      subtitle: e.subtitle
    }), Rt({
      default: pe(() => [
        ie(l.$slots, "default")
      ]),
      _: 2
    }, [
      R(a).title ? {
        name: "title",
        fn: pe(() => [
          ie(l.$slots, "title")
        ]),
        key: "0"
      } : void 0,
      R(a).subtitle ? {
        name: "subtitle",
        fn: pe(() => [
          ie(l.$slots, "subtitle")
        ]),
        key: "1"
      } : void 0,
      R(a).icon ? {
        name: "icon",
        fn: pe(() => [
          ie(l.$slots, "icon")
        ]),
        key: "2"
      } : void 0
    ]), 1040, ["class", "heading", "tag", "side", "icon", "avatar", "title", "subtitle"]));
  }
}), d1 = u1;
function c1(e) {
  return { rootClasses: s(() => ({
    "dss-virtual-scroll": !0,
    "dss-virtual-scroll--horizontal": e.horizontal === !0,
    "dss-virtual-scroll--loading": e.loading === !0,
    "dss-virtual-scroll--disabled": e.disable === !0,
    "dss-virtual-scroll--table": e.type === "table"
  })) };
}
const f1 = {
  key: 0,
  class: "dss-virtual-scroll__loading",
  role: "status",
  "aria-live": "polite",
  "aria-label": "Carregando itens"
}, v1 = {
  key: 1,
  class: "dss-virtual-scroll__empty",
  role: "status"
}, m1 = /* @__PURE__ */ me({
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
    const a = e, n = t, { rootClasses: l } = c1(a), o = s(() => {
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
    return (c, d) => (F(), oe("div", Ce(c.$attrs, { class: R(l) }), [
      ie(c.$slots, "prepend"),
      e.loading ? (F(), oe("div", f1, [
        ie(c.$slots, "loading", {}, () => [
          d[0] || (d[0] = He("div", {
            class: "dss-virtual-scroll__loading-indicator",
            "aria-hidden": "true"
          }, null, -1))
        ])
      ])) : i.value ? (F(), oe("div", v1, [
        ie(c.$slots, "empty", {}, () => [
          d[1] || (d[1] = He("span", { class: "dss-virtual-scroll__empty-text" }, "Nenhum item para exibir", -1))
        ])
      ])) : (F(), Be(R(Qu), {
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
        default: pe(({ item: v, index: m }) => [
          ie(c.$slots, "default", {
            item: v,
            index: m,
            ariaSetsize: o.value,
            ariaPosinset: m + 1
          })
        ]),
        _: 3
      }, 8, ["items", "virtual-scroll-item-size", "type", "scroll-target", "virtual-scroll-slice-size", "horizontal"])),
      ie(c.$slots, "append")
    ], 16));
  }
}), g1 = m1;
function h1(e, t) {
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
const b1 = {
  key: 0,
  class: "dss-infinite-scroll__no-more",
  role: "status",
  "aria-live": "polite"
}, y1 = {
  class: "dss-infinite-scroll__loading",
  role: "status",
  "aria-live": "polite",
  "aria-label": "Carregando mais itens"
}, p1 = /* @__PURE__ */ me({
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
    const n = e, l = a, o = V(!1), i = V(!1), r = V(null), { rootClasses: u } = h1(n, { isLoading: o, noMore: i });
    function c(d, v) {
      o.value = !0, l("load", d, (g = !1) => {
        o.value = !1, g && (i.value = !0), v(g);
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
    }), (d, v) => (F(), Be(R(fv), Ce({
      ref_key: "innerRef",
      ref: r
    }, d.$attrs, {
      class: R(u),
      offset: e.offset,
      debounce: e.debounce,
      "initial-index": e.initialIndex ?? void 0,
      "scroll-target": e.scrollTarget ?? void 0,
      reverse: e.reverse,
      disable: e.disable,
      onLoad: c
    }), {
      loading: pe(() => [
        He("div", y1, [
          ie(d.$slots, "loading", {}, () => [
            Tt(Yl, {
              class: "dss-infinite-scroll__spinner",
              size: "sm",
              "aria-hidden": "true"
            })
          ])
        ])
      ]),
      default: pe(() => [
        ie(d.$slots, "default"),
        i.value ? (F(), oe("div", b1, [
          ie(d.$slots, "no-more", {}, () => [
            v[0] || (v[0] = He("span", { class: "dss-infinite-scroll__no-more-text" }, " Todos os itens foram carregados ", -1))
          ])
        ])) : ge("", !0)
      ]),
      _: 3
    }, 16, ["class", "offset", "debounce", "initial-index", "scroll-target", "reverse", "disable"]));
  }
}), C1 = p1;
function k1(e) {
  return { rootClasses: s(() => ({
    [`dss-pull-to-refresh--${e.size ?? "md"}`]: !0,
    "dss-pull-to-refresh--disabled": e.disabled
  })) };
}
const S1 = ["aria-busy"], w1 = { name: "DssPullToRefresh", inheritAttrs: !1 }, x1 = /* @__PURE__ */ me({
  ...w1,
  props: {
    disabled: { type: Boolean },
    noMouse: { type: Boolean },
    icon: {},
    size: { default: "md" }
  },
  emits: ["refresh"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, { rootClasses: o } = k1(n), i = V(null), r = V(!1);
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
    }), (c, d) => (F(), Be(R(Fv), Ce({
      ref_key: "qPullToRefreshRef",
      ref: i
    }, c.$attrs, {
      class: [R(o), "dss-pull-to-refresh"],
      color: "primary",
      "no-mouse": e.noMouse,
      disable: e.disabled,
      icon: e.icon,
      onRefresh: u
    }), {
      default: pe(() => [
        He("span", {
          class: "dss-sr-only",
          role: "status",
          "aria-live": "polite",
          "aria-busy": r.value
        }, [
          r.value ? (F(), oe(gn, { key: 0 }, [
            yt("Atualizando conteúdo…")
          ], 64)) : ge("", !0)
        ], 8, S1),
        ie(c.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "no-mouse", "disable", "icon"]));
  }
}), _1 = x1;
function $1(e) {
  return { rootClasses: s(() => ({
    "dss-slide-item--disabled": e.disable
  })) };
}
const q1 = { name: "DssSlideItem", inheritAttrs: !1 }, B1 = /* @__PURE__ */ me({
  ...q1,
  props: {
    disable: { type: Boolean },
    leftColor: {},
    rightColor: {}
  },
  emits: ["action", "slide"],
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, o = Ot(), { rootClasses: i } = $1(n), r = V(null), u = {
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
    ), m = s(() => ({
      "--dss-slide-item-left-bg": n.leftColor ? c[n.leftColor] : "var(--dss-feedback-error)",
      "--dss-slide-item-right-bg": n.rightColor ? c[n.rightColor] : "var(--dss-feedback-info)"
    }));
    return t({
      /** Reseta o item para a posição original programaticamente */
      // QSlideItem.reset() não é tipado publicamente na versão atual do Quasar — cast necessário
      reset: () => {
        var g, h;
        return (h = (g = r.value) == null ? void 0 : g.reset) == null ? void 0 : h.call(g);
      }
    }), (g, h) => (F(), Be(R(Xv), Ce({
      ref_key: "qSlideItemRef",
      ref: r
    }, g.$attrs, {
      class: [R(i), "dss-slide-item"],
      style: m.value,
      "left-color": d.value,
      "right-color": v.value,
      disable: e.disable,
      onAction: h[0] || (h[0] = (p) => l("action", p)),
      onSlide: h[1] || (h[1] = (p) => l("slide", p))
    }), Rt({
      default: pe(() => [
        ie(g.$slots, "default")
      ]),
      _: 2
    }, [
      R(o).left ? {
        name: "left",
        fn: pe((p) => [
          ie(g.$slots, "left", Ya(Xa(p ?? {})))
        ]),
        key: "0"
      } : void 0,
      R(o).right ? {
        name: "right",
        fn: pe((p) => [
          ie(g.$slots, "right", Ya(Xa(p ?? {})))
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["class", "style", "left-color", "right-color", "disable"]));
  }
}), T1 = B1;
function M1() {
  return { rootClasses: s(() => ["dss-parallax"]) };
}
function A1() {
  const e = V(!1);
  let t = null;
  function a(n) {
    e.value = n.matches;
  }
  return ht(() => {
    typeof window < "u" && window.matchMedia && (t = window.matchMedia("(prefers-reduced-motion: reduce)"), e.value = t.matches, t.addEventListener("change", a));
  }), zl(() => {
    t == null || t.removeEventListener("change", a);
  }), { isReducedMotion: e };
}
const D1 = {
  key: 0,
  class: "dss-sr-only"
}, L1 = {
  key: 0,
  class: "dss-sr-only"
}, V1 = /* @__PURE__ */ me({
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
    const t = e, { isReducedMotion: a } = A1(), { rootClasses: n } = M1(), l = s(() => t.decorative ? !1 : !!t.alt), o = s(() => ({
      "background-image": t.src ? `url(${t.src})` : void 0,
      height: `${t.height}px`
    }));
    return (i, r) => R(a) ? (F(), oe("div", Ce({ key: 1 }, i.$attrs, {
      class: [...R(n), "dss-parallax--static"],
      style: o.value
    }), [
      l.value ? (F(), oe("span", L1, Ee(e.alt), 1)) : ge("", !0),
      ie(i.$slots, "default")
    ], 16)) : (F(), Be(R(Pv), Ce({ key: 0 }, i.$attrs, {
      class: R(n),
      src: e.src,
      height: e.height,
      speed: e.speed,
      "scroll-target": e.scrollTarget
    }), {
      default: pe(() => [
        l.value ? (F(), oe("span", D1, Ee(e.alt), 1)) : ge("", !0),
        ie(i.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "src", "height", "speed", "scroll-target"]));
  }
}), z1 = V1;
function P1(e) {
  return { rootClasses: s(() => [
    "dss-video",
    { [`dss-video--radius-${e.radius}`]: e.radius && e.radius !== "none" }
  ]) };
}
const R1 = /* @__PURE__ */ me({
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
    const t = e, a = s(() => t.decorative === !0 ? "" : t.title !== void 0 ? t.title : ""), { rootClasses: n } = P1(t);
    return (l, o) => (F(), Be(R(dg), Ce(l.$attrs, {
      class: R(n),
      src: e.src,
      ratio: e.ratio,
      title: a.value
    }), {
      default: pe(() => [
        ie(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "src", "ratio", "title"]));
  }
}), F1 = R1, E1 = {
  default: "status",
  info: "status",
  success: "status",
  warning: "alert",
  error: "alert"
}, I1 = {
  default: "polite",
  info: "polite",
  success: "polite",
  warning: "assertive",
  error: "assertive"
};
function O1(e) {
  const t = s(() => e.variant ?? "default"), a = s(() => ({
    [`dss-banner--${t.value}`]: !0,
    "dss-banner--dismissible": e.dismissible
  })), n = s(() => E1[t.value]), l = s(() => I1[t.value]);
  return { rootClasses: a, ariaRole: n, ariaLive: l };
}
const Ha = Dd, H1 = { name: "DssBanner", inheritAttrs: !1 }, N1 = /* @__PURE__ */ me({
  ...H1,
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
    const a = e, n = t, l = Ot(), { rootClasses: o, ariaRole: i, ariaLive: r } = O1(a), u = {
      info: "info",
      success: "check_circle",
      warning: "warning",
      error: "error"
    }, c = s(() => a.icon !== void 0 ? a.icon : u[a.variant ?? "default"] ?? ""), d = s(() => !!(c.value || l.avatar)), v = s(() => !!(a.dismissible || l.actions));
    function m() {
      n("dismiss");
    }
    return (g, h) => (F(), Be(R(kc), Ce(g.$attrs, {
      class: [R(o), "dss-banner"],
      dense: e.dense,
      rounded: e.rounded,
      "inline-actions": e.inlineActions,
      role: R(i),
      "aria-live": R(r)
    }), Rt({
      default: pe(() => [
        ie(g.$slots, "default")
      ]),
      _: 2
    }, [
      d.value ? {
        name: "avatar",
        fn: pe(() => [
          ie(g.$slots, "avatar", {}, () => [
            c.value ? (F(), Be(pa, {
              key: 0,
              name: c.value,
              size: "md",
              class: "dss-banner__icon",
              "aria-hidden": "true"
            }, null, 8, ["name"])) : ge("", !0)
          ])
        ]),
        key: "0"
      } : void 0,
      v.value ? {
        name: "action",
        fn: pe(() => [
          ie(g.$slots, "actions", {}, () => [
            e.dismissible ? (F(), Be(Ha, {
              key: 0,
              variant: "flat",
              round: !0,
              icon: "close",
              size: "sm",
              class: "dss-banner__dismiss",
              "aria-label": e.dismissLabel ?? "Fechar",
              onClick: m
            }, null, 8, ["aria-label"])) : ge("", !0)
          ])
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["class", "dense", "rounded", "inline-actions", "role", "aria-live"]));
  }
}), j1 = N1;
function Q1(e) {
  return { dialogClasses: s(() => ({
    "dss-dialog": !0,
    "dss-dialog--maximized": e.maximized,
    "dss-dialog--full-width": e.fullWidth,
    "dss-dialog--full-height": e.fullHeight,
    "dss-dialog--seamless": e.seamless,
    [`dss-dialog--position-${e.position ?? "standard"}`]: !0
  })) };
}
function $i() {
  const e = V(void 0);
  let t = null;
  const a = () => {
    var o, i;
    if (typeof document > "u") return;
    const n = ((o = document.body) == null ? void 0 : o.dataset.brand) || ((i = document.documentElement) == null ? void 0 : i.dataset.brand);
    if (n) {
      e.value = n;
      return;
    }
    const l = document.querySelector("[data-brand]");
    e.value = (l == null ? void 0 : l.dataset.brand) || void 0;
  };
  return ht(() => {
    a(), typeof MutationObserver < "u" && (t = new MutationObserver(a), t.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["data-brand"],
      subtree: !0
    }));
  }), tt(() => {
    t == null || t.disconnect(), t = null;
  }), { effectiveBrand: e };
}
const U1 = ["data-brand"], K1 = {
  key: 0,
  class: "dss-dialog__header"
}, W1 = { class: "dss-dialog__body" }, Y1 = {
  key: 1,
  class: "dss-dialog__footer"
}, X1 = /* @__PURE__ */ me({
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
    const a = e, n = t, l = Ot(), { dialogClasses: o } = Q1(a), { effectiveBrand: i } = $i(), r = s(() => !!l.header), u = s(() => !!l.footer);
    return (c, d) => {
      const v = lt("q-dialog");
      return F(), Be(v, Ce({
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
      }, c.$attrs, {
        "onUpdate:modelValue": d[0] || (d[0] = (m) => n("update:open", m)),
        onShow: d[1] || (d[1] = (m) => n("open")),
        onHide: d[2] || (d[2] = (m) => n("close")),
        onBeforeShow: d[3] || (d[3] = (m) => n("before-open")),
        onBeforeHide: d[4] || (d[4] = (m) => n("before-close"))
      }), {
        default: pe(() => [
          He("div", {
            class: Mt(R(o)),
            "data-brand": R(i)
          }, [
            r.value ? (F(), oe("div", K1, [
              ie(c.$slots, "header")
            ])) : ge("", !0),
            He("div", W1, [
              ie(c.$slots, "default")
            ]),
            u.value ? (F(), oe("div", Y1, [
              ie(c.$slots, "footer")
            ])) : ge("", !0)
          ], 10, U1)
        ]),
        _: 3
      }, 16, ["model-value", "persistent", "seamless", "maximized", "full-width", "full-height", "position", "transition-show", "transition-hide", "no-esc-dismiss", "no-backdrop-dismiss"]);
    };
  }
}), G1 = X1;
function Z1(e) {
  return { tableClasses: s(() => [
    "dss-table",
    e.density === "compact" && "dss-table--compact",
    e.density === "comfortable" && "dss-table--comfortable",
    e.loading && "dss-table--loading"
  ].filter(Boolean)) };
}
const J1 = {
  name: "DssTable",
  inheritAttrs: !1
}, eC = /* @__PURE__ */ me({
  ...J1,
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
    const n = e, l = a, { tableClasses: o } = Z1(n), i = s(() => n.density === "compact"), r = V();
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
      return F(), Be(d, Ce({
        ref_key: "qTableRef",
        ref: r
      }, u.$attrs, {
        class: R(o),
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
        onRowClick: c[4] || (c[4] = (v, m, g) => l("row-click", v, m, g)),
        onRowDblclick: c[5] || (c[5] = (v, m, g) => l("row-dblclick", v, m, g)),
        onRowContextmenu: c[6] || (c[6] = (v, m, g) => l("row-contextmenu", v, m, g))
      }), Rt({ _: 2 }, [
        Ca(u.$slots, (v, m) => ({
          name: m,
          fn: pe((g) => [
            ie(u.$slots, m, Ya(Xa(g || {})))
          ])
        }))
      ]), 1040, ["class", "rows", "columns", "row-key", "title", "loading", "filter", "selection", "selected", "pagination", "dense", "bordered", "flat", "wrap-cells", "separator", "virtual-scroll", "no-data-label", "no-results-label", "hide-bottom", "hide-header", "rows-per-page-options"]);
    };
  }
}), tC = eC;
function aC(e) {
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
const nC = /* @__PURE__ */ me({
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
    const a = e, n = t, { rootClasses: l } = aC(a);
    return (o, i) => (F(), Be(R(uf), Ce(o.$attrs, {
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
      class: [R(l), "dss-carousel"],
      "onUpdate:modelValue": i[0] || (i[0] = (r) => n("update:modelValue", r)),
      onBeforeTransition: i[1] || (i[1] = (r, u) => n("before-transition", r, u)),
      onTransition: i[2] || (i[2] = (r, u) => n("transition", r, u)),
      onFullscreen: i[3] || (i[3] = (r) => n("fullscreen", r))
    }), {
      default: pe(() => [
        ie(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["model-value", "animated", "swipeable", "vertical", "infinite", "autoplay", "height", "padding", "arrows", "prev-icon", "next-icon", "navigation", "navigation-position", "navigation-active-icon", "navigation-icon", "thumbnails", "control-type", "keep-alive", "keep-alive-include", "keep-alive-exclude", "keep-alive-max", "fullscreen", "aria-label", "class"]));
  }
}), lC = nC, oC = /* @__PURE__ */ me({
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
    return (t, a) => (F(), Be(R(df), Ce(t.$attrs, {
      name: e.name,
      disable: e.disable,
      "img-src": e.imgSrc,
      "img-style": e.imgStyle,
      "img-class": e.imgClass,
      role: "group",
      class: "dss-carousel__slide"
    }), {
      default: pe(() => [
        ie(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["name", "disable", "img-src", "img-style", "img-class"]));
  }
}), iC = oC;
function rC(e) {
  return { sheetClasses: s(() => ({
    "dss-bottom-sheet": !0,
    "dss-bottom-sheet--maximized": e.maximized,
    "dss-bottom-sheet--square": e.square
  })) };
}
const sC = ["data-brand"], uC = {
  class: "dss-bottom-sheet__handle-area",
  "aria-hidden": "true"
}, dC = {
  key: 0,
  class: "dss-bottom-sheet__handle"
}, cC = {
  key: 0,
  class: "dss-bottom-sheet__header"
}, fC = { class: "dss-bottom-sheet__body" }, vC = /* @__PURE__ */ me({
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
    const a = e, n = t, l = Ot(), { sheetClasses: o } = rC(a), { effectiveBrand: i } = $i(), r = s(() => !!l.header);
    return (u, c) => {
      const d = lt("q-dialog");
      return F(), Be(d, Ce({
        "model-value": a.open,
        position: "bottom",
        "full-width": "",
        persistent: a.persistent,
        maximized: a.maximized,
        "no-esc-dismiss": a.noEscDismiss,
        "no-backdrop-dismiss": a.noBackdropDismiss,
        "transition-show": a.transitionEnter ?? "slide-up",
        "transition-hide": a.transitionLeave ?? "slide-down"
      }, u.$attrs, {
        "onUpdate:modelValue": c[0] || (c[0] = (v) => n("update:open", v)),
        onShow: c[1] || (c[1] = (v) => n("open")),
        onHide: c[2] || (c[2] = (v) => n("close")),
        onBeforeShow: c[3] || (c[3] = (v) => n("before-open")),
        onBeforeHide: c[4] || (c[4] = (v) => n("before-close"))
      }), {
        default: pe(() => [
          He("div", {
            class: Mt(R(o)),
            "data-brand": R(i)
          }, [
            He("div", uC, [
              ie(u.$slots, "handle", {}, () => [
                a.showHandle ? (F(), oe("div", dC)) : ge("", !0)
              ])
            ]),
            r.value ? (F(), oe("div", cC, [
              ie(u.$slots, "header")
            ])) : ge("", !0),
            He("div", fC, [
              ie(u.$slots, "default")
            ])
          ], 10, sC)
        ]),
        _: 3
      }, 16, ["model-value", "persistent", "maximized", "no-esc-dismiss", "no-backdrop-dismiss", "transition-show", "transition-hide"]);
    };
  }
}), mC = vC;
function gC(e) {
  return { rootClasses: s(() => ({
    "dss-chat-message--mine": e.isMine,
    "dss-chat-message--received": !e.isMine,
    "dss-chat-message--compact": e.compact,
    "dss-chat-message--selected": e.selected,
    "dss-chat-message--disable": e.disable,
    [`dss-chat-message--status-${e.status}`]: !!e.status
  })) };
}
const hC = ["aria-label"], bC = {
  key: 0,
  class: "dss-chat-message__avatar-area",
  "aria-hidden": "true"
}, yC = ["src", "alt"], pC = {
  key: 1,
  "aria-hidden": "true"
}, CC = { class: "dss-chat-message__main" }, kC = {
  key: 0,
  class: "dss-chat-message__sender-name"
}, SC = { class: "dss-chat-message__bubble" }, wC = { class: "dss-chat-message__content" }, xC = {
  key: 0,
  class: "dss-chat-message__text"
}, _C = {
  key: 0,
  class: "dss-chat-message__meta",
  "aria-hidden": "true"
}, $C = ["datetime"], qC = {
  key: 1,
  class: "dss-chat-message__actions"
}, BC = {
  key: 1,
  class: "dss-chat-message__avatar-area dss-chat-message__avatar-area--mine",
  "aria-hidden": "true"
}, TC = ["src", "alt"], MC = {
  key: 1,
  "aria-hidden": "true"
}, AC = /* @__PURE__ */ me({
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
    const a = e, n = t, l = Ot(), { rootClasses: o } = gC(a), i = {
      sending: "schedule",
      sent: "done",
      delivered: "done_all",
      read: "done_all",
      error: "error_outline"
    }, r = s(
      () => a.status ? i[a.status] ?? null : null
    ), u = s(() => a.senderName ? a.senderName.split(" ").slice(0, 2).map((p) => {
      var C;
      return ((C = p[0]) == null ? void 0 : C.toUpperCase()) ?? "";
    }).join("") : "?"), c = s(() => {
      const p = [];
      if (a.senderName ? p.push(`Mensagem de ${a.senderName}`) : a.isMine ? p.push("Mensagem enviada") : p.push("Mensagem recebida"), a.timestamp && p.push(`em ${a.timestamp}`), a.status) {
        const C = {
          sending: "enviando",
          sent: "enviada",
          delivered: "entregue",
          read: "lida",
          error: "erro no envio"
        };
        p.push(`status: ${C[a.status] ?? a.status}`);
      }
      return p.join(", ");
    });
    let d = null, v = null;
    const m = (p) => {
      a.disable || (v = p, d = setTimeout(() => {
        v && n("long-press", v);
      }, 500));
    }, g = () => {
      d && (clearTimeout(d), d = null), v = null;
    };
    tt(() => {
      g();
    });
    const h = (p) => {
      a.disable || n("click", p);
    };
    return (p, C) => (F(), oe("article", Ce(p.$attrs, {
      class: [R(o), "dss-chat-message"],
      "aria-label": c.value,
      role: "listitem",
      onClick: h,
      onPointerdown: m,
      onPointerup: g,
      onPointermove: g,
      onPointercancel: g
    }), [
      !e.isMine && e.showAvatar ? (F(), oe("div", bC, [
        ie(p.$slots, "avatar", {}, () => [
          Tt(Qo, {
            size: e.compact ? "sm" : "md",
            class: "dss-chat-message__avatar"
          }, {
            default: pe(() => [
              e.avatarSrc ? (F(), oe("img", {
                key: 0,
                src: e.avatarSrc,
                alt: e.senderName ?? "",
                class: "dss-chat-message__avatar-img"
              }, null, 8, yC)) : (F(), oe("span", pC, Ee(u.value), 1))
            ]),
            _: 1
          }, 8, ["size"])
        ])
      ])) : ge("", !0),
      He("div", CC, [
        !e.isMine && (e.senderName || R(l)["sender-name"]) ? (F(), oe("div", kC, [
          ie(p.$slots, "sender-name", {}, () => [
            yt(Ee(e.senderName), 1)
          ])
        ])) : ge("", !0),
        He("div", SC, [
          He("div", wC, [
            ie(p.$slots, "default", {}, () => [
              e.message ? (F(), oe("p", xC, Ee(e.message), 1)) : ge("", !0)
            ])
          ]),
          e.timestamp || e.status ? (F(), oe("div", _C, [
            e.timestamp ? (F(), oe("time", {
              key: 0,
              class: "dss-chat-message__timestamp",
              datetime: e.datetimeValue
            }, Ee(e.timestamp), 9, $C)) : ge("", !0),
            e.status && r.value ? (F(), oe("span", {
              key: 1,
              class: Mt(`dss-chat-message__status dss-chat-message__status--${e.status}`)
            }, [
              Tt(pa, {
                name: r.value,
                size: "xs",
                decorative: ""
              }, null, 8, ["name"])
            ], 2)) : ge("", !0)
          ])) : ge("", !0)
        ]),
        R(l).actions ? (F(), oe("div", qC, [
          ie(p.$slots, "actions")
        ])) : ge("", !0)
      ]),
      e.isMine && e.showAvatar ? (F(), oe("div", BC, [
        ie(p.$slots, "avatar", {}, () => [
          e.avatarSrc || e.senderName ? (F(), Be(Qo, {
            key: 0,
            size: e.compact ? "sm" : "md",
            class: "dss-chat-message__avatar"
          }, {
            default: pe(() => [
              e.avatarSrc ? (F(), oe("img", {
                key: 0,
                src: e.avatarSrc,
                alt: e.senderName ?? "",
                class: "dss-chat-message__avatar-img"
              }, null, 8, TC)) : (F(), oe("span", MC, Ee(u.value), 1))
            ]),
            _: 1
          }, 8, ["size"])) : ge("", !0)
        ])
      ])) : ge("", !0)
    ], 16, hC));
  }
}), DC = AC;
function LC(e) {
  return { colorPickerClasses: s(() => ({
    "dss-color-picker": !0
  })) };
}
const VC = /* @__PURE__ */ me({
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
    const a = e, n = t, { colorPickerClasses: l } = LC();
    return (o, i) => (F(), Be(R(qf), Ce(o.$attrs, {
      class: R(l),
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
}), zC = VC;
function PC(e) {
  return { datePickerClasses: s(() => ({
    "dss-date-picker": !0
  })) };
}
const RC = /* @__PURE__ */ me({
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
    const a = e, n = t, { datePickerClasses: l } = PC();
    return (o, i) => (F(), Be(R(Ef), Ce(o.$attrs, {
      class: R(l),
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
    }), Rt({ _: 2 }, [
      o.$slots.default ? {
        name: "default",
        fn: pe(() => [
          ie(o.$slots, "default")
        ]),
        key: "0"
      } : void 0
    ]), 1040, ["class", "model-value", "multiple", "range", "mask", "locale", "calendar", "landscape", "minimal", "today-btn", "emit-immediately", "default-view", "default-year-month", "years-in-month-view", "options", "events", "event-color", "navigation-min-year-month", "navigation-max-year-month", "no-unset", "first-day-of-week", "title", "subtitle", "name", "tabindex", "disable", "readonly"]));
  }
}), FC = RC;
function EC(e) {
  return { timePickerClasses: s(() => ({
    "dss-time-picker": !0
  })) };
}
const IC = /* @__PURE__ */ me({
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
    const a = e, n = t, { timePickerClasses: l } = EC();
    return (o, i) => (F(), Be(R(Xm), Ce(o.$attrs, {
      class: R(l),
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
    }), Rt({ _: 2 }, [
      o.$slots.default ? {
        name: "default",
        fn: pe(() => [
          ie(o.$slots, "default")
        ]),
        key: "0"
      } : void 0
    ]), 1040, ["class", "model-value", "landscape", "mask", "locale", "format24h", "default-view", "options", "hour-options", "minute-options", "second-options", "with-seconds", "now-btn", "minimal", "readonly", "disable", "name", "tabindex"]));
  }
}), OC = IC;
function HC(e) {
  return { formClasses: s(() => ({
    "dss-form": !0
  })) };
}
const NC = /* @__PURE__ */ me({
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
    const n = e, l = a, o = V(null), { formClasses: i } = HC();
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
      return F(), Be(c, Ce({
        ref_key: "qFormRef",
        ref: o,
        class: R(i),
        autofocus: n.autofocus,
        greedy: n.greedy,
        "no-error-focus": n.noErrorFocus
      }, r.$attrs, {
        onSubmit: u[0] || (u[0] = (d) => l("submit", d)),
        onReset: u[1] || (u[1] = (d) => l("reset", d)),
        onValidationError: u[2] || (u[2] = (d, v, m) => l("validationError", d, v, m)),
        onValidationSuccess: u[3] || (u[3] = (d) => l("validationSuccess"))
      }), {
        default: pe(() => [
          ie(r.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "autofocus", "greedy", "no-error-focus"]);
    };
  }
}), jC = NC, QC = /* @__PURE__ */ me({
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
    const n = e, l = a, o = V(null), { effectiveBrand: i } = $i();
    return t({
      set: () => {
        var r;
        return (r = o.value) == null ? void 0 : r.set();
      },
      cancel: () => {
        var r;
        return (r = o.value) == null ? void 0 : r.cancel();
      }
    }), (r, u) => {
      const c = lt("q-popup-edit");
      return F(), Be(c, Ce({
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
        disable: n.disable,
        "data-brand": R(i)
      }, r.$attrs, {
        "onUpdate:modelValue": u[0] || (u[0] = (d) => l("update:modelValue", d)),
        onSave: u[1] || (u[1] = (d, v) => l("save", d, v)),
        onCancel: u[2] || (u[2] = (d) => l("cancel")),
        onShow: u[3] || (u[3] = (d) => l("show")),
        onHide: u[4] || (u[4] = (d) => l("hide")),
        onBeforeShow: u[5] || (u[5] = (d) => l("before-show")),
        onBeforeHide: u[6] || (u[6] = (d) => l("before-hide")),
        ref_key: "popupEditRef",
        ref: o
      }), {
        default: pe(() => [
          ie(r.$slots, "default")
        ]),
        _: 3
      }, 16, ["model-value", "title", "buttons", "label-set", "label-cancel", "persistent", "fit", "cover", "anchor", "self", "offset", "max-height", "max-width", "auto-save", "validate", "touch-position", "disable", "data-brand"]);
    };
  }
}), UC = QC;
function KC(e) {
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
const WC = ["data-brand"], YC = ["aria-label"], XC = {
  key: 4,
  class: "dss-uploader__progress-info",
  "aria-hidden": "true"
}, GC = ["aria-label"], ZC = { class: "dss-uploader__dropzone-text" }, JC = { class: "dss-uploader__dropzone-hint" }, ek = ["aria-label"], tk = { class: "dss-uploader__file-info" }, ak = { class: "dss-uploader__file-name" }, nk = { class: "dss-uploader__file-meta" }, lk = {
  class: "dss-uploader__sr-status",
  role: "status",
  "aria-live": "polite",
  "aria-atomic": "true"
}, ok = /* @__PURE__ */ me({
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
    const n = e, l = a, o = V(null), { rootClasses: i } = KC(n), r = V("");
    function u(C) {
      r.value = "", requestAnimationFrame(() => {
        r.value = C;
      });
    }
    function c(C) {
      u(
        C.length === 1 ? `Arquivo "${C[0].name}" adicionado à fila` : `${C.length} arquivos adicionados à fila`
      ), l("added", C);
    }
    function d(C) {
      u(
        C.length === 1 ? `Arquivo "${C[0].name}" removido` : `${C.length} arquivos removidos`
      ), l("removed", C);
    }
    function v(C) {
      u(
        C.length === 1 ? `Arquivo "${C[0].file.name}" rejeitado` : `${C.length} arquivos rejeitados`
      ), l("rejected", C);
    }
    function m(C) {
      u("Upload iniciado"), l("uploading", C);
    }
    function g(C) {
      u("Upload concluído com sucesso"), l("uploaded", C);
    }
    function h(C) {
      u("Falha no upload. Verifique o arquivo e tente novamente."), l("failed", C);
    }
    function p(C) {
      const k = C.type;
      return k.startsWith("image/") ? "image" : k.startsWith("video/") ? "videocam" : k.startsWith("audio/") ? "audiotrack" : k === "application/pdf" ? "picture_as_pdf" : k.includes("spreadsheet") || k.includes("excel") ? "table_chart" : k.includes("document") || k.includes("word") ? "description" : k.includes("zip") || k.includes("compressed") || k.includes("archive") ? "folder_zip" : k.includes("presentation") || k.includes("powerpoint") ? "slideshow" : "insert_drive_file";
    }
    return t({
      upload: () => {
        var C;
        return (C = o.value) == null ? void 0 : C.upload();
      },
      abort: () => {
        var C;
        return (C = o.value) == null ? void 0 : C.abort();
      },
      reset: () => {
        var C;
        return (C = o.value) == null ? void 0 : C.reset();
      },
      pickFiles: () => {
        var C, k;
        return (k = (C = o.value) == null ? void 0 : C.pickFiles) == null ? void 0 : k.call(C);
      }
    }), (C, k) => (F(), oe("div", Ce(C.$attrs, {
      class: R(i),
      "data-brand": e.brand ?? void 0
    }), [
      Tt(R(ug), {
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
        onUploading: m,
        onUploaded: g,
        onFailed: h
      }, {
        header: pe((y) => [
          He("div", {
            class: "dss-uploader__header",
            role: "toolbar",
            "aria-label": `Ações de upload${y.files.length > 0 ? ` — ${y.files.length} arquivo(s)` : ""}`
          }, [
            y.canAddFiles && !e.readonly ? (F(), Be(Ha, {
              key: 0,
              variant: "outline",
              color: "primary",
              size: "sm",
              icon: "add",
              dense: "",
              "no-caps": "",
              disabled: e.disable,
              "aria-label": e.addAriaLabel,
              onClick: (b) => y.addFiles()
            }, {
              default: pe(() => [...k[0] || (k[0] = [
                yt(" Adicionar ", -1)
              ])]),
              _: 1
            }, 8, ["disabled", "aria-label", "onClick"])) : ge("", !0),
            !e.autoUpload && y.canUpload && !y.isUploading && !e.readonly ? (F(), Be(Ha, {
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
              onClick: (b) => y.upload()
            }, {
              default: pe(() => [...k[1] || (k[1] = [
                yt(" Upload ", -1)
              ])]),
              _: 1
            }, 8, ["disabled", "loading", "aria-label", "onClick"])) : ge("", !0),
            y.isUploading ? (F(), Be(Ha, {
              key: 2,
              variant: "flat",
              color: "negative",
              size: "sm",
              icon: "stop",
              dense: "",
              "no-caps": "",
              "aria-label": e.abortAriaLabel,
              onClick: (b) => y.abort()
            }, {
              default: pe(() => [...k[2] || (k[2] = [
                yt(" Cancelar ", -1)
              ])]),
              _: 1
            }, 8, ["aria-label", "onClick"])) : ge("", !0),
            y.files.length > 0 && !y.isUploading && !e.readonly ? (F(), Be(Ha, {
              key: 3,
              variant: "flat",
              size: "sm",
              icon: "delete_sweep",
              dense: "",
              "no-caps": "",
              disabled: e.disable,
              "aria-label": e.clearAriaLabel,
              onClick: (b) => y.reset()
            }, {
              default: pe(() => [...k[3] || (k[3] = [
                yt(" Limpar ", -1)
              ])]),
              _: 1
            }, 8, ["disabled", "aria-label", "onClick"])) : ge("", !0),
            y.isUploading ? (F(), oe("span", XC, Ee(y.uploadProgressLabel), 1)) : ge("", !0)
          ], 8, YC)
        ]),
        list: pe((y) => [
          y.files.length === 0 ? (F(), oe("div", {
            key: 0,
            class: "dss-uploader__dropzone",
            "aria-label": e.label || "Arraste arquivos aqui ou clique em Adicionar"
          }, [
            Tt(pa, {
              name: "cloud_upload",
              size: "lg",
              decorative: !0
            }),
            He("p", ZC, Ee(e.label || "Arraste arquivos aqui ou clique em Adicionar"), 1),
            He("p", JC, Ee(e.accept ? `Tipos aceitos: ${e.accept}` : "Todos os tipos de arquivo são aceitos"), 1)
          ], 8, GC)) : (F(), oe("ul", {
            key: 1,
            class: "dss-uploader__list",
            role: "list",
            "aria-label": `Fila de upload — ${y.files.length} arquivo(s)`
          }, [
            (F(!0), oe(gn, null, Ca(y.files, (b) => (F(), oe("li", {
              key: b.__key,
              class: Mt(["dss-uploader__file-item", {
                "dss-uploader__file-item--uploading": b.__status === "uploading",
                "dss-uploader__file-item--uploaded": b.__status === "uploaded",
                "dss-uploader__file-item--failed": b.__status === "failed"
              }])
            }, [
              Tt(pa, {
                name: p(b),
                size: "sm",
                decorative: !0,
                class: "dss-uploader__file-icon"
              }, null, 8, ["name"]),
              He("div", tk, [
                He("span", ak, Ee(b.name), 1),
                He("span", nk, Ee(b.__sizeLabel), 1)
              ]),
              b.__status === "uploading" ? (F(), Be(gd, {
                key: 0,
                value: b.__progress,
                size: "xs",
                class: "dss-uploader__file-progress",
                "aria-label": `Progresso de ${b.name}: ${b.__progressLabel}`
              }, null, 8, ["value", "aria-label"])) : b.__status === "uploaded" ? (F(), Be(pa, {
                key: 1,
                name: "check_circle",
                size: "sm",
                class: "dss-uploader__status-icon dss-uploader__status-icon--success",
                decorative: !1,
                "aria-label": `${b.name}: upload concluído`
              }, null, 8, ["aria-label"])) : b.__status === "failed" ? (F(), Be(pa, {
                key: 2,
                name: "error",
                size: "sm",
                class: "dss-uploader__status-icon dss-uploader__status-icon--error",
                decorative: !1,
                "aria-label": `${b.name}: falha no upload`
              }, null, 8, ["aria-label"])) : ge("", !0),
              b.__status !== "uploading" && !e.disable && !e.readonly ? (F(), Be(Ha, {
                key: 3,
                variant: "flat",
                size: "xs",
                icon: "close",
                round: "",
                dense: "",
                "aria-label": `Remover ${b.name} da fila`,
                onClick: (w) => b.__status === "uploaded" ? y.removeUploadedFile(b) : y.removeQueuedFile(b)
              }, null, 8, ["aria-label", "onClick"])) : ge("", !0)
            ], 2))), 128))
          ], 8, ek)),
          He("div", lk, Ee(r.value), 1)
        ]),
        _: 1
      }, 8, ["url", "method", "headers", "form-fields", "with-credentials", "send-raw", "factory", "multiple", "accept", "max-files", "max-file-size", "max-total-size", "auto-upload", "batch", "disable"])
    ], 16, WC));
  }
}), ik = ok, rk = $h, sk = nb, uk = q0, dk = V0, ck = W0, fk = Vy, vk = Hy, mk = jy, gk = Uy, Jr = [
  // Controles interativos
  Ha,
  vd,
  ns,
  md,
  Gg,
  lh,
  rh,
  dh,
  gh,
  Ch,
  xh,
  rk,
  Mh,
  Lh,
  Ph,
  Ih,
  // Inputs e formulários
  sk,
  sb,
  Sb,
  Ib,
  // Exibição de dados
  Gb,
  t0,
  Qo,
  pa,
  C0,
  uk,
  T0,
  A0,
  dk,
  N0,
  U0,
  ck,
  Z0,
  ay,
  // Feedback e progresso
  gd,
  uy,
  Yl,
  gy,
  py,
  Sy,
  $y,
  Ty,
  Dy,
  // Layout e estrutura
  fk,
  Ry,
  Iy,
  vk,
  mk,
  gk,
  Yy,
  Zy,
  tp,
  lp,
  rp,
  dp,
  mp,
  bp,
  Cp,
  // Navegação
  xp,
  qp,
  Mp,
  Lp,
  Pp,
  Ep,
  Hp,
  Up,
  Yp,
  // Stepper
  Jp,
  a1,
  // Timeline
  i1,
  d1,
  // Avançados
  g1,
  C1,
  _1,
  T1,
  z1,
  F1,
  j1,
  // Compostos
  G1,
  tC,
  lC,
  iC,
  mC,
  DC,
  zC,
  FC,
  OC,
  jC,
  UC,
  ik
], bk = {
  install(e, t = {}) {
    Jr.forEach((a) => {
      a && a.name && e.component(a.name, a);
    }), t.brand && e.provide("dss-default-brand", t.brand), t.theme && e.provide("dss-default-theme", t.theme), process.env.NODE_ENV !== "production" && console.log(`✅ Design System Sansys instalado (${Jr.length} componentes)`);
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
const yk = "2.2.0", pk = {
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
  Sy as DssAjaxBar,
  Qo as DssAvatar,
  t0 as DssBadge,
  j1 as DssBanner,
  Up as DssBar,
  mC as DssBottomSheet,
  Ep as DssBreadcrumbs,
  Hp as DssBreadcrumbsEl,
  Mh as DssBtnDropdown,
  xh as DssBtnGroup,
  $h as DssBtnToggle,
  Dd as DssButton,
  q0 as DssCard,
  A0 as DssCardActions,
  T0 as DssCardSection,
  lC as DssCarousel,
  iC as DssCarouselSlide,
  DC as DssChatMessage,
  Id as DssCheckbox,
  Gb as DssChip,
  uy as DssCircularProgress,
  zC as DssColorPicker,
  FC as DssDatePicker,
  G1 as DssDialog,
  Uy as DssDrawer,
  Yp as DssExpansionItem,
  Lh as DssFab,
  Ph as DssFabAction,
  Sb as DssField,
  Ib as DssFile,
  jy as DssFooter,
  jC as DssForm,
  Hy as DssHeader,
  pa as DssIcon,
  C0 as DssImg,
  C1 as DssInfiniteScroll,
  py as DssInnerLoading,
  nb as DssInput,
  N0 as DssItem,
  U0 as DssItemLabel,
  W0 as DssItemSection,
  dh as DssKnob,
  Vy as DssLayout,
  gd as DssLinearProgress,
  V0 as DssList,
  Z0 as DssMarkupTable,
  Ty as DssMenu,
  Ch as DssOptionGroup,
  Ry as DssPage,
  Iy as DssPageContainer,
  bp as DssPageScroller,
  Cp as DssPageSticky,
  Ih as DssPagination,
  z1 as DssParallax,
  UC as DssPopupEdit,
  Dy as DssPopupProxy,
  _1 as DssPullToRefresh,
  ns as DssRadio,
  Gg as DssRange,
  rh as DssRating,
  mp as DssResponsive,
  Pp as DssRouteTab,
  rp as DssScrollArea,
  gh as DssSelect,
  tp as DssSeparator,
  gy as DssSkeleton,
  T1 as DssSlideItem,
  lh as DssSlider,
  lp as DssSpace,
  Yl as DssSpinner,
  dp as DssSplitter,
  a1 as DssStep,
  Jp as DssStepper,
  qp as DssTab,
  Mp as DssTabPanel,
  Lp as DssTabPanels,
  tC as DssTable,
  xp as DssTabs,
  sb as DssTextarea,
  OC as DssTimePicker,
  i1 as DssTimeline,
  d1 as DssTimelineEntry,
  Jd as DssToggle,
  Yy as DssToolbar,
  Zy as DssToolbarTitle,
  $y as DssTooltip,
  ay as DssTree,
  ik as DssUploader,
  F1 as DssVideo,
  g1 as DssVirtualScroll,
  bk as default,
  pk as metadata,
  yk as version
};
//# sourceMappingURL=dss.es.js.map
