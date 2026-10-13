import { test, expect } from '@playwright/test'

/**
 * Barreira de marca — o eixo de AÇÃO volta ao semântico na zona de conteúdo,
 * e o eixo de IDENTIDADE continua brandeado.
 *
 * 📖 docs/governance/DSS_MODELO_PROPAGACAO_MARCA.md
 *
 * Mede com `getComputedStyle` em browser real porque o defeito que originou
 * tudo isto era MUDO: nada errava, a cor só estava errada.
 */

/** Monta `<div data-brand><div data-brand-zone?><probe>>` e lê valores no probe. */
async function medir(
  page: import('@playwright/test').Page,
  opts: { brand?: string; zone?: string; theme?: string; props: string[]; classe?: string }
) {
  return page.evaluate((o) => {
    const raiz = document.documentElement
    const temaAnterior = raiz.getAttribute('data-theme')
    if (o.theme) raiz.setAttribute('data-theme', o.theme)

    const host = document.createElement('div')
    if (o.brand) host.setAttribute('data-brand', o.brand)

    let alvo = host
    if (o.zone) {
      const zona = document.createElement('div')
      zona.setAttribute('data-brand-zone', o.zone)
      host.appendChild(zona)
      alvo = zona
    }

    const probe = document.createElement('div')
    if (o.classe) probe.className = o.classe
    alvo.appendChild(probe)
    document.body.appendChild(host)

    const cs = getComputedStyle(probe)
    const out: Record<string, string> = {}
    for (const p of o.props) out[p] = cs.getPropertyValue(p).trim()
    out['__bg'] = cs.backgroundColor

    document.body.removeChild(host)
    if (temaAnterior === null) raiz.removeAttribute('data-theme')
    else raiz.setAttribute('data-theme', temaAnterior)
    return out
  }, opts)
}

test.describe('Barreira de marca — zona de conteúdo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('sem zona, [data-brand] brandeia o eixo de AÇÃO', async ({ page }) => {
    const neutro = await medir(page, { props: ['--dss-action-primary'] })
    const hub = await medir(page, { brand: 'hub', props: ['--dss-action-primary'] })

    expect(hub['--dss-action-primary']).not.toBe(neutro['--dss-action-primary'])
  })

  test('na zona de conteúdo, o eixo de AÇÃO volta ao semântico', async ({ page }) => {
    const neutro = await medir(page, { props: ['--dss-action-primary'] })
    const hub = await medir(page, { brand: 'hub', props: ['--dss-action-primary'] })
    const zona = await medir(page, {
      brand: 'hub',
      zone: 'content',
      props: ['--dss-action-primary'],
    })

    expect(zona['--dss-action-primary']).toBe(neutro['--dss-action-primary'])
    expect(zona['--dss-action-primary']).not.toBe(hub['--dss-action-primary'])
  })

  test('na zona de conteúdo, o eixo de IDENTIDADE CONTINUA brandeado', async ({ page }) => {
    // O coração do modelo de dois eixos: a barreira reseta a AÇÃO, nunca a IDENTIDADE.
    // Sem isto, ornamento de marca (régua de título, logo) perderia a cor do produto.
    const hub = await medir(page, { brand: 'hub', props: ['--dss-brand-primary'] })
    const zona = await medir(page, {
      brand: 'hub',
      zone: 'content',
      props: ['--dss-brand-primary'],
    })

    expect(zona['--dss-brand-primary']).toBe(hub['--dss-brand-primary'])
  })

  test('a ponte --q-primary acompanha a barreira', async ({ page }) => {
    // Risco técnico #1: `--q-primary` alimenta as utilitárias do Quasar, que vivem
    // em @layer quasar com !important e VENCEM o CSS DSS unlayered. Se a ponte não
    // recomputasse na zona, o resultado seria meio semântico, meio brandeado.
    const neutro = await medir(page, { props: ['--q-primary'] })
    const zona = await medir(page, { brand: 'hub', zone: 'content', props: ['--q-primary'] })

    expect(zona['--q-primary']).toBe(neutro['--q-primary'])
  })

  test('.bg-primary (utilitária Quasar) pinta semântico dentro da zona', async ({ page }) => {
    // A prova de ponta a ponta: tinta real, não valor de token.
    const neutro = await medir(page, { props: [], classe: 'bg-primary' })
    const hub = await medir(page, { brand: 'hub', props: [], classe: 'bg-primary' })
    const zona = await medir(page, {
      brand: 'hub',
      zone: 'content',
      props: [],
      classe: 'bg-primary',
    })

    expect(hub['__bg']).not.toBe(neutro['__bg'])
    expect(zona['__bg']).toBe(neutro['__bg'])
  })

  test('o anel de foco também volta ao semântico', async ({ page }) => {
    const neutro = await medir(page, { props: ['--dss-focus-primary'] })
    const hub = await medir(page, { brand: 'hub', props: ['--dss-focus-primary'] })
    const zona = await medir(page, { brand: 'hub', zone: 'content', props: ['--dss-focus-primary'] })

    expect(hub['--dss-focus-primary']).not.toBe(neutro['--dss-focus-primary'])
    expect(zona['--dss-focus-primary']).toBe(neutro['--dss-focus-primary'])
  })
})

test.describe('Barreira de marca — tema escuro', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('no escuro, a zona NÃO devolve o disable claro', async ({ page }) => {
    // Regressão real detectada ao desenhar a barreira: o dark sobrescreve
    // `--dss-action-primary-disable` (gray-600). Uma barreira ingênua re-resolveria
    // para o primitivo CLARO dentro do escuro. Mede-se porque não erra, só fica errado.
    //
    // A baseline é o escuro SEM marca. Com marca ela não serve: `[data-brand]` cai
    // num elemento DESCENDENTE do que carrega `[data-theme]`, então o `-disable` da
    // marca (hub-200, claro) vence o do escuro ali. Essa precedência é anterior à
    // barreira e não é o que este teste mede.
    const escuroBase = await medir(page, {
      theme: 'dark',
      props: ['--dss-action-primary-disable'],
    })
    const claroBase = await medir(page, { props: ['--dss-action-primary-disable'] })
    const escuroNaZona = await medir(page, {
      theme: 'dark',
      brand: 'hub',
      zone: 'content',
      props: ['--dss-action-primary-disable'],
    })

    // a zona entrega o valor do ESCURO…
    expect(escuroNaZona['--dss-action-primary-disable']).toBe(
      escuroBase['--dss-action-primary-disable']
    )
    // …e não o primitivo claro, que é o que uma barreira ingênua devolveria.
    expect(escuroNaZona['--dss-action-primary-disable']).not.toBe(
      claroBase['--dss-action-primary-disable']
    )
  })
})

test.describe('Barreira de marca — casca aninhada', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('uma casca dentro do conteúdo REENTRA a marca', async ({ page }) => {
    const { hub, zona, cascaAninhada } = await page.evaluate(() => {
      const host = document.createElement('div')
      host.setAttribute('data-brand', 'hub')

      const conteudo = document.createElement('div')
      conteudo.setAttribute('data-brand-zone', 'content')
      host.appendChild(conteudo)

      const casca = document.createElement('div')
      casca.setAttribute('data-brand-zone', 'shell')
      conteudo.appendChild(casca)

      document.body.appendChild(host)
      const ler = (el: Element) =>
        getComputedStyle(el).getPropertyValue('--dss-action-primary').trim()
      const r = { hub: ler(host), zona: ler(conteudo), cascaAninhada: ler(casca) }
      document.body.removeChild(host)
      return r
    })

    expect(zona).not.toBe(hub)
    expect(cascaAninhada).toBe(hub)
  })
})
