#!/usr/bin/env node
/**
 * validate-demo-seeds.cjs — a SEMENTE do Preview Frame cita coisa que existe.
 *
 * A semente (`defaultPreview.demoSlots` no meta → `visual.defaultPreview.slots`
 * no contrato) declara os FILHOS que o Preview Frame monta dentro de um
 * container. Nada a validava.
 *
 * POR QUE ISSO PASSAVA (set/2026): enquanto o frame não consumia a semente, o
 * erro era invisível por construção — "nenhum gate pega, porque nada renderiza".
 * Consertado o consumidor, o erro CONTINUOU invisível: uma prop que o componente
 * não declara não vira nem atributo no DOM. Some em silêncio, nos dois regimes.
 *
 * Medido na primeira passagem: 0 componentes inexistentes e 7 props inexistentes
 * — `DssButton.flat` (é VALOR de `variant`, não prop), `DssHeader.elevated` e
 * `DssPage.padding` (não declaram prop nenhuma) e `DssTimelineEntry.color` (×2).
 * Todas corrigidas no mesmo commit que criou este gate.
 *
 * O que NÃO valida: o VALOR da prop (enum, tipo) e se a semente é visualmente
 * representativa. O primeiro cabe ao emissor de contrato; o segundo é julgamento.
 *
 * Uso:
 *   node scripts/validate-demo-seeds.cjs          # relatório
 *   node scripts/validate-demo-seeds.cjs --gate   # exit 1 se houver citação inválida
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'components');

const GATE = process.argv.slice(2).includes('--gate');

function listarContratos() {
  const out = [];
  for (const grupo of fs.readdirSync(COMPONENTS)) {
    const dirGrupo = path.join(COMPONENTS, grupo);
    if (!fs.statSync(dirGrupo).isDirectory()) continue;
    for (const comp of fs.readdirSync(dirGrupo)) {
      const c = path.join(dirGrupo, comp, 'dss.contract.json');
      if (fs.existsSync(c)) out.push({ nome: comp, caminho: c });
    }
  }
  return out;
}

// Universo do que PODE ser citado. Inclui subcomponentes sem contrato próprio
// (DssCardSection, DssCardActions): são named exports do barrel do pai e moram
// em 1-structure/, então não aparecem na varredura de contratos.
function construirUniverso(contratos) {
  const props = new Map();   // nome -> Set(props declaradas)  (só quem tem contrato)
  const existe = new Set();

  for (const { nome, caminho } of contratos) {
    existe.add(nome);
    try {
      const d = JSON.parse(fs.readFileSync(caminho, 'utf8'));
      props.set(nome, new Set((d.api?.props || []).map((p) => p.name)));
    } catch { /* contrato ilegível é problema de outro gate */ }
  }

  for (const grupo of fs.readdirSync(COMPONENTS)) {
    const dirGrupo = path.join(COMPONENTS, grupo);
    if (!fs.statSync(dirGrupo).isDirectory()) continue;
    for (const comp of fs.readdirSync(dirGrupo)) {
      const est = path.join(dirGrupo, comp, '1-structure');
      if (!fs.existsSync(est)) continue;
      for (const f of fs.readdirSync(est)) {
        if (f.endsWith('.vue')) existe.add(f.replace(/\.ts\.vue$|\.vue$/, ''));
      }
    }
  }
  return { props, existe };
}

function varrer(node, dono, universo, achados) {
  if (Array.isArray(node)) { node.forEach((n) => varrer(n, dono, universo, achados)); return; }
  if (!node || typeof node !== 'object') return;

  if (node.component) {
    const alvo = node.component;
    if (!universo.existe.has(alvo)) {
      achados.push({ dono, tipo: 'componente', detalhe: `<${alvo}> não existe` });
    } else {
      const declaradas = universo.props.get(alvo);
      // Sem contrato próprio (subcomponente) não há lista de props para conferir.
      if (declaradas) {
        for (const k of Object.keys(node.props || {})) {
          if (!declaradas.has(k)) {
            achados.push({ dono, tipo: 'prop', detalhe: `${alvo}.${k} não é prop declarada` });
          }
        }
      }
    }
    if (node.children != null) varrer(node.children, dono, universo, achados);
    return;
  }
  // Mapa de slots ou objeto container: desce pelos valores.
  for (const v of Object.values(node)) varrer(v, dono, universo, achados);
}

const contratos = listarContratos();
const universo = construirUniverso(contratos);
const achados = [];
let comSemente = 0;

for (const { nome, caminho } of contratos) {
  let d;
  try { d = JSON.parse(fs.readFileSync(caminho, 'utf8')); } catch { continue; }
  const semente = d.visual?.defaultPreview?.slots;
  if (!semente) continue;
  comSemente++;
  varrer(semente, nome, universo, achados);
}

console.log('🔎 Sementes do Preview Frame — o que a semente cita precisa existir\n');
console.log(`   contratos: ${contratos.length} · com semente: ${comSemente} · universo citável: ${universo.existe.size}`);

if (!achados.length) {
  console.log(`\n✅ ${comSemente} semente(s) citam apenas componentes e props que existem.`);
  process.exit(0);
}

const porTipo = achados.reduce((a, x) => ((a[x.tipo] = (a[x.tipo] || 0) + 1), a), {});
console.log(`\n❌ ${achados.length} citação(ões) inválida(s) — ${Object.entries(porTipo).map(([k, v]) => `${v} de ${k}`).join(' · ')}:`);
for (const a of achados) console.log(`  - ${a.dono}: ${a.detalhe}`);
console.log('\n  A semente vive em dss.meta.json → defaultPreview.demoSlots.');
console.log('  Corrija ALI e reemita o contrato — o contrato é derivado.');
console.log('  Lembre: prop inexistente NÃO vira atributo no DOM. Some em silêncio.');

process.exit(GATE ? 1 : 0);
