/**
 * POC (descartável) — utilitários mínimos de markdown para DERIVAR seções da
 * página a partir dos docs canônicos (README.md, API.md). Não é um renderer
 * completo: cobre headings, parágrafos, listas, tabelas, code e inline
 * (bold/code/links) — o suficiente para medir se o artefato tem a estrutura.
 */

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function renderInline(text) {
  let h = esc(text)
  h = h.replace(/`([^`]+)`/g, '<code>$1</code>')
  h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  return h
}

/** Normaliza um título de header (remove bold, emoji, número, espaços). */
const norm = (t) =>
  t.replace(/\*\*/g, '').replace(/[#0-9.]/g, '').replace(/[^\p{L}\s/]/gu, '').trim().toLowerCase()

/**
 * Quebra um markdown em seções por header H2/H3. Retorna lista
 * { level, title, normTitle, body } na ordem do documento.
 */
export function splitSections(md) {
  const lines = md.split(/\r?\n/)
  const sections = []
  let cur = null
  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.*)$/)
    if (m) {
      if (cur) sections.push(cur)
      cur = { level: m[1].length, title: m[2].trim(), normTitle: norm(m[2]), body: [] }
    } else if (cur) {
      cur.body.push(line)
    }
  }
  if (cur) sections.push(cur)
  return sections.map((s) => ({ ...s, body: s.body.join('\n').trim() }))
}

/** Acha a 1ª seção cujo título normalizado bate com algum dos regex. */
export function findSection(md, patterns) {
  const secs = splitSections(md)
  for (const s of secs) {
    if (patterns.some((p) => p.test(s.normTitle))) return s
  }
  return null
}

/** Extrai a 1ª tabela markdown de um bloco → { headers:[], rows:[[]] } | null. */
export function parseTable(body) {
  if (!body) return null
  const lines = body.split(/\r?\n/)
  const start = lines.findIndex((l) => /^\s*\|.*\|\s*$/.test(l))
  if (start === -1 || !lines[start + 1] || !/^[\s|:-]+$/.test(lines[start + 1])) return null
  const cells = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())
  const headers = cells(lines[start])
  const rows = []
  for (let i = start + 2; i < lines.length; i++) {
    if (!/^\s*\|.*\|\s*$/.test(lines[i])) break
    rows.push(cells(lines[i]))
  }
  return { headers, rows }
}

/** Render mínimo de um bloco markdown → HTML (parágrafos, listas, code, tabela). */
export function mdToHtml(body) {
  if (!body) return ''
  const lines = body.split(/\r?\n/)
  const out = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (/^```/.test(line)) {
      const buf = []
      i++
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(esc(lines[i++]))
      i++
      out.push(`<pre class="poc-code"><code>${buf.join('\n')}</code></pre>`)
    } else if (/^\s*\|.*\|\s*$/.test(line)) {
      const buf = []
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) buf.push(lines[i++])
      const t = parseTable(buf.join('\n'))
      if (t) {
        const th = t.headers.map((h) => `<th>${renderInline(h)}</th>`).join('')
        const tr = t.rows
          .map((r) => `<tr>${r.map((c) => `<td>${renderInline(c)}</td>`).join('')}</tr>`)
          .join('')
        out.push(`<table class="poc-table"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`)
      }
    } else if (/^\s*[-*]\s+/.test(line)) {
      const buf = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        buf.push(`<li>${renderInline(lines[i].replace(/^\s*[-*]\s+/, ''))}</li>`)
        i++
      }
      out.push(`<ul class="poc-ul">${buf.join('')}</ul>`)
    } else if (line.trim() === '') {
      i++
    } else {
      out.push(`<p>${renderInline(line)}</p>`)
      i++
    }
  }
  return out.join('\n')
}
