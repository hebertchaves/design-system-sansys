/// <reference types="vite/client" />

// Shim para imports de SFC em arquivos .ts (barrels/composables).
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
