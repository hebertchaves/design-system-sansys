#!/usr/bin/env node
/**
 * validate-scss-tokens.cjs — Todo `var(--dss-*)` no SCSS de componente existe.
 *
 * CONTEXTO (jul/2026). O `sync-css-to-meta --validate` checa os tokens do
 * dss.meta.json contra o catálogo, mas NÃO os `var(--dss-*)` escritos direto no
 * SCSS. Por isso um token INEXISTENTE (ex.: `--dss-error-600`, que nunca foi
 * definido — só `--dss-feedback-error*` existe) passava batido: o CSS resolve
 * para vazio e o estado (erro/anel) some silenciosamente. Bug real em
 * DssField/DssRadio/DssToggle (~23 usos). Ver [[undefined-error-scale]].
 *
 * Regra: todo `var(--dss-x)` referenciado no SCSS de componente DEVE ter uma
 * definição `--dss-x:` em algum lugar de packages/core (tokens, themes ou o
 * próprio componente). Referência sem definição = token fantasma → FALHA.
 *
 * Uso:
 *   node scripts/validate-scss-tokens.cjs          # relatório
 *   node scripts/validate-scss-tokens.cjs --gate   # exit 1 se houver fantasma
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CORE = path.join(ROOT, 'packages', 'core');
const COMPONENTS = path.join(CORE, 'components');
const GATE = process.argv.slice(2).includes('--gate');

function walkScss(dir, acc = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== 'dist') walkScss(full, acc);
    } else if (e.name.endsWith('.scss')) acc.push(full);
  }
  return acc;
}

// Remove comentários (// linha e /* bloco */) p/ não contar token em comentário.
function stripComments(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

// 1. Catálogo: toda definição `--dss-x:` em QUALQUER .scss de packages/core.
const defined = new Set();
for (const f of walkScss(CORE)) {
  const src = stripComments(fs.readFileSync(f, 'utf8'));
  let m;
  const reDef = /(--dss-[a-z0-9-]+)\s*:/g;
  while ((m = reDef.exec(src))) defined.add(m[1]);
}

// Fixtures/páginas de teste — fora do escopo de produção (decisão de governança).
const FIXTURES = new Set(['DssTestPageComplexity', 'DssCadrisCard', 'DssDataCard']);

// 2. Referências `var(--dss-x)` no SCSS de COMPONENTE.
const ghosts = new Map(); // token -> [ "Comp/arquivo:linha", ... ]
for (const f of walkScss(COMPONENTS)) {
  const rel = path.relative(COMPONENTS, f).replace(/\\/g, '/');
  const comp = rel.split('/')[1] || rel;
  if (FIXTURES.has(comp)) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const code = stripComments(line);
    let m;
    const reRef = /var\(\s*(--dss-[a-z0-9-]+)/g;
    while ((m = reRef.exec(code))) {
      const tok = m[1];
      if (!defined.has(tok)) {
        if (!ghosts.has(tok)) ghosts.set(tok, []);
        ghosts.get(tok).push(`${comp}/${path.basename(f)}:${i + 1}`);
      }
    }
    // Interpolação de MARCA: `var(--dss-#{$brand}-<suffix>)` (mixins). O regex
    // literal acima não enxerga através do `#{...}` — foi assim que os ghosts
    // --dss-{hub,water,waste}-primary escaparam (Checkbox/Chip/Radio/Toggle). Aqui
    // resolvemos p/ as 3 marcas e checamos cada uma no catálogo.
    const reInterp = /var\(\s*--dss-#\{[^}]+\}-([a-z0-9-]+)/g;
    while ((m = reInterp.exec(code))) {
      for (const brand of ['hub', 'water', 'waste']) {
        const tok = `--dss-${brand}-${m[1]}`;
        if (!defined.has(tok)) {
          if (!ghosts.has(tok)) ghosts.set(tok, []);
          ghosts.get(tok).push(`${comp}/${path.basename(f)}:${i + 1} (interpolado #{$brand})`);
        }
      }
    }
  });
}

// Baseline (ratchet): débito pré-existente grandfathered. O gate bloqueia
// tokens fantasma NOVOS (fora do baseline) já; os existentes são débito rastreado
// a zerar aos poucos. `--update-baseline` regrava a lista atual.
const BASELINE_PATH = path.join(__dirname, 'scss-token-ghost-baseline.json');
const UPDATE = process.argv.slice(2).includes('--update-baseline');
const ghostNames = [...ghosts.keys()].sort();

if (UPDATE) {
  fs.writeFileSync(BASELINE_PATH, JSON.stringify({
    note: 'Tokens --dss-* referenciados mas NÃO definidos (débito). Gate bloqueia NOVOS fora desta lista. Zerar aos poucos e remover daqui.',
    tokens: ghostNames,
  }, null, 2) + '\n');
  console.log(`✅ Baseline atualizado: ${ghostNames.length} token(s) fantasma conhecido(s).`);
  process.exit(0);
}

let baseline = [];
try { baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8')).tokens || []; } catch { /* sem baseline */ }
const baseSet = new Set(baseline);
const newGhosts = ghostNames.filter((t) => !baseSet.has(t));
const knownGhosts = ghostNames.filter((t) => baseSet.has(t));
const staleBaseline = baseline.filter((t) => !ghosts.has(t)); // já corrigidos → limpar do baseline
const totalRefs = [...ghosts.values()].reduce((a, v) => a + v.length, 0);

console.log(`🔎 Tokens SCSS — todo var(--dss-*) deve existir (${defined.size} definidos)\n`);

if (knownGhosts.length) {
  console.log(`⚠️  Débito conhecido (baseline): ${knownGhosts.length} token(s) fantasma em ${totalRefs} ref(s) — a zerar.`);
}
if (staleBaseline.length) {
  console.log(`ℹ️  ${staleBaseline.length} entrada(s) do baseline já corrigida(s) — rode --update-baseline p/ limpar: ${staleBaseline.join(', ')}`);
}

if (!newGhosts.length) {
  console.log('\n✅ Nenhum token fantasma NOVO (fora do baseline).');
  process.exit(0);
}

console.log(`\n❌ ${newGhosts.length} token(s) fantasma NOVO(S) (fora do baseline):\n`);
for (const tok of newGhosts) {
  const uses = ghosts.get(tok);
  console.log(`  ${tok}  (${uses.length}×)`);
  for (const u of uses.slice(0, 8)) console.log(`     ↳ ${u}`);
  if (uses.length > 8) console.log(`     ↳ … +${uses.length - 8}`);
}
console.log('\n  Corrija p/ um token existente (ex.: --dss-error-* → --dss-feedback-error*),');
console.log('  ou (se for débito legado aceito) rode --update-baseline conscientemente.');
process.exit(GATE ? 1 : 0);
