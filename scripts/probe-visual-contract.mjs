#!/usr/bin/env node
/**
 * probe-visual-contract.mjs — verifica as `visualProperties` do meta.json
 * contra o componente REAL renderizado no browser.
 *
 * POR QUE EXISTE
 * Dos 8 defeitos reais encontrados na adequação do DssMultiselectAutocomplete
 * (ago/2026), SETE eram invisíveis à análise estática: cascata de CSS que matava
 * o scroll do dropdown, `currentColor` auto-referente deixando o "×" branco sobre
 * branco, `color-mix` com token sem unidade virando regra morta, overlay escuro
 * empilhado no hover, tema preso a uma div interna. Nenhum teste unitário pegou
 * nada — jsdom não tem layout nem CSS, e isso é limite estrutural, não descuido.
 *
 * O `defaultPreview.visualProperties` do meta.json já declara propriedade, token,
 * valor e arquivo de origem. Até aqui isso era DOCUMENTAÇÃO — e documentação
 * envelhece calada: o meta do multiselect declarava um `gap --dss-spacing-2` que
 * havia sumido do SCSS e ninguém percebeu. Este prober transforma a declaração em
 * ASSERÇÃO.
 *
 * COMO COMPARA
 * Havendo `token` declarado, o esperado é o valor RESOLVIDO do token no
 * documento — não o literal gravado no meta. Assim o que se verifica é o elo
 * "o componente pinta com ESTE token" (Constituição #1), e não uma fotografia
 * que envelhece a cada recalibração de paleta. Sem token, cai no literal `value`.
 *
 * CONTRATO DO BLOCO `probe` (aditivo — entrada sem ele é reportada como
 * declarada-porém-não-verificável, nunca silenciosamente ignorada):
 *
 *   "probe": {
 *     "selector":  ".dss-x__option",   // alvo no DOM
 *     "css":       "background-color", // propriedade computada
 *     "state":     "hover",            // opcional: hover
 *     "openPanel": true,               // opcional: chama showPopup() antes
 *     "themes":    ["light","dark"]    // opcional (default: ["light"])
 *   }
 *
 * USO
 *   node scripts/probe-visual-contract.mjs DssMultiselectAutocomplete
 *   node scripts/probe-visual-contract.mjs DssX --gate      # exit 1 se divergir
 *   node scripts/probe-visual-contract.mjs DssX --url=http://localhost:5173
 *
 * REQUER o dev server do sandbox no ar. É comando de FECHAMENTO de componente,
 * não de pre-commit: precisa de browser e é lento por natureza.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const args = process.argv.slice(2)
const GATE = args.includes('--gate')
const nome = args.find((a) => !a.startsWith('--'))
const URL_BASE = (args.find((a) => a.startsWith('--url=')) || '--url=http://localhost:5173').slice(6)

if (!nome) {
  console.error('uso: node scripts/probe-visual-contract.mjs <Componente> [--gate] [--url=...]')
  process.exit(2)
}

// ── meta.json ───────────────────────────────────────────────────────────────
function acharMeta(comp) {
  for (const grupo of ['base', 'composed', 'stress-test']) {
    const p = path.join(ROOT, 'packages/core/components', grupo, comp, 'dss.meta.json')
    if (fs.existsSync(p)) return p
  }
  return null
}

const metaPath = acharMeta(nome)
if (!metaPath) {
  console.error(`❌ dss.meta.json não encontrado para ${nome}`)
  process.exit(2)
}
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
const dp = meta.defaultPreview || {}
const propriedades = dp.visualProperties || []

if (!propriedades.length) {
  console.log(`⚠️  ${nome}: nenhuma visualProperty declarada — nada a verificar.`)
  process.exit(0)
}

const verificaveis = propriedades.filter((p) => p.probe?.selector && p.probe?.css)
const semProbe = propriedades.filter((p) => !(p.probe?.selector && p.probe?.css))

// ── execução ────────────────────────────────────────────────────────────────
const temas = [...new Set(verificaveis.flatMap((p) => p.probe.themes || ['light']))]

console.log(`🔬 Prober de contrato visual — ${nome}`)
console.log(`   ${propriedades.length} propriedade(s) declarada(s) · ${verificaveis.length} verificável(is)\n`)

const browser = await chromium.launch()
const resultados = []

try {
  for (const tema of temas) {
    const alvos = verificaveis.filter((p) => (p.probe.themes || ['light']).includes(tema))
    if (!alvos.length) continue

    const page = await browser.newPage({ viewport: { width: 1200, height: 800 } })
    await page.goto(`${URL_BASE}/?frame=${nome}`, { waitUntil: 'networkidle', timeout: 60000 })

    // O Subject escuta `message` no próprio window e espera o mesmo payload que o
    // PreviewFrame envia. Sem parent, postamos para nós mesmos.
    const props = { ...(dp.props || {}) }
    const modelDefault = props.modelValue
    delete props.modelValue

    await page.evaluate(
      ([props, modelDefault, tema]) => {
        window.postMessage(
          { __frame: true, props, theme: tema, brand: '', modelProp: 'modelValue', modelDefault, slots: [], slotIcons: {}, emits: [] },
          '*'
        )
      },
      [props, modelDefault, tema]
    )
    await page.waitForTimeout(800)

    for (const p of alvos) {
      const { selector, css, state, openPanel } = p.probe
      const linha = { tema, rotulo: p.property, token: p.token, css, selector }

      try {
        if (openPanel) {
          await page.evaluate(() => window.postMessage({ __frameCall: true, method: 'showPopup' }, '*'))
          await page.waitForTimeout(600)
        }
        await page.waitForSelector(selector, { timeout: 5000, state: 'attached' })
        if (state === 'hover') {
          await page.hover(selector)
          await page.waitForTimeout(200)
        }

        const { obtido, esperado } = await page.evaluate(
          ([selector, css, token, literal]) => {
            // Normaliza qualquer notação de cor para a forma computada do browser,
            // senão "#1f86de" nunca bateria com "rgb(31, 134, 222)".
            const norm = (v) => {
              if (!v) return v
              const s = String(v).trim()
              if (!/^(#|rgb|hsl|[a-z]+$)/i.test(s)) return s
              const d = document.createElement('div')
              d.style.color = ''
              d.style.color = s
              if (!d.style.color) return s
              document.body.appendChild(d)
              const out = getComputedStyle(d).color
              d.remove()
              return out
            }
            const el = document.querySelector(selector)
            // getPropertyValue aceita kebab-case ("background-color"), que é como
            // a propriedade se escreve no meta; indexar direto falharia.
            const obtido = el ? getComputedStyle(el).getPropertyValue(css).trim() : null
            const bruto = token
              ? getComputedStyle(document.documentElement).getPropertyValue(token).trim()
              : literal
            return { obtido: norm(obtido), esperado: norm(bruto) }
          },
          [selector, css, p.token || null, p.value || null]
        )

        linha.obtido = obtido
        linha.esperado = esperado
        linha.ok = obtido != null && esperado != null && obtido === esperado
        if (obtido == null) linha.erro = 'seletor não encontrado'
      } catch (e) {
        linha.ok = false
        linha.erro = String(e.message || e).split('\n')[0].slice(0, 80)
      }

      resultados.push(linha)
    }

    await page.close()
  }
} finally {
  await browser.close()
}

// ── relatório ───────────────────────────────────────────────────────────────
const falhas = resultados.filter((r) => !r.ok)

for (const tema of temas) {
  const doTema = resultados.filter((r) => r.tema === tema)
  if (!doTema.length) continue
  console.log(`🎨 tema ${tema}`)
  for (const r of doTema) {
    const marca = r.ok ? '✅' : '❌'
    console.log(`  ${marca} ${r.rotulo}`)
    console.log(`     ${r.selector} → ${r.css}${r.token ? `  (token ${r.token})` : ''}`)
    if (!r.ok) {
      if (r.erro) console.log(`     ⚠️  ${r.erro}`)
      else console.log(`     esperado ${r.esperado}  ·  obtido ${r.obtido}`)
    }
  }
  console.log()
}

if (semProbe.length) {
  console.log(`ℹ️  ${semProbe.length} propriedade(s) declarada(s) SEM bloco \`probe\` — não verificáveis:`)
  for (const p of semProbe) console.log(`   - ${p.property}`)
  console.log('   (declare selector + css no meta.json para incluí-las)\n')
}

const total = resultados.length
if (!falhas.length) {
  console.log(`✅ Contrato visual: ${total}/${total} conferem com o renderizado.`)
  process.exit(0)
}
console.log(`❌ Contrato visual: ${falhas.length} de ${total} divergem do renderizado.`)
process.exit(GATE ? 1 : 0)
