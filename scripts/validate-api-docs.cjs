#!/usr/bin/env node
/**
 * validate-api-docs.js — Validador de paridade da API (fonte de verdade → derivados)
 *
 * FONTE DE VERDADE: as interfaces tipadas em `types/*.types.ts` (`*Slots`, e
 * futuramente `*Props` / `*Emits`). É o contrato validado pelo TypeScript.
 *
 * DERIVADOS (mantidos à mão, sujeitos a drift silencioso):
 *   - `DSS<NOME>_API.md`  → seção `## Slots` (tabela markdown)
 *   - `README.md`         → seção de Slots (se existir)
 *   - `apps/sandbox/src/Test<Nome>.vue` → `const SLOTS = [...]` (KPI da página)
 *
 * Modos:
 *   (default)  relatório de divergências em TODOS os componentes (exit 0)
 *   --gate     mesmo relatório, mas exit 1 se houver QUALQUER divergência
 *              (para usar no pre-commit, espelhando `sync-css-to-meta.js --validate`)
 *   --json     saída JSON (para tooling)
 *
 * Escopo atual: SLOTS. Estrutura pronta para estender a props/events.
 *
 * Uso:
 *   node scripts/validate-api-docs.js
 *   node scripts/validate-api-docs.js --gate
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
const JSON_OUT = argv.includes('--json');

// ── util ────────────────────────────────────────────────────────────────────
function walk(dir, filterFn, acc = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules') continue;
      walk(full, filterFn, acc);
    } else if (filterFn(full)) {
      acc.push(full);
    }
  }
  return acc;
}

const setDiff = (a, b) => [...a].filter(x => !b.has(x));

// ── fonte de verdade: interface *Slots via TS compiler ────────────────────────
function extractSlotsFromTypes(typesFile) {
  const src = fs.readFileSync(typesFile, 'utf8');
  const sf = ts.createSourceFile(typesFile, src, ts.ScriptTarget.Latest, true);
  const slots = new Set();
  let found = false;
  ts.forEachChild(sf, node => {
    if (ts.isInterfaceDeclaration(node) && /Slots$/.test(node.name.text)) {
      found = true;
      for (const m of node.members) {
        if ((ts.isPropertySignature(m) || ts.isMethodSignature(m)) && m.name) {
          // nome do membro = nome do slot (remove aspas de nomes string-literal)
          const raw = m.name.getText(sf).replace(/^['"]|['"]$/g, '');
          slots.add(raw);
        }
      }
    }
  });
  return { found, slots };
}

// ── derivado: tabela `## Slots` do *_API.md / README.md ───────────────────────
function extractSlotsFromMarkdown(mdFile) {
  if (!fs.existsSync(mdFile)) return null;
  const lines = fs.readFileSync(mdFile, 'utf8').split(/\r?\n/);
  const slots = new Set();
  let inSlots = false;
  let hasSlotsSection = false;
  for (const line of lines) {
    const heading = line.match(/^#{2,4}\s+(.*)$/);
    if (heading) {
      inSlots = /slots?/i.test(heading[1]);
      if (inSlots) hasSlotsSection = true;
      continue;
    }
    if (!inSlots) continue;
    // linha de tabela: | `nome` | ... |  (ignora cabeçalho/separador)
    // `#nome` (sintaxe de template) e `nome` referem o mesmo slot → normaliza.
    const cell = line.match(/^\s*\|\s*`([^`]+)`\s*\|/);
    if (cell) slots.add(cell[1].trim().replace(/^#/, ''));
  }
  // Sem seção de Slots = doc não documenta slots → null (não conta como "tudo faltando").
  return hasSlotsSection ? slots : null;
}

// ── derivado: const SLOTS = [...] da página de teste do sandbox ───────────────
function extractSlotsFromTestPage(componentName) {
  const file = path.join(SANDBOX_DIR, `Test${componentName.replace(/^Dss/, '')}.vue`);
  if (!fs.existsSync(file)) return null;
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/const\s+SLOTS\s*=\s*\[([^\]]*)\]/);
  if (!m) return null;
  const slots = new Set();
  for (const q of m[1].matchAll(/['"]([^'"]+)['"]/g)) slots.add(q[1]);
  return slots;
}

// ── coleta por componente ─────────────────────────────────────────────────────
const typeFiles = walk(COMPONENTS_DIR, f => f.endsWith('.types.ts'));
const results = [];

for (const tf of typeFiles) {
  const componentDir = path.dirname(path.dirname(tf)); // .../<Comp>/types/x.types.ts → <Comp>
  const componentName = path.basename(componentDir);
  if (!/^Dss/.test(componentName)) continue;

  const { found, slots: truth } = extractSlotsFromTypes(tf);
  if (!found) continue; // componente sem interface *Slots — fora do escopo

  // derivados
  const apiMd = walk(componentDir, f => /_API\.md$/i.test(path.basename(f)))[0];
  const readme = path.join(componentDir, 'README.md');

  const derivatives = {
    'API.md': apiMd ? extractSlotsFromMarkdown(apiMd) : null,
    'README.md': extractSlotsFromMarkdown(readme),
    'TestPage': extractSlotsFromTestPage(componentName),
  };

  const divergences = [];
  for (const [name, set] of Object.entries(derivatives)) {
    if (!set) continue; // derivado ausente — não é divergência (pode não documentar slots)
    const missing = setDiff(truth, set);   // na verdade, faltam no derivado
    const extra = setDiff(set, truth);      // no derivado, não existem na verdade
    if (missing.length || extra.length) {
      divergences.push({ derivative: name, missing, extra });
    }
  }

  results.push({
    component: componentName,
    truthCount: truth.size,
    truth: [...truth],
    divergences,
  });
}

// ── saída ─────────────────────────────────────────────────────────────────────
const diverging = results.filter(r => r.divergences.length);

if (JSON_OUT) {
  console.log(JSON.stringify({ total: results.length, diverging: diverging.length, results }, null, 2));
} else {
  console.log('\n🔎 Validação de paridade de API — SLOTS (fonte: types/*.types.ts)\n');
  console.log(`Componentes com interface *Slots: ${results.length}`);
  console.log(`Com divergência em algum derivado:  ${diverging.length}\n`);

  if (diverging.length === 0) {
    console.log('✅ Nenhuma divergência de slots entre types e derivados.\n');
  } else {
    for (const r of diverging) {
      console.log(`\n● ${r.component}  (verdade: ${r.truthCount} slots — ${r.truth.join(', ')})`);
      for (const d of r.divergences) {
        const parts = [];
        if (d.missing.length) parts.push(`faltam em ${d.derivative}: ${d.missing.join(', ')}`);
        if (d.extra.length) parts.push(`sobram em ${d.derivative} (não tipados): ${d.extra.join(', ')}`);
        console.log(`   - ${parts.join('  |  ')}`);
      }
    }
    console.log('');
  }
}

if (GATE && diverging.length) {
  console.error(`❌ Gate: ${diverging.length} componente(s) com slots divergentes da fonte de verdade.`);
  process.exit(1);
}
