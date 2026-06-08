import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
  ],
  framework: getAbsolutePath('@storybook/vue3-vite'),
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()],
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
            silenceDeprecations: ['legacy-js-api', 'import'],
          },
        },
      },
    })
  },
}
export default config