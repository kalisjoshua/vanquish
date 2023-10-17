/* Strawberry 0.0.2-alpha.0
 * Copyright (c) 2023-present, Alan Tom (18alantom)
 * MIT License
 * This is a generated file. Do not edit.*/
"use strict";
var sb = (() => {
  var $ = Object.defineProperty;
  var z = Object.getOwnPropertyDescriptor;
  var J = Object.getOwnPropertyNames;
  var Q = Object.prototype.hasOwnProperty;
  var _ = (t, e) => {
      for (var n in e) $(t, n, { get: e[n], enumerable: !0 });
    },
    G = (t, e, n, i) => {
      if ((e && typeof e == "object") || typeof e == "function")
        for (let r of J(e))
          !Q.call(t, r) &&
            r !== n &&
            $(t, r, {
              get: () => e[r],
              enumerable: !(i = z(e, r)) || i.enumerable,
            });
      return t;
    };
  var K = (t) => G($({}, "__esModule", { value: !0 }), t);
  var me = {};
  _(me, {
    directive: () => ie,
    getValue: () => C,
    init: () => re,
    load: () => se,
    prefix: () => ne,
    register: () => V,
    unwatch: () => ae,
    watch: () => ue,
  });
  var y = Symbol("@sb/prefix"),
    I = Symbol("@sb/dontcall"),
    T = null,
    w = "sb-",
    E = new Map(),
    k = new Map([
      [
        "mark",
        {
          cb: ({ el: t, value: e, isDelete: n }) => {
            if (n) return ee(t);
            if (!(t instanceof HTMLElement)) return;
            typeof e == "object" && e !== null && (e = JSON.stringify(e));
            let i = typeof e == "string" ? e : String(e);
            t.innerText = i;
          },
        },
      ],
      ["if", { cb: ({ el: t, value: e, key: n }) => H(t, e, n, "if") }],
      ["ifnot", { cb: ({ el: t, value: e, key: n }) => H(t, e, n, "ifnot") }],
    ]),
    d = { isEvaluating: !1, set: new Set(), map: new Map() },
    m = (t) => w + t;
  function L(t, e, n, i) {
    if (t === null) return t;
    let r = typeof t == "object",
      o = typeof t == "function";
    if (
      (o && n && (t = t.bind(n)),
      (r || o) &&
        Object.defineProperty(t, y, { value: e, enumerable: !1, writable: !0 }),
      o && i && n)
    )
      return U(t, e, n, i), t;
    if (!r) return t;
    let s = new Proxy(t, S);
    for (let c of Object.keys(t)) {
      let a = P(c, e),
        f = t[c];
      t[c] = L(f, a, s, c);
    }
    return s;
  }
  var S = class {
    static get(e, n, i) {
      d.isEvaluating &&
        typeof n == "string" &&
        Object.getOwnPropertyDescriptor(e, n)?.enumerable &&
        d.set.add(P(n, e[y]));
      let r = Reflect.get(e, n, i);
      if (typeof r == "function" && r[y]) {
        let o = r();
        return o instanceof Promise ? o.then((s) => v(s)) : v(o);
      }
      return r;
    }
    static set(e, n, i, r) {
      if (typeof n == "symbol") return Reflect.set(e, n, i, r);
      let o = P(n, e[y]),
        s = L(i, o, r, n),
        c = Reflect.set(e, n, s, r);
      return this.update(s, o, !1, r, n), this.updateComputed(o), c;
    }
    static deleteProperty(e, n) {
      if (typeof n == "symbol") return Reflect.deleteProperty(e, n);
      let i = P(n, e[y]),
        r = Reflect.deleteProperty(e, n);
      this.update(void 0, i, !0, e, n), d.map.delete(i);
      for (let o of d.map.keys()) {
        let s = d.map.get(o)?.filter((c) => c.key !== i) ?? [];
        d.map.set(o, s);
      }
      return r;
    }
    static defineProperty(e, n, i) {
      return n === y && y in e && /\.\d+$/.test(i.value)
        ? Reflect.set(e, n, i.value)
        : Reflect.defineProperty(e, n, i);
    }
    static updateComputed(e) {
      let n = [...d.map.keys()]
          .filter(
            (r) => r === e || r.startsWith(e + ".") || e.startsWith(r + "."),
          )
          .flatMap((r) => d.map.get(r) ?? []),
        i = new Set();
      for (let r of n)
        i.has(r.computed) ||
          (this.update(r.computed, r.key, !1, r.parent, r.prop),
          i.add(r.computed));
    }
    static update(e, n, i, r, o, s) {
      if (
        (typeof e == "function" && !e.hasOwnProperty(I) && (e = te(e, n, r, o)),
        e instanceof Promise)
      ) {
        e.then((c) => this.update(c, n, !1, r, o, s));
        return;
      }
      s || this.callWatchers(e, n),
        this.callDirectives(e, n, i, r, o, void 0, void 0, s);
    }
    static callWatchers(e, n) {
      for (let i of E.keys())
        if (n === i) E.get(i)?.forEach((r) => r(e));
        else if (n.startsWith(i + ".") && T !== null) {
          let { value: r } = C(i);
          E.get(i)?.forEach((o) => o(r));
        }
    }
    static callDirectives(e, n, i, r, o, s, c, a) {
      let f = Array.isArray(r);
      f && /^\d+$/.test(o) && !c && a?.skipMark !== !0
        ? X(n, o, e, r)
        : f && o === "length" && Y(r);
      let l = R(e);
      if (l && Array.isArray(e) && a?.skipMark !== !0) {
        let u = `${n}.#`,
          x = `[${m("mark")}="${u}"]`,
          h = [],
          b = document;
        a?.el.parentElement && (b = a.el.parentElement);
        for (let g of b.querySelectorAll(x)) {
          let p = Z(g, u, e);
          h.push(p);
        }
        for (let g of h)
          for (let p in e)
            this.callDirectives(e[p], P(p, n), i, e, p, g[p], !0);
      } else if (l)
        for (let u in e) this.callDirectives(e[u], P(u, n), i, e, u, s);
      if (!l) {
        if (a) {
          let { el: u, directive: x } = a,
            { cb: h, isParametric: b } = k.get(x) ?? {},
            g = N(u, w + x, !!b);
          h?.({
            el: u,
            value: e,
            key: n,
            isDelete: i,
            parent: r,
            prop: o,
            param: g,
          });
          return;
        }
        s ?? (s = document);
        for (let [u, x] of k.entries()) {
          let { cb: h, isParametric: b } = x,
            g = w + u,
            p;
          if (
            (b ? (p = `[${g}^='${n}:']`) : (p = `[${g}='${n}']`),
            s.querySelectorAll(p).forEach((A) => {
              let B = N(A, g, !!b);
              h({
                el: A,
                value: e,
                key: n,
                isDelete: i,
                parent: r,
                prop: o,
                param: B,
              });
            }),
            s instanceof Element && s.getAttribute(g) === n)
          ) {
            let A = N(s, g, !!b);
            h({
              el: s,
              value: e,
              key: n,
              isDelete: i,
              parent: r,
              prop: o,
              param: A,
            });
          }
        }
      }
    }
  };
  function H(t, e, n, i) {
    let r = i === "if" ? !!e : !e,
      o = t instanceof HTMLTemplateElement;
    if (r && o) {
      let s = t.content.firstElementChild;
      if (!s) return;
      s.setAttribute(m(i), n), F(s, !0), t.replaceWith(s);
    }
    if (!r && !o) {
      let s = document.createElement("template");
      s.content.appendChild(t.cloneNode(!0)), s.setAttribute(m(i), n);
      let c = t.getAttribute(m("mark"));
      c && s.setAttribute(m("mark"), c), t.replaceWith(s);
    }
  }
  function F(t, e) {
    for (let n of t.children) F(n, !1);
    q(t, e);
  }
  function M(t) {
    for (let e of t.children) M(e);
    q(t, !1, !0);
  }
  function q(t, e, n) {
    for (let [i, { isParametric: r }] of k.entries()) {
      if ((n && i === "mark") || (e && (i === "if" || i === "ifnot"))) continue;
      let o = t.getAttribute(w + i);
      if (
        (r && (o = o?.split(":")[0] ?? null),
        o?.endsWith(".#") && (o = o.slice(0, -2)),
        o === null)
      )
        continue;
      let { value: s, parent: c, prop: a } = C(o);
      c &&
        S.update(s, o, !1, c, a, {
          directive: i,
          el: t,
          skipConditionals: e,
          skipMark: n,
        });
    }
  }
  function U(t, e, n, i) {
    (d.isEvaluating = !0), d.set.clear(), t(), (d.isEvaluating = !1);
    let r = { key: e, computed: t, parent: n, prop: i };
    for (let o of d.set) {
      let s = d.map.get(o) ?? [];
      s.push(r), d.map.has(o) || d.map.set(o, s);
    }
  }
  function X(t, e, n, i) {
    let r = document.querySelectorAll(`[${m("mark")}="${t}"]`);
    if (r.length && !R(n)) return;
    let o = i[y],
      s = t.replace(/\d+$/, "#"),
      c = !1;
    for (let f of r) {
      let l = f.nextElementSibling;
      for (; l && l.getAttribute(m("mark")) !== s; ) l = l.nextElementSibling;
      let u;
      if (l instanceof HTMLTemplateElement)
        u = l.content.firstElementChild?.cloneNode(!0);
      else if (l?.getAttribute(m("mark")) === s) u = l?.cloneNode(!0);
      else continue;
      u instanceof Element &&
        (D(e, o, s, u), f.replaceWith(u), M(u), c || (c = !0));
    }
    if (c) return;
    let a = document.querySelectorAll(`[${m("mark")}="${s}"]`);
    for (let f of a) {
      if (!(f instanceof HTMLTemplateElement)) continue;
      let l = f.content.firstElementChild?.cloneNode(!0);
      l instanceof Element && (D(e, o, s, l), f.before(l), M(l));
    }
  }
  function Y(t) {
    let e = P("#", t[y]),
      n = document.querySelectorAll(`[${m("mark")}="${e}"]`);
    for (let i of n) {
      let r = [],
        o = i.previousElementSibling,
        s = !0,
        c = -1;
      for (; o; ) {
        let f = o;
        o = f.previousElementSibling;
        let l = f?.getAttribute(m("mark"));
        if (l) {
          if (l === e) break;
          if (l.replace(/\d+$/, "#") === e) {
            if ((r.push(f), !s)) continue;
            let u = Number(l.slice(l.lastIndexOf(".") + 1) ?? -1);
            c !== -1 && c !== u + 1 && (s = !1), (c = u);
          }
        }
      }
      if (s) return;
      [...r]
        .sort((f, l) => {
          let u = f.getAttribute(m("mark")),
            x = l.getAttribute(m("mark"));
          if (!u || !x) return 0;
          let h = u.split("."),
            b = x.split("."),
            g = +(h[h.length - 1] ?? 0),
            p = +(b[b.length - 1] ?? 0);
          return g - p;
        })
        .forEach((f) => i.before(f));
    }
  }
  function Z(t, e, n) {
    let i = t.previousElementSibling;
    for (; i; ) {
      let a = i;
      i = a.previousElementSibling;
      let f = a?.getAttribute(m("mark"));
      if (f)
        if (f !== e && f.replace(/\d+$/, "#") === e) a?.remove();
        else break;
    }
    let r, o;
    if (
      (t instanceof HTMLTemplateElement
        ? ((r = t),
          (o = t.content.firstElementChild),
          o?.setAttribute(m("mark"), e))
        : ((o = t),
          (r = document.createElement("template")),
          r.content.appendChild(t.cloneNode(!0)),
          r.setAttribute(m("mark"), e),
          t.replaceWith(r)),
      o === null)
    )
      return console.warn(`empty template found for ${e}`), [];
    let s = e.slice(0, -2),
      c = [];
    for (let a in n) {
      if (Number.isNaN(+a)) continue;
      let f = o.cloneNode(!0);
      f instanceof Element && (D(a, s, e, f), r.before(f), M(f), c.push(f));
    }
    return c;
  }
  function D(t, e, n, i) {
    let r = P(t, e);
    for (let o of k.keys()) {
      let s = w + o;
      O(i, s, r, n),
        i.querySelectorAll(`[${s}]`).forEach((c) => {
          O(c, s, r, n);
        });
    }
  }
  function O(t, e, n, i) {
    let r = t.getAttribute(e);
    if (r?.startsWith(i)) {
      let o = n + r.slice(i.length);
      t.setAttribute(e, o);
    }
  }
  function ee(t) {
    let e = t.parentElement;
    if (!(t instanceof HTMLElement) || !e) return t.remove();
    if (t.getAttribute(m("mark")) === e.getAttribute(m("mark")))
      return e.remove();
    t.remove();
  }
  function R(t) {
    return typeof t != "object" || t === null ? !1 : y in t;
  }
  function P(t, e) {
    return e === "" ? t : e + "." + t;
  }
  function N(t, e, n) {
    let i;
    if (!(!n || !(i = t.getAttribute(e)))) return i.slice(i.indexOf(":") + 1);
  }
  function C(t) {
    let e = T,
      n,
      i = "";
    if (e === null) return { parent: e, value: n, prop: i };
    let r = t.split(".").reverse();
    for (
      ;
      r.length &&
      ((i = r.pop() ?? ""),
      (n = Reflect.get(e, i)),
      !(!r.length || typeof n != "object" || n === null));

    )
      e = n;
    return { parent: e, value: n, prop: i };
  }
  function te(t, e, n, i) {
    let r = t();
    return r instanceof Promise ? r.then((o) => v(o, e, n, i)) : v(r, e, n, i);
  }
  function v(t, e, n, i) {
    return typeof t == "function"
      ? ((t[I] = !0), t)
      : e === void 0 || n === void 0 || i === void 0
      ? j(t)
      : L(j(t), e, n, i);
  }
  function j(t) {
    if (typeof t != "object" || t === null) return t;
    let e = Array.isArray(t) ? [] : {};
    for (let n in t) e[n] = j(t[n]);
    return e;
  }
  function ne(t = "sb") {
    t.endsWith("-") || (t = t + "-"), (w = t);
  }
  function ie(t, e, n = !1) {
    k.has(t) || k.set(t, { cb: e, isParametric: n });
  }
  function re() {
    return (
      T ?? (T = L({}, "")),
      W(),
      document.addEventListener("readystatechange", oe),
      T
    );
  }
  function oe() {
    document.readyState === "interactive" && W();
  }
  async function se(t) {
    typeof t == "string" && (t = [t]);
    for (let e of t) {
      let n = await fetch(e)
        .then((i) => i.text())
        .catch((i) => console.error(i));
      typeof n == "string" && V(n);
    }
  }
  function V(t, ...e) {
    Array.isArray(t) && (t = ce(t, ...e)),
      typeof t == "string" && (t = fe(t)),
      W(t);
  }
  function W(t) {
    let e = t ?? document;
    for (let n of e.getElementsByTagName("template")) le(n);
  }
  function ce(t, ...e) {
    let n = t[0] ?? "";
    for (let i = 1; i < t.length; i++) (n += e[i - 1]), (n += t[i]);
    return n;
  }
  function fe(t) {
    let e = document.createElement("div");
    return (e.innerHTML = t), e;
  }
  function le(t) {
    let e = t.getAttribute("name")?.toLowerCase();
    if (!e || customElements.get(e)) return;
    let n = class extends HTMLElement {
      constructor() {
        super();
        let i = this.attachShadow({ mode: "open" });
        for (let r of t.content.children) r && i.appendChild(r.cloneNode(!0));
      }
    };
    customElements.define(e, n);
  }
  function ue(t, e) {
    let n = E.get(t) ?? [];
    n.push(e), E.has(t) || E.set(t, n);
  }
  function ae(t, e) {
    if (!t) {
      E.clear();
      return;
    }
    if (!e) {
      E.delete(t);
      return;
    }
    let i = (E.get(t) ?? []).filter((r) => r !== e);
    E.set(t, i);
  }
  return K(me);
})();
