/**
 * sync-tokens-to-reference.js  (ESM)
 *
 * Fecha o Gap 3 da cadeia de automação DSS:
 *   Token SCSS (fonte de verdade) → DSS_TOKEN_REFERENCE.md (documentação)
 *
 * Para cada arquivo SCSS em packages/core/tokens/semantic/, lê as declarações
 * de custom properties e regenera as tabelas correspondentes no documento de
 * referência de tokens, entre marcadores:
 *
 *   <!-- BEGIN:TOKEN-TABLE:file-section -->
 *   ...tabela auto-gerada...
 *   <!-- END:TOKEN-TABLE:file-section -->
 *
 * A chave do marcador é derivada de: {basename-do-arquivo}-{nome-da-seção}
 * onde o nome da seção é extraído dos cabeçalhos de seção nos comentários SCSS.
 *
 * Exemplo:  _dimensions.scss › seção "1. TRACK HEIGHT"
 *           → marcador "dimensions-track-height"
 *
 * Uso:
 *   node scripts/sync-tokens-to-reference.js
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const ROOT       = path.resolve(__dirname, '..')
const TOKENS_DIR = path.join(ROOT, 'packages', 'core', 'tokens', 'semantic')
const TOKEN_REF  = path.join(ROOT, 'docs', 'reference', 'DSS_TOKEN_REFERENCE.md')

// ── Parsers ───────────────────────────────────────────────────────────────────

/**
 * Extrai o nome base do arquivo sem prefixo _ e sem extensão.
 * Ex: "_dimensions.scss" → "dimensions"
 */
function fileBasename(fileName) {
  return fileName.replace(/^_/, '').replace(/\.scss$/, '')
}

/**
 * Converte um título de seção SCSS para chave de marcador.
 * Ex: "1. TRACK HEIGHT" → "track-height"
 * Ex: "MIN-WIDTH"       → "min-width"
 */
function titleToKey(title) {
  return title
    .replace(/^\d+\.\s*/, '')   // remove número do início ("1. ")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')    // espaços/underscores → hifens
    .replace(/[^a-z0-9-]/g, '') // remove caracteres não-alfanuméricos
}

/**
 * Divide o conteúdo de um arquivo SCSS em seções com base em cabeçalhos
 * de comentário do tipo:
 *   /* ===...
 *      N. NOME DA SEÇÃO
 *      ===... *\/
 *
 * Retorna array de { sectionKey, tokens[] }
 */
function parseSections(content, basename) {
  const sections      = []
  let   currentKey    = basename     // seção default = basename se não houver sub-seções
  let   currentTokens = []

  const lines = content.split('\n')
  let   inBlockComment = false
  let   pendingSection = null

  // Regex para detectar título dentro de comentário de bloco
  const sectionTitleRe = /^\s{2,}(\d+\.\s+[\w\s/-]+)$/

  // Regex para declaração de token: --dss-xxx: value; /* comment */
  // Comentário SEMPRE vem após o ; no estilo SCSS canônico do DSS
  const tokenRe = /^\s*(--dss-[\w-]+)\s*:\s*([^;]+?)\s*;(?:\s*\/\*\s*(.*?)\s*\*\/)?/

  for (const line of lines) {
    // Detecta início de bloco de comentário /* === ... */
    if (line.includes('/*') && !line.includes('*/')) {
      inBlockComment = true
      pendingSection = null
      continue
    }

    // Dentro de bloco de comentário: procura título de seção
    if (inBlockComment) {
      const titleMatch = sectionTitleRe.exec(line)
      if (titleMatch) {
        pendingSection = titleToKey(titleMatch[1])
      }
      if (line.includes('*/')) {
        inBlockComment = false
        if (pendingSection) {
          // Fecha seção anterior se existia
          if (currentTokens.length > 0) {
            sections.push({ sectionKey: `${basename}-${currentKey}`, tokens: currentTokens })
          }
          currentKey    = pendingSection
          currentTokens = []
          pendingSection = null
        }
      }
      continue
    }

    // Detecta comentários inline /* ... */
    if (line.trim().startsWith('//') || (line.includes('/*') && line.includes('*/'))) {
      // Inline comment — não interrompe parsing de tokens
    }

    // Detecta declaração de token
    const tokenMatch = tokenRe.exec(line)
    if (tokenMatch) {
      const [, name, rawValue, comment] = tokenMatch
      const value = rawValue.trim()

      // Extrai valor em px do comentário (ex: "4px — descrição" ou "4px")
      let px   = null
      let desc = comment?.trim() || null

      if (desc) {
        const pxMatch = desc.match(/^(\d+(?:\.\d+)?(?:px|rem|em|%))(?:\s*[—–-]\s*(.+))?/)
        if (pxMatch) {
          px   = pxMatch[1]
          desc = pxMatch[2]?.trim() || null
        }
      }

      // Se o valor é rem e não extraiu px do comentário, converte
      if (!px && value.match(/^[\d.]+rem$/)) {
        px = `${Math.round(parseFloat(value) * 16)}px`
      }
      // Se valor é px direto
      if (!px && value.match(/^[\d.]+px$/)) {
        px = value
      }

      currentTokens.push({ name, value, px, desc })
    }
  }

  // Última seção
  // Se currentKey === basename, não houve sub-seções → usar só basename como chave
  if (currentTokens.length > 0) {
    const finalKey = currentKey === basename ? basename : `${basename}-${currentKey}`
    sections.push({ sectionKey: finalKey, tokens: currentTokens })
  }

  return sections
}

