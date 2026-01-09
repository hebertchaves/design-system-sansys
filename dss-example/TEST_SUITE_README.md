# 🧪 Design System Sansys - Test Suite

## 📋 Visão Geral

Suite completa de testes visuais para validação de todos os componentes do Design System Sansys v2.2.0.

---

## 🎯 Objetivo

Validar visualmente **todas as combinações possíveis** de props, cores, tamanhos, estados e integrações de cada componente, permitindo identificar erros, inconsistências e oportunidades de melhoria.

---

## 📁 Arquivos de Teste

### **1. TestIndex.vue** - Dashboard Central
- **Localização**: `/dss/dss-example/src/TestIndex.vue`
- **Propósito**: Página inicial com links para todos os testes
- **Conteúdo**: Estatísticas, guias de uso, checklists de validação

### **2. TestButton.vue** - DssButton Completo
- **Localização**: `/dss/dss-example/src/TestButton.vue`
- **Propósito**: Teste completo do DssButton
- **Seções**: 20 seções de teste
- **Variações**: ~100 combinações diferentes

**Seções incluídas:**
1. Variantes visuais (elevated, flat, outline, unelevated, push, glossy)
2. Cores semânticas (8 cores)
3. Tamanhos (xs, sm, md, lg, xl)
4. Ícones (left, right, both)
5. Estados (loading, disabled)
6. Loading com percentage (0-100%)
7. Ripple effect
8. Layout - Align (left, center, right, between, around, evenly)
9. Layout - Stack (vertical)
10. Layout - Stretch (full-width)
11. Layout - No wrap
12. Padding customizado
13. Formas (round, square)
14. Dense e no-caps
15. Tabindex (acessibilidade)
16. Brandabilidade (hub, water, waste)
17. Combinações complexas
18. Botões com badges
19. Stress test (50 botões)
20. Matriz completa (variantes × cores = 48 botões)

### **3. TestBadge.vue** - DssBadge Completo
- **Localização**: `/dss/dss-example/src/TestBadge.vue`
- **Propósito**: Teste completo do DssBadge
- **Seções**: 14 seções de teste
- **Variações**: ~80 combinações diferentes

**Seções incluídas:**
1. Cores semânticas (8 cores)
2. Variante outline (8 cores)
3. Variante transparent (8 cores)
4. Variante rounded (8 cores)
5. Dot indicators (badge vazio - 8 cores)
6. Multi-line (texto longo)
7. Text color override
8. Align vertical (top, middle, bottom)
9. Badges numéricos (1, 5, 99, 999, 99+)
10. Badges com ícones (usando slots)
11. Floating badges (com botões)
12. Combinações de props
13. Badges em listas (caso de uso real)
14. Stress test (50 badges)

### **4. TestAvatar.vue** - DssAvatar Completo
- **Localização**: `/dss/dss-example/src/TestAvatar.vue`
- **Propósito**: Teste completo do DssAvatar
- **Seções**: 20 seções de teste
- **Variações**: ~90 combinações diferentes

**Seções incluídas:**
1. Cores semânticas com iniciais (8 cores)
2. Tamanhos (32px, 40px, 48px, 64px, 80px)
3. Tamanhos com ícones
4. Ícones Material diversos
5. Formas (circular, square, rounded)
6. Formas com ícones
7. Font size customizado
8. Text color override
9. Avatars com badges (status indicators)
10. Avatar group (sobreposição)
11. Avatar group com ícones
12. Avatars grandes (perfil - 96px)
13. Combinações de props
14. Avatars em lista de usuários
15. Avatars quadrados para logos
16. Avatars com slots (conteúdo customizado)
17. Tamanhos customizados (rem, em, px, vh)
18. Stress test (30 avatars)
19. Stress test com ícones (30 avatars)
20. Avatar group grande (9+ usuários)

---

## 🚀 Como Usar

### **Interface Unificada com Menu Lateral (Implementado)**

O Test Suite agora possui uma **interface unificada** com navegação por menu lateral, já configurada no `App.vue`:

**Arquivos Principais:**
- **`src/TestSuite.vue`** - Interface principal com sidebar navigation
- **`src/App.vue`** - Importa e renderiza o TestSuite
- **`src/TestIndex.vue`** - Dashboard/Overview
- **`src/TestButton.vue`** - Testes completos do DssButton
- **`src/TestBadge.vue`** - Testes completos do DssBadge
- **`src/TestAvatar.vue`** - Testes completos do DssAvatar

**Como Acessar:**
1. Execute o servidor de desenvolvimento: `npm run dev`
2. Acesse: `http://localhost:5173`
3. Use o menu lateral para navegar entre componentes:
   - 🏠 **Overview** - Dashboard com estatísticas e guias
   - 🔘 **DssButton** - 20 seções de teste
   - 🏷️ **DssBadge** - 14 seções de teste
   - 👤 **DssAvatar** - 20 seções de teste

**Funcionalidades:**
- ✅ Navegação instantânea entre componentes (sem recarregar página)
- ✅ Menu lateral fixo com indicador visual do componente ativo
- ✅ Estatísticas em tempo real no sidebar
- ✅ Design responsivo (adapta em mobile)
- ✅ Animações suaves ao trocar de componente
- ✅ Sem dependência de Vue Router

### **Alternativa: Visualizar Componentes Individualmente**

