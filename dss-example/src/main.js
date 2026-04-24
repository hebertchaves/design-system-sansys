import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'

const app = createApp(App)

// Registrar Quasar (JS apenas — CSS já carregado via dss-full.css no index.html)
app.use(Quasar, { config: {} })

app.mount('#app')
