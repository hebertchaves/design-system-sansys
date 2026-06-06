/**
 * inject-token-table-markers.js  (ESM)
 *
 * Script de execução ÚNICA. Injeta marcadores <!-- BEGIN/END:TOKEN-TABLE:key -->
 * em torno das tabelas markdown existentes no DSS_TOKEN_REFERENCE.md.
 *
 * Após a injeção, sync-tokens-to-reference.js mantém as tabelas atualizadas
 * automaticamente no pre-commit.
 *
 * As tabelas sem marcador permanecem inalteradas (manutenção manual).
 *
 * Mapeamento: seção do documento → chave do arquivo SCSS de tokens.
 *
 * Uso (execução única):
 *   node scripts/inject-token-table-markers.js
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const ROOT      = path.resolve(__dirname, '..')
const TOKEN_REF = path.join(ROOT, 'docs', 'reference', 'DSS_TOKEN_REFERENCE.md')

// ── Mapeamento: heading markdown → chave TOKEN-TABLE ─────────────────────────
//
// Cada entrada: { heading: string (trecho único do heading ##), key: string }
// O script localiza o primeiro markdown table (`| col |`) APÓS o heading
// e envolve com os marcadores BEGIN/END.
//
// Chaves sem seção explícita no SCSS (basename-only): toda a tabela do arquivo.
// Chaves com sub-seção (basename-subkey): tabelas de _dimensions.scss (já inseridas).

const SECTION_MAP = [
  // ── 1. Espaçamento ─────────────────────────────────────────────────────────
  { heading: '1.1 Escala Base',           key: 'spacing-escala-base'        },
  { heading: '1.2 Espaçamentos Semânticos', key: 'spacing-semanticos'       },
  { heading: '1.3 Grid e Gap',             key: 'spacing-grid-gap'          },
  { heading: '1.4 Formulários',            key: 'spacing-formularios'       },
  { heading: '1.5 Margins',                key: 'spacing-margins'           },
  { heading: '1.6 Paddings',               key: 'spacing-paddings'          },
  { heading: '1.7 Gaps',                   key: 'spacing-gaps'              },
  { heading: '1.8 Acessibilidade',         key: 'spacing-acessibilidade'    },
  { heading: '1.9 Border Radius',          key: 'spacing-border-radius'     },

  // ── 3. Actions ─────────────────────────────────────────────────────────────
  { heading: '3.1 Primary Actions',        key: 'actions-primary'           },
  { heading: '3.2 Secondary Actions',      key: 'actions-secondary'         },
  { heading: '3.3 Tertiary Actions',       key: 'actions-tertiary'          },
  { heading: '3.4 Accent Actions',         key: 'actions-accent'            },
  { heading: '3.5 Dark Actions',           key: 'actions-dark'              },
  { heading: '3.6 Action Surfaces',        key: 'actions-surfaces'          },

  // ── 4. Feedback ────────────────────────────────────────────────────────────
  { heading: '4.1 Success',               key: 'feedback-success'           },
  { heading: '4.2 Error',                 key: 'feedback-error'             },
  { heading: '4.3 Warning',               key: 'feedback-warning'           },
  { heading: '4.4 Info',                  key: 'feedback-info'              },
  { heading: '4.5 Feedback Surfaces',     key: 'feedback-surfaces'          },
  { heading: '4.6 Textos de Componentes', key: 'feedback-textos'            },
  { heading: '4.7 Surface Hierarchy',     key: 'feedback-hierarchy'         },

  // ── 5. Motion ──────────────────────────────────────────────────────────────
  { heading: '5.1 Durações Base',          key: 'motion-duracoes-base'      },
  { heading: '5.2 Durações Semânticas',    key: 'motion-duracoes-semanticas'},
  { heading: '5.3 Durações Interativas',   key: 'motion-duracoes-interativas'},
  { heading: '5.4 Curvas de Easing',       key: 'motion-easing'             },
  { heading: '5.5 Atrasos',               key: 'motion-atrasos'             },
  { heading: '5.6 Transições Semânticas',  key: 'motion-transicoes'         },
  { heading: '5.7 Animações Predefinidas', key: 'motion-animacoes'          },
  { heading: '5.8 Temporizadores',         key: 'motion-temporizadores'     },

  // ── 6. Tipografia ──────────────────────────────────────────────────────────
  { heading: '6.1 Famílias de Fonte',      key: 'text-familias'             },
  { heading: '6.2 Tamanhos de Fonte',      key: 'text-tamanhos'             },
  { heading: '6.3 Pesos de Fonte',         key: 'text-pesos'                },
  { heading: '6.4 Altura de Linha',        key: 'text-line-height'          },
  { heading: '6.5 Espaçamento de Letras',  key: 'text-letter-spacing'       },
  { heading: '6.6 Hierarquia de Títulos',  key: 'text-hierarquia'           },
  { heading: '6.7 Utilitários de Legibilidade', key: 'text-utilitarios'     },

  // ── 7. Acessibilidade ──────────────────────────────────────────────────────
  { heading: '7.1 Focus - Configurações Base', key: 'accessibility-focus-base' },
  { heading: '7.2 Focus - Cores Semânticas',   key: 'accessibility-focus-cores-semanticas' },
  { heading: '7.3 Focus - Cores de Feedback',  key: 'accessibility-focus-feedback' },
  { heading: '7.4 Focus - Cores Neutras',      key: 'accessibility-focus-neutras' },
  { heading: '7.5 Focus - Box Shadows',        key: 'accessibility-focus-shadows' },
  { heading: '7.6 Focus - Variantes com Offset', key: 'accessibility-focus-offset' },
  { heading: '7.7 Touch Targets',              key: 'accessibility-touch-targets' },
  { heading: '7.8 Touch Spacing',              key: 'accessibility-touch-spacing' },
  { heading: '7.9 Input Heights',              key: 'accessibility-input-heights' },
  { heading: '7.10 Checkboxes e Controles',    key: 'accessibility-checkboxes' },
  { heading: '7.11 Ícones',                    key: 'accessibility-icons'    },
  { heading: '7.12 Avatares',                  key: 'accessibility-avatares' },
  { heading: '7.13 Compact Controls',          key: 'accessibility-compact-controls' },
  { heading: '7.14 Breakpoints',               key: 'breakpoints'            },
  { heading: '7.15 Z-Index',                   key: 'z-index'                },
  { heading: '7.16 Contraste - Ratios',        key: 'accessibility-contrast-ratios' },
  { heading: '7.17 Contraste - Combinações',   key: 'accessibility-contrast-combinacoes' },

  // ── 8. Borders ─────────────────────────────────────────────────────────────
  { heading: '8.1 Border Widths',             key: 'border-widths'          },
  { heading: '8.2 Bordas Neutras',            key: 'borders-neutras'        },
  { heading: '8.3 Bordas de Ação',            key: 'borders-acao'           },
  { heading: '8.4 Bordas de Feedback',        key: 'borders-feedback'       },
  { heading: '8.5 Bordas de Marca',           key: 'borders-marca'          },
  { heading: '8.6 Bordas de Dark',            key: 'borders-dark'           },
  { heading: '8.7 Bordas Funcionais',         key: 'borders-funcionais'     },

  // ── 9. Shadows ─────────────────────────────────────────────────────────────
  { heading: '9.1 Sombras Base',              key: 'shadows-base'           },
  { heading: '9.2 Sombras Semânticas',        key: 'shadows-semanticas'     },
  { heading: '9.3 Sombras de Marca',          key: 'shadows-marca'          },
  { heading: '9.4 Elevação Semântica',        key: 'shadows-elevacao'       },
  { heading: '9.5 Sombras para Estados',      key: 'shadows-estados'        },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Encontra o índice do início da primeira tabela markdown APÓS uma posição.
 * Retorna { tableStart, tableEnd } ou null se não encontrar.
 */
