# DssAvatar API - Documentação Completa

## 📋 Visão Geral

O `DssAvatar` é um componente de avatar **100% compatível com a API do Quasar Framework**, implementado seguindo rigorosamente as especificações oficiais do `q-avatar`.

---

## 🎯 Props Completas

### **Dimensões**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------| | `size` | String | `null` | Tamanho customizado (aceita qualquer unidade CSS: px, rem, em, etc.) |
| `fontSize` | String | `null` | Tamanho da fonte do conteúdo (aceita qualquer unidade CSS) |

**Exemplo:**
```vue
<!-- Tamanho padrão (48px) -->
<DssAvatar>JD</DssAvatar>

<!-- Tamanhos customizados -->
<DssAvatar size="32px">JD</DssAvatar>
<DssAvatar size="64px">JD</DssAvatar>
<DssAvatar size="80px">JD</DssAvatar>
<DssAvatar size="5rem">JD</DssAvatar>

<!-- Font size customizado -->
<DssAvatar size="64px" font-size="24px">JD</DssAvatar>
```

---

### **Cores**

| Prop | Tipo | Default | Valores | Descrição |
|------|------|---------|---------|-----------| | `color` | String | `null` | `primary`, `secondary`, `tertiary`, `accent`, `positive`, `negative`, `warning`, `info` | Cor de fundo do avatar |
| `textColor` | String | `null` | Qualquer cor semântica | Cor do texto/ícone |

**Exemplo:**
```vue
<DssAvatar color="primary">JD</DssAvatar>
<DssAvatar color="secondary">AB</DssAvatar>
<DssAvatar color="positive">✓</DssAvatar>
<DssAvatar color="primary" text-color="white">JD</DssAvatar>
```

---

### **Ícone**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------| | `icon` | String | `null` | Material Icon name |

**Exemplo:**
```vue
<DssAvatar icon="person" color="primary" />
<DssAvatar icon="account_circle" color="secondary" />
<DssAvatar icon="business" color="accent" />
```

---

### **Forma**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------| | `square` | Boolean | `false` | Avatar quadrado (sem border-radius) |
| `rounded` | Boolean | `false` | Avatar com bordas arredondadas (não circular) |

**Exemplo:**
```vue
<!-- Circular (padrão) -->
<DssAvatar color="primary">JD</DssAvatar>

<!-- Quadrado -->
<DssAvatar square color="secondary">AB</DssAvatar>

<!-- Arredondado (meio-termo) -->
<DssAvatar rounded color="accent">XY</DssAvatar>
```

---

## 🎨 Slots

| Slot | Descrição |
|------|-----------| | `default` | Conteúdo do avatar (texto, imagem, ícones customizados) |

**Exemplo:**
```vue
<!-- Texto simples -->
<DssAvatar color="primary">
  JD
</DssAvatar>

<!-- Imagem -->
<DssAvatar>
  <img src="/path/to/avatar.jpg" alt="John Doe">
</DssAvatar>

<!-- Ícone customizado -->
<DssAvatar color="primary">
  <span class="material-icons">person</span>
</DssAvatar>

<!-- Múltiplos elementos -->
<DssAvatar color="secondary">
  <strong>JD</strong>
</DssAvatar>
```

---

## 🎬 Casos de Uso Comuns

### **1. Avatar com Iniciais**

```vue
<template>
  <DssAvatar
    color="primary"
    size="48px"
  >
    {{ userInitials }}
  </DssAvatar>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: Object
})

const userInitials = computed(() => {
  const names = props.user.name.split(' ')
  return names[0][0] + (names[1]?.[0] || '')
})
</script>
```

### **2. Avatar com Imagem**

```vue
<DssAvatar size="64px">
  <img :src="user.avatarUrl" :alt="user.name">
</DssAvatar>
```

### **3. Avatar com Ícone**

```vue
<DssAvatar icon="person" color="primary" size="48px" />
<DssAvatar icon="business" color="secondary" size="48px" />
<DssAvatar icon="group" color="accent" size="48px" />
```

### **4. Avatar com Status Indicator**

```vue
<DssAvatar color="primary" class="dss-avatar--with-status dss-avatar--status-online">
  JD
</DssAvatar>

<DssAvatar color="secondary" class="dss-avatar--with-status dss-avatar--status-away">
  AB
</DssAvatar>
```

### **5. Grupo de Avatars (Sobreposição)**

```vue
<div class="dss-avatar-group">
  <DssAvatar color="primary">JD</DssAvatar>
  <DssAvatar color="secondary">AB</DssAvatar>
  <DssAvatar color="accent">XY</DssAvatar>
  <DssAvatar color="info">+5</DssAvatar>
</div>
```

### **6. Avatar em Diferentes Tamanhos**

```vue
<!-- Extra Small -->
<DssAvatar size="32px" color="primary">JS</DssAvatar>

<!-- Small -->
<DssAvatar size="40px" color="secondary">AB</DssAvatar>

<!-- Medium (padrão) -->
<DssAvatar color="accent">XY</DssAvatar>

<!-- Large -->
<DssAvatar size="64px" color="positive">LG</DssAvatar>

<!-- Extra Large -->
<DssAvatar size="80px" color="info">XL</DssAvatar>
```

