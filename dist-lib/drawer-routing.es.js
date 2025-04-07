import { reactive as v, markRaw as c } from "vue";
import "vue-router";
const t = v({
  isOpen: !1,
  baseRoute: null,
  overlayRoute: null
});
function y() {
  const l = /* @__PURE__ */ new Set();
  let n = null;
  return {
    install(r, { router: i }) {
      const s = (a, o = "") => {
        a.forEach((e) => {
          var f;
          const u = o + (e.path.startsWith("/") ? e.path : `/${e.path}`);
          (f = e.meta) != null && f.overlay && l.add(e.name || u), e.children && s(e.children, u);
        });
      };
      s(i.getRoutes());
      const h = (a) => a.name === void 0 && a.matched.length === 0;
      i.beforeEach((a, o, e) => {
        if (p(a, l)) {
          if (h(o)) {
            n = a.fullPath, e({ path: "/", replace: !0 });
            return;
          }
          t.isOpen || (t.baseRoute = c(o), t.isOpen = !0), t.overlayRoute = c(a), e();
        } else
          t.isOpen ? t.isOpen = !1 : (t.overlayRoute = null, t.baseRoute = null), e();
      }), i.afterEach(() => {
        n && (i.push(n), n = null);
      }), r.provide("overlayRouter", {
        state: t,
        isOverlayRoute: (a) => l.has(a),
        isOverlayActive: () => t.isOpen
      });
    }
  };
}
function p(l, n) {
  var r;
  return !!((r = l.meta) != null && r.overlay || l.name && n.has(l.name) || l.matched && l.matched.some((i) => {
    var s;
    return (s = i.meta) == null ? void 0 : s.overlay;
  }));
}
export {
  y as default
};
