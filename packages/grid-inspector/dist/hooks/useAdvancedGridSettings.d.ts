/**
 * Hook para ler configurações avançadas do Grid Inspector
 * e sincronizar com o layout real
 */
export declare function useAdvancedGridSettings(): {
    containerType: "fixed" | "fluid";
    breakpointWidth: string;
    autoColumnWidth: boolean;
    getGridTemplateColumns: (columns: number, fixedWidth?: number) => string;
};
//# sourceMappingURL=useAdvancedGridSettings.d.ts.map