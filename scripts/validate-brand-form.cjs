#!/usr/bin/env node
/**
 * validate-brand-form.cjs — A marca chega pelo TOKEN, nunca pela tinta.
 *
 * POR QUE ESTE GATE EXISTE
 *
 * A regra é antiga: §K5 do checklist manda a prop `brand` REMAPEAR o token
 * semântico, nunca pintar o primitivo. `DSS_FRENTE_MARCA_PRIMITIVOS.md` mediu a
 * dívida inteira, nomeou a causa e escreveu a correção. Nada disso barrou um
 * commit sequer.
 *
 * A prova está no contador: quando a frente foi escrita eram 92 componentes com
 * `4-output/_brands.scss`. Hoje são 100. Oito entraram DEPOIS de a dívida estar
 * documentada — e entraram pintando, porque documentação não é gate.
 *
 * Dos 18 validadores do pre-commit, nenhum olhava a forma da marca. Dois a
 * tocavam de raspão (hover-tokens pega primitivo em degrau de ESTADO;
 * scss-tokens pega token fantasma). O eixo central estava descoberto.
 *
 * O QUE ELE COBRA — detalhe em docs/governance/DSS_MODELO_PROPAGACAO_MARCA.md
 *
 * B1) PRIMITIVO DE MARCA em CSS de componente — BLOQUEIA (baseline por arquivo)
 *     `var(--dss-hub-600)`, `var(--dss-water-50)`, … Primitivo de marca mora em
 *     `tokens/brand/`, e só lá. Pintado direto no componente, ele passa POR FORA
 *     da camada de token: nenhum tema o alcança. Medido — texto branco sobre
 *     fundo de marca no tema `hc`: 8,88:1 pelo atributo, 2,81:1 pela tinta.
 *     O alto contraste corrige um caminho e não o outro.
 *
 * B2) `_brands.scss` QUE NÃO REMAPEIA — BLOQUEIA (baseline por arquivo)
 *     Um `4-output/_brands.scss` sem nenhuma declaração de custom property está
 *     pintando, não remapeando. É a forma proibida pelo §K5. Hoje: 5 de 100
 *     remapeiam.
 *
 * B3) PROP `brand` QUE NÃO EMITE `data-brand` — BLOQUEIA (baseline por componente)
 *     Prop declarada em `types/` cuja estrutura não emite o atributo nem repassa
 *     `brand` a um filho DSS. Atenção ao que isto NÃO quer dizer: a prop
 *     normalmente FUNCIONA — ela vira a classe `.dss-x--brand-hub` e o
 *     `_brands.scss` pinta. O defeito é a ROTA, não o efeito. Pela classe, a
 *     marca passa por fora da camada de token e fica fora do alcance de tema,
 *     alto contraste e override local; pelo atributo, entra na cascata e o
 *     remapeamento faz o resto. Medido no DssButton: `brand` só existe no
 *     `useButtonClasses`, nunca no template.
 *
 *     Delegação a um filho DSS é rota válida (DssAppBar → DssToolbar).
 *
 * COMMENT-AWARE, como o hover-tokens. Sem strip, o próprio texto que explica por
 * que um primitivo saiu reprovaria o gate.
 *
 * Uso:
 *   node scripts/validate-brand-form.cjs                  # relatório
 *   node scripts/validate-brand-form.cjs --gate           # exit 1 se houver NOVO
 *   node scripts/validate-brand-form.cjs --update-baseline
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'packages', 'core', 'components');
const BASELINE = path.join(__dirname, 'brand-form-baseline.json');

const argv = process.argv.slice(2);
const GATE = argv.includes('--gate');
const UPDATE = argv.includes('--update-baseline');

const MARCAS = 'hub|water|waste';

/** Zera comentários PRESERVANDO quebras de linha, para o nº da linha continuar certo. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + ' '.repeat(m.length - p.length));
}

function walk(dir, ext, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, out);
    else if (ext.some((x) => e.name.endsWith(x))) out.push(p);
  }
  return out;
}

const rel = (p) => path.relative(COMPONENTS, p).split(path.sep).join('/');
/** "base/DssButton" a partir de qualquer arquivo dentro do componente. */
const componenteDe = (p) => rel(p).split('/').slice(0, 2).join('/');

// ---------------------------------------------------------------- B1 + B2
function analisarScss() {
  const b1 = [];
  const b2 = [];

  for (const arquivo of walk(COMPONENTS, ['.scss'])) {
    const src = stripComments(fs.readFileSync(arquivo, 'utf8'));
    const linhas = src.split('\n');

    // B1 — primitivo de marca
    const re = new RegExp(`var\\(\\s*(--dss-(?:${MARCAS})-\\d+)`, 'g');
    linhas.forEach((linha, i) => {
      let m;
      while ((m = re.exec(linha))) b1.push({ arquivo: rel(arquivo), linha: i + 1, token: m[1] });
    });

    // B2 — _brands.scss que não declara nenhuma custom property
    if (/4-output\/_brands\.scss$/.test(rel(arquivo))) {
      const remapeia = /^\s*--dss-[a-z0-9-]+\s*:/m.test(src);
      if (!remapeia) b2.push(rel(arquivo));
    }
  }
  return { b1, b2 };
}

