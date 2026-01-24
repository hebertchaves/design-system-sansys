# Estrutura Padrão para Páginas de Componentes DSS

**Versão 2.0 - Janeiro 2025**

Este documento define a hierarquia oficial de informações para todas as páginas de documentação de componentes no Design System Sansys.

---

## 📋 Hierarquia de Seções

Todas as páginas de componentes DEVEM seguir esta estrutura na ordem especificada:

### 1. Badges de Metadados

- Versão do componente (ex: `v2.1.0`)
- Compatibilidade (ex: `Quasar Compatible`)
- Status (ex: `Golden Sample`, `Beta`, `Deprecated`)
- Referências relevantes

### 2. Título do Componente

- Usar componente `PageHeader`
- Ícone representativo do componente
- Nome do componente com destaque (ex: "Componente **DssButton**")

### 3. Descrição Básica

- Descreva o papel funcional do componente na interface, começando por "o que ele representa" ou "para que ele é usado"
- Use linguagem orientada a UX e produto, ajudando o leitor a entender quando e por que usar o componente
- Evite explicações sobre governança, implementação interna ou compatibilidade com frameworks
- Não repita conceitos transversais do DSS (tokens, brandability, acessibilidade), a menos que sejam essenciais para entender o uso do componente.
- Máximo de 4 a 5 linhas, com foco em clareza, fluidez e leitura rápida

### 4. Quick Stats (Opcional)

- Grid de 4 cards com estatísticas rápidas
- Variantes, Cores, Brands, Tamanhos, etc.
- Cores visuais para cada stat

### 5. Playground Interativo

- Card único contendo:
  - Preview visual do componente
  - Controles interativos (variante, cor, tamanho, estados)
  - Código de exemplo atualizado em tempo real
  - **Toggle Light/Dark Mode** para testar em ambos os temas
- Usar seção `SectionHeader` com título "Playground **Interativo**"

### 6. Galeria de Variantes (Opcional)

- Tabs organizados por categoria (Variantes, Cores, Brands, Tamanhos, Estados)
- Demonstração visual de cada opção
- Usar componente `DssTabs`

### 7. Anatomia 4 Camadas ⭐ OBRIGATÓRIO

- Usar componente `AnatomySection`
- Cards clicáveis para cada camada:
  1. **Structure** - Template, Props, Lógica
  2. **Composition** - Layout, Tipografia, Reset
  3. **Variants** - Variações visuais (sem cores)
  4. **Output** - Cores, Brands, Estados
- Ao clicar, expandir painel com:
  - Descrição completa
  - Arquivos relacionados
  - Responsabilidades
  - Tokens utilizados
  - Exemplo de código

### 8. Documentação Técnica (Colapsável)

- Usar componente `CollapsibleSection`
- Seções:
  - **Props API & Eventos** - Tabela com todas as props
  - **Tokens DSS Utilizados** - Tabs por categoria de tokens
  - **Acessibilidade WCAG** - Conformidade e implementação

---

## 🎨 Estruturas de Dados Obrigatórias

Cada página de componente DEVE definir as seguintes estruturas de dados no início do arquivo:

### Cores Semânticas

```typescript
const semanticColors = {
  primary: {
    name: "primary",
    label: "Primary",
    bg: "#1f86de",           // Cor base
    hover: "#0f5295",        // Cor de hover (+2 níveis)
    light: "#86c0f3",        // Cor clara (flat/outline bg hover)
    disable: "#b3dcff",      // Cor desabilitado
    deep: "#0a3a6a",         // Cor profunda (pressed)
    focus: "#006AC5",        // Focus ring
    tokens: {
      base: "--dss-primary",
      hover: "--dss-primary-hover",
      light: "--dss-primary-light",
      disable: "--dss-primary-disable",
      deep: "--dss-primary-deep",
    },
  },
  secondary: { /* ... */ },
  tertiary: { /* ... */ },
  accent: { /* ... */ },
  dark: { /* ... */ },
};
```

### Cores de Feedback

