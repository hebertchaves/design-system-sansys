#!/usr/bin/env node
/**
 * validate-hover-tokens.cjs — Estados interativos: token certo e técnica triada.
 *
 * CONTEXTO (set/2026). Ao adequar DssButton e DssChip apareceram três defeitos de
 * estado que NENHUM dos 17 validadores do pre-commit pegava. Os aprendizados
 * viraram §L e §M do DSS_UI_ADEQUACAO_CHECKLIST.md — mas checklist é marcado à
 * MÃO: depende de o agente ler e aplicar. Este gate cobra o que dá para provar
 * por leitura estática, para que os componentes ainda na fila não repitam.
 *
 * O QUE ELE COBRA
 *
 * A) PRIMITIVO em degrau de estado — BLOQUEIA (com baseline)
 *    `var(--dss-primary-hover)` e afins. Primitivo NÃO se move por marca: o
 *    estado fica cego a `[data-brand]`. Medido no DssButton (set/2026): hover
 *    #86c0f3 nas três marcas, contraste 1,45:1 no hub. O certo é o SEMÂNTICO —
 *    `--dss-action-*` / `--dss-feedback-*`, que a marca remapeia (§M1).
 *
 * B) `filter: brightness()` em regra de estado — AVISA (com baseline)
 *    NÃO é erro por si: §M4 diz que é legítimo onde o alvo não tem conteúdo por
 *    cima (trilho, thumb, box de controle). É erro quando há label/ícone, porque
 *    `filter` escurece o CONTEÚDO junto — medido no DssButton, o contraste do
 *    label CAÍA de 3,80:1 para 3,73:1 no hover. Como a distinção exige olhar o
 *    DOM, aqui só marcamos: cada ocorrência precisa de triagem §M4 registrada.
 *
 * C) `[data-brand] .dss-icon` descendente — BLOQUEIA
 *    Sequestra a cor do host: o ícone embutido num botão preenchido pega a cor
 *    da MARCA e some contra o fundo (medido: contraste 1,00:1). Contraria o
 *    CCI §2.3 — sem `color`/`brand`, ícone herda `currentColor` (§L1/§L2).
 *
 * COMMENT-AWARE. Sem isto o gate é inútil: os arquivos estão cheios de
 * comentários que CITAM os padrões proibidos ao explicar por que saíram. Sem
 * strip, esses viram falso positivo — e a documentação do conserto reprovaria o
 * gate. Verificado: dos 27 hits brutos de (A), 3 eram comentário.
 *
 * Uso:
 *   node scripts/validate-hover-tokens.cjs           # relatório
 *   node scripts/validate-hover-tokens.cjs --gate    # exit 1 se houver NOVO
 *   node scripts/validate-hover-tokens.cjs --update-baseline
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CORE = path.join(ROOT, 'packages', 'core');
const BASELINE = path.join(__dirname, 'hover-tokens-baseline.json');

const argv = process.argv.slice(2);
const GATE = argv.includes('--gate');
const UPDATE = argv.includes('--update-baseline');
const { sentinela } = require('./lib/sentinela.cjs');

const CORES = 'primary|secondary|tertiary|accent|positive|negative|warning|info';

/** Zera comentários PRESERVANDO as quebras de linha, para o nº da linha continuar certo. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/\/\/[^\n]*/g, (m) => ' '.repeat(m.length));
}

function scss(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.scss')) out.push(p);
    }
  };
  walk(dir);
  return out;
}

// ---------------------------------------------------------------------------
// As regex dos detectores vivem em CONSTANTES, usadas pelo detector E pelo
// autoteste da sentinela. Autoteste com cópia da regex prova só que a cópia
// funciona: se a do detector cegar, a cópia continua verde (achado em out/2026,
// cegando o B2 do validate-brand-form — a sentinela não acusou nada).
const RE_PRIMITIVO_ESTADO = new RegExp(`var\\(--dss-(${CORES})-(hover|deep|light)`);
const RE_BRIGHTNESS = /filter:\s*brightness/;
const RE_ICONE_DESCENDENTE = /\[data-brand[^\]]*\]\s+\.dss-icon\b/g;
let vistoDssButton = false;

function varrer() {
  const achados = { primitivo: [], brightness: [], iconeDescendente: [] };
  const alvos = [path.join(CORE, 'components'), path.join(CORE, 'utils'), path.join(CORE, 'themes')];

  for (const base of alvos) {
    if (!fs.existsSync(base)) continue;
    for (const f of scss(base)) {
      const rel = path.relative(CORE, f).replace(/\\/g, '/');
      const texto = stripComments(fs.readFileSync(f, 'utf8'));
      const linhas = texto.split('\n');
      // C) descendente que sequestra o ícone — sobre o ARQUIVO, não por linha.
      // Por linha, `[data-brand="hub"]\n  .dss-icon` (lista de seletores
      // quebrada em linhas, o formato que o Prettier produz) não casava: foi
      // exatamente essa forma que cegou o B4 do validate-brand-form.
      for (const m of texto.matchAll(RE_ICONE_DESCENDENTE)) {
        achados.iconeDescendente.push({ arquivo: rel, linha: texto.slice(0, m.index).split('\n').length });
      }
      if (rel === 'components/base/DssButton/2-composition/_base.scss') vistoDssButton = true;

      linhas.forEach((linha, i) => {
        const n = i + 1;

        // A) primitivo num degrau de estado
        const mp = linha.match(RE_PRIMITIVO_ESTADO);
        if (mp) achados.primitivo.push({ arquivo: rel, linha: n, token: `--dss-${mp[1]}-${mp[2]}` });

        // B) brightness — só quando o BLOCO é de estado (olha as 6 linhas acima)
        if (RE_BRIGHTNESS.test(linha)) {
          const ctx = linhas.slice(Math.max(0, i - 6), i + 1).join('\n');
          if (/:hover|:active|:focus/.test(ctx)) achados.brightness.push({ arquivo: rel, linha: n });
        }

      });
    }
  }
  return achados;
}

