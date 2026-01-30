/**
 * ==========================================================================
 * PlaygroundControls - Controles Padronizados do Playground
 * ==========================================================================
 *
 * Componentes para controles do playground, seguindo o padrão visual
 * da DssButtonPage (Golden Sample).
 *
 * PADRÃO DE MICRO-INTERAÇÕES:
 * - Labels: text-sm font-semibold, color: var(--jtech-heading-tertiary)
 * - Color dots: w-2 h-2 rounded-full
 * - Toggle states: checkmark ✓ prefix, selectedBg="var(--dss-positive)"
 * - Hover: scale-105, background transitions
 * - Active: scale-95
 */

import React from "react";
import { PlaygroundButton } from "../PlaygroundButton";
import { Sun, Moon } from "lucide-react";
import type { Variant, BrandColor, SemanticColor, FeedbackColor } from "./types";

// ==========================================================================
// CONTROL SECTION - Container padrão com label
// ==========================================================================

interface ControlSectionProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function ControlSection({ label, children, className = "" }: ControlSectionProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        className="text-sm font-semibold block"
        style={{ color: "var(--jtech-heading-tertiary)" }}
      >
        {label}
      </label>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

// ==========================================================================
// THEME TOGGLE - Botão Light/Dark
// ==========================================================================

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <div className="flex justify-end">
      <PlaygroundButton
        onClick={onToggle}
        isSelected={isDarkMode}
        selectedBg="var(--dss-jtech-accent)"
        selectedColor="#ffffff"
      >
        <div className="flex items-center gap-2">
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{isDarkMode ? "Light" : "Dark"}</span>
        </div>
      </PlaygroundButton>
    </div>
  );
}

// ==========================================================================
// VARIANT SELECTOR - Seletor de variantes
// ==========================================================================

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: string;
  onSelect: (variant: string) => void;
  label?: string;
}

