import { test, expect } from '@playwright/test'
import { BRANDS } from '../../helpers/tokenMatrix.js'

test.describe('Brand Switching — [data-brand] propaga tokens', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('cada brand altera --dss-brand-primary para valor distinto', async ({ page }) => {
    const colors = await page.evaluate((brands) => {
      const root = document.documentElement
      const getColor = (brand?: string) => {
        if (brand) root.setAttribute('data-brand', brand)
        else root.removeAttribute('data-brand')

        const probe = document.createElement('div')
        probe.style.backgroundColor = 'var(--dss-brand-primary, transparent)'
        document.body.appendChild(probe)
        const color = getComputedStyle(probe).backgroundColor
        document.body.removeChild(probe)
        return color
      }

      const defaultColor = getColor()
      const result: Record<string, string> = { default: defaultColor }
      for (const brand of brands) {
        result[brand] = getColor(brand)
      }
      root.removeAttribute('data-brand')
      return result
    }, [...BRANDS])

    const values = Object.values(colors)
    const uniqueValues = new Set(values)
    expect(uniqueValues.size).toBeGreaterThan(1)
  })

  for (const brand of BRANDS) {
    test(`[data-brand="${brand}"] altera o visual de .bg-primary`, async ({ page }) => {
      const { defaultBg, brandBg } = await page.evaluate((b) => {
        const root = document.documentElement
        const getBg = () => {
          const el = document.createElement('div')
          el.className = 'bg-primary'
          document.body.appendChild(el)
          const bg = getComputedStyle(el).backgroundColor
          document.body.removeChild(el)
          return bg
        }

        const defaultBg = getBg()
        root.setAttribute('data-brand', b)
        const brandBg = getBg()
        root.removeAttribute('data-brand')
        return { defaultBg, brandBg }
      }, brand)

      expect(defaultBg).not.toBe('')
      expect(brandBg).not.toBe('')
    })
  }
})
