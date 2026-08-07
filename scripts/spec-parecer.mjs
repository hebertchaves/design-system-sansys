/**
 * spec-parecer.mjs  (ESM)  —  ROTEIRO DE PARECER SEMÂNTICO.
 *
 * ISTO NÃO É UM GATE. Nunca reprova, nunca sai com código ≠ 0, não emite
 * veredito. Produz um ROTEIRO para um humano ou agente ler a spec e opinar.
 *
 * ── Por que o DSS não chama o LLM ────────────────────────────────────────────
 * O MCP não faz nenhuma chamada de rede hoje, e o MCP_READ_ONLY_CONTRACT §3
 * exige que ele "observe e explique, mas nunca decida". Um juízo probabilístico
 * embutido no DSS o tornaria criativo e não-reprodutível — e daria à opinião a
 * aparência de veredito da ferramenta.
 *
 * Divisão de trabalho:
 *   DSS  (determinístico) → monta o roteiro: o que perguntar e onde olhar
 *   Agente/humano (juízo) → responde, SEMPRE citando trecho literal
 *   Humano               → confere cada observação contra a citação
 *
 * ── A disciplina que separa parecer de achismo ───────────────────────────────
 * Toda observação exige `citacao`: trecho literal da spec. É o mesmo princípio
 * do `verifiedBy` do contrato de componente. Sem âncora é opinião; com âncora,
 * qualquer pessoa confere em cinco segundos e a discussão vira factual.
 *
 * ── O que este roteiro NÃO pergunta ──────────────────────────────────────────
 * Nada que o portão determinístico (emit-spec.mjs) já resolve por presença, e
 * nada sobre a CORREÇÃO da regra de negócio — se o prazo deveria ser 5 e não 3
 * dias, isso não está ao alcance de nenhuma ferramenta aqui.
 *
 * Uso: node scripts/spec-parecer.mjs <arquivo.md> [--json]
 *      cat spec.md | node scripts/spec-parecer.mjs --stdin [--label nome.md]
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { emitSpecFromText } from './emit-spec.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ─── As perguntas ─────────────────────────────────────────────────────────────

/**
 * Cada pergunta cobre algo que busca textual NÃO alcança: exige entender o que
 * o texto quer dizer. Todas são VERIFICÁVEIS — a resposta aponta um trecho e
 * qualquer pessoa confere.
 *
 * `exemploReal` cita o achado concreto nas 3 specs analisadas, para calibrar o
 * que conta como observação útil (e não como palpite genérico).
 */
