#!/usr/bin/env node
/**
 * ==========================================================================
 * validate-dss-props — atributo passado a componente DSS precisa EXISTIR
 * ==========================================================================
 *
 * POR QUE ESTE GATE EXISTE
 * ------------------------
 * Em set/2026 a mesma falha apareceu QUATRO vezes, em componentes diferentes,
 * sempre silenciosa:
 *
 *   <DssButton flat …>        → `flat` não é prop do DssButton (é `variant="flat"`).
 *                               O botão saía ELEVADO e em bg-primary; 67 ocorrências.
 *   <QTabs :ripple="false">   → QTabs não tem `ripple`. Vazava para o DOM.
 *   <DssTimelineEntry #icon>  → QTimelineEntry não tem slot `icon`. O conteúdo sumia.
 *   <DssTimeline dark>        → prop existia, mas era estruturalmente inerte.
 *
 * O padrão é sempre o mesmo: quem escreve usa o vocabulário do QUASAR, o Vue não
 * reclama de atributo desconhecido, o valor cai em `$attrs`, e o componente
 * renderiza — só que com o comportamento padrão. Nada falha, nada avisa.
 *
 * COMO ELE DECIDE
 * ---------------
 * Fonte de verdade: `dss.contract.json` de cada componente (mesmo `api.props`
 * que o `validate:api-docs` usa, já derivado dos `types/*.types.ts`).
 *
 * Um atributo é ACEITO quando é uma destas coisas:
 *   · prop declarada do componente (kebab ou camel);
 *   · emit declarado, via `@nome`;
 *   · evento DOM nativo (o wrapper repassa por `$attrs`);
 *   · slot declarado, via `#nome` / `v-slot:nome`;
 *   · diretiva do Vue (`v-if`, `v-for`, `:key`, `ref`, …);
 *   · atributo HTML global ou de acessibilidade (`class`, `id`, `aria-*`, `data-*`, …).
 *
 * O resto é reportado. Não é "erro de sintaxe": é atributo que o consumidor
 * ACHA que está usando e que o componente não lê.
 *
 * BASELINE
 * --------
 * O repositório tem dívida conhecida (as 49 ocorrências de `flat`/`outline`/
 * `unelevated` que sobraram do levantamento). Elas ficam em
 * `scripts/dss-props-baseline.json` para o gate reprovar apenas o que for NOVO —
 * mesmo padrão dos gates de token e de estado. Ao corrigir um arquivo, rode com
 * `--update-baseline` para a dívida encolher.
 *
 * USO
 *   node scripts/validate-dss-props.cjs               # relatório
 *   node scripts/validate-dss-props.cjs --gate        # exit 1 se houver caso NOVO
 *   node scripts/validate-dss-props.cjs --update-baseline
 * ==========================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASELINE = path.join(__dirname, 'dss-props-baseline.json');

const argv = process.argv.slice(2);
const GATE = argv.includes('--gate');
const UPDATE = argv.includes('--update-baseline');

// ---------------------------------------------------------------------------
// Vocabulário sempre aceito
// ---------------------------------------------------------------------------

// Diretivas e atributos especiais do Vue.
const VUE_ESPECIAIS = new Set([
  'v-if', 'v-else', 'v-else-if', 'v-for', 'v-show', 'v-once', 'v-memo',
  'v-pre', 'v-cloak', 'v-html', 'v-text', 'v-bind', 'v-on', 'v-slot',
  'key', 'ref', 'is', 'slot', 'slot-scope',
]);

// Atributos HTML globais / ARIA que qualquer host repassa por `$attrs`.
const HTML_GLOBAIS = new Set([
  'class', 'style', 'id', 'title', 'role', 'tabindex', 'lang', 'dir',
  'hidden', 'draggable', 'contenteditable', 'spellcheck', 'translate',
  'autofocus', 'accesskey', 'inert', 'part', 'exportparts', 'itemprop',
  // formulário / âncora — repasse legítimo ao elemento nativo
  'href', 'target', 'rel', 'download', 'type', 'name', 'value', 'form',
  'placeholder', 'maxlength', 'minlength', 'min', 'max', 'step', 'pattern',
  'autocomplete', 'inputmode', 'enterkeyhint', 'readonly', 'required',
  'multiple', 'accept', 'alt', 'src', 'width', 'height', 'loading',
]);

// Eventos DOM nativos — o wrapper repassa por `$attrs`, então `@click` num
// componente que não declara `click` é legítimo.
const EVENTOS_NATIVOS = new Set([
  'click', 'dblclick', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave',
  'mouseover', 'mouseout', 'mousemove', 'contextmenu',
  'focus', 'blur', 'focusin', 'focusout',
  'keydown', 'keyup', 'keypress',
  'input', 'change', 'submit', 'reset', 'invalid',
  'touchstart', 'touchend', 'touchmove', 'touchcancel',
  'pointerdown', 'pointerup', 'pointerenter', 'pointerleave',
  'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
  'scroll', 'wheel', 'copy', 'cut', 'paste',
  'animationend', 'transitionend', 'load', 'error',
]);

const kebab = s => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// ---------------------------------------------------------------------------
// Contratos — a API declarada de cada componente
// ---------------------------------------------------------------------------

function carregarContratos() {
  const api = new Map();
  for (const grupo of ['base', 'composed', 'stress-test']) {
    const dir = path.join(ROOT, 'packages/core/components', grupo);
    let comps;
    try { comps = fs.readdirSync(dir); } catch { continue; }
    for (const nome of comps) {
      const arq = path.join(dir, nome, 'dss.contract.json');
      if (!fs.existsSync(arq)) continue;
      let c;
      try { c = JSON.parse(fs.readFileSync(arq, 'utf8')); } catch { continue; }
      const a = c.api || {};
      const props = new Set();
      for (const p of a.props || []) { props.add(p.name); props.add(kebab(p.name)); }
      const emits = new Set();
      for (const e of a.emits || []) { emits.add(e.name); emits.add(kebab(e.name)); }
      const slots = new Set();
      for (const s of a.slots || []) { slots.add(s.name); slots.add(kebab(s.name)); }
      api.set(nome, { props, emits, slots });
    }
  }
  return api;
}

// ---------------------------------------------------------------------------
// Varredura de templates
// ---------------------------------------------------------------------------

function walk(dir, acc = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules' && e.name !== 'dist') walk(full, acc); }
    else if (e.name.endsWith('.vue')) acc.push(full);
  }
  return acc;
}

function templateBlock(src) {
  const open = src.search(/<template(\s[^>]*)?>/);
  if (open === -1) return '';
  const start = src.indexOf('>', open) + 1;
  const end = src.lastIndexOf('</template>');
  return end > start ? src.slice(start, end) : src.slice(start);
}

/** Extrai os nomes de atributo de uma abertura de tag, ignorando valores. */
function atributosDaTag(abertura) {
  const corpo = abertura.replace(/^<[A-Za-z][\w.-]*/, '').replace(/\/?>$/, '');
  const nomes = [];
  // nome seguido opcionalmente de ="…" | ='…' | =valor
  const re = /(^|\s)([@#:]?[A-Za-z_][\w.:-]*)(\s*=\s*("[^"]*"|'[^']*'|[^\s>]+))?/g;
  let m;
  while ((m = re.exec(corpo)) !== null) nomes.push(m[2]);
  return nomes;
}

function classificar(attr, contrato) {
  // modificadores (`@click.stop`, `:prop.sync`) — só o nome base importa
  const base = attr.split('.')[0];

  if (base.startsWith('#')) {
    const nome = base.slice(1) || 'default';
    return contrato.slots.has(nome) || nome === 'default' ? null : { tipo: 'slot', nome };
  }
  if (base.startsWith('v-slot:')) {
    const nome = base.slice('v-slot:'.length) || 'default';
    return contrato.slots.has(nome) || nome === 'default' ? null : { tipo: 'slot', nome };
  }
  if (base === 'v-slot') return null;

  if (base.startsWith('@') || base.startsWith('v-on:')) {
    const nome = base.startsWith('@') ? base.slice(1) : base.slice('v-on:'.length);
    if (!nome) return null;
    if (contrato.emits.has(nome) || contrato.emits.has(kebab(nome))) return null;
    if (EVENTOS_NATIVOS.has(kebab(nome))) return null;
    if (nome.startsWith('update:')) {
      const alvo = nome.slice('update:'.length);
      return contrato.props.has(alvo) || contrato.props.has(kebab(alvo)) ? null : { tipo: 'emit', nome };
    }
    return { tipo: 'emit', nome };
  }

  if (base === 'v-model') {
    return contrato.props.has('modelValue') || contrato.props.has('model-value')
      ? null : { tipo: 'prop', nome: 'modelValue (v-model)' };
  }
  if (base.startsWith('v-model:')) {
    const nome = base.slice('v-model:'.length);
    return contrato.props.has(nome) || contrato.props.has(kebab(nome)) ? null : { tipo: 'prop', nome };
  }

  if (VUE_ESPECIAIS.has(base)) return null;
  if (base.startsWith('v-')) return null; // diretiva custom — fora do escopo

  const nome = base.startsWith(':') ? base.slice(1) : base;
  if (!nome) return null;
  if (VUE_ESPECIAIS.has(nome)) return null;
  if (HTML_GLOBAIS.has(nome)) return null;
  if (nome.startsWith('aria-') || nome.startsWith('data-')) return null;
  if (contrato.props.has(nome) || contrato.props.has(kebab(nome))) return null;

  return { tipo: 'prop', nome };
}

// ---------------------------------------------------------------------------
// Execução
// ---------------------------------------------------------------------------

const api = carregarContratos();
const arquivos = [
  ...walk(path.join(ROOT, 'packages/core/components')),
  ...walk(path.join(ROOT, 'apps/sandbox/src')),
];

const achados = [];
let tagsLidas = 0;

for (const f of arquivos) {
  const src = fs.readFileSync(f, 'utf8');
  const tpl = templateBlock(src);
  if (!tpl) continue;
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');

  const re = /<(Dss[A-Za-z0-9]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)\/?>/g;
  let m;
  while ((m = re.exec(tpl)) !== null) {
    const comp = m[1];
    const contrato = api.get(comp);
    if (!contrato) continue; // sem contrato emitido — fora do alcance deste gate
    tagsLidas++;
    for (const attr of atributosDaTag(m[0])) {
      const problema = classificar(attr, contrato);
      if (problema) achados.push({ file: rel, comp, ...problema });
    }
  }
}

const chave = a => `${a.file}|${a.comp}|${a.tipo}|${a.nome}`;
const atuais = achados.map(chave);

let baseline = [];
if (fs.existsSync(BASELINE)) {
  try { baseline = JSON.parse(fs.readFileSync(BASELINE, 'utf8')).conhecidos || []; } catch { baseline = []; }
}
const conhecidos = new Set(baseline);
const novos = achados.filter(a => !conhecidos.has(chave(a)));

if (UPDATE) {
  fs.writeFileSync(BASELINE, JSON.stringify({
    nota: 'Dívida conhecida de atributo não declarado. Encolha ao corrigir; nunca cresça sem motivo.',
    atualizado: new Date().toISOString().slice(0, 10),
    conhecidos: [...new Set(atuais)].sort(),
  }, null, 2) + '\n');
  console.log(`✅ Baseline atualizado: ${new Set(atuais).size} ocorrência(s) conhecida(s).`);
  process.exit(0);
}

console.log('🔎 Atributos em componentes DSS — precisam existir na API declarada');
console.log(`   contratos: ${api.size} · tags <Dss*> lidas: ${tagsLidas}`);
if (conhecidos.size) console.log(`   ⚠️  dívida conhecida (baseline): ${conhecidos.size} ocorrência(s)`);

if (!novos.length) {
  console.log('\n✅ Nenhum atributo NOVO fora da API declarada.');
  process.exit(0);
}

const porArquivo = new Map();
for (const a of novos) {
  if (!porArquivo.has(a.file)) porArquivo.set(a.file, []);
  porArquivo.get(a.file).push(a);
}

console.log(`\n❌ ${novos.length} atributo(s) NOVO(s) que o componente NÃO lê:\n`);
for (const [file, lista] of porArquivo) {
  console.log(`  ${file}`);
  for (const a of lista) console.log(`    <${a.comp}> ${a.tipo}: ${a.nome}`);
}
console.log('\n  O atributo NÃO está na API declarada. Dois desfechos, ambos problema:');
console.log('   · o componente ignora e renderiza o padrão — foi o caso de `flat` no');
console.log('     DssButton, que saía ELEVADO (o certo é `variant="flat"`);');
console.log('   · ou funciona por `$attrs` chegando ao Quasar, mas fora da API — como');
console.log('     `rules` no DssInput. Funciona por acidente, e o que não aparece na API');
console.log('     não é escolhido por quem lê a documentação.');
console.log('  Em ambos: exponha a prop no `types/*.types.ts` ou use o nome que o DSS define.');
console.log('  Se for dívida legada aceita, rode --update-baseline conscientemente.\n');

process.exit(GATE ? 1 : 0);
