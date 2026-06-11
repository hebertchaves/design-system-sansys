/**
 * Shim local de @quasar/quasar-app-extension-testing-unit-vitest.
 *
 * O pacote oficial (v1.2.4) declara peer vitest ^1||^2||^3 e o monorepo usa
 * vitest 4 — instalação impossível sem downgrade. Este shim replica a única
 * API consumida pelos testes DSS (installQuasar) e é resolvido via alias no
 * vitest.config.ts do core (projeto "unit").
 *
 * Referência: https://github.com/quasarframework/quasar-testing (unit-vitest)
 */
import { config } from '@vue/test-utils'
import { Quasar } from 'quasar'
import { beforeAll, afterAll } from 'vitest'

export function installQuasar(options = {}) {
  beforeAll(() => {
    config.global.plugins.unshift([Quasar, options])
  })
  afterAll(() => {
    const idx = config.global.plugins.findIndex(
      (p) => Array.isArray(p) && p[0] === Quasar
    )
    if (idx !== -1) config.global.plugins.splice(idx, 1)
  })
}
