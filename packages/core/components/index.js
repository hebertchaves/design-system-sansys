/* ==========================================================================
   DSS COMPONENTS - Exportação Central
   Sistema de Componentes Vue.js com Acessibilidade WCAG 2.1 AA

   USO:

   // Importar componentes individualmente (tree-shaking)
   import { DssButton, DssCard, DssInput } from '@sansys/design-system'

   // Ou usar como plugin Vue (registra todos globalmente)
   import DesignSystemSansys from '@sansys/design-system'
   app.use(DesignSystemSansys)
   ========================================================================== */

// ============================================================================
// COMPONENTES BASE — CONTROLES INTERATIVOS
// ============================================================================

export { DssButton } from './base/DssButton'
export { DssCheckbox } from './base/DssCheckbox'
export { DssRadio } from './base/DssRadio'
export { DssToggle } from './base/DssToggle'
export { DssRange } from './base/DssRange'
export { DssSlider } from './base/DssSlider'
export { DssRating } from './base/DssRating'
export { DssKnob } from './base/DssKnob'
export { DssSelect } from './base/DssSelect'
export { DssOptionGroup } from './base/DssOptionGroup'
export { DssBtnGroup } from './base/DssBtnGroup'
export { DssBtnToggle } from './base/DssBtnToggle'
export { DssBtnDropdown } from './base/DssBtnDropdown'
export { DssFab } from './base/DssFab'
export { DssFabAction } from './base/DssFabAction'
export { DssPagination } from './base/DssPagination'

// ============================================================================
// COMPONENTES BASE — INPUTS E FORMULÁRIOS
// ============================================================================

export { DssInput } from './base/DssInput'
export { DssTextarea } from './base/DssTextarea'
export { DssField } from './base/DssField'
export { DssFile } from './base/DssFile'

// ============================================================================
// COMPONENTES BASE — EXIBIÇÃO DE DADOS
// ============================================================================

export { DssChip } from './base/DssChip'
export { DssBadge } from './base/DssBadge'
export { DssAvatar } from './base/DssAvatar'
export { DssIcon } from './base/DssIcon'
export { DssImg } from './base/DssImg'
export { DssCard, DssCardSection, DssCardActions } from './base/DssCard'
export { DssList } from './base/DssList'
export { DssItem } from './base/DssItem'
export { DssItemLabel } from './base/DssItemLabel'
export { DssItemSection } from './base/DssItemSection'
export { DssMarkupTable } from './base/DssMarkupTable'
export { DssTree } from './base/DssTree'

// ============================================================================
// COMPONENTES BASE — FEEDBACK E PROGRESSO
// ============================================================================

export { DssLinearProgress } from './base/DssLinearProgress'
export { DssCircularProgress } from './base/DssCircularProgress'
export { DssSpinner } from './base/DssSpinner'
export { DssSkeleton } from './base/DssSkeleton'
export { DssInnerLoading } from './base/DssInnerLoading'
export { DssAjaxBar } from './base/DssAjaxBar'
export { DssTooltip } from './base/DssTooltip'
export { DssMenu } from './base/DssMenu'
export { DssPopupProxy } from './base/DssPopupProxy'

// ============================================================================
// COMPONENTES BASE — LAYOUT E ESTRUTURA
// ============================================================================

export { DssLayout } from './base/DssLayout'
export { DssPage } from './base/DssPage'
export { DssPageContainer } from './base/DssPageContainer'
export { DssHeader } from './base/DssHeader'
export { DssFooter } from './base/DssFooter'
export { DssDrawer } from './base/DssDrawer'
export { DssToolbar } from './base/DssToolbar'
export { DssToolbarTitle } from './base/DssToolbarTitle'
export { DssSeparator } from './base/DssSeparator'
export { DssSpace } from './base/DssSpace'
export { DssScrollArea } from './base/DssScrollArea'
export { DssSplitter } from './base/DssSplitter'
export { DssResponsive } from './base/DssResponsive'
export { DssPageScroller } from './base/DssPageScroller'
export { DssPageSticky } from './base/DssPageSticky'

