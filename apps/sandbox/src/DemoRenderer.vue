<script>
/**
 * DemoRenderer.vue
 *
 * Renderiza qualquer componente DSS dinamicamente a partir de um objeto `meta`
 * (conteúdo de um dss.meta.json).
 *
 * Usa Vue's h() (render function), sem <template>.
 * Todos os componentes DSS base são importados e registrados num registry interno.
 */
import { defineComponent, h } from 'vue'

// ── Registry de componentes ───────────────────────────────────────────────────
// Importa diretamente pelos wrappers .vue — padrão do projeto (TestCadrisCard.vue).
// DssCard expõe subcomponentes via named exports no index.js.
import {
  DssCard,
  DssCardSection,
  DssCardActions,
} from '@components/base/DssCard'

import DssButton        from '@components/base/DssButton/DssButton.vue'
import DssChip          from '@components/base/DssChip/DssChip.vue'
import DssBtnGroup      from '@components/base/DssBtnGroup/DssBtnGroup.vue'
import DssBtnDropdown   from '@components/base/DssBtnDropdown/DssBtnDropdown.vue'
import DssBtnToggle     from '@components/base/DssBtnToggle/DssBtnToggle.vue'
import DssFab           from '@components/base/DssFab/DssFab.vue'
import DssFabAction     from '@components/base/DssFabAction/DssFabAction.vue'

import DssBadge         from '@components/base/DssBadge/DssBadge.vue'
import DssAvatar        from '@components/base/DssAvatar/DssAvatar.vue'
import DssIcon          from '@components/base/DssIcon/DssIcon.vue'
import DssSpinner       from '@components/base/DssSpinner/DssSpinner.vue'
import DssRating        from '@components/base/DssRating/DssRating.vue'
import DssKnob          from '@components/base/DssKnob/DssKnob.vue'
import DssTooltip       from '@components/base/DssTooltip/DssTooltip.vue'

import DssInput         from '@components/base/DssInput/DssInput.vue'
import DssSelect        from '@components/base/DssSelect/DssSelect.vue'
import DssTextarea      from '@components/base/DssTextarea/DssTextarea.vue'
import DssFile          from '@components/base/DssFile/DssFile.vue'

import DssCheckbox      from '@components/base/DssCheckbox/DssCheckbox.vue'
import DssRadio         from '@components/base/DssRadio/DssRadio.vue'
import DssToggle        from '@components/base/DssToggle/DssToggle.vue'
import DssOptionGroup   from '@components/base/DssOptionGroup/DssOptionGroup.vue'
import DssSlider        from '@components/base/DssSlider/DssSlider.vue'
import DssRange         from '@components/base/DssRange/DssRange.vue'

import DssLinearProgress   from '@components/base/DssLinearProgress/DssLinearProgress.vue'
import DssCircularProgress from '@components/base/DssCircularProgress/DssCircularProgress.vue'
import DssSkeleton         from '@components/base/DssSkeleton/DssSkeleton.vue'
import DssInnerLoading     from '@components/base/DssInnerLoading/DssInnerLoading.vue'
import DssAjaxBar          from '@components/base/DssAjaxBar/DssAjaxBar.vue'

import DssBanner        from '@components/base/DssBanner/DssBanner.vue'
import DssBar           from '@components/base/DssBar/DssBar.vue'

import DssTabs          from '@components/base/DssTabs/DssTabs.vue'
import DssTab           from '@components/base/DssTab/DssTab.vue'
import DssTabPanels     from '@components/base/DssTabPanels/DssTabPanels.vue'
import DssTabPanel      from '@components/base/DssTabPanel/DssTabPanel.vue'
import DssBreadcrumbs   from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssPagination    from '@components/base/DssPagination/DssPagination.vue'
import DssExpansionItem from '@components/base/DssExpansionItem/DssExpansionItem.vue'
import DssMenu          from '@components/base/DssMenu/DssMenu.vue'
import DssRouteTab      from '@components/base/DssRouteTab/DssRouteTab.vue'

