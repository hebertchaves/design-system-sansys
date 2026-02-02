# 📋 PLAYGROUND STANDARD v2.0

## Padrão Unificado para Playgrounds de Componentes DSS

Este documento define o padrão obrigatório para todos os playgrounds de documentação de componentes do Design System Sansys.

**Golden Sample:** A página `DssButtonPage.tsx` é o modelo de referência para micro-interações.

---

## 🎯 Objetivo

Garantir **consistência visual e funcional** em todos os playgrounds de documentação de componentes, proporcionando ao usuário uma experiência uniforme independentemente do componente sendo explorado.

---

## 🏗️ Arquitetura do Playground

### Componentes Base

```
src/components/ui/playground/
├── index.ts                    # API pública
├── types.ts                    # TypeScript types e dados padrão
├── DssPlayground.tsx           # Componente orquestrador principal
├── PlaygroundPreviewArea.tsx   # Área de preview com grid
├── PlaygroundCodePreview.tsx   # Preview de código gerado
└── PlaygroundControls.tsx      # Controles reutilizáveis
```

### Hierarquia de Componentes

```
DssPlayground (orquestrador)
├── CardHeader (opcional)
│   ├── Title + Icon
│   ├── Description
│   └── ThemeToggle
├── PreviewArea
│   └── [ComponentPreview] (customizado por componente)
└── ControlGrid (3 colunas responsivo)
    ├── ControlSection(s)
    │   ├── VariantSelector
    │   ├── ColorPicker
    │   ├── FeedbackColorPicker
    │   ├── BrandPicker
    │   ├── SizeSelector
    │   ├── ToggleGroup
    │   └── [Custom controls]
    └── CodePreview
```

---

## 📐 Layout Padrão

### Grid de 2 Colunas (Desktop)

```
┌─────────────────────────────────────────────────────┐
│ Card Header (título + descrição + theme toggle)     │
├─────────────────────────┬───────────────────────────┤
│                         │                           │
│     PREVIEW AREA        │      CONTROLS             │
│                         │  ┌─────────────────────┐  │
│   ┌─────────────────┐   │  │ Variante            │  │
│   │                 │   │  │ [btn] [btn] [btn]   │  │
│   │   Component     │   │  └─────────────────────┘  │
│   │   Preview       │   │  ┌─────────────────────┐  │
│   │                 │   │  │ Cor Semântica       │  │
│   └─────────────────┘   │  │ [●Primary] [●Sec]   │  │
│                         │  └─────────────────────┘  │
│   (grid background)     │  ┌─────────────────────┐  │
│                         │  │ Brand               │  │
│                         │  │ [🟠Hub] [🔵Water]   │  │
│                         │  └─────────────────────┘  │
│                         │  ┌─────────────────────┐  │
│                         │  │ Estados             │  │
│                         │  │ [Loading] [Disabled]│  │
│                         │  └─────────────────────┘  │
│                         │  ┌─────────────────────┐  │
│                         │  │ Código              │  │
│                         │  │ <Component .../>    │  │
│                         │  │ [Copiar]            │  │
│                         │  └─────────────────────┘  │
└─────────────────────────┴───────────────────────────┘
```

### Mobile (1 Coluna)

Em telas menores, o layout converte para coluna única:
1. Preview Area
2. Controls
3. Code Preview

---

## 🎨 Especificações Visuais

### Preview Area

| Propriedade | Light Mode | Dark Mode |
|------------|------------|-----------|
| Background | `#f8f9fa` | `#1a1a2e` |
| Grid Color | `#e0e0e0` | `#2d2d44` |
| Grid Size | 20px × 20px | 20px × 20px |
| Border | `1px solid #e5e5e5` | `1px solid #2d2d44` |
| Border Radius | 8px | 8px |
| Min Height | 300px | 300px |
| Padding | 32px | 32px |

### Control Sections

| Propriedade | Valor |
|------------|-------|
| Label Color | `var(--jtech-heading-tertiary)` |
| Label Font | 14px, font-semibold |
| Gap entre controles | 8px |
| Margin bottom | 8px |

### PlaygroundButton Props (Micro-Interações)

| Prop | Uso | Exemplo |
|------|-----|---------|
| `selectedBg` | Cor de background quando selecionado | `selectedBg={c.bg}` |
| `selectedColor` | Cor do texto quando selecionado | `selectedColor="#ffffff"` |
| `selectedBorder` | Cor da borda quando selecionado | `selectedBorder={c.bg}` |
| `isSelected` | Estado de seleção | `isSelected={selectedColor === c.name}` |

**Padrão para cores:**
```tsx
<PlaygroundButton
  isSelected={selectedColor === c.name && !selectedBrand}
  selectedBg={c.bg}
  selectedColor="#ffffff"
  selectedBorder={c.bg}
>
  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.bg }} />
  {c.label}
</PlaygroundButton>
```

**Padrão para toggles/estados:**
```tsx
<PlaygroundButton
  isSelected={isActive}
  selectedBg="var(--dss-positive)"
  selectedColor="#ffffff"
  selectedBorder="var(--dss-positive)"
>
  {isActive && "✓ "}
  {label}
</PlaygroundButton>
```

### Code Preview

