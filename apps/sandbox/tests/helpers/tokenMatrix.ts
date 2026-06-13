export const BRIDGE_PAIRS: [string, string][] = [
  ['--q-primary',   '--dss-action-primary'],
  ['--q-secondary', '--dss-action-secondary'],
  ['--q-accent',    '--dss-action-accent'],
  ['--q-positive',  '--dss-feedback-success'],
  ['--q-negative',  '--dss-feedback-error'],
  ['--q-warning',   '--dss-feedback-warning'],
  ['--q-info',      '--dss-feedback-info'],
  ['--q-dark',      '--dss-gray-900'],
]

export const UTILITY_CLASSES: { cls: string; prop: string; token: string }[] = [
  { cls: 'bg-primary',   prop: 'backgroundColor', token: '--dss-action-primary' },
  { cls: 'bg-secondary', prop: 'backgroundColor', token: '--dss-action-secondary' },
  { cls: 'bg-accent',    prop: 'backgroundColor', token: '--dss-action-accent' },
  { cls: 'bg-positive',  prop: 'backgroundColor', token: '--dss-feedback-success' },
  { cls: 'bg-negative',  prop: 'backgroundColor', token: '--dss-feedback-error' },
  { cls: 'bg-warning',   prop: 'backgroundColor', token: '--dss-feedback-warning' },
  { cls: 'bg-info',      prop: 'backgroundColor', token: '--dss-feedback-info' },
  { cls: 'text-primary',   prop: 'color', token: '--dss-action-primary' },
  { cls: 'text-secondary', prop: 'color', token: '--dss-action-secondary' },
  { cls: 'text-positive',  prop: 'color', token: '--dss-feedback-success' },
  { cls: 'text-negative',  prop: 'color', token: '--dss-feedback-error' },
  { cls: 'text-warning',   prop: 'color', token: '--dss-feedback-warning' },
  { cls: 'text-info',      prop: 'color', token: '--dss-feedback-info' },
]

export const BRANDS = ['hub', 'water', 'waste'] as const
export type Brand = typeof BRANDS[number]

/** Cor Quasar default para primary — nunca deve aparecer no DSS. */
export const QUASAR_DEFAULT_PRIMARY = 'rgb(25, 118, 210)'
