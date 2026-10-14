'use strict';
/**
 * SENTINELA DE GATE — "piso é chute, sentinela é verificação".
 *
 * Um gate que extrai o que mede (regex, parser, varredura de pasta) tem uma
 * falha que nenhum caso de teste do repo pega: o extrator para de achar coisas
 * e o veredito sai VERDE, porque "nenhuma violação em nada" é aprovação. Foi o
 * que aconteceu com o B4 do validate-brand-form (out/2026): uma lista de
 * seletores multi-linha cegou o parser e o gate reportou `0 remapeado(s) ✅`.
 *
 * Contagem mínima (`>= N`) não resolve: ao reproduzir a cegueira, o parser
 * achou 2 de 65 — passaria por qualquer piso razoável. O que resolve é checar
 * um INVARIANTE CONHECIDO: algo que o detector, se estiver funcionando, TEM de
 * ver (o DssButton existe; o tema hc re-aponta primitivo; esta string de
 * exemplo É uma violação). Se não vê, o detector está quebrado — e o gate
 * reprova, em vez de aprovar o nada.
 *
 * Saída com código 2, não 1: "não consegui medir" é diferente de "medi e achei
 * violação", e o hook trata os dois como reprovação (`$? -ne 0`). Vale também
 * no modo relatório (sem --gate): relatório de detector cego mente igual.
 *
 * Uso:
 *   sentinela('validate-x', [
 *     [lista.includes('DssButton'), 'DssButton na lista de componentes'],
 *     [RE.test('style="width: 10px"'), 'regex reconhece style dimensional (autoteste)'],
 *   ])
 */
function sentinela(gate, checagens) {
  const falhas = checagens.filter(([ok]) => !ok).map(([, oQue]) => oQue);
  if (!falhas.length) return;
  console.error(`\n❌ ${gate}: DETECTOR CEGO — não viu o que sempre existe:`);
  for (const f of falhas) console.error(`   · ${f}`);
  console.error('   Qualquer veredito daqui seria medido sobre nada. Conserte o detector');
  console.error('   (ou, se o invariante mudou de verdade, atualize a sentinela) e rode de novo.');
  process.exit(2);
}

module.exports = { sentinela };
