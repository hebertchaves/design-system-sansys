<template>
  <DssHeader :elevated="elevated" :class="appBarClasses" v-bind="$attrs">
    <DssToolbar :brand="brand" class="dss-app-bar__bar">
      <!-- ESQUERDA: menu → logo → divisor → título -->
      <div class="dss-app-bar__start">
        <!-- `md` nas DUAS densidades, e o degrau é o alvo de toque, não gosto:
             44×44 é o mínimo da WCAG 2.5.5, e o DssButton NÃO estende o alvo
             por pseudo-elemento — o tamanho visual É a área de clique. O `sm`
             de antes entregava 36px e reprovava.

             Foi o que puxou a barra compacta de 40px para 48px (decisão de
             produto, set/2026): a altura medida no Figma cedeu à norma.

             O tamanho do ÍCONE vem de graça junto — `md` consome
             `--dss-icon-size-sm`, que dentro da barra vale 24px pela escala do
             DssToolbar. Aqui se escolhe o degrau; quem dimensiona é a escala. -->
        <DssButton
          v-if="menu"
          variant="flat"
          round
          size="md"
          icon="menu"
          :aria-label="menuAriaLabel"
          class="dss-app-bar__menu"
          @click="emit('menu')"
        />

        <span class="dss-app-bar__brand">
          <slot name="brand">
            <!-- Sem `brand` na prop: o logo resolve pelo [data-brand] que o
                 DssToolbar propaga. Sem marca nenhuma, ele não desenha — e é
                 melhor assim que desenhar a marca errada. -->
            <DssBrandLogo size="lg" decorative />
          </slot>
        </span>

        <!-- O divisor só existe quando há os dois lados para separar. -->
        <span v-if="temTitulo" class="dss-app-bar__divider" aria-hidden="true" />

        <h1 v-if="temTitulo" class="dss-app-bar__title">
          <slot name="title">{{ title }}</slot>
        </h1>
      </div>

      <!-- DIREITA: as ações são do consumidor. Na prática, 4 botões de ícone. -->
      <div v-if="$slots.actions" class="dss-app-bar__end">
        <slot name="actions" />
      </div>
    </DssToolbar>
  </DssHeader>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 * DssAppBar — Layer 1: Structure
 * ==========================================================================
 *
 * A barra de aplicação do Sansys. Fixa a ESTRUTURA que não muda entre Water,
 * Hub e Waste:
 *
 *     menu → logo → divisor → título do módulo → espaço → ações
 *
 * POR QUE UM COMPOSTO, E NÃO PROPS NO DssHeader (§1.6 do guia de Fase 3):
 *
 * O eixo de variação decide. Entre os três produtos:
 *   · a PELE muda (cor) → token, via `brand`
 *   · o CONTEÚDO muda (qual logo, quais ícones) → slot e dados
 *   · a ESTRUTURA não muda → e estrutura invariante é exatamente o que
 *     `components/composed/` existe para ser
 *
 * Expressar a estrutura como props do `DssHeader` (`burgerIcon`, `logoSrc`,
 * `actions[]`) seria reimplementar slots, mal. O `DssHeader` continua o
 * primitivo: ele não ganhou prop de conteúdo nenhuma.
 *
 * UMA PROP, DOIS EFEITOS:
 *
 * `brand` vai ao `DssToolbar`, que (a) pinta o fundo e remapeia
 * `--dss-action-primary` para os filhos, e (b) propaga `[data-brand]` no
 * próprio root. O `DssBrandLogo` lá dentro resolve a marca pelo ancestral mais
 * próximo — então o logo certo aparece sem ninguém repassar nada.
 *
 * É o padrão §1.3 do guia: contexto visual por `data-*` e cascata de CSS var,
 * não por `provide/inject`.
 *
 * O LOGO É `decorative` POR PADRÃO, e isso é decisão de acessibilidade:
 *
 * Nesta barra o nome do produto já é anunciado — pelo título do módulo ao lado
 * e pelo próprio `<title>` da página. Um logo informativo aqui faria o leitor
 * de tela ler a marca duas vezes. Quem precisar do logo nomeado (ele é link
 * para a home, por exemplo) usa o slot `brand` e decide por conta própria.
 *
 * @see DssBrandLogo — o desenho da marca
 * @see DssToolbar — a pele e a propagação de [data-brand]
 */

import { computed, useSlots } from 'vue'
import DssHeader from '../../../base/DssHeader/DssHeader.vue'
import DssToolbar from '../../../base/DssToolbar/DssToolbar.vue'
import DssButton from '../../../base/DssButton/DssButton.vue'
import DssBrandLogo from '../../../base/DssBrandLogo/DssBrandLogo.vue'
import type { AppBarProps, AppBarEmits, AppBarSlots } from '../types/app-bar.types'
import { useAppBarClasses } from '../composables'

defineOptions({
  name: 'DssAppBar',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AppBarProps>(), {
  brand: undefined,
  title: undefined,
  density: 'compact',
  menu: true,
  menuAriaLabel: 'Abrir menu principal',
  elevated: true,
})

const emit = defineEmits<AppBarEmits>()
const slots = useSlots()
defineSlots<AppBarSlots>()

const { appBarClasses } = useAppBarClasses(props)

/**
 * O título — e com ele o divisor — só existe quando há o que mostrar.
 *
 * Lido de `slots` e de `props` a cada renderização: um divisor sozinho na
 * barra, sem nada à direita, é lixo visual que ninguém pediu.
 */
const temTitulo = computed(() => Boolean(props.title) || Boolean(slots.title))
</script>

<!-- Estilos carregados globalmente via dist/style.css -->
