import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  build: {
    lib: {
      // Ponto de entrada da biblioteca
      entry: resolve(__dirname, 'index.js'),
      name: 'DesignSystemSansys',
      // Função para nomear os arquivos de saída
      fileName: (format) => `dss.${format}.js`
    },

    rollupOptions: {
      // Externalize peer dependencies (Vue não deve ser bundled)
      external: ['vue'],

      output: {
        // Globals para UMD build
        globals: {
          vue: 'Vue'
        },

        // Preservar nomes de exports
        exports: 'named',

        // Configuração de assets (CSS)
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css'
          }
          return assetInfo.name
        }
      }
    },

    // Otimizações
    minify: 'terser',
    sourcemap: true,

    // Diretório de saída
    outDir: 'dist',
    emptyOutDir: true
  },

  // Resolve paths
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@components': resolve(__dirname, 'components'),
      '@tokens': resolve(__dirname, 'tokens'),
      '@themes': resolve(__dirname, 'themes'),
      '@utils': resolve(__dirname, 'utils')
    }
  }
})
