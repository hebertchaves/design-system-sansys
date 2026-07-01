/**
 * POC (descartável) — DERIVA o modelo da página do DssInput a partir dos
 * artefatos canônicos (meta.json, README.md, API.md). Cada seção do contrato
 * v2.4 vira um nó { present, source, gap, data }. Quando o artefato não tem
 * o dado, `present=false` + `gap` explica o buraco — o POC RENDERIZA o gap.
 */
import meta from '@components/base/DssInput/dss.meta.json'
import readmeRaw from '@components/base/DssInput/README.md?raw'
import apiRaw from '@components/base/DssInput/DSSINPUT_API.md?raw'
import { findSection, parseTable, mdToHtml, splitSections } from './mdUtil.js'

// Selos: glob amplo p/ medir presença + divergência de case do path no meta.
const sealFiles = import.meta.glob('../../../../docs/**/*SELO*.md', { eager: true, query: '?raw', import: 'default' })
const sealKeys = Object.keys(sealFiles)

function allTables(md) {
  const lines = md.split(/\r?\n/)
  const tables = []
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*\|.*\|\s*$/.test(lines[i]) && lines[i + 1] && /^[\s|:-]+$/.test(lines[i + 1])) {
      const buf = []
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) buf.push(lines[i++])
      const t = parseTable(buf.join('\n'))
      if (t) tables.push(t)
    }
  }
  return tables
}