import DssStepper       from '@components/base/DssStepper/DssStepper.vue'
import DssStep          from '@components/base/DssStep/DssStep.vue'

import DssList          from '@components/base/DssList/DssList.vue'
import DssItem          from '@components/base/DssItem/DssItem.vue'
import DssItemSection   from '@components/base/DssItemSection/DssItemSection.vue'
import DssItemLabel     from '@components/base/DssItemLabel/DssItemLabel.vue'
import DssSlideItem     from '@components/base/DssSlideItem/DssSlideItem.vue'
import DssSeparator     from '@components/base/DssSeparator/DssSeparator.vue'
import DssSpace         from '@components/base/DssSpace/DssSpace.vue'

import DssToolbar       from '@components/base/DssToolbar/DssToolbar.vue'
import DssToolbarTitle  from '@components/base/DssToolbarTitle/DssToolbarTitle.vue'
import DssMarkupTable   from '@components/base/DssMarkupTable/DssMarkupTable.vue'

import DssTimeline      from '@components/base/DssTimeline/DssTimeline.vue'
import DssTimelineEntry from '@components/base/DssTimelineEntry/DssTimelineEntry.vue'

import DssTree          from '@components/base/DssTree/DssTree.vue'

import DssImg           from '@components/base/DssImg/DssImg.vue'
import DssScrollArea    from '@components/base/DssScrollArea/DssScrollArea.vue'
import DssSplitter      from '@components/base/DssSplitter/DssSplitter.vue'

import DssLayout        from '@components/base/DssLayout/DssLayout.vue'
import DssHeader        from '@components/base/DssHeader/DssHeader.vue'
import DssFooter        from '@components/base/DssFooter/DssFooter.vue'
import DssDrawer        from '@components/base/DssDrawer/DssDrawer.vue'
import DssPage          from '@components/base/DssPage/DssPage.vue'
import DssPageContainer from '@components/base/DssPageContainer/DssPageContainer.vue'
import DssPageSticky    from '@components/base/DssPageSticky/DssPageSticky.vue'
import DssPageScroller  from '@components/base/DssPageScroller/DssPageScroller.vue'

import DssVirtualScroll  from '@components/base/DssVirtualScroll/DssVirtualScroll.vue'
import DssInfiniteScroll from '@components/base/DssInfiniteScroll/DssInfiniteScroll.vue'
import DssParallax       from '@components/base/DssParallax/DssParallax.vue'
import DssVideo          from '@components/base/DssVideo/DssVideo.vue'
import DssPullToRefresh  from '@components/base/DssPullToRefresh/DssPullToRefresh.vue'
import DssPopupProxy     from '@components/base/DssPopupProxy/DssPopupProxy.vue'
import DssField          from '@components/base/DssField/DssField.vue'
import DssResponsive     from '@components/base/DssResponsive/DssResponsive.vue'

/** Registry: nome do componente (string) → definição Vue */
const REGISTRY = {
  DssCard,
  DssCardSection,
  DssCardActions,
  DssButton,
  DssChip,
  DssBtnGroup,
  DssBtnDropdown,
  DssBtnToggle,
  DssFab,
  DssFabAction,
  DssBadge,
  DssAvatar,
  DssIcon,
  DssSpinner,
  DssRating,
  DssKnob,
  DssTooltip,
  DssInput,
  DssSelect,
  DssTextarea,
  DssFile,
  DssCheckbox,
  DssRadio,
  DssToggle,
  DssOptionGroup,
  DssSlider,
  DssRange,
  DssLinearProgress,
  DssCircularProgress,
  DssSkeleton,
  DssInnerLoading,
  DssAjaxBar,
  DssBanner,
  DssBar,
  DssTabs,
  DssTab,
  DssTabPanels,
  DssTabPanel,
  DssBreadcrumbs,
  DssBreadcrumbsEl,
  DssPagination,
  DssExpansionItem,
  DssMenu,
  DssRouteTab,
  DssStepper,
  DssStep,
  DssList,
  DssItem,
  DssItemSection,
  DssItemLabel,
  DssSlideItem,
  DssSeparator,
  DssSpace,
  DssToolbar,
  DssToolbarTitle,
  DssMarkupTable,
  DssTimeline,
  DssTimelineEntry,
  DssTree,
  DssImg,
  DssScrollArea,
  DssSplitter,
  DssLayout,
  DssHeader,
  DssFooter,
  DssDrawer,
  DssPage,
  DssPageContainer,
  DssPageSticky,
  DssPageScroller,
  DssVirtualScroll,
  DssInfiniteScroll,
  DssParallax,
  DssVideo,
  DssPullToRefresh,
  DssPopupProxy,
  DssField,
  DssResponsive,
}

