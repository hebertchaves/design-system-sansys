#!/usr/bin/env node
/**
 * validate-structure.cjs — Gate Estrutural DSS (Cartão Base / CLAUDE.md).
 *
 * ORIGEM (ago/2026): mapeando os 7 eixos do antigo "Modo Auditor" contra o que
 * já é verificado por comando, este foi o ÚNICO sem cobertura alguma. As 4
 * camadas o `validate_component_code` do MCP já checa; wrapper, barrel e ordem
 * do orquestrador ninguém checava — eram afirmados lendo código, que é onde o
 * erro humano mora.
 *
 * O CLAUDE.md classifica a ausência de Entry Point Wrapper como NÃO-CONFORMIDADE
 * BLOQUEANTE. Um gate é a forma de isso ser verdade em vez de intenção.
 *
 * REGRAS
 *   A. 4 camadas — 1-structure, 2-composition, 3-variants, 4-output
 *   B. Entry Point Wrapper — <Comp>.vue na raiz, RE-EXPORT PURO: sem <template>,
 *      sem <style>, importando de ./1-structure/ e com export default. O wrapper
 *      é a superfície pública; lógica nele significa duas implementações.
 *   C. Barrel — index.ts (index.js é barrado por validate-barrel-ext)
 *   D. Orquestrador — <Comp>.module.scss importando L2 → L3 → L4 NESSA ORDEM.
 *      A ordem é cascata: variante sobrescreve base, output sobrescreve variante.
 *      Fora de ordem, o estilo mais específico perde para o mais geral.
 *
 * ESCOPO: diretório com `dss.meta.json` é componente. Subcomponentes que moram
 * dentro do 1-structure de outro (ex.: DssCardSection) não têm diretório próprio
 * e portanto não são cobrados — quem responde por eles é o componente dono.
 *
 * Uso:
 *   node scripts/validate-structure.cjs            # relatório
 *   node scripts/validate-structure.cjs --gate     # exit 1 se houver violação
 *   node scripts/validate-structure.cjs DssChip    # um componente
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'components');
const GRUPOS = ['base', 'composed', 'stress-test'];
const CAMADAS = ['1-structure', '2-composition', '3-variants', '4-output'];

const args = process.argv.slice(2);
const GATE = args.includes('--gate');
const ALVO = args.find((a) => !a.startsWith('--'));

function componentes() {
  const out = [];
  for (const g of GRUPOS) {
    const dir = path.join(COMPONENTS, g);
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { continue; }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const full = path.join(dir, e.name);
      // `dss.meta.json` é o marcador de "isto é um componente".
      if (!fs.existsSync(path.join(full, 'dss.meta.json'))) continue;
      if (ALVO && e.name.toLowerCase() !== ALVO.toLowerCase()) continue;
      out.push({ nome: e.name, grupo: g, dir: full });
    }
  }
  return out;
}

/** Wrapper é re-export puro? Devolve lista de motivos de reprovação. */
function checarWrapper(dir, nome) {
  const p = path.join(dir, `${nome}.vue`);
  if (!fs.existsSync(p)) return ['wrapper ausente (<Comp>.vue na raiz)'];
  const src = fs.readFileSync(p, 'utf8');
  const motivos = [];
  // Remove os blocos <script> e os comentários HTML ANTES de procurar marcação.
  // Procurar "<template" no arquivo cru dá falso positivo: os wrappers documentam
  // no JSDoc justamente que "NÃO contém <template>" — e o texto casava. Sobrando
  // só o que está FORA do script, qualquer bloco remanescente é violação real.
  const foraDoScript = src
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  if (/<template[\s>]/.test(foraDoScript)) motivos.push('wrapper tem <template> (deve ser re-export puro)');
  if (/<style[\s>]/.test(foraDoScript)) motivos.push('wrapper tem <style> (estilo mora no orquestrador)');
  if (!/from\s+['"]\.\/1-structure\//.test(src)) motivos.push('wrapper não importa de ./1-structure/');
  if (!/export\s+default/.test(src)) motivos.push('wrapper sem export default');
  return motivos;
}

/** Orquestrador importa L2 → L3 → L4 nessa ordem? */
function checarOrquestrador(dir, nome) {
  const p = path.join(dir, `${nome}.module.scss`);
  if (!fs.existsSync(p)) return ['orquestrador ausente (<Comp>.module.scss)'];
  // Remove comentários ANTES de medir ordem. Detectar por "linha que começa com
  // marcador" não basta: o cabeçalho destes arquivos é um bloco /* … */ cujas
  // linhas de continuação não começam com `*` e mencionam as camadas em prosa
  // ("media queries estão em 4-output/_states.scss"). Isso fazia 4-output ser
  // "encontrado" no comentário, antes dos @use reais — falso fora-de-ordem.
  const src = fs
    .readFileSync(p, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
  const pos = {};
  for (const c of ['2-composition', '3-variants', '4-output']) {
    const i = src.indexOf(c);
    if (i !== -1) pos[c] = i;
  }
  const faltando = ['2-composition', '3-variants', '4-output'].filter((c) => pos[c] === undefined);
  if (faltando.length) return [`orquestrador não importa: ${faltando.join(', ')}`];
  if (!(pos['2-composition'] < pos['3-variants'] && pos['3-variants'] < pos['4-output'])) {
    return ['orquestrador fora de ordem — deve ser L2 → L3 → L4 (cascata)'];
  }
  return [];
}

const lista = componentes();
if (!lista.length) {
  console.log(ALVO ? `⚠️  Componente "${ALVO}" não encontrado.` : '⚠️  Nenhum componente encontrado.');
  process.exit(ALVO ? 2 : 0);
}

const reprovados = [];

for (const c of lista) {
  const motivos = [];

  const semCamada = CAMADAS.filter((l) => !fs.existsSync(path.join(c.dir, l)));
  if (semCamada.length) motivos.push(`camada(s) ausente(s): ${semCamada.join(', ')}`);

  motivos.push(...checarWrapper(c.dir, c.nome));
  if (!fs.existsSync(path.join(c.dir, 'index.ts'))) motivos.push('barrel ausente (index.ts)');
  motivos.push(...checarOrquestrador(c.dir, c.nome));

  if (motivos.length) reprovados.push({ ...c, motivos });
}

console.log('🔍 Gate Estrutural DSS (4 camadas · wrapper · barrel · orquestrador)\n');
console.log(`🔎 ${lista.length} componente(s) verificado(s) · ${reprovados.length} com violação\n`);

for (const r of reprovados) {
  console.log(`❌ ${r.nome}  (${r.grupo})`);
  for (const m of r.motivos) console.log(`   - ${m}`);
}

if (!reprovados.length) {
  console.log('✅ Estrutura: todos conformes.');
  process.exit(0);
}
console.log(`\n📖 Estrutura obrigatória: CLAUDE.md → Cartão Base.`);
console.log('   Ausência de Entry Point Wrapper é NÃO-CONFORMIDADE BLOQUEANTE.');
process.exit(GATE ? 1 : 0);