// ── Gerador de tabela ─────────────────────────────────────────────────────────

/**
 * Gera uma tabela markdown a partir de tokens.
 */
function buildTable(tokens) {
  const header = [
    '',
    '| Token | Valor | px | Descrição |',
    '|---|---|---|---|',
  ].join('\n')

  const rows = tokens.map(t => {
    const name  = `\`${t.name}\``
    const value = `\`${t.value}\``
    const px    = t.px   ? `\`${t.px}\`` : '—'
    const desc  = t.desc || '—'
    return `| ${name} | ${value} | ${px} | ${desc} |`
  })

  return header + '\n' + rows.join('\n') + '\n'
}

// ── Substituição no documento ─────────────────────────────────────────────────

/**
 * Substitui o conteúdo entre <!-- BEGIN:TOKEN-TABLE:key --> e
 * <!-- END:TOKEN-TABLE:key --> pela tabela gerada.
 * Retorna { content, updated }.
 */
function replaceTokenTable(docContent, key, table) {
  const begin = `<!-- BEGIN:TOKEN-TABLE:${key} -->`
  const end   = `<!-- END:TOKEN-TABLE:${key} -->`

  const bi = docContent.indexOf(begin)
  const ei = docContent.indexOf(end)
  if (bi === -1 || ei === -1 || ei <= bi) return { content: docContent, updated: false }

  const before = docContent.slice(0, bi + begin.length)
  const after  = docContent.slice(ei)
  return { content: `${before}${table}${after}`, updated: true }
}

// ── Main ───────────────────────────────────────────────────────────────────────

// ── Mapeamento explícito: prefixo de token → chave TOKEN-TABLE ────────────────
//
// Para arquivos que cobrem múltiplas seções do Token Reference, mapeamos cada
// prefixo de token para a chave correspondente. Gerado de inject-token-table-markers.js.

