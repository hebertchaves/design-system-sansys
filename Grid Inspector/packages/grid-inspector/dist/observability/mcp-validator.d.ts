import { DssSignal } from './dss-signals';

/** Override the MCP server URL at runtime. Call before injectGridInspector(). */
export declare function setMcpServerUrl(url: string): void;
export declare function getMcpServerUrl(): string;
/** Set a simulated viewport width. Pass null to revert to window.innerWidth. */
export declare function setSimulatedViewportWidth(px: number | null): void;
/** Returns the effective viewport width (simulated or real). */
export declare function getSimulatedViewportWidth(): number;
export declare const VALID_SPACING_TOKENS: number[];
export declare const VALID_COLUMN_COUNTS: number[];
export declare const BREAKPOINTS: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
};
export type McpSeverity = 'error' | 'warning' | 'suggestion';
export interface McpValidationResult {
    valid: boolean;
    severity?: McpSeverity;
    message?: string;
    suggestion?: {
        property: string;
        currentValue: any;
        suggestedValue: any;
        reason: string;
    };
}
export declare function validateSpacingToken(value: number, property: string): McpValidationResult;
export declare function validateOverlayLayoutSync(overlayValue: number, layoutValue: number, property: string): McpValidationResult;
export declare function validateColumnCount(columns: number): McpValidationResult;
export declare function suggestGutterByBreakpoint(currentGutter: number, viewportWidth?: number): McpValidationResult;
export declare function suggestAutoColumnWidth(currentAuto: boolean, viewportWidth?: number): McpValidationResult;
export declare function validateBrandPresence(brand?: string | null): McpValidationResult;
export interface McpProcessorResult {
    validations: McpValidationResult[];
    hasErrors: boolean;
    hasWarnings: boolean;
    hasSuggestions: boolean;
}
/** Client-side validation — mirrors the MCP server logic. Used as fallback. */
export declare function processDssSignal(signal: DssSignal): McpProcessorResult;
/** Returns true if the last call to sendToMcpServer() succeeded. */
export declare function isMcpConnected(): boolean;
/**
 * Sends a DssSignal to the MCP HTTP server.
 *
 * Falls back to client-side processDssSignal() when the server is unreachable
 * (network error, server not running, CORS issue, etc.).
 *
 * TO SWITCH TO PRODUCTION:
 *   setMcpServerUrl('https://your-production-mcp.sansys.com');
 */
export declare function sendToMcpServer(signal: DssSignal): Promise<McpProcessorResult>;
//# sourceMappingURL=mcp-validator.d.ts.map