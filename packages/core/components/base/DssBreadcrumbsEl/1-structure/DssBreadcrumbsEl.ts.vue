<script setup lang="ts">
/**
 * DssBreadcrumbsEl — Layer 1: Implementação Canônica
 *
 * Wrapper DSS governado sobre o QBreadcrumbsEl do Quasar.
 * Gerencia a dualidade clicável/estático via modifier classes BEM.
 *
 * Gate de Composição v2.4 — Exceção Formal:
 *   O uso de <q-breadcrumbs-el> no template é uma exceção registrada em
 *   dss.meta.json → gateExceptions.compositionGateV24.templateStructure.
 *   O QBreadcrumbsEl gerencia o roteamento Vue Router (prop `to`) e a
 *   dualidade de renderização (<a>/<div>) — funcionalidade que não pode
 *   ser reimplementada sem o componente Quasar.
 *
 * inheritAttrs: false — $attrs é forwarded explicitamente para <q-breadcrumbs-el>,
 * garantindo propagação de aria-current="page" injetado pelo DssBreadcrumbs pai.
 */
import type {
  BreadcrumbsElProps,
  BreadcrumbsElEmits,
  BreadcrumbsElSlots,
} from '../types/breadcrumbs-el.types'
// Import local com identificador distinto: com name:'QBreadcrumbsEl' neste
// componente, a tag <q-breadcrumbs-el> resolveria por AUTO-REFERÊNCIA
// (recursão infinita). QBreadcrumbsElBase aponta para o motor Quasar real.
import { QBreadcrumbsEl as QBreadcrumbsElBase } from 'quasar'
import { useBreadcrumbsElClasses } from '../composables'
import DssIcon from '../../DssIcon/DssIcon.vue'

/**
 * ⚠️ name: 'QBreadcrumbsEl' É INTENCIONAL (NC corrigida na Onda P2/G3.2).
 *
 * O QBreadcrumbs identifica os itens por `vnode.type.name === 'QBreadcrumbsEl'`
 * (quasar.client.js, render do QBreadcrumbs) para contar os filhos e injetar
 * os SEPARADORES entre eles. Com o nome 'DssBreadcrumbsEl', nenhum separador
 * era renderizado — em produção inclusive (bug real descoberto quando a suíte
 * de testes rodou pela primeira vez).
 *
 * O componente continua exportado como DssBreadcrumbsEl (barrel/registro);
 * apenas o `name` interno espelha o contrato do motor Quasar.
 */
defineOptions({ name: 'QBreadcrumbsEl', inheritAttrs: false })

const props = withDefaults(defineProps<BreadcrumbsElProps>(), {
  disable: false,
})

defineEmits<BreadcrumbsElEmits>()
defineSlots<BreadcrumbsElSlots>()

const { breadcrumbsElClasses } = useBreadcrumbsElClasses(props)
</script>

<template>
  <!--
    Level 1 DOM pattern: <q-breadcrumbs-el> é o elemento raiz.
    As classes dss-breadcrumbs-el + modifier são aplicadas ao elemento
    raiz do QBreadcrumbsEl (renderizado como <a> ou <div>) via class binding.
    EXC-01: Seletor composto .dss-breadcrumbs-el.q-breadcrumbs__el no SCSS.
  -->
  <QBreadcrumbsElBase
    class="dss-breadcrumbs-el"
    :class="breadcrumbsElClasses"
    :to="to"
    :href="href"
    :disable="disable"
    :tag="tag"
    v-bind="$attrs"
  >
    <!--
      DssIcon: elemento decorativo quando usado junto ao label.
      aria-hidden="true" — o label (slot/prop) fornece a alternativa textual.
      Nota: Se o consumidor usar APENAS o ícone (sem label e sem slot com texto),
      deve fornecer aria-label no DssBreadcrumbsEl via $attrs.
      Ver RES-02 em dss.meta.json.
    -->
    <DssIcon
      v-if="icon"
      :name="icon"
      size="sm"
      aria-hidden="true"
    />
    <!--
      Slot com fallback para prop `label`.
      O slot sobrepõe o `label` quando conteúdo personalizado é fornecido.
    -->
    <slot>{{ label }}</slot>
  </QBreadcrumbsElBase>
</template>
