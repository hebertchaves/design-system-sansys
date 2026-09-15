/**
 * Análise Estática — Tokens de CONTEXTO no Preview Frame
 *
 * O QUE ESTA SUÍTE PROTEGE. O `noCaps` do DssButton não é uma prop que pinta
 * nada: ela ESCAPA de `--dss-text-transform-control`. Num palco onde o token
 * vale o padrão (`none`), ligar e desligar dá na mesma — foi assim que o knob
 * virou um interruptor sem lâmpada e o Preview Frame pareceu quebrado enquanto
 * a página de teste mostrava a prop funcionando.
 *
 * O conserto atravessa QUATRO arquivos (registro → emissor → frame → sujeito).
 * Qualquer elo pode cair em silêncio: nada estoura, o knob só volta a não fazer
 * nada. É exatamente o tipo de regressão que nenhum gate pegava — e é por isso
 * que o teste existe, e por que ele testa os ELOS, não o resultado visual.
 *
 * O que NÃO está aqui: a prova visual de que o rótulo muda no palco. Isso exige
 * iframe + postMessage num browser real; a receita manual está no
 * DSS_DEFAULT_PREVIEW_WORKFLOW.md. Aqui ficam os elos que a receita pressupõe.
 */
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { describe, it, expect } from 'vitest'
import { CONTEXT_TOKENS, contextTokensFromCss } from '../../../../../scripts/context-tokens.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const RAIZ = resolve(__dirname, '../../../../..')

const ler = (p: string) => readFileSync(resolve(RAIZ, p), 'utf8')
const contrato = (nome: string, grupo = 'base') =>
  JSON.parse(ler(`packages/core/components/${grupo}/${nome}/dss.contract.json`))

const TOKEN = '--dss-text-transform-control'

describe('Registro de tokens de contexto', () => {
  it('todo token do registro é --dss-*, com valores fechados e default entre eles', () => {
    expect(CONTEXT_TOKENS.length).toBeGreaterThan(0)
    for (const t of CONTEXT_TOKENS) {
      expect(t.name).toMatch(/^--dss-[a-z0-9-]+$/)
      expect(t.values.length).toBeGreaterThanOrEqual(2)
      // O widget é um <select>: default fora da lista deixaria o campo vazio na
      // abertura e o palco num valor que o usuário não consegue reproduzir.
      expect(t.values).toContain(t.default)
      expect(t.label.trim()).not.toBe('')
    }
  })

  it('o token de capitalização está registrado e tem `none` como padrão do DS', () => {
    const t = CONTEXT_TOKENS.find(x => x.name === TOKEN)
    expect(t).toBeDefined()
    // O DSS não força maiúsculas (DSS_VISUAL_DEFAULTS_AUDIT, linha 20). Se este
    // default virar `uppercase`, TODO botão e TODA aba do DS mudam de aparência.
    expect(t!.default).toBe('none')
  })
})

describe('Derivação a partir do CSS', () => {
  it('detecta o token quando o CSS o CONSOME', () => {
    const css = '.dss-button { text-transform: var(--dss-text-transform-control, none); }'
    expect(contextTokensFromCss(css).map(t => t.name)).toEqual([TOKEN])
  })

  it('IGNORA o token quando ele só aparece em comentário', () => {
    // Não é hipótese: o _base.scss do DssButton cita o nome do token na prosa
    // que explica a regra, e o Sass preserva comentário de bloco no output.
    // Sem o strip, documentar o conserto faria o emissor "descobrir" o token
    // em componentes que não o consomem.
    const css = '/* Ver var(--dss-text-transform-control) para a regra. */ .x { color: red; }'
    expect(contextTokensFromCss(css)).toEqual([])
  })

  it('ignora nome parecido (não casa por prefixo)', () => {
    const css = '.x { text-transform: var(--dss-text-transform-control-legado); }'
    expect(contextTokensFromCss(css)).toEqual([])
  })

  it('não inventa token para CSS vazio ou ausente', () => {
    expect(contextTokensFromCss('')).toEqual([])
    expect(contextTokensFromCss(null as unknown as string)).toEqual([])
  })
})

describe('Contratos emitidos', () => {
  // Quem consome o token no CSS COMPILADO — inclui o DssRouteTab, que não
  // declara nada e importa o módulo do DssTab. Se a varredura voltar a olhar o
  // SCSS fonte em vez do compilado, é este que quebra primeiro.
  it.each(['DssButton', 'DssTab', 'DssRouteTab', 'DssBtnToggle'])(
    '%s declara o token de capitalização em visual.contextTokens',
    (nome) => {
      const ct = contrato(nome).visual?.contextTokens || []
      const achado = ct.find((t: { name: string }) => t.name === TOKEN)
      expect(achado, `${nome} perdeu o controle de contexto`).toBeDefined()
      expect(achado.values).toContain('uppercase')
      expect(achado.default).toBe('none')
    }
  )

  it('DssTabs NÃO declara o token — o container não tem rótulo próprio', () => {
    // Regra ali seria inerte, e regra inerte foi a origem de toda esta frente.
    expect(contrato('DssTabs').visual?.contextTokens).toBeUndefined()
  })

  it('o campo é raro: só entra em quem consome', () => {
    const consomem = ['DssButton', 'DssTab', 'DssRouteTab', 'DssBtnToggle']
    const naoConsomem = ['DssChip', 'DssBadge', 'DssInput', 'DssCheckbox']
    for (const n of naoConsomem) {
      expect(contrato(n).visual?.contextTokens, `${n} não deveria ter`).toBeUndefined()
    }
    expect(consomem.length).toBe(4)
  })
})

describe('Fiação do Preview Frame', () => {
  // Elos frágeis: são duas pontas de um postMessage. Some uma, o knob morre em
  // silêncio — sem erro de console, sem teste vermelho em lugar nenhum.
  const frame = () => ler('apps/sandbox/src/preview/PreviewFrame.vue')
  const subject = () => ler('apps/sandbox/src/preview/PreviewSubject.vue')

  it('o frame lê visual.contextTokens do contrato', () => {
    expect(frame()).toMatch(/contract\.value\.visual\?\.contextTokens/)
  })

  it('o frame renderiza um controle por token declarado', () => {
    const src = frame()
    expect(src).toMatch(/v-for="ct in contextTokens"/)
    expect(src).toMatch(/v-model="contextState\[ct\.name\]"/)
  })

  it('o frame inclui contextTokens no payload enviado ao sujeito', () => {
    expect(frame()).toMatch(/contextTokens:\s*\{\s*\.\.\.contextState\s*\}/)
  })

  it('o frame reenvia o estado quando o contexto muda', () => {
    // Sem isto o <select> muda e nada acontece: o palco só é atualizado no
    // watcher que serializa o estado.
    expect(frame()).toMatch(/watch\(\(\) => JSON\.stringify\([^)]*ct:\s*contextState/)
  })

  it('o sujeito recebe contextTokens da mensagem', () => {
    expect(subject()).toMatch(/d\.contextTokens/)
  })

  it('o sujeito aplica no <html> do realm, não na div do palco', () => {
    // Custom property é herdada, e overlay teleportado para o <body> não é
    // descendente do palco: preso à div, um menu resolveria o valor padrão
    // enquanto o sujeito usa outro. Mesma decisão de data-theme/data-brand.
    const src = subject()
    expect(src).toMatch(/document\.documentElement/)
    expect(src).toMatch(/html\.style\.setProperty\(nome, valor\)/)
  })
})
