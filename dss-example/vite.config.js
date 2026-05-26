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
      // Garante que React resolve para a mesma instância no ESM do grid-inspector
      'react': resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': resolve(__dirname, 'node_modules/react/jsx-runtime'),
    },
    // Deduplica React — evita instâncias duplas entre o host e o grid-inspector
    dedupe: ['react', 'react-dom'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Silencia warnings de deprecação do Sass moderno
        quietDeps: true,
      }
    }
  },
  build: {
    rollupOptions: {
      // O Quasar é instalado como dependência no dss-example e registrado
      // via app.use(Quasar, ...) no main.ts. No build de produção, o Rollup
      // não consegue resolver imports diretos de 'quasar' nos componentes DSS
      // (que importam QBtn, QInput, etc.) porque o Quasar usa tree-shaking
      // interno. Externalizando, o Rollup deixa esses imports para o runtime.
      external: ['quasar'],
    }
  }
})
