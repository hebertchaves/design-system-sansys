# 🎨 Design System Sansys (DSS)

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.4+-4FC08D.svg?logo=vue.js)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![WCAG](https://img.shields.io/badge/WCAG-2.1%20AA-success.svg)

**Sistema de Design profissional com componentes Vue 3, tokens semânticos e acessibilidade WCAG 2.1 AA**

[Documentação](#-documentação) •
[Instalação](#-instalação) •
[Componentes](#-componentes) •
[Exemplos](#-exemplos)

</div>

---

## ✨ **Características**

- ✅ **Componentes Vue 3** - Composition API + Options API
- ✅ **Tokens DSS** - Sistema completo de design tokens semânticos
- ✅ **Acessibilidade WCAG 2.1 AA** - Touch targets, contraste, navegação por teclado
- ✅ **Brandabilidade** - Hub 🟠, Water 🔵, Waste 🟢
- ✅ **Dark Mode Support** - Temas claro e escuro
- ✅ **TypeScript Ready** - Tipagens completas (em desenvolvimento)
- ✅ **Tree-shakeable** - Importe apenas o que você usa
- ✅ **Zero Hardcoded Values** - 100% baseado em tokens
- ✅ **Arquitetura em 4 Camadas** - Structure → Composition → Variants → Output
- 🔥 **Padrão Quasar Framework** - Classes utilitárias globais (97% de redução de código)

---

## 📦 **Instalação**

### NPM

```bash
npm install @sansys/design-system
```

### Yarn

```bash
yarn add @sansys/design-system
```

### PNPM

```bash
pnpm add @sansys/design-system
```

---

## 🚀 **Quick Start**

### **Opção 1: Plugin Global (Recomendado)**

Registra todos os componentes globalmente no app Vue.

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Importar plugin e CSS
import DesignSystemSansys from '@sansys/design-system'
import '@sansys/design-system/css'

const app = createApp(App)

// Registrar plugin
app.use(DesignSystemSansys, {
  brand: 'hub' // opcional: hub, water, waste
})

app.mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <!-- Componentes disponíveis globalmente -->
  <DssButton color="primary" @click="handleClick">
    Clique Aqui
  </DssButton>

  <DssCard variant="elevated">
    <DssCardSection>
      <h2>Meu Card</h2>
      <DssInput v-model="nome" variant="outlined" label="Nome" />
    </DssCardSection>
  </DssCard>
</template>

<script setup>
import { ref } from 'vue'

const nome = ref('')

function handleClick() {
  console.log('Botão clicado!')
}
</script>
```

---

### **Opção 2: Importação Individual (Tree-shaking)**

Importe apenas os componentes que você precisa.

```vue
<template>
  <DssButton color="primary" @click="handleClick">
    Clique Aqui
  </DssButton>
</template>

<script setup>
import { DssButton } from '@sansys/design-system'
import '@sansys/design-system/css'

const handleClick = () => console.log('Clicado!')
</script>
```

---

## 🧩 **Componentes Disponíveis**

### **DssButton** - Botão completo com 6 variantes

```vue
<DssButton variant="elevated" color="primary" size="md">
  Clique Aqui
</DssButton>
```

[📖 Documentação completa](./components/base/DssButton/DssButton.md)

### **DssCard** - Card flexível com composição

```vue
<DssCard variant="elevated">
  <DssCardSection>
    <h2>Título</h2>
  </DssCardSection>
  <DssCardActions>
    <DssButton color="primary">OK</DssButton>
  </DssCardActions>
</DssCard>
```

### **DssInput** - Input de formulário com validação

```vue
<DssInput
  v-model="nome"
  variant="outlined"
  label="Nome"
  :error="nome.length < 3"
  error-message="Mínimo 3 caracteres"
/>
```

---

## 🎨 **Brandabilidade**

```vue
<!-- Hub (Laranja) -->
<DssButton brand="hub" color="primary">Hub</DssButton>

<!-- Water (Azul) -->
<DssButton brand="water" color="primary">Water</DssButton>

<!-- Waste (Verde) -->
<DssButton brand="waste" color="primary">Waste</DssButton>
```

---

## ♿ **Acessibilidade WCAG 2.1 AA**

- ✅ Contraste 4.5:1
- ✅ Touch targets 48×48px
- ✅ Navegação por teclado
- ✅ Focus visível
- ✅ ARIA labels
- ✅ Reduced motion support

---

## 📚 **Documentação**

### **Arquitetura e Padrões**
- **[DSS_ARCHITECTURE_GUIDE.md](./DSS_ARCHITECTURE_GUIDE.md)** - Arquitetura em 4 camadas
- **[DSS_IMPLEMENTATION_GUIDE.md](./DSS_IMPLEMENTATION_GUIDE.md)** - Guia completo de implementação
- **[REFACTORING_QUASAR_PATTERN.md](./REFACTORING_QUASAR_PATTERN.md)** 🔥 - Padrão Quasar Framework (classes utilitárias)

### **Por Componente**
- **[DssButton](./components/base/DssButton/README.md)** - Botão completo
- **[DssBadge](./components/base/DssBadge/README.md)** - Badge/contador
- **[DssAvatar](./components/base/DssAvatar/README.md)** - Avatar
- **[DssCard](./components/base/DssCard/README.md)** - Card
- **[DssInput](./components/base/DssInput/README.md)** - Input

---

## 🛠️ **Desenvolvimento**

```bash
# Instalar dependências
npm install

# Build completo (CSS + JavaScript)
npm run build

# Build do CSS (compila SCSS → CSS para desenvolvimento)
npm run build:css

# Build dos componentes Vue (compila .vue → JavaScript)
npm run build:lib

# Watch mode (recompila automaticamente)
npm run build:watch

# Rodar exemplo local
cd dss-example
npm run dev
```

### ⚠️ **Importante: Build de Componentes**

**Sempre execute `npm run build:lib` após modificar arquivos `.vue`!**

Modificar componentes Vue **NÃO** atualiza automaticamente o diretório `dist/`. É necessário recompilar com `npm run build:lib` para que as mudanças sejam aplicadas.

**Ver:** [PROBLEMA_CORES_RESOLVIDO.md](./PROBLEMA_CORES_RESOLVIDO.md) para mais detalhes.

---

## 📝 **Licença**

MIT © 2025 Sansys/Veolia

Desenvolvido com ❤️ por Hebert Daniel Oliveira Chaves