### **7. Avatar Quadrado para Empresas**

```vue
<DssAvatar
  square
  color="primary"
  icon="business"
  size="64px"
/>

<DssAvatar
  square
  size="64px"
>
  <img src="/logo.png" alt="Company Logo">
</DssAvatar>
```

### **8. Avatar Clicável**

```vue
<button class="dss-avatar" @click="openProfile">
  <DssAvatar color="primary">JD</DssAvatar>
</button>

<a href="/profile" class="dss-avatar">
  <DssAvatar color="secondary">AB</DssAvatar>
</a>
```

---

## 🎯 Integração com Outros Componentes

### **Com DssBadge**

```vue
<DssAvatar color="primary" icon="person" size="48px">
  <DssBadge floating color="positive" />
</DssAvatar>

<DssAvatar color="secondary" size="48px">
  AB
  <DssBadge floating color="negative" label="3" />
</DssAvatar>
```

### **Com DssButton**

```vue
<DssButton>
  <DssAvatar size="32px" color="primary">JD</DssAvatar>
  John Doe
</DssButton>
```

### **Em Listas de Comentários**

```vue
<div class="comment">
  <DssAvatar color="primary">JD</DssAvatar>
  <div class="comment-content">
    <strong>John Doe</strong>
    <p>Great article!</p>
  </div>
</div>
```

### **Em Cards de Perfil**

```vue
<DssCard>
  <div style="text-align: center; padding: 24px;">
    <DssAvatar
      color="primary"
      size="96px"
      icon="person"
    />
    <h3>John Doe</h3>
    <p>Software Engineer</p>
  </div>
</DssCard>
```

---

## ✅ Compatibilidade com Quasar

### Props 100% Implementadas:
✅ `size` - Tamanho customizável (qualquer unidade CSS)
✅ `fontSize` - Font size customizável
✅ `color` - Cor semântica
✅ `textColor` - Cor do texto/ícone
✅ `icon` - Material Icons
✅ `square` - Forma quadrada
✅ `rounded` - Bordas arredondadas

### Props Adicionadas pelo DSS:
🟠 `color="tertiary"` - Cor terciária (#ff6607)

### Recursos Extras do DSS:
🟠 `.dss-avatar-group` - Grupo de avatars com sobreposição
🟠 `.dss-avatar--with-status` - Indicadores de status (online, away, busy, offline)
🟠 Estados hover/active para avatars clicáveis

### Diferenças:
- **Quasar** usa `q-avatar`, **DSS** usa `DssAvatar`
- **DSS** adiciona cor `tertiary` como semântica
- **DSS** usa tokens DSS para consistência visual
- **DSS** adiciona utilidades extras para status e grupos

---

## 📐 Dimensões Padrão

| Tamanho | Width/Height | Font Size | Icon Size | Uso |
|---------|--------------|-----------|-----------|------|
| **xs** | 32px | 12px | 16px | Listas compactas |
| **sm** | 40px | 14px | 20px | Comentários |
| **md** | 48px | 16px | 24px | Padrão |
| **lg** | 64px | 18px | 32px | Perfis |
| **xl** | 80px | 20px | 48px | Páginas de perfil |

---

## 🎨 Classes CSS Geradas

```scss
.dss-avatar                   // Base
.dss-avatar--primary          // Cor primária
.dss-avatar--square           // Quadrado
.dss-avatar--rounded          // Arredondado
.dss-avatar--xs               // Extra small
.dss-avatar--sm               // Small
.dss-avatar--lg               // Large
.dss-avatar--xl               // Extra large
.dss-avatar--text-{color}     // Cor de texto customizada

// Utilitários extras
.dss-avatar-group             // Grupo de avatars
.dss-avatar--with-status      // Avatar com status indicator
.dss-avatar--status-online    // Status online (verde)
.dss-avatar--status-away      // Status away (amarelo)
.dss-avatar--status-busy      // Status busy (vermelho)
.dss-avatar--status-offline   // Status offline (cinza)
```

---

## ♿ Acessibilidade

### **Role e Labels**
```vue
<DssAvatar
  role="img"
  aria-label="Avatar de John Doe"
  color="primary"
>
  JD
</DssAvatar>
```

### **Imagens com Alt Text**
```vue
<DssAvatar>
  <img
    src="/avatar.jpg"
    alt="John Doe - Software Engineer"
  >
</DssAvatar>
```

### **High Contrast Mode**
```scss
@media (prefers-contrast: high) {
  .dss-avatar {
    border: 2px solid currentColor !important;
    font-weight: 700;
  }
}
```

### **Reduced Motion**
```scss
@media (prefers-reduced-motion: reduce) {
  .dss-avatar {
    transition: none !important;
  }
}
```

---

## 📦 Versão

**DSS v2.2.0** - Implementação completa da API do Quasar QAvatar
**Compatibilidade**: Quasar v2.x

---

## 📚 Recursos

- [Documentação Oficial do Quasar QAvatar](https://quasar.dev/vue-components/avatar)
- [Código-fonte do QAvatar](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/avatar/QAvatar.js)
- [Design System Sansys](https://github.com/sansys/design-system)
- [Material Icons](https://fonts.google.com/icons)
