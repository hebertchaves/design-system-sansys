/**
 * detectPageLayout
 *
 * Reads the real computed CSS values of the content container BEFORE
 * the inspector sets any CSS vars. Must be called synchronously inside
 * injectGridInspector, before createRoot().render().
 */
export interface DetectedLayout {
    columns: number;
    gapX: number;
    gapY: number;
    marginX: number;
    marginY: number;
    paddingX: number;
    paddingY: number;
}
export declare function detectPageLayout(contentSelector?: string): DetectedLayout | null;
//# sourceMappingURL=detectPageLayout.d.ts.map