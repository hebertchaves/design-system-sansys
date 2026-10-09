import { test, expect } from '@playwright/test'

test('bulk expansion follows visible checks, including individual changes and KPI filtering', async ({ page }) => {
  await page.goto('/?screen=nfag-parallel&scenario=mixed')
  const checks = page.locator('.nf-check')
  await expect(checks).toHaveCount(11)
  await page.getByRole('button', { name: 'Expandir tudo', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Recolher tudo', exact: true })).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('.nf-detail:visible')).toHaveCount(11)
  await checks.first().locator('.q-item').first().click()
  await expect(page.getByRole('button', { name: 'Expandir tudo', exact: true })).toHaveAttribute('aria-expanded', 'false')
  await page.getByRole('button', { name: 'Filtrar falhas', exact: true }).click()
  await expect(checks).toHaveCount(3)
  await page.getByRole('button', { name: 'Recolher tudo', exact: true }).click()
  await expect(page.locator('.nf-detail:visible')).toHaveCount(0)
  await page.getByRole('button', { name: 'Expandir tudo', exact: true }).click()
  await expect(page.locator('.nf-detail:visible')).toHaveCount(3)
})