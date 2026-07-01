# 🧪 Guia Rápido - Test Suite Unificado

## ✅ Implementação Completa

Foi criada uma **interface unificada** para testes de todos os componentes do Design System Sansys v2.2.0 com navegação por menu lateral.

---

## 📁 Arquivos Criados/Modificados

### **1. Novo: `src/TestSuite.vue`**
Interface principal com:
- **Sidebar Navigation** - Menu lateral fixo com todos os componentes
- **Component Switching** - Troca instantânea entre componentes sem recarregar página
- **Active Indicator** - Indicador visual do componente ativo
- **Mini Statistics** - Estatísticas em tempo real no sidebar
- **Responsive Design** - Adapta em mobile (sidebar compacto)
- **Smooth Animations** - Animações suaves ao trocar componentes

### **2. Modificado: `src/App.vue`**
Simplificado para importar e renderizar apenas o `TestSuite.vue`:
```vue
<template>
  <TestSuite />
</template>
```

### **3. Atualizado: `TEST_SUITE_README.md`**
Documentação atualizada com instruções para a nova interface.

---

## 🚀 Como Usar

### **Passo 1: Iniciar o Servidor**
```bash
cd /mnt/c/Users/hebert.chaves/quasar-to-figma-converter/V5/V5-2.0.2/dss/dss-example
npm run dev
```

### **Passo 2: Acessar a Interface**
Abra o navegador em: **http://localhost:5173**

### **Passo 3: Navegar pelos Componentes**
Use o menu lateral para acessar:

| Botão | Componente | Seções | Variações |
|-------|------------|--------|-----------|
| 🏠 **Overview** | Dashboard | - | Estatísticas, guias, checklists |
| 🔘 **DssButton** | TestButton.vue | 20 | ~100 variações |
| 🏷️ **DssBadge** | TestBadge.vue | 14 | ~80 variações |
| 👤 **DssAvatar** | TestAvatar.vue | 20 | ~90 variações |

---

## 🎨 Funcionalidades da Interface

### **Sidebar Navigation**
- ✅ **Menu fixo** - Sidebar sempre visível
- ✅ **Indicador ativo** - Borda branca no item selecionado
- ✅ **Badges** - Contador de seções por componente
- ✅ **Estatísticas** - 3 componentes, 54 seções, 270+ variações
- ✅ **Gradiente** - Background com gradiente roxo elegante

### **Main Content Area**
- ✅ **Troca instantânea** - Sem recarregar página
- ✅ **Fade animation** - Animação suave ao trocar
- ✅ **Scroll independente** - Sidebar e conteúdo com scroll separados
- ✅ **Full viewport** - Usa 100% da altura da tela

### **Responsividade**
- **Desktop (>768px)**: Sidebar 280px + conteúdo expandido
- **Tablet (480-768px)**: Sidebar 240px + conteúdo ajustado
- **Mobile (<480px)**: Sidebar 60px (apenas ícones) + conteúdo full

---

## 📊 Estrutura dos Testes

### **TestButton.vue** - 20 Seções
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

### **TestBadge.vue** - 14 Seções
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

### **TestAvatar.vue** - 20 Seções
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

## 🔍 Validação Visual

Ao testar cada seção, verifique:

### **✅ Visual**
- [ ] Cores consistentes com tokens DSS
- [ ] Tamanhos proporcionais e legíveis
- [ ] Espaçamentos (padding/margin) corretos
- [ ] Bordas e sombras aplicadas adequadamente
- [ ] Ícones centralizados e proporcionais
- [ ] Tipografia legível em todos os tamanhos

### **✅ Funcionalidade**
- [ ] Todas as props funcionando conforme esperado
- [ ] Estados (loading, disabled) aplicados corretamente
- [ ] Hover effects funcionando
- [ ] Click events respondendo
- [ ] Animações (ripple, transitions) suaves

### **✅ Acessibilidade**
- [ ] Contraste de cores ≥ WCAG AA (4.5:1 texto, 3:1 UI)
- [ ] Navegação por teclado (Tab, Enter, Space)
- [ ] Focus indicators visíveis
- [ ] Touch targets ≥ 44px (WCAG 2.1 AA)

### **✅ Responsividade**
- [ ] Desktop (1920px) - layout espaçado
- [ ] Laptop (1366px) - layout padrão
- [ ] Tablet (768px) - adapta grid columns
- [ ] Mobile (375px) - single column

---

## 🐛 Como Reportar Problemas

Ao identificar erros:

1. **Documente:**
   - Componente: `DssButton`
   - Seção: `6. Loading com Percentage`
   - Problema: `Barra de progresso não atinge 100%`
   - Esperado: `Barra deve preencher completamente`
   - Observado: `Barra para em ~95%`
   - Navegador: `Chrome 120 / Windows 11`

2. **Capture Evidências:**
   - Screenshot do problema
   - Código da variação específica
   - Console errors (se houver)

3. **Teste em Múltiplos Navegadores:**
   - Chrome (Windows/Mac)
   - Firefox (Windows/Mac)
   - Safari (Mac)
   - Edge (Windows)

---

## 🎯 Próximos Passos

1. ✅ Execute `npm run dev` no terminal
2. ✅ Acesse http://localhost:5173
3. ✅ Navegue pelos componentes usando o menu lateral
4. ✅ Valide visualmente cada seção
5. ✅ Documente problemas encontrados
6. ✅ Teste em diferentes navegadores e resoluções

---

**Design System Sansys v2.2.0**
Test Suite Unificado - Implementado com sucesso ✨

Desenvolvido com ❤️ por Hebert Daniel Oliveira Chaves
