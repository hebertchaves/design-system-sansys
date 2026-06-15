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
  // 2b. Props exclusivas DSS (não vão ao QUploader — controlam o container)
  // =========================================================================
  it('aplica a variante padrão (elevated) na classe raiz', () => {
    const wrapper = mount(DssUploader)
    expect(wrapper.find('.dss-uploader--elevated').exists()).toBe(true)
  })

  it('aplica a variante informada na classe raiz', () => {
    const wrapper = mount(DssUploader, { props: { variant: 'outline' } })
    expect(wrapper.find('.dss-uploader--outline').exists()).toBe(true)
  })

  it('reflete o brand na classe e no atributo data-brand do root', () => {
    const wrapper = mount(DssUploader, { props: { brand: 'water' } })
    const root = wrapper.find('.dss-uploader')
    expect(root.classes()).toContain('dss-uploader--brand-water')
    expect(root.attributes('data-brand')).toBe('water')
  })

  it('não define data-brand quando o brand é omitido', () => {
    const wrapper = mount(DssUploader)
    expect(wrapper.find('.dss-uploader').attributes('data-brand')).toBeUndefined()
  })

  it('aplica os modificadores de estado disabled e readonly na raiz', () => {
    const wrapper = mount(DssUploader, { props: { disable: true, readonly: true } })
    const root = wrapper.find('.dss-uploader')
    expect(root.classes()).toContain('dss-uploader--disabled')
    expect(root.classes()).toContain('dss-uploader--readonly')
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

  // =========================================================================
  // 5. Slots / Reconstrução interna (EXC-01)
  // =========================================================================
  // DssUploader NÃO expõe slots públicos (DssUploaderSlots é vazio). O contrato
  // de "slots" deste componente é a SOBRESCRITA dos slots header/list do
  // QUploader: a UI é reconstruída com componentes DSS e nenhuma UI nativa
  // do Quasar (QBtn/QLinearProgress próprios do uploader) é renderizada.

  it('reconstrói o header como toolbar DSS (EXC-01)', () => {
    const wrapper = mount(DssUploader)
    const header = wrapper.find('.dss-uploader__header')
    expect(header.exists()).toBe(true)
    expect(header.attributes('role')).toBe('toolbar')
  })

  it('usa DssButton (não QBtn nativo) nas ações do header', () => {
    const wrapper = mount(DssUploader)
    const buttons = wrapper.findAllComponents({ name: 'DssButton' })
    expect(buttons.length).toBeGreaterThan(0)
    // No estado vazio e editável, a ação "Adicionar" deve estar presente.
    expect(buttons.some((b) => b.text().includes('Adicionar'))).toBe(true)
  })

  it('renderiza a dropzone com o label padrão quando a fila está vazia', () => {
    const wrapper = mount(DssUploader)
    const dropzone = wrapper.find('.dss-uploader__dropzone')
    expect(dropzone.exists()).toBe(true)
    expect(dropzone.text()).toContain('Arraste arquivos aqui')
  })

  it('usa o label customizado na dropzone vazia', () => {
    const label = 'Solte seus comprovantes aqui'
    const wrapper = mount(DssUploader, { props: { label } })
    expect(wrapper.find('.dss-uploader__dropzone').text()).toContain(label)
  })

  it('expõe a dica de tipos aceitos a partir da prop accept', () => {
    const wrapper = mount(DssUploader, { props: { accept: '.pdf,.png' } })
    expect(wrapper.find('.dss-uploader__dropzone-hint').text()).toContain('.pdf,.png')
  })

  it('oculta a ação "Adicionar" no modo readonly', () => {
    const wrapper = mount(DssUploader, { props: { readonly: true } })
    const hasAdd = wrapper
      .findAllComponents({ name: 'DssButton' })
      .some((b) => b.text().includes('Adicionar'))
    expect(hasAdd).toBe(false)
  })

  it('mantém a região aria-live de status para leitores de tela', () => {
    const wrapper = mount(DssUploader)
    const status = wrapper.find('.dss-uploader__sr-status')
    expect(status.exists()).toBe(true)
    expect(status.attributes('role')).toBe('status')
    expect(status.attributes('aria-live')).toBe('polite')
  })
})
