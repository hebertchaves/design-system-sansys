/**
 * emit-spec.mjs  (ESM)  —  PORTÃO DE PRONTIDÃO DA SPEC.
 *
 * Lê a especificação funcional que o analista JÁ escreve (markdown) e emite
 * `dss.spec.json` + relatório de completude por regime.
 *
 * O artefato é DERIVADO, nunca autorado — mesmo princípio do dss.contract.json
 * (D1 do blueprint). O analista não escreve JSON nenhum: o extrator lê o .md
 * como ele é. Foi para isso que a ontologia ganhou o conceito de `genero`.
 *
 * O relatório NÃO é instrumento de fiscalização. Descoberta e Solução são
 * construção conjunta de designer + analista; o relatório diz à DUPLA quando
 * a spec está pronta para atravessar para a Entrega.
 *
 * Regimes (dss.ontology.json):
 *   obrigatorio  → ausência REPROVA
 *   recomendado  → aponta, não bloqueia
 *   horizonte    → registra como débito, NUNCA reprova (acessibilidade mora aqui)
 *
 * Uso: node scripts/emit-spec.mjs <arquivo.md> [--write] [--gate] [--json]
 *      node scripts/emit-spec.mjs --all <diretório> [--write] [--gate]
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const ONTOLOGY = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'docs/governance/dss.ontology.json'), 'utf8')
)

// ─── Sanitização ──────────────────────────────────────────────────────────────

/**
 * Remove ruído que produz FALSO POSITIVO em busca textual.
 *
 * Aprendido na marra: na primeira leitura das 3 specs, "acessibilidade" apareceu
 * com 2 hits em duas delas. Ambos eram lixo — blobs base64 de imagem contendo a
 * sequência "aria", e a palavra "gostaria". Sem esta limpeza o portão mente.
 */
function sanitize(md) {
  return md
    // linhas de definição de imagem base64: [image1]: <data:image/png;base64,...>
    .replace(/^\[image\d+\]:\s*<data:[^>]*>\s*$/gim, '')
    // qualquer data-uri remanescente
    .replace(/data:image\/[a-z]+;base64,[A-Za-z0-9+/=\s]+/gi, '')
    // blocos de código
    .replace(/```[\s\S]*?```/g, '')
}

/** Conta ocorrências de um padrão. */
const count = (text, re) => (text.match(re) || []).length

// ─── Detecção de gênero ───────────────────────────────────────────────────────

/**
 * Gherkin ESTRUTURAL: exige marcação em negrito.
 *
 * A primeira versão aceitava as palavras soltas e casava com prosa comum
 * ("Quando houver serviços…", "Então o valor…"), classificando a #33950 —
 * que não tem um único cenário BDD — como especificação funcional.
 * Palavra-chave de Gherkin sem marcação não é cenário, é português.
 */
const GHERKIN = /\*\*\s*(Dado que|Dado|Quando|Ent[ãa]o)\s*\*\*/gi
const CRITERIO = /crit[ée]rios?\s+de\s+aceit/gi
const RELACAO = /^\*\*Rela[çc][ãa]o\*\*/gim

function detectGenre(text) {
  const gherkin = count(text, GHERKIN)
  const criterios = count(text, CRITERIO)
  const relacao = count(text, RELACAO)

  // Regra da ontologia §generos.regra_de_deteccao
  if (criterios > 0 || gherkin >= 6) {
    return { genero: 'especificacao-funcional', sinais: { gherkin, criterios, relacao } }
  }
  if (relacao > 0) {
    return { genero: 'lista-requisitos-mudanca', sinais: { gherkin, criterios, relacao } }
  }
  return { genero: 'indeterminado', sinais: { gherkin, criterios, relacao } }
}

// ─── Inventário estrutural ────────────────────────────────────────────────────

/**
 * Entidades detectáveis por ESTRUTURA (seção, marcador, contagem).
 *
 * Deliberadamente NÃO tenta extrair `campo`, `comando`, `maquina_estado` e afins:
 * esses exigem leitura semântica, que é território do parecer via LLM — e aquele
 * é probabilístico, portanto não pode virar gate. Ver `limites` no relatório.
 */
