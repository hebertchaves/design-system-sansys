import { createContext, ReactNode, useContext, useState } from 'react';

export type Theme = 'light' | 'dark';
export type SansysBrand = 'hub' | 'water' | 'waste';

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
  overlay: GridOverlayConfig;
  setOverlay: (config: Partial<GridOverlayConfig>) => void;
  component: ComponentLayoutConfig;
  setComponent: (config: Partial<ComponentLayoutConfig>) => void;
  layout: ComponentLayoutConfig;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  autoColumnWidth: boolean;
  setAutoColumnWidth: (auto: boolean) => void;
  showRows: boolean;
  setShowRows: (show: boolean) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  brand: SansysBrand | null;
  setBrand: (brand: SansysBrand | null) => void;
  showInspector: boolean;
  setShowInspector: (show: boolean) => void;
}

const GridSystemContext = createContext<GridSystemState | undefined>(undefined);

export interface GridSystemProviderProps {
  children: ReactNode;
  initialBrand?: SansysBrand;
  initialTheme?: Theme;
}

export function GridSystemProvider({ 
  children, 
  initialBrand, 
  initialTheme = 'light' 
}: GridSystemProviderProps) {
  const [overlay, setOverlayState] = useState<GridOverlayConfig>({
    columns: 12,
    gutter: { x: 16, y: 16 },
    margin: { x: 16, y: 16 },
    padding: { x: 24, y: 24 },
  });

  const [component, setComponentState] = useState<ComponentLayoutConfig>({
    gutter: { x: 24, y: 24 },
    margin: { x: 16, y: 16 },
    padding: { x: 24, y: 24 },
  });

  const [showGrid, setShowGrid] = useState(true);
  const [autoColumnWidth, setAutoColumnWidth] = useState(true);
  const [showInspector, setShowInspector] = useState(true);
  const [showRows, setShowRows] = useState(true);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [brand, setBrand] = useState<SansysBrand | null>(initialBrand || null);

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
