import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DssDataCard from './DssDataCard.vue'

describe('DssDataCard', () => {
  it('renderiza com props padrão', () => {
    const wrapper = mount(DssDataCard, {
      props: { title: 'Título de teste' },
    })
    expect(wrapper.find('.dss-data-card').exists()).toBe(true)
    expect(wrapper.text()).toContain('Título de teste')
  })

  it('exibe subtítulo quando fornecido', () => {
    const wrapper = mount(DssDataCard, {
      props: { title: 'T', subtitle: 'Sub' },
    })
    expect(wrapper.find('.dss-data-card__subtitle').text()).toBe('Sub')
  })

  it('aplica classe --disabled quando disabled=true', () => {
    const wrapper = mount(DssDataCard, {
      props: { disabled: true },
    })
    expect(wrapper.find('.dss-data-card--disabled').exists()).toBe(true)
  })

  it('aplica classe --loading e exibe skeleton quando loading=true', () => {
    const wrapper = mount(DssDataCard, {
      props: { loading: true },
    })
    expect(wrapper.find('.dss-data-card--loading').exists()).toBe(true)
    expect(wrapper.find('.dss-data-card__skeleton').exists()).toBe(true)
  })

  it('propaga [data-brand] para o elemento raiz', () => {
    const wrapper = mount(DssDataCard, {
      props: { brand: 'hub' },
    })
    expect(wrapper.find('[data-brand="hub"]').exists()).toBe(true)
  })

  it('exibe abas quando tabs é fornecida', () => {
    const tabs = [
      { name: 'a', label: 'Aba A' },
      { name: 'b', label: 'Aba B' },
    ]
    const wrapper = mount(DssDataCard, {
      props: { tabs },
    })
    expect(wrapper.find('.dss-data-card__tabs').exists()).toBe(true)
  })

  it('não exibe paginação quando totalItems=0', () => {
    const wrapper = mount(DssDataCard, {
      props: { totalItems: 0 },
    })
    expect(wrapper.find('.dss-data-card__pagination').exists()).toBe(false)
  })

  it('emite refresh ao clicar no botão de atualizar', async () => {
    const wrapper = mount(DssDataCard)
    await wrapper.find('[aria-label="Atualizar dados"]').trigger('click')
    expect(wrapper.emitted('refresh')).toBeTruthy()
  })

  it('renderiza slot toolbar-actions', () => {
    const wrapper = mount(DssDataCard, {
      slots: { 'toolbar-actions': '<button id="custom-btn">Ação</button>' },
    })
    expect(wrapper.find('#custom-btn').exists()).toBe(true)
  })

  it('renderiza slot footer quando fornecido', () => {
    const wrapper = mount(DssDataCard, {
      slots: { footer: '<div id="footer-content">Rodapé</div>' },
    })
    expect(wrapper.find('#footer-content').exists()).toBe(true)
  })

  it('renderiza slot default sem abas', () => {
    const wrapper = mount(DssDataCard, {
      slots: { default: '<p id="default-slot">Conteúdo</p>' },
    })
    expect(wrapper.find('#default-slot').exists()).toBe(true)
  })

  it('emite tab-change ao trocar de aba', async () => {
    const tabs = [
      { name: 'x', label: 'X' },
      { name: 'y', label: 'Y' },
    ]
    const wrapper = mount(DssDataCard, { props: { tabs } })
    wrapper.vm.onTabChange('y')
    expect(wrapper.emitted('tab-change')?.[0]).toEqual(['y'])
  })
})
