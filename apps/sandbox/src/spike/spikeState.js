/**
 * SPIKE (descartável) — estado reativo compartilhado entre as 3 montagens
 * (naked / iframe / shadow). Como é um módulo único, o mesmo `reactive`
 * é visto por instâncias de app Vue distintas (sub-apps das barreiras).
 *
 * Remover junto com a pasta spike/ quando o veredito for tirado.
 */
import { reactive } from 'vue'

export const spikeState = reactive({
  brand: 'hub',      // hub | water | waste
  dark: false,       // tema escuro deve ATRAVESSAR a barreira (vazamento desejado)
  selectModel: null,
  inputModel: '',
  textareaModel: '',
})

export const SELECT_OPTIONS = [
  'Opção Alpha',
  'Opção Bravo',
  'Opção Charlie (texto mais longo para testar truncamento)',
  'Opção Delta',
]
