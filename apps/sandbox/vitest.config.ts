import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/regression/static/**/*.spec.ts'],
    globals: true,
  },
})
