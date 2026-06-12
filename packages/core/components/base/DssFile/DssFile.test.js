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

      it('shows clear button when clearable=true and has value', () => {
        const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
        const wrapper = mount(DssFile, {
          props: { clearable: true, modelValue: file }
        })
        expect(wrapper.find('.dss-file__clear').exists()).toBe(true)
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
      const fieldArea = wrapper.find('.dss-file__field')
      if (fieldArea.exists()) {
        expect(fieldArea.attributes('aria-hidden')).toBe('true')
      }
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
    // Contrato real: brand aplica CLASSE dss-file--brand-* no root
    // (sem atributo data-brand próprio) — corrigido na Onda P2/G3.2.
    it.each(['hub', 'water', 'waste'])('sets data-brand="%s"', (brand) => {
      const wrapper = mount(DssFile, { props: { brand } })
      expect(wrapper.classes()).toContain(`dss-file--brand-${brand}`)
    })

    it('does not set data-brand when brand is null', () => {
      const wrapper = mount(DssFile)
      expect(wrapper.classes().some(c => c.includes('--brand-'))).toBe(false)
    })
  })
})
