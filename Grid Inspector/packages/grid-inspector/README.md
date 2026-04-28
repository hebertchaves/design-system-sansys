# @sansys/grid-inspector

> **Universal Grid Inspector** para validação de Design Systems  
> Funciona como **NPM Package** ou **Bookmarklet**

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

### Vue 3

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

### React

```typescript
// src/index.tsx
import { injectGridInspector } from '@sansys/grid-inspector';
import '@sansys/grid-inspector/styles';

if (process.env.NODE_ENV === 'development') {
  injectGridInspector();
}
```

---

## 🔧 API

### `injectGridInspector(options?)`

Injeta o Grid Inspector na página atual.

```typescript
interface InjectOptions {
  target?: HTMLElement;       // default: document.body
  config?: Partial<GridInspectorConfig>;
  debug?: boolean;
  zIndex?: number;            // default: 999999
}
```

### `ejectGridInspector()`

Remove o Grid Inspector da página.

### `toggleGridInspector(options?)`

Alterna (liga/desliga) o Grid Inspector.

```typescript
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'G') {
    toggleGridInspector();
  }
});
```

### `isGridInspectorActive()`

Verifica se o Grid Inspector está ativo.

---

## 🎨 Configuração

```typescript
interface GridInspectorConfig {
  overlay: {
    columns: number;
    gutter: { x: number; y: number };
    margin: { x: number; y: number };
    padding: { x: number; y: number };
    visible: boolean;
  };
  layout: {
    gutter: { x: number; y: number };
    margin: { x: number; y: number };
    padding: { x: number; y: number };
    autoColumnWidth: boolean;
  };
  brand?: 'hub' | 'water' | 'waste';
  theme: 'light' | 'dark';
}
```

---

## 🔌 Integração MCP

O Grid Inspector envia validações automaticamente para o servidor MCP do DSS em `http://localhost:3001/api/validate-grid-layout`.

**MCP valida:**
- ✅ CRITICAL: Spacing tokens DSS
- ✅ CRITICAL: Sincronização overlay vs layout
- ✅ HIGH: Número de colunas padrão
- ✅ INFO: Otimizações por dispositivo

---

## 🧪 Desenvolvimento

```bash
npm install
npm run dev
npm run build
npm run build:bookmarklet
npm run build:all
npm run typecheck
```

---

## ⚠️ Notas de Implementação

- `FloatingGridInspector.tsx` importa componentes UI de `@/app/components/ui/*` (Radix UI / shadcn).  
  Ao usar como package standalone, esses imports devem ser adaptados para a lib de UI escolhida.
- O arquivo `mcp-validator.ts` é um placeholder local; quando o servidor MCP (`npm run start:http`) estiver rodando na porta 3001, as validações são enviadas automaticamente.

---

**Made with ❤️ by Sansys Design System Team**
