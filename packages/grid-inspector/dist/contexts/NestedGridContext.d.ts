import { ReactNode } from 'react';

export interface GridConfig {
    columns: number;
    gutterX: number;
    gutterY: number;
    marginX: number;
    marginY: number;
    paddingX: number;
    paddingY: number;
    showColumns: boolean;
    showRows: boolean;
    showMargins: boolean;
    showBaseline: boolean;
}
export declare const DEFAULT_GRID_CONFIG: GridConfig;
interface NestedGridContextValue {
    selectedElement: HTMLElement | null;
    setSelectedElement: (element: HTMLElement | null) => void;
    isSelectionMode: boolean;
    setIsSelectionMode: (active: boolean) => void;
    selectedElementInfo: {
        id: string;
        className: string;
        tagName: string;
    } | null;
    selectedElementKey: string | null;
    selectedGridConfig: GridConfig;
    updateSelectedGridConfig: (updates: Partial<GridConfig>) => void;
    elementGridConfigs: Map<string, GridConfig>;
    clearSelectedElement: () => void;
}
export declare function NestedGridProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useNestedGrid(): NestedGridContextValue;
export {};
//# sourceMappingURL=NestedGridContext.d.ts.map