const TOKEN_PREFIX_TO_KEY = {
  // Spacing (subseções do _spacing.scss)
  '--dss-spacing-':           'spacing-escala-base',
  '--dss-container-':         'spacing-semanticos',
  '--dss-section-':           'spacing-semanticos',
  '--dss-component-spacing':  'spacing-semanticos',
  '--dss-layout-':            'spacing-semanticos',
  '--dss-grid-gap-':          'spacing-grid-gap',
  '--dss-form-gap':           'spacing-formularios',
  '--dss-label-':             'spacing-formularios',
  '--dss-margin-':            'spacing-margins',
  '--dss-padding-':           'spacing-paddings',
  '--dss-gap-':               'spacing-gaps',
  '--dss-touch-spacing':      'spacing-acessibilidade',
  '--dss-line-height-spacing':'spacing-acessibilidade',
  '--dss-radius-':            'spacing-border-radius',
  '--dss-toolbar-height':     'spacing-semanticos',
  // Actions
  '--dss-action-primary':     'actions-primary',
  '--dss-action-secondary':   'actions-secondary',
  '--dss-action-tertiary':    'actions-tertiary',
  '--dss-action-accent':      'actions-accent',
  '--dss-action-dark':        'actions-dark',
  '--dss-action-surface':     'actions-surfaces',
  // Feedback
  '--dss-feedback-success':   'feedback-success',
  '--dss-feedback-error':     'feedback-error',
  '--dss-feedback-warning':   'feedback-warning',
  '--dss-feedback-info':      'feedback-info',
  '--dss-feedback-surface':   'feedback-surfaces',
  '--dss-text-positive':      'feedback-textos',
  '--dss-text-negative':      'feedback-textos',
  '--dss-text-success':       'feedback-textos',
  '--dss-text-warning':       'feedback-textos',
  '--dss-text-info':          'feedback-textos',
  '--dss-text-error':         'feedback-textos',
  '--dss-text-hint':          'feedback-textos',
  // Cores de texto — hierarquia/estados/on-color/ações/marca
  '--dss-text-primary':       'text-cores',
  '--dss-text-secondary':     'text-cores',
  '--dss-text-body':          'text-cores',
  '--dss-text-subtle':        'text-cores',
  '--dss-text-muted':         'text-cores',
  '--dss-text-inverse':       'text-cores',
  '--dss-text-disabled':      'text-cores',
  '--dss-text-on-primary':    'text-cores',
  '--dss-text-action':        'text-cores',
  '--dss-text-brand-':        'text-cores',
  '--dss-surface-level-':     'feedback-hierarchy',
  // Motion
  '--dss-duration-':          'motion-duracoes-base',
  '--dss-animation-':         'motion-animacoes',
  '--dss-easing-':            'motion-easing',
  '--dss-delay-':             'motion-atrasos',
  '--dss-transition-':        'motion-transicoes',
  '--dss-timer-':             'motion-temporizadores',
  // Text/Tipografia
  '--dss-font-family-':       'text-familias',
  '--dss-font-size-':         'text-tamanhos',
  '--dss-font-weight-':       'text-pesos',
  '--dss-line-height-':       'text-line-height',
  '--dss-letter-spacing-':    'text-letter-spacing',
  '--dss-heading-':           'text-hierarquia',
  '--dss-text-max-width':     'text-utilitarios',
  '--dss-word-break':         'text-utilitarios',
  // Borders (subseções do _borders.scss e _border-widths.scss)
  '--dss-border-width-':      'border-widths',
  '--dss-border-gray-':       'borders-neutras',
  '--dss-border-primary':     'borders-acao',
  '--dss-border-secondary':   'borders-acao',
  '--dss-border-tertiary':    'borders-acao',
  '--dss-border-accent':      'borders-acao',
  '--dss-border-positive':    'borders-feedback',
  '--dss-border-negative':    'borders-feedback',
  '--dss-border-warning':     'borders-feedback',
  '--dss-border-info':        'borders-feedback',
  '--dss-border-hub-':        'borders-marca',
  '--dss-border-water-':      'borders-marca',
  '--dss-border-waste-':      'borders-marca',
  '--dss-border-dark':        'borders-dark',
  '--dss-border-focus':       'borders-funcionais',
  '--dss-border-active':      'borders-funcionais',
  '--dss-border-selected':    'borders-funcionais',
  '--dss-border-disabled':    'borders-funcionais',
  '--dss-border-readonly':    'borders-funcionais',
  // Shadows
  '--dss-shadow-':            'shadows-base',
  '--dss-elevation-':         'shadows-elevacao',
  // Accessibility
  '--dss-focus-':             'accessibility-focus-base',
  '--dss-touch-target-':      'accessibility-touch-targets',
  '--dss-touch-spacing-':     'accessibility-touch-spacing',
  '--dss-form-control-height':'accessibility-input-heights',
  '--dss-input-height-':      'accessibility-input-heights',
  '--dss-checkbox-':          'accessibility-checkboxes',
  '--dss-icon-':              'accessibility-icons',
  '--dss-compact-control-':   'accessibility-compact-controls',
  '--dss-chip-height-':       'accessibility-compact-controls',
  '--dss-component-padding-': 'accessibility-input-heights',
  '--dss-component-margin-':  'accessibility-touch-spacing',
  '--dss-breakpoint-':        'breakpoints',
  '--dss-z-index-':           'z-index',
  '--dss-contrast-':          'accessibility-contrast-ratios',
}

