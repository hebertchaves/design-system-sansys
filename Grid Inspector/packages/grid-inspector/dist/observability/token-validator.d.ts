/**
 * 🔍 DSS Token Validator
 *
 * Valida se valores numéricos correspondem aos tokens DSS.
 * Usado para detectar violações de conformidade.
 *
 * @module observability/token-validator
 */
/**
 * Tokens de espaçamento válidos no DSS (em px)
 */
export declare const VALID_SPACING_TOKENS: number[];
/**
 * Tokens de contagem de colunas válidos
 */
export declare const VALID_COLUMN_COUNTS: number[];
/**
 * Verifica se um valor é um token de espaçamento válido.
 */
export declare function isValidSpacingToken(value: number): boolean;
/**
 * Verifica se um valor é um token de coluna válido.
 */
export declare function isValidColumnCount(value: number): boolean;
/**
 * Encontra o token válido mais próximo de um valor dado.
 */
export declare function findNearestSpacingToken(value: number): number;
/**
 * Encontra a contagem de colunas válida mais próxima.
 */
export declare function findNearestColumnCount(value: number): number;
//# sourceMappingURL=token-validator.d.ts.map