// ---------------------------------------------------------------- B3
function analisarProps() {
  const semRota = [];

  for (const tipos of walk(COMPONENTS, ['.types.ts'])) {
    const src = stripComments(fs.readFileSync(tipos, 'utf8'));
    if (!/^\s*brand\?*\s*:/m.test(src)) continue;

    const comp = componenteDe(tipos);
    const dir = path.join(COMPONENTS, comp, '1-structure');
    const estrutura = walk(dir, ['.vue']);
    if (!estrutura.length) continue;

    const rota = estrutura.some((f) => {
      const vue = fs.readFileSync(f, 'utf8');
      return (
        /['"\s:[]data-brand['"\s\]=]/.test(vue) || // emite o atributo
        /\bv-bind:brand\b|:brand\s*=|\bbrand\s*=\s*"/.test(vue) // delega a um filho
      );
    });
    if (!rota) semRota.push(comp);
  }
  return [...new Set(semRota)].sort();
}

// ---------------------------------------------------------------- main
function main() {
  const { b1, b2 } = analisarScss();
  const b3 = analisarProps();

  const arquivosB1 = [...new Set(b1.map((a) => a.arquivo))].sort();

  if (UPDATE) {
    fs.writeFileSync(
      BASELINE,
      JSON.stringify(
        {
          note:
            'Debito conhecido de FORMA DA MARCA, congelado. O gate bloqueia NOVOS fora destas listas. ' +
            'Ao migrar um componente (DSS_MODELO_PROPAGACAO_MARCA.md §9), remova-o daqui. As listas so podem encolher.',
          primitivoDeMarca: arquivosB1,
          brandsSemRemap: b2.sort(),
          propSemRota: b3,
        },
        null,
        2
      ) + '\n'
    );
    console.log(
      `✅ Baseline gravado: ${arquivosB1.length} arquivo(s) com primitivo, ` +
        `${b2.length} _brands.scss sem remap, ${b3.length} prop(s) sem rota.`
    );
    return;
  }

  const base = fs.existsSync(BASELINE)
    ? JSON.parse(fs.readFileSync(BASELINE, 'utf8'))
    : { primitivoDeMarca: [], brandsSemRemap: [], propSemRota: [] };

  const novoB1 = arquivosB1.filter((f) => !(base.primitivoDeMarca || []).includes(f));
  const novoB2 = b2.filter((f) => !(base.brandsSemRemap || []).includes(f));
  const novoB3 = b3.filter((c) => !(base.propSemRota || []).includes(c));

  console.log('🔎 Forma da marca — chega pelo TOKEN, nunca pela tinta (§K5)\n');

  console.log(`   B1. Primitivo de marca em componente: ${b1.length} ref(s) em ${arquivosB1.length} arquivo(s)`);
  if (base.primitivoDeMarca?.length) console.log(`       (${base.primitivoDeMarca.length} no baseline — débito conhecido)`);
  for (const f of novoB1) {
    console.log(`       ❌ NOVO: ${f}`);
    for (const a of b1.filter((x) => x.arquivo === f).slice(0, 3)) {
      console.log(`            :${a.linha}  ${a.token}  → remapeie o SEMÂNTICO; primitivo de marca só em tokens/brand/`);
    }
  }

  console.log(`\n   B2. _brands.scss que pinta em vez de remapear: ${b2.length}`);
  if (base.brandsSemRemap?.length) console.log(`       (${base.brandsSemRemap.length} no baseline)`);
  for (const f of novoB2) {
    console.log(`       ❌ NOVO: ${f}`);
    console.log('            O bloco precisa declarar `--dss-action-*` / `--dss-brand-*`, não pintar a propriedade.');
  }

  console.log(`\n   B3. Prop \`brand\` que não emite \`data-brand\`: ${b3.length}`);
  if (base.propSemRota?.length) console.log(`       (${base.propSemRota.length} no baseline)`);
  for (const c of novoB3) {
    console.log(`       ❌ NOVO: ${c}`);
    console.log('            A prop provavelmente FUNCIONA via classe — o defeito é a rota, não o efeito.');
    console.log('            Emita `:data-brand="brand || undefined"` no root, ou delegue a prop a um filho DSS.');
  }

  // A catraca: o baseline só pode encolher.
  const sumiuB1 = (base.primitivoDeMarca || []).filter((f) => !arquivosB1.includes(f));
  const sumiuB2 = (base.brandsSemRemap || []).filter((f) => !b2.includes(f));
  const sumiuB3 = (base.propSemRota || []).filter((c) => !b3.includes(c));
  const migrados = sumiuB1.length + sumiuB2.length + sumiuB3.length;
  if (migrados) {
    console.log(`\n   🎉 ${migrados} item(ns) do baseline já corrigido(s). Rode --update-baseline para encolher a lista.`);
  }

  const falhou = novoB1.length + novoB2.length + novoB3.length;
  if (!falhou) {
    console.log('\n✅ Nenhum caso NOVO de forma de marca.');
    return;
  }

  console.log('\n📖 O modelo e a ordem da migração: docs/governance/DSS_MODELO_PROPAGACAO_MARCA.md');
  if (GATE) process.exit(1);
}

main();
