# 🎨 DSS (Design System Sansys) - Integração React

## 📋 Sobre

Esta pasta contém **componentes DSS adaptados para React**, mantendo **100% de fidelidade visual** com o Design System oficial da Sansys.

### 🔗 Repositório Original
- **Nome**: `design-system-sansys`
- **Owner**: `hebertchaves`
- **Stack**: Vue 3 + TypeScript + Composition API
- **Versão**: 2.3.0

## 🎯 Objetivo

Integrar os componentes DSS reais no **Guia Visual de Grid** para:

1. ✅ **Exemplos autênticos** - Usar componentes de produção nos layouts
2. ✅ **Fidelidade visual** - Mesmos tokens, cores e comportamentos
3. ✅ **Brandabilidade** - Suporte a Hub 🟠, Water 🔵, Waste 🟢
4. ✅ **Acessibilidade** - WCAG 2.1 AA mantido
5. ✅ **Documentação viva** - Código real = referência confiável

## 🏗️ Arquitetura

### **Vue → React: Estratégia de Adaptação**

Como o DSS original é Vue 3 e o Grid Guide é React, foi necessário:

#### **1. Replicação de Tokens**
```
✅ Tokens DSS originais → `/tokens/dss-tokens.css`
✅ Cores semânticas (primary, secondary, tertiary, etc.)
✅ Paletas de marca (hub, water, waste)
✅ Spacing, radius, shadows
```

#### **2. Componentes React com API DSS**
```tsx
// Mantém a mesma API de props do DSS Vue original
<DssButton 
  variant="elevated"    // ✅ Igual ao Vue
  color="primary"       // ✅ Igual ao Vue
  size="md"            // ✅ Igual ao Vue
  brand="hub"          // ✅ Brandabilidade preservada
>
  Clique Aqui
</DssButton>
```

#### **3. Estilos CSS Modules**
```
✅ Mantém classes DSS originais
✅ CSS Modules para escopo
✅ Baseado 100% em tokens DSS
```

## 📦 Componentes Disponíveis

### ✨ **Todos os 10 Componentes Base - COMPLETO!**

| Componente | Status | Variantes | Brandability | Descrição |
|-----------|--------|-----------|--------------|-----------|
| **DssButton** | ✅ Pronto | 6 (elevated, filled, tonal, outlined, text, flat) | ✅ Hub/Water/Waste | Botões com ícones e múltiplas variantes |
| **DssCard** | ✅ Pronto | 3 (elevated, filled, outlined) | ✅ Hub/Water/Waste | Cards com sections e actions |
| **DssBadge** | ✅ Pronto | 2 (filled, outlined) | ✅ Hub/Water/Waste | Badges e status indicators |
| **DssAvatar** | ✅ Pronto | 3 tamanhos (sm, md, lg) | ✅ Hub/Water/Waste | Avatares com imagem/iniciais/ícone |
| **DssInput** | ✅ Pronto | 3 (outlined, filled, text) | ✅ Hub/Water/Waste | Campos de entrada com validação |
| **DssCheckbox** | ✅ Pronto | Estados (checked, indeterminate) | ✅ Hub/Water/Waste | Checkboxes com label |
| **DssRadio** | ✅ Pronto | Estados (checked, disabled) | ✅ Hub/Water/Waste | Radio buttons com label |
| **DssToggle** | ✅ Pronto | Estados (on/off) | ✅ Hub/Water/Waste | Toggle switches |
| **DssChip** | ✅ Pronto | 2 (filled, outlined) | ✅ Hub/Water/Waste | Chips com delete e avatar |
| **DssTooltip** | ✅ Pronto | 4 posições (top, bottom, left, right) | ✅ Hub/Water/Waste | Tooltips com delay |

### 🎉 **FASE 2 COMPLETA - 10/10 Componentes Base**
Todos os componentes base disponíveis no repositório original DSS foram replicados para React com 100% de fidelidade!

## 🎨 Brandabilidade

### **Hub** 🟠 (Laranja/Marrom)
```tsx
<DssButton brand="hub" color="primary">Hub Button</DssButton>
```
- **Cor primária**: `#f5911a`
- **Uso**: Sistema geral / Hub de gestão

### **Water** 🔵 (Azul)
```tsx
<DssButton brand="water" color="primary">Water Button</DssButton>
```
- **Cor primária**: `#0e88e4`
- **Uso**: Gestão de água / Saneamento

