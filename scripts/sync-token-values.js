/**
 * sync-token-values.js  (ESM)
 *
 * Fecha o ELO QUE FALTAVA da cadeia de automação DSS:
 *   CSS/tokens (fonte de verdade) → meta.json (campo "value")
 *
 * PROBLEMA QUE RESOLVE
 * --------------------
 * O campo `value` de cada entrada de `defaultPreview.visualProperties` era
 * DIGITADO À MÃO. Nada o verificava contra o token declarado, então o meta
 * podia dizer "font-size: 14px" enquanto `--dss-font-size-md` resolve para 16px.
 * Os scripts existentes só validavam o NOME do token e o caminho do `source` —
 * nunca o valor. Resultado: documentação "verde" mentindo sobre o render.
 *
 * O QUE FAZ
 * ---------
 * 1. Constrói um mapa token → valor resolvido, seguindo cadeias de var()
 *    (ex.: --dss-radius-md → --dss-spacing-2 → 0.5rem → 8px) e convertendo
 *    rem→px (raiz 16px) para casar com a convenção de px do meta.
 * 2. Para cada visualProperty cujo token resolve para uma DIMENSÃO (px/%/número),
 *    compara/corrige o campo `value`. Entradas cujo token resolve para COR
 *    mantêm `value: null` (convenção do meta — cor depende de brand/tema).
 *
 * MODOS
 *   --audit            (default) — relata divergências, exit 1 se houver. CI-safe.
 *   --fix              — reescreve os campos `value` divergentes no meta.json.
 *   --component=DssX   — restringe a um único componente (piloto).
 *
 * Uso:
 *   node scripts/sync-token-values.js --audit
 *   node scripts/sync-token-values.js --fix --component=DssInput
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const ROOT       = path.resolve(__dirname, '..')

const COMPONENTS_DIRS = [
  path.join(ROOT, 'packages', 'core', 'components', 'base'),
  path.join(ROOT, 'packages', 'core', 'components', 'composed'),
  path.join(ROOT, 'packages', 'core', 'components', 'stress-test'),
]
const TOKENS_DIRS = [
  path.join(ROOT, 'packages', 'core', 'tokens'),
  path.join(ROOT, 'packages', 'core', 'themes'),
]

const REM_BASE = 16 // px por rem (raiz)

// ── CLI ────────────────────────────────────────────────────────────────────────
const argv      = process.argv.slice(2)
const FIX       = argv.includes('--fix')
const compArg   = argv.find(a => a.startsWith('--component='))
const ONLY_COMP = compArg ? compArg.split('=')[1] : null

// ── Mapa de declarações de token (token → valor cru) ────────────────────────────

function buildRawTokenMap() {
  const map = new Map()
  const declRe = /(--dss-[\w-]+)\s*:\s*([^;]+);/g

  function scan(file) {
    if (!fs.existsSync(file)) return
    const content = fs.readFileSync(file, 'utf-8')
    let m
    while ((m = declRe.exec(content)) !== null) {
      const name = m[1]
      // remove comentários inline /* ... */ e espaços
      const raw = m[2].replace(/\/\*[\s\S]*?\*\//g, '').trim()
      // primeira declaração vence (globals antes de overrides de tema)
      if (!map.has(name)) map.set(name, raw)
    }
  }
  function walk(dir) {
    if (!fs.existsSync(dir)) return
    const stat = fs.statSync(dir)
    if (stat.isFile()) { if (dir.endsWith('.scss')) scan(dir); return }
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) walk(full)
      else if (e.name.endsWith('.scss')) scan(full)
    }
  }
  TOKENS_DIRS.forEach(walk)
  return map
}

// ── Resolução de um token até o valor literal ───────────────────────────────────

