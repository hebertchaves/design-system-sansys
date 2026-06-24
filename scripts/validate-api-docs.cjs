#!/usr/bin/env node
/**
 * validate-api-docs.cjs — Paridade da API (fonte de verdade → docs derivadas)
 *
 * FONTE DE VERDADE: interfaces tipadas em `types/*.types.ts`:
 *   - `*Props`  → props
 *   - `*Emits`  → eventos (call signatures `(e: 'nome', ...) => void`)
 *   - `*Slots`  → slots
 * É o contrato validado pelo TypeScript. Parse via TS compiler API.
 *
 * DERIVADOS (mantidos à mão, sujeitos a drift silencioso):
 *   - `DSS<NOME>_API.md` → tabelas `## Props` / `## Eventos|Events` / `## Slots`
 *   - `README.md`        → mesmas seções (se existirem)
 *   - `apps/sandbox/src/Test<Nome>.vue` → `const SLOTS = [...]` (só slots)
 *
 * Modos:
 *   (default)  relatório de divergências em TODOS os componentes (exit 0)
 *   --gate     exit 1 se houver divergência (pre-commit). Aceita lista de
 *              componentes p/ escopo: --gate DssInput DssSelect (vazio = todos)
 *   --fix      regenera as tabelas do *_API.md a partir dos types (descrições via
 *              JSDoc). Não toca README nem páginas de teste.
 *   --json     saída JSON
 *   --only=slots|props|events  restringe o eixo
 *
 * npm: validate:api-docs / validate:api-docs:gate
 */

'use strict';

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'packages/core/components');
const SANDBOX_DIR = path.join(ROOT, 'apps/sandbox/src');

const argv = process.argv.slice(2);
const GATE = argv.includes('--gate');
const FIX = argv.includes('--fix');
const JSON_OUT = argv.includes('--json');
const ONLY = (argv.find(a => a.startsWith('--only=')) || '').split('=')[1] || null;
const SCOPE = argv.filter(a => !a.startsWith('--')); // nomes de componentes p/ --gate

// Eixos: como achar a verdade (interface) e o derivado (heading no markdown).
const AXES = [
  { key: 'slots',  ifaceSuffix: 'Slots',  headingRe: /^slots?$/i,            label: 'Slots' },
  { key: 'props',  ifaceSuffix: 'Props',  headingRe: /^props$/i,             label: 'Props' },
  { key: 'events', ifaceSuffix: 'Emits',  headingRe: /^(events?|eventos?)$/i, label: 'Eventos' },
];

// ── util ──────────────────────────────────────────────────────────────────────
function walk(dir, filterFn, acc = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(full, filterFn, acc); }
    else if (filterFn(full)) acc.push(full);
  }
  return acc;
}
const setDiff = (a, b) => [...a].filter(x => !b.has(x));
const jsDocFirstLine = (member, sf) => {
  const ranges = ts.getLeadingCommentRanges(sf.text, member.pos) || [];
  for (const r of ranges) {
    if (r.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
      const text = sf.text.slice(r.pos, r.end)
        .replace(/^\/\*\*?/, '').replace(/\*\/$/, '')
        .split(/\r?\n/).map(l => l.replace(/^\s*\*?\s?/, '').trim())
        .filter(l => l && !l.startsWith('@'));
      if (text.length) return text[0];
    }
  }
  return '';
};

