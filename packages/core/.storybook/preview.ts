import type { Preview, Decorator } from '@storybook/vue3-vite'
import '../index.scss'

const withBrand: Decorator = (story, context) => ({
  setup() {
    return { brand: context.globals.brand }
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
