/**
 * sync-visual-contract.js  (ESM)
 *
 * Lê todos os dss.meta.json de packages/core/components/,
 * extrai campos de defaultPreview e regenera a seção auto-gerada em
 * docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md
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

// ── Helpers ────────────────────────────────────────────────────────────────────

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

/** Formata um objeto de props para exibição resumida */
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

// ── Geração da seção ───────────────────────────────────────────────────────────

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

  // 2. Gerar nova seção
  const newSection = buildAutoSection(metas)

  // 3. Ler o documento existente
  if (!fs.existsSync(VISUAL_DOC)) {
    console.error(`ERRO: documento não encontrado em ${VISUAL_DOC}`)
    process.exit(1)
  }
  let docContent = fs.readFileSync(VISUAL_DOC, 'utf-8')

  // 4. Substituir ou adicionar a seção delimitada
  const beginIdx = docContent.indexOf(BEGIN_MARKER)
  const endIdx   = docContent.indexOf(END_MARKER)

  if (beginIdx !== -1 && endIdx !== -1 && endIdx > beginIdx) {
    // Substituição: remove tudo entre os marcadores (inclusive)
    const before = docContent.slice(0, beginIdx)
    const after  = docContent.slice(endIdx + END_MARKER.length)
    docContent = before + newSection + after
    console.log('Seção auto-gerada substituída.')
  } else {
    // Não existe — adiciona ao final
    docContent = docContent.trimEnd() + '\n\n' + newSection + '\n'
    console.log('Seção auto-gerada adicionada ao final do documento.')
  }

  // 5. Gravar
  fs.writeFileSync(VISUAL_DOC, docContent, 'utf-8')
  console.log(`Documento atualizado: ${path.relative(ROOT, VISUAL_DOC)}`)
  console.log(`Total de componentes na tabela: ${metas.filter(m => m.component).length}`)
}

main()
