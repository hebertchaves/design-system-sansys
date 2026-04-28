import { RefObject } from 'react';

interface GridOverlayProps {
    columns: number;
    showAnnotations?: boolean;
    gutter?: number;
    margin?: number;
    padding?: number;
    gutterY?: number;
    marginY?: number;
    paddingY?: number;
    rowHeight?: number;
    rows?: number;
    type?: 'columnar' | 'modular' | 'asymmetric';
    contentRef?: RefObject<HTMLDivElement>;
    contentSelector?: string;
    layoutGutterY?: number;
    layoutMarginY?: number;
    showRows?: boolean;
    /** Row index to highlight (from clicking a violation in the panel) */
    highlightedElementIndex?: number | null;
}
export declare function GridOverlay({ columns, showAnnotations, gutter, margin, padding, gutterY, marginY, paddingY, rowHeight: _rowHeight, rows: _rows, type, contentRef, contentSelector, layoutGutterY: _layoutGutterY, layoutMarginY: _layoutMarginY, showRows, highlightedElementIndex, }: GridOverlayProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=GridOverlay.d.ts.map