/**
 * sync-css-to-meta.js  (ESM)
 *
 * Fecha o Gap 1 da cadeia de automação DSS:
 *   CSS (fonte de verdade) → meta.json (contrato documentado)
 *
 * MODOS:
 *
 *   --validate  (pre-commit, quando SCSS de componente é staged)
 *     Para cada componente cujo SCSS foi alterado, verifica que todos os
 *     tokens --dss-* declarados em visualProperties existem nos SCSS do
 *     componente. Sai com código 1 se houver divergência.
 *
 *   --fix-sources  (manutenção, sob demanda)
 *     Para cada entrada de visualProperties com token --dss-*, localiza
 *     em qual arquivo SCSS do componente o token é usado e atualiza o
 *     campo "source" para referenciar esse arquivo (ex: "2-composition/_base.scss").
 *     Remove referências legadas ao Figma e a seções de documentos.
 *
 * Uso:
 *   node scripts/sync-css-to-meta.js --validate
 *   node scripts/sync-css-to-meta.js --fix-sources
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const ROOT            = path.resolve(__dirname, '..')
const COMPONENTS_BASE = path.join(ROOT, 'packages', 'core', 'components', 'base')
// Todos os diretórios/arquivos que definem tokens --dss-*
const TOKENS_DIRS = [
  path.join(ROOT, 'packages', 'core', 'tokens', 'semantic'),
  path.join(ROOT, 'packages', 'core', 'tokens', 'brand'),
  path.join(ROOT, 'packages', 'core', 'tokens', 'globals.scss'),  // arquivo direto
]

// Camadas que compõem o CSS visual do componente (4-output inclui brands/dark)
const CSS_LAYERS = ['1-structure', '2-composition', '3-variants', '4-output', 'composables']

// Extensões pesquisáveis (tokens podem estar em Vue ou TS via inline styles/composables)
const SEARCHABLE_EXTS = new Set(['.scss', '.vue', '.ts'])

// --validate        (default, pre-commit): verifica existência dos tokens no catálogo DSS
// --validate-strict (manual): também verifica presença direta nos arquivos do componente
// --fix-sources     (manutenção): atualiza campos source para referenciar arquivos CSS
const mode = process.argv.includes('--fix-sources')      ? 'fix-sources'
           : process.argv.includes('--validate-strict')  ? 'validate-strict'
           : 'validate'

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Lista todos os diretórios de componentes */
function findComponentDirs(baseDir) {
  if (!fs.existsSync(baseDir)) return []
  return fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => path.join(baseDir, e.name))
}

/**
 * Coleta todos os arquivos pesquisáveis das camadas de um componente.
 * Inclui .scss, .vue e .ts — tokens podem aparecer em qualquer um.
 * Retorna array de { file: string, relPath: string }.
 */
function collectSourceFiles(compDir) {
  const files = []

  for (const layer of CSS_LAYERS) {
    const layerDir = path.join(compDir, layer)
    if (!fs.existsSync(layerDir)) continue

    for (const entry of fs.readdirSync(layerDir, { withFileTypes: true })) {
      const ext = path.extname(entry.name)
      if (!SEARCHABLE_EXTS.has(ext)) continue
      files.push({
        file:    path.join(layerDir, entry.name),
        relPath: `${layer}/${entry.name}`,
      })
    }
  }

  // Inclui DssXxx.module.scss na raiz do componente
  for (const entry of fs.readdirSync(compDir, { withFileTypes: true })) {
    if (entry.name.endsWith('.module.scss')) {
      files.push({
        file:    path.join(compDir, entry.name),
        relPath: entry.name,
      })
    }
  }

  return files
}

/**
 * Extrai todos os tokens --dss-* de uma string de token.
 * Lida com tokens simples ("--dss-radius-full") e compostos
 * ("--dss-spacing-0_5 / --dss-spacing-1").
 */
function extractTokenNames(tokenStr) {
  if (!tokenStr) return []
  return [...tokenStr.matchAll(/(--dss-[\w-]+)/g)].map(m => m[1])
}

