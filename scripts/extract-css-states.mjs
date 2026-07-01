/**
 * extract-css-states.mjs  (ESM)
 *
 * Item N da cadeia de automação DSS — fecha o gap CSS→meta de ESTADOS.
 *
 * Abordagem robusta (evita reimplementar aninhamento/`&`/BEM do SCSS):
 *   1. Compila `DssX.module.scss` → CSS PLANO com sass (resolve nesting; `var(--dss-*)`
 *      é preservado porque custom property é runtime, não variável sass).
 *   2. Parseia o CSS plano com postcss.
 *   3. Classifica cada regra em um estado de interação a partir do SELETOR já resolvido,
 *      ignorando negações `:not(...)` e EXCLUINDO blocos de tema `[data-theme=...]`
 *      (dark é tema, não estado de interação).
 *   4. Emite `visual.states.{state}` = [{ property, token, value }] (dedupe).
 *
 * Estados reconhecidos (schema visual.states): default, hover, focus, active, disabled, loading.
 * NÃO emite `readonly` (não está no schema) nem estados sob `[data-theme]`.
 *
 * Uso:
 *   node scripts/extract-css-states.mjs <DssComponente>     # inspeciona um componente
 *   node scripts/extract-css-states.mjs --all               # relatório de cobertura do repo
 *   node scripts/extract-css-states.mjs <DssComponente> --json   # imprime visual.states
 */

import * as sass from 'sass'
import postcss   from 'postcss'
import { SourceMapConsumer } from 'source-map-js'
import fs        from 'fs'
import path      from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const LOAD_PATHS = [path.join(ROOT, 'packages', 'core'), ROOT]

const COMPONENTS_DIRS = [
  path.join(ROOT, 'packages', 'core', 'components', 'base'),
  path.join(ROOT, 'packages', 'core', 'components', 'composed'),
]

const STATE_KEYS = ['default', 'hover', 'focus', 'active', 'disabled', 'loading']

