import { createApp } from 'vue'
import App from './App.vue'
import {
  Quasar,
  // Directives
  ClosePopup,
  Ripple,
  // Components needed by DSS wrappers
  QAjaxBar,
  QAvatar,
  QBadge,
  QBanner,
  QBar,
  QBreadcrumbs,
  QBreadcrumbsEl,
  QBtn,
  QBtnDropdown,
  QBtnGroup,
  QBtnToggle,
  QCard,
  QCardActions,
  QCardSection,
  QCheckbox,
  QChip,
  QCircularProgress,
  QColor,
  QDate,
  QDialog,
  QExpansionItem,
  QFab,
  QFabAction,
  QField,
  QFile,
  QFooter,
  QHeader,
  QIcon,
  QImg,
  QInfiniteScroll,
  QInnerLoading,
  QInput,
  QItem,
  QItemLabel,
  QItemSection,
  QKnob,
  QLayout,
  QLinearProgress,
  QList,
  QMarkupTable,
  QMenu,
  QOptionGroup,
  QPage,
  QPageContainer,
  QPageScroller,
  QPageSticky,
  QPagination,
  QParallax,
  QPopupEdit,
  QPopupProxy,
  QPullToRefresh,
  QRadio,
  QRange,
  QRating,
  QScrollArea,
  QSelect,
  QSeparator,
  QSkeleton,
  QSlider,
  QSlideItem,
  QSpace,
  QSpinner,
  QSplitter,
  QStep,
  QStepper,
  QTab,
  QTabPanel,
  QTabPanels,
  QTabs,
  QTime,
  QToggle,
  QToolbar,
  QToolbarTitle,
  QTooltip,
  QTree,
  QUploader,
  QVideo,
  QVirtualScroll,
} from 'quasar'

const app = createApp(App)

// Registrar Quasar com todos os componentes usados pelos wrappers DSS
// CSS já carregado via dss-full.css no index.html
app.use(Quasar, {
  config: {},
  components: {
    QAjaxBar, QAvatar, QBadge, QBanner, QBar, QBreadcrumbs, QBreadcrumbsEl,
    QBtn, QBtnDropdown, QBtnGroup, QBtnToggle,
    QCard, QCardActions, QCardSection, QCheckbox, QChip,
    QCircularProgress, QColor, QDate, QDialog, QExpansionItem,
    QFab, QFabAction, QField, QFile, QFooter, QHeader,
    QIcon, QImg, QInfiniteScroll, QInnerLoading, QInput,
    QItem, QItemLabel, QItemSection,
    QKnob, QLayout, QLinearProgress, QList, QMarkupTable, QMenu,
    QOptionGroup, QPage, QPageContainer, QPageScroller, QPageSticky,
    QPagination, QParallax, QPopupEdit, QPopupProxy, QPullToRefresh,
    QRadio, QRange, QRating, QScrollArea, QSelect, QSeparator,
    QSkeleton, QSlider, QSlideItem, QSpace, QSpinner, QSplitter,
    QStep, QStepper, QTab, QTabPanel, QTabPanels, QTabs,
    QTime, QToggle, QToolbar, QToolbarTitle, QTooltip,
    QTree, QUploader, QVideo, QVirtualScroll,
  },
  directives: { ClosePopup, Ripple },
})

app.mount('#app')

// Grid Inspector — apenas em desenvolvimento
if (import.meta.env.DEV) {
  Promise.all([
    import('@sansys/grid-inspector'),
    import('@sansys/grid-inspector/styles').catch(() => {}),
  ]).then(([{ injectGridInspector }]) => {
    injectGridInspector({
      debug: false,
      config: {
        contentSelector: '.test-content',
      },
    });
  });
}