const chave = (a) => `${a.arquivo}`;

function main() {
  const achados = varrer();
  // As três regex rodam sobre casos que SÃO achado, e a varredura tem de ter
  // lido o DssButton. Sem isso, "nenhum caso NOVO" pode ser regex cega.
  const casa = (re, s) => { re.lastIndex = 0; const ok = re.test(s); re.lastIndex = 0; return ok; };
  sentinela('validate-hover-tokens', [
    [vistoDssButton, 'DssButton/2-composition/_base.scss na varredura'],
    [RE_PRIMITIVO_ESTADO.test('background: var(--dss-primary-hover);'), 'autoteste A: primitivo de estado reconhecido'],
    [RE_BRIGHTNESS.test('filter: brightness(0.9);'), 'autoteste B: brightness reconhecido'],
    [casa(RE_ICONE_DESCENDENTE, '[data-brand="hub"]\n  .dss-icon { color: red; }'), 'autoteste C: seletor multi-linha reconhecido'],
  ]);

  // Baseline por ARQUIVO (não por linha): linha muda a cada edição e geraria ruído.
  const atual = {
    primitivo: [...new Set(achados.primitivo.map(chave))].sort(),
    brightness: [...new Set(achados.brightness.map(chave))].sort(),
  };

  if (UPDATE) {
    fs.writeFileSync(BASELINE, JSON.stringify({
      note: 'Debito conhecido de estados interativos, POR ARQUIVO. O gate bloqueia NOVOS fora desta lista. ' +
            'Ao adequar um componente, aplique §L/§M do DSS_UI_ADEQUACAO_CHECKLIST.md e remova-o daqui.',
      ...atual,
    }, null, 2) + '\n');
    console.log('✅ Baseline atualizado.');
    return;
  }

  const base = fs.existsSync(BASELINE)
    ? JSON.parse(fs.readFileSync(BASELINE, 'utf8'))
    : { primitivo: [], brightness: [] };

  const novoPrim = atual.primitivo.filter((f) => !(base.primitivo || []).includes(f));
  const novoBri = atual.brightness.filter((f) => !(base.brightness || []).includes(f));
  const icones = achados.iconeDescendente;

  // CATRACA (scripts/lib/catraca.cjs): o baseline do disco é comparado com o do
  // HEAD. Cresceu → reprova (débito novo só com commit dedicado + --aceitar-debito);
  // entrada já resolvida sobrando → reprova ("remova a linha"). Antes só se avisava
  // ao encolher, e um --update-baseline absorvia o caso novo em silêncio.
  {
    const chaves = (j) => [...(j.primitivo || []).map((f) => `primitivo:${f}`), ...(j.brightness || []).map((f) => `brightness:${f}`)];
    const r = require('./lib/catraca.cjs').catraca({
      gate: 'validate-hover-tokens', baselineRel: 'scripts/hover-tokens-baseline.json',
      noDisco: chaves(base), chavesDe: chaves, aindaPendentes: chaves(atual),
      permitirCrescer: argv.includes('--aceitar-debito'),
    });
    if (r.falhou && GATE) process.exit(1);
  }

  console.log('🔎 Estados interativos — token certo e técnica triada (§L/§M)\n');

  console.log(`   A. Primitivo em degrau de estado: ${achados.primitivo.length} ref(s) em ${atual.primitivo.length} arquivo(s)`);
  if (base.primitivo?.length) console.log(`      (${base.primitivo.length} no baseline — débito conhecido)`);
  for (const f of novoPrim) {
    console.log(`      ❌ NOVO: ${f}`);
    for (const a of achados.primitivo.filter((x) => x.arquivo === f).slice(0, 3)) {
      console.log(`           :${a.linha}  ${a.token}  → use o SEMÂNTICO (--dss-action-* / --dss-feedback-*)`);
    }
  }

  console.log(`\n   B. filter:brightness em estado: ${achados.brightness.length} ref(s) em ${atual.brightness.length} arquivo(s)`);
  if (base.brightness?.length) console.log(`      (${base.brightness.length} no baseline — aguardam triagem §M4)`);
  for (const f of novoBri) {
    console.log(`      ⚠️  NOVO: ${f}`);
    console.log('           §M4: legítimo se o alvo NÃO tem conteúdo por cima. Com label/ícone,');
    console.log('           `filter` escurece o conteúdo junto e DERRUBA o contraste. Meça antes.');
  }

  console.log(`\n   C. [data-brand] .dss-icon (descendente): ${icones.length}`);
  for (const a of icones) {
    console.log(`      ❌ ${a.arquivo}:${a.linha} — sequestra a cor do host (CCI §2.3, §L1)`);
  }

  const falhou = novoPrim.length || novoBri.length || icones.length;
  if (!falhou) {
    console.log('\n✅ Nenhum caso NOVO. (Baseline = débito já registrado no DEBITO_ABERTO.)');
    return;
  }

  console.log('\n📖 Detalhe e como corrigir: §L e §M do docs/governance/DSS_UI_ADEQUACAO_CHECKLIST.md');
  if (GATE) process.exit(1);
}

main();
