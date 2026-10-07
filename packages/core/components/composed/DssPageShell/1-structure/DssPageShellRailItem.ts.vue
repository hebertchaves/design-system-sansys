<template>
  <li class="dss-page-shell__rail-cell">
    <button
      type="button"
      :class="railItemClasses"
      :title="label"
      :disabled="disabled"
      :aria-current="active ? 'page' : undefined"
      v-bind="$attrs"
      @click="emit('click', $event)"
    >
      <!-- `inline` + classe própria, e SEM `size`: no modo inline o DssIcon não
           emite classe de tamanho (CCI §2.2) — quem dimensiona é a `font-size`
           do host. O `size="sm"` que estava aqui era INERTE, e o ícone caía no
           `font-size: inherit`, puxando a tipografia de quem montasse a tela.
           Medido no grid master: 14px, herdados do `font-size` da PÁGINA.
           Mesmo padrão do DssButton, que dimensiona `.dss-button__icon`. -->
      <DssIcon :name="icon" class="dss-page-shell__rail-icon" inline decorative />
      <span class="dss-page-shell__rail-label">{{ label }}</span>
    </button>
  </li>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssPageShellRailItem — Layer 1: Structure
 * ==========================================================================
 *
 * Um módulo no rail. Ícone visível, nome legível só para leitor de tela.
 *
 * O NOME NÃO É OPCIONAL, e não é por formalidade:
 *
 * O rail mostra apenas ícones. Um `<button>` cujo único conteúdo é um ícone
 * decorativo é um botão SEM NOME — ele existe no DOM e não existe para quem
 * navega por leitor de tela. Por isso `label` é obrigatório e vai para dois
 * lugares: um `<span>` visualmente oculto (o nome acessível) e o `title` (a
 * dica de quem usa mouse).
 *
 * `aria-current="page"` ACOMPANHA o estado visual:
 *
 * Pintar o item ativo sem marcar `aria-current` deixaria quem usa leitor de
 * tela sem saber em que módulo está — a informação existiria só na cor, que é
 * o que a WCAG 1.4.1 proíbe.
 */

import DssIcon from '../../../base/DssIcon/DssIcon.vue'
import type { PageShellRailItemProps, PageShellRailItemEmits } from '../types/page-shell.types'
import { useRailItemClasses } from '../composables'

defineOptions({
  name: 'DssPageShellRailItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PageShellRailItemProps>(), {
  active: false,
  disabled: false,
})

const emit = defineEmits<PageShellRailItemEmits>()

const { railItemClasses } = useRailItemClasses(props)
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
