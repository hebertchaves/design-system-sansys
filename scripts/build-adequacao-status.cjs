#!/usr/bin/env node
/**
 * build-adequacao-status.cjs — Quadro de estado da ADEQUAÇÃO DE UI (Fases 1 e 2).
 *
 * CONTEXTO (set/2026). O `DEBITO_ABERTO.md` carregava esse placar à mão, e ele
 * apodreceu: dizia "Preview Frame: 11" quando eram 12, listava o `DssInput` mas
 * esquecia o `DssEmptyState`, e usava "76 componentes" quando as Fases 1 e 2
 * somam 88. Números escritos à mão sobre uma fila que anda toda semana envelhecem
 * sem avisar — e a memória do agente envelheceu junto ("próximo: DssCheckbox",
 * quando Checkbox já estava fechado há um mês).
 *
 * Este script deriva o quadro DO DISCO, como o `build-catalog.cjs` faz com o
 * catálogo. Nada de lista hardcoded de componentes adequados.
 *
 * ⚠️ SELO ≠ ADEQUADO. São eixos diferentes: o selo é auditoria de conformidade
 * (Fases 1/2 estão 100% seladas); a adequação de UI é uma onda posterior.
 *
 * CRITÉRIO. O `DSS_UI_ADEQUACAO_CHECKLIST.md` exige, por componente adequado,
 * página Playground E Preview Frame registrado — os dois juntos são o que torna
 * possível a análise visual, o passo que FECHA a adequação. Logo:
 *   Playground + Preview Frame → fechada
 *   só Preview Frame          → soFrame (caso DssUploader — ver nota em classificar())
 *   só Playground             → parcial (não fecha)
 *   nenhum                    → não iniciada
 * É INFERÊNCIA a partir dos artefatos, não um selo: não existe gate de adequação
 * (ver o item "Eixo visual da adequação" no DEBITO_ABERTO.md). É o sinal mais
 * confiável disponível hoje.
 *
 * ARMADILHA CONHECIDA. O Preview Frame do `DssInput` usa a chave SEM sufixo
 * (`activeComponent === 'preview-frame'`), por ter sido o primeiro. Recontar por
 * grep de `preview-frame-*` perde justamente ele — foi assim que a contagem
 * anterior errou. A resolução do dono aqui é híbrida (sufixo, com fallback para a
 * posição no template); ver o comentário em lerArtefatos().
 *
 * Uso:
 *   node scripts/build-adequacao-status.cjs           # escreve o doc
 *   node scripts/build-adequacao-status.cjs --check   # exit 1 se o doc estiver defasado
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CERT = path.join(ROOT, 'docs', 'governance', 'CERTIFIED_COMPONENTS.md');
const SUITE = path.join(ROOT, 'apps', 'sandbox', 'src', 'TestSuite.vue');
const SANDBOX_SRC = path.join(ROOT, 'apps', 'sandbox', 'src');
const OUT = path.join(ROOT, 'docs', 'governance', 'DSS_ESTADO_ADEQUACAO_UI.md');

const CHECK = process.argv.slice(2).includes('--check');

/** 'empty-state' e 'DssEmptyState' colapsam para a mesma chave 'emptystate'. */
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/^dss/, '');

