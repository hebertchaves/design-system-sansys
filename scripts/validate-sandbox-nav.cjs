#!/usr/bin/env node
/**
 * validate-sandbox-nav.cjs — Guarda contra o menu fantasma do sandbox.
 *
 * PROBLEMA (set/2026). O menu do `TestSuite.vue` tinha um item **IconButton**.
 * `DssIconButton` nunca existiu: não está no catálogo nem no índice de selados.
 * O item entrou em mai/2026 escrito como menu de um catálogo PLANEJADO, e nunca
 * foi derivado do disco. Clicar nele deixava a área de conteúdo vazia — sem erro,
 * sem aviso, sem fallback.
 *
 * Medido naquele dia: **59 itens de menu para 49 blocos de view**. Dez itens
 * clicavam e não renderizavam nada, e quatro deles nomeavam componentes que não
 * existem (`DssAlert`, `DssContainer`, `DssGrid`, `IconButton`).
 *
 * É a mesma classe de defeito que o `build-adequacao-status.cjs` já documenta no
 * próprio cabeçalho — "números escritos à mão sobre uma fila que anda toda semana
 * envelhecem sem avisar". Lá a lição foi aplicada; aqui o menu continuou à mão.
 *
 * DUAS REGRAS:
 *   1. Todo item de menu tem bloco de view. Item que clica e não renderiza é bug.
 *   2. Todo item cujo rótulo nomeia um `Dss*` corresponde a componente REAL em
 *      `packages/core/components/{base,composed,stress-test}`.
 *
 * O que NÃO é cobrado: item de menu cujo rótulo não nomeia componente (páginas de
 * fundação e de pattern, como "Design Tokens" ou "Parcelamento"). Para esses vale
 * só a regra 1.
 *
 * Uso:
 *   node scripts/validate-sandbox-nav.cjs           # relatório
 *   node scripts/validate-sandbox-nav.cjs --gate    # exit 1 se houver problema
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SUITE = path.join(ROOT, 'apps', 'sandbox', 'src', 'TestSuite.vue');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'components');
const GRUPOS = ['base', 'composed', 'stress-test'];

const GATE = process.argv.slice(2).includes('--gate');

// ---------------------------------------------------------------------------
// 1. Catálogo real — do disco, nunca de lista
// ---------------------------------------------------------------------------
function lerCatalogo() {
  const nomes = new Set();
  for (const g of GRUPOS) {
    const d = path.join(COMPONENTS, g);
    if (!fs.existsSync(d)) continue;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory() && /^Dss/.test(e.name)) nomes.add(e.name);
    }
  }
  // Subcomponentes não têm pasta própria (DssCardSection vive em DssCard/).
  // Sem isto o gate acusaria falso positivo em quem os exibe — foi o mesmo
  // ponto cego que fez o `validate_composition` chamar DssCardSection de
  // inexistente.
  for (const g of GRUPOS) {
    const d = path.join(COMPONENTS, g);
    if (!fs.existsSync(d)) continue;
    for (const c of fs.readdirSync(d)) {
      const est = path.join(d, c, '1-structure');
      if (!fs.existsSync(est)) continue;
      for (const f of fs.readdirSync(est)) {
        const m = f.match(/^(Dss[A-Za-z]+)\.(?:ts\.)?vue$/);
        if (m) nomes.add(m[1]);
      }
    }
  }
  return nomes;
}

// ---------------------------------------------------------------------------
// 2. Menu e views — do TestSuite.vue
// ---------------------------------------------------------------------------
function lerMenu() {
  const s = fs.readFileSync(SUITE, 'utf8');

  // Item de menu: o @click é o que identifica; o rótulo vem do .nav-label do
  // mesmo <button>. Casar os dois juntos evita o falso-negativo de contar o
  // `activeComponent === 'x'` do :class como se fosse um bloco de view.
  const itens = [];
  const reBotao = /@click="activeComponent = '([a-z0-9-]+)'"[\s\S]*?nav-label">([^<]+)</g;
  for (let m; (m = reBotao.exec(s)); ) {
    itens.push({ chave: m[1], rotulo: m[2].trim().replace(/&amp;/g, '&') });
  }

  const views = new Set(
    [...s.matchAll(/v-(?:else-)?if="activeComponent === '([a-z0-9-]+)'"\s+class="component-view"/g)]
      .map((m) => m[1])
  );

  return { itens, views };
}

// ---------------------------------------------------------------------------
// 3. Verificação
// ---------------------------------------------------------------------------
const catalogo = lerCatalogo();
const { itens, views } = lerMenu();

const semView = [];
const semComponente = [];

for (const { chave, rotulo } of itens) {
  if (!views.has(chave)) semView.push({ chave, rotulo });

  // O rótulo nomeia um componente? Só então a regra 2 se aplica.
  const m = rotulo.match(/\bDss[A-Za-z]+\b/);
  if (m && !catalogo.has(m[0])) semComponente.push({ chave, rotulo, nome: m[0] });
}

const viewsOrfas = [...views].filter((v) => !itens.some((i) => i.chave === v));

console.log(`🔎 Menu do sandbox: ${itens.length} item(ns) · ${views.length || views.size} bloco(s) de view · catálogo com ${catalogo.size} componentes.`);

let problemas = 0;

if (semView.length) {
  problemas += semView.length;
  console.log(`\n❌ ${semView.length} item(ns) de menu SEM bloco de view — clicar deixa a área vazia:`);
  for (const i of semView) console.log(`   · "${i.rotulo}"  (activeComponent === '${i.chave}')`);
}

if (semComponente.length) {
  problemas += semComponente.length;
  console.log(`\n❌ ${semComponente.length} item(ns) nomeiam componente INEXISTENTE no catálogo:`);
  for (const i of semComponente) console.log(`   · "${i.rotulo}" → ${i.nome} não existe em components/{${GRUPOS.join(',')}}`);
}

if (viewsOrfas.length) {
  console.log(`\n⚠️  ${viewsOrfas.length} bloco(s) de view sem item de menu (inalcançáveis pela navegação):`);
  for (const v of viewsOrfas) console.log(`   · '${v}'`);
}

if (!problemas) {
  console.log('\n✅ Todo item de menu tem view, e todo rótulo Dss* corresponde a componente real.');
  process.exit(0);
}

console.log('\n   O menu é mantido à mão. Item que nomeia componente inexistente, ou que');
console.log('   não renderiza nada, é promessa que o disco não cumpre — remova o item ou');
console.log('   crie o que falta.');
process.exit(GATE ? 1 : 0);
