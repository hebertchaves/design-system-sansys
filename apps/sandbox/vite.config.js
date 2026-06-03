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
    proxy: {
      '/api': 'http://localhost:3001',
    },
    fs: {
      allow: [resolve(__dirname, '../..')]
    },
  },
  resolve: {
    alias: {
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
        silenceDeprecations: ['import'],
      }
    }
  },
  build: {
    rollupOptions: {
      external: ['quasar'],
    }
  }
})