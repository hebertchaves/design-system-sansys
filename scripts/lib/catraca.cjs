'use strict';
/**
 * CATRACA DE BASELINE — a lista de débito só pode ENCOLHER.
 *
 * Os gates com baseline (tokens fantasma, forma de marca, props, hover…) travam
 * o caso NOVO fora da lista, mas a lista em si é um arquivo editável: um
 * `--update-baseline` rodado no momento errado, ou uma linha acrescentada à mão,
 * absorve o caso novo e o gate passa. A catraca que avisava "item já corrigido,
 * rode --update-baseline" só garantia metade — a que encolhe.
 *
 * Aqui a referência é a versão COMMITADA do baseline (HEAD), não o arquivo do
 * disco. Duas regras:
 *
 *   1. CRESCEU — chave no baseline do disco que não existe no HEAD reprova.
 *      Acrescentar débito passa a exigir um commit que só faz isso, visível
 *      no diff e na revisão — não uma linha escondida num commit de feature.
 *      Para isso existe `permitirCrescer` (ex.: flag --aceitar-debito).
 *   2. SOBROU — chave no baseline que o gate não encontra mais pendente reprova
 *      com "remova a linha". Sem isso a lista fica com entradas mortas, e uma
 *      entrada morta é vaga reservada: o caso volta e encontra o lugar guardado.
 *
 * Sem baseline no HEAD (arquivo novo, ainda não commitado) só a regra 2 vale.
 */
const { execFileSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

function baselineNoHead(relPath) {
  try {
    const txt = execFileSync('git', ['show', `HEAD:${relPath}`], {
      cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    });
    return JSON.parse(txt);
  } catch {
    return null;
  }
}

/**
 * @param {object} o
 * @param {string} o.gate            nome do gate, para a mensagem
 * @param {string} o.baselineRel     caminho do baseline relativo à raiz do repo
 * @param {string[]} o.noDisco       chaves do baseline como está no disco
 * @param {(json: object) => string[]} o.chavesDe  extrai as chaves de um JSON de baseline
 * @param {Iterable<string>} o.aindaPendentes  chaves que o gate de fato achou pendentes
 * @param {boolean} [o.permitirCrescer]
 * @returns {{ cresceu: string[], sobrou: string[], falhou: boolean }}
 */
function catraca({ gate, baselineRel, noDisco, chavesDe, aindaPendentes, permitirCrescer = false }) {
  const pendentes = new Set(aindaPendentes);
  const head = baselineNoHead(baselineRel);
  const doHead = head ? new Set(chavesDe(head)) : null;

  const cresceu = doHead && !permitirCrescer ? noDisco.filter((k) => !doHead.has(k)) : [];
  const sobrou = noDisco.filter((k) => !pendentes.has(k));

  if (cresceu.length) {
    console.log(`\n❌ ${gate}: o baseline CRESCEU em relação ao commitado (${cresceu.length}):`);
    for (const k of cresceu) console.log(`   + ${k}`);
    console.log('   Débito novo não entra pela porta dos fundos. Ancore o caso; ou, se for');
    console.log('   débito aceito de propósito, faça um commit só disso e rode com --aceitar-debito.');
  }
  if (sobrou.length) {
    // TUDO sumiu de uma vez: o mais provável é o DETECTOR ter cegado, não o
    // débito inteiro ter sido zerado num commit. Medido em out/2026: cegando o B2
    // do validate-brand-form, a sentinela não acusou e a catraca mandou "remova a
    // linha" para as 19 entradas — quem obedecesse com --update-baseline apagaria
    // o débito real, e o detector cego passaria a aprovar para sempre. A regra
    // não muda (reprova); muda o conselho.
    const tudo = sobrou.length === noDisco.length && noDisco.length > 1;
    if (tudo) {
      console.log(`\n❌ ${gate}: TODAS as ${sobrou.length} entradas do baseline sumiram de uma vez.`);
      console.log('   Isso quase nunca é débito zerado — é o sinal clássico de DETECTOR CEGO.');
      console.log('   NÃO rode --update-baseline. Confira primeiro se o gate ainda enxerga um caso');
      console.log('   conhecido; só remova as linhas se o débito foi mesmo corrigido.');
    } else {
      console.log(`\n❌ ${gate}: ${sobrou.length} entrada(s) do baseline já resolvida(s) — remova a linha:`);
    }
    for (const k of sobrou) console.log(`   - ${k}`);
    console.log(`   Arquivo: ${baselineRel}`);
  }
  return { cresceu, sobrou, falhou: cresceu.length > 0 || sobrou.length > 0 };
}

module.exports = { catraca, baselineNoHead };
