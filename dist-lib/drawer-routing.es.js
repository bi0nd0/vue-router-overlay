import { computed as f, createBlock as m, openBlock as p, unref as v, onMounted as E, onBeforeUnmount as S, createCommentVNode as g, withCtx as y, renderSlot as b, normalizeProps as $, guardReactiveProps as C, resolveDynamicComponent as k, toRefs as x, createElementBlock as _, Fragment as B, createTextVNode as M, toDisplayString as w, createElementVNode as d, normalizeStyle as N, createVNode as P, reactive as F, markRaw as O } from "vue";
import { useRouter as R, RouterView as V } from "vue-router";
const H = {
  __name: "MainRouterView",
  setup(o) {
    const s = R(), e = () => t.baseRoute || s.currentRoute.value, n = f(() => {
      if (t.isOpen && t.baseRoute) {
        const i = t.baseRoute, a = [...i.matched].filter(
          (u) => {
            var r;
            return ((r = u.meta) == null ? void 0 : r.overlay) !== !0;
          }
        );
        return {
          ...i,
          matched: a
        };
      }
      return e();
    }), l = f(() => n.value.fullPath);
    return (i, a) => (p(), m(v(V), {
      key: l.value,
      route: n.value
    }, null, 8, ["route"]));
  }
}, z = (o) => o.filter((s) => {
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
  setup(o) {
    const s = R(), e = f(() => t.isOpen), n = o, l = f(() => {
      if (!t.overlayRoute) return null;
      const u = n.filterMatchedRoutes([...t.overlayRoute.matched]);
      return {
        ...t.overlayRoute,
        matched: u
      };
    });
    function i(u) {
      u.key === "Escape" && e.value && a();
    }
    const a = () => {
      console.log("closing drawer"), t.baseRoute && s.push(t.baseRoute);
    };
    return E(() => {
      window.addEventListener("keydown", i);
    }), S(() => {
      window.removeEventListener("keydown", i);
    }), (u, r) => l.value ? (p(), m(v(V), {
      key: 0,
      route: l.value
    }, {
      default: y((c) => [
        b(u.$slots, "default", $(C({ ...c, isOpen: e.value, closeOverlay: a })), () => [
          (p(), m(k(c.Component), {
            "close-overlay": a,
            "is-open": e.value
          }, null, 8, ["is-open"]))
        ])
      ]),
      _: 3
    }, 8, ["route"])) : g("", !0);
  }
}, A = (o, s) => {
  const e = o.__vccOpts || o;
  for (const [n, l] of s)
    e[n] = l;
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
  setup(o, { emit: s }) {
    const e = o, { isOpen: n } = x(e), l = s;
    function i() {
      setTimeout(() => {
        console.log("hiding"), l("hide");
      }, 0);
    }
    const a = f(() => ({
      width: e.width,
      [e.position]: n.value ? "0" : `-${e.width}`
    }));
    return (u, r) => {
      var c;
      return p(), _(B, null, [
        M(w(v(n) ? "yes" : "no") + " ", 1),
        v(n) ? (p(), _("div", I, [
          d("div", {
            class: "drawer-backdrop",
            onClick: i
          }),
          d("div", {
            class: "drawer",
            style: N(a.value)
          }, [
            d("div", K, [
              d("div", null, [
                d("span", null, w(((c = v(t).overlayRoute.meta) == null ? void 0 : c.title) ?? ""), 1)
              ]),
              d("button", {
                class: "drawer-close",
                onClick: i
              }, "×")
            ]),
            d("div", L, [
              r[0] || (r[0] = d("div", null, "asdasdsa", -1)),
              b(u.$slots, "default", {}, void 0, !0)
            ])
          ], 4)
        ])) : g("", !0)
      ], 64);
    };
  }
}, U = /* @__PURE__ */ A(T, [["__scopeId", "data-v-3aad5920"]]), W = {
  __name: "DrawerRouterView",
  setup(o) {
    return (s, e) => (p(), m(D, null, {
      default: y(({ isOpen: n, Component: l, closeOverlay: i }) => [
        P(U, {
          "is-open": n,
          onHide: i
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
  const o = /* @__PURE__ */ new Set();
  let s = null;
  return {
    install(e, { router: n }) {
      e.component("MainRouterView", H), e.component("OverlayRouterView", D), e.component("DrawerRouterView", W);
      const l = (a, u = "") => {
        a.forEach((r) => {
          var h;
          const c = u + (r.path.startsWith("/") ? r.path : `/${r.path}`);
          (h = r.meta) != null && h.overlay && o.add(r.name || c), r.children && l(r.children, c);
        });
      };
      l(n.getRoutes());
      const i = (a) => a.name === void 0 && a.matched.length === 0;
      n.beforeEach((a, u, r) => {
        if (j(a, o)) {
          if (i(u)) {
            s = a.fullPath, r({ path: "/", replace: !0 });
            return;
          }
          t.isOpen || (t.baseRoute = O(u), t.isOpen = !0), t.overlayRoute = O(a), r();
        } else
          t.isOpen ? t.isOpen = !1 : (t.overlayRoute = null, t.baseRoute = null), r();
      }), n.afterEach(() => {
        s && (n.push(s), s = null);
      }), e.provide("overlayRouter", {
        state: t,
        isOverlayRoute: (a) => o.has(a),
        isOverlayActive: () => t.isOpen
      });
    }
  };
}
function j(o, s) {
  var e;
  return !!((e = o.meta) != null && e.overlay || o.name && s.has(o.name) || o.matched && o.matched.some((n) => {
    var l;
    return (l = n.meta) == null ? void 0 : l.overlay;
  }));
}
function Q() {
  const o = R();
  return {
    overlayState: t,
    isOverlayOpen: () => t.isOpen,
    closeOverlay() {
      t.baseRoute && o.push(t.baseRoute);
    }
  };
}
export {
  J as default,
  Q as useOverlayRouter
};