function resolveToken(token, rawMap, seen = new Set()) {
  if (seen.has(token)) return null // ciclo
  seen.add(token)

  const raw = rawMap.get(token)
  if (raw == null) return null

  // valor é var(--dss-y [, fallback]) → segue o primeiro token interno
  const varMatch = raw.match(/var\(\s*(--dss-[\w-]+)/)
  if (varMatch) return resolveToken(varMatch[1], rawMap, seen)

  return raw
}

/** Normaliza um valor literal para px quando for dimensão em rem. */
function normalizeValue(literal) {
  if (literal == null) return null
  const v = literal.trim()

  const rem = v.match(/^(-?\d*\.?\d+)rem$/)
  if (rem) {
    const px = parseFloat(rem[1]) * REM_BASE
    return `${+px.toFixed(4)}px`
  }
  return v
}

/** Classifica o tipo de um valor resolvido. */
function classify(value) {
  if (value == null) return 'unknown'
  const v = value.trim()
  if (/^#([0-9a-f]{3,8})$/i.test(v))                       return 'color'
  if (/^(rgb|rgba|hsl|hsla)\(/i.test(v))                   return 'color'
  if (/^(transparent|currentcolor|inherit)$/i.test(v))     return 'color'
  if (/rem$|px$|em$|%$|vh$|vw$/.test(v))                   return 'dimension'
  if (/^-?\d*\.?\d+$/.test(v))                             return 'dimension' // unitless (line-height)
  return 'other'
}

// ── computedDimensions → visualProperties (mapa de chaves) ────────────────────────
// computedDimensions usa camelCase (minHeight); visualProperties usa kebab (min-height).
const DIM_KEY_TO_PROP = {
  minHeight: 'min-height', minWidth: 'min-width',
  maxHeight: 'max-height', maxWidth: 'max-width',
  height: 'height',        width: 'width',
}

/**
 * Encontra a entrada de visualProperties que governa uma chave de dimensão,
 * desde que tenha EXATAMENTE um token --dss-*. Retorna o token ou null.
 * Match por property exata (ex.: "min-height") — dimensões têm nome limpo.
 */
function findDimToken(visualProperties, prop) {
  if (!Array.isArray(visualProperties)) return null
  for (const entry of visualProperties) {
    if ((entry.property || '').trim() !== prop) continue
    const tokens = [...(entry.token || '').matchAll(/(--dss-[\w-]+)/g)].map(m => m[1])
    if (tokens.length === 1) return tokens[0]
  }
  return null
}

// ── Coleta de componentes ───────────────────────────────────────────────────────

function findMetaPaths() {
  const out = []
  for (const base of COMPONENTS_DIRS) {
    if (!fs.existsSync(base)) continue
    for (const e of fs.readdirSync(base, { withFileTypes: true })) {
      if (!e.isDirectory()) continue
      const metaPath = path.join(base, e.name, 'dss.meta.json')
      if (fs.existsSync(metaPath)) out.push(metaPath)
    }
  }
  return out
}

// ── Main ─────────────────────────────────────────────────────────────────────────

function main() {
  const rawMap   = buildRawTokenMap()
  const findings = []   // value × token (visualProperties)
  const dimFindings = []  // computedDimensions divergente de token
  const dimEmergent = []  // computedDimensions sem token (literal/emergente) — preservado
  let   fixedCount = 0
  let   dimFixed   = 0
  let   fixedComps = 0
  let   checked    = 0

  for (const metaPath of findMetaPaths()) {
    let meta
    try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) } catch { continue }

    const compName = meta.component || path.basename(path.dirname(metaPath))
    if (ONLY_COMP && compName !== ONLY_COMP) continue

    const vp = meta?.defaultPreview?.visualProperties
    if (!Array.isArray(vp) || vp.length === 0) continue
    checked++

    let modified = false

    for (const entry of vp) {
      const tokenField = entry.token || ''
      // entrada com múltiplos tokens (ex: "a / b") → pula derivação automática
      const tokens = [...tokenField.matchAll(/(--dss-[\w-]+)/g)].map(m => m[1])
      if (tokens.length !== 1) continue

      const resolved = normalizeValue(resolveToken(tokens[0], rawMap))
      if (resolved == null) continue

      const kind = classify(resolved)
      if (kind !== 'dimension') continue // cores/outros mantêm value null (convenção)

      const current = entry.value
      if (current === resolved) continue // já correto

      // Shorthand multi-eixo (ex.: "0 16px") que JÁ contém o valor resolvido como
      // um dos lados → o token representa só um eixo; não sobrescrever (perderia
      // o outro eixo). Ex.: padding "0 16px" usando --dss-spacing-4 (16px).
      if (typeof current === 'string' && current.trim().includes(' ') && current.includes(resolved)) continue

      findings.push({
        comp: compName, property: entry.property, token: tokens[0],
        current: current ?? 'null', resolved,
      })

      if (FIX) { entry.value = resolved; modified = true; fixedCount++ }
    }

    // ── Pass 2: computedDimensions (derivação dimensional segura) ──────────────
    // Só deriva quando há uma entrada visualProperties com token --dss-* p/ a chave.
    // Caso contrário (literal/emergente) → NÃO toca; registra em dimEmergent.
    const cd = meta?.defaultPreview?.computedDimensions
    if (cd && typeof cd === 'object' && Object.keys(cd).length > 0) {
      for (const [key, curVal] of Object.entries(cd)) {
        const prop = DIM_KEY_TO_PROP[key]
        if (!prop) continue
        const token = findDimToken(vp, prop)
        if (!token) {
          // dimensão sem token correspondente → emergente/literal: preservar e sinalizar
          dimEmergent.push({ comp: compName, key, current: curVal })
          continue
        }
        // GUARDA Princípio #7: token de touch-target NÃO é a dimensão VISUAL.
        // Altura visual pode ser intencionalmente < touch target (ex.: DssFabAction
        // 40px visual vs 44px touch). Nunca derivar computedDimensions desses tokens.
        if (/touch-target/.test(token)) {
          dimEmergent.push({ comp: compName, key, current: curVal, note: 'touch-target (visual≠touch, P#7)' })
          continue
        }
        const resolved = normalizeValue(resolveToken(token, rawMap))
        if (resolved == null || classify(resolved) !== 'dimension') continue
        if (curVal === resolved) continue
        dimFindings.push({ comp: compName, key, token, current: curVal ?? 'null', resolved })
        if (FIX) { cd[key] = resolved; modified = true; dimFixed++ }
      }
    }

    if (FIX && modified) {
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n', 'utf-8')
      fixedComps++
    }
  }

  // ── Relatório ────────────────────────────────────────────────────────────────
  const verb = FIX ? '🔧 Corrigidas' : '⚠️  Divergências'

  if (findings.length) {
    console.log(`\n${verb} — value × token (visualProperties) (${findings.length}):\n`)
    for (const f of findings) {
      console.log(`  ${f.comp} › "${f.property}"  [${f.token}]`)
      console.log(`      meta: "${f.current}"   →   resolvido: "${f.resolved}"`)
    }
  }

  if (dimFindings.length) {
    console.log(`\n${verb} — computedDimensions × token (${dimFindings.length}):\n`)
    for (const f of dimFindings) {
      console.log(`  ${f.comp} › ${f.key}  [${f.token}]`)
      console.log(`      meta: "${f.current}"   →   resolvido: "${f.resolved}"`)
    }
  }

  // dimEmergent NÃO é erro — é diagnóstico (dimensão sem token = candidata a guarda runtime)
  if (dimEmergent.length) {
    console.log(`\nℹ️  computedDimensions SEM token correspondente (${dimEmergent.length}) — preservadas (emergente/literal; candidatas a guarda de regressão):\n`)
    for (const d of dimEmergent) console.log(`  ${d.comp} › ${d.key} = "${d.current}"`)
  }

  const totalDiv = findings.length + dimFindings.length
  if (totalDiv === 0) {
    console.log(`✅ value/dimensão × token: ${checked} componente(s), zero divergências.`)
    if (dimEmergent.length) console.log(`   (${dimEmergent.length} dimensão(ões) emergente(s) preservada(s) — ver acima)`)
    return
  }

  if (FIX) {
    console.log(`\n✅ ${fixedCount} value + ${dimFixed} computedDimensions corrigido(s) em ${fixedComps} componente(s).`)
    console.log('→ Execute npm run sync:visual-contract para propagar ao DSS_REFERENCIA_VISUAL.')
  } else {
    console.log(`\n${totalDiv} divergência(s) em ${checked} componente(s).`)
    console.log('→ Rode com --fix para derivar os valores a partir dos tokens.')
    process.exit(1)
  }
}

main()
