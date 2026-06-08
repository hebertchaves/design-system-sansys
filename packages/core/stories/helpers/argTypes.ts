import type { ArgTypes } from '@storybook/vue3-vite'

export const colorArgType = {
  control: 'select',
  options: ['primary', 'secondary', 'accent', 'positive', 'negative', 'warning', 'info'],
  description: 'Cor semântica DSS',
  table: { category: 'Aparência' },
}

export const sizeArgType = {
  control: 'select',
  options: ['xs', 'sm', 'md', 'lg', 'xl'],
  description: 'Tamanho do componente',
  table: { category: 'Aparência', defaultValue: { summary: 'md' } },
}

export const disabledArgType = {
  control: 'boolean',
  description: 'Estado desabilitado (WCAG 2.1 AA)',
  table: { category: 'Estado', defaultValue: { summary: 'false' } },
}

export const loadingArgType = {
  control: 'boolean',
  description: 'Estado de carregamento',
  table: { category: 'Estado', defaultValue: { summary: 'false' } },
}

export const labelArgType = {
  control: 'text',
  description: 'Texto visível do componente',
  table: { category: 'Conteúdo' },
}

export const roundArgType = {
  control: 'boolean',
  description: 'Formato circular (ícone sem label)',
  table: { category: 'Aparência', defaultValue: { summary: 'false' } },
}

export const roundedArgType = {
  control: 'boolean',
  description: 'Bordas arredondadas',
  table: { category: 'Aparência', defaultValue: { summary: 'false' } },
}

/** ArgTypes comuns a controles interativos (botões, chips, toggles) */
export const DSS_INTERACTIVE_ARG_TYPES: Partial<ArgTypes> = {
  color: colorArgType,
  size: sizeArgType,
  disabled: disabledArgType,
  loading: loadingArgType,
  label: labelArgType,
}

/** ArgTypes comuns a indicadores não-interativos (badges, tags, status) */
export const DSS_INDICATOR_ARG_TYPES: Partial<ArgTypes> = {
  color: colorArgType,
  size: sizeArgType,
  label: labelArgType,
}