const PERGUNTAS = [
  {
    id: 'contradicao-interna',
    titulo: 'Contradição interna',
    pergunta:
      'A spec afirma duas coisas incompatíveis sobre o mesmo assunto? Compare título de seção com o corpo, e requisito com critério de aceite.',
    porqueImporta:
      'Quem implementa escolhe uma das versões em silêncio — e a escolha pode ser a errada.',
    exemploReal:
      'RF-0292D: a RF01 fala em "criação do MODAL"; BDD01, CA01 e todo o resto falam em "a TELA". Nunca resolvido. Decide foco, ESC, rolagem e largura.',
  },
  {
    id: 'referencia-orfa',
    titulo: 'Referência órfã',
    pergunta:
      'Algum cenário, critério ou regra cita valor, campo, status ou tela que não é definido em lugar nenhum do documento?',
    porqueImporta:
      'O implementador inventa o que falta, ou descobre a ausência tarde demais.',
    exemploReal:
      'Verificar se todo status citado em BDD aparece na lista de valores do campo, e se todo campo citado numa regra é declarado em algum lugar.',
  },
  {
    id: 'cobertura-regra-cenario',
    titulo: 'Cobertura entre camadas',
    pergunta:
      'Existe regra de negócio sem cenário que a exercite? Cenário sem critério de aceite correspondente? Estória sem nenhuma regra que a realize?',
    porqueImporta:
      'Lacuna de cobertura vira funcionalidade não testada — e frequentemente não implementada.',
    exemploReal:
      'A contagem bruta não resolve: RF-0292D tem 32 RFs, 41 BDDs e 40 CAs, mas só a leitura diz se cada RF tem cenário próprio.',
  },
  {
    id: 'vagueza-acionavel',
    titulo: 'Vagueza que decide comportamento',
    pergunta:
      'Há expressão vaga em ponto que muda o que aparece na tela? ("conforme disponibilidade", "quando aplicável", "os formatos atuais", "no padrão do sistema")',
    porqueImporta:
      'Vagueza em prosa introdutória é inofensiva. Vagueza dentro de um cenário vira decisão do implementador.',
    exemploReal:
      'RF-0292D BDD03: "conforme disponibilidade das informações" — é a única menção a dado ausente na spec inteira, e não diz o que a tela mostra. #85505 CA19: "respeitando os formatos atuais", sem enumerar.',
  },
  {
    id: 'termo-inconsistente',
    titulo: 'Termo inconsistente',
    pergunta:
      'A mesma coisa é chamada por nomes diferentes ao longo do documento? Nomes diferentes designam a mesma coisa?',
    porqueImporta:
      'Vira nome de variável, rótulo de tela e coluna de banco divergentes — e depois exige tradução mental permanente.',
    exemploReal:
      'RF-0292D alterna "matrícula" e "unidade consumidora" para o mesmo agrupamento; verificar se é sinônimo deliberado ou drift.',
  },
  {
    id: 'estado-sem-transicao',
    titulo: 'Estado sem transição',
    pergunta:
      'A spec lista estados de uma entidade sem dizer o que leva de um ao outro, ou o que cada estado bloqueia na tela?',
    porqueImporta:
      'Estado é o que mais governa comportamento de tela. Lista sem transição não é máquina de estado — é vocabulário.',
    exemploReal:
      'RF-0292D lista 6 status da análise; #85505 opera duplo controle (Situação Fiscal × Financeira) com ações bloqueadas por combinação dos dois.',
  },
  {
    id: 'caminho-infeliz',
    titulo: 'Caminho infeliz sem contrapartida',
    pergunta:
      'Onde a spec manda "rejeitar", "impedir" ou "bloquear", ela diz o que o usuário vê e o que pode fazer em seguida?',
    porqueImporta:
      'Rejeição sem contrapartida visual vira tela travada sem explicação.',
    exemploReal:
      'RF-0292D BDD37/BDD39 mandam rejeitar e não dizem o que aparece. #85505 EST004 é o contraexemplo bom: verificar, corrigir, reenviar ou cancelar.',
  },
  {
    id: 'escopo-vs-corpo',
    titulo: 'Escopo negativo × corpo',
    pergunta:
      'Algum requisito no corpo faz o que a seção de escopo declarou fora?',
    porqueImporta:
      'Escopo furado só aparece na revisão, quando já foi implementado.',
    exemploReal:
      'RF-0292D lista 11 itens fora de escopo — conferir se nenhum RF/BDD os reintroduz.',
  },
]

// ─── Montagem do roteiro ──────────────────────────────────────────────────────