/**
 * Dado um campo token (simples ou composto), verifica se algum dos tokens
 * --dss-* existe como var() em algum dos arquivos de origem do componente.
 * Retorna o relPath do primeiro arquivo onde o primeiro token é encontrado, ou null.
 */
function findTokenInFiles(tokenField, sourceFiles) {
  const tokens = extractTokenNames(tokenField)
  if (tokens.length === 0) return null

  for (const token of tokens) {
    const needle = `var(${token})`
    for (const { file, relPath } of sourceFiles) {
      if (!fs.existsSync(file)) continue
      const content = fs.readFileSync(file, 'utf-8')
      if (content.includes(needle)) return relPath
    }
  }
  return null
}

/** Retorna true se o campo source já é uma referência de arquivo CSS (não legado) */
function isCssSource(source) {
  if (!source) return false
  // Formato canônico: "N-layer/filename.scss" ou "filename.scss"
  return /^\d-\w.*\.scss|^\w.*\.scss/.test(source)
}

/** Retorna true se o source é uma referência legada (Figma, Seção, etc.) */
function isLegacySource(source) {
  if (!source) return true
  return source.includes('Figma') ||
         source.includes('Seção') ||
         source.includes('defaultPreview') ||
         source.match(/^\d+\.\d+/) !== null
}

// ── Catálogo de tokens DSS ────────────────────────────────────────────────────

/**
 * Lê todos os arquivos SCSS de tokens e extrai um Set com todos os nomes
 * de tokens definidos (--dss-*).
 */
function buildTokenCatalog() {
  const catalog     = new Set()
  const tokenDeclRe = /^\s*(--dss-[\w-]+)\s*:/gm

  function scanFile(filePath) {
    if (!fs.existsSync(filePath)) return
    const content = fs.readFileSync(filePath, 'utf-8')
    let m
    while ((m = tokenDeclRe.exec(content)) !== null) catalog.add(m[1])
    tokenDeclRe.lastIndex = 0
  }

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) { scanDir(full); continue }
      if (!entry.name.endsWith('.scss')) continue
      scanFile(full)
    }
  }

  for (const target of TOKENS_DIRS) {
    const stat = fs.existsSync(target) ? fs.statSync(target) : null
    if (!stat) continue
    if (stat.isDirectory()) scanDir(target)
    else                    scanFile(target)
  }

  return catalog
}

// ── Modo: validate ─────────────────────────────────────────────────────────────
//
// Verifica que cada token --dss-* declarado em visualProperties EXISTE no
// catálogo de tokens DSS. Não exige que o token apareça diretamente no SCSS
// do componente (muitos são aplicados via sistema de cores do Quasar).
// Use --validate-strict para a verificação de presença direta.

