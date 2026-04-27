import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  resolve: {
    alias: {
      // Alias para importar componentes DSS diretamente do source
      '@dss': resolve(__dirname, '../components/base'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Silencia warnings de deprecação do Sass moderno
        quietDeps: true,
      }
    }
  }
})
