/**
 * ==========================================================================
 * useBrand - React Hook
 * ==========================================================================
 * 
 * Portado de: composables/useBrand.ts (DSS Lovable)
 * Gerencia marcas Sansys (Hub, Water, Waste)
 * 
 * @example
 * ```tsx
 * const { brand, isBranded, brandClass } = useBrand('dss-button');
 * ```
 */

import { useGridSystem, SansysBrand } from '@/contexts/GridSystemContext';

/**
 * Mapeamento de cores primárias por marca
 * 
 * ✅ CORRIGIDO (Jan 2026): Cores oficiais Sansys
 * - Hub: Laranja/Marrom (#ef7a11 = --dss-hub-600)
 * - Water: Azul (#0e88e4 = --dss-water-500)
 * - Waste: Verde (#0b8154 = --dss-waste-600)
 */
export const BRAND_COLORS: Record<SansysBrand, string> = {
  hub: '#ef7a11',     // Laranja Hub (--dss-hub-600)
  water: '#0e88e4',   // Azul Water (--dss-water-500)
  waste: '#0b8154'    // Verde Waste (--dss-waste-600)
};

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
export function useBrand(componentName?: string) {
  const { brand } = useGridSystem();
  
  const isBranded = !!brand;
  
  const brandClass = brand && componentName
    ? `${componentName}--brand-${brand}`
    : '';
  
  const brandColor = brand ? BRAND_COLORS[brand] : null;
  
  return {
    brand,
    isBranded,
    brandClass,
    brandColor,
  };
}

/**
 * Utilitário para obter a cor primária de uma marca
 * 
 * @example
 * ```ts
 * const color = getBrandColor('hub') // '#ef7a11'
 * ```
 */
export function getBrandColor(brand: SansysBrand | null | undefined): string | null {
  if (!brand) return null;
  return BRAND_COLORS[brand] ?? null;
}