// ── Seção 1: Badges / selos ──────────────────────────────────────────────────
const sealPath = meta.seal || ''
const sealName = sealPath.split('/').pop()
const sealMatch = sealKeys.find((k) => k.endsWith(sealName))
const sealCaseMismatch = !!sealMatch && !sealKeys.some((k) => k.includes(sealPath.replace(/^DSS\//, '')))

// ── Seção 4: controles do playground derivados das tabelas de Props da API ──
function deriveControls() {
  const tables = allTables(apiRaw).filter((t) => t.headers.some((h) => /prop/i.test(h)))
  const controls = []
  const seen = new Set()
  for (const t of tables) {
    const iName = t.headers.findIndex((h) => /prop/i.test(h))
    const iType = t.headers.findIndex((h) => /tipo|type/i.test(h))
    const iVals = t.headers.findIndex((h) => /valor|values/i.test(h))
    const iDef = t.headers.findIndex((h) => /default/i.test(h))
    for (const r of t.rows) {
      const name = (r[iName] || '').replace(/`/g, '').trim()
      if (!name || seen.has(name) || name === 'modelValue') continue
      seen.add(name)
      const type = (r[iType] || '').toLowerCase()
      const valsRaw = iVals >= 0 ? r[iVals] : ''
      const enumVals = (valsRaw.match(/`([^`]+)`/g) || []).map((s) => s.replace(/`/g, ''))
      let control = 'text'
      if (/boolean/.test(type)) control = 'boolean'
      else if (enumVals.length > 1) control = 'enum'
      else if (/number/.test(type)) control = 'number'
      controls.push({ name, type: r[iType] || '', control, options: enumVals, def: (r[iDef] || '').replace(/`/g, '') })
    }
  }
  return controls
}

// ── Seção 5: estados derivados de meta.visualProperties (por sufixo de estado) ─
function deriveStates() {
  const vp = meta.defaultPreview?.visualProperties || []
  const stateOf = (p) => {
    const m = p.match(/\(([^)]+)\)/)
    return m ? m[1] : 'repouso'
  }
  const byState = {}
  for (const p of vp) {
    const st = stateOf(p.property)
    ;(byState[st] = byState[st] || []).push(p)
  }
  return byState
}

const readmeSec = (patterns) => findSection(readmeRaw, patterns)

export const model = {
  component: meta.component,
  // 1
  badges: {
    present: true, source: 'meta',
    data: { version: meta.dssVersion, status: meta.status, category: meta.category, golden: meta.goldenReference, seal: sealPath, sealFound: !!sealMatch, sealCaseMismatch },
    gap: !sealMatch ? 'arquivo de selo não encontrado pelo glob' : (sealCaseMismatch ? `path do meta usa case divergente do disco (latente em FS case-sensitive)` : null),
  },
  // 2
  description: (() => {
    const intro = readmeRaw.split(/\r?\n/).slice(1).find((l) => l.trim() && !l.startsWith('#') && !l.startsWith('>'))
    return { present: !!intro, source: 'README', data: intro || '', gap: 'meta sem campo `description`; intro do README é técnica ("baseado no Quasar q-input"), não orientada a produto (regra 2.2)' }
  })(),
  // 3
  whenUse: (() => {
    const s = readmeSec([/quando usar/])
    return { present: !!s, source: 'README', data: s ? mdToHtml(s.body) : null, gap: s ? null : 'README sem seção "## Quando usar"' }
  })(),
  whenNotUse: (() => {
    const s = readmeSec([/quando nao usar/])
    return { present: !!s, source: 'README', data: s ? mdToHtml(s.body) : null, gap: s ? null : 'README sem seção "## Quando NÃO usar" (+ tabela de alternativas)' }
  })(),
  // 4
  playground: { present: true, source: 'types/API + example.vue', controls: deriveControls(), defaultProps: meta.defaultPreview?.props || {} },
  // 5
  states: { present: true, source: 'meta.visualProperties', data: deriveStates() },
  // 6
  anatomy: (() => {
    const s = readmeSec([/camadas|filosofia/])
    return { present: !!s, source: 'README + SCSS', data: s ? mdToHtml(s.body) : null, gap: s ? 'derivado de prosa do README, não dos arquivos SCSS reais (ideal: ler 1-structure…4-output)' : 'sem seção de anatomia' }
  })(),
  // 7.1 / 7.2
  props: (() => {
    const tables = allTables(apiRaw).filter((t) => t.headers.some((h) => /prop/i.test(h)))
    const rows = tables.flatMap((t) => t.rows.map((r) => ({ cells: r, headers: t.headers })))
    return { present: rows.length > 0, source: 'API.md', count: rows.length, tables }
  })(),
  slots: (() => {
    const s = readmeSec([/slots/])
    const t = s ? parseTable(s.body) : null
    return { present: !!t, source: 'README/API', data: t, gap: t ? null : 'sem tabela de slots' }
  })(),
  events: (() => {
    const s = readmeSec([/emits|eventos|events/])
    const t = s ? parseTable(s.body) : null
    return { present: !!t, source: 'README/API', data: t, gap: t ? null : 'sem tabela de eventos' }
  })(),
  // 7.3
  tokens: { present: true, source: 'meta.visualProperties', data: meta.defaultPreview?.visualProperties || [], gap: 'contrato pede TIPOS de token; meta lista INSTÂNCIAS (property→token). Tipos vivem no README "Tokens Utilizados"' },
  // 7.4
  a11y: (() => {
    const s = readmeSec([/acessibilidade|wcag/])
    return { present: !!s, source: 'README', data: s ? mdToHtml(s.body) : null, gap: s ? null : 'README sem seção de Acessibilidade' }
  })(),
  // 8
  antiPatterns: (() => {
    const s = readmeSec([/anti.?pattern/])
    return { present: !!s, source: 'README', data: s ? mdToHtml(s.body) : null, gap: s ? null : 'README sem seção "## Anti-patterns" (pode estar no DssInput.md normativo — contrato aponta README)' }
  })(),
  // 9
  vinculantes: {
    present: !!meta.category,
    source: 'meta',
    data: { category: meta.category, pseudo: meta.pseudoElements ?? null, brightness: meta.brightness ?? null },
    gap: 'meta tem `category` mas NÃO tem campos de pseudo-elemento (::before/::after) nem brightness — seção 9 do contrato fica incompleta',
  },
  // 10
  references: { present: true, source: 'estático', data: ['DSS_TOKEN_REFERENCE.md', 'DSS_COMPONENT_ARCHITECTURE.md', 'DSS_GOLDEN_COMPONENTS.md', sealPath] },
}

// Diagnóstico extra: README diz "18 exemplos" mas example.vue tem N
export const diagnostics = {
  readmeClaimsExamples: (readmeRaw.match(/(\d+)\s+exemplos/) || [])[1] || '—',
  sectionCount: splitSections(readmeRaw).length,
}