// ---------------------------------------------------------------------------
// 1. Componentes das Fases 1 e 2 (fonte: índice de certificados)
// ---------------------------------------------------------------------------
function lerCertificados() {
  const linhas = fs.readFileSync(CERT, 'utf8').split(/\r?\n/);
  const comps = [];
  let fase = null;
  for (const linha of linhas) {
    const cab = linha.match(/^##\s*Fase\s*(\d)/);
    if (cab) { fase = cab[1]; continue; }
    const row = linha.match(/^\|\s*`(Dss\w+)`\s*\|(.*)$/);
    if (!row || (fase !== '1' && fase !== '2')) continue;
    const cols = row[2].split('|').map((c) => c.trim());
    // Fase 2 tem uma coluna "nível" a mais antes da categoria.
    comps.push({
      nome: row[1],
      fase: Number(fase),
      categoria: (fase === '2' ? cols[1] : cols[0]) || '—',
      selo: (fase === '2' ? cols[2] : cols[1]) || '—',
    });
  }
  return comps;
}

// ---------------------------------------------------------------------------
// 2. Artefatos visuais registrados no sandbox
// ---------------------------------------------------------------------------
function lerArtefatos() {
  const suite = fs.readFileSync(SUITE, 'utf8');

  // Resolução do DONO de cada Preview Frame — híbrida, porque o sandbox tem duas
  // formas de registro:
  //   a) `preview-frame-<comp>` → o sufixo nomeia o dono. Vale para os aninhados
  //      sob o componente E para os de TOPO (Uploader, Multiselect), que não têm
  //      item de componente antes deles — só a posição erraria esses dois.
  //   b) `preview-frame` sem sufixo → dono = último item de componente declarado
  //      antes (é o caso do DssInput, o primeiro registrado). Só a posição resolve.
  const chaves = [...suite.matchAll(/activeComponent = '([a-z0-9-]+)'/g)].map((m) => m[1]);
  const frames = new Set();
  let ultimoComponente = null;
  for (const chave of chaves) {
    if (!chave.startsWith('preview-frame')) { ultimoComponente = chave; continue; }
    const sufixo = chave.slice('preview-frame'.length).replace(/^-/, '');
    if (sufixo) frames.add(norm(sufixo));
    else if (ultimoComponente) frames.add(norm(ultimoComponente));
  }

  const playgrounds = new Set(
    fs.readdirSync(SANDBOX_SRC)
      .filter((f) => /^Test.+\.vue$/.test(f))
      .map((f) => norm(f.slice(4, -4)))
  );

  return { frames, playgrounds };
}

// ---------------------------------------------------------------------------
// 3. Classificação
// ---------------------------------------------------------------------------
const ESTADOS = {
  fechada:  { marca: '✅', rotulo: 'Adequação fechada',  ordem: 0 },
  soFrame:  { marca: '🔵', rotulo: 'Só Preview Frame',   ordem: 1 },
  parcial:  { marca: '🟡', rotulo: 'Só Playground',      ordem: 2 },
  ausente:  { marca: '⬜', rotulo: 'Não iniciada',       ordem: 3 },
};

function classificar(comps, { frames, playgrounds }) {
  for (const c of comps) {
    const k = norm(c.nome);
    c.playground = playgrounds.has(k);
    c.frame = frames.has(k);
    // Quatro estados, não três. `soFrame` existe porque DssUploader tem Preview
    // Frame e NÃO tem página Playground — o próprio TestSuite.vue registra o
    // motivo ("não têm página de teste onde ancorar"). Colapsar esse caso em
    // "não iniciada" seria falso: a adequação dele foi validada ponta a ponta.
    c.estado = c.frame && c.playground ? 'fechada'
             : c.frame ? 'soFrame'
             : c.playground ? 'parcial'
             : 'ausente';
  }
  // Artefatos que não casaram com nenhum componente de Fase 1/2 (ex.: Fase 3,
  // fixtures). Reportados para que a divergência não passe silenciosa.
  const conhecidos = new Set(comps.map((c) => norm(c.nome)));
  const orfaos = [...frames].filter((k) => !conhecidos.has(k));
  return orfaos;
}

// ---------------------------------------------------------------------------
// 4. Emissão do documento
// ---------------------------------------------------------------------------
function tabela(comps) {
  const linhas = [
    '| | Componente | Categoria | Selo | Playground | Preview Frame |',
    '|---|---|---|---|---|---|',
  ];
  const ordenado = [...comps].sort(
    (a, b) => ESTADOS[a.estado].ordem - ESTADOS[b.estado].ordem || a.nome.localeCompare(b.nome)
  );
  for (const c of ordenado) {
    linhas.push(
      `| ${ESTADOS[c.estado].marca} | \`${c.nome}\` | ${c.categoria} | ${c.selo} ` +
      `| ${c.playground ? 'sim' : '—'} | ${c.frame ? 'sim' : '—'} |`
    );
  }
  return linhas.join('\n');
}

function montarDoc(comps, orfaos) {
  const hoje = new Date().toLocaleDateString('pt-BR');
  const f1 = comps.filter((c) => c.fase === 1);
  const f2 = comps.filter((c) => c.fase === 2);
  const cont = (rs, e) => rs.filter((r) => r.estado === e).length;
  const nomes = (rs, e) => rs.filter((r) => r.estado === e).map((r) => r.nome).sort()
    .map((n) => `\`${n}\``).join(', ');
  const totFechada = cont(comps, 'fechada');

  return `# DSS — Estado da Adequação de UI (Fases 1 e 2)

<!-- AUTO-GENERATED — não editar à mão.
     Regenerar: \`npm run build:adequacao-status\` (ou node scripts/build-adequacao-status.cjs)
     Fontes: docs/governance/CERTIFIED_COMPONENTS.md + apps/sandbox/src/TestSuite.vue -->

> **Gerado do disco em ${hoje}**, não de memória. Fase, categoria e selo saem do
> \`CERTIFIED_COMPONENTS.md\`; os artefatos visuais saem do \`TestSuite.vue\` do sandbox.
>
> ⚠️ **Selo ≠ adequado.** São eixos diferentes. Os ${comps.length} componentes das Fases 1 e 2 estão
> **100% selados**; a adequação de UI é uma onda posterior, e cobre **${totFechada}** deles. Um
> componente selado em janeiro/2026 foi auditado contra as regras de então — não contra o checklist
> de adequação.

## Legenda

| | Significado | Critério objetivo |
|---|---|---|
| ✅ | **Adequação fechada** | Tem página Playground **e** Preview Frame registrado |
| 🔵 | **Só Preview Frame** | Tem o frame, falta a página Playground — ver nota abaixo |
| 🟡 | **Só Playground** | Tem a página, falta o Preview Frame — não fecha |
| ⬜ | **Não iniciada** | Nenhum dos dois artefatos |

O critério vem do \`DSS_UI_ADEQUACAO_CHECKLIST.md\`: os dois artefatos juntos são o que torna possível
a análise visual, **o passo que FECHA a adequação**. Não há gate automatizado — esta marcação é
**inferida da presença dos artefatos no disco**, que é o sinal mais confiável disponível hoje, mas é
inferência, não selo.

## Placar

| Fase | Componentes | Adequados | Só frame | Só playground | Não iniciados |
|---|---|---|---|---|---|
| **Fase 1 — Atômicos** | ${f1.length} | **${cont(f1, 'fechada')}** | ${cont(f1, 'soFrame')} | ${cont(f1, 'parcial')} | ${cont(f1, 'ausente')} |
| **Fase 2 — Compostos** | ${f2.length} | **${cont(f2, 'fechada')}** | ${cont(f2, 'soFrame')} | ${cont(f2, 'parcial')} | ${cont(f2, 'ausente')} |
| **Total** | **${comps.length}** | **${totFechada}** | ${cont(comps, 'soFrame')} | ${cont(comps, 'parcial')} | ${cont(comps, 'ausente')} |

**Próximos da fila por menor esforço** — já têm Playground, falta só o Preview Frame:
${nomes(comps, 'parcial') || '_nenhum_'}.

${cont(comps, 'soFrame')
  ? `**Só Preview Frame** (${nomes(comps, 'soFrame')}): têm o frame e **não** têm página Playground — o
\`TestSuite.vue\` registra o motivo no próprio código ("não têm página de teste onde ancorar"). Não é
adequação não iniciada; é o artefato Playground que falta, e o comentário no sandbox já instrui a mover
o item para baixo da página quando ela existir.`
  : '_Nenhum componente na situação "só Preview Frame" — todo frame registrado tem página Playground._'}

## Fase 1 — Componentes Atômicos (${cont(f1, 'fechada')}/${f1.length})

${tabela(f1)}

## Fase 2 — Componentes Compostos (${cont(f2, 'fechada')}/${f2.length})

${tabela(f2)}

## Fora desta contagem

${orfaos.length
  ? `- **Preview Frames sem componente de Fase 1/2 correspondente:** ${orfaos.map((o) => `\`${o}\``).join(', ')} — tipicamente Fase 3 (ex.: \`DssMultiselectAutocomplete\`), que não entra neste placar.`
  : '- Nenhum Preview Frame órfão.'}
