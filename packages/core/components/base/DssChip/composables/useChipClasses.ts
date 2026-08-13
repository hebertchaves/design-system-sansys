/**
 * ==========================================================================
 * useChipClasses Composable
 * ==========================================================================
 *
 * Composable para gerar classes CSS do DssChip
 *
 * ESTRATEGIA DE CORES: UM caminho so — `.dss-chip--{color}`, sempre.
 *
 * Antes havia DOIS caminhos: sem brand emitia as utilities do Quasar
 * (`.bg-primary`/`.text-white`) e com brand trocava por `.dss-chip--{color}`,
 * que era casada em `4-output/_brands.scss`. O problema: aquele arquivo
 * implementava 3 das 9 cores (primary, secondary, accent). Com `brand` +
 * qualquer uma das outras 6 (tertiary, positive, negative, warning, info,
 * neutral) a classe nao casava com regra nenhuma e o chip ficava PRETO, sem
 * fundo e sem cor — medido `rgb(0,0,0)` no navegador.
 *
 * Agora a cor e sempre resolvida pelo SCSS do proprio DSS
 * (`3-variants/_colors.scss`), que cobre as 9 e usa tokens brand-aware. As
 * utilities do Quasar sairam de cena: nao sao brand-aware e, por serem
 * `!important` dentro de layer, disputavam a cascata com o CSS do DSS.
 *
 * @example
 * ```ts
 * const { chipClasses } = useChipClasses(props, { hasDefaultSlot })
 * ```
 */

import { computed, type Ref } from 'vue'
import type { ChipProps } from '../types/chip.types'

interface UseChipClassesOptions {
  /** Se o slot default tem conteudo */
  hasDefaultSlot: Ref<boolean>
}

/**
 * Composable para classes CSS do chip
 */
export function useChipClasses(
  props: Readonly<ChipProps>,
  options: UseChipClassesOptions
) {
  /**
   * Classes CSS computadas do chip.
   *
   * A cor NAO depende mais de haver brand: sai sempre `dss-chip--{color}` e o
   * SCSS decide o resto. O `brand` continua chegando ao CSS pelo atributo
   * `data-brand` no root (ver 1-structure), que e o que remapeia os tokens
   * `--dss-action-*`.
   */
  const chipClasses = computed(() => {
    // Detecta se tem apenas icone (sem label)
    const hasLabel = !!(props.label || options.hasDefaultSlot.value)
    const hasIcon = !!(props.icon || props.iconRight)
    const isIconOnly = hasIcon && !hasLabel

    return [
      // Classe base
      'dss-chip',

      // Variante visual
      `dss-chip--${props.variant}`,

      // Cor: SEMPRE a classe DSS, com ou sem brand. Ver o bloco de racional no
      // topo deste arquivo — o caminho duplo (utility do Quasar sem brand,
      // classe DSS com brand) era a causa do chip preto.
      `dss-chip--${props.color}`,

      // Tamanho
      `dss-chip--${props.size}`,

      // Classes condicionais
      {
        'dss-chip--square': props.square,
        'dss-chip--selected': props.selected,
        'dss-chip--disabled': props.disable,
        'dss-chip--dense': props.dense,
        'dss-chip--clickable': props.clickable,
        'dss-chip--removable': props.removable,
        'dss-chip--icon-only': isIconOnly
      }
    ]
  })

  return {
    chipClasses
  }
}
