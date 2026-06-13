import { computed } from 'vue'
import type { BreadcrumbsProps } from '../types/breadcrumbs.types'

/**
 * Retorna as classes de modificador BEM para o DssBreadcrumbs.
 *
 * Responsabilidades:
 * - Classe base `dss-breadcrumbs`
 * - Modificador de gutter (`--gutter-sm`, `--gutter-md`, `--gutter-lg`)
 * - Modificador de alinhamento (`--align-left`, `--align-center`, etc.)
 * - Modificador de brand (`--brand-hub`, `--brand-water`, `--brand-waste`)
 *
 * ARQUITETURA: Classes BEM vs. CSS Custom Properties
 *
 * As classes `--gutter-{sm|md|lg}` são geradas aqui para rastreabilidade BEM —
 * ao inspecionar o DOM, a classe revela o gutter ativo. No entanto, o comportamento
 * VISUAL de espaçamento é implementado exclusivamente via CSS custom property
 * `--dss-breadcrumbs-gap`, injetada como inline style no template (Layer 1).
 *
 * Por que as classes não disparam CSS em 3-variants/_gutter.scss:
 *   1. O valor de gap já está definido na CSS custom property do inline style
 *   2. Definir gap duas vezes (classe + inline style) criaria duplicação desnecessária
 *   3. A CSS custom property permite override externo sem aumentar especificidade CSS
 *
 * Por que as classes existem no DOM:
 *   1. Rastreabilidade BEM — inspecionar o elemento revela o gutter ativo
 *   2. Possível uso futuro em media queries (ex: reduzir gap em mobile)
 *   3. Consistência com outros modificadores de layout DSS
 *
 * @see 1-structure/DssBreadcrumbs.ts.vue — injeção do inline style com --dss-breadcrumbs-gap
 * @see 2-composition/_base.scss — consumo de --dss-breadcrumbs-gap via gap: var(...)
 * @see 3-variants/_gutter.scss — documentação arquitetural das classes BEM
 */
export function useBreadcrumbsClasses(props: BreadcrumbsProps) {
  const breadcrumbsClasses = computed(() => [
    'dss-breadcrumbs',
    {
      [`dss-breadcrumbs--gutter-${props.gutter}`]: props.gutter,
      [`dss-breadcrumbs--align-${props.align}`]: props.align && props.align !== 'left',
      [`dss-breadcrumbs--brand-${props.brand}`]: props.brand,
    },
  ])

  return { breadcrumbsClasses }
}
