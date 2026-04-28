import { DssSignal } from './dss-signals';

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
export declare function suggestGutterByBreakpoint(currentGutter: number, viewportWidth: number): McpValidationResult;
export declare function suggestAutoColumnWidth(currentAuto: boolean, viewportWidth: number): McpValidationResult;
export interface McpProcessorResult {
    validations: McpValidationResult[];
    hasErrors: boolean;
    hasWarnings: boolean;
    hasSuggestions: boolean;
}
/**
 * Processa signal DSS e retorna validações MCP
 *
 * Este é o ponto de entrada principal para validação MCP.
 * Em produção, isto seria substituído por chamada ao servidor MCP.
 */
export declare function processDssSignal(signal: DssSignal): McpProcessorResult;
/**
 * Envia signal para servidor MCP externo
 *
 * TODO: Implementar quando servidor MCP estiver disponível
 */
export declare function sendToMcpServer(signal: DssSignal): Promise<McpProcessorResult>;
/**
 * Verifica se está conectado ao servidor MCP
 */
export declare function isMcpConnected(): boolean;
//# sourceMappingURL=mcp-validator.d.ts.map