// ============================================================================
// COMPONENTES BASE — NAVEGAÇÃO
// ============================================================================

export { DssTabs } from './base/DssTabs'
export { DssTab } from './base/DssTab'
export { DssTabPanel } from './base/DssTabPanel'
export { DssTabPanels } from './base/DssTabPanels'
export { DssRouteTab } from './base/DssRouteTab'
export { DssBreadcrumbs } from './base/DssBreadcrumbs'
export { DssBreadcrumbsEl } from './base/DssBreadcrumbsEl'
export { DssBar } from './base/DssBar'
export { DssExpansionItem } from './base/DssExpansionItem'

// ============================================================================
// COMPONENTES BASE — STEPPER
// ============================================================================

export { DssStepper } from './base/DssStepper'
export { DssStep } from './base/DssStep'

// ============================================================================
// COMPONENTES BASE — TIMELINE
// ============================================================================

export { DssTimeline } from './base/DssTimeline'
export { DssTimelineEntry } from './base/DssTimelineEntry'

// ============================================================================
// COMPONENTES BASE — AVANÇADOS / UTILITÁRIOS
// ============================================================================

export { DssVirtualScroll } from './base/DssVirtualScroll'
export { DssInfiniteScroll } from './base/DssInfiniteScroll'
export { DssPullToRefresh } from './base/DssPullToRefresh'
export { DssSlideItem } from './base/DssSlideItem'
export { DssParallax } from './base/DssParallax'
export { DssVideo } from './base/DssVideo'
export { DssBanner } from './base/DssBanner'

// ============================================================================
// COMPONENTES COMPOSTOS
// ============================================================================

export { DssDialog } from './composed/DssDialog'
export { DssTable } from './composed/DssTable'
export { DssCarousel, DssCarouselSlide } from './composed/DssCarousel'
export { DssBottomSheet } from './composed/DssBottomSheet'
export { DssChatMessage } from './composed/DssChatMessage'
export { DssColorPicker } from './composed/DssColorPicker'
export { DssDatePicker } from './composed/DssDatePicker'
export { DssTimePicker } from './composed/DssTimePicker'
export { DssForm } from './composed/DssForm'
export { DssPopupEdit } from './composed/DssPopupEdit'
export { DssUploader } from './composed/DssUploader'

// ============================================================================
// IMPORTAÇÕES PARA PLUGIN VUE
// ============================================================================

