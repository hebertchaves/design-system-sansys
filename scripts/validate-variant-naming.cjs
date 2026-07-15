#!/usr/bin/env node
/**
 * validate-variant-naming.cjs — Grafia da variante "outline(d)" espelha o Quasar.
 *
 * CONTEXTO (jul/2026). O Quasar é INCONSISTENTE por família de componente:
 *   - QBtn / QBtnToggle / QBtnDropdown / QChip  → prop booleana `outline`
 *   - QInput / QSelect / QFile / QField         → prop booleana `outlined`
 * (Fonte: node_modules/quasar/dist/api/<Q>.json — a API oficial do Quasar.)
 *
 * O DSS espelha isso deliberadamente: a família de AÇÃO usa `variant="outline"`
 * (mapeia p/ o `outline` do QBtn) e a família de CAMPO usa `variant="outlined"`
 * (QField). NÃO é typo — é fidelidade ao Quasar (ver DSS_VARIANT_NAMING.md).
 *
 * Este gate impede DRIFT dessa decisão. Para cada componente com variante
 * "outline(d)" ele verifica:
 *   1. COERÊNCIA INTERNA — a grafia no types/*.types.ts == a da classe SCSS
 *      (`--outline` vs `--outlined`). Divergência = variante quebrada (classe
 *      nunca aplica).
 *   2. CONFORMIDADE — a grafia bate com a ÂNCORA:
 *      • Componentes ancorados: a grafia esperada é LIDA da api.json do Quasar
 *        do componente-base (o mapa abaixo só diz QUAL Q é a referência; a
 *        grafia vem do Quasar, então o mapa não pode mentir).
 *      • Componentes sem âncora Quasar (QCard/QUploader/QCarousel não têm prop
 *        outline*): escolha própria do DS, declarada em DS_CHOICE.
 *   3. CLASSIFICAÇÃO — todo componente com variante outline(d) DEVE estar no
 *      mapa; um componente novo não classificado FALHA (força decisão consciente).
 *
 * Uso:
 *   node scripts/validate-variant-naming.cjs          # relatório
 *   node scripts/validate-variant-naming.cjs --gate   # exit 1 se houver violação
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'components');
const QUASAR_API = path.join(ROOT, 'node_modules', 'quasar', 'dist', 'api');
const GATE = process.argv.slice(2).includes('--gate');

// Componente DSS → componente Quasar que é a referência da variante outline(d).
// A GRAFIA esperada NÃO está aqui — é derivada da api.json do Quasar (abaixo).
const ANCHOR = {
  DssInput: 'QInput',
  DssSelect: 'QSelect',
  DssTextarea: 'QInput',
  DssFile: 'QFile',
  DssField: 'QField',
  DssButton: 'QBtn',
  DssChip: 'QChip',
  DssBtnToggle: 'QBtnToggle',
  DssBtnDropdown: 'QBtnDropdown',
};

// Sem prop outline* no Quasar (QCard/QUploader/QCarousel) → escolha do DS.
// (Só camadas de produção: base + composed. Fixtures em components/stress-test/
//  — ex.: DssDataCard, DssCadrisCard — ficam fora do gate por decisão de
//  governança; se promovidos a produção, o gate cobra a classificação.)
const DS_CHOICE = {
  DssCard: 'outlined',
  DssCarousel: 'outline',
  DssUploader: 'outline',
};

// Lê a grafia outline(d) que o componente Quasar realmente usa (api.json oficial).
function quasarSpelling(qName) {
  const f = path.join(QUASAR_API, `${qName}.json`);
  if (!fs.existsSync(f)) return { error: `api.json ausente: ${qName}` };
  const api = JSON.parse(fs.readFileSync(f, 'utf8'));
  const ks = Object.keys(api.props || {}).filter((p) => /^outlined?$/.test(p));
  if (ks.length !== 1) return { error: `${qName} tem ${ks.length} props outline* (${ks.join(',') || 'nenhuma'})` };
  return { spelling: ks[0] };
}

function readDir(dir, filter) {
  let out = '';
  const walk = (d) => {
    let entries;
    try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (filter(e.name)) out += fs.readFileSync(full, 'utf8') + '\n';
    }
  };
  walk(dir);
  return out;
}

// Grafia no TYPE (valor de union entre aspas) e na CLASSE SCSS (--outline(d)).
function typeSpelling(text) {
  const outlined = /'outlined'/.test(text);
  const outline = /'outline'/.test(text); // aspas fecham após "outline" → não casa 'outlined'
  return outlined && outline ? 'both' : outlined ? 'outlined' : outline ? 'outline' : null;
}
function scssSpelling(text) {
  const outlined = /--outlined\b/.test(text); // \b após "outlined"
  const outline = /--outline\b/.test(text);   // \b após "outline" → não casa "--outlined"
  return outlined && outline ? 'both' : outlined ? 'outlined' : outline ? 'outline' : null;
}

const results = [];
for (const layer of ['base', 'composed']) {
  const base = path.join(COMPONENTS, layer);
  let comps;
  try { comps = fs.readdirSync(base, { withFileTypes: true }); } catch { continue; }
  for (const c of comps) {
    if (!c.isDirectory() || !/^Dss/.test(c.name)) continue;
    const dir = path.join(base, c.name);
    const tSpell = typeSpelling(readDir(dir, (n) => n.endsWith('.types.ts')));
    if (!tSpell) continue; // sem variante outline(d)
    const sSpell = scssSpelling(readDir(dir, (n) => n.endsWith('.scss')));

    let expected = null, anchorInfo = null, errors = [];

    if (c.name in ANCHOR) {
      const q = quasarSpelling(ANCHOR[c.name]);
      if (q.error) errors.push(`âncora inválida: ${q.error}`);
      else { expected = q.spelling; anchorInfo = `${ANCHOR[c.name]} (Quasar)`; }
    } else if (c.name in DS_CHOICE) {
      expected = DS_CHOICE[c.name];
      anchorInfo = 'escolha do DS (sem âncora Quasar)';
    } else {
      errors.push('NÃO classificado: adicione ao mapa (ANCHOR ou DS_CHOICE) em validate-variant-naming.cjs');
    }

    if (tSpell === 'both') errors.push(`types usa AMBAS as grafias ('outline' e 'outlined')`);
    if (sSpell === 'both') errors.push(`SCSS usa AMBAS as classes (--outline e --outlined)`);
    if (sSpell && sSpell !== 'both' && tSpell !== 'both' && sSpell !== tSpell)
      errors.push(`coerência interna: type='${tSpell}' mas classe SCSS='--${sSpell}' (variante quebrada)`);
    if (expected && tSpell !== 'both' && tSpell !== expected)
      errors.push(`conformidade: usa '${tSpell}', esperado '${expected}' (${anchorInfo})`);

    results.push({ name: c.name, tSpell, sSpell, expected, anchorInfo, errors });
  }
}

results.sort((a, b) => a.name.localeCompare(b.name));
const failed = results.filter((r) => r.errors.length);

console.log('🔎 Grafia de variante outline(d) — espelho do Quasar (fonte: api.json)\n');
for (const r of results) {
  const mark = r.errors.length ? '❌' : '✅';
  const src = r.anchorInfo || '—';
  console.log(`${mark} ${r.name.padEnd(16)} type:'${r.tSpell}'  scss:${r.sSpell ? '--' + r.sSpell : '—'}  → ${src}`);
  for (const e of r.errors) console.log(`     ↳ ${e}`);
}
console.log(`\n${results.length} componente(s) com variante outline(d) · ${failed.length} com violação.`);

if (!failed.length) {
  console.log('✅ Grafia de variante: coerente e fiel ao Quasar.');
  process.exit(0);
}
console.log('\n❌ Violações acima. Regra em docs/governance/DSS_VARIANT_NAMING.md.');
process.exit(GATE ? 1 : 0);
