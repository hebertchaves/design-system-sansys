/**
 * SPIKE (descartável) — instala o Quasar numa sub-app (iframe/shadow).
 * O DssInput depende de registro GLOBAL de Q-components (não auto-importa),
 * por isso cada barreira precisa do seu próprio app.use(Quasar, ...).
 */
import {
  Quasar, ClosePopup, Ripple,
  QInput, QField, QSelect, QItem, QItemSection, QItemLabel,
  QIcon, QMenu, QList, QSpinner, QChip,
} from 'quasar'

export function installQuasar(app) {
  app.use(Quasar, {
    components: {
      QInput, QField, QSelect, QItem, QItemSection, QItemLabel,
      QIcon, QMenu, QList, QSpinner, QChip,
    },
    directives: { ClosePopup, Ripple },
  })
}