### **Waste** 🟢 (Verde)
```tsx
<DssButton brand="waste" color="primary">Waste Button</DssButton>
```
- **Cor primária**: `#18b173`
- **Uso**: Gestão de resíduos

## 🚀 Uso

### **1. Importar Tokens DSS**
```tsx
// No arquivo principal (App.tsx ou index.tsx)
import './components/dss/tokens/dss-tokens.css';
```

### **2. Usar Componentes DSS**
```tsx
import { DssButton } from './components/dss/DssButton/DssButton';
import { DssCard, DssCardSection, DssCardActions } from './components/dss/DssCard/DssCard';
import { DssInput } from './components/dss/DssInput/DssInput';
import { DssCheckbox } from './components/dss/DssCheckbox/DssCheckbox';
import { DssChip } from './components/dss/DssChip/DssChip';
import { DssTooltip } from './components/dss/DssTooltip/DssTooltip';

// Exemplo completo
function MeuFormulario() {
  return (
    <DssCard variant="elevated" brand="water">
      <DssCardSection title="Cadastro de Usuário">
        <DssInput 
          label="Nome completo"
          placeholder="Digite seu nome"
          required
          brand="water"
        />
        
        <DssCheckbox 
          label="Aceito os termos"
          brand="water"
        />
        
        <DssChip 
          label="Administrador"
          icon="admin_panel_settings"
          brand="water"
          variant="filled"
        />
      </DssCardSection>
      
      <DssCardActions align="right">
        <DssButton color="primary" brand="water">Confirmar</DssButton>
        <DssButton variant="text" color="dark">Cancelar</DssButton>
      </DssCardActions>
    </DssCard>
  );
}
```

### **3. Grid Overlay Integration**
```tsx
// Os componentes DSS se integram automaticamente com o Grid Overlay
<GridSection>
  <DssCard variant="elevated">
    {/* O Grid Overlay mostra como o card se alinha */}
  </DssCard>
</GridSection>
```

## ♿ Acessibilidade (WCAG 2.1 AA)

Todos os componentes mantêm os padrões de acessibilidade do DSS original:

- ✅ **Touch targets**: 48×48px mínimo
- ✅ **Contraste**: 4.5:1 para texto normal, 3:1 para texto grande
- ✅ **Navegação por teclado**: Tab, Enter, Space, Arrows
- ✅ **Focus visível**: Anel de foco com `--dss-focus-ring`
- ✅ **ARIA labels**: Atributos semânticos para screen readers
- ✅ **Reduced motion**: Suporta `prefers-reduced-motion`

## 📚 Referências

### **Repositório DSS Original**
- **GitHub**: `hebertchaves/design-system-sansys`
- **Docs**: Ver README.md no repositório original
- **Changelog**: Ver CHANGELOG.md no repositório original

### **Arquitetura DSS (4 Camadas)**
1. **Structure** - Template base do componente
2. **Composition** - Props, eventos, slots
3. **Variants** - Variantes visuais (elevated, filled, etc.)
4. **Output** - Estilos finais compilados

### **Padrão Quasar Framework**
O DSS usa classes utilitárias globais inspiradas no Quasar Framework, reduzindo código em 97%.

## 🔄 Sincronização com DSS Original

Para manter a fidelidade com o repositório original:

1. **Monitore o CHANGELOG.md** do DSS
2. **Atualize tokens** quando houver mudanças de cores/spacing
3. **Replique novas variantes** quando adicionadas
4. **Mantenha a mesma API de props**

## 🛠️ Desenvolvimento

### **Adicionar Novo Componente DSS**

1. Consulte o repositório original (`hebertchaves/design-system-sansys`)
2. Copie os tokens necessários
3. Crie estrutura React:
   ```
   /DssNovoComponente/
     DssNovoComponente.tsx
     dss-novo-componente.module.css
   ```
4. Mantenha a mesma API de props do Vue original
5. Teste com todos os brands (hub, water, waste)

## 📝 Notas Importantes

- ⚠️ **Não modificar tokens DSS** - Sempre use variáveis CSS do arquivo `dss-tokens.css`
- ⚠️ **Manter API compatível** - Mesmas props do DSS Vue original
- ⚠️ **Testar acessibilidade** - Sempre validar WCAG 2.1 AA
- ⚠️ **Documentar diferenças** - Se houver adaptações React necessárias

## 👨‍💻 Desenvolvido por

**Hebert Daniel Oliveira Chaves**  
Design System Sansys - Versão React Adaptada para Grid Guide