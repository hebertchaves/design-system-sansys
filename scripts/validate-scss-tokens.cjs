#!/usr/bin/env node
/**
 * validate-scss-tokens.cjs — Todo `var(--dss-*)` no SCSS do core existe.
 *
 * CONTEXTO (jul/2026). O `sync-css-to-meta --validate` checa os tokens do
 * dss.meta.json contra o catálogo, mas NÃO os `var(--dss-*)` escritos direto no
 * SCSS. Por isso um token INEXISTENTE (ex.: `--dss-error-600`, que nunca foi
 * definido — só `--dss-feedback-error*` existe) passava batido: o CSS resolve
 * para vazio e o estado (erro/anel) some silenciosamente. Bug real em
 * DssField/DssRadio/DssToggle (~23 usos). Ver [[undefined-error-scale]].
 *
 * Regra: todo `var(--dss-x)` referenciado no SCSS de `components/`, `themes/`
 * ou `tokens/` DEVE ter uma
 * definição `--dss-x:` em algum lugar de packages/core (tokens, themes ou o
 * próprio componente). Referência sem definição = token fantasma → FALHA.
 *
 * Uso:
 *   node scripts/validate-scss-tokens.cjs          # relatório
 *   node scripts/validate-scss-tokens.cjs --gate   # exit 1 se houver fantasma
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CORE = path.join(ROOT, 'packages', 'core');
const COMPONENTS = path.join(CORE, 'components');
const GATE = process.argv.slice(2).includes('--gate');

// ESCOPOS VARRIDOS (ago/2026: eram só os componentes).
// O catálogo de DEFINIÇÕES sempre varreu todo o packages/core, mas a leitura de
// REFERÊNCIAS parava em components/ — então `themes/` e `tokens/` eram ponto
// cego, e o baseline vazio ("qualquer fantasma bloqueia") cobria menos do que o
// nome sugeria. Descoberto via `--dss-brand-primary-hover`: consumido em 9
// lugares de themes/, nunca definido, nem no dist. Ver DEBITO_ABERTO.md.
//
// `tokens/` entra porque um token cujo VALOR é `var(--outro-inexistente)` falha
// do mesmo jeito — a cadeia de tokens é código, não é declaração inerte.
// `utils/` entrou logo depois (mesma onda): o mixin `dss-touch-target` mora la e
// seus TRES ramos ('min'/'ideal'/'large') apontam para tokens que nao existem —
// so a escala `-{xs..xl}` existe. Mixin quebrado nao aparece em lugar nenhum ate
// alguem usa-lo; e exatamente o que um gate deve pegar antes.
const SCOPES = [
  { root: COMPONENTS, name: 'components' },
  { root: path.join(CORE, 'themes'), name: 'themes' },
  { root: path.join(CORE, 'tokens'), name: 'tokens' },
  { root: path.join(CORE, 'utils'), name: 'utils' },
];

function walkScss(dir, acc = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== 'dist') walkScss(full, acc);
    } else if (e.name.endsWith('.scss')) acc.push(full);
  }
  return acc;
}

// Remove comentários (// linha e /* bloco */) p/ não contar token em comentário.
function stripComments(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

// Escopos CONDICIONAIS: o token só existe se o contexto estiver ativo. Um token
// definido APENAS aqui não resolve no default — usá-lo fora do contexto é o mesmo
// modo de falha do token fantasma, mas invisível para a checagem de existência.
// (Classe de componente NÃO entra: `.dss-timeline { --dss-timeline-*: … }` é
// autocontido por convenção — define e consome no mesmo escopo.)
const RE_CONDICIONAL = /\[data-theme|\[data-brand|@media|@container|@supports|prefers-|forced-colors/;

// Percorre o arquivo mantendo a PILHA de seletores/at-rules, para saber sob que
// escopo cada `--dss-x:` foi declarado. Regex simples não serve: precisa de
// profundidade de chaves.
function definicoesComEscopo(src) {
  const out = [];           // { token, escopo }
  const pilha = [];
  let i = 0, inicioBloco = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '{') {
      pilha.push(src.slice(inicioBloco, i).trim().split('\n').pop().trim());
      inicioBloco = i + 1;
    } else if (c === '}') {
      pilha.pop();
      inicioBloco = i + 1;
    } else if (c === ';' || c === '\n') {
      const trecho = src.slice(inicioBloco, i);
      const m = /(--dss-[a-z0-9-]+)\s*:/.exec(trecho);
      if (m) out.push({ token: m[1], escopo: pilha.join(' ') });
      inicioBloco = i + 1;
    }
    i++;
  }
  return out;
}

// 1. Catálogo: toda definição `--dss-x:` em QUALQUER .scss de packages/core.
//    `defined` = existe em algum lugar (checagem original).
//    `temEscopoIncondicional` = existe FORA de tema/marca/media — só assim o
//    token resolve no contexto default.
const defined = new Set();
const temEscopoIncondicional = new Set();
const escoposDe = new Map(); // token -> Set(escopos condicionais onde vive)
for (const f of walkScss(CORE)) {
  for (const { token, escopo } of definicoesComEscopo(stripComments(fs.readFileSync(f, 'utf8')))) {
    if (RE_CONDICIONAL.test(escopo)) {
      if (!escoposDe.has(token)) escoposDe.set(token, new Set());
      escoposDe.get(token).add(escopo.slice(-48));
    } else {
      temEscopoIncondicional.add(token);
    }
  }
}
for (const f of walkScss(CORE)) {
  const src = stripComments(fs.readFileSync(f, 'utf8'));
  let m;
  const reDef = /(--dss-[a-z0-9-]+)\s*:/g;
  while ((m = reDef.exec(src))) defined.add(m[1]);
}

// Fixtures/páginas de teste — fora do escopo de produção (decisão de governança).
const FIXTURES = new Set(['DssTestPageComplexity', 'DssCadrisCard', 'DssDataCard']);

// 2. Referências `var(--dss-x)` no SCSS dos escopos acima.
const ghosts = new Map();      // token -> [ "escopo · arquivo:linha", ... ]
// Referenciado, existe — mas SÓ dentro de tema/marca/media. No contexto default
// não resolve. Mesmo efeito do fantasma, e a checagem de existência não via.
const condicionais = new Map();
const ghostScopes = new Map(); // token -> Set(nome do escopo) — p/ o relatório
for (const { root: scopeRoot, name: scopeName } of SCOPES)
for (const f of walkScss(scopeRoot)) {
  const rel = path.relative(scopeRoot, f).replace(/\\/g, '/');
  // Em components/ o rótulo útil é o NOME do componente; nos demais escopos é o
  // caminho relativo, que já é curto.
  const comp = scopeName === 'components' ? (rel.split('/')[1] || rel) : rel;
  if (scopeName === 'components' && FIXTURES.has(comp)) continue;
  // Rótulo do local: em components/ `Comp/arquivo`; nos demais, `escopo/caminho`
  // (o `rel` já traz o arquivo, então não se repete o basename).
  const where = scopeName === 'components'
    ? `${comp}/${path.basename(f)}`
    : `${scopeName}/${rel}`;
  const noteCondicional = (tok, linha) => {
    if (!condicionais.has(tok)) condicionais.set(tok, []);
    condicionais.get(tok).push(`${where}:${linha}`);
  };
  const noteGhost = (tok, linha, sufixo = '') => {
    if (!ghosts.has(tok)) { ghosts.set(tok, []); ghostScopes.set(tok, new Set()); }
    ghosts.get(tok).push(`${where}:${linha}${sufixo}`);
    ghostScopes.get(tok).add(scopeName);
  };
  // Tira comentários de BLOCO no arquivo inteiro (preservando o nº de linha), pois
  // um /* */ multi-linha não era pego pelo strip per-linha → falso-positivo (ex.:
  // --dss-input-height-min citado num doc-comment do DssTextarea).
  const raw = fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (s) => s.replace(/[^\n]/g, ' '));
  const lines = raw.split('\n');
  lines.forEach((line, i) => {
    const code = line.replace(/\/\/[^\n]*/g, ''); // comentários de linha
    let m;
    const reRef = /var\(\s*(--dss-[a-z0-9-]+)/g;
    while ((m = reRef.exec(code))) {
      // `var(--dss-X-#{...})`: o char após o token é `#` → prefixo de INTERPOLAÇÃO
      // (resolve p/ tokens dinâmicos existentes, ex.: --dss-spacing-#{$size}), não
      // é fantasma. (A interpolação de MARCA é checada no loop abaixo.)
      if (code[m.index + m[0].length] === '#') continue;
      const tok = m[1];
      if (!defined.has(tok)) noteGhost(tok, i + 1);
      else if (!temEscopoIncondicional.has(tok)) noteCondicional(tok, i + 1);
    }
    // Interpolação de MARCA: `var(--dss-#{$brand}-<suffix>)` (mixins). O regex
    // literal acima não enxerga através do `#{...}` — foi assim que os ghosts
    // --dss-{hub,water,waste}-primary escaparam (Checkbox/Chip/Radio/Toggle). Aqui
    // resolvemos p/ as 3 marcas e checamos cada uma no catálogo.
    const reInterp = /var\(\s*--dss-#\{[^}]+\}-([a-z0-9-]+)/g;
    while ((m = reInterp.exec(code))) {
      for (const brand of ['hub', 'water', 'waste']) {
        const tok = `--dss-${brand}-${m[1]}`;
        if (!defined.has(tok)) noteGhost(tok, i + 1, ' (interpolado #{$brand})');
      }
    }
  });
}

// Baseline (ratchet) POR ESCOPO. Guardar só o NOME do token faria com que
// perdoar um fantasma em `themes/` o perdoasse também em `components/` — o
// baseline de componente é vazio desde b49b6e0 e essa garantia não pode ser
// diluída por causa da extensão de escopo. Por isso a lista é por escopo.
// Formato legado (array plano) segue aceito e vale para TODOS os escopos.
const BASELINE_PATH = path.join(__dirname, 'scss-token-ghost-baseline.json');
const UPDATE = process.argv.slice(2).includes('--update-baseline');
const ghostNames = [...ghosts.keys()].sort();

// Pares reais (token, escopo) encontrados agora.
const pares = [];
for (const [tok, escopos] of ghostScopes) for (const s of escopos) pares.push([tok, s]);
pares.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));