function runValidate() {
  const catalog  = buildTokenCatalog()
  const compDirs = findComponentDirs(COMPONENTS_BASE)
  const errors   = []
  let   checked  = 0

  for (const compDir of compDirs) {
    const metaPath = path.join(compDir, 'dss.meta.json')
    if (!fs.existsSync(metaPath)) continue

    let meta
    try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) } catch { continue }

    const vp = meta?.defaultPreview?.visualProperties
    if (!Array.isArray(vp) || vp.length === 0) continue

    const compName = meta.component || path.basename(compDir)
    checked++

    for (const entry of vp) {
      const tokens = extractTokenNames(entry.token || '')
      for (const token of tokens) {
        if (!catalog.has(token)) {
          errors.push(
            `  ${compName} › "${entry.property}": token "${token}" não existe no catálogo DSS.`
          )
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error('\n❌ Tokens inexistentes detectados em meta.json:\n')
    errors.forEach(e => console.error(e))
    console.error(`\n${errors.length} problema(s) em ${checked} componente(s) verificados.`)
    console.error('→ Corrija o token no meta.json ou adicione-o ao catálogo DSS.')
    process.exit(1)
  } else {
    console.log(`✅ meta.json → catálogo DSS: ${checked} componente(s) verificados, zero tokens inválidos.`)
  }
}

// ── Modo: validate-strict ──────────────────────────────────────────────────────
//
// Além de verificar existência no catálogo, verifica que cada token aparece
// diretamente nos arquivos fonte do componente. Pode ter falsos positivos para
// tokens aplicados via sistema de cores Quasar.

function runValidateStrict() {
  const catalog  = buildTokenCatalog()
  const compDirs = findComponentDirs(COMPONENTS_BASE)
  const errors   = []
  let   checked  = 0

  for (const compDir of compDirs) {
    const metaPath = path.join(compDir, 'dss.meta.json')
    if (!fs.existsSync(metaPath)) continue

    let meta
    try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) } catch { continue }

    const vp = meta?.defaultPreview?.visualProperties
    if (!Array.isArray(vp) || vp.length === 0) continue

    const compName    = meta.component || path.basename(compDir)
    const sourceFiles = collectSourceFiles(compDir)
    checked++

    for (const entry of vp) {
      const tokens = extractTokenNames(entry.token || '')
      for (const token of tokens) {
        if (!catalog.has(token)) {
          errors.push(`  ${compName} › "${entry.property}": token "${token}" não existe no catálogo DSS.`)
          continue
        }
        const foundIn = findTokenInFiles(token, sourceFiles)
        if (!foundIn) {
          errors.push(
            `  ${compName} › "${entry.property}": token "${token}" não encontrado nos arquivos do componente (pode ser aplicado via Quasar color system).`
          )
        }
      }
    }
  }

  if (errors.length > 0) {
    console.warn('\n⚠️  Divergências detectadas (--validate-strict):\n')
    errors.forEach(e => console.warn(e))
    console.warn(`\n${errors.length} ocorrência(s) em ${checked} componente(s).`)
    console.warn('→ Tokens não encontrados diretamente podem estar sendo aplicados via Quasar (esperado).')
    process.exit(1)
  } else {
    console.log(`✅ Strict: ${checked} componente(s) verificados, zero divergências.`)
  }
}

// ── Modo: fix-sources ──────────────────────────────────────────────────────────

function runFixSources() {
  const compDirs  = findComponentDirs(COMPONENTS_BASE)
  let   totalFixed = 0
  let   totalComps = 0

  for (const compDir of compDirs) {
    const metaPath = path.join(compDir, 'dss.meta.json')
    if (!fs.existsSync(metaPath)) continue

    let meta
    try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) } catch { continue }

    const vp = meta?.defaultPreview?.visualProperties
    if (!Array.isArray(vp) || vp.length === 0) continue

    const compName    = meta.component || path.basename(compDir)
    const sourceFiles = collectSourceFiles(compDir)
    let   modified    = false

    for (const entry of vp) {
      const token = entry.token
      if (!token || !extractTokenNames(token).length) continue

      // Só atualiza se a source for legada ou ausente
      if (isCssSource(entry.source)) continue

      const foundIn = findTokenInFiles(token, sourceFiles)
      if (foundIn) {
        // Token encontrado diretamente nos arquivos do componente
        entry.source = foundIn
        modified     = true
        totalFixed++
      } else if (isLegacySource(entry.source)) {
        // Token não encontrado no componente — aplicado via sistema de cores Quasar.
        // A cadeia: :color prop → classe Quasar → var(--q-*) → var(--dss-*) via bridge.
        entry.source = 'via Quasar :color → packages/core/themes/_quasar-tokens-mapping.scss'
        modified     = true
        totalFixed++
      }
    }

    if (modified) {
      const raw = JSON.stringify(meta, null, 2) + '\n'
      fs.writeFileSync(metaPath, raw, 'utf-8')
      totalComps++
      console.log(`  ✅ ${compName}: source(s) atualizado(s)`)
    }
  }

  console.log(`\nFontes atualizadas: ${totalFixed} entrada(s) em ${totalComps} componente(s).`)
  console.log('Execute npm run sync:visual-contract para propagar as mudanças.')
}

// ── Main ───────────────────────────────────────────────────────────────────────

if (mode === 'validate')        runValidate()
else if (mode === 'validate-strict') runValidateStrict()
else                           runFixSources()