function findTableAfter(lines, fromLine) {
  let tableStart = -1
  let tableEnd   = -1

  for (let i = fromLine; i < lines.length; i++) {
    const line = lines[i].trim()

    // Início da tabela: linha com |
    if (tableStart === -1 && line.startsWith('|') && line.endsWith('|')) {
      tableStart = i
      continue
    }

    // Dentro da tabela: continua enquanto houver |
    if (tableStart !== -1) {
      if (line.startsWith('|') && line.endsWith('|')) {
        tableEnd = i
        continue
      }
      // Linha vazia ou sem | = fim da tabela
      if (tableEnd >= tableStart) break
      // Quebra sem encontrar tabela válida (apenas uma linha | não é tabela)
      tableStart = -1
    }
  }

  if (tableStart === -1 || tableEnd === -1 || tableEnd <= tableStart) return null
  return { tableStart, tableEnd }
}

// ── Main ───────────────────────────────────────────────────────────────────────

function main() {
  let docContent = fs.readFileSync(TOKEN_REF, 'utf-8')
  const lines    = docContent.split('\n')
  let   inserted = 0
  let   skipped  = 0

  // Processar em ordem reversa para não deslocar índices
  const insertions = []

  for (const { heading, key } of SECTION_MAP) {
    // Verifica se o marcador já existe
    if (docContent.includes(`<!-- BEGIN:TOKEN-TABLE:${key} -->`)) {
      skipped++
      continue
    }

    // Encontra a linha com o heading markdown (## N.M ...) — ignora ocorrências no índice
    const headingLine = lines.findIndex(l => /^#{1,4}\s/.test(l) && l.includes(heading))
    if (headingLine === -1) continue

    // Encontra a tabela após o heading (dentro das próximas 20 linhas)
    const tableRange = findTableAfter(lines, headingLine + 1)
    if (!tableRange) continue

    insertions.push({
      tableStart: tableRange.tableStart,
      tableEnd:   tableRange.tableEnd,
      key,
      heading,
    })
  }

  // Ordenar inversamente por posição para inserir sem deslocar índices
  insertions.sort((a, b) => b.tableStart - a.tableStart)

  let currentLines = [...lines]

  for (const { tableStart, tableEnd, key } of insertions) {
    const beginMarker = `<!-- BEGIN:TOKEN-TABLE:${key} -->`
    const endMarker   = `<!-- END:TOKEN-TABLE:${key} -->`

    // Inserir END marker após a última linha da tabela
    currentLines.splice(tableEnd + 1, 0, endMarker)
    // Inserir BEGIN marker antes da primeira linha da tabela
    currentLines.splice(tableStart, 0, beginMarker)

    inserted++
  }

  const newContent = currentLines.join('\n')
  fs.writeFileSync(TOKEN_REF, newContent, 'utf-8')

  console.log(`Marcadores TOKEN-TABLE inseridos: ${inserted}`)
  if (skipped > 0) console.log(`Seções já com marcador (ignoradas): ${skipped}`)
  console.log('Execute npm run sync:tokens-to-reference para regenerar as tabelas.')
}

main()
