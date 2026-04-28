import React, { forwardRef, useId } from 'react';
import './dss-radio.css';

/**
 * ==========================================================================
 * DssRadio - Design System Sansys (React Adaptation)
 * Baseado no repositório original: hebertchaves/design-system-sansys
 * ==========================================================================
 *
 * Radio button com:
 * - Label opcional
 * - Cores semânticas completas
 * - Brandabilidade
 * - Estados completos (checked, hover, focus, active, disabled, error)
 * - Helper text e error message
 * - Acessibilidade completa
 * @version 2.0 (React)
 */

export interface DssRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label do radio */
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

export const DssRadio = forwardRef<HTMLInputElement, DssRadioProps>(({
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
    'dss-radio-wrapper',
    disabled && 'dss-radio-wrapper--disabled',
    className
  ].filter(Boolean).join(' ');

  const radioClasses = [
    'dss-radio',
    brand ? `dss-radio--brand-${brand}` : `dss-radio--${color}`,
    error && 'dss-radio--error',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <label className="dss-radio-container">
        <input
          ref={ref}
          id={inputId}
          type="radio"
          className={radioClasses}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={(helperText || errorMessage) ? helperId : undefined}
          {...props}
        />
        <span className="dss-radio__mark"></span>
        {label && <span className="dss-radio__label">{label}</span>}
      </label>
      
      {(helperText || (error && errorMessage)) && (
        <span 
          id={helperId}
          className={`dss-radio__helper ${error ? 'dss-radio__helper--error' : ''}`}
        >
          {error && errorMessage ? errorMessage : helperText}
        </span>
      )}
    </div>
  );
});

DssRadio.displayName = 'DssRadio';