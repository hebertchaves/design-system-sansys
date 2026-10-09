import { test, expect } from '@playwright/test'

const executionStates = [
  ['empty', 'info'], ['loading', 'info'], ['error', 'error'], ['apt', 'success'],
  ['alerts', 'warning'], ['mixed', 'error'], ['timeout', 'warning'], ['stale', 'warning'],
] as const

for (const [scenario, tone] of executionStates) {
  test(`execution feedback has one owner in ${scenario}`, async ({ page }) => {
    await page.goto(`/?screen=nfag-parallel&scenario=${scenario}`)
    const result = page.locator('.nf-summary')
    await expect(result).toHaveCount(1)
    await expect(result).toHaveClass(new RegExp(`nf-tone--${tone}`))
    await expect(page.locator('.nf-layout .dss-banner')).toHaveCount(0)
  })
}

test('read error retry transitions through running to a completed result without a duplicate banner', async ({ page }) => {
  await page.goto('/?screen=nfag-parallel&scenario=error')
  const result = page.locator('.nf-summary')
  await expect(result).toHaveClass(/nf-tone--error/)
  await page.getByRole('button', { name: 'Executar verificação', exact: true }).click()
  await expect(result).toHaveAttribute('aria-busy', 'true')
  await expect(result).toHaveClass(/nf-tone--info/)
  await expect(page.locator('.nf-layout .dss-banner')).toHaveCount(0)
  await expect(result).toHaveAttribute('aria-busy', 'false')
  await expect(result).toHaveClass(/nf-tone--error/)
  await expect(page.locator('.nf-layout .dss-banner')).toHaveCount(0)
  await page.getByRole('button', { name: 'Consultar', exact: true }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
})

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
test('stakeholder context preserves execution and filtering', async ({ page }) => {
  await page.goto('/')
  await page.getByText('Check-in NFAg · paralelo', { exact: true }).click()
  await expect(page.locator('.nf-layout')).toHaveAttribute('data-theme', 'light')
  await expect(page.locator('.nf-layout')).toHaveAttribute('data-brand', 'water')
  await expect(page.getByRole('button', { name: 'Consultar', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Relatório PDF', exact: true })).toBeDisabled()
  await page.getByRole('button', { name: 'Ativar modo escuro', exact: true }).click()
  await page.getByRole('button', { name: 'Marca Waste', exact: true }).click()
  await expect(page.locator('.nf-layout')).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('.nf-layout')).toHaveAttribute('data-brand', 'waste')
  await page.getByRole('button', { name: 'Executar verificação', exact: true }).click()
  await expect(page.locator('.nf-summary')).toHaveAttribute('aria-busy', 'false')
  await page.getByRole('button', { name: 'Filtrar falhas', exact: true }).click()
  await expect(page.locator('.nf-check')).toHaveCount(3)
  await page.getByRole('button', { name: 'Ativar modo claro', exact: true }).click()
  await page.getByRole('button', { name: 'Marca Water', exact: true }).click()
  await expect(page.locator('.nf-check')).toHaveCount(3)
  await expect(page.getByRole('button', { name: 'Consultar', exact: true })).toHaveCount(1)
})
