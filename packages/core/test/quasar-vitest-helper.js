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
import * as quasarExports from 'quasar'
import { beforeAll, afterAll } from 'vitest'

const { Quasar } = quasarExports

// Componentes DSS usam <q-*> nos templates sem import local (registro
// global feito pelo app via app.use(Quasar)). Nos testes, replicamos o
// registro global passando todos os QComponents para o install do plugin.
const quasarComponents = Object.fromEntries(
  Object.entries(quasarExports).filter(
    ([name, value]) => /^Q[A-Z]/.test(name) && value && typeof value === 'object'
  )
)

export function installQuasar(options = {}) {
  beforeAll(() => {
    config.global.plugins.unshift([
      Quasar,
      { components: quasarComponents, ...options },
    ])
  })
  afterAll(() => {
    const idx = config.global.plugins.findIndex(
      (p) => Array.isArray(p) && p[0] === Quasar
    )
    if (idx !== -1) config.global.plugins.splice(idx, 1)
  })
}

// Alias da API antiga do kit de testes Quasar (alguns testes DSS usam
// installQuasarPlugin; outros, installQuasar — mesma função)
export const installQuasarPlugin = installQuasar
