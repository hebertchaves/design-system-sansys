#!/usr/bin/env node
/**
 * validate-scale.mjs — Escala dimensional por tamanho: sem empate, sem inversão.
 *
 * CONTEXTO (set/2026). O mesmo defeito estrutural mordeu TRÊS vezes no DssButton
 * em uma única onda — tamanho de ícone, padding horizontal e font-size —, e
 * nenhum dos 18 validadores do pre-commit piscou. Não piscaria mesmo: o CSS é
 * válido, compila, e a escala só é "errada" quando comparada com a INTENÇÃO.
 *
 * A RAIZ é sempre a mesma e vale para qualquer componente com tamanhos: o `md`
 * costuma ser o único sem regra própria, porque é o default e "já está na base".
 * Isso é saudável — enquanto a base declarar o valor DELE. No dia em que a base
 * declara o valor de outro degrau, o `md` some da escala sem quebrar nada:
 *
 *   xs 12 · sm 14 · md 14 · lg 18 · xl 20     (o md empatou com o sm)
 *   xs  8 · sm 12 · md 24 · lg 20 · xl 24     (o md passou o lg — inversão)
 *
 * O QUE ELE COBRA
 *
 *   B) EMPATE — dois tamanhos vizinhos com o mesmo valor efetivo. BLOQUEIA.
 *   C) INVERSÃO — tamanho maior com valor MENOR que o anterior. BLOQUEIA.
 *   A) tamanho sem regra própria — apenas INFORMATIVO. Não é defeito: é o padrão
 *      são do `md` (ver DssAvatar). Vira defeito só se resultar em B ou C, e aí
 *      já é pego acima.
 *
 * TRÊS CUIDADOS que a primeira versão deste script não teve — e por isso mentiu:
 *
 *   1. CRUZA COM A API. "Sem regra própria" não é defeito por si: num tamanho que
 *      o componente NÃO expõe, é inócuo. Reportei `xl` menor que `lg` no DssChip
 *      sem checar que `ChipSize` não tem `xl`. Aqui a lista de tamanhos vem do
 *      `types/*.types.ts`.
 *   2. SELETOR ESTRITO. Só a raiz do PRÓPRIO componente e raiz+modificador de
 *      tamanho. Aceitar qualquer `.dss-*` fazia regra de estado, tema ou de outro
 *      componente embutido no módulo sobrescrever a base.
 *   3. MAPA DE TOKENS SEM COMENTÁRIO, com AUTO-AFERIÇÃO. Os arquivos de token
 *      citam nomes na prosa (blocos de depreciação); sem strip, o mapa nasce
 *      torto e TODO o relatório mente. A aferição confere valores conhecidos
 *      antes de reportar qualquer coisa e aborta se não baterem.
 *
 * Uso:
 *   node scripts/validate-scale.mjs               # relatório
 *   node scripts/validate-scale.mjs --gate        # exit 1 se houver NOVO
 *   node scripts/validate-scale.mjs --update-baseline
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CORE = path.join(ROOT, 'packages/core')
const LOAD = [CORE, ROOT, path.join(ROOT, 'node_modules')]
const BASELINE = path.join(__dirname, 'scale-baseline.json')

const argv = process.argv.slice(2)
const GATE = argv.includes('--gate')
const UPDATE = argv.includes('--update-baseline')

const ORDEM = ['xs', 'sm', 'md', 'lg', 'xl']
const PROPS = ['font-size', 'min-height', 'height', 'gap']

function walk(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (p.endsWith('.scss')) out.push(p)
  }
  return out
}

/** Mapa de tokens, COMENTÁRIO FORA e primeira definição vencendo. */
const TOK = {}
for (const f of walk(path.join(CORE, 'tokens'))) {
  const src = fs.readFileSync(f, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\/\/[^\n]*/g, ' ')
  for (const m of src.matchAll(/(--dss-[\w-]+):\s*([^;]+);/g)) {
    if (!(m[1] in TOK)) TOK[m[1]] = m[2].trim()
  }
}

