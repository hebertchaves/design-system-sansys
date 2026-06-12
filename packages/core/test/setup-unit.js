/**
 * Setup global do projeto "unit" (vitest + jsdom).
 *
 * O jsdom não implementa várias APIs de browser que o Quasar usa em
 * runtime (scroll, observers, matchMedia). Sem estes shims, suites
 * inteiras falham com "el[action] is not a function" e similares
 * (triagem da Onda P2/G3.2 — primeira execução da suíte completa).
 *
 * Shims são NO-OP fiéis: não simulam comportamento visual, apenas
 * impedem que chamadas de plataforma quebrem a montagem.
 */

// ── Scroll APIs (Quasar scroll utils chamam el.scrollTo/scrollBy) ──────────
for (const proto of [Element.prototype, HTMLElement.prototype]) {
  if (!proto.scrollTo) proto.scrollTo = () => {}
  if (!proto.scrollBy) proto.scrollBy = () => {}
  if (!proto.scrollIntoView) proto.scrollIntoView = () => {}
}
if (!window.scrollTo) window.scrollTo = () => {}

// ── matchMedia (dark mode / breakpoints) ───────────────────────────────────
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

// ── Observers ───────────────────────────────────────────────────────────────
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class {
    constructor() { this.root = null; this.rootMargin = ''; this.thresholds = [] }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return [] }
  }
}

// ── SVG SMIL (animações Quasar chamam beginElement/endElement em <animate>)
// Patch em Element.prototype: o jsdom não expõe SVGAnimateElement e a
// instância de <animate> pode não herdar de SVGElement.
for (const proto of [Element.prototype, typeof SVGElement !== 'undefined' ? SVGElement.prototype : null]) {
  if (!proto) continue
  if (!proto.beginElement) proto.beginElement = () => {}
  if (!proto.endElement) proto.endElement = () => {}
}
