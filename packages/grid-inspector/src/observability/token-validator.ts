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
export const VALID_SPACING_TOKENS = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64];

/**
 * Tokens de contagem de colunas válidos
 */
export const VALID_COLUMN_COUNTS = [4, 6, 8, 12, 16];

/**
 * Verifica se um valor é um token de espaçamento válido.
 */
export function isValidSpacingToken(value: number): boolean {
  return VALID_SPACING_TOKENS.includes(value);
}

/**
 * Verifica se um valor é um token de coluna válido.
 */
export function isValidColumnCount(value: number): boolean {
  return VALID_COLUMN_COUNTS.includes(value);
}

/**
 * Encontra o token válido mais próximo de um valor dado.
 */
export function findNearestSpacingToken(value: number): number {
  return VALID_SPACING_TOKENS.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

/**
 * Encontra a contagem de colunas válida mais próxima.
 */
export function findNearestColumnCount(value: number): number {
  return VALID_COLUMN_COUNTS.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}
