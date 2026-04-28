# DSS Observability - Developer Guide

## 🎯 Overview

This directory contains the DSS observability infrastructure for Grid Inspector. It emits **read-only signals** about system state and user interactions.

**Key principle:** Signals observe, they never enforce.

---

## 📁 Files

### `dss-signals.ts`
Core signal emitter. Defines all signal types and emission functions.

**Exports:**
- `emitDssVersionInUse()` - Emit DSS version signal
- `emitGridComplianceCheck()` - Emit layout evaluation signal
- `emitGridViolation()` - Emit rule violation signal
- `emitComponentVariantResolution()` - Emit variant resolution signal

### `grid-rules-observer.ts`
Grid-specific observers for spacing tokens and column counts.

**Exports:**
- `observeGridSpacing()` - Check spacing values against DSS tokens
- `observeColumnCount()` - Check column count against conventions
- `VALID_SPACING_TOKENS` - Array of valid spacing values
- `VALID_COLUMN_COUNTS` - Array of valid column counts

---

## 🚀 Quick Start

### Emit a version signal (initialization)
```typescript
import { emitDssVersionInUse } from '@/observability/dss-signals';

useEffect(() => {
  emitDssVersionInUse('2.2', '1.0.0');
}, []);
```

### Emit a compliance check (when state changes)
```typescript
import { emitGridComplianceCheck } from '@/observability/dss-signals';

emitGridComplianceCheck(
  'overlay',                    // checkType
  { overlay: newState.overlay }, // context
  'user_interaction'            // trigger
);
```

### Observe spacing tokens
```typescript
import { observeGridSpacing } from '@/observability/grid-rules-observer';

observeGridSpacing(
  { x: 15, y: 16 },  // gutter
  { x: 16, y: 16 },  // margin
  { x: 24, y: 24 },  // padding
  'overlay'          // context
);
// Emits grid_violation if 15 is not a valid token
```

---

## ⚠️ Important Rules

### ✅ DO:
- Emit signals when state changes
- Emit signals when user interactions occur
- Pass exact values (actual state)
- Include context information

### ❌ DON'T:
- **Validate** or enforce rules
- **Modify** values based on signals
- **Block** user actions
- **Interpret** signal meaning (let MCP do it)
- **Add business logic** to signal emitters

---

## 📊 Signal Types

### 1. `dss_version_in_use`
**When:** Once on initialization  
**Purpose:** Track DSS version  
**Frequency:** 1/session

### 2. `grid_compliance_check`
**When:** Layouts evaluated or modified  
**Purpose:** Track grid state changes  
**Frequency:** ~10-50/minute (active use)

### 3. `grid_violation`
**When:** Non-token values detected  
**Purpose:** Track rule deviations  
**Frequency:** ~2-10/minute (active use)

### 4. `component_variant_resolution`
**When:** Component variants resolved  
**Purpose:** Track variant usage patterns  
**Frequency:** Per component render

---

## 🧪 Testing Signals

### Console logging (development)
Signals automatically log to console in development mode.

**Filter in DevTools:**
```
[DSS Signal]
```

### Example output
```javascript
[DSS Signal] grid_violation {
  signal: "grid_violation",
  timestamp: "2026-02-10T12:34:56.789Z",
  data: {
    violationType: "spacing_token",
    severity: "medium",
    context: {
      affectedProperty: "gutter.x",
      actual: 15,
      expected: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64]
    }
  }
}
```

---

## 🔧 Configuration

### Valid spacing tokens
Defined in `grid-rules-observer.ts`:
```typescript
export const VALID_SPACING_TOKENS = [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64
];
```

### Valid column counts
```typescript
export const VALID_COLUMN_COUNTS = [4, 8, 12, 16, 24];
```

**To modify:** Edit these arrays. No other changes needed.

---

## 🔌 MCP Integration

### ✅ STATUS: ATIVO (Client-side)

O sistema MCP está **funcional e validando em tempo real**!

#### Arquitetura Atual

```
Componente → emitDssSignal() → sendToMcp() → mcp-validator.ts
                                                      ↓
                                            McpProcessorResult
                                                      ↓
                                              CustomEvent
                                                      ↓
                                            useMcpValidation()
                                                      ↓
                                              UI Component
```

#### Como Usar

**1. Emitir signals (já funciona automaticamente)**

```typescript
import { emitGridComplianceCheck } from '@/observability/dss-signals';

// Signal é emitido e automaticamente validado pelo MCP
emitGridComplianceCheck('overlay', context, 'user_interaction');
```

**2. Consumir validações em React**

```typescript
import { useMcpValidation } from '@/observability/useMcpValidation';

function MyComponent() {
  const { validations, hasErrors, clear } = useMcpValidation();

  return (
    <div>
      {hasErrors && <Alert>Erros detectados!</Alert>}
      {validations.map(v => (
        <ValidationMessage key={v.message} validation={v} />
      ))}
    </div>
  );
}
```

**3. Exibir painel de validações**

```typescript
import { McpValidationPanel } from '@/observability/McpValidationPanel';

function App() {
  return (
    <>
      <YourContent />
      <McpValidationPanel position="bottom-right" />
    </>
  );
}
```

#### Validações Disponíveis

Baseado em `GRID_INSPECTOR_MCP_CONTRACT_v0.1.md`:

✅ **REGRA 1:** Spacing tokens DSS (crítico)  
✅ **REGRA 2:** Sincronização Overlay vs Layout (crítico)  
✅ **REGRA 3:** Número de colunas válido (warning)  
✅ **REGRA 6:** autoColumnWidth por breakpoint (sugestão)  
✅ **REGRA 7:** Gutter otimizado por dispositivo (sugestão)

#### Logs no Console

```javascript
// Development: veja validações em tempo real
[DSS Signal] grid_compliance_check {...}
[MCP Validation] grid_compliance_check
  ❌ Erros detectados: [...]
  💡 Sugestões: [...]
```

#### Migração para MCP Server (Futuro)

Para conectar a um servidor MCP externo:

**1. Implementar `isMcpConnected()`**

```typescript
// mcp-validator.ts
export function isMcpConnected(): boolean {
  return mcpClient?.isConnected() ?? false;
}
```

**2. Implementar `sendToMcpServer()`**

```typescript
// mcp-validator.ts
export async function sendToMcpServer(signal: DssSignal) {
  const response = await fetch('https://mcp-server/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signal)
  });
  return response.json();
}
```

**3. Atualizar `.mcp.json`**

```json
{
  "mcpServers": {
    "DSS_Validator": {
      "type": "http",
      "url": "https://mcp-server/validate",
      "headers": {
        "Authorization": "Bearer ${MCP_AUTH_TOKEN}"
      }
    }
  }
}
```

A migração é **transparente** - nenhuma mudança no código da aplicação!

---

## 📚 Related Documentation

- `/DSS_OBSERVABILITY_IMPLEMENTATION.md` - Full implementation report
- `/GRID_INSPECTOR_MCP_CONTRACT_v0.1.md` - MCP contract (planned)
- `Governance/DSS_OBSERVABILITY_SIGNALS.md` - Signal specifications (when available)

---

## 🤝 Contributing

When adding new signals:

1. **Define type** in `dss-signals.ts`
2. **Create emitter function** in `dss-signals.ts`
3. **Add emission points** in relevant components/hooks
4. **Document** in implementation report
5. **Test** in console

**Always maintain scope discipline:** Observe, never enforce.