```typescript
const feedbackColors = {
  positive: {
    name: "positive",
    label: "Positive",
    icon: CheckCircle,        // Ícone representativo
    bg: "#4dd228",
    hover: "#27910D",
    light: "#b9f2a4",
    disable: "#dbf8d1",
    deep: "#246714",
    tokens: {
      base: "--dss-positive",
      hover: "--dss-positive-hover",
    },
  },
  negative: { /* ... */ },
  warning: { /* ... */ },
  info: { /* ... */ },
};
```

### Paletas de Marca (Brandability)

```typescript
const brandColors = {
  hub: {
    name: "hub",
    label: "Hub",
    icon: "🟠",
    principal: "#ef7a11",     // Cor principal (600)
    scale: {
      50: "#fff9ed",
      100: "#fef2d6",
      200: "#fde2ab",
      300: "#fbcb76",         // Light (flat/outline hover bg)
      400: "#f8aa3f",
      500: "#f5911a",
      600: "#ef7a11",         // Principal
      700: "#bf590f",         // Hover
      800: "#984614",         // Deep/Pressed
      900: "#7a3614",
      950: "#421d08",
    },
    tokens: {
      principal: "--dss-hub-600",
      hover: "--dss-hub-700",
      light: "--dss-hub-300",
      disable: "--dss-hub-200",
    },
  },
  water: { /* ... */ },
  waste: { /* ... */ },
};
```

### Variantes do Componente

```typescript
const variants = [
  { 
    name: "elevated",      // Valor da prop
    label: "Elevated",     // Label de exibição
    desc: "Botão com elevação/shadow (padrão)", 
    hasElevation: true     // Metadado para lógica
  },
  { name: "flat", label: "Flat", desc: "Background transparente, apenas texto", hasElevation: false },
  { name: "outline", label: "Outline", desc: "Background transparente com borda", hasElevation: false },
  // ... demais variantes
];
```

### Tamanhos (Touch Targets WCAG)

```typescript
const sizes = [
  {
    name: "xs",
    label: "XS",
    height: "32px",
    padding: "4px 8px",
    fontSize: "12px",
    minWidth: "48px",
    token: "--dss-touch-target-xs",
  },
  {
    name: "md",
    label: "MD",
    height: "44px",            // Mínimo WCAG 2.1 AA
    padding: "8px 16px",
    fontSize: "14px",
    minWidth: "64px",
    token: "--dss-touch-target-md",
    isDefault: true,           // Marcar tamanho padrão
  },
  // ... demais tamanhos
];
```

### Props API

```typescript
const propsData = [
  { 
    category: "Conteúdo",      // Agrupamento
    prop: "label",             // Nome da prop
    type: "String",            // Tipo TypeScript
    default: "''",             // Valor padrão
    description: "Texto do botão" 
  },
  { category: "Variantes", prop: "variant", type: "'elevated' | 'flat' | 'outline'", default: "'elevated'", description: "Estilo visual" },
  { category: "Estados", prop: "loading", type: "Boolean", default: "false", description: "Exibe spinner" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca" },
  // ... demais props agrupadas por categoria
];
```

### Tokens Utilizados

