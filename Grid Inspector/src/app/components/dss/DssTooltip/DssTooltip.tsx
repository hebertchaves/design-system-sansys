import React, { useState, useId, cloneElement } from 'react';
import './dss-tooltip.css';

/**
 * ==========================================================================
 * DssTooltip - Design System Sansys (React Adaptation)
 * Baseado no repositório original: hebertchaves/design-system-sansys
 * ==========================================================================
 *
 * Tooltip com:
 * - 4 posições (top, bottom, left, right)
 * - Cores semânticas completas
 * - Brandabilidade
 * - Delay configurável
 * - Suporte a teclado
 * - Multi-line support
 * - Acessibilidade completa
 * @version 2.0 (React)
 */

export interface DssTooltipProps {
  /** Conteúdo do tooltip */
  content: string;
  /** Posição do tooltip */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Cor semântica */
  color?: 'dark' | 'light' | 'primary' | 'secondary' | 'tertiary' | 'positive' | 'negative' | 'warning' | 'info';
  /** Brand (hub, water, waste) - sobrescreve color */
  brand?: 'hub' | 'water' | 'waste';
  /** Delay em ms antes de mostrar */
  delay?: number;
  /** Elemento que dispara o tooltip */
  children: React.ReactElement;
  /** Classes CSS adicionais */
  className?: string;
  /** Desabilitar tooltip */
  disabled?: boolean;
}

export function DssTooltip({
  content,
  position = 'top',
  color = 'dark',
  brand,
  delay = 300,
  children,
  className = '',
  disabled = false
}: DssTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const tooltipId = useId();

  const showTooltip = () => {
    if (disabled) return;
    const id = setTimeout(() => {
      setVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setVisible(false);
  };

  const handleMouseEnter = () => {
    showTooltip();
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  const handleFocus = () => {
    showTooltip();
  };

  const handleBlur = () => {
    hideTooltip();
  };

  const tooltipClasses = [
    'dss-tooltip',
    `dss-tooltip--${position}`,
    brand ? `dss-tooltip--brand-${brand}` : `dss-tooltip--${color}`,
    visible && 'dss-tooltip--visible',
    className
  ].filter(Boolean).join(' ');

  // Clone child and add aria-describedby + event handlers
  const enhancedChild = cloneElement(children, {
    'aria-describedby': visible ? tooltipId : undefined,
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouseEnter();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouseLeave();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      handleFocus();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      handleBlur();
      children.props.onBlur?.(e);
    },
  });

  return (
    <div className="dss-tooltip-wrapper">
      {enhancedChild}
      {!disabled && (
        <div 
          id={tooltipId}
          role="tooltip" 
          className={tooltipClasses}
          aria-hidden={!visible}
        >
          {content}
          <span className="dss-tooltip__arrow"></span>
        </div>
      )}
    </div>
  );
}