// ── FONTE DE VERDADE: interfaces tipadas ──────────────────────────────────────
function parseTypes(typesFile) {
  const src = fs.readFileSync(typesFile, 'utf8');
  const sf = ts.createSourceFile(typesFile, src, ts.ScriptTarget.Latest, true);
  const out = { slots: null, props: null, events: null };

  ts.forEachChild(sf, node => {
    if (!ts.isInterfaceDeclaration(node)) return;
    const name = node.name.text;

    if (/Slots$/.test(name) || /Props$/.test(name)) {
      const axis = /Slots$/.test(name) ? 'slots' : 'props';
      const items = [];
      for (const m of node.members) {
        if ((ts.isPropertySignature(m) || ts.isMethodSignature(m)) && m.name) {
          const memberName = m.name.getText(sf).replace(/^['"]|['"]$/g, '');
          const type = m.type ? m.type.getText(sf) : '';
          items.push({ name: memberName, type, desc: jsDocFirstLine(m, sf) });
        }
      }
      out[axis] = items;
    }

    if (/Emits$/.test(name)) {
      const items = [];
      for (const m of node.members) {
        if (ts.isCallSignatureDeclaration(m) && m.parameters.length) {
          const p0 = m.parameters[0];
          // tipo do 1º parâmetro deve ser um literal de string: 'update:modelValue'
          if (p0.type && ts.isLiteralTypeNode(p0.type) && ts.isStringLiteral(p0.type.literal)) {
            const evt = p0.type.literal.text;
            const payload = m.parameters[1] && m.parameters[1].type ? m.parameters[1].type.getText(sf) : '—';
            items.push({ name: evt, type: payload, desc: jsDocFirstLine(m, sf) });
          }
        }
      }
      out.events = items;
    }
  });
  return out;
}

// ── DERIVADO: tabela markdown sob um heading ──────────────────────────────────
function parseMarkdownTable(mdFile, headingRe) {
  if (!fs.existsSync(mdFile)) return null;
  const lines = fs.readFileSync(mdFile, 'utf8').split(/\r?\n/);
  const names = new Set();
  const clean = s => s.trim().replace(/^[#@:]/, ''); // `#slot`/`@event` → nome
  // membros (props/slots/events) são lowercase/kebab; PascalCase = tipo/subcomponente
  // documentado dentro da seção (ex.: `AjaxBarPosition`, `DssCardSection`) → ignora.
  const add = raw => { const n = clean(raw); if (!/^[A-Z]/.test(n)) names.add(n); };
  let active = false, hasSection = false, sectionLevel = 0;
  for (const line of lines) {
    const h = line.match(/^(#{1,6})\s+(.*?)\s*$/);
    if (h) {
      const level = h[1].length;
      const text = h[2].trim();
      if (headingRe.test(text)) { active = true; hasSection = true; sectionLevel = level; continue; }
      if (active && level <= sectionLevel) { active = false; continue; } // fim da seção
      // dentro da seção, subtítulo `### \`nome\`` documenta um item (formato subseção)
      if (active && level > sectionLevel) {
        const sub = text.match(/^`([^`]+)`$/);
        if (sub) add(sub[1]);
      }
      continue;
    }
    if (!active) continue;
    // formato tabela: | `nome` | ... |
    const cell = line.match(/^\s*\|\s*`([^`]+)`\s*\|/);
    if (cell) add(cell[1]);
  }
  return hasSection ? names : null;
}

// ── DERIVADO: const SLOTS da página de teste ──────────────────────────────────
function parseTestPageSlots(componentName) {
  const file = path.join(SANDBOX_DIR, `Test${componentName.replace(/^Dss/, '')}.vue`);
  if (!fs.existsSync(file)) return null;
  const m = fs.readFileSync(file, 'utf8').match(/const\s+SLOTS\s*=\s*\[([^\]]*)\]/);
  if (!m) return null;
  const names = new Set();
  for (const q of m[1].matchAll(/['"]([^'"]+)['"]/g)) names.add(q[1]);
  return names;
}

// ── coleta ────────────────────────────────────────────────────────────────────
function collect() {
  const typeFiles = walk(COMPONENTS_DIR, f => f.endsWith('.types.ts'));
  const results = [];
  for (const tf of typeFiles) {
    const componentDir = path.dirname(path.dirname(tf));
    const componentName = path.basename(componentDir);
    if (!/^Dss/.test(componentName)) continue;
    if (SCOPE.length && !SCOPE.includes(componentName)) continue;

    const truth = parseTypes(tf);
    const apiMd = walk(componentDir, f => /_API\.md$/i.test(path.basename(f)))[0] || null;
    const readme = path.join(componentDir, 'README.md');

    const axes = [];
    for (const ax of AXES) {
      if (ONLY && ONLY !== ax.key) continue;
      const truthItems = truth[ax.key];
      if (!truthItems) continue; // sem interface → eixo fora de escopo p/ esse componente
      // props/events: nome no template é kebab-case; na interface é camelCase →
      // normaliza p/ não acusar `text-color` vs `textColor` como divergência. Slots
      // mantêm a forma (são kebab nos dois lados).
      const canon = n => ax.key === 'slots' ? n : n.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      const truthCanon = new Set(truthItems.map(i => canon(i.name)));

      const derivatives = {
        'API.md': apiMd ? parseMarkdownTable(apiMd, ax.headingRe) : null,
        'README.md': parseMarkdownTable(readme, ax.headingRe),
      };
      if (ax.key === 'slots') derivatives['TestPage'] = parseTestPageSlots(componentName);

      const divergences = [];
      for (const [dname, set] of Object.entries(derivatives)) {
        if (!set) continue;
        const derivCanon = new Set([...set].map(canon));
        const missing = truthItems.filter(i => !derivCanon.has(canon(i.name))).map(i => i.name);
        const extra = [...set].filter(n => !truthCanon.has(canon(n)));
        if (missing.length || extra.length) divergences.push({ derivative: dname, missing, extra });
      }
      axes.push({ axis: ax.key, label: ax.label, truth: truthItems, truthNames: truthItems.map(i => i.name), divergences });
    }
    results.push({ component: componentName, dir: componentDir, apiMd, axes });
  }
  return results;
}

// ── --fix (ADD-ONLY): adiciona ao *_API.md as linhas de membros TIPADOS que faltam
//    na tabela. NUNCA apaga (extras não-tipados ficam sinalizados p/ decisão humana,
//    pois podem ser passthrough real do Quasar ou interface incompleta). Só atua em
//    seções com tabela; formato subseção (### `nome`) é deixado p/ ajuste manual. ──
function buildRow(axisKey, i) {
  if (axisKey === 'props') return `| \`${i.name}\` | \`${i.type || '—'}\` | ${i.desc || ''} |`;
  if (axisKey === 'events') return `| \`${i.name}\` | ${i.type && i.type !== '—' ? '`' + i.type + '`' : '—'} | ${i.desc || ''} |`;
  return `| \`${i.name}\` | ${i.desc || ''} |`; // slots
}

function fixApiMd(result) {
  if (!result.apiMd) return false;
  let lines = fs.readFileSync(result.apiMd, 'utf8').split(/\r?\n/);
  const nl = fs.readFileSync(result.apiMd, 'utf8').includes('\r\n') ? '\r\n' : '\n';
  let changed = false;

  for (const ax of result.axes) {
    const apiDiv = ax.divergences.find(d => d.derivative === 'API.md');
    if (!apiDiv || !apiDiv.missing.length) continue; // só adiciona o que falta
    const headingRe = AXES.find(a => a.key === ax.axis).headingRe;
    const headingIdx = lines.findIndex(l => { const h = l.match(/^#{2,4}\s+(.*?)\s*$/); return h && headingRe.test(h[1].trim()); });
    if (headingIdx === -1) continue;
    // limite da seção
    let end = headingIdx + 1;
    while (end < lines.length && !/^#{2,4}\s+/.test(lines[end])) end++;
    // última linha de tabela na seção
    let lastRow = -1;
    for (let i = headingIdx + 1; i < end; i++) if (/^\s*\|/.test(lines[i])) lastRow = i;
    if (lastRow === -1) continue; // formato subseção / sem tabela → manual
    const missingItems = ax.truth.filter(i => apiDiv.missing.includes(i.name));
    const newRows = missingItems.map(i => buildRow(ax.axis, i));
    lines = [...lines.slice(0, lastRow + 1), ...newRows, ...lines.slice(lastRow + 1)];
    changed = true;
  }
  if (changed) fs.writeFileSync(result.apiMd, lines.join(nl));
  return changed;
}

// ── execução ──────────────────────────────────────────────────────────────────
const results = collect();
const diverging = results.filter(r => r.axes.some(a => a.divergences.length));

if (FIX) {
  let fixedCount = 0;
  for (const r of diverging) if (fixApiMd(r)) fixedCount++;
  console.log(`🔧 --fix: ${fixedCount} arquivo(s) *_API.md regenerado(s) a partir dos types.`);
  console.log('   (README e páginas de teste NÃO são tocados — ajustar à mão se necessário.)\n');
  process.exit(0);
}

if (JSON_OUT) {
  console.log(JSON.stringify({ total: results.length, diverging: diverging.length, results }, null, 2));
  process.exit(GATE && diverging.length ? 1 : 0);
}

console.log('\n🔎 Validação de paridade de API (fonte: types/*.types.ts)\n');
console.log(`Componentes analisados: ${results.length}${SCOPE.length ? ' (escopo: ' + SCOPE.join(', ') + ')' : ''}`);
console.log(`Com divergência:        ${diverging.length}\n`);

for (const r of diverging) {
  console.log(`● ${r.component}`);
  for (const ax of r.axes) {
    for (const d of ax.divergences) {
      const parts = [];
      if (d.missing.length) parts.push(`faltam: ${d.missing.join(', ')}`);
      if (d.extra.length) parts.push(`sobram (não tipados): ${d.extra.join(', ')}`);
      console.log(`   [${ax.label} × ${d.derivative}] ${parts.join('  |  ')}`);
    }
  }
}
if (!diverging.length) console.log('✅ Nenhuma divergência.\n');
else console.log('');

if (GATE && diverging.length) {
  console.error(`❌ Gate: ${diverging.length} componente(s) com API divergente da fonte de verdade.`);
  process.exit(1);
}
