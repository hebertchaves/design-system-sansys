#!/usr/bin/env node
/**
 * ==========================================================================
 * generate-portal-landing-pages.cjs
 *
 * Script de automação: lê os selos de conformidade em docs/Compliance/seals/,
 * e gera automaticamente arquivos TSX de página de documentação para cada
 * componente selado que ainda não possui página correspondente em
 * apps/docs-portal/src/pages/components/.
 *
 * Também atualiza apps/docs-portal/src/App.tsx para registrar as rotas
 * das novas páginas geradas.
 *
 * USO:
 *   node scripts/generate-portal-landing-pages.cjs
 *
 * POR QUE .cjs E NAO .js: a raiz do monorepo declara `"type": "module"`, entao
 * um `.js` e tratado como ES module e `require()` lanca
 * `ReferenceError: require is not defined in ES module scope`. A extensao .cjs
 * forca CommonJS — mesmo padrao dos demais scripts do diretorio (build-catalog.cjs,
 * validate-*.cjs). Nao renomear de volta para .js sem converter para ESM.
 *
 * A quebra era PRE-EXISTENTE (gerador de jun/2026) e so apareceu em ago/2026, quando
 * o selo do DssEmptyState foi o primeiro a precisar do gerador desde a migracao para
 * ESM. Encontrada pela revisao independente na 4a passagem.
 *   npm run portal:sync-docs
 * ==========================================================================
 */

'use strict'

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')

// ─── Caminhos ───────────────────────────────────────────────────────────────

const SEALS_DIR = path.join(ROOT, 'docs', 'Compliance', 'seals')
const PORTAL_PAGES_DIR = path.join(ROOT, 'apps', 'docs-portal', 'src', 'pages', 'components')
const COMPONENTS_BASE_DIR = path.join(ROOT, 'packages', 'core', 'components', 'base')
const APP_TSX_PATH = path.join(ROOT, 'apps', 'docs-portal', 'src', 'App.tsx')

// ─── Utilitários ────────────────────────────────────────────────────────────

/**
 * Converte PascalCase para kebab-case.
 * Ex: DssButton → dss-button, DssBtnDropdown → dss-btn-dropdown
 */
