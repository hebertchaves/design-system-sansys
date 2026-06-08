import { test, expect } from '@playwright/test'
import { UTILITY_CLASSES, QUASAR_DEFAULT_PRIMARY } from '../../helpers/tokenMatrix.js'

test.describe('Classes Utilitárias — Resolução via Tokens DSS', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  for (const { cls, prop, token } of UTILITY_CLASSES) {
    test(`.${cls} usa ${token}`, async ({ page }) => {
      const { utilColor, tokenColor } = await page.evaluate(
        ({ cls, prop, token }) => {
          const el = document.createElement('div')
          el.className = cls
          document.body.appendChild(el)
          const utilColor = getComputedStyle(el)[prop as keyof CSSStyleDeclaration] as string
          document.body.removeChild(el)

          const probe = document.createElement('div')
          probe.style[prop as any] = `var(${token})`
          document.body.appendChild(probe)
          const tokenColor = getComputedStyle(probe)[prop as keyof CSSStyleDeclaration] as string
          document.body.removeChild(probe)

          return { utilColor, tokenColor }
        },
        { cls, prop, token }
      )

      expect(utilColor).toBe(tokenColor)
      if (cls.includes('primary')) {
        expect(utilColor).not.toBe(QUASAR_DEFAULT_PRIMARY)
      }
    })
  }
})
