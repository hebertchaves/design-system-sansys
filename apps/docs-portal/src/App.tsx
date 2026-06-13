import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DSSLayout } from "./layouts/DSSLayout";
import HomePage from "./pages/HomePage";
import GettingStartedPage from "./pages/GettingStartedPage";
import ColorsPage from "./pages/tokens/ColorsPage";
import TypographyPage from "./pages/tokens/TypographyPage";
import SpacingPage from "./pages/tokens/SpacingPage";
import ShadowsPage from "./pages/tokens/ShadowsPage";
import BordersPage from "./pages/tokens/BordersPage";
import DssButtonPage from "./pages/components/DssButtonPage";
import DssBadgePage from "./pages/components/DssBadgePage";
import DssCardPage from "./pages/components/DssCardPage";
import DssInputPage from "./pages/components/DssInputPage";
import DssAvatarPage from "./pages/components/DssAvatarPage";
import DssChipPage from "./pages/components/DssChipPage";
import DssCheckboxPage from "./pages/components/DssCheckboxPage";
import DssTogglePage from "./pages/components/DssTogglePage";
import DssTooltipPage from "./pages/components/DssTooltipPage";
import DssRangePage from "./pages/components/DssRangePage";
import DssBtnGroupPage from "./pages/components/DssBtnGroupPage";
import DssBtnDropdownPage from "./pages/components/DssBtnDropdownPage";
import DssTabsPage from "./pages/components/DssTabsPage";
import DssBreadcrumbsElPage from "./pages/components/DssBreadcrumbsElPage";
import DssHeaderPage from "./pages/components/DssHeaderPage";
import DssToolbarPage from "./pages/components/DssToolbarPage";
import DssDrawerPage from "./pages/components/DssDrawerPage";
import DssFabPage from "./pages/components/DssFabPage";
import DssPagePage from "./pages/components/DssPagePage";
import DssFilePage from "./pages/components/DssFilePage";
import DssPaginationPage from "./pages/components/DssPaginationPage";
import DssDialogPage from "./pages/components/DssDialogPage";
import DssImgPage from "./pages/components/DssImgPage";
import DssVideoPage from "./pages/components/DssVideoPage";
import DssInfiniteScrollPage from "./pages/components/DssInfiniteScrollPage";
import DssKnobPage from "./pages/components/DssKnobPage";
import DssMenuPage from "./pages/components/DssMenuPage";
import DssCarrosselPage from "./pages/components/DssCarrosselPage";
import DssFormPage from "./pages/components/DssFormPage";
import DssTestCadrisPage from "./pages/components/DssTestCadrisPage";
import DssAjaxBarPage from "./pages/components/DssAjaxBarPage";
import DssBannerPage from "./pages/components/DssBannerPage";
import DssBarPage from "./pages/components/DssBarPage";
import DssBottomSheetPage from "./pages/components/DssBottomSheetPage";
import DssBreadcrumbsPage from "./pages/components/DssBreadcrumbsPage";
import DssBtnTogglePage from "./pages/components/DssBtnTogglePage";
import DssCarouselPage from "./pages/components/DssCarouselPage";
import DssChatMessagePage from "./pages/components/DssChatMessagePage";
import DssCircularProgressPage from "./pages/components/DssCircularProgressPage";
import DssColorPickerPage from "./pages/components/DssColorPickerPage";
import DssDataCardPage from "./pages/components/DssDataCardPage";
import DssDatePickerPage from "./pages/components/DssDatePickerPage";
import DssExpansionItemPage from "./pages/components/DssExpansionItemPage";
import DssFabActionPage from "./pages/components/DssFabActionPage";
import DssFieldPage from "./pages/components/DssFieldPage";
import DssFooterPage from "./pages/components/DssFooterPage";
import DssIconPage from "./pages/components/DssIconPage";
import DssInnerLoadingPage from "./pages/components/DssInnerLoadingPage";
import DssItemPage from "./pages/components/DssItemPage";
import DssItemLabelPage from "./pages/components/DssItemLabelPage";
import DssItemSectionPage from "./pages/components/DssItemSectionPage";
import DssLayoutPage from "./pages/components/DssLayoutPage";
import DssLinearProgressPage from "./pages/components/DssLinearProgressPage";
import DssListPage from "./pages/components/DssListPage";
import DssMarkupTablePage from "./pages/components/DssMarkupTablePage";
import DssOptionGroupPage from "./pages/components/DssOptionGroupPage";
import DssPageContainerPage from "./pages/components/DssPageContainerPage";
import DssPageScrollerPage from "./pages/components/DssPageScrollerPage";
import DssPageStickyPage from "./pages/components/DssPageStickyPage";
import DssParallaxPage from "./pages/components/DssParallaxPage";
import DssPopupEditPage from "./pages/components/DssPopupEditPage";
import DssPopupProxyPage from "./pages/components/DssPopupProxyPage";
import DssPullToRefreshPage from "./pages/components/DssPullToRefreshPage";
import DssRadioPage from "./pages/components/DssRadioPage";
import DssRatingPage from "./pages/components/DssRatingPage";
import DssResponsivePage from "./pages/components/DssResponsivePage";
import DssRouteTabPage from "./pages/components/DssRouteTabPage";
import DssScrollAreaPage from "./pages/components/DssScrollAreaPage";
import DssSelectPage from "./pages/components/DssSelectPage";
import DssSeparatorPage from "./pages/components/DssSeparatorPage";
import DssSkeletonPage from "./pages/components/DssSkeletonPage";
import DssSlideItemPage from "./pages/components/DssSlideItemPage";
import DssSliderPage from "./pages/components/DssSliderPage";
import DssSpacePage from "./pages/components/DssSpacePage";
import DssSpinnerPage from "./pages/components/DssSpinnerPage";
import DssSplitterPage from "./pages/components/DssSplitterPage";
import DssStepPage from "./pages/components/DssStepPage";
import DssStepperPage from "./pages/components/DssStepperPage";
import DssTabPage from "./pages/components/DssTabPage";
import DssTabPanelPage from "./pages/components/DssTabPanelPage";
import DssTabPanelsPage from "./pages/components/DssTabPanelsPage";
import DssTablePage from "./pages/components/DssTablePage";
import DssTextareaPage from "./pages/components/DssTextareaPage";
import DssTimePickerPage from "./pages/components/DssTimePickerPage";
import DssTimelinePage from "./pages/components/DssTimelinePage";
import DssTimelineEntryPage from "./pages/components/DssTimelineEntryPage";
import DssToolbarTitlePage from "./pages/components/DssToolbarTitlePage";
import DssTreePage from "./pages/components/DssTreePage";
import DssUploaderPage from "./pages/components/DssUploaderPage";
import DssVirtualScrollPage from "./pages/components/DssVirtualScrollPage";
import ComponentPlaceholder from "./pages/components/ComponentPlaceholder";
import ArchitecturePage from "./pages/governance/ArchitecturePage";
import ClassificationPage from "./pages/governance/ClassificationPage";
import ChecklistPage from "./pages/governance/ChecklistPage";
import ContributingPage from "./pages/governance/ContributingPage";
import BrandabilityPage from "./pages/patterns/BrandabilityPage";
import DarkModePage from "./pages/patterns/DarkModePage";
import AccessibilityPage from "./pages/patterns/AccessibilityPage";
import FigmaPage from "./pages/resources/FigmaPage";
import InstallationPage from "./pages/resources/InstallationPage";
import FAQPage from "./pages/resources/FAQPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DSSLayout />}>
            {/* Início */}
            <Route path="/" element={<HomePage />} />
            <Route path="/primeiros-passos" element={<GettingStartedPage />} />
            
            {/* Tokens */}
            <Route path="/tokens/cores" element={<ColorsPage />} />
            <Route path="/tokens/tipografia" element={<TypographyPage />} />
            <Route path="/tokens/espacamento" element={<SpacingPage />} />
            <Route path="/tokens/sombras" element={<ShadowsPage />} />
            <Route path="/tokens/bordas" element={<BordersPage />} />
            
            {/* Componentes */}
            <Route path="/componentes/dss-avatar" element={<DssAvatarPage />} />
            <Route path="/componentes/dss-badge" element={<DssBadgePage />} />
            <Route path="/componentes/dss-button" element={<DssButtonPage />} />
            <Route path="/componentes/dss-card" element={<DssCardPage />} />
             <Route path="/componentes/dss-chip" element={<DssChipPage />} />
            <Route path="/componentes/dss-checkbox" element={<DssCheckboxPage />} />
            <Route path="/componentes/dss-toggle" element={<DssTogglePage />} />
            <Route path="/componentes/dss-input" element={<DssInputPage />} />
            <Route path="/componentes/dss-tooltip" element={<DssTooltipPage />} />
            <Route path="/componentes/dss-range" element={<DssRangePage />} />
            <Route path="/componentes/dss-btn-group" element={<DssBtnGroupPage />} />
            <Route path="/componentes/dss-btn-dropdown" element={<DssBtnDropdownPage />} />
            <Route path="/componentes/dss-tabs" element={<DssTabsPage />} />
            <Route path="/componentes/dss-breadcrumbs-el" element={<DssBreadcrumbsElPage />} />
            <Route path="/componentes/dss-header" element={<DssHeaderPage />} />
            <Route path="/componentes/dss-toolbar" element={<DssToolbarPage />} />
            <Route path="/componentes/dss-drawer" element={<DssDrawerPage />} />
            <Route path="/componentes/dss-fab" element={<DssFabPage />} />
            <Route path="/componentes/dss-page" element={<DssPagePage />} />
            <Route path="/componentes/dss-file" element={<DssFilePage />} />
            <Route path="/componentes/dss-pagination" element={<DssPaginationPage />} />
            <Route path="/componentes/dss-dialog" element={<DssDialogPage />} />
            <Route path="/componentes/dss-img" element={<DssImgPage />} />
            <Route path="/componentes/dss-video" element={<DssVideoPage />} />
            <Route path="/componentes/dss-infinite-scroll" element={<DssInfiniteScrollPage />} />
            <Route path="/componentes/dss-knob" element={<DssKnobPage />} />
            <Route path="/componentes/dss-menu" element={<DssMenuPage />} />
            <Route path="/componentes/dss-carrossel" element={<DssCarrosselPage />} />
            <Route path="/componentes/dss-form" element={<DssFormPage />} />
            <Route path="/componentes/teste-cadris" element={<DssTestCadrisPage />} />
                        <Route path="/componentes/dss-ajax-bar" element={<DssAjaxBarPage />} />
            <Route path="/componentes/dss-banner" element={<DssBannerPage />} />
            <Route path="/componentes/dss-bar" element={<DssBarPage />} />
            <Route path="/componentes/dss-bottom-sheet" element={<DssBottomSheetPage />} />
            <Route path="/componentes/dss-breadcrumbs" element={<DssBreadcrumbsPage />} />
            <Route path="/componentes/dss-btn-toggle" element={<DssBtnTogglePage />} />
            <Route path="/componentes/dss-carousel" element={<DssCarouselPage />} />
            <Route path="/componentes/dss-chat-message" element={<DssChatMessagePage />} />
            <Route path="/componentes/dss-circular-progress" element={<DssCircularProgressPage />} />
            <Route path="/componentes/dss-color-picker" element={<DssColorPickerPage />} />
            <Route path="/componentes/dss-data-card" element={<DssDataCardPage />} />
            <Route path="/componentes/dss-date-picker" element={<DssDatePickerPage />} />
            <Route path="/componentes/dss-expansion-item" element={<DssExpansionItemPage />} />
            <Route path="/componentes/dss-fab-action" element={<DssFabActionPage />} />
            <Route path="/componentes/dss-field" element={<DssFieldPage />} />
            <Route path="/componentes/dss-footer" element={<DssFooterPage />} />
            <Route path="/componentes/dss-icon" element={<DssIconPage />} />
            <Route path="/componentes/dss-inner-loading" element={<DssInnerLoadingPage />} />
            <Route path="/componentes/dss-item" element={<DssItemPage />} />
            <Route path="/componentes/dss-item-label" element={<DssItemLabelPage />} />
            <Route path="/componentes/dss-item-section" element={<DssItemSectionPage />} />
            <Route path="/componentes/dss-layout" element={<DssLayoutPage />} />
            <Route path="/componentes/dss-linear-progress" element={<DssLinearProgressPage />} />
            <Route path="/componentes/dss-list" element={<DssListPage />} />
            <Route path="/componentes/dss-markup-table" element={<DssMarkupTablePage />} />
            <Route path="/componentes/dss-option-group" element={<DssOptionGroupPage />} />
            <Route path="/componentes/dss-page-container" element={<DssPageContainerPage />} />
            <Route path="/componentes/dss-page-scroller" element={<DssPageScrollerPage />} />
            <Route path="/componentes/dss-page-sticky" element={<DssPageStickyPage />} />
            <Route path="/componentes/dss-parallax" element={<DssParallaxPage />} />
            <Route path="/componentes/dss-popup-edit" element={<DssPopupEditPage />} />
            <Route path="/componentes/dss-popup-proxy" element={<DssPopupProxyPage />} />
            <Route path="/componentes/dss-pull-to-refresh" element={<DssPullToRefreshPage />} />
            <Route path="/componentes/dss-radio" element={<DssRadioPage />} />
            <Route path="/componentes/dss-rating" element={<DssRatingPage />} />
            <Route path="/componentes/dss-responsive" element={<DssResponsivePage />} />
            <Route path="/componentes/dss-route-tab" element={<DssRouteTabPage />} />
            <Route path="/componentes/dss-scroll-area" element={<DssScrollAreaPage />} />
            <Route path="/componentes/dss-select" element={<DssSelectPage />} />
            <Route path="/componentes/dss-separator" element={<DssSeparatorPage />} />
            <Route path="/componentes/dss-skeleton" element={<DssSkeletonPage />} />
            <Route path="/componentes/dss-slide-item" element={<DssSlideItemPage />} />
            <Route path="/componentes/dss-slider" element={<DssSliderPage />} />
            <Route path="/componentes/dss-space" element={<DssSpacePage />} />
            <Route path="/componentes/dss-spinner" element={<DssSpinnerPage />} />
            <Route path="/componentes/dss-splitter" element={<DssSplitterPage />} />
            <Route path="/componentes/dss-step" element={<DssStepPage />} />
            <Route path="/componentes/dss-stepper" element={<DssStepperPage />} />
            <Route path="/componentes/dss-tab" element={<DssTabPage />} />
            <Route path="/componentes/dss-tab-panel" element={<DssTabPanelPage />} />
            <Route path="/componentes/dss-tab-panels" element={<DssTabPanelsPage />} />
            <Route path="/componentes/dss-table" element={<DssTablePage />} />
            <Route path="/componentes/dss-textarea" element={<DssTextareaPage />} />
            <Route path="/componentes/dss-time-picker" element={<DssTimePickerPage />} />
            <Route path="/componentes/dss-timeline" element={<DssTimelinePage />} />
            <Route path="/componentes/dss-timeline-entry" element={<DssTimelineEntryPage />} />
            <Route path="/componentes/dss-toolbar-title" element={<DssToolbarTitlePage />} />
            <Route path="/componentes/dss-tree" element={<DssTreePage />} />
            <Route path="/componentes/dss-uploader" element={<DssUploaderPage />} />
            <Route path="/componentes/dss-virtual-scroll" element={<DssVirtualScrollPage />} />
            <Route path="/componentes/:componentId" element={<ComponentPlaceholder />} />
            
            {/* Governança */}
            <Route path="/governanca/arquitetura" element={<ArchitecturePage />} />
            <Route path="/governanca/classificacao" element={<ClassificationPage />} />
            <Route path="/governanca/checklist-pr" element={<ChecklistPage />} />
            <Route path="/governanca/contribuir" element={<ContributingPage />} />
            
            {/* Padrões */}
            <Route path="/padroes/brandabilidade" element={<BrandabilityPage />} />
            <Route path="/padroes/dark-mode" element={<DarkModePage />} />
            <Route path="/padroes/acessibilidade" element={<AccessibilityPage />} />
            
            {/* Recursos */}
            <Route path="/recursos/figma" element={<FigmaPage />} />
            <Route path="/recursos/instalacao" element={<InstallationPage />} />
            <Route path="/recursos/faq" element={<FAQPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
