# 🚀 Quick Start - DSS (Design System Sansys)

> **IMPORTANTE**: O DSS agora é um projeto **totalmente independente** do Figma plugin!

> **✨ NOVO v2.2.0**: Componentes modernos com **TypeScript + Composition API**!

---

## ⚡ 3 Passos para Testar o DssButton

### 📁 Estrutura do Projeto

```
quasar-to-figma-converter/
├── package.json          ← Figma plugin
└── dss/
    ├── package.json      ← DSS (independente)
    ├── index.scss
    ├── test-dss-button.html
    └── ...
```

---

## ✅ FAÇA isso (correto)

#### Passo 1: Navegar até o diretório DSS

```bash
cd dss
```

#### Passo 2: Instalar dependências do DSS (apenas uma vez)

```bash
npm install
```

Isso instalará o SASS localmente para o DSS.

#### Passo 3: Compilar SCSS → CSS

```bash
npm run build
```

**Resultado esperado**:
```
Compiled index.scss to index.css.
```

#### Passo 3: Abrir no Navegador

**Opção A - Live Server no VSCode (Recomendado)**:
1. Instale a extensão "Live Server" no VSCode
2. Abra `dss/test-dss-button.html`
3. Clique com botão direito → "Open with Live Server"

**Opção B - Duplo Clique**:
1. Abra o Windows Explorer
2. Navegue: `C:\Users\hebert.chaves\quasar-to-figma-converter\V5\V5-2.0.2\dss\`
3. Duplo clique em `test-dss-button.html`

---

## ✨ Componentes TypeScript + Composition API (v2.2.0)

Os seguintes componentes foram **modernizados** com 100% type safety:

- **DssButton** - Botão com 6 variantes
- **DssBadge** - Badge/contador
- **DssAvatar** - Avatar com imagem/texto
- **DssCard** + subcomponentes (DssCardSection, DssCardActions)
- **DssInput** - Input de formulário

### Composables Globais Reutilizáveis

```javascript
import { useColorClasses, useAccessibility, useBrand } from '@sansys/design-system'
```

- `useColorClasses` - Gerenciamento de cores DSS
- `useAccessibility` - Atributos WCAG 2.1 AA
- `useComponentState` - Estados interativos (focus, hover, active)
- `useBrand` - Marcas Sansys (hub, water, waste)

**[📖 Ver guia completo de migração](./MIGRATION_TO_TYPESCRIPT.md)**

---

## 🎯 O Que Você Verá

✅ DssButton com:
- 8 cores (primary, secondary, tertiary, accent, positive, negative, warning, info)
- 5 tamanhos (xs, sm, md, lg, xl)
- 4 variantes (filled, outlined, flat, unelevated)
- Estados (normal, loading, disabled)
- Ícones Material Icons
- Toggle Dark Mode
- Brandabilidade (Hub, Water, Waste)

---

## 🌙 Testar Dark Mode

Clique no botão "🌙 Dark Mode" no canto superior direito e observe:
- Background muda de branco para cinza escuro
- Texto muda de preto para branco
- Botões se ajustam automaticamente
- Contraste WCAG 2.1 AA mantido

---

## 🔧 Auto-recompilação (Desenvolvimento)

No diretório `dss/`, execute:

```bash
npm run watch
```

Deixe rodando. Sempre que salvar um SCSS, o CSS é atualizado!

---

## 🐛 Troubleshooting

### "npm: command not found"

**Solução**: Certifique-se de estar no diretório `dss/`:
```bash
cd dss
npm install
```

### "Estilos não aparecem"

**Solução**: Verifique se `index.css` existe:
```bash
ls index.css
```

Se não existir, compile novamente:
```bash
npm run build
```

### "Material Icons não aparecem"

**Solução**: Verifique conexão com internet (ícones vêm do CDN do Google)

---

## ✅ Checklist

Após abrir `test-dss-button.html`:

- [ ] Página carrega sem erros
- [ ] Todos os botões aparecem com estilos
- [ ] Ícones Material Icons funcionam
- [ ] Dark mode toggle funciona
- [ ] Focus ring aparece ao navegar com Tab

---

## 📚 Mais Documentação

### ✨ TypeScript + Composition API (NOVO!)
- **`MIGRATION_TO_TYPESCRIPT.md`**: Guia completo de migração TypeScript
  - Componentes migrados (DssButton, DssBadge, DssAvatar, DssCard, DssInput)
  - Composables globais reutilizáveis
  - Templates e exemplos práticos

### Arquitetura e Implementação
- **`DSS_ARCHITECTURE.md`**: Arquitetura em 4 camadas
- **`DSS_IMPLEMENTATION_GUIDE.md`**: Guia de implementação completo
- **`REFACTORING_QUASAR_PATTERN.md`**: Padrão Quasar Framework

### Testes e Setup
- **Este arquivo**: Quick start sem erros
- **`INSTRUCOES_TESTE_DSSBUTTON.md`**: Instruções detalhadas
- **`GUIA_SETUP_VSCODE.md`**: Setup completo com Vite

---

**🎉 Agora execute `npm run dss:build` e abra `test-dss-button.html`!**
