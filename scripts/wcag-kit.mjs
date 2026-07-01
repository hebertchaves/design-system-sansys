/**
 * wcag-kit.mjs  (ESM)
 *
 * Item O da cadeia de automação DSS — kit de asserções WCAG reutilizável para
 * VERIFICAR a âncora `verifiedBy: "css"` de a11y.wcag (contraste) sem browser.
 *
 * Decisão O1 (estática + matemática de token): resolve o valor real de um token
 * --dss-* para uma dada (brand, theme) percorrendo as custom properties compiladas
 * dos tokens, e calcula o contraste WCAG entre dois tokens. Determinístico, roda
 * em CI sem render. (O2 = axe/browser fica como camada de fidelidade opcional.)
 *
 * Prova de valor: reproduz o achado do Storybook (action-primary como fundo +
 * texto branco não atinge o AA mínimo) — sem montar página React.
 *
 * API:
 *   resolveToken(name, { brand, theme })            -> "#rrggbb" | null
 *   contrastRatio(colorA, colorB)                   -> número (1..21)
 *   checkContrast(fgToken, bgToken, { brand, theme, large })
 *        -> { fg, bg, ratio, AAnormal, AAlarge, AAui }
 *
 * CLI:
 *   node scripts/wcag-kit.mjs                        # demo: contraste primary+branco por brand
 *   node scripts/wcag-kit.mjs <fgToken> <bgToken> [brand] [theme]
 */

import * as sass from 'sass'
import postcss   from 'postcss'
import path      from 'path'
import { fileURLToPath } from 'url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const ROOT       = path.resolve(__dirname, '..')
const LOAD_PATHS = [path.join(ROOT, 'packages', 'core'), ROOT]

// ── Resolução de tokens ──────────────────────────────────────────────────────

let _scopes = null

/** Compila tokens/index.scss e indexa custom properties por escopo. */
function buildTokenScopes() {
  if (_scopes) return _scopes
  const { css } = sass.compile(path.join(ROOT, 'packages', 'core', 'tokens', 'index.scss'), {
    loadPaths: LOAD_PATHS, style: 'expanded',
    silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
  })
  const scopes = { base: {}, brand: {}, theme: {}, combo: {} }
  const root = postcss.parse(css)
  root.walkRules(rule => {
    for (const sel of rule.selectors) {
      let bucket = null
      if (sel === ':root') bucket = scopes.base
      else {
        const mBrand = sel.match(/^\[data-brand=(\w+)\]$/)
        const mTheme = sel.match(/^\[data-theme=(\w+)\]$/)
        const mCombo = sel.match(/^\[data-brand=(\w+)\]\[data-theme=(\w+)\]$/)
        if (mBrand)      bucket = (scopes.brand[mBrand[1]] ??= {})
        else if (mTheme) bucket = (scopes.theme[mTheme[1]] ??= {})
        else if (mCombo) bucket = (scopes.combo[`${mCombo[1]}:${mCombo[2]}`] ??= {})
      }
      if (!bucket) continue
      rule.walkDecls(d => { if (d.prop.startsWith('--dss-')) bucket[d.prop] = d.value.trim() })
    }
  })
  _scopes = scopes
  return scopes
}

/** Mapa efetivo de tokens para uma (brand, theme): base ← theme ← brand ← combo. */
function effectiveMap({ brand, theme } = {}) {
  const s = buildTokenScopes()
  const m = { ...s.base }
  if (theme && s.theme[theme]) Object.assign(m, s.theme[theme])
  if (brand && s.brand[brand]) Object.assign(m, s.brand[brand])
  if (brand && theme && s.combo[`${brand}:${theme}`]) Object.assign(m, s.combo[`${brand}:${theme}`])
  return m
}

/** Resolve um token --dss-* ao seu valor de cor terminal (segue cadeias var()). */
export function resolveToken(name, opts = {}) {
  const map = effectiveMap(opts)
  const seen = new Set()
  let cur = name.startsWith('var(') ? name : `var(${name})`
  for (let i = 0; i < 50; i++) {
    const m = cur.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*([^]*))?\)$/)
    if (!m) break                                  // não é var() → valor terminal
    const [, ref, fallback] = m
    if (seen.has(ref)) return null
    seen.add(ref)
    if (map[ref] != null) cur = map[ref].trim()
    else if (fallback != null) cur = fallback.trim()
    else return null
  }
  return /^#|^rgb/i.test(cur) ? cur : null
}

// ── Matemática de contraste WCAG ─────────────────────────────────────────────

