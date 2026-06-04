/**
 * add-visual-table-markers.js  (ESM)
 *
 * Migração única — envolve cada tabela de propriedades visuais em
 * DSS_REFERENCIA_VISUAL_ANALISE.md com marcadores por componente:
 *
 *   <!-- BEGIN:VISUAL-TABLE:DssXxx -->
 *   | Propriedade | ...
 *   <!-- END:VISUAL-TABLE:DssXxx -->
 *
 * O script é idempotente: pula seções que já possuem os marcadores.
 *
 * Uso: node scripts/add-visual-table-markers.js
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const ROOT       = path.resolve(__dirname, '..')
const VISUAL_DOC = path.join(ROOT, 'docs', 'governance', 'DSS_REFERENCIA_VISUAL_ANALISE.md')

function main() {
  const content = fs.readFileSync(VISUAL_DOC, 'utf-8')
  const lines   = content.split('\n')
  const result  = []
  let i = 0
  let processed = 0
  let skipped   = 0
  let noTable   = 0

  while (i < lines.length) {
    const line        = lines[i]
    const headerMatch = line.match(/^### 4\.\d+ (Dss\w+)/)

    if (!headerMatch) {
      result.push(line)
      i++
      continue
    }

    const componentName = headerMatch[1]
    const beginMarker   = `<!-- BEGIN:VISUAL-TABLE:${componentName} -->`
    const endMarker     = `<!-- END:VISUAL-TABLE:${componentName} -->`

    // Coleta linhas até o próximo header de seção ou marcador auto-gerado
    const sectionLines = [line]
    i++
    while (i < lines.length) {
      const curr = lines[i]
      if (curr.match(/^### /) || curr.startsWith('<!-- BEGIN:AUTO-GENERATED')) break
      sectionLines.push(curr)
      i++
    }

    // Idempotência: pula se já tem marcadores
    if (sectionLines.some(l => l.includes(beginMarker))) {
      sectionLines.forEach(l => result.push(l))
      skipped++
      continue
    }

    // Localiza início e fim da tabela (bloco contíguo de linhas com |)
    let tableStartIdx = -1
    let tableEndIdx   = -1

    for (let j = 0; j < sectionLines.length; j++) {
      if (sectionLines[j].startsWith('| Propriedade |') && tableStartIdx === -1) {
        tableStartIdx = j
        let k = j + 1
        while (k < sectionLines.length && sectionLines[k].startsWith('|')) k++
        tableEndIdx = k - 1
        break
      }
    }

    if (tableStartIdx === -1) {
      sectionLines.forEach(l => result.push(l))
      noTable++
      continue
    }

    // Reconstrói seção com marcadores ao redor da tabela
    for (let j = 0; j < sectionLines.length; j++) {
      if (j === tableStartIdx)  result.push(beginMarker)
      result.push(sectionLines[j])
      if (j === tableEndIdx)    result.push(endMarker)
    }
    processed++
  }

  fs.writeFileSync(VISUAL_DOC, result.join('\n'), 'utf-8')
  console.log(`✅ Marcadores adicionados: ${processed} seções`)
  console.log(`⏭️  Já marcadas (skip):     ${skipped}`)
  console.log(`⚠️  Sem tabela encontrada:  ${noTable}`)
}

main()
