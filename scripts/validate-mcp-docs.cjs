#!/usr/bin/env node
/**
 * validate-mcp-docs.cjs — o README do MCP cobre todas as tools e resources.
 *
 * Motivo (set/2026): o README documentava 13 de 22 primitivos. Não foi drift
 * lento — ele NASCEU incompleto: duas das tools ausentes já existiam no dia da
 * última edição dele. Sem gate, ninguém notou por 5 semanas, e a defasagem só
 * apareceu ao preparar uma demonstração.
 *
 * O README é a superfície HUMANA (onboarding, apresentação). A superfície de
 * máquina é o campo `description` do schema, que o agente lê em runtime — essa
 * não pode faltar, senão o agente age errado. Este gate cuida da primeira: um
 * primitivo que existe no código e não aparece no README é reprovado.
 *
 * Não valida a QUALIDADE do texto, só a cobertura. Prosa é revisão humana.
 *
 * Uso:
 *   node scripts/validate-mcp-docs.cjs          # relatório
 *   node scripts/validate-mcp-docs.cjs --gate   # exit 1 se faltar cobertura
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MCP = path.join(ROOT, 'packages', 'mcp');
const TOOLS_DIR = path.join(MCP, 'src', 'tools');
const RESOURCES = path.join(MCP, 'src', 'resources', 'index.ts');
const README = path.join(MCP, 'README.md');

const GATE = process.argv.slice(2).includes('--gate');

// Os nomes de tool vivem em dois lugares: a maioria inline no array de schemas
// de tools/index.ts, e algumas (validate_visual_contract) no próprio arquivo da
// tool, espalhadas no array. Varrer o diretório inteiro pega as duas formas.
function collectToolNames() {
  const names = new Set();
  for (const f of fs.readdirSync(TOOLS_DIR)) {
    if (!f.endsWith('.ts')) continue;
    const src = fs.readFileSync(path.join(TOOLS_DIR, f), 'utf8');
    for (const m of src.matchAll(/\bname:\s*"([a-z][a-z0-9_]*)"/g)) names.add(m[1]);
  }
  return [...names].sort();
}

function collectResourceNames() {
  const src = fs.readFileSync(RESOURCES, 'utf8');
  return [...src.matchAll(/\bname:\s*"([^"]+)"/g)].map((m) => m[1]).sort();
}

const readme = fs.readFileSync(README, 'utf8');
const tools = collectToolNames();
const resources = collectResourceNames();

const missingTools = tools.filter((t) => !readme.includes(t));
const missingResources = resources.filter((r) => !readme.includes(r));

console.log('🔎 README do MCP — cobertura dos primitivos expostos\n');
console.log(`   tools no código: ${tools.length} · resources: ${resources.length} · total: ${tools.length + resources.length}`);

if (!missingTools.length && !missingResources.length) {
  console.log(`\n✅ README cobre os ${tools.length + resources.length} primitivos.`);
  process.exit(0);
}

if (missingTools.length) {
  console.log(`\n❌ ${missingTools.length} tool(s) sem menção no README:`);
  for (const t of missingTools) console.log('  - ' + t);
}
if (missingResources.length) {
  console.log(`\n❌ ${missingResources.length} resource(s) sem menção no README:`);
  for (const r of missingResources) console.log('  - ' + r);
}
console.log('\n  Documente em packages/mcp/README.md (quando usar + o que volta).');
console.log('  Parâmetros NÃO vão para o README — vivem no schema, um fato um lar.');

process.exit(GATE ? 1 : 0);