import DssButton from './base/DssButton/DssButton.vue'
import DssCheckbox from './base/DssCheckbox/DssCheckbox.vue'
import DssRadio from './base/DssRadio/DssRadio.vue'
import DssToggle from './base/DssToggle/DssToggle.vue'
import DssRange from './base/DssRange/DssRange.vue'
import DssSlider from './base/DssSlider/DssSlider.vue'
import DssRating from './base/DssRating/DssRating.vue'
import DssKnob from './base/DssKnob/DssKnob.vue'
import DssSelect from './base/DssSelect/DssSelect.vue'
import DssOptionGroup from './base/DssOptionGroup/DssOptionGroup.vue'
import DssBtnGroup from './base/DssBtnGroup/DssBtnGroup.vue'
import DssBtnToggle from './base/DssBtnToggle/DssBtnToggle.vue'
import DssBtnDropdown from './base/DssBtnDropdown/DssBtnDropdown.vue'
import DssFab from './base/DssFab/DssFab.vue'
import DssFabAction from './base/DssFabAction/DssFabAction.vue'
import DssPagination from './base/DssPagination/DssPagination.vue'
import DssInput from './base/DssInput/DssInput.vue'
import DssTextarea from './base/DssTextarea/DssTextarea.vue'
import DssField from './base/DssField/DssField.vue'
import DssFile from './base/DssFile/DssFile.vue'
import DssChip from './base/DssChip/DssChip.vue'
import DssBadge from './base/DssBadge/DssBadge.vue'
import DssAvatar from './base/DssAvatar/DssAvatar.vue'
import DssIcon from './base/DssIcon/DssIcon.vue'
import DssImg from './base/DssImg/DssImg.vue'
import DssCard from './base/DssCard/DssCard.vue'
import DssCardSection from './base/DssCard/1-structure/DssCardSection.ts.vue'
import DssCardActions from './base/DssCard/1-structure/DssCardActions.ts.vue'
import DssList from './base/DssList/DssList.vue'
import DssItem from './base/DssItem/DssItem.vue'
import DssItemLabel from './base/DssItemLabel/DssItemLabel.vue'
import DssItemSection from './base/DssItemSection/DssItemSection.vue'
import DssMarkupTable from './base/DssMarkupTable/DssMarkupTable.vue'
import DssTree from './base/DssTree/DssTree.vue'
import DssLinearProgress from './base/DssLinearProgress/DssLinearProgress.vue'
import DssCircularProgress from './base/DssCircularProgress/DssCircularProgress.vue'
import DssSpinner from './base/DssSpinner/DssSpinner.vue'
import DssSkeleton from './base/DssSkeleton/DssSkeleton.vue'
import DssInnerLoading from './base/DssInnerLoading/DssInnerLoading.vue'
import DssAjaxBar from './base/DssAjaxBar/DssAjaxBar.vue'
import DssTooltip from './base/DssTooltip/DssTooltip.vue'
import DssMenu from './base/DssMenu/DssMenu.vue'
import DssPopupProxy from './base/DssPopupProxy/DssPopupProxy.vue'
import DssLayout from './base/DssLayout/DssLayout.vue'
import DssPage from './base/DssPage/DssPage.vue'
import DssPageContainer from './base/DssPageContainer/DssPageContainer.vue'
import DssHeader from './base/DssHeader/DssHeader.vue'
import DssFooter from './base/DssFooter/DssFooter.vue'
import DssDrawer from './base/DssDrawer/DssDrawer.vue'
import DssToolbar from './base/DssToolbar/DssToolbar.vue'
import DssToolbarTitle from './base/DssToolbarTitle/DssToolbarTitle.vue'
import DssSeparator from './base/DssSeparator/DssSeparator.vue'
import DssSpace from './base/DssSpace/DssSpace.vue'
import DssScrollArea from './base/DssScrollArea/DssScrollArea.vue'
import DssSplitter from './base/DssSplitter/DssSplitter.vue'
import DssResponsive from './base/DssResponsive/DssResponsive.vue'
import DssPageScroller from './base/DssPageScroller/DssPageScroller.vue'
import DssPageSticky from './base/DssPageSticky/DssPageSticky.vue'
import DssTabs from './base/DssTabs/DssTabs.vue'
import DssTab from './base/DssTab/DssTab.vue'
import DssTabPanel from './base/DssTabPanel/DssTabPanel.vue'
import DssTabPanels from './base/DssTabPanels/DssTabPanels.vue'
import DssRouteTab from './base/DssRouteTab/DssRouteTab.vue'
import DssBreadcrumbs from './base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from './base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssBar from './base/DssBar/DssBar.vue'
import DssExpansionItem from './base/DssExpansionItem/DssExpansionItem.vue'
import DssStepper from './base/DssStepper/DssStepper.vue'
import DssStep from './base/DssStep/DssStep.vue'
import DssTimeline from './base/DssTimeline/DssTimeline.vue'
import DssTimelineEntry from './base/DssTimelineEntry/DssTimelineEntry.vue'
import DssVirtualScroll from './base/DssVirtualScroll/DssVirtualScroll.vue'
import DssInfiniteScroll from './base/DssInfiniteScroll/DssInfiniteScroll.vue'
import DssPullToRefresh from './base/DssPullToRefresh/DssPullToRefresh.vue'
import DssSlideItem from './base/DssSlideItem/DssSlideItem.vue'
import DssParallax from './base/DssParallax/DssParallax.vue'
import DssVideo from './base/DssVideo/DssVideo.vue'
import DssBanner from './base/DssBanner/DssBanner.vue'
import DssDialog from './composed/DssDialog/DssDialog.vue'
import DssTable from './composed/DssTable/DssTable.vue'
import DssCarousel from './composed/DssCarousel/DssCarousel.vue'
import DssCarouselSlide from './composed/DssCarousel/DssCarouselSlide.vue'
import DssBottomSheet from './composed/DssBottomSheet/DssBottomSheet.vue'
import DssChatMessage from './composed/DssChatMessage/DssChatMessage.vue'
import DssColorPicker from './composed/DssColorPicker/DssColorPicker.vue'
import DssDatePicker from './composed/DssDatePicker/DssDatePicker.vue'
import DssTimePicker from './composed/DssTimePicker/DssTimePicker.vue'
import DssForm from './composed/DssForm/DssForm.vue'
import DssPopupEdit from './composed/DssPopupEdit/DssPopupEdit.vue'
import DssUploader from './composed/DssUploader/DssUploader.vue'

