import { createContext, ReactNode, useContext, useState, useEffect } from 'react';

// Theme Types
export type Theme = 'light' | 'dark';

// Grid Configuration Types
export interface GridOverlayConfig {
  columns: number;
  gutter: { x: number; y: number };
  margin: { x: number; y: number };
  padding: { x: number; y: number };
}

export interface ComponentLayoutConfig {
  gutter: { x: number; y: number };
  margin: { x: number; y: number };
  padding: { x: number; y: number };
}

export interface GridSystemState {
  // Grid Overlay
  overlay: GridOverlayConfig;
  setOverlay: (config: Partial<GridOverlayConfig>) => void;

  // Component Layout
  component: ComponentLayoutConfig;
  setComponent: (config: Partial<ComponentLayoutConfig>) => void;

  // UI Controls
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  autoColumnWidth: boolean;
  setAutoColumnWidth: (auto: boolean) => void;
  
  // 🆕 Layer Visibility
  showRows: boolean;
  setShowRows: (show: boolean) => void;
  
  // Theme & Brand
  theme: Theme;
  setTheme: (theme: Theme) => void;
  
  // Inspector Visibility
  showInspector: boolean;
  setShowInspector: (show: boolean) => void;
}

const GridSystemContext = createContext<GridSystemState | undefined>(undefined);

// 🔍 DIAGNOSTIC: Log module instance (avoid circular reference)
console.log('[DIAGNOSTIC] GridSystemContext created:', typeof GridSystemContext, GridSystemContext !== undefined);

export function GridSystemProvider({ children }: { children: ReactNode }) {
  console.log('[DIAGNOSTIC v2.1.2] ✅ GridSystemProvider function CALLED');
  console.log('[DIAGNOSTIC v2.1.2] children:', typeof children);
  
  // 🎨 Grid Overlay State
  const [overlay, setOverlayState] = useState<GridOverlayConfig>({
    columns: 12,
    gutter: { x: 16, y: 16 },
    margin: { x: 16, y: 16 },
    padding: { x: 24, y: 24 },
  });

  console.log('[DIAGNOSTIC v2.1.1] overlay state initialized:', overlay);

  // 🧩 Component Layout State
  const [component, setComponentState] = useState<ComponentLayoutConfig>({
    gutter: { x: 24, y: 24 },
    margin: { x: 16, y: 16 },
    padding: { x: 24, y: 24 },
  });

  // 🎛️ UI State
  const [showGrid, setShowGrid] = useState(true);
  const [autoColumnWidth, setAutoColumnWidth] = useState(true);
  const [showInspector, setShowInspector] = useState(true); // ✅ FIXME: Era false, deveria ser true
  const [showRows, setShowRows] = useState(true); // 🆕 Controle de visibilidade dos rows
  
  // 🎨 Theme & Brand State
  const [theme, setTheme] = useState<Theme>('light');
  
  // 🔍 Validar e atualizar overlay
  const setOverlay = (config: Partial<GridOverlayConfig>) => {
    const newOverlay = { ...overlay, ...config };
    setOverlayState(newOverlay);
  };

  // 🔍 Validar e atualizar component
  const setComponent = (config: Partial<ComponentLayoutConfig>) => {
    const newComponent = { ...component, ...config };
    setComponentState(newComponent);
  };

  const value: GridSystemState = {
    overlay,
    setOverlay,
    component,
    setComponent,
    showGrid,
    setShowGrid,
    autoColumnWidth,
    setAutoColumnWidth,
    showRows,
    setShowRows,
    theme,
    setTheme,
    showInspector,
    setShowInspector,
  };

  console.log('[DIAGNOSTIC v2.1.2] ✅ GridSystemProvider rendering with value:', value);

  return (
    <GridSystemContext.Provider value={value}>
      {children}
    </GridSystemContext.Provider>
  );
}

// Hook para acessar o contexto
export function useGridSystem() {
  const context = useContext(GridSystemContext);
  if (!context) {
    throw new Error('useGridSystem must be used within a GridSystemProvider');
  }
  return context;
}