function toKebabCase(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * Lê o dss.meta.json do componente, se existir.
 */
function readMeta(componentName) {
  const metaPath = path.join(COMPONENTS_BASE_DIR, componentName, 'dss.meta.json')
  if (fs.existsSync(metaPath)) {
    try {
      return JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
    } catch (e) {
      return null
    }
  }
  return null
}

/**
 * Extrai todos os tokens do meta.json (de todas as categorias).
 */
function extractTokens(meta) {
  if (!meta || !meta.tokens) return []
  const allTokens = Object.values(meta.tokens).reduce((acc, arr) => acc.concat(arr), [])
  return [...new Set(allTokens)].slice(0, 20)
}

/**
 * Extrai props padrão do defaultPreview.
 */
function extractDefaultProps(meta) {
  if (!meta || !meta.defaultPreview || !meta.defaultPreview.props) return {}
  return meta.defaultPreview.props
}

/**
 * Extrai dimensões computadas do defaultPreview.
 */
function extractDimensions(meta) {
  if (!meta || !meta.defaultPreview || !meta.defaultPreview.computedDimensions) return {}
  return meta.defaultPreview.computedDimensions
}

// ─── Gerador de página TSX ──────────────────────────────────────────────────

function generatePageContent(componentName, meta) {
  const kebabName = toKebabCase(componentName)
  const displayName = componentName
  const today = new Date().toISOString().split('T')[0]
  const description = meta
    ? 'Componente ' + displayName + ' do Design System Sansys (DSS v' + (meta.dssVersion || '2.2') + '). Fase ' + (meta.phase || '?') + ' — ' + (meta.category || 'Componente DSS') + '.'
    : 'Componente ' + displayName + ' do Design System Sansys (DSS).'

  const status = meta && meta.status === 'approved' ? 'Aprovado' : (meta && meta.status ? meta.status : 'Em revisão')
  const phase = meta ? (meta.phase || '?') : '?'
  const auditDate = meta ? (meta.auditDate || 'N/A') : 'N/A'
  const goldenReference = meta ? (meta.goldenReference || 'DssBadge') : 'DssBadge'
  const goldenContext = meta ? (meta.goldenContext || 'N/A') : 'N/A'
  const seal = meta && meta.seal ? 'DSS v2.2' : 'Pendente'
  const tokens = extractTokens(meta)
  const defaultProps = extractDefaultProps(meta)
  const dimensions = extractDimensions(meta)

  const tokensRows = tokens.length > 0
    ? tokens.map(function(t) { return '  { token: ' + JSON.stringify(t) + ', description: "Token DSS" }' }).join(',\n')
    : '  { token: "—", description: "Consulte o .md do componente" }'

  const defaultPropsRows = Object.keys(defaultProps).length > 0
    ? Object.entries(defaultProps).map(function(e) {
        return '  { prop: ' + JSON.stringify(e[0]) + ', value: ' + JSON.stringify(String(e[1])) + ' }'
      }).join(',\n')
    : '  { prop: "—", value: "—" }'

  const dimensionsBadges = Object.entries(dimensions)
    .map(function(e) {
      return '              <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">' + e[0] + ': ' + e[1] + '</span>'
    }).join('\n')

  const hasDimensions = Object.keys(dimensions).length > 0

  return '// @ts-nocheck\n' +
'// AUTO-GENERATED by scripts/generate-portal-landing-pages.cjs\n' +
'// Gerado em: ' + today + '\n' +
'// Componente: ' + displayName + ' — DSS v' + (meta ? (meta.dssVersion || '2.2') : '2.2') + '\n' +
'//\n' +
'// ⚠️ Este arquivo foi gerado automaticamente a partir do dss.meta.json.\n' +
'// Para documentação completa, edite este arquivo manualmente ou\n' +
'// consulte: packages/core/components/base/' + componentName + '/' + componentName + '.md\n' +
'\n' +
'import React from "react";\n' +
'import { Link } from "react-router-dom";\n' +
'import { Badge } from "@/components/ui/badge";\n' +
'import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";\n' +
'import {\n' +
'  Table,\n' +
'  TableBody,\n' +
'  TableCell,\n' +
'  TableHead,\n' +
'  TableHeader,\n' +
'  TableRow,\n' +
'} from "@/components/ui/table";\n' +
'import { CheckCircle, Shield, BookOpen, Package } from "lucide-react";\n' +
'\n' +
'// ─── Dados extraídos do dss.meta.json ───────────────────────────────────────\n' +
'\n' +
'const COMPONENT_META = {\n' +
'  name: ' + JSON.stringify(displayName) + ',\n' +
'  kebabName: ' + JSON.stringify(kebabName) + ',\n' +
'  description: ' + JSON.stringify(description) + ',\n' +
'  status: ' + JSON.stringify(status) + ',\n' +
'  seal: ' + JSON.stringify(seal) + ',\n' +
'  phase: ' + JSON.stringify(phase) + ',\n' +
'  auditDate: ' + JSON.stringify(auditDate) + ',\n' +
'  goldenReference: ' + JSON.stringify(goldenReference) + ',\n' +
'  goldenContext: ' + JSON.stringify(goldenContext) + ',\n' +
'}\n' +
'\n' +
'const TOKENS_USED = [\n' + tokensRows + '\n]\n' +
'\n' +
'const DEFAULT_PROPS = [\n' + defaultPropsRows + '\n]\n' +
'\n' +
'// ─── Página ─────────────────────────────────────────────────────────────────\n' +
'\n' +
'export default function ' + displayName + 'Page() {\n' +
'  return (\n' +
'    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">\n' +
'\n' +
'      {/* Breadcrumb */}\n' +
'      <div className="flex items-center gap-2 text-sm text-muted-foreground">\n' +
'        <Link to="/" className="hover:text-foreground">Início</Link>\n' +
'        <span>/</span>\n' +
'        <Link to="/componentes/dss-button" className="hover:text-foreground">Componentes</Link>\n' +
'        <span>/</span>\n' +
'        <span className="text-foreground">{COMPONENT_META.name}</span>\n' +
'      </div>\n' +
'\n' +
'      {/* Header */}\n' +
'      <section className="space-y-3">\n' +
'        <div className="flex items-center gap-3 flex-wrap">\n' +
'          <h1 className="text-3xl font-bold text-foreground">{COMPONENT_META.name}</h1>\n' +
'          <Badge variant="outline" className="gap-1">\n' +
'            <CheckCircle className="h-3 w-3 text-green-500" />\n' +
'            {COMPONENT_META.seal}\n' +
'          </Badge>\n' +
'          <Badge variant="secondary">Fase {COMPONENT_META.phase}</Badge>\n' +
'        </div>\n' +
'        <p className="text-lg text-muted-foreground max-w-2xl">{COMPONENT_META.description}</p>\n' +
'        <div className="flex gap-4 text-sm text-muted-foreground">\n' +
'          <span>Auditado em: <strong>{COMPONENT_META.auditDate}</strong></span>\n' +
'          <span>Status: <strong className="text-green-600">{COMPONENT_META.status}</strong></span>\n' +
'        </div>\n' +
'      </section>\n' +
'\n' +
'      {/* Conformidade */}\n' +
'      <Card>\n' +
'        <CardHeader>\n' +
'          <CardTitle className="flex items-center gap-2">\n' +
'            <Shield className="h-5 w-5 text-blue-500" />\n' +
'            Conformidade DSS\n' +
'          </CardTitle>\n' +
'          <CardDescription>Metadados de auditoria e governança</CardDescription>\n' +
'        </CardHeader>\n' +
'        <CardContent>\n' +
'          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">\n' +
'            <div className="space-y-1">\n' +
'              <p className="text-xs text-muted-foreground uppercase tracking-wide">Golden Reference</p>\n' +
'              <p className="font-medium text-sm">{COMPONENT_META.goldenReference}</p>\n' +
'            </div>\n' +
'            <div className="space-y-1">\n' +
'              <p className="text-xs text-muted-foreground uppercase tracking-wide">Golden Context</p>\n' +
'              <p className="font-medium text-sm">{COMPONENT_META.goldenContext}</p>\n' +
'            </div>\n' +
'            <div className="space-y-1">\n' +
'              <p className="text-xs text-muted-foreground uppercase tracking-wide">Fase</p>\n' +
'              <p className="font-medium text-sm">{COMPONENT_META.phase}</p>\n' +
'            </div>\n' +
'            <div className="space-y-1">\n' +
'              <p className="text-xs text-muted-foreground uppercase tracking-wide">Data de Auditoria</p>\n' +
'              <p className="font-medium text-sm">{COMPONENT_META.auditDate}</p>\n' +
'            </div>\n' +
'          </div>\n' +
(hasDimensions ? (
'          <div className="mt-4 pt-4 border-t space-y-2">\n' +
'            <p className="text-xs text-muted-foreground uppercase tracking-wide">Dimensões (defaultPreview)</p>\n' +
'            <div className="flex flex-wrap gap-2">\n' +
dimensionsBadges + '\n' +
'            </div>\n' +
'          </div>\n'
) : '') +
'        </CardContent>\n' +
'      </Card>\n' +
'\n' +
'      {/* Props padrão */}\n' +
'      {DEFAULT_PROPS.length > 0 && DEFAULT_PROPS[0].prop !== "—" && (\n' +
'        <section className="space-y-3">\n' +
'          <h2 className="text-xl font-semibold flex items-center gap-2">\n' +
'            <Package className="h-5 w-5" />\n' +
'            Props Padrão (defaultPreview)\n' +
'          </h2>\n' +
'          <Card>\n' +
'            <Table>\n' +
'              <TableHeader>\n' +
'                <TableRow>\n' +
'                  <TableHead>Prop</TableHead>\n' +
'                  <TableHead>Valor Padrão</TableHead>\n' +
'                </TableRow>\n' +
'              </TableHeader>\n' +
'              <TableBody>\n' +
'                {DEFAULT_PROPS.map((p, i) => (\n' +
'                  <TableRow key={i}>\n' +
'                    <TableCell className="font-mono text-sm">{p.prop}</TableCell>\n' +
'                    <TableCell className="font-mono text-xs text-muted-foreground">{p.value}</TableCell>\n' +
'                  </TableRow>\n' +
'                ))}\n' +
'              </TableBody>\n' +
'            </Table>\n' +
'          </Card>\n' +
'        </section>\n' +
'      )}\n' +
'\n' +
'      {/* Tokens */}\n' +
'      {TOKENS_USED.length > 0 && (\n' +
'        <section className="space-y-3">\n' +
'          <h2 className="text-xl font-semibold flex items-center gap-2">\n' +
'            <BookOpen className="h-5 w-5" />\n' +
'            Tokens CSS Consumidos\n' +
'          </h2>\n' +
'          <Card>\n' +
'            <Table>\n' +
'              <TableHeader>\n' +
'                <TableRow>\n' +
'                  <TableHead>Token</TableHead>\n' +
'                  <TableHead>Descrição</TableHead>\n' +
'                </TableRow>\n' +
'              </TableHeader>\n' +
'              <TableBody>\n' +
'                {TOKENS_USED.map((t, i) => (\n' +
'                  <TableRow key={i}>\n' +
'                    <TableCell className="font-mono text-xs text-blue-600 dark:text-blue-400">{t.token}</TableCell>\n' +
'                    <TableCell className="text-sm text-muted-foreground">{t.description}</TableCell>\n' +
'                  </TableRow>\n' +
'                ))}\n' +
'              </TableBody>\n' +
'            </Table>\n' +
'          </Card>\n' +
'        </section>\n' +
'      )}\n' +
'\n' +
'      {/* Links de documentação */}\n' +
'      <Card className="border-dashed">\n' +
'        <CardContent className="p-6 space-y-3">\n' +
'          <CardTitle className="text-base">Documentação Completa</CardTitle>\n' +
'          <CardDescription className="space-y-1">\n' +
'            <p>Para a documentação completa do componente, consulte:</p>\n' +
'            <ul className="mt-2 space-y-1 text-sm list-disc list-inside">\n' +
'              <li>\n' +
'                <code className="text-xs bg-muted px-1 rounded">\n' +
'                  packages/core/components/base/' + componentName + '/' + componentName + '.md\n' +
'                </code>\n' +
'              </li>\n' +
'              <li>\n' +
'                <code className="text-xs bg-muted px-1 rounded">\n' +
'                  packages/core/components/base/' + componentName + '/' + componentName.toUpperCase() + '_API.md\n' +
'                </code>\n' +
'              </li>\n' +
'              <li>\n' +
'                <code className="text-xs bg-muted px-1 rounded">\n' +
'                  docs/Compliance/seals/' + componentName + '/\n' +
'                </code>\n' +
'              </li>\n' +
'            </ul>\n' +
'          </CardDescription>\n' +
'        </CardContent>\n' +
'      </Card>\n' +
'\n' +
'    </div>\n' +
'  )\n' +
'}\n'
}

// ─── Atualizador do App.tsx ──────────────────────────────────────────────────

function updateAppTsx(newComponents) {
  if (newComponents.length === 0) return

  var appContent = fs.readFileSync(APP_TSX_PATH, 'utf-8')

  var imports = newComponents
    .filter(function(c) { return !appContent.includes('import ' + c.pageName + ' from') })
    .map(function(c) {
      return 'import ' + c.pageName + ' from "./pages/components/' + c.pageName + '";'
    })
    .join('\n')

  var routes = newComponents
    .filter(function(c) { return !appContent.includes('/componentes/' + c.kebab + '"') })
    .map(function(c) {
      return '            <Route path="/componentes/' + c.kebab + '" element={<' + c.pageName + ' />} />'
    })
    .join('\n')

  var importAnchor = 'import ComponentPlaceholder from "./pages/components/ComponentPlaceholder";'
  if (imports.length > 0 && appContent.includes(importAnchor)) {
    appContent = appContent.replace(importAnchor, imports + '\n' + importAnchor)
  }

  var routeAnchor = '<Route path="/componentes/:componentId" element={<ComponentPlaceholder />} />'
  if (routes.length > 0 && appContent.includes(routeAnchor)) {
    appContent = appContent.replace(routeAnchor, routes + '\n            ' + routeAnchor)
  }

  fs.writeFileSync(APP_TSX_PATH, appContent, 'utf-8')
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  console.log('🔍 DSS Portal Sync — Iniciando varredura de selos...\n')

  if (!fs.existsSync(SEALS_DIR)) {
    console.error('❌ Pasta de selos não encontrada: ' + SEALS_DIR)
    process.exit(1)
  }

  if (!fs.existsSync(PORTAL_PAGES_DIR)) {
    console.error('❌ Pasta do portal não encontrada: ' + PORTAL_PAGES_DIR)
    process.exit(1)
  }

  // 1. Listar todos os componentes selados
  var sealedComponents = fs.readdirSync(SEALS_DIR, { withFileTypes: true })
    .filter(function(d) { return d.isDirectory() && d.name.startsWith('Dss') })
    .map(function(d) { return d.name })

  console.log('📋 Componentes selados encontrados: ' + sealedComponents.length)

  // 2. Listar páginas existentes no portal
  var existingPages = new Set(
    fs.readdirSync(PORTAL_PAGES_DIR)
      .filter(function(f) { return f.endsWith('Page.tsx') || f.endsWith('Page.jsx') })
      .map(function(f) { return f.replace(/Page\.(tsx|jsx)$/, '') })
  )

  console.log('📄 Páginas de portal existentes: ' + existingPages.size)

  // 3. Identificar componentes sem página de portal
  var missing = sealedComponents.filter(function(name) { return !existingPages.has(name) })

  if (missing.length === 0) {
    console.log('\n✅ Todos os componentes selados já possuem página no portal!')
    return
  }

  console.log('\n🚀 Gerando páginas para ' + missing.length + ' componentes sem cobertura:\n')

  var generated = []

  missing.forEach(function(componentName) {
    var meta = readMeta(componentName)
    var pageName = componentName + 'Page'
    var kebab = toKebabCase(componentName)
    var outputPath = path.join(PORTAL_PAGES_DIR, pageName + '.tsx')

    var content = generatePageContent(componentName, meta)
    fs.writeFileSync(outputPath, content, 'utf-8')

    var metaStatus = meta ? '✓ meta.json' : '⚠ sem meta.json'
    console.log('  ✅ ' + pageName + '.tsx  [' + metaStatus + ']  → /componentes/' + kebab)

    generated.push({ name: componentName, pageName: pageName, kebab: kebab })
  })

  // 4. Atualizar App.tsx com imports e rotas
  if (generated.length > 0 && fs.existsSync(APP_TSX_PATH)) {
    updateAppTsx(generated)
    console.log('\n📝 App.tsx atualizado com ' + generated.length + ' novas rotas.')
  }

  console.log('\n🎉 Concluído! ' + generated.length + ' páginas geradas.')
  console.log('\nPróximos passos:')
  console.log('  1. npm run docs:build  — verificar build do portal')
  console.log('  2. npm run docs:dev    — verificar páginas em desenvolvimento')
  console.log('  3. Enriquecer manualmente as páginas geradas com exemplos de código')
}

main()
