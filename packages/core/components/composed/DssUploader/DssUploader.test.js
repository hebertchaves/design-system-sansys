/**
 * DssUploader — Testes Unitários
 *
 * Cobertura mínima do gate (CLAUDE.md): renderização base, props,
 * eventos e slots. Criado na Onda P2/G3.1 — era um dos 3 componentes
 * sem test.js apontados pela Auditoria Final (contagem real 88/91).
 *
 * NOTA: uploads reais não são exercitados em jsdom — o contrato testado
 * é o wrapper DSS sobre o QUploader (pass-through de props, forwarding
 * de eventos e API exposta), que é a responsabilidade deste componente.
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest'
import DssUploader from './1-structure/DssUploader.ts.vue'

installQuasar()

describe('DssUploader', () => {
  // =========================================================================
  // 1. Renderização base
  // =========================================================================
  it('renderiza o componente sem erros', () => {
    const wrapper = mount(DssUploader)
    expect(wrapper.exists()).toBe(true)
  })

  it('renderiza o QUploader como motor', () => {
    const wrapper = mount(DssUploader)
    expect(wrapper.findComponent({ name: 'QUploader' }).exists()).toBe(true)
  })

  it('aplica a classe base .dss-uploader', () => {
    const wrapper = mount(DssUploader)
    expect(wrapper.find('.dss-uploader').exists()).toBe(true)
  })

  // =========================================================================
  // 2. Props (pass-through ao QUploader)
  // =========================================================================
  it('repassa url ao QUploader', () => {
    const wrapper = mount(DssUploader, { props: { url: '/api/upload' } })
    expect(wrapper.findComponent({ name: 'QUploader' }).props('url')).toBe('/api/upload')
  })

  it('repassa multiple e accept ao QUploader', () => {
    const wrapper = mount(DssUploader, {
      props: { multiple: true, accept: '.pdf' }
    })
    const q = wrapper.findComponent({ name: 'QUploader' })
    expect(q.props('multiple')).toBe(true)
    expect(q.props('accept')).toBe('.pdf')
  })

  it('repassa disable ao QUploader', () => {
    const wrapper = mount(DssUploader, { props: { disable: true } })
    expect(wrapper.findComponent({ name: 'QUploader' }).props('disable')).toBe(true)
  })

  // =========================================================================
  // 3. Eventos (forwarding do QUploader para o consumidor)
  // =========================================================================
  it('reemite added quando o QUploader adiciona arquivos', async () => {
    const wrapper = mount(DssUploader)
    const files = [{ name: 'doc.pdf', size: 10 }]
    await wrapper.findComponent({ name: 'QUploader' }).vm.$emit('added', files)
    expect(wrapper.emitted('added')).toBeTruthy()
    expect(wrapper.emitted('added')[0]).toEqual([files])
  })

  it('reemite removed quando o QUploader remove arquivos', async () => {
    const wrapper = mount(DssUploader)
    const files = [{ name: 'doc.pdf', size: 10 }]
    await wrapper.findComponent({ name: 'QUploader' }).vm.$emit('removed', files)
    expect(wrapper.emitted('removed')).toBeTruthy()
  })

  it('reemite rejected quando o QUploader rejeita arquivos', async () => {
    const wrapper = mount(DssUploader)
    const rejections = [{ failedPropValidation: 'accept', file: { name: 'x.exe' } }]
    await wrapper.findComponent({ name: 'QUploader' }).vm.$emit('rejected', rejections)
    expect(wrapper.emitted('rejected')).toBeTruthy()
  })

  // =========================================================================
  // 4. API exposta (defineExpose)
  // =========================================================================
  it('expõe a API de controle canônica (upload, abort, reset, pickFiles)', () => {
    const wrapper = mount(DssUploader)
    expect(typeof wrapper.vm.upload).toBe('function')
    expect(typeof wrapper.vm.abort).toBe('function')
    expect(typeof wrapper.vm.reset).toBe('function')
    expect(typeof wrapper.vm.pickFiles).toBe('function')
  })
})
