import { computed as v, createBlock as m, openBlock as p, unref as f, onMounted as E, onBeforeUnmount as S, createCommentVNode as O, withCtx as y, renderSlot as g, normalizeProps as $, guardReactiveProps as C, resolveDynamicComponent as k, toRefs as x, createElementBlock as R, Fragment as B, createTextVNode as M, toDisplayString as _, createElementVNode as d, normalizeStyle as N, createVNode as P, reactive as F, markRaw as w } from "vue";
import { useRouter as b, RouterView as V } from "vue-router";
const H = {
  __name: "MainRouterView",
  setup(n) {
    const s = b(), e = () => t.baseRoute || s.currentRoute.value, o = v(() => {
      if (t.isOpen && t.baseRoute) {
        const u = t.baseRoute, a = [...u.matched].filter(
          (i) => {
            var r;
            return ((r = i.meta) == null ? void 0 : r.overlay) !== !0;
          }
        );
        return {
          ...u,
          matched: a
        };
      }
      return e();
    }), l = v(() => o.value.fullPath);
    return (u, a) => (p(), m(f(V), {
      key: l.value,
      route: o.value
    }, null, 8, ["route"]));
  }
}, z = (n) => n.filter((s) => {
  var e;
  return ((e = s.meta) == null ? void 0 : e.overlay) === !0;
}), D = {
  __name: "OverlayRouterView",
  props: {
    // Function to filter routes - receives matched routes array and returns filtered array
    filterMatchedRoutes: {
      type: Function,
      default: z
    }
  },
  setup(n) {
    const s = b(), e = v(() => t.isOpen), o = n, l = v(() => {
      if (!t.overlayRoute) return null;
      const i = o.filterMatchedRoutes([...t.overlayRoute.matched]);
      return {
        ...t.overlayRoute,
        matched: i
      };
    });
    function u(i) {
      i.key === "Escape" && e.value && a();
    }
    const a = () => {
      console.log("closing drawer"), t.baseRoute && s.push(t.baseRoute);
    };
    return E(() => {
      window.addEventListener("keydown", u);
    }), S(() => {
      window.removeEventListener("keydown", u);
    }), (i, r) => l.value ? (p(), m(f(V), {
      key: 0,
      route: l.value
    }, {
      default: y((c) => [
        g(i.$slots, "default", $(C({ ...c, isOpen: e.value, closeOverlay: a })), () => [
          (p(), m(k(c.Component), {
            "close-overlay": a,
            "is-open": e.value
          }, null, 8, ["is-open"]))
        ])
      ]),
      _: 3
    }, 8, ["route"])) : O("", !0);
  }
}, A = (n, s) => {
  const e = n.__vccOpts || n;
  for (const [o, l] of s)
    e[o] = l;
  return e;
}, I = {
  key: 0,
  class: "drawer-container"
}, K = { class: "drawer-header" }, L = { class: "drawer-content" }, T = {
  __name: "Drawer",
  props: {
    width: {
      type: String,
      default: "400px"
    },
    position: {
      type: String,
      default: "right"
      // 'right' or 'left'
    },
    isOpen: { type: Boolean, default: !1 }
  },
  emits: ["hide"],
  setup(n, { emit: s }) {
    const e = n, { isOpen: o } = x(e), l = s;
    function u() {
      setTimeout(() => {
        console.log("hiding"), l("hide");
      }, 0);
    }
    const a = v(() => ({
      width: e.width,
      [e.position]: o.value ? "0" : `-${e.width}`
    }));
    return (i, r) => {
      var c;
      return p(), R(B, null, [
        M(_(f(o) ? "yes" : "no") + " ", 1),
        f(o) ? (p(), R("div", I, [
          d("div", {
            class: "drawer-backdrop",
            onClick: u
          }),
          d("div", {
            class: "drawer",
            style: N(a.value)
          }, [
            d("div", K, [
              d("div", null, [
                d("span", null, _(((c = f(t).overlayRoute.meta) == null ? void 0 : c.title) ?? ""), 1)
              ]),
              d("button", {
                class: "drawer-close",
                onClick: u
              }, "×")
            ]),
            d("div", L, [
              r[0] || (r[0] = d("div", null, "asdasdsa", -1)),
              g(i.$slots, "default", {}, void 0, !0)
            ])
          ], 4)
        ])) : O("", !0)
      ], 64);
    };
  }
}, U = /* @__PURE__ */ A(T, [["__scopeId", "data-v-3aad5920"]]), W = {
  __name: "DrawerRouterView",
  setup(n) {
    return (s, e) => (p(), m(D, null, {
      default: y(({ isOpen: o, Component: l, closeOverlay: u }) => [
        P(U, {
          "is-open": o,
          onHide: u
        }, {
          default: y(() => [
            (p(), m(k(l)))
          ]),
          _: 2
        }, 1032, ["is-open", "onHide"])
      ]),
      _: 1
    }));
  }
}, t = F({
  isOpen: !1,
  baseRoute: null,
  overlayRoute: null
});
function J() {
  const n = /* @__PURE__ */ new Set();
  let s = null;
  return {
    install(e, { router: o }) {
      e.component("MainRouterView", H), e.component("OverlayRouterView", D), e.component("DrawerRouterView", W);
      const l = (a, i = "") => {
        a.forEach((r) => {
          var h;
          const c = i + (r.path.startsWith("/") ? r.path : `/${r.path}`);
          (h = r.meta) != null && h.overlay && n.add(r.name || c), r.children && l(r.children, c);
        });
      };
      l(o.getRoutes());
      const u = (a) => a.name === void 0 && a.matched.length === 0;
      o.beforeEach((a, i, r) => {
        if (j(a, n)) {
          if (u(i)) {
            s = a.fullPath, r({ path: "/", replace: !0 });
            return;
          }
          t.isOpen || (t.baseRoute = w(i), t.isOpen = !0), t.overlayRoute = w(a), r();
        } else
          t.isOpen ? t.isOpen = !1 : (t.overlayRoute = null, t.baseRoute = null), r();
      }), o.afterEach(() => {
        s && (o.push(s), s = null);
      }), e.provide("overlayRouter", {
        state: t,
        isOverlayRoute: (a) => n.has(a),
        isOverlayActive: () => t.isOpen
      });
    }
  };
}
function j(n, s) {
  var e;
  return !!((e = n.meta) != null && e.overlay || n.name && s.has(n.name) || n.matched && n.matched.some((o) => {
    var l;
    return (l = o.meta) == null ? void 0 : l.overlay;
  }));
}
export {
  J as default
};
