import React, { forwardRef, useId } from 'react';
import './dss-toggle.css';

/**
 * ==========================================================================
 * DssToggle - Design System Sansys (React Adaptation)
 * Baseado no repositório original: hebertchaves/design-system-sansys
 * ==========================================================================
 *
 * Toggle switch com:
 * - Label opcional
 * - Cores semânticas completas
 * - Brandabilidade
 * - Estados completos (on/off, hover, focus, active, disabled, error)
 * - Helper text e error message
 * - Acessibilidade completa
 * @version 2.0 (React)
 */

export interface DssToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label do toggle */
  label?: string;
  /** Cor semântica */
  color?: 'primary' | 'secondary' | 'tertiary' | 'positive' | 'negative' | 'warning' | 'info';
  /** Brand (hub, water, waste) - sobrescreve color */
  brand?: 'hub' | 'water' | 'waste';
  /** Texto de ajuda */
  helperText?: string;
  /** Estado de erro */
  error?: boolean;
  /** Mensagem de erro */
  errorMessage?: string;
  /** Classes CSS adicionais */
  className?: string;
}

export const DssToggle = forwardRef<HTMLInputElement, DssToggleProps>(({
  label,
  color = 'primary',
  brand,
  helperText,
  error = false,
  errorMessage,
  disabled,
  id: providedId,
  className = '',
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = providedId || generatedId;
  const helperId = `${inputId}-helper`;

  const wrapperClasses = [
    'dss-toggle-wrapper',
    disabled && 'dss-toggle-wrapper--disabled',
    className
  ].filter(Boolean).join(' ');

  const toggleClasses = [
    'dss-toggle',
    brand ? `dss-toggle--brand-${brand}` : `dss-toggle--${color}`,
    error && 'dss-toggle--error',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <label className="dss-toggle-container">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={toggleClasses}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={(helperText || errorMessage) ? helperId : undefined}
          {...props}
        />
        <span className="dss-toggle__track">
          <span className="dss-toggle__thumb"></span>
        </span>
        {label && <span className="dss-toggle__label">{label}</span>}
      </label>
      
      {(helperText || (error && errorMessage)) && (
        <span 
          id={helperId}
          className={`dss-toggle__helper ${error ? 'dss-toggle__helper--error' : ''}`}
        >
          {error && errorMessage ? errorMessage : helperText}
        </span>
      )}
    </div>
  );
});

DssToggle.displayName = 'DssToggle';