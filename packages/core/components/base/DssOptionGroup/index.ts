// DssOptionGroup — Barrel Export
// Design System Sansys v2.2 — Fase 2
// Importa sempre do Entry Point Wrapper, nunca de 1-structure diretamente.

import DssOptionGroup from './DssOptionGroup.vue'

export { DssOptionGroup }
export default DssOptionGroup

export type {
  OptionGroupProps,
  OptionGroupEmits,
  OptionGroupItem,
  OptionGroupType,
} from './types/option-group.types'

export { useDssOptionGroupClasses } from './composables'
