#!/usr/bin/env node
/**
 * sync-portal-tokens — Sincroniza os tokens DSS do core para o docs-portal.
 *
 * Compila packages/core/tokens/index.scss (fonte canônica — Princípio #12)
 * e injeta o CSS resultante, envolvido em @layer base, entre os marcadores
 * BEGIN/END:DSS-TOKENS-AUTO-GENERATED de apps/docs-portal/src/index.css.
 *
 * Criado na Onda P0/T7.6: o portal mantinha 355 declarações --dss-* copiadas
 * à mão, 262 duplicadas e 13 DIVERGENTES do core (bloqueante A12 da
 * Auditoria Final Jun/2026 — "portal renderiza com paleta desatualizada").
 *
 * Uso: npm run sync:portal-tokens
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const entry = resolve(root, 'packages/core/tokens/index.scss')
const target = resolve(root, 'apps/docs-portal/src/index.css')

const BEGIN = '/* BEGIN:DSS-TOKENS-AUTO-GENERATED */'
const END = '/* END:DSS-TOKENS-AUTO-GENERATED */'

console.log('Compilando tokens do core…')
const css = execFileSync(
  'npx',
  ['sass', entry, '--no-source-map', '--quiet-deps', '--style=expanded'],
  { cwd: root, encoding: 'utf-8', maxBuffer: 32 * 1024 * 1024 }
)

const stamp = new Date().toISOString().slice(0, 10)
const generated = [
  BEGIN,
  `/* Fonte: packages/core/tokens/index.scss — sincronizado em ${stamp}. */`,
  '/* @layer base: paridade com a estratégia Tailwind v4 do portal. */',
  '@layer base {',
  css.trim(),
  '}',
  END,
].join('\n')

const doc = readFileSync(target, 'utf-8')
const begin = doc.indexOf(BEGIN)
const end = doc.indexOf(END)
if (begin === -1 || end === -1) {
  console.error(`Marcadores não encontrados em ${target}`)
  process.exit(1)
}

writeFileSync(target, doc.slice(0, begin) + generated + doc.slice(end + END.length))
const lines = css.trim().split('\n').length
console.log(`✅ ${lines} linhas de tokens injetadas em apps/docs-portal/src/index.css`)
