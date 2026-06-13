/**
 * Defaults compartilhados para o objeto `meta` dos stories DSS.
 *
 * LIMITAÇÃO DO CSF: o indexador estático do Storybook exige que o `export default`
 * de cada story file seja um objeto literal `{}`, não o resultado de uma função.
 * Por isso este módulo exporta constantes para uso com spread operator, e NÃO
 * uma factory `createDssMeta()`.
 *
 * Uso correto:
 *   const meta = {
 *     title: 'DSS/DssButton',
 *     component: DssButton,
 *     ...DSS_META_DEFAULTS,
 *     argTypes: { ...DSS_INTERACTIVE_ARG_TYPES, variant: { ... } },
 *     args: { label: 'Botão' },
 *   } satisfies Meta<typeof DssButton>
 */
export const DSS_META_DEFAULTS = {
  tags: ['autodocs'] as string[],
  parameters: {
    layout: 'padded',
  },
} as const
