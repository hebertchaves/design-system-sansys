#!/usr/bin/env node
/**
 * validate-sfc-hygiene.cjs — Higiene de SFC: import canônico + estilo inline.
 *
 * ORIGEM (ago/2026): o stress test de Fase 3 produziu 8 não-conformidades. Três
 * já eram pegas por gates (tokens SCSS, paridade de API) e uma passou a ser pega
 * pelo `validate_composition` do MCP. Das cinco restantes, DUAS são verificáveis
 * mecanicamente — e são estas. Não vivem na árvore de componentes (isso é
 * composição), vivem DENTRO do arquivo.
 *
 * REGRA A — Import canônico (NC-02)
 *   Um componente NUNCA importa o `1-structure/` de OUTRO componente. O caminho
 *   público é o wrapper da raiz (`../DssX/DssX.vue`) ou, para peças que não têm
 *   wrapper próprio (ex.: DssCardSection, que mora dentro do DssCard), o BARREL
 *   do dono (`import { DssCardSection } from '../DssCard'`). Ir direto na Layer 1
 *   fura o encapsulamento e prende o consumidor a um caminho interno alheio.
 *   O próprio 1-structure importando seu vizinho de camada é legítimo — a regra
 *   só vale para CRUZAR a fronteira de componente.
 *
 * REGRA B — Estilo inline dimensional (NC-04)
 *   `style="width: 40px"` no template é hardcode fora do alcance do gate de
 *   tokens, que só varre SCSS (Constituição #1). Dimensão vem de token, no SCSS.
 *   Toleramos `style` sem número (ex.: `pointer-events: none`), que é chave de
 *   comportamento e não valor de design.
 *
 * ESCOPO — decidido POR REGRA, não por tipo de arquivo. A versão anterior
 * excluía `.example.vue` das duas, com o argumento de que "demonstração não é
 * superfície do DS". O argumento não se sustenta para a regra A e escondeu uma
 * violação real (DssItem.example.vue importava o 1-structure do DssIcon).
 *
 *   Regra A vale TAMBÉM em example — exemplo é documentação que o consumidor
 *   copia; um import errado ali ENSINA o anti-padrão. Custo medido: 1 correção.
 *
 *   Regra B NÃO vale em example — medido: 47 arquivos, e o conteúdo é
 *   `padding: var(--dss-spacing-2); border: 1px solid var(--dss-gray-200)`.
 *   O único "hardcode" é o `1px` da borda, cercado de tokens, em andaime de
 *   página de demonstração. Muito ruído para pouco sinal.
 *
 * `.test.js` fica fora das duas — fixture não é lido como referência de uso.
 *
 * Uso:
 *   node scripts/validate-sfc-hygiene.cjs          # relatório
 *   node scripts/validate-sfc-hygiene.cjs --gate   # exit 1 se houver violação
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'components');

const GATE = process.argv.slice(2).includes('--gate');

/** Import que atravessa para o 1-structure de OUTRO componente (tem `../`). */
const IMPORT_CRUZADO = /from\s+['"]([^'"]*\.\.\/[^'"]*1-structure\/[^'"]+)['"]/g;

/** style inline contendo valor dimensional cravado. */
const STYLE_DIMENSIONAL = /\bstyle\s*=\s*"([^"]*\d+(?:px|rem|em|vh|vw)[^"]*)"/g;

function walk(dir, acc = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== 'dist') walk(full, acc);
      continue;
    }
    if (!/\.(vue|ts)$/.test(e.name)) continue;
    if (/\.test\.(js|ts)$/.test(e.name)) continue;
    acc.push(full);
  }
  return acc;
}

const arquivos = walk(COMPONENTS);
const violacoesA = [];
const violacoesB = [];

for (const full of arquivos) {
  const rel = path.relative(ROOT, full).replace(/\\/g, '/');
  const src = fs.readFileSync(full, 'utf8');

  for (const m of src.matchAll(IMPORT_CRUZADO)) {
    violacoesA.push({ rel, linha: src.slice(0, m.index).split('\n').length, alvo: m[1] });
  }
  // Regra B só faz sentido em template — .ts não tem — e NÃO se aplica a
  // example: lá o style inline é andaime de página de demonstração, já
  // majoritariamente tokenizado (ver nota de escopo no cabeçalho).
  if (full.endsWith('.vue') && !full.endsWith('.example.vue')) {
    for (const m of src.matchAll(STYLE_DIMENSIONAL)) {
      violacoesB.push({ rel, linha: src.slice(0, m.index).split('\n').length, trecho: m[1].trim() });
    }
  }
}

console.log('🔍 Validando higiene de SFC (import canônico + estilo inline)...\n');

console.log(`🔎 A. Import canônico — nunca o 1-structure de outro componente`);
if (!violacoesA.length) {
  console.log(`✅ ${arquivos.length} arquivo(s) · nenhum import cruzado.\n`);
} else {
  console.log(`❌ ${violacoesA.length} import(s) atravessando para a Layer 1 de outro componente:`);
  for (const v of violacoesA) console.log(`  - ${v.rel}:${v.linha} → ${v.alvo}`);
  console.log('  Use o wrapper da raiz (../DssX/DssX.vue) ou o barrel do dono');
  console.log("  quando a peça não tiver wrapper (import { DssY } from '../DssX').\n");
}

console.log(`🔎 B. Estilo inline — dimensão vem de token, no SCSS`);
if (!violacoesB.length) {
  console.log(`✅ Nenhum style inline com valor dimensional.\n`);
} else {
  console.log(`❌ ${violacoesB.length} style inline com valor cravado:`);
  for (const v of violacoesB) console.log(`  - ${v.rel}:${v.linha} → style="${v.trecho}"`);
  console.log('  Mova para o SCSS do componente e use var(--dss-*).\n');
}

const total = violacoesA.length + violacoesB.length;
if (!total) {
  console.log('✅ Higiene de SFC: OK.');
  process.exit(0);
}
console.log(`❌ Higiene de SFC: ${total} violação(ões).`);
process.exit(GATE ? 1 : 0);
