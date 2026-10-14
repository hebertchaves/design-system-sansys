/**
 * Silhueta do sujeito do Preview Frame — MEDIDA, não desenhada.
 *
 * O skeleton do palco precisa ter a forma do componente que vai aparecer. Um
 * desenho por componente seria uma segunda descrição visual do DS, mantida à
 * mão e condenada a divergir da primeira (Constituição #6: a verdade é o CSS).
 * Aqui a forma sai do DOM REAL: quando o sujeito monta, o parent mede as caixas
 * que ele pintou e guarda; na visita seguinte o skeleton reproduz essas caixas.
 *
 * Consequências assumidas:
 *  - a PRIMEIRA visita a um componente neste browser não tem o que mostrar e
 *    cai no skeleton genérico;
 *  - a silhueta é a do estado DEFAULT (o do boot), não a do último knob mexido;
 *  - como é remedida a cada montagem, mudança no componente se corrige sozinha
 *    na visita seguinte — não há artefato para regenerar.
 *
 * Geometria: `left`/`width` em % da raiz, `top`/`height` em px. Assim a mesma
 * silhueta serve ao componente de largura fixa (a raiz volta com os px medidos)
 * e ao que enche o palco (`fluid`: a raiz volta com 100% e as caixas esticam).
 */

const PREFIXO = 'dss-pv-silhouette:v1:'
const MAX_ELEMENTOS = 600   // teto de varredura — tabela grande não trava o palco
const MAX_CAIXAS = 80
// Fundo sólido até esta área é a PEÇA (botão, chip, badge): vira bloco cheio e
// o conteúdo dela não é desenhado. Acima disso é SUPERFÍCIE (toolbar, banner):
// vira contorno e o conteúdo aparece por dentro.
const AREA_PECA = 20000

const SUBSTITUIDOS = 'img,svg,canvas,video,input,textarea,select,progress,.q-icon,.material-icons'

function alfa(cor) {
  if (!cor || cor === 'transparent') return 0
  const m = cor.match(/rgba?\(([^)]+)\)/)
  if (!m) return 1
  const p = m[1].split(/[,/ ]+/).filter(Boolean)
  return p.length >= 4 ? parseFloat(p[3]) : 1
}

// O que este estilo PINTA: 'fundo' (preenchimento visível e distinto do palco),
// 'borda' (contorno ou sombra) ou null.
function pintura(cs, fundoDoPalco) {
  if (!cs) return null
  if (alfa(cs.backgroundColor) > 0.08 && cs.backgroundColor !== fundoDoPalco) return 'fundo'
  const temBorda = ['Top', 'Right', 'Bottom', 'Left'].some(
    (l) => parseFloat(cs[`border${l}Width`]) > 0 && cs[`border${l}Style`] !== 'none' && alfa(cs[`border${l}Color`]) > 0.08
  )
  if (temBorda || (cs.boxShadow && cs.boxShadow !== 'none')) return 'borda'
  return null
}

function raio(cs, r) {
  const v = parseFloat(cs.borderTopLeftRadius) || 0
  const px = String(cs.borderTopLeftRadius).includes('%') ? (v / 100) * Math.min(r.width, r.height) : v
  return Math.round(Math.min(px, Math.min(r.width, r.height) / 2))
}

/**
 * Mede o sujeito montado em `doc` (o documento do iframe).
 * Devolve null quando não há o que medir (sujeito sem caixa, palco vazio).
 */
export function medirSilhueta(doc) {
  const palco = doc?.querySelector('.pv-stage')
  const raiz = palco?.firstElementChild
  const win = doc?.defaultView
  if (!raiz || !win) return null
  const rr = raiz.getBoundingClientRect()
  if (rr.width < 2 || rr.height < 2) return null

  const csPalco = win.getComputedStyle(palco)
  const fundoDoPalco = csPalco.backgroundColor
  const util = palco.clientWidth - parseFloat(csPalco.paddingLeft) - parseFloat(csPalco.paddingRight)

  const caixas = []
  let vistos = 0

  const push = (r, tipo, rad) => {
    // recorta na raiz: conteúdo rolado para fora (tabela, tabs) não entra
    const x1 = Math.max(r.left, rr.left), x2 = Math.min(r.right, rr.right)
    const y1 = Math.max(r.top, rr.top), y2 = Math.min(r.bottom, rr.bottom)
    if (x2 - x1 < 2 || y2 - y1 < 2 || caixas.length >= MAX_CAIXAS) return
    caixas.push({
      t: tipo,
      x: +(((x1 - rr.left) / rr.width) * 100).toFixed(2),
      w: +(((x2 - x1) / rr.width) * 100).toFixed(2),
      y: Math.round(y1 - rr.top),
      h: Math.round(y2 - y1),
      r: rad,
    })
  }

  const andar = (el) => {
    if (++vistos > MAX_ELEMENTOS || caixas.length >= MAX_CAIXAS) return
    const cs = win.getComputedStyle(el)
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) return

    const rad = raio(cs, r)
    if (el.matches(SUBSTITUIDOS)) { push(r, 'bloco', el.matches('input,textarea,select') ? rad : Math.min(rad || 4, r.height / 2)); return }

    // A pintura pode morar num pseudo-elemento: a borda do QField é o ::before
    // do controle. Só conta pseudo que COBRE a caixa — um ::after de ripple ou
    // de foco não é a forma do componente.
    let p = pintura(cs, fundoDoPalco)
    if (!p) {
      for (const pseudo of ['::before', '::after']) {
        const ps = win.getComputedStyle(el, pseudo)
        if (ps.content === 'none' || ps.display === 'none' || parseFloat(ps.opacity) === 0) continue
        if (ps.position !== 'absolute' || parseFloat(ps.width) < r.width * 0.9 || parseFloat(ps.height) < r.height * 0.9) continue
        p = pintura(ps, fundoDoPalco)
        if (p) break
      }
    }

    const filhos = [...el.children]
    const textos = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim())
    const vazio = !filhos.length && !textos.length

    if (p === 'fundo' && (vazio || r.width * r.height <= AREA_PECA)) { push(r, 'bloco', rad); return }
    if (p) push(r, vazio ? 'bloco' : 'contorno', rad)

    for (const n of textos) {
      const range = doc.createRange()
      range.selectNodeContents(n)
      // uma barra por LINHA: parágrafo de 3 linhas lê como 3 barras, não um tijolo
      for (const lr of range.getClientRects()) {
        const folga = lr.height * 0.2
        push({ left: lr.left, right: lr.right, top: lr.top + folga, bottom: lr.bottom - folga }, 'bloco', 4)
      }
    }
    for (const f of filhos) andar(f)
  }

  andar(raiz)
  if (!caixas.length) return null
  return { w: Math.round(rr.width), h: Math.round(rr.height), fluid: rr.width >= util - 2, caixas }
}

// localStorage pode lançar (janela privada, cota, cookies bloqueados). A
// silhueta é conforto: sem ela o palco cai no skeleton genérico e segue.
export function lerSilhueta(componente) {
  try {
    const s = JSON.parse(localStorage.getItem(PREFIXO + componente) || 'null')
    return s && Array.isArray(s.caixas) && s.caixas.length ? s : null
  } catch { return null }
}

export function guardarSilhueta(componente, silhueta) {
  if (!silhueta) return
  try { localStorage.setItem(PREFIXO + componente, JSON.stringify(silhueta)) } catch { /* sem cache */ }
}