function px(v, n = 0) {
  if (!v || n > 6) return null
  v = String(v).trim()
  const t = /^var\((--dss-[\w-]+)/.exec(v)
  if (t) return px(TOK[t[1]], n + 1)
  let r = /^([\d.]+)px$/.exec(v); if (r) return parseFloat(r[1])
  r = /^([\d.]+)rem$/.exec(v); if (r) return parseFloat(r[1]) * 16
  return null
}

// Auto-aferição: se o mapa estiver torto, o relatório inteiro mente.
const AFERE = {
  '--dss-font-size-md': 16, '--dss-font-size-sm': 14,
  '--dss-touch-target-md': 44, '--dss-compact-control-height-md': 28,
}
for (const [t, esperado] of Object.entries(AFERE)) {
  const v = px(`var(${t})`)
  if (v !== esperado) {
    console.error(`❌ mapa de tokens torto: ${t} resolveu ${v}, esperado ${esperado}.`)
    console.error('   Relatório ABORTADO — reportar com o mapa errado é pior que não reportar.')
    process.exit(2)
  }
}

function tamanhosDaApi(compDir) {
  const tdir = path.join(compDir, 'types')
  if (!fs.existsSync(tdir)) return null
  for (const f of fs.readdirSync(tdir)) {
    const src = fs.readFileSync(path.join(tdir, f), 'utf8')
    const m = /(?:Size|size)\s*=\s*((?:\s*\|?\s*'(?:xs|sm|md|lg|xl)'\s*(?:\/\/[^\n]*)?\n?)+)/.exec(src)
    if (m) return ORDEM.filter(s => new RegExp(`'${s}'`).test(m[1]))
  }
  return null
}

function analisa(compDir) {
  const nome = path.basename(compDir)
  const mod = fs.readdirSync(compDir).find(f => f.endsWith('.module.scss'))
  if (!mod) return null
  const api = tamanhosDaApi(compDir)
  if (!api || api.length < 3) return null

  let css
  try {
    css = sass.compile(path.join(compDir, mod), {
      loadPaths: LOAD, style: 'expanded',
      silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
    }).css
  } catch { return null }
  css = css.replace(/\/\*[\s\S]*?\*\//g, ' ')

  const raiz = '.dss-' + nome.slice(3).replace(/(?<!^)([A-Z])/g, '-$1').toLowerCase()
  const porSize = {}, base = {}
  for (const m of css.matchAll(/([^{}]*)\{([^{}]*)\}/g)) {
    const sel = m[1].trim().split('\n').pop().trim()
    const ehRaiz = sel === raiz
    const tag = new RegExp(`^${raiz}--(xs|sm|md|lg|xl)$`).exec(sel)
    if (!ehRaiz && !tag) continue
    for (const p of PROPS) {
      const v = new RegExp(`(?:^|;)\\s*${p}:\\s*([^;]+);`).exec(m[2])
      if (!v) continue
      const n = px(v[1])
      if (n == null) continue
      if (tag) (porSize[p] ||= {})[tag[1]] = n
      else base[p] = n
    }
  }

  const defeitos = [], informativos = []
  for (const [p, mapa] of Object.entries(porSize)) {
    if (api.filter(s => mapa[s] != null).length < 2) continue
    const efetivo = s => mapa[s] ?? base[p] ?? null
    for (const s of api) if (mapa[s] == null) {
      informativos.push(`${p}: '${s}' sem regra própria → ${base[p] != null ? `herda ${base[p]}px da base` : 'e sem valor na base'}`)
    }
    for (let i = 0; i < api.length - 1; i++) {
      const a = api[i], b = api[i + 1], va = efetivo(a), vb = efetivo(b)
      if (va == null || vb == null) continue
      if (va === vb) defeitos.push({ chave: `${nome}|${p}|${a}=${b}`, txt: `B · ${p}: '${a}' = '${b}' = ${va}px (empate)` })
      else if (vb < va) defeitos.push({ chave: `${nome}|${p}|${b}<${a}`, txt: `C · ${p}: '${b}' (${vb}px) MENOR que '${a}' (${va}px) — escala INVERTIDA` })
    }
  }
  return { nome, api, defeitos, informativos }
}

const dirs = []
for (const g of ['base', 'composed']) {
  const b = path.join(CORE, 'components', g)
  if (fs.existsSync(b)) for (const d of fs.readdirSync(b)) {
    const p = path.join(b, d)
    if (fs.statSync(p).isDirectory()) dirs.push(p)
  }
}

const relatos = dirs.map(analisa).filter(r => r && (r.defeitos.length || r.informativos.length))
const todos = relatos.flatMap(r => r.defeitos.map(d => ({ ...d, nome: r.nome })))

if (UPDATE) {
  fs.writeFileSync(BASELINE, JSON.stringify({
    note: 'Empates/inversões de escala JÁ CONHECIDOS. O gate bloqueia os NOVOS. ' +
          'Ao adequar um componente, resolva o que estiver aqui e remova a entrada.',
    conhecidos: todos.map(d => d.chave).sort(),
  }, null, 2) + '\n')
  console.log(`✅ Baseline atualizado (${todos.length} conhecido(s)).`)
  process.exit(0)
}

const base = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : { conhecidos: [] }
const novos = todos.filter(d => !base.conhecidos.includes(d.chave))
const ehNovo = (d) => novos.some(n => n.chave === d.chave)   // por CHAVE, não por referência

console.log('🔎 Escala dimensional por tamanho (empate / inversão)\n')
for (const r of relatos) {
  if (!r.defeitos.length && !r.informativos.length) continue
  const temNovo = r.defeitos.some(ehNovo)
  console.log(`   ${r.nome}  [API: ${r.api.join(' ')}]`)
  for (const d of r.defeitos) console.log(`      ${ehNovo(d) ? '❌ NOVO' : '·  conhecido'}  ${d.txt}`)
  for (const i of r.informativos) console.log(`      ℹ️  ${i}`)
  if (temNovo) console.log('')
}

console.log(`\n   ${todos.length} empate(s)/inversão(ões) · ${base.conhecidos.length} no baseline · ${novos.length} NOVO(s)`)
if (!novos.length) {
  console.log('\n✅ Nenhum caso NOVO.')
  process.exit(0)
}
console.log('\n📖 A escala deve subir a cada degrau. Um tamanho sem regra própria só é seguro')
console.log('   enquanto a BASE declarar o valor dele — ver §N do DSS_UI_ADEQUACAO_CHECKLIST.md.')
if (GATE) process.exit(1)
