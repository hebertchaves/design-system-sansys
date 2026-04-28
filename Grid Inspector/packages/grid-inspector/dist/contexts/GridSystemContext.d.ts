import { ReactNode } from 'react';
import { GridInspectorConfig, GridViolation } from '../types';

export type Theme = 'light' | 'dark';
export type SansysBrand = 'hub' | 'water' | 'waste';
export interface GridOverlayConfig {
    columns: number;
    gutter: {
        x: number;
        y: number;
    };
    margin: {
        x: number;
        y: number;
    };
    padding: {
        x: number;
        y: number;
    };
}
export interface ComponentLayoutConfig {
    gutter: {
        x: number;
        y: number;
    };
    margin: {
        x: number;
        y: number;
    };
    padding: {
        x: number;
        y: number;
    };
}
export interface GridSystemState {
    overlay: GridOverlayConfig;
    setOverlay: (config: Partial<GridOverlayConfig>) => void;
    component: ComponentLayoutConfig;
    setComponent: (config: Partial<ComponentLayoutConfig>) => void;
    showGrid: boolean;
    setShowGrid: (show: boolean) => void;
    autoColumnWidth: boolean;
    setAutoColumnWidth: (auto: boolean) => void;
    showRows: boolean;
    setShowRows: (show: boolean) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    brand: SansysBrand | undefined;
    setBrand: (brand: SansysBrand | undefined) => void;
    layout: ComponentLayoutConfig;
    showInspector: boolean;
    setShowInspector: (show: boolean) => void;
    violations: GridViolation[];
    setViolations: (v: GridViolation[]) => void;
    highlightedElementIndex: number | null;
    setHighlightedElementIndex: (i: number | null) => void;
}
export declare function GridSystemProvider({ children, initialConfig, }: {
    children: ReactNode;
    initialConfig?: Partial<GridInspectorConfig>;
}): import("react/jsx-runtime").JSX.Element;
export declare function useGridSystem(): GridSystemState;
//# sourceMappingURL=GridSystemContext.d.ts.map