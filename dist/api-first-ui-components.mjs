/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, xt = Z.ShadowRoot && (Z.ShadyCSS === void 0 || Z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Et = Symbol(), Ft = /* @__PURE__ */ new WeakMap();
let ie = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (xt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Ft.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Ft.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ae = (n) => new ie(typeof n == "string" ? n : n + "", void 0, Et), Pt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new ie(e, n, Et);
}, xe = (n, t) => {
  if (xt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = Z.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, Lt = xt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Ae(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ee, defineProperty: Pe, getOwnPropertyDescriptor: Te, getOwnPropertyNames: Ce, getOwnPropertySymbols: ke, getPrototypeOf: Ne } = Object, x = globalThis, Ht = x.trustedTypes, Oe = Ht ? Ht.emptyScript : "", ht = x.reactiveElementPolyfillSupport, H = (n, t) => n, tt = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Oe : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, Tt = (n, t) => !Ee(n, t), jt = { attribute: !0, type: String, converter: tt, reflect: !1, hasChanged: Tt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class I extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = jt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Pe(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = Te(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(o) {
      const a = i == null ? void 0 : i.call(this);
      r.call(this, o), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? jt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const t = Ne(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const e = this.properties, s = [...Ce(e), ...ke(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(Lt(i));
    } else t !== void 0 && e.push(Lt(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return xe(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EC(t, e) {
    var r;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : tt).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : tt;
      this._$Em = i, this[i] = a.fromAttribute(e, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? Tt)(this[t], e)) return;
      this.P(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, s) {
    this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, o] of i) o.wrapped !== !0 || this._$AL.has(r) || this[r] === void 0 || this.P(r, this[r], o);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
      }), this.update(e)) : this._$EU();
    } catch (i) {
      throw t = !1, this._$EU(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[H("elementProperties")] = /* @__PURE__ */ new Map(), I[H("finalized")] = /* @__PURE__ */ new Map(), ht == null || ht({ ReactiveElement: I }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, et = j.trustedTypes, Bt = et ? et.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ne = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, re = "?" + $, Ue = `<${re}>`, N = document, q = () => N.createComment(""), W = (n) => n === null || typeof n != "object" && typeof n != "function", Ct = Array.isArray, Re = (n) => Ct(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", ct = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qt = /-->/g, Wt = />/g, T = RegExp(`>|${ct}(?:([^\\s"'>=/]+)(${ct}*=${ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), zt = /'/g, Gt = /"/g, oe = /^(?:script|style|textarea|title)$/i, Ie = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), V = Ie(1), O = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), Qt = /* @__PURE__ */ new WeakMap(), C = N.createTreeWalker(N, 129);
function ae(n, t) {
  if (!Ct(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Bt !== void 0 ? Bt.createHTML(t) : t;
}
const Me = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = F;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let c, d, h = -1, u = 0;
    for (; u < l.length && (o.lastIndex = u, d = o.exec(l), d !== null); ) u = o.lastIndex, o === F ? d[1] === "!--" ? o = qt : d[1] !== void 0 ? o = Wt : d[2] !== void 0 ? (oe.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = T) : d[3] !== void 0 && (o = T) : o === T ? d[0] === ">" ? (o = i ?? F, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? T : d[3] === '"' ? Gt : zt) : o === Gt || o === zt ? o = T : o === qt || o === Wt ? o = F : (o = T, i = void 0);
    const m = o === T && n[a + 1].startsWith("/>") ? " " : "";
    r += o === F ? l + Ue : h >= 0 ? (s.push(c), l.slice(0, h) + ne + l.slice(h) + $ + m) : l + $ + (h === -2 ? a : m);
  }
  return [ae(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class z {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, d] = Me(t, e);
    if (this.el = z.createElement(c, s), C.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = C.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(ne)) {
          const u = d[o++], m = i.getAttribute(h).split($), g = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: r, name: g[2], strings: m, ctor: g[1] === "." ? De : g[1] === "?" ? Fe : g[1] === "@" ? Le : nt }), i.removeAttribute(h);
        } else h.startsWith($) && (l.push({ type: 6, index: r }), i.removeAttribute(h));
        if (oe.test(i.tagName)) {
          const h = i.textContent.split($), u = h.length - 1;
          if (u > 0) {
            i.textContent = et ? et.emptyScript : "";
            for (let m = 0; m < u; m++) i.append(h[m], q()), C.nextNode(), l.push({ type: 2, index: ++r });
            i.append(h[u], q());
          }
        }
      } else if (i.nodeType === 8) if (i.data === re) l.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = i.data.indexOf($, h + 1)) !== -1; ) l.push({ type: 7, index: r }), h += $.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = N.createElement("template");
    return s.innerHTML = t, s;
  }
}
function D(n, t, e = n, s) {
  var o, a;
  if (t === O) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = W(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = D(n, i._$AS(n, t.values), i, s)), t;
}
class Ve {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? N).importNode(e, !0);
    C.currentNode = i;
    let r = C.nextNode(), o = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new Y(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new He(r, this, t)), this._$AV.push(c), l = s[++a];
      }
      o !== (l == null ? void 0 : l.index) && (r = C.nextNode(), o++);
    }
    return C.currentNode = N, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class Y {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = D(this, t, e), W(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== O && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Re(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && W(this._$AH) ? this._$AA.nextSibling.data = t : this.T(N.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = z.createElement(ae(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const o = new Ve(i, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Qt.get(t.strings);
    return e === void 0 && Qt.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    Ct(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new Y(this.O(q()), this.O(q()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class nt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = D(this, t, e, 0), o = !W(t) || t !== this._$AH && t !== O, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = D(this, a[s + l], e, l), c === O && (c = this._$AH[l]), o || (o = !W(c) || c !== this._$AH[l]), c === p ? t = p : t !== p && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class De extends nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Fe extends nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Le extends nt {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = D(this, t, e, 0) ?? p) === O) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class He {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    D(this, t);
  }
}
const dt = j.litHtmlPolyfillSupport;
dt == null || dt(z, Y), (j.litHtmlVersions ?? (j.litHtmlVersions = [])).push("3.2.1");
const je = (n, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new Y(t.insertBefore(q(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let E = class extends I {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = je(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return O;
  }
};
var se;
E._$litElement$ = !0, E.finalized = !0, (se = globalThis.litElementHydrateSupport) == null || se.call(globalThis, { LitElement: E });
const ut = globalThis.litElementPolyfillSupport;
ut == null || ut({ LitElement: E });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Be = { attribute: !0, type: String, converter: tt, reflect: !1, hasChanged: Tt }, qe = (n = Be, t, e) => {
  const { kind: s, metadata: i } = e;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), r.set(e.name, n), s === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, n);
    }, init(a) {
      return a !== void 0 && this.P(o, void 0, n), a;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, n);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function f(n) {
  return (t, e) => typeof e == "object" ? qe(n, t, e) : ((s, i, r) => {
    const o = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, o ? { ...s, wrapped: !0 } : s), o ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function We(n) {
  return f({ ...n, state: !0, attribute: !1 });
}
var ze = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, kt = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Ge(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && ze(t, e, i), i;
};
let G = class extends E {
  constructor() {
    super(...arguments), this.productId = -1, this.isVisible = !0;
  }
  /** Write function that dispatches the event purchase */
  eventFunctionpurchase() {
    this.dispatchEvent(new Event("purchase"));
  }
  render() {
    return V`
      <h1>CatalogItem - &lt;catalog-item&gt;&lt;/catalog-item&gt;</h1>

      <h2>CSS variables</h2>
      <ul>
        <li>
          <span style="color: var(--text-color, black)"
            >current text-color: --text-color default value: black</span
          >
        </li>
      </ul>

      <h2>Attributes</h2>
      <ul>
        <li>productId = ${this.productId}</li>
        <li>isVisible = ${this.isVisible}</li>
      </ul>

      <h2>Events</h2>
      <ul>
        <li>
          <button @click=${this.eventFunctionpurchase}>trigger purchase</button>
        </li>
      </ul>

      <h2>Slots</h2>
      <ul>
        <li>
          Slot container (Your light-dom elements will be placed here):
          <slot name="container"></slot>
        </li>
      </ul>
    `;
  }
};
G.styles = Pt`
    h1,
    h2 {
      margin: 0;
    }
    ul {
      margin: 0;
    }
    :host {
      --text-color: var(--text-color, black);
    }
  `;
kt([
  f({ type: Number, attribute: "product-id" })
], G.prototype, "productId", 2);
kt([
  f({ type: Boolean, attribute: "is-visible" })
], G.prototype, "isVisible", 2);
G = kt([
  rt("catalog-item")
], G);
var Qe = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, Nt = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Je(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Qe(t, e, i), i;
};
let Q = class extends E {
  constructor() {
    super(...arguments), this.productIds = "1,2,3", this.purchases = [], this.handlePurchase = (n) => {
      this.purchases.push(n.detail.productId), this.requestUpdate();
    };
  }
  isVisible(n) {
    return Number(n) % 5 < 3;
  }
  render() {
    return V`
      <h1>Product overview</h1>
      <ul>
        ${this.productIds.split(",").map((n) => V`<li>
            <catalog-item product-id="${Number(n)}" @purchase=${this.handlePurchase} ?is-visible=${this.isVisible(n)}>
              ${Number(n) % 2 === 1 ? V`<div slot="container">Uneven</div>` : p}
            </catalog-item>
          </li>`)}
      </ul>
      <h2>Purchased items: ${this.purchases.join(", ")}</h2>
    `;
  }
};
Q.styles = Pt`
    :host {
      display: block;
      background-color: var(--background-color, white);
    }
    h1 {
      color: var(--header-color, black);
    }
    ul {
      margin: 0;
      font-size: 0.8rem;
      display: flex;
      flex-direction: row;
      gap: 2em;
      list-style: none;
      padding: 0;
    }
    li {
      border: 1px solid var(--border-color, red);
      padding: 1em;
    }
  `;
Nt([
  f({ attribute: "product-ids" })
], Q.prototype, "productIds", 2);
Nt([
  We()
], Q.prototype, "purchases", 2);
Q = Nt([
  rt("catalog-overview")
], Q);
var Xe = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, le = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Ke(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Xe(t, e, i), i;
};
let st = class extends E {
  constructor() {
    super(...arguments), this.type = "wonderful";
  }
  /** Write function that dispatches the event Gift */
  eventFunctionGift() {
    this.dispatchEvent(new Event("Gift"));
  }
  /** Write function that dispatches the event Bomb */
  eventFunctionBomb() {
    this.dispatchEvent(new Event("Bomb"));
  }
  render() {
    return V`
      <h1>HelloWorld - &lt;hello-world&gt;&lt;/hello-world&gt;</h1>

      <p>Hello generated world! Click for a gift or a bomb</p>

      <h2>CSS variables</h2>
      <ul>
        <li>
          <span style="color: var(--text-color, black)"
            >current text-color: --text-color default value: black</span
          >
        </li>
        <li>
          <span style="color: var(--background-color, red)"
            >current text-color: --background-color default value: red</span
          >
        </li>
      </ul>

      <h2>Attributes</h2>
      <ul>
        <li>type = ${this.type}</li>
      </ul>

      <h2>Events</h2>
      <ul>
        <li><button @click=${this.eventFunctionGift}>trigger Gift</button></li>
        <li><button @click=${this.eventFunctionBomb}>trigger Bomb</button></li>
      </ul>
    `;
  }
};
st.styles = Pt`
    h1,
    h2 {
      margin: 0;
    }
    ul {
      margin: 0;
    }
    :host {
      --text-color: var(--text-color, black);
      --background-color: var(--background-color, red);
    }
  `;
le([
  f({ type: String, attribute: "type" })
], st.prototype, "type", 2);
st = le([
  rt("hello-world")
], st);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Ze = (n) => (...t) => ({ _$litDirective$: n, values: t });
let ts = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he = "important", es = " !" + he, Jt = Ze(class extends ts {
  constructor(n) {
    var t;
    if (super(n), n.type !== Ye.ATTRIBUTE || n.name !== "style" || ((t = n.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return Object.keys(n).reduce((t, e) => {
      const s = n[e];
      return s == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(n, [t]) {
    const { style: e } = n.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const s of this.ft) t[s] == null && (this.ft.delete(s), s.includes("-") ? e.removeProperty(s) : e[s] = null);
    for (const s in t) {
      const i = t[s];
      if (i != null) {
        this.ft.add(s);
        const r = typeof i == "string" && i.endsWith(es);
        s.includes("-") || r ? e.setProperty(s, r ? i.slice(0, -11) : i, r ? he : "") : e[s] = i;
      }
    }
    return O;
  }
});
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Xt = typeof window < "u" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0, Ot = (n, t, e = null) => {
  for (; t !== e; ) {
    const s = t.nextSibling;
    n.removeChild(t), t = s;
  }
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const S = `{{lit-${String(Math.random()).slice(2)}}}`, ce = `<!--${S}-->`, Kt = new RegExp(`${S}|${ce}`), L = "$lit$";
class de {
  constructor(t, e) {
    this.parts = [], this.element = e;
    const s = [], i = [], r = document.createTreeWalker(e.content, 133, null, !1);
    let o = 0, a = -1, l = 0;
    const { strings: c, values: { length: d } } = t;
    for (; l < d; ) {
      const h = r.nextNode();
      if (h === null) {
        r.currentNode = i.pop();
        continue;
      }
      if (a++, h.nodeType === 1) {
        if (h.hasAttributes()) {
          const u = h.attributes, { length: m } = u;
          let g = 0;
          for (let _ = 0; _ < m; _++)
            Yt(u[_].name, L) && g++;
          for (; g-- > 0; ) {
            const _ = c[l], U = bt.exec(_)[2], R = U.toLowerCase() + L, P = h.getAttribute(R);
            h.removeAttribute(R);
            const w = P.split(Kt);
            this.parts.push({ type: "attribute", index: a, name: U, strings: w }), l += w.length - 1;
          }
        }
        h.tagName === "TEMPLATE" && (i.push(h), r.currentNode = h.content);
      } else if (h.nodeType === 3) {
        const u = h.data;
        if (u.indexOf(S) >= 0) {
          const m = h.parentNode, g = u.split(Kt), _ = g.length - 1;
          for (let U = 0; U < _; U++) {
            let R, P = g[U];
            if (P === "")
              R = A();
            else {
              const w = bt.exec(P);
              w !== null && Yt(w[2], L) && (P = P.slice(0, w.index) + w[1] + w[2].slice(0, -L.length) + w[3]), R = document.createTextNode(P);
            }
            m.insertBefore(R, h), this.parts.push({ type: "node", index: ++a });
          }
          g[_] === "" ? (m.insertBefore(A(), h), s.push(h)) : h.data = g[_], l += _;
        }
      } else if (h.nodeType === 8)
        if (h.data === S) {
          const u = h.parentNode;
          (h.previousSibling === null || a === o) && (a++, u.insertBefore(A(), h)), o = a, this.parts.push({ type: "node", index: a }), h.nextSibling === null ? h.data = "" : (s.push(h), a--), l++;
        } else {
          let u = -1;
          for (; (u = h.data.indexOf(S, u + 1)) !== -1; )
            this.parts.push({ type: "node", index: -1 }), l++;
        }
    }
    for (const h of s)
      h.parentNode.removeChild(h);
  }
}
const Yt = (n, t) => {
  const e = n.length - t.length;
  return e >= 0 && n.slice(e) === t;
}, ue = (n) => n.index !== -1, A = () => document.createComment(""), bt = (
  // eslint-disable-next-line no-control-regex
  /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/
);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Ut = 133;
function pe(n, t) {
  const { element: { content: e }, parts: s } = n, i = document.createTreeWalker(e, Ut, null, !1);
  let r = B(s), o = s[r], a = -1, l = 0;
  const c = [];
  let d = null;
  for (; i.nextNode(); ) {
    a++;
    const h = i.currentNode;
    for (h.previousSibling === d && (d = null), t.has(h) && (c.push(h), d === null && (d = h)), d !== null && l++; o !== void 0 && o.index === a; )
      o.index = d !== null ? -1 : o.index - l, r = B(s, r), o = s[r];
  }
  c.forEach((h) => h.parentNode.removeChild(h));
}
const ss = (n) => {
  let t = n.nodeType === 11 ? 0 : 1;
  const e = document.createTreeWalker(n, Ut, null, !1);
  for (; e.nextNode(); )
    t++;
  return t;
}, B = (n, t = -1) => {
  for (let e = t + 1; e < n.length; e++) {
    const s = n[e];
    if (ue(s))
      return e;
  }
  return -1;
};
function is(n, t, e = null) {
  const { element: { content: s }, parts: i } = n;
  if (e == null) {
    s.appendChild(t);
    return;
  }
  const r = document.createTreeWalker(s, Ut, null, !1);
  let o = B(i), a = 0, l = -1;
  for (; r.nextNode(); )
    for (l++, r.currentNode === e && (a = ss(t), e.parentNode.insertBefore(t, e)); o !== -1 && i[o].index === l; ) {
      if (a > 0) {
        for (; o !== -1; )
          i[o].index += a, o = B(i, o);
        return;
      }
      o = B(i, o);
    }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const ns = /* @__PURE__ */ new WeakMap(), J = (n) => typeof n == "function" && ns.has(n);
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const y = {}, Zt = {};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class wt {
  constructor(t, e, s) {
    this.__parts = [], this.template = t, this.processor = e, this.options = s;
  }
  update(t) {
    let e = 0;
    for (const s of this.__parts)
      s !== void 0 && s.setValue(t[e]), e++;
    for (const s of this.__parts)
      s !== void 0 && s.commit();
  }
  _clone() {
    const t = Xt ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0), e = [], s = this.template.parts, i = document.createTreeWalker(t, 133, null, !1);
    let r = 0, o = 0, a, l = i.nextNode();
    for (; r < s.length; ) {
      if (a = s[r], !ue(a)) {
        this.__parts.push(void 0), r++;
        continue;
      }
      for (; o < a.index; )
        o++, l.nodeName === "TEMPLATE" && (e.push(l), i.currentNode = l.content), (l = i.nextNode()) === null && (i.currentNode = e.pop(), l = i.nextNode());
      if (a.type === "node") {
        const c = this.processor.handleTextExpression(this.options);
        c.insertAfterNode(l.previousSibling), this.__parts.push(c);
      } else
        this.__parts.push(...this.processor.handleAttributeExpressions(l, a.name, a.strings, this.options));
      r++;
    }
    return Xt && (document.adoptNode(t), customElements.upgrade(t)), t;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const te = window.trustedTypes && trustedTypes.createPolicy("lit-html", { createHTML: (n) => n }), rs = ` ${S} `;
class me {
  constructor(t, e, s, i) {
    this.strings = t, this.values = e, this.type = s, this.processor = i;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */
  getHTML() {
    const t = this.strings.length - 1;
    let e = "", s = !1;
    for (let i = 0; i < t; i++) {
      const r = this.strings[i], o = r.lastIndexOf("<!--");
      s = (o > -1 || s) && r.indexOf("-->", o + 1) === -1;
      const a = bt.exec(r);
      a === null ? e += r + (s ? rs : ce) : e += r.substr(0, a.index) + a[1] + a[2] + L + a[3] + S;
    }
    return e += this.strings[t], e;
  }
  getTemplateElement() {
    const t = document.createElement("template");
    let e = this.getHTML();
    return te !== void 0 && (e = te.createHTML(e)), t.innerHTML = e, t;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const Rt = (n) => n === null || !(typeof n == "object" || typeof n == "function"), St = (n) => Array.isArray(n) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
!!(n && n[Symbol.iterator]);
class fe {
  constructor(t, e, s) {
    this.dirty = !0, this.element = t, this.name = e, this.strings = s, this.parts = [];
    for (let i = 0; i < s.length - 1; i++)
      this.parts[i] = this._createPart();
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */
  _createPart() {
    return new ge(this);
  }
  _getValue() {
    const t = this.strings, e = t.length - 1, s = this.parts;
    if (e === 1 && t[0] === "" && t[1] === "") {
      const r = s[0].value;
      if (typeof r == "symbol")
        return String(r);
      if (typeof r == "string" || !St(r))
        return r;
    }
    let i = "";
    for (let r = 0; r < e; r++) {
      i += t[r];
      const o = s[r];
      if (o !== void 0) {
        const a = o.value;
        if (Rt(a) || !St(a))
          i += typeof a == "string" ? a : String(a);
        else
          for (const l of a)
            i += typeof l == "string" ? l : String(l);
      }
    }
    return i += t[e], i;
  }
  commit() {
    this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()));
  }
}
class ge {
  constructor(t) {
    this.value = void 0, this.committer = t;
  }
  setValue(t) {
    t !== y && (!Rt(t) || t !== this.value) && (this.value = t, J(t) || (this.committer.dirty = !0));
  }
  commit() {
    for (; J(this.value); ) {
      const t = this.value;
      this.value = y, t(this);
    }
    this.value !== y && this.committer.commit();
  }
}
class ot {
  constructor(t) {
    this.value = void 0, this.__pendingValue = void 0, this.options = t;
  }
  /**
   * Appends this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  appendInto(t) {
    this.startNode = t.appendChild(A()), this.endNode = t.appendChild(A());
  }
  /**
   * Inserts this part after the `ref` node (between `ref` and `ref`'s next
   * sibling). Both `ref` and its next sibling must be static, unchanging nodes
   * such as those that appear in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  insertAfterNode(t) {
    this.startNode = t, this.endNode = t.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  appendIntoPart(t) {
    t.__insert(this.startNode = A()), t.__insert(this.endNode = A());
  }
  /**
   * Inserts this part after the `ref` part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  insertAfterPart(t) {
    t.__insert(this.startNode = A()), this.endNode = t.endNode, t.endNode = this.startNode;
  }
  setValue(t) {
    this.__pendingValue = t;
  }
  commit() {
    if (this.startNode.parentNode === null)
      return;
    for (; J(this.__pendingValue); ) {
      const e = this.__pendingValue;
      this.__pendingValue = y, e(this);
    }
    const t = this.__pendingValue;
    t !== y && (Rt(t) ? t !== this.value && this.__commitText(t) : t instanceof me ? this.__commitTemplateResult(t) : t instanceof Node ? this.__commitNode(t) : St(t) ? this.__commitIterable(t) : t === Zt ? (this.value = Zt, this.clear()) : this.__commitText(t));
  }
  __insert(t) {
    this.endNode.parentNode.insertBefore(t, this.endNode);
  }
  __commitNode(t) {
    this.value !== t && (this.clear(), this.__insert(t), this.value = t);
  }
  __commitText(t) {
    const e = this.startNode.nextSibling;
    t = t ?? "";
    const s = typeof t == "string" ? t : String(t);
    e === this.endNode.previousSibling && e.nodeType === 3 ? e.data = s : this.__commitNode(document.createTextNode(s)), this.value = t;
  }
  __commitTemplateResult(t) {
    const e = this.options.templateFactory(t);
    if (this.value instanceof wt && this.value.template === e)
      this.value.update(t.values);
    else {
      const s = new wt(e, t.processor, this.options), i = s._clone();
      s.update(t.values), this.__commitNode(i), this.value = s;
    }
  }
  __commitIterable(t) {
    Array.isArray(this.value) || (this.value = [], this.clear());
    const e = this.value;
    let s = 0, i;
    for (const r of t)
      i = e[s], i === void 0 && (i = new ot(this.options), e.push(i), s === 0 ? i.appendIntoPart(this) : i.insertAfterPart(e[s - 1])), i.setValue(r), i.commit(), s++;
    s < e.length && (e.length = s, this.clear(i && i.endNode));
  }
  clear(t = this.startNode) {
    Ot(this.startNode.parentNode, t.nextSibling, this.endNode);
  }
}
class os {
  constructor(t, e, s) {
    if (this.value = void 0, this.__pendingValue = void 0, s.length !== 2 || s[0] !== "" || s[1] !== "")
      throw new Error("Boolean attributes can only contain a single expression");
    this.element = t, this.name = e, this.strings = s;
  }
  setValue(t) {
    this.__pendingValue = t;
  }
  commit() {
    for (; J(this.__pendingValue); ) {
      const e = this.__pendingValue;
      this.__pendingValue = y, e(this);
    }
    if (this.__pendingValue === y)
      return;
    const t = !!this.__pendingValue;
    this.value !== t && (t ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name), this.value = t), this.__pendingValue = y;
  }
}
class as extends fe {
  constructor(t, e, s) {
    super(t, e, s), this.single = s.length === 2 && s[0] === "" && s[1] === "";
  }
  _createPart() {
    return new ls(this);
  }
  _getValue() {
    return this.single ? this.parts[0].value : super._getValue();
  }
  commit() {
    this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue());
  }
}
class ls extends ge {
}
let ye = !1;
(() => {
  try {
    const n = {
      get capture() {
        return ye = !0, !1;
      }
    };
    window.addEventListener("test", n, n), window.removeEventListener("test", n, n);
  } catch {
  }
})();
class hs {
  constructor(t, e, s) {
    this.value = void 0, this.__pendingValue = void 0, this.element = t, this.eventName = e, this.eventContext = s, this.__boundHandleEvent = (i) => this.handleEvent(i);
  }
  setValue(t) {
    this.__pendingValue = t;
  }
  commit() {
    for (; J(this.__pendingValue); ) {
      const r = this.__pendingValue;
      this.__pendingValue = y, r(this);
    }
    if (this.__pendingValue === y)
      return;
    const t = this.__pendingValue, e = this.value, s = t == null || e != null && (t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive), i = t != null && (e == null || s);
    s && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options), i && (this.__options = cs(t), this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)), this.value = t, this.__pendingValue = y;
  }
  handleEvent(t) {
    typeof this.value == "function" ? this.value.call(this.eventContext || this.element, t) : this.value.handleEvent(t);
  }
}
const cs = (n) => n && (ye ? { capture: n.capture, passive: n.passive, once: n.once } : n.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
function ds(n) {
  let t = X.get(n.type);
  t === void 0 && (t = {
    stringsArray: /* @__PURE__ */ new WeakMap(),
    keyString: /* @__PURE__ */ new Map()
  }, X.set(n.type, t));
  let e = t.stringsArray.get(n.strings);
  if (e !== void 0)
    return e;
  const s = n.strings.join(S);
  return e = t.keyString.get(s), e === void 0 && (e = new de(n, n.getTemplateElement()), t.keyString.set(s, e)), t.stringsArray.set(n.strings, e), e;
}
const X = /* @__PURE__ */ new Map();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const M = /* @__PURE__ */ new WeakMap(), us = (n, t, e) => {
  let s = M.get(t);
  s === void 0 && (Ot(t, t.firstChild), M.set(t, s = new ot(Object.assign({ templateFactory: ds }, e))), s.appendInto(t)), s.setValue(n), s.commit();
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class ps {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(t, e, s, i) {
    const r = e[0];
    return r === "." ? new as(t, e.slice(1), s).parts : r === "@" ? [new hs(t, e.slice(1), i.eventContext)] : r === "?" ? [new os(t, e.slice(1), s)] : new fe(t, e, s).parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */
  handleTextExpression(t) {
    return new ot(t);
  }
}
const ms = new ps();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
typeof window < "u" && (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.4.1");
const pt = (n, ...t) => new me(n, t, "html", ms);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const _e = (n, t) => `${n}--${t}`;
let it = !0;
typeof window.ShadyCSS > "u" ? it = !1 : typeof window.ShadyCSS.prepareTemplateDom > "u" && (console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."), it = !1);
const fs = (n) => (t) => {
  const e = _e(t.type, n);
  let s = X.get(e);
  s === void 0 && (s = {
    stringsArray: /* @__PURE__ */ new WeakMap(),
    keyString: /* @__PURE__ */ new Map()
  }, X.set(e, s));
  let i = s.stringsArray.get(t.strings);
  if (i !== void 0)
    return i;
  const r = t.strings.join(S);
  if (i = s.keyString.get(r), i === void 0) {
    const o = t.getTemplateElement();
    it && window.ShadyCSS.prepareTemplateDom(o, n), i = new de(t, o), s.keyString.set(r, i);
  }
  return s.stringsArray.set(t.strings, i), i;
}, gs = ["html", "svg"], ys = (n) => {
  gs.forEach((t) => {
    const e = X.get(_e(t, n));
    e !== void 0 && e.keyString.forEach((s) => {
      const { element: { content: i } } = s, r = /* @__PURE__ */ new Set();
      Array.from(i.querySelectorAll("style")).forEach((o) => {
        r.add(o);
      }), pe(s, r);
    });
  });
}, be = /* @__PURE__ */ new Set(), _s = (n, t, e) => {
  be.add(n);
  const s = e ? e.element : document.createElement("template"), i = t.querySelectorAll("style"), { length: r } = i;
  if (r === 0) {
    window.ShadyCSS.prepareTemplateStyles(s, n);
    return;
  }
  const o = document.createElement("style");
  for (let c = 0; c < r; c++) {
    const d = i[c];
    d.parentNode.removeChild(d), o.textContent += d.textContent;
  }
  ys(n);
  const a = s.content;
  e ? is(e, o, a.firstChild) : a.insertBefore(o, a.firstChild), window.ShadyCSS.prepareTemplateStyles(s, n);
  const l = a.querySelector("style");
  if (window.ShadyCSS.nativeShadow && l !== null)
    t.insertBefore(l.cloneNode(!0), t.firstChild);
  else if (e) {
    a.insertBefore(o, a.firstChild);
    const c = /* @__PURE__ */ new Set();
    c.add(o), pe(e, c);
  }
}, bs = (n, t, e) => {
  if (!e || typeof e != "object" || !e.scopeName)
    throw new Error("The `scopeName` option is required.");
  const s = e.scopeName, i = M.has(t), r = it && t.nodeType === 11 && !!t.host, o = r && !be.has(s), a = o ? document.createDocumentFragment() : t;
  if (us(n, a, Object.assign({ templateFactory: fs(s) }, e)), o) {
    const l = M.get(a);
    M.delete(a);
    const c = l.value instanceof wt ? l.value.template : void 0;
    _s(s, a, c), Ot(t, t.firstChild), t.appendChild(a), M.set(t, l);
  }
  !i && r && window.ShadyCSS.styleElement(t.host);
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var we;
window.JSCompiler_renameProperty = (n, t) => n;
const vt = {
  toAttribute(n, t) {
    switch (t) {
      case Boolean:
        return n ? "" : null;
      case Object:
      case Array:
        return n == null ? n : JSON.stringify(n);
    }
    return n;
  },
  fromAttribute(n, t) {
    switch (t) {
      case Boolean:
        return n !== null;
      case Number:
        return n === null ? null : Number(n);
      case Object:
      case Array:
        return JSON.parse(n);
    }
    return n;
  }
}, Se = (n, t) => t !== n && (t === t || n === n), mt = {
  attribute: !0,
  type: String,
  converter: vt,
  reflect: !1,
  hasChanged: Se
}, ft = 1, gt = 4, yt = 8, _t = 16, $t = "finalized";
class ve extends HTMLElement {
  constructor() {
    super(), this.initialize();
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   */
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this._classProperties.forEach((e, s) => {
      const i = this._attributeNameForProperty(s, e);
      i !== void 0 && (this._attributeToPropertyMap.set(i, s), t.push(i));
    }), t;
  }
  /**
   * Ensures the private `_classProperties` property metadata is created.
   * In addition to `finalize` this is also called in `createProperty` to
   * ensure the `@property` decorator can add property metadata.
   */
  /** @nocollapse */
  static _ensureClassProperties() {
    if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
      this._classProperties = /* @__PURE__ */ new Map();
      const t = Object.getPrototypeOf(this)._classProperties;
      t !== void 0 && t.forEach((e, s) => this._classProperties.set(s, e));
    }
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist
   * and stores a PropertyDeclaration for the property with the given options.
   * The property setter calls the property's `hasChanged` property option
   * or uses a strict identity check to determine whether or not to request
   * an update.
   *
   * This method may be overridden to customize properties; however,
   * when doing so, it's important to call `super.createProperty` to ensure
   * the property is setup correctly. This method calls
   * `getPropertyDescriptor` internally to get a descriptor to install.
   * To customize what properties do when they are get or set, override
   * `getPropertyDescriptor`. To customize the options for a property,
   * implement `createProperty` like this:
   *
   * static createProperty(name, options) {
   *   options = Object.assign(options, {myOption: true});
   *   super.createProperty(name, options);
   * }
   *
   * @nocollapse
   */
  static createProperty(t, e = mt) {
    if (this._ensureClassProperties(), this._classProperties.set(t, e), e.noAccessor || this.prototype.hasOwnProperty(t))
      return;
    const s = typeof t == "symbol" ? Symbol() : `__${t}`, i = this.getPropertyDescriptor(t, s, e);
    i !== void 0 && Object.defineProperty(this.prototype, t, i);
  }
  /**
   * Returns a property descriptor to be defined on the given named property.
   * If no descriptor is returned, the property will not become an accessor.
   * For example,
   *
   *   class MyElement extends LitElement {
   *     static getPropertyDescriptor(name, key, options) {
   *       const defaultDescriptor =
   *           super.getPropertyDescriptor(name, key, options);
   *       const setter = defaultDescriptor.set;
   *       return {
   *         get: defaultDescriptor.get,
   *         set(value) {
   *           setter.call(this, value);
   *           // custom action.
   *         },
   *         configurable: true,
   *         enumerable: true
   *       }
   *     }
   *   }
   *
   * @nocollapse
   */
  static getPropertyDescriptor(t, e, s) {
    return {
      // tslint:disable-next-line:no-any no symbol in index
      get() {
        return this[e];
      },
      set(i) {
        const r = this[t];
        this[e] = i, this.requestUpdateInternal(t, r, s);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  /**
   * Returns the property options associated with the given property.
   * These options are defined with a PropertyDeclaration via the `properties`
   * object or the `@property` decorator and are registered in
   * `createProperty(...)`.
   *
   * Note, this method should be considered "final" and not overridden. To
   * customize the options for a given property, override `createProperty`.
   *
   * @nocollapse
   * @final
   */
  static getPropertyOptions(t) {
    return this._classProperties && this._classProperties.get(t) || mt;
  }
  /**
   * Creates property accessors for registered properties and ensures
   * any superclasses are also finalized.
   * @nocollapse
   */
  static finalize() {
    const t = Object.getPrototypeOf(this);
    if (t.hasOwnProperty($t) || t.finalize(), this[$t] = !0, this._ensureClassProperties(), this._attributeToPropertyMap = /* @__PURE__ */ new Map(), this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
      const e = this.properties, s = [
        ...Object.getOwnPropertyNames(e),
        ...typeof Object.getOwnPropertySymbols == "function" ? Object.getOwnPropertySymbols(e) : []
      ];
      for (const i of s)
        this.createProperty(i, e[i]);
    }
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */
  static _attributeNameForProperty(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  /**
   * Returns true if a property should request an update.
   * Called when a property value is set and uses the `hasChanged`
   * option for the property if present or a strict identity check.
   * @nocollapse
   */
  static _valueHasChanged(t, e, s = Se) {
    return s(t, e);
  }
  /**
   * Returns the property value for the given attribute value.
   * Called via the `attributeChangedCallback` and uses the property's
   * `converter` or `converter.fromAttribute` property option.
   * @nocollapse
   */
  static _propertyValueFromAttribute(t, e) {
    const s = e.type, i = e.converter || vt, r = typeof i == "function" ? i : i.fromAttribute;
    return r ? r(t, s) : t;
  }
  /**
   * Returns the attribute value for the given property value. If this
   * returns undefined, the property will *not* be reflected to an attribute.
   * If this returns null, the attribute will be removed, otherwise the
   * attribute will be set to the value.
   * This uses the property's `reflect` and `type.toAttribute` property options.
   * @nocollapse
   */
  static _propertyValueToAttribute(t, e) {
    if (e.reflect === void 0)
      return;
    const s = e.type, i = e.converter;
    return (i && i.toAttribute || vt.toAttribute)(t, s);
  }
  /**
   * Performs element initialization. By default captures any pre-set values for
   * registered properties.
   */
  initialize() {
    this._updateState = 0, this._updatePromise = new Promise((t) => this._enableUpdatingResolver = t), this._changedProperties = /* @__PURE__ */ new Map(), this._saveInstanceProperties(), this.requestUpdateInternal();
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */
  _saveInstanceProperties() {
    this.constructor._classProperties.forEach((t, e) => {
      if (this.hasOwnProperty(e)) {
        const s = this[e];
        delete this[e], this._instanceProperties || (this._instanceProperties = /* @__PURE__ */ new Map()), this._instanceProperties.set(e, s);
      }
    });
  }
  /**
   * Applies previously saved instance properties.
   */
  _applyInstanceProperties() {
    this._instanceProperties.forEach((t, e) => this[e] = t), this._instanceProperties = void 0;
  }
  connectedCallback() {
    this.enableUpdating();
  }
  enableUpdating() {
    this._enableUpdatingResolver !== void 0 && (this._enableUpdatingResolver(), this._enableUpdatingResolver = void 0);
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */
  disconnectedCallback() {
  }
  /**
   * Synchronizes property values when attributes change.
   */
  attributeChangedCallback(t, e, s) {
    e !== s && this._attributeToProperty(t, s);
  }
  _propertyToAttribute(t, e, s = mt) {
    const i = this.constructor, r = i._attributeNameForProperty(t, s);
    if (r !== void 0) {
      const o = i._propertyValueToAttribute(e, s);
      if (o === void 0)
        return;
      this._updateState = this._updateState | yt, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._updateState = this._updateState & ~yt;
    }
  }
  _attributeToProperty(t, e) {
    if (this._updateState & yt)
      return;
    const s = this.constructor, i = s._attributeToPropertyMap.get(t);
    if (i !== void 0) {
      const r = s.getPropertyOptions(i);
      this._updateState = this._updateState | _t, this[i] = // tslint:disable-next-line:no-any
      s._propertyValueFromAttribute(e, r), this._updateState = this._updateState & ~_t;
    }
  }
  /**
   * This protected version of `requestUpdate` does not access or return the
   * `updateComplete` promise. This promise can be overridden and is therefore
   * not free to access.
   */
  requestUpdateInternal(t, e, s) {
    let i = !0;
    if (t !== void 0) {
      const r = this.constructor;
      s = s || r.getPropertyOptions(t), r._valueHasChanged(this[t], e, s.hasChanged) ? (this._changedProperties.has(t) || this._changedProperties.set(t, e), s.reflect === !0 && !(this._updateState & _t) && (this._reflectingProperties === void 0 && (this._reflectingProperties = /* @__PURE__ */ new Map()), this._reflectingProperties.set(t, s))) : i = !1;
    }
    !this._hasRequestedUpdate && i && (this._updatePromise = this._enqueueUpdate());
  }
  /**
   * Requests an update which is processed asynchronously. This should
   * be called when an element should update based on some state not triggered
   * by setting a property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored. Returns the `updateComplete` Promise which is resolved
   * when the update completes.
   *
   * @param name {PropertyKey} (optional) name of requesting property
   * @param oldValue {any} (optional) old value of requesting property
   * @returns {Promise} A Promise that is resolved when the update completes.
   */
  requestUpdate(t, e) {
    return this.requestUpdateInternal(t, e), this.updateComplete;
  }
  /**
   * Sets up the element to asynchronously update.
   */
  async _enqueueUpdate() {
    this._updateState = this._updateState | gt;
    try {
      await this._updatePromise;
    } catch {
    }
    const t = this.performUpdate();
    return t != null && await t, !this._hasRequestedUpdate;
  }
  get _hasRequestedUpdate() {
    return this._updateState & gt;
  }
  get hasUpdated() {
    return this._updateState & ft;
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * You can override this method to change the timing of updates. If this
   * method is overridden, `super.performUpdate()` must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```
   * protected async performUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.performUpdate();
   * }
   * ```
   */
  performUpdate() {
    if (!this._hasRequestedUpdate)
      return;
    this._instanceProperties && this._applyInstanceProperties();
    let t = !1;
    const e = this._changedProperties;
    try {
      t = this.shouldUpdate(e), t ? this.update(e) : this._markUpdated();
    } catch (s) {
      throw t = !1, this._markUpdated(), s;
    }
    t && (this._updateState & ft || (this._updateState = this._updateState | ft, this.firstUpdated(e)), this.updated(e));
  }
  _markUpdated() {
    this._changedProperties = /* @__PURE__ */ new Map(), this._updateState = this._updateState & ~gt;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update.
   *
   * To await additional asynchronous work, override the `_getUpdateComplete`
   * method. For example, it is sometimes useful to await a rendered element
   * before fulfilling this Promise. To do this, first await
   * `super._getUpdateComplete()`, then any subsequent state.
   *
   * @returns {Promise} The Promise returns a boolean that indicates if the
   * update resolved without triggering another update.
   */
  get updateComplete() {
    return this._getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   *   class MyElement extends LitElement {
   *     async _getUpdateComplete() {
   *       await super._getUpdateComplete();
   *       await this._myChild.updateComplete;
   *     }
   *   }
   * @deprecated Override `getUpdateComplete()` instead for forward
   *     compatibility with `lit-element` 3.0 / `@lit/reactive-element`.
   */
  _getUpdateComplete() {
    return this.getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   *   class MyElement extends LitElement {
   *     async getUpdateComplete() {
   *       await super.getUpdateComplete();
   *       await this._myChild.updateComplete;
   *     }
   *   }
   */
  getUpdateComplete() {
    return this._updatePromise;
  }
  /**
   * Controls whether or not `update` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * @param _changedProperties Map of changed properties with old values
   */
  shouldUpdate(t) {
    return !0;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * @param _changedProperties Map of changed properties with old values
   */
  update(t) {
    this._reflectingProperties !== void 0 && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach((e, s) => this._propertyToAttribute(s, this[s], e)), this._reflectingProperties = void 0), this._markUpdated();
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   */
  updated(t) {
  }
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   */
  firstUpdated(t) {
  }
}
we = $t;
ve[we] = !0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const ws = (n, t) => (window.customElements.define(n, t), t), Ss = (n, t) => {
  const { kind: e, elements: s } = t;
  return {
    kind: e,
    elements: s,
    // This callback is called once the class is otherwise fully defined
    finisher(i) {
      window.customElements.define(n, i);
    }
  };
}, vs = (n) => (t) => typeof t == "function" ? ws(n, t) : Ss(n, t), $s = (n, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? Object.assign(Object.assign({}, t), { finisher(e) {
  e.createProperty(t.key, n);
} }) : {
  kind: "field",
  key: Symbol(),
  placement: "own",
  descriptor: {},
  // When @babel/plugin-proposal-decorators implements initializers,
  // do this instead of the initializer below. See:
  // https://github.com/babel/babel/issues/9260 extras: [
  //   {
  //     kind: 'initializer',
  //     placement: 'own',
  //     initializer: descriptor.initializer,
  //   }
  // ],
  initializer() {
    typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
  },
  finisher(e) {
    e.createProperty(t.key, n);
  }
}, As = (n, t, e) => {
  t.constructor.createProperty(e, n);
};
function It(n) {
  return (t, e) => e !== void 0 ? As(n, t, e) : $s(n, t);
}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const At = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Mt = Symbol();
class Vt {
  constructor(t, e) {
    if (e !== Mt)
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t;
  }
  // Note, this is a getter so that it's lazy. In practice, this means
  // stylesheets are not created until the first element instance is made.
  get styleSheet() {
    return this._styleSheet === void 0 && (At ? (this._styleSheet = new CSSStyleSheet(), this._styleSheet.replaceSync(this.cssText)) : this._styleSheet = null), this._styleSheet;
  }
  toString() {
    return this.cssText;
  }
}
const xs = (n) => new Vt(String(n), Mt), Es = (n) => {
  if (n instanceof Vt)
    return n.cssText;
  if (typeof n == "number")
    return n;
  throw new Error(`Value passed to 'css' function must be a 'css' function result: ${n}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
}, $e = (n, ...t) => {
  const e = t.reduce((s, i, r) => s + Es(i) + n[r + 1], n[0]);
  return new Vt(e, Mt);
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions || (window.litElementVersions = [])).push("2.5.1");
const ee = {};
class at extends ve {
  /**
   * Return the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * @nocollapse
   */
  static getStyles() {
    return this.styles;
  }
  /** @nocollapse */
  static _getUniqueStyles() {
    if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this)))
      return;
    const t = this.getStyles();
    if (Array.isArray(t)) {
      const e = (r, o) => r.reduceRight((a, l) => (
        // Note: On IE set.add() does not return the set
        Array.isArray(l) ? e(l, a) : (a.add(l), a)
      ), o), s = e(t, /* @__PURE__ */ new Set()), i = [];
      s.forEach((r) => i.unshift(r)), this._styles = i;
    } else
      this._styles = t === void 0 ? [] : [t];
    this._styles = this._styles.map((e) => {
      if (e instanceof CSSStyleSheet && !At) {
        const s = Array.prototype.slice.call(e.cssRules).reduce((i, r) => i + r.cssText, "");
        return xs(s);
      }
      return e;
    });
  }
  /**
   * Performs element initialization. By default this calls
   * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
   * captures any pre-set values for registered properties.
   */
  initialize() {
    super.initialize(), this.constructor._getUniqueStyles(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   * @returns {Element|DocumentFragment} Returns a node into which to render.
   */
  createRenderRoot() {
    return this.attachShadow(this.constructor.shadowRootOptions);
  }
  /**
   * Applies styling to the element shadowRoot using the [[`styles`]]
   * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
   * available and will fallback otherwise. When Shadow DOM is polyfilled,
   * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
   * is available but `adoptedStyleSheets` is not, styles are appended to the
   * end of the `shadowRoot` to [mimic spec
   * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */
  adoptStyles() {
    const t = this.constructor._styles;
    t.length !== 0 && (window.ShadyCSS !== void 0 && !window.ShadyCSS.nativeShadow ? window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((e) => e.cssText), this.localName) : At ? this.renderRoot.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : this._needsShimAdoptedStyleSheets = !0);
  }
  connectedCallback() {
    super.connectedCallback(), this.hasUpdated && window.ShadyCSS !== void 0 && window.ShadyCSS.styleElement(this);
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * @param _changedProperties Map of changed properties with old values
   */
  update(t) {
    const e = this.render();
    super.update(t), e !== ee && this.constructor.render(e, this.renderRoot, { scopeName: this.localName, eventContext: this }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach((s) => {
      const i = document.createElement("style");
      i.textContent = s.cssText, this.renderRoot.appendChild(i);
    }));
  }
  /**
   * Invoked on each update to perform rendering tasks. This method may return
   * any value renderable by lit-html's `NodePart` - typically a
   * `TemplateResult`. Setting properties inside this method will *not* trigger
   * the element to update.
   */
  render() {
    return ee;
  }
}
at.finalized = !0;
at.render = bs;
at.shadowRootOptions = { mode: "open" };
const Ps = $e`
    .agent {
        pointer-events: all;
        flex-grow: 1;
    }
    .agent-container {
        z-index: 999999;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #Clippy {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Clippy/clippy.png');
    }
    #Merlin {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Merlin/merlin.png');
    }
    #Bonzi {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Bonzi/bonzi.png');
    }
    #F1 {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/F1/f1.png');
    }
    #Genie {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Genie/genie.png');
    }
    #Genius {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Genius/genius.png');
    }
    #Links {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Links/links.png');
    }
    #Peedy {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Peedy/peedy.png');
    }
    #Rocky {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Rocky/rocky.png');
    }
    #Rover {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Rover/rover.png');
    }
`, Dt = class Dt {
};
Dt.State = { WAITING: 1, EXITED: 0 };
let k = Dt;
class Ts {
  constructor() {
    this.active = !1, this.createCallback = (t) => {
      this.onEmptyCallback = t;
    }, this.clear = () => {
      this._queue = [];
    }, this.progressQueue = () => {
      if (!this._queue.length) {
        this.onEmptyCallback();
        return;
      }
      const t = this._queue.shift();
      this.active = !0;
      const e = this.next.bind(this);
      t && t(e);
    }, this.next = () => {
      this.active = !1, this.progressQueue();
    }, this._queue = [];
  }
  enqueue(t) {
    this._queue.push(t), this._queue.length === 1 && !this.active && this.progressQueue();
  }
}
class Cs {
  async loadAgent(t) {
    return await fetch(
      "https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/" + t + "/agent.json"
    ).then((e) => e.json());
  }
  async loadSounds(t) {
    return await fetch(
      "https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/" + t + "/sounds-mp3.json"
    ).then((e) => e.json());
  }
}
class ks {
  constructor(t) {
    this.started = !1, this.exiting = !1, this.currentFrameIndex = 0, this.clippy = t, this.queue = new Ts(), this.loader = new Cs(), this.queue.createCallback(this.onQueueEmpty.bind(this));
  }
  async SetupData(t) {
    this.animations = await this.GetAgentData(
      t
    ), this.preloadSounds(
      await this.GetSoundData(t)
    );
  }
  GetFramesize() {
    var t;
    return (t = this.animations) == null ? void 0 : t.framesize;
  }
  async GetAgentData(t) {
    return await this.loader.loadAgent(t);
  }
  async GetSoundData(t) {
    return await this.loader.loadSounds(t);
  }
  changePos(t) {
    let e = new CustomEvent("backgroundState", {
      detail: {
        pos: t
      }
    });
    this.clippy.dispatchEvent(e);
  }
  clearTimeout() {
    clearTimeout(this.loop);
  }
  getRandomAnimationName(t) {
    const e = new Array(), s = new Array();
    if (this.animations)
      for (const i of this.animations.animations)
        e.push(i.name);
    if (t) {
      for (let r = 0; r < e.length; r++) {
        const o = e[r];
        o.indexOf(t) === 0 && s.push(o);
      }
      const i = Math.floor(Math.random() * s.length);
      return s[i];
    } else {
      const i = Math.floor(Math.random() * e.length);
      return e[i];
    }
  }
  hasAnimation(t) {
    var e;
    return ((e = this.animations) == null ? void 0 : e.animations.find((s) => s.name === t)) != null;
  }
  exitAnimation() {
    this.exiting = !0;
  }
  showAnimation(t, e) {
    return new Promise(() => {
      var s;
      return this.exiting = !1, this.hasAnimation(t) ? (this.currentAnimation = (s = this.animations) == null ? void 0 : s.animations.find(
        (i) => i.name === t
      ), this.currentFrameIndex = 0, this.currentFrame = void 0, this.started || (this.step(), this.started = !0), this.endCallback = e, !0) : !1;
    });
  }
  queueAnimation(t) {
    this.hasAnimation(t) && this.queue.enqueue((e) => {
      let s = !1;
      window.setTimeout(() => {
        s || this.exitAnimation();
      }, 5e3), this.showAnimation(t, (i) => {
        i === k.State.EXITED && (s = !0, e());
      });
    });
  }
  enqueueFunction(t) {
    this.queue.enqueue(t);
  }
  showIdleAnimation(t) {
    this.showAnimation(this.getRandomAnimationName("Idle"), t);
  }
  step() {
    var s;
    if (!this.currentAnimation)
      return;
    const t = Math.min(
      this.getNextAnimationFrame(),
      this.currentAnimation.frames.length - 1
    ), e = !this.currentFrame || this.currentFrameIndex !== t;
    this.currentFrameIndex = t, this.atLastFrame() && this.currentAnimation.useExitBranching || (this.currentFrame = this.currentAnimation.frames[this.currentFrameIndex]), this.draw(), this.playSound(), this.loop = setTimeout(
      this.step.bind(this),
      ((s = this.currentFrame) == null ? void 0 : s.duration) ?? 100
    ), this.endCallback && e && this.atLastFrame() && (this.currentAnimation.useExitBranching && !this.exiting ? this.endCallback(k.State.WAITING) : this.endCallback(k.State.EXITED));
  }
  preloadSounds(t) {
    if (this.animations)
      for (let e = 0; e < this.animations.sounds.length; e++) {
        const s = this.animations.sounds[e], i = t[Number(s)];
        i && (this.soundList == null ? this.soundList = [{ name: s, audio: new Audio(i) }] : this.soundList.push({ name: s, audio: new Audio(i) }));
      }
  }
  draw() {
    let t = [];
    this.currentFrame && (t = this.currentFrame.images || []);
    for (let e = 0; e < t.length; e++) {
      const s = t[e], i = -s[0] + "px " + -s[1] + "px";
      this.changePos(i);
    }
  }
  getNextAnimationFrame() {
    if (!this.currentAnimation || !this.currentFrame)
      return 0;
    const t = this.currentFrame, e = this.currentFrame.branching;
    if (this.exiting && t.exitBranch !== void 0)
      return t.exitBranch;
    if (e) {
      let s = Math.random() * 100;
      for (let i = 0; i < e.branches.length; i++) {
        const r = e.branches[i];
        if (s <= r.weight)
          return r.frameIndex;
        s -= r.weight;
      }
    }
    return this.currentFrameIndex + 1;
  }
  playSound() {
    var s, i;
    if (!this.currentFrame) return;
    const t = this.currentFrame.sound;
    if (!t)
      return;
    const e = (i = (s = this.soundList) == null ? void 0 : s.find((r) => r.name === t)) == null ? void 0 : i.audio;
    e && e.play();
  }
  atLastFrame() {
    return this.currentAnimation ? this.currentFrameIndex >= this.currentAnimation.frames.length - 1 : !0;
  }
  stopAnimating(t) {
    this.queue.clear(), t && this.exitAnimation();
  }
  onQueueEmpty() {
    this.showIdleAnimation((t) => {
      t === k.State.EXITED && this.onQueueEmpty();
    });
  }
}
const Ns = $e`
    .clippy-content {
        max-width: 200px;
        min-width: 120px;
        font-family: 'Microsoft Sans', sans-serif;
        font-size: 10pt;
    }
    .clippy-balloon {
        background: #ffc;
        border: 1px solid #a7a7a7;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        -webkit-box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        margin: 0 auto 20px;
        max-width: 200px;
        padding: 8px;
        position: relative;
    }

    .clippy-tip {
        border-left: 21px solid transparent;
        border-top: 20px solid rgba(0, 0, 0, 0.2);
        bottom: -25px;
        position: absolute;
        right: 85px;
    }
    .clippy-tip::before {
        border-left: 23px solid transparent;
        border-top: 23px solid #a7a7a7;
        bottom: 2px;
        content: '';
        position: absolute;
        right: 5px;
    }
    .clippy-tip::after {
        border-left: 21px solid transparent;
        border-top: 21px solid #ffc;
        bottom: 4px;
        content: '';
        position: absolute;
        right: 6px;
    }
`;
var Os = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, lt = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Us(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Os(t, e, i), i;
};
let K = class extends at {
  constructor() {
    super(...arguments), this.active = !1, this.WORD_SPEAK_TIME = 200, this.speakText = "", this.shownText = "", this.pauseWriting = !1;
  }
  static get styles() {
    return [Ns];
  }
  render() {
    return pt`
            ${this.speakText !== "" ? pt` <div id="balloon" class="clippy-balloon">
                      <div id="balloon-content" class="clippy-content">
                          ${this.shownText}
                      </div>
                      <div class="clippy-tip"></div>
                  </div>` : pt``}
        `;
  }
  updated(n) {
    n.forEach((t, e) => {
      if (e == "speakText" && this.speak(this.speakText), e == "pauseWriting") {
        if (t == null)
          return;
        this.pauseWriting === !0 ? this.pause() : this.resume();
      }
    });
  }
  speak(n) {
    this.sayWords(n);
  }
  sayWords(n) {
    this.active = !0;
    const t = n.split(/[^\S-]/), e = this.WORD_SPEAK_TIME;
    let s = 1;
    this.addWord = () => {
      this.active && (s > t.length ? (delete this.addWord, this.active = !1) : (this.shownText = t.slice(0, s).join(" "), s++, this.loop = setTimeout(this.addWord.bind(this), e)));
    }, this.addWord();
  }
  pause() {
    clearTimeout(this.loop);
  }
  resume() {
    this.addWord && this.addWord();
  }
};
lt([
  It({ type: String })
], K.prototype, "speakText", 2);
lt([
  It({ type: String })
], K.prototype, "shownText", 2);
lt([
  It({ type: Boolean })
], K.prototype, "pauseWriting", 2);
K = lt([
  vs("balloon-element")
], K);
var Rs = Object.defineProperty, Is = Object.getOwnPropertyDescriptor, v = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Is(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Rs(t, e, i), i;
};
let b = class extends E {
  constructor() {
    super(), this.pauseWriting = !1, this.mouseDown = !1, this.backgroundPosition = {
      "background-position": "0px 0px",
      width: "0px",
      height: "0px"
    }, this.name = "Clippy", this.hide = "false", this.top = 0, this.left = 0, this.width = 0, this.height = 0, this.speakText = "", this.hideElement = () => {
      this.stop(), this.animator.showAnimation("Hide", () => {
        this.pause();
      }), setTimeout(() => {
        this.hide = "true";
      }, 300);
    }, this.dragMouseDown = (n) => {
      n.preventDefault(), this.pos3 = n.clientX, this.pos4 = n.clientY, this.mouseDown = !0;
    }, this.elementDrag = (n) => {
      n.preventDefault(), this.mouseDown && (this.pos1 = this.pos3 - n.clientX, this.pos2 = this.pos4 - n.clientY, this.pos3 = n.clientX, this.pos4 = n.clientY, this.top = this.top - this.pos2, this.left = this.left - this.pos1);
    }, this.closeDragElement = () => {
      this.mouseDown = !1;
    }, this.pos1 = this.pos2 = this.pos3 = this.pos4 = 0, this.agentType = this.name, document.onmouseup = this.closeDragElement, this.animator = new ks(this), this.animator.SetupData(this.agentType).then(() => {
      let n = this.animator.GetFramesize();
      n && (this.width = n[0], this.height = n[1]), this.hide == "false" && this.showElement();
    }), this.addEventListener(
      "backgroundState",
      (n) => {
        this.backgroundPosition = {
          "background-position": n.detail.pos,
          width: this.width + "px",
          height: this.height + "px"
        };
      },
      !1
    );
  }
  static get styles() {
    return [Ps];
  }
  render() {
    let n = { top: this.top + "px", left: this.left + "px" };
    return V`
      <div
        id="clippy-agent"
        class="agent-container"
        style=${Jt(n)}
        ?hidden=${this.hide === "true"}
      >
        <balloon-element
          .speakText=${this.speakText}
          .pauseWriting=${this.pauseWriting}
        >
        </balloon-element>
        <div
          class="agent"
          id=${this.agentType}
          style=${Jt(this.backgroundPosition)}
          @dblclick="${this.onDoubleClick}"
          @mousedown="${this.dragMouseDown}"
          @mousemove="${this.elementDrag}"
        ></div>
      </div>
    `;
  }
  updated(n) {
    n.forEach((t, e) => {
      e == "hide" && this.animator.hasAnimation("Show") && (this.hide == "true" ? this.hideElement() : this.hide == "false" && this.showElement());
    });
  }
  speak(n) {
    this.speakText = n;
  }
  hideBalloon() {
    this.speakText = "";
  }
  animateElement() {
    const n = this.animator.getRandomAnimationName();
    if (n.indexOf("Idle") === 0)
      return this.animateElement();
    this.animator.queueAnimation(n);
  }
  queueAnimation(n) {
    this.animator.queueAnimation(n);
  }
  onQueueEmpty() {
    this.animator.showIdleAnimation((n) => {
      n === k.State.EXITED && this.onQueueEmpty();
    });
  }
  stop() {
    this.animator.stopAnimating(!0), this.hideBalloon();
  }
  showElement() {
    this.resume(), this.animator.queueAnimation("Show"), this.hide = "false";
  }
  pause() {
    this.animator.clearTimeout(), this.pauseWriting = !0;
  }
  resume() {
    this.animator.step(), this.pauseWriting = !1;
  }
  onDoubleClick() {
    var n;
    (n = this.animator) == null || n.stopAnimating(!1), this.animateElement();
  }
};
v([
  f({ type: Object })
], b.prototype, "backgroundPosition", 2);
v([
  f({ type: String })
], b.prototype, "name", 2);
v([
  f({ type: String })
], b.prototype, "hide", 2);
v([
  f({ type: Number })
], b.prototype, "top", 2);
v([
  f({ type: Number })
], b.prototype, "left", 2);
v([
  f({ type: Number })
], b.prototype, "width", 2);
v([
  f({ type: Number })
], b.prototype, "height", 2);
v([
  f({ type: String })
], b.prototype, "speakText", 2);
b = v([
  rt("clippy-element")
], b);
export {
  G as CatalogItem,
  Q as CatalogOverview,
  st as HelloWorld
};
