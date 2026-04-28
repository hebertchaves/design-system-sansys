import React, { ButtonHTMLAttributes } from 'react';
import './dss-button.css';

/**
 * DssButton - Componente de botão do Design System Sansys
 * 
 * Wrapper DSS compatível com a API do Quasar QBtn, com extensões de brandabilidade e acessibilidade.
 * 
 * FUNCIONALIDADES:
 * - 6 variantes (elevated, flat, outline, unelevated, push, glossy)
 * - 5 tamanhos (xs, sm, md, lg, xl)
 * - 8 cores semânticas + brandabilidade (hub, water, waste)
 * - Loading com progresso determinístico (percentage)
 * - Ripple effect Material Design
 * - Layout avançado (align, stack, stretch, padding)
 * - Router integration (to, replace)
 * - WCAG 2.1 AA compliant
 * 
 * @version 2.1 (React adaptation)
 * @see https://github.com/hebertchaves/design-system-sansys/tree/main/components/base/DssButton
 */

export interface DssButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Texto do botão */
  label?: string;
  /** Ícone à esquerda (Material Icons) */
  icon?: string;
  /** Ícone à direita (Material Icons) */
  iconRight?: string;
  /** Variante visual do botão */
  variant?: 'elevated' | 'flat' | 'outline' | 'unelevated' | 'push' | 'glossy' | 'text';
  /** Cor semântica */
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'positive' | 'negative' | 'warning' | 'info' | 'dark';
  /** Tamanho do botão */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Brandabilidade Sansys */
  brand?: 'hub' | 'water' | 'waste';
  /** Bordas completamente arredondadas */
  round?: boolean;
  /** Bordas quadradas (sem border-radius) */
  square?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Progresso determinístico (0-100) */
  percentage?: number;
  /** Estilo escuro da barra de progresso */
  darkPercentage?: boolean;
  /** Efeito ripple Material Design */
  ripple?: boolean;
  /** Alinhamento horizontal do conteúdo */
  align?: 'left' | 'center' | 'right' | 'between' | 'around' | 'evenly';
  /** Layout vertical (ícone acima do label) */
  stack?: boolean;
  /** Expande para preencher largura disponível */
  stretch?: boolean;
  /** Previne quebra de texto */
  noWrap?: boolean;
  /** Versão compacta do botão */
  dense?: boolean;
  /** Desabilita transformação uppercase */
  noCaps?: boolean;
  /** Tipo nativo do button HTML */
  type?: 'button' | 'submit' | 'reset';
  /** Rota de navegação (React Router) */
  to?: string;
  /** Usa replace ao invés de push */
  replace?: boolean;
  /** Children */
  children?: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
}

export function DssButton({
  label,
  icon,
  iconRight,
  variant = 'elevated',
  color = 'primary',
  size = 'md',
  brand,
  round = false,
  square = false,
  loading = false,
  percentage,
  darkPercentage = false,
  ripple = false,
  align = 'center',
  stack = false,
  stretch = false,
  noWrap = false,
  dense = false,
  noCaps = false,
  type = 'button',
  to,
  replace = false,
  disabled,
  className = '',
  children,
  style,
  ...props
}: DssButtonProps) {
  // Detecta se é icon-only (só ícone, sem label/children)
  const isIconOnly = !label && !children && (icon || iconRight);
  
  const classes = [
    'dss-button',
    `dss-button--${variant}`,
    `dss-button--${color}`,
    `dss-button--${size}`,
    brand && `dss-button--brand-${brand}`,
    round && 'dss-button--round',
    square && 'dss-button--square',
    loading && 'dss-button--loading',
    disabled && 'dss-button--disabled',
    ripple && 'dss-button--ripple',
    `dss-button--align-${align}`,
    stack && 'dss-button--stack',
    stretch && 'dss-button--stretch',
    noWrap && 'dss-button--no-wrap',
    dense && 'dss-button--dense',
    noCaps && 'dss-button--no-caps',
    isIconOnly && 'dss-button--icon-only',
    className
  ].filter(Boolean).join(' ');

  // Router integration (React Router would be handled differently, simplified here)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to && !disabled && !loading) {
      // In a real app, you'd use useNavigate from react-router
      console.warn('Router integration: navigate to', to);
    }
    if (props.onClick && !disabled && !loading) {
      props.onClick(e);
    }
  };

  const showPercentage = loading && percentage !== undefined && percentage !== null;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      style={style}
      {...props}
      onClick={handleClick}
    >
      {/* Barra de progresso determinística */}
      {showPercentage && (
        <span 
          className={`dss-button__progress ${darkPercentage ? 'dss-button__progress--dark' : ''}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      )}

      {/* Spinner de loading */}
      {loading && !showPercentage && (
        <span className="dss-button__spinner" aria-hidden="true">
          <svg className="dss-button__spinner-icon" viewBox="0 0 24 24">
            <circle 
              className="dss-button__spinner-circle" 
              cx="12" 
              cy="12" 
              r="10" 
              fill="none" 
              strokeWidth="3"
            />
          </svg>
        </span>
      )}
      
      {/* Ícone esquerdo */}
      {!loading && icon && (
        <span className="dss-button__icon dss-button__icon--left material-icons" aria-hidden="true">
          {icon}
        </span>
      )}
      
      {/* Conteúdo */}
      {!isIconOnly && (
        <span className="dss-button__content">
          {children || label}
        </span>
      )}
      
      {/* Ícone direito */}
      {!loading && iconRight && (
        <span className="dss-button__icon dss-button__icon--right material-icons" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
}