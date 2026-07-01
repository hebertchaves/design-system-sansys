import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar()
  ],
  server: {
    // WSL2 + repositório em /mnt/c (drive Windows): o inotify NÃO dispara de
    // forma confiável nesse mount, então o HMR não detecta mudanças de arquivo
    // (causa raiz dos "stale" — só atualizava ao reiniciar o dev). Polling força
    // o Vite a varrer os arquivos e resolve o HMR de forma definitiva.
    watch: {
      usePolling: true,
      interval: 300,
    },
    proxy: {
      '/api': 'http://localhost:3001',
    },
    fs: {
      allow: [resolve(__dirname, '../..')]
    },
  },
  resolve: {
    alias: {
      // Raiz do core — Regra de Ouro do DSS_MONOREPO_PATH_MAP (sem imports
      // relativos inter-pacote; criado na Onda P2)
      '@core': resolve(__dirname, '../../packages/core'),
      '@dss': resolve(__dirname, '../../packages/core/components/base'),
      '@components': resolve(__dirname, '../../packages/core/components'),
      'react': resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime']
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        // silenceDeprecations: ['import'] REMOVIDO (Onda P2): o codebase
        // migrou 100% para @use na Onda P0/T7.1 — silenciar deprecações
        // voltaria a mascarar regressões (princípio anti-máscara).
      }
    }
  },
  build: {
    rollupOptions: {
      external: ['quasar'],
    }
  }
})