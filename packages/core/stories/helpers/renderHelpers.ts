/** Estilos base reutilizáveis para containers de showcase */
const FLEX_ROW = 'display:flex;gap:12px;flex-wrap:wrap;align-items:center;padding:16px'
const FLEX_COL = 'display:flex;flex-direction:column;gap:16px;padding:16px'

/**
 * Cria um render de linha horizontal com múltiplas instâncias do componente.
 * Ideal para mostrar variantes, cores ou tamanhos lado a lado.
 *
 * @example
 * export const Cores: Story = {
 *   render: flexRow(DssButton, [
 *     { label: 'Primary',  color: 'primary' },
 *     { label: 'Negative', color: 'negative' },
 *   ])
 * }
 */
export function flexRow(
  Component: any,
  items: Record<string, any>[],
  containerStyle = FLEX_ROW
) {
  return () => ({
    components: { Component },
    setup: () => ({ items }),
    template: `
      <div style="${containerStyle}">
        <Component v-for="(props, i) in items" :key="i" v-bind="props" />
      </div>
    `,
  })
}

/**
 * Cria um render em coluna com label de seção para cada grupo.
 * Ideal para mostrar variações de brand ou dark/light mode.
 */
export function flexColumn(
  Component: any,
  groups: { label: string; props: Record<string, any>[] }[],
  containerStyle = FLEX_COL
) {
  return () => ({
    components: { Component },
    setup: () => ({ groups }),
    template: `
      <div style="${containerStyle}">
        <div v-for="group in groups" :key="group.label">
          <p style="font-size:11px;font-weight:600;margin:0 0 8px;opacity:.6;text-transform:uppercase">
            {{ group.label }}
          </p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
            <Component v-for="(props, i) in group.props" :key="i" v-bind="props" />
          </div>
        </div>
      </div>
    `,
  })
}

/**
 * Atalho para o story de estados padrão: Normal → Disabled → Loading.
 * A maioria dos componentes interativos DSS tem esses três estados.
 */
export function statesRow(Component: any, baseProps: Record<string, any> = {}) {
  return flexRow(Component, [
    { ...baseProps, label: 'Normal' },
    { ...baseProps, label: 'Disabled', disabled: true },
    { ...baseProps, label: 'Loading', loading: true },
  ])
}
