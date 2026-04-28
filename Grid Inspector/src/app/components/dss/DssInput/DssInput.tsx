import React, { forwardRef, useId } from 'react';
import './dss-input.css';

/**
 * ==========================================================================
 * DssInput - Design System Sansys (React Adaptation)
 * Baseado no repositório original: hebertchaves/design-system-sansys
 * ==========================================================================
 *
 * Campo de entrada de texto com:
 * - 3 variantes (outlined, filled, text)
 * - Estados completos (focus, hover, error, disabled, success)
 * - Label, helper text e mensagem de erro
 * - Ícones (prefixo e sufixo)
 * - Brandabilidade
 * - Acessibilidade completa
 * @version 2.0 (React)
 */

export interface DssInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Variante visual */
  variant?: 'outlined' | 'filled' | 'text';
  /** Label do campo */
  label?: string;
  /** Texto de ajuda */
  helperText?: string;
  /** Estado de erro */
  error?: boolean;
  /** Mensagem de erro */
  errorMessage?: string;
  /** Estado de sucesso */
  success?: boolean;
  /** Ícone prefixo (Material Symbol) */
  iconPrefix?: string;
  /** Ícone sufixo (Material Symbol) */
  iconSuffix?: string;
  /** Brand (hub, water, waste) */
  brand?: 'hub' | 'water' | 'waste';
  /** Classes CSS adicionais */
  className?: string;
}

export const DssInput = forwardRef<HTMLInputElement, DssInputProps>(({
  variant = 'outlined',
  label,
  helperText,
  error = false,
  errorMessage,
  success = false,
  iconPrefix,
  iconSuffix,
  brand,
  disabled,
  required,
  id: providedId,
  className = '',
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = providedId || generatedId;
  const helperId = `${inputId}-helper`;

  const wrapperClasses = [
    'dss-input-wrapper',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'dss-input',
    `dss-input--${variant}`,
    error && 'dss-input--error',
    success && !error && 'dss-input--success',
    disabled && 'dss-input--disabled',
    brand && `dss-input--brand-${brand}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="dss-input__label">
          {label}
          {required && <span className="dss-input__required">*</span>}
        </label>
      )}
      
      <div className={containerClasses}>
        {iconPrefix && (
          <span className="dss-input__icon dss-input__icon--prefix material-symbols-outlined">
            {iconPrefix}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className="dss-input__field"
          disabled={disabled}
          required={required}
          aria-invalid={error}
          aria-describedby={(helperText || errorMessage) ? helperId : undefined}
          {...props}
        />
        
        {iconSuffix && (
          <span className="dss-input__icon dss-input__icon--suffix material-symbols-outlined">
            {iconSuffix}
          </span>
        )}
      </div>
      
      {(helperText || (error && errorMessage)) && (
        <span 
          id={helperId}
          className={`dss-input__helper ${error ? 'dss-input__helper--error' : ''}`}
        >
          {error && errorMessage ? errorMessage : helperText}
        </span>
      )}
    </div>
  );
});

DssInput.displayName = 'DssInput';