| Propriedade | Valor |
|------------|-------|
| Background | `#1e1e2e` (Catppuccin Mocha) |
| Border | `1px solid #313244` |
| Font | monospace, 12px |
| Max Height | 200px |
| Text Color | `#cdd6f4` |

---

## 🔧 Controles Obrigatórios

### Para TODOS os componentes:

1. **Theme Toggle** (Light/Dark)
2. **Variante** (se aplicável)
3. **Cor Semântica** (primary, secondary, etc.)
4. **Brand** (Hub, Water, Waste)
5. **Code Preview** com botão copiar

### Controles Específicos por Tipo:

| Tipo de Componente | Controles Adicionais |
|-------------------|---------------------|
| Button | Size, Icon, Loading, Disabled, Round |
| Input | Type, Label, Placeholder, Error, Clearable, Dense |
| Card | Clickable, Square, Estados |
| Chip | Size, Removable, Selectable |
| Badge | Position, Floating |

---

## 🔄 Lógica de Exclusividade Mútua

### Brand vs Semantic Color

```typescript
// Quando selecionar Brand:
const handleBrandChange = (brand: string) => {
  setSelectedBrand(brand);
  setSelectedColor(null); // Limpa cor semântica
};

// Quando selecionar Cor:
const handleColorChange = (color: string) => {
  setSelectedColor(color);
  setSelectedBrand(null); // Limpa brand
};
```

### Na Geração de Código

```typescript
const generateCode = () => {
  const props: string[] = [];
  
  // Brand tem precedência sobre color
  if (selectedBrand) {
    props.push(`brand="${selectedBrand}"`);
    // NÃO inclui color quando brand está selecionado
  } else if (selectedColor !== "primary") {
    props.push(`color="${selectedColor}"`);
  }
  
  // ... resto das props
};
```

---

## 📝 Implementação Exemplo

### Usando o DssPlayground

```tsx
import {
  DssPlayground,
  VariantSelector,
  ColorPicker,
  BrandPicker,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_FEEDBACK_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

function MyComponentPage() {
  const [state, setState] = useState({
    variant: "elevated",
    color: "primary",
    brand: null,
    isDarkMode: false,
    booleans: { disabled: false, loading: false },
  });

  // Exclusividade mútua
  const handleColorChange = (color: string) => {
    setState(prev => ({ ...prev, color, brand: null }));
  };

  const handleBrandChange = (brand: string) => {
    setState(prev => ({ ...prev, brand, color: null }));
  };

  const generateCode = () => {
    // Lógica de geração de código
  };

  const allColors = [
    ...Object.values(DSS_SEMANTIC_COLORS),
    ...Object.values(DSS_FEEDBACK_COLORS),
  ];

  return (
    <DssPlayground
      title="Configure o Componente"
      description="Selecione as props e veja o resultado em tempo real."
      isDarkMode={state.isDarkMode}
      onDarkModeToggle={() => setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }))}
      previewContent={
        <MyComponentPreview {...state} />
      }
      controls={
        <>
          <VariantSelector
            variants={variants}
            selectedVariant={state.variant}
            onSelect={(v) => setState(prev => ({ ...prev, variant: v }))}
          />
          
          <ColorPicker
            colors={allColors}
            selectedColor={state.color}
            onSelect={handleColorChange}
          />
          
          <BrandPicker
            brands={DSS_BRAND_COLORS}
            selectedBrand={state.brand}
            onSelect={handleBrandChange}
          />
          
          <ToggleGroup
            options={[
              { name: "disabled", label: "Disabled" },
              { name: "loading", label: "Loading" },
            ]}
            values={state.booleans}
            onToggle={(name) => setState(prev => ({
              ...prev,
              booleans: { ...prev.booleans, [name]: !prev.booleans[name] }
            }))}
          />
        </>
      }
      codePreview={generateCode()}
    />
  );
}
```

---

## ✅ Checklist de Validação

Antes de finalizar uma página de componente, verifique:

### Layout
- [ ] Preview area com grid background
- [ ] Layout responsivo (2 colunas → 1 coluna)
- [ ] Espaçamentos consistentes
- [ ] Card com borda accent

### Controles
- [ ] Theme toggle (Light/Dark) presente
- [ ] Variantes do componente listadas
- [ ] Cores semânticas com dot preview
- [ ] Brands com emoji icon
- [ ] Estados booleanos relevantes
- [ ] Labels em uppercase com tracking

### Interatividade
- [ ] Exclusividade mútua Brand ↔ Color
- [ ] Código atualiza em tempo real
- [ ] Botão copiar funcional
- [ ] Hover states nos botões de controle

### Preview
- [ ] Componente renderiza corretamente
- [ ] Hover states funcionam
- [ ] Dark mode afeta o preview
- [ ] Transições suaves (300ms)

### Código Gerado
- [ ] Props refletem estado atual
- [ ] Brand exclui color quando ativo
- [ ] Valores default omitidos
- [ ] Formatação legível

---

## 🔗 Arquivos Relacionados

- `src/components/ui/playground/` - Componentes do playground
- `src/components/ui/PlaygroundButton.tsx` - Botão de seleção
- `docs/COMPONENT_PAGE_STRUCTURE.md` - Estrutura completa da página
- `memory/components/playground-button-standard` - Padrões do botão

---

**Versão:** 2.0  
**Última atualização:** 2026-01-30  
**Autor:** Design System Sansys Team
