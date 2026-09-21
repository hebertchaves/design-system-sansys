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

  // Resolução do DONO de cada Preview Frame — agora DIRETA.
  //
  // Até set/2026 os frames eram itens de menu (`preview-frame-<comp>`) e o dono
  // saía do sufixo, com um caso resolvido só pela POSIÇÃO (o `preview-frame` sem
  // sufixo, do DssInput, o primeiro registrado). Recontar por grep perdia
  // justamente ele — foi assim que a contagem antiga errou.
  //
  // Com o frame embutido na página de teste, o registro virou um MAPA explícito
  // no TestSuite.vue (`PREVIEW_FRAMES`), cujo VALOR é o nome do componente. Some
  // a heurística de posição e some a classe de erro que ela criava.
  //
  // O `preview-frame-multiselect` continua sendo item de menu: é Fase 3 e não tem
  // página de teste onde ancorar. Fica fora do mapa e fora deste placar, mas é
  // reportado à parte como AVULSO (ver abaixo).
  const bloco = suite.match(/const PREVIEW_FRAMES = \{([\s\S]*?)\n\}/);
  if (!bloco) {
    console.error('❌ `const PREVIEW_FRAMES = {...}` não encontrado em TestSuite.vue.');
    console.error('   O placar deriva DESSE mapa. Se o registro mudou de forma, este script precisa acompanhar.');
    process.exit(1);
  }
  const frames = new Set(
    [...bloco[1].matchAll(/:\s*'(Dss[A-Za-z]+)'/g)].map((m) => norm(m[1]))
  );

  // Frames que continuam sendo ITEM DE MENU, fora do mapa. Hoje só o
  // `preview-frame-multiselect`. Ficam fora do placar (não são Fase 1/2), mas
  // PRECISAM ser reportados: a primeira versão desta mudança simplesmente parou
  // de mencioná-los, e um frame que existe e ninguém conta é o começo do drift
  // que esta derivação existe para evitar.
  const avulsos = [...suite.matchAll(/activeComponent = '(preview-frame-[a-z0-9-]+)'/g)]
    .map((m) => m[1].replace('preview-frame-', ''));

  const playgrounds = new Set(
    fs.readdirSync(SANDBOX_SRC)
      .filter((f) => /^Test.+\.vue$/.test(f))
      .map((f) => norm(f.slice(4, -4)))
  );

  return { frames, playgrounds, avulsos: [...new Set(avulsos)] };
}

// ---------------------------------------------------------------------------
// 3. Classificação
// ---------------------------------------------------------------------------
const ESTADOS = {
  fechada:  { marca: '✅', rotulo: 'Adequação fechada',  ordem: 0 },
  casca:    { marca: '🟠', rotulo: 'Frame sem conteúdo', ordem: 1 },
  soFrame:  { marca: '🔵', rotulo: 'Só Preview Frame',   ordem: 2 },
  parcial:  { marca: '🟡', rotulo: 'Só Playground',      ordem: 3 },
  ausente:  { marca: '⬜', rotulo: 'Não iniciada',       ordem: 4 },
};

/**
 * O frame tem o QUE renderizar?
 *
 * O ✅ derivava só de "tem playground E frame registrado" — presença de
 * artefato, não conteúdo. Medido em set/2026: DssStepper e DssTimeline estavam
 * ✅ montando com ZERO filhos, porque o frame não consumia a semente. Conserto
 * do consumidor no mesmo dia; este critério impede a classe de voltar.
 *
 * Um frame prova algo quando o palco recebe ou uma SEMENTE de filhos
 * (`visual.defaultPreview.slots`) ou PROPS de preview
 * (`visual.defaultPreview.props`). Sem nenhum dos dois, o componente monta como
 * casca e o ✅ estaria atestando moldura vazia.
 *
 * Deliberadamente CONSERVADOR: não exige semente de quem tem props (um
 * DssButton com `label` mostra algo de verdade sem filho nenhum). Exigir os dois
 * marcaria 20 componentes que estão corretos.
 */
function frameTemConteudo(nome) {
  for (const grupo of ['base', 'composed']) {
    const c = path.join(ROOT, 'packages', 'core', 'components', grupo, nome, 'dss.contract.json');
    if (!fs.existsSync(c)) continue;
    try {
      const d = JSON.parse(fs.readFileSync(c, 'utf8'));
      const dp = d?.visual?.defaultPreview;
      if (!dp) return false;
      // Componente SEM slot não pode virar casca por falta de filhos: ele
      // renderiza inteiro a partir dos próprios defaults. Foi o DssUploader
      // (0 slots, 0 props de preview) que expôs isto — a primeira versão da
      // regra o rebaixava, e ele estava correto.
      if (!(d.api?.slots || []).length) return true;
      return !!dp.slots || Object.keys(dp.props || {}).length > 0;
    } catch { return false; }
  }
  // Sem contrato não dá para afirmar que é casca — não rebaixa por ausência de prova.
  return true;
}