// ============================================================================
// PLUGIN VUE — INSTALAÇÃO GLOBAL
// ============================================================================

const allComponents = [
  // Controles interativos
  DssButton, DssCheckbox, DssRadio, DssToggle, DssRange, DssSlider,
  DssRating, DssKnob, DssSelect, DssOptionGroup, DssBtnGroup, DssBtnToggle,
  DssBtnDropdown, DssFab, DssFabAction, DssPagination,
  // Inputs e formulários
  DssInput, DssTextarea, DssField, DssFile,
  // Exibição de dados
  DssChip, DssBadge, DssAvatar, DssIcon, DssImg,
  DssCard, DssCardSection, DssCardActions,
  DssList, DssItem, DssItemLabel, DssItemSection,
  DssMarkupTable, DssTree,
  // Feedback e progresso
  DssLinearProgress, DssCircularProgress, DssSpinner, DssSkeleton,
  DssInnerLoading, DssAjaxBar, DssTooltip, DssMenu, DssPopupProxy,
  // Layout e estrutura
  DssLayout, DssPage, DssPageContainer, DssHeader, DssFooter, DssDrawer,
  DssToolbar, DssToolbarTitle, DssSeparator, DssSpace, DssScrollArea,
  DssSplitter, DssResponsive, DssPageScroller, DssPageSticky,
  // Navegação
  DssTabs, DssTab, DssTabPanel, DssTabPanels, DssRouteTab,
  DssBreadcrumbs, DssBreadcrumbsEl, DssBar, DssExpansionItem,
  // Stepper
  DssStepper, DssStep,
  // Timeline
  DssTimeline, DssTimelineEntry,
  // Avançados
  DssVirtualScroll, DssInfiniteScroll, DssPullToRefresh, DssSlideItem,
  DssParallax, DssVideo, DssBanner,
  // Compostos
  DssDialog, DssTable, DssCarousel, DssCarouselSlide,
  DssBottomSheet, DssChatMessage, DssColorPicker, DssDatePicker,
  DssTimePicker, DssForm, DssPopupEdit, DssUploader,
]

const DesignSystemSansys = {
  install(app, options = {}) {
    allComponents.forEach(comp => {
      if (comp && comp.name) {
        app.component(comp.name, comp)
      }
    })

    if (options.brand) {
      app.provide('dss-default-brand', options.brand)
    }

    if (options.theme) {
      app.provide('dss-default-theme', options.theme)
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`✅ Design System Sansys instalado (${allComponents.length} componentes)`)
    }
  }
}

// ============================================================================
// EXPORT DEFAULT (Plugin Vue)
// ============================================================================

export default DesignSystemSansys
