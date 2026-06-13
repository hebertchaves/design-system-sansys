/**
 * sync-visual-contract.js  (ESM)
 *
 * Lê todos os dss.meta.json de packages/core/components/,
 * extrai campos de defaultPreview e atualiza DSS_REFERENCIA_VISUAL_ANALISE.md em dois níveis:
 *
 *  1. Seção auto-gerada (resumo): delimitada por BEGIN/END:AUTO-GENERATED
 *     → colunas: Componente | Grupo | Props Default | Dimensões | demoContent
 *
 *  2. Tabelas por componente (declarativas): delimitadas por BEGIN/END:VISUAL-TABLE:DssXxx
 *     → geradas a partir de defaultPreview.visualProperties (quando presente)
 *     → ignoradas (mantidas como estão) quando visualProperties está ausente
 *
 * Uso: node scripts/sync-visual-contract.js
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const ROOT       = path.resolve(__dirname, '..')
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'components')
const VISUAL_DOC = path.join(ROOT, 'docs', 'governance', 'DSS_REFERENCIA_VISUAL_ANALISE.md')

const BEGIN_MARKER = '<!-- BEGIN:AUTO-GENERATED — NÃO EDITAR MANUALMENTE -->'
const END_MARKER   = '<!-- END:AUTO-GENERATED -->'

// ── Helpers — seção auto-gerada (resumo) ──────────────────────────────────────

/** Encontra todos os dss.meta.json recursivamente */
function findMetaFiles(dir) {
  const results = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...findMetaFiles(full))
    else if (entry.name === 'dss.meta.json') results.push(full)
  }
  return results
}

/** Formata objeto de props para exibição resumida */
function fmtProps(props) {
  if (!props || typeof props !== 'object') return '—'
  const pairs = Object.entries(props)
    .filter(([, v]) => v !== null && v !== undefined && v !== false)
    .map(([k, v]) => {
      if (typeof v === 'string')  return `${k}:${v}`
      if (typeof v === 'number')  return `${k}:${v}`
      if (typeof v === 'boolean') return k
      if (Array.isArray(v))       return `${k}:[…]`
      if (typeof v === 'object')  return `${k}:{…}`
      return `${k}:${v}`
    })
  return pairs.length ? pairs.join(', ') : '—'
}

/** Formata computedDimensions */
function fmtDims(dims) {
  if (!dims || typeof dims !== 'object') return '—'
  const pairs = Object.entries(dims).map(([k, v]) => `${k}:${v}`)
  return pairs.length ? pairs.join(', ') : '—'
}

/** Escapa pipe para uso em células de tabela Markdown */
function escapeMd(str) {
  if (typeof str !== 'string') return str
  return str.replace(/\|/g, '\\|')
}

/** Gera a seção auto-gerada de resumo */
function buildAutoSection(metas) {
  const now = new Date().toISOString()

  const rows = metas
    .filter(m => m.component)
    .sort((a, b) => (a.component || '').localeCompare(b.component || ''))
    .map(m => {
      const dp   = m.defaultPreview || {}
      const comp = escapeMd(m.component || '—')
      const grp  = escapeMd(m.previewGroup || '—')
      const prp  = escapeMd(fmtProps(dp.props))
      const dim  = escapeMd(fmtDims(dp.computedDimensions))
      const demo = escapeMd(dp.demoContent || '—')
      return `| ${comp} | ${grp} | ${prp} | ${dim} | ${demo} |`
    })
    .join('\n')

  return [
    BEGIN_MARKER,
    '## Seção Auto-Gerada: Contratos Visuais Default',
    '',
    '> Esta seção é regenerada automaticamente por `scripts/sync-visual-contract.js`.',
    '> **Não edite manualmente** — as alterações serão sobrescritas na próxima execução.',
    '',
    '| Componente | Grupo | Props Default | Dimensões | demoContent |',
    '|---|---|---|---|---|',
    rows,
    '',
    `_Gerado em: ${now}_`,
    END_MARKER,
  ].join('\n')
}

// ── Helpers — tabelas declarativas por componente ─────────────────────────────

/**
 * Renderiza uma célula de token:
 * - Tokens --dss-* ficam com backtick
 * - Valores nulos ou '—' ficam como '—'
 * - Demais strings (ex: "N/A — Componente estrutural") ficam sem backtick
 */
function renderToken(raw) {
  if (!raw || raw === '—') return '—'
  if (raw.startsWith('--dss-')) return `\`${raw}\``
  return raw
}

/**
 * Renderiza uma célula de valor físico:
 * - Valores concretos (px, %, números) ficam com backtick
 * - Valores nulos ou '—' ficam como '—'
 */
