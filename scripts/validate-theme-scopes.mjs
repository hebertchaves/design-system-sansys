/**
 * validate-theme-scopes.mjs
 *
 * Pega a armadilha registrada em `tokens/semantic/_scopes.scss`: um tema que
 * RE-APONTA PRIMITIVOS mas não foi acrescentado à lista `$primitivos`.
 *
 * POR QUE ISSO PRECISA DE GATE
 * Custom property substitui seu `var()` no elemento onde é DECLARADA. Se um tema
 * redefine `--dss-primary` mas a camada semântica só é declarada em `:root`,
 * então `--dss-action-primary: var(--dss-primary)` já computou lá em cima e o
 * tema não alcança nada — EXCETO quando o atributo está no próprio `<html>`,
 * onde `:root` e `[data-theme]` casam o mesmo elemento.
 *
 * Ou seja: funciona na raiz e falha aninhado. Em SILÊNCIO, parecendo que o tema
 * não fez nada. Foi o que aconteceu com o `hc` — e o repo usa tema aninhado em
 * 5 superfícies de preview, que é justamente onde alguém testa primeiro.
 *
 * O QUE ESTE GATE FAZ
 * 1. Lê `tokens/globals.scss` para saber quais tokens são PRIMITIVOS.
 * 2. No CSS compilado, acha todo `[data-theme=X]` que declara algum primitivo.
 * 3. Para cada um, cobra que TODO token semântico que dependa desse primitivo
 *    também seja declarado no escopo do tema.
 * 4. Reprova listando exatamente o que ficaria preso ao valor do `:root`.
 *
 * Uso:
 *   node scripts/validate-theme-scopes.mjs          # relata, exit 1 se houver falha
 *   node scripts/validate-theme-scopes.mjs --quiet  # só o veredito
 */

import * as sass from 'sass'
import postcss from 'postcss'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CORE = path.join(ROOT, 'packages', 'core')
const QUIET = process.argv.includes('--quiet')

// ── 1. primitivos = o que globals.scss declara ───────────────────────────────
const globais = fs.readFileSync(path.join(CORE, 'tokens', 'globals.scss'), 'utf8')
const PRIMITIVOS = new Set(
  [...globais.matchAll(/^\s*(--dss-[\w-]+)\s*:/gm)].map(m => m[1])
)

// ── 2. CSS compilado, indexado por escopo ────────────────────────────────────
const { css } = sass.compile(path.join(CORE, 'tokens', 'index.scss'), {
  loadPaths: [CORE, ROOT], style: 'expanded',
  silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
})
const root = postcss.parse(css)

const raiz = new Map()          // prop -> valor declarado em :root (sem at-rule)
const porTema = new Map()       // tema -> Set(props declaradas)

root.walkRules(regra => {
  // ignora o que está sob at-rule: é condicional, não vale para o default
  for (let p = regra.parent; p && p.type !== 'root'; p = p.parent) {
    if (p.type === 'atrule') return
  }
  for (const sel of regra.selectors) {
    const s = sel.trim()
    const mTema = s.match(/^\[data-theme=(\w+)\]$/)
    if (s === ':root') {
      regra.walkDecls(d => { if (d.prop.startsWith('--dss-') && !raiz.has(d.prop)) raiz.set(d.prop, d.value.trim()) })
    } else if (mTema) {
      const t = mTema[1]
      if (!porTema.has(t)) porTema.set(t, new Set())
      regra.walkDecls(d => { if (d.prop.startsWith('--dss-')) porTema.get(t).add(d.prop) })
    }
  }
})

// ── 3. dependência: semântico -> primitivos que ele referencia ───────────────
const dependeDe = new Map()
for (const [prop, valor] of raiz) {
  if (PRIMITIVOS.has(prop)) continue                    // primitivo não depende
  const refs = [...valor.matchAll(/var\(\s*(--dss-[\w-]+)/g)].map(m => m[1])
                 .filter(r => PRIMITIVOS.has(r))
  if (refs.length) dependeDe.set(prop, refs)
}

// ── 4. veredito ──────────────────────────────────────────────────────────────
console.log('🔎 Escopos de tema — quem re-aponta primitivo precisa recomputar o semântico\n')
console.log(`   primitivos: ${PRIMITIVOS.size} · semânticos dependentes: ${dependeDe.size} · temas: ${porTema.size}`)

let falhas = 0
for (const [tema, declarados] of porTema) {
  const repontados = [...declarados].filter(p => PRIMITIVOS.has(p))
  if (!repontados.length) {
    if (!QUIET) console.log(`\n   ✅ ${tema.padEnd(8)} não re-aponta primitivo (sobrescreve semântico direto) — não precisa de escopo`)
    continue
  }
  const presos = []
  for (const [sem, refs] of dependeDe) {
    if (!refs.some(r => repontados.includes(r))) continue
    if (!declarados.has(sem)) presos.push({ sem, via: refs.filter(r => repontados.includes(r)) })
  }
  if (presos.length) {
    falhas++
    console.log(`\n   ❌ ${tema} re-aponta ${repontados.length} primitivo(s), mas ${presos.length} token(s) semântico(s) NÃO recomputam:`)
    for (const { sem, via } of presos.slice(0, 12)) console.log(`        ${sem.padEnd(34)} depende de ${via.join(', ')}`)
    if (presos.length > 12) console.log(`        … e mais ${presos.length - 12}`)
    console.log(`      → estes ficam presos ao valor do :root em contexto ANINHADO.`)
    console.log(`      → corrija acrescentando [data-theme="${tema}"] a $primitivos em tokens/semantic/_scopes.scss`)
  } else if (!QUIET) {
    console.log(`\n   ✅ ${tema.padEnd(8)} re-aponta ${repontados.length} primitivo(s) e recomputa os ${
      [...dependeDe].filter(([, r]) => r.some(x => repontados.includes(x))).length} semântico(s) dependentes`)
  }
}

if (falhas) {
  console.log(`\n❌ ${falhas} tema(s) com escopo incompleto — funcionam na raiz e falham aninhados.\n`)
  process.exit(1)
}
console.log('\n✅ Todo tema que re-aponta primitivo recomputa a camada semântica.\n')
