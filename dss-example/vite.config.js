import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@sansys/design-system': resolve(__dirname, '../dist/dss.es.js')
    }
  }
})
