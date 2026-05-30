// Componente (entry point wrapper)
export { default as DssPopupEdit } from './DssPopupEdit.vue'

// Nota: usePopupEditClasses não é exportado publicamente.
// O composable existe como artefato de convenção DSS, mas não pode ser aplicado
// ao container .q-popup-edit teleportado (EXC-Gate-02 — sem popup-content-class).
// Consumers que precisam de classes DSS condicionais devem usá-las num wrapper externo.
