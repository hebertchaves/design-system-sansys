import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'

const app = createApp(App)

// Registrar Quasar (JS apenas — CSS já carregado via dss-full.css no index.html)
app.use(Quasar, { config: {} })

app.mount('#app')

// Grid Inspector — apenas em desenvolvimento
if (import.meta.env.DEV) {
  Promise.all([
    import('@sansys/grid-inspector'),
    import('@sansys/grid-inspector/styles').catch(() => {}),
  ]).then(([{ injectGridInspector }]) => {
    injectGridInspector({
      debug: false,
      config: {
        contentSelector: '.test-content',
      },
    });
  });
}
