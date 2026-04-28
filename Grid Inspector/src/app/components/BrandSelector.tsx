/**
 * ==========================================================================
 * BrandSelector - Seletor de Marca Sansys
 * ==========================================================================
 * 
 * Seletor de marca Sansys (Hub/Water/Waste)
 * 
 * - Sincroniza data-brand no <html>
 * - Muda cores de todos os componentes DSS
 * - Usa tokens DSS de marca
 * 
 * Marcas:
 * - 🟠 Hub: Laranja (#ef7a11)
 * - 🔵 Water: Azul (#0e88e4)
 * - 🟢 Waste: Verde (#0b8154)
 */

import { useGridSystem, SansysBrand } from '@/hooks'; // ✅ FIXED: Use barrel export
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { useState } from 'react';

export function BrandSelector() {
  // TODO: FASE 2.1 - Re-enable after migration adds brand to Context
  // const { brand, setBrand } = useGridSystem();
  const [brand, setBrand] = useState<SansysBrand | undefined>(undefined);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="brand-select" className="text-sm font-medium text-gray-700">
        Brand:
      </label>
      <Select
        value={brand || 'none'}
        onValueChange={(value) => setBrand(value === 'none' ? undefined : value as SansysBrand)}
      >
        <SelectTrigger id="brand-select" className="w-[180px]">
          <SelectValue placeholder="Select brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Brand</SelectItem>
          <SelectItem value="hub">🟠 Hub (Laranja)</SelectItem>
          <SelectItem value="water">🔵 Water (Azul)</SelectItem>
          <SelectItem value="waste">🟢 Waste (Verde)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}