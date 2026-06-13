import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { describe, it, expect, beforeAll } from 'vitest'
import { BRIDGE_PAIRS } from '../../helpers/tokenMatrix.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const MAPPING_PATH = resolve(__dirname, '../../../../../packages/core/themes/_quasar-tokens-mapping.scss')

describe('Análise Estática — Bridge --q-* → --dss-*', () => {
  let mapping: string

  beforeAll(() => {
    mapping = readFileSync(MAPPING_PATH, 'utf8')
  })

  it('bridge --q-* está declarada em algum bloco :root do arquivo', () => {
    expect(mapping).toMatch(/:root\s*\{/)
    expect(mapping).toContain('--q-primary')
  })

  it.each(BRIDGE_PAIRS)('%s referencia %s como valor', (qVar, dssVar) => {
    expect(mapping).toContain(`${qVar}:`)
    expect(mapping).toContain(`var(${dssVar})`)
  })

  it('bridge --q-* não contém cores hardcoded (hex ou rgb)', () => {
    // Extrai todos os blocos :root e concatena para busca
    const allRootBlocks = [...mapping.matchAll(/:root\s*\{([^}]+)\}/g)]
      .map(m => m[1])
      .join('\n')
    expect(allRootBlocks).not.toMatch(/#[0-9a-fA-F]{3,6}/)
    expect(allRootBlocks).not.toMatch(/rgb\(/)
  })

  it('arquivo de mapeamento usa @use (não @import)', () => {
    expect(mapping).not.toContain('@import')
  })
})