- \`DssDataCard\` (Fase 3), \`DssCadrisCard\` e \`DssTestPageComplexity\` — fixtures/stress test, fora
  do escopo por decisão de governança.

## Armadilha ao recontar

O Preview Frame do \`DssInput\` usa a chave **sem sufixo** (\`activeComponent === 'preview-frame'\`),
por ter sido o primeiro registrado. Recontar por \`grep preview-frame-*\` **perde justamente ele** —
foi assim que a contagem anterior (“11 frames”) errou. Este script resolve o dono de cada frame pela
**posição no template**, não pelo nome da chave.
`;
}

// ---------------------------------------------------------------------------
function main() {
  const comps = lerCertificados();
  const artefatos = lerArtefatos();
  const orfaos = classificar(comps, artefatos);
  const doc = montarDoc(comps, orfaos);

  const conta = (e) => comps.filter((c) => c.estado === e).length;
  const fechadas = conta('fechada');

  if (CHECK) {
    const atual = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    // A linha "Gerado do disco em <data>" muda todo dia; comparar sem ela.
    const semData = (s) => s.replace(/> \*\*Gerado do disco em .*?\*\*/, '');
    if (semData(atual) !== semData(doc)) {
      console.error('❌ DSS_ESTADO_ADEQUACAO_UI.md está defasado.');
      console.error('   Rode: npm run build:adequacao-status');
      process.exit(1);
    }
    console.log('✅ Quadro de adequação em dia.');
    return;
  }

  fs.writeFileSync(OUT, doc, 'utf8');
  console.log('🔎 Adequação de UI — Fases 1 e 2 (derivado do disco)\n');
  console.log(`   componentes: ${comps.length} · fechados: ${fechadas} · só frame: ${conta('soFrame')} · só playground: ${conta('parcial')} · não iniciados: ${conta('ausente')}`);
  if (orfaos.length) console.log(`   ⚠️  Preview Frames fora de Fase 1/2: ${orfaos.join(', ')}`);
  console.log(`\n✅ Escrito: ${path.relative(ROOT, OUT)}`);
}

main();