Se preferir testar componentes individualmente, você pode importar diretamente:

```vue
<template>
  <!-- Escolha um componente para testar -->
  <TestButton />
  <!-- ou <TestBadge /> -->
  <!-- ou <TestAvatar /> -->
</template>

<script setup>
import TestButton from './TestButton.vue'
import TestBadge from './TestBadge.vue'
import TestAvatar from './TestAvatar.vue'
</script>
```

---

## 🔍 Checklist de Validação

Use este checklist ao revisar cada componente:

### **✅ Visual**
- [ ] Cores consistentes com tokens DSS
- [ ] Tamanhos proporcionais e legíveis
- [ ] Espaçamentos (padding/margin) corretos
- [ ] Bordas e sombras aplicadas adequadamente
- [ ] Ícones centralizados e proporcionais ao tamanho
- [ ] Tipografia legível em todos os tamanhos

### **✅ Funcionalidade**
- [ ] Todas as props funcionando conforme esperado
- [ ] Estados (loading, disabled) aplicados corretamente
- [ ] Hover effects funcionando
- [ ] Click events respondendo
- [ ] Animações (ripple, transitions) suaves
- [ ] Badge positioning correto (floating)

### **✅ Acessibilidade**
- [ ] Contraste de cores ≥ WCAG AA (4.5:1 texto, 3:1 UI)
- [ ] Navegação por teclado (Tab, Enter, Space)
- [ ] Focus indicators visíveis
- [ ] ARIA labels quando apropriado
- [ ] Touch targets ≥ 44px (WCAG 2.1 AA)
- [ ] Sem texto truncado sem indicação

### **✅ Responsividade**
- [ ] Desktop (1920px) - layout espaçado
- [ ] Laptop (1366px) - layout padrão
- [ ] Tablet (768px) - adapta grid columns
- [ ] Mobile (375px) - single column
- [ ] Texto não quebra inadequadamente
- [ ] Componentes mantêm proporções

### **✅ Performance**
- [ ] Renderização de múltiplos componentes sem lag
- [ ] Animações a 60fps
- [ ] Sem memory leaks ao alternar páginas
- [ ] CSS compilado sem warnings

---

## 🐛 Reportando Problemas

Ao identificar erros ou melhorias:

### **1. Documente o Problema**
```
Componente: DssButton
Seção: 6. Loading com Percentage
Problema: Barra de progresso não atinge 100%
Esperado: Barra deve preencher completamente quando percentage="100"
Observado: Barra para em ~95%
Navegador: Chrome 120 / Windows 11
```

### **2. Capture Evidências**
- Screenshot do problema
- Código da variação específica
- Console errors (se houver)

### **3. Teste em Múltiplos Navegadores**
- Chrome (Windows/Mac)
- Firefox (Windows/Mac)
- Safari (Mac)
- Edge (Windows)

### **4. Verifique Escopo**
- O problema ocorre apenas nesta variação específica?
- Ocorre em todos os tamanhos?
- Ocorre em todas as cores?

---

## 📊 Estatísticas do Test Suite

| Métrica | Valor |
|---------|-------|
| **Componentes Testados** | 3 |
| **Total de Seções** | 54 |
| **Total de Variações** | ~270 |
| **Cobertura de Props** | 100% |
| **Linhas de Código de Teste** | ~2.500 |

---

## 🎨 Casos de Uso Cobertos

### **DssButton**
- Botões de ação primária/secundária
- Botões com ícones (toolbar)
- Botões de formulário (submit/reset)
- Botões com loading state
- Botões com notificações (badges)
- Botões full-width
- Botões empilhados (stack)

### **DssBadge**
- Notificações (floating)
- Status indicators (dot)
- Labels inline
- Contadores numéricos
- Tags coloridas
- Badges em listas

### **DssAvatar**
- Perfis de usuários (iniciais)
- Avatars com ícones
- Logos de empresas (quadrado)
- Grupos de usuários (overlap)
- Status online/offline (com badge)
- Listas de membros

---

## 🔧 Manutenção dos Testes

### **Quando Adicionar Novos Testes**
- Nova prop adicionada ao componente
- Nova variante visual implementada
- Bug reportado e corrigido (regression test)
- Caso de uso específico identificado

### **Como Atualizar Testes Existentes**
1. Localize a seção relevante no arquivo de teste
2. Adicione a nova variação mantendo o padrão
3. Atualize o contador de seções/variações
4. Teste visualmente a nova adição
5. Documente no commit message

---

## 📚 Recursos Adicionais

- **Documentação dos Componentes**:
  - `/dss/components/base/DssButton/DSSBUTTON_API.md`
  - `/dss/components/base/DssBadge/DSSBADGE_API.md`
  - `/dss/components/base/DssAvatar/DSSAVATAR_API.md`

- **CHANGELOG**: `/dss/CHANGELOG.md`

- **Quasar Framework Docs**: https://quasar.dev/vue-components/

---

## ✨ Próximos Passos

1. **Execute o dev server**: `npm run dev`
2. **Acesse o Test Suite**: http://localhost:5173/tests
3. **Navegue pelos testes** clicando nos cards
4. **Valide visualmente** cada seção
5. **Documente problemas** encontrados
6. **Teste em diferentes navegadores**

---

**Design System Sansys v2.2.0**
Desenvolvido com ❤️ por Hebert Daniel Oliveira Chaves
