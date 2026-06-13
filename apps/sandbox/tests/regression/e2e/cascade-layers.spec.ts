import { test, expect } from '@playwright/test'
import { QUASAR_DEFAULT_PRIMARY } from '../../helpers/tokenMatrix.js'

/** Resolve um CSS custom property para seu valor RGB final via canvas trick. */
async function resolveToken(page: Parameters<typeof test>[1]['page'], token: string): Promise<string> {
  return page.evaluate((t) => {
    const el = document.createElement('div')
    el.style.color = `var(${t})`
    document.body.appendChild(el)
    const resolved = getComputedStyle(el).color
    document.body.removeChild(el)
    return resolved
  }, token)
}

test.describe('Cascade Layers — Browser Real', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('@layer quasar não vence .bg-primary do DSS', async ({ page }) => {
    const bg = await page.evaluate(() => {
      const el = document.createElement('div')
      el.className = 'bg-primary'
      document.body.appendChild(el)
      const color = getComputedStyle(el).backgroundColor
      document.body.removeChild(el)
      return color
    })

    expect(bg).not.toBe(QUASAR_DEFAULT_PRIMARY)
    expect(bg).not.toBe('')
    expect(bg).not.toBe('rgba(0, 0, 0, 0)')
  })

  test('.bg-primary renderiza com --dss-action-primary', async ({ page }) => {
    const { bgColor, tokenColor } = await page.evaluate(() => {
      const el = document.createElement('div')
      el.className = 'bg-primary'
      document.body.appendChild(el)
      const bgColor = getComputedStyle(el).backgroundColor
      document.body.removeChild(el)

      const probe = document.createElement('div')
      probe.style.backgroundColor = 'var(--dss-action-primary)'
      document.body.appendChild(probe)
      const tokenColor = getComputedStyle(probe).backgroundColor
      document.body.removeChild(probe)

      return { bgColor, tokenColor }
    })

    expect(bgColor).toBe(tokenColor)
  })

  test('sandbox carrega sem erros de console (layer configurado corretamente)', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    const cssErrors = errors.filter(e => e.toLowerCase().includes('css') || e.toLowerCase().includes('layer'))
    expect(cssErrors).toHaveLength(0)
  })
})
