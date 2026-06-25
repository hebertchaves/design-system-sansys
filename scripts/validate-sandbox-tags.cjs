#!/usr/bin/env node
/**
 * validate-sandbox-tags.cjs — Guarda contra a regressão Avatar/Badge.
 *
 * PROBLEMA (jun/2026): TestAvatar.vue e TestBadge.vue usavam <DssAvatar>/<DssBadge>
 * no template SEM importar o componente. O sandbox registra globalmente APENAS os
 * Quasar (Q*) — nenhum DSS é global. Resultado: a tag caía como custom-element
 * desconhecido (<dssbadge> minúsculo no DOM), renderizando 0 elementos reais.
 * O sandbox deixava de ser "reflexo perfeito da fonte de verdade" silenciosamente.
 *
 * REGRA: todo componente DSS usado no <template> de um .vue do sandbox DEVE ser
 * importado (ou registrado localmente) naquele arquivo. Componentes renderizados
 * DENTRO de um *.example.vue importado não contam — só as tags do próprio arquivo.
 *
 * Uso:
 *   node scripts/validate-sandbox-tags.cjs           # relatório
 *   node scripts/validate-sandbox-tags.cjs --gate    # exit 1 se houver não-resolvida
 *   node scripts/validate-sandbox-tags.cjs <files...> # escopa a arquivos específicos
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SANDBOX_SRC = path.join(ROOT, 'apps', 'sandbox', 'src');

const argv = process.argv.slice(2);
const GATE = argv.includes('--gate');
const fileArgs = argv.filter(a => !a.startsWith('--'));

function walk(dir, acc = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(full, acc); }
    else if (e.name.endsWith('.vue')) acc.push(full);
  }
  return acc;
}

const kebabToPascal = s =>
  s.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());

// Extrai o conteúdo do PRIMEIRO bloco <template> (top-level) de um SFC.
function templateBlock(src) {
  const open = src.search(/<template(\s[^>]*)?>/);
  if (open === -1) return '';
  const start = src.indexOf('>', open) + 1;
  const end = src.lastIndexOf('</template>');
  return end > start ? src.slice(start, end) : src.slice(start);
}

function scriptBlock(src) {
  const m = src.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/g);
  return m ? m.join('\n') : '';
}

// Nomes de componentes DSS usados no template (PascalCase + kebab-case).
function usedDssTags(tpl) {
  const set = new Set();
  for (const m of tpl.matchAll(/<(Dss[A-Za-z0-9]+)\b/g)) set.add(m[1]);
  for (const m of tpl.matchAll(/<(dss-[a-z0-9-]+)\b/g)) set.add(kebabToPascal(m[1]));
  return set;
}

// Identificadores DSS disponíveis no <script>: imports default/nomeados + registro local.
function availableDssNames(scr) {
  const set = new Set();
  // import DssX from '...'  |  import DssX, { ... } from '...'
  for (const m of scr.matchAll(/import\s+(Dss[A-Za-z0-9]+)\b/g)) set.add(m[1]);
  // import { DssX, DssY as Z } from '...'
  for (const m of scr.matchAll(/import\s*\{([^}]*)\}\s*from/g)) {
    for (const part of m[1].split(',')) {
      const t = part.trim();
      const as = t.match(/\bas\s+(Dss[A-Za-z0-9]+)/);
      if (as) { set.add(as[1]); continue; }
      const bare = t.match(/^(Dss[A-Za-z0-9]+)$/);
      if (bare) set.add(bare[1]);
    }
  }
  // components: { DssX } / components: { DssX: Foo }
  for (const m of scr.matchAll(/\b(Dss[A-Za-z0-9]+)\s*[,:}]/g)) set.add(m[1]);
  return set;
}

const files = (fileArgs.length ? fileArgs.map(f => path.resolve(ROOT, f)) : walk(SANDBOX_SRC))
  .filter(f => f.endsWith('.vue') && fs.existsSync(f));

const problems = [];
let scanned = 0;

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const tpl = templateBlock(src);
  if (!tpl) continue;
  scanned++;
  const used = usedDssTags(tpl);
  if (!used.size) continue;
  const avail = availableDssNames(scriptBlock(src));
  const missing = [...used].filter(n => !avail.has(n));
  if (missing.length)
    problems.push({ file: path.relative(ROOT, f).replace(/\\/g, '/'), missing });
}

console.log(`🔎 Sandbox: ${scanned} .vue com template escaneados.`);
if (!problems.length) {
  console.log('✅ Nenhuma tag <Dss*> não-resolvida (todas importadas/registradas).');
  process.exit(0);
}

console.log(`\n❌ ${problems.length} arquivo(s) com tag DSS usada mas NÃO importada:\n`);
for (const p of problems) console.log(`  ${p.file}\n    → ${p.missing.join(', ')}`);
console.log('\n  Corrija importando o componente, ex.:');
console.log("    import DssBadge from '@components/base/DssBadge/DssBadge.vue'\n");

process.exit(GATE ? 1 : 0);