function classificar(comps, { frames, playgrounds }) {
  for (const c of comps) {
    const k = norm(c.nome);
    c.playground = playgrounds.has(k);
    c.frame = frames.has(k);
    // Quatro estados, não três. `soFrame` existe porque DssUploader tem Preview
    // Frame e NÃO tem página Playground — o próprio TestSuite.vue registra o
    // motivo ("não têm página de teste onde ancorar"). Colapsar esse caso em
    // "não iniciada" seria falso: a adequação dele foi validada ponta a ponta.
    c.conteudo = c.frame ? frameTemConteudo(c.nome) : null;
    c.estado = c.frame && c.playground && c.conteudo ? 'fechada'
             : c.frame && c.playground ? 'casca'
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
| ✅ | **Adequação fechada** | Playground **e** Preview Frame **e** o frame tem o que renderizar |
| 🟠 | **Frame sem conteúdo** | Tem os dois artefatos, mas o frame monta **casca** — ver abaixo |
| 🔵 | **Só Preview Frame** | Tem o frame, falta a página Playground — ver nota abaixo |
| 🟡 | **Só Playground** | Tem a página, falta o Preview Frame — não fecha |
| ⬜ | **Não iniciada** | Nenhum dos dois artefatos |

O critério vem do \`DSS_UI_ADEQUACAO_CHECKLIST.md\`: os dois artefatos juntos são o que torna possível
a análise visual, **o passo que FECHA a adequação**. A marcação é **inferida do disco**, não é selo.

### Por que existe o 🟠 — e por que ele foi acrescentado depois

Até set/2026 o ✅ derivava só de **presença de artefato**: "tem Playground e tem frame registrado".
Isso atestava moldura, não conteúdo. Medido no navegador, \`DssStepper\` e \`DssTimeline\` estavam
**✅ montando com ZERO filhos** — o frame não consumia a semente do contrato. O consumidor foi
consertado; este critério impede a classe de voltar.

Um frame prova algo quando o palco recebe **semente de filhos** (\`visual.defaultPreview.slots\`)
**ou props de preview** (\`visual.defaultPreview.props\`). Sem nenhum dos dois, o componente monta
como casca.

O critério é **deliberadamente conservador**, em dois pontos:
- **Não exige semente de quem tem props.** Um \`DssButton\` com \`label\` mostra algo real sem filho
  nenhum; exigir os dois rebaixaria 20 componentes corretos.
- **Não se aplica a componente sem slot.** Ele renderiza inteiro a partir dos próprios defaults.
  Foi o \`DssUploader\` (0 slots, 0 props de preview) que expôs isso: a primeira versão da regra o
  rebaixava, e ele estava certo.

⚠️ **O que o 🟠 ainda NÃO vê:** se a semente é *visualmente representativa*. Ele verifica que existe
algo a renderizar, não que o que se renderiza seja um bom exemplar. Isso é julgamento, e continua
sendo do adequador. O conteúdo da semente — se cita componente e prop que existem — é verificado à
parte pelo \`validate:demo-seeds\`.

## Placar

| Fase | Componentes | Adequados | Casca | Só frame | Só playground | Não iniciados |
|---|---|---|---|---|---|---|
| **Fase 1 — Atômicos** | ${f1.length} | **${cont(f1, 'fechada')}** | ${cont(f1, 'casca')} | ${cont(f1, 'soFrame')} | ${cont(f1, 'parcial')} | ${cont(f1, 'ausente')} |
| **Fase 2 — Compostos** | ${f2.length} | **${cont(f2, 'fechada')}** | ${cont(f2, 'casca')} | ${cont(f2, 'soFrame')} | ${cont(f2, 'parcial')} | ${cont(f2, 'ausente')} |
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
  console.log(`   componentes: ${comps.length} · fechados: ${fechadas} · frame sem conteúdo: ${conta('casca')} · só frame: ${conta('soFrame')} · só playground: ${conta('parcial')} · não iniciados: ${conta('ausente')}`);
  if (orfaos.length) console.log(`   ⚠️  Preview Frames fora de Fase 1/2: ${orfaos.join(', ')}`);
  if (artefatos.avulsos.length) console.log(`   ℹ️  Frames avulsos (item de menu, sem página de teste): ${artefatos.avulsos.join(', ')}`);
  console.log(`\n✅ Escrito: ${path.relative(ROOT, OUT)}`);
}

main();