const DETECTORS = {
  funcionalidade: {
    re: /^[\s\d.#*\\]*\**\s*Objetivo\**\s*$/im,
    label: 'Objetivo',
  },
  fora_de_escopo: {
    re: /fora\s+de\s+escopo|est[ãa]o\s+fora\s+d|n[ãa]o\s+faz\s+parte\s+do\s+escopo/i,
    label: 'Escopo negativo (fora de escopo)',
  },
  estoria: {
    re: /^[\s\d.#*\\]*\**\s*(2\.1\s*)?\**\s*(Est[óo]rias?|Hist[óo]ria)\s+d[eo]\s+Usu[áa]rio/im,
    label: 'Estórias do usuário',
    countRe: /\*\*(EST\s*\d+|HIST\s*\d+)\s*[:\\-]/gi,
  },
  premissa: {
    re: /^[\s\d.#*\\]*\**\s*(2\.2\s*)?\**\s*Premissas/im,
    label: 'Premissas',
  },
  restricao: {
    re: /^[\s\d.#*\\]*\**\s*(2\.3\s*)?\**\s*Restri[çc][õo]es/im,
    label: 'Restrições',
  },
  regra: {
    re: /\*\*RF\s*-?\s*\d+|\*\*RF\d+/i,
    label: 'Regras de negócio (RF)',
    countRe: /\*\*RF\s*-?\s*0*\d+/gi,
  },
  cenario: {
    re: GHERKIN,
    label: 'Cenários BDD (Gherkin)',
    countRe: /\*\*BDD\s*-?\s*0*\d+/gi,
  },
  criterio_aceite: {
    re: CRITERIO,
    label: 'Critérios de aceite',
    countRe: /\*\*CA\s*-?\s*0*\d+/gi,
  },
  rastreio: {
    re: RELACAO,
    label: 'Rastreio requisito→estória',
    countRe: RELACAO,
  },
  referencia_visual: {
    re: /^[\s\d.#*\\]*\**\s*(2\.4\s*)?\**\s*[-\s]*Prot[óo]tipos?/im,
    label: 'Protótipos / referência visual',
  },
  integracao: {
    re: /mapeamento\s+de\s+campos|microservi[çc]o|leiaute\s+xml|contrato\s+de\s+comunica/i,
    label: 'Integração com sistema externo',
  },
  parametrizacao: {
    re: /par[âa]metro\s+que\s+ir[áa]\s+definir|inf_parametro|n[ãa]o\s+ser[áa]\s+aproveitada\s+para\s+todos/i,
    label: 'Parametrização por cliente',
  },
  historico_documento: {
    re: /^[\s\d.#*\\]*\**\s*Atualiza[çc][ãa]o\s+do\s+documento/im,
    label: 'Log de revisões do documento',
  },
  permissao: {
    re: /perfil|permiss[ãa]o|autoriza[çc][ãa]o|autenticad/i,
    label: 'Permissão / perfil',
  },
}

// ─── Lacunas (busca negativa) ─────────────────────────────────────────────────

/**
 * As lacunas sistêmicas da ontologia. Cada uma foi confirmada em 3 specs reais
 * de autores e módulos diferentes.
 */
const LACUNAS = [
  {
    id: 'estado_dado.vazio',
    regime: 'obrigatorio',
    label: 'Estado vazio — o que a tela mostra quando não há dados',
    re: /\bvazi[ao]\b|nenhum\s+registro|nenhuma\s+fatura|sem\s+resultado|lista\s+vazia|n[ãa]o\s+houver\s+(dados|registros|itens)/i,
  },
  {
    id: 'estado_dado.carregando',
    regime: 'obrigatorio',
    label: 'Estado de carregamento — o que aparece enquanto os dados chegam',
    re: /carregando|em\s+carregamento|loading|spinner|aguarde/i,
  },
  {
    id: 'estado_dado.erro',
    regime: 'obrigatorio',
    label: 'Estado de erro — o que o usuário vê quando a operação falha',
    re: /mensagem\s+de\s+erro|em\s+caso\s+de\s+(erro|falha)|retorno\s+de\s+(erro|rejei)|tratar.*rejei/i,
  },
  {
    id: 'mensagem.veiculo',
    regime: 'obrigatorio',
    label: 'Veículo da mensagem — inline, toast, banner ou dialog',
    re: /\b(toast|banner|snackbar|mensagem\s+inline|di[áa]logo\s+de\s+confirma)/i,
  },
  {
    id: 'tela.superficie',
    regime: 'obrigatorio',
    label: 'Superfície declarada — página, modal, drawer ou painel',
    re: /\b(ser[áa]|dever[áa]\s+ser)\s+(uma\s+|um\s+)?(p[áa]gina|modal|drawer|gaveta|painel)\b/i,
  },
  {
    id: 'volume',
    regime: 'recomendado',
    label: 'Volume esperado de dados — decide tabela, lista ou scroll virtual',
    // Inclui a redação do próprio DSS_SPEC_BLOCO_INTERFACE §2.5.4 ("Máximo
    // esperado: N", "Típico: N"). Detector que não reconhece o template que o
    // DSS manda preencher é detector errado — descoberto ao fechar o laço.
    re: /no\s+m[áa]ximo\s+\d+|m[áa]ximo\s+esperado[:\s]+\d+|t[íi]pico[:\s]+\d+|limite\s+de\s+\d+\s+(registros|itens|linhas)|at[ée]\s+\d+\s+(registros|itens|linhas)|pagina[çc][ãa]o\s+de\s+\d+/i,
  },
  {
    id: 'responsividade',
    regime: 'recomendado',
    label: 'Comportamento responsivo',
    re: /responsiv|em\s+telas?\s+(xs|sm|pequenas|mobile)|dispositivos?\s+m[óo]veis|breakpoint/i,
  },
  {
    id: 'acessibilidade',
    regime: 'horizonte',
    label: 'Requisitos de acessibilidade',
    // \baria\b evita casar com "gostaria" — falso positivo real da 1ª rodada
    re: /acessibilidade|wcag|\baria\b|leitor\s+de\s+tela|navega[çc][ãa]o\s+por\s+teclado|contraste\s+m[íi]nimo/i,
  },
]

/**
 * Controles: padrões que QUALQUER spec real contém. Se todos derem zero, o
 * extrator está quebrado ou o arquivo não é uma spec — e o resultado vira
 * INCONCLUSIVO em vez de "aprovado". Sem isso, um regex quebrado aprova tudo
 * em silêncio, que é o modo de falha mais perigoso de um portão.
 */
const CONTROLES = [
  // ATENÇÃO: nada de `\b` DEPOIS de letra acentuada. Em JS `\b` deriva de `\w`,
  // que é [A-Za-z0-9_] — "á" não é caractere de palavra, então `dever[áa]\b`
  // NUNCA casa. Esse foi o primeiro bug que este próprio controle capturou:
  // sem ele, 3 specs reais teriam sido aprovadas por um regex quebrado.
  { id: 'obrigacao ("deverá")', re: /\bdever[áa](?![a-z])/i },
  { id: 'mensagem ao usuário', re: /mensagem|informar\s+ao\s+usu|alertar/i },
  { id: 'validação/bloqueio', re: /n[ãa]o\s+dever[áa]\s+permitir|impedir|bloquear/i },
]

// ─── Emissão ──────────────────────────────────────────────────────────────────

export function emitSpec(filePath) {
  return emitSpecFromText(fs.readFileSync(filePath, 'utf8'), path.basename(filePath))
}

/**
 * Mesma análise a partir do CONTEÚDO, sem tocar o disco.
 *
 * Necessário para o MCP hospedado: o .md do analista não existe no servidor,
 * então o cliente envia o texto. Mantém UMA fonte de regra — emitSpec() apenas
 * lê o arquivo e delega para cá.
 */
export function emitSpecFromText(raw, basename = 'spec.md') {
  const text = sanitize(raw)

  const { genero, sinais } = detectGenre(text)
  const generoDef = ONTOLOGY.generos[genero] || null

  const idMatch = basename.match(/(RF\s*-?\s*\d+[A-Z]?(?:\.\d+)?|#\d+|EST\d+)/i)

  // Inventário estrutural
  const presentes = {}
  const ausentes = []
  for (const [key, det] of Object.entries(DETECTORS)) {
    const re = det.re.global ? new RegExp(det.re.source, det.re.flags) : det.re
    const found = re.global ? count(text, re) > 0 : re.test(text)
    if (found) {
      const n = det.countRe ? count(text, new RegExp(det.countRe.source, det.countRe.flags)) : null
      // Quantidade 0 não é informação — é contradição ("presente (0)"). Quando o
      // contador não reconhece a numeração usada pela spec, reporta só a presença.
      presentes[key] = { label: det.label, ...(n ? { quantidade: n } : {}) }
    } else {
      ausentes.push({ entidade: key, label: det.label })
    }
  }

  const controles = CONTROLES.map(c => ({
    id: c.id,
    ocorrencias: count(text, new RegExp(c.re.source, 'gi')),
  }))
  const extratorSaudavel = controles.every(c => c.ocorrencias > 0)

  const lacunas = LACUNAS.map(l => {
    const ocorrencias = count(text, new RegExp(l.re.source, 'gi'))
    return { id: l.id, label: l.label, regime: l.regime, ocorrencias, presente: ocorrencias > 0 }
  })

  // Regime condicionado ao gênero
  const exigidas = generoDef?.exige ?? []
  const naoExigidas = generoDef?.nao_exige ?? []

  const faltamObrigatorias = ausentes.filter(a => {
    if (naoExigidas.includes(a.entidade)) return false
    const ent = ONTOLOGY.entidades[a.entidade]
    if (!ent) return false
    if (ent.regime === 'obrigatorio') return true
    if (ent.regime === 'condicional:genero') return exigidas.includes(a.entidade)
    return false
  })

  const bloqueantes = lacunas.filter(l => l.regime === 'obrigatorio' && !l.presente)
  const avisos = lacunas.filter(l => l.regime === 'recomendado' && !l.presente)
  const horizonte = lacunas.filter(l => l.regime === 'horizonte' && !l.presente)

  let veredito
  if (!extratorSaudavel || genero === 'indeterminado') veredito = 'inconclusivo'
  else if (faltamObrigatorias.length || bloqueantes.length) veredito = 'incompleta'
  else if (avisos.length) veredito = 'pronta-com-ressalvas'
  else veredito = 'pronta'

  return {
    schemaId: 'dss-spec-readiness@1',
    identidade: { id: idMatch ? idMatch[0].trim() : null, arquivo: basename },
    genero,
    generoSinais: sinais,
    ontologiaVersao: ONTOLOGY.version,
    veredito,
    inventario: { presentes, ausentes },
    faltamObrigatorias,
    lacunas: { bloqueantes, avisos, horizonte, detectadas: lacunas.filter(l => l.presente) },
    saudeDoExtrator: { saudavel: extratorSaudavel, controles },
    limites: [
      'Verifica COMPLETUDE e coerência estrutural — nunca a correção da regra de negócio.',
      'Entidades semânticas (campo, comando, maquina_estado, calculo) NÃO são extraídas: exigem leitura de significado, que é parecer probabilístico e por isso não vira gate.',
      'Presença ≠ qualidade: o portão vê que a spec FALA de estado vazio, não se o que ela diz está correto.',
    ],
  }
}

// ─── Relatório ────────────────────────────────────────────────────────────────

const ICON = { pronta: '✅', 'pronta-com-ressalvas': '🟡', incompleta: '🔴', inconclusivo: '⚠️' }

function report(r) {
  const L = ['', '─'.repeat(78)]
  L.push(`${ICON[r.veredito]}  ${r.identidade.id ?? r.identidade.arquivo}  —  ${r.veredito.toUpperCase()}`)
  L.push(`    gênero: ${r.genero}  ·  ontologia v${r.ontologiaVersao}`)
  L.push('─'.repeat(78))

  if (!r.saudeDoExtrator.saudavel) {
    L.push('', '⚠️  EXTRATOR NÃO SAUDÁVEL — padrão de controle sem ocorrência.')
    r.saudeDoExtrator.controles.filter(c => !c.ocorrencias).forEach(c => L.push(`     • ${c.id}: 0`))
    L.push('    O arquivo pode não ser uma spec, ou o extrator precisa de ajuste.')
    L.push('    Resultado INCONCLUSIVO — não confundir com aprovação.')
    return L.join('\n')
  }

  if (r.faltamObrigatorias.length) {
    L.push('', '🔴 SEÇÕES OBRIGATÓRIAS AUSENTES (para este gênero):')
    r.faltamObrigatorias.forEach(a => L.push(`     • ${a.label}`))
  }
  if (r.lacunas.bloqueantes.length) {
    L.push('', '🔴 A SPEC NÃO DIZ — bloqueia a passagem para a Entrega:')
    r.lacunas.bloqueantes.forEach(l => L.push(`     • ${l.label}`))
  }
  if (r.lacunas.avisos.length) {
    L.push('', '🟡 RECOMENDADO — aponta, não bloqueia:')
    r.lacunas.avisos.forEach(l => L.push(`     • ${l.label}`))
  }
  if (r.lacunas.horizonte.length) {
    L.push('', '📋 HORIZONTE — registrado como débito, NÃO reprova:')
    r.lacunas.horizonte.forEach(l => L.push(`     • ${l.label}`))
  }

  const ok = Object.values(r.inventario.presentes)
    .map(v => v.quantidade != null ? `${v.label} (${v.quantidade})` : v.label)
  if (ok.length) L.push('', '✔  PRESENTE: ' + ok.join(' · '))

  L.push('', 'ℹ️  ' + r.limites[0])
  return L.join('\n')
}

// ─── CLI ──────────────────────────────────────────────────────────────────────

// Só executa como script. Sem esta guarda, importar `emitSpec` dispararia o CLI
// (e o process.exit) dentro de quem importa — o MCP, por exemplo.
const isCli = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
if (!isCli) { /* importado como módulo */ }
else {

const argv = process.argv.slice(2)
const write = argv.includes('--write')
const gate = argv.includes('--gate')
const asJson = argv.includes('--json')
const all = argv.includes('--all')
const stdinMode = argv.includes('--stdin')
const labelIdx = argv.indexOf('--label')
const label = labelIdx >= 0 ? argv[labelIdx + 1] : 'spec.md'
const targets = argv.filter((a, i) => !a.startsWith('--') && !(labelIdx >= 0 && i === labelIdx + 1))

if (stdinMode) {
  const chunks = []
  for await (const c of process.stdin) chunks.push(c)
  const r = emitSpecFromText(Buffer.concat(chunks).toString('utf8'), label)
  console.log(asJson ? JSON.stringify(r, null, 2) : report(r))
  if (gate && (r.veredito === 'incompleta' || r.veredito === 'inconclusivo')) process.exit(1)
  process.exit(0)
}

if (!targets.length) {
  console.error('Uso: node scripts/emit-spec.mjs <arquivo.md> [--write] [--gate] [--json]')
  console.error('     cat spec.md | node scripts/emit-spec.mjs --stdin [--label nome.md] [--json]')
  console.error('     node scripts/emit-spec.mjs --all <diretório> [--write] [--gate]')
  process.exit(2)
}

const files = all
  ? fs.readdirSync(targets[0]).filter(f => f.endsWith('.md')).map(f => path.join(targets[0], f))
  : targets

let anyBlocked = false
const results = []

for (const f of files) {
  if (!fs.existsSync(f)) { console.error(`Arquivo não encontrado: ${f}`); process.exit(2) }
  const r = emitSpec(f)
  results.push(r)
  if (r.veredito === 'incompleta' || r.veredito === 'inconclusivo') anyBlocked = true

  console.log(asJson ? JSON.stringify(r, null, 2) : report(r))

  if (write) {
    const out = f.replace(/\.md$/i, '.dss.spec.json')
    fs.writeFileSync(out, JSON.stringify(r, null, 2) + '\n')
    if (!asJson) console.log(`\n    → ${path.basename(out)}`)
  }
}

if (!asJson && results.length > 1) {
  const tally = results.reduce((a, r) => (a[r.veredito] = (a[r.veredito] || 0) + 1, a), {})
  console.log('\n' + '═'.repeat(78))
  console.log('RESUMO: ' + Object.entries(tally).map(([k, v]) => `${ICON[k]} ${k}: ${v}`).join('  ·  '))
}

if (gate && anyBlocked) process.exit(1)

} // fim do bloco CLI
