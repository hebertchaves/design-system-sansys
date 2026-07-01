# @sansys/grid-inspector

> **Universal Grid Inspector** para validação de Design Systems  
> Funciona como **NPM Package** ou **Bookmarklet**

[![npm version](https://img.shields.io/npm/v/@sansys/grid-inspector.svg)](https://www.npmjs.com/package/@sansys/grid-inspector)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 Características

- ✅ **Universal** - Funciona em qualquer site (Vue, React, Angular, HTML)
- 🚀 **Zero Config** - Pronto para usar imediatamente
- 📦 **Dual Distribution** - NPM package + Bookmarklet
- 🎨 **DSS Compliant** - Valida contra tokens Sansys Design System
- 🔍 **Visual Inspector** - Overlay de grid + controles flutuantes
- 📏 **MCP Integration** - Conecta com servidor MCP para validação server-side

---

## 📦 Instalação

### Opção A: Bookmarklet (Qualquer site)

**Melhor para:** QA, designers, testes em produção

1. Acesse a [página de instalação](https://unpkg.com/@sansys/grid-inspector@latest/dist/bookmarklet.html)
2. Arraste o botão **"Grid Inspector"** para sua barra de favoritos
3. Navegue até qualquer site
4. Clique no favorito para ativar o inspector

**Vantagens:**
- ⚡ Sem instalação
- 🌐 Funciona em qualquer site
- 🔄 Sempre atualizado (carrega última versão do CDN)

---

### Opção C: NPM Package (Projetos Vue/React)

**Melhor para:** Desenvolvedores, ambiente de desenvolvimento

#### Vue 3

```bash
npm install @sansys/grid-inspector
```

```typescript
// src/main.ts
import { injectGridInspector } from '@sansys/grid-inspector';
import '@sansys/grid-inspector/styles';

if (import.meta.env.DEV) {
  injectGridInspector({
    debug: true,
    config: {
      overlay: {
        columns: 12,
        gutter: { x: 24, y: 24 },
        visible: true
      }
    }
  });
}
```

#### React

```bash
npm install @sansys/grid-inspector
```

```typescript
// src/index.tsx
import { injectGridInspector } from '@sansys/grid-inspector';
import '@sansys/grid-inspector/styles';

if (process.env.NODE_ENV === 'development') {
  injectGridInspector();
}
```

**Vantagens:**
- ⚙️ Configurável via código
- 🔒 Apenas em dev (não vai para produção)
- 🎨 TypeScript types inclusos

---

## 🔧 API

### `injectGridInspector(options?)`

Injeta o Grid Inspector na página atual.

```typescript
interface InjectOptions {
  /** Target element (default: document.body) */
  target?: HTMLElement;

  /** Initial configuration */
  config?: Partial<GridInspectorConfig>;

  /** Enable debug logging */
  debug?: boolean;

  /** Z-index (default: 999999) */
  zIndex?: number;
}
```

**Exemplo:**

```typescript
injectGridInspector({
  config: {
    overlay: {
      columns: 12,
      gutter: { x: 24, y: 24 },
      margin: { x: 16, y: 16 },
      padding: { x: 24, y: 24 },
      visible: true
    },
    layout: {
      gutter: { x: 24, y: 24 },
      margin: { x: 16, y: 16 },
      padding: { x: 24, y: 24 },
      autoColumnWidth: false
    },
    theme: 'light'
  },
  debug: true
});
```

---

### `ejectGridInspector()`

Remove o Grid Inspector da página.

```typescript
import { ejectGridInspector } from '@sansys/grid-inspector';

ejectGridInspector();
```

---

### `toggleGridInspector(options?)`

Alterna (liga/desliga) o Grid Inspector.

```typescript
import { toggleGridInspector } from '@sansys/grid-inspector';

// Atalho de teclado
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'G') {
    toggleGridInspector();
  }
});
```

---

### `isGridInspectorActive()`

Verifica se o Grid Inspector está ativo.

```typescript
import { isGridInspectorActive } from '@sansys/grid-inspector';

if (isGridInspectorActive()) {
  console.log('Grid Inspector está ativo');
}
```

---

## 🎨 Configuração

### GridInspectorConfig

```typescript
interface GridInspectorConfig {
  overlay: {
    columns: number;              // Número de colunas (4, 8, 12, 16, 24)
    gutter: { x: number; y: number };  // Espaçamento entre colunas
    margin: { x: number; y: number };  // Margem externa
    padding: { x: number; y: number }; // Padding interno
    visible: boolean;             // Mostrar/ocultar overlay
  };
  layout: {
    gutter: { x: number; y: number };  // Layout real dos componentes
    margin: { x: number; y: number };
    padding: { x: number; y: number };
    autoColumnWidth: boolean;     // Colunas fluidas ou fixas
  };
  brand?: 'hub' | 'water' | 'waste';  // Brand DSS (opcional)
  theme: 'light' | 'dark';        // Tema
}
```

---

## 🔌 Integração MCP

O Grid Inspector pode enviar validações para o servidor MCP do DSS:

```typescript
import { injectGridInspector } from '@sansys/grid-inspector';

injectGridInspector({
  config: {
    // Sua configuração
  }
});

// As validações são enviadas automaticamente para:
// - Verificar tokens DSS
// - Validar sincronização overlay/layout
// - Sugerir otimizações por breakpoint
```

**MCP valida:**
- ✅ CRITICAL: Spacing tokens DSS
- ✅ CRITICAL: Sincronização overlay vs layout
- ✅ HIGH: Número de colunas padrão
- ✅ INFO: Otimizações por dispositivo

---

## 🏗️ Arquitetura

```
@sansys/grid-inspector
├─ ESM Build (NPM)
│  └─ React como peer dependency
│  └─ Imports externos
│
└─ UMD Build (Bookmarklet)
   └─ React bundled
   └─ Standalone (funciona sem deps)
```

**Código-base unificado:**
- ✅ Mesma lógica para ambas distribuições
- ✅ Zero duplicação
- ✅ Menos bugs

---

## 🧪 Desenvolvimento

```bash
# Instalar dependências
npm install

# Dev mode (hot reload)
npm run dev

# Build ESM + UMD
npm run build

# Gerar bookmarklet
npm run build:bookmarklet

# Build completo (tudo)
npm run build:all

# Type checking
npm run typecheck
```

---

## 📄 Licença

MIT © Sansys Design System Team

---

## 🔗 Links

- [GitHub Repository](https://github.com/hebertchaves/design-system-sansys)
- [MCP Contract](https://github.com/hebertchaves/design-system-sansys/blob/main/GRID_INSPECTOR_MCP_CONTRACT_v0.1.md)
- [Bookmarklet Installation](https://unpkg.com/@sansys/grid-inspector@latest/dist/bookmarklet.html)

---

**Made with ❤️ by Sansys Design System Team**