function parseColor(str) {
  if (!str) return null
  str = str.trim()
  let m = str.match(/^#([0-9a-f]{3})$/i)
  if (m) { const h = m[1]; return { r: parseInt(h[0] + h[0], 16), g: parseInt(h[1] + h[1], 16), b: parseInt(h[2] + h[2], 16) } }
  m = str.match(/^#([0-9a-f]{6})$/i)
  if (m) { const h = m[1]; return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) } }
  m = str.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i)
  if (m) return { r: +m[1], g: +m[2], b: +m[3] }
  return null
}

function relLuminance({ r, g, b }) {
  const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

/** Razão de contraste WCAG (1..21) entre duas cores (hex, rgb() ou token --dss-*). */
export function contrastRatio(a, b, opts = {}) {
  const ca = parseColor(a.startsWith('--') ? resolveToken(a, opts) : a)
  const cb = parseColor(b.startsWith('--') ? resolveToken(b, opts) : b)
  if (!ca || !cb) return null
  const la = relLuminance(ca), lb = relLuminance(cb)
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

/** Verifica contraste de um par de tokens contra os limiares WCAG AA. */
export function checkContrast(fgToken, bgToken, opts = {}) {
  const ratio = contrastRatio(fgToken, bgToken, opts)
  if (ratio == null) return { fg: resolveToken(fgToken, opts), bg: resolveToken(bgToken, opts), ratio: null, AAnormal: null, AAlarge: null, AAui: null }
  const r = Math.round(ratio * 100) / 100
  return {
    fg: resolveToken(fgToken, opts), bg: resolveToken(bgToken, opts), ratio: r,
    AAnormal: r >= 4.5,     // texto normal
    AAlarge:  r >= 3.0,     // texto grande (>=18.66px bold / 24px)
    AAui:     r >= 3.0,     // componentes de UI / gráficos (1.4.11)
  }
}

/** Ergonomia p/ testes: retorna { pass, ...detalhe } contra o limiar AA aplicável. */
export function expectContrastAA(fgToken, bgToken, opts = {}) {
  const c = checkContrast(fgToken, bgToken, opts)
  return { pass: !!(opts.large ? c.AAlarge : c.AAnormal), ...c }
}

// ── Âncora `css` de presença (focus ring, touch target) ─────────────────────

import fs from 'fs'
const _cssCache = new Map()

function componentCss(compDir) {
  if (_cssCache.has(compDir)) return _cssCache.get(compDir)
  const moduleScss = fs.readdirSync(compDir).find(f => f.endsWith('.module.scss'))
  if (!moduleScss) { _cssCache.set(compDir, null); return null }
  const { css } = sass.compile(path.join(compDir, moduleScss), {
    loadPaths: LOAD_PATHS, style: 'expanded',
    silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
  })
  _cssCache.set(compDir, css)
  return css
}

/**
 * Verifica que existe, no CSS compilado do componente, ao menos uma regra cujo
 * seletor contém `selectorIncludes` e que declara `property` (opcionalmente com
 * `token`/`value`). Serve para âncoras css NÃO-contraste: focus ring, touch target.
 * Retorna { ok, matches } — âncora falha se ok=false.
 */
export function hasCssRule(compDir, { selectorIncludes, property, token, value } = {}) {
  const css = componentCss(compDir)
  if (css == null) return { ok: false, matches: 0 }
  let matches = 0
  const root = postcss.parse(css)
  root.walkRules(rule => {
    if (selectorIncludes && !rule.selector.includes(selectorIncludes)) return
    rule.walkDecls(d => {
      if (property && d.prop !== property) return
      if (token && !d.value.includes(token)) return
      if (value && !d.value.includes(value)) return
      matches++
    })
  })
  return { ok: matches > 0, matches }
}

// ── CLI ──────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
if (import.meta.url === `file://${process.argv[1]}`) {
  if (args.length >= 2) {
    const [fg, bg, brand, theme] = args
    console.log(JSON.stringify(checkContrast(fg, bg, { brand, theme }), null, 2))
  } else {
    console.log('DEMO — action-primary como fundo + texto branco (--dss-text-on-primary):\n')
    for (const brand of [undefined, 'hub', 'water', 'waste']) {
      const c = checkContrast('--dss-text-on-primary', '--dss-action-primary', { brand })
      const label = (brand || 'default(base)').padEnd(14)
      const verdict = c.AAnormal ? 'AA texto ✅' : c.AAlarge ? 'só AA grande/UI ⚠️' : 'FALHA AA ❌'
      console.log(`  ${label} fg ${c.fg}  bg ${c.bg}  ratio ${c.ratio}  → ${verdict}`)
    }
    console.log('\n(AA normal >= 4.5 · AA grande/UI >= 3.0)')
  }
}
