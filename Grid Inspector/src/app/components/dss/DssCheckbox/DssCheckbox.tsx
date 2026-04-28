import React, { forwardRef } from 'react';
import './dss-checkbox.css';

/**
 * ==========================================================================
 * DssCheckbox - Design System Sansys (React Adaptation)
 * Baseado no repositório original: hebertchaves/design-system-sansys
 * ==========================================================================
 *
 * Checkbox DSS com:
 * - Estados completos (checked, indeterminate, disabled, hover, focus, active)
 * - Cores semânticas completas
 * - Brandabilidade (hub, water, waste)
 * - Label opcional
 * - Acessibilidade total
 * @version 2.0 (React)
 */

export interface DssCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label do checkbox */
  label?: string;
  /** Estado indeterminado */
  indeterminate?: boolean;
  /** Cor semântica */
  color?: 'primary' | 'secondary' | 'tertiary' | 'positive' | 'negative' | 'warning' | 'info';
  /** Brand (hub, water, waste) - sobrescreve color */
  brand?: 'hub' | 'water' | 'waste';
  /** Classes CSS adicionais */
  className?: string;
}

export const DssCheckbox = forwardRef<HTMLInputElement, DssCheckboxProps>(({
  label,
  indeterminate = false,
  color = 'primary',
  brand,
  disabled,
  className = '',
  ...props
}, ref) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);
  
  React.useImperativeHandle(ref, () => checkboxRef.current!);
  
  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const wrapperClasses = [
    'dss-checkbox-wrapper',
    disabled && 'dss-checkbox-wrapper--disabled',
    className
  ].filter(Boolean).join(' ');

  const checkboxClasses = [
    'dss-checkbox',
    `dss-checkbox--${color}`,
    brand && `dss-checkbox--brand-${brand}`,
  ].filter(Boolean).join(' ');

  return (
    <label className={wrapperClasses}>
      <input
        ref={checkboxRef}
        type="checkbox"
        className={checkboxClasses}
        disabled={disabled}
        {...props}
      />
      <span className="dss-checkbox__checkmark material-symbols-outlined">
        {indeterminate ? 'remove' : 'check'}
      </span>
      {label && <span className="dss-checkbox__label">{label}</span>}
    </label>
  );
});

DssCheckbox.displayName = 'DssCheckbox';