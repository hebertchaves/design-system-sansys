/**
 * emit-contract.mjs  (ESM)  —  PASSO 2 da cadeia de fonte única.
 *
 * Gate EMISSOR: lê os donos por eixo e emite `dss.contract.json` conforme
 * `docs/governance/dss.contract.schema.json`. O contrato é DERIVADO, nunca autorado (D1).
 *
 * Donos por eixo:
 *   identity/audit  ← dss.meta.json (+ tagline/classification editoriais no meta)
 *   api             ← types/*.types.ts (TS compiler): props/emits/slots/exposedRefs/vModel
 *   visual.states   ← extract-css-states.mjs (CSS compilado)
 *   visual.*        ← dss.meta.json (defaultPreview/dimensions)
 *   tokens          ← derivado de visual.states + visualProperties (dedupe + categoria por prefixo)
 *   a11y            ← meta.a11y (claims) VERIFICADOS via wcag-kit (âncora css/aria/test)
 *   bindingRules    ← princípios aplicáveis (derivado)
 *   sources/seal    ← arquivos físicos do componente + docs/Compliance/seals/<Comp>/
 *
 * Modo NÃO-BLOQUEANTE (default): emite best-effort, valida com Ajv, imprime relatório de gaps.
 *   --write   grava dss.contract.json no diretório do componente
 *   --strict  sai com código 1 se o contrato não validar ou houver âncora a11y reprovada
 *
 * Uso: node scripts/emit-contract.mjs DssInput [--write] [--strict]
 */

import ts   from 'typescript'
import Ajv  from 'ajv'
import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { extractStates } from './extract-css-states.mjs'
import { checkContrast, hasCssRule, resolveToken } from './wcag-kit.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const SCHEMA    = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/governance/dss.contract.schema.json'), 'utf8'))
const BASE_DIRS = ['packages/core/components/base', 'packages/core/components/composed'].map(d => path.join(ROOT, d))

// ── util ─────────────────────────────────────────────────────────────────────
const read = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null
const exists = f => fs.existsSync(f)

// Coage phase (que driftou: pode vir "1", "Fase 1", 1) para inteiro; default 1.
function coercePhase(v) {
  if (typeof v === 'number' && Number.isInteger(v)) return v
  const m = String(v ?? '').match(/\d+/)
  return m ? parseInt(m[0], 10) : 1
}

function findCompDir(name) {
  for (const base of BASE_DIRS) {
    const d = path.join(base, name)
    if (fs.existsSync(d)) return d
  }
  return null
}

// Rollout incremental: o gate só enforça componentes que JÁ têm dss.contract.json
// (à medida que o backfill escala, cada componente entra no gate automaticamente).
function findComponentsWithContract() {
  const out = []
  for (const base of BASE_DIRS) {
    if (!fs.existsSync(base)) continue
    for (const e of fs.readdirSync(base, { withFileTypes: true })) {
      if (e.isDirectory() && exists(path.join(base, e.name, 'dss.contract.json'))) out.push(e.name)
    }
  }
  return out.sort()
}

// ── API ← types.ts (TS compiler) ─────────────────────────────────────────────
const jsDocFirst = (m, sf) => {
  for (const r of ts.getLeadingCommentRanges(sf.text, m.pos) || []) {
    if (r.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
      const lines = sf.text.slice(r.pos, r.end).replace(/^\/\*\*?/, '').replace(/\*\/$/, '')
        .split(/\r?\n/).map(l => l.replace(/^\s*\*?\s?/, '').trim()).filter(l => l && !l.startsWith('@'))
      if (lines.length) return lines[0]
    }
  }
  return ''
}
const jsDocTag = (m, sf, tag) => {
  for (const r of ts.getLeadingCommentRanges(sf.text, m.pos) || []) {
    const txt = sf.text.slice(r.pos, r.end)
    const mt = txt.match(new RegExp(`@${tag}\\s+([^\\n*]+)`))
    if (mt) return mt[1].trim()
  }
  return null
}

