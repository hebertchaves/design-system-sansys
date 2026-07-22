/**
 * ==========================================================================
 * DssFile - UNIT TESTS
 *
 * COBERTURA:
 * - Props: modelValue (File/File[]), multiple, accept, maxFiles, maxFileSize, disabled, readonly, clearable, label, placeholder, brand
 * - Value/Model: v-model File/File[] array
 * - Eventos: update:modelValue, add, remove, rejected
 * - Slots: prepend, append, label-slot
 * - Acessibilidade: aria-label, tabindex, data-brand
 * - Brands: Hub, Water, Waste
 *
 * NOTA: DssFile usa QFile (Quasar) internamente com overlay transparente.
 * A área de drag-and-drop é visual apenas (aria-hidden).
 *
 * GOLDEN COMPONENT: DssCheckbox.test.js (padrão de testes)
 * ==========================================================================
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssFile from './1-structure/DssFile.ts.vue'

installQuasar()

describe('DssFile', () => {
  // ===========================================================================
  // PROPS TESTS
  // ===========================================================================

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = mount(DssFile)
      expect(wrapper.classes()).toContain('dss-file')
    })

    it('renders wrapper div as root', () => {
      const wrapper = mount(DssFile)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('renders drop hint when no file is selected', () => {
      const wrapper = mount(DssFile, {
        props: { modelValue: null }
      })
      expect(wrapper.find('.dss-file__drop-hint').exists()).toBe(true)
    })

    it('renders custom placeholder text', () => {
      const wrapper = mount(DssFile, {
        props: { modelValue: null, placeholder: 'Solte o arquivo aqui' }
      })
      expect(wrapper.text()).toContain('Solte o arquivo aqui')
    })

    it('renders label when label is set', () => {
      const wrapper = mount(DssFile, {
        props: { modelValue: null, label: 'Anexar documento' }
      })
      expect(wrapper.text()).toContain('Anexar documento')
    })

    // Padrão B da família (label × placeholder): com um label em repouso (sem valor,
    // sem foco), o drop-hint (papel de placeholder) JÁ aparece — a sobreposição com o
    // label é evitada flutuando o label no topo, não escondendo a dica. Paridade com
    // DssInput/DssSelect/DssTextarea.
    it('shows drop hint at rest when a label is present (label floats, no overlap)', () => {
      const wrapper = mount(DssFile, {
        props: { modelValue: null, label: 'Anexar documento' }
      })
      expect(wrapper.find('.dss-file__drop-hint').exists()).toBe(true)
    })

    describe('states', () => {
      it('applies disabled state', () => {
        const wrapper = mount(DssFile, {
          props: { disabled: true }
        })
        expect(wrapper.classes().join(' ')).toContain('disabled')
      })

      it('applies readonly state', () => {
        const wrapper = mount(DssFile, {
          props: { readonly: true }
        })
        expect(wrapper.classes().join(' ')).toContain('readonly')
      })

      it('does not show drop hint when disabled', () => {
        const wrapper = mount(DssFile, {
          props: { modelValue: null, disabled: true }
        })
        expect(wrapper.find('.dss-file__drop-hint').exists()).toBe(false)
      })

      it('does not show drop hint when readonly', () => {
        const wrapper = mount(DssFile, {
          props: { modelValue: null, readonly: true }
        })
        expect(wrapper.find('.dss-file__drop-hint').exists()).toBe(false)
      })

      it('shows value area when a file is set', () => {
        const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
        const wrapper = mount(DssFile, {
          props: { modelValue: file }
        })
        expect(wrapper.find('.dss-file__value').exists()).toBe(true)
      })

      // Regressão (colisão de classe): o estado "tem valor" usa `--has-value`,
      // NÃO `--filled` — que é a VARIANTE. Antes, um outlined COM arquivo ganhava
      // `--filled` e herdava o visual da variante filled (borda vira só inferior).
      it('outlined com valor usa --has-value e NÃO --filled (sem colisão de variante)', () => {
        const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
        const wrapper = mount(DssFile, {
          props: { variant: 'outlined', modelValue: file }
        })
        const cls = wrapper.find('.dss-file').classes()
        expect(cls).toContain('dss-file--outlined')
        expect(cls).toContain('dss-file--has-value')
        expect(cls).not.toContain('dss-file--filled')
      })

      it('shows clear button when clearable=true and has value', () => {
        const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
        const wrapper = mount(DssFile, {
          props: { clearable: true, modelValue: file }
        })
        expect(wrapper.find('.dss-file__clear').exists()).toBe(true)
      })

      // Regressão (adequação de UI): o QFile é renderizado opacity:0 (overlay).
      // O botão de limpar ficava DENTRO dele → invisível (opacity do pai zera os
      // descendentes). Deve ser sibling do wrapper, fora do overlay.
      it('renders clear button OUTSIDE the opacity:0 QFile overlay', () => {
        const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
        const wrapper = mount(DssFile, {
          props: { clearable: true, modelValue: file }
        })
        const clear = wrapper.find('.dss-file__clear')
        const qFile = wrapper.find('.dss-file__q-file')
        expect(clear.exists()).toBe(true)
        expect(qFile.element.contains(clear.element)).toBe(false)
      })

      // Regressão: prepend/append sofriam o MESMO vício do clear — renderizados
      // dentro do QFile opacity:0 → invisíveis. Agora são filhos da linha visual.
      it('renders prepend/append slots OUTSIDE the opacity:0 QFile overlay', () => {
        const wrapper = mount(DssFile, {
          props: { label: 'Anexo' },
          slots: { prepend: '<i class="my-prep"></i>', append: '<i class="my-app"></i>' }
        })
        const qFile = wrapper.find('.dss-file__q-file')
        const prep = wrapper.find('.dss-file__prepend')
        const app = wrapper.find('.dss-file__append')
        expect(prep.exists()).toBe(true)
        expect(app.exists()).toBe(true)
        expect(qFile.element.contains(prep.element)).toBe(false)
        expect(qFile.element.contains(app.element)).toBe(false)
      })

      it('hides clear button when clearable=true but no value', () => {
        const wrapper = mount(DssFile, {
          props: { clearable: true, modelValue: null }
        })
        expect(wrapper.find('.dss-file__clear').exists()).toBe(false)
      })
    })
  })

  // ===========================================================================
  // VALUE / MODEL TESTS
  // ===========================================================================

  describe('Value / Model', () => {
    it('renders without crash with null modelValue', () => {
      const wrapper = mount(DssFile, {
        props: { modelValue: null }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('renders without crash with File[] modelValue', () => {
      const files = [
        new File(['a'], 'a.pdf', { type: 'application/pdf' }),
        new File(['b'], 'b.pdf', { type: 'application/pdf' }),
      ]
      const wrapper = mount(DssFile, {
        props: { modelValue: files, multiple: true }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('emits clear event when clear button is clicked', async () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      const wrapper = mount(DssFile, {
        props: { clearable: true, modelValue: file }
      })
      await wrapper.find('.dss-file__clear').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
  })

  // ===========================================================================
  // ACCESSIBILITY TESTS
  // ===========================================================================

  describe('Accessibility', () => {
    it('sets aria-label on QFile when ariaLabel is provided', () => {
      const wrapper = mount(DssFile, {
        props: { ariaLabel: 'Selecionar arquivo de currículo' }
      })
      // Contrato real: o QFile aplica aria-label no <input> nativo interno
      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(input.attributes('aria-label')).toBe('Selecionar arquivo de currículo')
    })

    it('drop hint area is aria-hidden (decorativo)', () => {
      const wrapper = mount(DssFile, {
        props: { modelValue: null }
      })
      // A camada visual duplicada (.dss-file__control — que contém a dica de drop)
      // é decorativa: o QFile já anuncia via aria-label, então ela leva aria-hidden.
      // O wrapper .dss-file__field NÃO é aria-hidden — contém controles REAIS e
      // visíveis (prepend/append/clear). Ver DssFile.ts.vue (adequação de UI).
      const control = wrapper.find('.dss-file__control')
      expect(control.exists()).toBe(true)
      expect(control.attributes('aria-hidden')).toBe('true')
    })

    it('remove o foco por teclado quando disabled (contrato real do QFile)', () => {
      const wrapper = mount(DssFile, {
        props: { disabled: true }
      })
      // O alvo focável é .q-field__native; desabilitado, o tabindex deixa
      // de ser 0 (removido ou -1 conforme a versão do Quasar)
      const native = wrapper.find('.q-field__native')
      expect(native.exists()).toBe(true)
      expect(native.attributes('tabindex')).not.toBe('0')
    })
  })

  // ===========================================================================
  // BRAND TESTS
  // ===========================================================================

  describe('Brand', () => {
    // Contrato real (norma DSS — precedente DssCheckbox/DssChip/DssRadio): a prop
    // `brand` renderiza `data-brand` no root (remapeia os tokens de brand na subárvore,
    // incl. --dss-action-primary/--dss-focus-primary do anel de foco) E mantém a classe
    // `dss-file--brand-*` para o CSS matching do _brands.scss.
    it.each(['hub', 'water', 'waste'])('sets data-brand="%s" on root', (brand) => {
      const wrapper = mount(DssFile, { props: { brand } })
      expect(wrapper.attributes('data-brand')).toBe(brand)
      expect(wrapper.classes()).toContain(`dss-file--brand-${brand}`)
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssFile)
      expect(wrapper.attributes('data-brand')).toBeUndefined()
      expect(wrapper.classes().some(c => c.includes('--brand-'))).toBe(false)
    })
  })
})
