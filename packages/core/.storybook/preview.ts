import type { Preview, Decorator } from '@storybook/vue3-vite'
import '../index.scss'

const withBrand: Decorator = (story, context) => ({
  setup() {
    const brand = context.globals.brand
    // NORMA (Onda P0/T4): data-brand deve viver em <body> para que overlays
    // teleportados (DssDialog, DssBottomSheet, DssPopupEdit) recebam o acento
    // de brand. O wrapper div abaixo é mantido como reforço para conteúdo
    // não teleportado. Ver DSS_IMPLEMENTATION_GUIDE.md — Brandabilidade.
    if (typeof document !== 'undefined') {
      if (brand) {
        document.body.dataset.brand = brand
      } else {
        delete document.body.dataset.brand
      }
    }
    return { brand }
  },
  template: `<div :data-brand="brand || undefined"><story /></div>`,
})

const preview: Preview = {
  globalTypes: {
    brand: {
      name: 'Brand',
      description: 'Produto ativo — aplica data-brand no preview de todos os componentes',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: '',      title: 'Default' },
          { value: 'hub',   title: 'Hub (laranja)' },
          { value: 'water', title: 'Water (azul)' },
          { value: 'waste', title: 'Waste (verde)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withBrand],
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
