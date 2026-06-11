import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import vue from '@vitejs/plugin-vue';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      {
        // Testes unitários dos componentes DSS (gate de build do CLAUDE.md).
        // Antes da Onda P0 não existia projeto para os *.test.js — o gate
        // nunca foi executável (achado da Auditoria Final Jun/2026).
        plugins: [vue()],
        resolve: {
          alias: {
            // O pacote oficial exige vitest ^1||^2||^3 (repo usa v4).
            // Shim local com API idêntica (installQuasar) — ver o arquivo.
            '@quasar/quasar-app-extension-testing-unit-vitest': path.join(
              dirname,
              'test/quasar-vitest-helper.js'
            ),
            // Em ambiente node o exports map do Quasar resolve para o build
            // SSR (quasar.server.prod.js), cujo install() exige ssrContext.
            // Os testes unit rodam em jsdom — usar o build client.
            quasar: path.join(
              dirname,
              '../../node_modules/quasar/dist/quasar.client.js'
            ),
          },
        },
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          include: ['components/**/*.test.js'],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
