<template>
  <span
    :class="iconClasses"
    :aria-hidden="a11yEfetiva.oculto ? 'true' : undefined"
    :aria-label="a11yEfetiva.nome"
    :role="a11yEfetiva.papel"
  >
    <!--
      Dependencia interna: QIcon (Quasar Framework)
      O DssIcon delega a renderizacao do icone ao QIcon,
      adicionando a camada DSS de tokens, brands e acessibilidade.
    -->
    <q-icon
      :name="name"
      class="dss-icon__inner"
    />
    <slot />
  </span>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssIcon - Design System Sansys Icon Component
 * ==========================================================================
 *
 * Componente base estrutural do DSS para exibicao de icones.
 * Funciona como fundacao para DssButton, DssChip, DssBadge,
 * DssListItem, DssToolbar, DssCard, e demais componentes DSS.
 *
 * DEPENDENCIA INTERNA: QIcon (Quasar Framework)
 * GOLDEN CONTEXT: DssBadge (nao interativo)
 * TOUCH TARGET: Opcao B — NAO implementado (responsabilidade do wrapper)
 *
 * MODOS DE USO:
 * - Standalone: icone independente com acessibilidade propria
 * - Embedded: dentro de outro componente DSS (herda cor via currentColor)
 *
 * @see DssBadge - Golden Context
 * @version 2.2.0
 * @author Hebert Daniel Oliveira Chaves
 */

import { computed, watchEffect } from 'vue'
import type { IconProps } from '../types/icon.types'
import { useIconClasses } from '../composables'

// ==========================================================================
// COMPONENT NAME
// ==========================================================================

defineOptions({
  name: 'DssIcon'
})

// ==========================================================================
// PROPS
// ==========================================================================

const props = withDefaults(defineProps<IconProps>(), {
  // Visual
  size: 'md',
  color: null,
  inline: false,

  // Brand
  brand: null,

  // Animation
  spin: false,
  pulse: false,

  // Accessibility
  decorative: false,
  ariaLabel: undefined
})

// ==========================================================================
// COMPOSABLES
// ==========================================================================

const { iconClasses } = useIconClasses(props)

/**
 * Modo de acessibilidade EFETIVO — espelha o que DssImg e DssVideo já fazem.
 *
 * ACHADO DA ADEQUAÇÃO (set/2026). O DSS_ICON_COMPOSITION_CONTRACT §2.1 diz:
 * "`decorative=false` (standalone) → `role="img"` + **`ariaLabel` obrigatório**".
 * Mas o tipo declara `ariaLabel?: string` e NADA verificava em runtime. O estado
 * inválido era aceito em silêncio, e medido na árvore de a11y do Chrome: um
 * `role="img"` sem nome cujo único conteúdo é `aria-hidden` é **PODADO** — o ícone
 * informativo simplesmente não existe para a tecnologia assistiva. Nenhum aviso.
 * Varredura do repositório: **62 usos** sem `decorative`, sem `ariaLabel` e sem
 * `aria-hidden` — ou seja, nesse estado.
 *
 * O `DssIcon` era o fora-da-curva da própria família: o `DssImg` adverte quando
 * falta `alt` (WCAG 1.1.1) e o `DssVideo` quando falta `title` (WCAG 4.1.2), ambos
 * caindo para um fallback seguro. Aqui se faz o mesmo, sem inventar padrão novo.
 *
 * Fallback seguro = tratar como decorativo. O Chrome já poda o nó sem nome, então
 * para a tecnologia assistiva o resultado é o mesmo; a diferença é que passa a ser
 * EXPLÍCITO (e consistente em navegadores que anunciariam "imagem" sem nome).
 */
/**
 * `spin` e `pulse` são mutuamente exclusivos na prática, e nada dizia isso.
 * Medido: com as duas props ativas, `animationName` resolve para `dss-icon-pulse` —
 * as duas classes têm a mesma especificidade, então a ordem no arquivo decide e o
 * `spin` é descartado em silêncio. Avisar é mais honesto que compor duas animações
 * infinitas no mesmo elemento, que ninguém pediu.
 */
if (import.meta.env?.DEV) {
  watchEffect(() => {
    if (props.spin && props.pulse) {
      console.warn(
        '[DssIcon] `spin` e `pulse` juntos: só `pulse` tem efeito.\n' +
        'As duas animações disputam a mesma propriedade `animation` e a última declarada vence.\n' +
        'Escolha uma das duas.',
      )
    }
  })
}

const a11yEfetiva = computed(() => {
  // Declarado decorativo: `ariaLabel` não tem para onde ir.
  if (props.decorative === true) {
    if (import.meta.env?.DEV && props.ariaLabel !== undefined) {
      console.warn(
        '[DssIcon] `ariaLabel` foi ignorado porque `decorative` está ativo.\n' +
        'Um ícone decorativo sai da árvore de acessibilidade (aria-hidden), então não pode ter nome.\n' +
        'Escolha um dos dois: remova `decorative` para o ícone ser informativo, ou remova `ariaLabel`.',
      )
    }
    return { oculto: true, papel: undefined, nome: undefined }
  }

  // Informativo sem nome: estado que o contrato proíbe.
  if (props.ariaLabel === undefined) {
    if (import.meta.env?.DEV) {
      console.warn(
        '[DssIcon] `ariaLabel` é obrigatório para ícones não-decorativos (WCAG 1.1.1 · CCI §2.1).\n' +
        'Sem nome, o `role="img"` é podado da árvore de acessibilidade e o ícone não existe para quem usa leitor de tela.\n' +
        'Use `decorative` se o ícone é apenas visual, ou dê um `aria-label` que diga o que ele significa.',
      )
    }
    return { oculto: true, papel: undefined, nome: undefined }
  }

  return { oculto: false, papel: 'img' as const, nome: props.ariaLabel }
})
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
