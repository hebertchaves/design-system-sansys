import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'

const app = createApp(App)

// Registrar Quasar (JS apenas — CSS já carregado via dss-full.css no index.html)
app.use(Quasar, { config: {} })

app.mount('#app')

// Grid Inspector — apenas em desenvolvimento
if (import.meta.env.DEV) {
  import('@sansys/grid-inspector').then(({ injectGridInspector }) => {
    import('@sansys/grid-inspector/styles').catch(() => {
      // CSS já pode estar carregado via vite
    });
    injectGridInspector({
      debug: false,
      config: {
        // Aponta para a área de conteúdo do Test Suite
        // Altere para o seletor do grid real quando disponível
        contentSelector: '.test-content',
      },
    });
  });
}