// ── Helpers de renderização ───────────────────────────────────────────────────

/**
 * Converte um SlotNode (ou string, ou array) em VNode(s).
 *
 * @param {string | object | Array} node
 * @returns {import('vue').VNode | import('vue').VNode[] | string}
 */
function renderNode(node) {
  // Texto puro
  if (typeof node === 'string') {
    return node
  }

  // Array: mapeia recursivamente
  if (Array.isArray(node)) {
    return node.map(renderNode)
  }

  // Objeto com html: injeta como innerHTML
  if (node && typeof node === 'object' && node.html != null) {
    return h('div', { innerHTML: node.html })
  }

  // Objeto com component
  if (node && typeof node === 'object' && node.component) {
    const comp = REGISTRY[node.component]
    const props = node.props || {}

    if (!comp) {
      // Componente não encontrado no registry — alerta visual
      return h(
        'span',
        { style: 'color:orange;font-size:11px;font-family:monospace' },
        `⚠ ${node.component}`
      )
    }

    // Construir slots a partir de children
    if (node.children != null) {
      const childrenRendered = renderChildren(node.children)
      return h(comp, props, { default: () => childrenRendered })
    }

    return h(comp, props)
  }

  // Fallback: null/undefined
  return null
}

/**
 * Converte `children` (string | SlotNode | Array) num array de VNodes/strings
 * adequado para ser usado como conteúdo de slot.
 */
function renderChildren(children) {
  if (typeof children === 'string') {
    return [children]
  }
  if (Array.isArray(children)) {
    return children.map(renderNode).flat().filter(Boolean)
  }
  // objeto único
  return [renderNode(children)].filter(Boolean)
}

/**
 * Converte um objeto demoSlots em um objeto de slots Vue.
 * { default: ..., before: ..., after: ... }  →  { default: () => ..., ... }
 */
function buildSlots(demoSlots) {
  if (!demoSlots || typeof demoSlots !== 'object') return undefined

  const slots = {}
  for (const [slotName, content] of Object.entries(demoSlots)) {
    slots[slotName] = () => renderChildren(content)
  }
  return slots
}

// ── Componente ────────────────────────────────────────────────────────────────
export default defineComponent({
  name: 'DemoRenderer',

  props: {
    meta: {
      type: Object,
      required: true,
    },
  },

  render() {
    const { meta } = this
    const componentName = meta.component

    if (!componentName) {
      return h(
        'div',
        { style: 'color:orange;font-size:11px;font-family:monospace' },
        '⚠ meta.component ausente'
      )
    }

    const comp = REGISTRY[componentName]

    if (!comp) {
      return h(
        'div',
        { style: 'color:orange;font-size:11px;font-family:monospace' },
        `⚠ ${componentName}`
      )
    }

    const props = (meta.defaultPreview && meta.defaultPreview.props) || {}
    const demoSlots = meta.defaultPreview && meta.defaultPreview.demoSlots

    const slots = buildSlots(demoSlots)

    if (slots) {
      return h(comp, props, slots)
    }

    return h(comp, props)
  },
})
</script>
