import { computed as v, createBlock as f, openBlock as p, unref as m, onMounted as V, onBeforeUnmount as D, withCtx as y, renderSlot as w, normalizeProps as E, guardReactiveProps as S, createCommentVNode as O, resolveDynamicComponent as b, toRefs as $, createElementBlock as C, createElementVNode as d, normalizeStyle as B, toDisplayString as M, createVNode as P, reactive as x, markRaw as _ } from "vue";
import { useRouter as R, RouterView as g } from "vue-router";
const N = {
  __name: "MainRouterView",
  setup(o) {
    const s = R(), e = () => t.baseRoute || s.currentRoute.value, a = v(() => {
      if (t.isOpen && t.baseRoute) {
        const u = t.baseRoute, n = [...u.matched].filter(
          (i) => {
            var r;
            return ((r = i.meta) == null ? void 0 : r.overlay) !== !0;
          }
        );
        return {
          ...u,
          matched: n
        };
      }
      return e();
    }), l = v(() => a.value.fullPath);
    return (u, n) => (p(), f(m(g), {
      key: l.value,
      route: a.value
    }, null, 8, ["route"]));
  }
}, F = (o) => o.filter((s) => {
  var e;
  return ((e = s.meta) == null ? void 0 : e.overlay) === !0;
}), k = {
  __name: "OverlayRouterView",
  props: {
    // Function to filter routes - receives matched routes array and returns filtered array
    filterMatchedRoutes: {
      type: Function,
      default: F
    }
  },
  setup(o) {
    const s = R(), e = v(() => t.isOpen), a = o, l = v(() => {
      if (!t.overlayRoute) return null;
      const i = a.filterMatchedRoutes([...t.overlayRoute.matched]);
      return {
        ...t.overlayRoute,
        matched: i
      };
    });
    function u(i) {
      i.key === "Escape" && e.value && n();
    }
    const n = () => {
      console.log("closing drawer"), t.baseRoute && s.push(t.baseRoute);
    };
    return V(() => {
      window.addEventListener("keydown", u);
    }), D(() => {
      window.removeEventListener("keydown", u);
    }), (i, r) => (p(), f(m(g), { route: l.value }, {
      default: y((c) => [
        w(i.$slots, "default", E(S({ ...c, isOpen: e.value, closeOverlay: n })), () => [
          l.value ? (p(), f(b(c.Component), {
            key: 0,
            "close-overlay": n,
            "is-open": e.value
          }, null, 8, ["is-open"])) : O("", !0)
        ])
      ]),
      _: 3
    }, 8, ["route"]));
  }
}, H = (o, s) => {
  const e = o.__vccOpts || o;
  for (const [a, l] of s)
    e[a] = l;
  return e;
}, z = {
  key: 0,
  class: "drawer-container"
}, A = { class: "drawer-header" }, I = { class: "drawer-content" }, K = {
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
    const e = o, { isOpen: a } = $(e), l = s;
    function u() {
      setTimeout(() => {
        console.log("hiding"), l("hide");
      }, 0);
    }
    const n = v(() => ({
      width: e.width,
      [e.position]: a.value ? "0" : `-${e.width}`
    }));
    return (i, r) => {
      var c;
      return m(a) ? (p(), C("div", z, [
        d("div", {
          class: "drawer-backdrop",
          onClick: u
        }),
        d("div", {
          class: "drawer",
          style: B(n.value)
        }, [
          d("div", A, [
            d("div", null, [
              d("span", null, M(((c = m(t).overlayRoute.meta) == null ? void 0 : c.title) ?? ""), 1)
            ]),
            d("button", {
              class: "drawer-close",
              onClick: u
            }, "×")
          ]),
          d("div", I, [
            r[0] || (r[0] = d("div", null, "asdasdsa", -1)),
            w(i.$slots, "default", {}, void 0, !0)
          ])
        ], 4)
      ])) : O("", !0);
    };
  }
}, L = /* @__PURE__ */ H(K, [["__scopeId", "data-v-ddc8c3b0"]]), T = {
  __name: "DrawerRouterView",
  setup(o) {
    return (s, e) => (p(), f(k, null, {
      default: y(({ isOpen: a, Component: l, closeOverlay: u }) => [
        P(L, {
          "is-open": a,
          onHide: u
        }, {
          default: y(() => [
            (p(), f(b(l)))
          ]),
          _: 2
        }, 1032, ["is-open", "onHide"])
      ]),
      _: 1
    }));
  }
}, t = x({
  isOpen: !1,
  baseRoute: null,
  overlayRoute: null
});
function q() {
  const o = /* @__PURE__ */ new Set();
  let s = null;
  return {
    install(e, { router: a }) {
      e.component("MainRouterView", N), e.component("OverlayRouterView", k), e.component("DrawerRouterView", T);
      const l = (n, i = "") => {
        n.forEach((r) => {
          var h;
          const c = i + (r.path.startsWith("/") ? r.path : `/${r.path}`);
          (h = r.meta) != null && h.overlay && o.add(r.name || c), r.children && l(r.children, c);
        });
      };
      l(a.getRoutes());
      const u = (n) => n.name === void 0 && n.matched.length === 0;
      a.beforeEach((n, i, r) => {
        if (U(n, o)) {
          if (u(i)) {
            s = n.fullPath, r({ path: "/", replace: !0 });
            return;
          }
          t.isOpen || (t.baseRoute = _(i), t.isOpen = !0), t.overlayRoute = _(n), r();
        } else
          t.isOpen ? t.isOpen = !1 : (t.overlayRoute = null, t.baseRoute = null), r();
      }), a.afterEach(() => {
        s && (a.push(s), s = null);
      }), e.provide("overlayRouter", {
        state: t,
        isOverlayRoute: (n) => o.has(n),
        isOverlayActive: () => t.isOpen
      });
    }
  };
}
function U(o, s) {
  var e;
  return !!((e = o.meta) != null && e.overlay || o.name && s.has(o.name) || o.matched && o.matched.some((a) => {
    var l;
    return (l = a.meta) == null ? void 0 : l.overlay;
  }));
}
function G() {
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
  q as default,
  G as useOverlayRouter
};
