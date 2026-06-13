import { test, expect } from '@playwright/test'
import { BRIDGE_PAIRS, QUASAR_DEFAULT_PRIMARY } from '../../helpers/tokenMatrix.js'

test.describe('Token Bridge --q-* → --dss-* — Browser Real', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  for (const [qVar, dssVar] of BRIDGE_PAIRS) {
    test(`${qVar} resolve para o mesmo valor que ${dssVar}`, async ({ page }) => {
      const { qColor, dssColor } = await page.evaluate(
        ([q, d]) => {
          const toColor = (varName: string) => {
            const el = document.createElement('div')
            el.style.backgroundColor = `var(${varName})`
            document.body.appendChild(el)
            const color = getComputedStyle(el).backgroundColor
            document.body.removeChild(el)
            return color
          }
          return { qColor: toColor(q), dssColor: toColor(d) }
        },
        [qVar, dssVar] as [string, string]
      )

      expect(qColor).toBe(dssColor)
      expect(qColor).not.toBe(QUASAR_DEFAULT_PRIMARY)
      expect(qColor).not.toBe('')
      expect(qColor).not.toBe('rgba(0, 0, 0, 0)')
    })
  }

  test('--q-primary NÃO é a cor default do Quasar (bridge ativa)', async ({ page }) => {
    const color = await page.evaluate(() => {
      const el = document.createElement('div')
      el.style.backgroundColor = 'var(--q-primary)'
      document.body.appendChild(el)
      const c = getComputedStyle(el).backgroundColor
      document.body.removeChild(el)
      return c
    })
    expect(color).not.toBe(QUASAR_DEFAULT_PRIMARY)
  })
})