export function VariantSelector({ 
  variants, 
  selectedVariant, 
  onSelect,
  label = "Variant"
}: VariantSelectorProps) {
  return (
    <ControlSection label={label}>
      {variants.map((v) => (
        <PlaygroundButton
          key={v.name}
          onClick={() => onSelect(v.name)}
          isSelected={selectedVariant === v.name}
          selectedBg="var(--dss-jtech-accent)"
          selectedColor="#ffffff"
        >
          {v.label}
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}

// ==========================================================================
// COLOR PICKER - Cores semânticas (Primary, Secondary, etc.)
// ==========================================================================

interface ColorPickerProps {
  label?: string;
  colors: SemanticColor[] | Array<SemanticColor & { [key: string]: any }>;
  selectedColor: string | null;
  onSelect: (color: string) => void;
  /** Desativa a seleção quando brand está ativo */
  disabled?: boolean;
}

export function ColorPicker({
  label = "Color",
  colors,
  selectedColor,
  onSelect,
  disabled = false,
}: ColorPickerProps) {
  return (
    <ControlSection label={label}>
      {colors.map((c) => (
        <PlaygroundButton
          key={c.name}
          onClick={() => onSelect(c.name)}
          isSelected={selectedColor === c.name && !disabled}
          selectedBg={c.bg}
          selectedColor="#ffffff"
          selectedBorder={c.bg}
          className="flex items-center gap-1.5"
        >
          <span 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: c.bg }} 
          />
          {c.label}
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}

// ==========================================================================
// FEEDBACK COLOR PICKER - Cores de feedback com suporte a warning
// ==========================================================================

interface FeedbackColorPickerProps {
  label?: string;
  colors: FeedbackColor[] | Record<string, FeedbackColor>;
  selectedColor: string | null;
  onSelect: (color: string) => void;
  /** Desativa a seleção quando brand está ativo */
  disabled?: boolean;
}

export function FeedbackColorPicker({
  label = "Feedback",
  colors,
  selectedColor,
  onSelect,
  disabled = false,
}: FeedbackColorPickerProps) {
  const colorArray = Array.isArray(colors) ? colors : Object.values(colors);
  
  return (
    <ControlSection label={label}>
      {colorArray.map((c) => (
        <PlaygroundButton
          key={c.name}
          onClick={() => onSelect(c.name)}
          isSelected={selectedColor === c.name && !disabled}
          selectedBg={c.bg}
          selectedColor={c.name === "warning" ? "#1a1a1a" : "#ffffff"}
          selectedBorder={c.bg}
          className="flex items-center gap-1.5"
        >
          <span 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: c.bg }} 
          />
          {c.label}
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}

// ==========================================================================
// BRAND PICKER - Seletor de marcas (Hub, Water, Waste)
// ==========================================================================

interface BrandPickerProps {
  brands: Record<string, BrandColor>;
  selectedBrand: string | null;
  onSelect: (brand: string | null) => void;
  label?: string;
  /** Mostra opção "Nenhum" para limpar seleção */
  showNone?: boolean;
}

export function BrandPicker({ 
  brands, 
  selectedBrand, 
  onSelect,
  label = "Brand (Sansys)",
  showNone = true,
}: BrandPickerProps) {
  return (
    <ControlSection label={label}>
      {showNone && (
        <PlaygroundButton
          onClick={() => onSelect(null)}
          isSelected={!selectedBrand}
          selectedBg="var(--dss-jtech-accent)"
          selectedColor="#ffffff"
        >
          Nenhum
        </PlaygroundButton>
      )}
      {Object.values(brands).map((b) => (
        <PlaygroundButton
          key={b.name}
          onClick={() => onSelect(b.name)}
          isSelected={selectedBrand === b.name}
          selectedBg={b.principal}
          selectedColor="#ffffff"
          selectedBorder={b.principal}
          className="flex items-center gap-1.5"
        >
          <span>{b.icon}</span>
          {b.label}
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}

// ==========================================================================
// SIZE SELECTOR - Seletor de tamanhos
// ==========================================================================

interface SizeOption {
  name: string;
  label: string;
  isDefault?: boolean;
}

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: string;
  onSelect: (size: string) => void;
  label?: string;
}

export function SizeSelector({ 
  sizes, 
  selectedSize, 
  onSelect,
  label = "Size"
}: SizeSelectorProps) {
  return (
    <ControlSection label={label}>
      {sizes.map((s) => (
        <PlaygroundButton
          key={s.name}
          onClick={() => onSelect(s.name)}
          isSelected={selectedSize === s.name}
          selectedBg="var(--dss-jtech-accent)"
          selectedColor="#ffffff"
        >
          {s.label}
          {s.isDefault && <span className="ml-1 opacity-50">•</span>}
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}

// ==========================================================================
// TOGGLE GROUP - Estados booleanos (Disabled, Loading, etc.)
// ==========================================================================

interface ToggleOption {
  name: string;
  label: string;
  icon?: React.ReactNode;
}

interface ToggleGroupProps {
  label?: string;
  options: ToggleOption[];
  values: Record<string, boolean>;
  onToggle: (name: string) => void;
}

export function ToggleGroup({ 
  label = "Estados & Ícones", 
  options, 
  values, 
  onToggle 
}: ToggleGroupProps) {
  return (
    <ControlSection label={label}>
      {options.map((opt) => {
        const isActive = values[opt.name] || false;
        return (
          <PlaygroundButton
            key={opt.name}
            onClick={() => onToggle(opt.name)}
            isSelected={isActive}
            selectedBg="var(--dss-positive)"
            selectedColor="#ffffff"
            selectedBorder="var(--dss-positive)"
          >
            {isActive && "✓ "}
            {opt.icon && <span className="mr-1">{opt.icon}</span>}
            {opt.label}
          </PlaygroundButton>
        );
      })}
    </ControlSection>
  );
}

// ==========================================================================
// ICON SELECTOR - Seletor de ícones
// ==========================================================================

interface IconOption {
  name: string;
  label: string;
  icon: React.ReactNode;
}

interface IconSelectorProps {
  label?: string;
  icons: IconOption[];
  selectedIcon: string | null;
  onSelect: (icon: string | null) => void;
  allowNone?: boolean;
}

export function IconSelector({
  label = "Ícone",
  icons,
  selectedIcon,
  onSelect,
  allowNone = true,
}: IconSelectorProps) {
  return (
    <ControlSection label={label}>
      {allowNone && (
        <PlaygroundButton
          onClick={() => onSelect(null)}
          isSelected={selectedIcon === null}
          selectedBg="var(--dss-jtech-accent)"
          selectedColor="#ffffff"
        >
          Nenhum
        </PlaygroundButton>
      )}
      {icons.map((i) => (
        <PlaygroundButton
          key={i.name}
          onClick={() => onSelect(i.name)}
          isSelected={selectedIcon === i.name}
          selectedBg="var(--dss-jtech-accent)"
          selectedColor="#ffffff"
        >
          <div className="flex items-center gap-1.5">
            {i.icon}
            <span>{i.label}</span>
          </div>
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}

// ==========================================================================
// CONTROL GRID - Layout responsivo para múltiplos controles
// ==========================================================================

interface ControlGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
}

export function ControlGrid({ children, columns = 3 }: ControlGridProps) {
  const colsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={`grid ${colsClass[columns]} gap-6`}>
      {children}
    </div>
  );
}