function parseTypes(typesFile) {
  const src = read(typesFile)
  if (src == null) return { unions: {}, props: [], events: [], slots: [], expose: [] }
  const sf = ts.createSourceFile(typesFile, src, ts.ScriptTarget.Latest, true)
  const out = { unions: {}, props: [], events: [], slots: [], expose: [] }
  ts.forEachChild(sf, node => {
    if (ts.isTypeAliasDeclaration(node) && node.type) {
      const members = []
      const collect = t => { if (ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal)) members.push(t.literal.text) }
      if (ts.isUnionTypeNode(node.type)) node.type.types.forEach(collect); else collect(node.type)
      if (members.length) out.unions[node.name.text] = members
      return
    }
    if (!ts.isInterfaceDeclaration(node)) return
    const name = node.name.text
    if (/Props$/.test(name)) {
      for (const m of node.members) {
        if (ts.isPropertySignature(m) && m.name) {
          out.props.push({
            name: m.name.getText(sf).replace(/^['"]|['"]$/g, ''),
            type: m.type ? m.type.getText(sf) : '',
            required: !m.questionToken,
            default: jsDocTag(m, sf, 'default'),
            desc: jsDocFirst(m, sf),
          })
        }
      }
    } else if (/Slots$/.test(name)) {
      // O ESCOPO e a OBRIGATORIEDADE do slot já estavam na assinatura TS e eram
      // descartados (o contrato gravava `scope: null` fixo). Sem eles, o Preview
      // Frame não tinha como saber que o `default` do DssField é ESTRUTURAL —
      // ele entrega `{ fieldId }` esperando que você monte o controle. O frame
      // renderizava um <span> de demo e o componente aparecia como moldura vazia,
      // divergindo da página de teste. Ver DEBITO_ABERTO.
      for (const m of node.members) {
        if (!((ts.isPropertySignature(m) || ts.isMethodSignature(m)) && m.name)) continue
        // Assinaturas aceitas: `nome: (scope: {...}) => X` e `nome(scope: {...}): X`
        const fn = ts.isMethodSignature(m)
          ? m
          : (m.type && ts.isFunctionTypeNode(m.type) ? m.type : null)
        const p0 = fn?.parameters?.[0]
        const chaves = p0?.type && ts.isTypeLiteralNode(p0.type)
          ? p0.type.members.filter(x => x.name).map(x => x.name.getText(sf))
          : []
        out.slots.push({
          name: m.name.getText(sf).replace(/^['"]|['"]$/g, ''),
          scope: chaves.length ? chaves.join(', ') : null,
          required: !m.questionToken,
          desc: jsDocFirst(m, sf),
        })
      }
    } else if (/Emits$/.test(name)) {
      for (const m of node.members) if (ts.isCallSignatureDeclaration(m) && m.parameters.length) {
        const p0 = m.parameters[0]
        if (p0.type && ts.isLiteralTypeNode(p0.type) && ts.isStringLiteral(p0.type.literal))
          out.events.push({ name: p0.type.literal.text, payload: m.parameters[1]?.type ? m.parameters[1].type.getText(sf) : undefined, desc: jsDocFirst(m, sf) })
      }
    } else if (/Expose$/.test(name)) {
      for (const m of node.members) if ((ts.isPropertySignature(m) || ts.isMethodSignature(m)) && m.name)
        out.expose.push({ name: m.name.getText(sf).replace(/^['"]|['"]$/g, ''), type: m.type ? m.type.getText(sf) : '', description: jsDocFirst(m, sf) })
    }
  })
  return out
}

// controlHint derivado do type/validValues (§4.1.1) — campo de SAÍDA, nunca autorado
const BRANDY = /brand/i, COLORY = /color|feedback/i
function deriveControlHint(type, validValues, unionName) {
  const t = (type || '').trim()
  if (/^boolean$/.test(t)) return 'toggle'
  if (/^number$/.test(t)) return 'stepper'
  if (validValues && validValues.length) {
    if (BRANDY.test(unionName || '')) return 'picker-brand'
    if (COLORY.test(unionName || '')) return t.includes('feedback') ? 'picker-feedback' : 'picker-color'
    return validValues.length <= 4 ? 'segmented' : 'select'
  }
  return 'text'
}

function buildApi(types) {
  const props = types.props.map(p => {
    // resolve validValues: type é nome de union OU union inline de literais
    let unionName = null, validValues
    const bare = p.type.replace(/\s*\|\s*null$/, '').trim()
    if (types.unions[bare]) { unionName = bare; validValues = types.unions[bare] }
    else if (/'([^']+)'/.test(p.type)) { validValues = [...p.type.matchAll(/'([^']+)'/g)].map(m => m[1]) }
    const out = { name: p.name, type: p.type, controlHint: deriveControlHint(p.type, validValues, unionName) }
    if (p.default != null) out.default = /^(true|false)$/.test(p.default) ? p.default === 'true' : p.default.replace(/^['"]|['"]$/g, '')
    if (p.required) out.required = true
    if (p.desc) out.description = p.desc
    if (validValues) out.validValues = validValues
    return out
  })
  const emits = types.events.map(e => ({ name: e.name, ...(e.payload ? { payload: e.payload } : {}), ...(e.desc ? { description: e.desc } : {}) }))
  const slots = types.slots.map(s => ({
    name: s.name,
    scope: s.scope ?? null,
    ...(s.required ? { required: true } : {}),
    ...(s.desc ? { description: s.desc } : {}),
  }))
  const api = { props, emits, slots }
  if (types.expose.length) api.exposedRefs = types.expose
  const hasModel = props.some(p => p.name === 'modelValue') && emits.some(e => e.name === 'update:modelValue')
  if (hasModel) api.vModel = { prop: 'modelValue', event: 'update:modelValue' }
  return api
}

// ── tokens ← dedupe de visual.states + visualProperties, categoria por prefixo ──
function tokenCategory(name) {
  const m = name.replace(/^--dss-/, '')
  if (/^spacing|^min-w|^gap/.test(m)) return 'spacing'
  if (/^action|^feedback|^surface|^text|^gray|^border-color|^primary/.test(m)) return 'color'
  if (/^font|^line-height|^letter/.test(m)) return 'typography'
  if (/^radius|^border/.test(m)) return 'border'
  if (/^duration|^ease|^motion/.test(m)) return 'motion'
  if (/^shadow|^elevation/.test(m)) return 'elevation'
  if (/^z-/.test(m)) return 'z-index'
  return 'other'
}
function buildTokens(states, meta) {
  const inst = new Map()
  // Defensivo: extrai APENAS tokens --dss-* de qualquer string (ignora lixo
  // como descrições no campo `token` do meta; lida com compostos "--dss-a / --dss-b").
  const addFrom = (str, where) => {
    if (!str) return
    for (const m of String(str).matchAll(/--dss-[\w-]+/g)) {
      const tok = m[0]
      const e = inst.get(tok) || { name: tok, usedIn: new Set() }
      e.usedIn.add(where); inst.set(tok, e)
    }
  }
  for (const [st, arr] of Object.entries(states || {})) for (const p of arr) addFrom(p.token, st)
  for (const vp of meta?.defaultPreview?.visualProperties || []) addFrom(vp.token, 'defaultPreview')
  const instances = [...inst.values()].map(e => ({ name: e.name, usedIn: [...e.usedIn] }))
  const categories = [...new Set(instances.map(i => tokenCategory(i.name)))].sort()
  return { categories, instances }
}

// ── a11y ← meta.a11y VERIFICADO (âncora css/aria/test) ───────────────────────
function verifyA11y(meta, compDir, api, gaps) {
  const a = meta.a11y
  if (!a) { gaps.push('a11y: meta.a11y ausente (MUST-verificado) — backfill de claims necessário'); return null }
  const out = { wcag: [], aria: a.aria || { role: 'textbox' }, keyboard: a.keyboard || [] }
  for (const c of a.wcag || []) {
    let verified = false, note = ''
    if (c.verifiedBy === 'css') {
      if (c.contrast) { const r = checkContrast(c.contrast.fg, c.contrast.bg, c.contrast.opts || {}); verified = c.contrast.large ? r.AAlarge : r.AAnormal; note = `ratio ${r.ratio}` }
      else { const h = hasCssRule(compDir, c.cssRule || {}); verified = h.ok; note = `${h.matches} regra(s)` }
    } else if (c.verifiedBy === 'aria') {
      verified = (api.props || []).some(p => /aria|required/i.test(p.name)); note = 'prop aria/required presente'
    } else if (c.verifiedBy === 'test') {
      verified = exists(path.join(compDir, `${path.basename(compDir)}.test.js`)); note = 'test.js presente'
    }
    if (!verified) gaps.push(`a11y ${c.criterion} (verifiedBy ${c.verifiedBy}): ÂNCORA REPROVADA — ${note}`)
    out.wcag.push({ criterion: c.criterion, level: c.level, implementation: c.implementation, verifiedBy: c.verifiedBy })
  }
  return out
}

// ── bindingRules ← princípios aplicáveis (derivado) ──────────────────────────
function buildBindingRules(api) {
  const rules = [{ id: 'P01', name: 'Token First', appliesTo: ['visual.states'] }]
  if ((api.slots || []).some(s => /prepend|append|icon/i.test(s.name)))
    rules.push({ id: 'P14', name: 'Icon Composition', appliesTo: ['api.slots'] })
  return rules
}

// ── sources / seal (arquivo físico) ──────────────────────────────────────────
function firstFile(dir, re) { return exists(dir) ? (fs.readdirSync(dir).find(f => re.test(f)) || null) : null }
function buildSources(compDir, name) {
  const rel = f => f ? path.relative(compDir, f).split(path.sep).join('/') : undefined
  const l3dir = path.join(compDir, '3-variants'), l4dir = path.join(compDir, '4-output')
  const l4 = exists(l4dir) ? fs.readdirSync(l4dir).filter(f => /^_.*\.scss$/.test(f)).map(f => `4-output/${f}`) : []
  const sources = {
    structure: rel(path.join(compDir, '1-structure', firstFile(path.join(compDir, '1-structure'), /\.vue$/) || '')),
    scss: { L2: '2-composition/_base.scss', ...(firstFile(l3dir, /^_.*\.scss$/) ? { L3: `3-variants/${firstFile(l3dir, /^_.*\.scss$/)}` } : {}), ...(l4.length ? { L4: l4 } : {}) },
    types: `types/${firstFile(path.join(compDir, 'types'), /\.types\.ts$/)}`,
    docs: {
      ...(exists(path.join(compDir, `${name}.md`)) ? { normative: `${name}.md` } : {}),
      ...(firstFile(compDir, /_API\.md$/i) ? { api: firstFile(compDir, /_API\.md$/i) } : {}),
      ...(exists(path.join(compDir, 'README.md')) ? { readme: 'README.md' } : {}),
    },
  }
  const ex = firstFile(compDir, /\.example\.vue$/); if (ex) sources.examples = ex
  const tst = firstFile(compDir, /\.test\.js$/); if (tst) sources.tests = tst
  // selo = ARQUIVO FÍSICO (F1), não meta.seal
  const sealDir = path.join(ROOT, 'docs/Compliance/seals', name)
  const sealFile = firstFile(sealDir, /_SELO_.*\.md$/i)
  if (sealFile) sources.seal = `docs/Compliance/seals/${name}/${sealFile}`
  return { sources, sealPath: sealFile ? `docs/Compliance/seals/${name}/${sealFile}` : null }
}

// ── displayName derivado (§4.1.1) ────────────────────────────────────────────
function deriveDisplayName(name, meta) {
  if (meta.displayName) return meta.displayName
  return name.replace(/^Dss/, '').replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
}

// status DERIVADO: selo físico é a verdade (F1) → 'sealed'; senão normaliza meta.status
// (que driftou: sealed/conformant/resolvida/approved/review/pendente).
const STATUS_MAP = {
  approved: 'approved', conformant: 'approved', resolvida: 'approved', sealed: 'sealed',
  review: 'in-review', 'in-review': 'in-review', pendente: 'draft', draft: 'draft', deprecated: 'deprecated',
}
function deriveStatus(meta, sealPath) {
  if (sealPath) return 'sealed'
  return STATUS_MAP[meta.status] || 'draft'
}

// ── EMISSOR ──────────────────────────────────────────────────────────────────
function emit(name) {
  const compDir = findCompDir(name)
  if (!compDir) { console.error(`Componente não encontrado: ${name}`); process.exit(2) }
  const gaps = []
  const meta = JSON.parse(read(path.join(compDir, 'dss.meta.json')) || '{}')
  const typesFile = path.join(compDir, 'types', firstFile(path.join(compDir, 'types'), /\.types\.ts$/) || '')
  const types = parseTypes(typesFile)
  const states = extractStates(compDir)
  const { sources, sealPath } = buildSources(compDir, name)
  const api = buildApi(types)
  const status = deriveStatus(meta, sealPath)

  if (!meta.classification) gaps.push('identity.classification: ausente no meta (MUST-derivado) — backfill')
  if (!meta.tagline)        gaps.push('identity.tagline: ausente no meta (presence-gate) — backfill editorial')
  if (!sealPath)            gaps.push(`audit.sealPath: sem arquivo físico em docs/Compliance/seals/${name}/`)

  const contract = {
    schemaId: 'dss-component-contract@1',
    name,
    version: String(meta.dssVersion || '0'),
    identity: {
      displayName: deriveDisplayName(name, meta),
      tagline: meta.tagline || '',
      category: meta.category || '',
      classification: meta.classification || '',
      phase: coercePhase(meta.phase),
      status,
      goldenReference: meta.goldenReference || '',
      goldenContext: meta.goldenContext || '',
    },
    audit: {
      status,
      date: meta.auditDate || '1970-01-01',
      ...(meta.auditMode ? { mode: meta.auditMode } : {}),
      sealPath: sealPath || 'docs/Compliance/seals/__MISSING__',
    },
    api,
    visual: {
      defaultPreview: { props: meta.defaultPreview?.props || {}, ...(meta.defaultPreview?.demoSlots != null ? { slots: meta.defaultPreview.demoSlots } : {}) },
      dimensions: Object.fromEntries(Object.entries(meta.defaultPreview?.computedDimensions || {}).map(([k, v]) => [k, { value: v }])),
      states: states || {},
    },
    tokens: buildTokens(states, meta),
    a11y: verifyA11y(meta, compDir, api, gaps) || { wcag: [], aria: {}, keyboard: [] },
    antiPatterns: buildBindingRules(api).map(r => ({ rule: r.id })),
    bindingRules: buildBindingRules(api),
    dependencies: { dss: meta.dependencies?.dss || ['DssIcon'], quasar: meta.dependencies?.quasar || ['QInput'] },
    sources,
  }
  return { contract, gaps }
}

// ── run ──────────────────────────────────────────────────────────────────────
const argv    = process.argv.slice(2)
const write   = argv.includes('--write')
const strict  = argv.includes('--strict')
const all     = argv.includes('--all')
let   names   = argv.filter(a => !a.startsWith('--'))
if (all) names = findComponentsWithContract()
if (!names.length) {
  console.error('Uso: node scripts/emit-contract.mjs <Dss...> | --all  [--write] [--strict]')
  process.exit(2)
}

const validate = new Ajv({ allErrors: true, strict: false }).compile(SCHEMA)
let anyFail = false

for (const name of names) {
  const { contract, gaps } = emit(name)
  const valid = validate(contract)
  const anchorFail = gaps.some(g => /REPROVADA/.test(g))
  const fail = !valid || anchorFail

  console.log(`\n=== ${name} === ${valid ? '✅ schema' : '❌ schema'}${anchorFail ? ' · ❌ âncora a11y' : ''}`)
  if (!valid) for (const e of (validate.errors || []).slice(0, 8)) console.log(`  ✗ ${e.instancePath || '(root)'} ${e.message}`)
  for (const g of gaps) console.log(`  ⚠️ ${g}`)
  console.log(`  ${contract.api.props.length} props · ${contract.api.slots.length} slots · ${contract.api.emits.length} emits · ${Object.keys(contract.visual.states).length} estados · ${contract.tokens.instances.length} tokens · a11y ${contract.a11y.wcag.length}`)

  if (write) {
    fs.writeFileSync(path.join(findCompDir(name), 'dss.contract.json'), JSON.stringify(contract, null, 2) + '\n')
    console.log(`  → gravado`)
  }
  if (fail) anyFail = true
}

console.log(`\n${anyFail ? '❌' : '✅'} ${names.length} componente(s) processado(s)${anyFail ? ' — há contrato inválido / âncora reprovada' : ''}.`)
if (strict && anyFail) process.exit(1)