// Marcadores de estado no seletor RESOLVIDO (após remover :not(...)).
// Ordem = precedência (o primeiro que casar classifica a regra).
const STATE_MARKERS = [
  ['disabled', /(--disabled\b|:disabled\b|\[disabled\])/],
  ['loading',  /(--loading\b|\[aria-busy)/],
  ['active',   /:active\b/],
  ['focus',    /(--focused\b|:focus(-visible|-within)?\b)/],
  ['hover',    /:hover\b/],
]

/** Extrai o primeiro token --dss-* de um valor CSS, ou null. */
function firstToken(value) {
  const m = value.match(/var\((--dss-[\w-]+)/)
  return m ? m[1] : null
}

/** Remove grupos :not(...) do seletor para não confundir negação com estado. */
function stripNot(selector) {
  let prev
  let s = selector
  do { prev = s; s = s.replace(/:not\([^()]*\)/g, ' ') } while (s !== prev)
  return s
}

/** Classifica um seletor resolvido em um estado (ou null se for tema/fora de escopo). */
function classify(selector) {
  if (/\[data-theme/.test(selector)) return null      // dark/tema — fora de escopo
  const clean = stripNot(selector)
  for (const [state, re] of STATE_MARKERS) {
    if (re.test(clean)) return state
  }
  // Sem marcador de interação: só conta como "default" se mirar o componente
  // (evita capturar helpers globais). Heurística: contém uma classe dss-*.
  return /\.dss-[\w-]+/.test(clean) ? 'default' : null
}

/** Compila o module.scss do componente para CSS plano + source map. */
function compileComponent(compDir) {
  const moduleScss = fs.readdirSync(compDir).find(f => f.endsWith('.module.scss'))
  if (!moduleScss) return null
  const result = sass.compile(path.join(compDir, moduleScss), {
    loadPaths: LOAD_PATHS,
    style: 'expanded',
    sourceMap: true,
    silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
  })
  return { css: result.css, map: result.sourceMap, compDir }
}

/** Normaliza a origem do source map para caminho relativo ao componente (ex.: "3-variants/_x.scss"). */
function relSource(src, compDir) {
  if (!src) return null
  let p = src
  try { if (src.startsWith('file:')) p = fileURLToPath(src) } catch { /* noop */ }
  const rel = path.relative(compDir, p)
  return rel.startsWith('..') ? path.basename(p) : rel.split(path.sep).join('/')
}

/** Extrai visual.states de um diretório de componente. */
export function extractStates(compDir) {
  const compiled = compileComponent(compDir)
  if (compiled == null) return null
  const { css, map } = compiled

  const consumer = map ? new SourceMapConsumer(map) : null
  const states = {}   // state -> Map(key -> {property, token, value, source})
  const root = postcss.parse(css)

  root.walkRules(rule => {
    // Uma regra pode ter vários seletores separados por vírgula.
    const selStates = new Set(
      rule.selectors.map(classify).filter(Boolean)
    )
    if (selStates.size === 0) return

    rule.walkDecls(decl => {
      if (decl.prop.startsWith('--')) return   // não catalogar definição de custom prop
      const token = firstToken(decl.value)
      let source = null
      if (consumer && decl.source?.start) {
        const orig = consumer.originalPositionFor({ line: decl.source.start.line, column: decl.source.start.column - 1 })
        source = relSource(orig.source, compDir)
      }
      const entry = { property: decl.prop, token, value: token ? null : decl.value.trim(), source }
      const key = `${decl.prop}|${token || decl.value.trim()}`
      for (const st of selStates) {
        ;(states[st] ??= new Map()).set(key, entry)
      }
    })
  })

  // Materializa Maps em arrays
  const out = {}
  for (const st of STATE_KEYS) {
    if (states[st]) out[st] = [...states[st].values()]
  }
  return out
}

// ── Runners ────────────────────────────────────────────────────────────────

function findComponentDirs() {
  const dirs = []
  for (const base of COMPONENTS_DIRS) {
    if (!fs.existsSync(base)) continue
    for (const e of fs.readdirSync(base, { withFileTypes: true })) {
      if (e.isDirectory()) dirs.push(path.join(base, e.name))
    }
  }
  return dirs
}

function runOne(name, asJson) {
  const dir = findComponentDirs().find(d => path.basename(d) === name)
  if (!dir) { console.error(`Componente não encontrado: ${name}`); process.exit(1) }
  const states = extractStates(dir)
  if (asJson) { console.log(JSON.stringify({ visual: { states } }, null, 2)); return }
  console.log(`\n=== ${name} — visual.states ===`)
  for (const st of STATE_KEYS) {
    const props = states[st]
    if (!props) { console.log(`  ${st.padEnd(9)} — AUSENTE`); continue }
    console.log(`  ${st.padEnd(9)} — ${props.length} props: ${props.map(p => p.property + (p.token ? `→${p.token}` : `=${p.value}`)).slice(0, 6).join(', ')}${props.length > 6 ? ' …' : ''}`)
  }
}

function runAll() {
  const dirs = findComponentDirs()
  const cover = Object.fromEntries(STATE_KEYS.map(s => [s, 0]))
  const missing = { active: [], disabled: [], loading: [] }
  let ok = 0, failed = []
  for (const dir of dirs) {
    const name = path.basename(dir)
    let states
    try { states = extractStates(dir) } catch (e) { failed.push(name); continue }
    if (!states) continue
    ok++
    for (const st of STATE_KEYS) if (states[st]) cover[st]++
    for (const st of ['active', 'disabled', 'loading']) if (!states[st]) missing[st].push(name)
  }
  console.log(`\n=== Cobertura de estados (${ok} componentes compilados; ${failed.length} falharam) ===`)
  for (const st of STATE_KEYS) {
    console.log(`  ${st.padEnd(9)} presente em ${cover[st]}/${ok}`)
  }
  console.log(`\n  Sem 'disabled': ${missing.disabled.length} | sem 'active': ${missing.active.length} | sem 'loading': ${missing.loading.length}`)
  if (failed.length) console.log(`  Falha de compilação: ${failed.slice(0, 10).join(', ')}${failed.length > 10 ? ' …' : ''}`)
}

// CLI só quando executado diretamente (não ao ser importado pelo emissor)
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2)
  if (args.includes('--all')) runAll()
  else if (args[0]) runOne(args[0], args.includes('--json'))
  else { console.error('Uso: node scripts/extract-css-states.mjs <DssComponente> [--json] | --all'); process.exit(1) }
}
