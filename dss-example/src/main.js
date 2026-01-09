import { createApp } from 'vue'
import App from './App.vue'

// Importar Design System Sansys
import DesignSystemSansys from '@sansys/design-system'

const app = createApp(App)

// Registrar plugin globalmente (todos os componentes disponíveis)
app.use(DesignSystemSansys, {
  brand: 'hub' // Define brand padrão: hub, water, ou waste
})

app.mount('#app')
