import { createContext, ReactNode, useContext, useState } from 'react';
import type { GridInspectorConfig, GridViolation } from '../types';

// Theme Types
export type Theme = 'light' | 'dark';

// Brand Types
export type SansysBrand = 'hub' | 'water' | 'waste';

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

  // Layer Visibility
  showRows: boolean;
  setShowRows: (show: boolean) => void;

  // Theme & Brand
  theme: Theme;
  setTheme: (theme: Theme) => void;
  brand: SansysBrand | undefined;
  setBrand: (brand: SansysBrand | undefined) => void;

  // layout is an alias for component (backward compat)
  layout: ComponentLayoutConfig;

  // Inspector Visibility
  showInspector: boolean;
  setShowInspector: (show: boolean) => void;

  // Violations (MCP / DSS compliance)
  violations: GridViolation[];
  setViolations: (v: GridViolation[]) => void;

  // Highlighted element index in GridOverlay (from clicking a violation)
  highlightedElementIndex: number | null;
  setHighlightedElementIndex: (i: number | null) => void;
}

const GridSystemContext = createContext<GridSystemState | undefined>(undefined);

export function GridSystemProvider({
  children,
  initialConfig,
}: {
  children: ReactNode;
  initialConfig?: Partial<GridInspectorConfig>;
}) {
  const ic = initialConfig;

  // Grid Overlay State — initialised from detected config when available
  const [overlay, setOverlayState] = useState<GridOverlayConfig>({
    columns: ic?.overlay?.columns ?? 12,
    gutter: ic?.overlay?.gutter ?? { x: 16, y: 16 },
    margin: ic?.overlay?.margin ?? { x: 16, y: 16 },
    padding: ic?.overlay?.padding ?? { x: 24, y: 24 },
  });

  // Component Layout State — initialised from detected config when available
  const [component, setComponentState] = useState<ComponentLayoutConfig>({
    gutter: ic?.layout?.gutter ?? { x: 16, y: 16 },
    margin: ic?.layout?.margin ?? { x: 0, y: 0 },
    padding: ic?.layout?.padding ?? { x: 24, y: 24 },
  });

  // UI State
  const [showGrid, setShowGrid] = useState(true);
  const [autoColumnWidth, setAutoColumnWidth] = useState(true);
  const [showInspector, setShowInspector] = useState(true);
  const [showRows, setShowRows] = useState(true);

  // Theme & Brand State
  const [theme, setTheme] = useState<Theme>('light');
  const [brand, setBrand] = useState<SansysBrand | undefined>(undefined);

  // Violations State
  const [violations, setViolations] = useState<GridViolation[]>([]);
  const [highlightedElementIndex, setHighlightedElementIndex] = useState<number | null>(null);

  const setOverlay = (config: Partial<GridOverlayConfig>) => {
    setOverlayState(prev => ({ ...prev, ...config }));
  };

  const setComponent = (config: Partial<ComponentLayoutConfig>) => {
    setComponentState(prev => ({ ...prev, ...config }));
  };

  const value: GridSystemState = {
    overlay,
    setOverlay,
    component,
    setComponent,
    layout: component,
    showGrid,
    setShowGrid,
    autoColumnWidth,
    setAutoColumnWidth,
    showRows,
    setShowRows,
    theme,
    setTheme,
    brand,
    setBrand,
    showInspector,
    setShowInspector,
    violations,
    setViolations,
    highlightedElementIndex,
    setHighlightedElementIndex,
  };

  return (
    <GridSystemContext.Provider value={value}>
      {children}
    </GridSystemContext.Provider>
  );
}

export function useGridSystem() {
  const context = useContext(GridSystemContext);
  if (!context) {
    throw new Error('useGridSystem must be used within a GridSystemProvider');
  }
  return context;
}
