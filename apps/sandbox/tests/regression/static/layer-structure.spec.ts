import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { describe, it, expect } from 'vitest'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CSS_PATH = resolve(__dirname, '../../../public/quasar-layered.css')

describe('Análise Estática — Estrutura do @layer quasar', () => {
  it('quasar-layered.css contém @layer quasar', () => {
    const css = readFileSync(CSS_PATH, 'utf8')
    expect(css).toContain('@layer quasar {')
  })

  it('totalidade dos !important (fora de comentários) está contida dentro de @layer quasar', () => {
    const css = readFileSync(CSS_PATH, 'utf8')
    // Remove comentários antes de contar — evita falso positivo em strings como /* (!important) */
    const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '')
    const totalImportant = (noComments.match(/!important/g) ?? []).length
    expect(totalImportant).toBeGreaterThan(100)

    const layerIdx = noComments.indexOf('@layer quasar {')
    expect(layerIdx).toBeGreaterThan(-1)

    const insideLayer = noComments.slice(layerIdx)
    const insideImportant = (insideLayer.match(/!important/g) ?? []).length
    expect(insideImportant).toBe(totalImportant)
  })

  it('não há regras CSS fora do @layer quasar', () => {
    const css = readFileSync(CSS_PATH, 'utf8')
    const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '')
    const layerIdx = noComments.indexOf('@layer quasar {')
    const beforeLayer = noComments.slice(0, layerIdx).trim()
    expect(beforeLayer).toBe('')
  })

  it('quasar-components.css foi removido do diretório public (arquivo legado arquivado)', () => {
    const legacyPath = resolve(__dirname, '../../../public/quasar-components.css')
    expect(existsSync(legacyPath)).toBe(false)
  })
})