```typescript
const tokensUsed = [
  // Organizados por categoria funcional
  { category: "Action", token: "--dss-action-primary", value: "#1f86de", usage: "Background primary button" },
  { category: "Feedback", token: "--dss-feedback-success", value: "#4dd228", usage: "Positive/Success button" },
  { category: "Brand Hub", token: "--dss-hub-600", value: "#ef7a11", usage: "Hub principal (button bg)" },
  { category: "Sizing", token: "--dss-touch-target-md", value: "44px", usage: "Altura mínima WCAG 2.1 AA" },
  { category: "Spacing", token: "--dss-spacing-4", value: "16px", usage: "Padding horizontal (md)" },
  { category: "Border Radius", token: "--dss-radius-md", value: "8px", usage: "Radius médio" },
  { category: "Elevation", token: "--dss-elevation-1", value: "0 1px 3px rgba(0,0,0,0.25)", usage: "Sombra elevated" },
  { category: "Typography", token: "--dss-font-size-md", value: "14px", usage: "Texto medium" },
  { category: "Text", token: "--dss-text-inverse", value: "#ffffff", usage: "Texto sobre bg escuro" },
  { category: "Motion", token: "--dss-duration-fast", value: "150ms", usage: "Transição rápida (hover)" },
  { category: "Opacity", token: "--dss-opacity-disabled", value: "0.4", usage: "Estado desabilitado" },
  { category: "States", token: "--dss-state-active-scale", value: "0.98", usage: "Scale no pressed" },
  { category: "Gray Scale", token: "--dss-gray-400", value: "#d4d4d4", usage: "Borda médio" },
  // ... demais tokens organizados
];
```

**Categorias Padrão de Tokens:**
1. Action (cores de ação)
2. Feedback (success, error, warning, info)
3. Brand Hub / Brand Water / Brand Waste
4. Sizing (touch targets)
5. Spacing (gaps, paddings)
6. Border Radius
7. Elevation (shadows)
8. Borders
9. Typography
10. Text (cores de texto)
11. Motion (transitions)
12. Opacity
13. States
14. Gray Scale

---

## 🎮 Componente Preview Interativo

Cada componente DEVE ter um componente interno `Dss[Component]Preview` com as seguintes características:

### Interface do Preview

```typescript
interface DssButtonPreviewProps {
  label?: string;
  variant?: string;
  colorKey?: string;        // Cor semântica selecionada
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  round?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  brand?: string;           // Brand selecionado (exclusivo com colorKey)
  showToken?: boolean;      // Mostrar nome do token abaixo
}
```

### Lógica de Hover por Variante

```typescript
// Estado de hover interno
const [isHovered, setIsHovered] = useState(false);

// Estilos baseados na variante
const getVariantStyles = (): React.CSSProperties => {
  switch (variant) {
    case "flat":
    case "outline":
      // Hover: background usa COR LIGHT, texto usa COR HOVER
      return {
        backgroundColor: isHovered ? colors.light : "transparent",
        color: isHovered ? colors.hover : colors.bg,
        border: variant === "outline" ? `1px solid ${isHovered ? colors.hover : colors.bg}` : "none",
      };
    
    case "elevated":
    case "unelevated":
      // Hover: background usa COR HOVER
      return {
        backgroundColor: isHovered ? colors.hover : colors.bg,
        color: colors.textColor,
      };
    
    case "push":
      // Hover: efeito 3D com translate
      return {
        backgroundColor: isHovered ? colors.hover : colors.bg,
        boxShadow: isHovered ? `0 2px 0 ${colors.deep}` : `0 4px 0 ${colors.hover}`,
        transform: isHovered ? "translateY(0px)" : "translateY(-2px)",
      };
  }
};
```

### Exclusividade Brand vs Cor Semântica

```typescript
// No playground, quando brand é selecionado:
const handleBrandChange = (newBrand: string | null) => {
  setBrand(newBrand);
  if (newBrand) {
    setColor(null);  // Reset cor semântica
  }
};

const handleColorChange = (newColor: string) => {
  setColor(newColor);
  setBrand(null);    // Reset brand
};

// Na geração do código de exemplo:
const generateCode = () => {
  const props = [];
  if (brand) {
    props.push(`brand="${brand}"`);
    // NÃO incluir color quando brand está definido
  } else if (color && color !== "primary") {
    props.push(`color="${color}"`);
  }
  // ...
};
```

---

## 🌓 Toggle Light/Dark Mode no Playground

O playground DEVE suportar alternância de tema para visualização do componente:

