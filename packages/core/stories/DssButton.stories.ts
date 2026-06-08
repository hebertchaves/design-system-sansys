import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'
import DssButton from '../components/base/DssButton/DssButton.vue'
import { DSS_META_DEFAULTS } from './helpers/createMeta'
import { DSS_INTERACTIVE_ARG_TYPES } from './helpers/argTypes'
import { flexRow, statesRow } from './helpers/renderHelpers'

const meta = {
  title: 'DSS/DssButton',
  component: DssButton,
  ...DSS_META_DEFAULTS,
  argTypes: {
    ...DSS_INTERACTIVE_ARG_TYPES,
    variant: {
      control: 'select',
      options: ['elevated', 'flat', 'outline', 'unelevated', 'push', 'glossy'],
      description: 'Variante visual do botão',
      table: { category: 'Aparência', defaultValue: { summary: 'elevated' } },
    },
    round:     { control: 'boolean', table: { category: 'Aparência' } },
    rounded:   { control: 'boolean', table: { category: 'Aparência' } },
    iconLeft:  { control: 'text',    table: { category: 'Conteúdo' } },
    iconRight: { control: 'text',    table: { category: 'Conteúdo' } },
  },
  args: {
    label: 'Ação principal',
    variant: 'elevated',
    color: 'primary',
    size: 'md',
    onClick: fn(),
  },
} satisfies Meta<typeof DssButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variantes: Story = {
  name: 'Variantes visuais',
  render: flexRow(DssButton, [
    { label: 'Elevated',   variant: 'elevated' },
    { label: 'Flat',       variant: 'flat' },
    { label: 'Outline',    variant: 'outline' },
    { label: 'Unelevated', variant: 'unelevated' },
    { label: 'Push',       variant: 'push' },
    { label: 'Glossy',     variant: 'glossy' },
  ]),
}

export const Cores: Story = {
  name: 'Cores semânticas',
  render: flexRow(DssButton, [
    { label: 'Primary',   color: 'primary' },
    { label: 'Secondary', color: 'secondary' },
    { label: 'Accent',    color: 'accent' },
    { label: 'Positive',  color: 'positive' },
    { label: 'Negative',  color: 'negative' },
    { label: 'Warning',   color: 'warning' },
    { label: 'Info',      color: 'info' },
  ]),
}

export const Tamanhos: Story = {
  name: 'Tamanhos',
  render: flexRow(DssButton, [
    { label: 'XS', size: 'xs' },
    { label: 'SM', size: 'sm' },
    { label: 'MD', size: 'md' },
    { label: 'LG', size: 'lg' },
    { label: 'XL', size: 'xl' },
  ]),
}

export const Estados: Story = {
  name: 'Estados',
  render: statesRow(DssButton, { variant: 'elevated' }),
}

export const ComIcones: Story = {
  name: 'Com ícones',
  render: flexRow(DssButton, [
    { label: 'Salvar',  iconLeft: 'save' },
    { label: 'Enviar',  iconRight: 'send' },
    { iconLeft: 'add',  round: true },
    { label: 'Buscar',  iconLeft: 'search', color: 'secondary', variant: 'outline' },
  ]),
}