const porEscopo = {};
for (const [tok, s] of pares) (porEscopo[s] ||= []).push(tok);
// Eixo separado: não é "token inexistente", é "existe só em contexto".
porEscopo.condicional = [...condicionais.keys()].sort();

if (UPDATE) {
  fs.writeFileSync(BASELINE_PATH, JSON.stringify({
    note: 'Tokens --dss-* referenciados mas NAO definidos (debito), POR ESCOPO. O gate bloqueia NOVOS fora desta lista. Zerar aos poucos e remover daqui.',
    byScope: porEscopo,
  }, null, 2) + '\n');
  const n = pares.length;
  console.log(`✅ Baseline atualizado: ${n} par(es) token×escopo conhecido(s).`);
  for (const [s, lista] of Object.entries(porEscopo)) console.log(`   ${s}: ${lista.length}`);
  process.exit(0);
}

let baseRaw = {};
try { baseRaw = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8')); } catch { /* sem baseline */ }
const legado = Array.isArray(baseRaw.tokens) ? baseRaw.tokens : [];
const byScope = baseRaw.byScope || {};
const conhecido = (tok, escopo) =>
  legado.includes(tok) || (byScope[escopo] || []).includes(tok);

const novos = pares.filter(([tok, s]) => !conhecido(tok, s));
const newGhosts = [...new Set(novos.map(([tok]) => tok))].sort();
const knownGhosts = ghostNames.filter((t) => !newGhosts.includes(t));
// Entradas do baseline que ninguem mais referencia → limpar.
const staleBaseline = [];
for (const [s, lista] of Object.entries(byScope)) {
  // `condicional` é outro eixo: não vive em `ghostScopes` (que indexa fantasmas
  // por diretório). Sem esta guarda, as entradas dele eram reportadas como já
  // corrigidas em toda execução — ruído que treina a ignorar o aviso.
  if (s === 'condicional') continue;
  for (const tok of lista) if (!(ghostScopes.get(tok) || new Set()).has(s)) staleBaseline.push(`${s}/${tok}`);
}
for (const tok of byScope.condicional || [])
  if (!condicionais.has(tok)) staleBaseline.push(`condicional/${tok}`);
for (const tok of legado) if (!ghosts.has(tok)) staleBaseline.push(tok);
const totalRefs = [...ghosts.values()].reduce((a, v) => a + v.length, 0);

console.log(`🔎 Tokens SCSS — todo var(--dss-*) deve existir (${defined.size} definidos)\n`);

if (knownGhosts.length) {
  console.log(`⚠️  Débito conhecido (baseline): ${knownGhosts.length} token(s) fantasma em ${totalRefs} ref(s) — a zerar.`);
}
if (staleBaseline.length) {
  console.log(`ℹ️  ${staleBaseline.length} entrada(s) do baseline já corrigida(s) — rode --update-baseline p/ limpar: ${staleBaseline.join(', ')}`);
}

// ── Tokens que só existem em escopo CONDICIONAL ──────────────────────────────
// Ratchet próprio: `condicional` no baseline, para o débito atual não travar o
// commit e o NOVO ser bloqueado.
const baseCond = new Set(baseRaw.byScope?.condicional || []);
const condNomes = [...condicionais.keys()].sort();
const condNovos = condNomes.filter((t2) => !baseCond.has(t2));
if (condNomes.length) {
  const conhecidos = condNomes.length - condNovos.length;
  console.log(`\n🔎 Definidos APENAS em escopo condicional (tema/marca/media): ${condNomes.length}` +
              (conhecidos ? ` — ${conhecidos} no baseline` : ''));
  console.log('   No contexto default estes NÃO resolvem: `var()` cai para vazio, como fantasma.');
  for (const tok of condNovos) {
    console.log(`\n  ❌ ${tok}  (${condicionais.get(tok).length}× referenciado)`);
    console.log(`     vive só em: ${[...(escoposDe.get(tok) || [])].join(' · ')}`);
    for (const u of condicionais.get(tok).slice(0, 5)) console.log(`     ↳ ${u}`);
  }
}

if (!newGhosts.length && !condNovos.length) {
  console.log('\n✅ Nenhum token fantasma NOVO, nem condicional-only NOVO.');
  process.exit(0);
}
if (!newGhosts.length) {
  console.log(`\n❌ ${condNovos.length} token(s) condicional-only NOVO(S).`);
  process.exit(GATE ? 1 : 0);
}

console.log(`\n❌ ${newGhosts.length} token(s) fantasma NOVO(S) (fora do baseline):\n`);
for (const tok of newGhosts) {
  const uses = ghosts.get(tok);
  const esc = novos.filter(([t2]) => t2 === tok).map(([, s]) => s).join('+');
  console.log(`  ${tok}  (${uses.length}× · ${esc})`);
  for (const u of uses.slice(0, 8)) console.log(`     ↳ ${u}`);
  if (uses.length > 8) console.log(`     ↳ … +${uses.length - 8}`);
}
console.log('\n  Corrija p/ um token existente (ex.: --dss-error-* → --dss-feedback-error*),');
console.log('  ou (se for débito legado aceito) rode --update-baseline conscientemente.');
process.exit(GATE ? 1 : 0);