```typescript
const [isDarkMode, setIsDarkMode] = useState(false);

// Preview wrapper com tema dinâmico
<div 
  style={{
    backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff',
    backgroundImage: isDarkMode 
      ? 'radial-gradient(circle, #2d2d44 1px, transparent 1px)'
      : 'radial-gradient(circle, #e5e5e5 1px, transparent 1px)',
    backgroundSize: '20px 20px',
  }}
>
  {/* Componente preview */}
</div>

// Toggle button
<Button
  variant="outline"
  size="sm"
  onClick={() => setIsDarkMode(!isDarkMode)}
>
  {isDarkMode ? <Sun /> : <Moon />}
  {isDarkMode ? "Light" : "Dark"}
</Button>
```

---

## 🧩 Componentes Reutilizáveis

### PageHeader

```tsx
<PageHeader
  icon={Box}
  badge="Golden Sample"
  badgeVariant="accent"
  title="Componente"
  titleAccent="DssButton"
  subtitle="Descrição do componente..."
  subtitleHighlights={["tokens DSS", "brandability"]}
  extraBadges={[
    { label: "v2.1.0", variant: "info" },
    { label: "Quasar Compatible", variant: "success" },
  ]}
/>
```

### SectionHeader

```tsx
<SectionHeader
  title="Playground"
  titleAccent="Interativo"
  badge="Configurador"
/>
```

### AnatomySection

```tsx
<AnatomySection
  componentName="DssButton"
  layers={{
    structure: { files: [...], description: "...", responsibilities: [...], tokens: [...], codeExample: "..." },
    composition: { ... },
    variants: { ... },
    output: { ... }
  }}
/>
```

### CollapsibleSection

```tsx
<CollapsibleSection
  icon={FileText}
  title="Props API"
  titleAccent="& Eventos"
>
  {/* Conteúdo colapsável */}
</CollapsibleSection>
```

---

## 📁 Estrutura de Dados para Anatomia

```typescript
interface LayerContent {
  files: string[];           // Arquivos da camada
  description: string;       // Descrição conceitual
  responsibilities: string[]; // Lista de responsabilidades
  tokens?: string[];         // Tokens utilizados
  codeExample?: string;      // Exemplo de código
}

interface AnatomyData {
  structure: LayerContent;
  composition: LayerContent;
  variants: LayerContent;
  output: LayerContent;
}
```

---

## ✅ Checklist de Validação

Antes de publicar uma página de componente, verifique:

### Estrutura
- [ ] Badges de metadados presentes
- [ ] PageHeader com ícone e descrição
- [ ] Quick Stats com métricas relevantes (opcional)
- [ ] Playground funcional com todos os controles
- [ ] Toggle Light/Dark no playground
- [ ] Galeria de variantes em tabs (opcional)
- [ ] Anatomia 4 Camadas com dados completos
- [ ] Documentação técnica em CollapsibleSection

### Dados
- [ ] `semanticColors` com tokens completos
- [ ] `feedbackColors` com ícones e tokens
- [ ] `brandColors` com escala completa (50-950)
- [ ] `variants` com metadados
- [ ] `sizes` com touch targets WCAG
- [ ] `propsData` categorizado
- [ ] `tokensUsed` organizado por categoria (14 categorias)
- [ ] `anatomyData` para as 4 camadas

### Interatividade
- [ ] Componente `Dss[Component]Preview` criado
- [ ] Hover states implementados por variante
- [ ] Exclusividade Brand/Cor funcionando
- [ ] Código de exemplo atualiza em tempo real

### Conteúdo
- [ ] Props API documentada em tabela
- [ ] Tokens organizados por categoria
- [ ] Seção de acessibilidade preenchida

---

## 📚 Referências

- **Componente modelo (Golden Sample)**: `src/pages/components/DssButtonPage.tsx`
- **AnatomySection**: `src/components/ui/AnatomySection.tsx`
- **CollapsibleSection**: `src/components/ui/CollapsibleSection.tsx`
- **PageHeader**: `src/components/ui/PageHeader.tsx`
- **SectionHeader**: `src/components/ui/SectionHeader.tsx`

---

**Mantido por:** Equipe Design System Sansys
**Atualizado em:** Janeiro 2025
**Versão:** 2.0.0