/** Índice de seções, para o parecerista citar posição. */
function mapaDeSecoes(text) {
  const out = []
  const linhas = text.split('\n')
  linhas.forEach((l, i) => {
    const m = l.match(/^[\s#*\\]*\**\s*(\d+(?:\.\d+)*)[.\\]*\s*\**\s*(.{3,70}?)\**\s*$/)
    if (m && /^[#*\d]/.test(l.trim())) out.push({ linha: i + 1, secao: `${m[1]} ${m[2]}`.trim() })
  })
  return out.slice(0, 40)
}

export function montarRoteiro(raw, basename = 'spec.md') {
  // Reaproveita o portão para não repetir no parecer o que já é determinístico.
  const portao = emitSpecFromText(raw, basename)

  const jaCobertoPeloPortao = [
    ...(portao.lacunas?.bloqueantes ?? []),
    ...(portao.lacunas?.avisos ?? []),
  ].map((l) => l.id)

  return {
    schemaId: 'dss-spec-parecer-roteiro@1',
    tipo: 'ROTEIRO DE PARECER — NÃO É GATE',
    fonte: basename,
    portaoDeterministico: {
      veredito: portao.veredito,
      genero: portao.genero,
      naoRepetirNoParecer: jaCobertoPeloPortao,
      nota:
        'O portão já reportou estas ausências por presença. O parecer NÃO deve repeti-las — deve olhar o que a spec DIZ, não o que ela deixa de mencionar.',
    },
    mapaDeSecoes: mapaDeSecoes(raw),
    perguntas: PERGUNTAS,
    comoResponder: {
      formato: 'Uma lista de observações. Zero observações é resposta válida e boa.',
      obrigatorio: {
        perguntaId: 'qual pergunta do roteiro originou a observação',
        citacao:
          'TRECHO LITERAL da spec, copiado sem alterar. Observação sem citação é opinião e deve ser descartada.',
        ondeEsta: 'seção ou linha aproximada',
        oQueDecide: 'que decisão de implementação essa dúvida altera',
        confianca: 'alta | media | baixa',
      },
      proibido: [
        'Emitir veredito, nota ou percentual de qualidade.',
        'Opinar sobre a CORREÇÃO da regra de negócio (se o prazo deveria ser 5 e não 3 dias).',
        'Repetir o que o portão determinístico já apontou.',
        'Sugerir reescrita da spec inteira — a observação aponta um ponto, não refaz o documento.',
        'Inventar citação. Se não achar o trecho, não há observação.',
      ],
    },
    limites: [
      'PARECER, NÃO GATE: probabilístico, não reprova nada, não altera veredito do portão.',
      'Pode errar. Cada observação carrega citação justamente para o humano conferir em segundos.',
      'Ausência de observações NÃO significa spec correta — significa que nada foi notado.',
    ],
  }
}

// ─── Relatório legível ────────────────────────────────────────────────────────

function relatorio(r) {
  const L = ['', '═'.repeat(78)]
  L.push(`ROTEIRO DE PARECER SEMÂNTICO — ${r.fonte}`)
  L.push('NÃO É GATE — não reprova, não emite veredito. Insumo para julgamento.')
  L.push('═'.repeat(78))
  L.push('')
  L.push(`Portão determinístico: ${r.portaoDeterministico.veredito} · gênero ${r.portaoDeterministico.genero}`)
  if (r.portaoDeterministico.naoRepetirNoParecer.length) {
    L.push(`Já apontado pelo portão (NÃO repetir): ${r.portaoDeterministico.naoRepetirNoParecer.join(', ')}`)
  }
  L.push('')
  L.push('─'.repeat(78))
  L.push('PERGUNTAS — cada resposta exige CITAÇÃO literal da spec')
  L.push('─'.repeat(78))
  for (const [i, p] of r.perguntas.entries()) {
    L.push('')
    L.push(`${i + 1}. ${p.titulo}`)
    L.push(`   ${p.pergunta}`)
    L.push(`   Por que importa: ${p.porqueImporta}`)
    L.push(`   Calibre: ${p.exemploReal}`)
  }
  L.push('')
  L.push('─'.repeat(78))
  L.push('PROIBIDO na resposta:')
  r.comoResponder.proibido.forEach((p) => L.push(`   ✗ ${p}`))
  L.push('')
  r.limites.forEach((l) => L.push(`ℹ️  ${l}`))
  return L.join('\n')
}

// ─── CLI ──────────────────────────────────────────────────────────────────────

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
if (isCli) {
  const argv = process.argv.slice(2)
  const asJson = argv.includes('--json')
  const stdinMode = argv.includes('--stdin')
  const li = argv.indexOf('--label')
  const label = li >= 0 ? argv[li + 1] : 'spec.md'
  const alvos = argv.filter((a, i) => !a.startsWith('--') && !(li >= 0 && i === li + 1))

  const emitir = (raw, nome) => {
    const r = montarRoteiro(raw, nome)
    console.log(asJson ? JSON.stringify(r, null, 2) : relatorio(r))
  }

  if (stdinMode) {
    const chunks = []
    for await (const c of process.stdin) chunks.push(c)
    emitir(Buffer.concat(chunks).toString('utf8'), label)
  } else if (!alvos.length) {
    console.error('Uso: node scripts/spec-parecer.mjs <arquivo.md> [--json]')
    console.error('     cat spec.md | node scripts/spec-parecer.mjs --stdin [--label nome.md]')
    process.exit(2)
  } else {
    for (const f of alvos) {
      if (!fs.existsSync(f)) { console.error(`Arquivo não encontrado: ${f}`); process.exit(2) }
      emitir(fs.readFileSync(f, 'utf8'), path.basename(f))
    }
  }
  // Nunca sai com código ≠ 0 por conteúdo: parecer não reprova.
}
