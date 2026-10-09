// Revision 02, §5.1. Business descriptions only; no SQL, table names or credentials.
export const CHECKS = [
  ['Cadastro cClass','cClass (Código de Classificação)','Códigos ativos e válidos para os grupos utilizados no faturamento.','Classificações inválidas podem provocar rejeição dos itens.'],
  ['Vínculo cClass com serviços','cClass (Código de Classificação) › Código Serviço','Serviços ativos vinculados a uma classificação ativa.','Serviços obrigatórios sem classificação comprometem a emissão.'],
  ['Cadastro CST e cClassTrib','Tabela Tarifária Regras Impostos › Opção CST / CCLASSTRIB','Classificações tributárias e CST ativos e compatíveis com as regras.','A tributação dos itens depende desses vínculos.'],
  ['Cadastro de impostos','Tabela Tarifária Regras Impostos › Opção Gerenciar Alíquotas de Impostos › Opção Gerenciar Cadastro de Impostos','IBS estadual, IBS municipal e CBS cadastrados e ativos.','Impostos obrigatórios ausentes comprometem o grupo IBS/CBS.'],
  ['Cadastros básicos NFAg','Tabela Básica e Cadastrar Tipos de Substituição','Origens de consumo e motivos ativos, incluindo origens utilizadas nos últimos três meses.','Cadastros inválidos comprometem os itens e as substituições.'],
  ['Vínculos básicos e campos obrigatórios','Ocorrência de Leitura · Município · Estado · Tabela Básica · Dados da Empresa','Códigos IBGE e vínculos obrigatórios dos cadastros ativos.','O município do emitente é obrigatório para a emissão.'],
  ['Vínculos para substituição e alteração','Motivo Tipo Alteração de Fatura','Motivos ativos de alteração, cancelamento, reenvio, transferência e estorno vinculados à substituição NFAg.','Vínculos ausentes exigem atenção nas operações de substituição.'],
  ['Faturamento e emissão de fatura','Categoria Tipo Tarifa e Parametrização Sistema','Categorias com tipo NFAg e layout de impressão simultânea 104, 105 ou 106.','Um layout inválido compromete a emissão e a impressão.'],
  ['Tabela tarifária de impostos e regras','Tabela Tarifária Regras Impostos › Opção Vigência Regra Impostos','Tabela vigente, alíquotas do ano e regras com serviço, classificação e CST.','Vigência incorreta pode causar rejeição tributária.'],
  ['Configuração de mensagens','Mensagem Diversas na Fatura','Mensagem ativa e variáveis referenciadas existentes e ativas.','Mensagens incompletas prejudicam as informações da fatura.'],
  ['Configuração da integração de leitura NFAg','Parametrização Sistema › Configuração da API de Leitura NFAg','Configuração da integração preenchida e válida para a empresa emitente.','Configuração ausente compromete a integração de leitura.'],
].map(([title, destination, rule, impact], i) => ({id:i+1,title,destination,rule,impact}));
export const COMPANIES = [
  {value:'demo-a',label:'Companhia de Saneamento · Unidade Central',cnpj:'00.000.000/0001-00',city:'Porto Alegre · RS',ibge:'4314902'},
  {value:'demo-b',label:'Companhia de Saneamento · Unidade Regional',cnpj:'00.000.000/0002-00',city:'Caxias do Sul · RS',ibge:'4305108'},
];
export function verdict(rows) {
  if (rows.some(r => r.status === 'failure' && r.blocking)) return 'Não apto para emissão';
  if (rows.some(r => ['warning','failure','incomplete'].includes(r.status))) return 'Apto com alertas';
  return 'Apto para emissão';
}
export function isStale(completedAt, now, changed = false) {
  return changed || now - completedAt > 24 * 60 * 60 * 1000;
}
export function counts(rows) {
  return {all:rows.length,ok:rows.filter(r=>r.status==='ok').length,warning:rows.filter(r=>['warning','incomplete'].includes(r.status)).length,failure:rows.filter(r=>r.status==='failure').length};
}
export function makeRows(scenario='mixed') {
  return CHECKS.map(c => {
    const status = scenario==='empty' ? 'waiting' : scenario==='apt' ? 'ok' : scenario==='alerts' ? ([7,10].includes(c.id)?'warning':'ok') : scenario==='timeout' ? (c.id===11?'incomplete':'ok') : [2,9,11].includes(c.id)?'failure':[6,10].includes(c.id)?'warning':'ok';
    const finding = c.id===2 ? 'Serviço de água · faturamento obrigatório: classificação não vinculada.' : c.id===9 ? 'Tabela de tributos: vigência encerrada para o período selecionado.' : c.id===11 ? 'Integração de leitura: configuração incompleta.' : c.id===6 ? 'Ocorrência de leitura: motivo de não leitura não informado.' : c.id===10 ? 'Mensagem de fatura: variável referenciada indisponível.' : 'Cadastro ativo com vínculo pendente.';
    return {...c,status,blocking:status==='failure' && [1,2,3,4,5,6,8,9,11].includes(c.id),duration:180+c.id*73,summary:status==='waiting'?'Aguardando verificação':status==='ok'?'Configuração conferida, sem inconsistências.':status==='incomplete'?'Tempo excedido — repita a verificação fora do horário de pico.':finding,findings:['warning','failure'].includes(status)?[{item: c.title,result:finding}]:[]};
  });
}