function renderValue(raw) {
  if (!raw || raw === '—') return '—'
  return `\`${raw}\``
}

/**
 * Gera tabela Markdown completa a partir de defaultPreview.visualProperties.
 * Cada entrada do array:
 * {
 *   "property": "min-height",
 *   "token":    "--dss-touch-target-md",   // null → '—'
 *   "value":    "44px",                    // null → '—'
 *   "source":   "defaultPreview / Seção 13.1" // null → '—'
 * }
 */
function buildVisualTable(visualProperties) {
  const header = [
    '| Propriedade | Token DSS Aplicado | Valor Físico Computado | Origem/Justificativa |',
    '| :--- | :--- | :---: | :--- |',
  ].join('\n')

  const rows = visualProperties.map(vp => {
    const prop   = `**${vp.property || '—'}**`
    const token  = renderToken(vp.token  ?? null)
    const value  = renderValue(vp.value  ?? null)
    const source = vp.source || '—'
    return `| ${prop} | ${token} | ${value} | ${source} |`
  })

  return header + '\n' + rows.join('\n')
}

/**
 * Substitui o conteúdo entre <!-- BEGIN:VISUAL-TABLE:Xxx --> e <!-- END:VISUAL-TABLE:Xxx -->
 * pela tabela gerada. Retorna o documento inalterado se os marcadores não existirem.
 */
function updateComponentTable(docContent, componentName, table) {
  const beginMarker = `<!-- BEGIN:VISUAL-TABLE:${componentName} -->`
  const endMarker   = `<!-- END:VISUAL-TABLE:${componentName} -->`

  const beginIdx = docContent.indexOf(beginMarker)
  const endIdx   = docContent.indexOf(endMarker)

  if (beginIdx === -1 || endIdx === -1 || endIdx <= beginIdx) return docContent

  const before = docContent.slice(0, beginIdx + beginMarker.length)
  const after  = docContent.slice(endIdx)

  return `${before}\n${table}\n${after}`
}

// ── Main ───────────────────────────────────────────────────────────────────────

function main() {
  // 1. Ler todos os meta
  const metaFiles = findMetaFiles(COMPONENTS)
  console.log(`Lendo ${metaFiles.length} arquivo(s) dss.meta.json…`)

  const metas = []
  for (const filePath of metaFiles) {
    try {
      const raw  = fs.readFileSync(filePath, 'utf-8')
      const data = JSON.parse(raw)
      metas.push(data)
    } catch (err) {
      console.warn(`  WARN: ${path.relative(ROOT, filePath)}: ${err.message}`)
    }
  }

  // 2. Ler o documento existente
  if (!fs.existsSync(VISUAL_DOC)) {
    console.error(`ERRO: documento não encontrado em ${VISUAL_DOC}`)
    process.exit(1)
  }
  let docContent = fs.readFileSync(VISUAL_DOC, 'utf-8')

  // 3. Atualizar seção de resumo auto-gerado
  const newSection = buildAutoSection(metas)
  const beginIdx   = docContent.indexOf(BEGIN_MARKER)
  const endIdx     = docContent.indexOf(END_MARKER)

  if (beginIdx !== -1 && endIdx !== -1 && endIdx > beginIdx) {
    const before = docContent.slice(0, beginIdx)
    const after  = docContent.slice(endIdx + END_MARKER.length)
    docContent   = before + newSection + after
    console.log('Seção auto-gerada substituída.')
  } else {
    docContent = docContent.trimEnd() + '\n\n' + newSection + '\n'
    console.log('Seção auto-gerada adicionada ao final do documento.')
  }

  // 4. Atualizar tabelas declarativas por componente (quando visualProperties presente)
  let componentTablesUpdated = 0
  for (const meta of metas) {
    const vp = meta?.defaultPreview?.visualProperties
    if (!Array.isArray(vp) || vp.length === 0) continue

    const table   = buildVisualTable(vp)
    const updated = updateComponentTable(docContent, meta.component, table)

    if (updated !== docContent) {
      docContent = updated
      componentTablesUpdated++
    }
  }

  if (componentTablesUpdated > 0) {
    console.log(`Tabelas declarativas regeneradas: ${componentTablesUpdated} componente(s)`)
  }

  // 5. Gravar documento (único write)
  fs.writeFileSync(VISUAL_DOC, docContent, 'utf-8')
  console.log(`Documento atualizado: ${path.relative(ROOT, VISUAL_DOC)}`)
  console.log(`Total de componentes na tabela: ${metas.filter(m => m.component).length}`)
}

main()
