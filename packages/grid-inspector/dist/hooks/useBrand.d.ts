import { SansysBrand } from '../contexts/GridSystemContext';

/**
 * Mapeamento de cores primárias por marca
 *
 * ✅ CORRIGIDO (Jan 2026): Cores oficiais Sansys
 * - Hub: Laranja/Marrom (#ef7a11 = --dss-hub-600)
 * - Water: Azul (#0e88e4 = --dss-water-500)
 * - Waste: Verde (#0b8154 = --dss-waste-600)
 */
export declare const BRAND_COLORS: Record<SansysBrand, string>;
/**
 * Hook para gerenciar marcas Sansys
 *
 * Gera classe CSS apropriada para a marca:
 * - {componentName}--brand-hub
 * - {componentName}--brand-water
 * - {componentName}--brand-waste
 *
 * @param componentName - Nome base do componente (ex: 'dss-button')
 */
export declare function useBrand(componentName?: string): {
    brand: SansysBrand | undefined;
    isBranded: boolean;
    brandClass: string;
    brandColor: string | null;
};
/**
 * Utilitário para obter a cor primária de uma marca
 *
 * @example
 * ```ts
 * const color = getBrandColor('hub') // '#ef7a11'
 * ```
 */
export declare function getBrandColor(brand: SansysBrand | null | undefined): string | null;
//# sourceMappingURL=useBrand.d.ts.map