/** Resolve a chave TOKEN-TABLE para um token dado, baseado em prefixo. */
function resolveKey(tokenName, fallbackKey) {
  for (const [prefix, key] of Object.entries(TOKEN_PREFIX_TO_KEY)) {
    if (tokenName.startsWith(prefix)) return key
  }
  return fallbackKey
}

function main() {
  if (!fs.existsSync(TOKEN_REF)) {
    console.error(`ERRO: ${TOKEN_REF} não encontrado`)
    process.exit(1)
  }

  let docContent   = fs.readFileSync(TOKEN_REF, 'utf-8')
  let totalUpdated = 0
  let totalSkipped = 0

  // Processa arquivos SCSS na raiz de semantic/
  const entries = fs.readdirSync(TOKENS_DIR, { withFileTypes: true })

  for (const entry of entries) {
    // Sub-diretório (ex: accessibility/)
    if (entry.isDirectory()) {
      const subDir = path.join(TOKENS_DIR, entry.name)
      for (const subEntry of fs.readdirSync(subDir, { withFileTypes: true })) {
        if (!subEntry.name.endsWith('.scss')) continue
        const filePath = path.join(subDir, subEntry.name)
        const basename = `${entry.name}-${fileBasename(subEntry.name)}`
        const content  = fs.readFileSync(filePath, 'utf-8')
        const sections = parseSections(content, basename)
        for (const section of sections) {
          processSection(section, docContent, (updated) => { docContent = updated; totalUpdated++ }, () => totalSkipped++)
        }
      }
      continue
    }

    if (!entry.name.endsWith('.scss')) continue

    const filePath = path.join(TOKENS_DIR, entry.name)
    const basename = fileBasename(entry.name)
    const content  = fs.readFileSync(filePath, 'utf-8')
    const sections = parseSections(content, basename)

    for (const section of sections) {
      processSection(section, docContent, (updated) => { docContent = updated; totalUpdated++ }, () => totalSkipped++)
    }
  }

  fs.writeFileSync(TOKEN_REF, docContent, 'utf-8')
  console.log(`Documento atualizado: docs/reference/DSS_TOKEN_REFERENCE.md`)
  if (totalUpdated > 0) {
    console.log(`Tabelas regeneradas: ${totalUpdated}`)
  }
  if (totalSkipped > 0) {
    console.log(`Seções sem marcador (ignoradas): ${totalSkipped}`)
  }
  if (totalUpdated === 0 && totalSkipped === 0) {
    console.log('Nenhum marcador TOKEN-TABLE encontrado. Adicione marcadores ao documento para ativar a regeneração automática.')
  }
}

function processSection({ sectionKey, tokens }, docContent, onUpdated, onSkipped) {
  if (tokens.length === 0) return

  // Agrupa tokens por chave resolvida (via TOKEN_PREFIX_TO_KEY ou sectionKey padrão)
  const groups = new Map()
  for (const token of tokens) {
    const key = resolveKey(token.name, sectionKey)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(token)
  }

  for (const [key, groupTokens] of groups) {
    if (!docContent.includes(`<!-- BEGIN:TOKEN-TABLE:${key} -->`)) {
      onSkipped()
      continue
    }

    const table              = buildTable(groupTokens)
    const { content, updated } = replaceTokenTable(docContent, key, table)

    if (updated) {
      docContent = content
      console.log(`  ✅ ${key} (${groupTokens.length} token(s))`)
      onUpdated(content)
    }
  }
}

main()
